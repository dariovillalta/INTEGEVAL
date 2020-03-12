import React from 'react';
import sql from 'mssql';

import CrearVariable from './CrearVariable.js';
import InstruccionVariable from '../../../InstruccionVariable.js';
import Formula from '../../../Formula.js';
import InstruccionSQL from '../../../InstruccionSQL.js';

var campoSeleccionado, operacionSeleccionada, objetoConexionSeleccionada;
var tipoDeAsignacionSeleccionado;   //para saber el tipo de asignacion que se debera hacer al atributo / campo

/*COMPONENTE PARA MANEJRA CAMBIO DE VISTA ENTRE CREAR VARIABLE Y VISTA DE CONDICIONES / INSTRUCIONES*/
/*MANEJA TODA LA LOGICA CREAR FUENTE DATO VARIABLE (OBJETO)*/

/*              ARREGLO DE ATRIBUTOS               */
/* CADA POSICION REPRESENTA UN CAMPO / ATRIBUTO / COLUMNA */
/*
    [ {nombre: "IDCLIENTE"}, {nombre: "NOMBRECLIENTE"} ]
*/

/*              ARREGLO DE SEGMENTO DE REGLAS               */
/* CADA POSICION REPRESENTA UNA CONDICION IF PERTENECIENTE AL ATRIBUTO CORRESPONDIENTE A LA POSICION DEL ATRIBUTO */
/*
    [ [{esConexionTabla: FALSE}, {esConexionTabla: TRUE}], [{esConexionTabla: FALSE}, {esConexionTabla: TRUE}] ]
*/

/*              ARREGLO DE REGLAS               */
/* CADA POSICION REPRESENTA UNA REGLA PERTENECIENTE AL SEGMENTO DE REGLAS CORRESPONDIENTE A LA POSICION DEL SEGMENTO DE REGLAS DENTRO DE LA POSICION DEL ATRIBUTO */
/*
    [ [[{esCondicion: FALSE}], [{esCondicion: TRUE, esCondicion: FALSE}]], [[{esCondicion: FALSE}], [{esCondicion: FALSE}]] ]
*/

/*              ARREGLO DE FORMULAS               */
/* CADA POSICION REPRESENTA UNA FORMULA PERTENECIENTE AL ATRIBUTO CORRESPONDIENTE A LA POSICION DEL ATRIBUTO */
/*
    [ [{formula: "x + y"}, {formula: "2x + 2y"}], [{formula: "3x + 3y"}] ]
*/

/*              ARREGLO DE ELEMENTOS DE FORMULAS               */
/* CADA POSICION REPRESENTA UN ELEMENTO DE FORMULA PERTENECIENTE A LA FORMULA CORRESPONDIENTE A LA POSICION DE LA FORMULA DENTRO DE LA POSICION DEL ATRIBUTO */
/*
    [ [[{formula: "sum(saldo)"}, {formula: "asig(impuesto)"}], []], [[{formula: "sum(saldo)"}], []] ]
*/

var nivelNuevoAtributoVarios = 0;                   //nivel del nuevo atributo a agregar | cambia con al seleccionar regla, o agregar variable a una formula
var nivelNuevoAtributoUnico = 0;                    //nivel del nuevo atributo a agregar | cambia con al seleccionar regla, o agregar variable a una formula
var indiceSeleccionadoReglas = -1;                  //indice seleccionado regla
var tipoElementoSeleccionadoRegla = '';             //tipo de seleccion de cursor de regla: esOtraRegla, arriba, abajo
var posicionAtributoSeleccionado = -1;              //posicion del arreglo donde se debe insertar el siguiente atributo / campo /  columna (para controlar cuando se agrega condiciones / instrucciones a un nuevo atributo)
var indiceSeleccionadoFormula = -1;                 //indice seleccionado formula

var nombreVariable = '';
var descripcionVariable = '';

var nombreCampoNuevoAtributosVario = '';
var atributosVario = [];
var reglasVariosAtributos = [];
var segmentoReglasVariosAtributos = [];
var formulasVariosAtributos = [];
var elementosFormulasVariosAtributos = [];
var atributosUnico = [];
var reglasUnAtributo = [];
var segmentoReglasUnAtributo = [];
var formulasUnAtributo = [];
var elementosFormulasUnAtributos = [];

var banderaEsObjeto = true;                                //bandera para saber si la variable actual es objeto o no a traves de las diferentes vistas / componentes

export default class CrearFuenteDatosHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componenteActual: 'crearVariable',
            atributos: [],
            reglas: [],
            formulas: [],
            esCondicion: true,                             //bandera para estado de nueva regla / instruccion, saber si es nueva comparacion o regla / instruccion = verdadero; si es falso = es nueva formula / asignacion
            navbar: ""
        }
        this.loadRules = this.loadRules.bind(this);
        this.sortRules = this.sortRules.bind(this);
        this.returnToCreateVariable = this.returnToCreateVariable.bind(this);
        this.goToCreateConditions = this.goToCreateConditions.bind(this);
        this.goToCreateConditionsClickNavBarFormula = this.goToCreateConditionsClickNavBarFormula.bind(this);
        this.goToCreateFormula = this.goToCreateFormula.bind(this);
        this.goCreateVariableFieldSQL = this.goCreateVariableFieldSQL.bind(this);
        this.createVariable = this.createVariable.bind(this);
        this.getVariableID = this.getVariableID.bind(this);
        this.createVariableField = this.createVariableField.bind(this);
        this.getVariableFieldID = this.getVariableFieldID.bind(this);
        this.createVariableFieldRuleSegments = this.createVariableFieldRuleSegments.bind(this);
        this.getVariableFieldRuleSegments = this.getVariableFieldRuleSegments.bind(this);
        this.createVariableFieldRules = this.createVariableFieldRules.bind(this);
        this.createVariableFieldFormula = this.createVariableFieldFormula.bind(this);
        this.getVariableFieldFormulaID = this.getVariableFieldFormulaID.bind(this);
        this.createVariableFieldFormulaElement = this.createVariableFieldFormulaElement.bind(this);
        this.retornarCampo = this.retornarCampo.bind(this);
        this.actualizarCondicion = this.actualizarCondicion(this);
        this.cambioDeArreglosDeAtributos = this.cambioDeArreglosDeAtributos.bind(this);
        this.guardarVariable = this.guardarVariable.bind(this);
        this.guardarVariableUnAtributo = this.guardarVariableUnAtributo.bind(this);
        this.guardarVariableVariosAtributo = this.guardarVariableVariosAtributo.bind(this);
        this.crearAtributoVariable = this.crearAtributoVariable.bind(this);
        this.anadirRegla = this.anadirRegla.bind(this);
        this.anadirFormula = this.anadirFormula.bind(this);
        this.retornoCampo = this.retornoCampo.bind(this);
        this.retornoOperacion = this.retornoOperacion.bind(this);
        this.retornoTipoDeAsignacion = this.retornoTipoDeAsignacion.bind(this);
        this.actualizarIndiceSeleccionadoReglas = this.actualizarIndiceSeleccionadoReglas.bind(this);
        this.actualizarNivelNuevaRegla = this.actualizarNivelNuevaRegla.bind(this);
        this.actualizarNombreVariable = this.actualizarNombreVariable.bind(this);
        this.actualizarDescripcionVariable = this.actualizarDescripcionVariable.bind(this);
        this.actualizarNombreCampoNuevoAtributosVario = this.actualizarNombreCampoNuevoAtributosVario.bind(this);
        this.retornarCodigoOperacion = this.retornarCodigoOperacion.bind(this);
    }

    componentDidMount () {
    }

    loadRules() {
        //FINISH
        this.sortRules();
    }

    sortRules() {
        var tempCopy = [...this.state.reglas];
        for (var i = 0; i < tempCopy.length; i++) {
            tempCopy[i]
        };
    }

    returnToCreateVariable () {
        this.setState({
            componenteActual: "crearVariable"
        });
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
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goOptions}><a href="#" className={"breadcrumb-link"}>Tipo de Configuraci&oacute;n</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionVariables}><a href="#" className={"breadcrumb-link"}>Variables</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.returnToCreateVariable}><a href="#" className={"breadcrumb-link"}>Crear Variable</a></li>
                                <li className={"breadcrumb-item active font-16"} aria-current="page">Condiciones</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>;
        posicionAtributoSeleccionado = indice;
        //tipoElementoSeleccionado = tipoIndice;
        var formulas, reglas;
        var posicionSel = posicionAtributoSeleccionado;
        //indice = -1 cuando se va a condiciones de un campo nuevo
        //cuando se presiona NavBar indice es igual indice anterior
        //cuando se selecciona un campo existente indice = posicion campo
        if(posicionAtributoSeleccionado == -1) {
            posicionSel = this.state.atributos.length;
        }
        if(banderaEsObjeto) {
            formulas = formulasVariosAtributos;
            reglas = reglasVariosAtributos;
        } else {
            formulas = formulasUnAtributo;
            reglas = reglasUnAtributo;
        }
        console.log('posicionSel');
        console.log(posicionSel);
        console.log('formulas[posicionSel]');
        console.log(formulas[posicionSel]);
        console.log('reglas[posicionSel]');
        console.log(reglas[posicionSel]);
        console.log('formulas');
        console.log(formulas);
        console.log('reglas');
        console.log(reglas);
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

    goToCreateFormula (indice) {
        var navbar = <div className={"row"}>
            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                <div className={"page-header"}>
                    <h2 className={"pageheader-title"}>Condiciones</h2>
                    <div className={"page-breadcrumb"}>
                        <nav aria-label="breadcrumb">
                            <ol className={"breadcrumb"}>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goOptions}><a href="#" className={"breadcrumb-link"}>Tipo de Configuraci&oacute;n</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionVariables}><a href="#" className={"breadcrumb-link"}>Variables</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.returnToCreateVariable}><a href="#" className={"breadcrumb-link"}>Crear Variable</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.goToCreateConditionsClickNavBarFormula}><a href="#" className={"breadcrumb-link"}>Condiciones</a></li>
                                <li className={"breadcrumb-item active font-16"} aria-current="page">Crear F&oacute;rmula</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>;
        indiceSeleccionadoFormula = indice;
        this.setState({
            componenteActual: "variableFormula",
            navbar: navbar
        });
    }

    goCreateVariableFieldSQL () {
        var navbar = <div className={"row"}>
            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                <div className={"page-header"}>
                    <h2 className={"pageheader-title"}>Condiciones</h2>
                    <div className={"page-breadcrumb"}>
                        <nav aria-label="breadcrumb">
                            <ol className={"breadcrumb"}>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goOptions}><a href="#" className={"breadcrumb-link"}>Tipo de Configuraci&oacute;n</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionVariables}><a href="#" className={"breadcrumb-link"}>Variables</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.returnToCreateVariable}><a href="#" className={"breadcrumb-link"}>Crear Variable</a></li>
                                <li className={"breadcrumb-item active font-16"} aria-current="page">Instrucción SQL</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>;
        this.setState({
            navbar: navbar,
            componenteActual: "variableSQL"
        });
    }

    createVariable (variable, campos) {
        //validaciones existe por lo menos regla asignar
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into Variables (nombre, descripcion, esObjeto, objetoPadreID, guardar) values ('"+variable.nombre+"', '"+variable.descripcion+"', '"+variable.esObjeto+"', "+variable.objetoPadreID+", '"+variable.guardar+"')", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        alert("variable creada.");
                        this.getVariableID(variable, campos);
                    });
                }
            });
        }); // fin transaction
    }

    getVariableID (variable, campos) {
        //validaciones existe por lo menos regla asignar
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Variables where nombre = '"+variable.nombre+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            for (var i = 0; i < campos.length; i++) {
                                this.createVariableField(result.recordset[0], campos[i], i);
                            };
                        }
                    });
                }
            });
        }); // fin transaction
    }

    createVariableField (variable, variableCampo, posicionAtributo) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into VariablesCampos (variableID, nombre, tipo, nivel) values ("+variable.ID+", '"+variableCampo.nombre+"', '"+variableCampo.tipo+"', "+variableCampo.nivel+")", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        //this.props.terminoCrearCampo(variable, variableCampo);
                        this.getVariableFieldID(variable, variableCampo, posicionAtributo);
                    });
                }
            });
        }); // fin transaction
    }

    getVariableFieldID (variable, variableCampo, posicionAtributo) {
        //validaciones existe por lo menos regla asignar
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from VariablesCampos where nombre = '"+variableCampo.nombre+"' and variableID = "+variable.ID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var posicionSel = posicionAtributoSeleccionado;
                        //si fue llamado de crear atributo
                        if(posicionAtributoSeleccionado == -1) {
                            posicionSel = this.state.atributos.length;
                        }
                        var esObjeto;
                        if ($("#esObjetoFuenteDato").is(':checked'))
                            esObjeto = true;
                        else
                            esObjeto = false;
                        var formulas, segmentoRegla;
                        if (esObjeto) {
                            formulas = formulasVariosAtributos;
                            segmentoRegla = segmentoReglasVariosAtributos;
                        } else {
                            formulas = formulasUnAtributo;
                            segmentoRegla = segmentoReglasUnAtributo;
                        }
                        for (var j = 0; j < formulas[posicionAtributo].length; j++) {
                            formulas[posicionAtributo][j].posicionFormulaEnCampo = j;
                            this.createVariableFieldFormula(variable, result.recordset[0], formulas[posicionAtributo][j], posicionAtributo, j);
                        };
                        if(formulas[posicionAtributo].length == 0) {
                            for (var j = 0; j < segmentoRegla[posicionAtributo].length; j++) {
                                segmentoRegla[posicionAtributo][j].posicionSegmentoEnCampo = j;
                                this.createVariableFieldRuleSegments(variable, result.recordset[0], segmentoRegla[posicionAtributo][j], posicionAtributo, j);
                            };
                        }
                    });
                }
            });
        }); // fin transaction
    }

    createVariableFieldRuleSegments (variable, variableCampo, segmento, posicionAtributo, posicionSegmento, formula) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into SegmentoReglas (conexionTablaID, variableID, variableCampoID, esConexionTabla, posicionSegmentoEnCampo, nivelMax) values ("+segmento.conexionTablaID+", "+variable.ID+", "+variableCampo.ID+", '"+segmento.esConexionTabla+"', "+posicionSegmento+", "+segmento.nivelMax+")", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.getVariableFieldRuleSegments(variable, variableCampo, segmento, posicionAtributo, posicionSegmento, formula);
                    });
                }
            });
        }); // fin transaction
    }

    getVariableFieldRuleSegments (variable, variableCampo, segmento, posicionAtributo, posicionSegmento, formula) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from SegmentoReglas where conexionTablaID = "+segmento.conexionTablaID+" and variableID = "+variable.ID+" and variableCampoID = "+variableCampo.ID+" and esConexionTabla = '"+segmento.esConexionTabla+"' and posicionSegmentoEnCampo = "+posicionSegmento+" and nivelMax = "+segmento.nivelMax, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log('resultado FormulasVariablesCampos')
                        console.log(result.recordset)
                        if (result.recordset.length > 0) {
                            var reglas;
                            if (banderaEsObjeto) {
                                reglas = reglasVariosAtributos;
                            } else {
                                reglas = reglasUnAtributo;
                            }
                            for (var k = 0; k < reglas[posicionAtributo][posicionSegmento].length; k++) {
                                reglas[posicionAtributo][posicionSegmento][k].segmentoReglaID = result.recordset[0].ID;
                                //crear reglas que sean de comparacion (esCondicion = verdadero)
                                if(reglas[posicionAtributo][posicionSegmento][k].esCondicion) {
                                    this.createVariableFieldRules(variable, variableCampo, result.recordset[0], reglas[posicionAtributo][posicionSegmento][k]);
                                } else if(!reglas[posicionAtributo][posicionSegmento][k].esCondicion) {
                                    //crear reglas que sean de asignacion (esCondicion = falso) con el id de formula correcto
                                    reglas[posicionAtributo][posicionSegmento][k].formulaID = formula.ID;
                                    this.createVariableFieldRules(variable, variableCampo, result.recordset[0], reglas[posicionAtributo][posicionSegmento][k]);
                                }
                            };
                        }
                    });
                }
            });
        }); // fin transaction
    }

    createVariableFieldRules (variable, variableCampo, segmento, regla) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into Reglas (segmentoReglaID, variableID, variableCampoID, formulaID, reglaPadreID, conexionTablaID, nombreColumnaEnTabla, esCondicion, operacion, operacionTexto, valor, texto, nivel) values ("+segmento.ID+", "+variable.ID+", "+variableCampo.ID+", "+regla.formulaID+", "+regla.reglaPadreID+", "+regla.conexionTablaID+", '"+regla.nombreColumnaEnTabla+"', '"+regla.esCondicion+"', '"+regla.operacion+"', '"+regla.operacionTexto+"', '"+regla.valor+"', '"+regla.texto+"', "+regla.nivel+")", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                    });
                }
            });
        }); // fin transaction
    }

    createVariableFieldFormula (variable, variableCampo, formula, posicionAtributo, posicionFormula) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into FormulasVariablesCampos (variableID, variableCampoID, formula, posicionFormulaEnCampo) values ("+variable.ID+", "+variableCampo.ID+", '"+formula.formula+"', "+posicionFormula+")", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.getVariableFieldFormulaID(variable, variableCampo, formula, posicionAtributo, posicionFormula);
                    });
                }
            });
        }); // fin transaction
    }

    getVariableFieldFormulaID (variable, variableCampo, formula, posicionAtributo, posicionFormula) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from FormulasVariablesCampos where variableID = "+variable.ID+" and variableCampoID = "+variableCampo.ID+" and posicionFormulaEnCampo = "+posicionFormula, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            var elementosFormulas, segmentoRegla;
                            if (banderaEsObjeto) {
                                elementosFormulas = elementosFormulasVariosAtributos;
                                segmentoRegla = segmentoReglasVariosAtributos;
                            } else {
                                elementosFormulas = elementosFormulasUnAtributos;
                                segmentoRegla = segmentoReglasUnAtributo;
                            }
                            for (var i = 0; i < elementosFormulas[posicionAtributo][posicionFormula].length; i++) {
                                this.createVariableFieldFormulaElement(variable, variableCampo, result.recordset[0], elementosFormulas[posicionAtributo][posicionFormula][i]);
                            };
                            //validar que solo sea llamado la primera vez por cada atributo
                            if(posicionFormula == 0) {
                                for (var j = 0; j < segmentoRegla[posicionAtributo].length; j++) {
                                    segmentoRegla[posicionAtributo][j].posicionSegmentoEnCampo = j;
                                    this.createVariableFieldRuleSegments(variable, variableCampo, segmentoRegla[posicionAtributo][j], posicionAtributo, j, result.recordset[0]);
                                };
                            }
                        }
                    });
                }
            });
        }); // fin transaction
    }

    createVariableFieldFormulaElement (variable, variableCampo, formula, elemento) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into ElementoFormulasVariablesCampos (variableID, variableCampoID, formulaID, conexionTablaID, nombreColumnaEnTabla, tipoColumnaEnTabla, nombreVariable, descripcion, operacion) values ("+variable.ID+", "+variableCampo.ID+", "+formula.ID+", "+elemento.idConexionTabla+", '"+elemento.nombreColumnaEnTabla+"', '"+elemento.tipoColumnaEnTabla+"', '"+elemento.nombreVariable+"', '"+elemento.descripcion+"', '"+elemento.operacion+"')", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                    });
                }
            });
        }); // fin transaction
    }

    retornarCampo (campoNuevo) {
        campoSeleccionado = campoNuevo;
    }

    actualizarCondicion (esCondicion) {
        this.setState({
            esCondicion: esCondicion
        });
    }

    cambioDeArreglosDeAtributos () {
        var esObjeto;
        if ($("#esObjetoFuenteDato").is(':checked'))
            esObjeto = true;
        else
            esObjeto = false;
        if (esObjeto) {
            this.setState({
                atributos: atributosVario
            });
        } else {
            this.setState({
                atributos: atributosUnico
            });
        }
    }

    guardarVariable() {
        if (!banderaEsObjeto) {
            this.guardarVariableUnAtributo();
        } else {
            this.guardarVariableVariosAtributo();
        }
    }

    guardarVariableUnAtributo () {
        var nombreVariable = $("#nombreFuenteDato").val();
        var descripcionVariable = $("#descripcionFuenteDato").val();
        var esObjeto;
        if ($("#esObjetoFuenteDato").is(':checked'))
            esObjeto = true;
        else
            esObjeto = false;
        var guardarResultadosEnBaseDatos;
        if ($("#guardarFuenteDato").is(':checked'))
            guardarResultadosEnBaseDatos = true;
        else
            guardarResultadosEnBaseDatos = false;
        var objetoPadreID = -1;
        if ($("#esObjetoFuenteDato").is(':checked'))
            objetoPadreID = $("#objetoPadreID").val();
        var nuevoNivel = 0;
        if(banderaEsObjeto) {
            nuevoNivel = nivelNuevoAtributoVarios;
        } else {
            nuevoNivel = nivelNuevoAtributoUnico;
        }
        if(nombreVariable.length < 101 && nombreVariable.length > 0) {
            if(descripcionVariable.length < 701) {      //if(operacionSeleccionada.valor != undefined) {
                if(esObjeto != undefined) {
                    if(guardarResultadosEnBaseDatos != undefined) {
                        if(!isNaN(objetoPadreID)) {
                            if(tipoDeAsignacionSeleccionado != undefined && tipoDeAsignacionSeleccionado.length > 0) {
                                if(!isNaN(nuevoNivel)) {
                                    var nuevoAtributo = {nombre: nombreVariable, tipo: tipoDeAsignacionSeleccionado, nivel: nuevoNivel};
                                    //si la formula ya fue asignada, no agregar tipo
                                    /*if(atributosUnico[0].tipo == undefined) {
                                        nuevoAtributo = {nombre: nombreVariable, tipo: '', campoEsArreglo: campoEsArreglo,  nivel: nivelNuevoAtributoUnico};
                                    } else {
                                        nuevoAtributo = atributosUnico[0];
                                        nuevoAtributo.nombre = nombreVariable;
                                        nuevoAtributo.campoEsArreglo = campoEsArreglo;
                                        nuevoAtributo.nivel = nivelNuevoAtributoUnico;
                                    }*/
                                    var nuevaVariable = {nombre: nombreVariable, descripcion: descripcionVariable, esObjeto: esObjeto, objetoPadreID: objetoPadreID, guardar: guardarResultadosEnBaseDatos};
                                    this.createVariable(nuevaVariable, [nuevoAtributo]);
                                } else {
                                    alert("Seleccione un nivel para el campo.");
                                }
                            } else {
                                alert("Seleccione un tipo de asignación.");
                            }
                        } else {
                            alert("Tiene que ingresar un valor para objeto padre.");
                        }
                    } else {
                        alert("Tiene que ingresar si guardar o no variable.");
                    }
                } else {
                    alert("Tiene que ingresar si la variable tiene un atributo o muchos.");
                }
            } else {
                alert("Tiene que ingresar una descripción de la variable menor a 701 caracteres.");
            }
        } else {
            alert("Tiene que ingresar un nombre de la variable.");
        }
    }

    guardarVariableVariosAtributo () {
        var nombreVariable = $("#nombreFuenteDato").val();
        var descripcionVariable = $("#descripcionFuenteDato").val();
        var esObjeto;
        if ($("#esObjetoFuenteDato").is(':checked'))
            esObjeto = true;
        else
            esObjeto = false;
        var guardarResultadosEnBaseDatos;
        if ($("#guardarFuenteDato").is(':checked'))
            guardarResultadosEnBaseDatos = true;
        else
            guardarResultadosEnBaseDatos = false;
        var objetoPadreID = -1;
        if ($("#esObjetoFuenteDato").is(':checked'))
            objetoPadreID = $("#objetoPadreID").val();
        var nuevoNivel = 0;
        if(banderaEsObjeto) {
            nuevoNivel = nivelNuevoAtributoVarios;
        } else {
            nuevoNivel = nivelNuevoAtributoUnico;
        }
        if(nombreVariable.length < 101 && nombreVariable.length > 0) {
            if(descripcionVariable.length < 701) {      //if(operacionSeleccionada.valor != undefined) {
                if(esObjeto != undefined) {
                    if(guardarResultadosEnBaseDatos != undefined) {
                        if(!isNaN(objetoPadreID)) {
                            if(tipoDeAsignacionSeleccionado != undefined && tipoDeAsignacionSeleccionado.length > 0) {
                                if(!isNaN(nuevoNivel)) {
                                    var nuevoAtributo = {nombre: nombreVariable, tipo: tipoDeAsignacionSeleccionado, nivel: nuevoNivel};
                                    //si la formula ya fue asignada, no agregar tipo
                                    /*if(atributosUnico[0].tipo == undefined) {
                                        nuevoAtributo = {nombre: nombreVariable, tipo: '', campoEsArreglo: campoEsArreglo,  nivel: nivelNuevoAtributoUnico};
                                    } else {
                                        nuevoAtributo = atributosUnico[0];
                                        nuevoAtributo.nombre = nombreVariable;
                                        nuevoAtributo.campoEsArreglo = campoEsArreglo;
                                        nuevoAtributo.nivel = nivelNuevoAtributoUnico;
                                    }*/
                                    var nuevaVariable = {nombre: nombreVariable, descripcion: descripcionVariable, esObjeto: esObjeto, objetoPadreID: objetoPadreID, guardar: guardarResultadosEnBaseDatos};
                                    this.createVariable(nuevaVariable, atributosVario);
                                } else {
                                    alert("Seleccione un nivel para el campo.");
                                }
                            } else {
                                alert("Seleccione un tipo de asignación.");
                            }
                        } else {
                            alert("Tiene que ingresar un valor para objeto padre.");
                        }
                    } else {
                        alert("Tiene que ingresar si guardar o no variable.");
                    }
                } else {
                    alert("Tiene que ingresar si la variable tiene un atributo o muchos.");
                }
            } else {
                alert("Tiene que ingresar una descripción de la variable menor a 701 caracteres.");
            }
        } else {
            alert("Tiene que ingresar un nombre de la variable.");
        }
    }

    crearAtributoVariable () {              //agrega valor a arreglo, pero no guarda en base de datos
        var nombreAtributo = $("#nombreAtributoNuevoCampo").val();
        if(nombreAtributo.length > 0) {
            if(tipoDeAsignacionSeleccionado != undefined && tipoDeAsignacionSeleccionado.length > 0) {
                //seleccionar arreglo a insertar, si de varios atributos o unico
                var arreglo, nivel;
                if(banderaEsObjeto) {
                    arreglo = atributosVario;
                    nivel = nivelNuevoAtributoVarios
                } else {
                    arreglo = atributosUnico;
                    nivel = nivelNuevoAtributoUnico
                }
                var nuevoAtributo = {nombre: nombreAtributo, tipo: tipoDeAsignacionSeleccionado, nivel: nivel};
                //si la formula ya fue asignada, no agregar tipo
                /*if(this.state.atributos[this.state.posicionNuevoAtributo].nombre == undefined) {
                    nuevoAtributo = {nombre: nombreAtributo, tipo: tipoDeAsignacionSeleccionado, campoEsArreglo: campoEsArreglo};
                } else {
                    nuevoAtributo = this.state.atributos[this.state.posicionNuevoAtributo];
                    nuevoAtributo.nombre = nombreAtributo;
                    nuevoAtributo.campoEsArreglo = campoEsArreglo;
                }*/
                arreglo.push(nuevoAtributo);
                this.setState({
                    atributos: arreglo
                });
                if(banderaEsObjeto) {
                    atributosVario = arreglo;
                } else {
                    atributosUnico = arreglo;
                }
                nombreCampoNuevoAtributosVario = '';
                $("#nombreAtributoNuevoCampo").val("");
            } else {
                alert("Seleccione un tipo de asignación.");
            }
        } else {
            alert("Ingrese un valor para el nombre del atributo.");
        }
    }

    anadirRegla (esFormula) {
        //si se agrega una formula/asignacion, todas las otras formulas tienen que ser del mismo tipo para esa variable
        //si el indiceSeleccionado es igual a -1, se llamo desde nuevo atributo
        //sino, modificar elemento seleccionado
        //primer if: ver el estado de donde fue llamado el metodo
        //campoSeleccionado, operacionSeleccionada, objetoConexionSeleccionada

        //indiceSeleccionadoReglas
        //tipoElementoSeleccionadoRegla
        console.log('indiceSeleccionadoReglas');
        console.log(indiceSeleccionadoReglas);
        console.log('tipoElementoSeleccionadoRegla');
        console.log(tipoElementoSeleccionadoRegla);
        if(!esFormula) {
            var valor = $("#valor").val();
            var posicionSel = posicionAtributoSeleccionado;
            //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
            //cuando se presiona NavBar indice es igual indice anterior
            //cuando se selecciona un campo existente indice = posicion campo
            if(posicionAtributoSeleccionado == -1) {
                posicionSel = this.state.atributos.length;
            }
            var reglas;
            if (banderaEsObjeto) {
                reglas = reglasVariosAtributos;
            } else {
                reglas = reglasUnAtributo;
            }
            if(reglas[posicionSel] == undefined) {
                [];
            }
            var nuevoNivel = 0;
            var segmentoRegla;
            if(banderaEsObjeto) {
                nuevoNivel = nivelNuevoAtributoVarios;
                segmentoRegla = segmentoReglasVariosAtributos;
            } else {
                nuevoNivel = nivelNuevoAtributoUnico;
                segmentoRegla = segmentoReglasUnAtributo;
            }
            if(segmentoRegla.length == undefined)
                segmentoRegla = [];
            if(segmentoRegla[posicionSel] == undefined)
                segmentoRegla[posicionSel] = [];
            var conexionTablaID = -1, variableID = -1, variableCampoID = -1, esConexionTabla = false, nivelMax = 1, nombreColumnaEnTabla = '';
            if(campoSeleccionado.tablaID != undefined) {
                conexionTablaID = campoSeleccionado.tablaID;
                esConexionTabla = true;
                nombreColumnaEnTabla = campoSeleccionado.valor;
            } else {
                variableID = campoSeleccionado.variableID;
                variableCampoID = campoSeleccionado.ID;
            }
            var posicionInsertarReglaAtributo = 0, posicionInsertarReglaSegmento = 0;
            if(tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0 || (indiceSeleccionadoReglas == -1 && tipoElementoSeleccionadoRegla.length == 0)) {
                var segmentoReglaIndex = 0;
                if(segmentoRegla[posicionSel].length > 0) {
                    segmentoReglaIndex = segmentoRegla[posicionSel].length;
                }
                segmentoRegla[posicionSel].push({conexionTablaID: conexionTablaID, variableID: variableID, variableCampoID: variableCampoID, esConexionTabla: esConexionTabla, nivelMax: nivelMax, segmentoReglaIndex: segmentoReglaIndex});
                posicionInsertarReglaAtributo = posicionSel;
                posicionInsertarReglaSegmento = segmentoRegla[posicionSel].length-1;
            } else {
                console.log('segmentoRegla');
                console.log(segmentoRegla);
                console.log('posicionSel');
                console.log(posicionSel);
                console.log('reglas');
                console.log(reglas);
                console.log('indiceSeleccionadoReglas');
                console.log(indiceSeleccionadoReglas);
                segmentoRegla[posicionSel][reglas[posicionSel][indiceSeleccionadoReglas].segmentoReglaID].nivelMax++;
                posicionInsertarReglaAtributo = posicionSel;
                posicionInsertarReglaSegmento = reglas[posicionSel][indiceSeleccionadoReglas].segmentoReglaID;
                /*if(tipoElementoSeleccionadoRegla.localeCompare("arriba") == 0) {
                    segmentoRegla[posicionSel].push({conexionTablaID: conexionTablaID, variableID: variableID, variableCampoID: variableCampoID, esConexionTabla: esConexionTabla, nivelMax: });
                } else {
                    segmentoRegla[posicionSel].nivelMax++;
                }*/
            }
            if(reglas[posicionInsertarReglaAtributo] == undefined) {
                reglas[posicionInsertarReglaAtributo] = [];
            }
            if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] == undefined) {
                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] = [];
            }
            var esCondicion = !esFormula;
            var segmentoReglaIndex = 0;
            if(indiceSeleccionadoReglas != -1 && reglas[indiceSeleccionadoReglas].segmentoReglaIndex != undefined)
                segmentoReglaIndex = reglas[indiceSeleccionadoReglas].segmentoReglaIndex;
            var nuevaRegla = {
                                segmentoReglaID: segmentoReglaIndex,
                                conexionTablaID: conexionTablaID,
                                nombreColumnaEnTabla: nombreColumnaEnTabla,
                                formulaID: -1,
                                variableID: -1,
                                variableCampoID: -1,
                                reglaPadreID: -1,
                                esCondicion: esCondicion,
                                esConexionTabla: esConexionTabla,
                                operacion: operacionSeleccionada.operacion,
                                operacionTexto: operacionSeleccionada.operacionTexto,
                                valor: valor,
                                texto: campoSeleccionado.valor+" "+operacionSeleccionada.operacionTexto+" "+valor,
                                nivel: nuevoNivel
                            };
            //if(indiceSeleccionadoReglas == -1 && tipoElementoSeleccionadoRegla.length == 0) {
            if(this.state.reglas.length == 0) {
                //cuando no existe regla creada para el campo
                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
            } else {
                //el campo ya tiene una regla o mas creada

                if(tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#siRADIO").is(':checked') ) {
                    //se seleciona el indice de la posicion de la regla dentro del arreglo, para que despues se pueda sacar el ID a base de la posicion
                    //se pone de regla padre a la regla seleccionada
                    nuevaRegla.reglaPadreID = indiceSeleccionadoReglas;
                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas+1, 0, nuevaRegla);
                } else if(tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#sinoRADIO").is(':checked') ) {
                    //se seleciona el indice de la posicion de la regla dentro del arreglo, para que despues se pueda sacar el ID a base de la posicion
                    //se pone de regla padre a la regla padre de la regla seleccionada
                    nuevaRegla.reglaPadreID = reglas[indiceSeleccionadoReglas].reglaPadreID;
                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas+1, 0, nuevaRegla);
                } else if(tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas+1, 0, nuevaRegla);
                }
                //la condicion es anidada, o sea dentro de la condicion padre
            }
            if (banderaEsObjeto) {
                reglasVariosAtributos = reglas;
                segmentoReglasVariosAtributos = segmentoRegla;
            } else {
                reglasUnAtributo = reglas;
                segmentoReglasUnAtributo = segmentoRegla;
            }
            this.setState({
                reglas: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]
            });
            //reglas[posicionSel].push(nuevaRegla);
            console.log('reglas');
            console.log(reglas);
            console.log('segmentoRegla');
            console.log(segmentoRegla);
        } else {
            var posicionSel = posicionAtributoSeleccionado;
            //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
            //cuando se presiona NavBar indice es igual indice anterior
            //cuando se selecciona un campo existente indice = posicion campo
            if(posicionAtributoSeleccionado == -1) {
                posicionSel = this.state.atributos.length;
            }
            var reglas;
            if (banderaEsObjeto) {
                reglas = reglasVariosAtributos;
            } else {
                reglas = reglasUnAtributo;
            }
            var nuevoNivel = 0;
            var segmentoRegla;
            if(banderaEsObjeto) {
                nuevoNivel = nivelNuevoAtributoVarios;
                segmentoRegla = segmentoReglasVariosAtributos;
            } else {
                nuevoNivel = nivelNuevoAtributoUnico;
                segmentoRegla = segmentoReglasUnAtributo;
            }
            if(segmentoRegla.length == undefined)
                segmentoRegla = [];
            if(segmentoRegla[posicionSel] == undefined)
                segmentoRegla[posicionSel] = [];
            var conexionTablaID = -1, variableID = -1, variableCampoID = -1, esConexionTabla = false, nivelMax = 1;
            var posicionInsertarReglaAtributo = 0, posicionInsertarReglaSegmento = 0;
            if(campoSeleccionado.idConexionTabla != undefined) {
                conexionTablaID = campoSeleccionado.idConexionTabla;
                esConexionTabla = true;
            } else {
                variableID = campoSeleccionado.variableID;
                variableCampoID = campoSeleccionado.ID;
            }
            if(tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0 || (indiceSeleccionadoReglas == -1 && tipoElementoSeleccionadoRegla.length == 0)) {
                var segmentoReglaIndex = 0;
                if(segmentoRegla[posicionSel].length > 0) {
                    segmentoReglaIndex = segmentoRegla[posicionSel].length;
                }
                segmentoRegla[posicionSel].push({conexionTablaID: conexionTablaID, variableID: variableID, variableCampoID: variableCampoID, esConexionTabla: esConexionTabla, nivelMax: nivelMax, segmentoReglaIndex: segmentoReglaIndex});
                posicionInsertarReglaAtributo = posicionSel;
                posicionInsertarReglaSegmento = segmentoRegla[posicionSel].length-1;
            } else {
                segmentoRegla[posicionSel][reglas[posicionSel][indiceSeleccionadoReglas].segmentoReglaID].nivelMax++;
                posicionInsertarReglaAtributo = posicionSel;
                posicionInsertarReglaSegmento = reglas[posicionSel][indiceSeleccionadoReglas].segmentoReglaID;
                /*if(tipoElementoSeleccionadoRegla.localeCompare("arriba") == 0) {
                    segmentoRegla[posicionSel].push({conexionTablaID: conexionTablaID, variableID: variableID, variableCampoID: variableCampoID, esConexionTabla: esConexionTabla, nivelMax: });
                } else {
                    segmentoRegla[posicionSel].nivelMax++;
                }*/
            }
            if(reglas[posicionInsertarReglaAtributo] == undefined) {
                reglas[posicionInsertarReglaAtributo] = [];
            }
            if(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] == undefined) {
                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] = [];
            }
            var esCondicion = !esFormula;
            var segmentoReglaIndex = 0;
            if(indiceSeleccionadoReglas != -1 && reglas[indiceSeleccionadoReglas].segmentoReglaIndex != undefined)
                segmentoReglaIndex = reglas[indiceSeleccionadoReglas].segmentoReglaIndex;
            var nuevaRegla = {
                                segmentoReglaID: segmentoReglaIndex,
                                conexionTablaID: conexionTablaID,
                                nombreColumnaEnTabla: '',
                                formulaID: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length,
                                variableID: -1,
                                variableCampoID: -1,
                                reglaPadreID: -1,
                                esCondicion: esCondicion,
                                esConexionTabla: esConexionTabla,
                                operacion: campoSeleccionado.operacion,
                                operacionTexto: this.retornarCodigoOperacion(campoSeleccionado.operacion),
                                valor: campoSeleccionado.operacion,
                                texto: "ASIGNACIÓN "+campoSeleccionado.valor,
                                nivel: nuevoNivel
                            };
            console.log('this.state.reglas');
            console.log(this.state.reglas);
            console.log(this.state.reglas.length);
            console.log('reglas');
            console.log(reglas);
            console.log('posicionInsertarReglaAtributo');
            console.log(posicionInsertarReglaAtributo);
            console.log('posicionInsertarReglaSegmento');
            console.log(posicionInsertarReglaSegmento);
            console.log('campoSeleccionado')
            console.log(campoSeleccionado)
            if(reglas.length == 0 || reglas[posicionInsertarReglaAtributo].length == 0 || reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length == 0) {
                //cuando no existe regla creada para el campo
                console.log('1');
                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
            } else {
                console.log('2');
                //el campo ya tiene una regla o mas creada

                if(tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#siRADIO").is(':checked') ) {
                    //se seleciona el indice de la posicion de la regla dentro del arreglo, para que despues se pueda sacar el ID a base de la posicion
                    //se pone de regla padre a la regla seleccionada
                    nuevaRegla.reglaPadreID = indiceSeleccionadoReglas;
                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas+1, 0, nuevaRegla);
                    console.log('2.1');
                } else if(tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#sinoRADIO").is(':checked') ) {
                    //se seleciona el indice de la posicion de la regla dentro del arreglo, para que despues se pueda sacar el ID a base de la posicion
                    //se pone de regla padre a la regla padre de la regla seleccionada
                    nuevaRegla.reglaPadreID = reglas[indiceSeleccionadoReglas].reglaPadreID;
                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas+1, 0, nuevaRegla);
                    console.log('2.2');
                } else if(tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas+1, 0, nuevaRegla);
                    console.log('2.3');
                }
                //la condicion es anidada, o sea dentro de la condicion padre
            }
            console.log('ANTES');
            console.log('reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]');
            console.log(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]);
            var tempNewCopy = [...reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]];
            this.setState({
                reglas: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]
            }, console.log(this.state.reglas) );
            console.log('reglas');
            console.log(reglas);
            console.log('reglasVariosAtributos');
            console.log(reglasVariosAtributos);
            console.log('segmentoReglasVariosAtributos');
            console.log(segmentoReglasVariosAtributos);
            console.log('reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]');
            console.log(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]);
            var self = this;
            setTimeout(function(){
                console.log(self.state.reglas)
            }, 2000);
            if (banderaEsObjeto) {
                reglasVariosAtributos = reglas;
                segmentoReglasVariosAtributos = segmentoRegla;
            } else {
                reglasUnAtributo = reglas;
                segmentoReglasUnAtributo = segmentoRegla;
            }
        }
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
        console.log('formula');
        console.log(formula);
        console.log('formulaArreglo');
        console.log(formulaArreglo);
        console.log('posicionSel');
        console.log(posicionSel);
        //copia antigua formulas
        var elementosFormulas, copiaAntiguaFormulas;
        if(banderaEsObjeto) {
            copiaAntiguaFormulas = formulasVariosAtributos;
            elementosFormulas = elementosFormulasVariosAtributos;
        } else {
            copiaAntiguaFormulas = formulasUnAtributo;
            elementosFormulas = elementosFormulasUnAtributos;
        }
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
        for (var i = 0; i < formulaArreglo.length; i++) {
            if(formulaArreglo[i].tipo.localeCompare("variable") == 0 && formulaArreglo[i].esFuenteDato) {
                elementosFormulas[posicionSel][posicionFormulaEnCampo].push({
                    idConexionTabla: formulaArreglo[i].idConexionTabla,
                    nombreColumnaEnTabla: formulaArreglo[i].valor,
                    tipoColumnaEnTabla: tipoDeAsignacionSeleccionado,
                    nombreVariable: formulaArreglo[i].valor,
                    descripcion: '',
                    operacion: formulaArreglo[i].operacion
                });
            }
        };
        if(banderaEsObjeto) {
            formulasVariosAtributos = copiaAntiguaFormulas;
            elementosFormulasVariosAtributos = elementosFormulas;
        } else {
            formulasUnAtributo = copiaAntiguaFormulas;
            elementosFormulasUnAtributos = elementosFormulas;
        }
        console.log('elementosFormulas');
        console.log(elementosFormulas);
        console.log('copiaAntiguaFormulas[posicionSel]');
        console.log(copiaAntiguaFormulas[posicionSel]);
        console.log('copiaAntiguaFormulas');
        console.log(copiaAntiguaFormulas);
        console.log('posicionSel');
        console.log(posicionSel);
        console.log('posicionFormulaEnCampo');
        console.log(posicionFormulaEnCampo);
        var self = this;
        setTimeout(function(){
            console.log(self.state.formulas)
        }, 2000);
    }

    retornoCampo (campo, tipoVariable, objetoConexion) {
        campoSeleccionado = campo;
        //tipoDeAsignacionSeleccionado = tipoVariable;
        objetoConexionSeleccionada = objetoConexion;
    }

    retornoOperacion (operacion) {
        operacionSeleccionada = operacion;
    }

    retornoTipoDeAsignacion (tipoDeAsignacion) {
        tipoDeAsignacionSeleccionado = tipoDeAsignacion;
    }

    actualizarIndiceSeleccionadoReglas(indice, tipoElemento) {
        //indice = indice de regla dentro de arreglo de reglas
        //tipoElemento = si la seleccion en el contenedor de reglas es cursor arriba, cursor abajo, y otra regla o otra formula
        indiceSeleccionadoReglas = indice;
        tipoElementoSeleccionadoRegla = tipoElemento;
    }

    actualizarEstadoSiEsObjeto (esObjeto) {
        banderaEsObjeto = esObjeto;
    }

    actualizarNivelNuevaRegla (nivel) {
        if(banderaEsObjeto) {
            nivelNuevoAtributoVarios = nivel;
        } else {
            nivelNuevoAtributoUnico = nivel;
        }
    }

    actualizarNombreVariable () {
        var nombreVariableN = $("#nombreFuenteDato").val();
        nombreVariable = nombreVariableN;
    }

    actualizarDescripcionVariable () {
        var descripcionVariableN = $("#descripcionFuenteDato").val();
        descripcionVariable = descripcionVariableN;
    }

    actualizarNombreCampoNuevoAtributosVario () {
        var nombreCampo = $("#nombreAtributoNuevoCampo").val();
        nombreCampoNuevoAtributosVario = nombreCampo;
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
    }
    
    render() {
        if(this.state.componenteActual.localeCompare("crearVariable") == 0) {
            return (
                <div style={{width: "100%", height: "100%"}}>
                    <CrearVariable pool={this.props.pool}
                                                terminoCrearCampo={this.props.terminoCrearCampo}
                                                columnas={this.props.columnas}
                                                atributos={this.state.atributos}
                                                cambioDeArreglosDeAtributos={this.cambioDeArreglosDeAtributos}
                                                nombreVariable={nombreVariable}
                                                actualizarNombreVariable={this.actualizarNombreVariable}
                                                descripcionVariable={descripcionVariable}
                                                actualizarDescripcionVariable={this.actualizarDescripcionVariable}
                                                nombreCampoNuevoAtributosVario={nombreCampoNuevoAtributosVario}
                                                actualizarNombreCampoNuevoAtributosVario={this.actualizarNombreCampoNuevoAtributosVario}
                                                actualizarEstadoSiEsObjeto={this.actualizarEstadoSiEsObjeto}
                                                configuracionHome={this.props.configuracionHome}
                                                goOptions={this.props.goOptions}
                                                retornoSeleccionVariables={this.props.retornoSeleccionVariables}
                                                retornoTipoDeAsignacion={this.retornoTipoDeAsignacion}
                                                goToCreateConditions={this.goToCreateConditions}
                                                goCreateVariableFieldSQL={this.goCreateVariableFieldSQL}
                                                guardarVariable={this.guardarVariable}
                                                crearAtributoVariable={this.crearAtributoVariable}>
                    </CrearVariable>
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
                                                retornarIndiceSeleccionado={this.actualizarIndiceSeleccionadoReglas}
                                                retornarEstadoVistaEsCondicion={() => {this.actualizarCondicion}}
                                                retornoCampo={this.retornoCampo}
                                                retornoOperacion={this.retornoOperacion}
                                                reglas={this.state.reglas}
                                                navbar={this.state.navbar}
                                                goToCreateFormula={this.goToCreateFormula}
                                                configuracionHome={this.props.configuracionHome}
                                                goOptions={this.props.goOptions}
                                                actualizarNivelNuevaRegla={this.actualizarNivelNuevaRegla}
                                                retornoSeleccionVariables={this.props.retornoSeleccionVariables}>
                    </InstruccionVariable>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("variableFormula") == 0) {
            return (
                <div style={{width: "100%", height: "100%"}}>
                    <Formula pool={this.props.pool}
                                            anadirFormula={this.anadirFormula}
                                            retornoCampo={this.retornoCampo}
                                            retornoOperacion={this.retornoOperacion}
                                            retornoTipoDeAsignacion={this.retornoTipoDeAsignacion}
                                            actualizarNivelNuevaRegla={this.actualizarNivelNuevaRegla}
                                            navbar={this.state.navbar}>
                    </Formula>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("variableSQL") == 0) {
            return (
                <div style={{width: "100%", height: "100%"}}>
                    <InstruccionSQL pool={this.props.pool}
                                            navbar={this.state.navbar}>
                    </InstruccionSQL>
                </div>
            );
        }
    }
}
