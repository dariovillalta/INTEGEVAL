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

var ListasSeleVariableContenedorVariable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ListasSeleVariableContenedorVariable, _React$Component);

  function ListasSeleVariableContenedorVariable(props) {
    var _this;

    _classCallCheck(this, ListasSeleVariableContenedorVariable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ListasSeleVariableContenedorVariable).call(this, props));
    _this.retornoSeleccionVariable = _this.retornoSeleccionVariable.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ListasSeleVariableContenedorVariable, [{
    key: "retornoSeleccionVariable",
    value: function retornoSeleccionVariable(variable, posicion) {
      this.props.retornoSeleccionVariable(this.props.esOperacion, variable, posicion);
    } //EN VEZ DE TABLAS, FUENTE DE DATOS

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          border: "1px solid #e6e6f2",
          width: "100%",
          height: "100%"
        }
      }, this.props.tablas.map(function (tabla, i) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "80%"
          },
          key: tabla.ID
        }, _this2.props.camposTablas[i] != undefined ? _react["default"].createElement(_ListasSeleVariable["default"], {
          mostrarRosa: _this2.props.mostrarRosa,
          variables: _this2.props.camposTablas[i],
          seleccionarMultiple: _this2.props.seleccionarMultiple,
          retornoSeleccion: _this2.retornoSeleccionVariable,
          titulo: tabla.nombre,
          indiceTabla: i
        }) : null);
      }), this.props.variables.length > 0 ? _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "80%"
        }
      }, _react["default"].createElement(_ListasSeleVariable["default"], {
        mostrarRosa: this.props.mostrarRosa,
        variables: this.props.variables,
        seleccionarMultiple: this.props.seleccionarMultiple,
        retornoSeleccion: this.retornoSeleccionVariable,
        titulo: "Variable Escalares",
        indiceTabla: false
      })) : null, this.props.objetos.map(function (objeto, i) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "80%"
          },
          key: objeto.ID
        }, _this2.props.camposDeObjetos[i] != undefined ? _react["default"].createElement(_ListasSeleVariable["default"], {
          mostrarRosa: _this2.props.mostrarRosa,
          variables: _this2.props.camposDeObjetos[i],
          seleccionarMultiple: _this2.props.seleccionarMultiple,
          retornoSeleccion: _this2.retornoSeleccionVariable,
          titulo: objeto.nombre,
          key: i,
          indiceTabla: false
        }) : null);
      })));
    }
  }]);

  return ListasSeleVariableContenedorVariable;
}(_react["default"].Component);

exports["default"] = ListasSeleVariableContenedorVariable;
//# sourceMappingURL=ListasSeleVariableContenedorVariable.js.map
