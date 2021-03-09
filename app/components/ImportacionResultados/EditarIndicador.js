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

var SeleccionarFechas =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SeleccionarFechas, _React$Component);

  function SeleccionarFechas(props) {
    var _this;

    _classCallCheck(this, SeleccionarFechas);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SeleccionarFechas).call(this, props));
    _this.guardarIndicador = _this.guardarIndicador.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SeleccionarFechas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $('#fechaInicial').datepicker({
        format: "dd-mm-yyyy",
        todayHighlight: true,
        viewMode: "days",
        minViewMode: "days",
        language: 'es'
      });
      $('#fechaFinal').datepicker({
        format: "dd-mm-yyyy",
        todayHighlight: true,
        viewMode: "days",
        minViewMode: "days",
        language: 'es'
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, this.props.navbar, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card influencer-profile-data"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        className: "border-top border-bottom addPaddingToConfig",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"
      }, _react["default"].createElement("div", {
        className: "row",
        style: "display: flex; justify-content: center;"
      }, _react["default"].createElement("div", {
        id: "fechaInicial",
        className: "center-block"
      }))), _react["default"].createElement("div", {
        className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"
      }, _react["default"].createElement("div", {
        className: "row",
        style: "display: flex; justify-content: center;"
      }, _react["default"].createElement("div", {
        id: "fechaFinal",
        className: "center-block"
      })))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("a", {
        className: "btn btn-primary btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: this.props.goCreateFilters
      }, "Importar Variables")), _react["default"].createElement("br", null)))))));
    }
  }]);

  return SeleccionarFechas;
}(_react["default"].Component);

exports["default"] = SeleccionarFechas;
//# sourceMappingURL=EditarIndicador.js.map
