"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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

var tipoCampos = [{
  nombre: "varchar"
}, {
  nombre: "bit"
}, {
  nombre: "date"
}, {
  nombre: "int"
}, {
  nombre: "decimal"
}];

var InstruccionSQL =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InstruccionSQL, _React$Component);

  function InstruccionSQL(props) {
    var _this;

    _classCallCheck(this, InstruccionSQL);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InstruccionSQL).call(this, props));
    _this.state = {
      mostrarModal: false,
      tituloModal: "",
      indexVarSeleccionado: -1
    };
    _this.openModal = _this.openModal.bind(_assertThisInitialized(_this));
    _this.mostrarCampos = _this.mostrarCampos.bind(_assertThisInitialized(_this));
    _this.actualizarCampo = _this.actualizarCampo.bind(_assertThisInitialized(_this));
    _this.closeModal = _this.closeModal.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(InstruccionSQL, [{
    key: "componentDidMount",
    value: function componentDidMount() {//this.getCampos();
    }
  }, {
    key: "openModal",
    value: function openModal(index) {
      var nombre = this.props.camposInstruccionSQL[index].nombre;
      this.setState({
        mostrarModal: true,
        tituloModal: "Modificar: " + nombre,
        indexVarSeleccionado: index
      }, this.mostrarCampos(index));
    }
  }, {
    key: "mostrarCampos",
    value: function mostrarCampos(index) {
      var nombre = this.props.camposInstruccionSQL[index].nombre;
      var tipo = this.props.camposInstruccionSQL[index].tipo;
      setTimeout(function () {
        $("#nombreVariable").val(nombre);
        $("#tipoEdit").val(tipo);
      }, 500);
    }
  }, {
    key: "actualizarCampo",
    value: function actualizarCampo() {
      var nombre = $("#nombreVariable").val();
      var tipo = $("#tipoEdit").val();

      if (nombre.length > 0 && nombre.length < 101) {
        if (tipo.length > 0 && tipo.length < 31) {
          this.props.actualizarCampo(this.state.indexVarSeleccionado, nombre, tipo);
        } else {
          alert("El tipo de la variable debe ser mayor a 0 caracteres y menor a 31.");
        }
      } else {
        alert("El nombre de la variable debe ser mayor a 0 caracteres y menor a 101.");
      }
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.setState({
        mostrarModal: false
      });
    }
    /*getCampos () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from InstruccionSQLCampos where variableID = "+this.props.variableID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            camposInstruccionSQL: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }
     agregarCampo () {
        var nombreCampo = $("#nuevoCampo").val();
        var variableID = this.props.variableID;
        var tipo = $("#tipo").val();
        if(nombreCampo.length < 101) {
            const transaction = new sql.Transaction( this.props.pool );
            transaction.begin(err => {
                var rolledBack = false;
                transaction.on('rollback', aborted => {
                    rolledBack = true;
                });
                const request = new sql.Request(transaction);
                request.query("insert into InstruccionSQLCampos (variableID, nombre, tipo) values ("+variableID+", '"+nombreCampo+"', '"+tipo+"')", (err, result) => {
                    if (err) {
                        if (!rolledBack) {
                            console.log(err);
                            transaction.rollback(err => {
                            });
                        }
                    } else {
                        transaction.commit(err => {
                            alert("Campo creado.");
                            this.getCampos();
                        });
                    }
                });
            }); // fin transaction
        } else {
            alert("El nombre del campo debe tener una longitud menor a 101 caracteres.");
        }
    }
     agregarInstruccionSQL () {
        var instruccionSQL = $("#comandoSQL").val();
        var variableID = this.props.variableID;
        if(instruccionSQL.length < 1001) {
            const transaction = new sql.Transaction( this.props.pool );
            transaction.begin(err => {
                var rolledBack = false;
                transaction.on('rollback', aborted => {
                    rolledBack = true;
                });
                const request = new sql.Request(transaction);
                request.query("insert into InstruccionSQL (variableID, instruccionSQL) values ("+variableID+", '"+instruccionSQL+"')", (err, result) => {
                    if (err) {
                        if (!rolledBack) {
                            console.log(err);
                            transaction.rollback(err => {
                            });
                        }
                    } else {
                        transaction.commit(err => {
                            alert("Instrucción SQL creado.");
                        });
                    }
                });
            }); // fin transaction
        } else {
            alert("El nombre del campo debe tener una longitud menor a 1001 caracteres.");
        }
    }*/

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement("div", null, this.props.navbar, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "card",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
        style: {
          width: "100%",
          paddingLeft: "15px"
        }
      }, _react["default"].createElement("h4", null, "Crear Campos: ", this.props.nombreVariable)), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-group text-center"
      }, _react["default"].createElement("table", {
        className: "table"
      }, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        scope: "col"
      }, "#"), _react["default"].createElement("th", {
        scope: "col"
      }, "Nombre"), _react["default"].createElement("th", {
        scope: "col"
      }, "Tipo"), _react["default"].createElement("th", {
        scope: "col"
      }, "Modificar"))), _react["default"].createElement("tbody", null, this.props.camposInstruccionSQL.map(function (campo, i) {
        return _react["default"].createElement("tr", {
          key: campo.nombre
        }, _react["default"].createElement("th", {
          scope: "row"
        }, i), _react["default"].createElement("td", null, campo.nombre), _react["default"].createElement("td", null, campo.tipo), _react["default"].createElement("td", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("img", {
          onClick: function onClick() {
            return _this2.openModal(i);
          },
          src: "../assets/edit.png",
          style: {
            height: "20px",
            width: "20px",
            display: "block",
            marginRight: "10px"
          },
          className: "addPointer"
        })));
      }), _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        scope: "row"
      }, "#"), _react["default"].createElement("td", null, _react["default"].createElement("input", {
        id: "nuevoCampo",
        type: "text",
        className: "form-control"
      })), _react["default"].createElement("td", null, _react["default"].createElement("select", {
        id: "tipo",
        className: "form-control"
      }, tipoCampos.map(function (tipo, i) {
        return _react["default"].createElement("option", {
          value: tipo.nombre,
          key: tipo.nombre
        }, tipo.nombre);
      })))))))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "text-center",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-primary active",
        onClick: this.props.agregarCampo
      }, "Agregar Campo")), _react["default"].createElement("br", null), _react["default"].createElement("hr", null), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("textarea", {
        className: "form-control",
        id: "comandoSQL",
        defaultValue: this.props.comandoSQL,
        rows: "7",
        style: {
          width: "90%"
        }
      })), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("a", {
        className: "btn btn-primary btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: this.props.agregarInstruccionSQL
      }, "Guardar Comando SQL")), _react["default"].createElement("br", null))), _react["default"].createElement(_Modal["default"], {
        show: this.state.mostrarModal,
        titulo: this.state.tituloModal,
        onClose: this.closeModal
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
        htmlFor: "tipoEdit",
        className: "col-form-label"
      }, "Tipo de Variable:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("select", {
        id: "tipoEdit",
        className: "form-control"
      }, tipoCampos.map(function (tipo, i) {
        return _react["default"].createElement("option", {
          value: tipo.nombre,
          key: tipo.nombre
        }, tipo.nombre);
      })))), _react["default"].createElement("div", {
        className: "text-center"
      }, _react["default"].createElement("a", {
        onClick: this.actualizarCampo,
        className: "btn btn-primary col-xs-5 col-5",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold"
        }
      }, "Actualizar Variable"), _react["default"].createElement("span", {
        className: "col-xs-1 col-1"
      }), _react["default"].createElement("a", {
        onClick: function onClick() {
          return _this2.props.eliminarCampo(_this2.state.indexVarSeleccionado);
        },
        className: "btn btn-primary col-xs-5 col-5",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold"
        }
      }, "Eliminar Variable"))));
    }
  }]);

  return InstruccionSQL;
}(_react["default"].Component);

exports["default"] = InstruccionSQL;
//# sourceMappingURL=InstruccionSQL.js.map
