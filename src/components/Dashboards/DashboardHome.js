import React from 'react';
import sql from 'mssql';

import SeleccionarDashboard from './SeleccionarDashboard.js';
import CrearDashboard from './CrearDashboard.js';
import EditarDashboardHome from './EditarDashboardHome.js';

export default class DashboardHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componenteActual: "selDashboard",
            conexiones: [],
            camposConexiones: [],
            variablesEscalares: [],
            variables: [],
            camposVariables: [],
            variablesSQL: [],
            camposVariablesSQL: [],
            excel: [],
            camposDeExcel: [],
            formas: []
        }
        this.crearDashboard = this.crearDashboard.bind(this);
        this.retornarSeleccionDashboards = this.retornarSeleccionDashboards.bind(this);
        this.editarVariables = this.editarVariables.bind(this);
        this.changeStateFirstTimeToFalse = this.changeStateFirstTimeToFalse.bind(this);
        this.terminoCrearVariablesPasarAEdit = this.terminoCrearVariablesPasarAEdit.bind(this);
        this.actualizarIDVariableModificada = this.actualizarIDVariableModificada.bind(this);

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
    }

    componentDidMount () {
        this.getConections();
        this.getVariables();
        this.loadScalarVariables();
        this.loadVariablesSQL();
        this.loadExcel();
        this.loadFormas();
    }

    crearDashboard () {
        this.setState({
            componenteActual: "crearDashboard"
        });
    }

    retornarSeleccionDashboards () {
        this.setState({
            componenteActual: "selDashboard"
        });
    }

    editarVariables (idVariable, esObjetoVariable, esInstruccionSQLVariable, tipoVariable) {
        this.setState({
            idVariable: idVariable,
            componenteActual: "editarVariables",
            tipoVariable: tipoVariable,
            esObjetoVariable: esObjetoVariable,
            esInstruccionSQLVariable: esInstruccionSQLVariable,
            esPrimeraVez: true
        });
    }

    changeStateFirstTimeToFalse() {
        this.setState({
            esPrimeraVez: false
        });
    }

    terminoCrearVariablesPasarAEdit (nombreFuenteDatos) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Campos where nombre = '"+nombreFuenteDatos+"'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset != undefined) {
                            if(result.recordset.length) {
                                this.editarFuenteDatos(result.recordset[0].ID, result.recordset[0].nombre, result.recordset[0].descripcion, result.recordset[0].esObjeto, result.recordset[0].objetoPadreID, result.recordset[0].guardar);
                            }
                        }
                    });
                }
            });
        }); // fin transaction
    }

    actualizarIDVariableModificada (tablaDeVariableModificada) {
        if(tablaDeVariableModificada.localeCompare("excel") == 0) {
            const transaction = new sql.Transaction( this.props.pool );
            transaction.begin(err => {
                var rolledBack = false;
                transaction.on('rollback', aborted => {
                    rolledBack = true;
                });
                const request = new sql.Request(transaction);
                request.query("select top 1 * from ExcelArchivos order by ID desc", (err, result) => {
                    if (err) {
                        console.log(err);
                        if (!rolledBack) {
                            transaction.rollback(err => {
                            });
                        }
                    } else {
                        transaction.commit(err => {
                            if(result.recordset.length > 0) {
                                this.editarVariables(result.recordset[0].ID, false, false, "excel");
                            }
                        });
                    }
                });
            }); // fin transaction
        } else if(tablaDeVariableModificada.localeCompare("forma") == 0) {
            const transaction = new sql.Transaction( this.props.pool );
            transaction.begin(err => {
                var rolledBack = false;
                transaction.on('rollback', aborted => {
                    rolledBack = true;
                });
                const request = new sql.Request(transaction);
                request.query("select top 1 * from FormasVariables order by ID desc", (err, result) => {
                    if (err) {
                        console.log(err);
                        if (!rolledBack) {
                            transaction.rollback(err => {
                            });
                        }
                    } else {
                        transaction.commit(err => {
                            if(result.recordset.length > 0) {
                                console.log("yeah");
                                this.editarVariables(result.recordset[0].ID, false, false, "forma");
                            }
                        });
                    }
                });
            }); // fin transaction
        } else if(tablaDeVariableModificada.localeCompare("variable") == 0) {
            const transaction = new sql.Transaction( this.props.pool );
            transaction.begin(err => {
                var rolledBack = false;
                transaction.on('rollback', aborted => {
                    rolledBack = true;
                });
                const request = new sql.Request(transaction);
                request.query("select top 1 * from Variables order by ID desc", (err, result) => {
                    if (err) {
                        console.log(err);
                        if (!rolledBack) {
                            transaction.rollback(err => {
                            });
                        }
                    } else {
                        transaction.commit(err => {
                            if(result.recordset.length > 0) {
                                this.editarVariables(result.recordset[0].ID, result.recordset[0].esObjeto, result.recordset[0].esInstruccionSQL, "variable");
                            }
                        });
                    }
                });
            }); // fin transaction
        }
    }

    /////////////////////////////////////////////////////////

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
                            temp.push({valor: result.recordset[i].tabla, ID: result.recordset[i].ID, esTabla: true});
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
                            temp.push({valor: result.recordset[i].nombre, tipo: result.recordset[i].tipo, esFuenteDato: false, variableID: variable.ID, variableCampoID: result.recordset[i].ID, esObjeto: variable.esObjeto, esInstruccionSQL: false, nivel: result.recordset[i].nivel, esVariable: true})
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
                            temp.push({valor: result.recordset[i].nombre, ID: result.recordset[i].ID, esVariable: true});
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
                        var temp = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            temp.push(result.recordset[i]);
                            temp[temp.length-1].esSQL = true;
                        };
                        this.setState({
                            variablesSQL: temp
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
                        var temp = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            temp.push(result.recordset[i]);
                            temp[temp.length-1].esExcel = true;
                        };
                        this.setState({
                            excel: temp
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
                            nombreColumnas.push({valor: result.recordset[i].nombre, tipo: result.recordset[i].tipo, esFuenteDato: false, formaVariableID: result.recordset[i].ID, esObjeto: false, esInstruccionSQL: false, nivel: 0, esForma: true});
                        };
                        this.setState({
                            formas: nombreColumnas
                        });
                    });
                }
            });
        }); // fin transaction
    }

    render() {
        if(this.state.componenteActual.localeCompare("selDashboard") == 0) {
            return (
                <div>
                    <SeleccionarDashboard pool={this.props.pool}
                                            configuracionHome={this.props.configuracionHome}
                                            crearDashboard={this.crearDashboard}
                                            goOptions={this.props.goOptions}
                                            editarVariable={this.editarVariables}>
                    </SeleccionarDashboard>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("crearDashboard") == 0) {
            return (
                <div>
                    <CrearDashboard pool={this.props.pool}
                                            retornarSeleccionDashboards={this.retornarSeleccionDashboards}
                                            terminoCrearCampo={this.terminoCrearFuenteDatosPasarAEdit}
                                            tablas={this.state.conexiones}
                                            camposTablas={this.state.camposConexiones}
                                            variablesEscalares={this.state.variablesEscalares}
                                            objetos={this.state.variables}
                                            camposDeObjetos={this.state.camposVariables}
                                            excel={this.state.excel}
                                            camposDeExcel={this.state.camposDeExcel}
                                            formas={this.state.formas}
                                            variablesSQL={this.state.variablesSQL}
                                            camposVariablesSQL={this.state.camposVariablesSQL}>
                    </CrearDashboard>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("editarVariables") == 0) {
            return (
                <div>
                    <EditarVariablesHome pool={this.props.pool}
                                    goOptions={this.props.goOptions}
                                    idVariable={this.state.idVariable}
                                    tipoVariable={this.state.tipoVariable}
                                    esObjetoVariable={this.state.esObjetoVariable}
                                    esInstruccionSQLVariable={this.state.esInstruccionSQLVariable}
                                    retornoSeleccionVariables={this.retornoSeleccionVariables}
                                    configuracionHome={this.props.configuracionHome}
                                    actualizarIDVariableModificada={this.actualizarIDVariableModificada}
                                    changeStateFirstTimeToFalse={this.changeStateFirstTimeToFalse}
                                    esPrimeraVez={this.state.esPrimeraVez}>
                    </EditarVariablesHome>
                </div>
            );
        }
    }
}
