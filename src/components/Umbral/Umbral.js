import React from 'react';

import VistaUmbral from './VistaUmbral.js';
import UmbralOpciones from './UmbralOpciones.js';

const secciones = [{nombre: "MONO 1", color: "#00c853", width: "25%"}, {nombre: "MONO 2", color: "#ffab40", width: "50%"}, {nombre: "MONO 1", color: "#00c853", width: "25%"}];
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
        console.log(this.props.navbar)
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
                    if (!rolledBack) {
                        console.log(err);
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
                this.traerSeccionRango(seccionesConRango[i][j]);
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
            request.query("select * from RangoSeccionUmbral where variableID = "+this.props.idVariable, (err, result) => {
                if (err) {
                    posicionesInsertadasRango++;
                    console.log(err);
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
                    this.ingresarSeccion(seccionesConRango[i][j].rangos[k], arrOrdenado);
                };
            };
        };
        console.log('arrOrdenado');
        console.log(arrOrdenado);
        //calculando porcentaje dentro del total
        //suma del total
        var sumTot = 0;
        for (var i = 0; i < arrOrdenado.length; i++) {
            var totSec = arrOrdenado[i].valorMaximo - arrOrdenado[i].valorMinimo;
            sumTot += totSec;
        };
        for (var i = 0; i < arrOrdenado.length; i++) {
            var totSec = arrOrdenado[i].valorMaximo - arrOrdenado[i].valorMinimo;
            arrOrdenado[i].valorMaximo.width = totSec / sumTot;
        };
    }

    ingresarSeccion (seccionNueva, arrSecciones) {
        if(arrSecciones.length == 0) {
            arrSecciones.push(seccionNueva);
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
    }

    render() {
        return (
            <div>
                {this.props.navbar}
                <VistaUmbral umbrales={secciones}> </VistaUmbral>
                <UmbralOpciones idVariable={this.props.idVariable} pool={this.props.pool}> </UmbralOpciones>
            </div>
        );
    }
}
