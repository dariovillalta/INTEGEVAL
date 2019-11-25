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
                showUmbralHome: false,              //vista casa/inical de umbrales,
                showVariables: false,               //vista de casa de crear variables
                showFormula: false,                 //vista para crear formula fuente de datos de variable
                showCondicionVar: false,            //vista para crear condiiones de variable
                showIndicador: false,               //vista home para el mantenimiento de indicadores
                showRiesgos: false,                 //vista home para el mantenimiento de riesgos
                showCalulo: false                   //vista para iniciar el calculo de las variables
            },
            showChooseMode: true                   //vista para elegir entre modo control riesgos y monitoreo riesgos
        }
        this.showChooseMode = this.showChooseMode.bind(this);
        this.finishChooseMode = this.finishChooseMode.bind(this);
        this.showRiskControlHome = this.showRiskControlHome.bind(this);
        this.showRiskMonitorHome = this.showRiskMonitorHome.bind(this);
        this.showUmbralHome = this.showUmbralHome.bind(this);
        this.showVariables = this.showVariables.bind(this);
        this.showFormula = this.showFormula.bind(this);
        this.showCondicionVar = this.showCondicionVar.bind(this);
        this.showIndicador = this.showIndicador.bind(this);
        this.showRiesgos = this.showRiesgos.bind(this);
        this.showCalulo = this.showCalulo.bind(this);
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
                showCalulo: false
            },
            showChooseMode: false
        });
    }

    showRiskMonitorHome() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: true,
                showUmbralHome: false,
                showVariables: false,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: false
            },
            showChooseMode: false
        });
    }

    showUmbralHome() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showUmbralHome: true,
                showVariables: false,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: false
            },
            showChooseMode: false
        });
    }

    showVariables() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showUmbralHome: false,
                showVariables: true,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: false
            },
            showChooseMode: false
        });
    }

    showFormula() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showUmbralHome: false,
                showVariables: false,
                showFormula: true,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: false
            },
            showChooseMode: false
        });
    }

    showCondicionVar() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showUmbralHome: false,
                showVariables: false,
                showFormula: false,
                showCondicionVar: true,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: false
            },
            showChooseMode: false
        });
    }

    showIndicador() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showUmbralHome: false,
                showVariables: false,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: true,
                showRiesgos: false,
                showCalulo: false
            },
            showChooseMode: false
        });
    }

    showRiesgos() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showUmbralHome: false,
                showVariables: false,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: true,
                showCalulo: false
            },
            showChooseMode: false
        });
    }

    showCalulo() {
        this.setState({
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showUmbralHome: false,
                showVariables: false,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: true
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
                    <LeftBar showCalulo={this.showCalulo}> </LeftBar>
                    <div className={"dashboard-wrapper"}>
                        <div className={"container-fluid dashboard-content"}>
                            <Body router={this.state.router} pool={this.props.pool}
                                showUmbralHome={this.showUmbralHome}
                                showVariables={this.showVariables}
                                showFormula={this.showFormula}
                                showCondicionVar={this.showCondicionVar}
                                showIndicador={this.showIndicador}
                                showRiskControlHome={this.showRiskControlHome}
                                showRiesgos={this.showRiesgos}> </Body>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
