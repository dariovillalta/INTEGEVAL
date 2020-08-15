import React from 'react';
import sql from 'mssql';

import VerDashboard from './VerDashboard.js';
import EditarDashboard from './EditarDashboard.js';
//import CrearDashboardHome from './CrearVariables/CrearVariablesHome.js';
//import EditarDashboardHome from './EditarVariable/EditarVariablesHome.js';

export default class EditarDashboardHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componenteActual: "verDashboard"
        }
        this.verDashboard = this.verDashboard.bind(this);
        this.retornoVerDashboard = this.retornoVerDashboard.bind(this);
        this.editarDashboard = this.editarDashboard.bind(this);
    }

    componentDidMount () {
        //
    }

    verDashboard () {
        this.setState({
            componenteActual: "verDashboard"
        });
    }

    retornoVerDashboard () {
        this.setState({
            componenteActual: "verDashboard"
        });
    }

    editarDashboard (idVariable) {
        this.setState({
            componenteActual: "editarDashboard"
        });
    }

    render() {
        if(this.state.componenteActual.localeCompare("verDashboard") == 0) {
            return (
                <div>
                    <VerDashboard pool={this.props.pool}
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
