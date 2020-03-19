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
const operacionesNumero = [{valor: "+", tipo: "signo"}, {valor: "-", tipo: "signo"}, {valor: "*", tipo: "signo"}, {valor: "/", tipo: "signo"}, {valor: "Contar", tipo: "signo"}, {valor: "Calcular Promedio", tipo: "signo"}, {valor: "Máximo", tipo: "signo"}, {valor: "Mínimo", tipo: "signo"}, {valor: "Autosumar", tipo: "signo"}];
const operacionesFecha = [{valor: "Contar", tipo: "signo"}, {valor: "Máximo", tipo: "signo"}, {valor: "Mínimo", tipo: "signo"}, {valor: "Día", tipo: "signo"}, {valor: "Mes", tipo: "signo"}, {valor: "Año", tipo: "signo"}];
const operacionesBoolean = [{valor: "Contar", tipo: "signo"}];
const operacionesCadena = [{valor: "Contar", tipo: "signo"}, {valor: "+", tipo: "signo"}];
/*const operaciones = [{valor: "Asignar Valor Único", tipo: "signo"}, {valor: "Asignar Valor Único Si", tipo: "signo"}, {valor: "Asignar Valor Multiples", tipo: "signo"}, {valor: "Asignar Valor Multiples Si", tipo: "signo"}, {valor: "Contar", tipo: "signo"}, {valor: "Contar Si", tipo: "signo"}];
const operacionesNumero = [{valor: "Asignar Valor Único", tipo: "signo"}, {valor: "Asignar Valor Único Si", tipo: "signo"}, {valor: "Asignar Valor Multiples", tipo: "signo"}, {valor: "Asignar Valor Multiples Si", tipo: "signo"}, {valor: "Contar", tipo: "signo"}, {valor: "Contar Si", tipo: "signo"}, {valor: "Calcular Promedio", tipo: "signo"}, {valor: "Máximo", tipo: "signo"}, {valor: "Mínimo", tipo: "signo"}, {valor: "+", tipo: "signo"}, {valor: "-", tipo: "signo"}, {valor: "*", tipo: "signo"}, {valor: "/", tipo: "signo"}];
const operacionesFecha = [{valor: "Asignar Valor Único", tipo: "signo"}, {valor: "Asignar Valor Único Si", tipo: "signo"}, {valor: "Asignar Valor Multiples", tipo: "signo"}, {valor: "Asignar Valor Multiples Si", tipo: "signo"}, {valor: "Contar", tipo: "signo"}, {valor: "Contar Si", tipo: "signo"}];
const operacionesBoolean = [{valor: "Asignar Valor Único", tipo: "signo"}, {valor: "Asignar Valor Único Si", tipo: "signo"}, {valor: "Asignar Valor Multiples", tipo: "signo"}, {valor: "Asignar Valor Multiples Si", tipo: "signo"}, {valor: "Contar", tipo: "signo"}, {valor: "Contar Si", tipo: "signo"}];
const operacionesCadena = [{valor: "Asignar Valor Único", tipo: "signo"}, {valor: "Asignar Valor Único Si", tipo: "signo"}, {valor: "Asignar Valor Multiples", tipo: "signo"}, {valor: "Asignar Valor Multiples Si", tipo: "signo"}, {valor: "Contar", tipo: "signo"}, {valor: "Contar Si", tipo: "signo"}, {valor: "+", tipo: "signo"}];*/

const variablesEscalares = [];
const objetos = [];
const camposDeObjetos = [];
const anchuraSeccionFormula = ["100%", "50", "33%", "25%", "25%", "17%", "15%", "13%", "11%", "10%", "9%"];

var tablasOriginales = [], camposTablasOriginales = [], variablesEscalaresOriginales = [], variablesOriginales = [], camposVariablesOriginales = [];

var variableSeleccionada = [], operacionSeleccionada = [], posicionDeIndicadorSeleccionadoEnFormula = '', posicionIndicador ='';

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
            operaciones: operacionesCadena,
        }
        this.clickEnFormula = this.clickEnFormula.bind(this);
        this.retornoSeleccionCampo = this.retornoSeleccionCampo.bind(this);
        this.retornoSeleccionOperacion = this.retornoSeleccionOperacion.bind(this);
        this.existeReglaAsignacion = this.existeReglaAsignacion.bind(this);
        this.retornarCodigoOperacion = this.retornarCodigoOperacion.bind(this);
        this.agregarAFormula = this.agregarAFormula.bind(this);
        this.updateFormulaState = this.updateFormulaState.bind(this);
        this.getFormula = this.getFormula.bind(this);
        this.crearArregloDeFormula = this.crearArregloDeFormula.bind(this);
        this.esOperacionAritmetica = this.esOperacionAritmetica.bind(this);
        this.esOperacionCompleja = this.esOperacionCompleja.bind(this);
        this.getPalabraFormula = this.getPalabraFormula.bind(this);
        this.agregarFormulaAnchuraYAltura = this.agregarFormulaAnchuraYAltura.bind(this);
        this.findVariableInFormula = this.findVariableInFormula.bind(this);
        this.iniciarGuardarFormula = this.iniciarGuardarFormula.bind(this);
        this.guardarVariable = this.guardarVariable.bind(this);
        this.loadTablas = this.loadTablas.bind(this);
        this.initLoadTablasCampos = this.initLoadTablasCampos.bind(this);
        this.loadTablasCampos = this.loadTablasCampos.bind(this);
        this.loadScalarVariables = this.loadScalarVariables.bind(this);
        this.loadScalarVariablesFields = this.loadScalarVariablesFields.bind(this);
        this.loadVariables = this.loadVariables.bind(this);
        this.initLoadVariablesCampos = this.initLoadVariablesCampos.bind(this);
        this.loadVariablesCampos = this.loadVariablesCampos.bind(this);
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
    }

    findVariableInFormula (arreglo, variable, posicionEnArreglo) {
        for (var i = 0; i < arreglo.length; i++) {
            if( !Array.isArray(arreglo[i].valor) && arreglo[i].valor.localeCompare(variable) == 0) {
                posicionDeIndicadorSeleccionadoEnFormula = posicionEnArreglo+'['+i+']';
            } else if( Array.isArray(arreglo[i].valor) ) {
                this.findVariableInFormula (arreglo[i].valor, variable, posicionEnArreglo+'['+i+'].valor');
            }
        };
    }

    clickEnFormula (e, posicion, nombre, index) {
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
            $("#indicadorIzquierda"+this.state.formula[i].valor+i).removeClass("colorPunteroFormula");
            $("#indicadorIzquierda"+this.state.formula[i].valor+i).removeClass("blink");
            $("#indicadorIzquierda"+this.state.formula[i].valor+i).addClass("highlightFormulaBackground");
            $("#indicadorDerecha"+this.state.formula[i].valor+i).removeClass("colorPunteroFormula");
            $("#indicadorDerecha"+this.state.formula[i].valor+i).removeClass("blink");
            $("#indicadorDerecha"+this.state.formula[i].valor+i).addClass("highlightFormulaBackground");
        };
        if(posicion == null) {
            posicionIndicador = '';
            this.findVariableInFormula(this.state.formula, nombre, '');
            var temp = [...this.state.formula];
            var tempVar;
            eval("tempVar = temp"+posicionDeIndicadorSeleccionadoEnFormula);
            tempVar.activa = !tempVar.activa;
            temp.splice(index, 1, tempVar);
            this.setState({
                formula: temp
            }, console.log(this.state.formula));
        } else if (posicion.localeCompare("izquierda") == 0) {
            console.log('2');
            posicionIndicador = 'izquierda';
            $("#indicadorIzquierda"+nombre+index).addClass("colorPunteroFormula");
            $("#indicadorIzquierda"+nombre+index).addClass("blink");
            $("#indicadorIzquierda"+nombre+index).removeClass("highlightFormulaBackground");
            this.findVariableInFormula(this.state.formula, nombre, '');
        } else if (posicion.localeCompare("derecha") == 0) {
            console.log('3');
            posicionIndicador = 'derecha';
            $("#indicadorDerecha"+nombre+index).addClass("colorPunteroFormula");
            $("#indicadorDerecha"+nombre+index).addClass("blink");
            $("#indicadorDerecha"+nombre+index).removeClass("highlightFormulaBackground");
            this.findVariableInFormula(this.state.formula, nombre, '');
        } else if (posicion.localeCompare("empty") == 0) {
            if($("#indicadorFormulaVacia").hasClass("colorPunteroFormula")) {
                $("#indicadorFormulaVacia").removeClass("blink");
                $("#indicadorFormulaVacia").removeClass("colorPunteroFormula");
            } else {
                $("#indicadorFormulaVacia").addClass("blink");
                $("#indicadorFormulaVacia").addClass("colorPunteroFormula");
            }
        }
    }

    retornoSeleccionCampo (esOperacion, variable, posicionTabla) {
        if(variable[0].valor.length > 0) {
            var columnaSeleccionada = variable[0];
            variableSeleccionada = variable[0];
            console.log('variableSeleccionada');
            console.log(variableSeleccionada);
            var tipoVariable = '';
            if(columnaSeleccionada.tipo.localeCompare("int") == 0) {
                tipoVariable = 'int';
                this.setState({
                    operaciones: operacionesNumero
                });
            } else if(columnaSeleccionada.tipo.localeCompare("decimal") == 0) {
                tipoVariable = 'decimal';
                this.setState({
                    operaciones: operacionesNumero
                });
            } else if(columnaSeleccionada.tipo.localeCompare("varchar") == 0) {
                tipoVariable = 'varchar';
                this.setState({
                    operaciones: operacionesCadena
                });
            } else if(columnaSeleccionada.tipo.localeCompare("date") == 0) {
                tipoVariable = 'date';
                this.setState({
                    operaciones: operacionesFecha
                });
            } else if(columnaSeleccionada.tipo.localeCompare("bit") == 0) {
                tipoVariable = 'bit';
                this.setState({
                    operaciones: operacionesBoolean
                });
            }
            this.props.retornoCampo(columnaSeleccionada, tipoVariable, posicionTabla);
            this.props.retornoTipoDeAsignacion(tipoVariable);
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
                (this.state.operaciones[i].valor.localeCompare("Mínimo") == 0 && this.state.operaciones[i].valor.localeCompare(operacion) == 0) /*|| 
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
        if(codigo.localeCompare("Sumar") == 0) {
            return "SUM";
        }
    }

    agregarAFormula () {
        console.log('this.state.formula')
        console.log(this.state.formula)
        if(this.state.formula.length == 0 && $("div").hasClass("colorPunteroFormula")) {        //caso inicial, agregar primera variable
            var formulaTemp = [...this.state.formula];
            variableSeleccionada.activa = false;
            variableSeleccionada.tipo = "variable";
            variableSeleccionada.texto = variableSeleccionada.valor;
            variableSeleccionada.operacion = '';
            //variableSeleccionada.tipoColumnaEnTabla = ;
            if(this.existeReglaAsignacion(operacionSeleccionada.valor)) {
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
            setTimeout(function(){
                console.log(self.state.formula)
            }, 2000);

            //actualizando campos de variables a mostrar segun el campo que se acaba de agregar
            if(variableSeleccionada.esFuenteDato) {
                //solo mostrar campos que sean de conexiones tabla
                var arregloConexionesTemp = [], arregloCamposConexionesTemp = [];
                for (var i = 0; i < tablasOriginales.length; i++) {
                    if(tablasOriginales[i].ID == variableSeleccionada.idConexionTabla) {
                        arregloConexionesTemp.push(tablasOriginales[i]);
                        for (var j = 0; j < camposTablasOriginales[i].length; j++) {
                            if(arregloCamposConexionesTemp[arregloConexionesTemp.length-1] == undefined)
                                arregloCamposConexionesTemp[arregloConexionesTemp.length-1] = [];
                            arregloCamposConexionesTemp[arregloConexionesTemp.length-1].push(camposTablasOriginales[i][j]);
                        };
                        break;
                    }
                };
                this.setState({
                    tablas: arregloConexionesTemp,
                    camposTablas: arregloCamposConexionesTemp,
                    variablesEscalares: [],
                    variables: [],
                    camposVariables: []
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
                                arregloCamposVariablesTemp[arregloVariablesTemp.length-1].push(camposVariablesOriginales[i][j]);
                            };
                            break;
                        }
                    };
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
        } else if(this.state.formula.length > 0 && $("div").hasClass("colorPunteroFormula")) {
            var formulaTemp = [...this.state.formula];
            //var formulaTemp = this.state.formula.slice();
            for (var i = 0; i < formulaTemp.length; i++) {
                //if(formulaTemp[i].operacion.localeCompare("ASIG")) {
                    formulaTemp[i].operacion = 'FORMULA';
                //}
            };
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
            //var tempVar;
            //eval("tempVar = temp"+posicionArreglo);
            operacionSeleccionada.operacion = operacionSeleccionada.valor;
            if(operacionSeleccionada.valor.localeCompare("/") != 0) {
                if(posicionIndicador.localeCompare("derecha") == 0) {
                    if(posicionArreglo.length > 0) {
                        formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice)+1, 0, variableSeleccionada);
                        formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice)+1, 0, operacionSeleccionada);
                    } else {
                        formulaTemp.splice(parseInt(ultimoIndice)+1, 0, variableSeleccionada);
                        formulaTemp.splice(parseInt(ultimoIndice)+1, 0, operacionSeleccionada);
                    }
                    //eval("formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice)+1, 0, variableSeleccionada[0])");
                } else {
                    if(posicionArreglo.length > 0) {
                        formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice), 0, operacionSeleccionada);
                        formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice), 0, variableSeleccionada);
                    } else {
                        formulaTemp.splice(parseInt(ultimoIndice), 0, operacionSeleccionada);
                        formulaTemp.splice(parseInt(ultimoIndice), 0, variableSeleccionada);
                    }
                }
            } else {
                //
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
            setTimeout(function(){
                console.log(self.state.formula)
            }, 2000);
        } else if( !$("div").hasClass("colorPunteroFormula") ){
            alert("Seleccione una posición en la fórmula.");
        }
    }

    updateFormulaState (nuevaFormula) {
        if(this.validarNuevaFormula(nuevaFormula)) {
            this.setState({
                formula: this.state.formula + nuevaFormula
            });
        }
    }

    getFormula () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select formula from "+this.props.tablaVarEditar+" where ID = "+this.props.idVarEditar, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            this.crearArregloDeFormula(result.recordset[0].formula);
                        }
                    });
                }
            });
        }); // fin transaction
    }

    crearArregloDeFormula (formula) {
        console.log('formula');
        console.log(formula);
        var nuevoArregloFormula = [];
        for (var i = 0; i < formula.length; i++) {
            var variableProcesarFormula = getPalabraFormula
            if(formula.charAt(i).localeCompare('(') == 0 || formula.charAt(i).localeCompare(')') == 0) {
                nuevoArregloFormula.push({valor: "seleccion"});
            } else if(formula.charAt(i).localeCompare('[') == 0) {
                //
            } else if(this.esOperacionAritmetica(formula.charAt(i))) {
                nuevoArregloFormula.push({valor: formula.charAt(i)});
            } else if(this.esOperacionCompleja(formula, i)) {
                var nombre = this.getPalabraFormula(formula, i);
                nuevoArregloFormula.push({valor: nombre});
            } else if(this.esVariable(formula, i)) {
                var nombre = this.getPalabraFormula(formula, i);
                nuevoArregloFormula.push({valor: nombre});
            }
        };
        this.agregarFormulaAnchuraYAltura(nuevoArregloFormula);
    }

    esOperacionAritmetica (caracter) {
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
        for (var i = 0; i < campos.length; i++) {
            if(campos[i].nombre.localeCompare(palabra) == 0) {
                return true;
            }
        };
        for (var i = 0; i < variables.length; i++) {
            if(variables[i].nombre.localeCompare(palabra) == 0) {
                return true;
            }
        };
        for (var i = 0; i < objetos.length; i++) {
            for (var j = 0; j < camposDeObjetos[i].length; j++) {
                if(camposDeObjetos[i][j].nombre.localeCompare(palabra) == 0) {
                    return true;
                }
            };
        };
        return false;
    }

    agregarFormulaAnchuraYAltura(arregloFormula, esDivision) {
        var contadorIndicadoresNumerador = 0, contadorIndicadoresDenominador = 0, contadorSignosNumerador = 0, contadorSignosDenominador = 0, contadorVariablesNumerador = 0, contadorVariablesDenominador = 0, esDespuesDivision = false;
        for (var i = 0; i < arregloFormula.length; i++) {
            if( !Array.isArray(arregloFormula[i].valor) && this.esOperacionAritmetica(arregloFormula[i].valor) ) {
                if(!esDespuesDivision) {
                    contadorSignosNumerador++;
                } else {
                    contadorSignosDenominador++;
                }
            } else if( (!Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("\\") != 0 && !this.esOperacionAritmetica(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("division\\") != 0) || Array.isArray(arregloFormula[i].valor) ) {
                if(!esDespuesDivision) {
                    contadorVariablesNumerador++;
                } else {
                    contadorVariablesDenominador++;
                }
            } else if( !Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("\\") == 0 ) {
                if(!esDespuesDivision) {
                    contadorIndicadoresNumerador++;
                } else {
                    contadorIndicadoresDenominador++;
                }
            }
            if ( arregloFormula[i].valor.localeCompare("division\\") == 0 ) {
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

        for (var i = 0; i < arregloFormula.length; i++) {
            if( !Array.isArray(arregloFormula[i].valor) && this.esOperacionAritmetica(arregloFormula[i].valor) ) {
                arregloFormula[i].width = "2%";
            } else if( (!Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("\\") != 0 && !this.esOperacionAritmetica(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("division\\") != 0) || Array.isArray(arregloFormula[i].valor) ) {
                if(!esDespuesDivision) {
                    arregloFormula[i].width = widthNumerador+"%";
                } else {
                    arregloFormula[i].width = widthDenominador+"%";
                }
            } else if( !Array.isArray(arregloFormula[i].valor) && arregloFormula[i].valor.localeCompare("\\") == 0 ) {
                arregloFormula[i].width = "5%";
            }
            if ( arregloFormula[i].valor.localeCompare("division\\") == 0 ) {
                arregloFormula[i].height = "2%";
            } else {
                if(esDivision) {
                    arregloFormula[i].height = "49%";
                } else {
                    arregloFormula[i].height = "100%";
                }
            }
        };
        for (var i = 0; i < arregloFormula.length; i++) {
            if( Array.isArray(arregloFormula[i].valor) ) {
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

    iniciarGuardarFormula () {
        var formula = '';
        console.log('this.state.formula')
        console.log(this.state.formula)
        var operacion = '';
        for (var i = 0; i < this.state.formula.length; i++) {
            if(this.state.formula[i].operacion != undefined && this.state.formula[i].operacion.localeCompare("ASIG") == 0) {
                formula += "ASIG("+this.state.formula[i].valor+")";
                operacion = "ASIG";
            } else if(this.state.formula[i].operacion != undefined && this.state.formula[i].operacion.localeCompare("COUNT") == 0) {
                formula += this.state.formula[i].valor;
                operacion = "COUNT";
            } else if(this.state.formula[i].operacion != undefined && this.state.formula[i].operacion.localeCompare("PROM") == 0) {
                formula += this.state.formula[i].valor;
                operacion = "PROM";
            } else if(this.state.formula[i].operacion != undefined && this.state.formula[i].operacion.localeCompare("MAX") == 0) {
                formula += this.state.formula[i].valor;
                operacion = "MAX";
            } else if(this.state.formula[i].operacion != undefined && this.state.formula[i].operacion.localeCompare("MIN") == 0) {
                formula += this.state.formula[i].valor;
                operacion = "MIN";
            } else if(this.state.formula[i].operacion != undefined && this.state.formula[i].operacion.localeCompare("SUM") == 0) {
                formula += this.state.formula[i].valor;
                operacion = "SUM";
            } else {
                formula += this.state.formula[i].valor;
                operacion = "FORMULA";
            }
        };
        console.log('formula');
        console.log(formula);
        var objetoFormula = {variableID: -1, variableCampoID: -1, numeroDeFormulaDeVariable: -1, formula: formula, operacion: operacion};
        /*console.log('formula');
        console.log(this.state.formula);*/
        //this.props.anadirFormula(formula, this.state.formula);
        variableSeleccionada = {};
        operacionSeleccionada = {};
        this.props.anadirFormula(objetoFormula, this.state.formula);
        alert("Fórmula guardada.");
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
                    if (!rolledBack) {
                        console.log(err);
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
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        tablasOriginales = result.recordset;
                        console.log('tablasOriginales');
                        console.log(tablasOriginales);
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
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var nombreColumnas = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            nombreColumnas.push({valor: result.recordset[i].COLUMN_NAME,tipo: result.recordset[i].DATA_TYPE, esFuenteDato: true, idConexionTabla: this.state.tablas[index].ID});
                        };
                        if(array[index] == undefined) {
                            array[index] = [];
                        }
                        array[index] = $.merge(array[index], nombreColumnas);
                        camposTablasOriginales = array;
                        console.log('camposTablasOriginales');
                        console.log(camposTablasOriginales);
                        this.setState({
                            camposTablas: array
                        });
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
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
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
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var temp = [...this.state.variablesEscalares];
                        for (var i = 0; i < result.recordset.length; i++) {
                            temp.push({valor: result.recordset[i].nombre, tipo: result.recordset[i], esFuenteDato: false, variableID: variable.ID, variableCampoID: result.recordset[i].ID, esObjeto: variable.esObjeto})
                        };
                        variablesEscalaresOriginales = temp;
                        console.log('variablesEscalaresOriginales');
                        console.log(variablesEscalaresOriginales);
                        this.setState({
                            variablesEscalares: temp
                        } );
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
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        variablesOriginales = result.recordset;
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
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var nombreColumnas = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            nombreColumnas.push({valor: result.recordset[i].nombre, tipo: result.recordset[i].tipo, esFuenteDato: false, variableID: variable.ID, variableCampoID: result.recordset[i].ID, esObjeto: variable.esObjeto});
                        };
                        if(array[index] == undefined) {
                            array[index] = [];
                        }
                        array[index] = $.merge(array[index], nombreColumnas);
                        camposVariablesOriginales = array;
                        console.log('camposVariablesOriginales');
                        console.log(camposVariablesOriginales);
                        this.setState({
                            camposVariables: array
                        });
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
                                            <ListasSeleVariableContenedorVariable esOperacion={false} mostrarRosa={true}  tablas={this.state.tablas} camposTablas={this.state.camposTablas} variables={this.state.variablesEscalares} objetos={this.state.variables} camposDeObjetos={this.state.camposVariables} seleccionarMultiple={false} retornoSeleccionVariable={this.retornoSeleccionCampo}></ListasSeleVariableContenedorVariable>
                                        </div>
                                    </div>
                                    <div style={{width: "50%", height: "100%", float: "right", borderTop: "1px solid black", borderBottom: "1px solid black", padding: "0% 1%", scroll: "auto"}}>
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
