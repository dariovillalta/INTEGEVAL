import React from 'react';

export default class SeleccionarOpcionReporteria extends React.Component {
    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Tipo de Variables</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Seleccionar Tipo de Reportería</li>
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
                                    <a className={"btn btn-outline-brand btn-block btnWhiteColorHover font-bold font-20"} onClick={this.props.goDashboard}>Dashboards</a>
                                    <a className={"btn btn-outline-info btn-block btnWhiteColorHover font-bold font-20"} onClick={this.props.goReporteria}>Tablas, PDF Y Excel</a>
                                    <a className={"btn btn-outline-brand btn-block btnWhiteColorHover font-bold font-20"} onClick={this.props.goGraficos}>Gráficos</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
