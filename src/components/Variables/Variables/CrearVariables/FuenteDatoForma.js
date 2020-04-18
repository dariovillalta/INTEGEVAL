import React from 'react';
import sql from 'mssql';

export default class FuenteDatoForma extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.crearVariable = this.crearVariable.bind(this);
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
                                alert("Variable Creada");
                                $("#nombreVariable").val("");
                                $("#tipo").val("numero");
                            });
                        }
                    });
                }); // fin transaction
            } else {
                alert('Ingrese un valor para el tipo de la variable que debe ser menor a 31 caracteres');
            }
        } else {
            alert('Ingrese un valor para el nombre de la variable que debe ser menor a 101 caracteres');
        }
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
