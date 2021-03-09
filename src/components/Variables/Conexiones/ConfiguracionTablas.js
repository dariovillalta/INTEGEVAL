import React from 'react';
import sql from 'mssql';

import ErrorMessage from '../../ErrorMessage.js';

const campos = [ {nombre: "varchar"}, {nombre: "bit"}, {nombre: "date"}, {nombre: "int"} ];
let funciones = [ {funcion: "idCliente", texto: "ID de Cliente"}, {funcion: "fecha", texto: "fecha"}, {nombre: "date"}, {nombre: "int"} ];
const funcionesTablas = [{nombre: "Otro"}, {nombre: "Pagos de Préstamos"}, {nombre: "Plan de Pagos"}];

export default class ConfiguracionTablas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tablas: [],
            errorCreacionTabla: {campo: "", descripcion: "", mostrar: false},
            idTablaSel: -1
        }
        this.saveBitacora = this.saveBitacora.bind(this);
        this.loadTables = this.loadTables.bind(this);
        this.insertTable = this.insertTable.bind(this);
        this.deleteTableConfirmation = this.deleteTableConfirmation.bind(this);
        this.deleteTable = this.deleteTable.bind(this);
        this.dismissTableNewError = this.dismissTableNewError.bind(this);
    }
    /* mensajeModal <- de state
        //mostrarMensaje:bandera para mostrar modal mensaje en pantalla
        //mensajeConfirmado:retorno del modal mensaje si fue conf
        //esError:bandera para ver que tipo de modal mensaje mostrar
        //esConfirmar:bandera para ver que tipo de modal mensaje mostrar
        //titulo:titulo del modal
        //mensaje:mensaje del modal
        //banderaMetodoInit:variable para ver a que metodo ir cuando regresa de confirmar el modal
        //idElementoSelec:id del elemento que mostro el modal mensaje
        //indiceX:posicion de la tabla en el arreglo que mostro el modal mensaje
        //indiceY:posicion del campo en el arreglo de tablas que mostro el modal mensaje
    */

    componentDidMount() {
        this.loadTables();
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

    loadTables() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Tablas", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            tablas: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    insertTable() {
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
                                        request.query("insert into Tablas (Nombre, Usuario, Contrasena, Servidor, BaseDatos, Tabla, tipoConexion) values ('"+nombreTabla+"','"+usuarioTabla+"','"+contrasenaTabla+"','"+servidorTabla+"','"+basedatosTabla+"','"+tablaTabla+"','"+tipoConexion+"')", (err, result) => {
                                            if (err) {
                                                if (!rolledBack) {
                                                    console.log(err);
                                                    transaction.rollback(err => {
                                                    });
                                                }
                                            } else {
                                                transaction.commit(err => {
                                                    this.props.showSuccesMessage("Exito", "Tabla creada con éxito.");
                                                    this.loadTables();
                                                    
                                                    const transaction1 = new sql.Transaction( this.props.pool );
                                                    transaction1.begin(err => {
                                                        var rolledBack = false;
                                                        transaction1.on('rollback', aborted => {
                                                            rolledBack = true;
                                                        });
                                                        const request1 = new sql.Request(transaction1);
                                                        request1.query("select top 1 * from Tablas order by ID desc", (err, result) => {
                                                            if (err) {
                                                                if (!rolledBack) {
                                                                    console.log(err);
                                                                    transaction1.rollback(err => {
                                                                    });
                                                                }
                                                            } else {
                                                                transaction1.commit(err => {
                                                                    if(result.recordset.length > 0) {
                                                                        var nuevosValores = 'nombre: '+nombreTabla+'\n'+
                                                                                            'usuario: '+usuarioTabla+'\n'+
                                                                                            'servidor: '+servidorTabla+'\n'+
                                                                                            'base de datos: '+basedatosTabla+'\n'+
                                                                                            'tabla: '+tablaTabla+'\n'+
                                                                                            'tipo de conexión: '+tipoConexion;
                                                                        this.saveBitacora(new Date(), "Usuario: "+this.props.userName+" creo la tabla: "+nombreTabla+"\nValores: \n"+nuevosValores, "tabla", result.recordset[0].ID);
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }); // fin transaction1
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
            let campo = "Nombre de la Conexión";
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

    deleteTableConfirmation(id) {
        this.props.showMessage("Confirmación", "Esta seguro que desea eliminar la tabla?", false, true, this.deleteTable );
        this.setState({
            idTablaSel: id
        });
    }

    deleteTable(id) {
        if(this.state.idTablaSel != -1) {
            const transaction = new sql.Transaction( this.props.pool );
            transaction.begin(err => {
                var rolledBack = false;
                transaction.on('rollback', aborted => {
                    rolledBack = true;
                });
                const request = new sql.Request(transaction);
                request.query("delete from Tablas where ID = "+this.state.idTablaSel, (err, result) => {
                    if (err) {
                        if (!rolledBack) {
                            console.log(err);
                            transaction.rollback(err => {
                            });
                        }
                    } else {
                        transaction.commit(err => {
                            // 1. Make a shallow copy of the items
                            /*let tablas = [...this.state.tablas];
                            // 3. Replace the property you're intested in
                            tablas.splice(this.state.mensajeModal.indiceX, 1);*/
                            // 5. Set the state to our new copy
                            this.loadTables();
                            this.props.showSuccesMessage("Exito", "Tabla eliminada con éxito.");
                            this.saveBitacora(new Date(), "Usuario: "+this.props.userName+" elimino la tabla: "+nombreTabla, "tabla", result.recordset[0].ID);
                        });
                    }
                });
            }); // fin transaction
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
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Tablas</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h2>Descripción</h2>
                    <p className="lead">
                        Esta sección consiste en administrar las configuraciones necesarias para que el programa pueda conectarse con las tablas internas, para seleccionar los campos bases de los cuales se crearán las variables y consecuentemente los cálculos de indicadores y riesgos.
                    </p>
                    <ul className="list-unstyled arrow">
                        <li>Nombre de la Conecci&oacute;n: Nombre de referencia dentro del programa para refererse a la tabla de la institución</li>
                        <li>Usuario de la Tabla: Usuario para acceder a la base de Datos</li>
                        <li>Contrase&ntilde;a de la Tabla: Contraseña para acceder a la base de Datos</li>
                        <li>Servidor de la Tabla: Servidor donde se encuentra la base de Datos</li>
                        <li>Base de Datos de la Tabla: Nombre de la base de Datos donde se encuentra la tabla</li>
                        <li>Nombre de la Tabla: Nombre de la tabla a acceder a la base de Datos</li>
                        <li>Tipo de Conexi&oacute;n: Tipo de conexión de la base de datos</li>
                    </ul>
                </div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>
                                <h3>Crear Nueva Tabla</h3>
                                <div className={"row border-top"}>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Nombre de la Conecci&oacute;n</label>
                                        <input id="nombreTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Usuario de la Tabla</label>
                                        <input id="usuarioTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Contrase&ntilde;a de la Tabla</label>
                                        <input id="contrasenaTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Servidor de la Tabla</label>
                                        <input id="servidorTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Base de Datos de la Tabla</label>
                                        <input id="basedatosTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Nombre de la Tabla</label>
                                        <input id="tablaTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                </div>
                                <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <select id="tipoConexion" className="form-control">
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
                                    <button onClick={this.insertTable} className={"btn btn-success btn-block col-xl-10 col-10 font-bold font-20"} style={{margin: "0 auto", display: "block"}}>Crear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.tablas.map((tabla, i) => (
                    <div key={tabla.ID} className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <div className="card-header bg-primary p-3" style={{width: "100%"}}>
                                <h4 className="mb-0 text-white" style={{display: "inline"}}> {tabla.nombre} </h4>
                                <div style={{float: "right", border: "2px solid #000", cursor: "pointer"}}>
                                    <img onClick={() => this.deleteTableConfirmation(tabla.ID, i)} src={"../assets/trash.png"} style={{height: "20px", width: "20px"}}></img>
                                </div>
                                <div style={{float: "right", border: "2px solid #000", marginRight: "10px", cursor: "pointer"}}>
                                    <img onClick={() => this.props.terminoSeleccionTabla(tabla.ID, tabla.tabla, tabla.usuario, tabla.contrasena, tabla.servidor, tabla.baseDatos, tabla.tabla, tabla.tipoConexion)} src={"../assets/edit.png"} style={{height: "20px", width: "20px"}}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <br/>
            </div>
        );
    }
}
