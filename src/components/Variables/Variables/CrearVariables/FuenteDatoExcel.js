import React from 'react';
import electron from 'electron';
import sql from 'mssql';
import XLSX from 'xlsx-style';

var variables = [];
var excel = [];
var formas = [];

const periodicidad = [ {nombre: "diario"}, {nombre: "semanal"}, {nombre: "mensual"}, {nombre: "trimestral"}, {nombre: "bi-anual"}, {nombre: "anual"} ];

var nombreArchivo = '', ubicacionArchivo = '';
var nombreVariable = '', idFormula = '', descripcionVariable = '', operacion = '', hojaExcel = '', tipoVariable = '', celdasVariable = '', periodicidadVariable = '', responsableVariable = '', categoriaVariable = '';

export default class FuenteDatoExcel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ubicacionArchivo: ubicacionArchivo,
            variables: [],
            valorPeriodicidad: '-1',
            valoresPeriodicidad: [],
            usuarios: [],
            hojas: []
        }
        this.seleccionarArchivo = this.seleccionarArchivo.bind(this);
        this.guardarUbicacionArchivo = this.guardarUbicacionArchivo.bind(this);
        this.traerArchivoID = this.traerArchivoID.bind(this);
        this.guardarVariables = this.guardarVariables.bind(this);
        this.crearVariable = this.crearVariable.bind(this);
        this.updateVariable = this.updateVariable.bind(this);
        this.deleteVariable = this.deleteVariable.bind(this);
        this.getVariables = this.getVariables.bind(this);
        this.getExcel = this.getExcel.bind(this);
        this.getFormas = this.getFormas.bind(this);
        this.verificarNoExisteNombreVar = this.verificarNoExisteNombreVar.bind(this);
        this.verificarNoExisteNombreVarUpdate = this.verificarNoExisteNombreVarUpdate.bind(this);
        this.actualizarPeriodicidad = this.actualizarPeriodicidad.bind(this);
        this.cargarDatePicker = this.cargarDatePicker.bind(this);
        this.actualizarPeriodicidadUpdate = this.actualizarPeriodicidadUpdate.bind(this);
        this.inicializarFecha = this.inicializarFecha.bind(this);
        this.isValidDate = this.isValidDate.bind(this);
        this.tieneEspaciosEnBlanco = this.tieneEspaciosEnBlanco.bind(this);

        this.getUsuarios = this.getUsuarios.bind(this);

        this.actualizarNombreArchivo = this.actualizarNombreArchivo.bind(this);
        this.actualizarNombreVariable = this.actualizarNombreVariable.bind(this);
        this.actualizarIdFormula = this.actualizarIdFormula.bind(this);
        this.actualizarDescripcionVariable = this.actualizarDescripcionVariable.bind(this);
        this.updateOperacion = this.updateOperacion.bind(this);
        this.updateHojaExcel = this.updateHojaExcel.bind(this);
        this.updateTipoVariable = this.updateTipoVariable.bind(this);
        this.actualizarCeldasVariable = this.actualizarCeldasVariable.bind(this);
        this.actualizarPeriodicidad = this.actualizarPeriodicidad.bind(this);
        this.actualizarNombreEncargado = this.actualizarNombreEncargado.bind(this);
        this.actualizarCategoriaVariable = this.actualizarCategoriaVariable.bind(this);
    }

    componentDidMount() {
        this.getVariables();
        this.getExcel();
        this.getFormas();
        this.getUsuarios();
    }

    saveBitacora (fecha, descripcion) {
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

    seleccionarArchivo () {
        var dialog = electron.remote.dialog;
        var fileExcel = null;
        fileExcel = dialog.showOpenDialog({
            title: 'Seleccione un archivo',
            filters: [{
                name: "Spreadsheets",
                extensions: "xls|xlsx|xlsm|xlsb|csv".split("|")
            }],
            properties: ['openFile']
        });
        if(fileExcel != undefined && fileExcel.length > 0) {
            var workbook = null;
            workbook = XLSX.readFile(fileExcel[0]);
            var hojas = [];
            if(workbook != null) {
                for (var i = 0; i < workbook.SheetNames.length; i++) {
                    hojas.push(workbook.SheetNames[i]);
                };
                ubicacionArchivo = fileExcel[0];
                this.setState({
                    ubicacionArchivo: fileExcel[0],
                    hojas: hojas
                });
            } else {
                this.props.showMessage("Error", "No se pudo abrir el archivo.", true, false, {});
            }
        }
    }

    guardarUbicacionArchivo () {
        var nombre = $("#nombreArchivo").val();
        if(nombre.length > 0 && nombre.length < 101) {
            if(this.state.ubicacionArchivo.length > 0 && this.state.ubicacionArchivo.length < 1001) {
                const transaction = new sql.Transaction( this.props.pool );
                transaction.begin(err => {
                    var rolledBack = false;
                    transaction.on('rollback', aborted => {
                        rolledBack = true;
                    });
                    const request = new sql.Request(transaction);
                    request.query("insert into ExcelArchivos (ubicacionArchivo, nombre) values ('"+this.state.ubicacionArchivo+"', '"+nombre+"')", (err, result) => {
                        if (err) {
                            console.log(err);
                            this.props.showMessage("Error", 'Error al guardar archivo de excel.', true, false, {});
                            if (!rolledBack) {
                                transaction.rollback(err => {
                                });
                            }
                        } else {
                            transaction.commit(err => {
                                this.props.showSuccesMessage("Éxito", 'Variable Creada.');
                                $("#nombreArchivo").val("");
                                nombreArchivo = '';
                                ubicacionArchivo = '';
                                this.setState({
                                    ubicacionArchivo: ""
                                });
                                this.traerArchivoID();
                            });
                        }
                    });
                }); // fin transaction
            } else {
                this.props.showMessage("Error", 'Ingrese un valor para la ubicación del archivo que debe ser menor a 1001 caracteres.', true, false, {});
            }
        } else {
            this.props.showMessage("Error", 'Ingrese un nombre el archivo que debe ser menor a 101 caracteres.', true, false, {});
        }
    }

    traerArchivoID () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select top 1 * from ExcelArchivos order by ID desc", (err, result) => {
                if (err) {
                    console.log(err);
                    this.props.showMessage("Error", 'Error al seleccionar ID de variable.', true, false, {});
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.guardarVariables(result.recordset[0].ID);
                    });
                }
            });
        }); // fin transaction
    }

    guardarVariables (archivoExcelID) {
        for (let i = 0; i < this.state.variables.length; i++) {
            let nombreHoja = this.state.variables[i].nombreHoja;
            let nombre = this.state.variables[i].nombre;
            let idFormula = this.state.variables[i].idFormula;
            let descripcion = this.state.variables[i].descripcion;
            let operacion = this.state.variables[i].operacion;
            let celdas = this.state.variables[i].celdas;
            let tipo = this.state.variables[i].tipo;
            let periodicidad = this.state.variables[i].periodicidad;
            let fechaInicioCalculo = this.state.variables[i].fechaInicioCalculo;
            let responsable = this.state.variables[i].responsable;
            let categoriaVariable = this.state.variables[i].categoriaVariable;
            let guardarVariable = this.state.variables[i].guardar;
            const transaction = new sql.Transaction( this.props.pool );
            transaction.begin(err => {
                var rolledBack = false;
                transaction.on('rollback', aborted => {
                    rolledBack = true;
                });
                const request = new sql.Request(transaction);
                request.query("insert into ExcelVariables (excelArchivoID, nombreHoja, nombre, idFormula, descripcion, operacion, celdas, tipo, periodicidad, fechaInicioCalculo, responsable, categoriaVariable, guardar) values ("+archivoExcelID+", '"+nombreHoja+"', '"+nombre+"', '"+idFormula+"', '"+descripcion+"', '"+operacion+"', '"+celdas+"', '"+tipo+"', '"+periodicidad+"', '"+fechaInicioCalculo.getFullYear()+"-"+(fechaInicioCalculo.getMonth()+1)+"-"+fechaInicioCalculo.getDate()+"', '"+responsable+"', '"+categoriaVariable+"', '"+guardarVariable+"')", (err, result) => {
                    if (err) {
                        console.log(err);
                        this.props.showMessage("Error", 'Error al crear variable.', true, false, {});
                        if (!rolledBack) {
                            transaction.rollback(err => {
                            });
                        }
                    } else {
                        transaction.commit(err => {
                            if(i == this.state.variables.length-1) {
                                this.setState({
                                    variables: []
                                });
                                this.getExcel();
                                this.props.getExcel();
                            }
                        });
                    }
                });
            }); // fin transaction
        };
    }

    crearVariable () {
        var nombre = $("#nombreVariable").val();
        var idFormula = $("#idFormula").val();
        var descripcion = $("#descripcionVariable").val();
        var operacion = $("#operacion").val();
        var celdas = $("#celdasVariable").val();
        var hoja = $("#hojaExcelVariable").val();
        var tipo = $("#tipoVariable").val();
        var guardarVariable;
        if ($("#guardarVariable").is(':checked'))
            guardarVariable = true;
        else
            guardarVariable = false;
        var periodicidad = $("#periodicidad").val();
        var fecha;
        if(periodicidad.localeCompare("-1") == 0)
            fecha = new Date(1964, 4, 28);
        else
            fecha = $("#fecha").datepicker('getDate');
        var responsable = $("#responsable").val();
        var categoriaVariable = $("#categoriaVariable").val();
        if(nombre.length > 0 && nombre.length < 101) {
            if(idFormula.length > 0 && idFormula.length < 101) {
                if(descripcion.length < 701) {
                    if(this.verificarNoExisteNombreVar(idFormula)) {
                        if(!this.tieneEspaciosEnBlanco(idFormula)) {
                            if(operacion.length > 0 && operacion.length < 31) {
                                if(celdas.length > 0 && celdas.length < 101) {
                                    if(hoja.length > 0 && hoja.length < 201) {
                                        if(tipo.length > 0 && tipo.length < 31) {
                                            if(periodicidad.length > 0 && periodicidad.length < 51) {
                                                if(this.isValidDate(fecha)) {
                                                    if(responsable.length > 0 && responsable.length < 101) {
                                                        if(categoriaVariable.length < 101) {
                                                            var copyTemp = [...this.state.variables];
                                                            var nuevaVar = {nombreHoja: hoja, nombre: nombre, idFormula: idFormula, descripcion: descripcion, operacion: operacion, celdas: celdas, tipo: tipo , periodicidad: periodicidad, fechaInicioCalculo: fecha, responsable: responsable, categoriaVariable: categoriaVariable, guardar: guardarVariable};
                                                            var copyTempPeriodicidad = [...this.state.valoresPeriodicidad];
                                                            copyTemp.push(nuevaVar);
                                                            copyTempPeriodicidad.push(periodicidad);
                                                            this.setState({
                                                                variables: copyTemp,
                                                                valoresPeriodicidad: copyTempPeriodicidad
                                                            });

                                                            nombreVariable = '';
                                                            idFormula = '';
                                                            descripcionVariable = '';
                                                            operacion = '';
                                                            hojaExcel = '';
                                                            tipoVariable = '';
                                                            celdasVariable = '';
                                                            periodicidadVariable = '';
                                                            responsableVariable = '';
                                                            categoriaVariable = '';

                                                            $("#nombreVariable").val("");
                                                            $("#idFormula").val("");
                                                            $("#descripcionVariable").val("");
                                                            $("#operacion").val("ASIG");
                                                            $("#hojaExcelVariable").val(this.state.hojas[0]);
                                                            $("#tipoVariable").val("numero");
                                                            $("#celdasVariable").val("");
                                                            $("#categoriaVariable").val("");
                                                            //$("#periodicidad").val("");
                                                            $("#responsable").val("-1");
                                                        } else {
                                                            this.props.showMessage("Error", 'Ingrese un valor para el valor de categoria de variable que debe ser menor a 101 caracteres.', true, false, {});
                                                        }
                                                    } else {
                                                        this.props.showMessage("Error", 'Ingrese un valor para el valor de responsable que debe ser menor a 101 caracteres.', true, false, {});
                                                    }
                                                } else {
                                                    this.props.showMessage("Error", 'Ingrese un valor para el valor de inicio de cálculo.', true, false, {});
                                                }
                                            } else {
                                                this.props.showMessage("Error", 'Ingrese un valor para el valor de periodicidad que debe ser menor a 51 caracteres.', true, false, {});
                                            }
                                        } else {
                                            this.props.showMessage("Error", 'Ingrese un valor para el valor de tipo de variable que debe ser menor a 31 caracteres.', true, false, {});
                                        }
                                    } else {
                                        this.props.showMessage("Error", 'Ingrese un valor para el valor de hoja de excel que debe ser menor a 201 caracteres.', true, false, {});
                                    }
                                } else {
                                    this.props.showMessage("Error", 'Ingrese un valor para el valor de celdas que debe ser menor a 101 caracteres.', true, false, {});
                                }
                            } else {
                                this.props.showMessage("Error", 'Ingrese un valor para el valor de operación que debe ser menor a 31 caracteres.', true, false, {});
                            }
                        } else {
                            this.props.showMessage("Error", 'El identificador de la variable en fórmula no debe contener espacios en blanco.', true, false, {});
                        }
                    } else {
                        this.props.showMessage("Error", 'El identificador de la variable en fórmula debe ser único.', true, false, {});
                    }
                } else {
                    this.props.showMessage("Error", 'La descripción de la variable debe ser menor a 701 caracteres.', true, false, {});
                }
            } else {
                this.props.showMessage("Error", 'Ingrese un valor para el identificador de la variable en fórmula que debe ser menor a 101 caracteres.', true, false, {});
            }
        } else {
            this.props.showMessage("Error", 'Ingrese un valor para el nombre de la variable que debe ser menor a 501 caracteres.', true, false, {});
        }
    }

    updateVariable (index) {
        if($("#nombreVariable"+index).length > 0 && $("#nombreVariable"+index).length < 501) {
            if($("#idFormula"+index).length > 0 && $("#idFormula"+index).length < 101) {
                if($("#descripcionVariable"+index).length < 701) {
                    if($("#operacion"+index).val().length > 0 && $("#operacion"+index).val().length < 31) {
                        if($("#celdasVariable"+index).length > 0 && $("#celdasVariable"+index).length < 101) {
                            if($("#hojaExcelVariable"+index).length > 0 && $("#hojaExcelVariable"+index).length < 201) {
                                if($("#tipoVariable"+index).val().length > 0 && $("#tipoVariable"+index).val().length < 31) {
                                    if($("#periodicidad"+index).val().length > 0 && $("#periodicidad"+index).val().length < 51) {
                                        var fecha;
                                        if($("#periodicidad"+index).val().localeCompare("-1") == 0)
                                            fecha = new Date(1964, 4, 28);
                                        else
                                            fecha = $("#fecha"+index).datepicker('getDate');
                                        if(this.isValidDate(fecha)) {
                                            if($("#responsable"+index).val().length > 0 && $("#responsable"+index).val().length < 101) {
                                                if($("#categoriaVariable"+index).val().length < 101) {
                                                    if(this.verificarNoExisteNombreVarUpdate($("#idFormula"+index).val(), index)) {
                                                        if(!this.tieneEspaciosEnBlanco($("#idFormula"+index).val())) {
                                                            var copyTemp = [...this.state.variables];
                                                            copyTemp[index].nombre = $("#nombreVariable"+index).val();
                                                            copyTemp[index].idFormula = $("#idFormula"+index).val();
                                                            copyTemp[index].descripcion = $("#descripcionVariable"+index).val();
                                                            copyTemp[index].operacion = $("#operacion"+index).val();
                                                            copyTemp[index].celdas = $("#celdasVariable"+index).val();
                                                            copyTemp[index].nombreHoja = $("#hojaExcelVariable"+index).val();
                                                            copyTemp[index].tipo = $("#tipoVariable"+index).val();
                                                            copyTemp[index].periodicidad = $("#periodicidad"+index).val();
                                                            copyTemp[index].fechaInicioCalculo = fecha;
                                                            copyTemp[index].responsable = $("#responsable"+index).val();
                                                            copyTemp[index].categoriaVariable = $("#categoriaVariable"+index).val();
                                                            var guardarVariable;
                                                            if ($("#guardarVariable"+index).is(':checked'))
                                                                guardarVariable = true;
                                                            else
                                                                guardarVariable = false;
                                                            copyTemp[index].guardar = guardarVariable;
                                                            var copyTempPeriodicidad = [...this.state.valoresPeriodicidad];
                                                            copyTempPeriodicidad[index] = $("#periodicidad"+index).val();
                                                            this.setState({
                                                                variables: copyTemp,
                                                                valoresPeriodicidad: copyTempPeriodicidad
                                                            });
                                                            this.props.showSuccesMessage("Éxito", 'Variable Modificada.');
                                                        } else {
                                                            this.props.showMessage("Error", 'El identificador de la variable en fórmula no debe contener espacios en blanco.', true, false, {});
                                                        }
                                                    } else {
                                                        this.props.showMessage("Error", 'El identificador de la variable en fórmula debe ser único.', true, false, {});
                                                    }
                                                } else {
                                                    this.props.showMessage("Error", 'Ingrese un valor para el valor de categoria de variable que debe ser menor a 101 caracteres.', true, false, {});
                                                }
                                            } else {
                                                this.props.showMessage("Error", 'Ingrese un valor para el valor de responsable que debe ser menor a 101 caracteres.', true, false, {});
                                            }
                                        } else {
                                            this.props.showMessage("Error", 'Ingrese un valor para el valor de inicio de cálculo.', true, false, {});
                                        }
                                    } else {
                                        this.props.showMessage("Error", 'Ingrese un valor para el valor de periodicidad que debe ser menor a 51 caracteres.', true, false, {});
                                    }
                                } else {
                                    this.props.showMessage("Error", 'Ingrese un valor para el valor de tipo de variable que debe ser menor a 31 caracteres.', true, false, {});
                                }
                            } else {
                                this.props.showMessage("Error", 'Ingrese un valor para el valor de hoja de excel que debe ser menor a 201 caracteres.', true, false, {});
                            }
                        } else {
                            this.props.showMessage("Error", 'Ingrese un valor para el valor de celdas que debe ser menor a 101 caracteres.', true, false, {});
                        }
                    } else {
                        this.props.showMessage("Error", 'Ingrese un valor para el valor de operación que debe ser menor a 31 caracteres.', true, false, {});
                    }
                } else {
                    this.props.showMessage("Error", 'La descripción de la variable debe ser menor a 701 caracteres.', true, false, {});
                }
            } else {
                this.props.showMessage("Error", 'Ingrese un valor para el identificador de la variable en fórmula que debe ser menor a 101 caracteres.', true, false, {});
            }
        } else {
            this.props.showMessage("Error", 'Ingrese un valor para el nombre de la variable que debe ser menor a 501 caracteres.', true, false, {});
        }
    }

    deleteVariable (index) {
        var copyTemp = [...this.state.variables];
        copyTemp.splice(index, 1);
        this.setState({
            variables: copyTemp
        });
        this.props.showSuccesMessage("Éxito", 'Variable Eliminada.');
    }

    getVariables() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Variables", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        variables = result.recordset;
                    });
                }
            });
        }); // fin transaction
    }

    getExcel() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ExcelVariables", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        excel = result.recordset;
                    });
                }
            });
        }); // fin transaction
    }

    getFormas() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from FormasVariables", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        formas = result.recordset;
                    });
                }
            });
        }); // fin transaction
    }

    verificarNoExisteNombreVar (idFormula) {
        var noExiste = true;
        for (var i = 0; i < variables.length; i++) {
            if (variables[i].idFormula.toLowerCase().localeCompare(idFormula.toLowerCase()) == 0) {
                noExiste = false;
                break;
            }
        };
        if(noExiste) {
            for (var i = 0; i < excel.length; i++) {
                if (excel[i].idFormula.toLowerCase().localeCompare(idFormula.toLowerCase()) == 0) {
                    noExiste = false;
                    break;
                }
            };
        }
        if(noExiste) {
            for (var i = 0; i < this.state.variables.length; i++) {
                if (this.state.variables[i].idFormula.toLowerCase().localeCompare(idFormula.toLowerCase()) == 0) {
                    noExiste = false;
                    break;
                }
            };
        }
        if(noExiste) {
            for (var i = 0; i < formas.length; i++) {
                if (formas[i].idFormula.toLowerCase().localeCompare(idFormula.toLowerCase()) == 0) {
                    noExiste = false;
                    break;
                }
            };
        }
        return noExiste;
    }

    verificarNoExisteNombreVarUpdate (idFormula, index) {
        var noExiste = true;
        for (var i = 0; i < variables.length; i++) {
            if (variables[i].idFormula.toLowerCase().localeCompare(idFormula.toLowerCase()) == 0) {
                noExiste = false;
                break;
            }
        };
        if(noExiste) {
            for (var i = 0; i < excel.length; i++) {
                if (excel[i].idFormula.toLowerCase().localeCompare(idFormula.toLowerCase()) == 0) {
                    noExiste = false;
                    break;
                }
            };
        }
        if(noExiste) {
            for (var i = 0; i < this.state.variables.length; i++) {
                if (this.state.variables[i].idFormula.toLowerCase().localeCompare(idFormula.toLowerCase()) == 0 && index != i) {
                    noExiste = false;
                    break;
                }
            };
        }
        if(noExiste) {
            for (var i = 0; i < formas.length; i++) {
                if (formas[i].idFormula.toLowerCase().localeCompare(idFormula.toLowerCase()) == 0) {
                    noExiste = false;
                    break;
                }
            };
        }
        return noExiste;
    }

    actualizarPeriodicidad () {
        var periodicidad = $("#periodicidad").val();
        this.setState({
            valorPeriodicidad: periodicidad
        }, this.cargarDatePicker );
    }

    cargarDatePicker () {
        $('#fecha').datepicker({
            format: "dd-mm-yyyy",
            todayHighlight: true,
            viewMode: "days", 
            minViewMode: "days",
            language: 'es'
        });
    }

    actualizarPeriodicidadUpdate (index) {
        var periodicidad = $("#periodicidad"+index).val();
        var copyTempPeriodicidad = [...this.state.valoresPeriodicidad];
        copyTempPeriodicidad[index] = periodicidad;
        this.setState({
            valorPeriodicidad: periodicidad,
            valoresPeriodicidad: copyTempPeriodicidad
        });
    }

    inicializarFecha (index, fecha) {
        if(this.state.valoresPeriodicidad[index].localeCompare("-1") != 0) {
            setTimeout(function () {
                $('#fecha'+index).datepicker({
                    format: "dd-mm-yyyy",
                    todayHighlight: true,
                    viewMode: "days", 
                    minViewMode: "days",
                    language: 'es'
                });
                if(fecha.getFullYear() == 1964 && fecha.getMonth() == 4 && fecha.getDate() == 28) {
                    //
                } else {
                    $("#fecha"+index).datepicker("setDate", fecha);
                }
            }, 500);
            return true;
        }
        return false;
    }

    isValidDate (fecha) {
        if (Object.prototype.toString.call(fecha) === "[object Date]") {
            if (isNaN(fecha.getTime())) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    tieneEspaciosEnBlanco (s) {
        return /\s/g.test(s);
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
                    });
                }
            });
        }); // fin transaction
    }

    actualizarNombreArchivo () {
        var nombreArchivoN = $("#nombreArchivo").val();
        nombreArchivo = nombreArchivoN;
    }

    actualizarNombreVariable () {
        var nombreVariableN = $("#nombreVariable").val();
        nombreVariable = nombreVariableN;
    }

    actualizarIdFormula () {
        var idFormulaN = $("#idFormula").val();
        idFormula = idFormulaN;
    }

    actualizarDescripcionVariable () {
        var descripcionVariableN = $("#descripcionVariable").val();
        descripcionVariable = descripcionVariableN;
    }

    updateOperacion () {
        var operacionN = $("#operacion").val();
        operacion = operacionN;
    }

    updateHojaExcel () {
        var hojaExcelVariableN = $("#hojaExcelVariable").val();
        hojaExcelVariable = hojaExcelVariableN;
    }

    updateTipoVariable () {
        var tipoVariableN = $("#tipoVariable").val();
        tipoVariable = tipoVariableN;
    }

    actualizarCeldasVariable () {
        var celdasVariableN = $("#celdasVariable").val();
        celdasVariable = celdasVariableN;
    }

    actualizarPeriodicidad () {
        var periodicidadVariableN = $("#periodicidadVariable").val();
        periodicidadVariable = periodicidadVariableN;
    }

    actualizarNombreEncargado () {
        var responsableVariableN = $("#responsableVariable").val();
        responsableVariable = responsableVariableN;
    }

    actualizarCategoriaVariable () {
        var categoriaVariableN = $("#categoriaVariable").val();
        categoriaVariable = categoriaVariableN;
    }

    render() {
        return (
            <div>
                <br/>
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                        <label htmlFor="nombreArchivo" className="col-form-label">Nombre del Archivo:</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <input id="nombreArchivo" defaultValue={nombreArchivo} onKeyUp={this.actualizarNombreArchivo} type="text" className="form-control form-control-sm"/>
                    </div>
                </div>
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                        <label htmlFor="ubicacionArchivo" className="col-form-label">Ubicación del Archivo:</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <p className="lead">{this.state.ubicacionArchivo}</p>
                    </div>
                </div>
                <div className={"text-center"} style={{width: "100%"}}>
                    <a href="#" className="btn btn-primary active" onClick={this.seleccionarArchivo}>Seleccionar Ubicación</a>
                </div>
                <br/>

                <div style={{width: "100%", display: (this.state.ubicacionArchivo.length > 0 ? "inline" : "none")}}>
                    <div className={"row"} style={{width: "100%"}}>
                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                            <label htmlFor="nombreVariable" className="col-form-label">Nombre de Variable:</label>
                        </div>
                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <input id="nombreVariable" defaultValue={nombreVariable} onKeyUp={this.actualizarNombreVariable} type="text" className="form-control form-control-sm"/>
                        </div>
                    </div>
                    <div className={"row"} style={{width: "100%"}}>
                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                            <label htmlFor="idFormula" className="col-form-label">Identificador de la Variable en Fórmula</label>
                        </div>
                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <input id="idFormula" defaultValue={idFormula} onKeyUp={this.actualizarIdFormula} type="text" className="form-control form-control-sm"/>
                        </div>
                    </div>
                    <div className={"row"} style={{width: "100%"}}>
                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                            <label htmlFor="descripcionVariable" className="col-form-label">Descripción de Variable:</label>
                        </div>
                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"}>
                            <textarea defaultValue={descripcionVariable} onKeyUp={this.actualizarDescripcionVariable} className="form-control" id="descripcionVariable" rows="3"></textarea>
                        </div>
                    </div>
                    <div className={"row"} style={{width: "100%"}}>
                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                            <label htmlFor="operacion" className="col-form-label">Tipo:</label>
                        </div>
                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <select id="operacion" className="form-control" defaultValue={operacion} onChange={this.updateOperacion}>
                                <option value="ASIG">Asignar</option>
                                <option value="SUM">Sumar</option>
                                <option value="PROM">Promedio</option>
                                <option value="MAX">Máximo</option>
                                <option value="MIN">Mínimo</option>
                                <option value="COUNT">Contar</option>
                            </select>
                        </div>
                    </div>
                    <div className={"row"} style={{width: "100%"}}>
                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                            <label htmlFor="hojaExcelVariable" className="col-form-label">Hoja de Excel:</label>
                        </div>
                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <select id="hojaExcelVariable" className="form-control" defaultValue={hojaExcel} onChange={this.updateHojaExcel}>
                                {this.state.hojas.map((hoja, i) =>
                                    <option value={hoja} key={hoja}>{hoja}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className={"row"} style={{width: "100%"}}>
                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                            <label htmlFor="tipoVariable" className="col-form-label">Tipo de Variable en Celda:</label>
                        </div>
                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <select id="tipoVariable" className="form-control" defaultValue={tipoVariable} onChange={this.updateTipoVariable}>
                                <option value="numero">Número</option>
                                <option value="varchar">Cadena</option>
                                <option value="date">Fecha</option>
                                <option value="bit">Booleano</option>
                            </select>
                        </div>
                    </div>
                    <div className={"row"} style={{width: "100%"}}>
                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                            <label htmlFor="celdasVariable" className="col-form-label">Celdas de Variable:</label>
                        </div>
                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <input id="celdasVariable" defaultValue={celdasVariable} onKeyUp={this.actualizarCeldasVariable} type="text" className="form-control form-control-sm"/>
                        </div>
                    </div>
                    <div className={"row"} style={{width: "100%"}}>
                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                            <label htmlFor="periodicidad" className="col-form-label">Periodicidad</label>
                        </div>
                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                            <select id="periodicidad" className="form-control" defaultValue={periodicidadVariable} onChange={this.actualizarPeriodicidad}>
                                <option value="-1">Ninguno</option>
                                {periodicidad.map((periodicidad, i) =>
                                    <option value={periodicidad.nombre} key={periodicidad.nombre}>{periodicidad.nombre}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    {
                        this.state.valorPeriodicidad.localeCompare("-1") != 0
                        ?
                            <div className={"row"} style={{width: "100%"}}>
                                <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                    <label htmlFor="fecha" className="col-form-label">Fecha de Inicio de Cálculo:</label>
                                </div>
                                <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                    <input type="text" className="form-control" id="fecha"/>
                                </div>
                            </div>
                        : null
                    }
                    <div className={"row"} style={{width: "100%"}}>
                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                            <label htmlFor="responsable" className="col-form-label">Nombre Encargado</label>
                        </div>
                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                            <select id="responsable" className="form-control" defaultValue={responsableVariable} onChange={this.actualizarNombreEncargado}>
                                <option value="-1">Ninguno</option>
                                {this.state.usuarios.map((usuario, i) =>
                                    <option value={usuario.ID} key={usuario.ID}>{usuario.usuario}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className={"row"} style={{width: "100%"}}>
                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                            <label htmlFor="categoriaVariable" className="col-form-label">Categoría de Variable</label>
                        </div>
                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <input id="categoriaVariable" defaultValue={categoriaVariable} onChange={this.actualizarCategoriaVariable} type="text" className="form-control form-control-sm"/>
                        </div>
                    </div>
                    <div className={"row"} style={{width: "100%"}}>
                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                            <label htmlFor="guardarVariable" className="col-form-label">Guardar Valores Obtenidos en Base de Datos</label>
                        </div>
                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                            <br/>
                            <div className={"switch-button switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                                <input type="checkbox" defaultChecked name={"guardarVariable"} id={"guardarVariable"}/><span>
                                <label htmlFor={"guardarVariable"}></label></span>
                            </div>
                        </div>
                    </div>
                    <div className={"text-center"} style={{width: "100%"}}>
                        <a href="#" className="btn btn-success active" onClick={this.crearVariable}>Crear Variable</a>
                    </div>
                    <br/>
                </div>

                {this.state.variables.map((variable, i) => (
                    <div key={variable.nombre+i} style={{width: "100%"}}>
                        <hr/>
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor={"nombreVariable"+i} className="col-form-label">Nombre de Variable:</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <input id={"nombreVariable"+i} type="text" defaultValue={variable.nombre} className="form-control form-control-sm"/>
                            </div>
                        </div>
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor={"idFormula"+i} className="col-form-label">Identificador de la Variable en Fórmula</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <input id={"idFormula"+i} defaultValue={variable.idFormula} type="text" className="form-control form-control-sm"/>
                            </div>
                        </div>
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                                <label htmlFor={"descripcionVariable"+i} className="col-form-label">Descripción de Variable:</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"}>
                                <textarea defaultValue={variable.descripcion} className="form-control" id={"descripcionVariable"+i} rows="3"></textarea>
                            </div>
                        </div>
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor={"operacion"+i} className="col-form-label">Operación:</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <select id={"operacion"+i} defaultValue={variable.operacion} className="form-control">
                                    <option value="ASIG">Asignar</option>
                                    <option value="SUM">Sumar</option>
                                    <option value="PROM">Promedio</option>
                                    <option value="MAX">Máximo</option>
                                    <option value="MIN">Mínimo</option>
                                    <option value="COUNT">Contar</option>
                                </select>
                            </div>
                        </div>
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor={"hojaExcelVariable"+i} className="col-form-label">Hoja de Excel:</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <select id={"hojaExcelVariable"+i} defaultValue={variable.nombreHoja} className="form-control">
                                    {this.state.hojas.map((hoja, i) =>
                                        <option value={hoja} key={hoja}>{hoja}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor={"tipoVariable"+i} className="col-form-label">Tipo de Variable en Celda:</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <select id={"tipoVariable"+i} defaultValue={variable.tipo} className="form-control">
                                    <option value="numero">Número</option>
                                    <option value="varchar">Cadena</option>
                                    <option value="date">Fecha</option>
                                    <option value="bit">Booleano</option>
                                </select>
                            </div>
                        </div>
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor={"celdasVariable"+i} className="col-form-label">Celdas de Variable:</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <input id={"celdasVariable"+i} type="text" defaultValue={variable.celdas} className="form-control form-control-sm"/>
                            </div>
                        </div>
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor={"periodicidad"+i} className="col-form-label">Periodicidad</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                <select id={"periodicidad"+i} defaultValue={variable.periodicidad} onChange={() => this.actualizarPeriodicidadUpdate(i)} className="form-control">
                                    <option value="-1">Ninguno</option>
                                    {periodicidad.map((periodicidad, i) =>
                                        <option value={periodicidad.nombre} key={periodicidad.nombre}>{periodicidad.nombre}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        {
                            this.state.valoresPeriodicidad[i].localeCompare("-1") != 0 && this.inicializarFecha(i, variable.fechaInicioCalculo)
                            ?
                                <div className={"row"} style={{width: "100%"}}>
                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                        <label htmlFor={"fecha"+i} className="col-form-label">Fecha de Inicio de Cálculo:</label>
                                    </div>
                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                        <input type="text" className="form-control" id={"fecha"+i}/>
                                    </div>
                                </div>
                            : null
                        }
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor={"responsable"+i} className="col-form-label">Nombre Encargado</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                <select id={"responsable"+i} defaultValue={variable.responsable} className="form-control">
                                    <option value="-1">Ninguno</option>
                                    {this.state.usuarios.map((usuario, i) =>
                                        <option value={usuario.ID} key={usuario.ID}>{usuario.usuario}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor={"categoriaVariable"+i} className="col-form-label">Categoría de Variable</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <input id={"categoriaVariable"+i} defaultValue={variable.categoriaVariable} type="text" className="form-control form-control-sm"/>
                            </div>
                        </div>
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor={"guardarVariable"+i} className="col-form-label">Guardar Valores Obtenidos en Base de Datos</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                <br/>
                                <div className={"switch-button switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                                    <input type="checkbox" defaultChecked={true} name={"guardarVariable"+i} id={"guardarVariable"+i}/><span>
                                    <label htmlFor={"guardarVariable"+i}></label></span>
                                </div>
                            </div>
                        </div>
                        <div className={"text-center"} style={{width: "100%"}}>
                            <a href="#" className="btn btn-success active" onClick={() => this.updateVariable(i)}>Modificar Variable</a>
                            <a href="#" className="btn btn-danger active" onClick={() => this.deleteVariable(i)} style={{marginLeft: "10px"}}>Eliminar Variable</a>
                        </div>
                    </div>
                ))}
                <br/>
                <hr/>
                <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <a href="#" className="btn btn-brand active" onClick={this.guardarUbicacionArchivo}>Guardar Configuración de Archivo de Excel</a>
                </div>
                <br/>
            </div>
        );
    }
}
