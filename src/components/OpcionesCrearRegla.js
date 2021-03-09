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
        this.mostrarCrearCondicion = this.mostrarCrearCondicion.bind(this);
        this.mostrarAsignarFormula = this.mostrarAsignarFormula.bind(this);
    }

    mostrarCrearCondicion () {
        this.props.actualizarEstadoVistaEsCondicion(true);
    }

    mostrarAsignarFormula () {
        this.props.actualizarEstadoVistaEsCondicion(false);
    }
    
    render() {
        return (
            <div style={{width: "100%"}}>
                <div className={"row"} style={{width: "100%"}}>
                    <div style={{backgroundColor: "#f5f5f5", height: "40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <div className={"border-right addPointer"} style={{backgroundColor: "white", height: "98%", width: "40%", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: this.props.mostrarCrearCondicion ? "1px solid #304ffe" : ""}} onClick={this.mostrarCrearCondicion}>
                            CONDICIONES
                        </div>
                        <div className={"addPointer"} style={{backgroundColor: "white", height: "98%", width: "40%", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: !this.props.mostrarCrearCondicion ? "1px solid #304ffe" : ""}} onClick={this.mostrarAsignarFormula}>
                            ASIGNACIONES
                        </div>
                    </div>
                </div>
                <div className={"row"} style={{width: "100%"}}>
                    {this.props.mostrarCrearCondicion
                        ?   <VariableCreation pool={this.props.pool} campos={this.props.campos}
                                        reglas={this.props.reglas}
                                        retornarCampo={this.props.retornarCampo}
                                        retornarValor={this.props.retornarValor}
                                        camposDropdown={this.props.camposDropdown}
                                        valoresDropdown={this.props.valoresDropdown}
                                        mostrarOpcionSino={this.props.mostrarOpcionSino}
                                        tablas={this.props.tablas}
                                        camposTablas={this.props.camposTablas}
                                        variablesEscalares={this.props.variablesEscalares}
                                        objetos={this.props.objetos}
                                        camposDeObjetos={this.props.camposDeObjetos}
                                        excel={this.props.excel}
                                        camposDeExcel={this.props.camposDeExcel}
                                        formas={this.props.formas}
                                        variablesSQL={this.props.variablesSQL}
                                        camposVariablesSQL={this.props.camposVariablesSQL}
                                        retornoCampo={this.props.retornoCampo}
                                        retornoOperacion={this.props.retornoOperacion}
                                        actualizarNivelNuevaRegla={this.props.actualizarNivelNuevaRegla}
                                        callbackModificarRegla={this.props.callbackModificarRegla}
                                        callbackEliminarRegla={this.props.callbackEliminarRegla}
                                        callbackCrearRegla={this.props.callbackCrearRegla}>
                            </VariableCreation>
                        :   <ContenedorFormulas asignaciones={this.props.asignaciones}
                                                            reglas={this.props.reglas}
                                                            actualizarSeleccionFormula={this.props.actualizarSeleccionFormula}
                                                            callbackCrearRegla={this.props.callbackCrearRegla}
                                                            callbackModificarRegla={this.props.callbackModificarRegla}
                                                            callbackEliminarRegla={this.props.callbackEliminarRegla}
                                                            goToCreateFormula={this.props.goToCreateFormula}
                                                            eliminarFormula={this.props.eliminarFormula}
                                                            esEditarVar={this.props.esEditarVar}
                                                            tablaBorrarFormulas={this.props.tablaBorrarFormulas}
                                                            tablaBorrarElementos={this.props.tablaBorrarElementos}
                                                            condicionFormula={this.props.condicionFormula}
                                                            condicionElemento={this.props.condicionElemento}
                                                            showSuccesMessage={this.props.showSuccesMessage}
                                                            showMessage={this.props.showMessage}>
                            </ContenedorFormulas>
                    }
                </div>
            </div>
        );
    }
}
