import React from 'react';
import sql from 'mssql';

const tipoCampos = [ {nombre: "texto"}, {nombre: "booleano"}, {nombre: "fecha"}, {nombre: "número"}, {nombre: "arreglo"}];

export default class CrearIndicador extends React.Component {
    constructor(props) {
        super(props);
        this.crearIndicador = this.crearIndicador.bind(this);
    }

    crearIndicador () {
        var nombre = $("#nombreIndicador").val();
        var codigo = $("#codigo").val();
        var formula = '';
        var peso = parseInt($("#peso").val());
        var tolerancia = parseInt($("#tolerancia").val());
        var valorIdeal = parseInt($("#valorIdeal").val());
        var tipoValorIdeal = $("#tipoValorIdeal").val();
        var periodicidad = $("#periodicidad").val();
        var tipoIndicador = $("#tipoIndicador").val();
        var analista = $("#analista").val();
        var riesgoPadre = this.props.riesgoPadre;
        console.log('nombre');
        console.log(nombre);
        console.log('codigo');
        console.log(codigo);
        console.log('formula');
        console.log(formula);
        console.log('peso');
        console.log(peso);
        console.log('tolerancia');
        console.log(tolerancia);
        console.log('valorIdeal');
        console.log(valorIdeal);
        console.log('tipoValorIdeal');
        console.log(tipoValorIdeal);
        console.log('periodicidad');
        console.log(periodicidad);
        console.log('tipoIndicador');
        console.log(tipoIndicador);
        console.log('analista');
        console.log(analista);
        console.log('riesgoPadre');
        console.log(riesgoPadre);
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into Indicadores (nombre, codigo, formula, peso, tolerancia, valorIdeal, tipoValorIdeal, periodicidad, tipoIndicador, analista, idRiesgoPadre) values ('"+nombre+"', '"+codigo+"', '"+formula+"', "+peso+", "+tolerancia+", "+valorIdeal+", '"+tipoValorIdeal+"', '"+periodicidad+"', '"+tipoIndicador+"', '"+analista+"', "+riesgoPadre+")", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
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
                            <h2 className={"pageheader-title"}>Crear Indicador</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionIndicador}><a href="#" className={"breadcrumb-link"}>Seleccionar Riesgo</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Crear Indicador</li>
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
                                            <label htmlFor="nombreIndicador" className="col-form-label">Nombre Indicador</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <input id="nombreIndicador" type="text" className="form-control form-control-sm"/>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="codigo" className="col-form-label">Codigo</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <input id="codigo" type="text" className="form-control form-control-sm"/>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="peso" className="col-form-label">Peso</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <input id="peso" type="text" className="form-control form-control-sm"/>
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
                                            <label htmlFor="periodicidad" className="col-form-label">Periodicidad</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <input id="periodicidad" type="text" className="form-control form-control-sm"/>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="tipoIndicador" className="col-form-label">Tipo Indicador</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <select id="tipoIndicador" className="form-control">
                                                <option value="riesgoInherente">Riesgo Inherente</option>
                                                <option value="calidadGestion">Calidad de Gestión</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="analista" className="col-form-label">Nombre Encargado</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <input id="analista" type="text" className="form-control form-control-sm"/>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <a className={"btn btn-primary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.crearIndicador}>Guardar</a>
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
