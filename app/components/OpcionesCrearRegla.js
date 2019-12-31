"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _VariableCreation = _interopRequireDefault(require("./Regla/VariableCreation.js"));

var _ContenedorFormulas = _interopRequireDefault(require("./ContenedorFormulas.js"));

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

//const campos = [{valor: "idCLiente"}, {valor: "saldoTotal"}, {valor: "tipoPersona"}, {valor: "impuestosTotal"}, {valor: "nombreCliente"}, {valor: "diasMora"}, {valor: "mesMora"}];
var variables = [];
var objetos = [];
var camposDeObjetos = [];

var OpcionesCrearRegla =
/*#__PURE__*/
function (_React$Component) {
  _inherits(OpcionesCrearRegla, _React$Component);

  function OpcionesCrearRegla(props) {
    var _this;

    _classCallCheck(this, OpcionesCrearRegla);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OpcionesCrearRegla).call(this, props));
    _this.state = {
      mostrarCrearCondicion: true,
      asignaciones: []
    };
    _this.mostrarCrearCondicion = _this.mostrarCrearCondicion.bind(_assertThisInitialized(_this));
    _this.mostrarAsignarFormula = _this.mostrarAsignarFormula.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(OpcionesCrearRegla, [{
    key: "mostrarCrearCondicion",
    value: function mostrarCrearCondicion() {
      this.setState({
        mostrarCrearCondicion: true
      });
    }
  }, {
    key: "mostrarAsignarFormula",
    value: function mostrarAsignarFormula() {
      this.setState({
        mostrarCrearCondicion: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        style: {
          backgroundColor: "#f5f5f5",
          height: "40px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("div", {
        className: "border-right addPointer",
        style: {
          backgroundColor: "white",
          height: "98%",
          width: "40%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        onClick: this.mostrarCrearCondicion
      }, "CONDICIONES / COMPARACIONES"), _react["default"].createElement("div", {
        className: "addPointer",
        style: {
          backgroundColor: "white",
          height: "98%",
          width: "40%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        onClick: this.mostrarAsignarFormula
      }, "ASIGNACIONES / F\xD3RMULAS"))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, this.state.mostrarCrearCondicion ? _react["default"].createElement(_VariableCreation["default"], {
        pool: this.props.pool,
        campos: this.props.campos,
        retornarCampo: this.props.retornarCampo,
        camposDropdown: this.props.camposDropdown,
        valoresDropdown: this.props.valoresDropdown,
        callbackCrearRegla: this.props.callbackCrearRegla
      }) : _react["default"].createElement(_ContenedorFormulas["default"], {
        asignaciones: this.state.asignaciones
      })));
    }
  }]);

  return OpcionesCrearRegla;
}(_react["default"].Component);

exports["default"] = OpcionesCrearRegla;
//# sourceMappingURL=OpcionesCrearRegla.js.map
