import React from 'react';
import sql from 'mssql';

var variables = [];
var excel = [];
var formas = [];

const periodicidad = [ {nombre: "diario"}, {nombre: "semanal"}, {nombre: "mensual"}, {nombre: "trimestral"}, {nombre: "bi-anual"}, {nombre: "anual"} ];

export default class FuenteDatoForma extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valorPeriodicidad: '-1',
            usuarios: []
        }
        this.crearVariable = this.crearVariable.bind(this);
        this.getVariables = this.getVariables.bind(this);
        this.getExcel = this.getExcel.bind(this);
        this.getFormas = this.getFormas.bind(this);
        this.verificarNoExisteNombreVar = this.verificarNoExisteNombreVar.bind(this);
        this.actualizarPeriodicidad = this.actualizarPeriodicidad.bind(this);
        this.cargarDatePicker = this.cargarDatePicker.bind(this);
        this.isValidDate = this.isValidDate.bind(this);
        this.tieneEspaciosEnBlanco = this.tieneEspaciosEnBlanco.bind(this);

        this.getUsuarios = this.getUsuarios.bind(this);
    }

    componentDidMount() {
        this.getVariables();
        this.getExcel();
        this.getFormas();
        this.getUsuarios();
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
        var responsable = $("#responsable").val();
        var categoriaVariable = $("#categoriaVariable").val();
        if(nombreVariable.length > 0 && nombreVariable.length < 101) {
            if(!this.tieneEspaciosEnBlanco(nombreVariable)) {
                if(this.verificarNoExisteNombreVar(nombreVariable)) {
                    if(tipo.length > 0 && tipo.length < 31) {
                        if(periodicidad.length > 0 && periodicidad.length < 51) {
                            if(this.isValidDate(fecha)) {
                                if(responsable.length > 0 && responsable.length < 101) {
                                    if(categoriaVariable.length < 101) {
                                        const transaction = new sql.Transaction( this.props.pool );
                                        transaction.begin(err => {
                                            var rolledBack = false;
                                            transaction.on('rollback', aborted => {
                                                rolledBack = true;
                                            });
                                            const request = new sql.Request(transaction);
                                            request.query("insert into FormasVariables (nombre, tipo, periodicidad, fechaInicioCalculo, responsable, categoriaVariable, guardar) values ('"+nombreVariable+"', '"+tipo+"', '"+periodicidad+"', '"+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+"', '"+responsable+"', '"+categoriaVariable+"', '"+guardarVariable+"')", (err, result) => {
                                                if (err) {
                                                    console.log(err);
                                                    if (!rolledBack) {
                                                        transaction.rollback(err => {
                                                        });
                                                    }
                                                } else {
                                                    transaction.commit(err => {
                                                        this.props.showSuccesMessage("Éxito", 'Variable Creada.');
                                                        $("#nombreVariable").val("");
                                                        $("#tipo").val("numero");
                                                        //$("#periodicidad").val("");
                                                        $("#responsable").val("-1");
                                                        $("#categoriaVariable").val("");
                                                        this.getFormas();
                                                        this.props.getFormas();
                                                    });
                                                }
                                            });
                                        }); // fin transaction
                                    } else {
                                        this.props.showMessage("Error", 'Ingrese un valor para la categoria de variable que debe ser menor a 101 caracteres.', true, false, {});
                                    }
                                } else {
                                    this.props.showMessage("Error", 'Ingrese un valor para el responsable que debe ser menor a 101 caracteres.', true, false, {});
                                }
                            } else {
                                this.props.showMessage("Error", 'Ingrese un valor para la fecha.', true, false, {});
                            }
                        } else {
                            this.props.showMessage("Error", 'Ingrese un valor para el valor de periodicidad que debe ser menor a 51 caracteres.', true, false, {});
                        }
                    } else {
                        this.props.showMessage("Error", 'Ingrese un valor para el tipo de la variable que debe ser menor a 31 caracteres.', true, false, {});
                    }
                } else {
                    this.props.showMessage("Error", 'El nombre de la variable debe ser único.', true, false, {});
                }
            } else {
                this.props.showMessage("Error", 'El nombre de la variable no debe contener espacios en blanco.', true, false, {});
            }
        } else {
            this.props.showMessage("Error", 'Ingrese un valor para el nombre de la variable que debe ser menor a 101 caracteres.', true, false, {});
        }
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

    render() {
        return (
            <div>
                <br/>
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
                        <label htmlFor="tipo" className="col-form-label">Tipo de Variable:</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <select id="tipo" className="form-control">
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
                        <label htmlFor="responsable" className="col-form-label">Nombre Encargado</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                        <select id="responsable" defaultValue={this.props.responsableVariable} onChange={this.props.actualizarNombreEncargado} className="form-control">
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
                            <input id="categoriaVariable" type="text" className="form-control form-control-sm"/>
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
                <br/>
                <div className={"text-center"} style={{width: "100%"}}>
                    <a href="#" className="btn btn-brand active" onClick={this.crearVariable}>Crear Variable</a>
                </div>
                <br/>
            </div>
        );
    }
}
