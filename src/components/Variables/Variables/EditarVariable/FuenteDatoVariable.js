import React from 'react';
import sql from 'mssql';

import FuenteDatoVariableAtributos from './FuenteDatoVariableAtributos.js';

/*COMPONENTE CONTENEDOR PADRE / ORIGINAL DE PROCESO CREAR VARIABLE ESTILO VARIABLE*/

//var fuenteDatoAtributo = {};
/*var columnaSeleccionada = {}, operacionSeleccionada = {};
const operaciones = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}];
const operacionesNumero = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}, {valor: "Calcular Promedio"}, {valor: "Máximo"}, {valor: "Mínimo"}, {valor: "Sumar"}];
const operacionesFecha = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}];
const operacionesBoolean = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}];
const operacionesCadena = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}, {valor: "Sumar"}];*/

var mostrarEsObjetoGlobal = true;
var mostrarInstruccionSQLGlobal = true;
var tituloGlobal = "Instrucción SQL";

const periodicidad = [ {nombre: "diario"}, {nombre: "semanal"}, {nombre: "mensual"}, {nombre: "trimestral"}, {nombre: "bi-anual"}, {nombre: "anual"} ];

export default class FuenteDatoVariable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarEsObjeto: mostrarEsObjetoGlobal,
            titulo: tituloGlobal,
            mostrarInstruccionSQL: mostrarInstruccionSQLGlobal,
            valorPeriodicidad: "-1"
        }
        this.cambioInstruccionSQL = this.cambioInstruccionSQL.bind(this);
        this.cambioAObjeto = this.cambioAObjeto.bind(this);
        this.cambiarTitulo = this.cambiarTitulo.bind(this);
        this.actualizarPeriodicidad = this.actualizarPeriodicidad.bind(this);
        this.cargarDatePicker = this.cargarDatePicker.bind(this);
    }

    componentDidMount () {
        $('#fecha').datepicker({
            format: "dd-mm-yyyy",
            todayHighlight: true,
            viewMode: "days", 
            minViewMode: "days",
            language: 'es'
        });
        $("#fecha").datepicker("setDate", this.props.fechaInicioVariable);
        var self = this;
        $('#fecha').datepicker().on('changeDate', function () {
            var fecha = $("#fecha").datepicker('getDate');
            self.props.actualizarFechaInicio(fecha);
        });
        if(this.props.tipoVariableOriginal.localeCompare("variable") == 0) {
            const transaction = new sql.Transaction( this.props.pool );
            transaction.begin(err => {
                var rolledBack = false;
                transaction.on('rollback', aborted => {
                    rolledBack = true;
                });
                const request = new sql.Request(transaction);
                request.query("select * from Variables where ID = "+this.props.idVariable, (err, result) => {
                    if (err) {
                        console.log(err);
                        if (!rolledBack) {
                            transaction.rollback(err => {
                            });
                        }
                    } else {
                        transaction.commit(err => {
                            if(result.recordset.length > 0) {
                                var titulo = "Instrucción SQL";
                                if(!result.recordset[0].esInstruccionSQL) {
                                    if(result.recordset[0].esObjeto)
                                        titulo = "Valores Multiples";
                                    else
                                        titulo = "Valor Único";
                                }
                                this.setState({
                                    titulo: titulo,
                                    mostrarEsObjeto: result.recordset[0].esObjeto,
                                    mostrarInstruccionSQL: result.recordset[0].esInstruccionSQL,
                                    valorPeriodicidad: result.recordset[0].periodicidad
                                });
                            }
                        });
                    }
                });
            }); // fin transaction
        }
    }

    cambioInstruccionSQL () {
        mostrarInstruccionSQLGlobal = !this.state.mostrarInstruccionSQL;
        mostrarEsObjetoGlobal = true;
        this.setState({
            mostrarInstruccionSQL: !this.state.mostrarInstruccionSQL,
            mostrarEsObjeto: true
        }, this.cambiarTitulo);
    }

    cambioAObjeto () {
        mostrarEsObjetoGlobal = !this.state.mostrarEsObjeto;
        this.setState({
            mostrarEsObjeto: !this.state.mostrarEsObjeto,
            tipoVariable: ''
        }, this.cambiarTitulo );
    }

    cambiarTitulo () {
        this.props.cambioDeArreglosDeAtributos();
        if(this.state.mostrarInstruccionSQL) {
            tituloGlobal = "Instrucción SQL";
            this.setState({
                titulo: "Instrucción SQL"
            });
        } else if(this.state.mostrarEsObjeto) {
            tituloGlobal = "Valores Multiples";
            this.setState({
                titulo: "Valores Multiples"
            });
        } else  {
            tituloGlobal = "Valor Único";
            this.setState({
                titulo: "Valor Único"
            });
        }
        this.props.actualizarEstadoSiEsObjeto(this.state.mostrarEsObjeto);
        this.props.actualizarEstadoSiEsInstruccionSQL(this.state.mostrarInstruccionSQL);
    }

    actualizarPeriodicidad () {
        var periodicidad = $("#periodicidad").val();
        this.setState({
            valorPeriodicidad: periodicidad
        }, this.cargarDatePicker )
        this.props.actualizarPeriodicidad();
    }

    cargarDatePicker () {
        $('#fecha').datepicker({
            format: "dd-mm-yyyy",
            todayHighlight: true,
            viewMode: "days", 
            minViewMode: "days",
            language: 'es'
        });
        $("#fecha").datepicker("setDate", this.props.fechaInicioVariable);
        var self = this;
        $('#fecha').datepicker().on('changeDate', function () {
            var fecha = $("#fecha").datepicker('getDate');
            self.props.actualizarFechaInicio(fecha);
        });
    }

    render() {
        return (
            <div>
                <br/>
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                        <label htmlFor="nombreFuenteDato" className="col-form-label">Nombre de Variable</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <input id="nombreFuenteDato" defaultValue={this.props.nombreVariable} onKeyUp={this.props.actualizarNombreVariable} type="text" className="form-control form-control-sm"/>
                    </div>
                </div>
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                        <label htmlFor="descripcionFuenteDato" className="col-form-label">Descripción de Variable:</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"}>
                        <textarea defaultValue={this.props.descripcionVariable} onKeyUp={this.props.actualizarDescripcionVariable} className="form-control" id="descripcionFuenteDato" rows="3"></textarea>
                    </div>
                </div>
                <br/>
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                        <label htmlFor="esInstruccionSQL" className="col-form-label">Tipo de Cálculo:</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                        <br/>
                        <div className={"switch-button-sql switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                            <input type="checkbox" defaultChecked={this.state.mostrarInstruccionSQL} name={"esInstruccionSQL"} id={"esInstruccionSQL"} onClick={this.cambioInstruccionSQL}/><span>
                            <label htmlFor={"esInstruccionSQL"}></label></span>
                        </div>
                    </div>
                </div>
                {!this.state.mostrarInstruccionSQL
                    ?
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor="esObjetoFuenteDato" className="col-form-label">Tiene más de un campo:</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                <br/>
                                <div className={"switch-button-variable switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                                    <input type="checkbox" defaultChecked={this.state.mostrarEsObjeto} name={"esObjetoFuenteDato"} id={"esObjetoFuenteDato"} onClick={this.cambioAObjeto}/><span>
                                    <label htmlFor={"esObjetoFuenteDato"}></label></span>
                                </div>
                            </div>
                        </div>
                    : null
                }
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                        <label htmlFor="periodicidad" className="col-form-label">Periodicidad</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                        <select id="periodicidad" defaultValue={this.props.periodicidadVariable} onChange={this.actualizarPeriodicidad} className="form-control">
                            <option value="-1">Ninguno</option>
                            {periodicidad.map((periodicidad, i) =>
                                <option value={periodicidad.nombre} key={periodicidad.nombre}>{periodicidad.nombre}</option>
                            )}
                        </select>
                    </div>
                </div>
                {this.state.valorPeriodicidad.localeCompare("-1") != 0
                    ?
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor="esObjetoFuenteDato" className="col-form-label">Fecha de Inicio de Cálculo:</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                <input type="text" className="form-control" id="fecha"/>
                            </div>
                        </div>
                    : null
                }
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                        <label htmlFor="analista" className="col-form-label">Nombre Encargado</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                        <input id="analista" defaultValue={this.props.analistaVariable} onKeyUp={this.props.actualizarNombreEncargado} type="text" className="form-control form-control-sm"/>
                    </div>
                </div>
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                        <label htmlFor="guardarFuenteDato" className="col-form-label">Guardar Valores Obtenidos en Base de Datos:</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                        <br/>
                        <div className={"switch-button switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                            <input type="checkbox" defaultChecked name={"guardarFuenteDato"} id={"guardarFuenteDato"}/><span>
                            <label htmlFor={"guardarFuenteDato"}></label></span>
                        </div>
                    </div>
                </div>
                <div className={"row"} style={{width: "100%", display: this.state.mostrarEsObjeto ? "" : "none"}}>
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
                    <FuenteDatoVariableAtributos atributos={this.props.atributos}
                                                        titulo={this.state.titulo}
                                                        mostrarInstruccionSQL={this.state.mostrarInstruccionSQL}
                                                        nombreCampoNuevoAtributosVario={this.props.nombreCampoNuevoAtributosVario}
                                                        tipoNuevaVariable={this.props.tipoNuevaVariable}
                                                        actualizarNombreCampoNuevoAtributosVario={this.props.actualizarNombreCampoNuevoAtributosVario}
                                                        crearAtributoVariable={this.props.crearAtributoVariable}
                                                        mostrarEsObjeto={this.state.mostrarEsObjeto}
                                                        goToCreateConditions={this.props.goToCreateConditions}
                                                        goCreateVariableFieldSQL={this.props.goCreateVariableFieldSQL}>
                    </FuenteDatoVariableAtributos>
                </div>
                <br/>
                <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <a href="#" className="btn btn-brand active" onClick={this.props.guardarVariable}>Modificar Variable</a>
                    {
                        this.props.tipoVariableOriginal.localeCompare("variable") == 0
                        ? <a href="#" className="btn btn-secondary active" style={{marginLeft: "10px"}} onClick={this.props.eliminarVariable}>Eliminar Variable</a>
                        : null
                    }
                    {
                        this.props.tipoVariableOriginal.localeCompare("variable") == 0
                        ? <a href="#" className="btn btn-primary active" style={{marginLeft: "10px"}} onClick={this.calculoVariable}>Realizar Cálculo</a>
                        : null
                    }
                </div>
                <br/>
            </div>
        );
    }
}
