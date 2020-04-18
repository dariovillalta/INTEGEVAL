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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Filtro =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Filtro, _React$Component);

  function Filtro(props) {
    var _this;

    _classCallCheck(this, Filtro);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Filtro).call(this, props));
    _this.state = {
      variables: [],
      indicadores: [],
      riesgos: []
    };
    _this.agregarFiltro = _this.agregarFiltro.bind(_assertThisInitialized(_this));
    _this.getResultsVariables = _this.getResultsVariables.bind(_assertThisInitialized(_this));
    _this.getResultsVariablesFieldsInit = _this.getResultsVariablesFieldsInit.bind(_assertThisInitialized(_this));
    _this.getFieldAttributes = _this.getFieldAttributes.bind(_assertThisInitialized(_this));
    _this.getFieldResults = _this.getFieldResults.bind(_assertThisInitialized(_this));
    _this.getResultsIndicators = _this.getResultsIndicators.bind(_assertThisInitialized(_this));
    _this.getResultsIndicatorsFieldsInit = _this.getResultsIndicatorsFieldsInit.bind(_assertThisInitialized(_this));
    _this.getFieldAttributesIndicators = _this.getFieldAttributesIndicators.bind(_assertThisInitialized(_this));
    _this.getFieldResultsIndicators = _this.getFieldResultsIndicators.bind(_assertThisInitialized(_this));
    _this.getResultsRisks = _this.getResultsRisks.bind(_assertThisInitialized(_this));
    _this.getResultsRisksFieldsInit = _this.getResultsRisksFieldsInit.bind(_assertThisInitialized(_this));
    _this.getFieldAttributesRisks = _this.getFieldAttributesRisks.bind(_assertThisInitialized(_this));
    _this.getFieldResultsRisks = _this.getFieldResultsRisks.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Filtro, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getResultsVariables();
      this.getResultsIndicators();
      this.getResultsRisks();
    }
  }, {
    key: "agregarFiltro",
    value: function agregarFiltro() {//
    }
  }, {
    key: "getResultsVariables",
    value: function getResultsVariables() {
      var _this2 = this;

      //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosNombreVariables", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
              return [];
            }
          } else {
            transaction.commit(function (err) {
              _this2.getResultsVariablesFieldsInit(result.recordset);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsVariablesFieldsInit",
    value: function getResultsVariablesFieldsInit(resultados) {
      var arregloTemp = [];

      for (var i = 0; i < resultados.length; i++) {
        arregloTemp.push(resultados[i]);
        this.getFieldAttributes(resultados[i], i, arregloTemp);
        this.getFieldResults(resultados[i], i, arregloTemp);
      }

      ;
    }
  }, {
    key: "getFieldAttributes",
    value: function getFieldAttributes(resultado, index, array) {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '" + resultado.nombreVariable + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds() + "'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var arrTemp = [];

              for (var i = 0; i < result.recordset.length; i++) {
                arrTemp.push({
                  nombre: result.recordset[i].COLUMN_NAME,
                  tipo: result.recordset[i].DATA_TYPE
                });
              }

              ;
              array[index].atributos = arrTemp;

              _this3.setState({
                variables: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getFieldResults",
    value: function getFieldResults(resultado, index, array) {
      var _this4 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from " + resultado.nombreVariable + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds(), function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              array[index].resultados = result.recordset;

              _this4.setState({
                variables: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsIndicators",
    value: function getResultsIndicators() {
      var _this5 = this;

      //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosNombreIndicadores", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
              return [];
            }
          } else {
            transaction.commit(function (err) {
              _this5.getResultsIndicatorsFieldsInit(result.recordset);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsIndicatorsFieldsInit",
    value: function getResultsIndicatorsFieldsInit(resultados) {
      var arregloTemp = [];

      for (var i = 0; i < resultados.length; i++) {
        arregloTemp.push(resultados[i]);
        this.getFieldAttributesIndicators(resultados[i], i, arregloTemp);
        this.getFieldResultsIndicators(resultados[i], i, arregloTemp);
      }

      ;
    }
  }, {
    key: "getFieldAttributesIndicators",
    value: function getFieldAttributesIndicators(resultado, index, array) {
      var _this6 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '" + resultado.nombreIndicador + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds() + "'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var arrTemp = [];

              for (var i = 0; i < result.recordset.length; i++) {
                arrTemp.push({
                  nombre: result.recordset[i].COLUMN_NAME,
                  tipo: result.recordset[i].DATA_TYPE
                });
              }

              ;
              array[index].atributos = arrTemp;

              _this6.setState({
                indicadores: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getFieldResultsIndicators",
    value: function getFieldResultsIndicators(resultado, index, array) {
      var _this7 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from " + resultado.nombreIndicador + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds(), function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              array[index].resultados = result.recordset;

              _this7.setState({
                indicadores: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsRisks",
    value: function getResultsRisks() {
      var _this8 = this;

      //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosNombreRiesgos", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
              return [];
            }
          } else {
            transaction.commit(function (err) {
              _this8.getResultsRisksFieldsInit(result.recordset);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsRisksFieldsInit",
    value: function getResultsRisksFieldsInit(resultados) {
      var arregloTemp = [];

      for (var i = 0; i < resultados.length; i++) {
        arregloTemp.push(resultados[i]);
        this.getFieldAttributesRisks(resultados[i], i, arregloTemp);
        this.getFieldResultsRisks(resultados[i], i, arregloTemp);
      }

      ;
    }
  }, {
    key: "getFieldAttributesRisks",
    value: function getFieldAttributesRisks(resultado, index, array) {
      var _this9 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '" + resultado.nombreRiesgo + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds() + "'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var arrTemp = [];

              for (var i = 0; i < result.recordset.length; i++) {
                arrTemp.push({
                  nombre: result.recordset[i].COLUMN_NAME,
                  tipo: result.recordset[i].DATA_TYPE
                });
              }

              ;
              array[index].atributos = arrTemp;

              _this9.setState({
                riesgos: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getFieldResultsRisks",
    value: function getFieldResultsRisks(resultado, index, array) {
      var _this10 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from " + resultado.nombreRiesgo + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds(), function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              array[index].resultados = result.recordset;

              _this10.setState({
                riesgos: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "render",
    value: function render() {
      var _this11 = this;

      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Crear Filtros"), _react["default"].createElement("div", {
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
      }, "Seleccionar Fechas")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Crear Filtros"))))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4"
      }, this.state.variables.map(function (variable, i) {
        return _react["default"].createElement("label", {
          key: variable.ID,
          className: "custom-control custom-radio custom-control-inline"
        }, _react["default"].createElement("input", {
          id: "varRad" + variable.ID,
          type: "radio",
          name: "sinoRadio",
          defaultChecked: true,
          className: "custom-control-input"
        }), _react["default"].createElement("span", {
          className: "custom-control-label"
        }, variable.nombreVariable));
      })), _react["default"].createElement("div", {
        className: "col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8"
      })), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "text-center",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-primary active",
        onClick: this.agregarFiltro
      }, "Agregar Filtro")), _react["default"].createElement("br", null)))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("a", {
        className: "btn btn-success btn-block btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: function onClick() {
          return _this11.props.retornoVariables(_this11.state.variables, _this11.state.indicadores, _this11.state.riesgos);
        }
      }, "Visualizar Variables")), _react["default"].createElement("br", null));
    }
  }]);

  return Filtro;
}(_react["default"].Component);

exports["default"] = Filtro;
//# sourceMappingURL=Filtro.js.map
