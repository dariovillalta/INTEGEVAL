import React from 'react';

import ConfiguracionTablas from './ConfiguracionTablas.js';
import EditarTabla from './EditarTabla.js';

export default class ConexionesHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idTablaSeleccionada: -1,
            nombreTablaSeleccionada: "",
            usuarioTablaSeleccionada: "",
            contrasenaTablaSeleccionada: "",
            servidorTablaSeleccionada: "",
            baseDatosTablaSeleccionada: "",
            tablaTablaSeleccionada: "",
            tipoConexionTablaSeleccionada: ""
        }
        this.terminoSeleccionTabla = this.terminoSeleccionTabla.bind(this);
        this.retornoSeleccionTabla = this.retornoSeleccionTabla.bind(this);
    }

    terminoSeleccionTabla (id, nombre, usuario, contrasena, servidor, baseDatos, tabla, tipoConexion) {
        this.setState({
            idTablaSeleccionada: id,
            nombreTablaSeleccionada: nombre,
            usuarioTablaSeleccionada: usuario,
            contrasenaTablaSeleccionada: contrasena,
            servidorTablaSeleccionada: servidor,
            baseDatosTablaSeleccionada: baseDatos,
            tablaTablaSeleccionada: tabla,
            tipoConexionTablaSeleccionada: tipoConexion
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
                    <ConfiguracionTablas pool={this.props.pool}
                                    configuracionHome={this.props.configuracionHome}
                                    goOptions={this.props.goOptions}
                                    terminoSeleccionTabla={this.terminoSeleccionTabla}
                                    showSuccesMessage={this.props.showSuccesMessage}
                                    showMessage={this.props.showMessage}
                                    userID={this.props.userID}
                                    userName={this.props.userName}>
                    </ConfiguracionTablas>
                </div>
            );
        } else {
            return (
                <div>
                    <EditarTabla pool={this.props.pool}
                                retornoSeleccionTabla={this.retornoSeleccionTabla}
                                configuracionHome={this.props.configuracionHome}
                                goOptions={this.props.goOptions}
                                idTablaSeleccionada={this.state.idTablaSeleccionada}
                                nombreTablaSeleccionada={this.state.nombreTablaSeleccionada}
                                usuarioTablaSeleccionada={this.state.usuarioTablaSeleccionada}
                                contrasenaTablaSeleccionada={this.state.contrasenaTablaSeleccionada}
                                servidorTablaSeleccionada={this.state.servidorTablaSeleccionada}
                                baseDatosTablaSeleccionada={this.state.baseDatosTablaSeleccionada}
                                tablaTablaSeleccionada={this.state.tablaTablaSeleccionada}
                                tipoConexion={this.state.tipoConexionTablaSeleccionada}
                                showSuccesMessage={this.props.showSuccesMessage}
                                showMessage={this.props.showMessage}
                                userID={this.props.userID}
                                userName={this.props.userName}>
                    </EditarTabla>
                </div>
            );
        }
    }
}
