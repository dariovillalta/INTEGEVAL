import React from 'react';

import EditarFuenteDatosAtributos from './EditarFuenteDatosAtributos.js';

const tipoCampos = [ {nombre: "texto"}, {nombre: "booleano"}, {nombre: "fecha"}, {nombre: "número"}];

export default class EditarFuenteDatos extends React.Component {
    constructor(props) {
        super(props);
        this.goEditFormula = this.goEditFormula.bind(this);
    }

    goEditFormula () {
        this.props.updateFormula(idVarEditar, tablaVarEditar);
    }

    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Editar Riesgo</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goOptions}><a href="#" className={"breadcrumb-link"}>Tipo de Variable</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionTabla}><a href="#" className={"breadcrumb-link"}>Tablas</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionFuenteDatos}><a href="#" className={"breadcrumb-link"}>Fuentes de Datos</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Editar Riesgo</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>
                                <div className={"border-top border-bottom addPaddingToConfig"} style={{width: "100%"}}>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="nombreFuenteDato" className="col-form-label">Nombre Fuente de Dato (Variable Origen)</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <input id="nombreFuenteDato" type="text" className="form-control form-control-sm"/>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                                            <label htmlFor="descripcionFuenteDato" className="col-form-label">Descripción de Variable:</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"}>
                                            <textarea className="form-control" id="descripcionFuenteDato" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="esObjetoFuenteDato" className="col-form-label">Tiene más de un atributo / propiedad:</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <div className={"switch-button-variable switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                                                <input type="checkbox" defaultChecked name={"esObjetoFuenteDato"} id={"esObjetoFuenteDato"} onClick={this.cambioAObjeto}/><span>
                                                <label htmlFor={"esObjetoFuenteDato"}></label></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="guardarFuenteDato" className="col-form-label">Guardar Valores Obtenidos en Base de Datos</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <br/>
                                            <div className={"switch-button switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                                                <input type="checkbox" defaultChecked name={"guardarFuenteDato"} id={"guardarFuenteDato"}/><span>
                                                <label htmlFor={"guardarFuenteDato"}></label></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%", display: this.state.mostrarEsObjeto ? "none" : ""}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                                            <label htmlFor="objetoPadreID" className="col-form-label">Variable Padre:</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"}>
                                            <select className="form-control" id="objetoPadreID">
                                                <option value="-1">Ninguno</option>
                                            </select>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className={"row"} style={{width: "100%", border: "1px solid #e6e6f2"}}>
                                        <EditarFuenteDatosAtributos atributos={this.state.atributos} campos={this.props.columnas} titulo={this.state.titulo} mostrarEsObjeto={this.state.mostrarEsObjeto} clickEnVariable={this.retornoSeleccionCampo} clickEnOperacion={this.retornoSeleccionOperacion} tipoVariable={this.state.tipoVariable} operaciones={this.state.operaciones}> </EditarFuenteDatosAtributos>
                                    </div>
                                    <br/>
                                    <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <a className={"btn btn-primary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.crearFuenteDato}>Crear</a>
                                    </div>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
