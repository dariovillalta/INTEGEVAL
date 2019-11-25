import React from 'react';

const campos = [{nombre: "idCLiente"}, {nombre: "saldoTotal"}, {nombre: "tipoPersona"}, {nombre: "impuestosTotal"}, {nombre: "nombreCliente"}, {nombre: "diasMora"}, {nombre: "mesMora"}];
const variables = [{nombre: "sucursalesTotales"}, {nombre: "numSocios"}, {nombre: "utilidad"}, {nombre: "patrimonio"}];

export default class CrearVariableOpciones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarCrearEscalar: true,
            variableEscalar: false,
            variableObjeto: false
        }
        this.handleMouseHoverCrear = this.handleMouseHoverCrear.bind(this);
        this.handleMouseHoverEditar = this.handleMouseHoverEditar.bind(this);
        this.handleMouseHoverExit = this.handleMouseHoverExit.bind(this);
        this.goCrearVariableEscalar = this.goCrearVariableEscalar.bind(this);
        this.goCrearVariableObjeto = this.goCrearVariableObjeto.bind(this);
        this.verificarBotonSel = this.verificarBotonSel.bind(this);
    }

    handleMouseHoverCrear() {
        $("#crearButton").addClass("onHoverOpcionUmbral");
        $("#editarButton").removeClass("onHoverOpcionUmbral");
    }

    handleMouseHoverEditar() {
        $("#editarButton").addClass("onHoverOpcionUmbral");
        $("#crearButton").removeClass("onHoverOpcionUmbral");
    }

    handleMouseHoverExit() {
        $("#crearButton").removeClass("onHoverOpcionUmbral");
        $("#editarButton").removeClass("onHoverOpcionUmbral");
        this.verificarBotonSel();
    }

    verificarBotonSel () {
        if(this.state.variableEscalar) {
            $("#crearButton").addClass("onHoverOpcionUmbral");
            $("#editarButton").removeClass("onHoverOpcionUmbral");
        } else if(this.state.variableObjeto) {
            $("#editarButton").addClass("onHoverOpcionUmbral");
            $("#crearButton").removeClass("onHoverOpcionUmbral");
        }
    }

    goCrearVariableEscalar() {
        this.setState({
            mostrarCrearEscalar: true,
            variableEscalar: true,
            variableObjeto: false
        });
    }

    goCrearVariableObjeto() {
        this.setState({
            mostrarCrearEscalar: false,
            variableEscalar: false,
            variableObjeto: true
        });
    }
    
    render() {
        return (
            <div style={{width: "100%", padding: "2%"}}>
                <div className={"row"} style={{height: "2em",width: "100%"}}>
                    <div onMouseEnter={this.handleMouseHoverCrear} onMouseLeave={this.handleMouseHoverExit} onClick={this.goCrearVariableEscalar} id="crearButton" className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"} style={{height: "100%",width: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid #e6e6f2", borderBottom: "1px solid #e6e6f2"}}>
                        Valor Único
                    </div>
                    <div onMouseEnter={this.handleMouseHoverEditar} onMouseLeave={this.handleMouseHoverExit} onClick={this.goCrearVariableObjeto} id="editarButton" className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"}style={{height: "100%",width: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #e6e6f2"}}>
                        Varios Atributos
                    </div>
                </div>
                <br/>
                { this.state.mostrarCrearEscalar ? (
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <a className={"btn btn-secondary btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.showFormula}>Fuente de Dato</a>
                            <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.showCondicionVar}>Condiciones para el Cálculo</a>
                        </div>
                    </div>
                ) : (
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div style={{width: "100%"}}>
                                <div className={"row"} style={{width: "100%"}}>
                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                                        <label htmlFor="inputSmall" className="col-form-label">Nombre de Atributo:</label>
                                    </div>
                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"}>
                                        <input id="inputSmall" type="text" className="form-control form-control-sm"/>
                                    </div>
                                </div>
                                <a className={"btn btn-secondary btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.showFormula}>Fuente de Dato</a>
                                <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.showCondicionVar}>Condiciones para el Cálculo</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
