import React from 'react';
import sql from 'mssql';
import Slider from 'react-input-slider';

import Modal from '../Modal/Modal.js';
import CampoDashboard from '../Dashboards/CampoDashboard.js';

const tipoCampos = [ {nombre: "texto"}, {nombre: "booleano"}, {nombre: "fecha"}, {nombre: "número"}, {nombre: "arreglo"}];

var tipoGrafico;

export default class CrearGrafico extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seccionesGraficos: [],
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
        this.modificarSeccionDashboard = this.modificarSeccionDashboard.bind(this);
        this.eliminarSeccionDashboard = this.eliminarSeccionDashboard.bind(this);
        this.crearArreglosDeInstruccionesUpdate = this.crearArreglosDeInstruccionesUpdate.bind(this);
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
        var instruccion = '';
        //EJEMPLO: GRAFICA=>AREA[EJEX={esVariable: true, variableID: 1}\/EJEX={esVariable: true, esTabla: false, ^ variableID: 1}<>{esVariable: true, ^ variableID: 1}]
        instruccion += 'GRAFICA=>';
        if(this.state.tipoGraficoNuevo.length > 0) {
            instruccion += this.state.tipoGraficoNuevo+"[";
            if(this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || 
                this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0) {
                //EJEY
                instruccion += "EJEX={";
                console.log('this.state.objetoEjeXNuevo');
                console.log(this.state.objetoEjeXNuevo);
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
                console.log('this.state.variablesSeleccionadasSeccionesDashboardNueva');
                console.log(this.state.variablesSeleccionadasSeccionesDashboardNueva);
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

        //viendo si creo variables
        if( ((this.state.tipoGraficoNuevo.localeCompare("LINEA") == 0 || this.state.tipoGraficoNuevo.localeCompare("AREA") == 0 || 
                            this.state.tipoGraficoNuevo.localeCompare("BARRA") == 0 || this.state.tipoGraficoNuevo.localeCompare("DISPERSION") == 0) && this.state.objetoEjeXNuevo != undefined && this.state.objetoEjeXNuevo.valor != undefined && this.state.variablesSeleccionadasSeccionesDashboardNueva.length > 0) ||
            ( (this.state.tipoGraficoNuevo.localeCompare("PIE") == 0) && this.state.variablesSeleccionadasSeccionesDashboardNueva.length > 0 ) ||
            (tipoObjeto.localeCompare("tabla") == 0 && this.state.variablesSeleccionadasSeccionesDashboardTablaNueva.length > 0) ) {
                var seccionesGraficos = [...this.state.seccionesGraficos];
                seccionesGraficos.push({instruccion: instruccion});
                this.setState({
                    seccionesGraficos: seccionesGraficos
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
        var tipoGraficoUpdate = [], displayGraphicsUpdate = [], indiceGraphSelectUpdate = [], objetoEjeXUpdate = [];
        var variablesSeleccionadasSeccionesDashboardUpdate = [], variablesSeleccionadasSeccionesDashboardTablaUpdate = [], variablesDisponiblesSeccionesDashboardTablaUpdate = [];
        for (var i = 0; i < this.state.seccionesGraficos.length; i++) {
            if(this.state.seccionesGraficos[i].instruccion.indexOf("GRAFICA") == 0) {
                var cadenaValores = this.state.seccionesGraficos[i].instruccion.split("=>")[1];
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
                    console.log('arregloObjetoX');
                    console.log(arregloObjetoX);
                    console.log('objetoXCadena');
                    console.log(objetoXCadena);
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
                        console.log('objeto');
                        console.log(objeto);
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
                        console.log('objeto');
                        console.log(objeto);
                        eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({"+objeto+"})");
                        variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = '';
                        //this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
                    };
                }
            }
        };
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
        this.setState({
            tipoGraficoUpdate: tipoGraficoUpdate,
            objetoEjeXUpdate: objetoEjeXUpdate,
            variablesSeleccionadasSeccionesDashboardUpdate: variablesSeleccionadasSeccionesDashboardUpdate,
            displayGraphicsUpdate: displayGraphicsUpdate,
            indiceGraphSelectUpdate: indiceGraphSelectUpdate
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
        console.log("CALLED")
        var copyTemp = [...this.state.displayGraphicsUpdate];
        console.log(copyTemp);
        for (var i = 0; i < copyTemp.length; i++) {
            copyTemp[i] = false;
        };
        console.log(copyTemp);
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
        }, console.log(this.state.variablesSeleccionadasSeccionesDashboardNueva) );
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

    modificarSeccionDashboard (index) {
        //viendo si creo variables
        if( ((this.state.tipoGraficoUpdate[index].localeCompare("LINEA") == 0 || this.state.tipoGraficoUpdate[index].localeCompare("AREA") == 0 || 
            this.state.tipoGraficoUpdate[index].localeCompare("BARRA") == 0 || this.state.tipoGraficoUpdate[index].localeCompare("DISPERSION") == 0) && this.state.objetoEjeXUpdate[index] != undefined && this.state.objetoEjeXUpdate[index].valor != undefined && this.state.variablesSeleccionadasSeccionesDashboardUpdate[index] != undefined && this.state.variablesSeleccionadasSeccionesDashboardUpdate[index].length > 0) ||
            (tipoObjetoUpdate[index].localeCompare("tabla") == 0 && this.state.variablesSeleccionadasSeccionesDashboardTablaUpdate[index].length > 0) ) {
            var instruccion = '';
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
            var seccionesDashboard = [...this.state.seccionesDashboard];
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
            }
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
        this.setState({
            seccionesDashboard: copySeccionesDashboard,
            objetoEjeXUpdate: copyObjetoEjeXUpdate,
            variablesSeleccionadasSeccionesDashboardUpdate: copyTemp,
            variablesSeleccionadasSeccionesDashboardTablaUpdate: copyVarSel,
            variablesDisponiblesSeccionesDashboardTablaUpdate: copyVarDisponibles
        });
    }

    crearArreglosDeInstruccionesUpdate () {
        var tipoGraficoUpdate = [], displayGraphicsUpdate = [], indiceGraphSelectUpdate = [], objetoEjeXUpdate = [];
        var variablesSeleccionadasSeccionesDashboardUpdate = [], variablesSeleccionadasSeccionesDashboardTablaUpdate = [], variablesDisponiblesSeccionesDashboardTablaUpdate = [];
        for (var i = 0; i < this.state.seccionesGraficos.length; i++) {
            if(this.state.seccionesGraficos[i].instruccion.indexOf("GRAFICA") == 0) {
                var cadenaValores = this.state.seccionesGraficos[i].instruccion.split("=>")[1];
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
            }
        };
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
        this.setState({
            tipoGraficoUpdate: tipoGraficoUpdate,
            displayGraphicsUpdate: displayGraphicsUpdate,
            indiceGraphSelectUpdate: indiceGraphSelectUpdate
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
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goSeleccionReporteria}><a href="#" className={"breadcrumb-link"}>Seleccionar Tipo de Reportería</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Configurar Gráfico</li>
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
                                    
                                    <div style={{width: "100%"}}>
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
                                    <br/>
                                    <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <a href="#" className="btn btn-brand active" onClick={this.crearSeccionDashboard}>Crear Gráfico</a>
                                    </div>
                                    <br/>




                                    {this.state.seccionesGraficos.map((seccionDashboard, i) =>
                                        <div key={seccionDashboard.tamano+i} style={{width: "100%"}}>

                                            <div style={{width: "100%"}}>
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
                                        <a className={"btn btn-success btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={() => this.props.verGrafico(this.state.seccionesGraficos)}>Ver</a>
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