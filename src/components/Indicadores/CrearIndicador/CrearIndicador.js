import React from 'react';
import sql from 'mssql';
import Slider from 'react-input-slider';

import Formula from '../../Formula.js';
import InstruccionVariable from '../../InstruccionVariable.js';

const tipoCampos = [ {nombre: "texto"}, {nombre: "booleano"}, {nombre: "fecha"}, {nombre: "número"}, {nombre: "arreglo"}];

const periodicidad = [ {nombre: "diario"}, {nombre: "semanal"}, {nombre: "mensual"}, {nombre: "trimestral"}, {nombre: "bi-anual"}, {nombre: "anual"}];

var formulaG = '', elementosFormulasG = [];
var atributos = [];
var nombreCampoNuevoAtributo = '';
var reglas = [], segmentoRegla = [];
var elementosFormulas = [], formulas = [];
var posicionAtributoSeleccionado = -1;
var nivelNuevoAtributo = 0;
var tipoDeAsignacionSeleccionado = '';
var operacionSeleccionada = '';
var campoSeleccionado = {};
var indiceSeleccionadoSegmentoReglas = -1, indiceSeleccionadoReglas = -1, tipoElementoSeleccionadoRegla = '';

var nombreIndicador = '', codigoIndicador = '', toleranciaIndicador = '', valorIdealIndicador = '', tipoValorIdealIndicador = '', tipoToleranciaIndicador = '', periodicidadIndicador = '', tipoIndicador = '', nombreEncargadoIndicador = '';

var banderaEsFormulaIndicador = false;
var contadorObjetosGuardados = 0, contadorObjetosAGuardar = 0;
export default class CrearIndicador extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componenteActual: 'crearIndicador',
            navbar: "",
            x: 0,
            atributos: [],
            tipoNuevaVariable: "",
            reglas: []
        }
        this.crearIndicador = this.crearIndicador.bind(this);
        this.getIndicadorID = this.getIndicadorID.bind(this);
        this.goToCreateFormula = this.goToCreateFormula.bind(this);
        this.retornoCrearIndicador = this.retornoCrearIndicador.bind(this);
        this.retornoCampoFormula = this.retornoCampoFormula.bind(this);
        this.retornoCampoCondicion = this.retornoCampoCondicion.bind(this);
        this.retornarValor = this.retornarValor.bind(this);
        this.retornoOperacion = this.retornoOperacion.bind(this);
        this.actualizarIndiceSeleccionadoReglas = this.actualizarIndiceSeleccionadoReglas.bind(this);
        this.actualizarNivelNuevaRegla = this.actualizarNivelNuevaRegla.bind(this);

        this.goToCreateConditions = this.goToCreateConditions.bind(this);
        this.goToCreateConditionsClickNavBarFormula = this.goToCreateConditionsClickNavBarFormula.bind(this);
        this.goToCreateFormulaCampo = this.goToCreateFormulaCampo.bind(this);
        this.actualizarNombreCampoNuevoAtributo = this.actualizarNombreCampoNuevoAtributo.bind(this);
        this.retornarCodigoOperacion = this.retornarCodigoOperacion.bind(this);
        this.verificarNoExisteNombreCampo = this.verificarNoExisteNombreCampo.bind(this);
        this.crearAtributoVariable = this.crearAtributoVariable.bind(this);
        this.anadirRegla = this.anadirRegla.bind(this);
        this.revisarTipoAnadirFormula = this.revisarTipoAnadirFormula.bind(this);
        this.anadirFormulaIndicador = this.anadirFormulaIndicador.bind(this);
        this.anadirFormula = this.anadirFormula.bind(this);
        this.getElementsFromFormula = this.getElementsFromFormula.bind(this);
        this.modificarRegla = this.modificarRegla.bind(this);
        this.eliminarRegla = this.eliminarRegla.bind(this);
        console.log('this.props')
        console.log(this.props)
    }

    crearIndicador () {
        var nombre = $("#nombreIndicador").val();
        var codigo = $("#codigo").val();
        var formula = formulaG;
        var peso = this.state.x;
        var valorIdeal = parseInt($("#valorIdeal").val());
        var tipoValorIdeal = $("#tipoValorIdeal").val();
        var tolerancia = parseInt($("#tolerancia").val());
        var tipoTolerancia = $("#tipoTolerancia").val();
        var tipoIndicador = $("#tipoIndicador").val();
        var periodicidad = $("#periodicidad").val();
        var analista = $("#analista").val();
        var riesgoPadre = this.props.riesgoPadre;
        console.log('nombre');
        console.log(nombre);
        console.log('codigo');
        console.log(codigo);
        console.log('formula');
        console.log(formula);
        console.log('peso');
        console.log(peso);
        console.log('valorIdeal');
        console.log(valorIdeal);
        console.log('tipoValorIdeal');
        console.log(tipoValorIdeal);
        console.log('tolerancia');
        console.log(tolerancia);
        console.log('tipoTolerancia');
        console.log(tipoTolerancia);
        console.log('periodicidad');
        console.log(periodicidad);
        console.log('tipoIndicador');
        console.log(tipoIndicador);
        console.log('analista');
        console.log(analista);
        console.log('riesgoPadre');
        console.log(riesgoPadre);
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into Indicadores (nombre, codigo, formula, peso, tolerancia, tipoTolerancia, valorIdeal, tipoValorIdeal, periodicidad, tipoIndicador, analista, idRiesgoPadre) values ('"+nombre+"', '"+codigo+"', '"+formula+"', "+peso+", "+tolerancia+", '"+tipoTolerancia+"', "+valorIdeal+", '"+tipoValorIdeal+"', '"+periodicidad+"', '"+tipoIndicador+"', '"+analista+"', "+riesgoPadre+")", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        alert("Indicador Creado.");
                        nombreIndicador = '';
                        codigoIndicador = '';
                        toleranciaIndicador = '';
                        tipoToleranciaIndicador = '';
                        valorIdealIndicador = '';
                        tipoValorIdealIndicador = '';
                        periodicidadIndicador = '';
                        tipoIndicador = '';
                        nombreEncargadoIndicador = '';
                        $("#nombreIndicador").val("");
                        $("#codigo").val("");
                        this.setState({
                            x: 0
                        });
                        $("#valorIdeal").val("");
                        $("#tipoValorIdeal").val("numerico");
                        $("#tolerancia").val("");
                        $("#tipoTolerancia").val("numerico");
                        $("#periodicidad").val("-1");
                        $("#tipoIndicador").val("riesgoInherente");
                        $("#analista").val("");
                        this.getIndicadorID();
                    });
                }
            });
        }); // fin transaction
    }

    getIndicadorID () {
        //validaciones existe por lo menos regla asignar
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select top 1 * from Indicadores order by ID desc", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            contadorObjetosGuardados = 0;
                            contadorObjetosAGuardar = 0;
                            if(elementosFormulasG.length != 0) {
                                for (var i = 0; i < elementosFormulasG.length; i++) {
                                    this.createIndicatorFormulaElements(result.recordset[0], elementosFormulasG[i], i, elementosFormulasG.length-1);
                                };
                            } else {
                                for (var i = 0; i < atributos.length; i++) {
                                    contadorObjetosAGuardar++;
                                    this.createIndicatorField(result.recordset[0], atributos[i], i);
                                };
                            }
                        }
                    });
                }
            });
        }); // fin transaction
    }

    createIndicatorFormulaElements (indicador, elementoFormula, indiceElemento, ultimaPosicionElemento) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into ElementoIndicador (indicadorID, conexionTablaID, esFuenteDeDato, excelArchivoID, excelVariableID, formaVariableID, elementoVariableID, elementoVariableCampoID, nombreColumnaEnTabla, tipoColumnaEnTabla, nombreVariable, descripcion, operacion) values ("+indicador.ID+", "+elementoFormula.conexionTablaID+", '"+elementoFormula.esFuenteDeDato+"', "+elementoFormula.excelArchivoID+", "+elementoFormula.excelVariableID+", "+elementoFormula.formaVariableID+", "+elementoFormula.elementoVariableID+", "+elementoFormula.elementoVariableCampoID+", '"+elementoFormula.nombreColumnaEnTabla+"', '"+elementoFormula.tipoColumnaEnTabla+"', '"+elementoFormula.nombreVariable+"', '"+elementoFormula.descripcion+"', '"+elementoFormula.operacion+"')", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(indiceElemento == ultimaPosicionElemento && atributos.length > 0) {
                            for (var i = 0; i < atributos.length; i++) {
                                contadorObjetosAGuardar++;
                                this.createIndicatorField(result.recordset[0], atributos[i], i);
                            };
                        } else if(indiceElemento == ultimaPosicionElemento && atributos.length == 0) {
                            this.limpiarArreglos();
                        }
                    });
                }
            });
        }); // fin transaction
    }

    createIndicatorField (indicador, indicadorCampo, posicionAtributo) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into IndicadoresCampos (variableID, nombre, tipo, nivel) values ("+indicador.ID+", '"+indicadorCampo.nombre+"', '"+indicadorCampo.tipo+"', "+indicadorCampo.nivel+")", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        contadorObjetosGuardados++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        //this.props.terminoCrearCampo(variable, variableCampo);
                        contadorObjetosGuardados++;
                        this.getIndicatorFieldID(indicador, indicadorCampo, posicionAtributo);
                    });
                }
            });
        }); // fin transaction
    }

    getIndicatorFieldID (indicador, indicadorCampo, posicionAtributo) {
        //validaciones existe por lo menos regla asignar
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from IndicadoresCampos where nombre = '"+indicadorCampo.nombre+"' and indicadorID = "+indicador.ID, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        /*var formulas, segmentoRegla;
                        if (banderaEsObjeto) {
                            formulas = formulasVariosAtributos;
                            segmentoRegla = segmentoReglasVariosAtributos;
                        } else {
                            formulas = formulasUnAtributo;
                            segmentoRegla = segmentoReglasUnAtributo;
                        }*/
                        var arregloDeFormulasALlamar = [], arregloElementosDeFormulasALlamar = [];
                        for (var j = 0; j < formulas[posicionAtributo].length; j++) {
                            if(arregloDeFormulasALlamar[posicionAtributo] == undefined)
                                arregloDeFormulasALlamar[posicionAtributo] = [];
                            arregloDeFormulasALlamar[posicionAtributo].push(j);
                            if(arregloElementosDeFormulasALlamar[posicionAtributo] == undefined)
                                arregloElementosDeFormulasALlamar[posicionAtributo] = [];
                            formulas[posicionAtributo][j].posicionFormulaEnCampo = j;
                            contadorObjetosAGuardar++;
                            this.createVariableFieldFormula(indicador, result.recordset[0], formulas[posicionAtributo][j], posicionAtributo, j, arregloDeFormulasALlamar, arregloElementosDeFormulasALlamar);
                        };
                        if(formulas[posicionAtributo].length == 0) {
                            var arregloDeSegmentosALlamar = [], arregloReglasDeSegmentosALlamar = [];
                            for (var j = 0; j < segmentoRegla[posicionAtributo].length; j++) {
                                if(arregloDeSegmentosALlamar[posicionAtributo] == undefined)
                                    arregloDeSegmentosALlamar[posicionAtributo] = [];
                                arregloDeSegmentosALlamar[posicionAtributo].push(j);
                                if(arregloReglasDeSegmentosALlamar[posicionAtributo] == undefined)
                                    arregloReglasDeSegmentosALlamar[posicionAtributo] = [];
                                segmentoRegla[posicionAtributo][j].posicionSegmentoEnCampo = j;
                                contadorObjetosAGuardar++;
                                this.createVariableFieldRuleSegments(indicador, result.recordset[0], segmentoRegla[posicionAtributo][j], posicionAtributo, j, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar);
                            };
                        }
                        if(formulas[posicionAtributo].length == 0 && segmentoRegla[posicionAtributo].length == 0) {
                            console.log('HOLA 1');
                            this.limpiarArreglos();
                        }
                    });
                }
            });
        }); // fin transaction
    }

    createVariableFieldRuleSegments (indicador, indicadorCampo, segmento, posicionAtributo, posicionSegmento, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar) {
        //los campos variableID y variableCampoID se ponen luego de la creacion e importacion
        //el campo variableIDCreacionCodigo es el variableID de segmento asignado al crear reglas
        console.log('=============    3');
        console.log('Crear Segmento');
        console.log('indicador');
        console.log(indicador);
        console.log('indicadorCampo');
        console.log(indicadorCampo);
        console.log('segmento');
        console.log(segmento);
        console.log('posicionAtributo');
        console.log(posicionAtributo);
        console.log('posicionSegmento');
        console.log(posicionSegmento);
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into SegmentoReglasIndicadores (conexionTablaID, indicadorID, indicadorCampoID, variableIDCreacionCodigo, esConexionTabla, posicionSegmentoEnCampo, nivelMax) values ("+segmento.conexionTablaID+", "+indicador.ID+", "+indicadorCampo.ID+", "+segmento.variableID+", '"+segmento.esConexionTabla+"', "+posicionSegmento+", "+segmento.nivelMax+")", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        contadorObjetosGuardados++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        contadorObjetosGuardados++;
                        this.getVariableFieldRuleSegments(indicador, indicadorCampo, segmento, posicionAtributo, posicionSegmento, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar);
                    });
                }
            });
        }); // fin transaction
    }

    getVariableFieldRuleSegments (indicador, indicadorCampo, segmento, posicionAtributo, posicionSegmento, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from SegmentoReglasIndicadores where conexionTablaID = "+segmento.conexionTablaID+" and indicadorID = "+indicador.ID+" and indicadorCampoID = "+indicadorCampo.ID+" and variableIDCreacionCodigo = "+segmento.variableID+" and esConexionTabla = '"+segmento.esConexionTabla+"' and posicionSegmentoEnCampo = "+posicionSegmento+" and nivelMax = "+segmento.nivelMax, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log('resultado FormulasVariablesCampos')
                        console.log(result.recordset)
                        if (result.recordset.length > 0) {
                            /*var reglas, formulas, segmento, segmentoRegla;
                            if (banderaEsObjeto) {
                                reglas = reglasVariosAtributos;
                                formulas = formulasVariosAtributos;
                                segmentoRegla = segmentoReglasVariosAtributos;
                            } else {
                                reglas = reglasUnAtributo;
                                formulas = formulasUnAtributo;
                                segmentoRegla = segmentoReglasUnAtributo;
                            }*/
                            for (var i = 0; i < arregloDeSegmentosALlamar[posicionAtributo].length; i++) {
                                if (arregloDeSegmentosALlamar[posicionAtributo][i] == posicionSegmento) {
                                    arregloDeSegmentosALlamar[posicionAtributo].splice(i, 1);
                                    if(arregloDeSegmentosALlamar[posicionAtributo] != undefined && arregloDeSegmentosALlamar[posicionAtributo].length == 0)
                                        arregloDeSegmentosALlamar.splice(posicionAtributo, 1);
                                    break;
                                }
                            };
                            for (var k = 0; k < reglas[posicionAtributo][posicionSegmento].length; k++) {
                                if(arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento] == undefined)
                                    arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento] = [];
                                arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento].push(k);
                            };
                            //lamar solo la primer regla o sea regla padre
                            reglas[posicionAtributo][posicionSegmento][0].segmentoReglaID = result.recordset[0].ID;
                            //crear reglas que sean de comparacion (esCondicion = verdadero)
                            if(reglas[posicionAtributo][posicionSegmento][0].esCondicion) {
                                contadorObjetosAGuardar++;
                                this.createVariableFieldRules(indicador, indicadorCampo, result.recordset[0], reglas[posicionAtributo][posicionSegmento][0], posicionAtributo, posicionSegmento, 0, arregloReglasDeSegmentosALlamar, -1);
                            } else if(!reglas[posicionAtributo][posicionSegmento][0].esCondicion) {
                                contadorObjetosAGuardar++;
                                //crear reglas que sean de asignacion (esCondicion = falso) con el id de formula correcto
                                console.log('formulas')
                                console.log(formulas)
                                console.log('reglas')
                                console.log(reglas)
                                for (var i = 0; i < formulas[posicionAtributo].length; i++) {
                                    if(i == reglas[posicionAtributo][posicionSegmento][0].formulaID) {
                                        console.log('ENCONTRO')
                                        reglas[posicionAtributo][posicionSegmento][0].formulaID = formulas[posicionAtributo][i].ID;
                                        break;
                                    }
                                };
                                this.createVariableFieldRules(indicador, indicadorCampo, result.recordset[0], reglas[posicionAtributo][posicionSegmento][0], posicionAtributo, posicionSegmento, 0, arregloReglasDeSegmentosALlamar, -1);
                            }
                            if( arregloDeSegmentosALlamar.length == 0 && arregloReglasDeSegmentosALlamar.length == 0) {
                                console.log('HOLA 2');
                                this.limpiarArreglos();
                            }
                        }
                    });
                }
            });
        }); // fin transaction
    }
    createVariableFieldRules (indicador, indicadorCampo, segmento, regla, posicionAtributo, posicionSegmento, posicionRegla, arregloReglasDeSegmentosALlamar, reglaPadreID) {
        console.log('=============    4');
        console.log('Crear Regla');
        console.log('indicador');
        console.log(indicador);
        console.log('indicadorCampo');
        console.log(indicadorCampo);
        console.log('segmento');
        console.log(segmento);
        console.log('regla');
        console.log(regla);
        console.log('posicionAtributo');
        console.log(posicionAtributo);
        console.log('posicionSegmento');
        console.log(posicionSegmento);
        console.log('posicionRegla');
        console.log(posicionRegla);
        if(regla != undefined) {
            const transaction = new sql.Transaction( this.props.pool );
            transaction.begin(err => {
                var rolledBack = false;
                transaction.on('rollback', aborted => {
                    rolledBack = true;
                });
                const request = new sql.Request(transaction);
                request.query("insert into ReglasIndicadores (segmentoReglaID, indicadorID, indicadorCampoID, formulaID, reglaPadreID, conexionTablaID, nombreColumnaEnTabla, tipoCampoObjetivo, esCondicion, esConexionTabla, posicionSegmento, operacion, operacionTexto, valor, texto, nivel) values ("+segmento.ID+", "+indicador.ID+", "+indicadorCampo.ID+", "+regla.formulaID+", "+reglaPadreID+", "+regla.conexionTablaID+", '"+regla.nombreColumnaEnTabla+"', '"+regla.tipoCampoObjetivo+"', '"+regla.esCondicion+"', '"+regla.esConexionTabla+"', "+posicionSegmento+", '"+regla.operacion+"', '"+regla.operacionTexto+"', '"+regla.valor+"', '"+regla.texto+"', "+regla.nivel+")", (err, result) => {
                    if (err) {
                        console.log(err);
                        if (!rolledBack) {
                            contadorObjetosGuardados++;
                            console.log('HOLA 3.1');
                            this.limpiarArreglos();
                            transaction.rollback(err => {
                            });
                        }
                    } else {
                        transaction.commit(err => {
                            contadorObjetosGuardados++;
                            /*var segmentoRegla;
                            if (banderaEsObjeto) {
                                segmentoRegla = segmentoReglasVariosAtributos;
                            } else {
                                segmentoRegla = segmentoReglasUnAtributo;
                            }*/
                            if(arregloReglasDeSegmentosALlamar[posicionAtributo] != undefined && arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento] != undefined) {
                                for (var i = 0; i < arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento].length; i++) {
                                    if (arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento][i] == posicionRegla) {
                                        arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento].splice(i, 1);
                                        if(arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento].length == 0) {
                                            arregloReglasDeSegmentosALlamar[posicionAtributo].splice(posicionSegmento, 1);
                                        }
                                        break;
                                    }
                                };
                            }
                            if( arregloReglasDeSegmentosALlamar.length == 0) {
                                console.log('HOLA 3');
                                this.limpiarArreglos();
                            } else {
                                this.traerRegla(indicador, indicadorCampo, segmento, regla, posicionAtributo, posicionSegmento, posicionRegla, arregloReglasDeSegmentosALlamar, reglaPadreID);
                            }
                        });
                    }
                });
            }); // fin transaction
        } else {
            console.log('HOLA 4');
            this.limpiarArreglos();
        }
    }

    traerRegla(indicador, indicadorCampo, segmento, regla, posicionAtributo, posicionSegmento, posicionRegla, arregloReglasDeSegmentosALlamar, reglaPadreID) {
        console.log('=============   5');
        console.log('indicador');
        console.log(indicador);
        console.log('indicadorCampo');
        console.log(variableCampo);
        console.log('segmento');
        console.log(segmento);
        console.log('regla');
        console.log(regla);
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ReglasIndicadores where segmentoReglaID = "+segmento.ID+" and indicadorID = "+indicador.ID+" and indicadorCampoID = "+indicadorCampo.ID+" and formulaID = "+regla.formulaID+" and reglaPadreID =  "+reglaPadreID+" and conexionTablaID = "+regla.conexionTablaID+" and nombreColumnaEnTabla = '"+regla.nombreColumnaEnTabla+"' and tipoCampoObjetivo = '"+regla.tipoCampoObjetivo+"' and esCondicion = '"+regla.esCondicion+"' and esConexionTabla = '"+regla.esConexionTabla+"' and posicionSegmento = "+posicionSegmento+" and operacion = '"+regla.operacion+"' and operacionTexto = '"+regla.operacionTexto+"' and valor = '"+regla.valor+"' and texto = '"+regla.texto+"' and nivel = "+regla.nivel, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        contadorObjetosGuardados++;
                        this.limpiarArreglos();
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if( result.recordset.length > 0 ) {
                            /*var reglas, formulas;
                            if (banderaEsObjeto) {
                                reglas = reglasVariosAtributos;
                                formulas = formulasVariosAtributos;
                            } else {
                                reglas = reglasUnAtributo;
                                formulas = formulasUnAtributo;
                            }*/
                            console.log('posicionAtributo');
                            console.log(posicionAtributo);
                            console.log('posicionSegmento');
                            console.log(posicionSegmento);
                            console.log('posicionRegla+1');
                            console.log(posicionRegla+1);
                            console.log('reglas');
                            console.log(reglas);
                            console.log('result.recordset');
                            console.log(result.recordset[0]);
                            if(reglas[posicionAtributo] != undefined && reglas[posicionAtributo][posicionSegmento] != undefined && reglas[posicionAtributo][posicionSegmento][posicionRegla+1] != undefined) {
                                if(reglas[posicionAtributo][posicionSegmento][posicionRegla+1].esCondicion) {
                                    contadorObjetosAGuardar++;
                                    this.createVariableFieldRules(indicador, indicadorCampo, segmento, reglas[posicionAtributo][posicionSegmento][posicionRegla+1], posicionAtributo, posicionSegmento, posicionRegla+1, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                                } else if(!reglas[posicionAtributo][posicionSegmento][posicionRegla+1].esCondicion) {
                                    contadorObjetosAGuardar++;
                                    //crear reglas que sean de asignacion (esCondicion = falso) con el id de formula correcto
                                    for (var i = 0; i < formulas[posicionAtributo].length; i++) {
                                        if(i == reglas[posicionAtributo][posicionSegmento][posicionRegla+1].formulaID) {
                                            reglas[posicionAtributo][posicionSegmento][posicionRegla+1].formulaID = formulas[posicionAtributo][i].ID;
                                            break;
                                        }
                                    };
                                    this.createVariableFieldRules(indicador, indicadorCampo, segmento, reglas[posicionAtributo][posicionSegmento][posicionRegla+1], posicionAtributo, posicionSegmento, posicionRegla+1, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                                }
                            } /*else if(reglas[posicionAtributo] != undefined && reglas[posicionAtributo][posicionSegmento+1] != undefined) {
                                if(reglas[posicionAtributo][posicionSegmento+1][posicionRegla].esCondicion) {
                                    contadorObjetosAGuardar++;
                                    this.createVariableFieldRules(indicador, indicadorCampo, segmento, reglas[posicionAtributo][posicionSegmento+1][posicionRegla], posicionAtributo, posicionSegmento+1, 0, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                                } else if(!reglas[posicionAtributo][posicionSegmento+1][posicionRegla].esCondicion) {
                                    contadorObjetosAGuardar++;
                                    //crear reglas que sean de asignacion (esCondicion = falso) con el id de formula correcto
                                    for (var i = 0; i < formulas[posicionAtributo].length; i++) {
                                        if(i == reglas[posicionAtributo][posicionSegmento+1][posicionRegla].formulaID) {
                                            reglas[posicionAtributo][posicionSegmento+1][posicionRegla].formulaID = formulas[posicionAtributo][i].ID;
                                            break;
                                        }
                                    };
                                    this.createVariableFieldRules(indicador, indicadorCampo, segmento, reglas[posicionAtributo][posicionSegmento+1][posicionRegla], posicionAtributo, posicionSegmento+1, 0, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                                }
                            } else if(reglas[posicionAtributo+1] != undefined) {
                                if(reglas[posicionAtributo+1][0][0].esCondicion) {
                                    contadorObjetosAGuardar++;
                                    this.createVariableFieldRules(indicador, indicadorCampo, segmento, reglas[posicionAtributo+1][0][0], posicionAtributo+1, 0, 0, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                                } else if(!reglas[posicionAtributo+1].esCondicion) {
                                    contadorObjetosAGuardar++;
                                    //crear reglas que sean de asignacion (esCondicion = falso) con el id de formula correcto
                                    for (var i = 0; i < formulas[posicionAtributo+1].length; i++) {
                                        if(i == reglas[posicionAtributo+1][0][0].formulaID) {
                                            reglas[posicionAtributo+1][0][0].formulaID = formulas[posicionAtributo+1][i].ID;
                                            break;
                                        }
                                    };
                                    this.createVariableFieldRules(indicador, indicadorCampo, segmento, reglas[posicionAtributo+1][0][0], posicionAtributo+1, 0, 0, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                                }
                            }*/ else {
                                console.log('HOLA 5');
                                this.limpiarArreglos();
                            }
                        }
                    });
                }
            });
        }); // fin transaction
    }

    createVariableFieldFormula (indicador, indicadorCampo, formula, posicionAtributo, posicionFormula, arregloDeFormulasALlamar, arregloElementosDeFormulasALlamar) {
        console.log('=============   1');
        console.log('Crear Formula');
        console.log('indicador');
        console.log(indicador);
        console.log('indicadorCampo');
        console.log(indicadorCampo);
        console.log('formula');
        console.log(formula);
        console.log('posicionAtributo');
        console.log(posicionAtributo);
        console.log('posicionFormula');
        console.log(posicionFormula);
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into FormulasIndicadoresCampos (indicadorID, indicadorCampoID, posicionFormulaEnCampo, formula, operacion) values ("+indicador.ID+", "+indicadorCampo.ID+", "+posicionFormula+", '"+formula.formula+"', '"+formula.operacion+"')", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        contadorObjetosGuardados++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        contadorObjetosGuardados++;
                        this.getVariableFieldFormulaID(indicador, indicadorCampo, formula, posicionAtributo, posicionFormula, arregloDeFormulasALlamar, arregloElementosDeFormulasALlamar);
                    });
                }
            });
        }); // fin transaction
    }

    getVariableFieldFormulaID (indicador, indicadorCampo, formula, posicionAtributo, posicionFormula, arregloDeFormulasALlamar, arregloElementosDeFormulasALlamar) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from FormulasIndicadoresCampos where indicadorID = "+indicador.ID+" and indicadorCampoID = "+variableCampo.ID+" and posicionFormulaEnCampo = "+posicionFormula, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            var existenSegmentos = false;
                            for (var i = 0; i < segmentoRegla.length; i++) {
                                if (segmentoRegla[i].length > 0) {
                                    existenSegmentos = true;
                                }
                            };
                            for (var i = 0; i < elementosFormulas[posicionAtributo][posicionFormula].length; i++) {
                                if(arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula] == undefined)
                                    arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula] = [];
                                arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula].push(i);
                                contadorObjetosAGuardar++;
                                this.createVariableFieldFormulaElement(indicador, indicadorCampo, result.recordset[0], elementosFormulas[posicionAtributo][posicionFormula][i], posicionAtributo, posicionFormula, i, arregloElementosDeFormulasALlamar, existenSegmentos);
                            };
                            formulas[posicionAtributo][posicionFormula].ID = result.recordset[0].ID;
                            if (banderaEsObjeto) {
                                formulasVariosAtributos = formulas;
                            } else {
                                formulasUnAtributo = formulas;
                            }
                            for (var i = 0; i < arregloDeFormulasALlamar[posicionAtributo].length; i++) {
                                if (arregloDeFormulasALlamar[posicionAtributo][i] == posicionFormula) {
                                    arregloDeFormulasALlamar[posicionAtributo].splice(i, 1);
                                    if(arregloDeFormulasALlamar[posicionAtributo].length == 0)
                                        arregloDeFormulasALlamar.splice(posicionAtributo, 1);
                                    break;
                                }
                            };
                            //validar que solo sea llamado una vez por cada atributo
                            //llamado al final para que hasta que haya traido todos los ids de formula llamar crear segmento
                            if(posicionFormula == 0) {
                                var arregloDeSegmentosALlamar = [], arregloReglasDeSegmentosALlamar = [];
                                for (var j = 0; j < segmentoRegla[posicionAtributo].length; j++) {
                                    if(arregloDeSegmentosALlamar[posicionAtributo] == undefined)
                                        arregloDeSegmentosALlamar[posicionAtributo] = [];
                                    arregloDeSegmentosALlamar[posicionAtributo].push(j);
                                    if(arregloReglasDeSegmentosALlamar[posicionAtributo] == undefined)
                                        arregloReglasDeSegmentosALlamar[posicionAtributo] = [];
                                    contadorObjetosAGuardar++;
                                    segmentoRegla[posicionAtributo][j].posicionSegmentoEnCampo = j;
                                    this.createVariableFieldRuleSegments(indicador, indicadorCampo, segmentoRegla[posicionAtributo][j], posicionAtributo, j, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar);
                                };
                                /*for (var i = 0; i < segmentoRegla.length; i++) {
                                    for (var j = 0; j < segmentoRegla[i].length; j++) {
                                        if(arregloDeSegmentosALlamar[i] == undefined)
                                            arregloDeSegmentosALlamar[i] = [];
                                        arregloDeSegmentosALlamar[i].push(j);
                                        if(arregloReglasDeSegmentosALlamar[i] == undefined)
                                            arregloReglasDeSegmentosALlamar[i] = [];
                                        contadorObjetosAGuardar++;
                                        segmentoRegla[i][j].posicionSegmentoEnCampo = j;
                                        this.createVariableFieldRuleSegments(indicador, indicadorCampo, segmentoRegla[i][j], i, j, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar);
                                    };
                                };*/
                            }
                            if( arregloDeFormulasALlamar.length == 0 && !existenSegmentos ) {
                                console.log('HOLA 6');
                                this.limpiarArreglos();
                            }
                        }
                    });
                }
            });
        }); // fin transaction
    }

    createVariableFieldFormulaElement (indicador, indicadorCampo, formula, elemento, posicionAtributo, posicionFormula, posicionElemento, arregloElementosDeFormulasALlamar, existenSegmentos) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into ElementoFormulasIndicadoresCampos (indicadorID, indicadorCampoID, formulaID, conexionTablaID, esFuenteDeDato, elementoVariableID, elementoVariableCampoID, nombreColumnaEnTabla, tipoColumnaEnTabla, nombreVariable, descripcion, operacion) values ("+indicador.ID+", "+indicadorCampo.ID+", "+formula.ID+", "+elemento.conexionTablaID+", '"+elemento.esFuenteDeDato+"', "+elemento.elementoVariableID+", "+elemento.elementoVariableCampoID+", '"+elemento.nombreColumnaEnTabla+"', '"+elemento.tipoColumnaEnTabla+"', '"+elemento.nombreVariable+"', '"+elemento.descripcion+"', '"+elemento.operacion+"')", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        contadorObjetosGuardados++;
                        this.limpiarArreglos();
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        contadorObjetosGuardados++;
                        if(arregloElementosDeFormulasALlamar[posicionAtributo] != undefined && arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula] != undefined) {
                            for (var i = 0; i < arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula].length; i++) {
                                if (arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula][i] == posicionElemento) {
                                    arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula].splice(i, 1);
                                    if(arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula].length == 0)
                                        arregloElementosDeFormulasALlamar[posicionAtributo].splice(posicionFormula, 1);
                                    break;
                                }
                            };
                        }
                        if( arregloElementosDeFormulasALlamar.length == 0 && !existenSegmentos ) {
                            console.log('HOLA 7');
                            this.limpiarArreglos();
                        }
                    });
                }
            });
        }); // fin transaction
    }

    limpiarArreglos() {
        if(contadorObjetosGuardados == contadorObjetosAGuardar) {
            console.log("BORRRO")
            formulaG = '';
            elementosFormulasG = [];
            atributos = [];
            nombreCampoNuevoAtributo = '';
            reglas = [];
            segmentoRegla = [];
            elementosFormulas = [];
            formulas = [];
            posicionAtributoSeleccionado = -1;
            nivelNuevoAtributo = 0;
            tipoDeAsignacionSeleccionado = '';
            operacionSeleccionada = '';
            campoSeleccionado = {};
            indiceSeleccionadoSegmentoReglas = -1;
            indiceSeleccionadoReglas = -1;
            tipoElementoSeleccionadoRegla = '';

            this.setState({
                atributos: [],
                reglas: [],
                tipoNuevaVariable: ""
            });
        }
    }

    goToCreateFormula () {
        var navbar = <div className={"row"}>
            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                <div className={"page-header"}>
                    <h2 className={"pageheader-title"}>Crear Fórmula</h2>
                    <div className={"page-breadcrumb"}>
                        <nav aria-label="breadcrumb">
                            <ol className={"breadcrumb"}>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionIndicador}><a href="#" className={"breadcrumb-link"}>Seleccionar Riesgo</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.retornoCrearIndicador}><a href="#" className={"breadcrumb-link"}>Crear Indicador</a></li>
                                <li className={"breadcrumb-item active font-16"} aria-current="page">Crear Fórmula</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>;
        banderaEsFormulaIndicador = true;
        this.setState({
            componenteActual: "crearFormula",
            navbar: navbar
        });
    }

    retornoCrearIndicador () {
        this.setState({
            componenteActual: "crearIndicador"
        });
    }

    retornoCampoFormula (tipoVariable) {
        tipoDeAsignacionSeleccionado = tipoVariable;
    }

    retornoCampoCondicion (campo) {
        campoSeleccionado = campo;
    }

    retornarValor (campoNuevo, campoNuevoTexto) {
        valorSeleccionado = campoNuevo;
        valorSeleccionadoTexto = campoNuevoTexto;
    }

    retornoOperacion (operacion) {
        operacionSeleccionada = operacion;
    }

    actualizarIndiceSeleccionadoReglas(indiceSegmento, indiceRegla, tipoElemento) {
        indiceSeleccionadoSegmentoReglas = indiceSegmento;
        indiceSeleccionadoReglas = indiceRegla;
        tipoElementoSeleccionadoRegla = tipoElemento;
    }

    actualizarNivelNuevaRegla () {
        //
    }

    goToCreateConditions (indice) {
        var navbar = <div className={"row"}>
            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                <div className={"page-header"}>
                    <h2 className={"pageheader-title"}>Condiciones</h2>
                    <div className={"page-breadcrumb"}>
                        <nav aria-label="breadcrumb">
                            <ol className={"breadcrumb"}>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionIndicador}><a href="#" className={"breadcrumb-link"}>Seleccionar Riesgo</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.retornoCrearIndicador}><a href="#" className={"breadcrumb-link"}>Crear Indicador</a></li>
                                <li className={"breadcrumb-item active font-16"} aria-current="page">Condiciones</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>;
        posicionAtributoSeleccionado = indice;
        //tipoElementoSeleccionado = tipoIndice;
        var posicionSel = posicionAtributoSeleccionado;
        //indice = -1 cuando se va a condiciones de un campo nuevo
        //cuando se presiona NavBar indice es igual indice anterior
        //cuando se selecciona un campo existente indice = posicion campo
        if(posicionAtributoSeleccionado == -1) {
            posicionSel = this.state.atributos.length;
        }
        if(formulas[posicionSel] == undefined)
            formulas[posicionSel] = [];
        if(reglas[posicionSel] == undefined)
            reglas[posicionSel] = [];
        this.setState({
            componenteActual: "variableCondiciones",
            navbar: navbar,
            formulas: formulas[posicionSel],
            reglas: reglas[posicionSel]
        });
    }

    goToCreateConditionsClickNavBarFormula () {
        this.goToCreateConditions(posicionAtributoSeleccionado);
    }

    goToCreateFormulaCampo (indice) {
        var navbar = <div className={"row"}>
            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                <div className={"page-header"}>
                    <h2 className={"pageheader-title"}>Condiciones</h2>
                    <div className={"page-breadcrumb"}>
                        <nav aria-label="breadcrumb">
                            <ol className={"breadcrumb"}>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionIndicador}><a href="#" className={"breadcrumb-link"}>Seleccionar Riesgo</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.retornoCrearIndicador}><a href="#" className={"breadcrumb-link"}>Crear Indicador</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.goToCreateConditionsClickNavBarFormula}><a href="#" className={"breadcrumb-link"}>Condiciones</a></li>
                                <li className={"breadcrumb-item active font-16"} aria-current="page">Crear F&oacute;rmula</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>;
        //deseleccionado regla seleccionada
        banderaEsFormulaIndicador = false;
        indiceSeleccionadoReglas = -1;
        indiceSeleccionadoFormula = indice;
        this.setState({
            componenteActual: "variableFormula",
            navbar: navbar
        });
    }

    actualizarNombreCampoNuevoAtributo () {
        var nombreCampo = $("#nombreAtributoNuevoCampo").val();
        nombreCampoNuevoAtributo = nombreCampo;
    }

    retornarCodigoOperacion (codigo) {
        if(codigo.localeCompare("ASIG") == 0) {
            return "ASIGNAR";
        }
        if(codigo.localeCompare("COUNT") == 0) {
            return "CONTAR";
        }
        if(codigo.localeCompare("PROM") == 0) {
            return "PROMEDIAR";
        }
        if(codigo.localeCompare("MAX") == 0) {
            return "MÁXIMO";
        }
        if(codigo.localeCompare("MIN") == 0) {
            return "MÍNIMO";
        }
        if(codigo.localeCompare("SUM") == 0) {
            return "SUMAR";
        }
        if(codigo.localeCompare("FORMULA") == 0) {
            return "FORMULA";
        }
    }

    verificarNoExisteNombreCampo (nombre) {
        var noExiste = true;
        if (banderaEsInstruccionSQL) {
            for (var i = 0; i < atributos.length; i++) {
                if (atributos[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
                    noExiste = false;
                    break;
                }
            };
        }
        return noExiste;
    }

    crearAtributoVariable () {              //agrega valor a arreglo, pero no guarda en base de datos
        var nombreAtributo = $("#nombreAtributoNuevoCampo").val();
        if(nombreAtributo.length > 0) {
            if(this.verificarNoExisteNombreCampo(nombreAtributo)) {
                if(tipoDeAsignacionSeleccionado != undefined && tipoDeAsignacionSeleccionado.length > 0) {
                    //seleccionar arreglo a insertar, si de varios atributos o unico
                    var arreglo, nivel;
                    arreglo = atributos;
                    nivel = nivelNuevoAtributo;
                    var nuevoAtributo = {nombre: nombreAtributo, tipo: tipoDeAsignacionSeleccionado, nivel: nivel};
                    arreglo.push(nuevoAtributo);
                    this.setState({
                        atributos: arreglo,
                        tipoNuevaVariable: ""
                    });
                    nivelNuevoAtributo = 0;
                    nombreCampoNuevoAtributo = '';
                    $("#nombreAtributoNuevoCampo").val("");
                    alert("Campo creado.");
                } else {
                    alert("Seleccione un tipo de asignación.");
                }
            } else {
                alert("El nombre del campo debe ser unico.");
            }
        } else {
            alert("Ingrese un valor para el nombre del atributo.");
        }
    }

    anadirRegla (esFormula, formulaSeleccionada, posicionFormulaSeleccionada) {
        var posicionAtributo = posicionAtributoSeleccionado;
        //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
        //cuando se presiona NavBar indice es igual indice anterior
        //cuando se selecciona un campo existente indice = posicion campo
        if(posicionAtributo == -1) {
            posicionAtributo = this.state.atributos.length;
        }
        //viendo si regla condicion ya tiene regla sino
        //comparando si la regla seleccionada es otra regla, y si la nueva regla a insertar no es formula
        var banderaSinoReglaValido = true;
        if(tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && !esFormula && $("#sinoRADIO").is(':checked')) {
            var nivelABuscar = reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas][indiceSeleccionadoReglas].nivel;
            if(indiceSeleccionadoReglas+1 < reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas].length) {
                for (var i = indiceSeleccionadoReglas+1; i < reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas].length; i++) {
                    if (nivelABuscar == reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas][i].nivel && reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas][i].operacion.localeCompare("ELSE") == 0) {
                        banderaSinoReglaValido = false;
                    }
                };
            }
        }
        var reglaEsValida = true;
        if(!esFormula) {
            if(campoSeleccionado == undefined || campoSeleccionado.valor == undefined) {
                reglaEsValida = false;
            }
            if(valorSeleccionado.length == 0) {
                reglaEsValida = false;
            }
            if(operacionSeleccionada.operacion == undefined) {
                reglaEsValida = false;
            }
            if(campoSeleccionado.tipo != undefined) {
                if(campoSeleccionado.tipo.localeCompare("int") == 0 || campoSeleccionado.tipo.localeCompare("decimal") == 0) {
                    if(valorSeleccionado.indexOf("NUMERO") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                        reglaEsValida = false;
                    }
                } else if(campoSeleccionado.tipo.localeCompare("bool") == 0) {
                    if(valorSeleccionado.indexOf("BOOL") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                        reglaEsValida = false;
                    }
                } else if(campoSeleccionado.tipo.localeCompare("date") == 0) {
                    if(valorSeleccionado.indexOf("FECHA") == -1 && valorSeleccionado.indexOf("TIME") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                        reglaEsValida = false;
                    }
                } else if(campoSeleccionado.tipo.localeCompare("varchar") == 0) {
                    if(valorSeleccionado.indexOf("VARCHAR") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                        reglaEsValida = false;
                    }
                }
            }
        } else {
            if(formulaSeleccionada.formula == undefined) {
                reglaEsValida = false;
            }
        }
        //si es formula, viendo que no haya regla debajo, formulas solo se pueden agregar al final
        if(banderaSinoReglaValido && reglaEsValida) {
            if(indiceSeleccionadoReglas != -1 || ( indiceSeleccionadoReglas == -1 && (reglas.length == 0 || (reglas[posicionAtributo] != undefined && reglas[posicionAtributo].length == 0) )) ) {
                var entrarACrearRegla = false;
                if(indiceSeleccionadoReglas != -1 && tipoElementoSeleccionadoRegla.length > 0 && tipoElementoSeleccionadoRegla.localeCompare("abajo") != 0 && segmentoRegla[posicionAtributo] != undefined) {
                    //validando nueva regla tenga la misma variable o conexion tabla del mismo segmento
                    if(!esFormula) {
                        if(campoSeleccionado.tablaID != undefined) {
                            if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].conexionTablaID == campoSeleccionado.tablaID) {
                                entrarACrearRegla = true;
                            }
                        } else if(campoSeleccionado.variableID != undefined) {
                            if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].variableID == campoSeleccionado.variableID) {
                                entrarACrearRegla = true;
                            }
                            //viendo si variable seleccionada es objeto
                            var variableSel = this.state.variables.filter(function (object) {
                                return object.ID == campoSeleccionado.variableID;
                            });
                            if(variableSel.length > 0) {
                                if(!variableSel[0].esObjeto)
                                    entrarACrearRegla = true;
                            }
                        } else if(campoSeleccionado.excelArchivoID != undefined) {
                            entrarACrearRegla = true;
                        } else if(campoSeleccionado.formaVariableID != undefined) {
                            entrarACrearRegla = true;
                        }
                    } else {
                        if(formulaSeleccionada.tablaID != undefined) {
                            if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].conexionTablaID == formulaSeleccionada.tablaID) {
                                entrarACrearRegla = true;
                            }
                        } else if(formulaSeleccionada.variableID != undefined) {
                            if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].variableID == formulaSeleccionada.variableID) {
                                entrarACrearRegla = true;
                            }
                            //viendo si variable seleccionada es objeto
                            var variableSel = this.state.variables.filter(function (object) {
                                return object.ID == formulaSeleccionada.variableID;
                            });
                            if(variableSel.length > 0) {
                                if(!variableSel[0].esObjeto)
                                    entrarACrearRegla = true;
                            }
                        } else if(formulaSeleccionada.excelArchivoID != undefined) {
                            entrarACrearRegla = true;
                        } else if(formulaSeleccionada.formaVariableID != undefined) {
                            entrarACrearRegla = true;
                        }
                    }
                } else if( ( indiceSeleccionadoReglas == -1 && (reglas.length == 0 || (reglas[posicionAtributo] != undefined && reglas[posicionAtributo].length == 0) )) || tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0 ||  segmentoRegla[posicionAtributo] == undefined) {
                    entrarACrearRegla = true;
                }
                if(entrarACrearRegla) {
                    if(!esFormula) {
                        var valor = $("#valor").val();
                        var posicionSel = posicionAtributoSeleccionado;
                        //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
                        //cuando se presiona NavBar indice es igual indice anterior
                        //cuando se selecciona un campo existente indice = posicion campo
                        if(posicionAtributoSeleccionado == -1) {
                            posicionSel = this.state.atributos.length;
                        }
                        if(reglas[posicionSel] == undefined) {
                            [];
                        }
                        if(segmentoRegla.length == undefined)
                            segmentoRegla = [];
                        if(segmentoRegla[posicionSel] == undefined)
                            segmentoRegla[posicionSel] = [];
                        var conexionTablaID = -1, variableID = -1, esConexionTabla = false, nivelMax = 1, nombreColumnaEnTabla = '';
                        if(campoSeleccionado.tablaID != -1) {
                            conexionTablaID = campoSeleccionado.tablaID;
                            esConexionTabla = true;
                            nombreColumnaEnTabla = campoSeleccionado.valor;
                        } else {
                            variableID = campoSeleccionado.variableID;
                        }
                        var posicionInsertarReglaAtributo = 0, posicionInsertarReglaSegmento = 0;
                        if(tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0 || (indiceSeleccionadoReglas == -1 && tipoElementoSeleccionadoRegla.length == 0) || segmentoRegla[posicionSel].length == 0) {
                            var segmentoReglaIndex = 0;
                            if(segmentoRegla[posicionSel].length > 0) {
                                segmentoReglaIndex = segmentoRegla[posicionSel].length;
                            }
                            segmentoRegla[posicionSel].push({conexionTablaID: conexionTablaID, variableID: variableID, esConexionTabla: esConexionTabla, nivelMax: nivelMax, segmentoReglaIndex: segmentoReglaIndex});
                            posicionInsertarReglaAtributo = posicionSel;
                            posicionInsertarReglaSegmento = segmentoRegla[posicionSel].length-1;
                        } else {
                            segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].nivelMax++;
                            posicionInsertarReglaAtributo = posicionSel;
                            posicionInsertarReglaSegmento = indiceSeleccionadoSegmentoReglas;
                        }
                        if(reglas[posicionInsertarReglaAtributo] == undefined) {
                            reglas[posicionInsertarReglaAtributo] = [];
                        }
                        if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] == undefined) {
                            reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] = [];
                        }
                        var esCondicion = !esFormula;
                        var segmentoReglaIndex = 0;
                        if(indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") != 0) {
                            //cuando se esta añadiendo una regla a un segmento existente
                            segmentoReglaIndex = indiceSeleccionadoSegmentoReglas;
                        } else if(indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                            //cuando se esta añadiendo una regla a un nuevo segmento
                            segmentoReglaIndex = indiceSeleccionadoSegmentoReglas+1;
                        }
                        var nuevoNivel = 0;
                        var nuevaRegla = {
                                            segmentoReglaID: segmentoReglaIndex,
                                            conexionTablaID: conexionTablaID,
                                            nombreColumnaEnTabla: nombreColumnaEnTabla,
                                            formulaID: -1,
                                            variableID: -1,
                                            variableCampoID: -1,
                                            reglaPadreID: -1,
                                            tipoCampoObjetivo: campoSeleccionado.tipo,
                                            esCondicion: esCondicion,
                                            esConexionTabla: esConexionTabla,
                                            operacion: operacionSeleccionada.operacion,
                                            operacionTexto: operacionSeleccionada.operacionTexto,
                                            valor: valor,
                                            texto: campoSeleccionado.valor+" "+operacionSeleccionada.operacionTexto+" "+valor,
                                            nivel: nuevoNivel,
                                            posicionSegmentoEnCampo: segmentoReglaIndex
                                        };
                        if(reglas.length == 0 || reglas[posicionInsertarReglaAtributo].length == 0 || reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length == 0) {
                            //cuando no existe regla creada para el campo
                            reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
                        } else {
                            //el campo ya tiene una regla o mas creada

                            if(tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#siRADIO").is(':checked') ) {
                                //se seleciona el indice de la posicion de la regla dentro del arreglo, para que despues se pueda sacar el ID a base de la posicion
                                //se pone de regla padre a la regla seleccionada
                                nuevaRegla.reglaPadreID = indiceSeleccionadoReglas;
                                nuevaRegla.nivel = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].nivel+1;
                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas+1, 0, nuevaRegla);
                                if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas+2] != undefined) {
                                    for (var i = indiceSeleccionadoReglas+2; i < reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length; i++) {
                                        if(nuevaRegla.nivel <= reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel) {
                                            reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].reglaPadreID = i-1;
                                            reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel++;
                                        }
                                    };
                                }
                            } else if(tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#sinoRADIO").is(':checked') ) {
                                var posicionAInsertar = -1;
                                nuevaRegla.reglaPadreID = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].reglaPadreID;
                                nuevaRegla.nivel = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].nivel;
                                if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas+1] != undefined) {
                                    for (var i = indiceSeleccionadoReglas+1; i < reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length; i++) {
                                        if(nuevaRegla.nivel > reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel){
                                            posicionAInsertar = i;
                                        }
                                    };
                                }
                                if(posicionAInsertar != -1) {
                                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(posicionAInsertar, 0, nuevaRegla);
                                } else {
                                    //insertar al final del segmento
                                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
                                }
                            } else if(tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                                nuevaRegla.reglaPadreID = -1;
                                nuevaRegla.nivel = -1;
                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
                            } else if(tipoElementoSeleccionadoRegla.localeCompare("arriba") == 0) {
                                nuevaRegla.reglaPadreID = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].reglaPadreID;
                                nuevaRegla.nivel = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].nivel;
                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas, 0, nuevaRegla);
                                if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas+1] != undefined) {
                                    for (var i = indiceSeleccionadoReglas+1; i < reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length; i++) {
                                        if(nuevaRegla.nivel <= reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel) {
                                            reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].reglaPadreID = i-1;
                                            reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel++;
                                        }
                                    };
                                }
                            }
                            //la condicion es anidada, o sea dentro de la condicion padre
                        }
                        //deseleccionado regla seleccionada
                        indiceSeleccionadoReglas = -1;
                        this.setState({
                            reglas: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]
                        });
                        //reglas[posicionSel].push(nuevaRegla);
                        campoSeleccionado = null;
                        valorSeleccionado = '';
                    } else {
                        //es regla formula
                        var posicionSel = posicionAtributoSeleccionado;
                        //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
                        //cuando se presiona NavBar indice es igual indice anterior
                        //cuando se selecciona un campo existente indice = posicion campo
                        if(posicionAtributoSeleccionado == -1) {
                            posicionSel = this.state.atributos.length;
                        }
                        //verificando que campo de formula seleccionado es mismo tipo variable
                        //tipoDeAsignacionSeleccionado
                        if(this.state.tipoNuevaVariable.localeCompare(tipoDeAsignacionSeleccionado) == 0 || this.state.tipoNuevaVariable.length == 0 ) {
                            var nuevoNivel = 0;
                            if(segmentoRegla.length == undefined)
                                segmentoRegla = [];
                            if(segmentoRegla[posicionSel] == undefined)
                                segmentoRegla[posicionSel] = [];
                            var conexionTablaID = -1, variableID = -1, esConexionTabla = false, nivelMax = 1;
                            var posicionInsertarReglaAtributo = 0, posicionInsertarReglaSegmento = 0;
                            var posicionSegmentoEnCampo = -1; //bandera para saber a que segmento pertenece la regla, utilizado para elegir color fondo reglas
                            if(formulaSeleccionada.tablaID != -1) {
                                conexionTablaID = formulaSeleccionada.tablaID;
                                esConexionTabla = true;
                            } else {
                                variableID = formulaSeleccionada.variableID;
                            }
                            if(tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0 || (indiceSeleccionadoReglas == -1 && tipoElementoSeleccionadoRegla.length == 0) || segmentoRegla[posicionSel].length == 0) {
                                var segmentoReglaIndex = 0;
                                if(segmentoRegla[posicionSel].length > 0) {
                                    segmentoReglaIndex = segmentoRegla[posicionSel].length;
                                }
                                segmentoRegla[posicionSel].push({conexionTablaID: conexionTablaID, variableID: variableID, esConexionTabla: esConexionTabla, nivelMax: nivelMax, segmentoReglaIndex: segmentoReglaIndex});
                                posicionInsertarReglaAtributo = posicionSel;
                                posicionInsertarReglaSegmento = segmentoRegla[posicionSel].length-1;
                            } else {
                                segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].nivelMax++;
                                posicionInsertarReglaAtributo = posicionSel;
                                posicionInsertarReglaSegmento = indiceSeleccionadoSegmentoReglas;
                            }
                            if(reglas[posicionInsertarReglaAtributo] == undefined) {
                                reglas[posicionInsertarReglaAtributo] = [];
                            }
                            if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] == undefined) {
                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] = [];
                            }
                            var esCondicion = !esFormula;
                            var segmentoReglaIndex = 0;
                            if(indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") != 0) {
                                //cuando se esta añadiendo una regla a un segmento existente
                                segmentoReglaIndex = indiceSeleccionadoSegmentoReglas;
                            } else if(indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                                //cuando se esta añadiendo una regla a un nuevo segmento
                                segmentoReglaIndex = indiceSeleccionadoSegmentoReglas+1;
                            }

                            var nuevaRegla = {
                                                segmentoReglaID: segmentoReglaIndex,
                                                conexionTablaID: conexionTablaID,
                                                nombreColumnaEnTabla: '',
                                                formulaID: posicionFormulaSeleccionada,
                                                variableID: -1,
                                                variableCampoID: -1,
                                                reglaPadreID: -1,
                                                esCondicion: esCondicion,
                                                esConexionTabla: esConexionTabla,
                                                tipoCampoObjetivo: tipoDeAsignacionSeleccionado,
                                                operacion: formulaSeleccionada.operacion,
                                                operacionTexto: this.retornarCodigoOperacion(formulaSeleccionada.operacion),
                                                valor: formulaSeleccionada.operacion,
                                                texto: formulaSeleccionada.formula,
                                                nivel: nuevoNivel,
                                                posicionSegmentoEnCampo: segmentoReglaIndex
                                            };
                            if(reglas.length == 0 || reglas[posicionInsertarReglaAtributo].length == 0 || reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length == 0) {
                                //cuando no existe regla creada para el campo
                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
                            } else {
                                //el campo ya tiene una regla o mas creada

                                if( (tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#siRADIO").is(':checked')) || (tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && !$("#siRADIO").is(':checked') && !$("#sinoRADIO").is(':checked')) ) {
                                    //se seleciona el indice de la posicion de la regla dentro del arreglo, para que despues se pueda sacar el ID a base de la posicion
                                    //se pone de regla padre a la regla seleccionada
                                    nuevaRegla.reglaPadreID = indiceSeleccionadoReglas;
                                    nuevaRegla.nivel = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].nivel+1;
                                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas+1, 0, nuevaRegla);
                                    if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas+2] != undefined) {
                                        for (var i = indiceSeleccionadoReglas+2; i < reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length; i++) {
                                            if(nuevaRegla.nivel <= reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel) {
                                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].reglaPadreID = i-1;
                                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel++;
                                            }
                                        };
                                    }
                                } else if(tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#sinoRADIO").is(':checked') ) {
                                    var posicionAInsertar = -1;
                                    nuevaRegla.reglaPadreID = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].reglaPadreID;
                                    nuevaRegla.nivel = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].nivel;
                                    if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas+1] != undefined) {
                                        for (var i = indiceSeleccionadoReglas+1; i < reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length; i++) {
                                            if(nuevaRegla.nivel > reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel){
                                                posicionAInsertar = i;
                                            }
                                        };
                                    }
                                    if(posicionAInsertar != -1) {
                                        reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(posicionAInsertar, 0, nuevaRegla);
                                    } else {
                                        //insertar al final del segmento
                                        reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
                                    }
                                } else if(tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                                    nuevaRegla.reglaPadreID = -1;
                                    nuevaRegla.nivel = -1;
                                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
                                } else if(tipoElementoSeleccionadoRegla.localeCompare("arriba") == 0) {
                                    nuevaRegla.reglaPadreID = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].reglaPadreID;
                                    nuevaRegla.nivel = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].nivel;
                                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas, 0, nuevaRegla);
                                    if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas+1] != undefined) {
                                        for (var i = indiceSeleccionadoReglas+1; i < reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length; i++) {
                                            if(nuevaRegla.nivel <= reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel) {
                                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].reglaPadreID = i-1;
                                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel++;
                                            }
                                        };
                                    }
                                }
                                //la condicion es anidada, o sea dentro de la condicion padre
                            }
                            //deseleccionado regla seleccionada
                            indiceSeleccionadoReglas = -1;
                            var tempNewCopy = [...reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]];
                            this.setState({
                                reglas: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]
                            });
                            if(this.state.tipoNuevaVariable.length == 0) {
                                this.setState({
                                    tipoNuevaVariable: tipoDeAsignacionSeleccionado
                                });
                            }
                            formulaSeleccionada = null;
                            //tipoDeAsignacionSeleccionado = '';
                        } else {
                            if(this.state.tipoNuevaVariable.localeCompare(tipoDeAsignacionSeleccionado) != 0) {
                                alert("El tipo de asignacion de formula no coincide el tipo de campo.");
                            }
                        }
                    }
                } else {
                    var texto2 = 'variable';
                    if(campoSeleccionado.tablaID != undefined)
                        texto2 = 'tabla';
                    var texto = 'formula';
                    if(!esFormula)
                        texto = 'comparación';
                    alert("La "+texto+" ingresada no pertenece a la misma "+texto2+".");
                }
            } else {
                alert("Seleccione una posición en la 'Lógica para el cálculo'");
            }
        } else {
            if(!reglaEsValida && !esFormula)
                alert("Ingrese todos los campos necesarios para la condicion.");
            else if(!reglaEsValida && esFormula)
                alert("Seleccione una formula.");
            alert("La comparación ya tiene una clausula 'SINO'");
        }
    }

    revisarTipoAnadirFormula (formula, formulaArreglo) {
        console.log('banderaEsFormulaIndicador')
        console.log(banderaEsFormulaIndicador)
        if(banderaEsFormulaIndicador)
            this.anadirFormulaIndicador(formula, formulaArreglo);
        else
            this.anadirFormula(formula, formulaArreglo);
    }

    anadirFormulaIndicador (formula, formulaArreglo) {
        formulaG = formula.formula;
        console.log('formula')
        console.log(formula)
        console.log('formulaArreglo')
        console.log(formulaArreglo)
        //indiceSeleccionadoFormula es el indice de la formula seleccionada, las formula se asocian por campo (1 campo => muchas formulas)
        elementosFormulasG = [];
        var arregloDeElementos = [];
        this.getElementsFromFormula(formulaArreglo, arregloDeElementos);
        elementosFormulasG = arregloDeElementos;
        /*for (var i = 0; i < formulaArreglo.length; i++) {
            if(formulaArreglo[i].tipo.localeCompare("variable") == 0) {
                var conexionTablaID = -1;
                if(formulaArreglo[i].esFuenteDato != undefined && formulaArreglo[i].esFuenteDato)
                    conexionTablaID = formulaArreglo[i].tablaID;
                var esFuenteDeDato = false;
                if(formulaArreglo[i].esFuenteDato != undefined && formulaArreglo[i].esFuenteDato)
                    esFuenteDeDato = true;
                var excelArchivoID = -1;
                if(formulaArreglo[i].excelArchivoID != undefined)
                    excelArchivoID = formulaArreglo[i].excelArchivoID;
                var excelVariableID = -1;
                if(formulaArreglo[i].excelVariableID != undefined)
                    excelVariableID = formulaArreglo[i].excelVariableID;
                var formaVariableID = -1;
                if(formulaArreglo[i].formaVariableID != undefined)
                    formaVariableID = formulaArreglo[i].formaVariableID;
                var elementoVariableID = -1;
                if(formulaArreglo[i].variableID != undefined)
                    elementoVariableID = formulaArreglo[i].variableID;
                var elementoVariableCampoID = -1;
                if(formulaArreglo[i].variableCampoID != undefined)
                    elementoVariableCampoID = formulaArreglo[i].variableCampoID;
                elementosFormulasG.push({
                    variableID: -1,
                    variableCampoID: -1,
                    formulaID: -1,
                    conexionTablaID: conexionTablaID,
                    esFuenteDeDato: esFuenteDeDato,
                    excelArchivoID: excelArchivoID,
                    excelVariableID: excelVariableID,
                    formaVariableID: formaVariableID,
                    elementoVariableID: elementoVariableID,
                    elementoVariableCampoID: elementoVariableCampoID,
                    nombreColumnaEnTabla: formulaArreglo[i].valor,
                    tipoColumnaEnTabla: tipoDeAsignacionSeleccionado,
                    nombreVariable: formulaArreglo[i].valor,
                    descripcion: '',
                    operacion: formulaArreglo[i].operacion
                });
            }
        };*/
        console.log('elementosFormulasG')
        console.log(elementosFormulasG)
    }

    anadirFormula(formula, formulaArreglo) {
        // 1. Make a shallow copy of the items
        //let campos = [...this.state.camposDeTabla];
        // 2. Make a shallow copy of the item you want to mutate
        //let campo = [...campos[index]];
        // 3. Replace the property you're intested in
        //campo = {ID: campo.ID, idTabla: idTabla, nombre: campoNombre, tipo: tipoCampo, guardar: guardarCampo};
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        //campos[index] = campo;
        // 5. Set the state to our new copy
        var posicionSel = posicionAtributoSeleccionado;
        //indice = -1 cuando se va a condiciones de un campo nuevo
        //cuando se presiona NavBar indice es igual indice anterior
        //cuando se selecciona un campo existente indice = posicion campo
        if(posicionAtributoSeleccionado == -1) {
            posicionSel = this.state.atributos.length;
        }
        //copia antigua formulas
        var copiaAntiguaFormulas = formulas;
        if(copiaAntiguaFormulas[posicionSel] == undefined)
            copiaAntiguaFormulas[posicionSel] = [];
        formula.numeroDeFormulaDeVariable = copiaAntiguaFormulas[posicionSel].length;
        copiaAntiguaFormulas[posicionSel].push(formula);
        this.setState({
            formulas: copiaAntiguaFormulas[posicionSel]
        });
        if(elementosFormulas[posicionSel] == undefined)
            elementosFormulas[posicionSel] = [];
        var posicionFormulaEnCampo = 0;
        if (copiaAntiguaFormulas[posicionSel].length > 0 )
            posicionFormulaEnCampo = copiaAntiguaFormulas[posicionSel].length-1;
        //indiceSeleccionadoFormula es el indice de la formula seleccionada, las formula se asocian por campo (1 campo => muchas formulas)
        if(elementosFormulas[posicionSel][posicionFormulaEnCampo] == undefined)
            elementosFormulas[posicionSel][posicionFormulaEnCampo] = [];
        var arregloDeElementos = [];
        this.getElementsFromFormula(formulaArreglo, arregloDeElementos);
        elementosFormulas[posicionSel][posicionFormulaEnCampo] = arregloDeElementos;
        /*for (var i = 0; i < formulaArreglo.length; i++) {
            if(formulaArreglo[i].tipo.localeCompare("variable") == 0) {
                var conexionTablaID = -1;
                if(formulaArreglo[i].esFuenteDato != undefined && formulaArreglo[i].esFuenteDato)
                    conexionTablaID = formulaArreglo[i].tablaID;
                var esFuenteDeDato = false;
                if(formulaArreglo[i].esFuenteDato != undefined && formulaArreglo[i].esFuenteDato)
                    esFuenteDeDato = true;
                var excelArchivoID = -1;
                if(formulaArreglo[i].excelArchivoID != undefined)
                    excelArchivoID = formulaArreglo[i].excelArchivoID;
                var excelVariableID = -1;
                if(formulaArreglo[i].excelVariableID != undefined)
                    excelVariableID = formulaArreglo[i].excelVariableID;
                var formaVariableID = -1;
                if(formulaArreglo[i].formaVariableID != undefined)
                    formaVariableID = formulaArreglo[i].formaVariableID;
                var elementoVariableID = -1;
                if(formulaArreglo[i].variableID != undefined)
                    elementoVariableID = formulaArreglo[i].variableID;
                var elementoVariableCampoID = -1;
                if(formulaArreglo[i].variableCampoID != undefined)
                    elementoVariableCampoID = formulaArreglo[i].variableCampoID;
                elementosFormulas[posicionSel][posicionFormulaEnCampo].push({
                    variableID: -1,
                    variableCampoID: -1,
                    formulaID: -1,
                    conexionTablaID: conexionTablaID,
                    esFuenteDeDato: esFuenteDeDato,
                    excelArchivoID: excelArchivoID,
                    excelVariableID: excelVariableID,
                    formaVariableID: formaVariableID,
                    elementoVariableID: elementoVariableID,
                    elementoVariableCampoID: elementoVariableCampoID,
                    nombreColumnaEnTabla: formulaArreglo[i].valor,
                    tipoColumnaEnTabla: tipoDeAsignacionSeleccionado,
                    nombreVariable: formulaArreglo[i].valor,
                    descripcion: '',
                    operacion: formulaArreglo[i].operacion
                });
            }
        };*/
    }

    getElementsFromFormula (formulaArreglo, array) {
        for (var i = 0; i < formulaArreglo.length; i++) {
            console.log('formulaArreglo[i]')
            console.log(formulaArreglo[i])
            if(Array.isArray(formulaArreglo[i].valor)) {
                this.getElementsFromFormula(formulaArreglo[i].valor, array);
            } else if(formulaArreglo[i].tipo.localeCompare("variable") == 0) {
                var conexionTablaID = -1;
                if(formulaArreglo[i].esFuenteDato != undefined && formulaArreglo[i].esFuenteDato)
                    conexionTablaID = formulaArreglo[i].tablaID;
                var esFuenteDeDato = false;
                if(formulaArreglo[i].esFuenteDato != undefined && formulaArreglo[i].esFuenteDato)
                    esFuenteDeDato = true;
                var excelArchivoID = -1;
                if(formulaArreglo[i].excelArchivoID != undefined)
                    excelArchivoID = formulaArreglo[i].excelArchivoID;
                var excelVariableID = -1;
                if(formulaArreglo[i].excelVariableID != undefined)
                    excelVariableID = formulaArreglo[i].excelVariableID;
                var formaVariableID = -1;
                if(formulaArreglo[i].formaVariableID != undefined)
                    formaVariableID = formulaArreglo[i].formaVariableID;
                var elementoVariableID = -1;
                if(formulaArreglo[i].variableID != undefined)
                    elementoVariableID = formulaArreglo[i].variableID;
                var elementoVariableCampoID = -1;
                if(formulaArreglo[i].variableCampoID != undefined)
                    elementoVariableCampoID = formulaArreglo[i].variableCampoID;
                array.push({
                    variableID: -1,
                    variableCampoID: -1,
                    formulaID: -1,
                    conexionTablaID: conexionTablaID,
                    esFuenteDeDato: esFuenteDeDato,
                    excelArchivoID: excelArchivoID,
                    excelVariableID: excelVariableID,
                    formaVariableID: formaVariableID,
                    elementoVariableID: elementoVariableID,
                    elementoVariableCampoID: elementoVariableCampoID,
                    nombreColumnaEnTabla: formulaArreglo[i].valor,
                    tipoColumnaEnTabla: tipoDeAsignacionSeleccionado,
                    nombreVariable: formulaArreglo[i].valor,
                    descripcion: '',
                    operacion: formulaArreglo[i].operacion
                });
            }
        };
    }

    modificarRegla (esFormula, formulaSeleccionada, posicionFormulaSeleccionada) {
        if(reglas[0].length > 0 || (reglas[0][0] != undefined && reglas[0][0].length > 0)) {
            var posicionAtributo = posicionAtributoSeleccionado;
            //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
            //cuando se presiona NavBar indice es igual indice anterior
            //cuando se selecciona un campo existente indice = posicion campo
            if(posicionAtributo == -1) {
                posicionAtributo = this.state.atributos.length;
            }
            //viendo si regla condicion ya tiene regla sino
            //comparando si la regla seleccionada es otra regla, y si la nueva regla a insertar no es formula
            var banderaSinoReglaValido = true;
            if(tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && !esFormula && $("#sinoRADIO").is(':checked')) {
                var nivelABuscar = reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas][indiceSeleccionadoReglas].nivel;
                if(indiceSeleccionadoReglas+1 < reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas].length) {
                    for (var i = indiceSeleccionadoReglas+1; i < reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas].length; i++) {
                        if (nivelABuscar == reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas][i].nivel && reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas][i].operacion.localeCompare("ELSE") == 0) {
                            banderaSinoReglaValido = false;
                        }
                    };
                }
            }
            var reglaEsValida = true;
            if(!esFormula) {
                if(campoSeleccionado == undefined || campoSeleccionado.valor == undefined) {
                    reglaEsValida = false;
                }
                if(valorSeleccionado.length == 0) {
                    reglaEsValida = false;
                }
                if(operacionSeleccionada.operacion == undefined) {
                    reglaEsValida = false;
                }
                if(campoSeleccionado.tipo != undefined) {
                    if(campoSeleccionado.tipo.localeCompare("int") == 0 || campoSeleccionado.tipo.localeCompare("decimal") == 0) {
                        if(valorSeleccionado.indexOf("NUMERO") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                            reglaEsValida = false;
                        }
                    } else if(campoSeleccionado.tipo.localeCompare("bool") == 0) {
                        if(valorSeleccionado.indexOf("BOOL") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                            reglaEsValida = false;
                        }
                    } else if(campoSeleccionado.tipo.localeCompare("date") == 0) {
                        if(valorSeleccionado.indexOf("FECHA") == -1 && valorSeleccionado.indexOf("TIME") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                            reglaEsValida = false;
                        }
                    } else if(campoSeleccionado.tipo.localeCompare("varchar") == 0) {
                        if(valorSeleccionado.indexOf("VARCHAR") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                            reglaEsValida = false;
                        }
                    }
                }
            } else {
                if(formulaSeleccionada.formula == undefined) {
                    reglaEsValida = false;
                }
            }
            //si es formula, viendo que no haya regla debajo, formulas solo se pueden agregar al final
            if(banderaSinoReglaValido && reglaEsValida) {
                if(indiceSeleccionadoReglas != -1 || ( indiceSeleccionadoReglas == -1 && (reglas.length == 0 || (reglas[posicionAtributo] != undefined && reglas[posicionAtributo].length == 0) )) ) {
                    var entrarACrearRegla = false;
                    if(indiceSeleccionadoReglas != -1 && tipoElementoSeleccionadoRegla.length > 0 && tipoElementoSeleccionadoRegla.localeCompare("abajo") != 0 && segmentoRegla[posicionAtributo] != undefined) {
                        //validando nueva regla tenga la misma variable o conexion tabla del mismo segmento
                        if(!esFormula) {
                            if(campoSeleccionado.tablaID != undefined) {
                                if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].conexionTablaID == campoSeleccionado.tablaID) {
                                    entrarACrearRegla = true;
                                }
                            } else if(campoSeleccionado.variableID != undefined) {
                                if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].variableID == campoSeleccionado.variableID) {
                                    entrarACrearRegla = true;
                                }
                                if(indiceSeleccionadoSegmentoReglas == 0)
                                    entrarACrearRegla = true;
                                //viendo si variable seleccionada es objeto
                                var variableSel = this.state.variables.filter(function (object) {
                                    return object.ID == campoSeleccionado.variableID;
                                });
                                if(variableSel.length > 0) {
                                    if(!variableSel[0].esObjeto)
                                        entrarACrearRegla = true;
                                }
                            } else if(campoSeleccionado.excelArchivoID != undefined) {
                                entrarACrearRegla = true;
                            } else if(campoSeleccionado.formaVariableID != undefined) {
                                entrarACrearRegla = true;
                            }
                        } else {
                            if(formulaSeleccionada.tablaID != undefined) {
                                if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].conexionTablaID == formulaSeleccionada.tablaID) {
                                    entrarACrearRegla = true;
                                }
                            } else if(formulaSeleccionada.variableID != undefined) {
                                if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].variableID == formulaSeleccionada.variableID) {
                                    entrarACrearRegla = true;
                                }
                                if(indiceSeleccionadoSegmentoReglas == 0)
                                    entrarACrearRegla = true;
                                //viendo si variable seleccionada es objeto
                                var variableSel = this.state.variables.filter(function (object) {
                                    return object.ID == formulaSeleccionada.variableID;
                                });
                                if(variableSel.length > 0) {
                                    if(!variableSel[0].esObjeto)
                                        entrarACrearRegla = true;
                                }
                            } else if(formulaSeleccionada.excelArchivoID != undefined) {
                                entrarACrearRegla = true;
                            } else if(formulaSeleccionada.formaVariableID != undefined) {
                                entrarACrearRegla = true;
                            }
                        }
                    } else if( ( indiceSeleccionadoReglas == -1 && (reglas.length == 0 || (reglas[posicionAtributo] != undefined && reglas[posicionAtributo].length == 0) )) || tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0 ||  segmentoRegla[posicionAtributo] == undefined) {
                        entrarACrearRegla = true;
                    }
                    if(entrarACrearRegla) {
                        if(!esFormula) {
                            var valor = $("#valor").val();
                            var posicionSel = posicionAtributoSeleccionado;
                            //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
                            //cuando se presiona NavBar indice es igual indice anterior
                            //cuando se selecciona un campo existente indice = posicion campo
                            if(posicionAtributoSeleccionado == -1) {
                                posicionSel = this.state.atributos.length;
                            }
                            var posicionInsertarReglaAtributo = 0, posicionInsertarReglaSegmento = 0;
                            segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].nivelMax++;
                            posicionInsertarReglaAtributo = posicionSel;
                            posicionInsertarReglaSegmento = indiceSeleccionadoSegmentoReglas;
                            var esCondicion = !esFormula;
                            var segmentoReglaIndex = 0;
                            if(indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") != 0) {
                                //cuando se esta añadiendo una regla a un segmento existente
                                segmentoReglaIndex = indiceSeleccionadoSegmentoReglas;
                            } else if(indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                                //cuando se esta añadiendo una regla a un nuevo segmento
                                segmentoReglaIndex = indiceSeleccionadoSegmentoReglas+1;
                            }
                            var conexionTablaID = -1, esConexionTabla = false, nombreColumnaEnTabla = '';
                            if(campoSeleccionado.tablaID != undefined) {
                                conexionTablaID = campoSeleccionado.tablaID;
                                esConexionTabla = true;
                                nombreColumnaEnTabla = campoSeleccionado.valor;
                            }
                            var nuevoNivel = 0;
                            var nuevaRegla = {
                                                segmentoReglaID: segmentoReglaIndex,
                                                conexionTablaID: conexionTablaID,
                                                nombreColumnaEnTabla: nombreColumnaEnTabla,
                                                formulaID: -1,
                                                variableID: -1,
                                                variableCampoID: -1,
                                                reglaPadreID: -1,
                                                tipoCampoObjetivo: campoSeleccionado.tipo,
                                                esCondicion: esCondicion,
                                                esConexionTabla: esConexionTabla,
                                                operacion: operacionSeleccionada.operacion,
                                                operacionTexto: operacionSeleccionada.operacionTexto,
                                                valor: valor,
                                                texto: campoSeleccionado.valor+" "+operacionSeleccionada.operacionTexto+" "+valor,
                                                nivel: nuevoNivel,
                                                posicionSegmentoEnCampo: segmentoReglaIndex
                                            };
                            reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas, 1, nuevaRegla);
                            //deseleccionado regla seleccionada
                            indiceSeleccionadoReglas = -1;
                            this.setState({
                                reglas: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]
                            });
                            campoSeleccionado = null;
                            valorSeleccionado = '';
                            //reglas[posicionSel].push(nuevaRegla);
                        } else {
                            //es regla formula
                            var posicionSel = posicionAtributoSeleccionado;
                            //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
                            //cuando se presiona NavBar indice es igual indice anterior
                            //cuando se selecciona un campo existente indice = posicion campo
                            if(posicionAtributoSeleccionado == -1) {
                                posicionSel = this.state.atributos.length;
                            }
                            //verificando que campo de formula seleccionado es mismo tipo variable
                            //tipoDeAsignacionSeleccionado
                            if(this.state.tipoNuevaVariable.localeCompare(tipoDeAsignacionSeleccionado) == 0 || this.state.tipoNuevaVariable.length == 0 ) {
                                var nuevoNivel = nivelNuevoAtributo;
                                var posicionInsertarReglaAtributo = 0, posicionInsertarReglaSegmento = 0;
                                segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].nivelMax++;
                                posicionInsertarReglaAtributo = posicionSel;
                                posicionInsertarReglaSegmento = indiceSeleccionadoSegmentoReglas;
                                var esCondicion = !esFormula;
                                var segmentoReglaIndex = 0;
                                if(indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") != 0) {
                                    //cuando se esta añadiendo una regla a un segmento existente
                                    segmentoReglaIndex = indiceSeleccionadoSegmentoReglas;
                                } else if(indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                                    //cuando se esta añadiendo una regla a un nuevo segmento
                                    segmentoReglaIndex = indiceSeleccionadoSegmentoReglas+1;
                                }
                                var conexionTablaID = -1, esConexionTabla = false, nombreColumnaEnTabla = '';
                                if(campoSeleccionado.tablaID != undefined) {
                                    conexionTablaID = campoSeleccionado.tablaID;
                                    esConexionTabla = true;
                                    nombreColumnaEnTabla = campoSeleccionado.valor;
                                }
                                var nuevaRegla = {
                                                    segmentoReglaID: segmentoReglaIndex,
                                                    conexionTablaID: conexionTablaID,
                                                    nombreColumnaEnTabla: '',
                                                    formulaID: posicionFormulaSeleccionada,
                                                    variableID: -1,
                                                    variableCampoID: -1,
                                                    reglaPadreID: -1,
                                                    esCondicion: esCondicion,
                                                    esConexionTabla: esConexionTabla,
                                                    operacion: formulaSeleccionada.operacion,
                                                    operacionTexto: this.retornarCodigoOperacion(formulaSeleccionada.operacion),
                                                    valor: formulaSeleccionada.operacion,
                                                    texto: formulaSeleccionada.formula,
                                                    nivel: nuevoNivel,
                                                    posicionSegmentoEnCampo: segmentoReglaIndex
                                                };
                                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas, 1, nuevaRegla);
                                //deseleccionado regla seleccionada
                                //indiceSeleccionadoReglas = -1;
                                var tempNewCopy = [...reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]];
                                this.setState({
                                    reglas: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]
                                });
                                formulaSeleccionada = null;
                                var self = this;
                                setTimeout(function(){
                                    console.log(self.state.reglas)
                                }, 2000);
                                if(this.state.tipoNuevaVariable.length == 0) {
                                    this.setState({
                                        tipoNuevaVariable: tipoDeAsignacionSeleccionado
                                    });
                                }
                                //tipoDeAsignacionSeleccionado = '';
                            } else {
                                if(this.state.tipoNuevaVariable.localeCompare(tipoDeAsignacionSeleccionado) != 0) {
                                    alert("El tipo de asignacion de formula no coincide el tipo de campo.");
                                }
                            }
                        }
                    } else {
                        var texto2 = 'variable';
                        if(campoSeleccionado.tablaID != undefined)
                            texto2 = 'tabla';
                        var texto = 'formula';
                        if(!esFormula)
                            texto = 'comparación';
                        alert("La "+texto+" ingresada no pertenece a la misma "+texto2+".");
                    }
                } else {
                    alert("Seleccione una posición en la 'Lógica para el cálculo'");
                }
            } else {
                if(!reglaEsValida && !esFormula)
                    alert("Ingrese todos los campos necesarios para la condicion.");
                else if(!reglaEsValida && esFormula)
                    alert("Seleccione una formula.");
                else
                    alert("La comparación ya tiene una clausula 'SINO'");
            }
        } else {
            alert("Cree una comparación primero");
        }
    }

    eliminarRegla () {
        if(reglas[0].length > 0 || (reglas[0][0] != undefined && reglas[0][0].length > 0)) {
            var posicionSel = posicionAtributoSeleccionado;
            //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
            //cuando se presiona NavBar indice es igual indice anterior
            //cuando se selecciona un campo existente indice = posicion campo
            if(posicionAtributoSeleccionado == -1) {
                posicionSel = this.state.atributos.length;
            }
            var posicionInsertarReglaAtributo = 0, posicionInsertarReglaSegmento = 0;
            posicionInsertarReglaAtributo = posicionSel;
            posicionInsertarReglaSegmento = indiceSeleccionadoSegmentoReglas;
            reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas, 1);
            indiceSeleccionadoReglas = -1;
            if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length == 0) {
                reglas[posicionInsertarReglaAtributo].splice(posicionInsertarReglaSegmento, 1);
                segmentoRegla[posicionInsertarReglaAtributo].splice(posicionInsertarReglaSegmento, 1);
            }
            if(reglas[posicionInsertarReglaAtributo] == undefined || reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] == undefined || reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length == 0) {
                this.setState({
                    reglas: []
                });
            } else {
                this.setState({
                    reglas: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]
                });
            }
        } else {
            alert("Cree una comparación primero");
        }
    }

    updateNombreIndicador() {
        nombreIndicador = $("#nombreIndicador").val();
    }

    updateCodigoIndicador() {
        codigoIndicador = $("#codigo").val();
    }

    updateValorIdealIndicador() {
        valorIdealIndicador = $("#valorIdeal").val();
    }

    updateTipoValorIdealIndicador() {
        tipoValorIdealIndicador = $("#tipoValorIdeal").val();
    }

    updateToleranciaIndicador() {
        toleranciaIndicador = $("#tolerancia").val();
    }

    updateTipoTolerancia () {
        tipoToleranciaIndicador = $("#tipoTolerancia").val();
    }

    updatePeriodicidadIndicador() {
        periodicidadIndicador = $("#periodicidad").val();
    }

    updateTipoIndicador() {
        tipoIndicador = $("#tipoIndicador").val();
    }

    updateNombreEncargadoIndicador() {
        nombreEncargadoIndicador = $("#analista").val();
    }

    render() {
        if(this.state.componenteActual.localeCompare("crearIndicador") == 0) {
            return (
                <div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"page-header"}>
                                <h2 className={"pageheader-title"}>Crear Indicador</h2>
                                <div className={"page-breadcrumb"}>
                                    <nav aria-label="breadcrumb">
                                        <ol className={"breadcrumb"}>
                                            <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                            <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionIndicador}><a href="#" className={"breadcrumb-link"}>Seleccionar Riesgo</a></li>
                                            <li className={"breadcrumb-item active font-16"} aria-current="page">Crear Indicador</li>
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
                                    <div className={"border-top border-bottom addPaddingToConfig"} style={{width: "100%"}}>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="nombreIndicador" className="col-form-label">Nombre Indicador</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <input id="nombreIndicador" defaultValue={nombreIndicador} onKeyUp={this.updateNombreIndicador} type="text" className="form-control form-control-sm"/>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="codigo" className="col-form-label">Codigo</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <input id="codigo" defaultValue={codigoIndicador} onKeyUp={this.updateCodigoIndicador} type="text" className="form-control form-control-sm"/>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="peso" className="col-form-label">Peso</label>
                                            </div>
                                            <div className={"col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 form-group"}>
                                                <Slider
                                                    axis="x"
                                                    xstep={1}
                                                    xmin={0}
                                                    xmax={this.props.pesoDisponibleRiesgo}
                                                    x={this.state.x}
                                                    onChange={({ x }) => this.setState({ x: x }) }
                                                    style={{width: "100%", marginTop: "10px"}}/>
                                            </div>
                                            <div className={"col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 form-group"}>
                                                <label id="pesoLabel" className="col-form-label">{this.state.x}</label>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="valorIdeal" className="col-form-label">Valor Ideal</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <input id="valorIdeal" defaultValue={valorIdealIndicador} onKeyUp={this.updateValorIdealIndicador} type="text" className="form-control form-control-sm"/>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="tipoValorIdeal" className="col-form-label">Tipo de Valor Ideal</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <select id="tipoValorIdeal" defaultValue={tipoValorIdealIndicador} onChange={this.updateTipoValorIdealIndicador} className="form-control">
                                                    <option value="numerico">Numérico</option>
                                                    <option value="porcentual">Porcentual</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="tolerancia" className="col-form-label">Tolerancia</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <input id="tolerancia" defaultValue={toleranciaIndicador} onKeyUp={this.updateToleranciaIndicador} type="text" className="form-control form-control-sm"/>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="tipoTolerancia" className="col-form-label">Tipo de Tolerancia</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <select id="tipoTolerancia" defaultValue={tipoToleranciaIndicador} onChange={this.updateTipoTolerancia} className="form-control">
                                                    <option value="numerico">Numérico</option>
                                                    <option value="porcentual">Porcentual</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="periodicidad" className="col-form-label">Periodicidad</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <select id="periodicidad" defaultValue={periodicidadIndicador} onChange={this.updatePeriodicidadIndicador} className="form-control">
                                                    <option value="-1">Ninguno</option>
                                                    {periodicidad.map((periodicidad, i) =>
                                                        <option value={periodicidad.nombre} key={periodicidad.nombre}>{periodicidad.nombre}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="tipoIndicador" className="col-form-label">Tipo Indicador</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                {
                                                    this.props.formulaRiesgo.localeCompare('ambos') == 0
                                                    ?   <select id="tipoIndicador" defaultValue={tipoIndicador} onChange={this.updateTipoIndicador} className="form-control">
                                                            <option value="riesgoInherente">Riesgo Inherente</option>
                                                            <option value="calidadGestion">Calidad de Gestión</option>
                                                        </select>
                                                    : null
                                                }
                                                {
                                                    this.props.formulaRiesgo.localeCompare('calidadGestión') == 0
                                                    ?   <select id="tipoIndicador" defaultValue={tipoIndicador} onChange={this.updateTipoIndicador} className="form-control">
                                                            <option value="calidadGestion">Calidad de Gestión</option>
                                                        </select>
                                                    : null
                                                }
                                                {
                                                    this.props.formulaRiesgo.localeCompare('riesgoInherente') == 0
                                                    ?   <select id="tipoIndicador" defaultValue={tipoIndicador} onChange={this.updateTipoIndicador} className="form-control">
                                                            <option value="riesgoInherente">Riesgo Inherente</option>
                                                        </select>
                                                    : null
                                                }
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                <label htmlFor="analista" className="col-form-label">Nombre Encargado</label>
                                            </div>
                                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                <input id="analista" defaultValue={nombreEncargadoIndicador} onKeyUp={this.updateNombreEncargadoIndicador} type="text" className="form-control form-control-sm"/>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                                <a className={"btn btn-secondary btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.goToCreateFormula}>Crear Fórmula</a>
                                            </div>
                                        </div>
                                        <br/>
                                        <hr/>
                                        <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <a className={"btn btn-brand btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.crearIndicador}>Crear Indicador</a>
                                        </div>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("crearFormula") == 0) {
            return (
                <div style={{width: "100%", height: "100%"}}>
                    <Formula pool={this.props.pool}
                                            anadirFormula={this.revisarTipoAnadirFormula}
                                            retornoCampo={this.retornoCampoFormula}
                                            retornoOperacion={this.retornoOperacion}
                                            actualizarNivelNuevaRegla={this.actualizarNivelNuevaRegla}
                                            navbar={this.state.navbar}>
                    </Formula>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("variableCondiciones") == 0) {
            return (
                <div style={{width: "100%", height: "100%"}}>
                    <InstruccionVariable pool={this.props.pool} retornarCampo={this.retornarCampo}
                                                campos={this.props.columnas}
                                                camposDropdown={[{valor: this.props.nombreTablaSeleccionada}]}
                                                valoresDropdown={this.props.columnas}
                                                asignaciones={this.state.formulas}
                                                callbackCrearRegla={this.anadirRegla}
                                                callbackModificarRegla={this.modificarRegla}
                                                callbackEliminarRegla={this.eliminarRegla}
                                                retornarIndiceSeleccionado={this.actualizarIndiceSeleccionadoReglas}
                                                retornarEstadoVistaEsCondicion={() => {this.actualizarCondicion}}
                                                retornoCampo={this.retornoCampoCondicion}
                                                retornarValor={this.retornarValor}
                                                retornoOperacion={this.retornoOperacion}
                                                reglas={this.state.reglas}
                                                navbar={this.state.navbar}
                                                goToCreateFormula={this.goToCreateFormulaCampo}
                                                configuracionHome={this.props.configuracionHome}
                                                goOptions={this.props.goOptions}
                                                actualizarNivelNuevaRegla={this.actualizarNivelNuevaRegla}
                                                retornoSeleccionVariables={this.props.retornoSeleccionVariables}>
                    </InstruccionVariable>
                </div>
            );
        }
    }
}
