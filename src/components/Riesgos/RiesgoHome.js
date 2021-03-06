import React from 'react';
import sql from 'mssql';

import SeleccionarRiesgo from './SeleccionarRiesgo.js';
import CrearRiesgo from './CrearRiesgo.js';
import EditarRiesgo from './EditarRiesgo.js';

export default class RiesgoHome extends React.Component {

    constructor(props) {
        super(props);
        //cuando es llamado desde indicadores
        var componente = "selRiesgo";
        if(this.props.crearRiesgo)
            componente = "crearRiesgo";
        this.state = {
            riesgos: [],
            pesoDisponible: 0,
            idRiesgoSeleccionado: -1,
            componenteActual: componente,
            idFormula: "",
            nombreRiesgo: "",
            pesoRiesgo: 0,
            formulaRiesgo: "",
            responsableRiesgo: ""
        }
        this.getRiesgos = this.getRiesgos.bind(this);
        this.acutalizarPesoMaximoDisponible = this.acutalizarPesoMaximoDisponible.bind(this);
        this.crearRiesgo = this.crearRiesgo.bind(this);
        this.retornoSeleccionRiesgo = this.retornoSeleccionRiesgo.bind(this);
        this.editarRiesgo = this.editarRiesgo.bind(this);
        this.terminoCrearRiesgoPasarAEdit = this.terminoCrearRiesgoPasarAEdit.bind(this);
        this.deleteRiesgo = this.deleteRiesgo.bind(this);
    }

    componentDidMount() {
        this.getRiesgos();
        this.props.updateBanderaCrearRiesgoFalse();
    }

    getRiesgos () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Riesgos", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            riesgos: result.recordset
                        }, this.acutalizarPesoMaximoDisponible );
                    });
                }
            });
        }); // fin transaction
    }

    acutalizarPesoMaximoDisponible () {
        //validando para que despues de traer riesgos al crear uno nuevo no vuelva a sobrescribir pesoDisponible
        if(this.state.idRiesgoSeleccionado == -1) {
            var pesoInstitucional = 100;
            var pesoExistente = 0;
            for (var i = 0; i < this.state.riesgos.length; i++) {
                pesoExistente += this.state.riesgos[i].peso;
            };
            this.setState({
                pesoDisponible: pesoInstitucional-pesoExistente
            });
        }
    }

    crearRiesgo () {
        this.setState({
            componenteActual: "crearRiesgo"
        });
    }

    retornoSeleccionRiesgo () {
        this.setState({
            idRiesgoSeleccionado: -1,
            componenteActual: "selRiesgo"
        }, this.acutalizarPesoMaximoDisponible );
    }

    editarRiesgo (id, idFormula, nombreRiesgo, pesoRiesgo, formulaRiesgo, responsableRiesgo) {
        if(this.state.pesoDisponible == 0) {
            this.setState({
                pesoDisponible: pesoRiesgo
            });
        } else {
            var pesoInstitucional = 100;
            var pesoExistente = 0;
            for (var i = 0; i < this.state.riesgos.length; i++) {
                if(this.state.riesgos[i].ID != id)
                    pesoExistente += this.state.riesgos[i].peso;
            };
            this.setState({
                pesoDisponible: pesoInstitucional-pesoExistente
            });
        }
        this.setState({
            idRiesgoSeleccionado: id,
            componenteActual: "editarRiesgo",
            idFormula: idFormula,
            nombreRiesgo: nombreRiesgo,
            pesoRiesgo: pesoRiesgo,
            formulaRiesgo: formulaRiesgo,
            responsableRiesgo: responsableRiesgo
        });
    }

    terminoCrearRiesgoPasarAEdit () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select top 1 * from Riesgos order by ID desc", (err, result) => {
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
                                this.editarRiesgo(result.recordset[0].ID, result.recordset[0].nombre, result.recordset[0].peso, result.recordset[0].formula, result.recordset[0].responsable);
                            }
                        }
                    });
                }
            });
        }); // fin transaction
    }

    deleteRiesgo (index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("delete from Riesgos where ID = "+index, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        alert("Riesgo Eliminado");
                        this.getRiesgos();
                    });
                }
            });
        }); // fin transaction
    }

    render() {
        if(this.state.componenteActual.localeCompare("selRiesgo") == 0) {
            return (
                <div>
                    <SeleccionarRiesgo pool={this.props.pool}
                                        deleteRiesgo={this.deleteRiesgo}
                                        configuracionHome={this.props.configuracionHome}
                                        crearRiesgo={this.crearRiesgo}
                                        editarRiesgo={this.editarRiesgo}
                                        riesgos={this.state.riesgos}> </SeleccionarRiesgo>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("crearRiesgo") == 0) {
            return (
                <div>
                    <CrearRiesgo pool={this.props.pool}
                                    showCondicionVar={this.props.showCondicionVar}
                                    showRiesgos={this.props.showRiesgos}
                                    retornoSeleccionRiesgo={this.retornoSeleccionRiesgo}
                                    configuracionHome={this.props.configuracionHome}
                                    showUmbralHome={this.props.showUmbralHome}
                                    riesgos={this.state.riesgos}
                                    terminoCrearRiesgo={this.terminoCrearRiesgoPasarAEdit}
                                    actualizarRiesgos={this.getRiesgos}
                                    pesoMaximo={this.state.pesoDisponible}> </CrearRiesgo>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("editarRiesgo") == 0) {
            return (
                <div>
                    <EditarRiesgo pool={this.props.pool}
                                    showCondicionVar={this.props.showCondicionVar}
                                    showRiesgos={this.props.showRiesgos}
                                    retornoSeleccionRiesgo={this.retornoSeleccionRiesgo}
                                    configuracionHome={this.props.configuracionHome}
                                    showUmbralHome={this.props.showUmbralHome}
                                    riesgos={this.state.riesgos}
                                    idFormula={this.state.idFormula}
                                    nombreRiesgo={this.state.nombreRiesgo}
                                    pesoRiesgo={this.state.pesoRiesgo}
                                    formulaRiesgo={this.state.formulaRiesgo}
                                    getRiesgos={this.getRiesgos}
                                    idRiesgoSeleccionado={this.state.idRiesgoSeleccionado}
                                    pesoMaximo={this.state.pesoDisponible}
                                    responsableRiesgo={this.state.responsableRiesgo}
                                    editarRiesgo={this.editarRiesgo}
                                    permision={this.props.permision}
                                    userID={this.props.userID}
                                    userName={this.props.userName}> </EditarRiesgo>
                </div>
            );
        }
    }
}
