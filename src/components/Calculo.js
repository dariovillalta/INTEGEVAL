import React from 'react';
import sql from 'mssql';

var nivelMaximoVariables = 0;
var arregloDeFuentesDeDatos = [];                           //Arreglo con las fuentes de datos
        //objeto: {tablaID, nombre, descripcion, esObjeto, objetoPadreID, guardar, nivel, [arreglo de atributos]}
            //objeto arreglo de atributos: {nombre, tipo, formula}
var arregloDeVariables = [];                                //Arreglo con las variables
        //objeto: {nombre, descripcion, esObjeto, objetoPadreID, guardar, nivel, [arreglo de atributos]}
            //objeto arreglo de atributos: {nombre, tipo, formula}
var arregloDeReglas = [];                   //Arreglo con las reglas / instrucciones correspondientes a la posicion del atributo
var arregloDeFormulas = [];                 //Arreglo con las formulas / asignaciones correspondientes a la posicion del atributo
var arregloDeElementosDeFormulas = [];      //Arreglo con las fuentes de datos correspondientes a la posicion de la formula
var arregloConexionesATablas = [];          //Arreglo con los valores para poder conectarse a las tablas
var arregloResultadosDeTablas = [];         //Arreglo con los valores obtenidos despues de conectarse a las tablas

var banderaImportacionCamposVariablesINICIO = 0;                    //Bandera para saber si termino de importar los campos de las variables
var banderaImportacionCamposVariablesFIN = 0;                       //Bandera para saber si termino de importar los campos de las variables
var banderaImportacionReglasCamposVariablesINICIO = 0;              //Bandera para saber si termino de importar las reglas de los campos de las variables
var banderaImportacionReglasCamposVariablesFIN = 0;                 //Bandera para saber si termino de importar las reglas de los campos de las variables
var banderaImportacionFormulasCamposVariablesINICIO = 0;            //Bandera para saber si termino de importar las formulas de los campos de las variables
var banderaImportacionFormulasCamposVariablesFIN = 0;               //Bandera para saber si termino de importar las formulas de los campos de las variables
var banderaImportacionElementosFormulasCamposVariablesINICIO = 0;   //Bandera para saber si termino de importar los elementos de las formulas de los campos de las variables
var banderaImportacionElementosFormulasCamposVariablesFIN = 0;      //Bandera para saber si termino de importar los elementos de las formulas de los campos de las variables
var banderaImportacionConecionesATablasINICIO = 0;                  //Bandera para saber si termino de importar los valores para poder conetarse a las tablas
var banderaImportacionConecionesATablasFIN = 0;                     //Bandera para saber si termino de importar los valores para poder conetarse a las tablas
var banderaImportacionValoresDeTablasDeFuenteDeDatosINICIO = 0;     //Bandera para saber si termino de importar los valores de las tablas de fuentes de datos
var banderaImportacionValoresDeTablasDeFuenteDeDatosFIN = 0;        //Bandera para saber si termino de importar los valores de las tablas de fuentes de datos

const myWorker = new Worker("./components/CalculoVariablesWorker.js");

export default class Calculo extends React.Component {
    constructor(props) {
        super(props);
        /*this.state = {
            showLoadingScreen: false,
            mensajeLoadingScreen: ''
        }*/
        this.iniciarCalculo = this.iniciarCalculo.bind(this);
        this.getNivelMaximoVariables = this.getNivelMaximoVariables.bind(this);
        this.traerVariables = this.traerVariables.bind(this);
        this.traerAtributosVariables = this.traerAtributosVariables.bind(this);
        this.revisarFinImportacionCamposVariables = this.revisarFinImportacionCamposVariables.bind(this);
        this.inicioTraerReglasDeCampos = this.inicioTraerReglasDeCampos.bind(this);
        this.traerReglasDeCampos = this.traerReglasDeCampos.bind(this);
        this.revisarFinImportacionReglasCampos = this.revisarFinImportacionReglasCampos.bind(this);
        this.inicioTraerFormulasDeCampos = this.inicioTraerFormulasDeCampos.bind(this);
        this.traerFormulasDeCampos = this.traerFormulasDeCampos.bind(this);
        this.revisarFinImportacionFormulasCampos = this.revisarFinImportacionFormulasCampos.bind(this);
        this.inicioTraerElementosFormulasDeCampos = this.inicioTraerElementosFormulasDeCampos.bind(this);
        this.traerElementosFormulasDeCampos = this.traerElementosFormulasDeCampos.bind(this);
        this.revisarFinImportacionElementosFormulasCampos = this.revisarFinImportacionElementosFormulasCampos.bind(this);
        this.inicioTraerConeccionesATablas = this.inicioTraerConeccionesATablas.bind(this);
        this.noHaSidoImportadaConeccion = this.noHaSidoImportadaConeccion.bind(this);
        this.traerConeccionesATablas = this.traerConeccionesATablas.bind(this);
        this.finTraerConeccionesATablas = this.finTraerConeccionesATablas.bind(this);
        this.inicioTraerResultadosDeFuenteDeDatos = this.inicioTraerResultadosDeFuenteDeDatos.bind(this);
        this.traerResultadosDeFuenteDeDatos = this.traerResultadosDeFuenteDeDatos.bind(this);
        this.finTraerResultadosDeFuenteDeDatos = this.finTraerResultadosDeFuenteDeDatos.bind(this);
        this.iniciarHilo = this.iniciarHilo.bind(this);
    }

    iniciarCalculo() {
        this.getNivelMaximoVariables();
    }

    getNivelMaximoVariables() {
        nivelMaximoVariables = 0;
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select MAX(nivel) AS nivel from VariablesCampos", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            nivelMaximoVariables = result.recordset[0].nivel;
                        }
                        arregloDeVariables = [];
                        this.traerVariables();
                    });
                }
            });
        }); // fin transaction
    }

    traerVariables() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Variables", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        arregloDeVariables = result.recordset;
                        banderaImportacionCamposVariablesINICIO = 0;
                        banderaImportacionCamposVariablesFIN = arregloDeVariables.length;
                        for (var i = 0; i < arregloDeVariables.length; i++) {
                            this.traerAtributosVariables(arregloDeVariables[i].ID, i);
                        };
                        if(arregloDeVariables.length == 0) {
                            alert("No existen variables");
                        }
                    });
                }
            });
        }); // fin transaction
    }

    traerAtributosVariables (variableID, index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from VariablesCampos where variableID = "+variableID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        banderaImportacionCamposVariablesINICIO++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionCamposVariablesINICIO++;
                        arregloDeVariables[index].atributos = result.recordset;
                        this.revisarFinImportacionCamposVariables();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionCamposVariables () {
        if(banderaImportacionCamposVariablesINICIO == banderaImportacionCamposVariablesFIN) {
            this.inicioTraerReglasDeCampos();
        }
    }

    inicioTraerReglasDeCampos () {
        banderaImportacionReglasCamposVariablesINICIO = 0;
        banderaImportacionReglasCamposVariablesFIN = 0;
        for (var i = 0; i < arregloDeVariables.length; i++) {
            for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
                banderaImportacionReglasCamposVariablesFIN++;
                this.traerReglasDeCampos(arregloDeVariables[i].atributos[j].ID, i, j);
            };
        };
    }

    traerReglasDeCampos (variableCampoID, i, j) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Reglas where campoVariablePadreID = "+variableCampoID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        banderaImportacionReglasCamposVariablesINICIO++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionReglasCamposVariablesINICIO++;
                        arregloDeVariables[i].atributos[j].reglas = result.recordset;
                        this.revisarFinImportacionReglasCampos();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionReglasCampos () {
        if(banderaImportacionReglasCamposVariablesINICIO == banderaImportacionReglasCamposVariablesFIN) {
            this.inicioTraerFormulasDeCampos();
        }
    }

    inicioTraerFormulasDeCampos () {
        banderaImportacionFormulasCamposVariablesINICIO = 0;
        banderaImportacionFormulasCamposVariablesFIN = 0;
        for (var i = 0; i < arregloDeVariables.length; i++) {
            for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
                banderaImportacionFormulasCamposVariablesFIN++;
                this.traerFormulasDeCampos(arregloDeVariables[i].atributos[j].ID, i, j);
            };
        };
    }

    traerFormulasDeCampos (variableCampoID, i, j) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from FormulasVariablesCampos where variableCampoID = "+variableCampoID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        banderaImportacionFormulasCamposVariablesINICIO++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionFormulasCamposVariablesINICIO++;
                        arregloDeVariables[i].atributos[j].formulas = result.recordset;
                        this.revisarFinImportacionFormulasCampos();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionFormulasCampos () {
        if(banderaImportacionFormulasCamposVariablesINICIO == banderaImportacionFormulasCamposVariablesFIN) {
            this.inicioTraerElementosFormulasDeCampos();
        }
    }

    inicioTraerElementosFormulasDeCampos () {
        banderaImportacionElementosFormulasCamposVariablesINICIO = 0;
        banderaImportacionElementosFormulasCamposVariablesFIN = 0;
        for (var i = 0; i < arregloDeVariables.length; i++) {
            for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
                for (var k = 0; k < arregloDeVariables[i].atributos[j].formulas.length; k++) {
                    banderaImportacionElementosFormulasCamposVariablesFIN++;
                    this.traerElementosFormulasDeCampos(arregloDeVariables[i].atributos[j].formulas[k].ID, i, j, k);
                };
            };
        };
    }

    traerElementosFormulasDeCampos (idFormula, i, j, k) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ElementoFormulasVariablesCampos where idFormula = "+idFormula, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        banderaImportacionElementosFormulasCamposVariablesINICIO++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionElementosFormulasCamposVariablesINICIO++;
                        arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos = result.recordset;
                        this.revisarFinImportacionElementosFormulasCampos();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionElementosFormulasCampos () {
        if(banderaImportacionElementosFormulasCamposVariablesINICIO == banderaImportacionElementosFormulasCamposVariablesFIN) {
            this.inicioTraerConeccionesATablas();
        }
    }

    inicioTraerConeccionesATablas () {
        banderaImportacionConecionesATablasINICIO = 0;
        banderaImportacionConecionesATablasFIN = 0;
        arregloConexionesATablas = [];
        for (var i = 0; i < arregloDeVariables.length; i++) {
            for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
                for (var k = 0; k < arregloDeVariables[i].atributos[j].formulas.length; k++) {
                    for (var l = 0; l < arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos.length; l++) {
                        if(this.noHaSidoImportadaConeccion(arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos[l])) {
                            banderaImportacionConecionesATablasFIN++;
                            //para asegurar que ID no sea asyncrono
                            arregloConexionesATablas.push({ID: arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos[l].idConexionTabla});
                            arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos[l]
                            this.traerConeccionesATablas(arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos[l].idConexionTabla, arregloConexionesATablas.length-1);
                        }
                    };
                };
            };
        };
    }

    noHaSidoImportadaConeccion (fuenteDeDato) {
        for (var i = 0; i < arregloConexionesATablas.length; i++) {
            if(arregloConexionesATablas[i].ID == fuenteDeDato.idConexionTabla) {
                return false;
            }
        };
        return true;
    }

    traerConeccionesATablas (tablaID, indexARemplazar) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Tablas where ID = "+tablaID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        banderaImportacionConecionesATablasINICIO++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionConecionesATablasINICIO++;
                        if(result.recordset.length > 0)
                            arregloConexionesATablas[indexARemplazar] = result.recordset[0];
                        this.finTraerConeccionesATablas();
                    });
                }
            });
        }); // fin transaction
    }

    finTraerConeccionesATablas () {
        if(banderaImportacionConecionesATablasINICIO == banderaImportacionConecionesATablasFIN) {
            this.inicioTraerResultadosDeFuenteDeDatos();
        }
    }

    inicioTraerResultadosDeFuenteDeDatos () {
        banderaImportacionValoresDeTablasDeFuenteDeDatosINICIO = 0;
        banderaImportacionValoresDeTablasDeFuenteDeDatosFIN = 0;
        arregloResultadosDeTablas = [];
        for (var i = 0; i < arregloConexionesATablas.length; i++) {
            banderaImportacionValoresDeTablasDeFuenteDeDatosFIN++;
            this.traerResultadosDeFuenteDeDatos(arregloConexionesATablas[i]);
        };
    }

    traerResultadosDeFuenteDeDatos (tabla, index) {
        const pool = new sql.ConnectionPool({
            user: tabla.usuario,
            password: tabla.contrasena,
            server: tabla.servidor,
            database: tabla.baseDatos,
            stream: true,
            connectionTimeout: 900000,
            requestTimeout: 900000,
            pool: {
                max: 40,
                min: 0,
                idleTimeoutMillis: 30000
            },
            options: {
                useUTC: false
            }
        });
        pool.connect(err => {
            pool.request().query("select * from "+tabla.tabla, (err, result) => {
                banderaImportacionValoresDeTablasDeFuenteDeDatosINICIO++;
                if(result.recordset != undefined && result.recordset.length > 0)
                    arregloResultadosDeTablas.splice(index, 0, result.recordset);
                this.finTraerResultadosDeFuenteDeDatos();
            });
        }); // fin pool connect
    }

    finTraerResultadosDeFuenteDeDatos () {
        if(banderaImportacionValoresDeTablasDeFuenteDeDatosINICIO == banderaImportacionValoresDeTablasDeFuenteDeDatosFIN) {
            this.iniciarHilo();
        }
    }

    iniciarHilo () {
        console.log('nivelMaximoVariables');
        console.log(nivelMaximoVariables);
        console.log('arregloDeFuentesDeDatos');
        console.log(arregloDeFuentesDeDatos);
        console.log('arregloDeVariables');
        console.log(arregloDeVariables);
        console.log('arregloResultadosDeTablas');
        console.log(arregloResultadosDeTablas);
        console.log('arregloConexionesATablas');
        console.log(arregloConexionesATablas);
        //DESCRIPCION DEL PROCEDIMIENTO
        //1) PRIMERO CREAR CODIGO PARA CREAR VARIABLES DE ELEMENTOS DE FORMULAS, AGRUPADAS POR TABLAS CORRESPONDIENTES  -- SERA PRIMER METODO A LLAMAR
        //2) CREAR METODO NIVEL XX, CONTENDRA LLAMADO A METODO 'CALCULO VARIABLES NIVEL XX', Y JUSTO DESPUES LLAMARÁ AL SIGUIENTE NIVEL QUE SIGUE, O AL METODO DE MENSAJE FINAL
        //3) CREAR CODIGO 'CALCULO VARIABLES NIVEL XX'

        //AGRUPANDO ELEMENTOS DE FORMULA POR CONEXION A TABLA
        var arregloAgrupacionElementosFormulaPorConexionATabla = [];    //arreglo que contiene los elementos de formulas agrupados por tablas
        for (var i = 0; i < arregloDeVariables.length; i++) {
            for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
                for (var k = 0; k < arregloDeVariables[i].atributos[j].formulas.length; k++) {
                    for (var l = 0; l < arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos.length; l++) {
                        for (var m = 0; m < arregloConexionesATablas.length; m++) {
                            if (arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos[l].idConexionTabla == arregloConexionesATablas[m].ID) {
                                if(arregloAgrupacionElementosFormulaPorConexionATabla[m] == undefined)
                                    arregloAgrupacionElementosFormulaPorConexionATabla[m] = [];
                                arregloAgrupacionElementosFormulaPorConexionATabla[m].push(fuenteDato: arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos[l], variable: arregloDeVariables[i], atributo: arregloDeVariables[i].atributos[j], index: l);
                            }
                        };
                    };
                };
            };
        };

        //INICIALIZANDO / CREANDO VARIABLES CON SUS CAMPOS
        var codigoIniciacionVariables = '';
        for (var i = 0; i < arregloDeVariables.length; i++) {
            if(i != 0)
                codigoIniciacionVariables += '\n\n';
            codigoIniciacionVariables += '\n// INSTANCIACIONES VARIABLE: '+arregloDeVariables[i].nombre;
            codigoIniciacionVariables += this.iniciacionVariablesConCampos(arregloDeVariables[i]); //variable, tipoVariable, esObjeto, atributo
            for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
                codigoIniciacionVariables += this.iniciacionVariablesConCampos(arregloDeVariables[i].atributos[j]); ////variable, tipoVariable, esObjeto, atributo
                for (var k = 0; k < arregloDeVariables[i].atributos[j].formulas.length; k++) {
                    //codigoIniciacionVariables += this.iniciacionVariablesConCampos(arregloDeVariables[i].atributos[j].formulas[k]);
                    for (var l = 0; l < arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos.length; l++) {
                        codigoIniciacionVariables += this.iniciacionVariablesConCampos(arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos[l], l); ////variable, tipoVariable, esObjeto, atributo
                    };
                };
            };
        };

        //CREAR CODIGO DE LLENAR / CALCULAR ELEMENTOS DE FORMULAS
        var codigoElementosFormula = '';
        for (var i = 0; i < arregloConexionesATablas.length; i++) {
            if(i != 0)
                codigoElementosFormula += '\n\n';
            codigoElementosFormula += '\n// TABLA: '+arregloConexionesATablas[i].nombre;
            //codigoElementosFormula += 'for (int i = 0; i < arregloConexionesATablas['+i+'].length; i++) {';
            codigoElementosFormula += 'for (int i = 0; i < arregloResultadosDeTablas['+i+'].length; i++) {';
            for (var j = 0; j < arregloAgrupacionElementosFormulaPorConexionATabla[i].length; j++) {
                var codigoCalculoVariable = this.codigoElementosFormula(arregloAgrupacionElementosFormulaPorConexionATabla[i][j]);
                for (var k = 0; k < codigoCalculoVariable.length; k++) {
                    codigoElementosFormula += '\n\t' + codigoCalculoVariable[k];
                };
            };
            codigoElementosFormula += '\n}';

            for (var j = 0; j < arregloAgrupacionElementosFormulaPorConexionATabla[i].length; j++) {
                var codigoCalculoVariable = this.codigoElementosFormula(arregloAgrupacionElementosFormulaPorConexionATabla[i][j]);
                for (var k = 0; k < codigoCalculoVariable.length; k++) {
                    codigoElementosFormula += '\n\t' + codigoCalculoVariable[k];
                };
            };
        };
    }

    iniciacionVariablesConCampos (variable, tipoVariable, atributo) {
        if(tipoVariable.localeCompare("fuenteDato") == 0) {
            //tipoVariable en este caso, es el valor del index del elemento en formula
            this.iniciacionElementosFormula(variable, tipoVariable);
        } else {
            this.iniciacionVariable(variable, tipoVariable, atributo);
        }
    }

    iniciacionElementosFormula (variable, index) {
        var iniciacionElementosFormula = '';
        if(variable.tipoColumnaEnTabla.localeCompare("date") == 0 && (variable.operacion.localeCompare("MAX") == 0 || variable.operacion.localeCompare("MIN") == 0) ) {
            //CUANDO ES FECHA Y OPERACION ES MAX O MIN DE FUENTE DE DATOS, SE OBTIENE LA FECHA MAXIMA O MENOR ENCONTRADA
            //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
            //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
            iniciacionElementosFormula += 'window['+variable.nombreColumnaEnTabla+
                                                variable.variableID+
                                                variable.variableCampoID+
                                                variable.idFormula+
                                                variable.idConexionTabla+index+']';
            iniciacionElementosFormula += ' = new Date(1964, 4, 28);'; //POPS BIRTHDAY
        } else if(variable.tipoColumnaEnTabla.localeCompare("date") == 0 && variable.operacion.length > 0) {
            //CUANDO ES FECHA Y OPERACION NO ES MAX O MIN DE FUENTE DE DATOS, SE OBTIENE UN NUMERO QUE VARIA POR OPERACION (DIA, MES, AÑO, COUNT)
            //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
            //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
            iniciacionElementosFormula += 'window['+variable.nombreColumnaEnTabla+
                                                variable.variableID+
                                                variable.variableCampoID+
                                                variable.idFormula+
                                                variable.idConexionTabla+index+']';
            iniciacionElementosFormula += ' = 0;';
        }

        if(variable.tipoColumnaEnTabla.localeCompare("bool") == 0 && variable.operacion.localeCompare("COUNT") == 0) {
            //CUANDO ES BOOL Y OPERACION ES COUNT DE FUENTE DE DATOS
            //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
            //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
            iniciacionElementosFormula += 'window['+variable.nombreColumnaEnTabla+
                                                variable.variableID+
                                                variable.variableCampoID+
                                                variable.idFormula+
                                                variable.idConexionTabla+index+']';
            iniciacionElementosFormula += ' = 0;';
        }

        if(variable.tipoColumnaEnTabla.localeCompare("numero") == 0 && this.existeOperacion(variable.operacion) ) {
            //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
            //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
            iniciacionElementosFormula += 'window['+variable.nombreColumnaEnTabla+
                                                variable.variableID+
                                                variable.variableCampoID+
                                                variable.idFormula+
                                                variable.idConexionTabla+index+']';
            iniciacionElementosFormula += ' = 0;';
        }

        if(variable.tipoColumnaEnTabla.localeCompare("cadena") == 0 && variable.operacion.localeCompare("COUNT") == 0) {
            //CUANDO ES BOOL Y OPERACION ES COUNT DE FUENTE DE DATOS
            //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
            //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
            iniciacionElementosFormula += 'window['+variable.nombreColumnaEnTabla+
                                                variable.variableID+
                                                variable.variableCampoID+
                                                variable.idFormula+
                                                variable.idConexionTabla+i+']';
            iniciacionElementosFormula += ' = 0;';
        }
        return iniciacionElementosFormula;
    }

    iniciacionVariable (variable, tipoVariable, atributo) {
        var iniciacionVariable = '';
        if(tipoVariable.localeCompare("variable") == 0) {
            if(variable.esObjeto) {
                iniciacionVariable += 'window['+variable.nombre+'] = {};';
            }
        } else if(tipoVariable.localeCompare("atributo") == 0) {
            if(variable.esObjeto) {
                if(atributo.tipo.localeCompare("date") == 0) {
                    iniciacionVariable += 'window['+variable.nombre+'].'+atributo.nombre+' = new Date(1964, 5, 28);'; //POPS BIRTHDAY == null
                }
                if(atributo.tipo.localeCompare("bool") == 0) {
                    iniciacionVariable += 'window['+variable.nombre+'].'+atributo.nombre+' = false;'; //POPS BIRTHDAY == null
                }
                if(atributo.tipo.localeCompare("numero") == 0) {
                    iniciacionVariable += 'window['+variable.nombre+'].'+atributo.nombre+' = 0;'; //POPS BIRTHDAY == null
                }
                if(atributo.tipo.localeCompare("cadena") == 0) {
                    iniciacionVariable += 'window['+variable.nombre+'].'+atributo.nombre+' = "";'; //POPS BIRTHDAY == null
                }
            } else {
                if(atributo.tipo.localeCompare("date") == 0) {
                    iniciacionVariable += 'window['+variable.nombre+'] = new Date(1964, 5, 28);'; //POPS BIRTHDAY == null
                }
                if(atributo.tipo.localeCompare("bool") == 0) {
                    iniciacionVariable += 'window['+variable.nombre+'] = false;';
                }
                if(atributo.tipo.localeCompare("numero") == 0) {
                    iniciacionVariable += 'window['+variable.nombre+'] = 0;';
                }
                if(atributo.tipo.localeCompare("cadena") == 0) {
                    iniciacionVariable += 'window['+variable.nombre+'] = "";';
                }
            }
        }
        return iniciacionVariable;
    }

    //elementoFormula: objeto elementoFormula
    codigoElementosFormula (elementoFormula, tabSpaces, objetoEnTabla, instanciacion) {
        var cadenaRetorno = '';
        if(elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("date") == 0) {
            if(elementoFormula.fuenteDato.operacion.localeCompare("MAX") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\tif('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+'.getTime() > window['+instanciacion+'].getTime() && (window['+instanciacion+'].getDate() != 28 && window['+instanciacion+'].getMonth() != 4 && window['+instanciacion+'].getFullYear() != 1964) ) {';
                cadenaRetorno+='\n'+tabSpaces+'\t\twindow['+instanciacion+'] = new Date('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+')';
                cadenaRetorno+='\n'+tabSpaces+'\t} else if (window['+instanciacion+'].getDate() == 28 && window['+instanciacion+'].getMonth() == 4 && window['+instanciacion+'].getFullYear() == 1964) {'           //valor nulo
                cadenaRetorno+='\n'+tabSpaces+'\t\twindow['+instanciacion+'] = new Date('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+')';
                cadenaRetorno+='\n'+tabSpaces+'\t}';
                cadenaRetorno+='\n'+tabSpaces+'}';
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("MIN") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\tif('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+'.getTime() < window['+instanciacion+'].getTime() && (window['+instanciacion+'].getDate() != 28 && window['+instanciacion+'].getMonth() != 4 && window['+instanciacion+'].getFullYear() != 1964) ) {';
                cadenaRetorno+='\n'+tabSpaces+'\t\twindow['+instanciacion+'] = new Date('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+')';
                cadenaRetorno+='\n'+tabSpaces+'\t} else if (window['+instanciacion+'].getDate() == 28 && window['+instanciacion+'].getMonth() == 4 && window['+instanciacion+'].getFullYear() == 1964) {'           //valor nulo
                cadenaRetorno+='\n'+tabSpaces+'\t\twindow['+instanciacion+'] = new Date('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+')';
                cadenaRetorno+='\n'+tabSpaces+'\t}';
                cadenaRetorno+='\n'+tabSpaces+'}';
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("DIA") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("MES") == 0) {
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("AÑO") == 0) {
            } else if(elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            } else if(elementoFormula.fuenteDato.operacion.length == 0) {
            }
        } else if(elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("bool") == 0) {
            if(elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            }
        } else if(elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("bool") == 0) {
            if(elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            }
        } else if(elementoFormula.fuenteDato.tipoColumnaEnTabla.localeCompare("cadena") == 0) {
            if(elementoFormula.fuenteDato.operacion.localeCompare("COUNT") == 0) {
                cadenaRetorno+=tabSpaces+'if('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+' != undefined && this.isValidDate('+objetoEnTabla+'.'+elementoFormula.fuenteDato.nombreColumnaEnTabla+') ) {';
                cadenaRetorno+='\n'+tabSpaces+'\twindow['+instanciacion+']++';
                cadenaRetorno+='\n'+tabSpaces+'}';
            }
        }
    }

    function codigoRegla (regla, arreglo, tabs, variable, proyeccion, posProyeccion, posVariable, posSubVariable) {
        var esCondicion = false, noAgregarFactor = false, noAgregarFecha = false;
        if(regla.operacion=="-" || regla.operacion=="+" || regla.operacion=="*" || regla.operacion=="/" || regla.operacion=="=")
            esCondicion = false;
        else
            esCondicion = true;
        var hasVariables = false;
        var textVariables = [];
        if(regla.variables.length > 0)
            hasVariables = true;
        var tabsText = '';
        for (var i = 0; i < tabs; i++) {
            tabsText+='\t';
        };
        var posicionesIF = [];
        var idFiltro = '';
        if(regla.filtro != -1)
            idFiltro = regla.filtro;
        if(regla.campoObjetivo.indexOf('COLUMNA') == 0) {
        } else if(regla.campoObjetivo.indexOf('hastaFOSEDE') == 0) {
        } else if(regla.campoObjetivo.indexOf('mayorFOSEDE') == 0) {
        } else if(regla.campoObjetivo.indexOf('CONCUENTAS') == 0) {
        } else if(regla.campoObjetivo.indexOf('SINCUENTAS') == 0) {
        }

        if(regla.valor.indexOf('LISTA') == 0) {
            if(esCondicion) {
                var arregloLista = regla.valor.split("=")[1].split(",");
                var copiaRegla = $.extend(true,{},arreglo);
                var tamArreglo = arreglo.length;
                if(regla.operacion == "no") {
                    for (var j = 0; j < tamArreglo; j++) {
                        for (var i = 0; i < arregloLista.length; i++) {
                            if(i==0) {
                                var textoFinal = ' != 0 ';
                                if(i+1 == arregloLista.length)
                                    textoFinal += " ) {";
                                var campo = regla.campoObjetivo.split("=")[1];
                                var valor = getListValue(arregloLista[i], campo);
                                arreglo[j].codigo +=valor + "')" + textoFinal;
                            } else {
                                var textoFinal = ' != 0 ';
                                if(i+1 == arregloLista.length)
                                    textoFinal += " ) {";
                                var campo = regla.campoObjetivo.split("=")[1];
                                var valor = getListValue(arregloLista[i], campo);
                                arreglo[j].codigo += " && "+copiaRegla[j].codigo.split(" ( ")[1]+valor+"')"+textoFinal;
                            }
                        }
                    };
                } else {
                    for (var j = 0; j < tamArreglo; j++) {
                        for (var i = 0; i < arregloLista.length; i++) {
                            if(i==0) {
                                var textoFinal = ' == 0 ';
                                if(i+1 == arregloLista.length)
                                    textoFinal += " ) {";
                                var campo = regla.campoObjetivo.split("=")[1];
                                var valor = getListValue(arregloLista[i], campo);
                                arreglo[j].codigo +=valor + "')" + textoFinal;
                            } else {
                                var textoFinal = ' == 0 ';
                                if(i+1 == arregloLista.length)
                                    textoFinal += " ) {";
                                var campo = regla.campoObjetivo.split("=")[1];
                                var valor = getListValue(arregloLista[i], campo);
                                arreglo[j].codigo += " || "+copiaRegla[j].codigo.split(" ( ")[1]+valor+"')"+textoFinal;
                            }
                        }
                    };
                }
            }
        } else if(regla.valor.indexOf('FACTOR') == 0 && !noAgregarFactor) {
        } else if(regla.valor.indexOf('COLUMNA') == 0) {
        } else if(regla.valor.indexOf('FECHA') == 0 && !noAgregarFecha) {
        }

        var cuerpo = arregloReglas.filter(function( object ) {
            return object.reglaPadre == regla.ID;
        });
        if(cuerpo.length > 0) {
            var arregloCuerpo = [];
            for (var i = 0; i < cuerpo.length; i++) {
                var cuantasTabs = tabs;
                if(esCondicion)
                    cuantasTabs++;
                var retorno = campoObjetivoDepositos(cuerpo[i], [], cuantasTabs, variable, proyeccion, posProyeccion, posVariable, posSubVariable);
                retorno[0].codigo = "\n"+retorno[0].codigo;
                $.merge( arregloCuerpo, retorno );
            };
            for (var i = 0; i < posicionesIF.length; i++) {
                arreglo.splice(posicionesIF[i], 0, ...arregloCuerpo);
                if(esCondicion)
                    arreglo.splice(posicionesIF[i]+arregloCuerpo.length, 0, {codigo: "\n"+tabsText+"}", filtro: regla.filtro});
                for (var j = i; j < posicionesIF.length; j++) {
                    posicionesIF[j]+=arregloCuerpo.length;
                };
            };
            if(posicionesIF.length == 0)
                $.merge( arreglo, arregloCuerpo );
            return arreglo;
        } else {
            if(esCondicion){
                for (var i = 0; i < posicionesIF.length; i++) {
                    arreglo.splice(posicionesIF[i], 0, {codigo: "\n"+tabsText+"}", filtro: regla.filtro})
                };
            }
            return arreglo;
        }
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

    existeOperacion (operacion) {
        for (var i = 0; i < this.state.operaciones.length; i++) {
            if( operacion.localeCompare("COUNT") == 0 || 
                operacion.localeCompare("MAX") == 0 || 
                operacion.localeCompare("MIN") == 0 || 
                operacion.localeCompare("DIA") == 0 || 
                operacion.localeCompare("MES") == 0 || 
                operacion.localeCompare("AÑO") == 0 || 
                operacion.localeCompare("PROM") == 0 || 
                operacion.localeCompare("AUTOSUM") == 0 ) {
                return true;
            }
        };
        return false;
    }

    render() {
        return (
            <div>
                <br/>
                <a className={"btn btn-brand btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.iniciarCalculo}>Iniciar</a>
                <br/>
            </div>
        );
    }
}
