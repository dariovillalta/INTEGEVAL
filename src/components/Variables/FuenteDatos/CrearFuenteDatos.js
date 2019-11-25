import React from 'react';
import sql from 'mssql';

const tipoCampos = [ {nombre: "texto"}, {nombre: "booleano"}, {nombre: "fecha"}, {nombre: "número"}];
import ListasSeleVariable from '../../ListasSeleVariable.js';

var nombreCampoSeleccionado = '';

export default class CrearFuenteDatos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreColumnas: []
        }
        this.crearFuenteDato = this.crearFuenteDato.bind(this);
        this.retornoSeleccionVariable = this.retornoSeleccionVariable.bind(this);
    }

    componentDidMount () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '"+this.props.nombreTablaSeleccionada+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var nombreColumnas = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            nombreColumnas.push({nombre: result.recordset[i].COLUMN_NAME});
                        };
                        this.setState({
                            nombreColumnas: nombreColumnas
                        });
                    });
                }
            });
        }); // fin transaction
    }

    crearFuenteDato () {
        var nombre = $("#nombreFuenteDato").val();
        var tipo = $("#tipoFuenteDato").val();
        var guardar;
        if ($("#guardarFuenteDato").is(':checked'))
            guardar = true;
        else
            guardar = false;
        var formula = nombreCampoSeleccionado;
        var nivel = 0;
        console.log('this.props.idTablaSeleccionada');
        console.log(this.props.idTablaSeleccionada);
        console.log('nombre');
        console.log(nombre);
        console.log('tipo');
        console.log(tipo);
        console.log('guardar');
        console.log(guardar);
        console.log('formula');
        console.log(formula);
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into Campos (tablaID, nombre, tipo, guardar, formula, nivel) values ("+this.props.idTablaSeleccionada+", '"+nombre+"', '"+tipo+"', '"+guardar+"', '"+formula+"', "+nivel+")", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.props.terminoCrearCampo(nombre);
                    });
                }
            });
        }); // fin transaction
    }

    retornoSeleccionVariable (variable) {
        nombreCampoSeleccionado = '';
        if(variable[0].nombre.length > 0) {
            nombreCampoSeleccionado = variable[0].nombre;
        }
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
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Crear Fuente de Datos</li>
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
                                            <label htmlFor="nombreFuenteDato" className="col-form-label">Nombre Fuente de Dato</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <input id="nombreFuenteDato" type="text" className="form-control form-control-sm"/>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="tipoFuenteDato" className="col-form-label">Tipo de Variable</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <select id="tipoFuenteDato" className="form-control">
                                                {tipoCampos.map((tipo, i) =>
                                                    <option value={tipo.nombre} key={tipo.nombre}>{tipo.nombre}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="guardarFuenteDato" className="col-form-label">Guardar Fuente de Dato en Base de Datos</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <div className={"switch-button switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                                                <input type="checkbox" defaultChecked name={"guardarFuenteDato"} id={"guardarFuenteDato"}/><span>
                                                <label htmlFor={"guardarFuenteDato"}></label></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%", height: "150px"}}>
                                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                            <label htmlFor="listas" className="col-form-label">Columna de tabla</label>
                                        </div>
                                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                            <ListasSeleVariable mostrarRosa={true} variables={this.state.nombreColumnas} seleccionarMultiple={false} retornoSeleccion={this.retornoSeleccionVariable} titulo={"Columnas"}></ListasSeleVariable>
                                        </div>
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
