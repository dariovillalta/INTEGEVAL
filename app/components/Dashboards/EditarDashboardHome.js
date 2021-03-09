"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _VerDashboard = _interopRequireDefault(require("./VerDashboard.js"));

var _EditarDashboard = _interopRequireDefault(require("./EditarDashboard.js"));

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

var EditarDashboardHome =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EditarDashboardHome, _React$Component);

  function EditarDashboardHome(props) {
    var _this;

    _classCallCheck(this, EditarDashboardHome);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditarDashboardHome).call(this, props));
    _this.state = {
      componenteActual: "verDashboard",
      navbar: _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Ver Dashboard"), _react["default"].createElement("div", {
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
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: _this.props.retornarSeleccionDashboards
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Dashboards")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Dashboard: ", _this.props.dashboardSeleccionado.nombre)))))))
    };
    _this.retornoVerDashboard = _this.retornoVerDashboard.bind(_assertThisInitialized(_this));
    _this.editarDashboard = _this.editarDashboard.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(EditarDashboardHome, [{
    key: "componentDidMount",
    value: function componentDidMount() {//
    }
  }, {
    key: "retornoVerDashboard",
    value: function retornoVerDashboard() {
      var navbar = _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Ver Dashboard"), _react["default"].createElement("div", {
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
        onClick: this.props.retornarSeleccionDashboards
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Dashboards")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Dashboard: ", this.props.dashboardSeleccionado.nombre)))))));

      this.setState({
        componenteActual: "verDashboard",
        navbar: navbar
      });
    }
  }, {
    key: "editarDashboard",
    value: function editarDashboard(idVariable) {
      var navbar = _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Editar Dashboard"), _react["default"].createElement("div", {
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
        onClick: this.props.retornarSeleccionDashboards
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Dashboards")), _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.retornoVerDashboard
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Dashboard: ", this.props.dashboardSeleccionado.nombre)), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Editar Dashboard")))))));

      this.setState({
        componenteActual: "editarDashboard",
        navbar: navbar
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.componenteActual.localeCompare("verDashboard") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_VerDashboard["default"], {
          pool: this.props.pool,
          navbar: this.state.navbar,
          variables: this.props.variables,
          indicadores: this.props.indicadores,
          riesgos: this.props.riesgos,
          dashboardSeleccionado: this.props.dashboardSeleccionado,
          retornarSeleccionDashboards: this.props.retornarSeleccionDashboards,
          editarDashboard: this.editarDashboard
        }));
      } else if (this.state.componenteActual.localeCompare("editarDashboard") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_EditarDashboard["default"], {
          pool: this.props.pool,
          navbar: this.state.navbar,
          variables: this.props.variables,
          indicadores: this.props.indicadores,
          riesgos: this.props.riesgos,
          retornoVerDashboard: this.retornoVerDashboard,
          dashboardSeleccionado: this.props.dashboardSeleccionado,
          retornarSeleccionDashboards: this.props.retornarSeleccionDashboards
        }));
      }
    }
  }]);

  return EditarDashboardHome;
}(_react["default"].Component);

exports["default"] = EditarDashboardHome;
//# sourceMappingURL=EditarDashboardHome.js.map
