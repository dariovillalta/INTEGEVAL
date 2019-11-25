import React from 'react';

import ListasSeleVariable from './ListasSeleVariable.js';

export default class ListasSeleVariableContenedorOperador extends React.Component {
    constructor(props) {
        super(props);
        this.retornoSeleccionVariable = this.retornoSeleccionVariable.bind(this);
    }

    retornoSeleccionVariable(variable) {
        this.props.retornoSeleccionVariable(this.props.esOperacion, variable);
    }

    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <div className={"row"} style={{border: "1px solid #e6e6f2", height: "75%"}}>
                    <ListasSeleVariable mostrarRosa={this.props.mostrarRosa} variables={this.props.operaciones} seleccionarMultiple={this.props.seleccionarMultiple} retornoSeleccion={this.retornoSeleccionVariable} titulo={"Algebraicas"}></ListasSeleVariable>
                </div>
            </div>
        );
    }
}
