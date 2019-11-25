"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _OpcionesVariableHome = _interopRequireDefault(require("./OpcionesVariableHome.js"));

var _FuenteDatosHome = _interopRequireDefault(require("./FuenteDatos/FuenteDatosHome.js"));

var _CrearVariable = _interopRequireDefault(require("./CrearVariable/CrearVariable.js"));

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

var ConfigVariablesContenedor =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ConfigVariablesContenedor, _React$Component);

  function ConfigVariablesContenedor() {
    var _this;

    _classCallCheck(this, ConfigVariablesContenedor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConfigVariablesContenedor).call(this));
    _this.state = {
      showFuentes: false,
      showVariables: false,
      showOptions: true
    };
    _this.goFuentes = _this.goFuentes.bind(_assertThisInitialized(_this));
    _this.goVariables = _this.goVariables.bind(_assertThisInitialized(_this));
    _this.goOptions = _this.goOptions.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ConfigVariablesContenedor, [{
    key: "goFuentes",
    value: function goFuentes() {
      this.setState({
        showFuentes: true,
        showVariables: false,
        showOptions: false
      });
    }
  }, {
    key: "goVariables",
    value: function goVariables() {
      this.setState({
        showFuentes: false,
        showVariables: true,
        showOptions: false
      });
    }
  }, {
    key: "goOptions",
    value: function goOptions() {
      this.setState({
        showFuentes: false,
        showVariables: false,
        showOptions: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.showFuentes) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_FuenteDatosHome["default"], {
          pool: this.props.pool,
          configuracionHome: this.props.configuracionHome
        }, " "));
      } else if (this.state.showVariables) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CrearVariable["default"], {
          pool: this.props.pool,
          updateNavBar: this.props.updateNavBar,
          showUmbralHome: this.props.showUmbralHome,
          showVariables: this.props.showVariables,
          configuracionHome: this.props.configuracionHome,
          showFormula: this.props.showFormula,
          showCondicionVar: this.props.showCondicionVar
        }, " "));
      } else {
        return _react["default"].createElement("div", null, _react["default"].createElement(_OpcionesVariableHome["default"], {
          configuracionHome: this.props.configuracionHome,
          goFuentes: this.goFuentes,
          goVariables: this.goVariables
        }, " "));
      }
    }
  }]);

  return ConfigVariablesContenedor;
}(_react["default"].Component);

exports["default"] = ConfigVariablesContenedor;
//# sourceMappingURL=ConfigVariablesContenedor.js.map
