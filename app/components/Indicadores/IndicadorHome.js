"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _SeleccionarIndicador = _interopRequireDefault(require("./SeleccionarIndicador.js"));

var _CrearIndicador = _interopRequireDefault(require("./CrearIndicador/CrearIndicador.js"));

var _EditarIndicador = _interopRequireDefault(require("./EditarIndicador/EditarIndicador.js"));

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
      idFormulaIndicadorSeleccionada: "",
      nombreIndicadorSeleccionada: "",
      codigoIndicadorSeleccionada: "",
      formulaIndicadorSeleccionada: "",
      pesoIndicadorSeleccionada: "",
      toleranciaIndicadorSeleccionada: "",
      tipoValorIdealIndicadorSeleccionada: "",
      valorIdealIndicadorSeleccionada: "",
      periodicidadIndicadorSeleccionada: "",
      tipoIndicadorIndicadorSeleccionada: "",
      analistaIndicadorSeleccionada: "",
      fechaInicioCalculoSeleccionada: "",
      idRiesgoPadreSeleccionado: -1,
      formulaRiesgo: "",
      pesoDisponibleRiesgo: 0,
      indicadoresSeleccionados: [],
      riesgos: [],
      indicadores: []
    };
    _this.getIndicators = _this.getIndicators.bind(_assertThisInitialized(_this));
    _this.terminoSeleccionIndicador = _this.terminoSeleccionIndicador.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionIndicador = _this.retornoSeleccionIndicador.bind(_assertThisInitialized(_this));
    _this.goCrearIndicador = _this.goCrearIndicador.bind(_assertThisInitialized(_this));
    _this.goEditarIndicador = _this.goEditarIndicador.bind(_assertThisInitialized(_this));
    _this.terminoCrearIndicadorPasarAEdit = _this.terminoCrearIndicadorPasarAEdit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(IndicadorHome, [{
    key: "componentDidMount",
    value: function componentDidMount() {
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
              });

              _this2.getIndicators();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getIndicators",
    value: function getIndicators() {
      var arregloTemp = [];

      for (var i = 0; i < this.state.riesgos.length; i++) {
        this.insertIndicator(this.state.riesgos[i].ID, i, arregloTemp);
      }

      ;
    }
  }, {
    key: "insertIndicator",
    value: function insertIndicator(riesgoID, index, array) {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Indicadores where idRiesgoPadre = " + riesgoID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (array[index] == undefined) {
                array[index] = [];
              }

              array[index] = $.merge(array[index], result.recordset);

              _this3.setState({
                indicadores: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "terminoSeleccionIndicador",
    value: function terminoSeleccionIndicador(id, formula) {
      this.setState({
        componenteAMostrar: "editIndicador",
        idIndicadorSeleccionado: id,
        formulaRiesgo: formula
      });
    }
  }, {
    key: "retornoSeleccionIndicador",
    value: function retornoSeleccionIndicador() {
      this.setState({
        componenteAMostrar: "selIndicador",
        idIndicadorSeleccionado: -1,
        idRiesgoPadreSeleccionado: -1
      });
    }
  }, {
    key: "goCrearIndicador",
    value: function goCrearIndicador(idRiesgo, formula, pesoDisponible) {
      this.setState({
        componenteAMostrar: "crearIndicador",
        idRiesgoPadreSeleccionado: idRiesgo,
        formulaRiesgo: formula,
        pesoDisponibleRiesgo: pesoDisponible
      });
    }
  }, {
    key: "goEditarIndicador",
    value: function goEditarIndicador(idRiesgo, formula, pesoDisponible, idIndicador, idFormula, nombreIndicador, codigoIndicador, formulaIndicador, pesoIndicador, toleranciaIndicador, tipoValorIdealIndicador, valorIdealIndicador, periodicidadIndicador, tipoIndicadorIndicador, analistaIndicador, fechaInicioCalculo, indicadores) {
      this.setState({
        componenteAMostrar: "editIndicador",
        idRiesgoPadreSeleccionado: idRiesgo,
        formulaRiesgo: formula,
        pesoDisponibleRiesgo: pesoDisponible,
        idIndicadorSeleccionado: idIndicador,
        idFormulaIndicadorSeleccionada: idFormula,
        nombreIndicadorSeleccionada: nombreIndicador,
        codigoIndicadorSeleccionada: codigoIndicador,
        formulaIndicadorSeleccionada: formulaIndicador,
        pesoIndicadorSeleccionada: pesoIndicador,
        toleranciaIndicadorSeleccionada: toleranciaIndicador,
        tipoValorIdealIndicadorSeleccionada: tipoValorIdealIndicador,
        valorIdealIndicadorSeleccionada: valorIdealIndicador,
        periodicidadIndicadorSeleccionada: periodicidadIndicador,
        tipoIndicadorIndicadorSeleccionada: tipoIndicadorIndicador,
        analistaIndicadorSeleccionada: analistaIndicador,
        fechaInicioCalculoSeleccionada: fechaInicioCalculo,
        indicadoresSeleccionados: indicadores
      });
    }
  }, {
    key: "terminoCrearIndicadorPasarAEdit",
    value: function terminoCrearIndicadorPasarAEdit(nombreIndicador) {
      var _this4 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select top 1 * from Indicadores order by ID desc", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length) {
                var indicadores;

                for (var i = 0; i < _this4.state.riesgos.length; i++) {
                  if (_this4.state.idRiesgoPadreSeleccionado === _this4.state.riesgos[i].ID) {
                    indicadores = _this4.state.indicadores[i];
                    break;
                  }
                }

                ;

                _this4.goEditarIndicador(_this4.state.idRiesgoPadreSeleccionado, _this4.state.formulaRiesgo, _this4.state.pesoDisponibleRiesgo, result.recordset[0].ID, result.recordset[0].nombre, result.recordset[0].codigo, result.recordset[0].formula, result.recordset[0].peso, result.recordset[0].tolerancia, result.recordset[0].tipoValorIdeal, result.recordset[0].periodicidad, result.recordset[0].tipoIndicador, result.recordset[0].analista, result.recordset[0].fechaInicioCalculo, indicadores);

                _this4.getIndicators();
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
          goCrearIndicador: this.goCrearIndicador,
          showRiesgos: this.props.showRiesgos,
          riesgos: this.state.riesgos,
          indicadores: this.state.indicadores,
          updateBanderaCrearRiesgoTrue: this.props.updateBanderaCrearRiesgoTrue,
          goEditarIndicador: this.goEditarIndicador,
          permision: this.props.permision
        }));
      } else if (this.state.componenteAMostrar.localeCompare("crearIndicador") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CrearIndicador["default"], {
          pool: this.props.pool,
          showCondicionVar: this.props.showCondicionVar,
          retornoSeleccionIndicador: this.retornoSeleccionIndicador,
          configuracionHome: this.props.configuracionHome,
          terminoCrearIndicadorPasarAEdit: this.terminoCrearIndicadorPasarAEdit,
          riesgoPadre: this.state.idRiesgoPadreSeleccionado,
          formulaRiesgo: this.state.formulaRiesgo,
          pesoDisponibleRiesgo: this.state.pesoDisponibleRiesgo
        }, " "));
      } else if (this.state.componenteAMostrar.localeCompare("editIndicador") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_EditarIndicador["default"], {
          pool: this.props.pool,
          showFormula: this.props.showFormula,
          showCondicionVar: this.props.showCondicionVar,
          retornoSeleccionIndicador: this.retornoSeleccionIndicador,
          configuracionHome: this.props.configuracionHome,
          riesgoPadre: this.state.idRiesgoPadreSeleccionado,
          formulaRiesgo: this.state.formulaRiesgo,
          pesoDisponibleRiesgo: this.state.pesoDisponibleRiesgo,
          idIndicadorSeleccionado: this.state.idIndicadorSeleccionado,
          idFormulaIndicadorSeleccionada: this.state.idFormulaIndicadorSeleccionada,
          nombreIndicadorSeleccionada: this.state.nombreIndicadorSeleccionada,
          codigoIndicadorSeleccionada: this.state.codigoIndicadorSeleccionada,
          formulaIndicadorSeleccionada: this.state.formulaIndicadorSeleccionada,
          pesoIndicadorSeleccionada: this.state.pesoIndicadorSeleccionada,
          toleranciaIndicadorSeleccionada: this.state.toleranciaIndicadorSeleccionada,
          tipoToleranciaIndicadorSeleccionada: this.state.tipoToleranciaIndicadorSeleccionada,
          valorIdealIndicadorSeleccionada: this.state.valorIdealIndicadorSeleccionada,
          periodicidadIndicadorSeleccionada: this.state.periodicidadIndicadorSeleccionada,
          tipoIndicadorIndicadorSeleccionada: this.state.tipoIndicadorIndicadorSeleccionada,
          analistaIndicadorSeleccionada: this.state.analistaIndicadorSeleccionada,
          indicadores: this.state.indicadoresSeleccionados,
          permision: this.props.permision,
          getIndicators: this.getIndicators,
          userID: this.props.userID,
          userName: this.props.userName
        }, " "));
      }
    }
  }]);

  return IndicadorHome;
}(_react["default"].Component);

exports["default"] = IndicadorHome;
//# sourceMappingURL=IndicadorHome.js.map
