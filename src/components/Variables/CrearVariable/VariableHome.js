import React from 'react';
import sql from 'mssql';

import SeleccionarVariable from './SeleccionarVariable.js';
import CrearVariable from './CrearVariable.js';
import EditarVariable from './EditarVariable.js';

var isMounted = false;

export default class VariableHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componenteActual: "selVariable",
            idVariable: -1,
            nombreVariable: "",
            descripcionVariable: "",
            esObjetoVariable: "",
            idObjetoPadreVariable: -1
        }
        this.crearVariable = this.crearVariable.bind(this);
        this.retornoSeleccionVariable = this.retornoSeleccionVariable.bind(this);
        this.editarVariable = this.editarVariable.bind(this);
        this.retornoEditarVariable = this.retornoEditarVariable.bind(this);
        this.terminoCrearVariablePasarAEdit = this.terminoCrearVariablePasarAEdit.bind(this);
    }

    componentDidMount() {
        isMounted = true;
    }
    componentWillUnmount() {
        isMounted = false;
    }

    crearVariable () {
        this.setState({
            componenteActual: "crearVariable"
        });
    }

    retornoSeleccionVariable () {
        this.setState({
            componenteActual: "selVariable",
            idVariable: -1,
            nombreVariable: "",
            descripcionVariable: "",
            esObjetoVariable: "",
            idObjetoPadreVariable: -1
        });
    }

    editarVariable (idVariable, nombreVariable, descripcionVariable, esObjetoVariable, idObjetoPadreVariable) {
        this.setState({
            idVariable: idVariable,
            componenteActual: "editarVariable",
            nombreVariable: nombreVariable,
            descripcionVariable: descripcionVariable,
            esObjetoVariable: esObjetoVariable,
            idObjetoPadreVariable: -1
        });
    }

    retornoEditarVariable () {
        this.props.showRiesgos();
        var self = this;
        if(isMounted) {
            console.log("SI")
        } else {
            console.log("NO")
        }
        setTimeout(function(){
            if(isMounted) {
                console.log("SI")
            } else {
                console.log("NO")
            }
            console.log(self)
            self.setState({
                componenteActual: "editarVariable"
            });
        }, 3500);
    }

    terminoCrearVariablePasarAEdit (nombreFuenteDatos) {
        console.log("1");
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Variables where nombre = '"+nombreFuenteDatos+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset != undefined) {
                            console.log("result.recordset")
                            console.log(result.recordset)
                            console.log("nombreFuenteDatos")
                            console.log(nombreFuenteDatos)
                            if(result.recordset.length) {
                                this.editarVariable(result.recordset[0].ID, result.recordset[0].nombre, result.recordset[0].descripcion, result.recordset[0].esObjeto, result.recordset[0].objetoPadreID);
                            }
                        }
                    });
                }
            });
        }); // fin transaction
    }

    render() {
        if(this.state.componenteActual.localeCompare("selVariable") == 0) {
            return (
                <div>
                    <SeleccionarVariable pool={this.props.pool}
                                        configuracionHome={this.props.configuracionHome}
                                        goOptions={this.props.goOptions}
                                        crearVariable={this.crearVariable}
                                        editarVariable={this.editarVariable}>
                    </SeleccionarVariable>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("crearVariable") == 0) {
            return (
                <div>
                    <CrearVariable pool={this.props.pool}
                                    showCondicionVar={this.props.showCondicionVar}
                                    terminoCrearCampo={this.terminoCrearVariablePasarAEdit}
                                    retornoSeleccionVariable={this.retornoSeleccionVariable}
                                    goOptions={this.props.goOptions}
                                    configuracionHome={this.props.configuracionHome}>
                    </CrearVariable>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("editarVariable") == 0) {
            return (
                <div>
                    <EditarVariable pool={this.props.pool}
                                    showFormula={this.props.showFormula}
                                    showCondicionVar={this.props.showCondicionVar}
                                    showRiesgos={this.props.showRiesgos}
                                    retornoSeleccionVariable={this.retornoSeleccionVariable}
                                    goOptions={this.props.goOptions}
                                    configuracionHome={this.props.configuracionHome}
                                    updateNavBar={this.props.updateNavBar}
                                    showUmbralHome={this.props.showUmbralHome}
                                    idVariable={this.state.idVariable}
                                    nombreVariable={this.state.nombreVariable}
                                    descripcionVariable={this.state.descripcionVariable}
                                    esObjetoVariable={this.state.esObjetoVariable}
                                    idObjetoPadreVariable={this.state.idObjetoPadreVariable}
                                    updateFormula={this.props.updateFormula}
                                    showVariables={this.retornoSeleccionVariableSameComponent}>
                    </EditarVariable>
                </div>
            );
        }
    }
}
