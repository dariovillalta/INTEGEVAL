"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _Operacion = _interopRequireDefault(require("../Regla/Operacion.js"));

var _Valor = _interopRequireDefault(require("../Regla/Valor.js"));

var _FilasCeldas = _interopRequireDefault(require("../ContenedorCeldas/FilasCeldas.js"));

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

var textoOperacion = '',
    operacion = '',
    valor = '',
    valorTexto = '';
var tipoDeVariableSeleccionada = '';
var categoriasVariables = [{
  nombre: 'Cat1',
  variables: [{
    nombre: "test 1",
    seleccionada: false
  }, {
    nombre: "test 2",
    seleccionada: false
  }]
}, {
  nombre: 'Cat2',
  variables: [{
    nombre: "test 3",
    seleccionada: false
  }, {
    nombre: "test 4",
    seleccionada: false
  }, {
    nombre: "test 5",
    seleccionada: false
  }, {
    nombre: "test 6",
    seleccionada: false
  }]
}];

var Filtro =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Filtro, _React$Component);

  function Filtro(props) {
    var _this;

    _classCallCheck(this, Filtro);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Filtro).call(this, props));
    _this.state = {
      variables: [],
      indicadores: [],
      riesgos: [],
      variableSeleccionada: null,
      campoSeleccionado: null,
      tipoCampo: {
        esNumero: true,
        esBoolean: false,
        esFecha: false,
        esTexto: false
      },
      filtros: [],
      contenedorVariables: []
    };
    _this.getResultsVariables = _this.getResultsVariables.bind(_assertThisInitialized(_this));
    _this.getResultsVariablesFieldsInit = _this.getResultsVariablesFieldsInit.bind(_assertThisInitialized(_this));
    _this.getFieldAttributes = _this.getFieldAttributes.bind(_assertThisInitialized(_this));
    _this.getFieldResults = _this.getFieldResults.bind(_assertThisInitialized(_this));
    _this.getResultsIndicators = _this.getResultsIndicators.bind(_assertThisInitialized(_this));
    _this.getResultsIndicatorsFieldsInit = _this.getResultsIndicatorsFieldsInit.bind(_assertThisInitialized(_this));
    _this.getFieldAttributesIndicators = _this.getFieldAttributesIndicators.bind(_assertThisInitialized(_this));
    _this.getFieldResultsIndicators = _this.getFieldResultsIndicators.bind(_assertThisInitialized(_this));
    _this.getResultsRisks = _this.getResultsRisks.bind(_assertThisInitialized(_this));
    _this.getResultsRisksFieldsInit = _this.getResultsRisksFieldsInit.bind(_assertThisInitialized(_this));
    _this.getFieldAttributesRisks = _this.getFieldAttributesRisks.bind(_assertThisInitialized(_this));
    _this.getFieldResultsRisks = _this.getFieldResultsRisks.bind(_assertThisInitialized(_this));
    _this.selVar = _this.selVar.bind(_assertThisInitialized(_this));
    _this.selCampo = _this.selCampo.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionOperacion = _this.retornoSeleccionOperacion.bind(_assertThisInitialized(_this));
    _this.actualizarValor = _this.actualizarValor.bind(_assertThisInitialized(_this));
    _this.retornarValorFecha = _this.retornarValorFecha.bind(_assertThisInitialized(_this));
    _this.retornarValorTime = _this.retornarValorTime.bind(_assertThisInitialized(_this));
    _this.isValidDate = _this.isValidDate.bind(_assertThisInitialized(_this));
    _this.agregarFiltro = _this.agregarFiltro.bind(_assertThisInitialized(_this));
    _this.eliminarFiltro = _this.eliminarFiltro.bind(_assertThisInitialized(_this));
    _this.crearCodigoFiltros = _this.crearCodigoFiltros.bind(_assertThisInitialized(_this));
    _this.crearCodigoFiltro = _this.crearCodigoFiltro.bind(_assertThisInitialized(_this));
    _this.arregloCodigoFiltro = _this.arregloCodigoFiltro.bind(_assertThisInitialized(_this));
    _this.addDays = _this.addDays.bind(_assertThisInitialized(_this));
    _this.addMonths = _this.addMonths.bind(_assertThisInitialized(_this));
    _this.addYears = _this.addYears.bind(_assertThisInitialized(_this));
    _this.minusDays = _this.minusDays.bind(_assertThisInitialized(_this));
    _this.minusMonths = _this.minusMonths.bind(_assertThisInitialized(_this));
    _this.minusYears = _this.minusYears.bind(_assertThisInitialized(_this));
    _this.retornoVariables = _this.retornoVariables.bind(_assertThisInitialized(_this));
    _this.seleccionVariable = _this.seleccionVariable.bind(_assertThisInitialized(_this));
    textoOperacion = '';
    operacion = '';
    valor = '';
    valorTexto = '';
    return _this;
  }

  _createClass(Filtro, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getResultsVariables();
      this.getResultsIndicators();
      this.getResultsRisks();
    }
  }, {
    key: "getResultsVariables",
    value: function getResultsVariables() {
      var _this2 = this;

      var condicion = '';

      if (this.props.fechaInicial != null && this.props.fechaFinal != null) {
        var mesInicio = this.props.fechaInicial.getMonth() + 1;
        if (mesInicio.toString().length == 1) mesInicio = "0" + mesInicio;
        var mesFinal = this.props.fechaFinal.getMonth() + 1;
        if (mesFinal.toString().length == 1) mesFinal = "0" + mesFinal;
        condicion = "WHERE inicioVigencia >= '" + this.props.fechaInicial.getFullYear() + "-" + mesInicio + "-" + this.props.fechaInicial.getDate() + "' and (finVigencia = '1964-05-28' or finVigencia <= '" + this.props.fechaFinal.getFullYear() + "-" + mesFinal + "-" + this.props.fechaFinal.getDate() + "')";
      } else if (this.props.fechaInicial != null) {
        var mesInicio = this.props.fechaInicial.getMonth() + 1;
        if (mesInicio.toString().length == 1) mesInicio = "0" + mesInicio;
        condicion = "WHERE inicioVigencia >= '" + this.props.fechaInicial.getFullYear() + "-" + mesInicio + "-" + this.props.fechaInicial.getDate() + "'";
      } else if (this.props.fechaFinal != null) {
        var mesFinal = this.props.fechaFinal.getMonth() + 1;
        if (mesFinal.toString().length == 1) mesFinal = "0" + mesFinal;
        condicion = "WHERE finVigencia = '1964-05-28' or finVigencia <= '" + this.props.fechaFinal.getFullYear() + "-" + mesFinal + "-" + this.props.fechaFinal.getDate() + "'";
      } //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR


      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosNombreVariables " + condicion, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
              return [];
            }
          } else {
            transaction.commit(function (err) {
              _this2.getResultsVariablesFieldsInit(result.recordset);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsVariablesFieldsInit",
    value: function getResultsVariablesFieldsInit(resultados) {
      var arregloTemp = [];

      for (var i = 0; i < resultados.length; i++) {
        arregloTemp.push(resultados[i]);
        this.getFieldAttributes(resultados[i], i, arregloTemp);
        this.getFieldResults(resultados[i], i, arregloTemp);
      }

      ;
    }
  }, {
    key: "getFieldAttributes",
    value: function getFieldAttributes(resultado, index, array) {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '" + resultado.nombreVariable + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds() + "'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var arrTemp = [];

              for (var i = 0; i < result.recordset.length; i++) {
                arrTemp.push({
                  nombre: result.recordset[i].COLUMN_NAME,
                  tipo: result.recordset[i].DATA_TYPE
                });
              }

              ;
              array[index].atributos = arrTemp;

              _this3.setState({
                variables: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getFieldResults",
    value: function getFieldResults(resultado, index, array) {
      var _this4 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from " + resultado.nombreVariable + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds(), function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              array[index].resultados = result.recordset;

              _this4.setState({
                variables: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsIndicators",
    value: function getResultsIndicators() {
      var _this5 = this;

      var condicion = '';

      if (this.props.fechaInicial != null && this.props.fechaFinal != null) {
        var mesInicio = this.props.fechaInicial.getMonth() + 1;
        if (mesInicio.toString().length == 1) mesInicio = "0" + mesInicio;
        var mesFinal = this.props.fechaFinal.getMonth() + 1;
        if (mesFinal.toString().length == 1) mesFinal = "0" + mesFinal;
        condicion = "WHERE inicioVigencia >= '" + this.props.fechaInicial.getFullYear() + "-" + mesInicio + "-" + this.props.fechaInicial.getDate() + "' and (finVigencia = '1964-05-28' or finVigencia <= '" + this.props.fechaFinal.getFullYear() + "-" + mesFinal + "-" + this.props.fechaFinal.getDate() + "')";
      } else if (this.props.fechaInicial != null) {
        var mesInicio = this.props.fechaInicial.getMonth() + 1;
        if (mesInicio.toString().length == 1) mesInicio = "0" + mesInicio;
        condicion = "WHERE inicioVigencia >= '" + this.props.fechaInicial.getFullYear() + "-" + mesInicio + "-" + this.props.fechaInicial.getDate() + "'";
      } else if (this.props.fechaFinal != null) {
        var mesFinal = this.props.fechaFinal.getMonth() + 1;
        if (mesFinal.toString().length == 1) mesFinal = "0" + mesFinal;
        condicion = "WHERE finVigencia = '1964-05-28' or finVigencia <= '" + this.props.fechaFinal.getFullYear() + "-" + mesFinal + "-" + this.props.fechaFinal.getDate() + "'";
      } //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR


      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosNombreIndicadores " + condicion, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
              return [];
            }
          } else {
            transaction.commit(function (err) {
              _this5.getResultsIndicatorsFieldsInit(result.recordset);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsIndicatorsFieldsInit",
    value: function getResultsIndicatorsFieldsInit(resultados) {
      var arregloTemp = [];

      for (var i = 0; i < resultados.length; i++) {
        arregloTemp.push(resultados[i]);
        this.getFieldAttributesIndicators(resultados[i], i, arregloTemp);
        this.getFieldResultsIndicators(resultados[i], i, arregloTemp);
      }

      ;
    }
  }, {
    key: "getFieldAttributesIndicators",
    value: function getFieldAttributesIndicators(resultado, index, array) {
      var _this6 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '" + resultado.nombreIndicador + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds() + "'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var arrTemp = [];

              for (var i = 0; i < result.recordset.length; i++) {
                arrTemp.push({
                  nombre: result.recordset[i].COLUMN_NAME,
                  tipo: result.recordset[i].DATA_TYPE
                });
              }

              ;
              array[index].atributos = arrTemp;

              _this6.setState({
                indicadores: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getFieldResultsIndicators",
    value: function getFieldResultsIndicators(resultado, index, array) {
      var _this7 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from " + resultado.nombreIndicador + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds(), function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              array[index].resultados = result.recordset;

              _this7.setState({
                indicadores: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsRisks",
    value: function getResultsRisks() {
      var _this8 = this;

      var condicion = '';

      if (this.props.fechaInicial != null && this.props.fechaFinal != null) {
        var mesInicio = this.props.fechaInicial.getMonth() + 1;
        if (mesInicio.toString().length == 1) mesInicio = "0" + mesInicio;
        var mesFinal = this.props.fechaFinal.getMonth() + 1;
        if (mesFinal.toString().length == 1) mesFinal = "0" + mesFinal;
        condicion = "WHERE inicioVigencia >= '" + this.props.fechaInicial.getFullYear() + "-" + mesInicio + "-" + this.props.fechaInicial.getDate() + "' and (finVigencia = '1964-05-28' or finVigencia <= '" + this.props.fechaFinal.getFullYear() + "-" + mesFinal + "-" + this.props.fechaFinal.getDate() + "')";
      } else if (this.props.fechaInicial != null) {
        var mesInicio = this.props.fechaInicial.getMonth() + 1;
        if (mesInicio.toString().length == 1) mesInicio = "0" + mesInicio;
        condicion = "WHERE inicioVigencia >= '" + this.props.fechaInicial.getFullYear() + "-" + mesInicio + "-" + this.props.fechaInicial.getDate() + "'";
      } else if (this.props.fechaFinal != null) {
        var mesFinal = this.props.fechaFinal.getMonth() + 1;
        if (mesFinal.toString().length == 1) mesFinal = "0" + mesFinal;
        condicion = "WHERE finVigencia = '1964-05-28' or finVigencia <= '" + this.props.fechaFinal.getFullYear() + "-" + mesFinal + "-" + this.props.fechaFinal.getDate() + "'";
      } //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR


      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosNombreRiesgos " + condicion, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
              return [];
            }
          } else {
            transaction.commit(function (err) {
              _this8.getResultsRisksFieldsInit(result.recordset);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsRisksFieldsInit",
    value: function getResultsRisksFieldsInit(resultados) {
      var arregloTemp = [];

      for (var i = 0; i < resultados.length; i++) {
        arregloTemp.push(resultados[i]);
        this.getFieldAttributesRisks(resultados[i], i, arregloTemp);
        this.getFieldResultsRisks(resultados[i], i, arregloTemp);
      }

      ;
    }
  }, {
    key: "getFieldAttributesRisks",
    value: function getFieldAttributesRisks(resultado, index, array) {
      var _this9 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '" + resultado.nombreRiesgo + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds() + "'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var arrTemp = [];

              for (var i = 0; i < result.recordset.length; i++) {
                arrTemp.push({
                  nombre: result.recordset[i].COLUMN_NAME,
                  tipo: result.recordset[i].DATA_TYPE
                });
              }

              ;
              array[index].atributos = arrTemp;

              _this9.setState({
                riesgos: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getFieldResultsRisks",
    value: function getFieldResultsRisks(resultado, index, array) {
      var _this10 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from " + resultado.nombreRiesgo + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds(), function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              array[index].resultados = result.recordset;

              _this10.setState({
                riesgos: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "selVar",
    value: function selVar(index, arreglo) {
      var ref;

      if (arreglo.localeCompare("variable") == 0) {
        ref = this.state.variables[index];
        tipoDeVariableSeleccionada = "variable";
      } else if (arreglo.localeCompare("indicador") == 0) {
        ref = this.state.indicadores[index];
        tipoDeVariableSeleccionada = "indicador";
      } else if (arreglo.localeCompare("riesgo") == 0) {
        ref = this.state.riesgos[index];
        tipoDeVariableSeleccionada = "riesgo";
      }

      this.setState({
        variableSeleccionada: ref,
        campoSeleccionado: null
      });
    }
  }, {
    key: "selCampo",
    value: function selCampo(index) {
      var copy = jQuery.extend(true, {}, this.state.variableSeleccionada);

      for (var i = 0; i < copy.atributos.length; i++) {
        if (i == index) copy.atributos[i].activa = true;else copy.atributos[i].activa = false;
      }

      ;
      var tipoCampo;

      if (copy.atributos[index].tipo.localeCompare("int") == 0 || copy.atributos[index].tipo.localeCompare("decimal") == 0) {
        tipoCampo = {
          esNumero: true,
          esBoolean: false,
          esFecha: false,
          esTexto: false
        };
      } else if (copy.atributos[index].tipo.localeCompare("bool") == 0) {
        tipoCampo = {
          esNumero: false,
          esBoolean: true,
          esFecha: false,
          esTexto: false
        };
      } else if (copy.atributos[index].tipo.localeCompare("date") == 0) {
        tipoCampo = {
          esNumero: false,
          esBoolean: false,
          esFecha: true,
          esTexto: false
        };
      } else if (copy.atributos[index].tipo.localeCompare("varchar") == 0) {
        tipoCampo = {
          esNumero: false,
          esBoolean: false,
          esFecha: false,
          esTexto: true
        };
      }

      console.log('copy.atributos[index]');
      console.log(copy.atributos[index]);
      console.log('copy.atributos');
      console.log(copy.atributos);
      this.setState({
        variableSeleccionada: copy,
        campoSeleccionado: copy.atributos[index],
        tipoCampo: tipoCampo
      }, console.log(this.state.tipoCampo));
    }
  }, {
    key: "retornoSeleccionOperacion",
    value: function retornoSeleccionOperacion(textoOperacionNuevo, operacionNuevo) {
      textoOperacion = textoOperacionNuevo;
      operacion = operacionNuevo;
    }
  }, {
    key: "actualizarValor",
    value: function actualizarValor(e) {
      var valorN = $("#valor").val();
      /*this.setState({
          textoValor: valorN
      });*/

      if (this.state.tipoCampo.esNumero) {
        var numero = parseFloat(valorN);

        if (!isNaN(numero)) {
          var valorARetornar = "MANUAL=NUMERO[" + numero + "]";
          console.log('1');
          console.log(valorARetornar);
          valor = valorARetornar;
          valorTexto = valorN;
        } else if (this.state.campoSeleccionado.nombre.localeCompare("{campo}") != 0) {
          alert('Valor Ingresado no es un número válido');
        }
      } else if (this.state.tipoCampo.esBoolean) {
        if (numero.localeCompare("true") == 0 || numero.localeCompare("false") == 0) {
          var valorARetornar = "MANUAL=BOOL[" + valorN + "]";
          console.log('2');
          console.log(valorARetornar);
          valor = valorARetornar;
          valorTexto = valorN;
        } else if (this.state.campoSeleccionado.nombre.localeCompare("{campo}") != 0) {
          alert('Valor Ingresado no es un valor booleano válido');
        }
      } else if (this.state.tipoCampo.esFecha) {
        var fecha = null;

        if (valorN.indexOf("-") != -1 && valorN.split("-").length > 2) {
          fecha = new Date(valorN.split("-")[0], valorN.split("-")[1], valorN.split("-")[2]);
        } else if (valorN.indexOf("/") != -1 && valorN.split("/").length > 2) {
          fecha = new Date(valorN.split("/")[0], valorN.split("/")[1], valorN.split("/")[2]);
        }

        if (fecha != null && this.isValidDate(fecha)) {
          var valorARetornar = "MANUAL=FECHA[";

          if (valorN.indexOf("-") != -1 && valorN.split("-").length > 2) {
            valorARetornar += valorN.split("-")[0] + "," + valorN.split("-")[1] + "," + valorN.split("-")[2] + "]";
          } else if (valorN.indexOf("/") != -1 && valorN.split("/").length > 2) {
            valorARetornar += valorN.split("/")[0] + "," + valorN.split("/")[1] + "," + valorN.split("/")[2] + "]";
          }

          console.log('3');
          console.log(valorARetornar);
          valor = valorARetornar;
          valorTexto = valorN;
        } else if (this.state.campoSeleccionado.nombre.localeCompare("{campo}") != 0) {
          alert('Valor Ingresado no es una fecha válida');
        }
      } else if (this.state.tipoCampo.esTexto) {
        if (valorN.length > 0 || valorN.length < 984) {
          var valorARetornar = "MANUAL=VARCHAR[" + valorN + "]";
          console.log('4');
          console.log(valorARetornar);
          valor = valorARetornar;
          valorTexto = valorN;
        } else if (this.state.campoSeleccionado.nombre.localeCompare("{campo}") != 0) {
          if (valorN.length > 0) alert('Valor Ingresado debe tener una longitud mayor a 0');else alert('Valor Ingresado debe tener una longitud menor a 984');
        }
      }
    }
  }, {
    key: "retornarValorFecha",
    value: function retornarValorFecha(valorN, valorTextoN) {
      valor = valorN;
      valorTexto = valorTextoN;
    }
  }, {
    key: "retornarValorTime",
    value: function retornarValorTime(valorN, valorTextoN) {
      valor = valorN;
      valorTexto = valorTextoN;
    }
  }, {
    key: "isValidDate",
    value: function isValidDate(fecha) {
      if (Object.prototype.toString.call(fecha) === "[object Date]") {
        if (isNaN(fecha.getTime())) {
          alert("Ingrese una fecha valida.");
          return false;
        } else {
          return true;
        }
      } else {
        alert("Ingrese una fecha valida.");
        return false;
      }
    }
  }, {
    key: "agregarFiltro",
    value: function agregarFiltro() {
      var variableID = this.state.variableSeleccionada.ID;
      var nombreCampo = this.state.campoSeleccionado.nombre;
      var tipoCampo = this.state.campoSeleccionado.tipo;
      var nuevoFiltro = {
        variableID: variableID,
        nombreCampo: nombreCampo,
        tipoCampoObjetivo: tipoCampo,
        operacion: operacion,
        operacionTexto: textoOperacion,
        valor: valor,
        texto: nombreCampo + " " + textoOperacion + " " + valorTexto
      };

      if (tipoDeVariableSeleccionada.localeCompare("variable") == 0) {
        nuevoFiltro.esVariable = true;
      } else if (tipoDeVariableSeleccionada.localeCompare("indicador") == 0) {
        nuevoFiltro.esIndicador = true;
      } else if (tipoDeVariableSeleccionada.localeCompare("riesgo") == 0) {
        nuevoFiltro.esRiesgo = true;
      }

      var copyFiltros = _toConsumableArray(this.state.filtros);

      copyFiltros.push(nuevoFiltro);
      this.setState({
        filtros: copyFiltros
      });
    }
  }, {
    key: "eliminarFiltro",
    value: function eliminarFiltro(index) {
      var copyFiltros = _toConsumableArray(this.state.filtros);

      copyFiltros.splice(index, 1);
      this.setState({
        filtros: copyFiltros
      });
    }
  }, {
    key: "crearCodigoFiltros",
    value: function crearCodigoFiltros() {
      //agregar filtros por variable
      console.log('this.state.filtros');
      console.log(this.state.filtros);
      var filtrosAgrupadosPorVariables = [];

      for (var k = 0; k < this.state.filtros.length; k++) {
        if (this.state.filtros[k].esVariable) {
          var agregoFiltro = false;

          ForPrincipa: for (var i = 0; i < filtrosAgrupadosPorVariables.length; i++) {
            for (var j = 0; j < filtrosAgrupadosPorVariables[i].length; j++) {
              if (filtrosAgrupadosPorVariables[i][j].variableID == this.state.filtros[k].variableID) {
                agregoFiltro = true;
                filtrosAgrupadosPorVariables[i].push(this.state.filtros[k]); //filtrosAgrupadosPorVariables[i][filtrosAgrupadosPorVariables[i].length-1].filtroPadre = filtrosAgrupadosPorVariables[i].length-2;

                break ForPrincipa;
              }
            }

            ;
          }

          ;

          if (!agregoFiltro) {
            filtrosAgrupadosPorVariables.push([this.state.filtros[k]]);
          }
        }
      }

      ;
      console.log('filtrosAgrupadosPorVariables');
      console.log(filtrosAgrupadosPorVariables);
      var filtrosAgrupadosPorIndicadores = [];

      for (var k = 0; k < this.state.filtros.length; k++) {
        if (this.state.filtros[k].esIndicador) {
          var agregoFiltro = false;

          ForPrincipa: for (var i = 0; i < filtrosAgrupadosPorIndicadores.length; i++) {
            for (var j = 0; j < filtrosAgrupadosPorIndicadores[i].length; j++) {
              if (filtrosAgrupadosPorIndicadores[i][j].variableID == this.state.filtros[k].variableID) {
                agregoFiltro = true;
                filtrosAgrupadosPorIndicadores[i].push(this.state.filtros[k]); //filtrosAgrupadosPorIndicadores[i][filtrosAgrupadosPorIndicadores[i].length-1].filtroPadre = filtrosAgrupadosPorIndicadores[i].length-2;

                break ForPrincipa;
              }
            }

            ;
          }

          ;

          if (!agregoFiltro) {
            filtrosAgrupadosPorIndicadores.push([this.state.filtros[k]]);
          }
        }
      }

      ;
      console.log('filtrosAgrupadosPorIndicadores');
      console.log(filtrosAgrupadosPorIndicadores);
      var filtrosAgrupadosPorRiesgos = [];

      for (var k = 0; k < this.state.filtros.length; k++) {
        if (this.state.filtros[k].esRiesgo) {
          var agregoFiltro = false;

          ForPrincipa: for (var i = 0; i < filtrosAgrupadosPorRiesgos.length; i++) {
            for (var j = 0; j < filtrosAgrupadosPorRiesgos[i].length; j++) {
              if (filtrosAgrupadosPorRiesgos[i][j].variableID == this.state.filtros[k].variableID) {
                agregoFiltro = true;
                filtrosAgrupadosPorRiesgos[i].push(this.state.filtros[k]); //filtrosAgrupadosPorRiesgos[i][filtrosAgrupadosPorRiesgos[i].length-1].filtroPadre = filtrosAgrupadosPorRiesgos[i].length-2;

                break ForPrincipa;
              }
            }

            ;
          }

          ;

          if (!agregoFiltro) {
            filtrosAgrupadosPorRiesgos.push([this.state.filtros[k]]);
          }
        }
      }

      ;
      console.log('filtrosAgrupadosPorRiesgos');
      console.log(filtrosAgrupadosPorRiesgos);
      console.log('this.state.variables');
      console.log(this.state.variables);
      console.log('this.state.indicadores');
      console.log(this.state.indicadores);
      console.log('this.state.riesgos');
      console.log(this.state.riesgos); //crearCodigo

      var codigoVariables = '';

      for (var i = 0; i < filtrosAgrupadosPorVariables.length; i++) {
        if (filtrosAgrupadosPorVariables[i].length > 0) {
          codigoVariables += '\n\tfor (var x = variables[' + i + '].resultados.length-1; x >= 0; x--) {';
        }

        for (var j = 0; j < filtrosAgrupadosPorVariables[i].length; j++) {
          codigoVariables += this.crearCodigoFiltro(filtrosAgrupadosPorVariables[i][j], 2, 'variables[' + i + '].resultados');
        }

        ;

        if (filtrosAgrupadosPorVariables[i].length > 0) {
          codigoVariables += '\n\t}\n';
        }
      }

      ;

      for (var i = 0; i < filtrosAgrupadosPorIndicadores.length; i++) {
        if (filtrosAgrupadosPorIndicadores[i].length > 0) {
          codigoVariables += '\n\tfor (var x = indicadores[' + i + '].resultados.length-1; x >= 0; x--) {';
        }

        for (var j = 0; j < filtrosAgrupadosPorIndicadores[i].length; j++) {
          codigoVariables += this.crearCodigoFiltro(filtrosAgrupadosPorIndicadores[i][j], 2, 'indicadores[' + i + '].resultados');
        }

        ;

        if (filtrosAgrupadosPorIndicadores[i].length > 0) {
          codigoVariables += '\n\t}\n';
        }
      }

      ;

      for (var i = 0; i < filtrosAgrupadosPorRiesgos.length; i++) {
        if (filtrosAgrupadosPorRiesgos[i].length > 0) {
          codigoVariables += '\n\tfor (var x = riesgos[' + i + '].resultados.length-1; x >= 0; x--) {';
        }

        for (var j = 0; j < filtrosAgrupadosPorRiesgos[i].length; j++) {
          codigoVariables += this.crearCodigoFiltro(filtrosAgrupadosPorRiesgos[i][j], 2, 'riesgos[' + i + '].resultados');
        }

        ;

        if (filtrosAgrupadosPorRiesgos[i].length > 0) {
          codigoVariables += '\n\t}\n';
        }
      }

      ;
      window['aplicarFiltros'] = new Function('return function aplicarFiltros(isValidDate, retornoVariables, variables, indicadores, riesgos){' + '\n' + codigoVariables + '\n\tretornoVariables();\n' + '}')();
      console.log('codigoVariables');
      console.log(codigoVariables);
      window['aplicarFiltros'](this.isValidDate, this.retornoVariables, this.state.variables, this.state.indicadores, this.state.riesgos);
    }
  }, {
    key: "crearCodigoFiltro",
    value: function crearCodigoFiltro(filtro, tabs, nombreReferenciaArregloEnCodigo) {
      console.log('filtro');
      console.log(filtro);
      var codigo = '';
      var resultado = this.arregloCodigoFiltro(filtro, tabs, [], [], nombreReferenciaArregloEnCodigo);
      if (resultado.length > 0) resultado[0].codigo = "\n" + resultado[0].codigo; //$.merge( prestamosCuerpo, resultado );

      for (var i = 0; i < resultado.length; i++) {
        codigo += resultado[i].codigo;
      }

      ;
      return codigo;
    }
  }, {
    key: "arregloCodigoFiltro",
    value: function arregloCodigoFiltro(filtro, tabs, arreglo, arregloDeFiltros, nombreReferenciaArregloEnCodigo) {
      var tabsText = '';

      for (var i = 0; i < tabs; i++) {
        tabsText += '\t';
      }

      ;
      console.log('tabsText');
      console.log(tabsText);
      var posicionesIF = [];
      var newTabsTextFormula = ''; //condiciones if

      var arregloValoresAComparar = [];

      if (filtro.valor.indexOf("LISTAID") == 0) {//
      } else if (filtro.valor.indexOf("FECHA") == 0) {
        var fecha = filtro.valor.substring(filtro.valor.indexOf("(") + 1, filtro.valor.lastIndexOf(")"));
        var anio = fecha.split("-")[0];
        var mes = fecha.split("-")[1];
        var dia = fecha.split("-")[2];
        arregloValoresAComparar = ["new Date(" + anio + ", " + mes + ", " + dia + ").getTime()"];
      } else if (filtro.valor.indexOf("TIEMPO") == 0) {
        var stringValores = filtro.valor.substring(filtro.valor.indexOf("[") + 1, filtro.valor.lastIndexOf("]"));
        var diasAgregarCadena = stringValores.split(",")[0],
            mesesAgregarCadena = stringValores.split(",")[1],
            aniosAgregarCadena = stringValores.split(",")[2],
            futuro = stringValores.split(",")[3];
        var diasAgregar = parseInt(diasAgregarCadena.indexOf("=") + 1),
            mesesAgregar = parseInt(mesesAgregarCadena.indexOf("=") + 1),
            aniosAgregar = parseInt(aniosAgregarCadena.indexOf("=") + 1);
        var esFuturo = true;
        if (futuro.localeCompare("FUTURO") == 0) esFuturo = true;else esFuturo = false;
        var hoy = new Date();

        if (esFuturo) {
          hoy = this.addYears(hoy, aniosAgregar);
          hoy = this.addMonths(hoy, mesesAgregar);
          hoy = this.addDays(hoy, diasAgregar);
        } else {
          hoy = this.minusDays(hoy, diasAgregar);
          hoy = this.minusMonths(hoy, mesesAgregar);
          hoy = this.minusYears(hoy, aniosAgregar);
        }

        arregloValoresAComparar = ["new Date(" + hoy.getFullYear() + ", " + hoy.getMonth() + ", " + hoy.getDate() + ").getTime()"];
      } else if (filtro.valor.indexOf("MANUAL") == 0) {
        arregloValoresAComparar = [filtro.valor.substring(filtro.valor.indexOf("[") + 1, filtro.valor.lastIndexOf("]"))];
      }

      var tamArreglo = arreglo.length; //for (var j = 0; j < tamArreglo; j++) {

      for (var i = 0; i < arregloValoresAComparar.length; i++) {
        var comparacion = "";
        var inicioComparacion = "";
        var operacion = "";

        if (filtro.operacion.localeCompare("ES_MENOR") == 0) {
          operacion = ">";
        } else if (filtro.operacion.localeCompare("ES_MENOR_O_IGUAL") == 0) {
          operacion = ">=";
        } else if (filtro.operacion.localeCompare("ES_MAYOR_O_IGUAL") == 0) {
          operacion = "<=";
        } else if (filtro.operacion.localeCompare("ES_MAYOR") == 0) {
          operacion = "<";
        } else if (filtro.operacion.localeCompare("ES_IGUAL") == 0) {
          operacion = "!=";
        } else if (filtro.operacion.localeCompare("NO_ES_IGUAL") == 0) {
          operacion = "==";
        }

        if (filtro.tipoCampoObjetivo.localeCompare("date") == 0) {
          if (filtro.operacion.localeCompare("encuentra") == 0) {//
          } else if (filtro.operacion.localeCompare("no_encuentra") == 0) {//
          } else {
            inicioComparacion = nombreReferenciaArregloEnCodigo + "[x]." + filtro.nombreCampo + " != undefined && isValidDate(" + nombreReferenciaArregloEnCodigo + "[x]." + filtro.nombreCampo + ")";
            comparacion = nombreReferenciaArregloEnCodigo + "[x]." + filtro.nombreCampo + ".getTime() " + operacion + " " + arregloValoresAComparar[i];
          }
        } else if (filtro.tipoCampoObjetivo.localeCompare("varchar") == 0) {
          if (filtro.operacion.localeCompare("encuentra") == 0) {//
          } else if (filtro.operacion.localeCompare("no_encuentra") == 0) {//
          } else {
            inicioComparacion = nombreReferenciaArregloEnCodigo + "[x]." + filtro.nombreCampo + " != undefined";
            comparacion = nombreReferenciaArregloEnCodigo + "[x]." + filtro.nombreCampo + ".localeCompare('" + arregloValoresAComparar[i] + "') " + operacion + " 0";
          }
        } else if (filtro.tipoCampoObjetivo.localeCompare("int") == 0 || filtro.filtro.nombreCampo.localeCompare("decimal") == 0) {
          if (filtro.operacion.localeCompare("encuentra") == 0) {//
          } else if (filtro.operacion.localeCompare("no_encuentra") == 0) {//
          } else {
            inicioComparacion = nombreReferenciaArregloEnCodigo + "[x]." + filtro.nombreCampo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + "[x]." + filtro.nombreCampo + ")";
            comparacion = nombreReferenciaArregloEnCodigo + "[x]." + filtro.nombreCampo + " " + operacion + " " + arregloValoresAComparar[i];
          }
        } else if (filtro.tipoCampoObjetivo.localeCompare("bit") == 0) {
          inicioComparacion = nombreReferenciaArregloEnCodigo + "[x]." + filtro.nombreCampo + " != undefined";
          comparacion = nombreReferenciaArregloEnCodigo + "[x]." + filtro.nombreCampo + " " + operacion + " " + arregloValoresAComparar[i];
        }

        if (i + 1 == arregloValoresAComparar.length) {
          comparacion += " ) {";
        }

        if (i == 0) {
          arreglo.push({
            codigo: '\n' + tabsText + "console.log( " + comparacion.substring(0, comparacion.lastIndexOf(")")) + ");",
            tipo: "COMPARACION"
          });
          arreglo.push({
            codigo: '\n' + tabsText + "if ( " + inicioComparacion + " && " + comparacion,
            tipo: "COMPARACION"
          });
        } else {
          arreglo[arreglo.length - 1].codigo += " && " + comparacion;
        }
      }

      ;
      /*console.log("ENTROOO j");
      };*/

      arreglo.push({
        codigo: '\n' + tabsText + "\t" + nombreReferenciaArregloEnCodigo + ".splice(x, 1);",
        tipo: "COMPARACION"
      });
      posicionesIF.push(arreglo.length);
      var cuerpo = arregloDeFiltros.filter(function (object, index) {
        return object.filtroPadre == index;
      });

      if (cuerpo.length > 0) {
        var arregloCuerpo = [];

        for (var i = 0; i < cuerpo.length; i++) {
          var retorno = this.arregloCodigoFiltro(cuerpo[i], tabs + 1, [], arregloDeFiltros, nombreReferenciaArregloEnCodigo);
          retorno[0].codigo = "\n" + retorno[0].codigo;
          $.merge(arregloCuerpo, retorno);
        }

        ;

        for (var i = 0; i < posicionesIF.length; i++) {
          arreglo.splice.apply(arreglo, [posicionesIF[i], 0].concat(arregloCuerpo));
          if (filtro.esCondicion) arreglo.splice(posicionesIF[i] + arregloCuerpo.length, 0, {
            codigo: "\n" + tabsText + "}",
            filtro: ""
          });

          for (var j = i; j < posicionesIF.length; j++) {
            posicionesIF[j] += arregloCuerpo.length;
          }

          ;
        }

        ;
        if (posicionesIF.length == 0) $.merge(arreglo, arregloCuerpo);
        return arreglo;
      } else {
        if (filtro.esCondicion || posicionesIF.length > 0) {
          for (var i = 0; i < posicionesIF.length; i++) {
            if (newTabsTextFormula.length > 0) newTabsTextFormula = newTabsTextFormula.substring(0, newTabsTextFormula.length - 1);
            arreglo.splice(posicionesIF[i], 0, {
              codigo: "\n" + tabsText + newTabsTextFormula + "}",
              filtro: ""
            });
          }

          ;
        }

        return arreglo;
      }
    }
  }, {
    key: "addDays",
    value: function addDays(fecha, days) {
      var date = new Date(fecha);
      date.setDate(date.getDate() + days);
      return date;
    }
  }, {
    key: "addMonths",
    value: function addMonths(fecha, months) {
      var date = new Date(fecha);
      date.setMonth(date.getMonth() + months);
      return date;
    }
  }, {
    key: "addYears",
    value: function addYears(fecha, years) {
      var date = new Date(fecha);
      date.setYear(date.getYear() + years);
      return date;
    }
  }, {
    key: "minusDays",
    value: function minusDays(fecha, days) {
      var date = new Date(fecha);

      if (date.getDate() >= days) {
        date.setDate(date.getDate() - days);
      } else {
        date.setDate(days - date.getDate());
      }

      return date;
    }
  }, {
    key: "minusMonths",
    value: function minusMonths(fecha, months) {
      var date = new Date(fecha);

      if (date.getMonth() >= months) {
        date.setMonth(date.getMonth() - months);
      } else {
        date.setMonth(months - date.getMonth());
      }

      return date;
    }
  }, {
    key: "minusYears",
    value: function minusYears(fecha, years) {
      var date = new Date(fecha);

      if (date.getFullYear() >= years) {
        date.setYear(date.getFullYear() - years);
      } else {
        date.setYear(years - date.getFullYear());
      }

      return date;
    }
  }, {
    key: "retornoVariables",
    value: function retornoVariables() {
      this.props.retornoVariables(this.state.variables, this.state.indicadores, this.state.riesgos);
    }
  }, {
    key: "seleccionVariable",
    value: function seleccionVariable(variable, posArregloPadre, posicionVariable) {
      var copyTemp = [].concat(categoriasVariables);
      copyTemp[posArregloPadre][posicionVariable].seleccionada = !variable.seleccionada;
      /*this.setState({
          categoriasVariables: copyTemp
      });*/
    }
  }, {
    key: "render",
    value: function render() {
      var _this11 = this;

      return _react["default"].createElement("div", null, this.props.navbar, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("h2", null, "Creaci\xF3n de Filtros"), _react["default"].createElement("ul", {
        className: "list-unstyled arrow"
      }, _react["default"].createElement("li", null, "Esta secci\xF3n permite la creaci\xF3n de valores a filtrar de los resultados de variables, indicadores y riegsos. Primero se selecciona un valor de la barra izquierda lo que muestra los campos disponibles de la variable en el cuadro de la derecha. Al seleccionar un campo se muestran las diferentes opciones disponibles para filtrar."), _react["default"].createElement("li", null, "Al crear un filtro, se mostrara en la tabla al fondo de la p\xE1gina en donde se podr\xE1 eliminar el filtro."), _react["default"].createElement("li", null, "Para avanzar a la siguiente ventana, se debe seleccionar por lo menos una variable de la barra izquierda."))), _react["default"].createElement(_FilasCeldas["default"], {
        categoriasVariables: categoriasVariables,
        seleccionVariable: this.seleccionVariable
      }), _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "70vh"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12",
        style: {
          height: "100%",
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        style: {
          height: "100%",
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "90%",
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3",
        style: {
          height: "100%",
          overflowY: "scroll",
          backgroundColor: "white"
        }
      }, this.state.contenedorVariables.map(function (variables, i) {
        return _react["default"].createElement("div", null, _react["default"].createElement("div", {
          style: {
            position: "sticky",
            top: "0",
            backgroundColor: "white",
            zIndex: "99"
          }
        }, _react["default"].createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "8%",
            width: "100%",
            paddingTop: "5px"
          }
        }, _react["default"].createElement("h2", null, "Variables")), _react["default"].createElement("div", {
          style: {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }
        }, _react["default"].createElement("div", {
          style: {
            width: "100%",
            border: "1px solid #999297",
            borderRadius: "50px"
          }
        }))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
          style: {
            paddingLeft: "5px",
            overflowX: "scroll"
          }
        }, variables.map(function (variable, j) {
          return _react["default"].createElement("div", {
            key: variable.ID
          }, _react["default"].createElement("label", {
            className: "custom-control custom-checkbox"
          }, _react["default"].createElement("input", {
            id: "varRad" + variable.ID,
            onClick: function onClick() {
              return _this11.selVar(i, "variable");
            },
            type: "checkbox",
            name: "sinoRadio",
            className: "custom-control-input"
          }), _react["default"].createElement("span", {
            className: "custom-control-label"
          }, variable.nombreVariable)), _react["default"].createElement("div", {
            style: {
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }
          }, _react["default"].createElement("div", {
            style: {
              width: "80%",
              border: "1px solid #d2d2e4",
              borderRadius: "50px"
            }
          })));
        }), _react["default"].createElement("label", {
          className: "custom-control custom-checkbox"
        }, _react["default"].createElement("input", {
          id: "todosVariables",
          type: "checkbox",
          name: "sinoRadio",
          className: "custom-control-input"
        }), _react["default"].createElement("span", {
          className: "custom-control-label"
        }, "Seleccionar / Deseleccionar Todos"))));
      })), _react["default"].createElement("div", {
        className: "col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 offset-sm-1",
        style: {
          height: "100%",
          width: "100%",
          padding: "0px",
          backgroundColor: "white"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          display: this.state.variableSeleccionada != null ? "" : "none",
          borderBottom: "3px solid #d2d2e4",
          height: "30%",
          width: "100%"
        }
      }, this.state.variableSeleccionada != null ? _react["default"].createElement("div", {
        className: "text-center",
        style: {
          height: "100%",
          width: "100%",
          overflowX: "scroll",
          whiteSpace: "nowrap"
        }
      }, this.state.variableSeleccionada.atributos.map(function (atributo, i) {
        var _ref;

        return _react["default"].createElement("div", {
          key: _this11.state.variableSeleccionada.nombre + atributo.nombre + atributo.ID,
          style: {
            height: "100%",
            width: "33%",
            display: "inline-block",
            lineHeight: "100%",
            borderRight: "1px solid #d2d2e4",
            backgroundColor: atributo.activa ? "rgba(210, 210, 228, 0.4)" : ""
          },
          onClick: function onClick() {
            return _this11.selCampo(i);
          },
          className: "addPointer"
        }, _react["default"].createElement("div", {
          style: {
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("p", {
          className: "lead",
          style: (_ref = {
            overflowWrap: "break-word",
            wordWrap: "break-word",
            whiteSpace: "-moz-pre-wrap"
          }, _defineProperty(_ref, "whiteSpace", "pre-wrap"), _defineProperty(_ref, "wordBreak", "break-all"), _defineProperty(_ref, "lineHeight", "1em"), _ref)
        }, atributo.nombre)));
      })) : null), _react["default"].createElement("div", {
        className: "row",
        style: {
          display: this.state.campoSeleccionado != null ? "" : "none",
          borderBottom: "3px solid #d2d2e4",
          height: "30%"
        }
      }, _react["default"].createElement(_Operacion["default"], {
        esNumero: this.state.tipoCampo.esNumero,
        esBoolean: this.state.tipoCampo.esBoolean,
        esFecha: this.state.tipoCampo.esFecha,
        esTexto: this.state.tipoCampo.esTexto,
        retornoSeleccionOperacion: this.retornoSeleccionOperacion
      })), _react["default"].createElement("div", {
        className: "row",
        style: {
          display: this.state.campoSeleccionado != null ? "" : "none",
          height: "40%",
          overflowY: "scroll"
        }
      }, _react["default"].createElement(_Valor["default"], {
        esNumero: this.state.tipoCampo.esNumero,
        esBoolean: this.state.tipoCampo.esBoolean,
        esFecha: this.state.tipoCampo.esFecha,
        esTexto: this.state.tipoCampo.esTexto,
        retornarValorFecha: this.retornarValorFecha,
        retornarValorTime: this.retornarValorTime,
        actualizarValor: this.actualizarValor,
        pool: this.props.pool
      })))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "text-center",
        style: {
          width: "100%",
          backgroundColor: "white",
          padding: "2% 0%"
        }
      }, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-primary active",
        onClick: this.agregarFiltro
      }, "Agregar Filtro")), _react["default"].createElement("br", null)))), _react["default"].createElement("br", null), _react["default"].createElement("br", null), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white"
        }
      }, _react["default"].createElement("div", {
        style: {
          width: "50%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, "Agrupar por:"), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-radio custom-control-inline"
      }, _react["default"].createElement("input", {
        type: "radio",
        name: "radio-inline",
        className: "custom-control-input",
        defaultChecked: true
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }, "Variables, Indicadores y Riesgos")), _react["default"].createElement("label", {
        className: "custom-control custom-radio custom-control-inline"
      }, _react["default"].createElement("input", {
        type: "radio",
        name: "radio-inline",
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }, "Usuarios"))))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("a", {
        className: "btn btn-success btn-block btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: this.crearCodigoFiltros
      }, "Visualizar Variables")), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("table", {
        className: "table table-striped table-bordered"
      }, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        scope: "col"
      }, "Variables a Visualizar")))), _react["default"].createElement("table", {
        className: "table table-striped table-bordered"
      }, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        scope: "col"
      }, "#"), _react["default"].createElement("th", {
        scope: "col"
      }, "Instrucci\xF3n"), _react["default"].createElement("th", {
        scope: "col"
      }, "Borrar"))), _react["default"].createElement("tbody", null, this.state.filtros.map(function (filtro, i) {
        return _react["default"].createElement("tr", {
          key: filtro.instruccion + "" + i
        }, _react["default"].createElement("td", {
          scope: "row"
        }, i + 1), _react["default"].createElement("td", {
          scope: "row"
        }, filtro.texto), _react["default"].createElement("td", {
          scope: "row"
        }, _react["default"].createElement("img", {
          className: "addPointer",
          onClick: function onClick() {
            return _this11.eliminarFiltro(i);
          },
          src: "../assets/trash.png",
          style: {
            height: "20px",
            width: "20px",
            display: "block"
          }
        })));
      })))))));
    }
  }]);

  return Filtro;
}(_react["default"].Component);

exports["default"] = Filtro;
//# sourceMappingURL=Filtro.js.map
