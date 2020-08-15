import React from 'react';
import sql from 'mssql';
import Slider from 'react-input-slider';

const tipoCampos = [ {nombre: "texto"}, {nombre: "booleano"}, {nombre: "fecha"}, {nombre: "número"}, {nombre: "arreglo"}];

var variablesSeccionesDashboard = [];

var banderaImportacionInicio = 0, banderaImportacionFin = 0;

export default class TimelineVariable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            html: [],
            resultados: []
        }
        this.getResultsVariables = this.getResultsVariables.bind(this);
        this.getResultsVariablesFieldsInit = this.getResultsVariablesFieldsInit.bind(this);
        this.getFieldAttributes = this.getFieldAttributes.bind(this);
        this.getFieldResults = this.getFieldResults.bind(this);
        this.finImportacion = this.finImportacion.bind(this);
        this.insertarValorEnColeccion = this.insertarValorEnColeccion.bind(this);
        this.crearHTML = this.crearHTML.bind(this);
        this.styleDate = this.styleDate.bind(this);
    }

    componentDidMount () {
        this.getResultsVariables();
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
            request.query("select * from "+this.props.tablaInstruccion+" and finVigencia = '1964-05-28'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                        return [];
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0)
                            this.getResultsVariablesFieldsInit(result.recordset);
                    });
                }
            });
        }); // fin transaction
    }

    getResultsVariablesFieldsInit (resultados) {
        var arregloTemp = [];
        banderaImportacionInicio = 0;
        banderaImportacionFin = 0;
        for (var i = 0; i < resultados.length; i++) {
            banderaImportacionFin+=2;
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
                        banderaImportacionInicio++;
                        this.setState({
                            resultados: array
                        }, this.finImportacion);
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
                        banderaImportacionInicio++;
                        //this.finImportacion();
                        this.setState({
                            resultados: array
                        }, this.finImportacion);
                    });
                }
            });
        }); // fin transaction
    }

    finImportacion() {
        if(banderaImportacionInicio == banderaImportacionFin) {
            var copyResultados = [...this.state.resultados];
            copyResultados.sort(function(a, b){
                return a.f3ch4Gu4rd4do-b.f3ch4Gu4rd4do;
            });
            if(this.props.esVariable) {
                if(this.props.variable.esColeccion) {
                    var newCopy = [];
                    for (var i = 0; i < copyResultados.length; i++) {
                        this.insertarValorEnColeccion(copyResultados[i], newCopy);
                    };
                    copyResultados = newCopy;
                }
            }
            this.setState({
                resultados: copyResultados
            }, this.crearHTML );
        }
    }

    insertarValorEnColeccion (valorAInsertar, arregloAInsertar) {
        var inserto = false;
        for (var i = 0; i < arregloAInsertar.length; i++) {
            for (var j = 0; j < arregloAInsertar[i].length; j++) {
                if (arregloAInsertar[i][j].f3ch4Gu4rd4do.getTime() == valorAInsertar.f3ch4Gu4rd4do.getTime()) {
                    inserto = true;
                    arregloAInsertar[i].push(valorAInsertar);
                    return;
                }
            };
        };
        if(!inserto) {
            arregloAInsertar.push([valorAInsertar]);
            return;
        }
    }

    crearHTML() {
        /*var html = <section className="cd-timeline js-cd-timeline">;
                html += <div className="cd-timeline__container">;
                for (var i = 0; i < this.state.resultados[0].resultados.length; i++) {
                    html += <div className="cd-timeline__block js-cd-block">;
                        html += <div className="cd-timeline__img cd-timeline__img--picture js-cd-img">;
                            html += <img src="../assets/edit.png" alt="Picture">;
                        html += </div>;
                        html += <div className="cd-timeline__content js-cd-content">;
                            html += <h3>{this.state.resultados[i].nombre}</h3>;
                        if(this.props.esVariable && this.props.variable.esColeccion) {
                            html += <a className="btn btn-primary btn-lg" >Ver Resultados</a>;
                        } else if(this.props.esVariable && !this.props.variable.esColeccion) {
                            for (var k = 0; k < this.state.resultados[0].atributos.length; k++) {
                                if(this.state.resultados[0].atributos[k].nombre.localeCompare("f3ch4Gu4rd4do") != 0) {
                                    html += <span style="font-weight: bold;">{this.state.resultados[0].atributos[k].nombre}</span>;
                                    html += <span>{this.state.resultados[0].resultados[i][this.state.resultados[0].atributos[k].nombre]}</span>;
                                }
                            };
                        }
                            html += '<span class="cd-timeline__date">'+this.state.resultados[0].resultados[i].f3ch4Gu4rd4do+'</span>'
                        html += '</div>';
                    html += '</div>';
                };
                html += '</div>';
            html += '</section>';*/


        var htmlContent = [];
        for (var i = 0; i < this.state.resultados[0].resultados.length; i++) {
            if(this.props.esVariable && this.props.variable.esColeccion) {
                var htmlRow = <div key={i} className="cd-timeline__block js-cd-block">
                                    <div className="cd-timeline__img cd-timeline__img--picture js-cd-img">
                                        <img src="../assets/edit.png" alt="Picture"/>
                                    </div>
                                    <div className="cd-timeline__content js-cd-content">
                                        <a className="btn btn-primary btn-lg" >Ver Resultados</a>
                                        <span className="cd-timeline__date">{this.state.resultados[0].resultados[i].f3ch4Gu4rd4do.getFullYear()+"-"+this.state.resultados[0].resultados[i].f3ch4Gu4rd4do.getMonth()+"-"+this.state.resultados[0].resultados[i].f3ch4Gu4rd4do.getDate()}</span>
                                    </div>
                                </div>;
                htmlContent.push(htmlRow);
            } else /*if(this.props.esVariable && !this.props.variable.esColeccion)*/ {
                var htmlObjectDesc = [];
                for (var k = 0; k < this.state.resultados[0].atributos.length; k++) {
                    if(this.state.resultados[0].atributos[k].nombre.localeCompare("f3ch4Gu4rd4do") != 0) {
                        var divObj =    <div key={i+""+k+"z"} className="row border-bottom" style={{clear: "both", display: "block", overflow: "auto", width: "100%"}}>
                                            <span key={i+""+k+"a"} style={{fontWeight: "bold", float: "left"}}>{this.state.resultados[0].atributos[k].nombre} :</span>
                                            <span key={i+""+k+"b"} style={{float: "right"}}>
                                                {
                                                    this.state.resultados[0].atributos[k].tipo.localeCompare("date") == 0
                                                    ?   this.styleDate(this.state.resultados[0].resultados[i][this.state.resultados[0].atributos[k].nombre])
                                                    :   this.state.resultados[0].resultados[i][this.state.resultados[0].atributos[k].nombre]
                                                }
                                            </span>
                                        </div>;
                        htmlObjectDesc.push(divObj);
                        /*htmlObjectDesc.push(<span key={i+""+k+"a"} style={{fontWeight: "bold"}}>{this.state.resultados[0].atributos[k].nombre}</span>);
                        htmlObjectDesc.push(<span key={i+""+k+"b"}>{this.state.resultados[0].resultados[i][this.state.resultados[0].atributos[k].nombre]}</span>);*/
                    }
                };
                var htmlRow = <div key={i} className="cd-timeline__block js-cd-block">
                                    <div className="cd-timeline__img cd-timeline__img--picture js-cd-img">
                                        <img src="../assets/edit.png" alt="Picture"/>
                                    </div>
                                    <div className="cd-timeline__content js-cd-content">
                                        {htmlObjectDesc}
                                        <span className="cd-timeline__date">{this.state.resultados[0].resultados[i].f3ch4Gu4rd4do.getFullYear()+"-"+this.state.resultados[0].resultados[i].f3ch4Gu4rd4do.getMonth()+"-"+this.state.resultados[0].resultados[i].f3ch4Gu4rd4do.getDate()}</span>
                                    </div>
                                </div>;
                htmlContent.push(htmlRow);
            }
        };
        var html = <section key={"hh"} className="cd-timeline js-cd-timeline">
                        <div className="cd-timeline__container">
                            {htmlContent}
                        </div>
                    </section>;
        this.setState({
            html: html
        });
    }

    styleDate (date) {
        return date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
    }

    render() {
        return (
            <div>
                {this.props.navbar}
                
                {this.state.html}
                
            </div>
        );
    }
}

/*
<br/>
<div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
    <a className={"btn btn-brand btnWhiteColorHover font-bold font-20"} onClick={this.crearRiesgo}>Realizar Cálculo</a>
</div>
<br/>
*/