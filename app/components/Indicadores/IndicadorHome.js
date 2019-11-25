"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _SeleccionarIndicador = _interopRequireDefault(require("./SeleccionarIndicador.js"));

var _CrearIndicador = _interopRequireDefault(require("./CrearIndicador.js"));

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

var IndicadorHome =
/*#__PURE__*/
function (_React$Component) {
  _inherits(IndicadorHome, _React$Component);

  function IndicadorHome(props) {
    var _this;

    _classCallCheck(this, IndicadorHome);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IndicadorHome).call(this, props));
    _this.state = {
      componenteAMostrar: "selIndicador",
      idIndicadorSeleccionado: -1,
      nombreIndicadorSeleccionada: ""
    };
    _this.terminoSeleccionIndicador = _this.terminoSeleccionIndicador.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionIndicador = _this.retornoSeleccionIndicador.bind(_assertThisInitialized(_this));
    _this.goCrearIndicador = _this.goCrearIndicador.bind(_assertThisInitialized(_this));
    _this.terminoCrearIndicadorPasarAEdit = _this.terminoCrearIndicadorPasarAEdit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(IndicadorHome, [{
    key: "terminoSeleccionIndicador",
    value: function terminoSeleccionIndicador(id, nombre) {
      this.setState({
        componenteAMostrar: "editIndicador",
        idIndicadorSeleccionado: id,
        nombreTablaSeleccionada: nombre
      });
    }
  }, {
    key: "retornoSeleccionIndicador",
    value: function retornoSeleccionIndicador() {
      this.setState({
        componenteAMostrar: "selIndicador",
        idIndicadorSeleccionado: -1,
        nombreTablaSeleccionada: ""
      });
    }
  }, {
    key: "goCrearIndicador",
    value: function goCrearIndicador() {
      this.setState({
        componenteAMostrar: "crearIndicador"
      });
    }
  }, {
    key: "terminoCrearIndicadorPasarAEdit",
    value: function terminoCrearIndicadorPasarAEdit(nombreIndicador) {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Indicadores where nombre = '" + nombreIndicador + "'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length) {
                _this2.terminoSeleccionIndicador(result.recordset[0].ID, result.recordset[0].nombre);
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.componenteAMostrar.localeCompare("selIndicador") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_SeleccionarIndicador["default"], {
          pool: this.props.pool,
          configuracionHome: this.props.configuracionHome,
          terminoSeleccionIndicador: this.terminoSeleccionIndicador,
          goCrearIndicador: this.goCrearIndicador
        }, " "));
      } else if (this.state.componenteAMostrar.localeCompare("crearIndicador") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CrearIndicador["default"], {
          pool: this.props.pool,
          showFormula: this.props.showFormula,
          showCondicionVar: this.props.showCondicionVar,
          retornoSeleccionIndicador: this.retornoSeleccionIndicador,
          configuracionHome: this.props.configuracionHome,
          terminoCrearIndicadorPasarAEdit: this.terminoCrearIndicadorPasarAEdit,
          riesgoPadre: -1
        }, " "));
      } else if (this.state.componenteAMostrar.localeCompare("editIndicador") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CrearIndicador["default"], {
          pool: this.props.pool,
          showFormula: this.props.showFormula,
          showCondicionVar: this.props.showCondicionVar,
          retornoSeleccionIndicador: this.retornoSeleccionIndicador,
          configuracionHome: this.props.configuracionHome,
          idIndicadorSeleccionado: this.state.idIndicadorSeleccionado,
          nombreIndicadorSeleccionada: this.state.nombreIndicadorSeleccionada
        }, " "));
      }
    }
  }]);

  return IndicadorHome;
}(_react["default"].Component);

exports["default"] = IndicadorHome;
//# sourceMappingURL=IndicadorHome.js.map
