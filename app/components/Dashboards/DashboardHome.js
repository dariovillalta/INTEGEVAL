"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _SeleccionarDashboard = _interopRequireDefault(require("./SeleccionarDashboard.js"));

var _CrearDashboard = _interopRequireDefault(require("./CrearDashboard.js"));

var _EditarDashboardHome = _interopRequireDefault(require("./EditarDashboardHome.js"));

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

var DashboardHome =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DashboardHome, _React$Component);

  function DashboardHome(props) {
    var _this;

    _classCallCheck(this, DashboardHome);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DashboardHome).call(this, props));
    _this.state = {
      componenteActual: "selDashboard",
      variables: [],
      camposDeVariables: [],
      indicadores: [],
      camposDeIndicadores: [],
      riesgos: [],
      camposDeRiesgos: [],
      dashboardSeleccionado: null
    };
    _this.crearDashboard = _this.crearDashboard.bind(_assertThisInitialized(_this));
    _this.retornarSeleccionDashboards = _this.retornarSeleccionDashboards.bind(_assertThisInitialized(_this));
    _this.editarDashboard = _this.editarDashboard.bind(_assertThisInitialized(_this));
    _this.terminoCrearDashboardPasarAEdit = _this.terminoCrearDashboardPasarAEdit.bind(_assertThisInitialized(_this));
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

  _createClass(DashboardHome, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getResultsVariables();
      this.getResultsIndicators();
      this.getResultsRisks();
    }
  }, {
    key: "crearDashboard",
    value: function crearDashboard() {
      this.setState({
        componenteActual: "crearDashboard"
      });
    }
  }, {
    key: "retornarSeleccionDashboards",
    value: function retornarSeleccionDashboards() {
      this.setState({
        componenteActual: "selDashboard"
      });
    }
  }, {
    key: "editarDashboard",
    value: function editarDashboard(dashboard) {
      this.setState({
        dashboardSeleccionado: dashboard,
        componenteActual: "editarDashboard"
      });
    }
  }, {
    key: "terminoCrearDashboardPasarAEdit",
    value: function terminoCrearDashboardPasarAEdit() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select top 1 * from Dashboard order by ID desc", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset != undefined) {
                if (result.recordset.length) {
                  _this2.editarDashboard(result.recordset[0]);
                }
              }
            });
          }
        });
      }); // fin transaction
    } /////////////////////////////////////////////////////////

  }, {
    key: "getResultsVariables",
    value: function getResultsVariables() {
      var _this3 = this;

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
              _this3.getResultsVariablesFieldsInit(result.recordset);
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
      var _this4 = this;

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

              _this4.setState({
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
      var _this5 = this;

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

              _this5.setState({
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
      var _this6 = this;

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
              _this6.getResultsIndicatorsFieldsInit(result.recordset);
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
      var _this7 = this;

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

              _this7.setState({
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
      var _this8 = this;

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

              _this8.setState({
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
      var _this9 = this;

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
              _this9.getResultsRisksFieldsInit(result.recordset);
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
      var _this10 = this;

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

              _this10.setState({
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
      var _this11 = this;

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

              _this11.setState({
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
      if (this.state.componenteActual.localeCompare("selDashboard") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_SeleccionarDashboard["default"], {
          pool: this.props.pool,
          configuracionHome: this.props.configuracionHome,
          crearDashboard: this.crearDashboard,
          goOptions: this.props.goOptions,
          editarDashboard: this.editarDashboard
        }));
      } else if (this.state.componenteActual.localeCompare("crearDashboard") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CrearDashboard["default"], {
          pool: this.props.pool,
          retornarSeleccionDashboards: this.retornarSeleccionDashboards,
          terminoCrearCampo: this.terminoCrearFuenteDatosPasarAEdit,
          variables: this.state.variables,
          camposDeVariables: this.state.camposDeVariables,
          indicadores: this.state.indicadores,
          camposDeIndicadores: this.state.camposDeIndicadores,
          riesgos: this.state.riesgos,
          camposDeRiesgos: this.state.camposDeRiesgos,
          terminoCrearDashboardPasarAEdit: this.terminoCrearDashboardPasarAEdit
        }));
      } else if (this.state.componenteActual.localeCompare("editarDashboard") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_EditarDashboardHome["default"], {
          pool: this.props.pool,
          retornarSeleccionDashboards: this.retornarSeleccionDashboards,
          variables: this.state.variables,
          indicadores: this.state.indicadores,
          riesgos: this.state.riesgos,
          dashboardSeleccionado: this.state.dashboardSeleccionado
        }));
      }
    }
  }]);

  return DashboardHome;
}(_react["default"].Component);

exports["default"] = DashboardHome;
//# sourceMappingURL=DashboardHome.js.map
