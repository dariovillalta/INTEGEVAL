import React from 'react';
import sql from 'mssql';

import SeleccionarVariables from './SeleccionarVariables.js';
import CrearVariablesHome from './CrearVariables/CrearVariablesHome.js';
import EditarVariable from './EditarVariable.js';

var isMounted = false;

export default class VariableHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componenteActual: "selVariables",
            idFuenteDatos: -1,
            nombreFuenteDatos: "",
            descripcionFuenteDatos: "",
            esObjetoFuenteDatos: "",
            objetoPadreIDFuenteDatos: -1,
            guardarFuenteDatos: ""
        }
        this.crearVariables = this.crearVariables.bind(this);
        this.retornoSeleccionVariables = this.retornoSeleccionVariables.bind(this);
        this.editarVariables = this.editarVariables.bind(this);
        this.terminoCrearVariablesPasarAEdit = this.terminoCrearVariablesPasarAEdit.bind(this);
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
            idFuenteDatos: -1,
            nombreFuenteDatos: "",
            descripcionFuenteDatos: "",
            esObjetoFuenteDatos: "",
            objetoPadreIDFuenteDatos: -1,
            guardarFuenteDatos: ""
        });
    }

    editarVariables (idFuenteDatos, nombreFuenteDatos, descripcionFuenteDatos, esObjetoFuenteDatos, objetoPadreIDFuenteDatos, guardarFuenteDatos) {
        this.setState({
            idFuenteDatos: idFuenteDatos,
            componenteActual: "editarVariables",
            nombreFuenteDatos: nombreFuenteDatos,
            descripcionFuenteDatos: descripcionFuenteDatos,
            esObjetoFuenteDatos: esObjetoFuenteDatos,
            objetoPadreIDFuenteDatos: objetoPadreIDFuenteDatos,
            guardarFuenteDatos: guardarFuenteDatos
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
                    if (!rolledBack) {
                        console.log(err);
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

    render() {
        if(this.state.componenteActual.localeCompare("selVariables") == 0) {
            return (
                <div>
                    <SeleccionarVariables pool={this.props.pool}
                                            configuracionHome={this.props.configuracionHome}
                                            crearVariables={this.crearVariables}
                                            goOptions={this.props.goOptions}
                                            editarFuenteDatos={this.editarFuenteDatos}>
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
                                    showFormula={this.props.showFormula}
                                    showCondicionVar={this.props.showCondicionVar}
                                    showRiesgos={this.props.showRiesgos}
                                    goOptions={this.props.goOptions}
                                    retornoSeleccionTabla={this.props.retornoSeleccionTabla}
                                    retornoSeleccionVariables={this.retornoSeleccionVariables}
                                    retornoSeleccionRiesgo={this.retornoSeleccionRiesgoSameComponent}
                                    retornoSeleccionRiesgoUmbral={this.retornoSeleccionRiesgoDiffComponent}
                                    configuracionHome={this.props.configuracionHome}
                                    updateNavBar={this.props.updateNavBar}
                                    showUmbralHome={this.props.showUmbralHome}
                                    idFuenteDatos={this.state.idFuenteDatos}
                                    nombreFuenteDatos={this.state.nombreFuenteDatos}
                                    descripcionFuenteDatos={this.state.descripcionFuenteDatos}
                                    esObjetoFuenteDatos={this.state.esObjetoFuenteDatos}
                                    objetoPadreIDFuenteDatos={this.state.objetoPadreIDFuenteDatos}
                                    guardarFuenteDatos={this.state.guardarFuenteDatos}
                                    updateFormula={this.props.updateFormula}>
                    </EditarVariablesHome>
                </div>
            );
        }
    }
}
