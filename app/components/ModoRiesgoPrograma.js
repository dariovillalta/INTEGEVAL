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

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ModoRiesgoPrograma =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ModoRiesgoPrograma, _React$Component);

  function ModoRiesgoPrograma() {
    _classCallCheck(this, ModoRiesgoPrograma);

    return _possibleConstructorReturn(this, _getPrototypeOf(ModoRiesgoPrograma).apply(this, arguments));
  }

  _createClass(ModoRiesgoPrograma, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        style: {
          height: "100vh"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-center",
        style: {
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRight: "2px solid black"
        }
      }, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-primary btn-lg",
        onClick: this.props.showRiskControlHome
      }, _react["default"].createElement("span", {
        className: "row"
      }, _react["default"].createElement("img", {
        src: "./assets/MONITOR_BLANCO.png",
        alt: "",
        style: {
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          height: "80px",
          width: "auto"
        }
      })), _react["default"].createElement("span", {
        className: "font-bold font-24"
      }, "Configuraci\xF3n y ", _react["default"].createElement("br", null), " Evaluaci\xF3n de Riesgo Integral"))), _react["default"].createElement("div", {
        className: "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-center",
        style: {
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-primary btn-lg",
        onClick: this.props.showRiskMonitorHome
      }, _react["default"].createElement("span", {
        className: "row"
      }, _react["default"].createElement("img", {
        src: "./assets/IDENTIFICAR BLANCO.png",
        alt: "",
        style: {
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          height: "80px",
          width: "auto"
        }
      })), _react["default"].createElement("span", {
        className: "font-bold font-24"
      }, "Monitorear Riesgo Integral"))))));
    }
  }]);

  return ModoRiesgoPrograma;
}(_react["default"].Component);
/*<img src="../assets/MONITOR_BLANCO.png" alt="" style={{display: "block", marginLeft: "auto", marginRight: "auto", height: "80px", width: "auto"}}/>*/

/*<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-center" style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderTop: "2px solid black"}}>*/

/*<img src="../assets/IDENTIFICAR BLANCO.png" alt="" style={{display: "block", marginLeft: "auto", marginRight: "auto", height: "80px", width: "auto"}}/>*/


exports["default"] = ModoRiesgoPrograma;
//# sourceMappingURL=ModoRiesgoPrograma.js.map
