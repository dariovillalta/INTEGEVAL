import React from 'react';

import ListasSeleVariable from '../../../ListasSeleVariable.js';

const variables = [{nombre: "sucursalesTotales"}, {nombre: "numSocios"}, {nombre: "utilidad"}, {nombre: "patrimonio"}];
//const operaciones = [{valor: "Asignar"}, {valor: "Asignar Si"}, {valor: "Contar"}, {valor: "Contar Si"}];

export default class CrearFuenteDatosAtributos extends React.Component {
    constructor(props) {
        super(props);
        this.actualizarSeleccionColumna = this.actualizarSeleccionColumna.bind(this);
        this.actualizarSeleccionOperacion = this.actualizarSeleccionOperacion.bind(this);
    }

    componentDidMount () {
    }

    actualizarSeleccionColumna (columna) {
        this.props.clickEnVariable(columna)
    }

    actualizarSeleccionOperacion (operacion) {
        this.props.clickEnOperacion(operacion)
    }
    
    render() {
        return (
            <div style={{width: "100%", padding: "2%"}}>
                <div className={"row"} style={{height: "2em",width: "100%"}}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "+ (this.props.mostrarEsObjeto ? "onHoverOpcionUmbralSinCursor" : "onHoverOpcionUmbralSinCursorGris") } style={{height: "100%",width: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid #e6e6f2", borderBottom: "1px solid #e6e6f2"}}>
                        {this.props.titulo}
                    </div>
                </div>
                <br/>
                { !this.props.mostrarEsObjeto ? (
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"row"} style={{width: "100%", height: "150px"}}>
                                <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                    <label htmlFor="listas" className="col-form-label">Columna de tabla</label>
                                </div>
                                <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                    <ListasSeleVariable mostrarRosa={true} variables={this.props.campos} seleccionarMultiple={false} retornoSeleccion={this.actualizarSeleccionColumna} titulo={"Columnas"}></ListasSeleVariable>
                                </div>
                            </div>
                            <div className={"row"} style={{width: "100%", height: "150px"}}>
                                <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                    <label htmlFor="listas" className="col-form-label">Operación</label>
                                </div>
                                <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                    <ListasSeleVariable mostrarRosa={false} variables={this.props.operaciones} seleccionarMultiple={false} retornoSeleccion={this.actualizarSeleccionOperacion} titulo={"Operaciones"}></ListasSeleVariable>
                                </div>
                            </div>
                            <div className={"row"} style={{width: "100%"}}>
                                <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                    <label htmlFor="tipoFuenteDato" className="col-form-label">Tipo de Variable</label>
                                </div>
                                <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <a className={"breadcrumb-item active font-20"} aria-current="page">{this.props.tipoVariable}</a>
                                </div>
                            </div>
                            <br/>
                            <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.goToCreateConditions}>Condiciones para el Cálculo</a>
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
                                <div className={"row"} style={{width: "100%", height: "150px"}}>
                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                        <label htmlFor="listas" className="col-form-label">Columna de tabla</label>
                                    </div>
                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                        <ListasSeleVariable mostrarRosa={true} variables={this.props.campos} seleccionarMultiple={false} retornoSeleccion={this.actualizarSeleccionColumna} titulo={"Columnas"}></ListasSeleVariable>
                                    </div>
                                </div>
                                <div className={"row"} style={{width: "100%", height: "150px"}}>
                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                        <label htmlFor="listas" className="col-form-label">Operación</label>
                                    </div>
                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                        <ListasSeleVariable mostrarRosa={false} variables={this.props.operaciones} seleccionarMultiple={false} retornoSeleccion={this.actualizarSeleccionOperacion} titulo={"Operaciones"}></ListasSeleVariable>
                                    </div>
                                </div>
                                <div className={"row"} style={{width: "100%"}}>
                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                        <label htmlFor="tipoFuenteDato" className="col-form-label">Tipo de Variable</label>
                                    </div>
                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <a className={"breadcrumb-item active font-20"} aria-current="page">{this.props.tipoVariable}</a>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.goToCreateConditions}>(Condiciones|Instrucciones) para el Cálculo </a>
                            <br/>
                            <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <a className={"btn btn-primary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.crearAtributoFuenteDatos}>Crear Atributo</a>
                            </div>

                            {this.props.atributos.map((atributo, i) => (
                                <div style={{width: "100%"}} key={i}>
                                    <hr/>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                                            <label htmlFor="inputSmall" className="col-form-label">Nombre de Atributo:</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"}  style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <a className={"breadcrumb-item active font-18"} aria-current="page">{atributo.nombre}</a>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%", height: "150px"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="listas" className="col-form-label">Columna de tabla</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <ListasSeleVariable mostrarRosa={true} variables={this.props.campos} seleccionarMultiple={false} retornoSeleccion={this.actualizarSeleccionColumna} titulo={"Columnas"}></ListasSeleVariable>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%", height: "150px"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="listas" className="col-form-label">Operación</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <ListasSeleVariable mostrarRosa={false} variables={this.props.operaciones} seleccionarMultiple={false} retornoSeleccion={this.actualizarSeleccionOperacion} titulo={"Operaciones"}></ListasSeleVariable>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="tipoFuenteDato" className="col-form-label">Tipo de Variable</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <a className={"breadcrumb-item active font-20"} aria-current="page">{atributo.tipo}</a>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <a className={"btn btn-primary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.crearAtributoFuenteDatos}>Editar Atributo</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
