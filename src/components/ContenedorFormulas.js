import React from 'react';

import VariableCreation from './Regla/VariableCreation.js';
import ContenedorReglas from './ContenedorReglas.js';

//const campos = [{valor: "idCLiente"}, {valor: "saldoTotal"}, {valor: "tipoPersona"}, {valor: "impuestosTotal"}, {valor: "nombreCliente"}, {valor: "diasMora"}, {valor: "mesMora"}];
const variables = [];
const objetos = [];
const camposDeObjetos = [];

var formulaSeleccionada;

export default class ContenedorFormulas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarCrearCondicion: true,
            asignaciones: []
        }
        this.actualizarSeleccionFormula = this.actualizarSeleccionFormula.bind(this);
        this.verificarSeleccionFormula = this.verificarSeleccionFormula.bind(this);
    }

    actualizarSeleccionFormula (asignacion) {
        formulaSeleccionada = asignacion;
    }

    verificarSeleccionFormula () {
        if(formulaSeleccionada != undefined && formulaSeleccionada != null) {
            this.props.callbackCrearRegla(true, formulaSeleccionada);
        } else {
            alert("Seleccione por lo menos una formula")
        }
    }
    
    render() {
        return (
            <div style={{width: "100%"}}>
                <h3 className={"card-header"}>Crear Fórmula (Asignación)</h3>
                <br/>
                <div className={"text-center"}>
                    <a className={"btn btn-success col-xs-10 col-10 btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={() => this.props.goToCreateFormula(-1)}>Crear</a>
                </div>
                <hr/>
                <h3 className={"card-header"}>Editar Fórmula (Asignación)</h3>
                <br/>
                <div>
                    {this.props.asignaciones.map((asignacion, i) => (
                        <div key={i} style={{paddingLeft: "10px", paddingRight: "5px"}}>
                            {
                                i != 0
                                ? <br/>
                                : null
                            }
                            <label className="custom-control custom-radio">
                                <input type="radio" name="formulasRadio" className="custom-control-input" onClick={() => this.actualizarSeleccionFormula(asignacion)}/><span className="custom-control-label">{asignacion.formula}</span>
                            </label>
                        </div>
                    ))}
                    {
                        this.props.asignaciones.length == 0
                        ? 
                            <div className={"text-center"}>
                                <a style={{color: "#fafafa"}} className={"btn btn-dark col-xs-10 col-10 btnWhiteColorHover font-bold font-20"}>No existen asignaciones / fórmulas creadas</a>
                            </div>
                        : null
                    }
                </div>
                <hr/>
                <div className={"text-center"}>
                    <a onClick={this.verificarSeleccionFormula} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Agregar Asignación / Fórmula a Reglas</a>
                </div>
                <br/>
            </div>
        );
    }
}
