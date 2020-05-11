import React from 'react';
import ReactDOM from 'react-dom';
import sql from 'mssql';

import Equacion from './Equacion.js';
import ListasSeleVariableContenedorVariable from './ListasSeleVariableContenedorVariable.js';
import ListasSeleVariableContenedorOperador from './ListasSeleVariableContenedorOperador.js';

//const campos = [{valor: "idCLiente", tipo: "variable"}, {valor: "saldoTotal", tipo: "variable"}, {valor: "tipoPersona", tipo: "variable"}, {valor: "impuestosTotal", tipo: "variable"}, {valor: "nombreCliente", tipo: "variable"}, {valor: "diasMora", tipo: "variable"}, {valor: "mesMora", tipo: "variable"}];
//var tablas = [], camposTablas = [];
const operaciones = [];
//const operaciones = [{valor: "Asignar", tipo: "signo"}, {valor: "Contar", tipo: "signo"}];
const operacionesNumero = [{valor: "Contar", tipo: "signo"}, {valor: "Calcular Promedio", tipo: "signo"}, {valor: "Máximo", tipo: "signo"}, {valor: "Mínimo", tipo: "signo"}, {valor: "Autosumar", tipo: "signo"}];
const operacionesNumeroMasDeUnValor = [{valor: "+", tipo: "signo"}, {valor: "-", tipo: "signo"}, {valor: "*", tipo: "signo"}, {valor: "/", tipo: "signo"}];
const operacionesFecha = [{valor: "Contar", tipo: "signo"}, {valor: "Máximo", tipo: "signo"}, {valor: "Mínimo", tipo: "signo"}, {valor: "Día", tipo: "signo"}, {valor: "Mes", tipo: "signo"}, {valor: "Año", tipo: "signo"}];
const operacionesBoolean = [{valor: "Contar", tipo: "signo"}];
const operacionesCadena = [{valor: "Contar", tipo: "signo"}];
const operacionesCadenaMasDeUnValor = [{valor: "+", tipo: "signo"}];
/*const operaciones = [{valor: "Asignar Valor Único", tipo: "signo"}, {valor: "Asignar Valor Único Si", tipo: "signo"}, {valor: "Asignar Valor Multiples", tipo: "signo"}, {valor: "Asignar Valor Multiples Si", tipo: "signo"}, {valor: "Contar", tipo: "signo"}, {valor: "Contar Si", tipo: "signo"}];
const operacionesNumero = [{valor: "Asignar Valor Único", tipo: "signo"}, {valor: "Asignar Valor Único Si", tipo: "signo"}, {valor: "Asignar Valor Multiples", tipo: "signo"}, {valor: "Asignar Valor Multiples Si", tipo: "signo"}, {valor: "Contar", tipo: "signo"}, {valor: "Contar Si", tipo: "signo"}, {valor: "Calcular Promedio", tipo: "signo"}, {valor: "Máximo", tipo: "signo"}, {valor: "Mínimo", tipo: "signo"}, {valor: "+", tipo: "signo"}, {valor: "-", tipo: "signo"}, {valor: "*", tipo: "signo"}, {valor: "/", tipo: "signo"}];
const operacionesFecha = [{valor: "Asignar Valor Único", tipo: "signo"}, {valor: "Asignar Valor Único Si", tipo: "signo"}, {valor: "Asignar Valor Multiples", tipo: "signo"}, {valor: "Asignar Valor Multiples Si", tipo: "signo"}, {valor: "Contar", tipo: "signo"}, {valor: "Contar Si", tipo: "signo"}];
const operacionesBoolean = [{valor: "Asignar Valor Único", tipo: "signo"}, {valor: "Asignar Valor Único Si", tipo: "signo"}, {valor: "Asignar Valor Multiples", tipo: "signo"}, {valor: "Asignar Valor Multiples Si", tipo: "signo"}, {valor: "Contar", tipo: "signo"}, {valor: "Contar Si", tipo: "signo"}];
const operacionesCadena = [{valor: "Asignar Valor Único", tipo: "signo"}, {valor: "Asignar Valor Único Si", tipo: "signo"}, {valor: "Asignar Valor Multiples", tipo: "signo"}, {valor: "Asignar Valor Multiples Si", tipo: "signo"}, {valor: "Contar", tipo: "signo"}, {valor: "Contar Si", tipo: "signo"}, {valor: "+", tipo: "signo"}];*/

const variablesEscalares = [];
const objetos = [];
const camposDeObjetos = [];
const anchuraSeccionFormula = ["100%", "50", "33%", "25%", "25%", "17%", "15%", "13%", "11%", "10%", "9%"];

var tablasOriginales = [], camposTablasOriginales = [], variablesEscalaresOriginales = [], variablesOriginales = [], camposVariablesOriginales = [], excelOriginales = [], camposExcelOriginales = [], formasOriginales = [], variablesOriginalesSQL = [], camposVariablesOriginalesSQL = [];

var variableSeleccionada = [], operacionSeleccionada = [], posicionDeIndicadorSeleccionadoEnFormula = '', posicionIndicador ='';

var posicionIndicadorAgregarEnFormula = '';

var operacionGuardarFormula = '';
var formulaGuardarFormula = '';

//bandera para ver si seleccion de variables para agregar division es correcta
var seleccionValidaVarDivision = true;
//contador para poner identificadorIndicador
var identificadorIndicador = 0;

//bandera para ver si selecciono
var seleccionManual = false;

//bandera para saber si ya trajo todas las variables
var banderaCargaVariablesINICIO = 0;
var banderaCargaVariablesFIN = 0;

// diferencia posicionDeIndicadorSeleccionadoEnFormula y posicionIndicadorAgregarEnFormula
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

export default class Formula extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        }
        this.clickEnFormula = this.clickEnFormula.bind(this);
        this.retornoSeleccionCampo = this.retornoSeleccionCampo.bind(this);
        this.retornoSeleccionOperacion = this.retornoSeleccionOperacion.bind(this);
        this.existeReglaAsignacion = this.existeReglaAsignacion.bind(this);
        this.retornarCodigoOperacion = this.retornarCodigoOperacion.bind(this);
        this.exitseCodigoOperacion = this.exitseCodigoOperacion.bind(this);
        this.agregarAFormula = this.agregarAFormula.bind(this);
        this.verificarSeleccionoTodosDivision = this.verificarSeleccionoTodosDivision.bind(this);
        this.crearArregloDeFormula = this.crearArregloDeFormula.bind(this);
        this.crearObjetosDeArregloDeFormula = this.crearObjetosDeArregloDeFormula.bind(this);
        this.encontrarCierreParentesis = this.encontrarCierreParentesis.bind(this);
        this.esOperacionAritmetica = this.esOperacionAritmetica.bind(this);
        this.esOperacionCompleja = this.esOperacionCompleja.bind(this);
        this.getPalabraFormula = this.getPalabraFormula.bind(this);
        this.esVariable = this.esVariable.bind(this);
        this.agregarFormulaAnchuraYAltura = this.agregarFormulaAnchuraYAltura.bind(this);
        this.findVariableInFormula = this.findVariableInFormula.bind(this);
        this.clearSelectsInFormulaIndicadores = this.clearSelectsInFormulaIndicadores.bind(this);
        this.clearSelectsInFormulaVariables = this.clearSelectsInFormulaVariables.bind(this);
        this.findSelectedIndicador = this.findSelectedIndicador.bind(this);
        this.getSelectedVariables = this.getSelectedVariables.bind(this);
        this.getFormulaAndOperationText = this.getFormulaAndOperationText.bind(this);
        this.iniciarGuardarFormula = this.iniciarGuardarFormula.bind(this);
        this.guardarVariable = this.guardarVariable.bind(this);
        this.actualizarEstadoInputManual = this.actualizarEstadoInputManual.bind(this);
        this.loadTablas = this.loadTablas.bind(this);
        this.initLoadTablasCampos = this.initLoadTablasCampos.bind(this);
        this.loadTablasCampos = this.loadTablasCampos.bind(this);
        this.loadScalarVariables = this.loadScalarVariables.bind(this);
        this.loadScalarVariablesFields = this.loadScalarVariablesFields.bind(this);
        this.loadVariables = this.loadVariables.bind(this);
        this.initLoadVariablesCampos = this.initLoadVariablesCampos.bind(this);
        this.loadVariablesCampos = this.loadVariablesCampos.bind(this);
        this.loadVariablesSQL = this.loadVariablesSQL.bind(this);
        this.initLoadVariablesCamposSQL = this.initLoadVariablesCamposSQL.bind(this);
        this.loadVariablesCamposSQL = this.loadVariablesCamposSQL.bind(this);
        this.loadExcel = this.loadExcel.bind(this);
        this.initLoadExcelCampos = this.initLoadExcelCampos.bind(this);
        this.loadExcelCampos = this.loadExcelCampos.bind(this);
        this.loadFormas = this.loadFormas.bind(this);
        if(this.props.esEditarVar) {
            banderaCargaVariablesINICIO = 0;
            banderaCargaVariablesFIN = 0;
            console.log(this.props)
        }
        variableSeleccionada = [];
        operacionSeleccionada = [];
    }

    componentDidMount() {
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

    findVariableInFormula (arreglo, variable, posicionEnArreglo, index) {
        for (var i = 0; i < arreglo.length; i++) {
            if( !Array.isArray(arreglo[i].valor) && arreglo[i].valor.localeCompare(variable) == 0 && index == i) {
                posicionDeIndicadorSeleccionadoEnFormula = posicionEnArreglo+'['+i+']';
            } else if( Array.isArray(arreglo[i].valor) ) {
                this.findVariableInFormula (arreglo[i].valor, variable, posicionEnArreglo+'['+i+'].valor', index);
            }
        };
    }

    clearSelectsInFormulaIndicadores (arreglo) {
        for (var i = 0; i < arreglo.length; i++) {
            if( !Array.isArray(arreglo[i].valor)) {
                if(arreglo[i].tipo.localeCompare("indicador") == 0) {
                    if(arreglo[i].posicion.localeCompare("izquierda") == 0) {
                        $("#indicadorIzquierdaDiv"+arreglo[i].identificadorIndicador).removeClass("colorPunteroFormula");
                        $("#indicadorIzquierdaDiv"+arreglo[i].identificadorIndicador).removeClass("blink");
                        $("#indicadorIzquierdaDiv"+arreglo[i].identificadorIndicador).addClass("highlightFormulaBackground");
                    } else {
                        $("#indicadorDerechaDiv"+arreglo[i].identificadorIndicador).removeClass("colorPunteroFormula");
                        $("#indicadorDerechaDiv"+arreglo[i].identificadorIndicador).removeClass("blink");
                        $("#indicadorDerechaDiv"+arreglo[i].identificadorIndicador).addClass("highlightFormulaBackground");
                    }
                } else {
                    $("#indicadorIzquierda"+arreglo[i].valor+i).removeClass("colorPunteroFormula");
                    $("#indicadorIzquierda"+arreglo[i].valor+i).removeClass("blink");
                    $("#indicadorIzquierda"+arreglo[i].valor+i).addClass("highlightFormulaBackground");
                    $("#indicadorDerecha"+arreglo[i].valor+i).removeClass("colorPunteroFormula");
                    $("#indicadorDerecha"+arreglo[i].valor+i).removeClass("blink");
                    $("#indicadorDerecha"+arreglo[i].valor+i).addClass("highlightFormulaBackground");
                }
            } else if( Array.isArray(arreglo[i].valor) ) {
                this.clearSelectsInFormulaIndicadores (arreglo[i].valor);
            }
        };
    }

    clearSelectsInFormulaVariables (arreglo) {
        for (var i = 0; i < arreglo.length; i++) {
            if( !Array.isArray(arreglo[i].valor) && arreglo[i].activa != undefined) {
                arreglo[i].activa = false;
            } else if( Array.isArray(arreglo[i].valor) ) {
                this.clearSelectsInFormulaVariables (arreglo[i].valor);
            }
        };
    }

    findSelectedIndicador (arreglo, posicionEnArreglo) {
        for (var i = 0; i < arreglo.length; i++) {
            if( !Array.isArray(arreglo[i].valor)) {
                if(arreglo[i].tipo.localeCompare("indicador") == 0) {
                    if(arreglo[i].posicion.localeCompare("izquierda") == 0) {
                        if ($("#indicadorIzquierdaDiv"+arreglo[i].identificadorIndicador).hasClass("colorPunteroFormula") ) {
                            posicionIndicadorAgregarEnFormula = posicionEnArreglo+'['+i+'].valor';
                        }
                    } else {
                        if ($("#indicadorDerechaDiv"+arreglo[i].identificadorIndicador).hasClass("colorPunteroFormula") ) {
                            posicionIndicadorAgregarEnFormula = posicionEnArreglo+'['+i+'].valor';
                        }
                    }
                } else {
                    if ($("#indicadorIzquierda"+arreglo[i].valor+i).hasClass("colorPunteroFormula") ) {
                        posicionIndicadorAgregarEnFormula = posicionEnArreglo+'['+i+'].valor';
                    }
                    if ($("#indicadorDerecha"+arreglo[i].valor+i).hasClass("colorPunteroFormula") ) {
                        posicionIndicadorAgregarEnFormula = posicionEnArreglo+'['+i+'].valor';
                    }
                }
            } else if( Array.isArray(arreglo[i].valor) ) {
                this.findSelectedIndicador (arreglo[i].valor, posicionEnArreglo+'['+i+'].valor');
            }
        };
    }

    getSelectedVariables (arreglo, arregloVarSeleccionadas, posicionEnArreglo) {
        for (var i = 0; i < arreglo.length; i++) {
            if( !Array.isArray(arreglo[i].valor) && arreglo[i].activa ) {
                arregloVarSeleccionadas.push(posicionEnArreglo+'['+i+']');
            } else if( Array.isArray(arreglo[i].valor) ) {
                this.getSelectedVariables (arreglo[i].valor, arregloVarSeleccionadas, posicionEnArreglo+'['+i+'].valor');
            }
        };
    }

    clickEnFormula (e, posicion, nombre, index) {
        var copyTemp = [...this.state.formula];
        if(posicion != null) {
            this.clearSelectsInFormulaVariables(copyTemp);
            this.setState({
                formula: copyTemp
            });
        }
        console.log('posicion')
        console.log(posicion)
        console.log('nombre')
        console.log(nombre)
        console.log('index')
        console.log(index)
        this.clearSelectsInFormulaIndicadores(this.state.formula);
        if(posicion == null) {
            posicionIndicador = '';
            this.findVariableInFormula(this.state.formula, nombre, '', index);
            var temp = [...this.state.formula];
            var tempVar;
            console.log('posicionDeIndicadorSeleccionadoEnFormula')
            console.log(posicionDeIndicadorSeleccionadoEnFormula)
            eval("tempVar = temp"+posicionDeIndicadorSeleccionadoEnFormula);
            tempVar.activa = !tempVar.activa;
            //temp.splice(index, 1, tempVar);
            this.setState({
                formula: temp
            });
        } else if (posicion.localeCompare("izquierda") == 0) {
            posicionIndicador = 'izquierda';
            $("#indicadorIzquierda"+nombre+index).addClass("colorPunteroFormula");
            $("#indicadorIzquierda"+nombre+index).addClass("blink");
            $("#indicadorIzquierda"+nombre+index).removeClass("highlightFormulaBackground");
            this.findVariableInFormula(this.state.formula, nombre, '', index);
        } else if (posicion.localeCompare("derecha") == 0) {
            posicionIndicador = 'derecha';
            $("#indicadorDerecha"+nombre+index).addClass("colorPunteroFormula");
            $("#indicadorDerecha"+nombre+index).addClass("blink");
            $("#indicadorDerecha"+nombre+index).removeClass("highlightFormulaBackground");
            this.findVariableInFormula(this.state.formula, nombre, '', index);
        } else if (posicion.localeCompare("empty") == 0) {
            if($("#indicadorFormulaVacia").hasClass("colorPunteroFormula")) {
                $("#indicadorFormulaVacia").removeClass("blink");
                $("#indicadorFormulaVacia").removeClass("colorPunteroFormula");
            } else {
                $("#indicadorFormulaVacia").addClass("blink");
                $("#indicadorFormulaVacia").addClass("colorPunteroFormula");
            }
        } else if (posicion.localeCompare("indicadorIzq") == 0) {
            $("#indicadorIzquierdaDiv"+nombre).addClass("colorPunteroFormula");
            $("#indicadorIzquierdaDiv"+nombre).addClass("blink");
            $("#indicadorIzquierdaDiv"+nombre).removeClass("highlightFormulaBackground");
            posicionIndicador = 'izquierda';
        } else if (posicion.localeCompare("indicadorDer") == 0) {
            $("#indicadorDerechaDiv"+nombre).addClass("colorPunteroFormula");
            $("#indicadorDerechaDiv"+nombre).addClass("blink");
            $("#indicadorDerechaDiv"+nombre).removeClass("highlightFormulaBackground");
            posicionIndicador = 'derecha';
        }
    }

    retornoSeleccionCampo (esOperacion, variable, posicionTabla) {
        if(variable[0].valor.length > 0) {
            var columnaSeleccionada = variable[0];
            console.log('columnaSeleccionada')
            console.log(columnaSeleccionada)
            variableSeleccionada = jQuery.extend(true, {}, variable[0]);
            var tipoVariable = '';
            if(columnaSeleccionada.tipo.localeCompare("int") == 0 && this.state.formula.length == 0) {
                tipoVariable = 'int';
                this.setState({
                    operaciones: operacionesNumero
                });
            } else if(columnaSeleccionada.tipo.localeCompare("decimal") == 0 && this.state.formula.length == 0) {
                tipoVariable = 'decimal';
                this.setState({
                    operaciones: operacionesNumero
                });
            } else if(columnaSeleccionada.tipo.localeCompare("varchar") == 0 && this.state.formula.length == 0) {
                tipoVariable = 'varchar';
                this.setState({
                    operaciones: operacionesCadena
                });
            } else if(columnaSeleccionada.tipo.localeCompare("date") == 0 && this.state.formula.length == 0) {
                tipoVariable = 'date';
                this.setState({
                    operaciones: operacionesFecha
                });
            } else if(columnaSeleccionada.tipo.localeCompare("bit") == 0 && this.state.formula.length == 0) {
                tipoVariable = 'bit';
                this.setState({
                    operaciones: operacionesBoolean
                });
            } else if(columnaSeleccionada.tipo.localeCompare("int") == 0 && this.state.formula.length > 0) {
                tipoVariable = 'int';
                this.setState({
                    operaciones: operacionesNumeroMasDeUnValor
                });
            } else if(columnaSeleccionada.tipo.localeCompare("decimal") == 0 && this.state.formula.length > 0) {
                tipoVariable = 'decimal';
                this.setState({
                    operaciones: operacionesNumeroMasDeUnValor
                });
            } else if(columnaSeleccionada.tipo.localeCompare("varchar") == 0 && this.state.formula.length > 0) {
                tipoVariable = 'varchar';
                this.setState({
                    operaciones: operacionesCadenaMasDeUnValor
                });
            }
            var nivelRegla = 0;
            if(variableSeleccionada.nivel != undefined)
                nivelRegla = variableSeleccionada.nivel+1;
            console.log('variableSeleccionada')
            console.log(variableSeleccionada)
            console.log('nivelRegla')
            console.log(nivelRegla)
            this.props.actualizarNivelNuevaRegla(nivelRegla);
        }
    }

    retornoSeleccionOperacion (esOperacion, operacion) {
        if(operacion[0].valor.length > 0) {
            operacionSeleccionada = operacion[0];
            this.props.retornoOperacion(operacionSeleccionada);
        }
    }

    existeReglaAsignacion (operacion) {
        for (var i = 0; i < this.state.operaciones.length; i++) {
            if( (this.state.operaciones[i].valor.localeCompare("Asignar") == 0 && this.state.operaciones[i].valor.localeCompare(operacion) == 0) || 
                (this.state.operaciones[i].valor.localeCompare("Contar") == 0 && this.state.operaciones[i].valor.localeCompare(operacion) == 0) || 
                (this.state.operaciones[i].valor.localeCompare("Calcular Promedio") == 0 && this.state.operaciones[i].valor.localeCompare(operacion) == 0) || 
                (this.state.operaciones[i].valor.localeCompare("Máximo") == 0 && this.state.operaciones[i].valor.localeCompare(operacion) == 0) || 
                (this.state.operaciones[i].valor.localeCompare("Mínimo") == 0 && this.state.operaciones[i].valor.localeCompare(operacion) == 0) ||
                (this.state.operaciones[i].valor.localeCompare("Autosumar") == 0 && this.state.operaciones[i].valor.localeCompare(operacion) == 0) /*|| 
                this.state.operaciones[i].valor.localeCompare("Sumar") == 0*/) {
                return true;
            }
        };
        return false;
    }

    retornarCodigoOperacion (codigo) {
        if(codigo.localeCompare("Asignar") == 0) {
            return "ASIG";
        }
        if(codigo.localeCompare("Contar") == 0) {
            return "COUNT";
        }
        if(codigo.localeCompare("Calcular Promedio") == 0) {
            return "PROM";
        }
        if(codigo.localeCompare("Máximo") == 0) {
            return "MAX";
        }
        if(codigo.localeCompare("Mínimo") == 0) {
            return "MIN";
        }
        if(codigo.localeCompare("Autosumar") == 0) {
            return "AUTOSUM";
        }
        if(codigo.localeCompare("Sumar") == 0) {
            return "SUM";
        }
        if(codigo.localeCompare("Día") == 0) {
            return "DATE";
        }
        if(codigo.localeCompare("Mes") == 0) {
            return "MONTH";
        }
        if(codigo.localeCompare("Año") == 0) {
            return "YEAR";
        }
    }

    exitseCodigoOperacion (codigo) {
        if(codigo.localeCompare("ASIG") == 0) {
            return true;
        }
        if(codigo.localeCompare("COUNT") == 0) {
            return true;
        }
        if(codigo.localeCompare("PROM") == 0) {
            return true;
        }
        if(codigo.localeCompare("MAX") == 0) {
            return true;
        }
        if(codigo.localeCompare("MIN") == 0) {
            return true;
        }
        if(codigo.localeCompare("AUTOSUM") == 0) {
            return true;
        }
        if(codigo.localeCompare("SUM") == 0) {
            return true;
        }
        if(codigo.localeCompare("DATE") == 0) {
            return true;
        }
        if(codigo.localeCompare("MONTH") == 0) {
            return true;
        }
        if(codigo.localeCompare("YEAR") == 0) {
            return true;
        }
    }

    agregarAFormula () {
        console.log('variableSeleccionada')
        console.log(variableSeleccionada)
        console.log('operacionSeleccionada')
        console.log(operacionSeleccionada)
        if (variableSeleccionada.valor != undefined || seleccionManual || operacionSeleccionada.valor.localeCompare("Borrar") == 0) {
            console.log('seleccionManual')
            console.log(seleccionManual)
            if(seleccionManual) {
                var valor = $("#valorManual").val();
                var tipo = 'varchar';
                if(isNaN(valor)) {
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
                    nivel: 0,
                    tipoOriginal: tipo
                }
            }
            //retornando tipo de variable
            if (operacionSeleccionada.valor == undefined) {
                this.props.retornoCampo(variableSeleccionada.tipo);
            } else {
                if(operacionSeleccionada.valor.localeCompare("Asignar") == 0 || operacionSeleccionada.valor.localeCompare("Máximo") == 0 || operacionSeleccionada.valor.localeCompare("Mínimo") == 0 || operacionSeleccionada.valor.localeCompare("Autosumar") == 0 || operacionSeleccionada.valor.localeCompare("Sumar") == 0) {
                    this.props.retornoCampo(variableSeleccionada.tipo);
                }
                if(operacionSeleccionada.valor.localeCompare("Contar") == 0 || operacionSeleccionada.valor.localeCompare("Día") == 0 || operacionSeleccionada.valor.localeCompare("Mes") == 0 || operacionSeleccionada.valor.localeCompare("Año") == 0) {
                    this.props.retornoCampo("int");
                }
                if(operacionSeleccionada.valor.localeCompare("Calcular Promedio") == 0) {
                    this.props.retornoCampo("decimal");
                }
            }
            if(this.state.formula.length == 0 && $("div").hasClass("colorPunteroFormula")) {        //caso inicial, agregar primera variable
                console.log('1')
                var formulaTemp = [...this.state.formula];
                variableSeleccionada.activa = false;
                var tipoOriginal = variableSeleccionada.tipo;
                variableSeleccionada.tipo = "variable";
                variableSeleccionada.texto = variableSeleccionada.valor;
                variableSeleccionada.operacion = '';
                variableSeleccionada.tipoOriginal = tipoOriginal;
                //variableSeleccionada.tipoColumnaEnTabla = ;
                if(this.existeReglaAsignacion(operacionSeleccionada.valor)) {
                    variableSeleccionada.texto = this.retornarCodigoOperacion(operacionSeleccionada.valor) + "(" + variableSeleccionada.valor + ")";
                    variableSeleccionada.operacion = this.retornarCodigoOperacion(operacionSeleccionada.valor);
                }
                if (operacionSeleccionada.valor == undefined || operacionSeleccionada.valor.localeCompare("Borrar") == 0) {
                    //cuando se agrega campo a formula para crear operacion ASIG
                    variableSeleccionada.operacion = 'ASIG';
                }/* else {
                    variableSeleccionada.operacion = operacionSeleccionada.valor;
                }*/
                var varAInsertar = jQuery.extend(true, {}, variableSeleccionada);
                formulaTemp = formulaTemp.concat(varAInsertar);
                this.agregarFormulaAnchuraYAltura(formulaTemp, true);
                this.setState({
                    operaciones: [],
                    formula: formulaTemp
                });
                var self = this;
                setTimeout(function(){
                    console.log(self.state.formula)
                }, 2000);
                console.log('tipoOriginal');
                console.log(tipoOriginal);
                console.log('camposTablasOriginales');
                console.log(camposTablasOriginales);
                console.log('camposTablasOriginales');
                console.log(camposTablasOriginales);

                //actualizando campos de variables a mostrar segun el campo que se acaba de agregar
                if(variableSeleccionada.esFuenteDato) {
                    //solo mostrar campos que sean de conexiones tabla
                    var arregloConexionesTemp = [], arregloCamposConexionesTemp = [];
                    for (var i = 0; i < tablasOriginales.length; i++) {
                        if(tablasOriginales[i].ID == variableSeleccionada.tablaID) {
                            arregloConexionesTemp.push(tablasOriginales[i]);
                            for (var j = 0; j < camposTablasOriginales[i].length; j++) {
                                if(arregloCamposConexionesTemp[arregloConexionesTemp.length-1] == undefined)
                                    arregloCamposConexionesTemp[arregloConexionesTemp.length-1] = [];
                                if(tipoOriginal.localeCompare("int") == 0 || tipoOriginal.localeCompare("decimal") == 0) {
                                    if(camposTablasOriginales[i][j].tipo.localeCompare("int") == 0 || camposTablasOriginales[i][j].tipo.localeCompare("decimal") == 0)
                                        arregloCamposConexionesTemp[arregloConexionesTemp.length-1].push(camposTablasOriginales[i][j]);
                                } else {
                                    if(camposTablasOriginales[i][j].tipo.localeCompare(tipoOriginal) == 0)
                                        arregloCamposConexionesTemp[arregloConexionesTemp.length-1].push(camposTablasOriginales[i][j]);
                                }
                            };
                            break;
                        }
                    };
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
                    if(variableSeleccionada.esObjeto) {
                        var arregloVariablesTemp = [], arregloCamposVariablesTemp = [];
                        for (var i = 0; i < variablesOriginales.length; i++) {
                            if(variablesOriginales[i].ID == variableSeleccionada.variableID) {
                                arregloVariablesTemp.push(variablesOriginales[i]);
                                for (var j = 0; j < camposVariablesOriginales[i].length; j++) {
                                    if(arregloCamposVariablesTemp[arregloVariablesTemp.length-1] == undefined)
                                        arregloCamposVariablesTemp[arregloVariablesTemp.length-1] = [];
                                    if(tipoOriginal.localeCompare("int") == 0 || tipoOriginal.localeCompare("decimal") == 0) {
                                        if(camposVariablesOriginales[i][j].tipo.localeCompare("int") == 0 || camposVariablesOriginales[i][j].tipo.localeCompare("decimal") == 0)
                                            arregloCamposVariablesTemp[arregloVariablesTemp.length-1].push(camposVariablesOriginales[i][j]);
                                    } else {
                                        if(camposVariablesOriginales[i][j].tipo.localeCompare(tipoOriginal) == 0)
                                            arregloCamposVariablesTemp[arregloVariablesTemp.length-1].push(camposVariablesOriginales[i][j]);
                                    }
                                };
                                break;
                            }
                        };
                        console.log(variablesEscalaresOriginales)
                        this.setState({
                            tablas: [],
                            camposTablas: [],
                            variablesEscalares: variablesEscalaresOriginales,
                            variables: arregloVariablesTemp,
                            camposVariables: arregloCamposVariablesTemp,
                            variablesSQL: [],
                            camposVariablesSQL: []
                        });
                    } else if(variableSeleccionada.esInstruccionSQL) {
                        var arregloVariablesSQLTemp = [], arregloCamposVariablesSQLTemp = [];
                        for (var i = 0; i < variablesOriginalesSQL.length; i++) {
                            if(variablesOriginalesSQL[i].ID == variableSeleccionada.variableID) {
                                arregloVariablesSQLTemp.push(variablesOriginalesSQL[i]);
                                for (var j = 0; j < camposVariablesOriginalesSQL[i].length; j++) {
                                    if(arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length-1] == undefined)
                                        arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length-1] = [];
                                    if(tipoOriginal.localeCompare("int") == 0 || tipoOriginal.localeCompare("decimal") == 0) {
                                        if(camposVariablesOriginalesSQL[i][j].tipo.localeCompare("int") == 0 || camposVariablesOriginalesSQL[i][j].tipo.localeCompare("decimal") == 0)
                                            arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length-1].push(camposVariablesOriginalesSQL[i][j]);
                                    } else {
                                        if(camposVariablesOriginalesSQL[i][j].tipo.localeCompare(tipoOriginal) == 0)
                                            arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length-1].push(camposVariablesOriginalesSQL[i][j]);
                                    }
                                };
                                break;
                            }
                        };
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
                this.getSelectedVariables (this.state.formula, arregloVarSeleccionadas, '');
                console.log('arregloVarSeleccionadas')
                console.log(arregloVarSeleccionadas)
                if(arregloVarSeleccionadas.length == 1) {
                    //viendo si tiene variable antes de var a eliminar
                    var ultimoIndice1 = arregloVarSeleccionadas[0].substring(0, arregloVarSeleccionadas[0].lastIndexOf(']'));
                    console.log('ultimoIndice1')
                    console.log(ultimoIndice1)
                    var ultimoIndice2 = ultimoIndice1.substring(ultimoIndice1.lastIndexOf('[')+1);
                    console.log('ultimoIndice2')
                    console.log(ultimoIndice2)
                    if(parseInt(ultimoIndice2) != 0) {
                        var indiceVarAEliminar1 = arregloVarSeleccionadas[0].substring(0, arregloVarSeleccionadas[0].lastIndexOf(']'));
                        var indiceVarAEliminar2 = indiceVarAEliminar1.substring(indiceVarAEliminar1.lastIndexOf('[')+1);
                        console.log('indiceVarAEliminar1')
                        console.log(indiceVarAEliminar1)
                        console.log('indiceVarAEliminar2')
                        console.log(indiceVarAEliminar2)
                        var indiceVarAEliminarAnterior1 = arregloVarSeleccionadas[0].substring(0, arregloVarSeleccionadas[0].lastIndexOf(']'));
                        var indiceVarAEliminarAnterior2 = indiceVarAEliminar1.substring(indiceVarAEliminar1.lastIndexOf('[')+1);
                        indiceVarAEliminarAnterior2 = parseInt(indiceVarAEliminarAnterior2)-1;
                        console.log('indiceVarAEliminarAnterior1')
                        console.log(indiceVarAEliminarAnterior1)
                        console.log('indiceVarAEliminarAnterior2')
                        console.log(indiceVarAEliminarAnterior2)
                        var variableAEliminar, variableAntesEliminar;
                        var copyFormula = [...this.state.formula];
                        eval("variableAEliminar = this.state.formula"+arregloVarSeleccionadas[0]);
                        eval("copyFormula"+arregloVarSeleccionadas[0].substring(0, arregloVarSeleccionadas[0].lastIndexOf('['))+".splice(indiceVarAEliminar2, 1)")
                        console.log('arregloVarSeleccionadas[0].substring(0, arregloVarSeleccionadas[0].lastIndexOf([))')
                        console.log( arregloVarSeleccionadas[0].substring(arregloVarSeleccionadas[0].lastIndexOf('[')) )
                        eval("variableAntesEliminar = this.state.formula"+arregloVarSeleccionadas[0].substring(0, arregloVarSeleccionadas[0].lastIndexOf('['))+"[indiceVarAEliminarAnterior2]");
                        if(variableAntesEliminar.tipo.localeCompare("signo") == 0)     
                            eval("copyFormula"+arregloVarSeleccionadas[0].substring(0, arregloVarSeleccionadas[0].lastIndexOf('['))+".splice(indiceVarAEliminarAnterior2, 1)")                   
                        console.log('variableAEliminar')
                        console.log(variableAEliminar)
                        console.log('variableAntesEliminar')
                        console.log(variableAntesEliminar)
                        this.agregarFormulaAnchuraYAltura(copyFormula, true);
                        this.setState({
                            formula: copyFormula
                        });
                        var self = this;
                        setTimeout(function(){
                            console.log(self.state.formula)
                        }, 2000);
                    } else {
                        var indiceVarAEliminar1 = arregloVarSeleccionadas[0].substring(0, arregloVarSeleccionadas[0].lastIndexOf(']'));
                        var indiceVarAEliminar2 = indiceVarAEliminar1.substring(indiceVarAEliminar1.lastIndexOf('[')+1);
                        console.log('indiceVarAEliminar1')
                        console.log(indiceVarAEliminar1)
                        console.log('indiceVarAEliminar2')
                        console.log(indiceVarAEliminar2)
                        var copyFormula = [...this.state.formula];
                        console.log('arregloVarSeleccionadas[0].substring(0, arregloVarSeleccionadas[0].lastIndexOf([)+')
                        console.log( arregloVarSeleccionadas[0].substring(0, arregloVarSeleccionadas[0].lastIndexOf('[')) )
                        eval("copyFormula"+arregloVarSeleccionadas[0].substring(0, arregloVarSeleccionadas[0].lastIndexOf('['))+".splice(indiceVarAEliminar2, 1)")
                        this.agregarFormulaAnchuraYAltura(copyFormula, true);
                        this.setState({
                            formula: copyFormula
                        });
                        var self = this;
                        setTimeout(function(){
                            console.log(self.state.formula)
                        }, 2000);
                    }
                } else if(arregloVarSeleccionadas.length > 1) {
                    alert("Solo debe seleccionar una variable a eliminar.");
                } else {
                    alert("Debe seleccionar por lo menos la variable a eliminar.");
                }
            } else if(this.state.formula.length > 0 && $("div").hasClass("colorPunteroFormula") && operacionSeleccionada.valor != undefined && operacionSeleccionada.valor.localeCompare("/") != 0) {
                console.log('2')
                var formulaTemp = [...this.state.formula];
                //quitar cualquier operacion seleccionada anteriormente
                for (var i = 0; i < formulaTemp.length; i++) {
                    formulaTemp[i].operacion = 'FORMULA';
                    formulaTemp[i].texto = formulaTemp[i].valor;
                };
                var tipoOriginal = variableSeleccionada.tipo;
                variableSeleccionada.tipoOriginal = tipoOriginal;
                variableSeleccionada.activa = false;
                variableSeleccionada.tipo = "variable";
                variableSeleccionada.texto = variableSeleccionada.valor;
                variableSeleccionada.operacion = '';
                if(this.existeReglaAsignacion(operacionSeleccionada.valor)) {
                    variableSeleccionada.texto = this.retornarCodigoOperacion(operacionSeleccionada.valor) + "(" + variableSeleccionada.valor + ")";
                    variableSeleccionada.operacion = this.retornarCodigoOperacion(operacionSeleccionada.valor);
                } else {
                    variableSeleccionada.operacion = 'FORMULA';
                }
                var posicionArreglo = '', ultimoIndice = '', noHaLeidoUltimoIndice = true;
                for (var i = posicionDeIndicadorSeleccionadoEnFormula.length - 1; i >= 0; i--) {
                    if (!noHaLeidoUltimoIndice) {
                        posicionArreglo += posicionDeIndicadorSeleccionadoEnFormula.charAt(i);
                    }
                    if (posicionDeIndicadorSeleccionadoEnFormula.charAt(i).localeCompare('[') != 0 && posicionDeIndicadorSeleccionadoEnFormula.charAt(i).localeCompare(']') != 0 && noHaLeidoUltimoIndice) {
                        if( posicionDeIndicadorSeleccionadoEnFormula.charAt(i).localeCompare('[') != 0 && posicionDeIndicadorSeleccionadoEnFormula.charAt(i).localeCompare(']') != 0 )
                            ultimoIndice += posicionDeIndicadorSeleccionadoEnFormula.charAt(i);
                        if(posicionDeIndicadorSeleccionadoEnFormula.charAt(i).localeCompare('[') == 0) {
                            noHaLeidoUltimoIndice = false;
                        }
                    }
                };
                var arregloVarSeleccionadas = [];
                //this.getSelectedIndicador (this.state.formula, arregloVarSeleccionadas, '');
                //this.findVariableInFormula(this.state.formula, nombre, '');
                console.log('posicionDeIndicadorSeleccionadoEnFormula');
                console.log(posicionDeIndicadorSeleccionadoEnFormula);
                console.log('posicionArreglo');
                console.log(posicionArreglo);
                console.log('posicionIndicadorAgregarEnFormula antes');
                console.log(posicionIndicadorAgregarEnFormula);
                this.findSelectedIndicador (this.state.formula, '');
                console.log('posicionIndicadorAgregarEnFormula despues');
                console.log(posicionIndicadorAgregarEnFormula);
                var indicadorSeleccionado;
                //eval("indicadorSeleccionado = this.state.formula["+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf(".")))
                //var tempVar;
                //eval("tempVar = temp"+posicionArreglo);
                operacionSeleccionada.operacion = operacionSeleccionada.valor;
                var varAInsertar = jQuery.extend(true, {}, variableSeleccionada);
                if(posicionIndicador.localeCompare("derecha") == 0) {
                    /*if(posicionArreglo.length > 0) {
                        formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice)+1, 0, varAInsertar);
                        formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice)+1, 0, operacionSeleccionada);
                    } else {
                        formulaTemp.splice(parseInt(ultimoIndice)+1, 0, varAInsertar);
                        formulaTemp.splice(parseInt(ultimoIndice)+1, 0, operacionSeleccionada);
                    }*/
                    if(posicionIndicadorAgregarEnFormula.split("[").length > 2) {
                        console.log('1');
                        var pos1 = posicionIndicadorAgregarEnFormula.substring(posicionIndicadorAgregarEnFormula.lastIndexOf("[")+1);
                        console.log('pos1');
                        console.log(pos1);
                        var pos2 = pos1.substring(0, pos1.lastIndexOf("]"));
                        console.log('pos2');
                        console.log(pos2);
                        console.log('posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))');
                        console.log(posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("[")));
                        console.log("console.log(formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".length)" );
                        eval("console.log(formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".length)" );
                        eval("console.log(formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".length == parseInt(pos2)+1)" );
                        var esUltimoIndice = false;
                        eval("if (formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".length == parseInt(pos2)+1) esUltimoIndice = true" );
                        console.log('esUltimoIndice');
                        console.log(esUltimoIndice);
                        eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2)+1, 0, operacionSeleccionada)" );
                        eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2)+2, 0, varAInsertar)" );
                        /*if(esUltimoIndice) {
                            eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2)+1, 0, operacionSeleccionada)" );
                            eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2)+1, 0, varAInsertar)" );
                        } else {
                            eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2)+1, 0, varAInsertar)" );
                            eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2)+1, 0, operacionSeleccionada)" );
                        }*/
                    } else {
                        var pos1 = posicionIndicadorAgregarEnFormula.substring(posicionIndicadorAgregarEnFormula.lastIndexOf("[")+1);
                        console.log('2');
                        console.log('pos1');
                        console.log(pos1);
                        var pos2 = pos1.substring(0, pos1.lastIndexOf("]"));
                        console.log('pos2');
                        console.log(pos2);
                        eval("formulaTemp.splice( parseInt(pos2)+1, 0, operacionSeleccionada)" );
                        eval("formulaTemp.splice( parseInt(pos2)+2, 0, varAInsertar)" );
                    }
                    //eval("formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice)+1, 0, variableSeleccionada[0])");
                } else {
                    if(posicionIndicadorAgregarEnFormula.split("[").length > 2) {
                        console.log('1');
                        var pos1 = posicionIndicadorAgregarEnFormula.substring(posicionIndicadorAgregarEnFormula.lastIndexOf("[")+1);
                        console.log('pos1');
                        console.log(pos1);
                        var pos2 = pos1.substring(0, pos1.lastIndexOf("]"));
                        console.log('pos2');
                        console.log(pos2);
                        console.log('posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))');
                        console.log(posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("[")));
                        console.log("console.log(formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".length)" );
                        eval("console.log(formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".length)" );
                        eval("console.log(formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".length == parseInt(pos2)+1)" );
                        var esUltimoIndice = false;
                        eval("if (formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".length == parseInt(pos2)+1) esUltimoIndice = true" );
                        console.log('esUltimoIndice');
                        console.log(esUltimoIndice);
                        eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2), 0, operacionSeleccionada)" );
                        eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2), 0, varAInsertar)" );
                        /*if(esUltimoIndice) {
                            eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2)+1, 0, operacionSeleccionada)" );
                            eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2)+1, 0, varAInsertar)" );
                        } else {
                            eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2)+1, 0, varAInsertar)" );
                            eval("formulaTemp"+posicionIndicadorAgregarEnFormula.substring(0, posicionIndicadorAgregarEnFormula.lastIndexOf("["))+".splice( parseInt(pos2)+1, 0, operacionSeleccionada)" );
                        }*/
                    } else {
                        var pos1 = posicionIndicadorAgregarEnFormula.substring(posicionIndicadorAgregarEnFormula.lastIndexOf("[")+1);
                        console.log('2');
                        console.log('pos1');
                        console.log(pos1);
                        var pos2 = pos1.substring(0, pos1.lastIndexOf("]"));
                        console.log('pos2');
                        console.log(pos2);
                        eval("formulaTemp.splice( parseInt(pos2), 0, operacionSeleccionada)" );
                        eval("formulaTemp.splice( parseInt(pos2), 0, varAInsertar)" );
                    }
                    /*if(posicionArreglo.length > 0) {
                        formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice), 0, operacionSeleccionada);
                        formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice), 0, varAInsertar);
                    } else {
                        formulaTemp.splice(parseInt(ultimoIndice), 0, operacionSeleccionada);
                        formulaTemp.splice(parseInt(ultimoIndice), 0, varAInsertar);
                    }*/
                }
                console.log('varAInsertar');
                console.log(varAInsertar);
                console.log('operacionSeleccionada');
                console.log(operacionSeleccionada);
                console.log('formulaTemp');
                console.log(formulaTemp);
                this.agregarFormulaAnchuraYAltura(formulaTemp, true);
                this.setState({
                    operaciones: [],
                    formula: formulaTemp
                });
                var self = this;
                setTimeout(function(){
                    console.log(self.state.formula)
                }, 2000);
                //actualizando campos de variables a mostrar segun el campo que se acaba de agregar
                var tipoOriginal = variableSeleccionada.tipoOriginal;
                if(variableSeleccionada.esFuenteDato) {
                    //solo mostrar campos que sean de conexiones tabla
                    var arregloConexionesTemp = [], arregloCamposConexionesTemp = [];
                    for (var i = 0; i < tablasOriginales.length; i++) {
                        if(tablasOriginales[i].ID == variableSeleccionada.tablaID) {
                            arregloConexionesTemp.push(tablasOriginales[i]);
                            for (var j = 0; j < camposTablasOriginales[i].length; j++) {
                                if(arregloCamposConexionesTemp[arregloConexionesTemp.length-1] == undefined)
                                    arregloCamposConexionesTemp[arregloConexionesTemp.length-1] = [];
                                if(tipoOriginal.localeCompare("int") == 0 || tipoOriginal.localeCompare("decimal") == 0) {
                                    if(camposTablasOriginales[i][j].tipo.localeCompare("int") == 0 || camposTablasOriginales[i][j].tipo.localeCompare("decimal") == 0) {
                                        arregloCamposConexionesTemp[arregloConexionesTemp.length-1].push(camposTablasOriginales[i][j]);
                                    }
                                } else {
                                    if(camposTablasOriginales[i][j].tipo.localeCompare(tipoOriginal) == 0) {
                                        arregloCamposConexionesTemp[arregloConexionesTemp.length-1].push(camposTablasOriginales[i][j]);
                                    }
                                }
                            };
                            break;
                        }
                    };
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
                    if(variableSeleccionada.esObjeto) {
                        var arregloVariablesTemp = [], arregloCamposVariablesTemp = [];
                        for (var i = 0; i < variablesOriginales.length; i++) {
                            if(variablesOriginales[i].ID == variableSeleccionada.variableID) {
                                arregloVariablesTemp.push(variablesOriginales[i]);
                                for (var j = 0; j < camposVariablesOriginales[i].length; j++) {
                                    if(arregloCamposVariablesTemp[arregloVariablesTemp.length-1] == undefined)
                                        arregloCamposVariablesTemp[arregloVariablesTemp.length-1] = [];
                                    if(tipoOriginal.localeCompare("int") == 0 || tipoOriginal.localeCompare("decimal") == 0) {
                                        if(camposVariablesOriginales[i][j].tipo.localeCompare("int") == 0 || camposVariablesOriginales[i][j].tipo.localeCompare("decimal") == 0)
                                            arregloCamposVariablesTemp[arregloVariablesTemp.length-1].push(camposVariablesOriginales[i][j]);
                                    } else {
                                        if(camposVariablesOriginales[i][j].tipo.localeCompare(tipoOriginal) == 0)
                                            arregloCamposVariablesTemp[arregloVariablesTemp.length-1].push(camposVariablesOriginales[i][j]);
                                    }
                                };
                                break;
                            }
                        };
                        this.setState({
                            tablas: [],
                            camposTablas: [],
                            variablesEscalares: variablesEscalaresOriginales,
                            variables: arregloVariablesTemp,
                            camposVariables: arregloCamposVariablesTemp,
                            variablesSQL: [],
                            camposVariablesSQL: []
                        });
                    } else if(variableSeleccionada.esInstruccionSQL) {
                        var arregloVariablesSQLTemp = [], arregloCamposVariablesSQLTemp = [];
                        for (var i = 0; i < variablesOriginalesSQL.length; i++) {
                            if(variablesOriginalesSQL[i].ID == variableSeleccionada.variableID) {
                                arregloVariablesSQLTemp.push(variablesOriginalesSQL[i]);
                                for (var j = 0; j < camposVariablesOriginalesSQL[i].length; j++) {
                                    if(arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length-1] == undefined)
                                        arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length-1] = [];
                                    if(tipoOriginal.localeCompare("int") == 0 || tipoOriginal.localeCompare("decimal") == 0) {
                                        if(camposVariablesOriginalesSQL[i][j].tipo.localeCompare("int") == 0 || camposVariablesOriginalesSQL[i][j].tipo.localeCompare("decimal") == 0)
                                            arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length-1].push(camposVariablesOriginalesSQL[i][j]);
                                    } else {
                                        if(camposVariablesOriginalesSQL[i][j].tipo.localeCompare(tipoOriginal) == 0)
                                            arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length-1].push(camposVariablesOriginalesSQL[i][j]);
                                    }
                                };
                                break;
                            }
                        };
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
                //FIN actualizando campos de variables a mostrar segun el campo que se acaba de agregar
            } else if(this.state.formula.length > 0  && operacionSeleccionada.valor != undefined && operacionSeleccionada.valor.localeCompare("/") == 0) {
                console.log('3')
                //quitar cualquier operacion seleccionada anteriormente
                var formulaTemp = [...this.state.formula];
                for (var i = 0; i < formulaTemp.length; i++) {
                    formulaTemp[i].operacion = 'FORMULA';
                    formulaTemp[i].texto = formulaTemp[i].valor;
                };
                this.setState({
                    formula: formulaTemp
                });
                var arregloVarSeleccionadas = [];
                this.getSelectedVariables (this.state.formula, arregloVarSeleccionadas, '');
                console.log('arregloVarSeleccionadas')
                console.log(arregloVarSeleccionadas)
                if($("div").hasClass("colorPunteroFormula") || arregloVarSeleccionadas.length == 0) {
                    alert("Para agregar una división, seleccione las variables a ser numerador en la fórmula.");
                } else {
                    var tipoOriginal = variableSeleccionada.tipo;
                    variableSeleccionada.tipoOriginal = tipoOriginal;
                    variableSeleccionada.tipo = "variable";
                    variableSeleccionada.texto = variableSeleccionada.valor;
                    variableSeleccionada.operacion = 'FORMULA';
                    //variableSeleccionada.tipoColumnaEnTabla = ;
                    if(this.existeReglaAsignacion(operacionSeleccionada.valor)) {
                        variableSeleccionada.texto = this.retornarCodigoOperacion(operacionSeleccionada.valor) + "(" + variableSeleccionada.valor + ")";
                        variableSeleccionada.operacion = this.retornarCodigoOperacion(operacionSeleccionada.valor);
                    }

                    //separar arreglo arregloVarSeleccionadas por diferentes primer indices, elegir el mas corto y quitar ultimo indice solo si length != 1
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
                    var indicesVarSeleccionadas = [];   //arreglo 2)
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
                        };
                        if(!existe) {
                            arregloVarSeleccionadasPorIndicesInicial.push([arregloVarSeleccionadas[i]]);
                        } else {
                            arregloVarSeleccionadasPorIndicesInicial[j].push(arregloVarSeleccionadas[i]);
                        }
                    };
                    for (var i = 0; i < arregloVarSeleccionadasPorIndicesInicial.length; i++) {
                        var elMasCorto = '';
                        for (var j = 0; j < arregloVarSeleccionadasPorIndicesInicial[i].length; j++) {
                            if(elMasCorto.length == 0) {
                                elMasCorto = arregloVarSeleccionadasPorIndicesInicial[i][j];
                            } else if(elMasCorto.length > arregloVarSeleccionadasPorIndicesInicial[i][j].length) {
                                elMasCorto = arregloVarSeleccionadasPorIndicesInicial[i][j];
                            }
                        };
                        if(elMasCorto.length > 0) {
                            if(elMasCorto.split("[").length > 2) {
                                indicesVarSeleccionadas.push( elMasCorto.substring(0, elMasCorto.lastIndexOf("[")) );
                            } else {
                                indicesVarSeleccionadas.push( elMasCorto );
                            }
                        }
                    };

                    console.log('this.state.formula');
                    console.log(this.state.formula);

                    console.log('indicesVarSeleccionadas');
                    console.log(indicesVarSeleccionadas);
                    console.log('arregloVarSeleccionadasPorIndicesInicial');
                    console.log(arregloVarSeleccionadasPorIndicesInicial);

                    if(indicesVarSeleccionadas.length > 1) {
                        //VER QUE DISTANCIA PRIMEROS INDICES DE ARREGLO
                        var seleccionVariablesContinuas = false;
                        for (var a = 0; a < indicesVarSeleccionadas.length; a++) {
                            var variableAEvaluar;
                            if(indicesVarSeleccionadas[a].split("[").length > 2) {
                                eval("variableAEvaluar = this.state.formula"+indicesVarSeleccionadas[a].substring(0, indicesVarSeleccionadas[a].lastIndexOf("[")) );
                            } else {
                                eval("variableAEvaluar = this.state.formula"+indicesVarSeleccionadas[a]);
                            }
                            console.log('variableAEvaluar');
                            console.log(variableAEvaluar);
                            if(a != 0) {
                                if (variableAEvaluar.tipo.localeCompare("contenedorDivision") == 0) {
                                    var variableDeComparacion;
                                    var indiceOriginal = parseInt(indicesVarSeleccionadas[a].split("]")[0].split("[")[1]);
                                    eval("variableDeComparacion = this.state.formula"+(indiceOriginal-3));
                                    console.log('variableDeComparacion');
                                    console.log(variableDeComparacion);
                                    if(variableDeComparacion.tipo.localeCompare("indicador") == 0 && variableDeComparacion.posicion.localeCompare("derecha") == 0) {
                                        seleccionVariablesContinuas = true;
                                    } else if(variableDeComparacion.tipo.localeCompare("variable") == 0) {
                                        seleccionVariablesContinuas = true;
                                    } else {
                                        seleccionVariablesContinuas = false;
                                        break;
                                    }
                                } else if (variableAEvaluar.tipo.localeCompare("variable") == 0) {
                                    var variableDeComparacion;
                                    var indiceOriginal = parseInt(indicesVarSeleccionadas[a].split("]")[0].split("[")[1]);
                                    eval("variableDeComparacion = this.state.formula"+(indiceOriginal-2));
                                    console.log('variableDeComparacion');
                                    console.log(variableDeComparacion);
                                    if(variableDeComparacion.tipo.localeCompare("indicador") == 0 && variableDeComparacion.posicion.localeCompare("derecha") == 0) {
                                        seleccionVariablesContinuas = true;
                                    } else if(variableDeComparacion.tipo.localeCompare("variable") == 0) {
                                        seleccionVariablesContinuas = true;
                                    } else {
                                        seleccionVariablesContinuas = false;
                                        break;
                                    }
                                }
                            }
                        };

                        if(seleccionVariablesContinuas) {
                            //VER QUE TODAS LAS VARIABLES DE LA DIVISION ESTEN SELECCIONADAS
                            for (var a = 0; a < indicesVarSeleccionadas.length; a++) {
                                var variableAEvaluar;
                                if(indicesVarSeleccionadas[a].split("[").length > 2) {
                                    eval("variableAEvaluar = this.state.formula"+indicesVarSeleccionadas[a].substring(0, indicesVarSeleccionadas[a].lastIndexOf("[")) );
                                } else {
                                    eval("variableAEvaluar = this.state.formula"+indicesVarSeleccionadas[a]);
                                }
                                console.log('variableAEvaluar');
                                console.log(variableAEvaluar);
                                if( Array.isArray(variableAEvaluar.valor) ) {
                                    seleccionValidaVarDivision = true;
                                    this.verificarSeleccionoTodosDivision(variableAEvaluar);
                                    if(!seleccionValidaVarDivision) {
                                        break;
                                    }
                                }
                            };
                            console.log('seleccionValidaVarDivision');
                            console.log(seleccionValidaVarDivision);
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
                        console.log('seleccionVariablesContinuas');
                        console.log(seleccionVariablesContinuas);
                    } else if(indicesVarSeleccionadas.length == 1) {
                        //VIENDO SI SE SELECCIONO SOLO UNA VARIABLE
                        if(arregloVarSeleccionadasPorIndicesInicial[0].length == 1) {
                            //SELECCIONO SOLO UNA VARIABLE
                            var variableAEvaluar;
                            if(arregloVarSeleccionadasPorIndicesInicial[0][0].split("[").length > 2) {
                                eval("variableAEvaluar = this.state.formula"+arregloVarSeleccionadasPorIndicesInicial[0][0].substring(0, arregloVarSeleccionadasPorIndicesInicial[0][0].lastIndexOf("[")) );
                            } else {
                                eval("variableAEvaluar = this.state.formula"+arregloVarSeleccionadasPorIndicesInicial[0][0]);
                            }
                            console.log('variableAEvaluar');
                            console.log(variableAEvaluar);
                            var seleccionVarEnNumerador = true, esAntesDenominador = true;;
                            if(variableAEvaluar.length != undefined) {
                                for (var i = 0; i < variableAEvaluar.length; i++) {
                                    if(!Array.isArray(variableAEvaluar[i].valor) && variableAEvaluar[i].valor.localeCompare("division\\\\") == 0) {
                                        esAntesDenominador = false;
                                    } else if(!Array.isArray(variableAEvaluar[i].valor) && variableAEvaluar[i].activa && !esAntesDenominador) {
                                        seleccionVarEnNumerador = false;
                                        break;
                                    }
                                };
                            }
                            console.log('seleccionVarEnNumerador');
                            console.log(seleccionVarEnNumerador);
                            if(seleccionVarEnNumerador) {
                                //CREANDO ARREGLOS VALORES A INSERTAR
                                var copiaAntiguaVariable, arregloAInsertarNuevo = [];
                                eval("copiaAntiguaVariable = this.state.formula"+arregloVarSeleccionadasPorIndicesInicial[0][0]);
                                var indIzquierdo = {valor: "\\\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"};
                                arregloAInsertarNuevo.push(indIzquierdo);
                                var signoDivision = {valor: "division\\\\", width: "100%", height: "2%", tipo: "division\\\\"};
                                var division = {valor: [copiaAntiguaVariable, signoDivision, variableSeleccionada], width: "90%", height: "49%", tipo: "contenedorDivision"};
                                arregloAInsertarNuevo.push(division);
                                var indDerecho = {valor: "\\\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"};
                                arregloAInsertarNuevo.push(indDerecho);
                                //ELIMINANDO VARIABLES DEL ARREGLO ORIGINAL
                                var copyFormula = [...this.state.formula];
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
                                    if(i == arregloAInsertarNuevo.length - 1) {
                                        eval("copyFormula"+arregloVarSeleccionadasPorIndicesInicial[0][0].substring(0, arregloVarSeleccionadasPorIndicesInicial[0][0].lastIndexOf("["))+".splice("+arregloVarSeleccionadasPorIndicesInicial[0][0].substring(arregloVarSeleccionadasPorIndicesInicial[0][0].lastIndexOf("["))+", 1, arregloAInsertarNuevo[i])");
                                    } else {
                                        eval("copyFormula"+arregloVarSeleccionadasPorIndicesInicial[0][0].substring(0, arregloVarSeleccionadasPorIndicesInicial[0][0].lastIndexOf("["))+".splice("+arregloVarSeleccionadasPorIndicesInicial[0][0].substring(arregloVarSeleccionadasPorIndicesInicial[0][0].lastIndexOf("["))+", 0, arregloAInsertarNuevo[i])");
                                    }
                                };
                                this.agregarFormulaAnchuraYAltura(copyFormula, true);
                                this.setState({
                                    operaciones: [],
                                    formula: copyFormula
                                });
                                var self = this;
                                setTimeout(function(){
                                    console.log(self.state.formula)
                                }, 2000);
                                console.log('copyFormula')
                                console.log(copyFormula);
                            } else {
                                alert("la variable seleccionada debe ser del numerador");
                            }
                        } else if(arregloVarSeleccionadasPorIndicesInicial[0].length > 1) {
                            //SELECCIONO MAS DE UNA VARIABLE
                            var variableAEvaluar, posicionAInsertarNuevaDivsion;
                            if(indicesVarSeleccionadas[0].split("[").length > 2) {
                                eval("variableAEvaluar = this.state.formula"+indicesVarSeleccionadas[0].substring(0, indicesVarSeleccionadas[0].lastIndexOf(".")) );
                                posicionAInsertarNuevaDivsion = indicesVarSeleccionadas[0].substring(0, indicesVarSeleccionadas[0].lastIndexOf("."));
                            } else {
                                if(indicesVarSeleccionadas[0].lastIndexOf(".") != -1) {
                                    eval("variableAEvaluar = this.state.formula"+indicesVarSeleccionadas[0].substring(0, indicesVarSeleccionadas[0].lastIndexOf(".")) );
                                    posicionAInsertarNuevaDivsion = indicesVarSeleccionadas[0];
                                } else {
                                    eval("variableAEvaluar = this.state.formula"+indicesVarSeleccionadas[0] );
                                    posicionAInsertarNuevaDivsion = indicesVarSeleccionadas[0];
                                }
                            }
                            console.log('variableAEvaluar');
                            console.log(variableAEvaluar);
                            seleccionValidaVarDivision = true;
                            this.verificarSeleccionoTodosDivision(variableAEvaluar.valor);
                            console.log('seleccionValidaVarDivision');
                            console.log(seleccionValidaVarDivision);
                            console.log('this.state.formula');
                            console.log(this.state.formula);
                            if(seleccionValidaVarDivision) {
                                var arregloAInsertarNuevo = [], divisionAInsertar;
                                if(variableAEvaluar.tipo.localeCompare("contenedorDivision") == 0) {
                                    console.log('1');
                                    var copiaAntiguaVariable = jQuery.extend(true, {}, variableAEvaluar);
                                    var indIzquierdo = {valor: "\\\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"};
                                    var signoDivision = {valor: "division\\\\", width: "100%", height: "2%", tipo: "division\\\\"};
                                    var indDerecho = {valor: "\\\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"};
                                    var division = {valor: [indIzquierdo, copiaAntiguaVariable, indDerecho, signoDivision, variableSeleccionada], width: "90%", height: "49%", tipo: "contenedorDivision"};
                                    divisionAInsertar = division;
                                    console.log('divisionAInsertar DESPUES');
                                    console.log(divisionAInsertar.valor);
                                } else {
                                    console.log('2');
                                    var copiaAntiguaVariable = jQuery.extend(true, {}, variableAEvaluar);
                                    var indIzquierdo = {valor: "\\\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"};
                                    arregloAInsertarNuevo.push(indIzquierdo);
                                    var signoDivision = {valor: "division\\\\", width: "100%", height: "2%", tipo: "division\\\\"};
                                    var division = {valor: [copiaAntiguaVariable, signoDivision, variableSeleccionada], width: "90%", height: "49%", tipo: "contenedorDivision"};
                                    arregloAInsertarNuevo.push(division);
                                    var indDerecho = {valor: "\\\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"};
                                    arregloAInsertarNuevo.push(indDerecho);
                                    divisionAInsertar = arregloAInsertarNuevo;
                                    console.log('divisionAInsertar DESPUES');
                                    console.log(divisionAInsertar.valor);
                                }
                                var copyFormula = [...this.state.formula];
                                console.log('posicionAInsertarNuevaDivsion');
                                console.log(posicionAInsertarNuevaDivsion);
                                console.log('posicionAInsertarNuevaDivsion.substring(0, posicionAInsertarNuevaDivsion.lastIndexOf("[")) 1');
                                console.log(posicionAInsertarNuevaDivsion.substring(0, posicionAInsertarNuevaDivsion.lastIndexOf("[")));
                                console.log('posicionAInsertarNuevaDivsion.substring(0, posicionAInsertarNuevaDivsion.lastIndexOf("[").substring(0, posicionAInsertarNuevaDivsion.lastIndexOf("]")) 2');
                                console.log( posicionAInsertarNuevaDivsion.substring(0, posicionAInsertarNuevaDivsion.lastIndexOf("[")).substring(0, posicionAInsertarNuevaDivsion.lastIndexOf("]")) );
                                console.log('posicionAInsertarNuevaDivsion.substring(0, posicionAInsertarNuevaDivsion.lastIndexOf(".")) 2');
                                console.log( posicionAInsertarNuevaDivsion.substring(0, posicionAInsertarNuevaDivsion.lastIndexOf(".")) );
                                if(posicionAInsertarNuevaDivsion.split("[").length > 2) {
                                    console.log('1');
                                    var pos1 = posicionAInsertarNuevaDivsion.substring(posicionAInsertarNuevaDivsion.lastIndexOf("[")+1);
                                    console.log('pos1');
                                    console.log(pos1);
                                    var pos2 = pos1.substring(0, pos1.lastIndexOf("]"));
                                    console.log('pos2');
                                    console.log(pos2);
                                    eval("copyFormula"+posicionAInsertarNuevaDivsion.substring(0, posicionAInsertarNuevaDivsion.lastIndexOf("["))+".splice("+pos2+", 1, divisionAInsertar)");
                                } else {
                                    console.log('2');
                                    eval("copyFormula"+posicionAInsertarNuevaDivsion.substring(0, posicionAInsertarNuevaDivsion.lastIndexOf("["))+".splice("+posicionAInsertarNuevaDivsion.substring(0, posicionAInsertarNuevaDivsion.lastIndexOf("."))+", 1, divisionAInsertar)");
                                }
                                //copyFormula[posicionAInsertarNuevaDivsion] = divisionAInsertar;
                                //eval("copyFormula["+posicionAInsertarNuevaDivsion+"] = divisionAInsertar");
                                console.log('copyFormula DESPUES');
                                console.log(copyFormula);
                                identificadorIndicador = 0;
                                this.agregarFormulaAnchuraYAltura(copyFormula, true);
                                this.setState({
                                    operaciones: [],
                                    formula: copyFormula
                                });
                                var self = this;
                                setTimeout(function(){
                                    console.log(self.state.formula)
                                }, 2000);
                            } else {
                                alert("Selección de división invalida. Falta selección de numerador.")
                            }
                        }
                    }

                    //actualizando campos de variables a mostrar segun el campo que se acaba de agregar
                    if(variableSeleccionada.esFuenteDato) {
                        //solo mostrar campos que sean de conexiones tabla
                        var arregloConexionesTemp = [], arregloCamposConexionesTemp = [];
                        for (var i = 0; i < tablasOriginales.length; i++) {
                            if(tablasOriginales[i].ID == variableSeleccionada.tablaID) {
                                arregloConexionesTemp.push(tablasOriginales[i]);
                                for (var j = 0; j < camposTablasOriginales[i].length; j++) {
                                    if(arregloCamposConexionesTemp[arregloConexionesTemp.length-1] == undefined)
                                        arregloCamposConexionesTemp[arregloConexionesTemp.length-1] = [];
                                    if(tipoOriginal.localeCompare("int") == 0 || tipoOriginal.localeCompare("decimal") == 0) {
                                        if(camposTablasOriginales[i][j].tipo.localeCompare("int") == 0 || camposTablasOriginales[i][j].tipo.localeCompare("decimal") == 0)
                                            arregloCamposConexionesTemp[arregloConexionesTemp.length-1].push(camposTablasOriginales[i][j]);
                                    } else {
                                        if(camposTablasOriginales[i][j].tipo.localeCompare(tipoOriginal) == 0)
                                            arregloCamposConexionesTemp[arregloConexionesTemp.length-1].push(camposTablasOriginales[i][j]);
                                    }
                                };
                                break;
                            }
                        };
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
                        if(variableSeleccionada.esObjeto) {
                            var arregloVariablesTemp = [], arregloCamposVariablesTemp = [];
                            for (var i = 0; i < variablesOriginales.length; i++) {
                                if(variablesOriginales[i].ID == variableSeleccionada.variableID) {
                                    arregloVariablesTemp.push(variablesOriginales[i]);
                                    for (var j = 0; j < camposVariablesOriginales[i].length; j++) {
                                        if(arregloCamposVariablesTemp[arregloVariablesTemp.length-1] == undefined)
                                            arregloCamposVariablesTemp[arregloVariablesTemp.length-1] = [];
                                        if(tipoOriginal.localeCompare("int") == 0 || tipoOriginal.localeCompare("decimal") == 0) {
                                            if(camposVariablesOriginales[i][j].tipo.localeCompare("int") == 0 || camposVariablesOriginales[i][j].tipo.localeCompare("decimal") == 0)
                                                arregloCamposVariablesTemp[arregloVariablesTemp.length-1].push(camposVariablesOriginales[i][j]);
                                        } else {
                                            if(camposVariablesOriginales[i][j].tipo.localeCompare(tipoOriginal) == 0)
                                                arregloCamposVariablesTemp[arregloVariablesTemp.length-1].push(camposVariablesOriginales[i][j]);
                                        }
                                    };
                                    break;
                                }
                            };
                            console.log(variablesEscalaresOriginales)
                            this.setState({
                                tablas: [],
                                camposTablas: [],
                                variablesEscalares: variablesEscalaresOriginales,
                                variables: arregloVariablesTemp,
                                camposVariables: arregloCamposVariablesTemp,
                                variablesSQL: [],
                                camposVariablesSQL: []
                            });
                        } else if(variableSeleccionada.esInstruccionSQL) {
                            var arregloVariablesSQLTemp = [], arregloCamposVariablesSQLTemp = [];
                            for (var i = 0; i < variablesOriginalesSQL.length; i++) {
                                if(variablesOriginalesSQL[i].ID == variableSeleccionada.variableID) {
                                    arregloVariablesSQLTemp.push(variablesOriginalesSQL[i]);
                                    for (var j = 0; j < camposVariablesOriginalesSQL[i].length; j++) {
                                        if(arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length-1] == undefined)
                                            arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length-1] = [];
                                        if(tipoOriginal.localeCompare("int") == 0 || tipoOriginal.localeCompare("decimal") == 0) {
                                            if(camposVariablesOriginalesSQL[i][j].tipo.localeCompare("int") == 0 || camposVariablesOriginalesSQL[i][j].tipo.localeCompare("decimal") == 0)
                                                arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length-1].push(camposVariablesOriginalesSQL[i][j]);
                                        } else {
                                            if(camposVariablesOriginalesSQL[i][j].tipo.localeCompare(tipoOriginal) == 0)
                                                arregloCamposVariablesSQLTemp[arregloVariablesSQLTemp.length-1].push(camposVariablesOriginalesSQL[i][j]);
                                        }
                                    };
                                    break;
                                }
                            };
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
                    //FIN actualizando campos de variables a mostrar segun el campo que se acaba de agregar
                }
            } else if( !$("div").hasClass("colorPunteroFormula") ){
                alert("Seleccione una posición en la fórmula.");
            } else if(this.state.formula.length > 0 && $("div").hasClass("colorPunteroFormula") && operacionSeleccionada.valor == undefined) {
                alert("Seleccione una operación.");
            }
        } else {
            alert("Seleccione un campo");
        }
    }

    verificarSeleccionoTodosDivision (arreglo) {
        console.log('arreglo')
        console.log(arreglo)
        //se verifica que todas las variables esten seleccionadas que esten en el denominador, y tofas las vars de los numeradores
        if(seleccionValidaVarDivision) {
            for (var i = 0; i < arreglo.length; i++) {
                console.log('arreglo[i]')
                console.log(arreglo[i])
                if( !Array.isArray(arreglo[i].valor) ) {
                    if( arreglo[i].tipo.localeCompare("variable") == 0 && !arreglo[i].activa ) {
                        console.log('arreglo[i]');
                        console.log(arreglo[i]);
                        seleccionValidaVarDivision = false;
                        return;
                    }
                }
            };
            for (var i = 0; i < arreglo.length; i++) {
                if( Array.isArray(arreglo[i].valor) ) {
                    this.verificarSeleccionoTodosDivision (arreglo[i].valor);
                }
            };
        } else {
            return;
        }
    }

    crearArregloDeFormula () {
        if (this.props.esEditarVar && banderaCargaVariablesINICIO == banderaCargaVariablesFIN) {
            var nuevoArregloFormula = [];
            this.crearObjetosDeArregloDeFormula(nuevoArregloFormula, 0, this.props.formulaSeleccionadaEdit.formula);
            this.agregarFormulaAnchuraYAltura(nuevoArregloFormula, true);
            console.log('nuevoArregloFormula')
            console.log(nuevoArregloFormula)
            this.setState({
                formula: nuevoArregloFormula
            });
        }
    }

    crearObjetosDeArregloDeFormula (arreglo, index, formula) {
        for (var i = index; i < formula.length; i++) {
            if(formula.charAt(i).localeCompare('(') == 0 && !this.props.esEditarVar) {
                //var copiaAntiguaVariable = jQuery.extend(true, {}, variableAEvaluar);
                var indIzquierdo = {valor: "\\\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"};
                arreglo.push(indIzquierdo);
                var signoDivision = {valor: "division\\\\", width: "100%", height: "2%", tipo: "division\\\\"};
                var division = {valor: [], width: "90%", height: "49%", tipo: "contenedorDivision"};
                arreglo.push(division);
                var indDerecho = {valor: "\\\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"};
                arreglo.push(indDerecho);
                this.crearObjetosDeArregloDeFormula(arreglo[arreglo.length-2].valor, (i+1), formula);
                var cierreParentesis = this.encontrarCierreParentesis(i, formula);
                i += cierreParentesis;
            } else if(formula.charAt(i).localeCompare("/") == 0) {
                var signoDivision = {valor: "division\\\\", width: "100%", height: "2%", tipo: "division\\\\"};
                arreglo.push(signoDivision);
            } else if(this.esOperacionAritmetica(formula.charAt(i))) {
                var objeto = {
                    valor: formula.charAt(i),
                    operacion: formula.charAt(i),
                    activa: false,
                    esFuenteDato: false,
                    esObjeto: false,
                    esInstruccionSQL: false,
                    tipo: "signo"
                };
                arreglo.push(objeto);
            } else if(this.esOperacionCompleja(formula, i)) {
                var nombre = this.getPalabraFormula(formula, i);
                nuevoArregloFormula.push({valor: nombre});
            } else if(this.esVariable(formula, i) !== false && formula.charAt(i).localeCompare(')') != 0) {
                var variable = this.esVariable(formula, i);
                var operacion = 'FORMULA', texto = variable.valor;
                if(this.props.esOperacionSQL)
                    operacion = this.props.operacionSQL;
                if(this.props.esOperacionSQL && this.exitseCodigoOperacion(this.props.operacionSQL)) {
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
                arreglo.push(objeto);
                i+=variable.valor.length-1;
            }
        };
    }

    encontrarCierreParentesis (index, formula) {
        var count = 0;
        for (var i = index; i < formula.length; i++) {
            if(formula.charAt(i).localeCompare(')') == 0) {
                return count;
            } else {
                count++;
            }
        }
        return count;
    }

    esOperacionAritmetica (caracter) {
        if(caracter != undefined) {
            if(caracter.localeCompare('+') == 0) {
                return true;
            } else if(caracter.localeCompare('-') == 0) {
                return true;
            } else if(caracter.localeCompare('/') == 0) {
                return true;
            } else if(caracter.localeCompare('*') == 0) {
                return true;
            } else if(caracter.localeCompare('x') == 0) {
                return true;
            }
        }
        return false;
    }

    esOperacionCompleja (formula, posicionCaracter) {
        var palabra = this.getPalabraFormula(formula, posicionCaracter);
        if(palabra.localeCompare('RAND') == 0) {
            return true;
        } else if(palabra.localeCompare('DIA') == 0) {
            return true;
        } else if(palabra.localeCompare('AVERAJE') == 0) {
            return true;
        } else if(palabra.localeCompare('MEDIA') == 0) {
            return true;
        }
        return false;
    }

    getPalabraFormula (formula, posicionCaracter) {
        var variable = '';
        for (var i = posicionCaracter; i < formula.length; i++) {
            if(formula.charAt(i) != "(" && formula.charAt(i) != ")" && formula.charAt(i) != "\\" && 
                formula.charAt(i) != "/" && formula.charAt(i) != "*" && formula.charAt(i) != "[" && 
                formula.charAt(i) != "√" && formula.charAt(i) != "+" && formula.charAt(i) != "-")
                variable+=formula[i];
            else
                return variable;
        };
        return variable;
    }

    esVariable (formula, posicionCaracter) {
        var palabra = this.getPalabraFormula(formula, posicionCaracter);
        for (var i = 0; i < tablasOriginales.length; i++) {
            for (var j = 0; j < camposTablasOriginales[i].length; j++) {
                if(camposTablasOriginales[i][j].valor.localeCompare(palabra) == 0) {
                    return camposTablasOriginales[i][j];
                }
            };
        };
        for (var i = 0; i < variablesEscalaresOriginales.length; i++) {
            if(variablesEscalaresOriginales[i].valor.localeCompare(palabra) == 0) {
                return variablesEscalaresOriginales[i];
            }
        };
        for (var i = 0; i < variablesOriginales.length; i++) {
            for (var j = 0; j < camposVariablesOriginales[i].length; j++) {
                if(camposVariablesOriginales[i][j].valor.localeCompare(palabra) == 0) {
                    return camposVariablesOriginales[i][j];
                }
            };
        };
        for (var i = 0; i < excelOriginales.length; i++) {
            for (var j = 0; j < camposExcelOriginales[i].length; j++) {
                if(camposExcelOriginales[i][j].valor.localeCompare(palabra) == 0) {
                    return camposExcelOriginales[i][j];
                }
            };
        };
        for (var i = 0; i < formasOriginales.length; i++) {
            if(formasOriginales[i].valor.localeCompare(palabra) == 0) {
                return formasOriginales[i];
            }
        };
        for (var i = 0; i < variablesOriginalesSQL.length; i++) {
            for (var j = 0; j < camposVariablesOriginalesSQL[i].length; j++) {
                if(camposVariablesOriginalesSQL[i][j].valor.localeCompare(palabra) == 0) {
                    return camposVariablesOriginalesSQL[i][j];
                }
            };
        };
        return false;
    }

    agregarFormulaAnchuraYAltura(arregloFormula, esIndiceCero) {
        var contadorIndicadoresNumerador = 0, contadorIndicadoresDenominador = 0, contadorSignosNumerador = 0, contadorSignosDenominador = 0, contadorVariablesNumerador = 0, contadorVariablesDenominador = 0, esDespuesDivision = false;
        for (var i = 0; i < arregloFormula.length; i++) {
            if( !Array.isArray(arregloFormula[i].valor) && this.esOperacionAritmetica(arregloFormula[i].valor) ) {
                if(!esDespuesDivision) {
                    contadorSignosNumerador++;
                } else {
                    contadorSignosDenominador++;
                }
            } else if( (!Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("\\\\") != 0 && !this.esOperacionAritmetica(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("division\\\\") != 0) || Array.isArray(arregloFormula[i].valor) ) {
                if(!esDespuesDivision) {
                    contadorVariablesNumerador++;
                } else {
                    contadorVariablesDenominador++;
                }
            } else if( !Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("\\\\") == 0 ) {
                arregloFormula[i].identificadorIndicador = identificadorIndicador;
                identificadorIndicador++;
                if(!esDespuesDivision) {
                    contadorIndicadoresNumerador++;
                } else {
                    contadorIndicadoresDenominador++;
                }
            }
            if ( !Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("division\\\\") == 0 ) {
                esDespuesDivision = true;
            }
        };
        var widthNumerador = 100;
        //var height = 100;
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
            if( !Array.isArray(arregloFormula[i].valor) && this.esOperacionAritmetica(arregloFormula[i].valor) ) {
                arregloFormula[i].width = "2%";
            } else if( (!Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("\\\\") != 0 && !this.esOperacionAritmetica(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("division\\\\") != 0) /*|| Array.isArray(arregloFormula[i].valor)*/ ) {
                if(!esDespuesDivisionWidth) {
                    arregloFormula[i].width = widthNumerador+"%";
                } else {
                    arregloFormula[i].width = widthDenominador+"%";
                }
            } else if( !Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("\\\\") == 0 ) {
                //if(!esIndiceCero) {
                    arregloFormula[i].width = "5%";
                /*} else {
                    arregloFormula[i].width = (widthNumerador*0.05)+"%";
                }*/
            }else if( Array.isArray(arregloFormula[i].valor)) {
                if(!esIndiceCero) {
                    arregloFormula[i].width = "90%";
                } else {
                    arregloFormula[i].width = widthNumerador+"%";
                }
            }
            if ( !Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("division\\\\") == 0 ) {
                arregloFormula[i].height = "2%";
            } else if(!Array.isArray(arregloFormula[i].valor)) {
                if(!esIndiceCero) {
                    if(esDespuesDivision)
                        arregloFormula[i].height = "49%";
                    else
                        arregloFormula[i].height = "100%";
                } else {
                    arregloFormula[i].height = "100%";
                }
            } else if(Array.isArray(arregloFormula[i].valor)) {
                if(!esIndiceCero) {
                    if(esDespuesDivision)
                        arregloFormula[i].height = "49%";
                    else
                        arregloFormula[i].height = "100%";
                } else {
                    arregloFormula[i].height = "100%";
                }
            }
            if ( !Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("division\\\\") == 0 ) {
                esDespuesDivisionWidth = true;
            }
        };
        for (var i = 0; i < arregloFormula.length; i++) {
            if( Array.isArray(arregloFormula[i].valor) ) {
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
    }

    //esNivelRaiz es bandera para saber si el arreglo que se esta recorriendo es el principal/original nivel 0 del arreglo de formulas
    getFormulaAndOperationText (arreglo, esNivelRaiz) {
        for (var i = 0; i < arreglo.length; i++) {
            if( Array.isArray(arreglo[i].valor) ) {
                this.getFormulaAndOperationText(arreglo[i].valor, false);
            } else if( !Array.isArray(arreglo[i].valor) ) {
                if(arreglo[i].operacion != undefined && arreglo[i].operacion.localeCompare("ASIG") == 0) {
                    formulaGuardarFormula += "ASIG("+arreglo[i].valor+")";
                    operacionGuardarFormula = "ASIG";
                } else if(arreglo[i].operacion != undefined && arreglo[i].operacion.localeCompare("COUNT") == 0) {
                    formulaGuardarFormula += "COUNT("+arreglo[i].valor+")";
                    operacionGuardarFormula = "COUNT";
                } else if(arreglo[i].operacion != undefined && arreglo[i].operacion.localeCompare("PROM") == 0) {
                    formulaGuardarFormula += "PROM("+arreglo[i].valor+")";
                    operacionGuardarFormula = "PROM";
                } else if(arreglo[i].operacion != undefined && arreglo[i].operacion.localeCompare("MAX") == 0) {
                    formulaGuardarFormula += "MAX("+arreglo[i].valor+")";
                    operacionGuardarFormula = "MAX";
                } else if(arreglo[i].operacion != undefined && arreglo[i].operacion.localeCompare("MIN") == 0) {
                    formulaGuardarFormula += "MIN("+arreglo[i].valor+")";
                    operacionGuardarFormula = "MIN";
                } else if(arreglo[i].operacion != undefined && arreglo[i].operacion.localeCompare("AUTOSUM") == 0) {
                    formulaGuardarFormula += "AUTOSUM("+arreglo[i].valor+")";
                    operacionGuardarFormula = "AUTOSUM";
                } else if(arreglo[i].operacion != undefined && arreglo[i].operacion.localeCompare("FORMULA") == 0) {
                    if(!esNivelRaiz && i == 0)
                        formulaGuardarFormula += "(";
                    formulaGuardarFormula += arreglo[i].valor;
                    operacionGuardarFormula = "FORMULA";
                } else if(arreglo[i].tipo != undefined && arreglo[i].tipo.localeCompare("signo") == 0) {
                    formulaGuardarFormula += arreglo[i].valor;
                    operacionGuardarFormula = "FORMULA";
                } else if(arreglo[i].tipo != undefined && arreglo[i].tipo.localeCompare("division\\\\") == 0) {
                    formulaGuardarFormula += "/";
                    operacionGuardarFormula = "FORMULA";
                }
            }
            if(!esNivelRaiz && i == arreglo.length-1)
                formulaGuardarFormula += ")";
        };
    }

    iniciarGuardarFormula () {
        console.log('this.state.formula')
        console.log(this.state.formula)
        formulaGuardarFormula = '';
        operacionGuardarFormula = '';
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
        console.log('formulaGuardarFormula');
        console.log(formulaGuardarFormula);
        console.log('operacionGuardarFormula');
        console.log(operacionGuardarFormula);
        console.log('variableSeleccionada');
        console.log(variableSeleccionada);
        var objetoFormula = {variableID: -1, variableCampoID: -1, numeroDeFormulaDeVariable: -1, tablaID: -1, formula: formulaGuardarFormula, operacion: operacionGuardarFormula};
        if(variableSeleccionada.tablaID != undefined) {
            objetoFormula.tablaID = variableSeleccionada.tablaID;
        } else {
            objetoFormula.variableID = variableSeleccionada.variableID;
            objetoFormula.variableCampoID = variableSeleccionada.variableCampoID;
        }
        console.log('objetoFormula');
        console.log(objetoFormula);
        /*console.log('formula');
        console.log(this.state.formula);*/
        //this.props.anadirFormula(formula, this.state.formula);
        variableSeleccionada = {};
        operacionSeleccionada = {};
        if(!this.props.esEditarVar) {
            this.props.anadirFormula(objetoFormula, this.state.formula);
        } else {
            this.props.modificarFormula(objetoFormula, this.state.formula);
        }
        alert("Fórmula guardada.");
        //camposTablas={this.state.camposTablas} variables={this.state.variablesEscalares} objetos={this.state.variables} camposDeObjetos={this.state.camposVariables} excel={this.state.excel} camposDeExcel={this.state.camposDeExcel} formas={this.state.formas} variablesSQL={this.state.variablesSQL} camposVariablesSQL={this.state.camposVariablesSQL}
        //this.guardarVariable(formula);
    }

    guardarVariable (formula) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("update "+this.props.tablaVarEditar+" set formula = '"+formula+"' where ID = "+this.props.idVarEditar, (err, result) => {
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

    actualizarEstadoInputManual (seleccion) {
        seleccionManual = seleccion;
    }

    loadTablas () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Tablas", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        tablasOriginales = result.recordset;
                        banderaCargaVariablesFIN += result.recordset.length;
                        this.setState({
                            tablas: result.recordset
                        }, this.initLoadTablasCampos );
                    });
                }
            });
        }); // fin transaction
    }

    initLoadTablasCampos() {
        var arregloTemp = [];
        for (var i = 0; i < this.state.tablas.length; i++) {
            this.loadTablasCampos(this.state.tablas[i].tabla, i, arregloTemp);
        };
    }

    loadTablasCampos (nombreTabla, index, array) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '"+nombreTabla+"'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var nombreColumnas = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            nombreColumnas.push({valor: result.recordset[i].COLUMN_NAME,tipo: result.recordset[i].DATA_TYPE, esFuenteDato: true, esObjeto: false, esInstruccionSQL: false, tablaID: this.state.tablas[index].ID});
                        };
                        if(array[index] == undefined) {
                            array[index] = [];
                        }
                        array[index] = $.merge(array[index], nombreColumnas);
                        camposTablasOriginales = array;
                        this.setState({
                            camposTablas: array
                        });
                        banderaCargaVariablesINICIO++;
                        this.crearArregloDeFormula();
                    });
                }
            });
        }); // fin transaction
    }

    loadScalarVariables () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Variables where esObjeto = 'false'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaCargaVariablesFIN += result.recordset.length;
                        for (var i = 0; i < result.recordset.length; i++) {
                            this.loadScalarVariablesFields(result.recordset[i]);
                        };
                    });
                }
            });
        }); // fin transaction
    }

    loadScalarVariablesFields (variable) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from VariablesCampos where variableID = "+variable.ID, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var temp = [...this.state.variablesEscalares];
                        for (var i = 0; i < result.recordset.length; i++) {
                            temp.push({valor: result.recordset[i].nombre, tipo: result.recordset[i].tipo, esFuenteDato: false, variableID: variable.ID, variableCampoID: result.recordset[i].ID, esObjeto: variable.esObjeto, esInstruccionSQL: false, nivel: result.recordset[i].nivel})
                        };
                        variablesEscalaresOriginales = temp;
                        this.setState({
                            variablesEscalares: variablesEscalaresOriginales
                        } );
                        banderaCargaVariablesINICIO++;
                        this.crearArregloDeFormula();
                    });
                }
            });
        }); // fin transaction
    }

    loadVariables () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Variables where esObjeto = 'true'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        variablesOriginales = result.recordset;
                        banderaCargaVariablesFIN += result.recordset.length;
                        this.setState({
                            variables: result.recordset
                        }, this.initLoadVariablesCampos );
                    });
                }
            });
        }); // fin transaction
    }

    initLoadVariablesCampos() {
        var arregloTemp = [];
        for (var i = 0; i < this.state.variables.length; i++) {
            this.loadVariablesCampos(this.state.variables[i], i, arregloTemp);
        };
    }

    loadVariablesCampos (variable, index, array) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from VariablesCampos where variableID = "+variable.ID, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var nombreColumnas = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            nombreColumnas.push({valor: result.recordset[i].nombre, tipo: result.recordset[i].tipo, esFuenteDato: false, variableID: variable.ID, variableCampoID: result.recordset[i].ID, esObjeto: variable.esObjeto, esInstruccionSQL: false, nivel: result.recordset[i].nivel});
                        };
                        if(array[index] == undefined) {
                            array[index] = [];
                        }
                        array[index] = $.merge(array[index], nombreColumnas);
                        camposVariablesOriginales = array;
                        this.setState({
                            camposVariables: array
                        });
                        banderaCargaVariablesINICIO++;
                        this.crearArregloDeFormula();
                    });
                }
            });
        }); // fin transaction
    }

    loadVariablesSQL () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Variables where esInstruccionSQL = 'true'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        variablesOriginalesSQL = result.recordset;
                        banderaCargaVariablesFIN += result.recordset.length;
                        this.setState({
                            variablesSQL: result.recordset
                        }, this.initLoadVariablesCamposSQL );
                    });
                }
            });
        }); // fin transaction
    }

    initLoadVariablesCamposSQL() {
        var arregloTemp = [];
        for (var i = 0; i < this.state.variablesSQL.length; i++) {
            this.loadVariablesCamposSQL(this.state.variablesSQL[i], i, arregloTemp);
        };
    }

    loadVariablesCamposSQL (variable, index, array) {
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
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var nombreColumnas = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            nombreColumnas.push({valor: result.recordset[i].nombre, tipo: result.recordset[i].tipo, esFuenteDato: false, variableID: variable.ID, variableCampoID: result.recordset[i].ID, esObjeto: variable.esObjeto, esInstruccionSQL: true,  nivel: 0});
                        };
                        if(array[index] == undefined) {
                            array[index] = [];
                        }
                        array[index] = $.merge(array[index], nombreColumnas);
                        camposVariablesOriginalesSQL = array;
                        this.setState({
                            camposVariablesSQL: array
                        });
                        banderaCargaVariablesINICIO++;
                        this.crearArregloDeFormula();
                    });
                }
            });
        }); // fin transaction
    }

    loadExcel () {
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
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        excelOriginales = result.recordset;
                        banderaCargaVariablesFIN += result.recordset.length;
                        this.setState({
                            excel: result.recordset
                        }, this.initLoadExcelCampos );
                    });
                }
            });
        }); // fin transaction
    }
    initLoadExcelCampos () {
        var arregloTemp = [];
        for (var i = 0; i < this.state.excel.length; i++) {
            this.loadExcelCampos(this.state.excel[i], i, arregloTemp);
        };
    }

    loadExcelCampos (excel, index, array) {
         const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ExcelVariables where excelArchivoID = "+excel.ID, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var nombreColumnas = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            var tipo;
                            if(result.recordset[i].operacion.localeCompare("SUM") == 0 || result.recordset[i].operacion.localeCompare("PROM") == 0 || result.recordset[i].operacion.localeCompare("COUNT") == 0) {
                                tipo = 'decimal';
                            } else if(result.recordset[i].operacion.localeCompare("MIN") == 0 || result.recordset[i].operacion.localeCompare("MAX") == 0 || result.recordset[i].operacion.localeCompare("ASIG") == 0) {
                                if(result.recordset[i].tipo.localeCompare("numero") == 0)
                                    tipo = 'decimal';
                                else
                                    tipo = result.recordset[i].tipo;
                            }
                            nombreColumnas.push({valor: result.recordset[i].nombre, tipo: tipo, esFuenteDato: false, excelArchivoID: excel.ID, excelVariableID: result.recordset[i].ID, esObjeto: false, esInstruccionSQL: false, nivel: 0});
                        };
                        if(array[index] == undefined) {
                            array[index] = [];
                        }
                        array[index] = $.merge(array[index], nombreColumnas);
                        camposExcelOriginales = array;
                        this.setState({
                            camposDeExcel: array
                        });
                        banderaCargaVariablesINICIO++;
                        this.crearArregloDeFormula();
                    });
                }
            });
        }); // fin transaction
    }

    loadFormas () {
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
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var nombreColumnas = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            nombreColumnas.push({valor: result.recordset[i].nombre, tipo: result.recordset[i].tipo, esFuenteDato: false, formaVariableID: result.recordset[i].ID, esObjeto: false, esInstruccionSQL: false, nivel: 0});
                        };
                        formasOriginales = nombreColumnas;
                        this.setState({
                            formas: nombreColumnas
                        });
                        banderaCargaVariablesINICIO++;
                        banderaCargaVariablesFIN++;
                        this.crearArregloDeFormula();
                    });
                }
            });
        }); // fin transaction
    }
    
    render() {
        return (
            <div>
                {this.props.navbar}
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card"}>
                            <div className={"border-top border-bottom"} style={{width: "100%"}}>
                                <div style={{width: "100%"}}>
                                    <div className={"font-20"} style={{height: "45vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#e6e6f2", color: "black", overflowWrap: "break-word", wordWrap: "break-word", whiteSpace: "-moz-pre-wrap", whiteSpace: "pre-wrap"}}>
                                        <Equacion formula={this.state.formula} clickEnFormula={this.clickEnFormula} height={"100%"} width={"100%"} isFirstRow={true} posicionEnArreglo={"0"}></Equacion>
                                    </div>
                                </div>
                                <div style={{width: "100%", height: "250px"}}>
                                    <div style={{width: "50%", height: "100%", float: "left", borderRight: "1px solid black", borderTop: "1px solid black", borderBottom: "1px solid black", padding: "0% 1%", overflowY: "scroll"}}>
                                        <div className={"font-18"} style={{width: "100%", height: "20%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            Seleccionar Variable
                                        </div>
                                        <div className={"row"} style={{height: "100%"}}>
                                            <ListasSeleVariableContenedorVariable esOperacion={false} mostrarRosa={true}  tablas={this.state.tablas} camposTablas={this.state.camposTablas} variables={this.state.variablesEscalares} objetos={this.state.variables} camposDeObjetos={this.state.camposVariables} excel={this.state.excel} camposDeExcel={this.state.camposDeExcel} formas={this.state.formas} variablesSQL={this.state.variablesSQL} camposVariablesSQL={this.state.camposVariablesSQL} seleccionarMultiple={false} retornoSeleccionVariable={this.retornoSeleccionCampo} returnStateManualValue={this.actualizarEstadoInputManual}></ListasSeleVariableContenedorVariable>
                                        </div>
                                    </div>
                                    <div style={{width: "50%", height: "100%", float: "right", borderTop: "1px solid black", borderBottom: "1px solid black", padding: "0% 1%", overflowY: "scroll"}}>
                                        <div className={"font-18"} style={{width: "100%", height: "20%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            Seleccionar Operacion
                                        </div>
                                        <div className={"row"} style={{height: "100%"}}>
                                            <ListasSeleVariableContenedorOperador esOperacion={true} mostrarRosa={false} operaciones={this.state.operaciones} seleccionarMultiple={false} retornoSeleccionVariable={this.retornoSeleccionOperacion}></ListasSeleVariableContenedorOperador>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <div className={"text-center"} style={{width: "100%"}}>
                                    <a href="#" className="btn btn-primary active" onClick={this.agregarAFormula}>Agregar Fórmula</a>
                                </div>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className={"row"}>
                    <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.iniciarGuardarFormula}>Guardar Fórmula</a>
                </div>
                <br/>
            </div>
        );
    }
}
