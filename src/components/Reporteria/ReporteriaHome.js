import React from 'react';
import sql from 'mssql';

import SeleccionarFechas from '../ImportacionResultados/SeleccionarFechas.js';
import Filtro from '../ImportacionResultados/Filtro.js';
import Reporteria from './Reporteria.js';

export default class ReporteriaHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componenteActual: "selFechas",
            fechaInicial: null,
            fechaFinal: null,
            variables: [],
            indicadores: [],
            riesgos: []
        }
        this.goCreateFilters = this.goCreateFilters.bind(this);
        this.returnChooseDates = this.returnChooseDates.bind(this);
        this.returnChooseFilter = this.returnChooseFilter.bind(this);
        this.retornoVariables = this.retornoVariables.bind(this);
    }

    /*componentDidMount () {
        //
    }*/

    goCreateFilters (fechaInicial, fechaFinal) {
        if(fechaInicial == null && fechaFinal == null) {
            this.setState({
                componenteActual: "crearFiltros"
            });
        } else if(fechaInicial == null && fechaFinal != null) {
            this.setState({
                componenteActual: "crearFiltros",
                fechaFinal: fechaFinal
            });
        } else if(fechaInicial != null && fechaFinal == null) {
            this.setState({
                componenteActual: "crearFiltros",
                fechaInicial: fechaInicial
            });
        } else if(fechaInicial != null && fechaFinal != null) {
            this.setState({
                componenteActual: "crearFiltros",
                fechaInicial: fechaInicial,
                fechaFinal: fechaFinal
            });
        }
    }

    returnChooseDates () {
        this.setState({
            componenteActual: "selFechas"
        });
    }

    returnChooseFilter () {
        this.setState({
            componenteActual: "crearFiltros"
        });
    }

    retornoVariables (variables, indicadores, riesgos) {
        console.log('variables')
        console.log(variables)
        console.log('indicadores')
        console.log(indicadores)
        console.log('riesgos')
        console.log(riesgos)
        this.setState({
            variables: variables,
            indicadores: indicadores,
            riesgos: riesgos,
            componenteActual: "visualizarReporteria"
        });
    }

    render() {
        if(this.state.componenteActual.localeCompare("selFechas") == 0) {
            return (
                <div>
                    <SeleccionarFechas navbar={this.props.navbarFechas}
                                            goCreateFilters={this.goCreateFilters}>
                    </SeleccionarFechas>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("crearFiltros") == 0) {
            return (
                <div>
                    <Filtro pool={this.props.pool}
                                            fechaInicial={this.state.fechaInicial}
                                            fechaFinal={this.state.fechaFinal}
                                            retornoVariables={this.retornoVariables}
                                            returnChooseDates={this.returnChooseDates}>
                    </Filtro>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("visualizarReporteria") == 0) {
            return (
                <div>
                    <Reporteria pool={this.props.pool}
                                            variables={this.state.variables}
                                            indicadores={this.state.indicadores}
                                            riesgos={this.state.riesgos}
                                            returnChooseDates={this.returnChooseDates}
                                            returnChooseFilter={this.returnChooseFilter}>
                    </Reporteria>
                </div>
            );
        }
    }
}
