"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _reactInputSlider = _interopRequireDefault(require("react-input-slider"));

var _Formula = _interopRequireDefault(require("../../Formula.js"));

var _InstruccionVariable = _interopRequireDefault(require("../../InstruccionVariable.js"));

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
var formulaG = '';

var CrearIndicador =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CrearIndicador, _React$Component);

  function CrearIndicador(props) {
    var _this;

    _classCallCheck(this, CrearIndicador);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CrearIndicador).call(this, props));
    _this.state = {
      componenteActual: 'crearIndicador',
      navbar: "",
      x: 0
    };
    _this.crearIndicador = _this.crearIndicador.bind(_assertThisInitialized(_this));
    _this.goToCreateFormula = _this.goToCreateFormula.bind(_assertThisInitialized(_this));
    _this.retornoCrearIndicador = _this.retornoCrearIndicador.bind(_assertThisInitialized(_this));
    _this.anadirFormula = _this.anadirFormula.bind(_assertThisInitialized(_this));
    _this.retornoCampo = _this.retornoCampo.bind(_assertThisInitialized(_this));
    _this.retornoOperacion = _this.retornoOperacion.bind(_assertThisInitialized(_this));
    _this.actualizarNivelNuevaRegla = _this.actualizarNivelNuevaRegla.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CrearIndicador, [{
    key: "crearIndicador",
    value: function crearIndicador() {
      var nombre = $("#nombreIndicador").val();
      var codigo = $("#codigo").val();
      var formula = formulaG;
      var peso = this.state.x;
      var tolerancia = parseInt($("#tolerancia").val());
      var valorIdeal = parseInt($("#valorIdeal").val());
      var tipoIndicador = $("#tipoIndicador").val();
      var periodicidad = $("#periodicidad").val();
      var analista = $("#analista").val();
      var riesgoPadre = this.props.riesgoPadre;
      console.log('nombre');
      console.log(nombre);
      console.log('codigo');
      console.log(codigo);
      console.log('formula');
      console.log(formula);
      console.log('peso');
      console.log(peso);
      console.log('tolerancia');
      console.log(tolerancia);
      console.log('valorIdeal');
      console.log(valorIdeal);
      console.log('periodicidad');
      console.log(periodicidad);
      console.log('tipoIndicador');
      console.log(tipoIndicador);
      console.log('analista');
      console.log(analista);
      console.log('riesgoPadre');
      console.log(riesgoPadre);
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into Indicadores (nombre, codigo, formula, peso, tolerancia, valorIdeal, periodicidad, tipoIndicador, analista, idRiesgoPadre) values ('" + nombre + "', '" + codigo + "', '" + formula + "', " + peso + ", " + tolerancia + ", " + valorIdeal + ", '" + periodicidad + "', '" + tipoIndicador + "', '" + analista + "', " + riesgoPadre + ")", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {});
          }
        });
      }); // fin transaction
    }
  }, {
    key: "goToCreateFormula",
    value: function goToCreateFormula() {
      var navbar = _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Crear F\xF3rmula"), _react["default"].createElement("div", {
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
        onClick: this.props.retornoSeleccionIndicador
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Seleccionar Riesgo")), _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.retornoCrearIndicador
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Crear Indicador")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Crear F\xF3rmula")))))));

      this.setState({
        componenteActual: "crearFormula",
        navbar: navbar
      });
    }
  }, {
    key: "retornoCrearIndicador",
    value: function retornoCrearIndicador() {
      this.setState({
        componenteActual: "crearIndicador"
      });
    }
  }, {
    key: "anadirFormula",
    value: function anadirFormula(formulaT, formulaArreglo) {
      formulaG = formulaT.formula;
      console.log('formulaG');
      console.log(formulaG);
    }
  }, {
    key: "retornoCampo",
    value: function retornoCampo() {//
    }
  }, {
    key: "retornoOperacion",
    value: function retornoOperacion() {//
    }
  }, {
    key: "actualizarNivelNuevaRegla",
    value: function actualizarNivelNuevaRegla() {//
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.state.componenteActual.localeCompare("crearIndicador") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "page-header"
        }, _react["default"].createElement("h2", {
          className: "pageheader-title"
        }, "Crear Indicador"), _react["default"].createElement("div", {
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
          onClick: this.props.retornoSeleccionIndicador
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Seleccionar Riesgo")), _react["default"].createElement("li", {
          className: "breadcrumb-item active font-16",
          "aria-current": "page"
        }, "Crear Indicador"))))))), _react["default"].createElement("div", {
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
          htmlFor: "nombreIndicador",
          className: "col-form-label"
        }, "Nombre Indicador")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("input", {
          id: "nombreIndicador",
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
          htmlFor: "codigo",
          className: "col-form-label"
        }, "Codigo")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("input", {
          id: "codigo",
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
          htmlFor: "peso",
          className: "col-form-label"
        }, "Peso")), _react["default"].createElement("div", {
          className: "col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 form-group"
        }, _react["default"].createElement(_reactInputSlider["default"], {
          axis: "x",
          xstep: 1,
          xmin: 0,
          xmax: 100,
          x: this.state.x,
          onChange: function onChange(_ref) {
            var x = _ref.x;
            return _this2.setState({
              x: x
            });
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
          htmlFor: "tolerancia",
          className: "col-form-label"
        }, "Tolerancia")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("input", {
          id: "tolerancia",
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
          htmlFor: "valorIdeal",
          className: "col-form-label"
        }, "Valor Ideal")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("input", {
          id: "valorIdeal",
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
          className: "form-control"
        }, _react["default"].createElement("option", {
          value: "-1"
        }, "Ninguno"), periodicidad.map(function (periodicidad, i) {
          return _react["default"].createElement("option", {
            value: periodicidad.nombre,
            key: periodicidad.nombre
          }, periodicidad.nombre);
        })))), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "tipoIndicador",
          className: "col-form-label"
        }, "Tipo Indicador")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("select", {
          id: "tipoIndicador",
          className: "form-control"
        }, _react["default"].createElement("option", {
          value: "riesgoInherente"
        }, "Riesgo Inherente"), _react["default"].createElement("option", {
          value: "calidadGestion"
        }, "Calidad de Gesti\xF3n")))), _react["default"].createElement("div", {
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
          type: "text",
          className: "form-control form-control-sm"
        }))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("a", {
          className: "btn btn-success btn-block btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: this.goToCreateFormula
        }, "Crear F\xF3rmula"))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
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
          onClick: this.crearIndicador
        }, "Guardar")), _react["default"].createElement("br", null)))))));
      } else if (this.state.componenteActual.localeCompare("crearFormula") == 0) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }, _react["default"].createElement(_Formula["default"], {
          pool: this.props.pool,
          anadirFormula: this.anadirFormula,
          retornoCampo: this.retornoCampo,
          retornoOperacion: this.retornoOperacion,
          actualizarNivelNuevaRegla: this.actualizarNivelNuevaRegla,
          navbar: this.state.navbar
        }));
      } else if (this.state.componenteActual.localeCompare("variableCondiciones") == 0) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }, _react["default"].createElement(_InstruccionVariable["default"], {
          pool: this.props.pool,
          retornarCampo: this.retornarCampo,
          campos: this.props.columnas,
          camposDropdown: [{
            valor: this.props.nombreTablaSeleccionada
          }],
          valoresDropdown: this.props.columnas,
          asignaciones: this.state.formulas,
          callbackCrearRegla: this.anadirRegla,
          callbackModificarRegla: this.modificarRegla,
          callbackEliminarRegla: this.eliminarRegla,
          retornarIndiceSeleccionado: this.actualizarIndiceSeleccionadoReglas,
          retornarEstadoVistaEsCondicion: function retornarEstadoVistaEsCondicion() {
            _this2.actualizarCondicion;
          },
          retornoCampo: this.retornoCampoCondicion,
          retornoOperacion: this.retornoOperacion,
          reglas: this.state.reglas,
          navbar: this.state.navbar,
          goToCreateFormula: this.goToCreateFormula,
          configuracionHome: this.props.configuracionHome,
          goOptions: this.props.goOptions,
          actualizarNivelNuevaRegla: this.actualizarNivelNuevaRegla,
          retornoSeleccionVariables: this.props.retornoSeleccionVariables
        }));
      }
    }
  }]);

  return CrearIndicador;
}(_react["default"].Component);

exports["default"] = CrearIndicador;
//# sourceMappingURL=CrearIndicador.js.map
