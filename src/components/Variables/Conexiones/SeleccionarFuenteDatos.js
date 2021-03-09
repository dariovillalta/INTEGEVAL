import React from 'react';
import sql from 'mssql';

const colores = ["secondary", "success", "primary", "brand"];

export default class SeleccionarFuenteDatos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fuenteDeDatos: []
        }
    }

    componentDidMount() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Campos", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            fuenteDeDatos: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Fuentes de Datos</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goOptions}><a href="#" className={"breadcrumb-link"}>Tipo de Variable</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionTabla}><a href="#" className={"breadcrumb-link"}>Tablas</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Fuentes de Datos</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.crearFuenteDatos}>Crear Fuente de Dato</a>
                </div>
                <br/>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>
                                <div className={"row border-top border-bottom addPaddingToConfig"}>
                                    {this.state.fuenteDeDatos.map((fuenteDeDato, i) =>
                                        <a onClick={() => this.props.editarFuenteDatos(fuenteDeDato.ID, fuenteDeDato.nombre, fuenteDeDato.tipo, fuenteDeDato.guardar, fuenteDeDato.formula)} style={{color: "#fafafa"}} className={"btn btn-" + (i <= colores.length-1 ? colores[i] : colores[i%colores.length]) + ' btn-block btnWhiteColorHover font-bold font-20'} key={fuenteDeDato.ID}>{fuenteDeDato.nombre}</a>
                                    )}
                                    {
                                        this.state.fuenteDeDatos.length == 0
                                        ? <a style={{color: "#fafafa"}} className={"btn btn-info btn-block btnWhiteColorHover font-bold font-20"}>No existen tipo de datos creados</a>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
