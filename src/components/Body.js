import React from 'react';

import ConfiguracionRiesgos from './ConfiguracionRiesgos.js';
import ConfigVariablesContenedor from './Variables/ConfigVariablesContenedor.js';
import Formula from './Formula.js';
import CondicionVariable from './CondicionVariable.js';
import IndicadorHome from './Indicadores/IndicadorHome.js';
import RiesgoHome from './Riesgos/RiesgoHome.js';
import Calculo from './Calculo.js';
import Dashboard from './Dashboard.js';
import ReporteriaHome from './Reporteria/ReporteriaHome.js';

export default class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoadingScreen: false,
            mensajeLoadingScreen: '',
            navbar: '',
            idVarEditarFormula: -1,
            tablaVarEditarFormula: "",
            crearRiesgo: false
        }
        this.showLoadingScreen = this.showLoadingScreen.bind(this);
        this.hideLoadingScreen = this.hideLoadingScreen.bind(this);
        this.updateNavBar = this.updateNavBar.bind(this);
        this.updateFormula = this.updateFormula.bind(this);
        this.updateBanderaCrearRiesgoTrue = this.updateBanderaCrearRiesgoTrue.bind(this);
        this.updateBanderaCrearRiesgoFalse = this.updateBanderaCrearRiesgoFalse.bind(this);
    }

    componentDidMount() {
        this.updateNavBar();
    }

    showLoadingScreen () {
        this.setState({
            showLoadingScreen: true
        });
    }

    hideLoadingScreen () {
        this.setState({
            showLoadingScreen: false
        });
    }

    updateNavBar (navbar) {
        this.setState({
            navbar: navbar
        });
    }

    updateFormula (idVarEditar, tablaVarEditar) {
        this.setState({
            idVarEditarFormula: idVarEditar,
            tablaVarEditarFormula: tablaVarEditar
        });
    }

    updateBanderaCrearRiesgoTrue () {
        this.setState({
            crearRiesgo: true
        });
    }

    updateBanderaCrearRiesgoFalse () {
        this.setState({
            crearRiesgo: false
        });
    }

    render() {
        if(this.props.router.showRiskControlHome) {
            return (
                <div>
                    <ConfiguracionRiesgos showVariables={this.props.showVariables} showIndicador={this.props.showIndicador} showRiesgos={this.props.showRiesgos} pool={this.props.pool}> </ConfiguracionRiesgos>
                </div>
            );
        } else if(this.props.router.showRiskMonitorHome) {
            return (
                <div>
                    <Dashboard pool={this.props.pool}> </Dashboard>
                </div>
            );
        } else if(this.props.router.showVariables) {
            return (
                <div>
                    <ConfigVariablesContenedor updateNavBar={this.updateNavBar} showVariables={this.props.showVariables} configuracionHome={this.props.showRiskControlHome} pool={this.props.pool} showFormula={this.props.showFormula} showCondicionVar={this.props.showCondicionVar} updateFormula={this.updateFormula}> </ConfigVariablesContenedor>
                </div>
            );
        } else if(this.props.router.showFormula) {
            return (
                <div>
                    <Formula configuracionHome={this.props.showRiskControlHome} pool={this.props.pool} showVariables={this.props.showVariables} idVarEditar={this.state.idVarEditarFormula} tablaVarEditar={this.state.tablaVarEditarFormula}> </Formula>
                </div>
            );
        } else if(this.props.router.showCondicionVar) {
            return (
                <div>
                    <CondicionVariable configuracionHome={this.props.showRiskControlHome} pool={this.props.pool}> </CondicionVariable>
                </div>
            );
        } else if(this.props.router.showIndicador) {
            return (
                <div>
                    <IndicadorHome showIndicador={this.props.showIndicador} configuracionHome={this.props.showRiskControlHome} pool={this.props.pool} showFormula={this.props.showFormula} showCondicionVar={this.props.showCondicionVar} showRiesgos={this.props.showRiesgos} updateBanderaCrearRiesgoTrue={this.updateBanderaCrearRiesgoTrue}> </IndicadorHome>
                </div>
            );
        } else if(this.props.router.showRiesgos) {
            return (
                <div>
                    <RiesgoHome updateNavBar={this.updateNavBar} showRiesgos={this.props.showRiesgos} configuracionHome={this.props.showRiskControlHome} pool={this.props.pool} showFormula={this.props.showFormula} showCondicionVar={this.props.showCondicionVar} crearRiesgo={this.state.crearRiesgo} updateFormula={this.updateFormula} updateBanderaCrearRiesgoFalse={this.updateBanderaCrearRiesgoFalse}> </RiesgoHome>
                </div>
            );
        } else if(this.props.router.showCalulo) {
            return (
                <div>
                    <Calculo pool={this.props.pool}> </Calculo>
                </div>
            );
        } else if(this.props.router.showReporteria) {
            return (
                <div>
                    <ReporteriaHome pool={this.props.pool}> </ReporteriaHome>
                </div>
            );
        } else {
            return (
                <div>
                </div>
            );
        }
    }
}
