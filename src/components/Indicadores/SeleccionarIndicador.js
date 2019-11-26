import React from 'react';

import Accordion from '../Accordion/Accordion.js';

const riesgos = [{ID: 1, nombre: "LAFT"}, {ID: 2, nombre: "Operativo"}, {ID: 3, nombre: "Tecnologico"}];
const indicadores = [[{ID: 1, nombre: "Clientes"}, {ID: 2, nombre: "Prestamos"}], [{ID: 3, nombre: "Empleados"}], [{ID: 4, nombre: "Red"}, {ID: 5, nombre: "Data Center"}]];

export default class SeleccionarIndicador extends React.Component {
    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Configuraci&oacute;n</h2>
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
                    <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.goCrearIndicador}>Crear Indicador</a>
                </div>
                <br/>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        {riesgos.map((riesgo, i) => (
                            <div key={riesgo.ID}>
                                <Accordion showTrash={false} showEdit={false} allowMultipleOpen color={"#ffffff"}>
                                    <div label={riesgo.nombre}>
                                        { indicadores[i] != undefined ? (
                                            <div>
                                                {indicadores[i].map((indicador, j) =>
                                                    <a className={"btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM"} key={indicador.ID}>{indicador.nombre}</a>
                                                )}
                                                { indicadores[i].length == 0 ? (
                                                    <a className={"btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"}>No existen indicadores creados, presiona para crear</a>
                                                ) : (
                                                    <span></span>
                                                )}
                                            </div>
                                        ) : (
                                            <span></span>
                                        )}
                                    </div>
                                </Accordion>
                                <br/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
