"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _Accordion = _interopRequireDefault(require("../Accordion/Accordion.js"));

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

var SeleccionarIndicador =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SeleccionarIndicador, _React$Component);

  function SeleccionarIndicador(props) {
    var _this;

    _classCallCheck(this, SeleccionarIndicador);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SeleccionarIndicador).call(this, props));
    _this.irCrearRiesgos = _this.irCrearRiesgos.bind(_assertThisInitialized(_this));
    _this.calcularPesoDisponible = _this.calcularPesoDisponible.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SeleccionarIndicador, [{
    key: "irCrearRiesgos",
    value: function irCrearRiesgos() {
      this.props.updateBanderaCrearRiesgoTrue();
      this.props.showRiesgos();
    }
  }, {
    key: "calcularPesoDisponible",
    value: function calcularPesoDisponible(riesgo, indexRiesgo) {
      var pesoRiesgoTotal = 100;
      var pesoExistente = 0;

      for (var i = 0; i < this.props.indicadores[indexRiesgo].length; i++) {
        pesoExistente += this.props.indicadores[indexRiesgo][i].peso;
      }

      ;
      var pesoDisponible = pesoRiesgoTotal - pesoExistente;
      this.props.goCrearIndicador(riesgo.ID, riesgo.formula, pesoDisponible);
    }
  }, {
    key: "calcularPesoDisponibleEdit",
    value: function calcularPesoDisponibleEdit(riesgo, indexRiesgo, indexIndicador) {
      var pesoRiesgoTotal = 100;
      var pesoExistente = 0;
      var indicador = this.props.indicadores[indexRiesgo][indexIndicador];

      for (var i = 0; i < this.props.indicadores[indexRiesgo].length; i++) {
        pesoExistente += this.props.indicadores[indexRiesgo][i].peso;
      }

      ;
      var pesoDisponible = pesoRiesgoTotal - pesoExistente;
      this.props.goEditarIndicador(riesgo.ID, riesgo.formula, riesgo.pesoDisponible, indicador.ID, indicador.idFormula, indicador.nombre, indicador.codigo, indicador.formula, indicador.peso, indicador.tolerancia, indicador.tipoValorIdeal, indicador.valorIdeal, indicador.periodicidad, indicador.tipoIndicador, indicador.analista, indicador.fechaInicioCalculo, this.props.indicadores[indexRiesgo]);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Seleccionar Indicador"), _react["default"].createElement("div", {
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
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Seleccionar Indicador"))))))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, this.props.riesgos.map(function (riesgo, i) {
        return _react["default"].createElement("div", {
          key: riesgo.ID
        }, _react["default"].createElement(_Accordion["default"], {
          showTrash: false,
          showEdit: false,
          allowMultipleOpen: true,
          color: "#ffffff"
        }, _react["default"].createElement("div", {
          label: riesgo.nombre
        }, _this2.props.indicadores[i] != undefined ? _react["default"].createElement("div", null, _this2.props.indicadores[i].map(function (indicador, j) {
          return _react["default"].createElement("a", {
            className: "btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM",
            onClick: function onClick() {
              return _this2.calcularPesoDisponibleEdit(riesgo, i, j);
            },
            key: indicador.ID
          }, indicador.nombre);
        }), _react["default"].createElement("div", {
          className: "row",
          style: {
            display: _this2.props.permision.indicadores.indexOf("E") > -1 ? "" : "none"
          }
        }, _react["default"].createElement("a", {
          className: "btn btn-success btn-block btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: function onClick() {
            return _this2.calcularPesoDisponible(riesgo, i);
          }
        }, "Crear Indicador"))) : null)), _react["default"].createElement("br", null));
      }), this.props.riesgos.length == 0 ? _react["default"].createElement("a", {
        className: "btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM",
        onClick: this.irCrearRiesgos
      }, "No existen riesgos creados, presione para crear") : null)));
    }
  }]);

  return SeleccionarIndicador;
}(_react["default"].Component);

exports["default"] = SeleccionarIndicador;
//# sourceMappingURL=SeleccionarIndicador.js.map
