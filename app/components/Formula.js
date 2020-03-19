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
}, {
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
}, {
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
    camposVariablesOriginales = [];
var variableSeleccionada = [],
    operacionSeleccionada = [],
    posicionDeIndicadorSeleccionadoEnFormula = '',
    posicionIndicador = '';
/*var arrregloPrueba = [  {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"},
                        {valor: [{valor: "a", width: "100%", height: "49%", tipo: "variable"},
                            {valor: "division\\", width: "100%", height: "2%", tipo: "division\\"},
                            {valor: "b", width: "100%", height: "49%", tipo: "variable"}],
                        width: "90%", height: "100%", tipo: "contenedorDivision"},
                        {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"}];
X = (SALDOS_MAYO)/(CLIENTES_RIESGOS)    |     (SONDEO_FINAL)/((CLIENTES_RIESGOS+FINALES_X)-B)
INPUT: NOMBRE VARIABLE, CADA TECLA SE METE A ARREGLO A MOSTRAR, QUE ES INPUT EN MAYUSCULA SI ES LETRA, CADA ESPACIO ES _*/
//var arrregloPrueba = [{valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"}, {valor: [{valor: "a", width: "49%", height: "49%", tipo: "variable"}, {valor: "-", width: "2%", height: "49%", tipo: "signo"}, {valor: "m", width: "49%", height: "49%", tipo: "variable"}, {valor: "division\\", width: "100%", height: "2%", tipo: "division\\"}, {valor: "b", width: "100%", height: "49%", tipo: "variable"}], width: "90%", height: "100%", tipo: "contenedorDivision"}, {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"}];
//var arrregloPrueba = [{valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"}, {valor: [{valor: "a", width: "49%", height: "49%", tipo: "variable"}, {valor: "-", width: "2%", height: "49%", tipo: "signo"}, {valor: "m", width: "49%", height: "49%", tipo: "variable"}, {valor: "division\\", width: "100%", height: "2%", tipo: "division\\"}, {valor: "b", width: "32%", height: "49%", tipo: "variable"}, {valor: "+", width: "2%", height: "49%", tipo: "signo"}, {valor: "zsasasas", width: "32%", height: "49%", tipo: "variable"}, {valor: "*", width: "2%", height: "49%", tipo: "signo"}, {valor: "d", width: "32%", height: "49%", tipo: "variable"}], width: "90%", height: "100%", tipo: "contenedorDivision"}, {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"}];
//var arrregloPrueba = [{valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"}, {valor: "a", width: "90%", height: "100%", tipo: "variable"}, {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"}];

/*var arrregloPrueba = [{valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"}, 
                        {valor: [{valor: "a", width: "44%", height: "49%", tipo: "variable"},
                            {valor: "-", width: "2%", height: "49%", tipo: "signo"},
                            {valor: "\\", width: "5%", height: "49%", tipo: "indicador", posicion: "izquierda"},
                            {valor: [{valor: "saldo", width: "100%", height: "49%", tipo: "variable"},
                                {valor: "division\\", width: "100%", height: "2%", tipo: "division\\"},
                                {valor: "local", width: "100%", height: "49%", tipo: "variable"}]
                            , width: "44%", height: "49%", tipo: "contenedorDivision"},
                            {valor: "\\", width: "5%", height: "49%", tipo: "indicador", posicion: "derecha"},
                            {valor: "division\\", width: "100%", height: "2%", tipo: "division\\"},
                            {valor: "b", width: "100%", height: "49%", tipo: "variable"}]
                        , width: "90%", height: "100%", tipo: "contenedorDivision"},
                        {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"}];*/

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
      operaciones: operacionesCadena
    };
    _this.clickEnFormula = _this.clickEnFormula.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionCampo = _this.retornoSeleccionCampo.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionOperacion = _this.retornoSeleccionOperacion.bind(_assertThisInitialized(_this));
    _this.existeReglaAsignacion = _this.existeReglaAsignacion.bind(_assertThisInitialized(_this));
    _this.retornarCodigoOperacion = _this.retornarCodigoOperacion.bind(_assertThisInitialized(_this));
    _this.agregarAFormula = _this.agregarAFormula.bind(_assertThisInitialized(_this));
    _this.updateFormulaState = _this.updateFormulaState.bind(_assertThisInitialized(_this));
    _this.getFormula = _this.getFormula.bind(_assertThisInitialized(_this));
    _this.crearArregloDeFormula = _this.crearArregloDeFormula.bind(_assertThisInitialized(_this));
    _this.esOperacionAritmetica = _this.esOperacionAritmetica.bind(_assertThisInitialized(_this));
    _this.esOperacionCompleja = _this.esOperacionCompleja.bind(_assertThisInitialized(_this));
    _this.getPalabraFormula = _this.getPalabraFormula.bind(_assertThisInitialized(_this));
    _this.agregarFormulaAnchuraYAltura = _this.agregarFormulaAnchuraYAltura.bind(_assertThisInitialized(_this));
    _this.findVariableInFormula = _this.findVariableInFormula.bind(_assertThisInitialized(_this));
    _this.iniciarGuardarFormula = _this.iniciarGuardarFormula.bind(_assertThisInitialized(_this));
    _this.guardarVariable = _this.guardarVariable.bind(_assertThisInitialized(_this));
    _this.loadTablas = _this.loadTablas.bind(_assertThisInitialized(_this));
    _this.initLoadTablasCampos = _this.initLoadTablasCampos.bind(_assertThisInitialized(_this));
    _this.loadTablasCampos = _this.loadTablasCampos.bind(_assertThisInitialized(_this));
    _this.loadScalarVariables = _this.loadScalarVariables.bind(_assertThisInitialized(_this));
    _this.loadScalarVariablesFields = _this.loadScalarVariablesFields.bind(_assertThisInitialized(_this));
    _this.loadVariables = _this.loadVariables.bind(_assertThisInitialized(_this));
    _this.initLoadVariablesCampos = _this.initLoadVariablesCampos.bind(_assertThisInitialized(_this));
    _this.loadVariablesCampos = _this.loadVariablesCampos.bind(_assertThisInitialized(_this));
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
    }
  }, {
    key: "findVariableInFormula",
    value: function findVariableInFormula(arreglo, variable, posicionEnArreglo) {
      for (var i = 0; i < arreglo.length; i++) {
        if (!Array.isArray(arreglo[i].valor) && arreglo[i].valor.localeCompare(variable) == 0) {
          posicionDeIndicadorSeleccionadoEnFormula = posicionEnArreglo + '[' + i + ']';
        } else if (Array.isArray(arreglo[i].valor)) {
          this.findVariableInFormula(arreglo[i].valor, variable, posicionEnArreglo + '[' + i + '].valor');
        }
      }

      ;
    }
  }, {
    key: "clickEnFormula",
    value: function clickEnFormula(e, posicion, nombre, index) {
      /*e.stopPropagation()
      console.log(e)
      console.log(e.target.className);
      var test = (e.clientX-this.offsetLeft) / this.offsetWidth * 100;
      var test1 = e.clientX;
      var test2 = e.offsetX;
      var elm = $(this);
      console.log(test);
      console.log(test1);
      console.log(test2);
      console.log(elm);
      var node = ReactDOM.findDOMNode(this);
      console.log(window.getComputedStyle(node).offset);
      console.log(node.getBoundingClientRect());
      var nueva = e.nativeEvent.offsetY;
      console.log('nueva');
      console.log(nueva);*/
      for (var i = 0; i < this.state.formula.length; i++) {
        $("#indicadorIzquierda" + this.state.formula[i].valor + i).removeClass("colorPunteroFormula");
        $("#indicadorIzquierda" + this.state.formula[i].valor + i).removeClass("blink");
        $("#indicadorIzquierda" + this.state.formula[i].valor + i).addClass("highlightFormulaBackground");
        $("#indicadorDerecha" + this.state.formula[i].valor + i).removeClass("colorPunteroFormula");
        $("#indicadorDerecha" + this.state.formula[i].valor + i).removeClass("blink");
        $("#indicadorDerecha" + this.state.formula[i].valor + i).addClass("highlightFormulaBackground");
      }

      ;

      if (posicion == null) {
        posicionIndicador = '';
        this.findVariableInFormula(this.state.formula, nombre, '');

        var temp = _toConsumableArray(this.state.formula);

        var tempVar;
        eval("tempVar = temp" + posicionDeIndicadorSeleccionadoEnFormula);
        tempVar.activa = !tempVar.activa;
        temp.splice(index, 1, tempVar);
        this.setState({
          formula: temp
        }, console.log(this.state.formula));
      } else if (posicion.localeCompare("izquierda") == 0) {
        console.log('2');
        posicionIndicador = 'izquierda';
        $("#indicadorIzquierda" + nombre + index).addClass("colorPunteroFormula");
        $("#indicadorIzquierda" + nombre + index).addClass("blink");
        $("#indicadorIzquierda" + nombre + index).removeClass("highlightFormulaBackground");
        this.findVariableInFormula(this.state.formula, nombre, '');
      } else if (posicion.localeCompare("derecha") == 0) {
        console.log('3');
        posicionIndicador = 'derecha';
        $("#indicadorDerecha" + nombre + index).addClass("colorPunteroFormula");
        $("#indicadorDerecha" + nombre + index).addClass("blink");
        $("#indicadorDerecha" + nombre + index).removeClass("highlightFormulaBackground");
        this.findVariableInFormula(this.state.formula, nombre, '');
      } else if (posicion.localeCompare("empty") == 0) {
        if ($("#indicadorFormulaVacia").hasClass("colorPunteroFormula")) {
          $("#indicadorFormulaVacia").removeClass("blink");
          $("#indicadorFormulaVacia").removeClass("colorPunteroFormula");
        } else {
          $("#indicadorFormulaVacia").addClass("blink");
          $("#indicadorFormulaVacia").addClass("colorPunteroFormula");
        }
      }
    }
  }, {
    key: "retornoSeleccionCampo",
    value: function retornoSeleccionCampo(esOperacion, variable, posicionTabla) {
      if (variable[0].valor.length > 0) {
        var columnaSeleccionada = variable[0];
        variableSeleccionada = variable[0];
        console.log('variableSeleccionada');
        console.log(variableSeleccionada);
        var tipoVariable = '';

        if (columnaSeleccionada.tipo.localeCompare("int") == 0) {
          tipoVariable = 'int';
          this.setState({
            operaciones: operacionesNumero
          });
        } else if (columnaSeleccionada.tipo.localeCompare("decimal") == 0) {
          tipoVariable = 'decimal';
          this.setState({
            operaciones: operacionesNumero
          });
        } else if (columnaSeleccionada.tipo.localeCompare("varchar") == 0) {
          tipoVariable = 'varchar';
          this.setState({
            operaciones: operacionesCadena
          });
        } else if (columnaSeleccionada.tipo.localeCompare("date") == 0) {
          tipoVariable = 'date';
          this.setState({
            operaciones: operacionesFecha
          });
        } else if (columnaSeleccionada.tipo.localeCompare("bit") == 0) {
          tipoVariable = 'bit';
          this.setState({
            operaciones: operacionesBoolean
          });
        }

        this.props.retornoCampo(columnaSeleccionada, tipoVariable, posicionTabla);
        this.props.retornoTipoDeAsignacion(tipoVariable);
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
        if (this.state.operaciones[i].valor.localeCompare("Asignar") == 0 && this.state.operaciones[i].valor.localeCompare(operacion) == 0 || this.state.operaciones[i].valor.localeCompare("Contar") == 0 && this.state.operaciones[i].valor.localeCompare(operacion) == 0 || this.state.operaciones[i].valor.localeCompare("Calcular Promedio") == 0 && this.state.operaciones[i].valor.localeCompare(operacion) == 0 || this.state.operaciones[i].valor.localeCompare("Máximo") == 0 && this.state.operaciones[i].valor.localeCompare(operacion) == 0 || this.state.operaciones[i].valor.localeCompare("Mínimo") == 0 && this.state.operaciones[i].valor.localeCompare(operacion) == 0
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

      if (codigo.localeCompare("Sumar") == 0) {
        return "SUM";
      }
    }
  }, {
    key: "agregarAFormula",
    value: function agregarAFormula() {
      console.log('this.state.formula');
      console.log(this.state.formula);

      if (this.state.formula.length == 0 && $("div").hasClass("colorPunteroFormula")) {
        //caso inicial, agregar primera variable
        var formulaTemp = _toConsumableArray(this.state.formula);

        variableSeleccionada.activa = false;
        variableSeleccionada.tipo = "variable";
        variableSeleccionada.texto = variableSeleccionada.valor;
        variableSeleccionada.operacion = ''; //variableSeleccionada.tipoColumnaEnTabla = ;

        if (this.existeReglaAsignacion(operacionSeleccionada.valor)) {
          variableSeleccionada.texto = this.retornarCodigoOperacion(operacionSeleccionada.valor) + "(" + variableSeleccionada.valor + ")";
          variableSeleccionada.operacion = this.retornarCodigoOperacion(operacionSeleccionada.valor);
        }

        if (operacionSeleccionada.valor == undefined) {
          //cuando se agrega campo a formula para crear operacion ASIG
          variableSeleccionada.operacion = 'ASIG';
        }

        formulaTemp = formulaTemp.concat(variableSeleccionada);
        this.agregarFormulaAnchuraYAltura(formulaTemp, false);
        /*this.setState({
            formula: formulaTemp
        }, this.iniciarGuardarFormula );*/

        this.setState({
          formula: formulaTemp
        });
        console.log('variableSeleccionada');
        console.log(variableSeleccionada);
        console.log('operacionSeleccionada');
        console.log(operacionSeleccionada);
        console.log('formulaTemp');
        console.log(formulaTemp);
        var self = this;
        setTimeout(function () {
          console.log(self.state.formula);
        }, 2000); //actualizando campos de variables a mostrar segun el campo que se acaba de agregar

        if (variableSeleccionada.esFuenteDato) {
          //solo mostrar campos que sean de conexiones tabla
          var arregloConexionesTemp = [],
              arregloCamposConexionesTemp = [];

          for (var i = 0; i < tablasOriginales.length; i++) {
            if (tablasOriginales[i].ID == variableSeleccionada.idConexionTabla) {
              arregloConexionesTemp.push(tablasOriginales[i]);

              for (var j = 0; j < camposTablasOriginales[i].length; j++) {
                if (arregloCamposConexionesTemp[arregloConexionesTemp.length - 1] == undefined) arregloCamposConexionesTemp[arregloConexionesTemp.length - 1] = [];
                arregloCamposConexionesTemp[arregloConexionesTemp.length - 1].push(camposTablasOriginales[i][j]);
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
            camposVariables: []
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
                  arregloCamposVariablesTemp[arregloVariablesTemp.length - 1].push(camposVariablesOriginales[i][j]);
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
              camposVariables: arregloCamposVariablesTemp
            });
          } else {
            this.setState({
              tablas: [],
              camposTablas: [],
              variablesEscalares: this.state.variablesEscalares,
              variables: this.state.variables,
              camposVariables: this.state.camposVariables
            });
          }
        }
      } else if (this.state.formula.length > 0 && $("div").hasClass("colorPunteroFormula")) {
        var formulaTemp = _toConsumableArray(this.state.formula); //var formulaTemp = this.state.formula.slice();


        for (var i = 0; i < formulaTemp.length; i++) {
          //if(formulaTemp[i].operacion.localeCompare("ASIG")) {
          formulaTemp[i].operacion = 'FORMULA'; //}
        }

        ;
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

        ; //var tempVar;
        //eval("tempVar = temp"+posicionArreglo);

        operacionSeleccionada.operacion = operacionSeleccionada.valor;

        if (operacionSeleccionada.valor.localeCompare("/") != 0) {
          if (posicionIndicador.localeCompare("derecha") == 0) {
            if (posicionArreglo.length > 0) {
              formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice) + 1, 0, variableSeleccionada);
              formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice) + 1, 0, operacionSeleccionada);
            } else {
              formulaTemp.splice(parseInt(ultimoIndice) + 1, 0, variableSeleccionada);
              formulaTemp.splice(parseInt(ultimoIndice) + 1, 0, operacionSeleccionada);
            } //eval("formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice)+1, 0, variableSeleccionada[0])");

          } else {
            if (posicionArreglo.length > 0) {
              formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice), 0, operacionSeleccionada);
              formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice), 0, variableSeleccionada);
            } else {
              formulaTemp.splice(parseInt(ultimoIndice), 0, operacionSeleccionada);
              formulaTemp.splice(parseInt(ultimoIndice), 0, variableSeleccionada);
            }
          }
        } else {//
        }

        console.log('variableSeleccionada');
        console.log(variableSeleccionada);
        console.log('operacionSeleccionada');
        console.log(operacionSeleccionada);
        console.log('formulaTemp');
        console.log(formulaTemp);
        this.agregarFormulaAnchuraYAltura(formulaTemp, false);
        /*this.setState({
            formula: formulaTemp
        }, this.iniciarGuardarFormula );*/

        this.setState({
          formula: formulaTemp
        });
        var self = this;
        setTimeout(function () {
          console.log(self.state.formula);
        }, 2000);
      } else if (!$("div").hasClass("colorPunteroFormula")) {
        alert("Seleccione una posición en la fórmula.");
      }
    }
  }, {
    key: "updateFormulaState",
    value: function updateFormulaState(nuevaFormula) {
      if (this.validarNuevaFormula(nuevaFormula)) {
        this.setState({
          formula: this.state.formula + nuevaFormula
        });
      }
    }
  }, {
    key: "getFormula",
    value: function getFormula() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select formula from " + _this2.props.tablaVarEditar + " where ID = " + _this2.props.idVarEditar, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                _this2.crearArregloDeFormula(result.recordset[0].formula);
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearArregloDeFormula",
    value: function crearArregloDeFormula(formula) {
      console.log('formula');
      console.log(formula);
      var nuevoArregloFormula = [];

      for (var i = 0; i < formula.length; i++) {
        var variableProcesarFormula = getPalabraFormula;

        if (formula.charAt(i).localeCompare('(') == 0 || formula.charAt(i).localeCompare(')') == 0) {
          nuevoArregloFormula.push({
            valor: "seleccion"
          });
        } else if (formula.charAt(i).localeCompare('[') == 0) {//
        } else if (this.esOperacionAritmetica(formula.charAt(i))) {
          nuevoArregloFormula.push({
            valor: formula.charAt(i)
          });
        } else if (this.esOperacionCompleja(formula, i)) {
          var nombre = this.getPalabraFormula(formula, i);
          nuevoArregloFormula.push({
            valor: nombre
          });
        } else if (this.esVariable(formula, i)) {
          var nombre = this.getPalabraFormula(formula, i);
          nuevoArregloFormula.push({
            valor: nombre
          });
        }
      }

      ;
      this.agregarFormulaAnchuraYAltura(nuevoArregloFormula);
    }
  }, {
    key: "esOperacionAritmetica",
    value: function esOperacionAritmetica(caracter) {
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

      for (var i = 0; i < campos.length; i++) {
        if (campos[i].nombre.localeCompare(palabra) == 0) {
          return true;
        }
      }

      ;

      for (var i = 0; i < variables.length; i++) {
        if (variables[i].nombre.localeCompare(palabra) == 0) {
          return true;
        }
      }

      ;

      for (var i = 0; i < objetos.length; i++) {
        for (var j = 0; j < camposDeObjetos[i].length; j++) {
          if (camposDeObjetos[i][j].nombre.localeCompare(palabra) == 0) {
            return true;
          }
        }

        ;
      }

      ;
      return false;
    }
  }, {
    key: "agregarFormulaAnchuraYAltura",
    value: function agregarFormulaAnchuraYAltura(arregloFormula, esDivision) {
      var contadorIndicadoresNumerador = 0,
          contadorIndicadoresDenominador = 0,
          contadorSignosNumerador = 0,
          contadorSignosDenominador = 0,
          contadorVariablesNumerador = 0,
          contadorVariablesDenominador = 0,
          esDespuesDivision = false;

      for (var i = 0; i < arregloFormula.length; i++) {
        if (!Array.isArray(arregloFormula[i].valor) && this.esOperacionAritmetica(arregloFormula[i].valor)) {
          if (!esDespuesDivision) {
            contadorSignosNumerador++;
          } else {
            contadorSignosDenominador++;
          }
        } else if (!Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("\\") != 0 && !this.esOperacionAritmetica(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("division\\") != 0 || Array.isArray(arregloFormula[i].valor)) {
          if (!esDespuesDivision) {
            contadorVariablesNumerador++;
          } else {
            contadorVariablesDenominador++;
          }
        } else if (!Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("\\") == 0) {
          if (!esDespuesDivision) {
            contadorIndicadoresNumerador++;
          } else {
            contadorIndicadoresDenominador++;
          }
        }

        if (arregloFormula[i].valor.localeCompare("division\\") == 0) {
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

      for (var i = 0; i < arregloFormula.length; i++) {
        if (!Array.isArray(arregloFormula[i].valor) && this.esOperacionAritmetica(arregloFormula[i].valor)) {
          arregloFormula[i].width = "2%";
        } else if (!Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("\\") != 0 && !this.esOperacionAritmetica(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("division\\") != 0 || Array.isArray(arregloFormula[i].valor)) {
          if (!esDespuesDivision) {
            arregloFormula[i].width = widthNumerador + "%";
          } else {
            arregloFormula[i].width = widthDenominador + "%";
          }
        } else if (!Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("\\") == 0) {
          arregloFormula[i].width = "5%";
        }

        if (arregloFormula[i].valor.localeCompare("division\\") == 0) {
          arregloFormula[i].height = "2%";
        } else {
          if (esDivision) {
            arregloFormula[i].height = "49%";
          } else {
            arregloFormula[i].height = "100%";
          }
        }
      }

      ;

      for (var i = 0; i < arregloFormula.length; i++) {
        if (Array.isArray(arregloFormula[i].valor)) {
          this.agregarFormulaAnchuraYAltura(arregloFormula[i].valor);
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

    }
  }, {
    key: "iniciarGuardarFormula",
    value: function iniciarGuardarFormula() {
      var formula = '';
      console.log('this.state.formula');
      console.log(this.state.formula);
      var operacion = '';

      for (var i = 0; i < this.state.formula.length; i++) {
        if (this.state.formula[i].operacion != undefined && this.state.formula[i].operacion.localeCompare("ASIG") == 0) {
          formula += "ASIG(" + this.state.formula[i].valor + ")";
          operacion = "ASIG";
        } else if (this.state.formula[i].operacion != undefined && this.state.formula[i].operacion.localeCompare("COUNT") == 0) {
          formula += this.state.formula[i].valor;
          operacion = "COUNT";
        } else if (this.state.formula[i].operacion != undefined && this.state.formula[i].operacion.localeCompare("PROM") == 0) {
          formula += this.state.formula[i].valor;
          operacion = "PROM";
        } else if (this.state.formula[i].operacion != undefined && this.state.formula[i].operacion.localeCompare("MAX") == 0) {
          formula += this.state.formula[i].valor;
          operacion = "MAX";
        } else if (this.state.formula[i].operacion != undefined && this.state.formula[i].operacion.localeCompare("MIN") == 0) {
          formula += this.state.formula[i].valor;
          operacion = "MIN";
        } else if (this.state.formula[i].operacion != undefined && this.state.formula[i].operacion.localeCompare("SUM") == 0) {
          formula += this.state.formula[i].valor;
          operacion = "SUM";
        } else {
          formula += this.state.formula[i].valor;
          operacion = "FORMULA";
        }
      }

      ;
      console.log('formula');
      console.log(formula);
      var objetoFormula = {
        variableID: -1,
        variableCampoID: -1,
        numeroDeFormulaDeVariable: -1,
        formula: formula,
        operacion: operacion
      };
      /*console.log('formula');
      console.log(this.state.formula);*/
      //this.props.anadirFormula(formula, this.state.formula);

      variableSeleccionada = {};
      operacionSeleccionada = {};
      this.props.anadirFormula(objetoFormula, this.state.formula);
      alert("Fórmula guardada."); //this.guardarVariable(formula);
    }
  }, {
    key: "guardarVariable",
    value: function guardarVariable(formula) {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("update " + _this3.props.tablaVarEditar + " set formula = '" + formula + "' where ID = " + _this3.props.idVarEditar, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {});
          }
        });
      }); // fin transaction
    }
  }, {
    key: "loadTablas",
    value: function loadTablas() {
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
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              tablasOriginales = result.recordset;
              console.log('tablasOriginales');
              console.log(tablasOriginales);

              _this4.setState({
                tablas: result.recordset
              }, _this4.initLoadTablasCampos);
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
            if (!rolledBack) {
              console.log(err);
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
                  idConexionTabla: _this5.state.tablas[index].ID
                });
              }

              ;

              if (array[index] == undefined) {
                array[index] = [];
              }

              array[index] = $.merge(array[index], nombreColumnas);
              camposTablasOriginales = array;
              console.log('camposTablasOriginales');
              console.log(camposTablasOriginales);

              _this5.setState({
                camposTablas: array
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
            if (!rolledBack) {
              console.log(err);
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
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var temp = _toConsumableArray(_this7.state.variablesEscalares);

              for (var i = 0; i < result.recordset.length; i++) {
                temp.push({
                  valor: result.recordset[i].nombre,
                  tipo: result.recordset[i],
                  esFuenteDato: false,
                  variableID: variable.ID,
                  variableCampoID: result.recordset[i].ID,
                  esObjeto: variable.esObjeto
                });
              }

              ;
              variablesEscalaresOriginales = temp;
              console.log('variablesEscalaresOriginales');
              console.log(variablesEscalaresOriginales);

              _this7.setState({
                variablesEscalares: temp
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "loadVariables",
    value: function loadVariables() {
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
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              variablesOriginales = result.recordset;

              _this8.setState({
                variables: result.recordset
              }, _this8.initLoadVariablesCampos);
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
      var _this9 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from VariablesCampos where variableID = " + variable.ID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
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
                  esObjeto: variable.esObjeto
                });
              }

              ;

              if (array[index] == undefined) {
                array[index] = [];
              }

              array[index] = $.merge(array[index], nombreColumnas);
              camposVariablesOriginales = array;
              console.log('camposVariablesOriginales');
              console.log(camposVariablesOriginales);

              _this9.setState({
                camposVariables: array
              });
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
        seleccionarMultiple: false,
        retornoSeleccionVariable: this.retornoSeleccionCampo
      }))), _react["default"].createElement("div", {
        style: {
          width: "50%",
          height: "100%",
          "float": "right",
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
          padding: "0% 1%",
          scroll: "auto"
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
