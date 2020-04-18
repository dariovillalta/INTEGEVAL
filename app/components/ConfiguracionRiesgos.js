"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Umbral = _interopRequireDefault(require("./Umbral/Umbral.js"));

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

//faltan warning
//light
var ConfiguracionRiesgos =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ConfiguracionRiesgos, _React$Component);

  function ConfiguracionRiesgos(props) {
    var _this;

    _classCallCheck(this, ConfiguracionRiesgos);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConfiguracionRiesgos).call(this, props));
    _this.state = {
      componenteActual: "ConfiguracionRiesgos",
      navbar: ""
    };
    _this.showUmbralIntegral = _this.showUmbralIntegral.bind(_assertThisInitialized(_this));
    _this.retornarConfiguracionHome = _this.retornarConfiguracionHome.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ConfiguracionRiesgos, [{
    key: "showUmbralIntegral",
    value: function showUmbralIntegral() {
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
        onClick: this.retornarConfiguracionHome
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Configuraci\xF3n")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Umbral Institucional")))))));

      this.setState({
        navbar: navbar,
        componenteActual: "RiesgoIntegral"
      });
    }
  }, {
    key: "retornarConfiguracionHome",
    value: function retornarConfiguracionHome() {
      this.setState({
        componenteActual: "ConfiguracionRiesgos"
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.componenteActual.localeCompare("ConfiguracionRiesgos") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "page-header"
        }, _react["default"].createElement("h2", {
          className: "pageheader-title"
        }, "Identificar Riesgos"), _react["default"].createElement("div", {
          className: "page-breadcrumb"
        }, _react["default"].createElement("nav", {
          "aria-label": "breadcrumb"
        }, _react["default"].createElement("ol", {
          className: "breadcrumb"
        }, _react["default"].createElement("li", {
          className: "breadcrumb-item active font-16",
          "aria-current": "page"
        }, "Configuraci\xF3n"))))))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "card influencer-profile-data"
        }, _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "row border-top border-bottom addPaddingToConfig"
        }, _react["default"].createElement("a", {
          className: "btn btn-success btn-block btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: this.props.showVariables
        }, "Variables"), _react["default"].createElement("a", {
          className: "btn btn-primary btn-block btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: this.props.showIndicador
        }, "Indicadores"), _react["default"].createElement("a", {
          className: "btn btn-brand btn-block btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: this.props.showRiesgos
        }, "Tipos de Riesgos"), _react["default"].createElement("a", {
          className: "btn btn-info btn-block btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: this.showUmbralIntegral
        }, "Umbral del Riesgo Integral")))))));
      } else if (this.state.componenteActual.localeCompare("RiesgoIntegral") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_Umbral["default"], {
          navbar: this.state.navbar,
          idVariable: -99,
          pool: this.props.pool
        }, " "));
      }
    }
  }]);

  return ConfiguracionRiesgos;
}(_react["default"].Component);

exports["default"] = ConfiguracionRiesgos;
//# sourceMappingURL=ConfiguracionRiesgos.js.map
