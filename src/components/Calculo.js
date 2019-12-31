import React from 'react';
import sql from 'mssql';

var nivelMaximoVariables = 0;
var arregloDeFuentesDeDatos = [];                           //Arreglo con las fuentes de datos
        //objeto: {tablaID, nombre, descripcion, esObjeto, objetoPadreID, guardar, nivel, [arreglo de atributos]}
            //objeto arreglo de atributos: {nombre, tipo, formula}
var arregloDeVariables = [];                                //Arreglo con las variables
        //objeto: {nombre, descripcion, esObjeto, objetoPadreID, guardar, nivel, [arreglo de atributos]}
            //objeto arreglo de atributos: {nombre, tipo, formula}
var arregloDeResultadosDeFuenteDeDatos = [];                //Arreglo con los valores de las tablas de fuentes de datos
var arregloConecionesATablas = [];                          //Arreglo con los valores para poder conetarse a las tablas

var banderaImportacionCamposFuenteDatosINICIO = 0;           //Bandera para saber si termino de importar los campos de las fuentes de datos
var banderaImportacionCamposFuenteDatosFIN = 0;              //Bandera para saber si termino de importar los campos de las fuentes de datos
var banderaImportacionCamposVariablesINICIO = 0;           //Bandera para saber si termino de importar los campos de las variables
var banderaImportacionCamposVariablesFIN = 0;              //Bandera para saber si termino de importar los campos de las variables
var banderaImportacionConecionesATablasINICIO = 0;           //Bandera para saber si termino de importar los valores para poder conetarse a las tablas
var banderaImportacionConecionesATablasFIN = 0;              //Bandera para saber si termino de importar los valores para poder conetarse a las tablas
var banderaImportacionValoresDeTablasDeFuenteDeDatosINICIO = 0;   //Bandera para saber si termino de importar los valores de las tablas de fuentes de datos
var banderaImportacionValoresDeTablasDeFuenteDeDatosFIN = 0;      //Bandera para saber si termino de importar los valores de las tablas de fuentes de datos

const myWorker = new Worker("./components/CalculoVariablesWorker.js");

export default class Calculo extends React.Component {
    constructor(props) {
        super(props);
        /*this.state = {
            showLoadingScreen: false,
            mensajeLoadingScreen: ''
        }*/
        this.iniciarCalculo = this.iniciarCalculo.bind(this);
        this.getNivelMaximoCampos = this.getNivelMaximoCampos.bind(this);
        this.getNivelMaximoVariables = this.getNivelMaximoVariables.bind(this);
        this.traerFuenteDatos = this.traerFuenteDatos.bind(this);
        this.traerAtributosFuenteDatos = this.traerAtributosFuenteDatos.bind(this);
        this.revisarFinImportacionCamposFuenteDatos = this.revisarFinImportacionCamposFuenteDatos.bind(this);
        this.traerVariables = this.traerVariables.bind(this);
        this.traerAtributosVariables = this.traerAtributosVariables.bind(this);
        this.revisarFinImportacionCamposVariables = this.revisarFinImportacionCamposVariables.bind(this);
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
        this.getNivelMaximoCampos();
    }

    getNivelMaximoCampos() {
        nivelMaximoVariables = 0;
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select MAX(nivel) AS nivel from Campos", (err, result) => {
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
                        this.getNivelMaximoVariables();
                    });
                }
            });
        }); // fin transaction
    }

    getNivelMaximoVariables() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select MAX(nivel) AS nivel from Variables", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0 && nivelMaximoVariables < result.recordset[0].nivel) {
                            nivelMaximoVariables = result.recordset[0].nivel;
                        }
                        arregloDeFuentesDeDatos = [];
                        this.traerFuenteDatos();
                    });
                }
            });
        }); // fin transaction
    }

    traerFuenteDatos() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from FuenteDatos", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        arregloDeFuentesDeDatos = result.recordset;
                        banderaImportacionCamposFuenteDatosINICIO = 0;
                        banderaImportacionCamposFuenteDatosFIN = arregloDeFuentesDeDatos.length;
                        for (var i = 0; i < arregloDeFuentesDeDatos.length; i++) {
                            this.traerAtributosFuenteDatos(arregloDeFuentesDeDatos[i].ID, i);
                        };
                    });
                }
            });
        }); // fin transaction
    }

    traerAtributosFuenteDatos (fuenteDatoID, index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from FuenteDatosCampos where fuenteDatoID = "+fuenteDatoID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        banderaImportacionCamposFuenteDatosINICIO++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionCamposFuenteDatosINICIO++;
                        arregloDeFuentesDeDatos[index].atributos = result.recordset;
                        this.revisarFinImportacionCamposFuenteDatos();
                    });
                }
            });
        }); // fin transaction
    }

    revisarFinImportacionCamposFuenteDatos () {
        if(banderaImportacionCamposFuenteDatosINICIO == banderaImportacionCamposFuenteDatosFIN) {
            arregloDeVariables = [];
            this.traerVariables();
        }
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
            request.query("select * from FuenteDatosCampos where variableID = "+variableID, (err, result) => {
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
            this.inicioTraerConeccionesATablas();
        }
    }

    inicioTraerConeccionesATablas () {
        banderaImportacionConecionesATablasINICIO = 0;
        banderaImportacionConecionesATablasFIN = 0;
        arregloConecionesATablas = [];
        for (var i = 0; i < arregloDeFuentesDeDatos.length; i++) {
            if(this.noHaSidoImportadaConeccion(arregloDeFuentesDeDatos[i])) {
                banderaImportacionConecionesATablasFIN++;
                //para asegurar que ID no sea asyncrono
                arregloConecionesATablas[i].push({ID: arregloDeFuentesDeDatos[i].tablaID});
                this.traerConeccionesATablas(arregloDeFuentesDeDatos[i].tablaID, i);
            }
        };
    }

    noHaSidoImportadaConeccion (fuenteDeDato) {
        for (var i = 0; i < arregloConecionesATablas.length; i++) {
            if(arregloConecionesATablas[i].ID == fuenteDeDato.tablaID) {
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
                            arregloConecionesATablas[indexARemplazar] = arregloConecionesATablas.concat(result.recordset);
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
        arregloDeResultadosDeFuenteDeDatos = [];
        for (var i = 0; i < arregloConecionesATablas.length; i++) {
            banderaImportacionValoresDeTablasDeFuenteDeDatosFIN++;
            this.traerResultadosDeFuenteDeDatos(arregloConecionesATablas[i]);
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
                    arregloDeResultadosDeFuenteDeDatos.splice(index, 0, result.recordset);
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
        console.log('arregloDeResultadosDeFuenteDeDatos');
        console.log(arregloDeResultadosDeFuenteDeDatos);
        console.log('arregloConecionesATablas');
        console.log(arregloConecionesATablas);
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
