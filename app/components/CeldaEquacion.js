"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Equacion = _interopRequireDefault(require("./Equacion.js"));

var _VariableCeldaEquacion = _interopRequireDefault(require("./VariableCeldaEquacion.js"));

var _SignoCeldaEquacion = _interopRequireDefault(require("./SignoCeldaEquacion.js"));

var _DivisionCeldaEquacion = _interopRequireDefault(require("./DivisionCeldaEquacion.js"));

var _IndicadorCeldaEquacion = _interopRequireDefault(require("./IndicadorCeldaEquacion.js"));

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

var CeldaEquacion =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CeldaEquacion, _React$Component);

  function CeldaEquacion() {
    _classCallCheck(this, CeldaEquacion);

    return _possibleConstructorReturn(this, _getPrototypeOf(CeldaEquacion).apply(this, arguments));
  }

  _createClass(CeldaEquacion, [{
    key: "render",
    value: function render() {
      var _this = this;

      console.log('this.props.formula.length');
      console.log(this.props.formula.length);
      console.log(this.props.formula);
      return _react["default"].createElement("div", {
        style: {
          width: this.props.width,
          height: this.props.height,
          "float": this.props.index != this.props.formula.length - 1 ? "left" : "right"
        }
      }, Array.isArray(this.props.variable.valor) ? _react["default"].createElement(_Equacion["default"], {
        formula: this.props.variable.valor,
        clickEnFormula: this.props.clickEnFormula,
        isFirstRow: false,
        height: "100%",
        width: "100%"
      }) : _react["default"].createElement("div", {
        id: "fondo" + this.props.variable.valor,
        style: {
          height: "100%",
          width: "100%"
        },
        onClick: function onClick(e) {
          e.persist();

          _this.props.clickEnFormula(e, null, _this.props.variable.valor, _this.props.index);
        }
      }, this.props.variable.tipo.localeCompare("variable") == 0 ? _react["default"].createElement(_VariableCeldaEquacion["default"], {
        variable: this.props.variable,
        clickEnFormula: this.props.clickEnFormula,
        index: this.props.index
      }) : null, this.props.variable.tipo.localeCompare("signo") == 0 ? _react["default"].createElement(_SignoCeldaEquacion["default"], {
        variable: this.props.variable,
        clickEnFormula: this.props.clickEnFormula,
        index: this.props.index
      }) : null, this.props.variable.tipo.localeCompare("division\\") == 0 ? _react["default"].createElement(_DivisionCeldaEquacion["default"], {
        variable: this.props.variable,
        clickEnFormula: this.props.clickEnFormula,
        index: this.props.index
      }) : null, this.props.variable.tipo.localeCompare("indicador") == 0 ? _react["default"].createElement(_IndicadorCeldaEquacion["default"], {
        variable: this.props.variable,
        clickEnFormula: this.props.clickEnFormula,
        index: this.props.index
      }) : null));
    }
  }]);

  return CeldaEquacion;
}(_react["default"].Component);

exports["default"] = CeldaEquacion;
//# sourceMappingURL=CeldaEquacion.js.map
