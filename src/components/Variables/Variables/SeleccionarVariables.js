import React from 'react';
import sql from 'mssql';

const colores = ["secondary", "success", "primary", "brand"];

export default class SeleccionarVariable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            variables: [],
            excel: [],
            formas: []
        }
        this.getVariables = this.getVariables.bind(this);
        this.getExcel = this.getExcel.bind(this);
        this.getFormas = this.getFormas.bind(this);
    }

    componentDidMount() {
        this.getVariables();
        this.getExcel();
        this.getFormas();
    }

    getVariables() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Variables", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var arreglo = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            var copyVar = jQuery.extend(true, {}, result.recordset[i]);
                            copyVar.tipo = 'variable';
                            arreglo.push(copyVar);
                        };
                        this.setState({
                            variables: arreglo
                        });
                    });
                }
            });
        }); // fin transaction
    }

    getExcel() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ExcelArchivos", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var arreglo = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            var copyVar = jQuery.extend(true, {}, result.recordset[i]);
                            copyVar.tipo = 'excel';
                            arreglo.push(copyVar);
                        };
                        this.setState({
                            excel: arreglo
                        });
                    });
                }
            });
        }); // fin transaction
    }

    getFormas() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from FormasVariables", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var arreglo = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            var copyVar = jQuery.extend(true, {}, result.recordset[i]);
                            copyVar.tipo = 'forma';
                            arreglo.push(copyVar);
                        };
                        this.setState({
                            formas: arreglo
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
                            <h2 className={"pageheader-title"}>Seleccionar Variable</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goOptions}><a href="#" className={"breadcrumb-link"}>Tipo de Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Variables</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.crearVariables}>Crear Variable</a>
                </div>
                <br/>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>
                                <div className={"row border-top border-bottom addPaddingToConfig"}>
                                    {this.state.variables.map((variable, i) =>
                                        <a onClick={() => this.props.editarVariable(variable.ID, variable.esObjeto, variable.esInstruccionSQL, variable.tipo)} style={{color: "#fafafa"}} className={"btn btn-" + (i <= colores.length-1 ? colores[i] : colores[i%colores.length]) + ' btn-block btnWhiteColorHover font-bold font-20'} key={variable.ID}>{variable.nombre}</a>
                                    )}
                                    {this.state.excel.map((variable, i) =>
                                        <a onClick={() => this.props.editarVariable(variable.ID, variable.esObjeto, variable.esInstruccionSQL, variable.tipo)} style={{color: "#fafafa"}} className={"btn btn-" + (i <= colores.length-1 ? colores[i] : colores[i%colores.length]) + ' btn-block btnWhiteColorHover font-bold font-20'} key={variable.ID}>{variable.nombre}</a>
                                    )}
                                    {this.state.formas.map((variable, i) =>
                                        <a onClick={() => this.props.editarVariable(variable.ID, variable.esObjeto, variable.esInstruccionSQL, variable.tipo)} style={{color: "#fafafa"}} className={"btn btn-" + (i <= colores.length-1 ? colores[i] : colores[i%colores.length]) + ' btn-block btnWhiteColorHover font-bold font-20'} key={variable.ID}>{variable.nombre}</a>
                                    )}
                                    {
                                        this.state.variables.length == 0 && this.state.excel.length == 0 && this.state.formas.length == 0
                                        ? <div className="p-3 mb-2 bg-dark text-white font-bold font-20 text-center" style={{width: "100%"}}>No existen variables creadas</div>
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
