import React from 'react';

const riesgos = [{ID: 1, nombre: "LAFT"}, {ID: 2, nombre: "Operativo"}, {ID: 3, nombre: "Tecnologico"}];
const colores = ["secondary", "success", "primary", "brand"];

export default class SeleccionarRiesgo extends React.Component {
    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Seleccionar Riesgo</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Riesgos</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.crearRiesgo}>Crear Riesgo</a>
                </div>
                <br/>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>
                                <div className={"row border-top border-bottom addPaddingToConfig"}>
                                    {riesgos.map((riesgo, i) =>
                                        <a onClick={() => this.props.editarRiesgo(riesgo.ID, riesgo.nombre)} style={{color: "#fafafa"}} className={"btn btn-" + (i <= colores.length-1 ? colores[i] : colores[i%colores.length]) + ' btn-block btnWhiteColorHover font-bold font-20'} key={i}>{riesgo.nombre}</a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
