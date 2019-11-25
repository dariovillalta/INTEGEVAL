import React from 'react';

import ListasSeleVariableContenedorVariable from './ListasSeleVariableContenedorVariable.js';

const campos = [{nombre: "idCLiente"}, {nombre: "saldoTotal"}, {nombre: "tipoPersona"}, {nombre: "impuestosTotal"}, {nombre: "nombreCliente"}, {nombre: "diasMora"}, {nombre: "mesMora"}];
const variables = [];
const objetos = [];
const camposDeObjetos = [];

export default class CondicionVariable extends React.Component {
    constructor(props) {
        super(props);
        /*this.state = {
            showLoadingScreen: false,
            mensajeLoadingScreen: ''
        }
        this.showLoadingScreen = this.showLoadingScreen.bind(this);
        this.hideLoadingScreen = this.hideLoadingScreen.bind(this);*/
    }
    
    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Condiciones</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Condiciones</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"font-18"} style={{width: "100%", height: "20%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        Seleccionar Variable
                    </div>
                    <div className={"row"} style={{height: "100%"}}>
                        <ListasSeleVariableContenedorVariable esOperacion={false} mostrarRosa={true} campos={campos} variables={variables} objetos={objetos} camposDeObjetos={camposDeObjetos} seleccionarMultiple={false} retornoSeleccionVariable={this.retornoClickLista}></ListasSeleVariableContenedorVariable>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className="row" style={{width: "100%", margin: "1% 0% 0% 0%"}}>
                            <div style={{backgroundColor: "white", borderRadius: "15px", padding: "0% 2%", width: "100%", marginLeft: "auto", marginRight: "0"}}> SI ES PERSONA NATURAL !</div>
                        </div>
                        <div className="row" style={{width: "100%", margin: "1% 0% 0% 0%"}}>
                            <div style={{backgroundColor: "white", borderRadius: "15px", padding: "0% 2%", width: "90%", marginLeft: "auto", marginRight: "0"}}> SI TOTAL DEPOSITOS ES MENOR A 400,000 !</div>
                        </div>
                        <div className="row" style={{width: "100%", margin: "1% 0% 0% 0%"}}>
                            <div style={{backgroundColor: "white", borderRadius: "15px", padding: "0% 2%", width: "80%", marginLeft: "auto", marginRight: "0"}}> SI MONTO ES MENOR A FOSEDE</div>
                        </div>
                        <div className="row" style={{width: "100%", margin: "1% 0% 0% 0%"}}>
                            <div style={{backgroundColor: "white", borderRadius: "15px", padding: "0% 2%", width: "90%", marginLeft: "auto", marginRight: "0"}}> SI TOTAL DEPOSITOS ES MAYOR A 400,000 !</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
