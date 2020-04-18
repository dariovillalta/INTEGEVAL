"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _reactInputSlider = _interopRequireDefault(require("react-input-slider"));

var _Umbral = _interopRequireDefault(require("../Umbral/Umbral.js"));

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

var EditarRiesgo =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EditarRiesgo, _React$Component);

  function EditarRiesgo(props) {
    var _this;

    _classCallCheck(this, EditarRiesgo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditarRiesgo).call(this, props));
    _this.state = {
      x: 0,
      componentActual: "EditarRiesgo",
      navbar: ""
    };
    _this.goCrearUmbral = _this.goCrearUmbral.bind(_assertThisInitialized(_this));
    _this.retornarEditRiesgo = _this.retornarEditRiesgo.bind(_assertThisInitialized(_this));
    _this.guardarRiesgo = _this.guardarRiesgo.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(EditarRiesgo, [{
    key: "goCrearUmbral",
    value: function goCrearUmbral() {
      var navbar = _react["default"].createElement("div", {
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
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.retornarEditRiesgo
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Editar Riesgo")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Umbrales")))))));

      this.setState({
        navbar: navbar,
        componentActual: "EditarUmbral"
      });
    }
  }, {
    key: "retornarEditRiesgo",
    value: function retornarEditRiesgo() {
      this.setState({
        componentActual: "EditarRiesgo"
      });
    }
  }, {
    key: "guardarRiesgo",
    value: function guardarRiesgo() {
      var _this2 = this;

      var nombre = $("#nombreRiesgo").val();
      var formula = '';
      var peso = this.state.x;
      var tolerancia = parseInt($("#tolerancia").val());
      var valorIdeal = parseInt($("#valorIdeal").val());
      var tipoValorIdeal = $("#tipoValorIdeal").val();
      var riesgoPadre = parseInt(this.props.riesgoPadre);
      var nivel = 0;

      if (this.props.riesgoPadre == -1) {
        riesgoPadre = parseInt($("#riesgoPadre").val());
      }

      console.log('nombre');
      console.log(nombre);
      console.log('formula');
      console.log(formula);
      console.log('peso');
      console.log(peso);
      console.log('tolerancia');
      console.log(tolerancia);
      console.log('valorIdeal');
      console.log(valorIdeal);
      console.log('riesgoPadre');
      console.log(riesgoPadre);
      console.log('nivel');
      console.log(nivel);
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("update Riesgos set nombre = '" + nombre + "', peso = " + peso + ", tolerancia = " + tolerancia + ", valorIdeal = " + valorIdeal + ", tipoValorIdeal = '" + tipoValorIdeal + "', riesgoPadre = " + riesgoPadre + " where ID = " + _this2.props.idRiesgoSeleccionado, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.props.terminoCrearRiesgo(nombre);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.state.componentActual.localeCompare("EditarRiesgo") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "page-header"
        }, _react["default"].createElement("h2", {
          className: "pageheader-title"
        }, "Editar Riesgo"), _react["default"].createElement("div", {
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
        }, "Editar Riesgo"))))))), _react["default"].createElement("div", {
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
          className: "form-control form-control-sm",
          defaultValue: this.props.nombreRiesgo
        }))), _react["default"].createElement("div", {
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
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement(_reactInputSlider["default"], {
          axis: "x",
          xstep: 1,
          xmin: 0,
          xmax: this.props.pesoMaximo,
          x: this.state.x,
          onChange: function onChange(_ref) {
            var x = _ref.x;
            return _this3.setState({
              x: x
            });
          },
          style: {
            width: "100%",
            marginTop: "10px"
          }
        }))), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "tolerancia",
          className: "col-form-label"
        }, "Tolerancia")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("input", {
          id: "tolerancia",
          type: "text",
          className: "form-control form-control-sm",
          defaultValue: this.props.toleranciaRiesgo
        }))), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "valorIdeal",
          className: "col-form-label"
        }, "Valor Ideal")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("input", {
          id: "valorIdeal",
          type: "text",
          className: "form-control form-control-sm",
          defaultValue: this.props.valorIdealRiesgo
        }))), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "tipoValorIdeal",
          className: "col-form-label"
        }, "Tipo de Valor Ideal")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("select", {
          id: "tipoValorIdeal",
          className: "form-control"
        }, tipoCampos.map(function (tipo, i) {
          return _react["default"].createElement("option", {
            value: tipo.nombre,
            key: tipo.nombre
          }, tipo.nombre);
        })))), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "riesgoPadre",
          className: "col-form-label"
        }, "Riesgo Padre")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("select", {
          id: "riesgoPadre",
          className: "form-control",
          defaultValue: this.props.padreRiesgo
        }, _react["default"].createElement("option", {
          value: "-1"
        }, "Ninguno"), this.props.riesgos.map(function (riesgo, i) {
          return _react["default"].createElement("option", {
            value: riesgo.ID,
            key: riesgo.ID
          }, riesgo.nombre);
        })))), _react["default"].createElement("a", {
          className: "btn btn-brand btn-block btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: this.goCrearUmbral
        }, "Umbrales"), _react["default"].createElement("br", null), _react["default"].createElement("div", {
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
        }, "Guardar")), _react["default"].createElement("br", null)))))));
      } else if (this.state.componentActual.localeCompare("EditarUmbral") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_Umbral["default"], {
          navbar: this.state.navbar,
          idVariable: this.props.idRiesgoSeleccionado,
          pool: this.props.pool
        }, " "));
      }
    }
  }]);

  return EditarRiesgo;
}(_react["default"].Component);

exports["default"] = EditarRiesgo;
//# sourceMappingURL=EditarRiesgo.js.map
