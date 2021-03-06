"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _CeldaEquacion = _interopRequireDefault(require("./CeldaEquacion.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Equacion =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Equacion, _React$Component);

  function Equacion() {
    _classCallCheck(this, Equacion);

    return _possibleConstructorReturn(this, _getPrototypeOf(Equacion).apply(this, arguments));
  }

  _createClass(Equacion, [{
    key: "render",
    value: function render() {
      var _this = this;

      return _react["default"].createElement("div", {
        style: {
          height: this.props.height,
          width: this.props.width,
          cursor: "pointer",
          backgroundColor: "#292826"
        }
      }, this.props.formula.map(function (variable, i) {
        return _react["default"].createElement(_CeldaEquacion["default"], {
          clickEnFormula: _this.props.clickEnFormula,
          variable: variable,
          key: variable.valor + "" + i,
          height: variable.height,
          width: variable.width,
          formula: _this.props.formula,
          index: i,
          isFirstRow: _this.props.isFirstRow
        });
      }), this.props.formula.length == 0 ? _react["default"].createElement("div", {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        onClick: function onClick(e) {
          e.persist();

          _this.props.clickEnFormula(e, "empty", {}, 0);
        }
      }, _react["default"].createElement("div", {
        style: {
          height: "100%",
          width: "5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("div", {
        id: "indicadorFormulaVacia",
        className: "highlightFormulaBackground",
        style: {
          height: "80%",
          width: "100%"
        }
      }))) : null);
    }
  }]);

  return Equacion;
}(_react["default"].Component);

exports["default"] = Equacion;
//# sourceMappingURL=Equacion.js.map
