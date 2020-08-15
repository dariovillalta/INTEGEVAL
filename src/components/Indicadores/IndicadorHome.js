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
            indicadores: []
        }
        this.terminoSeleccionIndicador = this.terminoSeleccionIndicador.bind(this);
        this.retornoSeleccionIndicador = this.retornoSeleccionIndicador.bind(this);
        this.goCrearIndicador = this.goCrearIndicador.bind(this);
        this.goEditarIndicador = this.goEditarIndicador.bind(this);
        this.terminoCrearIndicadorPasarAEdit = this.terminoCrearIndicadorPasarAEdit.bind(this);
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

    goEditarIndicador (idRiesgo, formula, pesoDisponible, idIndicador, nombreIndicador, codigoIndicador, formulaIndicador, pesoIndicador, toleranciaIndicador, tipoValorIdealIndicador, valorIdealIndicador, periodicidadIndicador, tipoIndicadorIndicador, analistaIndicador, fechaInicioCalculo, indicadores) {
        this.setState({
            componenteAMostrar: "editIndicador",
            idRiesgoPadreSeleccionado: idRiesgo,
            formulaRiesgo: formula,
            pesoDisponibleRiesgo: pesoDisponible,
            idIndicadorSeleccionado: idIndicador,
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
            indicadores: indicadores
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
                            this.goEditarIndicador(this.state.idRiesgoPadreSeleccionado, this.state.formulaRiesgo, this.state.pesoDisponibleRiesgo, result.recordset[0].ID, result.recordset[0].nombre, result.recordset[0].codigo, result.recordset[0].formula, result.recordset[0].peso, result.recordset[0].tolerancia, result.recordset[0].tipoValorIdeal, result.recordset[0].periodicidad, result.recordset[0].tipoIndicador, result.recordset[0].analista, result.recordset[0].fechaInicioCalculo);
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
                                        showRiesgos={this.props.showRiesgos}
                                        updateBanderaCrearRiesgoTrue={this.props.updateBanderaCrearRiesgoTrue}
                                        goEditarIndicador={this.goEditarIndicador}></SeleccionarIndicador>
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
                                    indicadores={this.state.indicadores}> </EditarIndicador>
                </div>
            );
        }
    }
}
