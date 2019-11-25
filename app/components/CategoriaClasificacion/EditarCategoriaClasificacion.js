"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _inputmask = _interopRequireDefault(require("inputmask"));

var _ErrorMessage = _interopRequireDefault(require("../ErrorMessage.js"));

var _MessageModal = _interopRequireDefault(require("../MessageModal.js"));

var _InlineEdit = _interopRequireDefault(require("../InlineEdit.js"));

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

var EditarCategoriaClasificacion =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EditarCategoriaClasificacion, _React$Component);

  function EditarCategoriaClasificacion(props) {
    var _this;

    _classCallCheck(this, EditarCategoriaClasificacion);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditarCategoriaClasificacion).call(this, props));
    _this.state = {
      errorCreacionTipoCredito: {
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
        mensaje: ""
      }
    };
    _this.guardarTipoCredito = _this.guardarTipoCredito.bind(_assertThisInitialized(_this));
    _this.dismissTypeCreditNewError = _this.dismissTypeCreditNewError.bind(_assertThisInitialized(_this));
    _this.showSuccesMessage = _this.showSuccesMessage.bind(_assertThisInitialized(_this));
    _this.dismissMessageModal = _this.dismissMessageModal.bind(_assertThisInitialized(_this));
    _this.eliminarTipoCredito = _this.eliminarTipoCredito.bind(_assertThisInitialized(_this));
    (0, _inputmask["default"])({
      "mask": "(I)|(II)|(III)|(IV)|(V)"
    }).mask($("#categoriaCategoriaClasificacion"));
    setTimeout(function () {
      (0, _inputmask["default"])({
        "mask": "(I)|(II)|(III)|(IV)|(V)"
      }).mask($("#categoriaCategoriaClasificacion"));
    }, 500);
    return _this;
  }

  _createClass(EditarCategoriaClasificacion, [{
    key: "guardarTipoCredito",
    value: function guardarTipoCredito() {
      var _this2 = this;

      var categoria = $("#categoriaCategoriaClasificacion").val();
      var tipoCredito = $("#nombreTipoCreditoCategoriaClasificacion").val();
      var descripcion = $("#descripcionCategoriaClasificacion").val();
      if (categoria == undefined) categoria = $("#categoriaCategoriaClasificacion").text();
      if (tipoCredito == undefined) tipoCredito = $("#nombreTipoCreditoCategoriaClasificacion").text();

      if (categoria.length > 0 && categoria.length < 6) {
        if (tipoCredito.length > 0 && tipoCredito.length < 61) {
          if (descripcion.length < 401) {
            var transaction = new _mssql["default"].Transaction(this.props.pool);
            transaction.begin(function (err) {
              var rolledBack = false;
              transaction.on('rollback', function (aborted) {
                rolledBack = true;
              });
              var request = new _mssql["default"].Request(transaction);
              request.query("update CategoriaClasificacion set categoria = '" + categoria + "', tipoCredito = '" + tipoCredito + "', descripcion = '" + descripcion + "' where ID = " + _this2.props.categoriaClasificacion.ID, function (err, result) {
                if (err) {
                  if (!rolledBack) {
                    console.log(err);
                    transaction.rollback(function (err) {});
                  }
                } else {
                  transaction.commit(function (err) {
                    _this2.showSuccesMessage("Exito", "Tipo de crédito creado con éxito.");

                    _this2.setState({
                      errorCreacionTipoCredito: {
                        campo: '',
                        descripcion: '',
                        mostrar: false
                      }
                    });
                  });
                }
              });
            }); // fin transaction
          } else {
            var campo = "Descripción";
            var descripcionN;
            if (descripcion.length > 400) descripcionN = "El campo debe tener una longitud menor a 400.";
            this.setState({
              errorCreacionTipoCredito: {
                campo: campo,
                descripcion: descripcionN,
                mostrar: true
              }
            });
          }
        } else {
          var _campo = "Nombre de Tipo de Crédito";

          var _descripcionN;

          if (tipoCredito.length == 0) _descripcionN = "El campo debe tener una longitud mayor a 0.";else if (tipoCredito.length > 60) _descripcionN = "El campo debe tener una longitud menor a 60.";
          this.setState({
            errorCreacionTipoCredito: {
              campo: _campo,
              descripcion: _descripcionN,
              mostrar: true
            }
          });
        }
      } else {
        var _campo2 = "Categoria";

        var _descripcionN2;

        if (categoria.length == 0) _descripcionN2 = "El campo debe tener una longitud mayor a 0.";else if (categoria.length > 5) _descripcionN2 = "El campo debe tener una longitud menor a 5.";
        this.setState({
          errorCreacionTipoCredito: {
            campo: _campo2,
            descripcion: _descripcionN2,
            mostrar: true
          }
        });
      }
    }
  }, {
    key: "eliminarTipoCredito",
    value: function eliminarTipoCredito() {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("delete from CategoriaClasificacion where ID = " + _this3.props.categoriaClasificacion.ID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this3.showSuccesMessage("Exito", "Categoria de Clasificación eliminada con éxito.");

              _this3.setState({
                errorCreacionTipoCredito: {
                  campo: '',
                  descripcion: '',
                  mostrar: false
                }
              });

              _this3.props.retornoSelCategoriaClasificacion();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "dismissTypeCreditNewError",
    value: function dismissTypeCreditNewError() {
      this.setState({
        errorCreacionTipoCredito: {
          campo: "",
          descripcion: "",
          mostrar: false
        }
      });
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
          mensaje: mensaje
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
            mensaje: ""
          }
        });
      }, 850);
    }
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
          mensaje: ""
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Configuraci\xF3n"), _react["default"].createElement("div", {
        className: "page-breadcrumb"
      }, _react["default"].createElement("nav", {
        "aria-label": "breadcrumb"
      }, _react["default"].createElement("ol", {
        className: "breadcrumb"
      }, _react["default"].createElement("li", {
        className: "breadcrumb-item",
        "aria-current": "page",
        onClick: this.props.showConfigurationComponent
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Configuraci\xF3n")), _react["default"].createElement("li", {
        className: "breadcrumb-item",
        "aria-current": "page",
        onClick: this.props.retornoSelCategoriaClasificacion
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Seleccionar Categoria de Clasificaci\xF3n")), _react["default"].createElement("li", {
        className: "breadcrumb-item active",
        "aria-current": "page"
      }, "Editar Categoria de Clasificaci\xF3n"))))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "card-body",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "d-inline-block text-center form-group",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("h2", {
        className: "text-muted"
      }, "Categor\xEDa"), _react["default"].createElement("input", {
        id: "categoriaCategoriaClasificacion",
        type: "text",
        defaultValue: this.props.categoriaClasificacion.categoria,
        className: "form-control",
        style: {
          width: "100%"
        }
      }))))), _react["default"].createElement("div", {
        className: "col-xl-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "card-body",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "d-inline-block text-center form-group",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("h2", {
        className: "text-muted"
      }, "Nombre"), _react["default"].createElement("input", {
        id: "nombreTipoCreditoCategoriaClasificacion",
        type: "text",
        defaultValue: this.props.categoriaClasificacion.tipoCredito,
        className: "form-control",
        style: {
          width: "100%"
        }
      }))))), _react["default"].createElement("div", {
        className: "col-xl-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "card-body",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "d-inline-block text-center form-group",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("h2", {
        className: "text-muted"
      }, "Descripci\xF3n"), _react["default"].createElement("textarea", {
        id: "descripcionCategoriaClasificacion",
        type: "text",
        style: {
          width: "100%"
        },
        className: "form-control",
        defaultValue: this.props.categoriaClasificacion.descripcion
      })))))), this.state.errorCreacionTipoCredito.mostrar ? _react["default"].createElement(_ErrorMessage["default"], {
        campo: this.state.errorCreacionTipoCredito.campo,
        descripcion: this.state.errorCreacionTipoCredito.descripcion,
        dismissTableError: this.dismissTypeCreditNewError
      }, " ") : _react["default"].createElement("span", null), _react["default"].createElement("div", {
        className: "text-center"
      }, _react["default"].createElement("a", {
        onClick: this.guardarTipoCredito,
        className: "btn btn-primary col-xs-6 col-6",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold"
        }
      }, "Guardar"), _react["default"].createElement("a", {
        onClick: function onClick() {
          return _this4.props.seleccionarCategoriaClasificacion(_this4.props.categoriaClasificacion.ID, _this4.props.categoriaClasificacion.nombre);
        },
        className: "btn btn-info col-xs-5 col-5",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold",
          margin: "0% 1% 0% 0%"
        }
      }, "Configurar Variables")), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "text-center"
      }, _react["default"].createElement("a", {
        onClick: this.eliminarTipoCredito,
        className: "btn btn-danger col-xs-5 col-5",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold",
          margin: "0% 0% 0% 1%"
        }
      }, "Borrar")), _react["default"].createElement("br", null), this.state.mensajeModal.mostrarMensaje ? _react["default"].createElement(_MessageModal["default"], {
        esError: this.state.mensajeModal.esError,
        esConfirmar: this.state.mensajeModal.esConfirmar,
        dismissMessage: this.dismissMessageModal,
        confirmFunction: this.confirmMessageModal,
        titulo: this.state.mensajeModal.titulo,
        mensaje: this.state.mensajeModal.mensaje
      }, " ") : _react["default"].createElement("span", null));
    }
  }]);

  return EditarCategoriaClasificacion;
}(_react["default"].Component);

exports["default"] = EditarCategoriaClasificacion;
//# sourceMappingURL=EditarCategoriaClasificacion.js.map
