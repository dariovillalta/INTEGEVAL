"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _NavBar = _interopRequireDefault(require("./NavBar.js"));

var _LeftBar = _interopRequireDefault(require("./LeftBar.js"));

var _Body = _interopRequireDefault(require("./Body.js"));

var _ModoRiesgoPrograma = _interopRequireDefault(require("./ModoRiesgoPrograma.js"));

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

var Layout =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Layout, _React$Component);

  function Layout() {
    var _this;

    _classCallCheck(this, Layout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Layout).call(this));
    _this.state = {
      router: {
        showRiskControlHome: false,
        //vista casa de controlar riesgo
        showRiskMonitorHome: false,
        //vista casa de monitoreo riesgo
        showVariables: false,
        //vista de casa de crear variables
        showFormula: false,
        //vista para crear formula fuente de datos de variable
        showCondicionVar: false,
        //vista para crear condiiones de variable
        showIndicador: false,
        //vista home para el mantenimiento de indicadores
        showRiesgos: false,
        //vista home para el mantenimiento de riesgos
        showCalulo: false,
        //vista para iniciar el calculo de las variables
        showReporteria: false,
        //vista home para hacer reporteria
        showDashboard: false,
        //vista home para hacer dashboards
        showListas: false,
        //vista administrar listas
        showGraficos: false,
        //vista administrar graficos
        showUsuarios: false,
        //vista administrar usuarios
        showBitacora: false //vista para ver bitacoras

      },
      showChooseMode: true,
      //vista para elegir entre modo control riesgos y monitoreo riesgos
      navbar: ""
    };
    _this.showChooseMode = _this.showChooseMode.bind(_assertThisInitialized(_this));
    _this.finishChooseMode = _this.finishChooseMode.bind(_assertThisInitialized(_this));
    _this.showRiskControlHome = _this.showRiskControlHome.bind(_assertThisInitialized(_this));
    _this.showRiskMonitorHome = _this.showRiskMonitorHome.bind(_assertThisInitialized(_this));
    _this.showVariables = _this.showVariables.bind(_assertThisInitialized(_this));
    _this.showFormula = _this.showFormula.bind(_assertThisInitialized(_this));
    _this.showCondicionVar = _this.showCondicionVar.bind(_assertThisInitialized(_this));
    _this.showIndicador = _this.showIndicador.bind(_assertThisInitialized(_this));
    _this.showRiesgos = _this.showRiesgos.bind(_assertThisInitialized(_this));
    _this.showCalulo = _this.showCalulo.bind(_assertThisInitialized(_this));
    _this.showReporteria = _this.showReporteria.bind(_assertThisInitialized(_this));
    _this.showDashboard = _this.showDashboard.bind(_assertThisInitialized(_this));
    _this.showListas = _this.showListas.bind(_assertThisInitialized(_this));
    _this.showGraficos = _this.showGraficos.bind(_assertThisInitialized(_this));
    _this.showUsuarios = _this.showUsuarios.bind(_assertThisInitialized(_this));
    _this.showBitacora = _this.showBitacora.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Layout, [{
    key: "showChooseMode",
    value: function showChooseMode() {
      this.setState({
        showChooseMode: true
      });
    }
  }, {
    key: "finishChooseMode",
    value: function finishChooseMode() {
      this.setState({
        showChooseMode: false
      });
    }
  }, {
    key: "showRiskControlHome",
    value: function showRiskControlHome() {
      var navbar = _react["default"].createElement("ul", {
        className: "navbar-nav flex-column"
      }, _react["default"].createElement("li", {
        className: "nav-divider"
      }, _react["default"].createElement("h3", {
        style: {
          color: "#b0bec5"
        }
      }, "Menu")), _react["default"].createElement("li", {
        className: "nav-item "
      }, _react["default"].createElement("a", {
        className: "nav-link",
        onClick: this.showRiskControlHome,
        href: "#"
      }, _react["default"].createElement("i", {
        className: "fa fa-fw fa-user-circle"
      }), _react["default"].createElement("h3", {
        style: {
          color: "white"
        }
      }, "Identificar Riesgos"))), _react["default"].createElement("li", {
        className: "nav-item "
      }, _react["default"].createElement("a", {
        className: "nav-link"
        /*onClick={this.showGraphics}*/
        ,
        href: "#"
      }, _react["default"].createElement("i", {
        className: "fa fa-fw fa-user-circle"
      }), _react["default"].createElement("h3", {
        style: {
          color: "white"
        }
      }, "Tratar Riesgos"))), _react["default"].createElement("li", {
        className: "nav-item "
      }, _react["default"].createElement("a", {
        className: "nav-link",
        onClick: this.showCalulo,
        href: "#"
      }, _react["default"].createElement("i", {
        className: "fa fa-fw fa-user-circle"
      }), _react["default"].createElement("h3", {
        style: {
          color: "white"
        }
      }, "C\xE1lculo"))));

      this.setState({
        router: {
          showRiskControlHome: true,
          showRiskMonitorHome: false,
          showUmbralHome: false,
          showVariables: false,
          showFormula: false,
          showCondicionVar: false,
          showIndicador: false,
          showRiesgos: false,
          showCalulo: false,
          showReporteria: false,
          showDashboard: false,
          showListas: false,
          showGraficos: false,
          showUsuarios: false,
          showBitacora: false
        },
        showChooseMode: false,
        navbar: navbar
      });
    }
  }, {
    key: "showRiskMonitorHome",
    value: function showRiskMonitorHome() {
      var navbar = _react["default"].createElement("ul", {
        className: "navbar-nav flex-column"
      }, _react["default"].createElement("li", {
        className: "nav-divider"
      }, _react["default"].createElement("h3", {
        style: {
          color: "#b0bec5"
        }
      }, "Menu")), _react["default"].createElement("li", {
        className: "nav-item "
      }, _react["default"].createElement("a", {
        className: "nav-link",
        onClick: this.showDashboard,
        href: "#"
      }, _react["default"].createElement("i", {
        className: "fa fa-fw fa-user-circle"
      }), _react["default"].createElement("h3", {
        style: {
          color: "white"
        }
      }, "Dashboard"))), _react["default"].createElement("li", {
        className: "nav-item "
      }, _react["default"].createElement("a", {
        className: "nav-link"
        /*onClick={this.showCalulo}*/
        ,
        href: "#"
      }, _react["default"].createElement("i", {
        className: "fa fa-fw fa-user-circle"
      }), _react["default"].createElement("h3", {
        style: {
          color: "white"
        }
      }, "Alertas"))), _react["default"].createElement("li", {
        className: "nav-item "
      }, _react["default"].createElement("a", {
        className: "nav-link",
        onClick: this.showReporteria,
        href: "#"
      }, _react["default"].createElement("i", {
        className: "fa fa-fw fa-user-circle"
      }), _react["default"].createElement("h3", {
        style: {
          color: "white"
        }
      }, "Reporter\xEDa"))), _react["default"].createElement("li", {
        className: "nav-item "
      }, _react["default"].createElement("a", {
        className: "nav-link",
        onClick: this.showGraficos,
        href: "#"
      }, _react["default"].createElement("i", {
        className: "fa fa-fw fa-user-circle"
      }), _react["default"].createElement("h3", {
        style: {
          color: "white"
        }
      }, "Gr\xE1ficos"))));

      this.setState({
        router: {
          showRiskControlHome: false,
          showRiskMonitorHome: true,
          showVariables: false,
          showFormula: false,
          showCondicionVar: false,
          showIndicador: false,
          showRiesgos: false,
          showCalulo: false,
          showReporteria: false,
          showDashboard: false,
          showListas: false,
          showGraficos: false,
          showUsuarios: false,
          showBitacora: false
        },
        showChooseMode: false,
        navbar: navbar
      });
    }
  }, {
    key: "showVariables",
    value: function showVariables() {
      this.setState({
        router: {
          showRiskControlHome: false,
          showRiskMonitorHome: false,
          showVariables: true,
          showFormula: false,
          showCondicionVar: false,
          showIndicador: false,
          showRiesgos: false,
          showCalulo: false,
          showReporteria: false,
          showDashboard: false,
          showListas: false,
          showGraficos: false,
          showUsuarios: false,
          showBitacora: false
        },
        showChooseMode: false
      });
    }
  }, {
    key: "showFormula",
    value: function showFormula() {
      this.setState({
        router: {
          showRiskControlHome: false,
          showRiskMonitorHome: false,
          showVariables: false,
          showFormula: true,
          showCondicionVar: false,
          showIndicador: false,
          showRiesgos: false,
          showCalulo: false,
          showReporteria: false,
          showDashboard: false,
          showListas: false,
          showGraficos: false,
          showUsuarios: false,
          showBitacora: false
        },
        showChooseMode: false
      });
    }
  }, {
    key: "showCondicionVar",
    value: function showCondicionVar() {
      this.setState({
        router: {
          showRiskControlHome: false,
          showRiskMonitorHome: false,
          showVariables: false,
          showFormula: false,
          showCondicionVar: true,
          showIndicador: false,
          showRiesgos: false,
          showCalulo: false,
          showReporteria: false,
          showDashboard: false,
          showListas: false,
          showGraficos: false,
          showUsuarios: false,
          showBitacora: false
        },
        showChooseMode: false
      });
    }
  }, {
    key: "showIndicador",
    value: function showIndicador() {
      this.setState({
        router: {
          showRiskControlHome: false,
          showRiskMonitorHome: false,
          showVariables: false,
          showFormula: false,
          showCondicionVar: false,
          showIndicador: true,
          showRiesgos: false,
          showCalulo: false,
          showReporteria: false,
          showDashboard: false,
          showListas: false,
          showGraficos: false,
          showUsuarios: false,
          showBitacora: false
        },
        showChooseMode: false
      });
    }
  }, {
    key: "showRiesgos",
    value: function showRiesgos() {
      this.setState({
        router: {
          showRiskControlHome: false,
          showRiskMonitorHome: false,
          showVariables: false,
          showFormula: false,
          showCondicionVar: false,
          showIndicador: false,
          showRiesgos: true,
          showCalulo: false,
          showReporteria: false,
          showDashboard: false,
          showListas: false,
          showUsuarios: false,
          showBitacora: false
        },
        showChooseMode: false
      });
    }
  }, {
    key: "showCalulo",
    value: function showCalulo() {
      this.setState({
        router: {
          showRiskControlHome: false,
          showRiskMonitorHome: false,
          showVariables: false,
          showFormula: false,
          showCondicionVar: false,
          showIndicador: false,
          showRiesgos: false,
          showCalulo: true,
          showReporteria: false,
          showDashboard: false,
          showListas: false,
          showGraficos: false,
          showUsuarios: false,
          showBitacora: false
        },
        showChooseMode: false
      });
    }
  }, {
    key: "showReporteria",
    value: function showReporteria() {
      this.setState({
        router: {
          showRiskControlHome: false,
          showRiskMonitorHome: false,
          showVariables: false,
          showFormula: false,
          showCondicionVar: false,
          showIndicador: false,
          showRiesgos: false,
          showCalulo: false,
          showReporteria: true,
          showDashboard: false,
          showListas: false,
          showGraficos: false,
          showUsuarios: false,
          showBitacora: false
        },
        showChooseMode: false
      });
    }
  }, {
    key: "showDashboard",
    value: function showDashboard() {
      this.setState({
        router: {
          showRiskControlHome: false,
          showRiskMonitorHome: false,
          showVariables: false,
          showFormula: false,
          showCondicionVar: false,
          showIndicador: false,
          showRiesgos: false,
          showCalulo: false,
          showReporteria: false,
          showDashboard: true,
          showListas: false,
          showGraficos: false,
          showUsuarios: false,
          showBitacora: false
        },
        showChooseMode: false
      });
    }
  }, {
    key: "showListas",
    value: function showListas() {
      this.setState({
        router: {
          showRiskControlHome: false,
          showRiskMonitorHome: false,
          showVariables: false,
          showFormula: false,
          showCondicionVar: false,
          showIndicador: false,
          showRiesgos: false,
          showCalulo: false,
          showReporteria: false,
          showDashboard: false,
          showListas: true,
          showGraficos: false,
          showUsuarios: false,
          showBitacora: false
        },
        showChooseMode: false
      });
    }
  }, {
    key: "showGraficos",
    value: function showGraficos() {
      this.setState({
        router: {
          showRiskControlHome: false,
          showRiskMonitorHome: false,
          showVariables: false,
          showFormula: false,
          showCondicionVar: false,
          showIndicador: false,
          showRiesgos: false,
          showCalulo: false,
          showReporteria: false,
          showDashboard: false,
          showListas: false,
          showGraficos: true,
          showUsuarios: false,
          showBitacora: false
        },
        showChooseMode: false
      });
    }
  }, {
    key: "showUsuarios",
    value: function showUsuarios() {
      this.setState({
        router: {
          showRiskControlHome: false,
          showRiskMonitorHome: false,
          showVariables: false,
          showFormula: false,
          showCondicionVar: false,
          showIndicador: false,
          showRiesgos: false,
          showCalulo: false,
          showReporteria: false,
          showDashboard: false,
          showListas: false,
          showGraficos: false,
          showUsuarios: true,
          showBitacora: false
        },
        showChooseMode: false
      });
    }
  }, {
    key: "showBitacora",
    value: function showBitacora() {
      this.setState({
        router: {
          showRiskControlHome: false,
          showRiskMonitorHome: false,
          showVariables: false,
          showFormula: false,
          showCondicionVar: false,
          showIndicador: false,
          showRiesgos: false,
          showCalulo: false,
          showReporteria: false,
          showDashboard: false,
          showListas: false,
          showGraficos: false,
          showUsuarios: false,
          showBitacora: true
        },
        showChooseMode: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.showChooseMode) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_ModoRiesgoPrograma["default"], {
          showRiskControlHome: this.showRiskControlHome,
          showRiskMonitorHome: this.showRiskMonitorHome
        }, " "));
      } else {
        return _react["default"].createElement("div", {
          className: "dashboard-main-wrapper"
        }, _react["default"].createElement(_NavBar["default"], {
          logOff: this.props.logOff,
          userName: this.props.userName,
          permision: this.props.permision,
          showConfigurationComponent: this.showConfigurationComponent
        }, " "), _react["default"].createElement(_LeftBar["default"], {
          navbar: this.state.navbar
        }, " "), _react["default"].createElement("div", {
          className: "dashboard-wrapper"
        }, _react["default"].createElement("div", {
          className: !this.state.router.showReporteria ? "dashboard-content" : "dashboard-content2"
        }, _react["default"].createElement(_Body["default"], {
          router: this.state.router,
          pool: this.props.pool,
          showUmbralHome: this.showUmbralHome,
          showVariables: this.showVariables,
          showFormula: this.showFormula,
          showCondicionVar: this.showCondicionVar,
          showIndicador: this.showIndicador,
          showRiskControlHome: this.showRiskControlHome,
          showRiesgos: this.showRiesgos,
          showListas: this.showListas,
          showUsuarios: this.showUsuarios,
          showBitacora: this.showBitacora
        }, " "))));
      }
    }
  }]);

  return Layout;
}(_react["default"].Component);

exports["default"] = Layout;
//# sourceMappingURL=Layout.js.map
