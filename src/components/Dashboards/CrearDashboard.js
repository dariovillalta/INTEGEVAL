import React from 'react';
import sql from 'mssql';
import Slider from 'react-input-slider';

import Modal from '../Modal/Modal.js';
import Campo from '../Regla/Campo.js';

const tipoCampos = [ {nombre: "texto"}, {nombre: "booleano"}, {nombre: "fecha"}, {nombre: "número"}, {nombre: "arreglo"}];

var tipoGrafico;

export default class CrearDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            variablesDisponiblesSeccionesDashboardTablaNueva: this.props.tablas.concat(this.props.variablesEscalares, this.props.objetos, this.props.variablesSQL, this.props.excel, this.props.formas),
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
        }
        this.crearDashboard = this.crearDashboard.bind(this);
        this.crearSeccionDashboard = this.crearSeccionDashboard.bind(this);
        this.crearArreglosDeInstrucciones = this.crearArreglosDeInstrucciones.bind(this);
        this.getObject = this.getObject.bind(this);
        this.actualizarTipoObjetoNuevo = this.actualizarTipoObjetoNuevo.bind(this);
        this.mostrarDivGraficos = this.mostrarDivGraficos.bind(this);
        this.cerrarDivGraficos = this.cerrarDivGraficos.bind(this);
        this.seleccionGrafico = this.seleccionGrafico.bind(this);
        this.showCampoModalEjeX = this.showCampoModalEjeX.bind(this);
        this.retornoSeleccionEjeX = this.retornoSeleccionEjeX.bind(this);
        this.closeCampoModalEjeX = this.closeCampoModalEjeX.bind(this);
        this.showCampoModalEjeY = this.showCampoModalEjeY.bind(this);
        this.retornoSeleccionEjeY = this.retornoSeleccionEjeY.bind(this);
        this.deleteVariableSeleccionadasSeccionesDashboardNueva = this.deleteVariableSeleccionadasSeccionesDashboardNueva.bind(this);
        this.closeCampoModalEjeY = this.closeCampoModalEjeY.bind(this);
        this.seleccionVarTableNuevo = this.seleccionVarTableNuevo.bind(this);
        this.deseleccionVarTableNuevo = this.deseleccionVarTableNuevo.bind(this);

        this.actualizarTipoObjetoNuevoUpdate = this.actualizarTipoObjetoNuevoUpdate.bind(this);
        this.mostrarDivGraficosUpdate = this.mostrarDivGraficosUpdate.bind(this);
        this.cerrarDivGraficosUpdate = this.cerrarDivGraficosUpdate.bind(this);
        this.seleccionGraficoUpdate = this.seleccionGraficoUpdate.bind(this);
        this.showCampoModalEjeXUpdate = this.showCampoModalEjeXUpdate.bind(this);
        this.retornoSeleccionEjeXUpdate = this.retornoSeleccionEjeXUpdate.bind(this);
        this.closeCampoModalEjeXUpdate = this.closeCampoModalEjeXUpdate.bind(this);
        this.showCampoModalEjeYUpdate = this.showCampoModalEjeYUpdate.bind(this);
        this.retornoSeleccionEjeYUpdate = this.retornoSeleccionEjeYUpdate.bind(this);
        this.deleteVariableSeleccionadasSeccionesDashboardUpdate = this.deleteVariableSeleccionadasSeccionesDashboardUpdate.bind(this);
        this.closeCampoModalEjeYUpdate = this.closeCampoModalEjeYUpdate.bind(this);
        this.seleccionVarTableNuevoUpdate = this.seleccionVarTableNuevoUpdate.bind(this);
        this.deseleccionVarTableUpdate = this.deseleccionVarTableUpdate.bind(this);
        this.modificarSeccionDashboard = this.modificarSeccionDashboard.bind(this);
        this.eliminarSeccionDashboard = this.eliminarSeccionDashboard.bind(this);
        this.crearArreglosDeInstruccionesUpdate = this.crearArreglosDeInstruccionesUpdate.bind(this);
    }

    crearDashboard () {
        var nombre = $("#nombreDashboard").val();
        var descripcion = $("#descripcionDashboard").val();
    }

    crearSeccionDashboard () {
        var tamano = $("#tamano").val();
        var tipoObjeto = $("#tipoObjeto").val();
        var instruccion = '';
        if (tipoObjeto.localeCompare("grafica") == 0) {
            //EJEMPLO: GRAFICA=>AREA[EJEX={esVariable: true, variableID: 1}\/EJEX={esVariable: true, esTabla: false, ^ variableID: 1}<>{esVariable: true, ^ variableID: 1}]
            instruccion += 'GRAFICA=>';
            if(this.state.tipoGraficoNuevo.length > 0) {
                instruccion += this.state.tipoGraficoNuevo+"[";
                if(this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || 
                    this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0) {
                    //EJEY
                    instruccion += "EJEX={";
                    if(this.state.objetoEjeXNuevo.esVariable) {
                        instruccion += 'esVariable:true,esSQL:false,esTabla:false,esExcel:false,esForma:false,';
                        instruccion += 'variableID:'+this.state.objetoEjeXNuevo.variableID+',tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,excelVariableID:-1,formaVariableID:-1}';
                    } else if(this.state.objetoEjeXNuevo.esSQL) {
                        instruccion += 'esVariable:false,esSQL:true,esTabla:false,esExcel:false,esForma:false,';
                        instruccion += 'variableID:'+this.state.objetoEjeXNuevo.variableID+',tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,excelVariableID:-1,formaVariableID:-1}';
                    } else if(this.state.objetoEjeXNuevo.esTabla) {
                        instruccion += 'esVariable:false,esSQL:false,esTabla:true,esExcel:false,esForma:false,';
                        instruccion += 'variableID:-1,tablaID:'+this.state.objetoEjeXNuevo.tablaID+',nombreCampoTabla:"'+this.state.objetoEjeXNuevo.valor+'",excelArchivoID:-1,excelVariableID:-1,formaVariableID:-1}';
                    } else if(this.state.objetoEjeXNuevo.esExcel) {
                        instruccion += 'esVariable:false,esSQL:false,esTabla:false,esExcel:true,esForma:false,';
                        instruccion += 'variableID:-1,tablaID:-1,nombreCampoTabla:"",excelArchivoID:'+this.state.objetoEjeXNuevo.excelArchivoID+',excelVariableID:'+this.state.objetoEjeXNuevo.excelVariableID+',formaVariableID:-1}';
                    } else if(this.state.objetoEjeXNuevo.esForma) {
                        instruccion += 'esVariable:false,esSQL:false,esTabla:false,esExcel:false,esForma:true,';
                        instruccion += 'variableID:-1,tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,excelVariableID:-1,formaVariableID:'+this.state.objetoEjeXNuevo.formaVariableID+'}';
                    }
                    //EJEX
                    instruccion += "\\/EJEY={";
                    for (var i = 0; i < this.state.variablesSeleccionadasSeccionesDashboardNueva.length; i++) {
                        if(i > 0)
                            instruccion += '<>{'
                        if(this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esVariable) {
                            instruccion += 'esVariable:true,esSQL:false,esTabla:false,esExcel:false,esForma:false,';
                            instruccion += 'variableID:'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].variableID+',tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,excelVariableID:-1,formaVariableID:-1}';
                        } else if(this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esSQL) {
                            instruccion += 'esVariable:false,esSQL:true,esTabla:false,esExcel:false,esForma:false,';
                            instruccion += 'variableID:'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].variableID+',tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,excelVariableID:-1,formaVariableID:-1}';
                        } else if(this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esTabla) {
                            instruccion += 'esVariable:false,esSQL:false,esTabla:true,esExcel:false,esForma:false,';
                            instruccion += 'variableID:-1,tablaID:'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].tablaID+',nombreCampoTabla:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor+'",excelArchivoID:-1,excelVariableID:-1,formaVariableID:-1}';
                        } else if(this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esExcel) {
                            instruccion += 'esVariable:false,esSQL:false,esTabla:false,esExcel:true,esForma:false,';
                            instruccion += 'variableID:-1,tablaID:-1,nombreCampoTabla:"",excelArchivoID:'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].excelArchivoID+',excelVariableID:'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].excelVariableID+',formaVariableID:-1}';
                        } else if(this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esForma) {
                            instruccion += 'esVariable:false,esSQL:false,esTabla:false,esExcel:false,esForma:true,';
                            instruccion += 'variableID:-1,tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,excelVariableID:-1,formaVariableID:'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].formaVariableID+'}';
                        }
                    };
                    instruccion += ']';
                } else if(this.state.tipoGraficoNuevo.localeCompare("PIE") == 0) {
                    //EJEMPLO: GRAFICA=>PIE[{esVariable: true, variableID: 1}<>{esVariable: true, variableID: 1}<>{esVariable: true, variableID: 1}]
                    instruccion += "{";
                    for (var i = 0; i < this.state.variablesSeleccionadasSeccionesDashboardNueva.length; i++) {
                        if(i > 0)
                            instruccion += '<>{'
                        if(this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esVariable) {
                            instruccion += 'esVariable:true,esSQL:false,esTabla:false,esExcel:false,esForma:false,';
                            instruccion += 'variableID:'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].variableID+',tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,excelVariableID:-1,formaVariableID:-1}';
                        } else if(this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esSQL) {
                            instruccion += 'esVariable:false,esSQL:true,esTabla:false,esExcel:false,esForma:false,';
                            instruccion += 'variableID:'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].variableID+',tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,excelVariableID:-1,formaVariableID:-1}';
                        } else if(this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esTabla) {
                            instruccion += 'esVariable:false,esSQL:false,esTabla:true,esExcel:false,esForma:false,';
                            instruccion += 'variableID:-1,tablaID:'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].tablaID+',nombreCampoTabla:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor+'",excelArchivoID:-1,excelVariableID:-1,formaVariableID:-1}';
                        } else if(this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esExcel) {
                            instruccion += 'esVariable:false,esSQL:false,esTabla:false,esExcel:true,esForma:false,';
                            instruccion += 'variableID:-1,tablaID:-1,nombreCampoTabla:"",excelArchivoID:'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].excelArchivoID+',excelVariableID:'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].excelVariableID+',formaVariableID:-1}';
                        } else if(this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esForma) {
                            instruccion += 'esVariable:false,esSQL:false,esTabla:false,esExcel:false,esForma:true,';
                            instruccion += 'variableID:-1,tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,excelVariableID:-1,formaVariableID:'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].formaVariableID+'}';
                        }
                    };
                    instruccion += ']';
                }
            }
        }
        if (tipoObjeto.localeCompare("tabla") == 0) {
            //EJEMPLO: TABLA=>[{esVariable: true, variableID: 1}<>{esVariable: true, variableID: 1}<>{esVariable: true, variableID: 1}]
            instruccion += 'TABLA=>[{';
            for (var i = 0; i < this.state.variablesSeleccionadasSeccionesDashboardTablaNueva.length; i++) {
                console.log('i = '+i);
                console.log('this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i]');
                console.log(this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i]);
                if(i > 0)
                    instruccion += '<>{'
                if(this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].esVariable) {
                    console.log('1');
                    instruccion += 'esVariable:true,esSQL:false,esTabla:false,esExcel:false,esForma:false,';
                    instruccion += 'variableID:'+this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].variableID+',tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,formaVariableID:-1}';
                } else if(this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].esSQL) {
                    console.log('2');
                    instruccion += 'esVariable:false,esSQL:true,esTabla:false,esExcel:false,esForma:false,';
                    instruccion += 'variableID:'+this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].variableID+',tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,formaVariableID:-1}';
                } else if(this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].esTabla) {
                    console.log('3');
                    instruccion += 'esVariable:false,esSQL:false,esTabla:true,esExcel:false,esForma:false,';
                    instruccion += 'variableID:-1,tablaID:'+this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].tablaID+',nombreCampoTabla:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].valor+'",excelArchivoID:-1,formaVariableID:-1}';
                } else if(this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].esExcel) {
                    console.log('4');
                    instruccion += 'esVariable:false,esSQL:false,esTabla:false,esExcel:true,esForma:false,';
                    instruccion += 'variableID:-1,tablaID:-1,nombreCampoTabla:"",excelArchivoID:'+this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].excelArchivoID+',formaVariableID:-1}';
                } else if(this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].esForma) {
                    console.log('5');
                    instruccion += 'esVariable:false,esSQL:false,esTabla:false,esExcel:false,esForma:true,';
                    instruccion += 'variableID:-1,tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,formaVariableID:'+this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].formaVariableID+'}';
                }
            };
            instruccion += ']';
        }
        if(tamano.length < 10) {
            if(tipoObjeto.length < 10) {
                if( (tipoObjeto.localeCompare("grafica") == 0 && this.state.tipoGraficoNuevo.length > 0) || tipoObjeto.localeCompare("tabla") == 0) {
                    //viendo si creo variables
                    if( ((this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || 
                                        this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0) && this.state.objetoEjeXNuevo != undefined && this.state.objetoEjeXNuevo.nombre != undefined && this.state.variablesSeleccionadasSeccionesDashboardNueva.length > 0) ||
                        ( (this.state.tipoGraficoNuevo.localeCompare("PIE") == 0) && this.state.variablesSeleccionadasSeccionesDashboardNueva.length > 0 ) ||
                        (tipoObjeto.localeCompare("tabla") == 0 && this.state.variablesSeleccionadasSeccionesDashboardTablaNueva.length > 0) ) {
                            var seccionesDashboard = [...this.state.seccionesDashboard];
                            seccionesDashboard.push({tamano: tamano, tipoObjeto: tipoObjeto, instruccion: instruccion});
                            this.setState({
                                seccionesDashboard: seccionesDashboard
                            }, this.crearArreglosDeInstrucciones );
                    } else {
                        if( ((this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || 
                                        this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0) && (this.state.objetoEjeXNuevo == undefined || this.state.objetoEjeXNuevo.nombre == undefined)) ) {
                            alert("Seleccione una variable para el eje x");
                        } else if ((this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || 
                                        this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0) && this.state.variablesSeleccionadasSeccionesDashboardNueva.length == 0) {
                            alert("Seleccione por lo menos una variable para el eje y");
                        } else if (tipoObjeto.localeCompare("tabla") == 0 && this.state.variablesSeleccionadasSeccionesDashboardTablaNueva.length == 0){
                            alert("Seleccione por lo menos una variable para las tablas");
                        }
                    }
                } else {
                    alert("Seleccione un tipo de grafico.")
                }
            } else {
                alert("Ingrese un valor para el tipo de objeto menor a 10 caracteres.")
            }
        } else {
            alert("Ingrese un valor para el tamaño menor a 10 caracteres.")
        }
    }

    crearArreglosDeInstrucciones () {
        //limpiando valores nuevos
        this.setState({
            tipoGraficoNuevo: '',
            displayGraphics: false,
            indiceGraphSelect: -1,
            variablesSeleccionadasSeccionesDashboardNueva: [],
            objetoEjeXNuevo: {},
            variablesSeleccionadasSeccionesDashboardTablaNueva: [],
            variablesDisponiblesSeccionesDashboardTablaNueva: this.props.tablas.concat(this.props.variablesEscalares, this.props.objetos, this.props.variablesSQL, this.props.excel, this.props.formas)
        });
        var tipoObjetoUpdate = [], tipoGraficoUpdate = [], displayGraphicsUpdate = [], indiceGraphSelectUpdate = [], objetoEjeXUpdate = [];
        var variablesSeleccionadasSeccionesDashboardUpdate = [], variablesSeleccionadasSeccionesDashboardTablaUpdate = [], variablesDisponiblesSeccionesDashboardTablaUpdate = [];
        for (var i = 0; i < this.state.seccionesDashboard.length; i++) {
            if(this.state.seccionesDashboard[i].instruccion.indexOf("GRAFICA") == 0) {
                var cadenaValores = this.state.seccionesDashboard[i].instruccion.split("=>")[1];
                tipoObjetoUpdate[i] = 'grafica';
                displayGraphicsUpdate[i] = false;
                if(cadenaValores.indexOf("LINEA") == 0 || cadenaValores.indexOf("AREA") == 0 || cadenaValores.indexOf("BARRA") == 0 || cadenaValores.indexOf("DISPERSION") == 0) {
                    if(cadenaValores.indexOf("LINEA") == 0) {
                        tipoGraficoUpdate[i] = 'LINEA';
                        indiceGraphSelectUpdate[i] = 0;
                    } else if(cadenaValores.indexOf("AREA") == 0) {
                        tipoGraficoUpdate[i] = 'AREA';
                        indiceGraphSelectUpdate[i] = 1;
                    } else if(cadenaValores.indexOf("BARRA") == 0) {
                        tipoGraficoUpdate[i] = 'BARRA';
                        indiceGraphSelectUpdate[i] = 2;
                    } else if(cadenaValores.indexOf("DISPERSION") == 0) {
                        tipoGraficoUpdate[i] = 'DISPERSION';
                        indiceGraphSelectUpdate[i] = 3;
                    }
                    if(objetoEjeXUpdate[i] == undefined)
                        objetoEjeXUpdate[i] = [];
                    var arregloObjetoX = cadenaValores.split("\\/")[0];
                    var objetoXCadena = arregloObjetoX.substring(arregloObjetoX.indexOf("{")+1, arregloObjetoX.indexOf("}"));
                    eval("objetoEjeXUpdate[i] = {"+objetoXCadena+"}");
                    objetoEjeXUpdate[i].nombre = '';
                    this.getObject(objetoEjeXUpdate, i, objetoEjeXUpdate[i], "objetoEjeXUpdate");
                    var arregloObjetosY = cadenaValores.split("\\/")[1];
                    var arregloValores = arregloObjetosY.split("<>");
                    if(variablesDisponiblesSeccionesDashboardTablaUpdate[i] == undefined)
                        variablesDisponiblesSeccionesDashboardTablaUpdate[i] = [];
                    variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.tablas.concat(this.props.variablesEscalares, this.props.objetos, this.props.variablesSQL, this.props.excel, this.props.formas);
                    if(variablesSeleccionadasSeccionesDashboardUpdate[i] == undefined)
                        variablesSeleccionadasSeccionesDashboardUpdate[i] = [];
                    for (var j = 0; j < arregloValores.length; j++) {
                        var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{")+1, arregloValores[j].lastIndexOf("}"));
                        eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({"+objeto+"})");
                        variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = '';
                        this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
                    };
                } else if(cadenaValores.indexOf("PIE") == 0) {
                    tipoGraficoUpdate[i] = 'PIE';
                    indiceGraphSelectUpdate[i] = 4;
                    if(objetoEjeXUpdate[i] == undefined)
                        objetoEjeXUpdate[i] = [];
                    /*var arregloObjetoX = cadenaValores.split("\\/")[0];
                    var objetoXCadena = arregloObjetoX.substring(arregloObjetoX.indexOf("{")+1, arregloObjetoX.lastIndexOf("}"));
                    eval("objetoEjeXUpdate[i] = {"+objetoXCadena+"}");
                    objetoEjeXUpdate[i].nombre = '';
                    this.getObject(objetoEjeXUpdate, indice, objetoEjeXUpdate[i], "objetoEjeXUpdate");*/
                    var arregloObjetosY = cadenaValores;
                    var arregloValores = arregloObjetosY.split("<>");
                    if(variablesDisponiblesSeccionesDashboardTablaUpdate[i] == undefined)
                        variablesDisponiblesSeccionesDashboardTablaUpdate[i] = [];
                    variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.tablas.concat(this.props.variablesEscalares, this.props.objetos, this.props.variablesSQL, this.props.excel, this.props.formas);
                    if(variablesSeleccionadasSeccionesDashboardUpdate[i] == undefined)
                        variablesSeleccionadasSeccionesDashboardUpdate[i] = [];
                    for (var j = 0; j < arregloValores.length; j++) {
                        var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{")+1, arregloValores[j].lastIndexOf("}"));
                        eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({"+objeto+"})");
                        variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = '';
                        this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
                    };
                }
            } else if(this.state.seccionesDashboard[i].instruccion.indexOf("TABLA") == 0) {
                var cadenaValores = this.state.seccionesDashboard[i].instruccion.split("=>")[1];
                var cadenaValoresSinCorchetes = cadenaValores.substring(1, cadenaValores.indexOf("]"));
                var arregloValores = cadenaValoresSinCorchetes.split("<>");
                tipoObjetoUpdate[i] = 'tabla';
                if(variablesSeleccionadasSeccionesDashboardTablaUpdate[i] == undefined)
                    variablesSeleccionadasSeccionesDashboardTablaUpdate[i] = [];
                if(variablesDisponiblesSeccionesDashboardTablaUpdate[i] == undefined)
                    variablesDisponiblesSeccionesDashboardTablaUpdate[i] = [];
                for (var j = 0; j < arregloValores.length; j++) {
                    var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{")+1, arregloValores[j].lastIndexOf("}"));
                    eval("variablesSeleccionadasSeccionesDashboardTablaUpdate[i].push({"+objeto+"})");
                    variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombre = '';
                    this.getObject(variablesSeleccionadasSeccionesDashboardTablaUpdate, i, variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j], "variablesSeleccionadasSeccionesDashboardTablaUpdate", j);
                    //variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.tablas.concat(this.props.variablesEscalares, this.props.objetos, this.props.variablesSQL, this.props.excel, this.props.formas);
                };
            }
        };
        console.log('tipoObjetoUpdate')
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
        console.log(variablesDisponiblesSeccionesDashboardTablaUpdate)
        this.setState({
            tipoObjetoUpdate: tipoObjetoUpdate,
            tipoGraficoUpdate: tipoGraficoUpdate,
            displayGraphicsUpdate: displayGraphicsUpdate,
            indiceGraphSelectUpdate: indiceGraphSelectUpdate,
            variablesDisponiblesSeccionesDashboardTablaUpdate: variablesDisponiblesSeccionesDashboardTablaUpdate
        });
    }

    getObject(arreglo, indiceSec, objeto, arregloNombre, indice) {
        var instruccion = '';
        if(objeto.esVariable) {
            instruccion = 'SELECT * FROM Variables WHERE ID = '+objeto.variableID;
        } else if(objeto.esSQL) {
            instruccion = 'SELECT * FROM Variables WHERE ID = '+objeto.variableID;
        } else if(objeto.esTabla) {
            instruccion = 'SELECT * FROM Tablas WHERE ID = '+objeto.tablaID;
        } else if(objeto.esExcel) {
            instruccion = 'SELECT * FROM ExcelVariables WHERE ID = '+objeto.excelVariableID+' AND excelArchivoID = '+excelArchivoID;
        } else if(objeto.esForma) {
            instruccion = 'SELECT * FROM FormasVariables WHERE ID = '+objeto.formaVariableID;
        }

        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query(instruccion, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var nombre = result.recordset[0].nombre;
                        if(objeto.esTabla) {
                            nombre = objeto.nombreCampoTabla;
                        }
                        if(arregloNombre.localeCompare("objetoEjeXUpdate") == 0) {
                            arreglo[indiceSec].nombre = nombre;
                            arreglo[indiceSec].valor = nombre;
                        } else {
                            arreglo[indiceSec][indice].nombre = nombre;
                            arreglo[indiceSec][indice].valor = nombre;
                        }
                        if(arregloNombre.localeCompare("objetoEjeXUpdate") == 0) {
                            this.setState({
                                objetoEjeXUpdate: arreglo
                            });
                        } else if(arregloNombre.localeCompare("variablesSeleccionadasSeccionesDashboardUpdate") == 0) {
                            for (var i = 0; i < arreglo.length; i++) {
                                arreglo[i].valor = arreglo[i].nombre;
                            };
                            this.setState({
                                variablesSeleccionadasSeccionesDashboardUpdate: arreglo
                            });
                        } else if(arregloNombre.localeCompare("variablesSeleccionadasSeccionesDashboardTablaUpdate") == 0) {
                            var arrOrig = this.props.tablas.concat(this.props.variablesEscalares, this.props.objetos, this.props.variablesSQL, this.props.excel, this.props.formas);
                            for (var i = arrOrig.length-1; i >= 0; i--) {
                                arrOrig[i].nombre = arrOrig[i].valor;
                                for (var j = 0; j < arreglo[indiceSec].length; j++) {
                                    if(arrOrig[i].valor.localeCompare(arreglo[indiceSec][j].valor) == 0) {
                                        arrOrig.splice(i, 1);
                                        break;
                                    }
                                };
                            };
                            var copyTemp = [...this.state.variablesDisponiblesSeccionesDashboardTablaUpdate];
                            copyTemp[indiceSec] = arrOrig;
                            this.setState({
                                variablesSeleccionadasSeccionesDashboardTablaUpdate: arreglo,
                                variablesDisponiblesSeccionesDashboardTablaUpdate: copyTemp
                            }, console.log(this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate) );
                            var self = this.state;
                            setTimeout(function () {
                                console.log(self.variablesSeleccionadasSeccionesDashboardTablaUpdate);
                            }, 1000);
                        }
                    });
                }
            });
        }); // fin transaction
    }

    actualizarTipoObjetoNuevo () {
        if($("#tipoObjeto").val().localeCompare("tabla") == 0) {
            this.setState({
                variablesSeleccionadasSeccionesDashboardTablaNueva: [],
                variablesDisponiblesSeccionesDashboardTablaNueva: this.props.tablas.concat(this.props.variablesEscalares, this.props.objetos, this.props.variablesSQL, this.props.excel, this.props.formas)
            });
        }
        this.setState({
            tipoObjetoNuevo: $("#tipoObjeto").val()
        });
    }

    mostrarDivGraficos (event) {
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

    cerrarDivGraficos () {
        console.log("CALLED")
        this.setState({
            displayGraphics: false/*,
            indiceGraphSelect: -1*/
        });
    }

    seleccionGrafico (event, tipoGraficaN, index) {
        event.stopPropagation();
        this.setState({
            tipoGraficoNuevo: tipoGraficaN,
            indiceGraphSelect: index,
            objetoEjeXNuevo: {},
            variablesSeleccionadasSeccionesDashboardNueva: []
        });
    }

    showCampoModalEjeX (event) {
        event.stopPropagation();
        this.setState({
            showModalCampoEjeX: true
        });
    }

    retornoSeleccionEjeX(campoSeleccionadoInput) {
        var campo = campoSeleccionadoInput[0];
        var esVariable = false, esSQL = false, esTabla = false, esExcel = false, esForma = false;
        var variableID = -1, tablaID = -1, excelArchivoID = -1, excelVariableID = -1, formaVariableID = -1;
        if(campo.tablaID != undefined) {
            esTabla = true;
            tablaID = campo.tablaID;
        } else if(campo.variableID != undefined) {
            if(campo.esInstruccionSQL)
                esSQL = true;
            else
                esVariable = true;
            variableID = campo.variableID;
        } else if(campo.excelArchivoID != undefined) {
            esExcel = true;
            excelArchivoID = campo.excelArchivoID;
            excelVariableID = campo.excelVariableID;
        } else if(campo.formaVariableID != undefined) {
            esForma = true;
            formaVariableID = campo.formaVariableID;
        }
        this.setState({
            objetoEjeXNuevo: {
                nombre: campo.valor,
                valor: campo.valor,
                esVariable: esVariable,
                esSQL: esSQL,
                esTabla: esTabla,
                esExcel: esExcel,
                esForma: esForma,
                variableID: variableID,
                tablaID: tablaID,
                excelArchivoID: excelArchivoID,
                excelVariableID: excelVariableID,
                formaVariableID: formaVariableID
            }
        });
    }

    closeCampoModalEjeX () {
        this.setState({
            showModalCampoEjeX: false
        });
    }

    showCampoModalEjeY (event) {
        //event.stopPropagation();
        this.setState({
            showModalCampoEjeY: true
        });
    }

    retornoSeleccionEjeY(campoSeleccionadoInput) {
        var campo = campoSeleccionadoInput[0];
        console.log('campo EJE Y');
        console.log(campo);
        var esVariable = false, esSQL = false, esTabla = false, esExcel = false, esForma = false;
        var variableID = -1, tablaID = -1, excelArchivoID = -1, excelVariableID = -1, formaVariableID = -1;
        if(campo.tablaID != undefined) {
            esTabla = true;
            tablaID = campo.tablaID;
        } else if(campo.variableID != undefined) {
            if(campo.esInstruccionSQL)
                esSQL = true;
            else
                esVariable = true;
            variableID = campo.variableID;
        } else if(campo.excelArchivoID != undefined) {
            esExcel = true;
            excelArchivoID = campo.excelArchivoID;
            excelVariableID = campo.excelVariableID;
        } else if(campo.formaVariableID != undefined) {
            esForma = true;
            formaVariableID = campo.formaVariableID;
        }
        var copyTemp = [...this.state.variablesSeleccionadasSeccionesDashboardNueva];
        copyTemp.push({
            nombre: campo.valor,
            valor: campo.valor,
            esVariable: esVariable,
            esSQL: esSQL,
            esTabla: esTabla,
            esExcel: esExcel,
            esForma: esForma,
            variableID: variableID,
            tablaID: tablaID,
            excelArchivoID: excelArchivoID,
            excelVariableID: excelVariableID,
            formaVariableID: formaVariableID
        });
        this.setState({
            variablesSeleccionadasSeccionesDashboardNueva: copyTemp
        });
    }

    deleteVariableSeleccionadasSeccionesDashboardNueva (index) {
        var copyTemp = [...this.state.variablesSeleccionadasSeccionesDashboardNueva];
        copyTemp.splice(index, 1);
        this.setState({
            variablesSeleccionadasSeccionesDashboardNueva: copyTemp
        });
    }

    closeCampoModalEjeY () {
        this.setState({
            showModalCampoEjeY: false
        });
    }

    seleccionVarTableNuevo (index) {
        var copyVarSel = [...this.state.variablesSeleccionadasSeccionesDashboardTablaNueva], copyVarDisponibles = [...this.state.variablesDisponiblesSeccionesDashboardTablaNueva];

        var esVariable = false, esSQL = false, esTabla = false, esExcel = false, esForma = false;
        var variableID = -1, tablaID = -1, excelArchivoID = -1, formaVariableID = -1;
        if(copyVarDisponibles[index].esTabla != undefined) {
            esTabla = true;
            tablaID = copyVarDisponibles[index].ID;
        } else if(copyVarDisponibles[index].esVariable != undefined) {
            if(copyVarDisponibles[index].esInstruccionSQL)
                esSQL = true;
            else
                esVariable = true;
            variableID = copyVarDisponibles[index].ID;
        } else if(copyVarDisponibles[index].esExcel != undefined) {
            esExcel = true;
            excelArchivoID = copyVarDisponibles[index].ID;
        } else if(copyVarDisponibles[index].esForma != undefined) {
            esForma = true;
            formaVariableID = copyVarDisponibles[index].ID;
        }

        copyVarSel.push({
            nombre: copyVarDisponibles[index].valor,
            valor: copyVarDisponibles[index].valor,
            esVariable: esVariable,
            esSQL: esSQL,
            esTabla: esTabla,
            esExcel: esExcel,
            esForma: esForma,
            variableID: variableID,
            tablaID: tablaID,
            excelArchivoID: excelArchivoID,
            formaVariableID: formaVariableID
        });
        copyVarDisponibles.splice(index, 1);
        this.setState({
            variablesSeleccionadasSeccionesDashboardTablaNueva: copyVarSel,
            variablesDisponiblesSeccionesDashboardTablaNueva: copyVarDisponibles
        });
    }

    deseleccionVarTableNuevo (index) {
        var copyVarSel = [...this.state.variablesSeleccionadasSeccionesDashboardTablaNueva], copyVarDisponibles = [...this.state.variablesDisponiblesSeccionesDashboardTablaNueva];
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


    actualizarTipoObjetoNuevoUpdate (index) {
        var copyTipoObjetoUpdate = [...this.state.tipoObjetoUpdate];
        copyTipoObjetoUpdate[index] = $("#tipoObjeto"+index).val();
        this.setState({
            tipoObjetoUpdate: copyTipoObjetoUpdate
        });
    }

    mostrarDivGraficosUpdate (event, index) {
        event.stopPropagation();
        /*if(!this.state.displayGraphics == false) {
            var copyIndiceGraphSelectUpdate = [...this.state.indiceGraphSelectUpdate];
            copyIndiceGraphSelectUpdate[index] = -1;
            this.setState({
                indiceGraphSelectUpdate: copyIndiceGraphSelectUpdate
            });
        }*/
        console.log("YEE")
        var copyDisplayGraphicsUpdate = [...this.state.displayGraphicsUpdate];
        copyDisplayGraphicsUpdate[index] = !copyDisplayGraphicsUpdate[index]
        this.setState({
            displayGraphicsUpdate: copyDisplayGraphicsUpdate
        });
    }

    cerrarDivGraficosUpdate (index) {
        console.log("CALLED")
        var copyDisplayGraphicsUpdate = [...this.state.displayGraphicsUpdate];
        copyDisplayGraphicsUpdate[index] = !copyDisplayGraphicsUpdate[index]
        var copyIndiceGraphSelectUpdate = [...this.state.indiceGraphSelectUpdate];
        copyIndiceGraphSelectUpdate[index] = -1;
        this.setState({
            displayGraphicsUpdate: copyDisplayGraphicsUpdate,
            indiceGraphSelectUpdate: copyIndiceGraphSelectUpdate
        });
    }

    seleccionGraficoUpdate (event, tipoGraficaN, index, indexSeccion) {
        event.stopPropagation();
        var copyTipoGraficoUpdate = [...this.state.tipoGraficoUpdate];
        copyTipoGraficoUpdate[indexSeccion] = tipoGraficaN;
        var copyIndiceGraphSelectUpdate = [...this.state.indiceGraphSelectUpdate];
        copyIndiceGraphSelectUpdate[indexSeccion] = index;
        this.setState({
            tipoGraficoUpdate: copyTipoGraficoUpdate,
            indiceGraphSelectUpdate: copyIndiceGraphSelectUpdate
        });
    }

    showCampoModalEjeXUpdate (event, index) {
        event.stopPropagation();
        this.setState({
            showModalCampoEjeXUpdate: true,
            indexSeccionDeEjeUpdate: index
        });
    }

    retornoSeleccionEjeXUpdate(campoSeleccionadoInput) {
        var campo = campoSeleccionadoInput[0];
        var esVariable = false, esSQL = false, esTabla = false, esExcel = false, esForma = false;
        var variableID = -1, tablaID = -1, excelArchivoID = -1, excelVariableID = -1, formaVariableID = -1;
        if(campo.tablaID != undefined) {
            esTabla = true;
            tablaID = campo.tablaID;
        } else if(campo.variableID != undefined) {
            if(campo.esInstruccionSQL)
                esSQL = true;
            else
                esVariable = true;
            variableID = campo.variableID;
        } else if(campo.excelArchivoID != undefined) {
            esExcel = true;
            excelArchivoID = campo.excelArchivoID;
            excelVariableID = campo.excelVariableID;
        } else if(campo.formaVariableID != undefined) {
            esForma = true;
            formaVariableID = campo.formaVariableID;
        }
        var copyObjetoEjeXUpdate = [...this.state.objetoEjeXUpdate];
        copyObjetoEjeXUpdate[this.state.indexSeccionDeEjeUpdate] = {
                nombre: campo.valor,
                valor: campo.valor,
                esVariable: esVariable,
                esSQL: esSQL,
                esTabla: esTabla,
                esExcel: esExcel,
                esForma: esForma,
                variableID: variableID,
                tablaID: tablaID,
                excelArchivoID: excelArchivoID,
                excelVariableID: excelVariableID,
                formaVariableID: formaVariableID
            };
        this.setState({
            objetoEjeXUpdate: copyObjetoEjeXUpdate
        });
    }

    closeCampoModalEjeXUpdate () {
        this.setState({
            showModalCampoEjeXUpdate: false
        });
    }

    showCampoModalEjeYUpdate (event, index) {
        event.stopPropagation();
        this.setState({
            showModalCampoEjeYUpdate: true,
            indexSeccionDeEjeUpdate: index
        });
    }

    retornoSeleccionEjeYUpdate(campoSeleccionadoInput) {
        var campo = campoSeleccionadoInput[0];
        console.log('campo EJE Y');
        console.log(campo);
        var esVariable = false, esSQL = false, esTabla = false, esExcel = false, esForma = false;
        var variableID = -1, tablaID = -1, excelArchivoID = -1, excelVariableID = -1, formaVariableID = -1;
        if(campo.tablaID != undefined) {
            esTabla = true;
            tablaID = campo.tablaID;
        } else if(campo.variableID != undefined) {
            if(campo.esInstruccionSQL)
                esSQL = true;
            else
                esVariable = true;
            variableID = campo.variableID;
        } else if(campo.excelArchivoID != undefined) {
            esExcel = true;
            excelArchivoID = campo.excelArchivoID;
            excelVariableID = campo.excelVariableID;
        } else if(campo.formaVariableID != undefined) {
            esForma = true;
            formaVariableID = campo.formaVariableID;
        }
        var copyTemp = [...this.state.variablesSeleccionadasSeccionesDashboardUpdate];
        copyTemp[this.state.indexSeccionDeEjeUpdate].push({
            nombre: campo.valor,
            valor: campo.valor,
            esVariable: esVariable,
            esSQL: esSQL,
            esTabla: esTabla,
            esExcel: esExcel,
            esForma: esForma,
            variableID: variableID,
            tablaID: tablaID,
            excelArchivoID: excelArchivoID,
            excelVariableID: excelVariableID,
            formaVariableID: formaVariableID
        });
        this.setState({
            variablesSeleccionadasSeccionesDashboardUpdate: copyTemp
        });
    }

    deleteVariableSeleccionadasSeccionesDashboardUpdate (index) {
        var copyTemp = [...this.state.variablesSeleccionadasSeccionesDashboardUpdate];
        copyTemp[this.state.indexSeccionDeEjeUpdate].splice(index, 1);
        this.setState({
            variablesSeleccionadasSeccionesDashboardUpdate: copyTemp
        });
    }

    closeCampoModalEjeYUpdate () {
        this.setState({
            showModalCampoEjeYUpdate: false
        });
    }

    seleccionVarTableNuevoUpdate (index, indexSeccion) {
        var copyVarSel = [...this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate], copyVarDisponibles = [...this.state.variablesDisponiblesSeccionesDashboardTablaUpdate];

        var esVariable = false, esSQL = false, esTabla = false, esExcel = false, esForma = false;
        var variableID = -1, tablaID = -1, excelArchivoID = -1, excelVariableID = -1, formaVariableID = -1;
        console.log('copyVarDisponibles')
        console.log(copyVarDisponibles)
        console.log('copyVarDisponibles[indexSeccion]')
        console.log(copyVarDisponibles[indexSeccion])
        console.log('copyVarDisponibles[indexSeccion][index]')
        console.log(copyVarDisponibles[indexSeccion][index])
        if(copyVarDisponibles[indexSeccion][index].esTabla != undefined) {
            esTabla = true;
            tablaID = copyVarDisponibles[indexSeccion][index].ID;
        } else if(copyVarDisponibles[indexSeccion][index].esVariable != undefined) {
            if(copyVarDisponibles[indexSeccion][index].esInstruccionSQL)
                esSQL = true;
            else
                esVariable = true;
            variableID = copyVarDisponibles[indexSeccion][index].ID;
        } else if(copyVarDisponibles[indexSeccion][index].excelArchivoID != undefined) {
            esExcel = true;
            excelArchivoID = copyVarDisponibles[indexSeccion][index].ID;
        } else if(copyVarDisponibles[indexSeccion][index].esForma != undefined) {
            esForma = true;
            formaVariableID = copyVarDisponibles[indexSeccion][index].ID;
        }

        copyVarSel[indexSeccion].push({
            nombre: copyVarDisponibles[indexSeccion][index].valor,
            valor: copyVarDisponibles[indexSeccion][index].valor,
            esVariable: esVariable,
            esSQL: esSQL,
            esTabla: esTabla,
            esExcel: esExcel,
            esForma: esForma,
            variableID: variableID,
            tablaID: tablaID,
            excelArchivoID: excelArchivoID,
            excelVariableID: excelVariableID,
            formaVariableID: formaVariableID
        });
        copyVarDisponibles[indexSeccion].splice(index, 1);
        this.setState({
            variablesSeleccionadasSeccionesDashboardTablaUpdate: copyVarSel,
            variablesDisponiblesSeccionesDashboardTablaUpdate: copyVarDisponibles
        });
    }

    deseleccionVarTableUpdate (index, indexSeccion) {
        var copyVarSel = [...this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate], copyVarDisponibles = [...this.state.variablesDisponiblesSeccionesDashboardTablaUpdate];
        copyVarDisponibles[indexSeccion].push(copyVarSel[indexSeccion][index]);
        copyVarSel[indexSeccion].splice(index, 1);
        this.setState({
            variablesSeleccionadasSeccionesDashboardTablaUpdate: copyVarSel,
            variablesDisponiblesSeccionesDashboardTablaUpdate: copyVarDisponibles
        });
    }

    modificarSeccionDashboard (index) {
        var tamano = $("#tamano"+index).val();
        var tipoObjeto = $("#tipoObjeto"+index).val();
        if(tamano.length < 10) {
            if(tipoObjeto.length < 10) {
                if( (tipoObjeto.localeCompare("grafica") == 0 && this.state.tipoGraficoUpdate[index].length > 0) || tipoObjeto.localeCompare("tabla") == 0) {
                    //viendo si creo variables
                    if( ((this.state.tipoGraficoUpdate[index].localeCompare("LINEA") == 0 || this.state.tipoGraficoUpdate[index].localeCompare("AREA") == 0 || 
                        this.state.tipoGraficoUpdate[index].localeCompare("BARRA") == 0 || this.state.tipoGraficoUpdate[index].localeCompare("DISPERSION") == 0) && this.state.objetoEjeXUpdate[index] != undefined && this.state.objetoEjeXUpdate[index].nombre != undefined && this.state.variablesSeleccionadasSeccionesDashboardUpdate[index] != undefined && this.state.variablesSeleccionadasSeccionesDashboardUpdate[index].length > 0) ||
                        (tipoObjetoUpdate[index].localeCompare("tabla") == 0 && this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index].length > 0) ) {
                        var instruccion = '';
                        if (tipoObjeto.localeCompare("grafica") == 0) {
                            //EJEMPLO: GRAFICA=>AREA[EJEY={esVariable: true, variableID: 1}\/EJEX={esVariable: true, esTabla: false, ^ variableID: 1}<>{esVariable: true, ^ variableID: 1}]
                            instruccion += 'GRAFICA=>';
                            if(this.state.tipoGraficoUpdate[index].length > 0) {
                                instruccion += this.state.tipoGraficoUpdate[index]+"[";
                                if(this.state.tipoGraficoUpdate[index].localeCompare("LINEA") == 0 || this.state.tipoGraficoUpdate[index].localeCompare("AREA") == 0 || 
                                    this.state.tipoGraficoUpdate[index].localeCompare("BARRA") == 0 || this.state.tipoGraficoUpdate[index].localeCompare("DISPERSION") == 0) {
                                    //EJEY
                                    instruccion += "EJEX={";
                                    if(this.state.objetoEjeXUpdate[index].esVariable) {
                                        instruccion += 'esVariable:true,esSQL:false,esTabla:false,esExcel:false,esForma:false,';
                                        instruccion += 'variableID:'+this.state.objetoEjeXUpdate[index].variableID+',tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,excelVariableID:-1,formaVariableID:-1}';
                                    } else if(this.state.objetoEjeXUpdate[index].esSQL) {
                                        instruccion += 'esVariable:false,esSQL:true,esTabla:false,esExcel:false,esForma:false,';
                                        instruccion += 'variableID:'+this.state.objetoEjeXUpdate[index].variableID+',tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,excelVariableID:-1,formaVariableID:-1}';
                                    } else if(this.state.objetoEjeXUpdate[index].esTabla) {
                                        instruccion += 'esVariable:false,esSQL:false,esTabla:true,esExcel:false,esForma:false,';
                                        instruccion += 'variableID:-1,tablaID:'+this.state.objetoEjeXUpdate[index].tablaID+',nombreCampoTabla:"'+this.state.objetoEjeXUpdate[index].valor+'",excelArchivoID:-1,excelVariableID:-1,formaVariableID:-1}';
                                    } else if(this.state.objetoEjeXUpdate[index].esExcel) {
                                        instruccion += 'esVariable:false,esSQL:false,esTabla:false,esExcel:true,esForma:false,';
                                        instruccion += 'variableID:-1,tablaID:-1,nombreCampoTabla:"",excelArchivoID:'+this.state.objetoEjeXUpdate[index].excelArchivoID+',excelVariableID:'+this.state.objetoEjeXUpdate[index].excelVariableID+',formaVariableID:-1}';
                                    } else if(this.state.objetoEjeXUpdate[index].esForma) {
                                        instruccion += 'esVariable:false,esSQL:false,esTabla:false,esExcel:false,esForma:true,';
                                        instruccion += 'variableID:-1,tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,excelVariableID:-1,formaVariableID:'+this.state.objetoEjeXUpdate[index].formaVariableID+'}';
                                    }
                                    //EJEX
                                    instruccion += "\\/EJEY={";
                                    for (var i = 0; i < this.state.variablesSeleccionadasSeccionesDashboardUpdate[index].length; i++) {
                                        if(i > 0)
                                            instruccion += '<>{'
                                        if(this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esVariable) {
                                            instruccion += 'esVariable:true,esSQL:false,esTabla:false,esExcel:false,esForma:false,';
                                            instruccion += 'variableID:'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].variableID+',tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,excelVariableID:-1,formaVariableID:-1}';
                                        } else if(this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esSQL) {
                                            instruccion += 'esVariable:false,esSQL:true,esTabla:false,esExcel:false,esForma:false,';
                                            instruccion += 'variableID:'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].variableID+',tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,excelVariableID:-1,formaVariableID:-1}';
                                        } else if(this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esTabla) {
                                            instruccion += 'esVariable:false,esSQL:false,esTabla:true,esExcel:false,esForma:false,';
                                            instruccion += 'variableID:-1,tablaID:'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].tablaID+',nombreCampoTabla:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].valor+'",excelArchivoID:-1,excelVariableID:-1,formaVariableID:-1}';
                                        } else if(this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esExcel) {
                                            instruccion += 'esVariable:false,esSQL:false,esTabla:false,esExcel:true,esForma:false,';
                                            instruccion += 'variableID:-1,tablaID:-1,nombreCampoTabla:"",excelArchivoID:'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].excelArchivoID+',excelVariableID:'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[i].excelVariableID+',formaVariableID:-1}';
                                        } else if(this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esForma) {
                                            instruccion += 'esVariable:false,esSQL:false,esTabla:false,esExcel:false,esForma:true,';
                                            instruccion += 'variableID:-1,tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,excelVariableID:-1,formaVariableID:'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].formaVariableID+'}';
                                        }
                                    };
                                    instruccion += ']';
                                } else if(this.state.tipoGraficoUpdate[index].localeCompare("PIE") == 0) {
                                    //EJEMPLO: GRAFICA=>PIE[{esVariable: true, variableID: 1}<>{esVariable: true, variableID: 1}<>{esVariable: true, variableID: 1}]
                                    instruccion += "{";
                                    for (var i = 0; i < this.state.variablesSeleccionadasSeccionesDashboardUpdate[index].length; i++) {
                                        if(i > 0)
                                            instruccion += '<>{'
                                        if(this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esVariable) {
                                            instruccion += 'esVariable:true,esSQL:false,esTabla:false,esExcel:false,esForma:false,';
                                            instruccion += 'variableID:'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].variableID+',tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,excelVariableID:-1,formaVariableID:-1}';
                                        } else if(this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esSQL) {
                                            instruccion += 'esVariable:false,esSQL:true,esTabla:false,esExcel:false,esForma:false,';
                                            instruccion += 'variableID:'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].variableID+',tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,excelVariableID:-1,formaVariableID:-1}';
                                        } else if(this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esTabla) {
                                            instruccion += 'esVariable:false,esSQL:false,esTabla:true,esExcel:false,esForma:false,';
                                            instruccion += 'variableID:-1,tablaID:'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].tablaID+',nombreCampoTabla:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].valor+'",excelArchivoID:-1,excelVariableID:-1,formaVariableID:-1}';
                                        } else if(this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esExcel) {
                                            instruccion += 'esVariable:false,esSQL:false,esTabla:false,esExcel:true,esForma:false,';
                                            instruccion += 'variableID:-1,tablaID:-1,nombreCampoTabla:"",excelArchivoID:'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].excelArchivoID+',excelVariableID:'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[i].excelVariableID+',formaVariableID:-1}';
                                        } else if(this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esForma) {
                                            instruccion += 'esVariable:false,esSQL:false,esTabla:false,esExcel:false,esForma:true,';
                                            instruccion += 'variableID:-1,tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,excelVariableID:-1,formaVariableID:'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].formaVariableID+'}';
                                        }
                                    };
                                    instruccion += ']';
                                }
                            }
                        }
                        if (tipoObjeto.localeCompare("tabla") == 0) {
                            //EJEMPLO: TABLA=>[{esVariable: true, variableID: 1}<>{esVariable: true, variableID: 1}<>{esVariable: true, variableID: 1}]
                            instruccion += 'TABLA=>[{';
                            for (var i = 0; i < this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index].length; i++) {
                                if(i > 0)
                                    instruccion += '<>{'
                                if(this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].esVariable) {
                                    instruccion += 'esVariable:true,esSQL:false,esTabla:false,esExcel:false,esForma:false,';
                                    instruccion += 'variableID:'+this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].variableID+',tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,formaVariableID:-1}';
                                } else if(this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].esSQL) {
                                    instruccion += 'esVariable:false,esSQL:true,esTabla:false,esExcel:false,esForma:false,';
                                    instruccion += 'variableID:'+this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].variableID+',tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,formaVariableID:-1}';
                                } else if(this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].esTabla) {
                                    instruccion += 'esVariable:false,esSQL:false,esTabla:true,esExcel:false,esForma:false,';
                                    instruccion += 'variableID:-1,tablaID:'+this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].tablaID+',nombreCampoTabla:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[i].valor+'",excelArchivoID:-1,formaVariableID:-1}';
                                } else if(this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].esExcel) {
                                    instruccion += 'esVariable:false,esSQL:false,esTabla:false,esExcel:true,esForma:false,';
                                    instruccion += 'variableID:-1,tablaID:-1,nombreCampoTabla:"",excelArchivoID:'+this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].excelArchivoID+',formaVariableID:-1}';
                                } else if(this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].esForma) {
                                    instruccion += 'esVariable:false,esSQL:false,esTabla:false,esExcel:false,esForma:true,';
                                    instruccion += 'variableID:-1,tablaID:-1,nombreCampoTabla:"",excelArchivoID:-1,formaVariableID:'+this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].formaVariableID+'}';
                                }
                            };
                            instruccion += ']';
                        }
                        var seccionesDashboard = [...this.state.seccionesDashboard];
                        seccionesDashboard[index].tamano = tamano;
                        seccionesDashboard[index].tipoObjeto = tipoObjeto;
                        seccionesDashboard[index].instruccion = instruccion;
                        this.setState({
                            seccionesDashboard: seccionesDashboard
                        }, this.crearArreglosDeInstruccionesUpdate );
                        //no se ocupa porque ya fue modificado
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
                        if( ((this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || 
                                        this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0) && this.state.objetoEjeYNuevo.nombre == undefined) ) {
                            alert("Seleccione una variable para el eje y");
                        } else if ((this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || 
                                        this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0) && this.state.variablesSeleccionadasSeccionesDashboardNueva.length == 0) {
                            alert("Seleccione por lo menos una variable para el eje x");
                        } else if (tipoObjeto.localeCompare("tabla") == 0 && this.state.variablesSeleccionadasSeccionesDashboardTablaNueva.length == 0){
                            alert("Seleccione por lo menos una variable para las tablas");
                        }
                    }
                } else {
                    alert("Seleccione un tipo de grafico.")
                }
            } else {
                alert("Ingrese un valor para el tipo de objeto menor a 10 caracteres.")
            }
        } else {
            alert("Ingrese un valor para el tamaño menor a 10 caracteres.")
        }
    }

    eliminarSeccionDashboard (index) {
        console.log("index = "+index);
        var copySeccionesDashboard = [...this.state.seccionesDashboard];
        copySeccionesDashboard.splice(index, 1);
        var copyObjetoEjeXUpdate = [...this.state.objetoEjeXUpdate];
        copyObjetoEjeXUpdate.splice(index, 1);
        var copyTemp = [...this.state.variablesSeleccionadasSeccionesDashboardUpdate];
        copyTemp.splice(index, 1);
        var copyVarSel = [...this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate], copyVarDisponibles = [...this.state.variablesDisponiblesSeccionesDashboardTablaUpdate];
        copyVarSel.splice(index, 1);
        copyVarDisponibles.splice(index, 1);
        console.log("copySeccionesDashboard");
        console.log(copySeccionesDashboard);
        console.log("copyObjetoEjeXUpdate");
        console.log(copyObjetoEjeXUpdate);
        console.log("copyTemp");
        console.log(copyTemp);
        console.log("copyVarSel");
        console.log(copyVarSel);
        console.log("copyVarDisponibles");
        console.log(copyVarDisponibles);
        this.setState({
            seccionesDashboard: copySeccionesDashboard,
            objetoEjeXUpdate: copyObjetoEjeXUpdate,
            variablesSeleccionadasSeccionesDashboardUpdate: copyTemp,
            variablesSeleccionadasSeccionesDashboardTablaUpdate: copyVarSel,
            variablesDisponiblesSeccionesDashboardTablaUpdate: copyVarDisponibles
        });
    }

    crearArreglosDeInstruccionesUpdate () {
        var tipoObjetoUpdate = [], tipoGraficoUpdate = [], displayGraphicsUpdate = [], indiceGraphSelectUpdate = [], objetoEjeXUpdate = [];
        var variablesSeleccionadasSeccionesDashboardUpdate = [], variablesSeleccionadasSeccionesDashboardTablaUpdate = [], variablesDisponiblesSeccionesDashboardTablaUpdate = [];
        for (var i = 0; i < this.state.seccionesDashboard.length; i++) {
            if(this.state.seccionesDashboard[i].instruccion.indexOf("GRAFICA") == 0) {
                var cadenaValores = this.state.seccionesDashboard[i].instruccion.split("=>")[1];
                tipoObjetoUpdate[i] = 'grafica';
                displayGraphicsUpdate[i] = false;
                if(cadenaValores.indexOf("LINEA") == 0 || cadenaValores.indexOf("AREA") == 0 || cadenaValores.indexOf("BARRA") == 0 || cadenaValores.indexOf("DISPERSION") == 0) {
                    if(cadenaValores.indexOf("LINEA") == 0) {
                        tipoGraficoUpdate[i] = 'LINEA';
                        indiceGraphSelectUpdate[i] = 0;
                    } else if(cadenaValores.indexOf("AREA") == 0) {
                        tipoGraficoUpdate[i] = 'AREA';
                        indiceGraphSelectUpdate[i] = 1;
                    } else if(cadenaValores.indexOf("BARRA") == 0) {
                        tipoGraficoUpdate[i] = 'BARRA';
                        indiceGraphSelectUpdate[i] = 2;
                    } else if(cadenaValores.indexOf("DISPERSION") == 0) {
                        tipoGraficoUpdate[i] = 'DISPERSION';
                        indiceGraphSelectUpdate[i] = 3;
                    }
                    if(objetoEjeXUpdate[i] == undefined)
                        objetoEjeXUpdate[i] = [];
                    var arregloObjetoX = cadenaValores.split("\\/")[0];
                    console.log('cadenaValores');
                    console.log(cadenaValores);
                    var objetoXCadena = arregloObjetoX.substring(arregloObjetoX.indexOf("{")+1, arregloObjetoX.indexOf("}"));
                    eval("objetoEjeXUpdate[i] = {"+objetoXCadena+"}");
                    objetoEjeXUpdate[i].nombre = '';
                    this.getObject(objetoEjeXUpdate, i, objetoEjeXUpdate[i], "objetoEjeXUpdate");
                    var arregloObjetosY = cadenaValores.split("\\/")[1];
                    var arregloValores = arregloObjetosY.split("<>");
                    if(variablesDisponiblesSeccionesDashboardTablaUpdate[i] == undefined)
                        variablesDisponiblesSeccionesDashboardTablaUpdate[i] = [];
                    variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.tablas.concat(this.props.variablesEscalares, this.props.objetos, this.props.variablesSQL, this.props.excel, this.props.formas);
                    if(variablesSeleccionadasSeccionesDashboardUpdate[i] == undefined)
                        variablesSeleccionadasSeccionesDashboardUpdate[i] = [];
                    console.log('arregloValores');
                    console.log(arregloValores);
                    for (var j = 0; j < arregloValores.length; j++) {
                        var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{")+1, arregloValores[j].lastIndexOf("}"));
                        eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({"+objeto+"})");
                        variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = '';
                        this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
                    };
                } else if(cadenaValores.indexOf("PIE") == 0) {
                    tipoGraficoUpdate[i] = 'PIE';
                    indiceGraphSelectUpdate[i] = 4;
                    if(objetoEjeXUpdate[i] == undefined)
                        objetoEjeXUpdate[i] = [];
                    /*var arregloObjetoX = cadenaValores.split("\\/")[0];
                    var objetoXCadena = arregloObjetoX.substring(arregloObjetoX.indexOf("{")+1, arregloObjetoX.lastIndexOf("}"));
                    eval("objetoEjeXUpdate[i] = {"+objetoXCadena+"}");
                    objetoEjeXUpdate[i].nombre = '';
                    this.getObject(objetoEjeXUpdate, indice, objetoEjeXUpdate[i], "objetoEjeXUpdate");*/
                    var arregloObjetosY = cadenaValores;
                    var arregloValores = arregloObjetosY.split("<>");
                    if(variablesDisponiblesSeccionesDashboardTablaUpdate[i] == undefined)
                        variablesDisponiblesSeccionesDashboardTablaUpdate[i] = [];
                    variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.tablas.concat(this.props.variablesEscalares, this.props.objetos, this.props.variablesSQL, this.props.excel, this.props.formas);
                    if(variablesSeleccionadasSeccionesDashboardUpdate[i] == undefined)
                        variablesSeleccionadasSeccionesDashboardUpdate[i] = [];
                    for (var j = 0; j < arregloValores.length; j++) {
                        var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{")+1, arregloValores[j].lastIndexOf("}"));
                        eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({"+objeto+"})");
                        variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = '';
                        this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
                    };
                }
            } else if(this.state.seccionesDashboard[i].instruccion.indexOf("TABLA") == 0) {
                var cadenaValores = this.state.seccionesDashboard[i].instruccion.split("=>")[1];
                var cadenaValoresSinCorchetes = cadenaValores.substring(1, cadenaValores.indexOf("]"));
                var arregloValores = cadenaValoresSinCorchetes.split("<>");
                tipoObjetoUpdate[i] = 'tabla';
                if(variablesSeleccionadasSeccionesDashboardTablaUpdate[i] == undefined)
                    variablesSeleccionadasSeccionesDashboardTablaUpdate[i] = [];
                if(variablesDisponiblesSeccionesDashboardTablaUpdate[i] == undefined)
                    variablesDisponiblesSeccionesDashboardTablaUpdate[i] = [];
                for (var j = 0; j < arregloValores.length; j++) {
                    var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{")+1, arregloValores[j].lastIndexOf("}"));
                    eval("variablesSeleccionadasSeccionesDashboardTablaUpdate[i].push({"+objeto+"})");
                    variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombre = '';
                    this.getObject(variablesSeleccionadasSeccionesDashboardTablaUpdate, i, variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j], "variablesSeleccionadasSeccionesDashboardTablaUpdate", j);
                    //variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.tablas.concat(this.props.variablesEscalares, this.props.objetos, this.props.variablesSQL, this.props.excel, this.props.formas);
                };
            }
        };
        console.log('tipoObjetoUpdate')
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
        console.log(variablesDisponiblesSeccionesDashboardTablaUpdate)
        this.setState({
            tipoObjetoUpdate: tipoObjetoUpdate,
            tipoGraficoUpdate: tipoGraficoUpdate,
            displayGraphicsUpdate: displayGraphicsUpdate,
            indiceGraphSelectUpdate: indiceGraphSelectUpdate,
            variablesDisponiblesSeccionesDashboardTablaUpdate: variablesDisponiblesSeccionesDashboardTablaUpdate
        });
    }

    render() {
        return (
            <div onClick={() => this.cerrarDivGraficos()}>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Crear Dashboard</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornarSeleccionDashboards}><a href="#" className={"breadcrumb-link"}>Dashboards</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Crear Dashboard</li>
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
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                                            <label htmlFor="nombreDashboard" className="col-form-label">Nombre Dashboard</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <input id="nombreDashboard" type="text" className="form-control form-control-sm"/>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                                            <label htmlFor="descripcionDashboard" className="col-form-label">Descripción de Dashboard:</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"}>
                                            <textarea className="form-control" id="descripcionDashboard" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className={"row"} style={{width: "100%", textAlign: "center"}}>
                                        <h2 className="pageheader-title">Secciones de Dashboard</h2>
                                    </div>
                                    <hr/>
                                    
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="tamano" className="col-form-label">Tamaño de Objeto</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <select id="tamano" className="form-control">
                                                <option value="col-6">Mitad de Página</option>
                                                <option value="col-12">Página Completa</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="tipoObjeto" className="col-form-label">Tipo de Objeto</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <select id="tipoObjeto" className="form-control" onChange={this.actualizarTipoObjetoNuevo}>
                                                <option value="grafica">Gráfica</option>
                                                <option value="tabla">Tabla</option>
                                            </select>
                                        </div>
                                    </div>
                                    {
                                        this.state.tipoObjetoNuevo.localeCompare("grafica") == 0
                                        ?   <div style={{width: "100%"}}>
                                                <div className={"row"} style={{width: "100%"}}>
                                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                        <label className="col-form-label">Tipo de Gráfica</label>
                                                    </div>
                                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group selectGraph"} onClick={(e) => this.mostrarDivGraficos(e)} style={{borderRadius: "5px"}}>
                                                        {
                                                            this.state.tipoGraficoNuevo.length == 0
                                                            ?   <div className={"selectGraph"} style={{height: "100%", width: "100%", display: "flex", alignItems: "center", backgroundColor: "#d2d2e4", justifyContent: "center"}}>
                                                                    <span>Seleccionar Tipo de Gráfico</span>
                                                                </div>
                                                            :   <div className={"selectGraph"} style={{height: "100%", width: "100%", display: "flex", alignItems: "center", backgroundColor: "#d2d2e4", justifyContent: "center"}}>
                                                                    <span>{this.state.tipoGraficoNuevo}</span>
                                                                </div>
                                                        }
                                                    </div>
                                                    <div className="row" style={{width: "100%"}}>
                                                        <div className={"selectGraph-content"} style={{overflowX: "scroll", overflowY: "hidden", whiteSpace: "nowrap", backgroundColor: "rgba(210, 210, 228, 0.3)", display: (this.state.displayGraphics ? "block" : "none" )}}>
                                                            <div className={"addPointer border-right" + (this.state.indiceGraphSelect == 0 ? " graficoSeleccionadoHighlight" : "")} style={{height: "100%", width: "90%", display: "inline-block"}} onClick={(e) => this.seleccionGrafico(e, "LINEA", 0)}>
                                                                <div className={"row"} style={{height: "9%", width: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                    <p className="lead"> Gráfico de Lineas </p>
                                                                </div>
                                                                <div className={"row"} style={{height: "91%", width: "100%"}}>
                                                                    <img src="../assets/Linea.png" style={{height: "100%", width: "100%", display: "block", marginLeft: "auto", marginRight: "auto"}}/>
                                                                </div>
                                                            </div>
                                                            <div className={"addPointer border-right" + (this.state.indiceGraphSelect == 1 ? " graficoSeleccionadoHighlight" : "")} style={{height: "100%", width: "90%", display: "inline-block"}} onClick={(e) => this.seleccionGrafico(e, "AREA", 1)}>
                                                                <div className={"row"} style={{height: "9%", width: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                    <p className="lead"> Gráfico de Area </p>
                                                                </div>
                                                                <div className={"row"} style={{height: "91%", width: "100%"}}>
                                                                    <img src="../assets/Area.png" style={{height: "100%", width: "100%", display: "block", marginLeft: "auto", marginRight: "auto"}}/>
                                                                </div>
                                                            </div>
                                                            <div className={"addPointer border-right" + (this.state.indiceGraphSelect == 2 ? " graficoSeleccionadoHighlight" : "")} style={{height: "100%", width: "90%", display: "inline-block"}} onClick={(e) => this.seleccionGrafico(e, "BARRA", 2)}>
                                                                <div className={"row"} style={{height: "9%", width: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                    <p className="lead"> Gráfico de Barra </p>
                                                                </div>
                                                                <div className={"row"} style={{height: "91%", width: "100%"}}>
                                                                    <img src="../assets/Barra.png" style={{height: "100%", width: "100%", display: "block", marginLeft: "auto", marginRight: "auto"}}/>
                                                                </div>
                                                            </div>
                                                            <div className={"addPointer border-right" + (this.state.indiceGraphSelect == 3 ? " graficoSeleccionadoHighlight" : "")} style={{height: "100%", width: "90%", display: "inline-block"}} onClick={(e) => this.seleccionGrafico(e, "DISPERSION", 3)}>
                                                                <div className={"row"} style={{height: "9%", width: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                    <p className="lead"> Gráfico de Dispersión </p>
                                                                </div>
                                                                <div className={"row"} style={{height: "91%", width: "100%"}}>
                                                                    <img src="../assets/Dispersion.png" style={{height: "100%", width: "100%", display: "block", marginLeft: "auto", marginRight: "auto"}}/>
                                                                </div>
                                                            </div>
                                                            <div className={"addPointer" + (this.state.indiceGraphSelect == 4 ? " graficoSeleccionadoHighlight" : "")} style={{height: "100%", width: "90%", display: "inline-block"}} onClick={(e) => this.seleccionGrafico(e, "PIE", 4)}>
                                                                <div className={"row"} style={{height: "9%", width: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                    <p className="lead"> Gráfico de Pie </p>
                                                                </div>
                                                                <div className={"row"} style={{height: "91%", width: "100%"}}>
                                                                    <img src="../assets/Pie.png" style={{height: "100%", width: "100%", display: "block", marginLeft: "auto", marginRight: "auto"}}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                {
                                                    this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0
                                                    ?   <div style={{width: "100%"}}>
                                                            <div className="row" style={{width: "100%"}}>
                                                                <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                                    <label className="col-form-label">Variable Eje X</label>
                                                                </div>
                                                                <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                    {
                                                                        this.state.objetoEjeXNuevo.nombre != undefined
                                                                        ?   this.state.objetoEjeXNuevo.nombre
                                                                        :   ""
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="row" style={{width: "100%"}}>
                                                                <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-group"}>
                                                                    <div className={"addPointer abrirModalCrearCondicionOnHover border"} onClick={(e) => this.showCampoModalEjeX(e)} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                        <h5>Seleccionar Variable Eje X</h5>
                                                                    </div>
                                                                    <Modal show={this.state.showModalCampoEjeX}
                                                                        titulo={"Seleccionar Variable Eje X"}
                                                                        onClose={this.closeCampoModalEjeX}>
                                                                            <Campo esNumero={() => void 0}
                                                                                esBoolean={() => void 0}
                                                                                esFecha={() => void 0}
                                                                                esTexto={() => void 0}
                                                                                tablas={this.props.tablas}
                                                                                camposTablas={this.props.camposTablas}
                                                                                variablesEscalares={this.props.variablesEscalares}
                                                                                objetos={this.props.objetos}
                                                                                camposDeObjetos={this.props.camposDeObjetos}
                                                                                excel={this.props.excel}
                                                                                camposDeExcel={this.props.camposDeExcel}
                                                                                formas={this.props.formas}
                                                                                variablesSQL={this.props.variablesSQL}
                                                                                camposVariablesSQL={this.props.camposVariablesSQL}
                                                                                retornoSeleccionVariable={this.retornoSeleccionEjeX}>
                                                                            </Campo>
                                                                    </Modal>
                                                                </div>
                                                            </div>
                                                            <div className="row" style={{width: "100%"}}>
                                                                <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                                    <label className="col-form-label">Variables eje Y</label>
                                                                </div>
                                                                <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                                    <div style={{width: "100%", textAlign: "center"}}>
                                                                        <h4 className="pageheader-title">Variables Seleccionadas</h4>
                                                                        <div style={{maxHeight: "25vh", width: "100%", overflowY: "scroll"}}>
                                                                            {this.state.variablesSeleccionadasSeccionesDashboardNueva.map((variableSeleccionada, i) =>
                                                                                <div key={variableSeleccionada.nombre+i} className="border" style={{height: "33%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                                    {variableSeleccionada.nombre}
                                                                                    <span> <img className="addPointer" onClick={() => this.deleteVariableSeleccionadasSeccionesDashboardNueva(i)} src={"../assets/trash.png"} style={{height: "20px", width: "20px", display: "block", float: "right"}}></img> </span>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row" style={{width: "100%"}}>
                                                                <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-group"}>
                                                                    <div className={"font-18 addPointer abrirModalCrearCondicionOnHover border"} onClick={(e) => this.showCampoModalEjeY(e)} style={{width: "100%",display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                        <h5>Seleccionar Variables Eje Y</h5>
                                                                    </div>
                                                                    <Modal show={this.state.showModalCampoEjeY}
                                                                        titulo={"Seleccionar Variables Eje Y"}
                                                                        onClose={this.closeCampoModalEjeY}>
                                                                            <Campo esNumero={() => void 0}
                                                                                esBoolean={() => void 0}
                                                                                esFecha={() => void 0}
                                                                                esTexto={() => void 0}
                                                                                tablas={this.props.tablas}
                                                                                camposTablas={this.props.camposTablas}
                                                                                variablesEscalares={this.props.variablesEscalares}
                                                                                objetos={this.props.objetos}
                                                                                camposDeObjetos={this.props.camposDeObjetos}
                                                                                excel={this.props.excel}
                                                                                camposDeExcel={this.props.camposDeExcel}
                                                                                formas={this.props.formas}
                                                                                variablesSQL={this.props.variablesSQL}
                                                                                camposVariablesSQL={this.props.camposVariablesSQL}
                                                                                retornoSeleccionVariable={this.retornoSeleccionEjeY}>
                                                                            </Campo>
                                                                    </Modal>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    : null
                                                }
                                                {
                                                    this.state.tipoGraficoNuevo.localeCompare("PIE") == 0
                                                    ?   <div style={{width: "100%"}}>
                                                            <div className="row" style={{width: "100%"}}>
                                                                <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                                    <label className="col-form-label">Variables</label>
                                                                </div>
                                                                <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                                    <div style={{width: "100%", textAlign: "center"}}>
                                                                        <h4 className="pageheader-title">Variables Seleccionadas</h4>
                                                                        <div style={{maxHeight: "25vh", width: "100%", overflowY: "scroll"}}>
                                                                            {this.state.variablesSeleccionadasSeccionesDashboardNueva.map((variableSeleccionada, i) =>
                                                                                <div key={variableSeleccionada.nombre+i} className="border" style={{height: "33%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                                    {variableSeleccionada.nombre}
                                                                                    <span> <img className="addPointer" onClick={() => this.deleteVariableSeleccionadasSeccionesDashboardNueva(i)} src={"../assets/trash.png"} style={{height: "20px", width: "20px", display: "block", float: "right"}}></img> </span>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row" style={{width: "100%"}}>
                                                                <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-group"}>
                                                                    <div className={"font-18 addPointer abrirModalCrearCondicionOnHover border"} onClick={(e) => this.showCampoModalEjeY(e)} style={{width: "100%",display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                        <h5>Seleccionar Variables Eje Y</h5>
                                                                    </div>
                                                                    <Modal show={this.state.showModalCampoEjeY}
                                                                        titulo={"Seleccionar Variables Eje Y"}
                                                                        onClose={this.closeCampoModalEjeY}>
                                                                            <Campo esNumero={() => void 0}
                                                                                esBoolean={() => void 0}
                                                                                esFecha={() => void 0}
                                                                                esTexto={() => void 0}
                                                                                tablas={this.props.tablas}
                                                                                camposTablas={this.props.camposTablas}
                                                                                variablesEscalares={this.props.variablesEscalares}
                                                                                objetos={this.props.objetos}
                                                                                camposDeObjetos={this.props.camposDeObjetos}
                                                                                excel={this.props.excel}
                                                                                camposDeExcel={this.props.camposDeExcel}
                                                                                formas={this.props.formas}
                                                                                variablesSQL={this.props.variablesSQL}
                                                                                camposVariablesSQL={this.props.camposVariablesSQL}
                                                                                retornoSeleccionVariable={this.retornoSeleccionEjeY}>
                                                                            </Campo>
                                                                    </Modal>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    : null
                                                }
                                            </div>
                                        :   <div style={{width: "100%"}}>
                                                <div className="row" style={{width: "100%"}}>
                                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                        <label className="col-form-label">Variables</label>
                                                    </div>
                                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                        <div style={{width: "50%", textAlign: "center", display: "inline-block"}}>
                                                            <h5 className="pageheader-title">Variables Seleccionadas</h5>
                                                            <div style={{height: "25vh", width: "100%", overflowY: "scroll"}}>
                                                                {this.state.variablesSeleccionadasSeccionesDashboardTablaNueva.map((variableSeleccionada, i) =>
                                                                    <div key={variableSeleccionada.valor+i} className="addPointer border" onClick={() => this.deseleccionVarTableNuevo(i)} style={{height: "33%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                        {variableSeleccionada.valor}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div style={{width: "50%", textAlign: "center", display: "inline-block"}}>
                                                            <h5 className="pageheader-title">Variables Disponibles</h5>
                                                            <div style={{height: "25vh", width: "100%", overflowY: "scroll"}}>
                                                                {this.state.variablesDisponiblesSeccionesDashboardTablaNueva.map((variableSeleccionada, i) =>
                                                                    <div key={variableSeleccionada.valor+i} className="addPointer border" onClick={() => this.seleccionVarTableNuevo(i)} style={{height: "33%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                        {variableSeleccionada.valor}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                    <br/>
                                    <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <a href="#" className="btn btn-brand active" onClick={this.crearSeccionDashboard}>Crear Sección de Dashboard</a>
                                    </div>
                                    <br/>




                                    {this.state.seccionesDashboard.map((seccionDashboard, i) =>
                                        <div key={seccionDashboard.tamano+i} style={{width: "100%"}}>
                                            <hr/>
                                            <div className={"row"} style={{width: "100%", textAlign: "center"}}>
                                                <h2 className="pageheader-title">Secciones de Dashboard</h2>
                                            </div>
                                            <hr/>
                                            
                                            <div className={"row"} style={{width: "100%"}}>
                                                <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                    <label htmlFor={"tamano"+i} className="col-form-label">Tamaño de Objeto</label>
                                                </div>
                                                <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                    <select id={"tamano"+i} defaultValue={seccionDashboard.tamano} className="form-control">
                                                        <option value="col-6">Mitad de Página</option>
                                                        <option value="col-12">Página Completa</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={"row"} style={{width: "100%"}}>
                                                <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                    <label htmlFor={"tipoObjeto"+i} className="col-form-label">Tipo de Objeto</label>
                                                </div>
                                                <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                    <select id={"tipoObjeto"+i} defaultValue={seccionDashboard.tipoObjeto} className="form-control" onChange={() => this.actualizarTipoObjetoNuevoUpdate(i)}>
                                                        <option value="grafica">Gráfica</option>
                                                        <option value="tabla">Tabla</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {
                                                this.state.tipoObjetoUpdate[i] != undefined && this.state.tipoObjetoUpdate[i].localeCompare("grafica") == 0
                                                ?   <div style={{width: "100%"}}>
                                                        <div className={"row"} style={{width: "100%"}}>
                                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                                <label className="col-form-label">Tipo de Gráfica</label>
                                                            </div>
                                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group selectGraph"} onClick={(e) => this.mostrarDivGraficosUpdate(e, i)} style={{borderRadius: "5px"}}>
                                                                <div className={"selectGraph"} style={{height: "100%", width: "100%", display: "flex", alignItems: "center", backgroundColor: "#d2d2e4", justifyContent: "center"}}>
                                                                    {
                                                                        this.state.tipoGraficoUpdate[i] == undefined || this.state.tipoGraficoUpdate[i].length == 0
                                                                        ?   <div className={"selectGraph"} style={{height: "100%", width: "100%", display: "flex", alignItems: "center", backgroundColor: "#d2d2e4", justifyContent: "center"}}>
                                                                                <span>Seleccionar Tipo de Gráfico</span>
                                                                            </div>
                                                                        :   <div className={"selectGraph"} style={{height: "100%", width: "100%", display: "flex", alignItems: "center", backgroundColor: "#d2d2e4", justifyContent: "center"}}>
                                                                                <span>{this.state.tipoGraficoUpdate[i]}</span>
                                                                            </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="row" style={{width: "100%"}}>
                                                                <div className={"selectGraph-content"} style={{overflowX: "scroll", overflowY: "hidden", whiteSpace: "nowrap", backgroundColor: "rgba(210, 210, 228, 0.3)", display: (this.state.displayGraphicsUpdate ? "block" : "none" )}}>
                                                                    <div className={"addPointer border-right" + (this.state.indiceGraphSelectUpdate[i] == 0 ? " graficoSeleccionadoHighlight" : "")} style={{height: "100%", width: "90%", display: "inline-block"}} onClick={(e) => this.seleccionGraficoUpdate(e, "LINEA", 0, i)}>
                                                                        <div className={"row"} style={{height: "9%", width: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                            <p className="lead"> Gráfico de Lineas </p>
                                                                        </div>
                                                                        <div className={"row"} style={{height: "91%", width: "100%"}}>
                                                                            <img src="../assets/Linea.png" style={{height: "100%", width: "100%", display: "block", marginLeft: "auto", marginRight: "auto"}}/>
                                                                        </div>
                                                                    </div>
                                                                    <div className={"addPointer border-right" + (this.state.indiceGraphSelectUpdate[i] == 1 ? " graficoSeleccionadoHighlight" : "")} style={{height: "100%", width: "90%", display: "inline-block"}} onClick={(e) => this.seleccionGraficoUpdate(e, "AREA", 1, i)}>
                                                                        <div className={"row"} style={{height: "9%", width: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                            <p className="lead"> Gráfico de Area </p>
                                                                        </div>
                                                                        <div className={"row"} style={{height: "91%", width: "100%"}}>
                                                                            <img src="../assets/Area.png" style={{height: "100%", width: "100%", display: "block", marginLeft: "auto", marginRight: "auto"}}/>
                                                                        </div>
                                                                    </div>
                                                                    <div className={"addPointer border-right" + (this.state.indiceGraphSelectUpdate[i] == 2 ? " graficoSeleccionadoHighlight" : "")} style={{height: "100%", width: "90%", display: "inline-block"}} onClick={(e) => this.seleccionGraficoUpdate(e, "BARRA", 2, i)}>
                                                                        <div className={"row"} style={{height: "9%", width: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                            <p className="lead"> Gráfico de Barra </p>
                                                                        </div>
                                                                        <div className={"row"} style={{height: "91%", width: "100%"}}>
                                                                            <img src="../assets/Barra.png" style={{height: "100%", width: "100%", display: "block", marginLeft: "auto", marginRight: "auto"}}/>
                                                                        </div>
                                                                    </div>
                                                                    <div className={"addPointer border-right" + (this.state.indiceGraphSelectUpdate[i] == 3 ? " graficoSeleccionadoHighlight" : "")} style={{height: "100%", width: "90%", display: "inline-block"}} onClick={(e) => this.seleccionGraficoUpdate(e, "DISPERSION", 3, i)}>
                                                                        <div className={"row"} style={{height: "9%", width: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                            <p className="lead"> Gráfico de Dispersión </p>
                                                                        </div>
                                                                        <div className={"row"} style={{height: "91%", width: "100%"}}>
                                                                            <img src="../assets/Dispersion.png" style={{height: "100%", width: "100%", display: "block", marginLeft: "auto", marginRight: "auto"}}/>
                                                                        </div>
                                                                    </div>
                                                                    <div className={"addPointer" + (this.state.indiceGraphSelectUpdate[i] == 4 ? " graficoSeleccionadoHighlight" : "")} style={{height: "100%", width: "90%", display: "inline-block"}} onClick={(e) => this.seleccionGraficoUpdate(e, "PIE", 4, i)}>
                                                                        <div className={"row"} style={{height: "9%", width: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                            <p className="lead"> Gráfico de Pie </p>
                                                                        </div>
                                                                        <div className={"row"} style={{height: "91%", width: "100%"}}>
                                                                            <img src="../assets/Pie.png" style={{height: "100%", width: "100%", display: "block", marginLeft: "auto", marginRight: "auto"}}/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        {
                                                            (this.state.tipoGraficoUpdate[i] != undefined && this.state.tipoGraficoUpdate[i].localeCompare("LINEA") == 0) || (this.state.tipoGraficoUpdate[i] != undefined && this.state.tipoGraficoUpdate[i].localeCompare("AREA") == 0) || (this.state.tipoGraficoUpdate[i] != undefined && this.state.tipoGraficoUpdate[i].localeCompare("BARRA") == 0) || (this.state.tipoGraficoUpdate[i] != undefined && this.state.tipoGraficoUpdate[i].localeCompare("DISPERSION") == 0)
                                                            ?   <div style={{width: "100%"}}>
                                                                    <div className="row" style={{width: "100%"}}>
                                                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                                            <label className="col-form-label">Variable Eje X</label>
                                                                        </div>
                                                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                            {
                                                                                this.state.objetoEjeXUpdate[i] != undefined && this.state.objetoEjeXUpdate[i].nombre != undefined
                                                                                ?   this.state.objetoEjeXUpdate[i].nombre
                                                                                :   ""
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="row" style={{width: "100%"}}>
                                                                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-group"}>
                                                                            <div className={"addPointer abrirModalCrearCondicionOnHover border"} onClick={(e) => this.showCampoModalEjeXUpdate(e, i)} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                                <h5>Seleccionar Variable Eje X</h5>
                                                                            </div>
                                                                            <Modal show={this.state.showModalCampoEjeXUpdate}
                                                                                titulo={"Seleccionar Variable Eje X"}
                                                                                onClose={this.closeCampoModalEjeXUpdate}>
                                                                                    <Campo esNumero={() => void 0}
                                                                                        esBoolean={() => void 0}
                                                                                        esFecha={() => void 0}
                                                                                        esTexto={() => void 0}
                                                                                        tablas={this.props.tablas}
                                                                                        camposTablas={this.props.camposTablas}
                                                                                        variablesEscalares={this.props.variablesEscalares}
                                                                                        objetos={this.props.objetos}
                                                                                        camposDeObjetos={this.props.camposDeObjetos}
                                                                                        excel={this.props.excel}
                                                                                        camposDeExcel={this.props.camposDeExcel}
                                                                                        formas={this.props.formas}
                                                                                        variablesSQL={this.props.variablesSQL}
                                                                                        camposVariablesSQL={this.props.camposVariablesSQL}
                                                                                        retornoSeleccionVariable={this.retornoSeleccionEjeXUpdate}>
                                                                                    </Campo>
                                                                            </Modal>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row" style={{width: "100%"}}>
                                                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                                            <label className="col-form-label">Variables eje Y</label>
                                                                        </div>
                                                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                                            <div style={{width: "100%", textAlign: "center"}}>
                                                                                <h4 className="pageheader-title">Variables Seleccionadas</h4>
                                                                                <div style={{maxHeight: "25vh", width: "100%", overflowY: "scroll"}}>
                                                                                    {
                                                                                        this.state.variablesSeleccionadasSeccionesDashboardUpdate[i] != undefined
                                                                                        ?   <div>
                                                                                                {this.state.variablesSeleccionadasSeccionesDashboardUpdate[i].map((variableSeleccionada, i) =>
                                                                                                    <div key={variableSeleccionada.nombre+i} className="border" style={{height: "33%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                                                        {variableSeleccionada.nombre}
                                                                                                        <span> <img className="addPointer" onClick={() => this.deleteVariableSeleccionadasSeccionesDashboardUpdate(i)} src={"../assets/trash.png"} style={{height: "20px", width: "20px", display: "block", float: "right"}}></img> </span>
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                        : null
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row" style={{width: "100%"}}>
                                                                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-group"}>
                                                                            <div className={"font-18 addPointer abrirModalCrearCondicionOnHover border"} onClick={(e) => this.showCampoModalEjeYUpdate(e, i)} style={{width: "100%",display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                                <h5>Seleccionar Variables Eje Y</h5>
                                                                            </div>
                                                                            <Modal show={this.state.showModalCampoEjeYUpdate}
                                                                                titulo={"Seleccionar Variables Eje Y"}
                                                                                onClose={this.closeCampoModalEjeYUpdate}>
                                                                                    <Campo esNumero={() => void 0}
                                                                                        esBoolean={() => void 0}
                                                                                        esFecha={() => void 0}
                                                                                        esTexto={() => void 0}
                                                                                        tablas={this.props.tablas}
                                                                                        camposTablas={this.props.camposTablas}
                                                                                        variablesEscalares={this.props.variablesEscalares}
                                                                                        objetos={this.props.objetos}
                                                                                        camposDeObjetos={this.props.camposDeObjetos}
                                                                                        excel={this.props.excel}
                                                                                        camposDeExcel={this.props.camposDeExcel}
                                                                                        formas={this.props.formas}
                                                                                        variablesSQL={this.props.variablesSQL}
                                                                                        camposVariablesSQL={this.props.camposVariablesSQL}
                                                                                        retornoSeleccionVariable={this.retornoSeleccionEjeYUpdate}>
                                                                                    </Campo>
                                                                            </Modal>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            : null
                                                        }
                                                        {
                                                            (this.state.tipoGraficoUpdate[i] != undefined && this.state.tipoGraficoUpdate[i].localeCompare("PIE") == 0)
                                                            ?   <div style={{width: "100%"}}>
                                                                    <div className="row" style={{width: "100%"}}>
                                                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                                            <label className="col-form-label">Variables</label>
                                                                        </div>
                                                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                                            <div style={{width: "100%", textAlign: "center"}}>
                                                                                <h4 className="pageheader-title">Variables Seleccionadas</h4>
                                                                                <div style={{maxHeight: "25vh", width: "100%", overflowY: "scroll"}}>
                                                                                    {
                                                                                        this.state.variablesSeleccionadasSeccionesDashboardUpdate[i] != undefined
                                                                                        ?   <div>
                                                                                                {this.state.variablesSeleccionadasSeccionesDashboardUpdate[i].map((variableSeleccionada, i) =>
                                                                                                    <div key={variableSeleccionada.nombre+i} className="border" style={{height: "33%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                                                        {variableSeleccionada.nombre}
                                                                                                        <span> <img className="addPointer" onClick={() => this.deleteVariableSeleccionadasSeccionesDashboardUpdate(i)} src={"../assets/trash.png"} style={{height: "20px", width: "20px", display: "block", float: "right"}}></img> </span>
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                        : null
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row" style={{width: "100%"}}>
                                                                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-group"}>
                                                                            <div className={"font-18 addPointer abrirModalCrearCondicionOnHover border"} onClick={(e) => this.showCampoModalEjeYUpdate(e, i)} style={{width: "100%",display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                                <h5>Seleccionar Variables Eje Y</h5>
                                                                            </div>
                                                                            <Modal show={this.state.showModalCampoEjeYUpdate}
                                                                                titulo={"Seleccionar Variables Eje Y"}
                                                                                onClose={this.closeCampoModalEjeYUpdate}>
                                                                                    <Campo esNumero={() => void 0}
                                                                                        esBoolean={() => void 0}
                                                                                        esFecha={() => void 0}
                                                                                        esTexto={() => void 0}
                                                                                        tablas={this.props.tablas}
                                                                                        camposTablas={this.props.camposTablas}
                                                                                        variablesEscalares={this.props.variablesEscalares}
                                                                                        objetos={this.props.objetos}
                                                                                        camposDeObjetos={this.props.camposDeObjetos}
                                                                                        excel={this.props.excel}
                                                                                        camposDeExcel={this.props.camposDeExcel}
                                                                                        formas={this.props.formas}
                                                                                        variablesSQL={this.props.variablesSQL}
                                                                                        camposVariablesSQL={this.props.camposVariablesSQL}
                                                                                        retornoSeleccionVariable={this.retornoSeleccionEjeYUpdate}>
                                                                                    </Campo>
                                                                            </Modal>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            : null
                                                        }
                                                    </div>
                                                :   <div style={{width: "100%"}}>
                                                        <div className="row" style={{width: "100%"}}>
                                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                                <label className="col-form-label">Variables</label>
                                                            </div>
                                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                                <div style={{width: "50%", textAlign: "center", display: "inline-block"}}>
                                                                    <h5 className="pageheader-title">Variables Seleccionadas</h5>
                                                                    <div style={{height: "25vh", width: "100%", overflowY: "scroll"}}>
                                                                        {
                                                                            this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[i] != undefined
                                                                            ?   <div style={{height: "100%"}}>
                                                                                    {this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[i].map((variableSeleccionada, j) =>
                                                                                        <div key={variableSeleccionada.valor+i+""+j} className="addPointer border" onClick={() => this.deseleccionVarTableUpdate(j, i)} style={{height: "33%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                                            {variableSeleccionada.valor}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            : null
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div style={{width: "50%", textAlign: "center", display: "inline-block"}}>
                                                                    <h5 className="pageheader-title">Variables Disponibles</h5>
                                                                    <div style={{height: "25vh", width: "100%", overflowY: "scroll"}}>
                                                                        {
                                                                            this.state.variablesDisponiblesSeccionesDashboardTablaUpdate[i] != undefined
                                                                            ?   <div style={{height: "100%"}}>
                                                                                    {this.state.variablesDisponiblesSeccionesDashboardTablaUpdate[i].map((variableSeleccionada, j) =>
                                                                                        <div key={variableSeleccionada.valor+i+""+j} className="addPointer border" onClick={() => this.seleccionVarTableNuevoUpdate(j, i)} style={{height: "33%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                                            {variableSeleccionada.valor}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            : null
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            }
                                            <div className={"text-center"} style={{width: "100%"}}>
                                                <a href="#" className="btn btn-success active" onClick={() => this.modificarSeccionDashboard(i)}>Modificar Variable</a>
                                                <a href="#" className="btn btn-danger active" onClick={() => this.eliminarSeccionDashboard(i)} style={{marginLeft: "10px"}}>Eliminar Variable</a>
                                            </div>
                                            <br/>
                                        </div>
                                    )}

                                    <br/>
                                    <hr/>
                                    <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <a className={"btn btn-success btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.crearRiesgo}>Crear</a>
                                    </div>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}