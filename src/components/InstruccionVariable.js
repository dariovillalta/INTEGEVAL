import React from 'react';
import sql from 'mssql';

import OpcionesCrearRegla from './OpcionesCrearRegla.js';
import ContenedorReglas from './ContenedorReglas.js';

var indiceSeleccionadoReglas = -1;
var tipoElementoSeleccionadoRegla = '';
var campo;

var conexionesOriginales = [], camposConexionesOriginales = [], variablesOriginales = [], camposVariablesOriginales = [];
export default class InstruccionVariable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reglas: this.props.reglas,
            mostrarOpcionSino: false,
            conexiones: [],
            camposConexiones: [],
            variables: [],
            camposVariables: []
        }
        this.actualizarEstadoSeleccionSinoNuevaRegla = this.actualizarEstadoSeleccionSinoNuevaRegla.bind(this);
        this.getConections = this.getConections.bind(this);
        this.getFieldsConections = this.getFieldsConections.bind(this);
        this.getFieldConections = this.getFieldConections.bind(this);
        this.getVariables = this.getVariables.bind(this);
        this.getFieldsVariables = this.getFieldsVariables.bind(this);
        this.getFieldVariables = this.getFieldVariables.bind(this);
        this.retornarIndiceSeleccionadoParaMostrarCampoObjetivo = this.retornarIndiceSeleccionadoParaMostrarCampoObjetivo.bind(this);
        this.retornoCampo = this.retornoCampo.bind(this);
    }

    componentDidMount() {
        this.getConections();
        this.getVariables();
    }

    actualizarEstadoSeleccionSinoNuevaRegla (mostrar) {
        console.log('mostrar');
        console.log(mostrar);
        this.setState({
            mostrarOpcionSino: mostrar
        });
    }

    getConections () {
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
                        return [];
                    }
                } else {
                    transaction.commit(err => {
                        var temp = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            temp.push({valor: result.recordset[i].tabla, ID: result.recordset[i].ID});
                        };
                        /*this.setState({
                            conexiones: temp
                        }, this.getFieldsConections );*/
                        this.setState({
                            conexiones: temp
                        });
                        conexionesOriginales = temp;
                        this.getFieldsConections();
                    });
                }
            });
        }); // fin transaction
    }

    getFieldsConections () {
        var arregloTemp = [];
        for (var i = 0; i < conexionesOriginales.length; i++) {
            this.getFieldConections(conexionesOriginales[i].valor, i, arregloTemp, conexionesOriginales[i].ID);
        };
    }

    getFieldConections(nombreTabla, index, array, tablaID) {
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
                            nombreColumnas.push({valor: result.recordset[i].COLUMN_NAME, tipo: result.recordset[i].DATA_TYPE, tablaID: tablaID});
                        };
                        if(array[index] == undefined) {
                            array[index] = [];
                        }
                        array[index] = $.merge(array[index], nombreColumnas);
                        this.setState({
                            camposConexiones: array
                        });
                        camposConexionesOriginales = array;
                    });
                }
            });
        }); // fin transaction
    }

    getVariables () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Variables", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                        return [];
                    }
                } else {
                    transaction.commit(err => {
                        var temp = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            temp.push({valor: result.recordset[i].nombre, ID: result.recordset[i].ID});
                        };
                        /*this.setState({
                            variables: temp
                        }, this.getFieldsVariables );*/
                        this.setState({
                            variables: temp
                        });
                        variablesOriginales = temp;
                        this.getFieldsVariables();
                    });
                }
            });
        }); // fin transaction
    }

    getFieldsVariables () {
        var arregloTemp = [];
        for (var i = 0; i < variablesOriginales.length; i++) {
            this.getFieldVariables(variablesOriginales[i].ID, i, arregloTemp);
        };
    }

    getFieldVariables(variableID, index, array) {
        if(variableID != undefined) {
            const transaction = new sql.Transaction( this.props.pool );
            transaction.begin(err => {
                var rolledBack = false;
                transaction.on('rollback', aborted => {
                    rolledBack = true;
                });
                const request = new sql.Request(transaction);
                request.query("select * from VariablesCampos where variableID = "+variableID, (err, result) => {
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
                                nombreColumnas.push({valor: result.recordset[i].nombre, tipo: result.recordset[i].tipo, ID: result.recordset[i].ID, variableID: variableID});
                            };
                            if(array[index] == undefined) {
                                array[index] = [];
                            }
                            array[index] = $.merge(array[index], nombreColumnas);
                            this.setState({
                                camposVariables: array
                            });
                            camposVariablesOriginales = array;
                            console.log('camposVariablesOriginales');
                            console.log(camposVariablesOriginales);
                        });
                    }
                });
            }); // fin transaction
        }
    }

    retornarIndiceSeleccionadoParaMostrarCampoObjetivo (reglaSeleccionada, tipoIndiceSeleccionado, indiceI, indiceJ) {
        console.log('reglaSeleccionada');
        console.log(reglaSeleccionada);
        console.log('tipoIndiceSeleccionado');
        console.log(tipoIndiceSeleccionado);
        console.log('this.props.reglas');
        console.log(this.props.reglas);
        console.log('this.props.reglas.length');
        console.log(this.props.reglas.length);
        /*console.log('this.props.reglas[indiceI-1].length');
        console.log(this.props.reglas[indiceI-1].length);*/
        if(this.props.reglas.length-1 == indiceI /*&& this.props.reglas[indiceI-1].length == indiceJ*/ && tipoIndiceSeleccionado.localeCompare("abajo") == 0) {
            //EL CASO CUANDO EL INDICE SELECCIONADO DE REGLAS ES EL ULTIMO Y SELECCIONO tipoIndiceSeleccionado = ABAJO
            //reset
            console.log('1');
            this.setState({
                conexiones: conexionesOriginales,
                camposConexiones: camposConexionesOriginales,
                variables: variablesOriginales,
                camposVariables: camposVariablesOriginales
            });
        } else {
            console.log('2');
            //puede ser otra regla, una formula o el cursor de arriba
            //mostrar campos
            var tempCopyVariables = [];
            var tempCopyCampos = [];
            if(reglaSeleccionada[0].esConexionTabla) {
                console.log('2.1');
                for (var i = 0; i < conexionesOriginales.length; i++) {
                    if(reglaSeleccionada[0].conexionTablaID == conexionesOriginales[i].ID) {
                        tempCopyVariables = conexionesOriginales[i];
                        tempCopyCampos = camposConexionesOriginales[i];
                        break;
                    }
                };
                this.setState({
                    conexiones: [tempCopyVariables],
                    camposConexiones: [tempCopyCampos],
                    variables: [],
                    camposVariables: []
                });
            } else {
                console.log('2.2');
                for (var i = 0; i < variablesOriginales.length; i++) {
                    if(reglaSeleccionada[0].variableID == variablesOriginales[i].ID) {
                        tempCopyVariables = jQuery.extend(true, {}, variablesOriginales[i]);
                        tempCopyCampos = jQuery.extend(true, {}, camposVariablesOriginales[i]);
                        break;
                    }
                };
                this.setState({
                    conexiones: [],
                    camposConexiones: [],
                    variables: [tempCopyVariables],
                    camposVariables: [[tempCopyCampos]]
                });
            }
        }
        /*if(tipoIndiceSeleccionado.localeCompare("abajo") == 0) {
            console.log('1');
            //reset
            this.setState({
                conexiones: conexionesOriginales,
                camposConexiones: camposConexionesOriginales,
                variables: variablesOriginales,
                camposVariables: camposVariablesOriginales
            });
        }  else {
            console.log('2');
            //puede ser otra regla, una formula o el cursor de arriba
            //mostrar campos
            var tempCopyVariables = [];
            var tempCopyCampos = [];
            if(reglaSeleccionada.esConexionTabla) {
                for (var i = 0; i < conexionesOriginales.length; i++) {
                    if(reglaSeleccionada.conexionTablaID == conexionesOriginales[i].ID) {
                        tempCopyVariables = conexionesOriginales[i];
                        tempCopyCampos = camposConexionesOriginales[i];
                        break;
                    }
                };
                console.log('[tempCopyVariables]')
                console.log([tempCopyVariables])
                console.log('[tempCopyCampos]')
                console.log([tempCopyCampos])
                console.log('conexionesOriginales')
                console.log(conexionesOriginales)
                console.log('camposConexionesOriginales')
                console.log(camposConexionesOriginales)
                this.setState({
                    conexiones: [tempCopyVariables],
                    camposConexiones: [tempCopyCampos],
                    variables: [],
                    camposVariables: []
                });
            } else {
                for (var i = 0; i < variablesOriginales.length; i++) {
                    if(reglaSeleccionada.variableID == variablesOriginales[i].ID) {
                        tempCopyVariables = jQuery.extend(true, {}, variablesOriginales[i]);
                        tempCopyCampos = jQuery.extend(true, {}, camposVariablesOriginales[i]);
                        break;
                    }
                };
                this.setState({
                    conexiones: [],
                    camposConexiones: [],
                    variables: [tempCopyVariables],
                    camposVariables: [[tempCopyCampos]]
                });
            }
        }*/
    }

    retornoCampo (campo) {
        campo = campo;
        this.props.retornoCampo(campo);
    }
    
    render() {
        return (
            <div>
                {this.props.navbar}
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"card"} style={{width: "100%"}}>
                        <OpcionesCrearRegla pool={this.props.pool} campos={this.props.campos}
                                            asignaciones={this.props.asignaciones}
                                            retornoCampo={this.retornoCampo}
                                            retornoOperacion={this.props.retornoOperacion}
                                            camposDropdown={this.props.camposDropdown}
                                            valoresDropdown={this.props.valoresDropdown}
                                            mostrarOpcionSino={this.state.mostrarOpcionSino}
                                            callbackCrearRegla={this.props.callbackCrearRegla}
                                            goToCreateFormula={this.props.goToCreateFormula}
                                            conexiones={this.state.conexiones}
                                            camposConexiones={this.state.camposConexiones}
                                            variables={this.state.variables}
                                            camposVariables={this.state.camposVariables}
                                            actualizarNivelNuevaRegla={this.props.actualizarNivelNuevaRegla}
                                            retornarEstadoVistaEsCondicion={this.props.retornarEstadoVistaEsCondicion}>
                        </OpcionesCrearRegla>
                    </div>
                </div>
                <hr/>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"text-center"}>
                            <h2>Lógica para el cálculo</h2>
                        </div>
                        <ContenedorReglas reglas={this.state.reglas}
                                            actualizarEstadoSeleccionSinoNuevaRegla={this.actualizarEstadoSeleccionSinoNuevaRegla}
                                            retornarIndiceSeleccionadoParaMostrarCampoObjetivo={this.retornarIndiceSeleccionadoParaMostrarCampoObjetivo}
                                            retornarIndiceSeleccionado={this.props.retornarIndiceSeleccionado}>
                        </ContenedorReglas>
                    </div>
                </div>
            </div>
        );
    }
}
