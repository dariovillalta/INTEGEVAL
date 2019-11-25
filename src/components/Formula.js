import React from 'react';
import ReactDOM from 'react-dom';
import sql from 'mssql';

import Equacion from './Equacion.js';
import ListasSeleVariableContenedorVariable from './ListasSeleVariableContenedorVariable.js';
import ListasSeleVariableContenedorOperador from './ListasSeleVariableContenedorOperador.js';

const campos = [{nombre: "idCLiente"}, {nombre: "saldoTotal"}, {nombre: "tipoPersona"}, {nombre: "impuestosTotal"}, {nombre: "nombreCliente"}, {nombre: "diasMora"}, {nombre: "mesMora"}];
const operaciones = [{nombre: "+"}, {nombre: "-"}, {nombre: "x"},{nombre: "/"}];
const variables = [];
const objetos = [];
const camposDeObjetos = [];
const anchuraSeccionFormula = ["100%", "50", "33%", "25%", "25%", "17%", "15%", "13%", "11%", "10%", "9%"];

var variableSeleccionada = [], operacionSeleccionada = [];
var ladoIndice = "centro";

//var arrregloPrueba = [{valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"}, {valor: [{valor: "a", width: "100%", height: "49%", tipo: "variable"}, {valor: "division\\", width: "100%", height: "2%", tipo: "division\\"}, {valor: "b", width: "100%", height: "49%", tipo: "variable"}], width: "90%", height: "100%", tipo: "contenedorDivision"}, {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"}];
//var arrregloPrueba = [{valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"}, {valor: [{valor: "a", width: "49%", height: "49%", tipo: "variable"}, {valor: "-", width: "2%", height: "49%", tipo: "signo"}, {valor: "m", width: "49%", height: "49%", tipo: "variable"}, {valor: "division\\", width: "100%", height: "2%", tipo: "division\\"}, {valor: "b", width: "100%", height: "49%", tipo: "variable"}], width: "90%", height: "100%", tipo: "contenedorDivision"}, {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"}];
//var arrregloPrueba = [{valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"}, {valor: [{valor: "a", width: "49%", height: "49%", tipo: "variable"}, {valor: "-", width: "2%", height: "49%", tipo: "signo"}, {valor: "m", width: "49%", height: "49%", tipo: "variable"}, {valor: "division\\", width: "100%", height: "2%", tipo: "division\\"}, {valor: "b", width: "32%", height: "49%", tipo: "variable"}, {valor: "+", width: "2%", height: "49%", tipo: "signo"}, {valor: "zsasasas", width: "32%", height: "49%", tipo: "variable"}, {valor: "*", width: "2%", height: "49%", tipo: "signo"}, {valor: "d", width: "32%", height: "49%", tipo: "variable"}], width: "90%", height: "100%", tipo: "contenedorDivision"}, {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"}];
//var arrregloPrueba = [{valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"}, {valor: "a", width: "90%", height: "100%", tipo: "variable"}, {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"}];
var arrregloPrueba = [{valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "izquierda"}, 
                        {valor: [{valor: "a", width: "49%", height: "49%", tipo: "variable"},
                            {valor: "-", width: "2%", height: "49%", tipo: "signo"},
                            {valor: "\\", width: "5%", height: "49%", tipo: "indicador", posicion: "izquierda"},
                            {valor: [{valor: "saldo", width: "100%", height: "49%", tipo: "variable"},
                                {valor: "division\\", width: "100%", height: "2%", tipo: "division\\"},
                                {valor: "local", width: "100%", height: "49%", tipo: "variable"}]
                            , width: "39%", height: "49%", tipo: "contenedorDivision"},
                            {valor: "\\", width: "5%", height: "49%", tipo: "indicador", posicion: "derecha"},
                            {valor: "division\\", width: "100%", height: "2%", tipo: "division\\"},
                            {valor: "b", width: "100%", height: "49%", tipo: "variable"}]
                        , width: "90%", height: "100%", tipo: "contenedorDivision"},
                        {valor: "\\", width: "5%", height: "100%", tipo: "indicador", posicion: "derecha"}];
export default class Formula extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formula: [],
            anchuraSeccionFormula
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
        this.agregarFormulaAnchuraCoordinadas = this.agregarFormulaAnchuraCoordinadas.bind(this);
    }

    clickEnFormula (e, posicion, nombre, index) {
        e.stopPropagation()
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
        console.log(nueva);
        for (var i = 0; i < this.state.formula.length; i++) {
            $("#indicadorIzquierda"+this.state.formula[i].nombre).removeClass("colorPunteroFormula");
            $("#indicadorIzquierda"+this.state.formula[i].nombre).removeClass("blink");
            $("#indicadorIzquierda"+this.state.formula[i].nombre).addClass("highlightFormulaBackground");
            $("#indicadorDerecha"+this.state.formula[i].nombre).removeClass("colorPunteroFormula");
            $("#indicadorDerecha"+this.state.formula[i].nombre).removeClass("blink");
            $("#indicadorDerecha"+this.state.formula[i].nombre).addClass("highlightFormulaBackground");
        };
        if(posicion == null) {
            console.log(this.state.formula);
            var temp = [...this.state.formula];
            var tempVar = temp[index];
            console.log('index = '+index);
            console.log('tempVar');
            console.log(tempVar);
            tempVar.activa = !tempVar.activa;
            temp.splice(index, 1, tempVar);
            this.setState({
                formula: temp
            }, console.log(this.state.formula));
            /*var centro = e.target.clientWidth/ 2;
            console.log('centro');
            console.log(centro);
            console.log('e.clientX');
            console.log(e.clientX);
            if(e.clientX-node.getBoundingClientRect().x <= centro) {
                $("#indicadorIzquierda"+nombre).addClass("colorPunteroFormula");
                $("#indicadorIzquierda"+nombre).addClass("blink");
            } else {
                $("#indicadorDerecha"+nombre).addClass("colorPunteroFormula");
                $("#indicadorDerecha"+nombre).addClass("blink");
            }*/
        } else if (posicion.localeCompare("izquierda") == 0) {
            $("#indicadorIzquierda"+nombre).addClass("colorPunteroFormula");
            $("#indicadorIzquierda"+nombre).addClass("blink");
            $("#indicadorIzquierda"+nombre).removeClass("highlightFormulaBackground");
        } else if (posicion.localeCompare("derecha") == 0) {
            $("#indicadorDerecha"+nombre).addClass("colorPunteroFormula");
            $("#indicadorDerecha"+nombre).addClass("blink");
            $("#indicadorDerecha"+nombre).removeClass("highlightFormulaBackground");
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
        var formulaTemp = [...this.state.formula];
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
        console.log(this.state.formula)
    }

    updateFormulaState (nuevaFormula) {
        if(this.validarNuevaFormula(nuevaFormula)) {
            this.setState({
                formula: this.state.formula + nuevaFormula
            });
        }
    }

    getFormula () {
        var formula = '\\var1\\';
        this.crearArregloDeFormula();
    }

    crearArregloDeFormula (formula) {
        console.log('formula');
        console.log(formula);
        var nuevoArregloFormula = [];
        for (var i = 0; i < formula.length; i++) {
            if(formula.charAt(i).localeCompare('\\') == 0) {
                nuevoArregloFormula.push({nombre: "seleccion", posicionX: 0, posicionY: 0});
            } else if(formula.charAt(i).localeCompare('[') == 0) {
                //
            } else if(this.esOperacionAritmetica(formula.charAt(i))) {
                nuevoArregloFormula.push({nombre: formula.charAt(i), posicionX: 0, posicionY: 0});
            } else if(this.esOperacionCompleja(formula, i)) {
                var nombre = this.getPalabraFormula(formula, i);
                nuevoArregloFormula.push({nombre: nombre, posicionX: 0, posicionY: 0});
            } else if(this.esVariable(formula, i)) {
                var nombre = this.getPalabraFormula(formula, i);
                nuevoArregloFormula.push({nombre: nombre, posicionX: 0, posicionY: 0});
            }
        };
        this.agregarFormulaAnchuraCoordinadas(nuevoArregloFormula);
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

    agregarFormulaAnchuraCoordinadas(nuevoArregloFormula) {
        var width = 0, posicionX = 0, posicionY = 0;
        for (var i = 0; i < nuevoArregloFormula.length; i++) {
            if (nuevoArregloFormula[i].length == undefined) {
                //
            }
        };
        this.setState({
            formula: formulaTemp,
            anchuraSeccionFormula: width
        }, console.log(this.state.formula) );
    }
    
    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card"}>
                            <div className={"border-top border-bottom"} style={{width: "100%"}}>
                                <div style={{width: "100%"}}>
                                    <div className={"font-20"} style={{height: "45vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#e6e6f2", color: "black", overflowWrap: "break-word", wordWrap: "break-word", whiteSpace: "-moz-pre-wrap", whiteSpace: "pre-wrap"}}>
                                        <Equacion formula={arrregloPrueba} clickEnFormula={this.clickEnFormula} height={"100%"} width={"100%"}   isFirstRow={true}></Equacion>
                                    </div>
                                </div>
                                <div style={{width: "100%", height: "250px"}}>
                                    <div style={{width: "50%", height: "100%", float: "left", borderRight: "1px solid black", borderTop: "1px solid black", borderBottom: "1px solid black", padding: "0% 1%", overflowY: "scroll"}}>
                                        <div className={"font-18"} style={{width: "100%", height: "20%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            Seleccionar Variable
                                        </div>
                                        <div className={"row"} style={{height: "100%"}}>
                                            <ListasSeleVariableContenedorVariable esOperacion={false} mostrarRosa={true} campos={campos} variables={variables} objetos={objetos} camposDeObjetos={camposDeObjetos} seleccionarMultiple={false} retornoSeleccionVariable={this.retornoClickLista}></ListasSeleVariableContenedorVariable>
                                        </div>
                                        <div className={"row"}>
                                            <a className={"btn btn-brand btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.showVariables}>Crear Variables</a>
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
            </div>
        );
    }
}
