"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _ImportacionResultadosHome = _interopRequireDefault(require("../ImportacionResultados/ImportacionResultadosHome.js"));

var _Reporteria = _interopRequireDefault(require("./Reporteria.js"));

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

var ReporteriaHome =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReporteriaHome, _React$Component);

  function ReporteriaHome(props) {
    var _this;

    _classCallCheck(this, ReporteriaHome);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReporteriaHome).call(this, props));
    _this.state = {
      componenteActual: "importarResultados",
      variables: [],
      indicadores: [],
      riesgos: []
    };
    _this.returnImportResults = _this.returnImportResults.bind(_assertThisInitialized(_this));
    _this.retornoVariables = _this.retornoVariables.bind(_assertThisInitialized(_this));
    return _this;
  }
  /*componentDidMount () {
      //
  }*/


  _createClass(ReporteriaHome, [{
    key: "returnImportResults",
    value: function returnImportResults() {
      this.setState({
        componenteActual: "importarResultados"
      });
    }
  }, {
    key: "retornoVariables",
    value: function retornoVariables(variables, indicadores, riesgos) {
      console.log('variables');
      console.log(variables);
      console.log('indicadores');
      console.log(indicadores);
      console.log('riesgos');
      console.log(riesgos);
      this.setState({
        variables: variables,
        indicadores: indicadores,
        riesgos: riesgos,
        componenteActual: "visualizarReporteria"
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.componenteActual.localeCompare("importarResultados") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_ImportacionResultadosHome["default"], {
          pool: this.props.pool,
          navbarFechas: this.state.navbarFechas,
          goCreateFilters: this.props.goCreateFilters,
          retornoVariables: this.retornoVariables
        }));
      } else if (this.state.componenteActual.localeCompare("visualizarReporteria") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_Reporteria["default"], {
          pool: this.props.pool,
          variables: this.state.variables,
          indicadores: this.state.indicadores,
          riesgos: this.state.riesgos,
          returnImportResults: this.returnImportResults
        }));
      }
    }
  }]);

  return ReporteriaHome;
}(_react["default"].Component);

exports["default"] = ReporteriaHome;
//# sourceMappingURL=ReporteriaHome.js.map
