"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ListasSeleVariable = _interopRequireDefault(require("./ListasSeleVariable.js"));

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

var operacionesEliminar = [{
  valor: "Borrar",
  tipo: "operacion"
}];

var ListasSeleVariableContenedorOperador =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ListasSeleVariableContenedorOperador, _React$Component);

  function ListasSeleVariableContenedorOperador(props) {
    var _this;

    _classCallCheck(this, ListasSeleVariableContenedorOperador);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ListasSeleVariableContenedorOperador).call(this, props));
    _this.state = {
      indicesVarSeleccionadosOperaciones: [],
      indicesVarSeleccionadosBorrar: []
    };
    _this.retornoSeleccionVariableOperacion = _this.retornoSeleccionVariableOperacion.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionVariableBorrar = _this.retornoSeleccionVariableBorrar.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ListasSeleVariableContenedorOperador, [{
    key: "retornoSeleccionVariableOperacion",
    value: function retornoSeleccionVariableOperacion(variable, posicion, arreglo) {
      this.setState({
        indicesVarSeleccionadosOperaciones: arreglo,
        indicesVarSeleccionadosBorrar: []
      });
      this.props.retornoSeleccionVariable(this.props.esOperacion, variable);
    }
  }, {
    key: "retornoSeleccionVariableBorrar",
    value: function retornoSeleccionVariableBorrar(variable, posicion, arreglo) {
      this.setState({
        indicesVarSeleccionadosOperaciones: [],
        indicesVarSeleccionadosBorrar: arreglo
      });
      this.props.retornoSeleccionVariable(this.props.esOperacion, variable);
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          border: "1px solid #e6e6f2",
          height: "75%"
        }
      }, _react["default"].createElement(_ListasSeleVariable["default"], {
        mostrarRosa: this.props.mostrarRosa,
        variables: this.props.operaciones,
        seleccionarMultiple: this.props.seleccionarMultiple,
        retornoSeleccion: this.retornoSeleccionVariableOperacion,
        titulo: "Algebraicas",
        indiceTabla: false,
        indicesVarSeleccionados: this.state.indicesVarSeleccionadosOperaciones
      }), _react["default"].createElement(_ListasSeleVariable["default"], {
        mostrarRosa: this.props.mostrarRosa,
        variables: operacionesEliminar,
        seleccionarMultiple: this.props.seleccionarMultiple,
        retornoSeleccion: this.retornoSeleccionVariableBorrar,
        titulo: "Eliminar",
        indiceTabla: false,
        indicesVarSeleccionados: this.state.indicesVarSeleccionadosBorrar
      })));
    }
  }]);

  return ListasSeleVariableContenedorOperador;
}(_react["default"].Component);

exports["default"] = ListasSeleVariableContenedorOperador;
//# sourceMappingURL=ListasSeleVariableContenedorOperador.js.map
