import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const getJoin = (req, res) =>
  res.render("join", { pageTitle: "Create Account" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const pageTitle = "Join";
  if (password != password2) {
    return res.status(400).render("join", {
      pageTitle: pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  const exist = await User.exists({ $or: [{ username }, { email }] });
  if (exist) {
    return res.status(400).render("join", {
      pageTitle: pageTitle,
      errorMessage: "This username/email is already taken..!",
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    console.log(error._message);
    return res.status(400).render("join", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ username, socialOnly: false });
  // 1. 계정이 존재하는지 확인 (존재하지 않으면 에러)
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }
  // 2. 비밀번호가 일치하는지 확인 (비밀번호의 해시값을 서로 비교하여 값을 알 수 있다.)
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  // 3. 세션 DB에 해당 유저의 정보를 저장한다. (로그인 정보)
  req.session.loggedIn = true;
  req.session.user = user;
  res.redirect("/");
};

//유저를 Github로 리다이렉션
export const startGithubLogin = (req, res) => {
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };

  const baseURL = `https://github.com/login/oauth/authorize`;
  const params = new URLSearchParams(config).toString();

  const finalURL = `${baseURL}?${params}`;
  return res.redirect(finalURL);
};

export const finishGithubLogin = async (req, res) => {
  const baseURL = `https://github.com/login/oauth/access_token`;
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}`;
  // fetch를 통해 POST 요청 후, 데이터를 받아온다.
  const tokenRequest = await (
    await fetch(finalURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  //console.log(tokenRequest);

  if ("access_token" in tokenRequest) {
    // 만약 access_token을 제대로 받아왔다면, 해당 토큰으로 github API요청을 한다.
    const { access_token } = tokenRequest;
    const apiURL = "https://api.github.com";
    const userData = await (
      await fetch(`${apiURL}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiURL}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    //console.log(userData);
    //console.log(emailData);
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      // 적합한 이메일에 접근할 수 없음
      return res.redirect("/login");
    }
    // 이제 적합한 유저 데이터와 이메일을 다 보유한 상태.
    // 먼저, 해당 깃허브 이메일의 유저가 데이터베이스에 존재하는지 확인하자.
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      // 만약 유저 데이터베이스에 해당 이메일을 가진 객체가 없다면 ? 비밀번호 없이 계정을 만든다.
      user = await User.create({
        name: userData.name,
        avatarUrl: userData.avatar_url,
        socialOnly: true,
        username: userData.login,
        email: emailObj.email,
        password: "",
        location: userData.location,
      });
    }
    // 해당 세션에 로그인하자!
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    // not accept access token
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit Profile" });
};

export const postEdit = async (req, res) => {
  // 세션에서 유저의 아이디를 얻고, 바디에서 필요한 정보를 가져온다. (한번에 처리 가능)
  const {
    session: {
      user: { _id, avatarUrl, email: sessionEmail, username: sessionUsername },
    },
    body: { name, email, username, location },
    file,
  } = req;

  // 만약 현재 unique한 영역인 유저 네임이나 이메일이 변경중이라면?
  if (username !== sessionUsername || email !== sessionEmail) {
    // 현재 해당 계정을 사용하고 있는 유저가 있는지 확인해본다.
    const exist = await User.exists({ $or: [{ username }, { email }] });
    if (exist) {
      // 만약 존재한다면? 해당 계정으로 수정할 수 없다.
      return res.status(400).render("edit-profile", {
        pageTitle: "Edit Profile",
        errorMessage: "This username/email is already taken..!",
      });
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl, //만약 file이 undefined이라면 유지. 존재한다면 path 업데이트
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  // 세션의 유저도 업데이트한다.
  req.session.user = updatedUser;
  return res.redirect("/users/edit");
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly == true) {
    return res.redirect("/");
  }
  return res.render("users/change-password", { pageTitle: "Change password" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordConfirm },
  } = req;
  const user = await User.findById(_id);

  // 기존 비밀번호가 정확한지 확인
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The current password is incorrect",
    });
  }

  // 패스워드가 일치하는지 확인
  if (newPassword !== newPasswordConfirm) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The password does not match the confirmation",
    });
  }

  // 기존 패스워드와 동일하다면 비밀번호 변경
  user.password = newPassword;
  await user.save(); // save를 통해 암호화 된 데이터로 변환.

  // 변환된 데이터를 세션에 업데이트.
  req.session.user.password = user.password;

  // send notification
  return res.redirect("/");
};

export const see = (req, res) => res.send("See User");
