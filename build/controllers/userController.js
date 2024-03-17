"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startGithubLogin = exports.see = exports.postLogin = exports.postJoin = exports.postEdit = exports.postChangePassword = exports.logout = exports.getLogin = exports.getJoin = exports.getEdit = exports.getChangePassword = exports.finishGithubLogin = void 0;
var _User = _interopRequireDefault(require("../models/User"));
var _Video = _interopRequireDefault(require("../models/Video"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getJoin = exports.getJoin = function getJoin(req, res) {
  return res.render("join", {
    pageTitle: "Create Account"
  });
};
var postJoin = exports.postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, name, username, email, password, password2, location, pageTitle, exist;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, username = _req$body.username, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2, location = _req$body.location;
          pageTitle = "Join";
          if (!(password != password2)) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(400).render("join", {
            pageTitle: pageTitle,
            errorMessage: "Password confirmation does not match."
          }));
        case 4:
          _context.next = 6;
          return _User["default"].exists({
            $or: [{
              username: username
            }, {
              email: email
            }]
          });
        case 6:
          exist = _context.sent;
          if (!exist) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", res.status(400).render("join", {
            pageTitle: pageTitle,
            errorMessage: "This username/email is already taken..!"
          }));
        case 9:
          _context.prev = 9;
          _context.next = 12;
          return _User["default"].create({
            name: name,
            username: username,
            email: email,
            password: password,
            location: location
          });
        case 12:
          return _context.abrupt("return", res.redirect("/login"));
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](9);
          console.log(_context.t0._message);
          return _context.abrupt("return", res.status(400).render("join", {
            pageTitle: "Upload Video",
            errorMessage: _context.t0._message
          }));
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[9, 15]]);
  }));
  return function postJoin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getLogin = exports.getLogin = function getLogin(req, res) {
  return res.render("login", {
    pageTitle: "Login"
  });
};
var postLogin = exports.postLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, username, password, pageTitle, user, ok;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
          pageTitle = "Login";
          _context2.next = 4;
          return _User["default"].findOne({
            username: username,
            socialOnly: false
          });
        case 4:
          user = _context2.sent;
          if (user) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(400).render("login", {
            pageTitle: pageTitle,
            errorMessage: "An account with this username does not exists."
          }));
        case 7:
          _context2.next = 9;
          return _bcrypt["default"].compare(password, user.password);
        case 9:
          ok = _context2.sent;
          if (ok) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", res.status(400).render("login", {
            pageTitle: pageTitle,
            errorMessage: "Wrong password"
          }));
        case 12:
          // 3. 세션 DB에 해당 유저의 정보를 저장한다. (로그인 정보)
          req.session.loggedIn = true;
          req.session.user = user;
          res.redirect("/");
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function postLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

//유저를 Github로 리다이렉션
var startGithubLogin = exports.startGithubLogin = function startGithubLogin(req, res) {
  var config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email"
  };
  var baseURL = "https://github.com/login/oauth/authorize";
  var params = new URLSearchParams(config).toString();
  var finalURL = "".concat(baseURL, "?").concat(params);
  return res.redirect(finalURL);
};
var finishGithubLogin = exports.finishGithubLogin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var baseURL, config, params, finalURL, tokenRequest, access_token, apiURL, userData, emailData, emailObj, user;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          baseURL = "https://github.com/login/oauth/access_token";
          config = {
            client_id: process.env.GH_CLIENT,
            client_secret: process.env.GH_SECRET,
            code: req.query.code
          };
          params = new URLSearchParams(config).toString();
          finalURL = "".concat(baseURL, "?").concat(params); // fetch를 통해 POST 요청 후, 데이터를 받아온다.
          _context3.next = 6;
          return (0, _nodeFetch["default"])(finalURL, {
            method: "POST",
            headers: {
              Accept: "application/json"
            }
          });
        case 6:
          _context3.next = 8;
          return _context3.sent.json();
        case 8:
          tokenRequest = _context3.sent;
          if (!("access_token" in tokenRequest)) {
            _context3.next = 37;
            break;
          }
          // 만약 access_token을 제대로 받아왔다면, 해당 토큰으로 github API요청을 한다.
          access_token = tokenRequest.access_token;
          apiURL = "https://api.github.com";
          _context3.next = 14;
          return (0, _nodeFetch["default"])("".concat(apiURL, "/user"), {
            headers: {
              Authorization: "token ".concat(access_token)
            }
          });
        case 14:
          _context3.next = 16;
          return _context3.sent.json();
        case 16:
          userData = _context3.sent;
          _context3.next = 19;
          return (0, _nodeFetch["default"])("".concat(apiURL, "/user/emails"), {
            headers: {
              Authorization: "token ".concat(access_token)
            }
          });
        case 19:
          _context3.next = 21;
          return _context3.sent.json();
        case 21:
          emailData = _context3.sent;
          //console.log(userData);
          //console.log(emailData);
          emailObj = emailData.find(function (email) {
            return email.primary === true && email.verified === true;
          });
          if (emailObj) {
            _context3.next = 25;
            break;
          }
          return _context3.abrupt("return", res.redirect("/login"));
        case 25:
          _context3.next = 27;
          return _User["default"].findOne({
            email: emailObj.email
          });
        case 27:
          user = _context3.sent;
          if (user) {
            _context3.next = 32;
            break;
          }
          _context3.next = 31;
          return _User["default"].create({
            name: userData.name,
            avatarUrl: userData.avatar_url,
            socialOnly: true,
            username: userData.login,
            email: emailObj.email,
            password: "",
            location: userData.location
          });
        case 31:
          user = _context3.sent;
        case 32:
          // 해당 세션에 로그인하자!
          req.session.loggedIn = true;
          req.session.user = user;
          return _context3.abrupt("return", res.redirect("/"));
        case 37:
          return _context3.abrupt("return", res.redirect("/login"));
        case 38:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function finishGithubLogin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var logout = exports.logout = function logout(req, res) {
  req.session.destroy();
  return res.redirect("/");
};
var getEdit = exports.getEdit = function getEdit(req, res) {
  return res.render("edit-profile", {
    pageTitle: "Edit Profile"
  });
};
var postEdit = exports.postEdit = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$session$user, _id, avatarUrl, sessionEmail, sessionUsername, _req$body3, name, email, username, location, file, exist, updatedUser;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          // 세션에서 유저의 아이디를 얻고, 바디에서 필요한 정보를 가져온다. (한번에 처리 가능)
          _req$session$user = req.session.user, _id = _req$session$user._id, avatarUrl = _req$session$user.avatarUrl, sessionEmail = _req$session$user.email, sessionUsername = _req$session$user.username, _req$body3 = req.body, name = _req$body3.name, email = _req$body3.email, username = _req$body3.username, location = _req$body3.location, file = req.file; // 만약 현재 unique한 영역인 유저 네임이나 이메일이 변경중이라면?
          if (!(username !== sessionUsername || email !== sessionEmail)) {
            _context4.next = 7;
            break;
          }
          _context4.next = 4;
          return _User["default"].exists({
            $or: [{
              username: username
            }, {
              email: email
            }]
          });
        case 4:
          exist = _context4.sent;
          if (!exist) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(400).render("edit-profile", {
            pageTitle: "Edit Profile",
            errorMessage: "This username/email is already taken..!"
          }));
        case 7:
          _context4.next = 9;
          return _User["default"].findByIdAndUpdate(_id, {
            avatarUrl: file ? file.path : avatarUrl,
            //만약 file이 undefined이라면 유지. 존재한다면 path 업데이트
            name: name,
            email: email,
            username: username,
            location: location
          }, {
            "new": true
          });
        case 9:
          updatedUser = _context4.sent;
          // 세션의 유저도 업데이트한다.
          req.session.user = updatedUser;
          return _context4.abrupt("return", res.redirect("/users/edit"));
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function postEdit(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getChangePassword = exports.getChangePassword = function getChangePassword(req, res) {
  if (req.session.user.socialOnly == true) {
    return res.redirect("/");
  }
  return res.render("users/change-password", {
    pageTitle: "Change password"
  });
};
var postChangePassword = exports.postChangePassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _id, _req$body4, oldPassword, newPassword, newPasswordConfirm, user, ok;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _id = req.session.user._id, _req$body4 = req.body, oldPassword = _req$body4.oldPassword, newPassword = _req$body4.newPassword, newPasswordConfirm = _req$body4.newPasswordConfirm;
          _context5.next = 3;
          return _User["default"].findById(_id);
        case 3:
          user = _context5.sent;
          _context5.next = 6;
          return _bcrypt["default"].compare(oldPassword, user.password);
        case 6:
          ok = _context5.sent;
          if (ok) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", res.status(400).render("users/change-password", {
            pageTitle: "Change Password",
            errorMessage: "The current password is incorrect"
          }));
        case 9:
          if (!(newPassword !== newPasswordConfirm)) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(400).render("users/change-password", {
            pageTitle: "Change Password",
            errorMessage: "The password does not match the confirmation"
          }));
        case 11:
          // 기존 패스워드와 동일하다면 비밀번호 변경
          user.password = newPassword;
          _context5.next = 14;
          return user.save();
        case 14:
          // save를 통해 암호화 된 데이터로 변환.

          // 변환된 데이터를 세션에 업데이트.
          req.session.user.password = user.password;

          // send notification
          return _context5.abrupt("return", res.redirect("/"));
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function postChangePassword(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var see = exports.see = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var id, user;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id; //const user = await User.findById(id).populate("videos");
          _context6.next = 3;
          return _User["default"].findById(id).populate({
            path: "videos",
            populate: {
              path: "owner",
              model: "User",
              options: {
                sort: {
                  createdAt: "desc"
                }
              }
            }
          });
        case 3:
          user = _context6.sent;
          if (user) {
            _context6.next = 6;
            break;
          }
          return _context6.abrupt("return", res.status(404).render("404", {
            pageTitle: "User not found."
          }));
        case 6:
          return _context6.abrupt("return", res.render("users/profile", {
            pageTitle: "".concat(user.name, "'s Profile"),
            user: user
          }));
        case 7:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function see(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();