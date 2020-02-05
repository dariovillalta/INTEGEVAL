"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _OpcionesCrearRegla = _interopRequireDefault(require("./OpcionesCrearRegla.js"));

var _ContenedorReglas = _interopRequireDefault(require("./ContenedorReglas.js"));

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

var InstruccionVariable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InstruccionVariable, _React$Component);

  function InstruccionVariable(props) {
    var _this;

    _classCallCheck(this, InstruccionVariable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InstruccionVariable).call(this, props));
    _this.state = {
      reglas: _this.props.reglas
      /*this.showLoadingScreen = this.showLoadingScreen.bind(this);
      this.hideLoadingScreen = this.hideLoadingScreen.bind(this);*/

    };
    return _this;
  }

  _createClass(InstruccionVariable, [{
    key: "render",
    value: function render() {
      console.log('this.state.reglas');
      console.log(this.state.reglas);
      return _react["default"].createElement("div", null, this.props.navbar, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "card",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement(_OpcionesCrearRegla["default"], {
        pool: this.props.pool,
        campos: this.props.campos,
        asignaciones: this.props.asignaciones,
        retornarCampo: this.props.retornarCampo,
        camposDropdown: this.props.camposDropdown,
        valoresDropdown: this.props.valoresDropdown,
        callbackCrearRegla: this.props.callbackCrearRegla,
        goToCreateFormula: this.props.goToCreateFormula,
        retornarEstadoVistaEsCondicion: this.props.retornarEstadoVistaEsCondicion
      }))), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement(_ContenedorReglas["default"], {
        reglas: this.state.reglas,
        retornarIndiceSeleccionado: this.props.retornarIndiceSeleccionado
      }))));
    }
  }]);

  return InstruccionVariable;
}(_react["default"].Component);

exports["default"] = InstruccionVariable;
//# sourceMappingURL=InstruccionVariable.js.map
