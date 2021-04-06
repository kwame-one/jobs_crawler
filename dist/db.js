"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

var db = function db() {
  return new Promise(function (resolve, reject) {
    connection.connect(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
};

exports.db = db;