import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  //console.log(req.session.user);
  //console.log(res.locals);
  next();
};

// 로그인이 필요한 라우터에 적용해야 한다.
export const protectorMiddleware = (req, res, next) => {
  // 사용자가 로그인 되어 있다면 계속하고, 로그인 되어 있지 않다면 로그인 페이지로 리다이렉트하도록 한다.
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

// 로그인이 되어있으면 안되는 라우터에 적용해야 한다.
export const publicOnlyMiddleware = (req, res, next) => {
  // 사용자가 로그인 되어 있지 않다면 계속하고, 로그인 되어 있다면 홈으로 돌아감
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

// 사용자가 보낸 파일을 uploads 폴더에 저장하라고 설정
export const avatarUploads = multer({
  dest: "uploads/avatars/",
  limits: { fileSize: 3000000 },
});
export const videoUploads = multer({
  dest: "uploads/videos/",
  limits: {
    fieldSize: 10000000,
  },
});
