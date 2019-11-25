"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var arregloCeldasSeleccionadas = [];

var ListasSeleVariable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ListasSeleVariable, _React$Component);

  function ListasSeleVariable(props) {
    var _this;

    _classCallCheck(this, ListasSeleVariable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ListasSeleVariable).call(this, props));
    _this.state = {
      mostrarCrearUmbral: true,
      indicesVarSeleccionados: []
    };
    _this.clickEnListaCelda = _this.clickEnListaCelda.bind(_assertThisInitialized(_this));
    _this.seleccionarIndice = _this.seleccionarIndice.bind(_assertThisInitialized(_this));
    _this.deseleccionarIndice = _this.deseleccionarIndice.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ListasSeleVariable, [{
    key: "clickEnListaCelda",
    value: function clickEnListaCelda(variable, indice) {
      if (!this.props.seleccionarMultiple) {
        arregloCeldasSeleccionadas = [];

        for (var i = 0; i < this.state.indicesVarSeleccionados.length; i++) {
          this.state.indicesVarSeleccionados[i] = false;
        }

        ;
      }

      if (this.state.indicesVarSeleccionados[indice]) {
        this.deseleccionarIndice(variable, indice);
      } else {
        this.seleccionarIndice(variable, indice);
      }
    }
  }, {
    key: "seleccionarIndice",
    value: function seleccionarIndice(variable, indice) {
      console.log("antes seleccionarIndice");
      console.log('arregloCeldasSeleccionadas');
      console.log(arregloCeldasSeleccionadas);
      console.log('this.state.indicesVarSeleccionados');
      console.log(this.state.indicesVarSeleccionados);
      var entro = false;

      for (var i = 0; i < arregloCeldasSeleccionadas.length; i++) {
        if (arregloCeldasSeleccionadas[i].nombre.localeCompare(variable.nombre) == 0) {
          entro = true;
          break;
        }
      }

      ;

      if (!entro) {
        arregloCeldasSeleccionadas.push(variable);
      } //this.props.retornoSeleccion(arregloVariableSeleccionada);


      var nuevoArr = _toConsumableArray(this.state.indicesVarSeleccionados);

      nuevoArr[indice] = true;
      this.setState({
        indicesVarSeleccionados: nuevoArr
      });
      console.log("despues seleccionarIndice");
      console.log('arregloCeldasSeleccionadas');
      console.log(arregloCeldasSeleccionadas);
      console.log('this.state.indicesVarSeleccionados');
      console.log(this.state.indicesVarSeleccionados);
      console.log('nuevoArr');
      console.log(nuevoArr);
      this.props.retornoSeleccion(arregloCeldasSeleccionadas);
    }
  }, {
    key: "deseleccionarIndice",
    value: function deseleccionarIndice(variable, indice) {
      console.log("antes deseleccionarIndice");
      console.log('arregloCeldasSeleccionadas');
      console.log(arregloCeldasSeleccionadas);
      console.log('this.state.indicesVarSeleccionados');
      console.log(this.state.indicesVarSeleccionados);

      for (var i = 0; i < arregloCeldasSeleccionadas.length; i++) {
        if (arregloCeldasSeleccionadas[i].nombre.localeCompare(variable.nombre) == 0) {
          arregloCeldasSeleccionadas.splice(i, 1);
        }
      }

      ; //this.props.retornoSeleccion(arregloVariableSeleccionada);

      var nuevoArr = _toConsumableArray(this.state.indicesVarSeleccionados);

      nuevoArr[indice] = false;
      this.setState({
        indicesVarSeleccionados: nuevoArr
      });
      console.log("despues deseleccionarIndice");
      console.log('arregloCeldasSeleccionadas');
      console.log(arregloCeldasSeleccionadas);
      console.log('this.state.indicesVarSeleccionados');
      console.log(this.state.indicesVarSeleccionados);
      this.props.retornoSeleccion(arregloCeldasSeleccionadas);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var clase = "btn btn-outline-secondary btnWhiteColorHover";

      if (!this.props.mostrarRosa) {
        clase = "btn btn-outline-primary btnWhiteColorHover";
      }

      return _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row text-center",
        style: {
          width: "100%",
          height: "100%",
          border: "1px solid #e6e6f2"
        }
      }, _react["default"].createElement("div", {
        className: "row text-center",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          border: "2px solid #607d8b",
          height: "20%"
        }
      }, _react["default"].createElement("label", null, this.props.titulo)), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%",
          height: "80%",
          overflowX: "auto",
          display: "flex",
          flexWrap: "nowrap"
        }
      }, this.props.variables.map(function (variable, i) {
        return _react["default"].createElement("div", {
          onClick: function onClick() {
            return _this2.clickEnListaCelda(variable, i);
          },
          style: _defineProperty({
            flex: "0 0 auto",
            width: "33%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflowWrap: "break-word",
            wordWrap: "break-word",
            whiteSpace: "-moz-pre-wrap"
          }, "whiteSpace", "pre-wrap"),
          className: clase + (_this2.state.indicesVarSeleccionados[i] ? _this2.props.mostrarRosa ? ' outline-secondary-selected' : ' outline-primary-selected' : ''),
          key: i
        }, variable.nombre);
      }))));
    }
  }]);

  return ListasSeleVariable;
}(_react["default"].Component);

exports["default"] = ListasSeleVariable;
//# sourceMappingURL=ListasSeleVariable.js.map
