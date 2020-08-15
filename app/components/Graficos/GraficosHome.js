"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _CrearGrafico = _interopRequireDefault(require("./CrearGrafico.js"));

var _VerGrafico = _interopRequireDefault(require("./VerGrafico.js"));

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

var GraficosHome =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GraficosHome, _React$Component);

  function GraficosHome(props) {
    var _this;

    _classCallCheck(this, GraficosHome);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GraficosHome).call(this, props));
    _this.state = {
      componenteActual: "crearGrafico",
      variables: [],
      camposDeVariables: [],
      indicadores: [],
      camposDeIndicadores: [],
      riesgos: [],
      camposDeRiesgos: [],
      seccionesGraficos: null
    };
    _this.retornarCrearGrafico = _this.retornarCrearGrafico.bind(_assertThisInitialized(_this));
    _this.verGrafico = _this.verGrafico.bind(_assertThisInitialized(_this));
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
    return _this;
  }

  _createClass(GraficosHome, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getResultsVariables();
      this.getResultsIndicators();
      this.getResultsRisks();
    }
  }, {
    key: "retornarCrearGrafico",
    value: function retornarCrearGrafico() {
      this.setState({
        componenteActual: "crearGrafico"
      });
    }
  }, {
    key: "verGrafico",
    value: function verGrafico(secciones) {
      this.setState({
        seccionesGraficos: secciones,
        componenteActual: "verGrafico"
      });
    } /////////////////////////////////////////////////////////

  }, {
    key: "getResultsVariables",
    value: function getResultsVariables() {
      var _this2 = this;

      //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosNombreVariables", function (err, result) {
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
      var arregloTemp = [],
          arregloTempCampos = [];

      for (var i = 0; i < resultados.length; i++) {
        resultados[i].valor = resultados[i].nombreVariable;
        resultados[i].esVariable = true;
        resultados[i].esIndicador = false;
        resultados[i].esRiesgo = false;
        arregloTemp.push(resultados[i]);
        this.getFieldAttributes(resultados[i], i, arregloTemp, arregloTempCampos);
        this.getFieldResults(resultados[i], i, arregloTemp);
      }

      ;
    }
  }, {
    key: "getFieldAttributes",
    value: function getFieldAttributes(resultado, index, array, arregloTempCampos) {
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
                  valor: result.recordset[i].COLUMN_NAME,
                  tipo: result.recordset[i].DATA_TYPE,
                  esVariable: true,
                  esIndicador: false,
                  esRiesgo: false,
                  nombreVariable: resultado.nombreVariable
                });
              }

              ;
              array[index].atributos = arrTemp;
              arregloTempCampos[index] = arrTemp;

              _this3.setState({
                variables: array,
                camposDeVariables: arregloTempCampos
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

      //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosNombreIndicadores", function (err, result) {
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
      var arregloTemp = [],
          arregloTempCampos = [];

      for (var i = 0; i < resultados.length; i++) {
        resultados[i].valor = resultados[i].nombreIndicador;
        resultados[i].esVariable = false;
        resultados[i].esIndicador = true;
        resultados[i].esRiesgo = false;
        arregloTemp.push(resultados[i]);
        this.getFieldAttributesIndicators(resultados[i], i, arregloTemp, arregloTempCampos);
        this.getFieldResultsIndicators(resultados[i], i, arregloTemp);
      }

      ;
    }
  }, {
    key: "getFieldAttributesIndicators",
    value: function getFieldAttributesIndicators(resultado, index, array, arregloTempCampos) {
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
                  valor: result.recordset[i].COLUMN_NAME,
                  tipo: result.recordset[i].DATA_TYPE,
                  esVariable: false,
                  esIndicador: true,
                  esRiesgo: false,
                  nombreIndicador: resultado.nombreIndicador
                });
              }

              ;
              array[index].atributos = arrTemp;
              arregloTempCampos[index] = arrTemp;

              _this6.setState({
                indicadores: array,
                camposDeIndicadores: arregloTempCampos
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

      //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosNombreRiesgos", function (err, result) {
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
      var arregloTemp = [],
          arregloTempCampos = [];

      for (var i = 0; i < resultados.length; i++) {
        resultados[i].valor = resultados[i].nombreRiesgo;
        resultados[i].esVariable = false;
        resultados[i].esIndicador = false;
        resultados[i].esRiesgo = true;
        arregloTemp.push(resultados[i]);
        this.getFieldAttributesRisks(resultados[i], i, arregloTemp, arregloTempCampos);
        this.getFieldResultsRisks(resultados[i], i, arregloTemp);
      }

      ;
    }
  }, {
    key: "getFieldAttributesRisks",
    value: function getFieldAttributesRisks(resultado, index, array, arregloTempCampos) {
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
                  valor: result.recordset[i].COLUMN_NAME,
                  tipo: result.recordset[i].DATA_TYPE,
                  esVariable: false,
                  esIndicador: false,
                  esRiesgo: true,
                  nombreRiesgo: resultado.nombreRiesgo
                });
              }

              ;
              array[index].atributos = arrTemp;
              arregloTempCampos[index] = arrTemp;

              _this9.setState({
                riesgos: array,
                camposDeRiesgos: arregloTempCampos
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
    key: "render",
    value: function render() {
      if (this.state.componenteActual.localeCompare("crearGrafico") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CrearGrafico["default"], {
          pool: this.props.pool,
          verGrafico: this.verGrafico,
          terminoCrearCampo: this.terminoCrearFuenteDatosPasarAEdit,
          variables: this.state.variables,
          camposDeVariables: this.state.camposDeVariables,
          indicadores: this.state.indicadores,
          camposDeIndicadores: this.state.camposDeIndicadores,
          riesgos: this.state.riesgos,
          camposDeRiesgos: this.state.camposDeRiesgos,
          terminoCrearDashboardPasarAEdit: this.terminoCrearDashboardPasarAEdit
        }));
      } else if (this.state.componenteActual.localeCompare("verGrafico") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_VerGrafico["default"], {
          pool: this.props.pool,
          retornarSeleccionDashboards: this.retornarSeleccionDashboards,
          variables: this.state.variables,
          indicadores: this.state.indicadores,
          riesgos: this.state.riesgos,
          seccionesGraficos: this.state.seccionesGraficos
        }));
      }
    }
  }]);

  return GraficosHome;
}(_react["default"].Component);

exports["default"] = GraficosHome;
//# sourceMappingURL=GraficosHome.js.map
