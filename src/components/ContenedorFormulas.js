import React from 'react';

import VariableCreation from './Regla/VariableCreation.js';
import ContenedorReglas from './ContenedorReglas.js';

//const campos = [{valor: "idCLiente"}, {valor: "saldoTotal"}, {valor: "tipoPersona"}, {valor: "impuestosTotal"}, {valor: "nombreCliente"}, {valor: "diasMora"}, {valor: "mesMora"}];
const variables = [];
const objetos = [];
const camposDeObjetos = [];

export default class ContenedorFormulas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarCrearCondicion: true,
            asignaciones: []
        }
        /*this.mostrarCrearCondicion = this.mostrarCrearCondicion.bind(this);
        this.mostrarAsignarFormula = this.mostrarAsignarFormula.bind(this);*/
    }
    
    render() {
        return (
            <div style={{width: "100%"}}>
                <h3 className={"card-header"}>Crear Asignación / Fórmula</h3>
                <br/>
                <div className={"text-center"}>
                    <a className={"btn btn-success col-xs-10 col-10 btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={() => this.props.goToCreateFormula(-1)}>Crear Asignación / Fórmula</a>
                </div>
                <hr/>
                <div className={"text-center"}>
                    {this.props.asignaciones.map((asignacion, i) => (
                        <div>
                            <input type="radio" name="formulas" className="custom-control-input"/>
                            <a className={"btn btn-success btn-primary col-xs-10 col-10 btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={() => this.props.goToCreateFormula(i)}>{asignacion.formula}</a>
                        </div>
                    ))}
                    {
                        this.props.asignaciones.length == 0
                        ? <a style={{color: "#fafafa"}} className={"btn btn-dark col-xs-10 col-10 btnWhiteColorHover font-bold font-20"}>No existen asignaciones / fórmulas creadas</a>
                        : null
                    }
                </div>
                <hr/>
                <div className={"text-center"}>
                    <a onClick={this.props.callbackCrearRegla} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Crear Condición / Instrucción</a>
                </div>
                <br/>
            </div>
        );
    }
}
