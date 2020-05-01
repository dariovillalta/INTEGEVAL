import React from 'react';
import sql from 'mssql';

import Operacion from '../Regla/Operacion.js';
import Valor from '../Regla/Valor.js';

export default class Filtro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            variables: [],
            indicadores: [],
            riesgos: [],
            variableSeleccionada: null,
            campoSeleccionado: null,
            tipoCampo: {
                esNumero: true,
                esBoolean: false,
                esFecha: false,
                esTexto: false
            }
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

        this.selVar = this.selVar.bind(this);
        this.selCampo = this.selCampo.bind(this);
        this.retornoSeleccionOperacion = this.retornoSeleccionOperacion.bind(this);
        this.actualizarValor = this.actualizarValor.bind(this);
        this.retornarValorFecha = this.retornarValorFecha.bind(this);
        this.retornarValorTime = this.retornarValorTime.bind(this);
        this.isValidDate = this.isValidDate.bind(this);
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
                    console.log(err);
                    if (!rolledBack) {
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
                    console.log(err);
                    if (!rolledBack) {
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
                    console.log(err);
                    if (!rolledBack) {
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

    selVar (index, arreglo) {
        var ref;
        if(arreglo.localeCompare("variable") == 0) {
            ref = this.state.variables[index];
        } else if(arreglo.localeCompare("indicador") == 0) {
            ref = this.state.indicadores[index];
        } else if(arreglo.localeCompare("riesgo") == 0) {
            ref = this.state.riesgos[index];
        }
        this.setState({
            variableSeleccionada: ref,
            campoSeleccionado: null
        });
    }

    selCampo (index) {
        var copy = jQuery.extend(true, {}, this.state.variableSeleccionada);
        for (var i = 0; i < copy.atributos.length; i++) {
            if(i == index)
                copy.atributos[i].activa = true;
            else
                copy.atributos[i].activa = false;
        };
        var tipoCampo;
        if(copy.atributos[index].tipo.localeCompare("int") == 0 || copy.atributos[index].tipo.localeCompare("decimal") == 0) {
            tipoCampo = {
                esNumero: true,
                esBoolean: false,
                esFecha: false,
                esTexto: false
            };
        } else if(copy.atributos[index].tipo.localeCompare("bool") == 0) {
            tipoCampo = {
                esNumero: false,
                esBoolean: true,
                esFecha: false,
                esTexto: false
            };
        } else if(copy.atributos[index].tipo.localeCompare("date") == 0) {
            tipoCampo = {
                esNumero: false,
                esBoolean: false,
                esFecha: true,
                esTexto: false
            };
        } else if(copy.atributos[index].tipo.localeCompare("varchar") == 0) {
            tipoCampo = {
                esNumero: false,
                esBoolean: false,
                esFecha: false,
                esTexto: true
            };
        }
        console.log('copy.atributos[index]')
        console.log(copy.atributos[index])
        this.setState({
            campoSeleccionado: copy,
            tipoCampo: tipoCampo
        }, console.log(this.state.tipoCampo) );
    }

    retornoSeleccionOperacion () {
        //
    }

    actualizarValor (e) {
        var valor  = $("#valor").val();
        this.setState({
            textoValor: valor
        });
        if(this.state.tipoCampo.esNumero) {
            var numero = parseFloat(valor);
            if(!isNaN(numero)) {
                var valorARetornar = "MANUAL=NUMERO["+numero+"]";
                this.props.retornarValor(valorARetornar, valor);
            } else if(this.state.campoSeleccionadoNombre.localeCompare("{campo}") != 0) {
                alert('Valor Ingresado no es un número válido')
            }
        } else if(this.state.tipoCampo.esBoolean) {
            if(numero.localeCompare("true") == 0 || numero.localeCompare("false") == 0 ) {
                var valorARetornar = "MANUAL=BOOL["+valor+"]";
                this.props.retornarValor(valorARetornar, valor);
            } else if(this.state.campoSeleccionadoNombre.localeCompare("{campo}") != 0) {
                alert('Valor Ingresado no es un valor booleano válido')
            }
        } else if(this.state.tipoCampo.esFecha) {
            var fecha = null;
            if(valor.indexOf("-") != -1 && valor.split("-").length > 2) {
                fecha = new Date(valor.split("-")[0], valor.split("-")[1], valor.split("-")[2]);
            } else if(valor.indexOf("/") != -1 && valor.split("/").length > 2) {
                fecha = new Date(valor.split("/")[0], valor.split("/")[1], valor.split("/")[2]);
            }
            if(fecha != null && this.isValidDate(fecha)) {
                var valorARetornar = "MANUAL=FECHA[";
                if(valor.indexOf("-") != -1 && valor.split("-").length > 2) {
                    valorARetornar += valor.split("-")[0]+","+valor.split("-")[1]+","+valor.split("-")[2]+"]";
                } else if(valor.indexOf("/") != -1 && valor.split("/").length > 2) {
                    valorARetornar += valor.split("/")[0]+","+valor.split("/")[1]+","+valor.split("/")[2]+"]";
                }
                this.props.retornarValor(valorARetornar, valor);
            } else if(this.state.campoSeleccionadoNombre.localeCompare("{campo}") != 0) {
                alert('Valor Ingresado no es una fecha válida')
            }
        } else if(this.state.tipoCampo.esTexto) {
            if(valor.length > 0 || valor.length < 984 ) {
                var valorARetornar = "MANUAL=VARCHAR["+valor+"]";
                this.props.retornarValor(valorARetornar, valor);
            } else if(this.state.campoSeleccionadoNombre.localeCompare("{campo}") != 0) {
                if(valor.length > 0)
                    alert('Valor Ingresado debe tener una longitud mayor a 0')
                else
                    alert('Valor Ingresado debe tener una longitud menor a 984')
            }
        }
    }

    retornarValorFecha(valorRegla, valorTexto) {
        this.setState({
            textoValor: valorTexto
        });
    }

    retornarValorTime(valorRegla, valorTexto) {
        this.setState({
            textoValor: valorTexto
        });
    }

    isValidDate (fecha) {
        if (Object.prototype.toString.call(fecha) === "[object Date]") {
            if (isNaN(fecha.getTime())) {
                alert("Ingrese una fecha valida.");
                return false;
            } else {
                return true;
            }
        } else {
            alert("Ingrese una fecha valida.");
            return false;
        }
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
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.returnChooseDates}><a href="#" className={"breadcrumb-link"}>Seleccionar Fechas</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Crear Filtros</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" style={{maxHeight: "60vh"}}>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{height: "100%"}}>
                        <div className="card" style={{height: "100%"}}>
                            <div className="row" style={{borderBottom: "5px solid #d2d2e4", height: "90%"}}>
                                <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"} style={{borderRight: "5px solid #d2d2e4", height: "100%"}}>
                                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "8%", width: "100%", paddingTop: "5px"}}>
                                        <h2>Variables</h2>
                                    </div>
                                    <hr/>
                                    <div style={{paddingLeft: "5px"}}>
                                        {this.state.variables.map((variable, i) => (
                                            <label key={variable.ID} className="custom-control custom-radio">
                                                <input id={"varRad"+variable.ID} onClick={() => this.selVar(i, "variable")} type="radio" name="sinoRadio" className="custom-control-input"/><span className="custom-control-label">{variable.nombreVariable}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"} style={{height: "100%"}}>
                                    <div className="row" style={{display: (this.state.variableSeleccionada != null ? "" : "none"), borderBottom: "3px solid #d2d2e4", height: "30%", width: "100%"}}>
                                        {
                                            this.state.variableSeleccionada != null
                                            ?   <div className="text-center" style={{height: "100%", width: "100%", overflowX: "scroll"}}>
                                                    {this.state.variableSeleccionada.atributos.map((atributo, i) => (
                                                        <a key={this.state.variableSeleccionada.nombre+atributo.nombre+atributo.ID} href="#" onClick={() => this.selCampo(i)} className={"btn " + (atributo.activa ? "" : "btn-outline-secondary")} style={{margin: "1% 3%"}}>{atributo.nombre}</a>
                                                    ))}
                                                </div>
                                            : null
                                        }
                                    </div>
                                    <div className="row" style={{display: (this.state.campoSeleccionado != null ? "" : "none"), borderBottom: "3px solid #d2d2e4", height: "40%"}}>
                                        <Operacion esNumero={this.state.tipoCampo.esNumero}
                                            esBoolean={this.state.tipoCampo.esBoolean}
                                            esFecha={this.state.tipoCampo.esFecha}
                                            esTexto={this.state.tipoCampo.esTexto}
                                            retornoSeleccionOperacion={this.retornoSeleccionOperacion}>
                                        </Operacion>
                                    </div>
                                    <div className="row" style={{display: (this.state.campoSeleccionado != null ? "" : "none"), height: "30%"}}>
                                        <Valor esNumero={this.state.tipoCampo.esNumero}
                                            esBoolean={this.state.tipoCampo.esBoolean}
                                            esFecha={this.state.tipoCampo.esFecha}
                                            esTexto={this.state.tipoCampo.esTexto}
                                            retornarValorFecha={this.retornarValorFecha}
                                            retornarValorTime={this.retornarValorTime}
                                            actualizarValor={this.actualizarValor}
                                            pool={this.props.pool}>
                                        </Valor>
                                    </div>
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

