"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _FuenteDatoVariable = _interopRequireDefault(require("./FuenteDatoVariable.js"));

var _FuenteDatoForma = _interopRequireDefault(require("./FuenteDatoForma.js"));

var _FuenteDatoExcel = _interopRequireDefault(require("./FuenteDatoExcel.js"));

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

var mostrarFuenteDatoVariableGlobal = false;
var mostrarFuenteDatoFormaGlobal = false;
var mostrarFuenteDatoExcelGlobal = false; //var esPrimeraVez = true;

/*COMPONENTE QUE CONTROLA TIPOS DE VARIABLES (EXCEL, FORMA, VARIABLE)*/

var EditarVariable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EditarVariable, _React$Component);

  function EditarVariable(props) {
    var _this;

    _classCallCheck(this, EditarVariable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditarVariable).call(this, props));
    _this.mostrarFuenteDatoVariable = _this.mostrarFuenteDatoVariable.bind(_assertThisInitialized(_this));
    _this.mostrarFuenteDatoForma = _this.mostrarFuenteDatoForma.bind(_assertThisInitialized(_this));
    _this.mostrarFuenteDatoExcel = _this.mostrarFuenteDatoExcel.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(EditarVariable, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      /*mostrarFuenteDatoVariableGlobal = false;
      mostrarFuenteDatoFormaGlobal = false;
      mostrarFuenteDatoExcelGlobal = false;*/
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.tipoVariableOriginal.localeCompare("excel") == 0 && this.props.esPrimeraVez) {
        this.props.cambiarEstadoVistaVariable(false, false, true);
      } else if (this.props.tipoVariableOriginal.localeCompare("forma") == 0 && this.props.esPrimeraVez) {
        this.props.cambiarEstadoVistaVariable(false, true, false);
      } else if (this.props.tipoVariableOriginal.localeCompare("variable") == 0 && this.props.esPrimeraVez) {
        this.props.cambiarEstadoVistaVariable(true, false, false);
      }

      this.setState({
        mostrarFuenteDatoVariable: mostrarFuenteDatoVariableGlobal,
        mostrarFuenteDatoForma: mostrarFuenteDatoFormaGlobal,
        mostrarFuenteDatoExcel: mostrarFuenteDatoExcelGlobal
      });
    }
  }, {
    key: "mostrarFuenteDatoVariable",
    value: function mostrarFuenteDatoVariable() {
      this.props.cambiarEstadoVistaVariable(true, false, false);
    }
  }, {
    key: "mostrarFuenteDatoForma",
    value: function mostrarFuenteDatoForma() {
      this.props.cambiarEstadoVistaVariable(false, true, false);
    }
  }, {
    key: "mostrarFuenteDatoExcel",
    value: function mostrarFuenteDatoExcel() {
      this.props.cambiarEstadoVistaVariable(false, false, true);
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Modificar Variable"), _react["default"].createElement("div", {
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
      }, "Configuraci\xF3n")), _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.goOptions
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Tipo de Configuraci\xF3n")), _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.retornoSeleccionVariables
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Variables")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Modificar Variable"))))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("div", {
        className: "border-top",
        style: {
          width: "100%"
        }
      }, this.props.estadoVistaVariable.mostrarFuenteDatoVariable ? _react["default"].createElement(_FuenteDatoVariable["default"], {
        pool: this.props.pool,
        campos: this.props.columnas,
        esObjetoVariable: this.props.esObjetoVariable,
        esInstruccionSQLVariable: this.props.esInstruccionSQLVariable,
        goToCreateConditions: this.props.goToCreateConditions,
        goCreateVariableFieldSQL: this.props.goCreateVariableFieldSQL,
        goToTimeline: this.props.goToTimeline,
        guardarVariable: this.props.guardarVariable,
        crearAtributoVariable: this.props.crearAtributoVariable,
        eliminarAtributoVariable: this.props.eliminarAtributoVariable,
        modificarNombreVariable: this.props.modificarNombreVariable,
        cambioDeArreglosDeAtributos: this.props.cambioDeArreglosDeAtributos,
        idFormula: this.props.idFormula,
        nombreVariable: this.props.nombreVariable,
        actualizarIdFormula: this.props.actualizarIdFormula,
        actualizarNombreVariable: this.props.actualizarNombreVariable,
        actualizarEstadoSiEsObjeto: this.props.actualizarEstadoSiEsObjeto,
        actualizarEstadoSiEsInstruccionSQL: this.props.actualizarEstadoSiEsInstruccionSQL,
        descripcionVariable: this.props.descripcionVariable,
        actualizarDescripcionVariable: this.props.actualizarDescripcionVariable,
        nombreCampoNuevoAtributosVario: this.props.nombreCampoNuevoAtributosVario,
        tipoNuevaVariable: this.props.tipoNuevaVariable,
        actualizarNombreCampoNuevoAtributosVario: this.props.actualizarNombreCampoNuevoAtributosVario,
        atributos: this.props.atributos,
        tipoVariableOriginal: this.props.tipoVariableOriginal,
        idVariable: this.props.idVariable,
        eliminarVariable: this.props.eliminarVariable,
        actualizarFechaInicio: this.props.actualizarFechaInicio,
        actualizarPeriodicidad: this.props.actualizarPeriodicidad,
        actualizarNombreEncargado: this.props.actualizarNombreEncargado,
        actualizarCategoriaVariable: this.props.actualizarCategoriaVariable,
        fechaInicioVariable: this.props.fechaInicioVariable,
        periodicidadVariable: this.props.periodicidadVariable,
        responsableVariable: this.props.responsableVariable,
        categoriaVariable: this.props.categoriaVariable,
        esPrimeraVez: this.props.esPrimeraVez,
        changeStateFirstTimeToFalse: this.props.changeStateFirstTimeToFalse,
        changeStateFirstTimeToTrue: this.props.changeStateFirstTimeToTrue,
        permision: this.props.permision,
        userID: this.props.userID,
        userName: this.props.userName
      }) : null, this.props.estadoVistaVariable.mostrarFuenteDatoForma ? _react["default"].createElement(_FuenteDatoForma["default"], {
        pool: this.props.pool,
        esObjetoVariable: this.props.esObjetoVariable,
        esInstruccionSQLVariable: this.props.esInstruccionSQLVariable,
        idVariable: this.props.idVariable,
        tipoVariableOriginal: this.props.tipoVariableOriginal,
        actualizarIDVariableModificada: this.props.actualizarIDVariableModificada,
        goToTimeline: this.props.goToTimeline,
        eliminarVarForma: this.props.eliminarVarForma,
        getFormas: this.props.getFormas,
        limpiarArreglos: this.props.limpiarArreglos,
        permision: this.props.permision,
        userID: this.props.userID,
        userName: this.props.userName
      }) : null, this.props.estadoVistaVariable.mostrarFuenteDatoExcel ? _react["default"].createElement(_FuenteDatoExcel["default"], {
        pool: this.props.pool,
        esObjetoVariable: this.props.esObjetoVariable,
        esInstruccionSQLVariable: this.props.esInstruccionSQLVariable,
        idVariable: this.props.idVariable,
        tipoVariableOriginal: this.props.tipoVariableOriginal,
        actualizarIDVariableModificada: this.props.actualizarIDVariableModificada,
        goToTimeline: this.props.goToTimeline,
        eliminarVarExcel: this.props.eliminarVarExcel,
        getExcel: this.props.getExcel,
        limpiarArreglos: this.props.limpiarArreglos,
        permision: this.props.permision,
        userID: this.props.userID,
        userName: this.props.userName,
        changeStateFirstTimeToTrue: this.props.changeStateFirstTimeToTrue
      }) : null), _react["default"].createElement("div", {
        className: "border-bottom",
        style: {
          width: "100%",
          height: "30px",
          overflowX: "scroll"
        }
      }, _react["default"].createElement("div", {
        onClick: this.mostrarFuenteDatoExcel,
        className: "border-right addPointer",
        style: {
          width: "33%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "float": "left",
          backgroundColor: !this.props.estadoVistaVariable.mostrarFuenteDatoExcel ? "#f5f5f5" : ""
        }
      }, "Excel"), _react["default"].createElement("div", {
        onClick: this.mostrarFuenteDatoForma,
        className: "border-right addPointer",
        style: {
          width: "33%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "float": "left",
          backgroundColor: !this.props.estadoVistaVariable.mostrarFuenteDatoForma ? "#f5f5f5" : ""
        }
      }, "Forma"), _react["default"].createElement("div", {
        onClick: this.mostrarFuenteDatoVariable,
        className: "addPointer",
        style: {
          width: "34%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "float": "left",
          backgroundColor: !this.props.estadoVistaVariable.mostrarFuenteDatoVariable ? "#f5f5f5" : ""
        }
      }, "Variable"))))));
    }
  }]);

  return EditarVariable;
}(_react["default"].Component);

exports["default"] = EditarVariable;
//# sourceMappingURL=EditarVariable.js.map
