"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ListasSeleVariableContenedorVariable = _interopRequireDefault(require("./ListasSeleVariableContenedorVariable.js"));

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

var campos = [{
  nombre: "idCLiente"
}, {
  nombre: "saldoTotal"
}, {
  nombre: "tipoPersona"
}, {
  nombre: "impuestosTotal"
}, {
  nombre: "nombreCliente"
}, {
  nombre: "diasMora"
}, {
  nombre: "mesMora"
}];
var variables = [];
var objetos = [];
var camposDeObjetos = [];

var CondicionVariable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CondicionVariable, _React$Component);

  function CondicionVariable(props) {
    _classCallCheck(this, CondicionVariable);

    return _possibleConstructorReturn(this, _getPrototypeOf(CondicionVariable).call(this, props));
    /*this.state = {
        showLoadingScreen: false,
        mensajeLoadingScreen: ''
    }
    this.showLoadingScreen = this.showLoadingScreen.bind(this);
    this.hideLoadingScreen = this.hideLoadingScreen.bind(this);*/
  }

  _createClass(CondicionVariable, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Condiciones"), _react["default"].createElement("div", {
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
      }, "Condiciones"))))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "font-18",
        style: {
          width: "100%",
          height: "20%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, "Seleccionar Variable"), _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "100%"
        }
      }, _react["default"].createElement(_ListasSeleVariableContenedorVariable["default"], {
        esOperacion: false,
        mostrarRosa: true,
        campos: campos,
        variables: variables,
        objetos: objetos,
        camposDeObjetos: camposDeObjetos,
        seleccionarMultiple: false,
        retornoSeleccionVariable: this.retornoClickLista
      }))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%",
          margin: "1% 0% 0% 0%"
        }
      }, _react["default"].createElement("div", {
        style: {
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "0% 2%",
          width: "100%",
          marginLeft: "auto",
          marginRight: "0"
        }
      }, " SI ES PERSONA NATURAL !")), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%",
          margin: "1% 0% 0% 0%"
        }
      }, _react["default"].createElement("div", {
        style: {
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "0% 2%",
          width: "90%",
          marginLeft: "auto",
          marginRight: "0"
        }
      }, " SI TOTAL DEPOSITOS ES MENOR A 400,000 !")), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%",
          margin: "1% 0% 0% 0%"
        }
      }, _react["default"].createElement("div", {
        style: {
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "0% 2%",
          width: "80%",
          marginLeft: "auto",
          marginRight: "0"
        }
      }, " SI MONTO ES MENOR A FOSEDE")), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%",
          margin: "1% 0% 0% 0%"
        }
      }, _react["default"].createElement("div", {
        style: {
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "0% 2%",
          width: "90%",
          marginLeft: "auto",
          marginRight: "0"
        }
      }, " SI TOTAL DEPOSITOS ES MAYOR A 400,000 !")))));
    }
  }]);

  return CondicionVariable;
}(_react["default"].Component);

exports["default"] = CondicionVariable;
//# sourceMappingURL=CondicionVariable.js.map
