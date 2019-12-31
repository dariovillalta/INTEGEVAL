import React from 'react';

import ListasSeleVariable from '../ListasSeleVariable.js';

export default class Campo extends React.Component {
    constructor(props) {
        super(props);
        this.checkFieldType = this.checkFieldType.bind(this);
    }

    checkFieldType(campo) {
        if(campo[0].tipo.indexOf("int") == 0 || campo[0].tipo.indexOf("decimal") == 0) {
            this.props.esNumero();
        } else if(campo[0].tipo.indexOf("bit") == 0) {
            this.props.esBoolean();
        } else if(campo[0].tipo.indexOf("date") == 0) {
            this.props.esFecha();
        } else if(campo[0].tipo.indexOf("varchar") == 0) {
            this.props.esTexto();
        }
        this.props.retornoSeleccionVariable(campo);
    }
    
    render() {
        return (
            <div className={"row"}  style={{height: "150px", width: "100%"}}>
            	<div className={"border-bottom"}  style={{height: "100%", width: "100%", padding: "0% 1%"}}>
                    <div className={"font-18"} style={{width: "100%", height: "20%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        Seleccionar Campo
                    </div>
                    <div className={"row"} style={{height: "80%", width: "100%"}}>
                        <ListasSeleVariable mostrarRosa={true} variables={this.props.campos} seleccionarMultiple={false} retornoSeleccion={this.checkFieldType} titulo={"Campos De Tabla"}></ListasSeleVariable>
                    </div>
                    {
                        this.props.calculoVariables
                        ?
                            <div style={{width: "100%", height: "100%"}}>
                                {this.props.variables.map((variable, i) => (
                                    <div style={{width: "100%", height: "100%"}} key={variable.ID}>
                                        {
                                            this.props.camposVariables[i] != undefined
                                            ?
                                                <div className={"row"} style={{height: "100%", width: "100%"}}>
                                                    <ListasSeleVariable mostrarRosa={true} variables={this.props.camposVariables[i]} seleccionarMultiple={false} retornoSeleccion={this.retornoSeleccionVariable} titulo={variable.nombre}></ListasSeleVariable>
                                                </div>
                                            : null
                                        }
                                    </div>
                                ))}
                            </div>
                        : null
                    }
                    <br/>
                </div>
            </div>
        );
    }
}
