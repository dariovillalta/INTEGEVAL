import React from 'react';

import OpcionesVariableHome from './OpcionesVariableHome.js';
import FuenteDatosHome from './FuenteDatos/FuenteDatosHome.js';
import CrearVariable from './CrearVariable/CrearVariable.js';

export default class ConfigVariablesContenedor extends React.Component {
    constructor() {
        super();
        this.state = {
            showFuentes: false,
            showVariables: false,
            showOptions: true
        }
        this.goFuentes = this.goFuentes.bind(this);
        this.goVariables = this.goVariables.bind(this);
        this.goOptions = this.goOptions.bind(this);
    }

    goFuentes() {
        this.setState({
            showFuentes: true,
            showVariables: false,
            showOptions: false
        });
    }

    goVariables() {
        this.setState({
            showFuentes: false,
            showVariables: true,
            showOptions: false
        });
    }

    goOptions() {
        this.setState({
            showFuentes: false,
            showVariables: false,
            showOptions: true
        });
    }

    render() {
        if(this.state.showFuentes) {
            return (
                <div>
                    <FuenteDatosHome pool={this.props.pool} configuracionHome={this.props.configuracionHome}> </FuenteDatosHome>
                </div>
            );
        } else if(this.state.showVariables) {
            return (
                <div>
                    <CrearVariable pool={this.props.pool} updateNavBar={this.props.updateNavBar} showUmbralHome={this.props.showUmbralHome} showVariables={this.props.showVariables} configuracionHome={this.props.configuracionHome} showFormula={this.props.showFormula} showCondicionVar={this.props.showCondicionVar}> </CrearVariable>
                </div>
            );
        } else {
            return (
                <div>
                    <OpcionesVariableHome configuracionHome={this.props.configuracionHome} goFuentes={this.goFuentes} goVariables={this.goVariables}> </OpcionesVariableHome>
                </div>
            );
        }
    }
}
