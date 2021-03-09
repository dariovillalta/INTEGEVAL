"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _fs = _interopRequireDefault(require("fs"));

var _Modal = _interopRequireDefault(require("./Modal/Modal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var arregloHTMLFormas = [];

var LoginPage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LoginPage, _React$Component);

  function LoginPage(props) {
    var _this;

    _classCallCheck(this, LoginPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LoginPage).call(this, props));
    _this.state = {
      showModal: false,
      showModalForma: false,
      htmlForma: '',
      tituloVariableForma: ''
    };
    _this.login = _this.login.bind(_assertThisInitialized(_this));
    _this.probarExistenciaTablas = _this.probarExistenciaTablas.bind(_assertThisInitialized(_this));
    _this.existeTabla = _this.existeTabla.bind(_assertThisInitialized(_this));
    _this.crearTablaRiesgos = _this.crearTablaRiesgos.bind(_assertThisInitialized(_this));
    _this.crearTablaIndicadores = _this.crearTablaIndicadores.bind(_assertThisInitialized(_this));
    _this.crearTablaElementoIndicador = _this.crearTablaElementoIndicador.bind(_assertThisInitialized(_this));
    _this.crearTablaIndicadoresCampos = _this.crearTablaIndicadoresCampos.bind(_assertThisInitialized(_this));
    _this.crearTablaFormulasIndicadoresCampos = _this.crearTablaFormulasIndicadoresCampos.bind(_assertThisInitialized(_this));
    _this.crearTablaElementoFormulasIndicadoresCampos = _this.crearTablaElementoFormulasIndicadoresCampos.bind(_assertThisInitialized(_this));
    _this.crearTablaSegmentoReglasIndicadores = _this.crearTablaSegmentoReglasIndicadores.bind(_assertThisInitialized(_this));
    _this.crearTablaReglasIndicadores = _this.crearTablaReglasIndicadores.bind(_assertThisInitialized(_this));
    _this.crearTablaVariables = _this.crearTablaVariables.bind(_assertThisInitialized(_this));
    _this.crearTablaVariablesCampos = _this.crearTablaVariablesCampos.bind(_assertThisInitialized(_this));
    _this.crearTablaFormulasVariablesCampos = _this.crearTablaFormulasVariablesCampos.bind(_assertThisInitialized(_this));
    _this.crearTablaElementoFormulasVariablesCampos = _this.crearTablaElementoFormulasVariablesCampos.bind(_assertThisInitialized(_this));
    _this.crearTablaInstruccionSQLCampos = _this.crearTablaInstruccionSQLCampos.bind(_assertThisInitialized(_this));
    _this.crearTablaInstruccionSQL = _this.crearTablaInstruccionSQL.bind(_assertThisInitialized(_this));
    _this.crearTablaResultadosNombreVariables = _this.crearTablaResultadosNombreVariables.bind(_assertThisInitialized(_this));
    _this.crearTablaResultadosNombreIndicadores = _this.crearTablaResultadosNombreIndicadores.bind(_assertThisInitialized(_this));
    _this.crearTablaResultadosNombreRiesgos = _this.crearTablaResultadosNombreRiesgos.bind(_assertThisInitialized(_this));
    _this.crearTablaPeriodicidadCalculo = _this.crearTablaPeriodicidadCalculo.bind(_assertThisInitialized(_this));
    _this.crearTablaTablas = _this.crearTablaTablas.bind(_assertThisInitialized(_this));
    _this.crearTablaSegmentoReglasVariables = _this.crearTablaSegmentoReglasVariables.bind(_assertThisInitialized(_this));
    _this.crearTablaReglasVariables = _this.crearTablaReglasVariables.bind(_assertThisInitialized(_this));
    _this.crearExcelArchivos = _this.crearExcelArchivos.bind(_assertThisInitialized(_this));
    _this.crearExcelVariables = _this.crearExcelVariables.bind(_assertThisInitialized(_this));
    _this.crearFormasVariables = _this.crearFormasVariables.bind(_assertThisInitialized(_this));
    _this.crearUmbral = _this.crearUmbral.bind(_assertThisInitialized(_this));
    _this.crearSeccionUmbral = _this.crearSeccionUmbral.bind(_assertThisInitialized(_this));
    _this.crearRangoSeccionUmbral = _this.crearRangoSeccionUmbral.bind(_assertThisInitialized(_this));
    _this.crearBitacora = _this.crearBitacora.bind(_assertThisInitialized(_this));
    _this.crearDashboard = _this.crearDashboard.bind(_assertThisInitialized(_this));
    _this.crearSeccionDashboard = _this.crearSeccionDashboard.bind(_assertThisInitialized(_this));
    _this.crearListas = _this.crearListas.bind(_assertThisInitialized(_this));
    _this.crearVariablesdeLista = _this.crearVariablesdeLista.bind(_assertThisInitialized(_this));
    _this.crearUsuarios = _this.crearUsuarios.bind(_assertThisInitialized(_this));
    _this.crearPermisosUsuarios = _this.crearPermisosUsuarios.bind(_assertThisInitialized(_this));
    _this.crearUsuarioAdmin = _this.crearUsuarioAdmin.bind(_assertThisInitialized(_this));
    _this.showModal = _this.showModal.bind(_assertThisInitialized(_this));
    _this.closeModal = _this.closeModal.bind(_assertThisInitialized(_this));
    _this.saveFile = _this.saveFile.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(LoginPage, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.pool == null && this.props.pool != null) {
        var self = this;
        setTimeout(function () {
          self.probarExistenciaTablas(false);
        }, 500);
      }
    }
  }, {
    key: "login",
    value: function login() {
      var _this2 = this;

      if (this.props.conexionAbierta) {
        var username = $('#username').val();
        var password = $('#password').val();
        /*if(username.localeCompare("admin") == 0) {
            if(password.localeCompare("password111!") == 0) {
                this.props.login("Admin", "admin");
            }
        }*/

        if (username.length > 0) {
          if (password.length > 0) {
            var transaction = new _mssql["default"].Transaction(this.props.pool);
            transaction.begin(function (err) {
              var rolledBack = false;
              transaction.on('rollback', function (aborted) {
                // emited with aborted === true
                rolledBack = true;
              });
              var request = new _mssql["default"].Request(transaction);
              request.query("select * from Usuarios where usuario = '" + username + "' and contrasena = '" + password + "'", function (err, result) {
                if (err) {
                  console.log(err);

                  _this2.props.showMessage("Error", "Error en conección con la tabla de Usuarios.", true, false);

                  if (!rolledBack) {
                    transaction.rollback(function (err) {});
                  }
                } else {
                  transaction.commit(function (err) {
                    // ... error checks
                    if (result.recordset.length > 0) {
                      var usuario = result.recordset[0];

                      var _transaction = new _mssql["default"].Transaction(_this2.props.pool);

                      _transaction.begin(function (err) {
                        var rolledBack = false;

                        _transaction.on('rollback', function (aborted) {
                          rolledBack = true;
                        });

                        var request = new _mssql["default"].Request(_transaction);
                        request.query("select * from PermisosUsuarios where usuarioID = " + usuario.ID, function (err, result) {
                          if (err) {
                            if (!rolledBack) {
                              console.log(err);

                              _this2.props.showMessage("Error", "Ingrese al traer permisos de usuario.", true, false);

                              _transaction.rollback(function (err) {});
                            }
                          } else {
                            _transaction.commit(function (err) {
                              if (result.recordset.length > 0) _this2.props.login(usuario.ID, usuario.nombreCompleto, result.recordset[0]);else _this2.props.login(usuario.ID, usuario.nombreCompleto, {
                                variable: '',
                                indicador: '',
                                riesgo: '',
                                riesgoIntegral: '',
                                usuario: '',
                                lista: '',
                                alarma: ''
                              });
                            });
                          }
                        });
                      }); // fin transaction

                    } else {
                      _this2.props.showMessage("Error", "Usuario ó contraseña incorrecta.", true, false);
                    }
                  });
                }
              });
            }); // fin transaction
          } else {
            this.props.showMessage("Error", "Ingrese un valor para la contraseña.", true, false);
          }
        } else {
          this.props.showMessage("Error", "Ingrese un valor para el usuario.", true, false);
        }
      } else {
        this.props.showMessage("Error", "La conexion con la base de datos no ha sido realizada.", true, false);
      }
    }
  }, {
    key: "probarExistenciaTablas",
    value: function probarExistenciaTablas(mostrarExito) {
      if (this.props.pool != null) {
        //Riesgos
        this.existeTabla("Riesgos", mostrarExito); //Indicadores

        this.existeTabla("Indicadores", mostrarExito); //ElementoIndicador

        this.existeTabla("ElementoIndicador", mostrarExito); //IndicadoresCampos

        this.existeTabla("IndicadoresCampos", mostrarExito); //FormulasIndicadoresCampos

        this.existeTabla("FormulasIndicadoresCampos", mostrarExito); //ElementoFormulasIndicadoresCampos

        this.existeTabla("ElementoFormulasIndicadoresCampos", mostrarExito); //SegmentoReglasIndicadores

        this.existeTabla("SegmentoReglasIndicadores", mostrarExito); //ReglasIndicadores

        this.existeTabla("ReglasIndicadores", mostrarExito); //Variables

        this.existeTabla("Variables", mostrarExito); //VariablesCampos

        this.existeTabla("VariablesCampos", mostrarExito); //FormulasVariablesCampos

        this.existeTabla("FormulasVariablesCampos", mostrarExito); //ElementoFormulasVariablesCampos

        this.existeTabla("ElementoFormulasVariablesCampos", mostrarExito); //InstruccionSQLCampos

        this.existeTabla("InstruccionSQLCampos", mostrarExito); //InstruccionSQL

        this.existeTabla("InstruccionSQL", mostrarExito); //ResultadosNombreVariables

        this.existeTabla("ResultadosNombreVariables", mostrarExito); //ResultadosNombreIndicadores

        this.existeTabla("ResultadosNombreIndicadores", mostrarExito); //ResultadosNombreRiesgos

        this.existeTabla("ResultadosNombreRiesgos", mostrarExito); //PeriodicidadCalculo

        this.existeTabla("PeriodicidadCalculo", mostrarExito); //Tablas

        this.existeTabla("Tablas", mostrarExito); //SegmentoReglasVariables

        this.existeTabla("SegmentoReglasVariables", mostrarExito); //ReglasVariables

        this.existeTabla("ReglasVariables", mostrarExito); //ExcelArchivos

        this.existeTabla("ExcelArchivos", mostrarExito); //ExcelVariables

        this.existeTabla("ExcelVariables", mostrarExito); //FormasVariables

        this.existeTabla("FormasVariables", mostrarExito); //Umbral

        this.existeTabla("Umbral", mostrarExito); //SeccionUmbral

        this.existeTabla("SeccionUmbral", mostrarExito); //RangoSeccionUmbral

        this.existeTabla("RangoSeccionUmbral", mostrarExito); //Bitacora

        this.existeTabla("Bitacora", mostrarExito); //Dashboard

        this.existeTabla("Dashboard", mostrarExito); //SeccionDashboard

        this.existeTabla("SeccionDashboard", mostrarExito); //Listas

        this.existeTabla("Listas", mostrarExito); //VariablesdeLista

        this.existeTabla("VariablesdeLista", mostrarExito); //Usuarios

        this.existeTabla("Usuarios", mostrarExito); //PermisosUsuarios
        //this.existeTabla("PermisosUsuarios");
      }
    }
  }, {
    key: "existeTabla",
    value: function existeTabla(nombreTabla, mostrarExito) {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '" + nombreTabla + "'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);

              _this3.props.showMessage("Error", "Error al traer tablas de la base de datos.", true, false);

              if (nombreTabla.localeCompare("Riesgos") == 0 && mostrarExito) {
                _this3.props.showSuccesMessage("Éxito", "Conexión realizada con éxito.");
              }

              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length == 0) {
                //no existe tabla
                if (nombreTabla.localeCompare("Riesgos") == 0) {
                  _this3.crearTablaRiesgos();
                } else if (nombreTabla.localeCompare("Indicadores") == 0) {
                  _this3.crearTablaIndicadores();
                } else if (nombreTabla.localeCompare("ElementoIndicador") == 0) {
                  _this3.crearTablaElementoIndicador();
                } else if (nombreTabla.localeCompare("IndicadoresCampos") == 0) {
                  _this3.crearTablaIndicadoresCampos();
                } else if (nombreTabla.localeCompare("FormulasIndicadoresCampos") == 0) {
                  _this3.crearTablaFormulasIndicadoresCampos();
                } else if (nombreTabla.localeCompare("ElementoFormulasIndicadoresCampos") == 0) {
                  _this3.crearTablaElementoFormulasIndicadoresCampos();
                } else if (nombreTabla.localeCompare("SegmentoReglasIndicadores") == 0) {
                  _this3.crearTablaSegmentoReglasIndicadores();
                } else if (nombreTabla.localeCompare("ReglasIndicadores") == 0) {
                  _this3.crearTablaReglasIndicadores();
                } else if (nombreTabla.localeCompare("Variables") == 0) {
                  _this3.crearTablaVariables();
                } else if (nombreTabla.localeCompare("VariablesCampos") == 0) {
                  _this3.crearTablaVariablesCampos();
                } else if (nombreTabla.localeCompare("FormulasVariablesCampos") == 0) {
                  _this3.crearTablaFormulasVariablesCampos();
                } else if (nombreTabla.localeCompare("ElementoFormulasVariablesCampos") == 0) {
                  _this3.crearTablaElementoFormulasVariablesCampos();
                } else if (nombreTabla.localeCompare("InstruccionSQLCampos") == 0) {
                  _this3.crearTablaInstruccionSQLCampos();
                } else if (nombreTabla.localeCompare("InstruccionSQL") == 0) {
                  _this3.crearTablaInstruccionSQL();
                } else if (nombreTabla.localeCompare("ResultadosNombreVariables") == 0) {
                  _this3.crearTablaResultadosNombreVariables();
                } else if (nombreTabla.localeCompare("ResultadosNombreIndicadores") == 0) {
                  _this3.crearTablaResultadosNombreIndicadores();
                } else if (nombreTabla.localeCompare("ResultadosNombreRiesgos") == 0) {
                  _this3.crearTablaResultadosNombreRiesgos();
                } else if (nombreTabla.localeCompare("PeriodicidadCalculo") == 0) {
                  _this3.crearTablaPeriodicidadCalculo();
                } else if (nombreTabla.localeCompare("Tablas") == 0) {
                  _this3.crearTablaTablas();
                } else if (nombreTabla.localeCompare("SegmentoReglasVariables") == 0) {
                  _this3.crearTablaSegmentoReglasVariables();
                } else if (nombreTabla.localeCompare("ReglasVariables") == 0) {
                  _this3.crearTablaReglasVariables();
                } else if (nombreTabla.localeCompare("ExcelArchivos") == 0) {
                  _this3.crearExcelArchivos();
                } else if (nombreTabla.localeCompare("ExcelVariables") == 0) {
                  _this3.crearExcelVariables();
                } else if (nombreTabla.localeCompare("FormasVariables") == 0) {
                  _this3.crearFormasVariables();
                } else if (nombreTabla.localeCompare("Umbral") == 0) {
                  _this3.crearUmbral();
                } else if (nombreTabla.localeCompare("SeccionUmbral") == 0) {
                  _this3.crearSeccionUmbral();
                } else if (nombreTabla.localeCompare("RangoSeccionUmbral") == 0) {
                  _this3.crearRangoSeccionUmbral();
                } else if (nombreTabla.localeCompare("Bitacora") == 0) {
                  _this3.crearBitacora();
                } else if (nombreTabla.localeCompare("Dashboard") == 0) {
                  _this3.crearDashboard();
                } else if (nombreTabla.localeCompare("SeccionDashboard") == 0) {
                  _this3.crearSeccionDashboard();
                } else if (nombreTabla.localeCompare("Listas") == 0) {
                  _this3.crearListas();
                } else if (nombreTabla.localeCompare("VariablesdeLista") == 0) {
                  _this3.crearVariablesdeLista();
                } else if (nombreTabla.localeCompare("Usuarios") == 0) {
                  _this3.crearUsuarios();
                }
                /* else if(nombreTabla.localeCompare("PermisosUsuarios") == 0) {
                   this.crearPermisosUsuarios();
                }*/

              } else if (nombreTabla.localeCompare("Usuarios") == 0) {
                _this3.crearUsuarioAdmin();
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaRiesgos",
    value: function crearTablaRiesgos() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE Riesgos ( ID int IDENTITY(1,1) PRIMARY KEY, idFormula varchar(100), nombre varchar(500), formula varchar(500), responsable int, peso decimal(8,4) )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla Riesgos creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaIndicadores",
    value: function crearTablaIndicadores() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE Indicadores ( ID int IDENTITY(1,1) PRIMARY KEY, idFormula varchar(100), nombre varchar(500), codigo varchar(100), formula varchar(500), peso decimal(22,4), tolerancia decimal(22,4), valorIdeal decimal(8,4), tipoValorIdeal varchar(20), periodicidad varchar(50), tipoIndicador varchar(20), responsable int, idRiesgoPadre int, fechaInicioCalculo date )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla Indicadores creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaElementoIndicador",
    value: function crearTablaElementoIndicador() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE ElementoIndicador ( ID int IDENTITY(1,1) PRIMARY KEY, indicadorID int, conexionTablaID int, esFuenteDeDato bit, excelArchivoID int, excelVariableID int, formaVariableID int, elementoVariableID int, elementoVariableCampoID int, esValorManual bit, nombreColumnaEnTabla varchar(250), tipoColumnaEnTabla varchar(30), nombreVariable varchar(100), descripcion varchar(500), operacion varchar(30) )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla ElementoIndicador creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaIndicadoresCampos",
    value: function crearTablaIndicadoresCampos() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE IndicadoresCampos ( ID int IDENTITY(1,1) PRIMARY KEY, indicadorID int, nombre varchar(100), tipo varchar(30), nivel int )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla IndicadoresCampos creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaFormulasIndicadoresCampos",
    value: function crearTablaFormulasIndicadoresCampos() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE FormulasIndicadoresCampos ( ID int IDENTITY(1,1) PRIMARY KEY, indicadorID int, indicadorCampoID int, posicionFormulaEnCampo int, formula varchar(500), operacion varchar(30) )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla FormulasIndicadoresCampos creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaElementoFormulasIndicadoresCampos",
    value: function crearTablaElementoFormulasIndicadoresCampos() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE ElementoFormulasIndicadoresCampos ( ID int IDENTITY(1,1) PRIMARY KEY, indicadorID int, indicadorCampoID int, formulaID int, conexionTablaID int, esFuenteDeDato bit, excelArchivoID int, excelVariableID int, formaVariableID int, elementoVariableID int, elementoVariableCampoID int, esValorManual bit, nombreColumnaEnTabla varchar(250), tipoColumnaEnTabla varchar(30), nombreVariable varchar(100), descripcion varchar(500), operacion varchar(30) )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla ElementoFormulasIndicadoresCampos creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaSegmentoReglasIndicadores",
    value: function crearTablaSegmentoReglasIndicadores() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE SegmentoReglasIndicadores ( ID int IDENTITY(1,1) PRIMARY KEY, conexionTablaID int, indicadorID int, indicadorCampoID int,  variableIDCreacionCodigo int, excelArchivoID int, excelVariableID int, formaVariableID int, esValorManual bit, esConexionTabla bit, posicionSegmentoEnCampo int, nivelMax int )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla SegmentoReglasIndicadores creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaReglasIndicadores",
    value: function crearTablaReglasIndicadores() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE ReglasIndicadores ( ID int IDENTITY(1,1) PRIMARY KEY, segmentoReglaID int, indicadorID int, indicadorCampoID int, formulaID int, reglaPadreID int, conexionTablaID int, nombreColumnaEnTabla varchar(250), tipoCampoObjetivo varchar(30), esCondicion bit, esConexionTabla bit, posicionSegmentoEnCampo int, operacion varchar(30), operacionTexto varchar(30), valor varchar(1000), texto varchar(100), nivel int )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla ReglasIndicadores creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaVariables",
    value: function crearTablaVariables() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE Variables ( ID int IDENTITY(1,1) PRIMARY KEY, idFormula varchar(100), nombre varchar(500), descripcion varchar(700), esObjeto bit, esColeccion bit, objetoPadreID int, esInstruccionSQL bit, guardar bit, periodicidad varchar(50), responsable int, categoriaVariable varchar(100), fechaInicioCalculo date )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla Variables creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaVariablesCampos",
    value: function crearTablaVariablesCampos() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE VariablesCampos ( ID int IDENTITY(1,1) PRIMARY KEY, variableID int, nombre varchar(100), tipo varchar(30), nivel int )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla VariablesCampos creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaFormulasVariablesCampos",
    value: function crearTablaFormulasVariablesCampos() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE FormulasVariablesCampos ( ID int IDENTITY(1,1) PRIMARY KEY, variableID int, variableCampoID int, posicionFormulaEnCampo int, formula varchar(500), operacion varchar(30) )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla FormulasVariablesCampos creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaElementoFormulasVariablesCampos",
    value: function crearTablaElementoFormulasVariablesCampos() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE ElementoFormulasVariablesCampos ( ID int IDENTITY(1,1) PRIMARY KEY, variableID int, variableCampoID int, formulaID int, conexionTablaID int, esFuenteDeDato bit, excelArchivoID int, excelVariableID int, formaVariableID int, elementoVariableID int, elementoVariableCampoID int, esValorManual bit, nombreColumnaEnTabla varchar(250), tipoColumnaEnTabla varchar(30), nombreVariable varchar(100), descripcion varchar(500), operacion varchar(30) )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla ElementoFormulasVariablesCampos creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaInstruccionSQLCampos",
    value: function crearTablaInstruccionSQLCampos() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE InstruccionSQLCampos ( ID int IDENTITY(1,1) PRIMARY KEY, variableID int, nombre varchar(100), tipo varchar(30) )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla InstruccionSQLCampos creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaInstruccionSQL",
    value: function crearTablaInstruccionSQL() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE InstruccionSQL ( ID int IDENTITY(1,1) PRIMARY KEY, variableID int, instruccionSQL varchar(1000) )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla InstruccionSQL creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaResultadosNombreVariables",
    value: function crearTablaResultadosNombreVariables() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE ResultadosNombreVariables ( ID int IDENTITY(1,1) PRIMARY KEY, nombreVariable varchar(100), inicioVigencia datetime, finVigencia date, esFuenteDato bit )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla ResultadosNombreVariables creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaResultadosNombreIndicadores",
    value: function crearTablaResultadosNombreIndicadores() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE ResultadosNombreIndicadores ( ID int IDENTITY(1,1) PRIMARY KEY, nombreIndicador varchar(100), inicioVigencia datetime, finVigencia date )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla ResultadosNombreIndicadores creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaResultadosNombreRiesgos",
    value: function crearTablaResultadosNombreRiesgos() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE ResultadosNombreRiesgos( ID int IDENTITY(1,1) PRIMARY KEY, nombreRiesgo varchar(100), inicioVigencia datetime, finVigencia date )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla ResultadosNombreRiesgos creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaPeriodicidadCalculo",
    value: function crearTablaPeriodicidadCalculo() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE PeriodicidadCalculo ( ID int IDENTITY(1,1) PRIMARY KEY, variableID int, tablaVariable varchar(20), fechaInicio date, fechaUltimoCalculo date )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla PeriodicidadCalculo creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaTablas",
    value: function crearTablaTablas() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE Tablas ( ID int IDENTITY(1,1) PRIMARY KEY, nombre varchar(150), usuario varchar(100), contrasena varchar(200), servidor varchar(100), baseDatos varchar(100), tabla varchar(100), tipoConexion varchar(30) )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla Tablas creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaSegmentoReglasVariables",
    value: function crearTablaSegmentoReglasVariables() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE SegmentoReglasVariables ( ID int IDENTITY(1,1) PRIMARY KEY, conexionTablaID int, variableID int, variableCampoID int,  variableIDCreacionCodigo int, excelArchivoID int, excelVariableID int, formaVariableID int, esConexionTabla bit, esValorManual bit, posicionSegmentoEnCampo int, nivelMax int )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla SegmentoReglasVariables creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaReglasVariables",
    value: function crearTablaReglasVariables() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE ReglasVariables ( ID int IDENTITY(1,1) PRIMARY KEY, segmentoReglaID int, variableID int, variableCampoID int, formulaID int, reglaPadreID int, conexionTablaID int, nombreColumnaEnTabla varchar(250), tipoCampoObjetivo varchar(30), esCondicion bit, esConexionTabla bit, posicionSegmentoEnCampo int, operacion varchar(30), operacionTexto varchar(30), valor varchar(1000), texto varchar(100), nivel int )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla ReglasVariables creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearExcelArchivos",
    value: function crearExcelArchivos() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE ExcelArchivos ( ID int IDENTITY(1,1) PRIMARY KEY, ubicacionArchivo varchar(1000), nombre varchar(100) )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              contadorObjetosGuardados++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla ExcelArchivos creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearExcelVariables",
    value: function crearExcelVariables() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE ExcelVariables ( ID int IDENTITY(1,1) PRIMARY KEY, excelArchivoID int, nombreHoja varchar(200), idFormula varchar(100), nombre varchar(500), descripcion varchar(700), operacion varchar(30), celdas varchar(100), tipo varchar(30), periodicidad varchar(50), fechaInicioCalculo date, responsable int, categoriaVariable varchar(100), guardar bit )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla ExcelVariables creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearFormasVariables",
    value: function crearFormasVariables() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE FormasVariables ( ID int IDENTITY(1,1) PRIMARY KEY, idFormula varchar(100), nombre varchar(500), descripcion varchar(700), tipo varchar(30), periodicidad varchar(50), fechaInicioCalculo date, responsable int, categoriaVariable varchar(100), guardar bit )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla FormasVariables creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearUmbral",
    value: function crearUmbral() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE Umbral ( ID int IDENTITY(1,1) PRIMARY KEY, variableID int, tablaVariable varchar(20) )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla Umbral creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearSeccionUmbral",
    value: function crearSeccionUmbral() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE SeccionUmbral ( ID int IDENTITY(1,1) PRIMARY KEY, umbralID int, nombre varchar(100), color varchar(25) )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla SeccionUmbral creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearRangoSeccionUmbral",
    value: function crearRangoSeccionUmbral() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE RangoSeccionUmbral ( ID int IDENTITY(1,1) PRIMARY KEY, umbralID int, seccionUmbralID int, valorMinimo decimal(22, 4), valorMaximo decimal(22, 4) )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla RangoSeccionUmbral creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearBitacora",
    value: function crearBitacora() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE Bitacora ( ID int IDENTITY(1,1) PRIMARY KEY, usuarioID int, nombreUsuario varchar(100), fecha date, descripcion varchar(1000), tipoVariable varchar(30), idVariable int )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla Bitacora creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearDashboard",
    value: function crearDashboard() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE Dashboard ( ID int IDENTITY(1,1) PRIMARY KEY, nombre varchar(100), descripcion varchar(500) )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla Dashboard creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearSeccionDashboard",
    value: function crearSeccionDashboard() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE SeccionDashboard ( ID int IDENTITY(1,1) PRIMARY KEY, dashboardID int, tamano varchar(10), tipoObjeto varchar(10), instruccion varchar(1000) )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla SeccionDashboard creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearListas",
    value: function crearListas() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE Listas ( ID int IDENTITY(1,1) PRIMARY KEY, nombre varchar(40) )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla Listas creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearVariablesdeLista",
    value: function crearVariablesdeLista() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE VariablesdeLista ( ID int IDENTITY(1,1) PRIMARY KEY, listaID int, valor varchar(500), nombre varchar(50), tipo varchar(25) )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla VariablesdeLista creada.");
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearUsuarios",
    value: function crearUsuarios() {
      var _this4 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE Usuarios ( ID int IDENTITY(1,1) PRIMARY KEY, nombreCompleto varchar(100), usuario varchar(25), contrasena varchar(50) )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla Usuarios creada.");

              _this4.crearPermisosUsuarios();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearUsuarioAdmin",
    value: function crearUsuarioAdmin() {
      var _this5 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Usuarios where nombreCompleto = 'Administrador' and usuario = 'ADMIN'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset != undefined && result.recordset.length == 0) {
                var _transaction2 = new _mssql["default"].Transaction(_this5.props.pool);

                _transaction2.begin(function (err) {
                  var rolledBack = false;

                  _transaction2.on('rollback', function (aborted) {
                    rolledBack = true;
                  });

                  var request = new _mssql["default"].Request(_transaction2);
                  request.query("insert into Usuarios ( nombreCompleto, usuario, contrasena ) values ('Administrador', 'ADMIN', '12345') ", function (err, result) {
                    if (err) {
                      if (!rolledBack) {
                        console.log(err);

                        _transaction2.rollback(function (err) {});
                      }
                    } else {
                      _transaction2.commit(function (err) {
                        console.log("Usuario admin creado.");
                        var transaction = new _mssql["default"].Transaction(_this5.props.pool);
                        transaction.begin(function (err) {
                          var rolledBack = false;
                          transaction.on('rollback', function (aborted) {
                            rolledBack = true;
                          });
                          var request = new _mssql["default"].Request(transaction);
                          request.query("select top 1 * from Usuarios order by ID desc", function (err, result) {
                            if (err) {
                              if (!rolledBack) {
                                console.log(err);
                                transaction.rollback(function (err) {});
                              }
                            } else {
                              transaction.commit(function (err) {
                                if (result.recordset.length > 0) {
                                  var _transaction3 = new _mssql["default"].Transaction(_this5.props.pool);

                                  _transaction3.begin(function (err) {
                                    var rolledBack = false;

                                    _transaction3.on('rollback', function (aborted) {
                                      rolledBack = true;
                                    });

                                    var request = new _mssql["default"].Request(_transaction3);
                                    request.query("insert into PermisosUsuarios ( usuarioID, variable, indicador, riesgo, riesgoIntegral, usuario, lista, alarma ) values (" + result.recordset[0].ID + ", 'C/V/E', 'C/V/E', 'C/V/E', 'C/V/E', 'C/V/E', 'C/V/E', 'C/V/E') ", function (err, result) {
                                      if (err) {
                                        if (!rolledBack) {
                                          console.log(err);

                                          _transaction3.rollback(function (err) {});
                                        }
                                      } else {
                                        _transaction3.commit(function (err) {});
                                      }
                                    });
                                  }); // fin transaction

                                }
                              });
                            }
                          });
                        }); // fin transaction
                      });
                    }
                  });
                }); // fin transaction

              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearPermisosUsuarios",
    value: function crearPermisosUsuarios() {
      var _this6 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("CREATE TABLE PermisosUsuarios ( ID int IDENTITY(1,1) PRIMARY KEY, usuarioID int, variable varchar(10), indicador varchar(10), riesgo varchar(10), riesgoIntegral varchar(10), usuario varchar(10), lista varchar(10), alarma varchar(10) )", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("Tabla PermisosUsuarios creada.");

              _this6.crearUsuarioAdmin();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "showModal",
    value: function showModal() {
      this.setState({
        showModal: true
      });
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.setState({
        showModal: false
      });
    }
  }, {
    key: "saveFile",
    value: function saveFile() {
      var user = $("#usuarioConexion").val();
      var password = $("#contrasenaConexion").val();
      var server = $("#servidorConexion").val();
      var database = $("#basedatosConexion").val();

      if (user.length > 0) {
        if (password.length > 0) {
          if (server.length > 0) {
            if (database.length > 0) {
              var writeStream = _fs["default"].createWriteStream('conf.dar');

              writeStream.write(user + "\n");
              writeStream.write(password + "\n");
              writeStream.write(server + "\n");
              writeStream.write(database + "\n");
              writeStream.end(); //this.probarExistenciaTablas();

              var self = this;
              setTimeout(function () {
                self.props.readConfigFile();
              }, 600);
            } else {
              this.props.showMessage("Error", "Ingrese un valor para el nombre de la base de datos.", true, false);
            }
          } else {
            this.props.showMessage("Error", "Ingrese un valor para el servidor de la base de datos.", true, false);
          }
        } else {
          this.props.showMessage("Error", "Ingrese un valor para la contraseña de la base de datos.", true, false);
        }
      } else {
        this.props.showMessage("Error", "Ingrese un valor para el usuario de la base de datos.", true, false);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "splash-container"
      }, _react["default"].createElement("div", {
        className: "card "
      }, _react["default"].createElement("div", {
        className: "card-header text-center"
      }, _react["default"].createElement("img", {
        className: "logo-img",
        src: "./assets/logoTOLOC.png",
        alt: "logo",
        style: {
          maxWidth: "100%",
          height: "auto"
        }
      }), _react["default"].createElement("h1", {
        className: "display-4"
      }, "TOLOC INTEGRAL"), _react["default"].createElement("span", {
        className: "splash-description"
      }, "Por favor ingrese su informaci\xF3n de usuario.")), _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("input", {
        className: "form-control form-control-lg",
        id: "username",
        type: "text",
        placeholder: "Usuario"
      })), _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("input", {
        className: "form-control form-control-lg",
        id: "password",
        type: "password",
        placeholder: "Contrase\xF1a"
      })), _react["default"].createElement("button", {
        className: "btn btn-primary btn-lg btn-block",
        onClick: this.login
      }, "Iniciar Sesi\xF3n")))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "text-center",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-success active",
        onClick: this.showModal
      }, "Actualizar Configuraci\xF3n de Conexi\xF3n a las Bases de Datos")), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "text-center",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-brand active",
        onClick: function onClick() {
          return _this7.probarExistenciaTablas(true);
        }
      }, "Volver a Intentar Conexi\xF3n a las Bases de Datos")), _react["default"].createElement("br", null), _react["default"].createElement(_Modal["default"], {
        show: this.state.showModal,
        titulo: "Actualizar Configuración de Conexión a las Bases de Datos",
        onClose: this.closeModal
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "usuarioConexion",
        className: "col-form-label"
      }, "Nombre de Usuario de la Base de Datos")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("input", {
        id: "usuarioConexion",
        type: "text",
        className: "form-control form-control-sm"
      }))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "contrasenaConexion",
        className: "col-form-label"
      }, "Contrase\xF1a de la Base de Datos")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("input", {
        id: "contrasenaConexion",
        type: "text",
        className: "form-control form-control-sm"
      }))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "servidorConexion",
        className: "col-form-label"
      }, "Servidor de la Base de Datos")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("input", {
        id: "servidorConexion",
        type: "text",
        className: "form-control form-control-sm"
      }))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "basedatosConexion",
        className: "col-form-label"
      }, "Nombre de la Base de Datos")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("input", {
        id: "basedatosConexion",
        type: "text",
        className: "form-control form-control-sm"
      }))), _react["default"].createElement("div", {
        className: "text-center",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-brand active",
        onClick: this.saveFile
      }, "Guardar Configuraci\xF3n"))));
    }
  }]);

  return LoginPage;
}(_react["default"].Component);

exports["default"] = LoginPage;
//# sourceMappingURL=LoginPage.js.map
