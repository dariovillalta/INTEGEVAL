import React from 'react';
import sql from 'mssql';

var nivelMaximoVariables = 0;
var arregloDeFuentesDeDatos = [];                           //Arreglo con el nombre de los campos o fuentes de datos
var arregloDeVariables = [];                                //Arreglo con el nombre de las variables
var arregloDeResultadosDeFuenteDeDatos = [];                //Arreglo con los valores de las tablas de fuentes de datos
var arregloConecionesATablas = [];                          //Arreglo con los valores para poder conetarse a las tablas

var banderaImportacionConecionesATablasINICIO = 0;           //Bandera para saber si termino de importar los valores para poder conetarse a las tablas
var banderaImportacionConecionesATablasFIN = 0;              //Bandera para saber si termino de importar los valores para poder conetarse a las tablas
var banderaImportacionResultadosDeFuenteDeDatosINICIO = 0;   //Bandera para saber si termino de importar los valores de las tablas de fuentes de datos
var banderaImportacionResultadosDeFuenteDeDatosFIN = 0;      //Bandera para saber si termino de importar los valores de las tablas de fuentes de datos

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
        this.traerCampos = this.traerCampos.bind(this);
        this.traerVariables = this.traerVariables.bind(this);
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
                        this.traerCampos();
                    });
                }
            });
        }); // fin transaction
    }

    traerCampos() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Campos", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        arregloDeFuentesDeDatos = result.recordset;
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
                        this.inicioTraerConeccionesATablas();
                    });
                }
            });
        }); // fin transaction
    }

    inicioTraerConeccionesATablas () {
        banderaImportacionConecionesATablasINICIO = 0;
        banderaImportacionConecionesATablasFIN = 0;
        arregloConecionesATablas = [];
        for (var i = 0; i < arregloDeFuentesDeDatos.length; i++) {
            if(this.noHaSidoImportadaConeccion(arregloDeFuentesDeDatos[i])) {
                banderaImportacionConecionesATablasFIN++;
                this.traerConeccionesATablas(arregloDeFuentesDeDatos[i].tablaID);
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

    traerConeccionesATablas (tablaID) {
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
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        banderaImportacionConecionesATablasINICIO++;
                        if(result.recordset.length > 0)
                            arregloConecionesATablas = arregloConecionesATablas.concat(result.recordset);
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
        banderaImportacionResultadosDeFuenteDeDatosINICIO = 0;
        banderaImportacionResultadosDeFuenteDeDatosFIN = 0;
        arregloDeResultadosDeFuenteDeDatos = [];
        for (var i = 0; i < arregloConecionesATablas.length; i++) {
            banderaImportacionResultadosDeFuenteDeDatosFIN++;
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
                banderaImportacionResultadosDeFuenteDeDatosINICIO++;
                if(result.recordset != undefined && result.recordset.length > 0)
                    arregloDeResultadosDeFuenteDeDatos.splice(index, 0, result.recordset);
                this.finTraerResultadosDeFuenteDeDatos();
            });
        }); // fin pool connect
    }

    finTraerResultadosDeFuenteDeDatos () {
        if(banderaImportacionResultadosDeFuenteDeDatosINICIO == banderaImportacionResultadosDeFuenteDeDatosFIN) {
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
