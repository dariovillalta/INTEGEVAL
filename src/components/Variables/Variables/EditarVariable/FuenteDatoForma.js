import React from 'react';
import sql from 'mssql';

export default class FuenteDatoForma extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            tipo: "",
            guardar: ""
        }
        this.crearVariable = this.crearVariable.bind(this);
        this.traerForma = this.traerForma.bind(this);
        this.eliminarVarExcel = this.eliminarVarExcel.bind(this);
        this.eliminarVariable = this.eliminarVariable.bind(this);
    }

    componentDidMount() {
        if (this.props.tipoVariableOriginal.localeCompare("forma") == 0) {
            this.traerForma();
        }
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
                                guardar: result.recordset[0].guardar
                            });
                            $("#nombreVariable").val(result.recordset[0].nombre);
                            $("#tipo").val(result.recordset[0].tipo);
                            if (result.recordset[0].guardar)
                                $("#guardarVariable").prop('checked', true);
                            else
                                $("#guardarVariable").prop('checked', false);
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
        if(nombreVariable.length > 0 && nombreVariable.length < 1001) {
            if(tipo.length > 0 && tipo.length < 1001) {
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
                        request.query("insert into FormasVariables (nombre, tipo, guardar) values ('"+nombreVariable+"', '"+tipo+"', '"+guardarVariable+"')", (err, result) => {
                            if (err) {
                                console.log(err);
                                if (!rolledBack) {
                                    transaction.rollback(err => {
                                    });
                                }
                            } else {
                                transaction.commit(err => {
                                    alert("Variable Modificada");
                                    this.props.actualizarIDVariableModificada("forma");
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
                        request.query("update FormasVariables set nombre = '"+nombreVariable+"', tipo = '"+tipo+"', guardar = '"+guardarVariable+"' where ID = "+this.props.idVariable, (err, result) => {
                            if (err) {
                                console.log(err);
                                if (!rolledBack) {
                                    transaction.rollback(err => {
                                    });
                                }
                            } else {
                                transaction.commit(err => {
                                    alert("Variable Modificada");
                                });
                            }
                        });
                    }); // fin transaction
                }
            } else {
                alert('Ingrese un valor para el tipo de la variable que debe ser menor a 31 caracteres');
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
            request7.query("delete from InstruccionSQL variableID = "+this.props.idVariable, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction7.rollback(err => {
                        });
                    }
                } else {
                    transaction7.commit(err => {
                        this.limpiarArreglos();
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
                </div>
                <br/>
            </div>
        );
    }
}
