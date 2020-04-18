import React from 'react';
import sql from 'mssql';

export default class CrearUmbral extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            umbrales: []
        }
        this.traerUmbrales = this.traerUmbrales.bind(this);
        this.crearUmbral = this.crearUmbral.bind(this);
        this.noExisteUmbral = this.noExisteUmbral.bind(this);
    }

    componentDidMount() {
        this.traerUmbrales();
    }

    traerUmbrales () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Umbral where variableID = "+this.props.idVariable, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            umbrales: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    crearUmbral () {
        var nombre = $("#nombreUmbral").val();
        if(nombre.length > 0 && nombre.length < 101) {
            if(this.noExisteUmbral(nombre)) {
                const transaction = new sql.Transaction( this.props.pool );
                transaction.begin(err => {
                    var rolledBack = false;
                    transaction.on('rollback', aborted => {
                        rolledBack = true;
                    });
                    const request = new sql.Request(transaction);
                    request.query("insert into Umbral (variableID, nombre) values ("+this.props.idVariable+", '"+nombre+"')", (err, result) => {
                        if (err) {
                            console.log(err);
                            if (!rolledBack) {
                                transaction.rollback(err => {
                                });
                            }
                        } else {
                            transaction.commit(err => {
                                alert("Umbral Creado");
                            });
                        }
                    });
                }); // fin transaction
            } else {
                alert("El nombre del umbral ya existe para esta variable");
            }
        } else {
            alert("Ingrese un valor para el nombre del umbral que debe ser mayor a 0 caracteres y menor a 101");
        }
    }
    noExisteUmbral (nombre) {
        var noExiste = true;
        for (var i = 0; i < this.state.umbrales.length; i++) {
            if(this.state.umbrales[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
                noExiste = false;
                break;
            }
        };
        return noExiste;
    }
    
    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <div className={"row"}>
                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                        <label htmlFor="nombreUmbral" className="col-form-label">Nombre Umbral:</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                        <input id="nombreUmbral" type="text" className="form-control form-control-sm"/>
                    </div>
                </div>
                <div className={"text-center"}>
                    <a onClick={this.crearUmbral} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Crear Umbral</a>
                </div>
            </div>
        );
    }
}
