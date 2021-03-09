import React from 'react';

import SeleccionarOpcionReporteria from './SeleccionarOpcionReporteria.js';
import DashboardHome from '../Dashboards/DashboardHome.js';
import ReporteriaHome from '../Reporteria/ReporteriaHome.js';
import GraficosHome from '../Graficos/GraficosHome.js';

export default class SeleccionarOpcionReporteriaContenedor extends React.Component {
    constructor() {
        super();
        this.state = {
            showSeleccionReporteria: true,
            showDashboard: false,
            showReporteria: false,
            showGraficos: false
        }
        this.goSeleccionReporteria = this.goSeleccionReporteria.bind(this);
        this.goDashboard = this.goDashboard.bind(this);
        this.goReporteria = this.goReporteria.bind(this);
        this.goGraficos = this.goGraficos.bind(this);
    }

    goSeleccionReporteria() {
        this.setState({
            showSeleccionReporteria: true,
            showDashboard: false,
            showReporteria: false,
            showGraficos: false
        });
    }

    goDashboard() {
        this.setState({
            showSeleccionReporteria: false,
            showDashboard: true,
            showReporteria: false,
            showGraficos: false
        });
    }

    goReporteria() {
        this.setState({
            showSeleccionReporteria: false,
            showDashboard: false,
            showReporteria: true,
            showGraficos: false
        });
    }

    goGraficos() {
        this.setState({
            showSeleccionReporteria: false,
            showDashboard: false,
            showReporteria: false,
            showGraficos: true
        });
    }

    render() {
        if(this.state.showSeleccionReporteria) {
            return (
                <div>
                    <SeleccionarOpcionReporteria goDashboard={this.goDashboard}
                                goReporteria={this.goReporteria}
                                goGraficos={this.goGraficos}>
                    </SeleccionarOpcionReporteria>
                </div>
            );
        } else if(this.state.showDashboard) {
            return (
                <div>
                    <DashboardHome pool={this.props.pool}
                                    goSeleccionReporteria={this.goSeleccionReporteria}>
                    </DashboardHome>
                </div>
            );
        } else if(this.state.showReporteria) {
            return (
                <div style={{width: "100%"}}>
                    <ReporteriaHome pool={this.props.pool}
                                    goSeleccionReporteria={this.goSeleccionReporteria}>
                    </ReporteriaHome>
                </div>
            );
        } else if(this.state.showGraficos) {
            return (
                <div>
                    <GraficosHome pool={this.props.pool}
                                    goSeleccionReporteria={this.goSeleccionReporteria}>
                    </GraficosHome>
                </div>
            );
        }
    }
}
