import React from 'react';
import sql from 'mssql';

export default class Valor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listas: [],
            variablesDeLista: [],
            radioManual: true,
            radioListas: false,
            radioFecha: false,
            radioTiempo: false
        }
        this.updateVariableList = this.updateVariableList.bind(this);
        this.getLists = this.getLists.bind(this);
        this.mostrarManual = this.mostrarManual.bind(this);
        this.mostrarListas = this.mostrarListas.bind(this);
        this.mostrarFecha = this.mostrarFecha.bind(this);
        this.initFecha = this.initFecha.bind(this);
        this.isValidDate = this.isValidDate.bind(this);
        this.mostrarTiempo = this.mostrarTiempo.bind(this);
        this.changeTime = this.changeTime.bind(this);
    }

    componentDidMount () {
        //this.getLists();
    }

    getLists() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Listas", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            listas: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    updateVariableList() {
        let listaID = $("#selectLista").val();
        if (listaID.length > 0) {
            if (listaID.localeCompare("table") != 0) {
                console.log(listaID)
                const transaction = new sql.Transaction( this.props.pool );
                transaction.begin(err => {
                    var rolledBack = false;
                    transaction.on('rollback', aborted => {
                        rolledBack = true;
                    });
                    const request = new sql.Request(transaction);
                    request.query("select * from VariablesdeLista where listaID = "+listaID, (err, result) => {
                        if (err) {
                            if (!rolledBack) {
                                console.log(err);
                                transaction.rollback(err => {
                                });
                            }
                        } else {
                            transaction.commit(err => {
                                let arrTemp = [];
                                for (var i = 0; i < result.recordset.length; i++) {
                                    arrTemp.push({ID: result.recordset[i].ID, nombre: result.recordset[i].nombre, tipo: result.recordset[i].tipo});
                                };
                                this.setState({
                                    variablesDeLista: arrTemp
                                });
                                console.log(arrTemp)
                            });
                        }
                    });
                }); // fin transaction
            } else {
                let arrTemp = [];
                for (var i = 0; i < this.props.campos.length; i++) {
                    arrTemp.push({ID: this.props.campos[i].ID, nombre: this.props.campos[i].nombre, tipo: this.props.campos[i].tipo});
                };
                this.setState({
                    variablesDeLista: arrTemp
                });
            }
        } else {
            this.setState({
                variablesDeLista: []
            });
        }
    }

    mostrarManual () {
        this.setState({
            radioManual: true,
            radioListas: false,
            radioFecha: false,
            radioTiempo: false
        });
    }

    mostrarListas () {
        this.setState({
            radioManual: false,
            radioListas: true,
            radioFecha: false,
            radioTiempo: false
        });
    }

    mostrarFecha () {
        this.setState({
            radioManual: false,
            radioListas: false,
            radioFecha: true,
            radioTiempo: false
        }, this.initFecha );
    }

    initFecha () {
        $('#fecha').datepicker({
            format: "dd-mm-yyyy",
            todayHighlight: true,
            viewMode: "days", 
            minViewMode: "days",
            language: 'es'
        });
        var self = this;
        $('#fecha').datepicker().on('changeDate', function () {
            var fecha = $("#fecha").datepicker('getDate');
            if(self.isValidDate(fecha)) {
                var valorARetornar = "FECHA=("+fecha.getFullYear()+"-"+fecha.getMonth()+"-"+fecha.getDate()+")";
                self.props.retornarValorFecha(valorARetornar, fecha.getFullYear()+"-"+fecha.getMonth()+"-"+fecha.getDate());
            }
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

    mostrarTiempo () {
        this.setState({
            radioManual: false,
            radioListas: false,
            radioFecha: false,
            radioTiempo: true
        });
    }

    changeTime() {
        var valorARetornar = "TIEMPO=[DIAS="+$("#dias").val()+",MES="+$("#mes").val()+",AÑOS="+$("#anio").val()+"]";
        this.props.retornarValorTime(valorARetornar, "DIAS="+$("#dias").val()+",MES="+$("#mes").val()+",AÑOS="+$("#anio").val());
    }

    render() {
        /*if(this.props.esNumero) {
            return (
                <div className={"row"}>
	            	<div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"} style={{width: "100%", height: "100%", border: "1px solid black", borderRadius: "5px"}}>
                        <div className={"font-18"} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            Seleccionar Valor a Aplicar
                        </div>
                        <div className={"form-group"}>
                            <select id="selectLista" className={"form-control form-control-lg"} onChange={this.updateVariableList}>
                                <option value="">Seleccione una lista...</option>
                                {this.props.camposDropdown.map((lista, i) =>
                                    <option value={lista.ID} key={lista.ID}>{lista.valor}</option>
                                )}
                            </select>
                        </div>

                        <div className={"form-group"}>
                            <select id="camposDeLista" className={"form-control form-control-lg"} multiple>
                                {this.props.valoresDropdown.map((variable, i) => {
                                        if (variable.tipo.indexOf("int") == 0 || variable.tipo.indexOf("decimal") == 0) {
                                            return <option value={variable.ID} key={variable.ID}>{variable.valor}</option>
                                        } else {
                                            return null;
                                        }
                                    }
                                )}
                            </select>
                        </div>
	                </div>
	            </div>
            );
        } else if(this.props.esBoolean) {
            return (
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"text-center"} style={{width: "100%", height: "100%", border: "1px solid black", borderRadius: "15px", borderRadius: "5px"}}>
                            <div className={"font-18"} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                Seleccionar Valor a Aplicar
                            </div>
                            <label className={"custom-control custom-radio custom-control-inline"}>
                                <input type="radio" name="radio-inline" className={"custom-control-input"}/>
                                <span className={"custom-control-label"}>
                                    <img src="./assets/varCreation/Verdadero.png" alt="" style={{height: "30px", width: "auto"}}/>
                                </span>
                            </label>
                            <label className={"custom-control custom-radio custom-control-inline"}>
                                <input type="radio" name="radio-inline" className={"custom-control-input"}/>
                                <span className={"custom-control-label"}>
                                    <img src="./assets/varCreation/Falso.png" alt="" style={{height: "30px", width: "auto"}}/>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            );
        } else if(this.props.esFecha) {
            return (
                <div>
                </div>
            );
        } else if(this.props.esTexto) {
            return (
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"} style={{width: "100%", height: "100%", border: "1px solid black", borderRadius: "5px"}}>
                        <div className={"font-18"} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            Seleccionar Valor a Aplicar
                        </div>
                        <div className={"form-group"}>
                            <select id="selectLista" className={"form-control form-control-lg"} onChange={this.updateVariableList}>
                                <option value="">Seleccione una lista...</option>
                                {this.props.camposDropdown.map((lista, i) =>
                                    <option value={lista.ID} key={lista.ID}>{lista.valor}</option>
                                )}
                            </select>
                        </div>

                        <div className={"form-group"}>
                            <select id="camposDeLista" className={"form-control form-control-lg"} multiple>
                                {this.props.valoresDropdown.map((variable, i) => {
                                        if (variable.tipo.indexOf("varchar") == 0) {
                                            return <option value={variable.ID} key={variable.ID}>{variable.valor}</option>
                                        } else {
                                            return null;
                                        }
                                    }
                                )}
                            </select>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                </div>
            );
        }*/
        return (
            <div className={"row"} style={{width: "100%"}}>
                <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <label className="custom-control custom-radio custom-control-inline">
                        <input type="radio" name="radio-inline" defaultChecked className="custom-control-input" onClick={() => this.mostrarManual()}/><span className="custom-control-label">Manual</span>
                    </label>
                    <label className="custom-control custom-radio custom-control-inline">
                        <input type="radio" name="radio-inline" className="custom-control-input" onClick={() => this.mostrarListas()}/><span className="custom-control-label">Listas</span>
                    </label>
                    <label className="custom-control custom-radio custom-control-inline" style={{display: (this.props.esFecha ? "" : "none")}}>
                        <input type="radio" name="radio-inline" className="custom-control-input" style={{display: ( this.props.esFecha ? "" : "none")}} onClick={() => this.mostrarFecha()}/><span className="custom-control-label">Fecha</span>
                    </label>
                    <label className="custom-control custom-radio custom-control-inline" style={{display: (this.props.esFecha ? "" : "none")}}>
                        <input type="radio" name="radio-inline" className="custom-control-input" style={{display: ( this.props.esFecha ? "" : "none")}} onClick={() => this.mostrarTiempo()}/><span className="custom-control-label">Tiempo</span>
                    </label>
                </div>
                {
                    this.state.radioManual
                    ?   <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor="valor" className="col-form-label">Valor:</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <input onKeyUp={this.props.actualizarValor} id="valor" type="text" className="form-control form-control-sm"/>
                            </div>
                        </div>
                    : null
                }
                {
                    this.state.radioListas
                    ?   <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor="valor" className="col-form-label">Lista:</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            </div>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor="valor" className="col-form-label">Valores Seleccionados:</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            </div>
                        </div>
                    : null
                }
                {
                    this.state.radioFecha && this.props.esFecha
                    ?   <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor="valor" className="col-form-label">Fecha:</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <div id="fecha" className="center-block"></div>
                            </div>
                        </div>
                    : null
                }
                {
                    this.state.radioTiempo && this.props.esFecha
                    ?   <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor="dias" className="col-form-label">Días:</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <input type="number" defaultValue="0" onChange={this.changeTime} id="dias" name="dias" step="1" min="0"/>
                            </div>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor="mes" className="col-form-label">Meses:</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <input type="number" defaultValue="0" id="mes" name="mes" step="1" min="0"/>
                            </div>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor="anio" className="col-form-label">Años:</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <input type="number" defaultValue="0" id="anio" name="anio" step="1" min="0"/>
                            </div>
                        </div>
                    : null
                }
            </div>
        );
    }
}
