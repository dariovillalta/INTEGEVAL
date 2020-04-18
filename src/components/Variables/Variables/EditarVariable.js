import React from 'react';
import sql from 'mssql';

import CrearVariableOpciones from './CrearVariableOpciones.js';

export default class EditarVariable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreVariable: this.props.nombreVariable,
            descripcionVariable: this.props.descripcionVariable,
            esObjetoVariable: this.props.esObjetoVariable,
            objetoPadreID: this.props.objetoPadreID,
            mostrarEsObjeto: this.props.esObjetoVariable,
            campos: []
        }
        console.log("this.state.mostrarEsObjeto");
        console.log(this.state.mostrarEsObjeto);
        this.goCrearUmbral = this.goCrearUmbral.bind(this);
        this.cambioAObjeto = this.cambioAObjeto.bind(this);
        this.loadFields = this.loadFields.bind(this);
        this.crearAtributoDeObjeto = this.crearAtributoDeObjeto.bind(this);
    }

    componentDidMount () {
        this.loadFields();
    }

    goCrearUmbral () {
        var navbar = <div className={"row"}>
            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                <div className={"page-header"}>
                    <h2 className={"pageheader-title"}>Configuraci&oacute;n</h2>
                    <div className={"page-breadcrumb"}>
                        <nav aria-label="breadcrumb">
                            <ol className={"breadcrumb"}>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.showVariables}><a href="#" className={"breadcrumb-link"}>Variables</a></li>
                                <li className={"breadcrumb-item active font-16"} aria-current="page">Umbrales</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>;
        this.props.updateNavBar(navbar);
        this.props.showUmbralHome();
    }

    cambioAObjeto () {
        this.setState({
            mostrarEsObjeto: !this.state.mostrarEsObjeto
        }, console.log(this.state.formula) );
    }

    loadFields () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from VariablesCampos", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            campos: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    crearAtributoDeObjeto(nombre) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into VariablesCampos (nombre, formula) values ('"+nombre+"', '')", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.loadFields();
                    });
                }
            });
        }); // fin transaction
    }

    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Configuraci&oacute;n</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Variables</li>
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
                                <div className={"row border-top border-bottom"}>
                                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                        <br/>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                                                <label htmlFor="nombreVariable" className="col-form-label">Nombre de Variable:</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"}>
                                                <input id="nombreVariable" type="text" className="form-control form-control-sm" defaultValue={this.state.nombreVariable}/>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                                                <label htmlFor="descripcionVariable" className="col-form-label">Descripción de Variable:</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"}>
                                                <textarea className="form-control" id="descripcionVariable" rows="3" defaultValue={this.state.descripcionVariable}></textarea>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="esObjetoVariable" className="col-form-label">Tiene más de un atributo</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <div className={"switch-button-variable switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                                                    <input type="checkbox" defaultChecked={this.state.esObjetoVariable} name={"esObjetoVariable"} id={"esObjetoVariable"} onClick={this.cambioAObjeto} key={"esObjetoVariable"}/><span>
                                                    <label htmlFor={"esObjetoVariable"}></label></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%", display: !this.state.mostrarEsObjeto ? "none" : ""}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                                                <label htmlFor="objetoPadreID" className="col-form-label">Objeto Variable Padre:</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"}>
                                                <select className="form-control" id="objetoPadreID" defaultValue={this.state.idObjetoPadreVariable} key={"objetoPadreID"}>
                                                    <option value="-1">Ninguno</option>
                                                </select>
                                            </div>
                                        </div>
                                        <br/>
                                        <a className={"btn btn-brand btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.goCrearUmbral}>Umbrales</a>
                                        <br/>
                                        <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <a className={"btn btn-primary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.crearAtributoDeObjeto}>Guardar</a>
                                        </div>
                                        <br/>
                                        <div className={"row"} style={{width: "100%", border: "1px solid #e6e6f2"}}>
                                            <CrearVariableOpciones updateNavBar={this.props.updateNavBar} showVariables={this.props.showVariables} configuracionHome={this.props.configuracionHome} showFormula={this.props.showFormula} showCondicionVar={this.props.showCondicionVar} idVariable={this.props.idVariable} esObjetoVariable={this.props.esObjetoVariable} campos={this.state.campos} terminarCrearAtributo={this.crearAtributoDeObjeto}> </CrearVariableOpciones>
                                        </div>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
