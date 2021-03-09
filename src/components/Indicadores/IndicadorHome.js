import React from 'react';
import sql from 'mssql';

import SeleccionarIndicador from './SeleccionarIndicador.js';
import CrearIndicador from './CrearIndicador/CrearIndicador.js';
import EditarIndicador from './EditarIndicador/EditarIndicador.js';

export default class IndicadorHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componenteAMostrar: "selIndicador",
            idIndicadorSeleccionado: -1,
            idFormulaIndicadorSeleccionada: "",
            nombreIndicadorSeleccionada: "",
            codigoIndicadorSeleccionada: "",
            formulaIndicadorSeleccionada: "",
            pesoIndicadorSeleccionada: "",
            toleranciaIndicadorSeleccionada: "",
            tipoValorIdealIndicadorSeleccionada: "",
            valorIdealIndicadorSeleccionada: "",
            periodicidadIndicadorSeleccionada: "",
            tipoIndicadorIndicadorSeleccionada: "",
            analistaIndicadorSeleccionada: "",
            fechaInicioCalculoSeleccionada: "",
            idRiesgoPadreSeleccionado: -1,
            formulaRiesgo: "",
            pesoDisponibleRiesgo: 0,
            indicadoresSeleccionados: [],
            riesgos: [],
            indicadores: []
        }
        this.getIndicators = this.getIndicators.bind(this);
        this.terminoSeleccionIndicador = this.terminoSeleccionIndicador.bind(this);
        this.retornoSeleccionIndicador = this.retornoSeleccionIndicador.bind(this);
        this.goCrearIndicador = this.goCrearIndicador.bind(this);
        this.goEditarIndicador = this.goEditarIndicador.bind(this);
        this.terminoCrearIndicadorPasarAEdit = this.terminoCrearIndicadorPasarAEdit.bind(this);
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

    terminoSeleccionIndicador (id, formula) {
        this.setState({
            componenteAMostrar: "editIndicador",
            idIndicadorSeleccionado: id,
            formulaRiesgo: formula
        });
    }

    retornoSeleccionIndicador () {
        this.setState({
            componenteAMostrar: "selIndicador",
            idIndicadorSeleccionado: -1,
            idRiesgoPadreSeleccionado: -1
        });
    }

    goCrearIndicador (idRiesgo, formula, pesoDisponible) {
        this.setState({
            componenteAMostrar: "crearIndicador",
            idRiesgoPadreSeleccionado: idRiesgo,
            formulaRiesgo: formula,
            pesoDisponibleRiesgo: pesoDisponible
        });
    }

    goEditarIndicador (idRiesgo, formula, pesoDisponible, idIndicador, idFormula, nombreIndicador, codigoIndicador, formulaIndicador, pesoIndicador, toleranciaIndicador, tipoValorIdealIndicador, valorIdealIndicador, periodicidadIndicador, tipoIndicadorIndicador, analistaIndicador, fechaInicioCalculo, indicadores) {
        this.setState({
            componenteAMostrar: "editIndicador",
            idRiesgoPadreSeleccionado: idRiesgo,
            formulaRiesgo: formula,
            pesoDisponibleRiesgo: pesoDisponible,
            idIndicadorSeleccionado: idIndicador,
            idFormulaIndicadorSeleccionada: idFormula,
            nombreIndicadorSeleccionada: nombreIndicador,
            codigoIndicadorSeleccionada: codigoIndicador,
            formulaIndicadorSeleccionada: formulaIndicador,
            pesoIndicadorSeleccionada: pesoIndicador,
            toleranciaIndicadorSeleccionada: toleranciaIndicador,
            tipoValorIdealIndicadorSeleccionada: tipoValorIdealIndicador,
            valorIdealIndicadorSeleccionada: valorIdealIndicador,
            periodicidadIndicadorSeleccionada: periodicidadIndicador,
            tipoIndicadorIndicadorSeleccionada: tipoIndicadorIndicador,
            analistaIndicadorSeleccionada: analistaIndicador,
            fechaInicioCalculoSeleccionada: fechaInicioCalculo,
            indicadoresSeleccionados: indicadores
        });
    }

    terminoCrearIndicadorPasarAEdit (nombreIndicador) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select top 1 * from Indicadores order by ID desc", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length) {
                            var indicadores;
                            for (var i = 0; i < this.state.riesgos.length; i++) {
                                if (this.state.idRiesgoPadreSeleccionado === this.state.riesgos[i].ID) {
                                    indicadores = this.state.indicadores[i];
                                    break;
                                }
                            };
                            this.goEditarIndicador(this.state.idRiesgoPadreSeleccionado, this.state.formulaRiesgo, this.state.pesoDisponibleRiesgo, result.recordset[0].ID, result.recordset[0].nombre, result.recordset[0].codigo, result.recordset[0].formula, result.recordset[0].peso, result.recordset[0].tolerancia, result.recordset[0].tipoValorIdeal, result.recordset[0].periodicidad, result.recordset[0].tipoIndicador, result.recordset[0].analista, result.recordset[0].fechaInicioCalculo, indicadores);
                            this.getIndicators();
                        }
                    });
                }
            });
        }); // fin transaction
    }

    render() {
        if(this.state.componenteAMostrar.localeCompare("selIndicador") == 0) {
            return (
                <div>
                    <SeleccionarIndicador pool={this.props.pool}
                                        configuracionHome={this.props.configuracionHome}
                                        terminoSeleccionIndicador={this.terminoSeleccionIndicador}
                                        goCrearIndicador={this.goCrearIndicador}
                                        showRiesgos={this.props.showRiesgos}
                                        riesgos={this.state.riesgos}
                                        indicadores={this.state.indicadores}
                                        updateBanderaCrearRiesgoTrue={this.props.updateBanderaCrearRiesgoTrue}
                                        goEditarIndicador={this.goEditarIndicador}
                                        permision={this.props.permision}></SeleccionarIndicador>
                </div>
            );
        } else if(this.state.componenteAMostrar.localeCompare("crearIndicador") == 0) {
            return (
                <div>
                    <CrearIndicador pool={this.props.pool}
                                    showCondicionVar={this.props.showCondicionVar}
                                    retornoSeleccionIndicador={this.retornoSeleccionIndicador}
                                    configuracionHome={this.props.configuracionHome}
                                    terminoCrearIndicadorPasarAEdit={this.terminoCrearIndicadorPasarAEdit}
                                    riesgoPadre={this.state.idRiesgoPadreSeleccionado}
                                    formulaRiesgo={this.state.formulaRiesgo}
                                    pesoDisponibleRiesgo={this.state.pesoDisponibleRiesgo}> </CrearIndicador>
                </div>
            );
        } else if(this.state.componenteAMostrar.localeCompare("editIndicador") == 0) {
            return (
                <div>
                    <EditarIndicador pool={this.props.pool}
                                    showFormula={this.props.showFormula}
                                    showCondicionVar={this.props.showCondicionVar}
                                    retornoSeleccionIndicador={this.retornoSeleccionIndicador}
                                    configuracionHome={this.props.configuracionHome}
                                    riesgoPadre={this.state.idRiesgoPadreSeleccionado}
                                    formulaRiesgo={this.state.formulaRiesgo}
                                    pesoDisponibleRiesgo={this.state.pesoDisponibleRiesgo}
                                    idIndicadorSeleccionado={this.state.idIndicadorSeleccionado}
                                    idFormulaIndicadorSeleccionada={this.state.idFormulaIndicadorSeleccionada}
                                    nombreIndicadorSeleccionada={this.state.nombreIndicadorSeleccionada}
                                    codigoIndicadorSeleccionada={this.state.codigoIndicadorSeleccionada}
                                    formulaIndicadorSeleccionada={this.state.formulaIndicadorSeleccionada}
                                    pesoIndicadorSeleccionada={this.state.pesoIndicadorSeleccionada}
                                    toleranciaIndicadorSeleccionada={this.state.toleranciaIndicadorSeleccionada}
                                    tipoToleranciaIndicadorSeleccionada={this.state.tipoToleranciaIndicadorSeleccionada}
                                    valorIdealIndicadorSeleccionada={this.state.valorIdealIndicadorSeleccionada}
                                    periodicidadIndicadorSeleccionada={this.state.periodicidadIndicadorSeleccionada}
                                    tipoIndicadorIndicadorSeleccionada={this.state.tipoIndicadorIndicadorSeleccionada}
                                    analistaIndicadorSeleccionada={this.state.analistaIndicadorSeleccionada}
                                    indicadores={this.state.indicadoresSeleccionados}
                                    permision={this.props.permision}
                                    getIndicators={this.getIndicators}
                                    userID={this.props.userID}
                                    userName={this.props.userName} > </EditarIndicador>
                </div>
            );
        }
    }
}
