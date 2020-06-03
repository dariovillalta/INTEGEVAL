import React from 'react';
import sql from 'mssql';
import Slider from 'react-input-slider';

const tipoCampos = [ {nombre: "texto"}, {nombre: "booleano"}, {nombre: "fecha"}, {nombre: "número"}, {nombre: "arreglo"}];

var seccionesDashboard = [];

var tipoObjetoUpdate = [], tipoGraficoUpdate = [], displayGraphicsUpdate = [], indiceGraphSelectUpdate = [], objetoEjeXUpdate = [];
var variablesSeleccionadasSeccionesDashboardUpdate = [], variablesSeleccionadasSeccionesDashboardTablaUpdate = [];

var contadorGetObjectsNameINICIO = 0, contadorGetObjectsNameFIN = 0;

export default class VerDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            html: ''
        }
        this.crearRiesgo = this.crearRiesgo.bind(this);
    }

    crearDashboard () {
        var nombre = $("#nombreDashboard").val();
        var descripcion = $("#descripcionDashboard").val();;
    }

    crearHTML() {
        var htmlSecciones = [];
        var contadorCol6PorRow = 0;
        for (var i = 0; i < seccionesDashboard.length; i++) {
            if (seccionesDashboard[i].tipoObjeto.localeCompare("grafica") == 0) {
                if (seccionesDashboard[i].tamano.localeCompare("col-6") == 0) {
                    contadorCol6PorRow++;
                    if(contadorCol6PorRow == 2) {
                        contadorCol6PorRow = 0;
                    }
                    var htmlSeccion =   <div className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <div id={"grafica"+i}></div>
                                        </div>
                    htmlSecciones.push(htmlSeccion);
                    /*html += '<div className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>';
                    html += this.getObjetoCodigo(seccionesDashboard[i].tipoObjeto, seccionesDashboard[i].instrucciones, i);*/
                }
            } else if (seccionesDashboard[i].tipoObjeto.localeCompare("tabla") == 0) {
                if (seccionesDashboard[i].tamano.localeCompare("col-6") == 0) {
                    contadorCol6PorRow++;
                    if(contadorCol6PorRow == 2) {
                        contadorCol6PorRow = 0;
                    }
                    html += '<div className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>';
                    html += this.getObjetoCodigo(seccionesDashboard[i].tipoObjeto, seccionesDashboard[i].instrucciones, i);
                }
            }
        };
    }

    getObjetoCodigo(tipoObjeto, instrucciones, index) {
        var html = '';
        if(tipoObjeto.localeCompare("grafica") == 0) {
            html += '\t<div id="grafica'+index+'"></div>';
        } else if(tipoObjeto.localeCompare("tabla") == 0) {
            //html += ;
        }
    }

    crearArreglosDeInstrucciones () {
        contadorGetObjectsNameINICIO = 0;
        contadorGetObjectsNameFIN = 0;
        tipoObjetoUpdate = [];
        tipoGraficoUpdate = [];
        displayGraphicsUpdate = [];
        indiceGraphSelectUpdate = [];
        objetoEjeXUpdate = [];
        variablesSeleccionadasSeccionesDashboardUpdate = [];
        variablesSeleccionadasSeccionesDashboardTablaUpdate = [];
        for (var i = 0; i < seccionesDashboard.length; i++) {
            if(seccionesDashboard[i].instruccion.indexOf("GRAFICA") == 0) {
                var cadenaValores = seccionesDashboard[i].instruccion.split("=>")[1];
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
                    contadorGetObjectsNameFIN++;
                    this.getObject(objetoEjeXUpdate, i, objetoEjeXUpdate[i], "objetoEjeXUpdate");
                    var arregloObjetosY = cadenaValores.split("\\/")[1];
                    var arregloValores = arregloObjetosY.split("<>");
                    if(variablesSeleccionadasSeccionesDashboardUpdate[i] == undefined)
                        variablesSeleccionadasSeccionesDashboardUpdate[i] = [];
                    for (var j = 0; j < arregloValores.length; j++) {
                        var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{")+1, arregloValores[j].lastIndexOf("}"));
                        eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({"+objeto+"})");
                        variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = '';
                        contadorGetObjectsNameFIN++;
                        this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
                    };
                } else if(cadenaValores.indexOf("PIE") == 0) {
                    tipoGraficoUpdate[i] = 'PIE';
                    indiceGraphSelectUpdate[i] = 4;
                    if(objetoEjeXUpdate[i] == undefined)
                        objetoEjeXUpdate[i] = [];
                    var arregloObjetoX = cadenaValores.split("\\/")[0];
                    var objetoXCadena = arregloObjetoX.substring(arregloObjetoX.indexOf("{")+1, arregloObjetoX.lastIndexOf("}"));
                    eval("objetoEjeXUpdate[i] = {"+objetoXCadena+"}");
                    objetoEjeXUpdate[i].nombre = '';
                    contadorGetObjectsNameFIN++;
                    this.getObject(objetoEjeXUpdate, indice, objetoEjeXUpdate[i], "objetoEjeXUpdate");
                    var arregloObjetosY = cadenaValores.split("\\/")[1];
                    var arregloValores = arregloObjetosY.split("<>");
                    for (var j = 0; j < arregloValores.length; j++) {
                        var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{")+1, arregloValores[j].lastIndexOf("}"));
                        eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({"+objeto+"})");
                        variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = '';
                        contadorGetObjectsNameFIN++;
                        this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
                    };
                }
            } else if(seccionesDashboard[i].instruccion.indexOf("TABLA") == 0) {
                var cadenaValores = seccionesDashboard[i].instruccion.split("=>")[1];
                var arregloValores = cadenaValores.split("<>");
                tipoObjetoUpdate[i] = 'tabla';
                if(variablesSeleccionadasSeccionesDashboardTablaUpdate[i] == undefined)
                    variablesSeleccionadasSeccionesDashboardTablaUpdate[i] = [];
                for (var j = 0; j < arregloValores.length; j++) {
                    var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{")+1, arregloValores[j].lastIndexOf("}"));
                    eval("variablesSeleccionadasSeccionesDashboardTablaUpdate[i].push({"+objeto+"})");
                    variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombre = '';
                    contadorGetObjectsNameFIN++;
                    this.getObject(variablesSeleccionadasSeccionesDashboardTablaUpdate, i, variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j], "variablesSeleccionadasSeccionesDashboardTablaUpdate", j);
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
                        if(result.recordset.length > 0) {
                            var nombre = result.recordset[0].nombre;
                            if(objeto.esTabla) {
                                nombre = objeto.nombreCampoTabla;
                            }
                            if(arregloNombre.localeCompare("objetoEjeXUpdate") == 0)
                                arreglo[indiceSec].nombre = nombre;
                            else
                                arreglo[indiceSec][indice].nombre = nombre;
                            contadorGetObjectsNameINICIO++;
                            this.traerDatos();
                        }
                    });
                }
            });
        }); // fin transaction
    }

    traerDatos() {
        if(contadorGetObjectsNameINICIO == contadorGetObjectsNameFIN) {
            for (var i = 0; i < seccionesDashboard.length; i++) {
                if(seccionesDashboard[i].tipoObjeto.localeCompare("grafica") == 0) {
                    if(tipoGraficoUpdate[i].indexOf("LINEA") == 0 || tipoGraficoUpdate[i].indexOf("AREA") == 0 || tipoGraficoUpdate[i].indexOf("BARRA") == 0 || tipoGraficoUpdate[i].indexOf("DISPERSION") == 0) {
                        //objetoEjeXUpdate
                        //variablesSeleccionadasSeccionesDashboardUpdate
                    } else if(tipoGraficoUpdate[i].indexOf("PIE") == 0) {
                        //
                    }
                } else {
                    //variablesSeleccionadasSeccionesDashboardTablaUpdate
                }
            };
        }
    }

    getResultsVariables (variable, arreglo) {
        //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ResultadosNombreVariables where nombre = '"+variable.nombre+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                        return [];
                    }
                } else {
                    transaction.commit(err => {
                        this.getResultsVariablesFieldsInit(result.recordset, arreglo);
                    });
                }
            });
        }); // fin transaction
    }

    getResultsVariablesFieldsInit (resultados, arreglo) {
        for (var i = 0; i < resultados.length; i++) {
            this.getFieldAttributes(resultados[i], i, arreglo);
            this.getFieldResults(resultados[i], i, arreglo);
        };
    }

    getFieldAttributes(resultado, index, array) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '"+resultado.nombreVariable+'_'+resultado.inicioVigencia.getFullYear()+'_'+(resultado.inicioVigencia.getMonth()+1)+'_'+resultado.inicioVigencia.getDate()+'_'+resultado.inicioVigencia.getHours()+'_'+resultado.inicioVigencia.getMinutes()+'_'+resultado.inicioVigencia.getSeconds()+"'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var arrTemp = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            arrTemp.push({nombre: result.recordset[i].COLUMN_NAME, tipo: result.recordset[i].DATA_TYPE});
                        };
                        array[index].atributos = arrTemp;
                    });
                }
            });
        }); // fin transaction
    }

    getFieldResults(resultado, index, array) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from "+resultado.nombreVariable+'_'+resultado.inicioVigencia.getFullYear()+'_'+(resultado.inicioVigencia.getMonth()+1)+'_'+resultado.inicioVigencia.getDate()+'_'+resultado.inicioVigencia.getHours()+'_'+resultado.inicioVigencia.getMinutes()+'_'+resultado.inicioVigencia.getSeconds(), (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        array[index].resultados = result.recordset;
                    });
                }
            });
        }); // fin transaction
    }

    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Crear Dashboard</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornarSeleccionDashboards}><a href="#" className={"breadcrumb-link"}>Dashboards</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Dashboard: {this.props.tituloDashboard}</li>
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
                                            <label htmlFor="tamano" className="col-form-label">Tipo de Indicador</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <select id="tamano" className="form-control">
                                                <option value="col-6">Mitad de Página</option>
                                                <option value="col-12">Riesgo Inherente</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="tipoObjeto" className="col-form-label">Tipo de Objeto</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <select id="tipoObjeto" className="form-control">
                                                <option value="grafica">Gráfica</option>
                                                <option value="tabla">Tabla</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label className="col-form-label">Variables Seleccionadas</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <div style={{width: "50%", textAlign: "center"}}>
                                                <h4 className="pageheader-title">Variables Seleccionadas</h4>
                                                <div style={{height: "25vh", width: "100%", overflowY: "scroll"}}>
                                                    {this.state.variablesSeleccionadasSeccionesDashboard[i].map((variableSeleccionada, i) =>
                                                        <div style={{height: "33%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                            {variableSeleccionada.nombre}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div style={{width: "50%", textAlign: "center"}}>
                                                <h4 className="pageheader-title">Variables Disponibles</h4>
                                                <div style={{height: "25vh", width: "100%", overflowY: "scroll"}}>
                                                    {this.state.variablesDisponiblesSeccionesDashboard[i].map((variableSeleccionada, i) =>
                                                        <div style={{height: "33%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                            {variableSeleccionada.nombre}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <br/>
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
