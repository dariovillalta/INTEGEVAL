import React from 'react';

export default class ModoRiesgoPrograma extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEffect: false
        }
        this.showRiskControlHome = this.showRiskControlHome.bind(this);
        this.showRiskMonitorHome = this.showRiskMonitorHome.bind(this);
        this.timeoutRiskControlHome = this.timeoutRiskControlHome.bind(this);
        this.timeoutRiskMonitorHome = this.timeoutRiskMonitorHome.bind(this);
    }

    showRiskControlHome () {
        this.setState({
            showEffect: true
        }, this.timeoutRiskControlHome );
    }

    showRiskMonitorHome () {
        this.setState({
            showEffect: true
        }, this.timeoutRiskMonitorHome );
    }

    timeoutRiskControlHome () {
        var self = this;
        setTimeout(function () {
            self.props.showRiskControlHome();
        }, 1750);
    }

    timeoutRiskMonitorHome () {
        var self = this;
        setTimeout(function () {
            self.props.showRiskMonitorHome();
        }, 1750);
    }

    render() {
        return (
            <div>
                <div style={{height: "100vh"}}>
                    <div className="row" style={{height: "100%"}}>
                        <div className={"col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-center optionRiskModeHover "+(this.state.showEffect ? "fadeLeft" : "")} onClick={this.showRiskControlHome} style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#3949ab"}}>
                            <div>
                                <span className="row">
                                    <img src="./assets/MONITOR_BLANCO.png" alt="" style={{display: "block", marginLeft: "auto", marginRight: "auto", height: "80px", width: "auto"}}/>
                                </span>
                                <span className="font-bold font-24" style={{color: "white"}}>
                                    Configuración y <br/> Evaluación de Riesgo Integral
                                </span>
                            </div>
                        </div>
                        <div className={"col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-center optionRiskModeHover "+(this.state.showEffect ? "fadeRight" : "")} onClick={this.showRiskMonitorHome} style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#1e88e5"}}>
                            <div>
                                <span className="row">
                                    <img src="./assets/IDENTIFICAR BLANCO.png" alt="" style={{display: "block", marginLeft: "auto", marginRight: "auto", height: "80px", width: "auto"}}/>
                                </span>
                                <span className="font-bold font-24" style={{color: "white"}}>
                                    Monitorear Riesgo Integral
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/*<img src="../assets/MONITOR_BLANCO.png" alt="" style={{display: "block", marginLeft: "auto", marginRight: "auto", height: "80px", width: "auto"}}/>*/
/*<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-center" style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderTop: "2px solid black"}}>*/
/*<img src="../assets/IDENTIFICAR BLANCO.png" alt="" style={{display: "block", marginLeft: "auto", marginRight: "auto", height: "80px", width: "auto"}}/>*/
