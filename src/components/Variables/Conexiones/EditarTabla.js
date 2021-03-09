import React from 'react';
import sql from 'mssql';

import ErrorMessage from '../../ErrorMessage.js';

const campos = [ {nombre: "varchar"}, {nombre: "bit"}, {nombre: "date"}, {nombre: "int"} ];
let funciones = [ {funcion: "idCliente", texto: "ID de Cliente"}, {funcion: "fecha", texto: "fecha"}, {nombre: "date"}, {nombre: "int"} ];
const funcionesTablas = [{nombre: "Otro"}, {nombre: "Pagos de Préstamos"}, {nombre: "Plan de Pagos"}];

export default class EditarTabla extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tablas: [],
            errorCreacionTabla: {campo: "", descripcion: "", mostrar: false},
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: -1, indiceX: -1, indiceY: -1}
        }
        this.saveBitacora = this.saveBitacora.bind(this);
        this.updateTable = this.updateTable.bind(this);
        this.dismissTableNewError = this.dismissTableNewError.bind(this);
        this.modifyTableConfirmation = this.modifyTableConfirmation.bind(this);
    }

    saveBitacora (fecha, descripcion, tipoVariable, idVariable) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into Bitacora (usuarioID, nombreUsuario, fecha, descripcion, tipoVariable, idVariable) values ("+this.props.userID+", '"+this.props.userName+"', '"+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+"', '"+descripcion+"', '"+tipoVariable+"', "+idVariable+")", (err, result) => {
                if (err) {
                    console.log(err);
                    this.props.showMessage("Error", 'No se pudo guardar información de bitacora.', true, false, {});
                    if (!rolledBack) {
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

    updateTable() {
        let nombreTabla = $("#nombreTablaNuevo").val();
        let usuarioTabla = $("#usuarioTablaNuevo").val();
        let contrasenaTabla = $("#contrasenaTablaNuevo").val();
        let servidorTabla = $("#servidorTablaNuevo").val();
        let basedatosTabla = $("#basedatosTablaNuevo").val();
        let tablaTabla = $("#tablaTablaNuevo").val();
        let funcionTabla = $("#funcionTabla").val();
        let tipoConexion = $("#tipoConexion").val();
        if(nombreTabla.length > 0 && nombreTabla.length < 71) {
            if(usuarioTabla.length > 0 && usuarioTabla.length < 51) {
                if(contrasenaTabla.length > 0 && contrasenaTabla.length < 201) {
                    if(servidorTabla.length > 0 && servidorTabla.length < 51) {
                        if(basedatosTabla.length > 0 && basedatosTabla.length < 51) {
                            if(tablaTabla.length > 0 && tablaTabla.length < 71) {
                                if(tipoConexion.length > 0 && tipoConexion.length < 31) {
                                    this.setState({
                                        errorCreacionTabla: {campo: "", descripcion: "", mostrar: false}
                                    });
                                    const transaction = new sql.Transaction( this.props.pool );
                                    transaction.begin(err => {
                                        var rolledBack = false;
                                        transaction.on('rollback', aborted => {
                                            rolledBack = true;
                                        });
                                        const request = new sql.Request(transaction);
                                        request.query("update Tablas set Nombre = '"+nombreTabla+"', Usuario = '"+usuarioTabla+"', Contrasena = '"+contrasenaTabla+"', Servidor = '"+servidorTabla+"', BaseDatos = '"+basedatosTabla+"', Tabla = '"+tablaTabla+"', tipoConexion = '"+tipoConexion+"' where ID = "+this.props.idTablaSeleccionada, (err, result) => {
                                            if (err) {
                                                if (!rolledBack) {
                                                    console.log(err);
                                                    transaction.rollback(err => {
                                                    });
                                                }
                                            } else {
                                                transaction.commit(err => {
                                                    this.props.showSuccesMessage("Exito", "Tabla modificada con éxito.");
                                                    var nuevosValores = 'nombre: '+nombreTabla+'\n'+
                                                                        'usuario: '+usuarioTabla+'\n'+
                                                                        'servidor: '+servidorTabla+'\n'+
                                                                        'base de datos: '+basedatosTabla+'\n'+
                                                                        'tabla: '+tablaTabla+'\n'+
                                                                        'tipo de conexión: '+tipoConexion;
                                                    this.saveBitacora(new Date(), "Usuario: "+this.props.userName+" modifico la tabla: "+nombreTabla+"\nValores: \n"+nuevosValores, "tabla", this.props.idTablaSeleccionada);
                                                });
                                            }
                                        });
                                    }); // fin transaction
                                } else {
                                    let campo = "Tipo de Conexión";
                                    let descripcion;
                                    if(tipoConexion.length == 0)
                                        descripcion = "El campo debe tener una longitud mayor a 0.";
                                    else
                                        descripcion = "El campo debe tener una longitud menor a 31.";
                                    this.setState({
                                        errorCreacionTabla: {campo: campo, descripcion: descripcion, mostrar: true}
                                    });
                                }
                            } else {
                                let campo = "Nombre de la Tabla";
                                let descripcion;
                                if(tablaTabla.length == 0)
                                    descripcion = "El campo debe tener una longitud mayor a 0.";
                                else
                                    descripcion = "El campo debe tener una longitud menor a 71.";
                                this.setState({
                                    errorCreacionTabla: {campo: campo, descripcion: descripcion, mostrar: true}
                                });
                            }
                        } else {
                            let campo = "Base de Datos de la Tabla";
                            let descripcion;
                            if(basedatosTabla.length == 0)
                                descripcion = "El campo debe tener una longitud mayor a 0.";
                            else
                                descripcion = "El campo debe tener una longitud menor a 51.";
                            this.setState({
                                errorCreacionTabla: {campo: campo, descripcion: descripcion, mostrar: true}
                            });
                        }
                    } else {
                        let campo = "Servidor de la Tabla";
                        let descripcion;
                        if(servidorTabla.length == 0)
                            descripcion = "El campo debe tener una longitud mayor a 0.";
                        else
                            descripcion = "El campo debe tener una longitud menor a 51.";
                        this.setState({
                            errorCreacionTabla: {campo: campo, descripcion: descripcion, mostrar: true}
                        });
                    }
                } else {
                    let campo = "Contraseña de la Tabla";
                    let descripcion;
                    if(contrasenaTabla.length == 0)
                        descripcion = "El campo debe tener una longitud mayor a 0.";
                    else
                        descripcion = "El campo debe tener una longitud menor a 201.";
                    this.setState({
                        errorCreacionTabla: {campo: campo, descripcion: descripcion, mostrar: true}
                    });
                }
            } else {
                let campo = "Usuario de la Tabla";
                let descripcion;
                if(usuarioTabla.length == 0)
                    descripcion = "El campo debe tener una longitud mayor a 0.";
                else
                    descripcion = "El campo debe tener una longitud menor a 51.";
                this.setState({
                    errorCreacionTabla: {campo: campo, descripcion: descripcion, mostrar: true}
                });
            }
        } else {
            let campo = "Nombre de la Conección";
            let descripcion;
            if(nombreTabla.length == 0)
                descripcion = "El campo debe tener una longitud mayor a 0.";
            else
                descripcion = "El campo debe tener una longitud menor a 71.";
            this.setState({
                errorCreacionTabla: {campo: campo, descripcion: descripcion, mostrar: true}
            });
        }
    }


    /*======_______====== ======_______======   MENSAJES ERROR DE CAMPOS    ======_______====== ======_______======*/
    /*======_______======                                                                       ======_______======*/
    /*======_______======                                                                       ======_______======*/
    /*======_______====== ======_______====== ====_____====  ====_____====  ======_______====== ======_______======*/

    dismissTableNewError() {
        this.setState({
            errorCreacionTabla: {campo: "", descripcion: "", mostrar: false}
        });
    }

    modifyTableConfirmation() {
        this.props.showMessage("Confirmación", "Esta seguro que desea modificar la tabla?", false, true, this.updateTable );
    }

    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Configuraci&oacute;n de Conexiones a las Tablas</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goOptions}><a href="#" className={"breadcrumb-link"}>Tipo de Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionTabla}><a href="#" className={"breadcrumb-link"}>Tablas</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Editar Tabla</li>
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
                                <h3>Crear Nueva Tabla</h3>
                                <div className={"row border-top"}>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Nombre de la Conecci&oacute;n</label>
                                        <input id="nombreTablaNuevo" defaultValue={this.props.nombreTablaSeleccionada} type="text" className={"form-control"}/>
                                    </div>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Usuario de la Tabla</label>
                                        <input id="usuarioTablaNuevo" defaultValue={this.props.usuarioTablaSeleccionada} type="text" className={"form-control"}/>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Contrase&ntilde;a de la Tabla</label>
                                        <input id="contrasenaTablaNuevo" defaultValue={this.props.contrasenaTablaSeleccionada} type="text" className={"form-control"}/>
                                    </div>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Servidor de la Tabla</label>
                                        <input id="servidorTablaNuevo" defaultValue={this.props.servidorTablaSeleccionada} type="text" className={"form-control"}/>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Base de Datos de la Tabla</label>
                                        <input id="basedatosTablaNuevo" defaultValue={this.props.baseDatosTablaSeleccionada} type="text" className={"form-control"}/>
                                    </div>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Nombre de la Tabla</label>
                                        <input id="tablaTablaNuevo" defaultValue={this.props.tablaTablaSeleccionada} type="text" className={"form-control"}/>
                                    </div>
                                </div>
                                <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <select id="tipoConexion" defaultValue={this.props.tipoConexion} className="form-control">
                                        <option value="sql">Transact-SQL</option>
                                    </select>
                                </div>
                                { this.state.errorCreacionTabla.mostrar ? (
                                    <ErrorMessage campo={this.state.errorCreacionTabla.campo} descripcion={this.state.errorCreacionTabla.descripcion} dismissTableError={this.dismissTableNewError}> </ErrorMessage>
                                ) : (
                                    <span></span>
                                )}
                                <br/>
                                <div className={"row"}>
                                    <button onClick={this.updateTable} className={"btn btn-success btn-block col-xl-10 col-10 font-bold font-20"} style={{margin: "0 auto", display: "block"}}>Guardas Cambios</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}
