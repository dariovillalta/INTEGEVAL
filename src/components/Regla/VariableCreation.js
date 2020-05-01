import React from 'react';
import sql from 'mssql';

import Campo from './Campo.js';
import Operacion from './Operacion.js';
import Valor from './Valor.js';
import ErrorMessage from '../ErrorMessage.js';
import MessageModal from '../MessageModal.js';
import Modal from '../Modal/Modal.js';

var campo;

export default class VariableCreation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tipoCampo: {
                esNumero: true,
                esBoolean: false,
                esFecha: false,
                esTexto: false
            },
            errorCreacionRegla: {campo: "", descripcion: "", mostrar: false},
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: ""},
            campoSeleccionadoNombre: '{campo}',
            textoOperacion: '{operación}',
            textoValor: '{valor}',
            showModalCampo: false,
            showModalOperacion: false,
            showModalValor: false,
            crearSelected: true,
            editarSelected: false,
            eliminarSelected: false
        }
        this.retornoSeleccionVariable = this.retornoSeleccionVariable.bind(this);
        this.retornoSeleccionOperacion = this.retornoSeleccionOperacion.bind(this);
        this.esNumero = this.esNumero.bind(this);
        this.esBoolean = this.esBoolean.bind(this);
        this.esFecha = this.esFecha.bind(this);
        this.esTexto = this.esTexto.bind(this);
        this.saveRule = this.saveRule.bind(this);
        this.actualizarValor = this.actualizarValor.bind(this);
        this.showCampoModal = this.showCampoModal.bind(this);
        this.showOperacionModal = this.showOperacionModal.bind(this);
        this.showValorModal = this.showValorModal.bind(this);
        this.closeCampoModal = this.closeCampoModal.bind(this);
        this.closeOperacionModal = this.closeOperacionModal.bind(this);
        this.closeValorModal = this.closeValorModal.bind(this);
        this.dismissReglaNewError = this.dismissReglaNewError.bind(this);
        this.showSuccesMessage = this.showSuccesMessage.bind(this);
        this.dismissMessageModal = this.dismissMessageModal.bind(this);

        this.handleMouseHoverAgregar = this.handleMouseHoverAgregar.bind(this);
        this.handleMouseHoverModificar = this.handleMouseHoverModificar.bind(this);
        this.handleMouseHoverEliminar = this.handleMouseHoverEliminar.bind(this);
        this.handleMouseHoverExit = this.handleMouseHoverExit.bind(this);
        this.verificarBotonSel = this.verificarBotonSel.bind(this);
        this.goCrear = this.goCrear.bind(this);
        this.goModificar = this.goModificar.bind(this);
        this.goEliminar = this.goEliminar.bind(this);
        this.verificarAccion = this.verificarAccion.bind(this);
        this.retornarValorFecha = this.retornarValorFecha.bind(this);
        this.retornarValorTime = this.retornarValorTime.bind(this);
        this.isValidDate = this.isValidDate.bind(this);
    }

    componentDidMount() {
        this.verificarBotonSel();
    }

    retornoSeleccionVariable(campoSeleccionadoInput) {
        campo = campoSeleccionadoInput[0];
        this.setState({
            campoSeleccionadoNombre: campo.valor
        });
        var nivelRegla = 0;
        if(campo.nivel != undefined)
            nivelRegla = campo.nivel;
        this.props.actualizarNivelNuevaRegla(nivelRegla);
        this.props.retornoCampo(campo);
    }

    retornoSeleccionOperacion(textoOperacionNuevo, operacion) {
        this.setState({
            textoOperacion: textoOperacionNuevo
        });
        this.props.retornoOperacion({operacion: operacion, operacionTexto: textoOperacionNuevo});
    }

    esNumero() {
        this.setState({
            tipoCampo: {
                esNumero: true,
                esBoolean: false,
                esFecha: false,
                esTexto: false
            }
        });
    }

    esBoolean () {
        this.setState({
            tipoCampo: {
                esNumero: false,
                esBoolean: true,
                esFecha: false,
                esTexto: false
            }
        });
    }

    esFecha () {
        this.setState({
            tipoCampo: {
                esNumero: false,
                esBoolean: false,
                esFecha: true,
                esTexto: false
            }
        });
    }

    esTexto () {
        this.setState({
            tipoCampo: {
                esNumero: false,
                esBoolean: false,
                esFecha: false,
                esTexto: true
            }
        });
    }

    saveRule() {
        let seleccionCampoIDSelect = $("#campo").val();
        if(seleccionCampoIDSelect.length > 0) {
            let campoTablaID;
            let campoID;
            let campoTipo;
            let operacion;
            let operacionTipo;
            let valorLista;   //ID Tabla
            let valorCampos;
            let esListaValor, esCampoValor;
            let texto;
            if(seleccionCampoIDSelect.localeCompare("M0ra") != 0 && seleccionCampoIDSelect.localeCompare("Gr4nDeud0r") != 0 && seleccionCampoIDSelect.localeCompare("P3quDeud0r") != 0) {
                campoTablaID = this.state.campos[seleccionCampoIDSelect].tablaID;
                campoID = this.state.campos[seleccionCampoIDSelect].ID;
                campoTipo = this.state.campos[seleccionCampoIDSelect].tipo;
                operacion = $("input[name='operacionRadio']:checked").val();
                operacionTipo;
                if(operacion != undefined && (operacion.localeCompare("<") == 0 || operacion.localeCompare("<=") == 0 || operacion.localeCompare(">") == 0 || operacion.localeCompare(">=") == 0 || operacion.localeCompare("==") == 0 || operacion.localeCompare("!=") == 0))
                    operacionTipo = "relacional";
                else if(operacion != undefined && (operacion.localeCompare("+") == 0 || operacion.localeCompare("-") == 0 || operacion.localeCompare("*") == 0 || operacion.localeCompare("/") == 0))
                    operacionTipo = "algebraica";
                else if(operacion != undefined && (operacion.localeCompare("sumIf") == 0 || operacion.localeCompare("sumIfNot") == 0))
                    operacionTipo = "excel";
                valorLista = $("#selectLista").val();   //ID Tabla
                valorCampos = $("#camposDeLista").val();
                esListaValor, esCampoValor;
                if(valorLista != undefined && valorLista.localeCompare("table") == 0) {
                    esListaValor = false;
                    esCampoValor = true;
                    valorLista = this.props.tablaID;
                } else if(valorLista != undefined && valorLista.length > 0) {
                    esListaValor = true;
                    esCampoValor = false;
                }
                let operacionTexto;
                if(operacion.localeCompare("==") == 0){
                    operacionTexto = "es igual";
                } else if(operacion.localeCompare("<") == 0){
                    operacionTexto = "es menor";
                } else if(operacion.localeCompare("<=") == 0){
                    operacionTexto = "es menor o igual";
                } else if(operacion.localeCompare(">=") == 0){
                    operacionTexto = "es mayor o igual";
                } else if(operacion.localeCompare(">") == 0){
                    operacionTexto = "es mayor";
                } else if(operacion.localeCompare("!=") == 0){
                    operacionTexto = "no es igual";
                }
                texto = this.state.campos[seleccionCampoIDSelect].nombre + " " + operacionTexto + " ";
            }
            console.log("//////////////////////");
            console.log("//////////////////////");
            console.log("campoTablaID = "+campoTablaID);
            console.log("campoID = "+campoID);
            console.log("campoTipo = "+campoTipo);
            console.log("operacion = "+operacion);
            console.log("operacionTipo = "+operacionTipo);
            console.log("valorLista = "+valorLista);
            console.log("valorCampos = "+valorCampos);
            console.log("esListaValor = "+esListaValor);
            console.log("esCampoValor = "+esCampoValor);
            console.log("+++++++++++++++++++++++");
            console.log("+++++++++++++++++++++++");
            if(!isNaN(campoTablaID) && campoTablaID.toString().length > 0 ) {
                if(!isNaN(campoID) && campoID.toString().length > 0 ) {
                    if(isNaN(campoTipo) && campoTipo.length > 0) {
                        if(operacion != undefined && isNaN(operacion) && operacion.length > 0) {
                            if(isNaN(operacionTipo) && operacionTipo.length > 0) {
                                if(valorLista != undefined && (/*!isNaN(valorLista) ||*/ valorLista.toString().length > 0)) {
                                    if(valorCampos.length > 0 && valorCampos.length < 1001) {
                                        if(esListaValor != undefined) {
                                            if(esCampoValor != undefined) {
                                                this.setState({
                                                    errorCreacionRegla: {campo: '', descripcion: '', mostrar: false}
                                                });
                                                var tablaNombreValor = 'VariablesdeLista';
                                                if(esCampoValor)
                                                    tablaNombreValor = 'Campos';
                                                var textoABuscar = '';
                                                for (var i = 0; i < valorCampos.length; i++) {
                                                    if(textoABuscar.length == 0) {
                                                        textoABuscar += ' where ID = '+valorCampos[i];
                                                    } else {
                                                        textoABuscar += ' or ID = '+valorCampos[i];
                                                    }
                                                };
                                                const transaction = new sql.Transaction( this.props.pool );
                                                transaction.begin(err => {
                                                    var rolledBack = false;
                                                    transaction.on('rollback', aborted => {
                                                        rolledBack = true;
                                                    });
                                                    const request = new sql.Request(transaction);
                                                    request.query("select * from "+tablaNombreValor+textoABuscar, (err, result) => {
                                                        if (err) {
                                                            if (!rolledBack) {
                                                                console.log(err);
                                                                transaction.rollback(err => {
                                                                });
                                                            }
                                                        } else {
                                                            transaction.commit(err => {
                                                                for (var i = 0; i < result.recordset.length; i++) {
                                                                    if(esCampoValor) {
                                                                        if(i == 0)
                                                                            texto+=result.recordset[i].nombre;
                                                                        else
                                                                            texto+=", "+result.recordset[i].nombre;
                                                                    } else {
                                                                        if(i == 0)
                                                                            texto+=result.recordset[i].valor;
                                                                        else
                                                                            texto+=", "+result.recordset[i].valor;
                                                                    }
                                                                };
                                                                const transaction1 = new sql.Transaction( this.props.pool );
                                                                transaction1.begin(err => {
                                                                    var rolledBack = false;
                                                                    transaction1.on('rollback', aborted => {
                                                                        rolledBack = true;
                                                                    });
                                                                    const request1 = new sql.Request(transaction1);
                                                                    request1.query("insert into Reglas (campoTablaID, campoCampoID, campoTipo, operacion, tipoOperacion, valor, valorTipo, esListaValor, esCampoValor, valorTablaID, texto, nombreTablaRes, idTipoTabla) values ("+campoTablaID+", "+campoID+", '"+campoTipo+"', '"+operacion+"', '"+operacionTipo+"','"+valorCampos+"', '', '"+esListaValor+"', '"+esCampoValor+"', "+valorLista+", '"+texto+"', '"+this.props.tipoTablaRes+"', "+this.props.idTipoTabla+")", (err, result) => {
                                                                        if (err) {
                                                                            if (!rolledBack) {
                                                                                console.log(err);
                                                                                transaction1.rollback(err => {
                                                                                });
                                                                            }
                                                                        } else {
                                                                            transaction1.commit(err => {
                                                                                this.showSuccesMessage("Exito", "Regla creada con éxito.");
                                                                            });
                                                                        }
                                                                    });
                                                                }); // fin transaction1
                                                            });
                                                        }
                                                    });
                                                }); // fin transaction
                                            } else {
                                                let campo = "Es Campo en Valor";
                                                let descripcionN;
                                                if(esCampoValor != undefined)
                                                    descripcionN = "El valor debe existir.";
                                                this.setState({
                                                    errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
                                                });
                                            }
                                        } else {
                                            let campo = "Es Lista en Valor";
                                            let descripcionN;
                                            if(esListaValor != undefined)
                                                descripcionN = "El valor debe existir.";
                                            this.setState({
                                                errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
                                            });
                                        }
                                    } else {
                                        let campo = "Valor";
                                        let descripcionN;
                                        if(valorCampos.length == 0)
                                            descripcionN = "El valor debe tener una longitud mayor a 0.";
                                        else if(valorCampos.length < 1001)
                                            descripcionN = "El valor debe tener una longitud menor a 1001.";
                                        this.setState({
                                            errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
                                        });
                                    }
                                } else {
                                    let campo = "ID de Tabla de Valor";
                                    let descripcionN;
                                    if(valorLista == undefined)
                                        descripcionN = "Seleccione un valor para el ID de la tabla del campo de valor.";
                                    else if(valorLista.toString().length == 0)
                                        descripcionN = "El valor debe tener una longitud mayor a 0.";
                                    this.setState({
                                        errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
                                    });
                                }
                            } else {
                                let campo = "Tipo de Operación";
                                let descripcionN;
                                if(isNaN(operacionTipo))
                                    descripcionN = "El tipo de operación no puede ser un número.";
                                else
                                    descripcionN = "El tipo de operación debe tener una longitud mayor a 0.";
                                this.setState({
                                    errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
                                });
                            }
                        } else {
                            let campo = "Operación";
                            let descripcionN;
                            if(operacion == undefined)
                                descripcionN = "Seleccione un valor de operación.";
                            else if(isNaN(operacion))
                                descripcionN = "La operación no puede ser un número.";
                            else
                                descripcionN = "La operación debe tener una longitud mayor a 0.";
                            this.setState({
                                errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
                            });
                        }
                    } else {
                        let campo = "Tipo de Campo";
                        let descripcionN = "El ID del campo debe ser un valor numérico.";
                        this.setState({
                            errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
                        });
                    }
                } else {
                    let campo = "ID de Campo de Campo";
                    let descripcionN;
                    if(campoID.toString().length == 0)
                        descripcionN = "El ID de campo debe tener una longitud mayor a 0.";
                    else if(isNaN(campoID))
                        descripcionN = "El ID de campo debe ser un valor numérico.";
                    this.setState({
                        errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
                    });
                }
            } else {
                let campo = "ID de Tabla de Campo";
                let descripcionN;
                if(campoTablaID.toString().length == 0)
                    descripcionN = "El ID de tabla de campo debe tener una longitud mayor a 0.";
                else if(isNaN(campoTablaID))
                    descripcionN = "El ID de tabla de campo debe ser un valor numérico.";
                this.setState({
                    errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
                });
            }
        } else {
            let campo = "ID de Tabla de Campo";
            let descripcionN = "Seleccione un valor para el ID de la tabla del campo.";
            this.setState({
                errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
            });
        }
    }

    actualizarValor (e) {
        var valor  = $("#valor").val();
        this.setState({
            textoValor: valor
        });
        if(this.state.tipoCampo.esNumero) {
            var numero = parseFloat(valor);
            if(!isNaN(numero)) {
                var valorARetornar = "MANUAL=NUMERO["+numero+"]";
                this.props.retornarValor(valorARetornar, valor);
            } else if(this.state.campoSeleccionadoNombre.localeCompare("{campo}") != 0) {
                alert('Valor Ingresado no es un número válido')
            }
        } else if(this.state.tipoCampo.esBoolean) {
            if(numero.localeCompare("true") == 0 || numero.localeCompare("false") == 0 ) {
                var valorARetornar = "MANUAL=BOOL["+valor+"]";
                this.props.retornarValor(valorARetornar, valor);
            } else if(this.state.campoSeleccionadoNombre.localeCompare("{campo}") != 0) {
                alert('Valor Ingresado no es un valor booleano válido')
            }
        } else if(this.state.tipoCampo.esFecha) {
            var fecha = null;
            if(valor.indexOf("-") != -1 && valor.split("-").length > 2) {
                fecha = new Date(valor.split("-")[0], valor.split("-")[1], valor.split("-")[2]);
            } else if(valor.indexOf("/") != -1 && valor.split("/").length > 2) {
                fecha = new Date(valor.split("/")[0], valor.split("/")[1], valor.split("/")[2]);
            }
            if(fecha != null && this.isValidDate(fecha)) {
                var valorARetornar = "MANUAL=FECHA[";
                if(valor.indexOf("-") != -1 && valor.split("-").length > 2) {
                    valorARetornar += valor.split("-")[0]+","+valor.split("-")[1]+","+valor.split("-")[2]+"]";
                } else if(valor.indexOf("/") != -1 && valor.split("/").length > 2) {
                    valorARetornar += valor.split("/")[0]+","+valor.split("/")[1]+","+valor.split("/")[2]+"]";
                }
                this.props.retornarValor(valorARetornar, valor);
            } else if(this.state.campoSeleccionadoNombre.localeCompare("{campo}") != 0) {
                alert('Valor Ingresado no es una fecha válida')
            }
        } else if(this.state.tipoCampo.esTexto) {
            if(valor.length > 0 || valor.length < 984 ) {
                var valorARetornar = "MANUAL=VARCHAR["+valor+"]";
                this.props.retornarValor(valorARetornar, valor);
            } else if(this.state.campoSeleccionadoNombre.localeCompare("{campo}") != 0) {
                if(valor.length > 0)
                    alert('Valor Ingresado debe tener una longitud mayor a 0')
                else
                    alert('Valor Ingresado debe tener una longitud menor a 984')
            }
        }
    }

    retornarValorFecha(valorRegla, valorTexto) {
        this.setState({
            textoValor: valorTexto
        });
        this.props.retornarValor(valorRegla, valorTexto);
    }

    retornarValorTime(valorRegla, valorTexto) {
        this.setState({
            textoValor: valorTexto
        });
        this.props.retornarValor(valorRegla, valorTexto);
    }

    isValidDate (fecha) {
        if (Object.prototype.toString.call(fecha) === "[object Date]") {
            if (isNaN(fecha.getTime())) {
                alert("Ingrese una fecha valida.");
                return false;
            } else {
                return true;
            }
        } else {
            alert("Ingrese una fecha valida.");
            return false;
        }
    }

    handleMouseHoverAgregar() {
        $("#crearButton").addClass("onHoverOpcionUmbralSinCambioHeight");
        $("#modificarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        $("#eliminarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
    }

    handleMouseHoverModificar() {
        $("#crearButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        $("#modificarButton").addClass("onHoverOpcionUmbralSinCambioHeight");
        $("#eliminarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
    }

    handleMouseHoverEliminar() {
        $("#crearButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        $("#modificarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        $("#eliminarButton").addClass("onHoverOpcionUmbralSinCambioHeight");
    }

    handleMouseHoverExit() {
        $("#crearButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        $("#modificarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        $("#eliminarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        this.verificarBotonSel();
    }

    verificarBotonSel () {
        if(this.state.crearSelected) {
            $("#crearButton").addClass("onHoverOpcionUmbralSinCambioHeight");
            $("#modificarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
            $("#eliminarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        } else if(this.state.editarSelected) {
            $("#crearButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
            $("#modificarButton").addClass("onHoverOpcionUmbralSinCambioHeight");
            $("#eliminarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        } else if (this.state.eliminarSelected) {
            $("#crearButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
            $("#modificarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
            $("#eliminarButton").addClass("onHoverOpcionUmbralSinCambioHeight");
        }
    }

    goCrear() {
        this.setState({
            crearSelected: true,
            editarSelected: false,
            eliminarSelected: false
        });
    }

    goModificar() {
        this.setState({
            crearSelected: false,
            editarSelected: true,
            eliminarSelected: false
        });
    }

    goEliminar() {
        this.setState({
            crearSelected: false,
            editarSelected: false,
            eliminarSelected: true
        });
    }

    showCampoModal () {
        this.setState({
            showModalCampo: true
        });
    }

    showOperacionModal () {
        this.setState({
            showModalOperacion: true
        });
    }
    
    showValorModal () {
        this.setState({
            showModalValor: true
        });
    }

    closeCampoModal () {
        this.setState({
            showModalCampo: false
        });
    }

    closeOperacionModal () {
        this.setState({
            showModalOperacion: false
        });
    }
    
    closeValorModal () {
        this.setState({
            showModalValor: false
        });
    }

    dismissReglaNewError() {
        this.setState({
            errorCreacionRegla: {campo: "", descripcion: "", mostrar: false}
        });
    }

    showSuccesMessage(titulo, mensaje) {
        this.setState({
            mensajeModal: {mostrarMensaje: true, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: titulo, mensaje: mensaje}
        });
        let self = this;
        setTimeout(function(){
            self.setState({
                mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: ""}
            });
        }, 850);
    }

    dismissMessageModal() {
        this.setState({
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: ""}
        });
    }

    verificarAccion () {
        this.setState({
            campoSeleccionadoNombre: '{campo}',
            textoOperacion: '{operación}',
            textoValor: '{valor}',
        });
        $("#reglaInit").removeClass("colorPunteroFormula");
        $("#reglaInit").removeClass("blink");
        $("#reglaFin").removeClass("colorPunteroFormula");
        $("#reglaFin").removeClass("blink");
        $("#unicaRegla").css("border", "initial");
        $("#unicaRegla").removeClass("blink");
        for (var i = 0; i < this.props.reglas.length; i++) {
            if(this.props.reglas.length == 1 && this.props.reglas[0] != undefined && this.props.reglas[0].length == 1) {
                console.log('YEAH1')
                $("#reglaInit"+i).removeClass("colorPunteroFormula");
                $("#reglaInit"+i).removeClass("blink");
                $("#reglaFin"+i).removeClass("colorPunteroFormula");
                $("#reglaFin"+i).removeClass("blink");
            } else {
                console.log('YEAH2')
                for (var j = 0; j < this.props.reglas[i].length; j++) {
                    console.log('j = '+j)
                    $("#regla"+i+j).css("border", "initial");
                    $("#regla"+i+j).removeClass("blink");
                    $("#reglaInit"+i+j).removeClass("colorPunteroFormula");
                    $("#reglaInit"+i+j).removeClass("blink");
                    $("#reglaFin"+i+j).removeClass("colorPunteroFormula");
                    $("#reglaFin"+i+j).removeClass("blink");
                }
            }
        };
        if(this.state.crearSelected)
            this.props.callbackCrearRegla(false);
        else if(this.state.editarSelected)
            this.props.callbackModificarRegla(false);
        else
            this.props.callbackEliminarRegla(false);
    }

    render() {
        return (
            <div style={{width: "100%"}}>
                <h3 className={"card-header"}>Crear Condición (Instrucción)</h3>
                <div className={"font-24"} style={{minHeight: "50px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "3px solid #d2d2e4"}}>
                    SI {this.state.campoSeleccionadoNombre} {this.state.textoOperacion} {this.state.textoValor}
                </div>
                <div className={"font-18 addPointer abrirModalCrearCondicionOnHover"} onClick={this.showCampoModal} style={{width: "100%",display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "3px solid #d2d2e4"}}>
                    <h4>Seleccionar Campo a Comparar</h4>
                </div>
                <Modal show={this.state.showModalCampo}
                    titulo={"Seleccionar Campo a Comparar"}
                    onClose={this.closeCampoModal}>
                        <Campo esNumero={this.esNumero}
                            esBoolean={this.esBoolean}
                            esFecha={this.esFecha}
                            esTexto={this.esTexto}
                            tablas={this.props.tablas}
                            camposTablas={this.props.camposTablas}
                            variablesEscalares={this.props.variablesEscalares}
                            objetos={this.props.objetos}
                            camposDeObjetos={this.props.camposDeObjetos}
                            excel={this.props.excel}
                            camposDeExcel={this.props.camposDeExcel}
                            formas={this.props.formas}
                            variablesSQL={this.props.variablesSQL}
                            camposVariablesSQL={this.props.camposVariablesSQL}
                            retornoSeleccionVariable={this.retornoSeleccionVariable}>
                        </Campo>
                </Modal>
                <div className={"font-18 addPointer abrirModalCrearCondicionOnHover"} onClick={this.showOperacionModal} style={{width: "100%",display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "3px solid #d2d2e4"}}>
                    <h4>Seleccionar Operación a Aplicar</h4>
                </div>
                <Modal show={this.state.showModalOperacion}
                    titulo={"Seleccionar Operación a Aplicar"}
                    onClose={this.closeOperacionModal}>
                        <Operacion esNumero={this.state.tipoCampo.esNumero}
                            esBoolean={this.state.tipoCampo.esBoolean}
                            esFecha={this.state.tipoCampo.esFecha}
                            esTexto={this.state.tipoCampo.esTexto}
                            retornoSeleccionOperacion={this.retornoSeleccionOperacion}>
                        </Operacion>
                </Modal>
                <Modal show={this.state.showModalValor}
                    titulo={"Seleccionar Valores a Comparar con el Campo"}
                    onClose={this.closeValorModal}>
                        <Valor esNumero={this.state.tipoCampo.esNumero}
                            esBoolean={this.state.tipoCampo.esBoolean}
                            esFecha={this.state.tipoCampo.esFecha}
                            esTexto={this.state.tipoCampo.esTexto}
                            retornarValorFecha={this.retornarValorFecha}
                            retornarValorTime={this.retornarValorTime}
                            camposDropdown={this.props.camposDropdown}
                            valoresDropdown={this.props.valoresDropdown}
                            actualizarValor={this.actualizarValor}
                            pool={this.props.pool}>
                        </Valor>
                </Modal>
                <div className={"font-18 addPointer abrirModalCrearCondicionOnHover"} onClick={this.showValorModal} style={{width: "100%",display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "3px solid #d2d2e4"}}>
                    <h4>Seleccionar Valor a Aplicar</h4>
                </div>
                <div className={"text-center"} style={{display: (this.props.mostrarOpcionSino ? "" : "none" ) }}>
                    <div className={"font-18"} style={{width: "100%", height: "20px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <h4>Seleccionar Tipo Condición</h4>
                    </div>
                    <label className="custom-control custom-radio custom-control-inline">
                        <input id="siRADIO" type="radio" name="sinoRadio" defaultChecked className="custom-control-input" onClick={() => this.props.actualizarEstadoSeleccionSinoNuevaRegla(false)}/><span className="custom-control-label">SI</span>
                    </label>
                    <label className="custom-control custom-radio custom-control-inline">
                        <input id="sinoRADIO" type="radio" name="sinoRadio" className="custom-control-input" onClick={() => this.props.actualizarEstadoSeleccionSinoNuevaRegla(true)}/><span className="custom-control-label">SINO</span>
                    </label>
                </div>
                <br/>
                { this.state.errorCreacionRegla.mostrar ? (
                    <ErrorMessage campo={this.state.errorCreacionRegla.campo} descripcion={this.state.errorCreacionRegla.descripcion} dismissTableError={this.dismissReglaNewError}> </ErrorMessage>
                ) : (
                    <span></span>
                )}
                { this.state.mensajeModal.mostrarMensaje ? (
                    <MessageModal esError={this.state.mensajeModal.esError} esConfirmar={this.state.mensajeModal.esConfirmar} dismissMessage={this.dismissMessageModal} confirmFunction={this.confirmMessageModal} titulo={this.state.mensajeModal.titulo} mensaje={this.state.mensajeModal.mensaje}> </MessageModal>
                ) : (
                    <span></span>
                )}
                <div className={"row"}>
                    <div className={"col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2"}>
                        <div id="crearButton" onMouseEnter={this.handleMouseHoverAgregar} onMouseLeave={this.handleMouseHoverExit} onClick={this.goCrear} className="border text-center addPointer">Agregar</div>
                        <div id="modificarButton" onMouseEnter={this.handleMouseHoverModificar} onMouseLeave={this.handleMouseHoverExit} onClick={this.goModificar} className="border text-center addPointer">Modificar</div>
                        <div id="eliminarButton" onMouseEnter={this.handleMouseHoverEliminar} onMouseLeave={this.handleMouseHoverExit} onClick={this.goEliminar} className="border text-center addPointer">Eliminar</div>
                    </div>
                    <div className={"col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10"} style={{display: this.state.crearSelected ?  "" : "none"}}>
                        <div className={"text-center"}>
                            <a onClick={this.verificarAccion} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Crear Condición</a>
                        </div>
                    </div>
                    <div className={"col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10"} style={{display: this.state.editarSelected ? "" : "none"}}>
                        <div className={"text-center"}>
                            <a onClick={this.verificarAccion} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Modificar Condición</a>
                        </div>
                    </div>
                    <div className={"col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10"} style={{display: this.state.eliminarSelected ? "" : "none"}}>
                        <div className={"text-center"}>
                            <a onClick={this.verificarAccion} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Eliminar</a>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}
