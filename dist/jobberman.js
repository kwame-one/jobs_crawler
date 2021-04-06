"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobberman = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = require("./db");

var puppeteer = require('puppeteer');

var jobberman = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var number,
        browser,
        page,
        jobs,
        connection,
        _args3 = arguments;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            number = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : 1;
            _context3.next = 3;
            return puppeteer.launch();

          case 3:
            browser = _context3.sent;
            _context3.next = 6;
            return browser.newPage();

          case 6:
            page = _context3.sent;
            _context3.next = 9;
            return page["goto"]("https://www.jobberman.com.gh/jobs?sort_by=latest&page=".concat(number), {
              waitUntil: 'networkidle2'
            });

          case 9:
            _context3.next = 11;
            return page.waitForSelector('.top-jobs-if-container');

          case 11:
            _context3.next = 13;
            return page.evaluate(function () {
              var articles = document.querySelectorAll('article.search-result:not(.group)');
              var items = [];
              articles.forEach(function (article, index) {
                items.push({
                  'role': article.querySelector('a h3').innerText,
                  'company': article.querySelector('.search-result__job-meta').innerText,
                  'location': article.querySelector('.search-result__location').innerText,
                  'employment_type': article.querySelector('.search-result__job-type').innerText,
                  'job_function': article.querySelector('.search-result__job-function span').innerText,
                  'salary': article.querySelector('.search-result__job-salary').innerText,
                  'link': article.querySelector('a.search-result__job-title').href
                });
              });
              return items;
            });

          case 13:
            jobs = _context3.sent;
            _context3.next = 16;
            return (0, _db.db)();

          case 16:
            connection = _context3.sent;
            jobs.forEach( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(job) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        connection.query('SELECT id FROM `news` WHERE `link` = ?', [job.link], /*#__PURE__*/function () {
                          var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, results, fields) {
                            return _regenerator["default"].wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    if (!(results.length == 0)) {
                                      _context.next = 3;
                                      break;
                                    }

                                    _context.next = 3;
                                    return connection.query('INSERT INTO news SET ?', job);

                                  case 3:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x2, _x3, _x4) {
                            return _ref3.apply(this, arguments);
                          };
                        }());

                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }());
            _context3.next = 20;
            return browser.close();

          case 20:
            console.log('done');

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function jobberman() {
    return _ref.apply(this, arguments);
  };
}();

exports.jobberman = jobberman;