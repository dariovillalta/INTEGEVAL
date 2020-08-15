"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _reactInputSlider = _interopRequireDefault(require("react-input-slider"));

var _Modal = _interopRequireDefault(require("../Modal/Modal.js"));

var _CampoDashboard = _interopRequireDefault(require("./CampoDashboard.js"));

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

var tipoCampos = [{
  nombre: "texto"
}, {
  nombre: "booleano"
}, {
  nombre: "fecha"
}, {
  nombre: "número"
}, {
  nombre: "arreglo"
}];
var tipoGrafico;

var EditarDashboard =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EditarDashboard, _React$Component);

  function EditarDashboard(props) {
    var _this;

    _classCallCheck(this, EditarDashboard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditarDashboard).call(this, props));
    _this.state = {
      seccionesDashboard: [],
      tipoObjetoNuevo: 'grafica',
      tipoGraficoNuevo: '',
      displayGraphics: false,
      indiceGraphSelect: -1,
      variablesSeleccionadasSeccionesDashboardNueva: [],
      showModalCampoEjeY: false,
      showModalCampoEjeX: false,
      objetoEjeXNuevo: {},
      variablesSeleccionadasSeccionesDashboardTablaNueva: [],
      variablesDisponiblesSeccionesDashboardTablaNueva: _this.props.variables.concat(_this.props.indicadores, _this.props.riesgos),
      //
      tipoObjetoUpdate: [],
      tipoGraficoUpdate: [],
      displayGraphicsUpdate: [],
      indiceGraphSelectUpdate: [],
      variablesSeleccionadasSeccionesDashboardUpdate: [],
      showModalCampoEjeYUpdate: false,
      showModalCampoEjeXUpdate: false,
      objetoEjeXUpdate: [],
      variablesSeleccionadasSeccionesDashboardTablaUpdate: [],
      variablesDisponiblesSeccionesDashboardTablaUpdate: []
    };
    _this.getDashboard = _this.getDashboard.bind(_assertThisInitialized(_this));
    _this.getDashboardSections = _this.getDashboardSections.bind(_assertThisInitialized(_this));
    _this.modificarDashboard = _this.modificarDashboard.bind(_assertThisInitialized(_this));
    _this.eliminarSeccionDashboardModificar = _this.eliminarSeccionDashboardModificar.bind(_assertThisInitialized(_this));
    _this.guardarSeccionesDashboard = _this.guardarSeccionesDashboard.bind(_assertThisInitialized(_this));
    _this.crearSeccionDashboard = _this.crearSeccionDashboard.bind(_assertThisInitialized(_this));
    _this.crearArreglosDeInstrucciones = _this.crearArreglosDeInstrucciones.bind(_assertThisInitialized(_this));
    _this.getObject = _this.getObject.bind(_assertThisInitialized(_this));
    _this.actualizarTipoObjetoNuevo = _this.actualizarTipoObjetoNuevo.bind(_assertThisInitialized(_this));
    _this.mostrarDivGraficos = _this.mostrarDivGraficos.bind(_assertThisInitialized(_this));
    _this.cerrarDivGraficos = _this.cerrarDivGraficos.bind(_assertThisInitialized(_this));
    _this.seleccionGrafico = _this.seleccionGrafico.bind(_assertThisInitialized(_this));
    _this.showCampoModalEjeX = _this.showCampoModalEjeX.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionEjeX = _this.retornoSeleccionEjeX.bind(_assertThisInitialized(_this));
    _this.closeCampoModalEjeX = _this.closeCampoModalEjeX.bind(_assertThisInitialized(_this));
    _this.showCampoModalEjeY = _this.showCampoModalEjeY.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionEjeY = _this.retornoSeleccionEjeY.bind(_assertThisInitialized(_this));
    _this.deleteVariableSeleccionadasSeccionesDashboardNueva = _this.deleteVariableSeleccionadasSeccionesDashboardNueva.bind(_assertThisInitialized(_this));
    _this.closeCampoModalEjeY = _this.closeCampoModalEjeY.bind(_assertThisInitialized(_this));
    _this.seleccionVarTableNuevo = _this.seleccionVarTableNuevo.bind(_assertThisInitialized(_this));
    _this.deseleccionVarTableNuevo = _this.deseleccionVarTableNuevo.bind(_assertThisInitialized(_this));
    _this.actualizarTipoObjetoNuevoUpdate = _this.actualizarTipoObjetoNuevoUpdate.bind(_assertThisInitialized(_this));
    _this.mostrarDivGraficosUpdate = _this.mostrarDivGraficosUpdate.bind(_assertThisInitialized(_this));
    _this.cerrarDivGraficosUpdate = _this.cerrarDivGraficosUpdate.bind(_assertThisInitialized(_this));
    _this.seleccionGraficoUpdate = _this.seleccionGraficoUpdate.bind(_assertThisInitialized(_this));
    _this.showCampoModalEjeXUpdate = _this.showCampoModalEjeXUpdate.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionEjeXUpdate = _this.retornoSeleccionEjeXUpdate.bind(_assertThisInitialized(_this));
    _this.closeCampoModalEjeXUpdate = _this.closeCampoModalEjeXUpdate.bind(_assertThisInitialized(_this));
    _this.showCampoModalEjeYUpdate = _this.showCampoModalEjeYUpdate.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionEjeYUpdate = _this.retornoSeleccionEjeYUpdate.bind(_assertThisInitialized(_this));
    _this.deleteVariableSeleccionadasSeccionesDashboardUpdate = _this.deleteVariableSeleccionadasSeccionesDashboardUpdate.bind(_assertThisInitialized(_this));
    _this.closeCampoModalEjeYUpdate = _this.closeCampoModalEjeYUpdate.bind(_assertThisInitialized(_this));
    _this.seleccionVarTableNuevoUpdate = _this.seleccionVarTableNuevoUpdate.bind(_assertThisInitialized(_this));
    _this.deseleccionVarTableUpdate = _this.deseleccionVarTableUpdate.bind(_assertThisInitialized(_this));
    _this.modificarSeccionDashboard = _this.modificarSeccionDashboard.bind(_assertThisInitialized(_this));
    _this.eliminarSeccionDashboard = _this.eliminarSeccionDashboard.bind(_assertThisInitialized(_this));
    _this.crearArreglosDeInstruccionesUpdate = _this.crearArreglosDeInstruccionesUpdate.bind(_assertThisInitialized(_this));
    _this.eliminarDashboard = _this.eliminarDashboard.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(EditarDashboard, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getDashboard();
    }
  }, {
    key: "getDashboard",
    value: function getDashboard() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Dashboard where ID = " + _this2.props.dashboardSeleccionado.ID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset != undefined) {
                if (result.recordset.length > 0) {
                  var nombre = result.recordset[0].nombre;
                  var descripcion = result.recordset[0].descripcion;
                  $("#nombreDashboard").val(nombre);
                  $("#descripcionDashboard").val(descripcion);

                  _this2.getDashboardSections();
                }
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getDashboardSections",
    value: function getDashboardSections() {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from SeccionDashboard where dashboardID = " + _this3.props.dashboardSeleccionado.ID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset != undefined) {
                if (result.recordset.length > 0) {
                  _this3.setState({
                    seccionesDashboard: result.recordset
                  }, _this3.crearArreglosDeInstruccionesUpdate);
                }
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "modificarDashboard",
    value: function modificarDashboard() {
      var _this4 = this;

      var nombre = $("#nombreDashboard").val();
      var descripcion = $("#descripcionDashboard").val();

      if (nombre.length > 0) {
        var transaction = new _mssql["default"].Transaction(this.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("update Dashboard set nombre = '" + nombre + "', descripcion = '" + descripcion + "'", function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                _this4.eliminarSeccionDashboardModificar();

                var self = _this4;
                setTimeout(function () {
                  self.guardarSeccionesDashboard();
                }, 600);
                alert("Dashboard modificado.");
              });
            }
          });
        }); // fin transaction
      } else {
        alert("Ingrese un nombre para el dashboard.");
      }
    }
  }, {
    key: "eliminarSeccionDashboardModificar",
    value: function eliminarSeccionDashboardModificar() {
      var _this5 = this;

      var transaction1 = new _mssql["default"].Transaction(this.props.pool);
      transaction1.begin(function (err) {
        var rolledBack = false;
        transaction1.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request1 = new _mssql["default"].Request(transaction1);
        request1.query("delete from SeccionDashboard where dashboardID = " + _this5.props.dashboardSeleccionado.ID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction1.rollback(function (err) {});
            }
          } else {
            transaction1.commit(function (err) {});
          }
        });
      }); // fin transaction1
    }
  }, {
    key: "guardarSeccionesDashboard",
    value: function guardarSeccionesDashboard() {
      var _this6 = this;

      var _loop = function _loop() {
        var tamano = _this6.state.seccionesDashboard[i].tamano;
        var tipoObjeto = _this6.state.seccionesDashboard[i].tipoObjeto;
        var instruccion = _this6.state.seccionesDashboard[i].instruccion;
        var index = i;
        var transaction = new _mssql["default"].Transaction(_this6.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("insert into SeccionDashboard (dashboardID, tamano, tipoObjeto, instruccion) values(" + _this6.props.dashboardSeleccionado.ID + ", '" + tamano + "', '" + tipoObjeto + "', '" + instruccion + "') ", function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {});
            }
          });
        }); // fin transaction
      };

      for (var i = 0; i < this.state.seccionesDashboard.length; i++) {
        _loop();
      }

      ;
    }
  }, {
    key: "crearSeccionDashboard",
    value: function crearSeccionDashboard() {
      var tamano = $("#tamano").val();
      var tipoObjeto = $("#tipoObjeto").val();
      var instruccion = '';

      if (tipoObjeto.localeCompare("grafica") == 0) {
        //EJEMPLO: GRAFICA=>AREA[EJEX={esVariable: true, variableID: 1}\/EJEX={esVariable: true, esTabla: false, ^ variableID: 1}<>{esVariable: true, ^ variableID: 1}]
        instruccion += 'GRAFICA=>';

        if (this.state.tipoGraficoNuevo.length > 0) {
          instruccion += this.state.tipoGraficoNuevo + "[";

          if (this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0) {
            //EJEY
            instruccion += "EJEX={";

            if (this.state.objetoEjeXNuevo.esVariable) {
              instruccion += 'esVariable:true,esIndicador:false,esRiesgo:false,';
              instruccion += 'nombreVariable:"' + this.state.objetoEjeXNuevo.nombreVariable + '",nombreCampo:"' + this.state.objetoEjeXNuevo.nombreCampo + '",valor:"' + this.state.objetoEjeXNuevo.valor + '"}';
            } else if (this.state.objetoEjeXNuevo.esIndicador) {
              instruccion += 'esVariable:false,esIndicador:true,esRiesgo:false,';
              instruccion += 'nombreIndicador:"' + this.state.objetoEjeXNuevo.nombreIndicador + '",nombreCampo:"' + this.state.objetoEjeXNuevo.nombreCampo + '",valor:"' + this.state.objetoEjeXNuevo.valor + '"}';
            } else if (this.state.objetoEjeXNuevo.esRiesgo) {
              instruccion += 'esVariable:false,esIndicador:false,esRiesgo:true,';
              instruccion += 'nombreRiesgo:"' + this.state.objetoEjeXNuevo.nombreRiesgo + '",nombreCampo:"' + this.state.objetoEjeXNuevo.nombreCampo + '",valor:"' + this.state.objetoEjeXNuevo.valor + '"}';
            } //EJEX


            instruccion += "\\/EJEY={";

            for (var i = 0; i < this.state.variablesSeleccionadasSeccionesDashboardNueva.length; i++) {
              if (i > 0) instruccion += '<>{';

              if (this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esVariable) {
                instruccion += 'esVariable:true,esIndicador:false,esRiesgo:false,';
                instruccion += 'nombreVariable:"' + this.state.variablesSeleccionadasSeccionesDashboardNueva[i].nombreVariable + '",nombreCampo:"' + this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor + '",valor:"' + this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor + '"}';
              } else if (this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esIndicador) {
                instruccion += 'esVariable:false,esIndicador:true,esRiesgo:false,';
                instruccion += 'nombreIndicador:"' + this.state.variablesSeleccionadasSeccionesDashboardNueva[i].nombreIndicador + '",nombreCampo:"' + this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor + '",valor:"' + this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor + '"}';
              } else if (this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esRiesgo) {
                instruccion += 'esVariable:false,esIndicador:false,esRiesgo:true,';
                instruccion += 'nombreRiesgo:"' + this.state.variablesSeleccionadasSeccionesDashboardNueva[i].nombreRiesgo + '",nombreCampo:"' + this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor + '",valor:"' + this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor + '"}';
              }
            }

            ;
            instruccion += ']';
          } else if (this.state.tipoGraficoNuevo.localeCompare("PIE") == 0) {
            //EJEMPLO: GRAFICA=>PIE[{esVariable: true, variableID: 1}<>{esVariable: true, variableID: 1}<>{esVariable: true, variableID: 1}]
            instruccion += "{";

            for (var i = 0; i < this.state.variablesSeleccionadasSeccionesDashboardNueva.length; i++) {
              if (i > 0) instruccion += '<>{';

              if (this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esVariable) {
                instruccion += 'esVariable:true,esIndicador:false,esRiesgo:false,';
                instruccion += 'nombreVariable:"' + this.state.variablesSeleccionadasSeccionesDashboardNueva[i].nombreVariable + '",nombreCampo:"' + this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor + '",valor:"' + this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor + '"}';
              } else if (this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esIndicador) {
                instruccion += 'esVariable:false,esIndicador:true,esRiesgo:false,';
                instruccion += 'nombreIndicador:"' + this.state.variablesSeleccionadasSeccionesDashboardNueva[i].nombreIndicador + '",nombreCampo:"' + this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor + '",valor:"' + this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor + '"}';
              } else if (this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esRiesgo) {
                instruccion += 'esVariable:false,esIndicador:false,esRiesgo:true,';
                instruccion += 'nombreRiesgo:"' + this.state.variablesSeleccionadasSeccionesDashboardNueva[i].nombreRiesgo + '",nombreCampo:"' + this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor + '",valor:"' + this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor + '"}';
              }
            }

            ;
            instruccion += ']';
          }
        }
      }

      if (tipoObjeto.localeCompare("tabla") == 0) {
        //EJEMPLO: TABLA=>[{esVariable: true, variableID: 1}<>{esVariable: true, variableID: 1}<>{esVariable: true, variableID: 1}]
        instruccion += 'TABLA=>[{';

        for (var i = 0; i < this.state.variablesSeleccionadasSeccionesDashboardTablaNueva.length; i++) {
          if (i > 0) instruccion += '<>{';

          if (this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].esVariable) {
            instruccion += 'esVariable:true,esIndicador:false,esRiesgo:false,';
            instruccion += 'nombreVariable:"' + this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].nombreVariable + '",nombreCampo:"' + this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].valor + '",valor:"' + this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].valor + '"}';
          } else if (this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].esIndicador) {
            instruccion += 'esVariable:false,esIndicador:true,esRiesgo:false,';
            instruccion += 'nombreIndicador:"' + this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].nombreIndicador + '",nombreCampo:"' + this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].valor + '",valor:"' + this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].valor + '"}';
          } else if (this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].esRiesgo) {
            instruccion += 'esVariable:false,esIndicador:false,esRiesgo:true,';
            instruccion += 'nombreRiesgo:"' + this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].nombreRiesgo + '",nombreCampo:"' + this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].valor + '",valor:"' + this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].valor + '"}';
          }
        }

        ;
        instruccion += ']';
      }

      if (tamano.length < 10) {
        if (tipoObjeto.length < 10) {
          if (tipoObjeto.localeCompare("grafica") == 0 && this.state.tipoGraficoNuevo.length > 0 || tipoObjeto.localeCompare("tabla") == 0) {
            //viendo si creo variables
            if ((this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0) && this.state.objetoEjeXNuevo != undefined && this.state.objetoEjeXNuevo.valor != undefined && this.state.variablesSeleccionadasSeccionesDashboardNueva.length > 0 || this.state.tipoGraficoNuevo.localeCompare("PIE") == 0 && this.state.variablesSeleccionadasSeccionesDashboardNueva.length > 0 || tipoObjeto.localeCompare("tabla") == 0 && this.state.variablesSeleccionadasSeccionesDashboardTablaNueva.length > 0) {
              var seccionesDashboard = _toConsumableArray(this.state.seccionesDashboard);

              seccionesDashboard.push({
                tamano: tamano,
                tipoObjeto: tipoObjeto,
                instruccion: instruccion
              });
              this.setState({
                seccionesDashboard: seccionesDashboard
              }, this.crearArreglosDeInstrucciones);
            } else {
              if ((this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0) && (this.state.objetoEjeXNuevo == undefined || this.state.objetoEjeXNuevo.valor == undefined)) {
                alert("Seleccione una variable para el eje x");
              } else if ((this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0) && this.state.variablesSeleccionadasSeccionesDashboardNueva.length == 0) {
                alert("Seleccione por lo menos una variable para el eje y");
              } else if (tipoObjeto.localeCompare("tabla") == 0 && this.state.variablesSeleccionadasSeccionesDashboardTablaNueva.length == 0) {
                alert("Seleccione por lo menos una variable para las tablas");
              }
            }
          } else {
            alert("Seleccione un tipo de grafico.");
          }
        } else {
          alert("Ingrese un valor para el tipo de objeto menor a 10 caracteres.");
        }
      } else {
        alert("Ingrese un valor para el tamaño menor a 10 caracteres.");
      }
    }
  }, {
    key: "crearArreglosDeInstrucciones",
    value: function crearArreglosDeInstrucciones() {
      //limpiando valores nuevos
      this.setState({
        tipoGraficoNuevo: '',
        displayGraphics: false,
        indiceGraphSelect: -1,
        variablesSeleccionadasSeccionesDashboardNueva: [],
        objetoEjeXNuevo: {},
        variablesSeleccionadasSeccionesDashboardTablaNueva: [],
        variablesDisponiblesSeccionesDashboardTablaNueva: this.props.variables.concat(this.props.indicadores, this.props.riesgos)
      });
      var tipoObjetoUpdate = [],
          tipoGraficoUpdate = [],
          displayGraphicsUpdate = [],
          indiceGraphSelectUpdate = [],
          objetoEjeXUpdate = [];
      var variablesSeleccionadasSeccionesDashboardUpdate = [],
          variablesSeleccionadasSeccionesDashboardTablaUpdate = [],
          variablesDisponiblesSeccionesDashboardTablaUpdate = [];

      for (var i = 0; i < this.state.seccionesDashboard.length; i++) {
        if (this.state.seccionesDashboard[i].instruccion.indexOf("GRAFICA") == 0) {
          var cadenaValores = this.state.seccionesDashboard[i].instruccion.split("=>")[1];
          tipoObjetoUpdate[i] = 'grafica';
          displayGraphicsUpdate[i] = false;

          if (cadenaValores.indexOf("LINEA") == 0 || cadenaValores.indexOf("AREA") == 0 || cadenaValores.indexOf("BARRA") == 0 || cadenaValores.indexOf("DISPERSION") == 0) {
            if (cadenaValores.indexOf("LINEA") == 0) {
              tipoGraficoUpdate[i] = 'LINEA';
              indiceGraphSelectUpdate[i] = 0;
            } else if (cadenaValores.indexOf("AREA") == 0) {
              tipoGraficoUpdate[i] = 'AREA';
              indiceGraphSelectUpdate[i] = 1;
            } else if (cadenaValores.indexOf("BARRA") == 0) {
              tipoGraficoUpdate[i] = 'BARRA';
              indiceGraphSelectUpdate[i] = 2;
            } else if (cadenaValores.indexOf("DISPERSION") == 0) {
              tipoGraficoUpdate[i] = 'DISPERSION';
              indiceGraphSelectUpdate[i] = 3;
            }

            if (objetoEjeXUpdate[i] == undefined) objetoEjeXUpdate[i] = [];
            var arregloObjetoX = cadenaValores.split("\\/")[0];
            var objetoXCadena = arregloObjetoX.substring(arregloObjetoX.indexOf("{") + 1, arregloObjetoX.indexOf("}"));
            eval("objetoEjeXUpdate[i] = {" + objetoXCadena + "}");
            objetoEjeXUpdate[i].nombre = ''; //this.getObject(objetoEjeXUpdate, i, objetoEjeXUpdate[i], "objetoEjeXUpdate");

            var arregloObjetosY = cadenaValores.split("\\/")[1];
            var arregloValores = arregloObjetosY.split("<>");
            if (variablesDisponiblesSeccionesDashboardTablaUpdate[i] == undefined) variablesDisponiblesSeccionesDashboardTablaUpdate[i] = [];
            variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.variables.concat(this.props.indicadores, this.props.riesgos);
            if (variablesSeleccionadasSeccionesDashboardUpdate[i] == undefined) variablesSeleccionadasSeccionesDashboardUpdate[i] = [];

            for (var j = 0; j < arregloValores.length; j++) {
              var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{") + 1, arregloValores[j].lastIndexOf("}"));
              eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({" + objeto + "})");
              variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = ''; //this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
            }

            ;
          } else if (cadenaValores.indexOf("PIE") == 0) {
            tipoGraficoUpdate[i] = 'PIE';
            indiceGraphSelectUpdate[i] = 4;
            if (objetoEjeXUpdate[i] == undefined) objetoEjeXUpdate[i] = [];
            /*var arregloObjetoX = cadenaValores.split("\\/")[0];
            var objetoXCadena = arregloObjetoX.substring(arregloObjetoX.indexOf("{")+1, arregloObjetoX.lastIndexOf("}"));
            eval("objetoEjeXUpdate[i] = {"+objetoXCadena+"}");
            objetoEjeXUpdate[i].nombre = '';
            this.getObject(objetoEjeXUpdate, indice, objetoEjeXUpdate[i], "objetoEjeXUpdate");*/

            var arregloObjetosY = cadenaValores;
            var arregloValores = arregloObjetosY.split("<>");
            if (variablesDisponiblesSeccionesDashboardTablaUpdate[i] == undefined) variablesDisponiblesSeccionesDashboardTablaUpdate[i] = [];
            variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.variables.concat(this.props.indicadores, this.props.riesgos);
            if (variablesSeleccionadasSeccionesDashboardUpdate[i] == undefined) variablesSeleccionadasSeccionesDashboardUpdate[i] = [];

            for (var j = 0; j < arregloValores.length; j++) {
              var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{") + 1, arregloValores[j].lastIndexOf("}"));
              eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({" + objeto + "})");
              variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = ''; //this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
            }

            ;
          }
        } else if (this.state.seccionesDashboard[i].instruccion.indexOf("TABLA") == 0) {
          var cadenaValores = this.state.seccionesDashboard[i].instruccion.split("=>")[1];
          var cadenaValoresSinCorchetes = cadenaValores.substring(1, cadenaValores.indexOf("]"));
          var arregloValores = cadenaValoresSinCorchetes.split("<>");
          tipoObjetoUpdate[i] = 'tabla';
          if (variablesSeleccionadasSeccionesDashboardTablaUpdate[i] == undefined) variablesSeleccionadasSeccionesDashboardTablaUpdate[i] = [];
          if (variablesDisponiblesSeccionesDashboardTablaUpdate[i] == undefined) variablesDisponiblesSeccionesDashboardTablaUpdate[i] = [];
          variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.variables.concat(this.props.indicadores, this.props.riesgos);

          for (var j = 0; j < arregloValores.length; j++) {
            var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{") + 1, arregloValores[j].lastIndexOf("}"));
            eval("variablesSeleccionadasSeccionesDashboardTablaUpdate[i].push({" + objeto + "})");
            variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombre = ''; //this.getObject(variablesSeleccionadasSeccionesDashboardTablaUpdate, i, variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j], "variablesSeleccionadasSeccionesDashboardTablaUpdate", j);
            //variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.variables.concat(this.props.indicadores, this.props.riesgos);
          }

          ;

          for (var j = 0; j < variablesSeleccionadasSeccionesDashboardTablaUpdate[i].length; j++) {
            if (variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].esVariable) {
              FORDISPONIBLES: for (var k = 0; k < variablesDisponiblesSeccionesDashboardTablaUpdate[i].length; k++) {
                if (variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].esVariable && variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].nombreVariable.localeCompare(variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombreVariable) == 0) {
                  variablesDisponiblesSeccionesDashboardTablaUpdate[i].splice(k, 1);
                  break FORDISPONIBLES;
                }
              }

              ;
            } else if (variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].esIndicador) {
              FORDISPONIBLES: for (var k = 0; k < variablesDisponiblesSeccionesDashboardTablaUpdate[i].length; k++) {
                if (variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].esIndicador && variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].nombreIndicador.localeCompare(variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombreIndicador) == 0) {
                  variablesDisponiblesSeccionesDashboardTablaUpdate[i].splice(k, 1);
                  break FORDISPONIBLES;
                }
              }

              ;
            } else if (variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].esRiesgo) {
              FORDISPONIBLES: for (var k = 0; k < variablesDisponiblesSeccionesDashboardTablaUpdate[i].length; k++) {
                if (variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].esRiesgo && variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].nombreRiesgo.localeCompare(variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombreRiesgo) == 0) {
                  variablesDisponiblesSeccionesDashboardTablaUpdate[i].splice(k, 1);
                  break FORDISPONIBLES;
                }
              }

              ;
            }
          }

          ;
        }
      }

      ;
      /*console.log('tipoObjetoUpdate')
      console.log(tipoObjetoUpdate)
      console.log('tipoGraficoUpdate')
      console.log(tipoGraficoUpdate)
      console.log('displayGraphicsUpdate')
      console.log(displayGraphicsUpdate)
      console.log('indiceGraphSelectUpdate')
      console.log(indiceGraphSelectUpdate)
      console.log('objetoEjeXUpdate')
      console.log(objetoEjeXUpdate)
      console.log('variablesSeleccionadasSeccionesDashboardUpdate')
      console.log(variablesSeleccionadasSeccionesDashboardUpdate)
      console.log('variablesSeleccionadasSeccionesDashboardTablaUpdate')
      console.log(variablesSeleccionadasSeccionesDashboardTablaUpdate)
      console.log('variablesDisponiblesSeccionesDashboardTablaUpdate')
      console.log(variablesDisponiblesSeccionesDashboardTablaUpdate)*/

      this.setState({
        tipoObjetoUpdate: tipoObjetoUpdate,
        tipoGraficoUpdate: tipoGraficoUpdate,
        objetoEjeXUpdate: objetoEjeXUpdate,
        variablesSeleccionadasSeccionesDashboardUpdate: variablesSeleccionadasSeccionesDashboardUpdate,
        variablesSeleccionadasSeccionesDashboardTablaUpdate: variablesSeleccionadasSeccionesDashboardTablaUpdate,
        displayGraphicsUpdate: displayGraphicsUpdate,
        indiceGraphSelectUpdate: indiceGraphSelectUpdate,
        variablesDisponiblesSeccionesDashboardTablaUpdate: variablesDisponiblesSeccionesDashboardTablaUpdate
      });
    }
  }, {
    key: "getObject",
    value: function getObject(arreglo, indiceSec, objeto, arregloNombre, indice) {
      var _this7 = this;

      var instruccion = '';

      if (objeto.esVariable) {
        instruccion = 'SELECT * FROM Variables WHERE ID = ' + objeto.variableID;
      } else if (objeto.esSQL) {
        instruccion = 'SELECT * FROM Variables WHERE ID = ' + objeto.variableID;
      } else if (objeto.esTabla) {
        instruccion = 'SELECT * FROM Tablas WHERE ID = ' + objeto.tablaID;
      } else if (objeto.esExcel) {
        instruccion = 'SELECT * FROM ExcelVariables WHERE ID = ' + objeto.excelVariableID + ' AND excelArchivoID = ' + excelArchivoID;
      } else if (objeto.esForma) {
        instruccion = 'SELECT * FROM FormasVariables WHERE ID = ' + objeto.formaVariableID;
      }

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query(instruccion, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var nombre = result.recordset[0].nombre;

              if (objeto.esTabla) {
                nombre = objeto.nombreCampoTabla;
              }

              if (arregloNombre.localeCompare("objetoEjeXUpdate") == 0) {
                arreglo[indiceSec].nombre = nombre;
                arreglo[indiceSec].valor = nombre;
              } else {
                arreglo[indiceSec][indice].nombre = nombre;
                arreglo[indiceSec][indice].valor = nombre;
              }

              if (arregloNombre.localeCompare("objetoEjeXUpdate") == 0) {
                _this7.setState({
                  objetoEjeXUpdate: arreglo
                });
              } else if (arregloNombre.localeCompare("variablesSeleccionadasSeccionesDashboardUpdate") == 0) {
                for (var i = 0; i < arreglo.length; i++) {
                  arreglo[i].valor = arreglo[i].nombre;
                }

                ;

                _this7.setState({
                  variablesSeleccionadasSeccionesDashboardUpdate: arreglo
                });
              } else if (arregloNombre.localeCompare("variablesSeleccionadasSeccionesDashboardTablaUpdate") == 0) {
                var arrOrig = _this7.props.variables.concat(_this7.props.indicadores, _this7.props.riesgos);

                for (var i = arrOrig.length - 1; i >= 0; i--) {
                  arrOrig[i].nombre = arrOrig[i].valor;

                  for (var j = 0; j < arreglo[indiceSec].length; j++) {
                    if (arrOrig[i].valor.localeCompare(arreglo[indiceSec][j].valor) == 0) {
                      arrOrig.splice(i, 1);
                      break;
                    }
                  }

                  ;
                }

                ;

                var copyTemp = _toConsumableArray(_this7.state.variablesDisponiblesSeccionesDashboardTablaUpdate);

                copyTemp[indiceSec] = arrOrig;

                _this7.setState({
                  variablesSeleccionadasSeccionesDashboardTablaUpdate: arreglo,
                  variablesDisponiblesSeccionesDashboardTablaUpdate: copyTemp
                });
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "actualizarTipoObjetoNuevo",
    value: function actualizarTipoObjetoNuevo() {
      if ($("#tipoObjeto").val().localeCompare("tabla") == 0) {
        this.setState({
          variablesSeleccionadasSeccionesDashboardTablaNueva: [],
          variablesDisponiblesSeccionesDashboardTablaNueva: this.props.variables.concat(this.props.indicadores, this.props.riesgos)
        });
      }

      this.setState({
        tipoObjetoNuevo: $("#tipoObjeto").val()
      });
    }
  }, {
    key: "mostrarDivGraficos",
    value: function mostrarDivGraficos(event) {
      event.stopPropagation();
      /*if(!this.state.displayGraphics == false) {
          this.setState({
              indiceGraphSelect: -1
          });
      }*/

      this.setState({
        displayGraphics: !this.state.displayGraphics
      });
    }
  }, {
    key: "cerrarDivGraficos",
    value: function cerrarDivGraficos() {
      var copyTemp = _toConsumableArray(this.state.displayGraphicsUpdate);

      for (var i = 0; i < copyTemp.length; i++) {
        copyTemp[i] = false;
      }

      ;
      this.setState({
        displayGraphics: false,
        displayGraphicsUpdate: copyTemp
        /*,
        indiceGraphSelect: -1*/

      });
    }
  }, {
    key: "seleccionGrafico",
    value: function seleccionGrafico(event, tipoGraficaN, index) {
      event.stopPropagation();
      this.setState({
        tipoGraficoNuevo: tipoGraficaN,
        indiceGraphSelect: index,
        objetoEjeXNuevo: {},
        variablesSeleccionadasSeccionesDashboardNueva: []
      });
    }
  }, {
    key: "showCampoModalEjeX",
    value: function showCampoModalEjeX(event) {
      event.stopPropagation();
      this.setState({
        showModalCampoEjeX: true
      });
    }
  }, {
    key: "retornoSeleccionEjeX",
    value: function retornoSeleccionEjeX(campoSeleccionadoInput) {
      var campo = campoSeleccionadoInput[0];
      var esVariable = false,
          esIndicador = false,
          esRiesgo = false;
      var nombreVariable = '',
          nombreIndicador = '',
          nombreRiesgo = '',
          nombreCampo = '',
          valor = '';

      if (campo.esVariable) {
        esVariable = true;
        nombreVariable = campo.nombreVariable;
        nombreCampo = campo.valor;
        valor = campo.valor;
      } else if (campo.esIndicador) {
        esIndicador = true;
        nombreIndicador = campo.nombreIndicador;
        nombreCampo = campo.valor;
        valor = campo.valor;
      } else if (campo.esRiesgo) {
        esRiesgo = true;
        nombreRiesgo = campo.nombreRiesgo;
        nombreCampo = campo.valor;
        valor = campo.valor;
      }

      this.setState({
        objetoEjeXNuevo: {
          nombreCampo: nombreCampo,
          valor: valor,
          esVariable: esVariable,
          esIndicador: esIndicador,
          esRiesgo: esRiesgo,
          nombreVariable: nombreVariable,
          nombreIndicador: nombreIndicador,
          nombreRiesgo: nombreRiesgo
        }
      });
    }
  }, {
    key: "closeCampoModalEjeX",
    value: function closeCampoModalEjeX() {
      this.setState({
        showModalCampoEjeX: false
      });
    }
  }, {
    key: "showCampoModalEjeY",
    value: function showCampoModalEjeY(event) {
      //event.stopPropagation();
      this.setState({
        showModalCampoEjeY: true
      });
    }
  }, {
    key: "retornoSeleccionEjeY",
    value: function retornoSeleccionEjeY(campoSeleccionadoInput) {
      var campo = campoSeleccionadoInput[0];
      var esVariable = false,
          esIndicador = false,
          esRiesgo = false;
      var nombreVariable = '',
          nombreIndicador = '',
          nombreRiesgo = '',
          nombreCampo = '',
          valor = '';

      if (campo.esVariable) {
        esVariable = true;
        nombreVariable = campo.nombreVariable;
        nombreCampo = campo.valor;
        valor = campo.valor;
      } else if (campo.esIndicador) {
        esIndicador = true;
        nombreIndicador = campo.nombreIndicador;
        nombreCampo = campo.valor;
        valor = campo.valor;
      } else if (campo.esRiesgo) {
        esRiesgo = true;
        nombreRiesgo = campo.nombreRiesgo;
        nombreCampo = campo.valor;
        valor = campo.valor;
      }

      var copyTemp = _toConsumableArray(this.state.variablesSeleccionadasSeccionesDashboardNueva);

      copyTemp.push({
        nombreCampo: nombreCampo,
        valor: valor,
        esVariable: esVariable,
        esIndicador: esIndicador,
        esRiesgo: esRiesgo,
        nombreVariable: nombreVariable,
        nombreIndicador: nombreIndicador,
        nombreRiesgo: nombreRiesgo
      });
      this.setState({
        variablesSeleccionadasSeccionesDashboardNueva: copyTemp
      });
    }
  }, {
    key: "deleteVariableSeleccionadasSeccionesDashboardNueva",
    value: function deleteVariableSeleccionadasSeccionesDashboardNueva(index) {
      var copyTemp = _toConsumableArray(this.state.variablesSeleccionadasSeccionesDashboardNueva);

      copyTemp.splice(index, 1);
      this.setState({
        variablesSeleccionadasSeccionesDashboardNueva: copyTemp
      });
    }
  }, {
    key: "closeCampoModalEjeY",
    value: function closeCampoModalEjeY() {
      this.setState({
        showModalCampoEjeY: false
      });
    }
  }, {
    key: "seleccionVarTableNuevo",
    value: function seleccionVarTableNuevo(index) {
      //verificar si existe valor, sino agregar
      //verificar que sea del mismo tipo (variable, indicador o riesgo)
      //si es indicador o riesgo agregar
      //si es variable y ya existe, no agregar
      var copyVarSel = _toConsumableArray(this.state.variablesSeleccionadasSeccionesDashboardTablaNueva),
          copyVarDisponibles = _toConsumableArray(this.state.variablesDisponiblesSeccionesDashboardTablaNueva);

      var agregarVar = false;

      if (copyVarSel.length == 0) {
        agregarVar = true;
      } else {
        var esVariable = false,
            esIndicador = false,
            esRiesgo = false;

        if (copyVarSel[0].esVariable) {
          esVariable = true;
        } else if (copyVarSel[0].esIndicador) {
          esIndicador = true;
        } else if (copyVarSel[0].esRiesgo) {
          esRiesgo = true;
        }

        if (esVariable) {
          agregarVar = false;
        } else if (esIndicador || esRiesgo) {
          if (copyVarDisponibles[index].esIndicador && esIndicador) {
            agregarVar = true;
          } else if (copyVarDisponibles[index].esRiesgo && esRiesgo) {
            agregarVar = true;
          } else {
            agregarVar = false;
          }
        }
      }

      if (agregarVar) {
        var esVariable = false,
            esIndicador = false,
            esRiesgo = false;
        var nombreVariable = '',
            nombreIndicador = '',
            nombreRiesgo = '',
            nombreCampo = '',
            valor = '';

        if (copyVarDisponibles[index].esVariable) {
          esVariable = true;
          nombreVariable = copyVarDisponibles[index].nombreVariable;
          nombreCampo = copyVarDisponibles[index].valor;
          valor = copyVarDisponibles[index].valor;
        } else if (copyVarDisponibles[index].esIndicador) {
          esIndicador = true;
          nombreIndicador = copyVarDisponibles[index].nombreIndicador;
          nombreCampo = copyVarDisponibles[index].valor;
          valor = copyVarDisponibles[index].valor;
        } else if (copyVarDisponibles[index].esRiesgo) {
          esRiesgo = true;
          nombreRiesgo = copyVarDisponibles[index].nombreRiesgo;
          nombreCampo = copyVarDisponibles[index].valor;
          valor = copyVarDisponibles[index].valor;
        }

        copyVarSel.push({
          nombreCampo: nombreCampo,
          valor: valor,
          esVariable: esVariable,
          esIndicador: esIndicador,
          esRiesgo: esRiesgo,
          nombreVariable: nombreVariable,
          nombreIndicador: nombreIndicador,
          nombreRiesgo: nombreRiesgo
        });
        copyVarDisponibles.splice(index, 1);
        this.setState({
          variablesSeleccionadasSeccionesDashboardTablaNueva: copyVarSel,
          variablesDisponiblesSeccionesDashboardTablaNueva: copyVarDisponibles
        });
      } else {
        var esVariable = false,
            esIndicador = false,
            esRiesgo = false;

        if (copyVarSel[0].esVariable) {
          esVariable = true;
        } else if (copyVarSel[0].esIndicador) {
          esIndicador = true;
        } else if (copyVarSel[0].esRiesgo) {
          esRiesgo = true;
        }

        if (esVariable) {
          alert("Una tabla solo puede tener una variable.");
        } else if (esIndicador || esRiesgo) {
          if (copyVarDisponibles[index].esIndicador && !esIndicador || copyVarDisponibles[index].esRiesgo && !esRiesgo) {
            alert("Las variables de la tabla deben ser del mismo tipo (riesgo o indicador).");
          }
        }
      }
    }
  }, {
    key: "deseleccionVarTableNuevo",
    value: function deseleccionVarTableNuevo(index) {
      var copyVarSel = _toConsumableArray(this.state.variablesSeleccionadasSeccionesDashboardTablaNueva),
          copyVarDisponibles = _toConsumableArray(this.state.variablesDisponiblesSeccionesDashboardTablaNueva);

      copyVarDisponibles.push(copyVarSel[index]);
      copyVarSel.splice(index, 1);
      this.setState({
        variablesSeleccionadasSeccionesDashboardTablaNueva: copyVarSel,
        variablesDisponiblesSeccionesDashboardTablaNueva: copyVarDisponibles
      });
    }
    /******************/

    /*UPDATE*/

    /******************/

  }, {
    key: "actualizarTipoObjetoNuevoUpdate",
    value: function actualizarTipoObjetoNuevoUpdate(index) {
      var copyTipoObjetoUpdate = _toConsumableArray(this.state.tipoObjetoUpdate);

      copyTipoObjetoUpdate[index] = $("#tipoObjeto" + index).val();
      this.setState({
        tipoObjetoUpdate: copyTipoObjetoUpdate
      });
    }
  }, {
    key: "mostrarDivGraficosUpdate",
    value: function mostrarDivGraficosUpdate(event, index) {
      event.stopPropagation();
      /*if(!this.state.displayGraphics == false) {
          var copyIndiceGraphSelectUpdate = [...this.state.indiceGraphSelectUpdate];
          copyIndiceGraphSelectUpdate[index] = -1;
          this.setState({
              indiceGraphSelectUpdate: copyIndiceGraphSelectUpdate
          });
      }*/

      var copyDisplayGraphicsUpdate = _toConsumableArray(this.state.displayGraphicsUpdate);

      copyDisplayGraphicsUpdate[index] = !copyDisplayGraphicsUpdate[index];
      this.setState({
        displayGraphicsUpdate: copyDisplayGraphicsUpdate
      });
    }
  }, {
    key: "cerrarDivGraficosUpdate",
    value: function cerrarDivGraficosUpdate(index) {
      var copyDisplayGraphicsUpdate = _toConsumableArray(this.state.displayGraphicsUpdate);

      copyDisplayGraphicsUpdate[index] = !copyDisplayGraphicsUpdate[index];

      var copyIndiceGraphSelectUpdate = _toConsumableArray(this.state.indiceGraphSelectUpdate);

      copyIndiceGraphSelectUpdate[index] = -1;
      this.setState({
        displayGraphicsUpdate: copyDisplayGraphicsUpdate,
        indiceGraphSelectUpdate: copyIndiceGraphSelectUpdate
      });
    }
  }, {
    key: "seleccionGraficoUpdate",
    value: function seleccionGraficoUpdate(event, tipoGraficaN, index, indexSeccion) {
      event.stopPropagation();

      var copyTipoGraficoUpdate = _toConsumableArray(this.state.tipoGraficoUpdate);

      copyTipoGraficoUpdate[indexSeccion] = tipoGraficaN;

      var copyIndiceGraphSelectUpdate = _toConsumableArray(this.state.indiceGraphSelectUpdate);

      copyIndiceGraphSelectUpdate[indexSeccion] = index;
      this.setState({
        tipoGraficoUpdate: copyTipoGraficoUpdate,
        indiceGraphSelectUpdate: copyIndiceGraphSelectUpdate
      });
    }
  }, {
    key: "showCampoModalEjeXUpdate",
    value: function showCampoModalEjeXUpdate(event, index) {
      event.stopPropagation();
      this.setState({
        showModalCampoEjeXUpdate: true,
        indexSeccionDeEjeUpdate: index
      });
    }
  }, {
    key: "retornoSeleccionEjeXUpdate",
    value: function retornoSeleccionEjeXUpdate(campoSeleccionadoInput) {
      var campo = campoSeleccionadoInput[0];
      var esVariable = false,
          esIndicador = false,
          esRiesgo = false;
      var nombreVariable = '',
          nombreIndicador = '',
          nombreRiesgo = '',
          nombreCampo = '',
          valor = '';

      if (campo.esVariable) {
        esVariable = true;
        nombreVariable = campo.nombreVariable;
        nombreCampo = campo.valor;
        valor = campo.valor;
      } else if (campo.esIndicador) {
        esIndicador = true;
        nombreIndicador = campo.nombreIndicador;
        nombreCampo = campo.valor;
        valor = campo.valor;
      } else if (campo.esRiesgo) {
        esRiesgo = true;
        nombreRiesgo = campo.nombreRiesgo;
        nombreCampo = campo.valor;
        valor = campo.valor;
      }

      var copyObjetoEjeXUpdate = _toConsumableArray(this.state.objetoEjeXUpdate);

      copyObjetoEjeXUpdate[this.state.indexSeccionDeEjeUpdate] = {
        nombreCampo: nombreCampo,
        valor: valor,
        esVariable: esVariable,
        esIndicador: esIndicador,
        esRiesgo: esRiesgo,
        nombreVariable: nombreVariable,
        nombreIndicador: nombreIndicador,
        nombreRiesgo: nombreRiesgo
      };
      this.setState({
        objetoEjeXUpdate: copyObjetoEjeXUpdate
      });
    }
  }, {
    key: "closeCampoModalEjeXUpdate",
    value: function closeCampoModalEjeXUpdate() {
      this.setState({
        showModalCampoEjeXUpdate: false
      });
    }
  }, {
    key: "showCampoModalEjeYUpdate",
    value: function showCampoModalEjeYUpdate(event, index) {
      event.stopPropagation();
      this.setState({
        showModalCampoEjeYUpdate: true,
        indexSeccionDeEjeUpdate: index
      });
    }
  }, {
    key: "retornoSeleccionEjeYUpdate",
    value: function retornoSeleccionEjeYUpdate(campoSeleccionadoInput) {
      var campo = campoSeleccionadoInput[0];
      var esVariable = false,
          esIndicador = false,
          esRiesgo = false;
      var nombreVariable = '',
          nombreIndicador = '',
          nombreRiesgo = '',
          nombreCampo = '',
          valor = '';

      if (campo.esVariable) {
        esVariable = true;
        nombreVariable = campo.nombreVariable;
        nombreCampo = campo.valor;
        valor = campo.valor;
      } else if (campo.esIndicador) {
        esIndicador = true;
        nombreIndicador = campo.nombreIndicador;
        nombreCampo = campo.valor;
        valor = campo.valor;
      } else if (campo.esRiesgo) {
        esRiesgo = true;
        nombreRiesgo = campo.nombreRiesgo;
        nombreCampo = campo.valor;
        valor = campo.valor;
      }

      var copyTemp = _toConsumableArray(this.state.variablesSeleccionadasSeccionesDashboardUpdate);

      copyTemp[this.state.indexSeccionDeEjeUpdate].push({
        nombreCampo: nombreCampo,
        valor: valor,
        esVariable: esVariable,
        esIndicador: esIndicador,
        esRiesgo: esRiesgo,
        nombreVariable: nombreVariable,
        nombreIndicador: nombreIndicador,
        nombreRiesgo: nombreRiesgo
      });
      this.setState({
        variablesSeleccionadasSeccionesDashboardUpdate: copyTemp
      });
    }
  }, {
    key: "deleteVariableSeleccionadasSeccionesDashboardUpdate",
    value: function deleteVariableSeleccionadasSeccionesDashboardUpdate(index) {
      var copyTemp = _toConsumableArray(this.state.variablesSeleccionadasSeccionesDashboardUpdate);

      copyTemp[this.state.indexSeccionDeEjeUpdate].splice(index, 1);
      this.setState({
        variablesSeleccionadasSeccionesDashboardUpdate: copyTemp
      });
    }
  }, {
    key: "closeCampoModalEjeYUpdate",
    value: function closeCampoModalEjeYUpdate() {
      this.setState({
        showModalCampoEjeYUpdate: false
      });
    }
  }, {
    key: "seleccionVarTableNuevoUpdate",
    value: function seleccionVarTableNuevoUpdate(index, indexSeccion) {
      var copyVarSel = _toConsumableArray(this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate),
          copyVarDisponibles = _toConsumableArray(this.state.variablesDisponiblesSeccionesDashboardTablaUpdate);

      var agregarVar = false;

      if (copyVarSel.length == 0) {
        agregarVar = true;
      } else {
        var esVariable = false,
            esIndicador = false,
            esRiesgo = false;

        if (copyVarSel[0].esVariable) {
          esVariable = true;
        } else if (copyVarSel[0].esIndicador) {
          esIndicador = true;
        } else if (copyVarSel[0].esRiesgo) {
          esRiesgo = true;
        }

        if (esVariable) {
          agregarVar = false;
        } else if (esIndicador || esRiesgo) {
          if (copyVarDisponibles[index].esIndicador && esIndicador) {
            agregarVar = true;
          } else if (copyVarDisponibles[index].esRiesgo && esRiesgo) {
            agregarVar = true;
          } else {
            agregarVar = false;
          }
        }
      }

      if (agregarVar) {
        var esVariable = false,
            esIndicador = false,
            esRiesgo = false;
        var nombreVariable = '',
            nombreIndicador = '',
            nombreRiesgo = '',
            nombreCampo = '',
            valor = '';

        if (copyVarDisponibles[indexSeccion][index].esVariable) {
          esVariable = true;
          nombreVariable = copyVarDisponibles[indexSeccion][index].nombreVariable;
          nombreCampo = copyVarDisponibles[indexSeccion][index].valor;
          valor = copyVarDisponibles[indexSeccion][index].valor;
        } else if (copyVarDisponibles[indexSeccion][index].esIndicador) {
          esIndicador = true;
          nombreIndicador = copyVarDisponibles[indexSeccion][index].nombreIndicador;
          nombreCampo = copyVarDisponibles[indexSeccion][index].valor;
          valor = copyVarDisponibles[indexSeccion][index].valor;
        } else if (copyVarDisponibles[indexSeccion][index].esRiesgo) {
          esRiesgo = true;
          nombreRiesgo = copyVarDisponibles[indexSeccion][index].nombreRiesgo;
          nombreCampo = copyVarDisponibles[indexSeccion][index].valor;
          valor = copyVarDisponibles[indexSeccion][index].valor;
        }

        copyVarSel[indexSeccion].push({
          nombreCampo: nombreCampo,
          valor: valor,
          esVariable: esVariable,
          esIndicador: esIndicador,
          esRiesgo: esRiesgo,
          nombreVariable: nombreVariable,
          nombreIndicador: nombreIndicador,
          nombreRiesgo: nombreRiesgo
        });
        copyVarDisponibles[indexSeccion].splice(index, 1);
        this.setState({
          variablesSeleccionadasSeccionesDashboardTablaUpdate: copyVarSel,
          variablesDisponiblesSeccionesDashboardTablaUpdate: copyVarDisponibles
        });
      } else {
        var esVariable = false,
            esIndicador = false,
            esRiesgo = false;

        if (copyVarSel[0].esVariable) {
          esVariable = true;
        } else if (copyVarSel[0].esIndicador) {
          esIndicador = true;
        } else if (copyVarSel[0].esRiesgo) {
          esRiesgo = true;
        }

        if (esVariable) {
          alert("Una tabla solo puede tener una variable.");
        } else if (esIndicador || esRiesgo) {
          if (copyVarDisponibles[index].esIndicador && !esIndicador || copyVarDisponibles[index].esRiesgo && !esRiesgo) {
            alert("Las variables de la tabla deben ser del mismo tipo (riesgo o indicador).");
          }
        }
      }
    }
  }, {
    key: "deseleccionVarTableUpdate",
    value: function deseleccionVarTableUpdate(index, indexSeccion) {
      var copyVarSel = _toConsumableArray(this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate),
          copyVarDisponibles = _toConsumableArray(this.state.variablesDisponiblesSeccionesDashboardTablaUpdate);

      copyVarDisponibles[indexSeccion].push(copyVarSel[indexSeccion][index]);
      copyVarSel[indexSeccion].splice(index, 1);
      this.setState({
        variablesSeleccionadasSeccionesDashboardTablaUpdate: copyVarSel,
        variablesDisponiblesSeccionesDashboardTablaUpdate: copyVarDisponibles
      });
    }
  }, {
    key: "modificarSeccionDashboard",
    value: function modificarSeccionDashboard(index) {
      var tamano = $("#tamano" + index).val();
      var tipoObjeto = $("#tipoObjeto" + index).val();

      if (tamano.length < 10) {
        if (tipoObjeto.length < 10) {
          if (tipoObjeto.localeCompare("grafica") == 0 && this.state.tipoGraficoUpdate[index].length > 0 || tipoObjeto.localeCompare("tabla") == 0) {
            //viendo si creo variables
            if (this.state.tipoGraficoUpdate[index] != undefined && (this.state.tipoGraficoUpdate[index].localeCompare("LINEA") == 0 || this.state.tipoGraficoUpdate[index].localeCompare("AREA") == 0 || this.state.tipoGraficoUpdate[index].localeCompare("BARRA") == 0 || this.state.tipoGraficoUpdate[index].localeCompare("DISPERSION") == 0) && this.state.objetoEjeXUpdate[index] != undefined && this.state.objetoEjeXUpdate[index].valor != undefined && this.state.variablesSeleccionadasSeccionesDashboardUpdate[index] != undefined && this.state.variablesSeleccionadasSeccionesDashboardUpdate[index].length > 0 || this.state.tipoObjetoUpdate[index].localeCompare("tabla") == 0 && this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index].length > 0) {
              var instruccion = '';

              if (tipoObjeto.localeCompare("grafica") == 0) {
                //EJEMPLO: GRAFICA=>AREA[EJEY={esVariable: true, variableID: 1}\/EJEX={esVariable: true, esTabla: false, ^ variableID: 1}<>{esVariable: true, ^ variableID: 1}]
                instruccion += 'GRAFICA=>';

                if (this.state.tipoGraficoUpdate[index].length > 0) {
                  instruccion += this.state.tipoGraficoUpdate[index] + "[";

                  if (this.state.tipoGraficoUpdate[index].localeCompare("LINEA") == 0 || this.state.tipoGraficoUpdate[index].localeCompare("AREA") == 0 || this.state.tipoGraficoUpdate[index].localeCompare("BARRA") == 0 || this.state.tipoGraficoUpdate[index].localeCompare("DISPERSION") == 0) {
                    //EJEY
                    instruccion += "EJEX={";

                    if (this.state.objetoEjeXUpdate[index].esVariable) {
                      instruccion += 'esVariable:true,esIndicador:false,esRiesgo:false,';
                      instruccion += 'nombreVariable:"' + this.state.objetoEjeXUpdate[index].nombreVariable + '",nombreCampo:"' + this.state.objetoEjeXUpdate[index].nombreCampo + '",valor:"' + this.state.objetoEjeXUpdate[index].valor + '"}';
                    } else if (this.state.objetoEjeXUpdate[index].esIndicador) {
                      instruccion += 'esVariable:false,esIndicador:true,esRiesgo:false,';
                      instruccion += 'nombreIndicador:"' + this.state.objetoEjeXUpdate[index].nombreIndicador + '",nombreCampo:"' + this.state.objetoEjeXUpdate[index].nombreCampo + '",valor:"' + this.state.objetoEjeXUpdate[index].valor + '"}';
                    } else if (this.state.objetoEjeXUpdate[index].esRiesgo) {
                      instruccion += 'esVariable:false,esIndicador:false,esRiesgo:true,';
                      instruccion += 'nombreRiesgo:"' + this.state.objetoEjeXUpdate[index].nombreRiesgo + '",nombreCampo:"' + this.state.objetoEjeXUpdate[index].nombreCampo + '",valor:"' + this.state.objetoEjeXUpdate[index].valor + '"}';
                    } //EJEX


                    instruccion += "\\/EJEY={";

                    for (var i = 0; i < this.state.variablesSeleccionadasSeccionesDashboardUpdate[index].length; i++) {
                      if (i > 0) instruccion += '<>{';

                      if (this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esVariable) {
                        instruccion += 'esVariable:true,esIndicador:false,esRiesgo:false,';
                        instruccion += 'nombreVariable:"' + this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreVariable + '",nombreCampo:"' + this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreCampo + '",valor:"' + this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].valor + '"}';
                      } else if (this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esIndicador) {
                        instruccion += 'esVariable:false,esIndicador:true,esRiesgo:false,';
                        instruccion += 'nombreIndicador:"' + this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreVariable + '",nombreCampo:"' + this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreCampo + '",valor:"' + this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].valor + '"}';
                      } else if (this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esRiesgo) {
                        instruccion += 'esVariable:false,esIndicador:false,esRiesgo:true,';
                        instruccion += 'nombreRiesgo:"' + this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreVariable + '",nombreCampo:"' + this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreCampo + '",valor:"' + this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].valor + '"}';
                      }
                    }

                    ;
                    instruccion += ']';
                  } else if (this.state.tipoGraficoUpdate[index].localeCompare("PIE") == 0) {
                    //EJEMPLO: GRAFICA=>PIE[{esVariable: true, variableID: 1}<>{esVariable: true, variableID: 1}<>{esVariable: true, variableID: 1}]
                    instruccion += "{";

                    for (var i = 0; i < this.state.variablesSeleccionadasSeccionesDashboardUpdate[index].length; i++) {
                      if (i > 0) instruccion += '<>{';

                      if (this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esVariable) {
                        instruccion += 'esVariable:true,esIndicador:false,esRiesgo:false,';
                        instruccion += 'nombreVariable:"' + this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreVariable + '",nombreCampo:"' + this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreCampo + '",valor:"' + this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].valor + '"}';
                      } else if (this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esIndicador) {
                        instruccion += 'esVariable:false,esIndicador:true,esRiesgo:false,';
                        instruccion += 'nombreIndicador:"' + this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreVariable + '",nombreCampo:"' + this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreCampo + '",valor:"' + this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].valor + '"}';
                      } else if (this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esRiesgo) {
                        instruccion += 'esVariable:false,esIndicador:false,esRiesgo:true,';
                        instruccion += 'nombreRiesgo:"' + this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreVariable + '",nombreCampo:"' + this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreCampo + '",valor:"' + this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].valor + '"}';
                      }
                    }

                    ;
                    instruccion += ']';
                  }
                }
              }

              if (tipoObjeto.localeCompare("tabla") == 0) {
                //EJEMPLO: TABLA=>[{esVariable: true, variableID: 1}<>{esVariable: true, variableID: 1}<>{esVariable: true, variableID: 1}]
                instruccion += 'TABLA=>[{';

                for (var i = 0; i < this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index].length; i++) {
                  if (i > 0) instruccion += '<>{';

                  if (this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].esVariable) {
                    instruccion += 'esVariable:true,esIndicador:false,esRiesgo:false,';
                    instruccion += 'nombreVariable:"' + this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].nombreVariable + '",nombreCampo:"' + this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].nombreCampo + '",valor:"' + this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].valor + '"}';
                  } else if (this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].esIndicador) {
                    instruccion += 'esVariable:false,esIndicador:true,esRiesgo:false,';
                    instruccion += 'nombreIndicador:"' + this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].nombreIndicador + '",nombreCampo:"' + this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].nombreCampo + '",valor:"' + this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].valor + '"}';
                  } else if (this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].esRiesgo) {
                    instruccion += 'esVariable:false,esIndicador:false,esRiesgo:true,';
                    instruccion += 'nombreRiesgo:"' + this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].nombreRiesgo + '",nombreCampo:"' + this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].nombreCampo + '",valor:"' + this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].valor + '"}';
                  }
                }

                ;
                instruccion += ']';
              }

              var seccionesDashboard = _toConsumableArray(this.state.seccionesDashboard);

              seccionesDashboard[index].tamano = tamano;
              seccionesDashboard[index].tipoObjeto = tipoObjeto;
              seccionesDashboard[index].instruccion = instruccion;
              this.setState({
                seccionesDashboard: seccionesDashboard
              }, this.crearArreglosDeInstruccionesUpdate); //no se ocupa porque ya fue modificado

              /*if(this.state.tipoObjetoUpdate[index].localeCompare("grafico") == 0) {
                  if(this.state.tipoObjetoUpdate[index].localeCompare("LINEA") == 0 || this.state.tipoObjetoUpdate[index].localeCompare("AREA") == 0
                  ||  this.state.tipoObjetoUpdate[index].localeCompare("BARRA") == 0 || this.state.tipoObjetoUpdate[index].localeCompare("DISPERSION") == 0) {
                      //
                  } else if(this.state.tipoObjetoUpdate[index].localeCompare("PIE") == 0) {
                      //
                  }
              } else if(this.state.tipoObjetoUpdate[index].localeCompare("tabla") == 0) {
                  //
              }*/
            } else {
              if ((this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0) && this.state.objetoEjeYNuevo.valor == undefined) {
                alert("Seleccione una variable para el eje y");
              } else if ((this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0) && this.state.variablesSeleccionadasSeccionesDashboardNueva.length == 0) {
                alert("Seleccione por lo menos una variable para el eje x");
              } else if (tipoObjeto.localeCompare("tabla") == 0 && this.state.variablesSeleccionadasSeccionesDashboardTablaNueva.length == 0) {
                alert("Seleccione por lo menos una variable para las tablas");
              }
            }
          } else {
            alert("Seleccione un tipo de grafico.");
          }
        } else {
          alert("Ingrese un valor para el tipo de objeto menor a 10 caracteres.");
        }
      } else {
        alert("Ingrese un valor para el tamaño menor a 10 caracteres.");
      }
    }
  }, {
    key: "eliminarSeccionDashboard",
    value: function eliminarSeccionDashboard(index) {
      var copySeccionesDashboard = _toConsumableArray(this.state.seccionesDashboard);

      copySeccionesDashboard.splice(index, 1);

      var copyObjetoEjeXUpdate = _toConsumableArray(this.state.objetoEjeXUpdate);

      copyObjetoEjeXUpdate.splice(index, 1);

      var copyTemp = _toConsumableArray(this.state.variablesSeleccionadasSeccionesDashboardUpdate);

      copyTemp.splice(index, 1);

      var copyVarSel = _toConsumableArray(this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate),
          copyVarDisponibles = _toConsumableArray(this.state.variablesDisponiblesSeccionesDashboardTablaUpdate);

      copyVarSel.splice(index, 1);
      copyVarDisponibles.splice(index, 1);
      this.setState({
        seccionesDashboard: copySeccionesDashboard,
        objetoEjeXUpdate: copyObjetoEjeXUpdate,
        variablesSeleccionadasSeccionesDashboardUpdate: copyTemp,
        variablesSeleccionadasSeccionesDashboardTablaUpdate: copyVarSel,
        variablesDisponiblesSeccionesDashboardTablaUpdate: copyVarDisponibles
      });
    }
  }, {
    key: "crearArreglosDeInstruccionesUpdate",
    value: function crearArreglosDeInstruccionesUpdate() {
      var tipoObjetoUpdate = [],
          tipoGraficoUpdate = [],
          displayGraphicsUpdate = [],
          indiceGraphSelectUpdate = [],
          objetoEjeXUpdate = [];
      var variablesSeleccionadasSeccionesDashboardUpdate = [],
          variablesSeleccionadasSeccionesDashboardTablaUpdate = [],
          variablesDisponiblesSeccionesDashboardTablaUpdate = [];

      for (var i = 0; i < this.state.seccionesDashboard.length; i++) {
        if (this.state.seccionesDashboard[i].instruccion.indexOf("GRAFICA") == 0) {
          var cadenaValores = this.state.seccionesDashboard[i].instruccion.split("=>")[1];
          tipoObjetoUpdate[i] = 'grafica';
          displayGraphicsUpdate[i] = false;

          if (cadenaValores.indexOf("LINEA") == 0 || cadenaValores.indexOf("AREA") == 0 || cadenaValores.indexOf("BARRA") == 0 || cadenaValores.indexOf("DISPERSION") == 0) {
            if (cadenaValores.indexOf("LINEA") == 0) {
              tipoGraficoUpdate[i] = 'LINEA';
              indiceGraphSelectUpdate[i] = 0;
            } else if (cadenaValores.indexOf("AREA") == 0) {
              tipoGraficoUpdate[i] = 'AREA';
              indiceGraphSelectUpdate[i] = 1;
            } else if (cadenaValores.indexOf("BARRA") == 0) {
              tipoGraficoUpdate[i] = 'BARRA';
              indiceGraphSelectUpdate[i] = 2;
            } else if (cadenaValores.indexOf("DISPERSION") == 0) {
              tipoGraficoUpdate[i] = 'DISPERSION';
              indiceGraphSelectUpdate[i] = 3;
            }

            if (objetoEjeXUpdate[i] == undefined) objetoEjeXUpdate[i] = [];
            var arregloObjetoX = cadenaValores.split("\\/")[0];
            var objetoXCadena = arregloObjetoX.substring(arregloObjetoX.indexOf("{") + 1, arregloObjetoX.indexOf("}"));
            eval("objetoEjeXUpdate[i] = {" + objetoXCadena + "}");
            objetoEjeXUpdate[i].nombre = ''; //this.getObject(objetoEjeXUpdate, i, objetoEjeXUpdate[i], "objetoEjeXUpdate");

            var arregloObjetosY = cadenaValores.split("\\/")[1];
            var arregloValores = arregloObjetosY.split("<>");
            if (variablesDisponiblesSeccionesDashboardTablaUpdate[i] == undefined) variablesDisponiblesSeccionesDashboardTablaUpdate[i] = [];
            variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.variables.concat(this.props.indicadores, this.props.riesgos);
            if (variablesSeleccionadasSeccionesDashboardUpdate[i] == undefined) variablesSeleccionadasSeccionesDashboardUpdate[i] = [];

            for (var j = 0; j < arregloValores.length; j++) {
              var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{") + 1, arregloValores[j].lastIndexOf("}"));
              eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({" + objeto + "})");
              variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = ''; //this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
            }

            ;
          } else if (cadenaValores.indexOf("PIE") == 0) {
            tipoGraficoUpdate[i] = 'PIE';
            indiceGraphSelectUpdate[i] = 4;
            if (objetoEjeXUpdate[i] == undefined) objetoEjeXUpdate[i] = [];
            /*var arregloObjetoX = cadenaValores.split("\\/")[0];
            var objetoXCadena = arregloObjetoX.substring(arregloObjetoX.indexOf("{")+1, arregloObjetoX.lastIndexOf("}"));
            eval("objetoEjeXUpdate[i] = {"+objetoXCadena+"}");
            objetoEjeXUpdate[i].nombre = '';
            this.getObject(objetoEjeXUpdate, indice, objetoEjeXUpdate[i], "objetoEjeXUpdate");*/

            var arregloObjetosY = cadenaValores;
            var arregloValores = arregloObjetosY.split("<>");
            if (variablesDisponiblesSeccionesDashboardTablaUpdate[i] == undefined) variablesDisponiblesSeccionesDashboardTablaUpdate[i] = [];
            variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.variables.concat(this.props.indicadores, this.props.riesgos);
            if (variablesSeleccionadasSeccionesDashboardUpdate[i] == undefined) variablesSeleccionadasSeccionesDashboardUpdate[i] = [];

            for (var j = 0; j < arregloValores.length; j++) {
              var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{") + 1, arregloValores[j].lastIndexOf("}"));
              eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({" + objeto + "})");
              variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = ''; //this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
            }

            ;
          }
        } else if (this.state.seccionesDashboard[i].instruccion.indexOf("TABLA") == 0) {
          var cadenaValores = this.state.seccionesDashboard[i].instruccion.split("=>")[1];
          var cadenaValoresSinCorchetes = cadenaValores.substring(1, cadenaValores.indexOf("]"));
          var arregloValores = cadenaValoresSinCorchetes.split("<>");
          tipoObjetoUpdate[i] = 'tabla';
          if (variablesSeleccionadasSeccionesDashboardTablaUpdate[i] == undefined) variablesSeleccionadasSeccionesDashboardTablaUpdate[i] = [];
          if (variablesDisponiblesSeccionesDashboardTablaUpdate[i] == undefined) variablesDisponiblesSeccionesDashboardTablaUpdate[i] = [];
          variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.variables.concat(this.props.indicadores, this.props.riesgos);

          for (var j = 0; j < arregloValores.length; j++) {
            var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{") + 1, arregloValores[j].lastIndexOf("}"));
            eval("variablesSeleccionadasSeccionesDashboardTablaUpdate[i].push({" + objeto + "})");
            variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombre = ''; //this.getObject(variablesSeleccionadasSeccionesDashboardTablaUpdate, i, variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j], "variablesSeleccionadasSeccionesDashboardTablaUpdate", j);
            //variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.variables.concat(this.props.indicadores, this.props.riesgos);
          }

          ;

          for (var j = 0; j < variablesSeleccionadasSeccionesDashboardTablaUpdate[i].length; j++) {
            if (variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].esVariable) {
              FORDISPONIBLES: for (var k = 0; k < variablesDisponiblesSeccionesDashboardTablaUpdate[i].length; k++) {
                if (variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].esVariable && variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].nombreVariable.localeCompare(variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombreVariable) == 0) {
                  variablesDisponiblesSeccionesDashboardTablaUpdate[i].splice(k, 1);
                  break FORDISPONIBLES;
                }
              }

              ;
            } else if (variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].esIndicador) {
              FORDISPONIBLES: for (var k = 0; k < variablesDisponiblesSeccionesDashboardTablaUpdate[i].length; k++) {
                if (variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].esIndicador && variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].nombreIndicador.localeCompare(variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombreIndicador) == 0) {
                  variablesDisponiblesSeccionesDashboardTablaUpdate[i].splice(k, 1);
                  break FORDISPONIBLES;
                }
              }

              ;
            } else if (variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].esRiesgo) {
              FORDISPONIBLES: for (var k = 0; k < variablesDisponiblesSeccionesDashboardTablaUpdate[i].length; k++) {
                if (variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].esRiesgo && variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].nombreRiesgo.localeCompare(variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombreRiesgo) == 0) {
                  variablesDisponiblesSeccionesDashboardTablaUpdate[i].splice(k, 1);
                  break FORDISPONIBLES;
                }
              }

              ;
            }
          }

          ;
        }
      }

      ;
      /*console.log('tipoObjetoUpdate')
      console.log(tipoObjetoUpdate)
      console.log('tipoGraficoUpdate')
      console.log(tipoGraficoUpdate)
      console.log('displayGraphicsUpdate')
      console.log(displayGraphicsUpdate)
      console.log('indiceGraphSelectUpdate')
      console.log(indiceGraphSelectUpdate)
      console.log('objetoEjeXUpdate')
      console.log(objetoEjeXUpdate)
      console.log('variablesSeleccionadasSeccionesDashboardUpdate')
      console.log(variablesSeleccionadasSeccionesDashboardUpdate)
      console.log('variablesSeleccionadasSeccionesDashboardTablaUpdate')
      console.log(variablesSeleccionadasSeccionesDashboardTablaUpdate)
      console.log('variablesDisponiblesSeccionesDashboardTablaUpdate')
      console.log(variablesDisponiblesSeccionesDashboardTablaUpdate)*/

      /*this.setState({
          tipoObjetoUpdate: tipoObjetoUpdate,
          tipoGraficoUpdate: tipoGraficoUpdate,
          displayGraphicsUpdate: displayGraphicsUpdate,
          indiceGraphSelectUpdate: indiceGraphSelectUpdate,
          variablesDisponiblesSeccionesDashboardTablaUpdate: variablesDisponiblesSeccionesDashboardTablaUpdate
      });*/

      this.setState({
        tipoObjetoUpdate: tipoObjetoUpdate,
        tipoGraficoUpdate: tipoGraficoUpdate,
        objetoEjeXUpdate: objetoEjeXUpdate,
        variablesSeleccionadasSeccionesDashboardUpdate: variablesSeleccionadasSeccionesDashboardUpdate,
        variablesSeleccionadasSeccionesDashboardTablaUpdate: variablesSeleccionadasSeccionesDashboardTablaUpdate,
        displayGraphicsUpdate: displayGraphicsUpdate,
        indiceGraphSelectUpdate: indiceGraphSelectUpdate,
        variablesDisponiblesSeccionesDashboardTablaUpdate: variablesDisponiblesSeccionesDashboardTablaUpdate
      });
    }
  }, {
    key: "eliminarDashboard",
    value: function eliminarDashboard() {
      var _this8 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("delete from Dashboard where ID = " + _this8.props.dashboardSeleccionado.ID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              alert("Dashboard eliminada.");
            });
          }
        });
      }); // fin transaction

      var transaction1 = new _mssql["default"].Transaction(this.props.pool);
      transaction1.begin(function (err) {
        var rolledBack = false;
        transaction1.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request1 = new _mssql["default"].Request(transaction1);
        request1.query("delete from SeccionDashboard where dashboardID = " + _this8.props.dashboardSeleccionado.ID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction1.rollback(function (err) {});
            }
          } else {
            transaction1.commit(function (err) {});
          }
        });
      }); // fin transaction1
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      return _react["default"].createElement("div", {
        onClick: function onClick() {
          return _this9.cerrarDivGraficos();
        }
      }, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Crear Dashboard"), _react["default"].createElement("div", {
        className: "page-breadcrumb"
      }, _react["default"].createElement("nav", {
        "aria-label": "breadcrumb"
      }, _react["default"].createElement("ol", {
        className: "breadcrumb"
      }, _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.retornarSeleccionDashboards
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Dashboards")), _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.retornoVerDashboard
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Dashboard: ", this.props.dashboardSeleccionado.nombre)), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Editar Dashboard"))))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card influencer-profile-data"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        className: "border-top border-bottom addPaddingToConfig",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"
      }, _react["default"].createElement("label", {
        htmlFor: "nombreDashboard",
        className: "col-form-label"
      }, "Nombre Dashboard")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("input", {
        id: "nombreDashboard",
        type: "text",
        className: "form-control form-control-sm"
      }))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"
      }, _react["default"].createElement("label", {
        htmlFor: "descripcionDashboard",
        className: "col-form-label"
      }, "Descripci\xF3n de Dashboard:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"
      }, _react["default"].createElement("textarea", {
        className: "form-control",
        id: "descripcionDashboard",
        rows: "3"
      }))), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%",
          textAlign: "center"
        }
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Secciones de Dashboard")), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "tamano",
        className: "col-form-label"
      }, "Tama\xF1o de Objeto")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("select", {
        id: "tamano",
        className: "form-control"
      }, _react["default"].createElement("option", {
        value: "col-6"
      }, "Mitad de P\xE1gina"), _react["default"].createElement("option", {
        value: "col-12"
      }, "P\xE1gina Completa")))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "tipoObjeto",
        className: "col-form-label"
      }, "Tipo de Objeto")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("select", {
        id: "tipoObjeto",
        className: "form-control",
        onChange: this.actualizarTipoObjetoNuevo
      }, _react["default"].createElement("option", {
        value: "grafica"
      }, "Gr\xE1fica"), _react["default"].createElement("option", {
        value: "tabla"
      }, "Tabla")))), this.state.tipoObjetoNuevo.localeCompare("grafica") == 0 ? _react["default"].createElement("div", {
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Tipo de Gr\xE1fica")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group selectGraph",
        onClick: function onClick(e) {
          return _this9.mostrarDivGraficos(e);
        },
        style: {
          borderRadius: "5px"
        }
      }, this.state.tipoGraficoNuevo.length == 0 ? _react["default"].createElement("div", {
        className: "selectGraph",
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#d2d2e4",
          justifyContent: "center"
        }
      }, _react["default"].createElement("span", null, "Seleccionar Tipo de Gr\xE1fico")) : _react["default"].createElement("div", {
        className: "selectGraph",
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#d2d2e4",
          justifyContent: "center"
        }
      }, _react["default"].createElement("span", null, this.state.tipoGraficoNuevo))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "selectGraph-content",
        style: {
          overflowX: "scroll",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          backgroundColor: "rgba(210, 210, 228, 0.3)",
          display: this.state.displayGraphics ? "block" : "none"
        }
      }, _react["default"].createElement("div", {
        className: "addPointer border-right" + (this.state.indiceGraphSelect == 0 ? " graficoSeleccionadoHighlight" : ""),
        style: {
          height: "100%",
          width: "90%",
          display: "inline-block"
        },
        onClick: function onClick(e) {
          return _this9.seleccionGrafico(e, "LINEA", 0);
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "9%",
          width: "100%",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("p", {
        className: "lead"
      }, " Gr\xE1fico de Lineas ")), _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "91%",
          width: "100%"
        }
      }, _react["default"].createElement("img", {
        src: "../assets/Linea.png",
        style: {
          height: "100%",
          width: "100%",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto"
        }
      }))), _react["default"].createElement("div", {
        className: "addPointer border-right" + (this.state.indiceGraphSelect == 1 ? " graficoSeleccionadoHighlight" : ""),
        style: {
          height: "100%",
          width: "90%",
          display: "inline-block"
        },
        onClick: function onClick(e) {
          return _this9.seleccionGrafico(e, "AREA", 1);
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "9%",
          width: "100%",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("p", {
        className: "lead"
      }, " Gr\xE1fico de Area ")), _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "91%",
          width: "100%"
        }
      }, _react["default"].createElement("img", {
        src: "../assets/Area.png",
        style: {
          height: "100%",
          width: "100%",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto"
        }
      }))), _react["default"].createElement("div", {
        className: "addPointer border-right" + (this.state.indiceGraphSelect == 2 ? " graficoSeleccionadoHighlight" : ""),
        style: {
          height: "100%",
          width: "90%",
          display: "inline-block"
        },
        onClick: function onClick(e) {
          return _this9.seleccionGrafico(e, "BARRA", 2);
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "9%",
          width: "100%",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("p", {
        className: "lead"
      }, " Gr\xE1fico de Barra ")), _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "91%",
          width: "100%"
        }
      }, _react["default"].createElement("img", {
        src: "../assets/Barra.png",
        style: {
          height: "100%",
          width: "100%",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto"
        }
      }))), _react["default"].createElement("div", {
        className: "addPointer border-right" + (this.state.indiceGraphSelect == 3 ? " graficoSeleccionadoHighlight" : ""),
        style: {
          height: "100%",
          width: "90%",
          display: "inline-block"
        },
        onClick: function onClick(e) {
          return _this9.seleccionGrafico(e, "DISPERSION", 3);
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "9%",
          width: "100%",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("p", {
        className: "lead"
      }, " Gr\xE1fico de Dispersi\xF3n ")), _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "91%",
          width: "100%"
        }
      }, _react["default"].createElement("img", {
        src: "../assets/Dispersion.png",
        style: {
          height: "100%",
          width: "100%",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto"
        }
      }))), _react["default"].createElement("div", {
        className: "addPointer" + (this.state.indiceGraphSelect == 4 ? " graficoSeleccionadoHighlight" : ""),
        style: {
          height: "100%",
          width: "90%",
          display: "inline-block"
        },
        onClick: function onClick(e) {
          return _this9.seleccionGrafico(e, "PIE", 4);
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "9%",
          width: "100%",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("p", {
        className: "lead"
      }, " Gr\xE1fico de Pie ")), _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "91%",
          width: "100%"
        }
      }, _react["default"].createElement("img", {
        src: "../assets/Pie.png",
        style: {
          height: "100%",
          width: "100%",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto"
        }
      })))))), this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0 ? _react["default"].createElement("div", {
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Variable Eje X")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, this.state.objetoEjeXNuevo.valor != undefined ? this.state.objetoEjeXNuevo.valor : "")), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-group"
      }, _react["default"].createElement("div", {
        className: "addPointer abrirModalCrearCondicionOnHover border",
        onClick: function onClick(e) {
          return _this9.showCampoModalEjeX(e);
        },
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("h5", null, "Seleccionar Variable Eje X")), _react["default"].createElement(_Modal["default"], {
        show: this.state.showModalCampoEjeX,
        titulo: "Seleccionar Variable Eje X",
        onClose: this.closeCampoModalEjeX
      }, _react["default"].createElement(_CampoDashboard["default"], {
        esNumero: function esNumero() {
          return void 0;
        },
        esBoolean: function esBoolean() {
          return void 0;
        },
        esFecha: function esFecha() {
          return void 0;
        },
        esTexto: function esTexto() {
          return void 0;
        },
        variables: this.props.variables,
        camposDeVariables: this.props.camposDeVariables,
        indicadores: this.props.indicadores,
        camposDeIndicadores: this.props.camposDeIndicadores,
        riesgos: this.props.riesgos,
        camposDeRiesgos: this.props.camposDeRiesgos,
        retornoSeleccionVariable: this.retornoSeleccionEjeX
      })))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Variables eje Y")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("div", {
        style: {
          width: "100%",
          textAlign: "center"
        }
      }, _react["default"].createElement("h4", {
        className: "pageheader-title"
      }, "Variables Seleccionadas"), _react["default"].createElement("div", {
        style: {
          maxHeight: "25vh",
          width: "100%",
          overflowY: "scroll"
        }
      }, this.state.variablesSeleccionadasSeccionesDashboardNueva.map(function (variableSeleccionada, i) {
        return _react["default"].createElement("div", {
          key: variableSeleccionada.valor + i,
          className: "border",
          style: {
            height: "33%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, variableSeleccionada.valor, _react["default"].createElement("span", null, " ", _react["default"].createElement("img", {
          className: "addPointer",
          onClick: function onClick() {
            return _this9.deleteVariableSeleccionadasSeccionesDashboardNueva(i);
          },
          src: "../assets/trash.png",
          style: {
            height: "20px",
            width: "20px",
            display: "block",
            "float": "right"
          }
        }), " "));
      }))))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-group"
      }, _react["default"].createElement("div", {
        className: "font-18 addPointer abrirModalCrearCondicionOnHover border",
        onClick: function onClick(e) {
          return _this9.showCampoModalEjeY(e);
        },
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("h5", null, "Seleccionar Variables Eje Y")), _react["default"].createElement(_Modal["default"], {
        show: this.state.showModalCampoEjeY,
        titulo: "Seleccionar Variables Eje Y",
        onClose: this.closeCampoModalEjeY
      }, _react["default"].createElement(_CampoDashboard["default"], {
        esNumero: function esNumero() {
          return void 0;
        },
        esBoolean: function esBoolean() {
          return void 0;
        },
        esFecha: function esFecha() {
          return void 0;
        },
        esTexto: function esTexto() {
          return void 0;
        },
        variables: this.props.variables,
        camposDeVariables: this.props.camposDeVariables,
        indicadores: this.props.indicadores,
        camposDeIndicadores: this.props.camposDeIndicadores,
        riesgos: this.props.riesgos,
        camposDeRiesgos: this.props.camposDeRiesgos,
        retornoSeleccionVariable: this.retornoSeleccionEjeY
      }))))) : null, this.state.tipoGraficoNuevo.localeCompare("PIE") == 0 ? _react["default"].createElement("div", {
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Variables")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("div", {
        style: {
          width: "100%",
          textAlign: "center"
        }
      }, _react["default"].createElement("h4", {
        className: "pageheader-title"
      }, "Variables Seleccionadas"), _react["default"].createElement("div", {
        style: {
          maxHeight: "25vh",
          width: "100%",
          overflowY: "scroll"
        }
      }, this.state.variablesSeleccionadasSeccionesDashboardNueva.map(function (variableSeleccionada, i) {
        return _react["default"].createElement("div", {
          key: variableSeleccionada.valor + i,
          className: "border",
          style: {
            height: "33%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, variableSeleccionada.valor, _react["default"].createElement("span", null, " ", _react["default"].createElement("img", {
          className: "addPointer",
          onClick: function onClick() {
            return _this9.deleteVariableSeleccionadasSeccionesDashboardNueva(i);
          },
          src: "../assets/trash.png",
          style: {
            height: "20px",
            width: "20px",
            display: "block",
            "float": "right"
          }
        }), " "));
      }))))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-group"
      }, _react["default"].createElement("div", {
        className: "font-18 addPointer abrirModalCrearCondicionOnHover border",
        onClick: function onClick(e) {
          return _this9.showCampoModalEjeY(e);
        },
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("h5", null, "Seleccionar Variables Eje Y")), _react["default"].createElement(_Modal["default"], {
        show: this.state.showModalCampoEjeY,
        titulo: "Seleccionar Variables Eje Y",
        onClose: this.closeCampoModalEjeY
      }, _react["default"].createElement(_CampoDashboard["default"], {
        esNumero: function esNumero() {
          return void 0;
        },
        esBoolean: function esBoolean() {
          return void 0;
        },
        esFecha: function esFecha() {
          return void 0;
        },
        esTexto: function esTexto() {
          return void 0;
        },
        variables: this.props.variables,
        camposDeVariables: this.props.camposDeVariables,
        indicadores: this.props.indicadores,
        camposDeIndicadores: this.props.camposDeIndicadores,
        riesgos: this.props.riesgos,
        camposDeRiesgos: this.props.camposDeRiesgos,
        retornoSeleccionVariable: this.retornoSeleccionEjeY
      }))))) : null) : _react["default"].createElement("div", {
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Variables")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("div", {
        style: {
          width: "50%",
          textAlign: "center",
          display: "inline-block"
        }
      }, _react["default"].createElement("h5", {
        className: "pageheader-title"
      }, "Variables Seleccionadas"), _react["default"].createElement("div", {
        style: {
          height: "25vh",
          width: "100%",
          overflowY: "scroll"
        }
      }, this.state.variablesSeleccionadasSeccionesDashboardTablaNueva.map(function (variableSeleccionada, i) {
        return _react["default"].createElement("div", {
          key: variableSeleccionada.valor + i,
          className: "addPointer border",
          onClick: function onClick() {
            return _this9.deseleccionVarTableNuevo(i);
          },
          style: {
            height: "33%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, variableSeleccionada.valor);
      }))), _react["default"].createElement("div", {
        style: {
          width: "50%",
          textAlign: "center",
          display: "inline-block"
        }
      }, _react["default"].createElement("h5", {
        className: "pageheader-title"
      }, "Variables Disponibles"), _react["default"].createElement("div", {
        style: {
          height: "25vh",
          width: "100%",
          overflowY: "scroll"
        }
      }, this.state.variablesDisponiblesSeccionesDashboardTablaNueva.map(function (variableSeleccionada, i) {
        return _react["default"].createElement("div", {
          key: variableSeleccionada.valor + i,
          className: "addPointer border",
          onClick: function onClick() {
            return _this9.seleccionVarTableNuevo(i);
          },
          style: {
            height: "33%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, variableSeleccionada.valor);
      })))))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-brand active",
        onClick: this.crearSeccionDashboard
      }, "Crear Secci\xF3n de Dashboard")), _react["default"].createElement("br", null), this.state.seccionesDashboard.map(function (seccionDashboard, i) {
        return _react["default"].createElement("div", {
          key: seccionDashboard.tamano + i,
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("hr", null), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%",
            textAlign: "center"
          }
        }, _react["default"].createElement("h2", {
          className: "pageheader-title"
        }, "Secciones de Dashboard")), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "tamano" + i,
          className: "col-form-label"
        }, "Tama\xF1o de Objeto")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("select", {
          id: "tamano" + i,
          defaultValue: seccionDashboard.tamano,
          className: "form-control"
        }, _react["default"].createElement("option", {
          value: "col-6"
        }, "Mitad de P\xE1gina"), _react["default"].createElement("option", {
          value: "col-12"
        }, "P\xE1gina Completa")))), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "tipoObjeto" + i,
          className: "col-form-label"
        }, "Tipo de Objeto")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("select", {
          id: "tipoObjeto" + i,
          defaultValue: seccionDashboard.tipoObjeto,
          className: "form-control",
          onChange: function onChange() {
            return _this9.actualizarTipoObjetoNuevoUpdate(i);
          }
        }, _react["default"].createElement("option", {
          value: "grafica"
        }, "Gr\xE1fica"), _react["default"].createElement("option", {
          value: "tabla"
        }, "Tabla")))), _this9.state.tipoObjetoUpdate[i] != undefined && _this9.state.tipoObjetoUpdate[i].localeCompare("grafica") == 0 ? _react["default"].createElement("div", {
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          className: "col-form-label"
        }, "Tipo de Gr\xE1fica")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group selectGraph",
          onClick: function onClick(e) {
            return _this9.mostrarDivGraficosUpdate(e, i);
          },
          style: {
            borderRadius: "5px"
          }
        }, _react["default"].createElement("div", {
          className: "selectGraph",
          style: {
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#d2d2e4",
            justifyContent: "center"
          }
        }, _this9.state.tipoGraficoUpdate[i] == undefined || _this9.state.tipoGraficoUpdate[i].length == 0 ? _react["default"].createElement("div", {
          className: "selectGraph",
          style: {
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#d2d2e4",
            justifyContent: "center"
          }
        }, _react["default"].createElement("span", null, "Seleccionar Tipo de Gr\xE1fico")) : _react["default"].createElement("div", {
          className: "selectGraph",
          style: {
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#d2d2e4",
            justifyContent: "center"
          }
        }, _react["default"].createElement("span", null, _this9.state.tipoGraficoUpdate[i])))), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "selectGraph-content",
          style: {
            overflowX: "scroll",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            backgroundColor: "rgba(210, 210, 228, 0.3)",
            display: _this9.state.displayGraphicsUpdate[i] ? "block" : "none"
          }
        }, _react["default"].createElement("div", {
          className: "addPointer border-right" + (_this9.state.indiceGraphSelectUpdate[i] == 0 ? " graficoSeleccionadoHighlight" : ""),
          style: {
            height: "100%",
            width: "90%",
            display: "inline-block"
          },
          onClick: function onClick(e) {
            return _this9.seleccionGraficoUpdate(e, "LINEA", 0, i);
          }
        }, _react["default"].createElement("div", {
          className: "row",
          style: {
            height: "9%",
            width: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("p", {
          className: "lead"
        }, " Gr\xE1fico de Lineas ")), _react["default"].createElement("div", {
          className: "row",
          style: {
            height: "91%",
            width: "100%"
          }
        }, _react["default"].createElement("img", {
          src: "../assets/Linea.png",
          style: {
            height: "100%",
            width: "100%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
          }
        }))), _react["default"].createElement("div", {
          className: "addPointer border-right" + (_this9.state.indiceGraphSelectUpdate[i] == 1 ? " graficoSeleccionadoHighlight" : ""),
          style: {
            height: "100%",
            width: "90%",
            display: "inline-block"
          },
          onClick: function onClick(e) {
            return _this9.seleccionGraficoUpdate(e, "AREA", 1, i);
          }
        }, _react["default"].createElement("div", {
          className: "row",
          style: {
            height: "9%",
            width: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("p", {
          className: "lead"
        }, " Gr\xE1fico de Area ")), _react["default"].createElement("div", {
          className: "row",
          style: {
            height: "91%",
            width: "100%"
          }
        }, _react["default"].createElement("img", {
          src: "../assets/Area.png",
          style: {
            height: "100%",
            width: "100%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
          }
        }))), _react["default"].createElement("div", {
          className: "addPointer border-right" + (_this9.state.indiceGraphSelectUpdate[i] == 2 ? " graficoSeleccionadoHighlight" : ""),
          style: {
            height: "100%",
            width: "90%",
            display: "inline-block"
          },
          onClick: function onClick(e) {
            return _this9.seleccionGraficoUpdate(e, "BARRA", 2, i);
          }
        }, _react["default"].createElement("div", {
          className: "row",
          style: {
            height: "9%",
            width: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("p", {
          className: "lead"
        }, " Gr\xE1fico de Barra ")), _react["default"].createElement("div", {
          className: "row",
          style: {
            height: "91%",
            width: "100%"
          }
        }, _react["default"].createElement("img", {
          src: "../assets/Barra.png",
          style: {
            height: "100%",
            width: "100%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
          }
        }))), _react["default"].createElement("div", {
          className: "addPointer border-right" + (_this9.state.indiceGraphSelectUpdate[i] == 3 ? " graficoSeleccionadoHighlight" : ""),
          style: {
            height: "100%",
            width: "90%",
            display: "inline-block"
          },
          onClick: function onClick(e) {
            return _this9.seleccionGraficoUpdate(e, "DISPERSION", 3, i);
          }
        }, _react["default"].createElement("div", {
          className: "row",
          style: {
            height: "9%",
            width: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("p", {
          className: "lead"
        }, " Gr\xE1fico de Dispersi\xF3n ")), _react["default"].createElement("div", {
          className: "row",
          style: {
            height: "91%",
            width: "100%"
          }
        }, _react["default"].createElement("img", {
          src: "../assets/Dispersion.png",
          style: {
            height: "100%",
            width: "100%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
          }
        }))), _react["default"].createElement("div", {
          className: "addPointer" + (_this9.state.indiceGraphSelectUpdate[i] == 4 ? " graficoSeleccionadoHighlight" : ""),
          style: {
            height: "100%",
            width: "90%",
            display: "inline-block"
          },
          onClick: function onClick(e) {
            return _this9.seleccionGraficoUpdate(e, "PIE", 4, i);
          }
        }, _react["default"].createElement("div", {
          className: "row",
          style: {
            height: "9%",
            width: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("p", {
          className: "lead"
        }, " Gr\xE1fico de Pie ")), _react["default"].createElement("div", {
          className: "row",
          style: {
            height: "91%",
            width: "100%"
          }
        }, _react["default"].createElement("img", {
          src: "../assets/Pie.png",
          style: {
            height: "100%",
            width: "100%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
          }
        })))))), _this9.state.tipoGraficoUpdate[i] != undefined && _this9.state.tipoGraficoUpdate[i].localeCompare("LINEA") == 0 || _this9.state.tipoGraficoUpdate[i] != undefined && _this9.state.tipoGraficoUpdate[i].localeCompare("AREA") == 0 || _this9.state.tipoGraficoUpdate[i] != undefined && _this9.state.tipoGraficoUpdate[i].localeCompare("BARRA") == 0 || _this9.state.tipoGraficoUpdate[i] != undefined && _this9.state.tipoGraficoUpdate[i].localeCompare("DISPERSION") == 0 ? _react["default"].createElement("div", {
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          className: "col-form-label"
        }, "Variable Eje X")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _this9.state.objetoEjeXUpdate[i] != undefined && _this9.state.objetoEjeXUpdate[i].valor != undefined ? _this9.state.objetoEjeXUpdate[i].valor : "")), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-group"
        }, _react["default"].createElement("div", {
          className: "addPointer abrirModalCrearCondicionOnHover border",
          onClick: function onClick(e) {
            return _this9.showCampoModalEjeXUpdate(e, i);
          },
          style: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("h5", null, "Seleccionar Variable Eje X")), _react["default"].createElement(_Modal["default"], {
          show: _this9.state.showModalCampoEjeXUpdate,
          titulo: "Seleccionar Variable Eje X",
          onClose: _this9.closeCampoModalEjeXUpdate
        }, _react["default"].createElement(_CampoDashboard["default"], {
          esNumero: function esNumero() {
            return void 0;
          },
          esBoolean: function esBoolean() {
            return void 0;
          },
          esFecha: function esFecha() {
            return void 0;
          },
          esTexto: function esTexto() {
            return void 0;
          },
          variables: _this9.props.variables,
          camposDeVariables: _this9.props.camposDeVariables,
          indicadores: _this9.props.indicadores,
          camposDeIndicadores: _this9.props.camposDeIndicadores,
          riesgos: _this9.props.riesgos,
          camposDeRiesgos: _this9.props.camposDeRiesgos,
          retornoSeleccionVariable: _this9.retornoSeleccionEjeXUpdate
        })))), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          className: "col-form-label"
        }, "Variables eje Y")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("div", {
          style: {
            width: "100%",
            textAlign: "center"
          }
        }, _react["default"].createElement("h4", {
          className: "pageheader-title"
        }, "Variables Seleccionadas"), _react["default"].createElement("div", {
          style: {
            maxHeight: "25vh",
            width: "100%",
            overflowY: "scroll"
          }
        }, _this9.state.variablesSeleccionadasSeccionesDashboardUpdate[i] != undefined ? _react["default"].createElement("div", null, _this9.state.variablesSeleccionadasSeccionesDashboardUpdate[i].map(function (variableSeleccionada, i) {
          return _react["default"].createElement("div", {
            key: variableSeleccionada.valor + i,
            className: "border",
            style: {
              height: "33%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }
          }, variableSeleccionada.valor, _react["default"].createElement("span", null, " ", _react["default"].createElement("img", {
            className: "addPointer",
            onClick: function onClick() {
              return _this9.deleteVariableSeleccionadasSeccionesDashboardUpdate(i);
            },
            src: "../assets/trash.png",
            style: {
              height: "20px",
              width: "20px",
              display: "block",
              "float": "right"
            }
          }), " "));
        })) : "")))), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-group"
        }, _react["default"].createElement("div", {
          className: "font-18 addPointer abrirModalCrearCondicionOnHover border",
          onClick: function onClick(e) {
            return _this9.showCampoModalEjeYUpdate(e, i);
          },
          style: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("h5", null, "Seleccionar Variables Eje Y")), _react["default"].createElement(_Modal["default"], {
          show: _this9.state.showModalCampoEjeYUpdate,
          titulo: "Seleccionar Variables Eje Y",
          onClose: _this9.closeCampoModalEjeYUpdate
        }, _react["default"].createElement(_CampoDashboard["default"], {
          esNumero: function esNumero() {
            return void 0;
          },
          esBoolean: function esBoolean() {
            return void 0;
          },
          esFecha: function esFecha() {
            return void 0;
          },
          esTexto: function esTexto() {
            return void 0;
          },
          variables: _this9.props.variables,
          camposDeVariables: _this9.props.camposDeVariables,
          indicadores: _this9.props.indicadores,
          camposDeIndicadores: _this9.props.camposDeIndicadores,
          riesgos: _this9.props.riesgos,
          camposDeRiesgos: _this9.props.camposDeRiesgos,
          retornoSeleccionVariable: _this9.retornoSeleccionEjeYUpdate
        }))))) : null, _this9.state.tipoGraficoUpdate[i] != undefined && _this9.state.tipoGraficoUpdate[i].localeCompare("PIE") == 0 ? _react["default"].createElement("div", {
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          className: "col-form-label"
        }, "Variables")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("div", {
          style: {
            width: "100%",
            textAlign: "center"
          }
        }, _react["default"].createElement("h4", {
          className: "pageheader-title"
        }, "Variables Seleccionadas"), _react["default"].createElement("div", {
          style: {
            maxHeight: "25vh",
            width: "100%",
            overflowY: "scroll"
          }
        }, _this9.state.variablesSeleccionadasSeccionesDashboardUpdate[i] != undefined ? _react["default"].createElement("div", null, _this9.state.variablesSeleccionadasSeccionesDashboardUpdate[i].map(function (variableSeleccionada, i) {
          return _react["default"].createElement("div", {
            key: variableSeleccionada.valor + i,
            className: "border",
            style: {
              height: "33%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }
          }, variableSeleccionada.valor, _react["default"].createElement("span", null, " ", _react["default"].createElement("img", {
            className: "addPointer",
            onClick: function onClick() {
              return _this9.deleteVariableSeleccionadasSeccionesDashboardUpdate(i);
            },
            src: "../assets/trash.png",
            style: {
              height: "20px",
              width: "20px",
              display: "block",
              "float": "right"
            }
          }), " "));
        })) : null)))), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-group"
        }, _react["default"].createElement("div", {
          className: "font-18 addPointer abrirModalCrearCondicionOnHover border",
          onClick: function onClick(e) {
            return _this9.showCampoModalEjeYUpdate(e, i);
          },
          style: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("h5", null, "Seleccionar Variables Eje Y")), _react["default"].createElement(_Modal["default"], {
          show: _this9.state.showModalCampoEjeYUpdate,
          titulo: "Seleccionar Variables Eje Y",
          onClose: _this9.closeCampoModalEjeYUpdate
        }, _react["default"].createElement(_CampoDashboard["default"], {
          esNumero: function esNumero() {
            return void 0;
          },
          esBoolean: function esBoolean() {
            return void 0;
          },
          esFecha: function esFecha() {
            return void 0;
          },
          esTexto: function esTexto() {
            return void 0;
          },
          variables: _this9.props.variables,
          camposDeVariables: _this9.props.camposDeVariables,
          indicadores: _this9.props.indicadores,
          camposDeIndicadores: _this9.props.camposDeIndicadores,
          riesgos: _this9.props.riesgos,
          camposDeRiesgos: _this9.props.camposDeRiesgos,
          retornoSeleccionVariable: _this9.retornoSeleccionEjeYUpdate
        }))))) : null) : _react["default"].createElement("div", {
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          className: "col-form-label"
        }, "Variables")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("div", {
          style: {
            width: "50%",
            textAlign: "center",
            display: "inline-block"
          }
        }, _react["default"].createElement("h5", {
          className: "pageheader-title"
        }, "Variables Seleccionadas"), _react["default"].createElement("div", {
          style: {
            height: "25vh",
            width: "100%",
            overflowY: "scroll"
          }
        }, _this9.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[i] != undefined ? _react["default"].createElement("div", {
          style: {
            height: "100%"
          }
        }, _this9.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[i].map(function (variableSeleccionada, j) {
          return _react["default"].createElement("div", {
            key: variableSeleccionada.valor + i + "" + j,
            className: "addPointer border",
            onClick: function onClick() {
              return _this9.deseleccionVarTableUpdate(j, i);
            },
            style: {
              height: "33%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }
          }, variableSeleccionada.valor);
        })) : null)), _react["default"].createElement("div", {
          style: {
            width: "50%",
            textAlign: "center",
            display: "inline-block"
          }
        }, _react["default"].createElement("h5", {
          className: "pageheader-title"
        }, "Variables Disponibles"), _react["default"].createElement("div", {
          style: {
            height: "25vh",
            width: "100%",
            overflowY: "scroll"
          }
        }, _this9.state.variablesDisponiblesSeccionesDashboardTablaUpdate[i] != undefined ? _react["default"].createElement("div", {
          style: {
            height: "100%"
          }
        }, _this9.state.variablesDisponiblesSeccionesDashboardTablaUpdate[i].map(function (variableSeleccionada, j) {
          return _react["default"].createElement("div", {
            key: variableSeleccionada.valor + i + "" + j,
            className: "addPointer border",
            onClick: function onClick() {
              return _this9.seleccionVarTableNuevoUpdate(j, i);
            },
            style: {
              height: "33%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }
          }, variableSeleccionada.valor);
        })) : null))))), _react["default"].createElement("div", {
          className: "text-center",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-success active",
          onClick: function onClick() {
            return _this9.modificarSeccionDashboard(i);
          }
        }, "Modificar Secci\xF3n"), _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-danger active",
          onClick: function onClick() {
            return _this9.eliminarSeccionDashboard(i);
          },
          style: {
            marginLeft: "10px"
          }
        }, "Eliminar Secci\xF3n")), _react["default"].createElement("br", null));
      }), _react["default"].createElement("br", null), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("a", {
        className: "btn btn-success btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: this.modificarDashboard
      }, "Modificar"), _react["default"].createElement("a", {
        className: "btn btn-danger btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: this.eliminarDashboard
      }, "Eliminar")), _react["default"].createElement("br", null)))))));
    }
  }]);

  return EditarDashboard;
}(_react["default"].Component);

exports["default"] = EditarDashboard;
//# sourceMappingURL=EditarDashboard.js.map
