"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _Modal = _interopRequireDefault(require("../../../Modal/Modal.js"));

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

var variables = [];
var excel = [];
var formas = [];
var periodicidad = [{
  nombre: "diario"
}, {
  nombre: "semanal"
}, {
  nombre: "mensual"
}, {
  nombre: "trimestral"
}, {
  nombre: "bi-anual"
}, {
  nombre: "anual"
}];
/*
    **************************************
    **************************************
                VARIABLES CALCULO 
    **************************************
    **************************************
*/

window.arregloDeErroresFormas = [];
window.arregloHTMLFormas = []; //Arreglo que contiene el codigo html de las formas

/*
    **************************************
    **************************************
            VARIABLES CALCULO FIN
    **************************************
    **************************************
*/

var FuenteDatoForma =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FuenteDatoForma, _React$Component);

  function FuenteDatoForma(props) {
    var _this;

    _classCallCheck(this, FuenteDatoForma);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FuenteDatoForma).call(this, props));
    _this.state = {
      nombre: "",
      tipo: "",
      guardar: "",
      valorPeriodicidad: '-1',
      forma: null,
      showModalForma: false,
      tituloVariableForma: "",
      htmlForma: '',
      usuarios: []
    };
    _this.saveBitacora = _this.saveBitacora.bind(_assertThisInitialized(_this));
    _this.crearVariable = _this.crearVariable.bind(_assertThisInitialized(_this));
    _this.traerForma = _this.traerForma.bind(_assertThisInitialized(_this));
    _this.eliminarVarExcel = _this.eliminarVarExcel.bind(_assertThisInitialized(_this));
    _this.eliminarVariable = _this.eliminarVariable.bind(_assertThisInitialized(_this));
    _this.getVariables = _this.getVariables.bind(_assertThisInitialized(_this));
    _this.getExcel = _this.getExcel.bind(_assertThisInitialized(_this));
    _this.getFormas = _this.getFormas.bind(_assertThisInitialized(_this));
    _this.verificarNoExisteNombreVar = _this.verificarNoExisteNombreVar.bind(_assertThisInitialized(_this));
    _this.actualizarPeriodicidad = _this.actualizarPeriodicidad.bind(_assertThisInitialized(_this));
    _this.cargarDatePicker = _this.cargarDatePicker.bind(_assertThisInitialized(_this));
    _this.isValidDate = _this.isValidDate.bind(_assertThisInitialized(_this));
    _this.verificarSiExisteExcelEnResultadosHistoricosModificar = _this.verificarSiExisteExcelEnResultadosHistoricosModificar.bind(_assertThisInitialized(_this));
    _this.crearTablaDeResultadoNombreModificar = _this.crearTablaDeResultadoNombreModificar.bind(_assertThisInitialized(_this));
    _this.crearResultadoNombreModificar = _this.crearResultadoNombreModificar.bind(_assertThisInitialized(_this));
    _this.modificarResultadosNombre = _this.modificarResultadosNombre.bind(_assertThisInitialized(_this));
    _this.verificarPeriodicidadGuardarModificar = _this.verificarPeriodicidadGuardarModificar.bind(_assertThisInitialized(_this));
    _this.updatePeriodicidadModificar = _this.updatePeriodicidadModificar.bind(_assertThisInitialized(_this));
    _this.verificarPeriodicidad = _this.verificarPeriodicidad.bind(_assertThisInitialized(_this));
    _this.addDays = _this.addDays.bind(_assertThisInitialized(_this));
    _this.addMonths = _this.addMonths.bind(_assertThisInitialized(_this));
    _this.addYears = _this.addYears.bind(_assertThisInitialized(_this));
    _this.traerPeriodicidadVariable = _this.traerPeriodicidadVariable.bind(_assertThisInitialized(_this));
    _this.formaCrearVariable = _this.formaCrearVariable.bind(_assertThisInitialized(_this));
    _this.iniciarMostrarFormas = _this.iniciarMostrarFormas.bind(_assertThisInitialized(_this));
    _this.updateForm = _this.updateForm.bind(_assertThisInitialized(_this));
    _this.loadFechas = _this.loadFechas.bind(_assertThisInitialized(_this));
    _this.closeModalForma = _this.closeModalForma.bind(_assertThisInitialized(_this));
    _this.verificarSiExisteFormaEnResultadosHistoricos = _this.verificarSiExisteFormaEnResultadosHistoricos.bind(_assertThisInitialized(_this));
    _this.crearTablaDeResultadoNombreForma = _this.crearTablaDeResultadoNombreForma.bind(_assertThisInitialized(_this));
    _this.crearResultadoNombreForma = _this.crearResultadoNombreForma.bind(_assertThisInitialized(_this));
    _this.guardarResultadosNombreForma = _this.guardarResultadosNombreForma.bind(_assertThisInitialized(_this));
    _this.guardarForma = _this.guardarForma.bind(_assertThisInitialized(_this));
    _this.borrarForma = _this.borrarForma.bind(_assertThisInitialized(_this));
    _this.verificarPeriodicidadGuardar = _this.verificarPeriodicidadGuardar.bind(_assertThisInitialized(_this));
    _this.updatePeriodicidad = _this.updatePeriodicidad.bind(_assertThisInitialized(_this));
    _this.guardarPeriodicidad = _this.guardarPeriodicidad.bind(_assertThisInitialized(_this));
    _this.tieneEspaciosEnBlanco = _this.tieneEspaciosEnBlanco.bind(_assertThisInitialized(_this));
    _this.getUsuarios = _this.getUsuarios.bind(_assertThisInitialized(_this));
    _this.goToTimeline = _this.goToTimeline.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FuenteDatoForma, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.tipoVariableOriginal.localeCompare("forma") == 0) {
        this.traerForma();
      }

      this.getVariables();
      this.getExcel();
      this.getFormas();
      this.getUsuarios();
    }
  }, {
    key: "saveBitacora",
    value: function saveBitacora(fecha, descripcion, tipoVariable, idVariable) {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into Bitacora (usuarioID, nombreUsuario, fecha, descripcion, tipoVariable, idVariable) values (" + _this2.props.userID + ", '" + _this2.props.userName + "', '" + fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + "', '" + descripcion + "', '" + tipoVariable + "', " + idVariable + ")", function (err, result) {
          if (err) {
            console.log(err);

            _this2.props.showMessage("Error", 'No se pudo guardar información de bitacora.', true, false, {});

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {});
          }
        });
      }); // fin transaction
    }
  }, {
    key: "traerForma",
    value: function traerForma() {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from FormasVariables where ID = " + _this3.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                _this3.setState({
                  nombre: result.recordset[0].nombre,
                  tipo: result.recordset[0].tipo,
                  guardar: result.recordset[0].guardar,
                  valorPeriodicidad: result.recordset[0].periodicidad,
                  forma: result.recordset[0]
                });

                $("#nombreVariable").val(result.recordset[0].nombre);
                $("#tipo").val(result.recordset[0].tipo);
                if (result.recordset[0].guardar) $("#guardarVariable").prop('checked', true);else $("#guardarVariable").prop('checked', false);
                $("#periodicidad").val(result.recordset[0].periodicidad);
                $("#responsable").val(result.recordset[0].responsable);

                if (result.recordset[0].fechaInicioCalculo.getFullYear() == 1964 && result.recordset[0].fechaInicioCalculo.getMonth() == 4 && result.recordset[0].fechaInicioCalculo.getDate() == 28) {//
                } else {
                  $("#fecha").datepicker("setDate", result.recordset[0].fechaInicioCalculo);
                }
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearVariable",
    value: function crearVariable() {
      var _this4 = this;

      var nombreVariable = $("#nombreVariable").val();
      var tipo = $("#tipo").val();
      var guardarVariable;
      if ($("#guardarVariable").is(':checked')) guardarVariable = true;else guardarVariable = false;
      var periodicidad = $("#periodicidad").val();
      var fecha;
      if (periodicidad.localeCompare("-1") == 0) fecha = new Date(1964, 4, 28);else fecha = $("#fecha").datepicker('getDate');
      var responsable = $("#responsable").val();
      var categoriaVariable = $("#categoriaVariable").val();

      if (nombreVariable.length > 0 && nombreVariable.length < 1001) {
        if (!this.tieneEspaciosEnBlanco(nombreVariable)) {
          if (this.verificarNoExisteNombreVar(nombreVariable)) {
            if (tipo.length > 0 && tipo.length < 1001) {
              if (periodicidad.length > 0 && periodicidad.length < 51) {
                if (this.isValidDate(fecha)) {
                  if (responsable.length > 0 && responsable.length < 101) {
                    if (categoriaVariable.length > 0 && responsable.length < 101) {
                      if (this.props.tipoVariableOriginal.localeCompare("excel") == 0) {
                        this.eliminarVarExcel();
                      }

                      if (this.props.tipoVariableOriginal.localeCompare("variable") == 0) {
                        this.eliminarVariable();
                      }

                      if (this.props.tipoVariableOriginal.localeCompare("forma") != 0) {
                        var transaction = new _mssql["default"].Transaction(this.props.pool);
                        transaction.begin(function (err) {
                          var rolledBack = false;
                          transaction.on('rollback', function (aborted) {
                            rolledBack = true;
                          });
                          var request = new _mssql["default"].Request(transaction);
                          request.query("insert into FormasVariables (nombre, tipo, periodicidad, fechaInicioCalculo, responsable, categoriaVariable, guardar) values ('" + nombreVariable + "', '" + tipo + "', '" + periodicidad + "', '" + fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + "', '" + responsable + "', '" + categoriaVariable + "', '" + guardarVariable + "')", function (err, result) {
                            if (err) {
                              console.log(err);

                              if (!rolledBack) {
                                transaction.rollback(function (err) {});
                              }
                            } else {
                              transaction.commit(function (err) {
                                alert("Variable Modificada");

                                _this4.getFormas();

                                _this4.props.actualizarIDVariableModificada("forma");

                                var forma = {
                                  nombreVariable: nombreVariable,
                                  tipo: tipo,
                                  guardarVariable: guardarVariable,
                                  periodicidad: periodicidad,
                                  fecha: fecha,
                                  responsable: responsable
                                };

                                _this4.verificarSiExisteExcelEnResultadosHistoricosModificar(forma);

                                _this4.props.getFormas();
                              });
                            }
                          });
                        }); // fin transaction
                      } else {
                        var _transaction = new _mssql["default"].Transaction(this.props.pool);

                        _transaction.begin(function (err) {
                          var rolledBack = false;

                          _transaction.on('rollback', function (aborted) {
                            rolledBack = true;
                          });

                          var request = new _mssql["default"].Request(_transaction);
                          request.query("update FormasVariables set nombre = '" + nombreVariable + "', tipo = '" + tipo + "', periodicidad = '" + periodicidad + "', guardar = '" + guardarVariable + "', fechaInicioCalculo = '" + fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + "', responsable = '" + responsable + "', categoriaVariable = '" + categoriaVariable + "' where ID = " + _this4.props.idVariable, function (err, result) {
                            if (err) {
                              console.log(err);

                              if (!rolledBack) {
                                _transaction.rollback(function (err) {});
                              }
                            } else {
                              _transaction.commit(function (err) {
                                alert("Variable Modificada");

                                _this4.getFormas();

                                var forma = {
                                  nombreVariable: nombreVariable,
                                  tipo: tipo,
                                  guardarVariable: guardarVariable,
                                  periodicidad: periodicidad,
                                  fecha: fecha,
                                  responsable: responsable
                                };

                                _this4.verificarSiExisteExcelEnResultadosHistoricosModificar(forma);

                                _this4.props.getFormas();
                              });
                            }
                          });
                        }); // fin transaction

                      }
                    } else {
                      alert('Ingrese un valor para la categoria de variable que debe ser menor a 101 caracteres');
                    }
                  } else {
                    alert('Ingrese un valor para el responsable que debe ser menor a 101 caracteres');
                  }
                } else {
                  alert('Ingrese un valor para la fecha');
                }
              } else {
                alert('Ingrese un valor para el valor de periodicidad que debe ser menor a 51 caracteres');
              }
            } else {
              alert('Ingrese un valor para el tipo de la variable que debe ser menor a 31 caracteres');
            }
          } else {
            alert('El nombre de la variable debe ser único.');
          }
        } else {
          alert('El nombre de la variable no debe contener espacios en blanco');
        }
      } else {
        alert('Ingrese un valor para el nombre de la variable que debe ser menor a 101 caracteres');
      }
    }
  }, {
    key: "eliminarVarExcel",
    value: function eliminarVarExcel() {
      var _this5 = this;

      var transaction1 = new _mssql["default"].Transaction(this.props.pool);
      transaction1.begin(function (err) {
        var rolledBack = false;
        transaction1.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request1 = new _mssql["default"].Request(transaction1);
        request1.query("DELETE FROM ExcelArchivos WHERE ID = " + _this5.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction1.rollback(function (err) {});
            }
          } else {
            transaction1.commit(function (err) {});
          }
        });
      }); // fin transaction1

      var transaction2 = new _mssql["default"].Transaction(this.props.pool);
      transaction2.begin(function (err) {
        var rolledBack = false;
        transaction2.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request2 = new _mssql["default"].Request(transaction2);
        request2.query("DELETE FROM ExcelVariables WHERE excelArchivoID = " + _this5.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction2.rollback(function (err) {});
            }
          } else {
            transaction2.commit(function (err) {});
          }
        });
      }); // fin transaction2
    }
  }, {
    key: "eliminarVariable",
    value: function eliminarVariable() {
      var _this6 = this;

      this.props.limpiarArreglos();
      $("#nombreFuenteDato").val("");
      $("#descripcionFuenteDato").val("");
      var transaction1 = new _mssql["default"].Transaction(this.props.pool);
      transaction1.begin(function (err) {
        var rolledBack = false;
        transaction1.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request1 = new _mssql["default"].Request(transaction1);
        request1.query("DELETE FROM Variables WHERE ID = " + _this6.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction1.rollback(function (err) {});
            }
          } else {
            transaction1.commit(function (err) {});
          }
        });
      }); // fin transaction1

      var transaction2 = new _mssql["default"].Transaction(this.props.pool);
      transaction2.begin(function (err) {
        var rolledBack = false;
        transaction2.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request2 = new _mssql["default"].Request(transaction2);
        request2.query("DELETE FROM VariablesCampos WHERE variableID = " + _this6.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction2.rollback(function (err) {});
            }
          } else {
            transaction2.commit(function (err) {});
          }
        });
      }); // fin transaction2

      var transaction3 = new _mssql["default"].Transaction(this.props.pool);
      transaction3.begin(function (err) {
        var rolledBack = false;
        transaction3.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request3 = new _mssql["default"].Request(transaction3);
        request3.query("DELETE FROM FormulasVariablesCampos WHERE variableID = " + _this6.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction3.rollback(function (err) {});
            }
          } else {
            transaction3.commit(function (err) {});
          }
        });
      }); // fin transaction3

      var transaction4 = new _mssql["default"].Transaction(this.props.pool);
      transaction4.begin(function (err) {
        var rolledBack = false;
        transaction4.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request4 = new _mssql["default"].Request(transaction4);
        request4.query("DELETE FROM ElementoFormulasVariablesCampos WHERE variableID = " + _this6.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction4.rollback(function (err) {});
            }
          } else {
            transaction4.commit(function (err) {});
          }
        });
      }); // fin transaction4

      var transaction5 = new _mssql["default"].Transaction(this.props.pool);
      transaction5.begin(function (err) {
        var rolledBack = false;
        transaction5.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request5 = new _mssql["default"].Request(transaction5);
        request5.query("DELETE FROM SegmentoReglasVariables WHERE variableID = " + _this6.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction5.rollback(function (err) {});
            }
          } else {
            transaction5.commit(function (err) {});
          }
        });
      }); // fin transaction5

      var transaction6 = new _mssql["default"].Transaction(this.props.pool);
      transaction6.begin(function (err) {
        var rolledBack = false;
        transaction6.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request6 = new _mssql["default"].Request(transaction6);
        request6.query("DELETE FROM ReglasVariables WHERE variableID = " + _this6.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction6.rollback(function (err) {});
            }
          } else {
            transaction6.commit(function (err) {});
          }
        });
      }); // fin transaction6

      var transaction7 = new _mssql["default"].Transaction(this.props.pool);
      transaction7.begin(function (err) {
        var rolledBack = false;
        transaction7.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request7 = new _mssql["default"].Request(transaction7);
        request7.query("delete from InstruccionSQL WHERE variableID = " + _this6.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction7.rollback(function (err) {});
            }
          } else {
            transaction7.commit(function (err) {});
          }
        });
      }); // fin transaction7

      var transaction8 = new _mssql["default"].Transaction(this.props.pool);
      transaction8.begin(function (err) {
        var rolledBack = false;
        transaction8.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request8 = new _mssql["default"].Request(transaction8);
        request8.query("delete from InstruccionSQLCampos where variableID = " + _this6.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              contadorObjetosGuardados++;
              transaction8.rollback(function (err) {});
            }
          } else {
            transaction8.commit(function (err) {//this.props.terminoCrearCampo(variable, variableCampo);
            });
          }
        });
      }); // fin transaction8
    }
  }, {
    key: "getVariables",
    value: function getVariables() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Variables", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              variables = result.recordset;
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getExcel",
    value: function getExcel() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ExcelVariables", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              excel = result.recordset;
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getFormas",
    value: function getFormas() {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from FormasVariables", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              formas = result.recordset;
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "verificarNoExisteNombreVar",
    value: function verificarNoExisteNombreVar(nombre) {
      var noExiste = true;

      for (var i = 0; i < variables.length; i++) {
        if (variables[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
          noExiste = false;
          break;
        }
      }

      ;

      if (noExiste) {
        for (var i = 0; i < excel.length; i++) {
          if (excel[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
            noExiste = false;
            break;
          }
        }

        ;
      }

      if (noExiste) {
        for (var i = 0; i < formas.length; i++) {
          if (this.props.tipoVariableOriginal.localeCompare("forma") == 0) {
            if (formas[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0 && formas[i].ID != this.props.idVariable) {
              noExiste = false;
              break;
            }
          } else {
            if (formas[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
              noExiste = false;
              break;
            }
          }
        }

        ;
      }

      return noExiste;
    }
  }, {
    key: "actualizarPeriodicidad",
    value: function actualizarPeriodicidad() {
      var periodicidad = $("#periodicidad").val();
      this.setState({
        valorPeriodicidad: periodicidad
      }, this.cargarDatePicker);
    }
  }, {
    key: "cargarDatePicker",
    value: function cargarDatePicker() {
      $('#fecha').datepicker({
        format: "dd-mm-yyyy",
        todayHighlight: true,
        viewMode: "days",
        minViewMode: "days",
        language: 'es'
      });
    }
  }, {
    key: "isValidDate",
    value: function isValidDate(fecha) {
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
  }, {
    key: "verificarSiExisteExcelEnResultadosHistoricosModificar",
    value: function verificarSiExisteExcelEnResultadosHistoricosModificar(variable) {
      var _this7 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosNombreVariables where nombreVariable = '" + variable.nombre + "' and finVigencia = '1964-05-28'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length == 0) {//this.crearTablaDeResultadoNombreModificar(variable);
              } else {
                console.log("ENCONTRO");
                console.log(result.recordset[0]);

                _this7.modificarResultadosNombre(variable, result.recordset[0].inicioVigencia);
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaDeResultadoNombreModificar",
    value: function crearTablaDeResultadoNombreModificar(variable) {
      var _this8 = this;

      //NOMBRE TABLA: NOMBREVARIABLE_AÑOVIGENCIA_MESVIGENCIA_DIAVIGENCIA_HORAVIGENCIA_MINUTOSVIGENCIA_SEGUNDOSVIGENCIA
      //VIGENCIA: DIA CREACION
      var hoy = new Date();
      var textoCreacionTabla = 'CREATE TABLE ' + variable.nombre + '_' + hoy.getFullYear() + '_' + (hoy.getMonth() + 1) + '_' + hoy.getDate() + '_' + hoy.getHours() + '_' + hoy.getMinutes() + '_' + hoy.getSeconds() + ' ( ID int IDENTITY(1,1) PRIMARY KEY, ';

      for (var i = 0; i < variable.variables.length; i++) {
        if (i != 0) textoCreacionTabla += ', ';

        if (variable.variables[i].tipo.localeCompare("numero") == 0) {
          textoCreacionTabla += variable.variables[i].nombre + ' decimal(22,4)';
        } else if (variable.variables[i].tipo.localeCompare("varchar") == 0) {
          textoCreacionTabla += variable.variables[i].nombre + ' varchar(1000)';
        } else if (variable.variables[i].tipo.localeCompare("bit") == 0) {
          textoCreacionTabla += variable.variables[i].nombre + ' bit';
        } else if (variable.variables[i].tipo.localeCompare("date") == 0) {
          textoCreacionTabla += variable.variables[i].nombre + ' date';
        }
      }

      ;
      textoCreacionTabla += ', f3ch4Gu4rd4do date )';
      console.log('textoCreacionTabla');
      console.log(textoCreacionTabla);
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query(textoCreacionTabla, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              //console.log("Tabla "+variable.nombre+'_'+hoy.getFullYear()+'_'+hoy.getMonth()+'_'+hoy.getDate()+'_'+hoy.getHours()+'_'+hoy.getMinutes()+'_'+hoy.getSeconds()+" creada.");
              console.log('CREO TABLA');

              _this8.crearResultadoNombreModificar(variable, hoy);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearResultadoNombreModificar",
    value: function crearResultadoNombreModificar(variable, hoy) {
      var _this9 = this;

      console.log('INICAR CREAR RESULTADO');
      var mes = hoy.getMonth() + 1;
      if (mes.toString().length == 1) mes = '0' + mes;
      var dia = hoy.getDate();
      if (dia.toString().length == 1) dia = '0' + dia;
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into ResultadosNombreVariables (nombreVariable, inicioVigencia, finVigencia) values ('" + variable.nombre + "', '" + hoy.getFullYear() + '-' + mes + '-' + dia + " " + hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds() + "', '1964-05-28')", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log('GUARDO RESULTADO');

              _this9.verificarPeriodicidadGuardarModificar(variable, "excel", hoy);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "modificarResultadosNombre",
    value: function modificarResultadosNombre(resultado, variable, hoy) {
      var _this10 = this;

      console.log('MODIFICAR CREAR RESULTADO');
      var mes = hoy.getMonth() + 1;
      if (mes.toString().length == 1) mes = '0' + mes;
      var dia = hoy.getDate();
      if (dia.toString().length == 1) dia = '0' + dia;
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("update ResultadosNombreVariables set finVigencia = '" + hoy.getFullYear() + '-' + mes + '-' + dia + " " + hoy.getHours() + "' where ID = " + resultado.ID, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log('GUARDO RESULTADO');

              _this10.crearTablaDeResultadoNombreModificar(variable);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "verificarPeriodicidadGuardarModificar",
    value: function verificarPeriodicidadGuardarModificar(variable, tabla, hoy) {
      var _this11 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from PeriodicidadCalculo where variableID = " + variable.ID + " and tablaVariable = '" + tabla + "'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                _this11.updatePeriodicidadModificar(variable, tabla, hoy);
              }
              /* else {
                 this.guardarPeriodicidad(variable, tabla, hoy);
              }*/

            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "updatePeriodicidadModificar",
    value: function updatePeriodicidadModificar(variable, tabla, hoy) {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("update PeriodicidadCalculo where variableID = " + variable.ID + " and tablaVariable = '" + tabla + "' set fechaUltimoCalculo = '1964-05-28'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {});
          }
        });
      }); // fin transaction
    }
    /*
        **************************************
        **************************************
                    CALCULO CODIGO
        **************************************
        **************************************
    */

  }, {
    key: "verificarPeriodicidad",
    value: function verificarPeriodicidad() {
      var copiedObject = jQuery.extend(true, {}, this.state.forma);
      this.traerPeriodicidadVariable(copiedObject, "forma");
    }
  }, {
    key: "addDays",
    value: function addDays(fecha, days) {
      var date = new Date(fecha);
      date.setDate(date.getDate() + days);
      return date;
    }
  }, {
    key: "addMonths",
    value: function addMonths(fecha, months) {
      var date = new Date(fecha);
      date.setMonth(date.getMonth() + months);
      return date;
    }
  }, {
    key: "addYears",
    value: function addYears(fecha, years) {
      var date = new Date(fecha);
      date.setYear(date.getYear() + years);
      return date;
    }
  }, {
    key: "traerPeriodicidadVariable",
    value: function traerPeriodicidadVariable(variable, tabla) {
      var _this12 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from PeriodicidadCalculo where variableID = " + variable.ID + " and tablaVariable = '" + tabla + "'", function (err, result) {
          if (err) {
            console.log(err);

            _this12.verificarFinPeriodicidad();

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                var fechaInicioCalculo = variable.fechaInicioCalculo;
                var fechaUltimoCalculo = result.recordset[0].fechaUltimoCalculo;
                var tieneUltimoCalculo = false; //si la fecha es null, realizar calculo (28, 4, 1964) POPS BIRTHDAY

                if (fechaUltimoCalculo.getFullYear() != 1964 && fechaUltimoCalculo.getMonth() != 4 && fechaUltimoCalculo.getDate() != 28) {
                  tieneUltimoCalculo = true;
                }

                if (!tieneUltimoCalculo) {
                  variable.realizarCalculo = true;
                } else {
                  var ultimoCalculoVigente = false;
                  var periodicidad = variable.periodicidad;
                  var fechaSiguienteCalculo = new Date(fechaInicioCalculo);

                  while (fechaSiguienteCalculo.getFullYear() <= fechaUltimoCalculo.getFullYear() && fechaSiguienteCalculo.getMonth() <= fechaUltimoCalculo.getMonth() && fechaSiguienteCalculo.getDate() <= fechaUltimoCalculo.getDate()) {
                    if (periodicidad.localeCompare("diario") == 0) {
                      fechaSiguienteCalculo = _this12.addDays(fechaSiguienteCalculo, 1);
                    } else if (periodicidad.localeCompare("semanal") == 0) {
                      fechaSiguienteCalculo = _this12.addDays(fechaSiguienteCalculo, 7);
                    } else if (periodicidad.localeCompare("mensual") == 0) {
                      fechaSiguienteCalculo = _this12.addMonths(fechaSiguienteCalculo, 1);
                    } else if (periodicidad.localeCompare("trimestral") == 0) {
                      fechaSiguienteCalculo = _this12.addMonths(fechaSiguienteCalculo, 3);
                    } else if (periodicidad.localeCompare("bi-anual") == 0) {
                      fechaSiguienteCalculo = _this12.addMonths(fechaSiguienteCalculo, 6);
                    } else if (periodicidad.localeCompare("anual") == 0) {
                      fechaSiguienteCalculo = _this12.addYears(fechaSiguienteCalculo, 1);
                    }
                  }

                  var tocaNuevoCalculo = false;

                  if (periodicidad.localeCompare("diario") == 0) {
                    if (fechaSiguienteCalculo.getDate() >= fechaUltimoCalculo.getDate() + 1) {
                      tocaNuevoCalculo = true;
                    }
                  } else if (periodicidad.localeCompare("semanal") == 0) {
                    if (fechaSiguienteCalculo.getDate() >= fechaUltimoCalculo.getDate() + 7) {
                      tocaNuevoCalculo = true;
                    }
                  } else if (periodicidad.localeCompare("mensual") == 0) {
                    if (fechaSiguienteCalculo.getMonth() >= fechaUltimoCalculo.getMonth() + 1) {
                      tocaNuevoCalculo = true;
                    }
                  } else if (periodicidad.localeCompare("trimestral") == 0) {
                    if (fechaSiguienteCalculo.getMonth() >= fechaUltimoCalculo.getMonth() + 3) {
                      tocaNuevoCalculo = true;
                    }
                  } else if (periodicidad.localeCompare("bi-anual") == 0) {
                    if (fechaSiguienteCalculo.getMonth() >= fechaUltimoCalculo.getMonth() + 6) {
                      tocaNuevoCalculo = true;
                    }
                  } else if (periodicidad.localeCompare("anual") == 0) {
                    if (fechaSiguienteCalculo.getFullYear() >= fechaUltimoCalculo.getFullYear() + 1) {
                      tocaNuevoCalculo = true;
                    }
                  }

                  if (tocaNuevoCalculo) {
                    variable.realizarCalculo = true;
                  } else {
                    variable.realizarCalculo = false;
                  }
                }
              } else {
                if (indexJ != null) variable.realizarCalculo = true;else variable.realizarCalculo = true;
              }

              _this12.formaCrearVariable(variable);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "formaCrearVariable",
    value: function formaCrearVariable(id, nombreVariable, tipoVariable, nombreSiguiente, indexSiguiente, tipoSiguiente, inputSiguiente) {
      //variableForma
      if (tipoVariable.localeCompare("numero") == 0) {
        try {
          var variable = parseFloat($("#variableForma" + id).val());
          window[nombreVariable] = variable;
        } catch (err) {
          console.log(err.message);
          arregloDeErroresFormas.push({
            nombre: nombreVariable,
            ID: id
          });
        }
      } else if (tipoVariable.localeCompare("bit") == 0) {
        try {
          if ($("#variableForma" + id).is(':checked')) {
            window[nombreVariable] = true;
          } else {
            window[nombreVariable] = false;
          }
        } catch (err) {
          console.log(err.message);
          arregloDeErroresFormas.push({
            nombre: nombreVariable,
            ID: id
          });
        }
      } else if (tipoVariable.localeCompare("varchar") == 0) {
        try {
          var variable = $("#variableForma" + id).val();
          window[nombreVariable] = variable;
        } catch (err) {
          console.log(err.message);
          arregloDeErroresFormas.push({
            nombre: nombreVariable,
            ID: id
          });
        }
      } else if (tipoVariable.localeCompare("date") == 0) {
        try {
          var variable = $("#variableForma" + id).datepicker('getDate');
          window[nombreVariable] = variable;
        } catch (err) {
          console.log(err.message);
          arregloDeErroresFormas.push({
            nombre: nombreVariable,
            ID: id
          });
        }
      }

      this.verificarSiExisteFormaEnResultadosHistoricos(variable);
    }
  }, {
    key: "iniciarMostrarFormas",
    value: function iniciarMostrarFormas(variable) {
      var _this13 = this;

      var HTMLFormas = '';

      if (variable.tipo.localeCompare("numero") == 0) {
        var nombre = variable.nombre;
        var id = variable.ID;
        var tipo = variable.tipo;
        HTMLFormas = _react["default"].createElement("div", {
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "variableForma",
          className: "col-form-label"
        }, "Valor:")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("input", {
          id: "variableForma",
          type: "text",
          className: "form-control form-control-sm"
        }))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "text-center",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-brand active",
          onClick: function onClick() {
            return _this13.formaCrearVariable(id, nombre, tipo, variable);
          }
        }, "Guardar")), _react["default"].createElement("br", null));
      } else if (variable.tipo.localeCompare("bit") == 0) {
        var _nombre = variable.nombre;
        var _id = variable.ID;
        var _tipo = variable.tipo;
        HTMLFormas = _react["default"].createElement("div", {
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "variableForma",
          className: "col-form-label"
        }, "Valor:")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "switch-button switch-button-bool",
          style: {
            margin: "0 auto",
            display: "block"
          }
        }, _react["default"].createElement("input", {
          type: "checkbox",
          defaultChecked: true,
          name: "guardarFuenteDato",
          id: "variableForma"
        }), _react["default"].createElement("span", null, _react["default"].createElement("label", {
          htmlFor: "guardarFuenteDato"
        }))))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "text-center",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-brand active",
          onClick: function onClick() {
            return _this13.formaCrearVariable(_id, _nombre, _tipo, variable);
          }
        }, "Guardar")), _react["default"].createElement("br", null));
      } else if (variable.tipo.localeCompare("varchar") == 0) {
        var _nombre2 = variable.nombre;
        var _id2 = variable.ID;
        var _tipo2 = variable.tipo;
        HTMLFormas = _react["default"].createElement("div", {
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "variableForma",
          className: "col-form-label"
        }, "Valor:")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("input", {
          id: "variableForma",
          type: "text",
          className: "form-control form-control-sm"
        }))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "text-center",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-brand active",
          onClick: function onClick() {
            return _this13.formaCrearVariable(_id2, _nombre2, _tipo2, variable);
          }
        }, "Guardar")), _react["default"].createElement("br", null));
      } else if (variable.tipo.localeCompare("date") == 0) {
        var _nombre3 = variable.nombre;
        var _id3 = variable.ID;
        var _tipo3 = variable.tipo;
        HTMLFormas = _react["default"].createElement("div", {
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "variableForma",
          className: "col-form-label"
        }, "Valor:")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("div", {
          className: "row",
          style: {
            display: "flex",
            justifyContent: "center"
          }
        }, _react["default"].createElement("div", {
          id: "variableForma",
          className: "center-block"
        })))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "text-center",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-brand active",
          onClick: function onClick() {
            return _this13.formaCrearVariable(_id3, _nombre3, _tipo3, variable);
          }
        }, "Guardar")), _react["default"].createElement("br", null));
      }

      this.updateForm(variable.nombre, HTMLFormas, variable.tipo, "variableForma");
    }
  }, {
    key: "updateForm",
    value: function updateForm(titulo, HTMLFormas, tipo, idInput) {
      this.setState({
        showModalForma: true,
        tituloVariableForma: "Variable: " + titulo,
        htmlForma: HTMLFormas
      }, this.loadFechas(tipo, idInput));
    }
  }, {
    key: "loadFechas",
    value: function loadFechas(tipo, idInput) {
      if (tipo.localeCompare("date") == 0) {
        setTimeout(function () {
          $('#' + idInput).datepicker({
            format: "dd-mm-yyyy",
            todayHighlight: true,
            viewMode: "days",
            minViewMode: "days",
            language: 'es'
          });
        }, 250);
      }
    }
  }, {
    key: "closeModalForma",
    value: function closeModalForma() {
      this.setState({
        showModalForma: false
      });
    }
  }, {
    key: "verificarSiExisteFormaEnResultadosHistoricos",
    value: function verificarSiExisteFormaEnResultadosHistoricos(variable) {
      var _this14 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosNombreVariables where nombreVariable = '" + variable.nombre + "' and finVigencia = '1964-05-28'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length == 0) {
                _this14.crearTablaDeResultadoNombreForma(variable);
              } else {
                console.log("ENCONTRO");
                console.log(result.recordset[0]);

                _this14.guardarResultadosNombreForma(variable, result.recordset[0].inicioVigencia);
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaDeResultadoNombreForma",
    value: function crearTablaDeResultadoNombreForma(variable) {
      var _this15 = this;

      //NOMBRE TABLA: NOMBREVARIABLE_AÑOVIGENCIA_MESVIGENCIA_DIAVIGENCIA_HORAVIGENCIA_MINUTOSVIGENCIA_SEGUNDOSVIGENCIA
      //VIGENCIA: DIA CREACION
      var hoy = new Date();
      var textoCreacionTabla = 'CREATE TABLE ' + variable.nombre + '_' + hoy.getFullYear() + '_' + (hoy.getMonth() + 1) + '_' + hoy.getDate() + '_' + hoy.getHours() + '_' + hoy.getMinutes() + '_' + hoy.getSeconds() + ' ( ID int IDENTITY(1,1) PRIMARY KEY, ';

      if (variable.tipo.localeCompare("numero") == 0) {
        textoCreacionTabla += variable.nombre + ' decimal(22,4)';
      } else if (variable.tipo.localeCompare("varchar") == 0) {
        textoCreacionTabla += variable.nombre + ' varchar(1000)';
      } else if (variable.tipo.localeCompare("bit") == 0) {
        textoCreacionTabla += variable.nombre + ' bit';
      } else if (variable.tipo.localeCompare("date") == 0) {
        textoCreacionTabla += variable.nombre + ' date';
      }

      textoCreacionTabla += ', f3ch4Gu4rd4do date )';
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query(textoCreacionTabla, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this15.crearResultadoNombreForma(variable, hoy);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearResultadoNombreForma",
    value: function crearResultadoNombreForma(variable, hoy) {
      var _this16 = this;

      var mes = hoy.getMonth() + 1;
      if (mes.toString().length == 1) mes = '0' + mes;
      var dia = hoy.getDate();
      if (dia.toString().length == 1) dia = '0' + dia;
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into ResultadosNombreVariables (nombreVariable, inicioVigencia, finVigencia) values ('" + variable.nombre + "', '" + hoy.getFullYear() + '-' + mes + '-' + dia + " " + hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds() + "', '1964-05-28')", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this16.guardarResultadosNombreForma(variable, hoy);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "guardarResultadosNombreForma",
    value: function guardarResultadosNombreForma(variable, fechaNombreTabla) {
      console.log('INICAR GUARDAR RESULTADO');
      console.log('fechaNombreTabla');
      console.log(fechaNombreTabla);
      console.log('fechaNombreTabla.getFullYear()');
      console.log(fechaNombreTabla.getFullYear());
      console.log('fechaNombreTabla.getMonth()');
      console.log(fechaNombreTabla.getMonth());
      console.log('fechaNombreTabla.getDate()');
      console.log(fechaNombreTabla.getDate());
      console.log('fechaNombreTabla.getHours()');
      console.log(fechaNombreTabla.getHours());
      console.log('fechaNombreTabla.getMinutes()');
      console.log(fechaNombreTabla.getMinutes());
      console.log('fechaNombreTabla.getSeconds()');
      console.log(fechaNombreTabla.getSeconds());
      var hoy = new Date();
      var textoInsertPrincipio = 'INSERT INTO ' + variable.nombre + '_' + fechaNombreTabla.getFullYear() + '_' + (fechaNombreTabla.getMonth() + 1) + '_' + fechaNombreTabla.getDate() + '_' + fechaNombreTabla.getHours() + '_' + fechaNombreTabla.getMinutes() + '_' + fechaNombreTabla.getSeconds() + ' ( ';
      /*for (var i = 0; i < variable.variables.length; i++) {
          if(i != 0)
              textoInsertPrincipio += ', ';
          textoInsertPrincipio += variable.variables[i].nombre;
      };*/

      textoInsertPrincipio += ', f3ch4Gu4rd4do ) values ( ';
      var instruccionSQLBorrar = "DELETE FROM " + variable.nombre + "_" + fechaNombreTabla.getFullYear() + "_" + (fechaNombreTabla.getMonth() + 1) + "_" + fechaNombreTabla.getDate() + "_" + fechaNombreTabla.getHours() + "_" + fechaNombreTabla.getMinutes() + "_" + fechaNombreTabla.getSeconds() + " WHERE f3ch4Gu4rd4do = '" + hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate() + "' ";
      this.borrarForma(instruccionSQLBorrar);
      var instruccionSQLFinal = textoInsertPrincipio;

      if (variable.tipo.localeCompare("numero") == 0) {
        instruccionSQLFinal += window[variable.nombre];
      } else if (variable.tipo.localeCompare("varchar") == 0) {
        instruccionSQLFinal += "'" + window[variable.nombre] + "'";
      } else if (variable.tipo.localeCompare("bit") == 0) {
        instruccionSQLFinal += "'" + window[variable.nombre] + "'";
      } else if (variable.tipo.localeCompare("date") == 0) {
        instruccionSQLFinal += "'" + window[variable.nombre].getFullYear() + "-" + (window[variable.nombre].getMonth() + 1) + "-" + window[variable.nombre].getDate() + "'";
      }

      instruccionSQLFinal += ", '" + hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate() + "' )";
      var self = this;
      setTimeout(function () {
        self.guardarForma(instruccionSQLFinal, variable, 'forma', hoy);
      }, 600);
      this.saveBitacora(hoy, "Usuario: " + this.props.userName + " realizo el cálculo para la variable tipo forma: " + variable.nombre, 'variable', variable.ID);
    }
  }, {
    key: "guardarForma",
    value: function guardarForma(instruccionSQL, variable, tabla, hoy) {
      var _this17 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query(instruccionSQL, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (variable.periodicidad.localeCompare("-1") != 0) _this17.verificarPeriodicidadGuardar(variable, tabla, hoy);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "borrarForma",
    value: function borrarForma(instruccionSQL) {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query(instruccionSQL, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {});
          }
        });
      }); // fin transaction
    }
  }, {
    key: "verificarPeriodicidadGuardar",
    value: function verificarPeriodicidadGuardar(variable, tabla, hoy) {
      var _this18 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from PeriodicidadCalculo where variableID = " + variable.ID + " and tablaVariable = '" + tabla + "'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                _this18.updatePeriodicidad(variable, tabla, hoy);
              } else {
                _this18.guardarPeriodicidad(variable, tabla, hoy);
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "updatePeriodicidad",
    value: function updatePeriodicidad(variable, tabla, hoy) {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("update PeriodicidadCalculo set fechaUltimoCalculo = '" + hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate() + "' where variableID = " + variable.ID + " and tablaVariable = '" + tabla + "'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {});
          }
        });
      }); // fin transaction
    }
  }, {
    key: "guardarPeriodicidad",
    value: function guardarPeriodicidad(variable, tabla, hoy) {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into PeriodicidadCalculo (variableID, tablaVariable, fechaInicio, fechaUltimoCalculo) values (" + variable.ID + ", '" + tabla + "', '" + hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate() + "', '" + hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate() + "') ", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {});
          }
        });
      }); // fin transaction
    }
    /*
        **************************************
        **************************************
                FIN CALCULO CODIGO
        **************************************
        **************************************
    */

  }, {
    key: "tieneEspaciosEnBlanco",
    value: function tieneEspaciosEnBlanco(s) {
      return /\s/g.test(s);
    }
  }, {
    key: "getUsuarios",
    value: function getUsuarios() {
      var _this19 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Usuarios", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this19.setState({
                usuarios: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "goToTimeline",
    value: function goToTimeline(esExcel, idVariableExcel, nombreVariable, esColeccion) {
      this.props.changeStateFirstTimeToTrue();
      this.props.goToTimeline(esExcel, idVariableExcel, nombreVariable, esColeccion);
    }
  }, {
    key: "render",
    value: function render() {
      var _this20 = this;

      return _react["default"].createElement("div", null, _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "nombreVariable",
        className: "col-form-label"
      }, "Nombre de Variable:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("input", {
        id: "nombreVariable",
        defaultValue: this.state.nombre,
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
        htmlFor: "tipo",
        className: "col-form-label"
      }, "Tipo de Variable:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("select", {
        id: "tipo",
        defaultValue: this.state.tipo,
        className: "form-control"
      }, _react["default"].createElement("option", {
        value: "numero"
      }, "N\xFAmero"), _react["default"].createElement("option", {
        value: "varchar"
      }, "Cadena"), _react["default"].createElement("option", {
        value: "date"
      }, "Fecha"), _react["default"].createElement("option", {
        value: "bit"
      }, "Booleano")))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "periodicidad",
        className: "col-form-label"
      }, "Periodicidad")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("select", {
        id: "periodicidad",
        defaultValue: this.props.periodicidadVariable,
        onChange: this.actualizarPeriodicidad,
        className: "form-control"
      }, _react["default"].createElement("option", {
        value: "-1"
      }, "Ninguno"), periodicidad.map(function (periodicidad, i) {
        return _react["default"].createElement("option", {
          value: periodicidad.nombre,
          key: periodicidad.nombre
        }, periodicidad.nombre);
      })))), this.state.valorPeriodicidad.localeCompare("-1") != 0 ? _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "fecha",
        className: "col-form-label"
      }, "Fecha de Inicio de C\xE1lculo:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("input", {
        type: "text",
        className: "form-control",
        id: "fecha"
      }))) : null, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "responsable",
        className: "col-form-label"
      }, "Nombre Encargado")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("select", {
        id: "responsable",
        defaultValue: this.props.responsableVariable,
        onChange: this.props.actualizarNombreEncargado,
        className: "form-control"
      }, _react["default"].createElement("option", {
        value: "-1"
      }, "Ninguno"), this.state.usuarios.map(function (usuario, i) {
        return _react["default"].createElement("option", {
          value: usuario.ID,
          key: usuario.ID
        }, usuario.usuario);
      })))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "guardarVariable",
        className: "col-form-label"
      }, "Guardar Valores Obtenidos en Base de Datos")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "switch-button switch-button-yesno",
        style: {
          margin: "0 auto",
          display: "block"
        }
      }, _react["default"].createElement("input", {
        type: "checkbox",
        defaultChecked: this.state.guardar,
        name: "guardarVariable",
        id: "guardarVariable"
      }), _react["default"].createElement("span", null, _react["default"].createElement("label", {
        htmlFor: "guardarVariable"
      }))))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "text-center",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-brand active",
        onClick: this.crearVariable
      }, "Modificar Variable"), this.props.tipoVariableOriginal.localeCompare("forma") == 0 ? _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-secondary active",
        style: {
          marginLeft: "10px"
        },
        onClick: function onClick() {
          return _this20.props.eliminarVarForma(true);
        }
      }, "Eliminar Variable") : null, this.props.tipoVariableOriginal.localeCompare("forma") == 0 ? _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-primary active",
        style: {
          marginLeft: "10px"
        },
        onClick: this.verificarPeriodicidad
      }, "Realizar C\xE1lculo") : null, this.props.tipoVariableOriginal.localeCompare("forma") == 0 ? _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-info active",
        style: {
          marginLeft: "10px"
        },
        onClick: function onClick() {
          return _this20.goToTimeline(false);
        }
      }, "Historial de Variable") : null), _react["default"].createElement("br", null), _react["default"].createElement(_Modal["default"], {
        show: this.state.showModalForma,
        titulo: this.state.tituloVariableForma,
        onClose: function onClose() {
          return _this20.closeModalForma;
        }
      }, this.state.htmlForma));
    }
  }]);

  return FuenteDatoForma;
}(_react["default"].Component);

exports["default"] = FuenteDatoForma;
//# sourceMappingURL=FuenteDatoForma.js.map
