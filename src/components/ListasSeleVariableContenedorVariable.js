import React from 'react';

import ListasSeleVariable from './ListasSeleVariable.js';

export default class ListasSeleVariableContenedorVariable extends React.Component {
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
                    <ListasSeleVariable mostrarRosa={this.props.mostrarRosa} variables={this.props.campos} seleccionarMultiple={this.props.seleccionarMultiple} retornoSeleccion={this.retornoSeleccionVariable} titulo={"Fuentes de Datos"}></ListasSeleVariable>
                    <ListasSeleVariable mostrarRosa={this.props.mostrarRosa} variables={this.props.variables} seleccionarMultiple={this.props.seleccionarMultiple} retornoSeleccion={this.retornoSeleccionVariable} titulo={"Variable Escalares"}></ListasSeleVariable>
                    {this.props.objetos.map((objeto, i) => (
                        <ListasSeleVariable mostrarRosa={this.props.mostrarRosa} variables={this.props.camposDeObjetos[i]} seleccionarMultiple={this.props.seleccionarMultiple} retornoSeleccion={this.retornoClickLista} titulo={objeto.nombre} key={i}></ListasSeleVariable>
                    ))}
                </div>
            </div>
        );
    }
}
