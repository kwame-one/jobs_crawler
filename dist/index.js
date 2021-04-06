"use strict";

var _jobberman = require("./jobberman");

var args = process.argv.slice(2);
var page = args.length && Number.isInteger(parseInt(args[0])) ? args[0] : 1;
(0, _jobberman.jobberman)(page)["catch"](function (err) {
  return console.log(err);
});