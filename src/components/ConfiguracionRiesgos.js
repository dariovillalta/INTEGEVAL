import React from 'react';

import Umbral from './Umbral/Umbral.js';

//faltan warning
//light

export default class ConfiguracionRiesgos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componenteActual: "ConfiguracionRiesgos",
            navbar: ""
        }
        this.showUmbralIntegral = this.showUmbralIntegral.bind(this);
        this.retornarConfiguracionHome = this.retornarConfiguracionHome.bind(this);
    }

    showUmbralIntegral () {
        var navbar = <div className={"row"}>
            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                <div className={"page-header"}>
                    <h2 className={"pageheader-title"}>Configuraci&oacute;n</h2>
                    <div className={"page-breadcrumb"}>
                        <nav aria-label="breadcrumb">
                            <ol className={"breadcrumb"}>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.retornarConfiguracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                <li className={"breadcrumb-item active font-16"} aria-current="page">Umbral Institucional</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>;
        this.setState({
            navbar: navbar,
            componenteActual: "RiesgoIntegral"
        });
    }

    retornarConfiguracionHome () {
        this.setState({
            componenteActual: "ConfiguracionRiesgos"
        });
    }

    render() {
        if(this.state.componenteActual.localeCompare("ConfiguracionRiesgos") == 0) {
            return (
                <div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"page-header"}>
                                <h2 className={"pageheader-title"}>Identificar Riesgos</h2>
                                <div className={"page-breadcrumb"}>
                                    <nav aria-label="breadcrumb">
                                        <ol className={"breadcrumb"}>
                                            <li className={"breadcrumb-item active font-16"} aria-current="page">Configuraci&oacute;n</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"card influencer-profile-data"}>
                                <div className={"card-body"}>
                                    <div className={"row border-top border-bottom addPaddingToConfig"}>
                                        <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.showVariables}>Variables</a>
                                        <a className={"btn btn-primary btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.showIndicador}>Indicadores</a>
                                        <a className={"btn btn-brand btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.showRiesgos}>Tipos de Riesgos</a>
                                        <a className={"btn btn-info btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.showUmbralIntegral}>Umbral del Riesgo Integral</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("RiesgoIntegral") == 0) {
            return (
                <div>
                    <Umbral navbar={this.state.navbar} idVariable={-99} pool={this.props.pool}> </Umbral>
                </div>
            );
        }
    }
}
