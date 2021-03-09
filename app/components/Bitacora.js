"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveBitacora = saveBitacora;

var _mssql = _interopRequireDefault(require("mssql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function saveBitacora(_x, _x2, _x3, _x4, _x5) {
  return _saveBitacora.apply(this, arguments);
}

function _saveBitacora() {
  _saveBitacora = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(sqlCon, usuarioID, nombreUsuario, fecha, descripcion) {
    var transaction;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return new _mssql["default"].Transaction(sqlCon);

          case 3:
            transaction = _context.sent;
            transaction.begin(function (err) {
              var rolledBack = false;
              transaction.on('rollback', function (aborted) {
                rolledBack = true;
              });
              var request = new _mssql["default"].Request(transaction);
              request.query("insert into Bitacora (usuarioID, nombreUsuario, fecha, descripcion) values (" + usuarioID + ", '" + nombreUsuario + "', '" + fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + "', '" + descripcion + "')", function (err, result) {
                if (err) {
                  console.log(err);

                  if (!rolledBack) {
                    transaction.rollback(function (err) {});
                  }
                } else {
                  transaction.commit(function (err) {});
                }
              });
            }); // fin transaction

            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _saveBitacora.apply(this, arguments);
}
//# sourceMappingURL=bitacora.js.map
