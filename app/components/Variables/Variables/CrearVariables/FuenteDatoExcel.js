"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _electron = _interopRequireDefault(require("electron"));

var _mssql = _interopRequireDefault(require("mssql"));

var _xlsxStyle = _interopRequireDefault(require("xlsx-style"));

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
var nombreArchivo = '',
    ubicacionArchivo = '';
var nombreVariable = '',
    idFormula = '',
    descripcionVariable = '',
    operacion = '',
    hojaExcel = '',
    tipoVariable = '',
    celdasVariable = '',
    periodicidadVariable = '',
    responsableVariable = '',
    categoriaVariable = '';

var FuenteDatoExcel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FuenteDatoExcel, _React$Component);

  function FuenteDatoExcel(props) {
    var _this;

    _classCallCheck(this, FuenteDatoExcel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FuenteDatoExcel).call(this, props));
    _this.state = {
      ubicacionArchivo: ubicacionArchivo,
      variables: [],
      valorPeriodicidad: '-1',
      valoresPeriodicidad: [],
      usuarios: [],
      hojas: []
    };
    _this.seleccionarArchivo = _this.seleccionarArchivo.bind(_assertThisInitialized(_this));
    _this.guardarUbicacionArchivo = _this.guardarUbicacionArchivo.bind(_assertThisInitialized(_this));
    _this.traerArchivoID = _this.traerArchivoID.bind(_assertThisInitialized(_this));
    _this.guardarVariables = _this.guardarVariables.bind(_assertThisInitialized(_this));
    _this.crearVariable = _this.crearVariable.bind(_assertThisInitialized(_this));
    _this.updateVariable = _this.updateVariable.bind(_assertThisInitialized(_this));
    _this.deleteVariable = _this.deleteVariable.bind(_assertThisInitialized(_this));
    _this.getVariables = _this.getVariables.bind(_assertThisInitialized(_this));
    _this.getExcel = _this.getExcel.bind(_assertThisInitialized(_this));
    _this.getFormas = _this.getFormas.bind(_assertThisInitialized(_this));
    _this.verificarNoExisteNombreVar = _this.verificarNoExisteNombreVar.bind(_assertThisInitialized(_this));
    _this.verificarNoExisteNombreVarUpdate = _this.verificarNoExisteNombreVarUpdate.bind(_assertThisInitialized(_this));
    _this.actualizarPeriodicidad = _this.actualizarPeriodicidad.bind(_assertThisInitialized(_this));
    _this.cargarDatePicker = _this.cargarDatePicker.bind(_assertThisInitialized(_this));
    _this.actualizarPeriodicidadUpdate = _this.actualizarPeriodicidadUpdate.bind(_assertThisInitialized(_this));
    _this.inicializarFecha = _this.inicializarFecha.bind(_assertThisInitialized(_this));
    _this.isValidDate = _this.isValidDate.bind(_assertThisInitialized(_this));
    _this.tieneEspaciosEnBlanco = _this.tieneEspaciosEnBlanco.bind(_assertThisInitialized(_this));
    _this.getUsuarios = _this.getUsuarios.bind(_assertThisInitialized(_this));
    _this.actualizarNombreArchivo = _this.actualizarNombreArchivo.bind(_assertThisInitialized(_this));
    _this.actualizarNombreVariable = _this.actualizarNombreVariable.bind(_assertThisInitialized(_this));
    _this.actualizarIdFormula = _this.actualizarIdFormula.bind(_assertThisInitialized(_this));
    _this.actualizarDescripcionVariable = _this.actualizarDescripcionVariable.bind(_assertThisInitialized(_this));
    _this.updateOperacion = _this.updateOperacion.bind(_assertThisInitialized(_this));
    _this.updateHojaExcel = _this.updateHojaExcel.bind(_assertThisInitialized(_this));
    _this.updateTipoVariable = _this.updateTipoVariable.bind(_assertThisInitialized(_this));
    _this.actualizarCeldasVariable = _this.actualizarCeldasVariable.bind(_assertThisInitialized(_this));
    _this.actualizarPeriodicidad = _this.actualizarPeriodicidad.bind(_assertThisInitialized(_this));
    _this.actualizarNombreEncargado = _this.actualizarNombreEncargado.bind(_assertThisInitialized(_this));
    _this.actualizarCategoriaVariable = _this.actualizarCategoriaVariable.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FuenteDatoExcel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getVariables();
      this.getExcel();
      this.getFormas();
      this.getUsuarios();
    }
  }, {
    key: "saveBitacora",
    value: function saveBitacora(fecha, descripcion) {
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
        var workbook = null;
        workbook = _xlsxStyle["default"].readFile(fileExcel[0]);
        var hojas = [];

        if (workbook != null) {
          for (var i = 0; i < workbook.SheetNames.length; i++) {
            hojas.push(workbook.SheetNames[i]);
          }

          ;
          ubicacionArchivo = fileExcel[0];
          this.setState({
            ubicacionArchivo: fileExcel[0],
            hojas: hojas
          });
        } else {
          this.props.showMessage("Error", "No se pudo abrir el archivo.", true, false, {});
        }
      }
    }
  }, {
    key: "guardarUbicacionArchivo",
    value: function guardarUbicacionArchivo() {
      var _this3 = this;

      var nombre = $("#nombreArchivo").val();

      if (nombre.length > 0 && nombre.length < 101) {
        if (this.state.ubicacionArchivo.length > 0 && this.state.ubicacionArchivo.length < 1001) {
          var transaction = new _mssql["default"].Transaction(this.props.pool);
          transaction.begin(function (err) {
            var rolledBack = false;
            transaction.on('rollback', function (aborted) {
              rolledBack = true;
            });
            var request = new _mssql["default"].Request(transaction);
            request.query("insert into ExcelArchivos (ubicacionArchivo, nombre) values ('" + _this3.state.ubicacionArchivo + "', '" + nombre + "')", function (err, result) {
              if (err) {
                console.log(err);

                _this3.props.showMessage("Error", 'Error al guardar archivo de excel.', true, false, {});

                if (!rolledBack) {
                  transaction.rollback(function (err) {});
                }
              } else {
                transaction.commit(function (err) {
                  _this3.props.showSuccesMessage("Éxito", 'Variable Creada.');

                  $("#nombreArchivo").val("");
                  nombreArchivo = '';
                  ubicacionArchivo = '';

                  _this3.setState({
                    ubicacionArchivo: ""
                  });

                  _this3.traerArchivoID();
                });
              }
            });
          }); // fin transaction
        } else {
          this.props.showMessage("Error", 'Ingrese un valor para la ubicación del archivo que debe ser menor a 1001 caracteres.', true, false, {});
        }
      } else {
        this.props.showMessage("Error", 'Ingrese un nombre el archivo que debe ser menor a 101 caracteres.', true, false, {});
      }
    }
  }, {
    key: "traerArchivoID",
    value: function traerArchivoID() {
      var _this4 = this;

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

            _this4.props.showMessage("Error", 'Error al seleccionar ID de variable.', true, false, {});

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this4.guardarVariables(result.recordset[0].ID);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "guardarVariables",
    value: function guardarVariables(archivoExcelID) {
      var _this5 = this;

      var _loop = function _loop(i) {
        var nombreHoja = _this5.state.variables[i].nombreHoja;
        var nombre = _this5.state.variables[i].nombre;
        var idFormula = _this5.state.variables[i].idFormula;
        var descripcion = _this5.state.variables[i].descripcion;
        var operacion = _this5.state.variables[i].operacion;
        var celdas = _this5.state.variables[i].celdas;
        var tipo = _this5.state.variables[i].tipo;
        var periodicidad = _this5.state.variables[i].periodicidad;
        var fechaInicioCalculo = _this5.state.variables[i].fechaInicioCalculo;
        var responsable = _this5.state.variables[i].responsable;
        var categoriaVariable = _this5.state.variables[i].categoriaVariable;
        var guardarVariable = _this5.state.variables[i].guardar;
        var transaction = new _mssql["default"].Transaction(_this5.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("insert into ExcelVariables (excelArchivoID, nombreHoja, nombre, idFormula, descripcion, operacion, celdas, tipo, periodicidad, fechaInicioCalculo, responsable, categoriaVariable, guardar) values (" + archivoExcelID + ", '" + nombreHoja + "', '" + nombre + "', '" + idFormula + "', '" + descripcion + "', '" + operacion + "', '" + celdas + "', '" + tipo + "', '" + periodicidad + "', '" + fechaInicioCalculo.getFullYear() + "-" + (fechaInicioCalculo.getMonth() + 1) + "-" + fechaInicioCalculo.getDate() + "', '" + responsable + "', '" + categoriaVariable + "', '" + guardarVariable + "')", function (err, result) {
            if (err) {
              console.log(err);

              _this5.props.showMessage("Error", 'Error al crear variable.', true, false, {});

              if (!rolledBack) {
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                if (i == _this5.state.variables.length - 1) {
                  _this5.setState({
                    variables: []
                  });

                  _this5.getExcel();

                  _this5.props.getExcel();
                }
              });
            }
          });
        }); // fin transaction
      };

      for (var i = 0; i < this.state.variables.length; i++) {
        _loop(i);
      }

      ;
    }
  }, {
    key: "crearVariable",
    value: function crearVariable() {
      var nombre = $("#nombreVariable").val();
      var idFormula = $("#idFormula").val();
      var descripcion = $("#descripcionVariable").val();
      var operacion = $("#operacion").val();
      var celdas = $("#celdasVariable").val();
      var hoja = $("#hojaExcelVariable").val();
      var tipo = $("#tipoVariable").val();
      var guardarVariable;
      if ($("#guardarVariable").is(':checked')) guardarVariable = true;else guardarVariable = false;
      var periodicidad = $("#periodicidad").val();
      var fecha;
      if (periodicidad.localeCompare("-1") == 0) fecha = new Date(1964, 4, 28);else fecha = $("#fecha").datepicker('getDate');
      var responsable = $("#responsable").val();
      var categoriaVariable = $("#categoriaVariable").val();

      if (nombre.length > 0 && nombre.length < 101) {
        if (idFormula.length > 0 && idFormula.length < 101) {
          if (descripcion.length < 701) {
            if (this.verificarNoExisteNombreVar(idFormula)) {
              if (!this.tieneEspaciosEnBlanco(idFormula)) {
                if (operacion.length > 0 && operacion.length < 31) {
                  if (celdas.length > 0 && celdas.length < 101) {
                    if (hoja.length > 0 && hoja.length < 201) {
                      if (tipo.length > 0 && tipo.length < 31) {
                        if (periodicidad.length > 0 && periodicidad.length < 51) {
                          if (this.isValidDate(fecha)) {
                            if (responsable.length > 0 && responsable.length < 101) {
                              if (categoriaVariable.length < 101) {
                                var copyTemp = _toConsumableArray(this.state.variables);

                                var nuevaVar = {
                                  nombreHoja: hoja,
                                  nombre: nombre,
                                  idFormula: idFormula,
                                  descripcion: descripcion,
                                  operacion: operacion,
                                  celdas: celdas,
                                  tipo: tipo,
                                  periodicidad: periodicidad,
                                  fechaInicioCalculo: fecha,
                                  responsable: responsable,
                                  categoriaVariable: categoriaVariable,
                                  guardar: guardarVariable
                                };

                                var copyTempPeriodicidad = _toConsumableArray(this.state.valoresPeriodicidad);

                                copyTemp.push(nuevaVar);
                                copyTempPeriodicidad.push(periodicidad);
                                this.setState({
                                  variables: copyTemp,
                                  valoresPeriodicidad: copyTempPeriodicidad
                                });
                                nombreVariable = '';
                                idFormula = '';
                                descripcionVariable = '';
                                operacion = '';
                                hojaExcel = '';
                                tipoVariable = '';
                                celdasVariable = '';
                                periodicidadVariable = '';
                                responsableVariable = '';
                                categoriaVariable = '';
                                $("#nombreVariable").val("");
                                $("#idFormula").val("");
                                $("#descripcionVariable").val("");
                                $("#operacion").val("ASIG");
                                $("#hojaExcelVariable").val(this.state.hojas[0]);
                                $("#tipoVariable").val("numero");
                                $("#celdasVariable").val("");
                                $("#categoriaVariable").val(""); //$("#periodicidad").val("");

                                $("#responsable").val("-1");
                              } else {
                                this.props.showMessage("Error", 'Ingrese un valor para el valor de categoria de variable que debe ser menor a 101 caracteres.', true, false, {});
                              }
                            } else {
                              this.props.showMessage("Error", 'Ingrese un valor para el valor de responsable que debe ser menor a 101 caracteres.', true, false, {});
                            }
                          } else {
                            this.props.showMessage("Error", 'Ingrese un valor para el valor de inicio de cálculo.', true, false, {});
                          }
                        } else {
                          this.props.showMessage("Error", 'Ingrese un valor para el valor de periodicidad que debe ser menor a 51 caracteres.', true, false, {});
                        }
                      } else {
                        this.props.showMessage("Error", 'Ingrese un valor para el valor de tipo de variable que debe ser menor a 31 caracteres.', true, false, {});
                      }
                    } else {
                      this.props.showMessage("Error", 'Ingrese un valor para el valor de hoja de excel que debe ser menor a 201 caracteres.', true, false, {});
                    }
                  } else {
                    this.props.showMessage("Error", 'Ingrese un valor para el valor de celdas que debe ser menor a 101 caracteres.', true, false, {});
                  }
                } else {
                  this.props.showMessage("Error", 'Ingrese un valor para el valor de operación que debe ser menor a 31 caracteres.', true, false, {});
                }
              } else {
                this.props.showMessage("Error", 'El identificador de la variable en fórmula no debe contener espacios en blanco.', true, false, {});
              }
            } else {
              this.props.showMessage("Error", 'El identificador de la variable en fórmula debe ser único.', true, false, {});
            }
          } else {
            this.props.showMessage("Error", 'La descripción de la variable debe ser menor a 701 caracteres.', true, false, {});
          }
        } else {
          this.props.showMessage("Error", 'Ingrese un valor para el identificador de la variable en fórmula que debe ser menor a 101 caracteres.', true, false, {});
        }
      } else {
        this.props.showMessage("Error", 'Ingrese un valor para el nombre de la variable que debe ser menor a 501 caracteres.', true, false, {});
      }
    }
  }, {
    key: "updateVariable",
    value: function updateVariable(index) {
      if ($("#nombreVariable" + index).length > 0 && $("#nombreVariable" + index).length < 501) {
        if ($("#idFormula" + index).length > 0 && $("#idFormula" + index).length < 101) {
          if ($("#descripcionVariable" + index).length < 701) {
            if ($("#operacion" + index).val().length > 0 && $("#operacion" + index).val().length < 31) {
              if ($("#celdasVariable" + index).length > 0 && $("#celdasVariable" + index).length < 101) {
                if ($("#hojaExcelVariable" + index).length > 0 && $("#hojaExcelVariable" + index).length < 201) {
                  if ($("#tipoVariable" + index).val().length > 0 && $("#tipoVariable" + index).val().length < 31) {
                    if ($("#periodicidad" + index).val().length > 0 && $("#periodicidad" + index).val().length < 51) {
                      var fecha;
                      if ($("#periodicidad" + index).val().localeCompare("-1") == 0) fecha = new Date(1964, 4, 28);else fecha = $("#fecha" + index).datepicker('getDate');

                      if (this.isValidDate(fecha)) {
                        if ($("#responsable" + index).val().length > 0 && $("#responsable" + index).val().length < 101) {
                          if ($("#categoriaVariable" + index).val().length < 101) {
                            if (this.verificarNoExisteNombreVarUpdate($("#idFormula" + index).val(), index)) {
                              if (!this.tieneEspaciosEnBlanco($("#idFormula" + index).val())) {
                                var copyTemp = _toConsumableArray(this.state.variables);

                                copyTemp[index].nombre = $("#nombreVariable" + index).val();
                                copyTemp[index].idFormula = $("#idFormula" + index).val();
                                copyTemp[index].descripcion = $("#descripcionVariable" + index).val();
                                copyTemp[index].operacion = $("#operacion" + index).val();
                                copyTemp[index].celdas = $("#celdasVariable" + index).val();
                                copyTemp[index].nombreHoja = $("#hojaExcelVariable" + index).val();
                                copyTemp[index].tipo = $("#tipoVariable" + index).val();
                                copyTemp[index].periodicidad = $("#periodicidad" + index).val();
                                copyTemp[index].fechaInicioCalculo = fecha;
                                copyTemp[index].responsable = $("#responsable" + index).val();
                                copyTemp[index].categoriaVariable = $("#categoriaVariable" + index).val();
                                var guardarVariable;
                                if ($("#guardarVariable" + index).is(':checked')) guardarVariable = true;else guardarVariable = false;
                                copyTemp[index].guardar = guardarVariable;

                                var copyTempPeriodicidad = _toConsumableArray(this.state.valoresPeriodicidad);

                                copyTempPeriodicidad[index] = $("#periodicidad" + index).val();
                                this.setState({
                                  variables: copyTemp,
                                  valoresPeriodicidad: copyTempPeriodicidad
                                });
                                this.props.showSuccesMessage("Éxito", 'Variable Modificada.');
                              } else {
                                this.props.showMessage("Error", 'El identificador de la variable en fórmula no debe contener espacios en blanco.', true, false, {});
                              }
                            } else {
                              this.props.showMessage("Error", 'El identificador de la variable en fórmula debe ser único.', true, false, {});
                            }
                          } else {
                            this.props.showMessage("Error", 'Ingrese un valor para el valor de categoria de variable que debe ser menor a 101 caracteres.', true, false, {});
                          }
                        } else {
                          this.props.showMessage("Error", 'Ingrese un valor para el valor de responsable que debe ser menor a 101 caracteres.', true, false, {});
                        }
                      } else {
                        this.props.showMessage("Error", 'Ingrese un valor para el valor de inicio de cálculo.', true, false, {});
                      }
                    } else {
                      this.props.showMessage("Error", 'Ingrese un valor para el valor de periodicidad que debe ser menor a 51 caracteres.', true, false, {});
                    }
                  } else {
                    this.props.showMessage("Error", 'Ingrese un valor para el valor de tipo de variable que debe ser menor a 31 caracteres.', true, false, {});
                  }
                } else {
                  this.props.showMessage("Error", 'Ingrese un valor para el valor de hoja de excel que debe ser menor a 201 caracteres.', true, false, {});
                }
              } else {
                this.props.showMessage("Error", 'Ingrese un valor para el valor de celdas que debe ser menor a 101 caracteres.', true, false, {});
              }
            } else {
              this.props.showMessage("Error", 'Ingrese un valor para el valor de operación que debe ser menor a 31 caracteres.', true, false, {});
            }
          } else {
            this.props.showMessage("Error", 'La descripción de la variable debe ser menor a 701 caracteres.', true, false, {});
          }
        } else {
          this.props.showMessage("Error", 'Ingrese un valor para el identificador de la variable en fórmula que debe ser menor a 101 caracteres.', true, false, {});
        }
      } else {
        this.props.showMessage("Error", 'Ingrese un valor para el nombre de la variable que debe ser menor a 501 caracteres.', true, false, {});
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
      this.props.showSuccesMessage("Éxito", 'Variable Eliminada.');
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
    value: function verificarNoExisteNombreVar(idFormula) {
      var noExiste = true;

      for (var i = 0; i < variables.length; i++) {
        if (variables[i].idFormula.toLowerCase().localeCompare(idFormula.toLowerCase()) == 0) {
          noExiste = false;
          break;
        }
      }

      ;

      if (noExiste) {
        for (var i = 0; i < excel.length; i++) {
          if (excel[i].idFormula.toLowerCase().localeCompare(idFormula.toLowerCase()) == 0) {
            noExiste = false;
            break;
          }
        }

        ;
      }

      if (noExiste) {
        for (var i = 0; i < this.state.variables.length; i++) {
          if (this.state.variables[i].idFormula.toLowerCase().localeCompare(idFormula.toLowerCase()) == 0) {
            noExiste = false;
            break;
          }
        }

        ;
      }

      if (noExiste) {
        for (var i = 0; i < formas.length; i++) {
          if (formas[i].idFormula.toLowerCase().localeCompare(idFormula.toLowerCase()) == 0) {
            noExiste = false;
            break;
          }
        }

        ;
      }

      return noExiste;
    }
  }, {
    key: "verificarNoExisteNombreVarUpdate",
    value: function verificarNoExisteNombreVarUpdate(idFormula, index) {
      var noExiste = true;

      for (var i = 0; i < variables.length; i++) {
        if (variables[i].idFormula.toLowerCase().localeCompare(idFormula.toLowerCase()) == 0) {
          noExiste = false;
          break;
        }
      }

      ;

      if (noExiste) {
        for (var i = 0; i < excel.length; i++) {
          if (excel[i].idFormula.toLowerCase().localeCompare(idFormula.toLowerCase()) == 0) {
            noExiste = false;
            break;
          }
        }

        ;
      }

      if (noExiste) {
        for (var i = 0; i < this.state.variables.length; i++) {
          if (this.state.variables[i].idFormula.toLowerCase().localeCompare(idFormula.toLowerCase()) == 0 && index != i) {
            noExiste = false;
            break;
          }
        }

        ;
      }

      if (noExiste) {
        for (var i = 0; i < formas.length; i++) {
          if (formas[i].idFormula.toLowerCase().localeCompare(idFormula.toLowerCase()) == 0) {
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
    key: "actualizarPeriodicidadUpdate",
    value: function actualizarPeriodicidadUpdate(index) {
      var periodicidad = $("#periodicidad" + index).val();

      var copyTempPeriodicidad = _toConsumableArray(this.state.valoresPeriodicidad);

      copyTempPeriodicidad[index] = periodicidad;
      this.setState({
        valorPeriodicidad: periodicidad,
        valoresPeriodicidad: copyTempPeriodicidad
      });
    }
  }, {
    key: "inicializarFecha",
    value: function inicializarFecha(index, fecha) {
      if (this.state.valoresPeriodicidad[index].localeCompare("-1") != 0) {
        setTimeout(function () {
          $('#fecha' + index).datepicker({
            format: "dd-mm-yyyy",
            todayHighlight: true,
            viewMode: "days",
            minViewMode: "days",
            language: 'es'
          });

          if (fecha.getFullYear() == 1964 && fecha.getMonth() == 4 && fecha.getDate() == 28) {//
          } else {
            $("#fecha" + index).datepicker("setDate", fecha);
          }
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
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  }, {
    key: "tieneEspaciosEnBlanco",
    value: function tieneEspaciosEnBlanco(s) {
      return /\s/g.test(s);
    }
  }, {
    key: "getUsuarios",
    value: function getUsuarios() {
      var _this6 = this;

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
              _this6.setState({
                usuarios: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "actualizarNombreArchivo",
    value: function actualizarNombreArchivo() {
      var nombreArchivoN = $("#nombreArchivo").val();
      nombreArchivo = nombreArchivoN;
    }
  }, {
    key: "actualizarNombreVariable",
    value: function actualizarNombreVariable() {
      var nombreVariableN = $("#nombreVariable").val();
      nombreVariable = nombreVariableN;
    }
  }, {
    key: "actualizarIdFormula",
    value: function actualizarIdFormula() {
      var idFormulaN = $("#idFormula").val();
      idFormula = idFormulaN;
    }
  }, {
    key: "actualizarDescripcionVariable",
    value: function actualizarDescripcionVariable() {
      var descripcionVariableN = $("#descripcionVariable").val();
      descripcionVariable = descripcionVariableN;
    }
  }, {
    key: "updateOperacion",
    value: function updateOperacion() {
      var operacionN = $("#operacion").val();
      operacion = operacionN;
    }
  }, {
    key: "updateHojaExcel",
    value: function updateHojaExcel() {
      var hojaExcelVariableN = $("#hojaExcelVariable").val();
      hojaExcelVariable = hojaExcelVariableN;
    }
  }, {
    key: "updateTipoVariable",
    value: function updateTipoVariable() {
      var tipoVariableN = $("#tipoVariable").val();
      tipoVariable = tipoVariableN;
    }
  }, {
    key: "actualizarCeldasVariable",
    value: function actualizarCeldasVariable() {
      var celdasVariableN = $("#celdasVariable").val();
      celdasVariable = celdasVariableN;
    }
  }, {
    key: "actualizarPeriodicidad",
    value: function actualizarPeriodicidad() {
      var periodicidadVariableN = $("#periodicidadVariable").val();
      periodicidadVariable = periodicidadVariableN;
    }
  }, {
    key: "actualizarNombreEncargado",
    value: function actualizarNombreEncargado() {
      var responsableVariableN = $("#responsableVariable").val();
      responsableVariable = responsableVariableN;
    }
  }, {
    key: "actualizarCategoriaVariable",
    value: function actualizarCategoriaVariable() {
      var categoriaVariableN = $("#categoriaVariable").val();
      categoriaVariable = categoriaVariableN;
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

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
        defaultValue: nombreArchivo,
        onKeyUp: this.actualizarNombreArchivo,
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
          width: "100%",
          display: this.state.ubicacionArchivo.length > 0 ? "inline" : "none"
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
        defaultValue: nombreVariable,
        onKeyUp: this.actualizarNombreVariable,
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
        htmlFor: "idFormula",
        className: "col-form-label"
      }, "Identificador de la Variable en F\xF3rmula")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("input", {
        id: "idFormula",
        defaultValue: idFormula,
        onKeyUp: this.actualizarIdFormula,
        type: "text",
        className: "form-control form-control-sm"
      }))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"
      }, _react["default"].createElement("label", {
        htmlFor: "descripcionVariable",
        className: "col-form-label"
      }, "Descripci\xF3n de Variable:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"
      }, _react["default"].createElement("textarea", {
        defaultValue: descripcionVariable,
        onKeyUp: this.actualizarDescripcionVariable,
        className: "form-control",
        id: "descripcionVariable",
        rows: "3"
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
        className: "form-control",
        defaultValue: operacion,
        onChange: this.updateOperacion
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
      }, _react["default"].createElement("select", {
        id: "hojaExcelVariable",
        className: "form-control",
        defaultValue: hojaExcel,
        onChange: this.updateHojaExcel
      }, this.state.hojas.map(function (hoja, i) {
        return _react["default"].createElement("option", {
          value: hoja,
          key: hoja
        }, hoja);
      })))), _react["default"].createElement("div", {
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
        className: "form-control",
        defaultValue: tipoVariable,
        onChange: this.updateTipoVariable
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
        defaultValue: celdasVariable,
        onKeyUp: this.actualizarCeldasVariable,
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
        className: "form-control",
        defaultValue: periodicidadVariable,
        onChange: this.actualizarPeriodicidad
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
        className: "form-control",
        defaultValue: responsableVariable,
        onChange: this.actualizarNombreEncargado
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
        htmlFor: "categoriaVariable",
        className: "col-form-label"
      }, "Categor\xEDa de Variable")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("input", {
        id: "categoriaVariable",
        defaultValue: categoriaVariable,
        onChange: this.actualizarCategoriaVariable,
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
          htmlFor: "idFormula" + i,
          className: "col-form-label"
        }, "Identificador de la Variable en F\xF3rmula")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("input", {
          id: "idFormula" + i,
          defaultValue: variable.idFormula,
          type: "text",
          className: "form-control form-control-sm"
        }))), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"
        }, _react["default"].createElement("label", {
          htmlFor: "descripcionVariable" + i,
          className: "col-form-label"
        }, "Descripci\xF3n de Variable:")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"
        }, _react["default"].createElement("textarea", {
          defaultValue: variable.descripcion,
          className: "form-control",
          id: "descripcionVariable" + i,
          rows: "3"
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
        }, _react["default"].createElement("select", {
          id: "hojaExcelVariable" + i,
          defaultValue: variable.nombreHoja,
          className: "form-control"
        }, _this7.state.hojas.map(function (hoja, i) {
          return _react["default"].createElement("option", {
            value: hoja,
            key: hoja
          }, hoja);
        })))), _react["default"].createElement("div", {
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
            return _this7.actualizarPeriodicidadUpdate(i);
          },
          className: "form-control"
        }, _react["default"].createElement("option", {
          value: "-1"
        }, "Ninguno"), periodicidad.map(function (periodicidad, i) {
          return _react["default"].createElement("option", {
            value: periodicidad.nombre,
            key: periodicidad.nombre
          }, periodicidad.nombre);
        })))), _this7.state.valoresPeriodicidad[i].localeCompare("-1") != 0 && _this7.inicializarFecha(i, variable.fechaInicioCalculo) ? _react["default"].createElement("div", {
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
          htmlFor: "responsable" + i,
          className: "col-form-label"
        }, "Nombre Encargado")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("select", {
          id: "responsable" + i,
          defaultValue: variable.responsable,
          className: "form-control"
        }, _react["default"].createElement("option", {
          value: "-1"
        }, "Ninguno"), _this7.state.usuarios.map(function (usuario, i) {
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
          htmlFor: "categoriaVariable" + i,
          className: "col-form-label"
        }, "Categor\xEDa de Variable")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("input", {
          id: "categoriaVariable" + i,
          defaultValue: variable.categoriaVariable,
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
          defaultChecked: true,
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
            return _this7.updateVariable(i);
          }
        }, "Modificar Variable"), _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-danger active",
          onClick: function onClick() {
            return _this7.deleteVariable(i);
          },
          style: {
            marginLeft: "10px"
          }
        }, "Eliminar Variable")));
      }), _react["default"].createElement("br", null), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
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
      }, "Guardar Configuraci\xF3n de Archivo de Excel")), _react["default"].createElement("br", null));
    }
  }]);

  return FuenteDatoExcel;
}(_react["default"].Component);

exports["default"] = FuenteDatoExcel;
//# sourceMappingURL=FuenteDatoExcel.js.map
