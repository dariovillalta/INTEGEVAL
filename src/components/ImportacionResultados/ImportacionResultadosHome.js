import React from 'react';
import sql from 'mssql';

import SeleccionarFechas from './SeleccionarFechas.js';
import Filtro from './Filtro.js';

var isMounted = false;

export default class ImportacionResultadosHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componenteActual: "selFechas",
            fechaInicial: null,
            fechaFinal: null
        }
        this.goCreateFilters = this.goCreateFilters.bind(this);
        this.returnChooseDates = this.returnChooseDates.bind(this);
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
                                            retornoVariables={this.props.retornoVariables}
                                            returnChooseDates={this.props.returnChooseDates}>
                    </Filtro>
                </div>
            );
        }
    }
}
