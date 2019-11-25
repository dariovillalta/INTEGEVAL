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

var VistaUmbralTexto =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VistaUmbralTexto, _React$Component);

  function VistaUmbralTexto(props) {
    var _this;

    _classCallCheck(this, VistaUmbralTexto);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VistaUmbralTexto).call(this, props));
    /*this.state = {
        showLoadingScreen: false,
        mensajeLoadingScreen: ''
    }
    this.showLoadingScreen = this.showLoadingScreen.bind(this);*/

    _this.mouseOver = _this.mouseOver.bind(_assertThisInitialized(_this));
    _this.mouseExit = _this.mouseExit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(VistaUmbralTexto, [{
    key: "mouseOver",
    value: function mouseOver(nombre) {
      console.log("EMTRE");
      console.log(nombre);
      $("." + nombre.replace(/ /g, '') + "Slider").addClass("highlightSeccionUmbralSlider");
      $("." + nombre.replace(/ /g, '') + "Texto").addClass("highlightSeccionUmbralTexto");
    }
  }, {
    key: "mouseExit",
    value: function mouseExit(nombre) {
      console.log("ADIOS");
      console.log(nombre);
      $("." + nombre.replace(/ /g, '') + "Slider").removeClass("highlightSeccionUmbralSlider");
      $("." + nombre.replace(/ /g, '') + "Texto").removeClass("highlightSeccionUmbralTexto");
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement("div", {
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("br", null), _react["default"].createElement("br", null), this.props.umbrales.map(function (umbral, i) {
        return _react["default"].createElement("div", {
          onMouseEnter: function onMouseEnter() {
            return _this2.mouseOver(umbral.nombre);
          },
          onMouseLeave: function onMouseLeave() {
            return _this2.mouseExit(umbral.nombre);
          },
          className: "row " + umbral.nombre.replace(/ /g, '') + "Texto",
          style: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          },
          key: i
        }, _react["default"].createElement("div", {
          style: {
            height: "1em",
            width: "1em",
            backgroundColor: umbral.color,
            marginRight: "3%"
          }
        }), _react["default"].createElement("div", null, " ", umbral.nombre, " "));
      }), this.props.umbrales.length == 0 ? _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("div", {
        style: {
          height: "1em",
          width: "1em",
          backgroundColor: "#9e9e9e",
          marginRight: "3%"
        }
      }), _react["default"].createElement("div", null, " No existe secci\xF3n para este umbral. ")) : _react["default"].createElement("span", null));
    }
  }]);

  return VistaUmbralTexto;
}(_react["default"].Component);

exports["default"] = VistaUmbralTexto;
//# sourceMappingURL=VistaUmbralTexto.js.map
