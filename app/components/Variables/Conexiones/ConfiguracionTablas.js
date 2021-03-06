"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _ErrorMessage = _interopRequireDefault(require("../../ErrorMessage.js"));

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

var campos = [{
  nombre: "varchar"
}, {
  nombre: "bit"
}, {
  nombre: "date"
}, {
  nombre: "int"
}];
var funciones = [{
  funcion: "idCliente",
  texto: "ID de Cliente"
}, {
  funcion: "fecha",
  texto: "fecha"
}, {
  nombre: "date"
}, {
  nombre: "int"
}];
var funcionesTablas = [{
  nombre: "Otro"
}, {
  nombre: "Pagos de Préstamos"
}, {
  nombre: "Plan de Pagos"
}];

var ConfiguracionTablas =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ConfiguracionTablas, _React$Component);

  function ConfiguracionTablas(props) {
    var _this;

    _classCallCheck(this, ConfiguracionTablas);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConfiguracionTablas).call(this, props));
    _this.state = {
      tablas: [],
      errorCreacionTabla: {
        campo: "",
        descripcion: "",
        mostrar: false
      },
      idTablaSel: -1
    };
    _this.saveBitacora = _this.saveBitacora.bind(_assertThisInitialized(_this));
    _this.loadTables = _this.loadTables.bind(_assertThisInitialized(_this));
    _this.insertTable = _this.insertTable.bind(_assertThisInitialized(_this));
    _this.deleteTableConfirmation = _this.deleteTableConfirmation.bind(_assertThisInitialized(_this));
    _this.deleteTable = _this.deleteTable.bind(_assertThisInitialized(_this));
    _this.dismissTableNewError = _this.dismissTableNewError.bind(_assertThisInitialized(_this));
    return _this;
  }
  /* mensajeModal <- de state
      //mostrarMensaje:bandera para mostrar modal mensaje en pantalla
      //mensajeConfirmado:retorno del modal mensaje si fue conf
      //esError:bandera para ver que tipo de modal mensaje mostrar
      //esConfirmar:bandera para ver que tipo de modal mensaje mostrar
      //titulo:titulo del modal
      //mensaje:mensaje del modal
      //banderaMetodoInit:variable para ver a que metodo ir cuando regresa de confirmar el modal
      //idElementoSelec:id del elemento que mostro el modal mensaje
      //indiceX:posicion de la tabla en el arreglo que mostro el modal mensaje
      //indiceY:posicion del campo en el arreglo de tablas que mostro el modal mensaje
  */


  _createClass(ConfiguracionTablas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadTables();
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
    key: "loadTables",
    value: function loadTables() {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Tablas", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this3.setState({
                tablas: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "insertTable",
    value: function insertTable() {
      var _this4 = this;

      var nombreTabla = $("#nombreTablaNuevo").val();
      var usuarioTabla = $("#usuarioTablaNuevo").val();
      var contrasenaTabla = $("#contrasenaTablaNuevo").val();
      var servidorTabla = $("#servidorTablaNuevo").val();
      var basedatosTabla = $("#basedatosTablaNuevo").val();
      var tablaTabla = $("#tablaTablaNuevo").val();
      var funcionTabla = $("#funcionTabla").val();
      var tipoConexion = $("#tipoConexion").val();

      if (nombreTabla.length > 0 && nombreTabla.length < 71) {
        if (usuarioTabla.length > 0 && usuarioTabla.length < 51) {
          if (contrasenaTabla.length > 0 && contrasenaTabla.length < 201) {
            if (servidorTabla.length > 0 && servidorTabla.length < 51) {
              if (basedatosTabla.length > 0 && basedatosTabla.length < 51) {
                if (tablaTabla.length > 0 && tablaTabla.length < 71) {
                  if (tipoConexion.length > 0 && tipoConexion.length < 31) {
                    this.setState({
                      errorCreacionTabla: {
                        campo: "",
                        descripcion: "",
                        mostrar: false
                      }
                    });
                    var transaction = new _mssql["default"].Transaction(this.props.pool);
                    transaction.begin(function (err) {
                      var rolledBack = false;
                      transaction.on('rollback', function (aborted) {
                        rolledBack = true;
                      });
                      var request = new _mssql["default"].Request(transaction);
                      request.query("insert into Tablas (Nombre, Usuario, Contrasena, Servidor, BaseDatos, Tabla, tipoConexion) values ('" + nombreTabla + "','" + usuarioTabla + "','" + contrasenaTabla + "','" + servidorTabla + "','" + basedatosTabla + "','" + tablaTabla + "','" + tipoConexion + "')", function (err, result) {
                        if (err) {
                          if (!rolledBack) {
                            console.log(err);
                            transaction.rollback(function (err) {});
                          }
                        } else {
                          transaction.commit(function (err) {
                            _this4.props.showSuccesMessage("Exito", "Tabla creada con éxito.");

                            _this4.loadTables();

                            var transaction1 = new _mssql["default"].Transaction(_this4.props.pool);
                            transaction1.begin(function (err) {
                              var rolledBack = false;
                              transaction1.on('rollback', function (aborted) {
                                rolledBack = true;
                              });
                              var request1 = new _mssql["default"].Request(transaction1);
                              request1.query("select top 1 * from Tablas order by ID desc", function (err, result) {
                                if (err) {
                                  if (!rolledBack) {
                                    console.log(err);
                                    transaction1.rollback(function (err) {});
                                  }
                                } else {
                                  transaction1.commit(function (err) {
                                    if (result.recordset.length > 0) {
                                      var nuevosValores = 'nombre: ' + nombreTabla + '\n' + 'usuario: ' + usuarioTabla + '\n' + 'servidor: ' + servidorTabla + '\n' + 'base de datos: ' + basedatosTabla + '\n' + 'tabla: ' + tablaTabla + '\n' + 'tipo de conexión: ' + tipoConexion;

                                      _this4.saveBitacora(new Date(), "Usuario: " + _this4.props.userName + " creo la tabla: " + nombreTabla + "\nValores: \n" + nuevosValores, "tabla", result.recordset[0].ID);
                                    }
                                  });
                                }
                              });
                            }); // fin transaction1
                          });
                        }
                      });
                    }); // fin transaction
                  } else {
                    var campo = "Tipo de Conexión";
                    var descripcion;
                    if (tipoConexion.length == 0) descripcion = "El campo debe tener una longitud mayor a 0.";else descripcion = "El campo debe tener una longitud menor a 31.";
                    this.setState({
                      errorCreacionTabla: {
                        campo: campo,
                        descripcion: descripcion,
                        mostrar: true
                      }
                    });
                  }
                } else {
                  var _campo = "Nombre de la Tabla";

                  var _descripcion;

                  if (tablaTabla.length == 0) _descripcion = "El campo debe tener una longitud mayor a 0.";else _descripcion = "El campo debe tener una longitud menor a 71.";
                  this.setState({
                    errorCreacionTabla: {
                      campo: _campo,
                      descripcion: _descripcion,
                      mostrar: true
                    }
                  });
                }
              } else {
                var _campo2 = "Base de Datos de la Tabla";

                var _descripcion2;

                if (basedatosTabla.length == 0) _descripcion2 = "El campo debe tener una longitud mayor a 0.";else _descripcion2 = "El campo debe tener una longitud menor a 51.";
                this.setState({
                  errorCreacionTabla: {
                    campo: _campo2,
                    descripcion: _descripcion2,
                    mostrar: true
                  }
                });
              }
            } else {
              var _campo3 = "Servidor de la Tabla";

              var _descripcion3;

              if (servidorTabla.length == 0) _descripcion3 = "El campo debe tener una longitud mayor a 0.";else _descripcion3 = "El campo debe tener una longitud menor a 51.";
              this.setState({
                errorCreacionTabla: {
                  campo: _campo3,
                  descripcion: _descripcion3,
                  mostrar: true
                }
              });
            }
          } else {
            var _campo4 = "Contraseña de la Tabla";

            var _descripcion4;

            if (contrasenaTabla.length == 0) _descripcion4 = "El campo debe tener una longitud mayor a 0.";else _descripcion4 = "El campo debe tener una longitud menor a 201.";
            this.setState({
              errorCreacionTabla: {
                campo: _campo4,
                descripcion: _descripcion4,
                mostrar: true
              }
            });
          }
        } else {
          var _campo5 = "Usuario de la Tabla";

          var _descripcion5;

          if (usuarioTabla.length == 0) _descripcion5 = "El campo debe tener una longitud mayor a 0.";else _descripcion5 = "El campo debe tener una longitud menor a 51.";
          this.setState({
            errorCreacionTabla: {
              campo: _campo5,
              descripcion: _descripcion5,
              mostrar: true
            }
          });
        }
      } else {
        var _campo6 = "Nombre de la Conexión";

        var _descripcion6;

        if (nombreTabla.length == 0) _descripcion6 = "El campo debe tener una longitud mayor a 0.";else _descripcion6 = "El campo debe tener una longitud menor a 71.";
        this.setState({
          errorCreacionTabla: {
            campo: _campo6,
            descripcion: _descripcion6,
            mostrar: true
          }
        });
      }
    }
  }, {
    key: "deleteTableConfirmation",
    value: function deleteTableConfirmation(id) {
      this.props.showMessage("Confirmación", "Esta seguro que desea eliminar la tabla?", false, true, this.deleteTable);
      this.setState({
        idTablaSel: id
      });
    }
  }, {
    key: "deleteTable",
    value: function deleteTable(id) {
      var _this5 = this;

      if (this.state.idTablaSel != -1) {
        var transaction = new _mssql["default"].Transaction(this.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("delete from Tablas where ID = " + _this5.state.idTablaSel, function (err, result) {
            if (err) {
              if (!rolledBack) {
                console.log(err);
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                // 1. Make a shallow copy of the items

                /*let tablas = [...this.state.tablas];
                // 3. Replace the property you're intested in
                tablas.splice(this.state.mensajeModal.indiceX, 1);*/
                // 5. Set the state to our new copy
                _this5.loadTables();

                _this5.props.showSuccesMessage("Exito", "Tabla eliminada con éxito.");

                _this5.saveBitacora(new Date(), "Usuario: " + _this5.props.userName + " elimino la tabla: " + nombreTabla, "tabla", result.recordset[0].ID);
              });
            }
          });
        }); // fin transaction
      }
    }
    /*======_______====== ======_______======   MENSAJES ERROR DE CAMPOS    ======_______====== ======_______======*/

    /*======_______======                                                                       ======_______======*/

    /*======_______======                                                                       ======_______======*/

    /*======_______====== ======_______====== ====_____====  ====_____====  ======_______====== ======_______======*/

  }, {
    key: "dismissTableNewError",
    value: function dismissTableNewError() {
      this.setState({
        errorCreacionTabla: {
          campo: "",
          descripcion: "",
          mostrar: false
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Configuraci\xF3n de Conexiones a las Tablas"), _react["default"].createElement("div", {
        className: "page-breadcrumb"
      }, _react["default"].createElement("nav", {
        "aria-label": "breadcrumb"
      }, _react["default"].createElement("ol", {
        className: "breadcrumb"
      }, _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.configuracionHome
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Configuraci\xF3n")), _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.goOptions
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Tipo de Configuraci\xF3n")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Tablas"))))))), _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("h2", null, "Descripci\xF3n"), _react["default"].createElement("p", {
        className: "lead"
      }, "Esta secci\xF3n consiste en administrar las configuraciones necesarias para que el programa pueda conectarse con las tablas internas, para seleccionar los campos bases de los cuales se crear\xE1n las variables y consecuentemente los c\xE1lculos de indicadores y riesgos."), _react["default"].createElement("ul", {
        className: "list-unstyled arrow"
      }, _react["default"].createElement("li", null, "Nombre de la Conecci\xF3n: Nombre de referencia dentro del programa para refererse a la tabla de la instituci\xF3n"), _react["default"].createElement("li", null, "Usuario de la Tabla: Usuario para acceder a la base de Datos"), _react["default"].createElement("li", null, "Contrase\xF1a de la Tabla: Contrase\xF1a para acceder a la base de Datos"), _react["default"].createElement("li", null, "Servidor de la Tabla: Servidor donde se encuentra la base de Datos"), _react["default"].createElement("li", null, "Base de Datos de la Tabla: Nombre de la base de Datos donde se encuentra la tabla"), _react["default"].createElement("li", null, "Nombre de la Tabla: Nombre de la tabla a acceder a la base de Datos"), _react["default"].createElement("li", null, "Tipo de Conexi\xF3n: Tipo de conexi\xF3n de la base de datos"))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card influencer-profile-data"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("h3", null, "Crear Nueva Tabla"), _react["default"].createElement("div", {
        className: "row border-top"
      }, _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Nombre de la Conecci\xF3n"), _react["default"].createElement("input", {
        id: "nombreTablaNuevo",
        type: "text",
        className: "form-control"
      })), _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Usuario de la Tabla"), _react["default"].createElement("input", {
        id: "usuarioTablaNuevo",
        type: "text",
        className: "form-control"
      }))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Contrase\xF1a de la Tabla"), _react["default"].createElement("input", {
        id: "contrasenaTablaNuevo",
        type: "text",
        className: "form-control"
      })), _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Servidor de la Tabla"), _react["default"].createElement("input", {
        id: "servidorTablaNuevo",
        type: "text",
        className: "form-control"
      }))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Base de Datos de la Tabla"), _react["default"].createElement("input", {
        id: "basedatosTablaNuevo",
        type: "text",
        className: "form-control"
      })), _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Nombre de la Tabla"), _react["default"].createElement("input", {
        id: "tablaTablaNuevo",
        type: "text",
        className: "form-control"
      }))), _react["default"].createElement("div", {
        className: "row",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("select", {
        id: "tipoConexion",
        className: "form-control"
      }, _react["default"].createElement("option", {
        value: "sql"
      }, "Transact-SQL"))), this.state.errorCreacionTabla.mostrar ? _react["default"].createElement(_ErrorMessage["default"], {
        campo: this.state.errorCreacionTabla.campo,
        descripcion: this.state.errorCreacionTabla.descripcion,
        dismissTableError: this.dismissTableNewError
      }, " ") : _react["default"].createElement("span", null), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("button", {
        onClick: this.insertTable,
        className: "btn btn-success btn-block col-xl-10 col-10 font-bold font-20",
        style: {
          margin: "0 auto",
          display: "block"
        }
      }, "Crear")))))), this.state.tablas.map(function (tabla, i) {
        return _react["default"].createElement("div", {
          key: tabla.ID,
          className: "row",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("div", {
          className: "card-header bg-primary p-3",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("h4", {
          className: "mb-0 text-white",
          style: {
            display: "inline"
          }
        }, " ", tabla.nombre, " "), _react["default"].createElement("div", {
          style: {
            "float": "right",
            border: "2px solid #000",
            cursor: "pointer"
          }
        }, _react["default"].createElement("img", {
          onClick: function onClick() {
            return _this6.deleteTableConfirmation(tabla.ID, i);
          },
          src: "../assets/trash.png",
          style: {
            height: "20px",
            width: "20px"
          }
        })), _react["default"].createElement("div", {
          style: {
            "float": "right",
            border: "2px solid #000",
            marginRight: "10px",
            cursor: "pointer"
          }
        }, _react["default"].createElement("img", {
          onClick: function onClick() {
            return _this6.props.terminoSeleccionTabla(tabla.ID, tabla.tabla, tabla.usuario, tabla.contrasena, tabla.servidor, tabla.baseDatos, tabla.tabla, tabla.tipoConexion);
          },
          src: "../assets/edit.png",
          style: {
            height: "20px",
            width: "20px"
          }
        })))));
      }), _react["default"].createElement("br", null));
    }
  }]);

  return ConfiguracionTablas;
}(_react["default"].Component);

exports["default"] = ConfiguracionTablas;
//# sourceMappingURL=ConfiguracionTablas.js.map
