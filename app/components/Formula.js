"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _mssql = _interopRequireDefault(require("mssql"));

var _Equacion = _interopRequireDefault(require("./Equacion.js"));

var _ListasSeleVariableContenedorVariable = _interopRequireDefault(require("./ListasSeleVariableContenedorVariable.js"));

var _ListasSeleVariableContenedorOperador = _interopRequireDefault(require("./ListasSeleVariableContenedorOperador.js"));

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

//const campos = [{valor: "idCLiente", tipo: "variable"}, {valor: "saldoTotal", tipo: "variable"}, {valor: "tipoPersona", tipo: "variable"}, {valor: "impuestosTotal", tipo: "variable"}, {valor: "nombreCliente", tipo: "variable"}, {valor: "diasMora", tipo: "variable"}, {valor: "mesMora", tipo: "variable"}];
//var tablas = [], camposTablas = [];
var operaciones = []; //const operaciones = [{valor: "Asignar", tipo: "signo"}, {valor: "Contar", tipo: "signo"}];

var operacionesNumero = [{
  valor: "Contar",
  tipo: "signo"
}, {
  valor: "Calcular Promedio",
  tipo: "signo"
}, {
  valor: "Máximo",
  tipo: "signo"
}, {
  valor: "Mínimo",
  tipo: "signo"
}, {
  valor: "Autosumar",
  tipo: "signo"
}];
var operacionesNumeroMasDeUnValor = [{
  valor: "+",
  tipo: "signo"
}, {
  valor: "-",
  tipo: "signo"
}, {
  valor: "*",
  tipo: "signo"
}, {
  valor: "/",
  tipo: "signo"
}];
var operacionesFecha = [{
  valor: "Contar",
  tipo: "signo"
}, {
  valor: "Máximo",
  tipo: "signo"
}, {
  valor: "Mínimo",
  tipo: "signo"
}, {
  valor: "Día",
  tipo: "signo"
}, {
  valor: "Mes",
  tipo: "signo"
}, {
  valor: "Año",
  tipo: "signo"
}];
var operacionesBoolean = [{
  valor: "Contar",
  tipo: "signo"
}];
var operacionesCadena = [{
  valor: "Contar",
  tipo: "signo"
}];
var operacionesCadenaMasDeUnValor = [{
  valor: "+",
  tipo: "signo"
}];
/*const operaciones = [{valor: "Asignar Valor Único", tipo: "signo"}, {valor: "Asignar Valor Único Si", tipo: "signo"}, {valor: "Asignar Valor Multiples", tipo: "signo"}, {valor: "Asignar Valor Multiples Si", tipo: "signo"}, {valor: "Contar", tipo: "signo"}, {valor: "Contar Si", tipo: "signo"}];
const operacionesNumero = [{valor: "Asignar Valor Único", tipo: "signo"}, {valor: "Asignar Valor Único Si", tipo: "signo"}, {valor: "Asignar Valor Multiples", tipo: "signo"}, {valor: "Asignar Valor Multiples Si", tipo: "signo"}, {valor: "Contar", tipo: "signo"}, {valor: "Contar Si", tipo: "signo"}, {valor: "Calcular Promedio", tipo: "signo"}, {valor: "Máximo", tipo: "signo"}, {valor: "Mínimo", tipo: "signo"}, {valor: "+", tipo: "signo"}, {valor: "-", tipo: "signo"}, {valor: "*", tipo: "signo"}, {valor: "/", tipo: "signo"}];
const operacionesFecha = [{valor: "Asignar Valor Único", tipo: "signo"}, {valor: "Asignar Valor Único Si", tipo: "signo"}, {valor: "Asignar Valor Multiples", tipo: "signo"}, {valor: "Asignar Valor Multiples Si", tipo: "signo"}, {valor: "Contar", tipo: "signo"}, {valor: "Contar Si", tipo: "signo"}];
const operacionesBoolean = [{valor: "Asignar Valor Único", tipo: "signo"}, {valor: "Asignar Valor Único Si", tipo: "signo"}, {valor: "Asignar Valor Multiples", tipo: "signo"}, {valor: "Asignar Valor Multiples Si", tipo: "signo"}, {valor: "Contar", tipo: "signo"}, {valor: "Contar Si", tipo: "signo"}];
const operacionesCadena = [{valor: "Asignar Valor Único", tipo: "signo"}, {valor: "Asignar Valor Único Si", tipo: "signo"}, {valor: "Asignar Valor Multiples", tipo: "signo"}, {valor: "Asignar Valor Multiples Si", tipo: "signo"}, {valor: "Contar", tipo: "signo"}, {valor: "Contar Si", tipo: "signo"}, {valor: "+", tipo: "signo"}];*/

var variablesEscalares = [];
var objetos = [];
var camposDeObjetos = [];
var anchuraSeccionFormula = ["100%", "50", "33%", "25%", "25%", "17%", "15%", "13%", "11%", "10%", "9%"];
var tablasOriginales = [],
    camposTablasOriginales = [],
    variablesEscalaresOriginales = [],
    variablesOriginales = [],
    camposVariablesOriginales = [],
    excelOriginales = [],
    camposExcelOriginales = [],
    formasOriginales = [],
    variablesOriginalesSQL = [],
    camposVariablesOriginalesSQL = [];
var variableSeleccionada = [],
    operacionSeleccionada = [],
    posicionDeIndicadorSeleccionadoEnFormula = '',
    posicionIndicador = '';
var posicionIndicadorAgregarEnFormula = '';
var operacionGuardarFormula = '';
var formulaGuardarFormula = ''; //bandera para ver si seleccion de variables para agregar division es correcta

var seleccionValidaVarDivision = true; //contador para poner identificadorIndicador

var identificadorIndicador = 0; //bandera para ver si selecciono

var seleccionManual = false; //bandera para saber si ya trajo todas las variables

var banderaCargaVariablesINICIO = 0;
var banderaCargaVariablesFIN = 0; //objeto para sacar las tablas de los valores de formula

var objetoFormulaParaSacarID = {}; // diferencia posicionDeIndicadorSeleccionadoEnFormula y posicionIndicadorAgregarEnFormula
//se usan en diferentes metodos, posicionDeIndicadorSeleccionadoEnFormula en clickFormula, y posicionIndicadorAgregarEnFormula para agregar var a formula

/*var arrregloPrueba = [  {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"},
                        {valor: [{valor: "a", width: "100%", height: "49%", tipo: "variable"},
                            {valor: "division\\", width: "100%", height: "2%", tipo: "division\\"},
                            {valor: "b", width: "100%", height: "49%", tipo: "variable"}],
                        width: "90%", height: "100%", tipo: "contenedorDivision"},
                        {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"}];
X = (SALDOS_MAYO)/(CLIENTES_RIESGOS)    |     (SONDEO_FINAL)/((CLIENTES_RIESGOS+FINALES_X)-B)
INPUT: NOMBRE VARIABLE, CADA TECLA SE METE A ARREGLO A MOSTRAR, QUE ES INPUT EN MAYUSCULA SI ES LETRA, CADA ESPACIO ES _*/

/*var arrregloPrueba = [
                        {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"},
                            {valor: [
                                {valor: "a", width: "49%", height: "49%", tipo: "variable"},
                                {valor: "-", width: "2%", height: "49%", tipo: "signo"},
                                {valor: "m", width: "49%", height: "49%", tipo: "variable"},
                                {valor: "division\\", width: "100%", height: "2%", tipo: "division\\"},
                                {valor: "b", width: "100%", height: "49%", tipo: "variable"}],
                            width: "90%", height: "100%", tipo: "contenedorDivision"},
                        {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"}];*/
//var arrregloPrueba = [{valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"}, {valor: [{valor: "a", width: "49%", height: "49%", tipo: "variable"}, {valor: "-", width: "2%", height: "49%", tipo: "signo"}, {valor: "m", width: "49%", height: "49%", tipo: "variable"}, {valor: "division\\", width: "100%", height: "2%", tipo: "division\\"}, {valor: "b", width: "32%", height: "49%", tipo: "variable"}, {valor: "+", width: "2%", height: "49%", tipo: "signo"}, {valor: "zsasasas", width: "32%", height: "49%", tipo: "variable"}, {valor: "*", width: "2%", height: "49%", tipo: "signo"}, {valor: "d", width: "32%", height: "49%", tipo: "variable"}], width: "90%", height: "100%", tipo: "contenedorDivision"}, {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"}];
//var arrregloPrueba = [{valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"}, {valor: "a", width: "90%", height: "100%", tipo: "variable"}, {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"}];

/*var arrregloPrueba = [
                        {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda", identificadorIndicador: 0}, 
                            {valor: [
                                {valor: "a", width: "44%", height: "49%", tipo: "variable"},
                                {valor: "-", width: "2%", height: "49%", tipo: "signo"},
                                {valor: "\\", width: "5%", height: "49%", tipo: "indicador", posicion: "izquierda", identificadorIndicador: 1},
                                    {valor: [
                                        {valor: "saldo", width: "100%", height: "49%", tipo: "variable"},
                                        {valor: "division\\", width: "100%", height: "2%", tipo: "division\\"},
                                        {valor: "local", width: "100%", height: "49%", tipo: "variable"}]
                                    , width: "44%", height: "49%", tipo: "contenedorDivision"},
                                {valor: "\\", width: "5%", height: "49%", tipo: "indicador", posicion: "derecha", identificadorIndicador: 2},
                                {valor: "division\\", width: "100%", height: "2%", tipo: "division\\"},
                                {valor: "b", width: "100%", height: "49%", tipo: "variable"}]
                            , width: "90%", height: "100%", tipo: "contenedorDivision"},
                        {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha", identificadorIndicador: 3}];*/

/*var arrregloPrueba = [
                        {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda", identificadorIndicador: 0},
                        {valor: [
                            {valor: "\\", width: "5%", height: "49%", tipo: "indicador", posicion: "izquierda", identificadorIndicador: 1},
                            {valor: [
                                {valor: "a", width: "100%", height: "49%", tipo: "variable"},
                                {valor: "division\\", width: "100%", height: "2%", tipo: "division\\"},
                                {valor: "b", width: "100%", height: "49%", tipo: "variable"}]
                            , width: "90%", height: "49%", tipo: "contenedorDivision"},
                            {valor: "\\", width: "5%", height: "49%", tipo: "indicador", posicion: "derecha", identificadorIndicador: 2},
                            {valor: "division\\", width: "100%", height: "2%", tipo: "division\\"},
                            {valor: "c", width: "100%", height: "49%", tipo: "variable"},]
                        , width: "90%", height: "100%", tipo: "contenedorDivision"},
                        {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha", identificadorIndicador: 3}];*/

var Formula =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Formula, _React$Component);

  function Formula(props) {
    var _this;

    _classCallCheck(this, Formula);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Formula).call(this, props));
    _this.state = {
      formula: [],
      tablas: [],
      camposTablas: [],
      variablesEscalares: [],
      variables: [],
      camposVariables: [],
      operaciones: [],
      excel: [],
      camposDeExcel: [],
      formas: [],
      variablesSQL: [],
      camposVariablesSQL: []
    };
    _this.clickEnFormula = _this.clickEnFormula.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionCampo = _this.retornoSeleccionCampo.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionOperacion = _this.retornoSeleccionOperacion.bind(_assertThisInitialized(_this));
    _this.existeReglaAsignacion = _this.existeReglaAsignacion.bind(_assertThisInitialized(_this));
    _this.retornarCodigoOperacion = _this.retornarCodigoOperacion.bind(_assertThisInitialized(_this));
    _this.exitseCodigoOperacion = _this.exitseCodigoOperacion.bind(_assertThisInitialized(_this));
    _this.agregarAFormula = _this.agregarAFormula.bind(_assertThisInitialized(_this));
    _this.verificarSeleccionoTodosDivision = _this.verificarSeleccionoTodosDivision.bind(_assertThisInitialized(_this));
    _this.crearArregloDeFormula = _this.crearArregloDeFormula.bind(_assertThisInitialized(_this));
    _this.crearObjetosDeArregloDeFormula = _this.crearObjetosDeArregloDeFormula.bind(_assertThisInitialized(_this));
    _this.encontrarCierreParentesis = _this.encontrarCierreParentesis.bind(_assertThisInitialized(_this));
    _this.esOperacionAritmetica = _this.esOperacionAritmetica.bind(_assertThisInitialized(_this));
    _this.esOperacionCompleja = _this.esOperacionCompleja.bind(_assertThisInitialized(_this));
    _this.getPalabraFormula = _this.getPalabraFormula.bind(_assertThisInitialized(_this));
    _this.esVariable = _this.esVariable.bind(_assertThisInitialized(_this));
    _this.agregarFormulaAnchuraYAltura = _this.agregarFormulaAnchuraYAltura.bind(_assertThisInitialized(_this));
    _this.findVariableInFormula = _this.findVariableInFormula.bind(_assertThisInitialized(_this));
    _this.clearSelectsInFormulaIndicadores = _this.clearSelectsInFormulaIndicadores.bind(_assertThisInitialized(_this));
    _this.clearSelectsInFormulaVariables = _this.clearSelectsInFormulaVariables.bind(_assertThisInitialized(_this));
    _this.findSelectedIndicador = _this.findSelectedIndicador.bind(_assertThisInitialized(_this));
    _this.getSelectedVariables = _this.getSelectedVariables.bind(_assertThisInitialized(_this));
    _this.getFormulaAndOperationText = _this.getFormulaAndOperationText.bind(_assertThisInitialized(_this));
    _this.iniciarGuardarFormula = _this.iniciarGuardarFormula.bind(_assertThisInitialized(_this));
    _this.guardarVariable = _this.guardarVariable.bind(_assertThisInitialized(_this));
    _this.actualizarEstadoInputManual = _this.actualizarEstadoInputManual.bind(_assertThisInitialized(_this));
    _this.keyupEstadoInputManual = _this.keyupEstadoInputManual.bind(_assertThisInitialized(_this));
    _this.isValidDate = _this.isValidDate.bind(_assertThisInitialized(_this));
    _this.loadTablas = _this.loadTablas.bind(_assertThisInitialized(_this));
    _this.initLoadTablasCampos = _this.initLoadTablasCampos.bind(_assertThisInitialized(_this));
    _this.loadTablasCampos = _this.loadTablasCampos.bind(_assertThisInitialized(_this));
    _this.loadScalarVariables = _this.loadScalarVariables.bind(_assertThisInitialized(_this));
    _this.loadScalarVariablesFields = _this.loadScalarVariablesFields.bind(_assertThisInitialized(_this));
    _this.loadVariables = _this.loadVariables.bind(_assertThisInitialized(_this));
    _this.initLoadVariablesCampos = _this.initLoadVariablesCampos.bind(_assertThisInitialized(_this));
    _this.loadVariablesCampos = _this.loadVariablesCampos.bind(_assertThisInitialized(_this));
    _this.loadVariablesSQL = _this.loadVariablesSQL.bind(_assertThisInitialized(_this));
    _this.initLoadVariablesCamposSQL = _this.initLoadVariablesCamposSQL.bind(_assertThisInitialized(_this));
    _this.loadVariablesCamposSQL = _this.loadVariablesCamposSQL.bind(_assertThisInitialized(_this));
    _this.loadExcel = _this.loadExcel.bind(_assertThisInitialized(_this));
    _this.initLoadExcelCampos = _this.initLoadExcelCampos.bind(_assertThisInitialized(_this));
    _this.loadExcelCampos = _this.loadExcelCampos.bind(_assertThisInitialized(_this));
    _this.loadFormas = _this.loadFormas.bind(_assertThisInitialized(_this));

    if (_this.props.esEditarVar) {
      banderaCargaVariablesINICIO = 0;
      banderaCargaVariablesFIN = 0;
    }

    variableSeleccionada = [];
    operacionSeleccionada = [];
    return _this;
  }

  _createClass(Formula, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      /*console.log('arrregloPrueba');
      console.log(arrregloPrueba);
      this.findVariableInFormula(arrregloPrueba, "b", '');
      console.log( posicionDeIndicadorSeleccionadoEnFormula );*/
      //this.getFormula();
      this.loadTablas();
      this.loadScalarVariables();
      this.loadVariables();
      this.loadVariablesSQL();
      this.loadExcel();
      this.loadFormas();
    }
  }, {
    key: "findVariableInFormula",
    value: function findVariableInFormula(arreglo, variable, posicionEnArreglo, index) {
      for (var i = 0; i < arreglo.length; i++) {
        if (!Array.isArray(arreglo[i].valor)
        /*&& !arreglo[i].esValorManual*/
        && arreglo[i].valor.toString().localeCompare(variable) == 0 && index == i) {
          posicionDeIndicadorSeleccionadoEnFormula = posicionEnArreglo + '[' + i + ']';
        } else if (Array.isArray(arreglo[i].valor)) {
          this.findVariableInFormula(arreglo[i].valor, variable, posicionEnArreglo + '[' + i + '].valor', index);
        }
      }

      ;
    }
  }, {
    key: "clearSelectsInFormulaIndicadores",
    value: function clearSelectsInFormulaIndicadores(arreglo) {
      for (var i = 0; i < arreglo.length; i++) {
        if (!Array.isArray(arreglo[i].valor)) {
          if (arreglo[i].tipo.localeCompare("indicador") == 0) {
            if (arreglo[i].posicion.localeCompare("izquierda") == 0) {
              $("#indicadorIzquierdaDiv" + arreglo[i].identificadorIndicador).removeClass("colorPunteroFormula");
              $("#indicadorIzquierdaDiv" + arreglo[i].identificadorIndicador).removeClass("blink");
              $("#indicadorIzquierdaDiv" + arreglo[i].identificadorIndicador).addClass("highlightFormulaBackground");
            } else {
              $("#indicadorDerechaDiv" + arreglo[i].identificadorIndicador).removeClass("colorPunteroFormula");
              $("#indicadorDerechaDiv" + arreglo[i].identificadorIndicador).removeClass("blink");
              $("#indicadorDerechaDiv" + arreglo[i].identificadorIndicador).addClass("highlightFormulaBackground");
            }
          } else {
            $("#indicadorIzquierda" + arreglo[i].valor + i).removeClass("colorPunteroFormula");
            $("#indicadorIzquierda" + arreglo[i].valor + i).removeClass("blink");
            $("#indicadorIzquierda" + arreglo[i].valor + i).addClass("highlightFormulaBackground");
            $("#indicadorDerecha" + arreglo[i].valor + i).removeClass("colorPunteroFormula");
            $("#indicadorDerecha" + arreglo[i].valor + i).removeClass("blink");
            $("#indicadorDerecha" + arreglo[i].valor + i).addClass("highlightFormulaBackground");
          }
        } else if (Array.isArray(arreglo[i].valor)) {
          this.clearSelectsInFormulaIndicadores(arreglo[i].valor);
        }
      }

      ;
    }
  }, {
    key: "clearSelectsInFormulaVariables",
    value: function clearSelectsInFormulaVariables(arreglo) {
      for (var i = 0; i < arreglo.length; i++) {
        if (!Array.isArray(arreglo[i].valor) && arreglo[i].activa != undefined) {
          arreglo[i].activa = false;
        } else if (Array.isArray(arreglo[i].valor)) {
          this.clearSelectsInFormulaVariables(arreglo[i].valor);
        }
      }

      ;
    }
  }, {
    key: "findSelectedIndicador",
    value: function findSelectedIndicador(arreglo, posicionEnArreglo) {
      for (var i = 0; i < arreglo.length; i++) {
        if (!Array.isArray(arreglo[i].valor)) {
          if (arreglo[i].tipo.localeCompare("indicador") == 0) {
            if (arreglo[i].posicion.localeCompare("izquierda") == 0) {
              if ($("#indicadorIzquierdaDiv" + arreglo[i].identificadorIndicador).hasClass("colorPunteroFormula")) {
                posicionIndicadorAgregarEnFormula = posicionEnArreglo + '[' + i + '].valor';
              }
            } else {
              if ($("#indicadorDerechaDiv" + arreglo[i].identificadorIndicador).hasClass("colorPunteroFormula")) {
                posicionIndicadorAgregarEnFormula = posicionEnArreglo + '[' + i + '].valor';
              }
            }
          } else {
            if ($("#indicadorIzquierda" + arreglo[i].valor + i).hasClass("colorPunteroFormula")) {
              posicionIndicadorAgregarEnFormula = posicionEnArreglo + '[' + i + '].valor';
            }

            if ($("#indicadorDerecha" + arreglo[i].valor + i).hasClass("colorPunteroFormula")) {
              posicionIndicadorAgregarEnFormula = posicionEnArreglo + '[' + i + '].valor';
            }
          }
        } else if (Array.isArray(arreglo[i].valor)) {
          this.findSelectedIndicador(arreglo[i].valor, posicionEnArreglo + '[' + i + '].valor');
        }
      }

      ;
    }
  }, {
    key: "getSelectedVariables",
    value: function getSelectedVariables(arreglo, arregloVarSeleccionadas, posicionEnArreglo) {
      for (var i = 0; i < arreglo.length; i++) {
        if (!Array.isArray(arreglo[i].valor) && arreglo[i].activa) {
          arregloVarSeleccionadas.push(posicionEnArreglo + '[' + i + ']');
        } else if (Array.isArray(arreglo[i].valor)) {
          this.getSelectedVariables(arreglo[i].valor, arregloVarSeleccionadas, posicionEnArreglo + '[' + i + '].valor');
        }
      }

      ;
    }
  }, {
    key: "clickEnFormula",
    value: function clickEnFormula(e, posicion, nombre, index) {
      var copyTemp = _toConsumableArray(this.state.formula);

      if (posicion != null) {
        this.clearSelectsInFormulaVariables(copyTemp);
        this.setState({
          formula: copyTemp
        });
      }

      this.clearSelectsInFormulaIndicadores(this.state.formula);

      if (posicion == null) {
        posicionIndicador = '';
        this.findVariableInFormula(this.state.formula, nombre, '', index);

        var temp = _toConsumableArray(this.state.formula);

        var tempVar;
        eval("tempVar = temp" + posicionDeIndicadorSeleccionadoEnFormula);
        tempVar.activa = !tempVar.activa; //temp.splice(index, 1, tempVar);

        this.setState({
          formula: temp
        });
      } else if (posicion.localeCompare("izquierda") == 0) {
        posicionIndicador = 'izquierda';
        $("#indicadorIzquierda" + nombre + index).addClass("colorPunteroFormula");
        $("#indicadorIzquierda" + nombre + index).addClass("blink");
        $("#indicadorIzquierda" + nombre + index).removeClass("highlightFormulaBackground");
        this.findVariableInFormula(this.state.formula, nombre, '', index);
      } else if (posicion.localeCompare("derecha") == 0) {
        posicionIndicador = 'derecha';
        $("#indicadorDerecha" + nombre + index).addClass("colorPunteroFormula");
        $("#indicadorDerecha" + nombre + index).addClass("blink");
        $("#indicadorDerecha" + nombre + index).removeClass("highlightFormulaBackground");
        this.findVariableInFormula(this.state.formula, nombre, '', index);
      } else if (posicion.localeCompare("empty") == 0) {
        if ($("#indicadorFormulaVacia").hasClass("colorPunteroFormula")) {
          $("#indicadorFormulaVacia").removeClass("blink");
          $("#indicadorFormulaVacia").removeClass("colorPunteroFormula");
        } else {
          $("#indicadorFormulaVacia").addClass("blink");
          $("#indicadorFormulaVacia").addClass("colorPunteroFormula");
        }
      } else if (posicion.localeCompare("indicadorIzq") == 0) {
        $("#indicadorIzquierdaDiv" + nombre).addClass("colorPunteroFormula");
        $("#indicadorIzquierdaDiv" + nombre).addClass("blink");
        $("#indicadorIzquierdaDiv" + nombre).removeClass("highlightFormulaBackground");
        posicionIndicador = 'izquierda';
      } else if (posicion.localeCompare("indicadorDer") == 0) {
        $("#indicadorDerechaDiv" + nombre).addClass("colorPunteroFormula");
        $("#indicadorDerechaDiv" + nombre).addClass("blink");
        $("#indicadorDerechaDiv" + nombre).removeClass("highlightFormulaBackground");
        posicionIndicador = 'derecha';
      }
    }
  }, {
    key: "retornoSeleccionCampo",
    value: function retornoSeleccionCampo(esOperacion, variable, posicionTabla) {
      if (variable[0].valor.length > 0) {
        var columnaSeleccionada = variable[0];
        variableSeleccionada = jQuery.extend(true, {}, variable[0]);
        if (variableSeleccionada.tipo.localeCompare("numero") == 0) variableSeleccionada.tipo = "decimal";
        var tipoVariable = '';

        if (columnaSeleccionada.tipo.localeCompare("int") == 0 && this.state.formula.length == 0) {
          tipoVariable = 'int';
          this.setState({
            operaciones: operacionesNumero
          });
        } else if ((columnaSeleccionada.tipo.localeCompare("decimal") == 0 || columnaSeleccionada.tipo.localeCompare("numero") == 0) && this.state.formula.length == 0) {
          tipoVariable = 'decimal';
          this.setState({
            operaciones: operacionesNumero
          });
        } else if (columnaSeleccionada.tipo.localeCompare("varchar") == 0 && this.state.formula.length == 0) {
          tipoVariable = 'varchar';
          this.setState({
            operaciones: operacionesCadena
          });
        } else if (columnaSeleccionada.tipo.localeCompare("date") == 0 && this.state.formula.length == 0) {
          tipoVariable = 'date';
          this.setState({
            operaciones: operacionesFecha
          });
        } else if (columnaSeleccionada.tipo.localeCompare("bit") == 0 && this.state.formula.length == 0) {
          tipoVariable = 'bit';
          this.setState({
            operaciones: operacionesBoolean
          });
        } else if (columnaSeleccionada.tipo.localeCompare("int") == 0 && this.state.formula.length > 0) {
          tipoVariable = 'int';
          this.setState({
            operaciones: operacionesNumeroMasDeUnValor
          });
        } else if ((columnaSeleccionada.tipo.localeCompare("decimal") == 0 || columnaSeleccionada.tipo.localeCompare("numero") == 0) && this.state.formula.length > 0) {
          tipoVariable = 'decimal';
          this.setState({
            operaciones: operacionesNumeroMasDeUnValor
          });
        } else if (columnaSeleccionada.tipo.localeCompare("varchar") == 0 && this.state.formula.length > 0) {
          tipoVariable = 'varchar';
          this.setState({
            operaciones: operacionesCadenaMasDeUnValor
          });
        }

        var nivelRegla = 0;
        if (variableSeleccionada.nivel != undefined) nivelRegla = variableSeleccionada.nivel + 1;
        this.props.actualizarNivelNuevaRegla(nivelRegla);
      }
    }
  }, {
    key: "retornoSeleccionOperacion",
    value: function retornoSeleccionOperacion(esOperacion, operacion) {
      if (operacion[0].valor.length > 0) {
        operacionSeleccionada = operacion[0];
        this.props.retornoOperacion(operacionSeleccionada);
      }
    }
  }, {
    key: "existeReglaAsignacion",
    value: function existeReglaAsignacion(operacion) {
      for (var i = 0; i < this.state.operaciones.length; i++) {
        if (this.state.operaciones[i].valor.localeCompare("Asignar") == 0 && this.state.operaciones[i].valor.localeCompare(operacion) == 0 || this.state.operaciones[i].valor.localeCompare("Contar") == 0 && this.state.operaciones[i].valor.localeCompare(operacion) == 0 || this.state.operaciones[i].valor.localeCompare("Calcular Promedio") == 0 && this.state.operaciones[i].valor.localeCompare(operacion) == 0 || this.state.operaciones[i].valor.localeCompare("Máximo") == 0 && this.state.operaciones[i].valor.localeCompare(operacion) == 0 || this.state.operaciones[i].valor.localeCompare("Mínimo") == 0 && this.state.operaciones[i].valor.localeCompare(operacion) == 0 || this.state.operaciones[i].valor.localeCompare("Autosumar") == 0 && this.state.operaciones[i].valor.localeCompare(operacion) == 0
        /*|| 
        this.state.operaciones[i].valor.localeCompare("Sumar") == 0*/
        ) {
            return true;
          }
      }

      ;
      return false;
    }
  }, {
    key: "retornarCodigoOperacion",
    value: function retornarCodigoOperacion(codigo) {
      if (codigo.localeCompare("Asignar") == 0) {
        return "ASIG";
      }

      if (codigo.localeCompare("Contar") == 0) {
        return "COUNT";
      }

      if (codigo.localeCompare("Calcular Promedio") == 0) {
        return "PROM";
      }

      if (codigo.localeCompare("Máximo") == 0) {
        return "MAX";
      }

      if (codigo.localeCompare("Mínimo") == 0) {
        return "MIN";
      }

      if (codigo.localeCompare("Autosumar") == 0) {
        return "AUTOSUM";
      }

      if (codigo.localeCompare("Sumar") == 0) {
        return "SUM";
      }

      if (codigo.localeCompare("Día") == 0) {
        return "DATE";
      }

      if (codigo.localeCompare("Mes") == 0) {
        return "MONTH";
      }

      if (codigo.localeCompare("Año") == 0) {
        return "YEAR";
      }
    }
  }, {
    key: "exitseCodigoOperacion",
    value: function exitseCodigoOperacion(codigo) {
      if (codigo.localeCompare("ASIG") == 0) {
        return true;
      }

      if (codigo.localeCompare("COUNT") == 0) {
        return true;
      }

      if (codigo.localeCompare("PROM") == 0) {
        return true;
      }

      if (codigo.localeCompare("MAX") == 0) {
        return true;
      }

      if (codigo.localeCompare("MIN") == 0) {
        return true;
      }

      if (codigo.localeCompare("AUTOSUM") == 0) {
        return true;
      }

      if (codigo.localeCompare("SUM") == 0) {
        return true;
      }

      if (codigo.localeCompare("DATE") == 0) {
        return true;
      }

      if (codigo.localeCompare("MONTH") == 0) {
        return true;
      }

      if (codigo.localeCompare("YEAR") == 0) {
        return true;
      }
    }
  }, {
    key: "agregarAFormula",
    value: function agregarAFormula() {
      if (variableSeleccionada.valor != undefined || seleccionManual || operacionSeleccionada.valor.localeCompare("Borrar") == 0) {
        if (seleccionManual) {
          var valor = $("#valorManual").val();
          var tipo = 'varchar';

          if (isNaN(valor)) {
            tipo = 'varchar';
          } else {
            tipo = 'decimal';
            valor = parseFloat(valor);
          }

          variableSeleccionada = {
            valor: valor,
            tipo: tipo,
            activa: false,
            esFuenteDato: false,
            esObjeto: false,
            esInstruccionSQL: false,
            esValorManual: true,
            nivel: 0,
            tipoOriginal: tipo
          };
        } //retornando tipo de variable


        if (operacionSeleccionada.valor == undefined) {
          this.props.retornoCampo(variableSeleccionada.tipo);
        } else {
          if (operacionSeleccionada.valor.localeCompare("Asignar") == 0 || operacionSeleccionada.valor.localeCompare("Máximo") == 0 || operacionSeleccionada.valor.localeCompare("Mínimo") == 0 || operacionSeleccionada.valor.localeCompare("Autosumar") == 0 || operacionSeleccionada.valor.localeCompare("Sumar") == 0) {
            this.props.retornoCampo(variableSeleccionada.tipo);
          }

          if (operacionSeleccionada.valor.localeCompare("Contar") == 0 || operacionSeleccionada.valor.localeCompare("Día") == 0 || operacionSeleccionada.valor.localeCompare("Mes") == 0 || operacionSeleccionada.valor.localeCompare("Año") == 0) {
            this.props.retornoCampo("int");
          }

          if (operacionSeleccionada.valor.localeCompare("Calcular Promedio") == 0) {
            this.props.retornoCampo("decimal");
          }
        }

        if (this.state.formula.length == 0 && $("div").hasClass("colorPunteroFormula")) {
          //caso inicial, agregar primera variable
          var formulaTemp = _toConsumableArray(this.state.formula);

          variableSeleccionada.activa = false;
          var tipoOriginal = variableSeleccionada.tipo;
          variableSeleccionada.tipo = "variable";
          variableSeleccionada.texto = variableSeleccionada.valor;
          variableSeleccionada.operacion = '';
          variableSeleccionada.tipoOriginal = tipoOriginal; //variableSeleccionada.tipoColumnaEnTabla = ;

          if (this.existeReglaAsignacion(operacionSeleccionada.valor)) {
            variableSeleccionada.texto = this.retornarCodigoOperacion(operacionSeleccionada.valor) + "(" + variableSeleccionada.valor + ")";
            variableSeleccionada.operacion = this.retornarCodigoOperacion(operacionSeleccionada.valor);
          }

          if (operacionSeleccionada.valor == undefined || operacionSeleccionada.valor.localeCompare("Borrar") == 0) {
            //cuando se agrega campo a formula para crear operacion ASIG
            variableSeleccionada.operacion = 'ASIG';
          }
          /* else {
             variableSeleccionada.operacion = operacionSeleccionada.valor;
          }*/


          var varAInsertar = jQuery.extend(true, {}, variableSeleccionada);
          formulaTemp = formulaTemp.concat(varAInsertar);
          this.agregarFormulaAnchuraYAltura(formulaTemp, true);
          this.setState({
            operaciones: [],
            formula: formulaTemp
          }); //actualizando campos de variables a mostrar segun el campo que se acaba de agregar

          if (variableSeleccionada.esFuenteDato) {
            //solo mostrar campos que sean de conexiones tabla
            var arregloConexionesTemp = [],
                arregloCamposConexionesTemp = [];

            for (var i = 0; i < tablasOriginales.length; i++) {
              if (tablasOriginales[i].ID == variableSeleccionada.tablaID) {
                arregloConexionesTemp.push(tablasOriginales[i]);

                for (var j = 0; j < camposTablasOriginales[i].length; j++) {
                  if (arregloCamposConexionesTemp[arregloConexionesTemp.length - 1] == undefined) arregloCamposConexionesTemp[arregloConexionesTemp.length - 1] = [];

                  if (tipoOriginal.localeCompare("int") == 0 || tipoOriginal.localeCompare("decimal") == 0) {
                    if (camposTablasOriginales[i][j].tipo.localeCompare("int") == 0 || camposTablasOriginales[i][j].tipo.localeCompare("decimal") == 0) arregloCamposConexionesTemp[arregloConexionesTemp.length - 1].push(camposTablasOriginales[i][j]);
                  } else {
                    if (camposTablasOriginales[i][j].tipo.localeCompare(tipoOriginal) == 0) arregloCamposConexionesTemp[arregloConexionesTemp.length - 1].push(camposTablasOriginales[i][j]);
                  }
                }

                ;
                break;
              }
            }

            ;
            this.setState({
              tablas: arregloConexionesTemp,
              camposTablas: arregloCamposConexionesTemp,
              variablesEscalares: [],
              variables: [],
              camposVariables: [],
              variablesSQL: [],
              camposVariablesSQL: []
            });
          } else {
            if (variableSeleccionada.esObjeto) {
              var arregloVariablesTemp = [],
                  arregloCamposVariablesTemp = [];

              for (var i = 0; i < variablesOriginales.length; i++) {
                if (variablesOriginales[i].ID == variableSeleccionada.variableID) {
                  arregloVariablesTemp.push(variablesOriginales[i]);

                  for (var j = 0; j < camposVariablesOriginales[i].length; j++) {
                    if (arregloCamposVariablesTemp[arregloVariablesTemp.length - 1] == undefined) arregloCamposVariablesTemp[arregloVariablesTemp.length - 1] = [];

                    if (tipoOriginal.localeCompare("int") == 0 || tipoOriginal.localeCompare("decimal") == 0) {
                      if (camposVariablesOriginales[i][j].tipo.localeCompare("int") == 0 || camposVariablesOriginales[i][j].tipo.localeCompare("decimal") == 0) arregloCamposVariablesTemp[arregloVariablesTemp.length - 1].push(camposVariablesOriginales[i][j]);
                    } else {
                      if (camposVariablesOriginales[i][j].tipo.localeCompare(tipoOriginal) == 0) arregloCamposVariablesTemp[arregloVariablesTemp.length - 1].push(camposVariablesOriginales[i][j]);
                    }
                  }

                  ;
                  break;
                }
              }

              ;
              this.setState({
                tablas: [],
                camposTablas: [],
                variablesEscalares: variablesEscalaresOriginales,
                variables: arregloVariablesTemp,
                camposVariables: arregloCamposVariablesTemp,
                variablesSQL: [],
                camposVariablesSQL: []
              });
            } else if (variableSeleccionada.esInstruccionSQL) {
              var arregloVariablesSQLTemp = [],
                  arregloCamposVariablesSQLTemp = [];

              for (var i = 0; i < variablesOriginalesSQL.length; i++) {
                if (variablesOriginalesSQL[i].ID == variableSeleccionada.variableID) {
                  arregloVariablesSQLTemp.push(variablesOriginalesSQL[i]);

                  for (var j = 0; j < camposVariablesOriginalesSQL[i].length; j++) {
                    if (arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length - 1] == undefined) arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length - 1] = [];

                    if (tipoOriginal.localeCompare("int") == 0 || tipoOriginal.localeCompare("decimal") == 0) {
                      if (camposVariablesOriginalesSQL[i][j].tipo.localeCompare("int") == 0 || camposVariablesOriginalesSQL[i][j].tipo.localeCompare("decimal") == 0) arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length - 1].push(camposVariablesOriginalesSQL[i][j]);
                    } else {
                      if (camposVariablesOriginalesSQL[i][j].tipo.localeCompare(tipoOriginal) == 0) arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length - 1].push(camposVariablesOriginalesSQL[i][j]);
                    }
                  }

                  ;
                  break;
                }
              }

              ;
              this.setState({
                tablas: [],
                camposTablas: [],
                variablesEscalares: variablesEscalaresOriginales,
                variables: [],
                camposVariables: [],
                variablesSQL: arregloVariablesSQLTemp,
                camposVariablesSQL: arregloCamposVariablesSQLTemp
              });
            } else {
              this.setState({
                tablas: [],
                camposTablas: [],
                variablesEscalares: this.state.variablesEscalares,
                variables: this.state.variables,
                camposVariables: this.state.camposVariables,
                variablesSQL: this.state.variablesSQL,
                camposVariablesSQL: this.state.camposVariablesSQL
              });
            }
          }
        } else if (operacionSeleccionada.valor != undefined && operacionSeleccionada.valor.localeCompare("Borrar") == 0) {
          var arregloVarSeleccionadas = [];
          this.getSelectedVariables(this.state.formula, arregloVarSeleccionadas, '');

          if (arregloVarSeleccionadas.length == 1) {
            //viendo si tiene variable antes de var a eliminar
            var ultimoIndice1 = arregloVarSeleccionadas[0].substring(0, arregloVarSeleccionadas[0].lastIndexOf(']'));
            var ultimoIndice2 = ultimoIndice1.substring(ultimoIndice1.lastIndexOf('[') + 1);

            if (parseInt(ultimoIndice2) != 0) {
              var indiceVarAEliminar1 = arregloVarSeleccionadas[0].substring(0, arregloVarSeleccionadas[0].lastIndexOf(']'));
              var indiceVarAEliminar2 = indiceVarAEliminar1.substring(indiceVarAEliminar1.lastIndexOf('[') + 1);
              var indiceVarAEliminarAnterior1 = arregloVarSeleccionadas[0].substring(0, arregloVarSeleccionadas[0].lastIndexOf(']'));
              var indiceVarAEliminarAnterior2 = indiceVarAEliminar1.substring(indiceVarAEliminar1.lastIndexOf('[') + 1);
              indiceVarAEliminarAnterior2 = parseInt(indiceVarAEliminarAnterior2) - 1;
              var variableAEliminar, variableAntesEliminar;

              var copyFormula = _toConsumableArray(this.state.formula);

              eval("variableAEliminar = this.state.formula" + arregloVarSeleccionadas[0]);
              eval("copyFormula" + arregloVarSeleccionadas[0].substring(0, arregloVarSeleccionadas[0].lastIndexOf('[')) + ".splice(indiceVarAEliminar2, 1)");
              eval("variableAntesEliminar = this.state.formula" + arregloVarSeleccionadas[0].substring(0, arregloVarSeleccionadas[0].lastIndexOf('[')) + "[indiceVarAEliminarAnterior2]");
              if (variableAntesEliminar.tipo.localeCompare("signo") == 0) eval("copyFormula" + arregloVarSeleccionadas[0].substring(0, arregloVarSeleccionadas[0].lastIndexOf('[')) + ".splice(indiceVarAEliminarAnterior2, 1)");
              this.agregarFormulaAnchuraYAltura(copyFormula, true);
              this.setState({
                formula: copyFormula
              });
            } else {
              var indiceVarAEliminar1 = arregloVarSeleccionadas[0].substring(0, arregloVarSeleccionadas[0].lastIndexOf(']'));
              var indiceVarAEliminar2 = indiceVarAEliminar1.substring(indiceVarAEliminar1.lastIndexOf('[') + 1);

              var copyFormula = _toConsumableArray(this.state.formula);

              eval("copyFormula" + arregloVarSeleccionadas[0].substring(0, arregloVarSeleccionadas[0].lastIndexOf('[')) + ".splice(indiceVarAEliminar2, 1)");
              this.agregarFormulaAnchuraYAltura(copyFormula, true);
              this.setState({
                formula: copyFormula
              });
            }
          } else if (arregloVarSeleccionadas.length > 1) {
            alert("Solo debe seleccionar una variable a eliminar.");
          } else {
            alert("Debe seleccionar por lo menos la variable a eliminar.");
          }
        } else if (this.state.formula.length > 0 && $("div").hasClass("colorPunteroFormula") && operacionSeleccionada.valor != undefined && operacionSeleccionada.valor.localeCompare("/") != 0) {
          var formulaTemp = _toConsumableArray(this.state.formula); //quitar cualquier operacion seleccionada anteriormente


          for (var i = 0; i < formulaTemp.length; i++) {
            formulaTemp[i].operacion = 'FORMULA';
            formulaTemp[i].texto = formulaTemp[i].valor;
          }

          ;
          var tipoOriginal = variableSeleccionada.tipo;
          variableSeleccionada.tipoOriginal = tipoOriginal;
          variableSeleccionada.activa = false;
          variableSeleccionada.tipo = "variable";
          variableSeleccionada.texto = variableSeleccionada.valor;
          variableSeleccionada.operacion = '';

          if (this.existeReglaAsignacion(operacionSeleccionada.valor)) {
            variableSeleccionada.texto = this.retornarCodigoOperacion(operacionSeleccionada.valor) + "(" + variableSeleccionada.valor + ")";
            variableSeleccionada.operacion = this.retornarCodigoOperacion(operacionSeleccionada.valor);
          } else {
            variableSeleccionada.operacion = 'FORMULA';
          }

          var posicionArreglo = '',
              ultimoIndice = '',
              noHaLeidoUltimoIndice = true;

          for (var i = posicionDeIndicadorSeleccionadoEnFormula.length - 1; i >= 0; i--) {
            if (!noHaLeidoUltimoIndice) {
              posicionArreglo += posicionDeIndicadorSeleccionadoEnFormula.charAt(i);
            }

            if (posicionDeIndicadorSeleccionadoEnFormula.charAt(i).localeCompare('[') != 0 && posicionDeIndicadorSeleccionadoEnFormula.charAt(i).localeCompare(']') != 0 && noHaLeidoUltimoIndice) {
              if (posicionDeIndicadorSeleccionadoEnFormula.charAt(i).localeCompare('[') != 0 && posicionDeIndicadorSeleccionadoEnFormula.charAt(i).localeCompare(']') != 0) ultimoIndice += posicionDeIndicadorSeleccionadoEnFormula.charAt(i);

              if (posicionDeIndicadorSeleccionadoEnFormula.charAt(i).localeCompare('[') == 0) {
                noHaLeidoUltimoIndice = false;
              }
            }
          }

          ;
          var arregloVarSeleccionadas = []; //this.getSelectedIndicador (this.state.formula, arregloVarSeleccionadas, '');
          //this.findVariableInFormula(this.state.formula, nombre, '');

          this.findSelectedIndicador(this.state.formula, '');
          var indicadorSeleccionado; //eval("indicadorSeleccionado = this.state.formula["+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf(".")))
          //var tempVar;
          //eval("tempVar = temp"+posicionArreglo);

          operacionSeleccionada.operacion = operacionSeleccionada.valor;
          var varAInsertar = jQuery.extend(true, {}, variableSeleccionada);

          if (posicionIndicador.localeCompare("derecha") == 0) {
            /*if(posicionArreglo.length > 0) {
                formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice)+1, 0, varAInsertar);
                formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice)+1, 0, operacionSeleccionada);
            } else {
                formulaTemp.splice(parseInt(ultimoIndice)+1, 0, varAInsertar);
                formulaTemp.splice(parseInt(ultimoIndice)+1, 0, operacionSeleccionada);
            }*/
            if (posicionIndicadorAgregarEnFormula.split("[").length > 2) {
              var pos1 = posicionIndicadorAgregarEnFormula.substring(posicionIndicadorAgregarEnFormula.lastIndexOf("[") + 1);
              var pos2 = pos1.substring(0, pos1.lastIndexOf("]"));
              var esUltimoIndice = false;
              eval("if (formulaTemp" + posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("[")) + ".length == parseInt(pos2)+1) esUltimoIndice = true");
              eval("formulaTemp" + posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("[")) + ".splice( parseInt(pos2)+1, 0, operacionSeleccionada)");
              eval("formulaTemp" + posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("[")) + ".splice( parseInt(pos2)+2, 0, varAInsertar)");
              /*if(esUltimoIndice) {
                  eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2)+1, 0, operacionSeleccionada)" );
                  eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2)+1, 0, varAInsertar)" );
              } else {
                  eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2)+1, 0, varAInsertar)" );
                  eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2)+1, 0, operacionSeleccionada)" );
              }*/
            } else {
              var pos1 = posicionIndicadorAgregarEnFormula.substring(posicionIndicadorAgregarEnFormula.lastIndexOf("[") + 1);
              var pos2 = pos1.substring(0, pos1.lastIndexOf("]"));
              eval("formulaTemp.splice( parseInt(pos2)+1, 0, operacionSeleccionada)");
              eval("formulaTemp.splice( parseInt(pos2)+2, 0, varAInsertar)");
            } //eval("formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice)+1, 0, variableSeleccionada[0])");

          } else {
            if (posicionIndicadorAgregarEnFormula.split("[").length > 2) {
              var pos1 = posicionIndicadorAgregarEnFormula.substring(posicionIndicadorAgregarEnFormula.lastIndexOf("[") + 1);
              var pos2 = pos1.substring(0, pos1.lastIndexOf("]"));
              var esUltimoIndice = false;
              eval("if (formulaTemp" + posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("[")) + ".length == parseInt(pos2)+1) esUltimoIndice = true");
              eval("formulaTemp" + posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("[")) + ".splice( parseInt(pos2), 0, operacionSeleccionada)");
              eval("formulaTemp" + posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("[")) + ".splice( parseInt(pos2), 0, varAInsertar)");
              /*if(esUltimoIndice) {
                  eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2)+1, 0, operacionSeleccionada)" );
                  eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2)+1, 0, varAInsertar)" );
              } else {
                  eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2)+1, 0, varAInsertar)" );
                  eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2)+1, 0, operacionSeleccionada)" );
              }*/
            } else {
              var pos1 = posicionIndicadorAgregarEnFormula.substring(posicionIndicadorAgregarEnFormula.lastIndexOf("[") + 1);
              var pos2 = pos1.substring(0, pos1.lastIndexOf("]"));
              eval("formulaTemp.splice( parseInt(pos2), 0, operacionSeleccionada)");
              eval("formulaTemp.splice( parseInt(pos2), 0, varAInsertar)");
            }
            /*if(posicionArreglo.length > 0) {
                formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice), 0, operacionSeleccionada);
                formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice), 0, varAInsertar);
            } else {
                formulaTemp.splice(parseInt(ultimoIndice), 0, operacionSeleccionada);
                formulaTemp.splice(parseInt(ultimoIndice), 0, varAInsertar);
            }*/

          }

          this.agregarFormulaAnchuraYAltura(formulaTemp, true);
          this.setState({
            operaciones: [],
            formula: formulaTemp
          }); //actualizando campos de variables a mostrar segun el campo que se acaba de agregar

          var tipoOriginal = variableSeleccionada.tipoOriginal;

          if (variableSeleccionada.esFuenteDato) {
            //solo mostrar campos que sean de conexiones tabla
            var arregloConexionesTemp = [],
                arregloCamposConexionesTemp = [];

            for (var i = 0; i < tablasOriginales.length; i++) {
              if (tablasOriginales[i].ID == variableSeleccionada.tablaID) {
                arregloConexionesTemp.push(tablasOriginales[i]);

                for (var j = 0; j < camposTablasOriginales[i].length; j++) {
                  if (arregloCamposConexionesTemp[arregloConexionesTemp.length - 1] == undefined) arregloCamposConexionesTemp[arregloConexionesTemp.length - 1] = [];

                  if (tipoOriginal.localeCompare("int") == 0 || tipoOriginal.localeCompare("decimal") == 0) {
                    if (camposTablasOriginales[i][j].tipo.localeCompare("int") == 0 || camposTablasOriginales[i][j].tipo.localeCompare("decimal") == 0) {
                      arregloCamposConexionesTemp[arregloConexionesTemp.length - 1].push(camposTablasOriginales[i][j]);
                    }
                  } else {
                    if (camposTablasOriginales[i][j].tipo.localeCompare(tipoOriginal) == 0) {
                      arregloCamposConexionesTemp[arregloConexionesTemp.length - 1].push(camposTablasOriginales[i][j]);
                    }
                  }
                }

                ;
                break;
              }
            }

            ;
            this.setState({
              tablas: arregloConexionesTemp,
              camposTablas: arregloCamposConexionesTemp,
              variablesEscalares: [],
              variables: [],
              camposVariables: [],
              variablesSQL: [],
              camposVariablesSQL: []
            });
          } else {
            if (variableSeleccionada.esObjeto) {
              var arregloVariablesTemp = [],
                  arregloCamposVariablesTemp = [];

              for (var i = 0; i < variablesOriginales.length; i++) {
                if (variablesOriginales[i].ID == variableSeleccionada.variableID) {
                  arregloVariablesTemp.push(variablesOriginales[i]);

                  for (var j = 0; j < camposVariablesOriginales[i].length; j++) {
                    if (arregloCamposVariablesTemp[arregloVariablesTemp.length - 1] == undefined) arregloCamposVariablesTemp[arregloVariablesTemp.length - 1] = [];

                    if (tipoOriginal.localeCompare("int") == 0 || tipoOriginal.localeCompare("decimal") == 0) {
                      if (camposVariablesOriginales[i][j].tipo.localeCompare("int") == 0 || camposVariablesOriginales[i][j].tipo.localeCompare("decimal") == 0) arregloCamposVariablesTemp[arregloVariablesTemp.length - 1].push(camposVariablesOriginales[i][j]);
                    } else {
                      if (camposVariablesOriginales[i][j].tipo.localeCompare(tipoOriginal) == 0) arregloCamposVariablesTemp[arregloVariablesTemp.length - 1].push(camposVariablesOriginales[i][j]);
                    }
                  }

                  ;
                  break;
                }
              }

              ;
              this.setState({
                tablas: [],
                camposTablas: [],
                variablesEscalares: variablesEscalaresOriginales,
                variables: arregloVariablesTemp,
                camposVariables: arregloCamposVariablesTemp,
                variablesSQL: [],
                camposVariablesSQL: []
              });
            } else if (variableSeleccionada.esInstruccionSQL) {
              var arregloVariablesSQLTemp = [],
                  arregloCamposVariablesSQLTemp = [];

              for (var i = 0; i < variablesOriginalesSQL.length; i++) {
                if (variablesOriginalesSQL[i].ID == variableSeleccionada.variableID) {
                  arregloVariablesSQLTemp.push(variablesOriginalesSQL[i]);

                  for (var j = 0; j < camposVariablesOriginalesSQL[i].length; j++) {
                    if (arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length - 1] == undefined) arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length - 1] = [];

                    if (tipoOriginal.localeCompare("int") == 0 || tipoOriginal.localeCompare("decimal") == 0) {
                      if (camposVariablesOriginalesSQL[i][j].tipo.localeCompare("int") == 0 || camposVariablesOriginalesSQL[i][j].tipo.localeCompare("decimal") == 0) arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length - 1].push(camposVariablesOriginalesSQL[i][j]);
                    } else {
                      if (camposVariablesOriginalesSQL[i][j].tipo.localeCompare(tipoOriginal) == 0) arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length - 1].push(camposVariablesOriginalesSQL[i][j]);
                    }
                  }

                  ;
                  break;
                }
              }

              ;
              this.setState({
                tablas: [],
                camposTablas: [],
                variablesEscalares: variablesEscalaresOriginales,
                variables: [],
                camposVariables: [],
                variablesSQL: arregloVariablesSQLTemp,
                camposVariablesSQL: arregloCamposVariablesSQLTemp
              });
            } else {
              this.setState({
                tablas: [],
                camposTablas: [],
                variablesEscalares: this.state.variablesEscalares,
                variables: this.state.variables,
                camposVariables: this.state.camposVariables,
                variablesSQL: this.state.variablesSQL,
                camposVariablesSQL: this.state.camposVariablesSQL
              });
            }
          } //FIN actualizando campos de variables a mostrar segun el campo que se acaba de agregar

        } else if (this.state.formula.length > 0 && operacionSeleccionada.valor != undefined && operacionSeleccionada.valor.localeCompare("/") == 0) {
          //quitar cualquier operacion seleccionada anteriormente
          var formulaTemp = _toConsumableArray(this.state.formula);

          for (var i = 0; i < formulaTemp.length; i++) {
            formulaTemp[i].operacion = 'FORMULA';
            formulaTemp[i].texto = formulaTemp[i].valor;
          }

          ;
          this.setState({
            formula: formulaTemp
          });
          var arregloVarSeleccionadas = [];
          this.getSelectedVariables(this.state.formula, arregloVarSeleccionadas, '');

          if ($("div").hasClass("colorPunteroFormula") || arregloVarSeleccionadas.length == 0) {
            alert("Para agregar una división, seleccione las variables a ser numerador en la fórmula.");
          } else {
            var tipoOriginal = variableSeleccionada.tipo;
            variableSeleccionada.tipoOriginal = tipoOriginal;
            variableSeleccionada.tipo = "variable";
            variableSeleccionada.texto = variableSeleccionada.valor;
            variableSeleccionada.operacion = 'FORMULA'; //variableSeleccionada.tipoColumnaEnTabla = ;

            if (this.existeReglaAsignacion(operacionSeleccionada.valor)) {
              variableSeleccionada.texto = this.retornarCodigoOperacion(operacionSeleccionada.valor) + "(" + variableSeleccionada.valor + ")";
              variableSeleccionada.operacion = this.retornarCodigoOperacion(operacionSeleccionada.valor);
            } //separar arreglo arregloVarSeleccionadas por diferentes primer indices, elegir el mas corto y quitar ultimo indice solo si length != 1
            // 1) eje: [1][0],[1][2]    [5][1][0],[5][1][2],[5][1][4]       [8]
            // 2) res: [1], [5][1], [8]
            //========================
            //SE CREAN ARREGLOS 1) Y 2)
            //SI ARREGLO 2) LENGTH > 1
            //VER QUE PRIMEROS INDICES DE ARREGLO 2) ESTEN A UNA DISTANCIA DE 3 SI ES DIV Y 2 SI ES VAR, PARA COMPROBAR QUE DIFERENTES
            //SELECCIONES DE VARIABLES ESTAN CONTINUAS EN FORMULA, EJE: [\\,[P1,DIV\,P2],\\,-,P4,+,\\,[P5,DIV\,P6],\\,-,P7,+,P8]
            //  [\\,[P1,DIV\,P2],\\,-,P4,+,P6]
            //POR CADA POSICION INICIAL (PRIMER INDICE), PROBAR QUE LA SELECCION FUE CORRECTA SI ES DIV
            //SI SELECCIONO UNA DIVISION SE TIENE QUE SELECCIONAR TODAS LAS VAR DE LA DIV
            //SI ARREGLO 2) LENGTH == 1
            //COMPROBAR QUE LA SELECCION ES CORRECTA
            //SI SOLO SE SELECIONO DEL NUMERADOR
            //SI SOLO UNA BIEN
            //SINO SI VERIFICAR QUE CADA VAR SELECCIONADA ESTE CONTINUA O SEA A UNA DISTANCIA DE 2, eje: [0] -> [2] -> [4]
            //SI SE SELECCIONO DE UN DENOMINADOR SE TIENEN QUE SELECCIONAR LAS DEMAS VAR DEL DENOMINADOR, TAMBIEN TODO LO 
            //QUE ESTE EN EL NUMERADOR
            //SE EMPIEZA POR EL VALOR DE SUB-ARREGLO 1) (EJE: [5][1][0],[5][1][2],[5][1][4]) MAS CORTO Y SE MANDA A LLAMAR METODO:
            //METODO:
            //SE RECORREN TODAS LAS VAR DE ESE NIVEL QUE NO SEAN ARREGLOS Y SE VERIFICAN SI ESTA SEL, SINO RETORNAR FALSO
            //POR ULTIMO SE VUELVE A LLAMAR EL METODO POR CADA ARREGLO
            //SI SELECCION ES CORRECTA (PROCESO ANTERIOR)
            //SI ARREGLO 2) LENGTH == 1
            //SACAR EL ULTIMO INDICE EN COMUN MAS CERCANO, CREAR
            //SI EL ULTIMO INDICE ES DIV, SOLO INSERTAR NUEVA DIVISION EN ESA POS
            //SI NO ES DIV, CREAR INDICADOR IZQ, INSERTAR NUEVA DIVISION Y DESPUES CREAR INDICADOR DER
            //SI ARREGLO 2) LENGTH > 1
            //RECORRIENDO DE IZQ A DER CREANDO ARREGLO DE VALORES A INSERTAR, SOLO AGARRAR LAS VAR, SIGNOS E INDICADORES DEL PRIMER INDICE/NIVEL
            //RECORRIENDO DE DER A IZQ ELIMINAR CADA VALOR ANTERIORMENTE SEL, Y METER ARREGLO DE VALORES A INSERTAR 
            //EN PRIMER VALOR DE ARREGLO 2) VERIFICANDO SI ES DIV, PARA METER EN LA POS ANTERIOR
            //separar arreglo arregloVarSeleccionadas por diferentes primer indices, elegir el mas corto y quitar ultimo indice solo si length != 1
            // 1) eje: [1][0],[1][2]    [5][1][0],[5][1][2],[5][1][4]       [8]
            // 2) res: [1], [5][1], [8]


            var indicesVarSeleccionadas = []; //arreglo 2)

            var arregloVarSeleccionadasPorIndicesInicial = []; //arreglo 1)

            for (var i = 0; i < arregloVarSeleccionadas.length; i++) {
              var posInicial = arregloVarSeleccionadas[i].split("]")[0].split("[")[1];
              var existe = false;

              for (var j = 0; j < arregloVarSeleccionadasPorIndicesInicial.length; j++) {
                var posInicialComparacion = arregloVarSeleccionadasPorIndicesInicial[j][0].split("]")[0].split("[")[1];

                if (posInicialComparacion.localeCompare(posInicial) == 0) {
                  existe = true;
                  break;
                }
              }

              ;

              if (!existe) {
                arregloVarSeleccionadasPorIndicesInicial.push([arregloVarSeleccionadas[i]]);
              } else {
                arregloVarSeleccionadasPorIndicesInicial[j].push(arregloVarSeleccionadas[i]);
              }
            }

            ;

            for (var i = 0; i < arregloVarSeleccionadasPorIndicesInicial.length; i++) {
              var elMasCorto = '';

              for (var j = 0; j < arregloVarSeleccionadasPorIndicesInicial[i].length; j++) {
                if (elMasCorto.length == 0) {
                  elMasCorto = arregloVarSeleccionadasPorIndicesInicial[i][j];
                } else if (elMasCorto.length > arregloVarSeleccionadasPorIndicesInicial[i][j].length) {
                  elMasCorto = arregloVarSeleccionadasPorIndicesInicial[i][j];
                }
              }

              ;

              if (elMasCorto.length > 0) {
                if (elMasCorto.split("[").length > 2) {
                  indicesVarSeleccionadas.push(elMasCorto.substring(0, elMasCorto.lastIndexOf("[")));
                } else {
                  indicesVarSeleccionadas.push(elMasCorto);
                }
              }
            }

            ;

            if (indicesVarSeleccionadas.length > 1) {
              //VER QUE DISTANCIA PRIMEROS INDICES DE ARREGLO
              var seleccionVariablesContinuas = false;

              for (var a = 0; a < indicesVarSeleccionadas.length; a++) {
                var variableAEvaluar;

                if (indicesVarSeleccionadas[a].split("[").length > 2) {
                  eval("variableAEvaluar = this.state.formula" + indicesVarSeleccionadas[a].substring(0, indicesVarSeleccionadas[a].lastIndexOf("[")));
                } else {
                  eval("variableAEvaluar = this.state.formula" + indicesVarSeleccionadas[a]);
                }

                if (a != 0) {
                  if (variableAEvaluar.tipo.localeCompare("contenedorDivision") == 0) {
                    var variableDeComparacion;
                    var indiceOriginal = parseInt(indicesVarSeleccionadas[a].split("]")[0].split("[")[1]);
                    eval("variableDeComparacion = this.state.formula" + (indiceOriginal - 3));

                    if (variableDeComparacion.tipo.localeCompare("indicador") == 0 && variableDeComparacion.posicion.localeCompare("derecha") == 0) {
                      seleccionVariablesContinuas = true;
                    } else if (variableDeComparacion.tipo.localeCompare("variable") == 0) {
                      seleccionVariablesContinuas = true;
                    } else {
                      seleccionVariablesContinuas = false;
                      break;
                    }
                  } else if (variableAEvaluar.tipo.localeCompare("variable") == 0) {
                    var variableDeComparacion;
                    var indiceOriginal = parseInt(indicesVarSeleccionadas[a].split("]")[0].split("[")[1]);
                    eval("variableDeComparacion = this.state.formula" + (indiceOriginal - 2));

                    if (variableDeComparacion.tipo.localeCompare("indicador") == 0 && variableDeComparacion.posicion.localeCompare("derecha") == 0) {
                      seleccionVariablesContinuas = true;
                    } else if (variableDeComparacion.tipo.localeCompare("variable") == 0) {
                      seleccionVariablesContinuas = true;
                    } else {
                      seleccionVariablesContinuas = false;
                      break;
                    }
                  }
                }
              }

              ;

              if (seleccionVariablesContinuas) {
                //VER QUE TODAS LAS VARIABLES DE LA DIVISION ESTEN SELECCIONADAS
                for (var a = 0; a < indicesVarSeleccionadas.length; a++) {
                  var variableAEvaluar;

                  if (indicesVarSeleccionadas[a].split("[").length > 2) {
                    eval("variableAEvaluar = this.state.formula" + indicesVarSeleccionadas[a].substring(0, indicesVarSeleccionadas[a].lastIndexOf("[")));
                  } else {
                    eval("variableAEvaluar = this.state.formula" + indicesVarSeleccionadas[a]);
                  }

                  if (Array.isArray(variableAEvaluar.valor)) {
                    seleccionValidaVarDivision = true;
                    this.verificarSeleccionoTodosDivision(variableAEvaluar);

                    if (!seleccionValidaVarDivision) {
                      break;
                    }
                  }
                }

                ;
                /*if(seleccionValidaVarDivision) {
                    //CREANDO ARREGLOS VALORES A INSERTAR
                    var arregloAInsertarNuevo = [];
                    for (var a = 0; a < indicesVarSeleccionadas.length; a++) {
                        var indiceOriginal = parseInt(indicesVarSeleccionadas[a].split("]")[0].split("[")[1]);
                        if( Array.isArray(this.state.formula[indiceOriginal].valor) ) {
                            //insertar indicador izquierda
                            //var indIzquierdo = {valor: "\\\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"};
                            arregloAInsertarNuevo.push(this.state.formula[indiceOriginal-1]);
                            //insertar arreglo / division
                            arregloAInsertarNuevo.push(this.state.formula[indiceOriginal]);
                            //insertar indicador derecha
                            //var indDerecho = {valor: "\\\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"};
                            arregloAInsertarNuevo.push(this.state.formula[indiceOriginal+1]);
                            if(a != indicesVarSeleccionadas.length-1) {
                                arregloAInsertarNuevo.push(this.state.formula[indiceOriginal+2]);
                            }
                        } else if( !Array.isArray(this.state.formula[indiceOriginal].valor) && this.state.formula[indiceOriginal].tipo.localeCompare("variable") == 0 ) {
                            arregloAInsertarNuevo.push(this.state.formula[indiceOriginal]);
                            if(a != indicesVarSeleccionadas.length-1) {
                                arregloAInsertarNuevo.push(this.state.formula[indiceOriginal+1]);
                            }
                        }
                    };
                    console.log('arregloAInsertarNuevo');
                    console.log(arregloAInsertarNuevo);
                    //ELIMINANDO VARIABLES DEL ARREGLO ORIGINAL
                    var copyFormula = [...this.state.formula];
                    var posicionInicialAInsertarNuevaDiv = -1;
                    console.log('copyFormula antes');
                    console.log(copyFormula);
                    for (var a = indicesVarSeleccionadas.length; a >= 0; a--) {
                        var indiceOriginal = parseInt(indicesVarSeleccionadas[a].split("]")[0].split("[")[1]);
                        if( Array.isArray(this.state.formula[indiceOriginal].valor) ) {
                            if(a != indicesVarSeleccionadas.length-1) {
                                copyFormula.splice(indiceOriginal+2, 1);
                            }
                            //quitar indicador derecha
                            copyFormula.splice(indiceOriginal+1, 1);
                            //quitar arreglo / division
                            copyFormula.splice(indiceOriginal, 1);
                            //quitar indicador izquierda
                            copyFormula.splice(indiceOriginal-1, 1);
                            posicionInicialAInsertarNuevaDiv = indiceOriginal-1;
                        } else if( !Array.isArray(this.state.formula[indiceOriginal].valor) && this.state.formula[indiceOriginal].tipo.localeCompare("variable") == 0 ) {
                            if(a != indicesVarSeleccionadas.length-1) {
                                copyFormula.splice(indiceOriginal+1, 1);
                            }
                            copyFormula.splice(indiceOriginal, 1);
                            posicionInicialAInsertarNuevaDiv = indiceOriginal;
                        }
                    };
                    console.log('posicionInicialAInsertar');
                    console.log(posicionInicialAInsertar);
                    console.log('copyFormula despues quitar');
                    console.log(copyFormula);
                    for (var i = 0; i < arregloAInsertarNuevo.length; i++) {
                        copyFormula.splice(posicionInicialAInsertarNuevaDiv+i, 0, arregloAInsertarNuevo[i]);
                    };
                    console.log('copyFormula despues añadir');
                    console.log(copyFormula);
                    this.setState({
                        formula: copyFormula
                    });
                } else {
                    alert("La selecciones de divisiones tiene que tener todas las variables de la division seleccionada.")
                }*/
              } else {
                alert("La seleccion de variables deben ser seguidas en la formula.");
              }
            } else if (indicesVarSeleccionadas.length == 1) {
              //VIENDO SI SE SELECCIONO SOLO UNA VARIABLE
              if (arregloVarSeleccionadasPorIndicesInicial[0].length == 1) {
                //SELECCIONO SOLO UNA VARIABLE
                var variableAEvaluar;

                if (arregloVarSeleccionadasPorIndicesInicial[0][0].split("[").length > 2) {
                  eval("variableAEvaluar = this.state.formula" + arregloVarSeleccionadasPorIndicesInicial[0][0].substring(0, arregloVarSeleccionadasPorIndicesInicial[0][0].lastIndexOf("[")));
                } else {
                  eval("variableAEvaluar = this.state.formula" + arregloVarSeleccionadasPorIndicesInicial[0][0]);
                }

                var seleccionVarEnNumerador = true,
                    esAntesDenominador = true;
                ;

                if (variableAEvaluar.length != undefined) {
                  for (var i = 0; i < variableAEvaluar.length; i++) {
                    if (!Array.isArray(variableAEvaluar[i].valor) && variableAEvaluar[i].valor.localeCompare("division\\\\") == 0) {
                      esAntesDenominador = false;
                    } else if (!Array.isArray(variableAEvaluar[i].valor) && variableAEvaluar[i].activa && !esAntesDenominador) {
                      seleccionVarEnNumerador = false;
                      break;
                    }
                  }

                  ;
                }

                if (seleccionVarEnNumerador) {
                  //CREANDO ARREGLOS VALORES A INSERTAR
                  var copiaAntiguaVariable,
                      arregloAInsertarNuevo = [];
                  eval("copiaAntiguaVariable = this.state.formula" + arregloVarSeleccionadasPorIndicesInicial[0][0]);
                  var indIzquierdo = {
                    valor: "\\\\",
                    width: "5%",
                    height: "100%",
                    tipo: "indicador",
                    posicion: "izquierda"
                  };
                  arregloAInsertarNuevo.push(indIzquierdo);
                  var signoDivision = {
                    valor: "division\\\\",
                    width: "100%",
                    height: "2%",
                    tipo: "division\\\\"
                  };
                  var division = {
                    valor: [copiaAntiguaVariable, signoDivision, variableSeleccionada],
                    width: "90%",
                    height: "49%",
                    tipo: "contenedorDivision"
                  };
                  arregloAInsertarNuevo.push(division);
                  var indDerecho = {
                    valor: "\\\\",
                    width: "5%",
                    height: "100%",
                    tipo: "indicador",
                    posicion: "derecha"
                  };
                  arregloAInsertarNuevo.push(indDerecho); //ELIMINANDO VARIABLES DEL ARREGLO ORIGINAL

                  var copyFormula = _toConsumableArray(this.state.formula);
                  /*if(arregloVarSeleccionadasPorIndicesInicial[0][0].split("[").length > 2) {
                      var variablePosicionAnterior;
                      eval("variablePosicionAnterior = copyFormula"+arregloVarSeleccionadasPorIndicesInicial[0][0]);
                      if(variablePosicionAnterior.tipo.localeCompare("variable") == 0) {
                          //var arregloConIndicadores = [];
                          //var indIzquierdo = {valor: "\\\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"};
                          //var indDerecho = {valor: "\\\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"};
                          //var signoDivision = {valor: "division\\\\", width: "100%", height: "2%", tipo: "division\\\\"};
                          //var division = {valor: [copiaAntiguaVariable, signoDivision, variableSeleccionada], width: "90%", height: "49%", tipo: "contenedorDivision"};
                          //arregloConIndicadores.push()
                          for (var i = arregloAInsertarNuevo.length - 1; i >= 0; i--) {
                              if(i == arregloAInsertarNuevo.length - 1) {
                                  console.log('1.');
                                  console.log('posInsertar');
                                  console.log( arregloVarSeleccionadasPorIndicesInicial[0][0].substring(0, arregloVarSeleccionadasPorIndicesInicial[0][0].lastIndexOf("[")) );
                                  console.log('arregloAInsertarNuevo[i]');
                                  console.log(arregloAInsertarNuevo[i]);
                                  eval("copyFormula"+arregloVarSeleccionadasPorIndicesInicial[0][0].substring(0, arregloVarSeleccionadasPorIndicesInicial[0][0].lastIndexOf("["))+".splice("+arregloVarSeleccionadasPorIndicesInicial[0][0].substring(arregloVarSeleccionadasPorIndicesInicial[0][0].lastIndexOf("["))+", 1, arregloAInsertarNuevo[i])");
                              } else {
                                  console.log('2.');
                                  console.log('posInsertar');
                                  console.log( arregloVarSeleccionadasPorIndicesInicial[0][0].substring(0, arregloVarSeleccionadasPorIndicesInicial[0][0].lastIndexOf("[")) );
                                  console.log('arregloAInsertarNuevo[i]');
                                  console.log(arregloAInsertarNuevo[i]);
                                  eval("copyFormula"+arregloVarSeleccionadasPorIndicesInicial[0][0].substring(0, arregloVarSeleccionadasPorIndicesInicial[0][0].lastIndexOf("["))+".splice("+arregloVarSeleccionadasPorIndicesInicial[0][0].substring(arregloVarSeleccionadasPorIndicesInicial[0][0].lastIndexOf("["))+", 0, arregloAInsertarNuevo[i])");
                              }
                          };
                          //eval("copyFormula"+arregloVarSeleccionadasPorIndicesInicial[0][0].substring(0, arregloVarSeleccionadasPorIndicesInicial[0][0].lastIndexOf("["))+" = arregloAInsertarNuevo");
                      } else if(variablePosicionAnterior.tipo.localeCompare("division\\\\") == 0) {
                          eval("copyFormula"+arregloVarSeleccionadasPorIndicesInicial[0][0].substring(0, arregloVarSeleccionadasPorIndicesInicial[0][0].lastIndexOf("["))+" = arregloAInsertarNuevo");
                      }
                  } else {
                      console.log('3.');
                      eval("copyFormula"+arregloVarSeleccionadasPorIndicesInicial[0][0]+" = arregloAInsertarNuevo");
                  }*/


                  for (var i = arregloAInsertarNuevo.length - 1; i >= 0; i--) {
                    if (i == arregloAInsertarNuevo.length - 1) {
                      eval("copyFormula" + arregloVarSeleccionadasPorIndicesInicial[0][0].substring(0, arregloVarSeleccionadasPorIndicesInicial[0][0].lastIndexOf("[")) + ".splice(" + arregloVarSeleccionadasPorIndicesInicial[0][0].substring(arregloVarSeleccionadasPorIndicesInicial[0][0].lastIndexOf("[")) + ", 1, arregloAInsertarNuevo[i])");
                    } else {
                      eval("copyFormula" + arregloVarSeleccionadasPorIndicesInicial[0][0].substring(0, arregloVarSeleccionadasPorIndicesInicial[0][0].lastIndexOf("[")) + ".splice(" + arregloVarSeleccionadasPorIndicesInicial[0][0].substring(arregloVarSeleccionadasPorIndicesInicial[0][0].lastIndexOf("[")) + ", 0, arregloAInsertarNuevo[i])");
                    }
                  }

                  ;
                  this.agregarFormulaAnchuraYAltura(copyFormula, true);
                  this.setState({
                    operaciones: [],
                    formula: copyFormula
                  });
                } else {
                  alert("la variable seleccionada debe ser del numerador");
                }
              } else if (arregloVarSeleccionadasPorIndicesInicial[0].length > 1) {
                //SELECCIONO MAS DE UNA VARIABLE
                var variableAEvaluar, posicionAInsertarNuevaDivsion;

                if (indicesVarSeleccionadas[0].split("[").length > 2) {
                  eval("variableAEvaluar = this.state.formula" + indicesVarSeleccionadas[0].substring(0, indicesVarSeleccionadas[0].lastIndexOf(".")));
                  posicionAInsertarNuevaDivsion = indicesVarSeleccionadas[0].substring(0, indicesVarSeleccionadas[0].lastIndexOf("."));
                } else {
                  if (indicesVarSeleccionadas[0].lastIndexOf(".") != -1) {
                    eval("variableAEvaluar = this.state.formula" + indicesVarSeleccionadas[0].substring(0, indicesVarSeleccionadas[0].lastIndexOf(".")));
                    posicionAInsertarNuevaDivsion = indicesVarSeleccionadas[0];
                  } else {
                    eval("variableAEvaluar = this.state.formula" + indicesVarSeleccionadas[0]);
                    posicionAInsertarNuevaDivsion = indicesVarSeleccionadas[0];
                  }
                }

                seleccionValidaVarDivision = true;
                this.verificarSeleccionoTodosDivision(variableAEvaluar.valor);

                if (seleccionValidaVarDivision) {
                  var arregloAInsertarNuevo = [],
                      divisionAInsertar;

                  if (variableAEvaluar.tipo.localeCompare("contenedorDivision") == 0) {
                    var copiaAntiguaVariable = jQuery.extend(true, {}, variableAEvaluar);
                    var indIzquierdo = {
                      valor: "\\\\",
                      width: "5%",
                      height: "100%",
                      tipo: "indicador",
                      posicion: "izquierda"
                    };
                    var signoDivision = {
                      valor: "division\\\\",
                      width: "100%",
                      height: "2%",
                      tipo: "division\\\\"
                    };
                    var indDerecho = {
                      valor: "\\\\",
                      width: "5%",
                      height: "100%",
                      tipo: "indicador",
                      posicion: "derecha"
                    };
                    var division = {
                      valor: [indIzquierdo, copiaAntiguaVariable, indDerecho, signoDivision, variableSeleccionada],
                      width: "90%",
                      height: "49%",
                      tipo: "contenedorDivision"
                    };
                    divisionAInsertar = division;
                  } else {
                    var copiaAntiguaVariable = jQuery.extend(true, {}, variableAEvaluar);
                    var indIzquierdo = {
                      valor: "\\\\",
                      width: "5%",
                      height: "100%",
                      tipo: "indicador",
                      posicion: "izquierda"
                    };
                    arregloAInsertarNuevo.push(indIzquierdo);
                    var signoDivision = {
                      valor: "division\\\\",
                      width: "100%",
                      height: "2%",
                      tipo: "division\\\\"
                    };
                    var division = {
                      valor: [copiaAntiguaVariable, signoDivision, variableSeleccionada],
                      width: "90%",
                      height: "49%",
                      tipo: "contenedorDivision"
                    };
                    arregloAInsertarNuevo.push(division);
                    var indDerecho = {
                      valor: "\\\\",
                      width: "5%",
                      height: "100%",
                      tipo: "indicador",
                      posicion: "derecha"
                    };
                    arregloAInsertarNuevo.push(indDerecho);
                    divisionAInsertar = arregloAInsertarNuevo;
                  }

                  var copyFormula = _toConsumableArray(this.state.formula);

                  if (posicionAInsertarNuevaDivsion.split("[").length > 2) {
                    var pos1 = posicionAInsertarNuevaDivsion.substring(posicionAInsertarNuevaDivsion.lastIndexOf("[") + 1);
                    var pos2 = pos1.substring(0, pos1.lastIndexOf("]"));
                    eval("copyFormula" + posicionAInsertarNuevaDivsion.substring(0, posicionAInsertarNuevaDivsion.lastIndexOf("[")) + ".splice(" + pos2 + ", 1, divisionAInsertar)");
                  } else {
                    eval("copyFormula" + posicionAInsertarNuevaDivsion.substring(0, posicionAInsertarNuevaDivsion.lastIndexOf("[")) + ".splice(" + posicionAInsertarNuevaDivsion.substring(0, posicionAInsertarNuevaDivsion.lastIndexOf(".")) + ", 1, divisionAInsertar)");
                  } //copyFormula[posicionAInsertarNuevaDivsion] = divisionAInsertar;
                  //eval("copyFormula["+posicionAInsertarNuevaDivsion+"] = divisionAInsertar");


                  identificadorIndicador = 0;
                  this.agregarFormulaAnchuraYAltura(copyFormula, true);
                  this.setState({
                    operaciones: [],
                    formula: copyFormula
                  });
                } else {
                  alert("Selección de división invalida. Falta selección de numerador.");
                }
              }
            } //actualizando campos de variables a mostrar segun el campo que se acaba de agregar


            if (variableSeleccionada.esFuenteDato) {
              //solo mostrar campos que sean de conexiones tabla
              var arregloConexionesTemp = [],
                  arregloCamposConexionesTemp = [];

              for (var i = 0; i < tablasOriginales.length; i++) {
                if (tablasOriginales[i].ID == variableSeleccionada.tablaID) {
                  arregloConexionesTemp.push(tablasOriginales[i]);

                  for (var j = 0; j < camposTablasOriginales[i].length; j++) {
                    if (arregloCamposConexionesTemp[arregloConexionesTemp.length - 1] == undefined) arregloCamposConexionesTemp[arregloConexionesTemp.length - 1] = [];

                    if (tipoOriginal.localeCompare("int") == 0 || tipoOriginal.localeCompare("decimal") == 0) {
                      if (camposTablasOriginales[i][j].tipo.localeCompare("int") == 0 || camposTablasOriginales[i][j].tipo.localeCompare("decimal") == 0) arregloCamposConexionesTemp[arregloConexionesTemp.length - 1].push(camposTablasOriginales[i][j]);
                    } else {
                      if (camposTablasOriginales[i][j].tipo.localeCompare(tipoOriginal) == 0) arregloCamposConexionesTemp[arregloConexionesTemp.length - 1].push(camposTablasOriginales[i][j]);
                    }
                  }

                  ;
                  break;
                }
              }

              ;
              this.setState({
                tablas: arregloConexionesTemp,
                camposTablas: arregloCamposConexionesTemp,
                variablesEscalares: [],
                variables: [],
                camposVariables: [],
                variablesSQL: [],
                camposVariablesSQL: []
              });
            } else {
              if (variableSeleccionada.esObjeto) {
                var arregloVariablesTemp = [],
                    arregloCamposVariablesTemp = [];

                for (var i = 0; i < variablesOriginales.length; i++) {
                  if (variablesOriginales[i].ID == variableSeleccionada.variableID) {
                    arregloVariablesTemp.push(variablesOriginales[i]);

                    for (var j = 0; j < camposVariablesOriginales[i].length; j++) {
                      if (arregloCamposVariablesTemp[arregloVariablesTemp.length - 1] == undefined) arregloCamposVariablesTemp[arregloVariablesTemp.length - 1] = [];

                      if (tipoOriginal.localeCompare("int") == 0 || tipoOriginal.localeCompare("decimal") == 0) {
                        if (camposVariablesOriginales[i][j].tipo.localeCompare("int") == 0 || camposVariablesOriginales[i][j].tipo.localeCompare("decimal") == 0) arregloCamposVariablesTemp[arregloVariablesTemp.length - 1].push(camposVariablesOriginales[i][j]);
                      } else {
                        if (camposVariablesOriginales[i][j].tipo.localeCompare(tipoOriginal) == 0) arregloCamposVariablesTemp[arregloVariablesTemp.length - 1].push(camposVariablesOriginales[i][j]);
                      }
                    }

                    ;
                    break;
                  }
                }

                ;
                this.setState({
                  tablas: [],
                  camposTablas: [],
                  variablesEscalares: variablesEscalaresOriginales,
                  variables: arregloVariablesTemp,
                  camposVariables: arregloCamposVariablesTemp,
                  variablesSQL: [],
                  camposVariablesSQL: []
                });
              } else if (variableSeleccionada.esInstruccionSQL) {
                var arregloVariablesSQLTemp = [],
                    arregloCamposVariablesSQLTemp = [];

                for (var i = 0; i < variablesOriginalesSQL.length; i++) {
                  if (variablesOriginalesSQL[i].ID == variableSeleccionada.variableID) {
                    arregloVariablesSQLTemp.push(variablesOriginalesSQL[i]);

                    for (var j = 0; j < camposVariablesOriginalesSQL[i].length; j++) {
                      if (arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length - 1] == undefined) arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length - 1] = [];

                      if (tipoOriginal.localeCompare("int") == 0 || tipoOriginal.localeCompare("decimal") == 0) {
                        if (camposVariablesOriginalesSQL[i][j].tipo.localeCompare("int") == 0 || camposVariablesOriginalesSQL[i][j].tipo.localeCompare("decimal") == 0) arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length - 1].push(camposVariablesOriginalesSQL[i][j]);
                      } else {
                        if (camposVariablesOriginalesSQL[i][j].tipo.localeCompare(tipoOriginal) == 0) arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length - 1].push(camposVariablesOriginalesSQL[i][j]);
                      }
                    }

                    ;
                    break;
                  }
                }

                ;
                this.setState({
                  tablas: [],
                  camposTablas: [],
                  variablesEscalares: variablesEscalaresOriginales,
                  variables: [],
                  camposVariables: [],
                  variablesSQL: arregloVariablesSQLTemp,
                  camposVariablesSQL: arregloCamposVariablesSQLTemp
                });
              } else {
                this.setState({
                  tablas: [],
                  camposTablas: [],
                  variablesEscalares: this.state.variablesEscalares,
                  variables: this.state.variables,
                  camposVariables: this.state.camposVariables,
                  variablesSQL: this.state.variablesSQL,
                  camposVariablesSQL: this.state.camposVariablesSQL
                });
              }
            } //FIN actualizando campos de variables a mostrar segun el campo que se acaba de agregar

          }
        } else if (!$("div").hasClass("colorPunteroFormula")) {
          alert("Seleccione una posición en la fórmula.");
        } else if (this.state.formula.length > 0 && $("div").hasClass("colorPunteroFormula") && operacionSeleccionada.valor == undefined) {
          alert("Seleccione una operación.");
        }
      } else {
        alert("Seleccione un campo");
      }
    }
  }, {
    key: "verificarSeleccionoTodosDivision",
    value: function verificarSeleccionoTodosDivision(arreglo) {
      //se verifica que todas las variables esten seleccionadas que esten en el denominador, y tofas las vars de los numeradores
      if (seleccionValidaVarDivision) {
        for (var i = 0; i < arreglo.length; i++) {
          if (!Array.isArray(arreglo[i].valor)) {
            if (arreglo[i].tipo.localeCompare("variable") == 0 && !arreglo[i].activa) {
              seleccionValidaVarDivision = false;
              return;
            }
          }
        }

        ;

        for (var i = 0; i < arreglo.length; i++) {
          if (Array.isArray(arreglo[i].valor)) {
            this.verificarSeleccionoTodosDivision(arreglo[i].valor);
          }
        }

        ;
      } else {
        return;
      }
    }
  }, {
    key: "crearArregloDeFormula",
    value: function crearArregloDeFormula() {
      if (this.props.esEditarVar && banderaCargaVariablesINICIO == banderaCargaVariablesFIN) {
        var nuevoArregloFormula = [];
        this.crearObjetosDeArregloDeFormula(nuevoArregloFormula, 0, this.props.formulaSeleccionadaEdit.formula, "arregloRef", this.props.formulaSeleccionadaEdit.formula.length);
        this.agregarFormulaAnchuraYAltura(nuevoArregloFormula, true);
        this.setState({
          formula: nuevoArregloFormula
        });
      }
    }
  }, {
    key: "crearObjetosDeArregloDeFormula",
    value: function crearObjetosDeArregloDeFormula(arregloRef, index, formula, arreglo, ultimoIndice, esArregloOrig) {
      var esArreglo = esArregloOrig;

      for (var i = index; i < formula.length; i++) {
        if (i <= ultimoIndice) {
          if (formula.charAt(i).localeCompare('(') == 0
          /* && !this.props.esEditarVar*/
          ) {
              //var copiaAntiguaVariable = jQuery.extend(true, {}, variableAEvaluar);
              var indIzquierdo = {
                valor: "\\\\",
                width: "5%",
                height: "100%",
                tipo: "indicador",
                posicion: "izquierda"
              };
              eval(arreglo + ".push(indIzquierdo)");
              var division = {
                valor: [],
                width: "90%",
                height: "49%",
                tipo: "contenedorDivision"
              };
              eval(arreglo + ".push(division)");
              var posIndex = eval(arreglo + ".length-1");
              var cierreParentesis = this.encontrarCierreParentesis(i, formula);
              this.crearObjetosDeArregloDeFormula(arregloRef, i + 1, formula, arreglo + "[" + posIndex + "].valor", cierreParentesis);
              i += cierreParentesis - 1;
              /*arreglo.push(indIzquierdo);
              var signoDivision = {valor: "division\\\\", width: "100%", height: "2%", tipo: "division\\\\"};
              var division = {valor: [], width: "90%", height: "49%", tipo: "contenedorDivision"};
              arreglo.push(division);
              var indDerecho = {valor: "\\\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"};
              arreglo.push(indDerecho);
              this.crearObjetosDeArregloDeFormula(arreglo[arreglo.length-2].valor, (i+1), formula);
              var cierreParentesis = this.encontrarCierreParentesis(i, formula);
              i += cierreParentesis;*/
            } else if (formula.charAt(i).localeCompare("/") == 0) {
            var signoDivision = {
              valor: "division\\\\",
              width: "100%",
              height: "2%",
              tipo: "division\\\\"
            };
            eval(arreglo + ".push(signoDivision)"); //arreglo.push(signoDivision);
          } else if (this.esOperacionAritmetica(formula.charAt(i))) {
            var objeto = {
              valor: formula.charAt(i),
              operacion: formula.charAt(i),
              activa: false,
              esFuenteDato: false,
              esObjeto: false,
              esInstruccionSQL: false,
              tipo: "signo"
            };
            eval(arreglo + ".push(objeto)"); //arreglo.push(objeto);
          } else if (this.esOperacionCompleja(formula, i)) {
            var operacion = this.getPalabraFormula(formula, i);
            var cierreParentesis = this.encontrarCierreParentesis(i + operacion.length + 1, formula);
            var nombre = this.getPalabraFormula(formula, i + operacion.length + 1);
            eval(arreglo + ".push({valor: nombre, operacion: operacion, activa: false, esFuenteDato: false, esObjeto: false, esInstruccionSQL: false, tipo: 'variable'})"); //arreglo.push({valor: nombre});

            i += i + operacion.length + 1 + (cierreParentesis - 1);
          } else if (this.esVariable(formula, i) !== false && formula.charAt(i).localeCompare(')') != 0) {
            var variable = this.esVariable(formula, i);
            var operacion = 'FORMULA',
                texto = variable.valor;
            if (this.props.esOperacionSQL) operacion = this.props.operacionSQL;

            if (this.props.esOperacionSQL && this.exitseCodigoOperacion(this.props.operacionSQL)) {
              texto = this.retornarCodigoOperacion(this.props.operacionSQL) + "(" + variableSeleccionada.valor + ")";
              operacion = this.retornarCodigoOperacion(this.props.operacionSQL);
            }

            if (this.props.esOperacionSQL && this.props.operacionSQL.localeCompare('ASIG') == 0) {
              //cuando se agrega campo a formula para crear operacion ASIG
              operacion = 'ASIG';
              texto = variable.valor;
            }

            var objeto = {
              valor: variable.valor,
              operacion: operacion,
              tipo: "variable",
              activa: false,
              esFuenteDato: false,
              esObjeto: false,
              esInstruccionSQL: false,
              nivel: variable.nivel,
              texto: texto,
              tipoOriginal: variable.tipo
            };
            eval(arreglo + ".push(objeto)"); //arreglo.push(objeto);

            i += variable.valor.length - 1;
          } else if ((!isNaN(this.getPalabraFormula(formula, i)) || isNaN(this.getPalabraFormula(formula, i))) && formula.charAt(i).localeCompare(')') != 0) {
            var variable = this.getPalabraFormula(formula, i);
            var operacion = 'FORMULA',
                texto = variable;
            if (this.props.esOperacionSQL) operacion = this.props.operacionSQL;

            if (this.props.esOperacionSQL && this.exitseCodigoOperacion(this.props.operacionSQL)) {
              texto = this.retornarCodigoOperacion(this.props.operacionSQL) + "(" + variableSeleccionada.valor + ")";
              operacion = this.retornarCodigoOperacion(this.props.operacionSQL);
            }

            if (this.props.esOperacionSQL && this.props.operacionSQL.localeCompare('ASIG') == 0) {
              //cuando se agrega campo a formula para crear operacion ASIG
              operacion = 'ASIG';
              texto = variable;
            }

            var tipo;
            if (!isNaN(this.getPalabraFormula(formula, i))) tipo = 'decimal';else tipo = 'varchar';
            var objeto = {
              valor: variable,
              operacion: operacion,
              tipo: "variable",
              activa: false,
              esFuenteDato: false,
              esObjeto: false,
              esInstruccionSQL: false,
              nivel: 0,
              texto: texto,
              tipoOriginal: tipo
            };
            eval(arreglo + ".push(objeto)");
            i += variable.toString().length;
          } else if (formula.charAt(i).localeCompare(')') == 0) {
            var indDerecho = {
              valor: "\\\\",
              width: "5%",
              height: "100%",
              tipo: "indicador",
              posicion: "derecha"
            };
            eval(arreglo + ".push(indDerecho)");
          }
        }
      }

      ;
    }
  }, {
    key: "encontrarCierreParentesis",
    value: function encontrarCierreParentesis(index, formula) {
      var count = 0,
          contadorPar = 0;

      for (var i = index; i < formula.length; i++) {
        if (formula.charAt(i).localeCompare('(') == 0) {
          contadorPar++;
        }

        if (formula.charAt(i).localeCompare(')') == 0) {
          contadorPar--;
        }

        if (formula.charAt(i).localeCompare(')') == 0 && contadorPar == 0) {
          return count;
        } else {
          count++;
        }
      }

      return count;
    }
  }, {
    key: "esOperacionAritmetica",
    value: function esOperacionAritmetica(caracter) {
      if (caracter != undefined) {
        if (caracter.localeCompare('+') == 0) {
          return true;
        } else if (caracter.localeCompare('-') == 0) {
          return true;
        } else if (caracter.localeCompare('/') == 0) {
          return true;
        } else if (caracter.localeCompare('*') == 0) {
          return true;
        } else if (caracter.localeCompare('x') == 0) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "esOperacionCompleja",
    value: function esOperacionCompleja(formula, posicionCaracter) {
      var palabra = this.getPalabraFormula(formula, posicionCaracter);

      if (palabra.localeCompare('RAND') == 0) {
        return true;
      } else if (palabra.localeCompare('DIA') == 0) {
        return true;
      } else if (palabra.localeCompare('AVERAJE') == 0) {
        return true;
      } else if (palabra.localeCompare('MEDIA') == 0) {
        return true;
      } else if (palabra.localeCompare('ASIG') == 0) {
        return true;
      } else if (palabra.localeCompare('COUNT') == 0) {
        return true;
      } else if (palabra.localeCompare('PROM') == 0) {
        return true;
      } else if (palabra.localeCompare('MAX') == 0) {
        return true;
      } else if (palabra.localeCompare('MIN') == 0) {
        return true;
      } else if (palabra.localeCompare('AUTOSUM') == 0) {
        return true;
      } else if (palabra.localeCompare('SUM') == 0) {
        return true;
      } else if (palabra.localeCompare('DATE') == 0) {
        return true;
      } else if (palabra.localeCompare('MONTH') == 0) {
        return true;
      } else if (palabra.localeCompare('YEAR') == 0) {
        return true;
      }

      return false;
    }
  }, {
    key: "getPalabraFormula",
    value: function getPalabraFormula(formula, posicionCaracter) {
      var variable = '';

      for (var i = posicionCaracter; i < formula.length; i++) {
        if (formula.charAt(i) != "(" && formula.charAt(i) != ")" && formula.charAt(i) != "\\" && formula.charAt(i) != "/" && formula.charAt(i) != "*" && formula.charAt(i) != "[" && formula.charAt(i) != "√" && formula.charAt(i) != "+" && formula.charAt(i) != "-") variable += formula[i];else return variable;
      }

      ;
      return variable;
    }
  }, {
    key: "esVariable",
    value: function esVariable(formula, posicionCaracter) {
      var palabra = this.getPalabraFormula(formula, posicionCaracter);

      for (var i = 0; i < tablasOriginales.length; i++) {
        for (var j = 0; j < camposTablasOriginales[i].length; j++) {
          if (camposTablasOriginales[i][j].valor.localeCompare(palabra) == 0) {
            return camposTablasOriginales[i][j];
          }
        }

        ;
      }

      ;

      for (var i = 0; i < variablesEscalaresOriginales.length; i++) {
        if (variablesEscalaresOriginales[i].valor.localeCompare(palabra) == 0) {
          return variablesEscalaresOriginales[i];
        }
      }

      ;

      for (var i = 0; i < variablesOriginales.length; i++) {
        for (var j = 0; j < camposVariablesOriginales[i].length; j++) {
          if (camposVariablesOriginales[i][j].valor.localeCompare(palabra) == 0) {
            return camposVariablesOriginales[i][j];
          }
        }

        ;
      }

      ;

      for (var i = 0; i < excelOriginales.length; i++) {
        for (var j = 0; j < camposExcelOriginales[i].length; j++) {
          if (camposExcelOriginales[i][j].valor.localeCompare(palabra) == 0) {
            return camposExcelOriginales[i][j];
          }
        }

        ;
      }

      ;

      for (var i = 0; i < formasOriginales.length; i++) {
        if (formasOriginales[i].valor.localeCompare(palabra) == 0) {
          return formasOriginales[i];
        }
      }

      ;

      for (var i = 0; i < variablesOriginalesSQL.length; i++) {
        for (var j = 0; j < camposVariablesOriginalesSQL[i].length; j++) {
          if (camposVariablesOriginalesSQL[i][j].valor.localeCompare(palabra) == 0) {
            return camposVariablesOriginalesSQL[i][j];
          }
        }

        ;
      }

      ;
      return false;
    }
  }, {
    key: "agregarFormulaAnchuraYAltura",
    value: function agregarFormulaAnchuraYAltura(arregloFormula, esIndiceCero) {
      var contadorIndicadoresNumerador = 0,
          contadorIndicadoresDenominador = 0,
          contadorSignosNumerador = 0,
          contadorSignosDenominador = 0,
          contadorVariablesNumerador = 0,
          contadorVariablesDenominador = 0,
          esDespuesDivision = false;

      for (var i = 0; i < arregloFormula.length; i++) {
        if (!Array.isArray(arregloFormula[i].valor) && this.esOperacionAritmetica(arregloFormula[i].valor.toString())) {
          if (!esDespuesDivision) {
            contadorSignosNumerador++;
          } else {
            contadorSignosDenominador++;
          }
        } else if (!Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.toString().localeCompare("\\\\") != 0 && !this.esOperacionAritmetica(arregloFormula[i].valor.toString()) && arregloFormula[i].valor.toString().localeCompare("division\\\\") != 0 || Array.isArray(arregloFormula[i].valor)) {
          if (!esDespuesDivision) {
            contadorVariablesNumerador++;
          } else {
            contadorVariablesDenominador++;
          }
        } else if (!Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.toString().localeCompare("\\\\") == 0) {
          arregloFormula[i].identificadorIndicador = identificadorIndicador;
          identificadorIndicador++;

          if (!esDespuesDivision) {
            contadorIndicadoresNumerador++;
          } else {
            contadorIndicadoresDenominador++;
          }
        }

        if (!Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.toString().localeCompare("division\\\\") == 0) {
          esDespuesDivision = true;
        }
      }

      ;
      var widthNumerador = 100; //var height = 100;

      var restaTotalIndicadoresNumerador = contadorIndicadoresNumerador * 5;
      widthNumerador -= restaTotalIndicadoresNumerador;
      var restaTotalSignosNumerador = contadorSignosNumerador * 2;
      widthNumerador -= restaTotalSignosNumerador;
      widthNumerador /= contadorVariablesNumerador;
      var widthDenominador = 100;
      var restaTotalIndicadoresDenominador = contadorIndicadoresDenominador * 5;
      widthDenominador -= restaTotalIndicadoresDenominador;
      var restaTotalSignosDenominador = contadorSignosDenominador * 2;
      widthDenominador -= restaTotalSignosDenominador;
      widthDenominador /= contadorVariablesDenominador;
      var esDespuesDivisionWidth = false;

      for (var i = 0; i < arregloFormula.length; i++) {
        if (!Array.isArray(arregloFormula[i].valor) && this.esOperacionAritmetica(arregloFormula[i].valor.toString())) {
          arregloFormula[i].width = "2%";
        } else if (!Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.toString().localeCompare("\\\\") != 0 && !this.esOperacionAritmetica(arregloFormula[i].valor.toString()) && arregloFormula[i].valor.toString().localeCompare("division\\\\") != 0)
          /*|| Array.isArray(arregloFormula[i].valor)*/
          {
            if (!esDespuesDivisionWidth) {
              arregloFormula[i].width = widthNumerador + "%";
            } else {
              arregloFormula[i].width = widthDenominador + "%";
            }
          } else if (!Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.toString().localeCompare("\\\\") == 0) {
          //if(!esIndiceCero) {
          arregloFormula[i].width = "5%";
          /*} else {
              arregloFormula[i].width = (widthNumerador*0.05)+"%";
          }*/
        } else if (Array.isArray(arregloFormula[i].valor)) {
          if (!esIndiceCero) {
            arregloFormula[i].width = "90%";
          } else {
            arregloFormula[i].width = widthNumerador + "%";
          }
        }

        if (!Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.toString().localeCompare("division\\\\") == 0) {
          arregloFormula[i].height = "2%";
        } else if (!Array.isArray(arregloFormula[i].valor)) {
          if (!esIndiceCero) {
            if (esDespuesDivision) arregloFormula[i].height = "49%";else arregloFormula[i].height = "100%";
          } else {
            arregloFormula[i].height = "100%";
          }
        } else if (Array.isArray(arregloFormula[i].valor)) {
          if (!esIndiceCero) {
            if (esDespuesDivision) arregloFormula[i].height = "49%";else arregloFormula[i].height = "100%";
          } else {
            arregloFormula[i].height = "100%";
          }
        }

        if (!Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.toString().localeCompare("division\\\\") == 0) {
          esDespuesDivisionWidth = true;
        }
      }

      ;

      for (var i = 0; i < arregloFormula.length; i++) {
        if (Array.isArray(arregloFormula[i].valor)) {
          this.agregarFormulaAnchuraYAltura(arregloFormula[i].valor, false);
        }
      }
      /*var width = 0, posicionX = 0, posicionY = 0;
      for (var i = 0; i < nuevoArregloFormula.length; i++) {
          if (nuevoArregloFormula[i].length == undefined) {
              //
          }
      };
      this.setState({
          formula: formulaTemp,
          anchuraSeccionFormula: width
      }, console.log(this.state.formula) );*/

    } //esNivelRaiz es bandera para saber si el arreglo que se esta recorriendo es el principal/original nivel 0 del arreglo de formulas

  }, {
    key: "getFormulaAndOperationText",
    value: function getFormulaAndOperationText(arreglo, esNivelRaiz) {
      for (var i = 0; i < arreglo.length; i++) {
        if (arreglo[i].tablaID != undefined || arreglo[i].variableID != undefined || arreglo[i].excelVariableID != undefined || arreglo[i].formaVariableID != undefined || arreglo[i].esValorManual != undefined) {
          if (objetoFormulaParaSacarID.tablaID == undefined && arreglo[i].tablaID != undefined) {
            objetoFormulaParaSacarID.tablaID = arreglo[i].tablaID;
          } else if (objetoFormulaParaSacarID.variableID == undefined && arreglo[i].variableID != undefined || objetoFormulaParaSacarID.variableID != undefined && arreglo[i].variableID != undefined && arreglo[i].esObjeto) {
            objetoFormulaParaSacarID.variableID = arreglo[i].variableID;
            objetoFormulaParaSacarID.variableCampoID = arreglo[i].variableCampoID;
          } else if (objetoFormulaParaSacarID.excelArchivoID == undefined && arreglo[i].excelArchivoID != undefined) {
            objetoFormulaParaSacarID.excelArchivoID = arreglo[i].excelArchivoID;
            objetoFormulaParaSacarID.excelVariableID = arreglo[i].excelVariableID;
          } else if (objetoFormulaParaSacarID.formaVariableID == undefined && arreglo[i].formaVariableID != undefined) {
            objetoFormulaParaSacarID.formaVariableID = arreglo[i].formaVariableID;
          } else if (objetoFormulaParaSacarID.esValorManual == undefined && arreglo[i].esValorManual) {
            objetoFormulaParaSacarID.esValorManual = arreglo[i].esValorManual;
          }
        }

        if (Array.isArray(arreglo[i].valor)) {
          this.getFormulaAndOperationText(arreglo[i].valor, false);
        } else if (!Array.isArray(arreglo[i].valor)) {
          if (arreglo[i].operacion != undefined && arreglo[i].operacion.localeCompare("ASIG") == 0) {
            formulaGuardarFormula += "ASIG(" + arreglo[i].valor + ")";
            operacionGuardarFormula = "ASIG";
          } else if (arreglo[i].operacion != undefined && arreglo[i].operacion.localeCompare("COUNT") == 0) {
            formulaGuardarFormula += "COUNT(" + arreglo[i].valor + ")";
            operacionGuardarFormula = "COUNT";
          } else if (arreglo[i].operacion != undefined && arreglo[i].operacion.localeCompare("PROM") == 0) {
            formulaGuardarFormula += "PROM(" + arreglo[i].valor + ")";
            operacionGuardarFormula = "PROM";
          } else if (arreglo[i].operacion != undefined && arreglo[i].operacion.localeCompare("MAX") == 0) {
            formulaGuardarFormula += "MAX(" + arreglo[i].valor + ")";
            operacionGuardarFormula = "MAX";
          } else if (arreglo[i].operacion != undefined && arreglo[i].operacion.localeCompare("MIN") == 0) {
            formulaGuardarFormula += "MIN(" + arreglo[i].valor + ")";
            operacionGuardarFormula = "MIN";
          } else if (arreglo[i].operacion != undefined && arreglo[i].operacion.localeCompare("AUTOSUM") == 0) {
            formulaGuardarFormula += "AUTOSUM(" + arreglo[i].valor + ")";
            operacionGuardarFormula = "AUTOSUM";
          } else if (arreglo[i].operacion != undefined && arreglo[i].operacion.localeCompare("FORMULA") == 0) {
            if (arreglo[i].valor.toString().localeCompare("\\\\") != 0) {
              if (!esNivelRaiz && i == 0) formulaGuardarFormula += "(";
              formulaGuardarFormula += arreglo[i].valor;
              operacionGuardarFormula = "FORMULA";
            } else if (arreglo[i].valor.toString().localeCompare("\\\\") == 0 && arreglo[i].posicion.localeCompare("derecha") != 0) {
              formulaGuardarFormula += "(";
            }
          } else if (arreglo[i].tipo != undefined && arreglo[i].tipo.localeCompare("signo") == 0) {
            formulaGuardarFormula += arreglo[i].valor;
            operacionGuardarFormula = "FORMULA";
          } else if (arreglo[i].tipo != undefined && arreglo[i].tipo.localeCompare("division\\\\") == 0) {
            formulaGuardarFormula += "/";
            operacionGuardarFormula = "FORMULA";
          }
        }

        if (!esNivelRaiz && i == arreglo.length - 1) formulaGuardarFormula += ")";
      }

      ;
    }
  }, {
    key: "iniciarGuardarFormula",
    value: function iniciarGuardarFormula() {
      formulaGuardarFormula = '';
      operacionGuardarFormula = '';
      objetoFormulaParaSacarID = {};
      this.getFormulaAndOperationText(this.state.formula, true);
      /*for (var i = 0; i < this.state.formula.length; i++) {
          if(this.state.formula[i].operacion != undefined && this.state.formula[i].operacion.localeCompare("ASIG") == 0) {
              formula += "ASIG("+this.state.formula[i].valor+")";
              operacion = "ASIG";
          } else if(this.state.formula[i].operacion != undefined && this.state.formula[i].operacion.localeCompare("COUNT") == 0) {
              formula += "COUNT("+this.state.formula[i].valor+")";
              operacion = "COUNT";
          } else if(this.state.formula[i].operacion != undefined && this.state.formula[i].operacion.localeCompare("PROM") == 0) {
              formula += "PROM("+this.state.formula[i].valor+")";
              operacion = "PROM";
          } else if(this.state.formula[i].operacion != undefined && this.state.formula[i].operacion.localeCompare("MAX") == 0) {
              formula += "MAX("+this.state.formula[i].valor+")";
              operacion = "MAX";
          } else if(this.state.formula[i].operacion != undefined && this.state.formula[i].operacion.localeCompare("MIN") == 0) {
              formula += "MIN("+this.state.formula[i].valor+")";
              operacion = "MIN";
          } else if(this.state.formula[i].operacion != undefined && this.state.formula[i].operacion.localeCompare("AUTOSUM") == 0) {
              formula += "AUTOSUM("+this.state.formula[i].valor+")";
              operacion = "AUTOSUM";
          } else {
              formula += this.state.formula[i].valor;
              operacion = "FORMULA";
          }
      };*/

      var objetoFormula = {
        variableID: -1,
        variableCampoID: -1,
        numeroDeFormulaDeVariable: -1,
        tablaID: -1,
        excelArchivoID: -1,
        excelVariableID: -1,
        formaVariableID: -1,
        formula: formulaGuardarFormula,
        operacion: operacionGuardarFormula,
        esValorManual: false
      };

      if (objetoFormulaParaSacarID.tablaID != undefined) {
        objetoFormula.tablaID = objetoFormulaParaSacarID.tablaID;
      } else if (objetoFormulaParaSacarID.excelArchivoID != undefined) {
        objetoFormula.excelArchivoID = objetoFormulaParaSacarID.excelArchivoID;
        objetoFormula.excelVariableID = objetoFormulaParaSacarID.excelVariableID;
      } else if (objetoFormulaParaSacarID.formaVariableID != undefined) {
        objetoFormula.formaVariableID = objetoFormulaParaSacarID.formaVariableID;
      } else if (objetoFormulaParaSacarID.variableID != undefined) {
        objetoFormula.variableID = objetoFormulaParaSacarID.variableID;
        objetoFormula.variableCampoID = objetoFormulaParaSacarID.variableCampoID;
      } else if (objetoFormulaParaSacarID.esValorManual) {
        objetoFormula.esValorManual = objetoFormulaParaSacarID.esValorManual;
      }
      /*console.log('formula');
      console.log(this.state.formula);*/
      //this.props.anadirFormula(formula, this.state.formula);


      variableSeleccionada = {};
      operacionSeleccionada = {};

      if (!this.props.esEditarVar) {
        this.props.anadirFormula(objetoFormula, this.state.formula);
      } else {
        this.props.modificarFormula(objetoFormula, this.state.formula);
      }

      alert("Fórmula guardada."); //camposTablas={this.state.camposTablas} variables={this.state.variablesEscalares} objetos={this.state.variables} camposDeObjetos={this.state.camposVariables} excel={this.state.excel} camposDeExcel={this.state.camposDeExcel} formas={this.state.formas} variablesSQL={this.state.variablesSQL} camposVariablesSQL={this.state.camposVariablesSQL}
      //this.guardarVariable(formula);
    }
  }, {
    key: "guardarVariable",
    value: function guardarVariable(formula) {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("update " + _this2.props.tablaVarEditar + " set formula = '" + formula + "' where ID = " + _this2.props.idVarEditar, function (err, result) {
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
    key: "actualizarEstadoInputManual",
    value: function actualizarEstadoInputManual(seleccion) {
      seleccionManual = seleccion;
    }
  }, {
    key: "keyupEstadoInputManual",
    value: function keyupEstadoInputManual() {
      var seleccion = $("#valorManual").val();

      if (!isNaN(seleccion) && this.state.formula.length == 0) {
        this.setState({
          operaciones: operacionesNumero
        });
      } else if (!isNaN(seleccion) && this.state.formula.length == 0) {
        this.setState({
          operaciones: operacionesNumero
        });
      } else if (this.isValidDate(new Date(seleccion)) && this.state.formula.length == 0) {
        this.setState({
          operaciones: operacionesFecha
        });
      } else if (!isNaN(seleccion) && seleccion.toString().length > 0 && this.state.formula.length == 0) {
        this.setState({
          operaciones: operacionesCadena
        });
      } else if (!isNaN(seleccion) && this.state.formula.length > 0) {
        this.setState({
          operaciones: operacionesNumeroMasDeUnValor
        });
      } else if (!isNaN(seleccion) && this.state.formula.length > 0) {
        this.setState({
          operaciones: operacionesNumeroMasDeUnValor
        });
      } else if (!isNaN(seleccion) && seleccion.toString().length > 0 && this.state.formula.length > 0) {
        this.setState({
          operaciones: operacionesCadenaMasDeUnValor
        });
      }
    }
  }, {
    key: "isValidDate",
    value: function isValidDate(fecha) {
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
  }, {
    key: "loadTablas",
    value: function loadTablas() {
      var _this3 = this;

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
            }
          } else {
            transaction.commit(function (err) {
              tablasOriginales = result.recordset;
              banderaCargaVariablesFIN += result.recordset.length;

              _this3.setState({
                tablas: result.recordset
              }, _this3.initLoadTablasCampos);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "initLoadTablasCampos",
    value: function initLoadTablasCampos() {
      var arregloTemp = [];

      for (var i = 0; i < this.state.tablas.length; i++) {
        this.loadTablasCampos(this.state.tablas[i].tabla, i, arregloTemp);
      }

      ;
    }
  }, {
    key: "loadTablasCampos",
    value: function loadTablasCampos(nombreTabla, index, array) {
      var _this4 = this;

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
                  esFuenteDato: true,
                  esObjeto: false,
                  esInstruccionSQL: false,
                  tablaID: _this4.state.tablas[index].ID
                });
              }

              ;

              if (array[index] == undefined) {
                array[index] = [];
              }

              array[index] = $.merge(array[index], nombreColumnas);
              camposTablasOriginales = array;

              _this4.setState({
                camposTablas: array
              });

              banderaCargaVariablesINICIO++;

              _this4.crearArregloDeFormula();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "loadScalarVariables",
    value: function loadScalarVariables() {
      var _this5 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Variables where esColeccion = 'false'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              banderaCargaVariablesFIN += result.recordset.length;

              for (var i = 0; i < result.recordset.length; i++) {
                _this5.loadScalarVariablesFields(result.recordset[i]);
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
      var _this6 = this;

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
              var temp = _toConsumableArray(_this6.state.variablesEscalares);

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
              variablesEscalaresOriginales = temp;

              _this6.setState({
                variablesEscalares: variablesEscalaresOriginales
              });

              banderaCargaVariablesINICIO++;

              _this6.crearArregloDeFormula();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "loadVariables",
    value: function loadVariables() {
      var _this7 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Variables where esColeccion = 'true'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              variablesOriginales = result.recordset;
              banderaCargaVariablesFIN += result.recordset.length;

              _this7.setState({
                variables: result.recordset
              }, _this7.initLoadVariablesCampos);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "initLoadVariablesCampos",
    value: function initLoadVariablesCampos() {
      var arregloTemp = [];

      for (var i = 0; i < this.state.variables.length; i++) {
        this.loadVariablesCampos(this.state.variables[i], i, arregloTemp);
      }

      ;
    }
  }, {
    key: "loadVariablesCampos",
    value: function loadVariablesCampos(variable, index, array) {
      var _this8 = this;

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
              var nombreColumnas = [];

              for (var i = 0; i < result.recordset.length; i++) {
                nombreColumnas.push({
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

              if (array[index] == undefined) {
                array[index] = [];
              }

              array[index] = $.merge(array[index], nombreColumnas);
              camposVariablesOriginales = array;

              _this8.setState({
                camposVariables: array
              });

              banderaCargaVariablesINICIO++;

              _this8.crearArregloDeFormula();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "loadVariablesSQL",
    value: function loadVariablesSQL() {
      var _this9 = this;

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
              variablesOriginalesSQL = result.recordset;
              banderaCargaVariablesFIN += result.recordset.length;

              _this9.setState({
                variablesSQL: result.recordset
              }, _this9.initLoadVariablesCamposSQL);
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
      var _this10 = this;

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
              camposVariablesOriginalesSQL = array;

              _this10.setState({
                camposVariablesSQL: array
              });

              banderaCargaVariablesINICIO++;

              _this10.crearArregloDeFormula();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "loadExcel",
    value: function loadExcel() {
      var _this11 = this;

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
              excelOriginales = result.recordset;
              banderaCargaVariablesFIN += result.recordset.length;

              _this11.setState({
                excel: result.recordset
              }, _this11.initLoadExcelCampos);
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
      var _this12 = this;

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
              camposExcelOriginales = array;

              _this12.setState({
                camposDeExcel: array
              });

              banderaCargaVariablesINICIO++;

              _this12.crearArregloDeFormula();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "loadFormas",
    value: function loadFormas() {
      var _this13 = this;

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
              formasOriginales = nombreColumnas;

              _this13.setState({
                formas: nombreColumnas
              });

              banderaCargaVariablesINICIO++;
              banderaCargaVariablesFIN++;

              _this13.crearArregloDeFormula();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, this.props.navbar, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("div", {
        className: "border-top border-bottom",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "font-20",
        style: _defineProperty({
          height: "45vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e6e6f2",
          color: "black",
          overflowWrap: "break-word",
          wordWrap: "break-word",
          whiteSpace: "-moz-pre-wrap"
        }, "whiteSpace", "pre-wrap")
      }, _react["default"].createElement(_Equacion["default"], {
        formula: this.state.formula,
        clickEnFormula: this.clickEnFormula,
        height: "100%",
        width: "100%",
        isFirstRow: true,
        posicionEnArreglo: "0"
      }))), _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "250px"
        }
      }, _react["default"].createElement("div", {
        style: {
          width: "50%",
          height: "100%",
          "float": "left",
          borderRight: "1px solid black",
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
          padding: "0% 1%",
          overflowY: "scroll"
        }
      }, _react["default"].createElement("div", {
        className: "font-18",
        style: {
          width: "100%",
          height: "20%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, "Seleccionar Variable"), _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "100%"
        }
      }, _react["default"].createElement(_ListasSeleVariableContenedorVariable["default"], {
        esOperacion: false,
        mostrarRosa: true,
        tablas: this.state.tablas,
        camposTablas: this.state.camposTablas,
        variables: this.state.variablesEscalares,
        objetos: this.state.variables,
        camposDeObjetos: this.state.camposVariables,
        excel: this.state.excel,
        camposDeExcel: this.state.camposDeExcel,
        formas: this.state.formas,
        variablesSQL: this.state.variablesSQL,
        camposVariablesSQL: this.state.camposVariablesSQL,
        seleccionarMultiple: false,
        retornoSeleccionVariable: this.retornoSeleccionCampo,
        returnStateManualValue: this.actualizarEstadoInputManual,
        keyupEstadoInputManual: this.keyupEstadoInputManual
      }))), _react["default"].createElement("div", {
        style: {
          width: "50%",
          height: "100%",
          "float": "right",
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
          padding: "0% 1%",
          overflowY: "scroll"
        }
      }, _react["default"].createElement("div", {
        className: "font-18",
        style: {
          width: "100%",
          height: "20%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, "Seleccionar Operacion"), _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "100%"
        }
      }, _react["default"].createElement(_ListasSeleVariableContenedorOperador["default"], {
        esOperacion: true,
        mostrarRosa: false,
        operaciones: this.state.operaciones,
        seleccionarMultiple: false,
        retornoSeleccionVariable: this.retornoSeleccionOperacion
      })))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "text-center",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-primary active",
        onClick: this.agregarAFormula
      }, "Agregar F\xF3rmula")), _react["default"].createElement("br", null))))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("a", {
        className: "btn btn-success btn-block btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: this.iniciarGuardarFormula
      }, "Guardar F\xF3rmula")), _react["default"].createElement("br", null));
    }
  }]);

  return Formula;
}(_react["default"].Component);

exports["default"] = Formula;
//# sourceMappingURL=Formula.js.map
