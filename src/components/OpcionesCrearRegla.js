import React from 'react';

import VariableCreation from './Regla/VariableCreation.js';
import ContenedorFormulas from './ContenedorFormulas.js';

//const campos = [{valor: "idCLiente"}, {valor: "saldoTotal"}, {valor: "tipoPersona"}, {valor: "impuestosTotal"}, {valor: "nombreCliente"}, {valor: "diasMora"}, {valor: "mesMora"}];
const variables = [];
const objetos = [];
const camposDeObjetos = [];

export default class OpcionesCrearRegla extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarCrearCondicion: true
        }
        this.mostrarCrearCondicion = this.mostrarCrearCondicion.bind(this);
        this.mostrarAsignarFormula = this.mostrarAsignarFormula.bind(this);
    }

    mostrarCrearCondicion () {
        this.setState({
            mostrarCrearCondicion: true
        }, () => {
            this.props.retornarEstadoVistaEsCondicion(this.state.mostrarCrearCondicion);
        });
    }

    mostrarAsignarFormula () {
        this.setState({
            mostrarCrearCondicion: false
        }, () => {
            this.props.retornarEstadoVistaEsCondicion(this.state.mostrarCrearCondicion);
        });
    }
    
    render() {
        return (
            <div style={{width: "100%"}}>
                <div className={"row"} style={{width: "100%"}}>
                    <div style={{backgroundColor: "#f5f5f5", height: "40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <div className={"border-right addPointer"} style={{backgroundColor: "white", height: "98%", width: "40%", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: this.state.mostrarCrearCondicion ? "1px solid #304ffe" : ""}} onClick={this.mostrarCrearCondicion}>
                            CONDICIONES / COMPARACIONES
                        </div>
                        <div className={"addPointer"} style={{backgroundColor: "white", height: "98%", width: "40%", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: !this.state.mostrarCrearCondicion ? "1px solid #304ffe" : ""}} onClick={this.mostrarAsignarFormula}>
                            ASIGNACIONES / FÓRMULAS
                        </div>
                    </div>
                </div>
                <div className={"row"} style={{width: "100%"}}>
                    {this.state.mostrarCrearCondicion
                        ?   <VariableCreation pool={this.props.pool} campos={this.props.campos}
                                        retornarCampo={this.props.retornarCampo}
                                        camposDropdown={this.props.camposDropdown}
                                        valoresDropdown={this.props.valoresDropdown}
                                        mostrarOpcionSino={this.props.mostrarOpcionSino}
                                        conexiones={this.props.conexiones}
                                        camposConexiones={this.props.camposConexiones}
                                        variables={this.props.variables}
                                        camposVariables={this.props.camposVariables}
                                        retornoCampo={this.props.retornoCampo}
                                        retornoOperacion={this.props.retornoOperacion}
                                        actualizarNivelNuevaRegla={this.props.actualizarNivelNuevaRegla}
                                        callbackCrearRegla={this.props.callbackCrearRegla}>
                            </VariableCreation>
                        :   <ContenedorFormulas asignaciones={this.props.asignaciones}
                                                            callbackCrearRegla={this.props.callbackCrearRegla}
                                                            goToCreateFormula={this.props.goToCreateFormula}>
                            </ContenedorFormulas>
                    }
                </div>
            </div>
        );
    }
}
