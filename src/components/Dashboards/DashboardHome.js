import React from 'react';
import sql from 'mssql';

import SeleccionarDashboard from './SeleccionarDashboard.js';
import CrearDashboard from './CrearDashboard.js';
import EditarDashboardHome from './EditarDashboardHome.js';

export default class DashboardHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componenteActual: "selDashboard",
            variables: [],
            camposDeVariables: [],
            indicadores: [],
            camposDeIndicadores: [],
            riesgos: [],
            camposDeRiesgos: [],
            dashboardSeleccionado: null,
            navbar: <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"page-header"}>
                                <h2 className={"pageheader-title"}>Seleccionar Dashboard</h2>
                                <div className={"page-breadcrumb"}>
                                    <nav aria-label="breadcrumb">
                                        <ol className={"breadcrumb"}>
                                            <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goSeleccionReporteria}><a href="#" className={"breadcrumb-link"}>Seleccionar Tipo de Reportería</a></li>
                                            <li className={"breadcrumb-item active font-16"} aria-current="page">Dashboards</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
        }
        this.crearDashboard = this.crearDashboard.bind(this);
        this.retornarSeleccionDashboards = this.retornarSeleccionDashboards.bind(this);
        this.editarDashboard = this.editarDashboard.bind(this);
        this.terminoCrearDashboardPasarAEdit = this.terminoCrearDashboardPasarAEdit.bind(this);

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

    crearDashboard () {
        var  navbar =   <div className={"row"}>
                            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                <div className={"page-header"}>
                                    <h2 className={"pageheader-title"}>Crear Dashboard</h2>
                                    <div className={"page-breadcrumb"}>
                                        <nav aria-label="breadcrumb">
                                            <ol className={"breadcrumb"}>
                                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goSeleccionReporteria}><a href="#" className={"breadcrumb-link"}>Seleccionar Tipo de Reportería</a></li>
                                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.retornarSeleccionDashboards}><a href="#" className={"breadcrumb-link"}>Dashboards</a></li>
                                                <li className={"breadcrumb-item active font-16"} aria-current="page">Crear Dashboard</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>;
        this.setState({
            componenteActual: "crearDashboard",
            navbar: navbar
        });
    }

    retornarSeleccionDashboards () {
        var  navbar = <div className={"row"}>
                            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                <div className={"page-header"}>
                                    <h2 className={"pageheader-title"}>Seleccionar Dashboard</h2>
                                    <div className={"page-breadcrumb"}>
                                        <nav aria-label="breadcrumb">
                                            <ol className={"breadcrumb"}>
                                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goSeleccionReporteria}><a href="#" className={"breadcrumb-link"}>Seleccionar Tipo de Reportería</a></li>
                                                <li className={"breadcrumb-item active font-16"} aria-current="page">Dashboards</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>;
        this.setState({
            componenteActual: "selDashboard",
            navbar: navbar
        });
    }

    editarDashboard (dashboard) {
        this.setState({
            dashboardSeleccionado: dashboard,
            componenteActual: "editarDashboard"
        });
    }

    terminoCrearDashboardPasarAEdit () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select top 1 * from Dashboard order by ID desc", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset != undefined) {
                            if(result.recordset.length) {
                                this.editarDashboard(result.recordset[0]);
                            }
                        }
                    });
                }
            });
        }); // fin transaction
    }

    /////////////////////////////////////////////////////////

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
        var arregloTemp = [], arregloTempCampos = [];
        for (var i = 0; i < resultados.length; i++) {
            resultados[i].valor = resultados[i].nombreVariable;
            resultados[i].esVariable = true;
            resultados[i].esIndicador = false;
            resultados[i].esRiesgo = false;
            arregloTemp.push(resultados[i]);
            this.getFieldAttributes(resultados[i], i, arregloTemp, arregloTempCampos);
            this.getFieldResults(resultados[i], i, arregloTemp);
        };
    }

    getFieldAttributes(resultado, index, array, arregloTempCampos) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '"+resultado.nombreVariable+'_'+resultado.inicioVigencia.getFullYear()+'_'+(resultado.inicioVigencia.getMonth()+1)+'_'+resultado.inicioVigencia.getDate()+'_'+resultado.inicioVigencia.getHours()+'_'+resultado.inicioVigencia.getMinutes()+'_'+resultado.inicioVigencia.getSeconds()+"'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var arrTemp = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            arrTemp.push({nombre: result.recordset[i].COLUMN_NAME, valor: result.recordset[i].COLUMN_NAME, tipo: result.recordset[i].DATA_TYPE, esVariable: true, esIndicador: false, esRiesgo: false, nombreVariable: resultado.nombreVariable});
                        };
                        array[index].atributos = arrTemp;
                        arregloTempCampos[index] = arrTemp;
                        this.setState({
                            variables: array,
                            camposDeVariables: arregloTempCampos
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
                    console.log(err);
                    if (!rolledBack) {
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
                    console.log(err);
                    if (!rolledBack) {
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
        var arregloTemp = [], arregloTempCampos = [];
        for (var i = 0; i < resultados.length; i++) {
            resultados[i].valor = resultados[i].nombreIndicador;
            resultados[i].esVariable = false;
            resultados[i].esIndicador = true;
            resultados[i].esRiesgo = false;
            arregloTemp.push(resultados[i]);
            this.getFieldAttributesIndicators(resultados[i], i, arregloTemp, arregloTempCampos);
            this.getFieldResultsIndicators(resultados[i], i, arregloTemp);
        };
    }

    getFieldAttributesIndicators(resultado, index, array, arregloTempCampos) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '"+resultado.nombreIndicador+'_'+resultado.inicioVigencia.getFullYear()+'_'+(resultado.inicioVigencia.getMonth()+1)+'_'+resultado.inicioVigencia.getDate()+'_'+resultado.inicioVigencia.getHours()+'_'+resultado.inicioVigencia.getMinutes()+'_'+resultado.inicioVigencia.getSeconds()+"'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var arrTemp = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            arrTemp.push({nombre: result.recordset[i].COLUMN_NAME, valor: result.recordset[i].COLUMN_NAME, tipo: result.recordset[i].DATA_TYPE, esVariable: false, esIndicador: true, esRiesgo: false, nombreIndicador: resultado.nombreIndicador});
                        };
                        array[index].atributos = arrTemp;
                        arregloTempCampos[index] = arrTemp;
                        this.setState({
                            indicadores: array,
                            camposDeIndicadores: arregloTempCampos
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
                    console.log(err);
                    if (!rolledBack) {
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
                    console.log(err);
                    if (!rolledBack) {
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
        var arregloTemp = [], arregloTempCampos = [];
        for (var i = 0; i < resultados.length; i++) {
            resultados[i].valor = resultados[i].nombreRiesgo;
            resultados[i].esVariable = false;
            resultados[i].esIndicador = false;
            resultados[i].esRiesgo = true;
            arregloTemp.push(resultados[i]);
            this.getFieldAttributesRisks(resultados[i], i, arregloTemp, arregloTempCampos);
            this.getFieldResultsRisks(resultados[i], i, arregloTemp);
        };
    }

    getFieldAttributesRisks(resultado, index, array, arregloTempCampos) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '"+resultado.nombreRiesgo+'_'+resultado.inicioVigencia.getFullYear()+'_'+(resultado.inicioVigencia.getMonth()+1)+'_'+resultado.inicioVigencia.getDate()+'_'+resultado.inicioVigencia.getHours()+'_'+resultado.inicioVigencia.getMinutes()+'_'+resultado.inicioVigencia.getSeconds()+"'", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var arrTemp = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            arrTemp.push({nombre: result.recordset[i].COLUMN_NAME, valor: result.recordset[i].COLUMN_NAME, tipo: result.recordset[i].DATA_TYPE, esVariable: false, esIndicador: false, esRiesgo: true, nombreRiesgo: resultado.nombreRiesgo});
                        };
                        array[index].atributos = arrTemp;
                        arregloTempCampos[index] = arrTemp;
                        this.setState({
                            riesgos: array,
                            camposDeRiesgos: arregloTempCampos
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
                    console.log(err);
                    if (!rolledBack) {
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
        if(this.state.componenteActual.localeCompare("selDashboard") == 0) {
            return (
                <div>
                    <SeleccionarDashboard pool={this.props.pool}
                                            navbar={this.state.navbar}
                                            configuracionHome={this.props.configuracionHome}
                                            crearDashboard={this.crearDashboard}
                                            goOptions={this.props.goOptions}
                                            editarDashboard={this.editarDashboard}>
                    </SeleccionarDashboard>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("crearDashboard") == 0) {
            return (
                <div>
                    <CrearDashboard pool={this.props.pool}
                                            navbar={this.state.navbar}
                                            retornarSeleccionDashboards={this.retornarSeleccionDashboards}
                                            terminoCrearCampo={this.terminoCrearFuenteDatosPasarAEdit}
                                            variables={this.state.variables}
                                            camposDeVariables={this.state.camposDeVariables}
                                            indicadores={this.state.indicadores}
                                            camposDeIndicadores={this.state.camposDeIndicadores}
                                            riesgos={this.state.riesgos}
                                            camposDeRiesgos={this.state.camposDeRiesgos}
                                            terminoCrearDashboardPasarAEdit={this.terminoCrearDashboardPasarAEdit}>
                    </CrearDashboard>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("editarDashboard") == 0) {
            return (
                <div>
                    <EditarDashboardHome pool={this.props.pool}
                                    retornarSeleccionDashboards={this.retornarSeleccionDashboards}
                                    variables={this.state.variables}
                                    indicadores={this.state.indicadores}
                                    riesgos={this.state.riesgos}
                                    dashboardSeleccionado={this.state.dashboardSeleccionado}
                                    goSeleccionReporteria={this.props.goSeleccionReporteria}>
                    </EditarDashboardHome>
                </div>
            );
        }
    }
}
