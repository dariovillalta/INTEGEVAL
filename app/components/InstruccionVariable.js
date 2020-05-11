"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _OpcionesCrearRegla = _interopRequireDefault(require("./OpcionesCrearRegla.js"));

var _ContenedorReglas = _interopRequireDefault(require("./ContenedorReglas.js"));

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

var indiceSeleccionadoReglas = -1;
var tipoElementoSeleccionadoRegla = '';
var campo;
var mostrarCrearCondicion = true;

var InstruccionVariable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InstruccionVariable, _React$Component);

  function InstruccionVariable(props) {
    var _this;

    _classCallCheck(this, InstruccionVariable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InstruccionVariable).call(this, props));
    _this.state = {
      reglas: _this.props.reglas,
      mostrarOpcionSino: false,
      conexiones: [],
      camposConexiones: [],
      variablesEscalares: [],
      variables: [],
      camposVariables: [],
      variablesSQL: [],
      camposVariablesSQL: [],
      excel: [],
      camposDeExcel: [],
      formas: [],
      mostrarCrearCondicion: mostrarCrearCondicion
    };
    _this.actualizarEstadoSeleccionSinoNuevaRegla = _this.actualizarEstadoSeleccionSinoNuevaRegla.bind(_assertThisInitialized(_this));
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
    _this.retornarIndiceSeleccionadoParaMostrarCampoObjetivo = _this.retornarIndiceSeleccionadoParaMostrarCampoObjetivo.bind(_assertThisInitialized(_this));
    _this.retornoCampo = _this.retornoCampo.bind(_assertThisInitialized(_this));
    _this.actualizarEstadoVistaEsCondicion = _this.actualizarEstadoVistaEsCondicion.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(InstruccionVariable, [{
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
    key: "actualizarEstadoSeleccionSinoNuevaRegla",
    value: function actualizarEstadoSeleccionSinoNuevaRegla(mostrar) {
      /*this.setState({
          mostrarOpcionSino: mostrar
      });*/
    }
  }, {
    key: "getConections",
    value: function getConections() {
      var _this2 = this;

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
                  ID: result.recordset[i].ID
                });
              }

              ;
              /*this.setState({
                  conexiones: temp
              }, this.getFieldsConections );*/

              _this2.setState({
                conexiones: temp
              }, _this2.getFieldsConections); //this.getFieldsConections();

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
      var _this3 = this;

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

              _this3.setState({
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
      var _this4 = this;

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
                _this4.loadScalarVariablesFields(result.recordset[i]);
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
      var _this5 = this;

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
              var temp = _toConsumableArray(_this5.state.variablesEscalares);

              for (var i = 0; i < result.recordset.length; i++) {
                temp.push({
                  valor: result.recordset[i].nombre,
                  tipo: result.recordset[i].tipo,
                  esFuenteDato: false,
                  variableID: variable.ID,
                  variableCampoID: result.recordset[i].ID,
                  esObjeto: variable.esObjeto,
                  esInstruccionSQL: false,
                  nivel: result.recordset[i].nivel
                });
              }

              ;

              _this5.setState({
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
      var _this6 = this;

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
                  ID: result.recordset[i].ID
                });
              }

              ;
              /*this.setState({
                  variables: temp
              }, this.getFieldsVariables );*/

              _this6.setState({
                variables: temp
              }, _this6.getFieldsVariables); //this.getFieldsVariables();

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
      var _this7 = this;

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

                _this7.setState({
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
      var _this8 = this;

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
              _this8.setState({
                variablesSQL: result.recordset
              }, _this8.initLoadVariablesCamposSQL);
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
      var _this9 = this;

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

              _this9.setState({
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
      var _this10 = this;

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
              _this10.setState({
                excel: result.recordset
              }, _this10.initLoadExcelCampos);
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
      var _this11 = this;

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

              _this11.setState({
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
      var _this12 = this;

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
                  nivel: 0
                });
              }

              ;

              _this12.setState({
                formas: nombreColumnas
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "retornarIndiceSeleccionadoParaMostrarCampoObjetivo",
    value: function retornarIndiceSeleccionadoParaMostrarCampoObjetivo(reglaSeleccionada, tipoIndiceSeleccionado, indiceI, indiceJ) {
      console.log('reglaSeleccionada');
      console.log(reglaSeleccionada);
      console.log('tipoIndiceSeleccionado');
      console.log(tipoIndiceSeleccionado);
      console.log('this.props.reglas');
      console.log(this.props.reglas);
      console.log('this.props.reglas.length');
      console.log(this.props.reglas.length);
      /*console.log('this.props.reglas[indiceI-1].length');
      console.log(this.props.reglas[indiceI-1].length);*/

      /*if(this.props.reglas.length-1 == indiceI*/

      /*&& this.props.reglas[indiceI-1].length == indiceJ*/

      /*&& tipoIndiceSeleccionado.localeCompare("abajo") == 0) {
      //EL CASO CUANDO EL INDICE SELECCIONADO DE REGLAS ES EL ULTIMO Y SELECCIONO tipoIndiceSeleccionado = ABAJO
      //reset
      console.log('1');
      this.setState({
      conexiones: conexionesOriginales,
      camposConexiones: camposConexionesOriginales,
      variables: variablesOriginales,
      camposVariables: camposVariablesOriginales
      });
      } else {
      console.log('2');
      //puede ser otra regla, una formula o el cursor de arriba
      //mostrar campos
      var tempCopyVariables = [];
      var tempCopyCampos = [];
      if(reglaSeleccionada[0].esConexionTabla) {
      console.log('2.1');
      for (var i = 0; i < conexionesOriginales.length; i++) {
      if(reglaSeleccionada[0].conexionTablaID == conexionesOriginales[i].ID) {
      tempCopyVariables = conexionesOriginales[i];
      tempCopyCampos = camposConexionesOriginales[i];
      break;
      }
      };
      this.setState({
      conexiones: [tempCopyVariables],
      camposConexiones: [tempCopyCampos],
      variables: [],
      camposVariables: []
      });
      } else {
      console.log('2.2');
      for (var i = 0; i < variablesOriginales.length; i++) {
      if(reglaSeleccionada[0].variableID == variablesOriginales[i].ID) {
      tempCopyVariables = jQuery.extend(true, {}, variablesOriginales[i]);
      tempCopyCampos = jQuery.extend(true, {}, camposVariablesOriginales[i]);
      break;
      }
      };
      this.setState({
      conexiones: [],
      camposConexiones: [],
      variables: [tempCopyVariables],
      camposVariables: [[tempCopyCampos]]
      });
      }
      }*/
    }
  }, {
    key: "retornoCampo",
    value: function retornoCampo(campo) {
      campo = campo;
      this.props.retornoCampo(campo);
    }
  }, {
    key: "actualizarEstadoVistaEsCondicion",
    value: function actualizarEstadoVistaEsCondicion(mostrarCrearCondicionN) {
      mostrarCrearCondicion = mostrarCrearCondicionN;
      this.setState({
        mostrarCrearCondicion: mostrarCrearCondicionN
      });
      this.props.retornarEstadoVistaEsCondicion(mostrarCrearCondicionN);
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, this.props.navbar, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "card",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement(_OpcionesCrearRegla["default"], {
        pool: this.props.pool,
        campos: this.props.campos,
        reglas: this.state.reglas,
        asignaciones: this.props.asignaciones,
        retornarValor: this.props.retornarValor,
        retornoCampo: this.props.retornoCampo,
        retornoOperacion: this.props.retornoOperacion,
        camposDropdown: this.props.camposDropdown,
        valoresDropdown: this.props.valoresDropdown,
        mostrarOpcionSino: this.state.mostrarOpcionSino,
        callbackCrearRegla: this.props.callbackCrearRegla,
        goToCreateFormula: this.props.goToCreateFormula,
        tablas: this.state.conexiones,
        camposTablas: this.state.camposConexiones,
        variablesEscalares: this.state.variablesEscalares,
        objetos: this.state.variables,
        camposDeObjetos: this.state.camposVariables,
        excel: this.state.excel,
        camposDeExcel: this.state.camposDeExcel,
        formas: this.state.formas,
        variablesSQL: this.state.variablesSQL,
        camposVariablesSQL: this.state.camposVariablesSQL,
        mostrarCrearCondicion: this.state.mostrarCrearCondicion,
        actualizarSeleccionFormula: this.props.actualizarSeleccionFormula,
        callbackModificarRegla: this.props.callbackModificarRegla,
        callbackEliminarRegla: this.props.callbackEliminarRegla,
        actualizarNivelNuevaRegla: this.props.actualizarNivelNuevaRegla,
        actualizarEstadoVistaEsCondicion: this.actualizarEstadoVistaEsCondicion,
        eliminarFormula: this.props.eliminarFormula,
        esEditarVar: this.props.esEditarVar,
        tablaBorrarFormulas: this.props.tablaBorrarFormulas,
        tablaBorrarElementos: this.props.tablaBorrarElementos,
        condicionFormula: this.props.condicionFormula,
        condicionElemento: this.props.condicionElemento
      }))), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "text-center"
      }, _react["default"].createElement("h2", null, "L\xF3gica para el c\xE1lculo")), _react["default"].createElement(_ContenedorReglas["default"], {
        reglas: this.state.reglas,
        actualizarEstadoSeleccionSinoNuevaRegla: this.actualizarEstadoSeleccionSinoNuevaRegla,
        retornarIndiceSeleccionadoParaMostrarCampoObjetivo: this.retornarIndiceSeleccionadoParaMostrarCampoObjetivo,
        retornarIndiceSeleccionado: this.props.retornarIndiceSeleccionado
      }))));
    }
  }]);

  return InstruccionVariable;
}(_react["default"].Component);

exports["default"] = InstruccionVariable;
//# sourceMappingURL=InstruccionVariable.js.map
