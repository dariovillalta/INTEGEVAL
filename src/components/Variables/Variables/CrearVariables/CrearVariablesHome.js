import React from 'react';

import CrearVariable from './CrearVariable.js';
import InstruccionVariable from '../../../InstruccionVariable.js';
import Formula from '../../../Formula.js';

var campoSeleccionado, operacionSeleccionada, objetoConexionSeleccionada;
var tipoDeAsignacionSeleccionado;   //para saber el tipo de asignacion que se debera hacer al atributo / campo

/*COMPONENTE PARA MANEJRA CAMBIO DE VISTA ENTRE CREAR VARIABLE Y VISTA DE CONDICIONES / INSTRUCIONES*/
/*MANEJA TODA LA LOGICA CREAR FUENTE DATO VARIABLE (OBJETO)*/

/*              ARREGLO DE ATRIBUTOS               */
/* CADA POSICION REPRESENTA UN CAMPO / ATRIBUTO / COLUMNA */
/*
    [ {nombre: "Carlos", apellido: "Carlos"}, {nombre: "Perez", apellido: "Perez"} ]
*/

/*              ARREGLO DE REGLAS               */
/* CADA POSICION REPRESENTA UNA REGLA PERTENECIENTE A AL ATRIBUTO CORRESPONDIENTE A LA POSICION DEL ATRIBUTO */
/*
    [ [{nombre: "Carlos", apellido: "Carlos"}, {nombre: "Perez", apellido: "Perez"}], [{nombre: "Carlos1", apellido: "Carlos1"}, {nombre: "Perez2", apellido: "Perez2"}] ]
*/

/*              ARREGLO DE FORMULAS               */
/* CADA POSICION REPRESENTA UNA FORMULA PERTENECIENTE A AL ATRIBUTO CORRESPONDIENTE A LA POSICION DEL ATRIBUTO */
/*
    [ [{nombre: "Carlos", apellido: "Carlos"}, {nombre: "Perez", apellido: "Perez"}], [{nombre: "Carlos1", apellido: "Carlos1"}, {nombre: "Perez2", apellido: "Perez2"}] ]
*/

/*              ARREGLO DE ELEMENTOS DE FORMULAS               */
/* CADA POSICION REPRESENTA UNA VARIABLE DENTRO DE LA FORMULA FORMULA PERTENECIENTE A AL ATRIBUTO CORRESPONDIENTE A LA POSICION DEL ATRIBUTO */
/*
    [ [[{nombre: "Carlos", apellido: "Carlos"}, {nombre: "Perez", apellido: "Perez"}], []], [[{nombre: "Carlos1", apellido: "Carlos1"}, {nombre: "Perez2", apellido: "Perez2"}], []] ]
*/

var nivelNuevoAtributoVarios = 0;                   //nivel del nuevo atributo a agregar | cambia con al seleccionar regla, o agregar variable a una formula
var nivelNuevoAtributoUnico = 0;                    //nivel del nuevo atributo a agregar | cambia con al seleccionar regla, o agregar variable a una formula
var indiceSeleccionadoReglas = -1;                  //indice seleccionado regla
var tipoElementoSeleccionadoRegla = '';             //tipo de seleccion de cursor de regla: esOtraRegla, arriba, abajo
var posicionAtributoSeleccionado = -1;              //posicion del arreglo donde se debe insertar el siguiente atributo / campo /  columna (para controlar cuando se agrega condiciones / instrucciones a un nuevo atributo)
var indiceSeleccionadoFormula = -1;                 //indice seleccionado formula

var atributosVario = [];
var reglasVariosAtributos = [];
var formulasVariosAtributos = [];
var elementosFormulasVariosAtributos = [];
var atributosUnico = [];
var reglasUnAtributo = [];
var formulasUnAtributo = [];
var elementosFormulasUnAtributos = [];

export default class CrearFuenteDatosHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componenteActual: 'crearVariable',
            atributos: [],
            reglas: [ {texto: "Regla 1", nivel: 1, esCondicion: false}, {texto: "Regla 2", nivel: 2, esCondicion: true}, {texto: "Regla 3", nivel: 3, esCondicion: false}, {texto: "Regla 4", nivel: 1, esCondicion: false}, {texto: "Regla 5", nivel: 2, esCondicion: false} ],
            formulas: [],
            esCondicion: true,                             //bandera para estado de nueva regla / instruccion, saber si es nueva comparacion o regla / instruccion = verdadero; si es falso = es nueva formula / asignacion
            navbar: ""
        }
        this.loadRules = this.loadRules.bind(this);
        this.sortRules = this.sortRules.bind(this);
        this.returnToCreateVariable = this.returnToCreateVariable.bind(this);
        this.goToCreateConditions = this.goToCreateConditions.bind(this);
        this.goToCreateFormula = this.goToCreateFormula.bind(this);
        this.createVariable = this.createVariable.bind(this);
        this.getVariableID = this.getVariableID.bind(this);
        this.createVariableField = this.createVariableField.bind(this);
        this.getVariableFieldID = this.getVariableFieldID.bind(this);
        this.createVariableFieldRules = this.createVariableFieldRules.bind(this);
        this.createVariableFieldFormula = this.createVariableFieldFormula.bind(this);
        this.getVariableFieldFormulaID = this.getVariableFieldFormulaID.bind(this);
        this.createVariableFieldFormulaElement = this.createVariableFieldFormulaElement.bind(this);
        this.retornarCampo = this.retornarCampo.bind(this);
        this.actualizarCondicion = this.actualizarCondicion(this);
        this.cambioDeArreglosDeAtributos = this.cambioDeArreglosDeAtributos(this);
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
        var esObjeto, formulas, reglas;
        var posicionSel = posicionAtributoSeleccionado;
        if(posicionAtributoSeleccionado == -1) {
            posicionSel = this.state.atributos.length;
        }
        if ($("#esObjetoFuenteDato").is(':checked'))
            esObjeto = true;
        else
            esObjeto = false;
        if(esObjeto) {
            formulas = formulasVariosAtributos;
            reglas = reglasVariosAtributos;
        } else {
            formulas = formulasUnAtributo;
            reglas = reglasUnAtributo;
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
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.goToCreateConditions}><a href="#" className={"breadcrumb-link"}>Condiciones</a></li>
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
                        alert("variable creada.")
                        this.props.getVariableID(atributoFuenteDato, campos);
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
                                this.createVariableField(result.recordset[0], campos[i]);
                            };
                        }
                    });
                }
            });
        }); // fin transaction
    }

    createVariableField (variable, variableCampo) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into VariablesCampos (variableID, nombre, tipo, campoEsArreglo, nivel) values ("+variable.ID+", '"+variableCampo.nombre+"', '"+variableCampo.tipo+"', '"+variableCampo.campoEsArreglo+"', "+variableCampo.nivel+")", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        //this.props.terminoCrearCampo(variable, variableCampo);
                        this.props.getVariableFieldID(variable, variableCampo);
                    });
                }
            });
        }); // fin transaction
    }

    getVariableFieldID (variable, variableCampo) {
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
                        var reglas, formulas;
                        if (esObjeto) {
                            reglas = reglasVariosAtributos;
                            formulas = formulasVariosAtributos;
                        } else {
                            reglas = reglasUnAtributo;
                            formulas = formulasUnAtributo;
                        }
                        if (reglas[posicionSel] != undefined) {
                            for (var i = 0; i < reglas[posicionSel].length; i++) {
                                this.createVariableFieldRules(variable, variableCampo, reglas[i]);
                            };
                        } else if (formulas[posicionSel] != undefined) {
                            for (var i = 0; i < formulas[posicionSel].length; i++) {
                                this.createVariableFieldFormula(variable, variableCampo, formulas[i], i);
                            };
                        }
                    });
                }
            });
        }); // fin transaction
    }

    createVariableFieldRules (variable, variableCampo, regla) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into Reglas (variableID, variableCampoID, reglaPadreID, esCondicion, operacion, valor, texto, nivel) values ("+variable.ID+", "+variableCampo.ID+", "+regla.reglaPadreID+", '"+regla.esCondicion+"', '"+regla.operacion+"', '"+regla.valor+"', '"+regla.texto+"', "+regla.nivel+")", (err, result) => {
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

    createVariableFieldFormula (variable, variableCampo, formula, indiceFormula) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into FormulasVariablesCampos (variableID, variableCampoID, formula, numeroDeFormulaDeVariable) values ("+variable.ID+", "+variableCampo.ID+", '"+formula.formula+"', "+formula.numeroDeFormulaDeVariable+")", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.props.getVariableFieldFormulaID(variable, variableCampo, formula, indiceFormula);
                    });
                }
            });
        }); // fin transaction
    }

    getVariableFieldFormulaID (variable, variableCampo, formula, indiceFormula) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from FormulasVariablesCampos where variableID = "+variable.variableID+" and variableCampoID = "+variableCampo.ID+" and numeroDeFormulaDeVariable = '"+formula.numeroDeFormulaDeVariable+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            var posicionSel = posicionAtributoSeleccionado;
                            //si fue llamado de crear atributo
                            if(posicionAtributoSeleccionado == -1) {
                                posicionSel = this.state.atributos.length;
                            }
                            var elementosFormulas;
                            if (esObjeto) {
                                elementosFormulas = elementosFormulasVariosAtributos;
                            } else {
                                elementosFormulas = elementosFormulasUnAtributos;
                            }
                            for (var i = 0; i < elementosFormulas[posicionSel][indiceFormula].length; i++) {
                                this.props.createVariableFieldFormulaElement(variable, variableCampo, formula, elementosFormulas[posicionSel][indiceFormula][i]);
                            };
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
            request.query("insert into ElementoFormulasVariablesCampos (variableID, variableCampoID, idFormula, idConexionTabla, nombreColumnaEnTabla, nombreVariable, operacion) values ("+variable.ID+", "+variableCampo.ID+", "+formula.ID+", "+elemento.idConexionTabla+", '"+elemento.nombreColumnaEnTabla+"', '"+elemento.nombreColumnaEnTabla+"', '"+elemento.nombreVariable+"', '"+elemento.operacion+"')", (err, result) => {
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
        campo = campoNuevo;
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
        var esObjeto;
        if ($("#esObjetoFuenteDato").is(':checked'))
            esObjeto = true;
        else
            esObjeto = false;
        if (esObjeto) {
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
        if(nombreVariable.length < 101 && nombreVariable.length > 0) {
            if(descripcionVariable.length < 701) {      //if(operacionSeleccionada.valor != undefined) {
                if(esObjeto != undefined) {
                    if(guardarResultadosEnBaseDatos != undefined) {
                        if(!isNaN(objetoPadreID)) {
                            //si no existen condiciones creadas, que se cree un arreglo vacio
                            /*if(this.state.reglas[this.state.posicionNuevoAtributo] == undefined) {
                                var tempCopyRules = [...this.state.reglas];
                                tempCopyRules.push([]);
                                this.setState({
                                    reglas: tempCopyRules
                                });
                            }
                            //si no existen formulas creadas, que se cree un arreglo vacio
                            if(this.state.formula[this.state.posicionNuevoAtributo].ID == undefined) {
                                var tempCopyFormulas = [...this.state.formula];
                                tempCopyFormulas.push([]);
                                this.setState({
                                    formula: tempCopyFormulas
                                });
                            }*/
                            var campoEsArreglo = true;
                            if(tipoDeAsignacionSeleccionado.localeCompare("Asignar Valor Único") == 0)
                                campoEsArreglo = false;
                            var nuevoAtributo;
                            //si la formula ya fue asignada, no agregar tipo
                            if(atributosUnico[0].tipo == undefined) {
                                nuevoAtributo = {nombre: nombreVariable, tipo: '', campoEsArreglo: campoEsArreglo,  nivel: nivelNuevoAtributoUnico};
                            } else {
                                nuevoAtributo = atributosUnico[0];
                                nuevoAtributo.nombre = nombreVariable;
                                nuevoAtributo.campoEsArreglo = campoEsArreglo;
                                nuevoAtributo.nivel = nivelNuevoAtributoUnico;
                            }
                            var nuevaVariable = {nombre: nombreVariable, descripcion: descripcionVariable, esObjeto: esObjeto, objetoPadreID: objetoPadreID, guardar: guardarResultadosEnBaseDatos};
                            this.createVariable(nuevaVariable, [nuevoAtributo]);
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
                alert("Tiene que ingresar una descripción de la variable.");
            }
        } else {
            alert("Tiene que ingresar un nombre de la variable.");
        }
    }

    guardarVariableVariosAtributo () {
        //
    }

    crearAtributoVariable () {              //agrega valor a arreglo, pero no guarda en base de datos
        var nombreAtributo = $("#nombreAtributo").val();
        if(nombreAtributo.length > 0) {
            if(tipoDeAsignacionSeleccionado.length > 0) {
                //si no existen condiciones creadas, que se cree un arreglo vacio
                /*if(this.state.reglas[this.state.posicionNuevoAtributo] == undefined) {
                    var tempCopyRules = [...this.state.reglas];
                    tempCopyRules.push([]);
                    this.setState({
                        reglas: tempCopyRules
                    });
                }
                //si no existen formulas creadas, que se cree un arreglo vacio
                if(this.state.formula[this.state.posicionNuevoAtributo].ID == undefined) {
                    var tempCopyFormulas = [...this.state.formula];
                    tempCopyFormulas.push([]);
                    this.setState({
                        formula: tempCopyFormulas
                    });
                }*/
                var campoEsArreglo = true;
                if(tipoDeAsignacionSeleccionado.localeCompare("Asignar Valor Único") == 0)
                    campoEsArreglo = false;
                var nuevoAtributo;
                //si la formula ya fue asignada, no agregar tipo
                if(this.state.atributos[this.state.posicionNuevoAtributo].nombre == undefined) {
                    nuevoAtributo = {nombre: nombreAtributo, tipo: '', campoEsArreglo: campoEsArreglo};
                } else {
                    nuevoAtributo = this.state.atributos[this.state.posicionNuevoAtributo];
                    nuevoAtributo.nombre = nombreAtributo;
                    nuevoAtributo.campoEsArreglo = campoEsArreglo;
                }
                atributosVario.push(nuevoAtributo);
                this.setState({
                    atributos: atributosVario
                });
            } else {
                alert("Seleccione un tipo de asignación.");
            }
        } else {
            alert("Ingrese un valor para el nombre del atributo.");
        }
    }

    anadirRegla () {
        //si se agrega una formula/asignacion, todas las otras formulas tienen que ser del mismo tipo para esa variable
        //si el indiceSeleccionado es igual a -1, se llamo desde nuevo atributo
        //sino, modificar elemento seleccionado
        //primer if: ver el estado de donde fue llamado el metodo
        //campoSeleccionado, operacionSeleccionada, objetoConexionSeleccionada
        //
        var valor = $("#valor").val();
        var nuevaRegla = {campo: campoSeleccionado.valor, operacion: operacionSeleccionada.valor, valor: valor, texto: campoSeleccionado.valor+" "+operacionSeleccionada.valor+" "+valor, reglaPadreID: -1, nivel: 1};
        var posicionSel = posicionAtributoSeleccionado;
        if(posicionAtributoSeleccionado == -1) {
            posicionSel = this.state.atributos.length;
        }
        var esObjeto, reglas;
        if ($("#esObjetoFuenteDato").is(':checked'))
            esObjeto = true;
        else
            esObjeto = false;
        if (esObjeto) {
            reglas = reglasVariosAtributos;
        } else {
            reglas = reglasUnAtributo;
        }
        reglas[posicionSel].push(nuevaRegla);
        console.log('reglas');
        console.log(reglas);

        /*if( this.state.indiceSeleccionado != -1 || (this.state.indiceSeleccionado == -1 && this.state.reglas.length == 0) ) {
            var operacion = $("input[name='operacionRadio']:checked").val();
            var valor = $("#valor").val();
            console.log('operacionSeleccionada');
            console.log(operacionSeleccionada);
            console.log('valor');
            console.log(valor);
            console.log('campoSeleccionado');
            console.log(campoSeleccionado);
            var posicionAInsertar = -1;
            if(this.state.indiceSeleccionado != -1) {
                posicionAInsertar = this.state.indiceSeleccionado;
            }
            var copiaAntiguaReglas = [...this.state.reglas];
            var nuevaRegla = {campo: campo.valor, operacion: operacion, valor: valor, texto: "TEXTO", reglaPadreID: -1, nivel: 1};
            if(posicionAInsertar != -1) {
                copiaAntiguaReglas.push(nuevaRegla);
            } else {
                if(this.state.tipoIndiceSeleccionado.localeCompare("esOtraRegla") == 0) {
                    var variablePadre = this.state.reglas[posicionAInsertar];
                    nuevaRegla.reglaPadreID = variablePadre.ID;
                    nuevaRegla.nivel = variablePadre.nivel + 1;
                    var tempCopy
                    this.actualizarNivelReglas(nuevaRegla, posicionInsertarNuevo, )
                } if(this.state.tipoIndiceSeleccionado.localeCompare("arriba") == 0) {
                }
            }
        } else {
            alert("Seleccione una posición para agregar una nueva instrucción");
        }*/
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
        let elementosFormulas;
        var esObjeto;
        if ($("#esObjetoFuenteDato").is(':checked'))
            esObjeto = true;
        else
            esObjeto = false;
        if(esObjeto) {
            elementosFormulas = elementosFormulasVariosAtributos;
        } else {
            elementosFormulas = elementosFormulasUnAtributos;
        }
        if(elementosFormulas[posicionSel] == undefined)
            elementosFormulas[posicionSel] = [];
        if(elementosFormulas[posicionSel][indiceSeleccionadoFormula] == undefined)
            elementosFormulas[posicionSel][indiceSeleccionadoFormula] = [];
        for (var i = 0; i < formulaArreglo.length; i++) {
            if(formulaArreglo[i].tipo.localeCompare("variable") == 0 && formulaArreglo[i].esFuenteDato) {
                /*if(esObjeto) {
                    elementosFormulasVariosAtributos.push({
                        idConexionTabla: formulaArreglo[i].idConexionTabla,
                        nombreColumnaEnTabla: formulaArreglo[i].valor,
                        nombreVariable: formulaArreglo[i].valor,
                        operacion: formulaArreglo[i].operacion
                    });
                } else {
                    elementosFormulasUnAtributos.push({
                        idConexionTabla: formulaArreglo[i].idConexionTabla,
                        nombreColumnaEnTabla: formulaArreglo[i].valor,
                        nombreVariable: formulaArreglo[i].valor,
                        operacion: formulaArreglo[i].operacion
                    });
                }*/
                elementosFormulas[posicionSel][indiceSeleccionadoFormula].push({
                    idConexionTabla: formulaArreglo[i].idConexionTabla,
                    nombreColumnaEnTabla: formulaArreglo[i].valor,
                    nombreVariable: formulaArreglo[i].valor,
                    operacion: formulaArreglo[i].operacion
                });
            }
        };
        var copiaAntiguaFormulas;
        if(esObjeto) {
            copiaAntiguaFormulas = formulasVariosAtributos;
        } else {
            copiaAntiguaFormulas = formulasUnAtributo;
        }
        if(copiaAntiguaFormulas[posicionSel] == undefined)
            copiaAntiguaFormulas[posicionSel] = [];
        copiaAntiguaFormulas[posicionSel].push({formula: formula});
        this.setState({
            formulas: copiaAntiguaFormulas[posicionSel]
        });
        console.log('elementosFormulas');
        console.log(elementosFormulas);
        console.log('copiaAntiguaFormulas[posicionSel]');
        console.log(copiaAntiguaFormulas[posicionSel]);
        console.log('copiaAntiguaFormulas');
        console.log(copiaAntiguaFormulas);
        var self = this;
        setTimeout(function(){
            console.log(self.state.formulas)
        }, 2000);
    }

    retornoCampo (campo, tipoVariable, objetoConexion) {
        campoSeleccionado = campo;
        tipoElementoSeleccionado = tipoVariable;
        objetoConexionSeleccionada = objetoConexion;
        console.log('campoSeleccionado');
        console.log(campoSeleccionado);
        console.log('tipoElementoSeleccionado');
        console.log(tipoElementoSeleccionado);
    }

    retornoOperacion (operacion) {
        operacionSeleccionada = operacion;
        console.log('operacionSeleccionada');
        console.log(operacionSeleccionada);
    }

    retornoTipoDeAsignacion (tipoDeAsignacion) {
        tipoDeAsignacionSeleccionado = tipoDeAsignacion;
    }

    actualizarIndiceSeleccionadoReglas(indice, tipoElemento) {
        indiceSeleccionadoReglas = indice;
        tipoElementoSeleccionadoRegla = tipoElemento;
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
                                                configuracionHome={this.props.configuracionHome}
                                                goOptions={this.props.goOptions}
                                                retornoSeleccionVariables={this.props.retornoSeleccionVariables}
                                                retornoTipoDeAsignacion={this.retornoTipoDeAsignacion}
                                                goToCreateConditions={this.goToCreateConditions}
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
                                                reglas={[{texto: "Regla 1", nivel: 1, esCondicion: false}, {texto: "Regla 2", nivel: 2, esCondicion: true}, {texto: "Regla 3", nivel: 3, esCondicion: false}, {texto: "Regla 4", nivel: 1, esCondicion: false}, {texto: "Regla 5", nivel: 2, esCondicion: false}]}
                                                navbar={this.state.navbar}
                                                goToCreateFormula={this.goToCreateFormula}
                                                configuracionHome={this.props.configuracionHome}
                                                goOptions={this.props.goOptions}
                                                retornoSeleccionVariables={this.props.retornoSeleccionVariables}>
                    </InstruccionVariable>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("variableFormula") == 0) {
            return (
                <div style={{width: "100%", height: "100%"}}>
                    <Formula pool={this.props.pool}
                                            retornoCampo={this.retornoCampo}
                                            retornoOperacion={this.retornoOperacion}
                                            navbar={this.state.navbar}
                                            anadirFormula={this.anadirFormula}>
                    </Formula>
                </div>
            );
        }
    }
}
