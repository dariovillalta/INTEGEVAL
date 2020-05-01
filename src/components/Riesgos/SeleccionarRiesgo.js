import React from 'react';
import sql from 'mssql';

const colores = ["secondary", "success", "primary", "brand"];

export default class SeleccionarRiesgo extends React.Component {
    constructor(props) {
        super(props);
    }

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
                        {this.props.riesgos.map((riesgo, i) =>
                            <div key={riesgo.ID}>
                                <div className={"card"}>
                                    <div className={"card-body"}>
                                        <div className={"row border-top border-bottom addPaddingToConfig"}>
                                            <div style={{height: "20px", width: "100%"}}> </div>
                                            <div className={"row"} style={{width: "100%"}}>
                                                <div className={"col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 font-bold font-24"}>
                                                    {riesgo.nombre}
                                                </div>
                                                <div className={"col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2"}>
                                                    <a onClick={() => this.props.editarRiesgo(riesgo.ID, riesgo.nombre, riesgo.peso, riesgo.formula)}className="btn btn-success" style={{color: "white"}}>Editar</a>
                                                </div>
                                                <div className={"col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2"}>
                                                    <a onClick={() => this.props.deleteRiesgo(riesgo.ID)} className="btn btn-danger" style={{color: "white"}}>Borrar</a>
                                                </div>
                                            </div>
                                            <div style={{height: "10px", width: "100%"}}> </div>
                                            <div className={"row"} style={{width: "100%"}}>
                                                <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                                    <div style={{height: "30px", width: riesgo.peso+"%", background: "#81d4fa"}}>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"row"} style={{width: "100%"}}>
                                                <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center"}>
                                                    <label className="col-form-label">Peso: {riesgo.peso}</label>
                                                </div>
                                            </div>
                                            <div style={{height: "20px", width: "100%"}}> </div>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                            </div>
                        )}
                        {
                            this.props.riesgos.length == 0
                            ? <div className="p-3 mb-2 bg-dark text-white font-bold font-20 text-center">No existen riesgos creados</div>
                            : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}
