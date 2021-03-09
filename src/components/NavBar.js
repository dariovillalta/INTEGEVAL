import React from 'react';

export default class NavBar extends React.Component {
    render() {
        return (
            <div className={"dashboard-header"}>
            <nav className={"navbar navbar-expand-lg bg-white fixed-top"}>
                <a className={"navbar-brand"} href="../index.html">Inicio</a>
                <button className={"navbar-toggler"} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className={"navbar-toggler-icon"}></span>
                </button>
                <div className={"collapse navbar-collapse"} id="navbarSupportedContent">
                    <ul className={"navbar-nav ml-auto navbar-right-top"}>
                        <li className={"nav-item dropdown nav-user"}>
                            <a className={"nav-link nav-user-img"} href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <img src="./assets/filter-icons/client.png" alt="" style={{height: "50px", width: "auto"}}/> </a>
                            <div className={"dropdown-menu dropdown-menu-right nav-user-dropdown"} aria-labelledby="navbarDropdownMenuLink2">
                                <div className={"nav-user-info"}>
                                    <h5 className={"mb-0 text-white nav-user-name"}>{this.props.userName}</h5>
                                </div>
                                <a className={"dropdown-item"} href="#" onClick={this.props.showUsuarios} style={{display: this.props.permision.usuario.indexOf("C") > -1 || this.props.permision.usuario.indexOf("V") > -1 || this.props.permision.usuario.indexOf("E") > -1 ? "" : "none" }}><img src="../assets/user.png" alt="" style={{height: "20px", marginRight: "10px"}}/>Usuarios</a>
                                <a className={"dropdown-item"} href="#" onClick={this.props.showListas} style={{display: this.props.permision.lista.indexOf("C") > -1 || this.props.permision.lista.indexOf("V") > -1 || this.props.permision.lista.indexOf("E") > -1 ? "" : "none" }}><img src="../assets/list.png" alt="" style={{height: "20px", marginRight: "10px"}}/>Listas</a>
                                <a className={"dropdown-item"} href="#" onClick={this.props.logOff} style={{display: this.props.permision.alarma.indexOf("C") > -1 || this.props.permision.alarma.indexOf("V") > -1 || this.props.permision.alarma.indexOf("E") > -1 ? "" : "none" }}><img src="../assets/alarm.png" alt="" style={{height: "20px", marginRight: "10px"}}/>Alarmas</a>
                                <a className={"dropdown-item"} href="#" onClick={this.props.showBitacora}><img src="../assets/log.png" alt="" style={{height: "20px", marginRight: "10px"}}/>Bitácora</a>
                                <a className={"dropdown-item"} href="#" onClick={this.props.switchProgramMode}><img src="../assets/arrow.png" alt="" style={{height: "20px", marginRight: "10px"}}/>
                                    {
                                        this.props.showRiskControlHome
                                        ?   "Monitorear Riesgo Integral"
                                        :   "Configuración y \n Evaluación de Riesgo Integral"
                                    }
                                </a>
                                <a className={"dropdown-item"} href="#" onClick={this.props.logOff}><i className={"fas fa-power-off mr-2"}></i>Salir</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        );
    }
}
