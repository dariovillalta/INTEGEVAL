"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _SeleccionarDashboard = _interopRequireDefault(require("./SeleccionarDashboard.js"));

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

//import CrearDashboardHome from './CrearVariables/CrearVariablesHome.js';
//import EditarDashboardHome from './EditarVariable/EditarVariablesHome.js';
var EditarDashboardHome =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EditarDashboardHome, _React$Component);

  function EditarDashboardHome(props) {
    var _this;

    _classCallCheck(this, EditarDashboardHome);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditarDashboardHome).call(this, props));
    _this.state = {
      componenteActual: "selVariables",
      idVariable: -1,
      tipoVariable: "",
      esObjetoVariable: "",
      esInstruccionSQLVariable: "",
      esPrimeraVez: true
    };
    _this.crearVariables = _this.crearVariables.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionVariables = _this.retornoSeleccionVariables.bind(_assertThisInitialized(_this));
    _this.editarVariables = _this.editarVariables.bind(_assertThisInitialized(_this));
    _this.changeStateFirstTimeToFalse = _this.changeStateFirstTimeToFalse.bind(_assertThisInitialized(_this));
    _this.terminoCrearVariablesPasarAEdit = _this.terminoCrearVariablesPasarAEdit.bind(_assertThisInitialized(_this));
    _this.actualizarIDVariableModificada = _this.actualizarIDVariableModificada.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(EditarDashboardHome, [{
    key: "componentDidMount",
    value: function componentDidMount() {//
    }
  }, {
    key: "crearVariables",
    value: function crearVariables() {
      this.setState({
        componenteActual: "crearVariables"
      });
    }
  }, {
    key: "retornoSeleccionVariables",
    value: function retornoSeleccionVariables() {
      this.setState({
        componenteActual: "selVariables",
        idVariable: -1,
        tipoVariable: "",
        esObjetoVariable: "",
        esInstruccionSQLVariable: ""
      });
    }
  }, {
    key: "editarVariables",
    value: function editarVariables(idVariable, esObjetoVariable, esInstruccionSQLVariable, tipoVariable) {
      this.setState({
        idVariable: idVariable,
        componenteActual: "editarVariables",
        tipoVariable: tipoVariable,
        esObjetoVariable: esObjetoVariable,
        esInstruccionSQLVariable: esInstruccionSQLVariable,
        esPrimeraVez: true
      });
    }
  }, {
    key: "changeStateFirstTimeToFalse",
    value: function changeStateFirstTimeToFalse() {
      this.setState({
        esPrimeraVez: false
      });
    }
  }, {
    key: "terminoCrearVariablesPasarAEdit",
    value: function terminoCrearVariablesPasarAEdit(nombreFuenteDatos) {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Campos where nombre = '" + nombreFuenteDatos + "'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset != undefined) {
                if (result.recordset.length) {
                  _this2.editarFuenteDatos(result.recordset[0].ID, result.recordset[0].nombre, result.recordset[0].descripcion, result.recordset[0].esObjeto, result.recordset[0].objetoPadreID, result.recordset[0].guardar);
                }
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "actualizarIDVariableModificada",
    value: function actualizarIDVariableModificada(tablaDeVariableModificada) {
      var _this3 = this;

      if (tablaDeVariableModificada.localeCompare("excel") == 0) {
        var transaction = new _mssql["default"].Transaction(this.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("select top 1 * from ExcelArchivos order by ID desc", function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                if (result.recordset.length > 0) {
                  _this3.editarVariables(result.recordset[0].ID, false, false, "excel");
                }
              });
            }
          });
        }); // fin transaction
      } else if (tablaDeVariableModificada.localeCompare("forma") == 0) {
        var _transaction = new _mssql["default"].Transaction(this.props.pool);

        _transaction.begin(function (err) {
          var rolledBack = false;

          _transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });

          var request = new _mssql["default"].Request(_transaction);
          request.query("select top 1 * from FormasVariables order by ID desc", function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                _transaction.rollback(function (err) {});
              }
            } else {
              _transaction.commit(function (err) {
                if (result.recordset.length > 0) {
                  console.log("yeah");

                  _this3.editarVariables(result.recordset[0].ID, false, false, "forma");
                }
              });
            }
          });
        }); // fin transaction

      } else if (tablaDeVariableModificada.localeCompare("variable") == 0) {
        var _transaction2 = new _mssql["default"].Transaction(this.props.pool);

        _transaction2.begin(function (err) {
          var rolledBack = false;

          _transaction2.on('rollback', function (aborted) {
            rolledBack = true;
          });

          var request = new _mssql["default"].Request(_transaction2);
          request.query("select top 1 * from Variables order by ID desc", function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                _transaction2.rollback(function (err) {});
              }
            } else {
              _transaction2.commit(function (err) {
                if (result.recordset.length > 0) {
                  _this3.editarVariables(result.recordset[0].ID, result.recordset[0].esObjeto, result.recordset[0].esInstruccionSQL, "variable");
                }
              });
            }
          });
        }); // fin transaction

      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.componenteActual.localeCompare("selVariables") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_SeleccionarDashboard["default"], {
          pool: this.props.pool,
          configuracionHome: this.props.configuracionHome,
          crearVariables: this.crearVariables,
          goOptions: this.props.goOptions,
          editarVariable: this.editarVariables
        }));
      }
      /*else if(this.state.componenteActual.localeCompare("crearVariables") == 0) {
        return (
            <div>
                <CrearVariablesHome pool={this.props.pool}
                                        showCondicionVar={this.props.showCondicionVar}
                                        terminoCrearCampo={this.terminoCrearFuenteDatosPasarAEdit}
                                        idTablaSeleccionada={this.props.idTablaSeleccionada}
                                        columnas={this.state.columnas}
                                        nombreTablaSeleccionada={this.props.nombreTablaSeleccionada}
                                        goOptions={this.props.goOptions}
                                        retornoSeleccionVariables={this.retornoSeleccionVariables}
                                        configuracionHome={this.props.configuracionHome}>
                </CrearVariablesHome>
            </div>
        );
      }*/

    }
  }]);

  return EditarDashboardHome;
}(_react["default"].Component);

exports["default"] = EditarDashboardHome;
//# sourceMappingURL=EditarDashboardHome.js.map
