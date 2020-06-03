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

var Campo =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Campo, _React$Component);

  function Campo(props) {
    var _this;

    _classCallCheck(this, Campo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Campo).call(this, props));
    _this.state = {
      indicesVarSeleccionadosConexiones: [],
      indicesVarSeleccionadosVariablesEscalares: [],
      indicesVarSeleccionadosVariables: [],
      indicesVarSeleccionadosExcel: [],
      indicesVarSeleccionadosFormas: [],
      indicesVarSeleccionadosVariablesSQL: []
    };
    _this.checkFieldType = _this.checkFieldType.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionVariableConexiones = _this.retornoSeleccionVariableConexiones.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionVariableVariablesEscalar = _this.retornoSeleccionVariableVariablesEscalar.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionVariableVariables = _this.retornoSeleccionVariableVariables.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionVariableExcel = _this.retornoSeleccionVariableExcel.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionVariableForma = _this.retornoSeleccionVariableForma.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionVariableVariablesSQL = _this.retornoSeleccionVariableVariablesSQL.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Campo, [{
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
      console.log('this.props.tablas');
      console.log(this.props.tablas);

      if (prevProps.tablas.length != this.props.tablas.length) {
        console.log('1');
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
    value: function retornoSeleccionVariableConexiones(variable, posicion) {
      var indicesVarSeleccionadosConexiones = _toConsumableArray(this.state.indicesVarSeleccionadosConexiones);

      for (var i = 0; i < this.props.tablas.length; i++) {
        for (var j = 0; j < this.props.camposTablas[i].length; j++) {
          if (this.props.camposTablas[i][j] != undefined && this.props.camposTablas[i][j].valor.localeCompare(variable[0].valor) != 0) {
            indicesVarSeleccionadosConexiones[i][j] = false;
          } else if (this.props.camposTablas[i][j] != undefined && this.props.camposTablas[i][j].valor.localeCompare(variable[0].valor) == 0 && i != posicion) {
            indicesVarSeleccionadosConexiones[i][j] = false;
          } else if (this.props.camposTablas[i][j].valor.localeCompare(variable[0].valor) == 0 && i == posicion) {
            indicesVarSeleccionadosConexiones[i][j] = true;
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
        indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
        indicesVarSeleccionadosVariablesEscalares: [],
        indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
        indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
        indicesVarSeleccionadosFormas: [],
        indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
      });
      this.checkFieldType(variable);
      this.props.retornoSeleccionVariable(variable);
    }
  }, {
    key: "retornoSeleccionVariableVariablesEscalar",
    value: function retornoSeleccionVariableVariablesEscalar(variable, posicion) {
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
        indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
        indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
        indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
        indicesVarSeleccionadosFormas: [],
        indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
      });
      this.checkFieldType(variable);
      this.props.retornoSeleccionVariable(variable);
    }
  }, {
    key: "retornoSeleccionVariableVariables",
    value: function retornoSeleccionVariableVariables(variable, posicion) {
      var indicesVarSeleccionadosConexiones = [];

      for (var i = 0; i < this.props.tablas.length; i++) {
        if (this.props.tablas[i] != undefined) {
          indicesVarSeleccionadosConexiones[i] = [];
        }
      }

      ;

      var indicesVarSeleccionadosVariables = _toConsumableArray(this.state.indicesVarSeleccionadosVariables);

      for (var i = 0; i < this.props.objetos.length; i++) {
        for (var j = 0; j < this.props.camposDeObjetos[i].length; j++) {
          if (this.props.camposDeObjetos[i][j] != undefined && this.props.camposDeObjetos[i][j].valor.localeCompare(variable[0].valor) != 0) {
            indicesVarSeleccionadosVariables[i][j] = false;
          } else if (this.props.camposDeObjetos[i][j] != undefined && this.props.camposDeObjetos[i][j].valor.localeCompare(variable[0].valor) == 0 && i != posicion) {
            indicesVarSeleccionadosVariables[i][j] = false;
          } else if (this.props.camposDeObjetos[i][j].valor.localeCompare(variable[0].valor) == 0 && i == posicion) {
            indicesVarSeleccionadosVariables[i][j] = true;
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
        indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
        indicesVarSeleccionadosVariablesEscalares: [],
        indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
        indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
        indicesVarSeleccionadosFormas: [],
        indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
      });
      this.checkFieldType(variable);
      this.props.retornoSeleccionVariable(variable);
    }
  }, {
    key: "retornoSeleccionVariableExcel",
    value: function retornoSeleccionVariableExcel(variable, posicion) {
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

      var indicesVarSeleccionadosExcel = _toConsumableArray(this.state.indicesVarSeleccionadosExcel);

      for (var i = 0; i < this.props.excel.length; i++) {
        for (var j = 0; j < this.props.camposDeExcel[i].length; j++) {
          if (this.props.camposDeExcel[i][j] != undefined && this.props.camposDeExcel[i][j].valor.localeCompare(variable[0].valor) != 0) {
            indicesVarSeleccionadosExcel[i][j] = false;
          } else if (this.props.camposDeExcel[i][j] != undefined && this.props.camposDeExcel[i][j].valor.localeCompare(variable[0].valor) == 0 && i != posicion) {
            indicesVarSeleccionadosExcel[i][j] = false;
          } else if (this.props.camposDeExcel[i][j].valor.localeCompare(variable[0].valor) == 0 && i == posicion) {
            indicesVarSeleccionadosExcel[i][j] = true;
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
        indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
        indicesVarSeleccionadosVariablesEscalares: [],
        indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
        indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
        indicesVarSeleccionadosFormas: [],
        indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
      });
      this.checkFieldType(variable);
      this.props.retornoSeleccionVariable(variable);
    }
  }, {
    key: "retornoSeleccionVariableForma",
    value: function retornoSeleccionVariableForma(variable, posicion) {
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
        indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
        indicesVarSeleccionadosVariablesEscalares: [],
        indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
        indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
        indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
      });
      this.checkFieldType(variable);
      this.props.retornoSeleccionVariable(variable);
    }
  }, {
    key: "retornoSeleccionVariableVariablesSQL",
    value: function retornoSeleccionVariableVariablesSQL(variable, posicion) {
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

      var indicesVarSeleccionadosVariablesSQL = _toConsumableArray(this.state.indicesVarSeleccionadosVariablesSQL);

      for (var i = 0; i < this.props.variablesSQL.length; i++) {
        for (var j = 0; j < this.props.camposVariablesSQL[i].length; j++) {
          if (this.props.camposVariablesSQL[i][j] != undefined && this.props.camposVariablesSQL[i][j].valor.localeCompare(variable[0].valor) != 0) {
            indicesVarSeleccionadosVariablesSQL[i][j] = false;
          } else if (this.props.camposVariablesSQL[i][j] != undefined && this.props.camposVariablesSQL[i][j].valor.localeCompare(variable[0].valor) == 0 && i != posicion) {
            indicesVarSeleccionadosVariablesSQL[i][j] = false;
          } else if (this.props.camposVariablesSQL[i][j].valor.localeCompare(variable[0].valor) == 0 && i == posicion) {
            indicesVarSeleccionadosConexiones[i][j] = true;
          }
        }

        ;
      }

      ;
      this.setState({
        indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
        indicesVarSeleccionadosVariablesEscalares: [],
        indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
        indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
        indicesVarSeleccionadosFormas: [],
        indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
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
        label: "Conexiones"
      }, this.props.tablas.map(function (conexion, i) {
        return _react["default"].createElement("div", {
          className: "row",
          key: conexion.valor + i,
          style: {
            height: "80%",
            width: "100%"
          }
        }, _this2.props.camposTablas[i] != undefined ? _react["default"].createElement(_ListasSeleVariable["default"], {
          mostrarRosa: false,
          variables: _this2.props.camposTablas[i],
          seleccionarMultiple: false,
          retornoSeleccion: _this2.retornoSeleccionVariableConexiones,
          titulo: conexion.valor,
          indiceTabla: i,
          indicesVarSeleccionados: _this2.state.indicesVarSeleccionadosConexiones[i]
        }) : null);
      })), _react["default"].createElement("div", {
        label: "Variables"
      }, this.props.objetos.map(function (variable, i) {
        return _react["default"].createElement("div", {
          className: "row",
          key: variable.valor + i,
          style: {
            height: "80%",
            width: "100%"
          }
        }, _this2.props.camposDeObjetos[i] != undefined ? _react["default"].createElement(_ListasSeleVariable["default"], {
          mostrarRosa: true,
          variables: _this2.props.camposDeObjetos[i],
          seleccionarMultiple: false,
          retornoSeleccion: _this2.retornoSeleccionVariableVariables,
          titulo: variable.valor,
          indiceTabla: i,
          indicesVarSeleccionados: _this2.state.indicesVarSeleccionadosVariables[i]
        }) : null);
      })), _react["default"].createElement("div", {
        label: "Variables Escalares"
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "80%",
          width: "100%"
        }
      }, _react["default"].createElement(_ListasSeleVariable["default"], {
        mostrarRosa: true,
        variables: this.props.variablesEscalares,
        seleccionarMultiple: false,
        retornoSeleccion: this.retornoSeleccionVariableVariablesEscalar,
        titulo: "Variables Escalares",
        indiceTabla: false,
        indicesVarSeleccionados: this.state.indicesVarSeleccionadosVariablesEscalares
      }))), _react["default"].createElement("div", {
        label: "Excel"
      }, this.props.excel.map(function (excel, i) {
        return _react["default"].createElement("div", {
          className: "row",
          key: excel.ID,
          style: {
            height: "80%",
            width: "100%"
          }
        }, _this2.props.camposDeExcel[i] != undefined ? _react["default"].createElement(_ListasSeleVariable["default"], {
          mostrarRosa: true,
          variables: _this2.props.camposDeExcel[i],
          seleccionarMultiple: false,
          retornoSeleccion: _this2.retornoSeleccionVariableExcel,
          titulo: excel.nombre,
          key: i,
          indiceTabla: i,
          indicesVarSeleccionados: _this2.state.indicesVarSeleccionadosExcel[i]
        }) : null);
      })), _react["default"].createElement("div", {
        label: "Formas"
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "80%",
          width: "100%"
        }
      }, _react["default"].createElement(_ListasSeleVariable["default"], {
        mostrarRosa: true,
        variables: this.props.formas,
        seleccionarMultiple: false,
        retornoSeleccion: this.retornoSeleccionVariableForma,
        titulo: "Formas",
        indiceTabla: false,
        indicesVarSeleccionados: this.state.indicesVarSeleccionadosFormas
      }))), _react["default"].createElement("div", {
        label: "Variables SQL"
      }, this.props.variablesSQL.map(function (excel, i) {
        return _react["default"].createElement("div", {
          className: "row",
          key: excel.ID,
          style: {
            height: "80%",
            width: "100%"
          }
        }, _this2.props.camposVariablesSQL[i] != undefined ? _react["default"].createElement(_ListasSeleVariable["default"], {
          mostrarRosa: true,
          variables: _this2.props.camposVariablesSQL[i],
          seleccionarMultiple: false,
          retornoSeleccion: _this2.retornoSeleccionVariableVariablesSQL,
          titulo: excel.nombre,
          key: i,
          indiceTabla: i,
          indicesVarSeleccionados: _this2.state.indicesVarSeleccionadosVariablesSQL[i]
        }) : null);
      }))));
    }
  }]);

  return Campo;
}(_react["default"].Component);

exports["default"] = Campo;
//# sourceMappingURL=Campo.js.map
