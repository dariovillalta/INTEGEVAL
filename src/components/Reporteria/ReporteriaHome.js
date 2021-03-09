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
            riesgos: [],
            navbar: <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"page-header"}>
                                <h2 className={"pageheader-title"}>Seleccionar Fechas de Vigencia de Variables</h2>
                                <div className={"page-breadcrumb"}>
                                    <nav aria-label="breadcrumb">
                                        <ol className={"breadcrumb"}>
                                            <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goSeleccionReporteria}><a href="#" className={"breadcrumb-link"}>Seleccionar Tipo de Reportería</a></li>
                                            <li className={"breadcrumb-item active font-16"} aria-current="page">Seleccionar Fechas</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
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
        var navbar  =   <div className={"row"}>
                            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                <div className={"page-header"}>
                                    <h2 className={"pageheader-title"}>Seleccionar Fechas de Vigencia de Variables</h2>
                                    <div className={"page-breadcrumb"}>
                                        <nav aria-label="breadcrumb">
                                            <ol className={"breadcrumb"}>
                                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goSeleccionReporteria}><a href="#" className={"breadcrumb-link"}>Seleccionar Tipo de Reportería</a></li>
                                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.returnChooseDates}><a href="#" className={"breadcrumb-link"}>Seleccionar Fechas</a></li>
                                                <li className={"breadcrumb-item active font-16"} aria-current="page">Crear Filtros</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>;
        if(fechaInicial == null && fechaFinal == null) {
            this.setState({
                componenteActual: "crearFiltros",
                navbar: navbar
            });
        } else if(fechaInicial == null && fechaFinal != null) {
            this.setState({
                componenteActual: "crearFiltros",
                fechaFinal: fechaFinal,
                navbar: navbar
            });
        } else if(fechaInicial != null && fechaFinal == null) {
            this.setState({
                componenteActual: "crearFiltros",
                fechaInicial: fechaInicial,
                navbar: navbar
            });
        } else if(fechaInicial != null && fechaFinal != null) {
            this.setState({
                componenteActual: "crearFiltros",
                fechaInicial: fechaInicial,
                fechaFinal: fechaFinal,
                navbar: navbar
            });
        }
    }

    returnChooseDates () {
        var navbar  =   <div className={"row"}>
                            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                <div className={"page-header"}>
                                    <h2 className={"pageheader-title"}>Seleccionar Fechas de Vigencia de Variables</h2>
                                    <div className={"page-breadcrumb"}>
                                        <nav aria-label="breadcrumb">
                                            <ol className={"breadcrumb"}>
                                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goSeleccionReporteria}><a href="#" className={"breadcrumb-link"}>Seleccionar Tipo de Reportería</a></li>
                                                <li className={"breadcrumb-item active font-16"} aria-current="page">Seleccionar Fechas</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>;

        this.setState({
            componenteActual: "selFechas",
            navbar: navbar
        });
    }

    returnChooseFilter () {
        var navbar  =   <div className={"row"}>
                            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                <div className={"page-header"}>
                                    <h2 className={"pageheader-title"}>Seleccionar Fechas de Vigencia de Variables</h2>
                                    <div className={"page-breadcrumb"}>
                                        <nav aria-label="breadcrumb">
                                            <ol className={"breadcrumb"}>
                                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goSeleccionReporteria}><a href="#" className={"breadcrumb-link"}>Seleccionar Tipo de Reportería</a></li>
                                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.returnChooseDates}><a href="#" className={"breadcrumb-link"}>Seleccionar Fechas</a></li>
                                                <li className={"breadcrumb-item active font-16"} aria-current="page">Seleccionar Fechas</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>;
        this.setState({
            componenteActual: "crearFiltros",
            navbar: navbar
        });
    }

    retornoVariables (variables, indicadores, riesgos) {
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
                    <SeleccionarFechas navbar={this.state.navbar}
                                            goCreateFilters={this.goCreateFilters}>
                    </SeleccionarFechas>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("crearFiltros") == 0) {
            return (
                <div>
                    <Filtro pool={this.props.pool} navbar={this.state.navbar}
                                            fechaInicial={this.state.fechaInicial}
                                            fechaFinal={this.state.fechaFinal}
                                            retornoVariables={this.retornoVariables}
                                            returnChooseDates={this.returnChooseDates}>
                    </Filtro>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("visualizarReporteria") == 0) {
            return (
                <div style={{width: "100%"}}>
                    <Reporteria pool={this.props.pool}
                                            variables={this.state.variables}
                                            indicadores={this.state.indicadores}
                                            riesgos={this.state.riesgos}
                                            returnChooseDates={this.returnChooseDates}
                                            returnChooseFilter={this.returnChooseFilter}
                                            goSeleccionReporteria={this.props.goSeleccionReporteria}>
                    </Reporteria>
                </div>
            );
        }
    }
}
