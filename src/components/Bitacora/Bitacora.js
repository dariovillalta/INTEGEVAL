import React from 'react';
import sql from 'mssql';

export default class Bitacora extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtros: []
        }
        this.getBitacora = this.getBitacora.bind(this);
    }

    componentDidMount() {
        this.getBitacora();
    }

    getBitacora() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Bitacora", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            filtros: result.recordset
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
                            <h2 className={"pageheader-title"}>Bitácora</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Bitácora</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>

                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">ID de Usuario</th>
                                            <th scope="col">Nombre de Usuario</th>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Descripción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.filtros.map((filtro, i) => (
                                            <tr key={filtro.ID}>
                                                <th scope="row">{i+1}</th>
                                                <th scope="row">{filtro.usuarioID}</th>
                                                <th scope="row">{filtro.nombreUsuario}</th>
                                                <th scope="row">{filtro.fecha}</th>
                                                <th scope="row">{filtro.descripcion}</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
