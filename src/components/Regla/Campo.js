import React from 'react';

import ListasSeleVariable from '../ListasSeleVariable.js';
import Accordion from '../Accordion/Accordion.js';

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
            <div className={"row"}  style={{width: "100%"}}>
            	<div style={{width: "100%", borderBottom: "3px solid #d2d2e4"}}>
                    <div className={"font-18"} style={{width: "100%", height: "20px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <h4>Seleccionar Campo</h4>
                    </div>
                    <Accordion showTrash={false} showEdit={false} color={"#ffffff"}>
                        <div label={"Conexiones"}>
                            {this.props.conexiones.map((conexion, i) => (
                                <div className={"row"} key={conexion.valor+i} style={{height: "80%", width: "100%"}}>
                                    <ListasSeleVariable mostrarRosa={false} variables={this.props.camposConexiones[i]} seleccionarMultiple={false} retornoSeleccion={this.checkFieldType} titulo={conexion.valor}></ListasSeleVariable>
                                </div>
                            ))}
                        </div>
                        <div label={"Variables"}>
                            {this.props.variables.map((variable, i) => (
                                <div className={"row"} key={variable.valor+i} style={{height: "80%", width: "100%"}}>
                                    <ListasSeleVariable mostrarRosa={true} variables={this.props.camposVariables[i]} seleccionarMultiple={false} retornoSeleccion={this.checkFieldType} titulo={variable.valor}></ListasSeleVariable>
                                </div>
                            ))}
                        </div>
                    </Accordion>
                    <br/>
                </div>
            </div>
        );
    }
}
