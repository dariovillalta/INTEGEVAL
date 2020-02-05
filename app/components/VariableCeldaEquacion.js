"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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

var VariableCeldaEquacion =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VariableCeldaEquacion, _React$Component);

  function VariableCeldaEquacion() {
    _classCallCheck(this, VariableCeldaEquacion);

    return _possibleConstructorReturn(this, _getPrototypeOf(VariableCeldaEquacion).apply(this, arguments));
  }

  _createClass(VariableCeldaEquacion, [{
    key: "render",
    value: function render() {
      var _this = this;

      return _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        style: {
          height: "100%",
          width: "5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "float": "left"
        }
      }, _react["default"].createElement("div", {
        id: "indicadorIzquierda" + this.props.variable.valor + this.props.index,
        className: "highlightFormulaBackground",
        style: {
          height: "80%",
          width: "100%"
        },
        onClick: function onClick(e) {
          e.persist();

          _this.props.clickEnFormula(e, "izquierda", _this.props.variable.valor, _this.props.index);
        }
      })), _react["default"].createElement("div", {
        style: {
          height: "100%",
          width: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "100%",
          "float": "left",
          color: "white",
          padding: "5%"
        }
      }, _react["default"].createElement("div", {
        className: "highlightFormulaBackground" + (this.props.variable.activa ? ' formulaActive' : ''),
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "100%",
          borderRadius: "25px"
        },
        onClick: function onClick(e) {
          e.persist();

          _this.props.clickEnFormula(e, null, _this.props.variable.valor, _this.props.index);
        }
      }, _react["default"].createElement("p", {
        className: "highlightFormulaText"
      }, this.props.variable.texto))), _react["default"].createElement("div", {
        style: {
          height: "100%",
          width: "5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "float": "left"
        }
      }, _react["default"].createElement("div", {
        id: "indicadorDerecha" + this.props.variable.valor + this.props.index,
        className: "highlightFormulaBackground",
        style: {
          height: "80%",
          width: "100%"
        },
        onClick: function onClick(e) {
          e.persist();

          _this.props.clickEnFormula(e, "derecha", _this.props.variable.valor, _this.props.index);
        }
      })));
    }
  }]);

  return VariableCeldaEquacion;
}(_react["default"].Component);

exports["default"] = VariableCeldaEquacion;
//# sourceMappingURL=VariableCeldaEquacion.js.map
