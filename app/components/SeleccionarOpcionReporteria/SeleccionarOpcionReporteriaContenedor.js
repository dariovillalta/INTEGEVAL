"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _SeleccionarOpcionReporteria = _interopRequireDefault(require("./SeleccionarOpcionReporteria.js"));

var _DashboardHome = _interopRequireDefault(require("../Dashboards/DashboardHome.js"));

var _ReporteriaHome = _interopRequireDefault(require("../Reporteria/ReporteriaHome.js"));

var _GraficosHome = _interopRequireDefault(require("../Graficos/GraficosHome.js"));

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

var SeleccionarOpcionReporteriaContenedor =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SeleccionarOpcionReporteriaContenedor, _React$Component);

  function SeleccionarOpcionReporteriaContenedor() {
    var _this;

    _classCallCheck(this, SeleccionarOpcionReporteriaContenedor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SeleccionarOpcionReporteriaContenedor).call(this));
    _this.state = {
      showSeleccionReporteria: true,
      showDashboard: false,
      showReporteria: false,
      showGraficos: false
    };
    _this.goSeleccionReporteria = _this.goSeleccionReporteria.bind(_assertThisInitialized(_this));
    _this.goDashboard = _this.goDashboard.bind(_assertThisInitialized(_this));
    _this.goReporteria = _this.goReporteria.bind(_assertThisInitialized(_this));
    _this.goGraficos = _this.goGraficos.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SeleccionarOpcionReporteriaContenedor, [{
    key: "goSeleccionReporteria",
    value: function goSeleccionReporteria() {
      this.setState({
        showSeleccionReporteria: true,
        showDashboard: false,
        showReporteria: false,
        showGraficos: false
      });
    }
  }, {
    key: "goDashboard",
    value: function goDashboard() {
      this.setState({
        showSeleccionReporteria: false,
        showDashboard: true,
        showReporteria: false,
        showGraficos: false
      });
    }
  }, {
    key: "goReporteria",
    value: function goReporteria() {
      this.setState({
        showSeleccionReporteria: false,
        showDashboard: false,
        showReporteria: true,
        showGraficos: false
      });
    }
  }, {
    key: "goGraficos",
    value: function goGraficos() {
      this.setState({
        showSeleccionReporteria: false,
        showDashboard: false,
        showReporteria: false,
        showGraficos: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.showSeleccionReporteria) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_SeleccionarOpcionReporteria["default"], {
          goDashboard: this.goDashboard,
          goReporteria: this.goReporteria,
          goGraficos: this.goGraficos
        }));
      } else if (this.state.showDashboard) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_DashboardHome["default"], {
          pool: this.props.pool,
          goSeleccionReporteria: this.goSeleccionReporteria
        }));
      } else if (this.state.showReporteria) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%"
          }
        }, _react["default"].createElement(_ReporteriaHome["default"], {
          pool: this.props.pool,
          goSeleccionReporteria: this.goSeleccionReporteria
        }));
      } else if (this.state.showGraficos) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_GraficosHome["default"], {
          pool: this.props.pool,
          goSeleccionReporteria: this.goSeleccionReporteria
        }));
      }
    }
  }]);

  return SeleccionarOpcionReporteriaContenedor;
}(_react["default"].Component);

exports["default"] = SeleccionarOpcionReporteriaContenedor;
//# sourceMappingURL=SeleccionarOpcionReporteriaContenedor.js.map
