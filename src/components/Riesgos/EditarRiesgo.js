import React from 'react';
import sql from 'mssql';
import Slider from 'react-input-slider';

import Umbral from '../Umbral/Umbral.js';

const tipoCampos = [ {nombre: "texto"}, {nombre: "booleano"}, {nombre: "fecha"}, {nombre: "número"}, {nombre: "arreglo"}];
var peso = 0, nombre = '', formula = '', nombreEncargadoRiesgo = '', primeraVezCargado = true;

export default class EditarRiesgo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: peso,
            componentActual: "EditarRiesgo",
            navbar: "",
            usuarios: []
        }
        this.goCrearUmbral = this.goCrearUmbral.bind(this);
        this.retornarEditRiesgo = this.retornarEditRiesgo.bind(this);
        this.guardarRiesgo = this.guardarRiesgo.bind(this);
        this.tieneEspaciosEnBlanco = this.tieneEspaciosEnBlanco.bind(this);
        this.updateNombreRiesgo = this.updateNombreRiesgo.bind(this);
        this.updateFormulaRiesgo = this.updateFormulaRiesgo.bind(this);
        this.updateNombreEncargadoRiesgo = this.updateNombreEncargadoRiesgo.bind(this);
    }

    componentDidMount() {
        if(primeraVezCargado) {
            nombre = this.props.nombreRiesgo;
            peso = this.props.pesoRiesgo;
            this.setState({
                x: peso
            });
            formula = this.props.formulaRiesgo;
            nombreEncargadoRiesgo = this.props.responsableRiesgo;
            $("#nombreRiesgo").val(nombre);
            $("#formula").val(formula);
            primeraVezCargado = false;
            this.getUsuarios();
        }
    }

    componentWillUnmount() {
        peso = 0;
        nombre = '';
        formula = '';
        nombreEncargadoRiesgo = '';
        primeraVezCargado = true;
    }

    getUsuarios () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Usuarios", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            usuarios: result.recordset
                        });
                        $("#responsable").val(nombreEncargadoRiesgo);
                    });
                }
            });
        }); // fin transaction
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
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionRiesgo}><a href="#" className={"breadcrumb-link"}>Riesgos</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.retornarEditRiesgo}><a href="#" className={"breadcrumb-link"}>Editar Riesgo</a></li>
                                <li className={"breadcrumb-item active font-16"} aria-current="page">Umbrales</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>;
        this.setState({
            navbar: navbar,
            componentActual: "EditarUmbral"
        });
    }

    retornarEditRiesgo () {
        this.setState({
            componentActual: "EditarRiesgo"
        });
    }

    guardarRiesgo () {
        var nombre = $("#nombreRiesgo").val();
        var formula = $("#formula").val();
        var responsable = $("#responsable").val();
        var peso = this.state.x;
        if(nombre.length > 0 && nombre.length < 101) {
            if(!this.tieneEspaciosEnBlanco(nombre)) {
                if(formula.length > 0 && formula.length < 501) {
                    if(responsable.length > 0) {
                        if( !isNaN(parseInt(peso)) ) {

                            const transaction = new sql.Transaction( this.props.pool );
                            transaction.begin(err => {
                                var rolledBack = false;
                                transaction.on('rollback', aborted => {
                                    rolledBack = true;
                                });
                                const request = new sql.Request(transaction);
                                request.query("update Riesgos set nombre = '"+nombre+"', peso = "+peso+", formula = '"+formula+"', responsable = '"+responsable+"' where ID = "+this.props.idRiesgoSeleccionado, (err, result) => {
                                    if (err) {
                                        console.log(err);
                                        if (!rolledBack) {
                                            transaction.rollback(err => {
                                            });
                                        }
                                    } else {
                                        transaction.commit(err => {
                                            alert("Riesgo Modificado.");
                                            this.props.getRiesgos();
                                            this.props.editarRiesgo(this.props.idRiesgoSeleccionado, nombre, peso, formula);
                                        });
                                    }
                                });
                            }); // fin transaction

                        } else {
                            alert("el peso del riesgo debe ser un numero valido");
                        }
                    } else {
                        alert("Ingrese un valor para el responsable.");
                    }
                } else {
                    alert("la formula del riesgo debe tener una longitud mayor a 0 y menor a 501");
                }
            } else {
                alert('El nombre del riesgo no debe contener espacios en blanco');
            }
        } else {
            alert("el nombre del riesgo debe tener una longitud mayor a 0 y menor a 101");
        }
    }

    tieneEspaciosEnBlanco (s) {
        return /\s/g.test(s);
    }

    updateNombreRiesgo() {
        nombre = $("#nombreRiesgo").val();
    }

    updateFormulaRiesgo() {
        formula = $("#formula").val();
    }

    updateNombreEncargadoRiesgo() {
        nombreEncargadoRiesgo = $("#responsable").val();
    }

    render() {
        if(this.state.componentActual.localeCompare("EditarRiesgo") == 0) {
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
                                            <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionRiesgo}><a href="#" className={"breadcrumb-link"}>Riesgos</a></li>
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
                                                <input id="nombreRiesgo" type="text" defaultValue={nombre} onKeyUp={this.updateNombreRiesgo} className="form-control form-control-sm"/>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="formula" className="col-form-label">Tipo de Indicador</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <select id="formula" defaultValue={formula} className="form-control">
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
                                                    onChange={({ x }) => {
                                                        this.setState({ x: x });
                                                        peso = x;
                                                    }}
                                                    style={{width: "100%", marginTop: "10px"}}/>
                                            </div>
                                            <div className={"col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 form-group"}>
                                                <label id="pesoLabel" className="col-form-label">{this.state.x}</label>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="responsable" className="col-form-label">Nombre Encargado</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <select id="responsable" defaultValue={nombreEncargadoRiesgo} onChange={this.updateNombreEncargadoRiesgo} className="form-control">
                                                    <option value="-1">Ninguno</option>
                                                    {this.state.usuarios.map((usuario, i) =>
                                                        <option value={usuario.ID} key={usuario.ID}>{usuario.usuario}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <a className={"btn btn-brand btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.goCrearUmbral}>Umbrales</a>
                                        <br/>
                                        <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <a className={"btn btn-primary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.guardarRiesgo}>Modificar</a>
                                        </div>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if(this.state.componentActual.localeCompare("EditarUmbral") == 0) {
            return (
                <div>
                    <Umbral navbar={this.state.navbar} idVariable={this.props.idRiesgoSeleccionado} pool={this.props.pool}
                                                        lista={[]}
                                                        tablaVariable={"Riesgo"}
                                                        tituloUmbral={"Riesgo: "+this.props.nombreRiesgo}> </Umbral>
                </div>
            );
        }
    }
}
