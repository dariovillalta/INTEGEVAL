"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

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

var colores = ["secondary", "success", "primary", "brand"];

var SeleccionarRiesgo =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SeleccionarRiesgo, _React$Component);

  function SeleccionarRiesgo(props) {
    _classCallCheck(this, SeleccionarRiesgo);

    return _possibleConstructorReturn(this, _getPrototypeOf(SeleccionarRiesgo).call(this, props));
  }

  _createClass(SeleccionarRiesgo, [{
    key: "render",
    value: function render() {
      var _this = this;

      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Seleccionar Riesgo"), _react["default"].createElement("div", {
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
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Riesgos"))))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("a", {
        className: "btn btn-success btn-block btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: this.props.crearRiesgo
      }, "Crear Riesgo")), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, this.props.riesgos.map(function (riesgo, i) {
        return _react["default"].createElement("div", {
          key: riesgo.ID
        }, _react["default"].createElement("div", {
          className: "card"
        }, _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "row border-top border-bottom addPaddingToConfig"
        }, _react["default"].createElement("div", {
          style: {
            height: "20px",
            width: "100%"
          }
        }, " "), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 font-bold font-24"
        }, riesgo.nombre), _react["default"].createElement("div", {
          className: "col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2"
        }, _react["default"].createElement("a", {
          onClick: function onClick() {
            return _this.props.editarRiesgo(riesgo.ID, riesgo.idFormula, riesgo.nombre, riesgo.peso, riesgo.formula, riesgo.responsable);
          },
          className: "btn btn-success",
          style: {
            color: "white"
          }
        }, "Editar")), _react["default"].createElement("div", {
          className: "col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2"
        }, _react["default"].createElement("a", {
          onClick: function onClick() {
            return _this.props.deleteRiesgo(riesgo.ID);
          },
          className: "btn btn-danger",
          style: {
            color: "white"
          }
        }, "Borrar"))), _react["default"].createElement("div", {
          style: {
            height: "10px",
            width: "100%"
          }
        }, " "), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12",
          style: {
            padding: "0px",
            border: "1px solid #d2d2e4"
          }
        }, _react["default"].createElement("div", {
          style: {
            height: "30px",
            width: riesgo.peso + "%",
            background: "#81d4fa"
          }
        }))), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center"
        }, _react["default"].createElement("label", {
          className: "col-form-label"
        }, "Peso: ", riesgo.peso))), _react["default"].createElement("div", {
          style: {
            height: "20px",
            width: "100%"
          }
        }, " ")))), _react["default"].createElement("br", null));
      }), this.props.riesgos.length == 0 ? _react["default"].createElement("div", {
        className: "p-3 mb-2 bg-dark text-white font-bold font-20 text-center"
      }, "No existen riesgos creados") : null)));
    }
  }]);

  return SeleccionarRiesgo;
}(_react["default"].Component);

exports["default"] = SeleccionarRiesgo;
//# sourceMappingURL=SeleccionarRiesgo.js.map
