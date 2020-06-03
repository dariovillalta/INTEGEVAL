import React from 'react';
import electron from 'electron';
import sql from 'mssql';

var variables = [];
var excel = [];
var formas = [];

var agregoVariable = false;

const periodicidad = [ {nombre: "diario"}, {nombre: "semanal"}, {nombre: "mensual"}, {nombre: "trimestral"}, {nombre: "bi-anual"}, {nombre: "anual"} ];




/*
    **************************************
    **************************************
                VARIABLES CALCULO 
    **************************************
    **************************************
*/

window.arregloDeErroresExcel = [];

/*
    **************************************
    **************************************
            VARIABLES CALCULO FIN
    **************************************
    **************************************
*/

export default class FuenteDatoExcel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ubicacionArchivo: '',
            variables: [],
            valorPeriodicidad: '-1',
            valoresPeriodicidad: []
        }
        this.seleccionarArchivo = this.seleccionarArchivo.bind(this);
        this.guardarUbicacionArchivo = this.guardarUbicacionArchivo.bind(this);
        this.guardarVariablesModificar = this.guardarVariablesModificar.bind(this);
        this.traerArchivoID = this.traerArchivoID.bind(this);
        this.guardarVariablesNuevas = this.guardarVariablesNuevas.bind(this);
        this.crearVariable = this.crearVariable.bind(this);
        this.traerArchivo = this.traerArchivo.bind(this);
        this.traerVariables = this.traerVariables.bind(this);
        this.updateVariable = this.updateVariable.bind(this);
        this.deleteVariable = this.deleteVariable.bind(this);
        this.eliminarVarForma = this.eliminarVarForma.bind(this);
        this.eliminarVariable = this.eliminarVariable.bind(this);
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
        this.verificarSiExisteExcelEnResultadosHistoricosModificar = this.verificarSiExisteExcelEnResultadosHistoricosModificar.bind(this);
        this.crearTablaDeResultadoNombreModificar = this.crearTablaDeResultadoNombreModificar.bind(this);
        this.crearResultadoNombreModificar = this.crearResultadoNombreModificar.bind(this);
        this.modificarResultadosNombre = this.modificarResultadosNombre.bind(this);
        this.verificarPeriodicidadGuardarModificar = this.verificarPeriodicidadGuardarModificar.bind(this);
        this.updatePeriodicidadModificar = this.updatePeriodicidadModificar.bind(this);

        this.verificarPeriodicidad = this.verificarPeriodicidad.bind(this);
        this.addDays = this.addDays.bind(this);
        this.addMonths = this.addMonths.bind(this);
        this.addYears = this.addYears.bind(this);
        this.traerPeriodicidadVariable = this.traerPeriodicidadVariable.bind(this);
        this.crearVariablesExcel = this.crearVariablesExcel.bind(this);
        this.getArregloPosicionesExcel = this.getArregloPosicionesExcel.bind(this);
        this.getObjetoLetraNumeroCelda = this.getObjetoLetraNumeroCelda.bind(this);
        this.esLetra = this.esLetra.bind(this);
        this.toColumnLetter = this.toColumnLetter.bind(this);
        this.toColumnNumber = this.toColumnNumber.bind(this);
    }

    componentDidMount() {
        if (this.props.tipoVariableOriginal.localeCompare("excel") == 0) {
            this.traerArchivo();
        }
        this.getVariables();
        this.getExcel();
        this.getFormas();
    }

    traerArchivo () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ExcelArchivos where ID = "+this.props.idVariable, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            $("#nombreArchivo").val(result.recordset[0].nombre);
                            this.setState({
                                ubicacionArchivo: result.recordset[0].ubicacionArchivo
                            });
                            this.traerVariables();
                            agregoVariable = false;
                        }
                    });
                }
            });
        }); // fin transaction
    }

    traerVariables () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ExcelVariables where excelArchivoID = "+this.props.idVariable, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var temp = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            temp.push(result.recordset[i].periodicidad);
                        };
                        this.setState({
                            variables: result.recordset,
                            valoresPeriodicidad: temp
                        });
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
            this.setState({
                ubicacionArchivo: fileExcel[0]
            });
        }
    }

    guardarUbicacionArchivo () {
        var nombre = $("#nombreArchivo").val();
        if(nombre.length > 0 && nombre.length < 101) {
            if(this.state.ubicacionArchivo.length > 0 && this.state.ubicacionArchivo.length < 1001) {
                /*var guardar = true;
                for (var i = 0; i < this.state.variables.length; i++) {
                    if(this.state.variables[i].nombre.length > 0 && this.state.variables[i].nombre.length < 101) {
                        if(this.state.variables[i].operacion.length > 0 && this.state.variables[i].operacion.length < 31) {
                            if(this.state.variables[i].celdas.length > 0 && this.state.variables[i].celdas.length < 101) {
                                if(this.state.variables[i].nombreHoja.length > 0 && this.state.variables[i].nombreHoja.length < 201) {
                                    if(this.state.variables[i].tipo.length > 0 && this.state.variables[i].tipo.length < 31) {
                                    } else {
                                        guardar = false;
                                        alert('Ingrese un valor para el valor de tipo de variable que debe ser menor a 31 caracteres');
                                    }
                                } else {
                                    guardar = false;
                                    alert('Ingrese un valor para el valor de hoja de excel que debe ser menor a 201 caracteres');
                                }
                            } else {
                                guardar = false;
                                alert('Ingrese un valor para el valor de celdas que debe ser menor a 101 caracteres');
                            }
                        } else {
                            guardar = false;
                            alert('Ingrese un valor para el valor de operación que debe ser menor a 31 caracteres');
                        }
                    } else {
                        guardar = false;
                        alert('Ingrese un valor para la ubicación del archivo que debe ser menor a 1001 caracteres');
                    }
                };
                if(guardar) {*/
                    if (this.props.tipoVariableOriginal.localeCompare("forma") == 0) {
                        this.eliminarVarForma();
                    }
                    if (this.props.tipoVariableOriginal.localeCompare("variable") == 0) {
                        this.eliminarVariable();
                    }
                    var self = this;
                    setTimeout(function() {
                        console.log("HOLA");
                        if (self.props.tipoVariableOriginal.localeCompare("excel") != 0) {
                            const transaction = new sql.Transaction( self.props.pool );
                            transaction.begin(err => {
                                var rolledBack = false;
                                transaction.on('rollback', aborted => {
                                    rolledBack = true;
                                });
                                const request = new sql.Request(transaction);
                                request.query("insert into ExcelArchivos (ubicacionArchivo, nombre) values ('"+self.state.ubicacionArchivo+"', '"+nombre+"')", (err, result) => {
                                    if (err) {
                                        console.log(err);
                                        if (!rolledBack) {
                                            transaction.rollback(err => {
                                            });
                                        }
                                    } else {
                                        transaction.commit(err => {
                                            alert('Variable Creada');
                                            /*$("#nombreArchivo").val("");
                                            self.setState({
                                                ubicacionArchivo: ""
                                            });*/
                                            self.traerArchivoID();
                                        });
                                    }
                                });
                            }); // fin transaction
                        } else {
                            const transaction = new sql.Transaction( self.props.pool );
                            transaction.begin(err => {
                                var rolledBack = false;
                                transaction.on('rollback', aborted => {
                                    rolledBack = true;
                                });
                                const request = new sql.Request(transaction);
                                request.query("update ExcelArchivos set ubicacionArchivo = '"+self.state.ubicacionArchivo+"', nombre = '"+nombre+"' where ID = "+self.props.idVariable, (err, result) => {
                                    if (err) {
                                        console.log(err);
                                        if (!rolledBack) {
                                            transaction.rollback(err => {
                                            });
                                        }
                                    } else {
                                        transaction.commit(err => {
                                            alert('Variable Modificada');
                                            /*$("#nombreArchivo").val("");
                                            self.setState({
                                                ubicacionArchivo: ""
                                            });*/
                                            self.guardarVariablesModificar();
                                        });
                                    }
                                });
                            }); // fin transaction
                        }
                    }, 500);
                //}
            } else {
                alert('Ingrese un valor para la ubicación del archivo que debe ser menor a 1001 caracteres');
            }
        } else {
            alert('Ingrese un nombre el archivo que debe ser menor a 101 caracteres');
        }
    }

    guardarVariablesModificar () {
        let transaction1 = new sql.Transaction( this.props.pool );
        transaction1.begin(err => {
            var rolledBack = false;
            transaction1.on('rollback', aborted => {
                rolledBack = true;
            });
            let request = new sql.Request(transaction1);
            request.query("DELETE FROM ExcelVariables WHERE excelArchivoID = "+this.props.idVariable, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction1.rollback(err => {
                        });
                    }
                } else {
                    transaction1.commit(err => {
                        console.log("BORRO")
                    });
                }
            });
        });
        var self = this;
        setTimeout(function() {
            for (var i = 0; i < self.state.variables.length; i++) {
                let nombreHoja = self.state.variables[i].nombreHoja;
                let nombre = self.state.variables[i].nombre;
                let operacion = self.state.variables[i].operacion;
                let celdas = self.state.variables[i].celdas;
                let tipo = self.state.variables[i].tipo;
                let periodicidad = self.state.variables[i].periodicidad;
                let fechaInicioCalculo = self.state.variables[i].fechaInicioCalculo;
                let analista = self.state.variables[i].analista;
                let guardarVariable = self.state.variables[i].guardar;
                console.log("this.state.variables")
                console.log(self.state.variables[i])
                let transaction = new sql.Transaction( self.props.pool );
                transaction.begin(err => {
                    var rolledBack = false;
                    transaction.on('rollback', aborted => {
                        rolledBack = true;
                    });
                    let request = new sql.Request(transaction);
                    request.query("insert into ExcelVariables (excelArchivoID, nombreHoja, nombre, operacion, celdas, tipo, periodicidad, fechaInicioCalculo, analista, guardar) values ("+self.props.idVariable+", '"+nombreHoja+"','"+nombre+"', '"+operacion+"', '"+celdas+"', '"+tipo+"', '"+periodicidad+"', '"+fechaInicioCalculo.getFullYear()+"-"+(fechaInicioCalculo.getMonth()+1)+"-"+fechaInicioCalculo.getDate()+"', '"+analista+"', '"+guardarVariable+"')", (err, result) => {
                        if (err) {
                            console.log(err);
                            if (!rolledBack) {
                                transaction.rollback(err => {
                                });
                            }
                        } else {
                            transaction.commit(err => {
                                if(i == self.state.variables.length-1) {
                                    self.traerArchivo();
                                    self.getExcel();
                                }
                                console.log("this.state")
                                if(agregoVariable) {
                                    self.verificarSiExisteExcelEnResultadosHistoricosModificar(nombre);
                                }
                            });
                        }
                    });
                }); // fin transaction
            };
        }, 500);
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
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.guardarVariablesNuevas(result.recordset[0].ID);
                    });
                }
            });
        }); // fin transaction
    }

    guardarVariablesNuevas (archivoExcelID) {
        for (let i = 0; i < this.state.variables.length; i++) {
            let nombreHoja = this.state.variables[i].nombreHoja;
            let nombre = this.state.variables[i].nombre;
            let operacion = this.state.variables[i].operacion;
            let celdas = this.state.variables[i].celdas;
            let tipo = this.state.variables[i].tipo;
            let periodicidad = this.state.variables[i].periodicidad;
            let fechaInicioCalculo = this.state.variables[i].fechaInicioCalculo;
            let analista = this.state.variables[i].analista;
            let guardarVariable = this.state.variables[i].guardar;
            const transaction = new sql.Transaction( this.props.pool );
            transaction.begin(err => {
                var rolledBack = false;
                transaction.on('rollback', aborted => {
                    rolledBack = true;
                });
                const request = new sql.Request(transaction);
                request.query("insert into ExcelVariables (excelArchivoID, nombreHoja, nombre, operacion, celdas, tipo, periodicidad, fechaInicioCalculo, analista, guardar) values ("+archivoExcelID+", '"+nombreHoja+"', '"+nombre+"', '"+operacion+"', '"+celdas+"', '"+tipo+"', '"+periodicidad+"', '"+fechaInicioCalculo.getFullYear()+"-"+(fechaInicioCalculo.getMonth()+1)+"-"+fechaInicioCalculo.getDate()+"', '"+analista+"', '"+guardarVariable+"')", (err, result) => {
                    if (err) {
                        console.log(err);
                        if (!rolledBack) {
                            transaction.rollback(err => {
                            });
                        }
                    } else {
                        transaction.commit(err => {
                            if(i == this.state.variables.length-1) {
                                this.props.actualizarIDVariableModificada("excel");
                                this.getExcel();
                            }
                            if(agregoVariable) {
                                this.verificarSiExisteExcelEnResultadosHistoricosModificar(this.state.variables[i]);
                            }
                        });
                    }
                });
            }); // fin transaction
        };
    }

    crearVariable () {
        var nombre = $("#nombreVariable").val();
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
        var analista = $("#analista").val();
        if(nombre.length > 0 && nombre.length < 101) {
            if(this.verificarNoExisteNombreVar(nombre)) {
                if(operacion.length > 0 && operacion.length < 31) {
                    if(celdas.length > 0 && celdas.length < 101) {
                        if(hoja.length > 0 && hoja.length < 201) {
                            if(tipo.length > 0 && tipo.length < 31) {
                                if(periodicidad.length > 0 && periodicidad.length < 51) {
                                    if(this.isValidDate(fecha)) {
                                        if(analista.length > 0 && analista.length < 101) {
                                            var copyTemp = [...this.state.variables];
                                            var nuevaVar = {nombreHoja: hoja, nombre: nombre, operacion: operacion, celdas: celdas, tipo: tipo , periodicidad: periodicidad, fechaInicioCalculo: fecha, analista: analista, guardar: guardarVariable};
                                            copyTemp.push(nuevaVar);
                                            var copyTempPeriodicidad = [...this.state.valoresPeriodicidad];
                                            copyTempPeriodicidad.push(periodicidad);
                                            this.setState({
                                                variables: copyTemp,
                                                valoresPeriodicidad: copyTempPeriodicidad
                                            });
                                            $("#nombreVariable").val("");
                                            $("#operacion").val("ASIG");
                                            $("#hojaExcelVariable").val("");
                                            $("#tipoVariable").val("numero");
                                            $("#celdasVariable").val("");
                                            //$("#periodicidad").val("");
                                            $("#analista").val("");
                                            agregoVariable = true;
                                        } else {
                                            alert('Ingrese un valor para el valor de analista que debe ser menor a 101 caracteres');
                                        }
                                    } else {
                                        alert('Ingrese un valor para el valor de inicio de cálculo.');
                                    }
                                } else {
                                    alert('Ingrese un valor para el valor de periodicidad que debe ser menor a 51 caracteres');
                                }
                            } else {
                                alert('Ingrese un valor para el valor de tipo de variable que debe ser menor a 31 caracteres');
                            }
                        } else {
                            alert('Ingrese un valor para el valor de hoja de excel que debe ser menor a 201 caracteres');
                        }
                    } else {
                        alert('Ingrese un valor para el valor de celdas que debe ser menor a 101 caracteres');
                    }
                } else {
                    alert('Ingrese un valor para el valor de operación que debe ser menor a 31 caracteres');
                }
            } else {
                alert('El nombre de la variable debe ser único.');
            }
        } else {
            alert('Ingrese un valor para la ubicación del archivo que debe ser menor a 1001 caracteres');
        }
    }

    updateVariable (index) {
        alert($("#hojaExcelVariable"+index).val())
        alert($("#celdasVariable"+index).val())
        if($("#nombreVariable"+index).length > 0 && $("#nombreVariable"+index).length < 101) {
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
                                    if($("#analista"+index).val().length > 0 && $("#analista"+index).val().length < 101) {
                                        if(this.verificarNoExisteNombreVarUpdate($("#nombreVariable"+index).val(), index)) {
                                            var copyTemp = [...this.state.variables];
                                            copyTemp[index].nombre = $("#nombreVariable"+index).val();
                                            copyTemp[index].operacion = $("#operacion"+index).val();
                                            copyTemp[index].celdas = $("#celdasVariable"+index).val();
                                            copyTemp[index].nombreHoja = $("#hojaExcelVariable"+index).val();
                                            copyTemp[index].tipo = $("#tipoVariable"+index).val();
                                            copyTemp[index].periodicidad = $("#periodicidad"+index).val();
                                            copyTemp[index].fechaInicioCalculo = fecha;
                                            copyTemp[index].analista = $("#analista"+index).val();
                                            var guardarVariable;
                                            if ($("#guardarVariable"+index).is(':checked'))
                                                guardarVariable = true;
                                            else
                                                guardarVariable = false;
                                            var copyTempPeriodicidad = [...this.state.valoresPeriodicidad];
                                            copyTempPeriodicidad[index] = $("#periodicidad"+index).val();
                                            copyTemp[index].guardar = guardarVariable;
                                            this.setState({
                                                variables: copyTemp,
                                                valoresPeriodicidad: copyTempPeriodicidad
                                            });
                                            agregoVariable = true;
                                            alert("Variable Modificada");
                                        } else {
                                            alert('El nombre de la variable debe ser único.');
                                        }
                                    } else {
                                        alert('Ingrese un valor para el valor de analista que debe ser menor a 101 caracteres');
                                    }
                                } else {
                                    alert('Ingrese un valor para el valor de inicio de cálculo.');
                                }
                            } else {
                                alert('Ingrese un valor para el valor de periodicidad que debe ser menor a 51 caracteres');
                            }
                        } else {
                            alert('Ingrese un valor para el valor de tipo de variable que debe ser menor a 31 caracteres');
                        }
                    } else {
                        alert('Ingrese un valor para el valor de hoja de excel que debe ser menor a 201 caracteres');
                    }
                } else {
                    alert('Ingrese un valor para el valor de celdas que debe ser menor a 101 caracteres');
                }
            } else {
                alert('Ingrese un valor para el valor de operación que debe ser menor a 31 caracteres');
            }
        } else {
            alert('Ingrese un valor para la ubicación del archivo que debe ser menor a 1001 caracteres');
        }
    }

    deleteVariable (index) {
        var copyTemp = [...this.state.variables];
        copyTemp.splice(index, 1);
        this.setState({
            variables: copyTemp
        });
        agregoVariable = true;
    }

    eliminarVarForma () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("DELETE FROM FormasVariables WHERE ID = "+this.props.idVariable, (err, result) => {
                if (err) {
                    console.log(err);
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

    eliminarVariable () {
        const transaction1 = new sql.Transaction( this.props.pool );
        transaction1.begin(err => {
            var rolledBack = false;
            transaction1.on('rollback', aborted => {
                rolledBack = true;
            });
            const request1 = new sql.Request(transaction1);
            request1.query("DELETE FROM Variables WHERE ID = "+this.props.idVariable, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction1.rollback(err => {
                        });
                    }
                } else {
                    transaction1.commit(err => {
                    });
                }
            });
        }); // fin transaction1
        const transaction2 = new sql.Transaction( this.props.pool );
        transaction2.begin(err => {
            var rolledBack = false;
            transaction2.on('rollback', aborted => {
                rolledBack = true;
            });
            const request2 = new sql.Request(transaction2);
            request2.query("DELETE FROM VariablesCampos WHERE variableID = "+this.props.idVariable, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction2.rollback(err => {
                        });
                    }
                } else {
                    transaction2.commit(err => {
                    });
                }
            });
        }); // fin transaction2
        const transaction3 = new sql.Transaction( this.props.pool );
        transaction3.begin(err => {
            var rolledBack = false;
            transaction3.on('rollback', aborted => {
                rolledBack = true;
            });
            const request3 = new sql.Request(transaction3);
            request3.query("DELETE FROM FormulasVariablesCampos WHERE variableID = "+this.props.idVariable, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction3.rollback(err => {
                        });
                    }
                } else {
                    transaction3.commit(err => {
                    });
                }
            });
        }); // fin transaction3
        const transaction4 = new sql.Transaction( this.props.pool );
        transaction4.begin(err => {
            var rolledBack = false;
            transaction4.on('rollback', aborted => {
                rolledBack = true;
            });
            const request4 = new sql.Request(transaction4);
            request4.query("DELETE FROM ElementoFormulasVariablesCampos WHERE variableID = "+this.props.idVariable, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction4.rollback(err => {
                        });
                    }
                } else {
                    transaction4.commit(err => {
                    });
                }
            });
        }); // fin transaction4
        const transaction5 = new sql.Transaction( this.props.pool );
        transaction5.begin(err => {
            var rolledBack = false;
            transaction5.on('rollback', aborted => {
                rolledBack = true;
            });
            const request5 = new sql.Request(transaction5);
            request5.query("DELETE FROM SegmentoReglasVariables WHERE variableID = "+this.props.idVariable, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction5.rollback(err => {
                        });
                    }
                } else {
                    transaction5.commit(err => {
                    });
                }
            });
        }); // fin transaction5
        const transaction6 = new sql.Transaction( this.props.pool );
        transaction6.begin(err => {
            var rolledBack = false;
            transaction6.on('rollback', aborted => {
                rolledBack = true;
            });
            const request6 = new sql.Request(transaction6);
            request6.query("DELETE FROM ReglasVariables WHERE variableID = "+this.props.idVariable, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction6.rollback(err => {
                        });
                    }
                } else {
                    transaction6.commit(err => {
                    });
                }
            });
        }); // fin transaction6
        const transaction7 = new sql.Transaction( this.props.pool );
        transaction7.begin(err => {
            var rolledBack = false;
            transaction7.on('rollback', aborted => {
                rolledBack = true;
            });
            const request7 = new sql.Request(transaction7);
            request7.query("delete from InstruccionSQL WHERE variableID = "+this.props.idVariable, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction7.rollback(err => {
                        });
                    }
                } else {
                    transaction7.commit(err => {
                    });
                }
            });
        }); // fin transaction7
        const transaction8 = new sql.Transaction( this.props.pool );
        transaction8.begin(err => {
            var rolledBack = false;
            transaction8.on('rollback', aborted => {
                rolledBack = true;
            });
            const request8 = new sql.Request(transaction8);
            request8.query("delete from InstruccionSQLCampos where variableID = "+this.props.idVariable, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        contadorObjetosGuardados++;
                        transaction8.rollback(err => {
                        });
                    }
                } else {
                    transaction8.commit(err => {
                        //this.props.terminoCrearCampo(variable, variableCampo);
                    });
                }
            });
        }); // fin transaction8
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

    verificarNoExisteNombreVar (nombre) {
        var noExiste = true;
        for (var i = 0; i < variables.length; i++) {
            if (variables[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
                noExiste = false;
                break;
            }
        };
        if(noExiste) {
            for (var i = 0; i < excel.length; i++) {
                if(this.props.tipoVariableOriginal.localeCompare("excel") == 0) {
                    if (excel[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0 && excel[i].ID != this.props.idVariable) {
                        noExiste = false;
                        break;
                    }
                } else {
                    if (excel[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
                        noExiste = false;
                        break;
                    }
                }
            };
        }
        if(noExiste) {
            for (var i = 0; i < formas.length; i++) {
                if (formas[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
                    noExiste = false;
                    break;
                }
            };
        }
        return noExiste;
    }

    verificarNoExisteNombreVarUpdate (nombre, index) {
        var noExiste = true;
        for (var i = 0; i < variables.length; i++) {
            if (variables[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
                noExiste = false;
                break;
            }
        };
        /*if(noExiste) {
            for (var i = 0; i < excel.length; i++) {
                if(this.props.tipoVariableOriginal.localeCompare("excel") == 0) {
                    if (excel[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0 && excel[i].ID != this.props.idVariable) {
                        noExiste = false;
                        break;
                    }
                } else {
                    if (excel[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
                        noExiste = false;
                        break;
                    }
                }
            };
        }*/
        if(noExiste) {
            for (var i = 0; i < this.state.variables.length; i++) {
                if (this.state.variables[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0 && index != i) {
                    noExiste = false;
                    break;
                }
            };
        }
        if(noExiste) {
            for (var i = 0; i < formas.length; i++) {
                if (formas[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
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
                    console.log('YEAAAH')
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
    
    verificarSiExisteExcelEnResultadosHistoricosModificar (variable) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ResultadosNombreVariables where nombreVariable = '"+variable.nombre+"' and finVigencia = '1964-05-28'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if (result.recordset.length == 0) {
                            //this.crearTablaDeResultadoNombreModificar(variable);
                        } else {
                            console.log("ENCONTRO")
                            console.log(result.recordset[0])
                            this.modificarResultadosNombre(variable, result.recordset[0].inicioVigencia);
                        }
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaDeResultadoNombreModificar (variable) {
        //NOMBRE TABLA: NOMBREVARIABLE_AÑOVIGENCIA_MESVIGENCIA_DIAVIGENCIA_HORAVIGENCIA_MINUTOSVIGENCIA_SEGUNDOSVIGENCIA
        //VIGENCIA: DIA CREACION
        let hoy = new Date();
        var textoCreacionTabla = 'CREATE TABLE '+variable.nombre+'_'+hoy.getFullYear()+'_'+(hoy.getMonth()+1)+'_'+hoy.getDate()+'_'+hoy.getHours()+'_'+hoy.getMinutes()+'_'+hoy.getSeconds()+' ( ID int IDENTITY(1,1) PRIMARY KEY, ';
        for (var i = 0; i < variable.variables.length; i++) {
            if(i != 0)
                textoCreacionTabla += ', ';
            if(variable.variables[i].tipo.localeCompare("numero") == 0) {
                textoCreacionTabla += variable.variables[i].nombre+' decimal(22,4)';
            } else if(variable.variables[i].tipo.localeCompare("varchar") == 0) {
                textoCreacionTabla += variable.variables[i].nombre+' varchar(1000)';
            } else if(variable.variables[i].tipo.localeCompare("bit") == 0) {
                textoCreacionTabla += variable.variables[i].nombre+' bit';
            } else if(variable.variables[i].tipo.localeCompare("date") == 0) {
                textoCreacionTabla += variable.variables[i].nombre+' date';
            }
        };
        textoCreacionTabla += ', f3ch4Gu4rd4do date )';
        console.log('textoCreacionTabla')
        console.log(textoCreacionTabla)
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query(textoCreacionTabla, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        //console.log("Tabla "+variable.nombre+'_'+hoy.getFullYear()+'_'+hoy.getMonth()+'_'+hoy.getDate()+'_'+hoy.getHours()+'_'+hoy.getMinutes()+'_'+hoy.getSeconds()+" creada.");
                        console.log('CREO TABLA');
                        this.crearResultadoNombreModificar(variable, hoy);
                    });
                }
            });
        }); // fin transaction
    }

    crearResultadoNombreModificar (variable, hoy) {
        console.log('INICAR CREAR RESULTADO');
        let mes = hoy.getMonth()+1;
        if(mes.toString().length == 1)
            mes = '0'+mes;
        let dia = hoy.getDate();
        if(dia.toString().length == 1)
            dia = '0'+dia;
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into ResultadosNombreVariables (nombreVariable, inicioVigencia, finVigencia) values ('"+variable.nombre+"', '"+hoy.getFullYear()+'-'+mes+'-'+dia+" "+hoy.getHours()+":"+hoy.getMinutes()+":"+hoy.getSeconds()+"', '1964-05-28')", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log('GUARDO RESULTADO');
                        this.verificarPeriodicidadGuardarModificar(variable, "excel", hoy);
                    });
                }
            });
        }); // fin transaction
    }

    modificarResultadosNombre (resultado, variable, hoy)  {
        console.log('MODIFICAR CREAR RESULTADO');
        let mes = hoy.getMonth()+1;
        if(mes.toString().length == 1)
            mes = '0'+mes;
        let dia = hoy.getDate();
        if(dia.toString().length == 1)
            dia = '0'+dia;
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("update ResultadosNombreVariables set finVigencia = '"+hoy.getFullYear()+'-'+mes+'-'+dia+" "+hoy.getHours()+"' where ID = "+resultado.ID, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log('GUARDO RESULTADO');
                        this.crearTablaDeResultadoNombreModificar(variable);
                    });
                }
            });
        }); // fin transaction
    }

    verificarPeriodicidadGuardarModificar (variable, tabla, hoy) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from PeriodicidadCalculo where variableID = "+variable.ID+" and tablaVariable = '"+tabla+"'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            this.updatePeriodicidadModificar(variable, tabla, hoy);
                        }/* else {
                            this.guardarPeriodicidad(variable, tabla, hoy);
                        }*/
                    });
                }
            });
        }); // fin transaction
    }

    updatePeriodicidadModificar (variable, tabla, hoy) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("update PeriodicidadCalculo where variableID = "+variable.ID+" and tablaVariable = '"+tabla+"' set fechaUltimoCalculo = '1964-05-28'", (err, result) => {
                if (err) {
                    console.log(err);
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











































    /*
        **************************************
        **************************************
                    CALCULO CODIGO
        **************************************
        **************************************
    */

    verificarPeriodicidad () {
        for (var j = 0; j < this.state.variables.length; j++) {
            this.traerPeriodicidadVariable(this.state.variables[j], "excel", arregloDeExcel, j, null);
        };
    }

    addDays (fecha, days) {
        var date = new Date(fecha);
        date.setDate(date.getDate() + days);
        return date;
    }

    addMonths (fecha, months) {
        var date = new Date(fecha);
        date.setMonth(date.getMonth() + months);
        return date;
    }

    addYears (fecha, years) {
        var date = new Date(fecha);
        date.setYear(date.getYear() + years);
        return date;
    }

    traerPeriodicidadVariable (variable, tabla, arreglo, indexI, indexJ) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from PeriodicidadCalculo where variableID = "+variable.ID+" and tablaVariable = '"+tabla+"'", (err, result) => {
                if (err) {
                    console.log(err);
                    this.verificarFinPeriodicidad();
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            var fechaInicioCalculo = variable.fechaInicioCalculo;
                            var fechaUltimoCalculo = result.recordset[0].fechaUltimoCalculo;
                            var tieneUltimoCalculo = false;
                            //si la fecha es null, realizar calculo (28, 4, 1964) POPS BIRTHDAY
                            if(fechaUltimoCalculo.getFullYear() != 1964 && fechaUltimoCalculo.getMonth() != 4 && fechaUltimoCalculo.getDate() != 28) {
                                tieneUltimoCalculo = true;
                            }
                            if(!tieneUltimoCalculo) {
                                if(indexJ != null)
                                    arreglo[indexI].variables[indexJ].realizarCalculo = true;
                                else
                                    arreglo[indexI].realizarCalculo = true;
                            } else {
                                var ultimoCalculoVigente = false;
                                var periodicidad = variable.periodicidad;
                                var fechaSiguienteCalculo = new Date(fechaInicioCalculo);
                                while(fechaSiguienteCalculo.getFullYear() < fechaUltimoCalculo.getFullYear() && fechaSiguienteCalculo.getMonth() < fechaUltimoCalculo.getMonth() && fechaSiguienteCalculo.getDate() < fechaUltimoCalculo.getDate()) {
                                    if(periodicidad.localeCompare("diario") == 0) {
                                        fechaSiguienteCalculo = this.addDays(fechaSiguienteCalculo, 1);
                                    } else if(periodicidad.localeCompare("semanal") == 0) {
                                        fechaSiguienteCalculo = this.addDays(fechaSiguienteCalculo, 7);
                                    } else if(periodicidad.localeCompare("mensual") == 0) {
                                        fechaSiguienteCalculo = this.addMonths(fechaSiguienteCalculo, 1);
                                    } else if(periodicidad.localeCompare("trimestral") == 0) {
                                        fechaSiguienteCalculo = this.addMonths(fechaSiguienteCalculo, 3);
                                    } else if(periodicidad.localeCompare("bi-anual") == 0) {
                                        fechaSiguienteCalculo = this.addMonths(fechaSiguienteCalculo, 6);
                                    } else if(periodicidad.localeCompare("anual") == 0) {
                                        fechaSiguienteCalculo = this.addYears(fechaSiguienteCalculo, 1);
                                    }
                                }
                                var tocaNuevoCalculo = false;
                                if(periodicidad.localeCompare("diario") == 0) {
                                    if(fechaSiguienteCalculo.getDate() >= fechaUltimoCalculo.getDate()+1) {
                                        tocaNuevoCalculo = true;
                                    }
                                } else if(periodicidad.localeCompare("semanal") == 0) {
                                    if(fechaSiguienteCalculo.getDate() >= fechaUltimoCalculo.getDate()+7) {
                                        tocaNuevoCalculo = true;
                                    }
                                } else if(periodicidad.localeCompare("mensual") == 0) {
                                    if(fechaSiguienteCalculo.getMonth() >= fechaUltimoCalculo.getMonth()+1) {
                                        tocaNuevoCalculo = true;
                                    }
                                } else if(periodicidad.localeCompare("trimestral") == 0) {
                                    if(fechaSiguienteCalculo.getMonth() >= fechaUltimoCalculo.getMonth()+3) {
                                        tocaNuevoCalculo = true;
                                    }
                                } else if(periodicidad.localeCompare("bi-anual") == 0) {
                                    if(fechaSiguienteCalculo.getMonth() >= fechaUltimoCalculo.getMonth()+6) {
                                        tocaNuevoCalculo = true;
                                    }
                                } else if(periodicidad.localeCompare("anual") == 0) {
                                    if(fechaSiguienteCalculo.getFullYear() >= fechaUltimoCalculo.getFullYear()+1) {
                                        tocaNuevoCalculo = true;
                                    }
                                }
                                if(tocaNuevoCalculo) {
                                    if(indexJ != null)
                                        arreglo[indexI].variables[indexJ].realizarCalculo = true;
                                    else
                                        arreglo[indexI].realizarCalculo = true;
                                } else {
                                    if(indexJ != null)
                                        arreglo[indexI].variables[indexJ].realizarCalculo = false;
                                    else
                                        arreglo[indexI].realizarCalculo = false;
                                }
                            }
                        } else {
                            if(indexJ != null)
                                arreglo[indexI].variables[indexJ].realizarCalculo = true;
                            else
                                arreglo[indexI].realizarCalculo = true;
                        }
                        this.crearVariablesExcel();
                    });
                }
            });
        }); // fin transaction
    }

    crearVariablesExcel () {
        var workbook = null;
        workbook = XLSX.readFile(this.state.ubicacionArchivo);
        if(workbook != null) {
            for (var j = 0; j < this.state.variables.length; j++) {
                for (var k = 0; k < workbook.SheetNames.length; k++) {
                    if (workbook.SheetNames[k].localeCompare(this.state.variables[j].nombreHoja) == 0) {
                        break;
                    }
                };
                var sheet = workbook.Sheets[workbook.SheetNames[k]];
                if(sheet != null && this.state.variables[j].realizarCalculo) {
                    try {
                        var arregloPosicionesExcel = this.getArregloPosicionesExcel(this.state.variables[j].celdas);
                        if(arregloPosicionesExcel.length == 1) {
                            var variable;
                            if(this.state.variables[j].tipo.localeCompare('numero') == 0 && sheet[arregloPosicionesExcel[0]].t.localeCompare('n') == 0) {
                                variable = parseFloat(sheet[arregloPosicionesExcel[0]].v);
                            } else if(this.state.variables[j].tipo.localeCompare('bit') == 0 && sheet[arregloPosicionesExcel[0]].t.localeCompare('b') == 0) {
                                variable = sheet[arregloPosicionesExcel[0]].v;
                            } else if(this.state.variables[j].tipo.localeCompare('varchar') == 0 && sheet[arregloPosicionesExcel[0]].t.localeCompare('s') == 0) {
                                variable = sheet[arregloPosicionesExcel[0]].v;
                            } else if(this.state.variables[j].tipo.localeCompare('date') == 0 && sheet[arregloPosicionesExcel[0]].t.localeCompare('d') == 0) {
                                variable = new Date(sheet[arregloPosicionesExcel[0]].v);
                            }
                            window["'"+this.state.variables[j].nombre+"'"] = variable;
                        } else if(arregloPosicionesExcel.length > 1 && this.state.variables[j].operacion.localeCompare("ASIG") == 0) {
                            if(this.state.variables[j].tipo.localeCompare('numero') == 0) {
                                window["'"+this.state.variables[j].nombre+"'"] = [];
                                for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                    var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                                    window["'"+this.state.variables[j].nombre+"'"].push(variable);
                                };
                            } else if(this.state.variables[j].tipo.localeCompare('bit') == 0) {
                                window["'"+this.state.variables[j].nombre+"'"] = [];
                                for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                    var variable = sheet[arregloPosicionesExcel[k]].v;
                                    window["'"+this.state.variables[j].nombre+"'"].push(variable);
                                };
                            } else if(this.state.variables[j].tipo.localeCompare('varchar') == 0) {
                                window["'"+this.state.variables[j].nombre+"'"] = [];
                                for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                    var variable = sheet[arregloPosicionesExcel[k]].v;
                                    window["'"+this.state.variables[j].nombre+"'"].push(variable);
                                };
                            } else if(this.state.variables[j].tipo.localeCompare('date') == 0) {
                                window["'"+this.state.variables[j].nombre+"'"] = [];
                                for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                    var variable = new Date(sheet[arregloPosicionesExcel[k]].v);
                                    window["'"+this.state.variables[j].nombre+"'"].push(variable);
                                };
                            }
                        } else if(arregloPosicionesExcel.length > 1) {
                            if(this.state.variables[j].tipo.localeCompare("numero") == 0 && this.state.variables[j].operacion.localeCompare("SUM") == 0) {
                                var suma = 0;
                                for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                    var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                                    suma+=variable;
                                };
                                window["'"+this.state.variables[j].nombre+"'"] = suma;
                            } else if(this.state.variables[j].tipo.localeCompare("numero") == 0 && this.state.variables[j].operacion.localeCompare("PROM") == 0) {
                                var suma = 0;
                                for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                    var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                                    suma+=variable;
                                };
                                var promedio = suma / arregloPosicionesExcel.length;
                                window["'"+this.state.variables[j].nombre+"'"] = promedio;
                            } else if(this.state.variables[j].operacion.localeCompare("MAX") == 0) {
                                if(this.state.variables[j].tipo.localeCompare("numero") == 0) {
                                    var max = 0;
                                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                        var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                                        if(k == 0)
                                            max = variable;
                                        if (max < variable) {
                                            max = variable;
                                        }
                                    };
                                    window["'"+this.state.variables[j].nombre+"'"] = max;
                                }
                                if(this.state.variables[j].tipo.localeCompare("date") == 0) {
                                    var max = new Date(1900, 1, 1);
                                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                        var variable = new Date(sheet[arregloPosicionesExcel[k]].v);
                                        if(k == 0)
                                            max = variable;
                                        if (max.getTime() < variable.getTime()) {
                                            max = variable;
                                        }
                                    };
                                    window["'"+this.state.variables[j].nombre+"'"] = max;
                                }
                            } else if(this.state.variables[j].operacion.localeCompare("MIN") == 0) {
                                if(this.state.variables[j].tipo.localeCompare("numero") == 0) {
                                    var min = 0;
                                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                        var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                                        if(k == 0)
                                            min = variable;
                                        if (min > variable) {
                                            min = variable;
                                        }
                                    };
                                    window["'"+this.state.variables[j].nombre+"'"] = min;
                                }
                                if(this.state.variables[j].tipo.localeCompare("date") == 0) {
                                    var min = new Date(1900, 1, 1);
                                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                        var variable = new Date(sheet[arregloPosicionesExcel[k]].v);
                                        if(k == 0)
                                            min = variable;
                                        if (min.getTime() > variable.getTime()) {
                                            min = variable;
                                        }
                                    };
                                    window["'"+this.state.variables[j].nombre+"'"] = min;
                                }
                            } else if(this.state.variables[j].operacion.localeCompare("COUNT") == 0) {
                                if(this.state.variables[j].tipo.localeCompare("numero") == 0) {
                                    var count = 0;
                                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                        var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                                        if(!isNaN(variable))
                                            count++;
                                    };
                                    window["'"+this.state.variables[j].nombre+"'"] = count;
                                }
                                if(this.state.variables[j].tipo.localeCompare("date") == 0) {
                                    var count = 0;
                                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                        var variable = new Date(sheet[arregloPosicionesExcel[k]].v);
                                        if(this.isValidDate(variable))
                                            count++;
                                    };
                                    window["'"+this.state.variables[j].nombre+"'"] = count;
                                }
                                if(this.state.variables[j].tipo.localeCompare("varchar") == 0) {
                                    var count = 0;
                                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                        var variable = sheet[arregloPosicionesExcel[k]].v;
                                        if(variable.length > 0)
                                            count++;
                                    };
                                    window["'"+this.state.variables[j].nombre+"'"] = count;
                                }
                                if(this.state.variables[j].tipo.localeCompare("bit") == 0) {
                                    var count = 0;
                                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                                        var variable = sheet[arregloPosicionesExcel[k]].v;
                                        if(variable != undefined)
                                            count++;
                                    };
                                    window["'"+this.state.variables[j].nombre+"'"] = count;
                                }
                            }
                        }
                        this.verificarSiExisteExcelEnResultadosHistoricos(this.state.variables[j]);
                    } catch(err) {
                        console.log(err.message);
                        arregloDeErroresExcel.push({nombre: this.state.variables[j].nombre });
                    }
                } else if (!this.state.variables[j].realizarCalculo) {
                    alert("el ultimo calculo de la variable: "+this.state.variables[j].nombre+"' todavia esta activo.");
                } else {
                    arregloDeErroresExcel.push({nombre: this.state.variables[j].nombre });
                    alert("problema para leer la hoja: "+this.state.variables[j].nombreHoja);
                }
            };
        } else {
            alert("problema para leer archivo: "+this.state.ubicacionArchivo);
        }
    }

    getArregloPosicionesExcel (celdas) {
        var celdaInicial = this.getObjetoLetraNumeroCelda(celdas.split(":")[0]);
        var celdaFinal;
        if (celdas.indexOf(":") >= 0)
            celdaFinal = this.getObjetoLetraNumeroCelda(celdas.split(":")[1]);
        var arregloPosicionesExcel = [];
        if(celdaFinal != undefined) {
            if(celdaInicial.columna.toLowerCase().localeCompare(celdaFinal.columna.toLowerCase()) == 0) {
                //misma columnas, se recorre para abajo en el archivo
                var filaInicial = parseInt(celdaInicial.fila);
                var filaFinal = parseInt(celdaFinal.fila);
                for (var i = filaInicial; i <= filaFinal; i++) {
                    arregloPosicionesExcel.push(celdaInicial.columna.toUpperCase()+i);
                };
            } else {
                //misma fila, se recorre horizontal en el archivo
                var numeroColumnaInicial = this.toColumnNumber(celdaInicial.columna.toUpperCase());
                var numeroColumnaFinal = this.toColumnNumber(celdaFinal.columna.toUpperCase());
                for (var i = numeroColumnaInicial; i <= numeroColumnaFinal; i++) {
                    arregloPosicionesExcel.push(toColumnLetter(i)+celdaInicial.fila);
                };
            }
        } else {
            //solo se selecciono una celda
            arregloPosicionesExcel.push(celdaInicial.columna+celdaInicial.fila);
        }
        return arregloPosicionesExcel;
    }

    getObjetoLetraNumeroCelda (celda) {
        var columna = '';
        var fila = '';
        for (var i = 0; i < celda.length; i++) {
            if ( this.esLetra(celda.charAt(i)) ) {
                columna += celda.charAt(i);
            } else {
                break;
            }
        };
        fila = celda.substring(i);
        var celdaObjeto = {columna: columna, fila: fila};
        return celdaObjeto;
    }

    esLetra (caracter) {
        if(caracter.toLowerCase().localeCompare("a") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("b") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("c") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("d") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("e") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("f") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("g") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("h") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("i") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("j") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("k") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("l") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("m") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("n") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("o") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("p") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("q") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("r") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("s") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("t") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("u") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("v") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("w") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("x") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("y") == 0) {
            return true;
        } else if(caracter.toLowerCase().localeCompare("z") == 0) {
            return true;
        }
    }

    toColumnLetter (num) {
        for (var ret = '', a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
            ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
        }
        return ret;
    }

    toColumnNumber (val) {
        var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, j, result = 0;
        for (i = 0, j = val.length - 1; i < val.length; i += 1, j -= 1) {
            result += Math.pow(base.length, j) * (base.indexOf(val[i]) + 1);
        }
        return result;
    }

    verificarSiExisteExcelEnResultadosHistoricos (variable) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ResultadosNombreVariables where nombreVariable = '"+variable.nombre+"' and finVigencia = '1964-05-28'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if (result.recordset.length == 0) {
                            this.crearTablaDeResultadoNombreExcel(variable);
                        } else {
                            console.log("ENCONTRO")
                            console.log(result.recordset[0])
                            this.guardarResultadosNombreExcel(variable, result.recordset[0].inicioVigencia);
                        }
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaDeResultadoNombreExcel (variable) {
        //NOMBRE TABLA: NOMBREVARIABLE_AÑOVIGENCIA_MESVIGENCIA_DIAVIGENCIA_HORAVIGENCIA_MINUTOSVIGENCIA_SEGUNDOSVIGENCIA
        //VIGENCIA: DIA CREACION
        let hoy = new Date();
        var textoCreacionTabla = 'CREATE TABLE '+variable.nombre+'_'+hoy.getFullYear()+'_'+(hoy.getMonth()+1)+'_'+hoy.getDate()+'_'+hoy.getHours()+'_'+hoy.getMinutes()+'_'+hoy.getSeconds()+' ( ID int IDENTITY(1,1) PRIMARY KEY, ';
        for (var i = 0; i < variable.variables.length; i++) {
            if(i != 0)
                textoCreacionTabla += ', ';
            if(variable.variables[i].tipo.localeCompare("numero") == 0) {
                textoCreacionTabla += variable.variables[i].nombre+' decimal(22,4)';
            } else if(variable.variables[i].tipo.localeCompare("varchar") == 0) {
                textoCreacionTabla += variable.variables[i].nombre+' varchar(1000)';
            } else if(variable.variables[i].tipo.localeCompare("bit") == 0) {
                textoCreacionTabla += variable.variables[i].nombre+' bit';
            } else if(variable.variables[i].tipo.localeCompare("date") == 0) {
                textoCreacionTabla += variable.variables[i].nombre+' date';
            }
        };
        textoCreacionTabla += ', f3ch4Gu4rd4do date )';
        console.log('textoCreacionTabla')
        console.log(textoCreacionTabla)
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query(textoCreacionTabla, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        //console.log("Tabla "+variable.nombre+'_'+hoy.getFullYear()+'_'+hoy.getMonth()+'_'+hoy.getDate()+'_'+hoy.getHours()+'_'+hoy.getMinutes()+'_'+hoy.getSeconds()+" creada.");
                        console.log('CREO TABLA');
                        this.crearResultadoNombreExcel(variable, hoy);
                    });
                }
            });
        }); // fin transaction
    }

    crearResultadoNombreExcel (variable, hoy) {
        console.log('INICAR CREAR RESULTADO');
        let mes = hoy.getMonth()+1;
        if(mes.toString().length == 1)
            mes = '0'+mes;
        let dia = hoy.getDate();
        if(dia.toString().length == 1)
            dia = '0'+dia;
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into ResultadosNombreVariables (nombreVariable, inicioVigencia, finVigencia) values ('"+variable.nombre+"', '"+hoy.getFullYear()+'-'+mes+'-'+dia+" "+hoy.getHours()+":"+hoy.getMinutes()+":"+hoy.getSeconds()+"', '1964-05-28')", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log('GUARDO RESULTADO');
                        this.guardarResultadosNombreExcel(variable, hoy);
                    });
                }
            });
        }); // fin transaction
    }

    guardarResultadosNombreExcel (variable, fechaNombreTabla) {
        console.log('INICAR GUARDAR RESULTADO');
        console.log('fechaNombreTabla');
        console.log(fechaNombreTabla);
        console.log('fechaNombreTabla.getFullYear()');
        console.log(fechaNombreTabla.getFullYear());
        console.log('fechaNombreTabla.getMonth()');
        console.log(fechaNombreTabla.getMonth());
        console.log('fechaNombreTabla.getDate()');
        console.log(fechaNombreTabla.getDate());
        console.log('fechaNombreTabla.getHours()');
        console.log(fechaNombreTabla.getHours());
        console.log('fechaNombreTabla.getMinutes()');
        console.log(fechaNombreTabla.getMinutes());
        console.log('fechaNombreTabla.getSeconds()');
        console.log(fechaNombreTabla.getSeconds());

        let hoy = new Date();
        var textoInsertPrincipio = 'INSERT INTO '+variable.nombre+'_'+fechaNombreTabla.getFullYear()+'_'+(fechaNombreTabla.getMonth()+1)+'_'+fechaNombreTabla.getDate()+'_'+fechaNombreTabla.getHours()+'_'+fechaNombreTabla.getMinutes()+'_'+fechaNombreTabla.getSeconds()+' ( ';
        for (var i = 0; i < variable.variables.length; i++) {
            if(i != 0)
                textoInsertPrincipio += ', ';
            textoInsertPrincipio += variable.variables[i].nombre;
        };
        textoInsertPrincipio += ', f3ch4Gu4rd4do ) values ( ';
        var instruccionSQLBorrar = "DELETE FROM "+variable.nombre+"_"+fechaNombreTabla.getFullYear()+"_"+(fechaNombreTabla.getMonth()+1)+"_"+fechaNombreTabla.getDate()+"_"+fechaNombreTabla.getHours()+"_"+fechaNombreTabla.getMinutes()+"_"+fechaNombreTabla.getSeconds()+ " WHERE f3ch4Gu4rd4do = '"+hoy.getFullYear()+"-"+(hoy.getMonth()+1)+"-"+hoy.getDate()+"' ";
        console.log('instruccionSQLBorrar');
        console.log(instruccionSQLBorrar);
        this.borrarExcel(instruccionSQLBorrar);
        for (var i = 0; i < window[variable.nombre].length; i++) {
            var instruccionSQLFinal = textoInsertPrincipio;
            for (var j = 0; j < variable.variables.length; j++) {
                if(j > 0)
                    instruccionSQLFinal += ', ';
                if(variable.variables[j].tipo.localeCompare("numero") == 0) {
                    instruccionSQLFinal += window[variable.nombre][i][variable.variables[j].nombre];
                } else if(variable.variables[j].tipo.localeCompare("varchar") == 0) {
                    instruccionSQLFinal += "'"+window[variable.nombre][i][variable.variables[j].nombre]+"'";
                } else if(variable.variables[j].tipo.localeCompare("bit") == 0) {
                    instruccionSQLFinal += "'"+window[variable.nombre][i][variable.variables[j].nombre]+"'";
                } else if(variable.variables[j].tipo.localeCompare("date") == 0) {
                    instruccionSQLFinal += "'"+window[variable.nombre][i][variable.variables[j].nombre].getFullYear()+"-"+(window[variable.nombre][i][variable.atributos[j].nombre].getMonth()+1)+"-"+window[variable.nombre][i][variable.atributos[j].nombre].getDate()+"'";
                }
            };
            instruccionSQLFinal += ", '"+hoy.getFullYear()+"-"+(hoy.getMonth()+1)+"-"+hoy.getDate()+"' )";
            console.log('instruccionSQLFinal 1');
            console.log(instruccionSQLFinal);
            var self = this;
            setTimeout(function () {
                self.guardarExcel(instruccionSQLFinal, variable, 'excel', hoy);
            }, 600);
        };
    }

    guardarExcel (instruccionSQL, variable, tabla, hoy) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query(instruccionSQL, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(variable.periodicidad.localeCompare("-1") != 0)
                            this.verificarPeriodicidadGuardar(variable, tabla, hoy);
                    });
                }
            });
        }); // fin transaction
    }

    borrarExcel (instruccionSQL) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query(instruccionSQL, (err, result) => {
                if (err) {
                    console.log(err);
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

    verificarPeriodicidadGuardar (variable, tabla, hoy) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from PeriodicidadCalculo where variableID = "+variable.ID+" and tablaVariable = '"+tabla+"'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            this.updatePeriodicidad(variable, tabla, hoy);
                        } else {
                            this.guardarPeriodicidad(variable, tabla, hoy);
                        }
                    });
                }
            });
        }); // fin transaction
    }

    updatePeriodicidad (variable, tabla, hoy) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("update PeriodicidadCalculo where variableID = "+variable.ID+" and tablaVariable = '"+tabla+"' set fechaUltimoCalculo = '"+hoy.getFullYear()+"-"+(hoy.getMonth()+1)+"-"+hoy.getDate()+"'", (err, result) => {
                if (err) {
                    console.log(err);
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

    guardarPeriodicidad (variable, tabla, hoy) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into PeriodicidadCalculo (variableID, tablaVariable, fechaInicio, fechaUltimoCalculo) values ("+variable.ID+", '"+tabla+"', '"+hoy.getFullYear()+"-"+(hoy.getMonth()+1)+"-"+hoy.getDate()+"', '"+hoy.getFullYear()+"-"+hoy.getMonth()+"-"+hoy.getDate()+"') ", (err, result) => {
                if (err) {
                    console.log(err);
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

    /*
        **************************************
        **************************************
                FIN CALCULO CODIGO
        **************************************
        **************************************
    */

    render() {
        return (
            <div>
                <br/>
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                        <label htmlFor="nombreArchivo" className="col-form-label">Nombre del Archivo:</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <input id="nombreArchivo" type="text" className="form-control form-control-sm"/>
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

                <div style={{width: "100%"}}>
                    <div className={"row"} style={{width: "100%"}}>
                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                            <label htmlFor="nombreVariable" className="col-form-label">Nombre de Variable:</label>
                        </div>
                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <input id="nombreVariable" type="text" className="form-control form-control-sm"/>
                        </div>
                    </div>
                    <div className={"row"} style={{width: "100%"}}>
                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                            <label htmlFor="operacion" className="col-form-label">Tipo:</label>
                        </div>
                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <select id="operacion" className="form-control">
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
                            <input id="hojaExcelVariable" type="text" className="form-control form-control-sm"/>
                        </div>
                    </div>
                    <div className={"row"} style={{width: "100%"}}>
                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                            <label htmlFor="tipoVariable" className="col-form-label">Tipo de Variable en Celda:</label>
                        </div>
                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <select id="tipoVariable" className="form-control">
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
                            <input id="celdasVariable" type="text" className="form-control form-control-sm"/>
                        </div>
                    </div>
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
                            <label htmlFor="analista" className="col-form-label">Nombre Encargado</label>
                        </div>
                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                            <input id="analista" defaultValue={this.props.analistaVariable} onKeyUp={this.props.actualizarNombreEncargado} type="text" className="form-control form-control-sm"/>
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
                                <input id={"hojaExcelVariable"+i} type="text" defaultValue={variable.nombreHoja} className="form-control form-control-sm"/>
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
                                <label htmlFor={"analista"+i} className="col-form-label">Nombre Encargado</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                <input id={"analista"+i} defaultValue={variable.analista} type="text" className="form-control form-control-sm"/>
                            </div>
                        </div>
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor={"guardarVariable"+i} className="col-form-label">Guardar Valores Obtenidos en Base de Datos</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                <br/>
                                <div className={"switch-button switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                                    <input type="checkbox" defaultChecked={variable.guardar} name={"guardarVariable"+i} id={"guardarVariable"+i}/><span>
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
                <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <a href="#" className="btn btn-brand active" onClick={this.guardarUbicacionArchivo}>Modificar Configuración de Archivo de Excel</a>
                    {
                        this.props.tipoVariableOriginal.localeCompare("excel") == 0
                        ? <a href="#" className="btn btn-secondary active" style={{marginLeft: "10px"}} onClick={this.props.eliminarVarExcel}>Eliminar Variable</a>
                        : null
                    }
                    {
                        this.props.tipoVariableOriginal.localeCompare("excel") == 0
                        ? <a href="#" className="btn btn-primary active" style={{marginLeft: "10px"}} onClick={this.verificarPeriodicidad}>Realizar Cálculo</a>
                        : null
                    }
                </div>
                <br/>
            </div>
        );
    }
}
