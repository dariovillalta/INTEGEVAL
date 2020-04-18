import React from 'react';
import sql from 'mssql';
import Slider from 'react-input-slider';

const tipoCampos = [ {nombre: "texto"}, {nombre: "booleano"}, {nombre: "fecha"}, {nombre: "número"}, {nombre: "arreglo"}];

export default class CrearRiesgo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0
        }
        this.crearRiesgo = this.crearRiesgo.bind(this);
    }

    crearRiesgo () {
        var nombre = $("#nombreRiesgo").val();
        var formula = '';
        var peso = this.state.x;
        var tolerancia = parseInt($("#tolerancia").val());
        var valorIdeal = parseInt($("#valorIdeal").val());
        var riesgoPadre = parseInt(this.props.riesgoPadre);
        var nivel = 0;
        if(this.props.riesgoPadre == undefined || this.props.riesgoPadre == -1) {
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
            request.query("insert into Riesgos (nombre, formula, peso, tolerancia, valorIdeal, idRiesgoPadre, nivelRiesgoHijo) values ('"+nombre+"', '"+formula+"', "+peso+", "+tolerancia+", "+valorIdeal+", "+riesgoPadre+", "+nivel+")", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.props.terminoCrearRiesgo();
                        this.props.actualizarRiesgos();
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
                            <h2 className={"pageheader-title"}>Crear Riesgo</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionRiesgo}><a href="#" className={"breadcrumb-link"}>Riesgos</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Crear Riesgo</li>
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
                                            <input id="nombreRiesgo" type="text" className="form-control form-control-sm"/>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="nombreRiesgo" className="col-form-label">Fórmula</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <select id="formula" className="form-control">
                                                <option value="ambos">Calidad de Gestión + Riesgo Inherente</option>
                                                <option value="riesgoInherente">Riesgo Inherente</option>
                                                <option value="calidadGestión">Calidad de Gestión</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="peso" className="col-form-label">Peso</label>
                                        </div>
                                        <div className={"col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 form-group"}>
                                            <Slider
                                                axis="x"
                                                xstep={1}
                                                xmin={0}
                                                xmax={this.props.pesoMaximo}
                                                x={this.state.x}
                                                onChange={({ x }) => this.setState({ x: x }) }
                                                style={{width: "100%", marginTop: "10px"}}/>
                                        </div>
                                        <div className={"col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 form-group"}>
                                            <label id="pesoLabel" className="col-form-label">{this.state.x}</label>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="tolerancia" className="col-form-label">Tolerancia</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <input id="tolerancia" type="text" className="form-control form-control-sm"/>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="valorIdeal" className="col-form-label">Valor Ideal</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <input id="valorIdeal" type="text" className="form-control form-control-sm"/>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="riesgoPadre" className="col-form-label">Riesgo Padre</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <select id="riesgoPadre" className="form-control">
                                                <option value="-1">Ninguno</option>
                                                {this.props.riesgos.map((riesgo, i) =>
                                                    <option value={riesgo.ID} key={riesgo.ID}>{riesgo.nombre}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <a className={"btn btn-primary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.crearRiesgo}>Crear</a>
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
