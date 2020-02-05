import React from 'react';

import ListasSeleVariable from './ListasSeleVariable.js';

export default class ListasSeleVariableContenedorVariable extends React.Component {
    constructor(props) {
        super(props);
        this.retornoSeleccionVariable = this.retornoSeleccionVariable.bind(this);
    }

    retornoSeleccionVariable(variable, posicion) {
        this.props.retornoSeleccionVariable(this.props.esOperacion, variable, posicion);
    }
    //EN VEZ DE TABLAS, FUENTE DE DATOS
    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <div className={"row"} style={{border: "1px solid #e6e6f2", width: "100%", height: "100%"}}>
                    {this.props.tablas.map((tabla, i) => (
                        <div style={{width: "100%", height: "80%"}} key={tabla.ID}>
                            {
                                this.props.camposTablas[i] != undefined
                                ? <ListasSeleVariable mostrarRosa={this.props.mostrarRosa} variables={this.props.camposTablas[i]} seleccionarMultiple={this.props.seleccionarMultiple} retornoSeleccion={this.retornoSeleccionVariable} titulo={tabla.nombre} indiceTabla={i}></ListasSeleVariable>
                                : null
                            }
                        </div>
                    ))}
                    {
                        this.props.variables.length > 0
                        ?    <div style={{width: "100%", height: "80%"}}>
                                <ListasSeleVariable mostrarRosa={this.props.mostrarRosa} variables={this.props.variables} seleccionarMultiple={this.props.seleccionarMultiple} retornoSeleccion={this.retornoSeleccionVariable} titulo={"Variable Escalares"} indiceTabla={false}></ListasSeleVariable>
                            </div>
                        : null
                    }
                    {this.props.objetos.map((objeto, i) => (
                        <div style={{width: "100%", height: "80%"}} key={objeto.ID}>
                            {
                                this.props.camposDeObjetos[i] != undefined
                                ? <ListasSeleVariable mostrarRosa={this.props.mostrarRosa} variables={this.props.camposDeObjetos[i]} seleccionarMultiple={this.props.seleccionarMultiple} retornoSeleccion={this.retornoSeleccionVariable} titulo={objeto.nombre} key={i} indiceTabla={false}></ListasSeleVariable>
                                : null
                            }
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
