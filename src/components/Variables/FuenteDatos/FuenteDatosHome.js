import React from 'react';

import ConfiguracionTablas from './ConfiguracionTablas.js';
import CamposHome from './CamposHome.js';

export default class FuenteDatosHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idTablaSeleccionada: -1,
            nombreTablaSeleccionada: ""
        }
        this.terminoSeleccionTabla = this.terminoSeleccionTabla.bind(this);
        this.retornoSeleccionTabla = this.retornoSeleccionTabla.bind(this);
    }

    terminoSeleccionTabla (id, nombre) {
        this.setState({
            idTablaSeleccionada: id,
            nombreTablaSeleccionada: nombre
        });
    }

    retornoSeleccionTabla () {
        this.setState({
            idTablaSeleccionada: -1,
            nombreTablaSeleccionada: ""
        });
    }

    render() {
        if(this.state.idTablaSeleccionada == -1) {
            return (
                <div>
                    <ConfiguracionTablas pool={this.props.pool} configuracionHome={this.props.configuracionHome} terminoSeleccionTabla={this.terminoSeleccionTabla}> </ConfiguracionTablas>
                </div>
            );
        } else {
            return (
                <div>
                    <CamposHome pool={this.props.pool} retornoSeleccionTabla={this.retornoSeleccionTabla} configuracionHome={this.props.configuracionHome} idTablaSeleccionada={this.state.idTablaSeleccionada} nombreTablaSeleccionada={this.state.nombreTablaSeleccionada} terminoSeleccionTabla={this.terminoSeleccionTabla}> </CamposHome>
                </div>
            );
        }
    }
}
