import React from 'react';
import electron from 'electron';
import sql from 'mssql';

var variables = [];
var excel = [];
var formas = [];

const periodicidad = [ {nombre: "diario"}, {nombre: "semanal"}, {nombre: "mensual"}, {nombre: "trimestral"}, {nombre: "bi-anual"}, {nombre: "anual"} ];

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
        this.traerArchivoID = this.traerArchivoID.bind(this);
        this.guardarVariables = this.guardarVariables.bind(this);
        this.crearVariable = this.crearVariable.bind(this);
        this.updateVariable = this.updateVariable.bind(this);
        this.deleteVariable = this.deleteVariable.bind(this);
        this.getVariables = this.getVariables.bind(this);
        this.getExcel = this.getExcel.bind(this);
        this.getFormas = this.getFormas.bind(this);
        this.verificarNoExisteNombreVar = this.verificarNoExisteNombreVar.bind(this);
        this.actualizarPeriodicidad = this.actualizarPeriodicidad.bind(this);
        this.cargarDatePicker = this.cargarDatePicker.bind(this);
        this.actualizarPeriodicidadUpdate = this.actualizarPeriodicidadUpdate.bind(this);
        this.inicializarFecha = this.inicializarFecha.bind(this);
        this.isValidDate = this.isValidDate.bind(this);
    }

    componentDidMount() {
        this.getVariables();
        this.getExcel();
        this.getFormas();
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
                                if (!rolledBack) {
                                    transaction.rollback(err => {
                                    });
                                }
                            } else {
                                transaction.commit(err => {
                                    alert('Variable Creada');
                                    $("#nombreArchivo").val("");
                                    this.setState({
                                        ubicacionArchivo: ""
                                    });
                                    this.traerArchivoID();
                                });
                            }
                        });
                    }); // fin transaction
                //}
            } else {
                alert('Ingrese un valor para la ubicación del archivo que debe ser menor a 1001 caracteres');
            }
        } else {
            alert('Ingrese un nombre el archivo que debe ser menor a 101 caracteres');
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
                request.query("insert into ExcelVariables (excelArchivoID, nombreHoja, nombre, operacion, celdas, tipo, periodicidad, fechaInicioCalculo, analista, guardar) values ("+archivoExcelID+", '"+nombreHoja+"', '"+nombre+"', '"+operacion+"', '"+celdas+"', '"+tipo+"', '"+periodicidad+"', '"+fechaInicioCalculo+"', '"+analista+"', '"+guardarVariable+"')", (err, result) => {
                    if (err) {
                        console.log(err);
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
                                            var copyTempPeriodicidad = [...this.state.valoresPeriodicidad];
                                            copyTemp.push(nuevaVar);
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
                                            $("#periodicidad").val("");
                                            $("#analista").val("");
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
                                    fecha = $("#fecha").datepicker('getDate');
                                if(this.isValidDate(fecha)) {
                                    if($("#analista"+index).val().length > 0 && $("#analista"+index).val().length < 101) {
                                        if(this.verificarNoExisteNombreVar($("#nombreVariable"+index).val())) {
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
                                            copyTemp[index].guardar = guardarVariable;
                                            var copyTempPeriodicidad = [...this.state.valoresPeriodicidad];
                                            copyTempPeriodicidad[index] = periodicidad;
                                            this.setState({
                                                variables: copyTemp,
                                                valoresPeriodicidad: copyTempPeriodicidad
                                            });
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
        console.log('nombre')
        console.log(nombre)
        console.log('this.state.variables')
        console.log(this.state.variables)
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
        } );
    }

    inicializarFecha (periodicidad, index, fecha) {
        if(periodicidad.localeCompare("-1") != 0) {
            setTimeout(function () {
                $('#fecha'+index).datepicker({
                    format: "dd-mm-yyyy",
                    todayHighlight: true,
                    viewMode: "days", 
                    minViewMode: "days",
                    language: 'es'
                });
                $("#fecha"+index).datepicker("setDate", fecha);
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
                                <select id={"tipoVariable"+i} className="form-control">
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
                            this.state.valoresPeriodicidad[i].localeCompare("-1") != 0 && this.inicializarFecha(variable.periodicidad, i, variable.fechaInicioCalculo)
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
                <hr/>
                <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <a href="#" className="btn btn-brand active" onClick={this.guardarUbicacionArchivo}>Guardar Configuración de Archivo de Excel</a>
                </div>
                <br/>
            </div>
        );
    }
}
