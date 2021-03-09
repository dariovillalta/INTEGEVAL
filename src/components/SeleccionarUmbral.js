import React from 'react';

const umbrales = [];

export default class SeleccionarUmbral extends React.Component {
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
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>
                                <div className={"row border-top border-bottom addPaddingToConfig"}>
                                    {umbrales.map((umbral, i) =>
                                        <a className={"btn btn-outline-info btn-block btnWhiteColorHover font-bold font-20"} onClick={() => this.entrarEdit(categoriaClasificacion)} key={umbral.ID}>{umbral.nombre}</a>
                                    )}
                                    { umbrales.length == 0 ? (
                                        <a className={"btn btn-outline-dark btn-block btnWhiteColorHover font-bold font-20"}>No existen categorias de clasificación creados</a>
                                    ) : (
                                        <span></span>
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
