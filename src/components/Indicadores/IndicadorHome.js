import React from 'react';
import sql from 'mssql';

import SeleccionarIndicador from './SeleccionarIndicador.js';
import CrearIndicador from './CrearIndicador.js';
import EditarIndicador from './EditarIndicador.js';

export default class IndicadorHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componenteAMostrar: "selIndicador",
            idIndicadorSeleccionado: -1,
            nombreIndicadorSeleccionada: "",
            idRiesgoPadreSeleccionado: -1
        }
        this.terminoSeleccionIndicador = this.terminoSeleccionIndicador.bind(this);
        this.retornoSeleccionIndicador = this.retornoSeleccionIndicador.bind(this);
        this.goCrearIndicador = this.goCrearIndicador.bind(this);
        this.terminoCrearIndicadorPasarAEdit = this.terminoCrearIndicadorPasarAEdit.bind(this);
    }

    terminoSeleccionIndicador (id, nombre) {
        this.setState({
            componenteAMostrar: "editIndicador",
            idIndicadorSeleccionado: id,
            nombreTablaSeleccionada: nombre
        });
    }

    retornoSeleccionIndicador () {
        this.setState({
            componenteAMostrar: "selIndicador",
            idIndicadorSeleccionado: -1,
            nombreTablaSeleccionada: "",
            idRiesgoPadreSeleccionado: -1
        });
    }

    goCrearIndicador (idRiesgo) {
        this.setState({
            componenteAMostrar: "crearIndicador",
            idRiesgoPadreSeleccionado: idRiesgo
        });
    }

    terminoCrearIndicadorPasarAEdit (nombreIndicador) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Indicadores where nombre = '"+nombreIndicador+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length) {
                            this.terminoSeleccionIndicador(result.recordset[0].ID, result.recordset[0].nombre);
                        }
                    });
                }
            });
        }); // fin transaction
    }

    render() {
        if(this.state.componenteAMostrar.localeCompare("selIndicador") == 0) {
            return (
                <div>
                    <SeleccionarIndicador pool={this.props.pool} configuracionHome={this.props.configuracionHome} terminoSeleccionIndicador={this.terminoSeleccionIndicador} goCrearIndicador={this.goCrearIndicador} showRiesgos={this.props.showRiesgos}> </SeleccionarIndicador>
                </div>
            );
        } else if(this.state.componenteAMostrar.localeCompare("crearIndicador") == 0) {
            return (
                <div>
                    <CrearIndicador pool={this.props.pool} showCondicionVar={this.props.showCondicionVar} retornoSeleccionIndicador={this.retornoSeleccionIndicador} configuracionHome={this.props.configuracionHome} terminoCrearIndicadorPasarAEdit={this.terminoCrearIndicadorPasarAEdit} riesgoPadre={this.state.idRiesgoPadreSeleccionado}> </CrearIndicador>
                </div>
            );
        } else if(this.state.componenteAMostrar.localeCompare("editIndicador") == 0) {
            return (
                <div>
                    <EditarIndicador pool={this.props.pool} showFormula={this.props.showFormula} showCondicionVar={this.props.showCondicionVar} retornoSeleccionIndicador={this.retornoSeleccionIndicador} configuracionHome={this.props.configuracionHome} idIndicadorSeleccionado={this.state.idIndicadorSeleccionado} nombreIndicadorSeleccionada={this.state.nombreIndicadorSeleccionada} riesgoPadre={this.state.idRiesgoPadreSeleccionado}> </EditarIndicador>
                </div>
            );
        }
    }
}
