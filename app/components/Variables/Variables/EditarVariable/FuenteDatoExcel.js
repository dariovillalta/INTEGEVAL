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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var agregoVariable = false;
var banderaVariablesATraer = 0;
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

window.arregloDeErroresExcel = [];
/*
    **************************************
    **************************************
            VARIABLES CALCULO FIN
    **************************************
    **************************************
*/

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
      hojas: [],
      showModal: false
    };
    _this.saveBitacora = _this.saveBitacora.bind(_assertThisInitialized(_this));
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
    _this.verificarNoExisteNombreVarUpdate = _this.verificarNoExisteNombreVarUpdate.bind(_assertThisInitialized(_this));
    _this.actualizarPeriodicidad = _this.actualizarPeriodicidad.bind(_assertThisInitialized(_this));
    _this.cargarDatePicker = _this.cargarDatePicker.bind(_assertThisInitialized(_this));
    _this.actualizarPeriodicidadUpdate = _this.actualizarPeriodicidadUpdate.bind(_assertThisInitialized(_this));
    _this.inicializarFecha = _this.inicializarFecha.bind(_assertThisInitialized(_this));
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
    _this.verificarFinTraerPeriodicidad = _this.verificarFinTraerPeriodicidad.bind(_assertThisInitialized(_this));
    _this.crearVariablesExcel = _this.crearVariablesExcel.bind(_assertThisInitialized(_this));
    _this.getArregloPosicionesExcel = _this.getArregloPosicionesExcel.bind(_assertThisInitialized(_this));
    _this.getObjetoLetraNumeroCelda = _this.getObjetoLetraNumeroCelda.bind(_assertThisInitialized(_this));
    _this.esLetra = _this.esLetra.bind(_assertThisInitialized(_this));
    _this.toColumnLetter = _this.toColumnLetter.bind(_assertThisInitialized(_this));
    _this.toColumnNumber = _this.toColumnNumber.bind(_assertThisInitialized(_this));
    _this.tieneEspaciosEnBlanco = _this.tieneEspaciosEnBlanco.bind(_assertThisInitialized(_this));
    _this.getUsuarios = _this.getUsuarios.bind(_assertThisInitialized(_this));
    _this.goToTimeline = _this.goToTimeline.bind(_assertThisInitialized(_this));
    _this.closeModal = _this.closeModal.bind(_assertThisInitialized(_this));
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
      if (this.props.tipoVariableOriginal.localeCompare("excel") == 0) {
        this.traerArchivo();
      }

      this.getVariables();
      this.getExcel();
      this.getFormas();
      this.getUsuarios();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      nombreArchivo = '';
      ubicacionArchivo = '';
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
    key: "traerArchivo",
    value: function traerArchivo() {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ExcelArchivos where ID = " + _this3.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            _this3.props.showMessage("Error", 'No se pudo traer el archivo de excel.', true, false, {});

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                $("#nombreArchivo").val(result.recordset[0].nombre);
                var workbook = null;
                workbook = _xlsxStyle["default"].readFile(result.recordset[0].ubicacionArchivo);
                var hojas = [];

                if (workbook != null) {
                  for (var i = 0; i < workbook.SheetNames.length; i++) {
                    hojas.push(workbook.SheetNames[i]);
                  }

                  ;
                  ubicacionArchivo = result.recordset[0].ubicacionArchivo;

                  _this3.setState({
                    ubicacionArchivo: result.recordset[0].ubicacionArchivo,
                    hojas: hojas
                  });
                } else {
                  _this3.props.showMessage("Error", 'No se pudo abrir el archivo.', true, false, {});
                }

                _this3.traerVariables();

                agregoVariable = false;
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "traerVariables",
    value: function traerVariables() {
      var _this4 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ExcelVariables where excelArchivoID = " + _this4.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            _this4.props.showMessage("Error", 'No se pudo traer las variables de excel del archivo.', true, false, {});

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var temp = [];

              for (var i = 0; i < result.recordset.length; i++) {
                temp.push(result.recordset[i].periodicidad);
              }

              ;

              _this4.setState({
                variables: result.recordset,
                valoresPeriodicidad: temp
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
      var workbook = null;
      workbook = _xlsxStyle["default"].readFile(fileExcel[0]);
      var hojas = [];

      if (fileExcel != undefined && fileExcel.length > 0 && workbook != null) {
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
      var nombre = $("#nombreArchivo").val();

      if (nombre.length > 0 && nombre.length < 101) {
        if (this.state.ubicacionArchivo.length > 0 && this.state.ubicacionArchivo.length < 1001) {
          if (this.props.tipoVariableOriginal.localeCompare("forma") == 0) {
            this.eliminarVarForma();
          }

          if (this.props.tipoVariableOriginal.localeCompare("variable") == 0) {
            this.eliminarVariable();
          }

          var self = this;
          setTimeout(function () {
            var _this5 = this;

            if (self.props.tipoVariableOriginal.localeCompare("excel") != 0) {
              var transaction = new _mssql["default"].Transaction(self.props.pool);
              transaction.begin(function (err) {
                var rolledBack = false;
                transaction.on('rollback', function (aborted) {
                  rolledBack = true;
                });
                var request = new _mssql["default"].Request(transaction);
                request.query("insert into ExcelArchivos (ubicacionArchivo, nombre) values ('" + self.state.ubicacionArchivo + "', '" + nombre + "')", function (err, result) {
                  if (err) {
                    console.log(err);

                    _this5.props.showMessage("Error", 'Error al guardar archivo de excel.', true, false, {});

                    if (!rolledBack) {
                      transaction.rollback(function (err) {});
                    }
                  } else {
                    transaction.commit(function (err) {
                      _this5.props.showSuccesMessage("Éxito", 'Variable Creada.');

                      self.traerArchivoID();
                    });
                  }
                });
              }); // fin transaction
            } else {
              var _transaction = new _mssql["default"].Transaction(self.props.pool);

              _transaction.begin(function (err) {
                var rolledBack = false;

                _transaction.on('rollback', function (aborted) {
                  rolledBack = true;
                });

                var request = new _mssql["default"].Request(_transaction);
                request.query("update ExcelArchivos set ubicacionArchivo = '" + self.state.ubicacionArchivo + "', nombre = '" + nombre + "' where ID = " + self.props.idVariable, function (err, result) {
                  if (err) {
                    console.log(err);

                    _this5.props.showMessage("Error", 'Error al guardar archivo de excel.', true, false, {});

                    if (!rolledBack) {
                      _transaction.rollback(function (err) {});
                    }
                  } else {
                    _transaction.commit(function (err) {
                      _this5.props.showSuccesMessage("Éxito", 'Variable Creada.');

                      self.guardarVariablesModificar();
                    });
                  }
                });
              }); // fin transaction

            }
          }, 500);
        } else {
          this.props.showMessage("Error", 'Ingrese un valor para la ubicación del archivo que debe ser menor a 1001 caracteres.', true, false, {});
        }
      } else {
        this.props.showMessage("Error", 'Ingrese un nombre el archivo que debe ser menor a 101 caracteres.', true, false, {});
      }
    }
  }, {
    key: "guardarVariablesModificar",
    value: function guardarVariablesModificar() {
      var _this6 = this;

      var transaction1 = new _mssql["default"].Transaction(this.props.pool);
      transaction1.begin(function (err) {
        var rolledBack = false;
        transaction1.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction1);
        request.query("DELETE FROM ExcelVariables WHERE excelArchivoID = " + _this6.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            _this6.props.showMessage("Error", 'Error al eliminar variables al modificar.', true, false, {});

            if (!rolledBack) {
              transaction1.rollback(function (err) {});
            }
          } else {
            transaction1.commit(function (err) {});
          }
        });
      });
      var self = this;
      setTimeout(function () {
        var _this7 = this;

        var _loop = function _loop() {
          var nombreHoja = self.state.variables[i].nombreHoja;
          var nombre = self.state.variables[i].nombre;
          var idFormula = _this7.state.variables[i].idFormula;
          var descripcion = _this7.state.variables[i].descripcion;
          var operacion = self.state.variables[i].operacion;
          var celdas = self.state.variables[i].celdas;
          var tipo = self.state.variables[i].tipo;
          var periodicidad = self.state.variables[i].periodicidad;
          var fechaInicioCalculo = self.state.variables[i].fechaInicioCalculo;
          var responsable = self.state.variables[i].responsable;
          var categoriaVariable = _this7.state.variables[i].categoriaVariable;
          var guardarVariable = self.state.variables[i].guardar;
          var transaction = new _mssql["default"].Transaction(self.props.pool);
          transaction.begin(function (err) {
            var rolledBack = false;
            transaction.on('rollback', function (aborted) {
              rolledBack = true;
            });
            var request = new _mssql["default"].Request(transaction);
            request.query("insert into ExcelVariables (excelArchivoID, nombreHoja, nombre, idFormula, descripcion, operacion, celdas, tipo, periodicidad, fechaInicioCalculo, responsable, categoriaVariable, guardar) values (" + self.props.idVariable + ", '" + nombreHoja + "','" + nombre + "', '" + idFormula + "', '" + descripcion + "',' " + operacion + "', '" + celdas + "', '" + tipo + "', '" + periodicidad + "', '" + fechaInicioCalculo.getFullYear() + "-" + (fechaInicioCalculo.getMonth() + 1) + "-" + fechaInicioCalculo.getDate() + "', '" + responsable + "', '" + categoriaVariable + "', '" + guardarVariable + "')", function (err, result) {
              if (err) {
                console.log(err);

                if (!rolledBack) {
                  transaction.rollback(function (err) {});
                }
              } else {
                transaction.commit(function (err) {
                  if (i == self.state.variables.length - 1) {
                    self.traerArchivo();
                    self.getExcel();
                    self.props.getExcel();
                  }

                  if (agregoVariable) {
                    self.verificarSiExisteExcelEnResultadosHistoricosModificar(nombre);
                  }
                });
              }
            });
          }); // fin transaction
        };

        for (var i = 0; i < self.state.variables.length; i++) {
          _loop();
        }

        ;
      }, 500);
    }
  }, {
    key: "traerArchivoID",
    value: function traerArchivoID() {
      var _this8 = this;

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

            _this8.props.showMessage("Error", 'Error al seleccionar ID de variable.', true, false, {});

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this8.guardarVariablesNuevas(result.recordset[0].ID);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "guardarVariablesNuevas",
    value: function guardarVariablesNuevas(archivoExcelID) {
      var _this9 = this;

      var _loop2 = function _loop2(_i) {
        var nombreHoja = _this9.state.variables[_i].nombreHoja;
        var nombre = _this9.state.variables[_i].nombre;
        var idFormula = _this9.state.variables[_i].idFormula;
        var descripcion = _this9.state.variables[_i].descripcion;
        var operacion = _this9.state.variables[_i].operacion;
        var celdas = _this9.state.variables[_i].celdas;
        var tipo = _this9.state.variables[_i].tipo;
        var periodicidad = _this9.state.variables[_i].periodicidad;
        var fechaInicioCalculo = _this9.state.variables[_i].fechaInicioCalculo;
        var responsable = _this9.state.variables[_i].responsable;
        var categoriaVariable = _this9.state.variables[_i].categoriaVariable;
        var guardarVariable = _this9.state.variables[_i].guardar;
        var transaction = new _mssql["default"].Transaction(_this9.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("insert into ExcelVariables (excelArchivoID, nombreHoja, nombre, idFormula, descripcion, operacion, celdas, tipo, periodicidad, fechaInicioCalculo, responsable, categoriaVariable, guardar) values (" + archivoExcelID + ", '" + nombreHoja + "', '" + nombre + "', '" + idFormula + "', '" + descripcion + "',' " + operacion + "', '" + celdas + "', '" + tipo + "', '" + periodicidad + "', '" + fechaInicioCalculo.getFullYear() + "-" + (fechaInicioCalculo.getMonth() + 1) + "-" + fechaInicioCalculo.getDate() + "', '" + responsable + "', '" + categoriaVariable + "', '" + guardarVariable + "')", function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                if (_i == _this9.state.variables.length - 1) {
                  _this9.props.actualizarIDVariableModificada("excel");

                  _this9.getExcel();

                  _this9.props.getExcel();
                }

                if (agregoVariable) {
                  _this9.verificarSiExisteExcelEnResultadosHistoricosModificar(_this9.state.variables[_i]);
                }
              });
            }
          });
        }); // fin transaction
      };

      for (var _i = 0; _i < this.state.variables.length; _i++) {
        _loop2(_i);
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

      if (nombre.length > 0 && nombre.length < 501) {
        if (idFormula.length > 0 && idFormula.length < 101) {
          if (descripcion.length < 701) {
            if (!this.tieneEspaciosEnBlanco(idFormula)) {
              if (this.verificarNoExisteNombreVar(idFormula)) {
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
                                  operacion: operacion,
                                  celdas: celdas,
                                  tipo: tipo,
                                  periodicidad: periodicidad,
                                  fechaInicioCalculo: fecha,
                                  responsable: responsable,
                                  categoriaVariable: categoriaVariable,
                                  guardar: guardarVariable
                                };
                                copyTemp.push(nuevaVar);

                                var copyTempPeriodicidad = _toConsumableArray(this.state.valoresPeriodicidad);

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
                                $("#celdasVariable").val(""); //$("#periodicidad").val("");

                                $("#responsable").val("-1");
                                $("#categoriaVariable").val("");
                                agregoVariable = true;
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

                                var copyTempPeriodicidad = _toConsumableArray(this.state.valoresPeriodicidad);

                                copyTempPeriodicidad[index] = $("#periodicidad" + index).val();
                                copyTemp[index].guardar = guardarVariable;
                                this.setState({
                                  variables: copyTemp,
                                  valoresPeriodicidad: copyTempPeriodicidad
                                });
                                agregoVariable = true;
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
      agregoVariable = true;
      this.props.showSuccesMessage("Éxito", 'Variable Eliminada.');
    }
  }, {
    key: "eliminarVarForma",
    value: function eliminarVarForma() {
      var _this10 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("DELETE FROM FormasVariables WHERE ID = " + _this10.props.idVariable, function (err, result) {
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
      var _this11 = this;

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
        request1.query("DELETE FROM Variables WHERE ID = " + _this11.props.idVariable, function (err, result) {
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
        request2.query("DELETE FROM VariablesCampos WHERE variableID = " + _this11.props.idVariable, function (err, result) {
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
        request3.query("DELETE FROM FormulasVariablesCampos WHERE variableID = " + _this11.props.idVariable, function (err, result) {
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
        request4.query("DELETE FROM ElementoFormulasVariablesCampos WHERE variableID = " + _this11.props.idVariable, function (err, result) {
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
        request5.query("DELETE FROM SegmentoReglasVariables WHERE variableID = " + _this11.props.idVariable, function (err, result) {
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
        request6.query("DELETE FROM ReglasVariables WHERE variableID = " + _this11.props.idVariable, function (err, result) {
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
        request7.query("delete from InstruccionSQL WHERE variableID = " + _this11.props.idVariable, function (err, result) {
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
        request8.query("delete from InstruccionSQLCampos where variableID = " + _this11.props.idVariable, function (err, result) {
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
          if (this.props.tipoVariableOriginal.localeCompare("excel") == 0) {
            if (excel[i].idFormula.toLowerCase().localeCompare(idFormula.toLowerCase()) == 0 && excel[i].ID != this.props.idVariable) {
              noExiste = false;
              break;
            }
          } else {
            if (excel[i].idFormula.toLowerCase().localeCompare(idFormula.toLowerCase()) == 0) {
              noExiste = false;
              break;
            }
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
            console.log('YEAAAH');
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
    key: "verificarSiExisteExcelEnResultadosHistoricosModificar",
    value: function verificarSiExisteExcelEnResultadosHistoricosModificar(variable) {
      var _this12 = this;

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
                _this12.modificarResultadosNombre(variable, result.recordset[0].inicioVigencia);
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaDeResultadoNombreModificar",
    value: function crearTablaDeResultadoNombreModificar(variable) {
      var _this13 = this;

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
              _this13.crearResultadoNombreModificar(variable, hoy);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearResultadoNombreModificar",
    value: function crearResultadoNombreModificar(variable, hoy) {
      var _this14 = this;

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
              _this14.verificarPeriodicidadGuardarModificar(variable, "excel", hoy);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "modificarResultadosNombre",
    value: function modificarResultadosNombre(resultado, variable, hoy) {
      var _this15 = this;

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
              _this15.crearTablaDeResultadoNombreModificar(variable);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "verificarPeriodicidadGuardarModificar",
    value: function verificarPeriodicidadGuardarModificar(variable, tabla, hoy) {
      var _this16 = this;

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
                _this16.updatePeriodicidadModificar(variable, tabla, hoy);
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
      banderaVariablesATraer = 0;

      var tempCopyArr = _toConsumableArray(this.state.variables);

      for (var j = 0; j < tempCopyArr.length; j++) {
        this.traerPeriodicidadVariable(tempCopyArr[j], "excel", tempCopyArr, j, null);
      }

      ;
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
    value: function traerPeriodicidadVariable(variable, tabla, arreglo, indexI, indexJ) {
      var _this17 = this;

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

            _this17.verificarFinPeriodicidad();

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                var fechaInicioCalculo = variable.fechaInicioCalculo;
                var fechaUltimoCalculo = result.recordset[0].fechaUltimoCalculo;
                console.log('fechaInicioCalculo');
                console.log(fechaInicioCalculo);
                console.log('fechaUltimoCalculo');
                console.log(fechaUltimoCalculo);
                var tieneUltimoCalculo = false;
                console.log('fechaUltimoCalculo.getFullYear() = ' + fechaUltimoCalculo.getFullYear());
                console.log('fechaUltimoCalculo.getMonth() = ' + fechaUltimoCalculo.getMonth());
                console.log('fechaUltimoCalculo.getDate() = ' + fechaUltimoCalculo.getDate()); //si la fecha es null, realizar calculo (28, 4, 1964) POPS BIRTHDAY

                if (fechaUltimoCalculo.getFullYear() != 1964 && fechaUltimoCalculo.getMonth() != 4 && fechaUltimoCalculo.getDate() != 28) {
                  tieneUltimoCalculo = true;
                }

                if (!tieneUltimoCalculo) {
                  if (indexJ != null) arreglo[indexI].variables[indexJ].realizarCalculo = true;else arreglo[indexI].realizarCalculo = true;
                } else {
                  var ultimoCalculoVigente = false;
                  var periodicidad = variable.periodicidad;
                  var fechaSiguienteCalculo = new Date(fechaInicioCalculo);
                  console.log('periodicidad');
                  console.log(periodicidad);
                  console.log('fechaSiguienteCalculo');
                  console.log(fechaSiguienteCalculo);

                  while (fechaSiguienteCalculo.getFullYear() <= fechaUltimoCalculo.getFullYear() && fechaSiguienteCalculo.getMonth() <= fechaUltimoCalculo.getMonth() && fechaSiguienteCalculo.getDate() <= fechaUltimoCalculo.getDate()) {
                    if (periodicidad.localeCompare("diario") == 0) {
                      fechaSiguienteCalculo = _this17.addDays(fechaSiguienteCalculo, 1);
                    } else if (periodicidad.localeCompare("semanal") == 0) {
                      fechaSiguienteCalculo = _this17.addDays(fechaSiguienteCalculo, 7);
                    } else if (periodicidad.localeCompare("mensual") == 0) {
                      fechaSiguienteCalculo = _this17.addMonths(fechaSiguienteCalculo, 1);
                    } else if (periodicidad.localeCompare("trimestral") == 0) {
                      fechaSiguienteCalculo = _this17.addMonths(fechaSiguienteCalculo, 3);
                    } else if (periodicidad.localeCompare("bi-anual") == 0) {
                      fechaSiguienteCalculo = _this17.addMonths(fechaSiguienteCalculo, 6);
                    } else if (periodicidad.localeCompare("anual") == 0) {
                      fechaSiguienteCalculo = _this17.addYears(fechaSiguienteCalculo, 1);
                    }
                  }

                  console.log('fechaSiguienteCalculo');
                  console.log(fechaSiguienteCalculo);
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
                    if (indexJ != null) arreglo[indexI].variables[indexJ].realizarCalculo = true;else arreglo[indexI].realizarCalculo = true;
                  } else {
                    if (indexJ != null) arreglo[indexI].variables[indexJ].realizarCalculo = false;else arreglo[indexI].realizarCalculo = false;
                  }
                }
              } else {
                if (indexJ != null) arreglo[indexI].variables[indexJ].realizarCalculo = true;else arreglo[indexI].realizarCalculo = true;
              }

              banderaVariablesATraer++;

              _this17.verificarFinTraerPeriodicidad(arreglo);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "verificarFinTraerPeriodicidad",
    value: function verificarFinTraerPeriodicidad(arreglo) {
      if (banderaVariablesATraer === this.state.variables.length - 1) {
        this.setState({
          variables: arreglo
        }, this.crearVariablesExcel);
      }
    }
  }, {
    key: "crearVariablesExcel",
    value: function crearVariablesExcel() {
      var workbook = null;
      workbook = _xlsxStyle["default"].readFile(this.state.ubicacionArchivo);
      var verificarSiGuardo = [];

      if (workbook != null) {
        for (var j = 0; j < this.state.variables.length; j++) {
          for (var k = 0; k < workbook.SheetNames.length; k++) {
            if (workbook.SheetNames[k].localeCompare(this.state.variables[j].nombreHoja) == 0) {
              break;
            }
          }

          ;
          var sheet = workbook.Sheets[workbook.SheetNames[k]];

          if (sheet != null && this.state.variables[j].realizarCalculo) {
            try {
              var arregloPosicionesExcel = this.getArregloPosicionesExcel(this.state.variables[j].celdas);

              if (arregloPosicionesExcel.length == 1) {
                var variable;

                if (arregloDeExcel[i].variables[j].tipo.localeCompare('numero') == 0 && sheet[arregloPosicionesExcel[0]].t.localeCompare('n') == 0 && sheet[arregloPosicionesExcel[0]].w.indexOf('/') == -1) {
                  variable = parseFloat(sheet[arregloPosicionesExcel[0]].v);
                } else if (arregloDeExcel[i].variables[j].tipo.localeCompare('bit') == 0 && sheet[arregloPosicionesExcel[0]].t.localeCompare('b') == 0 && sheet[arregloPosicionesExcel[0]].w.indexOf('/') == -1) {
                  variable = sheet[arregloPosicionesExcel[0]].v;
                } else if (arregloDeExcel[i].variables[j].tipo.localeCompare('varchar') == 0 && sheet[arregloPosicionesExcel[0]].t.localeCompare('s') == 0 && sheet[arregloPosicionesExcel[0]].w.indexOf('/') == -1) {
                  variable = sheet[arregloPosicionesExcel[0]].v;
                } else if (arregloDeExcel[i].variables[j].tipo.localeCompare('date') == 0 && (sheet[arregloPosicionesExcel[0]].t.localeCompare('d') == 0 || sheet[arregloPosicionesExcel[0]].t.localeCompare('n') == 0) && sheet[arregloPosicionesExcel[0]].w.indexOf('/') != -1) {
                  variable = new Date(sheet[arregloPosicionesExcel[0]].w);
                }

                window[this.state.variables[j].nombre] = variable;
              } else if (arregloPosicionesExcel.length > 1 && this.state.variables[j].operacion.localeCompare("ASIG") == 0) {
                if (this.state.variables[j].tipo.localeCompare('numero') == 0) {
                  window[this.state.variables[j].nombre] = [];

                  for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                    var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                    window[this.state.variables[j].nombre].push(variable);
                  }

                  ;
                } else if (this.state.variables[j].tipo.localeCompare('bit') == 0) {
                  window[this.state.variables[j].nombre] = [];

                  for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                    var variable = sheet[arregloPosicionesExcel[k]].v;
                    window[this.state.variables[j].nombre].push(variable);
                  }

                  ;
                } else if (this.state.variables[j].tipo.localeCompare('varchar') == 0) {
                  window[this.state.variables[j].nombre] = [];

                  for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                    var variable = sheet[arregloPosicionesExcel[k]].v;
                    window[this.state.variables[j].nombre].push(variable);
                  }

                  ;
                } else if (this.state.variables[j].tipo.localeCompare('date') == 0) {
                  window[this.state.variables[j].nombre] = [];

                  for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                    var variable = new Date(sheet[arregloPosicionesExcel[k]].w);
                    window[this.state.variables[j].nombre].push(variable);
                  }

                  ;
                }
              } else if (arregloPosicionesExcel.length > 1) {
                if (this.state.variables[j].tipo.localeCompare("numero") == 0 && this.state.variables[j].operacion.localeCompare("SUM") == 0) {
                  var suma = 0;

                  for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                    var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                    suma += variable;
                  }

                  ;
                  window[this.state.variables[j].nombre] = suma;
                } else if (this.state.variables[j].tipo.localeCompare("numero") == 0 && this.state.variables[j].operacion.localeCompare("PROM") == 0) {
                  var suma = 0;

                  for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                    var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                    suma += variable;
                  }

                  ;
                  var promedio = suma / arregloPosicionesExcel.length;
                  window[this.state.variables[j].nombre] = promedio;
                } else if (this.state.variables[j].operacion.localeCompare("MAX") == 0) {
                  if (this.state.variables[j].tipo.localeCompare("numero") == 0) {
                    var max = 0;

                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                      var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                      if (k == 0) max = variable;

                      if (max < variable) {
                        max = variable;
                      }
                    }

                    ;
                    window[this.state.variables[j].nombre] = max;
                  }

                  if (this.state.variables[j].tipo.localeCompare("date") == 0) {
                    var max = new Date(1900, 1, 1);

                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                      var variable = new Date(sheet[arregloPosicionesExcel[k]].w);
                      if (k == 0) max = variable;

                      if (max.getTime() < variable.getTime()) {
                        max = variable;
                      }
                    }

                    ;
                    window[this.state.variables[j].nombre] = max;
                  }
                } else if (this.state.variables[j].operacion.localeCompare("MIN") == 0) {
                  if (this.state.variables[j].tipo.localeCompare("numero") == 0) {
                    var min = 0;

                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                      var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                      if (k == 0) min = variable;

                      if (min > variable) {
                        min = variable;
                      }
                    }

                    ;
                    window[this.state.variables[j].nombre] = min;
                  }

                  if (this.state.variables[j].tipo.localeCompare("date") == 0) {
                    var min = new Date(1900, 1, 1);

                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                      var variable = new Date(sheet[arregloPosicionesExcel[k]].w);
                      if (k == 0) min = variable;

                      if (min.getTime() > variable.getTime()) {
                        min = variable;
                      }
                    }

                    ;
                    window[this.state.variables[j].nombre] = min;
                  }
                } else if (this.state.variables[j].operacion.localeCompare("COUNT") == 0) {
                  if (this.state.variables[j].tipo.localeCompare("numero") == 0) {
                    var count = 0;

                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                      var variable = parseFloat(sheet[arregloPosicionesExcel[k]].v);
                      if (!isNaN(variable)) count++;
                    }

                    ;
                    window[this.state.variables[j].nombre] = count;
                  }

                  if (this.state.variables[j].tipo.localeCompare("date") == 0) {
                    var count = 0;

                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                      var variable = new Date(sheet[arregloPosicionesExcel[k]].w);
                      if (this.isValidDate(variable)) count++;
                    }

                    ;
                    window[this.state.variables[j].nombre] = count;
                  }

                  if (this.state.variables[j].tipo.localeCompare("varchar") == 0) {
                    var count = 0;

                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                      var variable = sheet[arregloPosicionesExcel[k]].v;
                      if (variable.length > 0) count++;
                    }

                    ;
                    window[this.state.variables[j].nombre] = count;
                  }

                  if (this.state.variables[j].tipo.localeCompare("bit") == 0) {
                    var count = 0;

                    for (var k = 0; k < arregloPosicionesExcel.length; k++) {
                      var variable = sheet[arregloPosicionesExcel[k]].v;
                      if (variable != undefined) count++;
                    }

                    ;
                    window[this.state.variables[j].nombre] = count;
                  }
                }
              }

              this.verificarSiExisteExcelEnResultadosHistoricos(this.state.variables[j], verificarSiGuardo);
            } catch (err) {
              console.log(err.message);
              arregloDeErroresExcel.push({
                nombre: this.state.variables[j].nombre
              });
            }
          } else {
            if (arregloDeExcel[i].variables[j].realizarCalculo) {
              arregloDeErroresExcel.push({
                nombre: this.state.variables[j].nombre
              });
              this.props.showMessage("Error", "Problema para leer la hoja: " + arregloDeExcel[i].variables[j].nombreHoja + ".", true, false, {});
            }
          }
        }

        ;
      } else {
        this.props.showMessage("Error", "Problema para leer archivo: " + arregloDeExcel[i].ubicacionArchivo + ".", true, false, {});
      }
    }
  }, {
    key: "getArregloPosicionesExcel",
    value: function getArregloPosicionesExcel(celdas) {
      var celdaInicial = this.getObjetoLetraNumeroCelda(celdas.split(":")[0]);
      var celdaFinal;
      if (celdas.indexOf(":") >= 0) celdaFinal = this.getObjetoLetraNumeroCelda(celdas.split(":")[1]);
      var arregloPosicionesExcel = [];

      if (celdaFinal != undefined) {
        if (celdaInicial.columna.toLowerCase().localeCompare(celdaFinal.columna.toLowerCase()) == 0) {
          //misma columnas, se recorre para abajo en el archivo
          var filaInicial = parseInt(celdaInicial.fila);
          var filaFinal = parseInt(celdaFinal.fila);

          for (var i = filaInicial; i <= filaFinal; i++) {
            arregloPosicionesExcel.push(celdaInicial.columna.toUpperCase() + i);
          }

          ;
        } else {
          //misma fila, se recorre horizontal en el archivo
          var numeroColumnaInicial = this.toColumnNumber(celdaInicial.columna.toUpperCase());
          var numeroColumnaFinal = this.toColumnNumber(celdaFinal.columna.toUpperCase());

          for (var i = numeroColumnaInicial; i <= numeroColumnaFinal; i++) {
            arregloPosicionesExcel.push(toColumnLetter(i) + celdaInicial.fila);
          }

          ;
        }
      } else {
        //solo se selecciono una celda
        arregloPosicionesExcel.push(celdaInicial.columna + celdaInicial.fila);
      }

      return arregloPosicionesExcel;
    }
  }, {
    key: "getObjetoLetraNumeroCelda",
    value: function getObjetoLetraNumeroCelda(celda) {
      var columna = '';
      var fila = '';

      for (var i = 0; i < celda.length; i++) {
        if (this.esLetra(celda.charAt(i))) {
          columna += celda.charAt(i);
        } else {
          break;
        }
      }

      ;
      fila = celda.substring(i);
      var celdaObjeto = {
        columna: columna,
        fila: fila
      };
      return celdaObjeto;
    }
  }, {
    key: "esLetra",
    value: function esLetra(caracter) {
      if (caracter.toLowerCase().localeCompare("a") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("b") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("c") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("d") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("e") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("f") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("g") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("h") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("i") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("j") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("k") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("l") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("m") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("n") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("o") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("p") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("q") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("r") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("s") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("t") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("u") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("v") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("w") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("x") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("y") == 0) {
        return true;
      } else if (caracter.toLowerCase().localeCompare("z") == 0) {
        return true;
      }
    }
  }, {
    key: "toColumnLetter",
    value: function toColumnLetter(num) {
      for (var ret = '', a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
        ret = String.fromCharCode(parseInt(num % b / a) + 65) + ret;
      }

      return ret;
    }
  }, {
    key: "toColumnNumber",
    value: function toColumnNumber(val) {
      var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          i,
          j,
          result = 0;

      for (i = 0, j = val.length - 1; i < val.length; i += 1, j -= 1) {
        result += Math.pow(base.length, j) * (base.indexOf(val[i]) + 1);
      }

      return result;
    }
  }, {
    key: "verificarSiExisteExcelEnResultadosHistoricos",
    value: function verificarSiExisteExcelEnResultadosHistoricos(variable, verificarSiGuardo) {
      var _this18 = this;

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
                _this18.crearTablaDeResultadoNombreExcel(variable);
              } else {
                _this18.guardarResultadosNombreExcel(variable, result.recordset[0].inicioVigencia);
              }

              if (verificarSiGuardo.length == 0) {
                alert("Calculo realizado con exito.");
                verificarSiGuardo.push(1);
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearTablaDeResultadoNombreExcel",
    value: function crearTablaDeResultadoNombreExcel(variable) {
      var _this19 = this;

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

              _this19.crearResultadoNombreExcel(variable, hoy);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearResultadoNombreExcel",
    value: function crearResultadoNombreExcel(variable, hoy) {
      var _this20 = this;

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

              _this20.guardarResultadosNombreExcel(variable, hoy);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "guardarResultadosNombreExcel",
    value: function guardarResultadosNombreExcel(variable, fechaNombreTabla) {
      var hoy = new Date();
      var textoInsertPrincipio = 'INSERT INTO ' + variable.nombre + '_' + fechaNombreTabla.getFullYear() + '_' + (fechaNombreTabla.getMonth() + 1) + '_' + fechaNombreTabla.getDate() + '_' + fechaNombreTabla.getHours() + '_' + fechaNombreTabla.getMinutes() + '_' + fechaNombreTabla.getSeconds() + ' ( ';
      textoInsertPrincipio += variable.nombre;
      textoInsertPrincipio += ', f3ch4Gu4rd4do ) values ( ';
      var instruccionSQLBorrar = "DELETE FROM " + variable.nombre + "_" + fechaNombreTabla.getFullYear() + "_" + (fechaNombreTabla.getMonth() + 1) + "_" + fechaNombreTabla.getDate() + "_" + fechaNombreTabla.getHours() + "_" + fechaNombreTabla.getMinutes() + "_" + fechaNombreTabla.getSeconds() + " WHERE f3ch4Gu4rd4do = '" + hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate() + "' ";
      this.borrarExcel(instruccionSQLBorrar);

      if (window[variable.nombre].length == undefined) {
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
          self.guardarExcel(instruccionSQLFinal, variable, 'excel', hoy);
        }, 600);
      } else {
        var instruccionSQLFinal = textoInsertPrincipio;

        for (var i = 0; i < window[variable.nombre].length; i++) {
          if (i > 0) instruccionSQLFinal += ', ';

          if (variable.tipo.localeCompare("numero") == 0) {
            instruccionSQLFinal += window[variable.nombre][i];
          } else if (variable.tipo.localeCompare("varchar") == 0) {
            instruccionSQLFinal += "'" + window[variable.nombre][i] + "'";
          } else if (variable.tipo.localeCompare("bit") == 0) {
            instruccionSQLFinal += "'" + window[variable.nombre][i] + "'";
          } else if (variable.tipo.localeCompare("date") == 0) {
            instruccionSQLFinal += "'" + window[variable.nombre][i].getFullYear() + "-" + (window[variable.nombre][i].getMonth() + 1) + "-" + window[variable.nombre][i].getDate() + "'";
          }

          instruccionSQLFinal += ", '" + hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate() + "' )";
          var self = this;
          setTimeout(function () {
            self.guardarExcel(instruccionSQLFinal, variable, 'excel', hoy);
          }, 600);
        }

        ;
      }

      this.saveBitacora(hoy, "Usuario: " + this.props.userName + " realizo el cálculo para la variable tipo excel: " + variable.nombre, "variable", variable.ID);
    }
  }, {
    key: "guardarExcel",
    value: function guardarExcel(instruccionSQL, variable, tabla, hoy) {
      var _this21 = this;

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
              if (variable.periodicidad.localeCompare("-1") != 0) _this21.verificarPeriodicidadGuardar(variable, tabla, hoy);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "borrarExcel",
    value: function borrarExcel(instruccionSQL) {
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
      var _this22 = this;

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
                _this22.updatePeriodicidad(variable, tabla, hoy);
              } else {
                _this22.guardarPeriodicidad(variable, tabla, hoy);
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
      var _this23 = this;

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
              _this23.setState({
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
    key: "closeModal",
    value: function closeModal() {
      this.setState({
        showModal: false
      });
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
      var _this24 = this;

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
          width: "100%",
          display: this.props.permision.variable.indexOf("E") > -1 ? "" : "none"
        }
      }, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-primary active",
        onClick: this.seleccionarArchivo
      }, "Seleccionar Ubicaci\xF3n")), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        style: _defineProperty({
          width: "100%",
          display: this.state.ubicacionArchivo.length > 0 ? "inline" : "none"
        }, "display", this.props.permision.variable.indexOf("E") > -1 ? "" : "none")
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
          defaultValue: _this24.props.idFormula,
          onKeyUp: _this24.props.actualizarIdFormula,
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
          defaultValue: _this24.props.descripcionVariable,
          onKeyUp: _this24.props.actualizarDescripcionVariable,
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
        }, _this24.state.hojas.map(function (hoja, i) {
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
            return _this24.actualizarPeriodicidadUpdate(i);
          },
          className: "form-control"
        }, _react["default"].createElement("option", {
          value: "-1"
        }, "Ninguno"), periodicidad.map(function (periodicidad, i) {
          return _react["default"].createElement("option", {
            value: periodicidad.nombre,
            key: periodicidad.nombre
          }, periodicidad.nombre);
        })))), _this24.state.valoresPeriodicidad[i].localeCompare("-1") != 0 && _this24.inicializarFecha(i, variable.fechaInicioCalculo) ? _react["default"].createElement("div", {
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
        }, "Ninguno"), _this24.state.usuarios.map(function (usuario, i) {
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
            return _this24.updateVariable(i);
          },
          style: {
            display: _this24.props.permision.variable.indexOf("E") > -1 ? "" : "none"
          }
        }, "Modificar Variable"), _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-danger active",
          onClick: function onClick() {
            return _this24.deleteVariable(i);
          },
          style: {
            marginLeft: "10px",
            display: _this24.props.permision.variable.indexOf("E") > -1 ? "" : "none"
          }
        }, "Eliminar Variable"), _this24.props.tipoVariableOriginal.localeCompare("excel") == 0 && _this24.props.permision.variable.indexOf("V") > -1 || _this24.props.permision.variable.indexOf("E") > -1 ? _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-info active",
          style: {
            marginLeft: "10px"
          },
          onClick: function onClick() {
            return _this24.goToTimeline(true, variable.ID, variable.nombre, false);
          }
        }, "Historial de Variable") : null));
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
        onClick: this.guardarUbicacionArchivo,
        style: {
          display: this.props.permision.variable.indexOf("E") > -1 ? "" : "none"
        }
      }, "Modificar Configuraci\xF3n de Archivo de Excel"), this.props.tipoVariableOriginal.localeCompare("excel") == 0 && this.props.permision.variable.indexOf("E") > -1 ? _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-secondary active",
        style: {
          marginLeft: "10px"
        },
        onClick: function onClick() {
          return _this24.props.eliminarVarExcel(true);
        }
      }, "Eliminar Variable") : null, this.props.tipoVariableOriginal.localeCompare("excel") == 0 && this.props.permision.variable.indexOf("C") > -1 ? _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-primary active",
        style: {
          marginLeft: "10px"
        },
        onClick: this.verificarPeriodicidad
      }, "Realizar C\xE1lculo") : null), _react["default"].createElement("br", null), _react["default"].createElement(Modal, {
        show: this.state.showModal,
        titulo: "RESULTADOS",
        onClose: this.closeModal
      }, _react["default"].createElement("ul", {
        className: "list-group mb-3"
      }, _react["default"].createElement("li", {
        className: "list-group-item d-flex justify-content-between"
      }, _react["default"].createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, "EXCEL ARCHIVO: ", nombreArchivo)), this.state.variables.map(function (variable, i) {
        return _react["default"].createElement("li", {
          key: "var" + variable.ID,
          className: "list-group-item d-flex justify-content-between"
        }, _react["default"].createElement("div", null, _react["default"].createElement("h6", {
          className: "my-0"
        }, variable.nombre)), _react["default"].createElement("span", {
          className: "text-muted"
        }, window[variable.nombre]));
      }))));
    }
  }]);

  return FuenteDatoExcel;
}(_react["default"].Component);

exports["default"] = FuenteDatoExcel;
//# sourceMappingURL=FuenteDatoExcel.js.map
