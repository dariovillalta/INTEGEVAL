import React from 'react';

import ListasSeleVariable from './ListasSeleVariable.js';

const operacionesEliminar = [{valor: "Borrar", tipo: "operacion"}];

export default class ListasSeleVariableContenedorOperador extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            indicesVarSeleccionadosOperaciones: [],
            indicesVarSeleccionadosBorrar: []
        }
        this.retornoSeleccionVariableOperacion = this.retornoSeleccionVariableOperacion.bind(this);
        this.retornoSeleccionVariableBorrar = this.retornoSeleccionVariableBorrar.bind(this);
    }

    retornoSeleccionVariableOperacion(variable, posicion, arreglo) {
        this.setState({
            indicesVarSeleccionadosOperaciones: arreglo,
            indicesVarSeleccionadosBorrar: []
        });
        this.props.retornoSeleccionVariable(this.props.esOperacion, variable);
    }

    retornoSeleccionVariableBorrar(variable, posicion, arreglo) {
        this.setState({
            indicesVarSeleccionadosOperaciones: [],
            indicesVarSeleccionadosBorrar: arreglo
        });
        this.props.retornoSeleccionVariable(this.props.esOperacion, variable);
    }

    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <div className={"row"} style={{border: "1px solid #e6e6f2", height: "75%"}}>
                    <ListasSeleVariable mostrarRosa={this.props.mostrarRosa} variables={this.props.operaciones} seleccionarMultiple={this.props.seleccionarMultiple} retornoSeleccion={this.retornoSeleccionVariableOperacion} titulo={"Algebraicas"} indiceTabla={false} indicesVarSeleccionados={this.state.indicesVarSeleccionadosOperaciones}></ListasSeleVariable>
                    <ListasSeleVariable mostrarRosa={this.props.mostrarRosa} variables={operacionesEliminar} seleccionarMultiple={this.props.seleccionarMultiple} retornoSeleccion={this.retornoSeleccionVariableBorrar} titulo={"Eliminar"} indiceTabla={false} indicesVarSeleccionados={this.state.indicesVarSeleccionadosBorrar}></ListasSeleVariable>
                </div>
            </div>
        );
    }
}
