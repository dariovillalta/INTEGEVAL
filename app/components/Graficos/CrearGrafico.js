"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _reactInputSlider = _interopRequireDefault(require("react-input-slider"));

var _Modal = _interopRequireDefault(require("../Modal/Modal.js"));

var _CampoDashboard = _interopRequireDefault(require("../Dashboards/CampoDashboard.js"));

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

var CrearGrafico =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CrearGrafico, _React$Component);

  function CrearGrafico(props) {
    var _this;

    _classCallCheck(this, CrearGrafico);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CrearGrafico).call(this, props));
    _this.state = {
      seccionesGraficos: [],
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
    _this.modificarSeccionDashboard = _this.modificarSeccionDashboard.bind(_assertThisInitialized(_this));
    _this.eliminarSeccionDashboard = _this.eliminarSeccionDashboard.bind(_assertThisInitialized(_this));
    _this.crearArreglosDeInstruccionesUpdate = _this.crearArreglosDeInstruccionesUpdate.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CrearGrafico, [{
    key: "guardarSeccionesDashboard",
    value: function guardarSeccionesDashboard(dashboard) {
      var _this2 = this;

      var _loop = function _loop() {
        var tamano = _this2.state.seccionesDashboard[i].tamano;
        var tipoObjeto = _this2.state.seccionesDashboard[i].tipoObjeto;
        var instruccion = _this2.state.seccionesDashboard[i].instruccion;
        var index = i;
        var transaction = new _mssql["default"].Transaction(_this2.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("insert into SeccionDashboard (dashboardID, tamano, tipoObjeto, instruccion) values(" + dashboard.ID + ", '" + tamano + "', '" + tipoObjeto + "', '" + instruccion + "') ", function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                if (i == _this2.state.seccionesDashboard.length) {
                  _this2.props.terminoCrearDashboardPasarAEdit();
                }
              });
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
      var instruccion = ''; //EJEMPLO: GRAFICA=>AREA[EJEX={esVariable: true, variableID: 1}\/EJEX={esVariable: true, esTabla: false, ^ variableID: 1}<>{esVariable: true, ^ variableID: 1}]

      instruccion += 'GRAFICA=>';

      if (this.state.tipoGraficoNuevo.length > 0) {
        instruccion += this.state.tipoGraficoNuevo + "[";

        if (this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0) {
          //EJEY
          instruccion += "EJEX={";
          console.log('this.state.objetoEjeXNuevo');
          console.log(this.state.objetoEjeXNuevo);

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
          console.log('this.state.variablesSeleccionadasSeccionesDashboardNueva');
          console.log(this.state.variablesSeleccionadasSeccionesDashboardNueva);

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
      } //viendo si creo variables


      if ((this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0) && this.state.objetoEjeXNuevo != undefined && this.state.objetoEjeXNuevo.valor != undefined && this.state.variablesSeleccionadasSeccionesDashboardNueva.length > 0 || this.state.tipoGraficoNuevo.localeCompare("PIE") == 0 && this.state.variablesSeleccionadasSeccionesDashboardNueva.length > 0 || tipoObjeto.localeCompare("tabla") == 0 && this.state.variablesSeleccionadasSeccionesDashboardTablaNueva.length > 0) {
        var seccionesGraficos = _toConsumableArray(this.state.seccionesGraficos);

        seccionesGraficos.push({
          instruccion: instruccion
        });
        this.setState({
          seccionesGraficos: seccionesGraficos
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
      var tipoGraficoUpdate = [],
          displayGraphicsUpdate = [],
          indiceGraphSelectUpdate = [],
          objetoEjeXUpdate = [];
      var variablesSeleccionadasSeccionesDashboardUpdate = [],
          variablesSeleccionadasSeccionesDashboardTablaUpdate = [],
          variablesDisponiblesSeccionesDashboardTablaUpdate = [];

      for (var i = 0; i < this.state.seccionesGraficos.length; i++) {
        if (this.state.seccionesGraficos[i].instruccion.indexOf("GRAFICA") == 0) {
          var cadenaValores = this.state.seccionesGraficos[i].instruccion.split("=>")[1];
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
            console.log('arregloObjetoX');
            console.log(arregloObjetoX);
            console.log('objetoXCadena');
            console.log(objetoXCadena);
            eval("objetoEjeXUpdate[i] = {" + objetoXCadena + "}");
            objetoEjeXUpdate[i].nombre = ''; //this.getObject(objetoEjeXUpdate, i, objetoEjeXUpdate[i], "objetoEjeXUpdate");

            var arregloObjetosY = cadenaValores.split("\\/")[1];
            var arregloValores = arregloObjetosY.split("<>");
            if (variablesDisponiblesSeccionesDashboardTablaUpdate[i] == undefined) variablesDisponiblesSeccionesDashboardTablaUpdate[i] = [];
            variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.variables.concat(this.props.indicadores, this.props.riesgos);
            if (variablesSeleccionadasSeccionesDashboardUpdate[i] == undefined) variablesSeleccionadasSeccionesDashboardUpdate[i] = [];

            for (var j = 0; j < arregloValores.length; j++) {
              var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{") + 1, arregloValores[j].lastIndexOf("}"));
              console.log('objeto');
              console.log(objeto);
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
              console.log('objeto');
              console.log(objeto);
              eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({" + objeto + "})");
              variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = ''; //this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
            }

            ;
          }
        }
      }

      ;
      console.log('tipoGraficoUpdate');
      console.log(tipoGraficoUpdate);
      console.log('displayGraphicsUpdate');
      console.log(displayGraphicsUpdate);
      console.log('indiceGraphSelectUpdate');
      console.log(indiceGraphSelectUpdate);
      console.log('objetoEjeXUpdate');
      console.log(objetoEjeXUpdate);
      console.log('variablesSeleccionadasSeccionesDashboardUpdate');
      console.log(variablesSeleccionadasSeccionesDashboardUpdate);
      this.setState({
        tipoGraficoUpdate: tipoGraficoUpdate,
        objetoEjeXUpdate: objetoEjeXUpdate,
        variablesSeleccionadasSeccionesDashboardUpdate: variablesSeleccionadasSeccionesDashboardUpdate,
        displayGraphicsUpdate: displayGraphicsUpdate,
        indiceGraphSelectUpdate: indiceGraphSelectUpdate
      });
    }
  }, {
    key: "getObject",
    value: function getObject(arreglo, indiceSec, objeto, arregloNombre, indice) {
      var _this3 = this;

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
                _this3.setState({
                  objetoEjeXUpdate: arreglo
                });
              } else if (arregloNombre.localeCompare("variablesSeleccionadasSeccionesDashboardUpdate") == 0) {
                for (var i = 0; i < arreglo.length; i++) {
                  arreglo[i].valor = arreglo[i].nombre;
                }

                ;

                _this3.setState({
                  variablesSeleccionadasSeccionesDashboardUpdate: arreglo
                });
              } else if (arregloNombre.localeCompare("variablesSeleccionadasSeccionesDashboardTablaUpdate") == 0) {
                var arrOrig = _this3.props.variables.concat(_this3.props.indicadores, _this3.props.riesgos);

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

                var copyTemp = _toConsumableArray(_this3.state.variablesDisponiblesSeccionesDashboardTablaUpdate);

                copyTemp[indiceSec] = arrOrig;

                _this3.setState({
                  variablesSeleccionadasSeccionesDashboardTablaUpdate: arreglo,
                  variablesDisponiblesSeccionesDashboardTablaUpdate: copyTemp
                }, console.log(_this3.state.variablesSeleccionadasSeccionesDashboardTablaUpdate));

                var self = _this3.state;
                setTimeout(function () {
                  console.log(self.variablesSeleccionadasSeccionesDashboardTablaUpdate);
                }, 1000);
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
      console.log("CALLED");

      var copyTemp = _toConsumableArray(this.state.displayGraphicsUpdate);

      console.log(copyTemp);

      for (var i = 0; i < copyTemp.length; i++) {
        copyTemp[i] = false;
      }

      ;
      console.log(copyTemp);
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
      }, console.log(this.state.variablesSeleccionadasSeccionesDashboardNueva));
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

      console.log("YEE");

      var copyDisplayGraphicsUpdate = _toConsumableArray(this.state.displayGraphicsUpdate);

      copyDisplayGraphicsUpdate[index] = !copyDisplayGraphicsUpdate[index];
      this.setState({
        displayGraphicsUpdate: copyDisplayGraphicsUpdate
      });
    }
  }, {
    key: "cerrarDivGraficosUpdate",
    value: function cerrarDivGraficosUpdate(index) {
      console.log("CALLED");

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
    key: "modificarSeccionDashboard",
    value: function modificarSeccionDashboard(index) {
      //viendo si creo variables
      if ((this.state.tipoGraficoUpdate[index].localeCompare("LINEA") == 0 || this.state.tipoGraficoUpdate[index].localeCompare("AREA") == 0 || this.state.tipoGraficoUpdate[index].localeCompare("BARRA") == 0 || this.state.tipoGraficoUpdate[index].localeCompare("DISPERSION") == 0) && this.state.objetoEjeXUpdate[index] != undefined && this.state.objetoEjeXUpdate[index].valor != undefined && this.state.variablesSeleccionadasSeccionesDashboardUpdate[index] != undefined && this.state.variablesSeleccionadasSeccionesDashboardUpdate[index].length > 0 || tipoObjetoUpdate[index].localeCompare("tabla") == 0 && this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index].length > 0) {
        var instruccion = ''; //EJEMPLO: GRAFICA=>AREA[EJEY={esVariable: true, variableID: 1}\/EJEX={esVariable: true, esTabla: false, ^ variableID: 1}<>{esVariable: true, ^ variableID: 1}]

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

        var seccionesDashboard = _toConsumableArray(this.state.seccionesDashboard);

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
        }
      }
    }
  }, {
    key: "eliminarSeccionDashboard",
    value: function eliminarSeccionDashboard(index) {
      console.log("index = " + index);

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
      var tipoGraficoUpdate = [],
          displayGraphicsUpdate = [],
          indiceGraphSelectUpdate = [],
          objetoEjeXUpdate = [];
      var variablesSeleccionadasSeccionesDashboardUpdate = [],
          variablesSeleccionadasSeccionesDashboardTablaUpdate = [],
          variablesDisponiblesSeccionesDashboardTablaUpdate = [];

      for (var i = 0; i < this.state.seccionesGraficos.length; i++) {
        if (this.state.seccionesGraficos[i].instruccion.indexOf("GRAFICA") == 0) {
          var cadenaValores = this.state.seccionesGraficos[i].instruccion.split("=>")[1];
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
        }
      }

      ;
      console.log('tipoGraficoUpdate');
      console.log(tipoGraficoUpdate);
      console.log('displayGraphicsUpdate');
      console.log(displayGraphicsUpdate);
      console.log('indiceGraphSelectUpdate');
      console.log(indiceGraphSelectUpdate);
      console.log('objetoEjeXUpdate');
      console.log(objetoEjeXUpdate);
      console.log('variablesSeleccionadasSeccionesDashboardUpdate');
      console.log(variablesSeleccionadasSeccionesDashboardUpdate);
      this.setState({
        tipoGraficoUpdate: tipoGraficoUpdate,
        displayGraphicsUpdate: displayGraphicsUpdate,
        indiceGraphSelectUpdate: indiceGraphSelectUpdate
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return _react["default"].createElement("div", {
        onClick: function onClick() {
          return _this4.cerrarDivGraficos();
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
        onClick: this.props.goSeleccionReporteria
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Seleccionar Tipo de Reporter\xEDa")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Configurar Gr\xE1fico"))))))), _react["default"].createElement("div", {
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
          return _this4.mostrarDivGraficos(e);
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
          return _this4.seleccionGrafico(e, "LINEA", 0);
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
          return _this4.seleccionGrafico(e, "AREA", 1);
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
          return _this4.seleccionGrafico(e, "BARRA", 2);
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
          return _this4.seleccionGrafico(e, "DISPERSION", 3);
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
          return _this4.seleccionGrafico(e, "PIE", 4);
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
          return _this4.showCampoModalEjeX(e);
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
            return _this4.deleteVariableSeleccionadasSeccionesDashboardNueva(i);
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
          return _this4.showCampoModalEjeY(e);
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
            return _this4.deleteVariableSeleccionadasSeccionesDashboardNueva(i);
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
          return _this4.showCampoModalEjeY(e);
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
      }))))) : null), _react["default"].createElement("br", null), _react["default"].createElement("div", {
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
      }, "Crear Gr\xE1fico")), _react["default"].createElement("br", null), this.state.seccionesGraficos.map(function (seccionDashboard, i) {
        return _react["default"].createElement("div", {
          key: seccionDashboard.tamano + i,
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
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
            return _this4.mostrarDivGraficosUpdate(e, i);
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
        }, _this4.state.tipoGraficoUpdate[i] == undefined || _this4.state.tipoGraficoUpdate[i].length == 0 ? _react["default"].createElement("div", {
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
        }, _react["default"].createElement("span", null, _this4.state.tipoGraficoUpdate[i])))), _react["default"].createElement("div", {
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
            display: _this4.state.displayGraphicsUpdate[i] ? "block" : "none"
          }
        }, _react["default"].createElement("div", {
          className: "addPointer border-right" + (_this4.state.indiceGraphSelectUpdate[i] == 0 ? " graficoSeleccionadoHighlight" : ""),
          style: {
            height: "100%",
            width: "90%",
            display: "inline-block"
          },
          onClick: function onClick(e) {
            return _this4.seleccionGraficoUpdate(e, "LINEA", 0, i);
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
          className: "addPointer border-right" + (_this4.state.indiceGraphSelectUpdate[i] == 1 ? " graficoSeleccionadoHighlight" : ""),
          style: {
            height: "100%",
            width: "90%",
            display: "inline-block"
          },
          onClick: function onClick(e) {
            return _this4.seleccionGraficoUpdate(e, "AREA", 1, i);
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
          className: "addPointer border-right" + (_this4.state.indiceGraphSelectUpdate[i] == 2 ? " graficoSeleccionadoHighlight" : ""),
          style: {
            height: "100%",
            width: "90%",
            display: "inline-block"
          },
          onClick: function onClick(e) {
            return _this4.seleccionGraficoUpdate(e, "BARRA", 2, i);
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
          className: "addPointer border-right" + (_this4.state.indiceGraphSelectUpdate[i] == 3 ? " graficoSeleccionadoHighlight" : ""),
          style: {
            height: "100%",
            width: "90%",
            display: "inline-block"
          },
          onClick: function onClick(e) {
            return _this4.seleccionGraficoUpdate(e, "DISPERSION", 3, i);
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
          className: "addPointer" + (_this4.state.indiceGraphSelectUpdate[i] == 4 ? " graficoSeleccionadoHighlight" : ""),
          style: {
            height: "100%",
            width: "90%",
            display: "inline-block"
          },
          onClick: function onClick(e) {
            return _this4.seleccionGraficoUpdate(e, "PIE", 4, i);
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
        })))))), _this4.state.tipoGraficoUpdate[i] != undefined && _this4.state.tipoGraficoUpdate[i].localeCompare("LINEA") == 0 || _this4.state.tipoGraficoUpdate[i] != undefined && _this4.state.tipoGraficoUpdate[i].localeCompare("AREA") == 0 || _this4.state.tipoGraficoUpdate[i] != undefined && _this4.state.tipoGraficoUpdate[i].localeCompare("BARRA") == 0 || _this4.state.tipoGraficoUpdate[i] != undefined && _this4.state.tipoGraficoUpdate[i].localeCompare("DISPERSION") == 0 ? _react["default"].createElement("div", {
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
        }, _this4.state.objetoEjeXUpdate[i] != undefined && _this4.state.objetoEjeXUpdate[i].valor != undefined ? _this4.state.objetoEjeXUpdate[i].valor : "")), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-group"
        }, _react["default"].createElement("div", {
          className: "addPointer abrirModalCrearCondicionOnHover border",
          onClick: function onClick(e) {
            return _this4.showCampoModalEjeXUpdate(e, i);
          },
          style: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("h5", null, "Seleccionar Variable Eje X")), _react["default"].createElement(_Modal["default"], {
          show: _this4.state.showModalCampoEjeXUpdate,
          titulo: "Seleccionar Variable Eje X",
          onClose: _this4.closeCampoModalEjeXUpdate
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
          variables: _this4.props.variables,
          camposDeVariables: _this4.props.camposDeVariables,
          indicadores: _this4.props.indicadores,
          camposDeIndicadores: _this4.props.camposDeIndicadores,
          riesgos: _this4.props.riesgos,
          camposDeRiesgos: _this4.props.camposDeRiesgos,
          retornoSeleccionVariable: _this4.retornoSeleccionEjeXUpdate
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
        }, _this4.state.variablesSeleccionadasSeccionesDashboardUpdate[i] != undefined ? _react["default"].createElement("div", null, _this4.state.variablesSeleccionadasSeccionesDashboardUpdate[i].map(function (variableSeleccionada, i) {
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
              return _this4.deleteVariableSeleccionadasSeccionesDashboardUpdate(i);
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
            return _this4.showCampoModalEjeYUpdate(e, i);
          },
          style: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("h5", null, "Seleccionar Variables Eje Y")), _react["default"].createElement(_Modal["default"], {
          show: _this4.state.showModalCampoEjeYUpdate,
          titulo: "Seleccionar Variables Eje Y",
          onClose: _this4.closeCampoModalEjeYUpdate
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
          variables: _this4.props.variables,
          camposDeVariables: _this4.props.camposDeVariables,
          indicadores: _this4.props.indicadores,
          camposDeIndicadores: _this4.props.camposDeIndicadores,
          riesgos: _this4.props.riesgos,
          camposDeRiesgos: _this4.props.camposDeRiesgos,
          retornoSeleccionVariable: _this4.retornoSeleccionEjeYUpdate
        }))))) : null, _this4.state.tipoGraficoUpdate[i] != undefined && _this4.state.tipoGraficoUpdate[i].localeCompare("PIE") == 0 ? _react["default"].createElement("div", {
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
        }, _this4.state.variablesSeleccionadasSeccionesDashboardUpdate[i] != undefined ? _react["default"].createElement("div", null, _this4.state.variablesSeleccionadasSeccionesDashboardUpdate[i].map(function (variableSeleccionada, i) {
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
              return _this4.deleteVariableSeleccionadasSeccionesDashboardUpdate(i);
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
            return _this4.showCampoModalEjeYUpdate(e, i);
          },
          style: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("h5", null, "Seleccionar Variables Eje Y")), _react["default"].createElement(_Modal["default"], {
          show: _this4.state.showModalCampoEjeYUpdate,
          titulo: "Seleccionar Variables Eje Y",
          onClose: _this4.closeCampoModalEjeYUpdate
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
          variables: _this4.props.variables,
          camposDeVariables: _this4.props.camposDeVariables,
          indicadores: _this4.props.indicadores,
          camposDeIndicadores: _this4.props.camposDeIndicadores,
          riesgos: _this4.props.riesgos,
          camposDeRiesgos: _this4.props.camposDeRiesgos,
          retornoSeleccionVariable: _this4.retornoSeleccionEjeYUpdate
        }))))) : null), _react["default"].createElement("div", {
          className: "text-center",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-success active",
          onClick: function onClick() {
            return _this4.modificarSeccionDashboard(i);
          }
        }, "Modificar Secci\xF3n"), _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-danger active",
          onClick: function onClick() {
            return _this4.eliminarSeccionDashboard(i);
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
        onClick: function onClick() {
          return _this4.props.verGrafico(_this4.state.seccionesGraficos);
        }
      }, "Ver")), _react["default"].createElement("br", null)))))));
    }
  }]);

  return CrearGrafico;
}(_react["default"].Component);

exports["default"] = CrearGrafico;
//# sourceMappingURL=CrearGrafico.js.map
