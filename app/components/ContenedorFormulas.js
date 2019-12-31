"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _VariableCreation = _interopRequireDefault(require("./Regla/VariableCreation.js"));

var _ContenedorReglas = _interopRequireDefault(require("./ContenedorReglas.js"));

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

var ContenedorFormulas =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ContenedorFormulas, _React$Component);

  function ContenedorFormulas(props) {
    var _this;

    _classCallCheck(this, ContenedorFormulas);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ContenedorFormulas).call(this, props));
    _this.state = {
      mostrarCrearCondicion: true,
      asignaciones: []
    };
    _this.mostrarCrearCondicion = _this.mostrarCrearCondicion.bind(_assertThisInitialized(_this));
    _this.mostrarAsignarFormula = _this.mostrarAsignarFormula.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ContenedorFormulas, [{
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
      var _this2 = this;

      return _react["default"].createElement("div", {
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("h3", {
        className: "card-header"
      }, "Crear Asignaci\xF3n / F\xF3rmula"), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "text-center"
      }, _react["default"].createElement("a", {
        className: "btn btn-success col-xs-10 col-10 btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: this.props.crearRiesgo
      }, "Crear Asignaci\xF3n / F\xF3rmula")), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
        className: "text-center"
      }, this.props.asignaciones.map(function (asignacion, i) {
        return _react["default"].createElement("a", {
          className: "btn btn-success btn-primary col-xs-10 col-10 btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: _this2.props.crearRiesgo
        }, "asignacion.formula");
      }), this.props.asignaciones.length == 0 ? _react["default"].createElement("a", {
        style: {
          color: "#fafafa"
        },
        className: "btn btn-dark col-xs-10 col-10 btnWhiteColorHover font-bold font-20"
      }, "No existen asignaciones / f\xF3rmulas creadas") : null), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
        className: "text-center"
      }, _react["default"].createElement("a", {
        onClick: this.props.callbackCrearRegla,
        className: "btn btn-primary col-xs-6 col-6",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold"
        }
      }, "Crear Condici\xF3n / Instrucci\xF3n")), _react["default"].createElement("br", null));
    }
  }]);

  return ContenedorFormulas;
}(_react["default"].Component);

exports["default"] = ContenedorFormulas;
//# sourceMappingURL=ContenedorFormulas.js.map
