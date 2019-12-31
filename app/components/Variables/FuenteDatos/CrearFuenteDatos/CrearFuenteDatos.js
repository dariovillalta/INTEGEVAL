"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _FuenteDatoVariable = _interopRequireDefault(require("./FuenteDatoVariable.js"));

var _FuenteDatoForma = _interopRequireDefault(require("./FuenteDatoForma.js"));

var _FuenteDatoExcel = _interopRequireDefault(require("./FuenteDatoExcel.js"));

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

var CrearFuenteDatos =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CrearFuenteDatos, _React$Component);

  function CrearFuenteDatos(props) {
    var _this;

    _classCallCheck(this, CrearFuenteDatos);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CrearFuenteDatos).call(this, props));
    _this.state = {
      mostrarFuenteDatoVariable: false,
      mostrarFuenteDatoForma: false,
      mostrarFuenteDatoExcel: true
    };
    _this.mostrarFuenteDatoVariable = _this.mostrarFuenteDatoVariable.bind(_assertThisInitialized(_this));
    _this.mostrarFuenteDatoForma = _this.mostrarFuenteDatoForma.bind(_assertThisInitialized(_this));
    _this.mostrarFuenteDatoExcel = _this.mostrarFuenteDatoExcel.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CrearFuenteDatos, [{
    key: "mostrarFuenteDatoVariable",
    value: function mostrarFuenteDatoVariable() {
      this.setState({
        mostrarFuenteDatoVariable: true,
        mostrarFuenteDatoForma: false,
        mostrarFuenteDatoExcel: false
      });
    }
  }, {
    key: "mostrarFuenteDatoForma",
    value: function mostrarFuenteDatoForma() {
      this.setState({
        mostrarFuenteDatoVariable: false,
        mostrarFuenteDatoForma: true,
        mostrarFuenteDatoExcel: false
      });
    }
  }, {
    key: "mostrarFuenteDatoExcel",
    value: function mostrarFuenteDatoExcel() {
      this.setState({
        mostrarFuenteDatoVariable: false,
        mostrarFuenteDatoForma: false,
        mostrarFuenteDatoExcel: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Crear Fuente de Datos"), _react["default"].createElement("div", {
        className: "page-breadcrumb"
      }, _react["default"].createElement("nav", {
        "aria-label": "breadcrumb"
      }, _react["default"].createElement("ol", {
        className: "breadcrumb"
      }, _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.configuracionHome
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Configuraci\xF3n")), _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.goOptions
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Tipo de Variable")), _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.retornoSeleccionTabla
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Tablas")), _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.retornoSeleccionFuenteDatos
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Fuentes de Datos")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Crear Fuente de Datos"))))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("div", {
        className: "border-top",
        style: {
          width: "100%"
        }
      }, this.state.mostrarFuenteDatoVariable ? _react["default"].createElement(_FuenteDatoVariable["default"], {
        campos: this.props.columnas,
        goToCreateConditions: this.props.goToCreateConditions
      }) : null, this.state.mostrarFuenteDatoForma ? _react["default"].createElement(_FuenteDatoForma["default"], null) : null, this.state.mostrarFuenteDatoExcel ? _react["default"].createElement(_FuenteDatoExcel["default"], null) : null), _react["default"].createElement("div", {
        className: "border-bottom",
        style: {
          width: "100%",
          height: "30px",
          overflowX: "scroll"
        }
      }, _react["default"].createElement("div", {
        onClick: this.mostrarFuenteDatoExcel,
        className: "border-right addPointer",
        style: {
          width: "33%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "float": "left",
          backgroundColor: !this.state.mostrarFuenteDatoExcel ? "#f5f5f5" : ""
        }
      }, "Excel"), _react["default"].createElement("div", {
        onClick: this.mostrarFuenteDatoForma,
        className: "border-right addPointer",
        style: {
          width: "33%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "float": "left",
          backgroundColor: !this.state.mostrarFuenteDatoForma ? "#f5f5f5" : ""
        }
      }, "Forma"), _react["default"].createElement("div", {
        onClick: this.mostrarFuenteDatoVariable,
        className: "addPointer",
        style: {
          width: "34%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "float": "left",
          backgroundColor: !this.state.mostrarFuenteDatoVariable ? "#f5f5f5" : ""
        }
      }, "Variable"))))));
    }
  }]);

  return CrearFuenteDatos;
}(_react["default"].Component);

exports["default"] = CrearFuenteDatos;
//# sourceMappingURL=CrearFuenteDatos.js.map
