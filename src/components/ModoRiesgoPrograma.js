import React from 'react';

export default class ModoRiesgoPrograma extends React.Component {
    render() {
        return (
            <div>
                <div style={{height: "100vh"}}>
                    <div className="row" style={{height: "100%"}}>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-center" style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "2px solid black"}}>
                            <a href="#" className="btn btn-primary btn-lg" onClick={this.props.showRiskControlHome}>
                                <span className="row">
                                    <img src="../assets/MONITOR_BLANCO.png" alt="" style={{display: "block", marginLeft: "auto", marginRight: "auto", height: "80px", width: "auto"}}/>
                                </span>
                                <span className="font-bold font-24">
                                    Configuración y <br/> Evaluación de Riesgo Integral
                                </span>
                            </a>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-center" style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderTop: "2px solid black"}}>
                            <a href="#" className="btn btn-primary btn-lg" onClick={this.props.showRiskMonitorHome}>
                                <span className="row">
                                    <img src="../assets/IDENTIFICAR BLANCO.png" alt="" style={{display: "block", marginLeft: "auto", marginRight: "auto", height: "80px", width: "auto"}}/>
                                </span>
                                <span className="font-bold font-24">
                                    Monitorear Riesgo Integral
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
