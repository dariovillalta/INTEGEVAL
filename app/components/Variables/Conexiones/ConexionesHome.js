"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ConfiguracionTablas = _interopRequireDefault(require("./ConfiguracionTablas.js"));

var _EditarTabla = _interopRequireDefault(require("./EditarTabla.js"));

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

var ConexionesHome =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ConexionesHome, _React$Component);

  function ConexionesHome(props) {
    var _this;

    _classCallCheck(this, ConexionesHome);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConexionesHome).call(this, props));
    _this.state = {
      idTablaSeleccionada: -1,
      nombreTablaSeleccionada: "",
      usuarioTablaSeleccionada: "",
      contrasenaTablaSeleccionada: "",
      servidorTablaSeleccionada: "",
      baseDatosTablaSeleccionada: "",
      tablaTablaSeleccionada: ""
    };
    _this.terminoSeleccionTabla = _this.terminoSeleccionTabla.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionTabla = _this.retornoSeleccionTabla.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ConexionesHome, [{
    key: "terminoSeleccionTabla",
    value: function terminoSeleccionTabla(id, nombre, usuario, contrasena, servidor, baseDatos, tabla) {
      this.setState({
        idTablaSeleccionada: id,
        nombreTablaSeleccionada: nombre,
        usuarioTablaSeleccionada: usuario,
        contrasenaTablaSeleccionada: contrasena,
        servidorTablaSeleccionada: servidor,
        baseDatosTablaSeleccionada: baseDatos,
        tablaTablaSeleccionada: tabla
      });
    }
  }, {
    key: "retornoSeleccionTabla",
    value: function retornoSeleccionTabla() {
      this.setState({
        idTablaSeleccionada: -1,
        nombreTablaSeleccionada: ""
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.idTablaSeleccionada == -1) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_ConfiguracionTablas["default"], {
          pool: this.props.pool,
          configuracionHome: this.props.configuracionHome,
          goOptions: this.props.goOptions,
          terminoSeleccionTabla: this.terminoSeleccionTabla
        }));
      } else {
        return _react["default"].createElement("div", null, _react["default"].createElement(_EditarTabla["default"], {
          pool: this.props.pool,
          retornoSeleccionTabla: this.retornoSeleccionTabla,
          configuracionHome: this.props.configuracionHome,
          goOptions: this.props.goOptions,
          idTablaSeleccionada: this.state.idTablaSeleccionada,
          nombreTablaSeleccionada: this.state.nombreTablaSeleccionada,
          usuarioTablaSeleccionada: this.state.usuarioTablaSeleccionada,
          contrasenaTablaSeleccionada: this.state.contrasenaTablaSeleccionada,
          servidorTablaSeleccionada: this.state.servidorTablaSeleccionada,
          baseDatosTablaSeleccionada: this.state.baseDatosTablaSeleccionada,
          tablaTablaSeleccionada: this.state.tablaTablaSeleccionada
        }));
      }
    }
  }]);

  return ConexionesHome;
}(_react["default"].Component);

exports["default"] = ConexionesHome;
//# sourceMappingURL=ConexionesHome.js.map
