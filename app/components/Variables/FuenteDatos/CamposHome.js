"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _SeleccionarFuenteDatos = _interopRequireDefault(require("./SeleccionarFuenteDatos.js"));

var _CrearFuenteDatos = _interopRequireDefault(require("./CrearFuenteDatos.js"));

var _EditarFuenteDatos = _interopRequireDefault(require("./EditarFuenteDatos.js"));

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

var isMounted = false;

var FuenteDatosHome =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FuenteDatosHome, _React$Component);

  function FuenteDatosHome(props) {
    var _this;

    _classCallCheck(this, FuenteDatosHome);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FuenteDatosHome).call(this, props));
    _this.state = {
      componenteActual: "selFuenteDatos",
      idFuenteDatos: -1,
      nombreFuenteDatos: "",
      descripcionFuenteDatos: "",
      formulaFuenteDatos: "",
      esObjetoFuenteDatos: "",
      objetoPadreIDFuenteDatos: -1,
      nivelFuenteDatos: -1
    };
    _this.crearFuenteDatos = _this.crearFuenteDatos.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionFuenteDatosSameComponent = _this.retornoSeleccionFuenteDatosSameComponent.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionFuenteDatosDiffComponent = _this.retornoSeleccionFuenteDatosDiffComponent.bind(_assertThisInitialized(_this));
    _this.editarFuenteDatos = _this.editarFuenteDatos.bind(_assertThisInitialized(_this));
    _this.retornoEditarFuenteDatos = _this.retornoEditarFuenteDatos.bind(_assertThisInitialized(_this));
    _this.terminoCrearFuenteDatosPasarAEdit = _this.terminoCrearFuenteDatosPasarAEdit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FuenteDatosHome, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      isMounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      isMounted = false;
    }
  }, {
    key: "crearFuenteDatos",
    value: function crearFuenteDatos() {
      this.setState({
        componenteActual: "crearFuenteDatos"
      });
    }
  }, {
    key: "retornoSeleccionFuenteDatosSameComponent",
    value: function retornoSeleccionFuenteDatosSameComponent() {
      this.setState({
        componenteActual: "selFuenteDatos",
        idFuenteDatos: -1,
        nombreFuenteDatos: "",
        descripcionFuenteDatos: "",
        formulaFuenteDatos: "",
        esObjetoFuenteDatos: "",
        objetoPadreIDFuenteDatos: -1,
        nivelFuenteDatos: -1
      });
    }
  }, {
    key: "retornoSeleccionFuenteDatosDiffComponent",
    value: function retornoSeleccionFuenteDatosDiffComponent() {
      this.props.showRiesgos();
      var self = this;
      setTimeout(function () {
        self.setState({
          idRiesgoSeleccionado: -1,
          componenteActual: "selFuenteDatos"
        });
      }, 500);
    }
  }, {
    key: "editarFuenteDatos",
    value: function editarFuenteDatos(idFuenteDatos, nombreFuenteDatos, descripcionFuenteDatos, formulaFuenteDatos, esObjetoFuenteDatos, objetoPadreIDFuenteDatos, nivelFuenteDatos) {
      this.setState({
        idRiesgoSeleccionado: id,
        componenteActual: "editarFuenteDatos",
        nombreRiesgo: nombreRiesgo,
        pesoRiesgo: pesoRiesgo,
        toleranciaRiesgo: toleranciaRiesgo,
        valorIdealRiesgo: valorIdealRiesgo,
        padreRiesgo: padreRiesgo
      });
    }
  }, {
    key: "retornoEditarFuenteDatos",
    value: function retornoEditarFuenteDatos() {
      this.props.showRiesgos();
      var self = this;

      if (isMounted) {
        console.log("SI");
      } else {
        console.log("NO");
      }

      setTimeout(function () {
        if (isMounted) {
          console.log("SI");
        } else {
          console.log("NO");
        }

        console.log(self);
        self.setState({
          componenteActual: "editarFuenteDatos"
        });
      }, 3500);
    }
  }, {
    key: "terminoCrearFuenteDatosPasarAEdit",
    value: function terminoCrearFuenteDatosPasarAEdit(nombreFuenteDatos) {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Variables where nombre = '" + nombreFuenteDatos + "'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset != undefined) {
                if (result.recordset.length) {
                  _this2.editarFuenteDatos(result.recordset[0].ID, result.recordset[0].nombre, result.recordset[0].peso, result.recordset[0].tolerancia, result.recordset[0].valorIdeal, result.recordset[0].idRiesgoPadre);
                }
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.componenteActual.localeCompare("selFuenteDatos") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_SeleccionarFuenteDatos["default"], {
          configuracionHome: this.props.configuracionHome,
          crearFuenteDatos: this.crearFuenteDatos,
          editarFuenteDatos: this.editarFuenteDatos
        }, " "));
      } else if (this.state.componenteActual.localeCompare("crearFuenteDatos") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CrearFuenteDatos["default"], {
          pool: this.props.pool,
          showCondicionVar: this.props.showCondicionVar,
          terminoCrearRiesgo: this.terminoCrearFuenteDatosPasarAEdit,
          nombreTablaSeleccionada: this.props.nombreTablaSeleccionada
        }, " "));
      } else if (this.state.componenteActual.localeCompare("editarFuenteDatos") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_EditarFuenteDatos["default"], {
          pool: this.props.pool,
          showFormula: this.props.showFormula,
          showCondicionVar: this.props.showCondicionVar,
          showRiesgos: this.props.showRiesgos,
          retornoSeleccionRiesgo: this.retornoSeleccionRiesgoSameComponent,
          retornoSeleccionRiesgoUmbral: this.retornoSeleccionRiesgoDiffComponent,
          configuracionHome: this.props.configuracionHome,
          updateNavBar: this.props.updateNavBar,
          showUmbralHome: this.props.showUmbralHome,
          riesgos: [],
          nombreRiesgo: this.state.nombreRiesgo,
          pesoRiesgo: this.state.pesoRiesgo,
          toleranciaRiesgo: this.state.toleranciaRiesgo,
          valorIdealRiesgo: this.state.valorIdealRiesgo,
          padreRiesgo: this.state.padreRiesgo,
          updateFormula: this.props.updateFormula
        }, " "));
      }
    }
  }]);

  return FuenteDatosHome;
}(_react["default"].Component);

exports["default"] = FuenteDatosHome;
//# sourceMappingURL=CamposHome.js.map
