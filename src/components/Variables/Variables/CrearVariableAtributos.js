import React from 'react';

const campos = [{nombre: "idCLiente"}, {nombre: "saldoTotal"}, {nombre: "tipoPersona"}, {nombre: "impuestosTotal"}, {nombre: "nombreCliente"}, {nombre: "diasMora"}, {nombre: "mesMora"}];
const variables = [{nombre: "sucursalesTotales"}, {nombre: "numSocios"}, {nombre: "utilidad"}, {nombre: "patrimonio"}];

export default class CrearVariableAtributos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: this.props.titulo,
            mostrarCrearEscalar: this.props.mostrarCrearEscalar
        }
        this.handleMouseHoverCrear = this.handleMouseHoverCrear.bind(this);
        this.handleMouseHoverEditar = this.handleMouseHoverEditar.bind(this);
        this.handleMouseHoverExit = this.handleMouseHoverExit.bind(this);
        this.goCrearVariableEscalar = this.goCrearVariableEscalar.bind(this);
        this.goCrearVariableObjeto = this.goCrearVariableObjeto.bind(this);
        this.verificarBotonSel = this.verificarBotonSel.bind(this);
    }

    componentDidMount () {
    }
    
    render() {
        return (
            <div style={{width: "100%", padding: "2%"}}>
                <div className={"row"} style={{height: "2em",width: "100%"}}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 onHoverOpcionUmbral"} style={{height: "100%",width: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid #e6e6f2", borderBottom: "1px solid #e6e6f2"}}>
                        {this.props.titulo}
                    </div>
                </div>
                <br/>
                { this.props.mostrarCrearEscalar ? (
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <a className={"btn btn-secondary btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.showFormula}>Fórmula</a>
                            <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.showCondicionVar}>Condiciones para el Cálculo</a>
                        </div>
                    </div>
                ) : (
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div style={{width: "100%"}}>
                                <div className={"row"} style={{width: "100%"}}>
                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                                        <label htmlFor="nombreAtributo" className="col-form-label">Nombre de Atributo:</label>
                                    </div>
                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"}>
                                        <input id="nombreAtributo" type="text" className="form-control form-control-sm"/>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <a className={"btn btn-primary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.crearAtributoDeObjeto}>Crear</a>
                            </div>
                            <hr/>

                            {this.props.campos.map((campo, i) => (
                                <div style={{width: "100%"}} key={campo.ID}>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                                            <label htmlFor="inputSmall" className="col-form-label" defaultValue={campo.nombre}>Nombre de Atributo:</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"}>
                                            <input id="inputSmall" type="text" className="form-control form-control-sm"/>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <a className={"btn btn-primary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.crearAtributoDeObjeto}>Guardar</a>
                                    </div>
                                    <a className={"btn btn-secondary btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.showFormula}>Fórmula</a>
                                    <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.showCondicionVar}>Condiciones para el Cálculo</a>
                                    <hr/>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
