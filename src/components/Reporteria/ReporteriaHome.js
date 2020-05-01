import React from 'react';
import sql from 'mssql';

import ImportacionResultadosHome from '../ImportacionResultados/ImportacionResultadosHome.js';
import Reporteria from './Reporteria.js';

export default class ReporteriaHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componenteActual: "importarResultados",
            variables: [],
            indicadores: [],
            riesgos: []
        }
        this.returnImportResults = this.returnImportResults.bind(this);
        this.retornoVariables = this.retornoVariables.bind(this);
    }

    /*componentDidMount () {
        //
    }*/

    returnImportResults () {
        this.setState({
            componenteActual: "importarResultados"
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
        if(this.state.componenteActual.localeCompare("importarResultados") == 0) {
            return (
                <div>
                    <ImportacionResultadosHome pool={this.props.pool}
                                            navbarFechas={this.state.navbarFechas}
                                            goCreateFilters={this.props.goCreateFilters}
                                            retornoVariables={this.retornoVariables}>
                    </ImportacionResultadosHome>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("visualizarReporteria") == 0) {
            return (
                <div>
                    <Reporteria pool={this.props.pool}
                                            variables={this.state.variables}
                                            indicadores={this.state.indicadores}
                                            riesgos={this.state.riesgos}
                                            returnImportResults={this.returnImportResults}>
                    </Reporteria>
                </div>
            );
        }
    }
}
