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
      conexiones: [],
      camposConexiones: [],
      variablesEscalares: [],
      variables: [],
      camposVariables: [],
      variablesSQL: [],
      camposVariablesSQL: [],
      excel: [],
      camposDeExcel: [],
      formas: []
    };
    _this.crearDashboard = _this.crearDashboard.bind(_assertThisInitialized(_this));
    _this.retornarSeleccionDashboards = _this.retornarSeleccionDashboards.bind(_assertThisInitialized(_this));
    _this.editarVariables = _this.editarVariables.bind(_assertThisInitialized(_this));
    _this.changeStateFirstTimeToFalse = _this.changeStateFirstTimeToFalse.bind(_assertThisInitialized(_this));
    _this.terminoCrearVariablesPasarAEdit = _this.terminoCrearVariablesPasarAEdit.bind(_assertThisInitialized(_this));
    _this.actualizarIDVariableModificada = _this.actualizarIDVariableModificada.bind(_assertThisInitialized(_this));
    _this.getConections = _this.getConections.bind(_assertThisInitialized(_this));
    _this.getFieldsConections = _this.getFieldsConections.bind(_assertThisInitialized(_this));
    _this.getFieldConections = _this.getFieldConections.bind(_assertThisInitialized(_this));
    _this.loadScalarVariables = _this.loadScalarVariables.bind(_assertThisInitialized(_this));
    _this.loadScalarVariablesFields = _this.loadScalarVariablesFields.bind(_assertThisInitialized(_this));
    _this.getVariables = _this.getVariables.bind(_assertThisInitialized(_this));
    _this.getFieldsVariables = _this.getFieldsVariables.bind(_assertThisInitialized(_this));
    _this.getFieldVariables = _this.getFieldVariables.bind(_assertThisInitialized(_this));
    _this.loadVariablesSQL = _this.loadVariablesSQL.bind(_assertThisInitialized(_this));
    _this.initLoadVariablesCamposSQL = _this.initLoadVariablesCamposSQL.bind(_assertThisInitialized(_this));
    _this.loadVariablesCamposSQL = _this.loadVariablesCamposSQL.bind(_assertThisInitialized(_this));
    _this.loadExcel = _this.loadExcel.bind(_assertThisInitialized(_this));
    _this.initLoadExcelCampos = _this.initLoadExcelCampos.bind(_assertThisInitialized(_this));
    _this.loadExcelCampos = _this.loadExcelCampos.bind(_assertThisInitialized(_this));
    _this.loadFormas = _this.loadFormas.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DashboardHome, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getConections();
      this.getVariables();
      this.loadScalarVariables();
      this.loadVariablesSQL();
      this.loadExcel();
      this.loadFormas();
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
    key: "editarVariables",
    value: function editarVariables(idVariable, esObjetoVariable, esInstruccionSQLVariable, tipoVariable) {
      this.setState({
        idVariable: idVariable,
        componenteActual: "editarVariables",
        tipoVariable: tipoVariable,
        esObjetoVariable: esObjetoVariable,
        esInstruccionSQLVariable: esInstruccionSQLVariable,
        esPrimeraVez: true
      });
    }
  }, {
    key: "changeStateFirstTimeToFalse",
    value: function changeStateFirstTimeToFalse() {
      this.setState({
        esPrimeraVez: false
      });
    }
  }, {
    key: "terminoCrearVariablesPasarAEdit",
    value: function terminoCrearVariablesPasarAEdit(nombreFuenteDatos) {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Campos where nombre = '" + nombreFuenteDatos + "'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset != undefined) {
                if (result.recordset.length) {
                  _this2.editarFuenteDatos(result.recordset[0].ID, result.recordset[0].nombre, result.recordset[0].descripcion, result.recordset[0].esObjeto, result.recordset[0].objetoPadreID, result.recordset[0].guardar);
                }
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "actualizarIDVariableModificada",
    value: function actualizarIDVariableModificada(tablaDeVariableModificada) {
      var _this3 = this;

      if (tablaDeVariableModificada.localeCompare("excel") == 0) {
        var transaction = new _mssql["default"].Transaction(this.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("select top 1 * from ExcelArchivos order by ID desc", function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                if (result.recordset.length > 0) {
                  _this3.editarVariables(result.recordset[0].ID, false, false, "excel");
                }
              });
            }
          });
        }); // fin transaction
      } else if (tablaDeVariableModificada.localeCompare("forma") == 0) {
        var _transaction = new _mssql["default"].Transaction(this.props.pool);

        _transaction.begin(function (err) {
          var rolledBack = false;

          _transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });

          var request = new _mssql["default"].Request(_transaction);
          request.query("select top 1 * from FormasVariables order by ID desc", function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                _transaction.rollback(function (err) {});
              }
            } else {
              _transaction.commit(function (err) {
                if (result.recordset.length > 0) {
                  console.log("yeah");

                  _this3.editarVariables(result.recordset[0].ID, false, false, "forma");
                }
              });
            }
          });
        }); // fin transaction

      } else if (tablaDeVariableModificada.localeCompare("variable") == 0) {
        var _transaction2 = new _mssql["default"].Transaction(this.props.pool);

        _transaction2.begin(function (err) {
          var rolledBack = false;

          _transaction2.on('rollback', function (aborted) {
            rolledBack = true;
          });

          var request = new _mssql["default"].Request(_transaction2);
          request.query("select top 1 * from Variables order by ID desc", function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                _transaction2.rollback(function (err) {});
              }
            } else {
              _transaction2.commit(function (err) {
                if (result.recordset.length > 0) {
                  _this3.editarVariables(result.recordset[0].ID, result.recordset[0].esObjeto, result.recordset[0].esInstruccionSQL, "variable");
                }
              });
            }
          });
        }); // fin transaction

      }
    } /////////////////////////////////////////////////////////

  }, {
    key: "getConections",
    value: function getConections() {
      var _this4 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Tablas", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
              return [];
            }
          } else {
            transaction.commit(function (err) {
              var temp = [];

              for (var i = 0; i < result.recordset.length; i++) {
                temp.push({
                  valor: result.recordset[i].tabla,
                  ID: result.recordset[i].ID,
                  esTabla: true
                });
              }

              ;
              /*this.setState({
                  conexiones: temp
              }, this.getFieldsConections );*/

              _this4.setState({
                conexiones: temp
              }, _this4.getFieldsConections); //this.getFieldsConections();

            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getFieldsConections",
    value: function getFieldsConections() {
      var arregloTemp = [];

      for (var i = 0; i < this.state.conexiones.length; i++) {
        this.getFieldConections(this.state.conexiones[i].valor, i, arregloTemp, this.state.conexiones[i].ID);
      }

      ;
    }
  }, {
    key: "getFieldConections",
    value: function getFieldConections(nombreTabla, index, array, tablaID) {
      var _this5 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '" + nombreTabla + "'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var nombreColumnas = [];

              for (var i = 0; i < result.recordset.length; i++) {
                nombreColumnas.push({
                  valor: result.recordset[i].COLUMN_NAME,
                  tipo: result.recordset[i].DATA_TYPE,
                  tablaID: tablaID
                });
              }

              ;

              if (array[index] == undefined) {
                array[index] = [];
              }

              array[index] = $.merge(array[index], nombreColumnas);

              _this5.setState({
                camposConexiones: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "loadScalarVariables",
    value: function loadScalarVariables() {
      var _this6 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Variables where esObjeto = 'false'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              for (var i = 0; i < result.recordset.length; i++) {
                _this6.loadScalarVariablesFields(result.recordset[i]);
              }

              ;
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "loadScalarVariablesFields",
    value: function loadScalarVariablesFields(variable) {
      var _this7 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from VariablesCampos where variableID = " + variable.ID, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var temp = _toConsumableArray(_this7.state.variablesEscalares);

              for (var i = 0; i < result.recordset.length; i++) {
                temp.push({
                  valor: result.recordset[i].nombre,
                  tipo: result.recordset[i].tipo,
                  esFuenteDato: false,
                  variableID: variable.ID,
                  variableCampoID: result.recordset[i].ID,
                  esObjeto: variable.esObjeto,
                  esInstruccionSQL: false,
                  nivel: result.recordset[i].nivel,
                  esVariable: true
                });
              }

              ;

              _this7.setState({
                variablesEscalares: temp
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getVariables",
    value: function getVariables() {
      var _this8 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Variables where esObjeto = 'true'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
              return [];
            }
          } else {
            transaction.commit(function (err) {
              var temp = [];

              for (var i = 0; i < result.recordset.length; i++) {
                temp.push({
                  valor: result.recordset[i].nombre,
                  ID: result.recordset[i].ID,
                  esVariable: true
                });
              }

              ;
              /*this.setState({
                  variables: temp
              }, this.getFieldsVariables );*/

              _this8.setState({
                variables: temp
              }, _this8.getFieldsVariables); //this.getFieldsVariables();

            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getFieldsVariables",
    value: function getFieldsVariables() {
      var arregloTemp = [];

      for (var i = 0; i < this.state.variables.length; i++) {
        this.getFieldVariables(this.state.variables[i].ID, i, arregloTemp);
      }

      ;
    }
  }, {
    key: "getFieldVariables",
    value: function getFieldVariables(variableID, index, array) {
      var _this9 = this;

      if (variableID != undefined) {
        var transaction = new _mssql["default"].Transaction(this.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("select * from VariablesCampos where variableID = " + variableID, function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                var nombreColumnas = [];

                for (var i = 0; i < result.recordset.length; i++) {
                  nombreColumnas.push({
                    valor: result.recordset[i].nombre,
                    tipo: result.recordset[i].tipo,
                    ID: result.recordset[i].ID,
                    variableID: variableID
                  });
                }

                ;

                if (array[index] == undefined) {
                  array[index] = [];
                }

                array[index] = $.merge(array[index], nombreColumnas);

                _this9.setState({
                  camposVariables: array
                });
              });
            }
          });
        }); // fin transaction
      }
    }
  }, {
    key: "loadVariablesSQL",
    value: function loadVariablesSQL() {
      var _this10 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Variables where esInstruccionSQL = 'true'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var temp = [];

              for (var i = 0; i < result.recordset.length; i++) {
                temp.push(result.recordset[i]);
                temp[temp.length - 1].esSQL = true;
              }

              ;

              _this10.setState({
                variablesSQL: temp
              }, _this10.initLoadVariablesCamposSQL);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "initLoadVariablesCamposSQL",
    value: function initLoadVariablesCamposSQL() {
      var arregloTemp = [];

      for (var i = 0; i < this.state.variablesSQL.length; i++) {
        this.loadVariablesCamposSQL(this.state.variablesSQL[i], i, arregloTemp);
      }

      ;
    }
  }, {
    key: "loadVariablesCamposSQL",
    value: function loadVariablesCamposSQL(variable, index, array) {
      var _this11 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from InstruccionSQLCampos where variableID = " + variable.ID, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var nombreColumnas = [];

              for (var i = 0; i < result.recordset.length; i++) {
                nombreColumnas.push({
                  valor: result.recordset[i].nombre,
                  tipo: result.recordset[i].tipo,
                  esFuenteDato: false,
                  variableID: variable.ID,
                  variableCampoID: result.recordset[i].ID,
                  esObjeto: variable.esObjeto,
                  esInstruccionSQL: true,
                  nivel: 0
                });
              }

              ;

              if (array[index] == undefined) {
                array[index] = [];
              }

              array[index] = $.merge(array[index], nombreColumnas);

              _this11.setState({
                camposVariablesSQL: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "loadExcel",
    value: function loadExcel() {
      var _this12 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ExcelArchivos", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var temp = [];

              for (var i = 0; i < result.recordset.length; i++) {
                temp.push(result.recordset[i]);
                temp[temp.length - 1].esExcel = true;
              }

              ;

              _this12.setState({
                excel: temp
              }, _this12.initLoadExcelCampos);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "initLoadExcelCampos",
    value: function initLoadExcelCampos() {
      var arregloTemp = [];

      for (var i = 0; i < this.state.excel.length; i++) {
        this.loadExcelCampos(this.state.excel[i], i, arregloTemp);
      }

      ;
    }
  }, {
    key: "loadExcelCampos",
    value: function loadExcelCampos(excel, index, array) {
      var _this13 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ExcelVariables where excelArchivoID = " + excel.ID, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var nombreColumnas = [];

              for (var i = 0; i < result.recordset.length; i++) {
                var tipo;

                if (result.recordset[i].operacion.localeCompare("SUM") == 0 || result.recordset[i].operacion.localeCompare("PROM") == 0 || result.recordset[i].operacion.localeCompare("COUNT") == 0) {
                  tipo = 'decimal';
                } else if (result.recordset[i].operacion.localeCompare("MIN") == 0 || result.recordset[i].operacion.localeCompare("MAX") == 0 || result.recordset[i].operacion.localeCompare("ASIG") == 0) {
                  if (result.recordset[i].tipo.localeCompare("numero") == 0) tipo = 'decimal';else tipo = result.recordset[i].tipo;
                }

                nombreColumnas.push({
                  valor: result.recordset[i].nombre,
                  tipo: tipo,
                  esFuenteDato: false,
                  excelArchivoID: excel.ID,
                  excelVariableID: result.recordset[i].ID,
                  esObjeto: false,
                  esInstruccionSQL: false,
                  nivel: 0
                });
              }

              ;

              if (array[index] == undefined) {
                array[index] = [];
              }

              array[index] = $.merge(array[index], nombreColumnas);

              _this13.setState({
                camposDeExcel: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "loadFormas",
    value: function loadFormas() {
      var _this14 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from FormasVariables", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var nombreColumnas = [];

              for (var i = 0; i < result.recordset.length; i++) {
                nombreColumnas.push({
                  valor: result.recordset[i].nombre,
                  tipo: result.recordset[i].tipo,
                  esFuenteDato: false,
                  formaVariableID: result.recordset[i].ID,
                  esObjeto: false,
                  esInstruccionSQL: false,
                  nivel: 0,
                  esForma: true
                });
              }

              ;

              _this14.setState({
                formas: nombreColumnas
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
          editarVariable: this.editarVariables
        }));
      } else if (this.state.componenteActual.localeCompare("crearDashboard") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CrearDashboard["default"], {
          pool: this.props.pool,
          retornarSeleccionDashboards: this.retornarSeleccionDashboards,
          terminoCrearCampo: this.terminoCrearFuenteDatosPasarAEdit,
          tablas: this.state.conexiones,
          camposTablas: this.state.camposConexiones,
          variablesEscalares: this.state.variablesEscalares,
          objetos: this.state.variables,
          camposDeObjetos: this.state.camposVariables,
          excel: this.state.excel,
          camposDeExcel: this.state.camposDeExcel,
          formas: this.state.formas,
          variablesSQL: this.state.variablesSQL,
          camposVariablesSQL: this.state.camposVariablesSQL
        }));
      } else if (this.state.componenteActual.localeCompare("editarVariables") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(EditarVariablesHome, {
          pool: this.props.pool,
          goOptions: this.props.goOptions,
          idVariable: this.state.idVariable,
          tipoVariable: this.state.tipoVariable,
          esObjetoVariable: this.state.esObjetoVariable,
          esInstruccionSQLVariable: this.state.esInstruccionSQLVariable,
          retornoSeleccionVariables: this.retornoSeleccionVariables,
          configuracionHome: this.props.configuracionHome,
          actualizarIDVariableModificada: this.actualizarIDVariableModificada,
          changeStateFirstTimeToFalse: this.changeStateFirstTimeToFalse,
          esPrimeraVez: this.state.esPrimeraVez
        }));
      }
    }
  }]);

  return DashboardHome;
}(_react["default"].Component);

exports["default"] = DashboardHome;
//# sourceMappingURL=DashboardHome.js.map
