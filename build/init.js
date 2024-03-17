"use strict";

require("dotenv/config");
require("./db.js");
require("./models/Video.js");
require("./models/User.js");
var _server = _interopRequireDefault(require("./server.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PORT = 4000;

//외부 접속을 허용
var handleListening = function handleListening() {
  return console.log("\u2705 Server listening on http://localhost:".concat(PORT, " \uD83D\uDE80\""));
};
_server["default"].listen(PORT, handleListening);