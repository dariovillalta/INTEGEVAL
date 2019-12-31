import React from 'react';
import sql from 'mssql';

export default class Valor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listas: [],
            variablesDeLista: []
        }
        this.updateVariableList = this.updateVariableList.bind(this);
        this.getLists = this.getLists.bind(this);
    }

    componentDidMount() {
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
            <div className={"row border-bottom"} style={{width: "100%"}}>
                <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                    <label htmlFor="valor" className="col-form-label">Valor:</label>
                </div>
                <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <input onKeyUp={this.props.actualizarValor} id="valor" type="text" className="form-control form-control-sm"/>
                </div>
            </div>
        );
    }
}
