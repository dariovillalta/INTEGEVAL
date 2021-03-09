"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _reactInputSlider = _interopRequireDefault(require("react-input-slider"));

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
  nombre: "texto"
}, {
  nombre: "booleano"
}, {
  nombre: "fecha"
}, {
  nombre: "número"
}, {
  nombre: "arreglo"
}];
var peso = 0,
    idFormula = '',
    nombre = '',
    formula = '',
    nombreEncargadoRiesgo = '';

var CrearRiesgo =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CrearRiesgo, _React$Component);

  function CrearRiesgo(props) {
    var _this;

    _classCallCheck(this, CrearRiesgo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CrearRiesgo).call(this, props));
    _this.state = {
      x: peso,
      usuarios: []
    };
    _this.getUsuarios = _this.getUsuarios.bind(_assertThisInitialized(_this));
    _this.crearRiesgo = _this.crearRiesgo.bind(_assertThisInitialized(_this));
    _this.tieneEspaciosEnBlanco = _this.tieneEspaciosEnBlanco.bind(_assertThisInitialized(_this));
    _this.updateIdFormula = _this.updateIdFormula.bind(_assertThisInitialized(_this));
    _this.updateNombreRiesgo = _this.updateNombreRiesgo.bind(_assertThisInitialized(_this));
    _this.updateFormulaRiesgo = _this.updateFormulaRiesgo.bind(_assertThisInitialized(_this));
    _this.updateNombreEncargadoRiesgo = _this.updateNombreEncargadoRiesgo.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CrearRiesgo, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getUsuarios();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      peso = 0;
      nombre = '';
      formula = '';
      nombreEncargadoRiesgo = '';
    }
  }, {
    key: "getUsuarios",
    value: function getUsuarios() {
      var _this2 = this;

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
              _this2.setState({
                usuarios: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearRiesgo",
    value: function crearRiesgo() {
      var _this3 = this;

      var idFormula = $("#idFormula").val();
      var nombre = $("#nombreRiesgo").val();
      var formula = $("#formula").val();
      var responsable = $("#responsable").val();
      var peso = this.state.x;

      if (idFormula.length > 0 && idFormula.length < 101) {
        if (nombre.length > 0 && nombre.length < 501) {
          if (!this.tieneEspaciosEnBlanco(nombre)) {
            if (formula.length > 0 && formula.length < 501) {
              if (nombre.length > 0 && nombre.length < 101) {
                if (responsable.length > 0) {
                  if (!isNaN(parseInt(peso))) {
                    var transaction = new _mssql["default"].Transaction(this.props.pool);
                    transaction.begin(function (err) {
                      var rolledBack = false;
                      transaction.on('rollback', function (aborted) {
                        rolledBack = true;
                      });
                      var request = new _mssql["default"].Request(transaction);
                      request.query("insert into Riesgos (idFormula, nombre, formula, responsable, peso) values ('" + idFormula + "', '" + nombre + "', '" + formula + "', '" + responsable + "', " + peso + ")", function (err, result) {
                        if (err) {
                          if (!rolledBack) {
                            console.log(err);
                            transaction.rollback(function (err) {});
                          }
                        } else {
                          transaction.commit(function (err) {
                            _this3.props.terminoCrearRiesgo();

                            _this3.props.actualizarRiesgos();
                          });
                        }
                      });
                    }); // fin transaction
                  } else {
                    alert("el peso del riesgo debe ser un numero valido");
                  }
                } else {
                  alert("Ingrese un valor para el responsable.");
                }
              } else {
                alert("el peso del riesgo debe ser un numero valido");
              }
            } else {
              alert("la formula del riesgo debe tener una longitud mayor a 0 y menor a 501");
            }
          } else {
            alert('El nombre del riesgo no debe contener espacios en blanco');
          }
        } else {
          alert("el nombre del riesgo debe tener una longitud mayor a 0 y menor a 501");
        }
      } else {
        alert("el idenficador en fórmula del riesgo debe tener una longitud mayor a 0 y menor a 101");
      }
    }
  }, {
    key: "tieneEspaciosEnBlanco",
    value: function tieneEspaciosEnBlanco(s) {
      return /\s/g.test(s);
    }
  }, {
    key: "updateIdFormula",
    value: function updateIdFormula() {
      idFormula = $("#idFormula").val();
    }
  }, {
    key: "updateNombreRiesgo",
    value: function updateNombreRiesgo() {
      nombre = $("#nombreRiesgo").val();
    }
  }, {
    key: "updateFormulaRiesgo",
    value: function updateFormulaRiesgo() {
      formula = $("#formula").val();
    }
  }, {
    key: "updateNombreEncargadoRiesgo",
    value: function updateNombreEncargadoRiesgo() {
      nombreEncargadoRiesgo = $("#responsable").val();
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
      }, "Crear Riesgo"), _react["default"].createElement("div", {
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
        onClick: this.props.retornoSeleccionRiesgo
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Riesgos")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Crear Riesgo"))))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card influencer-profile-data"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        className: "border-top border-bottom addPaddingToConfig",
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
        htmlFor: "nombreRiesgo",
        className: "col-form-label"
      }, "Nombre Riesgo")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("input", {
        id: "nombreRiesgo",
        type: "text",
        defaultValue: nombre,
        onKeyUp: this.updateNombreRiesgo,
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
      }, "Identificador en F\xF3rmula")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("input", {
        id: "idFormula",
        type: "text",
        defaultValue: idFormula,
        onKeyUp: this.updateIdFormula,
        className: "form-control form-control-sm"
      }))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "formula",
        className: "col-form-label"
      }, "Tipo de Indicador")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("select", {
        id: "formula",
        className: "form-control",
        defaultValue: this.props.periodicidadVariable,
        onChange: this.updateFormulaRiesgo
      }, _react["default"].createElement("option", {
        value: "ambos"
      }, "Calidad de Gesti\xF3n + Riesgo Inherente"), _react["default"].createElement("option", {
        value: "riesgoInherente"
      }, "Riesgo Inherente"), _react["default"].createElement("option", {
        value: "calidadGesti\xF3n"
      }, "Calidad de Gesti\xF3n")))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "peso",
        className: "col-form-label"
      }, "Peso")), _react["default"].createElement("div", {
        className: "col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 form-group"
      }, _react["default"].createElement(_reactInputSlider["default"], {
        axis: "x",
        xstep: 1,
        xmin: 0,
        xmax: this.props.pesoMaximo,
        x: this.state.x,
        onChange: function onChange(_ref) {
          var x = _ref.x;

          _this4.setState({
            x: x
          });

          peso = x;
        },
        style: {
          width: "100%",
          marginTop: "10px"
        }
      })), _react["default"].createElement("div", {
        className: "col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 form-group"
      }, _react["default"].createElement("label", {
        id: "pesoLabel",
        className: "col-form-label"
      }, this.state.x))), _react["default"].createElement("div", {
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
        defaultValue: nombreEncargadoRiesgo,
        onChange: this.updateNombreEncargadoRiesgo,
        className: "form-control"
      }, _react["default"].createElement("option", {
        value: "-1"
      }, "Ninguno"), this.state.usuarios.map(function (usuario, i) {
        return _react["default"].createElement("option", {
          value: usuario.ID,
          key: usuario.ID
        }, usuario.usuario);
      })))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
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
        onClick: this.crearRiesgo
      }, "Crear")), _react["default"].createElement("br", null)))))));
    }
  }]);

  return CrearRiesgo;
}(_react["default"].Component);

exports["default"] = CrearRiesgo;
//# sourceMappingURL=CrearRiesgo.js.map
