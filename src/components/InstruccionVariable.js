import React from 'react';
import sql from 'mssql';

import OpcionesCrearRegla from './OpcionesCrearRegla.js';
import ContenedorReglas from './ContenedorReglas.js';

var indiceSeleccionadoReglas = -1;
var tipoElementoSeleccionadoRegla = '';
var campo;

var mostrarCrearCondicion = true;

export default class InstruccionVariable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reglas: this.props.reglas,
            mostrarOpcionSino: false,
            conexiones: [],
            camposConexiones: [],
            variablesEscalares: [],
            variables: [],
            camposVariables: [],
            variablesSQL: [],
            camposVariablesSQL: [],
            excel: [],
            camposDeExcel: [],
            formas: [],
            mostrarCrearCondicion: mostrarCrearCondicion
        }
        this.actualizarEstadoSeleccionSinoNuevaRegla = this.actualizarEstadoSeleccionSinoNuevaRegla.bind(this);
        this.getConections = this.getConections.bind(this);
        this.getFieldsConections = this.getFieldsConections.bind(this);
        this.getFieldConections = this.getFieldConections.bind(this);
        this.loadScalarVariables = this.loadScalarVariables.bind(this);
        this.loadScalarVariablesFields = this.loadScalarVariablesFields.bind(this);
        this.getVariables = this.getVariables.bind(this);
        this.getFieldsVariables = this.getFieldsVariables.bind(this);
        this.getFieldVariables = this.getFieldVariables.bind(this);
        this.loadVariablesSQL = this.loadVariablesSQL.bind(this);
        this.initLoadVariablesCamposSQL = this.initLoadVariablesCamposSQL.bind(this);
        this.loadVariablesCamposSQL = this.loadVariablesCamposSQL.bind(this);
        this.loadExcel = this.loadExcel.bind(this);
        this.initLoadExcelCampos = this.initLoadExcelCampos.bind(this);
        this.loadExcelCampos = this.loadExcelCampos.bind(this);
        this.loadFormas = this.loadFormas.bind(this);
        this.retornarIndiceSeleccionadoParaMostrarCampoObjetivo = this.retornarIndiceSeleccionadoParaMostrarCampoObjetivo.bind(this);
        this.retornoCampo = this.retornoCampo.bind(this);
        this.actualizarEstadoVistaEsCondicion = this.actualizarEstadoVistaEsCondicion.bind(this);
    }

    componentDidMount() {
        this.getConections();
        this.getVariables();
        this.loadScalarVariables();
        this.loadVariablesSQL();
        this.loadExcel();
        this.loadFormas();
    }

    actualizarEstadoSeleccionSinoNuevaRegla (mostrar) {
        /*this.setState({
            mostrarOpcionSino: mostrar
        });*/
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
                    console.log(err);
                    if (!rolledBack) {
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
                        }, this.getFieldsConections );
                        //this.getFieldsConections();
                    });
                }
            });
        }); // fin transaction
    }

    getFieldsConections () {
        var arregloTemp = [];
        for (var i = 0; i < this.state.conexiones.length; i++) {
            this.getFieldConections(this.state.conexiones[i].valor, i, arregloTemp, this.state.conexiones[i].ID);
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
                    console.log(err);
                    if (!rolledBack) {
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
                        this.setState({
                            variablesEscalares: temp
                        } );
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
            request.query("select * from Variables where esObjeto = 'true'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
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
                        }, this.getFieldsVariables );
                        //this.getFieldsVariables();
                    });
                }
            });
        }); // fin transaction
    }

    getFieldsVariables () {
        var arregloTemp = [];
        for (var i = 0; i < this.state.variables.length; i++) {
            this.getFieldVariables(this.state.variables[i].ID, i, arregloTemp);
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
                        console.log(err);
                        if (!rolledBack) {
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
                        });
                    }
                });
            }); // fin transaction
        }
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
                        this.setState({
                            camposVariablesSQL: array
                        });
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
                        this.setState({
                            camposDeExcel: array
                        });
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
                        this.setState({
                            formas: nombreColumnas
                        });
                    });
                }
            });
        }); // fin transaction
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
        /*if(this.props.reglas.length-1 == indiceI*/ /*&& this.props.reglas[indiceI-1].length == indiceJ*/ /*&& tipoIndiceSeleccionado.localeCompare("abajo") == 0) {
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
        }*/
    }

    retornoCampo (campo) {
        campo = campo;
        this.props.retornoCampo(campo);
    }

    actualizarEstadoVistaEsCondicion (mostrarCrearCondicionN) {
        mostrarCrearCondicion = mostrarCrearCondicionN;
        this.setState({
            mostrarCrearCondicion: mostrarCrearCondicionN
        });
        this.props.retornarEstadoVistaEsCondicion(mostrarCrearCondicionN);
    }
    
    render() {
        return (
            <div>
                {this.props.navbar}
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"card"} style={{width: "100%"}}>
                        <OpcionesCrearRegla pool={this.props.pool} campos={this.props.campos}
                                            reglas={this.state.reglas}
                                            asignaciones={this.props.asignaciones}
                                            retornarValor={this.props.retornarValor}
                                            retornoCampo={this.props.retornoCampo}
                                            retornoOperacion={this.props.retornoOperacion}
                                            camposDropdown={this.props.camposDropdown}
                                            valoresDropdown={this.props.valoresDropdown}
                                            mostrarOpcionSino={this.state.mostrarOpcionSino}
                                            callbackCrearRegla={this.props.callbackCrearRegla}
                                            goToCreateFormula={this.props.goToCreateFormula}
                                            tablas={this.state.conexiones}
                                            camposTablas={this.state.camposConexiones}
                                            variablesEscalares={this.state.variablesEscalares}
                                            objetos={this.state.variables}
                                            camposDeObjetos={this.state.camposVariables}
                                            excel={this.state.excel}
                                            camposDeExcel={this.state.camposDeExcel}
                                            formas={this.state.formas}
                                            variablesSQL={this.state.variablesSQL}
                                            camposVariablesSQL={this.state.camposVariablesSQL}
                                            mostrarCrearCondicion={this.state.mostrarCrearCondicion}
                                            callbackModificarRegla={this.props.callbackModificarRegla}
                                            callbackEliminarRegla={this.props.callbackEliminarRegla}
                                            actualizarNivelNuevaRegla={this.props.actualizarNivelNuevaRegla}
                                            actualizarEstadoVistaEsCondicion={this.actualizarEstadoVistaEsCondicion}>
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
