import React from 'react';

import NavBar from './NavBar.js';
import LeftBar from './LeftBar.js';
import Body from './Body.js';
import ModoRiesgoPrograma from './ModoRiesgoPrograma.js';
import MessageModal from './MessageModal.js';

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
                showListas: false,                  //vista administrar listas
                showUsuarios: false,                //vista administrar usuarios
                showBitacora: false,                //vista para ver bitacoras
                showContenedorReporteria: false      //vista para ver opciones de reporteria
            },
            showChooseMode: true,                   //vista para elegir entre modo control riesgos y monitoreo riesgos
            navbar: "",
            mensajeModal: {mostrarMensaje: false, esError: false, esConfirmar: false, titulo: "", mensaje: "", funcionRetornoConfirmacion: {}}
        }
        this.showChooseMode = this.showChooseMode.bind(this);
        this.finishChooseMode = this.finishChooseMode.bind(this);
        this.switchProgramMode = this.switchProgramMode.bind(this);
        this.showRiskControlHome = this.showRiskControlHome.bind(this);
        this.showRiskMonitorHome = this.showRiskMonitorHome.bind(this);
        this.showVariables = this.showVariables.bind(this);
        this.showFormula = this.showFormula.bind(this);
        this.showCondicionVar = this.showCondicionVar.bind(this);
        this.showIndicador = this.showIndicador.bind(this);
        this.showRiesgos = this.showRiesgos.bind(this);
        this.showCalulo = this.showCalulo.bind(this);
        this.showListas = this.showListas.bind(this);
        this.showUsuarios = this.showUsuarios.bind(this);
        this.showBitacora = this.showBitacora.bind(this);
        this.showContenedorReporteria = this.showContenedorReporteria.bind(this);
        this.dismissMessageModal = this.dismissMessageModal.bind(this);
        this.showSuccesMessage = this.showSuccesMessage.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    showChooseMode() {
        this.setState({
            showChooseMode: true,
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showUmbralHome: false,
                showVariables: false,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: false,
                showListas: false,
                showUsuarios: false,
                showBitacora: false,
                showContenedorReporteria: false
            }
        });
    }

    finishChooseMode() {
        this.setState({
            showChooseMode: false,
            router: {
                showRiskControlHome: false,
                showRiskMonitorHome: false,
                showUmbralHome: false,
                showVariables: false,
                showFormula: false,
                showCondicionVar: false,
                showIndicador: false,
                showRiesgos: false,
                showCalulo: false,
                showListas: false,
                showUsuarios: false,
                showBitacora: false,
                showContenedorReporteria: false
            }
        });
    }

    switchProgramMode () {
        var navbar;
        if(this.state.router.showRiskMonitorHome) {
            if(this.props.permision.riesgoIntegral.indexOf("C") > -1) {
                navbar = <ul className={"navbar-nav flex-column"}>
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
            } else {
                navbar = <ul className={"navbar-nav flex-column"}>
                            <li className={"nav-divider"}>
                                <h3 style={{color: "#b0bec5"}}>Menu</h3>
                            </li>
                            <li className={"nav-item "}>
                                <a className={"nav-link"} onClick={this.showRiskControlHome} href="#"><i className={"fa fa-fw fa-user-circle"}></i><h3 style={{color: "white"}}>Identificar Riesgos</h3></a>
                            </li>
                            <li className={"nav-item "}>
                                <a className={"nav-link"} /*onClick={this.showGraphics}*/ href="#"><i className={"fa fa-fw fa-user-circle"}></i><h3 style={{color: "white"}}>Tratar Riesgos</h3></a>
                            </li>
                        </ul>;
            }
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
                    showListas: false,
                    showUsuarios: false,
                    showBitacora: false,
                    showContenedorReporteria: false
                },
                navbar: navbar
            });
        } else {
            navbar = <ul className={"navbar-nav flex-column"}>
                        <li className={"nav-divider"}>
                            <h3 style={{color: "#b0bec5"}}>Menu</h3>
                        </li>
                        <li className={"nav-item "}>
                            <a className={"nav-link"} onClick={this.showContenedorReporteria} href="#"><i className={"fa fa-fw fa-user-circle"}></i><h3 style={{color: "white"}}>Reporter&iacute;a</h3></a>
                        </li>
                        <li className={"nav-item "}>
                            <a className={"nav-link"} /*onClick={this.showCalulo}*/ href="#"><i className={"fa fa-fw fa-user-circle"}></i><h3 style={{color: "white"}}>Alertas</h3></a>
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
                    showListas: false,
                    showUsuarios: false,
                    showBitacora: false,
                    showContenedorReporteria: false
                },
                navbar: navbar
            });
        }
    }

    showRiskControlHome() {
        var navbar;
        if(this.props.permision.riesgoIntegral.indexOf("C") > -1) {
            navbar = <ul className={"navbar-nav flex-column"}>
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
        } else {
            navbar = <ul className={"navbar-nav flex-column"}>
                        <li className={"nav-divider"}>
                            <h3 style={{color: "#b0bec5"}}>Menu</h3>
                        </li>
                        <li className={"nav-item "}>
                            <a className={"nav-link"} onClick={this.showRiskControlHome} href="#"><i className={"fa fa-fw fa-user-circle"}></i><h3 style={{color: "white"}}>Identificar Riesgos</h3></a>
                        </li>
                        <li className={"nav-item "}>
                            <a className={"nav-link"} /*onClick={this.showGraphics}*/ href="#"><i className={"fa fa-fw fa-user-circle"}></i><h3 style={{color: "white"}}>Tratar Riesgos</h3></a>
                        </li>
                    </ul>;
        }
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
                showListas: false,
                showUsuarios: false,
                showBitacora: false,
                showContenedorReporteria: false
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
                            <a className={"nav-link"} onClick={this.showContenedorReporteria} href="#"><i className={"fa fa-fw fa-user-circle"}></i><h3 style={{color: "white"}}>Reporter&iacute;a</h3></a>
                        </li>
                        <li className={"nav-item "}>
                            <a className={"nav-link"} /*onClick={this.showCalulo}*/ href="#"><i className={"fa fa-fw fa-user-circle"}></i><h3 style={{color: "white"}}>Alertas</h3></a>
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
                showListas: false,
                showUsuarios: false,
                showBitacora: false,
                showContenedorReporteria: false
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
                showListas: false,
                showUsuarios: false,
                showBitacora: false,
                showContenedorReporteria: false
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
                showListas: false,
                showUsuarios: false,
                showBitacora: false,
                showContenedorReporteria: false
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
                showListas: false,
                showUsuarios: false,
                showBitacora: false,
                showContenedorReporteria: false
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
                showListas: false,
                showUsuarios: false,
                showBitacora: false,
                showContenedorReporteria: false
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
                showListas: false,
                showUsuarios: false,
                showBitacora: false,
                showContenedorReporteria: false
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
                showListas: false,
                showUsuarios: false,
                showBitacora: false,
                showContenedorReporteria: false
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
                showListas: true,
                showUsuarios: false,
                showBitacora: false,
                showContenedorReporteria: false
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
                showListas: false,
                showGraficos: false,
                showUsuarios: true,
                showBitacora: false,
                showContenedorReporteria: false
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
                showListas: false,
                showUsuarios: false,
                showBitacora: true,
                showContenedorReporteria: false
            },
            showChooseMode: false
        });
    }

    showContenedorReporteria() {
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
                showListas: false,
                showUsuarios: false,
                showBitacora: false,
                showContenedorReporteria: true
            },
            showChooseMode: false
        });
    }

    /*======_______====== ======_______======   MENSAJES MODAL    ======_______====== ======_______======*/
    /*======_______======                                                             ======_______======*/
    /*======_______======                                                             ======_______======*/
    /*======_______====== ======_______====== ==_____==  ==___==  ======_______====== ======_______======*/

    dismissMessageModal() {
        this.setState({
            mensajeModal: {mostrarMensaje: false, esError: false, esConfirmar: false, titulo: "", mensaje: "", funcionRetornoConfirmacion: {}}
        });
    }

    showSuccesMessage(titulo, mensaje) {
        this.setState({
            mensajeModal: {mostrarMensaje: true, esError: false, esConfirmar: false, titulo: titulo, mensaje: mensaje, funcionRetornoConfirmacion: {}}
        });
        let self = this;
        setTimeout(function(){
            self.setState({
                mensajeModal: {mostrarMensaje: false, esError: false, esConfirmar: false, titulo: "", mensaje: "", funcionRetornoConfirmacion: {}}
            });
        }, 850);
    }

    showMessage(titulo, mensaje, esError, esConfirmar, funcionRetornoConfirmacion) {
        this.setState({
            mensajeModal: {mostrarMensaje: true, esError: esError, esConfirmar: esConfirmar, titulo: titulo, mensaje: mensaje, funcionRetornoConfirmacion: funcionRetornoConfirmacion}
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
                    <NavBar logOff={this.props.logOff} userName={this.props.userName} permision={this.props.permision}
                                                            showConfigurationComponent={this.showConfigurationComponent}
                                                            showListas={this.showListas}
                                                            showUsuarios={this.showUsuarios}
                                                            showBitacora={this.showBitacora}
                                                            switchProgramMode={this.switchProgramMode}
                                                            showRiskControlHome={this.state.router.showRiskControlHome}> </NavBar>
                    <LeftBar navbar={this.state.navbar}> </LeftBar>
                    <div className={"dashboard-wrapper fade-in"}>
                        <div className={!this.state.router.showReporteria ? ("dashboard-content") : "dashboard-content2"}>
                            <Body router={this.state.router} pool={this.props.pool} permision={this.props.permision}
                                showUmbralHome={this.showUmbralHome}
                                showVariables={this.showVariables}
                                showFormula={this.showFormula}
                                showCondicionVar={this.showCondicionVar}
                                showIndicador={this.showIndicador}
                                showRiskControlHome={this.showRiskControlHome}
                                showRiesgos={this.showRiesgos}
                                userID={this.props.userID}
                                userName={this.props.userName}
                                showSuccesMessage={this.showSuccesMessage}
                                showMessage={this.showMessage}> </Body>
                        </div>
                    </div>
                    { this.state.mensajeModal.mostrarMensaje ? (
                        <MessageModal esError={this.state.mensajeModal.esError} esConfirmar={this.state.mensajeModal.esConfirmar} dismissMessage={this.dismissMessageModal} confirmFunction={this.state.mensajeModal.funcionRetornoConfirmacion} titulo={this.state.mensajeModal.titulo} mensaje={this.state.mensajeModal.mensaje}> </MessageModal>
                    ) : (
                        null
                    )}
                </div>
            );
        }
    }
}
