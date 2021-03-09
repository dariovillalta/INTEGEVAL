import React from 'react';

import ConfiguracionRiesgos from './ConfiguracionRiesgos.js';
import ConfigVariablesContenedor from './Variables/ConfigVariablesContenedor.js';
import Formula from './Formula.js';
import CondicionVariable from './CondicionVariable.js';
import IndicadorHome from './Indicadores/IndicadorHome.js';
import RiesgoHome from './Riesgos/RiesgoHome.js';
import Calculo from './Calculo.js';
import CrearYSeleccionarLista from './CrearYSeleccionarLista.js';
import MantenimientoUsuarios from './Usuarios/MantenimientoUsuarios.js';
import Bitacora from './Bitacora/Bitacora.js';
import SeleccionarOpcionReporteriaContenedor from './SeleccionarOpcionReporteria/SeleccionarOpcionReporteriaContenedor.js';

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
                    <ConfiguracionRiesgos showVariables={this.props.showVariables} showIndicador={this.props.showIndicador} showRiesgos={this.props.showRiesgos} pool={this.props.pool} showListas={this.props.showListas} showUsuarios={this.props.showUsuarios} showBitacora={this.props.showBitacora} permision={this.props.permision} showSuccesMessage={this.props.showSuccesMessage} showMessage={this.props.showMessage}> </ConfiguracionRiesgos>
                </div>
            );
        } else if(this.props.router.showRiskMonitorHome) {
            return (
                <div>
                    <SeleccionarOpcionReporteriaContenedor pool={this.props.pool}> </SeleccionarOpcionReporteriaContenedor>
                </div>
            );
        } else if(this.props.router.showVariables) {
            return (
                <div>
                    <ConfigVariablesContenedor updateNavBar={this.updateNavBar} showVariables={this.props.showVariables} configuracionHome={this.props.showRiskControlHome} pool={this.props.pool} showFormula={this.props.showFormula} showCondicionVar={this.props.showCondicionVar} updateFormula={this.updateFormula} permision={this.props.permision} userID={this.props.userID} userName={this.props.userName} showSuccesMessage={this.props.showSuccesMessage} showMessage={this.props.showMessage}> </ConfigVariablesContenedor>
                </div>
            );
        } else if(this.props.router.showFormula) {
            return (
                <div>
                    <Formula configuracionHome={this.props.showRiskControlHome} pool={this.props.pool} showVariables={this.props.showVariables} idVarEditar={this.state.idVarEditarFormula} tablaVarEditar={this.state.tablaVarEditarFormula} showSuccesMessage={this.props.showSuccesMessage} showMessage={this.props.showMessage}> </Formula>
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
                    <IndicadorHome showIndicador={this.props.showIndicador} configuracionHome={this.props.showRiskControlHome} pool={this.props.pool} showFormula={this.props.showFormula} showCondicionVar={this.props.showCondicionVar} showRiesgos={this.props.showRiesgos} updateBanderaCrearRiesgoTrue={this.updateBanderaCrearRiesgoTrue} userID={this.props.userID} userName={this.props.userName} permision={this.props.permision} showSuccesMessage={this.props.showSuccesMessage} showMessage={this.props.showMessage}> </IndicadorHome>
                </div>
            );
        } else if(this.props.router.showRiesgos) {
            return (
                <div>
                    <RiesgoHome updateNavBar={this.updateNavBar} showRiesgos={this.props.showRiesgos} configuracionHome={this.props.showRiskControlHome} pool={this.props.pool} showFormula={this.props.showFormula} showCondicionVar={this.props.showCondicionVar} crearRiesgo={this.state.crearRiesgo} updateFormula={this.updateFormula} updateBanderaCrearRiesgoFalse={this.updateBanderaCrearRiesgoFalse} userID={this.props.userID} userName={this.props.userName} permision={this.props.permision} showSuccesMessage={this.props.showSuccesMessage} showMessage={this.props.showMessage}> </RiesgoHome>
                </div>
            );
        } else if(this.props.router.showCalulo) {
            return (
                <div>
                    <Calculo pool={this.props.pool} userID={this.props.userID} userName={this.props.userName} showSuccesMessage={this.props.showSuccesMessage} showMessage={this.props.showMessage}> </Calculo>
                </div>
            );
        } else if(this.props.router.showReporteria) {
            return (
                <div style={{width: "100%"}}>
                    <ReporteriaHome pool={this.props.pool} showSuccesMessage={this.props.showSuccesMessage} showMessage={this.props.showMessage}> </ReporteriaHome>
                </div>
            );
        } else if(this.props.router.showListas) {
            return (
                <div>
                    <CrearYSeleccionarLista pool={this.props.pool} configuracionHome={this.props.showRiskControlHome} permision={this.props.permision} showSuccesMessage={this.props.showSuccesMessage} showMessage={this.props.showMessage}> </CrearYSeleccionarLista>
                </div>
            );
        } else if(this.props.router.showUsuarios) {
            return (
                <div>
                    <MantenimientoUsuarios pool={this.props.pool} configuracionHome={this.props.showRiskControlHome} permision={this.props.permision} showSuccesMessage={this.props.showSuccesMessage} showMessage={this.props.showMessage} userID={this.props.userID} userName={this.props.userName}> </MantenimientoUsuarios>
                </div>
            );
        } else if(this.props.router.showBitacora) {
            return (
                <div>
                    <Bitacora pool={this.props.pool} configuracionHome={this.props.showRiskControlHome}> </Bitacora>
                </div>
            );
        } else if(this.props.router.showContenedorReporteria) {
            return (
                <div>
                    <SeleccionarOpcionReporteriaContenedor pool={this.props.pool}> </SeleccionarOpcionReporteriaContenedor>
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
