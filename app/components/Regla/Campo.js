"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ListasSeleVariable = _interopRequireDefault(require("../ListasSeleVariable.js"));

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

var Campo =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Campo, _React$Component);

  function Campo(props) {
    var _this;

    _classCallCheck(this, Campo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Campo).call(this, props));
    _this.checkFieldType = _this.checkFieldType.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Campo, [{
    key: "checkFieldType",
    value: function checkFieldType(campo) {
      if (campo[0].tipo.indexOf("int") == 0 || campo[0].tipo.indexOf("decimal") == 0) {
        this.props.esNumero();
      } else if (campo[0].tipo.indexOf("bit") == 0) {
        this.props.esBoolean();
      } else if (campo[0].tipo.indexOf("date") == 0) {
        this.props.esFecha();
      } else if (campo[0].tipo.indexOf("varchar") == 0) {
        this.props.esTexto();
      }

      this.props.retornoSeleccionVariable(campo);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "150px",
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "border-bottom",
        style: {
          height: "100%",
          width: "100%",
          padding: "0% 1%"
        }
      }, _react["default"].createElement("div", {
        className: "font-18",
        style: {
          width: "100%",
          height: "20%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, "Seleccionar Campo"), _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "80%",
          width: "100%"
        }
      }, _react["default"].createElement(_ListasSeleVariable["default"], {
        mostrarRosa: true,
        variables: this.props.campos,
        seleccionarMultiple: false,
        retornoSeleccion: this.checkFieldType,
        titulo: "Campos De Tabla"
      })), this.props.calculoVariables ? _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "100%"
        }
      }, this.props.variables.map(function (variable, i) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "100%"
          },
          key: variable.ID
        }, _this2.props.camposVariables[i] != undefined ? _react["default"].createElement("div", {
          className: "row",
          style: {
            height: "100%",
            width: "100%"
          }
        }, _react["default"].createElement(_ListasSeleVariable["default"], {
          mostrarRosa: true,
          variables: _this2.props.camposVariables[i],
          seleccionarMultiple: false,
          retornoSeleccion: _this2.retornoSeleccionVariable,
          titulo: variable.nombre
        })) : null);
      })) : null, _react["default"].createElement("br", null)));
    }
  }]);

  return Campo;
}(_react["default"].Component);

exports["default"] = Campo;
//# sourceMappingURL=Campo.js.map
