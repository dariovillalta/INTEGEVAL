import React from 'react';
import sql from 'mssql';
import Slider from 'react-input-slider';

var colores = ["primary", "brand", "secondary", "success", "danger", "warning", "info", "dark"];

export default class EditarUmbral extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            umbrales: [],
            umbralSeleccionadoID: -1,
            umbralNombreSeleccionado: '',
            seccionesUmbral: [],
            seccionUmbralSeleccionadoID: -1,
            seccionUmbralNombreSeleccionado: '',
            rangosSeccionUmbral: []
        }
        this.traerUmbrales = this.traerUmbrales.bind(this);
        this.seleccionUmbral = this.seleccionUmbral.bind(this);
        this.retornoSeleccionUmbral = this.retornoSeleccionUmbral.bind(this);
        this.traerSeccionesUmbral = this.traerSeccionesUmbral.bind(this);
        this.agregarSeccionUmbral = this.agregarSeccionUmbral.bind(this);
        this.seleccionSeccionUmbral = this.seleccionSeccionUmbral.bind(this);
        this.retornoSeccionSeleccionUmbral = this.retornoSeccionSeleccionUmbral.bind(this);
        this.traerRangosSeccionUmbral = this.traerRangosSeccionUmbral.bind(this);
        this.agregarRangoSeccionUmbral = this.agregarRangoSeccionUmbral.bind(this);
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
            request.query("select * from Umbral where variableID="+this.props.idVariable, (err, result) => {
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

    seleccionUmbral (index) {
        this.setState({
            umbralSeleccionadoID: this.state.umbrales[index].ID,
            umbralNombreSeleccionado: this.state.umbrales[index].nombre
        }, this.traerSeccionesUmbral );
    }

    retornoSeleccionUmbral () {
        this.setState({
            umbralSeleccionadoID: -1,
            umbralNombreSeleccionado: ""
        });
    }

    traerSeccionesUmbral () {
        console.log(this.state.umbralSeleccionadoID)
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from SeccionUmbral where umbralID = "+this.state.umbralSeleccionadoID, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            seccionesUmbral: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    agregarSeccionUmbral() {
        var nombre = $("#nuevaSeccionUmbral").val();
        if(nombre.length > 0 && nombre.length < 101) {
            const transaction = new sql.Transaction( this.props.pool );
            transaction.begin(err => {
                var rolledBack = false;
                transaction.on('rollback', aborted => {
                    rolledBack = true;
                });
                const request = new sql.Request(transaction);
                request.query("insert into SeccionUmbral (umbralID, nombre) values ("+this.state.umbralSeleccionadoID+", '"+nombre+"')", (err, result) => {
                    if (err) {
                        console.log(err);
                        if (!rolledBack) {
                            transaction.rollback(err => {
                            });
                        }
                    } else {
                        transaction.commit(err => {
                            this.traerSeccionesUmbral();
                        });
                    }
                });
            }); // fin transaction
        } else {
            alert("Ingrese un valor para el nombre d ela sección de umbral.");
        }
    }

    seleccionSeccionUmbral (index) {
        this.setState({
            seccionUmbralSeleccionadoID: this.state.seccionesUmbral[index].ID,
            seccionUmbralNombreSeleccionado: this.state.seccionesUmbral[index].nombre
        }, this.traerSeccionesUmbral );
    }

    retornoSeccionSeleccionUmbral () {
        this.setState({
            seccionUmbralSeleccionadoID: -1,
            seccionUmbralNombreSeleccionado: ""
        });
    }

    traerRangosSeccionUmbral () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from RangoSeccionUmbral where seccionUmbralID = "+this.state.seccionUmbralSeleccionadoID, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            rangosSeccionUmbral: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    agregarRangoSeccionUmbral() {
        var valMinimo = $("#nuevaSeccionUmbral").val();
        var valMaximo = $("#nuevaSeccionUmbral").val();
        if(nombre.length > 0 && nombre.length < 101) {
            const transaction = new sql.Transaction( this.props.pool );
            transaction.begin(err => {
                var rolledBack = false;
                transaction.on('rollback', aborted => {
                    rolledBack = true;
                });
                const request = new sql.Request(transaction);
                request.query("insert into SeccionUmbral (umbralID, nombre) values ("+this.state.umbralSeleccionadoID+", '"+nombre+"')", (err, result) => {
                    if (err) {
                        console.log(err);
                        if (!rolledBack) {
                            transaction.rollback(err => {
                            });
                        }
                    } else {
                        transaction.commit(err => {
                            this.traerSeccionesUmbral();
                        });
                    }
                });
            }); // fin transaction
        } else {
            alert("Ingrese un valor para el nombre d ela sección de umbral.");
        }
    }
    
    render() {
        if(this.state.umbralSeleccionadoID == -1) {
            console.log("YEEE1");
            return (
                <div style={{width: "100%", height: "100%"}}>
                    <div className={"row"}>
                        {this.state.umbrales.map((umbral, i) => (
                            <div key={umbral.ID} className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                <a href="#" onClick={() => this.seleccionUmbral(i)} className={"btn btn-outline-"+ ( colores[i]!= undefined ? colores[i] : colores[i%colores.length]) } style={{width: "100%"}}>{umbral.nombre}</a>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if(this.state.umbralSeleccionadoID != -1 && this.state.seccionUmbralSeleccionadoID == -1) {
            console.log("YEEE2");
            return (
                <div style={{width: "100%", height: "100%"}}>
                    <div className={"row"}>
                        <div onClick={() => this.retornoSeleccionUmbral()}  className={"col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 form-group addPointer border"}>
                            <label className="font-24 addPointer"> {"<"} </label>
                        </div>
                        <div className={"col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 form-group"}>
                            <h2>{this.state.umbralNombreSeleccionado}</h2>
                        </div>
                    </div>
                    <hr/>
                    <div className={"row"}>
                        <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                            <label htmlFor="nuevaSeccionUmbral" className="col-form-label">Nombre Nueva Sección de Umbral:</label>
                        </div>
                        <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                            <input id="nuevaSeccionUmbral" type="text" className="form-control form-control-sm"/>
                        </div>
                    </div>
                    <div className={"text-center"}>
                        <a onClick={this.agregarSeccionUmbral} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Agregar Sección de Umbral</a>
                    </div>
                    <br/>
                    {this.state.seccionesUmbral.map((seccionUmbral, i) => (
                        <div key={seccionUmbral.ID} className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <a href="#" onClick={() => this.seleccionSeccionUmbral(i)} className={"btn btn-outline-"+ ( colores[i]!= undefined ? colores[i] : colores[i%colores.length]) } style={{width: "100%"}}>{seccionUmbral.nombre}</a>
                        </div>
                    ))}
                </div>
            );
        } else if(this.state.umbralSeleccionadoID != -1 && this.state.seccionUmbralSeleccionadoID != -1) {
            return (
                <div style={{width: "100%", height: "100%"}}>
                    <div className={"row"}>
                        <div onClick={() => this.retornoSeccionSeleccionUmbral()} className={"col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 form-group addPointer border"}>
                            <label className="font-24 addPointer"> {"<"} </label>
                        </div>
                        <div className={"col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 form-group"}>
                            <h2>{this.state.seccionUmbralNombreSeleccionado}</h2>
                        </div>
                    </div>
                    <hr/>
                    <div className={"row"}>
                        <div className={"col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 form-group"}>
                            <label htmlFor="inputSmall" className="col-form-label">Nombre Sección de Umbral:</label>
                        </div>
                        <div className={"col-xl-11 col-lg-11 col-md-11 col-sm-11 col-11 form-group"}>
                            <h2>{this.state.seccionUmbralNombreSeleccionado}</h2>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 form-group text-center"}>
                            <label htmlFor="inputSmall" className="col-form-label">Valor mínimo:</label>
                        </div>
                        <div className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 form-group text-center"}>
                            <label htmlFor="inputSmall" className="col-form-label">Valor máximo:</label>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 form-group"}>
                            <input id="inputSmall" type="text" className="form-control form-control-sm"/>
                        </div>
                        <div className={"col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 form-group"}>
                            <Slider
                                axis="x"
                                xstep={1}
                                xmin={0}
                                xmax={100}
                                x={0}
                                style={{width: "100%", marginTop: "10px"}}/>
                        </div>
                    </div>
                    {this.state.rangosSeccionUmbral.map((rangoSeccionUmbral, j) => (
                        <div>
                            <hr/>
                            <div className={"row"}>
                                <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                    <label htmlFor="inputSmall" className="col-form-label">Nombre Sección de Umbral:</label>
                                </div>
                                <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                    <input id="inputSmall" type="text" defaultValue={seccionUmbral.nombre} className="form-control form-control-sm"/>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 form-group text-center"}>
                                    <label htmlFor="inputSmall" className="col-form-label">Valor Mínimo Nuevo:</label>
                                </div>
                                <div className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 form-group text-center"}>
                                    <label htmlFor="inputSmall" className="col-form-label">Valor Máximo Nuevo:</label>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 form-group"}>
                                    <input id="inputSmall" type="text" className="form-control form-control-sm"/>
                                </div>
                                <div className={"col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 form-group"}>
                                    <Slider
                                        axis="x"
                                        xstep={1}
                                        xmin={0}
                                        xmax={100}
                                        x={0}
                                        style={{width: "100%", marginTop: "10px"}}/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    }
}
