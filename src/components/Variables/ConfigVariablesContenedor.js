import React from 'react';

import OpcionesVariableHome from './OpcionesVariableHome.js';
import ConexionesHome from './Conexiones/ConexionesHome.js';
import VariableHome from './Variables/VariableHome.js';

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
                    <ConexionesHome pool={this.props.pool}
                                goOptions={this.goOptions}
                                configuracionHome={this.props.configuracionHome}
                                showSuccesMessage={this.props.showSuccesMessage}
                                showMessage={this.props.showMessage}
                                userID={this.props.userID}
                                userName={this.props.userName}>
                    </ConexionesHome>
                </div>
            );
        } else if(this.state.showVariables) {
            return (
                <div>
                    <VariableHome pool={this.props.pool}
                                updateNavBar={this.props.updateNavBar}
                                showUmbralHome={this.props.showUmbralHome}
                                showVariables={this.props.showVariables}
                                goOptions={this.goOptions}
                                configuracionHome={this.props.configuracionHome}
                                showFormula={this.props.showFormula}
                                showCondicionVar={this.props.showCondicionVar}
                                updateFormula={this.props.updateFormula}
                                showSQL={this.props.showSQL}
                                permision={this.props.permision}
                                userID={this.props.userID}
                                userName={this.props.userName}
                                showSuccesMessage={this.props.showSuccesMessage}
                                showMessage={this.props.showMessage}>
                    </VariableHome>
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
