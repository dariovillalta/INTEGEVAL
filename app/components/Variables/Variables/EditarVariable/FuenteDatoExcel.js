"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _electron = _interopRequireDefault(require("electron"));

var _mssql = _interopRequireDefault(require("mssql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

var FuenteDatoExcel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FuenteDatoExcel, _React$Component);

  function FuenteDatoExcel(props) {
    var _this;

    _classCallCheck(this, FuenteDatoExcel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FuenteDatoExcel).call(this, props));
    _this.state = {
      ubicacionArchivo: '',
      variables: [],
      valorPeriodicidad: '-1',
      valoresPeriodicidad: []
    };
    _this.seleccionarArchivo = _this.seleccionarArchivo.bind(_assertThisInitialized(_this));
    _this.guardarUbicacionArchivo = _this.guardarUbicacionArchivo.bind(_assertThisInitialized(_this));
    _this.guardarVariablesModificar = _this.guardarVariablesModificar.bind(_assertThisInitialized(_this));
    _this.traerArchivoID = _this.traerArchivoID.bind(_assertThisInitialized(_this));
    _this.guardarVariablesNuevas = _this.guardarVariablesNuevas.bind(_assertThisInitialized(_this));
    _this.crearVariable = _this.crearVariable.bind(_assertThisInitialized(_this));
    _this.traerArchivo = _this.traerArchivo.bind(_assertThisInitialized(_this));
    _this.traerVariables = _this.traerVariables.bind(_assertThisInitialized(_this));
    _this.updateVariable = _this.updateVariable.bind(_assertThisInitialized(_this));
    _this.deleteVariable = _this.deleteVariable.bind(_assertThisInitialized(_this));
    _this.eliminarVarForma = _this.eliminarVarForma.bind(_assertThisInitialized(_this));
    _this.eliminarVariable = _this.eliminarVariable.bind(_assertThisInitialized(_this));
    _this.getVariables = _this.getVariables.bind(_assertThisInitialized(_this));
    _this.getExcel = _this.getExcel.bind(_assertThisInitialized(_this));
    _this.getFormas = _this.getFormas.bind(_assertThisInitialized(_this));
    _this.verificarNoExisteNombreVar = _this.verificarNoExisteNombreVar.bind(_assertThisInitialized(_this));
    _this.actualizarPeriodicidad = _this.actualizarPeriodicidad.bind(_assertThisInitialized(_this));
    _this.cargarDatePicker = _this.cargarDatePicker.bind(_assertThisInitialized(_this));
    _this.inicializarFecha = _this.inicializarFecha.bind(_assertThisInitialized(_this));
    _this.isValidDate = _this.isValidDate.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FuenteDatoExcel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.tipoVariableOriginal.localeCompare("excel") == 0) {
        this.traerArchivo();
      }

      this.getVariables();
      this.getExcel();
      this.getFormas();
    }
  }, {
    key: "traerArchivo",
    value: function traerArchivo() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ExcelArchivos where ID = " + _this2.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                $("#nombreArchivo").val(result.recordset[0].nombre);

                _this2.setState({
                  ubicacionArchivo: result.recordset[0].ubicacionArchivo
                });

                _this2.traerVariables();
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "traerVariables",
    value: function traerVariables() {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ExcelVariables where excelArchivoID = " + _this3.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this3.setState({
                variables: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "seleccionarArchivo",
    value: function seleccionarArchivo() {
      var dialog = _electron["default"].remote.dialog;
      var fileExcel = null;
      fileExcel = dialog.showOpenDialog({
        title: 'Seleccione un archivo',
        filters: [{
          name: "Spreadsheets",
          extensions: "xls|xlsx|xlsm|xlsb|csv".split("|")
        }],
        properties: ['openFile']
      });

      if (fileExcel != undefined && fileExcel.length > 0) {
        this.setState({
          ubicacionArchivo: fileExcel[0]
        });
      }
    }
  }, {
    key: "guardarUbicacionArchivo",
    value: function guardarUbicacionArchivo() {
      var _this4 = this;

      var nombre = $("#nombreArchivo").val();

      if (nombre.length > 0 && nombre.length < 101) {
        if (this.state.ubicacionArchivo.length > 0 && this.state.ubicacionArchivo.length < 1001) {
          /*var guardar = true;
          for (var i = 0; i < this.state.variables.length; i++) {
              if(this.state.variables[i].nombre.length > 0 && this.state.variables[i].nombre.length < 101) {
                  if(this.state.variables[i].operacion.length > 0 && this.state.variables[i].operacion.length < 31) {
                      if(this.state.variables[i].celdas.length > 0 && this.state.variables[i].celdas.length < 101) {
                          if(this.state.variables[i].nombreHoja.length > 0 && this.state.variables[i].nombreHoja.length < 201) {
                              if(this.state.variables[i].tipo.length > 0 && this.state.variables[i].tipo.length < 31) {
                              } else {
                                  guardar = false;
                                  alert('Ingrese un valor para el valor de tipo de variable que debe ser menor a 31 caracteres');
                              }
                          } else {
                              guardar = false;
                              alert('Ingrese un valor para el valor de hoja de excel que debe ser menor a 201 caracteres');
                          }
                      } else {
                          guardar = false;
                          alert('Ingrese un valor para el valor de celdas que debe ser menor a 101 caracteres');
                      }
                  } else {
                      guardar = false;
                      alert('Ingrese un valor para el valor de operación que debe ser menor a 31 caracteres');
                  }
              } else {
                  guardar = false;
                  alert('Ingrese un valor para la ubicación del archivo que debe ser menor a 1001 caracteres');
              }
          };
          if(guardar) {*/
          if (this.props.tipoVariableOriginal.localeCompare("forma") == 0) {
            this.eliminarVarForma();
          }

          if (this.props.tipoVariableOriginal.localeCompare("variable") == 0) {
            this.eliminarVariable();
          }

          if (this.props.tipoVariableOriginal.localeCompare("excel") != 0) {
            var transaction = new _mssql["default"].Transaction(this.props.pool);
            transaction.begin(function (err) {
              var rolledBack = false;
              transaction.on('rollback', function (aborted) {
                rolledBack = true;
              });
              var request = new _mssql["default"].Request(transaction);
              request.query("insert into ExcelArchivos (ubicacionArchivo, nombre) values ('" + _this4.state.ubicacionArchivo + "', '" + nombre + "')", function (err, result) {
                if (err) {
                  console.log(err);

                  if (!rolledBack) {
                    transaction.rollback(function (err) {});
                  }
                } else {
                  transaction.commit(function (err) {
                    alert('Variable Creada');
                    /*$("#nombreArchivo").val("");
                    this.setState({
                        ubicacionArchivo: ""
                    });*/

                    _this4.traerArchivoID();
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
              request.query("update ExcelArchivos set ubicacionArchivo = '" + _this4.state.ubicacionArchivo + "', nombre = '" + nombre + "' where ID = " + _this4.props.idVariable, function (err, result) {
                if (err) {
                  console.log(err);

                  if (!rolledBack) {
                    _transaction.rollback(function (err) {});
                  }
                } else {
                  _transaction.commit(function (err) {
                    alert('Variable Modificada');
                    /*$("#nombreArchivo").val("");
                    this.setState({
                        ubicacionArchivo: ""
                    });*/

                    _this4.guardarVariablesModificar();
                  });
                }
              });
            }); // fin transaction

          } //}

        } else {
          alert('Ingrese un valor para la ubicación del archivo que debe ser menor a 1001 caracteres');
        }
      } else {
        alert('Ingrese un nombre el archivo que debe ser menor a 101 caracteres');
      }
    }
  }, {
    key: "guardarVariablesModificar",
    value: function guardarVariablesModificar() {
      var _this5 = this;

      var transaction1 = new _mssql["default"].Transaction(this.props.pool);
      transaction1.begin(function (err) {
        var rolledBack = false;
        transaction1.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction1);
        request.query("DELETE FROM ExcelVariables WHERE excelArchivoID = " + _this5.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction1.rollback(function (err) {});
            }
          } else {
            transaction1.commit(function (err) {});
          }
        });
      });

      var _loop = function _loop() {
        var nombreHoja = _this5.state.variables[i].nombreHoja;
        var nombre = _this5.state.variables[i].nombre;
        var operacion = _this5.state.variables[i].operacion;
        var celdas = _this5.state.variables[i].celdas;
        var tipo = _this5.state.variables[i].tipo;
        var periodicidad = _this5.state.variables[i].periodicidad;
        var fechaInicioCalculo = _this5.state.variables[i].fechaInicioCalculo;
        var analista = _this5.state.variables[i].analista;
        var guardarVariable = _this5.state.variables[i].guardar;
        var transaction = new _mssql["default"].Transaction(_this5.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("insert into ExcelVariables (excelArchivoID, nombreHoja, nombre, operacion, celdas, tipo, periodicidad, fechaInicioCalculo, analista, guardar) values (" + _this5.props.idVariable + ", '" + nombreHoja + "','" + nombre + "', '" + operacion + "', '" + celdas + "', '" + tipo + "', '" + periodicidad + "', '" + fechaInicioCalculo + "', '" + analista + "', '" + guardarVariable + "')", function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                if (i == _this5.state.variables.length - 1) {
                  _this5.traerArchivo();

                  _this5.getExcel();
                }
              });
            }
          });
        }); // fin transaction
      };

      for (var i = 0; i < this.state.variables.length; i++) {
        _loop();
      }

      ;
    }
  }, {
    key: "traerArchivoID",
    value: function traerArchivoID() {
      var _this6 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select top 1 * from ExcelArchivos order by ID desc", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this6.guardarVariablesNuevas(result.recordset[0].ID);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "guardarVariablesNuevas",
    value: function guardarVariablesNuevas(archivoExcelID) {
      var _this7 = this;

      var _loop2 = function _loop2(i) {
        var nombreHoja = _this7.state.variables[i].nombreHoja;
        var nombre = _this7.state.variables[i].nombre;
        var operacion = _this7.state.variables[i].operacion;
        var celdas = _this7.state.variables[i].celdas;
        var tipo = _this7.state.variables[i].tipo;
        var periodicidad = _this7.state.variables[i].periodicidad;
        var fechaInicioCalculo = _this7.state.variables[i].fechaInicioCalculo;
        var analista = _this7.state.variables[i].analista;
        var guardarVariable = _this7.state.variables[i].guardar;
        var transaction = new _mssql["default"].Transaction(_this7.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("insert into ExcelVariables (excelArchivoID, nombreHoja, nombre, operacion, celdas, tipo, periodicidad, fechaInicioCalculo, analista, guardar) values (" + archivoExcelID + ", '" + nombreHoja + "', '" + nombre + "', '" + operacion + "', '" + celdas + "', '" + tipo + "', '" + periodicidad + "', '" + fechaInicioCalculo + "', '" + analista + "', '" + guardarVariable + "')", function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                if (i == _this7.state.variables.length - 1) {
                  _this7.props.actualizarIDVariableModificada("excel");

                  _this7.getExcel();
                }
              });
            }
          });
        }); // fin transaction
      };

      for (var i = 0; i < this.state.variables.length; i++) {
        _loop2(i);
      }

      ;
    }
  }, {
    key: "crearVariable",
    value: function crearVariable() {
      var nombre = $("#nombreVariable").val();
      var operacion = $("#operacion").val();
      var celdas = $("#celdasVariable").val();
      var hoja = $("#hojaExcelVariable").val();
      var tipo = $("#tipoVariable").val();
      var guardarVariable;
      if ($("#guardarVariable").is(':checked')) guardarVariable = true;else guardarVariable = false;
      var periodicidad = $("#periodicidad").val();
      var fecha;
      if (periodicidad.localeCompare("-1") == 0) fecha = new Date(1964, 4, 28);else fecha = $("#fecha").datepicker('getDate');
      var analista = $("#analista").val();

      if (nombre.length > 0 && nombre.length < 101) {
        if (this.verificarNoExisteNombreVar(nombre)) {
          if (operacion.length > 0 && operacion.length < 31) {
            if (celdas.length > 0 && celdas.length < 101) {
              if (hoja.length > 0 && hoja.length < 201) {
                if (tipo.length > 0 && tipo.length < 31) {
                  if (periodicidad.length > 0 && periodicidad.length < 51) {
                    if (this.isValidDate(fecha)) {
                      if (analista.length > 0 && analista.length < 101) {
                        var copyTemp = _toConsumableArray(this.state.variables);

                        var nuevaVar = {
                          nombreHoja: hoja,
                          nombre: nombre,
                          operacion: operacion,
                          celdas: celdas,
                          tipo: tipo,
                          periodicidad: periodicidad,
                          fechaInicioCalculo: fecha,
                          analista: analista,
                          guardar: guardarVariable
                        };
                        copyTemp.push(nuevaVar);

                        var copyTempPeriodicidad = _toConsumableArray(this.state.valoresPeriodicidad);

                        copyTempPeriodicidad.push(periodicidad);
                        this.setState({
                          variables: copyTemp,
                          valoresPeriodicidad: copyTempPeriodicidad
                        });
                        $("#nombreVariable").val("");
                        $("#operacion").val("ASIG");
                        $("#hojaExcelVariable").val("");
                        $("#tipoVariable").val("numero");
                        $("#celdasVariable").val("");
                        $("#periodicidad").val("");
                        $("#analista").val("");
                      } else {
                        alert('Ingrese un valor para el valor de analista que debe ser menor a 101 caracteres');
                      }
                    } else {
                      alert('Ingrese un valor para el valor de inicio de cálculo.');
                    }
                  } else {
                    alert('Ingrese un valor para el valor de periodicidad que debe ser menor a 51 caracteres');
                  }
                } else {
                  alert('Ingrese un valor para el valor de tipo de variable que debe ser menor a 31 caracteres');
                }
              } else {
                alert('Ingrese un valor para el valor de hoja de excel que debe ser menor a 201 caracteres');
              }
            } else {
              alert('Ingrese un valor para el valor de celdas que debe ser menor a 101 caracteres');
            }
          } else {
            alert('Ingrese un valor para el valor de operación que debe ser menor a 31 caracteres');
          }
        } else {
          alert('El nombre de la variable debe ser único.');
        }
      } else {
        alert('Ingrese un valor para la ubicación del archivo que debe ser menor a 1001 caracteres');
      }
    }
  }, {
    key: "updateVariable",
    value: function updateVariable(index) {
      if ($("#nombreVariable" + index).length > 0 && $("#nombreVariable" + index).length < 101) {
        if ($("#operacion" + index).val().length > 0 && $("#operacion" + index).val().length < 31) {
          if ($("#celdasVariable" + index).length > 0 && $("#celdasVariable" + index).length < 101) {
            if ($("#hojaExcelVariable" + index).length > 0 && $("#hojaExcelVariable" + index).length < 201) {
              if ($("#tipoVariable" + index).val().length > 0 && $("#tipoVariable" + index).val().length < 31) {
                if ($("#periodicidad" + index).val().length > 0 && $("#periodicidad" + index).val().length < 51) {
                  var fecha;
                  if ($("#periodicidad" + index).val().localeCompare("-1") == 0) fecha = new Date(1964, 4, 28);else fecha = $("#fecha").datepicker('getDate');

                  if (this.isValidDate(fecha)) {
                    if ($("#analista" + index).val().length > 0 && $("#analista" + index).val().length < 101) {
                      if (this.verificarNoExisteNombreVar($("#nombreVariable" + index).val())) {
                        var copyTemp = _toConsumableArray(this.state.variables);

                        copyTemp[index].nombre = $("#nombreVariable" + index).val();
                        copyTemp[index].operacion = $("#operacion" + index).val();
                        copyTemp[index].celdas = $("#celdasVariable" + index).val();
                        copyTemp[index].nombreHoja = $("#hojaExcelVariable" + index).val();
                        copyTemp[index].tipo = $("#tipoVariable" + index).val();
                        copyTemp[index].periodicidad = $("#periodicidad" + index).val();
                        copyTemp[index].fechaInicioCalculo = fecha;
                        copyTemp[index].analista = $("#analista" + index).val();
                        var guardarVariable;
                        if ($("#guardarVariable" + index).is(':checked')) guardarVariable = true;else guardarVariable = false;

                        var copyTempPeriodicidad = _toConsumableArray(this.state.valoresPeriodicidad);

                        copyTempPeriodicidad[index] = periodicidad;
                        copyTemp[index].guardar = guardarVariable;
                        this.setState({
                          variables: copyTemp,
                          valoresPeriodicidad: copyTempPeriodicidad
                        });
                      } else {
                        alert('El nombre de la variable debe ser único.');
                      }
                    } else {
                      alert('Ingrese un valor para el valor de analista que debe ser menor a 101 caracteres');
                    }
                  } else {
                    alert('Ingrese un valor para el valor de inicio de cálculo.');
                  }
                } else {
                  alert('Ingrese un valor para el valor de periodicidad que debe ser menor a 51 caracteres');
                }
              } else {
                alert('Ingrese un valor para el valor de tipo de variable que debe ser menor a 31 caracteres');
              }
            } else {
              alert('Ingrese un valor para el valor de hoja de excel que debe ser menor a 201 caracteres');
            }
          } else {
            alert('Ingrese un valor para el valor de celdas que debe ser menor a 101 caracteres');
          }
        } else {
          alert('Ingrese un valor para el valor de operación que debe ser menor a 31 caracteres');
        }
      } else {
        alert('Ingrese un valor para la ubicación del archivo que debe ser menor a 1001 caracteres');
      }
    }
  }, {
    key: "deleteVariable",
    value: function deleteVariable(index) {
      var copyTemp = _toConsumableArray(this.state.variables);

      copyTemp.splice(index, 1);
      this.setState({
        variables: copyTemp
      });
    }
  }, {
    key: "eliminarVarForma",
    value: function eliminarVarForma() {
      var _this8 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("DELETE FROM FormasVariables WHERE ID = " + _this8.props.idVariable, function (err, result) {
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
    key: "eliminarVariable",
    value: function eliminarVariable() {
      var _this9 = this;

      var transaction1 = new _mssql["default"].Transaction(this.props.pool);
      transaction1.begin(function (err) {
        var rolledBack = false;
        transaction1.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request1 = new _mssql["default"].Request(transaction1);
        request1.query("DELETE FROM Variables WHERE ID = " + _this9.props.idVariable, function (err, result) {
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
        request2.query("DELETE FROM VariablesCampos WHERE variableID = " + _this9.props.idVariable, function (err, result) {
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
        request3.query("DELETE FROM FormulasVariablesCampos WHERE variableID = " + _this9.props.idVariable, function (err, result) {
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
        request4.query("DELETE FROM ElementoFormulasVariablesCampos WHERE variableID = " + _this9.props.idVariable, function (err, result) {
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
        request5.query("DELETE FROM SegmentoReglasVariables WHERE variableID = " + _this9.props.idVariable, function (err, result) {
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
        request6.query("DELETE FROM ReglasVariables WHERE variableID = " + _this9.props.idVariable, function (err, result) {
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
        request7.query("delete from InstruccionSQL WHERE variableID = " + _this9.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction7.rollback(function (err) {});
            }
          } else {
            transaction7.commit(function (err) {
              _this9.limpiarArreglos();
            });
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
        request8.query("delete from InstruccionSQLCampos where variableID = " + _this9.props.idVariable, function (err, result) {
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
          if (formas[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
            noExiste = false;
            break;
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
    key: "inicializarFecha",
    value: function inicializarFecha(periodicidad, index, fecha) {
      if (periodicidad.localeCompare("-1") != 0) {
        setTimeout(function () {
          $('#fecha' + index).datepicker({
            format: "dd-mm-yyyy",
            todayHighlight: true,
            viewMode: "days",
            minViewMode: "days",
            language: 'es'
          });
          $("#fecha" + index).datepicker("setDate", fecha);
        }, 500);
        return true;
      }

      return false;
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
    key: "render",
    value: function render() {
      var _this10 = this;

      return _react["default"].createElement("div", null, _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "nombreArchivo",
        className: "col-form-label"
      }, "Nombre del Archivo:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("input", {
        id: "nombreArchivo",
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
        htmlFor: "ubicacionArchivo",
        className: "col-form-label"
      }, "Ubicaci\xF3n del Archivo:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("p", {
        className: "lead"
      }, this.state.ubicacionArchivo))), _react["default"].createElement("div", {
        className: "text-center",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-primary active",
        onClick: this.seleccionarArchivo
      }, "Seleccionar Ubicaci\xF3n")), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
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
        htmlFor: "operacion",
        className: "col-form-label"
      }, "Tipo:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("select", {
        id: "operacion",
        className: "form-control"
      }, _react["default"].createElement("option", {
        value: "ASIG"
      }, "Asignar"), _react["default"].createElement("option", {
        value: "SUM"
      }, "Sumar"), _react["default"].createElement("option", {
        value: "PROM"
      }, "Promedio"), _react["default"].createElement("option", {
        value: "MAX"
      }, "M\xE1ximo"), _react["default"].createElement("option", {
        value: "MIN"
      }, "M\xEDnimo"), _react["default"].createElement("option", {
        value: "COUNT"
      }, "Contar")))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "hojaExcelVariable",
        className: "col-form-label"
      }, "Hoja de Excel:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("input", {
        id: "hojaExcelVariable",
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
        htmlFor: "tipoVariable",
        className: "col-form-label"
      }, "Tipo de Variable en Celda:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("select", {
        id: "tipoVariable",
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
        htmlFor: "celdasVariable",
        className: "col-form-label"
      }, "Celdas de Variable:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("input", {
        id: "celdasVariable",
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
        htmlFor: "analista",
        className: "col-form-label"
      }, "Nombre Encargado")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("input", {
        id: "analista",
        defaultValue: this.props.analistaVariable,
        onKeyUp: this.props.actualizarNombreEncargado,
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
        defaultChecked: true,
        name: "guardarVariable",
        id: "guardarVariable"
      }), _react["default"].createElement("span", null, _react["default"].createElement("label", {
        htmlFor: "guardarVariable"
      }))))), _react["default"].createElement("div", {
        className: "text-center",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-success active",
        onClick: this.crearVariable
      }, "Crear Variable")), _react["default"].createElement("br", null)), this.state.variables.map(function (variable, i) {
        return _react["default"].createElement("div", {
          key: variable.nombre + i,
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("hr", null), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "nombreVariable" + i,
          className: "col-form-label"
        }, "Nombre de Variable:")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("input", {
          id: "nombreVariable" + i,
          type: "text",
          defaultValue: variable.nombre,
          className: "form-control form-control-sm"
        }))), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "operacion" + i,
          className: "col-form-label"
        }, "Operaci\xF3n:")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("select", {
          id: "operacion" + i,
          defaultValue: variable.operacion,
          className: "form-control"
        }, _react["default"].createElement("option", {
          value: "ASIG"
        }, "Asignar"), _react["default"].createElement("option", {
          value: "SUM"
        }, "Sumar"), _react["default"].createElement("option", {
          value: "PROM"
        }, "Promedio"), _react["default"].createElement("option", {
          value: "MAX"
        }, "M\xE1ximo"), _react["default"].createElement("option", {
          value: "MIN"
        }, "M\xEDnimo"), _react["default"].createElement("option", {
          value: "COUNT"
        }, "Contar")))), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "hojaExcelVariable" + i,
          className: "col-form-label"
        }, "Hoja de Excel:")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("input", {
          id: "hojaExcelVariable" + i,
          type: "text",
          defaultValue: variable.celdas,
          className: "form-control form-control-sm"
        }))), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "tipoVariable" + i,
          className: "col-form-label"
        }, "Tipo de Variable en Celda:")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("select", {
          id: "tipoVariable" + i,
          defaultValue: variable.tipo,
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
          htmlFor: "celdasVariable" + i,
          className: "col-form-label"
        }, "Celdas de Variable:")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("input", {
          id: "celdasVariable" + i,
          type: "text",
          defaultValue: variable.celdas,
          className: "form-control form-control-sm"
        }))), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "periodicidad" + i,
          className: "col-form-label"
        }, "Periodicidad")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("select", {
          id: "periodicidad" + i,
          defaultValue: variable.periodicidad,
          onChange: function onChange() {
            return _this10.actualizarPeriodicidadUpdate(i);
          },
          className: "form-control"
        }, _react["default"].createElement("option", {
          value: "-1"
        }, "Ninguno"), periodicidad.map(function (periodicidad, i) {
          return _react["default"].createElement("option", {
            value: periodicidad.nombre,
            key: periodicidad.nombre
          }, periodicidad.nombre);
        })))), _this10.state.valoresPeriodicidad[i].localeCompare("-1") != 0 && _this10.inicializarFecha(variable.periodicidad, i, variable.fechaInicioCalculo) ? _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "fecha" + i,
          className: "col-form-label"
        }, "Fecha de Inicio de C\xE1lculo:")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("input", {
          type: "text",
          className: "form-control",
          id: "fecha" + i
        }))) : null, _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "analista" + i,
          className: "col-form-label"
        }, "Nombre Encargado")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("input", {
          id: "analista" + i,
          defaultValue: variable.analista,
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
          htmlFor: "guardarVariable" + i,
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
          defaultChecked: variable.guardar,
          name: "guardarVariable" + i,
          id: "guardarVariable" + i
        }), _react["default"].createElement("span", null, _react["default"].createElement("label", {
          htmlFor: "guardarVariable" + i
        }))))), _react["default"].createElement("div", {
          className: "text-center",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-success active",
          onClick: function onClick() {
            return _this10.updateVariable(i);
          }
        }, "Modificar Variable"), _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-danger active",
          onClick: function onClick() {
            return _this10.deleteVariable(i);
          },
          style: {
            marginLeft: "10px"
          }
        }, "Eliminar Variable")));
      }), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-brand active",
        onClick: this.guardarUbicacionArchivo
      }, "Modificar Configuraci\xF3n de Archivo de Excel"), this.props.tipoVariableOriginal.localeCompare("excel") == 0 ? _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-secondary active",
        style: {
          marginLeft: "10px"
        },
        onClick: this.props.eliminarVarExcel
      }, "Eliminar Variable") : null, this.props.tipoVariableOriginal.localeCompare("excel") == 0 ? _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-primary active",
        style: {
          marginLeft: "10px"
        },
        onClick: this.calculoVariable
      }, "Realizar C\xE1lculo") : null), _react["default"].createElement("br", null));
    }
  }]);

  return FuenteDatoExcel;
}(_react["default"].Component);

exports["default"] = FuenteDatoExcel;
//# sourceMappingURL=FuenteDatoExcel.js.map
