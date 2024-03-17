"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_mongoose["default"].connect(process.env.DB_URL);
var db = _mongoose["default"].connection;
var handleOpen = function handleOpen() {
  return console.log("✅ Commented to DB");
};
var handleError = function handleError(error) {
  return console.log("db Error", error);
};
db.on("error", handleError);
db.once("open", handleOpen);