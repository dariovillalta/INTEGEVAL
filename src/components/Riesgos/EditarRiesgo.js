import React from 'react';

const tipoCampos = [ {nombre: "texto"}, {nombre: "booleano"}, {nombre: "fecha"}, {nombre: "número"}, {nombre: "arreglo"}];

export default class EditarRiesgo extends React.Component {
    constructor(props) {
        super(props);
        this.goCrearUmbral = this.goCrearUmbral.bind(this);
        this.goEditFormula = this.goEditFormula.bind(this);
        this.guardarRiesgo = this.guardarRiesgo.bind(this);
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
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionRiesgoUmbral}><a href="#" className={"breadcrumb-link"}>Riesgos</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.editarRiesgo}><a href="#" className={"breadcrumb-link"}>Editar Riesgo</a></li>
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

    goEditFormula () {
        this.props.updateFormula(idVarEditar, tablaVarEditar);
    }

    guardarRiesgo () {
        var nombre = $("#nombreRiesgo").val();
        var formula = '';
        var peso = parseInt($("#peso").val());
        var tolerancia = parseInt($("#tolerancia").val());
        var valorIdeal = parseInt($("#valorIdeal").val());
        var tipoValorIdeal = $("#tipoValorIdeal").val();
        var riesgoPadre = parseInt(this.props.riesgoPadre);
        var nivel = 0;
        if(this.props.riesgoPadre == -1) {
            riesgoPadre = parseInt($("#riesgoPadre").val());
        }
        console.log('nombre');
        console.log(nombre);
        console.log('formula');
        console.log(formula);
        console.log('peso');
        console.log(peso);
        console.log('tolerancia');
        console.log(tolerancia);
        console.log('valorIdeal');
        console.log(valorIdeal);
        console.log('riesgoPadre');
        console.log(riesgoPadre);
        console.log('nivel');
        console.log(nivel);
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("update Riesgos set nombre = '"+nombre+"', peso = "+peso+", tolerancia = "+tolerancia+", valorIdeal = "+valorIdeal+", tipoValorIdeal = '"+tipoValorIdeal+"', riesgoPadre = "+riesgoPadre+" where ID = "+this.props.idRiesgoSeleccionado, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.props.terminoCrearRiesgo(nombre);
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
                            <h2 className={"pageheader-title"}>Editar Riesgo</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.editarRiesgo}><a href="#" className={"breadcrumb-link"}>Riesgos</a></li>
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
                                            <label htmlFor="nombreRiesgo" className="col-form-label">Nombre Riesgo</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <input id="nombreRiesgo" type="text" className="form-control form-control-sm" defaultValue={this.props.nombreRiesgo}/>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="peso" className="col-form-label">Peso</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <input id="peso" type="text" className="form-control form-control-sm" defaultValue={this.props.pesoRiesgo}/>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="tolerancia" className="col-form-label">Tolerancia</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <input id="tolerancia" type="text" className="form-control form-control-sm" defaultValue={this.props.toleranciaRiesgo}/>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="valorIdeal" className="col-form-label">Valor Ideal</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <input id="valorIdeal" type="text" className="form-control form-control-sm" defaultValue={this.props.valorIdealRiesgo}/>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="tipoValorIdeal" className="col-form-label">Tipo de Valor Ideal</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <select id="tipoValorIdeal" className="form-control">
                                                {tipoCampos.map((tipo, i) =>
                                                    <option value={tipo.nombre} key={tipo.nombre}>{tipo.nombre}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="riesgoPadre" className="col-form-label">Riesgo Padre</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <select id="riesgoPadre" className="form-control" defaultValue={this.props.padreRiesgo}>
                                                <option value="-1">Ninguno</option>
                                                {this.props.riesgos.map((riesgo, i) =>
                                                    <option value={riesgo.ID}>{riesgo.nombre}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <a className={"btn btn-brand btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.goCrearUmbral}>Umbrales</a>
                                    <br/>
                                    <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <a className={"btn btn-primary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.crearRiesgo}>Guardar</a>
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
