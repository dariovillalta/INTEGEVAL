import React from 'react';
import sql from 'mssql';

import Modal from '../../../Modal/Modal.js';

var variables = [];
var excel = [];
var formas = [];

const periodicidad = [ {nombre: "diario"}, {nombre: "semanal"}, {nombre: "mensual"}, {nombre: "trimestral"}, {nombre: "bi-anual"}, {nombre: "anual"} ];




/*
    **************************************
    **************************************
                VARIABLES CALCULO 
    **************************************
    **************************************
*/

window.arregloDeErroresFormas = [];
window.arregloHTMLFormas = [];                          //Arreglo que contiene el codigo html de las formas

/*
    **************************************
    **************************************
            VARIABLES CALCULO FIN
    **************************************
    **************************************
*/

export default class FuenteDatoForma extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            tipo: "",
            guardar: "",
            valorPeriodicidad: '-1',
            forma: null,
            showModalForma: false,
            tituloVariableForma: "",
            htmlForma: ''
        }
        this.crearVariable = this.crearVariable.bind(this);
        this.traerForma = this.traerForma.bind(this);
        this.eliminarVarExcel = this.eliminarVarExcel.bind(this);
        this.eliminarVariable = this.eliminarVariable.bind(this);
        this.getVariables = this.getVariables.bind(this);
        this.getExcel = this.getExcel.bind(this);
        this.getFormas = this.getFormas.bind(this);
        this.verificarNoExisteNombreVar = this.verificarNoExisteNombreVar.bind(this);
        this.actualizarPeriodicidad = this.actualizarPeriodicidad.bind(this);
        this.cargarDatePicker = this.cargarDatePicker.bind(this);
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
        this.formaCrearVariable = this.formaCrearVariable.bind(this);
        this.iniciarMostrarFormas = this.iniciarMostrarFormas.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.loadFechas = this.loadFechas.bind(this);
        this.closeModalForma = this.closeModalForma.bind(this);
        this.verificarSiExisteFormaEnResultadosHistoricos = this.verificarSiExisteFormaEnResultadosHistoricos.bind(this);
        this.crearTablaDeResultadoNombreForma = this.crearTablaDeResultadoNombreForma.bind(this);
        this.crearResultadoNombreForma = this.crearResultadoNombreForma.bind(this);
        this.guardarResultadosNombreForma = this.guardarResultadosNombreForma.bind(this);
        this.guardarForma = this.guardarForma.bind(this);
        this.borrarForma = this.borrarForma.bind(this);
        this.verificarPeriodicidadGuardar = this.verificarPeriodicidadGuardar.bind(this);
        this.updatePeriodicidad = this.updatePeriodicidad.bind(this);
        this.guardarPeriodicidad = this.guardarPeriodicidad.bind(this);
    }

    componentDidMount() {
        if (this.props.tipoVariableOriginal.localeCompare("forma") == 0) {
            this.traerForma();
        }
        this.getVariables();
        this.getExcel();
        this.getFormas();
    }

    traerForma() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from FormasVariables where ID = "+this.props.idVariable, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            this.setState({
                                nombre: result.recordset[0].nombre,
                                tipo: result.recordset[0].tipo,
                                guardar: result.recordset[0].guardar,
                                valorPeriodicidad: result.recordset[0].periodicidad,
                                forma: result.recordset[0]
                            });
                            $("#nombreVariable").val(result.recordset[0].nombre);
                            $("#tipo").val(result.recordset[0].tipo);
                            if (result.recordset[0].guardar)
                                $("#guardarVariable").prop('checked', true);
                            else
                                $("#guardarVariable").prop('checked', false);
                            $("#periodicidad").val(result.recordset[0].periodicidad);
                            $("#analista").val(result.recordset[0].analista);
                            if(result.recordset[0].fechaInicioCalculo.getFullYear() == 1964 && result.recordset[0].fechaInicioCalculo.getMonth() == 4 && result.recordset[0].fechaInicioCalculo.getDate() == 28){
                                //
                            } else {
                                $("#fecha").datepicker("setDate", result.recordset[0].fechaInicioCalculo);
                            }
                        }
                    });
                }
            });
        }); // fin transaction
    }

    crearVariable () {
        var nombreVariable = $("#nombreVariable").val();
        var tipo = $("#tipo").val();
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
        if(nombreVariable.length > 0 && nombreVariable.length < 1001) {
            if(this.verificarNoExisteNombreVar(nombreVariable)) {
                if(tipo.length > 0 && tipo.length < 1001) {
                    if(periodicidad.length > 0 && periodicidad.length < 51) {
                        if(this.isValidDate(fecha)) {
                            if(analista.length > 0 && analista.length < 101) {
                                if (this.props.tipoVariableOriginal.localeCompare("excel") == 0) {
                                    this.eliminarVarExcel();
                                }
                                if (this.props.tipoVariableOriginal.localeCompare("variable") == 0) {
                                    this.eliminarVariable();
                                }
                                if (this.props.tipoVariableOriginal.localeCompare("forma") != 0) {
                                    const transaction = new sql.Transaction( this.props.pool );
                                    transaction.begin(err => {
                                        var rolledBack = false;
                                        transaction.on('rollback', aborted => {
                                            rolledBack = true;
                                        });
                                        const request = new sql.Request(transaction);
                                        request.query("insert into FormasVariables (nombre, tipo, periodicidad, fechaInicioCalculo, analista, guardar) values ('"+nombreVariable+"', '"+tipo+"', '"+periodicidad+"', '"+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+"', '"+analista+"', '"+guardarVariable+"')", (err, result) => {
                                            if (err) {
                                                console.log(err);
                                                if (!rolledBack) {
                                                    transaction.rollback(err => {
                                                    });
                                                }
                                            } else {
                                                transaction.commit(err => {
                                                    alert("Variable Modificada");
                                                    this.getFormas();
                                                    this.props.actualizarIDVariableModificada("forma");
                                                    var forma = {
                                                        nombreVariable: nombreVariable,
                                                        tipo: tipo,
                                                        guardarVariable: guardarVariable,
                                                        periodicidad: periodicidad,
                                                        fecha: fecha,
                                                        analista: analista
                                                    }
                                                    this.verificarSiExisteExcelEnResultadosHistoricosModificar(forma);
                                                });
                                            }
                                        });
                                    }); // fin transaction
                                } else {
                                    const transaction = new sql.Transaction( this.props.pool );
                                    transaction.begin(err => {
                                        var rolledBack = false;
                                        transaction.on('rollback', aborted => {
                                            rolledBack = true;
                                        });
                                        const request = new sql.Request(transaction);
                                        request.query("update FormasVariables set nombre = '"+nombreVariable+"', tipo = '"+tipo+"', periodicidad = '"+periodicidad+"', guardar = '"+guardarVariable+"', fechaInicioCalculo = '"+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+"', analista = '"+analista+"' where ID = "+this.props.idVariable, (err, result) => {
                                            if (err) {
                                                console.log(err);
                                                if (!rolledBack) {
                                                    transaction.rollback(err => {
                                                    });
                                                }
                                            } else {
                                                transaction.commit(err => {
                                                    alert("Variable Modificada");
                                                    this.getFormas();
                                                    var forma = {
                                                        nombreVariable: nombreVariable,
                                                        tipo: tipo,
                                                        guardarVariable: guardarVariable,
                                                        periodicidad: periodicidad,
                                                        fecha: fecha,
                                                        analista: analista
                                                    }
                                                    this.verificarSiExisteExcelEnResultadosHistoricosModificar(forma);
                                                });
                                            }
                                        });
                                    }); // fin transaction
                                }
                            } else {
                                alert('Ingrese un valor para el analista que debe ser menor a 51 caracteres');
                            }
                        } else {
                            alert('Ingrese un valor para la fecha');
                        }
                    } else {
                        alert('Ingrese un valor para el valor de periodicidad que debe ser menor a 51 caracteres');
                    }
                } else {
                    alert('Ingrese un valor para el tipo de la variable que debe ser menor a 31 caracteres');
                }
            } else {
                alert('El nombre de la variable debe ser único.');
            }
        } else {
            alert('Ingrese un valor para el nombre de la variable que debe ser menor a 101 caracteres');
        }
    }

    eliminarVarExcel () {
        const transaction1 = new sql.Transaction( this.props.pool );
        transaction1.begin(err => {
            var rolledBack = false;
            transaction1.on('rollback', aborted => {
                rolledBack = true;
            });
            const request1 = new sql.Request(transaction1);
            request1.query("DELETE FROM ExcelArchivos WHERE ID = "+this.props.idVariable, (err, result) => {
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
            request2.query("DELETE FROM ExcelVariables WHERE excelArchivoID = "+this.props.idVariable, (err, result) => {
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
                if (excel[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
                    noExiste = false;
                    break;
                }
            };
        }
        if(noExiste) {
            for (var i = 0; i < formas.length; i++) {
                if (this.props.tipoVariableOriginal.localeCompare("forma") == 0) {
                    if (formas[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0 && formas[i].ID != this.props.idVariable) {
                        noExiste = false;
                        break;
                    }
                } else {
                    if (formas[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
                        noExiste = false;
                        break;
                    }
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
        var copiedObject = jQuery.extend(true, {}, this.state.forma);
        this.traerPeriodicidadVariable(copiedObject, "forma");
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

    traerPeriodicidadVariable (variable, tabla) {
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
                                variable.realizarCalculo = true;
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
                                    variable.realizarCalculo = true;
                                } else {
                                    variable.realizarCalculo = false;
                                }
                            }
                        } else {
                            if(indexJ != null)
                                variable.realizarCalculo = true;
                            else
                                variable.realizarCalculo = true;
                        }
                        this.crearVariablesExcel(variable);
                    });
                }
            });
        }); // fin transaction
    }

    formaCrearVariable (id, nombreVariable, tipoVariable, variable) {
        //variableForma
        if(tipoVariable.localeCompare("numero") == 0) {
            var variable = parseFloat($("#variableForma").val());
            window[nombreVariable] = variable;
        } else if(tipoVariable.localeCompare("bit") == 0) {
            if ($("#variableForma").is(':checked')) {
                window[nombreVariable] = true;
            } else {
                window[nombreVariable] = false;
            }
        } else if(tipoVariable.localeCompare("varchar") == 0) {
            var variable = $("#variableForma").val();
            window[nombreVariable] = variable;
        } else if(tipoVariable.localeCompare("date") == 0) {
            var variable = $("#variableForma").datepicker('getDate');
            window[nombreVariable] = variable;
        }
        if(nombreSiguiente != undefined) {
            this.updateForm(nombreSiguiente, indexSiguiente, tipoSiguiente, inputSiguiente);
        } else {
            this.closeModalForma();
            this.verificarSiExisteFormaEnResultadosHistoricos(variable);
        }
    }

    iniciarMostrarFormas (variable) {
        var HTMLFormas = '';
        if(variable.tipo.localeCompare("numero") == 0) {
            let nombre = variable.nombre;
            let id = variable.ID;
            let tipo = variable.tipo;
            HTMLFormas =  <div style={{width: "100%"}}>
                                        <br/>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor={"variableForma"} className="col-form-label">Valor:</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                <input id={"variableForma"} type="text" className="form-control form-control-sm"/>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className={"text-center"} style={{width: "100%"}}>
                                            <a href="#" className="btn btn-brand active" onClick={() => this.formaCrearVariable(id, nombre, tipo, variable)}>Guardar</a>
                                        </div>
                                        <br/>
                                    </div>;
        } else if(variable.tipo.localeCompare("bit") == 0) {
            let nombre = variable.nombre;
            let id = variable.ID;
            let tipo = variable.tipo;
            HTMLFormas =  <div style={{width: "100%"}}>
                                        <br/>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor={"variableForma"} className="col-form-label">Valor:</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <br/>
                                                <div className={"switch-button switch-button-bool"} style={{margin:"0 auto", display:"block"}}>
                                                    <input type="checkbox" defaultChecked name={"guardarFuenteDato"} id={"variableForma"}/><span>
                                                    <label htmlFor={"guardarFuenteDato"}></label></span>
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className={"text-center"} style={{width: "100%"}}>
                                            <a href="#" className="btn btn-brand active" onClick={() => this.formaCrearVariable(id, nombre, tipo, variable)}>Guardar</a>
                                        </div>
                                        <br/>
                                    </div>;
        } else if(variable.tipo.localeCompare("varchar") == 0) {
            let nombre = variable.nombre;
            let id = variable.ID;
            let tipo = variable.tipo;
            HTMLFormas =  <div style={{width: "100%"}}>
                                        <br/>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor={"variableForma"} className="col-form-label">Valor:</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                <input id={"variableForma"} type="text" className="form-control form-control-sm"/>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className={"text-center"} style={{width: "100%"}}>
                                            <a href="#" className="btn btn-brand active" onClick={() => this.formaCrearVariable(id, nombre, tipo, variable)}>Guardar</a>
                                        </div>
                                        <br/>
                                    </div>;
        } else if(variable.tipo.localeCompare("date") == 0) {
            let nombre = variable.nombre;
            let id = variable.ID;
            let tipo = variable.tipo;
            HTMLFormas =  <div style={{width: "100%"}}>
                                        <br/>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor={"variableForma"} className="col-form-label">Valor:</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                <div className="row" style={{display: "flex", justifyContent: "center"}}>
                                                    <div id={"variableForma"} className="center-block"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className={"text-center"} style={{width: "100%"}}>
                                            <a href="#" className="btn btn-brand active" onClick={() => this.formaCrearVariable(id, nombre, tipo, variable)}>Guardar</a>
                                        </div>
                                        <br/>
                                    </div>;
        }
        this.updateForm(variable.nombre, HTMLFormas, variable.tipo, "variableForma");
    }

    updateForm (titulo, HTMLFormas, tipo, idInput) {
        this.setState({
            showModalForma: true,
            tituloVariableForma: "Variable: "+titulo,
            htmlForma: HTMLFormas
        }, this.loadFechas(tipo, idInput));
    }

    loadFechas (tipo, idInput) {
        if(tipo.localeCompare("date") == 0) {
            setTimeout(function(){
                $('#'+idInput).datepicker({
                    format: "dd-mm-yyyy",
                    todayHighlight: true,
                    viewMode: "days", 
                    minViewMode: "days",
                    language: 'es'
                });
            }, 250);
        }
    }

    closeModalForma () {
        this.setState({
            showModalForma: false
        });
    }


    verificarSiExisteFormaEnResultadosHistoricos (variable) {
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
                            this.crearTablaDeResultadoNombreForma(variable);
                        } else {
                            console.log("ENCONTRO")
                            console.log(result.recordset[0])
                            this.guardarResultadosNombreForma(variable, result.recordset[0].inicioVigencia);
                        }
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaDeResultadoNombreForma (variable) {
        //NOMBRE TABLA: NOMBREVARIABLE_AÑOVIGENCIA_MESVIGENCIA_DIAVIGENCIA_HORAVIGENCIA_MINUTOSVIGENCIA_SEGUNDOSVIGENCIA
        //VIGENCIA: DIA CREACION
        let hoy = new Date();
        var textoCreacionTabla = 'CREATE TABLE '+variable.nombre+'_'+hoy.getFullYear()+'_'+(hoy.getMonth()+1)+'_'+hoy.getDate()+'_'+hoy.getHours()+'_'+hoy.getMinutes()+'_'+hoy.getSeconds()+' ( ID int IDENTITY(1,1) PRIMARY KEY, ';
        if(variable.tipo.localeCompare("numero") == 0) {
            textoCreacionTabla += variable.nombre+' decimal(22,4)';
        } else if(variable.tipo.localeCompare("varchar") == 0) {
            textoCreacionTabla += variable.nombre+' varchar(1000)';
        } else if(variable.tipo.localeCompare("bit") == 0) {
            textoCreacionTabla += variable.nombre+' bit';
        } else if(variable.tipo.localeCompare("date") == 0) {
            textoCreacionTabla += variable.nombre+' date';
        }
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
                        this.crearResultadoNombreForma(variable, hoy);
                    });
                }
            });
        }); // fin transaction
    }

    crearResultadoNombreForma (variable, hoy) {
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
                        this.guardarResultadosNombreForma(variable, hoy);
                    });
                }
            });
        }); // fin transaction
    }

    guardarResultadosNombreForma (variable, fechaNombreTabla) {
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
        this.borrarForma(instruccionSQLBorrar);

        var instruccionSQLFinal = textoInsertPrincipio;
        if(variable.tipo.localeCompare("numero") == 0) {
            instruccionSQLFinal += window[variable.nombre];
        } else if(variable.tipo.localeCompare("varchar") == 0) {
            instruccionSQLFinal += "'"+window[variable.nombre]+"'";
        } else if(variable.tipo.localeCompare("bit") == 0) {
            instruccionSQLFinal += "'"+window[variable.nombre]+"'";
        } else if(variable.tipo.localeCompare("date") == 0) {
            instruccionSQLFinal += "'"+window[variable.nombre].getFullYear()+"-"+(window[variable.nombre].getMonth()+1)+"-"+window[variable.nombre].getDate()+"'";
        }
        instruccionSQLFinal += ", '"+hoy.getFullYear()+"-"+(hoy.getMonth()+1)+"-"+hoy.getDate()+"' )";
        console.log('instruccionSQLFinal 1');
        console.log(instruccionSQLFinal);
        var self = this;
        setTimeout(function () {
            self.guardarForma(instruccionSQLFinal, variable, 'forma', hoy);
        }, 600);
    }

    guardarForma (instruccionSQL, variable, tabla, hoy) {
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

    borrarForma (instruccionSQL) {
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
                        <label htmlFor="nombreVariable" className="col-form-label">Nombre de Variable:</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <input id="nombreVariable" defaultValue={this.state.nombre} type="text" className="form-control form-control-sm"/>
                    </div>
                </div>
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                        <label htmlFor="tipo" className="col-form-label">Tipo de Variable:</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <select id="tipo" defaultValue={this.state.tipo} className="form-control">
                            <option value="numero">Número</option>
                            <option value="varchar">Cadena</option>
                            <option value="date">Fecha</option>
                            <option value="bit">Booleano</option>
                        </select>
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
                            <input type="checkbox" defaultChecked={this.state.guardar} name={"guardarVariable"} id={"guardarVariable"}/><span>
                            <label htmlFor={"guardarVariable"}></label></span>
                        </div>
                    </div>
                </div>
                <br/>
                <div className={"text-center"} style={{width: "100%"}}>
                    <a href="#" className="btn btn-brand active" onClick={this.crearVariable}>Modificar Variable</a>
                    {
                        this.props.tipoVariableOriginal.localeCompare("forma") == 0
                        ? <a href="#" className="btn btn-secondary active" style={{marginLeft: "10px"}}  onClick={this.props.eliminarVarForma}>Eliminar Variable</a>
                        : null
                    }
                    {
                        this.props.tipoVariableOriginal.localeCompare("forma") == 0
                        ? <a href="#" className="btn btn-primary active" style={{marginLeft: "10px"}} onClick={this.verificarPeriodicidad}>Realizar Cálculo</a>
                        : null
                    }
                </div>
                <br/>
                <Modal show={this.state.showModalForma}
                    titulo={this.state.tituloVariableForma}
                    onClose={() => this.closeModalForma}>
                        {this.state.htmlForma}
                </Modal>
            </div>
        );
    }
}
