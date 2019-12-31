import React from 'react';
import sql from 'mssql';

import CrearVariableOpciones from './CrearVariableOpciones.js';

export default class CrearVariable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarEsObjeto: false
        }
        this.goCrearUmbral = this.goCrearUmbral.bind(this);
        this.cambioAObjeto = this.cambioAObjeto.bind(this);
        this.crearVariable = this.crearVariable.bind(this);

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
        });
    }

    crearVariable () {
        console.log('1x')
        var nombre = $("#nombreVariable").val();
        var descripcion = $("#descripcionVariable").val();
        var esObjeto;
        if ($("#esObjetoVariable").is(':checked'))
            esObjeto = true;
        else
            esObjeto = false;
        var objetoPadreID = $("#objetoPadreID").val();
        if(!this.state.mostrarEsObjeto)
            objetoPadreID = -1;
        var nivel = 0;
        console.log('nombre')
        console.log(nombre)
        console.log('descripcion')
        console.log(descripcion)
        console.log('esObjeto')
        console.log(esObjeto)
        console.log('objetoPadreID')
        console.log(objetoPadreID)
        console.log('nivel')
        console.log(nivel)
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into Variables (nombre, descripcion, esObjeto, objetoPadreID, nivel) values ('"+nombre+"', '"+descripcion+"', '"+esObjeto+"', "+objetoPadreID+", "+nivel+")", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.props.terminoCrearCampo(nombre);
                        console.log('klklk')
                    });
                }
            });
        }); // fin transaction
        console.log('despues')
    }

    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Crear Variable</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goOptions}><a href="#" className={"breadcrumb-link"}>Tipo de Variables</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionVariable}><a href="#" className={"breadcrumb-link"}>Variables</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Crear Variable</li>
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
                                                <input id="nombreVariable" type="text" className="form-control form-control-sm"/>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                                                <label htmlFor="descripcionVariable" className="col-form-label">Descripción de Variable:</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"}>
                                                <textarea className="form-control" id="descripcionVariable" rows="3"></textarea>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="esObjetoVariable" className="col-form-label">Tiene más de un atributo:</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <div className={"switch-button-variable switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                                                    <input type="checkbox" defaultChecked name={"esObjetoVariable"} id={"esObjetoVariable"} onClick={this.cambioAObjeto}/><span>
                                                    <label htmlFor={"esObjetoVariable"}></label></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="guardarVariable" className="col-form-label">Guardar Valores Obtenidos en Base de Datos</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <br/>
                                                <div className={"switch-button switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                                                    <input type="checkbox" defaultChecked name={"guardarVariable"} id={"guardarVariable"}/><span>
                                                    <label htmlFor={"guardarVariable"}></label></span>
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
                                        <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <a className={"btn btn-primary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.crearVariable}>Crear</a>
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
