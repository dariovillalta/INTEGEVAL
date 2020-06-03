"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _CrearVariable = _interopRequireDefault(require("./CrearVariable.js"));

var _InstruccionVariable = _interopRequireDefault(require("../../../InstruccionVariable.js"));

var _Formula = _interopRequireDefault(require("../../../Formula.js"));

var _InstruccionSQL = _interopRequireDefault(require("./InstruccionSQL.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var campoSeleccionado, valorSeleccionado, valorSeleccionadoTexto, operacionSeleccionada, objetoConexionSeleccionada;
var tipoDeAsignacionSeleccionado = ''; //para saber el tipo de asignacion que se debera hacer al atributo / campo

var indiceFormulaSeleccionadaEdit = -1;
/*COMPONENTE PARA MANEJRA CAMBIO DE VISTA ENTRE CREAR VARIABLE Y VISTA DE CONDICIONES / INSTRUCIONES*/

/*MANEJA TODA LA LOGICA CREAR FUENTE DATO VARIABLE (OBJETO)*/

/*              ARREGLO DE ATRIBUTOS               */

/* CADA POSICION REPRESENTA UN CAMPO / ATRIBUTO / COLUMNA */

/*
    [ {nombre: "IDCLIENTE"}, {nombre: "NOMBRECLIENTE"} ]
*/

/*              ARREGLO DE SEGMENTO DE REGLAS               */

/* CADA POSICION REPRESENTA UNA CONDICION IF PERTENECIENTE AL ATRIBUTO CORRESPONDIENTE A LA POSICION DEL ATRIBUTO */

/*
    [ [{esConexionTabla: FALSE}, {esConexionTabla: TRUE}], [{esConexionTabla: FALSE}, {esConexionTabla: TRUE}] ]
*/

/*              ARREGLO DE REGLAS               */

/* CADA POSICION REPRESENTA UNA REGLA PERTENECIENTE AL SEGMENTO DE REGLAS CORRESPONDIENTE A LA POSICION DEL SEGMENTO DE REGLAS DENTRO DE LA POSICION DEL ATRIBUTO */

/*
    [ [[{esCondicion: FALSE}], [{esCondicion: TRUE, esCondicion: FALSE}]], [[{esCondicion: FALSE}], [{esCondicion: FALSE}]] ]
*/

/*              ARREGLO DE FORMULAS               */

/* CADA POSICION REPRESENTA UNA FORMULA PERTENECIENTE AL ATRIBUTO CORRESPONDIENTE A LA POSICION DEL ATRIBUTO */

/*
    [ [{formula: "x + y"}, {formula: "2x + 2y"}], [{formula: "3x + 3y"}] ]
*/

/*              ARREGLO DE ELEMENTOS DE FORMULAS               */

/* CADA POSICION REPRESENTA UN ELEMENTO DE FORMULA PERTENECIENTE A LA FORMULA CORRESPONDIENTE A LA POSICION DE LA FORMULA DENTRO DE LA POSICION DEL ATRIBUTO */

/*
    [ [[{formula: "sum(saldo)"}, {formula: "asig(impuesto)"}], []], [[{formula: "sum(saldo)"}], []] ]
*/

var nivelNuevoAtributoVarios = 0; //nivel del nuevo atributo a agregar | cambia con al seleccionar regla, o agregar variable a una formula

var nivelNuevoAtributoUnico = 0; //nivel del nuevo atributo a agregar | cambia con al seleccionar regla, o agregar variable a una formula

var indiceSeleccionadoSegmentoReglas = -1; //indice seleccionado del segmento al que pertenece la regla

var indiceSeleccionadoReglas = -1; //indice seleccionado de la regla dentro del segmento

var tipoElementoSeleccionadoRegla = ''; //tipo de seleccion de cursor de regla: esOtraRegla, arriba, abajo

var posicionAtributoSeleccionado = -1; //posicion del arreglo donde se debe insertar el siguiente atributo / campo /  columna (para controlar cuando se agrega condiciones / instrucciones a un nuevo atributo)

var indiceSeleccionadoFormula = -1; //indice seleccionado formula

var nombreVariable = '';
var descripcionVariable = '';
var fechaInicioVariable = '';
var periodicidadVariable = '';
var analistaVariable = '';
var nombreCampoNuevoAtributosVario = '';
var atributosVario = [];
var reglasVariosAtributos = [];
var segmentoReglasVariosAtributos = [];
var formulasVariosAtributos = [];
var elementosFormulasVariosAtributos = [];
var atributosUnico = [];
var reglasUnAtributo = [];
var segmentoReglasUnAtributo = [];
var formulasUnAtributo = [];
var elementosFormulasUnAtributos = [];
var variablesSQL = [];
var instruccionSQL = '';
var banderaEsObjeto = true; //bandera para saber si la variable actual es objeto o no a traves de las diferentes vistas / componentes

var banderaEsInstruccionSQL = true; //bandera para saber si la variable actual es instruccion SQL o no a traves de las diferentes vistas / componentes

var contadorObjetosAGuardar = 0; //bandera que lleva el total de objetos a guardar para limpiar los arreglos despues

var contadorObjetosGuardados = 0; //bandera que lleva el total de objetos a guardar para limpiar los arreglos despues

var CrearVariablesHome =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CrearVariablesHome, _React$Component);

  function CrearVariablesHome(props) {
    var _this;

    _classCallCheck(this, CrearVariablesHome);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CrearVariablesHome).call(this, props));
    _this.state = {
      componenteActual: 'crearVariable',
      atributos: [],
      reglas: [],
      formulas: [],
      esCondicion: true,
      //bandera para estado de nueva regla / instruccion, saber si es nueva comparacion o regla / instruccion = verdadero; si es falso = es nueva formula / asignacion
      navbar: "",
      tipoNuevaVariable: tipoDeAsignacionSeleccionado,
      camposInstruccionSQL: [],
      comandoSQL: "",
      variables: [],
      excel: [],
      formas: [],
      esEditarVar: false,
      esOperacionSQL: false,
      operacionSQL: "",
      formulaSeleccionadaEdit: null,
      condicionFormula: "",
      condicionElemento: ""
    };
    _this.loadRules = _this.loadRules.bind(_assertThisInitialized(_this));
    _this.sortRules = _this.sortRules.bind(_assertThisInitialized(_this));
    _this.returnToCreateVariable = _this.returnToCreateVariable.bind(_assertThisInitialized(_this));
    _this.goToCreateConditions = _this.goToCreateConditions.bind(_assertThisInitialized(_this));
    _this.goToCreateConditionsClickNavBarFormula = _this.goToCreateConditionsClickNavBarFormula.bind(_assertThisInitialized(_this));
    _this.goToCreateFormula = _this.goToCreateFormula.bind(_assertThisInitialized(_this));
    _this.goCreateVariableFieldSQL = _this.goCreateVariableFieldSQL.bind(_assertThisInitialized(_this));
    _this.createVariable = _this.createVariable.bind(_assertThisInitialized(_this));
    _this.getVariableID = _this.getVariableID.bind(_assertThisInitialized(_this));
    _this.createVariableSQL = _this.createVariableSQL.bind(_assertThisInitialized(_this));
    _this.createInstructionSQL = _this.createInstructionSQL.bind(_assertThisInitialized(_this));
    _this.createVariableField = _this.createVariableField.bind(_assertThisInitialized(_this));
    _this.getVariableFieldID = _this.getVariableFieldID.bind(_assertThisInitialized(_this));
    _this.createVariableFieldRuleSegments = _this.createVariableFieldRuleSegments.bind(_assertThisInitialized(_this));
    _this.getVariableFieldRuleSegments = _this.getVariableFieldRuleSegments.bind(_assertThisInitialized(_this));
    _this.createVariableFieldRules = _this.createVariableFieldRules.bind(_assertThisInitialized(_this));
    _this.traerRegla = _this.traerRegla.bind(_assertThisInitialized(_this));
    _this.createVariableFieldFormula = _this.createVariableFieldFormula.bind(_assertThisInitialized(_this));
    _this.getVariableFieldFormulaID = _this.getVariableFieldFormulaID.bind(_assertThisInitialized(_this));
    _this.createVariableFieldFormulaElement = _this.createVariableFieldFormulaElement.bind(_assertThisInitialized(_this));
    _this.retornarCampo = _this.retornarCampo.bind(_assertThisInitialized(_this));
    _this.actualizarCondicion = _this.actualizarCondicion.bind(_assertThisInitialized(_this));
    _this.cambioDeArreglosDeAtributos = _this.cambioDeArreglosDeAtributos.bind(_assertThisInitialized(_this));
    _this.guardarVariable = _this.guardarVariable.bind(_assertThisInitialized(_this));
    _this.guardarVariableSQL = _this.guardarVariableSQL.bind(_assertThisInitialized(_this));
    _this.guardarVariableUnAtributo = _this.guardarVariableUnAtributo.bind(_assertThisInitialized(_this));
    _this.guardarVariableVariosAtributo = _this.guardarVariableVariosAtributo.bind(_assertThisInitialized(_this));
    _this.crearAtributoVariable = _this.crearAtributoVariable.bind(_assertThisInitialized(_this));
    _this.eliminarAtributoVariable = _this.eliminarAtributoVariable.bind(_assertThisInitialized(_this));
    _this.modificarNombreVariable = _this.modificarNombreVariable.bind(_assertThisInitialized(_this));
    _this.crearVariableSQL = _this.crearVariableSQL.bind(_assertThisInitialized(_this));
    _this.crearInstruccionSQL = _this.crearInstruccionSQL.bind(_assertThisInitialized(_this));
    _this.anadirRegla = _this.anadirRegla.bind(_assertThisInitialized(_this));
    _this.anadirFormula = _this.anadirFormula.bind(_assertThisInitialized(_this));
    _this.getElementsFromFormula = _this.getElementsFromFormula.bind(_assertThisInitialized(_this));
    _this.modificarRegla = _this.modificarRegla.bind(_assertThisInitialized(_this));
    _this.eliminarRegla = _this.eliminarRegla.bind(_assertThisInitialized(_this));
    _this.modificarFormula = _this.modificarFormula.bind(_assertThisInitialized(_this));
    _this.eliminarFormula = _this.eliminarFormula.bind(_assertThisInitialized(_this));
    _this.retornoCampoFormula = _this.retornoCampoFormula.bind(_assertThisInitialized(_this));
    _this.retornoCampoCondicion = _this.retornoCampoCondicion.bind(_assertThisInitialized(_this));
    _this.retornarValor = _this.retornarValor.bind(_assertThisInitialized(_this));
    _this.retornoOperacion = _this.retornoOperacion.bind(_assertThisInitialized(_this));
    _this.actualizarIndiceSeleccionadoReglas = _this.actualizarIndiceSeleccionadoReglas.bind(_assertThisInitialized(_this));
    _this.actualizarEstadoSiEsObjeto = _this.actualizarEstadoSiEsObjeto.bind(_assertThisInitialized(_this));
    _this.actualizarEstadoSiEsInstruccionSQL = _this.actualizarEstadoSiEsInstruccionSQL.bind(_assertThisInitialized(_this));
    _this.actualizarNivelNuevaRegla = _this.actualizarNivelNuevaRegla.bind(_assertThisInitialized(_this));
    _this.actualizarSeleccionFormula = _this.actualizarSeleccionFormula.bind(_assertThisInitialized(_this));
    _this.actualizarNombreVariable = _this.actualizarNombreVariable.bind(_assertThisInitialized(_this));
    _this.actualizarDescripcionVariable = _this.actualizarDescripcionVariable.bind(_assertThisInitialized(_this));
    _this.actualizarFechaInicio = _this.actualizarFechaInicio.bind(_assertThisInitialized(_this));
    _this.actualizarPeriodicidad = _this.actualizarPeriodicidad.bind(_assertThisInitialized(_this));
    _this.actualizarNombreEncargado = _this.actualizarNombreEncargado.bind(_assertThisInitialized(_this));
    _this.actualizarNombreCampoNuevoAtributosVario = _this.actualizarNombreCampoNuevoAtributosVario.bind(_assertThisInitialized(_this));
    _this.retornarCodigoOperacion = _this.retornarCodigoOperacion.bind(_assertThisInitialized(_this));
    _this.getVariables = _this.getVariables.bind(_assertThisInitialized(_this));
    _this.getExcel = _this.getExcel.bind(_assertThisInitialized(_this));
    _this.getFormas = _this.getFormas.bind(_assertThisInitialized(_this));
    _this.verificarNoExisteNombreVar = _this.verificarNoExisteNombreVar.bind(_assertThisInitialized(_this));
    _this.verificarNoExisteNombreCampo = _this.verificarNoExisteNombreCampo.bind(_assertThisInitialized(_this));
    _this.actualizarCampoSQL = _this.actualizarCampoSQL.bind(_assertThisInitialized(_this));
    _this.eliminarCampoSQL = _this.eliminarCampoSQL.bind(_assertThisInitialized(_this));
    _this.isValidDate = _this.isValidDate.bind(_assertThisInitialized(_this));
    _this.hasWhiteSpace = _this.hasWhiteSpace.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CrearVariablesHome, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getVariables();
      this.getExcel();
      this.getFormas();
    }
  }, {
    key: "loadRules",
    value: function loadRules() {
      //FINISH
      this.sortRules();
    }
  }, {
    key: "sortRules",
    value: function sortRules() {
      var tempCopy = _toConsumableArray(this.state.reglas);

      for (var i = 0; i < tempCopy.length; i++) {
        tempCopy[i];
      }

      ;
    }
  }, {
    key: "returnToCreateVariable",
    value: function returnToCreateVariable() {
      this.setState({
        componenteActual: "crearVariable"
      });
    }
  }, {
    key: "goToCreateConditions",
    value: function goToCreateConditions(indice) {
      var navbar = _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Condiciones"), _react["default"].createElement("div", {
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
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.returnToCreateVariable
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Crear Variable")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Condiciones")))))));

      posicionAtributoSeleccionado = indice; //tipoElementoSeleccionado = tipoIndice;

      var formulas, reglas;
      var posicionSel = posicionAtributoSeleccionado; //indice = -1 cuando se va a condiciones de un campo nuevo
      //cuando se presiona NavBar indice es igual indice anterior
      //cuando se selecciona un campo existente indice = posicion campo

      if (posicionAtributoSeleccionado == -1) {
        posicionSel = this.state.atributos.length;
      }

      if (banderaEsObjeto) {
        formulas = formulasVariosAtributos;
        reglas = reglasVariosAtributos;
      } else {
        formulas = formulasUnAtributo;
        reglas = reglasUnAtributo;
      }

      if (formulas[posicionSel] == undefined) formulas[posicionSel] = [];
      if (reglas[posicionSel] == undefined) reglas[posicionSel] = [];
      this.setState({
        componenteActual: "variableCondiciones",
        navbar: navbar,
        formulas: formulas[posicionSel],
        reglas: reglas[posicionSel]
      });
    }
  }, {
    key: "goToCreateConditionsClickNavBarFormula",
    value: function goToCreateConditionsClickNavBarFormula() {
      this.goToCreateConditions(posicionAtributoSeleccionado);
    }
  }, {
    key: "goToCreateFormula",
    value: function goToCreateFormula(indice, esEditarVarN) {
      var navbar = _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Condiciones"), _react["default"].createElement("div", {
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
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.returnToCreateVariable
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Crear Variable")), _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.goToCreateConditionsClickNavBarFormula
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Condiciones")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Crear F\xF3rmula")))))));

      var esOperacionSQL, operacionSQL;

      if (posicionAtributoSeleccionado == -1) {
        esOperacionSQL = false;
        operacionSQL = "";
      }

      if (this.state.formulaSeleccionadaEdit != null) {
        if (this.state.formulaSeleccionadaEdit.operacion.localeCompare("ASIG") == 0 || this.state.formulaSeleccionadaEdit.operacion.localeCompare("COUNT") == 0 || this.state.formulaSeleccionadaEdit.operacion.localeCompare("PROM") == 0 || this.state.formulaSeleccionadaEdit.operacion.localeCompare("MAX") == 0 || this.state.formulaSeleccionadaEdit.operacion.localeCompare("MIN") == 0 || this.state.formulaSeleccionadaEdit.operacion.localeCompare("SUM") == 0 || this.state.formulaSeleccionadaEdit.operacion.localeCompare("AUTOSUM") == 0) {
          esOperacionSQL = true;
          operacionSQL = this.state.formulaSeleccionadaEdit.operacion;
        } else {
          esOperacionSQL = false;
          operacionSQL = "";
        }
      } //deseleccionado regla seleccionada


      indiceSeleccionadoReglas = -1;
      indiceSeleccionadoFormula = indice;
      this.setState({
        componenteActual: "variableFormula",
        navbar: navbar,
        esEditarVar: esEditarVarN,
        esOperacionSQL: esOperacionSQL,
        operacionSQL: operacionSQL
      });
    }
  }, {
    key: "goCreateVariableFieldSQL",
    value: function goCreateVariableFieldSQL() {
      var navbar = _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Condiciones"), _react["default"].createElement("div", {
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
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.returnToCreateVariable
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Crear Variable")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Instrucci\xF3n SQL")))))));

      this.setState({
        navbar: navbar,
        componenteActual: "variableSQL"
      });
    }
  }, {
    key: "createVariable",
    value: function createVariable(variable, campos) {
      var _this2 = this;

      //validaciones existe por lo menos regla asignar
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into Variables (nombre, descripcion, esObjeto, esColeccion, objetoPadreID, esInstruccionSQL, guardar, periodicidad, analista, fechaInicioCalculo) values ('" + variable.nombre + "', '" + variable.descripcion + "', '" + variable.esObjeto + "', '" + variable.esColeccion + "', " + variable.objetoPadreID + ", '" + variable.esInstruccionSQL + "', '" + variable.guardar + "', '" + variable.periodicidad + "', '" + variable.analista + "', '" + variable.fechaInicioCalculo.getFullYear() + "-" + (variable.fechaInicioCalculo.getMonth() + 1) + "-" + variable.fechaInicioCalculo.getDate() + "')", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              contadorObjetosGuardados++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              alert("variable creada.");
              nombreVariable = '';
              descripcionVariable = '';
              $("#nombreFuenteDato").val("");
              $("#descripcionFuenteDato").val("");
              contadorObjetosGuardados++;
              var formulas, segmentoRegla, reglas, elementosFormulas;

              if (banderaEsObjeto) {
                formulas = formulasVariosAtributos;
                segmentoRegla = segmentoReglasVariosAtributos;
                reglas = reglasVariosAtributos;
                elementosFormulas = elementosFormulasVariosAtributos;
              } else {
                formulas = formulasUnAtributo;
                segmentoRegla = segmentoReglasUnAtributo;
                reglas = reglasUnAtributo;
                elementosFormulas = elementosFormulasUnAtributos;
              }

              console.log('formulas');
              console.log(formulas);
              console.log('segmentoRegla');
              console.log(segmentoRegla);
              console.log('reglas');
              console.log(reglas);
              console.log('elementosFormulas');
              console.log(elementosFormulas);

              _this2.getVariableID(variable, campos);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getVariableID",
    value: function getVariableID(variable, campos) {
      var _this3 = this;

      //validaciones existe por lo menos regla asignar
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select top 1 * from Variables order by ID desc", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                if (banderaEsInstruccionSQL) {
                  _this3.createVariableSQL(result.recordset[0]);
                } else {
                  for (var i = 0; i < campos.length; i++) {
                    contadorObjetosAGuardar++;

                    _this3.createVariableField(result.recordset[0], campos[i], i);
                  }

                  ;
                }
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "createVariableSQL",
    value: function createVariableSQL(variable) {
      var _this4 = this;

      var _loop = function _loop(i) {
        var nombre = variablesSQL[i].nombre;
        var tipo = variablesSQL[i].tipo;
        var transaction = new _mssql["default"].Transaction(_this4.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("insert into InstruccionSQLCampos (variableID, nombre, tipo) values (" + variable.ID + ", '" + nombre + "', '" + tipo + "')", function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                if (i == variablesSQL.length - 1) _this4.createInstructionSQL(variable);
              });
            }
          });
        }); // fin transaction
      };

      for (var i = 0; i < variablesSQL.length; i++) {
        _loop(i);
      }

      ;
    }
  }, {
    key: "createInstructionSQL",
    value: function createInstructionSQL(variable) {
      var _this5 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into InstruccionSQL (variableID, instruccionSQL) values (" + variable.ID + ", '" + instruccionSQL + "')", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this5.limpiarArreglos();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "createVariableField",
    value: function createVariableField(variable, variableCampo, posicionAtributo) {
      var _this6 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into VariablesCampos (variableID, nombre, tipo, nivel) values (" + variable.ID + ", '" + variableCampo.nombre + "', '" + variableCampo.tipo + "', " + variableCampo.nivel + ")", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              contadorObjetosGuardados++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              //this.props.terminoCrearCampo(variable, variableCampo);
              contadorObjetosGuardados++;

              _this6.getVariableFieldID(variable, variableCampo, posicionAtributo);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getVariableFieldID",
    value: function getVariableFieldID(variable, variableCampo, posicionAtributo) {
      var _this7 = this;

      //validaciones existe por lo menos regla asignar
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from VariablesCampos where nombre = '" + variableCampo.nombre + "' and variableID = " + variable.ID, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var formulas, segmentoRegla;

              if (banderaEsObjeto) {
                formulas = formulasVariosAtributos;
                segmentoRegla = segmentoReglasVariosAtributos;
              } else {
                formulas = formulasUnAtributo;
                segmentoRegla = segmentoReglasUnAtributo;
              }

              var arregloDeFormulasALlamar = [],
                  arregloElementosDeFormulasALlamar = [];

              for (var j = 0; j < formulas[posicionAtributo].length; j++) {
                if (arregloDeFormulasALlamar[posicionAtributo] == undefined) arregloDeFormulasALlamar[posicionAtributo] = [];
                arregloDeFormulasALlamar[posicionAtributo].push(j);
                if (arregloElementosDeFormulasALlamar[posicionAtributo] == undefined) arregloElementosDeFormulasALlamar[posicionAtributo] = [];
                formulas[posicionAtributo][j].posicionFormulaEnCampo = j;
                contadorObjetosAGuardar++;

                _this7.createVariableFieldFormula(variable, result.recordset[0], formulas[posicionAtributo][j], posicionAtributo, j, arregloDeFormulasALlamar, arregloElementosDeFormulasALlamar);
              }

              ;

              if (formulas[posicionAtributo].length == 0) {
                var arregloDeSegmentosALlamar = [],
                    arregloReglasDeSegmentosALlamar = [];

                for (var j = 0; j < segmentoRegla[posicionAtributo].length; j++) {
                  if (arregloDeSegmentosALlamar[posicionAtributo] == undefined) arregloDeSegmentosALlamar[posicionAtributo] = [];
                  arregloDeSegmentosALlamar[posicionAtributo].push(j);
                  if (arregloReglasDeSegmentosALlamar[posicionAtributo] == undefined) arregloReglasDeSegmentosALlamar[posicionAtributo] = [];
                  segmentoRegla[posicionAtributo][j].posicionSegmentoEnCampo = j;
                  contadorObjetosAGuardar++;

                  _this7.createVariableFieldRuleSegments(variable, result.recordset[0], segmentoRegla[posicionAtributo][j], posicionAtributo, j, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar);
                }

                ;
              }

              if (formulas[posicionAtributo].length == 0 && segmentoRegla[posicionAtributo].length == 0) {
                console.log('HOLA 1');

                _this7.limpiarArreglos();
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "createVariableFieldRuleSegments",
    value: function createVariableFieldRuleSegments(variable, variableCampo, segmento, posicionAtributo, posicionSegmento, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar) {
      var _this8 = this;

      //los campos variableID y variableCampoID se ponen luego de la creacion e importacion
      //el campo variableIDCreacionCodigo es el variableID de segmento asignado al crear reglas
      console.log('=============    3');
      console.log('Crear Segmento');
      console.log('variable');
      console.log(variable);
      console.log('variableCampo');
      console.log(variableCampo);
      console.log('segmento');
      console.log(segmento);
      console.log('posicionAtributo');
      console.log(posicionAtributo);
      console.log('posicionSegmento');
      console.log(posicionSegmento);
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into SegmentoReglasVariables (conexionTablaID, variableID, variableCampoID, variableIDCreacionCodigo, excelArchivoID, excelVariableID, formaVariableID, esConexionTabla, esValorManual, posicionSegmentoEnCampo, nivelMax) values (" + segmento.conexionTablaID + ", " + variable.ID + ", " + variableCampo.ID + ", " + segmento.variableID + ", " + segmento.excelArchivoID + ", " + segmento.excelVariableID + ", " + segmento.formaVariableID + ", '" + segmento.esConexionTabla + "', '" + segmento.esValorManual + "', " + posicionSegmento + ", " + segmento.nivelMax + ")", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              contadorObjetosGuardados++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              contadorObjetosGuardados++;

              _this8.getVariableFieldRuleSegments(variable, variableCampo, segmento, posicionAtributo, posicionSegmento, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getVariableFieldRuleSegments",
    value: function getVariableFieldRuleSegments(variable, variableCampo, segmento, posicionAtributo, posicionSegmento, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar) {
      var _this9 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from SegmentoReglasVariables where conexionTablaID = " + segmento.conexionTablaID + " and variableID = " + variable.ID + " and variableCampoID = " + variableCampo.ID + " and variableIDCreacionCodigo = " + segmento.variableID + " and esConexionTabla = '" + segmento.esConexionTabla + "' and posicionSegmentoEnCampo = " + posicionSegmento + " and nivelMax = " + segmento.nivelMax, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log('resultado FormulasVariablesCampos');
              console.log(result.recordset);

              if (result.recordset.length > 0) {
                var reglas, formulas, segmento, segmentoRegla;

                if (banderaEsObjeto) {
                  reglas = reglasVariosAtributos;
                  formulas = formulasVariosAtributos;
                  segmentoRegla = segmentoReglasVariosAtributos;
                } else {
                  reglas = reglasUnAtributo;
                  formulas = formulasUnAtributo;
                  segmentoRegla = segmentoReglasUnAtributo;
                }

                for (var i = 0; i < arregloDeSegmentosALlamar[posicionAtributo].length; i++) {
                  if (arregloDeSegmentosALlamar[posicionAtributo][i] == posicionSegmento) {
                    arregloDeSegmentosALlamar[posicionAtributo].splice(i, 1);
                    if (arregloDeSegmentosALlamar[posicionAtributo] != undefined && arregloDeSegmentosALlamar[posicionAtributo].length == 0) arregloDeSegmentosALlamar.splice(posicionAtributo, 1);
                    break;
                  }
                }

                ;

                for (var k = 0; k < reglas[posicionAtributo][posicionSegmento].length; k++) {
                  if (arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento] == undefined) arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento] = [];
                  arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento].push(k);
                }

                ; //lamar solo la primer regla o sea regla padre

                reglas[posicionAtributo][posicionSegmento][0].segmentoReglaID = result.recordset[0].ID; //crear reglas que sean de comparacion (esCondicion = verdadero)

                if (reglas[posicionAtributo][posicionSegmento][0].esCondicion) {
                  contadorObjetosAGuardar++;

                  _this9.createVariableFieldRules(variable, variableCampo, result.recordset[0], reglas[posicionAtributo][posicionSegmento][0], posicionAtributo, posicionSegmento, 0, arregloReglasDeSegmentosALlamar, -1);
                } else if (!reglas[posicionAtributo][posicionSegmento][0].esCondicion) {
                  contadorObjetosAGuardar++; //crear reglas que sean de asignacion (esCondicion = falso) con el id de formula correcto

                  console.log('formulas');
                  console.log(formulas);
                  console.log('reglas');
                  console.log(reglas);

                  for (var i = 0; i < formulas[posicionAtributo].length; i++) {
                    if (i == reglas[posicionAtributo][posicionSegmento][0].formulaID) {
                      console.log('ENCONTRO');
                      reglas[posicionAtributo][posicionSegmento][0].formulaID = formulas[posicionAtributo][i].ID;
                      break;
                    }
                  }

                  ;

                  _this9.createVariableFieldRules(variable, variableCampo, result.recordset[0], reglas[posicionAtributo][posicionSegmento][0], posicionAtributo, posicionSegmento, 0, arregloReglasDeSegmentosALlamar, -1);
                }

                if (arregloDeSegmentosALlamar.length == 0 && arregloReglasDeSegmentosALlamar.length == 0) {
                  console.log('HOLA 2');

                  _this9.limpiarArreglos();
                }
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "createVariableFieldRules",
    value: function createVariableFieldRules(variable, variableCampo, segmento, regla, posicionAtributo, posicionSegmento, posicionRegla, arregloReglasDeSegmentosALlamar, reglaPadreID) {
      var _this10 = this;

      console.log('=============    4');
      console.log('Crear Regla');
      console.log('variable');
      console.log(variable);
      console.log('variableCampo');
      console.log(variableCampo);
      console.log('segmento');
      console.log(segmento);
      console.log('regla');
      console.log(regla);
      console.log('posicionAtributo');
      console.log(posicionAtributo);
      console.log('posicionSegmento');
      console.log(posicionSegmento);
      console.log('posicionRegla');
      console.log(posicionRegla);

      if (regla != undefined) {
        console.log('variable');
        console.log(variable);
        console.log('variableCampo');
        console.log(variableCampo);
        console.log('segmento');
        console.log(segmento);
        console.log('regla');
        console.log(regla);
        console.log('posicionAtributo');
        console.log(posicionAtributo);
        console.log('posicionSegmento');
        console.log(posicionSegmento);
        console.log('posicionRegla');
        console.log(posicionRegla);
        console.log('reglaPadreID');
        console.log(reglaPadreID);
        var transaction = new _mssql["default"].Transaction(this.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("insert into ReglasVariables (segmentoReglaID, variableID, variableCampoID, formulaID, reglaPadreID, conexionTablaID, nombreColumnaEnTabla, tipoCampoObjetivo, esCondicion, esConexionTabla, posicionSegmentoEnCampo, operacion, operacionTexto, valor, texto, nivel) values (" + segmento.ID + ", " + variable.ID + ", " + variableCampo.ID + ", " + regla.formulaID + ", " + reglaPadreID + ", " + regla.conexionTablaID + ", '" + regla.nombreColumnaEnTabla + "', '" + regla.tipoCampoObjetivo + "', '" + regla.esCondicion + "', '" + regla.esConexionTabla + "', " + posicionSegmento + ", '" + regla.operacion + "', '" + regla.operacionTexto + "', '" + regla.valor + "', '" + regla.texto + "', " + regla.nivel + ")", function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                contadorObjetosGuardados++;

                _this10.limpiarArreglos();

                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                contadorObjetosGuardados++;
                var segmentoRegla;

                if (banderaEsObjeto) {
                  segmentoRegla = segmentoReglasVariosAtributos;
                } else {
                  segmentoRegla = segmentoReglasUnAtributo;
                }

                if (arregloReglasDeSegmentosALlamar[posicionAtributo] != undefined && arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento] != undefined) {
                  for (var i = 0; i < arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento].length; i++) {
                    if (arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento][i] == posicionRegla) {
                      arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento].splice(i, 1);

                      if (arregloReglasDeSegmentosALlamar[posicionAtributo][posicionSegmento].length == 0) {
                        arregloReglasDeSegmentosALlamar[posicionAtributo].splice(posicionSegmento, 1);
                      }

                      break;
                    }
                  }

                  ;
                }

                if (arregloReglasDeSegmentosALlamar.length == 0) {
                  console.log('HOLA 3');

                  _this10.limpiarArreglos();
                } else {
                  _this10.traerRegla(variable, variableCampo, segmento, regla, posicionAtributo, posicionSegmento, posicionRegla, arregloReglasDeSegmentosALlamar, reglaPadreID);
                }
              });
            }
          });
        }); // fin transaction
      } else {
        console.log('HOLA 4');
        this.limpiarArreglos();
      }
    }
  }, {
    key: "traerRegla",
    value: function traerRegla(variable, variableCampo, segmento, regla, posicionAtributo, posicionSegmento, posicionRegla, arregloReglasDeSegmentosALlamar, reglaPadreID) {
      var _this11 = this;

      console.log('=============   5');
      console.log('variable');
      console.log(variable);
      console.log('variableCampo');
      console.log(variableCampo);
      console.log('segmento');
      console.log(segmento);
      console.log('regla');
      console.log(regla);
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ReglasVariables where segmentoReglaID = " + segmento.ID + " and variableID = " + variable.ID + " and variableCampoID = " + variableCampo.ID + " and formulaID = " + regla.formulaID + " and reglaPadreID =  " + reglaPadreID + " and conexionTablaID = " + regla.conexionTablaID + " and nombreColumnaEnTabla = '" + regla.nombreColumnaEnTabla + "' and tipoCampoObjetivo = '" + regla.tipoCampoObjetivo + "' and esCondicion = '" + regla.esCondicion + "' and esConexionTabla = '" + regla.esConexionTabla + "' and posicionSegmentoEnCampo = " + posicionSegmento + " and operacion = '" + regla.operacion + "' and operacionTexto = '" + regla.operacionTexto + "' and valor = '" + regla.valor + "' and texto = '" + regla.texto + "' and nivel = " + regla.nivel, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              contadorObjetosGuardados++;

              _this11.limpiarArreglos();

              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                var reglas, formulas;

                if (banderaEsObjeto) {
                  reglas = reglasVariosAtributos;
                  formulas = formulasVariosAtributos;
                } else {
                  reglas = reglasUnAtributo;
                  formulas = formulasUnAtributo;
                }

                console.log('posicionAtributo');
                console.log(posicionAtributo);
                console.log('posicionSegmento');
                console.log(posicionSegmento);
                console.log('posicionRegla+1');
                console.log(posicionRegla + 1);
                console.log('reglas');
                console.log(reglas);
                console.log('result.recordset');
                console.log(result.recordset[0]);

                if (reglas[posicionAtributo] != undefined && reglas[posicionAtributo][posicionSegmento] != undefined && reglas[posicionAtributo][posicionSegmento][posicionRegla + 1] != undefined) {
                  if (reglas[posicionAtributo][posicionSegmento][posicionRegla + 1].esCondicion) {
                    contadorObjetosAGuardar++;

                    _this11.createVariableFieldRules(variable, variableCampo, segmento, reglas[posicionAtributo][posicionSegmento][posicionRegla + 1], posicionAtributo, posicionSegmento, posicionRegla + 1, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                  } else if (!reglas[posicionAtributo][posicionSegmento][posicionRegla + 1].esCondicion) {
                    contadorObjetosAGuardar++; //crear reglas que sean de asignacion (esCondicion = falso) con el id de formula correcto

                    for (var i = 0; i < formulas[posicionAtributo].length; i++) {
                      if (i == reglas[posicionAtributo][posicionSegmento][posicionRegla + 1].formulaID) {
                        reglas[posicionAtributo][posicionSegmento][posicionRegla + 1].formulaID = formulas[posicionAtributo][i].ID;
                        break;
                      }
                    }

                    ;

                    _this11.createVariableFieldRules(variable, variableCampo, segmento, reglas[posicionAtributo][posicionSegmento][posicionRegla + 1], posicionAtributo, posicionSegmento, posicionRegla + 1, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                  }
                }
                /*else if(reglas[posicionAtributo] != undefined && reglas[posicionAtributo][posicionSegmento+1] != undefined) {
                  if(reglas[posicionAtributo][posicionSegmento+1][posicionRegla].esCondicion) {
                      contadorObjetosAGuardar++;
                      this.createVariableFieldRules(variable, variableCampo, segmento, reglas[posicionAtributo][posicionSegmento+1][posicionRegla], posicionAtributo, posicionSegmento+1, 0, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                  } else if(!reglas[posicionAtributo][posicionSegmento+1][posicionRegla].esCondicion) {
                      contadorObjetosAGuardar++;
                      //crear reglas que sean de asignacion (esCondicion = falso) con el id de formula correcto
                      for (var i = 0; i < formulas[posicionAtributo].length; i++) {
                          if(i == reglas[posicionAtributo][posicionSegmento+1][posicionRegla].formulaID) {
                              reglas[posicionAtributo][posicionSegmento+1][posicionRegla].formulaID = formulas[posicionAtributo][i].ID;
                              break;
                          }
                      };
                      this.createVariableFieldRules(variable, variableCampo, segmento, reglas[posicionAtributo][posicionSegmento+1][posicionRegla], posicionAtributo, posicionSegmento+1, 0, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                  }
                } else if(reglas[posicionAtributo+1] != undefined) {
                  if(reglas[posicionAtributo+1][0][0].esCondicion) {
                      contadorObjetosAGuardar++;
                      this.createVariableFieldRules(variable, variableCampo, segmento, reglas[posicionAtributo+1][0][0], posicionAtributo+1, 0, 0, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                  } else if(!reglas[posicionAtributo+1].esCondicion) {
                      contadorObjetosAGuardar++;
                      //crear reglas que sean de asignacion (esCondicion = falso) con el id de formula correcto
                      for (var i = 0; i < formulas[posicionAtributo+1].length; i++) {
                          if(i == reglas[posicionAtributo+1][0][0].formulaID) {
                              reglas[posicionAtributo+1][0][0].formulaID = formulas[posicionAtributo+1][i].ID;
                              break;
                          }
                      };
                      this.createVariableFieldRules(variable, variableCampo, segmento, reglas[posicionAtributo+1][0][0], posicionAtributo+1, 0, 0, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                  }
                }*/
                else {
                    console.log('HOLA 5');

                    _this11.limpiarArreglos();
                  }
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "createVariableFieldFormula",
    value: function createVariableFieldFormula(variable, variableCampo, formula, posicionAtributo, posicionFormula, arregloDeFormulasALlamar, arregloElementosDeFormulasALlamar) {
      var _this12 = this;

      console.log('=============   1');
      console.log('Crear Formula');
      console.log('variable');
      console.log(variable);
      console.log('variableCampo');
      console.log(variableCampo);
      console.log('formula');
      console.log(formula);
      console.log('posicionAtributo');
      console.log(posicionAtributo);
      console.log('posicionFormula');
      console.log(posicionFormula);
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into FormulasVariablesCampos (variableID, variableCampoID, posicionFormulaEnCampo, formula, operacion) values (" + variable.ID + ", " + variableCampo.ID + ", " + posicionFormula + ", '" + formula.formula + "', '" + formula.operacion + "')", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              contadorObjetosGuardados++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              contadorObjetosGuardados++;

              _this12.getVariableFieldFormulaID(variable, variableCampo, formula, posicionAtributo, posicionFormula, arregloDeFormulasALlamar, arregloElementosDeFormulasALlamar);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getVariableFieldFormulaID",
    value: function getVariableFieldFormulaID(variable, variableCampo, formula, posicionAtributo, posicionFormula, arregloDeFormulasALlamar, arregloElementosDeFormulasALlamar) {
      var _this13 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from FormulasVariablesCampos where variableID = " + variable.ID + " and variableCampoID = " + variableCampo.ID + " and posicionFormulaEnCampo = " + posicionFormula, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                var elementosFormulas, segmentoRegla, formulas;

                if (banderaEsObjeto) {
                  elementosFormulas = elementosFormulasVariosAtributos;
                  segmentoRegla = segmentoReglasVariosAtributos;
                  formulas = formulasVariosAtributos;
                } else {
                  elementosFormulas = elementosFormulasUnAtributos;
                  segmentoRegla = segmentoReglasUnAtributo;
                  formulas = formulasUnAtributo;
                }

                var existenSegmentos = false;

                for (var i = 0; i < segmentoRegla.length; i++) {
                  if (segmentoRegla[i].length > 0) {
                    existenSegmentos = true;
                  }
                }

                ;

                for (var i = 0; i < elementosFormulas[posicionAtributo][posicionFormula].length; i++) {
                  if (arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula] == undefined) arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula] = [];
                  arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula].push(i);
                  contadorObjetosAGuardar++;

                  _this13.createVariableFieldFormulaElement(variable, variableCampo, result.recordset[0], elementosFormulas[posicionAtributo][posicionFormula][i], posicionAtributo, posicionFormula, i, arregloElementosDeFormulasALlamar, existenSegmentos);
                }

                ;
                formulas[posicionAtributo][posicionFormula].ID = result.recordset[0].ID;

                if (banderaEsObjeto) {
                  formulasVariosAtributos = formulas;
                } else {
                  formulasUnAtributo = formulas;
                }

                for (var i = 0; i < arregloDeFormulasALlamar[posicionAtributo].length; i++) {
                  if (arregloDeFormulasALlamar[posicionAtributo][i] == posicionFormula) {
                    arregloDeFormulasALlamar[posicionAtributo].splice(i, 1);
                    if (arregloDeFormulasALlamar[posicionAtributo].length == 0) arregloDeFormulasALlamar.splice(posicionAtributo, 1);
                    break;
                  }
                }

                ; //validar que solo sea llamado una vez por cada atributo
                //llamado al final para que hasta que haya traido todos los ids de formula llamar crear segmento

                if (posicionFormula == 0) {
                  var arregloDeSegmentosALlamar = [],
                      arregloReglasDeSegmentosALlamar = [];
                  console.log('posicionAtributo');
                  console.log(posicionAtributo);
                  console.log('segmentoRegla');
                  console.log(segmentoRegla);

                  if (segmentoRegla.length > 0) {
                    for (var j = 0; j < segmentoRegla[posicionAtributo].length; j++) {
                      if (arregloDeSegmentosALlamar[posicionAtributo] == undefined) arregloDeSegmentosALlamar[posicionAtributo] = [];
                      arregloDeSegmentosALlamar[posicionAtributo].push(j);
                      if (arregloReglasDeSegmentosALlamar[posicionAtributo] == undefined) arregloReglasDeSegmentosALlamar[posicionAtributo] = [];
                      contadorObjetosAGuardar++;
                      segmentoRegla[posicionAtributo][j].posicionSegmentoEnCampo = j;

                      _this13.createVariableFieldRuleSegments(variable, variableCampo, segmentoRegla[posicionAtributo][j], posicionAtributo, j, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar);
                    }

                    ;
                  }
                  /*for (var i = 0; i < segmentoRegla.length; i++) {
                      for (var j = 0; j < segmentoRegla[i].length; j++) {
                          if(arregloDeSegmentosALlamar[i] == undefined)
                              arregloDeSegmentosALlamar[i] = [];
                          arregloDeSegmentosALlamar[i].push(j);
                          if(arregloReglasDeSegmentosALlamar[i] == undefined)
                              arregloReglasDeSegmentosALlamar[i] = [];
                          contadorObjetosAGuardar++;
                          segmentoRegla[i][j].posicionSegmentoEnCampo = j;
                          this.createVariableFieldRuleSegments(variable, variableCampo, segmentoRegla[i][j], i, j, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar);
                      };
                  };*/

                }

                if (arregloDeFormulasALlamar.length == 0 && !existenSegmentos) {
                  console.log('HOLA 6');

                  _this13.limpiarArreglos();
                }
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "createVariableFieldFormulaElement",
    value: function createVariableFieldFormulaElement(variable, variableCampo, formula, elemento, posicionAtributo, posicionFormula, posicionElemento, arregloElementosDeFormulasALlamar, existenSegmentos) {
      var _this14 = this;

      //if(elemento != undefined) {
      console.log('=============    2');
      console.log('Crear Elemento Formula');
      console.log('variable');
      console.log(variable);
      console.log('variableCampo');
      console.log(variableCampo);
      console.log('formula');
      console.log(formula);
      console.log('elemento');
      console.log(elemento);
      console.log('posicionAtributo');
      console.log(posicionAtributo);
      console.log('posicionFormula');
      console.log(posicionFormula);
      console.log('posicionElemento');
      console.log(posicionElemento);
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into ElementoFormulasVariablesCampos (variableID, variableCampoID, formulaID, conexionTablaID, esFuenteDeDato, excelArchivoID , excelVariableID , formaVariableID , elementoVariableID, elementoVariableCampoID, esValorManual, nombreColumnaEnTabla, tipoColumnaEnTabla, nombreVariable, descripcion, operacion) values (" + variable.ID + ", " + variableCampo.ID + ", " + formula.ID + ", " + elemento.conexionTablaID + ", '" + elemento.esFuenteDeDato + "', " + elemento.excelArchivoID + ", " + elemento.excelVariableID + ", " + elemento.formaVariableID + ", " + elemento.elementoVariableID + ", " + elemento.elementoVariableCampoID + ", '" + elemento.esValorManual + "', '" + elemento.nombreColumnaEnTabla + "', '" + elemento.tipoColumnaEnTabla + "', '" + elemento.nombreVariable + "', '" + elemento.descripcion + "', '" + elemento.operacion + "')", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              contadorObjetosGuardados++;

              _this14.limpiarArreglos();

              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              contadorObjetosGuardados++;
              /*var segmentoRegla;
              if (banderaEsObjeto) {
                  segmentoRegla = segmentoReglasVariosAtributos;
              } else {
                  segmentoRegla = segmentoReglasUnAtributo;
              }*/

              if (arregloElementosDeFormulasALlamar[posicionAtributo] != undefined && arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula] != undefined) {
                for (var i = 0; i < arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula].length; i++) {
                  if (arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula][i] == posicionElemento) {
                    arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula].splice(i, 1);
                    if (arregloElementosDeFormulasALlamar[posicionAtributo][posicionFormula].length == 0) arregloElementosDeFormulasALlamar[posicionAtributo].splice(posicionFormula, 1);
                    break;
                  }
                }

                ;
              }

              if (arregloElementosDeFormulasALlamar.length == 0 && !existenSegmentos) {
                console.log('HOLA 7');

                _this14.limpiarArreglos();
              }
            });
          }
        });
      }); // fin transaction

      /*} else {
          console.log('HOLA 8');
          this.limpiarArreglos();
      }*/
    }
  }, {
    key: "limpiarArreglos",
    value: function limpiarArreglos() {
      if (contadorObjetosGuardados == contadorObjetosAGuardar) {
        console.log("BORRRO");
        nivelNuevoAtributoVarios = 0;
        nivelNuevoAtributoUnico = 0;
        indiceSeleccionadoSegmentoReglas = -1;
        indiceSeleccionadoReglas = -1;
        tipoElementoSeleccionadoRegla = '';
        posicionAtributoSeleccionado = -1;
        indiceSeleccionadoFormula = -1;
        atributosVario = [];
        reglasVariosAtributos = [];
        segmentoReglasVariosAtributos = [];
        formulasVariosAtributos = [];
        elementosFormulasVariosAtributos = [];
        atributosUnico = [];
        reglasUnAtributo = [];
        segmentoReglasUnAtributo = [];
        formulasUnAtributo = [];
        elementosFormulasUnAtributos = [];
        tipoDeAsignacionSeleccionado = '';
        variablesSQL = [];
        instruccionSQL = '';
        this.setState({
          atributos: [],
          reglas: [],
          formulas: [],
          camposInstruccionSQL: [],
          comandoSQL: "",
          tipoNuevaVariable: ""
        });
        this.getVariables(); //this.getExcel();
        //this.getFormas();
      }
    }
  }, {
    key: "retornarCampo",
    value: function retornarCampo(campoNuevo) {
      campoSeleccionado = campoNuevo;
    }
  }, {
    key: "retornarValor",
    value: function retornarValor(campoNuevo, campoNuevoTexto) {
      valorSeleccionado = campoNuevo;
      valorSeleccionadoTexto = campoNuevoTexto;
    }
  }, {
    key: "actualizarCondicion",
    value: function actualizarCondicion(esCondicion) {
      this.setState({
        esCondicion: esCondicion
      });
    }
  }, {
    key: "cambioDeArreglosDeAtributos",
    value: function cambioDeArreglosDeAtributos() {
      var esObjeto;
      if ($("#esObjetoFuenteDato").is(':checked')) esObjeto = true;else esObjeto = false;

      if (esObjeto) {
        this.setState({
          atributos: atributosVario
        });
      } else {
        this.setState({
          atributos: atributosUnico
        });
      }
    }
  }, {
    key: "guardarVariable",
    value: function guardarVariable() {
      contadorObjetosGuardados = 0;
      contadorObjetosAGuardar = 0;

      if (banderaEsInstruccionSQL) {
        this.guardarVariableSQL();
      } else if (!banderaEsObjeto) {
        this.guardarVariableUnAtributo();
      } else {
        this.guardarVariableVariosAtributo();
      }
    }
  }, {
    key: "guardarVariableSQL",
    value: function guardarVariableSQL() {
      var nombreVariable = $("#nombreFuenteDato").val();
      var descripcionVariable = $("#descripcionFuenteDato").val();
      var esObjeto;
      if ($("#esObjetoFuenteDato").is(':checked')) esObjeto = true;else esObjeto = false;
      var guardarResultadosEnBaseDatos;
      if ($("#guardarFuenteDato").is(':checked')) guardarResultadosEnBaseDatos = true;else guardarResultadosEnBaseDatos = false;
      var objetoPadreID = -1;
      if ($("#esObjetoFuenteDato").is(':checked')) objetoPadreID = $("#objetoPadreID").val();
      var nuevoNivel = 0;

      if (banderaEsObjeto) {
        nuevoNivel = nivelNuevoAtributoVarios;
      } else {
        nuevoNivel = nivelNuevoAtributoUnico;
      }

      var esInstruccionSQL;
      if ($("#esInstruccionSQL").is(':checked')) esInstruccionSQL = true;else esInstruccionSQL = false;
      var periodicidad = $("#periodicidad").val();
      var fechaInicioCalculo;

      if (periodicidad.localeCompare("-1") == 0) {
        fechaInicioCalculo = new Date(1964, 4, 28);
      } else {
        fechaInicioCalculo = $("#fecha").datepicker('getDate');
      }

      var analista = $("#analista").val();

      if (nombreVariable.length < 101 && nombreVariable.length > 0) {
        if (this.verificarNoExisteNombreVar(nombreVariable)) {
          if (descripcionVariable.length < 701) {
            //if(operacionSeleccionada.valor != undefined) {
            if (esObjeto != undefined) {
              if (guardarResultadosEnBaseDatos != undefined) {
                if (esInstruccionSQL != undefined) {
                  if (!isNaN(objetoPadreID)) {
                    if (periodicidad.length > 0) {
                      if (this.isValidDate(fechaInicioCalculo)) {
                        if (analista.length > 0) {
                          if (!isNaN(nuevoNivel)) {
                            if (variablesSQL.length > 0) {
                              if (instruccionSQL.length > 0) {
                                var nuevaVariable = {
                                  nombre: nombreVariable,
                                  descripcion: descripcionVariable,
                                  esObjeto: esObjeto,
                                  esColeccion: false,
                                  objetoPadreID: objetoPadreID,
                                  esInstruccionSQL: esInstruccionSQL,
                                  guardar: guardarResultadosEnBaseDatos,
                                  periodicidad: periodicidad,
                                  fechaInicioCalculo: fechaInicioCalculo,
                                  analista: analista
                                };
                                this.createVariable(nuevaVariable);
                                contadorObjetosAGuardar++;
                              } else {
                                alert("Cree una instrucción SQL.");
                              }
                            } else {
                              alert("Cree una variable SQL.");
                            }
                          } else {
                            alert("Seleccione un nivel para el campo.");
                          }
                        } else {
                          alert("Ingrese un valor para el analista.");
                        }
                      } else {
                        alert("Ingrese una fecha válida para el inicio de cálculo.");
                      }
                    } else {
                      alert("Ingrese un valor para la periodicidad.");
                    }
                  } else {
                    alert("Tiene que ingresar un valor para objeto padre.");
                  }
                } else {
                  alert("Tiene que ingresar si la variable se calcula con intrucciones SQL.");
                }
              } else {
                alert("Tiene que ingresar si guardar o no variable.");
              }
            } else {
              alert("Tiene que ingresar si la variable tiene un atributo o muchos.");
            }
          } else {
            alert("Tiene que ingresar una descripción de la variable menor a 701 caracteres.");
          }
        } else {
          alert("El nombre de la variable debe ser unico.");
        }
      } else {
        alert("Tiene que ingresar un nombre de la variable.");
      }
    }
  }, {
    key: "guardarVariableUnAtributo",
    value: function guardarVariableUnAtributo() {
      var nombreVariable = $("#nombreFuenteDato").val();
      var descripcionVariable = $("#descripcionFuenteDato").val();
      var esObjeto;
      if ($("#esObjetoFuenteDato").is(':checked')) esObjeto = true;else esObjeto = false;
      var esColeccion;
      if ($("#esColeccion").is(':checked')) esColeccion = true;else esColeccion = false;
      var guardarResultadosEnBaseDatos;
      if ($("#guardarFuenteDato").is(':checked')) guardarResultadosEnBaseDatos = true;else guardarResultadosEnBaseDatos = false;
      var objetoPadreID = -1;
      if ($("#esObjetoFuenteDato").is(':checked')) objetoPadreID = $("#objetoPadreID").val();
      var nuevoNivel = 0;

      if (banderaEsObjeto) {
        nuevoNivel = nivelNuevoAtributoVarios;
      } else {
        nuevoNivel = nivelNuevoAtributoUnico;
      }

      var esInstruccionSQL;
      if ($("#esInstruccionSQL").is(':checked')) esInstruccionSQL = true;else esInstruccionSQL = false;
      var periodicidad = $("#periodicidad").val();
      var fechaInicioCalculo;

      if (periodicidad.localeCompare("-1") == 0) {
        fechaInicioCalculo = new Date(1964, 4, 28);
      } else {
        fechaInicioCalculo = $("#fecha").datepicker('getDate');
      }

      var analista = $("#analista").val();

      if (nombreVariable.length < 101 && nombreVariable.length > 0) {
        if (this.verificarNoExisteNombreVar(nombreVariable)) {
          if (descripcionVariable.length < 701) {
            //if(operacionSeleccionada.valor != undefined) {
            if (esObjeto != undefined) {
              if (esColeccion != undefined) {
                if (guardarResultadosEnBaseDatos != undefined) {
                  if (esInstruccionSQL != undefined) {
                    if (!isNaN(objetoPadreID)) {
                      if (periodicidad.length > 0) {
                        if (this.isValidDate(fechaInicioCalculo)) {
                          if (analista.length > 0) {
                            if (tipoDeAsignacionSeleccionado != undefined && tipoDeAsignacionSeleccionado.length > 0) {
                              if (!isNaN(nuevoNivel)) {
                                var nuevoAtributo = {
                                  nombre: nombreVariable,
                                  tipo: tipoDeAsignacionSeleccionado,
                                  nivel: nuevoNivel
                                }; //si la formula ya fue asignada, no agregar tipo

                                /*if(atributosUnico[0].tipo == undefined) {
                                    nuevoAtributo = {nombre: nombreVariable, tipo: '', campoEsArreglo: campoEsArreglo,  nivel: nivelNuevoAtributoUnico};
                                } else {
                                    nuevoAtributo = atributosUnico[0];
                                    nuevoAtributo.nombre = nombreVariable;
                                    nuevoAtributo.campoEsArreglo = campoEsArreglo;
                                    nuevoAtributo.nivel = nivelNuevoAtributoUnico;
                                }*/

                                var nuevaVariable = {
                                  nombre: nombreVariable,
                                  descripcion: descripcionVariable,
                                  esObjeto: esObjeto,
                                  esColeccion: esColeccion,
                                  objetoPadreID: objetoPadreID,
                                  esInstruccionSQL: esInstruccionSQL,
                                  guardar: guardarResultadosEnBaseDatos,
                                  periodicidad: periodicidad,
                                  fechaInicioCalculo: fechaInicioCalculo,
                                  analista: analista
                                }; //nivelNuevoAtributoUnico = 0;

                                console.log('nuevoAtributo');
                                console.log(nuevoAtributo);
                                this.createVariable(nuevaVariable, [nuevoAtributo]);
                                contadorObjetosAGuardar++;
                              } else {
                                alert("Seleccione un nivel para el campo.");
                              }
                            } else {
                              alert("Seleccione un tipo de asignación.");
                            }
                          } else {
                            alert("Ingrese un valor para el analista.");
                          }
                        } else {
                          alert("Ingrese una fecha válida para el inicio de cálculo.");
                        }
                      } else {
                        alert("Ingrese un valor para la periodicidad.");
                      }
                    } else {
                      alert("Tiene que ingresar un valor para objeto padre.");
                    }
                  } else {
                    alert("Tiene que ingresar si la variable se calcula con intrucciones SQL.");
                  }
                } else {
                  alert("Tiene que ingresar si guardar o no variable.");
                }
              } else {
                alert("Tiene que ingresar si la variable es coleccion o no.");
              }
            } else {
              alert("Tiene que ingresar si la variable tiene un atributo o muchos.");
            }
          } else {
            alert("Tiene que ingresar una descripción de la variable menor a 701 caracteres.");
          }
        } else {
          alert("El nombre de la variable debe ser unico.");
        }
      } else {
        alert("Tiene que ingresar un nombre de la variable.");
      }
    }
  }, {
    key: "guardarVariableVariosAtributo",
    value: function guardarVariableVariosAtributo() {
      var nombreVariable = $("#nombreFuenteDato").val();
      var descripcionVariable = $("#descripcionFuenteDato").val();
      var esObjeto;
      if ($("#esObjetoFuenteDato").is(':checked')) esObjeto = true;else esObjeto = false;
      var esColeccion;
      if ($("#esColeccion").is(':checked')) esColeccion = true;else esColeccion = false;
      var guardarResultadosEnBaseDatos;
      if ($("#guardarFuenteDato").is(':checked')) guardarResultadosEnBaseDatos = true;else guardarResultadosEnBaseDatos = false;
      var objetoPadreID = -1;
      if ($("#esObjetoFuenteDato").is(':checked')) objetoPadreID = $("#objetoPadreID").val();
      var nuevoNivel = 0;

      if (banderaEsObjeto) {
        nuevoNivel = nivelNuevoAtributoVarios;
      } else {
        nuevoNivel = nivelNuevoAtributoUnico;
      }

      var esInstruccionSQL;
      if ($("#esInstruccionSQL").is(':checked')) esInstruccionSQL = true;else esInstruccionSQL = false;
      var periodicidad = $("#periodicidad").val();
      var fechaInicioCalculo;

      if (periodicidad.localeCompare("-1") == 0) {
        fechaInicioCalculo = new Date(1964, 4, 28);
      } else {
        fechaInicioCalculo = $("#fecha").datepicker('getDate');
      }

      var analista = $("#analista").val();

      if (nombreVariable.length < 101 && nombreVariable.length > 0) {
        if (this.verificarNoExisteNombreVar(nombreVariable)) {
          if (descripcionVariable.length < 701) {
            //if(operacionSeleccionada.valor != undefined) {
            if (esObjeto != undefined) {
              if (esColeccion != undefined) {
                if (guardarResultadosEnBaseDatos != undefined) {
                  if (esInstruccionSQL != undefined) {
                    if (!isNaN(objetoPadreID)) {
                      if (periodicidad.length > 0) {
                        if (this.isValidDate(fechaInicioCalculo)) {
                          if (analista.length > 0) {
                            if (!isNaN(nuevoNivel)) {
                              //var nuevoAtributo = {nombre: nombreVariable, tipo: tipoDeAsignacionSeleccionado, nivel: nuevoNivel};
                              //si la formula ya fue asignada, no agregar tipo

                              /*if(atributosUnico[0].tipo == undefined) {
                                  nuevoAtributo = {nombre: nombreVariable, tipo: '', campoEsArreglo: campoEsArreglo,  nivel: nivelNuevoAtributoUnico};
                              } else {
                                  nuevoAtributo = atributosUnico[0];
                                  nuevoAtributo.nombre = nombreVariable;
                                  nuevoAtributo.campoEsArreglo = campoEsArreglo;
                                  nuevoAtributo.nivel = nivelNuevoAtributoUnico;
                              }*/
                              var nuevaVariable = {
                                nombre: nombreVariable,
                                descripcion: descripcionVariable,
                                esObjeto: esObjeto,
                                esColeccion: esColeccion,
                                objetoPadreID: objetoPadreID,
                                esInstruccionSQL: esInstruccionSQL,
                                guardar: guardarResultadosEnBaseDatos,
                                periodicidad: periodicidad,
                                fechaInicioCalculo: fechaInicioCalculo,
                                analista: analista
                              };
                              this.createVariable(nuevaVariable, atributosVario); //nivelNuevoAtributoVarios = 0;

                              contadorObjetosAGuardar++;
                            } else {
                              alert("Seleccione un nivel para el campo.");
                            }
                          } else {
                            alert("Ingrese un valor para el analista.");
                          }
                        } else {
                          alert("Ingrese una fecha válida para el inicio de cálculo.");
                        }
                      } else {
                        alert("Ingrese un valor para la periodicidad.");
                      }
                    } else {
                      alert("Tiene que ingresar un valor para objeto padre.");
                    }
                  } else {
                    alert("Tiene que ingresar si la variable se calcula con intrucciones SQL.");
                  }
                } else {
                  alert("Tiene que ingresar si guardar o no variable.");
                }
              } else {
                alert("Tiene que ingresar si la variable es coleccion o no.");
              }
            } else {
              alert("Tiene que ingresar si la variable tiene un atributo o muchos.");
            }
          } else {
            alert("Tiene que ingresar una descripción de la variable menor a 701 caracteres.");
          }
        } else {
          alert("El nombre de la variable debe ser unico.");
        }
      } else {
        alert("Tiene que ingresar un nombre de la variable.");
      }
    }
  }, {
    key: "crearAtributoVariable",
    value: function crearAtributoVariable() {
      //agrega valor a arreglo, pero no guarda en base de datos
      var nombreAtributo = $("#nombreAtributoNuevoCampo").val();

      if (nombreAtributo.length > 0) {
        if (this.verificarNoExisteNombreCampo(nombreAtributo)) {
          if (tipoDeAsignacionSeleccionado != undefined && tipoDeAsignacionSeleccionado.length > 0) {
            //seleccionar arreglo a insertar, si de varios atributos o unico
            var arreglo, nivel;

            if (banderaEsObjeto) {
              arreglo = atributosVario;
              nivel = nivelNuevoAtributoVarios;
            } else {
              arreglo = atributosUnico;
              nivel = nivelNuevoAtributoUnico;
            }

            var nuevoAtributo = {
              nombre: nombreAtributo,
              tipo: tipoDeAsignacionSeleccionado,
              nivel: nivel
            }; //si la formula ya fue asignada, no agregar tipo

            /*if(this.state.atributos[this.state.posicionNuevoAtributo].nombre == undefined) {
                nuevoAtributo = {nombre: nombreAtributo, tipo: tipoDeAsignacionSeleccionado, campoEsArreglo: campoEsArreglo};
            } else {
                nuevoAtributo = this.state.atributos[this.state.posicionNuevoAtributo];
                nuevoAtributo.nombre = nombreAtributo;
                nuevoAtributo.campoEsArreglo = campoEsArreglo;
            }*/

            arreglo.push(nuevoAtributo);
            this.setState({
              atributos: arreglo,
              tipoNuevaVariable: ""
            });
            nivelNuevoAtributoVarios = 0;

            if (banderaEsObjeto) {
              atributosVario = arreglo;
            } else {
              atributosUnico = arreglo;
            }

            nombreCampoNuevoAtributosVario = '';
            $("#nombreAtributoNuevoCampo").val("");
            alert("Campo creado.");
          } else {
            alert("Seleccione un tipo de asignación.");
          }
        } else {
          alert("El nombre del campo debe ser unico.");
        }
      } else {
        alert("Ingrese un valor para el nombre del atributo.");
      }
    }
  }, {
    key: "eliminarAtributoVariable",
    value: function eliminarAtributoVariable(index) {
      var elementosFormulas, copiaAntiguaFormulas, reglas, segmentoRegla, atributos;

      if (banderaEsObjeto) {
        elementosFormulas = elementosFormulasVariosAtributos;
        copiaAntiguaFormulas = formulasVariosAtributos;
        reglas = reglasVariosAtributos;
        segmentoRegla = segmentoReglasVariosAtributos;
        atributos = atributosVario;
      } else {
        elementosFormulas = elementosFormulasUnAtributos;
        copiaAntiguaFormulas = formulasUnAtributo;
        reglas = reglasUnAtributo;
        segmentoRegla = segmentoReglasUnAtributo;
        atributos = atributosUnico;
      }

      elementosFormulas.splice(index, 1);
      copiaAntiguaFormulas.splice(index, 1);
      reglas.splice(index, 1);
      segmentoRegla.splice(index, 1);
      atributos.splice(index, 1);
      this.setState({
        atributos: atributos
      });
    }
  }, {
    key: "modificarNombreVariable",
    value: function modificarNombreVariable(index) {
      var copyAtributos = _toConsumableArray(this.state.atributos);

      copyAtributos[index].nombre = $("#nombreAtributo" + index).val();
      this.setState({
        atributos: copyAtributos
      });
    }
  }, {
    key: "crearVariableSQL",
    value: function crearVariableSQL() {
      var nombreCampo = $("#nuevoCampo").val();
      var tipo = $("#tipo").val();

      if (nombreCampo.length > 0 && nombreCampo.length < 101) {
        if (this.verificarNoExisteNombreCampo(nombreCampo)) {
          if (tipo.length < 101) {
            var nuevaVar = {
              nombre: nombreCampo,
              tipo: tipo
            };
            variablesSQL.push(nuevaVar);
            console.log('variablesSQL');
            console.log(variablesSQL);
            this.setState({
              camposInstruccionSQL: variablesSQL
            });
            $("#nuevoCampo").val("");
            $("#tipo").val("varchar");
          } else {
            alert("El tipo del campo debe tener una longitud menor a 31 caracteres.");
          }
        } else {
          alert("El nombre del campo debe ser unico.");
        }
      } else {
        alert("Ingrese un valor para el nombre del campo debe tener una longitud menor a 101 caracteres.");
      }
    }
  }, {
    key: "crearInstruccionSQL",
    value: function crearInstruccionSQL() {
      var instruccionSQLN = $("#comandoSQL").val();

      if (instruccionSQL.length < 101) {
        instruccionSQL = instruccionSQLN;
        this.setState({
          comandoSQL: instruccionSQL
        });
        alert('Instrucción Guardada');
      } else {
        alert("El nombre del campo debe tener una longitud menor a 101 caracteres.");
      }
    }
  }, {
    key: "anadirRegla",
    value: function anadirRegla(esFormula, formulaSeleccionada, posicionFormulaSeleccionada) {
      //si se agrega una formula/asignacion, todas las otras formulas tienen que ser del mismo tipo para esa variable
      //si el indiceSeleccionado es igual a -1, se llamo desde nuevo atributo
      //sino, modificar elemento seleccionado
      //primer if: ver el estado de donde fue llamado el metodo
      //campoSeleccionado, operacionSeleccionada, objetoConexionSeleccionada
      //indiceSeleccionadoReglas
      //tipoElementoSeleccionadoRegla
      console.log('formulaSeleccionada');
      console.log(formulaSeleccionada);
      console.log('indiceSeleccionadoSegmentoReglas');
      console.log(indiceSeleccionadoSegmentoReglas);
      console.log('indiceSeleccionadoReglas');
      console.log(indiceSeleccionadoReglas);
      console.log('tipoElementoSeleccionadoRegla');
      console.log(tipoElementoSeleccionadoRegla);
      console.log('posicionFormulaSeleccionada');
      console.log(posicionFormulaSeleccionada);
      var reglas, segmentoRegla;

      if (banderaEsObjeto) {
        reglas = reglasVariosAtributos;
        segmentoRegla = segmentoReglasVariosAtributos;
      } else {
        reglas = reglasUnAtributo;
        segmentoRegla = segmentoReglasUnAtributo;
      }

      console.log('reglas');
      console.log(reglas);
      var posicionAtributo = posicionAtributoSeleccionado; //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
      //cuando se presiona NavBar indice es igual indice anterior
      //cuando se selecciona un campo existente indice = posicion campo

      if (posicionAtributo == -1) {
        posicionAtributo = this.state.atributos.length;
      } //viendo si regla condicion ya tiene regla sino
      //comparando si la regla seleccionada es otra regla, y si la nueva regla a insertar no es formula


      var banderaSinoReglaValido = true;

      if (tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && !esFormula && $("#sinoRADIO").is(':checked')) {
        var nivelABuscar = reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas][indiceSeleccionadoReglas].nivel;

        if (indiceSeleccionadoReglas + 1 < reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas].length) {
          for (var i = indiceSeleccionadoReglas + 1; i < reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas].length; i++) {
            if (nivelABuscar == reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas][i].nivel && reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas][i].operacion.localeCompare("ELSE") == 0) {
              banderaSinoReglaValido = false;
            }
          }

          ;
        }
      }

      var reglaEsValida = true;

      if (!esFormula) {
        if (campoSeleccionado == undefined || campoSeleccionado.valor == undefined) {
          reglaEsValida = false;
        }

        if (valorSeleccionado.length == 0) {
          reglaEsValida = false;
        }

        if (operacionSeleccionada.operacion == undefined) {
          reglaEsValida = false;
        }

        if (campoSeleccionado.tipo != undefined) {
          if (campoSeleccionado.tipo.localeCompare("int") == 0 || campoSeleccionado.tipo.localeCompare("decimal") == 0) {
            if (valorSeleccionado.indexOf("NUMERO") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
              reglaEsValida = false;
            }
          } else if (campoSeleccionado.tipo.localeCompare("bool") == 0) {
            if (valorSeleccionado.indexOf("BOOL") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
              reglaEsValida = false;
            }
          } else if (campoSeleccionado.tipo.localeCompare("date") == 0) {
            if (valorSeleccionado.indexOf("FECHA") == -1 && valorSeleccionado.indexOf("TIEMPO") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
              console.log('valorSeleccionado');
              console.log(valorSeleccionado);
              reglaEsValida = false;
            }
          } else if (campoSeleccionado.tipo.localeCompare("varchar") == 0) {
            if (valorSeleccionado.indexOf("VARCHAR") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
              reglaEsValida = false;
            }
          }
        }
      } else {
        if (formulaSeleccionada.formula == undefined) {
          reglaEsValida = false;
        }
      } //si es formula, viendo que no haya regla debajo, formulas solo se pueden agregar al final


      if (banderaSinoReglaValido && reglaEsValida) {
        if (indiceSeleccionadoReglas != -1 || indiceSeleccionadoReglas == -1 && (reglas.length == 0 || reglas[posicionAtributo] != undefined && reglas[posicionAtributo].length == 0)) {
          var entrarACrearRegla = false;

          if (indiceSeleccionadoReglas != -1 && tipoElementoSeleccionadoRegla.length > 0 && tipoElementoSeleccionadoRegla.localeCompare("abajo") != 0 && segmentoRegla[posicionAtributo] != undefined) {
            //validando nueva regla tenga la misma variable o conexion tabla del mismo segmento
            console.log('segmentoRegla');
            console.log(segmentoRegla);
            console.log('campoSeleccionado');
            console.log(campoSeleccionado);
            console.log('formulaSeleccionada');
            console.log(formulaSeleccionada);
            console.log('formulasVariosAtributos');
            console.log(formulasVariosAtributos);
            console.log('posicionAtributo');
            console.log(posicionAtributo);
            console.log('indiceSeleccionadoSegmentoReglas');
            console.log(indiceSeleccionadoSegmentoReglas);
            console.log('segmentoRegla');
            console.log(segmentoRegla);

            if (!esFormula) {
              console.log('1');

              if (campoSeleccionado.tablaID != undefined) {
                console.log('1.1');

                if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].conexionTablaID == campoSeleccionado.tablaID) {
                  console.log('1.1.1');
                  entrarACrearRegla = true;
                }
              } else if (campoSeleccionado.variableID != undefined) {
                console.log('1.2');

                if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].variableID == campoSeleccionado.variableID) {
                  console.log('1.2.2');
                  entrarACrearRegla = true;
                } //viendo si variable seleccionada es objeto


                var variableSel = this.state.variables.filter(function (object) {
                  return object.ID == campoSeleccionado.variableID;
                });

                if (variableSel.length > 0) {
                  if (!variableSel[0].esObjeto) entrarACrearRegla = true;
                }
              } else if (campoSeleccionado.excelArchivoID != undefined) {
                entrarACrearRegla = true;
              } else if (campoSeleccionado.formaVariableID != undefined) {
                entrarACrearRegla = true;
              }
            } else {
              console.log('2');
              console.log(formulaSeleccionada);

              if (formulaSeleccionada.tablaID != undefined && !formulaSeleccionada.esValorManual) {
                console.log('2.1');

                if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].conexionTablaID == formulaSeleccionada.tablaID) {
                  console.log('2.1.1');
                  entrarACrearRegla = true;
                }
              } else if (formulaSeleccionada.variableID != undefined && !formulaSeleccionada.esValorManual) {
                console.log('2.2');

                if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].variableID == formulaSeleccionada.variableID) {
                  console.log('2.2.2');
                  entrarACrearRegla = true;
                } //viendo si variable seleccionada es objeto


                var variableSel = this.state.variables.filter(function (object) {
                  return object.ID == formulaSeleccionada.variableID;
                });

                if (variableSel.length > 0) {
                  if (!variableSel[0].esObjeto) entrarACrearRegla = true;
                }
              } else if (formulaSeleccionada.excelArchivoID != undefined && !formulaSeleccionada.esValorManual) {
                entrarACrearRegla = true;
              } else if (formulaSeleccionada.formaVariableID != undefined && !formulaSeleccionada.esValorManual) {
                entrarACrearRegla = true;
              } else if (formulaSeleccionada.esValorManual) {
                entrarACrearRegla = true;
              }
            }
          } else if (indiceSeleccionadoReglas == -1 && (reglas.length == 0 || reglas[posicionAtributo] != undefined && reglas[posicionAtributo].length == 0) || tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0 || segmentoRegla[posicionAtributo] == undefined) {
            entrarACrearRegla = true;
          }

          if (entrarACrearRegla) {
            if (!esFormula) {
              var posicionSel = posicionAtributoSeleccionado; //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
              //cuando se presiona NavBar indice es igual indice anterior
              //cuando se selecciona un campo existente indice = posicion campo

              if (posicionAtributoSeleccionado == -1) {
                posicionSel = this.state.atributos.length;
              }

              if (reglas[posicionSel] == undefined) {
                [];
              }

              if (segmentoRegla.length == undefined) segmentoRegla = [];
              if (segmentoRegla[posicionSel] == undefined) segmentoRegla[posicionSel] = [];
              var conexionTablaID = -1,
                  variableID = -1,
                  esConexionTabla = false,
                  nivelMax = 1,
                  nombreColumnaEnTabla = '';
              var excelArchivoID = -1,
                  excelVariableID = -1,
                  formaVariableID = -1;
              var esValorManual = false;
              console.log('campoSeleccionado');
              console.log(campoSeleccionado);

              if (campoSeleccionado.tablaID != undefined && campoSeleccionado.tablaID != -1) {
                console.log('1');
                conexionTablaID = campoSeleccionado.tablaID;
                esConexionTabla = true;
                nombreColumnaEnTabla = campoSeleccionado.valor;
              } else if (campoSeleccionado.variableID != undefined && campoSeleccionado.variableID != -1) {
                console.log('2');
                variableID = campoSeleccionado.variableID;
              } else if (campoSeleccionado.excelArchivoID != undefined && campoSeleccionado.excelArchivoID != -1) {
                console.log('3');
                excelArchivoID = campoSeleccionado.excelArchivoID;
                excelVariableID = campoSeleccionado.excelVariableID;
              } else if (campoSeleccionado.formaVariableID != undefined && campoSeleccionado.formaVariableID != -1) {
                console.log('4');
                formaVariableID = campoSeleccionado.formaVariableID;
              } else if (campoSeleccionado.esValorManual != undefined) {
                esValorManual = campoSeleccionado.esValorManual;
                console.log('5555');
              }

              var posicionInsertarReglaAtributo = 0,
                  posicionInsertarReglaSegmento = 0;

              if (tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0 || indiceSeleccionadoReglas == -1 && tipoElementoSeleccionadoRegla.length == 0 || segmentoRegla[posicionSel].length == 0) {
                var segmentoReglaIndex = 0;

                if (segmentoRegla[posicionSel].length > 0) {
                  segmentoReglaIndex = segmentoRegla[posicionSel].length;
                }

                segmentoRegla[posicionSel].push({
                  conexionTablaID: conexionTablaID,
                  variableID: variableID,
                  esConexionTabla: esConexionTabla,
                  nivelMax: nivelMax,
                  segmentoReglaIndex: segmentoReglaIndex,
                  excelArchivoID: excelArchivoID,
                  excelVariableID: excelVariableID,
                  formaVariableID: formaVariableID,
                  esValorManual: esValorManual
                });
                posicionInsertarReglaAtributo = posicionSel;
                posicionInsertarReglaSegmento = segmentoRegla[posicionSel].length - 1;
              } else {
                segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].nivelMax++;

                if (segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].excelArchivoID == -1 && excelArchivoID != -1) {
                  segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].excelArchivoID = excelArchivoID;
                  segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].excelVariableID = excelVariableID;
                }

                if (segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].formaVariableID == -1 && formaVariableID != -1) {
                  segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].formaVariableID = formaVariableID;
                }

                if (segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].variableID == -1 && variableID != -1) {
                  segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].variableID = variableID;
                }

                posicionInsertarReglaAtributo = posicionSel;
                posicionInsertarReglaSegmento = indiceSeleccionadoSegmentoReglas;
              }

              if (reglas[posicionInsertarReglaAtributo] == undefined) {
                reglas[posicionInsertarReglaAtributo] = [];
              }

              if (reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] == undefined) {
                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] = [];
              }

              var esCondicion = !esFormula;
              var segmentoReglaIndex = 0;

              if (indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") != 0) {
                //cuando se esta añadiendo una regla a un segmento existente
                segmentoReglaIndex = indiceSeleccionadoSegmentoReglas;
              } else if (indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                //cuando se esta añadiendo una regla a un nuevo segmento
                segmentoReglaIndex = indiceSeleccionadoSegmentoReglas + 1;
              }

              var nuevoNivel = 0;
              var nuevaRegla = {
                segmentoReglaID: segmentoReglaIndex,
                conexionTablaID: conexionTablaID,
                nombreColumnaEnTabla: nombreColumnaEnTabla,
                formulaID: -1,
                variableID: -1,
                variableCampoID: -1,
                reglaPadreID: -1,
                tipoCampoObjetivo: campoSeleccionado.tipo,
                esCondicion: esCondicion,
                esConexionTabla: esConexionTabla,
                operacion: operacionSeleccionada.operacion,
                operacionTexto: operacionSeleccionada.operacionTexto,
                valor: valorSeleccionado,
                texto: campoSeleccionado.valor + " " + operacionSeleccionada.operacionTexto + " " + valorSeleccionadoTexto,
                nivel: nuevoNivel,
                posicionSegmentoEnCampo: segmentoReglaIndex
              };

              if (reglas.length == 0 || reglas[posicionInsertarReglaAtributo].length == 0 || reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length == 0) {
                console.log('1'); //cuando no existe regla creada para el campo

                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
              } else {
                console.log('2'); //el campo ya tiene una regla o mas creada

                if (tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#siRADIO").is(':checked')) {
                  console.log('2.1'); //se seleciona el indice de la posicion de la regla dentro del arreglo, para que despues se pueda sacar el ID a base de la posicion
                  //se pone de regla padre a la regla seleccionada

                  nuevaRegla.reglaPadreID = indiceSeleccionadoReglas;
                  nuevaRegla.nivel = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].nivel + 1;
                  reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas + 1, 0, nuevaRegla);

                  if (reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas + 2] != undefined) {
                    for (var i = indiceSeleccionadoReglas + 2; i < reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length; i++) {
                      if (nuevaRegla.nivel <= reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel) {
                        reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].reglaPadreID = i - 1;
                        reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel++;
                      }
                    }

                    ;
                  }
                } else if (tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#sinoRADIO").is(':checked')) {
                  console.log('2.2');
                  var posicionAInsertar = -1;
                  nuevaRegla.reglaPadreID = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].reglaPadreID;
                  nuevaRegla.nivel = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].nivel;

                  if (reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas + 1] != undefined) {
                    for (var i = indiceSeleccionadoReglas + 1; i < reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length; i++) {
                      if (nuevaRegla.nivel > reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel) {
                        posicionAInsertar = i;
                      }
                    }

                    ;
                  }

                  if (posicionAInsertar != -1) {
                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(posicionAInsertar, 0, nuevaRegla);
                  } else {
                    //insertar al final del segmento
                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
                  }
                } else if (tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                  console.log('2.2');
                  nuevaRegla.reglaPadreID = -1;
                  nuevaRegla.nivel = -1;
                  reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
                } else if (tipoElementoSeleccionadoRegla.localeCompare("arriba") == 0) {
                  console.log('2.2');
                  nuevaRegla.reglaPadreID = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].reglaPadreID;
                  nuevaRegla.nivel = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].nivel;
                  reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas, 0, nuevaRegla);

                  if (reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas + 1] != undefined) {
                    for (var i = indiceSeleccionadoReglas + 1; i < reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length; i++) {
                      if (nuevaRegla.nivel <= reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel) {
                        reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].reglaPadreID = i - 1;
                        reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel++;
                      }
                    }

                    ;
                  }
                } //la condicion es anidada, o sea dentro de la condicion padre

              } //deseleccionado regla seleccionada


              indiceSeleccionadoReglas = -1;

              if (banderaEsObjeto) {
                reglasVariosAtributos = reglas;
                segmentoReglasVariosAtributos = segmentoRegla;
              } else {
                reglasUnAtributo = reglas;
                segmentoReglasUnAtributo = segmentoRegla;
              }

              this.setState({
                reglas: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]
              }); //reglas[posicionSel].push(nuevaRegla);

              console.log('reglas');
              console.log(reglas);
              console.log('segmentoRegla');
              console.log(segmentoRegla);
              console.log('posicionInsertarReglaAtributo');
              console.log(posicionInsertarReglaAtributo);
              console.log('posicionInsertarReglaSegmento');
              console.log(posicionInsertarReglaSegmento);
              console.log('indiceSeleccionadoReglas');
              console.log(indiceSeleccionadoReglas);
              console.log('campoSeleccionado');
              console.log(campoSeleccionado);
              campoSeleccionado = null;
              valorSeleccionado = '';
            } else {
              //es regla formula
              var posicionSel = posicionAtributoSeleccionado; //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
              //cuando se presiona NavBar indice es igual indice anterior
              //cuando se selecciona un campo existente indice = posicion campo

              if (posicionAtributoSeleccionado == -1) {
                posicionSel = this.state.atributos.length;
              } //verificando que campo de formula seleccionado es mismo tipo variable
              //tipoDeAsignacionSeleccionado


              if (this.state.tipoNuevaVariable.localeCompare(tipoDeAsignacionSeleccionado) == 0 || this.state.tipoNuevaVariable.length == 0) {
                console.log("INICIO AGREGAR FORMULA");
                var nuevoNivel = 0;
                var segmentoRegla;

                if (banderaEsObjeto) {
                  nuevoNivel = nivelNuevoAtributoVarios;
                  segmentoRegla = segmentoReglasVariosAtributos;
                } else {
                  nuevoNivel = nivelNuevoAtributoUnico;
                  segmentoRegla = segmentoReglasUnAtributo;
                }

                if (segmentoRegla.length == undefined) segmentoRegla = [];
                if (segmentoRegla[posicionSel] == undefined) segmentoRegla[posicionSel] = [];
                var conexionTablaID = -1,
                    variableID = -1,
                    esConexionTabla = false,
                    nivelMax = 1;
                var posicionInsertarReglaAtributo = 0,
                    posicionInsertarReglaSegmento = 0;
                var posicionSegmentoEnCampo = -1; //bandera para saber a que segmento pertenece la regla, utilizado para elegir color fondo reglas

                var excelArchivoID = -1,
                    excelVariableID = -1,
                    formaVariableID = -1;
                var esValorManual = false;
                console.log('formulaSeleccionada');
                console.log(formulaSeleccionada);

                if (formulaSeleccionada.tablaID != undefined && formulaSeleccionada.tablaID != -1) {
                  conexionTablaID = formulaSeleccionada.tablaID;
                  esConexionTabla = true;
                  console.log('1111');
                } else if (formulaSeleccionada.variableID != undefined && formulaSeleccionada.variableID != -1) {
                  variableID = formulaSeleccionada.variableID;
                  console.log('22222');
                } else if (formulaSeleccionada.excelArchivoID != undefined && formulaSeleccionada.excelArchivoID != -1) {
                  excelArchivoID = formulaSeleccionada.excelArchivoID;
                  excelVariableID = formulaSeleccionada.excelVariableID;
                  console.log('3333');
                } else if (formulaSeleccionada.formaVariableID != undefined && formulaSeleccionada.formaVariableID != -1) {
                  formaVariableID = formulaSeleccionada.formaVariableID;
                  console.log('4444');
                } else if (formulaSeleccionada.esValorManual != undefined) {
                  esValorManual = formulaSeleccionada.esValorManual;
                  console.log('5555');
                }

                if (tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0 || indiceSeleccionadoReglas == -1 && tipoElementoSeleccionadoRegla.length == 0 || segmentoRegla[posicionSel].length == 0) {
                  var segmentoReglaIndex = 0;

                  if (segmentoRegla[posicionSel].length > 0) {
                    segmentoReglaIndex = segmentoRegla[posicionSel].length;
                  }

                  segmentoRegla[posicionSel].push({
                    conexionTablaID: conexionTablaID,
                    variableID: variableID,
                    esConexionTabla: esConexionTabla,
                    nivelMax: nivelMax,
                    segmentoReglaIndex: segmentoReglaIndex,
                    excelArchivoID: excelArchivoID,
                    excelVariableID: excelVariableID,
                    formaVariableID: formaVariableID,
                    esValorManual: esValorManual
                  });
                  posicionInsertarReglaAtributo = posicionSel;
                  posicionInsertarReglaSegmento = segmentoRegla[posicionSel].length - 1;
                } else {
                  console.log('AAA-');
                  segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].nivelMax++;

                  if (segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].excelArchivoID == -1 && excelArchivoID != -1) {
                    console.log('AAA-111');
                    segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].excelArchivoID = excelArchivoID;
                    segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].excelVariableID = excelVariableID;
                  }

                  if (segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].formaVariableID == -1 && formaVariableID != -1) {
                    console.log('AAA-222');
                    segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].formaVariableID = formaVariableID;
                  }

                  if (segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].variableID == -1 && variableID != -1) {
                    console.log('AAA-333');
                    segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].variableID = variableID;
                  }

                  posicionInsertarReglaAtributo = posicionSel;
                  posicionInsertarReglaSegmento = indiceSeleccionadoSegmentoReglas;
                }

                if (reglas[posicionInsertarReglaAtributo] == undefined) {
                  reglas[posicionInsertarReglaAtributo] = [];
                }

                if (reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] == undefined) {
                  reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] = [];
                }

                var esCondicion = !esFormula;
                var segmentoReglaIndex = 0;

                if (indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") != 0) {
                  //cuando se esta añadiendo una regla a un segmento existente
                  segmentoReglaIndex = indiceSeleccionadoSegmentoReglas;
                } else if (indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                  //cuando se esta añadiendo una regla a un nuevo segmento
                  segmentoReglaIndex = indiceSeleccionadoSegmentoReglas + 1;
                }

                var nuevaRegla = {
                  segmentoReglaID: segmentoReglaIndex,
                  conexionTablaID: conexionTablaID,
                  nombreColumnaEnTabla: '',
                  formulaID: posicionFormulaSeleccionada,
                  variableID: -1,
                  variableCampoID: -1,
                  reglaPadreID: -1,
                  esCondicion: esCondicion,
                  esConexionTabla: esConexionTabla,
                  tipoCampoObjetivo: tipoDeAsignacionSeleccionado,
                  operacion: formulaSeleccionada.operacion,
                  operacionTexto: this.retornarCodigoOperacion(formulaSeleccionada.operacion),
                  valor: formulaSeleccionada.operacion,
                  texto: formulaSeleccionada.formula,
                  nivel: nuevoNivel,
                  posicionSegmentoEnCampo: segmentoReglaIndex
                };

                if (reglas.length == 0 || reglas[posicionInsertarReglaAtributo].length == 0 || reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length == 0) {
                  console.log('1'); //cuando no existe regla creada para el campo

                  reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
                } else {
                  console.log('2'); //el campo ya tiene una regla o mas creada

                  if (tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#siRADIO").is(':checked') || tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && !$("#siRADIO").is(':checked') && !$("#sinoRADIO").is(':checked')) {
                    console.log('2.1'); //se seleciona el indice de la posicion de la regla dentro del arreglo, para que despues se pueda sacar el ID a base de la posicion
                    //se pone de regla padre a la regla seleccionada

                    nuevaRegla.reglaPadreID = indiceSeleccionadoReglas;
                    nuevaRegla.nivel = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].nivel + 1;
                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas + 1, 0, nuevaRegla);

                    if (reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas + 2] != undefined) {
                      for (var i = indiceSeleccionadoReglas + 2; i < reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length; i++) {
                        if (nuevaRegla.nivel <= reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel) {
                          reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].reglaPadreID = i - 1;
                          reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel++;
                        }
                      }

                      ;
                    }
                  } else if (tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#sinoRADIO").is(':checked')) {
                    console.log('2.2');
                    var posicionAInsertar = -1;
                    nuevaRegla.reglaPadreID = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].reglaPadreID;
                    nuevaRegla.nivel = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].nivel;

                    if (reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas + 1] != undefined) {
                      for (var i = indiceSeleccionadoReglas + 1; i < reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length; i++) {
                        if (nuevaRegla.nivel > reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel) {
                          posicionAInsertar = i;
                        }
                      }

                      ;
                    }

                    if (posicionAInsertar != -1) {
                      reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(posicionAInsertar, 0, nuevaRegla);
                    } else {
                      //insertar al final del segmento
                      reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
                    }
                  } else if (tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                    console.log('2.2');
                    nuevaRegla.reglaPadreID = -1;
                    nuevaRegla.nivel = -1;
                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
                  } else if (tipoElementoSeleccionadoRegla.localeCompare("arriba") == 0) {
                    console.log('2.2');
                    nuevaRegla.reglaPadreID = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].reglaPadreID;
                    nuevaRegla.nivel = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas].nivel;
                    reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas, 0, nuevaRegla);

                    if (reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas + 1] != undefined) {
                      for (var i = indiceSeleccionadoReglas + 1; i < reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length; i++) {
                        if (nuevaRegla.nivel <= reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel) {
                          reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].reglaPadreID = i - 1;
                          reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][i].nivel++;
                        }
                      }

                      ;
                    }
                  } //la condicion es anidada, o sea dentro de la condicion padre

                } //deseleccionado regla seleccionada


                indiceSeleccionadoReglas = -1;

                var tempNewCopy = _toConsumableArray(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]);

                this.setState({
                  reglas: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]
                }, console.log(this.state.reglas));
                console.log('reglas');
                console.log(reglas);
                console.log('segmentoRegla');
                console.log(segmentoRegla);
                console.log('posicionInsertarReglaAtributo');
                console.log(posicionInsertarReglaAtributo);
                console.log('posicionInsertarReglaSegmento');
                console.log(posicionInsertarReglaSegmento);
                console.log('indiceSeleccionadoReglas');
                console.log(indiceSeleccionadoReglas);
                console.log('formulaSeleccionada');
                console.log(formulaSeleccionada);
                formulaSeleccionada = null;
                var self = this;
                setTimeout(function () {
                  console.log(self.state.reglas);
                }, 2000);

                if (this.state.tipoNuevaVariable.length == 0) {
                  this.setState({
                    tipoNuevaVariable: tipoDeAsignacionSeleccionado
                  });
                }

                if (banderaEsObjeto) {
                  reglasVariosAtributos = reglas;
                  segmentoReglasVariosAtributos = segmentoRegla;
                } else {
                  reglasUnAtributo = reglas;
                  segmentoReglasUnAtributo = segmentoRegla;
                } //tipoDeAsignacionSeleccionado = '';

              } else {
                if (this.state.tipoNuevaVariable.localeCompare(tipoDeAsignacionSeleccionado) != 0) {
                  alert("El tipo de asignacion de formula no coincide el tipo de campo.");
                }
              }
            }
          } else {
            var texto2 = 'variable';
            if (campoSeleccionado.tablaID != undefined) texto2 = 'tabla';
            var texto = 'formula';
            if (!esFormula) texto = 'comparación';
            alert("La " + texto + " ingresada no pertenece a la misma " + texto2 + ".");
          }
        } else {
          alert("Seleccione una posición en la 'Lógica para el cálculo'");
        }
      } else {
        if (!reglaEsValida && !esFormula) alert("Ingrese todos los campos necesarios para la condicion.");else if (!reglaEsValida && esFormula) alert("Seleccione una formula.");else alert("La comparación ya tiene una clausula 'SINO'");
      }
    }
  }, {
    key: "anadirFormula",
    value: function anadirFormula(formula, formulaArreglo) {
      // 1. Make a shallow copy of the items
      //let campos = [...this.state.camposDeTabla];
      // 2. Make a shallow copy of the item you want to mutate
      //let campo = [...campos[index]];
      // 3. Replace the property you're intested in
      //campo = {ID: campo.ID, idTabla: idTabla, nombre: campoNombre, tipo: tipoCampo, guardar: guardarCampo};
      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      //campos[index] = campo;
      // 5. Set the state to our new copy
      var posicionSel = posicionAtributoSeleccionado; //indice = -1 cuando se va a condiciones de un campo nuevo
      //cuando se presiona NavBar indice es igual indice anterior
      //cuando se selecciona un campo existente indice = posicion campo

      if (posicionAtributoSeleccionado == -1) {
        posicionSel = this.state.atributos.length;
      }

      console.log('formula');
      console.log(formula);
      console.log('formulaArreglo');
      console.log(formulaArreglo);
      console.log('posicionSel');
      console.log(posicionSel); //copia antigua formulas

      var elementosFormulas, copiaAntiguaFormulas;

      if (banderaEsObjeto) {
        copiaAntiguaFormulas = formulasVariosAtributos;
        elementosFormulas = elementosFormulasVariosAtributos;
      } else {
        copiaAntiguaFormulas = formulasUnAtributo;
        elementosFormulas = elementosFormulasUnAtributos;
      }

      if (copiaAntiguaFormulas[posicionSel] == undefined) copiaAntiguaFormulas[posicionSel] = [];
      formula.numeroDeFormulaDeVariable = copiaAntiguaFormulas[posicionSel].length;
      copiaAntiguaFormulas[posicionSel].push(formula);
      this.setState({
        formulas: copiaAntiguaFormulas[posicionSel]
      });
      if (elementosFormulas[posicionSel] == undefined) elementosFormulas[posicionSel] = [];
      var posicionFormulaEnCampo = 0;
      if (copiaAntiguaFormulas[posicionSel].length > 0) posicionFormulaEnCampo = copiaAntiguaFormulas[posicionSel].length - 1; //indiceSeleccionadoFormula es el indice de la formula seleccionada, las formula se asocian por campo (1 campo => muchas formulas)

      if (elementosFormulas[posicionSel][posicionFormulaEnCampo] == undefined) elementosFormulas[posicionSel][posicionFormulaEnCampo] = [];
      var arregloDeElementos = [];
      this.getElementsFromFormula(formulaArreglo, arregloDeElementos);
      elementosFormulas[posicionSel][posicionFormulaEnCampo] = arregloDeElementos;
      /*for (var i = 0; i < formulaArreglo.length; i++) {
          console.log("111");
          console.log("i = "+i);
          if(formulaArreglo[i].tipo.localeCompare("variable") == 0) {
              console.log("YEAH");
              console.log("i = "+i);
              var conexionTablaID = -1;
              if(formulaArreglo[i].esFuenteDato != undefined && formulaArreglo[i].esFuenteDato)
                  conexionTablaID = formulaArreglo[i].tablaID;
              var esFuenteDeDato = false;
              if(formulaArreglo[i].esFuenteDato != undefined && formulaArreglo[i].esFuenteDato)
                  esFuenteDeDato = true;
              var excelArchivoID = -1;
              if(formulaArreglo[i].excelArchivoID != undefined)
                  excelArchivoID = formulaArreglo[i].excelArchivoID;
              var excelVariableID = -1;
              if(formulaArreglo[i].excelVariableID != undefined)
                  excelVariableID = formulaArreglo[i].excelVariableID;
              var formaVariableID = -1;
              if(formulaArreglo[i].formaVariableID != undefined)
                  formaVariableID = formulaArreglo[i].formaVariableID;
              var elementoVariableID = -1;
              if(formulaArreglo[i].variableID != undefined)
                  elementoVariableID = formulaArreglo[i].variableID;
              var elementoVariableCampoID = -1;
              if(formulaArreglo[i].variableCampoID != undefined)
                  elementoVariableCampoID = formulaArreglo[i].variableCampoID;
              elementosFormulas[posicionSel][posicionFormulaEnCampo].push({
                  variableID: -1,
                  variableCampoID: -1,
                  formulaID: -1,
                  conexionTablaID: conexionTablaID,
                  esFuenteDeDato: esFuenteDeDato,
                  excelArchivoID: excelArchivoID,
                  excelVariableID: excelVariableID,
                  formaVariableID: formaVariableID,
                  elementoVariableID: elementoVariableID,
                  elementoVariableCampoID: elementoVariableCampoID,
                  nombreColumnaEnTabla: formulaArreglo[i].valor,
                  tipoColumnaEnTabla: tipoDeAsignacionSeleccionado,
                  nombreVariable: formulaArreglo[i].valor,
                  descripcion: '',
                  operacion: formulaArreglo[i].operacion
              });
              console.log("YEAH 2");
              console.log('elementosFormulas[posicionSel][posicionFormulaEnCampo]');
              console.log(elementosFormulas[posicionSel][posicionFormulaEnCampo]);
          }
      };*/

      if (banderaEsObjeto) {
        formulasVariosAtributos = copiaAntiguaFormulas;
        elementosFormulasVariosAtributos = elementosFormulas;
      } else {
        formulasUnAtributo = copiaAntiguaFormulas;
        elementosFormulasUnAtributos = elementosFormulas;
      }

      console.log('elementosFormulas');
      console.log(elementosFormulas);
      console.log('copiaAntiguaFormulas[posicionSel]');
      console.log(copiaAntiguaFormulas[posicionSel]);
      console.log('copiaAntiguaFormulas');
      console.log(copiaAntiguaFormulas);
      console.log('posicionSel');
      console.log(posicionSel);
      console.log('posicionFormulaEnCampo');
      console.log(posicionFormulaEnCampo);
      var self = this;
      setTimeout(function () {
        console.log(self.state.formulas);
      }, 2000);
    }
  }, {
    key: "getElementsFromFormula",
    value: function getElementsFromFormula(formulaArreglo, array) {
      for (var i = 0; i < formulaArreglo.length; i++) {
        if (Array.isArray(formulaArreglo[i].valor)) {
          this.getElementsFromFormula(formulaArreglo[i].valor, array);
        } else if (formulaArreglo[i].tipo.localeCompare("variable") == 0) {
          var conexionTablaID = -1;
          if (formulaArreglo[i].esFuenteDato != undefined && formulaArreglo[i].esFuenteDato) conexionTablaID = formulaArreglo[i].tablaID;
          var esFuenteDeDato = false;
          if (formulaArreglo[i].esFuenteDato != undefined && formulaArreglo[i].esFuenteDato) esFuenteDeDato = true;
          var excelArchivoID = -1;
          if (formulaArreglo[i].excelArchivoID != undefined) excelArchivoID = formulaArreglo[i].excelArchivoID;
          var excelVariableID = -1;
          if (formulaArreglo[i].excelVariableID != undefined) excelVariableID = formulaArreglo[i].excelVariableID;
          var formaVariableID = -1;
          if (formulaArreglo[i].formaVariableID != undefined) formaVariableID = formulaArreglo[i].formaVariableID;
          var elementoVariableID = -1;
          if (formulaArreglo[i].variableID != undefined) elementoVariableID = formulaArreglo[i].variableID;
          var elementoVariableCampoID = -1;
          if (formulaArreglo[i].variableCampoID != undefined) elementoVariableCampoID = formulaArreglo[i].variableCampoID;
          var esValorManual = false;
          if (formulaArreglo[i].esValorManual != undefined) esValorManual = formulaArreglo[i].esValorManual;
          array.push({
            variableID: -1,
            variableCampoID: -1,
            formulaID: -1,
            conexionTablaID: conexionTablaID,
            esFuenteDeDato: esFuenteDeDato,
            excelArchivoID: excelArchivoID,
            excelVariableID: excelVariableID,
            formaVariableID: formaVariableID,
            elementoVariableID: elementoVariableID,
            elementoVariableCampoID: elementoVariableCampoID,
            esValorManual: esValorManual,
            nombreColumnaEnTabla: formulaArreglo[i].valor,
            tipoColumnaEnTabla: formulaArreglo[i].tipoOriginal,
            nombreVariable: formulaArreglo[i].valor,
            descripcion: '',
            operacion: formulaArreglo[i].operacion
          });
        }
      }

      ;
    }
  }, {
    key: "modificarRegla",
    value: function modificarRegla(esFormula, formulaSeleccionada, posicionFormulaSeleccionada) {
      var reglas, segmentoRegla;

      if (banderaEsObjeto) {
        reglas = reglasVariosAtributos;
        segmentoRegla = segmentoReglasVariosAtributos;
      } else {
        reglas = reglasUnAtributo;
        segmentoRegla = segmentoReglasUnAtributo;
      }

      if (reglas[0].length > 0 || reglas[0][0] != undefined && reglas[0][0].length > 0) {
        console.log('reglas');
        console.log(reglas);
        var posicionAtributo = posicionAtributoSeleccionado; //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
        //cuando se presiona NavBar indice es igual indice anterior
        //cuando se selecciona un campo existente indice = posicion campo

        if (posicionAtributo == -1) {
          posicionAtributo = this.state.atributos.length;
        } //viendo si regla condicion ya tiene regla sino
        //comparando si la regla seleccionada es otra regla, y si la nueva regla a insertar no es formula


        var banderaSinoReglaValido = true;

        if (tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && !esFormula && $("#sinoRADIO").is(':checked')) {
          var nivelABuscar = reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas][indiceSeleccionadoReglas].nivel;

          if (indiceSeleccionadoReglas + 1 < reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas].length) {
            for (var i = indiceSeleccionadoReglas + 1; i < reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas].length; i++) {
              if (nivelABuscar == reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas][i].nivel && reglas[posicionAtributo][indiceSeleccionadoSegmentoReglas][i].operacion.localeCompare("ELSE") == 0) {
                banderaSinoReglaValido = false;
              }
            }

            ;
          }
        }

        var reglaEsValida = true;

        if (!esFormula) {
          if (campoSeleccionado == undefined || campoSeleccionado.valor == undefined) {
            reglaEsValida = false;
          }

          if (valorSeleccionado.length == 0) {
            reglaEsValida = false;
          }

          if (operacionSeleccionada.operacion == undefined) {
            reglaEsValida = false;
          }

          if (campoSeleccionado.tipo != undefined) {
            if (campoSeleccionado.tipo.localeCompare("int") == 0 || campoSeleccionado.tipo.localeCompare("decimal") == 0) {
              if (valorSeleccionado.indexOf("NUMERO") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                reglaEsValida = false;
              }
            } else if (campoSeleccionado.tipo.localeCompare("bool") == 0) {
              if (valorSeleccionado.indexOf("BOOL") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                reglaEsValida = false;
              }
            } else if (campoSeleccionado.tipo.localeCompare("date") == 0) {
              if (valorSeleccionado.indexOf("FECHA") == -1 && valorSeleccionado.indexOf("TIEMPO") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                reglaEsValida = false;
              }
            } else if (campoSeleccionado.tipo.localeCompare("varchar") == 0) {
              if (valorSeleccionado.indexOf("VARCHAR") == -1 && valorSeleccionado.indexOf("LISTAID") == -1) {
                reglaEsValida = false;
              }
            }
          }
        } else {
          if (formulaSeleccionada.formula == undefined) {
            reglaEsValida = false;
          }
        } //si es formula, viendo que no haya regla debajo, formulas solo se pueden agregar al final


        if (banderaSinoReglaValido && reglaEsValida) {
          if (indiceSeleccionadoReglas != -1 || indiceSeleccionadoReglas == -1 && (reglas.length == 0 || reglas[posicionAtributo] != undefined && reglas[posicionAtributo].length == 0)) {
            var entrarACrearRegla = false;

            if (indiceSeleccionadoReglas != -1 && tipoElementoSeleccionadoRegla.length > 0 && tipoElementoSeleccionadoRegla.localeCompare("abajo") != 0 && segmentoRegla[posicionAtributo] != undefined) {
              //validando nueva regla tenga la misma variable o conexion tabla del mismo segmento
              console.log('segmentoRegla');
              console.log(segmentoRegla);
              console.log('campoSeleccionado');
              console.log(campoSeleccionado);
              console.log('formulaSeleccionada');
              console.log(formulaSeleccionada);
              console.log('formulasVariosAtributos');
              console.log(formulasVariosAtributos);
              console.log('posicionAtributo');
              console.log(posicionAtributo);
              console.log('indiceSeleccionadoSegmentoReglas');
              console.log(indiceSeleccionadoSegmentoReglas);
              console.log('segmentoRegla');
              console.log(segmentoRegla);

              if (!esFormula) {
                console.log('1');

                if (campoSeleccionado.tablaID != undefined) {
                  console.log('1.1');

                  if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].conexionTablaID == campoSeleccionado.tablaID) {
                    console.log('1.1.1');
                    entrarACrearRegla = true;
                  }

                  if (indiceSeleccionadoSegmentoReglas == 0) entrarACrearRegla = true;
                } else if (campoSeleccionado.variableID != undefined) {
                  console.log('1.2');

                  if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].variableID == campoSeleccionado.variableID) {
                    console.log('1.2.2');
                    entrarACrearRegla = true;
                  }

                  if (indiceSeleccionadoSegmentoReglas == 0) entrarACrearRegla = true; //viendo si variable seleccionada es objeto

                  var variableSel = this.state.variables.filter(function (object) {
                    return object.ID == campoSeleccionado.variableID;
                  });

                  if (variableSel.length > 0) {
                    if (!variableSel[0].esObjeto) entrarACrearRegla = true;
                  }
                } else if (campoSeleccionado.excelArchivoID != undefined) {
                  entrarACrearRegla = true;
                } else if (campoSeleccionado.formaVariableID != undefined) {
                  entrarACrearRegla = true;
                }
              } else {
                console.log('2');
                console.log(formulaSeleccionada);

                if (formulaSeleccionada.tablaID != undefined && !formulaSeleccionada.esValorManual) {
                  console.log('2.1');

                  if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].conexionTablaID == formulaSeleccionada.tablaID) {
                    console.log('2.1.1');
                    entrarACrearRegla = true;
                  }

                  if (indiceSeleccionadoSegmentoReglas == 0) entrarACrearRegla = true;
                } else if (formulaSeleccionada.variableID != undefined && !formulaSeleccionada.esValorManual) {
                  console.log('2.2');

                  if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].variableID == formulaSeleccionada.variableID) {
                    console.log('2.2.2');
                    entrarACrearRegla = true;
                  }

                  if (indiceSeleccionadoSegmentoReglas == 0) entrarACrearRegla = true; //viendo si variable seleccionada es objeto

                  var variableSel = this.state.variables.filter(function (object) {
                    return object.ID == formulaSeleccionada.variableID;
                  });

                  if (variableSel.length > 0) {
                    if (!variableSel[0].esObjeto) entrarACrearRegla = true;
                  }
                } else if (formulaSeleccionada.excelArchivoID != undefined && !formulaSeleccionada.esValorManual) {
                  entrarACrearRegla = true;
                } else if (formulaSeleccionada.formaVariableID != undefined && !formulaSeleccionada.esValorManual) {
                  entrarACrearRegla = true;
                } else if (formulaSeleccionada.esValorManual) {
                  entrarACrearRegla = true;
                }
              }
            } else if (indiceSeleccionadoReglas == -1 && (reglas.length == 0 || reglas[posicionAtributo] != undefined && reglas[posicionAtributo].length == 0) || tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0 || segmentoRegla[posicionAtributo] == undefined) {
              entrarACrearRegla = true;
            }

            if (entrarACrearRegla) {
              if (!esFormula) {
                var valor = $("#valor").val();
                var posicionSel = posicionAtributoSeleccionado; //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
                //cuando se presiona NavBar indice es igual indice anterior
                //cuando se selecciona un campo existente indice = posicion campo

                if (posicionAtributoSeleccionado == -1) {
                  posicionSel = this.state.atributos.length;
                }

                var posicionInsertarReglaAtributo = 0,
                    posicionInsertarReglaSegmento = 0;
                segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].nivelMax++;
                posicionInsertarReglaAtributo = posicionSel;
                posicionInsertarReglaSegmento = indiceSeleccionadoSegmentoReglas;
                var esCondicion = !esFormula;
                var segmentoReglaIndex = 0;

                if (indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") != 0) {
                  //cuando se esta añadiendo una regla a un segmento existente
                  segmentoReglaIndex = indiceSeleccionadoSegmentoReglas;
                } else if (indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                  //cuando se esta añadiendo una regla a un nuevo segmento
                  segmentoReglaIndex = indiceSeleccionadoSegmentoReglas + 1;
                }

                var conexionTablaID = -1,
                    esConexionTabla = false,
                    nombreColumnaEnTabla = '';

                if (campoSeleccionado.tablaID != undefined) {
                  conexionTablaID = campoSeleccionado.tablaID;
                  esConexionTabla = true;
                  nombreColumnaEnTabla = campoSeleccionado.valor;
                }

                var nuevoNivel = 0;
                var nuevaRegla = {
                  segmentoReglaID: segmentoReglaIndex,
                  conexionTablaID: conexionTablaID,
                  nombreColumnaEnTabla: nombreColumnaEnTabla,
                  formulaID: -1,
                  variableID: -1,
                  variableCampoID: -1,
                  reglaPadreID: -1,
                  tipoCampoObjetivo: campoSeleccionado.tipo,
                  esCondicion: esCondicion,
                  esConexionTabla: esConexionTabla,
                  operacion: operacionSeleccionada.operacion,
                  operacionTexto: operacionSeleccionada.operacionTexto,
                  valor: valor,
                  texto: campoSeleccionado.valor + " " + operacionSeleccionada.operacionTexto + " " + valor,
                  nivel: nuevoNivel,
                  posicionSegmentoEnCampo: segmentoReglaIndex
                };
                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas, 1, nuevaRegla); //deseleccionado regla seleccionada

                indiceSeleccionadoReglas = -1;

                if (banderaEsObjeto) {
                  reglasVariosAtributos = reglas;
                  segmentoReglasVariosAtributos = segmentoRegla;
                } else {
                  reglasUnAtributo = reglas;
                  segmentoReglasUnAtributo = segmentoRegla;
                }

                this.setState({
                  reglas: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]
                }); //reglas[posicionSel].push(nuevaRegla);

                console.log('reglas');
                console.log(reglas);
                console.log('segmentoRegla');
                console.log(segmentoRegla);
                console.log('posicionInsertarReglaAtributo');
                console.log(posicionInsertarReglaAtributo);
                console.log('posicionInsertarReglaSegmento');
                console.log(posicionInsertarReglaSegmento);
                console.log('indiceSeleccionadoReglas');
                console.log(indiceSeleccionadoReglas);
                console.log('campoSeleccionado');
                console.log(campoSeleccionado);
                campoSeleccionado = null;
                valorSeleccionado = '';
              } else {
                //es regla formula
                var posicionSel = posicionAtributoSeleccionado; //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
                //cuando se presiona NavBar indice es igual indice anterior
                //cuando se selecciona un campo existente indice = posicion campo

                if (posicionAtributoSeleccionado == -1) {
                  posicionSel = this.state.atributos.length;
                } //verificando que campo de formula seleccionado es mismo tipo variable
                //tipoDeAsignacionSeleccionado


                if (this.state.tipoNuevaVariable.localeCompare(tipoDeAsignacionSeleccionado) == 0 || this.state.tipoNuevaVariable.length == 0) {
                  console.log("INICIO AGREGAR FORMULA");
                  var nuevoNivel = 0;

                  if (banderaEsObjeto) {
                    nuevoNivel = nivelNuevoAtributoVarios;
                  } else {
                    nuevoNivel = nivelNuevoAtributoUnico;
                  }

                  var posicionInsertarReglaAtributo = 0,
                      posicionInsertarReglaSegmento = 0;
                  segmentoRegla[posicionSel][indiceSeleccionadoSegmentoReglas].nivelMax++;
                  posicionInsertarReglaAtributo = posicionSel;
                  posicionInsertarReglaSegmento = indiceSeleccionadoSegmentoReglas;
                  var esCondicion = !esFormula;
                  var segmentoReglaIndex = 0;

                  if (indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") != 0) {
                    //cuando se esta añadiendo una regla a un segmento existente
                    segmentoReglaIndex = indiceSeleccionadoSegmentoReglas;
                  } else if (indiceSeleccionadoSegmentoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                    //cuando se esta añadiendo una regla a un nuevo segmento
                    segmentoReglaIndex = indiceSeleccionadoSegmentoReglas + 1;
                  }

                  var conexionTablaID = -1,
                      esConexionTabla = false,
                      nombreColumnaEnTabla = '';

                  if (campoSeleccionado.tablaID != undefined) {
                    conexionTablaID = campoSeleccionado.tablaID;
                    esConexionTabla = true;
                    nombreColumnaEnTabla = campoSeleccionado.valor;
                  }

                  var nuevaRegla = {
                    segmentoReglaID: segmentoReglaIndex,
                    conexionTablaID: conexionTablaID,
                    nombreColumnaEnTabla: '',
                    formulaID: posicionFormulaSeleccionada,
                    variableID: -1,
                    variableCampoID: -1,
                    reglaPadreID: -1,
                    esCondicion: esCondicion,
                    esConexionTabla: esConexionTabla,
                    operacion: formulaSeleccionada.operacion,
                    operacionTexto: this.retornarCodigoOperacion(formulaSeleccionada.operacion),
                    valor: formulaSeleccionada.operacion,
                    texto: formulaSeleccionada.formula,
                    nivel: nuevoNivel,
                    posicionSegmentoEnCampo: segmentoReglaIndex
                  };
                  reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas, 1, nuevaRegla); //deseleccionado regla seleccionada
                  //indiceSeleccionadoReglas = -1;

                  var tempNewCopy = _toConsumableArray(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]);

                  this.setState({
                    reglas: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]
                  }, console.log(this.state.reglas));
                  console.log('reglas');
                  console.log(reglas);
                  console.log('segmentoRegla');
                  console.log(segmentoRegla);
                  console.log('posicionInsertarReglaAtributo');
                  console.log(posicionInsertarReglaAtributo);
                  console.log('posicionInsertarReglaSegmento');
                  console.log(posicionInsertarReglaSegmento);
                  console.log('indiceSeleccionadoReglas');
                  console.log(indiceSeleccionadoReglas);
                  console.log('formulaSeleccionada');
                  console.log(formulaSeleccionada);
                  formulaSeleccionada = null;
                  var self = this;
                  setTimeout(function () {
                    console.log(self.state.reglas);
                  }, 2000);

                  if (this.state.tipoNuevaVariable.length == 0) {
                    this.setState({
                      tipoNuevaVariable: tipoDeAsignacionSeleccionado
                    });
                  } //tipoDeAsignacionSeleccionado = '';


                  if (banderaEsObjeto) {
                    reglasVariosAtributos = reglas;
                    segmentoReglasVariosAtributos = segmentoRegla;
                  } else {
                    reglasUnAtributo = reglas;
                    segmentoReglasUnAtributo = segmentoRegla;
                  }
                } else {
                  if (this.state.tipoNuevaVariable.localeCompare(tipoDeAsignacionSeleccionado) != 0) {
                    alert("El tipo de asignacion de formula no coincide el tipo de campo.");
                  }
                }
              }
            } else {
              var texto2 = 'variable';
              if (campoSeleccionado.tablaID != undefined) texto2 = 'tabla';
              var texto = 'formula';
              if (!esFormula) texto = 'comparación';
              alert("La " + texto + " ingresada no pertenece a la misma " + texto2 + ".");
            }
          } else {
            alert("Seleccione una posición en la 'Lógica para el cálculo'");
          }
        } else {
          if (!reglaEsValida && !esFormula) alert("Ingrese todos los campos necesarios para la condicion.");else if (!reglaEsValida && esFormula) alert("Seleccione una formula.");else alert("La comparación ya tiene una clausula 'SINO'");
        }
      } else {
        alert("Cree una comparación primero");
      }
    }
  }, {
    key: "eliminarRegla",
    value: function eliminarRegla() {
      var reglas, segmentoRegla;

      if (banderaEsObjeto) {
        reglas = reglasVariosAtributos;
        segmentoRegla = segmentoReglasVariosAtributos;
      } else {
        reglas = reglasUnAtributo;
        segmentoRegla = segmentoReglasUnAtributo;
      }

      if (reglas[0].length > 0 || reglas[0][0] != undefined && reglas[0][0].length > 0) {
        var posicionSel = posicionAtributoSeleccionado; //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
        //cuando se presiona NavBar indice es igual indice anterior
        //cuando se selecciona un campo existente indice = posicion campo

        if (posicionAtributoSeleccionado == -1) {
          posicionSel = this.state.atributos.length;
        }

        var posicionInsertarReglaAtributo = 0,
            posicionInsertarReglaSegmento = 0;
        posicionInsertarReglaAtributo = posicionSel;
        posicionInsertarReglaSegmento = indiceSeleccionadoSegmentoReglas;
        reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas, 1);
        indiceSeleccionadoReglas = -1;

        if (reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length == 0) {
          reglas[posicionInsertarReglaAtributo].splice(posicionInsertarReglaSegmento, 1);
          segmentoRegla[posicionInsertarReglaAtributo].splice(posicionInsertarReglaSegmento, 1);
        }

        console.log('reglas');
        console.log(reglas);
        console.log('segmentoRegla');
        console.log(segmentoRegla);

        if (reglas[posicionInsertarReglaAtributo] == undefined || reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] == undefined || reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length == 0) {
          this.setState({
            reglas: []
          });
        } else {
          this.setState({
            reglas: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]
          });
        }

        if (banderaEsObjeto) {
          reglasVariosAtributos = reglas;
          segmentoReglasVariosAtributos = segmentoRegla;
        } else {
          reglasUnAtributo = reglas;
          segmentoReglasUnAtributo = segmentoRegla;
        }
      } else {
        alert("Cree una comparación primero");
      }
    }
  }, {
    key: "modificarFormula",
    value: function modificarFormula(formula, formulaArreglo) {
      // 1. Make a shallow copy of the items
      //let campos = [...this.state.camposDeTabla];
      // 2. Make a shallow copy of the item you want to mutate
      //let campo = [...campos[index]];
      // 3. Replace the property you're intested in
      //campo = {ID: campo.ID, idTabla: idTabla, nombre: campoNombre, tipo: tipoCampo, guardar: guardarCampo};
      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      //campos[index] = campo;
      // 5. Set the state to our new copy
      var posicionSel = posicionAtributoSeleccionado; //indice = -1 cuando se va a condiciones de un campo nuevo
      //cuando se presiona NavBar indice es igual indice anterior
      //cuando se selecciona un campo existente indice = posicion campo

      if (posicionAtributoSeleccionado == -1) {
        posicionSel = this.state.atributos.length;
      } //copia antigua formulas


      var elementosFormulas, copiaAntiguaFormulas;

      if (banderaEsObjeto) {
        copiaAntiguaFormulas = formulasVariosAtributos;
        elementosFormulas = elementosFormulasVariosAtributos;
      } else {
        copiaAntiguaFormulas = formulasUnAtributo;
        elementosFormulas = elementosFormulasUnAtributos;
      }

      if (copiaAntiguaFormulas[posicionSel] == undefined) copiaAntiguaFormulas[posicionSel] = [];
      copiaAntiguaFormulas[posicionSel][indiceFormulaSeleccionadaEdit] = formula;
      this.setState({
        formulas: copiaAntiguaFormulas[posicionSel]
      });
      if (elementosFormulas[posicionSel] == undefined) elementosFormulas[posicionSel] = [];
      var posicionFormulaEnCampo = indiceFormulaSeleccionadaEdit; //indiceSeleccionadoFormula es el indice de la formula seleccionada, las formula se asocian por campo (1 campo => muchas formulas)

      if (elementosFormulas[posicionSel][posicionFormulaEnCampo] == undefined) elementosFormulas[posicionSel][posicionFormulaEnCampo] = [];
      var arregloDeElementos = [];
      this.getElementsFromFormula(formulaArreglo, arregloDeElementos);
      elementosFormulas[posicionSel][posicionFormulaEnCampo] = arregloDeElementos;

      if (banderaEsObjeto) {
        formulasVariosAtributos = copiaAntiguaFormulas;
        elementosFormulasVariosAtributos = elementosFormulas;
      } else {
        formulasUnAtributo = copiaAntiguaFormulas;
        elementosFormulasUnAtributos = elementosFormulas;
      }

      console.log('elementosFormulas');
      console.log(elementosFormulas);
      console.log('copiaAntiguaFormulas[posicionSel]');
      console.log(copiaAntiguaFormulas[posicionSel]);
      console.log('copiaAntiguaFormulas');
      console.log(copiaAntiguaFormulas);
      console.log('posicionSel');
      console.log(posicionSel);
      console.log('posicionFormulaEnCampo');
      console.log(posicionFormulaEnCampo);
      var self = this;
      setTimeout(function () {
        console.log(self.state.formulas);
      }, 2000);
    }
  }, {
    key: "eliminarFormula",
    value: function eliminarFormula() {
      // 1. Make a shallow copy of the items
      //let campos = [...this.state.camposDeTabla];
      // 2. Make a shallow copy of the item you want to mutate
      //let campo = [...campos[index]];
      // 3. Replace the property you're intested in
      //campo = {ID: campo.ID, idTabla: idTabla, nombre: campoNombre, tipo: tipoCampo, guardar: guardarCampo};
      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      //campos[index] = campo;
      // 5. Set the state to our new copy
      var posicionSel = posicionAtributoSeleccionado; //indice = -1 cuando se va a condiciones de un campo nuevo
      //cuando se presiona NavBar indice es igual indice anterior
      //cuando se selecciona un campo existente indice = posicion campo

      if (posicionAtributoSeleccionado == -1) {
        posicionSel = this.state.atributos.length;
      } //copia antigua formulas


      var elementosFormulas, copiaAntiguaFormulas;

      if (banderaEsObjeto) {
        copiaAntiguaFormulas = formulasVariosAtributos;
        elementosFormulas = elementosFormulasVariosAtributos;
      } else {
        copiaAntiguaFormulas = formulasUnAtributo;
        elementosFormulas = elementosFormulasUnAtributos;
      }

      if (copiaAntiguaFormulas[posicionSel] == undefined) copiaAntiguaFormulas[posicionSel] = [];
      copiaAntiguaFormulas[posicionSel].splice(indiceFormulaSeleccionadaEdit, 1);
      this.setState({
        formulas: copiaAntiguaFormulas[posicionSel]
      });
      var posicionFormulaEnCampo = indiceFormulaSeleccionadaEdit;
      elementosFormulas[posicionSel].splice(posicionFormulaEnCampo, 1);
      console.log('elementosFormulas');
      console.log(elementosFormulas);
      console.log('copiaAntiguaFormulas[posicionSel]');
      console.log(copiaAntiguaFormulas[posicionSel]);
      console.log('copiaAntiguaFormulas');
      console.log(copiaAntiguaFormulas);
      console.log('posicionSel');
      console.log(posicionSel);
      console.log('posicionFormulaEnCampo');
      console.log(posicionFormulaEnCampo);
      var self = this;
      setTimeout(function () {
        console.log(self.state.formulas);
      }, 2000);
    }
  }, {
    key: "retornoCampoFormula",
    value: function retornoCampoFormula(tipoVariable) {
      tipoDeAsignacionSeleccionado = tipoVariable;
    }
  }, {
    key: "retornoCampoCondicion",
    value: function retornoCampoCondicion(campo) {
      campoSeleccionado = campo;
    }
  }, {
    key: "retornoOperacion",
    value: function retornoOperacion(operacion) {
      operacionSeleccionada = operacion;
    }
  }, {
    key: "actualizarIndiceSeleccionadoReglas",
    value: function actualizarIndiceSeleccionadoReglas(indiceSegmento, indiceRegla, tipoElemento) {
      //indice = indice de regla dentro de arreglo de reglas
      //tipoElemento = si la seleccion en el contenedor de reglas es cursor arriba, cursor abajo, y otra regla o otra formula
      indiceSeleccionadoSegmentoReglas = indiceSegmento;
      indiceSeleccionadoReglas = indiceRegla;
      tipoElementoSeleccionadoRegla = tipoElemento;
    }
  }, {
    key: "actualizarEstadoSiEsObjeto",
    value: function actualizarEstadoSiEsObjeto(esObjeto) {
      banderaEsObjeto = esObjeto;
    }
  }, {
    key: "actualizarEstadoSiEsInstruccionSQL",
    value: function actualizarEstadoSiEsInstruccionSQL(esObjeto) {
      banderaEsInstruccionSQL = esObjeto;
    }
  }, {
    key: "actualizarNivelNuevaRegla",
    value: function actualizarNivelNuevaRegla(nivel) {
      if (banderaEsObjeto) {
        if (nivelNuevoAtributoVarios < nivel) nivelNuevoAtributoVarios = nivel;
      } else {
        if (nivelNuevoAtributoUnico < nivel) nivelNuevoAtributoUnico = nivel;
      }
    }
  }, {
    key: "actualizarSeleccionFormula",
    value: function actualizarSeleccionFormula(formula, indice) {
      var condicionFormula = " ID = " + formula.ID,
          condicionElemento = " formulaID = " + formula.ID;
      this.setState({
        formulaSeleccionadaEdit: formula,
        condicionFormula: condicionFormula,
        condicionElemento: condicionElemento
      });
      indiceFormulaSeleccionadaEdit = indice;
    }
  }, {
    key: "actualizarNombreVariable",
    value: function actualizarNombreVariable() {
      var nombreVariableN = $("#nombreFuenteDato").val();
      nombreVariable = nombreVariableN;
    }
  }, {
    key: "actualizarDescripcionVariable",
    value: function actualizarDescripcionVariable() {
      var descripcionVariableN = $("#descripcionFuenteDato").val();
      descripcionVariable = descripcionVariableN;
    }
  }, {
    key: "actualizarNombreCampoNuevoAtributosVario",
    value: function actualizarNombreCampoNuevoAtributosVario() {
      var nombreCampo = $("#nombreAtributoNuevoCampo").val();
      nombreCampoNuevoAtributosVario = nombreCampo;
    }
  }, {
    key: "actualizarFechaInicio",
    value: function actualizarFechaInicio(fecha) {
      fechaInicioVariable = fecha;
    }
  }, {
    key: "actualizarPeriodicidad",
    value: function actualizarPeriodicidad() {
      var periodicidad = $("#periodicidad").val();
      periodicidadVariable = periodicidad;
    }
  }, {
    key: "actualizarNombreEncargado",
    value: function actualizarNombreEncargado() {
      var analista = $("#analista").val();
      analistaVariable = analista;
    }
  }, {
    key: "retornarCodigoOperacion",
    value: function retornarCodigoOperacion(codigo) {
      if (codigo.localeCompare("ASIG") == 0) {
        return "ASIGNAR";
      }

      if (codigo.localeCompare("COUNT") == 0) {
        return "CONTAR";
      }

      if (codigo.localeCompare("PROM") == 0) {
        return "PROMEDIAR";
      }

      if (codigo.localeCompare("MAX") == 0) {
        return "MÁXIMO";
      }

      if (codigo.localeCompare("MIN") == 0) {
        return "MÍNIMO";
      }

      if (codigo.localeCompare("SUM") == 0) {
        return "SUMAR";
      }

      if (codigo.localeCompare("FORMULA") == 0) {
        return "FORMULA";
      }
    }
  }, {
    key: "getVariables",
    value: function getVariables() {
      var _this15 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Variables", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this15.setState({
                variables: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getExcel",
    value: function getExcel() {
      var _this16 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ExcelVariables", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this16.setState({
                excel: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getFormas",
    value: function getFormas() {
      var _this17 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from FormasVariables", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this17.setState({
                formas: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "verificarNoExisteNombreVar",
    value: function verificarNoExisteNombreVar(nombre) {
      var noExiste = true;

      for (var i = 0; i < this.state.variables.length; i++) {
        if (this.state.variables[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
          noExiste = false;
          break;
        }
      }

      ;

      if (noExiste) {
        for (var i = 0; i < this.state.excel.length; i++) {
          if (this.state.excel[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
            noExiste = false;
            break;
          }
        }

        ;
      }

      if (noExiste) {
        for (var i = 0; i < this.state.formas.length; i++) {
          if (this.state.formas[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
            noExiste = false;
            break;
          }
        }

        ;
      }

      return noExiste;
    }
  }, {
    key: "verificarNoExisteNombreCampo",
    value: function verificarNoExisteNombreCampo(nombre) {
      var noExiste = true;

      if (banderaEsInstruccionSQL) {
        for (var i = 0; i < variablesSQL.length; i++) {
          if (variablesSQL[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
            noExiste = false;
            break;
          }
        }

        ;
      } else {
        for (var i = 0; i < atributosVario.length; i++) {
          if (atributosVario[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
            noExiste = false;
            break;
          }
        }

        ;
      }

      return noExiste;
    }
  }, {
    key: "actualizarCampoSQL",
    value: function actualizarCampoSQL(index, nombreN, tipoN) {
      var tempCopy = _toConsumableArray(variablesSQL);

      console.log('tempCopy[index] antes');
      console.log(tempCopy[index]);
      tempCopy[index].nombre = nombreN;
      tempCopy[index].tipo = tipoN;
      variablesSQL[index].nombre = nombreN;
      variablesSQL[index].tipo = tipoN;
      console.log('tempCopy[index] despues');
      console.log(tempCopy[index]);
      this.setState({
        camposInstruccionSQL: tempCopy
      }, console.log(this.state.camposInstruccionSQL));
    }
  }, {
    key: "eliminarCampoSQL",
    value: function eliminarCampoSQL(index) {
      var tempCopy = _toConsumableArray(variablesSQL);

      tempCopy.splice(index, 1);
      variablesSQL.splice(index, 1);
      this.setState({
        camposInstruccionSQL: tempCopy
      });
    }
  }, {
    key: "isValidDate",
    value: function isValidDate(fecha) {
      if (Object.prototype.toString.call(fecha) === "[object Date]") {
        if (isNaN(fecha.getTime())) {
          alert("Ingrese una fecha valida.");
          return false;
        } else {
          return true;
        }
      } else {
        alert("Ingrese una fecha valida.");
        return false;
      }
    }
  }, {
    key: "hasWhiteSpace",
    value: function hasWhiteSpace(s) {
      return /\s/g.test(s);
    }
  }, {
    key: "render",
    value: function render() {
      var _this18 = this;

      if (this.state.componenteActual.localeCompare("crearVariable") == 0) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }, _react["default"].createElement(_CrearVariable["default"], {
          pool: this.props.pool,
          terminoCrearCampo: this.props.terminoCrearCampo,
          columnas: this.props.columnas,
          atributos: this.state.atributos,
          cambioDeArreglosDeAtributos: this.cambioDeArreglosDeAtributos,
          nombreVariable: nombreVariable,
          tipoNuevaVariable: this.state.tipoNuevaVariable,
          actualizarNombreVariable: this.actualizarNombreVariable,
          descripcionVariable: descripcionVariable,
          actualizarDescripcionVariable: this.actualizarDescripcionVariable,
          nombreCampoNuevoAtributosVario: nombreCampoNuevoAtributosVario,
          actualizarNombreCampoNuevoAtributosVario: this.actualizarNombreCampoNuevoAtributosVario,
          actualizarEstadoSiEsObjeto: this.actualizarEstadoSiEsObjeto,
          actualizarEstadoSiEsInstruccionSQL: this.actualizarEstadoSiEsInstruccionSQL,
          configuracionHome: this.props.configuracionHome,
          goOptions: this.props.goOptions,
          retornoSeleccionVariables: this.props.retornoSeleccionVariables,
          goToCreateConditions: this.goToCreateConditions,
          goCreateVariableFieldSQL: this.goCreateVariableFieldSQL,
          guardarVariable: this.guardarVariable,
          crearAtributoVariable: this.crearAtributoVariable,
          eliminarAtributoVariable: this.eliminarAtributoVariable,
          modificarNombreVariable: this.modificarNombreVariable,
          actualizarFechaInicio: this.actualizarFechaInicio,
          actualizarPeriodicidad: this.actualizarPeriodicidad,
          actualizarNombreEncargado: this.actualizarNombreEncargado,
          fechaInicioVariable: fechaInicioVariable,
          periodicidadVariable: periodicidadVariable,
          analistaVariable: analistaVariable
        }));
      } else if (this.state.componenteActual.localeCompare("variableCondiciones") == 0) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }, _react["default"].createElement(_InstruccionVariable["default"], {
          pool: this.props.pool,
          retornarCampo: this.retornarCampo,
          campos: this.props.columnas,
          camposDropdown: [{
            valor: this.props.nombreTablaSeleccionada
          }],
          valoresDropdown: this.props.columnas,
          asignaciones: this.state.formulas,
          callbackCrearRegla: this.anadirRegla,
          callbackModificarRegla: this.modificarRegla,
          callbackEliminarRegla: this.eliminarRegla,
          retornarIndiceSeleccionado: this.actualizarIndiceSeleccionadoReglas,
          retornarEstadoVistaEsCondicion: function retornarEstadoVistaEsCondicion() {
            _this18.actualizarCondicion;
          },
          retornoCampo: this.retornoCampoCondicion,
          retornarValor: this.retornarValor,
          retornoOperacion: this.retornoOperacion,
          actualizarSeleccionFormula: this.actualizarSeleccionFormula,
          reglas: this.state.reglas,
          navbar: this.state.navbar,
          goToCreateFormula: this.goToCreateFormula,
          configuracionHome: this.props.configuracionHome,
          goOptions: this.props.goOptions,
          actualizarNivelNuevaRegla: this.actualizarNivelNuevaRegla,
          retornoSeleccionVariables: this.props.retornoSeleccionVariables,
          eliminarFormula: this.eliminarFormula,
          esEditarVar: false,
          tablaBorrarFormulas: "FormulasVariablesCampos",
          tablaBorrarElementos: "ElementoFormulasVariablesCampos",
          condicionFormula: this.state.condicionFormula,
          condicionElemento: this.state.condicionElemento
        }));
      } else if (this.state.componenteActual.localeCompare("variableFormula") == 0) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }, _react["default"].createElement(_Formula["default"], {
          pool: this.props.pool,
          esEditarVar: this.state.esEditarVar,
          esOperacionSQL: this.state.esOperacionSQL,
          operacionSQL: this.state.operacionSQL,
          formulaSeleccionadaEdit: this.state.formulaSeleccionadaEdit,
          anadirFormula: this.anadirFormula,
          modificarFormula: this.modificarFormula,
          retornoCampo: this.retornoCampoFormula,
          retornoOperacion: this.retornoOperacion,
          actualizarNivelNuevaRegla: this.actualizarNivelNuevaRegla,
          navbar: this.state.navbar
        }));
      } else if (this.state.componenteActual.localeCompare("variableSQL") == 0) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }, _react["default"].createElement(_InstruccionSQL["default"], {
          pool: this.props.pool,
          variableID: this.state.variableID,
          nombreVariable: this.state.nombreVariable,
          camposInstruccionSQL: this.state.camposInstruccionSQL,
          comandoSQL: this.state.comandoSQL,
          agregarCampo: this.crearVariableSQL,
          agregarInstruccionSQL: this.crearInstruccionSQL,
          actualizarCampo: this.actualizarCampoSQL,
          eliminarCampo: this.eliminarCampoSQL,
          navbar: this.state.navbar
        }));
      }
    }
  }]);

  return CrearVariablesHome;
}(_react["default"].Component);

exports["default"] = CrearVariablesHome;
//# sourceMappingURL=CrearVariablesHome.js.map
