import React from 'react';
import sql from 'mssql';
import fs from 'fs';

import Modal from './Modal/Modal.js';

var arregloHTMLFormas = [];

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showModalForma: false,
            htmlForma: '',
            tituloVariableForma: ''
        }
        this.login = this.login.bind(this);
        this.probarExistenciaTablas = this.probarExistenciaTablas.bind(this);
        this.existeTabla = this.existeTabla.bind(this);
        this.crearTablaRiesgos = this.crearTablaRiesgos.bind(this);
        this.crearTablaIndicadores = this.crearTablaIndicadores.bind(this);
        this.crearTablaElementoIndicador = this.crearTablaElementoIndicador.bind(this);
        this.crearTablaIndicadoresCampos = this.crearTablaIndicadoresCampos.bind(this);
        this.crearTablaFormulasIndicadoresCampos = this.crearTablaFormulasIndicadoresCampos.bind(this);
        this.crearTablaElementoFormulasIndicadoresCampos = this.crearTablaElementoFormulasIndicadoresCampos.bind(this);
        this.crearTablaSegmentoReglasIndicadores = this.crearTablaSegmentoReglasIndicadores.bind(this);
        this.crearTablaReglasIndicadores = this.crearTablaReglasIndicadores.bind(this);
        this.crearTablaVariables = this.crearTablaVariables.bind(this);
        this.crearTablaVariablesCampos = this.crearTablaVariablesCampos.bind(this);
        this.crearTablaFormulasVariablesCampos = this.crearTablaFormulasVariablesCampos.bind(this);
        this.crearTablaElementoFormulasVariablesCampos = this.crearTablaElementoFormulasVariablesCampos.bind(this);
        this.crearTablaInstruccionSQLCampos = this.crearTablaInstruccionSQLCampos.bind(this);
        this.crearTablaInstruccionSQL = this.crearTablaInstruccionSQL.bind(this);
        this.crearTablaResultadosNombreVariables = this.crearTablaResultadosNombreVariables.bind(this);
        this.crearTablaResultadosNombreIndicadores = this.crearTablaResultadosNombreIndicadores.bind(this);
        this.crearTablaResultadosNombreRiesgos = this.crearTablaResultadosNombreRiesgos.bind(this);
        this.crearTablaResultadosIndicadoresInt = this.crearTablaResultadosIndicadoresInt.bind(this);
        this.crearTablaResultadosIndicadoresDecimal = this.crearTablaResultadosIndicadoresDecimal.bind(this);
        this.crearTablaResultadosIndicadoresDate = this.crearTablaResultadosIndicadoresDate.bind(this);
        this.crearTablaResultadosIndicadoresBool = this.crearTablaResultadosIndicadoresBool.bind(this);
        this.crearTablaResultadosIndicadoresString = this.crearTablaResultadosIndicadoresString.bind(this);
        this.crearTablaPeriodicidadCalculo = this.crearTablaPeriodicidadCalculo.bind(this);
        this.crearTablaTablas = this.crearTablaTablas.bind(this);
        this.crearTablaSegmentoReglasVariables = this.crearTablaSegmentoReglasVariables.bind(this);
        this.crearTablaReglasVariables = this.crearTablaReglasVariables.bind(this);
        this.crearExcelArchivos = this.crearExcelArchivos.bind(this);
        this.crearExcelVariables = this.crearExcelVariables.bind(this);
        this.crearFormasVariables = this.crearFormasVariables.bind(this);
        this.crearUmbral = this.crearUmbral.bind(this);
        this.crearSeccionUmbral = this.crearSeccionUmbral.bind(this);
        this.crearRangoSeccionUmbral = this.crearRangoSeccionUmbral.bind(this);

        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveFile = this.saveFile.bind(this);
    }

    componentDidMount() {
        this.probarExistenciaTablas();
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        if(prevProps.pool == null && this.props.pool != null) {
            var self = this;
            setTimeout(function(){
                self.probarExistenciaTablas();
            }, 500);
        }
    }

    login () {
        /*var username = $('#username').val();
        var password = $('#password').val();
        if(username.localeCompare("admin") == 0) {
            if(password.localeCompare("password111!") == 0) {
                this.props.login("Admin", "admin");
            }
        }
        if(username.length > 0){
            if(password.length > 0){
                const transaction = new sql.Transaction( this.props.pool );
                transaction.begin(err => {
                    var rolledBack = false;
                    transaction.on('rollback', aborted => {
                        // emited with aborted === true
                        rolledBack = true;
                    });
                    const request = new sql.Request(transaction);
                    request.query("select * from Usuarios where usuario = '"+ username +"' and contrasena = '"+ password +"'", (err, result) => {
                        if (err) {
                            console.log(err);
                            if (!rolledBack) {
                                transaction.rollback(err => {
                                    alert("Error en conección con la tabla de Usuarios.");
                                });
                            }
                        }  else {
                            transaction.commit(err => {
                                // ... error checks
                                if(result.recordset.length > 0) {
                                    var usuario = result.recordset[0];*/
                                    //Cookie Username
                                    //this.props.login(usuario.nombreCompleto, usuario.tipoUsuario);
                                    this.props.login("Dario Villalta", "admin");
                                /*} else {
                                    alert("Usuario ó contraseña incorrecta.");
                                }
                            });
                        }
                    });
                }); // fin transaction
            } else {
                alert("Ingrese un valor para la contraseña.");
            }
        } else {
            alert("Ingrese un valor para el usuario.");
        }*/
    }

    probarExistenciaTablas () {
        if(this.props.pool != null) {
            //Riesgos
            this.existeTabla("Riesgos");
            //Indicadores
            this.existeTabla("Indicadores");
            //ElementoIndicador
            this.existeTabla("ElementoIndicador");
            //IndicadoresCampos
            this.existeTabla("IndicadoresCampos");
            //FormulasIndicadoresCampos
            this.existeTabla("FormulasIndicadoresCampos");
            //ElementoFormulasIndicadoresCampos
            this.existeTabla("ElementoFormulasIndicadoresCampos");
            //SegmentoReglasIndicadores
            this.existeTabla("SegmentoReglasIndicadores");
            //ReglasIndicadores
            this.existeTabla("ReglasIndicadores");
            //Variables
            this.existeTabla("Variables");
            //VariablesCampos
            this.existeTabla("VariablesCampos");
            //FormulasVariablesCampos
            this.existeTabla("FormulasVariablesCampos");
            //ElementoFormulasVariablesCampos
            this.existeTabla("ElementoFormulasVariablesCampos");
            //InstruccionSQLCampos
            this.existeTabla("InstruccionSQLCampos");
            //InstruccionSQL
            this.existeTabla("InstruccionSQL");
            //ResultadosNombreVariables
            this.existeTabla("ResultadosNombreVariables");
            //ResultadosNombreIndicadores
            this.existeTabla("ResultadosNombreIndicadores");
            //ResultadosNombreRiesgos
            this.existeTabla("ResultadosNombreRiesgos");
            //ResultadosIndicadoresInt
            this.existeTabla("ResultadosIndicadoresInt");
            //ResultadosIndicadoresDecimal
            this.existeTabla("ResultadosIndicadoresDecimal");
            //ResultadosIndicadoresDate
            this.existeTabla("ResultadosIndicadoresDate");
            //ResultadosIndicadoresBool
            this.existeTabla("ResultadosIndicadoresBool");
            //ResultadosIndicadoresString
            this.existeTabla("ResultadosIndicadoresString");
            //PeriodicidadCalculo
            this.existeTabla("PeriodicidadCalculo");
            //Tablas
            this.existeTabla("Tablas");
            //SegmentoReglasVariables
            this.existeTabla("SegmentoReglasVariables");
            //ReglasVariables
            this.existeTabla("ReglasVariables");
            //ExcelArchivos
            this.existeTabla("ExcelArchivos");
            //ExcelVariables
            this.existeTabla("ExcelVariables");
            //FormasVariables
            this.existeTabla("FormasVariables");
            //Umbral
            this.existeTabla("Umbral");
            //SeccionUmbral
            this.existeTabla("SeccionUmbral");
            //RangoSeccionUmbral
            this.existeTabla("RangoSeccionUmbral");
        }
    }

    existeTabla (nombreTabla) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '"+nombreTabla+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if (result.recordset.length == 0) {
                            //no existe tabla
                            if(nombreTabla.localeCompare("Riesgos") == 0) {
                                this.crearTablaRiesgos();
                            } else if(nombreTabla.localeCompare("Indicadores") == 0) {
                                this.crearTablaIndicadores();
                            } else if(nombreTabla.localeCompare("ElementoIndicador") == 0) {
                                this.crearTablaElementoIndicador();
                            } else if(nombreTabla.localeCompare("IndicadoresCampos") == 0) {
                                this.crearTablaIndicadoresCampos();
                            } else if(nombreTabla.localeCompare("FormulasIndicadoresCampos") == 0) {
                                this.crearTablaFormulasIndicadoresCampos();
                            } else if(nombreTabla.localeCompare("ElementoFormulasIndicadoresCampos") == 0) {
                                this.crearTablaElementoFormulasIndicadoresCampos();
                            } else if(nombreTabla.localeCompare("SegmentoReglasIndicadores") == 0) {
                                this.crearTablaSegmentoReglasIndicadores();
                            } else if(nombreTabla.localeCompare("ReglasIndicadores") == 0) {
                                this.crearTablaReglasIndicadores();
                            } else if(nombreTabla.localeCompare("Variables") == 0) {
                                this.crearTablaVariables();
                            } else if(nombreTabla.localeCompare("VariablesCampos") == 0) {
                                this.crearTablaVariablesCampos();
                            } else if(nombreTabla.localeCompare("FormulasVariablesCampos") == 0) {
                                this.crearTablaFormulasVariablesCampos();
                            } else if(nombreTabla.localeCompare("ElementoFormulasVariablesCampos") == 0) {
                                this.crearTablaElementoFormulasVariablesCampos();
                            } else if(nombreTabla.localeCompare("InstruccionSQLCampos") == 0) {
                                this.crearTablaInstruccionSQLCampos();
                            } else if(nombreTabla.localeCompare("InstruccionSQL") == 0) {
                                this.crearTablaInstruccionSQL();
                            } else if(nombreTabla.localeCompare("ResultadosNombreVariables") == 0) {
                                this.crearTablaResultadosNombreVariables();
                            } else if(nombreTabla.localeCompare("ResultadosNombreIndicadores") == 0) {
                                this.crearTablaResultadosNombreIndicadores();
                            } else if(nombreTabla.localeCompare("ResultadosNombreRiesgos") == 0) {
                                this.crearTablaResultadosNombreRiesgos();
                            } else if(nombreTabla.localeCompare("ResultadosIndicadoresInt") == 0) {
                                this.crearTablaResultadosIndicadoresInt();
                            } else if(nombreTabla.localeCompare("ResultadosIndicadoresDecimal") == 0) {
                                this.crearTablaResultadosIndicadoresDecimal();
                            } else if(nombreTabla.localeCompare("ResultadosIndicadoresDate") == 0) {
                                this.crearTablaResultadosIndicadoresDate();
                            } else if(nombreTabla.localeCompare("ResultadosIndicadoresBool") == 0) {
                                this.crearTablaResultadosIndicadoresBool();
                            } else if(nombreTabla.localeCompare("ResultadosIndicadoresString") == 0) {
                                this.crearTablaResultadosIndicadoresString();
                            } else if(nombreTabla.localeCompare("PeriodicidadCalculo") == 0) {
                                this.crearTablaPeriodicidadCalculo();
                            } else if(nombreTabla.localeCompare("Tablas") == 0) {
                                this.crearTablaTablas();
                            } else if(nombreTabla.localeCompare("SegmentoReglasVariables") == 0) {
                                this.crearTablaSegmentoReglasVariables();
                            } else if(nombreTabla.localeCompare("ReglasVariables") == 0) {
                                this.crearTablaReglasVariables();
                            } else if(nombreTabla.localeCompare("ExcelArchivos") == 0) {
                                this.crearExcelArchivos();
                            } else if(nombreTabla.localeCompare("ExcelVariables") == 0) {
                                this.crearExcelVariables();
                            } else if(nombreTabla.localeCompare("FormasVariables") == 0) {
                                this.crearFormasVariables();
                            } else if(nombreTabla.localeCompare("Umbral") == 0) {
                                this.crearUmbral();
                            } else if(nombreTabla.localeCompare("SeccionUmbral") == 0) {
                                this.crearSeccionUmbral();
                            } else if(nombreTabla.localeCompare("RangoSeccionUmbral") == 0) {
                                this.crearRangoSeccionUmbral();
                            }
                        }
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaRiesgos () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE Riesgos ( ID int IDENTITY(1,1) PRIMARY KEY, nombre varchar(100), formula varchar(500), peso decimal(8,4) )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla Riesgos creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaIndicadores () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE Indicadores ( ID int IDENTITY(1,1) PRIMARY KEY, nombre varchar(100), codigo varchar(100), formula varchar(500), peso decimal(8,4), tolerancia decimal(8,4), tipoTolerancia varchar(20), valorIdeal decimal(8,4), tipoValorIdeal varchar(20), periodicidad varchar(50), tipoIndicador varchar(20), analista varchar(100), idRiesgoPadre int, fechaInicioCalculo date )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla Indicadores creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaElementoIndicador () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE ElementoIndicador ( ID int IDENTITY(1,1) PRIMARY KEY, indicadorID int, conexionTablaID int, esFuenteDeDato bit, excelArchivoID int, excelVariableID int, formaVariableID int, elementoVariableID int, elementoVariableCampoID int, nombreColumnaEnTabla varchar(250), tipoColumnaEnTabla varchar(30), nombreVariable varchar(100), descripcion varchar(500), operacion varchar(30) )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla ElementoIndicador creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaIndicadoresCampos () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE IndicadoresCampos ( ID int IDENTITY(1,1) PRIMARY KEY, indicadorID int, nombre varchar(100), tipo varchar(30), nivel int )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla IndicadoresCampos creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaFormulasIndicadoresCampos () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE FormulasIndicadoresCampos ( ID int IDENTITY(1,1) PRIMARY KEY, indicadorID int, indicadorCampoID int, posicionFormulaEnCampo int, formula varchar(500), operacion varchar(30) )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla FormulasIndicadoresCampos creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaElementoFormulasIndicadoresCampos () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE ElementoFormulasIndicadoresCampos ( ID int IDENTITY(1,1) PRIMARY KEY, indicadorID int, indicadorCampoID int, formulaID int, conexionTablaID int, esFuenteDeDato bit, excelArchivoID int, excelVariableID int, formaVariableID int, elementoVariableID int, elementoVariableCampoID int, nombreColumnaEnTabla varchar(250), tipoColumnaEnTabla varchar(30), nombreVariable varchar(100), descripcion varchar(500), operacion varchar(30) )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla ElementoFormulasIndicadoresCampos creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaSegmentoReglasIndicadores () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE SegmentoReglasIndicadores ( ID int IDENTITY(1,1) PRIMARY KEY, conexionTablaID int, indicadorID int, indicadorCampoID int,  variableIDCreacionCodigo int, excelArchivoID int, excelVariableID int, formaVariableID int, esConexionTabla bit, posicionSegmentoEnCampo int, nivelMax int )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla SegmentoReglasIndicadores creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaReglasIndicadores () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE ReglasIndicadores ( ID int IDENTITY(1,1) PRIMARY KEY, segmentoReglaID int, indicadorID int, indicadorCampoID int, formulaID int, reglaPadreID int, conexionTablaID int, nombreColumnaEnTabla varchar(250), tipoCampoObjetivo varchar(30), esCondicion bit, esConexionTabla bit, posicionSegmentoEnCampo int, operacion varchar(30), operacionTexto varchar(30), valor varchar(1000), texto varchar(100), nivel int )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla ReglasIndicadores creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaVariables () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE Variables ( ID int IDENTITY(1,1) PRIMARY KEY, nombre varchar(100), descripcion varchar(700), esObjeto bit, objetoPadreID int, esInstruccionSQL bit, guardar bit, periodicidad varchar(50), analista varchar(100), fechaInicioCalculo date )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla Variables creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaVariablesCampos () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE VariablesCampos ( ID int IDENTITY(1,1) PRIMARY KEY, variableID int, nombre varchar(100), tipo varchar(30), nivel int )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla VariablesCampos creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaFormulasVariablesCampos () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE FormulasVariablesCampos ( ID int IDENTITY(1,1) PRIMARY KEY, variableID int, variableCampoID int, posicionFormulaEnCampo int, formula varchar(500), operacion varchar(30) )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla FormulasVariablesCampos creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaElementoFormulasVariablesCampos () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE ElementoFormulasVariablesCampos ( ID int IDENTITY(1,1) PRIMARY KEY, variableID int, variableCampoID int, formulaID int, conexionTablaID int, esFuenteDeDato bit, excelArchivoID int, excelVariableID int, formaVariableID int, elementoVariableID int, elementoVariableCampoID int, nombreColumnaEnTabla varchar(250), tipoColumnaEnTabla varchar(30), nombreVariable varchar(100), descripcion varchar(500), operacion varchar(30) )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla ElementoFormulasVariablesCampos creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaInstruccionSQLCampos () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE InstruccionSQLCampos ( ID int IDENTITY(1,1) PRIMARY KEY, variableID int, nombre varchar(100), tipo varchar(30) )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla InstruccionSQLCampos creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaInstruccionSQL () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE InstruccionSQL ( ID int IDENTITY(1,1) PRIMARY KEY, variableID int, instruccionSQL varchar(1000) )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla InstruccionSQL creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaResultadosNombreVariables () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE ResultadosNombreVariables ( ID int IDENTITY(1,1) PRIMARY KEY, nombreVariable varchar(100), inicioVigencia datetime, finVigencia date, esFuenteDato bit )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla ResultadosNombreVariables creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaResultadosNombreIndicadores () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE ResultadosNombreIndicadores ( ID int IDENTITY(1,1) PRIMARY KEY, nombreIndicador varchar(100), inicioVigencia datetime, finVigencia date )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla ResultadosNombreIndicadores creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaResultadosNombreRiesgos () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE ResultadosNombreRiesgos( ID int IDENTITY(1,1) PRIMARY KEY, nombreRiesgo varchar(100), inicioVigencia datetime, finVigencia date )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla ResultadosNombreRiesgos creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaResultadosIndicadoresInt () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE ResultadosIndicadoresInt( ID int IDENTITY(1,1) PRIMARY KEY, indicadorID int, nombre varchar(100), fecha date, valor int )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla ResultadosIndicadoresInt creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaResultadosIndicadoresDecimal () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE ResultadosIndicadoresDecimal( ID int IDENTITY(1,1) PRIMARY KEY, indicadorID int, nombre varchar(100), fecha date, valor decimal(22,4) )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla ResultadosIndicadoresDecimal creada.");
                    });
                }
            });
        }); // fin transaction
    }
    
    crearTablaResultadosIndicadoresDate () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE ResultadosIndicadoresDate( ID int IDENTITY(1,1) PRIMARY KEY, indicadorID int, nombre varchar(100), fecha date, valor date )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla ResultadosIndicadoresDate creada.");
                    });
                }
            });
        }); // fin transaction
    }
    
    crearTablaResultadosIndicadoresBool () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE ResultadosIndicadoresBool( ID int IDENTITY(1,1) PRIMARY KEY, indicadorID int, nombre varchar(100), fecha date, valor bit )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla ResultadosIndicadoresBool creada.");
                    });
                }
            });
        }); // fin transaction
    }
    
    crearTablaResultadosIndicadoresString () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE ResultadosIndicadoresString( ID int IDENTITY(1,1) PRIMARY KEY, indicadorID int, nombre varchar(100), fecha date, valor varchar(2000) )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla ResultadosIndicadoresString creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaPeriodicidadCalculo () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE PeriodicidadCalculo ( ID int IDENTITY(1,1) PRIMARY KEY, variableID int, tablaVariable varchar(20), fechaInicio date, fechaUltimoCalculo date )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla PeriodicidadCalculo creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaTablas () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE Tablas ( ID int IDENTITY(1,1) PRIMARY KEY, nombre varchar(150), usuario varchar(100), contrasena varchar(200), servidor varchar(100), baseDatos varchar(100), tabla varchar(100), tipoConexion varchar(30) )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla Tablas creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaSegmentoReglasVariables () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE SegmentoReglasVariables ( ID int IDENTITY(1,1) PRIMARY KEY, conexionTablaID int, variableID int, variableCampoID int,  variableIDCreacionCodigo int, excelArchivoID int, excelVariableID int, formaVariableID int, esConexionTabla bit, posicionSegmentoEnCampo int, nivelMax int )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla SegmentoReglasVariables creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearTablaReglasVariables () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE ReglasVariables ( ID int IDENTITY(1,1) PRIMARY KEY, segmentoReglaID int, variableID int, variableCampoID int, formulaID int, reglaPadreID int, conexionTablaID int, nombreColumnaEnTabla varchar(250), tipoCampoObjetivo varchar(30), esCondicion bit, esConexionTabla bit, posicionSegmentoEnCampo int, operacion varchar(30), operacionTexto varchar(30), valor varchar(1000), texto varchar(100), nivel int )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla ReglasVariables creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearExcelArchivos () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE ExcelArchivos ( ID int IDENTITY(1,1) PRIMARY KEY, ubicacionArchivo varchar(1000), nombre varchar(100) )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        contadorObjetosGuardados++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla ExcelArchivos creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearExcelVariables () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE ExcelVariables ( ID int IDENTITY(1,1) PRIMARY KEY, excelArchivoID int, nombreHoja varchar(200), nombre varchar(100), operacion varchar(30), celdas varchar(100), tipo varchar(30), periodicidad varchar(50), fechaInicioCalculo date, analista varchar(100), guardar bit )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla ExcelVariables creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearFormasVariables () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE FormasVariables ( ID int IDENTITY(1,1) PRIMARY KEY, nombre varchar(100), tipo varchar(30), periodicidad varchar(50), fechaInicioCalculo date, analista varchar(100), guardar bit )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla FormasVariables creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearUmbral () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE Umbral ( ID int IDENTITY(1,1) PRIMARY KEY, variableID int, tablaVariable varchar(20) )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla Umbral creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearSeccionUmbral () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE SeccionUmbral ( ID int IDENTITY(1,1) PRIMARY KEY, umbralID int, nombre varchar(100), color varchar(25) )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla SeccionUmbral creada.");
                    });
                }
            });
        }); // fin transaction
    }

    crearRangoSeccionUmbral () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("CREATE TABLE RangoSeccionUmbral ( ID int IDENTITY(1,1) PRIMARY KEY, umbralID int, seccionUmbralID int, valorMinimo decimal(22, 4), valorMaximo decimal(22, 4) )", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("Tabla RangoSeccionUmbral creada.");
                    });
                }
            });
        }); // fin transaction
    }

    showModal () {
        this.setState({
            showModal: true
        });
    }

    closeModal () {
        this.setState({
            showModal: false
        });
    }

    saveFile () {
        var user = $("#usuarioConexion").val();
        var password = $("#contrasenaConexion").val();
        var server = $("#servidorConexion").val();
        var database = $("#basedatosConexion").val();
        if(user.length > 0) {
            if(password.length > 0) {
                if(server.length > 0) {
                    if(database.length > 0) {
                        let writeStream = fs.createWriteStream('conf.dar');
                        writeStream.write(user+"\n");
                        writeStream.write(password+"\n");
                        writeStream.write(server+"\n");
                        writeStream.write(database+"\n");
                        writeStream.end();
                        //this.probarExistenciaTablas();
                        var self = this;
                        setTimeout(function() {
                            self.props.readConfigFile();
                        }, 600)
                    } else {
                        alert("Ingrese un valor para el nombre de la base de datos.");
                    }
                } else {
                    alert("Ingrese un valor para el servidor de la base de datos.");
                }
            } else {
                alert("Ingrese un valor para la contraseña de la base de datos.");
            }
        } else {
            alert("Ingrese un valor para el usuario de la base de datos.");
        }
    }

    render() {
        return (
            <div>
                <div className="splash-container">
                    <div className="card ">
                        <div className="card-header text-center">
                            <img className="logo-img" src="./assets/logoTOLOC.png" alt="logo" style={{maxWidth: "100%", height: "auto"}}/>
                            <h1 className="display-4">TOLOC INTEGRAL</h1>
                            <span className="splash-description">Por favor ingrese su informaci&oacute;n de usuario.</span>
                        </div>
                        <div className="card-body">
                                <div className="form-group">
                                    <input className="form-control form-control-lg" id="username" type="text" placeholder="Usuario"/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control form-control-lg" id="password" type="password" placeholder="Contraseña"/>
                                </div>
                                <button className="btn btn-primary btn-lg btn-block" onClick={this.login}>Iniciar Sesi&oacute;n</button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className={"text-center"} style={{width: "100%"}}>
                    <a href="#" className="btn btn-success active" onClick={this.showModal}>Actualizar Configuración de Conexión a las Bases de Datos</a>
                </div>
                <br/>
                <Modal show={this.state.showModal}
                    titulo={"Actualizar Configuración de Conexión a las Bases de Datos"}
                    onClose={this.closeModal}>
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor="usuarioConexion" className="col-form-label">Nombre de Usuario de la Base de Datos</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                <input id="usuarioConexion" type="text" className="form-control form-control-sm"/>
                            </div>
                        </div>
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor="contrasenaConexion" className="col-form-label">Contraseña de la Base de Datos</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                <input id="contrasenaConexion" type="text" className="form-control form-control-sm"/>
                            </div>
                        </div>
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor="servidorConexion" className="col-form-label">Servidor de la Base de Datos</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                <input id="servidorConexion" type="text" className="form-control form-control-sm"/>
                            </div>
                        </div>
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor="basedatosConexion" className="col-form-label">Nombre de la Base de Datos</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                <input id="basedatosConexion" type="text" className="form-control form-control-sm"/>
                            </div>
                        </div>
                        <div className={"text-center"} style={{width: "100%"}}>
                            <a href="#" className="btn btn-brand active" onClick={this.saveFile}>Guardar Configuración</a>
                        </div>
                </Modal>
            </div>
        );
    }
}
