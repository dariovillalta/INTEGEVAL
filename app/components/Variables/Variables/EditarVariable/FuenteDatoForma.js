"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

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
      valorPeriodicidad: '-1'
    };
    _this.crearVariable = _this.crearVariable.bind(_assertThisInitialized(_this));
    _this.traerForma = _this.traerForma.bind(_assertThisInitialized(_this));
    _this.eliminarVarExcel = _this.eliminarVarExcel.bind(_assertThisInitialized(_this));
    _this.eliminarVariable = _this.eliminarVariable.bind(_assertThisInitialized(_this));
    _this.getVariables = _this.getVariables.bind(_assertThisInitialized(_this));
    _this.getExcel = _this.getExcel.bind(_assertThisInitialized(_this));
    _this.getFormas = _this.getFormas.bind(_assertThisInitialized(_this));
    _this.verificarNoExisteNombreVar = _this.verificarNoExisteNombreVar.bind(_assertThisInitialized(_this));
    _this.actualizarPeriodicidad = _this.actualizarPeriodicidad.bind(_assertThisInitialized(_this));
    _this.isValidDate = _this.isValidDate.bind(_assertThisInitialized(_this));
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
    }
  }, {
    key: "traerForma",
    value: function traerForma() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from FormasVariables where ID = " + _this2.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                _this2.setState({
                  nombre: result.recordset[0].nombre,
                  tipo: result.recordset[0].tipo,
                  guardar: result.recordset[0].guardar
                });

                $("#nombreVariable").val(result.recordset[0].nombre);
                $("#tipo").val(result.recordset[0].tipo);
                if (result.recordset[0].guardar) $("#guardarVariable").prop('checked', true);else $("#guardarVariable").prop('checked', false);
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearVariable",
    value: function crearVariable() {
      var _this3 = this;

      var nombreVariable = $("#nombreVariable").val();
      var tipo = $("#tipo").val();
      var guardarVariable;
      if ($("#guardarVariable").is(':checked')) guardarVariable = true;else guardarVariable = false;
      var periodicidad = $("#periodicidad").val();
      var fecha;
      if (periodicidad.localeCompare("-1") == 0) fecha = new Date(1964, 4, 28);else fecha = $("#fecha").datepicker('getDate');
      var analista = $("#analista").val();

      if (nombreVariable.length > 0 && nombreVariable.length < 1001) {
        if (this.verificarNoExisteNombreVar(nombreVariable)) {
          if (tipo.length > 0 && tipo.length < 1001) {
            if (periodicidad.length > 0 && periodicidad.length < 51) {
              if (this.isValidDate(fecha)) {
                if (analista.length > 0 && analista.length < 101) {
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
                      request.query("insert into FormasVariables (nombre, tipo, periodicidad, fechaInicioCalculo, analista, guardar) values ('" + nombreVariable + "', '" + tipo + "', '" + periodicidad + "', '" + fechaInicioCalculo + "', '" + analista + "', '" + guardarVariable + "')", function (err, result) {
                        if (err) {
                          console.log(err);

                          if (!rolledBack) {
                            transaction.rollback(function (err) {});
                          }
                        } else {
                          transaction.commit(function (err) {
                            alert("Variable Modificada");

                            _this3.getFormas();

                            _this3.props.actualizarIDVariableModificada("forma");
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
                      request.query("update FormasVariables set nombre = '" + nombreVariable + "', tipo = '" + tipo + "', periodicidad = '" + periodicidad + "', guardar = '" + guardarVariable + "', fechaInicioCalculo = '" + fechaInicioCalculo + "', analista = '" + analista + "' where ID = " + _this3.props.idVariable, function (err, result) {
                        if (err) {
                          console.log(err);

                          if (!rolledBack) {
                            _transaction.rollback(function (err) {});
                          }
                        } else {
                          _transaction.commit(function (err) {
                            alert("Variable Modificada");

                            _this3.getFormas();
                          });
                        }
                      });
                    }); // fin transaction

                  }
                } else {
                  alert('Ingrese un valor para el analista que debe ser menor a 51 caracteres');
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
        alert('Ingrese un valor para el nombre de la variable que debe ser menor a 101 caracteres');
      }
    }
  }, {
    key: "eliminarVarExcel",
    value: function eliminarVarExcel() {
      var _this4 = this;

      var transaction1 = new _mssql["default"].Transaction(this.props.pool);
      transaction1.begin(function (err) {
        var rolledBack = false;
        transaction1.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request1 = new _mssql["default"].Request(transaction1);
        request1.query("DELETE FROM ExcelArchivos WHERE ID = " + _this4.props.idVariable, function (err, result) {
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
        request2.query("DELETE FROM ExcelVariables WHERE excelArchivoID = " + _this4.props.idVariable, function (err, result) {
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
      var _this5 = this;

      var transaction1 = new _mssql["default"].Transaction(this.props.pool);
      transaction1.begin(function (err) {
        var rolledBack = false;
        transaction1.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request1 = new _mssql["default"].Request(transaction1);
        request1.query("DELETE FROM Variables WHERE ID = " + _this5.props.idVariable, function (err, result) {
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
        request2.query("DELETE FROM VariablesCampos WHERE variableID = " + _this5.props.idVariable, function (err, result) {
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
        request3.query("DELETE FROM FormulasVariablesCampos WHERE variableID = " + _this5.props.idVariable, function (err, result) {
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
        request4.query("DELETE FROM ElementoFormulasVariablesCampos WHERE variableID = " + _this5.props.idVariable, function (err, result) {
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
        request5.query("DELETE FROM SegmentoReglasVariables WHERE variableID = " + _this5.props.idVariable, function (err, result) {
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
        request6.query("DELETE FROM ReglasVariables WHERE variableID = " + _this5.props.idVariable, function (err, result) {
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
        request7.query("delete from InstruccionSQL WHERE variableID = " + _this5.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction7.rollback(function (err) {});
            }
          } else {
            transaction7.commit(function (err) {
              _this5.limpiarArreglos();
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
        request8.query("delete from InstruccionSQLCampos where variableID = " + _this5.props.idVariable, function (err, result) {
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
        onClick: this.props.eliminarVarForma
      }, "Eliminar Variable") : null, this.props.tipoVariableOriginal.localeCompare("forma") == 0 ? _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-primary active",
        style: {
          marginLeft: "10px"
        },
        onClick: this.calculoVariable
      }, "Realizar C\xE1lculo") : null), _react["default"].createElement("br", null));
    }
  }]);

  return FuenteDatoForma;
}(_react["default"].Component);

exports["default"] = FuenteDatoForma;
//# sourceMappingURL=FuenteDatoForma.js.map
