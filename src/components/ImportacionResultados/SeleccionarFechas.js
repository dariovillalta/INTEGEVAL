import React from 'react';

export default class SeleccionarFechas extends React.Component {
    constructor(props) {
        super(props);
        this.retornarFechas = this.retornarFechas.bind(this);
        this.isValidDate = this.isValidDate.bind(this);
    }

    componentDidMount () {
        $('#fechaInicial').datepicker({
            format: "dd-mm-yyyy",
            todayHighlight: true,
            viewMode: "days", 
            minViewMode: "days",
            language: 'es'
        });

        $('#fechaFinal').datepicker({
            format: "dd-mm-yyyy",
            todayHighlight: true,
            viewMode: "days", 
            minViewMode: "days",
            language: 'es'
        });
    }

    retornarFechas () {
        var fechaInicial = null, fechaFinal = null;
        if ( this.isValidDate($("#fechaInicial").datepicker('getDate')) ) {
            fechaInicial = $("#fechaInicial").datepicker('getDate');
        }
        if ( this.isValidDate($("#fechaFinal").datepicker('getDate')) ) {
            fechaFinal = $("#fechaFinal").datepicker('getDate');
        }
        this.props.goCreateFilters(fechaInicial, fechaFinal);
    }

    isValidDate (fecha) {
        if (Object.prototype.toString.call(fecha) === "[object Date]") {
            if (isNaN(fecha.getTime())) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Seleccionar Fechas de Vigencia de Variables</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Seleccionar Fechas</li>
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
                                <div className={"border-top border-bottom addPaddingToConfig"} style={{width: "100%"}}>
                                    <div className={"row"}>
                                        <div className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"}>
                                            <div className="row" style={{display: "flex", justifyContent: "center"}}>
                                                <div id="fechaInicial" className="center-block"></div>
                                            </div>
                                        </div>
                                        <div className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"}>
                                            <div className="row" style={{display: "flex", justifyContent: "center"}}>
                                                <div id="fechaFinal" className="center-block"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <a className={"btn btn-primary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.retornarFechas}>Importar Variables</a>
                                    </div>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
