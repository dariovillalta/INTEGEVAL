import React from 'react';
import sql from 'mssql';

var nivelMaximoVariables = 0;
var arregloDeFuentesDeDatos = [];                           //Arreglo con las fuentes de datos
        //objeto: {tablaID, nombre, descripcion, esObjeto, objetoPadreID, guardar, nivel, [arreglo de atributos]}
            //objeto arreglo de atributos: {nombre, tipo, formula}
window.arregloDeVariables = [];                                //Arreglo con las variables
        //objeto: {nombre, descripcion, esObjeto, objetoPadreID, guardar, nivel, [arreglo de atributos]}
            //objeto arreglo de atributos: {nombre, tipo, formula}
window.arregloDeReglas = [];                   //Arreglo con las reglas / instrucciones correspondientes a la posicion del atributo
window.arregloDeFormulas = [];                 //Arreglo con las formulas / asignaciones correspondientes a la posicion del atributo
window.arregloDeElementosDeFormulas = [];      //Arreglo con las fuentes de datos correspondientes a la posicion de la formula
window.arregloConexionesATablas = [];          //Arreglo con los valores para poder conectarse a las tablas
window.arregloResultadosDeTablas = [];         //Arreglo con los valores obtenidos despues de conectarse a las tablas

var banderaImportacionCamposVariablesINICIO = 0;                    //Bandera para saber si termino de importar los campos de las variables
var banderaImportacionCamposVariablesFIN = 0;                       //Bandera para saber si termino de importar los campos de las variables
var banderaImportacionSegmentosCamposVariablesINICIO = 0;           //Bandera para saber si termino de importar los segmentos de reglas de los campos de las variables
var banderaImportacionSegmentosCamposVariablesFIN = 0;              //Bandera para saber si termino de importar los segmentos de reglas de los campos de las variables
var banderaImportacionReglasSegmentosCamposVariablesINICIO = 0;     //Bandera para saber si termino de importar las reglas de los segmentos de los campos de las variables
var banderaImportacionReglasSegmentosCamposVariablesFIN = 0;        //Bandera para saber si termino de importar las reglas de los segmentos de los campos de las variables
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
        this.inicioTraerSegmentosDeCampos = this.inicioTraerSegmentosDeCampos.bind(this);
        this.traerSegmentosDeCampos = this.traerSegmentosDeCampos.bind(this);
        this.revisarFinImportacionSegmentosCampos = this.revisarFinImportacionSegmentosCampos.bind(this);
        this.inicioTraerReglasDeSegmentos = this.inicioTraerReglasDeSegmentos.bind(this);
        this.traerReglasDeSegmentos = this.traerReglasDeSegmentos.bind(this);
        this.revisarFinImportacionReglasSegmentos = this.revisarFinImportacionReglasSegmentos.bind(this);
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
        this.codigoIniciacion = this.codigoIniciacion.bind(this);
        this.iniciacionElementosFormula = this.iniciacionElementosFormula.bind(this);
        this.iniciacionVariable = this.iniciacionVariable.bind(this);
        this.iniciacionCampo = this.iniciacionCampo.bind(this);
        this.crearCodigoFuenteDato = this.crearCodigoFuenteDato.bind(this);
        this.crearCodigoSegmentoReglas = this.crearCodigoSegmentoReglas.bind(this);
        this.arregloCodigoRegla = this.arregloCodigoRegla.bind(this);
        this.agregarCodigoGuardarVariable = this.agregarCodigoGuardarVariable.bind(this);
        this.crearNivel = this.crearNivel.bind(this);
        this.isValidDate = this.isValidDate.bind(this);
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
            this.inicioTraerSegmentosDeCampos();
        }
    }

    inicioTraerSegmentosDeCampos () {
        console.log('inicioTraerSegmentosDeCampos');
        banderaImportacionSegmentosCamposVariablesINICIO = 0;
        banderaImportacionSegmentosCamposVariablesFIN = 0;
        for (var i = 0; i < arregloDeVariables.length; i++) {
            for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
                banderaImportacionSegmentosCamposVariablesFIN++;
                this.traerSegmentosDeCampos(arregloDeVariables[i].ID, arregloDeVariables[i].atributos[j].ID, i, j);
            };
        };
    }

    traerSegmentosDeCampos (variableID, variableCampoID, i, j) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from SegmentoReglas where variableID = "+variableID+" and variableCampoID = "+variableCampoID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        banderaImportacionSegmentosCamposVariablesINICIO++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionSegmentosCamposVariablesINICIO++;
                        arregloDeVariables[i].atributos[j].segmentoReglas = result.recordset;
                        this.revisarFinImportacionSegmentosCampos();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionSegmentosCampos () {
        if(banderaImportacionSegmentosCamposVariablesINICIO == banderaImportacionSegmentosCamposVariablesFIN) {
            this.inicioTraerReglasDeSegmentos();
        }
    }

    inicioTraerReglasDeSegmentos () {
        console.log('inicioTraerReglasDeSegmentos');
        banderaImportacionReglasSegmentosCamposVariablesINICIO = 0;
        banderaImportacionReglasSegmentosCamposVariablesFIN = 0;
        for (var i = 0; i < arregloDeVariables.length; i++) {
            console.log('i = '+i);
            for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
                console.log('j = '+j);
                for (var k = 0; k < arregloDeVariables[i].atributos[j].segmentoReglas.length; k++) {
                    console.log('k = '+k);
                    banderaImportacionReglasSegmentosCamposVariablesFIN++;
                    this.traerReglasDeSegmentos(arregloDeVariables[i].ID, arregloDeVariables[i].atributos[j].ID, arregloDeVariables[i].atributos[j].segmentoReglas[k].ID,  i, j, k);
                };
            };
        };
    }

    traerReglasDeSegmentos (variableID, variableCampoID, segmentoCampoID, i, j, k) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Reglas where variableID = "+variableID+" and variableCampoID = "+variableCampoID+" and segmentoReglaID = "+segmentoCampoID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        banderaImportacionReglasSegmentosCamposVariablesINICIO++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionReglasSegmentosCamposVariablesINICIO++;
                        arregloDeVariables[i].atributos[j].segmentoReglas[k].reglas = result.recordset;
                        this.revisarFinImportacionReglasSegmentos();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionReglasSegmentos () {
        console.log('banderaImportacionReglasSegmentosCamposVariablesINICIO');
        console.log(banderaImportacionReglasSegmentosCamposVariablesINICIO);
        console.log('banderaImportacionReglasSegmentosCamposVariablesFIN');
        console.log(banderaImportacionReglasSegmentosCamposVariablesFIN);
        if(banderaImportacionReglasSegmentosCamposVariablesINICIO == banderaImportacionReglasSegmentosCamposVariablesFIN) {
            this.inicioTraerFormulasDeCampos();
        }
    }

    inicioTraerFormulasDeCampos () {
        console.log('inicioTraerFormulasDeCampos');
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
        console.log('inicioTraerElementosFormulasDeCampos');
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
            request.query("select * from ElementoFormulasVariablesCampos where formulaID = "+idFormula, (err, result) => {
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
        console.log('inicioTraerConeccionesATablas');
        banderaImportacionConecionesATablasINICIO = 0;
        banderaImportacionConecionesATablasFIN = 0;
        arregloConexionesATablas = [];
        for (var i = 0; i < arregloDeVariables.length; i++) {
            for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
                for (var k = 0; k < arregloDeVariables[i].atributos[j].segmentoReglas.length; k++) {
                    if(arregloDeVariables[i].atributos[j].segmentoReglas[k].esConexionTabla && this.noHaSidoImportadaConeccion(arregloDeVariables[i].atributos[j].segmentoReglas[k])) {
                        banderaImportacionConecionesATablasFIN++;
                        //para asegurar que ID no sea asyncrono
                        arregloConexionesATablas.push({ID: arregloDeVariables[i].atributos[j].segmentoReglas[k].conexionTablaID});
                        //arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos[l]
                        this.traerConeccionesATablas(arregloDeVariables[i].atributos[j].segmentoReglas[k].conexionTablaID, arregloConexionesATablas.length-1);
                    }
                };
            };
        };
    }

    noHaSidoImportadaConeccion (segmento) {
        for (var i = 0; i < arregloConexionesATablas.length; i++) {
            if(arregloConexionesATablas[i].ID == segmento.conexionTablaID) {
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
        console.log('inicioTraerResultadosDeFuenteDeDatos');
        banderaImportacionValoresDeTablasDeFuenteDeDatosINICIO = 0;
        banderaImportacionValoresDeTablasDeFuenteDeDatosFIN = 0;
        arregloResultadosDeTablas = [];
        for (var i = 0; i < arregloConexionesATablas.length; i++) {
            banderaImportacionValoresDeTablasDeFuenteDeDatosFIN++;
            this.traerResultadosDeFuenteDeDatos(arregloConexionesATablas[i], i);
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
                console.log('resultados tabla: '+tabla.tabla);
                console.log(result.recordset);
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
        var arregloAgrupacionElementosFormulaPorConexionATabla = [];    //arreglo que contiene los segmento de reglas agrupados por el arreglo de tablas
        //la variable es insertado una unica vez cada por cada segmento de regla que pertenezca a la tabla
        var arregloAgrupacionElementosFormulaPorVariables = [];    //arreglo que contiene los segmento de reglas de la variable a calcular agrupados por la posicion de la variable a comparar en el arregloDeVariables
        //la variable es insertado una unica vez cada por cada segmento de regla que pertenezca a la tabla
        for (var i = 0; i < arregloDeVariables.length; i++) {
            for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
                for (var k = 0; k < arregloDeVariables[i].atributos[j].segmentoReglas.length; k++) {
                    if (arregloDeVariables[i].atributos[j].segmentoReglas[k].esConexionTabla) {
                        for (var m = 0; m < arregloConexionesATablas.length; m++) {
                                if (arregloDeVariables[i].atributos[j].segmentoReglas[k].conexionTablaID == arregloConexionesATablas[m].ID) {
                                    if(arregloAgrupacionElementosFormulaPorConexionATabla[m] == undefined)
                                        arregloAgrupacionElementosFormulaPorConexionATabla[m] = [];
                                    arregloAgrupacionElementosFormulaPorConexionATabla[m].push({segmentoRegla: arregloDeVariables[i].atributos[j].segmentoReglas[k], variable: arregloDeVariables[i], atributo: arregloDeVariables[i].atributos[j], index: k});
                                    break;
                                }
                        }
                    } else {
                        for (var x = 0; x < arregloDeVariables.length; x++) {
                            if(arregloDeVariables[i].atributos[j].segmentoReglas[k].variableID == arregloDeVariables[x].ID) {
                                if(arregloAgrupacionElementosFormulaPorVariables[x] == undefined)
                                    arregloAgrupacionElementosFormulaPorVariables[x] = [];
                                arregloAgrupacionElementosFormulaPorVariables[x].push({segmentoRegla: arregloDeVariables[i].atributos[j].segmentoReglas[k], variable: arregloDeVariables[i], atributo: arregloDeVariables[i].atributos[j], index: k});
                                break;
                            }
                        };
                    }
                };
            };
        };
        console.log('arregloAgrupacionElementosFormulaPorConexionATabla');
        console.log(arregloAgrupacionElementosFormulaPorConexionATabla);
        console.log('arregloAgrupacionElementosFormulaPorVariables');
        console.log(arregloAgrupacionElementosFormulaPorVariables);

        //INICIALIZANDO VARIABLES EN MEMORIA
        for (var a = 0; a < arregloDeVariables.length; a++) {
            if (arregloDeVariables[a].esObjeto) {
                //CREANDO ESPACIO EN MEMORIA DE ARREGLO DE VARIABLE SI ES ARREGLO
                window[arregloDeVariables[a].nombre] = [];
            } else {
                //CREANDO ESPACIO EN MEMORIA DE ARREGLO DE VARIABLE SI ES VAR PRIMITVA
                window[arregloDeVariables[a].nombre] = {};
            }
        }

        //INICIALIZANDO / CREANDO VARIABLES CON SUS CAMPOS
        /*var codigoIniciacionVariables = '';
        for (var i = 0; i < arregloDeVariables.length; i++) {
            if(i != 0)
                codigoIniciacionVariables += '\n\n';
            codigoIniciacionVariables += '\n// INSTANCIACIONES VARIABLE: '+arregloDeVariables[i].nombre;
            codigoIniciacionVariables += '\n' + this.codigoIniciacion(arregloDeVariables[i], "variable"); //variable, tipoVariable, esObjeto, atributo
            for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
                codigoIniciacionVariables += '\n' + this.codigoIniciacion(arregloDeVariables[i], "atributo", arregloDeVariables[i].atributos[j]); ////variable, tipoVariable, esObjeto, atributo
                for (var k = 0; k < arregloDeVariables[i].atributos[j].formulas.length; k++) {
                    //codigoIniciacionVariables += this.codigoIniciacion(arregloDeVariables[i].atributos[j].formulas[k]);
                    for (var l = 0; l < arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos.length; l++) {
                        console.log('arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos[l]');
                        console.log(arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos[l]);
                        codigoIniciacionVariables += '\n' + this.codigoIniciacion(arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos[l], "fuenteDato", l); ////variable, tipoVariable, esObjeto, atributo
                    };
                };
            };
        };
        console.log('codigoIniciacionVariables');
        console.log(codigoIniciacionVariables);*/

        var codigo = '';

        for (var i = 0; i <= nivelMaximoVariables; i++) {
            if(i == 0) {
                var llamarSiguienteNivel = false;
                if(nivelMaximoVariables >= 1)
                    llamarSiguienteNivel = true;
                codigo += this.crearCodigoFuenteDato(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorConexionATabla, 0);
            } else {
                var llamarSiguienteNivel = false;
                if(nivelMaximoVariables > i)
                    llamarSiguienteNivel = true;
                this.crearNivel(llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorVariables, i);
            }
        };

        window['calculoPrincipal'] = new Function(
            'return function calculoPrincipalMain(){'+
                    codigo+
            '}'
        )();

        window['calculoPrincipal']();
        console.log(window['calculoPrincipal']);
        for (var a = 0; a < arregloDeVariables.length; a++) {
            console.log('window[arregloDeVariables[a].nombre]');
            console.log(window[arregloDeVariables[a].nombre]);
        };

        //CREAR CODIGO DE LLENAR / CALCULAR ELEMENTOS DE FORMULAS
        /*var codigoElementosFormula = '';
        for (var i = 0; i < arregloConexionesATablas.length; i++) {
            if(i != 0)
                codigoElementosFormula += '\n\n';
            codigoElementosFormula += '\n// TABLA: '+arregloConexionesATablas[i].nombre;
            //codigoElementosFormula += 'for (int i = 0; i < arregloConexionesATablas['+i+'].length; i++) {';
            codigoElementosFormula += 'for (int i = 0; i < arregloResultadosDeTablas['+i+'].length; i++) {';
            for (var j = 0; j < arregloAgrupacionElementosFormulaPorConexionATabla[i].length; j++) {
                var codigoCalculoVariable = this.crearCampo(arregloAgrupacionElementosFormulaPorConexionATabla[i][j]);
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
        };*/
    }

    codigoIniciacion (variable, tipoVariable, atributo, tabsText) {
        if(tipoVariable.localeCompare("fuenteDato") == 0) {
            //atributo en este caso, es el valor del index del elemento en formula
            return this.iniciacionElementosFormula(variable, atributo, tabsText);
        } else if(tipoVariable.localeCompare("variable") == 0) {
            return this.iniciacionVariable(variable, tabsText);
        } else if(tipoVariable.localeCompare("atributo") == 0) {
            return this.iniciacionCampo(variable, atributo, tabsText);
        }
    }

    iniciacionElementosFormula (variable, index) {
        var iniciacionElementosFormula = '';
        if(variable.tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0 && (variable.operacion.localeCompare("MAX") == 0 || variable.operacion.localeCompare("MIN") == 0) ) {
            //CUANDO ES FECHA Y OPERACION ES MAX O MIN DE FUENTE DE DATOS, SE OBTIENE LA FECHA MAXIMA O MENOR ENCONTRADA
            //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
            //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
            iniciacionElementosFormula += tabsText+'var '+variable.nombreColumnaEnTabla+
                                                variable.variableID+
                                                variable.variableCampoID+
                                                variable.idFormula+
                                                variable.idConexionTabla+index;
            iniciacionElementosFormula += ' = new Date(1964, 4, 28);'; //POPS BIRTHDAY -- FECHA NULA
        } else if(variable.tipoColumnaEnTabla.toLowerCase().localeCompare("date") == 0 && variable.operacion.length > 0) {
            //CUANDO ES FECHA Y OPERACION NO ES MAX O MIN DE FUENTE DE DATOS, SE OBTIENE UN NUMERO QUE VARIA POR OPERACION (DIA, MES, AÑO, COUNT)
            //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
            //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
            iniciacionElementosFormula += tabsText+'var '+variable.nombreColumnaEnTabla+
                                                variable.variableID+
                                                variable.variableCampoID+
                                                variable.idFormula+
                                                variable.idConexionTabla+index;
            iniciacionElementosFormula += ' = 0;';
        }

        if(variable.tipoColumnaEnTabla.toLowerCase().localeCompare("bool") == 0 && variable.operacion.localeCompare("COUNT") == 0) {
            //CUANDO ES BOOL Y OPERACION ES COUNT DE FUENTE DE DATOS
            //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
            //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
            iniciacionElementosFormula += tabsText+'var '+variable.nombreColumnaEnTabla+
                                                variable.variableID+
                                                variable.variableCampoID+
                                                variable.idFormula+
                                                variable.idConexionTabla+index;
            iniciacionElementosFormula += ' = 0;';
        }

        if(variable.tipoColumnaEnTabla.toLowerCase().localeCompare("numero") == 0 && this.existeOperacion(variable.operacion) ) {
            //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
            //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
            iniciacionElementosFormula += tabsText+'var '+variable.nombreColumnaEnTabla+
                                                variable.variableID+
                                                variable.variableCampoID+
                                                variable.idFormula+
                                                variable.idConexionTabla+index;
            iniciacionElementosFormula += ' = 0;';
        }

        if(variable.tipoColumnaEnTabla.toLowerCase().localeCompare("cadena") == 0 && variable.operacion.localeCompare("COUNT") == 0) {
            //CUANDO ES BOOL Y OPERACION ES COUNT DE FUENTE DE DATOS
            //FORMULA NOMBRE FUENTE DE DATO (ELEMENTO DE FORMULA):
            //[nombreColumnaEnTabla]+[variableID]+[variableCampoID]+[idFormula]+[idConexionTabla]+[i]
            iniciacionElementosFormula += tabsText+'var '+variable.nombreColumnaEnTabla+
                                                variable.variableID+
                                                variable.variableCampoID+
                                                variable.idFormula+
                                                variable.idConexionTabla+index;
            iniciacionElementosFormula += ' = 0;';
        }
        return iniciacionElementosFormula;
    }

    iniciacionVariable (variable, tabsText) {
        var iniciacionVariable = '';
        if(variable.esObjeto) {
            iniciacionVariable += tabsText+'var '+variable.nombre+'NU3V0 = {};';
            iniciacionVariable += '\n'+tabsText+'var ' + variable.nombre + 'GU4RD4RV4L0R = false;';
        }
        //validacion necesario porque cuando variable sea primitiva, codigo de instanciacion sera en campo / atributo
        return iniciacionVariable;
    }

    iniciacionCampo (variable, campo, tabsText) {
        var iniciacionVariable = '';
        if(!variable.esObjeto) {
            if(campo.tipo.toLowerCase().localeCompare("date") == 0) {
                iniciacionVariable += tabsText+'var '+variable.nombre+'NU3V0 = new Date(1964, 5, 28);'; //POPS BIRTHDAY == null
            }
            if(campo.tipo.toLowerCase().localeCompare("bool") == 0) {
                iniciacionVariable += tabsText+'var '+variable.nombre+'NU3V0 = false;';
            }
            if(campo.tipo.toLowerCase().localeCompare("numero") == 0) {
                iniciacionVariable += tabsText+'var '+variable.nombre+'NU3V0 = -1;';
            }
            if(campo.tipo.toLowerCase().localeCompare("cadena") == 0) {
                iniciacionVariable += tabsText+'var '+variable.nombre+'NU3V0 = "";';
            }
        } else {
            if(campo.tipo.toLowerCase().localeCompare("date") == 0) {
                iniciacionVariable += tabsText+variable.nombre+'NU3V0.'+campo.nombre+' = new Date(1964, 5, 28);'; //POPS BIRTHDAY == null
            }
            if(campo.tipo.toLowerCase().localeCompare("bool") == 0) {
                iniciacionVariable += tabsText+variable.nombre+'NU3V0.'+campo.nombre+' = false;';
            }
            if(campo.tipo.toLowerCase().localeCompare("numero") == 0) {
                iniciacionVariable += tabsText+variable.nombre+'NU3V0.'+campo.nombre+' = -1;';
            }
            if(campo.tipo.toLowerCase().localeCompare("cadena") == 0) {
                iniciacionVariable += tabsText+variable.nombre+'NU3V0.'+campo.nombre+' = "";';
            }
        }
        return iniciacionVariable;
    }

    crearCodigoFuenteDato (llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorConexionATabla, nivelACrear) {
        //la creacion del codigo en esta parte pertenece a los campos que tienen asignacion unica de columna de tabla, y asignacion unica de columna de tabla con operacion como SUM, COUNT ect
        var codigo = '';
        for (var i = 0; i < arregloConexionesATablas.length; i++) {
            if(i > 0)
                codigo += '\n';
            codigo += '\t//CODIGO TABLA: '+arregloConexionesATablas[i].nombre;
            codigo += '\n\tfor ( var i = 0; i < arregloConexionesATablas.length; i++) {';
            codigo += '\n\t\tfor ( var x = 0; x < arregloResultadosDeTablas[i].length; x++) {';
            for (var a = 0; a < arregloDeVariables.length; a++) {
                console.log('window[arregloDeVariables[a].nombre]');
                console.log(window[arregloDeVariables[a].nombre]);
                var inicializarVariable = true;
                for (var j = 0; j < arregloAgrupacionElementosFormulaPorConexionATabla[i].length; j++) {
                    if(arregloDeVariables[a].ID == arregloAgrupacionElementosFormulaPorConexionATabla[i][j].variable.ID) {
                        for (var b = 0; b < arregloDeVariables[a].atributos.length; b++) {
                            if(arregloDeVariables[a].atributos[b].ID == arregloAgrupacionElementosFormulaPorConexionATabla[i][j].atributo.ID) {
                                //SOLO ENTRA A LA CONDICION SI EN EL ARREGLO ELEMENTOS AGRUPADOS POR CONEXIONES EL CAMPO PERTENECE A LA CONEXION / TABLA Y ES DEL MISMO NIVEL
                                if(arregloDeVariables[a].atributos[b].nivel == nivelACrear) {
                                    if(inicializarVariable) {
                                        codigo += '\n\t\t//INICIACION VARIABLE: '+arregloDeVariables[a].nombre;
                                        codigo += '\n' + this.codigoIniciacion(arregloDeVariables[a], "variable", {}, '\t\t'); //variable, tipoVariable, atributo
                                        for (var p = 0; p < arregloDeVariables[a].atributos.length; p++) {
                                            codigo += '\n' + this.codigoIniciacion(arregloDeVariables[a], "atributo", arregloDeVariables[a].atributos[p], '\t\t');
                                        };
                                        //SOLO ENTRA UNA VEZ POR VARIABLE
                                        inicializarVariable = false;
                                    }
                                    console.log('1');
                                    console.log(arregloDeVariables[a].atributos[b].segmentoReglas);
                                    for (var p = 0; p < arregloDeVariables[a].atributos[b].segmentoReglas.length; p++) {
                                        //viendo si el segmento de reglas pertenece a la tabla
                                        if(arregloDeVariables[a].atributos[b].segmentoReglas[p].conexionTablaID == arregloConexionesATablas[i].ID) {
                                            codigo += this.crearCodigoSegmentoReglas(arregloDeVariables[a].atributos[b].segmentoReglas[p], arregloDeVariables[a].atributos[b].segmentoReglas[p].reglas, 2, a, b, "arregloResultadosDeTablas[i]");
                                        }
                                    };
                                    codigo += '\n';
                                    //codigo final para guardar nuevo valor en arreglo
                                    if (b == arregloDeVariables[a].atributos.length-1) {
                                        //crear codigo guardar variable hasta llegar al ultimo campo
                                        for (var p = 0; p < arregloDeVariables[a].atributos[b].segmentoReglas.length; p++) {
                                            //viendo si el segmento de reglas pertenece a la tabla
                                            if(arregloDeVariables[a].atributos[b].segmentoReglas[p].conexionTablaID == arregloConexionesATablas[i].ID) {
                                                for (var c = 0; c < arregloDeVariables[a].atributos[b].segmentoReglas[p].reglas.length; c++) {
                                                    for (var d = 0; d < arregloDeVariables[a].atributos[b].formulas.length; d++) {
                                                        if (arregloDeVariables[a].atributos[b].segmentoReglas[p].reglas[c].formulaID == arregloDeVariables[a].atributos[b].formulas[d].ID) {
                                                            codigo += this.agregarCodigoGuardarVariable(arregloDeVariables[a], arregloDeVariables[a].atributos[b], arregloDeVariables[a].atributos[b].formulas[d], arregloDeVariables[a].atributos[b].formulas[d].fuenteDeDatos, 3);
                                                        }
                                                    };
                                                };
                                            }
                                        };
                                    }
                                }
                            }
                        };
                    }
                };
            };
            codigo += '\n\t\t}';
            codigo += '\n\t}\n';
            if(llamarSiguienteNivel) {
                codigo += '\nnivel1();';
            }
        };
        console.log('codigo');
        console.log(codigo);
        return codigo;
    }

    crearCodigoSegmentoReglas (segmentoReglas, reglas, tabs, posicionVariable, posicionCampo, nombreReferenciaArregloEnCodigo) {
        var codigo = '';
        var tabsText = '';
        for (var i = 0; i < tabs; i++) {
            tabsText+='\t';
        };
        for (var n = 0; n < reglas.length; n++) {
            if(reglas[n].reglaPadreID == -1) {
                var resultado = this.arregloCodigoRegla(reglas[n], tabs, posicionVariable, posicionCampo, [], reglas, nombreReferenciaArregloEnCodigo);
                if(resultado.length > 0)
                    resultado[0].codigo = "\n"+resultado[0].codigo;
                //$.merge( prestamosCuerpo, resultado );
                for (var i = 0; i < resultado.length; i++) {
                    codigo += resultado[i].codigo;
                };
            }
        };
        return codigo;
    }

    agregarCodigoGuardarVariable (variable, campo, formulas, elementoFormula, tabs) {
        var codigo = '';
        var tabsText = '';
        for (var i = 0; i < tabs; i++) {
            tabsText+='\t';
        };
        //ver si elementoFormula es asignacion de columna
        for (var i = 0; i < elementoFormula.length; i++) {
            if (elementoFormula[i].operacion.toLowerCase().localeCompare("asig") == 0) {
                codigo += '\n'+tabsText+'if ('+variable.nombre+'GU4RD4RV4L0R'+') {';
                if(variable.esObjeto) {
                    codigo += '\n'+tabsText+'\twindow["'+variable.nombre+'"].push('+variable.nombre+'NU3V0);';
                } else {
                    codigo += '\n'+tabsText+'\twindow["'+variable.nombre+'"] = '+variable.nombre+'NU3V0;';
                }
                codigo += '\n'+tabsText+'}';

            }
        };
        return codigo;
    }

    crearNivel (llamarSiguienteNivel, arregloAgrupacionElementosFormulaPorVariables, nivelACrear) {
        //la creacion del codigo en esta parte pertenece a los campos que tienen asignacion unica de columna de tabla, y asignacion unica de columna de tabla con operacion como SUM, COUNT ect
        var codigo = [];
        for (var i = 0; i < arregloDeVariables.length; i++) {
            if(codigo[i] == undefined)
                codigo[i] = {cabecera: '', codigo: ''};
            if(i > 0)
                codigo[i].cabecera += '\n';
            codigo[i].cabecera += '\t//CODIGO TABLA: '+arregloConexionesATablas[i].nombre;
            codigo[i].cabecera += '\n\tfor ( var x = 0; x < window["'+arregloConexionesATablas[i].nombre+'"].length; x++) {';
            /*codigo[i].cabecera += '\n\tfor ( var i = 0; i < arregloConexionesATablas.length; i++) {';
            codigo[i].cabecera += '\n\t\tfor ( var j = 0; j < arregloResultadosDeTablas[i].length; j++) {';*/
            for (var a = 0; a < arregloDeVariables.length; a++) {
                console.log('window[arregloDeVariables[a].nombre]');
                console.log(window[arregloDeVariables[a].nombre]);
                var inicializarVariable = true;
                for (var j = 0; j < arregloAgrupacionElementosFormulaPorVariables[a].length; j++) {
                    //PARA ESA VARIABLE, EXISTE UN SEGMENTO DE REGLA DE OTRA VARIABLE QUE LA OCUPA PARA EL CALCULO
                    if(arregloDeVariables[a].ID == arregloAgrupacionElementosFormulaPorVariables[a][j].variable.ID) {
                        for (var b = 0; b < arregloDeVariables[a].atributos.length; b++) {
                            if(arregloDeVariables[a].atributos[b].ID == arregloAgrupacionElementosFormulaPorVariables[a][j].atributo.ID) {
                                //SOLO ENTRA A LA CONDICION SI EN EL ARREGLO ELEMENTOS AGRUPADOS POR CONEXIONES EL CAMPO PERTENECE A LA CONEXION / TABLA Y ES DEL MISMO NIVEL
                                if(arregloDeVariables[a].atributos[b].nivel == nivelACrear) {
                                    if(inicializarVariable) {
                                        codigo[i].codigo += '\n\t\t//INICIACION VARIABLE: '+arregloDeVariables[a].nombre;
                                        codigo[i].codigo += '\n' + this.codigoIniciacion(arregloDeVariables[a], "variable", {}, '\t\t'); //variable, tipoVariable, atributo
                                        for (var p = 0; p < arregloDeVariables[a].atributos.length; p++) {
                                            codigo[i].codigo += '\n' + this.codigoIniciacion(arregloDeVariables[a], "atributo", arregloDeVariables[a].atributos[p], '\t\t');
                                        };
                                        //SOLO ENTRA UNA VEZ POR VARIABLE
                                        inicializarVariable = false;
                                    }
                                    for (var p = 0; p < arregloDeVariables[a].atributos[b].segmentoReglas.length; p++) {
                                        //viendo si el segmento de reglas pertenece a la tabla
                                        if(arregloDeVariables[a].atributos[b].segmentoReglas[p].conexionTablaID == arregloConexionesATablas[i].ID) {
                                            codigo[i].codigo += this.crearCodigoSegmentoReglas(arregloDeVariables[a].atributos[b].segmentoReglas[p], arregloDeVariables[a].atributos[b].segmentoReglas[p].reglas, 2, a, b, 'window["'+arregloConexionesATablas[i].nombre+'"]');
                                        }
                                    };
                                    codigo[i].codigo += '\n';
                                    //codigo final para guardar nuevo valor en arreglo
                                    if (b == arregloDeVariables[a].atributos.length-1) {
                                        //crear codigo guardar variable hasta llegar al ultimo campo
                                        for (var p = 0; p < arregloDeVariables[a].atributos[b].segmentoReglas.length; p++) {
                                            //viendo si el segmento de reglas pertenece a la tabla
                                            if(arregloDeVariables[a].atributos[b].segmentoReglas[p].conexionTablaID == arregloConexionesATablas[i].ID) {
                                                for (var c = 0; c < arregloDeVariables[a].atributos[b].segmentoReglas[p].reglas.length; c++) {
                                                    for (var d = 0; d < arregloDeVariables[a].atributos[b].formulas.length; d++) {
                                                        if (arregloDeVariables[a].atributos[b].segmentoReglas[p].reglas[c].formulaID == arregloDeVariables[a].atributos[b].formulas[d].ID) {
                                                            codigo[i].codigo += this.agregarCodigoGuardarVariable(arregloDeVariables[a], arregloDeVariables[a].atributos[b], arregloDeVariables[a].atributos[b].formulas[d], arregloDeVariables[a].atributos[b].formulas[d].fuenteDeDatos, 3);
                                                        }
                                                    };
                                                };
                                            }
                                        };
                                    }
                                }
                            }
                        };
                    }
                };
            };
            //codigo[i].codigo += '\n\t}';
            codigo[i].codigo += '\n\t}\n';
            if(llamarSiguienteNivel) {
                codigo[i].codigo += '\n\tnivel'+nivelACrear+1+'();\n';
            }
        };
        console.log('codigo');
        console.log(codigo);
        return codigo;
    }

    arregloCodigoRegla (regla, tabs, posicionVariable, posicionCampo, arreglo, arregloDeReglas, nombreReferenciaArregloEnCodigo) {
        var tabsText = '';
        for (var i = 0; i < tabs; i++) {
            tabsText+='\t';
        };
        var posicionesIF = [];
        console.log('regla');
        console.log(regla);
        if(!regla.esCondicion) {
            //asignaciones
            //si no es condicion, la variable de referencia se le agrega NU3V0 que hace referencia al objeto temporal vacio
            if(regla.operacion.indexOf('ASIG') == 0) {
                //trayendo formula correcta
                var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                console.log('1');
                if(formula.length > 0) {
                    console.log('1.1');
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined) {", tipo: "ASIG"});
                    arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+";", tipo: "ASIG"});
                    arreglo.push({codigo: "\n\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"GU4RD4RV4L0R = true;", tipo: "BANDERA_ASIG"});
                    arreglo.push({codigo: "\n"+tabsText+"}", tipo: "ASIG"});
                }
            } else if(regla.operacion.indexOf('MAX') == 0) {
                //trayendo formula correcta
                var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                if(formula.length > 0) {
                    //este tipo de operacion siempre sera una formula con un elemento de formula
                    if(arregloDeVariables[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("date") == 0) {
                        isValidDate
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined)", tipo: "MAX"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+".getTime() < "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+".getTime())", tipo: "MAX"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+".getTime() < "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+".getTime())", tipo: "MAX"});
                        arreglo.push({codigo: "\n\t\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" = new Date("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+");", tipo: "MAX"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+"}", tipo: "MAX"});
                        arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                    } else if(arregloDeVariables[posicionVariable].atributos[posicionCampo].tipo.toLowerCase().localeCompare("int") == 0) {
                        arreglo.push({codigo: tabsText+"if ("+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+" != undefined)", tipo: "MAX"});
                        arreglo.push({codigo: "\n\t"+tabsText+"if ("+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" < "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla+")", tipo: "MAX"});
                        arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[0].nombreColumnaEnTabla, tipo: "MAX"});
                        arreglo.push({codigo: "\n\t"+tabsText+"}", tipo: "MAX"});
                        arreglo.push({codigo: "\n"+tabsText+"}", tipo: "MAX"});
                    }
                }
            } else if(regla.operacion.indexOf('MIN') == 0) {
            } else if(regla.operacion.indexOf('PROM') == 0) {
            } else if(regla.operacion.indexOf('SUM') == 0) {
            } else if(regla.operacion.indexOf('FORMULA') == 0) {
                var formula = arregloDeVariables[posicionVariable].atributos[posicionCampo].formulas.filter(function( formula ) {
                    return regla.formulaID == formula.ID;
                });
                for (var i = 0; i < formula[0].fuenteDeDatos.length; i++) {
                    var saltoLinea = '';
                    if(i > 0)
                        saltoLinea = '\n';
                    console.log('formula[0].fuenteDeDatos[i]')
                    console.log(formula[0].fuenteDeDatos[i])
                    if(formula[0].fuenteDeDatos[i].operacion != undefined && formula[0].fuenteDeDatos[i].operacion.length > 0) {
                        if(formula[0].fuenteDeDatos[i].esFuenteDeDato) {
                            //elemento formula es de conexion de tabla
                            if(i > 0) {
                                arreglo.push({codigo: saltoLinea+tabsText+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[i].nombreColumnaEnTabla+";", tipo: "FORMULA"});
                            } else {
                                arreglo.push({codigo: saltoLinea+tabsText+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+"[x]."+formula[0].fuenteDeDatos[i].nombreColumnaEnTabla+";", tipo: "FORMULA"});
                            }
                        } else {
                            if (!arregloDeVariables[posicionVariable].esObjeto) {
                                //elemento formula es variable primitiva
                                if(i > 0) {
                                    arreglo.push({codigo: saltoLinea+tabsText+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+";", tipo: "FORMULA"});
                                } else {
                                    arreglo.push({codigo: saltoLinea+tabsText+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+";", tipo: "FORMULA"});
                                }
                            } else {
                                if(i > 0) {
                                    arreglo.push({codigo: saltoLinea+tabsText+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+"[x]."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+";", tipo: "FORMULA"});
                                } else {
                                    arreglo.push({codigo: saltoLinea+tabsText+"var "+formula[0].fuenteDeDatos[i].nombreVariable+" = "+nombreReferenciaArregloEnCodigo+"[x]."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+";", tipo: "FORMULA"});
                                }
                            }
                        }
                    }
                };
                //arreglo.push({codigo: "\n\t\t"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" = math.eval(formula[0].formula);"});
                arreglo.push({codigo: "\n"+tabsText+arregloDeVariables[posicionVariable].nombre+"NU3V0."+arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre+" = "+formula[0].formula+";"});
            }
        } else {
            //condiciones if
            var arregloValoresAComparar = [regla.valor];
            var nombreCampoDeArregloEnCodigo = '';
            if(regla.esConexionTabla) {
                nombreCampoDeArregloEnCodigo = regla.nombreColumnaEnTabla;
            } else {
                nombreCampoDeArregloEnCodigo = arregloDeVariables[posicionVariable].atributos[posicionCampo].nombre;
            }
            var tamArreglo = arreglo.length;
            for (var j = 0; j < tamArreglo; j++) {
                for (var i = 0; i < arregloValoresAComparar.length; i++) {
                    var comparacion = "";
                    if (regla.tipoCampoObjetivo.localeCompare("date") == 0) {
                        if(regla.operacion.localeCompare("encuentra") == 0) {
                            //
                        } else if(regla.operacion.localeCompare("no_encuentra") == 0) {
                            //
                        } else {
                            comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+".getTime() "+regla.operacion+" "+arregloValoresAComparar;
                        }
                    } else if (regla.tipoCampoObjetivo.localeCompare("varchar") == 0) {
                        if(regla.operacion.localeCompare("encuentra") == 0) {
                            //
                        } else if(regla.operacion.localeCompare("no_encuentra") == 0) {
                            //
                        } else {
                            comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+".localeCompare('"+arregloValoresAComparar+"') "+regla.operacion+" 0";
                        }
                    } else if (regla.tipoCampoObjetivo.localeCompare("int") == 0 || regla.tipoCampoObjetivo.localeCompare("decimal") == 0) {
                        if(regla.operacion.localeCompare("encuentra") == 0) {
                            //
                        } else if(regla.operacion.localeCompare("no_encuentra") == 0) {
                            //
                        } else {
                            comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" "+regla.operacion+" "+arregloValoresAComparar;
                        }
                    } else if (regla.tipoCampoObjetivo.localeCompare("bit") == 0) {
                        comparacion = nombreReferenciaArregloEnCodigo+"[x]."+nombreCampoDeArregloEnCodigo+" "+regla.operacion+" "+arregloValoresAComparar;
                    }
                    if(i+1 == arregloValoresAComparar.length) {
                        comparacion += " ) {";
                    }
                    if(i==0) {
                        arreglo[j].codigo += comparacion;
                    } else {
                        arreglo[j].codigo += " && "+comparacion;
                    }
                };
            };
            posicionesIF.push(arreglo.length);
        }

        /*if(regla.valor.indexOf('LISTA') == 0) {
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
        }*/

        var cuerpo = arregloDeReglas.filter(function( object ) {
            return object.reglaPadre == regla.ID;
        });
        if(cuerpo.length > 0) {
            var arregloCuerpo = [];
            for (var i = 0; i < cuerpo.length; i++) {
                var cuantasTabs = tabs;
                if(regla.esCondicion)
                    cuantasTabs++;
                var retorno = this.arregloCodigoRegla(regla, tabs+1, posicionVariable, posicionCampo, arreglo, arregloDeReglas);
                retorno[0].codigo = "\n"+retorno[0].codigo;
                $.merge( arregloCuerpo, retorno );
            };
            for (var i = 0; i < posicionesIF.length; i++) {
                arreglo.splice(posicionesIF[i], 0, ...arregloCuerpo);
                if(regla.esCondicion)
                    arreglo.splice(posicionesIF[i]+arregloCuerpo.length, 0, {codigo: "\n"+tabsText+"}", filtro: regla.filtro});
                for (var j = i; j < posicionesIF.length; j++) {
                    posicionesIF[j]+=arregloCuerpo.length;
                };
            };
            if(posicionesIF.length == 0)
                $.merge( arreglo, arregloCuerpo );
            return arreglo;
        } else {
            if(regla.esCondicion){
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
                operacion.localeCompare("SUM") == 0 ) {
                return true;
            }
        };
        return false;
    }

    //elementoFormula: objeto elementoFormula
    codigoElementosFormula (elementoFormula, tabSpaces, objetoEnTabla, instanciacion) {
        var columnasDeTablaSeleccionadas = this.getColumnasDeTablaSeleccionadas(elementoFormula);
        if(elementoFormula.operacion.length == 0 && columnasDeTablaSeleccionadas.length == 1) {
            this.codigoElementosFormulaAsignacion();
        } else if(elementoFormula.operacion.length > 0 && columnasDeTablaSeleccionadas.length == 1) {
            this.codigoElementosFormulaAsignacionOperacion();
        } else {
            this.codigoElementosFormulaGlobal();
        }
    }

    codigoElementosFormulaAsignacion (elementoFormula, tabSpaces, objetoEnTabla, instanciacion) {
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

    codigoElementosFormulaAsignacionOperacion (elementoFormula, tabSpaces, objetoEnTabla, instanciacion) {
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

    codigoElementosFormulaGlobal (elementoFormula, tabSpaces, objetoEnTabla, instanciacion) {
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

    guardarVariablesCalculadas () {
        for (var a = 0; a < arregloDeVariables.length; a++) {
            //arregloDeVariables[a]
            this.crearTablaDeResultadoCodigo(arregloDeVariables[a]);
            /*for (var b = 0; b < arregloDeVariables[a].atributos.length; b++) {
                //arregloDeVariables[a].atributos[b]
            };*/
        };
    }

    /*verificarSiExisteVariableEnResultadosHistoricos (variable) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ResultadosNombreVariables where nombreVariable = "+variable.nombre+" and finVigencia is null", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            //existe
                        } else {
                            //no existe
                        }
                    });
                }
            });
        }); // fin transaction
    }*/

    crearTablaDeResultadoCodigo (variable) {
        var codigo = '';
        //nombre tabla
        codigo += "\tvar nombreTabla = variable.nombre+'_'+new Date().getFullYear()+'_'+new Date().getMonth()+'_'+new Date().getDate();";
        console.log('========================')
        console.log('NOMBRE')
        console.log(variable.nombre+'_'+new Date().getFullYear()+'_'+new Date().getMonth()+'_'+new Date().getDate())
        console.log('========================')
        codigo += "\n\tconst table = new sql.Table(nombreTabla);";
        codigo += "\n\ttable.create = true;";
        for (var i = 0; i < variable.atributos.length; i++) {
            if(variable.atributos[i].tipo.localeCompare("int") == 0) {
                codigo += "\n\ttable.columns.add("+variable.atributos[i].nombre+", sql.Int, {nullable: true});";
            } else if(variable.atributos[i].tipo.localeCompare("decimal") == 0) {
                codigo += "\n\ttable.columns.add("+variable.atributos[i].nombre+", sql.Decimal, {nullable: true});";
            } else if(variable.atributos[i].tipo.localeCompare("varchar") == 0) {
                codigo += "\n\ttable.columns.add("+variable.atributos[i].nombre+", sql.VarChar(1000), {nullable: true});";
            } else if(variable.atributos[i].tipo.localeCompare("bit") == 0) {
                codigo += "\n\ttable.columns.add("+variable.atributos[i].nombre+", sql.Bit, {nullable: true});";
            } else if(variable.atributos[i].tipo.localeCompare("date") == 0) {
                codigo += "\n\ttable.columns.add("+variable.atributos[i].nombre+", sql.Date, {nullable: true});";
            }
        };
        codigo += "\n\tfor (var i = 0; i < window["+variable.nombre+"].length; i++) {";
        codigo += "\n\t\ttable.rows.add(";
            for (var j = 0; j < variable.atributos.length; j++) {
                codigo += "window["+variable.nombre+"][i]."+variable.atributos[j].nombre;
                if(j+1 < variable.atributos.length)
                    codigo += ", ";
            };
        codigo += ");";
        codigo += "\n\t};";
        //table.rows.add(777, 'test')
         
        codigo += "\n\tconst request = new sql.Request();";
        codigo += "\n\trequest.bulk(table, (err, result) => {";
            codigo += "\n\t\tif(err != undefined) {";
                codigo += "\n\t\t\tconsole.log(err);";
            codigo += "\n\t\t}";
        codigo += "\n\t});";
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
