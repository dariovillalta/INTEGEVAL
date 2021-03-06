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

/*import EditarVariable from './EditarVariable.js';*/
var Dashboard =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Dashboard, _React$Component);

  function Dashboard(props) {
    var _this;

    _classCallCheck(this, Dashboard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dashboard).call(this, props));
    _this.state = {
      componenteActual: "selVariables"
      /*this.goCreateFilters = this.goCreateFilters.bind(this);
      this.returnChooseDates = this.returnChooseDates.bind(this);*/

    };
    return _this;
  }
  /*componentDidMount () {
      //
  }*/
  //PROCESO ES:

  /*1) SE SELECCIONA UNA VARIABLE
  2) SE APLICAN FILTROS
  3) REPETIR HASTA PRESIONAR VISUALIZAR*/


  _createClass(Dashboard, [{
    key: "getVariableDatos",
    value: function getVariableDatos() {//OBTENER LOS VALORES DE LAS VARIABLES CALCULADOS
      //EN EL RETORNO DEL RECORDSET CREAR METODO QUE ACEPTE EL ARREGLO, PARA LUEGO APLICAR LOS FILTROS
      //CREAR VARIABLE GLOBAL
    }
  }, {
    key: "getDashboard",
    value: function getDashboard() {//ESTE PARTE PUEDE OMMITIRSE CUANDO LA VISUALIZACION SE ESTA CREANDO, ES CUSTOMIZADA
    }
  }, {
    key: "getSeccionDashboard",
    value: function getSeccionDashboard() {} //TRAER CONFIGURACION NECESARIA PARA VISUALIZAR LA INFORMACION
    //TIPO DE GRAFICO
    //ARREGLO A VISUALIZAR
    //TAMAÑO
    //CREAR HTML
    //CREAR JS
    //CADA DASHBOARD ES UN SEGMENTO DE LA PAGINA, ESTA DIVIDIDO POR SECCIONES QUE REPRESENTAN EL ESPACIO PARA LA GRAFICA

  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null);
    }
  }]);

  return Dashboard;
}(_react["default"].Component);

exports["default"] = Dashboard;
//# sourceMappingURL=Dashboard.js.map
