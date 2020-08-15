import React from 'react';
import sql from 'mssql';

import Accordion from '../Accordion/Accordion.js';

export default class SeleccionarIndicador extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            riesgos: [],
            indicadores: []
        }
        this.getIndicators = this.getIndicators.bind(this);
        this.insertIndicator = this.insertIndicator.bind(this);
        this.irCrearRiesgos = this.irCrearRiesgos.bind(this);
        this.calcularPesoDisponible = this.calcularPesoDisponible.bind(this);
    }

    componentDidMount() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Riesgos", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            riesgos: result.recordset
                        });
                        this.getIndicators();
                    });
                }
            });
        }); // fin transaction
    }

    getIndicators() {
        var arregloTemp = [];
        for (var i = 0; i < this.state.riesgos.length; i++) {
            this.insertIndicator(this.state.riesgos[i].ID, i, arregloTemp);
        };
    }

    insertIndicator(riesgoID, index, array) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Indicadores where idRiesgoPadre = "+riesgoID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(array[index] == undefined) {
                            array[index] = [];
                        }
                        array[index] = $.merge(array[index], result.recordset);
                        this.setState({
                            indicadores: array
                        });
                    });
                }
            });
        }); // fin transaction
    }

    irCrearRiesgos () {
        this.props.updateBanderaCrearRiesgoTrue();
        this.props.showRiesgos();
    }

    calcularPesoDisponible (riesgo, indexRiesgo) {
        var pesoRiesgoTotal = 100;
        var pesoExistente = 0;
        for (var i = 0; i < this.state.indicadores[indexRiesgo].length; i++) {
            pesoExistente += this.state.indicadores[indexRiesgo][i].peso;
        };
        var pesoDisponible = pesoRiesgoTotal-pesoExistente;
        this.props.goCrearIndicador(riesgo.ID, riesgo.formula, pesoDisponible);
    }

    calcularPesoDisponibleEdit (riesgo, indexRiesgo, indexIndicador) {
        var pesoRiesgoTotal = 100;
        var pesoExistente = 0;
        var indicador = this.state.indicadores[indexRiesgo][indexIndicador];
        for (var i = 0; i < this.state.indicadores[indexRiesgo].length; i++) {
            pesoExistente += this.state.indicadores[indexRiesgo][i].peso;
        };
        var pesoDisponible = pesoRiesgoTotal-pesoExistente;
        this.props.goEditarIndicador(riesgo.ID, riesgo.formula, riesgo.pesoDisponible, indicador.ID, indicador.nombre, indicador.codigo, indicador.formula, indicador.peso, indicador.tolerancia, indicador.tipoValorIdeal, indicador.valorIdeal, indicador.periodicidad, indicador.tipoIndicador, indicador.analista, indicador.fechaInicioCalculo, this.state.indicadores[indexRiesgo]);
    }

    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Seleccionar Indicador</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Seleccionar Indicador</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        {this.state.riesgos.map((riesgo, i) => (
                            <div key={riesgo.ID}>
                                <Accordion showTrash={false} showEdit={false} allowMultipleOpen color={"#ffffff"}>
                                    <div label={riesgo.nombre}>
                                        { this.state.indicadores[i] != undefined ? (
                                            <div>
                                                {this.state.indicadores[i].map((indicador, j) =>
                                                    <a className={"btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM"} onClick={() => this.calcularPesoDisponibleEdit(riesgo, i, j)} key={indicador.ID}>{indicador.nombre}</a>
                                                )}
                                                <div className={"row"}>
                                                    <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={() => this.calcularPesoDisponible(riesgo, i)}>Crear Indicador</a>
                                                </div>
                                            </div>
                                        ) : (
                                            null
                                        )}
                                    </div>
                                </Accordion>
                                <br/>
                            </div>
                        ))}
                        { this.state.riesgos.length == 0 ? (
                            <a className={"btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"} onClick={this.irCrearRiesgos}>No existen riesgos creados, presione para crear</a>
                        ) : (
                            null
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
