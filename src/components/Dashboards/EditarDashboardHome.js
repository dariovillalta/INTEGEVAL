import React from 'react';
import sql from 'mssql';

import VerDashboard from './VerDashboard.js';
import EditarDashboard from './EditarDashboard.js';

export default class EditarDashboardHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componenteActual: "verDashboard",
            navbar: <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"page-header"}>
                                <h2 className={"pageheader-title"}>Ver Dashboard</h2>
                                <div className={"page-breadcrumb"}>
                                    <nav aria-label="breadcrumb">
                                        <ol className={"breadcrumb"}>
                                            <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goSeleccionReporteria}><a href="#" className={"breadcrumb-link"}>Seleccionar Tipo de Reportería</a></li>
                                            <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornarSeleccionDashboards}><a href="#" className={"breadcrumb-link"}>Dashboards</a></li>
                                            <li className={"breadcrumb-item active font-16"} aria-current="page">Dashboard: {this.props.dashboardSeleccionado.nombre}</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
        }
        this.retornoVerDashboard = this.retornoVerDashboard.bind(this);
        this.editarDashboard = this.editarDashboard.bind(this);
    }

    componentDidMount () {
        //
    }

    retornoVerDashboard () {
        var  navbar =   <div className={"row"}>
                            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                <div className={"page-header"}>
                                    <h2 className={"pageheader-title"}>Ver Dashboard</h2>
                                    <div className={"page-breadcrumb"}>
                                        <nav aria-label="breadcrumb">
                                            <ol className={"breadcrumb"}>
                                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goSeleccionReporteria}><a href="#" className={"breadcrumb-link"}>Seleccionar Tipo de Reportería</a></li>
                                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornarSeleccionDashboards}><a href="#" className={"breadcrumb-link"}>Dashboards</a></li>
                                                <li className={"breadcrumb-item active font-16"} aria-current="page">Dashboard: {this.props.dashboardSeleccionado.nombre}</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>;
        this.setState({
            componenteActual: "verDashboard",
            navbar: navbar
        });
    }

    editarDashboard (idVariable) {
        var  navbar =   <div className={"row"}>
                            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                <div className={"page-header"}>
                                    <h2 className={"pageheader-title"}>Editar Dashboard</h2>
                                    <div className={"page-breadcrumb"}>
                                        <nav aria-label="breadcrumb">
                                            <ol className={"breadcrumb"}>
                                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goSeleccionReporteria}><a href="#" className={"breadcrumb-link"}>Seleccionar Tipo de Reportería</a></li>
                                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornarSeleccionDashboards}><a href="#" className={"breadcrumb-link"}>Dashboards</a></li>
                                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoVerDashboard}><a href="#" className={"breadcrumb-link"}>Dashboard: {this.props.dashboardSeleccionado.nombre}</a></li>
                                                <li className={"breadcrumb-item active font-16"} aria-current="page">Editar Dashboard</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>;
        this.setState({
            componenteActual: "editarDashboard",
            navbar: navbar
        });
    }

    render() {
        if(this.state.componenteActual.localeCompare("verDashboard") == 0) {
            return (
                <div>
                    <VerDashboard pool={this.props.pool}
                                            navbar={this.state.navbar}
                                            variables={this.props.variables}
                                            indicadores={this.props.indicadores}
                                            riesgos={this.props.riesgos}
                                            dashboardSeleccionado={this.props.dashboardSeleccionado}
                                            retornarSeleccionDashboards={this.props.retornarSeleccionDashboards}
                                            editarDashboard={this.editarDashboard}>
                    </VerDashboard>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("editarDashboard") == 0) {
            return (
                <div>
                    <EditarDashboard pool={this.props.pool}
                                            navbar={this.state.navbar}
                                            variables={this.props.variables}
                                            indicadores={this.props.indicadores}
                                            riesgos={this.props.riesgos}
                                            retornoVerDashboard={this.retornoVerDashboard}
                                            dashboardSeleccionado={this.props.dashboardSeleccionado}
                                            retornarSeleccionDashboards={this.props.retornarSeleccionDashboards}>
                    </EditarDashboard>
                </div>
            );
        }
    }
}
