"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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

var campos = [{
  nombre: "idCLiente"
}, {
  nombre: "saldoTotal"
}, {
  nombre: "tipoPersona"
}, {
  nombre: "impuestosTotal"
}, {
  nombre: "nombreCliente"
}, {
  nombre: "diasMora"
}, {
  nombre: "mesMora"
}];
var variables = [{
  nombre: "sucursalesTotales"
}, {
  nombre: "numSocios"
}, {
  nombre: "utilidad"
}, {
  nombre: "patrimonio"
}];

var CrearVariableOpciones =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CrearVariableOpciones, _React$Component);

  function CrearVariableOpciones(props) {
    var _this;

    _classCallCheck(this, CrearVariableOpciones);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CrearVariableOpciones).call(this, props));
    _this.state = {
      mostrarCrearEscalar: true,
      variableEscalar: false,
      variableObjeto: false,
      campos: []
    };
    _this.handleMouseHoverCrear = _this.handleMouseHoverCrear.bind(_assertThisInitialized(_this));
    _this.handleMouseHoverEditar = _this.handleMouseHoverEditar.bind(_assertThisInitialized(_this));
    _this.handleMouseHoverExit = _this.handleMouseHoverExit.bind(_assertThisInitialized(_this));
    _this.goCrearVariableEscalar = _this.goCrearVariableEscalar.bind(_assertThisInitialized(_this));
    _this.goCrearVariableObjeto = _this.goCrearVariableObjeto.bind(_assertThisInitialized(_this));
    _this.verificarBotonSel = _this.verificarBotonSel.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CrearVariableOpciones, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.esObjetoVariable) {
        this.setState({
          mostrarCrearEscalar: false,
          variableEscalar: false,
          variableObjeto: true
        });
      } else {
        this.setState({
          mostrarCrearEscalar: true,
          variableEscalar: true,
          variableObjeto: false
        });
      }
    }
  }, {
    key: "handleMouseHoverCrear",
    value: function handleMouseHoverCrear() {
      $("#crearButton").addClass("onHoverOpcionUmbral");
      $("#editarButton").removeClass("onHoverOpcionUmbral");
    }
  }, {
    key: "handleMouseHoverEditar",
    value: function handleMouseHoverEditar() {
      $("#editarButton").addClass("onHoverOpcionUmbral");
      $("#crearButton").removeClass("onHoverOpcionUmbral");
    }
  }, {
    key: "handleMouseHoverExit",
    value: function handleMouseHoverExit() {
      $("#crearButton").removeClass("onHoverOpcionUmbral");
      $("#editarButton").removeClass("onHoverOpcionUmbral");
      this.verificarBotonSel();
    }
  }, {
    key: "verificarBotonSel",
    value: function verificarBotonSel() {
      if (this.state.variableEscalar) {
        $("#crearButton").addClass("onHoverOpcionUmbral");
        $("#editarButton").removeClass("onHoverOpcionUmbral");
      } else if (this.state.variableObjeto) {
        $("#editarButton").addClass("onHoverOpcionUmbral");
        $("#crearButton").removeClass("onHoverOpcionUmbral");
      }
    }
  }, {
    key: "goCrearVariableEscalar",
    value: function goCrearVariableEscalar() {
      this.setState({
        mostrarCrearEscalar: true,
        variableEscalar: true,
        variableObjeto: false
      });
    }
  }, {
    key: "goCrearVariableObjeto",
    value: function goCrearVariableObjeto() {
      this.setState({
        mostrarCrearEscalar: false,
        variableEscalar: false,
        variableObjeto: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement("div", {
        style: {
          width: "100%",
          padding: "2%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "2em",
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        onMouseEnter: this.handleMouseHoverCrear,
        onMouseLeave: this.handleMouseHoverExit,
        onClick: this.goCrearVariableEscalar,
        id: "crearButton",
        className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6",
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRight: "1px solid #e6e6f2",
          borderBottom: "1px solid #e6e6f2"
        }
      }, "Valor \xDAnico"), _react["default"].createElement("div", {
        onMouseEnter: this.handleMouseHoverEditar,
        onMouseLeave: this.handleMouseHoverExit,
        onClick: this.goCrearVariableObjeto,
        id: "editarButton",
        className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6",
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #e6e6f2"
        }
      }, "Varios Atributos")), _react["default"].createElement("br", null), this.state.mostrarCrearEscalar ? _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("a", {
        className: "btn btn-secondary btn-block btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: this.props.showFormula
      }, "F\xF3rmula"), _react["default"].createElement("a", {
        className: "btn btn-success btn-block btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: this.props.showCondicionVar
      }, "Condiciones para el C\xE1lculo"))) : _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"
      }, _react["default"].createElement("label", {
        htmlFor: "nombreAtributo",
        className: "col-form-label"
      }, "Nombre de Atributo:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"
      }, _react["default"].createElement("input", {
        id: "nombreAtributo",
        type: "text",
        className: "form-control form-control-sm"
      })))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("a", {
        className: "btn btn-primary btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: this.crearAtributoDeObjeto
      }, "Crear")), _react["default"].createElement("hr", null), this.props.campos.map(function (campo, i) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%"
          },
          key: campo.ID
        }, _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"
        }, _react["default"].createElement("label", {
          htmlFor: "inputSmall",
          className: "col-form-label",
          defaultValue: campo.nombre
        }, "Nombre de Atributo:")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"
        }, _react["default"].createElement("input", {
          id: "inputSmall",
          type: "text",
          className: "form-control form-control-sm"
        }))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "row",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("a", {
          className: "btn btn-primary btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: _this2.crearAtributoDeObjeto
        }, "Guardar")), _react["default"].createElement("a", {
          className: "btn btn-secondary btn-block btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: _this2.props.showFormula
        }, "(F\xF3rmula|Valores) de Asignaci\xF3n"), _react["default"].createElement("a", {
          className: "btn btn-success btn-block btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: _this2.props.showCondicionVar
        }, "(Condiciones|Instrucciones) para el C\xE1lculo"), _react["default"].createElement("hr", null));
      }))));
    }
  }]);

  return CrearVariableOpciones;
}(_react["default"].Component);

exports["default"] = CrearVariableOpciones;
//# sourceMappingURL=CrearVariableOpciones.js.map
