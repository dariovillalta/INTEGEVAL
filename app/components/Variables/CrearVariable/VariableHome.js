"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _SeleccionarVariable = _interopRequireDefault(require("./SeleccionarVariable.js"));

var _CrearVariable = _interopRequireDefault(require("./CrearVariable.js"));

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
      componenteActual: "selVariable",
      idVariable: -1,
      nombreVariable: "",
      descripcionVariable: "",
      esObjetoVariable: "",
      idObjetoPadreVariable: -1
    };
    _this.crearVariable = _this.crearVariable.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionVariable = _this.retornoSeleccionVariable.bind(_assertThisInitialized(_this));
    _this.editarVariable = _this.editarVariable.bind(_assertThisInitialized(_this));
    _this.retornoEditarVariable = _this.retornoEditarVariable.bind(_assertThisInitialized(_this));
    _this.terminoCrearVariablePasarAEdit = _this.terminoCrearVariablePasarAEdit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(VariableHome, [{
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
    key: "crearVariable",
    value: function crearVariable() {
      this.setState({
        componenteActual: "crearVariable"
      });
    }
  }, {
    key: "retornoSeleccionVariable",
    value: function retornoSeleccionVariable() {
      this.setState({
        componenteActual: "selVariable",
        idVariable: -1,
        nombreVariable: "",
        descripcionVariable: "",
        esObjetoVariable: "",
        idObjetoPadreVariable: -1
      });
    }
  }, {
    key: "editarVariable",
    value: function editarVariable(idVariable, nombreVariable, descripcionVariable, esObjetoVariable, idObjetoPadreVariable) {
      this.setState({
        idVariable: idVariable,
        componenteActual: "editarVariable",
        nombreVariable: nombreVariable,
        descripcionVariable: descripcionVariable,
        esObjetoVariable: esObjetoVariable,
        idObjetoPadreVariable: -1
      });
    }
  }, {
    key: "retornoEditarVariable",
    value: function retornoEditarVariable() {
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
          componenteActual: "editarVariable"
        });
      }, 3500);
    }
  }, {
    key: "terminoCrearVariablePasarAEdit",
    value: function terminoCrearVariablePasarAEdit(nombreFuenteDatos) {
      var _this2 = this;

      console.log("1");
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
                console.log("result.recordset");
                console.log(result.recordset);
                console.log("nombreFuenteDatos");
                console.log(nombreFuenteDatos);

                if (result.recordset.length) {
                  _this2.editarVariable(result.recordset[0].ID, result.recordset[0].nombre, result.recordset[0].descripcion, result.recordset[0].esObjeto, result.recordset[0].objetoPadreID);
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
      if (this.state.componenteActual.localeCompare("selVariable") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_SeleccionarVariable["default"], {
          pool: this.props.pool,
          configuracionHome: this.props.configuracionHome,
          goOptions: this.props.goOptions,
          crearVariable: this.crearVariable,
          editarVariable: this.editarVariable
        }));
      } else if (this.state.componenteActual.localeCompare("crearVariable") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CrearVariable["default"], {
          pool: this.props.pool,
          showCondicionVar: this.props.showCondicionVar,
          terminoCrearCampo: this.terminoCrearVariablePasarAEdit,
          retornoSeleccionVariable: this.retornoSeleccionVariable,
          goOptions: this.props.goOptions,
          configuracionHome: this.props.configuracionHome
        }));
      } else if (this.state.componenteActual.localeCompare("editarVariable") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_EditarVariable["default"], {
          pool: this.props.pool,
          showFormula: this.props.showFormula,
          showCondicionVar: this.props.showCondicionVar,
          showRiesgos: this.props.showRiesgos,
          retornoSeleccionVariable: this.retornoSeleccionVariable,
          goOptions: this.props.goOptions,
          configuracionHome: this.props.configuracionHome,
          updateNavBar: this.props.updateNavBar,
          showUmbralHome: this.props.showUmbralHome,
          idVariable: this.state.idVariable,
          nombreVariable: this.state.nombreVariable,
          descripcionVariable: this.state.descripcionVariable,
          esObjetoVariable: this.state.esObjetoVariable,
          idObjetoPadreVariable: this.state.idObjetoPadreVariable,
          updateFormula: this.props.updateFormula,
          showVariables: this.retornoSeleccionVariableSameComponent
        }));
      }
    }
  }]);

  return VariableHome;
}(_react["default"].Component);

exports["default"] = VariableHome;
//# sourceMappingURL=VariableHome.js.map
