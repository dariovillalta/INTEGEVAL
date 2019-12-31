import React from 'react';

import OpcionesCrearRegla from './OpcionesCrearRegla.js';
import ContenedorReglas from './ContenedorReglas.js';

//const campos = [{valor: "idCLiente"}, {valor: "saldoTotal"}, {valor: "tipoPersona"}, {valor: "impuestosTotal"}, {valor: "nombreCliente"}, {valor: "diasMora"}, {valor: "mesMora"}];
const variables = [];
const objetos = [];
const camposDeObjetos = [];
const reglas = [{texto: "YO SOY MAYOR"}];

export default class CondicionVariable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reglas: this.props.reglas
        }
        /*this.showLoadingScreen = this.showLoadingScreen.bind(this);
        this.hideLoadingScreen = this.hideLoadingScreen.bind(this);*/
    }
    
    render() {
        return (
            <div>
                {this.props.navbar}
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"card"} style={{width: "100%"}}>
                        <OpcionesCrearRegla pool={this.props.pool} campos={this.props.campos}
                                            retornarCampo={this.props.retornarCampo}
                                            camposDropdown={this.props.camposDropdown}
                                            valoresDropdown={this.props.valoresDropdown}
                                            callbackCrearRegla={this.props.callbackCrearRegla}>
                        </OpcionesCrearRegla>
                    </div>
                </div>
                <hr/>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <ContenedorReglas reglas={reglas}> </ContenedorReglas>
                    </div>
                </div>
            </div>
        );
    }
}
