"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _VariableCreation = _interopRequireDefault(require("./Regla/VariableCreation.js"));

var _ContenedorReglas = _interopRequireDefault(require("./ContenedorReglas.js"));

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

//const campos = [{valor: "idCLiente"}, {valor: "saldoTotal"}, {valor: "tipoPersona"}, {valor: "impuestosTotal"}, {valor: "nombreCliente"}, {valor: "diasMora"}, {valor: "mesMora"}];
var variables = [];
var objetos = [];
var camposDeObjetos = [];
var formulaSeleccionada, posicionFormula;

var ContenedorFormulas =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ContenedorFormulas, _React$Component);

  function ContenedorFormulas(props) {
    var _this;

    _classCallCheck(this, ContenedorFormulas);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ContenedorFormulas).call(this, props));
    _this.state = {
      mostrarCrearCondicion: true,
      asignaciones: [],
      crearSelected: true,
      editarSelected: false,
      eliminarSelected: false
    };
    _this.actualizarSeleccionFormula = _this.actualizarSeleccionFormula.bind(_assertThisInitialized(_this));
    _this.verificarSeleccionFormula = _this.verificarSeleccionFormula.bind(_assertThisInitialized(_this));
    _this.handleMouseHoverAgregar = _this.handleMouseHoverAgregar.bind(_assertThisInitialized(_this));
    _this.handleMouseHoverModificar = _this.handleMouseHoverModificar.bind(_assertThisInitialized(_this));
    _this.handleMouseHoverEliminar = _this.handleMouseHoverEliminar.bind(_assertThisInitialized(_this));
    _this.handleMouseHoverExit = _this.handleMouseHoverExit.bind(_assertThisInitialized(_this));
    _this.verificarBotonSel = _this.verificarBotonSel.bind(_assertThisInitialized(_this));
    _this.goCrear = _this.goCrear.bind(_assertThisInitialized(_this));
    _this.goModificar = _this.goModificar.bind(_assertThisInitialized(_this));
    _this.goEliminar = _this.goEliminar.bind(_assertThisInitialized(_this));
    _this.verificarAccion = _this.verificarAccion.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ContenedorFormulas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.verificarBotonSel();
    }
  }, {
    key: "actualizarSeleccionFormula",
    value: function actualizarSeleccionFormula(asignacion, posicionFormulaN) {
      formulaSeleccionada = asignacion;
      posicionFormula = posicionFormulaN;
    }
  }, {
    key: "verificarSeleccionFormula",
    value: function verificarSeleccionFormula() {
      if (formulaSeleccionada != undefined && formulaSeleccionada != null) {
        this.props.callbackCrearRegla(true, formulaSeleccionada, posicionFormula);
      } else {
        alert("Seleccione por lo menos una formula");
      }
    }
  }, {
    key: "handleMouseHoverAgregar",
    value: function handleMouseHoverAgregar() {
      $("#crearButton").addClass("onHoverOpcionUmbralSinCambioHeight");
      $("#modificarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
      $("#eliminarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
    }
  }, {
    key: "handleMouseHoverModificar",
    value: function handleMouseHoverModificar() {
      $("#crearButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
      $("#modificarButton").addClass("onHoverOpcionUmbralSinCambioHeight");
      $("#eliminarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
    }
  }, {
    key: "handleMouseHoverEliminar",
    value: function handleMouseHoverEliminar() {
      $("#crearButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
      $("#modificarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
      $("#eliminarButton").addClass("onHoverOpcionUmbralSinCambioHeight");
    }
  }, {
    key: "handleMouseHoverExit",
    value: function handleMouseHoverExit() {
      $("#crearButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
      $("#modificarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
      $("#eliminarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
      this.verificarBotonSel();
    }
  }, {
    key: "verificarBotonSel",
    value: function verificarBotonSel() {
      if (this.state.crearSelected) {
        $("#crearButton").addClass("onHoverOpcionUmbralSinCambioHeight");
        $("#modificarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        $("#eliminarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
      } else if (this.state.editarSelected) {
        $("#crearButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        $("#modificarButton").addClass("onHoverOpcionUmbralSinCambioHeight");
        $("#eliminarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
      } else if (this.state.eliminarSelected) {
        $("#crearButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        $("#modificarButton").removeClass("onHoverOpcionUmbralSinCambioHeight");
        $("#eliminarButton").addClass("onHoverOpcionUmbralSinCambioHeight");
      }
    }
  }, {
    key: "goCrear",
    value: function goCrear() {
      this.setState({
        crearSelected: true,
        editarSelected: false,
        eliminarSelected: false
      });
    }
  }, {
    key: "goModificar",
    value: function goModificar() {
      this.setState({
        crearSelected: false,
        editarSelected: true,
        eliminarSelected: false
      });
    }
  }, {
    key: "goEliminar",
    value: function goEliminar() {
      this.setState({
        crearSelected: false,
        editarSelected: false,
        eliminarSelected: true
      });
    }
  }, {
    key: "verificarAccion",
    value: function verificarAccion() {
      if (this.state.crearSelected) this.verificarSeleccionFormula();else if (this.state.editarSelected) {
        if (formulaSeleccionada != undefined && formulaSeleccionada != null) {
          this.props.callbackModificarRegla(true, formulaSeleccionada, posicionFormula);
        } else {
          alert("Seleccione por lo menos una formula");
        }
      } else {
        this.props.callbackEliminarRegla(true);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement("div", {
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("h3", {
        className: "card-header"
      }, "Crear Asignaci\xF3n"), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "text-center"
      }, _react["default"].createElement("a", {
        className: "btn btn-success col-xs-10 col-10 btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: function onClick() {
          return _this2.props.goToCreateFormula(-1);
        }
      }, "Crear")), _react["default"].createElement("hr", null), _react["default"].createElement("h3", {
        className: "card-header"
      }, "Seleccionar Asignaci\xF3n"), _react["default"].createElement("br", null), _react["default"].createElement("div", null, this.props.asignaciones.map(function (asignacion, i) {
        return _react["default"].createElement("div", {
          key: i,
          style: {
            paddingLeft: "10px",
            paddingRight: "5px"
          }
        }, i != 0 ? _react["default"].createElement("br", null) : null, _react["default"].createElement("label", {
          className: "custom-control custom-radio"
        }, _react["default"].createElement("input", {
          type: "radio",
          name: "formulasRadio",
          className: "custom-control-input",
          onClick: function onClick() {
            return _this2.actualizarSeleccionFormula(asignacion, i);
          }
        }), _react["default"].createElement("span", {
          className: "custom-control-label"
        }, asignacion.formula)));
      }), this.props.asignaciones.length == 0 ? _react["default"].createElement("div", {
        className: "text-center"
      }, _react["default"].createElement("a", {
        style: {
          color: "#fafafa"
        },
        className: "btn btn-dark col-xs-10 col-10 btnWhiteColorHover font-bold font-20"
      }, "No existen asignaciones / f\xF3rmulas creadas")) : null), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2"
      }, _react["default"].createElement("div", {
        id: "crearButton",
        onMouseEnter: this.handleMouseHoverAgregar,
        onMouseLeave: this.handleMouseHoverExit,
        onClick: this.goCrear,
        className: "border text-center addPointer"
      }, "Agregar"), _react["default"].createElement("div", {
        id: "modificarButton",
        onMouseEnter: this.handleMouseHoverModificar,
        onMouseLeave: this.handleMouseHoverExit,
        onClick: this.goModificar,
        className: "border text-center addPointer"
      }, "Modificar"), _react["default"].createElement("div", {
        id: "eliminarButton",
        onMouseEnter: this.handleMouseHoverEliminar,
        onMouseLeave: this.handleMouseHoverExit,
        onClick: this.goEliminar,
        className: "border text-center addPointer"
      }, "Eliminar")), _react["default"].createElement("div", {
        className: "col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10",
        style: {
          display: this.state.crearSelected ? "" : "none"
        }
      }, _react["default"].createElement("div", {
        className: "text-center"
      }, _react["default"].createElement("a", {
        onClick: this.verificarAccion,
        className: "btn btn-primary col-xs-6 col-6",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold"
        }
      }, "Agregar Asignaci\xF3n"))), _react["default"].createElement("div", {
        className: "col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10",
        style: {
          display: this.state.editarSelected ? "" : "none"
        }
      }, _react["default"].createElement("div", {
        className: "text-center"
      }, _react["default"].createElement("a", {
        onClick: this.verificarAccion,
        className: "btn btn-primary col-xs-6 col-6",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold"
        }
      }, "Modificar Asignaci\xF3n"))), _react["default"].createElement("div", {
        className: "col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10",
        style: {
          display: this.state.eliminarSelected ? "" : "none"
        }
      }, _react["default"].createElement("div", {
        className: "text-center"
      }, _react["default"].createElement("a", {
        onClick: this.verificarAccion,
        className: "btn btn-primary col-xs-6 col-6",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold"
        }
      }, "Eliminar")))), _react["default"].createElement("br", null));
    }
  }]);

  return ContenedorFormulas;
}(_react["default"].Component);

exports["default"] = ContenedorFormulas;
//# sourceMappingURL=ContenedorFormulas.js.map
