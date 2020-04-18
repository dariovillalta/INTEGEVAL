import React from 'react';

import VariableCreation from './Regla/VariableCreation.js';
import ContenedorReglas from './ContenedorReglas.js';

//const campos = [{valor: "idCLiente"}, {valor: "saldoTotal"}, {valor: "tipoPersona"}, {valor: "impuestosTotal"}, {valor: "nombreCliente"}, {valor: "diasMora"}, {valor: "mesMora"}];
const variables = [];
const objetos = [];
const camposDeObjetos = [];

var formulaSeleccionada, posicionFormula;

export default class ContenedorFormulas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarCrearCondicion: true,
            asignaciones: [],
            crearSelected: true,
            editarSelected: false,
            eliminarSelected: false
        }
        this.actualizarSeleccionFormula = this.actualizarSeleccionFormula.bind(this);
        this.verificarSeleccionFormula = this.verificarSeleccionFormula.bind(this);
        this.handleMouseHoverAgregar = this.handleMouseHoverAgregar.bind(this);
        this.handleMouseHoverModificar = this.handleMouseHoverModificar.bind(this);
        this.handleMouseHoverEliminar = this.handleMouseHoverEliminar.bind(this);
        this.handleMouseHoverExit = this.handleMouseHoverExit.bind(this);
        this.verificarBotonSel = this.verificarBotonSel.bind(this);
        this.goCrear = this.goCrear.bind(this);
        this.goModificar = this.goModificar.bind(this);
        this.goEliminar = this.goEliminar.bind(this);
        this.verificarAccion = this.verificarAccion.bind(this);
    }

    componentDidMount() {
        this.verificarBotonSel();
    }

    actualizarSeleccionFormula (asignacion, posicionFormulaN) {
        formulaSeleccionada = asignacion;
        posicionFormula = posicionFormulaN;
    }

    verificarSeleccionFormula () {
        if(formulaSeleccionada != undefined && formulaSeleccionada != null) {
            this.props.callbackCrearRegla(true, formulaSeleccionada, posicionFormula);
        } else {
            alert("Seleccione por lo menos una formula")
        }
    }

    handleMouseHoverAgregar() {
        $("#crearButton").addClass("onHoverOpcionUmbralSinCambioHeight");
        $("#modificarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        $("#eliminarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
    }

    handleMouseHoverModificar() {
        $("#crearButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        $("#modificarButton").addClass("onHoverOpcionUmbralSinCambioHeight");
        $("#eliminarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
    }

    handleMouseHoverEliminar() {
        $("#crearButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        $("#modificarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        $("#eliminarButton").addClass("onHoverOpcionUmbralSinCambioHeight");
    }

    handleMouseHoverExit() {
        $("#crearButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        $("#modificarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        $("#eliminarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        this.verificarBotonSel();
    }

    verificarBotonSel () {
        if(this.state.crearSelected) {
            $("#crearButton").addClass("onHoverOpcionUmbralSinCambioHeight");
            $("#modificarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
            $("#eliminarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        } else if(this.state.editarSelected) {
            $("#crearButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
            $("#modificarButton").addClass("onHoverOpcionUmbralSinCambioHeight");
            $("#eliminarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        } else if (this.state.eliminarSelected) {
            $("#crearButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
            $("#modificarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
            $("#eliminarButton").addClass("onHoverOpcionUmbralSinCambioHeight");
        }
    }

    goCrear() {
        this.setState({
            crearSelected: true,
            editarSelected: false,
            eliminarSelected: false
        });
    }

    goModificar() {
        this.setState({
            crearSelected: false,
            editarSelected: true,
            eliminarSelected: false
        });
    }

    goEliminar() {
        this.setState({
            crearSelected: false,
            editarSelected: false,
            eliminarSelected: true
        });
    }

    verificarAccion () {
        if(this.state.crearSelected)
            this.verificarSeleccionFormula();
        else if(this.state.editarSelected) {
            if(formulaSeleccionada != undefined && formulaSeleccionada != null) {
                this.props.callbackModificarRegla(true, formulaSeleccionada, posicionFormula);
            } else {
                alert("Seleccione por lo menos una formula")
            }
        } else {
            this.props.callbackEliminarRegla(true);
        }
    }
    
    render() {
        return (
            <div style={{width: "100%"}}>
                <h3 className={"card-header"}>Crear Asignación</h3>
                <br/>
                <div className={"text-center"}>
                    <a className={"btn btn-success col-xs-10 col-10 btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={() => this.props.goToCreateFormula(-1)}>Crear</a>
                </div>
                <hr/>
                <h3 className={"card-header"}>Seleccionar Asignación</h3>
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
                                <input type="radio" name="formulasRadio" className="custom-control-input" onClick={() => this.actualizarSeleccionFormula(asignacion, i)}/><span className="custom-control-label">{asignacion.formula}</span>
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
                <div className={"row"}>
                    <div className={"col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2"}>
                        <div id="crearButton" onMouseEnter={this.handleMouseHoverAgregar} onMouseLeave={this.handleMouseHoverExit} onClick={this.goCrear} className="border text-center addPointer">Agregar</div>
                        <div id="modificarButton" onMouseEnter={this.handleMouseHoverModificar} onMouseLeave={this.handleMouseHoverExit} onClick={this.goModificar} className="border text-center addPointer">Modificar</div>
                        <div id="eliminarButton" onMouseEnter={this.handleMouseHoverEliminar} onMouseLeave={this.handleMouseHoverExit} onClick={this.goEliminar} className="border text-center addPointer">Eliminar</div>
                    </div>
                    <div className={"col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10"} style={{display: this.state.crearSelected ?  "" : "none"}}>
                        <div className={"text-center"}>
                            <a onClick={this.verificarAccion} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Agregar Asignación</a>
                        </div>
                    </div>
                    <div className={"col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10"} style={{display: this.state.editarSelected ? "" : "none"}}>
                        <div className={"text-center"}>
                            <a onClick={this.verificarAccion} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Modificar Asignación</a>
                        </div>
                    </div>
                    <div className={"col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10"} style={{display: this.state.eliminarSelected ? "" : "none"}}>
                        <div className={"text-center"}>
                            <a onClick={this.verificarAccion} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Eliminar</a>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}
