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
      variables: []
    };
    _this.seleccionarArchivo = _this.seleccionarArchivo.bind(_assertThisInitialized(_this));
    _this.guardarUbicacionArchivo = _this.guardarUbicacionArchivo.bind(_assertThisInitialized(_this));
    _this.traerArchivoID = _this.traerArchivoID.bind(_assertThisInitialized(_this));
    _this.guardarVariables = _this.guardarVariables.bind(_assertThisInitialized(_this));
    _this.crearVariable = _this.crearVariable.bind(_assertThisInitialized(_this));
    _this.updateVariable = _this.updateVariable.bind(_assertThisInitialized(_this));
    _this.deleteVariable = _this.deleteVariable.bind(_assertThisInitialized(_this)); //this.traerVariables = this.traerVariables.bind(this);

    return _this;
  }

  _createClass(FuenteDatoExcel, [{
    key: "componentDidMount",
    value: function componentDidMount() {//this.traerVariables();
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
      var _this2 = this;

      var nombre = $("#nombreArchivo").val();

      if (nombre.length > 0 && nombre.length < 101) {
        if (this.state.ubicacionArchivo.length > 0 && this.state.ubicacionArchivo.length < 1001) {
          var guardar = true;

          for (var i = 0; i < this.state.variables.length; i++) {
            if (this.state.variables[i].nombre.length > 0 && this.state.variables[i].nombre.length < 101) {
              if (this.state.variables[i].operacion.length > 0 && this.state.variables[i].operacion.length < 31) {
                if (this.state.variables[i].celdas.length > 0 && this.state.variables[i].celdas.length < 101) {
                  if (this.state.variables[i].nombreHoja.length > 0 && this.state.variables[i].nombreHoja.length < 201) {
                    if (this.state.variables[i].tipo.length > 0 && this.state.variables[i].tipo.length < 31) {} else {
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
          }

          ;

          if (guardar) {
            var transaction = new _mssql["default"].Transaction(this.props.pool);
            transaction.begin(function (err) {
              var rolledBack = false;
              transaction.on('rollback', function (aborted) {
                rolledBack = true;
              });
              var request = new _mssql["default"].Request(transaction);
              request.query("insert into ExcelArchivos (ubicacionArchivo, nombre) values ('" + _this2.state.ubicacionArchivo + "', '" + nombre + "')", function (err, result) {
                if (err) {
                  console.log(err);

                  if (!rolledBack) {
                    transaction.rollback(function (err) {});
                  }
                } else {
                  transaction.commit(function (err) {
                    alert('Variable Creada');
                    $("#nombreArchivo").val("");

                    _this2.setState({
                      ubicacionArchivo: ""
                    });

                    _this2.traerArchivoID();
                  });
                }
              });
            }); // fin transaction
          }
        } else {
          alert('Ingrese un valor para la ubicación del archivo que debe ser menor a 1001 caracteres');
        }
      } else {
        alert('Ingrese un nombre el archivo que debe ser menor a 101 caracteres');
      }
    }
  }, {
    key: "traerArchivoID",
    value: function traerArchivoID() {
      var _this3 = this;

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
              _this3.guardarVariables(result.recordset[0].ID);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "guardarVariables",
    value: function guardarVariables(archivoExcelID) {
      var _this4 = this;

      var _loop = function _loop(i) {
        var nombreHoja = _this4.state.variables[i].nombreHoja;
        var nombre = _this4.state.variables[i].nombre;
        var operacion = _this4.state.variables[i].operacion;
        var celdas = _this4.state.variables[i].celdas;
        var tipo = _this4.state.variables[i].tipo;
        var guardarVariable = _this4.state.variables[i].guardar;
        var transaction = new _mssql["default"].Transaction(_this4.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("insert into ExcelVariables (excelArchivoID, nombreHoja, nombre, operacion, celdas, tipo, guardar) values (" + archivoExcelID + ", '" + nombreHoja + "', '" + nombre + "', '" + operacion + "', '" + celdas + "', '" + tipo + "', '" + guardarVariable + "')", function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                if (i == _this4.state.variables.length - 1) {
                  _this4.setState({
                    variables: []
                  });
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
      var operacion = $("#operacion").val();
      var celdas = $("#celdasVariable").val();
      var hoja = $("#hojaExcelVariable").val();
      var tipo = $("#tipoVariable").val();
      var guardarVariable;
      if ($("#guardarVariable").is(':checked')) guardarVariable = true;else guardarVariable = false;

      if (nombre.length > 0 && nombre.length < 101) {
        if (operacion.length > 0 && operacion.length < 31) {
          if (celdas.length > 0 && celdas.length < 101) {
            if (hoja.length > 0 && hoja.length < 201) {
              if (tipo.length > 0 && tipo.length < 31) {
                var copyTemp = _toConsumableArray(this.state.variables);

                var nuevaVar = {
                  nombreHoja: hoja,
                  nombre: nombre,
                  operacion: operacion,
                  celdas: celdas,
                  tipo: tipo,
                  guardar: guardarVariable
                };
                copyTemp.push(nuevaVar);
                this.setState({
                  variables: copyTemp
                });
                $("#nombreVariable").val("");
                $("#operacion").val("ASIG");
                $("#hojaExcelVariable").val("");
                $("#tipoVariable").val("numero");
                $("#celdasVariable").val("");
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
    key: "updateVariable",
    value: function updateVariable(index) {
      var copyTemp = _toConsumableArray(this.state.variables);

      copyTemp[index].nombre = $("#nombreVariable" + index).val();
      copyTemp[index].operacion = $("#operacion" + index).val();
      copyTemp[index].celdas = $("#celdasVariable" + index).val();
      copyTemp[index].nombreHoja = $("#hojaExcelVariable" + index).val();
      var guardarVariable;
      if ($("#guardarVariable" + index).is(':checked')) guardarVariable = true;else guardarVariable = false;
      copyTemp[index].guardar = guardarVariable;
      this.setState({
        variables: copyTemp
      });
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
    key: "render",
    value: function render() {
      var _this5 = this;

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
        className: "btn btn-brand active",
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
          defaultValue: variable.nombreHoja,
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
          className: "btn btn-brand active",
          onClick: function onClick() {
            return _this5.updateVariable(i);
          }
        }, "Modificar Variable"), _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-danger active",
          onClick: function onClick() {
            return _this5.deleteVariable(i);
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
        className: "btn btn-success btn-block btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa",
          width: "80%"
        },
        onClick: this.guardarUbicacionArchivo
      }, "Guardar Configuraci\xF3n de Archivo de Excel")), _react["default"].createElement("br", null));
    }
  }]);

  return FuenteDatoExcel;
}(_react["default"].Component);

exports["default"] = FuenteDatoExcel;
//# sourceMappingURL=FuenteDatoExcel.js.map
