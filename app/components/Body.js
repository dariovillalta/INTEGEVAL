"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ConfiguracionRiesgos = _interopRequireDefault(require("./ConfiguracionRiesgos.js"));

var _Umbral = _interopRequireDefault(require("./Umbral/Umbral.js"));

var _ConfigVariablesContenedor = _interopRequireDefault(require("./Variables/ConfigVariablesContenedor.js"));

var _Formula = _interopRequireDefault(require("./Formula.js"));

var _CondicionVariable = _interopRequireDefault(require("./CondicionVariable.js"));

var _IndicadorHome = _interopRequireDefault(require("./Indicadores/IndicadorHome.js"));

var _RiesgoHome = _interopRequireDefault(require("./Riesgos/RiesgoHome.js"));

var _Calculo = _interopRequireDefault(require("./Calculo.js"));

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
      tablaVarEditarFormula: ""
    };
    _this.showLoadingScreen = _this.showLoadingScreen.bind(_assertThisInitialized(_this));
    _this.hideLoadingScreen = _this.hideLoadingScreen.bind(_assertThisInitialized(_this));
    _this.updateNavBar = _this.updateNavBar.bind(_assertThisInitialized(_this));
    _this.updateFormula = _this.updateFormula.bind(_assertThisInitialized(_this));
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
    key: "render",
    value: function render() {
      if (this.props.router.showRiskControlHome) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_ConfiguracionRiesgos["default"], {
          showUmbralHome: this.props.showUmbralHome,
          showVariables: this.props.showVariables,
          showIndicador: this.props.showIndicador,
          showRiesgos: this.props.showRiesgos,
          pool: this.props.pool
        }, " "));
      } else if (this.props.router.showRiskMonitorHome) {
        return _react["default"].createElement("div", null, _react["default"].createElement(ConeccionTablas, {
          configuracionHome: this.props.showRiskControlHome,
          pool: this.props.pool
        }, " "));
      } else if (this.props.router.showUmbralHome) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_Umbral["default"], {
          navbar: this.state.navbar,
          pool: this.props.pool
        }, " "));
      } else if (this.props.router.showVariables) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_ConfigVariablesContenedor["default"], {
          updateNavBar: this.updateNavBar,
          showUmbralHome: this.props.showUmbralHome,
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
          showRiesgos: this.props.showRiesgos
        }, " "));
      } else if (this.props.router.showRiesgos) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_RiesgoHome["default"], {
          updateNavBar: this.updateNavBar,
          showUmbralHome: this.props.showUmbralHome,
          showRiesgos: this.props.showRiesgos,
          configuracionHome: this.props.showRiskControlHome,
          pool: this.props.pool,
          showFormula: this.props.showFormula,
          showCondicionVar: this.props.showCondicionVar,
          updateFormula: this.updateFormula
        }, " "));
      } else if (this.props.router.showCalulo) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_Calculo["default"], {
          pool: this.props.pool
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
