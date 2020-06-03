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

var RiesgoHome =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RiesgoHome, _React$Component);

  function RiesgoHome(props) {
    var _this;

    _classCallCheck(this, RiesgoHome);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RiesgoHome).call(this, props)); //cuando es llamado desde indicadores

    var componente = "selRiesgo";
    if (_this.props.crearRiesgo) componente = "crearRiesgo";
    _this.state = {
      riesgos: [],
      pesoDisponible: 0,
      idRiesgoSeleccionado: -1,
      componenteActual: componente,
      nombreRiesgo: "",
      pesoRiesgo: 0,
      formulaRiesgo: ""
    };
    _this.getRiesgos = _this.getRiesgos.bind(_assertThisInitialized(_this));
    _this.acutalizarPesoMaximoDisponible = _this.acutalizarPesoMaximoDisponible.bind(_assertThisInitialized(_this));
    _this.crearRiesgo = _this.crearRiesgo.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionRiesgo = _this.retornoSeleccionRiesgo.bind(_assertThisInitialized(_this));
    _this.editarRiesgo = _this.editarRiesgo.bind(_assertThisInitialized(_this));
    _this.terminoCrearRiesgoPasarAEdit = _this.terminoCrearRiesgoPasarAEdit.bind(_assertThisInitialized(_this));
    _this.deleteRiesgo = _this.deleteRiesgo.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(RiesgoHome, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getRiesgos();
      this.props.updateBanderaCrearRiesgoFalse();
    }
  }, {
    key: "getRiesgos",
    value: function getRiesgos() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Riesgos", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                riesgos: result.recordset
              }, _this2.acutalizarPesoMaximoDisponible);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "acutalizarPesoMaximoDisponible",
    value: function acutalizarPesoMaximoDisponible() {
      var pesoInstitucional = 100;
      var pesoExistente = 0;

      for (var i = 0; i < this.state.riesgos.length; i++) {
        pesoExistente += this.state.riesgos[i].peso;
      }

      ;
      this.setState({
        pesoDisponible: pesoInstitucional - pesoExistente
      });
    }
  }, {
    key: "crearRiesgo",
    value: function crearRiesgo() {
      this.setState({
        componenteActual: "crearRiesgo"
      });
    }
  }, {
    key: "retornoSeleccionRiesgo",
    value: function retornoSeleccionRiesgo() {
      this.setState({
        idRiesgoSeleccionado: -1,
        componenteActual: "selRiesgo"
      });
    }
  }, {
    key: "editarRiesgo",
    value: function editarRiesgo(id, nombreRiesgo, pesoRiesgo, formulaRiesgo) {
      this.setState({
        idRiesgoSeleccionado: id,
        componenteActual: "editarRiesgo",
        nombreRiesgo: nombreRiesgo,
        pesoRiesgo: pesoRiesgo,
        formulaRiesgo: formulaRiesgo
      });
    }
  }, {
    key: "terminoCrearRiesgoPasarAEdit",
    value: function terminoCrearRiesgoPasarAEdit() {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select top 1 * from Riesgos order by ID desc", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset != undefined) {
                if (result.recordset.length) {
                  _this3.editarRiesgo(result.recordset[0].ID, result.recordset[0].nombre, result.recordset[0].peso, result.recordset[0].tolerancia, result.recordset[0].valorIdeal, result.recordset[0].idRiesgoPadre);
                }
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "deleteRiesgo",
    value: function deleteRiesgo(index) {
      var _this4 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("delete from Riesgos where ID = " + index, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              alert("Riesgo Eliminado");

              _this4.getRiesgos();
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
          deleteRiesgo: this.deleteRiesgo,
          configuracionHome: this.props.configuracionHome,
          crearRiesgo: this.crearRiesgo,
          editarRiesgo: this.editarRiesgo,
          riesgos: this.state.riesgos
        }, " "));
      } else if (this.state.componenteActual.localeCompare("crearRiesgo") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CrearRiesgo["default"], {
          pool: this.props.pool,
          showCondicionVar: this.props.showCondicionVar,
          showRiesgos: this.props.showRiesgos,
          retornoSeleccionRiesgo: this.retornoSeleccionRiesgo,
          configuracionHome: this.props.configuracionHome,
          showUmbralHome: this.props.showUmbralHome,
          riesgos: this.state.riesgos,
          terminoCrearRiesgo: this.terminoCrearRiesgoPasarAEdit,
          actualizarRiesgos: this.getRiesgos,
          pesoMaximo: this.state.pesoDisponible
        }, " "));
      } else if (this.state.componenteActual.localeCompare("editarRiesgo") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_EditarRiesgo["default"], {
          pool: this.props.pool,
          showCondicionVar: this.props.showCondicionVar,
          showRiesgos: this.props.showRiesgos,
          retornoSeleccionRiesgo: this.retornoSeleccionRiesgo,
          configuracionHome: this.props.configuracionHome,
          showUmbralHome: this.props.showUmbralHome,
          riesgos: this.state.riesgos,
          nombreRiesgo: this.state.nombreRiesgo,
          pesoRiesgo: this.state.pesoRiesgo,
          formulaRiesgo: this.state.formulaRiesgo,
          getRiesgos: this.getRiesgos,
          idRiesgoSeleccionado: this.state.idRiesgoSeleccionado
        }, " "));
      }
    }
  }]);

  return RiesgoHome;
}(_react["default"].Component);

exports["default"] = RiesgoHome;
//# sourceMappingURL=RiesgoHome.js.map
