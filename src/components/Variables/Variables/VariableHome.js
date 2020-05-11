import React from 'react';
import sql from 'mssql';

import SeleccionarVariables from './SeleccionarVariables.js';
import CrearVariablesHome from './CrearVariables/CrearVariablesHome.js';
import EditarVariablesHome from './EditarVariable/EditarVariablesHome.js';

var isMounted = false;

export default class VariableHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componenteActual: "selVariables",
            idVariable: -1,
            tipoVariable: "",
            esObjetoVariable: "",
            esInstruccionSQLVariable: "",
            esPrimeraVez: true
        }
        this.crearVariables = this.crearVariables.bind(this);
        this.retornoSeleccionVariables = this.retornoSeleccionVariables.bind(this);
        this.editarVariables = this.editarVariables.bind(this);
        this.changeStateFirstTimeToFalse = this.changeStateFirstTimeToFalse.bind(this);
        this.terminoCrearVariablesPasarAEdit = this.terminoCrearVariablesPasarAEdit.bind(this);
        this.actualizarIDVariableModificada = this.actualizarIDVariableModificada.bind(this);
    }

    componentDidMount () {
        //
    }

    crearVariables () {
        this.setState({
            componenteActual: "crearVariables"
        });
    }

    retornoSeleccionVariables () {
        this.setState({
            componenteActual: "selVariables",
            idVariable: -1,
            tipoVariable: "",
            esObjetoVariable: "",
            esInstruccionSQLVariable: ""
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

    render() {
        if(this.state.componenteActual.localeCompare("selVariables") == 0) {
            return (
                <div>
                    <SeleccionarVariables pool={this.props.pool}
                                            configuracionHome={this.props.configuracionHome}
                                            crearVariables={this.crearVariables}
                                            goOptions={this.props.goOptions}
                                            editarVariable={this.editarVariables}>
                    </SeleccionarVariables>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("crearVariables") == 0) {
            return (
                <div>
                    <CrearVariablesHome pool={this.props.pool}
                                            showCondicionVar={this.props.showCondicionVar}
                                            terminoCrearCampo={this.terminoCrearFuenteDatosPasarAEdit}
                                            idTablaSeleccionada={this.props.idTablaSeleccionada}
                                            columnas={this.state.columnas}
                                            nombreTablaSeleccionada={this.props.nombreTablaSeleccionada}
                                            goOptions={this.props.goOptions}
                                            retornoSeleccionVariables={this.retornoSeleccionVariables}
                                            configuracionHome={this.props.configuracionHome}>
                    </CrearVariablesHome>
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
