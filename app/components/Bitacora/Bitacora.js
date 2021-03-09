"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Bitacora =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Bitacora, _React$Component);

  function Bitacora(props) {
    var _this;

    _classCallCheck(this, Bitacora);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Bitacora).call(this, props));
    _this.state = {
      filtros: []
    };
    _this.getBitacora = _this.getBitacora.bind(_assertThisInitialized(_this));
    _this.styleDate = _this.styleDate.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Bitacora, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getBitacora();
    }
  }, {
    key: "getBitacora",
    value: function getBitacora() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Bitacora", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                filtros: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "styleDate",
    value: function styleDate(date) {
      return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Bit\xE1cora"), _react["default"].createElement("div", {
        className: "page-breadcrumb"
      }, _react["default"].createElement("nav", {
        "aria-label": "breadcrumb"
      }, _react["default"].createElement("ol", {
        className: "breadcrumb"
      }, _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.configuracionHome
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Configuraci\xF3n")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Bit\xE1cora"))))))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card influencer-profile-data"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("table", {
        className: "table table-striped table-bordered"
      }, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        scope: "col"
      }, "#"), _react["default"].createElement("th", {
        scope: "col"
      }, "ID de Usuario"), _react["default"].createElement("th", {
        scope: "col"
      }, "Nombre de Usuario"), _react["default"].createElement("th", {
        scope: "col"
      }, "Fecha"), _react["default"].createElement("th", {
        scope: "col"
      }, "Descripci\xF3n"))), _react["default"].createElement("tbody", null, this.state.filtros.map(function (filtro, i) {
        return _react["default"].createElement("tr", {
          key: filtro.ID
        }, _react["default"].createElement("th", {
          scope: "row"
        }, i + 1), _react["default"].createElement("th", {
          scope: "row"
        }, filtro.usuarioID), _react["default"].createElement("th", {
          scope: "row"
        }, filtro.nombreUsuario), _react["default"].createElement("th", {
          scope: "row"
        }, _this3.styleDate(filtro.fecha)), _react["default"].createElement("th", {
          scope: "row"
        }, filtro.descripcion));
      }))))))));
    }
  }]);

  return Bitacora;
}(_react["default"].Component);

exports["default"] = Bitacora;
//# sourceMappingURL=Bitacora.js.map
