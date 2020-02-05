import React from 'react';

import OpcionesCrearRegla from './OpcionesCrearRegla.js';
import ContenedorReglas from './ContenedorReglas.js';

export default class InstruccionVariable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reglas: this.props.reglas
        }
        /*this.showLoadingScreen = this.showLoadingScreen.bind(this);
        this.hideLoadingScreen = this.hideLoadingScreen.bind(this);*/
    }
    
    render() {
        console.log('this.state.reglas');
        console.log(this.state.reglas);
        return (
            <div>
                {this.props.navbar}
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"card"} style={{width: "100%"}}>
                        <OpcionesCrearRegla pool={this.props.pool} campos={this.props.campos}
                                            asignaciones={this.props.asignaciones}
                                            retornarCampo={this.props.retornarCampo}
                                            camposDropdown={this.props.camposDropdown}
                                            valoresDropdown={this.props.valoresDropdown}
                                            callbackCrearRegla={this.props.callbackCrearRegla}
                                            goToCreateFormula={this.props.goToCreateFormula}
                                            retornarEstadoVistaEsCondicion={this.props.retornarEstadoVistaEsCondicion}>
                        </OpcionesCrearRegla>
                    </div>
                </div>
                <hr/>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <ContenedorReglas reglas={this.state.reglas}
                                            retornarIndiceSeleccionado={this.props.retornarIndiceSeleccionado}>
                        </ContenedorReglas>
                    </div>
                </div>
            </div>
        );
    }
}
