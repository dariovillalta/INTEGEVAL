import React from 'react';
import sql from 'mssql';
import Slider from 'react-input-slider';

var c3 = require("c3");

var seccionesGraficos = [];

var tipoObjetoUpdate = [], tipoGraficoUpdate = [], displayGraphicsUpdate = [], indiceGraphSelectUpdate = [], objetoEjeXUpdate = [];
var variablesSeleccionadasSeccionesDashboardUpdate = [], variablesSeleccionadasSeccionesDashboardTablaUpdate = [];

var contadorGetObjectsNameINICIO = 0, contadorGetObjectsNameFIN = 0;

export default class VerGrafico extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            html: ''
        }
        this.crearHTML = this.crearHTML.bind(this);
        this.crearArreglosDeInstrucciones = this.crearArreglosDeInstrucciones.bind(this);
        this.crearArreglosDeInstrucciones = this.crearArreglosDeInstrucciones.bind(this);
        this.cargarDatos = this.cargarDatos.bind(this);
        this.retornarVariable = this.retornarVariable.bind(this);
        this.styleDate = this.styleDate.bind(this);
        seccionesGraficos = this.props.seccionesGraficos;
    }

    componentDidMount() {
        this.crearHTML();
    }

    crearHTML() {
        var htmlSecciones = []; //el arreglo final a poner por html
        var htmlRows = [];  //arreglo de col segun cada row (maximo 2 por row)
        var contadorRows = 0, contadorCol6PorRow = 0;
        //contadorRows: para saber a que row de htmlRows estamos agregando
        //contadorCol6PorRow: para saber cuando agregar a contadorRows dependiendo si es col6 o col12
        for (var i = 0; i < seccionesGraficos.length; i++) {
            var htmlSeccion = {clase: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12", grafica: <div id={"grafica"+i}></div>};
            if(htmlRows[contadorRows] == undefined) {
                htmlRows[contadorRows] = [];
            }
            htmlRows[contadorRows].push(htmlSeccion);
            contadorCol6PorRow = 0;
            contadorRows++;
        };
        this.setState({
            html: htmlRows
        }, this.crearArreglosDeInstrucciones );
        //this.crearArreglosDeInstrucciones();
    }

    crearArreglosDeInstrucciones () {
        console.log('seccionesGraficos')
        console.log(seccionesGraficos)
        //limpiando valores nuevos
        tipoObjetoUpdate = [];
        tipoGraficoUpdate = [];
        displayGraphicsUpdate = [];
        indiceGraphSelectUpdate = [];
        objetoEjeXUpdate = [];
        variablesSeleccionadasSeccionesDashboardUpdate = [];
        variablesSeleccionadasSeccionesDashboardTablaUpdate = [];

        for (var i = 0; i < seccionesGraficos.length; i++) {
            if(seccionesGraficos[i].instruccion.indexOf("GRAFICA") == 0) {
                var cadenaValores = seccionesGraficos[i].instruccion.split("=>")[1];
                tipoObjetoUpdate[i] = 'grafica';
                displayGraphicsUpdate[i] = false;
                if(cadenaValores.indexOf("LINEA") == 0 || cadenaValores.indexOf("AREA") == 0 || cadenaValores.indexOf("BARRA") == 0 || cadenaValores.indexOf("DISPERSION") == 0) {
                    if(cadenaValores.indexOf("LINEA") == 0) {
                        tipoGraficoUpdate[i] = 'LINEA';
                        indiceGraphSelectUpdate[i] = 0;
                    } else if(cadenaValores.indexOf("AREA") == 0) {
                        tipoGraficoUpdate[i] = 'AREA';
                        indiceGraphSelectUpdate[i] = 1;
                    } else if(cadenaValores.indexOf("BARRA") == 0) {
                        tipoGraficoUpdate[i] = 'BARRA';
                        indiceGraphSelectUpdate[i] = 2;
                    } else if(cadenaValores.indexOf("DISPERSION") == 0) {
                        tipoGraficoUpdate[i] = 'DISPERSION';
                        indiceGraphSelectUpdate[i] = 3;
                    }
                    if(objetoEjeXUpdate[i] == undefined)
                        objetoEjeXUpdate[i] = [];
                    var arregloObjetoX = cadenaValores.split("\\/")[0];
                    var objetoXCadena = arregloObjetoX.substring(arregloObjetoX.indexOf("{")+1, arregloObjetoX.indexOf("}"));
                    eval("objetoEjeXUpdate[i] = {"+objetoXCadena+"}");
                    objetoEjeXUpdate[i].nombre = '';
                    //this.getObject(objetoEjeXUpdate, i, objetoEjeXUpdate[i], "objetoEjeXUpdate");
                    var arregloObjetosY = cadenaValores.split("\\/")[1];
                    var arregloValores = arregloObjetosY.split("<>");
                    if(variablesSeleccionadasSeccionesDashboardUpdate[i] == undefined)
                        variablesSeleccionadasSeccionesDashboardUpdate[i] = [];
                    for (var j = 0; j < arregloValores.length; j++) {
                        var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{")+1, arregloValores[j].lastIndexOf("}"));
                        eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({"+objeto+"})");
                        variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = '';
                        //this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
                    };
                } else if(cadenaValores.indexOf("PIE") == 0) {
                    tipoGraficoUpdate[i] = 'PIE';
                    indiceGraphSelectUpdate[i] = 4;
                    if(objetoEjeXUpdate[i] == undefined)
                        objetoEjeXUpdate[i] = [];
                    var arregloObjetosY = cadenaValores;
                    var arregloValores = arregloObjetosY.split("<>");
                    if(variablesSeleccionadasSeccionesDashboardUpdate[i] == undefined)
                        variablesSeleccionadasSeccionesDashboardUpdate[i] = [];
                    for (var j = 0; j < arregloValores.length; j++) {
                        var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{")+1, arregloValores[j].lastIndexOf("}"));
                        eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({"+objeto+"})");
                        variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = '';
                        //this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
                    };
                }
            }
        };
        console.log('tipoObjetoUpdate')
        console.log(tipoObjetoUpdate)
        console.log('tipoGraficoUpdate')
        console.log(tipoGraficoUpdate)
        console.log('displayGraphicsUpdate')
        console.log(displayGraphicsUpdate)
        console.log('indiceGraphSelectUpdate')
        console.log(indiceGraphSelectUpdate)
        console.log('objetoEjeXUpdate')
        console.log(objetoEjeXUpdate)
        console.log('variablesSeleccionadasSeccionesDashboardUpdate')
        console.log(variablesSeleccionadasSeccionesDashboardUpdate)
        console.log('variablesSeleccionadasSeccionesDashboardTablaUpdate')
        console.log(variablesSeleccionadasSeccionesDashboardTablaUpdate)
        this.cargarDatos();
    }

    cargarDatos() {
        if(contadorGetObjectsNameINICIO == contadorGetObjectsNameFIN) {
            for (var k = 0; k < seccionesGraficos.length; k++) {
                if(seccionesGraficos[k].instruccion.indexOf("GRAFICA") == 0) {
                    if(tipoGraficoUpdate[k].indexOf("LINEA") == 0 ) {
                        //objetoEjeXUpdate
                        console.log('k = '+k);
                        console.log('1');
                        console.log('objetoEjeXUpdate');
                        console.log(objetoEjeXUpdate);
                        var objetoEje = this.retornarVariable(objetoEjeXUpdate[k]);
                        //variablesSeleccionadasSeccionesDashboardUpdate
                        var variablesSeleccionadasSeccionesDashboard = [];
                        console.log('2');
                        for (var i = 0; i < variablesSeleccionadasSeccionesDashboardUpdate[k].length; i++) {
                            variablesSeleccionadasSeccionesDashboard.push( this.retornarVariable(variablesSeleccionadasSeccionesDashboardUpdate[k][i]) );
                        };
                        var ejeX = [objetoEjeXUpdate[k].nombreCampo];
                        for (var i = 0; i < objetoEje.resultados.length; i++) {
                            ejeX.push( objetoEje.resultados[i][ objetoEjeXUpdate[k].nombreCampo ] );
                        };
                        var ejesY = [];
                        for (var i = 0; i < variablesSeleccionadasSeccionesDashboard.length; i++) {
                            for (var j = 0; j < variablesSeleccionadasSeccionesDashboard[i].resultados.length; j++) {
                                if(j == 0) {
                                    console.log('ENTRE')
                                    ejesY[i] = [];
                                    if(variablesSeleccionadasSeccionesDashboardUpdate[k][i].esVariable) {
                                        ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreVariable);
                                    } else if(variablesSeleccionadasSeccionesDashboardUpdate[k][i].esIndicador) {
                                        ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreIndicador);
                                    } else if(variablesSeleccionadasSeccionesDashboardUpdate[k][i].esRiesgo) {
                                        ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreRiesgo);
                                    }
                                }
                                ejesY[i].push( variablesSeleccionadasSeccionesDashboard[i].resultados[j][ variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreCampo ] );
                            };
                        };
                        var columnas = [ejeX];
                        columnas = columnas.concat(ejesY);
                        var xObjectAxis;
                        for (var i = 0; i < objetoEje.atributos.length; i++) {
                            if (objetoEje.atributos[i].nombre.localeCompare(objetoEjeXUpdate[k].nombreCampo) == 0) {
                                if(objetoEje.atributos[i].tipo.localeCompare("date") == 0) {
                                    xObjectAxis = {
                                            type: 'timeseries',
                                            label: objetoEjeXUpdate[k].nombreCampo,
                                            tick: {
                                                rotate: 90,
                                                multiline: false,
                                                format: function (x) { return x.getFullYear()+"-"+x.getMonth()+"-"+x.getDate(); }
                                            },
                                            height: 130,
                                            show: true
                                        };
                                } else {
                                     xObjectAxis = {
                                            type: 'category',
                                            label: objetoEjeXUpdate[k].nombreCampo,
                                            tick: {
                                                rotate: 75,
                                                multiline: false
                                            },
                                            height: 80,
                                            show: true
                                        };
                                }
                                break;
                            }
                        };
                        var chart = c3.generate({
                            bindto: "#grafica"+k,
                            data: {
                                x: objetoEjeXUpdate[k].nombreCampo,
                                columns: columnas

                            },
                            axis: {
                                y: {
                                    show: true
                                },
                                x: xObjectAxis
                            }
                        });
                    } else if(tipoGraficoUpdate[k].indexOf("AREA") == 0 ) {
                        //objetoEjeXUpdate
                        var objetoEje = this.retornarVariable(objetoEjeXUpdate[k]);
                        //variablesSeleccionadasSeccionesDashboardUpdate
                        var variablesSeleccionadasSeccionesDashboard = [];
                        for (var i = 0; i < variablesSeleccionadasSeccionesDashboardUpdate[k].length; i++) {
                            variablesSeleccionadasSeccionesDashboard.push( this.retornarVariable(variablesSeleccionadasSeccionesDashboardUpdate[k][i]) );
                        };
                        var ejeX = [objetoEjeXUpdate[k].nombreCampo];
                        for (var i = 0; i < objetoEje.resultados.length; i++) {
                            ejeX.push( objetoEje.resultados[i][ objetoEjeXUpdate[k].nombreCampo ] );
                        };
                        var ejesY = [];
                        for (var i = 0; i < variablesSeleccionadasSeccionesDashboard.length; i++) {
                            for (var j = 0; j < variablesSeleccionadasSeccionesDashboard[i].resultados.length; j++) {
                                if(j == 0) {
                                    console.log('ENTRE')
                                    ejesY[i] = [];
                                    if(variablesSeleccionadasSeccionesDashboardUpdate[k][i].esVariable) {
                                        ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreVariable);
                                    } else if(variablesSeleccionadasSeccionesDashboardUpdate[k][i].esIndicador) {
                                        ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreIndicador);
                                    } else if(variablesSeleccionadasSeccionesDashboardUpdate[k][i].esRiesgo) {
                                        ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreRiesgo);
                                    }
                                }
                                ejesY[i].push( variablesSeleccionadasSeccionesDashboard[i].resultados[j][ variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreCampo ] );
                            };
                        };
                        var columnas = [ejeX];
                        columnas = columnas.concat(ejesY);
                        var xObjectAxis;
                        for (var i = 0; i < objetoEje.atributos.length; i++) {
                            if (objetoEje.atributos[i].nombre.localeCompare(objetoEjeXUpdate[k].nombreCampo) == 0) {
                                if(objetoEje.atributos[i].tipo.localeCompare("date") == 0) {
                                    xObjectAxis = {
                                            type: 'timeseries',
                                            label: objetoEjeXUpdate[k].nombreCampo,
                                            tick: {
                                                rotate: 90,
                                                multiline: false,
                                                format: function (x) { return x.getFullYear()+"-"+x.getMonth()+"-"+x.getDate(); }
                                            },
                                            height: 130,
                                            show: true
                                        };
                                } else {
                                     xObjectAxis = {
                                            type: 'category',
                                            label: objetoEjeXUpdate[k].nombreCampo,
                                            tick: {
                                                rotate: 75,
                                                multiline: false
                                            },
                                            height: 80,
                                            show: true
                                        };
                                }
                                break;
                            }
                        };
                        var chart = c3.generate({
                            bindto: "#grafica"+k,
                            data: {
                                x: objetoEjeXUpdate[k].nombreCampo,
                                columns: columnas,
                                type: 'area'

                            },
                            axis: {
                                y: {
                                    show: true
                                },
                                x: xObjectAxis
                            }
                        });
                    } else if(tipoGraficoUpdate[k].indexOf("BARRA") == 0) {
                        //objetoEjeXUpdate
                        var objetoEje = this.retornarVariable(objetoEjeXUpdate[k]);
                        //variablesSeleccionadasSeccionesDashboardUpdate
                        var variablesSeleccionadasSeccionesDashboard = [];
                        for (var i = 0; i < variablesSeleccionadasSeccionesDashboardUpdate[k].length; i++) {
                            variablesSeleccionadasSeccionesDashboard.push( this.retornarVariable(variablesSeleccionadasSeccionesDashboardUpdate[k][i]) );
                        };
                        var ejeX = [objetoEjeXUpdate[k].nombreCampo];
                        for (var i = 0; i < objetoEje.resultados.length; i++) {
                            ejeX.push( objetoEje.resultados[i][ objetoEjeXUpdate[k].nombreCampo ] );
                        };
                        var ejesY = [];
                        for (var i = 0; i < variablesSeleccionadasSeccionesDashboard.length; i++) {
                            for (var j = 0; j < variablesSeleccionadasSeccionesDashboard[i].resultados.length; j++) {
                                if(j == 0) {
                                    console.log('ENTRE')
                                    ejesY[i] = [];
                                    if(variablesSeleccionadasSeccionesDashboardUpdate[k][i].esVariable) {
                                        ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreVariable);
                                    } else if(variablesSeleccionadasSeccionesDashboardUpdate[k][i].esIndicador) {
                                        ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreIndicador);
                                    } else if(variablesSeleccionadasSeccionesDashboardUpdate[k][i].esRiesgo) {
                                        ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreRiesgo);
                                    }
                                }
                                ejesY[i].push( variablesSeleccionadasSeccionesDashboard[i].resultados[j][ variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreCampo ] );
                            };
                        };
                        var columnas = [ejeX];
                        columnas = columnas.concat(ejesY);
                        var xObjectAxis;
                        for (var i = 0; i < objetoEje.atributos.length; i++) {
                            if (objetoEje.atributos[i].nombre.localeCompare(objetoEjeXUpdate[k].nombreCampo) == 0) {
                                if(objetoEje.atributos[i].tipo.localeCompare("date") == 0) {
                                    xObjectAxis = {
                                            type: 'timeseries',
                                            label: objetoEjeXUpdate[k].nombreCampo,
                                            tick: {
                                                rotate: 90,
                                                multiline: false,
                                                format: function (x) { return x.getFullYear()+"-"+x.getMonth()+"-"+x.getDate(); }
                                            },
                                            height: 130,
                                            show: true
                                        };
                                } else {
                                     xObjectAxis = {
                                            type: 'category',
                                            label: objetoEjeXUpdate[k].nombreCampo,
                                            tick: {
                                                rotate: 75,
                                                multiline: false
                                            },
                                            height: 80,
                                            show: true
                                        };
                                }
                                break;
                            }
                        };
                        var chart = c3.generate({
                            bindto: "#grafica"+k,
                            data: {
                                x: objetoEjeXUpdate[k].nombreCampo,
                                columns: columnas,
                                type: 'area'

                            },
                            axis: {
                                y: {
                                    show: true
                                },
                                x: xObjectAxis
                            }
                        });
                    } else if(tipoGraficoUpdate[k].indexOf("DISPERSION") == 0) {
                        //objetoEjeXUpdate
                        var objetoEje = this.retornarVariable(objetoEjeXUpdate[k]);
                        //variablesSeleccionadasSeccionesDashboardUpdate
                        var variablesSeleccionadasSeccionesDashboard = [];
                        for (var i = 0; i < variablesSeleccionadasSeccionesDashboardUpdate[k].length; i++) {
                            variablesSeleccionadasSeccionesDashboard.push( this.retornarVariable(variablesSeleccionadasSeccionesDashboardUpdate[k][i]) );
                        };
                        var ejeX = [objetoEjeXUpdate[k].nombreCampo];
                        for (var i = 0; i < objetoEje.resultados.length; i++) {
                            ejeX.push( objetoEje.resultados[i][ objetoEjeXUpdate[k].nombreCampo ] );
                        };
                        var ejesY = [];
                        for (var i = 0; i < variablesSeleccionadasSeccionesDashboard.length; i++) {
                            for (var j = 0; j < variablesSeleccionadasSeccionesDashboard[i].resultados.length; j++) {
                                if(j == 0) {
                                    ejesY[i] = [];
                                    if(variablesSeleccionadasSeccionesDashboardUpdate[k][i].esVariable) {
                                        ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreVariable);
                                    } else if(variablesSeleccionadasSeccionesDashboardUpdate[k][i].esIndicador) {
                                        ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreIndicador);
                                    } else if(variablesSeleccionadasSeccionesDashboardUpdate[k][i].esRiesgo) {
                                        ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreRiesgo);
                                    }
                                }
                                ejesY[i].push( variablesSeleccionadasSeccionesDashboard[i].resultados[j][ variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreCampo ] );
                            };
                        };
                        var columnas = [ejeX];
                        columnas = columnas.concat(ejesY);
                        var xObjectAxis;
                        for (var i = 0; i < objetoEje.atributos.length; i++) {
                            if (objetoEje.atributos[i].nombre.localeCompare(objetoEjeXUpdate[k].nombreCampo) == 0) {
                                if(objetoEje.atributos[i].tipo.localeCompare("date") == 0) {
                                    xObjectAxis = {
                                            type: 'timeseries',
                                            label: objetoEjeXUpdate[k].nombreCampo,
                                            tick: {
                                                rotate: 90,
                                                multiline: false,
                                                format: function (x) { return x.getFullYear()+"-"+x.getMonth()+"-"+x.getDate(); }
                                            },
                                            height: 130,
                                            show: true
                                        };
                                } else {
                                     xObjectAxis = {
                                            type: 'category',
                                            label: objetoEjeXUpdate[k].nombreCampo,
                                            tick: {
                                                rotate: 75,
                                                multiline: false
                                            },
                                            height: 80,
                                            show: true
                                        };
                                }
                                break;
                            }
                        };
                        var chart = c3.generate({
                            bindto: "#grafica"+k,
                            data: {
                                x: objetoEjeXUpdate[k].nombreCampo,
                                columns: columnas,
                                type: 'scatter'

                            },
                            axis: {
                                y: {
                                    show: true
                                },
                                x: xObjectAxis
                            }
                        });
                    } else if(tipoGraficoUpdate[k].indexOf("PIE") == 0) {
                        //variablesSeleccionadasSeccionesDashboardUpdate
                        var variablesSeleccionadasSeccionesDashboard = [];
                        for (var i = 0; i < variablesSeleccionadasSeccionesDashboardUpdate[k].length; i++) {
                            variablesSeleccionadasSeccionesDashboard.push( this.retornarVariable(variablesSeleccionadasSeccionesDashboardUpdate[k][i]) );
                        };
                        var ejesY = [];
                        for (var i = 0; i < variablesSeleccionadasSeccionesDashboard.length; i++) {
                            for (var j = 0; j < variablesSeleccionadasSeccionesDashboard[i].resultados.length; j++) {
                                if(j == 0) {
                                    ejesY[i] = [];
                                    if(variablesSeleccionadasSeccionesDashboardUpdate[k][i].esVariable) {
                                        ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreVariable);
                                    } else if(variablesSeleccionadasSeccionesDashboardUpdate[k][i].esIndicador) {
                                        ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreIndicador);
                                    } else if(variablesSeleccionadasSeccionesDashboardUpdate[k][i].esRiesgo) {
                                        ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreRiesgo);
                                    }
                                }
                                ejesY[i].push( variablesSeleccionadasSeccionesDashboard[i].resultados[j][ variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreCampo ] );
                            };
                        };
                        var columnas = [];
                        columnas = columnas.concat(ejesY);
                        var chart = c3.generate({
                            bindto: "#grafica"+k,
                            data: {
                                columns: columnas,
                                type: 'pie'
                            },
                            axis: {
                                y: {
                                    show: true
                                }
                            }
                        });
                    }
                } else if(seccionesGraficos[k].instruccion.indexOf("TABLA") == 0) {
                    //variablesSeleccionadasSeccionesDashboardTablaUpdate
                }
            };
        }
    }

    retornarVariable (variable) {
        if(variable.esVariable) {
            for (var i = 0; i < this.props.variables.length; i++) {
                if (this.props.variables[i].nombreVariable.localeCompare(variable.nombreVariable) == 0) {
                    /*for (var j = 0; j < this.props.variables[i].atributos.length; j++) {
                        if(this.props.variables[i].atributos[j].nombre.localeCompare(variable.nombreCampo) == 0) {*/
                            return this.props.variables[i];
                        /*}
                    };*/
                }
            };
        } else if(variable.esIndicador) {
            for (var i = 0; i < this.props.indicadores.length; i++) {
                if (this.props.indicadores[i].nombreIndicador.localeCompare(variable.nombreIndicador) == 0) {
                    /*for (var j = 0; j < this.props.indicadores[i].atributos.length; j++) {
                        if(this.props.indicadores[i].atributos[j].nombre.localeCompare(variable.nombreCampo) == 0) {*/
                            return this.props.indicadores[i];
                        /*}
                    };*/
                }
            };
        } else if(variable.esRiesgo) {
            for (var i = 0; i < this.props.riesgos.length; i++) {
                if (this.props.riesgos[i].nombreRiesgo.localeCompare(variable.nombreRiesgo) == 0) {
                    /*for (var j = 0; j < this.props.riesgos[i].atributos.length; j++) {
                        if(this.props.riesgos[i].atributos[j].nombre.localeCompare(variable.nombreCampo) == 0) {*/
                            return this.props.riesgos[i];
                        /*}
                    };*/
                }
            };
        }
        return null;
    }

    styleDate (date) {
        return date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
    }

    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Ver Dashboard</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goSeleccionReporteria}><a href="#" className={"breadcrumb-link"}>Seleccionar Tipo de Reportería</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornarCrearGrafico}><a href="#" className={"breadcrumb-link"}>Configurar Gráfico</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Ver Gráficas</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    this.state.html.length != undefined && this.state.html.length > 0
                    ?   <div className="card" style={{width: "100%"}}>
                            <br/>
                            {this.state.html.map((html_row, i) =>
                                <div className="row" key={i} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    {html_row.map((html, j) =>
                                        <div className={html.clase} key={i+''+j} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            {html.grafica}
                                        </div>
                                    )}
                                </div>
                            )}
                            <br/>
                        </div>
                    : null
                }

                <br/>
                <div className={"row"}>
                    <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.editarDashboard}>Editar Dashboard</a>
                </div>
                <br/>
                
            </div>
        );
    }
}
