"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ConfiguracionRiesgos = _interopRequireDefault(require("./ConfiguracionRiesgos.js"));

var _ConfigVariablesContenedor = _interopRequireDefault(require("./Variables/ConfigVariablesContenedor.js"));

var _Formula = _interopRequireDefault(require("./Formula.js"));

var _CondicionVariable = _interopRequireDefault(require("./CondicionVariable.js"));

var _IndicadorHome = _interopRequireDefault(require("./Indicadores/IndicadorHome.js"));

var _RiesgoHome = _interopRequireDefault(require("./Riesgos/RiesgoHome.js"));

var _Calculo = _interopRequireDefault(require("./Calculo.js"));

var _Dashboard = _interopRequireDefault(require("./Dashboard.js"));

var _ReporteriaHome = _interopRequireDefault(require("./Reporteria/ReporteriaHome.js"));

var _DashboardHome = _interopRequireDefault(require("./Dashboards/DashboardHome.js"));

var _CrearYSeleccionarLista = _interopRequireDefault(require("./CrearYSeleccionarLista.js"));

var _GraficosHome = _interopRequireDefault(require("./Graficos/GraficosHome.js"));

var _MantenimientoUsuarios = _interopRequireDefault(require("./Usuarios/MantenimientoUsuarios.js"));

var _Bitacora = _interopRequireDefault(require("./Bitacora/Bitacora.js"));

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

var Body =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Body, _React$Component);

  function Body(props) {
    var _this;

    _classCallCheck(this, Body);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Body).call(this, props));
    _this.state = {
      showLoadingScreen: false,
      mensajeLoadingScreen: '',
      navbar: '',
      idVarEditarFormula: -1,
      tablaVarEditarFormula: "",
      crearRiesgo: false
    };
    _this.showLoadingScreen = _this.showLoadingScreen.bind(_assertThisInitialized(_this));
    _this.hideLoadingScreen = _this.hideLoadingScreen.bind(_assertThisInitialized(_this));
    _this.updateNavBar = _this.updateNavBar.bind(_assertThisInitialized(_this));
    _this.updateFormula = _this.updateFormula.bind(_assertThisInitialized(_this));
    _this.updateBanderaCrearRiesgoTrue = _this.updateBanderaCrearRiesgoTrue.bind(_assertThisInitialized(_this));
    _this.updateBanderaCrearRiesgoFalse = _this.updateBanderaCrearRiesgoFalse.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Body, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateNavBar();
    }
  }, {
    key: "showLoadingScreen",
    value: function showLoadingScreen() {
      this.setState({
        showLoadingScreen: true
      });
    }
  }, {
    key: "hideLoadingScreen",
    value: function hideLoadingScreen() {
      this.setState({
        showLoadingScreen: false
      });
    }
  }, {
    key: "updateNavBar",
    value: function updateNavBar(navbar) {
      this.setState({
        navbar: navbar
      });
    }
  }, {
    key: "updateFormula",
    value: function updateFormula(idVarEditar, tablaVarEditar) {
      this.setState({
        idVarEditarFormula: idVarEditar,
        tablaVarEditarFormula: tablaVarEditar
      });
    }
  }, {
    key: "updateBanderaCrearRiesgoTrue",
    value: function updateBanderaCrearRiesgoTrue() {
      this.setState({
        crearRiesgo: true
      });
    }
  }, {
    key: "updateBanderaCrearRiesgoFalse",
    value: function updateBanderaCrearRiesgoFalse() {
      this.setState({
        crearRiesgo: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.router.showRiskControlHome) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_ConfiguracionRiesgos["default"], {
          showVariables: this.props.showVariables,
          showIndicador: this.props.showIndicador,
          showRiesgos: this.props.showRiesgos,
          pool: this.props.pool,
          showListas: this.props.showListas,
          showUsuarios: this.props.showUsuarios,
          showBitacora: this.props.showBitacora
        }, " "));
      } else if (this.props.router.showRiskMonitorHome) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_Dashboard["default"], {
          pool: this.props.pool
        }, " "));
      } else if (this.props.router.showVariables) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_ConfigVariablesContenedor["default"], {
          updateNavBar: this.updateNavBar,
          showVariables: this.props.showVariables,
          configuracionHome: this.props.showRiskControlHome,
          pool: this.props.pool,
          showFormula: this.props.showFormula,
          showCondicionVar: this.props.showCondicionVar,
          updateFormula: this.updateFormula
        }, " "));
      } else if (this.props.router.showFormula) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_Formula["default"], {
          configuracionHome: this.props.showRiskControlHome,
          pool: this.props.pool,
          showVariables: this.props.showVariables,
          idVarEditar: this.state.idVarEditarFormula,
          tablaVarEditar: this.state.tablaVarEditarFormula
        }, " "));
      } else if (this.props.router.showCondicionVar) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CondicionVariable["default"], {
          configuracionHome: this.props.showRiskControlHome,
          pool: this.props.pool
        }, " "));
      } else if (this.props.router.showIndicador) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_IndicadorHome["default"], {
          showIndicador: this.props.showIndicador,
          configuracionHome: this.props.showRiskControlHome,
          pool: this.props.pool,
          showFormula: this.props.showFormula,
          showCondicionVar: this.props.showCondicionVar,
          showRiesgos: this.props.showRiesgos,
          updateBanderaCrearRiesgoTrue: this.updateBanderaCrearRiesgoTrue
        }, " "));
      } else if (this.props.router.showRiesgos) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_RiesgoHome["default"], {
          updateNavBar: this.updateNavBar,
          showRiesgos: this.props.showRiesgos,
          configuracionHome: this.props.showRiskControlHome,
          pool: this.props.pool,
          showFormula: this.props.showFormula,
          showCondicionVar: this.props.showCondicionVar,
          crearRiesgo: this.state.crearRiesgo,
          updateFormula: this.updateFormula,
          updateBanderaCrearRiesgoFalse: this.updateBanderaCrearRiesgoFalse
        }, " "));
      } else if (this.props.router.showCalulo) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_Calculo["default"], {
          pool: this.props.pool
        }, " "));
      } else if (this.props.router.showReporteria) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%"
          }
        }, _react["default"].createElement(_ReporteriaHome["default"], {
          pool: this.props.pool
        }, " "));
      } else if (this.props.router.showDashboard) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_DashboardHome["default"], {
          pool: this.props.pool
        }, " "));
      } else if (this.props.router.showListas) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CrearYSeleccionarLista["default"], {
          pool: this.props.pool,
          configuracionHome: this.props.showRiskControlHome
        }, " "));
      } else if (this.props.router.showGraficos) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_GraficosHome["default"], {
          pool: this.props.pool
        }, " "));
      } else if (this.props.router.showUsuarios) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_MantenimientoUsuarios["default"], {
          pool: this.props.pool,
          configuracionHome: this.props.showRiskControlHome
        }, " "));
      } else if (this.props.router.showBitacora) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_Bitacora["default"], {
          pool: this.props.pool,
          configuracionHome: this.props.showRiskControlHome
        }, " "));
      } else {
        return _react["default"].createElement("div", null);
      }
    }
  }]);

  return Body;
}(_react["default"].Component);

exports["default"] = Body;
//# sourceMappingURL=Body.js.map
