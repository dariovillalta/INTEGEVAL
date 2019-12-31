import React from 'react';
import ReactDOM from 'react-dom';
import sql from 'mssql';

import Equacion from './Equacion.js';
import ListasSeleVariableContenedorVariable from './ListasSeleVariableContenedorVariable.js';
import ListasSeleVariableContenedorOperador from './ListasSeleVariableContenedorOperador.js';

//const campos = [{valor: "idCLiente", tipo: "variable"}, {valor: "saldoTotal", tipo: "variable"}, {valor: "tipoPersona", tipo: "variable"}, {valor: "impuestosTotal", tipo: "variable"}, {valor: "nombreCliente", tipo: "variable"}, {valor: "diasMora", tipo: "variable"}, {valor: "mesMora", tipo: "variable"}];
//var tablas = [], camposTablas = [];
const operaciones = [{valor: "+", tipo: "signo"}, {valor: "-", tipo: "signo"}, {valor: "*", tipo: "signo"},{valor: "/", tipo: "signo"}, {valor: "COUNT", tipo: "signo"}];
const variables = [];
const objetos = [];
const camposDeObjetos = [];
const anchuraSeccionFormula = ["100%", "50", "33%", "25%", "25%", "17%", "15%", "13%", "11%", "10%", "9%"];

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
            camposTablas: []
        }
        this.clickEnFormula = this.clickEnFormula.bind(this);
        this.retornoClickLista = this.retornoClickLista.bind(this);
        this.agregarAFormula = this.agregarAFormula.bind(this);
        this.updateFormulaState = this.updateFormulaState.bind(this);
        this.getFormula = this.getFormula.bind(this);
        this.crearArregloDeFormula = this.crearArregloDeFormula.bind(this);
        this.esOperacionAritmetica = this.esOperacionAritmetica.bind(this);
        this.esOperacionCompleja = this.esOperacionCompleja.bind(this);
        this.getPalabraFormula = this.getPalabraFormula.bind(this);
        this.agregarFormulaAnchuraYAltura = this.agregarFormulaAnchuraYAltura.bind(this);
        this.findVariableInFormula = this.findVariableInFormula.bind(this);
        this.iniciarGuardarVariable = this.iniciarGuardarVariable.bind(this);
        this.guardarVariable = this.guardarVariable.bind(this);
        this.loadTablas = this.loadTablas.bind(this);
        this.initLoadTablasCampos = this.initLoadTablasCampos.bind(this);
        this.loadTablasCampos = this.loadTablasCampos.bind(this);
    }

    componentDidMount() {
        /*console.log('arrregloPrueba');
        console.log(arrregloPrueba);
        this.findVariableInFormula(arrregloPrueba, "b", '');
        console.log( posicionDeIndicadorSeleccionadoEnFormula );*/
        this.getFormula();
        this.loadTablas();
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
            $("#indicadorIzquierda"+this.state.formula[i].valor).removeClass("colorPunteroFormula");
            $("#indicadorIzquierda"+this.state.formula[i].valor).removeClass("blink");
            $("#indicadorIzquierda"+this.state.formula[i].valor).addClass("highlightFormulaBackground");
            $("#indicadorDerecha"+this.state.formula[i].valor).removeClass("colorPunteroFormula");
            $("#indicadorDerecha"+this.state.formula[i].valor).removeClass("blink");
            $("#indicadorDerecha"+this.state.formula[i].valor).addClass("highlightFormulaBackground");
        };
        if(posicion == null) {
            console.log('1');
            console.log(this.state.formula);
            posicionIndicador = '';
            this.findVariableInFormula(this.state.formula, nombre, '');
            console.log('posicionDeIndicadorSeleccionadoEnFormula');
            console.log(posicionDeIndicadorSeleccionadoEnFormula);
            var temp = [...this.state.formula];
            console.log('temp');
            console.log(temp);
            console.log(temp+posicionDeIndicadorSeleccionadoEnFormula);
            var tempVar;
            eval("tempVar = temp"+posicionDeIndicadorSeleccionadoEnFormula);
            console.log('index = '+index);
            console.log('tempVar');
            console.log(tempVar);
            console.log(tempVar.activa);
            tempVar.activa = !tempVar.activa;
            temp.splice(index, 1, tempVar);
            this.setState({
                formula: temp
            }, console.log(this.state.formula));
        } else if (posicion.localeCompare("izquierda") == 0) {
            console.log('2');
            posicionIndicador = 'izquierda';
            $("#indicadorIzquierda"+nombre).addClass("colorPunteroFormula");
            $("#indicadorIzquierda"+nombre).addClass("blink");
            $("#indicadorIzquierda"+nombre).removeClass("highlightFormulaBackground");
            this.findVariableInFormula(this.state.formula, nombre, '');
            console.log('posicionDeIndicadorSeleccionadoEnFormula');
            console.log(posicionDeIndicadorSeleccionadoEnFormula);
        } else if (posicion.localeCompare("derecha") == 0) {
            console.log('3');
            posicionIndicador = 'derecha';
            $("#indicadorDerecha"+nombre).addClass("colorPunteroFormula");
            $("#indicadorDerecha"+nombre).addClass("blink");
            $("#indicadorDerecha"+nombre).removeClass("highlightFormulaBackground");
            this.findVariableInFormula(this.state.formula, nombre, '');
            console.log('posicionDeIndicadorSeleccionadoEnFormula');
            console.log(posicionDeIndicadorSeleccionadoEnFormula);
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

    retornoClickLista (esOperacionLista, variablesNuevas) {
        if(esOperacionLista) {
            operacionSeleccionada = variablesNuevas;
        } else {
            variableSeleccionada = variablesNuevas;
        }
        console.log('operacionSeleccionada')
        console.log(operacionSeleccionada)
        console.log('variableSeleccionada')
        console.log(variableSeleccionada)
    }

    agregarAFormula () {
        if(this.state.formula.length == 0 && $("div").hasClass("colorPunteroFormula")) {        //caso inicial, agregar primera variable
            var formulaTemp = [...this.state.formula];
            variableSeleccionada[0].activa = false;
            variableSeleccionada[0].tipo = "variable";
            formulaTemp = formulaTemp.concat(variableSeleccionada);
            console.log('formulaTemp 1');
            console.log(formulaTemp);
            this.agregarFormulaAnchuraYAltura(formulaTemp, false);
            console.log('formulaTemp 2');
            console.log(formulaTemp);
            this.setState({
                formula: formulaTemp
            }, console.log(this.state.formula) );
        } else if(this.state.formula.length > 0 && $("div").hasClass("colorPunteroFormula")) {        //caso inicial, agregar primera variable
            var formulaTemp = [...this.state.formula];
            //var formulaTemp = this.state.formula.slice();
            variableSeleccionada[0].activa = false;
            variableSeleccionada[0].tipo = "variable";
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
            console.log('posicionArreglo');
            console.log(posicionArreglo);
            console.log('ultimoIndice');
            console.log(ultimoIndice);
            console.log('formulaTemp');
            console.log(formulaTemp);
            if(posicionIndicador.localeCompare("derecha") == 0) {
                if(posicionArreglo.length > 0) {
                    formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice)+1, 0, variableSeleccionada[0]);
                    formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice)+1, 0, operacionSeleccionada[0]);
                } else {
                    formulaTemp.splice(parseInt(ultimoIndice)+1, 0, variableSeleccionada[0]);
                    formulaTemp.splice(parseInt(ultimoIndice)+1, 0, operacionSeleccionada[0]);
                }
                //eval("formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice)+1, 0, variableSeleccionada[0])");
            } else {
                if(posicionArreglo.length > 0) {
                    formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice), 0, operacionSeleccionada[0]);
                    formulaTemp[posicionArreglo].splice(parseInt(ultimoIndice), 0, variableSeleccionada[0]);
                } else {
                    formulaTemp.splice(parseInt(ultimoIndice), 0, operacionSeleccionada[0]);
                    formulaTemp.splice(parseInt(ultimoIndice), 0, variableSeleccionada[0]);
                }
            }
            console.log('formulaTemp 1');
            console.log(formulaTemp);
            this.agregarFormulaAnchuraYAltura(formulaTemp, false);
            console.log('formulaTemp 2');
            console.log(formulaTemp);
            this.setState({
                formula: formulaTemp
            }, console.log(this.state.formula) );
        } else if( !$("div").hasClass("colorPunteroFormula") ){
            alert("Seleccione una posición en la fórmula.");
        }
        /*var formulaTemp = [...this.state.formula];
        variableSeleccionada[0].activa = false;
        if(ladoIndice.localeCompare("centro") == 0) {
            if(formulaTemp.length >= 3)
                formulaTemp = [];
            formulaTemp = formulaTemp.concat(variableSeleccionada);
            ladoIndice = "izquierda";
        } else if(ladoIndice.localeCompare("izquierda") == 0) {
            if(formulaTemp.length >= 3)
                formulaTemp = [];
            formulaTemp.splice(0, 0, operacionSeleccionada[0]);
            formulaTemp.splice(0, 0, variableSeleccionada[0]);
        } else if(ladoIndice.localeCompare("derecha") == 0) {
            if(formulaTemp.length >= 3)
                formulaTemp = [];
            formulaTemp = formulaTemp.concat(operacionSeleccionada);
            formulaTemp = formulaTemp.concat(variableSeleccionada);
        }
        console.log('formulaTemp')
        console.log(formulaTemp)
        var width;
        if(formulaTemp < anchuraSeccionFormula.length) {
            width = anchuraSeccionFormula[formulaTemp.length-1];
        } else {
            width = anchuraSeccionFormula[anchuraSeccionFormula.length%formulaTemp.length];
        }
        this.setState({
            formula: formulaTemp,
            anchuraSeccionFormula: width
        }, console.log(this.state.formula) );
        console.log('this.state.formula')
        console.log(this.state.formula)*/
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

    iniciarGuardarVariable () {
        var formula = '';
        for (var i = 0; i < this.state.formula.length; i++) {
            formula += this.state.formula[i].valor;
        };
        console.log('formula');
        console.log(formula);
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
                            nombreColumnas.push({valor: result.recordset[i].COLUMN_NAME});
                        };
                        if(array[index] == undefined) {
                            array[index] = [];
                        }
                        array[index] = $.merge(array[index], nombreColumnas);
                        this.setState({
                            camposTablas: array
                        });
                    });
                }
            });
        }); // fin transaction
    }
    
    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"}>
                        <div className={"text-center"} style={{width: "100%"}}>
                            <a href="#" className="btn btn-primary font-bold font-20" onClick={this.props.showVariables}>Ir a Condiciones</a>
                        </div>
                    </div>
                    <div className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"}>
                        <div className={"text-center"} style={{width: "100%"}}>
                            <a href="#" className="btn btn-brand font-bold font-20" onClick={this.props.showVariables}>Crear Variables</a>
                        </div>
                    </div>
                </div>
                <br/>
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
                                            <ListasSeleVariableContenedorVariable esOperacion={false} mostrarRosa={true}  tablas={this.state.tablas} camposTablas={this.state.camposTablas} variables={variables} objetos={objetos} camposDeObjetos={camposDeObjetos} seleccionarMultiple={false} retornoSeleccionVariable={this.retornoClickLista}></ListasSeleVariableContenedorVariable>
                                        </div>
                                    </div>
                                    <div style={{width: "50%", height: "100%", float: "right", borderTop: "1px solid black", borderBottom: "1px solid black", padding: "0% 1%", scroll: "auto"}}>
                                        <div className={"font-18"} style={{width: "100%", height: "20%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            Seleccionar Operacion
                                        </div>
                                        <div className={"row"} style={{height: "100%"}}>
                                            <ListasSeleVariableContenedorOperador esOperacion={true} mostrarRosa={false} operaciones={operaciones} seleccionarMultiple={false} retornoSeleccionVariable={this.retornoClickLista}></ListasSeleVariableContenedorOperador>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <div className={"text-center"} style={{width: "100%"}}>
                                    <a href="#" className="btn btn-primary active" onClick={this.agregarAFormula}>Agregar a Fórmula</a>
                                </div>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className={"text-center"} style={{width: "100%"}}>
                    <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.iniciarGuardarVariable}>Guardar Fórmula</a>
                </div>
                <br/>
            </div>
        );
    }
}
