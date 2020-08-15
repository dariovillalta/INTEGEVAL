import React from 'react';

import ListasSeleVariable from '../../../ListasSeleVariable.js';

const variables = [{nombre: "sucursalesTotales"}, {nombre: "numSocios"}, {nombre: "utilidad"}, {nombre: "patrimonio"}];
//const operaciones = [{valor: "Asignar"}, {valor: "Asignar Si"}, {valor: "Contar"}, {valor: "Contar Si"}];

export default class FuenteDatoVariableAtributos extends React.Component {
    constructor(props) {
        super(props);
        /*this.actualizarSeleccionColumna = this.actualizarSeleccionColumna.bind(this);*/
        this.actualizarIndiceAtributoSeleccionado = this.actualizarIndiceAtributoSeleccionado.bind(this);
    }

    componentDidMount () {
    }

    /*actualizarSeleccionColumna (columna) {
        this.props.clickEnVariable(columna)
    }*/

    actualizarIndiceAtributoSeleccionado (indice, tipoAtributo) {
        this.props.goToCreateConditions(indice, tipoAtributo);
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
                    <div>
                        { this.props.mostrarInstruccionSQL ? (
                            <div className={"row"}>
                                <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                    <br/>
                                    <a href="#" className="btn btn-success active font-20" style={{width: "100%"}} onClick={() => this.props.goCreateVariableFieldSQL()}>Editar Instrucción SQL </a>
                                    <br/>
                                </div>
                            </div>
                        ) : (
                            <div className={"row"}>
                                <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="tipoFuenteDato" className="col-form-label">Tipo de Variable</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <a className={"breadcrumb-item active font-20"} aria-current="page">{this.props.tipoNuevaVariable}</a>
                                        </div>
                                    </div>
                                    <br/>
                                    {
                                        this.props.tipoVariable.localeCompare("escalar") == 0
                                        ?   <a href="#" className="btn btn-success active font-20" style={{width: "100%"}} onClick={() => this.actualizarIndiceAtributoSeleccionado(0)}>Editar Instrucción Personalizada </a>
                                        :   <a href="#" className="btn btn-success active font-20" style={{width: "100%"}} onClick={() => this.actualizarIndiceAtributoSeleccionado(-1)}>Editar Instrucción Personalizada </a>
                                    }
                                    <br/>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        { this.props.mostrarInstruccionSQL ? (
                            <div className={"row"}>
                                <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                    <br/>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                            <a href="#" className="btn btn-success active font-20" style={{width: "100%"}} onClick={() => this.props.goCreateVariableFieldSQL()}>Editar Instrucción SQL </a>
                                        </div>
                                    </div>
                                    <br/>
                                </div>
                            </div>
                        ) : (
                            <div className={"row"}>
                                <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                    <div style={{width: "100%"}}>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                                                <label htmlFor="nombreAtributoNuevoCampo" className="col-form-label">Nombre de Atributo:</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                <input id="nombreAtributoNuevoCampo" defaultValue={this.props.nombreCampoNuevoAtributosVario} onKeyUp={this.props.actualizarNombreCampoNuevoAtributosVario} type="text" className="form-control form-control-sm"/>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="tipoFuenteDato" className="col-form-label">Tipo de Variable</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <a className={"breadcrumb-item active font-20"} aria-current="page">{this.props.tipoNuevaVariable}</a>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                            <a href="#" className="btn btn-success active font-20" style={{width: "100%"}} onClick={() => this.actualizarIndiceAtributoSeleccionado(-1)}>Crear Instrucción Personalizada </a>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <a className={"btn btn-primary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.crearAtributoVariable}>Crear Atributo</a>
                                    </div>
                                    <br/>

                                    {this.props.atributos.map((atributo, i) => (
                                        <div style={{width: "100%"}} key={i}>
                                            <hr/>
                                            <div style={{width: "100%"}}>
                                                <div className={"row"} style={{width: "100%"}}>
                                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                                                        <label htmlFor="nombreAtributo" className="col-form-label">Nombre de Atributo:</label>
                                                    </div>
                                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                        <input id={"nombreAtributo"+i} type="text" defaultValue={atributo.nombre} onKeyUp={() => this.props.modificarNombreVariable(i)} className="form-control form-control-sm"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                            <div className={"row"} style={{width: "100%"}}>
                                                <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                    <label htmlFor="tipoFuenteDato" className="col-form-label">Tipo de Variable</label>
                                                </div>
                                                <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                    <a className={"breadcrumb-item active font-20"} aria-current="page">{atributo.tipo}</a>
                                                </div>
                                            </div>
                                            <br/>
                                            <a href="#" className="btn btn-success active font-20" style={{width: "100%"}} onClick={() => this.actualizarIndiceAtributoSeleccionado(i)}>Editar Instrucción Personalizada </a>
                                            <br/><br/>
                                            <div className={"text-center"} style={{width: "100%"}}>
                                                <a href="#" className="btn btn-danger active" onClick={() => this.props.eliminarAtributoVariable(i)} style={{marginLeft: "10px"}}>Eliminar Variable</a>
                                            </div>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}
