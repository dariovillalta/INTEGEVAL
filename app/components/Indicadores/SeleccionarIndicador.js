"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Accordion = _interopRequireDefault(require("../Accordion/Accordion.js"));

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

var riesgos = [{
  ID: 1,
  nombre: "LAFT"
}, {
  ID: 2,
  nombre: "Operativo"
}, {
  ID: 3,
  nombre: "Tecnologico"
}];
var indicadores = [[{
  ID: 1,
  nombre: "Clientes"
}, {
  ID: 2,
  nombre: "Prestamos"
}], [{
  ID: 3,
  nombre: "Empleados"
}], [{
  ID: 4,
  nombre: "Red"
}, {
  ID: 5,
  nombre: "Data Center"
}]];

var SeleccionarIndicador =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SeleccionarIndicador, _React$Component);

  function SeleccionarIndicador() {
    _classCallCheck(this, SeleccionarIndicador);

    return _possibleConstructorReturn(this, _getPrototypeOf(SeleccionarIndicador).apply(this, arguments));
  }

  _createClass(SeleccionarIndicador, [{
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
      }, "Configuraci\xF3n"), _react["default"].createElement("div", {
        className: "page-breadcrumb"
      }, _react["default"].createElement("nav", {
        "aria-label": "breadcrumb"
      }, _react["default"].createElement("ol", {
        className: "breadcrumb"
      }, _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Configuraci\xF3n"))))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("a", {
        className: "btn btn-success btn-block btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: this.props.goCrearIndicador
      }, "Crear Indicador")), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, riesgos.map(function (riesgo, i) {
        return _react["default"].createElement("div", {
          key: riesgo.ID
        }, _react["default"].createElement(_Accordion["default"], {
          showTrash: false,
          showEdit: false,
          allowMultipleOpen: true,
          color: "#ffffff"
        }, _react["default"].createElement("div", {
          label: riesgo.nombre
        }, indicadores[i] != undefined ? _react["default"].createElement("div", null, indicadores[i].map(function (indicador, j) {
          return _react["default"].createElement("a", {
            className: "btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM",
            key: indicador.ID
          }, indicador.nombre);
        }), indicadores[i].length == 0 ? _react["default"].createElement("a", {
          className: "btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"
        }, "No existen indicadores creados, presiona para crear") : _react["default"].createElement("span", null)) : _react["default"].createElement("span", null))), _react["default"].createElement("br", null));
      }))));
    }
  }]);

  return SeleccionarIndicador;
}(_react["default"].Component);

exports["default"] = SeleccionarIndicador;
//# sourceMappingURL=SeleccionarIndicador.js.map
