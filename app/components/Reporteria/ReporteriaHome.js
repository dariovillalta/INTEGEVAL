"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _SeleccionarFechas = _interopRequireDefault(require("../ImportacionResultados/SeleccionarFechas.js"));

var _Filtro = _interopRequireDefault(require("../ImportacionResultados/Filtro.js"));

var _Reporteria = _interopRequireDefault(require("./Reporteria.js"));

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

var ReporteriaHome =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReporteriaHome, _React$Component);

  function ReporteriaHome(props) {
    var _this;

    _classCallCheck(this, ReporteriaHome);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReporteriaHome).call(this, props));
    _this.state = {
      componenteActual: "selFechas",
      fechaInicial: null,
      fechaFinal: null,
      variables: [],
      indicadores: [],
      riesgos: [],
      navbar: _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Seleccionar Fechas de Vigencia de Variables"), _react["default"].createElement("div", {
        className: "page-breadcrumb"
      }, _react["default"].createElement("nav", {
        "aria-label": "breadcrumb"
      }, _react["default"].createElement("ol", {
        className: "breadcrumb"
      }, _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: _this.props.goSeleccionReporteria
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Seleccionar Tipo de Reporter\xEDa")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Seleccionar Fechas")))))))
    };
    _this.goCreateFilters = _this.goCreateFilters.bind(_assertThisInitialized(_this));
    _this.returnChooseDates = _this.returnChooseDates.bind(_assertThisInitialized(_this));
    _this.returnChooseFilter = _this.returnChooseFilter.bind(_assertThisInitialized(_this));
    _this.retornoVariables = _this.retornoVariables.bind(_assertThisInitialized(_this));
    return _this;
  }
  /*componentDidMount () {
      //
  }*/


  _createClass(ReporteriaHome, [{
    key: "goCreateFilters",
    value: function goCreateFilters(fechaInicial, fechaFinal) {
      var navbar = _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Seleccionar Fechas de Vigencia de Variables"), _react["default"].createElement("div", {
        className: "page-breadcrumb"
      }, _react["default"].createElement("nav", {
        "aria-label": "breadcrumb"
      }, _react["default"].createElement("ol", {
        className: "breadcrumb"
      }, _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.goSeleccionReporteria
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Seleccionar Tipo de Reporter\xEDa")), _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.returnChooseDates
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Seleccionar Fechas")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Crear Filtros")))))));

      if (fechaInicial == null && fechaFinal == null) {
        this.setState({
          componenteActual: "crearFiltros",
          navbar: navbar
        });
      } else if (fechaInicial == null && fechaFinal != null) {
        this.setState({
          componenteActual: "crearFiltros",
          fechaFinal: fechaFinal,
          navbar: navbar
        });
      } else if (fechaInicial != null && fechaFinal == null) {
        this.setState({
          componenteActual: "crearFiltros",
          fechaInicial: fechaInicial,
          navbar: navbar
        });
      } else if (fechaInicial != null && fechaFinal != null) {
        this.setState({
          componenteActual: "crearFiltros",
          fechaInicial: fechaInicial,
          fechaFinal: fechaFinal,
          navbar: navbar
        });
      }
    }
  }, {
    key: "returnChooseDates",
    value: function returnChooseDates() {
      var navbar = _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Seleccionar Fechas de Vigencia de Variables"), _react["default"].createElement("div", {
        className: "page-breadcrumb"
      }, _react["default"].createElement("nav", {
        "aria-label": "breadcrumb"
      }, _react["default"].createElement("ol", {
        className: "breadcrumb"
      }, _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.goSeleccionReporteria
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Seleccionar Tipo de Reporter\xEDa")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Seleccionar Fechas")))))));

      this.setState({
        componenteActual: "selFechas",
        navbar: navbar
      });
    }
  }, {
    key: "returnChooseFilter",
    value: function returnChooseFilter() {
      var navbar = _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Seleccionar Fechas de Vigencia de Variables"), _react["default"].createElement("div", {
        className: "page-breadcrumb"
      }, _react["default"].createElement("nav", {
        "aria-label": "breadcrumb"
      }, _react["default"].createElement("ol", {
        className: "breadcrumb"
      }, _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.goSeleccionReporteria
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Seleccionar Tipo de Reporter\xEDa")), _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.returnChooseDates
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Seleccionar Fechas")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Seleccionar Fechas")))))));

      this.setState({
        componenteActual: "crearFiltros",
        navbar: navbar
      });
    }
  }, {
    key: "retornoVariables",
    value: function retornoVariables(variables, indicadores, riesgos) {
      this.setState({
        variables: variables,
        indicadores: indicadores,
        riesgos: riesgos,
        componenteActual: "visualizarReporteria"
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.componenteActual.localeCompare("selFechas") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_SeleccionarFechas["default"], {
          navbar: this.state.navbar,
          goCreateFilters: this.goCreateFilters
        }));
      } else if (this.state.componenteActual.localeCompare("crearFiltros") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_Filtro["default"], {
          pool: this.props.pool,
          navbar: this.state.navbar,
          fechaInicial: this.state.fechaInicial,
          fechaFinal: this.state.fechaFinal,
          retornoVariables: this.retornoVariables,
          returnChooseDates: this.returnChooseDates
        }));
      } else if (this.state.componenteActual.localeCompare("visualizarReporteria") == 0) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%"
          }
        }, _react["default"].createElement(_Reporteria["default"], {
          pool: this.props.pool,
          variables: this.state.variables,
          indicadores: this.state.indicadores,
          riesgos: this.state.riesgos,
          returnChooseDates: this.returnChooseDates,
          returnChooseFilter: this.returnChooseFilter,
          goSeleccionReporteria: this.props.goSeleccionReporteria
        }));
      }
    }
  }]);

  return ReporteriaHome;
}(_react["default"].Component);

exports["default"] = ReporteriaHome;
//# sourceMappingURL=ReporteriaHome.js.map
