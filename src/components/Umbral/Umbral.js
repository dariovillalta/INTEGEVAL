import React from 'react';
import sql from 'mssql';

import VistaUmbral from './VistaUmbral.js';
import CrearUmbral from './CrearUmbral.js';
import ListaRestoUmbrales from './ListaRestoUmbrales.js';

const secciones = [{nombre: "MONO 1", color: "#00c853", width: "25"}, {nombre: "MONO 2", color: "#ffab40", width: "50"}, {nombre: "MONO 1", color: "#00c853", width: "25"}];
var seccionesConRango = [];
var posicionesInsertadasRango = 0, posicionesAInsertarRango = 0;

export default class Umbral extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            umbrales: [],
            secciones: []
        }
        this.traerUmbrales = this.traerUmbrales.bind(this);
        this.inicioTraerSecciones = this.inicioTraerSecciones.bind(this);
        this.traerSeccion = this.traerSeccion.bind(this);
        this.inicioTraerSeccionRango = this.inicioTraerSeccionRango.bind(this);
        this.traerSeccionRango = this.traerSeccionRango.bind(this);
        this.inicioCrearArregloSeccionRango = this.inicioCrearArregloSeccionRango.bind(this);
        this.ingresarSeccion = this.ingresarSeccion.bind(this);
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
            request.query("select * from Umbral where variableID = "+this.props.idVariable+" and tablaVariable = '"+this.props.tablaVariable+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        this.props.showMessage("Error", "No se pudo traer valores de la tabla de umbrales.", true, false, {});
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            umbrales: result.recordset
                        }, this.inicioTraerSecciones );
                    });
                }
            });
        }); // fin transaction
    }

    inicioTraerSecciones () {
        var posicionesInsertadas = [];
        seccionesConRango = [];
        for (var i = 0; i < this.state.umbrales.length; i++) {
            this.traerSeccion(this.state.umbrales[i], i, this.state.umbrales.length, posicionesInsertadas);
        };
    }

    traerSeccion (umbral, index, ultimoIndex, posicionesInsertadas) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from SeccionUmbral where umbralID = "+umbral.ID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        this.props.showMessage("Error", "No se pudo traer valores de la tabla de secciones del umbral.", true, false, {});
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(seccionesConRango[index] == undefined)
                            seccionesConRango[index] = [];
                        seccionesConRango[index] = result.recordset;
                        posicionesInsertadas.push(index);
                        if(posicionesInsertadas.length == ultimoIndex)
                            this.inicioTraerSeccionRango();
                    });
                }
            });
        }); // fin transaction
    }

    inicioTraerSeccionRango () {
        posicionesInsertadasRango = 0, posicionesAInsertarRango = 0;
        for (var i = 0; i < seccionesConRango.length; i++) {
            for (var j = 0; j < seccionesConRango[i].length; j++) {
                posicionesAInsertarRango++;
                this.traerSeccionRango(seccionesConRango[i][j], i, j);
            };
        };
    }

    traerSeccionRango (seccionRango, indexUmbral, indexRango) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from RangoSeccionUmbral where umbralID = "+seccionRango.umbralID+" and seccionUmbralID = "+seccionRango.ID, (err, result) => {
                if (err) {
                    posicionesInsertadasRango++;
                    console.log(err);
                    this.props.showMessage("Error", "No se pudo traer valores de la tabla de rangos de sección del umbral.", true, false, {});
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        posicionesInsertadasRango++;
                        if(seccionesConRango[indexUmbral] == undefined)
                            seccionesConRango[indexUmbral] = [];
                        if(seccionesConRango[indexUmbral][indexRango] == undefined)
                            seccionesConRango[indexUmbral][indexRango] = [];
                        seccionesConRango[indexUmbral][indexRango].rangos = result.recordset;
                        if(posicionesInsertadasRango == posicionesAInsertarRango)
                            this.inicioCrearArregloSeccionRango();
                    });
                }
            });
        }); // fin transaction
    }

    inicioCrearArregloSeccionRango () {
        var arrOrdenado = [];
        for (var i = 0; i < seccionesConRango.length; i++) {
            for (var j = 0; j < seccionesConRango[i].length; j++) {
                for (var k = 0; k < seccionesConRango[i][j].rangos.length; k++) {
                    this.ingresarSeccion(seccionesConRango[i][j].rangos[k], arrOrdenado, seccionesConRango[i][j].nombre, seccionesConRango[i][j].color);
                };
            };
        };
        //calculando porcentaje dentro del total
        //suma del total
        var sumTot = 0;
        for (var i = 0; i < arrOrdenado.length; i++) {
            var totSec = arrOrdenado[i].valorMaximo - arrOrdenado[i].valorMinimo;
            sumTot += totSec;
        };
        for (var i = 0; i < arrOrdenado.length; i++) {
            var totSec = arrOrdenado[i].valorMaximo - arrOrdenado[i].valorMinimo;
            arrOrdenado[i].width = (totSec / sumTot) * 100;
        };
        this.setState({
            secciones: arrOrdenado
        });
    }

    ingresarSeccion (seccionNueva, arrSecciones, nombre, color) {
        if(arrSecciones.length == 0) {
            arrSecciones.push(seccionNueva);
            arrSecciones[arrSecciones.length-1].nombre = nombre;
            arrSecciones[arrSecciones.length-1].color = color;
            return;
        }
        var encontroPos = false;
        for (var i = 0; i < arrSecciones.length; i++) {
            if(seccionNueva.valorMaximo < arrSecciones[i].valorMinimo) {
                encontroPos = true;
                break;
            }
        };
        arrSecciones.splice(i, 0, seccionNueva);
        arrSecciones[i].nombre = nombre;
        arrSecciones[i].color = color;
    }

    render() {
        return (
            <div>
                {this.props.navbar}
                <ListaRestoUmbrales lista={this.props.lista}> </ListaRestoUmbrales>
                <VistaUmbral umbrales={this.state.secciones}> </VistaUmbral>
                <CrearUmbral idVariable={this.props.idVariable} pool={this.props.pool}
                                                        tablaVariable={this.props.tablaVariable}
                                                        tituloUmbral={this.props.tituloUmbral}
                                                        traerUmbralesPADRE={this.traerUmbrales}
                                                        maximoUmbral={this.props.maximoUmbral}
                                                        showSuccesMessage={this.props.showSuccesMessage}
                                                        showMessage={this.props.showMessage}> </CrearUmbral>
            </div>
        );
    }
}
