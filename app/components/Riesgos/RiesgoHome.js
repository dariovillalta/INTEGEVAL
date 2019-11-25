"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _SeleccionarRiesgo = _interopRequireDefault(require("./SeleccionarRiesgo.js"));

var _CrearRiesgo = _interopRequireDefault(require("./CrearRiesgo.js"));

var _EditarRiesgo = _interopRequireDefault(require("./EditarRiesgo.js"));

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

var RiesgoHome =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RiesgoHome, _React$Component);

  function RiesgoHome(props) {
    var _this;

    _classCallCheck(this, RiesgoHome);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RiesgoHome).call(this, props));
    _this.state = {
      idRiesgoSeleccionado: -1,
      componenteActual: "selRiesgo"
    };
    _this.crearRiesgo = _this.crearRiesgo.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionRiesgoSameComponent = _this.retornoSeleccionRiesgoSameComponent.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionRiesgoDiffComponent = _this.retornoSeleccionRiesgoDiffComponent.bind(_assertThisInitialized(_this));
    _this.editarRiesgo = _this.editarRiesgo.bind(_assertThisInitialized(_this));
    _this.retornoEditarRiesgo = _this.retornoEditarRiesgo.bind(_assertThisInitialized(_this));
    _this.terminoCrearRiesgoPasarAEdit = _this.terminoCrearRiesgoPasarAEdit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(RiesgoHome, [{
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
    key: "crearRiesgo",
    value: function crearRiesgo() {
      this.setState({
        componenteActual: "crearRiesgo"
      });
    }
  }, {
    key: "retornoSeleccionRiesgoSameComponent",
    value: function retornoSeleccionRiesgoSameComponent() {
      this.setState({
        idRiesgoSeleccionado: -1,
        componenteActual: "selRiesgo"
      });
    }
  }, {
    key: "retornoSeleccionRiesgoDiffComponent",
    value: function retornoSeleccionRiesgoDiffComponent() {
      this.props.showRiesgos();
      var self = this;
      setTimeout(function () {
        self.setState({
          idRiesgoSeleccionado: -1,
          componenteActual: "selRiesgo"
        });
      }, 500);
    }
  }, {
    key: "editarRiesgo",
    value: function editarRiesgo(id, nombreRiesgo, pesoRiesgo, toleranciaRiesgo, valorIdealRiesgo, padreRiesgo) {
      this.setState({
        idRiesgoSeleccionado: id,
        componenteActual: "editarRiesgo",
        nombreRiesgo: nombreRiesgo,
        pesoRiesgo: pesoRiesgo,
        toleranciaRiesgo: toleranciaRiesgo,
        valorIdealRiesgo: valorIdealRiesgo,
        padreRiesgo: padreRiesgo
      });
    }
  }, {
    key: "retornoEditarRiesgo",
    value: function retornoEditarRiesgo() {
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
          componenteActual: "editarRiesgo"
        });
      }, 3500);
    }
  }, {
    key: "terminoCrearRiesgoPasarAEdit",
    value: function terminoCrearRiesgoPasarAEdit(nombreRiesgo) {
      var _this2 = this;

      console.log("despues retorno");
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Riesgos where nombre = '" + nombreRiesgo + "'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("retorno last");
              console.log(result);

              if (result.recordset != undefined) {
                if (result.recordset.length) {
                  _this2.editarRiesgo(result.recordset[0].ID, result.recordset[0].nombre, result.recordset[0].peso, result.recordset[0].tolerancia, result.recordset[0].valorIdeal, result.recordset[0].idRiesgoPadre);
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
      if (this.state.componenteActual.localeCompare("selRiesgo") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_SeleccionarRiesgo["default"], {
          pool: this.props.pool,
          configuracionHome: this.props.configuracionHome,
          crearRiesgo: this.crearRiesgo,
          editarRiesgo: this.editarRiesgo
        }, " "));
      } else if (this.state.componenteActual.localeCompare("crearRiesgo") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CrearRiesgo["default"], {
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
          riesgoPadre: -1,
          terminoCrearRiesgo: this.terminoCrearRiesgoPasarAEdit
        }, " "));
      } else if (this.state.componenteActual.localeCompare("editarRiesgo") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_EditarRiesgo["default"], {
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

  return RiesgoHome;
}(_react["default"].Component);

exports["default"] = RiesgoHome;
//# sourceMappingURL=RiesgoHome.js.map
