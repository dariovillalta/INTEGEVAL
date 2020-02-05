import React from 'react';

import ListasSeleVariable from '../../../ListasSeleVariable.js';

const variables = [{nombre: "sucursalesTotales"}, {nombre: "numSocios"}, {nombre: "utilidad"}, {nombre: "patrimonio"}];
const operaciones = [{valor: "Asignar"}, {valor: "Asignar Si"}, {valor: "Contar"}, {valor: "Contar Si"}];

var columnaSeleccionada = [], operacionSeleccionada = [];

export default class EditarFuenteDatosAtributos extends React.Component {
    constructor(props) {
        super(props);
        this.crearAtributoDeObjeto = this.crearAtributoDeObjeto.bind(this);
        this.actualizarSeleccionColumna = this.actualizarSeleccionColumna.bind(this);
        this.actualizarSeleccionOperacion = this.actualizarSeleccionOperacion.bind(this);
    }

    componentDidMount () {
    }

    crearAtributoDeObjeto () {
        //
    }

    actualizarSeleccionColumna (columna) {
        columnaSeleccionada = columna;
        console.log('columnaSeleccionada');
        console.log(columnaSeleccionada);
        console.log('operacionSeleccionada');
        console.log(operacionSeleccionada);
    }

    actualizarSeleccionOperacion (operacion) {
        operacionSeleccionada = operacion;
        console.log('columnaSeleccionada');
        console.log(columnaSeleccionada);
        console.log('operacionSeleccionada');
        console.log(operacionSeleccionada);
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
                                    <ListasSeleVariable mostrarRosa={false} variables={operaciones} seleccionarMultiple={false} retornoSeleccion={this.actualizarSeleccionOperacion} titulo={"Operaciones"}></ListasSeleVariable>
                                </div>
                            </div>
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
                                        <ListasSeleVariable mostrarRosa={false} variables={operaciones} seleccionarMultiple={false} retornoSeleccion={this.actualizarSeleccionOperacion} titulo={"Operaciones"}></ListasSeleVariable>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <a className={"btn btn-primary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.crearAtributoDeObjeto}>Crear</a>
                            </div>
                            <hr/>

                            {this.props.atributos.map((campo, i) => (
                                <div style={{width: "100%"}} key={campo.ID}>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                                            <label htmlFor="inputSmall" className="col-form-label" defaultValue={campo.nombre}>Nombre de Atributo:</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"}>
                                            <input id="inputSmall" type="text" className="form-control form-control-sm"/>
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
                                            <ListasSeleVariable mostrarRosa={false} variables={operaciones} seleccionarMultiple={false} retornoSeleccion={this.actualizarSeleccionOperacion} titulo={"Operaciones"}></ListasSeleVariable>
                                        </div>
                                    </div>
                                    <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.showCondicionVar}>Condiciones para el Cálculo</a>
                                    <br/>
                                    <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <a className={"btn btn-primary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.crearAtributoDeObjeto}>Guardar</a>
                                    </div>
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
