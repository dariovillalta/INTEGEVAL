"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _SeleccionarVariables = _interopRequireDefault(require("./SeleccionarVariables.js"));

var _CrearVariablesHome = _interopRequireDefault(require("./CrearVariables/CrearVariablesHome.js"));

var _EditarVariable = _interopRequireDefault(require("./EditarVariable.js"));

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

var VariableHome =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VariableHome, _React$Component);

  function VariableHome(props) {
    var _this;

    _classCallCheck(this, VariableHome);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VariableHome).call(this, props));
    _this.state = {
      componenteActual: "selVariables",
      idFuenteDatos: -1,
      nombreFuenteDatos: "",
      descripcionFuenteDatos: "",
      esObjetoFuenteDatos: "",
      objetoPadreIDFuenteDatos: -1,
      guardarFuenteDatos: ""
    };
    _this.crearVariables = _this.crearVariables.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionVariables = _this.retornoSeleccionVariables.bind(_assertThisInitialized(_this));
    _this.editarVariables = _this.editarVariables.bind(_assertThisInitialized(_this));
    _this.terminoCrearVariablesPasarAEdit = _this.terminoCrearVariablesPasarAEdit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(VariableHome, [{
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
        idFuenteDatos: -1,
        nombreFuenteDatos: "",
        descripcionFuenteDatos: "",
        esObjetoFuenteDatos: "",
        objetoPadreIDFuenteDatos: -1,
        guardarFuenteDatos: ""
      });
    }
  }, {
    key: "editarVariables",
    value: function editarVariables(idFuenteDatos, nombreFuenteDatos, descripcionFuenteDatos, esObjetoFuenteDatos, objetoPadreIDFuenteDatos, guardarFuenteDatos) {
      this.setState({
        idFuenteDatos: idFuenteDatos,
        componenteActual: "editarVariables",
        nombreFuenteDatos: nombreFuenteDatos,
        descripcionFuenteDatos: descripcionFuenteDatos,
        esObjetoFuenteDatos: esObjetoFuenteDatos,
        objetoPadreIDFuenteDatos: objetoPadreIDFuenteDatos,
        guardarFuenteDatos: guardarFuenteDatos
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
            if (!rolledBack) {
              console.log(err);
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
    key: "render",
    value: function render() {
      if (this.state.componenteActual.localeCompare("selVariables") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_SeleccionarVariables["default"], {
          pool: this.props.pool,
          configuracionHome: this.props.configuracionHome,
          crearVariables: this.crearVariables,
          goOptions: this.props.goOptions,
          editarFuenteDatos: this.editarFuenteDatos
        }));
      } else if (this.state.componenteActual.localeCompare("crearVariables") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CrearVariablesHome["default"], {
          pool: this.props.pool,
          showCondicionVar: this.props.showCondicionVar,
          terminoCrearCampo: this.terminoCrearFuenteDatosPasarAEdit,
          idTablaSeleccionada: this.props.idTablaSeleccionada,
          columnas: this.state.columnas,
          nombreTablaSeleccionada: this.props.nombreTablaSeleccionada,
          goOptions: this.props.goOptions,
          retornoSeleccionVariables: this.retornoSeleccionVariables,
          configuracionHome: this.props.configuracionHome
        }));
      } else if (this.state.componenteActual.localeCompare("editarVariables") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(EditarVariablesHome, {
          pool: this.props.pool,
          showFormula: this.props.showFormula,
          showCondicionVar: this.props.showCondicionVar,
          showRiesgos: this.props.showRiesgos,
          goOptions: this.props.goOptions,
          retornoSeleccionTabla: this.props.retornoSeleccionTabla,
          retornoSeleccionVariables: this.retornoSeleccionVariables,
          retornoSeleccionRiesgo: this.retornoSeleccionRiesgoSameComponent,
          retornoSeleccionRiesgoUmbral: this.retornoSeleccionRiesgoDiffComponent,
          configuracionHome: this.props.configuracionHome,
          updateNavBar: this.props.updateNavBar,
          showUmbralHome: this.props.showUmbralHome,
          idFuenteDatos: this.state.idFuenteDatos,
          nombreFuenteDatos: this.state.nombreFuenteDatos,
          descripcionFuenteDatos: this.state.descripcionFuenteDatos,
          esObjetoFuenteDatos: this.state.esObjetoFuenteDatos,
          objetoPadreIDFuenteDatos: this.state.objetoPadreIDFuenteDatos,
          guardarFuenteDatos: this.state.guardarFuenteDatos,
          updateFormula: this.props.updateFormula
        }));
      }
    }
  }]);

  return VariableHome;
}(_react["default"].Component);

exports["default"] = VariableHome;
//# sourceMappingURL=VariableHome.js.map
