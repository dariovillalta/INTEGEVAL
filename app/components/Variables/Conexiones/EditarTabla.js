"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _ErrorMessage = _interopRequireDefault(require("../../ErrorMessage.js"));

var _MessageModal = _interopRequireDefault(require("../../MessageModal.js"));

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

var EditarTabla =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EditarTabla, _React$Component);

  function EditarTabla(props) {
    var _this;

    _classCallCheck(this, EditarTabla);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditarTabla).call(this, props));
    _this.state = {
      tablas: [],
      errorCreacionTabla: {
        campo: "",
        descripcion: "",
        mostrar: false
      },
      mensajeModal: {
        mostrarMensaje: false,
        mensajeConfirmado: false,
        esError: false,
        esConfirmar: false,
        titulo: "",
        mensaje: "",
        banderaMetodoInit: "",
        idElementoSelec: -1,
        indiceX: -1,
        indiceY: -1
      }
    };
    _this.updateTable = _this.updateTable.bind(_assertThisInitialized(_this));
    _this.dismissTableNewError = _this.dismissTableNewError.bind(_assertThisInitialized(_this));
    _this.dismissMessageModal = _this.dismissMessageModal.bind(_assertThisInitialized(_this));
    _this.confirmMessageModal = _this.confirmMessageModal.bind(_assertThisInitialized(_this));
    _this.showSuccesMessage = _this.showSuccesMessage.bind(_assertThisInitialized(_this));
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


  _createClass(EditarTabla, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "updateTable",
    value: function updateTable() {
      var _this2 = this;

      var nombreTabla = $("#nombreTablaNuevo").val();
      var usuarioTabla = $("#usuarioTablaNuevo").val();
      var contrasenaTabla = $("#contrasenaTablaNuevo").val();
      var servidorTabla = $("#servidorTablaNuevo").val();
      var basedatosTabla = $("#basedatosTablaNuevo").val();
      var tablaTabla = $("#tablaTablaNuevo").val();
      var funcionTabla = $("#funcionTabla").val();

      if (nombreTabla.length > 0 && nombreTabla.length < 71) {
        if (usuarioTabla.length > 0 && usuarioTabla.length < 51) {
          if (contrasenaTabla.length > 0 && contrasenaTabla.length < 201) {
            if (servidorTabla.length > 0 && servidorTabla.length < 51) {
              if (basedatosTabla.length > 0 && basedatosTabla.length < 51) {
                if (tablaTabla.length > 0 && tablaTabla.length < 71) {
                  if (tablaTabla.length > 0 && tablaTabla.length < 71) {
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
                      request.query("update Tablas set Nombre = '" + nombreTabla + "', Usuario = '" + usuarioTabla + "', Contrasena = '" + contrasenaTabla + "', Servidor = '" + servidorTabla + "', BaseDatos = '" + basedatosTabla + "', Tabla = '" + tablaTabla + "' where ID = " + _this2.props.idTablaSeleccionada, function (err, result) {
                        if (err) {
                          if (!rolledBack) {
                            console.log(err);
                            transaction.rollback(function (err) {});
                          }
                        } else {
                          transaction.commit(function (err) {
                            _this2.showSuccesMessage("Exito", "Tabla creada con éxito.");

                            _this2.loadTables();
                          });
                        }
                      });
                    }); // fin transaction
                  } else {
                    var campo = "Función de la Tabla";
                    var descripcion;
                    if (funcionTabla.length == 0) descripcion = "El campo debe tener una longitud mayor a 0.";else descripcion = "El campo debe tener una longitud menor a 31.";
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
        var _campo6 = "Nombre de la Conección";

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
    /*======_______====== ======_______======   MENSAJES MODAL    ======_______====== ======_______======*/

    /*======_______======                                                             ======_______======*/

    /*======_______======                                                             ======_______======*/

    /*======_______====== ======_______====== ==_____==  ==___==  ======_______====== ======_______======*/

  }, {
    key: "dismissMessageModal",
    value: function dismissMessageModal() {
      this.setState({
        mensajeModal: {
          mostrarMensaje: false,
          mensajeConfirmado: false,
          esError: false,
          esConfirmar: false,
          titulo: "",
          mensaje: "",
          banderaMetodoInit: "",
          idElementoSelec: -1,
          indiceX: -1,
          indiceY: -1
        }
      });
    }
  }, {
    key: "confirmMessageModal",
    value: function confirmMessageModal() {
      if (this.state.mensajeModal.banderaMetodoInit.localeCompare("goDelTable") == 0) {
        var copiaID = this.state.mensajeModal.idElementoSelec;
        this.deleteTable(copiaID);
      }
    }
  }, {
    key: "showSuccesMessage",
    value: function showSuccesMessage(titulo, mensaje) {
      this.setState({
        mensajeModal: {
          mostrarMensaje: true,
          mensajeConfirmado: false,
          esError: false,
          esConfirmar: false,
          titulo: titulo,
          mensaje: mensaje,
          banderaMetodoInit: "",
          idElementoSelec: this.state.mensajeModal.idElementoSelec,
          indiceX: this.state.mensajeModal.indiceX,
          indiceY: this.state.mensajeModal.indiceY
        }
      });
      var self = this;
      setTimeout(function () {
        self.setState({
          mensajeModal: {
            mostrarMensaje: false,
            mensajeConfirmado: false,
            esError: false,
            esConfirmar: false,
            titulo: "",
            mensaje: "",
            banderaMetodoInit: "",
            idElementoSelec: self.state.mensajeModal.idElementoSelec,
            indiceX: self.state.mensajeModal.indiceX,
            indiceY: self.state.mensajeModal.indiceY
          }
        });
      }, 850);
    }
  }, {
    key: "render",
    value: function render() {
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
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.retornoSeleccionTabla
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Tablas")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Editar Tabla"))))))), _react["default"].createElement("div", {
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
        defaultValue: this.props.nombreTablaSeleccionada,
        type: "text",
        className: "form-control"
      })), _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Usuario de la Tabla"), _react["default"].createElement("input", {
        id: "usuarioTablaNuevo",
        defaultValue: this.props.usuarioTablaSeleccionada,
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
        defaultValue: this.props.contrasenaTablaSeleccionada,
        type: "text",
        className: "form-control"
      })), _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Servidor de la Tabla"), _react["default"].createElement("input", {
        id: "servidorTablaNuevo",
        defaultValue: this.props.servidorTablaSeleccionada,
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
        defaultValue: this.props.baseDatosTablaSeleccionada,
        type: "text",
        className: "form-control"
      })), _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Nombre de la Tabla"), _react["default"].createElement("input", {
        id: "tablaTablaNuevo",
        defaultValue: this.props.tablaTablaSeleccionada,
        type: "text",
        className: "form-control"
      }))), this.state.errorCreacionTabla.mostrar ? _react["default"].createElement(_ErrorMessage["default"], {
        campo: this.state.errorCreacionTabla.campo,
        descripcion: this.state.errorCreacionTabla.descripcion,
        dismissTableError: this.dismissTableNewError
      }, " ") : _react["default"].createElement("span", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("button", {
        onClick: this.insertTable,
        className: "btn btn-success btn-block col-xl-10 col-10 font-bold font-20",
        style: {
          margin: "0 auto",
          display: "block"
        }
      }, "Guardas Cambios")))))), _react["default"].createElement("br", null), this.state.mensajeModal.mostrarMensaje ? _react["default"].createElement(_MessageModal["default"], {
        esError: this.state.mensajeModal.esError,
        esConfirmar: this.state.mensajeModal.esConfirmar,
        dismissMessage: this.dismissMessageModal,
        confirmFunction: this.confirmMessageModal,
        titulo: this.state.mensajeModal.titulo,
        mensaje: this.state.mensajeModal.mensaje
      }, " ") : _react["default"].createElement("span", null));
    }
  }]);

  return EditarTabla;
}(_react["default"].Component);

exports["default"] = EditarTabla;
//# sourceMappingURL=EditarTabla.js.map
