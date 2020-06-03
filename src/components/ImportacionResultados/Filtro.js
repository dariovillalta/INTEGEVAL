import React from 'react';
import sql from 'mssql';

import Operacion from '../Regla/Operacion.js';
import Valor from '../Regla/Valor.js';

var textoOperacion = '', operacion = '', valor = '', valorTexto = '';

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
            },
            filtros: [],
            textoValor: ""
        }
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

        this.agregarFiltro = this.agregarFiltro.bind(this);
        this.eliminarFiltro = this.eliminarFiltro.bind(this);

        textoOperacion = '';
        operacion = '';
        valor = '';
        valorTexto = '';
    }

    componentDidMount () {
        this.getResultsVariables();
        this.getResultsIndicators();
        this.getResultsRisks();
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
        console.log('copy.atributos')
        console.log(copy.atributos)
        this.setState({
            variableSeleccionada: copy,
            campoSeleccionado: copy.atributos[index],
            tipoCampo: tipoCampo
        }, console.log(this.state.tipoCampo) );
    }

    retornoSeleccionOperacion(textoOperacionNuevo, operacion) {
        textoOperacion = textoOperacionNuevo;
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

    retornarValorFecha(valorN, valorTextoN) {
        valor = valorN;
        valorTexto = valorTextoN;
    }

    retornarValorTime(valorN, valorTexto) {
        valor = valorN;
        valorTexto = valorTextoN;
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

    agregarFiltro() {
        var variableID = this.state.variableSeleccionada.ID;
        var nombreCampo = this.state.campoSeleccionado.nombre;
        var tipoCampo = this.state.variableSeleccionada.tipo;
        var nuevoFiltro = {
            variableID: variableID,
            nombreCampo: nombreCampo,
            tipoCampoObjetivo: tipoCampo,
            operacion: operacion,
            operacionTexto: textoOperacion,
            valor: valor,
            texto: nombreCampo+" "+textoOperacion+" "+valorTexto
        };
        var copyFiltros = [...this.state.filtros];
        copyFiltros.push(nuevoFiltro);
        this.setState({
            filtros: copyFiltros
        });
    }

    eliminarFiltro(index) {
        var copyFiltros = [...this.state.filtros];
        copyFiltros.splice(index, 1);
        this.setState({
            filtros: copyFiltros
        });
    }

    crearCodigoFiltros () {
        //agregar filtros por variable
        var filtrosAgrupadosPorVariables = [];
        for (var i = 0; i < this.state.filtros.length; i++) {
            if(this.state.filtros[i].esVariable) {
                var agregoFiltro = false;
                for (var i = 0; i < filtrosAgrupadosPorVariables.length; i++) {
                    for (var j = 0; j < filtrosAgrupadosPorVariables[i].length; j++) {
                        if (filtrosAgrupadosPorVariables[i][j].variableID == this.state.filtros[i].variableID) {
                            filtrosAgrupadosPorVariables[i].push(this.state.filtros[i]);
                            filtrosAgrupadosPorVariables[i][filtrosAgrupadosPorVariables[i].length-1].filtroPadre = filtrosAgrupadosPorVariables[i].length-2;
                        }
                    };
                };
                if(filtrosAgrupadosPorVariables.length == 0) {
                    filtrosAgrupadosPorVariables.push(this.state.filtros[i]);
                }
            }
        };
        var filtrosAgrupadosPorIndicadores = [];
        for (var i = 0; i < this.state.filtros.length; i++) {
            if(this.state.filtros[i].esIndicador) {
                var agregoFiltro = false;
                for (var i = 0; i < filtrosAgrupadosPorIndicadores.length; i++) {
                    for (var j = 0; j < filtrosAgrupadosPorIndicadores[i].length; j++) {
                        if (filtrosAgrupadosPorIndicadores[i][j].variableID == this.state.filtros[i].variableID) {
                            filtrosAgrupadosPorIndicadores[i].push(this.state.filtros[i]);
                            filtrosAgrupadosPorIndicadores[i][filtrosAgrupadosPorIndicadores[i].length-1].filtroPadre = filtrosAgrupadosPorIndicadores[i].length-2;
                        }
                    };
                };
                if(filtrosAgrupadosPorIndicadores.length == 0) {
                    filtrosAgrupadosPorIndicadores.push(this.state.filtros[i]);
                }
            }
        };
        var filtrosAgrupadosPorRiesgos = [];
        for (var i = 0; i < this.state.filtros.length; i++) {
            if(this.state.filtros[i].esRiesgo) {
                var agregoFiltro = false;
                for (var i = 0; i < filtrosAgrupadosPorRiesgos.length; i++) {
                    for (var j = 0; j < filtrosAgrupadosPorRiesgos[i].length; j++) {
                        if (filtrosAgrupadosPorRiesgos[i][j].variableID == this.state.filtros[i].variableID) {
                            filtrosAgrupadosPorRiesgos[i].push(this.state.filtros[i]);
                            filtrosAgrupadosPorRiesgos[i][filtrosAgrupadosPorRiesgos[i].length-1].filtroPadre = filtrosAgrupadosPorRiesgos[i].length-2;
                        }
                    };
                };
                if(filtrosAgrupadosPorRiesgos.length == 0) {
                    filtrosAgrupadosPorRiesgos.push(this.state.filtros[i]);
                }
            }
        };
        //crearCodigo
        var codigoVariables  = '';
        for (var i = 0; i < filtrosAgrupadosPorVariables.length; i++) {
            for (var j = 0; j < filtrosAgrupadosPorVariables[i].length; j++) {
                codigoVariables += this.crearCodigoFiltro(filtrosAgrupadosPorVariables[i]);
            };
        };
        console.log('codigoVariables')
        console.log(codigoVariables)
        this.props.retornoVariables(this.state.variables, this.state.indicadores, this.state.riesgos);
    }

    crearCodigoFiltro (filtros, tabs, nombreReferenciaArregloEnCodigo) {
        var codigo = '';
        var resultado = this.arregloCodigoFiltro(filtros[0], tabs, [], filtros, nombreReferenciaArregloEnCodigo);
        if(resultado.length > 0)
            resultado[0].codigo = "\n"+resultado[0].codigo;
        //$.merge( prestamosCuerpo, resultado );
        for (var i = 0; i < resultado.length; i++) {
            codigo += resultado[i].codigo;
        };
        return codigo;
    }

    arregloCodigoFiltro (filtro, tabs, arreglo, arregloDeFiltros, nombreReferenciaArregloEnCodigo) {
        var tabsText = '';
        for (var i = 0; i < tabs; i++) {
            tabsText+='\t';
        };
        var posicionesIF = [];
        var newTabsTextFormula = '';
        
        //condiciones if
        var arregloValoresAComparar = [];
        if(filtro.valor.indexOf("LISTAID") == 0) {
            //
        } else if(filtro.valor.indexOf("FECHA") == 0) {
            var fecha = filtro.valor.substring(filtro.valor.indexOf("[")+1, filtro.valor.lastIndexOf("]"));
            arregloValoresAComparar = ["new Date("+fecha+").getTime()"];
        } else if(filtro.valor.indexOf("TIEMPO") == 0) {
            var stringValores = filtro.valor.substring(filtro.valor.indexOf("[")+1, filtro.valor.lastIndexOf("]"));
            var diasAgregarCadena = stringValores.split(",")[0], mesesAgregarCadena = stringValores.split(",")[1], aniosAgregarCadena = stringValores.split(",")[2], futuro = stringValores.split(",")[3];
            var diasAgregar = parseInt(diasAgregarCadena.indexOf("=")+1), mesesAgregar = parseInt(mesesAgregarCadena.indexOf("=")+1), aniosAgregar = parseInt(aniosAgregarCadena.indexOf("=")+1);
            var esFuturo = true;
            if(futuro.localeCompare("FUTURO") == 0)
                esFuturo = true;
            else
                esFuturo = false;
            var hoy = new Date();
            if(esFuturo) {
                hoy = this.addYears(hoy, aniosAgregar);
                hoy = this.addMonths(hoy, mesesAgregar);
                hoy = this.addDays(hoy, diasAgregar);
            } else {
                hoy = this.minusDays(hoy, aniosAgregar);
                hoy = this.minusMonths(hoy, aniosAgregar);
                hoy = this.minusYears(hoy, aniosAgregar);
            }
            arregloValoresAComparar = ["new Date("+hoy.getFullYear()+", "+hoy.getMonth()+", "+hoy.getDate()+").getTime()"];
        } else if(filtro.valor.indexOf("MANUAL") == 0) {
            arregloValoresAComparar = [filtro.valor.substring(filtro.valor.indexOf("[")+1, filtro.valor.lastIndexOf("]"))];
        }
        var tamArreglo = arreglo.length;
        //for (var j = 0; j < tamArreglo; j++) {
            for (var i = 0; i < arregloValoresAComparar.length; i++) {
                var comparacion = "";
                var inicioComparacion = "";
                var operacion = "";
                if(filtro.operacion.localeCompare("ES_MENOR") == 0) {
                    operacion = "<";
                } else if(filtro.operacion.localeCompare("ES_MENOR_O_IGUAL") == 0) {
                    operacion = "<=";
                } else if(filtro.operacion.localeCompare("ES_MAYOR_O_IGUAL") == 0) {
                    operacion = ">=";
                } else if(filtro.operacion.localeCompare("ES_MAYOR") == 0) {
                    operacion = ">";
                } else if(filtro.operacion.localeCompare("ES_IGUAL") == 0) {
                    operacion = "==";
                } else if(filtro.operacion.localeCompare("NO_ES_IGUAL") == 0) {
                    operacion = "!=";
                }
                if (filtro.tipoCampoObjetivo.localeCompare("date") == 0) {
                    if(filtro.operacion.localeCompare("encuentra") == 0) {
                        //
                    } else if(filtro.operacion.localeCompare("no_encuentra") == 0) {
                        //
                    } else {
                        inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+filtro.nombreCampo+" != undefined && isValidDate("+nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+")";
                        comparacion = nombreReferenciaArregloEnCodigo+"[x]."+filtro.nombreCampo+".getTime() "+operacion+" "+arregloValoresAComparar[i];
                    }
                } else if (filtro.tipoCampoObjetivo.localeCompare("varchar") == 0) {
                    if(filtro.operacion.localeCompare("encuentra") == 0) {
                        //
                    } else if(filtro.operacion.localeCompare("no_encuentra") == 0) {
                        //
                    } else {
                        inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+filtro.nombreCampo+" != undefined";
                        comparacion = nombreReferenciaArregloEnCodigo+"[x]."+filtro.nombreCampo+".localeCompare('"+arregloValoresAComparar[i]+"') "+operacion+" 0";
                    }
                } else if (filtro.tipoCampoObjetivo.localeCompare("int") == 0 || filtro.filtro.nombreCampo.localeCompare("decimal") == 0) {
                    if(filtro.operacion.localeCompare("encuentra") == 0) {
                        //
                    } else if(filtro.operacion.localeCompare("no_encuentra") == 0) {
                        //
                    } else {
                        inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+filtro.nombreCampo+" != undefined && !isNaN("+nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+")"
                        comparacion = nombreReferenciaArregloEnCodigo+"[x]."+filtro.nombreCampo+" "+operacion+" "+arregloValoresAComparar[i];
                    }
                } else if (filtro.tipoCampoObjetivo.localeCompare("bit") == 0) {
                    inicioComparacion = nombreReferenciaArregloEnCodigo+"[x]."+filtro.nombreCampo+" != undefined"
                    comparacion = nombreReferenciaArregloEnCodigo+"[x]."+filtro.nombreCampo+" "+operacion+" "+arregloValoresAComparar[i];
                }
                if(i+1 == arregloValoresAComparar.length) {
                    comparacion += " ) {";
                }
                if(i==0) {
                    arreglo.push({codigo: '\n'+tabsText+"if ( "+inicioComparacion+" && "+comparacion, tipo: "COMPARACION"});
                } else {
                    arreglo[arreglo.length-1].codigo += " && "+comparacion;
                }
            };
            /*console.log("ENTROOO j");
        };*/
        posicionesIF.push(arreglo.length);

        var cuerpo = arregloDeFiltros.filter(function( object, index ) {
            return object.filtroPadre == index;
        });
        if(cuerpo.length > 0) {
            var arregloCuerpo = [];
            for (var i = 0; i < cuerpo.length; i++) {
                var retorno = this.arregloCodigoFiltro(cuerpo[i], tabs+1, [], arregloDeFiltros, nombreReferenciaArregloEnCodigo);
                retorno[0].codigo = "\n"+retorno[0].codigo;
                $.merge( arregloCuerpo, retorno );
            };
            for (var i = 0; i < posicionesIF.length; i++) {
                arreglo.splice(posicionesIF[i], 0, ...arregloCuerpo);
                if(filtro.esCondicion)
                    arreglo.splice(posicionesIF[i]+arregloCuerpo.length, 0, {codigo: "\n"+tabsText+"}", filtro: regla.filtro});
                for (var j = i; j < posicionesIF.length; j++) {
                    posicionesIF[j]+=arregloCuerpo.length;
                };
            };
            if(posicionesIF.length == 0)
                $.merge( arreglo, arregloCuerpo );
            return arreglo;
        } else {
            if(filtro.esCondicion || posicionesIF.length > 0){
                for (var i = 0; i < posicionesIF.length; i++) {
                    if (newTabsTextFormula.length > 0)
                        newTabsTextFormula = newTabsTextFormula.substring(0, newTabsTextFormula.length - 1);
                    arreglo.splice(posicionesIF[i], 0, {codigo: "\n"+tabsText+newTabsTextFormula+"}", filtro: regla.filtro})
                };
            }
            return arreglo;
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

                <div className="row" style={{height: "70vh"}}>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{height: "100%", width: "100%"}}>
                        <div className="card" style={{height: "100%", width: "100%"}}>
                            <div className="row" style={{borderBottom: "3px solid #d2d2e4", height: "90%", width: "100%"}}>
                                <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"} style={{borderRight: "3px solid #d2d2e4", height: "100%", overflowY: "scroll"}}>
                                    <div style={{display: "flex", alignItems: "center", paddingTop: "1%", justifyContent: "center", height: "8%", width: "100%", paddingTop: "5px"}}>
                                        <h2>Variables</h2>
                                    </div>
                                    <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <div style={{width: "100%", border: "1px solid #999297", borderRadius: "50px"}}>
                                        </div>
                                    </div>
                                    <br/>
                                    <div style={{paddingLeft: "5px", overflowX: "scroll"}}>
                                        {this.state.variables.map((variable, i) => (
                                            <div key={variable.ID}>
                                                <label className="custom-control custom-radio">
                                                    <input id={"varRad"+variable.ID} onClick={() => this.selVar(i, "variable")} type="radio" name="sinoRadio" className="custom-control-input"/><span className="custom-control-label">{variable.nombreVariable}</span>
                                                </label>
                                                {
                                                    i != this.state.variables.length-1
                                                    ?   <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                                            <div style={{width: "80%", border: "1px solid #d2d2e4", borderRadius: "50px"}}>
                                                            </div>
                                                        </div>
                                                    : null
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"} style={{height: "100%", width: "100%", padding: "0px"}}>
                                    <div className="row" style={{display: (this.state.variableSeleccionada != null ? "" : "none"), borderBottom: "3px solid #d2d2e4", height: "30%", width: "100%"}}>
                                        {
                                            this.state.variableSeleccionada != null
                                            ?   <div className="text-center" style={{height: "100%", width: "100%", overflowX: "scroll", whiteSpace: "nowrap"}}>
                                                    {this.state.variableSeleccionada.atributos.map((atributo, i) => (
                                                        <div key={this.state.variableSeleccionada.nombre+atributo.nombre+atributo.ID} style={{height: "100%", width: "33%", display: "inline-block", lineHeight: "100%", borderRight: "1px solid #d2d2e4", backgroundColor: (atributo.activa ? "rgba(210, 210, 228, 0.4)" : "") }} onClick={() => this.selCampo(i)} className="addPointer">
                                                            <div style={{height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                <p className="lead">
                                                                    {atributo.nombre}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            : null
                                        }
                                    </div>
                                    <div className="row" style={{display: (this.state.campoSeleccionado != null ? "" : "none"), borderBottom: "3px solid #d2d2e4", height: "30%"}}>
                                        <Operacion esNumero={this.state.tipoCampo.esNumero}
                                            esBoolean={this.state.tipoCampo.esBoolean}
                                            esFecha={this.state.tipoCampo.esFecha}
                                            esTexto={this.state.tipoCampo.esTexto}
                                            retornoSeleccionOperacion={this.retornoSeleccionOperacion}>
                                        </Operacion>
                                    </div>
                                    <div className="row" style={{display: (this.state.campoSeleccionado != null ? "" : "none"), height: "40%", overflowY: "scroll"}}>
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

                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Instrucción</th>
                                        <th scope="col">Borrar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.filtros.map((filtro, i) => (
                                        <tr key={filtro.instruccion+""+j}>
                                            <td scope="row">{i+1}</td>
                                            <td scope="row">
                                                {filtro.texto}
                                            </td>
                                            <td scope="row">
                                                <img className="addPointer" onClick={() => this.eliminarFiltro(i) } src={"../assets/trash.png"} style={{height: "20px", width: "20px", display: "block"}}></img>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

