import React from 'react';
import sql from 'mssql';

export default class Filtro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            variables: [],
            indicadores: [],
            riesgos: []
        }
        this.agregarFiltro = this.agregarFiltro.bind(this);
        this.getResultsVariables = this.getResultsVariables.bind(this);
        this.getResultsVariablesFieldsInit = this.getResultsVariablesFieldsInit.bind(this);
        this.getFieldAttributes = this.getFieldAttributes.bind(this);
        this.getFieldResults = this.getFieldResults.bind(this);

        this.getResultsIndicators = this.getResultsIndicators.bind(this);
        this.getResultsIndicatorsFieldsInit = this.getResultsIndicatorsFieldsInit.bind(this);
        this.getFieldAttributesIndicators = this.getFieldAttributesIndicators.bind(this);
        this.getFieldResultsIndicators = this.getFieldResultsIndicators.bind(this);

        this.getResultsRisks = this.getResultsRisks.bind(this);
        this.getResultsRisksFieldsInit = this.getResultsRisksFieldsInit.bind(this);
        this.getFieldAttributesRisks = this.getFieldAttributesRisks.bind(this);
        this.getFieldResultsRisks = this.getFieldResultsRisks.bind(this);
    }

    componentDidMount () {
        this.getResultsVariables();
        this.getResultsIndicators();
        this.getResultsRisks();
    }

    agregarFiltro () {
        //
    }

	getResultsVariables () {
		//OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ResultadosNombreVariables", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                        return [];
                    }
                } else {
                    transaction.commit(err => {
                        this.getResultsVariablesFieldsInit(result.recordset);
                    });
                }
            });
        }); // fin transaction
    }

    getResultsVariablesFieldsInit (resultados) {
        var arregloTemp = [];
        for (var i = 0; i < resultados.length; i++) {
            arregloTemp.push(resultados[i]);
            this.getFieldAttributes(resultados[i], i, arregloTemp);
            this.getFieldResults(resultados[i], i, arregloTemp);
        };
    }

    getFieldAttributes(resultado, index, array) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '"+resultado.nombreVariable+'_'+resultado.inicioVigencia.getFullYear()+'_'+(resultado.inicioVigencia.getMonth()+1)+'_'+resultado.inicioVigencia.getDate()+'_'+resultado.inicioVigencia.getHours()+'_'+resultado.inicioVigencia.getMinutes()+'_'+resultado.inicioVigencia.getSeconds()+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var arrTemp = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            arrTemp.push({nombre: result.recordset[i].COLUMN_NAME, tipo: result.recordset[i].DATA_TYPE});
                        };
                        array[index].atributos = arrTemp;
                        this.setState({
                            variables: array
                        });
                    });
                }
            });
        }); // fin transaction
    }

    getFieldResults(resultado, index, array) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from "+resultado.nombreVariable+'_'+resultado.inicioVigencia.getFullYear()+'_'+(resultado.inicioVigencia.getMonth()+1)+'_'+resultado.inicioVigencia.getDate()+'_'+resultado.inicioVigencia.getHours()+'_'+resultado.inicioVigencia.getMinutes()+'_'+resultado.inicioVigencia.getSeconds(), (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        array[index].resultados = result.recordset;
                        this.setState({
                            variables: array
                        });
                    });
                }
            });
        }); // fin transaction
    }

    getResultsIndicators () {
        //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ResultadosNombreIndicadores", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                        return [];
                    }
                } else {
                    transaction.commit(err => {
                        this.getResultsIndicatorsFieldsInit(result.recordset);
                    });
                }
            });
        }); // fin transaction
    }

    getResultsIndicatorsFieldsInit (resultados) {
        var arregloTemp = [];
        for (var i = 0; i < resultados.length; i++) {
            arregloTemp.push(resultados[i]);
            this.getFieldAttributesIndicators(resultados[i], i, arregloTemp);
            this.getFieldResultsIndicators(resultados[i], i, arregloTemp);
        };
    }

    getFieldAttributesIndicators(resultado, index, array) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '"+resultado.nombreIndicador+'_'+resultado.inicioVigencia.getFullYear()+'_'+(resultado.inicioVigencia.getMonth()+1)+'_'+resultado.inicioVigencia.getDate()+'_'+resultado.inicioVigencia.getHours()+'_'+resultado.inicioVigencia.getMinutes()+'_'+resultado.inicioVigencia.getSeconds()+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var arrTemp = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            arrTemp.push({nombre: result.recordset[i].COLUMN_NAME, tipo: result.recordset[i].DATA_TYPE});
                        };
                        array[index].atributos = arrTemp;
                        this.setState({
                            indicadores: array
                        });
                    });
                }
            });
        }); // fin transaction
    }

    getFieldResultsIndicators(resultado, index, array) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from "+resultado.nombreIndicador+'_'+resultado.inicioVigencia.getFullYear()+'_'+(resultado.inicioVigencia.getMonth()+1)+'_'+resultado.inicioVigencia.getDate()+'_'+resultado.inicioVigencia.getHours()+'_'+resultado.inicioVigencia.getMinutes()+'_'+resultado.inicioVigencia.getSeconds(), (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        array[index].resultados = result.recordset;
                        this.setState({
                            indicadores: array
                        });
                    });
                }
            });
        }); // fin transaction
    }

    getResultsRisks () {
        //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ResultadosNombreRiesgos", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                        return [];
                    }
                } else {
                    transaction.commit(err => {
                        this.getResultsRisksFieldsInit(result.recordset);
                    });
                }
            });
        }); // fin transaction
    }

    getResultsRisksFieldsInit (resultados) {
        var arregloTemp = [];
        for (var i = 0; i < resultados.length; i++) {
            arregloTemp.push(resultados[i]);
            this.getFieldAttributesRisks(resultados[i], i, arregloTemp);
            this.getFieldResultsRisks(resultados[i], i, arregloTemp);
        };
    }

    getFieldAttributesRisks(resultado, index, array) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '"+resultado.nombreRiesgo+'_'+resultado.inicioVigencia.getFullYear()+'_'+(resultado.inicioVigencia.getMonth()+1)+'_'+resultado.inicioVigencia.getDate()+'_'+resultado.inicioVigencia.getHours()+'_'+resultado.inicioVigencia.getMinutes()+'_'+resultado.inicioVigencia.getSeconds()+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var arrTemp = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            arrTemp.push({nombre: result.recordset[i].COLUMN_NAME, tipo: result.recordset[i].DATA_TYPE});
                        };
                        array[index].atributos = arrTemp;
                        this.setState({
                            riesgos: array
                        });
                    });
                }
            });
        }); // fin transaction
    }

    getFieldResultsRisks(resultado, index, array) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from "+resultado.nombreRiesgo+'_'+resultado.inicioVigencia.getFullYear()+'_'+(resultado.inicioVigencia.getMonth()+1)+'_'+resultado.inicioVigencia.getDate()+'_'+resultado.inicioVigencia.getHours()+'_'+resultado.inicioVigencia.getMinutes()+'_'+resultado.inicioVigencia.getSeconds(), (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        array[index].resultados = result.recordset;
                        this.setState({
                            riesgos: array
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
                            <h2 className={"pageheader-title"}>Crear Filtros</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Seleccionar Fechas</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Crear Filtros</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="row">
                                <div className={"col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4"}>
                                    {this.state.variables.map((variable, i) => (
                                        <label key={variable.ID} className="custom-control custom-radio custom-control-inline">
                                            <input id={"varRad"+variable.ID} type="radio" name="sinoRadio" defaultChecked className="custom-control-input"/><span className="custom-control-label">{variable.nombreVariable}</span>
                                        </label>
                                    ))}
                                </div>

                                <div className={"col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8"}>
                                </div>
                            </div>
                            <br/>
                            <div className={"text-center"} style={{width: "100%"}}>
                                <a href="#" className="btn btn-primary active" onClick={this.agregarFiltro}>Agregar Filtro</a>
                            </div>
                            <br/>
                        </div>
                    </div>
                </div>

                <br/>
                <div className={"row"}>
                    <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={() => this.props.retornoVariables(this.state.variables, this.state.indicadores, this.state.riesgos)}>Visualizar Variables</a>
                </div>
                <br/>
            </div>
        );
    }
}

