"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoUploads = exports.publicOnlyMiddleware = exports.protectorMiddleware = exports.localsMiddleware = exports.avatarUploads = void 0;
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var localsMiddleware = exports.localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  //console.log(req.session.user);
  //console.log(res.locals);
  next();
};

// 로그인이 필요한 라우터에 적용해야 한다.
var protectorMiddleware = exports.protectorMiddleware = function protectorMiddleware(req, res, next) {
  // 사용자가 로그인 되어 있다면 계속하고, 로그인 되어 있지 않다면 로그인 페이지로 리다이렉트하도록 한다.
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

// 로그인이 되어있으면 안되는 라우터에 적용해야 한다.
var publicOnlyMiddleware = exports.publicOnlyMiddleware = function publicOnlyMiddleware(req, res, next) {
  // 사용자가 로그인 되어 있지 않다면 계속하고, 로그인 되어 있다면 홈으로 돌아감
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

// 사용자가 보낸 파일을 uploads 폴더에 저장하라고 설정
var avatarUploads = exports.avatarUploads = (0, _multer["default"])({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000
  }
});
var videoUploads = exports.videoUploads = (0, _multer["default"])({
  dest: "uploads/videos/",
  limits: {
    fileSize: 10000000
  }
});