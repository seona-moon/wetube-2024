// 3. 세션 DB에 해당 유저의 정보를 저장한다. (로그인 정보)
  req.session.loggedIn = true;
  req.session.user = user;
  res.redirect("/");
};