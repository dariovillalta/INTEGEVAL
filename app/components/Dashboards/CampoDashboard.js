"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ListasSeleVariable = _interopRequireDefault(require("../ListasSeleVariable.js"));

var _Accordion = _interopRequireDefault(require("../Accordion/Accordion.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var CampoDashboard =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CampoDashboard, _React$Component);

  function CampoDashboard(props) {
    var _this;

    _classCallCheck(this, CampoDashboard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CampoDashboard).call(this, props));
    _this.state = {
      indicesVarSeleccionadosVariables: [],
      indicesVarSeleccionadosIndicadores: [],
      indicesVarSeleccionadosRiesgos: []
    };
    _this.checkFieldType = _this.checkFieldType.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionVariableVariables = _this.retornoSeleccionVariableVariables.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionVariableIndicadores = _this.retornoSeleccionVariableIndicadores.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionVariableRiesgos = _this.retornoSeleccionVariableRiesgos.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CampoDashboard, [{
    key: "checkFieldType",
    value: function checkFieldType(campo) {
      if (campo[0].tipo.indexOf("int") == 0 || campo[0].tipo.indexOf("decimal") == 0 || campo[0].tipo.indexOf("numero") == 0) {
        this.props.esNumero();
      } else if (campo[0].tipo.indexOf("bit") == 0) {
        this.props.esBoolean();
      } else if (campo[0].tipo.indexOf("date") == 0) {
        this.props.esFecha();
      } else if (campo[0].tipo.indexOf("varchar") == 0) {
        this.props.esTexto();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.variables.length > 0) {
        var indicesVarSeleccionadosVariables = [];

        for (var i = 0; i < this.props.variables.length; i++) {
          if (this.props.variables[i] != undefined) {
            indicesVarSeleccionadosVariables[i] = [];
          }
        }

        ;
        this.setState({
          indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables
        });
      }

      if (this.props.indicadores.length > 0) {
        var indicesVarSeleccionadosIndicadores = [];

        for (var i = 0; i < this.props.indicadores.length; i++) {
          if (this.props.indicadores[i] != undefined) {
            indicesVarSeleccionadosIndicadores[i] = [];
          }
        }

        ;
        this.setState({
          indicesVarSeleccionadosIndicadores: indicesVarSeleccionadosIndicadores
        });
      }

      if (this.props.riesgos.length > 0) {
        var indicesVarSeleccionadosRiesgos = [];

        for (var i = 0; i < this.props.riesgos.length; i++) {
          if (this.props.riesgos[i] != undefined) {
            indicesVarSeleccionadosRiesgos[i] = [];
          }
        }

        ;
        this.setState({
          indicesVarSeleccionadosRiesgos: indicesVarSeleccionadosRiesgos
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.variables.length != this.props.variables.length) {
        var indicesVarSeleccionadosVariables = [];

        for (var i = 0; i < this.props.variables.length; i++) {
          if (this.props.variables[i] != undefined) {
            indicesVarSeleccionadosVariables[i] = [];
          }
        }

        ;
        this.setState({
          indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables
        });
      }

      if (prevProps.indicadores.length != this.props.indicadores.length) {
        var indicesVarSeleccionadosIndicadores = [];

        for (var i = 0; i < this.props.indicadores.length; i++) {
          if (this.props.indicadores[i] != undefined) {
            indicesVarSeleccionadosIndicadores[i] = [];
          }
        }

        ;
        this.setState({
          indicesVarSeleccionadosIndicadores: indicesVarSeleccionadosIndicadores
        });
      }

      if (prevProps.riesgos.length != this.props.riesgos.length) {
        var indicesVarSeleccionadosRiesgos = [];

        for (var i = 0; i < this.props.riesgos.length; i++) {
          if (this.props.riesgos[i] != undefined) {
            indicesVarSeleccionadosRiesgos[i] = [];
          }
        }

        ;
        this.setState({
          indicesVarSeleccionadosRiesgos: indicesVarSeleccionadosRiesgos
        });
      }
    }
  }, {
    key: "retornoSeleccionVariableVariables",
    value: function retornoSeleccionVariableVariables(variable, posicion) {
      var indicesVarSeleccionadosVariables = _toConsumableArray(this.state.indicesVarSeleccionadosVariables);

      for (var i = 0; i < this.props.variables.length; i++) {
        for (var j = 0; j < this.props.camposDeVariables[i].length; j++) {
          if (this.props.camposDeVariables[i][j] != undefined && this.props.camposDeVariables[i][j].nombre.localeCompare(variable[0].nombre) != 0) {
            indicesVarSeleccionadosVariables[i][j] = false;
          } else if (this.props.camposDeVariables[i][j] != undefined && this.props.camposDeVariables[i][j].nombre.localeCompare(variable[0].nombre) == 0 && i != posicion) {
            indicesVarSeleccionadosVariables[i][j] = false;
          } else if (this.props.camposDeVariables[i][j].nombre.localeCompare(variable[0].nombre) == 0 && i == posicion) {
            indicesVarSeleccionadosVariables[i][j] = true;
          }
        }

        ;
      }

      ;
      var indicesVarSeleccionadosIndicadores = [];

      for (var i = 0; i < this.props.indicadores.length; i++) {
        if (this.props.indicadores[i] != undefined) {
          indicesVarSeleccionadosIndicadores[i] = [];
        }
      }

      ;
      var indicesVarSeleccionadosRiesgos = [];

      for (var i = 0; i < this.props.riesgos.length; i++) {
        if (this.props.riesgos[i] != undefined) {
          indicesVarSeleccionadosRiesgos[i] = [];
        }
      }

      ;
      this.setState({
        indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
        indicesVarSeleccionadosIndicadores: indicesVarSeleccionadosIndicadores,
        indicesVarSeleccionadosRiesgos: indicesVarSeleccionadosRiesgos
      });
      this.checkFieldType(variable);
      this.props.retornoSeleccionVariable(variable);
    }
  }, {
    key: "retornoSeleccionVariableIndicadores",
    value: function retornoSeleccionVariableIndicadores(variable, posicion) {
      var indicesVarSeleccionadosVariables = [];

      for (var i = 0; i < this.props.variables.length; i++) {
        if (this.props.variables[i] != undefined) {
          indicesVarSeleccionadosVariables[i] = [];
        }
      }

      ;

      var indicesVarSeleccionadosIndicadores = _toConsumableArray(this.state.indicesVarSeleccionadosIndicadores);

      for (var i = 0; i < this.props.indicadores.length; i++) {
        for (var j = 0; j < this.props.camposDeIndicadores[i].length; j++) {
          if (this.props.camposDeIndicadores[i][j] != undefined && this.props.camposDeIndicadores[i][j].nombre.localeCompare(variable[0].nombre) != 0) {
            indicesVarSeleccionadosIndicadores[i][j] = false;
          } else if (this.props.camposDeIndicadores[i][j] != undefined && this.props.camposDeIndicadores[i][j].nombre.localeCompare(variable[0].nombre) == 0 && i != posicion) {
            indicesVarSeleccionadosIndicadores[i][j] = false;
          } else if (this.props.camposDeIndicadores[i][j].nombre.localeCompare(variable[0].nombre) == 0 && i == posicion) {
            indicesVarSeleccionadosIndicadores[i][j] = true;
          }
        }

        ;
      }

      ;
      var indicesVarSeleccionadosRiesgos = [];

      for (var i = 0; i < this.props.riesgos.length; i++) {
        if (this.props.riesgos[i] != undefined) {
          indicesVarSeleccionadosRiesgos[i] = [];
        }
      }

      ;
      this.setState({
        indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
        indicesVarSeleccionadosIndicadores: indicesVarSeleccionadosIndicadores,
        indicesVarSeleccionadosRiesgos: indicesVarSeleccionadosRiesgos
      });
      this.checkFieldType(variable);
      this.props.retornoSeleccionVariable(variable);
    }
  }, {
    key: "retornoSeleccionVariableRiesgos",
    value: function retornoSeleccionVariableRiesgos(variable, posicion) {
      var indicesVarSeleccionadosVariables = [];

      for (var i = 0; i < this.props.variables.length; i++) {
        if (this.props.variables[i] != undefined) {
          indicesVarSeleccionadosVariables[i] = [];
        }
      }

      ;
      var indicesVarSeleccionadosIndicadores = [];

      for (var i = 0; i < this.props.indicadores.length; i++) {
        if (this.props.indicadores[i] != undefined) {
          indicesVarSeleccionadosIndicadores[i] = [];
        }
      }

      ;

      var indicesVarSeleccionadosRiesgos = _toConsumableArray(this.state.indicesVarSeleccionadosRiesgos);

      for (var i = 0; i < this.props.riesgos.length; i++) {
        for (var j = 0; j < this.props.camposDeRiesgos[i].length; j++) {
          if (this.props.camposDeRiesgos[i][j] != undefined && this.props.camposDeRiesgos[i][j].nombre.localeCompare(variable[0].nombre) != 0) {
            indicesVarSeleccionadosRiesgos[i][j] = false;
          } else if (this.props.camposDeRiesgos[i][j] != undefined && this.props.camposDeRiesgos[i][j].nombre.localeCompare(variable[0].nombre) == 0 && i != posicion) {
            indicesVarSeleccionadosRiesgos[i][j] = false;
          } else if (this.props.camposDeRiesgos[i][j].nombre.localeCompare(variable[0].nombre) == 0 && i == posicion) {
            indicesVarSeleccionadosRiesgos[i][j] = true;
          }
        }

        ;
      }

      ;
      this.setState({
        indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
        indicesVarSeleccionadosIndicadores: indicesVarSeleccionadosIndicadores,
        indicesVarSeleccionadosRiesgos: indicesVarSeleccionadosRiesgos
      });
      this.checkFieldType(variable);
      this.props.retornoSeleccionVariable(variable);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%",
          maxHeight: "60vh",
          overflowY: "scroll"
        }
      }, _react["default"].createElement(_Accordion["default"], {
        showTrash: false,
        showEdit: false,
        color: "#ffffff"
      }, _react["default"].createElement("div", {
        label: "Variables"
      }, this.props.variables.map(function (variable, i) {
        return _react["default"].createElement("div", {
          className: "row",
          key: variable.nombreVariable + i,
          style: {
            height: "80%",
            width: "100%"
          }
        }, _this2.props.camposDeVariables[i] != undefined ? _react["default"].createElement(_ListasSeleVariable["default"], {
          mostrarRosa: true,
          variables: _this2.props.camposDeVariables[i],
          seleccionarMultiple: false,
          retornoSeleccion: _this2.retornoSeleccionVariableVariables,
          titulo: variable.nombreVariable,
          indiceTabla: i,
          indicesVarSeleccionados: _this2.state.indicesVarSeleccionadosVariables[i]
        }) : null);
      })), _react["default"].createElement("div", {
        label: "Indicadores"
      }, this.props.indicadores.map(function (indicador, i) {
        return _react["default"].createElement("div", {
          className: "row",
          key: indicador.nombreIndicador + i,
          style: {
            height: "80%",
            width: "100%"
          }
        }, _this2.props.camposDeIndicadores[i] != undefined ? _react["default"].createElement(_ListasSeleVariable["default"], {
          mostrarRosa: true,
          variables: _this2.props.camposDeIndicadores[i],
          seleccionarMultiple: false,
          retornoSeleccion: _this2.retornoSeleccionVariableIndicadores,
          titulo: indicador.nombreIndicador,
          indiceTabla: i,
          indicesVarSeleccionados: _this2.state.indicesVarSeleccionadosIndicadores[i]
        }) : null);
      })), _react["default"].createElement("div", {
        label: "Riesgos"
      }, this.props.riesgos.map(function (riesgo, i) {
        return _react["default"].createElement("div", {
          className: "row",
          key: riesgo.nombreRiesgo + i,
          style: {
            height: "80%",
            width: "100%"
          }
        }, _this2.props.camposDeRiesgos[i] != undefined ? _react["default"].createElement(_ListasSeleVariable["default"], {
          mostrarRosa: true,
          variables: _this2.props.camposDeRiesgos[i],
          seleccionarMultiple: false,
          retornoSeleccion: _this2.retornoSeleccionVariableRiesgos,
          titulo: riesgo.nombreRiesgo,
          indiceTabla: i,
          indicesVarSeleccionados: _this2.state.indicesVarSeleccionadosRiesgos[i]
        }) : null);
      }))));
    }
  }]);

  return CampoDashboard;
}(_react["default"].Component);

exports["default"] = CampoDashboard;
//# sourceMappingURL=CampoDashboard.js.map
