"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _xlsxStyle = _interopRequireDefault(require("xlsx-style"));

var _mathjs = require("mathjs");

var _FuenteDatoVariableAtributos = _interopRequireDefault(require("./FuenteDatoVariableAtributos.js"));

var _Modal = _interopRequireDefault(require("../../../Modal/Modal.js"));

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

/*COMPONENTE CONTENEDOR PADRE / ORIGINAL DE PROCESO CREAR VARIABLE ESTILO VARIABLE*/
//var fuenteDatoAtributo = {};

/*var columnaSeleccionada = {}, operacionSeleccionada = {};
const operaciones = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}];
const operacionesNumero = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}, {valor: "Calcular Promedio"}, {valor: "Máximo"}, {valor: "Mínimo"}, {valor: "Sumar"}];
const operacionesFecha = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}];
const operacionesBoolean = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}];
const operacionesCadena = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}, {valor: "Sumar"}];*/
var mostrarEsObjetoGlobal = true;
var mostrarEsColeccionGlobal = true;
var mostrarInstruccionSQLGlobal = true;
var tituloGlobal = "Instrucción SQL";
var valorPeriodicidadGlobal = "-1";
var tipoVariable = '';
var periodicidad = [{
  nombre: "diario"
}, {
  nombre: "semanal"
}, {
  nombre: "mensual"
}, {
  nombre: "trimestral"
}, {
  nombre: "bi-anual"
}, {
  nombre: "anual"
}];
/*
    **************************************
    **************************************
                VARIABLES CALCULO 
    **************************************
    **************************************
*/

var nivelMaximoVariables = 0;
var arregloDeFuentesDeDatos = []; //Arreglo con las fuentes de datos
//objeto: {tablaID, nombre, descripcion, esObjeto, objetoPadreID, guardar, nivel, [arreglo de atributos]}
//objeto arreglo de atributos: {nombre, tipo, formula}

window.arregloDeVariables = []; //Arreglo con las variables

window.arregloDeErroresVariables = []; //objeto: {nombre, descripcion, esObjeto, objetoPadreID, guardar, nivel, [arreglo de atributos]}
//objeto arreglo de atributos: {nombre, tipo, formula}

window.arregloConexionesATablas = []; //Arreglo con los valores para poder conectarse a las tablas

window.arregloResultadosDeTablas = []; //Arreglo con los valores obtenidos despues de conectarse a las tablas

var banderaImportacionCamposVariablesINICIO = 0; //Bandera para saber si termino de importar los campos de las variables

var banderaImportacionCamposVariablesFIN = 0; //Bandera para saber si termino de importar los campos de las variables

var banderaImportacionSegmentosCamposVariablesINICIO = 0; //Bandera para saber si termino de importar los segmentos de reglas de los campos de las variables

var banderaImportacionSegmentosCamposVariablesFIN = 0; //Bandera para saber si termino de importar los segmentos de reglas de los campos de las variables

var banderaImportacionReglasSegmentosCamposVariablesINICIO = 0; //Bandera para saber si termino de importar las reglas de los segmentos de los campos de las variables

var banderaImportacionReglasSegmentosCamposVariablesFIN = 0; //Bandera para saber si termino de importar las reglas de los segmentos de los campos de las variables

var banderaImportacionFormulasCamposVariablesINICIO = 0; //Bandera para saber si termino de importar las formulas de los campos de las variables

var banderaImportacionFormulasCamposVariablesFIN = 0; //Bandera para saber si termino de importar las formulas de los campos de las variables

var banderaImportacionElementosFormulasCamposVariablesINICIO = 0; //Bandera para saber si termino de importar los elementos de las formulas de los campos de las variables

var banderaImportacionElementosFormulasCamposVariablesFIN = 0; //Bandera para saber si termino de importar los elementos de las formulas de los campos de las variables

var banderaImportacionConecionesATablasINICIO = 0; //Bandera para saber si termino de importar los valores para poder conetarse a las tablas

var banderaImportacionConecionesATablasFIN = 0; //Bandera para saber si termino de importar los valores para poder conetarse a las tablas

var banderaImportacionValoresDeTablasDeFuenteDeDatosINICIO = 0; //Bandera para saber si termino de importar los valores de las tablas de fuentes de datos

var banderaImportacionValoresDeTablasDeFuenteDeDatosFIN = 0; //Bandera para saber si termino de importar los valores de las tablas de fuentes de datos

window.arregloDeExcel = []; //Arreglo de variables de excel

window.arregloDeErroresExcel = []; //objeto: {nombre, descripcion, esObjeto, objetoPadreID, guardar, nivel, [arreglo de atributos]}
//objeto arreglo de atributos: {nombre, tipo, formula}

var banderaImportacionVariablesExcelINICIO = 0; //Bandera para saber si termino de importar variables excel

var banderaImportacionVariablesExcelFIN = 0; //Bandera para saber si termino de importar variables excel

window.arregloDeFormas = []; //Arreglo con las variables de formas

window.arregloDeErroresFormas = [];
window.arregloHTMLFormas = []; //Arreglo que contiene el codigo html de las formas

var banderaVerificarPeriodicidadINICIO = 0; //Bandera para saber si termino de verificar periodicidad de todo tipo de variable(excel, forma y variable)

var banderaVerificarPeriodicidadFIN = 0; //Bandera para saber si termino de verificar periodicidad de todo tipo de variable(excel, forma y variable)

var banderaImportarValoresPeriodicidadINICIO = 0; //Bandera para saber si termino de verificar periodicidad de todo tipo de variable(excel, forma y variable)

var banderaImportarValoresPeriodicidadFIN = 0; //Bandera para saber si termino de verificar periodicidad de todo tipo de variable(excel, forma y variable)

/*
    **************************************
    **************************************
            VARIABLES CALCULO FIN
    **************************************
    **************************************
*/

var FuenteDatoVariable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FuenteDatoVariable, _React$Component);

  function FuenteDatoVariable(props) {
    var _this;

    _classCallCheck(this, FuenteDatoVariable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FuenteDatoVariable).call(this, props));
    _this.state = {
      mostrarEsObjeto: mostrarEsObjetoGlobal,
      mostrarEsColeccion: mostrarEsColeccionGlobal,
      titulo: tituloGlobal,
      mostrarInstruccionSQL: mostrarInstruccionSQLGlobal,
      valorPeriodicidad: valorPeriodicidadGlobal,
      tipoVariable: tipoVariable,
      usuarios: []
    };
    _this.saveBitacora = _this.saveBitacora.bind(_assertThisInitialized(_this));
    _this.cambioInstruccionSQL = _this.cambioInstruccionSQL.bind(_assertThisInitialized(_this));
    _this.cambioAColeccion = _this.cambioAColeccion.bind(_assertThisInitialized(_this));
    _this.cambioAObjeto = _this.cambioAObjeto.bind(_assertThisInitialized(_this));
    _this.cambiarTitulo = _this.cambiarTitulo.bind(_assertThisInitialized(_this));
    _this.actualizarPeriodicidad = _this.actualizarPeriodicidad.bind(_assertThisInitialized(_this));
    _this.cargarDatePicker = _this.cargarDatePicker.bind(_assertThisInitialized(_this));
    _this.traerArchivosExcel = _this.traerArchivosExcel.bind(_assertThisInitialized(_this));
    _this.traerVariablesExcel = _this.traerVariablesExcel.bind(_assertThisInitialized(_this));
    _this.revisarFinImportacionVariablesExcel = _this.revisarFinImportacionVariablesExcel.bind(_assertThisInitialized(_this));
    _this.traerFormas = _this.traerFormas.bind(_assertThisInitialized(_this));
    _this.getNivelMaximoVariables = _this.getNivelMaximoVariables.bind(_assertThisInitialized(_this));
    _this.traerVariables = _this.traerVariables.bind(_assertThisInitialized(_this));
    _this.traerInstruccionSQLCampos = _this.traerInstruccionSQLCampos.bind(_assertThisInitialized(_this));
    _this.traerInstruccionSQL = _this.traerInstruccionSQL.bind(_assertThisInitialized(_this));
    _this.traerAtributosVariables = _this.traerAtributosVariables.bind(_assertThisInitialized(_this));
    _this.revisarFinImportacionCamposVariables = _this.revisarFinImportacionCamposVariables.bind(_assertThisInitialized(_this));
    _this.inicioTraerSegmentosDeCamposVariables = _this.inicioTraerSegmentosDeCamposVariables.bind(_assertThisInitialized(_this));
    _this.traerSegmentosDeCamposVariables = _this.traerSegmentosDeCamposVariables.bind(_assertThisInitialized(_this));
    _this.revisarFinImportacionSegmentosCamposVariables = _this.revisarFinImportacionSegmentosCamposVariables.bind(_assertThisInitialized(_this));
    _this.inicioTraerReglasDeSegmentosVariables = _this.inicioTraerReglasDeSegmentosVariables.bind(_assertThisInitialized(_this));
    _this.traerReglasDeSegmentosVariables = _this.traerReglasDeSegmentosVariables.bind(_assertThisInitialized(_this));
    _this.revisarFinImportacionReglasSegmentosVariables = _this.revisarFinImportacionReglasSegmentosVariables.bind(_assertThisInitialized(_this));
    _this.inicioTraerFormulasDeCamposVariables = _this.inicioTraerFormulasDeCamposVariables.bind(_assertThisInitialized(_this));
    _this.traerFormulasDeCamposVariables = _this.traerFormulasDeCamposVariables.bind(_assertThisInitialized(_this));
    _this.revisarFinImportacionFormulasCamposVariables = _this.revisarFinImportacionFormulasCamposVariables.bind(_assertThisInitialized(_this));
    _this.inicioTraerElementosFormulasDeCamposVariables = _this.inicioTraerElementosFormulasDeCamposVariables.bind(_assertThisInitialized(_this));
    _this.traerElementosFormulasDeCamposVariables = _this.traerElementosFormulasDeCamposVariables.bind(_assertThisInitialized(_this));
    _this.revisarFinImportacionElementosFormulasCamposVariables = _this.revisarFinImportacionElementosFormulasCamposVariables.bind(_assertThisInitialized(_this));
    _this.inicioTraerConeccionesATablas = _this.inicioTraerConeccionesATablas.bind(_assertThisInitialized(_this));
    _this.noHaSidoImportadaConeccion = _this.noHaSidoImportadaConeccion.bind(_assertThisInitialized(_this));
    _this.traerConeccionesATablas = _this.traerConeccionesATablas.bind(_assertThisInitialized(_this));
    _this.finTraerConeccionesATablas = _this.finTraerConeccionesATablas.bind(_assertThisInitialized(_this));
    _this.inicioTraerResultadosDeFuenteDeDatos = _this.inicioTraerResultadosDeFuenteDeDatos.bind(_assertThisInitialized(_this));
    _this.traerResultadosDeFuenteDeDatos = _this.traerResultadosDeFuenteDeDatos.bind(_assertThisInitialized(_this));
    _this.finTraerResultadosDeFuenteDeDatos = _this.finTraerResultadosDeFuenteDeDatos.bind(_assertThisInitialized(_this));
    _this.addDays = _this.addDays.bind(_assertThisInitialized(_this));
    _this.addMonths = _this.addMonths.bind(_assertThisInitialized(_this));
    _this.addYears = _this.addYears.bind(_assertThisInitialized(_this));
    _this.verificarPeriodicidad = _this.verificarPeriodicidad.bind(_assertThisInitialized(_this));
    _this.traerPeriodicidadVariable = _this.traerPeriodicidadVariable.bind(_assertThisInitialized(_this));
    _this.verificarFinPeriodicidad = _this.verificarFinPeriodicidad.bind(_assertThisInitialized(_this));
    _this.iniciarImportacionValoresCalculados = _this.iniciarImportacionValoresCalculados.bind(_assertThisInitialized(_this));
    _this.getResultsVariables = _this.getResultsVariables.bind(_assertThisInitialized(_this));
    _this.getResultsVariablesFieldsInit = _this.getResultsVariablesFieldsInit.bind(_assertThisInitialized(_this));
    _this.getFieldResults = _this.getFieldResults.bind(_assertThisInitialized(_this));
    _this.getResultsIndicators = _this.getResultsIndicators.bind(_assertThisInitialized(_this));
    _this.getResultsIndicatorsFieldsInit = _this.getResultsIndicatorsFieldsInit.bind(_assertThisInitialized(_this));
    _this.getFieldIndicatorsResults = _this.getFieldIndicatorsResults.bind(_assertThisInitialized(_this));
    _this.verificarFinImportacionValoresCalculados = _this.verificarFinImportacionValoresCalculados.bind(_assertThisInitialized(_this));
    _this.codigoIniciacion = _this.codigoIniciacion.bind(_assertThisInitialized(_this));
    _this.iniciacionElementosFormula = _this.iniciacionElementosFormula.bind(_assertThisInitialized(_this));
    _this.iniciacionVariable = _this.iniciacionVariable.bind(_assertThisInitialized(_this));
    _this.iniciacionCampo = _this.iniciacionCampo.bind(_assertThisInitialized(_this));
    _this.crearCodigoFuenteDato = _this.crearCodigoFuenteDato.bind(_assertThisInitialized(_this));
    _this.crearCodigoFuenteDatoSQL = _this.crearCodigoFuenteDatoSQL.bind(_assertThisInitialized(_this));
    _this.crearCodigoSegmentoReglas = _this.crearCodigoSegmentoReglas.bind(_assertThisInitialized(_this));
    _this.crearCodigoSegmentoReglasFormaOExcel = _this.crearCodigoSegmentoReglasFormaOExcel.bind(_assertThisInitialized(_this));
    _this.arregloCodigoRegla = _this.arregloCodigoRegla.bind(_assertThisInitialized(_this));
    _this.arregloCodigoReglaFormaOExcel = _this.arregloCodigoReglaFormaOExcel.bind(_assertThisInitialized(_this));
    _this.agregarCodigoGuardarVariable = _this.agregarCodigoGuardarVariable.bind(_assertThisInitialized(_this));
    _this.crearNivel = _this.crearNivel.bind(_assertThisInitialized(_this));
    _this.isValidDate = _this.isValidDate.bind(_assertThisInitialized(_this));
    _this.existeOperacion = _this.existeOperacion.bind(_assertThisInitialized(_this));
    _this.guardarOperacionSQL = _this.guardarOperacionSQL.bind(_assertThisInitialized(_this));
    _this.crearVariablesExcel = _this.crearVariablesExcel.bind(_assertThisInitialized(_this));
    _this.getArregloPosicionesExcel = _this.getArregloPosicionesExcel.bind(_assertThisInitialized(_this));
    _this.getObjetoLetraNumeroCelda = _this.getObjetoLetraNumeroCelda.bind(_assertThisInitialized(_this));
    _this.esLetra = _this.esLetra.bind(_assertThisInitialized(_this));
    _this.toColumnLetter = _this.toColumnLetter.bind(_assertThisInitialized(_this));
    _this.toColumnNumber = _this.toColumnNumber.bind(_assertThisInitialized(_this));
    _this.formaCrearVariable = _this.formaCrearVariable.bind(_assertThisInitialized(_this));
    _this.iniciarMostrarFormas = _this.iniciarMostrarFormas.bind(_assertThisInitialized(_this));
    _this.updateForm = _this.updateForm.bind(_assertThisInitialized(_this));
    _this.loadFechas = _this.loadFechas.bind(_assertThisInitialized(_this));
    _this.closeModalForma = _this.closeModalForma.bind(_assertThisInitialized(_this));
    _this.iniciarCalculoExcel = _this.iniciarCalculoExcel.bind(_assertThisInitialized(_this));
    _this.iniciarCalculoFormas = _this.iniciarCalculoFormas.bind(_assertThisInitialized(_this));
    _this.iniciarHilo = _this.iniciarHilo.bind(_assertThisInitialized(_this));
    _this.iniciarCalculoIndicadores = _this.iniciarCalculoIndicadores.bind(_assertThisInitialized(_this));
    _this.guardarVariablesCalculadas = _this.guardarVariablesCalculadas.bind(_assertThisInitialized(_this));
    _this.verificarSiExisteVariableEnResultadosHistoricos = _this.verificarSiExisteVariableEnResultadosHistoricos.bind(_assertThisInitialized(_this));
    _this.crearTablaDeResultadoNombreVariable = _this.crearTablaDeResultadoNombreVariable.bind(_assertThisInitialized(_this));
    _this.crearResultadoNombreVariable = _this.crearResultadoNombreVariable.bind(_assertThisInitialized(_this));
    _this.guardarResultadosNombreVariable = _this.guardarResultadosNombreVariable.bind(_assertThisInitialized(_this));
    _this.guardarVariable = _this.guardarVariable.bind(_assertThisInitialized(_this));
    _this.borrarRiesgo = _this.borrarRiesgo.bind(_assertThisInitialized(_this));
    _this.verificarPeriodicidadGuardar = _this.verificarPeriodicidadGuardar.bind(_assertThisInitialized(_this));
    _this.updatePeriodicidad = _this.updatePeriodicidad.bind(_assertThisInitialized(_this));
    _this.guardarPeriodicidad = _this.guardarPeriodicidad.bind(_assertThisInitialized(_this)); //valorPeriodicidadGlobal = this.props.periodicidadVariable;

    _this.verificarExistenciaErroresExcel = _this.verificarExistenciaErroresExcel.bind(_assertThisInitialized(_this));
    _this.verificarExistenciaErroresForma = _this.verificarExistenciaErroresForma.bind(_assertThisInitialized(_this));
    _this.verificarExistenciaErroresVariable = _this.verificarExistenciaErroresVariable.bind(_assertThisInitialized(_this));
    _this.getUsuarios = _this.getUsuarios.bind(_assertThisInitialized(_this));
    _this.goToTimeline = _this.goToTimeline.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FuenteDatoVariable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      $('#fecha').datepicker({
        format: "dd-mm-yyyy",
        todayHighlight: true,
        viewMode: "days",
        minViewMode: "days",
        language: 'es'
      });
      $("#fecha").datepicker("setDate", this.props.fechaInicioVariable);
      var self = this;
      $('#fecha').datepicker().on('changeDate', function () {
        var fecha = $("#fecha").datepicker('getDate');
        self.props.actualizarFechaInicio(fecha);
      });
      setTimeout(function () {
        self.cargarDatePicker();
      }, 600);

      if (this.props.tipoVariableOriginal.localeCompare("variable") == 0 && this.props.esPrimeraVez) {
        var transaction = new _mssql["default"].Transaction(this.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("select * from Variables where ID = " + _this2.props.idVariable, function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                if (result.recordset.length > 0) {
                  var titulo = "Instrucción SQL";

                  if (!result.recordset[0].esInstruccionSQL) {
                    if (result.recordset[0].esObjeto) {
                      titulo = "Variable Compuesta";
                    } else {
                      titulo = "Variable Individual";
                    }
                  }

                  mostrarEsObjetoGlobal = result.recordset[0].esObjeto;
                  mostrarEsColeccionGlobal = result.recordset[0].esColeccion;
                  mostrarInstruccionSQLGlobal = result.recordset[0].esInstruccionSQL;
                  valorPeriodicidadGlobal = result.recordset[0].periodicidad;

                  _this2.setState({
                    titulo: titulo,
                    mostrarEsObjeto: result.recordset[0].esObjeto,
                    mostrarInstruccionSQL: result.recordset[0].esInstruccionSQL,
                    mostrarEsColeccion: result.recordset[0].esColeccion,
                    valorPeriodicidad: result.recordset[0].periodicidad
                  }); //this.props.changeStateFirstTimeToFalse();

                }
              });
            }
          });
        }); // fin transaction
      }

      if (this.props.tipoVariableOriginal.localeCompare("variable") == 0) {
        var _transaction = new _mssql["default"].Transaction(this.props.pool);

        _transaction.begin(function (err) {
          var rolledBack = false;

          _transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });

          var request = new _mssql["default"].Request(_transaction);
          request.query("select * from Variables where ID = " + _this2.props.idVariable, function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                _transaction.rollback(function (err) {});
              }
            } else {
              _transaction.commit(function (err) {
                if (result.recordset.length > 0) {
                  if (!result.recordset[0].esInstruccionSQL) {
                    if (result.recordset[0].esObjeto) {
                      tipoVariable = 'objeto';
                    } else {
                      tipoVariable = 'escalar';
                    }
                  } else {
                    tipoVariable = 'sql';
                  }

                  _this2.setState({
                    tipoVariable: tipoVariable
                  });
                }
              });
            }
          });
        }); // fin transaction

      }

      this.getUsuarios();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      tipoVariable = '';
    }
  }, {
    key: "saveBitacora",
    value: function saveBitacora(fecha, descripcion) {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into Bitacora (usuarioID, nombreUsuario, fecha, descripcion) values (" + _this3.props.userID + ", '" + _this3.props.userName + "', '" + fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + "', '" + descripcion + "')", function (err, result) {
          if (err) {
            console.log(err);

            _this3.props.showMessage("Error", 'No se pudo guardar información de bitacora.', true, false, {});

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {});
          }
        });
      }); // fin transaction
    }
  }, {
    key: "cambioInstruccionSQL",
    value: function cambioInstruccionSQL() {
      mostrarInstruccionSQLGlobal = !this.state.mostrarInstruccionSQL;
      mostrarEsObjetoGlobal = true;
      this.setState({
        mostrarInstruccionSQL: !this.state.mostrarInstruccionSQL,
        mostrarEsObjeto: true
      }, this.cambiarTitulo);
    }
  }, {
    key: "cambioAObjeto",
    value: function cambioAObjeto() {
      mostrarEsObjetoGlobal = !this.state.mostrarEsObjeto;
      this.setState({
        mostrarEsObjeto: !this.state.mostrarEsObjeto,
        tipoVariable: ''
      }, this.cambiarTitulo);
    }
  }, {
    key: "cambioAColeccion",
    value: function cambioAColeccion() {
      mostrarEsColeccionGlobal = !this.state.mostrarEsColeccion;
      this.setState({
        mostrarEsColeccion: !this.state.mostrarEsColeccion
      });
    }
  }, {
    key: "cambiarTitulo",
    value: function cambiarTitulo() {
      this.props.cambioDeArreglosDeAtributos();

      if (this.state.mostrarInstruccionSQL) {
        tituloGlobal = "Instrucción SQL";
        this.setState({
          titulo: "Instrucción SQL"
        });
      } else if (this.state.mostrarEsObjeto) {
        tituloGlobal = "Variable Compuesta";
        this.setState({
          titulo: "Variable Compuesta"
        });
      } else {
        tituloGlobal = "Variable Individual";
        this.setState({
          titulo: "Variable Individual"
        });
      }

      this.props.actualizarEstadoSiEsObjeto(this.state.mostrarEsObjeto);
      this.props.actualizarEstadoSiEsInstruccionSQL(this.state.mostrarInstruccionSQL);
    }
  }, {
    key: "actualizarPeriodicidad",
    value: function actualizarPeriodicidad() {
      var periodicidad = $("#periodicidad").val();
      valorPeriodicidadGlobal = periodicidad;
      this.setState({
        valorPeriodicidad: periodicidad
      }, this.cargarDatePicker);
      this.props.actualizarPeriodicidad();
    }
  }, {
    key: "cargarDatePicker",
    value: function cargarDatePicker() {
      $('#fecha').datepicker({
        format: "dd-mm-yyyy",
        todayHighlight: true,
        viewMode: "days",
        minViewMode: "days",
        language: 'es'
      });
      if (this.props.fechaInicioVariable.toString().length > 0 && this.props.fechaInicioVariable.getFullYear() != 1964 && this.props.fechaInicioVariable.getMonth() != 4 && this.props.fechaInicioVariable.getDate() != 28) $("#fecha").datepicker("setDate", this.props.fechaInicioVariable);
      var self = this;
      $('#fecha').datepicker().on('changeDate', function () {
        var fecha = $("#fecha").datepicker('getDate');
        self.props.actualizarFechaInicio(fecha);
      });
    }
    /*
       **************************************
       **************************************
                   CALCULO CODIGO
       **************************************
       **************************************
    */

  }, {
    key: "traerArchivosExcel",
    value: function traerArchivosExcel() {
      var _this4 = this;

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

            _this4.traerFormas();

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              arregloDeExcel = result.recordset;
              banderaImportacionVariablesExcelINICIO = 0;
              banderaImportacionVariablesExcelFIN = arregloDeExcel.length;

              for (var i = 0; i < arregloDeExcel.length; i++) {
                _this4.traerVariablesExcel(arregloDeExcel[i].ID, i);
              }

              ;

              if (arregloDeExcel.length == 0) {
                alert("No existen variables excel");

                _this4.traerFormas();
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "traerVariablesExcel",
    value: function traerVariablesExcel(excelArchivoID, index) {
      var _this5 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ExcelVariables where excelArchivoID = " + excelArchivoID, function (err, result) {
          if (err) {
            console.log(err);
            banderaImportacionVariablesExcelINICIO++;

            _this5.revisarFinImportacionVariablesExcel();

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              banderaImportacionVariablesExcelINICIO++;
              arregloDeExcel[index].variables = result.recordset;

              _this5.revisarFinImportacionVariablesExcel();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "revisarFinImportacionVariablesExcel",
    value: function revisarFinImportacionVariablesExcel() {
      if (banderaImportacionVariablesExcelINICIO == banderaImportacionVariablesExcelFIN) {
        this.traerFormas();
      }
    }
  }, {
    key: "traerFormas",
    value: function traerFormas() {
      var _this6 = this;

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

            _this6.traerRiesgos();

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              arregloDeFormas = result.recordset;

              _this6.getNivelMaximoVariables();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getNivelMaximoVariables",
    value: function getNivelMaximoVariables() {
      var _this7 = this;

      nivelMaximoVariables = 0;
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select MAX(nivel) AS nivel from VariablesCampos", function (err, result) {
          if (err) {
            console.log(err);

            _this7.traerVariables();

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                nivelMaximoVariables = result.recordset[0].nivel;
              }

              arregloDeVariables = [];

              _this7.traerVariables();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "traerVariables",
    value: function traerVariables() {
      var _this8 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Variables", function (err, result) {
          if (err) {
            console.log(err);

            _this8.iniciarCalculoExcel();

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              arregloDeVariables = result.recordset;
              banderaImportacionCamposVariablesINICIO = 0;
              banderaImportacionCamposVariablesFIN = arregloDeVariables.length;

              for (var i = 0; i < arregloDeVariables.length; i++) {
                if (arregloDeVariables[i].esInstruccionSQL) {
                  _this8.traerInstruccionSQLCampos(arregloDeVariables[i], i);
                } else {
                  _this8.traerAtributosVariables(arregloDeVariables[i].ID, i);
                }
              }

              ;

              if (arregloDeVariables.length == 0) {
                alert("No existen variables");

                _this8.iniciarCalculoExcel();
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "traerInstruccionSQLCampos",
    value: function traerInstruccionSQLCampos(variable, index) {
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
            banderaImportacionCamposVariablesINICIO++;

            _this9.revisarFinImportacionCamposVariables();

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              arregloDeVariables[index].atributos = result.recordset;

              _this9.traerInstruccionSQL(variable, index);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "traerInstruccionSQL",
    value: function traerInstruccionSQL(variable, index) {
      var _this10 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from InstruccionSQL where variableID = " + variable.ID, function (err, result) {
          if (err) {
            console.log(err);
            banderaImportacionCamposVariablesINICIO++;

            _this10.revisarFinImportacionCamposVariables();

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              banderaImportacionCamposVariablesINICIO++;
              arregloDeVariables[index].instruccionSQL = result.recordset[0];

              _this10.revisarFinImportacionCamposVariables();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "traerAtributosVariables",
    value: function traerAtributosVariables(variableID, index) {
      var _this11 = this;

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
            banderaImportacionCamposVariablesINICIO++;

            _this11.revisarFinImportacionCamposVariables();

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              banderaImportacionCamposVariablesINICIO++;
              arregloDeVariables[index].atributos = result.recordset;

              _this11.revisarFinImportacionCamposVariables();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "revisarFinImportacionCamposVariables",
    value: function revisarFinImportacionCamposVariables() {
      if (banderaImportacionCamposVariablesINICIO == banderaImportacionCamposVariablesFIN) {
        this.inicioTraerSegmentosDeCamposVariables();
      }
    }
  }, {
    key: "inicioTraerSegmentosDeCamposVariables",
    value: function inicioTraerSegmentosDeCamposVariables() {
      console.log('inicioTraerSegmentosDeCamposVariables');
      banderaImportacionSegmentosCamposVariablesINICIO = 0;
      banderaImportacionSegmentosCamposVariablesFIN = 0;

      for (var i = 0; i < arregloDeVariables.length; i++) {
        for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
          banderaImportacionSegmentosCamposVariablesFIN++;
          this.traerSegmentosDeCamposVariables(arregloDeVariables[i].ID, arregloDeVariables[i].atributos[j].ID, i, j);
        }

        ;
      }

      ;
    }
  }, {
    key: "traerSegmentosDeCamposVariables",
    value: function traerSegmentosDeCamposVariables(variableID, variableCampoID, i, j) {
      var _this12 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from SegmentoReglasVariables where variableID = " + variableID + " and variableCampoID = " + variableCampoID, function (err, result) {
          if (err) {
            console.log(err);
            banderaImportacionSegmentosCamposVariablesINICIO++;

            _this12.revisarFinImportacionSegmentosCamposVariables();

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              banderaImportacionSegmentosCamposVariablesINICIO++;
              arregloDeVariables[i].atributos[j].segmentoReglas = result.recordset;

              _this12.revisarFinImportacionSegmentosCamposVariables();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "revisarFinImportacionSegmentosCamposVariables",
    value: function revisarFinImportacionSegmentosCamposVariables() {
      if (banderaImportacionSegmentosCamposVariablesINICIO == banderaImportacionSegmentosCamposVariablesFIN) {
        this.inicioTraerReglasDeSegmentosVariables();
      }
    }
  }, {
    key: "inicioTraerReglasDeSegmentosVariables",
    value: function inicioTraerReglasDeSegmentosVariables() {
      console.log('inicioTraerReglasDeSegmentosVariables');
      banderaImportacionReglasSegmentosCamposVariablesINICIO = 0;
      banderaImportacionReglasSegmentosCamposVariablesFIN = 0;

      for (var i = 0; i < arregloDeVariables.length; i++) {
        for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
          for (var k = 0; k < arregloDeVariables[i].atributos[j].segmentoReglas.length; k++) {
            banderaImportacionReglasSegmentosCamposVariablesFIN++;
            this.traerReglasDeSegmentosVariables(arregloDeVariables[i].ID, arregloDeVariables[i].atributos[j].ID, arregloDeVariables[i].atributos[j].segmentoReglas[k].ID, i, j, k);
          }

          ;
        }

        ;
      }

      ;

      if (banderaImportacionReglasSegmentosCamposVariablesFIN == 0) {
        this.iniciarCalculoExcel();
      }
    }
  }, {
    key: "traerReglasDeSegmentosVariables",
    value: function traerReglasDeSegmentosVariables(variableID, variableCampoID, segmentoCampoID, i, j, k) {
      var _this13 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ReglasVariables where variableID = " + variableID + " and variableCampoID = " + variableCampoID + " and segmentoReglaID = " + segmentoCampoID, function (err, result) {
          if (err) {
            console.log(err);
            banderaImportacionReglasSegmentosCamposVariablesINICIO++;

            _this13.revisarFinImportacionReglasSegmentosVariables();

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              banderaImportacionReglasSegmentosCamposVariablesINICIO++;
              arregloDeVariables[i].atributos[j].segmentoReglas[k].reglas = result.recordset;

              _this13.revisarFinImportacionReglasSegmentosVariables();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "revisarFinImportacionReglasSegmentosVariables",
    value: function revisarFinImportacionReglasSegmentosVariables() {
      if (banderaImportacionReglasSegmentosCamposVariablesINICIO == banderaImportacionReglasSegmentosCamposVariablesFIN) {
        this.inicioTraerFormulasDeCamposVariables();
      }
    }
  }, {
    key: "inicioTraerFormulasDeCamposVariables",
    value: function inicioTraerFormulasDeCamposVariables() {
      console.log('inicioTraerFormulasDeCamposVariables');
      banderaImportacionFormulasCamposVariablesINICIO = 0;
      banderaImportacionFormulasCamposVariablesFIN = 0;

      for (var i = 0; i < arregloDeVariables.length; i++) {
        for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
          banderaImportacionFormulasCamposVariablesFIN++;
          this.traerFormulasDeCamposVariables(arregloDeVariables[i].atributos[j].ID, i, j);
        }

        ;
      }

      ;
    }
  }, {
    key: "traerFormulasDeCamposVariables",
    value: function traerFormulasDeCamposVariables(variableCampoID, i, j) {
      var _this14 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from FormulasVariablesCampos where variableCampoID = " + variableCampoID, function (err, result) {
          if (err) {
            console.log(err);
            banderaImportacionFormulasCamposVariablesINICIO++;

            _this14.revisarFinImportacionFormulasCamposVariables();

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              banderaImportacionFormulasCamposVariablesINICIO++;
              arregloDeVariables[i].atributos[j].formulas = result.recordset;

              _this14.revisarFinImportacionFormulasCamposVariables();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "revisarFinImportacionFormulasCamposVariables",
    value: function revisarFinImportacionFormulasCamposVariables() {
      if (banderaImportacionFormulasCamposVariablesINICIO == banderaImportacionFormulasCamposVariablesFIN) {
        this.inicioTraerElementosFormulasDeCamposVariables();
      }
    }
  }, {
    key: "inicioTraerElementosFormulasDeCamposVariables",
    value: function inicioTraerElementosFormulasDeCamposVariables() {
      console.log('inicioTraerElementosFormulasDeCamposVariables');
      banderaImportacionElementosFormulasCamposVariablesINICIO = 0;
      banderaImportacionElementosFormulasCamposVariablesFIN = 0;

      for (var i = 0; i < arregloDeVariables.length; i++) {
        for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
          for (var k = 0; k < arregloDeVariables[i].atributos[j].formulas.length; k++) {
            banderaImportacionElementosFormulasCamposVariablesFIN++;
            this.traerElementosFormulasDeCamposVariables(arregloDeVariables[i].atributos[j].formulas[k].ID, i, j, k);
          }

          ;
        }

        ;
      }

      ;
    }
  }, {
    key: "traerElementosFormulasDeCamposVariables",
    value: function traerElementosFormulasDeCamposVariables(idFormula, i, j, k) {
      var _this15 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ElementoFormulasVariablesCampos where formulaID = " + idFormula, function (err, result) {
          if (err) {
            console.log(err);
            banderaImportacionElementosFormulasCamposVariablesINICIO++;

            _this15.revisarFinImportacionElementosFormulasCamposVariables();

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              banderaImportacionElementosFormulasCamposVariablesINICIO++;
              arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos = result.recordset;

              _this15.revisarFinImportacionElementosFormulasCamposVariables();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "revisarFinImportacionElementosFormulasCamposVariables",
    value: function revisarFinImportacionElementosFormulasCamposVariables() {
      if (banderaImportacionElementosFormulasCamposVariablesINICIO == banderaImportacionElementosFormulasCamposVariablesFIN) {
        this.inicioTraerConeccionesATablas();
      }
    }
  }, {
    key: "inicioTraerConeccionesATablas",
    value: function inicioTraerConeccionesATablas() {
      console.log('inicioTraerConeccionesATablas');
      banderaImportacionConecionesATablasINICIO = 0;
      banderaImportacionConecionesATablasFIN = 0;
      arregloConexionesATablas = [];

      for (var i = 0; i < arregloDeVariables.length; i++) {
        for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
          for (var k = 0; k < arregloDeVariables[i].atributos[j].segmentoReglas.length; k++) {
            if (arregloDeVariables[i].atributos[j].segmentoReglas[k].esConexionTabla && this.noHaSidoImportadaConeccion(arregloDeVariables[i].atributos[j].segmentoReglas[k])) {
              banderaImportacionConecionesATablasFIN++; //para asegurar que ID no sea asyncrono

              arregloConexionesATablas.push({
                ID: arregloDeVariables[i].atributos[j].segmentoReglas[k].conexionTablaID
              }); //arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos[l]

              this.traerConeccionesATablas(arregloDeVariables[i].atributos[j].segmentoReglas[k].conexionTablaID, arregloConexionesATablas.length - 1);
            }
          }

          ;
        }

        ;
      }

      ;

      if (banderaImportacionConecionesATablasFIN == 0) {
        //this.iniciarCalculoExcel();
        this.verificarPeriodicidad();
      }
    }
  }, {
    key: "noHaSidoImportadaConeccion",
    value: function noHaSidoImportadaConeccion(segmento) {
      for (var i = 0; i < arregloConexionesATablas.length; i++) {
        if (arregloConexionesATablas[i].ID == segmento.conexionTablaID) {
          return false;
        }
      }

      ;
      return true;
    }
  }, {
    key: "traerConeccionesATablas",
    value: function traerConeccionesATablas(tablaID, indexARemplazar) {
      var _this16 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Tablas where ID = " + tablaID, function (err, result) {
          if (err) {
            console.log(err);
            banderaImportacionConecionesATablasINICIO++;

            _this16.finTraerConeccionesATablas();

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              banderaImportacionConecionesATablasINICIO++;
              if (result.recordset.length > 0) arregloConexionesATablas[indexARemplazar] = result.recordset[0];

              _this16.finTraerConeccionesATablas();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "finTraerConeccionesATablas",
    value: function finTraerConeccionesATablas() {
      if (banderaImportacionConecionesATablasINICIO == banderaImportacionConecionesATablasFIN) {
        this.inicioTraerResultadosDeFuenteDeDatos();
      }
    }
  }, {
    key: "inicioTraerResultadosDeFuenteDeDatos",
    value: function inicioTraerResultadosDeFuenteDeDatos() {
      console.log('inicioTraerResultadosDeFuenteDeDatos');
      banderaImportacionValoresDeTablasDeFuenteDeDatosINICIO = 0;
      banderaImportacionValoresDeTablasDeFuenteDeDatosFIN = 0;
      arregloResultadosDeTablas = [];

      for (var i = 0; i < arregloConexionesATablas.length; i++) {
        banderaImportacionValoresDeTablasDeFuenteDeDatosFIN++;
        this.traerResultadosDeFuenteDeDatos(arregloConexionesATablas[i], i);
      }

      ;
    }
  }, {
    key: "traerResultadosDeFuenteDeDatos",
    value: function traerResultadosDeFuenteDeDatos(tabla, index) {
      var _this17 = this;

      var pool = new _mssql["default"].ConnectionPool({
        user: tabla.usuario,
        password: tabla.contrasena,
        server: tabla.servidor,
        database: tabla.baseDatos,
        stream: true,
        connectionTimeout: 900000,
        requestTimeout: 900000,
        pool: {
          max: 40,
          min: 0,
          idleTimeoutMillis: 30000
        },
        options: {
          useUTC: false
        }
      });
      pool.connect(function (err) {
        pool.request().query("select * from " + tabla.tabla, function (err, result) {
          banderaImportacionValoresDeTablasDeFuenteDeDatosINICIO++;
          console.log('resultados tabla: ' + tabla.tabla);
          console.log(result.recordset);
          if (result.recordset != undefined && result.recordset.length > 0) arregloResultadosDeTablas.splice(index, 0, result.recordset);

          _this17.finTraerResultadosDeFuenteDeDatos();
        });
      }); // fin pool connect
    }
  }, {
    key: "finTraerResultadosDeFuenteDeDatos",
    value: function finTraerResultadosDeFuenteDeDatos() {
      console.log('verificarPeriodicidad');

      if (banderaImportacionValoresDeTablasDeFuenteDeDatosINICIO == banderaImportacionValoresDeTablasDeFuenteDeDatosFIN) {
        this.verificarPeriodicidad(); //this.iniciarCalculoExcel();
      }
    }
  }, {
    key: "verificarPeriodicidad",
    value: function verificarPeriodicidad() {
      banderaVerificarPeriodicidadINICIO = 0;
      banderaVerificarPeriodicidadFIN = 0;

      for (var i = 0; i < arregloDeExcel.length; i++) {
        for (var j = 0; j < arregloDeExcel[i].variables.length; j++) {
          banderaVerificarPeriodicidadFIN++;
          this.traerPeriodicidadVariable(arregloDeExcel[i].variables[j], "excel", arregloDeExcel, i, j);
        }

        ;
      }

      ;

      for (var i = 0; i < arregloDeFormas.length; i++) {
        banderaVerificarPeriodicidadFIN++;
        this.traerPeriodicidadVariable(arregloDeFormas[i], "forma", arregloDeFormas, i, null);
      }

      ;

      for (var i = 0; i < arregloDeVariables.length; i++) {
        banderaVerificarPeriodicidadFIN++;
        this.traerPeriodicidadVariable(arregloDeVariables[i], "variable", arregloDeVariables, i, null);
      }

      ;

      for (var i = 0; i < arregloDeIndicadores.length; i++) {
        banderaVerificarPeriodicidadFIN++;
        this.traerPeriodicidadVariable(arregloDeIndicadores[i], "indicador", arregloDeIndicadores, i, null);
      }

      ;
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
    key: "traerPeriodicidadVariable",
    value: function traerPeriodicidadVariable(variable, tabla, arreglo, indexI, indexJ) {
      var _this18 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from PeriodicidadCalculo where variableID = " + variable.ID + " and tablaVariable = '" + tabla + "'", function (err, result) {
          if (err) {
            console.log(err);

            _this18.verificarFinPeriodicidad();

            banderaVerificarPeriodicidadINICIO++;

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                var fechaInicioCalculo = variable.fechaInicioCalculo;
                var fechaUltimoCalculo = result.recordset[0].fechaUltimoCalculo;
                var tieneUltimoCalculo = false; //si la fecha es null, realizar calculo (28, 4, 1964) POPS BIRTHDAY

                if (fechaUltimoCalculo.getFullYear() != 1964 && fechaUltimoCalculo.getMonth() != 4 && fechaUltimoCalculo.getDate() != 28) {
                  tieneUltimoCalculo = true;
                }

                if (!tieneUltimoCalculo) {
                  if (indexJ != null) arreglo[indexI].variables[indexJ].realizarCalculo = true;else arreglo[indexI].realizarCalculo = true;
                } else {
                  var ultimoCalculoVigente = false;
                  var periodicidad = variable.periodicidad;
                  var fechaSiguienteCalculo = new Date(fechaInicioCalculo);

                  while (fechaSiguienteCalculo.getFullYear() <= fechaUltimoCalculo.getFullYear() && fechaSiguienteCalculo.getMonth() <= fechaUltimoCalculo.getMonth() && fechaSiguienteCalculo.getDate() <= fechaUltimoCalculo.getDate()) {
                    if (periodicidad.localeCompare("diario") == 0) {
                      fechaSiguienteCalculo = _this18.addDays(fechaSiguienteCalculo, 1);
                    } else if (periodicidad.localeCompare("semanal") == 0) {
                      fechaSiguienteCalculo = _this18.addDays(fechaSiguienteCalculo, 7);
                    } else if (periodicidad.localeCompare("mensual") == 0) {
                      fechaSiguienteCalculo = _this18.addMonths(fechaSiguienteCalculo, 1);
                    } else if (periodicidad.localeCompare("trimestral") == 0) {
                      fechaSiguienteCalculo = _this18.addMonths(fechaSiguienteCalculo, 3);
                    } else if (periodicidad.localeCompare("bi-anual") == 0) {
                      fechaSiguienteCalculo = _this18.addMonths(fechaSiguienteCalculo, 6);
                    } else if (periodicidad.localeCompare("anual") == 0) {
                      fechaSiguienteCalculo = _this18.addYears(fechaSiguienteCalculo, 1);
                    }
                  }

                  var tocaNuevoCalculo = false;

                  if (periodicidad.localeCompare("diario") == 0) {
                    if (fechaSiguienteCalculo.getDate() >= fechaUltimoCalculo.getDate() + 1) {
                      tocaNuevoCalculo = true;
                    }
                  } else if (periodicidad.localeCompare("semanal") == 0) {
                    if (fechaSiguienteCalculo.getDate() >= fechaUltimoCalculo.getDate() + 7) {
                      tocaNuevoCalculo = true;
                    }
                  } else if (periodicidad.localeCompare("mensual") == 0) {
                    if (fechaSiguienteCalculo.getMonth() >= fechaUltimoCalculo.getMonth() + 1) {
                      tocaNuevoCalculo = true;
                    }
                  } else if (periodicidad.localeCompare("trimestral") == 0) {
                    if (fechaSiguienteCalculo.getMonth() >= fechaUltimoCalculo.getMonth() + 3) {
                      tocaNuevoCalculo = true;
                    }
                  } else if (periodicidad.localeCompare("bi-anual") == 0) {
                    if (fechaSiguienteCalculo.getMonth() >= fechaUltimoCalculo.getMonth() + 6) {
                      tocaNuevoCalculo = true;
                    }
                  } else if (periodicidad.localeCompare("anual") == 0) {
                    if (fechaSiguienteCalculo.getFullYear() >= fechaUltimoCalculo.getFullYear() + 1) {
                      tocaNuevoCalculo = true;
                    }
                  }

                  if (tocaNuevoCalculo) {
                    if (indexJ != null) arreglo[indexI].variables[indexJ].realizarCalculo = true;else arreglo[indexI].realizarCalculo = true;
                  } else {
                    if (indexJ != null) arreglo[indexI].variables[indexJ].realizarCalculo = false;else arreglo[indexI].realizarCalculo = false;
                  }
                }
              } else {
                if (indexJ != null) arreglo[indexI].variables[indexJ].realizarCalculo = true;else arreglo[indexI].realizarCalculo = true;
              }

              banderaVerificarPeriodicidadINICIO++;

              _this18.verificarFinPeriodicidad();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "verificarFinPeriodicidad",
    value: function verificarFinPeriodicidad() {
      console.log('verificarFinPeriodicidad');

      if (banderaVerificarPeriodicidadINICIO == banderaVerificarPeriodicidadFIN) {
        this.iniciarImportacionValoresCalculados();
      }
    }
  }, {
    key: "iniciarImportacionValoresCalculados",
    value: function iniciarImportacionValoresCalculados() {
      console.log('iniciarImportacionValoresCalculados');
      banderaImportarValoresPeriodicidadINICIO = 0;
      banderaImportarValoresPeriodicidadFIN = 0;

      for (var i = 0; i < arregloDeExcel.length; i++) {
        for (var j = 0; j < arregloDeExcel[i].variables.length; j++) {
          if (!arregloDeExcel[i].variables[j].realizarCalculo) {
            banderaImportarValoresPeriodicidadFIN++;
            this.getResultsVariables(arregloDeExcel[i].variables[j], "excel", arregloDeExcel, i, j);
          }
        }

        ;
      }

      ;

      for (var i = 0; i < arregloDeFormas.length; i++) {
        if (!arregloDeFormas[i].realizarCalculo) {
          banderaImportarValoresPeriodicidadFIN++;
          this.getResultsVariables(arregloDeFormas[i], "forma", arregloDeFormas, i);
        }
      }

      ;

      for (var i = 0; i < arregloDeVariables.length; i++) {
        if (!arregloDeVariables[i].realizarCalculo) {
          banderaImportarValoresPeriodicidadFIN++;
          this.getResultsVariables(arregloDeVariables[i], "variable", arregloDeVariables, i);
        }
      }

      ;

      for (var i = 0; i < arregloDeIndicadores.length; i++) {
        if (!arregloDeIndicadores[i].realizarCalculo) {
          banderaImportarValoresPeriodicidadFIN++;
          this.getResultsIndicators(arregloDeIndicadores[i], i);
        }
      }

      ;

      if (banderaImportarValoresPeriodicidadFIN == 0) {
        this.verificarFinImportacionValoresCalculados();
      }
    }
  }, {
    key: "getResultsVariables",
    value: function getResultsVariables(variable, tabla) {
      var _this19 = this;

      //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosNombreVariables where nombreVariable = '" + variable.nombre + "' and finVigencia = '1964-05-28'", function (err, result) {
          if (err) {
            console.log(err);
            banderaImportarValoresPeriodicidadINICIO++;

            _this19.verificarFinImportacionValoresCalculados();

            if (!rolledBack) {
              transaction.rollback(function (err) {});
              return [];
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length == 0) banderaImportarValoresPeriodicidadINICIO++;

              _this19.getResultsVariablesFieldsInit(result.recordset, variable, tabla);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsVariablesFieldsInit",
    value: function getResultsVariablesFieldsInit(resultados, variable, tabla) {
      var arregloTemp = [];

      for (var i = 0; i < resultados.length; i++) {
        arregloTemp.push(resultados[i]);
        this.getFieldResults(resultados[i], variable, tabla);
      }

      ;

      if (resultados.length == 0) {
        this.verificarFinImportacionValoresCalculados();
      }
    }
  }, {
    key: "getFieldResults",
    value: function getFieldResults(resultado, variable, tabla) {
      var _this20 = this;

      var textoSelect = '';
      var textoGroupBy = ' group by ID';

      if (tabla.localeCompare("excel") == 0) {
        textoSelect += ' ID, ' + variable.nombre;
        textoGroupBy += ', ' + variable.nombre;
      } else if (tabla.localeCompare("variable") == 0) {
        for (var i = 0; i < variable.atributos.length; i++) {
          if (i > 0) textoSelect += ', ';else textoSelect += ' ID, ';
          textoSelect += variable.atributos[i].nombre;
          textoGroupBy += ', ' + variable.atributos[i].nombre;
        }

        ;
      } else {
        textoSelect += ' ID, ' + variable.nombre;
        textoGroupBy += ', ' + variable.nombre;
      }

      if (textoSelect.length > 0) textoSelect += ', ';
      textoSelect += ' max(f3ch4Gu4rd4do) as f3ch4Gu4rd4do';
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select " + textoSelect + " from " + resultado.nombreVariable + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds() + textoGroupBy, function (err, result) {
          if (err) {
            banderaImportarValoresPeriodicidadINICIO++;

            _this20.verificarFinImportacionValoresCalculados();

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                if (tabla.localeCompare("excel") == 0 || tabla.localeCompare("forma") == 0) {
                  window[variable.nombre] = result.recordset[result.recordset.length - 1][variable.nombre];
                } else if (tabla.localeCompare("variable") == 0) {
                  if (variable.esInstruccionSQL || variable.esColeccion) {
                    window[variable.nombre] = result.recordset[result.recordset.length - 1];
                  } else {
                    window[variable.nombre] = result.recordset[result.recordset.length - 1][variable.nombre];
                  }
                }
              } else {
                if (tabla.localeCompare("excel") == 0) {
                  arregloDeErroresExcel.push({
                    nombre: variable.nombre
                  });
                } else if (tabla.localeCompare("forma") == 0) {//arregloDeErroresExcel.push({nombre: variable.nombre });
                } else if (tabla.localeCompare("variable") == 0) {//arregloDeErroresExcel.push({nombre: variable.nombre });
                }
              }

              banderaImportarValoresPeriodicidadINICIO++;

              _this20.verificarFinImportacionValoresCalculados();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsIndicators",
    value: function getResultsIndicators(indicador, index) {
      var _this21 = this;

      //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosNombreIndicadores where nombreIndicador = '" + indicador.nombre + "' and finVigencia = '1964-05-28'", function (err, result) {
          if (err) {
            console.log(err);
            banderaImportarValoresPeriodicidadINICIO++;

            _this21.verificarFinImportacionValoresCalculados();

            if (!rolledBack) {
              transaction.rollback(function (err) {});
              return [];
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length == 0) banderaImportarValoresPeriodicidadINICIO++;

              _this21.getResultsIndicatorsFieldsInit(result.recordset, indicador, index);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsIndicatorsFieldsInit",
    value: function getResultsIndicatorsFieldsInit(resultados, indicador, index) {
      console.log('getResultsIndicatorsFieldsInit');
      var arregloTemp = [];

      for (var i = 0; i < resultados.length; i++) {
        arregloTemp.push(resultados[i]);
        this.getFieldIndicatorsResults(resultados[i], indicador, index);
      }

      ;

      if (resultados.length == 0) {
        this.verificarFinImportacionValoresCalculados();
      }
    }
  }, {
    key: "getFieldIndicatorsResults",
    value: function getFieldIndicatorsResults(resultado, indicador, index) {
      var _this22 = this;

      var textoSelect = '';
      var textoGroupBy = ' group by ID';

      for (var i = 0; i < indicador.atributos.length; i++) {
        if (i > 0) textoSelect += ', ';
        textoSelect += indicador.atributos[i];
        textoGroupBy += ', ' + indicador.atributos[i];
      }

      ;
      if (textoSelect.length > 0) textoSelect += ', ';
      textoSelect += ' max(f3ch4Gu4rd4do) as f3ch4Gu4rd4do';
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select " + textoSelect + " from " + resultado.nombreVariable + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds() + textoGroupBy, function (err, result) {
          if (err) {
            console.log(err);
            banderaImportarValoresPeriodicidadINICIO++;

            _this22.verificarFinImportacionValoresCalculados();

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                //window[indicador.nombre] = result.recordset[0];
                arregloDeIndicadores[index] = result.recordset[0];
              } else {//
              }

              banderaImportarValoresPeriodicidadINICIO++;

              _this22.verificarFinImportacionValoresCalculados();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "verificarFinImportacionValoresCalculados",
    value: function verificarFinImportacionValoresCalculados() {
      console.log('verificarFinImportacionValoresCalculados');

      if (banderaImportarValoresPeriodicidadINICIO == banderaImportarValoresPeriodicidadFIN) {
        this.iniciarCalculoExcel();
      }
    }
  }, {
    key: "iniciarCalculoExcel",
    value: function iniciarCalculoExcel() {
      if (arregloDeExcel.length > 0) {
        this.crearVariablesExcel();
      }

      this.iniciarCalculoFormas();
    }
  }, {
    key: "iniciarCalculoFormas",
    value: function iniciarCalculoFormas() {
      if (arregloDeFormas.length > 0) {
        this.iniciarMostrarFormas();
      }

      if (arregloDeFormas.length == 0) {
        this.iniciarHilo();
      }
    }
  }, {
    key: "iniciarHilo",
    value: function iniciarHilo() {
      /*console.log('nivelMaximoVariables');
      console.log(nivelMaximoVariables);
      console.log('arregloDeFuentesDeDatos');
      console.log(arregloDeFuentesDeDatos);
      console.log('arregloDeVariables');
      console.log(arregloDeVariables);
      console.log('arregloResultadosDeTablas');
      console.log(arregloResultadosDeTablas);
      console.log('arregloConexionesATablas');
      console.log(arregloConexionesATablas);*/
      //DESCRIPCION DEL PROCEDIMIENTO
      //1) PRIMERO CREAR CODIGO PARA CREAR VARIABLES DE ELEMENTOS DE FORMULAS, AGRUPADAS POR TABLAS CORRESPONDIENTES  -- SERA PRIMER METODO A LLAMAR
      //2) CREAR METODO NIVEL XX, CONTENDRA LLAMADO A METODO 'CALCULO VARIABLES NIVEL XX', Y JUSTO DESPUES LLAMARÁ AL SIGUIENTE NIVEL QUE SIGUE, O AL METODO DE MENSAJE FINAL
      //3) CREAR CODIGO 'CALCULO VARIABLES NIVEL XX'
      //AGRUPANDO ELEMENTOS DE FORMULA POR CONEXION A TABLA
      var arregloAgrupacionElementosFormulaPorConexionATablaVariables = []; //arreglo que contiene los segmento de reglas agrupados por el arreglo de tablas
      //la variable es insertado una unica vez cada por cada segmento de regla que pertenezca a la tabla

      var arregloAgrupacionElementosFormulaPorVariablesVariables = []; //arreglo que contiene los segmento de reglas de la variable a calcular agrupados por la posicion de la variable a comparar en el arregloDeVariables
      //la variable es insertado una unica vez cada por cada segmento de regla que pertenezca a la tabla

      var arregloAgrupacionElementosFormulaPorExcelVariables = []; //arreglo que contiene los segmento de reglas de la variable excel a calcular agrupados por la posicion de la variable a comparar en el arregloDeVariables
      //la variable es insertado una unica vez cada por cada segmento de regla que pertenezca a la tabla

      var arregloAgrupacionElementosFormulaPorFormasVariables = []; //arreglo que contiene los segmento de reglas de la variable forma a calcular agrupados por la posicion de la variable a comparar en el arregloDeVariables
      //la variable es insertado una unica vez cada por cada segmento de regla que pertenezca a la tabla

      var arregloAgrupacionElementosFormulaPorManualVariables = [];

      for (var i = 0; i < arregloDeVariables.length; i++) {
        for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
          for (var k = 0; k < arregloDeVariables[i].atributos[j].segmentoReglas.length; k++) {
            if (arregloDeVariables[i].atributos[j].segmentoReglas[k].esConexionTabla) {
              for (var m = 0; m < arregloConexionesATablas.length; m++) {
                if (arregloDeVariables[i].atributos[j].segmentoReglas[k].conexionTablaID == arregloConexionesATablas[m].ID) {
                  if (arregloAgrupacionElementosFormulaPorConexionATablaVariables[m] == undefined) arregloAgrupacionElementosFormulaPorConexionATablaVariables[m] = [];
                  arregloAgrupacionElementosFormulaPorConexionATablaVariables[m].push({
                    segmentoRegla: arregloDeVariables[i].atributos[j].segmentoReglas[k],
                    variable: arregloDeVariables[i],
                    atributo: arregloDeVariables[i].atributos[j],
                    index: k
                  });
                  break;
                }
              }

              ;
            } else if (arregloDeVariables[i].atributos[j].segmentoReglas[k].excelArchivoID != -1 && arregloDeVariables[i].atributos[j].segmentoReglas[k].formaVariableID == -1 && arregloDeVariables[i].atributos[j].segmentoReglas[k].variableIDCreacionCodigo == -1) {
              for (var x = 0; x < arregloDeExcel.length; x++) {
                if (arregloDeVariables[i].atributos[j].segmentoReglas[k].excelArchivoID == arregloDeExcel[x].ID) {
                  if (arregloAgrupacionElementosFormulaPorExcelVariables[x] == undefined) arregloAgrupacionElementosFormulaPorExcelVariables[x] = [];

                  for (var y = 0; y < arregloDeExcel[x].variables.length; y++) {
                    if (arregloDeVariables[i].atributos[j].segmentoReglas[k].excelVariableID == arregloDeExcel[x].variables[y].ID) {
                      if (arregloAgrupacionElementosFormulaPorExcelVariables[x][y] == undefined) arregloAgrupacionElementosFormulaPorExcelVariables[x][y] = [];
                      arregloAgrupacionElementosFormulaPorExcelVariables[x][y].push({
                        segmentoRegla: arregloDeVariables[i].atributos[j].segmentoReglas[k],
                        variable: arregloDeVariables[i],
                        variableCreacionCodigo: arregloDeExcel[x].variables[y],
                        atributo: arregloDeVariables[i].atributos[j],
                        index: k
                      });
                      break;
                    }
                  }

                  ;
                }
              }

              ;
            } else if (arregloDeVariables[i].atributos[j].segmentoReglas[k].formaVariableID != -1 && arregloDeVariables[i].atributos[j].segmentoReglas[k].excelArchivoID == -1 && arregloDeVariables[i].atributos[j].segmentoReglas[k].variableIDCreacionCodigo == -1) {
              for (var x = 0; x < arregloDeFormas.length; x++) {
                if (arregloDeVariables[i].atributos[j].segmentoReglas[k].formaVariableID == arregloDeFormas[x].ID) {
                  if (arregloAgrupacionElementosFormulaPorFormasVariables[x] == undefined) arregloAgrupacionElementosFormulaPorFormasVariables[x] = [];
                  arregloAgrupacionElementosFormulaPorFormasVariables[x].push({
                    segmentoRegla: arregloDeVariables[i].atributos[j].segmentoReglas[k],
                    variable: arregloDeVariables[i],
                    variableCreacionCodigo: arregloDeFormas[x],
                    atributo: arregloDeVariables[i].atributos[j],
                    index: k
                  });
                  break;
                }
              }

              ;
            } else if (arregloDeVariables[i].atributos[j].segmentoReglas[k].esValorManual && arregloDeVariables[i].atributos[j].segmentoReglas[k].formaVariableID == -1 && arregloDeVariables[i].atributos[j].segmentoReglas[k].excelArchivoID == -1 && arregloDeVariables[i].atributos[j].segmentoReglas[k].variableIDCreacionCodigo == -1) {
              if (arregloAgrupacionElementosFormulaPorManualVariables[i] == undefined) arregloAgrupacionElementosFormulaPorManualVariables[i] = [];
              arregloAgrupacionElementosFormulaPorManualVariables[i].push({
                segmentoRegla: arregloDeVariables[i].atributos[j].segmentoReglas[k],
                variable: arregloDeVariables[i],
                variableCreacionCodigo: arregloDeVariables[i],
                atributo: arregloDeVariables[i].atributos[j],
                index: k
              });
            } else {
              for (var x = 0; x < arregloDeVariables.length; x++) {
                if (arregloDeVariables[i].atributos[j].segmentoReglas[k].variableIDCreacionCodigo == arregloDeVariables[x].ID) {
                  if (arregloAgrupacionElementosFormulaPorVariablesVariables[x] == undefined) arregloAgrupacionElementosFormulaPorVariablesVariables[x] = [];
                  arregloAgrupacionElementosFormulaPorVariablesVariables[x].push({
                    segmentoRegla: arregloDeVariables[i].atributos[j].segmentoReglas[k],
                    variable: arregloDeVariables[i],
                    variableCreacionCodigo: arregloDeVariables[x],
                    atributo: arregloDeVariables[i].atributos[j],
                    index: k
                  });
                  break;
                }
              }

              ;
            }
          }

          ;
        }

        ;
      }

      ;
      /*console.log('arregloAgrupacionElementosFormulaPorConexionATablaVariables');
      console.log(arregloAgrupacionElementosFormulaPorConexionATablaVariables);
      console.log('arregloAgrupacionElementosFormulaPorVariablesVariables');
      console.log(arregloAgrupacionElementosFormulaPorVariablesVariables);
      console.log('arregloAgrupacionElementosFormulaPorExcelVariables');
      console.log(arregloAgrupacionElementosFormulaPorExcelVariables);
      console.log('arregloAgrupacionElementosFormulaPorFormasVariables');
      console.log(arregloAgrupacionElementosFormulaPorFormasVariables);*/

      var existeVarSQL = false; //INICIALIZANDO VARIABLES EN MEMORIA

      for (var a = 0; a < arregloDeVariables.length; a++) {
        if (arregloDeVariables[a].realizarCalculo) {
          if (arregloDeVariables[a].esObjeto || arregloDeVariables[a].esInstruccionSQL) {
            //CREANDO ESPACIO EN MEMORIA DE ARREGLO DE VARIABLES
            window[arregloDeVariables[a].nombre] = [];
          } else {
            //CREANDO ESPACIO EN MEMORIA DE VARIABLE SI ES VAR PRIMITVA
            window[arregloDeVariables[a].nombre] = {};
          }

          if (arregloDeVariables[a].esInstruccionSQL) {
            existeVarSQL = true;
          }
        }
      } //codigo var sql


      this.crearCodigoFuenteDatoSQL();
      var codigo = '';
      /*//AGREGAR CODIGO VARIABLES EXCEL
      codigo += this.crearNivel(false, arregloAgrupacionElementosFormulaPorExcelVariables, 0);
      //AGREGAR CODIGO VARIABLES FORMA
      codigo += this.crearNivel(false, arregloAgrupacionElementosFormulaPorFormasVariables, 0);*/
      //codigo var general

      for (var i = 0; i <= nivelMaximoVariables; i++) {
        if (i == 0) {
          var llamarSiguienteNivel = false;
          if (nivelMaximoVariables >= 1) llamarSiguienteNivel = true;
          codigo += this.crearCodigoFuenteDato(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorConexionATablaVariables, 0);
          codigo += this.crearNivel(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorExcelVariables, 0);
          codigo += this.crearNivel(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorFormasVariables, 0);
          codigo += this.crearNivel(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorManualVariables, 0);
        } else {
          var llamarSiguienteNivel = false;
          if (nivelMaximoVariables > i) llamarSiguienteNivel = true;
          codigo += this.crearNivel(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorVariablesVariables, i);
          codigo += this.crearNivel(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorExcelVariables, i);
          codigo += this.crearNivel(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorFormasVariables, i);
        }
      }

      ;
      codigo += '\n\tiniciarCalculoIndicadores();';
      window['calculoPrincipal'] = new Function('return function calculoPrincipalMain(evaluate, iniciarCalculoIndicadores, isValidDate, guardarOperacionSQL){' + codigo + '}')();
      console.log(window['calculoPrincipal']);

      if (!existeVarSQL) {
        window['calculoPrincipal'](_mathjs.evaluate, this.iniciarCalculoIndicadores, this.isValidDate, this.guardarOperacionSQL);
      } else {
        for (var a = 0; a < arregloDeVariables.length; a++) {
          if (arregloDeVariables[a].esInstruccionSQL) {
            window["calculoSQL" + arregloDeVariables[a].nombre](_mssql["default"], this.props.pool, _mathjs.evaluate, this.iniciarCalculoIndicadores, this.isValidDate, this.guardarOperacionSQL);
            break;
          }
        }

        ;
      }
      /*console.log(window['calculoPrincipal']);
      for (var a = 0; a < arregloDeVariables.length; a++) {
          console.log('window["'+arregloDeVariables[a].nombre+'"]');
          console.log(window[arregloDeVariables[a].nombre]);
      };*/


      setTimeout(function () {
        for (var a = 0; a < arregloDeVariables.length; a++) {
          console.log('window["' + arregloDeVariables[a].nombre + '"]');
          console.log(window[arregloDeVariables[a].nombre]);
        }

        ;
      }, 3000);
      setTimeout(function () {
        console.log('===========');

        for (var a = 0; a < arregloDeFormas.length; a++) {
          console.log('window["' + arregloDeFormas[a].nombre + '"]');
          console.log(window[arregloDeFormas[a].nombre]);
        }

        ;
      }, 3000);
      setTimeout(function () {
        console.log('===========');

        for (var i = 0; i < arregloDeExcel.length; i++) {
          for (var j = 0; j < arregloDeExcel[i].variables.length; j++) {
            console.log('window["' + arregloDeExcel[i].variables[j].nombre + '"]');
            console.log(window[arregloDeExcel[i].variables[j].nombre]);
          }

          ;
        }

        ;
      }, 3000);
    }
  }, {
    key: "codigoIniciacion",
    value: function codigoIniciacion(variable, tipoVariable, atributo, tabsText, esOperacionSQL, esPromedio) {
      if (tipoVariable.localeCompare("fuenteDato") == 0) {
        //atributo en este caso, es el valor del index del elemento en formula
        return this.iniciacionElementosFormula(variable, atributo, tabsText);
      } else if (tipoVariable.localeCompare("variable") == 0) {
        return this.iniciacionVariable(variable, tabsText);
      } else if (tipoVariable.localeCompare("atributo") == 0) {
        return this.iniciacionCampo(variable, atributo, tabsText, esOperacionSQL, esPromedio);
      }
    }
  }, {
    key: "iniciacionElementosFormula",
    value: function iniciacionElementosFormula(variable, index) {
      var iniciacionElementosFormula = '';

      if (variable.tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0 && (variable.operacion.localeCompare("MAX") == 0 || variable.operacion.localeCompare("MIN") == 0)) {
        //CUANDO ES FECHA Y OPERACION ES MAX O MIN DE FUENTE DE DATOS, SE OBTIENE LA FECHA MAXIMA O MENOR ENCONTRADA
        //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
        //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
        iniciacionElementosFormula += tabsText + 'var ' + variable.nombreColumnaEnTabla + variable.variableID + variable.variableCampoID + variable.idFormula + variable.idConexionTabla + index;
        iniciacionElementosFormula += ' = new Date(1964, 5, 28);'; //POPS BIRTHDAY -- FECHA NULA
      } else if (variable.tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0 && variable.operacion.length > 0) {
        //CUANDO ES FECHA Y OPERACION NO ES MAX O MIN DE FUENTE DE DATOS, SE OBTIENE UN NUMERO QUE VARIA POR OPERACION (DIA, MES, AÑO, COUNT)
        //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
        //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
        iniciacionElementosFormula += tabsText + 'var ' + variable.nombreColumnaEnTabla + variable.variableID + variable.variableCampoID + variable.idFormula + variable.idConexionTabla + index;
        iniciacionElementosFormula += ' = 0;';
      }

      if (variable.tipoColumnaEnTabla.toLowerCase().localeCompare("bool") == 0 && variable.operacion.localeCompare("COUNT") == 0) {
        //CUANDO ES BOOL Y OPERACION ES COUNT DE FUENTE DE DATOS
        //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
        //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
        iniciacionElementosFormula += tabsText + 'var ' + variable.nombreColumnaEnTabla + variable.variableID + variable.variableCampoID + variable.idFormula + variable.idConexionTabla + index;
        iniciacionElementosFormula += ' = 0;';
      }

      if (variable.tipoColumnaEnTabla.toLowerCase().localeCompare("numero") == 0 && this.existeOperacion(variable.operacion)) {
        //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
        //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
        iniciacionElementosFormula += tabsText + 'var ' + variable.nombreColumnaEnTabla + variable.variableID + variable.variableCampoID + variable.idFormula + variable.idConexionTabla + index;
        iniciacionElementosFormula += ' = 0;';
      }

      if (variable.tipoColumnaEnTabla.toLowerCase().localeCompare("cadena") == 0 && variable.operacion.localeCompare("COUNT") == 0) {
        //CUANDO ES BOOL Y OPERACION ES COUNT DE FUENTE DE DATOS
        //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
        //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
        iniciacionElementosFormula += tabsText + 'var ' + variable.nombreColumnaEnTabla + variable.variableID + variable.variableCampoID + variable.idFormula + variable.idConexionTabla + index;
        iniciacionElementosFormula += ' = 0;';
      }

      return iniciacionElementosFormula;
    }
  }, {
    key: "iniciacionVariable",
    value: function iniciacionVariable(variable, tabsText) {
      var iniciacionVariable = '';

      if (variable.esObjeto || variable.esInstruccionSQL) {
        iniciacionVariable += tabsText + 'var ' + variable.nombre + 'NU3V0 = {};';
        iniciacionVariable += '\n' + tabsText + 'var ' + variable.nombre + 'GU4RD4RV4L0R = false;';
      } //validacion necesario porque cuando variable sea primitiva, codigo de instanciacion sera en campo / atributo


      return iniciacionVariable;
    }
  }, {
    key: "iniciacionCampo",
    value: function iniciacionCampo(variable, campo, tabsText, esOperacionSQL, esPromedio) {
      var iniciacionVariable = '';

      if (!variable.esObjeto && !variable.esInstruccionSQL) {
        if (campo.tipo.toLowerCase().localeCompare("date") == 0) {
          iniciacionVariable += tabsText + 'var ' + variable.nombre + 'NU3V0 = new Date(1964, 4, 28);'; //POPS BIRTHDAY == null

          iniciacionVariable += '\n' + tabsText + 'var ' + variable.nombre + 'GU4RD4RV4L0R = false;';
        }

        if (campo.tipo.toLowerCase().localeCompare("bool") == 0 || campo.tipo.toLowerCase().localeCompare("bit") == 0) {
          iniciacionVariable += tabsText + 'var ' + variable.nombre + 'NU3V0 = false;';
          iniciacionVariable += '\n' + tabsText + 'var ' + variable.nombre + 'GU4RD4RV4L0R = false;';
        }

        if (campo.tipo.toLowerCase().localeCompare("numero") == 0 || campo.tipo.toLowerCase().localeCompare("int") == 0 || campo.tipo.toLowerCase().localeCompare("decimal") == 0) {
          iniciacionVariable += tabsText + 'var ' + variable.nombre + 'NU3V0 = -1;';
          iniciacionVariable += '\n' + tabsText + 'var ' + variable.nombre + 'GU4RD4RV4L0R = false;';
        }

        if (campo.tipo.toLowerCase().localeCompare("cadena") == 0 || campo.tipo.toLowerCase().localeCompare("varchar") == 0) {
          iniciacionVariable += tabsText + 'var ' + variable.nombre + 'NU3V0 = "";';
          iniciacionVariable += '\n' + tabsText + 'var ' + variable.nombre + 'GU4RD4RV4L0R = false;';
        }

        if (esPromedio) {
          iniciacionVariable += '\n' + tabsText + "var " + variable.nombre + 'NU3V0T0T4L = 0;';
        }
      } else if ((variable.esObjeto || variable.esInstruccionSQL) && esOperacionSQL) {
        if (campo.tipo.toLowerCase().localeCompare("date") == 0) {
          iniciacionVariable += tabsText + "var " + variable.nombre + campo.nombre + 'NU3V0 = new Date(1964, 4, 28);'; //POPS BIRTHDAY == null
        }

        if (campo.tipo.toLowerCase().localeCompare("bool") == 0 || campo.tipo.toLowerCase().localeCompare("bit") == 0) {
          iniciacionVariable += tabsText + "var " + variable.nombre + campo.nombre + 'NU3V0 = false;';
        }

        if (campo.tipo.toLowerCase().localeCompare("numero") == 0 || campo.tipo.toLowerCase().localeCompare("int") == 0 || campo.tipo.toLowerCase().localeCompare("decimal") == 0) {
          iniciacionVariable += tabsText + "var " + variable.nombre + campo.nombre + 'NU3V0 = -1;';
        }

        if (campo.tipo.toLowerCase().localeCompare("cadena") == 0 || campo.tipo.toLowerCase().localeCompare("varchar") == 0) {
          iniciacionVariable += tabsText + "var " + variable.nombre + campo.nombre + 'NU3V0 = "";';
        }

        if (esPromedio) {
          iniciacionVariable += '\n' + tabsText + "var " + variable.nombre + campo.nombre + 'NU3V0T0T4L = 0;';
        }
      } else {
        if (campo.tipo.toLowerCase().localeCompare("date") == 0) {
          iniciacionVariable += tabsText + variable.nombre + 'NU3V0.' + campo.nombre + ' = new Date(1964, 4, 28);'; //POPS BIRTHDAY == null
        }

        if (campo.tipo.toLowerCase().localeCompare("bool") == 0 || campo.tipo.toLowerCase().localeCompare("bit") == 0) {
          iniciacionVariable += tabsText + variable.nombre + 'NU3V0.' + campo.nombre + ' = false;';
        }

        if (campo.tipo.toLowerCase().localeCompare("numero") == 0 || campo.tipo.toLowerCase().localeCompare("int") == 0 || campo.tipo.toLowerCase().localeCompare("decimal") == 0) {
          iniciacionVariable += tabsText + variable.nombre + 'NU3V0.' + campo.nombre + ' = -1;';
        }

        if (campo.tipo.toLowerCase().localeCompare("cadena") == 0 || campo.tipo.toLowerCase().localeCompare("varchar") == 0) {
          iniciacionVariable += tabsText + variable.nombre + 'NU3V0.' + campo.nombre + ' = "";';
        }
      }

      return iniciacionVariable;
    }
  }, {
    key: "crearCodigoFuenteDato",
    value: function crearCodigoFuenteDato(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorConexionATabla, nivelACrear) {
      //la creacion del codigo en esta parte pertenece a los campos que tienen asignacion unica de columna de tabla, y asignacion unica de columna de tabla con operacion como SUM, COUNT ect
      var codigo = '';

      for (var i = 0; i < arregloConexionesATablas.length; i++) {
        var variablesInstanciadasID = [],
            variablesGuardadasID = [];

        if (!arregloConexionesATablas[i].esInstruccionSQL && arregloAgrupacionElementosFormulaPorConexionATabla[i] != undefined) {
          var codigoCuerpo = '';
          var codigoIniciacionVarPrimitiva = '';
          var codigoGuardarVariables = '';
          var codigoGuardarVariableOperacionSQL = '';

          for (var j = 0; j < arregloAgrupacionElementosFormulaPorConexionATabla[i].length; j++) {
            if (arregloConexionesATablas[i].ID == arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.conexionTablaID && arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.realizarCalculo) {
              if (j == 0) {
                //solo crear codigo for una vez por variable
                codigoCuerpo += '\n\t//CODIGO TABLA: ' + arregloConexionesATablas[i].nombre;
                codigoCuerpo += '\n\tfor ( var i = ' + i + '; i < ' + (i + 1) + '; i++) {';
                codigoCuerpo += '\n\t\tfor ( var x = 0; x < arregloResultadosDeTablas[i].length; x++) {';
              }

              var varFueInicializada = false;

              for (var w = 0; w < variablesInstanciadasID.length; w++) {
                if (variablesInstanciadasID[w] == arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.ID) {
                  varFueInicializada = true;
                  break;
                }
              }

              ;
              /*if(!varFueInicializada) {
                  variablesInstanciadasID.push(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.ID);*/

              if (arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.esObjeto) {
                if (!varFueInicializada) {
                  variablesInstanciadasID.push(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.ID);
                  codigoCuerpo += '\n\t\t\t//INICIACION VARIABLE: ' + arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre;
                  codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable, "variable", {}, '\t\t\t'); //variable, tipoVariable, atributo
                } //for (var p = 0; p < arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.atributos.length; p++) {


                var contieneOperacionSQL = false,
                    esPromedio = false; //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)

                if (this.existeOperacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length - 1].operacion)) contieneOperacionSQL = true;
                if (arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") == 0) esPromedio = true;
                if (!contieneOperacionSQL) codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo, '\t\t\t', false, esPromedio);else {
                  codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo, '\t\t\t', false, false);
                  codigoIniciacionVarPrimitiva += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo, '\t', true, esPromedio);
                } //};
              } else {
                codigoIniciacionVarPrimitiva += '\n\t//INICIACION VARIABLE: ' + arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre;

                for (var p = 0; p < arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.atributos.length; p++) {
                  var esPromedio = false;
                  if (arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") == 0) esPromedio = true;
                  codigoIniciacionVarPrimitiva += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.atributos[p], '\t', false, esPromedio);
                }

                ;
              } //}


              if (arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nivel == nivelACrear) {
                var posicionVariable = 0,
                    posicionCampo = 0;

                EncontrarPosiciones: for (var a = 0; a < arregloDeVariables.length; a++) {
                  if (arregloDeVariables[a].ID == arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.ID) {
                    posicionVariable = a;

                    for (var b = 0; b < arregloDeVariables[a].atributos.length; b++) {
                      if (arregloDeVariables[a].atributos[b].ID == arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.ID) {
                        posicionCampo = b;
                        break EncontrarPosiciones;
                      }
                    }

                    ;
                  }
                }

                ;
                var esArregloReferenciaArregloEnCodigo = arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.esObjeto;
                codigoCuerpo += this.crearCodigoSegmentoReglas(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla, arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas, 3, posicionVariable, posicionCampo, "arregloResultadosDeTablas[i]", true);
              }

              var varFueGuardada = false;

              for (var w = 0; w < variablesGuardadasID.length; w++) {
                if (variablesGuardadasID[w] == arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.ID) {
                  varFueGuardada = true;
                  break;
                }
              }

              ;

              if (!varFueGuardada) {
                variablesGuardadasID.push(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.ID);
                codigoGuardarVariables += this.agregarCodigoGuardarVariable(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable, arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributos, 3);
              } //for (var p = 0; p < arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.atributos.length; p++) {


              if (arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.esObjeto || arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.esInstruccionSQL) {
                var contieneOperacionSQL = false; //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)

                if (this.existeOperacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length - 1].operacion)) contieneOperacionSQL = true;
                if (contieneOperacionSQL && arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") != 0) codigoGuardarVariableOperacionSQL += '\n\tguardarOperacionSQL(window["' + arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre + '"], "' + arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre + '", ' + arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre + arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre + 'NU3V0);';else if (contieneOperacionSQL && arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") == 0) {
                  codigoGuardarVariableOperacionSQL += '\n\tif(' + arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre + arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre + 'NU3V0T0T4L != 0 || ' + arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre + arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre + 'NU3V0T0T4L != -1) {';
                  codigoGuardarVariableOperacionSQL += '\n\t\tvar total = ' + arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre + arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre + 'NU3V0/' + arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre + arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre + 'NU3V0T0T4L;';
                  codigoGuardarVariableOperacionSQL += '\n\t\tguardarOperacionSQL(window["' + arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre + '"], "' + arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre + '", total);';
                  codigoGuardarVariableOperacionSQL += '\n\t}';
                }
              } else if (!arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.esObjeto && !arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.esInstruccionSQL && arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") == 0) {
                codigoGuardarVariableOperacionSQL += '\n\tvar total = ' + arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre + 'NU3V0/' + arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre + 'NU3V0T0T4L;';
                codigoGuardarVariableOperacionSQL += '\n\twindow["' + arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre + '"] = total;';
              } //};
              //}


              if (j == arregloAgrupacionElementosFormulaPorConexionATabla[i].length - 1) {
                codigoCuerpo += codigoGuardarVariables; //solo crear codigo for una vez por variable

                codigoCuerpo += '\n\t\t};';
                codigoCuerpo += '\n\t};\n';
                codigo += codigoIniciacionVarPrimitiva + codigoCuerpo + codigoGuardarVariableOperacionSQL;
              }
            }
          }

          ;
        }
      }

      ;
      /*console.log('codigo');
      console.log(codigo);*/

      return codigo;
    }
  }, {
    key: "crearCodigoFuenteDatoSQL",
    value: function crearCodigoFuenteDatoSQL() {
      //sacar total variables SQL
      var contadorSQLTotal = 0;

      for (var a = 0; a < arregloDeVariables.length; a++) {
        if (arregloDeVariables[a].esInstruccionSQL) {
          contadorSQLTotal++;
        }
      }

      ; //crear arreglo de siguientes llamadas de metodos de variables SQL
      //la creacion del codigo en esta parte pertenece a las variables que ocupan calculo sql

      var codigo = '';
      var contadorSQL = 0;

      for (var a = 0; a < arregloDeVariables.length; a++) {
        if (arregloDeVariables[a].esInstruccionSQL) {
          var siguienteMetodo;
          contadorSQL++;

          if (contadorSQL == contadorSQLTotal) {
            siguienteMetodo = "window['calculoPrincipal'](evaluate, iniciarCalculoIndicadores, isValidDate, guardarOperacionSQL)";
          } else {
            siguienteMetodo = "window['calculoSQL" + arregloDeVariables[a + 1].nombre + "'](sql, pool, evaluate, iniciarCalculoIndicadores, isValidDate, guardarOperacionSQL)";
          }

          codigo = this.crearCodigoSQL(arregloDeVariables[a], siguienteMetodo);
          window['calculoSQL' + arregloDeVariables[a].nombre] = new Function('return function calculoSQL' + arregloDeVariables[a].nombre + '(sql, pool, evaluate, iniciarCalculoIndicadores, isValidDate, guardarOperacionSQL){' + codigo + '\n}')();
          console.log(window['calculoSQL' + arregloDeVariables[a].nombre]);
        }
      }

      ;
      return codigo;
    }
  }, {
    key: "crearCodigoSQL",
    value: function crearCodigoSQL(variable, siguienteMetodo) {
      var codigo = '';
      codigo += "\nconst transaction = new sql.Transaction( pool );";
      codigo += "\ntransaction.begin(err => {";
      codigo += "\n\tvar rolledBack = false;";
      codigo += "\n\ttransaction.on('rollback', aborted => {";
      codigo += "\n\t\trolledBack = true;";
      codigo += "\n\t});";
      codigo += "\n\tconst request = new sql.Request(transaction);";
      codigo += '\n\trequest.query("' + variable.instruccionSQL.instruccionSQL + '", (err, result) => {';
      codigo += "\n\t\tif (err) {";
      codigo += "\n\t\t\tif (!rolledBack) {";
      codigo += "\n\t\t\t\tconsole.log(err);";
      codigo += "\n\t\t\t\ttransaction.rollback(err => {";
      codigo += "\n\t\t\t\t});";
      codigo += '\n\t\t\t\t' + siguienteMetodo + ';';
      codigo += "\n\t\t\t}";
      codigo += "\n\t\t} else {";
      codigo += "\n\t\t\ttransaction.commit(err => {";
      codigo += "\n\t\t\t\tfor(var i = 0; i < result.recordset.length; i++) {";
      codigo += '\n\t\t\t\t\t//INICIACION VARIABLE: ' + variable.nombre;
      codigo += '\n' + this.codigoIniciacion(variable, "variable", {}, '\t\t\t\t\t');

      for (var p = 0; p < variable.atributos.length; p++) {
        codigo += '\n' + this.codigoIniciacion(variable, "atributo", variable.atributos[p], '\t\t\t\t\t');
      }

      ;
      codigo += '\n\t\t\t\t\t//var insertoValor = false;';

      for (var i = 0; i < variable.atributos.length; i++) {
        codigo += "\n\t\t\t\t\tif (result.recordset[i]." + variable.atributos[i].nombre + " != undefined ) {";
        codigo += "\n\t\t\t\t\t\t" + variable.nombre + "NU3V0." + variable.atributos[i].nombre + " = result.recordset[i]." + variable.atributos[i].nombre + ";";
        codigo += "\n\t\t\t\t\t\t" + variable.nombre + "GU4RD4RV4L0R = true;";
        codigo += "\n\t\t\t\t\t}";
      }

      ;
      codigo += '\n\t\t\t\t\tif (' + variable.nombre + 'GU4RD4RV4L0R) {';
      codigo += '\n\t\t\t\t\t\twindow["' + variable.nombre + '"].push(' + variable.nombre + 'NU3V0);';
      codigo += '\n\t\t\t\t\t}';
      codigo += '\n\t\t\t\t};';
      /*codigo += '\n\t\t\t\tconsole.log("window["variable.nombre"]");';
      codigo += '\n\t\t\t\tconsole.log(window["'+variable.nombre+'"]);';
      codigo += '\n\t\t\t\tconsole.log("result.recordset");';
      codigo += '\n\t\t\t\tconsole.log(result.recordset);';*/

      codigo += '\n\t\t\t\t' + siguienteMetodo + ';';
      codigo += "\n\t\t\t});";
      codigo += "\n\t\t}";
      codigo += "\n\t});";
      codigo += "\n});"; // fin transaction

      return codigo;
    }
  }, {
    key: "crearCodigoSegmentoReglas",
    value: function crearCodigoSegmentoReglas(segmentoReglas, reglas, tabs, posicionVariable, posicionCampo, nombreReferenciaArregloEnCodigo, esArregloReferenciaArregloEnCodigo) {
      var codigo = '';
      var tabsText = '';

      for (var i = 0; i < tabs; i++) {
        tabsText += '\t';
      }

      ;

      for (var n = 0; n < reglas.length; n++) {
        if (reglas[n].reglaPadreID == -1 && reglas[n].operacion.localeCompare("ELSE") != 0) {
          var resultado = this.arregloCodigoRegla(reglas[n], tabs, posicionVariable, posicionCampo, [], reglas, nombreReferenciaArregloEnCodigo, esArregloReferenciaArregloEnCodigo);
          if (resultado.length > 0) resultado[0].codigo = "\n" + resultado[0].codigo; //$.merge( prestamosCuerpo, resultado );

          for (var i = 0; i < resultado.length; i++) {
            codigo += resultado[i].codigo;
          }

          ;
        }
      }

      ;
      return codigo;
    }
  }, {
    key: "crearCodigoSegmentoReglasFormaOExcel",
    value: function crearCodigoSegmentoReglasFormaOExcel(segmentoReglas, reglas, tabs, posicionVariable, posicionCampo, nombreReferenciaArregloEnCodigo, esExcel) {
      var codigo = '';
      var tabsText = '';

      for (var i = 0; i < tabs; i++) {
        tabsText += '\t';
      }

      ;

      for (var n = 0; n < reglas.length; n++) {
        if (reglas[n].reglaPadreID == -1 && reglas[n].operacion.localeCompare("ELSE") != 0) {
          var resultado = this.arregloCodigoReglaFormaOExcel(reglas[n], tabs, posicionVariable, posicionCampo, [], reglas, nombreReferenciaArregloEnCodigo, esExcel);
          if (resultado.length > 0) resultado[0].codigo = "\n" + resultado[0].codigo; //$.merge( prestamosCuerpo, resultado );

          for (var i = 0; i < resultado.length; i++) {
            codigo += resultado[i].codigo;
          }

          ;
        }
      }

      ;
      return codigo;
    }
  }, {
    key: "agregarCodigoGuardarVariable",
    value: function agregarCodigoGuardarVariable(variable, campo, tabs) {
      var codigo = '';
      var tabsText = '';

      for (var i = 0; i < tabs; i++) {
        tabsText += '\t';
      }

      ; //ver si elementoFormula es asignacion de columna
      //for (var i = 0; i < elementoFormula.length; i++) {
      //if (elementoFormula[i].operacion.toLowerCase().localeCompare("asig") == 0) {

      codigo += '\n' + tabsText + 'if (' + variable.nombre + 'GU4RD4RV4L0R' + ') {'; //codigo += '\n'+tabsText+'\tconsole.log('+variable.nombre+'NU3V0);';

      if (variable.esObjeto) {
        codigo += '\n' + tabsText + '\twindow["' + variable.nombre + '"].push(' + variable.nombre + 'NU3V0);';
      } else {
        codigo += '\n' + tabsText + '\twindow["' + variable.nombre + '"] = ' + variable.nombre + 'NU3V0;';
      }

      codigo += '\n' + tabsText + '}'; //}
      //};

      return codigo;
    }
  }, {
    key: "crearNivel",
    value: function crearNivel(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorVariables, nivelACrear) {
      //arregloAgrupacionElementosFormulaPorVariables contiene todas las variables que se calculan a base de otras variables
      //cada posicion nivel 0 representa la posicion de la variable en el arreglo de variables
      //cada posicion nivel 1 tiene la variable de la cual se va a calcular, el campo, la variable a crear y el segmento que pertenece a la variable de la cual se va a calcular
      var codigo = '';

      for (var i = 0; i < arregloDeVariables.length; i++) {
        var variablesInstanciadasID = [],
            variablesGuardadasID = [];

        if (
        /*!arregloDeVariables[i].esInstruccionSQL &&*/
        arregloAgrupacionElementosFormulaPorVariables[i] != undefined) {
          var totalVarACrearNivel = 0;

          for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariables[i].length; j++) {
            if (arregloAgrupacionElementosFormulaPorVariables[i][j] != undefined && arregloAgrupacionElementosFormulaPorVariables[i][j].length == undefined && arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nivel == nivelACrear) {
              totalVarACrearNivel++;
            }
          }

          ;
          var codigoCuerpo = '';
          var codigoIniciacionVarPrimitiva = '';
          var codigoGuardarVariables = '';
          var totalVarCreadasNivel = 0;
          var codigoGuardarVariableOperacionSQL = '';

          for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariables[i].length; j++) {
            //arregloAgrupacionElementosFormulaPorVariables[i][j].length == undefined --- para ver si no son varias variables de excel
            if (arregloAgrupacionElementosFormulaPorVariables[i][j] != undefined && arregloAgrupacionElementosFormulaPorVariables[i][j].length == undefined && arregloAgrupacionElementosFormulaPorVariables[i][j].length == undefined && arregloDeVariables[i].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].variableCreacionCodigo.ID && arregloDeVariables[i].nombre.localeCompare(arregloAgrupacionElementosFormulaPorVariables[i][j].variableCreacionCodigo.nombre) == 0 && arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nivel == nivelACrear && arregloAgrupacionElementosFormulaPorVariables[i][j].variable.realizarCalculo) {
              //segundo es para ver si no es arregloAgrupacionElementosFormulaPorVariables de excel
              totalVarCreadasNivel++;

              if (j == 0 && (arregloDeVariables[i].esObjeto || arregloDeVariables[i].esInstruccionSQL) && !arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.esValorManual) {
                //solo crear codigo for una vez por variable
                codigoCuerpo += '\n\t//CODIGO VARIABLE: ' + arregloDeVariables[i].nombre;
                codigoCuerpo += '\n\tfor ( var x = 0; x < window["' + arregloDeVariables[i].nombre + '"].length; x++) {';
              }

              var varFueInicializada = false;

              for (var w = 0; w < variablesInstanciadasID.length; w++) {
                if (variablesInstanciadasID[w] == arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID) {
                  varFueInicializada = true;
                  break;
                }
              }

              ;
              /*if(!varFueInicializada) {
                  variablesInstanciadasID.push(arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID);*/

              if (arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esObjeto) {
                if (!varFueInicializada) {
                  variablesInstanciadasID.push(arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID);
                  codigoCuerpo += '\n\t\t//INICIACION VARIABLE: ' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre;
                  codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "variable", {}, '\t\t'); //variable, tipoVariable, atributo
                } //for (var p = 0; p < arregloAgrupacionElementosFormulaPorVariables[i][j].variable.atributos.length; p++) {


                var contieneOperacionSQL = false,
                    esPromedio = false; //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)

                if (this.existeOperacion(arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length - 1].operacion)) contieneOperacionSQL = true;
                if (arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") == 0) esPromedio = true;
                if (!contieneOperacionSQL) codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][j].atributo, '\t\t', false, esPromedio);else {
                  codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][j].atributo, '\t\t', false, false);
                  codigoIniciacionVarPrimitiva += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][j].atributo, '\t', true, esPromedio);
                } //};
              } else {
                codigoIniciacionVarPrimitiva += '\n\t//INICIACION VARIABLE: ' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre;

                for (var p = 0; p < arregloAgrupacionElementosFormulaPorVariables[i][j].variable.atributos.length; p++) {
                  var esPromedio = false;
                  if (arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") == 0) esPromedio = true;
                  codigoIniciacionVarPrimitiva += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][j].variable.atributos[p], '\t', false, esPromedio);
                }

                ;
              } //}
              //if(arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nivel == nivelACrear) {


              var posicionVariable = 0,
                  posicionCampo = 0;

              EncontrarPosiciones: for (var a = 0; a < arregloDeVariables.length; a++) {
                if (arregloDeVariables[a].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID) {
                  posicionVariable = a;

                  for (var b = 0; b < arregloDeVariables[a].atributos.length; b++) {
                    if (arregloDeVariables[a].atributos[b].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.ID) {
                      posicionCampo = b;
                      break EncontrarPosiciones;
                    }
                  }

                  ;
                }
              }

              ;
              var esArregloReferenciaArregloEnCodigo = false;
              if (arregloDeVariables[i].esObjeto || arregloDeVariables[i].esInstruccionSQL) esArregloReferenciaArregloEnCodigo = true;
              codigoCuerpo += this.crearCodigoSegmentoReglas(arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla, arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas, 2, posicionVariable, posicionCampo, 'window["' + arregloDeVariables[i].nombre + '"]', esArregloReferenciaArregloEnCodigo); //}

              var varFueGuardada = false;

              for (var w = 0; w < variablesGuardadasID.length; w++) {
                if (variablesGuardadasID[w] == arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID) {
                  varFueGuardada = true;
                  break;
                }
              }

              ;

              if (!varFueGuardada) {
                variablesGuardadasID.push(arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID);
                codigoGuardarVariables += this.agregarCodigoGuardarVariable(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, arregloAgrupacionElementosFormulaPorVariables[i][j].atributos, 2);
              } //for (var p = 0; p < arregloAgrupacionElementosFormulaPorVariables[i][j].variable.atributos.length; p++) {


              if (arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esObjeto || arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esInstruccionSQL) {
                var contieneOperacionSQL = false; //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)

                if (this.existeOperacion(arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length - 1].operacion)) contieneOperacionSQL = true;
                if (contieneOperacionSQL && arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") != 0) codigoGuardarVariableOperacionSQL += '\n\tguardarOperacionSQL(window["' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + '"], "' + arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre + '", ' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre + 'NU3V0);';else if (contieneOperacionSQL && arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") == 0) {
                  //NU3V0T0T4L
                  codigoGuardarVariableOperacionSQL += '\n\tif(' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre + 'NU3V0T0T4L != 0 || ' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre + 'NU3V0T0T4L != -1) {';
                  codigoGuardarVariableOperacionSQL += '\n\t\tvar total = ' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre + 'NU3V0/' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre + 'NU3V0T0T4L;';
                  codigoGuardarVariableOperacionSQL += '\n\t\tguardarOperacionSQL(window["' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + '"], "' + arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre + '", total);';
                  codigoGuardarVariableOperacionSQL += '\n\t}';
                } else if (!arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esObjeto && !arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esInstruccionSQL && arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") == 0) {
                  codigoGuardarVariableOperacionSQL += '\n\tvar total = ' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + 'NU3V0/' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + 'NU3V0T0T4L;';
                  codigoGuardarVariableOperacionSQL += '\n\twindow["' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + '"] = total;';
                }
              } //};
              //}


              if (totalVarCreadasNivel == totalVarACrearNivel) {
                codigoCuerpo += codigoGuardarVariables; //solo crear codigo for una vez por variable

                if ((arregloDeVariables[i].esObjeto || arregloDeVariables[i].esInstruccionSQL) && !arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.esValorManual) codigoCuerpo += '\n\t};\n';
                codigo += codigoIniciacionVarPrimitiva + codigoCuerpo + codigoGuardarVariableOperacionSQL;
              }
            }
          }

          ;
        }
      }

      ;

      for (var i = 0; i < arregloDeFormas.length; i++) {
        var variablesInstanciadasID = [],
            variablesGuardadasID = [];

        if (arregloAgrupacionElementosFormulaPorVariables[i] != undefined) {
          var totalVarACrearNivel = 0;

          for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariables[i].length; j++) {
            if (arregloAgrupacionElementosFormulaPorVariables[i][j] != undefined && arregloAgrupacionElementosFormulaPorVariables[i][j].length == undefined && arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nivel == nivelACrear) {
              totalVarACrearNivel++;
            }
          }

          ;
          var codigoCuerpo = '';
          var codigoIniciacionVarPrimitiva = '';
          var codigoGuardarVariables = '';
          var totalVarCreadasNivel = 0;
          var codigoGuardarVariableOperacionSQL = '';

          for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariables[i].length; j++) {
            if (arregloAgrupacionElementosFormulaPorVariables[i][j] != undefined && arregloAgrupacionElementosFormulaPorVariables[i][j].length == undefined && arregloDeFormas[i].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].variableCreacionCodigo.ID && this.verificarExistenciaErroresForma(arregloAgrupacionElementosFormulaPorVariables[i][j].variableCreacionCodigo) && arregloDeFormas[i].nombre.localeCompare(arregloAgrupacionElementosFormulaPorVariables[i][j].variableCreacionCodigo.nombre) == 0 && arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nivel == nivelACrear && arregloAgrupacionElementosFormulaPorVariables[i][j].variable.realizarCalculo) {
              //segundo es para ver si no es arregloAgrupacionElementosFormulaPorVariables de excel
              totalVarCreadasNivel++;
              /*if(j == 0) {
                  //solo crear codigo for una vez por variable
                  codigoCuerpo += '\n\t//CODIGO VARIABLE: '+arregloDeFormas[i].nombre;
                  codigoCuerpo += '\n\tfor ( var x = 0; x < window["'+arregloDeFormas[i].nombre+'"].length; x++) {';
              }*/

              var varFueInicializada = false;

              for (var w = 0; w < variablesInstanciadasID.length; w++) {
                if (variablesInstanciadasID[w] == arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID) {
                  varFueInicializada = true;
                  break;
                }
              }

              ;
              /*if(!varFueInicializada) {
                  variablesInstanciadasID.push(arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID);*/

              if (arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esObjeto) {
                if (!varFueInicializada) {
                  variablesInstanciadasID.push(arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID);
                  codigoCuerpo += '\n\t\t//INICIACION VARIABLE: ' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre;
                  codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "variable", {}, '\t\t'); //variable, tipoVariable, atributo
                } //for (var p = 0; p < arregloAgrupacionElementosFormulaPorVariables[i][j].variable.atributos.length; p++) {


                var contieneOperacionSQL = false,
                    esPromedio = false; //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)

                if (this.existeOperacion(arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length - 1].operacion)) contieneOperacionSQL = true;
                if (arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") == 0) esPromedio = true;
                if (!contieneOperacionSQL) codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][j].atributo, '\t\t', false, esPromedio);else {
                  codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][j].atributo, '\t\t', false, false);
                  codigoIniciacionVarPrimitiva += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][j].atributo, '\t', true, esPromedio);
                } //};
              } else {
                codigoIniciacionVarPrimitiva += '\n\t//INICIACION VARIABLE: ' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre;

                for (var p = 0; p < arregloAgrupacionElementosFormulaPorVariables[i][j].variable.atributos.length; p++) {
                  var esPromedio = false;
                  if (arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") == 0) esPromedio = true;
                  codigoIniciacionVarPrimitiva += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][j].variable.atributos[p], '\t', false, esPromedio);
                }

                ;
              } //}
              //if(arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nivel == nivelACrear) {


              var posicionVariable = 0,
                  posicionCampo = 0;

              EncontrarPosiciones: for (var a = 0; a < arregloDeVariables.length; a++) {
                if (arregloDeVariables[a].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID) {
                  posicionVariable = a;

                  for (var b = 0; b < arregloDeVariables[a].atributos.length; b++) {
                    if (arregloDeVariables[a].atributos[b].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.ID) {
                      posicionCampo = b;
                      break EncontrarPosiciones;
                    }
                  }

                  ;
                }
              }

              ;
              var esArregloReferenciaArregloEnCodigo = false;
              codigoCuerpo += this.crearCodigoSegmentoReglasFormaOExcel(arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla, arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas, 2, posicionVariable, posicionCampo, 'window["' + arregloDeFormas[i].nombre + '"]', false); //}

              var varFueGuardada = false;

              for (var w = 0; w < variablesGuardadasID.length; w++) {
                if (variablesGuardadasID[w] == arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID) {
                  varFueGuardada = true;
                  break;
                }
              }

              ;

              if (!varFueGuardada) {
                variablesGuardadasID.push(arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID);
                codigoGuardarVariables += this.agregarCodigoGuardarVariable(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, arregloAgrupacionElementosFormulaPorVariables[i][j].atributos, 2);
              } //for (var p = 0; p < arregloAgrupacionElementosFormulaPorVariables[i][j].variable.atributos.length; p++) {


              if (arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esObjeto || arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esInstruccionSQL) {
                var contieneOperacionSQL = false; //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)

                if (this.existeOperacion(arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length - 1].operacion)) contieneOperacionSQL = true;
                if (contieneOperacionSQL && arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") != 0) codigoGuardarVariableOperacionSQL += '\n\tguardarOperacionSQL(window["' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + '"], "' + arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre + '", ' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre + 'NU3V0);';else if (contieneOperacionSQL && arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") == 0) {
                  //NU3V0T0T4L
                  codigoGuardarVariableOperacionSQL += '\n\tif(' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre + 'NU3V0T0T4L != 0 || ' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre + 'NU3V0T0T4L != -1) {';
                  codigoGuardarVariableOperacionSQL += '\n\t\tvar total = ' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre + 'NU3V0/' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre + 'NU3V0T0T4L;';
                  codigoGuardarVariableOperacionSQL += '\n\t\tguardarOperacionSQL(window["' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + '"], "' + arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre + '", total);';
                  codigoGuardarVariableOperacionSQL += '\n\t}';
                } else if (!arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esObjeto && !arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esInstruccionSQL && arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") == 0) {
                  codigoGuardarVariableOperacionSQL += '\n\tvar total = ' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + 'NU3V0/' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + 'NU3V0T0T4L;';
                  codigoGuardarVariableOperacionSQL += '\n\twindow["' + arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre + '"] = total;';
                }
              } //};
              //}


              if (totalVarCreadasNivel == totalVarACrearNivel) {
                codigoCuerpo += codigoGuardarVariables; //solo crear codigo for una vez por variable

                /*if((arregloDeVariables[i].esObjeto || arregloDeVariables[i].esInstruccionSQL) && !arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.esValorManual)
                    codigoCuerpo += '\n\t};\n';*/

                codigo += codigoIniciacionVarPrimitiva + codigoCuerpo + codigoGuardarVariableOperacionSQL;
              }
            }
          }

          ;
        }
      }

      ;

      for (var i = 0; i < arregloDeExcel.length; i++) {
        for (var p = 0; p < arregloDeExcel[i].variables.length; p++) {
          var variablesInstanciadasID = [],
              variablesGuardadasID = [];

          if (arregloAgrupacionElementosFormulaPorVariables[i] != undefined && arregloAgrupacionElementosFormulaPorVariables[i][p] != undefined && arregloAgrupacionElementosFormulaPorVariables[i][p].length != undefined) {
            var totalVarACrearNivel = 0;

            for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariables[i][p].length; j++) {
              if (arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nivel == nivelACrear) {
                totalVarACrearNivel++;
              }
            }

            ;
            var codigoCuerpo = '';
            var codigoIniciacionVarPrimitiva = '';
            var codigoGuardarVariables = '';
            var totalVarCreadasNivel = 0;
            var codigoGuardarVariableOperacionSQL = '';

            for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariables[i][p].length; j++) {
              if (arregloDeExcel[i].variables[p].ID == arregloAgrupacionElementosFormulaPorVariables[i][p][j].variableCreacionCodigo.ID && !this.verificarExistenciaErroresExcel(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variableCreacionCodigo) && arregloDeExcel[i].variables[p].nombre.localeCompare(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variableCreacionCodigo.nombre) == 0 && arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nivel == nivelACrear && arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.realizarCalculo) {
                totalVarCreadasNivel++;

                if (j == 0 && window[arregloDeExcel[i].variables[p].nombre].length != undefined) {
                  //solo crear codigo for una vez por variable
                  codigoCuerpo += '\n\t//CODIGO VARIABLE: ' + arregloDeExcel[i].variables[p].nombre;
                  codigoCuerpo += '\n\tfor ( var x = 0; x < window["' + arregloDeExcel[i].variables[p].nombre + '"].length; x++) {';
                }

                var varFueInicializada = false;

                for (var w = 0; w < variablesInstanciadasID.length; w++) {
                  if (variablesInstanciadasID[w] == arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.ID) {
                    varFueInicializada = true;
                    break;
                  }
                }

                ;
                /*if(!varFueInicializada) {
                    variablesInstanciadasID.push(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.ID);*/

                if (arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.esObjeto) {
                  if (!varFueInicializada) {
                    variablesInstanciadasID.push(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.ID);
                    codigoCuerpo += '\n\t\t//INICIACION VARIABLE: ' + arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre;
                    codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable, "variable", {}, '\t\t'); //variable, tipoVariable, atributo
                  } //for (var p = 0; p < arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.atributos.length; p++) {


                  var contieneOperacionSQL = false,
                      esPromedio = false; //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)

                  if (this.existeOperacion(arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas.length - 1].operacion)) contieneOperacionSQL = true;
                  if (arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") == 0) esPromedio = true;
                  if (!contieneOperacionSQL) codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo, '\t\t', false, esPromedio);else {
                    codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo, '\t\t', false, false);
                    codigoIniciacionVarPrimitiva += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo, '\t', true, esPromedio);
                  } //};
                } else {
                  codigoIniciacionVarPrimitiva += '\n\t//INICIACION VARIABLE: ' + arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre;

                  for (var k = 0; k < arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.atributos.length; k++) {
                    var esPromedio = false;
                    if (arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") == 0) esPromedio = true;
                    codigoIniciacionVarPrimitiva += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.atributos[k], '\t', false, esPromedio);
                  }

                  ;
                } //}
                //if(arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nivel == nivelACrear) {


                var posicionVariable = 0,
                    posicionCampo = 0;

                EncontrarPosiciones: for (var a = 0; a < arregloDeVariables.length; a++) {
                  if (arregloDeVariables[a].ID == arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.ID) {
                    posicionVariable = a;

                    for (var b = 0; b < arregloDeVariables[a].atributos.length; b++) {
                      if (arregloDeVariables[a].atributos[b].ID == arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.ID) {
                        posicionCampo = b;
                        break EncontrarPosiciones;
                      }
                    }

                    ;
                  }
                }

                ;
                var esArregloReferenciaArregloEnCodigo = false;
                if (window[arregloDeExcel[i].variables[p].nombre].length != undefined) codigoCuerpo += this.crearCodigoSegmentoReglasFormaOExcel(arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla, arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas, 2, posicionVariable, posicionCampo, "window['" + arregloDeExcel[i].variables[p].nombre + "'][x]", true);else codigoCuerpo += this.crearCodigoSegmentoReglasFormaOExcel(arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla, arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas, 2, posicionVariable, posicionCampo, "window['" + arregloDeExcel[i].variables[p].nombre + "']", false); //}

                var varFueGuardada = false;

                for (var w = 0; w < variablesGuardadasID.length; w++) {
                  if (variablesGuardadasID[w] == arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.ID) {
                    varFueGuardada = true;
                    break;
                  }
                }

                ;

                if (!varFueGuardada) {
                  variablesGuardadasID.push(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.ID);
                  codigoGuardarVariables += this.agregarCodigoGuardarVariable(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable, arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributos, 2);
                } //for (var p = 0; p < arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.atributos.length; p++) {


                if (arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.esObjeto || arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.esInstruccionSQL) {
                  var contieneOperacionSQL = false; //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)

                  if (this.existeOperacion(arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas.length - 1].operacion)) contieneOperacionSQL = true;
                  if (contieneOperacionSQL && arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") != 0) codigoGuardarVariableOperacionSQL += '\n\tguardarOperacionSQL(window["' + arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre + '"], "' + arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre + '", ' + arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre + arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre + 'NU3V0);';else if (contieneOperacionSQL && arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") == 0) {
                    //NU3V0T0T4L
                    codigoGuardarVariableOperacionSQL += '\n\tif(' + arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre + arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre + 'NU3V0T0T4L != 0 || ' + arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre + arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre + 'NU3V0T0T4L != -1) {';
                    codigoGuardarVariableOperacionSQL += '\n\t\tvar total = ' + arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre + arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre + 'NU3V0/' + arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre + arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre + 'NU3V0T0T4L;';
                    codigoGuardarVariableOperacionSQL += '\n\t\tguardarOperacionSQL(window["' + arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre + '"], "' + arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre + '", total);';
                    codigoGuardarVariableOperacionSQL += '\n\t}';
                  } else if (!arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.esObjeto && !arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.esInstruccionSQL && arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas.length - 1].operacion.localeCompare("PROM") == 0) {
                    codigoGuardarVariableOperacionSQL += '\n\tvar total = ' + arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre + 'NU3V0/' + arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre + 'NU3V0T0T4L;';
                    codigoGuardarVariableOperacionSQL += '\n\twindow["' + arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre + '"] = total;';
                  }
                } //};
                //}


                if (totalVarCreadasNivel == totalVarACrearNivel) {
                  codigoCuerpo += codigoGuardarVariables; //solo crear codigo for una vez por variable

                  if (window[arregloDeExcel[i].variables[p].nombre].length != undefined) codigoCuerpo += '\n\t};\n';
                  codigo += codigoIniciacionVarPrimitiva + codigoCuerpo + codigoGuardarVariableOperacionSQL;
                }
              }
            }

            ;
          }
        }

        ;
      }

      ;
      return codigo;
    }
  }, {
    key: "arregloCodigoRegla",
    value: function arregloCodigoRegla(regla, tabs, posicionVariable, posicionCampo, arreglo, arregloDeReglas, nombreReferenciaArregloEnCodigo, esArregloReferenciaArregloEnCodigo) {
      var tabsText = '';

      for (var i = 0; i < tabs; i++) {
        tabsText += '\t';
      }

      ;
      var posicionesIF = [];
      var newTabsTextFormula = '';

      if (!regla.esCondicion) {
        //asignaciones
        //si no es condicion, la variable de referencia se le agrega NU3V0 que hace referencia al objeto temporal vacio
        if (regla.operacion.indexOf('ASIG') == 0) {
          //trayendo formula correcta
          var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function (formula) {
            return regla.formulaID == formula.ID;
          });

          if (formula.length > 0) {
            //este tipo de operacion siempre sera una formula con un elemento de formula
            if (arregloDeVariables[posicionVariable].esObjeto) {
              if (esArregloReferenciaArregloEnCodigo) {
                if (formula[0].fuenteDeDatos != undefined && formula[0].fuenteDeDatos[0].esValorManual) {
                  arreglo.push({
                    codigo: tabsText + "if ('" + formula[0].fuenteDeDatos[0].nombreVariable + "' != undefined) {",
                    tipo: "ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0." + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + " = '" + formula[0].fuenteDeDatos[0].nombreVariable + "';",
                    tipo: "ASIG"
                  });
                } else {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined) {",
                    tipo: "ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0." + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + " = " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ";",
                    tipo: "ASIG"
                  });
                }
              } else {
                if (formula[0].fuenteDeDatos != undefined && formula[0].fuenteDeDatos[0].esValorManual) {
                  arreglo.push({
                    codigo: tabsText + "if ('" + formula[0].fuenteDeDatos[0].nombreVariable + "' != undefined) {",
                    tipo: "ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0." + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + " = '" + formula[0].fuenteDeDatos[0].nombreVariable + "';",
                    tipo: "ASIG"
                  });
                } else {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined) {",
                    tipo: "ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0." + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + " = " + nombreReferenciaArregloEnCodigo + ";",
                    tipo: "ASIG"
                  });
                }
              }
            } else {
              if (esArregloReferenciaArregloEnCodigo) {
                if (formula[0].fuenteDeDatos != undefined && formula[0].fuenteDeDatos[0].esValorManual) {
                  arreglo.push({
                    codigo: tabsText + "if ('" + formula[0].fuenteDeDatos[0].nombreVariable + "' != undefined) {",
                    tipo: "ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = '" + formula[0].fuenteDeDatos[0].nombreVariable + "';",
                    tipo: "ASIG"
                  });
                } else {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined) {",
                    tipo: "ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ";",
                    tipo: "ASIG"
                  });
                }
              } else {
                if (formula[0].fuenteDeDatos != undefined && formula[0].fuenteDeDatos[0].esValorManual) {
                  arreglo.push({
                    codigo: tabsText + "if ('" + formula[0].fuenteDeDatos[0].nombreVariable + "' != undefined) {",
                    tipo: "ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = '" + formula[0].fuenteDeDatos[0].nombreVariable + "';",
                    tipo: "ASIG"
                  });
                } else {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined) {",
                    tipo: "ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = " + nombreReferenciaArregloEnCodigo + ";",
                    tipo: "ASIG"
                  });
                }
              }
            }

            arreglo.push({
              codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
              tipo: "BANDERA_ASIG"
            });
            arreglo.push({
              codigo: "\n" + tabsText + "}",
              tipo: "ASIG"
            });
            /*arreglo.push({codigo: "\n"+tabsText+"} else {\n", tipo: "ASIG"});
            arreglo.push({codigo: "\n"+tabsText+"\tarregloDeErroresVariables.push({nombre: nombreVariable, ID: id})\n", tipo: "ASIG"});
            arreglo.push({codigo: "\n"+tabsText+"} else {", tipo: "ASIG"});*/
          }
        } else if (regla.operacion.indexOf('MAX') == 0) {
          //trayendo formula correcta
          var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function (formula) {
            return regla.formulaID == formula.ID;
          });

          if (formula.length > 0) {
            //este tipo de operacion siempre sera una formula con un elemento de formula
            if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0) {
              if (arregloDeVariables[posicionVariable].esObjeto) {
                if (esArregloReferenciaArregloEnCodigo) {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if ( isValidDate(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ") ) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getTime() < " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ".getTime()) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ");",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if( window['" + arregloDeVariables[posicionVariable].nombre + "'].length == 0)",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getFullYear() == 1964 && " + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getMonth() == 4 && " + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getDate() == 28 )",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ");",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                } else {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if ( isValidDate(" + nombreReferenciaArregloEnCodigo + ") ) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getTime() < " + nombreReferenciaArregloEnCodigo + ".getTime()) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + ");",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if( window['" + arregloDeVariables[posicionVariable].nombre + "'].length == 0)",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getFullYear() == 1964 && " + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getMonth() == 4 && " + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getDate() == 28 )",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + ");",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                }
              } else {
                if (esArregloReferenciaArregloEnCodigo) {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if ( isValidDate(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ") ) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0.getTime() < " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ".getTime()) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ");",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0.getFullYear() == 1964 && " + arregloDeVariables[posicionVariable].nombre + "NU3V0.getMonth() == 4 && " + arregloDeVariables[posicionVariable].nombre + "NU3V0.getDate() == 28)",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ");",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                } else {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if ( isValidDate(" + nombreReferenciaArregloEnCodigo + ") ) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0.getTime() < " + nombreReferenciaArregloEnCodigo + ".getTime()) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + ");",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0.getFullYear() == 1964 && " + arregloDeVariables[posicionVariable].nombre + "NU3V0.getMonth() == 4 && " + arregloDeVariables[posicionVariable].nombre + "NU3V0.getDate() == 28)",
                    tipo: "MAX"
                  });
                  ;
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + ");",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                }
              }
            } else if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || arregloDeVariables[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("decimal") == 0) {
              if (arregloDeVariables[posicionVariable].esObjeto) {
                if (esArregloReferenciaArregloEnCodigo) {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ")) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 < " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ") {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ";",
                    tipo: "MAX"
                  }); //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                } else {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ")) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 < " + nombreReferenciaArregloEnCodigo + ") {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = " + nombreReferenciaArregloEnCodigo + ";",
                    tipo: "MAX"
                  }); //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                }
              } else {
                if (esArregloReferenciaArregloEnCodigo) {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ")) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 < " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ") {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ";",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                } else {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ")) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 < " + nombreReferenciaArregloEnCodigo + ") {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = " + nombreReferenciaArregloEnCodigo + ";",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                }
              }
            }
          }
        } else if (regla.operacion.indexOf('MIN') == 0) {
          //trayendo formula correcta
          var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function (formula) {
            return regla.formulaID == formula.ID;
          });

          if (formula.length > 0) {
            //este tipo de operacion siempre sera una formula con un elemento de formula
            if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0) {
              if (arregloDeVariables[posicionVariable].esObjeto) {
                if (esArregloReferenciaArregloEnCodigo) {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if ( isValidDate(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ") ) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getTime() > " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ".getTime()) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ");",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if( window['" + arregloDeVariables[posicionVariable].nombre + "'].length == 0)",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getFullYear() == 1964 && " + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getMonth() == 4 && " + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getDate() == 28)",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ");",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                } else {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if ( isValidDate(" + nombreReferenciaArregloEnCodigo + ") ) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getTime() > " + nombreReferenciaArregloEnCodigo + ".getTime()) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + ");",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if( window['" + arregloDeVariables[posicionVariable].nombre + "'].length == 0)",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getFullYear() == 1964 && " + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getMonth() == 4 && " + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getDate() == 28)",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + ");",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                }
              } else {
                if (esArregloReferenciaArregloEnCodigo) {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if ( isValidDate(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ") ) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0.getTime() > " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ".getTime()) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ");",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0.getFullYear() == 1964 && " + arregloDeVariables[posicionVariable].nombre + "NU3V0.getMonth() == 4 && " + arregloDeVariables[posicionVariable].nombre + "NU3V0.getDate() == 28)",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ");",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                } else {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if ( isValidDate(" + nombreReferenciaArregloEnCodigo + ") ) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0.getTime() > " + nombreReferenciaArregloEnCodigo + ".getTime()) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + ");",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0.getFullYear() == 1964 && " + arregloDeVariables[posicionVariable].nombre + "NU3V0.getMonth() == 4 && " + arregloDeVariables[posicionVariable].nombre + "NU3V0.getDate() == 28) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + ");",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                }
              }
            } else if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || arregloDeVariables[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("decimal") == 0) {
              if (arregloDeVariables[posicionVariable].esObjeto) {
                if (esArregloReferenciaArregloEnCodigo) {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ")) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 > " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " || " + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ";",
                    tipo: "MAX"
                  }); //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                } else {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ")) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 > " + nombreReferenciaArregloEnCodigo + " || " + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = " + nombreReferenciaArregloEnCodigo + ";",
                    tipo: "MAX"
                  }); //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                }
              } else {
                if (esArregloReferenciaArregloEnCodigo) {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ")) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 > " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ") {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ";",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "} else if( " + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1  ) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ";",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                } else {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ")) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 > " + nombreReferenciaArregloEnCodigo + ") {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = " + nombreReferenciaArregloEnCodigo + ";",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "} else if( " + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1 ) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = " + nombreReferenciaArregloEnCodigo + ";",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "}",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                }
              }
            }
          }
        } else if (regla.operacion.indexOf('PROM') == 0) {
          //trayendo formula correcta
          var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function (formula) {
            return regla.formulaID == formula.ID;
          });

          if (formula.length > 0) {
            //este tipo de operacion siempre sera una formula con un elemento de formula
            if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || arregloDeVariables[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("decimal") == 0) {
              if (arregloDeVariables[posicionVariable].esObjeto) {
                if (esArregloReferenciaArregloEnCodigo) {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ")) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if ( " + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1 )",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = 0;",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 += " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ";",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0T0T4L++;",
                    tipo: "MAX"
                  }); //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                } else {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ")) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if ( " + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1 )",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = 0;",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 += " + nombreReferenciaArregloEnCodigo + ";",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0T0T4L++;",
                    tipo: "MAX"
                  }); //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                }
              } else {
                if (esArregloReferenciaArregloEnCodigo) {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ")) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if ( " + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1 )",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = 0;",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 += " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ";",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0T0T4L++;",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                } else {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ")) {",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if ( " + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1 )",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = 0;",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 += " + nombreReferenciaArregloEnCodigo + ";",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0T0T4L++;",
                    tipo: "MAX"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "MAX"
                  });
                }
              }
            }
          }
        } else if (regla.operacion.indexOf('AUTOSUM') == 0) {
          //trayendo formula correcta
          var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function (formula) {
            return regla.formulaID == formula.ID;
          });

          if (formula.length > 0) {
            //este tipo de operacion siempre sera una formula con un elemento de formula
            if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("decimal") == 0) {
              if (arregloDeVariables[posicionVariable].esObjeto) {
                if (esArregloReferenciaArregloEnCodigo) {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ")) {",
                    tipo: "AUTOSUM"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1)",
                    tipo: "AUTOSUM"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = 0;",
                    tipo: "AUTOSUM"
                  }); //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = evaluate(" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 + " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ");",
                    tipo: "AUTOSUM"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "AUTOSUM"
                  });
                } else {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ")) {",
                    tipo: "AUTOSUM"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1)",
                    tipo: "AUTOSUM"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = 0;",
                    tipo: "AUTOSUM"
                  }); //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                  arreglo.push({
                    codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = evaluate(" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 + " + nombreReferenciaArregloEnCodigo + ");",
                    tipo: "AUTOSUM"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "AUTOSUM"
                  });
                }
              } else {
                if (esArregloReferenciaArregloEnCodigo) {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ")) {",
                    tipo: "AUTOSUM"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1)",
                    tipo: "AUTOSUM"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = 0;",
                    tipo: "AUTOSUM"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = evaluate(" + arregloDeVariables[posicionVariable].nombre + "NU3V0 + " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ");",
                    tipo: "AUTOSUM"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "AUTOSUM"
                  });
                } else {
                  arreglo.push({
                    codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ")) {",
                    tipo: "AUTOSUM"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1)",
                    tipo: "AUTOSUM"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = 0;",
                    tipo: "AUTOSUM"
                  });
                  arreglo.push({
                    codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                    tipo: "BANDERA_ASIG"
                  });
                  arreglo.push({
                    codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = evaluate(" + arregloDeVariables[posicionVariable].nombre + "NU3V0 + " + nombreReferenciaArregloEnCodigo + ");",
                    tipo: "AUTOSUM"
                  });
                  arreglo.push({
                    codigo: "\n" + tabsText + "}",
                    tipo: "AUTOSUM"
                  });
                }
              }
            }
          }
        } else if (regla.operacion.indexOf('COUNT') == 0) {
          var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function (formula) {
            return regla.formulaID == formula.ID;
          });

          if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("decimal") == 0) {
            if (arregloDeVariables[posicionVariable].esObjeto) {
              if (esArregloReferenciaArregloEnCodigo) {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ") ) {",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1 )",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = 0;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0++;",
                  tipo: "COUNT"
                }); //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "COUNT"
                });
              } else {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ") && !isNaN(" + nombreReferenciaArregloEnCodigo + ") ) {",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1 )",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = 0;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0++;",
                  tipo: "COUNT"
                }); //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "COUNT"
                });
              }
            } else {
              if (esArregloReferenciaArregloEnCodigo) {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ") ) {",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1 )",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = 0;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0++;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "COUNT"
                });
              } else {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ") ) {",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1 )",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = 0;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0++;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "COUNT"
                });
              }
            }
          } else if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("varchar") == 0) {
            if (arregloDeVariables[posicionVariable].esObjeto) {
              if (esArregloReferenciaArregloEnCodigo) {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined && " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ".length > 0) {",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1 )",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = 0;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0++;",
                  tipo: "COUNT"
                }); //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "COUNT"
                });
              } else {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && " + nombreReferenciaArregloEnCodigo + ".length > 0) {",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1 )",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = 0;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0++;",
                  tipo: "COUNT"
                }); //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "COUNT"
                });
              }
            } else {
              if (esArregloReferenciaArregloEnCodigo) {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined && " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ".length > 0) {",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1 )",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = 0;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0++;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "COUNT"
                });
              } else {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && " + nombreReferenciaArregloEnCodigo + ".length > 0) {",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1 )",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = 0;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0++;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "COUNT"
                });
              }
            }
          } else if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("bool") == 0) {
            if (arregloDeVariables[posicionVariable].esObjeto) {
              if (esArregloReferenciaArregloEnCodigo) {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined && (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " == true || " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " == false) ) {",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1 )",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = 0;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0++;",
                  tipo: "COUNT"
                }); //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "COUNT"
                });
              } else {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && (" + nombreReferenciaArregloEnCodigo + " == true || " + nombreReferenciaArregloEnCodigo + " == false) ) {",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1 )",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = 0;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0++;",
                  tipo: "COUNT"
                }); //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "COUNT"
                });
              }
            } else {
              if (esArregloReferenciaArregloEnCodigo) {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined && (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " == true || " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " == false) ) {",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1 )",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = 0;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0++;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "COUNT"
                });
              } else {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && (" + nombreReferenciaArregloEnCodigo + " == true || " + nombreReferenciaArregloEnCodigo + " == false) ) {",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1 )",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = 0;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0++;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "COUNT"
                });
              }
            }
          } else if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0) {
            if (arregloDeVariables[posicionVariable].esObjeto) {
              if (esArregloReferenciaArregloEnCodigo) {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined && isValidDate(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ") ) {",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1 )",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = 0;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0++;",
                  tipo: "COUNT"
                }); //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "COUNT"
                });
              } else {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && isValidDate(" + nombreReferenciaArregloEnCodigo + ") {",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1 )",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = 0;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0++;",
                  tipo: "COUNT"
                }); //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "COUNT"
                });
              }
            } else {
              if (esArregloReferenciaArregloEnCodigo) {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + " != undefined && isValidDate(" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[0].nombreColumnaEnTabla + ")) {",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1 )",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = 0;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0++;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "COUNT"
                });
              } else {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && isValidDate(" + nombreReferenciaArregloEnCodigo + ")) {",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1 )",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = 0;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0++;",
                  tipo: "COUNT"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "COUNT"
                });
              }
            }
          }
        } else if (regla.operacion.indexOf('FORMULA') == 0) {
          var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function (formula) {
            return regla.formulaID == formula.ID;
          });

          for (var i = 0; i < formula[0].fuenteDeDatos.length; i++) {
            var saltoLinea = '\n';

            if (formula[0].fuenteDeDatos[i].operacion != undefined && formula[0].fuenteDeDatos[i].operacion.length > 0) {
              //if(formula[0].fuenteDeDatos[i].esFuenteDeDato) {
              //elemento formula es de conexion de tabla
              if (esArregloReferenciaArregloEnCodigo) {
                arreglo.push({
                  codigo: saltoLinea + tabsText + newTabsTextFormula + "if (" + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[i].nombreColumnaEnTabla + " != undefined) {",
                  tipo: "FORMULA"
                });
                newTabsTextFormula += "\t";
                arreglo.push({
                  codigo: saltoLinea + tabsText + newTabsTextFormula + "var " + formula[0].fuenteDeDatos[i].nombreVariable + " = " + nombreReferenciaArregloEnCodigo + "[x]." + formula[0].fuenteDeDatos[i].nombreColumnaEnTabla + ";",
                  tipo: "FORMULA"
                });
                /*arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log('"+formula[0].fuenteDeDatos[i].nombreVariable+"');", tipo: "FORMULA"});
                arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log("+formula[0].fuenteDeDatos[i].nombreVariable+");", tipo: "FORMULA"});*/
              } else {
                arreglo.push({
                  codigo: saltoLinea + tabsText + newTabsTextFormula + "if (window['" + formula[0].fuenteDeDatos[i].nombreColumnaEnTabla + "'] != undefined) {",
                  tipo: "FORMULA"
                });
                newTabsTextFormula += "\t";
                arreglo.push({
                  codigo: saltoLinea + tabsText + newTabsTextFormula + "var " + formula[0].fuenteDeDatos[i].nombreVariable + " = window['" + formula[0].fuenteDeDatos[i].nombreColumnaEnTabla + "'];",
                  tipo: "FORMULA"
                });
                /*arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log('"+formula[0].fuenteDeDatos[i].nombreVariable+"');", tipo: "FORMULA"});
                arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log("+formula[0].fuenteDeDatos[i].nombreVariable+");", tipo: "FORMULA"});*/
              }
              /*} else {
                  if (!arregloDeVariables[posicionVariable].esObjeto) {
                      arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "FORMULA"});
                      newTabsTextFormula += "\t";
                      //elemento formula es variable primitiva
                      if(i > 0) {
                          arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+";", tipo: "FORMULA"});
                      } else {
                          arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+";", tipo: "FORMULA"});
                      }
                  } else {
                      arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" != undefined) {", tipo: "FORMULA"});
                      newTabsTextFormula += "\t";
                      if(i > 0) {
                          arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+"[x]."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+";", tipo: "FORMULA"});
                      } else {
                          arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+"[x]."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+";", tipo: "FORMULA"});
                      }
                  }
              }*/

            }
          }

          ; //arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" = math.eval(formula[0].formula);"});

          if (arregloDeVariables[posicionVariable].esObjeto) arreglo.push({
            codigo: "\n" + tabsText + newTabsTextFormula + arregloDeVariables[posicionVariable].nombre + "NU3V0." + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + " = " + formula[0].formula + ";"
          });else arreglo.push({
            codigo: "\n" + tabsText + newTabsTextFormula + arregloDeVariables[posicionVariable].nombre + "NU3V0 = evaluate(" + formula[0].formula + ");"
          });
          arreglo.push({
            codigo: "\n" + tabsText + newTabsTextFormula + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
            tipo: "BANDERA_ASIG"
          });

          for (var i = formula[0].fuenteDeDatos.length; i > 0; i--) {
            posicionesIF.push(arreglo.length + i);
          }
        }
      } else {
        //condiciones if
        var arregloValoresAComparar = [];

        if (regla.valor.indexOf("LISTAID") == 0) {//
        } else if (regla.valor.indexOf("FECHA") == 0) {
          var fecha = regla.valor.substring(regla.valor.indexOf("[") + 1, regla.valor.lastIndexOf("]"));
          arregloValoresAComparar = ["new Date(" + fecha + ").getTime()"];
        } else if (regla.valor.indexOf("TIEMPO") == 0) {
          var stringValores = regla.valor.substring(regla.valor.indexOf("[") + 1, regla.valor.lastIndexOf("]"));
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
        } else if (regla.valor.indexOf("MANUAL") == 0) {
          arregloValoresAComparar = [regla.valor.substring(regla.valor.indexOf("[") + 1, regla.valor.lastIndexOf("]"))];
        }

        var nombreCampoDeArregloEnCodigo = '';

        if (regla.esConexionTabla) {
          nombreCampoDeArregloEnCodigo = regla.nombreColumnaEnTabla;
        } else {
          nombreCampoDeArregloEnCodigo = arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre;
        }

        var tamArreglo = arreglo.length; //for (var j = 0; j < tamArreglo; j++) {

        for (var i = 0; i < arregloValoresAComparar.length; i++) {
          var comparacion = "";
          var inicioComparacion = "";
          var operacion = "";

          if (regla.operacion.localeCompare("ES_MENOR") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
            operacion = "<";
          } else if (regla.operacion.localeCompare("ES_MENOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
            operacion = "<=";
          } else if (regla.operacion.localeCompare("ES_MAYOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
            operacion = ">=";
          } else if (regla.operacion.localeCompare("ES_MAYOR") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
            operacion = ">";
          } else if (regla.operacion.localeCompare("ES_IGUAL") == 0) {
            operacion = "==";
          } else if (regla.operacion.localeCompare("NO_ES_IGUAL") == 0) {
            operacion = "!=";
          } else if (regla.operacion.localeCompare("ES_MENOR") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
            operacion = ">";
          } else if (regla.operacion.localeCompare("ES_MENOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
            operacion = ">=";
          } else if (regla.operacion.localeCompare("ES_MAYOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
            operacion = "<=";
          } else if (regla.operacion.localeCompare("ES_MAYOR") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
            operacion = "<";
          } else if (regla.operacion.localeCompare("ES_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
            operacion = "==";
          } else if (regla.operacion.localeCompare("NO_ES_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
            operacion = "!=";
          }

          if (regla.tipoCampoObjetivo.localeCompare("date") == 0) {
            if (regla.operacion.localeCompare("encuentra") == 0) {//
            } else if (regla.operacion.localeCompare("no_encuentra") == 0) {//
            } else {
              if (esArregloReferenciaArregloEnCodigo) {
                inicioComparacion = nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + " != undefined && isValidDate(" + nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + ")";
                comparacion = nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + ".getTime() " + operacion + " " + arregloValoresAComparar[i];
              } else {
                inicioComparacion = nombreReferenciaArregloEnCodigo + " != undefined && isValidDate(" + nombreReferenciaArregloEnCodigo + ")";
                comparacion = nombreReferenciaArregloEnCodigo + ".getTime() " + operacion + " " + arregloValoresAComparar[i];
              }
            }
          } else if (regla.tipoCampoObjetivo.localeCompare("varchar") == 0) {
            if (regla.operacion.localeCompare("encuentra") == 0) {//
            } else if (regla.operacion.localeCompare("no_encuentra") == 0) {//
            } else {
              if (esArregloReferenciaArregloEnCodigo) {
                inicioComparacion = nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + " != undefined";
                comparacion = nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + ".localeCompare('" + arregloValoresAComparar[i] + "') " + operacion + " 0";
              } else {
                inicioComparacion = nombreReferenciaArregloEnCodigo + " != undefined";
                comparacion = nombreReferenciaArregloEnCodigo + ".localeCompare('" + arregloValoresAComparar[i] + "') " + operacion + " 0";
              }
            }
          } else if (regla.tipoCampoObjetivo.localeCompare("int") == 0 || regla.tipoCampoObjetivo.localeCompare("decimal") == 0) {
            if (regla.operacion.localeCompare("encuentra") == 0) {//
            } else if (regla.operacion.localeCompare("no_encuentra") == 0) {//
            } else {
              if (esArregloReferenciaArregloEnCodigo) {
                inicioComparacion = nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + ")";
                comparacion = nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + " " + operacion + " " + arregloValoresAComparar[i];
              } else {
                inicioComparacion = nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ")";
                comparacion = nombreReferenciaArregloEnCodigo + " " + operacion + " " + arregloValoresAComparar[i];
              }
            }
          } else if (regla.tipoCampoObjetivo.localeCompare("bit") == 0) {
            if (esArregloReferenciaArregloEnCodigo) {
              inicioComparacion = nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + " != undefined";
              comparacion = nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + " " + operacion + " " + arregloValoresAComparar[i];
            } else {
              inicioComparacion = nombreReferenciaArregloEnCodigo + " != undefined";
              comparacion = nombreReferenciaArregloEnCodigo + " " + operacion + " " + arregloValoresAComparar[i];
            }
          }

          if (i + 1 == arregloValoresAComparar.length) {
            comparacion += " ) {";
          }

          if (i == 0) {
            //arreglo[j].codigo += comparacion;
            //arreglo.push({codigo: tabsText+"console.log("+nombreReferenciaArregloEnCodigo+"[x]);", tipo: "COMPARACION"});
            //arreglo.push({codigo: '\n'+tabsText+"console.log( "+nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+");", tipo: "COMPARACION"});
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

        posicionesIF.push(arreglo.length);
      }

      var cuerpo = arregloDeReglas.filter(function (object) {
        return object.reglaPadreID == regla.ID;
      });

      if (cuerpo.length > 0) {
        var arregloCuerpo = [];

        for (var i = 0; i < cuerpo.length; i++) {
          /*var cuantasTabs = tabs;
          if(regla.esCondicion)
              cuantasTabs++;*/
          var retorno = this.arregloCodigoRegla(cuerpo[i], tabs + 1, posicionVariable, posicionCampo, [], arregloDeReglas, nombreReferenciaArregloEnCodigo, esArregloReferenciaArregloEnCodigo);
          retorno[0].codigo = "\n" + retorno[0].codigo;
          $.merge(arregloCuerpo, retorno);
        }

        ;

        for (var i = 0; i < posicionesIF.length; i++) {
          arreglo.splice.apply(arreglo, [posicionesIF[i], 0].concat(arregloCuerpo));
          if (regla.esCondicion) arreglo.splice(posicionesIF[i] + arregloCuerpo.length, 0, {
            codigo: "\n" + tabsText + "}",
            filtro: regla.filtro
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
        if (regla.esCondicion || posicionesIF.length > 0) {
          for (var i = 0; i < posicionesIF.length; i++) {
            if (newTabsTextFormula.length > 0) newTabsTextFormula = newTabsTextFormula.substring(0, newTabsTextFormula.length - 1);
            arreglo.splice(posicionesIF[i], 0, {
              codigo: "\n" + tabsText + newTabsTextFormula + "}",
              filtro: regla.filtro
            });
          }

          ;
        }

        return arreglo;
      }
    }
  }, {
    key: "arregloCodigoReglaFormaOExcel",
    value: function arregloCodigoReglaFormaOExcel(regla, tabs, posicionVariable, posicionCampo, arreglo, arregloDeReglas, nombreReferenciaArregloEnCodigo, esArregloReferenciaArregloEnCodigo) {
      //a este metodo solo entra cuando la asignacion, max, min, ect es de solo variables formula o excel, o formulas solo es de excel o formulas
      var tabsText = '';

      for (var i = 0; i < tabs; i++) {
        tabsText += '\t';
      }

      ;
      var posicionesIF = [];
      var newTabsTextFormula = '';

      if (!regla.esCondicion) {
        //asignaciones
        //si no es condicion, la variable de referencia se le agrega NU3V0 que hace referencia al objeto temporal vacio
        if (regla.operacion.indexOf('ASIG') == 0) {
          //trayendo formula correcta
          var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function (formula) {
            return regla.formulaID == formula.ID;
          });

          if (formula.length > 0) {
            //este tipo de operacion siempre sera una formula con un elemento de formula
            if (arregloDeVariables[posicionVariable].esObjeto) {
              if (formula[0].fuenteDeDatos != undefined && formula[0].fuenteDeDatos[0].esValorManual) {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined) {",
                  tipo: "ASIG"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0." + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + " = '" + formula[0].fuenteDeDatos[0].nombreVariable + "';",
                  tipo: "ASIG"
                });
              } else {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined) {",
                  tipo: "ASIG"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0." + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + " = " + nombreReferenciaArregloEnCodigo + ";",
                  tipo: "ASIG"
                });
              }
            } else {
              if (formula[0].fuenteDeDatos != undefined && formula[0].fuenteDeDatos[0].esValorManual) {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined) {",
                  tipo: "ASIG"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = '" + formula[0].fuenteDeDatos[0].nombreVariable + "';",
                  tipo: "ASIG"
                });
              } else {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined) {",
                  tipo: "ASIG"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = " + nombreReferenciaArregloEnCodigo + ";",
                  tipo: "ASIG"
                });
              }
            }

            arreglo.push({
              codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
              tipo: "BANDERA_ASIG"
            });
            arreglo.push({
              codigo: "\n" + tabsText + "}",
              tipo: "ASIG"
            });
          }
        } else if (regla.operacion.indexOf('MAX') == 0) {
          //trayendo formula correcta
          var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function (formula) {
            return regla.formulaID == formula.ID;
          });

          if (formula.length > 0) {
            //este tipo de operacion siempre sera una formula con un elemento de formula
            if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0) {
              arreglo.push({
                codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined) {",
                tipo: "MAX"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + "if ( isValidDate(" + nombreReferenciaArregloEnCodigo + ") ) {",
                tipo: "MAX"
              });
              arreglo.push({
                codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0.getTime() < " + nombreReferenciaArregloEnCodigo + ".getTime()) {",
                tipo: "MAX"
              });
              arreglo.push({
                codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + ");",
                tipo: "MAX"
              });
              arreglo.push({
                codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                tipo: "BANDERA_ASIG"
              });
              arreglo.push({
                codigo: "\n\t\t" + tabsText + "}",
                tipo: "MAX"
              });
              arreglo.push({
                codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0.getFullYear() == 1964 && " + arregloDeVariables[posicionVariable].nombre + "NU3V0.getMonth() == 4 && " + arregloDeVariables[posicionVariable].nombre + "NU3V0.getDate() == 28)",
                tipo: "MAX"
              });
              ;
              arreglo.push({
                codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + ");",
                tipo: "MAX"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + "}",
                tipo: "MAX"
              });
              arreglo.push({
                codigo: "\n" + tabsText + "}",
                tipo: "MAX"
              });
            } else if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || arregloDeVariables[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("decimal") == 0) {
              if (arregloDeVariables[posicionVariable].esObjeto) {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ")) {",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 < " + nombreReferenciaArregloEnCodigo + ") {",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = " + nombreReferenciaArregloEnCodigo + ";",
                  tipo: "MAX"
                }); //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                arreglo.push({
                  codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "}",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "MAX"
                });
              } else {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ")) {",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 < " + nombreReferenciaArregloEnCodigo + ") {",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = " + nombreReferenciaArregloEnCodigo + ";",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "}",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "MAX"
                });
              }
            }
          }
        } else if (regla.operacion.indexOf('MIN') == 0) {
          //trayendo formula correcta
          var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function (formula) {
            return regla.formulaID == formula.ID;
          });

          if (formula.length > 0) {
            //este tipo de operacion siempre sera una formula con un elemento de formula
            if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0) {
              if (arregloDeVariables[posicionVariable].esObjeto) {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined) {",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if ( isValidDate(" + nombreReferenciaArregloEnCodigo + ") ) {",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getTime() > " + nombreReferenciaArregloEnCodigo + ".getTime()) {",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + ");",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + "if( window['" + arregloDeVariables[posicionVariable].nombre + "'].length == 0)",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + "}",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getFullYear() == 1964 && " + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getMonth() == 4 && " + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0.getDate() == 28)",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + ");",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "}",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "MAX"
                });
              } else {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined) {",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if ( isValidDate(" + nombreReferenciaArregloEnCodigo + ") ) {",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0.getTime() > " + nombreReferenciaArregloEnCodigo + ".getTime()) {",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + ");",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + "}",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0.getFullYear() == 1964 && " + arregloDeVariables[posicionVariable].nombre + "NU3V0.getMonth() == 4 && " + arregloDeVariables[posicionVariable].nombre + "NU3V0.getDate() == 28) {",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = new Date(" + nombreReferenciaArregloEnCodigo + ");",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "}",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "MAX"
                });
              }
            } else if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || arregloDeVariables[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("decimal") == 0) {
              if (arregloDeVariables[posicionVariable].esObjeto) {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ")) {",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 > " + nombreReferenciaArregloEnCodigo + " || " + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1) {",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = " + nombreReferenciaArregloEnCodigo + ";",
                  tipo: "MAX"
                }); //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                arreglo.push({
                  codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "}",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "MAX"
                });
              } else {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ")) {",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 > " + nombreReferenciaArregloEnCodigo + ") {",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = " + nombreReferenciaArregloEnCodigo + ";",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "} else if( " + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1 ) {",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = " + nombreReferenciaArregloEnCodigo + ";",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "}",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "MAX"
                });
              }
            }
          }
        } else if (regla.operacion.indexOf('PROM') == 0) {
          //trayendo formula correcta
          var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function (formula) {
            return regla.formulaID == formula.ID;
          });

          if (formula.length > 0) {
            //este tipo de operacion siempre sera una formula con un elemento de formula
            if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || arregloDeVariables[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("decimal") == 0) {
              if (arregloDeVariables[posicionVariable].esObjeto) {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ")) {",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if ( " + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1 )",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = 0;",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 += " + nombreReferenciaArregloEnCodigo + ";",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0T0T4L++;",
                  tipo: "MAX"
                }); //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "MAX"
                });
              } else {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ")) {",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if ( " + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1 )",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = 0;",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 += " + nombreReferenciaArregloEnCodigo + ";",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0T0T4L++;",
                  tipo: "MAX"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "MAX"
                });
              }
            }
          }
        } else if (regla.operacion.indexOf('AUTOSUM') == 0) {
          //trayendo formula correcta
          var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function (formula) {
            return regla.formulaID == formula.ID;
          });

          if (formula.length > 0) {
            //este tipo de operacion siempre sera una formula con un elemento de formula
            if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("decimal") == 0) {
              if (arregloDeVariables[posicionVariable].esObjeto) {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ")) {",
                  tipo: "AUTOSUM"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1)",
                  tipo: "AUTOSUM"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = 0;",
                  tipo: "AUTOSUM"
                }); //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

                arreglo.push({
                  codigo: "\n\t\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = evaluate(" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 + " + nombreReferenciaArregloEnCodigo + ");",
                  tipo: "AUTOSUM"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "AUTOSUM"
                });
              } else {
                arreglo.push({
                  codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ")) {",
                  tipo: "AUTOSUM"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1)",
                  tipo: "AUTOSUM"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = 0;",
                  tipo: "AUTOSUM"
                });
                arreglo.push({
                  codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                  tipo: "BANDERA_ASIG"
                });
                arreglo.push({
                  codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = evaluate(" + arregloDeVariables[posicionVariable].nombre + "NU3V0 + " + nombreReferenciaArregloEnCodigo + ");",
                  tipo: "AUTOSUM"
                });
                arreglo.push({
                  codigo: "\n" + tabsText + "}",
                  tipo: "AUTOSUM"
                });
              }
            }
          }
        } else if (regla.operacion.indexOf('COUNT') == 0) {
          var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function (formula) {
            return regla.formulaID == formula.ID;
          });

          if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("decimal") == 0) {
            if (arregloDeVariables[posicionVariable].esObjeto) {
              arreglo.push({
                codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ") && !isNaN(" + nombreReferenciaArregloEnCodigo + ") ) {",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1 )",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = 0;",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0++;",
                tipo: "COUNT"
              }); //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

              arreglo.push({
                codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                tipo: "BANDERA_ASIG"
              });
              arreglo.push({
                codigo: "\n" + tabsText + "}",
                tipo: "COUNT"
              });
            } else {
              arreglo.push({
                codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ") ) {",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1 )",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = 0;",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0++;",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                tipo: "BANDERA_ASIG"
              });
              arreglo.push({
                codigo: "\n" + tabsText + "}",
                tipo: "COUNT"
              });
            }
          } else if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("varchar") == 0) {
            if (arregloDeVariables[posicionVariable].esObjeto) {
              arreglo.push({
                codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && " + nombreReferenciaArregloEnCodigo + ".length > 0) {",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1 )",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = 0;",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0++;",
                tipo: "COUNT"
              }); //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

              arreglo.push({
                codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                tipo: "BANDERA_ASIG"
              });
              arreglo.push({
                codigo: "\n" + tabsText + "}",
                tipo: "COUNT"
              });
            } else {
              arreglo.push({
                codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && " + nombreReferenciaArregloEnCodigo + ".length > 0) {",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1 )",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = 0;",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0++;",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                tipo: "BANDERA_ASIG"
              });
              arreglo.push({
                codigo: "\n" + tabsText + "}",
                tipo: "COUNT"
              });
            }
          } else if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("bool") == 0) {
            if (arregloDeVariables[posicionVariable].esObjeto) {
              arreglo.push({
                codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && (" + nombreReferenciaArregloEnCodigo + " == true || " + nombreReferenciaArregloEnCodigo + " == false) ) {",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1 )",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = 0;",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0++;",
                tipo: "COUNT"
              }); //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

              arreglo.push({
                codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                tipo: "BANDERA_ASIG"
              });
              arreglo.push({
                codigo: "\n" + tabsText + "}",
                tipo: "COUNT"
              });
            } else {
              arreglo.push({
                codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && (" + nombreReferenciaArregloEnCodigo + " == true || " + nombreReferenciaArregloEnCodigo + " == false) ) {",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1 )",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = 0;",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0++;",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                tipo: "BANDERA_ASIG"
              });
              arreglo.push({
                codigo: "\n" + tabsText + "}",
                tipo: "COUNT"
              });
            }
          } else if (formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0) {
            if (arregloDeVariables[posicionVariable].esObjeto) {
              arreglo.push({
                codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && isValidDate(" + nombreReferenciaArregloEnCodigo + ") {",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 == -1 )",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0 = 0;",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + "NU3V0++;",
                tipo: "COUNT"
              }); //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});

              arreglo.push({
                codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                tipo: "BANDERA_ASIG"
              });
              arreglo.push({
                codigo: "\n" + tabsText + "}",
                tipo: "COUNT"
              });
            } else {
              arreglo.push({
                codigo: tabsText + "if (" + nombreReferenciaArregloEnCodigo + " != undefined && isValidDate(" + nombreReferenciaArregloEnCodigo + ")) {",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + "if (" + arregloDeVariables[posicionVariable].nombre + "NU3V0 == -1 )",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0 = 0;",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "NU3V0++;",
                tipo: "COUNT"
              });
              arreglo.push({
                codigo: "\n\t" + tabsText + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
                tipo: "BANDERA_ASIG"
              });
              arreglo.push({
                codigo: "\n" + tabsText + "}",
                tipo: "COUNT"
              });
            }
          }
        } else if (regla.operacion.indexOf('FORMULA') == 0) {
          var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function (formula) {
            return regla.formulaID == formula.ID;
          });

          for (var i = 0; i < formula[0].fuenteDeDatos.length; i++) {
            var saltoLinea = '\n';

            if (formula[0].fuenteDeDatos[i].operacion != undefined && formula[0].fuenteDeDatos[i].operacion.length > 0) {
              //if(formula[0].fuenteDeDatos[i].esFuenteDeDato) {
              //elemento formula es de conexion de tabla
              arreglo.push({
                codigo: saltoLinea + tabsText + newTabsTextFormula + "if (window['" + formula[0].fuenteDeDatos[i].nombreColumnaEnTabla + "'] != undefined) {",
                tipo: "FORMULA"
              });
              newTabsTextFormula += "\t";
              arreglo.push({
                codigo: saltoLinea + tabsText + newTabsTextFormula + "var " + formula[0].fuenteDeDatos[i].nombreVariable + " = window['" + formula[0].fuenteDeDatos[i].nombreColumnaEnTabla + "'];",
                tipo: "FORMULA"
              });
              /*arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log('"+formula[0].fuenteDeDatos[i].nombreVariable+"');", tipo: "FORMULA"});
              arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log("+formula[0].fuenteDeDatos[i].nombreVariable+");", tipo: "FORMULA"});*/

              /*} else {
                  if (!arregloDeVariables[posicionVariable].esObjeto) {
                      arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "FORMULA"});
                      newTabsTextFormula += "\t";
                      //elemento formula es variable primitiva
                      if(i > 0) {
                          arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+";", tipo: "FORMULA"});
                      } else {
                          arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+";", tipo: "FORMULA"});
                      }
                  } else {
                      arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" != undefined) {", tipo: "FORMULA"});
                      newTabsTextFormula += "\t";
                      if(i > 0) {
                          arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+"[x]."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+";", tipo: "FORMULA"});
                      } else {
                          arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+"[x]."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+";", tipo: "FORMULA"});
                      }
                  }
              }*/
            }
          }

          ; //arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" = math.eval(formula[0].formula);"});

          if (arregloDeVariables[posicionVariable].esObjeto) arreglo.push({
            codigo: "\n" + tabsText + newTabsTextFormula + arregloDeVariables[posicionVariable].nombre + "NU3V0." + arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre + " = " + formula[0].formula + ";"
          });else arreglo.push({
            codigo: "\n" + tabsText + newTabsTextFormula + arregloDeVariables[posicionVariable].nombre + "NU3V0 = evaluate(" + formula[0].formula + ");"
          });
          arreglo.push({
            codigo: "\n" + tabsText + newTabsTextFormula + arregloDeVariables[posicionVariable].nombre + "GU4RD4RV4L0R = true;",
            tipo: "BANDERA_ASIG"
          });

          for (var i = formula[0].fuenteDeDatos.length; i > 0; i--) {
            posicionesIF.push(arreglo.length + i);
          }
        }
      } else {
        //condiciones if
        var arregloValoresAComparar = [];

        if (regla.valor.indexOf("LISTAID") == 0) {//
        } else if (regla.valor.indexOf("FECHA") == 0) {
          var fecha = regla.valor.substring(regla.valor.indexOf("[") + 1, regla.valor.lastIndexOf("]"));
          arregloValoresAComparar = ["new Date(" + fecha + ").getTime()"];
        } else if (regla.valor.indexOf("TIEMPO") == 0) {
          var stringValores = regla.valor.substring(regla.valor.indexOf("[") + 1, regla.valor.lastIndexOf("]"));
          var diasAgregarCadena = stringValores.split(",")[0],
              mesesAgregarCadena = stringValores.split(",")[1],
              aniosAgregarCadena = stringValores.split(",")[2],
              futuro = stringValores.split(",")[3];
          var diasAgregar = parseInt(diasAgregarCadena.substring(diasAgregarCadena.indexOf("=") + 1)),
              mesesAgregar = parseInt(mesesAgregarCadena.substring(mesesAgregarCadena.indexOf("=") + 1)),
              aniosAgregar = parseInt(aniosAgregarCadena.substring(aniosAgregarCadena.indexOf("=") + 1));
          var esFuturo = true;
          if (futuro.localeCompare("FUTURO") == 0) esFuturo = true;else esFuturo = false;
          var hoy = new Date();

          if (esFuturo) {
            hoy = this.addYears(hoy, aniosAgregar);
            hoy = this.addMonths(hoy, mesesAgregar);
            hoy = this.addDays(hoy, diasAgregar);
          } else {
            hoy = this.minusYears(hoy, aniosAgregar);
            hoy = this.minusMonths(hoy, mesesAgregar);
            hoy = this.minusDays(hoy, diasAgregar);
          }

          arregloValoresAComparar = ["new Date(" + hoy.getFullYear() + ", " + hoy.getMonth() + ", " + hoy.getDate() + ").getTime()"];
        } else if (regla.valor.indexOf("MANUAL") == 0) {
          arregloValoresAComparar = [regla.valor.substring(regla.valor.indexOf("[") + 1, regla.valor.lastIndexOf("]"))];
        }

        var nombreCampoDeArregloEnCodigo = '';

        if (regla.esConexionTabla) {
          nombreCampoDeArregloEnCodigo = regla.nombreColumnaEnTabla;
        } else {
          nombreCampoDeArregloEnCodigo = arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre;
        }

        var tamArreglo = arreglo.length; //for (var j = 0; j < tamArreglo; j++) {

        for (var i = 0; i < arregloValoresAComparar.length; i++) {
          var comparacion = "";
          var inicioComparacion = "";
          var operacion = "";

          if (regla.operacion.localeCompare("ES_MENOR") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
            operacion = "<";
          } else if (regla.operacion.localeCompare("ES_MENOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
            operacion = "<=";
          } else if (regla.operacion.localeCompare("ES_MAYOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
            operacion = ">=";
          } else if (regla.operacion.localeCompare("ES_MAYOR") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
            operacion = ">";
          } else if (regla.operacion.localeCompare("ES_IGUAL") == 0) {
            operacion = "==";
          } else if (regla.operacion.localeCompare("NO_ES_IGUAL") == 0) {
            operacion = "!=";
          } else if (regla.operacion.localeCompare("ES_MENOR") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
            operacion = ">";
          } else if (regla.operacion.localeCompare("ES_MENOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
            operacion = ">=";
          } else if (regla.operacion.localeCompare("ES_MAYOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
            operacion = "<=";
          } else if (regla.operacion.localeCompare("ES_MAYOR") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
            operacion = "<";
          } else if (regla.operacion.localeCompare("ES_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
            operacion = "==";
          } else if (regla.operacion.localeCompare("NO_ES_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
            operacion = "!=";
          }

          if (regla.tipoCampoObjetivo.localeCompare("date") == 0) {
            if (regla.operacion.localeCompare("encuentra") == 0) {//
            } else if (regla.operacion.localeCompare("no_encuentra") == 0) {//
            } else {
              if (esArregloReferenciaArregloEnCodigo) {
                inicioComparacion = nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + " != undefined && isValidDate(" + nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + ")";
                comparacion = nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + ".getTime() " + operacion + " " + arregloValoresAComparar[i];
              } else {
                inicioComparacion = nombreReferenciaArregloEnCodigo + " != undefined && isValidDate(" + nombreReferenciaArregloEnCodigo + ")";
                comparacion = nombreReferenciaArregloEnCodigo + ".getTime() " + operacion + " " + arregloValoresAComparar[i];
              }
            }
          } else if (regla.tipoCampoObjetivo.localeCompare("varchar") == 0) {
            if (regla.operacion.localeCompare("encuentra") == 0) {//
            } else if (regla.operacion.localeCompare("no_encuentra") == 0) {//
            } else {
              if (esArregloReferenciaArregloEnCodigo) {
                inicioComparacion = nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + " != undefined";
                comparacion = nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + ".localeCompare('" + arregloValoresAComparar[i] + "') " + operacion + " 0";
              } else {
                inicioComparacion = nombreReferenciaArregloEnCodigo + " != undefined";
                comparacion = nombreReferenciaArregloEnCodigo + ".localeCompare('" + arregloValoresAComparar[i] + "') " + operacion + " 0";
              }
            }
          } else if (regla.tipoCampoObjetivo.localeCompare("int") == 0 || regla.tipoCampoObjetivo.localeCompare("decimal") == 0) {
            if (regla.operacion.localeCompare("encuentra") == 0) {//
            } else if (regla.operacion.localeCompare("no_encuentra") == 0) {//
            } else {
              if (esArregloReferenciaArregloEnCodigo) {
                inicioComparacion = nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + ")";
                comparacion = nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + " " + operacion + " " + arregloValoresAComparar[i];
              } else {
                inicioComparacion = nombreReferenciaArregloEnCodigo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + ")";
                comparacion = nombreReferenciaArregloEnCodigo + " " + operacion + " " + arregloValoresAComparar[i];
              }
            }
          } else if (regla.tipoCampoObjetivo.localeCompare("bit") == 0) {
            if (esArregloReferenciaArregloEnCodigo) {
              inicioComparacion = nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + " != undefined";
              comparacion = nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + " " + operacion + " " + arregloValoresAComparar[i];
            } else {
              inicioComparacion = nombreReferenciaArregloEnCodigo + " != undefined";
              comparacion = nombreReferenciaArregloEnCodigo + " " + operacion + " " + arregloValoresAComparar[i];
            }
          }

          if (i + 1 == arregloValoresAComparar.length) {
            comparacion += " ) {";
          }

          if (i == 0) {
            //arreglo[j].codigo += comparacion;
            //arreglo.push({codigo: tabsText+"console.log("+nombreReferenciaArregloEnCodigo+"[x]);", tipo: "COMPARACION"});
            //arreglo.push({codigo: '\n'+tabsText+"console.log( "+nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+");", tipo: "COMPARACION"});
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

        posicionesIF.push(arreglo.length);
      }

      var cuerpo = arregloDeReglas.filter(function (object) {
        return object.reglaPadreID == regla.ID;
      });

      if (cuerpo.length > 0) {
        var arregloCuerpo = [];

        for (var i = 0; i < cuerpo.length; i++) {
          /*var cuantasTabs = tabs;
          if(regla.esCondicion)
              cuantasTabs++;*/
          var retorno = this.arregloCodigoReglaFormaOExcel(cuerpo[i], tabs + 1, posicionVariable, posicionCampo, [], arregloDeReglas, nombreReferenciaArregloEnCodigo),
              esArregloReferenciaArregloEnCodigo;
          retorno[0].codigo = "\n" + retorno[0].codigo;
          $.merge(arregloCuerpo, retorno);
        }

        ;

        for (var i = 0; i < posicionesIF.length; i++) {
          arreglo.splice.apply(arreglo, [posicionesIF[i], 0].concat(arregloCuerpo));
          if (regla.esCondicion) arreglo.splice(posicionesIF[i] + arregloCuerpo.length, 0, {
            codigo: "\n" + tabsText + "}",
            filtro: regla.filtro
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
        if (regla.esCondicion || posicionesIF.length > 0) {
          for (var i = 0; i < posicionesIF.length; i++) {
            if (newTabsTextFormula.length > 0) newTabsTextFormula = newTabsTextFormula.substring(0, newTabsTextFormula.length - 1);
            arreglo.splice(posicionesIF[i], 0, {
              codigo: "\n" + tabsText + newTabsTextFormula + "}",
              filtro: regla.filtro
            });
          }

          ;
        }

        return arreglo;
      }
    }
  }, {
    key: "isValidDate",
    value: function isValidDate(fecha) {
      if (Object.prototype.toString.call(fecha) === "[object Date]") {
        if (isNaN(fecha.getTime())) {
          //alert("Ingrese una fecha valida.");
          return false;
        } else {
          return true;
        }
      } else {
        //alert("Ingrese una fecha valida.");
        return false;
      }
    }
  }, {
    key: "existeOperacion",
    value: function existeOperacion(operacion) {
      if (operacion.localeCompare("COUNT") == 0 || operacion.localeCompare("MAX") == 0 || operacion.localeCompare("MIN") == 0 || operacion.localeCompare("DATE") == 0 || operacion.localeCompare("MONTH") == 0 || operacion.localeCompare("YEAR") == 0 || operacion.localeCompare("PROM") == 0 || operacion.localeCompare("AUTOSUM") == 0 || operacion.localeCompare("SUM") == 0) {
        return true;
      }

      return false;
    }
  }, {
    key: "guardarOperacionSQL",
    value: function guardarOperacionSQL(arreglo, campo, valorAInsertar) {
      if (arreglo.length != undefined) {
        // es coleccion
        for (var i = 0; i < arreglo.length; i++) {
          arreglo[i][campo] = valorAInsertar;
        }

        ;
      } else {
        // no es coleccion
        arreglo[campo] = valorAInsertar;
      }
    } //elementoFormula: objeto elementoFormula

  }, {
    key: "codigoElementosFormula",
    value: function codigoElementosFormula(elementoFormula, tabSpaces, objetoEnTabla, instanciacion) {
      var columnasDeTablaSeleccionadas = this.getColumnasDeTablaSeleccionadas(elementoFormula);

      if (elementoFormula.operacion.length == 0 && columnasDeTablaSeleccionadas.length == 1) {
        this.codigoElementosFormulaAsignacion();
      } else if (elementoFormula.operacion.length > 0 && columnasDeTablaSeleccionadas.length == 1) {
        this.codigoElementosFormulaAsignacionOperacion();
      } else {
        this.codigoElementosFormulaGlobal();
      }
    }
  }, {
    key: "codigoElementosFormulaAsignacion",
    value: function codigoElementosFormulaAsignacion(elementoFormula, tabSpaces, objetoEnTabla, instanciacion) {
      var cadenaRetorno = '';

      if (elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("date") == 0) {
        if (elementoFormula.fuenteDato.operacion.localeCompare("MAX") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\tif(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + '.getTime() > window[' + instanciacion + '].getTime() && (window[' + instanciacion + '].getDate() != 28 && window[' + instanciacion + '].getMonth() != 5 && window[' + instanciacion + '].getFullYear() != 1964) ) {';
          cadenaRetorno += '\n' + tabSpaces + '\t\twindow[' + instanciacion + '] = new Date(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ')';
          cadenaRetorno += '\n' + tabSpaces + '\t} else if (window[' + instanciacion + '].getDate() == 28 && window[' + instanciacion + '].getMonth() == 5 && window[' + instanciacion + '].getFullYear() == 1964) {'; //valor nulo

          cadenaRetorno += '\n' + tabSpaces + '\t\twindow[' + instanciacion + '] = new Date(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ')';
          cadenaRetorno += '\n' + tabSpaces + '\t}';
          cadenaRetorno += '\n' + tabSpaces + '}';
        } else if (elementoFormula.fuenteDato.operacion.localeCompare("MIN") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\tif(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + '.getTime() < window[' + instanciacion + '].getTime() && (window[' + instanciacion + '].getDate() != 28 && window[' + instanciacion + '].getMonth() != 5 && window[' + instanciacion + '].getFullYear() != 1964) ) {';
          cadenaRetorno += '\n' + tabSpaces + '\t\twindow[' + instanciacion + '] = new Date(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ')';
          cadenaRetorno += '\n' + tabSpaces + '\t} else if (window[' + instanciacion + '].getDate() == 28 && window[' + instanciacion + '].getMonth() == 5 && window[' + instanciacion + '].getFullYear() == 1964) {'; //valor nulo

          cadenaRetorno += '\n' + tabSpaces + '\t\twindow[' + instanciacion + '] = new Date(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ')';
          cadenaRetorno += '\n' + tabSpaces + '\t}';
          cadenaRetorno += '\n' + tabSpaces + '}';
        } else if (elementoFormula.fuenteDato.operacion.localeCompare("DIA") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\twindow[' + instanciacion + ']++';
          cadenaRetorno += '\n' + tabSpaces + '}';
        } else if (elementoFormula.fuenteDato.operacion.localeCompare("MES") == 0) {} else if (elementoFormula.fuenteDato.operacion.localeCompare("AÑO") == 0) {} else if (elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\twindow[' + instanciacion + ']++';
          cadenaRetorno += '\n' + tabSpaces + '}';
        } else if (elementoFormula.fuenteDato.operacion.length == 0) {}
      } else if (elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("bool") == 0) {
        if (elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\twindow[' + instanciacion + ']++';
          cadenaRetorno += '\n' + tabSpaces + '}';
        }
      } else if (elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("bool") == 0) {
        if (elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\twindow[' + instanciacion + ']++';
          cadenaRetorno += '\n' + tabSpaces + '}';
        }
      } else if (elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("cadena") == 0) {
        if (elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\twindow[' + instanciacion + ']++';
          cadenaRetorno += '\n' + tabSpaces + '}';
        }
      }
    }
  }, {
    key: "codigoElementosFormulaAsignacionOperacion",
    value: function codigoElementosFormulaAsignacionOperacion(elementoFormula, tabSpaces, objetoEnTabla, instanciacion) {
      var cadenaRetorno = '';

      if (elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("date") == 0) {
        if (elementoFormula.fuenteDato.operacion.localeCompare("MAX") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\tif(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + '.getTime() > window[' + instanciacion + '].getTime() && (window[' + instanciacion + '].getDate() != 28 && window[' + instanciacion + '].getMonth() != 5 && window[' + instanciacion + '].getFullYear() != 1964) ) {';
          cadenaRetorno += '\n' + tabSpaces + '\t\twindow[' + instanciacion + '] = new Date(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ')';
          cadenaRetorno += '\n' + tabSpaces + '\t} else if (window[' + instanciacion + '].getDate() == 28 && window[' + instanciacion + '].getMonth() == 5 && window[' + instanciacion + '].getFullYear() == 1964) {'; //valor nulo

          cadenaRetorno += '\n' + tabSpaces + '\t\twindow[' + instanciacion + '] = new Date(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ')';
          cadenaRetorno += '\n' + tabSpaces + '\t}';
          cadenaRetorno += '\n' + tabSpaces + '}';
        } else if (elementoFormula.fuenteDato.operacion.localeCompare("MIN") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\tif(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + '.getTime() < window[' + instanciacion + '].getTime() && (window[' + instanciacion + '].getDate() != 28 && window[' + instanciacion + '].getMonth() != 5 && window[' + instanciacion + '].getFullYear() != 1964) ) {';
          cadenaRetorno += '\n' + tabSpaces + '\t\twindow[' + instanciacion + '] = new Date(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ')';
          cadenaRetorno += '\n' + tabSpaces + '\t} else if (window[' + instanciacion + '].getDate() == 28 && window[' + instanciacion + '].getMonth() == 5 && window[' + instanciacion + '].getFullYear() == 1964) {'; //valor nulo

          cadenaRetorno += '\n' + tabSpaces + '\t\twindow[' + instanciacion + '] = new Date(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ')';
          cadenaRetorno += '\n' + tabSpaces + '\t}';
          cadenaRetorno += '\n' + tabSpaces + '}';
        } else if (elementoFormula.fuenteDato.operacion.localeCompare("DIA") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\twindow[' + instanciacion + ']++';
          cadenaRetorno += '\n' + tabSpaces + '}';
        } else if (elementoFormula.fuenteDato.operacion.localeCompare("MES") == 0) {} else if (elementoFormula.fuenteDato.operacion.localeCompare("AÑO") == 0) {} else if (elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\twindow[' + instanciacion + ']++';
          cadenaRetorno += '\n' + tabSpaces + '}';
        } else if (elementoFormula.fuenteDato.operacion.length == 0) {}
      } else if (elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("bool") == 0) {
        if (elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\twindow[' + instanciacion + ']++';
          cadenaRetorno += '\n' + tabSpaces + '}';
        }
      } else if (elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("bool") == 0) {
        if (elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\twindow[' + instanciacion + ']++';
          cadenaRetorno += '\n' + tabSpaces + '}';
        }
      } else if (elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("cadena") == 0) {
        if (elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\twindow[' + instanciacion + ']++';
          cadenaRetorno += '\n' + tabSpaces + '}';
        }
      }
    }
  }, {
    key: "codigoElementosFormulaGlobal",
    value: function codigoElementosFormulaGlobal(elementoFormula, tabSpaces, objetoEnTabla, instanciacion) {
      var cadenaRetorno = '';

      if (elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("date") == 0) {
        if (elementoFormula.fuenteDato.operacion.localeCompare("MAX") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\tif(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + '.getTime() > window[' + instanciacion + '].getTime() && (window[' + instanciacion + '].getDate() != 28 && window[' + instanciacion + '].getMonth() != 5 && window[' + instanciacion + '].getFullYear() != 1964) ) {';
          cadenaRetorno += '\n' + tabSpaces + '\t\twindow[' + instanciacion + '] = new Date(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ')';
          cadenaRetorno += '\n' + tabSpaces + '\t} else if (window[' + instanciacion + '].getDate() == 28 && window[' + instanciacion + '].getMonth() == 5 && window[' + instanciacion + '].getFullYear() == 1964) {'; //valor nulo

          cadenaRetorno += '\n' + tabSpaces + '\t\twindow[' + instanciacion + '] = new Date(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ')';
          cadenaRetorno += '\n' + tabSpaces + '\t}';
          cadenaRetorno += '\n' + tabSpaces + '}';
        } else if (elementoFormula.fuenteDato.operacion.localeCompare("MIN") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\tif(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + '.getTime() < window[' + instanciacion + '].getTime() && (window[' + instanciacion + '].getDate() != 28 && window[' + instanciacion + '].getMonth() != 5 && window[' + instanciacion + '].getFullYear() != 1964) ) {';
          cadenaRetorno += '\n' + tabSpaces + '\t\twindow[' + instanciacion + '] = new Date(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ')';
          cadenaRetorno += '\n' + tabSpaces + '\t} else if (window[' + instanciacion + '].getDate() == 28 && window[' + instanciacion + '].getMonth() == 5 && window[' + instanciacion + '].getFullYear() == 1964) {'; //valor nulo

          cadenaRetorno += '\n' + tabSpaces + '\t\twindow[' + instanciacion + '] = new Date(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ')';
          cadenaRetorno += '\n' + tabSpaces + '\t}';
          cadenaRetorno += '\n' + tabSpaces + '}';
        } else if (elementoFormula.fuenteDato.operacion.localeCompare("DIA") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\twindow[' + instanciacion + ']++';
          cadenaRetorno += '\n' + tabSpaces + '}';
        } else if (elementoFormula.fuenteDato.operacion.localeCompare("MES") == 0) {} else if (elementoFormula.fuenteDato.operacion.localeCompare("AÑO") == 0) {} else if (elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\twindow[' + instanciacion + ']++';
          cadenaRetorno += '\n' + tabSpaces + '}';
        } else if (elementoFormula.fuenteDato.operacion.length == 0) {}
      } else if (elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("bool") == 0) {
        if (elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\twindow[' + instanciacion + ']++';
          cadenaRetorno += '\n' + tabSpaces + '}';
        }
      } else if (elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("bool") == 0) {
        if (elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\twindow[' + instanciacion + ']++';
          cadenaRetorno += '\n' + tabSpaces + '}';
        }
      } else if (elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("cadena") == 0) {
        if (elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
          cadenaRetorno += tabSpaces + 'if(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ' != undefined && this.isValidDate(' + objetoEnTabla + '.' + elementoFormula.fuenteDato.nombreColumnaEnTabla + ') ) {';
          cadenaRetorno += '\n' + tabSpaces + '\twindow[' + instanciacion + ']++';
          cadenaRetorno += '\n' + tabSpaces + '}';
        }
      }
    }
  }, {
    key: "iniciarCalculoIndicadores",
    value: function iniciarCalculoIndicadores() {
      this.guardarVariablesCalculadas();
    }
  }, {
    key: "guardarVariablesCalculadas",
    value: function guardarVariablesCalculadas() {
      for (var a = 0; a < arregloDeVariables.length; a++) {
        if (arregloDeVariables[a].realizarCalculo && this.props.idVariable == arregloDeVariables[a].ID) {
          this.verificarSiExisteVariableEnResultadosHistoricos(arregloDeVariables[a]);
        }
      }

      ;
    }
  }, {
    key: "verificarSiExisteVariableEnResultadosHistoricos",
    value: function verificarSiExisteVariableEnResultadosHistoricos(variable) {
      var _this23 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosNombreVariables where nombreVariable = '" + variable.nombre + "' and finVigencia = '1964-05-28'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length == 0) {
                _this23.crearTablaDeResultadoNombreVariable(variable);
              } else {
                _this23.guardarResultadosNombreVariable(variable, result.recordset[0].inicioVigencia);
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaDeResultadoNombreVariable",
    value: function crearTablaDeResultadoNombreVariable(variable) {
      var _this24 = this;

      //NOMBRE TABLA: NOMBREVARIABLE_AÑOVIGENCIA_MESVIGENCIA_DIAVIGENCIA_HORAVIGENCIA_MINUTOSVIGENCIA_SEGUNDOSVIGENCIA
      //VIGENCIA: DIA CREACION
      var hoy = new Date();
      var textoCreacionTabla = 'CREATE TABLE ' + variable.nombre + '_' + hoy.getFullYear() + '_' + (hoy.getMonth() + 1) + '_' + hoy.getDate() + '_' + hoy.getHours() + '_' + hoy.getMinutes() + '_' + hoy.getSeconds() + ' ( ID int IDENTITY(1,1) PRIMARY KEY, ';

      for (var i = 0; i < variable.atributos.length; i++) {
        if (i != 0) textoCreacionTabla += ', ';

        if (variable.atributos[i].tipo.localeCompare("decimal") == 0) {
          textoCreacionTabla += variable.atributos[i].nombre + ' decimal(22,4)';
        } else if (variable.atributos[i].tipo.localeCompare("int") == 0) {
          textoCreacionTabla += variable.atributos[i].nombre + ' int';
        } else if (variable.atributos[i].tipo.localeCompare("varchar") == 0) {
          textoCreacionTabla += variable.atributos[i].nombre + ' varchar(1000)';
        } else if (variable.atributos[i].tipo.localeCompare("bit") == 0) {
          textoCreacionTabla += variable.atributos[i].nombre + ' bit';
        } else if (variable.atributos[i].tipo.localeCompare("date") == 0) {
          textoCreacionTabla += variable.atributos[i].nombre + ' date';
        }
      }

      ;
      textoCreacionTabla += ', f3ch4Gu4rd4do date )';
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query(textoCreacionTabla, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              //console.log("Tabla "+variable.nombre+'_'+hoy.getFullYear()+'_'+hoy.getMonth()+'_'+hoy.getDate()+'_'+hoy.getHours()+'_'+hoy.getMinutes()+'_'+hoy.getSeconds()+" creada.");
              _this24.crearResultadoNombreVariable(variable, hoy);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearResultadoNombreVariable",
    value: function crearResultadoNombreVariable(variable, hoy) {
      var _this25 = this;

      var mes = hoy.getMonth() + 1;
      if (mes.toString().length == 1) mes = '0' + mes;
      var dia = hoy.getDate();
      if (dia.toString().length == 1) dia = '0' + dia;
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into ResultadosNombreVariables (nombreVariable, inicioVigencia, finVigencia) values ('" + variable.nombre + "', '" + hoy.getFullYear() + '-' + mes + '-' + dia + " " + hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds() + "', '1964-05-28')", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this25.guardarResultadosNombreVariable(variable, hoy);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "guardarResultadosNombreVariable",
    value: function guardarResultadosNombreVariable(variable, fechaNombreTabla) {
      var _this26 = this;

      alert("Calculo realizado con exito.");
      var hoy = new Date();
      var textoInsertPrincipio = 'INSERT INTO ' + variable.nombre + '_' + fechaNombreTabla.getFullYear() + '_' + (fechaNombreTabla.getMonth() + 1) + '_' + fechaNombreTabla.getDate() + '_' + fechaNombreTabla.getHours() + '_' + fechaNombreTabla.getMinutes() + '_' + fechaNombreTabla.getSeconds() + ' ( ';

      for (var i = 0; i < variable.atributos.length; i++) {
        if (i != 0) textoInsertPrincipio += ', ';
        textoInsertPrincipio += variable.atributos[i].nombre;
      }

      ;
      textoInsertPrincipio += ', f3ch4Gu4rd4do ) values ( ';
      var instruccionSQLBorrar = "DELETE FROM " + variable.nombre + "_" + fechaNombreTabla.getFullYear() + "_" + (fechaNombreTabla.getMonth() + 1) + "_" + fechaNombreTabla.getDate() + "_" + fechaNombreTabla.getHours() + "_" + fechaNombreTabla.getMinutes() + "_" + fechaNombreTabla.getSeconds() + " WHERE f3ch4Gu4rd4do = '" + hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate() + "' ";
      this.borrarVariable(instruccionSQLBorrar);

      if (variable.esInstruccionSQL || variable.esColeccion) {
        if (variable.esInstruccionSQL || variable.esObjeto) {
          for (var i = 0; i < window[variable.nombre].length; i++) {
            var instruccionSQLFinal = textoInsertPrincipio;

            for (var j = 0; j < variable.atributos.length; j++) {
              if (j > 0) instruccionSQLFinal += ', ';

              if (variable.atributos[j].tipo.localeCompare("decimal") == 0) {
                instruccionSQLFinal += window[variable.nombre][i][variable.atributos[j].nombre];
              } else if (variable.atributos[j].tipo.localeCompare("int") == 0) {
                instruccionSQLFinal += window[variable.nombre][i][variable.atributos[j].nombre];
              } else if (variable.atributos[j].tipo.localeCompare("varchar") == 0) {
                instruccionSQLFinal += "'" + window[variable.nombre][i][variable.atributos[j].nombre] + "'";
              } else if (variable.atributos[j].tipo.localeCompare("bit") == 0) {
                instruccionSQLFinal += "'" + window[variable.nombre][i][variable.atributos[j].nombre] + "'";
              } else if (variable.atributos[j].tipo.localeCompare("date") == 0) {
                instruccionSQLFinal += "'" + window[variable.nombre][i][variable.atributos[j].nombre].getFullYear() + "-" + (window[variable.nombre][i][variable.atributos[j].nombre].getMonth() + 1) + "-" + window[variable.nombre][i][variable.atributos[j].nombre].getDate() + "'";
              }
            }

            ;
            instruccionSQLFinal += ", '" + hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate() + "' )";
            var self = this;
            setTimeout(function () {
              self.guardarVariable(instruccionSQLFinal, variable, 'variable', hoy);
            }, 600);
          }

          ;
        } else if (!variable.esObjeto) {
          var _loop = function _loop() {
            var instruccionSQLFinal = textoInsertPrincipio;

            for (j = 0; j < variable.atributos.length; j++) {
              if (j > 0) instruccionSQLFinal += ', ';

              if (variable.atributos[j].tipo.localeCompare("decimal") == 0) {
                instruccionSQLFinal += window[variable.nombre][i];
              } else if (variable.atributos[j].tipo.localeCompare("int") == 0) {
                instruccionSQLFinal += window[variable.nombre][i];
              } else if (variable.atributos[j].tipo.localeCompare("varchar") == 0) {
                instruccionSQLFinal += "'" + window[variable.nombre][i] + "'";
              } else if (variable.atributos[j].tipo.localeCompare("bit") == 0) {
                instruccionSQLFinal += "'" + window[variable.nombre][i] + "'";
              } else if (variable.atributos[j].tipo.localeCompare("date") == 0) {
                instruccionSQLFinal += "'" + window[variable.nombre][i].getFullYear() + "-" + (window[variable.nombre][i].getMonth() + 1) + "-" + window[variable.nombre][i].getDate() + "'";
              }
            }

            ;
            instruccionSQLFinal += ", '" + hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate() + "' )";
            self = _this26;
            setTimeout(function () {
              self.guardarVariable(instruccionSQLFinal, variable, 'variable', hoy);
            }, 600);
          };

          for (var i = 0; i < window[variable.nombre].length; i++) {
            var j;
            var self;

            _loop();
          }

          ;
        }
      } else {
        if (variable.esObjeto) {
          var _instruccionSQLFinal = textoInsertPrincipio;

          for (var j = 0; j < variable.atributos.length; j++) {
            if (j > 0) _instruccionSQLFinal += ', ';

            if (variable.atributos[j].tipo.localeCompare("decimal") == 0) {
              _instruccionSQLFinal += window[variable.nombre][variable.atributos[j].nombre];
            } else if (variable.atributos[j].tipo.localeCompare("int") == 0) {
              _instruccionSQLFinal += window[variable.nombre][variable.atributos[j].nombre];
            } else if (variable.atributos[j].tipo.localeCompare("varchar") == 0) {
              _instruccionSQLFinal += "'" + window[variable.nombre][variable.atributos[j].nombre] + "'";
            } else if (variable.atributos[j].tipo.localeCompare("bit") == 0) {
              _instruccionSQLFinal += "'" + window[variable.nombre][variable.atributos[j].nombre] + "'";
            } else if (variable.atributos[j].tipo.localeCompare("date") == 0) {
              _instruccionSQLFinal += "'" + window[variable.nombre][variable.atributos[j].nombre].getFullYear() + "-" + (window[variable.nombre][variable.atributos[j].nombre].getMonth() + 1) + "-" + window[variable.nombre][variable.atributos[j].nombre].getDate() + "'";
            }
          }

          ;
          _instruccionSQLFinal += ", '" + hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate() + "' )";
          var self = this;
          setTimeout(function () {
            self.guardarVariable(_instruccionSQLFinal, variable, 'variable', hoy);
          }, 600);
        } else if (!variable.esObjeto) {
          var instruccionSQLFinal = textoInsertPrincipio;

          for (var j = 0; j < variable.atributos.length; j++) {
            if (j > 0) instruccionSQLFinal += ', ';

            if (variable.atributos[j].tipo.localeCompare("decimal") == 0) {
              instruccionSQLFinal += window[variable.nombre];
            } else if (variable.atributos[j].tipo.localeCompare("int") == 0) {
              instruccionSQLFinal += window[variable.nombre];
            } else if (variable.atributos[j].tipo.localeCompare("varchar") == 0) {
              instruccionSQLFinal += "'" + window[variable.nombre] + "'";
            } else if (variable.atributos[j].tipo.localeCompare("bit") == 0) {
              instruccionSQLFinal += "'" + window[variable.nombre] + "'";
            } else if (variable.atributos[j].tipo.localeCompare("date") == 0) {
              instruccionSQLFinal += "'" + window[variable.nombre].getFullYear() + "-" + (window[variable.nombre].getMonth() + 1) + "-" + window[variable.nombre].getDate() + "'";
            }
          }

          ;
          instruccionSQLFinal += ", '" + hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate() + "' )";
          var self = this;
          setTimeout(function () {
            self.guardarVariable(instruccionSQLFinal, variable, 'variable', hoy);
          }, 600);
        }
      }

      var tipoVar = '';

      if (variable.esInstruccionSQL) {
        tipoVar = 'SQL';
      } else if (variable.esObjeto) {
        tipoVar = 'objeto';
      } else if (variable.esObjeto) {
        tipoVar = 'objeto';
      }

      this.saveBitacora(hoy, "Usuario: " + this.props.userName + " realizo el cálculo para la variable tipo variable: " + variable.nombre);
    }
  }, {
    key: "guardarVariable",
    value: function guardarVariable(instruccionSQL, variable, tabla, hoy) {
      var _this27 = this;

      /*console.log('instruccionSQLFinal');
      console.log(instruccionSQL);*/
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query(instruccionSQL, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (variable.periodicidad.localeCompare("-1") != 0) _this27.verificarPeriodicidadGuardar(variable, tabla, hoy);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "borrarVariable",
    value: function borrarVariable(instruccionSQL) {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query(instruccionSQL, function (err, result) {
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
    }
  }, {
    key: "verificarPeriodicidadGuardar",
    value: function verificarPeriodicidadGuardar(variable, tabla, hoy) {
      var _this28 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from PeriodicidadCalculo where variableID = " + variable.ID + " and tablaVariable = '" + tabla + "'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                _this28.updatePeriodicidad(variable, tabla, hoy);
              } else {
                _this28.guardarPeriodicidad(variable, tabla, hoy);
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "updatePeriodicidad",
    value: function updatePeriodicidad(variable, tabla, hoy) {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("update PeriodicidadCalculo set fechaUltimoCalculo = '" + hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate() + "' where variableID = " + variable.ID + " and tablaVariable = '" + tabla + "'", function (err, result) {
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
    }
  }, {
    key: "guardarPeriodicidad",
    value: function guardarPeriodicidad(variable, tabla, hoy) {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into PeriodicidadCalculo (variableID, tablaVariable, fechaInicio, fechaUltimoCalculo) values (" + variable.ID + ", '" + tabla + "', '" + hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate() + "', '" + hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate() + "') ", function (err, result) {
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
    }
    /*              EXCEL                       */

  }, {
    key: "crearVariablesExcel",
    value: function crearVariablesExcel() {
      for (var i = 0; i < arregloDeExcel.length; i++) {
        var workbook = null;
        workbook = _xlsxStyle["default"].readFile(arregloDeExcel[i].ubicacionArchivo);

        if (workbook != null) {
          for (var j = 0; j < arregloDeExcel[i].variables.length; j++) {
            for (var k = 0; k < workbook.SheetNames.length; k++) {
              if (workbook.SheetNames[k].localeCompare(arregloDeExcel[i].variables[j].nombreHoja) == 0) {
                break;
              }
            }

            ;
            var sheet = workbook.Sheets[workbook.SheetNames[k]];

            if (sheet != null && arregloDeExcel[i].variables[j].realizarCalculo) {
              try {
                var arregloPosicionesExcel = this.getArregloPosicionesExcel(arregloDeExcel[i].variables[j].celdas);

                if (arregloPosicionesExcel.length == 1) {
                  var variable;

                  if (arregloDeExcel[i].variables[j].tipo.localeCompare('numero') == 0 && sheet[arregloPosicionesExcel[0]].t.localeCompare('n') == 0 && sheet[arregloPosicionesExcel[0]].w.indexOf('/') == -1) {
                    variable = parseFloat(sheet[arregloPosicionesExcel[0]].v);
                  } else if (arregloDeExcel[i].variables[j].tipo.localeCompare('bit') == 0 && sheet[arregloPosicionesExcel[0]].t.localeCompare('b') == 0 && sheet[arregloPosicionesExcel[0]].w.indexOf('/') == -1) {
                    variable = sheet[arregloPosicionesExcel[0]].v;
                  } else if (arregloDeExcel[i].variables[j].tipo.localeCompare('varchar') == 0 && sheet[arregloPosicionesExcel[0]].t.localeCompare('s') == 0 && sheet[arregloPosicionesExcel[0]].w.indexOf('/') == -1) {
                    variable = sheet[arregloPosicionesExcel[0]].v;
                  } else if (arregloDeExcel[i].variables[j].tipo.localeCompare('date') == 0 && (sheet[arregloPosicionesExcel[0]].t.localeCompare('d') == 0 || sheet[arregloPosicionesExcel[0]].t.localeCompare('n') == 0) && sheet[arregloPosicionesExcel[0]].w.indexOf('/') != -1) {
                    variable = new Date(sheet[arregloPosicionesExcel[0]].w);
                  }

                  window[arregloDeExcel[i].variables[j].nombre] = variable;
                } else if (arregloPosicionesExcel.length > 1 && arregloDeExcel[i].variables[j].operacion.localeCompare("ASIG") == 0) {
                  if (arregloDeExcel[i].variables[j].tipo.localeCompare('numero') == 0) {
                    window[arregloDeExcel[i].variables[j].nombre] = [];

                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                      var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                      window[arregloDeExcel[i].variables[j].nombre].push(variable);
                    }

                    ;
                  } else if (arregloDeExcel[i].variables[j].tipo.localeCompare('bit') == 0) {
                    window[arregloDeExcel[i].variables[j].nombre] = [];

                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                      var variable = sheet[arregloPosicionesExcel[k]].v;
                      window[arregloDeExcel[i].variables[j].nombre].push(variable);
                    }

                    ;
                  } else if (arregloDeExcel[i].variables[j].tipo.localeCompare('varchar') == 0) {
                    window[arregloDeExcel[i].variables[j].nombre] = [];

                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                      var variable = sheet[arregloPosicionesExcel[k]].v;
                      window[arregloDeExcel[i].variables[j].nombre].push(variable);
                    }

                    ;
                  } else if (arregloDeExcel[i].variables[j].tipo.localeCompare('date') == 0) {
                    window[arregloDeExcel[i].variables[j].nombre] = [];

                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                      var variable = new Date(sheet[arregloPosicionesExcel[k]].w);
                      window[arregloDeExcel[i].variables[j].nombre].push(variable);
                    }

                    ;
                  }
                } else if (arregloPosicionesExcel.length > 1) {
                  if (arregloDeExcel[i].variables[j].tipo.localeCompare("numero") == 0 && arregloDeExcel[i].variables[j].operacion.localeCompare("SUM") == 0) {
                    var suma = 0;

                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                      var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                      suma += variable;
                    }

                    ;
                    window[arregloDeExcel[i].variables[j].nombre] = suma;
                  } else if (arregloDeExcel[i].variables[j].tipo.localeCompare("numero") == 0 && arregloDeExcel[i].variables[j].operacion.localeCompare("PROM") == 0) {
                    var suma = 0;

                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                      var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                      suma += variable;
                    }

                    ;
                    var promedio = suma / arregloPosicionesExcel.length;
                    window[arregloDeExcel[i].variables[j].nombre] = promedio;
                  } else if (arregloDeExcel[i].variables[j].operacion.localeCompare("MAX") == 0) {
                    if (arregloDeExcel[i].variables[j].tipo.localeCompare("numero") == 0) {
                      var max = 0;

                      for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                        var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                        if (k == 0) max = variable;

                        if (max < variable) {
                          max = variable;
                        }
                      }

                      ;
                      window[arregloDeExcel[i].variables[j].nombre] = max;
                    }

                    if (arregloDeExcel[i].variables[j].tipo.localeCompare("date") == 0) {
                      var max = new Date(1900, 1, 1);

                      for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                        var variable = new Date(sheet[arregloPosicionesExcel[k]].w);
                        if (k == 0) max = variable;

                        if (max.getTime() < variable.getTime()) {
                          max = variable;
                        }
                      }

                      ;
                      window[arregloDeExcel[i].variables[j].nombre] = max;
                    }
                  } else if (arregloDeExcel[i].variables[j].operacion.localeCompare("MIN") == 0) {
                    if (arregloDeExcel[i].variables[j].tipo.localeCompare("numero") == 0) {
                      var min = 0;

                      for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                        var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                        if (k == 0) min = variable;

                        if (min > variable) {
                          min = variable;
                        }
                      }

                      ;
                      window[arregloDeExcel[i].variables[j].nombre] = min;
                    }

                    if (arregloDeExcel[i].variables[j].tipo.localeCompare("date") == 0) {
                      var min = new Date(1900, 1, 1);

                      for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                        var variable = new Date(sheet[arregloPosicionesExcel[k]].w);
                        if (k == 0) min = variable;

                        if (min.getTime() > variable.getTime()) {
                          min = variable;
                        }
                      }

                      ;
                      window[arregloDeExcel[i].variables[j].nombre] = min;
                    }
                  } else if (arregloDeExcel[i].variables[j].operacion.localeCompare("COUNT") == 0) {
                    if (arregloDeExcel[i].variables[j].tipo.localeCompare("numero") == 0) {
                      var count = 0;

                      for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                        var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                        if (!isNaN(variable)) count++;
                      }

                      ;
                      window[arregloDeExcel[i].variables[j].nombre] = count;
                    }

                    if (arregloDeExcel[i].variables[j].tipo.localeCompare("date") == 0) {
                      var count = 0;

                      for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                        //var variable = new Date(sheet[arregloPosicionesExcel[k]].v);
                        var variable; //

                        if (sheet[arregloPosicionesExcel[k]].t.localeCompare('d') == 0) {
                          variable = new Date(sheet[arregloPosicionesExcel[k]].w);
                        }
                        /* else {
                           var partes;
                           if(sheet[arregloPosicionesExcel[k]].w.indexOf("-") > -1) {
                               partes = sheet[arregloPosicionesExcel[k]].w.split("-");
                           } else if(sheet[arregloPosicionesExcel[k]].w.indexOf("/") > -1) {
                               partes = sheet[arregloPosicionesExcel[k]].w.split("/");
                           }
                           var dia, mes, anio, entro = false;
                           if(partes.length != undefined && partes.length == 3) {
                               if(partes[0].length == 4) {
                                   anio = partes[0];
                                   mes = partes[1];
                                   dia = partes[2];
                               } else if(partes[2].length == 4) {
                                   anio = partes[2];
                                   mes = partes[1];
                                   dia = partes[0];
                               }
                           }
                           if(entro) {
                               variable = new Date(parseInt(anio), parseInt(mes), parseInt(dia));
                           } else {
                               arregloDeErroresExcel.push({nombre: arregloDeExcel[i].variables[j].nombre, ID: arregloDeExcel[i].variables[j].ID });
                               alert("problema para leer fecha: "+arregloDeExcel[i].variables[j].nombre);
                           }
                        }*/
                        //


                        if (this.isValidDate(variable)) count++;
                      }

                      ;
                      window[arregloDeExcel[i].variables[j].nombre] = count;
                    }

                    if (arregloDeExcel[i].variables[j].tipo.localeCompare("varchar") == 0) {
                      var count = 0;

                      for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                        var variable = sheet[arregloPosicionesExcel[k]].v;
                        if (variable.length > 0) count++;
                      }

                      ;
                      window[arregloDeExcel[i].variables[j].nombre] = count;
                    }

                    if (arregloDeExcel[i].variables[j].tipo.localeCompare("bit") == 0) {
                      var count = 0;

                      for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                        var variable = sheet[arregloPosicionesExcel[k]].v;
                        if (variable != undefined) count++;
                      }

                      ;
                      window[arregloDeExcel[i].variables[j].nombre] = count;
                    }
                  }
                }
              } catch (err) {
                console.log(err.message);
                arregloDeErroresExcel.push({
                  nombre: arregloDeExcel[i].variables[j].nombre,
                  ID: arregloDeExcel[i].variables[j].ID
                });
              }
            } else {
              if (arregloDeExcel[i].variables[j].realizarCalculo) {
                arregloDeErroresExcel.push({
                  nombre: arregloDeExcel[i].variables[j].nombre,
                  ID: arregloDeExcel[i].variables[j].ID
                });
                alert("problema para leer la hoja: " + arregloDeExcel[i].variables[j].nombreHoja);
              }
            }
          }

          ;
        } else {
          alert("problema para leer archivo: " + arregloDeExcel[i].ubicacionArchivo);
        }
      }

      ;
    }
  }, {
    key: "getArregloPosicionesExcel",
    value: function getArregloPosicionesExcel(celdas) {
      var celdaInicial = this.getObjetoLetraNumeroCelda(celdas.split(":")[0]);
      var celdaFinal;
      if (celdas.indexOf(":") >= 0) celdaFinal = this.getObjetoLetraNumeroCelda(celdas.split(":")[1]);
      var arregloPosicionesExcel = [];

      if (celdaFinal != undefined) {
        if (celdaInicial.columna.toLowerCase().localeCompare(celdaFinal.columna.toLowerCase()) == 0) {
          //misma columnas, se recorre para abajo en el archivo
          var filaInicial = parseInt(celdaInicial.fila);
          var filaFinal = parseInt(celdaFinal.fila);

          for (var i = filaInicial; i <= filaFinal; i++) {
            arregloPosicionesExcel.push(celdaInicial.columna.toUpperCase() + i);
          }

          ;
        } else {
          //misma fila, se recorre horizontal en el archivo
          var numeroColumnaInicial = this.toColumnNumber(celdaInicial.columna.toUpperCase());
          var numeroColumnaFinal = this.toColumnNumber(celdaFinal.columna.toUpperCase());

          for (var i = numeroColumnaInicial; i <= numeroColumnaFinal; i++) {
            arregloPosicionesExcel.push(toColumnLetter(i) + celdaInicial.fila);
          }

          ;
        }
      } else {
        //solo se selecciono una celda
        arregloPosicionesExcel.push(celdaInicial.columna + celdaInicial.fila);
      }

      return arregloPosicionesExcel;
    }
  }, {
    key: "getObjetoLetraNumeroCelda",
    value: function getObjetoLetraNumeroCelda(celda) {
      var columna = '';
      var fila = '';

      for (var i = 0; i < celda.length; i++) {
        if (this.esLetra(celda.charAt(i))) {
          columna += celda.charAt(i);
        } else {
          break;
        }
      }

      ;
      fila = celda.substring(i);
      var celdaObjeto = {
        columna: columna,
        fila: fila
      };
      return celdaObjeto;
    }
  }, {
    key: "esLetra",
    value: function esLetra(caracter) {
      if (caracter.toLowerCase().localeCompare("a") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("b") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("c") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("d") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("e") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("f") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("g") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("h") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("i") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("j") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("k") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("l") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("m") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("n") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("o") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("p") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("q") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("r") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("s") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("t") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("u") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("v") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("w") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("x") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("y") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("z") == 0) {
        return true;
      }
    }
  }, {
    key: "toColumnLetter",
    value: function toColumnLetter(num) {
      for (var ret = '', a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
        ret = String.fromCharCode(parseInt(num % b / a) + 65) + ret;
      }

      return ret;
    }
  }, {
    key: "toColumnNumber",
    value: function toColumnNumber(val) {
      var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          i,
          j,
          result = 0;

      for (i = 0, j = val.length - 1; i < val.length; i += 1, j -= 1) {
        result += Math.pow(base.length, j) * (base.indexOf(val[i]) + 1);
      }

      return result;
    }
    /*              FORMAS                       */

  }, {
    key: "formaCrearVariable",
    value: function formaCrearVariable(id, nombreVariable, tipoVariable, nombreSiguiente, indexSiguiente, tipoSiguiente, inputSiguiente) {
      //variableForma
      if (tipoVariable.localeCompare("numero") == 0) {
        try {
          var variable = parseFloat($("#variableForma" + id).val());
          window[nombreVariable] = variable;
        } catch (err) {
          console.log(err.message);
          arregloDeErroresFormas.push({
            nombre: nombreVariable,
            ID: id
          });
        }
      } else if (tipoVariable.localeCompare("bit") == 0) {
        try {
          if ($("#variableForma" + id).is(':checked')) {
            window[nombreVariable] = true;
          } else {
            window[nombreVariable] = false;
          }
        } catch (err) {
          console.log(err.message);
          arregloDeErroresFormas.push({
            nombre: nombreVariable,
            ID: id
          });
        }
      } else if (tipoVariable.localeCompare("varchar") == 0) {
        try {
          var variable = $("#variableForma" + id).val();
          window[nombreVariable] = variable;
        } catch (err) {
          console.log(err.message);
          arregloDeErroresFormas.push({
            nombre: nombreVariable,
            ID: id
          });
        }
      } else if (tipoVariable.localeCompare("date") == 0) {
        try {
          var variable = $("#variableForma" + id).datepicker('getDate');
          window[nombreVariable] = variable;
        } catch (err) {
          console.log(err.message);
          arregloDeErroresFormas.push({
            nombre: nombreVariable,
            ID: id
          });
        }
      }

      if (nombreSiguiente != undefined) {
        this.updateForm(nombreSiguiente, indexSiguiente, tipoSiguiente, inputSiguiente);
      } else {
        this.closeModalForma();
        this.iniciarHilo();
      }
    }
  }, {
    key: "iniciarMostrarFormas",
    value: function iniciarMostrarFormas() {
      var _this29 = this;

      arregloHTMLFormas = [];

      for (var i = 0; i < arregloDeFormas.length; i++) {
        if (arregloDeFormas[i].tipo.localeCompare("numero") == 0) {
          if (i + 1 < arregloDeFormas.length) {
            (function () {
              var nombre = arregloDeFormas[i].nombre;
              var id = arregloDeFormas[i].ID;
              var tipo = arregloDeFormas[i].tipo;
              var indexSiguiente = i + 1;
              var nombreSiguiente = arregloDeFormas[i + 1].nombre;
              var idSiguiente = arregloDeFormas[i + 1].ID;
              var tipoSiguiente = arregloDeFormas[i + 1].tipo;
              arregloHTMLFormas[i] = _react["default"].createElement("div", {
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
                className: "row",
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("div", {
                className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
              }, _react["default"].createElement("label", {
                htmlFor: "variableForma" + arregloDeFormas[i].ID,
                className: "col-form-label"
              }, "Valor:")), _react["default"].createElement("div", {
                className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }
              }, _react["default"].createElement("input", {
                id: "variableForma" + arregloDeFormas[i].ID,
                type: "text",
                className: "form-control form-control-sm"
              }))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
                className: "text-center",
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("a", {
                href: "#",
                className: "btn btn-brand active",
                onClick: function onClick() {
                  return _this29.formaCrearVariable(id, nombre, tipo, nombreSiguiente, indexSiguiente, tipoSiguiente, "variableForma" + idSiguiente);
                }
              }, "Guardar")), _react["default"].createElement("br", null));
            })();
          } else {
            (function () {
              var nombre = arregloDeFormas[i].nombre;
              var id = arregloDeFormas[i].ID;
              var tipo = arregloDeFormas[i].tipo;
              arregloHTMLFormas[i] = _react["default"].createElement("div", {
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
                className: "row",
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("div", {
                className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
              }, _react["default"].createElement("label", {
                htmlFor: "variableForma" + arregloDeFormas[i].ID,
                className: "col-form-label"
              }, "Valor:")), _react["default"].createElement("div", {
                className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }
              }, _react["default"].createElement("input", {
                id: "variableForma" + arregloDeFormas[i].ID,
                type: "text",
                className: "form-control form-control-sm"
              }))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
                className: "text-center",
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("a", {
                href: "#",
                className: "btn btn-brand active",
                onClick: function onClick() {
                  return _this29.formaCrearVariable(id, nombre, tipo);
                }
              }, "Guardar")), _react["default"].createElement("br", null));
            })();
          }
        } else if (arregloDeFormas[i].tipo.localeCompare("bit") == 0) {
          if (i + 1 < arregloDeFormas.length) {
            (function () {
              var nombre = arregloDeFormas[i].nombre;
              var id = arregloDeFormas[i].ID;
              var tipo = arregloDeFormas[i].tipo;
              var indexSiguiente = i + 1;
              var nombreSiguiente = arregloDeFormas[i + 1].nombre;
              var idSiguiente = arregloDeFormas[i + 1].ID;
              var tipoSiguiente = arregloDeFormas[i + 1].tipo;
              arregloHTMLFormas[i] = _react["default"].createElement("div", {
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
                className: "row",
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("div", {
                className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
              }, _react["default"].createElement("label", {
                htmlFor: "variableForma" + arregloDeFormas[i].ID,
                className: "col-form-label"
              }, "Valor:")), _react["default"].createElement("div", {
                className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
              }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
                className: "switch-button switch-button-bool",
                style: {
                  margin: "0 auto",
                  display: "block"
                }
              }, _react["default"].createElement("input", {
                type: "checkbox",
                defaultChecked: true,
                name: "guardarFuenteDato",
                id: "variableForma" + arregloDeFormas[i].ID
              }), _react["default"].createElement("span", null, _react["default"].createElement("label", {
                htmlFor: "guardarFuenteDato"
              }))))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
                className: "text-center",
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("a", {
                href: "#",
                className: "btn btn-brand active",
                onClick: function onClick() {
                  return _this29.formaCrearVariable(id, nombre, tipo, nombreSiguiente, indexSiguiente, tipoSiguiente, "variableForma" + idSiguiente);
                }
              }, "Guardar")), _react["default"].createElement("br", null));
            })();
          } else {
            (function () {
              var nombre = arregloDeFormas[i].nombre;
              var id = arregloDeFormas[i].ID;
              var tipo = arregloDeFormas[i].tipo;
              arregloHTMLFormas[i] = _react["default"].createElement("div", {
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
                className: "row",
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("div", {
                className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
              }, _react["default"].createElement("label", {
                htmlFor: "variableForma" + arregloDeFormas[i].ID,
                className: "col-form-label"
              }, "Valor:")), _react["default"].createElement("div", {
                className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
              }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
                className: "switch-button switch-button-bool",
                style: {
                  margin: "0 auto",
                  display: "block"
                }
              }, _react["default"].createElement("input", {
                type: "checkbox",
                defaultChecked: true,
                name: "guardarFuenteDato",
                id: "variableForma" + arregloDeFormas[i].ID
              }), _react["default"].createElement("span", null, _react["default"].createElement("label", {
                htmlFor: "guardarFuenteDato"
              }))))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
                className: "text-center",
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("a", {
                href: "#",
                className: "btn btn-brand active",
                onClick: function onClick() {
                  return _this29.formaCrearVariable(id, nombre, tipo);
                }
              }, "Guardar")), _react["default"].createElement("br", null));
            })();
          }
        } else if (arregloDeFormas[i].tipo.localeCompare("varchar") == 0) {
          if (i + 1 < arregloDeFormas.length) {
            (function () {
              var nombre = arregloDeFormas[i].nombre;
              var id = arregloDeFormas[i].ID;
              var tipo = arregloDeFormas[i].tipo;
              var indexSiguiente = i + 1;
              var nombreSiguiente = arregloDeFormas[i + 1].nombre;
              var idSiguiente = arregloDeFormas[i + 1].ID;
              var tipoSiguiente = arregloDeFormas[i + 1].tipo;
              arregloHTMLFormas[i] = _react["default"].createElement("div", {
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
                className: "row",
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("div", {
                className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
              }, _react["default"].createElement("label", {
                htmlFor: "variableForma" + arregloDeFormas[i].ID,
                className: "col-form-label"
              }, "Valor:")), _react["default"].createElement("div", {
                className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }
              }, _react["default"].createElement("input", {
                id: "variableForma" + arregloDeFormas[i].ID,
                type: "text",
                className: "form-control form-control-sm"
              }))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
                className: "text-center",
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("a", {
                href: "#",
                className: "btn btn-brand active",
                onClick: function onClick() {
                  return _this29.formaCrearVariable(id, nombre, tipo, nombreSiguiente, indexSiguiente, tipoSiguiente, "variableForma" + idSiguiente);
                }
              }, "Guardar")), _react["default"].createElement("br", null));
            })();
          } else {
            (function () {
              var nombre = arregloDeFormas[i].nombre;
              var id = arregloDeFormas[i].ID;
              var tipo = arregloDeFormas[i].tipo;
              arregloHTMLFormas[i] = _react["default"].createElement("div", {
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
                className: "row",
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("div", {
                className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
              }, _react["default"].createElement("label", {
                htmlFor: "variableForma" + arregloDeFormas[i].ID,
                className: "col-form-label"
              }, "Valor:")), _react["default"].createElement("div", {
                className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }
              }, _react["default"].createElement("input", {
                id: "variableForma" + arregloDeFormas[i].ID,
                type: "text",
                className: "form-control form-control-sm"
              }))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
                className: "text-center",
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("a", {
                href: "#",
                className: "btn btn-brand active",
                onClick: function onClick() {
                  return _this29.formaCrearVariable(id, nombre, tipo);
                }
              }, "Guardar")), _react["default"].createElement("br", null));
            })();
          }
        } else if (arregloDeFormas[i].tipo.localeCompare("date") == 0) {
          if (i + 1 < arregloDeFormas.length) {
            (function () {
              var nombre = arregloDeFormas[i].nombre;
              var id = arregloDeFormas[i].ID;
              var tipo = arregloDeFormas[i].tipo;
              var indexSiguiente = i + 1;
              var nombreSiguiente = arregloDeFormas[i + 1].nombre;
              var idSiguiente = arregloDeFormas[i + 1].ID;
              var tipoSiguiente = arregloDeFormas[i + 1].tipo;
              arregloHTMLFormas[i] = _react["default"].createElement("div", {
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
                className: "row",
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("div", {
                className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
              }, _react["default"].createElement("label", {
                htmlFor: "variableForma" + arregloDeFormas[i].ID,
                className: "col-form-label"
              }, "Valor:")), _react["default"].createElement("div", {
                className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }
              }, _react["default"].createElement("div", {
                className: "row",
                style: {
                  display: "flex",
                  justifyContent: "center"
                }
              }, _react["default"].createElement("div", {
                id: "variableForma" + arregloDeFormas[i].ID,
                className: "center-block"
              })))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
                className: "text-center",
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("a", {
                href: "#",
                className: "btn btn-brand active",
                onClick: function onClick() {
                  return _this29.formaCrearVariable(id, nombre, tipo, nombreSiguiente, indexSiguiente, tipoSiguiente, "variableForma" + idSiguiente);
                }
              }, "Guardar")), _react["default"].createElement("br", null));
            })();
          } else {
            (function () {
              var nombre = arregloDeFormas[i].nombre;
              var id = arregloDeFormas[i].ID;
              var tipo = arregloDeFormas[i].tipo;
              arregloHTMLFormas[i] = _react["default"].createElement("div", {
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
                className: "row",
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("div", {
                className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
              }, _react["default"].createElement("label", {
                htmlFor: "variableForma" + arregloDeFormas[i].ID,
                className: "col-form-label"
              }, "Valor:")), _react["default"].createElement("div", {
                className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }
              }, _react["default"].createElement("div", {
                className: "row",
                style: {
                  display: "flex",
                  justifyContent: "center"
                }
              }, _react["default"].createElement("div", {
                id: "variableForma" + arregloDeFormas[i].ID,
                className: "center-block"
              })))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
                className: "text-center",
                style: {
                  width: "100%"
                }
              }, _react["default"].createElement("a", {
                href: "#",
                className: "btn btn-brand active",
                onClick: function onClick() {
                  return _this29.formaCrearVariable(id, nombre, tipo);
                }
              }, "Guardar")), _react["default"].createElement("br", null));
            })();
          }
        }
      }

      ;
      console.log('arregloHTMLFormas');
      console.log(arregloHTMLFormas);
      this.updateForm(arregloDeFormas[0].nombre, 0, arregloDeFormas[0].tipo, "variableForma" + arregloDeFormas[0].ID);
    }
  }, {
    key: "updateForm",
    value: function updateForm(titulo, index, tipo, idInput) {
      this.setState({
        showModalForma: true,
        tituloVariableForma: "Variable: " + titulo,
        htmlForma: arregloHTMLFormas[index]
      }, this.loadFechas(tipo, idInput));
    }
  }, {
    key: "loadFechas",
    value: function loadFechas(tipo, idInput) {
      if (tipo.localeCompare("date") == 0) {
        setTimeout(function () {
          $('#' + idInput).datepicker({
            format: "dd-mm-yyyy",
            todayHighlight: true,
            viewMode: "days",
            minViewMode: "days",
            language: 'es'
          });
        }, 250);
      }
    }
  }, {
    key: "closeModalForma",
    value: function closeModalForma() {
      this.setState({
        showModalForma: false
      });
    }
  }, {
    key: "verificarExistenciaErroresExcel",
    value: function verificarExistenciaErroresExcel(variable) {
      for (var i = 0; i < arregloDeErroresExcel.length; i++) {
        if (arregloDeErroresExcel[i].nombre.localeCompare(variable.nombre) == 0 && arregloDeErroresExcel[i].ID == variable.ID) {
          return true;
        }
      }

      ;
      return false;
    }
  }, {
    key: "verificarExistenciaErroresForma",
    value: function verificarExistenciaErroresForma(variable) {
      for (var i = 0; i < arregloDeErroresFormas.length; i++) {
        if (arregloDeErroresFormas[i].nombre.localeCompare(variable.nombre) == 0 && arregloDeErroresFormas[i].ID == variable.ID) {
          return true;
        }
      }

      ;
      return false;
    }
  }, {
    key: "verificarExistenciaErroresVariable",
    value: function verificarExistenciaErroresVariable(variable) {
      for (var i = 0; i < arregloDeErroresVariables.length; i++) {
        if (arregloDeErroresVariables[i].nombre.localeCompare(variable.nombre) == 0 && arregloDeErroresVariables[i].ID == variable.ID) {
          return true;
        }
      }

      ;
      return false;
    }
    /*
        **************************************
        **************************************
                FIN CALCULO CODIGO
        **************************************
        **************************************
    */

  }, {
    key: "getUsuarios",
    value: function getUsuarios() {
      var _this30 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Usuarios", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this30.setState({
                usuarios: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "goToTimeline",
    value: function goToTimeline(esExcel, idVariableExcel, nombreVariable, esColeccion) {
      this.props.changeStateFirstTimeToTrue();
      this.props.goToTimeline(esExcel, idVariableExcel, nombreVariable, esColeccion);
    }
  }, {
    key: "render",
    value: function render() {
      var _this31 = this;

      return _react["default"].createElement("div", null, _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "nombreFuenteDato",
        className: "col-form-label"
      }, "Nombre de Variable")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("input", {
        id: "nombreFuenteDato",
        defaultValue: this.props.nombreVariable,
        onKeyUp: this.props.actualizarNombreVariable,
        type: "text",
        className: "form-control form-control-sm"
      }))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "idFormula",
        className: "col-form-label"
      }, "Identificador de la Variable en F\xF3rmula")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("input", {
        id: "idFormula",
        defaultValue: this.props.idFormula,
        onKeyUp: this.props.actualizarIdFormula,
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
        htmlFor: "descripcionFuenteDato",
        className: "col-form-label"
      }, "Descripci\xF3n de Variable:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"
      }, _react["default"].createElement("textarea", {
        defaultValue: this.props.descripcionVariable,
        onKeyUp: this.props.actualizarDescripcionVariable,
        className: "form-control",
        id: "descripcionFuenteDato",
        rows: "3"
      }))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "esInstruccionSQL",
        className: "col-form-label"
      }, "Tipo de C\xE1lculo:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "switch-button-sql switch-button-yesno",
        style: {
          margin: "0 auto",
          display: "block"
        }
      }, _react["default"].createElement("input", {
        type: "checkbox",
        defaultChecked: this.state.mostrarInstruccionSQL,
        name: "esInstruccionSQL",
        id: "esInstruccionSQL",
        onClick: this.cambioInstruccionSQL
      }), _react["default"].createElement("span", null, _react["default"].createElement("label", {
        htmlFor: "esInstruccionSQL"
      }))))), !this.state.mostrarInstruccionSQL ? _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "esColeccion",
        className: "col-form-label"
      }, "Tipo de Conjunto:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("div", {
        className: "switch-button-coleccion switch-button-yesno",
        style: {
          margin: "0 auto",
          display: "block"
        }
      }, _react["default"].createElement("input", {
        type: "checkbox",
        defaultChecked: this.state.mostrarEsColeccion,
        name: "esColeccion",
        id: "esColeccion",
        onClick: this.cambioAColeccion
      }), _react["default"].createElement("span", null, _react["default"].createElement("label", {
        htmlFor: "esColeccion"
      }))))) : null, !this.state.mostrarInstruccionSQL ? _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "esObjetoFuenteDato",
        className: "col-form-label"
      }, "Tipo de Variable:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("div", {
        className: "switch-button-variable switch-button-yesno",
        style: {
          margin: "0 auto",
          display: "block"
        }
      }, _react["default"].createElement("input", {
        type: "checkbox",
        defaultChecked: this.state.mostrarEsObjeto,
        name: "esObjetoFuenteDato",
        id: "esObjetoFuenteDato",
        onClick: this.cambioAObjeto
      }), _react["default"].createElement("span", null, _react["default"].createElement("label", {
        htmlFor: "esObjetoFuenteDato"
      }))))) : null, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "periodicidad",
        className: "col-form-label"
      }, "Periodicidad")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("select", {
        id: "periodicidad",
        defaultValue: this.props.periodicidadVariable,
        onChange: this.actualizarPeriodicidad,
        className: "form-control"
      }, _react["default"].createElement("option", {
        value: "-1"
      }, "Ninguno"), periodicidad.map(function (periodicidad, i) {
        return _react["default"].createElement("option", {
          value: periodicidad.nombre,
          key: periodicidad.nombre
        }, periodicidad.nombre);
      })))), this.state.valorPeriodicidad.localeCompare("-1") != 0 ? _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "esObjetoFuenteDato",
        className: "col-form-label"
      }, "Fecha de Inicio de C\xE1lculo:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("input", {
        type: "text",
        className: "form-control",
        id: "fecha"
      }))) : null, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "responsable",
        className: "col-form-label"
      }, "Nombre Encargado")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("select", {
        id: "responsable",
        defaultValue: this.props.responsableVariable,
        onChange: this.props.actualizarNombreEncargado,
        className: "form-control"
      }, _react["default"].createElement("option", {
        value: "-1"
      }, "Ninguno"), this.state.usuarios.map(function (usuario, i) {
        return _react["default"].createElement("option", {
          value: usuario.ID,
          key: usuario.ID
        }, usuario.usuario);
      })))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "categoriaVariable",
        className: "col-form-label"
      }, "Categor\xEDa de Variable")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("input", {
        id: "categoriaVariable",
        defaultValue: this.props.categoriaVariable,
        onKeyUp: this.props.actualizarCategoriaVariable,
        type: "text",
        className: "form-control form-control-sm"
      }))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "guardarFuenteDato",
        className: "col-form-label"
      }, "Guardar Valores Obtenidos en Base de Datos:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "switch-button switch-button-yesno",
        style: {
          margin: "0 auto",
          display: "block"
        }
      }, _react["default"].createElement("input", {
        type: "checkbox",
        defaultChecked: true,
        name: "guardarFuenteDato",
        id: "guardarFuenteDato"
      }), _react["default"].createElement("span", null, _react["default"].createElement("label", {
        htmlFor: "guardarFuenteDato"
      }))))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%",
          border: "1px solid #e6e6f2"
        }
      }, _react["default"].createElement(_FuenteDatoVariableAtributos["default"], {
        atributos: this.props.atributos,
        titulo: this.state.titulo,
        mostrarInstruccionSQL: this.state.mostrarInstruccionSQL,
        nombreCampoNuevoAtributosVario: this.props.nombreCampoNuevoAtributosVario,
        tipoNuevaVariable: this.props.tipoNuevaVariable,
        actualizarNombreCampoNuevoAtributosVario: this.props.actualizarNombreCampoNuevoAtributosVario,
        crearAtributoVariable: this.props.crearAtributoVariable,
        eliminarAtributoVariable: this.props.eliminarAtributoVariable,
        modificarNombreVariable: this.props.modificarNombreVariable,
        mostrarEsObjeto: this.state.mostrarEsObjeto,
        goToCreateConditions: this.props.goToCreateConditions,
        goCreateVariableFieldSQL: this.props.goCreateVariableFieldSQL,
        tipoVariable: this.state.tipoVariable,
        changeStateFirstTimeToFalse: this.props.changeStateFirstTimeToFalse
      })), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-brand active",
        onClick: this.props.guardarVariable
      }, "Modificar Variable"), this.props.tipoVariableOriginal.localeCompare("variable") == 0 ? _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-secondary active",
        style: {
          marginLeft: "10px"
        },
        onClick: function onClick() {
          return _this31.props.eliminarVariable(true);
        }
      }, "Eliminar Variable") : null, this.props.tipoVariableOriginal.localeCompare("variable") == 0 ? _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-primary active",
        style: {
          marginLeft: "10px"
        },
        onClick: this.traerArchivosExcel
      }, "Realizar C\xE1lculo") : null, this.props.tipoVariableOriginal.localeCompare("variable") == 0 ? _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-info active",
        style: {
          marginLeft: "10px"
        },
        onClick: function onClick() {
          return _this31.goToTimeline(false);
        }
      }, "Historial de Variable") : null), _react["default"].createElement("br", null));
    }
  }]);

  return FuenteDatoVariable;
}(_react["default"].Component);
/*<div className={"row"} style={{width: "100%", display: this.state.mostrarEsObjeto ? "" : "none"}}>
    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
        <label htmlFor="objetoPadreID" className="col-form-label">Variable Padre:</label>
    </div>
    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"}>
        <select className="form-control" id="objetoPadreID">
            <option value="-1">Ninguno</option>
        </select>
    </div>
</div>*/


exports["default"] = FuenteDatoVariable;
//# sourceMappingURL=FuenteDatoVariable.js.map
