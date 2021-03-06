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

var VistaUmbralSlider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VistaUmbralSlider, _React$Component);

  function VistaUmbralSlider(props) {
    var _this;

    _classCallCheck(this, VistaUmbralSlider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VistaUmbralSlider).call(this, props));
    /*this.state = {
        showLoadingScreen: false,
        mensajeLoadingScreen: ''
    }*/

    _this.mouseOver = _this.mouseOver.bind(_assertThisInitialized(_this));
    _this.mouseExit = _this.mouseExit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(VistaUmbralSlider, [{
    key: "mouseOver",
    value: function mouseOver(nombre) {
      $("." + nombre.replace(/ /g, '') + "Slider").addClass("highlightSeccionUmbralSlider");
      $("." + nombre.replace(/ /g, '') + "Texto").addClass("highlightSeccionUmbralTexto");
    }
  }, {
    key: "mouseExit",
    value: function mouseExit(nombre) {
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
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "slider",
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5%"
        }
      }, this.props.umbrales.map(function (umbral, i) {
        if (i == 0) {
          return _react["default"].createElement("div", {
            onMouseEnter: function onMouseEnter() {
              return _this2.mouseOver(umbral.nombre);
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.mouseExit(umbral.nombre);
            },
            className: "sliderInicio " + umbral.nombre.replace(/ /g, '') + "Slider",
            style: {
              width: umbral.width + "%",
              background: umbral.color
            },
            key: i
          }, _react["default"].createElement("span", {
            style: {
              "float": "left",
              marginLeft: "2%",
              color: "#000",
              textShadow: "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"
            }
          }, umbral.valorMinimo), _react["default"].createElement("span", {
            style: {
              "float": "right",
              marginRight: "2%",
              color: "#000",
              textShadow: "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"
            }
          }, umbral.valorMaximo));
        } else if (i != _this2.props.umbrales.length - 1) {
          return _react["default"].createElement("div", {
            onMouseEnter: function onMouseEnter() {
              return _this2.mouseOver(umbral.nombre);
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.mouseExit(umbral.nombre);
            },
            className: "sliderItemEnmedio " + umbral.nombre.replace(/ /g, '') + "Slider",
            style: {
              width: umbral.width + "%",
              background: umbral.color
            },
            key: i
          }, _react["default"].createElement("span", {
            style: {
              "float": "left",
              marginLeft: "2%",
              color: "#000",
              textShadow: "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"
            }
          }, umbral.valorMinimo), _react["default"].createElement("span", {
            style: {
              "float": "right",
              marginRight: "2%",
              color: "#000",
              textShadow: "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"
            }
          }, umbral.valorMaximo));
        } else {
          return _react["default"].createElement("div", {
            onMouseEnter: function onMouseEnter() {
              return _this2.mouseOver(umbral.nombre);
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.mouseExit(umbral.nombre);
            },
            className: "sliderFin " + umbral.nombre.replace(/ /g, '') + "Slider",
            style: {
              width: umbral.width + "%",
              background: umbral.color
            },
            key: i
          }, _react["default"].createElement("span", {
            style: {
              "float": "left",
              marginLeft: "2%",
              color: "#000",
              textShadow: "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"
            }
          }, umbral.valorMinimo), _react["default"].createElement("span", {
            style: {
              "float": "right",
              marginRight: "2%",
              color: "#000",
              textShadow: "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"
            }
          }, umbral.valorMaximo));
        }
      }), this.props.umbrales.length == 0 ? _react["default"].createElement("div", {
        className: "sliderVacio",
        style: {
          width: "100%"
        }
      }) : _react["default"].createElement("span", null))));
    }
  }]);

  return VistaUmbralSlider;
}(_react["default"].Component);

exports["default"] = VistaUmbralSlider;
//# sourceMappingURL=VistaUmbralSlider.js.map
