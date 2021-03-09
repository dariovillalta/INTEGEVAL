import React from 'react';
import sql from 'mssql';
import Slider from 'react-input-slider';
import XLSX from 'xlsx-style';
import { evaluate, round} from 'mathjs';

import Formula from '../../Formula.js';
import InstruccionVariable from '../../InstruccionVariable.js';
import Umbral from '../../Umbral/Umbral.js';
import TimelineVariable from '../../TimelineVariable.js';

const tipoCampos = [ {nombre: "texto"}, {nombre: "booleano"}, {nombre: "fecha"}, {nombre: "número"}, {nombre: "arreglo"}];

const periodicidad = [ {nombre: "diario"}, {nombre: "semanal"}, {nombre: "mensual"}, {nombre: "trimestral"}, {nombre: "bi-anual"}, {nombre: "anual"}];

var formulaG = '', elementosFormulasG = [];
var atributos = [];
var nombreCampoNuevoAtributo = '';
var reglas = [], segmentoRegla = [];
var elementosFormulas = [], formulas = [];
var posicionAtributoSeleccionado = -1;
var nivelNuevoAtributo = 0;
var tipoDeAsignacionSeleccionado = '';
var operacionSeleccionada = '';
var campoSeleccionado = {};
var indiceSeleccionadoSegmentoReglas = -1, indiceSeleccionadoReglas = -1, tipoElementoSeleccionadoRegla = '';

var valorSeleccionado = '', valorSeleccionadoTexto = '';
var indiceSeleccionadoFormula = -1;
var indiceFormulaSeleccionadaEdit = -1;

var idFormula = '', nombreIndicador = '', codigoIndicador = '', toleranciaIndicador = '', valorIdealIndicador = '', tipoValorIdealIndicador = '', tipoIndicador = '', nombreEncargadoIndicador = '';

var banderaEsFormulaIndicador = false, mostrarToleranciaPorcentaje = false, periodicidadIndicador = "-1", fecha = '';
var contadorObjetosGuardados = 0, contadorObjetosAGuardar = 0;








var nivelMaximoVariables = 0;
var arregloDeFuentesDeDatos = [];                           //Arreglo con las fuentes de datos
        //objeto: {tablaID, nombre, descripcion, esObjeto, objetoPadreID, guardar, nivel, [arreglo de atributos]}
            //objeto arreglo de atributos: {nombre, tipo, formula}
window.arregloDeVariables = [];                                //Arreglo con las variables
window.arregloDeErroresVariables = [];
        //objeto: {nombre, descripcion, esObjeto, objetoPadreID, guardar, nivel, [arreglo de atributos]}
            //objeto arreglo de atributos: {nombre, tipo, formula}
var nivelMaximoIndicadores = 0;
window.arregloDeIndicadores = [];                                //Arreglo con las indicadores
        //objeto: {nombre, descripcion, esObjeto, objetoPadreID, guardar, nivel, [arreglo de atributos]}
            //objeto arreglo de atributos: {nombre, tipo, formula}

var banderaImportacionUmbralesRiesgosINICIO = 0;
var banderaImportacionUmbralesRiesgosFIN = 0;
var banderaImportacionUmbralSeccionesRiesgosINICIO = 0;
var banderaImportacionUmbralSeccionesRiesgosFIN = 0;
var banderaImportacionUmbralSeccionesRangoRiesgosINICIO = 0;
var banderaImportacionUmbralSeccionesRangoRiesgosFIN = 0;

var umbralInstitucionalObjeto = {};
var banderaImportacionUmbralObjetoSeccionesRiesgosINICIO = 0;
var banderaImportacionUmbralObjetoSeccionesRiesgosFIN = 0;
var banderaImportacionUmbralObjetoSeccionesRangoRiesgosINICIO = 0;
var banderaImportacionUmbralObjetoSeccionesRangoRiesgosFIN = 0;


var banderaImportacionCamposIndicadoresINICIO = 0;                    //Bandera para saber si termino de importar los campos de los indicadores
var banderaImportacionCamposIndicadoresFIN = 0;                       //Bandera para saber si termino de importar los campos de los indicadores
var banderaImportacionSegmentosCamposIndicadoresINICIO = 0;           //Bandera para saber si termino de importar los segmentos de reglas de los campos de los indicadores
var banderaImportacionSegmentosCamposIndicadoresFIN = 0;              //Bandera para saber si termino de importar los segmentos de reglas de los campos de los indicadores
var banderaImportacionReglasSegmentosCamposIndicadoresINICIO = 0;     //Bandera para saber si termino de importar las reglas de los segmentos de los campos de los indicadores
var banderaImportacionReglasSegmentosCamposIndicadoresFIN = 0;        //Bandera para saber si termino de importar las reglas de los segmentos de los campos de los indicadores
var banderaImportacionFormulasCamposIndicadoresINICIO = 0;            //Bandera para saber si termino de importar las formulas de los campos de los indicadores
var banderaImportacionFormulasCamposIndicadoresFIN = 0;               //Bandera para saber si termino de importar las formulas de los campos de los indicadores
var banderaImportacionElementosFormulasCamposIndicadoresINICIO = 0;   //Bandera para saber si termino de importar los elementos de las formulas de los campos de los indicadores
var banderaImportacionElementosFormulasCamposIndicadoresFIN = 0;      //Bandera para saber si termino de importar los elementos de las formulas de los campos de los indicadores
var banderaImportacionUmbralesIndicadoresINICIO = 0;
var banderaImportacionUmbralesIndicadoresFIN = 0;
var banderaImportacionUmbralSeccionesIndicadoresINICIO = 0;
var banderaImportacionUmbralSeccionesIndicadoresFIN = 0;
var banderaImportacionUmbralSeccionesRangoIndicadoresINICIO = 0;
var banderaImportacionUmbralSeccionesRangoIndicadoresFIN = 0;


window.arregloConexionesATablas = [];          //Arreglo con los valores para poder conectarse a las tablas
window.arregloResultadosDeTablas = [];         //Arreglo con los valores obtenidos despues de conectarse a las tablas

var banderaImportacionCamposVariablesINICIO = 0;                    //Bandera para saber si termino de importar los campos de las variables
var banderaImportacionCamposVariablesFIN = 0;                       //Bandera para saber si termino de importar los campos de las variables
var banderaImportacionSegmentosCamposVariablesINICIO = 0;           //Bandera para saber si termino de importar los segmentos de reglas de los campos de las variables
var banderaImportacionSegmentosCamposVariablesFIN = 0;              //Bandera para saber si termino de importar los segmentos de reglas de los campos de las variables
var banderaImportacionReglasSegmentosCamposVariablesINICIO = 0;     //Bandera para saber si termino de importar las reglas de los segmentos de los campos de las variables
var banderaImportacionReglasSegmentosCamposVariablesFIN = 0;        //Bandera para saber si termino de importar las reglas de los segmentos de los campos de las variables
var banderaImportacionFormulasCamposVariablesINICIO = 0;            //Bandera para saber si termino de importar las formulas de los campos de las variables
var banderaImportacionFormulasCamposVariablesFIN = 0;               //Bandera para saber si termino de importar las formulas de los campos de las variables
var banderaImportacionElementosFormulasCamposVariablesINICIO = 0;   //Bandera para saber si termino de importar los elementos de las formulas de los campos de las variables
var banderaImportacionElementosFormulasCamposVariablesFIN = 0;      //Bandera para saber si termino de importar los elementos de las formulas de los campos de las variables
var banderaImportacionConecionesATablasINICIO = 0;                  //Bandera para saber si termino de importar los valores para poder conetarse a las tablas
var banderaImportacionConecionesATablasFIN = 0;                     //Bandera para saber si termino de importar los valores para poder conetarse a las tablas
var banderaImportacionValoresDeTablasDeFuenteDeDatosINICIO = 0;     //Bandera para saber si termino de importar los valores de las tablas de fuentes de datos
var banderaImportacionValoresDeTablasDeFuenteDeDatosFIN = 0;        //Bandera para saber si termino de importar los valores de las tablas de fuentes de datos

window.arregloDeExcel = [];                           //Arreglo de variables de excel
window.arregloDeErroresExcel = [];
        //objeto: {nombre, descripcion, esObjeto, objetoPadreID, guardar, nivel, [arreglo de atributos]}
            //objeto arreglo de atributos: {nombre, tipo, formula}
var banderaImportacionVariablesExcelINICIO = 0;                     //Bandera para saber si termino de importar variables excel
var banderaImportacionVariablesExcelFIN = 0;                        //Bandera para saber si termino de importar variables excel

window.arregloDeFormas = [];                            //Arreglo con las variables de formas
window.arregloDeErroresFormas = [];
window.arregloHTMLFormas = [];                          //Arreglo que contiene el codigo html de las formas

var banderaVerificarPeriodicidadINICIO = 0;                         //Bandera para saber si termino de verificar periodicidad de todo tipo de variable(excel, forma y variable)
var banderaVerificarPeriodicidadFIN = 0;                            //Bandera para saber si termino de verificar periodicidad de todo tipo de variable(excel, forma y variable)
var banderaImportarValoresPeriodicidadINICIO = 0;                         //Bandera para saber si termino de verificar periodicidad de todo tipo de variable(excel, forma y variable)
var banderaImportarValoresPeriodicidadFIN = 0;                            //Bandera para saber si termino de verificar periodicidad de todo tipo de variable(excel, forma y variable)

export default class EditarIndicador extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componenteActual: 'editarIndicador',
            navbar: "",
            x: 0,
            atributos: [],
            tipoNuevaVariable: "",
            reglas: [],
            mostrarToleranciaPorcentaje: mostrarToleranciaPorcentaje,
            periodicidadIndicador: periodicidadIndicador,
            esEditarVar: false,
            esOperacionSQL: false,
            operacionSQL: "",
            formulaSeleccionadaEdit: null,
            condicionFormula: "",
            condicionElemento: "",
            usuarios: [],
            variable: null
        }
        this.getIndicator = this.getIndicator.bind(this);
        this.traerSegmentosDeCampo = this.traerSegmentosDeCampo.bind(this);
        this.traerReglasDeCampo = this.traerReglasDeCampo.bind(this);
        this.traerFormulasDeCampo = this.traerFormulasDeCampo.bind(this);
        this.traerElementosDeCampo = this.traerElementosDeCampo.bind(this);
        this.traerElementosDeFormulaIndicador = this.traerElementosDeFormulaIndicador.bind(this);

        this.editarIndicador = this.editarIndicador.bind(this);
        this.goToCreateFormula = this.goToCreateFormula.bind(this);
        this.goCrearUmbral = this.goCrearUmbral.bind(this);
        this.retornoEditarIndicador = this.retornoEditarIndicador.bind(this);
        this.retornoCampoFormula = this.retornoCampoFormula.bind(this);
        this.retornoCampoCondicion = this.retornoCampoCondicion.bind(this);
        this.retornarValor = this.retornarValor.bind(this);
        this.retornoOperacion = this.retornoOperacion.bind(this);
        this.actualizarIndiceSeleccionadoReglas = this.actualizarIndiceSeleccionadoReglas.bind(this);
        this.actualizarNivelNuevaRegla = this.actualizarNivelNuevaRegla.bind(this);
        this.actualizarSeleccionFormula = this.actualizarSeleccionFormula.bind(this);

        this.goToCreateConditions = this.goToCreateConditions.bind(this);
        this.goToCreateConditionsClickNavBarFormula = this.goToCreateConditionsClickNavBarFormula.bind(this);
        this.goToCreateFormulaCampo = this.goToCreateFormulaCampo.bind(this);
        this.actualizarNombreCampoNuevoAtributo = this.actualizarNombreCampoNuevoAtributo.bind(this);
        this.retornarCodigoOperacion = this.retornarCodigoOperacion.bind(this);
        this.verificarNoExisteNombreCampo = this.verificarNoExisteNombreCampo.bind(this);
        this.crearAtributoVariable = this.crearAtributoVariable.bind(this);
        this.anadirRegla = this.anadirRegla.bind(this);
        this.revisarTipoAnadirFormula = this.revisarTipoAnadirFormula.bind(this);
        this.anadirFormulaIndicador = this.anadirFormulaIndicador.bind(this);
        this.anadirFormula = this.anadirFormula.bind(this);
        this.getElementsFromFormula = this.getElementsFromFormula.bind(this);
        this.modificarRegla = this.modificarRegla.bind(this);
        this.eliminarRegla = this.eliminarRegla.bind(this);
        this.verificarModificarFormula = this.verificarModificarFormula.bind(this);
        this.modificarFormula = this.modificarFormula.bind(this);
        this.modificarFormulaGlobal = this.modificarFormulaGlobal.bind(this);
        this.eliminarFormula = this.eliminarFormula.bind(this);
        
        this.updateIdFormula = this.updateIdFormula.bind(this);
        this.updateNombreIndicador = this.updateNombreIndicador.bind(this);
        this.updateCodigoIndicador = this.updateCodigoIndicador.bind(this);
        this.updateValorIdealIndicador = this.updateValorIdealIndicador.bind(this);
        this.updateTipoValorIdealIndicador = this.updateTipoValorIdealIndicador.bind(this);
        this.updateToleranciaIndicador = this.updateToleranciaIndicador.bind(this);
        this.updatePeriodicidadIndicador = this.updatePeriodicidadIndicador.bind(this);
        this.cargarDatePicker = this.cargarDatePicker.bind(this);
        this.updateTipoIndicador = this.updateTipoIndicador.bind(this);
        this.updateNombreEncargadoIndicador = this.updateNombreEncargadoIndicador.bind(this);
        this.isValidDate = this.isValidDate.bind(this);

        this.verificarSiExisteExcelEnResultadosHistoricosModificar = this.verificarSiExisteExcelEnResultadosHistoricosModificar.bind(this);
        this.crearTablaDeResultadoNombreModificar = this.crearTablaDeResultadoNombreModificar.bind(this);
        this.crearResultadoNombreModificar = this.crearResultadoNombreModificar.bind(this);
        this.modificarResultadosNombre = this.modificarResultadosNombre.bind(this);
        this.verificarPeriodicidadGuardarModificar = this.verificarPeriodicidadGuardarModificar.bind(this);
        this.updatePeriodicidadModificar = this.updatePeriodicidadModificar.bind(this);

        this.tieneEspaciosEnBlanco = this.tieneEspaciosEnBlanco.bind(this);

        this.getUsuarios = this.getUsuarios.bind(this);





        this.saveBitacora = this.saveBitacora.bind(this);

        this.traerArchivosExcel = this.traerArchivosExcel.bind(this);
        this.traerVariablesExcel = this.traerVariablesExcel.bind(this);
        this.revisarFinImportacionVariablesExcel = this.revisarFinImportacionVariablesExcel.bind(this);
        this.traerFormas = this.traerFormas.bind(this);
        this.traerRiesgos = this.traerRiesgos.bind(this);
        this.inicioTraerUmbralesRiesgos = this.inicioTraerUmbralesRiesgos.bind(this);
        this.traerUmbralesRiesgos = this.traerUmbralesRiesgos.bind(this);
        this.revisarFinImportacionUmbralesRiesgos = this.revisarFinImportacionUmbralesRiesgos.bind(this);
        this.inicioTraerUmbralSeccionesRiesgos = this.inicioTraerUmbralSeccionesRiesgos.bind(this);
        this.traerUmbralesSeccionesRiesgos = this.traerUmbralesSeccionesRiesgos.bind(this);
        this.revisarFinImportacionUmbralSeccionesRiesgos = this.revisarFinImportacionUmbralSeccionesRiesgos.bind(this);
        this.inicioTraerUmbralSeccionesRangoRiesgos = this.inicioTraerUmbralSeccionesRangoRiesgos.bind(this);
        this.traerUmbralesSeccionesRangoRiesgos = this.traerUmbralesSeccionesRangoRiesgos.bind(this);
        this.revisarFinImportacionUmbralesSeccionesRangoRiesgos = this.revisarFinImportacionUmbralesSeccionesRangoRiesgos.bind(this);

        this.traerUmbralesObjetoRiesgos = this.traerUmbralesObjetoRiesgos.bind(this);
        this.revisarFinImportacionUmbralesObjetoRiesgos = this.revisarFinImportacionUmbralesObjetoRiesgos.bind(this);
        this.inicioTraerUmbralObjetoSeccionesRiesgos = this.inicioTraerUmbralObjetoSeccionesRiesgos.bind(this);
        this.traerUmbralesObjetoSeccionesRiesgos = this.traerUmbralesObjetoSeccionesRiesgos.bind(this);
        this.revisarFinImportacionUmbralObjetoSeccionesRiesgos = this.revisarFinImportacionUmbralObjetoSeccionesRiesgos.bind(this);
        this.inicioTraerUmbralObjetoSeccionesRangoRiesgos = this.inicioTraerUmbralObjetoSeccionesRangoRiesgos.bind(this);
        this.traerUmbralesObjetoSeccionesRangoRiesgos = this.traerUmbralesObjetoSeccionesRangoRiesgos.bind(this);
        this.revisarFinImportacionUmbralesObjetoSeccionesRangoRiesgos = this.revisarFinImportacionUmbralesObjetoSeccionesRangoRiesgos.bind(this);

        this.getNivelMaximoIndicadores = this.getNivelMaximoIndicadores.bind(this);
        this.traerIndicadores = this.traerIndicadores.bind(this);
        this.traerElementosIndicador = this.traerElementosIndicador.bind(this);
        this.traerAtributosIndicadores = this.traerAtributosIndicadores.bind(this);
        this.revisarFinImportacionCamposIndicadores = this.revisarFinImportacionCamposIndicadores.bind(this);
        this.inicioTraerSegmentosDeCamposIndicadores = this.inicioTraerSegmentosDeCamposIndicadores.bind(this);
        this.traerSegmentosDeCamposIndicadores = this.traerSegmentosDeCamposIndicadores.bind(this);
        this.revisarFinImportacionSegmentosCamposIndicadores = this.revisarFinImportacionSegmentosCamposIndicadores.bind(this);
        this.inicioTraerReglasDeSegmentosIndicadores = this.inicioTraerReglasDeSegmentosIndicadores.bind(this);
        this.traerReglasDeSegmentosIndicadores = this.traerReglasDeSegmentosIndicadores.bind(this);
        this.revisarFinImportacionReglasSegmentosIndicadores = this.revisarFinImportacionReglasSegmentosIndicadores.bind(this);
        this.inicioTraerFormulasDeCamposIndicadores = this.inicioTraerFormulasDeCamposIndicadores.bind(this);
        this.traerFormulasDeCamposIndicadores = this.traerFormulasDeCamposIndicadores.bind(this);
        this.revisarFinImportacionFormulasCamposIndicadores = this.revisarFinImportacionFormulasCamposIndicadores.bind(this);
        this.inicioTraerElementosFormulasDeCamposIndicadores = this.inicioTraerElementosFormulasDeCamposIndicadores.bind(this);
        this.traerElementosFormulasDeCamposIndicadores = this.traerElementosFormulasDeCamposIndicadores.bind(this);
        this.revisarFinImportacionElementosFormulasCamposIndicadores = this.revisarFinImportacionElementosFormulasCamposIndicadores.bind(this);
        this.inicioTraerUmbralesIndicadores = this.inicioTraerUmbralesIndicadores.bind(this);
        this.traerUmbralesIndicadores = this.traerUmbralesIndicadores.bind(this);
        this.revisarFinImportacionUmbralesIndicadores = this.revisarFinImportacionUmbralesIndicadores.bind(this);
        this.inicioTraerUmbralSeccionesIndicadores = this.inicioTraerUmbralSeccionesIndicadores.bind(this);
        this.traerUmbralesSeccionesIndicadores = this.traerUmbralesSeccionesIndicadores.bind(this);
        this.revisarFinImportacionUmbralSeccionesIndicadores = this.revisarFinImportacionUmbralSeccionesIndicadores.bind(this);
        this.inicioTraerUmbralSeccionesRangoIndicadores = this.inicioTraerUmbralSeccionesRangoIndicadores.bind(this);
        this.traerUmbralesSeccionesRangoIndicadores = this.traerUmbralesSeccionesRangoIndicadores.bind(this);
        this.revisarFinImportacionUmbralesSeccionesRangoIndicadores = this.revisarFinImportacionUmbralesSeccionesRangoIndicadores.bind(this);

        this.getNivelMaximoVariables = this.getNivelMaximoVariables.bind(this);
        this.traerVariables = this.traerVariables.bind(this);
        this.traerInstruccionSQLCampos = this.traerInstruccionSQLCampos.bind(this);
        this.traerInstruccionSQL = this.traerInstruccionSQL.bind(this);
        this.traerAtributosVariables = this.traerAtributosVariables.bind(this);
        this.revisarFinImportacionCamposVariables = this.revisarFinImportacionCamposVariables.bind(this);
        this.inicioTraerSegmentosDeCamposVariables = this.inicioTraerSegmentosDeCamposVariables.bind(this);
        this.traerSegmentosDeCamposVariables = this.traerSegmentosDeCamposVariables.bind(this);
        this.revisarFinImportacionSegmentosCamposVariables = this.revisarFinImportacionSegmentosCamposVariables.bind(this);
        this.inicioTraerReglasDeSegmentosVariables = this.inicioTraerReglasDeSegmentosVariables.bind(this);
        this.traerReglasDeSegmentosVariables = this.traerReglasDeSegmentosVariables.bind(this);
        this.revisarFinImportacionReglasSegmentosVariables = this.revisarFinImportacionReglasSegmentosVariables.bind(this);
        this.inicioTraerFormulasDeCamposVariables = this.inicioTraerFormulasDeCamposVariables.bind(this);
        this.traerFormulasDeCamposVariables = this.traerFormulasDeCamposVariables.bind(this);
        this.revisarFinImportacionFormulasCamposVariables = this.revisarFinImportacionFormulasCamposVariables.bind(this);
        this.inicioTraerElementosFormulasDeCamposVariables = this.inicioTraerElementosFormulasDeCamposVariables.bind(this);
        this.traerElementosFormulasDeCamposVariables = this.traerElementosFormulasDeCamposVariables.bind(this);
        this.revisarFinImportacionElementosFormulasCamposVariables = this.revisarFinImportacionElementosFormulasCamposVariables.bind(this);
        
        this.inicioTraerConeccionesATablas = this.inicioTraerConeccionesATablas.bind(this);
        this.noHaSidoImportadaConeccion = this.noHaSidoImportadaConeccion.bind(this);
        this.traerConeccionesATablas = this.traerConeccionesATablas.bind(this);
        this.finTraerConeccionesATablas = this.finTraerConeccionesATablas.bind(this);
        this.inicioTraerResultadosDeFuenteDeDatos = this.inicioTraerResultadosDeFuenteDeDatos.bind(this);
        this.traerResultadosDeFuenteDeDatos = this.traerResultadosDeFuenteDeDatos.bind(this);
        this.finTraerResultadosDeFuenteDeDatos = this.finTraerResultadosDeFuenteDeDatos.bind(this);

        this.addDays = this.addDays.bind(this);
        this.addMonths = this.addMonths.bind(this);
        this.addYears = this.addYears.bind(this);

        this.verificarPeriodicidad = this.verificarPeriodicidad.bind(this);
        this.traerPeriodicidadVariable = this.traerPeriodicidadVariable.bind(this);
        this.verificarFinPeriodicidad = this.verificarFinPeriodicidad.bind(this);
        this.iniciarImportacionValoresCalculados = this.iniciarImportacionValoresCalculados.bind(this);
        this.getResultsVariables = this.getResultsVariables.bind(this);
        this.getResultsVariablesFieldsInit = this.getResultsVariablesFieldsInit.bind(this);
        this.getFieldResults = this.getFieldResults.bind(this);
        this.getResultsIndicators = this.getResultsIndicators.bind(this);
        this.getResultsIndicatorsFieldsInit = this.getResultsIndicatorsFieldsInit.bind(this);
        this.getFieldIndicatorsResults = this.getFieldIndicatorsResults.bind(this);
        this.verificarFinImportacionValoresCalculados = this.verificarFinImportacionValoresCalculados.bind(this);

        this.codigoIniciacion = this.codigoIniciacion.bind(this);
        this.iniciacionElementosFormula = this.iniciacionElementosFormula.bind(this);
        this.iniciacionVariable = this.iniciacionVariable.bind(this);
        this.iniciacionCampo = this.iniciacionCampo.bind(this);
        this.crearCodigoFuenteDato = this.crearCodigoFuenteDato.bind(this);
        this.crearCodigoFuenteDatoSQL = this.crearCodigoFuenteDatoSQL.bind(this);
        this.crearCodigoSegmentoReglas = this.crearCodigoSegmentoReglas.bind(this);
        this.crearCodigoSegmentoReglasFormaOExcel = this.crearCodigoSegmentoReglasFormaOExcel.bind(this);
        this.arregloCodigoRegla = this.arregloCodigoRegla.bind(this);
        this.arregloCodigoReglaFormaOExcel = this.arregloCodigoReglaFormaOExcel.bind(this);
        this.agregarCodigoGuardarVariable = this.agregarCodigoGuardarVariable.bind(this);
        this.crearNivel = this.crearNivel.bind(this);
        this.isValidDate = this.isValidDate.bind(this);
        this.existeOperacion = this.existeOperacion.bind(this);
        this.guardarOperacionSQL = this.guardarOperacionSQL.bind(this);

        this.crearVariablesExcel = this.crearVariablesExcel.bind(this);
        this.getArregloPosicionesExcel = this.getArregloPosicionesExcel.bind(this);
        this.getObjetoLetraNumeroCelda = this.getObjetoLetraNumeroCelda.bind(this);
        this.esLetra = this.esLetra.bind(this);
        this.toColumnLetter = this.toColumnLetter.bind(this);
        this.toColumnNumber = this.toColumnNumber.bind(this);

        this.formaCrearVariable = this.formaCrearVariable.bind(this);
        this.iniciarMostrarFormas = this.iniciarMostrarFormas.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.loadFechas = this.loadFechas.bind(this);
        this.closeModalForma = this.closeModalForma.bind(this);

        this.iniciarCalculoExcel = this.iniciarCalculoExcel.bind(this);
        this.iniciarCalculoFormas = this.iniciarCalculoFormas.bind(this);
        this.iniciarHilo = this.iniciarHilo.bind(this);

        this.crearCodigoFuenteDatoIndicadores = this.crearCodigoFuenteDatoIndicadores.bind(this);
        this.crearNivelIndicadores = this.crearNivelIndicadores.bind(this);
        this.crearCodigoSegmentoReglasIndicadores = this.crearCodigoSegmentoReglasIndicadores.bind(this);
        this.crearCodigoSegmentoReglasFormaOExcelIndicadores = this.crearCodigoSegmentoReglasFormaOExcelIndicadores.bind(this);
        this.arregloCodigoReglaIndicadores = this.arregloCodigoReglaIndicadores.bind(this);
        this.arregloCodigoReglaFormaOExcelIndicadores = this.arregloCodigoReglaFormaOExcelIndicadores.bind(this);
        this.reglaIndicadorTotal = this.reglaIndicadorTotal.bind(this);
        this.iniciarCalculoIndicadores = this.iniciarCalculoIndicadores.bind(this);

        this.guardarVariablesCalculadas = this.guardarVariablesCalculadas.bind(this);
        this.verificarSiExisteIndicadorEnResultadosHistoricos = this.verificarSiExisteIndicadorEnResultadosHistoricos.bind(this);
        this.crearTablaDeResultadoNombreIndicador = this.crearTablaDeResultadoNombreIndicador.bind(this);
        this.crearResultadoNombreIndicador = this.crearResultadoNombreIndicador.bind(this);
        this.guardarResultadosNombreIndicador = this.guardarResultadosNombreIndicador.bind(this);
        this.guardarIndicador = this.guardarIndicador.bind(this);
        this.borrarIndicador = this.borrarIndicador.bind(this);

        this.verificarPeriodicidadGuardar = this.verificarPeriodicidadGuardar.bind(this);
        this.updatePeriodicidad = this.updatePeriodicidad.bind(this);
        this.guardarPeriodicidad = this.guardarPeriodicidad.bind(this);

        this.verificarExistenciaErroresExcel = this.verificarExistenciaErroresExcel.bind(this);
        this.verificarExistenciaErroresForma = this.verificarExistenciaErroresForma.bind(this);
        this.verificarExistenciaErroresVariable = this.verificarExistenciaErroresVariable.bind(this);

        this.eliminarIndicador = this.eliminarIndicador.bind(this);
        this.goToTimeline = this.goToTimeline.bind(this);
    }

    componentWillUnmount() {
        periodicidadIndicador = '-1';
        mostrarToleranciaPorcentaje = false;
        fecha = '';
    }

    componentDidMount () {
        this.getIndicator();
        this.traerElementosDeFormulaIndicador();
        this.getUsuarios();
    }

    getIndicator () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Indicadores where ID  = "+this.props.idIndicadorSeleccionado, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            formulaG = result.recordset[0].formula;
                            idFormula = result.recordset[0].idFormula;
                            nombreIndicador = result.recordset[0].nombre;
                            codigoIndicador = result.recordset[0].codigo;
                            toleranciaIndicador = result.recordset[0].tolerancia;
                            valorIdealIndicador = result.recordset[0].valorIdeal;
                            tipoValorIdealIndicador = result.recordset[0].tipoValorIdeal;
                            periodicidadIndicador = result.recordset[0].periodicidad;
                            fecha = result.recordset[0].fechaInicioCalculo;
                            tipoIndicador = result.recordset[0].tipoIndicador;
                            nombreEncargadoIndicador = result.recordset[0].responsable;
                            $("#nombreIndicador").val(nombreIndicador);
                            $("#codigo").val(codigoIndicador);
                            $("#tolerancia").val(toleranciaIndicador);
                            $("#valorIdeal").val(valorIdealIndicador);
                            $("#tipoValorIdeal").val(tipoValorIdealIndicador);
                            $("#periodicidad").val(periodicidadIndicador);
                            $("#tipoIndicador").val(tipoIndicador);
                            $("#responsable").val(nombreEncargadoIndicador);

                            var mostrarToleranciaPorcentaje = false;
                            if(tipoValorIdealIndicador.localeCompare("porcentual") == 0)
                                mostrarToleranciaPorcentaje = true;
                            this.setState({
                                x: result.recordset[0].peso,
                                mostrarToleranciaPorcentaje: mostrarToleranciaPorcentaje,
                                periodicidadIndicador: periodicidadIndicador,
                            }, this.cargarDatePicker );
                        }
                    });
                }
            });
        }); // fin transaction

        const transaction1 = new sql.Transaction( this.props.pool );
        transaction1.begin(err => {
            var rolledBack = false;
            transaction1.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction1);
            request.query("select * from IndicadoresCampos where indicadorID = "+this.props.idIndicadorSeleccionado, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        contadorObjetosGuardados++;
                        transaction1.rollback(err => {
                        });
                    }
                } else {
                    transaction1.commit(err => {
                        if(result.recordset.length > 0) {
                            atributos = result.recordset;
                            this.setState({
                                atributos: result.recordset
                            });
                            for (var i = 0; i < result.recordset.length; i++) {
                                this.traerSegmentosDeCampo(result.recordset[i], i);
                                this.traerFormulasDeCampo(result.recordset[i], i);
                            };
                        }
                    });
                }
            });
        }); // fin transaction
    }

    traerSegmentosDeCampo (campo, posicionAtributo) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from SegmentoReglasIndicadores where indicadorID = "+this.props.idIndicadorSeleccionado+" and indicadorCampoID = "+campo.ID, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        contadorObjetosGuardados++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            if(segmentoRegla[posicionAtributo] ==  null)
                                segmentoRegla[posicionAtributo] = [];
                            for (var i = 0; i < result.recordset.length; i++) {
                                result.recordset[i].variableID = result.recordset[i].variableIDCreacionCodigo;
                            };
                            segmentoRegla[posicionAtributo] = result.recordset;
                            for (var i = 0; i < segmentoRegla[posicionAtributo].length; i++) {
                                this.traerReglasDeCampo(campo, segmentoRegla[posicionAtributo][i], posicionAtributo, i);
                            };
                        }
                    });
                }
            });
        }); // fin transaction
    }

    traerReglasDeCampo (campo, segmento, posicionAtributo, posicionSegmento) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ReglasIndicadores where indicadorID = "+this.props.idIndicadorSeleccionado+" and indicadorCampoID = "+campo.ID+" and segmentoReglaID = "+segmento.ID, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        contadorObjetosGuardados++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            var tempCopy = result.recordset;
                            tempCopy.sort(function(a, b){
                                return a.reglaPadreID-b.reglaPadreID}
                            );
                            if(reglas[posicionAtributo] == null)
                                reglas[posicionAtributo] = [];
                            if(reglas[posicionAtributo][posicionSegmento] == null)
                                reglas[posicionAtributo][posicionSegmento] = [];
                            reglas[posicionAtributo][posicionSegmento] = tempCopy;
                        }
                    });
                }
            });
        }); // fin transaction
    }

    traerFormulasDeCampo (campo, posicionAtributo) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from FormulasIndicadoresCampos where indicadorID = "+this.props.idIndicadorSeleccionado+" and indicadorCampoID = "+campo.ID, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        contadorObjetosGuardados++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            if(formulas[posicionAtributo] == null)
                                formulas[posicionAtributo] = [];
                            formulas[posicionAtributo] = result.recordset;
                            for (var i = 0; i < formulas[posicionAtributo].length; i++) {
                                this.traerElementosDeCampo(campo, formulas[posicionAtributo][i], posicionAtributo, i);
                            };
                        }
                    });
                }
            });
        }); // fin transaction
    }

    traerElementosDeCampo (campo, formula, posicionAtributo, posicionFormula) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ElementoFormulasIndicadoresCampos where indicadorID = "+this.props.idIndicadorSeleccionado+" and indicadorCampoID = "+campo.ID+" and formulaID = "+formula.ID, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        contadorObjetosGuardados++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            if(elementosFormulas[posicionAtributo] == null)
                                elementosFormulas[posicionAtributo] = [];
                            if(elementosFormulas[posicionAtributo][posicionFormula] == null)
                                elementosFormulas[posicionAtributo][posicionFormula] = [];
                            elementosFormulas[posicionAtributo][posicionFormula] = result.recordset;
                        }
                    });
                }
            });
        }); // fin transaction
    }

    traerElementosDeFormulaIndicador () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ElementoIndicador where indicadorID = "+this.props.idIndicadorSeleccionado, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        contadorObjetosGuardados++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            elementosFormulasG = result.recordset;
                        }
                    });
                }
            });
        }); // fin transaction
    }






    editarIndicador () {
        var idFormula = $("#idFormula").val();
        var nombre = $("#nombreIndicador").val();
        var codigo = $("#codigo").val();
        var formula = formulaG;
        var peso = this.state.x;
        var valorIdeal = parseInt($("#valorIdeal").val());
        var tipoValorIdeal = $("#tipoValorIdeal").val();
        var tolerancia = parseInt($("#tolerancia").val());
        var tipoIndicador = $("#tipoIndicador").val();
        var periodicidad = $("#periodicidad").val();
        var fecha = $("#fecha").datepicker('getDate');
        if(tipoIndicador.localeCompare("-1"))
            fecha = new Date(1964, 4, 28);
        var responsable = $("#responsable").val();
        var riesgoPadre = this.props.riesgoPadre;

        const transaction1 = new sql.Transaction( this.props.pool );
        transaction1.begin(err => {
            var rolledBack = false;
            transaction1.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction1);
            request.query("DELETE FROM ElementoIndicador WHERE indicadorID = "+this.props.idIndicadorSeleccionado, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction1.rollback(err => {
                        });
                    }
                } else {
                    transaction1.commit(err => {
                    });
                }
            });
        }); // fin transaction1
        const transaction2 = new sql.Transaction( this.props.pool );
        transaction2.begin(err => {
            var rolledBack = false;
            transaction2.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction2);
            request.query("DELETE FROM IndicadoresCampos WHERE indicadorID = "+this.props.idIndicadorSeleccionado, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction2.rollback(err => {
                        });
                    }
                } else {
                    transaction2.commit(err => {
                    });
                }
            });
        }); // fin transaction2
        const transaction3 = new sql.Transaction( this.props.pool );
        transaction3.begin(err => {
            var rolledBack = false;
            transaction3.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction3);
            request.query("DELETE FROM FormulasIndicadoresCampos WHERE indicadorID = "+this.props.idIndicadorSeleccionado, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction3.rollback(err => {
                        });
                    }
                } else {
                    transaction3.commit(err => {
                    });
                }
            });
        }); // fin transaction3
        const transaction4 = new sql.Transaction( this.props.pool );
        transaction4.begin(err => {
            var rolledBack = false;
            transaction4.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction4);
            request.query("DELETE FROM ElementoFormulasIndicadoresCampos WHERE indicadorID = "+this.props.idIndicadorSeleccionado, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction4.rollback(err => {
                        });
                    }
                } else {
                    transaction4.commit(err => {
                    });
                }
            });
        }); // fin transaction4
        const transaction5 = new sql.Transaction( this.props.pool );
        transaction5.begin(err => {
            var rolledBack = false;
            transaction4.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction5);
            request.query("DELETE FROM SegmentoReglasIndicadores WHERE indicadorID = "+this.props.idIndicadorSeleccionado, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction5.rollback(err => {
                        });
                    }
                } else {
                    transaction5.commit(err => {
                    });
                }
            });
        }); // fin transaction5
        const transaction6 = new sql.Transaction( this.props.pool );
        transaction6.begin(err => {
            var rolledBack = false;
            transaction4.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction6);
            request.query("DELETE FROM ReglasIndicadores WHERE indicadorID = "+this.props.idIndicadorSeleccionado, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction6.rollback(err => {
                        });
                    }
                } else {
                    transaction6.commit(err => {
                    });
                }
            });
        }); // fin transaction6

        if(idFormula.length > 0 && idFormula.length < 101) {
            if(nombre.length > 0 && nombre.length < 501) {
                if(!this.tieneEspaciosEnBlanco(nombre)) {
                    if(codigo.length > 0 && codigo.length < 101) {
                        if(formula.length > 0 && formula.length < 501) {
                            if( !isNaN(parseInt(peso)) ) {
                                if( !isNaN(parseInt(tolerancia)) ) {
                                    if( !isNaN(parseInt(valorIdeal)) ) {
                                        if(tipoValorIdeal.length > 0 && tipoValorIdeal.length < 21) {
                                            if(periodicidad.length > 0 && periodicidad.length < 51) {
                                                if(tipoIndicador.length > 0 && tipoIndicador.length < 21) {
                                                    if(responsable.length > 0) {
                                                        if( !isNaN(parseInt(riesgoPadre)) ) {
                                                            if(this.isValidDate(fecha)) {
                                                                
                                                                const transaction = new sql.Transaction( this.props.pool );
                                                                transaction.begin(err => {
                                                                    var rolledBack = false;
                                                                    transaction.on('rollback', aborted => {
                                                                        rolledBack = true;
                                                                    });
                                                                    const request = new sql.Request(transaction);
                                                                    request.query("update Indicadores set idFormula = '"+idFormula+"' nombre = '"+nombre+"', codigo = '"+codigo+"', formula = '"+formula+"', peso = "+peso+", tolerancia = "+tolerancia+", valorIdeal = "+valorIdeal+", tipoValorIdeal = '"+tipoValorIdeal+"', periodicidad = '"+periodicidad+"', tipoIndicador = '"+tipoIndicador+"', responsable = '"+responsable+"', idRiesgoPadre = "+riesgoPadre+", fechaInicioCalculo = '"+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+"' WHERE ID = "+this.props.idIndicadorSeleccionado, (err, result) => {
                                                                        if (err) {
                                                                            console.log(err);
                                                                            if (!rolledBack) {
                                                                                transaction.rollback(err => {
                                                                                });
                                                                            }
                                                                        } else {
                                                                            transaction.commit(err => {
                                                                                alert("Indicador Modificado.");
                                                                                contadorObjetosGuardados = 0;
                                                                                contadorObjetosAGuardar = 0;
                                                                                var indicador = {ID: this.props.idIndicadorSeleccionado, nombre: nombre};
                                                                                if(elementosFormulasG.length != 0) {
                                                                                    for (var i = 0; i < elementosFormulasG.length; i++) {
                                                                                        this.createIndicatorFormulaElements(indicador, elementosFormulasG[i], i, elementosFormulasG.length-1);
                                                                                    };
                                                                                } else {
                                                                                    for (var i = 0; i < atributos.length; i++) {
                                                                                        contadorObjetosAGuardar++;
                                                                                        this.createIndicatorField(atributos[i], i);
                                                                                    };
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }); // fin transaction

                                                            } else {
                                                                alert("la fecha inicial debe ser una fecha valida");
                                                            }
                                                        } else {
                                                            alert("el riesgo padre del indicador debe ser un numero valido");
                                                        }
                                                    } else {
                                                        alert("Ingrese un valor para el responsable.");
                                                    }
                                                } else {
                                                    alert("el tipo de indicador debe tener una longitud mayor a 0 y menor a 21");
                                                }
                                            } else {
                                                alert("la periodicidad del indicador debe tener una longitud mayor a 0 y menor a 51");
                                            }
                                        } else {
                                            alert("el tipo de valor ideal del indicador debe tener una longitud mayor a 0 y menor a 21");
                                        }
                                    } else {
                                        alert("el valor ideal del indicador debe ser un numero valido");
                                    }
                                } else {
                                    alert("la tolerancia del indicador debe ser un numero valido");
                                }
                            } else {
                                alert("el peso del indicador debe ser un numero valido");
                            }
                        } else {
                            alert("la formula del indicador debe tener una longitud mayor a 0 y menor a 501");
                        }
                    } else {
                        alert("el codigo del indicador debe tener una longitud mayor a 0 y menor a 101");
                    }
                } else {
                    alert('El nombre del archivo no debe contener espacios en blanco');
                }
            } else {
                alert("el nombre del indicador debe tener una longitud mayor a 0 y menor a 501");
            }
        } else {
            alert("el identificador en fórmula del indicador debe tener una longitud mayor a 0 y menor a 101");
        }
    }

    createIndicatorFormulaElements (indicador, elementoFormula, indiceElemento, ultimaPosicionElemento) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into ElementoIndicador (indicadorID, conexionTablaID, esFuenteDeDato, excelArchivoID, excelVariableID, formaVariableID, elementoVariableID, elementoVariableCampoID, esValorManual, nombreColumnaEnTabla, tipoColumnaEnTabla, nombreVariable, descripcion, operacion) values ("+this.props.idIndicadorSeleccionado+", "+elementoFormula.conexionTablaID+", '"+elementoFormula.esFuenteDeDato+"', "+elementoFormula.excelArchivoID+", "+elementoFormula.excelVariableID+", "+elementoFormula.formaVariableID+", "+elementoFormula.elementoVariableID+", "+elementoFormula.elementoVariableCampoID+", '"+elementoFormula.esValorManual+"', '"+elementoFormula.nombreColumnaEnTabla+"', '"+elementoFormula.tipoColumnaEnTabla+"', '"+elementoFormula.nombreVariable+"', '"+elementoFormula.descripcion+"', '"+elementoFormula.operacion+"')", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(indiceElemento == ultimaPosicionElemento && atributos.length > 0) {
                            for (var i = 0; i < atributos.length; i++) {
                                contadorObjetosAGuardar++;
                                this.createIndicatorField(atributos[i], i);
                            };
                        } else if(indiceElemento == ultimaPosicionElemento && atributos.length == 0) {
                            this.limpiarArreglos();
                        }
                    });
                }
            });
        }); // fin transaction
    }

    createIndicatorField (indicadorCampo, posicionAtributo) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into IndicadoresCampos (indicadorID, nombre, tipo, nivel) values ("+this.props.idIndicadorSeleccionado+", '"+indicadorCampo.nombre+"', '"+indicadorCampo.tipo+"', "+indicadorCampo.nivel+")", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        contadorObjetosGuardados++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        //this.props.terminoCrearCampo(variable, variableCampo);
                        contadorObjetosGuardados++;
                        this.getIndicatorFieldID(indicadorCampo, posicionAtributo);
                    });
                }
            });
        }); // fin transaction
    }

    getIndicatorFieldID (indicadorCampo, posicionAtributo) {
        //validaciones existe por lo menos regla asignar
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from IndicadoresCampos where nombre = '"+indicadorCampo.nombre+"' and indicadorID = "+this.props.idIndicadorSeleccionado, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        /*var formulas, segmentoRegla;
                        if (banderaEsObjeto) {
                            formulas = formulasVariosAtributos;
                            segmentoRegla = segmentoReglasVariosAtributos;
                        } else {
                            formulas = formulasUnAtributo;
                            segmentoRegla = segmentoReglasUnAtributo;
                        }*/
                        var arregloDeFormulasALlamar = [], arregloElementosDeFormulasALlamar = [];
                        for (var j = 0; j < formulas[posicionAtributo].length; j++) {
                            if(arregloDeFormulasALlamar[posicionAtributo] == undefined)
                                arregloDeFormulasALlamar[posicionAtributo] = [];
                            arregloDeFormulasALlamar[posicionAtributo].push(j);
                            if(arregloElementosDeFormulasALlamar[posicionAtributo] == undefined)
                                arregloElementosDeFormulasALlamar[posicionAtributo] = [];
                            formulas[posicionAtributo][j].posicionFormulaEnCampo = j;
                            contadorObjetosAGuardar++;
                            this.createVariableFieldFormula(result.recordset[0], formulas[posicionAtributo][j], posicionAtributo, j, arregloDeFormulasALlamar, arregloElementosDeFormulasALlamar);
                        };
                        if(formulas[posicionAtributo].length == 0) {
                            var arregloDeSegmentosALlamar = [], arregloReglasDeSegmentosALlamar = [];
                            for (var j = 0; j < segmentoRegla[posicionAtributo].length; j++) {
                                if(arregloDeSegmentosALlamar[posicionAtributo] == undefined)
                                    arregloDeSegmentosALlamar[posicionAtributo] = [];
                                arregloDeSegmentosALlamar[posicionAtributo].push(j);
                                if(arregloReglasDeSegmentosALlamar[posicionAtributo] == undefined)
                                    arregloReglasDeSegmentosALlamar[posicionAtributo] = [];
                                segmentoRegla[posicionAtributo][j].posicionSegmentoEnCampo = j;
                                contadorObjetosAGuardar++;
                                this.createVariableFieldRuleSegments(result.recordset[0], segmentoRegla[posicionAtributo][j], posicionAtributo, j, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar);
                            };
                        }
                        if(formulas[posicionAtributo].length == 0 && segmentoRegla[posicionAtributo].length == 0) {
                            console.log('HOLA 1');
                            this.limpiarArreglos();
                        }
                    });
                }
            });
        }); // fin transaction
    }

    createVariableFieldRuleSegments (indicadorCampo, segmento, posicionAtributo, posicionSegmento, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar) {
        //los campos variableID y variableCampoID se ponen luego de la creacion e importacion
        //el campo variableIDCreacionCodigo es el variableID de segmento asignado al crear reglas
        console.log('segmento')
        console.log(segmento)
        console.log('indicadorCampo')
        console.log(indicadorCampo)
        console.log('posicionSegmento')
        console.log(posicionSegmento)
        console.log('this.props.idIndicadorSeleccionado')
        console.log(this.props.idIndicadorSeleccionado)
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into SegmentoReglasIndicadores (conexionTablaID, indicadorID, indicadorCampoID, variableIDCreacionCodigo, excelArchivoID, excelVariableID, formaVariableID, esValorManual, esConexionTabla, posicionSegmentoEnCampo, nivelMax) values ("+segmento.conexionTablaID+", "+this.props.idIndicadorSeleccionado+", "+indicadorCampo.ID+", "+segmento.variableID+", "+segmento.excelArchivoID+", "+segmento.excelVariableID+", "+segmento.formaVariableID+", '"+segmento.esValorManual+"', '"+segmento.esConexionTabla+"', "+posicionSegmento+", "+segmento.nivelMax+")", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        contadorObjetosGuardados++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        contadorObjetosGuardados++;
                        this.getVariableFieldRuleSegments(indicadorCampo, segmento, posicionAtributo, posicionSegmento, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar);
                    });
                }
            });
        }); // fin transaction
    }

    getVariableFieldRuleSegments (indicadorCampo, segmento, posicionAtributo, posicionSegmento, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from SegmentoReglasIndicadores where conexionTablaID = "+segmento.conexionTablaID+" and indicadorID = "+this.props.idIndicadorSeleccionado+" and indicadorCampoID = "+indicadorCampo.ID+" and variableIDCreacionCodigo = "+segmento.variableID+" and esConexionTabla = '"+segmento.esConexionTabla+"' and posicionSegmentoEnCampo = "+posicionSegmento+" and nivelMax = "+segmento.nivelMax, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if (result.recordset.length > 0) {
                            /*var reglas, formulas, segmento, segmentoRegla;
                            if (banderaEsObjeto) {
                                reglas = reglasVariosAtributos;
                                formulas = formulasVariosAtributos;
                                segmentoRegla = segmentoReglasVariosAtributos;
                            } else {
                                reglas = reglasUnAtributo;
                                formulas = formulasUnAtributo;
                                segmentoRegla = segmentoReglasUnAtributo;
                            }*/
                            for (var i = 0; i < arregloDeSegmentosALlamar[posicionAtributo].length; i++) {
                                if (arregloDeSegmentosALlamar[posicionAtributo][i] == posicionSegmento) {
                                    arregloDeSegmentosALlamar[posicionAtributo].splice(i, 1);
                                    if(arregloDeSegmentosALlamar[posicionAtributo] != undefined && arregloDeSegmentosALlamar[posicionAtributo].length == 0)
                                        arregloDeSegmentosALlamar.splice(posicionAtributo, 1);
                                    break;
                                }
                            };
                            for (var k = 0; k < reglas[posicionAtributo][posicionSegmento].length; k++) {
                                if(arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento] == undefined)
                                    arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento] = [];
                                arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento].push(k);
                            };
                            //lamar solo la primer regla o sea regla padre
                            reglas[posicionAtributo][posicionSegmento][0].segmentoReglaID = result.recordset[0].ID;
                            //crear reglas que sean de comparacion (esCondicion = verdadero)
                            if(reglas[posicionAtributo][posicionSegmento][0].esCondicion) {
                                contadorObjetosAGuardar++;
                                this.createVariableFieldRules(indicadorCampo, result.recordset[0], reglas[posicionAtributo][posicionSegmento][0], posicionAtributo, posicionSegmento, 0, arregloReglasDeSegmentosALlamar, -1);
                            } else if(!reglas[posicionAtributo][posicionSegmento][0].esCondicion) {
                                contadorObjetosAGuardar++;
                                //crear reglas que sean de asignacion (esCondicion = falso) con el id de formula correcto
                                for (var i = 0; i < formulas[posicionAtributo].length; i++) {
                                    if(i == reglas[posicionAtributo][posicionSegmento][0].formulaID) {
                                        reglas[posicionAtributo][posicionSegmento][0].formulaID = formulas[posicionAtributo][i].ID;
                                        break;
                                    }
                                };
                                this.createVariableFieldRules(indicadorCampo, result.recordset[0], reglas[posicionAtributo][posicionSegmento][0], posicionAtributo, posicionSegmento, 0, arregloReglasDeSegmentosALlamar, -1);
                            }
                            if( arregloDeSegmentosALlamar.length == 0 && arregloReglasDeSegmentosALlamar.length == 0) {
                                this.limpiarArreglos();
                            }
                        }
                    });
                }
            });
        }); // fin transaction
    }

    createVariableFieldRules (indicadorCampo, segmento, regla, posicionAtributo, posicionSegmento, posicionRegla, arregloReglasDeSegmentosALlamar, reglaPadreID) {
        if(regla != undefined) {
            const transaction = new sql.Transaction( this.props.pool );
            transaction.begin(err => {
                var rolledBack = false;
                transaction.on('rollback', aborted => {
                    rolledBack = true;
                });
                const request = new sql.Request(transaction);
                request.query("insert into ReglasIndicadores (segmentoReglaID, indicadorID, indicadorCampoID, formulaID, reglaPadreID, conexionTablaID, nombreColumnaEnTabla, tipoCampoObjetivo, esCondicion, esConexionTabla, posicionSegmentoEnCampo, operacion, operacionTexto, valor, texto, nivel) values ("+segmento.ID+", "+this.props.idIndicadorSeleccionado+", "+indicadorCampo.ID+", "+regla.formulaID+", "+reglaPadreID+", "+regla.conexionTablaID+", '"+regla.nombreColumnaEnTabla+"', '"+regla.tipoCampoObjetivo+"', '"+regla.esCondicion+"', '"+regla.esConexionTabla+"', "+posicionSegmento+", '"+regla.operacion+"', '"+regla.operacionTexto+"', '"+regla.valor+"', '"+regla.texto+"', "+regla.nivel+")", (err, result) => {
                    if (err) {
                        console.log(err);
                        contadorObjetosGuardados++;
                        this.limpiarArreglos();
                        if (!rolledBack) {
                            transaction.rollback(err => {
                            });
                        }
                    } else {
                        transaction.commit(err => {
                            contadorObjetosGuardados++;
                            /*var segmentoRegla;
                            if (banderaEsObjeto) {
                                segmentoRegla = segmentoReglasVariosAtributos;
                            } else {
                                segmentoRegla = segmentoReglasUnAtributo;
                            }*/
                            if(arregloReglasDeSegmentosALlamar[posicionAtributo] != undefined && arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento] != undefined) {
                                for (var i = 0; i < arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento].length; i++) {
                                    if (arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento][i] == posicionRegla) {
                                        arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento].splice(i, 1);
                                        if(arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento].length == 0) {
                                            arregloReglasDeSegmentosALlamar[posicionAtributo].splice(posicionSegmento, 1);
                                        }
                                        break;
                                    }
                                };
                            }
                            if( arregloReglasDeSegmentosALlamar.length == 0) {
                                this.limpiarArreglos();
                            } else {
                                this.traerRegla(indicadorCampo, segmento, regla, posicionAtributo, posicionSegmento, posicionRegla, arregloReglasDeSegmentosALlamar, reglaPadreID);
                            }
                        });
                    }
                });
            }); // fin transaction
        } else {
            this.limpiarArreglos();
        }
    }

    traerRegla(indicadorCampo, segmento, regla, posicionAtributo, posicionSegmento, posicionRegla, arregloReglasDeSegmentosALlamar, reglaPadreID) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ReglasIndicadores where segmentoReglaID = "+segmento.ID+" and indicadorID = "+this.props.idIndicadorSeleccionado+" and indicadorCampoID = "+indicadorCampo.ID+" and formulaID = "+regla.formulaID+" and reglaPadreID =  "+reglaPadreID+" and conexionTablaID = "+regla.conexionTablaID+" and nombreColumnaEnTabla = '"+regla.nombreColumnaEnTabla+"' and tipoCampoObjetivo = '"+regla.tipoCampoObjetivo+"' and esCondicion = '"+regla.esCondicion+"' and esConexionTabla = '"+regla.esConexionTabla+"' and posicionSegmentoEnCampo = "+posicionSegmento+" and operacion = '"+regla.operacion+"' and operacionTexto = '"+regla.operacionTexto+"' and valor = '"+regla.valor+"' and texto = '"+regla.texto+"' and nivel = "+regla.nivel, (err, result) => {
                if (err) {
                    console.log(err);
                    contadorObjetosGuardados++;
                    this.limpiarArreglos();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if( result.recordset.length > 0 ) {
                            /*var reglas, formulas;
                            if (banderaEsObjeto) {
                                reglas = reglasVariosAtributos;
                                formulas = formulasVariosAtributos;
                            } else {
                                reglas = reglasUnAtributo;
                                formulas = formulasUnAtributo;
                            }*/
                            if(reglas[posicionAtributo] != undefined && reglas[posicionAtributo][posicionSegmento] != undefined && reglas[posicionAtributo][posicionSegmento][posicionRegla+1] != undefined) {
                                if(reglas[posicionAtributo][posicionSegmento][posicionRegla+1].esCondicion) {
                                    contadorObjetosAGuardar++;
                                    this.createVariableFieldRules(indicadorCampo, segmento, reglas[posicionAtributo][posicionSegmento][posicionRegla+1], posicionAtributo, posicionSegmento, posicionRegla+1, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                                } else if(!reglas[posicionAtributo][posicionSegmento][posicionRegla+1].esCondicion) {
                                    contadorObjetosAGuardar++;
                                    //crear reglas que sean de asignacion (esCondicion = falso) con el id de formula correcto
                                    for (var i = 0; i < formulas[posicionAtributo].length; i++) {
                                        if(i == reglas[posicionAtributo][posicionSegmento][posicionRegla+1].formulaID) {
                                            reglas[posicionAtributo][posicionSegmento][posicionRegla+1].formulaID = formulas[posicionAtributo][i].ID;
                                            break;
                                        }
                                    };
                                    this.createVariableFieldRules(indicadorCampo, segmento, reglas[posicionAtributo][posicionSegmento][posicionRegla+1], posicionAtributo, posicionSegmento, posicionRegla+1, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                                }
                            } /*else if(reglas[posicionAtributo] != undefined && reglas[posicionAtributo][posicionSegmento+1] != undefined) {
                                if(reglas[posicionAtributo][posicionSegmento+1][posicionRegla].esCondicion) {
                                    contadorObjetosAGuardar++;
                                    this.createVariableFieldRules(indicadorCampo, segmento, reglas[posicionAtributo][posicionSegmento+1][posicionRegla], posicionAtributo, posicionSegmento+1, 0, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                                } else if(!reglas[posicionAtributo][posicionSegmento+1][posicionRegla].esCondicion) {
                                    contadorObjetosAGuardar++;
                                    //crear reglas que sean de asignacion (esCondicion = falso) con el id de formula correcto
                                    for (var i = 0; i < formulas[posicionAtributo].length; i++) {
                                        if(i == reglas[posicionAtributo][posicionSegmento+1][posicionRegla].formulaID) {
                                            reglas[posicionAtributo][posicionSegmento+1][posicionRegla].formulaID = formulas[posicionAtributo][i].ID;
                                            break;
                                        }
                                    };
                                    this.createVariableFieldRules(indicadorCampo, segmento, reglas[posicionAtributo][posicionSegmento+1][posicionRegla], posicionAtributo, posicionSegmento+1, 0, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                                }
                            } else if(reglas[posicionAtributo+1] != undefined) {
                                if(reglas[posicionAtributo+1][0][0].esCondicion) {
                                    contadorObjetosAGuardar++;
                                    this.createVariableFieldRules(indicadorCampo, segmento, reglas[posicionAtributo+1][0][0], posicionAtributo+1, 0, 0, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                                } else if(!reglas[posicionAtributo+1].esCondicion) {
                                    contadorObjetosAGuardar++;
                                    //crear reglas que sean de asignacion (esCondicion = falso) con el id de formula correcto
                                    for (var i = 0; i < formulas[posicionAtributo+1].length; i++) {
                                        if(i == reglas[posicionAtributo+1][0][0].formulaID) {
                                            reglas[posicionAtributo+1][0][0].formulaID = formulas[posicionAtributo+1][i].ID;
                                            break;
                                        }
                                    };
                                    this.createVariableFieldRules(indicadorCampo, segmento, reglas[posicionAtributo+1][0][0], posicionAtributo+1, 0, 0, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                                }
                            }*/ else {
                                this.limpiarArreglos();
                            }
                        }
                    });
                }
            });
        }); // fin transaction
    }

    createVariableFieldFormula (indicadorCampo, formula, posicionAtributo, posicionFormula, arregloDeFormulasALlamar, arregloElementosDeFormulasALlamar) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into FormulasIndicadoresCampos (indicadorID, indicadorCampoID, posicionFormulaEnCampo, formula, operacion) values ("+this.props.idIndicadorSeleccionado+", "+indicadorCampo.ID+", "+posicionFormula+", '"+formula.formula+"', '"+formula.operacion+"')", (err, result) => {
                if (err) {
                    console.log(err);
                    contadorObjetosGuardados++;
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        contadorObjetosGuardados++;
                        this.getVariableFieldFormulaID(indicadorCampo, formula, posicionAtributo, posicionFormula, arregloDeFormulasALlamar, arregloElementosDeFormulasALlamar);
                    });
                }
            });
        }); // fin transaction
    }

    getVariableFieldFormulaID (indicadorCampo, formula, posicionAtributo, posicionFormula, arregloDeFormulasALlamar, arregloElementosDeFormulasALlamar) {
        console.log('segmentoRegla')
        console.log(segmentoRegla)
        console.log('posicionAtributo')
        console.log(posicionAtributo)
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from FormulasIndicadoresCampos where indicadorID = "+this.props.idIndicadorSeleccionado+" and indicadorCampoID = "+indicadorCampo.ID+" and posicionFormulaEnCampo = "+posicionFormula, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            var existenSegmentos = false;
                            for (var i = 0; i < segmentoRegla.length; i++) {
                                if (segmentoRegla[i].length > 0) {
                                    existenSegmentos = true;
                                }
                            };
                            for (var i = 0; i < elementosFormulas[posicionAtributo][posicionFormula].length; i++) {
                                if(arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula] == undefined)
                                    arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula] = [];
                                arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula].push(i);
                                contadorObjetosAGuardar++;
                                this.createVariableFieldFormulaElement(indicadorCampo, result.recordset[0], elementosFormulas[posicionAtributo][posicionFormula][i], posicionAtributo, posicionFormula, i, arregloElementosDeFormulasALlamar, existenSegmentos);
                            };
                            formulas[posicionAtributo][posicionFormula].ID = result.recordset[0].ID;
                            /*if (banderaEsObjeto) {
                                formulasVariosAtributos = formulas;
                            } else {
                                formulasUnAtributo = formulas;
                            }*/
                            for (var i = 0; i < arregloDeFormulasALlamar[posicionAtributo].length; i++) {
                                if (arregloDeFormulasALlamar[posicionAtributo][i] == posicionFormula) {
                                    arregloDeFormulasALlamar[posicionAtributo].splice(i, 1);
                                    if(arregloDeFormulasALlamar[posicionAtributo].length == 0)
                                        arregloDeFormulasALlamar.splice(posicionAtributo, 1);
                                    break;
                                }
                            };
                            //validar que solo sea llamado una vez por cada atributo
                            //llamado al final para que hasta que haya traido todos los ids de formula llamar crear segmento
                            if(posicionFormula == 0) {
                                var arregloDeSegmentosALlamar = [], arregloReglasDeSegmentosALlamar = [];
                                for (var j = 0; j < segmentoRegla[posicionAtributo].length; j++) {
                                    if(arregloDeSegmentosALlamar[posicionAtributo] == undefined)
                                        arregloDeSegmentosALlamar[posicionAtributo] = [];
                                    arregloDeSegmentosALlamar[posicionAtributo].push(j);
                                    if(arregloReglasDeSegmentosALlamar[posicionAtributo] == undefined)
                                        arregloReglasDeSegmentosALlamar[posicionAtributo] = [];
                                    contadorObjetosAGuardar++;
                                    segmentoRegla[posicionAtributo][j].posicionSegmentoEnCampo = j;
                                    this.createVariableFieldRuleSegments(indicadorCampo, segmentoRegla[posicionAtributo][j], posicionAtributo, j, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar);
                                };
                                /*for (var i = 0; i < segmentoRegla.length; i++) {
                                    for (var j = 0; j < segmentoRegla[i].length; j++) {
                                        if(arregloDeSegmentosALlamar[i] == undefined)
                                            arregloDeSegmentosALlamar[i] = [];
                                        arregloDeSegmentosALlamar[i].push(j);
                                        if(arregloReglasDeSegmentosALlamar[i] == undefined)
                                            arregloReglasDeSegmentosALlamar[i] = [];
                                        contadorObjetosAGuardar++;
                                        segmentoRegla[i][j].posicionSegmentoEnCampo = j;
                                        this.createVariableFieldRuleSegments(indicadorCampo, segmentoRegla[i][j], i, j, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar);
                                    };
                                };*/
                            }
                            if( arregloDeFormulasALlamar.length == 0 && !existenSegmentos ) {
                                this.limpiarArreglos();
                            }
                        }
                    });
                }
            });
        }); // fin transaction
    }

    createVariableFieldFormulaElement (indicadorCampo, formula, elemento, posicionAtributo, posicionFormula, posicionElemento, arregloElementosDeFormulasALlamar, existenSegmentos) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into ElementoFormulasIndicadoresCampos (indicadorID, indicadorCampoID, formulaID, conexionTablaID, esFuenteDeDato, excelArchivoID, excelVariableID, formaVariableID, elementoVariableID, elementoVariableCampoID, esValorManual, nombreColumnaEnTabla, tipoColumnaEnTabla, nombreVariable, descripcion, operacion) values ("+this.props.idIndicadorSeleccionado+", "+indicadorCampo.ID+", "+formula.ID+", "+elemento.conexionTablaID+", '"+elemento.esFuenteDeDato+"', "+elemento.excelArchivoID+", "+elemento.excelVariableID+", "+elemento.formaVariableID+", "+elemento.elementoVariableID+", "+elemento.elementoVariableCampoID+", '"+elemento.esValorManual+"', '"+elemento.nombreColumnaEnTabla+"', '"+elemento.tipoColumnaEnTabla+"', '"+elemento.nombreVariable+"', '"+elemento.descripcion+"', '"+elemento.operacion+"')", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        contadorObjetosGuardados++;
                        this.limpiarArreglos();
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        contadorObjetosGuardados++;
                        if(arregloElementosDeFormulasALlamar[posicionAtributo] != undefined && arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula] != undefined) {
                            for (var i = 0; i < arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula].length; i++) {
                                if (arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula][i] == posicionElemento) {
                                    arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula].splice(i, 1);
                                    if(arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula].length == 0)
                                        arregloElementosDeFormulasALlamar[posicionAtributo].splice(posicionFormula, 1);
                                    break;
                                }
                            };
                        }
                        if( arregloElementosDeFormulasALlamar.length == 0 && !existenSegmentos ) {
                            this.limpiarArreglos();
                        }
                    });
                }
            });
        }); // fin transaction
    }

    limpiarArreglos() {
        if(contadorObjetosGuardados == contadorObjetosAGuardar) {
            /*formulaG = '';
            elementosFormulasG = [];
            atributos = [];
            nombreCampoNuevoAtributo = '';
            reglas = [];
            segmentoRegla = [];
            elementosFormulas = [];
            formulas = [];
            posicionAtributoSeleccionado = -1;
            nivelNuevoAtributo = 0;
            tipoDeAsignacionSeleccionado = '';
            operacionSeleccionada = '';
            campoSeleccionado = {};
            indiceSeleccionadoSegmentoReglas = -1;
            indiceSeleccionadoReglas = -1;
            tipoElementoSeleccionadoRegla = '';

            this.setState({
                atributos: [],
                reglas: [],
                tipoNuevaVariable: ""
            });*/
        }
    }

    goToCreateFormula () {
        var navbar = <div className={"row"}>
            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                <div className={"page-header"}>
                    <h2 className={"pageheader-title"}>Crear Fórmula</h2>
                    <div className={"page-breadcrumb"}>
                        <nav aria-label="breadcrumb">
                            <ol className={"breadcrumb"}>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionIndicador}><a href="#" className={"breadcrumb-link"}>Seleccionar Indicador</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.retornoEditarIndicador}><a href="#" className={"breadcrumb-link"}>Modificar Indicador</a></li>
                                <li className={"breadcrumb-item active font-16"} aria-current="page">Crear Fórmula</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>;

        var esOperacionSQL = false, operacionSQL = "", esEditarVar = false;
        if (formulaG.length > 0) {
            esEditarVar = true;
            if(formulaG.indexOf("ASIG") == 0 ||
                formulaG.indexOf("COUNT") == 0 ||
                formulaG.indexOf("PROM") == 0 ||
                formulaG.indexOf("MAX") == 0 ||
                formulaG.indexOf("MIN") == 0 ||
                formulaG.indexOf("SUM") == 0 || 
                formulaG.indexOf("AUTOSUM") == 0 ) {

                esOperacionSQL = true;
                if(formulaG.indexOf("ASIG") == 0) {
                    operacionSQL = "ASIG";
                } else if(formulaG.indexOf("COUNT") == 0) {
                    operacionSQL = "COUNT";
                } else if(formulaG.indexOf("PROM") == 0) {
                    operacionSQL = "PROM";
                } else if(formulaG.indexOf("MAX") == 0) {
                    operacionSQL = "MAX";
                } else if(formulaG.indexOf("MIN") == 0) {
                    operacionSQL = "MIN";
                } else if(formulaG.indexOf("SUM") == 0) {
                    operacionSQL = "SUM";
                } else if(formulaG.indexOf("AUTOSUM") == 0) {
                    operacionSQL = "AUTOSUM";
                }
            } else {
                esOperacionSQL = false;
                operacionSQL = "";
            }
        }

        banderaEsFormulaIndicador = true;
        this.setState({
            componenteActual: "crearFormula",
            navbar: navbar,
            formulaSeleccionadaEdit: {formula: formulaG, operacion: "FORMULA"},
            esEditarVar: esEditarVar,
            esOperacionSQL: esOperacionSQL,
            operacionSQL: operacionSQL
        });
    }

    retornoEditarIndicador () {
        this.setState({
            componenteActual: "editarIndicador"
        }, this.cargarDatePicker );
    }

    retornoCampoFormula (tipoVariable) {
        tipoDeAsignacionSeleccionado = tipoVariable;
    }

    retornoCampoCondicion (campo) {
        campoSeleccionado = campo;
    }

    retornarValor (campoNuevo, campoNuevoTexto) {
        valorSeleccionado = campoNuevo;
        valorSeleccionadoTexto = campoNuevoTexto;
    }

    retornoOperacion (operacion) {
        operacionSeleccionada = operacion;
    }

    actualizarIndiceSeleccionadoReglas(indiceSegmento, indiceRegla, tipoElemento) {
        indiceSeleccionadoSegmentoReglas = indiceSegmento;
        indiceSeleccionadoReglas = indiceRegla;
        tipoElementoSeleccionadoRegla = tipoElemento;
    }

    actualizarNivelNuevaRegla (nivel) {
        if(nivelNuevoAtributo < nivel)
            nivelNuevoAtributo = nivel;
    }

    actualizarSeleccionFormula (formula, indice) {
        if(formula != null) {
            var condicionFormula = " ID = "+formula.ID, condicionElemento = " formulaID = "+formula.ID;
            this.setState({
                formulaSeleccionadaEdit: formula,
                condicionFormula: condicionFormula,
                condicionElemento: condicionElemento
            });
            indiceFormulaSeleccionadaEdit =  indice;
        } else {
            //
        }
    }

    goToCreateConditions (indice) {
        var navbar = <div className={"row"}>
            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                <div className={"page-header"}>
                    <h2 className={"pageheader-title"}>Condiciones</h2>
                    <div className={"page-breadcrumb"}>
                        <nav aria-label="breadcrumb">
                            <ol className={"breadcrumb"}>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionIndicador}><a href="#" className={"breadcrumb-link"}>Seleccionar Indicador</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.retornoEditarIndicador}><a href="#" className={"breadcrumb-link"}>Modificar Indicador</a></li>
                                <li className={"breadcrumb-item active font-16"} aria-current="page">Condiciones</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>;
        posicionAtributoSeleccionado = indice;
        //tipoElementoSeleccionado = tipoIndice;
        var posicionSel = posicionAtributoSeleccionado;
        //indice = -1 cuando se va a condiciones de un campo nuevo
        //cuando se presiona NavBar indice es igual indice anterior
        //cuando se selecciona un campo existente indice = posicion campo
        if(posicionAtributoSeleccionado == -1) {
            posicionSel = this.state.atributos.length;
        }
        if(formulas[posicionSel] == undefined)
            formulas[posicionSel] = [];
        if(reglas[posicionSel] == undefined)
            reglas[posicionSel] = [];
        this.setState({
            componenteActual: "variableCondiciones",
            navbar: navbar,
            formulas: formulas[posicionSel],
            reglas: reglas[posicionSel]
        });
    }

    goToCreateConditionsClickNavBarFormula () {
        this.goToCreateConditions(posicionAtributoSeleccionado);
    }

    goToCreateFormulaCampo (indice, esEditarVarN) {
        var navbar = <div className={"row"}>
            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                <div className={"page-header"}>
                    <h2 className={"pageheader-title"}>Condiciones</h2>
                    <div className={"page-breadcrumb"}>
                        <nav aria-label="breadcrumb">
                            <ol className={"breadcrumb"}>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionIndicador}><a href="#" className={"breadcrumb-link"}>Seleccionar Indicador</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.retornoEditarIndicador}><a href="#" className={"breadcrumb-link"}>Modificar Indicador</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.goToCreateConditionsClickNavBarFormula}><a href="#" className={"breadcrumb-link"}>Condiciones</a></li>
                                <li className={"breadcrumb-item active font-16"} aria-current="page">Crear F&oacute;rmula</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>;

        banderaEsFormulaIndicador = false;

        var esOperacionSQL, operacionSQL;
        if(posicionAtributoSeleccionado == -1) {
            esOperacionSQL = false;
            operacionSQL = "";
        }
        if (this.state.formulaSeleccionadaEdit != null) {
            if(this.state.formulaSeleccionadaEdit.operacion.localeCompare("ASIG") == 0 ||
                this.state.formulaSeleccionadaEdit.operacion.localeCompare("COUNT") == 0 ||
                this.state.formulaSeleccionadaEdit.operacion.localeCompare("PROM") == 0 ||
                this.state.formulaSeleccionadaEdit.operacion.localeCompare("MAX") == 0 ||
                this.state.formulaSeleccionadaEdit.operacion.localeCompare("MIN") == 0 ||
                this.state.formulaSeleccionadaEdit.operacion.localeCompare("SUM") == 0 || 
                this.state.formulaSeleccionadaEdit.operacion.localeCompare("AUTOSUM") == 0 ) {

                esOperacionSQL = true;
                operacionSQL = this.state.formulaSeleccionadaEdit.operacion;
            } else {
                esOperacionSQL = false;
                operacionSQL = "";
            }
        }

        //deseleccionado regla seleccionada
        indiceSeleccionadoReglas = -1;
        indiceSeleccionadoFormula = indice;
        this.setState({
            componenteActual: "crearFormula",
            navbar: navbar,
            esEditarVar: esEditarVarN,
            esOperacionSQL: esOperacionSQL,
            operacionSQL: operacionSQL
        });
    }

    goCrearUmbral () {
        var navbar = <div className={"row"}>
            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                <div className={"page-header"}>
                    <h2 className={"pageheader-title"}>Configuraci&oacute;n</h2>
                    <div className={"page-breadcrumb"}>
                        <nav aria-label="breadcrumb">
                            <ol className={"breadcrumb"}>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionIndicador}><a href="#" className={"breadcrumb-link"}>Seleccionar Indicador</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.retornoEditarIndicador}><a href="#" className={"breadcrumb-link"}>Editar Indicador</a></li>
                                <li className={"breadcrumb-item active font-16"} aria-current="page">Umbrales</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>;
        this.setState({
            navbar: navbar,
            componenteActual: "EditarUmbral"
        });
    }

    actualizarNombreCampoNuevoAtributo () {
        var nombreCampo = $("#nombreAtributoNuevoCampo").val();
        nombreCampoNuevoAtributo = nombreCampo;
    }

    retornarCodigoOperacion (codigo) {
        if(codigo.localeCompare("ASIG") == 0) {
            return "ASIGNAR";
        }
        if(codigo.localeCompare("COUNT") == 0) {
            return "CONTAR";
        }
        if(codigo.localeCompare("PROM") == 0) {
            return "PROMEDIAR";
        }
        if(codigo.localeCompare("MAX") == 0) {
            return "MÁXIMO";
        }
        if(codigo.localeCompare("MIN") == 0) {
            return "MÍNIMO";
        }
        if(codigo.localeCompare("SUM") == 0) {
            return "SUMAR";
        }
        if(codigo.localeCompare("FORMULA") == 0) {
            return "FORMULA";
        }
    }

    verificarNoExisteNombreCampo (nombre) {
        var noExiste = true;
        //if (banderaEsInstruccionSQL) {
            for (var i = 0; i < atributos.length; i++) {
                if (atributos[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
                    noExiste = false;
                    break;
                }
            };
        //}
        return noExiste;
    }

    crearAtributoVariable () {              //agrega valor a arreglo, pero no guarda en base de datos
        var nombreAtributo = $("#nombreAtributoNuevoCampo").val();
        if(nombreAtributo.length > 0) {
            if(this.verificarNoExisteNombreCampo(nombreAtributo)) {
                if(tipoDeAsignacionSeleccionado != undefined && tipoDeAsignacionSeleccionado.length > 0) {
                    //seleccionar arreglo a insertar, si de varios atributos o unico
                    var arreglo, nivel;
                    arreglo = atributos;
                    nivel = nivelNuevoAtributo;
                    var nuevoAtributo = {nombre: nombreAtributo, tipo: tipoDeAsignacionSeleccionado, nivel: nivel};
                    arreglo.push(nuevoAtributo);
                    this.setState({
                        atributos: arreglo,
                        tipoNuevaVariable: ""
                    });
                    nivelNuevoAtributo = 0;
                    nombreCampoNuevoAtributo = '';
                    $("#nombreAtributoNuevoCampo").val("");
                    alert("Campo creado.");
                } else {
                    alert("Seleccione un tipo de asignación.");
                }
            } else {
                alert("El nombre del campo debe ser unico.");
            }
        } else {
            alert("Ingrese un valor para el nombre del atributo.");
        }
    }

    anadirRegla (esFormula, formulaSeleccionada, posicionFormulaSeleccionada) {
        //si se agrega una formula/asignacion, todas las otras formulas tienen que ser del mismo tipo para esa variable
        //si el indiceSeleccionado es igual a -1, se llamo desde nuevo atributo
        //sino, modificar elemento seleccionado
        //primer if: ver el estado de donde fue llamado el metodo
        //campoSeleccionado, operacionSeleccionada, objetoConexionSeleccionada

        //indiceSeleccionadoReglas
        //tipoElementoSeleccionadoRegla
        /*var reglas, segmentoRegla;
        if (banderaEsObjeto) {
            reglas = reglasVariosAtributos;
            segmentoRegla = segmentoReglasVariosAtributos;
        } else {
            reglas = reglasUnAtributo;
            segmentoRegla = segmentoReglasUnAtributo;
        }*/
        var posicionAtributo = posicionAtributoSeleccionado;
        //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
        //cuando se presiona NavBar indice es igual indice anterior
        //cuando se selecciona un campo existente indice = posicion campo
        if(posicionAtributo == -1) {
            posicionAtributo = this.state.atributos.length;
        }
        //viendo si regla condicion ya tiene regla sino
        //comparando si la regla seleccionada es otra regla, y si la nueva regla a insertar no es formula
        var banderaSinoReglaValido = true;
        if(tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && !esFormula && $("#sinoRADIO").is(':checked')) {
            var nivelABuscar = reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas][indiceSeleccionadoReglas].nivel;
            if(indiceSeleccionadoReglas+1 < reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas].length) {
                for (var i = indiceSeleccionadoReglas+1; i < reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas].length; i++) {
                    if (nivelABuscar == reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas][i].nivel && reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas][i].operacion.localeCompare("ELSE") == 0) {
                        banderaSinoReglaValido = false;
                    }
                };
            }
        }
        var reglaEsValida = true;
        if(!esFormula) {
            if(campoSeleccionado == undefined || campoSeleccionado.valor == undefined) {
                reglaEsValida = false;
            }
            if(valorSeleccionado.length == 0) {
                reglaEsValida = false;
            }
            if(operacionSeleccionada.operacion == undefined) {
                reglaEsValida = false;
            }
            if(campoSeleccionado.tipo != undefined) {
                if(campoSeleccionado.tipo.localeCompare("int") == 0 || campoSeleccionado.tipo.localeCompare("decimal") == 0) {
                    if(valorSeleccionado.indexOf("NUMERO") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                        reglaEsValida = false;
                    }
                } else if(campoSeleccionado.tipo.localeCompare("bool") == 0) {
                    if(valorSeleccionado.indexOf("BOOL") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                        reglaEsValida = false;
                    }
                } else if(campoSeleccionado.tipo.localeCompare("date") == 0) {
                    if( valorSeleccionado.indexOf("FECHA") == -1 && valorSeleccionado.indexOf("TIEMPO") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                        reglaEsValida = false;
                    }
                } else if(campoSeleccionado.tipo.localeCompare("varchar") == 0) {
                    if(valorSeleccionado.indexOf("VARCHAR") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                        reglaEsValida = false;
                    }
                }
            }
        } else {
            if(formulaSeleccionada.formula == undefined) {
                reglaEsValida = false;
            }
        }
        //si es formula, viendo que no haya regla debajo, formulas solo se pueden agregar al final
        if(banderaSinoReglaValido && reglaEsValida) {
            if(indiceSeleccionadoReglas != -1 || ( indiceSeleccionadoReglas == -1 && (reglas.length == 0 || (reglas[posicionAtributo] != undefined && reglas[posicionAtributo].length == 0) )) ) {
                var entrarACrearRegla = false;
                if(indiceSeleccionadoReglas != -1 && tipoElementoSeleccionadoRegla.length > 0 && tipoElementoSeleccionadoRegla.localeCompare("abajo") != 0 && segmentoRegla[posicionAtributo] != undefined) {
                    //validando nueva regla tenga la misma variable o conexion tabla del mismo segmento
                    if(!esFormula) {
                        if(campoSeleccionado.tablaID != undefined) {
                            if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].conexionTablaID == campoSeleccionado.tablaID) {
                                entrarACrearRegla = true;
                            }
                        } else if(campoSeleccionado.variableID != undefined) {
                            if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].variableID == campoSeleccionado.variableID) {
                                entrarACrearRegla = true;
                            }
                            //viendo si variable seleccionada es objeto
                            var variableSel = this.state.variables.filter(function (object) {
                                return object.ID == campoSeleccionado.variableID;
                            });
                            if(variableSel.length > 0) {
                                if(!variableSel[0].esObjeto)
                                    entrarACrearRegla = true;
                            }
                        } else if(campoSeleccionado.excelArchivoID != undefined) {
                            entrarACrearRegla = true;
                        } else if(campoSeleccionado.formaVariableID != undefined) {
                            entrarACrearRegla = true;
                        }
                    } else {
                        if(formulaSeleccionada.tablaID != undefined && !formulaSeleccionada.esValorManual) {
                            if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].conexionTablaID == formulaSeleccionada.tablaID) {
                                entrarACrearRegla = true;
                            }
                        } else if(formulaSeleccionada.variableID != undefined && !formulaSeleccionada.esValorManual) {
                            if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].variableID == formulaSeleccionada.variableID) {
                                entrarACrearRegla = true;
                            }
                            //viendo si variable seleccionada es objeto
                            var variableSel = this.state.variables.filter(function (object) {
                                return object.ID == formulaSeleccionada.variableID;
                            });
                            if(variableSel.length > 0) {
                                if(!variableSel[0].esObjeto)
                                    entrarACrearRegla = true;
                            }
                        } else if(formulaSeleccionada.excelArchivoID != undefined && !formulaSeleccionada.esValorManual) {
                            entrarACrearRegla = true;
                        } else if(formulaSeleccionada.formaVariableID != undefined && !formulaSeleccionada.esValorManual) {
                            entrarACrearRegla = true;
                        } else if(formulaSeleccionada.esValorManual) {
                            entrarACrearRegla = true;
                        }
                    }
                } else if( ( indiceSeleccionadoReglas == -1 && (reglas.length == 0 || (reglas[posicionAtributo] != undefined && reglas[posicionAtributo].length == 0) )) || tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0 ||  segmentoRegla[posicionAtributo] == undefined) {
                    entrarACrearRegla = true;
                }
                if(entrarACrearRegla) {
                    if(!esFormula) {
                        var posicionSel = posicionAtributoSeleccionado;
                        //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
                        //cuando se presiona NavBar indice es igual indice anterior
                        //cuando se selecciona un campo existente indice = posicion campo
                        if(posicionAtributoSeleccionado == -1) {
                            posicionSel = this.state.atributos.length;
                        }
                        if(reglas[posicionSel] == undefined) {
                            [];
                        }
                        if(segmentoRegla.length == undefined)
                            segmentoRegla = [];
                        if(segmentoRegla[posicionSel] == undefined)
                            segmentoRegla[posicionSel] = [];
                        var conexionTablaID = -1, variableID = -1, esConexionTabla = false, nivelMax = 1, nombreColumnaEnTabla = '';
                        var excelArchivoID = -1, excelVariableID = -1, formaVariableID = -1;
                        var esValorManual = false;
                        if(campoSeleccionado.tablaID != undefined && campoSeleccionado.tablaID != -1) {
                            conexionTablaID = campoSeleccionado.tablaID;
                            esConexionTabla = true;
                            nombreColumnaEnTabla = campoSeleccionado.valor;
                        } else if(campoSeleccionado.variableID != undefined && campoSeleccionado.variableID != -1) {
                            variableID = campoSeleccionado.variableID;
                        } else if(campoSeleccionado.excelArchivoID != undefined && campoSeleccionado.excelArchivoID != -1) {
                            excelArchivoID = campoSeleccionado.excelArchivoID;
                            excelVariableID = campoSeleccionado.excelVariableID;
                        } else if(campoSeleccionado.formaVariableID != undefined && campoSeleccionado.formaVariableID != -1) {
                            formaVariableID = campoSeleccionado.formaVariableID;
                        } else if(campoSeleccionado.esValorManual != undefined) {
                            esValorManual = campoSeleccionado.esValorManual;
                        }
                        var posicionInsertarReglaAtributo = 0, posicionInsertarReglaSegmento = 0;
                        if(tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0 || (indiceSeleccionadoReglas == -1 && tipoElementoSeleccionadoRegla.length == 0) || segmentoRegla[posicionSel].length == 0) {
                            var segmentoReglaIndex = 0;
                            if(segmentoRegla[posicionSel].length > 0) {
                                segmentoReglaIndex = segmentoRegla[posicionSel].length;
                            }
                            segmentoRegla[posicionSel].push({
                                conexionTablaID: conexionTablaID,
                                variableID: variableID,
                                esConexionTabla: esConexionTabla,
                                nivelMax: nivelMax,
                                segmentoReglaIndex: segmentoReglaIndex,
                                excelArchivoID: excelArchivoID,
                                excelVariableID: excelVariableID,
                                formaVariableID: formaVariableID,
                                esValorManual: esValorManual
                            });
                            posicionInsertarReglaAtributo = posicionSel;
                            posicionInsertarReglaSegmento = segmentoRegla[posicionSel].length-1;
                        } else {
                            segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].nivelMax++;
                            if(segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].excelArchivoID == -1 && excelArchivoID != -1) {
                                segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].excelArchivoID = excelArchivoID;
                                segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].excelVariableID = excelVariableID;
                            }
                            if(segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].formaVariableID == -1 && formaVariableID != -1) {
                                segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].formaVariableID = formaVariableID;
                            }
                            if(segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].variableID == -1 && variableID != -1) {
                                segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].variableID = variableID;
                            }
                            posicionInsertarReglaAtributo = posicionSel;
                            posicionInsertarReglaSegmento = indiceSeleccionadoSegmentoReglas;
                        }
                        if(reglas[posicionInsertarReglaAtributo] == undefined) {
                            reglas[posicionInsertarReglaAtributo] = [];
                        }
                        if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] == undefined) {
                            reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] = [];
                        }
                        var esCondicion = !esFormula;
                        var segmentoReglaIndex = 0;
                        if(indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") != 0) {
                            //cuando se esta añadiendo una regla a un segmento existente
                            segmentoReglaIndex = indiceSeleccionadoSegmentoReglas;
                        } else if(indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                            //cuando se esta añadiendo una regla a un nuevo segmento
                            segmentoReglaIndex = indiceSeleccionadoSegmentoReglas+1;
                        }
                        var nuevoNivel = nivelNuevoAtributo;
                        var nuevaRegla = {
                                            segmentoReglaID: segmentoReglaIndex,
                                            conexionTablaID: conexionTablaID,
                                            nombreColumnaEnTabla: nombreColumnaEnTabla,
                                            formulaID: -1,
                                            variableID: -1,
                                            variableCampoID: -1,
                                            reglaPadreID: -1,
                                            tipoCampoObjetivo: campoSeleccionado.tipo,
                                            esCondicion: esCondicion,
                                            esConexionTabla: esConexionTabla,
                                            operacion: operacionSeleccionada.operacion,
                                            operacionTexto: operacionSeleccionada.operacionTexto,
                                            valor: valorSeleccionado,
                                            texto: campoSeleccionado.valor+" "+operacionSeleccionada.operacionTexto+" "+valorSeleccionadoTexto,
                                            nivel: nuevoNivel,
                                            posicionSegmentoEnCampo: segmentoReglaIndex
                                        };
                        if(reglas.length == 0 || reglas[posicionInsertarReglaAtributo].length == 0 || reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length == 0) {
                            //cuando no existe regla creada para el campo
                            reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
                        } else {
                            //el campo ya tiene una regla o mas creada

                            if(tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#siRADIO").is(':checked') ) {
                                //se seleciona el indice de la posicion de la regla dentro del arreglo, para que despues se pueda sacar el ID a base de la posicion
                                //se pone de regla padre a la regla seleccionada
                                nuevaRegla.reglaPadreID = indiceSeleccionadoReglas;
                                nuevaRegla.nivel = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].nivel+1;
                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas+1, 0, nuevaRegla);
                                if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas+2] != undefined) {
                                    for (var i = indiceSeleccionadoReglas+2; i < reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length; i++) {
                                        if(nuevaRegla.nivel <= reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel) {
                                            reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].reglaPadreID = i-1;
                                            reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel++;
                                        }
                                    };
                                }
                            } else if(tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#sinoRADIO").is(':checked') ) {
                                var posicionAInsertar = -1;
                                nuevaRegla.reglaPadreID = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].reglaPadreID;
                                nuevaRegla.nivel = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].nivel;
                                if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas+1] != undefined) {
                                    for (var i = indiceSeleccionadoReglas+1; i < reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length; i++) {
                                        if(nuevaRegla.nivel > reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel){
                                            posicionAInsertar = i;
                                        }
                                    };
                                }
                                if(posicionAInsertar != -1) {
                                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(posicionAInsertar, 0, nuevaRegla);
                                } else {
                                    //insertar al final del segmento
                                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
                                }
                            } else if(tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                                nuevaRegla.reglaPadreID = -1;
                                nuevaRegla.nivel = -1;
                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
                            } else if(tipoElementoSeleccionadoRegla.localeCompare("arriba") == 0) {
                                nuevaRegla.reglaPadreID = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].reglaPadreID;
                                nuevaRegla.nivel = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].nivel;
                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas, 0, nuevaRegla);
                                if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas+1] != undefined) {
                                    for (var i = indiceSeleccionadoReglas+1; i < reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length; i++) {
                                        if(nuevaRegla.nivel <= reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel) {
                                            reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].reglaPadreID = i-1;
                                            reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel++;
                                        }
                                    };
                                }
                            }
                            //la condicion es anidada, o sea dentro de la condicion padre
                        }
                        //deseleccionado regla seleccionada
                        indiceSeleccionadoReglas = -1;
                        /*if (banderaEsObjeto) {
                            reglasVariosAtributos = reglas;
                            segmentoReglasVariosAtributos = segmentoRegla;
                        } else {
                            reglasUnAtributo = reglas;
                            segmentoReglasUnAtributo = segmentoRegla;
                        }*/
                        this.setState({
                            reglas: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]
                        });
                        campoSeleccionado = null;
                        valorSeleccionado = '';
                    } else {
                        //es regla formula
                        var posicionSel = posicionAtributoSeleccionado;
                        //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
                        //cuando se presiona NavBar indice es igual indice anterior
                        //cuando se selecciona un campo existente indice = posicion campo
                        if(posicionAtributoSeleccionado == -1) {
                            posicionSel = this.state.atributos.length;
                        }
                        //verificando que campo de formula seleccionado es mismo tipo variable
                        var tipoNuevaAsig = tipoDeAsignacionSeleccionado;
                        for (var i = 0; i < elementosFormulas[posicionSel][indiceFormulaSeleccionadaEdit].length; i++) {
                            tipoNuevaAsig = elementosFormulas[posicionSel][indiceFormulaSeleccionadaEdit][i].tipoColumnaEnTabla;
                            break;
                        };
                        if( (posicionAtributoSeleccionado == -1 && (this.state.tipoNuevaVariable.localeCompare(tipoNuevaAsig) == 0 || this.state.tipoNuevaVariable.length == 0)) || (posicionAtributoSeleccionado != -1 && (this.state.atributos[posicionSel].tipo.localeCompare(tipoNuevaAsig) == 0 || this.state.atributos[posicionSel].tipo.length == 0)) ) {
                            var nuevoNivel = nivelNuevoAtributo;
                            /*var segmentoRegla;
                            if(banderaEsObjeto) {
                                nuevoNivel = nivelNuevoAtributoVarios;
                                segmentoRegla = segmentoReglasVariosAtributos;
                            } else {
                                nuevoNivel = nivelNuevoAtributoUnico;
                                segmentoRegla = segmentoReglasUnAtributo;
                            }*/
                            if(segmentoRegla.length == undefined)
                                segmentoRegla = [];
                            if(segmentoRegla[posicionSel] == undefined)
                                segmentoRegla[posicionSel] = [];
                            var conexionTablaID = -1, variableID = -1, esConexionTabla = false, nivelMax = 1;
                            var posicionInsertarReglaAtributo = 0, posicionInsertarReglaSegmento = 0;
                            var posicionSegmentoEnCampo = -1; //bandera para saber a que segmento pertenece la regla, utilizado para elegir color fondo reglas
                            var excelArchivoID = -1, excelVariableID = -1, formaVariableID = -1;
                            var esValorManual = false;
                            if(formulaSeleccionada.tablaID != undefined && formulaSeleccionada.tablaID != -1) {
                                conexionTablaID = formulaSeleccionada.tablaID;
                                esConexionTabla = true;
                            } else if(formulaSeleccionada.variableID != undefined && formulaSeleccionada.variableID != -1) {
                                variableID = formulaSeleccionada.variableID;
                            } else if(formulaSeleccionada.excelArchivoID != undefined && formulaSeleccionada.excelArchivoID != -1) {
                                excelArchivoID = formulaSeleccionada.excelArchivoID;
                                excelVariableID = formulaSeleccionada.excelVariableID;
                            } else if(formulaSeleccionada.formaVariableID != undefined && formulaSeleccionada.formaVariableID != -1) {
                                formaVariableID = formulaSeleccionada.formaVariableID;
                            } else if(formulaSeleccionada.esValorManual != undefined) {
                                esValorManual = formulaSeleccionada.esValorManual;
                            }
                            if(tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0 || (indiceSeleccionadoReglas == -1 && tipoElementoSeleccionadoRegla.length == 0) || segmentoRegla[posicionSel].length == 0) {
                                var segmentoReglaIndex = 0;
                                if(segmentoRegla[posicionSel].length > 0) {
                                    segmentoReglaIndex = segmentoRegla[posicionSel].length;
                                }
                                segmentoRegla[posicionSel].push({
                                    conexionTablaID: conexionTablaID,
                                    variableID: variableID,
                                    esConexionTabla: esConexionTabla,
                                    nivelMax: nivelMax,
                                    segmentoReglaIndex: segmentoReglaIndex,
                                    excelArchivoID: excelArchivoID,
                                    excelVariableID: excelVariableID,
                                    formaVariableID: formaVariableID,
                                    esValorManual: esValorManual
                                });
                                posicionInsertarReglaAtributo = posicionSel;
                                posicionInsertarReglaSegmento = segmentoRegla[posicionSel].length-1;
                            } else {
                                segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].nivelMax++;
                                if(segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].excelArchivoID == -1 && excelArchivoID != -1) {
                                    segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].excelArchivoID = excelArchivoID;
                                    segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].excelVariableID = excelVariableID;
                                }
                                if(segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].formaVariableID == -1 && formaVariableID != -1) {
                                    segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].formaVariableID = formaVariableID;
                                }
                                if(segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].variableID == -1 && variableID != -1) {
                                    segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].variableID = variableID;
                                }
                                posicionInsertarReglaAtributo = posicionSel;
                                posicionInsertarReglaSegmento = indiceSeleccionadoSegmentoReglas;
                            }
                            if(reglas[posicionInsertarReglaAtributo] == undefined) {
                                reglas[posicionInsertarReglaAtributo] = [];
                            }
                            if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] == undefined) {
                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] = [];
                            }
                            var esCondicion = !esFormula;
                            var segmentoReglaIndex = 0;
                            if(indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") != 0) {
                                //cuando se esta añadiendo una regla a un segmento existente
                                segmentoReglaIndex = indiceSeleccionadoSegmentoReglas;
                            } else if(indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                                //cuando se esta añadiendo una regla a un nuevo segmento
                                segmentoReglaIndex = indiceSeleccionadoSegmentoReglas+1;
                            }

                            var nuevaRegla = {
                                                segmentoReglaID: segmentoReglaIndex,
                                                conexionTablaID: conexionTablaID,
                                                nombreColumnaEnTabla: '',
                                                formulaID: posicionFormulaSeleccionada,
                                                variableID: -1,
                                                variableCampoID: -1,
                                                reglaPadreID: -1,
                                                esCondicion: esCondicion,
                                                esConexionTabla: esConexionTabla,
                                                tipoCampoObjetivo: tipoDeAsignacionSeleccionado,
                                                operacion: formulaSeleccionada.operacion,
                                                operacionTexto: this.retornarCodigoOperacion(formulaSeleccionada.operacion),
                                                valor: formulaSeleccionada.operacion,
                                                texto: formulaSeleccionada.formula,
                                                nivel: nuevoNivel,
                                                posicionSegmentoEnCampo: segmentoReglaIndex
                                            };
                            if(reglas.length == 0 || reglas[posicionInsertarReglaAtributo].length == 0 || reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length == 0) {
                                //cuando no existe regla creada para el campo
                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
                            } else {
                                //el campo ya tiene una regla o mas creada

                                if( (tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#siRADIO").is(':checked')) || (tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && !$("#siRADIO").is(':checked') && !$("#sinoRADIO").is(':checked')) ) {
                                    //se seleciona el indice de la posicion de la regla dentro del arreglo, para que despues se pueda sacar el ID a base de la posicion
                                    //se pone de regla padre a la regla seleccionada
                                    nuevaRegla.reglaPadreID = indiceSeleccionadoReglas;
                                    nuevaRegla.nivel = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].nivel+1;
                                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas+1, 0, nuevaRegla);
                                    if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas+2] != undefined) {
                                        for (var i = indiceSeleccionadoReglas+2; i < reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length; i++) {
                                            if(nuevaRegla.nivel <= reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel) {
                                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].reglaPadreID = i-1;
                                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel++;
                                            }
                                        };
                                    }
                                } else if(tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#sinoRADIO").is(':checked') ) {
                                    var posicionAInsertar = -1;
                                    nuevaRegla.reglaPadreID = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].reglaPadreID;
                                    nuevaRegla.nivel = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].nivel;
                                    if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas+1] != undefined) {
                                        for (var i = indiceSeleccionadoReglas+1; i < reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length; i++) {
                                            if(nuevaRegla.nivel > reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel){
                                                posicionAInsertar = i;
                                            }
                                        };
                                    }
                                    if(posicionAInsertar != -1) {
                                        reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(posicionAInsertar, 0, nuevaRegla);
                                    } else {
                                        //insertar al final del segmento
                                        reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
                                    }
                                } else if(tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                                    nuevaRegla.reglaPadreID = -1;
                                    nuevaRegla.nivel = -1;
                                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
                                } else if(tipoElementoSeleccionadoRegla.localeCompare("arriba") == 0) {
                                    nuevaRegla.reglaPadreID = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].reglaPadreID;
                                    nuevaRegla.nivel = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].nivel;
                                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas, 0, nuevaRegla);
                                    if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas+1] != undefined) {
                                        for (var i = indiceSeleccionadoReglas+1; i < reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length; i++) {
                                            if(nuevaRegla.nivel <= reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel) {
                                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].reglaPadreID = i-1;
                                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel++;
                                            }
                                        };
                                    }
                                }
                                //la condicion es anidada, o sea dentro de la condicion padre
                            }
                            //deseleccionado regla seleccionada
                            indiceSeleccionadoReglas = -1;
                            var tempNewCopy = [...reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]];
                            this.setState({
                                reglas: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]
                            });
                            formulaSeleccionada = null;
                            //if(this.state.tipoNuevaVariable.length == 0) {
                                this.setState({
                                    tipoNuevaVariable: tipoNuevaAsig
                                });
                            //}
                            /*if (banderaEsObjeto) {
                                reglasVariosAtributos = reglas;
                                segmentoReglasVariosAtributos = segmentoRegla;
                            } else {
                                reglasUnAtributo = reglas;
                                segmentoReglasUnAtributo = segmentoRegla;
                            }*/
                            //tipoDeAsignacionSeleccionado = '';
                        } else {
                            if(this.state.tipoNuevaVariable.localeCompare(tipoNuevaAsig) != 0) {
                                alert("El tipo de asignacion de formula no coincide el tipo de campo.");
                            }
                        }
                    }
                } else {
                    var texto2 = 'variable';
                    if(campoSeleccionado.tablaID != undefined)
                        texto2 = 'tabla';
                    var texto = 'formula';
                    if(!esFormula)
                        texto = 'comparación';
                    alert("La "+texto+" ingresada no pertenece a la misma "+texto2+".");
                }
            } else {
                alert("Seleccione una posición en la 'Lógica para el cálculo'");
            }
        } else {
            if(!reglaEsValida && !esFormula)
                alert("Ingrese todos los campos necesarios para la condicion.");
            else if(!reglaEsValida && esFormula)
                alert("Seleccione una formula.");
            else
                alert("La comparación ya tiene una clausula 'SINO'");
        }
    }

    revisarTipoAnadirFormula (formula, formulaArreglo) {
        if(banderaEsFormulaIndicador)
            this.anadirFormulaIndicador(formula, formulaArreglo);
        else
            this.anadirFormula(formula, formulaArreglo);
    }

    anadirFormulaIndicador (formula, formulaArreglo) {
        formulaG = formula.formula;
        //indiceSeleccionadoFormula es el indice de la formula seleccionada, las formula se asocian por campo (1 campo => muchas formulas)
        elementosFormulasG = [];
        var arregloDeElementos = [];
        this.getElementsFromFormula(formulaArreglo, arregloDeElementos);
        elementosFormulasG = arregloDeElementos;
        /*for (var i = 0; i < formulaArreglo.length; i++) {
            if(formulaArreglo[i].tipo.localeCompare("variable") == 0) {
                var conexionTablaID = -1;
                if(formulaArreglo[i].esFuenteDato != undefined && formulaArreglo[i].esFuenteDato)
                    conexionTablaID = formulaArreglo[i].tablaID;
                var esFuenteDeDato = false;
                if(formulaArreglo[i].esFuenteDato != undefined && formulaArreglo[i].esFuenteDato)
                    esFuenteDeDato = true;
                var excelArchivoID = -1;
                if(formulaArreglo[i].excelArchivoID != undefined)
                    excelArchivoID = formulaArreglo[i].excelArchivoID;
                var excelVariableID = -1;
                if(formulaArreglo[i].excelVariableID != undefined)
                    excelVariableID = formulaArreglo[i].excelVariableID;
                var formaVariableID = -1;
                if(formulaArreglo[i].formaVariableID != undefined)
                    formaVariableID = formulaArreglo[i].formaVariableID;
                var elementoVariableID = -1;
                if(formulaArreglo[i].variableID != undefined)
                    elementoVariableID = formulaArreglo[i].variableID;
                var elementoVariableCampoID = -1;
                if(formulaArreglo[i].variableCampoID != undefined)
                    elementoVariableCampoID = formulaArreglo[i].variableCampoID;
                elementosFormulasG.push({
                    variableID: -1,
                    variableCampoID: -1,
                    formulaID: -1,
                    conexionTablaID: conexionTablaID,
                    esFuenteDeDato: esFuenteDeDato,
                    excelArchivoID: excelArchivoID,
                    excelVariableID: excelVariableID,
                    formaVariableID: formaVariableID,
                    elementoVariableID: elementoVariableID,
                    elementoVariableCampoID: elementoVariableCampoID,
                    nombreColumnaEnTabla: formulaArreglo[i].valor,
                    tipoColumnaEnTabla: tipoDeAsignacionSeleccionado,
                    nombreVariable: formulaArreglo[i].valor,
                    descripcion: '',
                    operacion: formulaArreglo[i].operacion
                });
            }
        };*/
    }

    anadirFormula(formula, formulaArreglo) {
        // 1. Make a shallow copy of the items
        //let campos = [...this.state.camposDeTabla];
        // 2. Make a shallow copy of the item you want to mutate
        //let campo = [...campos[index]];
        // 3. Replace the property you're intested in
        //campo = {ID: campo.ID, idTabla: idTabla, nombre: campoNombre, tipo: tipoCampo, guardar: guardarCampo};
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        //campos[index] = campo;
        // 5. Set the state to our new copy
        var posicionSel = posicionAtributoSeleccionado;
        //indice = -1 cuando se va a condiciones de un campo nuevo
        //cuando se presiona NavBar indice es igual indice anterior
        //cuando se selecciona un campo existente indice = posicion campo
        if(posicionAtributoSeleccionado == -1) {
            posicionSel = this.state.atributos.length;
        }
        //copia antigua formulas
        var copiaAntiguaFormulas = formulas;
        if(copiaAntiguaFormulas[posicionSel] == undefined)
            copiaAntiguaFormulas[posicionSel] = [];
        formula.numeroDeFormulaDeVariable = copiaAntiguaFormulas[posicionSel].length;
        copiaAntiguaFormulas[posicionSel].push(formula);
        this.setState({
            formulas: copiaAntiguaFormulas[posicionSel]
        });
        if(elementosFormulas[posicionSel] == undefined)
            elementosFormulas[posicionSel] = [];
        var posicionFormulaEnCampo = 0;
        if (copiaAntiguaFormulas[posicionSel].length > 0 )
            posicionFormulaEnCampo = copiaAntiguaFormulas[posicionSel].length-1;
        //indiceSeleccionadoFormula es el indice de la formula seleccionada, las formula se asocian por campo (1 campo => muchas formulas)
        if(elementosFormulas[posicionSel][posicionFormulaEnCampo] == undefined)
            elementosFormulas[posicionSel][posicionFormulaEnCampo] = [];
        var arregloDeElementos = [];
        this.getElementsFromFormula(formulaArreglo, arregloDeElementos);
        elementosFormulas[posicionSel][posicionFormulaEnCampo] = arregloDeElementos;
        /*for (var i = 0; i < formulaArreglo.length; i++) {
            if(formulaArreglo[i].tipo.localeCompare("variable") == 0) {
                var conexionTablaID = -1;
                if(formulaArreglo[i].esFuenteDato != undefined && formulaArreglo[i].esFuenteDato)
                    conexionTablaID = formulaArreglo[i].tablaID;
                var esFuenteDeDato = false;
                if(formulaArreglo[i].esFuenteDato != undefined && formulaArreglo[i].esFuenteDato)
                    esFuenteDeDato = true;
                var excelArchivoID = -1;
                if(formulaArreglo[i].excelArchivoID != undefined)
                    excelArchivoID = formulaArreglo[i].excelArchivoID;
                var excelVariableID = -1;
                if(formulaArreglo[i].excelVariableID != undefined)
                    excelVariableID = formulaArreglo[i].excelVariableID;
                var formaVariableID = -1;
                if(formulaArreglo[i].formaVariableID != undefined)
                    formaVariableID = formulaArreglo[i].formaVariableID;
                var elementoVariableID = -1;
                if(formulaArreglo[i].variableID != undefined)
                    elementoVariableID = formulaArreglo[i].variableID;
                var elementoVariableCampoID = -1;
                if(formulaArreglo[i].variableCampoID != undefined)
                    elementoVariableCampoID = formulaArreglo[i].variableCampoID;
                elementosFormulas[posicionSel][posicionFormulaEnCampo].push({
                    variableID: -1,
                    variableCampoID: -1,
                    formulaID: -1,
                    conexionTablaID: conexionTablaID,
                    esFuenteDeDato: esFuenteDeDato,
                    excelArchivoID: excelArchivoID,
                    excelVariableID: excelVariableID,
                    formaVariableID: formaVariableID,
                    elementoVariableID: elementoVariableID,
                    elementoVariableCampoID: elementoVariableCampoID,
                    nombreColumnaEnTabla: formulaArreglo[i].valor,
                    tipoColumnaEnTabla: tipoDeAsignacionSeleccionado,
                    nombreVariable: formulaArreglo[i].valor,
                    descripcion: '',
                    operacion: formulaArreglo[i].operacion
                });
            }
        };*/
    }

    getElementsFromFormula (formulaArreglo, array) {
        for (var i = 0; i < formulaArreglo.length; i++) {
            if(Array.isArray(formulaArreglo[i].valor)) {
                this.getElementsFromFormula(formulaArreglo[i].valor, array);
            } else if(formulaArreglo[i].tipo.localeCompare("variable") == 0) {
                var conexionTablaID = -1;
                if(formulaArreglo[i].esFuenteDato != undefined && formulaArreglo[i].esFuenteDato)
                    conexionTablaID = formulaArreglo[i].tablaID;
                var esFuenteDeDato = false;
                if(formulaArreglo[i].esFuenteDato != undefined && formulaArreglo[i].esFuenteDato)
                    esFuenteDeDato = true;
                var excelArchivoID = -1;
                if(formulaArreglo[i].excelArchivoID != undefined)
                    excelArchivoID = formulaArreglo[i].excelArchivoID;
                var excelVariableID = -1;
                if(formulaArreglo[i].excelVariableID != undefined)
                    excelVariableID = formulaArreglo[i].excelVariableID;
                var formaVariableID = -1;
                if(formulaArreglo[i].formaVariableID != undefined)
                    formaVariableID = formulaArreglo[i].formaVariableID;
                var elementoVariableID = -1;
                if(formulaArreglo[i].variableID != undefined)
                    elementoVariableID = formulaArreglo[i].variableID;
                var elementoVariableCampoID = -1;
                if(formulaArreglo[i].variableCampoID != undefined)
                    elementoVariableCampoID = formulaArreglo[i].variableCampoID;
                var esValorManual = false;
                if(formulaArreglo[i].esValorManual != undefined)
                    esValorManual = formulaArreglo[i].esValorManual;
                array.push({
                    variableID: -1,
                    variableCampoID: -1,
                    formulaID: -1,
                    conexionTablaID: conexionTablaID,
                    esFuenteDeDato: esFuenteDeDato,
                    excelArchivoID: excelArchivoID,
                    excelVariableID: excelVariableID,
                    formaVariableID: formaVariableID,
                    elementoVariableID: elementoVariableID,
                    elementoVariableCampoID: elementoVariableCampoID,
                    esValorManual: esValorManual,
                    nombreColumnaEnTabla: formulaArreglo[i].valor,
                    tipoColumnaEnTabla: tipoDeAsignacionSeleccionado,
                    nombreVariable: formulaArreglo[i].valor,
                    descripcion: '',
                    operacion: formulaArreglo[i].operacion
                });
            }
        };
    }

    modificarRegla (esFormula, formulaSeleccionada, posicionFormulaSeleccionada) {
        if(reglas[0].length > 0 || (reglas[0][0] != undefined && reglas[0][0].length > 0)) {
            var posicionAtributo = posicionAtributoSeleccionado;
            //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
            //cuando se presiona NavBar indice es igual indice anterior
            //cuando se selecciona un campo existente indice = posicion campo
            if(posicionAtributo == -1) {
                posicionAtributo = this.state.atributos.length;
            }
            //viendo si regla condicion ya tiene regla sino
            //comparando si la regla seleccionada es otra regla, y si la nueva regla a insertar no es formula
            var banderaSinoReglaValido = true;
            if(tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && !esFormula && $("#sinoRADIO").is(':checked')) {
                var nivelABuscar = reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas][indiceSeleccionadoReglas].nivel;
                if(indiceSeleccionadoReglas+1 < reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas].length) {
                    for (var i = indiceSeleccionadoReglas+1; i < reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas].length; i++) {
                        if (nivelABuscar == reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas][i].nivel && reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas][i].operacion.localeCompare("ELSE") == 0) {
                            banderaSinoReglaValido = false;
                        }
                    };
                }
            }
            var reglaEsValida = true;
            if(!esFormula) {
                if(campoSeleccionado == undefined || campoSeleccionado.valor == undefined) {
                    reglaEsValida = false;
                }
                if(valorSeleccionado.length == 0) {
                    reglaEsValida = false;
                }
                if(operacionSeleccionada.operacion == undefined) {
                    reglaEsValida = false;
                }
                if(campoSeleccionado.tipo != undefined) {
                    if(campoSeleccionado.tipo.localeCompare("int") == 0 || campoSeleccionado.tipo.localeCompare("decimal") == 0) {
                        if(valorSeleccionado.indexOf("NUMERO") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                            reglaEsValida = false;
                        }
                    } else if(campoSeleccionado.tipo.localeCompare("bool") == 0) {
                        if(valorSeleccionado.indexOf("BOOL") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                            reglaEsValida = false;
                        }
                    } else if(campoSeleccionado.tipo.localeCompare("date") == 0) {
                        if(valorSeleccionado.indexOf("FECHA") == -1 && valorSeleccionado.indexOf("TIME") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                            reglaEsValida = false;
                        }
                    } else if(campoSeleccionado.tipo.localeCompare("varchar") == 0) {
                        if(valorSeleccionado.indexOf("VARCHAR") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                            reglaEsValida = false;
                        }
                    }
                }
            } else {
                if(formulaSeleccionada.formula == undefined) {
                    reglaEsValida = false;
                }
            }
            //si es formula, viendo que no haya regla debajo, formulas solo se pueden agregar al final
            if(banderaSinoReglaValido && reglaEsValida) {
                if(indiceSeleccionadoReglas != -1 || ( indiceSeleccionadoReglas == -1 && (reglas.length == 0 || (reglas[posicionAtributo] != undefined && reglas[posicionAtributo].length == 0) )) ) {
                    var entrarACrearRegla = false;
                    if(indiceSeleccionadoReglas != -1 && tipoElementoSeleccionadoRegla.length > 0 && tipoElementoSeleccionadoRegla.localeCompare("abajo") != 0 && segmentoRegla[posicionAtributo] != undefined) {
                        //validando nueva regla tenga la misma variable o conexion tabla del mismo segmento
                        if(!esFormula) {
                            if(campoSeleccionado.tablaID != undefined) {
                                if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].conexionTablaID == campoSeleccionado.tablaID) {
                                    entrarACrearRegla = true;
                                }
                            } else if(campoSeleccionado.variableID != undefined) {
                                if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].variableID == campoSeleccionado.variableID) {
                                    entrarACrearRegla = true;
                                }
                                if(indiceSeleccionadoSegmentoReglas == 0)
                                    entrarACrearRegla = true;
                                //viendo si variable seleccionada es objeto
                                var variableSel = this.state.variables.filter(function (object) {
                                    return object.ID == campoSeleccionado.variableID;
                                });
                                if(variableSel.length > 0) {
                                    if(!variableSel[0].esObjeto)
                                        entrarACrearRegla = true;
                                }
                            } else if(campoSeleccionado.excelArchivoID != undefined) {
                                entrarACrearRegla = true;
                            } else if(campoSeleccionado.formaVariableID != undefined) {
                                entrarACrearRegla = true;
                            }
                        } else {
                            if(formulaSeleccionada.tablaID != undefined) {
                                if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].conexionTablaID == formulaSeleccionada.tablaID) {
                                    entrarACrearRegla = true;
                                }
                            } else if(formulaSeleccionada.variableID != undefined) {
                                if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].variableID == formulaSeleccionada.variableID) {
                                    entrarACrearRegla = true;
                                }
                                if(indiceSeleccionadoSegmentoReglas == 0)
                                    entrarACrearRegla = true;
                                //viendo si variable seleccionada es objeto
                                var variableSel = this.state.variables.filter(function (object) {
                                    return object.ID == formulaSeleccionada.variableID;
                                });
                                if(variableSel.length > 0) {
                                    if(!variableSel[0].esObjeto)
                                        entrarACrearRegla = true;
                                }
                            } else if(formulaSeleccionada.excelArchivoID != undefined) {
                                entrarACrearRegla = true;
                            } else if(formulaSeleccionada.formaVariableID != undefined) {
                                entrarACrearRegla = true;
                            }
                        }
                    } else if( ( indiceSeleccionadoReglas == -1 && (reglas.length == 0 || (reglas[posicionAtributo] != undefined && reglas[posicionAtributo].length == 0) )) || tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0 ||  segmentoRegla[posicionAtributo] == undefined) {
                        entrarACrearRegla = true;
                    }
                    if(entrarACrearRegla) {
                        if(!esFormula) {
                            var valor = $("#valor").val();
                            var posicionSel = posicionAtributoSeleccionado;
                            //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
                            //cuando se presiona NavBar indice es igual indice anterior
                            //cuando se selecciona un campo existente indice = posicion campo
                            if(posicionAtributoSeleccionado == -1) {
                                posicionSel = this.state.atributos.length;
                            }
                            var posicionInsertarReglaAtributo = 0, posicionInsertarReglaSegmento = 0;
                            segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].nivelMax++;
                            posicionInsertarReglaAtributo = posicionSel;
                            posicionInsertarReglaSegmento = indiceSeleccionadoSegmentoReglas;
                            var esCondicion = !esFormula;
                            var segmentoReglaIndex = 0;
                            if(indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") != 0) {
                                //cuando se esta añadiendo una regla a un segmento existente
                                segmentoReglaIndex = indiceSeleccionadoSegmentoReglas;
                            } else if(indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                                //cuando se esta añadiendo una regla a un nuevo segmento
                                segmentoReglaIndex = indiceSeleccionadoSegmentoReglas+1;
                            }
                            var conexionTablaID = -1, esConexionTabla = false, nombreColumnaEnTabla = '';
                            if(campoSeleccionado.tablaID != undefined) {
                                conexionTablaID = campoSeleccionado.tablaID;
                                esConexionTabla = true;
                                nombreColumnaEnTabla = campoSeleccionado.valor;
                            }
                            var nuevoNivel = 0;
                            var nuevaRegla = {
                                                segmentoReglaID: segmentoReglaIndex,
                                                conexionTablaID: conexionTablaID,
                                                nombreColumnaEnTabla: nombreColumnaEnTabla,
                                                formulaID: -1,
                                                variableID: -1,
                                                variableCampoID: -1,
                                                reglaPadreID: -1,
                                                tipoCampoObjetivo: campoSeleccionado.tipo,
                                                esCondicion: esCondicion,
                                                esConexionTabla: esConexionTabla,
                                                operacion: operacionSeleccionada.operacion,
                                                operacionTexto: operacionSeleccionada.operacionTexto,
                                                valor: valor,
                                                texto: campoSeleccionado.valor+" "+operacionSeleccionada.operacionTexto+" "+valor,
                                                nivel: nuevoNivel,
                                                posicionSegmentoEnCampo: segmentoReglaIndex
                                            };
                            reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas, 1, nuevaRegla);
                            //deseleccionado regla seleccionada
                            indiceSeleccionadoReglas = -1;
                            this.setState({
                                reglas: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]
                            });
                            campoSeleccionado = null;
                            valorSeleccionado = '';
                            //reglas[posicionSel].push(nuevaRegla);
                        } else {
                            //es regla formula
                            var posicionSel = posicionAtributoSeleccionado;
                            //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
                            //cuando se presiona NavBar indice es igual indice anterior
                            //cuando se selecciona un campo existente indice = posicion campo
                            if(posicionAtributoSeleccionado == -1) {
                                posicionSel = this.state.atributos.length;
                            }
                            //verificando que campo de formula seleccionado es mismo tipo variable
                            //tipoDeAsignacionSeleccionado
                            //verificando que si modifica con un tipoDeAsignacionSeleccionado diferente al existente, que pueda entrar y actualizar tipo, si existe mas de una formula no se puede
                            var existeSoloUnaFormula = false, contadorFormulas = 0;
                            ForReglas:
                            for (var i = 0; i < reglas[posicionSel].length; i++) {
                                for (var j = 0; j < reglas[posicionSel][i].length; j++) {
                                    if(!reglas[posicionSel][i][j].esCondicion) {
                                        contadorFormulas++;
                                    }
                                };
                            };
                            if(contadorFormulas == 1) {
                                existeSoloUnaFormula = true;
                            }
                            var tipoNuevaAsig = tipoDeAsignacionSeleccionado;
                            for (var i = 0; i < elementosFormulas[posicionSel][indiceFormulaSeleccionadaEdit].length; i++) {
                                tipoNuevaAsig = elementosFormulas[posicionSel][indiceFormulaSeleccionadaEdit][i].tipoColumnaEnTabla;
                                break;
                            };
                            if( (posicionAtributoSeleccionado == -1 && (this.state.tipoNuevaVariable.localeCompare(tipoNuevaAsig) == 0 || this.state.tipoNuevaVariable.length == 0)) || (posicionAtributoSeleccionado != -1 && (this.state.atributos[posicionSel].tipo.localeCompare(tipoNuevaAsig) == 0 || this.state.atributos[posicionSel].tipo.length == 0)) || existeSoloUnaFormula ) {
                                var nuevoNivel = nivelNuevoAtributo;
                                var posicionInsertarReglaAtributo = 0, posicionInsertarReglaSegmento = 0;
                                segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].nivelMax++;
                                posicionInsertarReglaAtributo = posicionSel;
                                posicionInsertarReglaSegmento = indiceSeleccionadoSegmentoReglas;
                                var esCondicion = !esFormula;
                                var segmentoReglaIndex = 0;
                                if(indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") != 0) {
                                    //cuando se esta añadiendo una regla a un segmento existente
                                    segmentoReglaIndex = indiceSeleccionadoSegmentoReglas;
                                } else if(indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                                    //cuando se esta añadiendo una regla a un nuevo segmento
                                    segmentoReglaIndex = indiceSeleccionadoSegmentoReglas+1;
                                }
                                var conexionTablaID = -1, esConexionTabla = false, nombreColumnaEnTabla = '';
                                if(campoSeleccionado.tablaID != undefined) {
                                    conexionTablaID = campoSeleccionado.tablaID;
                                    esConexionTabla = true;
                                    nombreColumnaEnTabla = campoSeleccionado.valor;
                                }
                                var nuevaRegla = {
                                                    segmentoReglaID: segmentoReglaIndex,
                                                    conexionTablaID: conexionTablaID,
                                                    nombreColumnaEnTabla: '',
                                                    formulaID: posicionFormulaSeleccionada,
                                                    variableID: -1,
                                                    variableCampoID: -1,
                                                    reglaPadreID: -1,
                                                    esCondicion: esCondicion,
                                                    esConexionTabla: esConexionTabla,
                                                    operacion: formulaSeleccionada.operacion,
                                                    operacionTexto: this.retornarCodigoOperacion(formulaSeleccionada.operacion),
                                                    valor: formulaSeleccionada.operacion,
                                                    texto: formulaSeleccionada.formula,
                                                    nivel: nuevoNivel,
                                                    posicionSegmentoEnCampo: segmentoReglaIndex
                                                };
                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas, 1, nuevaRegla);
                                //deseleccionado regla seleccionada
                                //indiceSeleccionadoReglas = -1;
                                var tempNewCopy = [...reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]];
                                this.setState({
                                    reglas: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]
                                });
                                formulaSeleccionada = null;
                                //if(this.state.tipoNuevaVariable.length == 0) {
                                    this.setState({
                                        tipoNuevaVariable: tipoNuevaAsig
                                    });
                                //}
                                //tipoDeAsignacionSeleccionado = '';
                            } else {
                                if(this.state.tipoNuevaVariable.localeCompare(tipoDeAsignacionSeleccionado) != 0) {
                                    alert("El tipo de asignacion de formula no coincide el tipo de campo.");
                                }
                            }
                        }
                    } else {
                        var texto2 = 'variable';
                        if(campoSeleccionado.tablaID != undefined)
                            texto2 = 'tabla';
                        var texto = 'formula';
                        if(!esFormula)
                            texto = 'comparación';
                        alert("La "+texto+" ingresada no pertenece a la misma "+texto2+".");
                    }
                } else {
                    alert("Seleccione una posición en la 'Lógica para el cálculo'");
                }
            } else {
                if(!reglaEsValida && !esFormula)
                    alert("Ingrese todos los campos necesarios para la condicion.");
                else if(!reglaEsValida && esFormula)
                    alert("Seleccione una formula.");
                else
                    alert("La comparación ya tiene una clausula 'SINO'");
            }
        } else {
            alert("Cree una comparación primero");
        }
    }

    eliminarRegla () {
        if(reglas[0].length > 0 || (reglas[0][0] != undefined && reglas[0][0].length > 0)) {
            var posicionSel = posicionAtributoSeleccionado;
            //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
            //cuando se presiona NavBar indice es igual indice anterior
            //cuando se selecciona un campo existente indice = posicion campo
            if(posicionAtributoSeleccionado == -1) {
                posicionSel = this.state.atributos.length;
            }
            var posicionInsertarReglaAtributo = 0, posicionInsertarReglaSegmento = 0;
            posicionInsertarReglaAtributo = posicionSel;
            posicionInsertarReglaSegmento = indiceSeleccionadoSegmentoReglas;
            reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas, 1);
            indiceSeleccionadoReglas = -1;
            if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length == 0) {
                reglas[posicionInsertarReglaAtributo].splice(posicionInsertarReglaSegmento, 1);
                segmentoRegla[posicionInsertarReglaAtributo].splice(posicionInsertarReglaSegmento, 1);
            }
            if(reglas[posicionInsertarReglaAtributo] == undefined || reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] == undefined || reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length == 0) {
                this.setState({
                    reglas: []
                });
            } else {
                this.setState({
                    reglas: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]
                });
            }
            var existeFormula = false;
            ForReglas:
            for (var i = 0; i < reglas[posicionInsertarReglaAtributo].length; i++) {
                for (var j = 0; j < reglas[posicionInsertarReglaAtributo][i].length; j++) {
                    if(!reglas[posicionInsertarReglaAtributo][i][j].esCondicion) {
                        existeFormula = true;
                        break ForReglas;
                    }
                };
            };
            if(!existeFormula) {
                this.setState({
                    tipoNuevaVariable: ""
                });
                tipoDeAsignacionSeleccionado = '';
            }
        } else {
            alert("Cree una comparación primero");
        }
    }

    verificarModificarFormula (formula, formulaArreglo) {
        if(banderaEsFormulaIndicador)
            this.modificarFormulaGlobal(formula, formulaArreglo);
        else
            this.modificarFormula(formula, formulaArreglo);
    }

    modificarFormula(formula, formulaArreglo) {
        // 1. Make a shallow copy of the items
        //let campos = [...this.state.camposDeTabla];
        // 2. Make a shallow copy of the item you want to mutate
        //let campo = [...campos[index]];
        // 3. Replace the property you're intested in
        //campo = {ID: campo.ID, idTabla: idTabla, nombre: campoNombre, tipo: tipoCampo, guardar: guardarCampo};
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        //campos[index] = campo;
        // 5. Set the state to our new copy
        var posicionSel = posicionAtributoSeleccionado;
        //indice = -1 cuando se va a condiciones de un campo nuevo
        //cuando se presiona NavBar indice es igual indice anterior
        //cuando se selecciona un campo existente indice = posicion campo
        if(posicionAtributoSeleccionado == -1) {
            posicionSel = this.state.atributos.length;
        }
        //copia antigua formulas
        /*var elementosFormulas, copiaAntiguaFormulas;
        if(banderaEsObjeto) {
            copiaAntiguaFormulas = formulasVariosAtributos;
            elementosFormulas = elementosFormulasVariosAtributos;
        } else {
            copiaAntiguaFormulas = formulasUnAtributo;
            elementosFormulas = elementosFormulasUnAtributos;
        }*/
        if(formulas[posicionSel] == undefined)
            formulas[posicionSel] = [];
        formulas[posicionSel][indiceFormulaSeleccionadaEdit] = formula;
        this.setState({
            formulas: formulas[posicionSel]
        });
        if(elementosFormulas[posicionSel] == undefined)
            elementosFormulas[posicionSel] = [];
        var posicionFormulaEnCampo = indiceFormulaSeleccionadaEdit;
        //indiceSeleccionadoFormula es el indice de la formula seleccionada, las formula se asocian por campo (1 campo => muchas formulas)
        if(elementosFormulas[posicionSel][posicionFormulaEnCampo] == undefined)
            elementosFormulas[posicionSel][posicionFormulaEnCampo] = [];
        var arregloDeElementos = [];
        this.getElementsFromFormula(formulaArreglo, arregloDeElementos);
        elementosFormulas[posicionSel][posicionFormulaEnCampo] = arregloDeElementos;
        /*if(banderaEsObjeto) {
            formulasVariosAtributos = copiaAntiguaFormulas;
            elementosFormulasVariosAtributos = elementosFormulas;
        } else {
            formulasUnAtributo = copiaAntiguaFormulas;
            elementosFormulasUnAtributos = elementosFormulas;
        }*/
    }

    modificarFormulaGlobal(formula, formulaArreglo) {
        formulaG = formula.formula;
        var arregloDeElementos = [];
        this.getElementsFromFormula(formulaArreglo, arregloDeElementos);
        elementosFormulasG = arregloDeElementos;
    }

    eliminarFormula() {
        // 1. Make a shallow copy of the items
        //let campos = [...this.state.camposDeTabla];
        // 2. Make a shallow copy of the item you want to mutate
        //let campo = [...campos[index]];
        // 3. Replace the property you're intested in
        //campo = {ID: campo.ID, idTabla: idTabla, nombre: campoNombre, tipo: tipoCampo, guardar: guardarCampo};
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        //campos[index] = campo;
        // 5. Set the state to our new copy
        var posicionSel = posicionAtributoSeleccionado;
        //indice = -1 cuando se va a condiciones de un campo nuevo
        //cuando se presiona NavBar indice es igual indice anterior
        //cuando se selecciona un campo existente indice = posicion campo
        if(posicionAtributoSeleccionado == -1) {
            posicionSel = this.state.atributos.length;
        }
        //copia antigua formulas
        /*var elementosFormulas, copiaAntiguaFormulas;
        if(banderaEsObjeto) {
            copiaAntiguaFormulas = formulasVariosAtributos;
            elementosFormulas = elementosFormulasVariosAtributos;
        } else {
            copiaAntiguaFormulas = formulasUnAtributo;
            elementosFormulas = elementosFormulasUnAtributos;
        }*/
        if(formulas[posicionSel] == undefined)
            formulas[posicionSel] = [];
        formulas[posicionSel].splice(indiceFormulaSeleccionadaEdit, 1);
        this.setState({
            formulas: formulas[posicionSel]
        });
        var posicionFormulaEnCampo = indiceFormulaSeleccionadaEdit;
        elementosFormulas[posicionSel].splice(posicionFormulaEnCampo, 1);
    }

    updateIdFormula () {
        idFormula = $("#idFormula").val();
    }

    updateNombreIndicador() {
        nombreIndicador = $("#nombreIndicador").val();
    }

    updateCodigoIndicador() {
        codigoIndicador = $("#codigo").val();
    }

    updateValorIdealIndicador() {
        valorIdealIndicador = $("#valorIdeal").val();
    }

    updateTipoValorIdealIndicador() {
        tipoValorIdealIndicador = $("#tipoValorIdeal").val();
        if(tipoValorIdealIndicador.localeCompare("numerico") == 0) {
            mostrarToleranciaPorcentaje = false;
        } else {
            mostrarToleranciaPorcentaje = true;
        }
        this.setState({
            mostrarToleranciaPorcentaje: mostrarToleranciaPorcentaje
        });
    }

    updateToleranciaIndicador() {
        toleranciaIndicador = $("#tolerancia").val();
    }

    updatePeriodicidadIndicador() {
        periodicidadIndicador = $("#periodicidad").val();
        this.setState({
            periodicidadIndicador: periodicidadIndicador
        }, this.cargarDatePicker );
    }

    cargarDatePicker () {
        $('#fecha').datepicker({
            format: "dd-mm-yyyy",
            todayHighlight: true,
            viewMode: "days", 
            minViewMode: "days",
            language: 'es'
        });
        if(this.isValidDate(fecha)) {
            $("#fecha").datepicker("setDate", fecha);
        }
        var self = this;
        $('#fecha').datepicker().on('changeDate', function () {
            if(self.isValidDate($("#fecha").datepicker('getDate'))) {
                fecha = $("#fecha").datepicker('getDate');
            }
        });
    }

    updateTipoIndicador() {
        tipoIndicador = $("#tipoIndicador").val();
    }

    updateNombreEncargadoIndicador() {
        nombreEncargadoIndicador = $("#responsable").val();
    }

    isValidDate (fecha) {
        if (Object.prototype.toString.call(fecha) === "[object Date]") {
            if (isNaN(fecha.getTime())) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    verificarSiExisteExcelEnResultadosHistoricosModificar (variable) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ResultadosNombreIndicadores where nombreIndicador = '"+variable.nombre+"' and finVigencia = '1964-05-28'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if (result.recordset.length == 0) {
                            this.crearTablaDeResultadoNombreModificar(variable);
                        } else {
                            this.modificarResultadosNombre(variable, result.recordset[0].inicioVigencia);
                        }
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaDeResultadoNombreModificar (variable) {
        //NOMBRE TABLA: NOMBREVARIABLE_AÑOVIGENCIA_MESVIGENCIA_DIAVIGENCIA_HORAVIGENCIA_MINUTOSVIGENCIA_SEGUNDOSVIGENCIA
        //VIGENCIA: DIA CREACION
        let hoy = new Date();
        var textoCreacionTabla = 'CREATE TABLE '+variable.nombre+'_'+hoy.getFullYear()+'_'+(hoy.getMonth()+1)+'_'+hoy.getDate()+'_'+hoy.getHours()+'_'+hoy.getMinutes()+'_'+hoy.getSeconds()+' ( ID int IDENTITY(1,1) PRIMARY KEY, ';
        for (var i = 0; i < variable.variables.length; i++) {
            if(i != 0)
                textoCreacionTabla += ', ';
            if(variable.variables[i].tipo.localeCompare("numero") == 0) {
                textoCreacionTabla += variable.variables[i].nombre+' decimal(22,4)';
            } else if(variable.variables[i].tipo.localeCompare("varchar") == 0) {
                textoCreacionTabla += variable.variables[i].nombre+' varchar(1000)';
            } else if(variable.variables[i].tipo.localeCompare("bit") == 0) {
                textoCreacionTabla += variable.variables[i].nombre+' bit';
            } else if(variable.variables[i].tipo.localeCompare("date") == 0) {
                textoCreacionTabla += variable.variables[i].nombre+' date';
            }
        };
        textoCreacionTabla += ', f3ch4Gu4rd4do date )';
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query(textoCreacionTabla, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.crearResultadoNombreModificar(variable, hoy);
                    });
                }
            });
        }); // fin transaction
    }

    crearResultadoNombreModificar (variable, hoy) {
        let mes = hoy.getMonth()+1;
        if(mes.toString().length == 1)
            mes = '0'+mes;
        let dia = hoy.getDate();
        if(dia.toString().length == 1)
            dia = '0'+dia;
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into ResultadosNombreIndicadores (nombreIndicador, inicioVigencia, finVigencia) values ('"+variable.nombre+"', '"+hoy.getFullYear()+'-'+mes+'-'+dia+" "+hoy.getHours()+":"+hoy.getMinutes()+":"+hoy.getSeconds()+"', '1964-05-28')", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.verificarPeriodicidadGuardarModificar(variable, "indicador", hoy);
                    });
                }
            });
        }); // fin transaction
    }

    modificarResultadosNombre (resultado, variable, hoy)  {
        let mes = hoy.getMonth()+1;
        if(mes.toString().length == 1)
            mes = '0'+mes;
        let dia = hoy.getDate();
        if(dia.toString().length == 1)
            dia = '0'+dia;
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("update ResultadosNombreVariables set finVigencia = '"+hoy.getFullYear()+'-'+mes+'-'+dia+" "+hoy.getHours()+"' where ID = "+resultado.ID, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.crearTablaDeResultadoNombreModificar(variable);
                    });
                }
            });
        }); // fin transaction
    }

    verificarPeriodicidadGuardarModificar (variable, tabla, hoy) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from PeriodicidadCalculo where variableID = "+variable.ID+" and tablaVariable = '"+tabla+"'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            this.updatePeriodicidadModificar(variable, tabla, hoy);
                        }/* else {
                            this.guardarPeriodicidad(variable, tabla, hoy);
                        }*/
                    });
                }
            });
        }); // fin transaction
    }

    updatePeriodicidadModificar (variable, tabla, hoy) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("update PeriodicidadCalculo where variableID = "+variable.ID+" and tablaVariable = '"+tabla+"' set fechaUltimoCalculo = '1964-05-28'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                    });
                }
            });
        }); // fin transaction
    }

    tieneEspaciosEnBlanco (s) {
        return /\s/g.test(s);
    }

    getUsuarios () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Usuarios", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            usuarios: result.recordset
                        });
                        $("#responsable").val(nombreEncargadoIndicador);
                    });
                }
            });
        }); // fin transaction
    }











































    /*
        **************************************
        **************************************
                    CALCULO CODIGO
        **************************************
        **************************************
    */

    saveBitacora (fecha, descripcion) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into Bitacora (usuarioID, nombreUsuario, fecha, descripcion) values ("+this.props.userID+", '"+this.props.userName+"', '"+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+"', '"+descripcion+"')", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                    });
                }
            });
        }); // fin transaction
    }

    traerArchivosExcel() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ExcelArchivos", (err, result) => {
                if (err) {
                    console.log(err);
                    this.traerFormas();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        arregloDeExcel = result.recordset;
                        banderaImportacionVariablesExcelINICIO = 0;
                        banderaImportacionVariablesExcelFIN = arregloDeExcel.length;
                        for (var i = 0; i < arregloDeExcel.length; i++) {
                            this.traerVariablesExcel(arregloDeExcel[i].ID, i);
                        };
                        if(arregloDeExcel.length == 0) {
                            alert("No existen variables excel");
                            this.traerFormas();
                        }
                    });
                }
            });
        }); // fin transaction
    }

    traerVariablesExcel (excelArchivoID, index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ExcelVariables where excelArchivoID = "+excelArchivoID, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionVariablesExcelINICIO++;
                    this.revisarFinImportacionVariablesExcel();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionVariablesExcelINICIO++;
                        arregloDeExcel[index].variables = result.recordset;
                        this.revisarFinImportacionVariablesExcel();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionVariablesExcel () {
        if(banderaImportacionVariablesExcelINICIO == banderaImportacionVariablesExcelFIN) {
            this.traerFormas();
        }
    }

    traerFormas () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from FormasVariables", (err, result) => {
                if (err) {
                    console.log(err);
                    this.traerRiesgos();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        arregloDeFormas = result.recordset;
                        this.traerRiesgos();
                    });
                }
            });
        }); // fin transaction
    }

    traerRiesgos () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Riesgos", (err, result) => {
                if (err) {
                    console.log(err);
                    this.getNivelMaximoIndicadores();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        arregloDeRiesgos = result.recordset;
                        this.inicioTraerUmbralesRiesgos();
                    });
                }
            });
        }); // fin transaction
    }

    inicioTraerUmbralesRiesgos () {
        console.log('inicioTraerUmbralesRiesgos');
        banderaImportacionUmbralesRiesgosINICIO = 0;
        banderaImportacionUmbralesRiesgosFIN = 0;
        var entro = false;
        for (var i = 0; i < arregloDeRiesgos.length; i++) {
            entro = true;
            banderaImportacionUmbralesRiesgosFIN++;
            this.traerUmbralesRiesgos(arregloDeRiesgos[i], i);
        };
        if(!entro)
            this.revisarFinImportacionUmbralesRiesgos();
    }

    traerUmbralesRiesgos (riesgo, index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Umbral where variableID = "+riesgo.ID+" and tablaVariable = 'Riesgo'", (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionUmbralesRiesgosINICIO++;
                    this.revisarFinImportacionUmbralesRiesgos();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionUmbralesRiesgosINICIO++;
                        if(result.recordset.length > 0)
                            arregloDeRiesgos[index].umbral = result.recordset[0];
                        this.revisarFinImportacionUmbralesRiesgos();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionUmbralesRiesgos () {
        if(banderaImportacionUmbralesRiesgosINICIO == banderaImportacionUmbralesRiesgosFIN) {
            this.inicioTraerUmbralSeccionesRiesgos();
        }
    }

    inicioTraerUmbralSeccionesRiesgos () {
        console.log('inicioTraerUmbralSeccionesRiesgos');
        banderaImportacionUmbralSeccionesRiesgosINICIO = 0;
        banderaImportacionUmbralSeccionesRiesgosFIN = 0;
        var entro = false;
        for (var i = 0; i < arregloDeRiesgos.length; i++) {
            if(arregloDeRiesgos[i].umbral != undefined) {
                entro = true;
                banderaImportacionUmbralSeccionesRiesgosFIN++;
                this.traerUmbralesSeccionesRiesgos(arregloDeRiesgos[i], i);
            }
        };
        if(!entro)
            this.revisarFinImportacionUmbralSeccionesRiesgos();
    }

    traerUmbralesSeccionesRiesgos (riesgo, index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from SeccionUmbral where umbralID = "+riesgo.umbral.ID, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionUmbralSeccionesRiesgosINICIO++;
                    this.revisarFinImportacionUmbralSeccionesRiesgos();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionUmbralSeccionesRiesgosINICIO++;
                        arregloDeRiesgos[index].umbral.secciones = result.recordset;
                        this.revisarFinImportacionUmbralSeccionesRiesgos();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionUmbralSeccionesRiesgos () {
        if(banderaImportacionUmbralSeccionesRiesgosINICIO == banderaImportacionUmbralSeccionesRiesgosFIN) {
            this.inicioTraerUmbralSeccionesRangoRiesgos();
        }
    }

    inicioTraerUmbralSeccionesRangoRiesgos () {
        console.log('inicioTraerUmbralSeccionesRangoRiesgos');
        banderaImportacionUmbralSeccionesRangoRiesgosINICIO = 0;
        banderaImportacionUmbralSeccionesRangoRiesgosFIN = 0;
        var entro = false;
        for (var i = 0; i < arregloDeRiesgos.length; i++) {
            if(arregloDeRiesgos[i].umbral != undefined) {
                for (var j = 0; j < arregloDeRiesgos[i].umbral.secciones.length; j++) {
                    entro = true;
                    banderaImportacionUmbralSeccionesRangoRiesgosFIN++;
                    this.traerUmbralesSeccionesRangoRiesgos(arregloDeRiesgos[i], arregloDeRiesgos[i].umbral.secciones[j], i, j);
                };
            }
        };
        if(!entro)
            this.revisarFinImportacionUmbralesSeccionesRangoRiesgos();
    }

    traerUmbralesSeccionesRangoRiesgos (indicador, seccion, indexIndicador, indexSeccion) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from RangoSeccionUmbral where umbralID = "+indicador.umbral.ID+" and seccionUmbralID = "+seccion.ID, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionUmbralSeccionesRangoRiesgosINICIO++;
                    this.revisarFinImportacionUmbralesSeccionesRangoRiesgos();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionUmbralSeccionesRangoRiesgosINICIO++;
                        arregloDeRiesgos[indexIndicador].umbral.secciones[indexSeccion].rangos = result.recordset;
                        this.revisarFinImportacionUmbralesSeccionesRangoRiesgos();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionUmbralesSeccionesRangoRiesgos () {
        if(banderaImportacionUmbralSeccionesRangoRiesgosINICIO == banderaImportacionUmbralSeccionesRangoRiesgosFIN) {
            this.traerUmbralesObjetoRiesgos();
        }
    }

    traerUmbralesObjetoRiesgos () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Umbral where tablaVariable = 'Institucional'", (err, result) => {
                if (err) {
                    console.log(err);
                    this.revisarFinImportacionUmbralesObjetoRiesgos();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0)
                            umbralInstitucionalObjeto = result.recordset[0];
                        this.revisarFinImportacionUmbralesObjetoRiesgos();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionUmbralesObjetoRiesgos () {
        if(umbralInstitucionalObjeto.ID != undefined)
            this.inicioTraerUmbralObjetoSeccionesRiesgos();
        else
            this.getNivelMaximoIndicadores();
    }

    inicioTraerUmbralObjetoSeccionesRiesgos () {
        console.log('inicioTraerUmbralObjetoSeccionesRiesgos');
        banderaImportacionUmbralObjetoSeccionesRiesgosINICIO = 0;
        banderaImportacionUmbralObjetoSeccionesRiesgosFIN = 0;
        var entro = false;
        if(umbralInstitucionalObjeto.ID != undefined) {
            entro = true;
            banderaImportacionUmbralObjetoSeccionesRiesgosFIN++;
            this.traerUmbralesObjetoSeccionesRiesgos();
        }
        if(!entro)
            this.revisarFinImportacionUmbralObjetoSeccionesRiesgos();
    }

    traerUmbralesObjetoSeccionesRiesgos () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from SeccionUmbral where umbralID = "+umbralInstitucionalObjeto.ID, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionUmbralObjetoSeccionesRiesgosINICIO++;
                    this.revisarFinImportacionUmbralObjetoSeccionesRiesgos();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionUmbralObjetoSeccionesRiesgosINICIO++;
                        umbralInstitucionalObjeto.secciones = result.recordset;
                        this.revisarFinImportacionUmbralObjetoSeccionesRiesgos();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionUmbralObjetoSeccionesRiesgos () {
        if(banderaImportacionUmbralObjetoSeccionesRiesgosINICIO == banderaImportacionUmbralObjetoSeccionesRiesgosFIN) {
            this.inicioTraerUmbralObjetoSeccionesRangoRiesgos();
        }
    }

    inicioTraerUmbralObjetoSeccionesRangoRiesgos () {
        console.log('inicioTraerUmbralObjetoSeccionesRangoRiesgos');
        banderaImportacionUmbralObjetoSeccionesRangoRiesgosINICIO = 0;
        banderaImportacionUmbralObjetoSeccionesRangoRiesgosFIN = 0;
        var entro = false;
        if(umbralInstitucionalObjeto.ID != undefined) {
            for (var j = 0; j < umbralInstitucionalObjeto.secciones.length; j++) {
                entro = true;
                banderaImportacionUmbralObjetoSeccionesRangoRiesgosFIN++;
                this.traerUmbralesObjetoSeccionesRangoRiesgos(umbralInstitucionalObjeto, umbralInstitucionalObjeto.secciones[j], j);
            };
        }
        if(!entro)
            this.revisarFinImportacionUmbralesObjetoSeccionesRangoRiesgos();
    }

    traerUmbralesObjetoSeccionesRangoRiesgos (indicador, seccion, indexSeccion) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from RangoSeccionUmbral where umbralID = "+indicador.ID+" and seccionUmbralID = "+seccion.ID, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionUmbralObjetoSeccionesRangoRiesgosINICIO++;
                    this.revisarFinImportacionUmbralesObjetoSeccionesRangoRiesgos();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionUmbralObjetoSeccionesRangoRiesgosINICIO++;
                        umbralInstitucionalObjeto.secciones[indexSeccion].rangos = result.recordset;
                        this.revisarFinImportacionUmbralesObjetoSeccionesRangoRiesgos();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionUmbralesObjetoSeccionesRangoRiesgos () {
        if(banderaImportacionUmbralObjetoSeccionesRangoRiesgosINICIO == banderaImportacionUmbralObjetoSeccionesRangoRiesgosFIN) {
            this.getNivelMaximoIndicadores();
        }
    }

    getNivelMaximoIndicadores() {
        nivelMaximoIndicadores = 0;
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select MAX(nivel) AS nivel from IndicadoresCampos", (err, result) => {
                if (err) {
                    console.log(err);
                    this.traerIndicadores();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            nivelMaximoIndicadores = result.recordset[0].nivel;
                        }
                        arregloDeIndicadores = [];
                        this.traerIndicadores();
                    });
                }
            });
        }); // fin transaction
    }

    traerIndicadores() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Indicadores", (err, result) => {
                if (err) {
                    console.log(err);
                    this.getNivelMaximoVariables();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        arregloDeIndicadores = result.recordset;
                        banderaImportacionCamposIndicadoresINICIO = 0;
                        banderaImportacionCamposIndicadoresFIN = arregloDeIndicadores.length;
                        for (var i = 0; i < arregloDeIndicadores.length; i++) {
                            arregloDeIndicadores[i].total = 0;
                            arregloDeIndicadores[i].toleranciaMaxima = 0;
                            arregloDeIndicadores[i].toleranciaMinima = 0;
                            this.traerElementosIndicador(arregloDeIndicadores[i].ID, i);
                            this.traerAtributosIndicadores(arregloDeIndicadores[i].ID, i);
                        };
                        if(arregloDeIndicadores.length == 0) {
                            alert("No existen indicadores");
                            this.getNivelMaximoVariables();
                        }
                    });
                }
            });
        }); // fin transaction
    }

    traerElementosIndicador (indicadorID, index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ElementoIndicador where indicadorID = "+indicadorID, (err, result) => {
                if (err) {
                    console.log(err);
                    this.revisarFinImportacionCamposIndicadores();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        arregloDeIndicadores[index].elementoFormula = result.recordset;
                    });
                }
            });
        }); // fin transaction
    }

    traerAtributosIndicadores (indicadorID, index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from IndicadoresCampos where indicadorID = "+indicadorID, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionCamposIndicadoresINICIO++;
                    this.revisarFinImportacionCamposIndicadores();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionCamposIndicadoresINICIO++;
                        arregloDeIndicadores[index].atributos = result.recordset;
                        this.revisarFinImportacionCamposIndicadores();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionCamposIndicadores () {
        if(banderaImportacionCamposIndicadoresINICIO == banderaImportacionCamposIndicadoresFIN) {
            this.inicioTraerSegmentosDeCamposIndicadores();
        }
    }

    inicioTraerSegmentosDeCamposIndicadores () {
        console.log('inicioTraerSegmentosDeCamposIndicadores');
        banderaImportacionSegmentosCamposIndicadoresINICIO = 0;
        banderaImportacionSegmentosCamposIndicadoresFIN = 0;
        for (var i = 0; i < arregloDeIndicadores.length; i++) {
            for (var j = 0; j < arregloDeIndicadores[i].atributos.length; j++) {
                banderaImportacionSegmentosCamposIndicadoresFIN++;
                this.traerSegmentosDeCamposIndicadores(arregloDeIndicadores[i].ID, arregloDeIndicadores[i].atributos[j].ID, i, j);
            };
        };
        if(banderaImportacionSegmentosCamposIndicadoresFIN == 0) {
            this.inicioTraerUmbralesIndicadores();
            //this.getNivelMaximoVariables();
        }
    }

    traerSegmentosDeCamposIndicadores (indicadorID, indicadorCampoID, i, j) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from SegmentoReglasIndicadores where indicadorID = "+indicadorID+" and indicadorCampoID = "+indicadorCampoID, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionSegmentosCamposIndicadoresINICIO++;
                    this.revisarFinImportacionSegmentosCamposIndicadores();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionSegmentosCamposIndicadoresINICIO++;
                        arregloDeIndicadores[i].atributos[j].segmentoReglas = result.recordset;
                        this.revisarFinImportacionSegmentosCamposIndicadores();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionSegmentosCamposIndicadores () {
        if(banderaImportacionSegmentosCamposIndicadoresINICIO == banderaImportacionSegmentosCamposIndicadoresFIN) {
            this.inicioTraerReglasDeSegmentosIndicadores();
        }
    }

    inicioTraerReglasDeSegmentosIndicadores () {
        console.log('inicioTraerReglasDeSegmentosIndicadores');
        banderaImportacionReglasSegmentosCamposIndicadoresINICIO = 0;
        banderaImportacionReglasSegmentosCamposIndicadoresFIN = 0;
        for (var i = 0; i < arregloDeIndicadores.length; i++) {
            for (var j = 0; j < arregloDeIndicadores[i].atributos.length; j++) {
                for (var k = 0; k < arregloDeIndicadores[i].atributos[j].segmentoReglas.length; k++) {
                    banderaImportacionReglasSegmentosCamposIndicadoresFIN++;
                    this.traerReglasDeSegmentosIndicadores(arregloDeIndicadores[i].ID, arregloDeIndicadores[i].atributos[j].ID, arregloDeIndicadores[i].atributos[j].segmentoReglas[k].ID,  i, j, k);
                };
            };
        };
    }

    traerReglasDeSegmentosIndicadores (indicadorID, indicadorCampoID, segmentoCampoID, i, j, k) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ReglasIndicadores where indicadorID = "+indicadorID+" and indicadorCampoID = "+indicadorCampoID+" and segmentoReglaID = "+segmentoCampoID, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionReglasSegmentosCamposIndicadoresINICIO++;
                    this.revisarFinImportacionReglasSegmentosIndicadores();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionReglasSegmentosCamposIndicadoresINICIO++;
                        arregloDeIndicadores[i].atributos[j].segmentoReglas[k].reglas = result.recordset;
                        this.revisarFinImportacionReglasSegmentosIndicadores();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionReglasSegmentosIndicadores () {
        if(banderaImportacionReglasSegmentosCamposIndicadoresINICIO == banderaImportacionReglasSegmentosCamposIndicadoresFIN) {
            this.inicioTraerFormulasDeCamposIndicadores();
        }
    }

    inicioTraerFormulasDeCamposIndicadores () {
        console.log('inicioTraerFormulasDeCamposIndicadores');
        banderaImportacionFormulasCamposIndicadoresINICIO = 0;
        banderaImportacionFormulasCamposIndicadoresFIN = 0;
        for (var i = 0; i < arregloDeIndicadores.length; i++) {
            for (var j = 0; j < arregloDeIndicadores[i].atributos.length; j++) {
                banderaImportacionFormulasCamposIndicadoresFIN++;
                this.traerFormulasDeCamposIndicadores(arregloDeIndicadores[i].atributos[j].ID, i, j);
            };
        };
    }

    traerFormulasDeCamposIndicadores (indicadorCampoID, i, j) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from FormulasIndicadoresCampos where indicadorID = "+indicadorCampoID, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionFormulasCamposIndicadoresINICIO++;
                    this.revisarFinImportacionFormulasCamposIndicadores();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionFormulasCamposIndicadoresINICIO++;
                        arregloDeIndicadores[i].atributos[j].formulas = result.recordset;
                        this.revisarFinImportacionFormulasCamposIndicadores();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionFormulasCamposIndicadores () {
        if(banderaImportacionFormulasCamposIndicadoresINICIO == banderaImportacionFormulasCamposIndicadoresFIN) {
            this.inicioTraerElementosFormulasDeCamposIndicadores();
        }
    }

    inicioTraerElementosFormulasDeCamposIndicadores () {
        console.log('inicioTraerElementosFormulasDeCamposIndicadores');
        console.log(arregloDeIndicadores);
        console.log('banderaImportacionElementosFormulasCamposIndicadoresINICIO = '+banderaImportacionElementosFormulasCamposIndicadoresINICIO);
        console.log('banderaImportacionElementosFormulasCamposIndicadoresFIN = '+banderaImportacionElementosFormulasCamposIndicadoresFIN);
        banderaImportacionElementosFormulasCamposIndicadoresINICIO = 0;
        banderaImportacionElementosFormulasCamposIndicadoresFIN = 0;
        for (var i = 0; i < arregloDeIndicadores.length; i++) {
            for (var j = 0; j < arregloDeIndicadores[i].atributos.length; j++) {
                for (var k = 0; k < arregloDeIndicadores[i].atributos[j].formulas.length; k++) {
                    banderaImportacionElementosFormulasCamposIndicadoresFIN++;
                    this.traerElementosFormulasDeCamposIndicadores(arregloDeIndicadores[i].atributos[j].formulas[k].ID, i, j, k);
                };
            };
        };
    }

    traerElementosFormulasDeCamposIndicadores (idFormula, i, j, k) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ElementoFormulasIndicadoresCampos where formulaID = "+idFormula, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionElementosFormulasCamposIndicadoresINICIO++;
                    this.revisarFinImportacionElementosFormulasCamposIndicadores();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionElementosFormulasCamposIndicadoresINICIO++;
                        arregloDeIndicadores[i].atributos[j].formulas[k].fuenteDeDatos = result.recordset;
                        this.revisarFinImportacionElementosFormulasCamposIndicadores();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionElementosFormulasCamposIndicadores () {
        if(banderaImportacionElementosFormulasCamposIndicadoresINICIO == banderaImportacionElementosFormulasCamposIndicadoresFIN) {
            this.inicioTraerUmbralesIndicadores();
        }
    }

    inicioTraerUmbralesIndicadores () {
        console.log('inicioTraerUmbralesIndicadores');
        banderaImportacionUmbralesIndicadoresINICIO = 0;
        banderaImportacionUmbralesIndicadoresFIN = 0;
        var entro = false;
        for (var i = 0; i < arregloDeIndicadores.length; i++) {
            entro = true;
            banderaImportacionUmbralesIndicadoresFIN++;
            this.traerUmbralesIndicadores(arregloDeIndicadores[i], i);
        };
        if(!entro)
            this.revisarFinImportacionUmbralesIndicadores();
    }

    traerUmbralesIndicadores (indicador, index) {
        //Riesgo
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Umbral where variableID = "+indicador.ID+" and tablaVariable = 'Indicador'", (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionUmbralesIndicadoresINICIO++;
                    this.revisarFinImportacionUmbralesIndicadores();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionUmbralesIndicadoresINICIO++;
                        if(result.recordset.length > 0)
                            arregloDeIndicadores[index].umbral = result.recordset[0];
                        this.revisarFinImportacionUmbralesIndicadores();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionUmbralesIndicadores () {
        if(banderaImportacionUmbralesIndicadoresINICIO == banderaImportacionUmbralesIndicadoresFIN) {
            this.inicioTraerUmbralSeccionesIndicadores();
        }
    }

    inicioTraerUmbralSeccionesIndicadores () {
        console.log('inicioTraerUmbralSeccionesIndicadores');
        banderaImportacionUmbralSeccionesIndicadoresINICIO = 0;
        banderaImportacionUmbralSeccionesIndicadoresFIN = 0;
        var entro = false;
        for (var i = 0; i < arregloDeIndicadores.length; i++) {
            if(arregloDeIndicadores[i].umbral != undefined) {
                entro = true;
                banderaImportacionUmbralSeccionesIndicadoresFIN++;
                this.traerUmbralesSeccionesIndicadores(arregloDeIndicadores[i], i);
            }
        };
        if(!entro)
            this.revisarFinImportacionUmbralSeccionesIndicadores();
    }

    traerUmbralesSeccionesIndicadores (indicador, index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from SeccionUmbral where umbralID = "+indicador.umbral.ID, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionUmbralSeccionesIndicadoresINICIO++;
                    this.revisarFinImportacionUmbralSeccionesIndicadores();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionUmbralSeccionesIndicadoresINICIO++;
                        arregloDeIndicadores[index].umbral.secciones = result.recordset;
                        this.revisarFinImportacionUmbralSeccionesIndicadores();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionUmbralSeccionesIndicadores () {
        if(banderaImportacionUmbralSeccionesIndicadoresINICIO == banderaImportacionUmbralSeccionesIndicadoresFIN) {
            this.inicioTraerUmbralSeccionesRangoIndicadores();
        }
    }

    inicioTraerUmbralSeccionesRangoIndicadores () {
        console.log('inicioTraerUmbralSeccionesIndicadores');
        banderaImportacionUmbralSeccionesRangoIndicadoresINICIO = 0;
        banderaImportacionUmbralSeccionesRangoIndicadoresFIN = 0;
        var entro = false;
        for (var i = 0; i < arregloDeIndicadores.length; i++) {
            if(arregloDeIndicadores[i].umbral != undefined) {
                for (var j = 0; j < arregloDeIndicadores[i].umbral.secciones.length; j++) {
                    entro = true;
                    banderaImportacionUmbralSeccionesRangoIndicadoresFIN++;
                    this.traerUmbralesSeccionesRangoIndicadores(arregloDeIndicadores[i], arregloDeIndicadores[i].umbral.secciones[j], i, j);
                };
            }
        };
        if(!entro)
            this.revisarFinImportacionUmbralesSeccionesRangoIndicadores();
    }

    traerUmbralesSeccionesRangoIndicadores (indicador, seccion, indexIndicador, indexSeccion) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from RangoSeccionUmbral where umbralID = "+indicador.umbral.ID+" and seccionUmbralID = "+seccion.ID, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionUmbralSeccionesRangoIndicadoresINICIO++;
                    this.revisarFinImportacionUmbralesSeccionesRangoIndicadores();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionUmbralSeccionesRangoIndicadoresINICIO++;
                        arregloDeIndicadores[indexIndicador].umbral.secciones[indexSeccion].rangos = result.recordset;
                        this.revisarFinImportacionUmbralesSeccionesRangoIndicadores();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionUmbralesSeccionesRangoIndicadores () {
        if(banderaImportacionUmbralSeccionesRangoIndicadoresINICIO == banderaImportacionUmbralSeccionesRangoIndicadoresFIN) {
            this.getNivelMaximoVariables();
        }
    }

    getNivelMaximoVariables() {
        nivelMaximoVariables = 0;
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select MAX(nivel) AS nivel from VariablesCampos", (err, result) => {
                if (err) {
                    console.log(err);
                    this.traerVariables();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            nivelMaximoVariables = result.recordset[0].nivel;
                        }
                        arregloDeVariables = [];
                        this.traerVariables();
                    });
                }
            });
        }); // fin transaction
    }

    traerVariables() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Variables", (err, result) => {
                if (err) {
                    console.log(err);
                    this.iniciarCalculoExcel();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        arregloDeVariables = result.recordset;
                        banderaImportacionCamposVariablesINICIO = 0;
                        banderaImportacionCamposVariablesFIN = arregloDeVariables.length;
                        for (var i = 0; i < arregloDeVariables.length; i++) {
                            if(arregloDeVariables[i].esInstruccionSQL) {
                                this.traerInstruccionSQLCampos(arregloDeVariables[i], i);
                            } else {
                                this.traerAtributosVariables(arregloDeVariables[i].ID, i);
                            }
                        };
                        if(arregloDeVariables.length == 0) {
                            alert("No existen variables");
                            this.iniciarCalculoExcel();
                        }
                    });
                }
            });
        }); // fin transaction
    }

    traerInstruccionSQLCampos (variable, index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from InstruccionSQLCampos where variableID = "+variable.ID, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionCamposVariablesINICIO++;
                    this.revisarFinImportacionCamposVariables();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        arregloDeVariables[index].atributos = result.recordset;
                        this.traerInstruccionSQL(variable, index);
                    });
                }
            });
        }); // fin transaction
    }

    traerInstruccionSQL (variable, index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from InstruccionSQL where variableID = "+variable.ID, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionCamposVariablesINICIO++;
                    this.revisarFinImportacionCamposVariables();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionCamposVariablesINICIO++;
                        arregloDeVariables[index].instruccionSQL = result.recordset[0];
                        this.revisarFinImportacionCamposVariables();
                    });
                }
            });
        }); // fin transaction
    }

    traerAtributosVariables (variableID, index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from VariablesCampos where variableID = "+variableID, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionCamposVariablesINICIO++;
                    this.revisarFinImportacionCamposVariables();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionCamposVariablesINICIO++;
                        arregloDeVariables[index].atributos = result.recordset;
                        this.revisarFinImportacionCamposVariables();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionCamposVariables () {
        if(banderaImportacionCamposVariablesINICIO == banderaImportacionCamposVariablesFIN) {
            this.inicioTraerSegmentosDeCamposVariables();
        }
    }

    inicioTraerSegmentosDeCamposVariables () {
        console.log('inicioTraerSegmentosDeCamposVariables');
        banderaImportacionSegmentosCamposVariablesINICIO = 0;
        banderaImportacionSegmentosCamposVariablesFIN = 0;
        for (var i = 0; i < arregloDeVariables.length; i++) {
            for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
                banderaImportacionSegmentosCamposVariablesFIN++;
                this.traerSegmentosDeCamposVariables(arregloDeVariables[i].ID, arregloDeVariables[i].atributos[j].ID, i, j);
            };
        };
    }

    traerSegmentosDeCamposVariables (variableID, variableCampoID, i, j) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from SegmentoReglasVariables where variableID = "+variableID+" and variableCampoID = "+variableCampoID, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionSegmentosCamposVariablesINICIO++;
                    this.revisarFinImportacionSegmentosCamposVariables();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionSegmentosCamposVariablesINICIO++;
                        arregloDeVariables[i].atributos[j].segmentoReglas = result.recordset;
                        this.revisarFinImportacionSegmentosCamposVariables();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionSegmentosCamposVariables () {
        if(banderaImportacionSegmentosCamposVariablesINICIO == banderaImportacionSegmentosCamposVariablesFIN) {
            this.inicioTraerReglasDeSegmentosVariables();
        }
    }

    inicioTraerReglasDeSegmentosVariables () {
        console.log('inicioTraerReglasDeSegmentosVariables');
        banderaImportacionReglasSegmentosCamposVariablesINICIO = 0;
        banderaImportacionReglasSegmentosCamposVariablesFIN = 0;
        for (var i = 0; i < arregloDeVariables.length; i++) {
            for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
                for (var k = 0; k < arregloDeVariables[i].atributos[j].segmentoReglas.length; k++) {
                    banderaImportacionReglasSegmentosCamposVariablesFIN++;
                    this.traerReglasDeSegmentosVariables(arregloDeVariables[i].ID, arregloDeVariables[i].atributos[j].ID, arregloDeVariables[i].atributos[j].segmentoReglas[k].ID,  i, j, k);
                };
            };
        };
        if(banderaImportacionReglasSegmentosCamposVariablesFIN == 0) {
            this.iniciarCalculoExcel();
        }
    }

    traerReglasDeSegmentosVariables (variableID, variableCampoID, segmentoCampoID, i, j, k) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ReglasVariables where variableID = "+variableID+" and variableCampoID = "+variableCampoID+" and segmentoReglaID = "+segmentoCampoID, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionReglasSegmentosCamposVariablesINICIO++;
                    this.revisarFinImportacionReglasSegmentosVariables();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionReglasSegmentosCamposVariablesINICIO++;
                        arregloDeVariables[i].atributos[j].segmentoReglas[k].reglas = result.recordset;
                        this.revisarFinImportacionReglasSegmentosVariables();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionReglasSegmentosVariables () {
        if(banderaImportacionReglasSegmentosCamposVariablesINICIO == banderaImportacionReglasSegmentosCamposVariablesFIN) {
            this.inicioTraerFormulasDeCamposVariables();
        }
    }

    inicioTraerFormulasDeCamposVariables () {
        console.log('inicioTraerFormulasDeCamposVariables');
        banderaImportacionFormulasCamposVariablesINICIO = 0;
        banderaImportacionFormulasCamposVariablesFIN = 0;
        for (var i = 0; i < arregloDeVariables.length; i++) {
            for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
                banderaImportacionFormulasCamposVariablesFIN++;
                this.traerFormulasDeCamposVariables(arregloDeVariables[i].atributos[j].ID, i, j);
            };
        };
    }

    traerFormulasDeCamposVariables (variableCampoID, i, j) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from FormulasVariablesCampos where variableCampoID = "+variableCampoID, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionFormulasCamposVariablesINICIO++;
                    this.revisarFinImportacionFormulasCamposVariables();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionFormulasCamposVariablesINICIO++;
                        arregloDeVariables[i].atributos[j].formulas = result.recordset;
                        this.revisarFinImportacionFormulasCamposVariables();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionFormulasCamposVariables () {
        if(banderaImportacionFormulasCamposVariablesINICIO == banderaImportacionFormulasCamposVariablesFIN) {
            this.inicioTraerElementosFormulasDeCamposVariables();
        }
    }

    inicioTraerElementosFormulasDeCamposVariables () {
        console.log('inicioTraerElementosFormulasDeCamposVariables');
        banderaImportacionElementosFormulasCamposVariablesINICIO = 0;
        banderaImportacionElementosFormulasCamposVariablesFIN = 0;
        for (var i = 0; i < arregloDeVariables.length; i++) {
            for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
                for (var k = 0; k < arregloDeVariables[i].atributos[j].formulas.length; k++) {
                    banderaImportacionElementosFormulasCamposVariablesFIN++;
                    this.traerElementosFormulasDeCamposVariables(arregloDeVariables[i].atributos[j].formulas[k].ID, i, j, k);
                };
            };
        };
    }

    traerElementosFormulasDeCamposVariables (idFormula, i, j, k) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ElementoFormulasVariablesCampos where formulaID = "+idFormula, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionElementosFormulasCamposVariablesINICIO++;
                    this.revisarFinImportacionElementosFormulasCamposVariables();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionElementosFormulasCamposVariablesINICIO++;
                        arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos = result.recordset;
                        this.revisarFinImportacionElementosFormulasCamposVariables();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionElementosFormulasCamposVariables () {
        if(banderaImportacionElementosFormulasCamposVariablesINICIO == banderaImportacionElementosFormulasCamposVariablesFIN) {
            this.inicioTraerConeccionesATablas();
        }
    }

    inicioTraerConeccionesATablas () {
        console.log('inicioTraerConeccionesATablas');
        banderaImportacionConecionesATablasINICIO = 0;
        banderaImportacionConecionesATablasFIN = 0;
        arregloConexionesATablas = [];
        for (var i = 0; i < arregloDeVariables.length; i++) {
            for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
                for (var k = 0; k < arregloDeVariables[i].atributos[j].segmentoReglas.length; k++) {
                    if(arregloDeVariables[i].atributos[j].segmentoReglas[k].esConexionTabla && this.noHaSidoImportadaConeccion(arregloDeVariables[i].atributos[j].segmentoReglas[k])) {
                        banderaImportacionConecionesATablasFIN++;
                        //para asegurar que ID no sea asyncrono
                        arregloConexionesATablas.push({ID: arregloDeVariables[i].atributos[j].segmentoReglas[k].conexionTablaID});
                        //arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos[l]
                        this.traerConeccionesATablas(arregloDeVariables[i].atributos[j].segmentoReglas[k].conexionTablaID, arregloConexionesATablas.length-1);
                    }
                };
            };
        };
        if(banderaImportacionConecionesATablasFIN == 0) {
            //this.iniciarCalculoExcel();
            this.verificarPeriodicidad();
        }
    }

    noHaSidoImportadaConeccion (segmento) {
        for (var i = 0; i < arregloConexionesATablas.length; i++) {
            if(arregloConexionesATablas[i].ID == segmento.conexionTablaID) {
                return false;
            }
        };
        return true;
    }

    traerConeccionesATablas (tablaID, indexARemplazar) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Tablas where ID = "+tablaID, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportacionConecionesATablasINICIO++;
                    this.finTraerConeccionesATablas();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionConecionesATablasINICIO++;
                        if(result.recordset.length > 0)
                            arregloConexionesATablas[indexARemplazar] = result.recordset[0];
                        this.finTraerConeccionesATablas();
                    });
                }
            });
        }); // fin transaction
    }

    finTraerConeccionesATablas () {
        if(banderaImportacionConecionesATablasINICIO == banderaImportacionConecionesATablasFIN) {
            this.inicioTraerResultadosDeFuenteDeDatos();
        }
    }

    inicioTraerResultadosDeFuenteDeDatos () {
        console.log('inicioTraerResultadosDeFuenteDeDatos');
        banderaImportacionValoresDeTablasDeFuenteDeDatosINICIO = 0;
        banderaImportacionValoresDeTablasDeFuenteDeDatosFIN = 0;
        arregloResultadosDeTablas = [];
        for (var i = 0; i < arregloConexionesATablas.length; i++) {
            banderaImportacionValoresDeTablasDeFuenteDeDatosFIN++;
            this.traerResultadosDeFuenteDeDatos(arregloConexionesATablas[i], i);
        };
    }

    traerResultadosDeFuenteDeDatos (tabla, index) {
        const pool = new sql.ConnectionPool({
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
        pool.connect(err => {
            pool.request().query("select * from "+tabla.tabla, (err, result) => {
                banderaImportacionValoresDeTablasDeFuenteDeDatosINICIO++;
                console.log('resultados tabla: '+tabla.tabla);
                console.log(result.recordset);
                if(result.recordset != undefined && result.recordset.length > 0)
                    arregloResultadosDeTablas.splice(index, 0, result.recordset);
                this.finTraerResultadosDeFuenteDeDatos();
            });
        }); // fin pool connect
    }

    finTraerResultadosDeFuenteDeDatos () {
        console.log('verificarPeriodicidad');
        if(banderaImportacionValoresDeTablasDeFuenteDeDatosINICIO == banderaImportacionValoresDeTablasDeFuenteDeDatosFIN) {
            this.verificarPeriodicidad();
            //this.iniciarCalculoExcel();
        }
    }

    verificarPeriodicidad () {
        banderaVerificarPeriodicidadINICIO = 0;
        banderaVerificarPeriodicidadFIN = 0;
        for (var i = 0; i < arregloDeExcel.length; i++) {
            for (var j = 0; j < arregloDeExcel[i].variables.length; j++) {
                banderaVerificarPeriodicidadFIN++;
                this.traerPeriodicidadVariable(arregloDeExcel[i].variables[j], "excel", arregloDeExcel, i, j);
            };
        };
        for (var i = 0; i < arregloDeFormas.length; i++) {
            banderaVerificarPeriodicidadFIN++;
            this.traerPeriodicidadVariable(arregloDeFormas[i], "forma", arregloDeFormas, i, null);
        };
        for (var i = 0; i < arregloDeVariables.length; i++) {
            banderaVerificarPeriodicidadFIN++;
            this.traerPeriodicidadVariable(arregloDeVariables[i], "variable", arregloDeVariables, i, null);
        };
        for (var i = 0; i < arregloDeIndicadores.length; i++) {
            banderaVerificarPeriodicidadFIN++;
            this.traerPeriodicidadVariable(arregloDeIndicadores[i], "indicador", arregloDeIndicadores, i, null);
        };
    }

    addDays (fecha, days) {
        var date = new Date(fecha);
        date.setDate(date.getDate() + days);
        return date;
    }

    addMonths (fecha, months) {
        var date = new Date(fecha);
        date.setMonth(date.getMonth() + months);
        return date;
    }

    addYears (fecha, years) {
        var date = new Date(fecha);
        date.setYear(date.getYear() + years);
        return date;
    }

    minusDays (fecha, days) {
        var date = new Date(fecha);
        if(date.getDate() >= days) {
            date.setDate(date.getDate() - days);
        } else {
            date.setDate(days - date.getDate());
        }
        return date;
    }

    minusMonths (fecha, months) {
        var date = new Date(fecha);
        if(date.getMonth() >= months) {
            date.setMonth(date.getMonth() - months);
        } else {
            date.setMonth(months - date.getMonth());
        }
        return date;
    }

    minusYears (fecha, years) {
        var date = new Date(fecha);
        if(date.getFullYear() >= years) {
            date.setYear(date.getFullYear() - years);
        } else {
            date.setYear(years - date.getFullYear());
        }
        return date;
    }

    traerPeriodicidadVariable (variable, tabla, arreglo, indexI, indexJ) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from PeriodicidadCalculo where variableID = "+variable.ID+" and tablaVariable = '"+tabla+"'", (err, result) => {
                if (err) {
                    console.log(err);
                    this.verificarFinPeriodicidad();
                    banderaVerificarPeriodicidadINICIO++;
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            var fechaInicioCalculo = variable.fechaInicioCalculo;
                            var fechaUltimoCalculo = result.recordset[0].fechaUltimoCalculo;
                            var tieneUltimoCalculo = false;
                            //si la fecha es null, realizar calculo (28, 4, 1964) POPS BIRTHDAY
                            if(fechaUltimoCalculo.getFullYear() != 1964 && fechaUltimoCalculo.getMonth() != 4 && fechaUltimoCalculo.getDate() != 28) {
                                tieneUltimoCalculo = true;
                            }
                            if(!tieneUltimoCalculo) {
                                if(indexJ != null)
                                    arreglo[indexI].variables[indexJ].realizarCalculo = true;
                                else
                                    arreglo[indexI].realizarCalculo = true;
                            } else {
                                var ultimoCalculoVigente = false;
                                var periodicidad = variable.periodicidad;
                                var fechaSiguienteCalculo = new Date(fechaInicioCalculo);
                                while(fechaSiguienteCalculo.getFullYear() < fechaUltimoCalculo.getFullYear() && fechaSiguienteCalculo.getMonth() < fechaUltimoCalculo.getMonth() && fechaSiguienteCalculo.getDate() < fechaUltimoCalculo.getDate()) {
                                    if(periodicidad.localeCompare("diario") == 0) {
                                        fechaSiguienteCalculo = this.addDays(fechaSiguienteCalculo, 1);
                                    } else if(periodicidad.localeCompare("semanal") == 0) {
                                        fechaSiguienteCalculo = this.addDays(fechaSiguienteCalculo, 7);
                                    } else if(periodicidad.localeCompare("mensual") == 0) {
                                        fechaSiguienteCalculo = this.addMonths(fechaSiguienteCalculo, 1);
                                    } else if(periodicidad.localeCompare("trimestral") == 0) {
                                        fechaSiguienteCalculo = this.addMonths(fechaSiguienteCalculo, 3);
                                    } else if(periodicidad.localeCompare("bi-anual") == 0) {
                                        fechaSiguienteCalculo = this.addMonths(fechaSiguienteCalculo, 6);
                                    } else if(periodicidad.localeCompare("anual") == 0) {
                                        fechaSiguienteCalculo = this.addYears(fechaSiguienteCalculo, 1);
                                    }
                                }
                                var tocaNuevoCalculo = false;
                                if(periodicidad.localeCompare("diario") == 0) {
                                    if(fechaSiguienteCalculo.getDate() >= fechaUltimoCalculo.getDate()+1) {
                                        tocaNuevoCalculo = true;
                                    }
                                } else if(periodicidad.localeCompare("semanal") == 0) {
                                    if(fechaSiguienteCalculo.getDate() >= fechaUltimoCalculo.getDate()+7) {
                                        tocaNuevoCalculo = true;
                                    }
                                } else if(periodicidad.localeCompare("mensual") == 0) {
                                    if(fechaSiguienteCalculo.getMonth() >= fechaUltimoCalculo.getMonth()+1) {
                                        tocaNuevoCalculo = true;
                                    }
                                } else if(periodicidad.localeCompare("trimestral") == 0) {
                                    if(fechaSiguienteCalculo.getMonth() >= fechaUltimoCalculo.getMonth()+3) {
                                        tocaNuevoCalculo = true;
                                    }
                                } else if(periodicidad.localeCompare("bi-anual") == 0) {
                                    if(fechaSiguienteCalculo.getMonth() >= fechaUltimoCalculo.getMonth()+6) {
                                        tocaNuevoCalculo = true;
                                    }
                                } else if(periodicidad.localeCompare("anual") == 0) {
                                    if(fechaSiguienteCalculo.getFullYear() >= fechaUltimoCalculo.getFullYear()+1) {
                                        tocaNuevoCalculo = true;
                                    }
                                }
                                if(tocaNuevoCalculo) {
                                    if(indexJ != null)
                                        arreglo[indexI].variables[indexJ].realizarCalculo = true;
                                    else
                                        arreglo[indexI].realizarCalculo = true;
                                } else {
                                    if(indexJ != null)
                                        arreglo[indexI].variables[indexJ].realizarCalculo = false;
                                    else
                                        arreglo[indexI].realizarCalculo = false;
                                }
                            }
                        } else {
                            if(indexJ != null)
                                arreglo[indexI].variables[indexJ].realizarCalculo = true;
                            else
                                arreglo[indexI].realizarCalculo = true;
                        }
                        banderaVerificarPeriodicidadINICIO++;
                        this.verificarFinPeriodicidad();
                    });
                }
            });
        }); // fin transaction
    }

    verificarFinPeriodicidad () {
        console.log('verificarFinPeriodicidad');
        if(banderaVerificarPeriodicidadINICIO == banderaVerificarPeriodicidadFIN) {
            this.iniciarImportacionValoresCalculados();
        }
    }

    iniciarImportacionValoresCalculados () {
        console.log('iniciarImportacionValoresCalculados');
        banderaImportarValoresPeriodicidadINICIO = 0;
        banderaImportarValoresPeriodicidadFIN = 0;
        for (var i = 0; i < arregloDeExcel.length; i++) {
            for (var j = 0; j < arregloDeExcel[i].variables.length; j++) {
                if(!arregloDeExcel[i].variables[j].realizarCalculo) {
                    banderaImportarValoresPeriodicidadFIN++;
                    this.getResultsVariables(arregloDeExcel[i].variables[j], "excel", arregloDeExcel, i, j);
                }
            };
        };
        for (var i = 0; i < arregloDeFormas.length; i++) {
            if(!arregloDeFormas[i].realizarCalculo) {
                banderaImportarValoresPeriodicidadFIN++;
                this.getResultsVariables(arregloDeFormas[i], "forma", arregloDeFormas, i);
            }
        };
        for (var i = 0; i < arregloDeVariables.length; i++) {
            if(!arregloDeVariables[i].realizarCalculo) {
                banderaImportarValoresPeriodicidadFIN++;
                this.getResultsVariables(arregloDeVariables[i], "variable", arregloDeVariables, i);
            }
        };
        for (var i = 0; i < arregloDeIndicadores.length; i++) {
            if(!arregloDeIndicadores[i].realizarCalculo) {
                banderaImportarValoresPeriodicidadFIN++;
                this.getResultsIndicators(arregloDeIndicadores[i], i);
            }
        };
        if(banderaImportarValoresPeriodicidadFIN == 0) {
            this.verificarFinImportacionValoresCalculados();
        }
    }

    getResultsVariables (variable, tabla) {
        //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ResultadosNombreVariables where nombreVariable = '"+variable.nombre+"' and finVigencia = '1964-05-28'", (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportarValoresPeriodicidadINICIO++;
                    this.verificarFinImportacionValoresCalculados();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                        return [];
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length == 0)
                            banderaImportarValoresPeriodicidadINICIO++;
                        this.getResultsVariablesFieldsInit(result.recordset, variable, tabla);
                    });
                }
            });
        }); // fin transaction
    }

    getResultsVariablesFieldsInit (resultados, variable, tabla) {
        var arregloTemp = [];
        for (var i = 0; i < resultados.length; i++) {
            arregloTemp.push(resultados[i]);
            this.getFieldResults(resultados[i], variable, tabla);
        };
        if(resultados.length == 0) {
            this.verificarFinImportacionValoresCalculados();
        }
    }

    getFieldResults(resultado, variable, tabla) {
        var textoSelect = '';
        var textoGroupBy = ' group by ID';
        if(tabla.localeCompare("excel") == 0) {
            textoSelect += ' ID, '+variable.nombre;
            textoGroupBy += ', ' + variable.nombre;
        } else if(tabla.localeCompare("variable") == 0) {
            for (var i = 0; i < variable.atributos.length; i++) {
                if(i > 0)
                    textoSelect += ', ';
                else
                    textoSelect += ' ID, ';
                textoSelect += variable.atributos[i].nombre;
                textoGroupBy += ', ' + variable.atributos[i].nombre;
            };
        } else {
            textoSelect += ' ID, '+ variable.nombre;
            textoGroupBy += ', ' + variable.nombre;
        }
        if(textoSelect.length > 0)
            textoSelect += ', ';
        textoSelect += ' max(f3ch4Gu4rd4do) as f3ch4Gu4rd4do';
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select "+textoSelect+" from "+resultado.nombreVariable+'_'+resultado.inicioVigencia.getFullYear()+'_'+(resultado.inicioVigencia.getMonth()+1)+'_'+resultado.inicioVigencia.getDate()+'_'+resultado.inicioVigencia.getHours()+'_'+resultado.inicioVigencia.getMinutes()+'_'+resultado.inicioVigencia.getSeconds()+textoGroupBy, (err, result) => {
                if (err) {
                    banderaImportarValoresPeriodicidadINICIO++;
                    this.verificarFinImportacionValoresCalculados();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            if(tabla.localeCompare("excel") == 0 || tabla.localeCompare("forma") == 0) {
                                window[variable.nombre] = result.recordset[result.recordset.length-1][variable.nombre];
                            } else if(tabla.localeCompare("variable") == 0) {
                                if(variable.esInstruccionSQL || variable.esColeccion) {
                                    window[variable.nombre] = result.recordset[result.recordset.length-1];
                                } else {
                                    window[variable.nombre] = result.recordset[result.recordset.length-1][variable.nombre];
                                }
                            }
                        } else {
                            if(tabla.localeCompare("excel") == 0) {
                                arregloDeErroresExcel.push({nombre: variable.nombre });
                            } else if(tabla.localeCompare("forma") == 0) {
                                //arregloDeErroresExcel.push({nombre: variable.nombre });
                            } else if(tabla.localeCompare("variable") == 0) {
                                //arregloDeErroresExcel.push({nombre: variable.nombre });
                            }
                        }
                        banderaImportarValoresPeriodicidadINICIO++;
                        this.verificarFinImportacionValoresCalculados();
                    });
                }
            });
        }); // fin transaction
    }

    getResultsIndicators (indicador, index) {
        //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ResultadosNombreIndicadores where nombreIndicador = '"+indicador.nombre+"' and finVigencia = '1964-05-28'", (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportarValoresPeriodicidadINICIO++;
                    this.verificarFinImportacionValoresCalculados();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                        return [];
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length == 0)
                            banderaImportarValoresPeriodicidadINICIO++;
                        this.getResultsIndicatorsFieldsInit(result.recordset, indicador, index);
                    });
                }
            });
        }); // fin transaction
    }

    getResultsIndicatorsFieldsInit (resultados, indicador, index) {
        console.log('getResultsIndicatorsFieldsInit');
        var arregloTemp = [];
        for (var i = 0; i < resultados.length; i++) {
            arregloTemp.push(resultados[i]);
            this.getFieldIndicatorsResults(resultados[i], indicador, index);
        };
        if(resultados.length == 0) {
            this.verificarFinImportacionValoresCalculados();
        }
    }

    getFieldIndicatorsResults(resultado, indicador, index) {
        var textoSelect = '';
        var textoGroupBy = ' group by ID';
        for (var i = 0; i < indicador.atributos.length; i++) {
            if(i > 0)
                textoSelect += ', ';
            textoSelect += indicador.atributos[i];
            textoGroupBy += ', ' + indicador.atributos[i];
        };
        if(textoSelect.length > 0)
            textoSelect += ', ';
        textoSelect += ' max(f3ch4Gu4rd4do) as f3ch4Gu4rd4do';
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select "+textoSelect+" from "+resultado.nombreVariable+'_'+resultado.inicioVigencia.getFullYear()+'_'+(resultado.inicioVigencia.getMonth()+1)+'_'+resultado.inicioVigencia.getDate()+'_'+resultado.inicioVigencia.getHours()+'_'+resultado.inicioVigencia.getMinutes()+'_'+resultado.inicioVigencia.getSeconds()+textoGroupBy, (err, result) => {
                if (err) {
                    console.log(err);
                    banderaImportarValoresPeriodicidadINICIO++;
                    this.verificarFinImportacionValoresCalculados();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            //window[indicador.nombre] = result.recordset[0];
                            arregloDeIndicadores[index] = result.recordset[0];
                        } else {
                            //
                        }
                        banderaImportarValoresPeriodicidadINICIO++;
                        this.verificarFinImportacionValoresCalculados();
                    });
                }
            });
        }); // fin transaction
    }

    verificarFinImportacionValoresCalculados () {
        console.log('verificarFinImportacionValoresCalculados');
        if(banderaImportarValoresPeriodicidadINICIO == banderaImportarValoresPeriodicidadFIN) {
            this.iniciarCalculoExcel();
        }
    }

    iniciarCalculoExcel () {
        if(arregloDeExcel.length > 0) {
            this.crearVariablesExcel();
        }
        this.iniciarCalculoFormas();
    }

    iniciarCalculoFormas () {
        if(arregloDeFormas.length > 0) {
            this.iniciarMostrarFormas();
        }
        if(arregloDeFormas.length == 0) {
            this.iniciarHilo();
        }
    }

    iniciarHilo () {
        /*console.log('nivelMaximoVariables');
        console.log(nivelMaximoVariables);
        console.log('arregloDeFuentesDeDatos');
        console.log(arregloDeFuentesDeDatos);
        console.log('arregloDeVariables');
        console.log(arregloDeVariables);
        console.log('arregloDeExcel');
        console.log(arregloDeExcel);
        console.log('arregloResultadosDeTablas');
        console.log(arregloResultadosDeTablas);
        console.log('arregloConexionesATablas');
        console.log(arregloConexionesATablas);*/
        //DESCRIPCION DEL PROCEDIMIENTO
        //1) PRIMERO CREAR CODIGO PARA CREAR VARIABLES DE ELEMENTOS DE FORMULAS, AGRUPADAS POR TABLAS CORRESPONDIENTES  -- SERA PRIMER METODO A LLAMAR
        //2) CREAR METODO NIVEL XX, CONTENDRA LLAMADO A METODO 'CALCULO VARIABLES NIVEL XX', Y JUSTO DESPUES LLAMARÁ AL SIGUIENTE NIVEL QUE SIGUE, O AL METODO DE MENSAJE FINAL
        //3) CREAR CODIGO 'CALCULO VARIABLES NIVEL XX'

        //AGRUPANDO ELEMENTOS DE FORMULA POR CONEXION A TABLA
        var arregloAgrupacionElementosFormulaPorConexionATablaVariables = [];    //arreglo que contiene los segmento de reglas agrupados por el arreglo de tablas
        //la variable es insertado una unica vez cada por cada segmento de regla que pertenezca a la tabla
        var arregloAgrupacionElementosFormulaPorVariablesVariables = [];    //arreglo que contiene los segmento de reglas de la variable a calcular agrupados por la posicion de la variable a comparar en el arregloDeVariables
        //la variable es insertado una unica vez cada por cada segmento de regla que pertenezca a la tabla
        var arregloAgrupacionElementosFormulaPorExcelVariables = [];    //arreglo que contiene los segmento de reglas de la variable excel a calcular agrupados por la posicion de la variable a comparar en el arregloDeVariables
        //la variable es insertado una unica vez cada por cada segmento de regla que pertenezca a la tabla
        var arregloAgrupacionElementosFormulaPorFormasVariables = [];    //arreglo que contiene los segmento de reglas de la variable forma a calcular agrupados por la posicion de la variable a comparar en el arregloDeVariables
        //la variable es insertado una unica vez cada por cada segmento de regla que pertenezca a la tabla
        var arregloAgrupacionElementosFormulaPorManualVariables = [];
        for (var i = 0; i < arregloDeVariables.length; i++) {
            for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
                for (var k = 0; k < arregloDeVariables[i].atributos[j].segmentoReglas.length; k++) {
                    if (arregloDeVariables[i].atributos[j].segmentoReglas[k].esConexionTabla) {
                        for (var m = 0; m < arregloConexionesATablas.length; m++) {
                            if (arregloDeVariables[i].atributos[j].segmentoReglas[k].conexionTablaID == arregloConexionesATablas[m].ID) {
                                if(arregloAgrupacionElementosFormulaPorConexionATablaVariables[m] == undefined)
                                    arregloAgrupacionElementosFormulaPorConexionATablaVariables[m] = [];
                                arregloAgrupacionElementosFormulaPorConexionATablaVariables[m].push({segmentoRegla: arregloDeVariables[i].atributos[j].segmentoReglas[k], variable: arregloDeVariables[i], atributo: arregloDeVariables[i].atributos[j], index: k});
                                break;
                            }
                        };
                    } else if (arregloDeVariables[i].atributos[j].segmentoReglas[k].excelArchivoID != -1 && arregloDeVariables[i].atributos[j].segmentoReglas[k].formaVariableID == -1 && arregloDeVariables[i].atributos[j].segmentoReglas[k].variableIDCreacionCodigo == -1) {
                        for (var x = 0; x < arregloDeExcel.length; x++) {
                            if(arregloDeVariables[i].atributos[j].segmentoReglas[k].excelArchivoID == arregloDeExcel[x].ID) {
                                if(arregloAgrupacionElementosFormulaPorExcelVariables[x] == undefined)
                                    arregloAgrupacionElementosFormulaPorExcelVariables[x] = [];
                                for (var y = 0; y < arregloDeExcel[x].variables.length; y++) {
                                    if(arregloDeVariables[i].atributos[j].segmentoReglas[k].excelVariableID == arregloDeExcel[x].variables[y].ID) {
                                        if(arregloAgrupacionElementosFormulaPorExcelVariables[x][y] == undefined)
                                            arregloAgrupacionElementosFormulaPorExcelVariables[x][y] = [];
                                        arregloAgrupacionElementosFormulaPorExcelVariables[x][y].push({segmentoRegla: arregloDeVariables[i].atributos[j].segmentoReglas[k], variable: arregloDeVariables[i], variableCreacionCodigo: arregloDeExcel[x].variables[y], atributo: arregloDeVariables[i].atributos[j], index: k});
                                        break;
                                    }
                                };
                            }
                        };
                    } else if (arregloDeVariables[i].atributos[j].segmentoReglas[k].formaVariableID != -1 && arregloDeVariables[i].atributos[j].segmentoReglas[k].excelArchivoID == -1 && arregloDeVariables[i].atributos[j].segmentoReglas[k].variableIDCreacionCodigo == -1) {
                        for (var x = 0; x < arregloDeFormas.length; x++) {
                            if(arregloDeVariables[i].atributos[j].segmentoReglas[k].formaVariableID == arregloDeFormas[x].ID) {
                                if(arregloAgrupacionElementosFormulaPorFormasVariables[x] == undefined)
                                    arregloAgrupacionElementosFormulaPorFormasVariables[x] = [];
                                arregloAgrupacionElementosFormulaPorFormasVariables[x].push({segmentoRegla: arregloDeVariables[i].atributos[j].segmentoReglas[k], variable: arregloDeVariables[i], variableCreacionCodigo: arregloDeFormas[x], atributo: arregloDeVariables[i].atributos[j], index: k});
                                break;
                            }
                        };
                    } else if (arregloDeVariables[i].atributos[j].segmentoReglas[k].esValorManual && arregloDeVariables[i].atributos[j].segmentoReglas[k].formaVariableID == -1 && arregloDeVariables[i].atributos[j].segmentoReglas[k].excelArchivoID == -1 && arregloDeVariables[i].atributos[j].segmentoReglas[k].variableIDCreacionCodigo == -1) {
                        if(arregloAgrupacionElementosFormulaPorManualVariables[i] == undefined)
                            arregloAgrupacionElementosFormulaPorManualVariables[i] = [];
                        arregloAgrupacionElementosFormulaPorManualVariables[i].push({segmentoRegla: arregloDeVariables[i].atributos[j].segmentoReglas[k], variable: arregloDeVariables[i], variableCreacionCodigo: arregloDeVariables[i], atributo: arregloDeVariables[i].atributos[j], index: k});
                    } else {
                        for (var x = 0; x < arregloDeVariables.length; x++) {
                            if(arregloDeVariables[i].atributos[j].segmentoReglas[k].variableIDCreacionCodigo == arregloDeVariables[x].ID) {
                                if(arregloAgrupacionElementosFormulaPorVariablesVariables[x] == undefined)
                                    arregloAgrupacionElementosFormulaPorVariablesVariables[x] = [];
                                arregloAgrupacionElementosFormulaPorVariablesVariables[x].push({segmentoRegla: arregloDeVariables[i].atributos[j].segmentoReglas[k], variable: arregloDeVariables[i], variableCreacionCodigo: arregloDeVariables[x], atributo: arregloDeVariables[i].atributos[j], index: k});
                                break;
                            }
                        };
                    }
                };
            };
        };
        /*console.log('arregloAgrupacionElementosFormulaPorConexionATablaVariables');
        console.log(arregloAgrupacionElementosFormulaPorConexionATablaVariables);
        console.log('arregloAgrupacionElementosFormulaPorVariablesVariables');
        console.log(arregloAgrupacionElementosFormulaPorVariablesVariables);
        console.log('arregloAgrupacionElementosFormulaPorExcelVariables');
        console.log(arregloAgrupacionElementosFormulaPorExcelVariables);
        console.log('arregloAgrupacionElementosFormulaPorFormasVariables');
        console.log(arregloAgrupacionElementosFormulaPorFormasVariables);*/

        var existeVarSQL = false;

        //INICIALIZANDO VARIABLES EN MEMORIA
        for (var a = 0; a < arregloDeVariables.length; a++) {
            if(arregloDeVariables[a].realizarCalculo) {
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
        }

        //codigo var sql
        this.crearCodigoFuenteDatoSQL();

        var codigo = '';

        /*//AGREGAR CODIGO VARIABLES EXCEL
        codigo += this.crearNivel(false, arregloAgrupacionElementosFormulaPorExcelVariables, 0);
        //AGREGAR CODIGO VARIABLES FORMA
        codigo += this.crearNivel(false, arregloAgrupacionElementosFormulaPorFormasVariables, 0);*/

        //codigo var general
        for (var i = 0; i <= nivelMaximoVariables; i++) {
            if(i == 0) {
                var llamarSiguienteNivel = false;
                if(nivelMaximoVariables >= 1)
                    llamarSiguienteNivel = true;
                codigo += this.crearCodigoFuenteDato(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorConexionATablaVariables, 0);
                codigo += this.crearNivel(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorExcelVariables, 0);
                codigo += this.crearNivel(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorFormasVariables, 0);
                codigo += this.crearNivel(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorManualVariables, 0);
            } else {
                var llamarSiguienteNivel = false;
                if(nivelMaximoVariables > i)
                    llamarSiguienteNivel = true;
                codigo += this.crearNivel(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorVariablesVariables, i);
                codigo += this.crearNivel(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorExcelVariables, i);
                codigo += this.crearNivel(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorFormasVariables, i);
            }
        };
        codigo += '\n\tiniciarCalculoIndicadores();';

        window['calculoPrincipal'] = new Function(
            'return function calculoPrincipalMain(evaluate, iniciarCalculoIndicadores, isValidDate, guardarOperacionSQL){'+
                    codigo+
            '}'
        )();

        //console.log(window['calculoPrincipal']);

        if(!existeVarSQL) {
            window['calculoPrincipal'](evaluate, this.iniciarCalculoIndicadores, this.isValidDate, this.guardarOperacionSQL);
        } else {
            for (var a = 0; a < arregloDeVariables.length; a++) {
                if(arregloDeVariables[a].esInstruccionSQL) {
                    window["calculoSQL"+arregloDeVariables[a].nombre](sql, this.props.pool, evaluate, this.iniciarCalculoIndicadores, this.isValidDate, this.guardarOperacionSQL);
                    break;
                }
            };
        }
        /*console.log(window['calculoPrincipal']);
        for (var a = 0; a < arregloDeVariables.length; a++) {
            console.log('window["'+arregloDeVariables[a].nombre+'"]');
            console.log(window[arregloDeVariables[a].nombre]);
        };*/
        setTimeout(function() {
            for (var a = 0; a < arregloDeVariables.length; a++) {
                console.log('window["'+arregloDeVariables[a].nombre+'"]');
                console.log(window[arregloDeVariables[a].nombre]);
            };
        }, 3000);

        setTimeout(function() {
            console.log('===========');
            for (var a = 0; a < arregloDeFormas.length; a++) {
                console.log('window["'+arregloDeFormas[a].nombre+'"]');
                console.log(window[arregloDeFormas[a].nombre]);
            };
        }, 3000);
        setTimeout(function() {
            console.log('===========');
            for (var i = 0; i < arregloDeExcel.length; i++) {
                for (var j = 0; j < arregloDeExcel[i].variables.length; j++) {
                    console.log('window["'+arregloDeExcel[i].variables[j].nombre+'"]');
                    console.log(window[arregloDeExcel[i].variables[j].nombre]);
                };
            };
        }, 3000); 
    }

    codigoIniciacion (variable, tipoVariable, atributo, tabsText, esOperacionSQL, esPromedio) {
        if(tipoVariable.localeCompare("fuenteDato") == 0) {
            //atributo en este caso, es el valor del index del elemento en formula
            return this.iniciacionElementosFormula(variable, atributo, tabsText);
        } else if(tipoVariable.localeCompare("variable") == 0) {
            return this.iniciacionVariable(variable, tabsText);
        } else if(tipoVariable.localeCompare("atributo") == 0) {
            return this.iniciacionCampo(variable, atributo, tabsText, esOperacionSQL, esPromedio);
        }
    }

    iniciacionElementosFormula (variable, index) {
        var iniciacionElementosFormula = '';
        if(variable.tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0 && (variable.operacion.localeCompare("MAX") == 0 || variable.operacion.localeCompare("MIN") == 0) ) {
            //CUANDO ES FECHA Y OPERACION ES MAX O MIN DE FUENTE DE DATOS, SE OBTIENE LA FECHA MAXIMA O MENOR ENCONTRADA
            //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
            //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
            iniciacionElementosFormula += tabsText+'var '+variable.nombreColumnaEnTabla+
                                                variable.variableID+
                                                variable.variableCampoID+
                                                variable.idFormula+
                                                variable.idConexionTabla+index;
            iniciacionElementosFormula += ' = new Date(1964, 5, 28);'; //POPS BIRTHDAY -- FECHA NULA
        } else if(variable.tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0 && variable.operacion.length > 0) {
            //CUANDO ES FECHA Y OPERACION NO ES MAX O MIN DE FUENTE DE DATOS, SE OBTIENE UN NUMERO QUE VARIA POR OPERACION (DIA, MES, AÑO, COUNT)
            //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
            //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
            iniciacionElementosFormula += tabsText+'var '+variable.nombreColumnaEnTabla+
                                                variable.variableID+
                                                variable.variableCampoID+
                                                variable.idFormula+
                                                variable.idConexionTabla+index;
            iniciacionElementosFormula += ' = 0;';
        }

        if(variable.tipoColumnaEnTabla.toLowerCase().localeCompare("bool") == 0 && variable.operacion.localeCompare("COUNT") == 0) {
            //CUANDO ES BOOL Y OPERACION ES COUNT DE FUENTE DE DATOS
            //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
            //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
            iniciacionElementosFormula += tabsText+'var '+variable.nombreColumnaEnTabla+
                                                variable.variableID+
                                                variable.variableCampoID+
                                                variable.idFormula+
                                                variable.idConexionTabla+index;
            iniciacionElementosFormula += ' = 0;';
        }

        if(variable.tipoColumnaEnTabla.toLowerCase().localeCompare("numero") == 0 && this.existeOperacion(variable.operacion) ) {
            //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
            //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
            iniciacionElementosFormula += tabsText+'var '+variable.nombreColumnaEnTabla+
                                                variable.variableID+
                                                variable.variableCampoID+
                                                variable.idFormula+
                                                variable.idConexionTabla+index;
            iniciacionElementosFormula += ' = 0;';
        }

        if(variable.tipoColumnaEnTabla.toLowerCase().localeCompare("cadena") == 0 && variable.operacion.localeCompare("COUNT") == 0) {
            //CUANDO ES BOOL Y OPERACION ES COUNT DE FUENTE DE DATOS
            //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
            //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
            iniciacionElementosFormula += tabsText+'var '+variable.nombreColumnaEnTabla+
                                                variable.variableID+
                                                variable.variableCampoID+
                                                variable.idFormula+
                                                variable.idConexionTabla+index;
            iniciacionElementosFormula += ' = 0;';
        }
        return iniciacionElementosFormula;
    }

    iniciacionVariable (variable, tabsText) {
        var iniciacionVariable = '';
        if(variable.esObjeto || variable.esInstruccionSQL) {
            iniciacionVariable += tabsText+'var '+variable.nombre+'NU3V0 = {};';
            iniciacionVariable += '\n'+tabsText+'var ' + variable.nombre + 'GU4RD4RV4L0R = false;';
        }
        //validacion necesario porque cuando variable sea primitiva, codigo de instanciacion sera en campo / atributo
        return iniciacionVariable;
    }

    iniciacionCampo (variable, campo, tabsText, esOperacionSQL, esPromedio) {
        var iniciacionVariable = '';
        if(!variable.esObjeto && !variable.esInstruccionSQL) {
            if(campo.tipo.toLowerCase().localeCompare("date") == 0) {
                iniciacionVariable += tabsText+'var '+variable.nombre+'NU3V0 = new Date(1964, 4, 28);'; //POPS BIRTHDAY == null
                iniciacionVariable += '\n'+tabsText+'var ' + variable.nombre + 'GU4RD4RV4L0R = false;';
            }
            if(campo.tipo.toLowerCase().localeCompare("bool") == 0 || campo.tipo.toLowerCase().localeCompare("bit") == 0) {
                iniciacionVariable += tabsText+'var '+variable.nombre+'NU3V0 = false;';
                iniciacionVariable += '\n'+tabsText+'var ' + variable.nombre + 'GU4RD4RV4L0R = false;';
            }
            if(campo.tipo.toLowerCase().localeCompare("numero") == 0 || campo.tipo.toLowerCase().localeCompare("int") == 0 || campo.tipo.toLowerCase().localeCompare("decimal") == 0) {
                iniciacionVariable += tabsText+'var '+variable.nombre+'NU3V0 = -1;';
                iniciacionVariable += '\n'+tabsText+'var ' + variable.nombre + 'GU4RD4RV4L0R = false;';
            }
            if(campo.tipo.toLowerCase().localeCompare("cadena") == 0 || campo.tipo.toLowerCase().localeCompare("varchar") == 0) {
                iniciacionVariable += tabsText+'var '+variable.nombre+'NU3V0 = "";';
                iniciacionVariable += '\n'+tabsText+'var ' + variable.nombre + 'GU4RD4RV4L0R = false;';
            }
            if(esPromedio) {
                iniciacionVariable += '\n'+tabsText+"var "+variable.nombre+'NU3V0T0T4L = 0;';
            }
        } else if ( (variable.esObjeto || variable.esInstruccionSQL) && esOperacionSQL) {
            if(campo.tipo.toLowerCase().localeCompare("date") == 0) {
                iniciacionVariable += tabsText+"var "+variable.nombre+campo.nombre+'NU3V0 = new Date(1964, 4, 28);'; //POPS BIRTHDAY == null
            }
            if(campo.tipo.toLowerCase().localeCompare("bool") == 0 || campo.tipo.toLowerCase().localeCompare("bit") == 0) {
                iniciacionVariable += tabsText+"var "+variable.nombre+campo.nombre+'NU3V0 = false;';
            }
            if(campo.tipo.toLowerCase().localeCompare("numero") == 0 || campo.tipo.toLowerCase().localeCompare("int") == 0 || campo.tipo.toLowerCase().localeCompare("decimal") == 0) {
                iniciacionVariable += tabsText+"var "+variable.nombre+campo.nombre+'NU3V0 = -1;';
            }
            if(campo.tipo.toLowerCase().localeCompare("cadena") == 0 || campo.tipo.toLowerCase().localeCompare("varchar") == 0) {
                iniciacionVariable += tabsText+"var "+variable.nombre+campo.nombre+'NU3V0 = "";';
            }
            if(esPromedio) {
                iniciacionVariable += '\n'+tabsText+"var "+variable.nombre+campo.nombre+'NU3V0T0T4L = 0;';
            }
        } else {
            if(campo.tipo.toLowerCase().localeCompare("date") == 0) {
                iniciacionVariable += tabsText+variable.nombre+'NU3V0.'+campo.nombre+' = new Date(1964, 4, 28);'; //POPS BIRTHDAY == null
            }
            if(campo.tipo.toLowerCase().localeCompare("bool") == 0 || campo.tipo.toLowerCase().localeCompare("bit") == 0) {
                iniciacionVariable += tabsText+variable.nombre+'NU3V0.'+campo.nombre+' = false;';
            }
            if(campo.tipo.toLowerCase().localeCompare("numero") == 0 || campo.tipo.toLowerCase().localeCompare("int") == 0 || campo.tipo.toLowerCase().localeCompare("decimal") == 0) {
                iniciacionVariable += tabsText+variable.nombre+'NU3V0.'+campo.nombre+' = -1;';
            }
            if(campo.tipo.toLowerCase().localeCompare("cadena") == 0 || campo.tipo.toLowerCase().localeCompare("varchar") == 0) {
                iniciacionVariable += tabsText+variable.nombre+'NU3V0.'+campo.nombre+' = "";';
            }
        }
        return iniciacionVariable;
    }

    crearCodigoFuenteDato (llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorConexionATabla, nivelACrear) {
        //la creacion del codigo en esta parte pertenece a los campos que tienen asignacion unica de columna de tabla, y asignacion unica de columna de tabla con operacion como SUM, COUNT ect
        var codigo = '';
        for (var i = 0; i < arregloConexionesATablas.length; i++) {
            var variablesInstanciadasID = [], variablesGuardadasID = [];
            if(!arregloConexionesATablas[i].esInstruccionSQL && arregloAgrupacionElementosFormulaPorConexionATabla[i] != undefined) {
                var codigoCuerpo = '';
                var codigoIniciacionVarPrimitiva = '';
                var codigoGuardarVariables = '';
                var codigoGuardarVariableOperacionSQL = '';
                for (var j = 0; j < arregloAgrupacionElementosFormulaPorConexionATabla[i].length; j++) {
                    if(arregloConexionesATablas[i].ID == arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.conexionTablaID && arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.realizarCalculo) {
                        if(j == 0) {
                            //solo crear codigo for una vez por variable
                            codigoCuerpo += '\n\t//CODIGO TABLA: '+arregloConexionesATablas[i].nombre;
                            codigoCuerpo += '\n\tfor ( var i = '+i+'; i < '+(i+1)+'; i++) {';
                            codigoCuerpo += '\n\t\tfor ( var x = 0; x < arregloResultadosDeTablas[i].length; x++) {';
                        }
                        var varFueInicializada = false;
                        for (var w = 0; w < variablesInstanciadasID.length; w++) {
                            if (variablesInstanciadasID[w] == arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.ID) {
                                varFueInicializada = true;
                                break;
                            }
                        };
                        /*if(!varFueInicializada) {
                            variablesInstanciadasID.push(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.ID);*/
                            if(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.esObjeto) {
                                if(!varFueInicializada) {
                                    variablesInstanciadasID.push(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.ID);
                                    codigoCuerpo += '\n\t\t\t//INICIACION VARIABLE: '+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre;
                                    codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable, "variable", {}, '\t\t\t'); //variable, tipoVariable, atributo
                                }
                                //for (var p = 0; p < arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.atributos.length; p++) {
                                    var contieneOperacionSQL = false, esPromedio = false;
                                    //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)
                                    if( this.existeOperacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length-1].operacion) )
                                        contieneOperacionSQL = true;
                                    if( arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0 )
                                        esPromedio = true;
                                    if(!contieneOperacionSQL)
                                        codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo, '\t\t\t', false, esPromedio);
                                    else {
                                        codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo, '\t\t\t', false, false);
                                        codigoIniciacionVarPrimitiva += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo, '\t', true, esPromedio);
                                    }
                                //};
                            } else {
                                codigoIniciacionVarPrimitiva += '\n\t//INICIACION VARIABLE: '+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre;
                                for (var p = 0; p < arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.atributos.length; p++) {
                                    var esPromedio = false;
                                    if( arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0 )
                                        esPromedio = true;
                                    codigoIniciacionVarPrimitiva += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.atributos[p], '\t', false, esPromedio);
                                };
                            }
                        //}
                        if(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nivel == nivelACrear) {
                            var posicionVariable = 0, posicionCampo = 0;
                            EncontrarPosiciones:
                            for (var a = 0; a < arregloDeVariables.length; a++) {
                                if(arregloDeVariables[a].ID == arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.ID) {
                                    posicionVariable = a;
                                    for (var b = 0; b < arregloDeVariables[a].atributos.length; b++) {
                                        if(arregloDeVariables[a].atributos[b].ID == arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.ID) {
                                            posicionCampo = b;
                                            break EncontrarPosiciones;
                                        }
                                    };
                                }
                            };
                            var esArregloReferenciaArregloEnCodigo = arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.esObjeto;
                            codigoCuerpo += this.crearCodigoSegmentoReglas(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla, arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas, 3, posicionVariable, posicionCampo, "arregloResultadosDeTablas[i]", true);
                        }
                        var varFueGuardada = false;
                        for (var w = 0; w < variablesGuardadasID.length; w++) {
                            if (variablesGuardadasID[w] == arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.ID) {
                                varFueGuardada = true;
                                break;
                            }
                        };
                        if(!varFueGuardada) {
                            variablesGuardadasID.push(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.ID);
                            codigoGuardarVariables += this.agregarCodigoGuardarVariable(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable, arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributos, 3);
                        }
                            //for (var p = 0; p < arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.atributos.length; p++) {
                            if(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.esObjeto || arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.esInstruccionSQL) {
                                var contieneOperacionSQL = false;
                                //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)
                                if( this.existeOperacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length-1].operacion) )
                                    contieneOperacionSQL = true;
                                if(contieneOperacionSQL && arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") != 0 )
                                    codigoGuardarVariableOperacionSQL += '\n\tguardarOperacionSQL(window["'+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+'"], "'+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre+'", '+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre+'NU3V0);';
                                else if(contieneOperacionSQL && arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0 ) {
                                    codigoGuardarVariableOperacionSQL += '\n\tif('+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre+'NU3V0T0T4L != 0 || '+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre+'NU3V0T0T4L != -1) {';
                                    codigoGuardarVariableOperacionSQL += '\n\t\tvar total = '+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre+'NU3V0/'+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre+'NU3V0T0T4L;';
                                    codigoGuardarVariableOperacionSQL += '\n\t\tguardarOperacionSQL(window["'+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+'"], "'+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre+'", total);';
                                    codigoGuardarVariableOperacionSQL += '\n\t}';
                                }
                            } else if(!arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.esObjeto && !arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.esInstruccionSQL && arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0) {
                                codigoGuardarVariableOperacionSQL += '\n\tvar total = '+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+'NU3V0/'+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+'NU3V0T0T4L;';
                                codigoGuardarVariableOperacionSQL += '\n\twindow["'+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+'"] = total;';
                            }
                            //};
                        //}
                        if(j == arregloAgrupacionElementosFormulaPorConexionATabla[i].length-1) {
                            codigoCuerpo += codigoGuardarVariables;
                            //solo crear codigo for una vez por variable
                            codigoCuerpo += '\n\t\t};';
                            codigoCuerpo += '\n\t};\n';
                            codigo += codigoIniciacionVarPrimitiva + codigoCuerpo + codigoGuardarVariableOperacionSQL;
                        }
                    }
                };
            }
        };
        /*console.log('codigo');
        console.log(codigo);*/
        return codigo;
    }

    crearCodigoFuenteDatoSQL () {
        //sacar total variables SQL
        var contadorSQLTotal = 0;
        for (var a = 0; a < arregloDeVariables.length; a++) {
            if(arregloDeVariables[a].esInstruccionSQL) {
                contadorSQLTotal++;
            }
        };
        //crear arreglo de siguientes llamadas de metodos de variables SQL
        //la creacion del codigo en esta parte pertenece a las variables que ocupan calculo sql
        var codigo = '';
        var contadorSQL = 0;
        for (var a = 0; a < arregloDeVariables.length; a++) {
            if(arregloDeVariables[a].esInstruccionSQL) {
                var siguienteMetodo;
                contadorSQL++;
                if(contadorSQL == contadorSQLTotal) {
                    siguienteMetodo = "window['calculoPrincipal'](evaluate, iniciarCalculoIndicadores, isValidDate, guardarOperacionSQL)";
                } else {
                    siguienteMetodo = "window['calculoSQL"+arregloDeVariables[a+1].nombre+"'](sql, pool, evaluate, iniciarCalculoIndicadores, isValidDate, guardarOperacionSQL)";
                }
                codigo = this.crearCodigoSQL(arregloDeVariables[a], siguienteMetodo);
                window['calculoSQL'+arregloDeVariables[a].nombre] = new Function(
                    'return function calculoSQL'+arregloDeVariables[a].nombre+'(sql, pool, evaluate, iniciarCalculoIndicadores, isValidDate, guardarOperacionSQL){'+
                            codigo+
                    '\n}'
                )();
                console.log(window['calculoSQL'+arregloDeVariables[a].nombre]);
            }
        };
        return codigo;
    }

    crearCodigoSQL (variable, siguienteMetodo) {
        var codigo = '';
        codigo += "\nconst transaction = new sql.Transaction( pool );";
        codigo += "\ntransaction.begin(err => {";
            codigo += "\n\tvar rolledBack = false;";
            codigo += "\n\ttransaction.on('rollback', aborted => {";
                codigo += "\n\t\trolledBack = true;";
            codigo += "\n\t});";
            codigo += "\n\tconst request = new sql.Request(transaction);";
            codigo += '\n\trequest.query("'+variable.instruccionSQL.instruccionSQL+'", (err, result) => {';
                codigo += "\n\t\tif (err) {";
                    codigo += "\n\t\t\tif (!rolledBack) {";
                        codigo += "\n\t\t\t\tconsole.log(err);";
                        codigo += "\n\t\t\t\ttransaction.rollback(err => {";
                        codigo += "\n\t\t\t\t});";
                        codigo += '\n\t\t\t\t'+siguienteMetodo+';';
                    codigo += "\n\t\t\t}";
                codigo += "\n\t\t} else {";
                    codigo += "\n\t\t\ttransaction.commit(err => {";
                        codigo += "\n\t\t\t\tfor(var i = 0; i < result.recordset.length; i++) {";
                        codigo += '\n\t\t\t\t\t//INICIACION VARIABLE: '+variable.nombre;
                        codigo += '\n' + this.codigoIniciacion(variable, "variable", {}, '\t\t\t\t\t');
                        for (var p = 0; p < variable.atributos.length; p++) {
                            codigo += '\n' + this.codigoIniciacion(variable, "atributo", variable.atributos[p], '\t\t\t\t\t');
                        };
                        codigo += '\n\t\t\t\t\t//var insertoValor = false;';
                        for (var i = 0; i < variable.atributos.length; i++) {
                            codigo += "\n\t\t\t\t\tif (result.recordset[i]."+variable.atributos[i].nombre+" != undefined ) {";
                            codigo += "\n\t\t\t\t\t\t"+variable.nombre+"NU3V0."+variable.atributos[i].nombre+" = result.recordset[i]."+variable.atributos[i].nombre+";";
                            codigo += "\n\t\t\t\t\t\t"+variable.nombre+"GU4RD4RV4L0R = true;";
                            codigo += "\n\t\t\t\t\t}";
                        };
                        codigo += '\n\t\t\t\t\tif ('+variable.nombre+'GU4RD4RV4L0R) {';
                        codigo += '\n\t\t\t\t\t\twindow["'+variable.nombre+'"].push('+variable.nombre+'NU3V0);';
                        codigo += '\n\t\t\t\t\t}';
                        codigo += '\n\t\t\t\t};';
                        codigo += '\n\t\t\t\t'+siguienteMetodo+';';
                    codigo += "\n\t\t\t});";
                codigo += "\n\t\t}";
            codigo += "\n\t});";
        codigo += "\n});"; // fin transaction
        return codigo;
    }

    crearCodigoSegmentoReglas (segmentoReglas, reglas, tabs, posicionVariable, posicionCampo, nombreReferenciaArregloEnCodigo, esArregloReferenciaArregloEnCodigo) {
        var codigo = '';
        var tabsText = '';
        for (var i = 0; i < tabs; i++) {
            tabsText+='\t';
        };
        for (var n = 0; n < reglas.length; n++) {
            if(reglas[n].reglaPadreID == -1 && reglas[n].operacion.localeCompare("ELSE") != 0) {
                var resultado = this.arregloCodigoRegla(reglas[n], tabs, posicionVariable, posicionCampo, [], reglas, nombreReferenciaArregloEnCodigo, esArregloReferenciaArregloEnCodigo);
                if(resultado.length > 0)
                    resultado[0].codigo = "\n"+resultado[0].codigo;
                //$.merge( prestamosCuerpo, resultado );
                for (var i = 0; i < resultado.length; i++) {
                    codigo += resultado[i].codigo;
                };
            }
        };
        return codigo;
    }

    crearCodigoSegmentoReglasFormaOExcel (segmentoReglas, reglas, tabs, posicionVariable, posicionCampo, nombreReferenciaArregloEnCodigo, esExcel) {
        var codigo = '';
        var tabsText = '';
        for (var i = 0; i < tabs; i++) {
            tabsText+='\t';
        };
        for (var n = 0; n < reglas.length; n++) {
            if(reglas[n].reglaPadreID == -1 && reglas[n].operacion.localeCompare("ELSE") != 0) {
                var resultado = this.arregloCodigoReglaFormaOExcel(reglas[n], tabs, posicionVariable, posicionCampo, [], reglas, nombreReferenciaArregloEnCodigo, esExcel);
                if(resultado.length > 0)
                    resultado[0].codigo = "\n"+resultado[0].codigo;
                //$.merge( prestamosCuerpo, resultado );
                for (var i = 0; i < resultado.length; i++) {
                    codigo += resultado[i].codigo;
                };
            }
        };
        return codigo;
    }

    agregarCodigoGuardarVariable (variable, campo, tabs) {
        var codigo = '';
        var tabsText = '';
        for (var i = 0; i < tabs; i++) {
            tabsText+='\t';
        };
        //ver si elementoFormula es asignacion de columna
        //for (var i = 0; i < elementoFormula.length; i++) {
            //if (elementoFormula[i].operacion.toLowerCase().localeCompare("asig") == 0) {
                codigo += '\n'+tabsText+'if ('+variable.nombre+'GU4RD4RV4L0R'+') {';
                //codigo += '\n'+tabsText+'\tconsole.log('+variable.nombre+'NU3V0);';
                if(variable.esObjeto) {
                    codigo += '\n'+tabsText+'\twindow["'+variable.nombre+'"].push('+variable.nombre+'NU3V0);';
                } else {
                    codigo += '\n'+tabsText+'\twindow["'+variable.nombre+'"] = '+variable.nombre+'NU3V0;';
                }
                codigo += '\n'+tabsText+'}';

            //}
        //};
        return codigo;
    }

    crearNivel (llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorVariables, nivelACrear) {
        //arregloAgrupacionElementosFormulaPorVariables contiene todas las variables que se calculan a base de otras variables
            //cada posicion nivel 0 representa la posicion de la variable en el arreglo de variables
            //cada posicion nivel 1 tiene la variable de la cual se va a calcular, el campo, la variable a crear y el segmento que pertenece a la variable de la cual se va a calcular
        var codigo = '';
        for (var i = 0; i < arregloDeVariables.length; i++) {
            var variablesInstanciadasID = [], variablesGuardadasID = [];
            if(/*!arregloDeVariables[i].esInstruccionSQL &&*/ arregloAgrupacionElementosFormulaPorVariables[i] != undefined) {
                var totalVarACrearNivel = 0;
                for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariables[i].length; j++) {
                    if(arregloAgrupacionElementosFormulaPorVariables[i][j] != undefined && arregloAgrupacionElementosFormulaPorVariables[i][j].length == undefined && arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nivel == nivelACrear) {
                        totalVarACrearNivel++;
                    }
                };
                var codigoCuerpo = '';
                var codigoIniciacionVarPrimitiva = '';
                var codigoGuardarVariables = '';
                var totalVarCreadasNivel = 0;
                var codigoGuardarVariableOperacionSQL = '';
                for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariables[i].length; j++) {
                    //arregloAgrupacionElementosFormulaPorVariables[i][j].length == undefined --- para ver si no son varias variables de excel
                    if(arregloAgrupacionElementosFormulaPorVariables[i][j] != undefined && arregloAgrupacionElementosFormulaPorVariables[i][j].length == undefined && arregloAgrupacionElementosFormulaPorVariables[i][j].length == undefined && arregloDeVariables[i].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].variableCreacionCodigo.ID && arregloDeVariables[i].nombre.localeCompare(arregloAgrupacionElementosFormulaPorVariables[i][j].variableCreacionCodigo.nombre) == 0 && arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nivel == nivelACrear && arregloAgrupacionElementosFormulaPorVariables[i][j].variable.realizarCalculo) {//segundo es para ver si no es arregloAgrupacionElementosFormulaPorVariables de excel
                        totalVarCreadasNivel++;
                        if(j == 0 && ((arregloDeVariables[i].esObjeto || arregloDeVariables[i].esInstruccionSQL) && !arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.esValorManual)) {
                            //solo crear codigo for una vez por variable
                            codigoCuerpo += '\n\t//CODIGO VARIABLE: '+arregloDeVariables[i].nombre;
                            codigoCuerpo += '\n\tfor ( var x = 0; x < window["'+arregloDeVariables[i].nombre+'"].length; x++) {';
                        }
                        var varFueInicializada = false;
                        for (var w = 0; w < variablesInstanciadasID.length; w++) {
                            if (variablesInstanciadasID[w] == arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID) {
                                varFueInicializada = true;
                                break;
                            }
                        };
                        /*if(!varFueInicializada) {
                            variablesInstanciadasID.push(arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID);*/
                            if(arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esObjeto) {
                                if(!varFueInicializada) {
                                    variablesInstanciadasID.push(arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID);
                                    codigoCuerpo += '\n\t\t//INICIACION VARIABLE: '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre;
                                    codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "variable", {}, '\t\t'); //variable, tipoVariable, atributo
                                }
                                //for (var p = 0; p < arregloAgrupacionElementosFormulaPorVariables[i][j].variable.atributos.length; p++) {
                                    var contieneOperacionSQL = false, esPromedio = false;
                                    //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)
                                    if( this.existeOperacion(arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion) )
                                        contieneOperacionSQL = true;
                                    if( arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0 )
                                        esPromedio = true;
                                    if(!contieneOperacionSQL)
                                        codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][j].atributo, '\t\t', false, esPromedio);
                                    else {
                                        codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][j].atributo, '\t\t', false, false);
                                        codigoIniciacionVarPrimitiva += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][j].atributo, '\t', true, esPromedio);
                                    }
                                //};
                            } else {
                                codigoIniciacionVarPrimitiva += '\n\t//INICIACION VARIABLE: '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre;
                                for (var p = 0; p < arregloAgrupacionElementosFormulaPorVariables[i][j].variable.atributos.length; p++) {
                                    var esPromedio = false;
                                    if( arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0 )
                                        esPromedio = true;
                                    codigoIniciacionVarPrimitiva += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][j].variable.atributos[p], '\t', false, esPromedio);
                                };
                            }
                        //}
                        //if(arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nivel == nivelACrear) {
                            var posicionVariable = 0, posicionCampo = 0;
                            EncontrarPosiciones:
                            for (var a = 0; a < arregloDeVariables.length; a++) {
                                if(arregloDeVariables[a].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID) {
                                    posicionVariable = a;
                                    for (var b = 0; b < arregloDeVariables[a].atributos.length; b++) {
                                        if(arregloDeVariables[a].atributos[b].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.ID) {
                                            posicionCampo = b;
                                            break EncontrarPosiciones;
                                        }
                                    };
                                }
                            };
                            var esArregloReferenciaArregloEnCodigo = false;
                            if(arregloDeVariables[i].esObjeto || arregloDeVariables[i].esInstruccionSQL)
                                esArregloReferenciaArregloEnCodigo = true;
                            codigoCuerpo += this.crearCodigoSegmentoReglas(arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla, arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas, 2, posicionVariable, posicionCampo, 'window["'+arregloDeVariables[i].nombre+'"]', esArregloReferenciaArregloEnCodigo);
                        //}
                        var varFueGuardada = false;
                        for (var w = 0; w < variablesGuardadasID.length; w++) {
                            if (variablesGuardadasID[w] == arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID) {
                                varFueGuardada = true;
                                break;
                            }
                        };
                        if(!varFueGuardada) {
                            variablesGuardadasID.push(arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID);
                            codigoGuardarVariables += this.agregarCodigoGuardarVariable(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, arregloAgrupacionElementosFormulaPorVariables[i][j].atributos, 2);
                        }
                            //for (var p = 0; p < arregloAgrupacionElementosFormulaPorVariables[i][j].variable.atributos.length; p++) {
                            if(arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esObjeto || arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esInstruccionSQL) {
                                var contieneOperacionSQL = false;
                                //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)
                                if( this.existeOperacion(arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion) )
                                    contieneOperacionSQL = true;
                                if(contieneOperacionSQL && arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") != 0 )
                                    codigoGuardarVariableOperacionSQL += '\n\tguardarOperacionSQL(window["'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'"], "'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'", '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0);';
                                else if(contieneOperacionSQL && arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0 ) {
                                    //NU3V0T0T4L
                                    codigoGuardarVariableOperacionSQL += '\n\tif('+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0T0T4L != 0 || '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0T0T4L != -1) {';
                                    codigoGuardarVariableOperacionSQL += '\n\t\tvar total = '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0/'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0T0T4L;';
                                    codigoGuardarVariableOperacionSQL += '\n\t\tguardarOperacionSQL(window["'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'"], "'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'", total);';
                                    codigoGuardarVariableOperacionSQL += '\n\t}';
                                } else if(!arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esObjeto && !arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esInstruccionSQL && arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0) {
                                    codigoGuardarVariableOperacionSQL += '\n\tvar total = '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'NU3V0/'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'NU3V0T0T4L;';
                                    codigoGuardarVariableOperacionSQL += '\n\twindow["'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'"] = total;';
                                }
                            }
                            //};
                        //}
                        if(totalVarCreadasNivel == totalVarACrearNivel) {
                            codigoCuerpo += codigoGuardarVariables;
                            //solo crear codigo for una vez por variable
                            if((arregloDeVariables[i].esObjeto || arregloDeVariables[i].esInstruccionSQL) && !arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.esValorManual)
                                codigoCuerpo += '\n\t};\n';
                            codigo += codigoIniciacionVarPrimitiva + codigoCuerpo + codigoGuardarVariableOperacionSQL;
                        }
                    }
                };
            }
        };

        for (var i = 0; i < arregloDeFormas.length; i++) {
            var variablesInstanciadasID = [], variablesGuardadasID = [];
            if(arregloAgrupacionElementosFormulaPorVariables[i] != undefined) {
                var totalVarACrearNivel = 0;
                for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariables[i].length; j++) {
                    if(arregloAgrupacionElementosFormulaPorVariables[i][j] != undefined && arregloAgrupacionElementosFormulaPorVariables[i][j].length == undefined && arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nivel == nivelACrear) {
                        totalVarACrearNivel++;
                    }
                };
                var codigoCuerpo = '';
                var codigoIniciacionVarPrimitiva = '';
                var codigoGuardarVariables = '';
                var totalVarCreadasNivel = 0;
                var codigoGuardarVariableOperacionSQL = '';
                for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariables[i].length; j++) {
                    if(arregloAgrupacionElementosFormulaPorVariables[i][j] != undefined && arregloAgrupacionElementosFormulaPorVariables[i][j].length == undefined && arregloDeFormas[i].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].variableCreacionCodigo.ID && this.verificarExistenciaErroresForma(arregloAgrupacionElementosFormulaPorVariables[i][j].variableCreacionCodigo) && arregloDeFormas[i].nombre.localeCompare(arregloAgrupacionElementosFormulaPorVariables[i][j].variableCreacionCodigo.nombre) == 0  && arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nivel == nivelACrear && arregloAgrupacionElementosFormulaPorVariables[i][j].variable.realizarCalculo) {//segundo es para ver si no es arregloAgrupacionElementosFormulaPorVariables de excel
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
                        };
                        /*if(!varFueInicializada) {
                            variablesInstanciadasID.push(arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID);*/
                            if(arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esObjeto) {
                                if(!varFueInicializada) {
                                    variablesInstanciadasID.push(arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID);
                                    codigoCuerpo += '\n\t\t//INICIACION VARIABLE: '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre;
                                    codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "variable", {}, '\t\t'); //variable, tipoVariable, atributo
                                }
                                //for (var p = 0; p < arregloAgrupacionElementosFormulaPorVariables[i][j].variable.atributos.length; p++) {
                                    var contieneOperacionSQL = false, esPromedio = false;
                                    //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)
                                    if( this.existeOperacion(arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion) )
                                        contieneOperacionSQL = true;
                                    if( arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0 )
                                        esPromedio = true;
                                    if(!contieneOperacionSQL)
                                        codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][j].atributo, '\t\t', false, esPromedio);
                                    else {
                                        codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][j].atributo, '\t\t', false, false);
                                        codigoIniciacionVarPrimitiva += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][j].atributo, '\t', true, esPromedio);
                                    }
                                //};
                            } else {
                                codigoIniciacionVarPrimitiva += '\n\t//INICIACION VARIABLE: '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre;
                                for (var p = 0; p < arregloAgrupacionElementosFormulaPorVariables[i][j].variable.atributos.length; p++) {
                                    var esPromedio = false;
                                    if( arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0 )
                                        esPromedio = true;
                                    codigoIniciacionVarPrimitiva += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][j].variable.atributos[p], '\t', false, esPromedio);
                                };
                            }
                        //}
                        //if(arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nivel == nivelACrear) {
                            var posicionVariable = 0, posicionCampo = 0;
                            EncontrarPosiciones:
                            for (var a = 0; a < arregloDeVariables.length; a++) {
                                if(arregloDeVariables[a].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID) {
                                    posicionVariable = a;
                                    for (var b = 0; b < arregloDeVariables[a].atributos.length; b++) {
                                        if(arregloDeVariables[a].atributos[b].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.ID) {
                                            posicionCampo = b;
                                            break EncontrarPosiciones;
                                        }
                                    };
                                }
                            };
                            var esArregloReferenciaArregloEnCodigo = false;
                            codigoCuerpo += this.crearCodigoSegmentoReglasFormaOExcel(arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla, arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas, 2, posicionVariable, posicionCampo, 'window["'+arregloDeFormas[i].nombre+'"]', false);
                        //}
                        var varFueGuardada = false;
                        for (var w = 0; w < variablesGuardadasID.length; w++) {
                            if (variablesGuardadasID[w] == arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID) {
                                varFueGuardada = true;
                                break;
                            }
                        };
                        if(!varFueGuardada) {
                            variablesGuardadasID.push(arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID);
                            codigoGuardarVariables += this.agregarCodigoGuardarVariable(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, arregloAgrupacionElementosFormulaPorVariables[i][j].atributos, 2);
                        }
                            //for (var p = 0; p < arregloAgrupacionElementosFormulaPorVariables[i][j].variable.atributos.length; p++) {
                            if(arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esObjeto || arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esInstruccionSQL) {
                                var contieneOperacionSQL = false;
                                //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)
                                if( this.existeOperacion(arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion) )
                                    contieneOperacionSQL = true;
                                if(contieneOperacionSQL && arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") != 0 )
                                    codigoGuardarVariableOperacionSQL += '\n\tguardarOperacionSQL(window["'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'"], "'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'", '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0);';
                                else if(contieneOperacionSQL && arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0 ) {
                                    //NU3V0T0T4L
                                    codigoGuardarVariableOperacionSQL += '\n\tif('+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0T0T4L != 0 || '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0T0T4L != -1) {';
                                    codigoGuardarVariableOperacionSQL += '\n\t\tvar total = '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0/'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0T0T4L;';
                                    codigoGuardarVariableOperacionSQL += '\n\t\tguardarOperacionSQL(window["'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'"], "'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'", total);';
                                    codigoGuardarVariableOperacionSQL += '\n\t}';
                                } else if(!arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esObjeto && !arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esInstruccionSQL && arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0) {
                                    codigoGuardarVariableOperacionSQL += '\n\tvar total = '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'NU3V0/'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'NU3V0T0T4L;';
                                    codigoGuardarVariableOperacionSQL += '\n\twindow["'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'"] = total;';
                                }
                            }
                            //};
                        //}
                        if(totalVarCreadasNivel == totalVarACrearNivel) {
                            codigoCuerpo += codigoGuardarVariables;
                            //solo crear codigo for una vez por variable
                            /*if((arregloDeVariables[i].esObjeto || arregloDeVariables[i].esInstruccionSQL) && !arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.esValorManual)
                                codigoCuerpo += '\n\t};\n';*/
                            codigo += codigoIniciacionVarPrimitiva + codigoCuerpo + codigoGuardarVariableOperacionSQL;
                        }
                    }
                };
            }
        };

        for (var i = 0; i < arregloDeExcel.length; i++) {
            for (var p = 0; p < arregloDeExcel[i].variables.length; p++) {
                var variablesInstanciadasID = [], variablesGuardadasID = [];
                if(arregloAgrupacionElementosFormulaPorVariables[i] != undefined && arregloAgrupacionElementosFormulaPorVariables[i][p] != undefined &&  arregloAgrupacionElementosFormulaPorVariables[i][p].length != undefined) {
                    var totalVarACrearNivel = 0;
                    for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariables[i][p].length; j++) {
                        if(arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nivel == nivelACrear) {
                            totalVarACrearNivel++;
                        }
                    };
                    var codigoCuerpo = '';
                    var codigoIniciacionVarPrimitiva = '';
                    var codigoGuardarVariables = '';
                    var totalVarCreadasNivel = 0;
                    var codigoGuardarVariableOperacionSQL = '';
                    for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariables[i][p].length; j++) {
                        if(arregloDeExcel[i].variables[p].ID == arregloAgrupacionElementosFormulaPorVariables[i][p][j].variableCreacionCodigo.ID && !this.verificarExistenciaErroresExcel(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variableCreacionCodigo) && arregloDeExcel[i].variables[p].nombre.localeCompare(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variableCreacionCodigo.nombre) == 0  && arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nivel == nivelACrear && arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.realizarCalculo) {
                            totalVarCreadasNivel++;
                            if(j == 0 && window[arregloDeExcel[i].variables[p].nombre].length != undefined) {
                                //solo crear codigo for una vez por variable
                                codigoCuerpo += '\n\t//CODIGO VARIABLE: '+arregloDeExcel[i].variables[p].nombre;
                                codigoCuerpo += '\n\tfor ( var x = 0; x < window["'+arregloDeExcel[i].variables[p].nombre+'"].length; x++) {';
                            }
                            var varFueInicializada = false;
                            for (var w = 0; w < variablesInstanciadasID.length; w++) {
                                if (variablesInstanciadasID[w] == arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.ID) {
                                    varFueInicializada = true;
                                    break;
                                }
                            };
                            /*if(!varFueInicializada) {
                                variablesInstanciadasID.push(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.ID);*/
                                if(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.esObjeto) {
                                    if(!varFueInicializada) {
                                        variablesInstanciadasID.push(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.ID);
                                        codigoCuerpo += '\n\t\t//INICIACION VARIABLE: '+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre;
                                        codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable, "variable", {}, '\t\t'); //variable, tipoVariable, atributo
                                    }
                                    //for (var p = 0; p < arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.atributos.length; p++) {
                                        var contieneOperacionSQL = false, esPromedio = false;
                                        //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)
                                        if( this.existeOperacion(arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas.length-1].operacion) )
                                            contieneOperacionSQL = true;
                                        if( arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0 )
                                            esPromedio = true;
                                        if(!contieneOperacionSQL)
                                            codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo, '\t\t', false, esPromedio);
                                        else {
                                            codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo, '\t\t', false, false);
                                            codigoIniciacionVarPrimitiva += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo, '\t', true, esPromedio);
                                        }
                                    //};
                                } else {
                                    codigoIniciacionVarPrimitiva += '\n\t//INICIACION VARIABLE: '+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre;
                                    for (var k = 0; k < arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.atributos.length; k++) {
                                        var esPromedio = false;
                                        if( arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0 )
                                            esPromedio = true;
                                        codigoIniciacionVarPrimitiva += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable, "atributo", arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.atributos[k], '\t', false, esPromedio);
                                    };
                                }
                            //}
                            //if(arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nivel == nivelACrear) {
                                var posicionVariable = 0, posicionCampo = 0;
                                EncontrarPosiciones:
                                for (var a = 0; a < arregloDeVariables.length; a++) {
                                    if(arregloDeVariables[a].ID == arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.ID) {
                                        posicionVariable = a;
                                        for (var b = 0; b < arregloDeVariables[a].atributos.length; b++) {
                                            if(arregloDeVariables[a].atributos[b].ID == arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.ID) {
                                                posicionCampo = b;
                                                break EncontrarPosiciones;
                                            }
                                        };
                                    }
                                };
                                var esArregloReferenciaArregloEnCodigo = false;
                                if(window[arregloDeExcel[i].variables[p].nombre].length != undefined)
                                    codigoCuerpo += this.crearCodigoSegmentoReglasFormaOExcel(arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla, arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas, 2, posicionVariable, posicionCampo, "window['"+arregloDeExcel[i].variables[p].nombre+"'][x]", true);
                                else
                                    codigoCuerpo += this.crearCodigoSegmentoReglasFormaOExcel(arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla, arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas, 2, posicionVariable, posicionCampo, "window['"+arregloDeExcel[i].variables[p].nombre+"']", false);
                            //}
                            var varFueGuardada = false;
                            for (var w = 0; w < variablesGuardadasID.length; w++) {
                                if (variablesGuardadasID[w] == arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.ID) {
                                    varFueGuardada = true;
                                    break;
                                }
                            };
                            if(!varFueGuardada) {
                                variablesGuardadasID.push(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.ID);
                                codigoGuardarVariables += this.agregarCodigoGuardarVariable(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable, arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributos, 2);
                            }
                                //for (var p = 0; p < arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.atributos.length; p++) {
                                if(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.esObjeto || arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.esInstruccionSQL) {
                                    var contieneOperacionSQL = false;
                                    //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)
                                    if( this.existeOperacion(arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas.length-1].operacion) )
                                        contieneOperacionSQL = true;
                                    if(contieneOperacionSQL && arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") != 0 )
                                        codigoGuardarVariableOperacionSQL += '\n\tguardarOperacionSQL(window["'+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+'"], "'+arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre+'", '+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre+'NU3V0);';
                                    else if(contieneOperacionSQL && arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0 ) {
                                        //NU3V0T0T4L
                                        codigoGuardarVariableOperacionSQL += '\n\tif('+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre+'NU3V0T0T4L != 0 || '+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre+'NU3V0T0T4L != -1) {';
                                        codigoGuardarVariableOperacionSQL += '\n\t\tvar total = '+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre+'NU3V0/'+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre+'NU3V0T0T4L;';
                                        codigoGuardarVariableOperacionSQL += '\n\t\tguardarOperacionSQL(window["'+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+'"], "'+arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre+'", total);';
                                        codigoGuardarVariableOperacionSQL += '\n\t}';
                                    } else if(!arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.esObjeto && !arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.esInstruccionSQL && arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0) {
                                        codigoGuardarVariableOperacionSQL += '\n\tvar total = '+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+'NU3V0/'+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+'NU3V0T0T4L;';
                                        codigoGuardarVariableOperacionSQL += '\n\twindow["'+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+'"] = total;';
                                    }
                                }
                                //};
                            //}
                            if(totalVarCreadasNivel == totalVarACrearNivel) {
                                codigoCuerpo += codigoGuardarVariables;
                                //solo crear codigo for una vez por variable
                                if(window[arregloDeExcel[i].variables[p].nombre].length != undefined)
                                    codigoCuerpo += '\n\t};\n';
                                codigo += codigoIniciacionVarPrimitiva + codigoCuerpo + codigoGuardarVariableOperacionSQL;
                            }
                        }
                    };
                }
            };
        };
        return codigo;
    }

    arregloCodigoRegla (regla, tabs, posicionVariable, posicionCampo, arreglo, arregloDeReglas, nombreReferenciaArregloEnCodigo, esArregloReferenciaArregloEnCodigo) {
        var tabsText = '';
        for (var i = 0; i < tabs; i++) {
            tabsText+='\t';
        };
        var posicionesIF = [];
        var newTabsTextFormula = '';
        if(!regla.esCondicion) {
            //asignaciones
            //si no es condicion, la variable de referencia se le agrega NU3V0 que hace referencia al objeto temporal vacio
            if(regla.operacion.indexOf('ASIG') == 0) {
                //trayendo formula correcta
                var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    if(arregloDeVariables[posicionVariable].esObjeto) {
                        if(esArregloReferenciaArregloEnCodigo) {
                            if(formula[0].fuenteDeDatos != undefined && formula[0].fuenteDeDatos[0].esValorManual) {
                                arreglo.push({codigo: tabsText+"if ('"+formula[0].fuenteDeDatos[0].nombreVariable+"' != undefined) {", tipo: "ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" = '"+formula[0].fuenteDeDatos[0].nombreVariable+"';", tipo: "ASIG"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined) {", tipo: "ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+";", tipo: "ASIG"});
                            }
                        } else {
                            if(formula[0].fuenteDeDatos != undefined && formula[0].fuenteDeDatos[0].esValorManual) {
                                arreglo.push({codigo: tabsText+"if ('"+formula[0].fuenteDeDatos[0].nombreVariable+"' != undefined) {", tipo: "ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" = '"+formula[0].fuenteDeDatos[0].nombreVariable+"';", tipo: "ASIG"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" = "+nombreReferenciaArregloEnCodigo+";", tipo: "ASIG"});
                            }
                        }
                    } else {
                        if(esArregloReferenciaArregloEnCodigo) {
                            if(formula[0].fuenteDeDatos != undefined && formula[0].fuenteDeDatos[0].esValorManual) {
                                arreglo.push({codigo: tabsText+"if ('"+formula[0].fuenteDeDatos[0].nombreVariable+"' != undefined) {", tipo: "ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = '"+formula[0].fuenteDeDatos[0].nombreVariable+"';", tipo: "ASIG"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined) {", tipo: "ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+";", tipo: "ASIG"});
                            }
                        } else {
                            if(formula[0].fuenteDeDatos != undefined && formula[0].fuenteDeDatos[0].esValorManual) {
                                arreglo.push({codigo: tabsText+"if ('"+formula[0].fuenteDeDatos[0].nombreVariable+"' != undefined) {", tipo: "ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = '"+formula[0].fuenteDeDatos[0].nombreVariable+"';", tipo: "ASIG"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "ASIG"});
                            }
                        }
                    }
                    arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                    arreglo.push({codigo: "\n"+tabsText+"}", tipo: "ASIG"});
                    /*arreglo.push({codigo: "\n"+tabsText+"} else {\n", tipo: "ASIG"});
                    arreglo.push({codigo: "\n"+tabsText+"\tarregloDeErroresVariables.push({nombre: nombreVariable, ID: id})\n", tipo: "ASIG"});
                    arreglo.push({codigo: "\n"+tabsText+"} else {", tipo: "ASIG"});*/
                }
            } else if(regla.operacion.indexOf('MAX') == 0) {
                //trayendo formula correcta
                var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0) {
                        if(arregloDeVariables[posicionVariable].esObjeto) {
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getTime() < "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+".getTime()) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getMonth() == 4 && "+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getDate() == 28 )", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getTime() < "+nombreReferenciaArregloEnCodigo+".getTime()) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getMonth() == 4 && "+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getDate() == 28 )", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        } else {
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0.getTime() < "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+".getTime()) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeVariables[posicionVariable].nombre+"NU3V0.getMonth() == 4 && "+arregloDeVariables[posicionVariable].nombre+"NU3V0.getDate() == 28)", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0.getTime() < "+nombreReferenciaArregloEnCodigo+".getTime()) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"})
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeVariables[posicionVariable].nombre+"NU3V0.getMonth() == 4 && "+arregloDeVariables[posicionVariable].nombre+"NU3V0.getDate() == 28)", tipo: "MAX"});;
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        }
                    } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || arregloDeVariables[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("decimal") == 0) {
                        if(arregloDeVariables[posicionVariable].esObjeto) {
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 < "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+";", tipo: "MAX"});
                                //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 < "+nombreReferenciaArregloEnCodigo+") {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                                //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        } else {
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 < "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 < "+nombreReferenciaArregloEnCodigo+") {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        }
                    }
                }
            } else if(regla.operacion.indexOf('MIN') == 0) {
                //trayendo formula correcta
                var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0) {
                        if(arregloDeVariables[posicionVariable].esObjeto) {
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getTime() > "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+".getTime()) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getMonth() == 4 && "+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getDate() == 28)", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getTime() > "+nombreReferenciaArregloEnCodigo+".getTime()) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getMonth() == 4 && "+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getDate() == 28)", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        } else {
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0.getTime() > "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+".getTime()) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeVariables[posicionVariable].nombre+"NU3V0.getMonth() == 4 && "+arregloDeVariables[posicionVariable].nombre+"NU3V0.getDate() == 28)", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0.getTime() > "+nombreReferenciaArregloEnCodigo+".getTime()) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeVariables[posicionVariable].nombre+"NU3V0.getMonth() == 4 && "+arregloDeVariables[posicionVariable].nombre+"NU3V0.getDate() == 28) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        }
                    } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || arregloDeVariables[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("decimal") == 0) {
                        if(arregloDeVariables[posicionVariable].esObjeto) {
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 > "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" || "+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+";", tipo: "MAX"});
                                //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 > "+nombreReferenciaArregloEnCodigo+" || "+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                                //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        } else {
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 > "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+"} else if( "+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1  ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 > "+nombreReferenciaArregloEnCodigo+") {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+"} else if( "+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1 ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        }
                    }
                }
            } else if(regla.operacion.indexOf('PROM') == 0) {
                //trayendo formula correcta
                var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || arregloDeVariables[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("decimal") == 0) {
                        if(arregloDeVariables[posicionVariable].esObjeto) {
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( "+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 += "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0T0T4L++;", tipo: "MAX"});
                                //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( "+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 += "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0T0T4L++;", tipo: "MAX"});
                                //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        } else {
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( "+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = 0;", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 += "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0T0T4L++;", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( "+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = 0;", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 += "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0T0T4L++;", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        }
                    }
                }
            } else if(regla.operacion.indexOf('AUTOSUM') == 0) {
                //trayendo formula correcta
                var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("decimal") == 0) {
                        if(arregloDeVariables[posicionVariable].esObjeto) {
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+")) {", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1)", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "AUTOSUM"});
                                //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = evaluate("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 + "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "AUTOSUM"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1)", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "AUTOSUM"});
                                //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = evaluate("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 + "+nombreReferenciaArregloEnCodigo+");", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "AUTOSUM"});
                            }
                        } else {
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+")) {", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1)", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = 0;", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = evaluate("+arregloDeVariables[posicionVariable].nombre+"NU3V0 + "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "AUTOSUM"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1)", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = 0;", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = evaluate("+arregloDeVariables[posicionVariable].nombre+"NU3V0 + "+nombreReferenciaArregloEnCodigo+");", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "AUTOSUM"});
                            }
                        }
                    }
                }
            } else if(regla.operacion.indexOf('COUNT') == 0) {
                var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("decimal") == 0) {
                    if(arregloDeVariables[posicionVariable].esObjeto) {
                        if(esArregloReferenciaArregloEnCodigo) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") ) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+") && !isNaN("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        }
                    } else {
                        if(esArregloReferenciaArregloEnCodigo) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") ) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0++;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0++;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        }
                    }
                } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("varchar") == 0) {
                    if(arregloDeVariables[posicionVariable].esObjeto) {
                        if(esArregloReferenciaArregloEnCodigo) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+".length > 0) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && "+nombreReferenciaArregloEnCodigo+".length > 0) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        }
                    } else {
                        if(esArregloReferenciaArregloEnCodigo) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+".length > 0) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0++;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && "+nombreReferenciaArregloEnCodigo+".length > 0) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0++;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        }
                    }
                } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("bool") == 0) {
                    if(arregloDeVariables[posicionVariable].esObjeto) {
                        if(esArregloReferenciaArregloEnCodigo) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" == true || "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" == false) ) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && ("+nombreReferenciaArregloEnCodigo+" == true || "+nombreReferenciaArregloEnCodigo+" == false) ) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        }
                    } else {
                        if(esArregloReferenciaArregloEnCodigo) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" == true || "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" == false) ) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0++;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && ("+nombreReferenciaArregloEnCodigo+" == true || "+nombreReferenciaArregloEnCodigo+" == false) ) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0++;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        }
                    }
                } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0) {
                    if(arregloDeVariables[posicionVariable].esObjeto) {
                        if(esArregloReferenciaArregloEnCodigo) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") ) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+") {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        }
                    } else {
                        if(esArregloReferenciaArregloEnCodigo) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+")) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0++;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+")) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0++;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        }
                    }
                }
            } else if(regla.operacion.indexOf('FORMULA') == 0) {
                var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                for (var i = 0; i < formula[0].fuenteDeDatos.length; i++) {
                    var saltoLinea = '\n';
                    if(formula[0].fuenteDeDatos[i].operacion != undefined && formula[0].fuenteDeDatos[i].operacion.length > 0) {
                        //if(formula[0].fuenteDeDatos[i].esFuenteDeDato) {
                            //elemento formula es de conexion de tabla
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[i].nombreColumnaEnTabla+" != undefined) {", tipo: "FORMULA"});
                                newTabsTextFormula += "\t";
                                arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[i].nombreColumnaEnTabla+";", tipo: "FORMULA"});
                                /*arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log('"+formula[0].fuenteDeDatos[i].nombreVariable+"');", tipo: "FORMULA"});
                                arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log("+formula[0].fuenteDeDatos[i].nombreVariable+");", tipo: "FORMULA"});*/
                            } else {
                                arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if (window['"+formula[0].fuenteDeDatos[i].nombreColumnaEnTabla+"'] != undefined) {", tipo: "FORMULA"});
                                newTabsTextFormula += "\t";
                                arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = window['"+formula[0].fuenteDeDatos[i].nombreColumnaEnTabla+"'];", tipo: "FORMULA"});
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
                };
                //arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" = math.eval(formula[0].formula);"});
                if(arregloDeVariables[posicionVariable].esObjeto)
                    arreglo.push({codigo: "\n"+tabsText+newTabsTextFormula+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" = "+formula[0].formula+";"});
                else
                    arreglo.push({codigo: "\n"+tabsText+newTabsTextFormula+arregloDeVariables[posicionVariable].nombre+"NU3V0 = evaluate("+formula[0].formula+");"});
                arreglo.push({codigo: "\n"+tabsText+newTabsTextFormula+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                for (var i = formula[0].fuenteDeDatos.length; i > 0; i--) {
                    posicionesIF.push(arreglo.length+i);
                }
            }
        } else {
            //condiciones if
            var arregloValoresAComparar = [];
            if(regla.valor.indexOf("LISTAID") == 0) {
                //
            } else if(regla.valor.indexOf("FECHA") == 0) {
                var fecha = regla.valor.substring(regla.valor.indexOf("[")+1, regla.valor.lastIndexOf("]"));
                arregloValoresAComparar = ["new Date("+fecha+").getTime()"];
            } else if(regla.valor.indexOf("TIEMPO") == 0) {
                var stringValores = regla.valor.substring(regla.valor.indexOf("[")+1, regla.valor.lastIndexOf("]"));
                var diasAgregarCadena = stringValores.split(",")[0], mesesAgregarCadena = stringValores.split(",")[1], aniosAgregarCadena = stringValores.split(",")[2], futuro = stringValores.split(",")[3];
                var diasAgregar = parseInt(diasAgregarCadena.indexOf("=")+1), mesesAgregar = parseInt(mesesAgregarCadena.indexOf("=")+1), aniosAgregar = parseInt(aniosAgregarCadena.indexOf("=")+1);
                var esFuturo = true;
                if(futuro.localeCompare("FUTURO") == 0)
                    esFuturo = true;
                else
                    esFuturo = false;
                var hoy = new Date();
                if(esFuturo) {
                    hoy = this.addYears(hoy, aniosAgregar);
                    hoy = this.addMonths(hoy, mesesAgregar);
                    hoy = this.addDays(hoy, diasAgregar);
                } else {
                    hoy = this.minusDays(hoy, diasAgregar);
                    hoy = this.minusMonths(hoy, mesesAgregar);
                    hoy = this.minusYears(hoy, aniosAgregar);
                }
                arregloValoresAComparar = ["new Date("+hoy.getFullYear()+", "+hoy.getMonth()+", "+hoy.getDate()+").getTime()"];
            } else if(regla.valor.indexOf("MANUAL") == 0) {
                arregloValoresAComparar = [regla.valor.substring(regla.valor.indexOf("[")+1, regla.valor.lastIndexOf("]"))];
            }
            var nombreCampoDeArregloEnCodigo = '';
            if(regla.esConexionTabla) {
                nombreCampoDeArregloEnCodigo = regla.nombreColumnaEnTabla;
            } else {
                nombreCampoDeArregloEnCodigo = arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre;
            }
            var tamArreglo = arreglo.length;
            //for (var j = 0; j < tamArreglo; j++) {
                for (var i = 0; i < arregloValoresAComparar.length; i++) {
                    var comparacion = "";
                    var inicioComparacion = "";
                    var operacion = "";
                    if(regla.operacion.localeCompare("ES_MENOR") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
                        operacion = "<";
                    } else if(regla.operacion.localeCompare("ES_MENOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
                        operacion = "<=";
                    } else if(regla.operacion.localeCompare("ES_MAYOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
                        operacion = ">=";
                    } else if(regla.operacion.localeCompare("ES_MAYOR") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
                        operacion = ">";
                    } else if(regla.operacion.localeCompare("ES_IGUAL") == 0) {
                        operacion = "==";
                    } else if(regla.operacion.localeCompare("NO_ES_IGUAL") == 0) {
                        operacion = "!=";
                    } else if(regla.operacion.localeCompare("ES_MENOR") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = ">";
                    } else if(regla.operacion.localeCompare("ES_MENOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = ">=";
                    } else if(regla.operacion.localeCompare("ES_MAYOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = "<=";
                    } else if(regla.operacion.localeCompare("ES_MAYOR") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = "<";
                    } else if(regla.operacion.localeCompare("ES_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = "==";
                    } else if(regla.operacion.localeCompare("NO_ES_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = "!=";
                    }
                    if (regla.tipoCampoObjetivo.localeCompare("date") == 0) {
                        if(regla.operacion.localeCompare("encuentra") == 0) {
                            //
                        } else if(regla.operacion.localeCompare("no_encuentra") == 0) {
                            //
                        } else {
                            if(esArregloReferenciaArregloEnCodigo) {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+")";
                                comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+".getTime() "+operacion+" "+arregloValoresAComparar[i];
                            } else {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+")";
                                comparacion = nombreReferenciaArregloEnCodigo+".getTime() "+operacion+" "+arregloValoresAComparar[i];
                            }
                        }
                    } else if (regla.tipoCampoObjetivo.localeCompare("varchar") == 0) {
                        if(regla.operacion.localeCompare("encuentra") == 0) {
                            //
                        } else if(regla.operacion.localeCompare("no_encuentra") == 0) {
                            //
                        } else {
                            if(esArregloReferenciaArregloEnCodigo) {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" != undefined";
                                comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+".localeCompare('"+arregloValoresAComparar[i]+"') "+operacion+" 0";
                            } else {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+" != undefined";
                                comparacion = nombreReferenciaArregloEnCodigo+".localeCompare('"+arregloValoresAComparar[i]+"') "+operacion+" 0";
                            }
                        }
                    } else if (regla.tipoCampoObjetivo.localeCompare("int") == 0 || regla.tipoCampoObjetivo.localeCompare("decimal") == 0) {
                        if(regla.operacion.localeCompare("encuentra") == 0) {
                            //
                        } else if(regla.operacion.localeCompare("no_encuentra") == 0) {
                            //
                        } else {
                            if(esArregloReferenciaArregloEnCodigo) {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+")"
                                comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" "+operacion+" "+arregloValoresAComparar[i];
                            } else {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")"
                                comparacion = nombreReferenciaArregloEnCodigo+" "+operacion+" "+arregloValoresAComparar[i];
                            }
                        }
                    } else if (regla.tipoCampoObjetivo.localeCompare("bit") == 0) {
                        if(esArregloReferenciaArregloEnCodigo) {
                            inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" != undefined"
                            comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" "+operacion+" "+arregloValoresAComparar[i];
                        } else {
                            inicioComparacion = nombreReferenciaArregloEnCodigo+" != undefined"
                            comparacion = nombreReferenciaArregloEnCodigo+" "+operacion+" "+arregloValoresAComparar[i];
                        }
                    }
                    if(i+1 == arregloValoresAComparar.length) {
                        comparacion += " ) {";
                    }
                    if(i==0) {
                        //arreglo[j].codigo += comparacion;
                        //arreglo.push({codigo: tabsText+"console.log("+nombreReferenciaArregloEnCodigo+"[x]);", tipo: "COMPARACION"});
                        //arreglo.push({codigo: '\n'+tabsText+"console.log( "+nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+");", tipo: "COMPARACION"});
                        arreglo.push({codigo: '\n'+tabsText+"if ( "+inicioComparacion+" && "+comparacion, tipo: "COMPARACION"});
                    } else {
                        arreglo[arreglo.length-1].codigo += " && "+comparacion;
                    }
                };
                /*console.log("ENTROOO j");
            };*/
            posicionesIF.push(arreglo.length);
        }

        var cuerpo = arregloDeReglas.filter(function( object ) {
            return object.reglaPadreID == regla.ID;
        });
        if(cuerpo.length > 0) {
            var arregloCuerpo = [];
            for (var i = 0; i < cuerpo.length; i++) {
                /*var cuantasTabs = tabs;
                if(regla.esCondicion)
                    cuantasTabs++;*/
                var retorno = this.arregloCodigoRegla(cuerpo[i], tabs+1, posicionVariable, posicionCampo, [], arregloDeReglas, nombreReferenciaArregloEnCodigo, esArregloReferenciaArregloEnCodigo);
                retorno[0].codigo = "\n"+retorno[0].codigo;
                $.merge( arregloCuerpo, retorno );
            };
            for (var i = 0; i < posicionesIF.length; i++) {
                arreglo.splice(posicionesIF[i], 0, ...arregloCuerpo);
                if(regla.esCondicion)
                    arreglo.splice(posicionesIF[i]+arregloCuerpo.length, 0, {codigo: "\n"+tabsText+"}", filtro: regla.filtro});
                for (var j = i; j < posicionesIF.length; j++) {
                    posicionesIF[j]+=arregloCuerpo.length;
                };
            };
            if(posicionesIF.length == 0)
                $.merge( arreglo, arregloCuerpo );
            return arreglo;
        } else {
            if(regla.esCondicion || posicionesIF.length > 0){
                for (var i = 0; i < posicionesIF.length; i++) {
                    if (newTabsTextFormula.length > 0)
                        newTabsTextFormula = newTabsTextFormula.substring(0, newTabsTextFormula.length - 1);
                    arreglo.splice(posicionesIF[i], 0, {codigo: "\n"+tabsText+newTabsTextFormula+"}", filtro: regla.filtro})
                };
            }
            return arreglo;
        }
    }

























    arregloCodigoReglaFormaOExcel (regla, tabs, posicionVariable, posicionCampo, arreglo, arregloDeReglas, nombreReferenciaArregloEnCodigo, esArregloReferenciaArregloEnCodigo) {
        //a este metodo solo entra cuando la asignacion, max, min, ect es de solo variables formula o excel, o formulas solo es de excel o formulas
        var tabsText = '';
        for (var i = 0; i < tabs; i++) {
            tabsText+='\t';
        };
        var posicionesIF = [];
        var newTabsTextFormula = '';
        if(!regla.esCondicion) {
            //asignaciones
            //si no es condicion, la variable de referencia se le agrega NU3V0 que hace referencia al objeto temporal vacio
            if(regla.operacion.indexOf('ASIG') == 0) {
                //trayendo formula correcta
                var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    if(arregloDeVariables[posicionVariable].esObjeto) {
                        if(formula[0].fuenteDeDatos != undefined && formula[0].fuenteDeDatos[0].esValorManual) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" = '"+formula[0].fuenteDeDatos[0].nombreVariable+"';", tipo: "ASIG"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" = "+nombreReferenciaArregloEnCodigo+";", tipo: "ASIG"});
                        }
                    } else {
                        if(formula[0].fuenteDeDatos != undefined && formula[0].fuenteDeDatos[0].esValorManual) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = '"+formula[0].fuenteDeDatos[0].nombreVariable+"';", tipo: "ASIG"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "ASIG"});
                        }
                    }
                    arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                    arreglo.push({codigo: "\n"+tabsText+"}", tipo: "ASIG"});
                }
            } else if(regla.operacion.indexOf('MAX') == 0) {
                //trayendo formula correcta
                var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0) {
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "MAX"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "MAX"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0.getTime() < "+nombreReferenciaArregloEnCodigo+".getTime()) {", tipo: "MAX"});
                        arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                        arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"})
                        arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeVariables[posicionVariable].nombre+"NU3V0.getMonth() == 4 && "+arregloDeVariables[posicionVariable].nombre+"NU3V0.getDate() == 28)", tipo: "MAX"});;
                        arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                        arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                    } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || arregloDeVariables[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("decimal") == 0) {
                        if(arregloDeVariables[posicionVariable].esObjeto) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 < "+nombreReferenciaArregloEnCodigo+") {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                            //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 < "+nombreReferenciaArregloEnCodigo+") {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                        }
                    }
                }
            } else if(regla.operacion.indexOf('MIN') == 0) {
                //trayendo formula correcta
                var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0) {
                        if(arregloDeVariables[posicionVariable].esObjeto) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getTime() > "+nombreReferenciaArregloEnCodigo+".getTime()) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getMonth() == 4 && "+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getDate() == 28)", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0.getTime() > "+nombreReferenciaArregloEnCodigo+".getTime()) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeVariables[posicionVariable].nombre+"NU3V0.getMonth() == 4 && "+arregloDeVariables[posicionVariable].nombre+"NU3V0.getDate() == 28) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                        }
                    } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || arregloDeVariables[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("decimal") == 0) {
                        if(arregloDeVariables[posicionVariable].esObjeto) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 > "+nombreReferenciaArregloEnCodigo+" || "+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                            //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 > "+nombreReferenciaArregloEnCodigo+") {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+"} else if( "+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1 ) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                        }
                    }
                }
            } else if(regla.operacion.indexOf('PROM') == 0) {
                //trayendo formula correcta
                var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || arregloDeVariables[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("decimal") == 0) {
                        if(arregloDeVariables[posicionVariable].esObjeto) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ( "+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 += "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0T0T4L++;", tipo: "MAX"});
                            //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ( "+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = 0;", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 += "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0T0T4L++;", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                        }
                    }
                }
            } else if(regla.operacion.indexOf('AUTOSUM') == 0) {
                //trayendo formula correcta
                var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("decimal") == 0) {
                        if(arregloDeVariables[posicionVariable].esObjeto) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "AUTOSUM"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1)", tipo: "AUTOSUM"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "AUTOSUM"});
                            //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = evaluate("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 + "+nombreReferenciaArregloEnCodigo+");", tipo: "AUTOSUM"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "AUTOSUM"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "AUTOSUM"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1)", tipo: "AUTOSUM"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = 0;", tipo: "AUTOSUM"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = evaluate("+arregloDeVariables[posicionVariable].nombre+"NU3V0 + "+nombreReferenciaArregloEnCodigo+");", tipo: "AUTOSUM"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "AUTOSUM"});
                        }
                    }
                }
            } else if(regla.operacion.indexOf('COUNT') == 0) {
                var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("decimal") == 0) {
                    if(arregloDeVariables[posicionVariable].esObjeto) {
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+") && !isNaN("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                        //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                    } else {
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0++;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                    }
                } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("varchar") == 0) {
                    if(arregloDeVariables[posicionVariable].esObjeto) {
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && "+nombreReferenciaArregloEnCodigo+".length > 0) {", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                        //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                    } else {
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && "+nombreReferenciaArregloEnCodigo+".length > 0) {", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0++;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                    }
                } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("bool") == 0) {
                    if(arregloDeVariables[posicionVariable].esObjeto) {
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && ("+nombreReferenciaArregloEnCodigo+" == true || "+nombreReferenciaArregloEnCodigo+" == false) ) {", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                        //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                    } else {
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && ("+nombreReferenciaArregloEnCodigo+" == true || "+nombreReferenciaArregloEnCodigo+" == false) ) {", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0++;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                    }
                } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0) {
                    if(arregloDeVariables[posicionVariable].esObjeto) {
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+") {", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                        //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeVariables[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                    } else {
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+")) {", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0++;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                    }
                }
            } else if(regla.operacion.indexOf('FORMULA') == 0) {
                var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                for (var i = 0; i < formula[0].fuenteDeDatos.length; i++) {
                    var saltoLinea = '\n';
                    if(formula[0].fuenteDeDatos[i].operacion != undefined && formula[0].fuenteDeDatos[i].operacion.length > 0) {
                        //if(formula[0].fuenteDeDatos[i].esFuenteDeDato) {
                            //elemento formula es de conexion de tabla
                            arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if (window['"+formula[0].fuenteDeDatos[i].nombreColumnaEnTabla+"'] != undefined) {", tipo: "FORMULA"});
                            newTabsTextFormula += "\t";
                            arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = window['"+formula[0].fuenteDeDatos[i].nombreColumnaEnTabla+"'];", tipo: "FORMULA"});
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
                };
                //arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" = math.eval(formula[0].formula);"});
                if(arregloDeVariables[posicionVariable].esObjeto)
                    arreglo.push({codigo: "\n"+tabsText+newTabsTextFormula+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" = "+formula[0].formula+";"});
                else
                    arreglo.push({codigo: "\n"+tabsText+newTabsTextFormula+arregloDeVariables[posicionVariable].nombre+"NU3V0 = evaluate("+formula[0].formula+");"});
                arreglo.push({codigo: "\n"+tabsText+newTabsTextFormula+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                for (var i = formula[0].fuenteDeDatos.length; i > 0; i--) {
                    posicionesIF.push(arreglo.length+i);
                }
            }
        } else {
            //condiciones if
            var arregloValoresAComparar = [];
            if(regla.valor.indexOf("LISTAID") == 0) {
                //
            } else if(regla.valor.indexOf("FECHA") == 0) {
                var fecha = regla.valor.substring(regla.valor.indexOf("[")+1, regla.valor.lastIndexOf("]"));
                arregloValoresAComparar = ["new Date("+fecha+").getTime()"];
            } else if(regla.valor.indexOf("TIEMPO") == 0) {
                var stringValores = regla.valor.substring(regla.valor.indexOf("[")+1, regla.valor.lastIndexOf("]"));
                var diasAgregarCadena = stringValores.split(",")[0], mesesAgregarCadena = stringValores.split(",")[1], aniosAgregarCadena = stringValores.split(",")[2], futuro = stringValores.split(",")[3];
                var diasAgregar = parseInt(diasAgregarCadena.substring(diasAgregarCadena.indexOf("=")+1)), mesesAgregar = parseInt(mesesAgregarCadena.substring(mesesAgregarCadena.indexOf("=")+1)), aniosAgregar = parseInt(aniosAgregarCadena.substring(aniosAgregarCadena.indexOf("=")+1));
                var esFuturo = true;
                if(futuro.localeCompare("FUTURO") == 0)
                    esFuturo = true;
                else
                    esFuturo = false;
                var hoy = new Date();
                if(esFuturo) {
                    hoy = this.addYears(hoy, aniosAgregar);
                    hoy = this.addMonths(hoy, mesesAgregar);
                    hoy = this.addDays(hoy, diasAgregar);
                } else {
                    hoy = this.minusYears(hoy, aniosAgregar);
                    hoy = this.minusMonths(hoy, mesesAgregar);
                    hoy = this.minusDays(hoy, diasAgregar);
                }
                arregloValoresAComparar = ["new Date("+hoy.getFullYear()+", "+hoy.getMonth()+", "+hoy.getDate()+").getTime()"];
            } else if(regla.valor.indexOf("MANUAL") == 0) {
                arregloValoresAComparar = [regla.valor.substring(regla.valor.indexOf("[")+1, regla.valor.lastIndexOf("]"))];
            }
            var nombreCampoDeArregloEnCodigo = '';
            if(regla.esConexionTabla) {
                nombreCampoDeArregloEnCodigo = regla.nombreColumnaEnTabla;
            } else {
                nombreCampoDeArregloEnCodigo = arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre;
            }
            var tamArreglo = arreglo.length;
            //for (var j = 0; j < tamArreglo; j++) {
                for (var i = 0; i < arregloValoresAComparar.length; i++) {
                    var comparacion = "";
                    var inicioComparacion = "";
                    var operacion = "";
                    if(regla.operacion.localeCompare("ES_MENOR") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
                        operacion = "<";
                    } else if(regla.operacion.localeCompare("ES_MENOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
                        operacion = "<=";
                    } else if(regla.operacion.localeCompare("ES_MAYOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
                        operacion = ">=";
                    } else if(regla.operacion.localeCompare("ES_MAYOR") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
                        operacion = ">";
                    } else if(regla.operacion.localeCompare("ES_IGUAL") == 0) {
                        operacion = "==";
                    } else if(regla.operacion.localeCompare("NO_ES_IGUAL") == 0) {
                        operacion = "!=";
                    } else if(regla.operacion.localeCompare("ES_MENOR") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = ">";
                    } else if(regla.operacion.localeCompare("ES_MENOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = ">=";
                    } else if(regla.operacion.localeCompare("ES_MAYOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = "<=";
                    } else if(regla.operacion.localeCompare("ES_MAYOR") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = "<";
                    } else if(regla.operacion.localeCompare("ES_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = "==";
                    } else if(regla.operacion.localeCompare("NO_ES_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = "!=";
                    }
                    if (regla.tipoCampoObjetivo.localeCompare("date") == 0) {
                        if(regla.operacion.localeCompare("encuentra") == 0) {
                            //
                        } else if(regla.operacion.localeCompare("no_encuentra") == 0) {
                            //
                        } else {
                            if(esArregloReferenciaArregloEnCodigo) {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+")";
                                comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+".getTime() "+operacion+" "+arregloValoresAComparar[i];
                            } else {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+")";
                                comparacion = nombreReferenciaArregloEnCodigo+".getTime() "+operacion+" "+arregloValoresAComparar[i];
                            }
                        }
                    } else if (regla.tipoCampoObjetivo.localeCompare("varchar") == 0) {
                        if(regla.operacion.localeCompare("encuentra") == 0) {
                            //
                        } else if(regla.operacion.localeCompare("no_encuentra") == 0) {
                            //
                        } else {
                            if(esArregloReferenciaArregloEnCodigo) {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" != undefined";
                                comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+".localeCompare('"+arregloValoresAComparar[i]+"') "+operacion+" 0";
                            } else {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+" != undefined";
                                comparacion = nombreReferenciaArregloEnCodigo+".localeCompare('"+arregloValoresAComparar[i]+"') "+operacion+" 0";
                            }
                        }
                    } else if (regla.tipoCampoObjetivo.localeCompare("int") == 0 || regla.tipoCampoObjetivo.localeCompare("decimal") == 0) {
                        if(regla.operacion.localeCompare("encuentra") == 0) {
                            //
                        } else if(regla.operacion.localeCompare("no_encuentra") == 0) {
                            //
                        } else {
                            if(esArregloReferenciaArregloEnCodigo) {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+")"
                                comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" "+operacion+" "+arregloValoresAComparar[i];
                            } else {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")"
                                comparacion = nombreReferenciaArregloEnCodigo+" "+operacion+" "+arregloValoresAComparar[i];
                            }
                        }
                    } else if (regla.tipoCampoObjetivo.localeCompare("bit") == 0) {
                        if(esArregloReferenciaArregloEnCodigo) {
                            inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" != undefined"
                            comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" "+operacion+" "+arregloValoresAComparar[i];
                        } else {
                            inicioComparacion = nombreReferenciaArregloEnCodigo+" != undefined"
                            comparacion = nombreReferenciaArregloEnCodigo+" "+operacion+" "+arregloValoresAComparar[i];
                        }
                    }
                    if(i+1 == arregloValoresAComparar.length) {
                        comparacion += " ) {";
                    }
                    if(i==0) {
                        //arreglo[j].codigo += comparacion;
                        //arreglo.push({codigo: tabsText+"console.log("+nombreReferenciaArregloEnCodigo+"[x]);", tipo: "COMPARACION"});
                        //arreglo.push({codigo: '\n'+tabsText+"console.log( "+nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+");", tipo: "COMPARACION"});
                        arreglo.push({codigo: '\n'+tabsText+"if ( "+inicioComparacion+" && "+comparacion, tipo: "COMPARACION"});
                    } else {
                        arreglo[arreglo.length-1].codigo += " && "+comparacion;
                    }
                };
                /*console.log("ENTROOO j");
            };*/
            posicionesIF.push(arreglo.length);
        }

        var cuerpo = arregloDeReglas.filter(function( object ) {
            return object.reglaPadreID == regla.ID;
        });
        if(cuerpo.length > 0) {
            var arregloCuerpo = [];
            for (var i = 0; i < cuerpo.length; i++) {
                /*var cuantasTabs = tabs;
                if(regla.esCondicion)
                    cuantasTabs++;*/
                var retorno = this.arregloCodigoReglaFormaOExcel(cuerpo[i], tabs+1, posicionVariable, posicionCampo, [], arregloDeReglas, nombreReferenciaArregloEnCodigo), esArregloReferenciaArregloEnCodigo;
                retorno[0].codigo = "\n"+retorno[0].codigo;
                $.merge( arregloCuerpo, retorno );
            };
            for (var i = 0; i < posicionesIF.length; i++) {
                arreglo.splice(posicionesIF[i], 0, ...arregloCuerpo);
                if(regla.esCondicion)
                    arreglo.splice(posicionesIF[i]+arregloCuerpo.length, 0, {codigo: "\n"+tabsText+"}", filtro: regla.filtro});
                for (var j = i; j < posicionesIF.length; j++) {
                    posicionesIF[j]+=arregloCuerpo.length;
                };
            };
            if(posicionesIF.length == 0)
                $.merge( arreglo, arregloCuerpo );
            return arreglo;
        } else {
            if(regla.esCondicion || posicionesIF.length > 0){
                for (var i = 0; i < posicionesIF.length; i++) {
                    if (newTabsTextFormula.length > 0)
                        newTabsTextFormula = newTabsTextFormula.substring(0, newTabsTextFormula.length - 1);
                    arreglo.splice(posicionesIF[i], 0, {codigo: "\n"+tabsText+newTabsTextFormula+"}", filtro: regla.filtro})
                };
            }
            return arreglo;
        }
    }

    isValidDate (fecha) {
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

    existeOperacion (operacion) {
        if( operacion.localeCompare("COUNT") == 0 || 
            operacion.localeCompare("MAX") == 0 || 
            operacion.localeCompare("MIN") == 0 || 
            operacion.localeCompare("DATE") == 0 || 
            operacion.localeCompare("MONTH") == 0 || 
            operacion.localeCompare("YEAR") == 0 || 
            operacion.localeCompare("PROM") == 0 || 
            operacion.localeCompare("AUTOSUM") == 0 || 
            operacion.localeCompare("SUM") == 0 ) {
            return true;
        }
        return false;
    }

    guardarOperacionSQL (arreglo, campo, valorAInsertar) {
        if(arreglo.length != undefined) {
            // es coleccion
            for (var i = 0; i < arreglo.length; i++) {
                arreglo[i][campo] = valorAInsertar;
            };
        } else {
            // no es coleccion
            arreglo[campo] = valorAInsertar;
        }
    }

    //elementoFormula: objeto elementoFormula
    codigoElementosFormula (elementoFormula, tabSpaces, objetoEnTabla, instanciacion) {
        var columnasDeTablaSeleccionadas = this.getColumnasDeTablaSeleccionadas(elementoFormula);
        if(elementoFormula.operacion.length == 0 && columnasDeTablaSeleccionadas.length == 1) {
            this.codigoElementosFormulaAsignacion();
        } else if(elementoFormula.operacion.length > 0 && columnasDeTablaSeleccionadas.length == 1) {
            this.codigoElementosFormulaAsignacionOperacion();
        } else {
            this.codigoElementosFormulaGlobal();
        }
    }

    codigoElementosFormulaAsignacion (elementoFormula, tabSpaces, objetoEnTabla, instanciacion) {
        var cadenaRetorno = '';
        if(elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("date") == 0) {
            if(elementoFormula.fuenteDato.operacion.localeCompare("MAX") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\tif('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+'.getTime() > window['+instanciacion+'].getTime() && (window['+instanciacion+'].getDate() != 28 && window['+instanciacion+'].getMonth() != 5 && window['+instanciacion+'].getFullYear() != 1964) ) {';
                cadenaRetorno+='\n'+tabSpaces+'\t\twindow['+instanciacion+'] = new Date('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+')';
                cadenaRetorno+='\n'+tabSpaces+'\t} else if (window['+instanciacion+'].getDate() == 28 && window['+instanciacion+'].getMonth() == 5 && window['+instanciacion+'].getFullYear() == 1964) {'           //valor nulo
                cadenaRetorno+='\n'+tabSpaces+'\t\twindow['+instanciacion+'] = new Date('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+')';
                cadenaRetorno+='\n'+tabSpaces+'\t}';
                cadenaRetorno+='\n'+tabSpaces+'}';
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("MIN") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\tif('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+'.getTime() < window['+instanciacion+'].getTime() && (window['+instanciacion+'].getDate() != 28 && window['+instanciacion+'].getMonth() != 5 && window['+instanciacion+'].getFullYear() != 1964) ) {';
                cadenaRetorno+='\n'+tabSpaces+'\t\twindow['+instanciacion+'] = new Date('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+')';
                cadenaRetorno+='\n'+tabSpaces+'\t} else if (window['+instanciacion+'].getDate() == 28 && window['+instanciacion+'].getMonth() == 5 && window['+instanciacion+'].getFullYear() == 1964) {'           //valor nulo
                cadenaRetorno+='\n'+tabSpaces+'\t\twindow['+instanciacion+'] = new Date('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+')';
                cadenaRetorno+='\n'+tabSpaces+'\t}';
                cadenaRetorno+='\n'+tabSpaces+'}';
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("DIA") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("MES") == 0) {
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("AÑO") == 0) {
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            } else if(elementoFormula.fuenteDato.operacion.length == 0) {
            }
        } else if(elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("bool") == 0) {
            if(elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            }
        } else if(elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("bool") == 0) {
            if(elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            }
        } else if(elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("cadena") == 0) {
            if(elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            }
        }
    }

    codigoElementosFormulaAsignacionOperacion (elementoFormula, tabSpaces, objetoEnTabla, instanciacion) {
        var cadenaRetorno = '';
        if(elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("date") == 0) {
            if(elementoFormula.fuenteDato.operacion.localeCompare("MAX") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\tif('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+'.getTime() > window['+instanciacion+'].getTime() && (window['+instanciacion+'].getDate() != 28 && window['+instanciacion+'].getMonth() != 5 && window['+instanciacion+'].getFullYear() != 1964) ) {';
                cadenaRetorno+='\n'+tabSpaces+'\t\twindow['+instanciacion+'] = new Date('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+')';
                cadenaRetorno+='\n'+tabSpaces+'\t} else if (window['+instanciacion+'].getDate() == 28 && window['+instanciacion+'].getMonth() == 5 && window['+instanciacion+'].getFullYear() == 1964) {'           //valor nulo
                cadenaRetorno+='\n'+tabSpaces+'\t\twindow['+instanciacion+'] = new Date('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+')';
                cadenaRetorno+='\n'+tabSpaces+'\t}';
                cadenaRetorno+='\n'+tabSpaces+'}';
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("MIN") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\tif('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+'.getTime() < window['+instanciacion+'].getTime() && (window['+instanciacion+'].getDate() != 28 && window['+instanciacion+'].getMonth() != 5 && window['+instanciacion+'].getFullYear() != 1964) ) {';
                cadenaRetorno+='\n'+tabSpaces+'\t\twindow['+instanciacion+'] = new Date('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+')';
                cadenaRetorno+='\n'+tabSpaces+'\t} else if (window['+instanciacion+'].getDate() == 28 && window['+instanciacion+'].getMonth() == 5 && window['+instanciacion+'].getFullYear() == 1964) {'           //valor nulo
                cadenaRetorno+='\n'+tabSpaces+'\t\twindow['+instanciacion+'] = new Date('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+')';
                cadenaRetorno+='\n'+tabSpaces+'\t}';
                cadenaRetorno+='\n'+tabSpaces+'}';
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("DIA") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("MES") == 0) {
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("AÑO") == 0) {
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            } else if(elementoFormula.fuenteDato.operacion.length == 0) {
            }
        } else if(elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("bool") == 0) {
            if(elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            }
        } else if(elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("bool") == 0) {
            if(elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            }
        } else if(elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("cadena") == 0) {
            if(elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            }
        }
    }

    codigoElementosFormulaGlobal (elementoFormula, tabSpaces, objetoEnTabla, instanciacion) {
        var cadenaRetorno = '';
        if(elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("date") == 0) {
            if(elementoFormula.fuenteDato.operacion.localeCompare("MAX") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\tif('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+'.getTime() > window['+instanciacion+'].getTime() && (window['+instanciacion+'].getDate() != 28 && window['+instanciacion+'].getMonth() != 5 && window['+instanciacion+'].getFullYear() != 1964) ) {';
                cadenaRetorno+='\n'+tabSpaces+'\t\twindow['+instanciacion+'] = new Date('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+')';
                cadenaRetorno+='\n'+tabSpaces+'\t} else if (window['+instanciacion+'].getDate() == 28 && window['+instanciacion+'].getMonth() == 5 && window['+instanciacion+'].getFullYear() == 1964) {'           //valor nulo
                cadenaRetorno+='\n'+tabSpaces+'\t\twindow['+instanciacion+'] = new Date('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+')';
                cadenaRetorno+='\n'+tabSpaces+'\t}';
                cadenaRetorno+='\n'+tabSpaces+'}';
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("MIN") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\tif('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+'.getTime() < window['+instanciacion+'].getTime() && (window['+instanciacion+'].getDate() != 28 && window['+instanciacion+'].getMonth() != 5 && window['+instanciacion+'].getFullYear() != 1964) ) {';
                cadenaRetorno+='\n'+tabSpaces+'\t\twindow['+instanciacion+'] = new Date('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+')';
                cadenaRetorno+='\n'+tabSpaces+'\t} else if (window['+instanciacion+'].getDate() == 28 && window['+instanciacion+'].getMonth() == 5 && window['+instanciacion+'].getFullYear() == 1964) {'           //valor nulo
                cadenaRetorno+='\n'+tabSpaces+'\t\twindow['+instanciacion+'] = new Date('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+')';
                cadenaRetorno+='\n'+tabSpaces+'\t}';
                cadenaRetorno+='\n'+tabSpaces+'}';
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("DIA") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("MES") == 0) {
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("AÑO") == 0) {
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            } else if(elementoFormula.fuenteDato.operacion.length == 0) {
            }
        } else if(elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("bool") == 0) {
            if(elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            }
        } else if(elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("bool") == 0) {
            if(elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            }
        } else if(elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("cadena") == 0) {
            if(elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            }
        }
    }


























    crearCodigoFuenteDatoIndicadores (llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorConexionATabla, nivelACrear) {
        //la creacion del codigo en esta parte pertenece a los campos que tienen asignacion unica de columna de tabla, y asignacion unica de columna de tabla con operacion como SUM, COUNT ect
        var codigo = '';
        for (var i = 0; i < arregloConexionesATablas.length; i++) {
            var variablesInstanciadasID = [], variablesGuardadasID = [];
            if(!arregloConexionesATablas[i].esInstruccionSQL && arregloAgrupacionElementosFormulaPorConexionATabla[i] != undefined) {
                var codigoCuerpo = '';
                var codigoIniciacionVarPrimitiva = '';
                var codigoGuardarVariables = '';
                var codigoGuardarVariableOperacionSQL = '';
                for (var j = 0; j < arregloAgrupacionElementosFormulaPorConexionATabla[i].length; j++) {
                    if(arregloConexionesATablas[i].ID == arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.conexionTablaID && arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.realizarCalculo) {
                        if(j == 0) {
                            //solo crear codigo for una vez por variable
                            codigoCuerpo += '\n\t//CODIGO TABLA: '+arregloConexionesATablas[i].nombre;
                            codigoCuerpo += '\n\tfor ( var i = '+i+'; i < '+(i+1)+'; i++) {';
                            codigoCuerpo += '\n\t\tfor ( var x = 0; x < arregloResultadosDeTablas[i].length; x++) {';
                        }
                        var varFueInicializada = false;
                        for (var w = 0; w < variablesInstanciadasID.length; w++) {
                            if (variablesInstanciadasID[w] == arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.ID) {
                                varFueInicializada = true;
                                break;
                            }
                        };
                        /*if(!varFueInicializada) {
                            variablesInstanciadasID.push(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.ID);*/
                            if(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.esObjeto) {
                                if(!varFueInicializada) {
                                    variablesInstanciadasID.push(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.ID);
                                    codigoCuerpo += '\n\t\t\t//INICIACION VARIABLE: '+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre;
                                    codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable, "variable", {}, '\t\t\t'); //variable, tipoVariable, atributo
                                }
                                //for (var p = 0; p < arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.atributos.length; p++) {
                                    var contieneOperacionSQL = false, esPromedio = false;
                                    //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)
                                    if( this.existeOperacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length-1].operacion) )
                                        contieneOperacionSQL = true;
                                    if( arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0 )
                                        esPromedio = true;
                                    if(!contieneOperacionSQL)
                                        codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo, '\t\t\t', false, esPromedio);
                                    else {
                                        codigoCuerpo += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo, '\t\t\t', false, false);
                                        codigoIniciacionVarPrimitiva += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo, '\t', true, esPromedio);
                                    }
                                //};
                            } else {
                                codigoIniciacionVarPrimitiva += '\n\t//INICIACION VARIABLE: '+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre;
                                for (var p = 0; p < arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.atributos.length; p++) {
                                    var esPromedio = false;
                                    if( arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0 )
                                        esPromedio = true;
                                    codigoIniciacionVarPrimitiva += '\n' + this.codigoIniciacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable, "atributo", arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.atributos[p], '\t', false, esPromedio);
                                };
                            }
                        //}
                        if(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nivel == nivelACrear) {
                            var posicionVariable = 0, posicionCampo = 0;
                            EncontrarPosiciones:
                            for (var a = 0; a < arregloDeVariables.length; a++) {
                                if(arregloDeVariables[a].ID == arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.ID) {
                                    posicionVariable = a;
                                    for (var b = 0; b < arregloDeVariables[a].atributos.length; b++) {
                                        if(arregloDeVariables[a].atributos[b].ID == arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.ID) {
                                            posicionCampo = b;
                                            break EncontrarPosiciones;
                                        }
                                    };
                                }
                            };
                            var esArregloReferenciaArregloEnCodigo = arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.esObjeto;
                            codigoCuerpo += this.crearCodigoSegmentoReglas(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla, arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas, 3, posicionVariable, posicionCampo, "arregloResultadosDeTablas[i]", true);
                        }
                        var varFueGuardada = false;
                        for (var w = 0; w < variablesGuardadasID.length; w++) {
                            if (variablesGuardadasID[w] == arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.ID) {
                                varFueGuardada = true;
                                break;
                            }
                        };
                        if(!varFueGuardada) {
                            variablesGuardadasID.push(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.ID);
                            codigoGuardarVariables += this.agregarCodigoGuardarVariable(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable, arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributos, 3);
                        }
                            //for (var p = 0; p < arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.atributos.length; p++) {
                            if(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.esObjeto || arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.esInstruccionSQL) {
                                var contieneOperacionSQL = false;
                                //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)
                                if( this.existeOperacion(arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length-1].operacion) )
                                    contieneOperacionSQL = true;
                                if(contieneOperacionSQL && arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") != 0 )
                                    codigoGuardarVariableOperacionSQL += '\n\tguardarOperacionSQL(window["'+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+'"], "'+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre+'", '+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre+'NU3V0);';
                                else if(contieneOperacionSQL && arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0 ) {
                                    codigoGuardarVariableOperacionSQL += '\n\tif('+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre+'NU3V0T0T4L != 0 || '+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre+'NU3V0T0T4L != -1) {';
                                    codigoGuardarVariableOperacionSQL += '\n\t\tvar total = '+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre+'NU3V0/'+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre+'NU3V0T0T4L;';
                                    codigoGuardarVariableOperacionSQL += '\n\t\tguardarOperacionSQL(window["'+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+'"], "'+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.nombre+'", total);';
                                    codigoGuardarVariableOperacionSQL += '\n\t}';
                                }
                            } else if(!arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.esObjeto && !arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.esInstruccionSQL && arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorConexionATabla[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0) {
                                codigoGuardarVariableOperacionSQL += '\n\tvar total = '+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+'NU3V0/'+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+'NU3V0T0T4L;';
                                codigoGuardarVariableOperacionSQL += '\n\twindow["'+arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.nombre+'"] = total;';
                            }
                            //};
                        //}
                        if(j == arregloAgrupacionElementosFormulaPorConexionATabla[i].length-1) {
                            codigoCuerpo += codigoGuardarVariables;
                            //solo crear codigo for una vez por variable
                            codigoCuerpo += '\n\t\t};';
                            codigoCuerpo += '\n\t};\n';
                            codigo += codigoIniciacionVarPrimitiva + codigoCuerpo + codigoGuardarVariableOperacionSQL;
                        }
                    }
                };
            }
        };
        /*console.log('codigo');
        console.log(codigo);*/
        return codigo;
    }

    crearNivelIndicadores (llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorVariables, nivelACrear) {
        /*var totalVarACrearNivel = 0;
        for (var i = 0; i < arregloDeVariables.length; i++) {
            for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
                if(arregloDeVariables[i].atributos[j].nivel == nivelACrear) {
                    totalVarACrearNivel++;
                }
            };
        };*/
        //arregloAgrupacionElementosFormulaPorVariables contiene todas las variables que se calculan a base de otras variables
            //cada posicion nivel 0 representa la posicion de la variable en el arreglo de variables
            //cada posicion nivel 1 tiene la variable de la cual se va a calcular, el campo, la variable a crear y el segmento que pertenece a la variable de la cual se va a calcular
        var codigo = '';
        for (var i = 0; i < arregloDeVariables.length; i++) {
            var variablesInstanciadasID = [], variablesGuardadasID = [];
            if(/*!arregloDeVariables[i].esInstruccionSQL &&*/ arregloAgrupacionElementosFormulaPorVariables[i] != undefined) {
                var totalVarACrearNivel = 0;
                for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariables[i].length; j++) {
                    if(arregloAgrupacionElementosFormulaPorVariables[i][j] != undefined && arregloAgrupacionElementosFormulaPorVariables[i][j].length == undefined) {
                        totalVarACrearNivel++;
                    }
                };
                var codigoCuerpo = '';
                var codigoIniciacionVarPrimitiva = '';
                var codigoGuardarVariables = '';
                var totalVarCreadasNivel = 0;
                var codigoGuardarVariableOperacionSQL = '';
                for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariables[i].length; j++) {
                    //arregloAgrupacionElementosFormulaPorVariables[i][j].length == undefined --- para ver si no son varias variables de excel
                    if(arregloAgrupacionElementosFormulaPorVariables[i][j] != undefined && arregloAgrupacionElementosFormulaPorVariables[i][j].length == undefined && arregloDeVariables[i].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].variableCreacionCodigo.ID && arregloDeVariables[i].nombre.localeCompare(arregloAgrupacionElementosFormulaPorVariables[i][j].variableCreacionCodigo.nombre) == 0) {//segundo es para ver si no es arregloAgrupacionElementosFormulaPorVariables de excel
                        totalVarCreadasNivel++;
                        if(j == 0 && ((arregloDeVariables[i].esObjeto || arregloDeVariables[i].esInstruccionSQL) && !arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.esValorManual)) {
                            //solo crear codigo for una vez por variable
                            codigoCuerpo += '\n\t//CODIGO VARIABLE: '+arregloDeVariables[i].nombre;
                            codigoCuerpo += '\n\tfor ( var x = 0; x < window["'+arregloDeVariables[i].nombre+'"].length; x++) {';
                        }
                        var posicionIndicador = 0;
                        for (var w = 0; w < arregloDeIndicadores.length; w++) {
                            if (arregloDeIndicadores[w].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID) {
                                posicionIndicador = w;
                                break;
                            }
                        };
                        if(arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.tipo.localeCompare("int") == 0 || arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.tipo.localeCompare("decimal") == 0) {
                            codigoIniciacionVarPrimitiva += '\n\tarregloDeIndicadores['+posicionIndicador+'].'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+' = -1;';
                            codigoIniciacionVarPrimitiva += '\n\tvar '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0 = -1;';
                        } else if(arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.tipo.localeCompare("varchar") == 0) {
                            codigoIniciacionVarPrimitiva += '\n\tarregloDeIndicadores['+posicionIndicador+'].'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+' = "";';
                            codigoIniciacionVarPrimitiva += '\n\tvar '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0 = "";';
                        } else if(arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.tipo.localeCompare("bit") == 0) {
                            codigoIniciacionVarPrimitiva += '\n\tarregloDeIndicadores['+posicionIndicador+'].'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+' = false;';
                            codigoIniciacionVarPrimitiva += '\n\tvar '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0 = false;';
                        } else if(arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.tipo.localeCompare("date") == 0) {
                            codigoIniciacionVarPrimitiva += '\n\tarregloDeIndicadores['+posicionIndicador+'].'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+' = new Date(1964, 5, 28);';
                            codigoIniciacionVarPrimitiva += '\n\tvar '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0 = new Date(1964, 5, 28);';
                        }
                        //if(arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nivel == nivelACrear) {
                            var posicionVariable = 0, posicionCampo = 0;
                            EncontrarPosiciones:
                            for (var a = 0; a < arregloDeVariables.length; a++) {
                                if(arregloDeVariables[a].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID) {
                                    posicionVariable = a;
                                    for (var b = 0; b < arregloDeVariables[a].atributos.length; b++) {
                                        if(arregloDeVariables[a].atributos[b].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.ID) {
                                            posicionCampo = b;
                                            break EncontrarPosiciones;
                                        }
                                    };
                                }
                            };
                            var esArregloReferenciaArregloEnCodigo = false;
                            if(arregloDeVariables[i].esObjeto || arregloDeVariables[i].esInstruccionSQL)
                                esArregloReferenciaArregloEnCodigo = true;
                            codigoCuerpo += this.crearCodigoSegmentoReglasIndicadores(arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla, arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas, 2, posicionVariable, posicionCampo, 'window["'+arregloDeVariables[i].nombre+'"]', esArregloReferenciaArregloEnCodigo);
                        //}
                        /*var varFueGuardada = false;
                        for (var w = 0; w < variablesGuardadasID.length; w++) {
                            if (variablesGuardadasID[w] == arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID) {
                                varFueGuardada = true;
                                break;
                            }
                        };
                        if(!varFueGuardada) {
                            variablesGuardadasID.push(arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID);
                            codigoGuardarVariables += this.agregarCodigoGuardarVariable(arregloAgrupacionElementosFormulaPorVariables[i][j].variable, arregloAgrupacionElementosFormulaPorVariables[i][j].atributos, 2);
                        }*/
                        var posicionIndicador = 0;
                        for (var w = 0; w < arregloDeIndicadores.length; w++) {
                            if (arregloDeIndicadores[w].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID) {
                                posicionIndicador = w;
                                break;
                            }
                        };
                        codigoGuardarVariables += '\n\tarregloDeIndicadores['+posicionIndicador+'].'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+' = '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0;';
                            //for (var p = 0; p < arregloAgrupacionElementosFormulaPorVariables[i][j].variable.atributos.length; p++) {
                            if(arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esObjeto || arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esInstruccionSQL) {
                                var contieneOperacionSQL = false;
                                //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)
                                if( this.existeOperacion(arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion) )
                                    contieneOperacionSQL = true;
                                if(contieneOperacionSQL && arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") != 0 )
                                    codigoGuardarVariableOperacionSQL += '\n\tguardarOperacionSQL(window["'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'"], "'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'", '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0);';
                                else if(contieneOperacionSQL && arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0 ) {
                                    //NU3V0T0T4L
                                    codigoGuardarVariableOperacionSQL += '\n\tif('+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0T0T4L != 0 || '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0T0T4L != -1) {';
                                    codigoGuardarVariableOperacionSQL += '\n\t\tvar total = '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0/'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0T0T4L;';
                                    codigoGuardarVariableOperacionSQL += '\n\t\tguardarOperacionSQL(window["'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'"], "'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'", total);';
                                    codigoGuardarVariableOperacionSQL += '\n\t}';
                                } else if(!arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esObjeto && !arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esInstruccionSQL && arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0) {
                                    codigoGuardarVariableOperacionSQL += '\n\tvar total = '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'NU3V0/'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'NU3V0T0T4L;';
                                    codigoGuardarVariableOperacionSQL += '\n\twindow["'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'"] = total;';
                                }
                            }
                            //};
                        //}
                        
                        if(totalVarCreadasNivel == totalVarACrearNivel) {
                            codigoCuerpo += codigoGuardarVariables;
                            //solo crear codigo for una vez por variable
                            if((arregloDeVariables[i].esObjeto || arregloDeVariables[i].esInstruccionSQL) && !arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.esValorManual)
                                codigoCuerpo += '\n\t};\n';
                            codigo += codigoIniciacionVarPrimitiva + codigoCuerpo + codigoGuardarVariableOperacionSQL;
                        }
                    }
                };
            }
        };

        for (var i = 0; i < arregloDeFormas.length; i++) {
            var variablesInstanciadasID = [], variablesGuardadasID = [];
            if(arregloAgrupacionElementosFormulaPorVariables[i] != undefined) {
                var totalVarACrearNivel = 0;
                for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariables[i].length; j++) {
                    if(arregloAgrupacionElementosFormulaPorVariables[i][j] != undefined && arregloAgrupacionElementosFormulaPorVariables[i][j].length == undefined) {
                        totalVarACrearNivel++;
                    }
                };
                var codigoCuerpo = '';
                var codigoIniciacionVarPrimitiva = '';
                var codigoGuardarVariables = '';
                var totalVarCreadasNivel = 0;
                var codigoGuardarVariableOperacionSQL = '';
                for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariables[i].length; j++) {
                    if(arregloAgrupacionElementosFormulaPorVariables[i][j] != undefined && arregloAgrupacionElementosFormulaPorVariables[i][j].length == undefined && arregloDeFormas[i].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].variableCreacionCodigo.ID && this.verificarExistenciaErroresForma(arregloAgrupacionElementosFormulaPorVariables[i][j].variableCreacionCodigo) && arregloDeFormas[i].nombre.localeCompare(arregloAgrupacionElementosFormulaPorVariables[i][j].variableCreacionCodigo.nombre) == 0) {//segundo es para ver si no es arregloAgrupacionElementosFormulaPorVariables de excel
                        totalVarCreadasNivel++;
                        /*if(j == 0) {
                            //solo crear codigo for una vez por variable
                            codigoCuerpo += '\n\t//CODIGO VARIABLE: '+arregloDeFormas[i].nombre;
                            codigoCuerpo += '\n\tfor ( var x = 0; x < window["'+arregloDeFormas[i].nombre+'"].length; x++) {';
                        }*/
                        var posicionIndicador = 0;
                        for (var w = 0; w < arregloDeIndicadores.length; w++) {
                            if (arregloDeIndicadores[w].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID) {
                                posicionIndicador = w;
                                break;
                            }
                        };
                        if(arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.tipo.localeCompare("int") == 0 || arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.tipo.localeCompare("decimal") == 0) {
                            codigoIniciacionVarPrimitiva += '\n\tarregloDeIndicadores['+posicionIndicador+'].'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+' = -1;';
                            codigoIniciacionVarPrimitiva += '\n\tvar '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0 = -1;';
                        } else if(arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.tipo.localeCompare("varchar") == 0) {
                            codigoIniciacionVarPrimitiva += '\n\tarregloDeIndicadores['+posicionIndicador+'].'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+' = "";';
                            codigoIniciacionVarPrimitiva += '\n\tvar '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0 = "";';
                        } else if(arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.tipo.localeCompare("bit") == 0) {
                            codigoIniciacionVarPrimitiva += '\n\tarregloDeIndicadores['+posicionIndicador+'].'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+' = false;';
                            codigoIniciacionVarPrimitiva += '\n\tvar '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0 = false;';
                        } else if(arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.tipo.localeCompare("date") == 0) {
                            codigoIniciacionVarPrimitiva += '\n\tarregloDeIndicadores['+posicionIndicador+'].'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+' = new Date(1964, 5, 28);';
                        }
                        //if(arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nivel == nivelACrear) {
                            var posicionVariable = 0, posicionCampo = 0;
                            EncontrarPosiciones:
                            for (var a = 0; a < arregloDeVariables.length; a++) {
                                if(arregloDeVariables[a].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID) {
                                    posicionVariable = a;
                                    for (var b = 0; b < arregloDeVariables[a].atributos.length; b++) {
                                        if(arregloDeVariables[a].atributos[b].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.ID) {
                                            posicionCampo = b;
                                            break EncontrarPosiciones;
                                        }
                                    };
                                }
                            };
                            var esArregloReferenciaArregloEnCodigo = false;
                            codigoCuerpo += this.crearCodigoSegmentoReglasFormaOExcelIndicadores(arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla, arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas, 2, posicionVariable, posicionCampo, 'window["'+arregloDeFormas[i].nombre+'"]', false);
                        //}
                        codigoGuardarVariables += '\n\tarregloDeIndicadores['+posicionIndicador+'].'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+' = '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0;';
                            //for (var p = 0; p < arregloAgrupacionElementosFormulaPorVariables[i][j].variable.atributos.length; p++) {
                            if(arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esObjeto || arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esInstruccionSQL) {
                                var contieneOperacionSQL = false;
                                //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)
                                if( this.existeOperacion(arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion) )
                                    contieneOperacionSQL = true;
                                if(contieneOperacionSQL && arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") != 0 )
                                    codigoGuardarVariableOperacionSQL += '\n\tguardarOperacionSQL(window["'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'"], "'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'", '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0);';
                                else if(contieneOperacionSQL && arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0 ) {
                                    //NU3V0T0T4L
                                    codigoGuardarVariableOperacionSQL += '\n\tif('+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0T0T4L != 0 || '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0T0T4L != -1) {';
                                    codigoGuardarVariableOperacionSQL += '\n\t\tvar total = '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0/'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0T0T4L;';
                                    codigoGuardarVariableOperacionSQL += '\n\t\tguardarOperacionSQL(window["'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'"], "'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'", total);';
                                    codigoGuardarVariableOperacionSQL += '\n\t}';
                                } else if(!arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esObjeto && !arregloAgrupacionElementosFormulaPorVariables[i][j].variable.esInstruccionSQL && arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0) {
                                    codigoGuardarVariableOperacionSQL += '\n\tvar total = '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'NU3V0/'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'NU3V0T0T4L;';
                                    codigoGuardarVariableOperacionSQL += '\n\twindow["'+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+'"] = total;';
                                }
                            }
                            //};
                        //}
                        if(totalVarCreadasNivel == totalVarACrearNivel) {
                            codigoCuerpo += codigoGuardarVariables;
                            //solo crear codigo for una vez por variable
                            /*if((arregloDeVariables[i].esObjeto || arregloDeVariables[i].esInstruccionSQL) && !arregloAgrupacionElementosFormulaPorVariables[i][j].segmentoRegla.esValorManual)
                                codigoCuerpo += '\n\t};\n';*/
                            codigo += codigoIniciacionVarPrimitiva + codigoCuerpo + codigoGuardarVariableOperacionSQL;
                        }
                    }
                };
            }
        };

        for (var i = 0; i < arregloDeExcel.length; i++) {
            for (var p = 0; p < arregloDeExcel[i].variables.length; p++) {
                var variablesInstanciadasID = [], variablesGuardadasID = [];
                if(arregloAgrupacionElementosFormulaPorVariables[i] != undefined && arregloAgrupacionElementosFormulaPorVariables[i][p] != undefined &&  arregloAgrupacionElementosFormulaPorVariables[i][p].length != undefined) {
                    var totalVarACrearNivel = 0;
                    for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariables[i][p].length; j++) {
                        //if(arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nivel == nivelACrear) {
                            totalVarACrearNivel++;
                        //}
                    };
                    var codigoCuerpo = '';
                    var codigoIniciacionVarPrimitiva = '';
                    var codigoGuardarVariables = '';
                    var totalVarCreadasNivel = 0;
                    var codigoGuardarVariableOperacionSQL = '';
                    for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariables[i][p].length; j++) {
                        if(arregloDeExcel[i].variables[p].ID == arregloAgrupacionElementosFormulaPorVariables[i][p][j].variableCreacionCodigo.ID && !this.verificarExistenciaErroresExcel(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variableCreacionCodigo) && arregloDeExcel[i].variables[p].nombre.localeCompare(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variableCreacionCodigo.nombre) == 0) {
                            totalVarCreadasNivel++;
                            if(j == 0 && window[arregloDeExcel[i].variables[p].nombre].length != undefined) {
                                //solo crear codigo for una vez por variable
                                codigoCuerpo += '\n\t//CODIGO VARIABLE: '+arregloDeExcel[i].variables[p].nombre;
                                codigoCuerpo += '\n\tfor ( var x = 0; x < window["'+arregloDeExcel[i].variables[p].nombre+'"].length; x++) {';
                            }
                            var posicionIndicador = 0;
                            for (var w = 0; w < arregloDeIndicadores.length; w++) {
                                if (arregloDeIndicadores[w].ID == arregloAgrupacionElementosFormulaPorVariables[i][j].variable.ID) {
                                    posicionIndicador = w;
                                    break;
                                }
                            };
                            if(arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.tipo.localeCompare("int") == 0 || arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.tipo.localeCompare("decimal") == 0) {
                                codigoIniciacionVarPrimitiva += '\n\tarregloDeIndicadores['+posicionIndicador+'].'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+' = -1;';
                                codigoIniciacionVarPrimitiva += '\n\tvar '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0 = -1;';
                            } else if(arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.tipo.localeCompare("varchar") == 0) {
                                codigoIniciacionVarPrimitiva += '\n\tarregloDeIndicadores['+posicionIndicador+'].'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+' = "";';
                                codigoIniciacionVarPrimitiva += '\n\tvar '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0 = "";';
                            } else if(arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.tipo.localeCompare("bit") == 0) {
                                codigoIniciacionVarPrimitiva += '\n\tarregloDeIndicadores['+posicionIndicador+'].'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+' = false;';
                                codigoIniciacionVarPrimitiva += '\n\tvar '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0 = false;';
                            } else if(arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.tipo.localeCompare("date") == 0) {
                                codigoIniciacionVarPrimitiva += '\n\tarregloDeIndicadores['+posicionIndicador+'].'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+' = new Date(1964, 5, 28);';
                            }
                            //if(arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nivel == nivelACrear) {
                                var posicionVariable = 0, posicionCampo = 0;
                                EncontrarPosiciones:
                                for (var a = 0; a < arregloDeVariables.length; a++) {
                                    if(arregloDeVariables[a].ID == arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.ID) {
                                        posicionVariable = a;
                                        for (var b = 0; b < arregloDeVariables[a].atributos.length; b++) {
                                            if(arregloDeVariables[a].atributos[b].ID == arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.ID) {
                                                posicionCampo = b;
                                                break EncontrarPosiciones;
                                            }
                                        };
                                    }
                                };
                                var esArregloReferenciaArregloEnCodigo = false;
                                if(window[arregloDeExcel[i].variables[p].nombre].length != undefined)
                                    codigoCuerpo += this.crearCodigoSegmentoReglasFormaOExcelIndicadores(arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla, arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas, 2, posicionVariable, posicionCampo, "window['"+arregloDeExcel[i].variables[p].nombre+"'][x]", true);
                                else
                                    codigoCuerpo += this.crearCodigoSegmentoReglasFormaOExcelIndicadores(arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla, arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas, 2, posicionVariable, posicionCampo, "window['"+arregloDeExcel[i].variables[p].nombre+"']", false);
                            //}
                            codigoGuardarVariables += '\n\tarregloDeIndicadores['+posicionIndicador+'].'+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+' = '+arregloAgrupacionElementosFormulaPorVariables[i][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][j].atributo.nombre+'NU3V0;';
                                //for (var p = 0; p < arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.atributos.length; p++) {
                                if(arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.esObjeto || arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.esInstruccionSQL) {
                                    var contieneOperacionSQL = false;
                                    //viendo si la ultima regla del segmento (la de asignacion) es una operacion de SQL (AUTOSUMAR, PROMEDIO, MAX, MIN)
                                    if( this.existeOperacion(arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas.length-1].operacion) )
                                        contieneOperacionSQL = true;
                                    if(contieneOperacionSQL && arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") != 0 )
                                        codigoGuardarVariableOperacionSQL += '\n\tguardarOperacionSQL(window["'+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+'"], "'+arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre+'", '+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre+'NU3V0);';
                                    else if(contieneOperacionSQL && arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0 ) {
                                        //NU3V0T0T4L
                                        codigoGuardarVariableOperacionSQL += '\n\tif('+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre+'NU3V0T0T4L != 0 || '+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre+'NU3V0T0T4L != -1) {';
                                        codigoGuardarVariableOperacionSQL += '\n\t\tvar total = '+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre+'NU3V0/'+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre+'NU3V0T0T4L;';
                                        codigoGuardarVariableOperacionSQL += '\n\t\tguardarOperacionSQL(window["'+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+'"], "'+arregloAgrupacionElementosFormulaPorVariables[i][p][j].atributo.nombre+'", total);';
                                        codigoGuardarVariableOperacionSQL += '\n\t}';
                                    } else if(!arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.esObjeto && !arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.esInstruccionSQL && arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas[arregloAgrupacionElementosFormulaPorVariables[i][p][j].segmentoRegla.reglas.length-1].operacion.localeCompare("PROM") == 0) {
                                        codigoGuardarVariableOperacionSQL += '\n\tvar total = '+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+'NU3V0/'+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+'NU3V0T0T4L;';
                                        codigoGuardarVariableOperacionSQL += '\n\twindow["'+arregloAgrupacionElementosFormulaPorVariables[i][p][j].variable.nombre+'"] = total;';
                                    }
                                }
                                //};
                            //}
                            if(totalVarCreadasNivel == totalVarACrearNivel) {
                                codigoCuerpo += codigoGuardarVariables;
                                //solo crear codigo for una vez por variable
                                if(window[arregloDeExcel[i].variables[p].nombre].length != undefined)
                                    codigoCuerpo += '\n\t};\n';
                                codigo += codigoIniciacionVarPrimitiva + codigoCuerpo + codigoGuardarVariableOperacionSQL;
                            }
                        }
                    };
                }
            };
        };
        return codigo;
    }

    crearCodigoSegmentoReglasIndicadores (segmentoReglas, reglas, tabs, posicionVariable, posicionCampo, nombreReferenciaArregloEnCodigo, esArregloReferenciaArregloEnCodigo) {
        var codigo = '';
        var tabsText = '';
        for (var i = 0; i < tabs; i++) {
            tabsText+='\t';
        };
        for (var n = 0; n < reglas.length; n++) {
            if(reglas[n].reglaPadreID == -1 && reglas[n].operacion.localeCompare("ELSE") != 0) {
                var resultado = this.arregloCodigoReglaIndicadores(reglas[n], tabs, posicionVariable, posicionCampo, [], reglas, nombreReferenciaArregloEnCodigo, esArregloReferenciaArregloEnCodigo);
                if(resultado.length > 0)
                    resultado[0].codigo = "\n"+resultado[0].codigo;
                //$.merge( prestamosCuerpo, resultado );
                for (var i = 0; i < resultado.length; i++) {
                    codigo += resultado[i].codigo;
                };
            }
        };
        return codigo;
    }

    crearCodigoSegmentoReglasFormaOExcelIndicadores (segmentoReglas, reglas, tabs, posicionVariable, posicionCampo, nombreReferenciaArregloEnCodigo, esExcel) {
        var codigo = '';
        var tabsText = '';
        for (var i = 0; i < tabs; i++) {
            tabsText+='\t';
        };
        for (var n = 0; n < reglas.length; n++) {
            if(reglas[n].reglaPadreID == -1 && reglas[n].operacion.localeCompare("ELSE") != 0) {
                var resultado = this.arregloCodigoReglaFormaOExcelIndicadores(reglas[n], tabs, posicionVariable, posicionCampo, [], reglas, nombreReferenciaArregloEnCodigo, esExcel);
                if(resultado.length > 0)
                    resultado[0].codigo = "\n"+resultado[0].codigo;
                //$.merge( prestamosCuerpo, resultado );
                for (var i = 0; i < resultado.length; i++) {
                    codigo += resultado[i].codigo;
                };
            }
        };
        return codigo;
    }

    arregloCodigoReglaIndicadores (regla, tabs, posicionVariable, posicionCampo, arreglo, arregloDeReglas, nombreReferenciaArregloEnCodigo, esArregloReferenciaArregloEnCodigo) {
        var tabsText = '';
        for (var i = 0; i < tabs; i++) {
            tabsText+='\t';
        };
        var posicionesIF = [];
        var newTabsTextFormula = '';
        if(!regla.esCondicion) {
            //asignaciones
            //si no es condicion, la variable de referencia se le agrega NU3V0 que hace referencia al objeto temporal vacio
            if(regla.operacion.indexOf('ASIG') == 0) {
                //trayendo formula correcta
                var formula = arregloDeIndicadores[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    /*if(arregloDeIndicadores[posicionVariable].atributos[posicionCampo].esObjeto) {
                        if(esArregloReferenciaArregloEnCodigo) {
                            if(formula[0].fuenteDeDatos != undefined && formula[0].fuenteDeDatos[0].esValorManual) {
                                arreglo.push({codigo: tabsText+"if ('"+formula[0].fuenteDeDatos[0].nombreVariable+"' != undefined) {", tipo: "ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0."+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+" = '"+formula[0].fuenteDeDatos[0].nombreVariable+"';", tipo: "ASIG"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined) {", tipo: "ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0."+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+" = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+";", tipo: "ASIG"});
                            }
                        } else {
                            if(formula[0].fuenteDeDatos != undefined && formula[0].fuenteDeDatos[0].esValorManual) {
                                arreglo.push({codigo: tabsText+"if ('"+formula[0].fuenteDeDatos[0].nombreVariable+"' != undefined) {", tipo: "ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0."+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+" = '"+formula[0].fuenteDeDatos[0].nombreVariable+"';", tipo: "ASIG"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0."+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+" = "+nombreReferenciaArregloEnCodigo+";", tipo: "ASIG"});
                            }
                        }
                    } else {*/
                        if(esArregloReferenciaArregloEnCodigo) {
                            if(formula[0].fuenteDeDatos != undefined && formula[0].fuenteDeDatos[0].esValorManual) {
                                arreglo.push({codigo: tabsText+"if ('"+formula[0].fuenteDeDatos[0].nombreVariable+"' != undefined) {", tipo: "ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = '"+formula[0].fuenteDeDatos[0].nombreVariable+"';", tipo: "ASIG"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined) {", tipo: "ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+";", tipo: "ASIG"});
                            }
                        } else {
                            if(formula[0].fuenteDeDatos != undefined && formula[0].fuenteDeDatos[0].esValorManual) {
                                arreglo.push({codigo: tabsText+"if ('"+formula[0].fuenteDeDatos[0].nombreVariable+"' != undefined) {", tipo: "ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = '"+formula[0].fuenteDeDatos[0].nombreVariable+"';", tipo: "ASIG"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "ASIG"});
                            }
                        }
                    //}
                    arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                    arreglo.push({codigo: "\n"+tabsText+"}", tipo: "ASIG"});
                }
            } else if(regla.operacion.indexOf('MAX') == 0) {
                //trayendo formula correcta
                var formula = arregloDeIndicadores[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0) {
                        /*if(arregloDeIndicadores[posicionVariable].atributos[posicionCampo].esObjeto) {
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getTime() < "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+".getTime()) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getMonth() == 4 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getDate() == 28 )", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getTime() < "+nombreReferenciaArregloEnCodigo+".getTime()) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getMonth() == 4 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getDate() == 28 )", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        } else {*/
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getTime() < "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+".getTime()) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getMonth() == 4 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getDate() == 28)", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getTime() < "+nombreReferenciaArregloEnCodigo+".getTime()) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"})
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getMonth() == 4 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getDate() == 28)", tipo: "MAX"});;
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        //}
                    } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || arregloDeIndicadores[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("decimal") == 0) {
                        /*if(arregloDeIndicadores[posicionVariable].atributos[posicionCampo].esObjeto) {
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 < "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+";", tipo: "MAX"});
                                //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 < "+nombreReferenciaArregloEnCodigo+") {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                                //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        } else {*/
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 < "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 < "+nombreReferenciaArregloEnCodigo+") {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        //}
                    }
                }
            } else if(regla.operacion.indexOf('MIN') == 0) {
                //trayendo formula correcta
                var formula = arregloDeIndicadores[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0) {
                        /*if(arregloDeIndicadores[posicionVariable].atributos[posicionCampo].esObjeto) {
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getTime() > "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+".getTime()) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getMonth() == 4 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getDate() == 28)", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getTime() > "+nombreReferenciaArregloEnCodigo+".getTime()) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getMonth() == 4 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getDate() == 28)", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        } else {*/
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getTime() > "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+".getTime()) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getMonth() == 4 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getDate() == 28)", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getTime() > "+nombreReferenciaArregloEnCodigo+".getTime()) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getMonth() == 4 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getDate() == 28) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        //}
                    } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || arregloDeIndicadores[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("decimal") == 0) {
                        /*if(arregloDeIndicadores[posicionVariable].atributos[posicionCampo].esObjeto) {
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 > "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" || "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+";", tipo: "MAX"});
                                //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 > "+nombreReferenciaArregloEnCodigo+" || "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                                //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        } else {*/
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 > "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"} else if( "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1  ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 > "+nombreReferenciaArregloEnCodigo+") {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"} else if( "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 ) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        //}
                    }
                }
            } else if(regla.operacion.indexOf('PROM') == 0) {
                //trayendo formula correcta
                var formula = arregloDeIndicadores[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || arregloDeIndicadores[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("decimal") == 0) {
                        /*if(arregloDeIndicadores[posicionVariable].atributos[posicionCampo].esObjeto) {
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 += "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0T0T4L++;", tipo: "MAX"});
                                //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 += "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0T0T4L++;", tipo: "MAX"});
                                //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        } else {*/
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 += "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0T0T4L++;", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ( "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 += "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0T0T4L++;", tipo: "MAX"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                            }
                        //}
                    }
                }
            } else if(regla.operacion.indexOf('AUTOSUM') == 0) {
                //trayendo formula correcta
                var formula = arregloDeIndicadores[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("decimal") == 0) {
                        /*if(arregloDeIndicadores[posicionVariable].atributos[posicionCampo].esObjeto) {
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+")) {", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1)", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "AUTOSUM"});
                                //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = evaluate("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 + "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "AUTOSUM"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1)", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "AUTOSUM"});
                                //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = evaluate("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 + "+nombreReferenciaArregloEnCodigo+");", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "AUTOSUM"});
                            }
                        } else {*/
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+")) {", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1)", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = evaluate("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 + "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "AUTOSUM"});
                            } else {
                                arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1)", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = evaluate("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 + "+nombreReferenciaArregloEnCodigo+");", tipo: "AUTOSUM"});
                                arreglo.push({codigo: "\n"+tabsText+"}", tipo: "AUTOSUM"});
                            }
                        //}
                    }
                }
            } else if(regla.operacion.indexOf('COUNT') == 0) {
                var formula = arregloDeIndicadores[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("decimal") == 0) {
                    /*if(arregloDeIndicadores[posicionVariable].atributos[posicionCampo].esObjeto) {
                        if(esArregloReferenciaArregloEnCodigo) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") ) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+") && !isNaN("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        }
                    } else {*/
                        if(esArregloReferenciaArregloEnCodigo) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") ) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        }
                    //}
                } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("varchar") == 0) {
                    /*if(arregloDeIndicadores[posicionVariable].atributos[posicionCampo].esObjeto) {
                        if(esArregloReferenciaArregloEnCodigo) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+".length > 0) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && "+nombreReferenciaArregloEnCodigo+".length > 0) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        }
                    } else {*/
                        if(esArregloReferenciaArregloEnCodigo) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+".length > 0) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && "+nombreReferenciaArregloEnCodigo+".length > 0) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        }
                    //}
                } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("bool") == 0) {
                    /*if(arregloDeIndicadores[posicionVariable].atributos[posicionCampo].esObjeto) {
                        if(esArregloReferenciaArregloEnCodigo) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" == true || "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" == false) ) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && ("+nombreReferenciaArregloEnCodigo+" == true || "+nombreReferenciaArregloEnCodigo+" == false) ) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        }
                    } else {*/
                        if(esArregloReferenciaArregloEnCodigo) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" == true || "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" == false) ) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && ("+nombreReferenciaArregloEnCodigo+" == true || "+nombreReferenciaArregloEnCodigo+" == false) ) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        }
                    //}
                } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0) {
                    /*if(arregloDeIndicadores[posicionVariable].atributos[posicionCampo].esObjeto) {
                        if(esArregloReferenciaArregloEnCodigo) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+") ) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+") {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        }
                    } else {*/
                        if(esArregloReferenciaArregloEnCodigo) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+")) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+")) {", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                        }
                    //}
                }
            } else if(regla.operacion.indexOf('FORMULA') == 0) {
                var formula = arregloDeIndicadores[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                for (var i = 0; i < formula[0].fuenteDeDatos.length; i++) {
                    var saltoLinea = '\n';
                    if(formula[0].fuenteDeDatos[i].operacion != undefined && formula[0].fuenteDeDatos[i].operacion.length > 0) {
                        //if(formula[0].fuenteDeDatos[i].esFuenteDeDato) {
                            //elemento formula es de conexion de tabla
                            if(esArregloReferenciaArregloEnCodigo) {
                                arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[i].nombreColumnaEnTabla+" != undefined) {", tipo: "FORMULA"});
                                newTabsTextFormula += "\t";
                                arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[i].nombreColumnaEnTabla+";", tipo: "FORMULA"});
                                /*arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log('"+formula[0].fuenteDeDatos[i].nombreVariable+"');", tipo: "FORMULA"});
                                arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log("+formula[0].fuenteDeDatos[i].nombreVariable+");", tipo: "FORMULA"});*/
                            } else {
                                arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if (window['"+formula[0].fuenteDeDatos[i].nombreColumnaEnTabla+"'] != undefined) {", tipo: "FORMULA"});
                                newTabsTextFormula += "\t";
                                arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = window['"+formula[0].fuenteDeDatos[i].nombreColumnaEnTabla+"'];", tipo: "FORMULA"});
                                /*arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log('"+formula[0].fuenteDeDatos[i].nombreVariable+"');", tipo: "FORMULA"});
                                arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log("+formula[0].fuenteDeDatos[i].nombreVariable+");", tipo: "FORMULA"});*/
                            }
                        /*} else {
                            if (!arregloDeIndicadores[posicionVariable].esObjeto) {
                                arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "FORMULA"});
                                newTabsTextFormula += "\t";
                                //elemento formula es variable primitiva
                                if(i > 0) {
                                    arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+";", tipo: "FORMULA"});
                                } else {
                                    arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+";", tipo: "FORMULA"});
                                }
                            } else {
                                arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+" != undefined) {", tipo: "FORMULA"});
                                newTabsTextFormula += "\t";
                                if(i > 0) {
                                    arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+"[x]."+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+";", tipo: "FORMULA"});
                                } else {
                                    arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+"[x]."+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+";", tipo: "FORMULA"});
                                }
                            }
                        }*/
                    }
                };
                //arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0."+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+" = math.eval(formula[0].formula);"});
                if(arregloDeIndicadores[posicionVariable].esObjeto)
                    arreglo.push({codigo: "\n"+tabsText+newTabsTextFormula+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+formula[0].formula+";"});
                else
                    arreglo.push({codigo: "\n"+tabsText+newTabsTextFormula+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = evaluate("+formula[0].formula+");"});
                for (var i = formula[0].fuenteDeDatos.length; i > 0; i--) {
                    posicionesIF.push(arreglo.length+i);
                }
            }
        } else {
            //condiciones if
            var arregloValoresAComparar = [];
            if(regla.valor.indexOf("LISTAID") == 0) {
                //
            } else if(regla.valor.indexOf("FECHA") == 0) {
                var fecha = regla.valor.substring(regla.valor.indexOf("[")+1, regla.valor.lastIndexOf("]"));
                arregloValoresAComparar = ["new Date("+fecha+").getTime()"];
            } else if(regla.valor.indexOf("TIEMPO") == 0) {
                var stringValores = regla.valor.substring(regla.valor.indexOf("[")+1, regla.valor.lastIndexOf("]"));
                var diasAgregarCadena = stringValores.split(",")[0], mesesAgregarCadena = stringValores.split(",")[1], aniosAgregarCadena = stringValores.split(",")[2], futuro = stringValores.split(",")[3];
                var diasAgregar = parseInt(diasAgregarCadena.indexOf("=")+1), mesesAgregar = parseInt(mesesAgregarCadena.indexOf("=")+1), aniosAgregar = parseInt(aniosAgregarCadena.indexOf("=")+1);
                var esFuturo = true;
                if(futuro.localeCompare("FUTURO") == 0)
                    esFuturo = true;
                else
                    esFuturo = false;
                var hoy = new Date();
                if(esFuturo) {
                    hoy = this.addYears(hoy, aniosAgregar);
                    hoy = this.addMonths(hoy, mesesAgregar);
                    hoy = this.addDays(hoy, diasAgregar);
                } else {
                    hoy = this.minusDays(hoy, aniosAgregar);
                    hoy = this.minusMonths(hoy, aniosAgregar);
                    hoy = this.minusYears(hoy, aniosAgregar);
                }
                arregloValoresAComparar = ["new Date("+hoy.getFullYear()+", "+hoy.getMonth()+", "+hoy.getDate()+").getTime()"];
            } else if(regla.valor.indexOf("MANUAL") == 0) {
                arregloValoresAComparar = [regla.valor.substring(regla.valor.indexOf("[")+1, regla.valor.lastIndexOf("]"))];
            }
            var nombreCampoDeArregloEnCodigo = '';
            if(regla.esConexionTabla) {
                nombreCampoDeArregloEnCodigo = regla.nombreColumnaEnTabla;
            } else {
                nombreCampoDeArregloEnCodigo = arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre;
            }
            var tamArreglo = arreglo.length;
            //for (var j = 0; j < tamArreglo; j++) {
                for (var i = 0; i < arregloValoresAComparar.length; i++) {
                    var comparacion = "";
                    var inicioComparacion = "";
                    var operacion = "";
                    if(regla.operacion.localeCompare("ES_MENOR") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
                        operacion = "<";
                    } else if(regla.operacion.localeCompare("ES_MENOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
                        operacion = "<=";
                    } else if(regla.operacion.localeCompare("ES_MAYOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
                        operacion = ">=";
                    } else if(regla.operacion.localeCompare("ES_MAYOR") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
                        operacion = ">";
                    } else if(regla.operacion.localeCompare("ES_IGUAL") == 0) {
                        operacion = "==";
                    } else if(regla.operacion.localeCompare("NO_ES_IGUAL") == 0) {
                        operacion = "!=";
                    } else if(regla.operacion.localeCompare("ES_MENOR") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = ">";
                    } else if(regla.operacion.localeCompare("ES_MENOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = ">=";
                    } else if(regla.operacion.localeCompare("ES_MAYOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = "<=";
                    } else if(regla.operacion.localeCompare("ES_MAYOR") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = "<";
                    } else if(regla.operacion.localeCompare("ES_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = "==";
                    } else if(regla.operacion.localeCompare("NO_ES_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = "!=";
                    }
                    if (regla.tipoCampoObjetivo.localeCompare("date") == 0) {
                        if(regla.operacion.localeCompare("encuentra") == 0) {
                            //
                        } else if(regla.operacion.localeCompare("no_encuentra") == 0) {
                            //
                        } else {
                            if(esArregloReferenciaArregloEnCodigo) {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+")";
                                comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+".getTime() "+operacion+" "+arregloValoresAComparar[i];
                            } else {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+")";
                                comparacion = nombreReferenciaArregloEnCodigo+".getTime() "+operacion+" "+arregloValoresAComparar[i];
                            }
                        }
                    } else if (regla.tipoCampoObjetivo.localeCompare("varchar") == 0) {
                        if(regla.operacion.localeCompare("encuentra") == 0) {
                            //
                        } else if(regla.operacion.localeCompare("no_encuentra") == 0) {
                            //
                        } else {
                            if(esArregloReferenciaArregloEnCodigo) {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" != undefined";
                                comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+".localeCompare('"+arregloValoresAComparar[i]+"') "+operacion+" 0";
                            } else {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+" != undefined";
                                comparacion = nombreReferenciaArregloEnCodigo+".localeCompare('"+arregloValoresAComparar[i]+"') "+operacion+" 0";
                            }
                        }
                    } else if (regla.tipoCampoObjetivo.localeCompare("int") == 0 || regla.tipoCampoObjetivo.localeCompare("decimal") == 0) {
                        if(regla.operacion.localeCompare("encuentra") == 0) {
                            //
                        } else if(regla.operacion.localeCompare("no_encuentra") == 0) {
                            //
                        } else {
                            if(esArregloReferenciaArregloEnCodigo) {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+")"
                                comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" "+operacion+" "+arregloValoresAComparar[i];
                            } else {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")"
                                comparacion = nombreReferenciaArregloEnCodigo+" "+operacion+" "+arregloValoresAComparar[i];
                            }
                        }
                    } else if (regla.tipoCampoObjetivo.localeCompare("bit") == 0) {
                        if(esArregloReferenciaArregloEnCodigo) {
                            inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" != undefined"
                            comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" "+operacion+" "+arregloValoresAComparar[i];
                        } else {
                            inicioComparacion = nombreReferenciaArregloEnCodigo+" != undefined"
                            comparacion = nombreReferenciaArregloEnCodigo+" "+operacion+" "+arregloValoresAComparar[i];
                        }
                    }
                    if(i+1 == arregloValoresAComparar.length) {
                        comparacion += " ) {";
                    }
                    if(i==0) {
                        //arreglo[j].codigo += comparacion;
                        //arreglo.push({codigo: tabsText+"console.log("+nombreReferenciaArregloEnCodigo+"[x]);", tipo: "COMPARACION"});
                        //arreglo.push({codigo: '\n'+tabsText+"console.log( "+nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+");", tipo: "COMPARACION"});
                        arreglo.push({codigo: '\n'+tabsText+"if ( "+inicioComparacion+" && "+comparacion, tipo: "COMPARACION"});
                    } else {
                        arreglo[arreglo.length-1].codigo += " && "+comparacion;
                    }
                };
                /*console.log("ENTROOO j");
            };*/
            posicionesIF.push(arreglo.length);
        }

        var cuerpo = arregloDeReglas.filter(function( object ) {
            return object.reglaPadreID == regla.ID;
        });
        if(cuerpo.length > 0) {
            var arregloCuerpo = [];
            for (var i = 0; i < cuerpo.length; i++) {
                /*var cuantasTabs = tabs;
                if(regla.esCondicion)
                    cuantasTabs++;*/
                var retorno = this.arregloCodigoRegla(cuerpo[i], tabs+1, posicionVariable, posicionCampo, [], arregloDeReglas, nombreReferenciaArregloEnCodigo, esArregloReferenciaArregloEnCodigo);
                retorno[0].codigo = "\n"+retorno[0].codigo;
                $.merge( arregloCuerpo, retorno );
            };
            for (var i = 0; i < posicionesIF.length; i++) {
                arreglo.splice(posicionesIF[i], 0, ...arregloCuerpo);
                if(regla.esCondicion)
                    arreglo.splice(posicionesIF[i]+arregloCuerpo.length, 0, {codigo: "\n"+tabsText+"}", filtro: regla.filtro});
                for (var j = i; j < posicionesIF.length; j++) {
                    posicionesIF[j]+=arregloCuerpo.length;
                };
            };
            if(posicionesIF.length == 0)
                $.merge( arreglo, arregloCuerpo );
            return arreglo;
        } else {
            if(regla.esCondicion || posicionesIF.length > 0){
                for (var i = 0; i < posicionesIF.length; i++) {
                    if (newTabsTextFormula.length > 0)
                        newTabsTextFormula = newTabsTextFormula.substring(0, newTabsTextFormula.length - 1);
                    arreglo.splice(posicionesIF[i], 0, {codigo: "\n"+tabsText+newTabsTextFormula+"}", filtro: regla.filtro})
                };
            }
            return arreglo;
        }
    }
































    arregloCodigoReglaFormaOExcelIndicadores (regla, tabs, posicionVariable, posicionCampo, arreglo, arregloDeReglas, nombreReferenciaArregloEnCodigo, esArregloReferenciaArregloEnCodigo) {
        //a este metodo solo entra cuando la asignacion, max, min, ect es de solo variables formula o excel, o formulas solo es de excel o formulas
        var tabsText = '';
        for (var i = 0; i < tabs; i++) {
            tabsText+='\t';
        };
        var posicionesIF = [];
        var newTabsTextFormula = '';
        if(!regla.esCondicion) {
            //asignaciones
            //si no es condicion, la variable de referencia se le agrega NU3V0 que hace referencia al objeto temporal vacio
            if(regla.operacion.indexOf('ASIG') == 0) {
                //trayendo formula correcta
                var formula = arregloDeIndicadores[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    /*if(arregloDeIndicadores[posicionVariable].esObjeto) {
                        if(formula[0].fuenteDeDatos != undefined && formula[0].fuenteDeDatos[0].esValorManual) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0."+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+" = '"+formula[0].fuenteDeDatos[0].nombreVariable+"';", tipo: "ASIG"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0."+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+" = "+nombreReferenciaArregloEnCodigo+";", tipo: "ASIG"});
                        }
                    } else {*/
                        if(formula[0].fuenteDeDatos != undefined && formula[0].fuenteDeDatos[0].esValorManual) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = '"+formula[0].fuenteDeDatos[0].nombreVariable+"';", tipo: "ASIG"});
                        } else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "ASIG"});
                        }
                    //}
                    arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                    arreglo.push({codigo: "\n"+tabsText+"}", tipo: "ASIG"});
                }
            } else if(regla.operacion.indexOf('MAX') == 0) {
                //trayendo formula correcta
                var formula = arregloDeIndicadores[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0) {
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "MAX"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "MAX"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getTime() < "+nombreReferenciaArregloEnCodigo+".getTime()) {", tipo: "MAX"});
                        arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"})
                        arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getMonth() == 4 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getDate() == 28)", tipo: "MAX"});;
                        arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                        arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                    } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || arregloDeIndicadores[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("decimal") == 0) {
                        //if(arregloDeIndicadores[posicionVariable].esObjeto) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 < "+nombreReferenciaArregloEnCodigo+") {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                        /*} else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 < "+nombreReferenciaArregloEnCodigo+") {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                        }*/
                    }
                }
            } else if(regla.operacion.indexOf('MIN') == 0) {
                //trayendo formula correcta
                var formula = arregloDeIndicadores[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0) {
                        //if(arregloDeVariables[posicionVariable].esObjeto) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getTime() > "+nombreReferenciaArregloEnCodigo+".getTime()) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getMonth() == 4 && "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0.getDate() == 28)", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                        /*} else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ( isValidDate("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+"NU3V0.getTime() > "+nombreReferenciaArregloEnCodigo+".getTime()) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+"NU3V0.getFullYear() == 1964 && "+arregloDeIndicadores[posicionVariable].nombre+"NU3V0.getMonth() == 4 && "+arregloDeIndicadores[posicionVariable].nombre+"NU3V0.getDate() == 28) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 = new Date("+nombreReferenciaArregloEnCodigo+");", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                        }*/
                    } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || arregloDeIndicadores[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("decimal") == 0) {
                        //if(arregloDeVariables[posicionVariable].esObjeto) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 > "+nombreReferenciaArregloEnCodigo+" || "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                            //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                        /*} else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 > "+nombreReferenciaArregloEnCodigo+") {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+"} else if( "+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 == -1 ) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 = "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                        }*/
                    }
                }
            } else if(regla.operacion.indexOf('PROM') == 0) {
                //trayendo formula correcta
                var formula = arregloDeIndicadores[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || arregloDeIndicadores[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("decimal") == 0) {
                        //if(arregloDeVariables[posicionVariable].esObjeto) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ( "+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 += "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0T0T4L++;", tipo: "MAX"});
                            //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                        /*} else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ( "+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 = 0;", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 += "+nombreReferenciaArregloEnCodigo+";", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0T0T4L++;", tipo: "MAX"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                        }*/
                    }
                }
            } else if(regla.operacion.indexOf('AUTOSUM') == 0) {
                //trayendo formula correcta
                var formula = arregloDeIndicadores[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("decimal") == 0) {
                        //if(arregloDeVariables[posicionVariable].esObjeto) {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "AUTOSUM"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1)", tipo: "AUTOSUM"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "AUTOSUM"});
                            //arreglo.push({codigo: "\n\t\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = evaluate("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 + "+nombreReferenciaArregloEnCodigo+");", tipo: "AUTOSUM"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "AUTOSUM"});
                        /*} else {
                            arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")) {", tipo: "AUTOSUM"});
                            arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 == -1)", tipo: "AUTOSUM"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 = 0;", tipo: "AUTOSUM"});
                            arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                            arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 = evaluate("+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 + "+nombreReferenciaArregloEnCodigo+");", tipo: "AUTOSUM"});
                            arreglo.push({codigo: "\n"+tabsText+"}", tipo: "AUTOSUM"});
                        }*/
                    }
                }
            } else if(regla.operacion.indexOf('COUNT') == 0) {
                var formula = arregloDeIndicadores[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("int") == 0 || formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("decimal") == 0) {
                    //if(arregloDeVariables[posicionVariable].esObjeto) {
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+") && !isNaN("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                        //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                    /*} else {
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+") ) {", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0++;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                    }*/
                } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("varchar") == 0) {
                    //if(arregloDeVariables[posicionVariable].esObjeto) {
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && "+nombreReferenciaArregloEnCodigo+".length > 0) {", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                        //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                    /*} else {
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && "+nombreReferenciaArregloEnCodigo+".length > 0) {", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0++;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                    }*/
                } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("bool") == 0) {
                    //if(arregloDeVariables[posicionVariable].esObjeto) {
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && ("+nombreReferenciaArregloEnCodigo+" == true || "+nombreReferenciaArregloEnCodigo+" == false) ) {", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                        //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                    /*} else {
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && ("+nombreReferenciaArregloEnCodigo+" == true || "+nombreReferenciaArregloEnCodigo+" == false) ) {", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0++;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                    }*/
                } else if(formula[0].fuenteDeDatos[0].tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0) {
                    //if(arregloDeVariables[posicionVariable].esObjeto) {
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+") {", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+"NU3V0++;", tipo: "COUNT"});
                        //arreglo.push({codigo: "\n\t"+tabsText+"if( window['"+arregloDeIndicadores[posicionVariable].nombre+"'].length == 0)", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                    /*} else {
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+")) {", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 == -1 )", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 = 0;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0++;", tipo: "COUNT"});
                        arreglo.push({codigo: "\n\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "COUNT"});
                    }*/
                }
            } else if(regla.operacion.indexOf('FORMULA') == 0) {
                var formula = arregloDeIndicadores[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                for (var i = 0; i < formula[0].fuenteDeDatos.length; i++) {
                    var saltoLinea = '\n';
                    if(formula[0].fuenteDeDatos[i].operacion != undefined && formula[0].fuenteDeDatos[i].operacion.length > 0) {
                        //if(formula[0].fuenteDeDatos[i].esFuenteDeDato) {
                            //elemento formula es de conexion de tabla
                            arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if (window['"+formula[0].fuenteDeDatos[i].nombreColumnaEnTabla+"'] != undefined) {", tipo: "FORMULA"});
                            newTabsTextFormula += "\t";
                            arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = window['"+formula[0].fuenteDeDatos[i].nombreColumnaEnTabla+"'];", tipo: "FORMULA"});
                            /*arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log('"+formula[0].fuenteDeDatos[i].nombreVariable+"');", tipo: "FORMULA"});
                            arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log("+formula[0].fuenteDeDatos[i].nombreVariable+");", tipo: "FORMULA"});*/
                        /*} else {
                            if (!arregloDeIndicadores[posicionVariable].esObjeto) {
                                arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if ("+nombreReferenciaArregloEnCodigo+" != undefined) {", tipo: "FORMULA"});
                                newTabsTextFormula += "\t";
                                //elemento formula es variable primitiva
                                if(i > 0) {
                                    arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+";", tipo: "FORMULA"});
                                } else {
                                    arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+";", tipo: "FORMULA"});
                                }
                            } else {
                                arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+" != undefined) {", tipo: "FORMULA"});
                                newTabsTextFormula += "\t";
                                if(i > 0) {
                                    arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+"[x]."+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+";", tipo: "FORMULA"});
                                } else {
                                    arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+"[x]."+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+";", tipo: "FORMULA"});
                                }
                            }
                        }*/
                    }
                };
                //arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeIndicadores[posicionVariable].nombre+"NU3V0."+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+" = math.eval(formula[0].formula);"});
                if(arregloDeIndicadores[posicionVariable].esObjeto)
                    arreglo.push({codigo: "\n"+tabsText+newTabsTextFormula+arregloDeIndicadores[posicionVariable].nombre+"NU3V0."+arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre+" = "+formula[0].formula+";"});
                else
                    arreglo.push({codigo: "\n"+tabsText+newTabsTextFormula+arregloDeIndicadores[posicionVariable].nombre+"NU3V0 = evaluate("+formula[0].formula+");"});
                arreglo.push({codigo: "\n"+tabsText+newTabsTextFormula+arregloDeIndicadores[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                for (var i = formula[0].fuenteDeDatos.length; i > 0; i--) {
                    posicionesIF.push(arreglo.length+i);
                }
            }
        } else {
            //condiciones if
            var arregloValoresAComparar = [];
            if(regla.valor.indexOf("LISTAID") == 0) {
                //
            } else if(regla.valor.indexOf("FECHA") == 0) {
                var fecha = regla.valor.substring(regla.valor.indexOf("[")+1, regla.valor.lastIndexOf("]"));
                arregloValoresAComparar = ["new Date("+fecha+").getTime()"];
            } else if(regla.valor.indexOf("TIEMPO") == 0) {
                var stringValores = regla.valor.substring(regla.valor.indexOf("[")+1, regla.valor.lastIndexOf("]"));
                var diasAgregarCadena = stringValores.split(",")[0], mesesAgregarCadena = stringValores.split(",")[1], aniosAgregarCadena = stringValores.split(",")[2], futuro = stringValores.split(",")[3];
                var diasAgregar = parseInt(diasAgregarCadena.indexOf("=")+1), mesesAgregar = parseInt(mesesAgregarCadena.indexOf("=")+1), aniosAgregar = parseInt(aniosAgregarCadena.indexOf("=")+1);
                var esFuturo = true;
                if(futuro.localeCompare("FUTURO") == 0)
                    esFuturo = true;
                else
                    esFuturo = false;
                var hoy = new Date();
                if(esFuturo) {
                    hoy = this.addYears(hoy, aniosAgregar);
                    hoy = this.addMonths(hoy, mesesAgregar);
                    hoy = this.addDays(hoy, diasAgregar);
                } else {
                    hoy = this.minusDays(hoy, aniosAgregar);
                    hoy = this.minusMonths(hoy, aniosAgregar);
                    hoy = this.minusYears(hoy, aniosAgregar);
                }
                arregloValoresAComparar = ["new Date("+hoy.getFullYear()+", "+hoy.getMonth()+", "+hoy.getDate()+").getTime()"];
            } else if(regla.valor.indexOf("MANUAL") == 0) {
                arregloValoresAComparar = [regla.valor.substring(regla.valor.indexOf("[")+1, regla.valor.lastIndexOf("]"))];
            }
            var nombreCampoDeArregloEnCodigo = '';
            if(regla.esConexionTabla) {
                nombreCampoDeArregloEnCodigo = regla.nombreColumnaEnTabla;
            } else {
                nombreCampoDeArregloEnCodigo = arregloDeIndicadores[posicionVariable].atributos[posicionCampo].nombre;
            }
            var tamArreglo = arreglo.length;
            //for (var j = 0; j < tamArreglo; j++) {
                for (var i = 0; i < arregloValoresAComparar.length; i++) {
                    var comparacion = "";
                    var inicioComparacion = "";
                    var operacion = "";
                    if(regla.operacion.localeCompare("ES_MENOR") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
                        operacion = "<";
                    } else if(regla.operacion.localeCompare("ES_MENOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
                        operacion = "<=";
                    } else if(regla.operacion.localeCompare("ES_MAYOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
                        operacion = ">=";
                    } else if(regla.operacion.localeCompare("ES_MAYOR") == 0 && regla.valor.indexOf("TIEMPO") != 0) {
                        operacion = ">";
                    } else if(regla.operacion.localeCompare("ES_IGUAL") == 0) {
                        operacion = "==";
                    } else if(regla.operacion.localeCompare("NO_ES_IGUAL") == 0) {
                        operacion = "!=";
                    } else if(regla.operacion.localeCompare("ES_MENOR") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = ">";
                    } else if(regla.operacion.localeCompare("ES_MENOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = ">=";
                    } else if(regla.operacion.localeCompare("ES_MAYOR_O_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = "<=";
                    } else if(regla.operacion.localeCompare("ES_MAYOR") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = "<";
                    } else if(regla.operacion.localeCompare("ES_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = "==";
                    } else if(regla.operacion.localeCompare("NO_ES_IGUAL") == 0 && regla.valor.indexOf("TIEMPO") == 0) {
                        operacion = "!=";
                    }
                    if (regla.tipoCampoObjetivo.localeCompare("date") == 0) {
                        if(regla.operacion.localeCompare("encuentra") == 0) {
                            //
                        } else if(regla.operacion.localeCompare("no_encuentra") == 0) {
                            //
                        } else {
                            if(esArregloReferenciaArregloEnCodigo) {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+")";
                                comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+".getTime() "+operacion+" "+arregloValoresAComparar[i];
                            } else {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+")";
                                comparacion = nombreReferenciaArregloEnCodigo+".getTime() "+operacion+" "+arregloValoresAComparar[i];
                            }
                        }
                    } else if (regla.tipoCampoObjetivo.localeCompare("varchar") == 0) {
                        if(regla.operacion.localeCompare("encuentra") == 0) {
                            //
                        } else if(regla.operacion.localeCompare("no_encuentra") == 0) {
                            //
                        } else {
                            if(esArregloReferenciaArregloEnCodigo) {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" != undefined";
                                comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+".localeCompare('"+arregloValoresAComparar[i]+"') "+operacion+" 0";
                            } else {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+" != undefined";
                                comparacion = nombreReferenciaArregloEnCodigo+".localeCompare('"+arregloValoresAComparar[i]+"') "+operacion+" 0";
                            }
                        }
                    } else if (regla.tipoCampoObjetivo.localeCompare("int") == 0 || regla.tipoCampoObjetivo.localeCompare("decimal") == 0) {
                        if(regla.operacion.localeCompare("encuentra") == 0) {
                            //
                        } else if(regla.operacion.localeCompare("no_encuentra") == 0) {
                            //
                        } else {
                            if(esArregloReferenciaArregloEnCodigo) {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+")"
                                comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" "+operacion+" "+arregloValoresAComparar[i];
                            } else {
                                inicioComparacion = nombreReferenciaArregloEnCodigo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+")"
                                comparacion = nombreReferenciaArregloEnCodigo+" "+operacion+" "+arregloValoresAComparar[i];
                            }
                        }
                    } else if (regla.tipoCampoObjetivo.localeCompare("bit") == 0) {
                        if(esArregloReferenciaArregloEnCodigo) {
                            inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" != undefined"
                            comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" "+operacion+" "+arregloValoresAComparar[i];
                        } else {
                            inicioComparacion = nombreReferenciaArregloEnCodigo+" != undefined"
                            comparacion = nombreReferenciaArregloEnCodigo+" "+operacion+" "+arregloValoresAComparar[i];
                        }
                    }
                    if(i+1 == arregloValoresAComparar.length) {
                        comparacion += " ) {";
                    }
                    if(i==0) {
                        //arreglo[j].codigo += comparacion;
                        //arreglo.push({codigo: tabsText+"console.log("+nombreReferenciaArregloEnCodigo+"[x]);", tipo: "COMPARACION"});
                        //arreglo.push({codigo: '\n'+tabsText+"console.log( "+nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+");", tipo: "COMPARACION"});
                        arreglo.push({codigo: '\n'+tabsText+"if ( "+inicioComparacion+" && "+comparacion, tipo: "COMPARACION"});
                    } else {
                        arreglo[arreglo.length-1].codigo += " && "+comparacion;
                    }
                };
                /*console.log("ENTROOO j");
            };*/
            posicionesIF.push(arreglo.length);
        }

        var cuerpo = arregloDeReglas.filter(function( object ) {
            return object.reglaPadreID == regla.ID;
        });
        if(cuerpo.length > 0) {
            var arregloCuerpo = [];
            for (var i = 0; i < cuerpo.length; i++) {
                /*var cuantasTabs = tabs;
                if(regla.esCondicion)
                    cuantasTabs++;*/
                var retorno = this.arregloCodigoReglaFormaOExcel(cuerpo[i], tabs+1, posicionVariable, posicionCampo, [], arregloDeReglas, nombreReferenciaArregloEnCodigo), esArregloReferenciaArregloEnCodigo;
                retorno[0].codigo = "\n"+retorno[0].codigo;
                $.merge( arregloCuerpo, retorno );
            };
            for (var i = 0; i < posicionesIF.length; i++) {
                arreglo.splice(posicionesIF[i], 0, ...arregloCuerpo);
                if(regla.esCondicion)
                    arreglo.splice(posicionesIF[i]+arregloCuerpo.length, 0, {codigo: "\n"+tabsText+"}", filtro: regla.filtro});
                for (var j = i; j < posicionesIF.length; j++) {
                    posicionesIF[j]+=arregloCuerpo.length;
                };
            };
            if(posicionesIF.length == 0)
                $.merge( arreglo, arregloCuerpo );
            return arreglo;
        } else {
            if(regla.esCondicion || posicionesIF.length > 0){
                for (var i = 0; i < posicionesIF.length; i++) {
                    if (newTabsTextFormula.length > 0)
                        newTabsTextFormula = newTabsTextFormula.substring(0, newTabsTextFormula.length - 1);
                    arreglo.splice(posicionesIF[i], 0, {codigo: "\n"+tabsText+newTabsTextFormula+"}", filtro: regla.filtro})
                };
            }
            return arreglo;
        }
    }

    reglaIndicadorTotal(indicador, posicionIndicador) {
        var arreglo = [], posicionesIF = [];
        var newTabsTextFormula = '';
        var codigoForInicio = '', codigoForFinal = '';
        var tabsText = '';
        for (var i = 0; i < indicador.elementoFormula.length; i++) {
            var saltoLinea = '\n';
            if(indicador.elementoFormula[i].operacion != undefined && indicador.elementoFormula[i].operacion.length > 0) {

                if(indicador.elementoFormula[i].conexionTablaID != undefined && indicador.elementoFormula[i].conexionTablaID != -1) {
                    var posicionTabla = -1;
                    for (var k = 0; k < arregloConexionesATablas.length; k++) {
                        if(arregloConexionesATablas[k].ID == indicador.elementoFormula[i].conexionTablaID) {
                            posicionTabla = k;
                        }
                    };
                    codigoForInicio += "\tfor(var x = 0; x < arregloResultadosDeTablas["+posicionTabla+"].length; x++) {";
                    if(tabsText.length == 0)
                        tabsText = '\t\t';

                    arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if (arregloResultadosDeTablas["+posicionTabla+"][x]."+indicador.elementoFormula[i].nombreColumnaEnTabla+" != undefined) {", tipo: "FORMULA"});
                    newTabsTextFormula += "\t";
                    arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+indicador.elementoFormula[i].nombreVariable+" = arregloResultadosDeTablas["+posicionTabla+"][x]."+indicador.elementoFormula[i].nombreColumnaEnTabla+";", tipo: "FORMULA"});
                    /*arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log('"+indicador.elementoFormula[i].nombreVariable+"');", tipo: "FORMULA"});
                    arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log("+indicador.elementoFormula[i].nombreVariable+");", tipo: "FORMULA"});*/
                    posicionesIF.push(arreglo.length);

                    codigoForFinal += "\n\t};";
                } else if(indicador.elementoFormula[i].elementoVariableID != undefined && indicador.elementoFormula[i].elementoVariableID != -1) {
                    var variable = null;
                    for (var k = 0; k < arregloDeVariables.length; k++) {
                        if(arregloDeVariables[k].ID == indicador.elementoFormula[i].elementoVariableID) {
                            variable = arregloDeVariables[k];
                        }
                    };
                    if(variable != null) {
                        var esArreglo = false;
                        if(variable.esColeccion || variable.esInstruccionSQL) {
                            codigoForInicio += '\tfor(var x = 0; x < window["'+variable.nombre+'"].length; x++) {';
                            esArreglo = true;
                            if(tabsText.length == 0)
                                tabsText = '\t\t';
                        }
                        if(tabsText.length == 0)
                            tabsText = '\t';
                        if(esArreglo) {
                            arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if (window['"+variable.nombre+"'][x]."+indicador.elementoFormula[i].nombreColumnaEnTabla+" != undefined) {", tipo: "FORMULA"});
                            newTabsTextFormula += "\t";
                            arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+indicador.elementoFormula[i].nombreVariable+" = window['"+variable.nombre+"'][x]."+indicador.elementoFormula[i].nombreColumnaEnTabla+";", tipo: "FORMULA"});
                            arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log('"+indicador.elementoFormula[i].nombreVariable+"');", tipo: "FORMULA"});
                            arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log("+indicador.elementoFormula[i].nombreVariable+");", tipo: "FORMULA"});
                        } else {
                            arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if (window['"+variable.nombre+"'] != undefined) {", tipo: "FORMULA"});
                            newTabsTextFormula += "\t";
                            arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+indicador.elementoFormula[i].nombreVariable+" = window['"+variable.nombre+"'];", tipo: "FORMULA"});
                            arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log('"+indicador.elementoFormula[i].nombreVariable+"');", tipo: "FORMULA"});
                            arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log("+indicador.elementoFormula[i].nombreVariable+");", tipo: "FORMULA"});
                        }
                        posicionesIF.push(arreglo.length);
                        if(variable.esColeccion || variable.esInstruccionSQL) {
                            codigoForFinal += '\t}';
                        }
                    } else {
                        console.log("variable es null | variable.")
                    }
                } else if(indicador.elementoFormula[i].excelArchivoID != undefined && indicador.elementoFormula[i].excelArchivoID != -1) {
                    var variable = null;
                    For1:
                    for (var k = 0; k < arregloDeExcel.length; k++) {
                        if(arregloDeExcel[k].ID == indicador.elementoFormula[i].excelArchivoID) {
                            for (var l = 0; l < arregloDeExcel[k].variables.length; l++) {
                                if(arregloDeExcel[k].variables[l].ID == indicador.elementoFormula[i].excelVariableID) {
                                    variable = arregloDeExcel[k].variables[l];
                                    break For1;
                                }
                            };
                        }
                    };
                    if(variable != null) {
                        var esArreglo = false;
                        if(window[variable.nombre].length != undefined) {
                            codigoForInicio += '\tfor(var x = 0; x < window["'+variable.nombre+'"].length; x++) {';
                            esArreglo = true;
                            if(tabsText.length == 0)
                                tabsText = '\t\t';
                        }
                        if(tabsText.length == 0)
                            tabsText = '\t';
                        if(esArreglo) {
                            arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if (window['"+variable.nombre+"'][x]."+indicador.elementoFormula[i].nombreColumnaEnTabla+" != undefined) {", tipo: "FORMULA"});
                            newTabsTextFormula += "\t";
                            arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+indicador.elementoFormula[i].nombreVariable+" = window['"+variable.nombre+"'][x]."+indicador.elementoFormula[i].nombreColumnaEnTabla+";", tipo: "FORMULA"});
                            /*arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log('"+indicador.elementoFormula[i].nombreVariable+"');", tipo: "FORMULA"});
                            arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log("+indicador.elementoFormula[i].nombreVariable+");", tipo: "FORMULA"});*/
                        } else {
                            arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if (window['"+variable.nombre+"'] != undefined) {", tipo: "FORMULA"});
                            newTabsTextFormula += "\t";
                            arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+indicador.elementoFormula[i].nombreVariable+" = window['"+variable.nombre+"'];", tipo: "FORMULA"});
                            /*arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log('"+indicador.elementoFormula[i].nombreVariable+"');", tipo: "FORMULA"});
                            arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log("+indicador.elementoFormula[i].nombreVariable+");", tipo: "FORMULA"});*/
                        }
                        posicionesIF.push(arreglo.length);
                        if(window[variable.nombre].length != undefined) {
                            codigoForFinal += '\t}';
                        }
                    } else {
                        console.log("variable es null | excel.")
                    }
                } else if(indicador.elementoFormula[i].formaVariableID != undefined && indicador.elementoFormula[i].formaVariableID != -1) {
                    var variable = null;
                    for (var k = 0; k < arregloDeFormas.length; k++) {
                        if(arregloDeFormas[k].ID == indicador.elementoFormula[i].formaVariableID) {
                            variable = arregloDeFormas[k];
                        }
                    };
                    if(variable != null) {
                        arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"if (window['"+variable.nombre+"'] != undefined) {", tipo: "FORMULA"});
                        newTabsTextFormula += "\t";
                        arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+indicador.elementoFormula[i].nombreVariable+" = window['"+variable.nombre+"'];", tipo: "FORMULA"});
                        arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log('"+indicador.elementoFormula[i].nombreVariable+"');", tipo: "FORMULA"});
                        arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log("+indicador.elementoFormula[i].nombreVariable+");", tipo: "FORMULA"});
                        posicionesIF.push(arreglo.length);
                    } else {
                        console.log("variable es null | forma.")
                    }
                } else if(indicador.elementoFormula[i].esValorManual) {
                    newTabsTextFormula += "\t";
                    arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"var "+indicador.elementoFormula[i].nombreVariable+" = "+indicador.elementoFormula[i].nombreColumnaEnTabla+";", tipo: "FORMULA"});
                    arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log('"+indicador.elementoFormula[i].nombreVariable+"');", tipo: "FORMULA"});
                    arreglo.push({codigo: saltoLinea+tabsText+newTabsTextFormula+"console.log("+indicador.elementoFormula[i].nombreVariable+");", tipo: "FORMULA"});
                }
            }
        };
        var formula = indicador.formula;
        if(indicador.formula.indexOf("ASIG") == 0) {
            formula = indicador.formula.substring(indicador.formula.indexOf("(")+1, indicador.formula.indexOf(")"));
        }
        arreglo.push({codigo: "\n"+tabsText+newTabsTextFormula+"arregloDeIndicadores["+posicionIndicador+"].total = evaluate("+formula+");"});
        arreglo.push({codigo: "\n"+tabsText+newTabsTextFormula+"if(arregloDeIndicadores["+posicionIndicador+"].tipoValorIdeal.localeCompare('porcentual') == 0) {"});
        arreglo.push({codigo: "\n"+tabsText+newTabsTextFormula+"\tarregloDeIndicadores["+posicionIndicador+"].total = arregloDeIndicadores["+posicionIndicador+"].total * 100;"});
        arreglo.push({codigo: "\n"+tabsText+newTabsTextFormula+"}"});
        arreglo.push({codigo: "\n"+tabsText+newTabsTextFormula+"arregloDeIndicadores["+posicionIndicador+"].total = round(arregloDeIndicadores["+posicionIndicador+"].total, 4);"});
        for (var i = 0; i < posicionesIF.length; i++) {
            if (newTabsTextFormula.length > 0)
                newTabsTextFormula = newTabsTextFormula.substring(0, newTabsTextFormula.length - 1);
            arreglo.push({codigo: "\n"+tabsText+newTabsTextFormula+"}"})
        };
        //arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" = math.eval(formula[0].formula);"});
        var codigo = '';
        for (var i = 0; i < arreglo.length; i++) {
            codigo += arreglo[i].codigo;
        };
        return codigoForInicio+codigo+codigoForFinal;
    }

    

    iniciarCalculoIndicadores () {
        //AGRUPANDO ELEMENTOS DE FORMULA POR CONEXION A TABLA
        var arregloAgrupacionElementosFormulaPorConexionATablaIndicadores = [];    //arreglo que contiene los segmento de reglas agrupados por el arreglo de tablas
        //la variable es insertado una unica vez cada por cada segmento de regla que pertenezca a la tabla
        var arregloAgrupacionElementosFormulaPorVariablesIndicadores = [];    //arreglo que contiene los segmento de reglas de la variable a calcular agrupados por la posicion de la variable a comparar en el arregloDeVariables
        //la variable es insertado una unica vez cada por cada segmento de regla que pertenezca a la tabla
        var arregloAgrupacionElementosFormulaPorExcelIndicadores = [];    //arreglo que contiene los segmento de reglas de la variable excel a calcular agrupados por la posicion de la variable a comparar en el arregloDeVariables
        //la variable es insertado una unica vez cada por cada segmento de regla que pertenezca a la tabla
        var arregloAgrupacionElementosFormulaPorFormasIndicadores = [];    //arreglo que contiene los segmento de reglas de la variable forma a calcular agrupados por la posicion de la variable a comparar en el arregloDeVariables
        //la variable es insertado una unica vez cada por cada segmento de regla que pertenezca a la tabla
        var arregloAgrupacionElementosFormulaPorManualIndicadores = [];
        for (var i = 0; i < arregloDeIndicadores.length; i++) {
            for (var j = 0; j < arregloDeIndicadores[i].atributos.length; j++) {
                for (var k = 0; k < arregloDeIndicadores[i].atributos[j].segmentoReglas.length; k++) {
                    if (arregloDeIndicadores[i].atributos[j].segmentoReglas[k].esConexionTabla) {
                        for (var m = 0; m < arregloConexionesATablas.length; m++) {
                            if (arregloDeIndicadores[i].atributos[j].segmentoReglas[k].conexionTablaID == arregloConexionesATablas[m].ID) {
                                if(arregloAgrupacionElementosFormulaPorConexionATablaIndicadores[m] == undefined)
                                    arregloAgrupacionElementosFormulaPorConexionATablaIndicadores[m] = [];
                                arregloAgrupacionElementosFormulaPorConexionATablaIndicadores[m].push({segmentoRegla: arregloDeIndicadores[i].atributos[j].segmentoReglas[k], variable: arregloDeIndicadores[i], atributo: arregloDeIndicadores[i].atributos[j], index: k});
                                break;
                            }
                        };
                    } else if (arregloDeIndicadores[i].atributos[j].segmentoReglas[k].excelArchivoID != -1 && arregloDeIndicadores[i].atributos[j].segmentoReglas[k].formaVariableID == -1 && arregloDeIndicadores[i].atributos[j].segmentoReglas[k].variableIDCreacionCodigo == -1) {
                        for (var x = 0; x < arregloDeExcel.length; x++) {
                            if(arregloDeIndicadores[i].atributos[j].segmentoReglas[k].excelArchivoID == arregloDeExcel[x].ID) {
                                if(arregloAgrupacionElementosFormulaPorExcelIndicadores[x] == undefined)
                                    arregloAgrupacionElementosFormulaPorExcelIndicadores[x] = [];
                                for (var y = 0; y < arregloDeExcel[x].variables.length; y++) {
                                    if(arregloDeIndicadores[i].atributos[j].segmentoReglas[k].excelVariableID == arregloDeExcel[x].variables[y].ID) {
                                        if(arregloAgrupacionElementosFormulaPorExcelIndicadores[x][y] == undefined)
                                            arregloAgrupacionElementosFormulaPorExcelIndicadores[x][y] = [];
                                        arregloAgrupacionElementosFormulaPorExcelIndicadores[x][y].push({segmentoRegla: arregloDeIndicadores[i].atributos[j].segmentoReglas[k], variable: arregloDeIndicadores[i], variableCreacionCodigo: arregloDeExcel[x].variables[y], atributo: arregloDeIndicadores[i].atributos[j], index: k});
                                        break;
                                    }
                                };
                            }
                        };
                    } else if (arregloDeIndicadores[i].atributos[j].segmentoReglas[k].formaVariableID != -1 && arregloDeIndicadores[i].atributos[j].segmentoReglas[k].excelArchivoID == -1 && arregloDeIndicadores[i].atributos[j].segmentoReglas[k].variableIDCreacionCodigo == -1) {
                        for (var x = 0; x < arregloDeFormas.length; x++) {
                            if(arregloDeIndicadores[i].atributos[j].segmentoReglas[k].formaVariableID == arregloDeFormas[x].ID) {
                                if(arregloAgrupacionElementosFormulaPorFormasIndicadores[x] == undefined)
                                    arregloAgrupacionElementosFormulaPorFormasIndicadores[x] = [];
                                arregloAgrupacionElementosFormulaPorFormasIndicadores[x].push({segmentoRegla: arregloDeIndicadores[i].atributos[j].segmentoReglas[k], variable: arregloDeIndicadores[i], variableCreacionCodigo: arregloDeFormas[x], atributo: arregloDeIndicadores[i].atributos[j], index: k});
                                break;
                            }
                        };
                    } else if (arregloDeIndicadores[i].atributos[j].segmentoReglas[k].esValorManual && arregloDeIndicadores[i].atributos[j].segmentoReglas[k].formaVariableID == -1 && arregloDeIndicadores[i].atributos[j].segmentoReglas[k].excelArchivoID == -1 && arregloDeIndicadores[i].atributos[j].segmentoReglas[k].variableIDCreacionCodigo == -1) {
                        if(arregloAgrupacionElementosFormulaPorManualIndicadores[i] == undefined)
                            arregloAgrupacionElementosFormulaPorManualIndicadores[i] = [];
                        var primeraVariableParaCreacionEnCodigo, entro = false;
                        if(arregloDeVariables.length > 0) {
                            entro = true;
                            primeraVariableParaCreacionEnCodigo = arregloDeVariables[0];
                        } else if(arregloDeExcel.length > 0) {
                            entro = true;
                            primeraVariableParaCreacionEnCodigo = arregloDeExcel[0];
                        } else if(arregloDeFormas.length > 0) {
                            entro = true;
                            primeraVariableParaCreacionEnCodigo = arregloDeFormas[0];
                        }
                        if(entro)
                            arregloAgrupacionElementosFormulaPorManualIndicadores[i].push({segmentoRegla: arregloDeIndicadores[i].atributos[j].segmentoReglas[k], variable: arregloDeIndicadores[i], variableCreacionCodigo: primeraVariableParaCreacionEnCodigo, atributo: arregloDeIndicadores[i].atributos[j], index: k});
                    } else {
                        for (var x = 0; x < arregloDeVariables.length; x++) {
                            if(arregloDeIndicadores[i].atributos[j].segmentoReglas[k].variableIDCreacionCodigo == arregloDeVariables[x].ID) {
                                if(arregloAgrupacionElementosFormulaPorVariablesIndicadores[x] == undefined)
                                    arregloAgrupacionElementosFormulaPorVariablesIndicadores[x] = [];
                                arregloAgrupacionElementosFormulaPorVariablesIndicadores[x].push({segmentoRegla: arregloDeIndicadores[i].atributos[j].segmentoReglas[k], variable: arregloDeIndicadores[i], variableCreacionCodigo: arregloDeVariables[x], atributo: arregloDeIndicadores[i].atributos[j], index: k});
                                break;
                            }
                        };
                    }
                };
            };
        };

        var codigo = '';


        var arregloAgrupacionElementosFormulaPorConexionATablaIndicadoresElementoFormula = [];
        var arregloAgrupacionElementosFormulaPorVariablesIndicadoresElementoFormula = [];
        var arregloAgrupacionElementosFormulaPorExcelIndicadoresElementoFormula = [];
        var arregloAgrupacionElementosFormulaPorFormasIndicadoresElementoFormula = [];
        var arregloAgrupacionElementosFormulaPorManualIndicadoresElementoFormula = [];

        for (var i = 0; i < arregloDeIndicadores.length; i++) {
            codigo += this.reglaIndicadorTotal(arregloDeIndicadores[i], i);
        };

        /*console.log('arregloAgrupacionElementosFormulaPorConexionATablaIndicadores');
        console.log(arregloAgrupacionElementosFormulaPorConexionATablaIndicadores);
        console.log('arregloAgrupacionElementosFormulaPorVariablesIndicadores');
        console.log(arregloAgrupacionElementosFormulaPorVariablesIndicadores);
        console.log('arregloAgrupacionElementosFormulaPorExcelIndicadores');
        console.log(arregloAgrupacionElementosFormulaPorExcelIndicadores);
        console.log('arregloAgrupacionElementosFormulaPorFormasIndicadores');
        console.log(arregloAgrupacionElementosFormulaPorFormasIndicadores);
        console.log('arregloAgrupacionElementosFormulaPorManualIndicadores');
        console.log(arregloAgrupacionElementosFormulaPorManualIndicadores);

        //codigo var general
        console.log('\n\n\n');
        console.log('nivelMaximoIndicadores');
        console.log(nivelMaximoIndicadores);
        console.log('\n\n\n');*/
        for (var i = 0; i <= nivelMaximoIndicadores; i++) {
            if(i == 0) {
                var llamarSiguienteNivel = false;
                if(nivelMaximoVariables >= 1)
                    llamarSiguienteNivel = true;
                codigo += this.crearCodigoFuenteDatoIndicadores(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorConexionATablaIndicadores, 0);
                codigo += this.crearNivelIndicadores(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorExcelIndicadores, 0);
                codigo += this.crearNivelIndicadores(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorFormasIndicadores, 0);
                codigo += this.crearNivelIndicadores(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorManualIndicadores, 0);
            } else {
                var llamarSiguienteNivel = false;
                if(nivelMaximoVariables > i)
                    llamarSiguienteNivel = true;
                codigo += this.crearNivelIndicadores(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorVariablesIndicadores, i);
                codigo += this.crearNivelIndicadores(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorExcelIndicadores, i);
                codigo += this.crearNivelIndicadores(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorFormasIndicadores, i);
            }
        };

        /*for (var i = 0; i < arregloDeIndicadores.length; i++) {
            var objetoConexiones = {};
            for (var j = 0; j < arregloDeIndicadores[i].elementoFormula.length; j++) {
                var variableDeElementoID = -1;
                var variableDeElemento = null;
                if(arregloDeIndicadores[i].elementoFormula[j].elementoVariableID != undefined && arregloDeIndicadores[i].elementoFormula[j].elementoVariableID != -1) {
                    for (var k = 0; k < arregloDeVariables.length; k++) {
                        if(arregloDeVariables[k].ID == arregloDeIndicadores[i].elementoFormula[j].elementoVariableID) {
                            variableDeElementoID = arregloDeIndicadores[i].elementoFormula[j].elementoVariableID;
                            variableDeElemento = arregloDeVariables[k];
                        }
                    };
                }
                if(objetoConexiones.conexionTablaID == undefined && arregloDeIndicadores[i].elementoFormula[j].conexionTablaID != undefined && arregloDeIndicadores[i].elementoFormula[j].conexionTablaID != -1) {
                    objetoConexiones.conexionTablaID = arregloDeIndicadores[i].elementoFormula[j].conexionTablaID;
                } else if((objetoConexiones.variableID == undefined && arregloDeIndicadores[i].elementoFormula[j].elementoVariableID != undefined && arregloDeIndicadores[i].elementoFormula[j].elementoVariableID != -1) || (objetoConexiones.variableID != undefined && arregloDeIndicadores[i].elementoFormula[j].elementoVariableID != undefined && arregloDeIndicadores[i].elementoFormula[j].elementoVariableID != -1 && variableDeElementoID != -1 && variableDeElemento != null && variableDeElemento.esObjeto)) {
                    objetoConexiones.variableID = arregloDeIndicadores[i].elementoFormula[j].elementoVariableID;
                    objetoConexiones.variableCampoID = arregloDeIndicadores[i].elementoFormula[j].elementoVariableCampoID;
                } else if(objetoConexiones.excelArchivoID == undefined && arregloDeIndicadores[i].elementoFormula[j].excelArchivoID != undefined && arregloDeIndicadores[i].elementoFormula[j].excelArchivoID != -1) {
                    objetoConexiones.excelArchivoID = arregloDeIndicadores[i].elementoFormula[j].excelArchivoID;
                    objetoConexiones.excelVariableID = arregloDeIndicadores[i].elementoFormula[j].excelVariableID;
                } else if(objetoConexiones.formaVariableID == undefined && arregloDeIndicadores[i].elementoFormula[j].formaVariableID != undefined && arregloDeIndicadores[i].elementoFormula[j].formaVariableID != -1) {
                    objetoConexiones.formaVariableID = arregloDeIndicadores[i].elementoFormula[j].formaVariableID;
                } else if(objetoConexiones.esValorManual == undefined && arregloDeIndicadores[i].elementoFormula[j].esValorManual) {
                    objetoConexiones.esValorManual = arregloDeIndicadores[i].elementoFormula[j].esValorManual;
                }
            };
            console.log('objetoConexiones')
            console.log(objetoConexiones)
            console.log('arregloDeIndicadores[i]')
            console.log(arregloDeIndicadores[i])
            if (objetoConexiones.conexionTablaID != undefined && objetoConexiones.conexionTablaID != -1) {
                var posicionTabla = -1;
                for (var k = 0; k < arregloConexionesATablas.length; k++) {
                    if(arregloConexionesATablas[k].ID == objetoConexiones.conexionTablaID) {
                        posicionTabla = k;
                    }
                };
                if(arregloAgrupacionElementosFormulaPorConexionATablaIndicadoresElementoFormula[posicionTabla] == undefined)
                    arregloAgrupacionElementosFormulaPorConexionATablaIndicadoresElementoFormula[posicionTabla] = [];
                arregloAgrupacionElementosFormulaPorConexionATablaIndicadoresElementoFormula[posicionTabla].push(arregloDeIndicadores[i]);
                arregloAgrupacionElementosFormulaPorConexionATablaIndicadoresElementoFormula[posicionTabla][arregloAgrupacionElementosFormulaPorConexionATablaIndicadoresElementoFormula[posicionTabla].length-1].posicion = i;
            } else if (objetoConexiones.variableID != undefined && objetoConexiones.variableID != -1) {
                var posicionTabla = -1;
                for (var k = 0; k < arregloDeVariables.length; k++) {
                    if(arregloDeVariables[k].ID == objetoConexiones.variableID) {
                        posicionTabla = k;
                    }
                };
                if(arregloAgrupacionElementosFormulaPorVariablesIndicadoresElementoFormula[posicionTabla] == undefined)
                    arregloAgrupacionElementosFormulaPorVariablesIndicadoresElementoFormula[posicionTabla] = [];
                arregloAgrupacionElementosFormulaPorVariablesIndicadoresElementoFormula[posicionTabla].push(arregloDeIndicadores[i]);
                arregloAgrupacionElementosFormulaPorVariablesIndicadoresElementoFormula[posicionTabla][arregloAgrupacionElementosFormulaPorVariablesIndicadoresElementoFormula[posicionTabla].length-1].posicion = i;
            } else if (objetoConexiones.excelArchivoID != undefined && objetoConexiones.excelArchivoID != -1) {
                var posicionTabla = -1;
                var posicionVar = -1;
                For1:
                for (var k = 0; k < arregloDeExcel.length; k++) {
                    posicionTabla = k;
                    for (var l = 0; l < arregloDeExcel[k].variables.length; l++) {
                        if(arregloDeExcel[k].variables[l].ID == objetoConexiones.excelVariableID) {
                            posicionVar = l;
                            break For1;
                        }
                    };
                };
                if(arregloAgrupacionElementosFormulaPorExcelIndicadoresElementoFormula[posicionTabla] == undefined)
                    arregloAgrupacionElementosFormulaPorExcelIndicadoresElementoFormula[posicionTabla] = [];
                if(arregloAgrupacionElementosFormulaPorExcelIndicadoresElementoFormula[posicionTabla][posicionVar] == undefined)
                    arregloAgrupacionElementosFormulaPorExcelIndicadoresElementoFormula[posicionTabla][posicionVar] = [];
                arregloAgrupacionElementosFormulaPorExcelIndicadoresElementoFormula[posicionTabla][posicionVar].push(arregloDeIndicadores[i]);
                arregloAgrupacionElementosFormulaPorExcelIndicadoresElementoFormula[posicionTabla][posicionVar][arregloAgrupacionElementosFormulaPorExcelIndicadoresElementoFormula[posicionTabla][posicionVar].length-1].posicion = i;
            } else if (objetoConexiones.formaVariableID != undefined && objetoConexiones.formaVariableID != -1) {
                var posicionTabla = -1;
                for (var k = 0; k < arregloDeFormas.length; k++) {
                    if(arregloDeFormas[k].ID == objetoConexiones.formaVariableID) {
                        posicionTabla = k;
                    }
                };
                if(arregloAgrupacionElementosFormulaPorFormasIndicadoresElementoFormula[posicionTabla] == undefined)
                    arregloAgrupacionElementosFormulaPorFormasIndicadoresElementoFormula[posicionTabla] = [];
                arregloAgrupacionElementosFormulaPorFormasIndicadoresElementoFormula[posicionTabla].push(arregloDeIndicadores[i]);
                arregloAgrupacionElementosFormulaPorFormasIndicadoresElementoFormula[posicionTabla][arregloAgrupacionElementosFormulaPorFormasIndicadoresElementoFormula.length-1].posicion = i;
            } else if (objetoConexiones.esValorManual != undefined && objetoConexiones.esValorManual) {
                arregloAgrupacionElementosFormulaPorManualIndicadoresElementoFormula.push(arregloDeIndicadores[i]);
                arregloAgrupacionElementosFormulaPorManualIndicadoresElementoFormula[arregloAgrupacionElementosFormulaPorManualIndicadoresElementoFormula.length-1].posicion = i;
            }
        };
        console.log('arregloAgrupacionElementosFormulaPorConexionATablaIndicadoresElementoFormula');
        console.log(arregloAgrupacionElementosFormulaPorConexionATablaIndicadoresElementoFormula);
        console.log('arregloAgrupacionElementosFormulaPorVariablesIndicadoresElementoFormula');
        console.log(arregloAgrupacionElementosFormulaPorVariablesIndicadoresElementoFormula);
        console.log('arregloAgrupacionElementosFormulaPorExcelIndicadoresElementoFormula');
        console.log(arregloAgrupacionElementosFormulaPorExcelIndicadoresElementoFormula);
        console.log('arregloAgrupacionElementosFormulaPorFormasIndicadoresElementoFormula');
        console.log(arregloAgrupacionElementosFormulaPorFormasIndicadoresElementoFormula);
        console.log('arregloAgrupacionElementosFormulaPorManualIndicadoresElementoFormula');
        console.log(arregloAgrupacionElementosFormulaPorManualIndicadoresElementoFormula);

        if(arregloAgrupacionElementosFormulaPorConexionATablaIndicadoresElementoFormula.length > 0) {
            for (var i = 0; i < arregloConexionesATablas.length; i++) {
                if(arregloAgrupacionElementosFormulaPorConexionATablaIndicadoresElementoFormula[i] != undefined) {
                    codigo += "\tfor(var x = 0; x < arregloResultadosDeTablas["+i+"].length; x++) {";
                    for (var j = 0; j < arregloAgrupacionElementosFormulaPorConexionATablaIndicadoresElementoFormula[i].length; j++) {
                        if(arregloAgrupacionElementosFormulaPorConexionATablaIndicadoresElementoFormula[i][j] != undefined)
                            codigo += this.reglaIndicadorTotal(arregloAgrupacionElementosFormulaPorConexionATablaIndicadoresElementoFormula[i][j], arregloAgrupacionElementosFormulaPorConexionATablaIndicadoresElementoFormula[i][j].posicion, '\t\t', true, "arregloResultadosDeTablas["+i+"]");
                    };
                    codigo += "\n\t};";
                }
            };
        }
        if(arregloAgrupacionElementosFormulaPorVariablesIndicadoresElementoFormula.length > 0) {
            for (var i = 0; i < arregloDeVariables.length; i++) {
                if(arregloAgrupacionElementosFormulaPorVariablesIndicadoresElementoFormula[i] != undefined) {
                    var esArreglo = false;
                    var tabs = '\t\t';
                    if(arregloDeVariables[i].esColeccion || arregloDeVariables[i].esInstruccionSQL) {
                        codigo += '\tfor(var x = 0; x < window["'+arregloDeVariables[i].nombre+'"].length; x++) {';
                        esArreglo = true;
                        tabs += '\t';
                    }
                    for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariablesIndicadoresElementoFormula[i].length; j++) {
                        if(arregloAgrupacionElementosFormulaPorVariablesIndicadoresElementoFormula[i][j] != undefined)
                            codigo += this.reglaIndicadorTotal(arregloAgrupacionElementosFormulaPorVariablesIndicadoresElementoFormula[i][j], arregloAgrupacionElementosFormulaPorVariablesIndicadoresElementoFormula[i][j].posicion, tabs, esArreglo, 'window["'+arregloDeVariables[i].nombre+'"]');
                    };
                    if(arregloDeVariables[i].esColeccion || arregloDeVariables[i].esInstruccionSQL) {
                        codigo += "\n\t};";
                    }
                }
            };
        }
        if(arregloAgrupacionElementosFormulaPorExcelIndicadoresElementoFormula.length > 0) {
            for (var i = 0; i < arregloDeExcel.length; i++) {
                for (var j = 0; j < arregloDeExcel[i].variables.length; j++) {
                    if(arregloAgrupacionElementosFormulaPorExcelIndicadoresElementoFormula[i] != undefined) {
                        var esArreglo = false;
                        var tabs = '\t\t';
                        if(window[arregloDeExcel[i].variables[j].nombre].length != undefined) {
                            codigo += '\tfor(var x = 0; x < window["'+arregloDeExcel[i].variables[j].nombre+'"].length; x++) {';
                            esArreglo = true;
                            tabs += '\t';
                        }
                        if(arregloAgrupacionElementosFormulaPorExcelIndicadoresElementoFormula[i][j] != undefined)
                            for (var k = 0; k < arregloAgrupacionElementosFormulaPorExcelIndicadoresElementoFormula[i][j].length; k++) {
                                if(arregloAgrupacionElementosFormulaPorExcelIndicadoresElementoFormula[i][j][k] != undefined)
                                    codigo += this.reglaIndicadorTotal(arregloAgrupacionElementosFormulaPorExcelIndicadoresElementoFormula[i][j][k], arregloAgrupacionElementosFormulaPorExcelIndicadoresElementoFormula[i][j][k].posicion, tabs, esArreglo, 'window["'+arregloDeExcel[i].variables[j].nombre+'"]');
                            };
                        if(window[arregloDeExcel[i].variables[j].nombre].length != undefined) {
                            codigo += "\n\t};";
                        }
                    }
                };
            };
        }
        if(arregloAgrupacionElementosFormulaPorFormasIndicadoresElementoFormula.length > 0) {
            for (var i = 0; i < arregloDeFormas.length; i++) {
                if(arregloAgrupacionElementosFormulaPorFormasIndicadoresElementoFormula[i] != undefined) {
                    for (var j = 0; j < arregloAgrupacionElementosFormulaPorFormasIndicadoresElementoFormula[i].length; j++) {
                        if(arregloAgrupacionElementosFormulaPorFormasIndicadoresElementoFormula[i][j] != undefined)
                            codigo += this.reglaIndicadorTotal(arregloAgrupacionElementosFormulaPorFormasIndicadoresElementoFormula[i][j], arregloAgrupacionElementosFormulaPorFormasIndicadoresElementoFormula[i][j].posicion, '\t\t', false);
                    };
                }
            };
        }
        if(arregloAgrupacionElementosFormulaPorManualIndicadoresElementoFormula.length > 0) {
            for (var i = 0; i < arregloAgrupacionElementosFormulaPorManualIndicadoresElementoFormula.length; i++) {
                if(arregloAgrupacionElementosFormulaPorManualIndicadoresElementoFormula[i] != undefined) {
                    if(arregloAgrupacionElementosFormulaPorManualIndicadoresElementoFormula[i] != undefined)
                        codigo += this.reglaIndicadorTotal(arregloAgrupacionElementosFormulaPorManualIndicadoresElementoFormula[i], arregloAgrupacionElementosFormulaPorManualIndicadoresElementoFormula[i].posicion, '\t\t', false);
                }
            };
        }

        console.log('arregloAgrupacionElementosFormulaPorConexionATablaIndicadoresElementoFormula');
        console.log(arregloAgrupacionElementosFormulaPorConexionATablaIndicadoresElementoFormula);
        console.log('arregloAgrupacionElementosFormulaPorVariablesIndicadoresElementoFormula');
        console.log(arregloAgrupacionElementosFormulaPorVariablesIndicadoresElementoFormula);
        console.log('arregloAgrupacionElementosFormulaPorExcelIndicadoresElementoFormula');
        console.log(arregloAgrupacionElementosFormulaPorExcelIndicadoresElementoFormula);
        console.log('arregloAgrupacionElementosFormulaPorFormasIndicadoresElementoFormula');
        console.log(arregloAgrupacionElementosFormulaPorFormasIndicadoresElementoFormula);
        console.log('arregloAgrupacionElementosFormulaPorManualIndicadoresElementoFormula');
        console.log(arregloAgrupacionElementosFormulaPorManualIndicadoresElementoFormula);*/



        ////////////////////////////////////////////////////////////



        /*codigo += this.crearCodigoFuenteDato(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorConexionATablaVariables, 0);
        codigo += this.crearCodigoFuenteDato(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorConexionATablaVariables, 0);
        codigo += this.crearCodigoFuenteDato(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorConexionATablaVariables, 0);
        for (var i = 0; i <= nivelMaximoIndicadores; i++) {
            if(i == 0) {
                var llamarSiguienteNivel = false;
                if(nivelMaximoVariables >= 1)
                    llamarSiguienteNivel = true;
                codigo += this.crearCodigoFuenteDato(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorConexionATablaVariables, 0);
            } else {
                var llamarSiguienteNivel = false;
                if(nivelMaximoVariables > i)
                    llamarSiguienteNivel = true;
                codigo += this.crearNivel(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorVariablesVariables, i);
            }
        };*/
        //crear codigo pertenecientes a tablas
        /*var codigoTablas = '';
        var primeraVezCodigoIndicador1 = true;
        for (var i = 0; i < arregloDeIndicadores.length; i++) {
            if(arregloDeIndicadores[i].realizarCalculo) {
                var tabsText = '\t\t\t';
                var primeraVezCodigoTabla = true;
                for (var j = 0; j < arregloDeIndicadores[i].elementoFormula.length; j++) {
                    var entroElemento = false;
                    if(primeraVezCodigoIndicador1) {
                        codigoTablas += '\n\tfor (var x = 0; x < window["arregloDeIndicadores"].length; x++) {';
                        primeraVezCodigoIndicador1 = false;
                    }
                    for (var a = 0; a < arregloConexionesATablas.length; a++) {
                        if(arregloDeIndicadores[i].elementoFormula[j].esFuenteDeDato && arregloConexionesATablas[a].ID == arregloDeIndicadores[i].elementoFormula[j].conexionTablaID) {
                            if(primeraVezCodigoTabla) {
                                codigoTablas += '\n\t\tfor (var i = 0; i < i+1; i++) {';
                                codigoTablas += '\n\t\t\tfor (var j = 0; j < arregloResultadosDeTablas[i].length; j++) {';
                                primeraVezCodigoTabla = false;
                            }
                            codigoTablas += '\n'+tabsText+'if (arregloResultadosDeTablas[i][j].'+arregloDeIndicadores[i].elementoFormula[j].nombreColumnaEnTabla+' != undefined) {'
                            tabsText += '\t';
                            codigoTablas += '\n'+tabsText+'var '+arregloDeIndicadores[i].elementoFormula[j].nombreVariable+' = arregloResultadosDeTablas[i][j].'+arregloDeIndicadores[i].elementoFormula[j].nombreColumnaEnTabla+';';
                            entroElemento = true;
                        }
                    };
                    //cuando es excel o forma
                    if(!entroElemento && arregloDeIndicadores[i].elementoFormula[j].esFuenteDeDato) {
                        codigoTablas += '\n'+tabsText+'if (window["'+arregloDeIndicadores[i].elementoFormula[j].nombreColumnaEnTabla+'"] != undefined && !isNaN(window["'+arregloDeIndicadores[i].elementoFormula[j].nombreColumnaEnTabla+'"]) && x == '+i+') {'
                        tabsText += '\t';
                        codigoTablas += '\n'+tabsText+'let '+arregloDeIndicadores[i].elementoFormula[j].nombreVariable+' = window["'+arregloDeIndicadores[i].elementoFormula[j].nombreColumnaEnTabla+'"];';
                        entroElemento = true;
                    }
                    if(entroElemento && j == arregloDeIndicadores[i].elementoFormula.length-1) {
                        if(arregloDeIndicadores[i].formula.includes("ASIG") || arregloDeIndicadores[i].formula.includes("COUNT") || arregloDeIndicadores[i].formula.includes("PROM") 
                            || arregloDeIndicadores[i].formula.includes("MAX") || arregloDeIndicadores[i].formula.includes("MIN") || arregloDeIndicadores[i].formula.includes("SUM") || arregloDeIndicadores[i].formula.includes("AUTOSUM")) {
                            codigoTablas += '\n'+tabsText+'window["arregloDeIndicadores"][x].total = evaluate('+arregloDeIndicadores[i].formula.substring(arregloDeIndicadores[i].formula.indexOf("(")+1, arregloDeIndicadores[i].formula.indexOf(")"))+');';
                        } else {
                            codigoTablas += '\n'+tabsText+'window["arregloDeIndicadores"][x].total = evaluate('+arregloDeIndicadores[i].formula+');';
                        }
                    }
                };
                for (var j = 0; j < arregloDeIndicadores[i].elementoFormula.length; j++) {
                    //todos los elementoFormula por indicador van a pertenecer a la misma variable o tabla
                    if(arregloDeIndicadores[i].elementoFormula[j].esFuenteDeDato) {
                        tabsText = tabsText.substring(0, tabsText.length - 1);
                        codigoTablas += '\n'+tabsText+'}';
                    }
                };
                if(!primeraVezCodigoTabla) {
                    codigoTablas += '\n\t\t\t};';
                    codigoTablas += '\n\t\t};';
                }
            }
        };
        if(!primeraVezCodigoIndicador1 && codigoTablas.length > 0)
            codigoTablas += '\n\t};';

        ////////////////////////////////////////////////////////////////////////
        //crear codigo pertenecientes a variables
        var codigoVariables = '';
        var primeraVezCodigoIndicador2 = true;
        for (var i = 0; i < arregloDeIndicadores.length; i++) {
            if(arregloDeIndicadores[i].realizarCalculo) {
                var tabsText = '\t\t\t';
                var primeraVezCodigoTabla = true;
                for (var j = 0; j < arregloDeIndicadores[i].elementoFormula.length; j++) {
                    var entroElemento = false;
                    if(primeraVezCodigoIndicador2) {
                        codigoVariables += '\n\tfor (var x = 0; x < window["arregloDeIndicadores"].length; x++) {';
                        primeraVezCodigoIndicador2 = false;
                    }
                    for (var a = 0; a < arregloDeVariables.length; a++) {
                        if(!arregloDeIndicadores[i].elementoFormula[j].esFuenteDeDato && arregloDeVariables[a].ID == arregloDeIndicadores[i].elementoFormula[j].elementoVariableID) {
                            if(primeraVezCodigoTabla && (arregloDeVariables[a].esObjeto || arregloDeVariables[a].esInstruccionSQL) ) {
                                codigoVariables += '\n\t\tfor (var i = 0; i < window["'+arregloDeVariables[a].nombre+'"].length; i++) {';
                                primeraVezCodigoTabla = false;
                            }
                            if(!arregloDeVariables[a].esObjeto && !arregloDeVariables[a].esInstruccionSQL) {
                                codigoVariables += '\n'+tabsText+'if (window["'+arregloDeVariables[a].nombre+'"] != undefined && !isNaN(window["'+arregloDeVariables[a].nombre+'"]) && x == '+i+') {'
                                tabsText += '\t';
                                codigoVariables += '\n'+tabsText+'let '+arregloDeVariables[a].nombre+' = window["'+arregloDeVariables[a].nombre+'"];';
                            } else {
                                codigoVariables += '\n'+tabsText+'if (window["'+arregloDeVariables[a].nombre+'"][i].'+arregloDeIndicadores[i].elementoFormula[j].nombreColumnaEnTabla+' != undefined && !isNaN(window["'+arregloDeVariables[a].nombre+'"][i].'+arregloDeIndicadores[i].elementoFormula[j].nombreColumnaEnTabla+') && x == '+i+') {'
                                tabsText += '\t';
                                codigoVariables += '\n'+tabsText+'let '+arregloDeIndicadores[i].elementoFormula[j].nombreVariable+' = window["'+arregloDeVariables[a].nombre+'"][i].'+arregloDeIndicadores[i].elementoFormula[j].nombreColumnaEnTabla+';';
                            }
                            entroElemento = true;
                        }
                    };
                    //cuando es excel o forma
                    if(!entroElemento && !arregloDeIndicadores[i].elementoFormula[j].esFuenteDeDato) {
                        codigoVariables += '\n'+tabsText+'if (window["'+arregloDeIndicadores[i].elementoFormula[j].nombreColumnaEnTabla+'"] != undefined && !isNaN(window["'+arregloDeIndicadores[i].elementoFormula[j].nombreColumnaEnTabla+'"]) && x == '+i+') {'
                        tabsText += '\t';
                        codigoVariables += '\n'+tabsText+'let '+arregloDeIndicadores[i].elementoFormula[j].nombreVariable+' = window["'+arregloDeIndicadores[i].elementoFormula[j].nombreColumnaEnTabla+'"];';
                        entroElemento = true;
                    }
                    if(entroElemento && j == arregloDeIndicadores[i].elementoFormula.length-1) {
                        if(arregloDeIndicadores[i].formula.includes("ASIG") || arregloDeIndicadores[i].formula.includes("COUNT") || arregloDeIndicadores[i].formula.includes("PROM") 
                            || arregloDeIndicadores[i].formula.includes("MAX") || arregloDeIndicadores[i].formula.includes("MIN") || arregloDeIndicadores[i].formula.includes("SUM") || arregloDeIndicadores[i].formula.includes("AUTOSUM")) {
                            codigoVariables += '\n'+tabsText+'window["arregloDeIndicadores"][x].total = evaluate('+arregloDeIndicadores[i].formula.substring(arregloDeIndicadores[i].formula.indexOf("(")+1, arregloDeIndicadores[i].formula.indexOf(")"))+');';
                        } else {
                            codigoVariables += '\n'+tabsText+'window["arregloDeIndicadores"][x].total = evaluate('+arregloDeIndicadores[i].formula+');';
                        }
                        //codigoVariables += '\n'+tabsText+'window["arregloDeIndicadores"][x].total = evaluate('+arregloDeIndicadores[i].formula+');';
                    }
                };
                for (var j = 0; j < arregloDeIndicadores[i].elementoFormula.length; j++) {
                    //todos los elementoFormula por indicador van a pertenecer a la misma variable o tabla
                    if(!arregloDeIndicadores[i].elementoFormula[j].esFuenteDeDato) {
                        tabsText = tabsText.substring(0, tabsText.length - 1);
                        codigoVariables += '\n'+tabsText+'}';
                    }
                };
                if(!primeraVezCodigoTabla) {
                    codigoVariables += '\n\t\t};';
                }
            }
        };
        if(!primeraVezCodigoIndicador2 && codigoVariables.length > 0)
            codigoVariables += '\n\t};';
        window['calculoIndicadores'] = new Function(
            'return function calculoIndicadores(evaluate, calculoDeRiesgos){'+
                    codigoTablas+'\n'+codigoVariables+'\n\tcalculoDeRiesgos();\n'+
            '}'
        )();*/
        console.log('arregloDeIndicadores')
        console.log(arregloDeIndicadores)
        window['calculoIndicadores'] = new Function(
            'return function calculoIndicadores(evaluate, round, guardarVariablesCalculadas){'+
                    '\n'+codigo+'\n\tguardarVariablesCalculadas();\n'+
            '}'
        )();
        window['calculoIndicadores'](evaluate, round, this.guardarVariablesCalculadas);
    }

    guardarVariablesCalculadas () {
        alert("Calculo realizado con exito.")
        for (var a = 0; a < arregloDeIndicadores.length; a++) {
            if(arregloDeIndicadores[a].realizarCalculo && this.props.idIndicadorSeleccionado == arregloDeIndicadores[a].ID){
                this.verificarSiExisteIndicadorEnResultadosHistoricos(arregloDeIndicadores[a]);
            }
        };
    }

    verificarSiExisteIndicadorEnResultadosHistoricos (indicador) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ResultadosNombreIndicadores where nombreIndicador = '"+indicador.nombre+"' and finVigencia = '1964-05-28'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if (result.recordset.length == 0) {
                            this.crearTablaDeResultadoNombreIndicador(indicador);
                        } else {
                            this.guardarResultadosNombreIndicador(indicador, result.recordset[0].inicioVigencia);
                        }
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaDeResultadoNombreIndicador (indicador) {
        //NOMBRE TABLA: NOMBREVARIABLE_AÑOVIGENCIA_MESVIGENCIA_DIAVIGENCIA_HORAVIGENCIA_MINUTOSVIGENCIA_SEGUNDOSVIGENCIA
        //VIGENCIA: DIA CREACION
        let hoy = new Date();
        var textoCreacionTabla = 'CREATE TABLE '+indicador.nombre+'_'+hoy.getFullYear()+'_'+(hoy.getMonth()+1)+'_'+hoy.getDate()+'_'+hoy.getHours()+'_'+hoy.getMinutes()+'_'+hoy.getSeconds()+' ( ID int IDENTITY(1,1) PRIMARY KEY, ';
        //ATRIBUTOS HARDCODED
        textoCreacionTabla += 'nombre varchar(100), ';
        textoCreacionTabla += 'codigo varchar(100), ';
        textoCreacionTabla += 'formula varchar(500), ';
        textoCreacionTabla += 'peso decimal(8,4), ';
        textoCreacionTabla += 'tolerancia decimal(8,4), ';
        textoCreacionTabla += 'valorIdeal decimal(8,4), ';
        textoCreacionTabla += 'toleranciaMaxima decimal(8,4), ';
        textoCreacionTabla += 'toleranciaMinima decimal(8,4), ';
        textoCreacionTabla += 'periodicidad varchar(100), ';
        textoCreacionTabla += 'tipoIndicador varchar(20), ';
        textoCreacionTabla += 'analista varchar(100), ';
        textoCreacionTabla += 'idRiesgoPadre int, ';
        textoCreacionTabla += 'total decimal(22,4), ';
        textoCreacionTabla += 'seccionUmbral varchar(100)';
        if(indicador.atributos != undefined && indicador.atributos.length != undefined) {
            for (var i = 0; i < indicador.atributos.length; i++) {
                textoCreacionTabla += ', ';
                if(indicador.atributos[i].tipo.localeCompare("decimal") == 0) {
                    textoCreacionTabla += indicador.atributos[i].nombre+' decimal(22,4)';
                } else if(indicador.atributos[i].tipo.localeCompare("int") == 0) {
                    textoCreacionTabla += indicador.atributos[i].nombre+' int';
                } else if(indicador.atributos[i].tipo.localeCompare("varchar") == 0) {
                    textoCreacionTabla += indicador.atributos[i].nombre+' varchar(1000)';
                } else if(indicador.atributos[i].tipo.localeCompare("bit") == 0) {
                    textoCreacionTabla += indicador.atributos[i].nombre+' bit';
                } else if(indicador.atributos[i].tipo.localeCompare("date") == 0) {
                    textoCreacionTabla += indicador.atributos[i].nombre+' date';
                }
            };
        }
        textoCreacionTabla += ', f3ch4Gu4rd4do date )';
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query(textoCreacionTabla, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.crearResultadoNombreIndicador(indicador, hoy);
                    });
                }
            });
        }); // fin transaction
    }

    crearResultadoNombreIndicador (indicador, hoy) {
        let mes = hoy.getMonth()+1;
        if(mes.toString().length == 1)
            mes = '0'+mes;
        let dia = hoy.getDate();
        if(dia.toString().length == 1)
            dia = '0'+dia;
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into ResultadosNombreIndicadores (nombreIndicador, inicioVigencia, finVigencia) values ('"+indicador.nombre+"', '"+hoy.getFullYear()+'-'+mes+'-'+dia+" "+hoy.getHours()+":"+hoy.getMinutes()+":"+hoy.getSeconds()+"', '1964-05-28')", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.guardarResultadosNombreIndicador(indicador, hoy);
                    });
                }
            });
        }); // fin transaction
    }

    guardarResultadosNombreIndicador (indicador, fechaNombreTabla) {

        let hoy = new Date();
        var textoInsertPrincipio = 'INSERT INTO '+indicador.nombre+'_'+fechaNombreTabla.getFullYear()+'_'+(fechaNombreTabla.getMonth()+1)+'_'+fechaNombreTabla.getDate()+'_'+fechaNombreTabla.getHours()+'_'+fechaNombreTabla.getMinutes()+'_'+fechaNombreTabla.getSeconds()+' ( ';
        textoInsertPrincipio += 'nombre , codigo, formula, peso, tolerancia, valorIdeal, toleranciaMaxima, toleranciaMinima, periodicidad, tipoIndicador, analista, idRiesgoPadre, total, seccionUmbral';
        if(indicador.atributos != undefined) {
            for (var i = 0; i < indicador.atributos.length; i++) {
                textoInsertPrincipio += ', ';
                textoInsertPrincipio += indicador.atributos[i].nombre;
            };
        }
        textoInsertPrincipio += ', f3ch4Gu4rd4do ) values ( ';
        var instruccionSQLFinal = textoInsertPrincipio;
        instruccionSQLFinal += "'"+indicador.nombre+"'";
        instruccionSQLFinal += ", '"+indicador.codigo+"'";
        instruccionSQLFinal += ", '"+indicador.formula+"'";
        instruccionSQLFinal += ", "+indicador.peso;
        instruccionSQLFinal += ", "+indicador.tolerancia;
        instruccionSQLFinal += ", "+indicador.valorIdeal;
        instruccionSQLFinal += ", "+indicador.toleranciaMaxima;
        instruccionSQLFinal += ", "+indicador.toleranciaMinima;
        instruccionSQLFinal += ", '"+indicador.periodicidad+"'";
        instruccionSQLFinal += ", '"+indicador.tipoIndicador+"'";
        instruccionSQLFinal += ", '"+indicador.analista+"'";
        instruccionSQLFinal += ", "+indicador.idRiesgoPadre;
        instruccionSQLFinal += ", "+indicador.total;
        if(indicador.seccionUmbral != undefined)
            instruccionSQLFinal += ", '"+indicador.seccionUmbral+"'";
        else
            instruccionSQLFinal += ", ''";
        var instruccionSQLBorrar = "DELETE FROM "+indicador.nombre+"_"+fechaNombreTabla.getFullYear()+"_"+(fechaNombreTabla.getMonth()+1)+"_"+fechaNombreTabla.getDate()+"_"+fechaNombreTabla.getHours()+"_"+fechaNombreTabla.getMinutes()+"_"+fechaNombreTabla.getSeconds()+ " WHERE f3ch4Gu4rd4do = '"+hoy.getFullYear()+"-"+(hoy.getMonth()+1)+"-"+hoy.getDate()+"' ";
        this.borrarIndicador(instruccionSQLBorrar);
        if(indicador.atributos != undefined && indicador.atributos.length != undefined) {
            for (var j = 0; j < indicador.atributos.length; j++) {
                instruccionSQLFinal += ', ';
                if(indicador.atributos[j].tipo.localeCompare("decimal") == 0) {
                    instruccionSQLFinal += indicador[indicador.atributos[j].nombre];
                } else if(indicador.atributos[j].tipo.localeCompare("int") == 0) {
                    instruccionSQLFinal += indicador[indicador.atributos[j].nombre];
                } else if(indicador.atributos[j].tipo.localeCompare("varchar") == 0) {
                    instruccionSQLFinal += "'"+indicador[indicador.atributos[j].nombre]+"'";
                } else if(indicador.atributos[j].tipo.localeCompare("bit") == 0) {
                    instruccionSQLFinal += "'"+indicador[indicador.atributos[j].nombre]+"'";
                } else if(indicador.atributos[j].tipo.localeCompare("date") == 0) {
                    instruccionSQLFinal += "'"+indicador[indicador.atributos[j].nombre].getFullYear()+"-"+(indicador[indicador.atributos[j].nombre].getMonth()+1)+"-"+indicador[indicador.atributos[j].nombre].getDate()+"'";
                }
            };
        }
        instruccionSQLFinal += ", '"+hoy.getFullYear()+"-"+(hoy.getMonth()+1)+"-"+hoy.getDate()+"' )";
        var self = this;
        setTimeout(function () {
            self.guardarIndicador(instruccionSQLFinal, indicador, 'indicador', hoy);
        }, 600);

        this.saveBitacora(hoy, "Usuario: "+this.props.userName+" realizo el cálculo para el indicador: "+indicador.nombre);
    }

    guardarIndicador (instruccionSQL, variable, tabla, hoy) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query(instruccionSQL, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(variable.periodicidad.localeCompare("-1") != 0)
                            this.verificarPeriodicidadGuardar(variable, tabla, hoy);
                    });
                }
            });
        }); // fin transaction
    }

    borrarIndicador (instruccionSQL) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query(instruccionSQL, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                    });
                }
            });
        }); // fin transaction
    }

    verificarPeriodicidadGuardar (variable, tabla, hoy) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from PeriodicidadCalculo where variableID = "+variable.ID+" and tablaVariable = '"+tabla+"'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            this.updatePeriodicidad(variable, tabla, hoy);
                        } else {
                            this.guardarPeriodicidad(variable, tabla, hoy);
                        }
                    });
                }
            });
        }); // fin transaction
    }

    updatePeriodicidad (variable, tabla, hoy) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("update PeriodicidadCalculo set fechaUltimoCalculo = '"+hoy.getFullYear()+"-"+(hoy.getMonth()+1)+"-"+hoy.getDate()+"' where variableID = "+variable.ID+" and tablaVariable = '"+tabla+"'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                    });
                }
            });
        }); // fin transaction
    }

    guardarPeriodicidad (variable, tabla, hoy) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into PeriodicidadCalculo (variableID, tablaVariable, fechaInicio, fechaUltimoCalculo) values ("+variable.ID+", '"+tabla+"', '"+hoy.getFullYear()+"-"+(hoy.getMonth()+1)+"-"+hoy.getDate()+"', '"+hoy.getFullYear()+"-"+(hoy.getMonth()+1)+"-"+hoy.getDate()+"') ", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                    });
                }
            });
        }); // fin transaction
    }


























    /*              EXCEL                       */
    crearVariablesExcel () {
        for (var i = 0; i < arregloDeExcel.length; i++) {
            var workbook = null;
            workbook = XLSX.readFile(arregloDeExcel[i].ubicacionArchivo);
            if(workbook != null) {
                for (var j = 0; j < arregloDeExcel[i].variables.length; j++) {
                    for (var k = 0; k < workbook.SheetNames.length; k++) {
                        if (workbook.SheetNames[k].localeCompare(arregloDeExcel[i].variables[j].nombreHoja) == 0) {
                            break;
                        }
                    };
                    var sheet = workbook.Sheets[workbook.SheetNames[k]];
                    if(sheet != null && arregloDeExcel[i].variables[j].realizarCalculo) {
                        try {
                            var arregloPosicionesExcel = this.getArregloPosicionesExcel(arregloDeExcel[i].variables[j].celdas);
                            if(arregloPosicionesExcel.length == 1) {
                                var variable;
                                if(arregloDeExcel[i].variables[j].tipo.localeCompare('numero') == 0 && sheet[arregloPosicionesExcel[0]].t.localeCompare('n') == 0 && sheet[arregloPosicionesExcel[0]].w.indexOf('/') == -1) {
                                    variable = parseFloat(sheet[arregloPosicionesExcel[0]].v);
                                } else if(arregloDeExcel[i].variables[j].tipo.localeCompare('bit') == 0 && sheet[arregloPosicionesExcel[0]].t.localeCompare('b') == 0 && sheet[arregloPosicionesExcel[0]].w.indexOf('/') == -1) {
                                    variable = sheet[arregloPosicionesExcel[0]].v;
                                } else if(arregloDeExcel[i].variables[j].tipo.localeCompare('varchar') == 0 && sheet[arregloPosicionesExcel[0]].t.localeCompare('s') == 0 && sheet[arregloPosicionesExcel[0]].w.indexOf('/') == -1) {
                                    variable = sheet[arregloPosicionesExcel[0]].v;
                                } else if(arregloDeExcel[i].variables[j].tipo.localeCompare('date') == 0 && (sheet[arregloPosicionesExcel[0]].t.localeCompare('d') == 0 || sheet[arregloPosicionesExcel[0]].t.localeCompare('n') == 0) && sheet[arregloPosicionesExcel[0]].w.indexOf('/') != -1 ) {
                                    variable = new Date(sheet[arregloPosicionesExcel[0]].w);
                                }
                                window[arregloDeExcel[i].variables[j].nombre] = variable;
                            } else if(arregloPosicionesExcel.length > 1 && arregloDeExcel[i].variables[j].operacion.localeCompare("ASIG") == 0) {
                                if(arregloDeExcel[i].variables[j].tipo.localeCompare('numero') == 0) {
                                    window[arregloDeExcel[i].variables[j].nombre] = [];
                                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                        var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                                        window[arregloDeExcel[i].variables[j].nombre].push(variable);
                                    };
                                } else if(arregloDeExcel[i].variables[j].tipo.localeCompare('bit') == 0) {
                                    window[arregloDeExcel[i].variables[j].nombre] = [];
                                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                        var variable = sheet[arregloPosicionesExcel[k]].v;
                                        window[arregloDeExcel[i].variables[j].nombre].push(variable);
                                    };
                                } else if(arregloDeExcel[i].variables[j].tipo.localeCompare('varchar') == 0) {
                                    window[arregloDeExcel[i].variables[j].nombre] = [];
                                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                        var variable = sheet[arregloPosicionesExcel[k]].v;
                                        window[arregloDeExcel[i].variables[j].nombre].push(variable);
                                    };
                                } else if(arregloDeExcel[i].variables[j].tipo.localeCompare('date') == 0) {
                                    window[arregloDeExcel[i].variables[j].nombre] = [];
                                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                        var variable = new Date(sheet[arregloPosicionesExcel[k]].w);
                                        window[arregloDeExcel[i].variables[j].nombre].push(variable);
                                    };
                                }
                            } else if(arregloPosicionesExcel.length > 1) {
                                if(arregloDeExcel[i].variables[j].tipo.localeCompare("numero") == 0 && arregloDeExcel[i].variables[j].operacion.localeCompare("SUM") == 0) {
                                    var suma = 0;
                                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                        var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                                        suma+=variable;
                                    };
                                    window[arregloDeExcel[i].variables[j].nombre] = suma;
                                } else if(arregloDeExcel[i].variables[j].tipo.localeCompare("numero") == 0 && arregloDeExcel[i].variables[j].operacion.localeCompare("PROM") == 0) {
                                    var suma = 0;
                                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                        var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                                        suma+=variable;
                                    };
                                    var promedio = suma / arregloPosicionesExcel.length;
                                    window[arregloDeExcel[i].variables[j].nombre] = promedio;
                                } else if(arregloDeExcel[i].variables[j].operacion.localeCompare("MAX") == 0) {
                                    if(arregloDeExcel[i].variables[j].tipo.localeCompare("numero") == 0) {
                                        var max = 0;
                                        for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                            var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                                            if(k == 0)
                                                max = variable;
                                            if (max < variable) {
                                                max = variable;
                                            }
                                        };
                                        window[arregloDeExcel[i].variables[j].nombre] = max;
                                    }
                                    if(arregloDeExcel[i].variables[j].tipo.localeCompare("date") == 0) {
                                        var max = new Date(1900, 1, 1);
                                        for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                            var variable = new Date(sheet[arregloPosicionesExcel[k]].w);
                                            if(k == 0)
                                                max = variable;
                                            if (max.getTime() < variable.getTime()) {
                                                max = variable;
                                            }
                                        };
                                        window[arregloDeExcel[i].variables[j].nombre] = max;
                                    }
                                } else if(arregloDeExcel[i].variables[j].operacion.localeCompare("MIN") == 0) {
                                    if(arregloDeExcel[i].variables[j].tipo.localeCompare("numero") == 0) {
                                        var min = 0;
                                        for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                            var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                                            if(k == 0)
                                                min = variable;
                                            if (min > variable) {
                                                min = variable;
                                            }
                                        };
                                        window[arregloDeExcel[i].variables[j].nombre] = min;
                                    }
                                    if(arregloDeExcel[i].variables[j].tipo.localeCompare("date") == 0) {
                                        var min = new Date(1900, 1, 1);
                                        for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                            var variable = new Date(sheet[arregloPosicionesExcel[k]].w);
                                            if(k == 0)
                                                min = variable;
                                            if (min.getTime() > variable.getTime()) {
                                                min = variable;
                                            }
                                        };
                                        window[arregloDeExcel[i].variables[j].nombre] = min;
                                    }
                                } else if(arregloDeExcel[i].variables[j].operacion.localeCompare("COUNT") == 0) {
                                    if(arregloDeExcel[i].variables[j].tipo.localeCompare("numero") == 0) {
                                        var count = 0;
                                        for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                            var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                                            if(!isNaN(variable))
                                                count++;
                                        };
                                        window[arregloDeExcel[i].variables[j].nombre] = count;
                                    }
                                    if(arregloDeExcel[i].variables[j].tipo.localeCompare("date") == 0) {
                                        var count = 0;
                                        for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                            //var variable = new Date(sheet[arregloPosicionesExcel[k]].v);
                                            var variable;
                                            //
                                            if( sheet[arregloPosicionesExcel[k]].t.localeCompare('d') == 0 ) {
                                                variable = new Date(sheet[arregloPosicionesExcel[k]].w);
                                            }
                                            if(this.isValidDate(variable))
                                                count++;
                                        };
                                        window[arregloDeExcel[i].variables[j].nombre] = count;
                                    }
                                    if(arregloDeExcel[i].variables[j].tipo.localeCompare("varchar") == 0) {
                                        var count = 0;
                                        for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                            var variable = sheet[arregloPosicionesExcel[k]].v;
                                            if(variable.length > 0)
                                                count++;
                                        };
                                        window[arregloDeExcel[i].variables[j].nombre] = count;
                                    }
                                    if(arregloDeExcel[i].variables[j].tipo.localeCompare("bit") == 0) {
                                        var count = 0;
                                        for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                            var variable = sheet[arregloPosicionesExcel[k]].v;
                                            if(variable != undefined)
                                                count++;
                                        };
                                        window[arregloDeExcel[i].variables[j].nombre] = count;
                                    }
                                }
                            }
                        } catch(err) {
                            console.log(err.message);
                            arregloDeErroresExcel.push({nombre: arregloDeExcel[i].variables[j].nombre, ID: arregloDeExcel[i].variables[j].ID });
                        }
                    } else {
                        if(arregloDeExcel[i].variables[j].realizarCalculo) {
                            arregloDeErroresExcel.push({nombre: arregloDeExcel[i].variables[j].nombre, ID: arregloDeExcel[i].variables[j].ID });
                            alert("problema para leer la hoja: "+arregloDeExcel[i].variables[j].nombreHoja);
                        }
                    }
                };
            } else {
                alert("problema para leer archivo: "+arregloDeExcel[i].ubicacionArchivo);
            }
        };
    }

    getArregloPosicionesExcel (celdas) {
        var celdaInicial = this.getObjetoLetraNumeroCelda(celdas.split(":")[0]);
        var celdaFinal;
        if (celdas.indexOf(":") >= 0)
            celdaFinal = this.getObjetoLetraNumeroCelda(celdas.split(":")[1]);
        var arregloPosicionesExcel = [];
        if(celdaFinal != undefined) {
            if(celdaInicial.columna.toLowerCase().localeCompare(celdaFinal.columna.toLowerCase()) == 0) {
                //misma columnas, se recorre para abajo en el archivo
                var filaInicial = parseInt(celdaInicial.fila);
                var filaFinal = parseInt(celdaFinal.fila);
                for (var i = filaInicial; i <= filaFinal; i++) {
                    arregloPosicionesExcel.push(celdaInicial.columna.toUpperCase()+i);
                };
            } else {
                //misma fila, se recorre horizontal en el archivo
                var numeroColumnaInicial = this.toColumnNumber(celdaInicial.columna.toUpperCase());
                var numeroColumnaFinal = this.toColumnNumber(celdaFinal.columna.toUpperCase());
                for (var i = numeroColumnaInicial; i <= numeroColumnaFinal; i++) {
                    arregloPosicionesExcel.push(toColumnLetter(i)+celdaInicial.fila);
                };
            }
        } else {
            //solo se selecciono una celda
            arregloPosicionesExcel.push(celdaInicial.columna+celdaInicial.fila);
        }
        return arregloPosicionesExcel;
    }

    getObjetoLetraNumeroCelda (celda) {
        var columna = '';
        var fila = '';
        for (var i = 0; i < celda.length; i++) {
            if ( this.esLetra(celda.charAt(i)) ) {
                columna += celda.charAt(i);
            } else {
                break;
            }
        };
        fila = celda.substring(i);
        var celdaObjeto = {columna: columna, fila: fila};
        return celdaObjeto;
    }

    esLetra (caracter) {
        if(caracter.toLowerCase().localeCompare("a") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("b") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("c") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("d") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("e") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("f") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("g") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("h") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("i") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("j") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("k") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("l") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("m") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("n") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("o") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("p") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("q") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("r") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("s") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("t") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("u") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("v") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("w") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("x") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("y") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("z") == 0) {
            return true;
        }
    }

    toColumnLetter (num) {
        for (var ret = '', a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
            ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
        }
        return ret;
    }

    toColumnNumber (val) {
        var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, j, result = 0;
        for (i = 0, j = val.length - 1; i < val.length; i += 1, j -= 1) {
            result += Math.pow(base.length, j) * (base.indexOf(val[i]) + 1);
        }
        return result;
    }
















    /*              FORMAS                       */
    formaCrearVariable (id, nombreVariable, tipoVariable, nombreSiguiente, indexSiguiente, tipoSiguiente, inputSiguiente) {
        //variableForma
        if(tipoVariable.localeCompare("numero") == 0) {
            try {
                var variable = parseFloat($("#variableForma"+id).val());
                window[nombreVariable] = variable;
            }  catch(err) {
                console.log(err.message);
                arregloDeErroresFormas.push({nombre: nombreVariable, ID: id});
            }
        } else if(tipoVariable.localeCompare("bit") == 0) {
            try {
                if ($("#variableForma"+id).is(':checked')) {
                    window[nombreVariable] = true;
                } else {
                    window[nombreVariable] = false;
                }
            }  catch(err) {
                console.log(err.message);
                arregloDeErroresFormas.push({nombre: nombreVariable, ID: id});
            }
        } else if(tipoVariable.localeCompare("varchar") == 0) {
            try {
                var variable = $("#variableForma"+id).val();
                window[nombreVariable] = variable;
            }  catch(err) {
                console.log(err.message);
                arregloDeErroresFormas.push({nombre: nombreVariable, ID: id});
            }
        } else if(tipoVariable.localeCompare("date") == 0) {
            try {
                var variable = $("#variableForma"+id).datepicker('getDate');
                window[nombreVariable] = variable;
            }  catch(err) {
                console.log(err.message);
                arregloDeErroresFormas.push({nombre: nombreVariable, ID: id});
            }
        }
        if(nombreSiguiente != undefined) {
            this.updateForm(nombreSiguiente, indexSiguiente, tipoSiguiente, inputSiguiente);
        } else {
            this.closeModalForma();
            this.iniciarHilo();
        }
    }

    iniciarMostrarFormas () {
        arregloHTMLFormas = [];
        for (var i = 0; i < arregloDeFormas.length; i++) {
            if(arregloDeFormas[i].tipo.localeCompare("numero") == 0) {
                if(i+1 < arregloDeFormas.length) {
                    let nombre = arregloDeFormas[i].nombre;
                    let id = arregloDeFormas[i].ID;
                    let tipo = arregloDeFormas[i].tipo;
                    let indexSiguiente = i+1;
                    let nombreSiguiente = arregloDeFormas[i+1].nombre;
                    let idSiguiente = arregloDeFormas[i+1].ID;
                    let tipoSiguiente = arregloDeFormas[i+1].tipo;
                    arregloHTMLFormas[i] =  <div style={{width: "100%"}}>
                                                <br/>
                                                <div className={"row"} style={{width: "100%"}}>
                                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                        <label htmlFor={"variableForma"+arregloDeFormas[i].ID} className="col-form-label">Valor:</label>
                                                    </div>
                                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                        <input id={"variableForma"+arregloDeFormas[i].ID} type="text" className="form-control form-control-sm"/>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className={"text-center"} style={{width: "100%"}}>
                                                    <a href="#" className="btn btn-brand active" onClick={() => this.formaCrearVariable(id, nombre, tipo, nombreSiguiente, indexSiguiente, tipoSiguiente, "variableForma"+idSiguiente)}>Guardar</a>
                                                </div>
                                                <br/>
                                            </div>;
                } else {
                    let nombre = arregloDeFormas[i].nombre;
                    let id = arregloDeFormas[i].ID;
                    let tipo = arregloDeFormas[i].tipo;
                    arregloHTMLFormas[i] =  <div style={{width: "100%"}}>
                                                <br/>
                                                <div className={"row"} style={{width: "100%"}}>
                                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                        <label htmlFor={"variableForma"+arregloDeFormas[i].ID} className="col-form-label">Valor:</label>
                                                    </div>
                                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                        <input id={"variableForma"+arregloDeFormas[i].ID} type="text" className="form-control form-control-sm"/>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className={"text-center"} style={{width: "100%"}}>
                                                    <a href="#" className="btn btn-brand active" onClick={() => this.formaCrearVariable(id, nombre, tipo)}>Guardar</a>
                                                </div>
                                                <br/>
                                            </div>;
                }
            } else if(arregloDeFormas[i].tipo.localeCompare("bit") == 0) {
                if(i+1 < arregloDeFormas.length) {
                    let nombre = arregloDeFormas[i].nombre;
                    let id = arregloDeFormas[i].ID;
                    let tipo = arregloDeFormas[i].tipo;
                    let indexSiguiente = i+1;
                    let nombreSiguiente = arregloDeFormas[i+1].nombre;
                    let idSiguiente = arregloDeFormas[i+1].ID;
                    let tipoSiguiente = arregloDeFormas[i+1].tipo;
                    arregloHTMLFormas[i] =  <div style={{width: "100%"}}>
                                                <br/>
                                                <div className={"row"} style={{width: "100%"}}>
                                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                        <label htmlFor={"variableForma"+arregloDeFormas[i].ID} className="col-form-label">Valor:</label>
                                                    </div>
                                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                        <br/>
                                                        <div className={"switch-button switch-button-bool"} style={{margin:"0 auto", display:"block"}}>
                                                            <input type="checkbox" defaultChecked name={"guardarFuenteDato"} id={"variableForma"+arregloDeFormas[i].ID}/><span>
                                                            <label htmlFor={"guardarFuenteDato"}></label></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className={"text-center"} style={{width: "100%"}}>
                                                    <a href="#" className="btn btn-brand active" onClick={() => this.formaCrearVariable(id, nombre, tipo, nombreSiguiente, indexSiguiente, tipoSiguiente, "variableForma"+idSiguiente)}>Guardar</a>
                                                </div>
                                                <br/>
                                            </div>;
                } else {
                    let nombre = arregloDeFormas[i].nombre;
                    let id = arregloDeFormas[i].ID;
                    let tipo = arregloDeFormas[i].tipo;
                    arregloHTMLFormas[i] =  <div style={{width: "100%"}}>
                                                <br/>
                                                <div className={"row"} style={{width: "100%"}}>
                                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                        <label htmlFor={"variableForma"+arregloDeFormas[i].ID} className="col-form-label">Valor:</label>
                                                    </div>
                                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                        <br/>
                                                        <div className={"switch-button switch-button-bool"} style={{margin:"0 auto", display:"block"}}>
                                                            <input type="checkbox" defaultChecked name={"guardarFuenteDato"} id={"variableForma"+arregloDeFormas[i].ID}/><span>
                                                            <label htmlFor={"guardarFuenteDato"}></label></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className={"text-center"} style={{width: "100%"}}>
                                                    <a href="#" className="btn btn-brand active" onClick={() => this.formaCrearVariable(id, nombre, tipo)}>Guardar</a>
                                                </div>
                                                <br/>
                                            </div>;
                }
            } else if(arregloDeFormas[i].tipo.localeCompare("varchar") == 0) {
                if(i+1 < arregloDeFormas.length) {
                    let nombre = arregloDeFormas[i].nombre;
                    let id = arregloDeFormas[i].ID;
                    let tipo = arregloDeFormas[i].tipo;
                    let indexSiguiente = i+1;
                    let nombreSiguiente = arregloDeFormas[i+1].nombre;
                    let idSiguiente = arregloDeFormas[i+1].ID;
                    let tipoSiguiente = arregloDeFormas[i+1].tipo;
                    arregloHTMLFormas[i] =  <div style={{width: "100%"}}>
                                                <br/>
                                                <div className={"row"} style={{width: "100%"}}>
                                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                        <label htmlFor={"variableForma"+arregloDeFormas[i].ID} className="col-form-label">Valor:</label>
                                                    </div>
                                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                        <input id={"variableForma"+arregloDeFormas[i].ID} type="text" className="form-control form-control-sm"/>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className={"text-center"} style={{width: "100%"}}>
                                                    <a href="#" className="btn btn-brand active" onClick={() => this.formaCrearVariable(id, nombre, tipo, nombreSiguiente, indexSiguiente, tipoSiguiente, "variableForma"+idSiguiente)}>Guardar</a>
                                                </div>
                                                <br/>
                                            </div>;
                } else {
                    let nombre = arregloDeFormas[i].nombre;
                    let id = arregloDeFormas[i].ID;
                    let tipo = arregloDeFormas[i].tipo;
                    arregloHTMLFormas[i] =  <div style={{width: "100%"}}>
                                                <br/>
                                                <div className={"row"} style={{width: "100%"}}>
                                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                        <label htmlFor={"variableForma"+arregloDeFormas[i].ID} className="col-form-label">Valor:</label>
                                                    </div>
                                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                        <input id={"variableForma"+arregloDeFormas[i].ID} type="text" className="form-control form-control-sm"/>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className={"text-center"} style={{width: "100%"}}>
                                                    <a href="#" className="btn btn-brand active" onClick={() => this.formaCrearVariable(id, nombre, tipo)}>Guardar</a>
                                                </div>
                                                <br/>
                                            </div>;
                }
            } else if(arregloDeFormas[i].tipo.localeCompare("date") == 0) {
                if(i+1 < arregloDeFormas.length) {
                    let nombre = arregloDeFormas[i].nombre;
                    let id = arregloDeFormas[i].ID;
                    let tipo = arregloDeFormas[i].tipo;
                    let indexSiguiente = i+1;
                    let nombreSiguiente = arregloDeFormas[i+1].nombre;
                    let idSiguiente = arregloDeFormas[i+1].ID;
                    let tipoSiguiente = arregloDeFormas[i+1].tipo;
                    arregloHTMLFormas[i] =  <div style={{width: "100%"}}>
                                                <br/>
                                                <div className={"row"} style={{width: "100%"}}>
                                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                        <label htmlFor={"variableForma"+arregloDeFormas[i].ID} className="col-form-label">Valor:</label>
                                                    </div>
                                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                        <div className="row" style={{display: "flex", justifyContent: "center"}}>
                                                            <div id={"variableForma"+arregloDeFormas[i].ID} className="center-block"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className={"text-center"} style={{width: "100%"}}>
                                                    <a href="#" className="btn btn-brand active" onClick={() => this.formaCrearVariable(id, nombre, tipo, nombreSiguiente, indexSiguiente, tipoSiguiente, "variableForma"+idSiguiente)}>Guardar</a>
                                                </div>
                                                <br/>
                                            </div>;
                } else {
                    let nombre = arregloDeFormas[i].nombre;
                    let id = arregloDeFormas[i].ID;
                    let tipo = arregloDeFormas[i].tipo;
                    arregloHTMLFormas[i] =  <div style={{width: "100%"}}>
                                                <br/>
                                                <div className={"row"} style={{width: "100%"}}>
                                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                        <label htmlFor={"variableForma"+arregloDeFormas[i].ID} className="col-form-label">Valor:</label>
                                                    </div>
                                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                        <div className="row" style={{display: "flex", justifyContent: "center"}}>
                                                            <div id={"variableForma"+arregloDeFormas[i].ID} className="center-block"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className={"text-center"} style={{width: "100%"}}>
                                                    <a href="#" className="btn btn-brand active" onClick={() => this.formaCrearVariable(id, nombre, tipo)}>Guardar</a>
                                                </div>
                                                <br/>
                                            </div>;
                }
            }
        };
        this.updateForm(arregloDeFormas[0].nombre, 0, arregloDeFormas[0].tipo, "variableForma"+arregloDeFormas[0].ID);
    }

    updateForm (titulo, index, tipo, idInput) {
        this.setState({
            showModalForma: true,
            tituloVariableForma: "Variable: "+titulo,
            htmlForma: arregloHTMLFormas[index]
        }, this.loadFechas(tipo, idInput));
    }

    loadFechas (tipo, idInput) {
        if(tipo.localeCompare("date") == 0) {
            setTimeout(function(){
                $('#'+idInput).datepicker({
                    format: "dd-mm-yyyy",
                    todayHighlight: true,
                    viewMode: "days", 
                    minViewMode: "days",
                    language: 'es'
                });
            }, 250);
        }
    }

    closeModalForma () {
        this.setState({
            showModalForma: false
        });
    }

    verificarExistenciaErroresExcel(variable) {
        for (var i = 0; i < arregloDeErroresExcel.length; i++) {
            if (arregloDeErroresExcel[i].nombre.localeCompare(variable.nombre) == 0 && arregloDeErroresExcel[i].ID == variable.ID) {
                return true;
            }
        };
        return false;
    }

    verificarExistenciaErroresForma(variable) {
        for (var i = 0; i < arregloDeErroresFormas.length; i++) {
            if (arregloDeErroresFormas[i].nombre.localeCompare(variable.nombre) == 0 && arregloDeErroresFormas[i].ID == variable.ID) {
                return true;
            }
        };
        return false;
    }

    verificarExistenciaErroresVariable(variable) {
        for (var i = 0; i < arregloDeErroresVariables.length; i++) {
            if (arregloDeErroresVariables[i].nombre.localeCompare(variable.nombre) == 0 && arregloDeErroresVariables[i].ID == variable.ID) {
                return true;
            }
        };
        return false;
    }

    /*
        **************************************
        **************************************
                FIN CALCULO CODIGO
        **************************************
        **************************************
    */


    eliminarIndicador () {
        const transaction1 = new sql.Transaction( this.props.pool );
        transaction1.begin(err => {
            var rolledBack = false;
            transaction1.on('rollback', aborted => {
                rolledBack = true;
            });
            const request2 = new sql.Request(transaction1);
            request2.query("DELETE FROM Indicadores WHERE ID = "+this.props.idIndicadorSeleccionado, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction1.rollback(err => {
                        });
                    }
                } else {
                    transaction1.commit(err => {
                        alert("Indicador eliminado.");
                        this.props.retornoSeleccionIndicador();
                        this.props.getIndicators();
                    });
                }
            });
        }); // fin transaction1
        const transaction2 = new sql.Transaction( this.props.pool );
        transaction2.begin(err => {
            var rolledBack = false;
            transaction2.on('rollback', aborted => {
                rolledBack = true;
            });
            const request2 = new sql.Request(transaction2);
            request2.query("DELETE FROM IndicadoresCampos WHERE indicadorID = "+this.props.idIndicadorSeleccionado, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction2.rollback(err => {
                        });
                    }
                } else {
                    transaction2.commit(err => {
                    });
                }
            });
        }); // fin transaction2
        const transaction3 = new sql.Transaction( this.props.pool );
        transaction3.begin(err => {
            var rolledBack = false;
            transaction3.on('rollback', aborted => {
                rolledBack = true;
            });
            const request3 = new sql.Request(transaction3);
            request3.query("DELETE FROM FormulasIndicadoresCampos WHERE indicadorID = "+this.props.idIndicadorSeleccionado, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction3.rollback(err => {
                        });
                    }
                } else {
                    transaction3.commit(err => {
                    });
                }
            });
        }); // fin transaction3
        const transaction4 = new sql.Transaction( this.props.pool );
        transaction4.begin(err => {
            var rolledBack = false;
            transaction4.on('rollback', aborted => {
                rolledBack = true;
            });
            const request4 = new sql.Request(transaction4);
            request4.query("DELETE FROM ElementoFormulasIndicadoresCampos WHERE indicadorID = "+this.props.idIndicadorSeleccionado, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction4.rollback(err => {
                        });
                    }
                } else {
                    transaction4.commit(err => {
                    });
                }
            });
        }); // fin transaction4
        const transaction5 = new sql.Transaction( this.props.pool );
        transaction5.begin(err => {
            var rolledBack = false;
            transaction5.on('rollback', aborted => {
                rolledBack = true;
            });
            const request5 = new sql.Request(transaction5);
            request5.query("DELETE FROM SegmentoReglasIndicadores WHERE indicadorID = "+this.props.idIndicadorSeleccionado, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction5.rollback(err => {
                        });
                    }
                } else {
                    transaction5.commit(err => {
                    });
                }
            });
        }); // fin transaction5
        const transaction6 = new sql.Transaction( this.props.pool );
        transaction6.begin(err => {
            var rolledBack = false;
            transaction6.on('rollback', aborted => {
                rolledBack = true;
            });
            const request6 = new sql.Request(transaction6);
            request6.query("DELETE FROM ReglasIndicadores WHERE indicadorID = "+this.props.idIndicadorSeleccionado, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction6.rollback(err => {
                        });
                    }
                } else {
                    transaction6.commit(err => {
                    });
                }
            });
        }); // fin transaction6
        const transaction7 = new sql.Transaction( this.props.pool );
        transaction7.begin(err => {
            var rolledBack = false;
            transaction7.on('rollback', aborted => {
                rolledBack = true;
            });
            const request7 = new sql.Request(transaction7);
            request7.query("DELETE FROM ElementoIndicador WHERE indicadorID = "+this.props.idIndicadorSeleccionado, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction7.rollback(err => {
                        });
                    }
                } else {
                    transaction7.commit(err => {
                    });
                }
            });
        }); // fin transaction7
    }

    goToTimeline (esExcel) {
        var navbar = <div className={"row"}>
            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                <div className={"page-header"}>
                    <h2 className={"pageheader-title"}>Linea de Tiempo</h2>
                    <div className={"page-breadcrumb"}>
                        <nav aria-label="breadcrumb">
                            <ol className={"breadcrumb"}>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoEditarIndicador}><a href="#" className={"breadcrumb-link"}>Seleccionar Indicador</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.retornoEditarIndicador}><a href="#" className={"breadcrumb-link"}>Modificar Indicador</a></li>
                                <li className={"breadcrumb-item active font-16"} aria-current="page">Linea de Tiempo</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>;

        if(esExcel && idVariableExcel != undefined) {
            this.setState({
                navbar: navbar,
                componenteActual: "timelineVariable",
            });
        } else {
            this.setState({
                navbar: navbar,
                componenteActual: "timelineVariable",
            });
        }
    }

    render() {
        if(this.state.componenteActual.localeCompare("editarIndicador") == 0) {
            return (
                <div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"page-header"}>
                                <h2 className={"pageheader-title"}>Editar Indicador</h2>
                                <div className={"page-breadcrumb"}>
                                    <nav aria-label="breadcrumb">
                                        <ol className={"breadcrumb"}>
                                            <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                            <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionIndicador}><a href="#" className={"breadcrumb-link"}>Seleccionar Indicador</a></li>
                                            <li className={"breadcrumb-item active font-16"} aria-current="page">Modificar Indicador</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"card influencer-profile-data"}>
                                <div className={"card-body"}>
                                    <div className={"border-top border-bottom addPaddingToConfig"} style={{width: "100%"}}>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="nombreIndicador" className="col-form-label">Nombre Indicador</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <input id="nombreIndicador" defaultValue={nombreIndicador} onKeyUp={this.updateNombreIndicador} type="text" className="form-control form-control-sm"/>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="idFormula" className="col-form-label">Identificador en Fórmula</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <input id="idFormula" type="text" defaultValue={idFormula} onKeyUp={this.updateIdFormula} className="form-control form-control-sm"/>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="codigo" className="col-form-label">Codigo</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <input id="codigo" defaultValue={codigoIndicador} onKeyUp={this.updateCodigoIndicador} type="text" className="form-control form-control-sm"/>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="peso" className="col-form-label">Peso</label>
                                            </div>
                                            <div className={"col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 form-group"}>
                                                <Slider
                                                    axis="x"
                                                    xstep={1}
                                                    xmin={0}
                                                    xmax={this.props.pesoDisponibleRiesgo}
                                                    x={this.state.x}
                                                    onChange={({ x }) => this.setState({ x: x }) }
                                                    style={{width: "100%", marginTop: "10px"}}/>
                                            </div>
                                            <div className={"col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 form-group"}>
                                                <label id="pesoLabel" className="col-form-label">{this.state.x}</label>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="valorIdeal" className="col-form-label">Valor Ideal</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                {
                                                    this.state.mostrarToleranciaPorcentaje
                                                    ? <input id="valorIdeal" name="tolerancia" step="1" min="0" type="number" defaultValue={valorIdealIndicador} onChange={this.updateValorIdealIndicador} style={{textAlign: "left", background: "url(../assets/percentage.png) no-repeat left", backgroundSize: "10px", backgroundPosition: "right center", width: "100%"}}/>
                                                    : <input id="valorIdeal" name="tolerancia" step="1" min="0" type="number" defaultValue={valorIdealIndicador} onChange={this.updateValorIdealIndicador} style={{textAlign: "left", width: "100%"}}/>
                                                }
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="tipoValorIdeal" className="col-form-label">Tipo de Valor Ideal</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <select id="tipoValorIdeal" defaultValue={tipoValorIdealIndicador} onChange={this.updateTipoValorIdealIndicador} className="form-control">
                                                    <option value="numerico">Numérico</option>
                                                    <option value="porcentual">Porcentual</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="tolerancia" className="col-form-label">Tolerancia</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                {
                                                    this.state.mostrarToleranciaPorcentaje
                                                    ? <input id="tolerancia" name="tolerancia" step="1" min="0" type="number" defaultValue={toleranciaIndicador} onChange={this.updateToleranciaIndicador} style={{textAlign: "left", background: "url(../assets/percentage.png) no-repeat left", backgroundSize: "10px", backgroundPosition: "right center", width: "100%"}}/>
                                                    : <input id="tolerancia" name="tolerancia" step="1" min="0" type="number" defaultValue={toleranciaIndicador} onChange={this.updateToleranciaIndicador} style={{textAlign: "left", width: "100%"}}/>
                                                }
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="periodicidad" className="col-form-label">Periodicidad</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <select id="periodicidad" defaultValue={periodicidadIndicador} onChange={this.updatePeriodicidadIndicador} className="form-control">
                                                    <option value="-1">Ninguno</option>
                                                    {periodicidad.map((periodicidad, i) =>
                                                        <option value={periodicidad.nombre} key={periodicidad.nombre}>{periodicidad.nombre}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        {this.state.periodicidadIndicador.localeCompare("-1") != 0
                                            ?
                                                <div className={"row"} style={{width: "100%"}}>
                                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                        <label htmlFor="fecha" className="col-form-label">Fecha de Inicio de Cálculo:</label>
                                                    </div>
                                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                        <input type="text" className="form-control" id="fecha"/>
                                                    </div>
                                                </div>
                                            : null
                                        }
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="tipoIndicador" className="col-form-label">Tipo Indicador</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                {
                                                    this.props.formulaRiesgo.localeCompare('ambos') == 0
                                                    ?   <select id="tipoIndicador" defaultValue={tipoIndicador} onChange={this.updateTipoIndicador} className="form-control">
                                                            <option value="riesgoInherente">Riesgo Inherente</option>
                                                            <option value="calidadGestion">Calidad de Gestión</option>
                                                        </select>
                                                    : null
                                                }
                                                {
                                                    this.props.formulaRiesgo.localeCompare('calidadGestión') == 0
                                                    ?   <select id="tipoIndicador" defaultValue={tipoIndicador} onChange={this.updateTipoIndicador} className="form-control">
                                                            <option value="calidadGestion">Calidad de Gestión</option>
                                                        </select>
                                                    : null
                                                }
                                                {
                                                    this.props.formulaRiesgo.localeCompare('riesgoInherente') == 0
                                                    ?   <select id="tipoIndicador" defaultValue={tipoIndicador} onChange={this.updateTipoIndicador} className="form-control">
                                                            <option value="riesgoInherente">Riesgo Inherente</option>
                                                        </select>
                                                    : null
                                                }
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="responsable" className="col-form-label">Nombre Encargado</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <select id="responsable" defaultValue={nombreEncargadoIndicador} onChange={this.updateNombreEncargadoIndicador} className="form-control">
                                                    <option value="-1">Ninguno</option>
                                                    {this.state.usuarios.map((usuario, i) =>
                                                        <option value={usuario.ID} key={usuario.ID}>{usuario.usuario}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                                <a className={"btn btn-secondary btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.goToCreateFormula}>Editar Fórmula</a>
                                            </div>
                                        </div>
                                        <br/>
                                        <hr/>
                                        <div className={"row"}>
                                            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                                <div style={{width: "100%"}}>
                                                    <div className={"row"} style={{width: "100%"}}>
                                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                                                            <label htmlFor="nombreAtributoNuevoCampo" className="col-form-label">Nombre de Atributo:</label>
                                                        </div>
                                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                            <input id="nombreAtributoNuevoCampo" defaultValue={nombreCampoNuevoAtributo} onKeyUp={this.actualizarNombreCampoNuevoAtributo} type="text" className="form-control form-control-sm"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className={"row"} style={{width: "100%"}}>
                                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                        <label htmlFor="tipoFuenteDato" className="col-form-label">Tipo de Variable</label>
                                                    </div>
                                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                        <a className={"breadcrumb-item active font-20"} aria-current="page">{this.state.tipoNuevaVariable}</a>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className={"row"} style={{width: "100%"}}>
                                                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                                        <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={() => this.goToCreateConditions(-1)}>Crear Instrucción Personalizada </a>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                    <a className={"btn btn-primary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.crearAtributoVariable}>Crear Atributo</a>
                                                </div>
                                                <br/>

                                                {this.state.atributos.map((atributo, i) => (
                                                    <div style={{width: "100%"}} key={i}>
                                                        <hr/>
                                                        <div style={{width: "100%"}}>
                                                            <div className={"row"} style={{width: "100%"}}>
                                                                <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                                                                    <label htmlFor="nombreAtributo" className="col-form-label">Nombre de Atributo:</label>
                                                                </div>
                                                                <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                    <input id="nombreAtributo" type="text" defaultValue={atributo.nombre} className="form-control form-control-sm"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <br/>
                                                        <div className={"row"} style={{width: "100%"}}>
                                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                                <label htmlFor="tipoFuenteDato" className="col-form-label">Tipo de Variable</label>
                                                            </div>
                                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                <a className={"breadcrumb-item active font-20"} aria-current="page">{atributo.tipo}</a>
                                                            </div>
                                                        </div>
                                                        <br/>
                                                        <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={() => this.goToCreateConditions(i)}>Editar Instrucción Personalizada </a>
                                                        <br/>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <br/>
                                        <hr/>
                                        <a className={"btn btn-warning btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa", display: this.props.permision.indicadores.indexOf("E") > -1 ? "" : "none"}} onClick={this.goCrearUmbral}>Umbrales</a>
                                        <br/>
                                        <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <a className={"btn btn-brand btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa", display: this.props.permision.indicadores.indexOf("E") > -1 ? "" : "none"}} onClick={this.editarIndicador}>Modificar Indicador</a>
                                            <a className={"btn btn-secondary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa", marginLeft: "10px", display: this.props.permision.indicadores.indexOf("E") > -1 ? "" : "none"}} onClick={this.eliminarIndicador}>Eliminar Indicador</a>
                                        </div>
                                        <br/>
                                        <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <a className={"btn btn-primary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa", marginLeft: "10px", display: this.props.permision.indicadores.indexOf("C") > -1 ? "" : "none"}} onClick={this.traerArchivosExcel}>Realizar Cálculo</a>
                                            <a className={"btn btn-info btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa", marginLeft: "10px", display: this.props.permision.indicadores.indexOf("V") > -1 ? "" : "none"}} onClick={() => this.goToTimeline(false)}>Historial de Variable</a>
                                        </div>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("crearFormula") == 0) {
            return (
                <div style={{width: "100%", height: "100%"}}>
                    <Formula pool={this.props.pool}
                                            esEditarVar={this.state.esEditarVar}
                                            esOperacionSQL={this.state.esOperacionSQL}
                                            operacionSQL={this.state.operacionSQL}
                                            formulaSeleccionadaEdit={this.state.formulaSeleccionadaEdit}
                                            anadirFormula={this.revisarTipoAnadirFormula}
                                            modificarFormula={this.verificarModificarFormula}
                                            retornoCampo={this.retornoCampoFormula}
                                            retornoOperacion={this.retornoOperacion}
                                            actualizarNivelNuevaRegla={this.actualizarNivelNuevaRegla}
                                            navbar={this.state.navbar}>
                    </Formula>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("variableCondiciones") == 0) {
            return (
                <div style={{width: "100%", height: "100%"}}>
                    <InstruccionVariable pool={this.props.pool} retornarCampo={this.retornarCampo}
                                                campos={this.props.columnas}
                                                camposDropdown={[{valor: this.props.nombreTablaSeleccionada}]}
                                                valoresDropdown={this.props.columnas}
                                                asignaciones={this.state.formulas}
                                                callbackCrearRegla={this.anadirRegla}
                                                callbackModificarRegla={this.modificarRegla}
                                                callbackEliminarRegla={this.eliminarRegla}
                                                retornarIndiceSeleccionado={this.actualizarIndiceSeleccionadoReglas}
                                                retornarEstadoVistaEsCondicion={() => {this.actualizarCondicion}}
                                                retornoCampo={this.retornoCampoCondicion}
                                                retornarValor={this.retornarValor}
                                                retornoOperacion={this.retornoOperacion}
                                                actualizarSeleccionFormula={this.actualizarSeleccionFormula}
                                                reglas={this.state.reglas}
                                                navbar={this.state.navbar}
                                                goToCreateFormula={this.goToCreateFormulaCampo}
                                                configuracionHome={this.props.configuracionHome}
                                                goOptions={this.props.goOptions}
                                                actualizarNivelNuevaRegla={this.actualizarNivelNuevaRegla}
                                                retornoSeleccionVariables={this.props.retornoSeleccionVariables}
                                                eliminarFormula={this.eliminarFormula}
                                                esEditarVar={false}
                                                tablaBorrarFormulas={"FormulasIndicadoresCampos"}
                                                tablaBorrarElementos={"ElementoFormulasIndicadoresCampos"}
                                                condicionFormula={this.state.condicionFormula}
                                                condicionElemento={this.state.condicionElemento}>
                    </InstruccionVariable>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("EditarUmbral") == 0) {
            return (
                <div>
                    <Umbral navbar={this.state.navbar} idVariable={this.props.idIndicadorSeleccionado} pool={this.props.pool}
                                                        lista={this.props.indicadores}
                                                        tablaVariable={"Indicador"}
                                                        tituloUmbral={"Indicador: "+this.props.nombreIndicadorSeleccionada}
                                                        maximoUmbral={100}> </Umbral>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("timelineVariable") == 0) {
            return (
                <div>
                    <TimelineVariable pool={this.props.pool}
                                            variable={{ID: this.props.idIndicadorSeleccionado, esObjeto: false, esInstruccionSQL: false, esColeccion: false}}
                                            esVariable={false}
                                            esIndicador={true}
                                            tablaInstruccion={"ResultadosNombreIndicadores where nombreIndicador = '"+this.props.nombreIndicadorSeleccionada+"' "}
                                            navbar={this.state.navbar}>
                    </TimelineVariable>
                </div>
            );
        }
    }
}
