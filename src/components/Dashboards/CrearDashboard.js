import React from 'react';
import sql from 'mssql';
import Slider from 'react-input-slider';

import Modal from '../Modal/Modal.js';
import CampoDashboard from './CampoDashboard.js';

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
            variablesDisponiblesSeccionesDashboardTablaNueva: this.props.variables.concat(this.props.indicadores, this.props.riesgos),
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
        this.getIDDashboard = this.getIDDashboard.bind(this);
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
        if(nombre.length > 0) {
            const transaction = new sql.Transaction( this.props.pool );
            transaction.begin(err => {
                var rolledBack = false;
                transaction.on('rollback', aborted => {
                    rolledBack = true;
                });
                const request = new sql.Request(transaction);
                request.query("insert into Dashboard (nombre, descripcion) values('"+nombre+"', '"+descripcion+"') ", (err, result) => {
                    if (err) {
                        console.log(err);
                        if (!rolledBack) {
                            transaction.rollback(err => {
                            });
                        }
                    } else {
                        transaction.commit(err => {
                            this.getIDDashboard();
                            alert("Dashboard creado.")
                        });
                    }
                });
            }); // fin transaction
        } else {
            alert("Ingrese un nombre para el dashboard.")
        }
    }

    getIDDashboard () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select top 1 * from Dashboard order by ID desc", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset != undefined) {
                            if(result.recordset.length > 0) {
                                this.guardarSeccionesDashboard(result.recordset[0]);
                            }
                        }
                    });
                }
            });
        }); // fin transaction
    }

    guardarSeccionesDashboard (dashboard) {
        for (var i = 0; i < this.state.seccionesDashboard.length; i++) {
            let tamano = this.state.seccionesDashboard[i].tamano;
            let tipoObjeto = this.state.seccionesDashboard[i].tipoObjeto;
            let instruccion = this.state.seccionesDashboard[i].instruccion;
            let index = i;
            const transaction = new sql.Transaction( this.props.pool );
            transaction.begin(err => {
                var rolledBack = false;
                transaction.on('rollback', aborted => {
                    rolledBack = true;
                });
                const request = new sql.Request(transaction);
                request.query("insert into SeccionDashboard (dashboardID, tamano, tipoObjeto, instruccion) values("+dashboard.ID+", '"+tamano+"', '"+tipoObjeto+"', '"+instruccion+"') ", (err, result) => {
                    if (err) {
                        console.log(err);
                        if (!rolledBack) {
                            transaction.rollback(err => {
                            });
                        }
                    } else {
                        transaction.commit(err => {
                            if(i == this.state.seccionesDashboard.length) {
                                this.props.terminoCrearDashboardPasarAEdit();
                            }
                        });
                    }
                });
            }); // fin transaction
        };
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
                        instruccion += 'esVariable:true,esIndicador:false,esRiesgo:false,';
                        instruccion += 'nombreVariable:"'+this.state.objetoEjeXNuevo.nombreVariable+'",nombreCampo:"'+this.state.objetoEjeXNuevo.nombreCampo+'",valor:"'+this.state.objetoEjeXNuevo.valor+'"}';
                    } else if(this.state.objetoEjeXNuevo.esIndicador) {
                        instruccion += 'esVariable:false,esIndicador:true,esRiesgo:false,';
                        instruccion += 'nombreIndicador:"'+this.state.objetoEjeXNuevo.nombreIndicador+'",nombreCampo:"'+this.state.objetoEjeXNuevo.nombreCampo+'",valor:"'+this.state.objetoEjeXNuevo.valor+'"}';
                    } else if(this.state.objetoEjeXNuevo.esRiesgo) {
                        instruccion += 'esVariable:false,esIndicador:false,esRiesgo:true,';
                        instruccion += 'nombreRiesgo:"'+this.state.objetoEjeXNuevo.nombreRiesgo+'",nombreCampo:"'+this.state.objetoEjeXNuevo.nombreCampo+'",valor:"'+this.state.objetoEjeXNuevo.valor+'"}';
                    }
                    //EJEX
                    instruccion += "\\/EJEY={";
                    for (var i = 0; i < this.state.variablesSeleccionadasSeccionesDashboardNueva.length; i++) {
                        if(i > 0)
                            instruccion += '<>{'
                        if(this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esVariable) {
                            instruccion += 'esVariable:true,esIndicador:false,esRiesgo:false,';
                            instruccion += 'nombreVariable:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].nombreVariable+'",nombreCampo:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor+'",valor:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor+'"}';
                        } else if(this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esIndicador) {
                            instruccion += 'esVariable:false,esIndicador:true,esRiesgo:false,';
                            instruccion += 'nombreIndicador:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].nombreIndicador+'",nombreCampo:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor+'",valor:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor+'"}';
                        } else if(this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esRiesgo) {
                            instruccion += 'esVariable:false,esIndicador:false,esRiesgo:true,';
                            instruccion += 'nombreRiesgo:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].nombreRiesgo+'",nombreCampo:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor+'",valor:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor+'"}';
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
                            instruccion += 'esVariable:true,esIndicador:false,esRiesgo:false,';
                            instruccion += 'nombreVariable:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].nombreVariable+'",nombreCampo:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor+'",valor:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor+'"}';
                        } else if(this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esIndicador) {
                            instruccion += 'esVariable:false,esIndicador:true,esRiesgo:false,';
                            instruccion += 'nombreIndicador:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].nombreIndicador+'",nombreCampo:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor+'",valor:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor+'"}';
                        } else if(this.state.variablesSeleccionadasSeccionesDashboardNueva[i].esRiesgo) {
                            instruccion += 'esVariable:false,esIndicador:false,esRiesgo:true,';
                            instruccion += 'nombreRiesgo:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].nombreRiesgo+'",nombreCampo:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor+'",valor:"'+this.state.variablesSeleccionadasSeccionesDashboardNueva[i].valor+'"}';
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
                if(i > 0)
                    instruccion += '<>{'
                if(this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].esVariable) {
                    instruccion += 'esVariable:true,esIndicador:false,esRiesgo:false,';
                    instruccion += 'nombreVariable:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].nombreVariable+'",nombreCampo:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].valor+'",valor:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].valor+'"}';
                } else if(this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].esIndicador) {
                    instruccion += 'esVariable:false,esIndicador:true,esRiesgo:false,';
                    instruccion += 'nombreIndicador:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].nombreIndicador+'",nombreCampo:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].valor+'",valor:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].valor+'"}';
                } else if(this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].esRiesgo) {
                    instruccion += 'esVariable:false,esIndicador:false,esRiesgo:true,';
                    instruccion += 'nombreRiesgo:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].nombreRiesgo+'",nombreCampo:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].valor+'",valor:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaNueva[i].valor+'"}';
                }
            };
            instruccion += ']';
        }
        if(tamano.length < 10) {
            if(tipoObjeto.length < 10) {
                if( (tipoObjeto.localeCompare("grafica") == 0 && this.state.tipoGraficoNuevo.length > 0) || tipoObjeto.localeCompare("tabla") == 0) {
                    //viendo si creo variables
                    if( ((this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || 
                                        this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0) && this.state.objetoEjeXNuevo != undefined && this.state.objetoEjeXNuevo.valor != undefined && this.state.variablesSeleccionadasSeccionesDashboardNueva.length > 0) ||
                        ( (this.state.tipoGraficoNuevo.localeCompare("PIE") == 0) && this.state.variablesSeleccionadasSeccionesDashboardNueva.length > 0 ) ||
                        (tipoObjeto.localeCompare("tabla") == 0 && this.state.variablesSeleccionadasSeccionesDashboardTablaNueva.length > 0) ) {
                            var seccionesDashboard = [...this.state.seccionesDashboard];
                            seccionesDashboard.push({tamano: tamano, tipoObjeto: tipoObjeto, instruccion: instruccion});
                            this.setState({
                                seccionesDashboard: seccionesDashboard
                            }, this.crearArreglosDeInstrucciones );
                    } else {
                        if( ((this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || 
                                        this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0) && (this.state.objetoEjeXNuevo == undefined || this.state.objetoEjeXNuevo.valor == undefined)) ) {
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
            variablesDisponiblesSeccionesDashboardTablaNueva: this.props.variables.concat(this.props.indicadores, this.props.riesgos)
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
                    //this.getObject(objetoEjeXUpdate, i, objetoEjeXUpdate[i], "objetoEjeXUpdate");
                    var arregloObjetosY = cadenaValores.split("\\/")[1];
                    var arregloValores = arregloObjetosY.split("<>");
                    if(variablesDisponiblesSeccionesDashboardTablaUpdate[i] == undefined)
                        variablesDisponiblesSeccionesDashboardTablaUpdate[i] = [];
                    variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.variables.concat(this.props.indicadores, this.props.riesgos);
                    if(variablesSeleccionadasSeccionesDashboardUpdate[i] == undefined)
                        variablesSeleccionadasSeccionesDashboardUpdate[i] = [];
                    for (var j = 0; j < arregloValores.length; j++) {
                        var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{")+1, arregloValores[j].lastIndexOf("}"));
                        eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({"+objeto+"})");
                        variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = '';
                        //this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
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
                    variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.variables.concat(this.props.indicadores, this.props.riesgos);
                    if(variablesSeleccionadasSeccionesDashboardUpdate[i] == undefined)
                        variablesSeleccionadasSeccionesDashboardUpdate[i] = [];
                    for (var j = 0; j < arregloValores.length; j++) {
                        var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{")+1, arregloValores[j].lastIndexOf("}"));
                        eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({"+objeto+"})");
                        variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = '';
                        //this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
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
                variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.variables.concat(this.props.indicadores, this.props.riesgos);
                for (var j = 0; j < arregloValores.length; j++) {
                    var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{")+1, arregloValores[j].lastIndexOf("}"));
                    eval("variablesSeleccionadasSeccionesDashboardTablaUpdate[i].push({"+objeto+"})");
                    variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombre = '';
                    //this.getObject(variablesSeleccionadasSeccionesDashboardTablaUpdate, i, variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j], "variablesSeleccionadasSeccionesDashboardTablaUpdate", j);
                    //variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.variables.concat(this.props.indicadores, this.props.riesgos);
                };
                for (var j = 0; j < variablesSeleccionadasSeccionesDashboardTablaUpdate[i].length; j++) {
                    if(variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].esVariable) {
                        FORDISPONIBLES:
                        for (var k = 0; k < variablesDisponiblesSeccionesDashboardTablaUpdate[i].length; k++) {
                            if(variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].esVariable && variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].nombreVariable.localeCompare(variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombreVariable) == 0) {
                                variablesDisponiblesSeccionesDashboardTablaUpdate[i].splice(k, 1);
                                break FORDISPONIBLES;
                            }
                        };
                    } else if(variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].esIndicador) {
                        FORDISPONIBLES:
                        for (var k = 0; k < variablesDisponiblesSeccionesDashboardTablaUpdate[i].length; k++) {
                            if(variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].esIndicador && variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].nombreIndicador.localeCompare(variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombreIndicador) == 0) {
                                variablesDisponiblesSeccionesDashboardTablaUpdate[i].splice(k, 1);
                                break FORDISPONIBLES;
                            }
                        };
                    } else if(variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].esRiesgo) {
                        FORDISPONIBLES:
                        for (var k = 0; k < variablesDisponiblesSeccionesDashboardTablaUpdate[i].length; k++) {
                            if(variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].esRiesgo && variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].nombreRiesgo.localeCompare(variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombreRiesgo) == 0) {
                                variablesDisponiblesSeccionesDashboardTablaUpdate[i].splice(k, 1);
                                break FORDISPONIBLES;
                            }
                        };
                    }
                };
            }
        };
        /*console.log('tipoObjetoUpdate')
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
        console.log(variablesDisponiblesSeccionesDashboardTablaUpdate)*/
        this.setState({
            tipoObjetoUpdate: tipoObjetoUpdate,
            tipoGraficoUpdate: tipoGraficoUpdate,
            objetoEjeXUpdate: objetoEjeXUpdate,
            variablesSeleccionadasSeccionesDashboardUpdate: variablesSeleccionadasSeccionesDashboardUpdate,
            variablesSeleccionadasSeccionesDashboardTablaUpdate: variablesSeleccionadasSeccionesDashboardTablaUpdate,
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
                            var arrOrig = this.props.variables.concat(this.props.indicadores, this.props.riesgos);
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
                            });
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
                variablesDisponiblesSeccionesDashboardTablaNueva: this.props.variables.concat(this.props.indicadores, this.props.riesgos)
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
        var copyTemp = [...this.state.displayGraphicsUpdate];
        for (var i = 0; i < copyTemp.length; i++) {
            copyTemp[i] = false;
        };
        this.setState({
            displayGraphics: false,
            displayGraphicsUpdate: copyTemp/*,
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
        var esVariable = false, esIndicador = false, esRiesgo = false;
        var nombreVariable = '', nombreIndicador = '', nombreRiesgo = '', nombreCampo = '', valor = '';
        if(campo.esVariable) {
            esVariable = true;
            nombreVariable = campo.nombreVariable;
            nombreCampo = campo.valor;
            valor = campo.valor;
        } else if(campo.esIndicador) {
            esIndicador = true;
            nombreIndicador = campo.nombreIndicador;
            nombreCampo = campo.valor;
            valor = campo.valor;
        } else if(campo.esRiesgo) {
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
        var esVariable = false, esIndicador = false, esRiesgo = false;
        var nombreVariable = '', nombreIndicador = '', nombreRiesgo = '', nombreCampo = '', valor = '';
        if(campo.esVariable) {
            esVariable = true;
            nombreVariable = campo.nombreVariable;
            nombreCampo = campo.valor;
            valor = campo.valor;
        } else if(campo.esIndicador) {
            esIndicador = true;
            nombreIndicador = campo.nombreIndicador;
            nombreCampo = campo.valor;
            valor = campo.valor;
        } else if(campo.esRiesgo) {
            esRiesgo = true;
            nombreRiesgo = campo.nombreRiesgo;
            nombreCampo = campo.valor;
            valor = campo.valor;
        }

        var copyTemp = [...this.state.variablesSeleccionadasSeccionesDashboardNueva];
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
        //verificar si existe valor, sino agregar
        //verificar que sea del mismo tipo (variable, indicador o riesgo)
        //si es indicador o riesgo agregar
        //si es variable y ya existe, no agregar
        var copyVarSel = [...this.state.variablesSeleccionadasSeccionesDashboardTablaNueva], copyVarDisponibles = [...this.state.variablesDisponiblesSeccionesDashboardTablaNueva];
        var agregarVar = false;
        if (copyVarSel.length == 0) {
            agregarVar = true;
        } else {
            var esVariable = false, esIndicador = false, esRiesgo = false;
            if(copyVarSel[0].esVariable) {
                esVariable = true;
            } else if(copyVarSel[0].esIndicador) {
                esIndicador = true;
            } else if(copyVarSel[0].esRiesgo) {
                esRiesgo = true;
            }
            if(esVariable) {
                agregarVar = false;
            } else if(esIndicador || esRiesgo) {
                if(copyVarDisponibles[index].esIndicador && esIndicador) {
                    agregarVar = true;
                } else if(copyVarDisponibles[index].esRiesgo && esRiesgo) {
                    agregarVar = true;
                } else {
                    agregarVar = false;
                }
            }
        }
        if(agregarVar) {
            var esVariable = false, esIndicador = false, esRiesgo = false;
            var nombreVariable = '', nombreIndicador = '', nombreRiesgo = '', nombreCampo = '', valor = '';
            if(copyVarDisponibles[index].esVariable) {
                esVariable = true;
                nombreVariable = copyVarDisponibles[index].nombreVariable;
                nombreCampo = copyVarDisponibles[index].valor;
                valor = copyVarDisponibles[index].valor;
            } else if(copyVarDisponibles[index].esIndicador) {
                esIndicador = true;
                nombreIndicador = copyVarDisponibles[index].nombreIndicador;
                nombreCampo = copyVarDisponibles[index].valor;
                valor = copyVarDisponibles[index].valor;
            } else if(copyVarDisponibles[index].esRiesgo) {
                esRiesgo = true;
                nombreRiesgo = copyVarDisponibles[index].nombreRiesgo;
                nombreCampo = copyVarDisponibles[index].valor;
                valor = copyVarDisponibles[index].valor;
            }

            copyVarSel.push({
                nombreCampo: nombreCampo,
                valor: valor,
                esVariable: esVariable,
                esIndicador: esIndicador,
                esRiesgo: esRiesgo,
                nombreVariable: nombreVariable,
                nombreIndicador: nombreIndicador,
                nombreRiesgo: nombreRiesgo
            });
            copyVarDisponibles.splice(index, 1);
            this.setState({
                variablesSeleccionadasSeccionesDashboardTablaNueva: copyVarSel,
                variablesDisponiblesSeccionesDashboardTablaNueva: copyVarDisponibles
            });
        } else {
            var esVariable = false, esIndicador = false, esRiesgo = false;
            if(copyVarSel[0].esVariable) {
                esVariable = true;
            } else if(copyVarSel[0].esIndicador) {
                esIndicador = true;
            } else if(copyVarSel[0].esRiesgo) {
                esRiesgo = true;
            }
            if(esVariable) {
                alert("Una tabla solo puede tener una variable.");
            } else if(esIndicador || esRiesgo) {
                if( (copyVarDisponibles[index].esIndicador && !esIndicador) || (copyVarDisponibles[index].esRiesgo && !esRiesgo) ) {
                    alert("Las variables de la tabla deben ser del mismo tipo (riesgo o indicador).");
                }
            }
        }
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
        var copyDisplayGraphicsUpdate = [...this.state.displayGraphicsUpdate];
        copyDisplayGraphicsUpdate[index] = !copyDisplayGraphicsUpdate[index]
        this.setState({
            displayGraphicsUpdate: copyDisplayGraphicsUpdate
        });
    }

    cerrarDivGraficosUpdate (index) {
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
        var esVariable = false, esIndicador = false, esRiesgo = false;
        var nombreVariable = '', nombreIndicador = '', nombreRiesgo = '', nombreCampo = '', valor = '';
        if(campo.esVariable) {
            esVariable = true;
            nombreVariable = campo.nombreVariable;
            nombreCampo = campo.valor;
            valor = campo.valor;
        } else if(campo.esIndicador) {
            esIndicador = true;
            nombreIndicador = campo.nombreIndicador;
            nombreCampo = campo.valor;
            valor = campo.valor;
        } else if(campo.esRiesgo) {
            esRiesgo = true;
            nombreRiesgo = campo.nombreRiesgo;
            nombreCampo = campo.valor;
            valor = campo.valor;
        }

        var copyObjetoEjeXUpdate = [...this.state.objetoEjeXUpdate];
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
        var esVariable = false, esIndicador = false, esRiesgo = false;
        var nombreVariable = '', nombreIndicador = '', nombreRiesgo = '', nombreCampo = '', valor = '';
        if(campo.esVariable) {
            esVariable = true;
            nombreVariable = campo.nombreVariable;
            nombreCampo = campo.valor;
            valor = campo.valor;
        } else if(campo.esIndicador) {
            esIndicador = true;
            nombreIndicador = campo.nombreIndicador;
            nombreCampo = campo.valor;
            valor = campo.valor;
        } else if(campo.esRiesgo) {
            esRiesgo = true;
            nombreRiesgo = campo.nombreRiesgo;
            nombreCampo = campo.valor;
            valor = campo.valor;
        }

        var copyTemp = [...this.state.variablesSeleccionadasSeccionesDashboardUpdate];
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
        var agregarVar = false;
        if (copyVarSel.length == 0) {
            agregarVar = true;
        } else {
            var esVariable = false, esIndicador = false, esRiesgo = false;
            if(copyVarSel[0].esVariable) {
                esVariable = true;
            } else if(copyVarSel[0].esIndicador) {
                esIndicador = true;
            } else if(copyVarSel[0].esRiesgo) {
                esRiesgo = true;
            }
            if(esVariable) {
                agregarVar = false;
            } else if(esIndicador || esRiesgo) {
                if(copyVarDisponibles[index].esIndicador && esIndicador) {
                    agregarVar = true;
                } else if(copyVarDisponibles[index].esRiesgo && esRiesgo) {
                    agregarVar = true;
                } else {
                    agregarVar = false;
                }
            }
        }

        if(agregarVar) {
            var esVariable = false, esIndicador = false, esRiesgo = false;
            var nombreVariable = '', nombreIndicador = '', nombreRiesgo = '', nombreCampo = '', valor = '';
            if(copyVarDisponibles[indexSeccion][index].esVariable) {
                esVariable = true;
                nombreVariable = copyVarDisponibles[indexSeccion][index].nombreVariable;
                nombreCampo = copyVarDisponibles[indexSeccion][index].valor;
                valor = copyVarDisponibles[indexSeccion][index].valor;
            } else if(copyVarDisponibles[indexSeccion][index].esIndicador) {
                esIndicador = true;
                nombreIndicador = copyVarDisponibles[indexSeccion][index].nombreIndicador;
                nombreCampo = copyVarDisponibles[indexSeccion][index].valor;
                valor = copyVarDisponibles[indexSeccion][index].valor;
            } else if(copyVarDisponibles[indexSeccion][index].esRiesgo) {
                esRiesgo = true;
                nombreRiesgo = copyVarDisponibles[indexSeccion][index].nombreRiesgo;
                nombreCampo = copyVarDisponibles[indexSeccion][index].valor;
                valor = copyVarDisponibles[indexSeccion][index].valor;
            }

            copyVarSel[indexSeccion].push({
                nombreCampo: nombreCampo,
                valor: valor,
                esVariable: esVariable,
                esIndicador: esIndicador,
                esRiesgo: esRiesgo,
                nombreVariable: nombreVariable,
                nombreIndicador: nombreIndicador,
                nombreRiesgo: nombreRiesgo
            });
            copyVarDisponibles[indexSeccion].splice(index, 1);
            this.setState({
                variablesSeleccionadasSeccionesDashboardTablaUpdate: copyVarSel,
                variablesDisponiblesSeccionesDashboardTablaUpdate: copyVarDisponibles
            });
        } else {
            var esVariable = false, esIndicador = false, esRiesgo = false;
            if(copyVarSel[0].esVariable) {
                esVariable = true;
            } else if(copyVarSel[0].esIndicador) {
                esIndicador = true;
            } else if(copyVarSel[0].esRiesgo) {
                esRiesgo = true;
            }
            if(esVariable) {
                alert("Una tabla solo puede tener una variable.");
            } else if(esIndicador || esRiesgo) {
                if( (copyVarDisponibles[index].esIndicador && !esIndicador) || (copyVarDisponibles[index].esRiesgo && !esRiesgo) ) {
                    alert("Las variables de la tabla deben ser del mismo tipo (riesgo o indicador).");
                }
            }
        }
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
                    if( (this.state.tipoGraficoUpdate[index] != undefined && ((this.state.tipoGraficoUpdate[index].localeCompare("LINEA") == 0 || this.state.tipoGraficoUpdate[index].localeCompare("AREA") == 0 || 
                                            this.state.tipoGraficoUpdate[index].localeCompare("BARRA") == 0 || this.state.tipoGraficoUpdate[index].localeCompare("DISPERSION") == 0) && this.state.objetoEjeXUpdate[index] != undefined && this.state.objetoEjeXUpdate[index].valor != undefined && this.state.variablesSeleccionadasSeccionesDashboardUpdate[index] != undefined && this.state.variablesSeleccionadasSeccionesDashboardUpdate[index].length > 0)) ||
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
                                        instruccion += 'esVariable:true,esIndicador:false,esRiesgo:false,';
                                        instruccion += 'nombreVariable:"'+this.state.objetoEjeXUpdate[index].nombreVariable+'",nombreCampo:"'+this.state.objetoEjeXUpdate[index].nombreCampo+'",valor:"'+this.state.objetoEjeXUpdate[index].valor+'"}';
                                    } else if(this.state.objetoEjeXUpdate[index].esIndicador) {
                                        instruccion += 'esVariable:false,esIndicador:true,esRiesgo:false,';
                                        instruccion += 'nombreIndicador:"'+this.state.objetoEjeXUpdate[index].nombreIndicador+'",nombreCampo:"'+this.state.objetoEjeXUpdate[index].nombreCampo+'",valor:"'+this.state.objetoEjeXUpdate[index].valor+'"}';
                                    } else if(this.state.objetoEjeXUpdate[index].esRiesgo) {
                                        instruccion += 'esVariable:false,esIndicador:false,esRiesgo:true,';
                                        instruccion += 'nombreRiesgo:"'+this.state.objetoEjeXUpdate[index].nombreRiesgo+'",nombreCampo:"'+this.state.objetoEjeXUpdate[index].nombreCampo+'",valor:"'+this.state.objetoEjeXUpdate[index].valor+'"}';
                                    }
                                    //EJEX
                                    instruccion += "\\/EJEY={";
                                    for (var i = 0; i < this.state.variablesSeleccionadasSeccionesDashboardUpdate[index].length; i++) {
                                        if(i > 0)
                                            instruccion += '<>{'
                                        if(this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esVariable) {
                                            instruccion += 'esVariable:true,esIndicador:false,esRiesgo:false,';
                                            instruccion += 'nombreVariable:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreVariable+'",nombreCampo:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreCampo+'",valor:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].valor+'"}';
                                        } else if(this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esIndicador) {
                                            instruccion += 'esVariable:false,esIndicador:true,esRiesgo:false,';
                                            instruccion += 'nombreIndicador:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreVariable+'",nombreCampo:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreCampo+'",valor:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].valor+'"}';
                                        } else if(this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esRiesgo) {
                                            instruccion += 'esVariable:false,esIndicador:false,esRiesgo:true,';
                                            instruccion += 'nombreRiesgo:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreVariable+'",nombreCampo:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreCampo+'",valor:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].valor+'"}';
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
                                            instruccion += 'esVariable:true,esIndicador:false,esRiesgo:false,';
                                            instruccion += 'nombreVariable:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreVariable+'",nombreCampo:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreCampo+'",valor:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].valor+'"}';
                                        } else if(this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esIndicador) {
                                            instruccion += 'esVariable:false,esIndicador:true,esRiesgo:false,';
                                            instruccion += 'nombreIndicador:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreVariable+'",nombreCampo:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreCampo+'",valor:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].valor+'"}';
                                        } else if(this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].esRiesgo) {
                                            instruccion += 'esVariable:false,esIndicador:false,esRiesgo:true,';
                                            instruccion += 'nombreRiesgo:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreVariable+'",nombreCampo:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].nombreCampo+'",valor:"'+this.state.variablesSeleccionadasSeccionesDashboardUpdate[index][i].valor+'"}';
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
                                    instruccion += 'esVariable:true,esIndicador:false,esRiesgo:false,';
                                    instruccion += 'nombreVariable:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].nombreVariable+'",nombreCampo:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].nombreCampo+'",valor:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].valor+'"}';
                                } else if(this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].esIndicador) {
                                    instruccion += 'esVariable:false,esIndicador:true,esRiesgo:false,';
                                    instruccion += 'nombreIndicador:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].nombreIndicador+'",nombreCampo:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].nombreCampo+'",valor:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].valor+'"}';
                                } else if(this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].esRiesgo) {
                                    instruccion += 'esVariable:false,esIndicador:false,esRiesgo:true,';
                                    instruccion += 'nombreRiesgo:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].nombreRiesgo+'",nombreCampo:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].nombreCampo+'",valor:"'+this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index][i].valor+'"}';
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
                                        this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0) && this.state.objetoEjeYNuevo.valor == undefined) ) {
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
        var copySeccionesDashboard = [...this.state.seccionesDashboard];
        copySeccionesDashboard.splice(index, 1);
        var copyObjetoEjeXUpdate = [...this.state.objetoEjeXUpdate];
        copyObjetoEjeXUpdate.splice(index, 1);
        var copyTemp = [...this.state.variablesSeleccionadasSeccionesDashboardUpdate];
        copyTemp.splice(index, 1);
        var copyVarSel = [...this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate], copyVarDisponibles = [...this.state.variablesDisponiblesSeccionesDashboardTablaUpdate];
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
                    var objetoXCadena = arregloObjetoX.substring(arregloObjetoX.indexOf("{")+1, arregloObjetoX.indexOf("}"));
                    eval("objetoEjeXUpdate[i] = {"+objetoXCadena+"}");
                    objetoEjeXUpdate[i].nombre = '';
                    //this.getObject(objetoEjeXUpdate, i, objetoEjeXUpdate[i], "objetoEjeXUpdate");
                    var arregloObjetosY = cadenaValores.split("\\/")[1];
                    var arregloValores = arregloObjetosY.split("<>");
                    if(variablesDisponiblesSeccionesDashboardTablaUpdate[i] == undefined)
                        variablesDisponiblesSeccionesDashboardTablaUpdate[i] = [];
                    variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.variables.concat(this.props.indicadores, this.props.riesgos);
                    if(variablesSeleccionadasSeccionesDashboardUpdate[i] == undefined)
                        variablesSeleccionadasSeccionesDashboardUpdate[i] = [];
                    for (var j = 0; j < arregloValores.length; j++) {
                        var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{")+1, arregloValores[j].lastIndexOf("}"));
                        eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({"+objeto+"})");
                        variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = '';
                        //this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
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
                    variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.variables.concat(this.props.indicadores, this.props.riesgos);
                    if(variablesSeleccionadasSeccionesDashboardUpdate[i] == undefined)
                        variablesSeleccionadasSeccionesDashboardUpdate[i] = [];
                    for (var j = 0; j < arregloValores.length; j++) {
                        var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{")+1, arregloValores[j].lastIndexOf("}"));
                        eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({"+objeto+"})");
                        variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = '';
                        //this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
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
                variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.variables.concat(this.props.indicadores, this.props.riesgos);
                for (var j = 0; j < arregloValores.length; j++) {
                    var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{")+1, arregloValores[j].lastIndexOf("}"));
                    eval("variablesSeleccionadasSeccionesDashboardTablaUpdate[i].push({"+objeto+"})");
                    variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombre = '';
                    //this.getObject(variablesSeleccionadasSeccionesDashboardTablaUpdate, i, variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j], "variablesSeleccionadasSeccionesDashboardTablaUpdate", j);
                    //variablesDisponiblesSeccionesDashboardTablaUpdate[i] = this.props.variables.concat(this.props.indicadores, this.props.riesgos);
                };
                for (var j = 0; j < variablesSeleccionadasSeccionesDashboardTablaUpdate[i].length; j++) {
                    if(variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].esVariable) {
                        FORDISPONIBLES:
                        for (var k = 0; k < variablesDisponiblesSeccionesDashboardTablaUpdate[i].length; k++) {
                            if(variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].esVariable && variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].nombreVariable.localeCompare(variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombreVariable) == 0) {
                                variablesDisponiblesSeccionesDashboardTablaUpdate[i].splice(k, 1);
                                break FORDISPONIBLES;
                            }
                        };
                    } else if(variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].esIndicador) {
                        FORDISPONIBLES:
                        for (var k = 0; k < variablesDisponiblesSeccionesDashboardTablaUpdate[i].length; k++) {
                            if(variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].esIndicador && variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].nombreIndicador.localeCompare(variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombreIndicador) == 0) {
                                variablesDisponiblesSeccionesDashboardTablaUpdate[i].splice(k, 1);
                                break FORDISPONIBLES;
                            }
                        };
                    } else if(variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].esRiesgo) {
                        FORDISPONIBLES:
                        for (var k = 0; k < variablesDisponiblesSeccionesDashboardTablaUpdate[i].length; k++) {
                            if(variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].esRiesgo && variablesDisponiblesSeccionesDashboardTablaUpdate[i][k].nombreRiesgo.localeCompare(variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombreRiesgo) == 0) {
                                variablesDisponiblesSeccionesDashboardTablaUpdate[i].splice(k, 1);
                                break FORDISPONIBLES;
                            }
                        };
                    }
                };
            }
        };
        /*console.log('tipoObjetoUpdate')
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
        console.log(variablesDisponiblesSeccionesDashboardTablaUpdate)*/
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
                                                                        this.state.objetoEjeXNuevo.valor != undefined
                                                                        ?   this.state.objetoEjeXNuevo.valor
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
                                                                            <CampoDashboard esNumero={() => void 0}
                                                                                esBoolean={() => void 0}
                                                                                esFecha={() => void 0}
                                                                                esTexto={() => void 0}
                                                                                variables={this.props.variables}
                                                                                camposDeVariables={this.props.camposDeVariables}
                                                                                indicadores={this.props.indicadores}
                                                                                camposDeIndicadores={this.props.camposDeIndicadores}
                                                                                riesgos={this.props.riesgos}
                                                                                camposDeRiesgos={this.props.camposDeRiesgos}
                                                                                retornoSeleccionVariable={this.retornoSeleccionEjeX}>
                                                                            </CampoDashboard>
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
                                                                                <div key={variableSeleccionada.valor+i} className="border" style={{height: "33%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                                    {variableSeleccionada.valor}
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
                                                                            <CampoDashboard esNumero={() => void 0}
                                                                                esBoolean={() => void 0}
                                                                                esFecha={() => void 0}
                                                                                esTexto={() => void 0}
                                                                                variables={this.props.variables}
                                                                                camposDeVariables={this.props.camposDeVariables}
                                                                                indicadores={this.props.indicadores}
                                                                                camposDeIndicadores={this.props.camposDeIndicadores}
                                                                                riesgos={this.props.riesgos}
                                                                                camposDeRiesgos={this.props.camposDeRiesgos}
                                                                                retornoSeleccionVariable={this.retornoSeleccionEjeY}>
                                                                            </CampoDashboard>
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
                                                                                <div key={variableSeleccionada.valor+i} className="border" style={{height: "33%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                                    {variableSeleccionada.valor}
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
                                                                            <CampoDashboard esNumero={() => void 0}
                                                                                esBoolean={() => void 0}
                                                                                esFecha={() => void 0}
                                                                                esTexto={() => void 0}
                                                                                variables={this.props.variables}
                                                                                camposDeVariables={this.props.camposDeVariables}
                                                                                indicadores={this.props.indicadores}
                                                                                camposDeIndicadores={this.props.camposDeIndicadores}
                                                                                riesgos={this.props.riesgos}
                                                                                camposDeRiesgos={this.props.camposDeRiesgos}
                                                                                retornoSeleccionVariable={this.retornoSeleccionEjeY}>
                                                                            </CampoDashboard>
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
                                                                <div className={"selectGraph-content"} style={{overflowX: "scroll", overflowY: "hidden", whiteSpace: "nowrap", backgroundColor: "rgba(210, 210, 228, 0.3)", display: (this.state.displayGraphicsUpdate[i] ? "block" : "none" )}}>
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
                                                                                this.state.objetoEjeXUpdate[i] != undefined && this.state.objetoEjeXUpdate[i].valor != undefined
                                                                                ?   this.state.objetoEjeXUpdate[i].valor
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
                                                                                    <CampoDashboard esNumero={() => void 0}
                                                                                        esBoolean={() => void 0}
                                                                                        esFecha={() => void 0}
                                                                                        esTexto={() => void 0}
                                                                                        variables={this.props.variables}
                                                                                        camposDeVariables={this.props.camposDeVariables}
                                                                                        indicadores={this.props.indicadores}
                                                                                        camposDeIndicadores={this.props.camposDeIndicadores}
                                                                                        riesgos={this.props.riesgos}
                                                                                        camposDeRiesgos={this.props.camposDeRiesgos}
                                                                                        retornoSeleccionVariable={this.retornoSeleccionEjeXUpdate}>
                                                                                    </CampoDashboard>
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
                                                                                                    <div key={variableSeleccionada.valor+i} className="border" style={{height: "33%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                                                        {variableSeleccionada.valor}
                                                                                                        <span> <img className="addPointer" onClick={() => this.deleteVariableSeleccionadasSeccionesDashboardUpdate(i)} src={"../assets/trash.png"} style={{height: "20px", width: "20px", display: "block", float: "right"}}></img> </span>
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                        : ""
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
                                                                                    <CampoDashboard esNumero={() => void 0}
                                                                                        esBoolean={() => void 0}
                                                                                        esFecha={() => void 0}
                                                                                        esTexto={() => void 0}
                                                                                        variables={this.props.variables}
                                                                                        camposDeVariables={this.props.camposDeVariables}
                                                                                        indicadores={this.props.indicadores}
                                                                                        camposDeIndicadores={this.props.camposDeIndicadores}
                                                                                        riesgos={this.props.riesgos}
                                                                                        camposDeRiesgos={this.props.camposDeRiesgos}
                                                                                        retornoSeleccionVariable={this.retornoSeleccionEjeYUpdate}>
                                                                                    </CampoDashboard>
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
                                                                                                    <div key={variableSeleccionada.valor+i} className="border" style={{height: "33%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                                                        {variableSeleccionada.valor}
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
                                                                                    <CampoDashboard esNumero={() => void 0}
                                                                                        esBoolean={() => void 0}
                                                                                        esFecha={() => void 0}
                                                                                        esTexto={() => void 0}
                                                                                        variables={this.props.variables}
                                                                                        camposDeVariables={this.props.camposDeVariables}
                                                                                        indicadores={this.props.indicadores}
                                                                                        camposDeIndicadores={this.props.camposDeIndicadores}
                                                                                        riesgos={this.props.riesgos}
                                                                                        camposDeRiesgos={this.props.camposDeRiesgos}
                                                                                        retornoSeleccionVariable={this.retornoSeleccionEjeYUpdate}>
                                                                                    </CampoDashboard>
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
                                                <a href="#" className="btn btn-success active" onClick={() => this.modificarSeccionDashboard(i)}>Modificar Sección</a>
                                                <a href="#" className="btn btn-danger active" onClick={() => this.eliminarSeccionDashboard(i)} style={{marginLeft: "10px"}}>Eliminar Sección</a>
                                            </div>
                                            <br/>
                                        </div>
                                    )}

                                    <br/>
                                    <hr/>
                                    <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <a className={"btn btn-success btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.crearDashboard}>Crear</a>
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