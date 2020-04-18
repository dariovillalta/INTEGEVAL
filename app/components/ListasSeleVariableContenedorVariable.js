"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ListasSeleVariable = _interopRequireDefault(require("./ListasSeleVariable.js"));

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

var ListasSeleVariableContenedorVariable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ListasSeleVariableContenedorVariable, _React$Component);

  function ListasSeleVariableContenedorVariable(props) {
    var _this;

    _classCallCheck(this, ListasSeleVariableContenedorVariable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ListasSeleVariableContenedorVariable).call(this, props));
    _this.state = {
      disableManualValue: true,
      indicesVarSeleccionadosConexiones: [],
      indicesVarSeleccionadosVariablesEscalares: [],
      indicesVarSeleccionadosVariables: [],
      indicesVarSeleccionadosExcel: [],
      indicesVarSeleccionadosFormas: [],
      indicesVarSeleccionadosVariablesSQL: []
    };
    _this.disableManualValue = _this.disableManualValue.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionVariableConexiones = _this.retornoSeleccionVariableConexiones.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionVariableVariablesEscalar = _this.retornoSeleccionVariableVariablesEscalar.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionVariableVariables = _this.retornoSeleccionVariableVariables.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionVariableExcel = _this.retornoSeleccionVariableExcel.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionVariableForma = _this.retornoSeleccionVariableForma.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionVariableVariablesSQL = _this.retornoSeleccionVariableVariablesSQL.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ListasSeleVariableContenedorVariable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.disableManualValue();

      if (this.props.tablas.length > 0) {
        var indicesVarSeleccionadosConexiones = [];

        for (var i = 0; i < this.props.tablas.length; i++) {
          if (this.props.tablas[i] != undefined) {
            indicesVarSeleccionadosConexiones[i] = [];
          }
        }

        ;
        this.setState({
          indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones
        });
      }

      if (this.props.objetos.length > 0) {
        var indicesVarSeleccionadosVariables = [];

        for (var i = 0; i < this.props.objetos.length; i++) {
          if (this.props.objetos[i] != undefined) {
            indicesVarSeleccionadosVariables[i] = [];
          }
        }

        ;
        this.setState({
          indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables
        });
      }

      if (this.props.excel.length > 0) {
        var indicesVarSeleccionadosExcel = [];

        for (var i = 0; i < this.props.excel.length; i++) {
          if (this.props.excel[i] != undefined) {
            indicesVarSeleccionadosExcel[i] = [];
          }
        }

        ;
        this.setState({
          indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel
        });
      }

      if (this.props.variablesSQL.length > 0) {
        var indicesVarSeleccionadosVariablesSQL = [];

        for (var i = 0; i < this.props.variablesSQL.length; i++) {
          if (this.props.variablesSQL[i] != undefined) {
            indicesVarSeleccionadosVariablesSQL[i] = [];
          }
        }

        ;
        this.setState({
          indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.tablas.length != this.props.tablas.length) {
        var indicesVarSeleccionadosConexiones = [];

        for (var i = 0; i < this.props.tablas.length; i++) {
          if (this.props.tablas[i] != undefined) {
            indicesVarSeleccionadosConexiones[i] = [];
          }
        }

        ;
        this.setState({
          indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones
        });
      }

      if (prevProps.objetos.length != this.props.objetos.length) {
        var indicesVarSeleccionadosVariables = [];

        for (var i = 0; i < this.props.objetos.length; i++) {
          if (this.props.objetos[i] != undefined) {
            indicesVarSeleccionadosVariables[i] = [];
          }
        }

        ;
        this.setState({
          indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables
        });
      }

      if (prevProps.excel.length != this.props.excel.length) {
        var indicesVarSeleccionadosExcel = [];

        for (var i = 0; i < this.props.excel.length; i++) {
          if (this.props.excel[i] != undefined) {
            indicesVarSeleccionadosExcel[i] = [];
          }
        }

        ;
        this.setState({
          indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel
        });
      }

      if (prevProps.variablesSQL.length != this.props.variablesSQL.length) {
        var indicesVarSeleccionadosVariablesSQL = [];

        for (var i = 0; i < this.props.variablesSQL.length; i++) {
          if (this.props.variablesSQL[i] != undefined) {
            indicesVarSeleccionadosVariablesSQL[i] = [];
          }
        }

        ;
        this.setState({
          indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
        });
      }
    }
  }, {
    key: "retornoSeleccionVariableConexiones",
    value: function retornoSeleccionVariableConexiones(variable, posicion, arreglo) {
      var indicesVarSeleccionadosConexiones = _toConsumableArray(this.state.indicesVarSeleccionadosConexiones); //indicesVarSeleccionadosConexiones[posicion] = arreglo;


      for (var i = 0; i < this.props.tablas.length; i++) {
        for (var j = 0; j < this.props.camposTablas[i].length; j++) {
          i;
          /*f(this.props.camposTablas[i][j] != undefined && this.props.camposTablas[i][j].valor.localeCompare(variable[0].valor) != 0) {
             indicesVarSeleccionadosConexiones[i][j] = false;
          } else if(this.props.camposTablas[i][j] != undefined && this.props.camposTablas[i][j].valor.localeCompare(variable[0].valor) == 0 && i != posicion) {
             indicesVarSeleccionadosConexiones[i][j] = false;
          } else if(this.props.camposTablas[i][j].valor.localeCompare(variable[0].valor) == 0 && i == posicion) {
             indicesVarSeleccionadosConexiones[i][j] = true;
          }*/

          if (j != posicion) {
            indicesVarSeleccionadosConexiones[j] = [];
          } else {
            indicesVarSeleccionadosConexiones[j] = arreglo;
          }
        }

        ;
      }

      ;
      var indicesVarSeleccionadosVariables = [];

      for (var i = 0; i < this.props.objetos.length; i++) {
        if (this.props.objetos[i] != undefined) {
          indicesVarSeleccionadosVariables[i] = [];
        }
      }

      ;
      var indicesVarSeleccionadosExcel = [];

      for (var i = 0; i < this.props.excel.length; i++) {
        if (this.props.excel[i] != undefined) {
          indicesVarSeleccionadosExcel[i] = [];
        }
      }

      ;
      var indicesVarSeleccionadosVariablesSQL = [];

      for (var i = 0; i < this.props.variablesSQL.length; i++) {
        if (this.props.variablesSQL[i] != undefined) {
          indicesVarSeleccionadosVariablesSQL[i] = [];
        }
      }

      ;
      this.setState({
        disableManualValue: false,
        indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
        indicesVarSeleccionadosVariablesEscalares: [],
        indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
        indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
        indicesVarSeleccionadosFormas: [],
        indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
      });
      $('#radioManual').prop('checked', false);
      $("#valorManual").prop("disabled", true);
      this.props.returnStateManualValue(false);
      this.props.retornoSeleccionVariable(this.props.esOperacion, variable, posicion);
    }
  }, {
    key: "retornoSeleccionVariableVariablesEscalar",
    value: function retornoSeleccionVariableVariablesEscalar(variable, posicion, arreglo) {
      var indicesVarSeleccionadosConexiones = [];

      for (var i = 0; i < this.props.tablas.length; i++) {
        if (this.props.tablas[i] != undefined) {
          indicesVarSeleccionadosConexiones[i] = [];
        }
      }

      ;
      var indicesVarSeleccionadosVariables = [];

      for (var i = 0; i < this.props.objetos.length; i++) {
        if (this.props.objetos[i] != undefined) {
          indicesVarSeleccionadosVariables[i] = [];
        }
      }

      ;
      var indicesVarSeleccionadosExcel = [];

      for (var i = 0; i < this.props.excel.length; i++) {
        if (this.props.excel[i] != undefined) {
          indicesVarSeleccionadosExcel[i] = [];
        }
      }

      ;
      var indicesVarSeleccionadosVariablesSQL = [];

      for (var i = 0; i < this.props.variablesSQL.length; i++) {
        if (this.props.variablesSQL[i] != undefined) {
          indicesVarSeleccionadosVariablesSQL[i] = [];
        }
      }

      ;
      this.setState({
        disableManualValue: false,
        indicesVarSeleccionadosVariablesEscalares: arreglo,
        indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
        indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
        indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
        indicesVarSeleccionadosFormas: [],
        indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
      });
      $('#radioManual').prop('checked', false);
      $("#valorManual").prop("disabled", true);
      this.props.returnStateManualValue(false);
      this.props.retornoSeleccionVariable(this.props.esOperacion, variable, posicion);
    }
  }, {
    key: "retornoSeleccionVariableVariables",
    value: function retornoSeleccionVariableVariables(variable, posicion, arreglo) {
      var indicesVarSeleccionadosConexiones = [];

      for (var i = 0; i < this.props.tablas.length; i++) {
        if (this.props.tablas[i] != undefined) {
          indicesVarSeleccionadosConexiones[i] = [];
        }
      }

      ;

      var indicesVarSeleccionadosVariables = _toConsumableArray(this.state.indicesVarSeleccionadosVariables); //indicesVarSeleccionadosVariables[posicion] = arreglo;


      for (var i = 0; i < this.props.objetos.length; i++) {
        for (var j = 0; j < this.props.camposDeObjetos[i].length; j++) {
          /*if(this.props.camposDeObjetos[i][j] != undefined && this.props.camposDeObjetos[i][j].valor.localeCompare(variable[0].valor) != 0) {
              indicesVarSeleccionadosVariables[i][j] = false;
          } else if(this.props.camposDeObjetos[i][j] != undefined && this.props.camposDeObjetos[i][j].valor.localeCompare(variable[0].valor) == 0 && i != posicion) {
              indicesVarSeleccionadosVariables[i][j] = false;
          } else if(this.props.camposDeObjetos[i][j].valor.localeCompare(variable[0].valor) == 0 && i == posicion) {
              indicesVarSeleccionadosVariables[i][j] = true;
          }*/
          if (j != posicion) {
            indicesVarSeleccionadosVariables[j] = [];
          } else {
            indicesVarSeleccionadosVariables[j] = arreglo;
          }
        }

        ;
      }

      ;
      var indicesVarSeleccionadosExcel = [];

      for (var i = 0; i < this.props.excel.length; i++) {
        if (this.props.excel[i] != undefined) {
          indicesVarSeleccionadosExcel[i] = [];
        }
      }

      ;
      var indicesVarSeleccionadosVariablesSQL = [];

      for (var i = 0; i < this.props.variablesSQL.length; i++) {
        if (this.props.variablesSQL[i] != undefined) {
          indicesVarSeleccionadosVariablesSQL[i] = [];
        }
      }

      ;
      this.setState({
        disableManualValue: false,
        indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
        indicesVarSeleccionadosVariablesEscalares: [],
        indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
        indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
        indicesVarSeleccionadosFormas: [],
        indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
      });
      $('#radioManual').prop('checked', false);
      $("#valorManual").prop("disabled", true);
      this.props.returnStateManualValue(false);
      this.props.retornoSeleccionVariable(this.props.esOperacion, variable, posicion);
    }
  }, {
    key: "retornoSeleccionVariableExcel",
    value: function retornoSeleccionVariableExcel(variable, posicion, arreglo) {
      var indicesVarSeleccionadosConexiones = [];

      for (var i = 0; i < this.props.tablas.length; i++) {
        if (this.props.tablas[i] != undefined) {
          indicesVarSeleccionadosConexiones[i] = [];
        }
      }

      ;
      var indicesVarSeleccionadosVariables = [];

      for (var i = 0; i < this.props.objetos.length; i++) {
        if (this.props.objetos[i] != undefined) {
          indicesVarSeleccionadosVariables[i] = [];
        }
      }

      ;

      var indicesVarSeleccionadosExcel = _toConsumableArray(this.state.indicesVarSeleccionadosExcel); //indicesVarSeleccionadosExcel[posicion] = arreglo;


      for (var i = 0; i < this.props.excel.length; i++) {
        for (var j = 0; j < this.props.camposDeExcel[i].length; j++) {
          /*if(this.props.camposDeExcel[i][j] != undefined && this.props.camposDeExcel[i][j].valor.localeCompare(variable[0].valor) != 0) {
              indicesVarSeleccionadosExcel[i][j] = false;
          } else if(this.props.camposDeExcel[i][j] != undefined && this.props.camposDeExcel[i][j].valor.localeCompare(variable[0].valor) == 0 && i != posicion) {
              indicesVarSeleccionadosExcel[i][j] = false;
          } else if(this.props.camposDeExcel[i][j].valor.localeCompare(variable[0].valor) == 0 && i == posicion) {
              indicesVarSeleccionadosExcel[i][j] = true;
          }*/
          if (j != posicion) {
            indicesVarSeleccionadosExcel[j] = [];
          } else {
            indicesVarSeleccionadosExcel[j] = arreglo;
          }
        }

        ;
      }

      ;
      var indicesVarSeleccionadosVariablesSQL = [];

      for (var i = 0; i < this.props.variablesSQL.length; i++) {
        if (this.props.variablesSQL[i] != undefined) {
          indicesVarSeleccionadosVariablesSQL[i] = [];
        }
      }

      ;
      this.setState({
        disableManualValue: false,
        indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
        indicesVarSeleccionadosVariablesEscalares: [],
        indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
        indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
        indicesVarSeleccionadosFormas: [],
        indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
      });
      $('#radioManual').prop('checked', false);
      $("#valorManual").prop("disabled", true);
      this.props.returnStateManualValue(false);
      this.props.retornoSeleccionVariable(this.props.esOperacion, variable, posicion);
    }
  }, {
    key: "retornoSeleccionVariableForma",
    value: function retornoSeleccionVariableForma(variable, posicion, arreglo) {
      var indicesVarSeleccionadosConexiones = [];

      for (var i = 0; i < this.props.tablas.length; i++) {
        if (this.props.tablas[i] != undefined) {
          indicesVarSeleccionadosConexiones[i] = [];
        }
      }

      ;
      var indicesVarSeleccionadosVariables = [];

      for (var i = 0; i < this.props.objetos.length; i++) {
        if (this.props.objetos[i] != undefined) {
          indicesVarSeleccionadosVariables[i] = [];
        }
      }

      ;
      var indicesVarSeleccionadosExcel = [];

      for (var i = 0; i < this.props.excel.length; i++) {
        if (this.props.excel[i] != undefined) {
          indicesVarSeleccionadosExcel[i] = [];
        }
      }

      ;
      var indicesVarSeleccionadosVariablesSQL = [];

      for (var i = 0; i < this.props.variablesSQL.length; i++) {
        if (this.props.variablesSQL[i] != undefined) {
          indicesVarSeleccionadosVariablesSQL[i] = [];
        }
      }

      ;
      this.setState({
        disableManualValue: false,
        indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
        indicesVarSeleccionadosVariablesEscalares: [],
        indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
        indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
        indicesVarSeleccionadosFormas: arreglo,
        indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
      });
      $('#radioManual').prop('checked', false);
      $("#valorManual").prop("disabled", true);
      this.props.returnStateManualValue(false);
      this.props.retornoSeleccionVariable(this.props.esOperacion, variable, posicion);
    }
  }, {
    key: "retornoSeleccionVariableVariablesSQL",
    value: function retornoSeleccionVariableVariablesSQL(variable, posicion, arreglo) {
      var indicesVarSeleccionadosConexiones = [];

      for (var i = 0; i < this.props.tablas.length; i++) {
        if (this.props.tablas[i] != undefined) {
          indicesVarSeleccionadosConexiones[i] = [];
        }
      }

      ;
      var indicesVarSeleccionadosVariables = [];

      for (var i = 0; i < this.props.objetos.length; i++) {
        if (this.props.objetos[i] != undefined) {
          indicesVarSeleccionadosVariables[i] = [];
        }
      }

      ;
      var indicesVarSeleccionadosExcel = [];

      for (var i = 0; i < this.props.excel.length; i++) {
        if (this.props.excel[i] != undefined) {
          indicesVarSeleccionadosExcel[i] = [];
        }
      }

      ;

      var indicesVarSeleccionadosVariablesSQL = _toConsumableArray(this.state.indicesVarSeleccionadosVariablesSQL); //indicesVarSeleccionadosVariablesSQL[posicion] = arreglo;


      for (var i = 0; i < this.props.variablesSQL.length; i++) {
        for (var j = 0; j < this.props.camposVariablesSQL[i].length; j++) {
          /*if(this.props.camposVariablesSQL[i][j] != undefined && this.props.camposVariablesSQL[i][j].valor.localeCompare(variable[0].valor) != 0) {
              indicesVarSeleccionadosVariablesSQL[i][j] = false;
          } else if(this.props.camposVariablesSQL[i][j] != undefined && this.props.camposVariablesSQL[i][j].valor.localeCompare(variable[0].valor) == 0 && i != posicion) {
              indicesVarSeleccionadosVariablesSQL[i][j] = false;
          } else if(this.props.camposVariablesSQL[i][j].valor.localeCompare(variable[0].valor) == 0 && i == posicion) {
              indicesVarSeleccionadosConexiones[i][j] = true;
          }*/
          if (j != posicion) {
            indicesVarSeleccionadosVariablesSQL[j] = [];
          } else {
            indicesVarSeleccionadosVariablesSQL[j] = arreglo;
          }
        }

        ;
      }

      ;
      this.setState({
        disableManualValue: false,
        indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
        indicesVarSeleccionadosVariablesEscalares: [],
        indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
        indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
        indicesVarSeleccionadosFormas: [],
        indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
      });
      $('#radioManual').prop('checked', false);
      $("#valorManual").prop("disabled", true);
      this.props.returnStateManualValue(false);
      this.props.retornoSeleccionVariable(this.props.esOperacion, variable, posicion);
    }
  }, {
    key: "disableManualValue",
    value: function disableManualValue() {
      if (this.state.disableManualValue) {
        $("#valorManual").prop("disabled", true);
        this.setState({
          disableManualValue: false
        });
        this.props.returnStateManualValue(false);
      } else {
        $("#valorManual").prop("disabled", false);
        this.setState({
          disableManualValue: true
        });
        this.props.returnStateManualValue(true);
      }
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
          retornoSeleccion: _this2.retornoSeleccionVariableConexiones,
          titulo: tabla.nombre,
          indiceTabla: i,
          indicesVarSeleccionados: _this2.state.indicesVarSeleccionadosConexiones[i]
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
        retornoSeleccion: this.retornoSeleccionVariableVariablesEscalar,
        titulo: "Variable Escalares",
        indiceTabla: false,
        indicesVarSeleccionados: this.state.indicesVarSeleccionadosVariablesEscalares
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
          retornoSeleccion: _this2.retornoSeleccionVariableVariables,
          titulo: objeto.nombre,
          key: i,
          indiceTabla: i,
          indicesVarSeleccionados: _this2.state.indicesVarSeleccionadosVariables[i]
        }) : null);
      }), this.props.excel.map(function (excel, i) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "80%"
          },
          key: excel.ID
        }, _this2.props.camposDeExcel[i] != undefined ? _react["default"].createElement(_ListasSeleVariable["default"], {
          mostrarRosa: _this2.props.mostrarRosa,
          variables: _this2.props.camposDeExcel[i],
          seleccionarMultiple: _this2.props.seleccionarMultiple,
          retornoSeleccion: _this2.retornoSeleccionVariableExcel,
          titulo: excel.nombre,
          key: i,
          indiceTabla: i,
          indicesVarSeleccionados: _this2.state.indicesVarSeleccionadosExcel[i]
        }) : null);
      }), this.props.formas.length > 0 ? _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "80%"
        }
      }, _react["default"].createElement(_ListasSeleVariable["default"], {
        mostrarRosa: this.props.mostrarRosa,
        variables: this.props.formas,
        seleccionarMultiple: this.props.seleccionarMultiple,
        retornoSeleccion: this.retornoSeleccionVariableForma,
        titulo: "Variables de Formas",
        indiceTabla: false,
        indicesVarSeleccionados: this.state.indicesVarSeleccionadosFormas
      })) : null, this.props.variablesSQL.map(function (variableSQL, i) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "80%"
          },
          key: variableSQL.ID
        }, _this2.props.camposVariablesSQL[i] != undefined ? _react["default"].createElement(_ListasSeleVariable["default"], {
          mostrarRosa: _this2.props.mostrarRosa,
          variables: _this2.props.camposVariablesSQL[i],
          seleccionarMultiple: _this2.props.seleccionarMultiple,
          retornoSeleccion: _this2.retornoSeleccionVariableVariablesSQL,
          titulo: variableSQL.nombre,
          key: i,
          indiceTabla: i,
          indicesVarSeleccionados: _this2.state.indicesVarSeleccionadosVariablesSQL[i]
        }) : null);
      }), _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "80%"
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
      }, _react["default"].createElement("div", null, _react["default"].createElement("label", null, "\"MANUAL\"")), _react["default"].createElement("input", {
        id: "radioManual",
        type: "checkbox",
        onClick: this.disableManualValue,
        style: {
          marginLeft: "10px"
        }
      })), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%",
          height: "15%",
          overflowX: "auto",
          display: "flex",
          flexWrap: "nowrap"
        }
      }, _react["default"].createElement("input", {
        id: "valorManual",
        type: "text",
        className: "form-control form-control-sm"
      })))));
    }
  }]);

  return ListasSeleVariableContenedorVariable;
}(_react["default"].Component);

exports["default"] = ListasSeleVariableContenedorVariable;
//# sourceMappingURL=ListasSeleVariableContenedorVariable.js.map
