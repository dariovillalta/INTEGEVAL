import React from 'react';
import sql from 'mssql';

import Modal from '../Modal/Modal.js';
import MessageModal from '../MessageModal.js';

export default class MantenimientoUsuarios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            mostrarModal: false,
            tituloModal: "",
            idUsuarioSeleccionado: -1,
            posUsuarioSeleccionado: -1,
            nombreUsuarioSeleccionado: "",
            usuarioUsuarioSeleccionado: "",
            contrasenaUsuarioSeleccionado: "",
            permisosUsuarios: [],
            permisoSeleccionado: null,
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: ""}
        }
        this.loadUsuarios = this.loadUsuarios.bind(this);
        this.loadPermisos = this.loadPermisos.bind(this);
        this.insertarUsuario = this.insertarUsuario.bind(this);
        this.getUsuarioID = this.getUsuarioID.bind(this);
        this.insertarPermisos = this.insertarPermisos.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.saveBitacora = this.saveBitacora.bind(this);
        this.deleteUserConfirmation = this.deleteUserConfirmation.bind(this);
        this.modifyUserConfirmation = this.modifyUserConfirmation.bind(this);
    }

    componentDidMount() {
        this.loadUsuarios();
    }

    loadUsuarios() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Usuarios", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            usuarios: result.recordset
                        });
                        var arreglo = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            this.loadPermisos(result.recordset[i].ID, i, arreglo);
                        };
                    });
                }
            });
        }); // fin transaction
    }

    loadPermisos(idUsuario, posicionUsuario, arreglo) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from PermisosUsuarios where usuarioID = "+idUsuario, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            arreglo[posicionUsuario] = result.recordset[0];
                            this.setState({
                                permisosUsuarios: arreglo
                            });
                        }
                    });
                }
            });
        }); // fin transaction
    }

    insertarUsuario() {
        var nombreCompleto = $("#nombreCompleto").val();
        var usuario = $("#usuario").val();
        var contrasena = $("#contrasena").val();
        if(nombreCompleto.length > 0 && nombreCompleto.length < 101) {
            if(usuario.length > 0 && usuario.length < 26) {
                if(contrasena.length > 0 && contrasena.length < 51) {

                    const transaction = new sql.Transaction( this.props.pool );
                    transaction.begin(err => {
                        var rolledBack = false;
                        transaction.on('rollback', aborted => {
                            rolledBack = true;
                        });
                        const request = new sql.Request(transaction);
                        request.query("select * from Usuarios where usuario = '"+ usuario +"'", (err, result) => {
                            if (err) {
                                if (!rolledBack) {
                                    console.log(err);
                                    this.props.showMessage("Error", "Error al buscar nombre de usuario.", true, false, {});
                                    transaction.rollback(err => {
                                    });
                                }
                            } else {
                                transaction.commit(err => {
                                    if(result.recordset.length == 0 ) {
                                        
                                        const transaction = new sql.Transaction( this.props.pool );
                                        transaction.begin(err => {
                                            var rolledBack = false;
                                            transaction.on('rollback', aborted => {
                                                rolledBack = true;
                                            });
                                            const request = new sql.Request(transaction);
                                            request.query("insert into Usuarios (nombreCompleto, usuario, contrasena) values ('"+nombreCompleto+"','"+usuario+"','"+contrasena+"')", (err, result) => {
                                                if (err) {
                                                    if (!rolledBack) {
                                                        console.log(err);
                                                        this.props.showMessage("Error", "Error al crear usuario.", true, false, {});
                                                        transaction.rollback(err => {
                                                        });
                                                    }
                                                } else {
                                                    transaction.commit(err => {
                                                        var permisosVariable = '', permisosIndicador = '', permisosRiesgo = '', permisosRiesgoIntegral = '', permisosUsuario = '', permisosLista = '', permisosAlarma = '';
                                                        if ($("#variableCalculo").is(':checked')) {
                                                            permisosVariable += 'C';
                                                        }
                                                        if ($("#indicadorCalculo").is(':checked')) {
                                                            permisosIndicador += 'C';
                                                        }
                                                        if ($("#riesgoCalculo").is(':checked')) {
                                                            permisosRiesgo += 'C';
                                                        }
                                                        if ($("#riesgoIntegralCalculo").is(':checked')) {
                                                            permisosRiesgoIntegral += 'C';
                                                        }

                                                        if ($("#variableVer").is(':checked')) {
                                                            if(permisosVariable.length > 0)
                                                                permisosVariable += '/';
                                                            permisosVariable += 'V';
                                                        }
                                                        if ($("#indicadorVer").is(':checked')) {
                                                            if(permisosIndicador.length > 0)
                                                                permisosIndicador+= '/';
                                                            permisosIndicador += 'V';
                                                        }
                                                        if ($("#riesgoVer").is(':checked')) {
                                                            if(permisosRiesgo.length > 0)
                                                                permisosRiesgo += '/';
                                                            permisosRiesgo += 'V';
                                                        }
                                                        if ($("#riesgoIntegralVer").is(':checked')) {
                                                            if(permisosRiesgoIntegral.length > 0)
                                                                permisosRiesgoIntegral += '/';
                                                            permisosRiesgoIntegral += 'V';
                                                        }
                                                        if ($("#usuarioVer").is(':checked')) {
                                                            if(permisosUsuario.length > 0)
                                                                permisosUsuario += '/';
                                                            permisosUsuario += 'V';
                                                        }
                                                        if ($("#listaVer").is(':checked')) {
                                                            if(permisosLista.length > 0)
                                                                permisosLista += '/';
                                                            permisosLista += 'V';
                                                        }
                                                        if ($("#alarmaVer").is(':checked')) {
                                                            if(permisosAlarma.length > 0)
                                                                permisosAlarma += '/';
                                                            permisosAlarma += 'V';
                                                        }

                                                        if ($("#variableEditar").is(':checked')) {
                                                            if(permisosVariable.length > 0)
                                                                permisosVariable += '/';
                                                            permisosVariable += 'E';
                                                        }
                                                        if ($("#indicadorEditar").is(':checked')) {
                                                            if(permisosIndicador.length > 0)
                                                                permisosIndicador+= '/';
                                                            permisosIndicador += 'E';
                                                        }
                                                        if ($("#riesgoEditar").is(':checked')) {
                                                            if(permisosRiesgo.length > 0)
                                                                permisosRiesgo += '/';
                                                            permisosRiesgo += 'E';
                                                        }
                                                        if ($("#riesgoIntegralEditar").is(':checked')) {
                                                            if(permisosRiesgoIntegral.length > 0)
                                                                permisosRiesgoIntegral += '/';
                                                            permisosRiesgoIntegral += 'E';
                                                        }
                                                        if ($("#usuarioEditar").is(':checked')) {
                                                            if(permisosUsuario.length > 0)
                                                                permisosUsuario += '/';
                                                            permisosUsuario += 'E';
                                                        }
                                                        if ($("#listaEditar").is(':checked')) {
                                                            if(permisosLista.length > 0)
                                                                permisosLista += '/';
                                                            permisosLista += 'E';
                                                        }
                                                        if ($("#alarmaEditar").is(':checked')) {
                                                            if(permisosAlarma.length > 0)
                                                                permisosAlarma += '/';
                                                            permisosAlarma += 'E';
                                                        }
                                                        var permisoUsuarios = {
                                                            variable: permisosVariable,
                                                            indicador: permisosIndicador,
                                                            riesgo: permisosRiesgo,
                                                            riesgoIntegral: permisosRiesgoIntegral,
                                                            usuario: permisosUsuario,
                                                            lista: permisosLista,
                                                            alarma: permisosAlarma
                                                        };
                                                        var copyPermisos = [...this.state.permisosUsuarios];
                                                        copyPermisos.push(permisoUsuarios);
                                                        this.setState({
                                                            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: ""},
                                                            permisosUsuarios: copyPermisos
                                                        }, this.getUsuarioID );
                                                        this.props.showSuccesMessage("Éxito", "Usuario creado con éxito.");
                                                        this.loadUsuarios();

                                                        const transaction1 = new sql.Transaction( this.props.pool );
                                                        transaction1.begin(err => {
                                                            var rolledBack = false;
                                                            transaction1.on('rollback', aborted => {
                                                                rolledBack = true;
                                                            });
                                                            const request1 = new sql.Request(transaction1);
                                                            request1.query("select top 1 * from Usuarios order by ID desc", (err, result) => {
                                                                if (err) {
                                                                    if (!rolledBack) {
                                                                        console.log(err);
                                                                        transaction1.rollback(err => {
                                                                        });
                                                                    }
                                                                } else {
                                                                    transaction1.commit(err => {
                                                                        if(result.recordset.length > 0) {
                                                                            var nuevosValores = 'nombre: '+nombreCompleto+'\n'+
                                                                                                'usuario: '+usuario+'\n'+
                                                                                                'permisos: {\n'+
                                                                                                '\tvariable: '+permisosVariable+'\n'+
                                                                                                '\tindicador: '+permisosIndicador+'\n'+
                                                                                                '\triesgo: '+permisosRiesgo+'\n'+
                                                                                                '\triesgoIntegral: '+permisosRiesgoIntegral+'\n'+
                                                                                                '\tusuario: '+permisosUsuario+'\n'+
                                                                                                '\tlista: '+permisosLista+'\n'+
                                                                                                '\talarma: '+permisosAlarma+'\n'+
                                                                                                '}';
                                                                            this.saveBitacora(new Date(), "Usuario: "+this.props.userName+" creo al usuario: "+this.state.usuarioUsuarioSeleccionado+"\nValores: \n"+nuevosValores, "usuario", result.recordset[0].ID);
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
                                        this.props.showMessage("Error", "El nombre de usuario ya existe.", true, false, {});
                                    }
                                });
                            }
                        });
                    }); // fin transaction
                    

                } else {
                    if(contrasena.length == 0) {
                        this.props.showMessage("Error", "Ingrese un valor para el campo de contraseña.", true, false, {});
                    } else {
                        this.props.showMessage("Error", "El valor para el campo de contraseña debe ser menor a 51 caracteres.", true, false, {});
                    }
                }
            } else {
                if(usuario.length == 0) {
                    this.props.showMessage("Error", "Ingrese un valor para el campo de usuario.", true, false, {});
                } else {
                    this.props.showMessage("Error", "El valor para el campo de usuario debe ser menor a 26 caracteres.", true, false, {});
                }
            }
        } else {
            if(nombreCompleto.length == 0) {
                this.props.showMessage("Error", "Ingrese un valor para el campo de nombre completo.", true, false, {});
            } else {
                this.props.showMessage("Error", "El valor para el campo de nombre completo debe ser menor a 101 caracteres.", true, false, {});
            }
        }
    }

    getUsuarioID () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select top 1 * from Usuarios order by ID desc", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        this.props.showMessage("Error", "Error al intentar obtener ID de usuario.", true, false, {});
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset != undefined) {
                            if(result.recordset.length) {
                                this.insertarPermisos(result.recordset[0].ID, this.state.permisosUsuarios.length-1);
                            }
                        }
                    });
                }
            });
        }); // fin transaction
    }

    insertarPermisos (idUsuario, posicionUsuario) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into PermisosUsuarios (usuarioID, variable, indicador, riesgo, riesgoIntegral, usuario, lista, alarma ) values ("+idUsuario+",'"+this.state.permisosUsuarios[posicionUsuario].variable+"','"+this.state.permisosUsuarios[posicionUsuario].indicador+"','"+this.state.permisosUsuarios[posicionUsuario].riesgo+"','"+this.state.permisosUsuarios[posicionUsuario].riesgoIntegral+"','"+this.state.permisosUsuarios[posicionUsuario].usuario+"','"+this.state.permisosUsuarios[posicionUsuario].lista+"','"+this.state.permisosUsuarios[posicionUsuario].alarma+"')", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        this.props.showMessage("Error", "Error al ingresar permisos de usuario.", true, false, {});
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

    openModal (index) {
        this.setState({
            mostrarModal: true,
            tituloModal: "Modificar: "+this.state.usuarios[index].nombreCompleto,
            nombreUsuarioSeleccionado: this.state.usuarios[index].nombreCompleto,
            usuarioUsuarioSeleccionado: this.state.usuarios[index].usuario,
            contrasenaUsuarioSeleccionado: this.state.usuarios[index].contrasena,
            posUsuarioSeleccionado: index,
            permisoSeleccionado: this.state.permisosUsuarios[index]
        });
    }

    closeModal () {
        this.setState({
            mostrarModal: false,
            tituloModal: "",
            nombreUsuarioSeleccionado: "",
            usuarioUsuarioSeleccionado: "",
            contrasenaUsuarioSeleccionado: "",
            posUsuarioSeleccionado: -1,
            permisoSeleccionado: null
        });
    }

    editUser () {
        var nombreCompleto = $("#nombreCompletoEdit").val();
        var usuario = $("#usuarioEdit").val();
        var contrasena = $("#contrasenaEdit").val();
                    
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("update Usuarios set nombreCompleto = '"+nombreCompleto+"', usuario = '"+usuario+"', contrasena = '"+contrasena+"' where ID = "+this.state.usuarios[this.state.posUsuarioSeleccionado].ID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        this.props.showMessage("Error", "Error al modificar usuario.", true, false, {});
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var permisosVariable = '', permisosIndicador = '', permisosRiesgo = '', permisosRiesgoIntegral = '', permisosUsuario = '', permisosLista = '', permisosAlarma = '';
                        if ($("#variableCalculoEdit").is(':checked')) {
                            permisosVariable += 'C';
                        }
                        if ($("#indicadorCalculoEdit").is(':checked')) {
                            permisosIndicador += 'C';
                        }
                        if ($("#riesgoCalculoEdit").is(':checked')) {
                            permisosRiesgo += 'C';
                        }
                        if ($("#riesgoIntegralCalculoEdit").is(':checked')) {
                            permisosRiesgoIntegral += 'C';
                        }

                        if ($("#variableVerEdit").is(':checked')) {
                            if(permisosVariable.length > 0)
                                permisosVariable += '/';
                            permisosVariable += 'V';
                        }
                        if ($("#indicadorVerEdit").is(':checked')) {
                            if(permisosIndicador.length > 0)
                                permisosIndicador+= '/';
                            permisosIndicador += 'V';
                        }
                        if ($("#riesgoVerEdit").is(':checked')) {
                            if(permisosRiesgo.length > 0)
                                permisosRiesgo += '/';
                            permisosRiesgo += 'V';
                        }
                        if ($("#riesgoIntegralVerEdit").is(':checked')) {
                            if(permisosRiesgoIntegral.length > 0)
                                permisosRiesgoIntegral += '/';
                            permisosRiesgoIntegral += 'V';
                        }
                        if ($("#usuarioVerEdit").is(':checked')) {
                            if(permisosUsuario.length > 0)
                                permisosUsuario += '/';
                            permisosUsuario += 'V';
                        }
                        if ($("#listaVerEdit").is(':checked')) {
                            if(permisosLista.length > 0)
                                permisosLista += '/';
                            permisosLista += 'V';
                        }
                        if ($("#alarmaVerEdit").is(':checked')) {
                            if(permisosAlarma.length > 0)
                                permisosAlarma += '/';
                            permisosAlarma += 'V';
                        }

                        if ($("#variableEditarEdit").is(':checked')) {
                            if(permisosVariable.length > 0)
                                permisosVariable += '/';
                            permisosVariable += 'E';
                        }
                        if ($("#indicadorEditarEdit").is(':checked')) {
                            if(permisosIndicador.length > 0)
                                permisosIndicador+= '/';
                            permisosIndicador += 'E';
                        }
                        if ($("#riesgoEditarEdit").is(':checked')) {
                            if(permisosRiesgo.length > 0)
                                permisosRiesgo += '/';
                            permisosRiesgo += 'E';
                        }
                        if ($("#riesgoIntegralEditarEdit").is(':checked')) {
                            if(permisosRiesgoIntegral.length > 0)
                                permisosRiesgoIntegral += '/';
                            permisosRiesgoIntegral += 'E';
                        }
                        if ($("#usuarioEditarEdit").is(':checked')) {
                            if(permisosUsuario.length > 0)
                                permisosUsuario += '/';
                            permisosUsuario += 'E';
                        }
                        if ($("#listaEditarEdit").is(':checked')) {
                            if(permisosLista.length > 0)
                                permisosLista += '/';
                            permisosLista += 'E';
                        }
                        if ($("#alarmaEditarEdit").is(':checked')) {
                            if(permisosAlarma.length > 0)
                                permisosAlarma += '/';
                            permisosAlarma += 'E';
                        }
                        var permisoUsuarios = {
                            variable: permisosVariable,
                            indicador: permisosIndicador,
                            riesgo: permisosRiesgo,
                            riesgoIntegral: permisosRiesgoIntegral,
                            usuario: permisosUsuario,
                            lista: permisosLista,
                            alarma: permisosAlarma
                        };
                        var copyPermisos = [...this.state.permisosUsuarios];
                        let idPermiso;
                        if(copyPermisos[this.state.posUsuarioSeleccionado] != undefined)
                            idPermiso = copyPermisos[this.state.posUsuarioSeleccionado].ID;
                        let idUsuario = this.state.usuarios[this.state.posUsuarioSeleccionado].ID;
                        copyPermisos[this.state.posUsuarioSeleccionado] = permisoUsuarios;
                        this.setState({
                            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: ""},
                            permisosUsuarios: copyPermisos
                        });
                        this.props.showSuccesMessage("Éxito", "Usuario modificado con éxito.");
                        this.loadUsuarios();

                        const transaction1 = new sql.Transaction( this.props.pool );
                        transaction1.begin(err => {
                            var rolledBack = false;
                            transaction1.on('rollback', aborted => {
                                rolledBack = true;
                            });
                            const request1 = new sql.Request(transaction1);
                            request1.query("select * from PermisosUsuarios where usuarioID = "+idUsuario, (err, result) => {
                                if (err) {
                                    if (!rolledBack) {
                                        console.log(err);
                                        this.props.showMessage("Error", "Error al buscar permisos de usuario.", true, false, {});
                                        transaction1.rollback(err => {
                                        });
                                    }
                                } else {
                                    transaction1.commit(err => {
                                        if (result.recordset.length > 0 ) {
                                            const transaction2 = new sql.Transaction( this.props.pool );
                                            transaction2.begin(err => {
                                                var rolledBack = false;
                                                transaction2.on('rollback', aborted => {
                                                    rolledBack = true;
                                                });
                                                const request2 = new sql.Request(transaction2);
                                                request2.query("update PermisosUsuarios set variable = '"+permisosVariable+"', indicador = '"+permisosIndicador+"', riesgo = '"+permisosRiesgo+"', riesgoIntegral = '"+permisosRiesgoIntegral+"', usuario = '"+permisosUsuario+"', lista = '"+permisosLista+"', alarma = '"+permisosAlarma+"' where ID = "+idPermiso, (err, result) => {
                                                    if (err) {
                                                        if (!rolledBack) {
                                                            console.log(err);
                                                            this.props.showMessage("Error", "Error al modificar permisos de usuario.", true, false, {});
                                                            transaction2.rollback(err => {
                                                            });
                                                        }
                                                    } else {
                                                        transaction2.commit(err => {
                                                        });
                                                    }
                                                });
                                            }); // fin transaction1
                                        } else {
                                            const transaction2 = new sql.Transaction( this.props.pool );
                                            transaction2.begin(err => {
                                                var rolledBack = false;
                                                transaction2.on('rollback', aborted => {
                                                    rolledBack = true;
                                                });
                                                const request2 = new sql.Request(transaction2);
                                                request2.query("insert into PermisosUsuarios (usuarioID, variable, indicador, riesgo, riesgoIntegral, usuario, lista, alarma) values ("+idUsuario+", '"+permisosVariable+"',  '"+permisosIndicador+"',  '"+permisosRiesgo+"',  '"+permisosRiesgoIntegral+"', '"+permisosUsuario+"',  '"+permisosLista+"',  '"+permisosAlarma+"')", (err, result) => {
                                                    if (err) {
                                                        if (!rolledBack) {
                                                            console.log(err);
                                                            this.props.showMessage("Error", "Error al modificar permisos de usuario.", true, false, {});
                                                            transaction2.rollback(err => {
                                                            });
                                                        }
                                                    } else {
                                                        transaction2.commit(err => {
                                                        });
                                                    }
                                                });
                                            }); // fin transaction2
                                        }
                                        var nuevosValores = 'nombre: '+nombreCompleto+'\n'+
                                                            'usuario: '+usuario+'\n'+
                                                            'permisos: {\n'+
                                                            '\tvariable: '+permisosVariable+'\n'+
                                                            '\tindicador: '+permisosIndicador+'\n'+
                                                            '\triesgo: '+permisosRiesgo+'\n'+
                                                            '\triesgoIntegral: '+permisosRiesgoIntegral+'\n'+
                                                            '\tusuario: '+permisosUsuario+'\n'+
                                                            '\tlista: '+permisosLista+'\n'+
                                                            '\talarma: '+permisosAlarma+'\n'+
                                                            '}';
                                        this.saveBitacora(new Date(), "Usuario: "+this.props.userName+" modifico el usuario: "+this.state.usuarioUsuarioSeleccionado+"\nNuevos valores: \n"+nuevosValores, "usuario", idUsuario);
                                    });
                                }
                            });
                        }); // fin transaction

                    });
                }
            });
        }); // fin transaction
    }

    deleteUser () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("delete from Usuarios where ID = "+this.state.idUsuarioSeleccionado, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        this.props.showMessage("Error", "El al borrar usuario.", true, false, {});
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: ""}
                        });
                        this.props.showSuccesMessage("Éxito", "Usuario eliminado con éxito.");
                        this.saveBitacora(new Date(), "Usuario: "+this.props.userName+" elimino el usuario: "+this.state.usuarioUsuarioSeleccionado, "usuario", this.state.idUsuarioSeleccionado);

                        const transaction = new sql.Transaction( this.props.pool );
                        transaction.begin(err => {
                            var rolledBack = false;
                            transaction.on('rollback', aborted => {
                                rolledBack = true;
                            });
                            const request = new sql.Request(transaction);
                            request.query("delete from PermisosUsuarios where ID = "+this.state.permisosUsuarios[this.state.posUsuarioSeleccionado].ID, (err, result) => {
                                if (err) {
                                    if (!rolledBack) {
                                        console.log(err);
                                        this.props.showMessage("Error", "El al borrar permisos de usuario.", true, false, {});
                                        transaction.rollback(err => {
                                        });
                                    }
                                } else {
                                    transaction.commit(err => {
                                        this.loadUsuarios();
                                    });
                                }
                            });
                        }); // fin transaction

                    });
                }
            });
        }); // fin transaction
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

    deleteUserConfirmation(id, pos) {
        this.setState({
            idUsuarioSeleccionado: id,
            posUsuarioSeleccionado: pos
        });
        this.props.showMessage("Confirmación", "Esta seguro que desea eliminar el usuario?", false, true, this.deleteUser );
    }

    modifyUserConfirmation() {
        var nombreCompleto = $("#nombreCompletoEdit").val();
        var usuario = $("#usuarioEdit").val();
        var contrasena = $("#contrasenaEdit").val();
        if(nombreCompleto.length > 0 && nombreCompleto.length < 101) {
            if(usuario.length > 0 && usuario.length < 26) {
                if(contrasena.length > 0 && contrasena.length < 51) {
                    var validoModificar = true;
                    for (var i = 0; i < this.state.usuarios.length; i++) {
                        if (this.state.usuarios[i].usuario.localeCompare(usuario) == 0 && this.state.posUsuarioSeleccionado != i){
                            validoModificar = false;
                            break;
                        }
                    };
                    if(validoModificar)
                        this.props.showMessage("Confirmación", "Esta seguro que desea modificar el usuario?", false, true, this.editUser );
                    else
                        this.props.showMessage("Error", "El nombre de usuario ya existe.", true, false, {});
                } else {
                    if(contrasena.length == 0) {
                        this.props.showMessage("Error", "Ingrese un valor para el campo de contraseña.", true, false, {});
                    } else {
                        this.props.showMessage("Error", "El valor para el campo de contraseña debe ser menor a 51 caracteres.", true, false, {});
                    }
                }
            } else {
                if(usuario.length == 0) {
                    this.props.showMessage("Error", "Ingrese un valor para el campo de usuario.", true, false, {});
                } else {
                    this.props.showMessage("Error", "El valor para el campo de usuario debe ser menor a 26 caracteres.", true, false, {});
                }
            }
        } else {
            if(nombreCompleto.length == 0) {
                this.props.showMessage("Error", "Ingrese un valor para el campo de nombre completo.", true, false, {});
            } else {
                this.props.showMessage("Error", "El valor para el campo de nombre completo debe ser menor a 101 caracteres.", true, false, {});
            }
        }
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
                                        <li className={"breadcrumb-item font-16 active"} aria-current="page">Mantenimiento de Usuarios</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"row"} style={{display: this.props.permision.lista.indexOf("E") > -1 ? "" : "none" }}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>
                                <h3>Crear Nuevo Usuario</h3>
                                <div className={"row border-top"}>
                                    <div className="form-group col-xl-12 col-12">
                                        <label className={"col-form-label"}>Nombre Completo</label>
                                        <input id="nombreCompleto" type="text" className={"form-control"}/>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="form-group col-xl-12 col-12">
                                        <label className={"col-form-label"}>Nombre de Usuario</label>
                                        <input id="usuario" type="text" className={"form-control"}/>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="form-group col-xl-12 col-12">
                                        <label className={"col-form-label"}>Contrase&ntilde;a</label>
                                        <input id="contrasena" type="password" className={"form-control"}/>
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Varibales</th>
                                                <th scope="col">Indicadores</th>
                                                <th scope="col">Riesgos</th>
                                                <th scope="col">Integral</th>
                                                <th scope="col">Usuarios</th>
                                                <th scope="col">Listas</th>
                                                <th scope="col">Alarmas</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">Cálculo</th>
                                                <td scope="row">
                                                    <label className="custom-control custom-checkbox" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                        <input id="variableCalculo" type="checkbox" defaultChecked={true} className="custom-control-input"/><span className="custom-control-label"></span>
                                                    </label>
                                                </td>
                                                <td scope="row">
                                                    <label className="custom-control custom-checkbox">
                                                        <input id="indicadorCalculo" type="checkbox" defaultChecked={true} className="custom-control-input"/><span className="custom-control-label"></span>
                                                    </label>
                                                </td>
                                                <td scope="row">
                                                    <label className="custom-control custom-checkbox">
                                                        <input id="riesgoCalculo" type="checkbox" defaultChecked={true} className="custom-control-input"/><span className="custom-control-label"></span>
                                                    </label>
                                                </td>
                                                <td scope="row">
                                                    <label className="custom-control custom-checkbox">
                                                        <input id="riesgoIntegralCalculo" type="checkbox" defaultChecked={true} className="custom-control-input"/><span className="custom-control-label"></span>
                                                    </label>
                                                </td>
                                                <td scope="row">
                                                </td>
                                                <td scope="row">
                                                </td>
                                                <td scope="row">
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Ver</th>
                                                <td scope="row">
                                                    <label className="custom-control custom-checkbox">
                                                        <input id="variableVer" type="checkbox" defaultChecked={true} className="custom-control-input"/><span className="custom-control-label"></span>
                                                    </label>
                                                </td>
                                                <td scope="row">
                                                    <label className="custom-control custom-checkbox">
                                                        <input id="indicadorVer" type="checkbox" defaultChecked={true} className="custom-control-input"/><span className="custom-control-label"></span>
                                                    </label>
                                                </td>
                                                <td scope="row">
                                                    <label className="custom-control custom-checkbox">
                                                        <input id="riesgoVer" type="checkbox" defaultChecked={true} className="custom-control-input"/><span className="custom-control-label"></span>
                                                    </label>
                                                </td>
                                                <td scope="row">
                                                    <label className="custom-control custom-checkbox">
                                                        <input id="riesgoIntegralVer" type="checkbox" defaultChecked={true} className="custom-control-input"/><span className="custom-control-label"></span>
                                                    </label>
                                                </td>
                                                <td scope="row">
                                                    <label className="custom-control custom-checkbox">
                                                        <input id="usuarioVer" type="checkbox" defaultChecked={true} className="custom-control-input"/><span className="custom-control-label"></span>
                                                    </label>
                                                </td>
                                                <td scope="row">
                                                    <label className="custom-control custom-checkbox">
                                                        <input id="listaVer" type="checkbox" defaultChecked={true} className="custom-control-input"/><span className="custom-control-label"></span>
                                                    </label>
                                                </td>
                                                <td scope="row">
                                                    <label className="custom-control custom-checkbox">
                                                        <input id="alarmaVer" type="checkbox" defaultChecked={true} className="custom-control-input"/><span className="custom-control-label"></span>
                                                    </label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Editar</th>
                                                <td scope="row">
                                                    <label className="custom-control custom-checkbox">
                                                        <input id="variableEditar" type="checkbox" defaultChecked={true} className="custom-control-input"/><span className="custom-control-label"></span>
                                                    </label>
                                                </td>
                                                <td scope="row">
                                                    <label className="custom-control custom-checkbox">
                                                        <input id="indicadorEditar" type="checkbox" defaultChecked={true} className="custom-control-input"/><span className="custom-control-label"></span>
                                                    </label>
                                                </td>
                                                <td scope="row">
                                                    <label className="custom-control custom-checkbox">
                                                        <input id="riesgoEditar" type="checkbox" defaultChecked={true} className="custom-control-input"/><span className="custom-control-label"></span>
                                                    </label>
                                                </td>
                                                <td scope="row">
                                                    <label className="custom-control custom-checkbox">
                                                        <input id="riesgoIntegralEditar" type="checkbox" defaultChecked={true} className="custom-control-input"/><span className="custom-control-label"></span>
                                                    </label>
                                                </td>
                                                <td scope="row">
                                                    <label className="custom-control custom-checkbox">
                                                        <input id="usuarioEditar" type="checkbox" defaultChecked={true} className="custom-control-input"/><span className="custom-control-label"></span>
                                                    </label>
                                                </td>
                                                <td scope="row">
                                                    <label className="custom-control custom-checkbox">
                                                        <input id="listaEditar" type="checkbox" defaultChecked={true} className="custom-control-input"/><span className="custom-control-label"></span>
                                                    </label>
                                                </td>
                                                <td scope="row">
                                                    <label className="custom-control custom-checkbox">
                                                        <input id="alarmaEditar" type="checkbox" defaultChecked={true} className="custom-control-input"/><span className="custom-control-label"></span>
                                                    </label>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <br/>
                                <div className={"row"}>
                                    <button onClick={this.insertarUsuario} className={"btn btn-success btn-block col-xl-10 col-10"} style={{margin: "0 auto", display: "block"}}>Crear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"row"} style={{display: this.props.permision.lista.indexOf("V") > -1 || this.props.permision.lista.indexOf("E") > -1 ? "" : "none" }}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nombre Completo</th>
                                            <th scope="col">Usuario</th>
                                            <th scope="col" style={{display: this.props.permision.lista.indexOf("E") > -1 ? "" : "none" }}>Editar</th>
                                            <th scope="col" style={{display: this.props.permision.lista.indexOf("E") > -1 ? "" : "none" }}>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.usuarios.map((usuario, i) =>
                                            <tr key={usuario.ID}>
                                                <th scope="row">{i+1}</th>
                                                <td>{usuario.nombreCompleto}</td>
                                                <td>{usuario.usuario}</td>
                                                <td style={{display: this.props.permision.lista.indexOf("E") > -1 ? "" : "none" }}><img onClick={() => this.openModal(i)} src={"../assets/edit.png"} style={{height: "20px", width: "20px", cursor: 'pointer'}}></img></td>
                                                <td style={{display: this.props.permision.lista.indexOf("E") > -1 ? "" : "none" }}><img onClick={() => this.deleteUserConfirmation(usuario.ID, i)} src={"../assets/trash.png"} style={{height: "20px", width: "20px", cursor: 'pointer'}}></img></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.mostrarModal}
                    titulo={this.state.tituloModal}
                    onClose={this.closeModal}>

                        <h3>Crear Nuevo Usuario</h3>
                        <div className={"row border-top"}>
                            <div className="form-group col-xl-12 col-12">
                                <label className={"col-form-label"}>Nombre Completo</label>
                                <input id="nombreCompletoEdit" type="text" defaultValue={this.state.nombreUsuarioSeleccionado} className={"form-control"}/>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className="form-group col-xl-12 col-12">
                                <label className={"col-form-label"}>Nombre de Usuario</label>
                                <input id="usuarioEdit" type="text" defaultValue={this.state.usuarioUsuarioSeleccionado} className={"form-control"}/>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className="form-group col-xl-12 col-12">
                                <label className={"col-form-label"}>Contrase&ntilde;a</label>
                                <input id="contrasenaEdit" type="password" defaultValue={this.state.contrasenaUsuarioSeleccionado} className={"form-control"}/>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Varibales</th>
                                        <th scope="col">Indicadores</th>
                                        <th scope="col">Riesgos</th>
                                        <th scope="col">Integral</th>
                                        <th scope="col">Usuarios</th>
                                        <th scope="col">Listas</th>
                                        <th scope="col">Alarmas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Cálculo</th>
                                        <td scope="row">
                                            <label className="custom-control custom-checkbox">
                                                <input id="variableCalculoEdit" type="checkbox" defaultChecked={ this.state.permisoSeleccionado != null ? (this.state.permisoSeleccionado.variable.indexOf("C") >= 0 ? true : false) : false } className="custom-control-input"/><span className="custom-control-label"></span>
                                            </label>
                                        </td>
                                        <td scope="row">
                                            <label className="custom-control custom-checkbox">
                                                <input id="indicadorCalculoEdit" type="checkbox" defaultChecked={ this.state.permisoSeleccionado != null ? (this.state.permisoSeleccionado.indicador.indexOf("C") >= 0 ? true : false) : false } className="custom-control-input"/><span className="custom-control-label"></span>
                                            </label>
                                        </td>
                                        <td scope="row">
                                            <label className="custom-control custom-checkbox">
                                                <input id="riesgoCalculoEdit" type="checkbox" defaultChecked={ this.state.permisoSeleccionado != null ? (this.state.permisoSeleccionado.riesgo.indexOf("C") >= 0 ? true : false) : false } className="custom-control-input"/><span className="custom-control-label"></span>
                                            </label>
                                        </td>
                                        <td scope="row">
                                            <label className="custom-control custom-checkbox">
                                                <input id="riesgoIntegralCalculoEdit" type="checkbox" defaultChecked={ this.state.permisoSeleccionado != null ? (this.state.permisoSeleccionado.riesgoIntegral.indexOf("C") >= 0 ? true : false) : false } className="custom-control-input"/><span className="custom-control-label"></span>
                                            </label>
                                        </td>
                                        <td scope="row">
                                        </td>
                                        <td scope="row">
                                        </td>
                                        <td scope="row">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Ver</th>
                                        <td scope="row">
                                            <label className="custom-control custom-checkbox">
                                                <input id="variableVerEdit" type="checkbox" defaultChecked={ this.state.permisoSeleccionado != null ? (this.state.permisoSeleccionado.variable.indexOf("V") >= 0 ? true : false) : false } className="custom-control-input"/><span className="custom-control-label"></span>
                                            </label>
                                        </td>
                                        <td scope="row">
                                            <label className="custom-control custom-checkbox">
                                                <input id="indicadorVerEdit" type="checkbox" defaultChecked={ this.state.permisoSeleccionado != null ? (this.state.permisoSeleccionado.indicador.indexOf("V") >= 0 ? true : false) : false } className="custom-control-input"/><span className="custom-control-label"></span>
                                            </label>
                                        </td>
                                        <td scope="row">
                                            <label className="custom-control custom-checkbox">
                                                <input id="riesgoVerEdit" type="checkbox" defaultChecked={ this.state.permisoSeleccionado != null ? (this.state.permisoSeleccionado.riesgo.indexOf("V") >= 0 ? true : false) : false } className="custom-control-input"/><span className="custom-control-label"></span>
                                            </label>
                                        </td>
                                        <td scope="row">
                                            <label className="custom-control custom-checkbox">
                                                <input id="riesgoIntegralVerEdit" type="checkbox" defaultChecked={ this.state.permisoSeleccionado != null ? (this.state.permisoSeleccionado.riesgoIntegral.indexOf("V") >= 0 ? true : false) : false } className="custom-control-input"/><span className="custom-control-label"></span>
                                            </label>
                                        </td>
                                        <td scope="row">
                                            <label className="custom-control custom-checkbox">
                                                <input id="usuarioVerEdit" type="checkbox" defaultChecked={ this.state.permisoSeleccionado != null ? (this.state.permisoSeleccionado.usuario.indexOf("V") >= 0 ? true : false) : false } className="custom-control-input"/><span className="custom-control-label"></span>
                                            </label>
                                        </td>
                                        <td scope="row">
                                            <label className="custom-control custom-checkbox">
                                                <input id="listaVerEdit" type="checkbox" defaultChecked={ this.state.permisoSeleccionado != null ? (this.state.permisoSeleccionado.lista.indexOf("V") >= 0 ? true : false) : false } className="custom-control-input"/><span className="custom-control-label"></span>
                                            </label>
                                        </td>
                                        <td scope="row">
                                            <label className="custom-control custom-checkbox">
                                                <input id="alarmaVerEdit" type="checkbox" defaultChecked={ this.state.permisoSeleccionado != null ? (this.state.permisoSeleccionado.alarma.indexOf("V") >= 0 ? true : false) : false } className="custom-control-input"/><span className="custom-control-label"></span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Editar</th>
                                        <td scope="row">
                                            <label className="custom-control custom-checkbox">
                                                <input id="variableEditarEdit" type="checkbox" defaultChecked={ this.state.permisoSeleccionado != null ? (this.state.permisoSeleccionado.variable.indexOf("E") >= 0 ? true : false) : false } className="custom-control-input"/><span className="custom-control-label"></span>
                                            </label>
                                        </td>
                                        <td scope="row">
                                            <label className="custom-control custom-checkbox">
                                                <input id="indicadorEditarEdit" type="checkbox" defaultChecked={ this.state.permisoSeleccionado != null ? (this.state.permisoSeleccionado.indicador.indexOf("E") >= 0 ? true : false) : false } className="custom-control-input"/><span className="custom-control-label"></span>
                                            </label>
                                        </td>
                                        <td scope="row">
                                            <label className="custom-control custom-checkbox">
                                                <input id="riesgoEditarEdit" type="checkbox" defaultChecked={ this.state.permisoSeleccionado != null ? (this.state.permisoSeleccionado.riesgo.indexOf("E") >= 0 ? true : false) : false } className="custom-control-input"/><span className="custom-control-label"></span>
                                            </label>
                                        </td>
                                        <td scope="row">
                                            <label className="custom-control custom-checkbox">
                                                <input id="riesgoIntegralEditarEdit" type="checkbox" defaultChecked={ this.state.permisoSeleccionado != null ? (this.state.permisoSeleccionado.riesgoIntegral.indexOf("E") >= 0 ? true : false) : false } className="custom-control-input"/><span className="custom-control-label"></span>
                                            </label>
                                        </td>
                                        <td scope="row">
                                            <label className="custom-control custom-checkbox">
                                                <input id="usuarioEditarEdit" type="checkbox" defaultChecked={ this.state.permisoSeleccionado != null ? (this.state.permisoSeleccionado.usuario.indexOf("E") >= 0 ? true : false) : false } className="custom-control-input"/><span className="custom-control-label"></span>
                                            </label>
                                        </td>
                                        <td scope="row">
                                            <label className="custom-control custom-checkbox">
                                                <input id="listaEditarEdit" type="checkbox" defaultChecked={ this.state.permisoSeleccionado != null ? (this.state.permisoSeleccionado.lista.indexOf("E") >= 0 ? true : false) : false } className="custom-control-input"/><span className="custom-control-label"></span>
                                            </label>
                                        </td>
                                        <td scope="row">
                                            <label className="custom-control custom-checkbox">
                                                <input id="alarmaEditarEdit" type="checkbox" defaultChecked={ this.state.permisoSeleccionado != null ? (this.state.permisoSeleccionado.alarma.indexOf("E") >= 0 ? true : false) : false } className="custom-control-input"/><span className="custom-control-label"></span>
                                            </label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <br/>
                        <div className={"row"}>
                            <button onClick={this.modifyUserConfirmation} className={"btn btn-success btn-block col-xl-10 col-10"} style={{margin: "0 auto", display: "block"}}>Modificar</button>
                        </div>
                        { this.state.mensajeModal.mostrarMensaje ? (
                            <MessageModal esError={this.state.mensajeModal.esError} esConfirmar={this.state.mensajeModal.esConfirmar} dismissMessage={this.dismissMessageModal}  titulo={this.state.mensajeModal.titulo} mensaje={this.state.mensajeModal.mensaje}> </MessageModal>
                        ) : (
                            null
                        )}
                </Modal>
            </div>
        );
    }
}
