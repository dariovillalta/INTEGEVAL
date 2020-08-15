import React from 'react';

import NavBar from './NavBar.js';
import LeftBar from './LeftBar.js';
import Body from './Body.js';
import ModoRiesgoPrograma from './ModoRiesgoPrograma.js';

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            router: {
                showRiskControlHome: false,         //vista casa de controlar riesgo
                showRiskMonitorHome: false,         //vista casa de monitoreo riesgo
                showVariables: false,               //vista de casa de crear variables
                showFormula: false,                 //vista para crear formula fuente de datos de variable
                showCondicionVar: false,            //vista para crear condiiones de variable
                showIndicador: false,               //vista home para el mantenimiento de indicadores
                showRiesgos: false,                 //vista home para el mantenimiento de riesgos
                showCalulo: false,                  //vista para iniciar el calculo de las variables
                showReporteria: false,              //vista home para hacer reporteria
                showDashboard: false,               //vista home para hacer dashboards
                showListas: false,                  //vista administrar listas
                showGraficos: false,                //vista administrar graficos
                showUsuarios: false,                //vista administrar usuarios
                showBitacora: false                 //vista para ver bitacoras
            },
            showChooseMode: true,                   //vista para elegir entre modo control riesgos y monitoreo riesgos
            navbar: ""
        }
        this.showChooseMode = this.showChooseMode.bind(this);
        this.finishChooseMode = this.finishChooseMode.bind(this);
        this.showRiskControlHome = this.showRiskControlHome.bind(this);
        this.showRiskMonitorHome = this.showRiskMonitorHome.bind(this);
        this.showVariables = this.showVariables.bind(this);
        this.showFormula = this.showFormula.bind(this);
        this.showCondicionVar = this.showCondicionVar.bind(this);
        this.showIndicador = this.showIndicador.bind(this);
        this.showRiesgos = this.showRiesgos.bind(this);
        this.showCalulo = this.showCalulo.bind(this);
        this.showReporteria = this.showReporteria.bind(this);
        this.showDashboard = this.showDashboard.bind(this);
        this.showListas = this.showListas.bind(this);
        this.showGraficos = this.showGraficos.bind(this);
        this.showUsuarios = this.showUsuarios.bind(this);
        this.showBitacora = this.showBitacora.bind(this);
    }

    showChooseMode() {
        this.setState({
            showChooseMode: true
        });
    }

    finishChooseMode() {
        this.setState({
            showChooseMode: false
        });
    }

    showRiskControlHome() {
        var navbar = <ul className={"navbar-nav flex-column"}>
                        <li className={"nav-divider"}>
                            <h3 style={{color: "#b0bec5"}}>Menu</h3>
                        </li>
                        <li className={"nav-item "}>
                            <a className={"nav-link"} onClick={this.showRiskControlHome} href="#"><i className={"fa fa-fw fa-user-circle"}></i><h3 style={{color: "white"}}>Identificar Riesgos</h3></a>
                        </li>
                        <li className={"nav-item "}>
                            <a className={"nav-link"} /*onClick={this.showGraphics}*/ href="#"><i className={"fa fa-fw fa-user-circle"}></i><h3 style={{color: "white"}}>Tratar Riesgos</h3></a>
                        </li>
                        <li className={"nav-item "}>
                            <a className={"nav-link"} onClick={this.showCalulo} href="#"><i className={"fa fa-fw fa-user-circle"}></i><h3 style={{color: "white"}}>Cálculo</h3></a>
                        </li>
                    </ul>;
        this.setState({
            router: {
                showRiskControlHome: true,
                showRiskMonitorHome: false,
                showUmbralHome: false,
                showVariables: false,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: false,
                showReporteria: false,
                showDashboard: false,
                showListas: false,
                showGraficos: false,
                showUsuarios: false,
                showBitacora: false
            },
            showChooseMode: false,
            navbar: navbar
        });
    }

    showRiskMonitorHome() {
        var navbar = <ul className={"navbar-nav flex-column"}>
                        <li className={"nav-divider"}>
                            <h3 style={{color: "#b0bec5"}}>Menu</h3>
                        </li>
                        <li className={"nav-item "}>
                            <a className={"nav-link"} onClick={this.showDashboard} href="#"><i className={"fa fa-fw fa-user-circle"}></i><h3 style={{color: "white"}}>Dashboard</h3></a>
                        </li>
                        <li className={"nav-item "}>
                            <a className={"nav-link"} /*onClick={this.showCalulo}*/ href="#"><i className={"fa fa-fw fa-user-circle"}></i><h3 style={{color: "white"}}>Alertas</h3></a>
                        </li>
                        <li className={"nav-item "}>
                            <a className={"nav-link"} onClick={this.showReporteria} href="#"><i className={"fa fa-fw fa-user-circle"}></i><h3 style={{color: "white"}}>Reporter&iacute;a</h3></a>
                        </li>
                        <li className={"nav-item "}>
                            <a className={"nav-link"} onClick={this.showGraficos} href="#"><i className={"fa fa-fw fa-user-circle"}></i><h3 style={{color: "white"}}>Gr&aacute;ficos</h3></a>
                        </li>
                    </ul>;
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: true,
                showVariables: false,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: false,
                showReporteria: false,
                showDashboard: false,
                showListas: false,
                showGraficos: false,
                showUsuarios: false,
                showBitacora: false
            },
            showChooseMode: false,
            navbar: navbar
        });
    }

    showVariables() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showVariables: true,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: false,
                showReporteria: false,
                showDashboard: false,
                showListas: false,
                showGraficos: false,
                showUsuarios: false,
                showBitacora: false
            },
            showChooseMode: false
        });
    }

    showFormula() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showVariables: false,
                showFormula: true,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: false,
                showReporteria: false,
                showDashboard: false,
                showListas: false,
                showGraficos: false,
                showUsuarios: false,
                showBitacora: false
            },
            showChooseMode: false
        });
    }

    showCondicionVar() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showVariables: false,
                showFormula: false,
                showCondicionVar: true,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: false,
                showReporteria: false,
                showDashboard: false,
                showListas: false,
                showGraficos: false,
                showUsuarios: false,
                showBitacora: false
            },
            showChooseMode: false
        });
    }

    showIndicador() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showVariables: false,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: true,
                showRiesgos: false,
                showCalulo: false,
                showReporteria: false,
                showDashboard: false,
                showListas: false,
                showGraficos: false,
                showUsuarios: false,
                showBitacora: false
            },
            showChooseMode: false
        });
    }

    showRiesgos() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showVariables: false,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: true,
                showCalulo: false,
                showReporteria: false,
                showDashboard: false,
                showListas: false,
                showUsuarios: false,
                showBitacora: false
            },
            showChooseMode: false
        });
    }

    showCalulo() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showVariables: false,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: true,
                showReporteria: false,
                showDashboard: false,
                showListas: false,
                showGraficos: false,
                showUsuarios: false,
                showBitacora: false
            },
            showChooseMode: false
        });
    }

    showReporteria() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showVariables: false,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: false,
                showReporteria: true,
                showDashboard: false,
                showListas: false,
                showGraficos: false,
                showUsuarios: false,
                showBitacora: false
            },
            showChooseMode: false
        });
    }

    showDashboard() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showVariables: false,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: false,
                showReporteria: false,
                showDashboard: true,
                showListas: false,
                showGraficos: false,
                showUsuarios: false,
                showBitacora: false
            },
            showChooseMode: false
        });
    }

    showListas() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showVariables: false,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: false,
                showReporteria: false,
                showDashboard: false,
                showListas: true,
                showGraficos: false,
                showUsuarios: false,
                showBitacora: false
            },
            showChooseMode: false
        });
    }

    showGraficos() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showVariables: false,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: false,
                showReporteria: false,
                showDashboard: false,
                showListas: false,
                showGraficos: true,
                showUsuarios: false,
                showBitacora: false
            },
            showChooseMode: false
        });
    }

    showUsuarios() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showVariables: false,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: false,
                showReporteria: false,
                showDashboard: false,
                showListas: false,
                showGraficos: false,
                showUsuarios: true,
                showBitacora: false
            },
            showChooseMode: false
        });
    }

    showBitacora() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showVariables: false,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: false,
                showReporteria: false,
                showDashboard: false,
                showListas: false,
                showGraficos: false,
                showUsuarios: false,
                showBitacora: true
            },
            showChooseMode: false
        });
    }

    render() {
        if(this.state.showChooseMode) {
            return (
                <div>
                    <ModoRiesgoPrograma showRiskControlHome={this.showRiskControlHome} showRiskMonitorHome={this.showRiskMonitorHome}> </ModoRiesgoPrograma>
                </div>
            );
        } else {
            return (
                <div className={"dashboard-main-wrapper"}>
                    <NavBar logOff={this.props.logOff} userName={this.props.userName} permision={this.props.permision} showConfigurationComponent={this.showConfigurationComponent}> </NavBar>
                    <LeftBar navbar={this.state.navbar}> </LeftBar>
                    <div className={"dashboard-wrapper"}>
                        <div className={!this.state.router.showReporteria ? ("dashboard-content") : "dashboard-content2"}>
                            <Body router={this.state.router} pool={this.props.pool}
                                showUmbralHome={this.showUmbralHome}
                                showVariables={this.showVariables}
                                showFormula={this.showFormula}
                                showCondicionVar={this.showCondicionVar}
                                showIndicador={this.showIndicador}
                                showRiskControlHome={this.showRiskControlHome}
                                showRiesgos={this.showRiesgos}
                                showListas={this.showListas}
                                showUsuarios={this.showUsuarios}
                                showBitacora={this.showBitacora}> </Body>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
