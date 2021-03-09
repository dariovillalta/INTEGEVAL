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

var _MessageModal = _interopRequireDefault(require("./MessageModal.js"));

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
        showListas: false,
        //vista administrar listas
        showUsuarios: false,
        //vista administrar usuarios
        showBitacora: false,
        //vista para ver bitacoras
        showContenedorReporteria: false //vista para ver opciones de reporteria

      },
      showChooseMode: true,
      //vista para elegir entre modo control riesgos y monitoreo riesgos
      navbar: "",
      mensajeModal: {
        mostrarMensaje: false,
        esError: false,
        esConfirmar: false,
        titulo: "",
        mensaje: "",
        funcionRetornoConfirmacion: {}
      }
    };
    _this.showChooseMode = _this.showChooseMode.bind(_assertThisInitialized(_this));
    _this.finishChooseMode = _this.finishChooseMode.bind(_assertThisInitialized(_this));
    _this.switchProgramMode = _this.switchProgramMode.bind(_assertThisInitialized(_this));
    _this.showRiskControlHome = _this.showRiskControlHome.bind(_assertThisInitialized(_this));
    _this.showRiskMonitorHome = _this.showRiskMonitorHome.bind(_assertThisInitialized(_this));
    _this.showVariables = _this.showVariables.bind(_assertThisInitialized(_this));
    _this.showFormula = _this.showFormula.bind(_assertThisInitialized(_this));
    _this.showCondicionVar = _this.showCondicionVar.bind(_assertThisInitialized(_this));
    _this.showIndicador = _this.showIndicador.bind(_assertThisInitialized(_this));
    _this.showRiesgos = _this.showRiesgos.bind(_assertThisInitialized(_this));
    _this.showCalulo = _this.showCalulo.bind(_assertThisInitialized(_this));
    _this.showListas = _this.showListas.bind(_assertThisInitialized(_this));
    _this.showUsuarios = _this.showUsuarios.bind(_assertThisInitialized(_this));
    _this.showBitacora = _this.showBitacora.bind(_assertThisInitialized(_this));
    _this.showContenedorReporteria = _this.showContenedorReporteria.bind(_assertThisInitialized(_this));
    _this.dismissMessageModal = _this.dismissMessageModal.bind(_assertThisInitialized(_this));
    _this.showSuccesMessage = _this.showSuccesMessage.bind(_assertThisInitialized(_this));
    _this.showMessage = _this.showMessage.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Layout, [{
    key: "showChooseMode",
    value: function showChooseMode() {
      this.setState({
        showChooseMode: true,
        router: {
          showRiskControlHome: false,
          showRiskMonitorHome: false,
          showUmbralHome: false,
          showVariables: false,
          showFormula: false,
          showCondicionVar: false,
          showIndicador: false,
          showRiesgos: false,
          showCalulo: false,
          showListas: false,
          showUsuarios: false,
          showBitacora: false,
          showContenedorReporteria: false
        }
      });
    }
  }, {
    key: "finishChooseMode",
    value: function finishChooseMode() {
      this.setState({
        showChooseMode: false,
        router: {
          showRiskControlHome: false,
          showRiskMonitorHome: false,
          showUmbralHome: false,
          showVariables: false,
          showFormula: false,
          showCondicionVar: false,
          showIndicador: false,
          showRiesgos: false,
          showCalulo: false,
          showListas: false,
          showUsuarios: false,
          showBitacora: false,
          showContenedorReporteria: false
        }
      });
    }
  }, {
    key: "switchProgramMode",
    value: function switchProgramMode() {
      var navbar;

      if (this.state.router.showRiskMonitorHome) {
        if (this.props.permision.riesgoIntegral.indexOf("C") > -1) {
          navbar = _react["default"].createElement("ul", {
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
        } else {
          navbar = _react["default"].createElement("ul", {
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
          }, "Tratar Riesgos"))));
        }

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
            showListas: false,
            showUsuarios: false,
            showBitacora: false,
            showContenedorReporteria: false
          },
          navbar: navbar
        });
      } else {
        navbar = _react["default"].createElement("ul", {
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
          onClick: this.showContenedorReporteria,
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
        }, "Alertas"))));
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
            showListas: false,
            showUsuarios: false,
            showBitacora: false,
            showContenedorReporteria: false
          },
          navbar: navbar
        });
      }
    }
  }, {
    key: "showRiskControlHome",
    value: function showRiskControlHome() {
      var navbar;

      if (this.props.permision.riesgoIntegral.indexOf("C") > -1) {
        navbar = _react["default"].createElement("ul", {
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
      } else {
        navbar = _react["default"].createElement("ul", {
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
        }, "Tratar Riesgos"))));
      }

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
          showListas: false,
          showUsuarios: false,
          showBitacora: false,
          showContenedorReporteria: false
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
        onClick: this.showContenedorReporteria,
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
      }, "Alertas"))));

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
          showListas: false,
          showUsuarios: false,
          showBitacora: false,
          showContenedorReporteria: false
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
          showListas: false,
          showUsuarios: false,
          showBitacora: false,
          showContenedorReporteria: false
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
          showListas: false,
          showUsuarios: false,
          showBitacora: false,
          showContenedorReporteria: false
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
          showListas: false,
          showUsuarios: false,
          showBitacora: false,
          showContenedorReporteria: false
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
          showListas: false,
          showUsuarios: false,
          showBitacora: false,
          showContenedorReporteria: false
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
          showListas: false,
          showUsuarios: false,
          showBitacora: false,
          showContenedorReporteria: false
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
          showListas: false,
          showUsuarios: false,
          showBitacora: false,
          showContenedorReporteria: false
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
          showListas: true,
          showUsuarios: false,
          showBitacora: false,
          showContenedorReporteria: false
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
          showListas: false,
          showGraficos: false,
          showUsuarios: true,
          showBitacora: false,
          showContenedorReporteria: false
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
          showListas: false,
          showUsuarios: false,
          showBitacora: true,
          showContenedorReporteria: false
        },
        showChooseMode: false
      });
    }
  }, {
    key: "showContenedorReporteria",
    value: function showContenedorReporteria() {
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
          showListas: false,
          showUsuarios: false,
          showBitacora: false,
          showContenedorReporteria: true
        },
        showChooseMode: false
      });
    }
    /*======_______====== ======_______======   MENSAJES MODAL    ======_______====== ======_______======*/

    /*======_______======                                                             ======_______======*/

    /*======_______======                                                             ======_______======*/

    /*======_______====== ======_______====== ==_____==  ==___==  ======_______====== ======_______======*/

  }, {
    key: "dismissMessageModal",
    value: function dismissMessageModal() {
      this.setState({
        mensajeModal: {
          mostrarMensaje: false,
          esError: false,
          esConfirmar: false,
          titulo: "",
          mensaje: "",
          funcionRetornoConfirmacion: {}
        }
      });
    }
  }, {
    key: "showSuccesMessage",
    value: function showSuccesMessage(titulo, mensaje) {
      this.setState({
        mensajeModal: {
          mostrarMensaje: true,
          esError: false,
          esConfirmar: false,
          titulo: titulo,
          mensaje: mensaje,
          funcionRetornoConfirmacion: {}
        }
      });
      var self = this;
      setTimeout(function () {
        self.setState({
          mensajeModal: {
            mostrarMensaje: false,
            esError: false,
            esConfirmar: false,
            titulo: "",
            mensaje: "",
            funcionRetornoConfirmacion: {}
          }
        });
      }, 850);
    }
  }, {
    key: "showMessage",
    value: function showMessage(titulo, mensaje, esError, esConfirmar, funcionRetornoConfirmacion) {
      this.setState({
        mensajeModal: {
          mostrarMensaje: true,
          esError: esError,
          esConfirmar: esConfirmar,
          titulo: titulo,
          mensaje: mensaje,
          funcionRetornoConfirmacion: funcionRetornoConfirmacion
        }
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
          showConfigurationComponent: this.showConfigurationComponent,
          showListas: this.showListas,
          showUsuarios: this.showUsuarios,
          showBitacora: this.showBitacora,
          switchProgramMode: this.switchProgramMode,
          showRiskControlHome: this.state.router.showRiskControlHome
        }, " "), _react["default"].createElement(_LeftBar["default"], {
          navbar: this.state.navbar
        }, " "), _react["default"].createElement("div", {
          className: "dashboard-wrapper fade-in"
        }, _react["default"].createElement("div", {
          className: !this.state.router.showReporteria ? "dashboard-content" : "dashboard-content2"
        }, _react["default"].createElement(_Body["default"], {
          router: this.state.router,
          pool: this.props.pool,
          permision: this.props.permision,
          showUmbralHome: this.showUmbralHome,
          showVariables: this.showVariables,
          showFormula: this.showFormula,
          showCondicionVar: this.showCondicionVar,
          showIndicador: this.showIndicador,
          showRiskControlHome: this.showRiskControlHome,
          showRiesgos: this.showRiesgos,
          userID: this.props.userID,
          userName: this.props.userName,
          showSuccesMessage: this.showSuccesMessage,
          showMessage: this.showMessage
        }, " "))), this.state.mensajeModal.mostrarMensaje ? _react["default"].createElement(_MessageModal["default"], {
          esError: this.state.mensajeModal.esError,
          esConfirmar: this.state.mensajeModal.esConfirmar,
          dismissMessage: this.dismissMessageModal,
          confirmFunction: this.state.mensajeModal.funcionRetornoConfirmacion,
          titulo: this.state.mensajeModal.titulo,
          mensaje: this.state.mensajeModal.mensaje
        }, " ") : null);
      }
    }
  }]);

  return Layout;
}(_react["default"].Component);

exports["default"] = Layout;
//# sourceMappingURL=Layout.js.map
