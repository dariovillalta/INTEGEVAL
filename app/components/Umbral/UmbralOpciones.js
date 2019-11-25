"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _CrearUmbral = _interopRequireDefault(require("./CrearUmbral.js"));

var _EditarUmbral = _interopRequireDefault(require("./EditarUmbral.js"));

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

var UmbralOpciones =
/*#__PURE__*/
function (_React$Component) {
  _inherits(UmbralOpciones, _React$Component);

  function UmbralOpciones(props) {
    var _this;

    _classCallCheck(this, UmbralOpciones);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UmbralOpciones).call(this, props));
    _this.state = {
      mostrarCrearUmbral: true,
      crearUmbralSelected: false,
      editarUmbralSelected: false
    };
    _this.handleMouseHoverCrear = _this.handleMouseHoverCrear.bind(_assertThisInitialized(_this));
    _this.handleMouseHoverEditar = _this.handleMouseHoverEditar.bind(_assertThisInitialized(_this));
    _this.handleMouseHoverExit = _this.handleMouseHoverExit.bind(_assertThisInitialized(_this));
    _this.goCrearUmbral = _this.goCrearUmbral.bind(_assertThisInitialized(_this));
    _this.goEditarUmbral = _this.goEditarUmbral.bind(_assertThisInitialized(_this));
    _this.verificarBotonSel = _this.verificarBotonSel.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(UmbralOpciones, [{
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
      if (this.state.crearUmbralSelected) {
        $("#crearButton").addClass("onHoverOpcionUmbral");
        $("#editarButton").removeClass("onHoverOpcionUmbral");
      } else if (this.state.editarUmbralSelected) {
        $("#editarButton").addClass("onHoverOpcionUmbral");
        $("#crearButton").removeClass("onHoverOpcionUmbral");
      }
    }
  }, {
    key: "goCrearUmbral",
    value: function goCrearUmbral() {
      this.setState({
        mostrarCrearUmbral: true,
        crearUmbralSelected: true,
        editarUmbralSelected: false
      });
    }
  }, {
    key: "goEditarUmbral",
    value: function goEditarUmbral() {
      this.setState({
        mostrarCrearUmbral: false,
        crearUmbralSelected: false,
        editarUmbralSelected: true
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
        className: "card influencer-profile-data"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "2em",
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        onMouseEnter: this.handleMouseHoverCrear,
        onMouseLeave: this.handleMouseHoverExit,
        onClick: this.goCrearUmbral,
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
      }, "CREAR"), _react["default"].createElement("div", {
        onMouseEnter: this.handleMouseHoverEditar,
        onMouseLeave: this.handleMouseHoverExit,
        onClick: this.goEditarUmbral,
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
      }, "EDITAR")), _react["default"].createElement("br", null), this.state.mostrarCrearUmbral ? _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement(_CrearUmbral["default"], null))) : _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement(_EditarUmbral["default"], null))))))));
    }
  }]);

  return UmbralOpciones;
}(_react["default"].Component);

exports["default"] = UmbralOpciones;
//# sourceMappingURL=UmbralOpciones.js.map
