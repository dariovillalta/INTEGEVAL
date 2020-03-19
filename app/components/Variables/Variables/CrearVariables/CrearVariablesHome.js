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

var _InstruccionSQL = _interopRequireDefault(require("../../../InstruccionSQL.js"));

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

var campoSeleccionado, operacionSeleccionada, objetoConexionSeleccionada;
var tipoDeAsignacionSeleccionado; //para saber el tipo de asignacion que se debera hacer al atributo / campo

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

var indiceSeleccionadoReglas = -1; //indice seleccionado regla

var tipoElementoSeleccionadoRegla = ''; //tipo de seleccion de cursor de regla: esOtraRegla, arriba, abajo

var posicionAtributoSeleccionado = -1; //posicion del arreglo donde se debe insertar el siguiente atributo / campo /  columna (para controlar cuando se agrega condiciones / instrucciones a un nuevo atributo)

var indiceSeleccionadoFormula = -1; //indice seleccionado formula

var nombreVariable = '';
var descripcionVariable = '';
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
var banderaEsObjeto = true; //bandera para saber si la variable actual es objeto o no a traves de las diferentes vistas / componentes

var contadorObjetosAGuardar = 0; //bandera que lleva el total de objetos a guardar para limpiar los arreglos despues

var contadorObjetosGuardados = 0; //bandera que lleva el total de objetos a guardar para limpiar los arreglos despues

var CrearFuenteDatosHome =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CrearFuenteDatosHome, _React$Component);

  function CrearFuenteDatosHome(props) {
    var _this;

    _classCallCheck(this, CrearFuenteDatosHome);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CrearFuenteDatosHome).call(this, props));
    _this.state = {
      componenteActual: 'crearVariable',
      atributos: [],
      reglas: [],
      formulas: [],
      esCondicion: true,
      //bandera para estado de nueva regla / instruccion, saber si es nueva comparacion o regla / instruccion = verdadero; si es falso = es nueva formula / asignacion
      navbar: ""
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
    _this.createVariableField = _this.createVariableField.bind(_assertThisInitialized(_this));
    _this.getVariableFieldID = _this.getVariableFieldID.bind(_assertThisInitialized(_this));
    _this.createVariableFieldRuleSegments = _this.createVariableFieldRuleSegments.bind(_assertThisInitialized(_this));
    _this.getVariableFieldRuleSegments = _this.getVariableFieldRuleSegments.bind(_assertThisInitialized(_this));
    _this.createVariableFieldRules = _this.createVariableFieldRules.bind(_assertThisInitialized(_this));
    _this.createVariableFieldFormula = _this.createVariableFieldFormula.bind(_assertThisInitialized(_this));
    _this.getVariableFieldFormulaID = _this.getVariableFieldFormulaID.bind(_assertThisInitialized(_this));
    _this.createVariableFieldFormulaElement = _this.createVariableFieldFormulaElement.bind(_assertThisInitialized(_this));
    _this.retornarCampo = _this.retornarCampo.bind(_assertThisInitialized(_this));
    _this.actualizarCondicion = _this.actualizarCondicion(_assertThisInitialized(_this));
    _this.cambioDeArreglosDeAtributos = _this.cambioDeArreglosDeAtributos.bind(_assertThisInitialized(_this));
    _this.guardarVariable = _this.guardarVariable.bind(_assertThisInitialized(_this));
    _this.guardarVariableUnAtributo = _this.guardarVariableUnAtributo.bind(_assertThisInitialized(_this));
    _this.guardarVariableVariosAtributo = _this.guardarVariableVariosAtributo.bind(_assertThisInitialized(_this));
    _this.crearAtributoVariable = _this.crearAtributoVariable.bind(_assertThisInitialized(_this));
    _this.anadirRegla = _this.anadirRegla.bind(_assertThisInitialized(_this));
    _this.anadirFormula = _this.anadirFormula.bind(_assertThisInitialized(_this));
    _this.retornoCampo = _this.retornoCampo.bind(_assertThisInitialized(_this));
    _this.retornoOperacion = _this.retornoOperacion.bind(_assertThisInitialized(_this));
    _this.retornoTipoDeAsignacion = _this.retornoTipoDeAsignacion.bind(_assertThisInitialized(_this));
    _this.actualizarIndiceSeleccionadoReglas = _this.actualizarIndiceSeleccionadoReglas.bind(_assertThisInitialized(_this));
    _this.actualizarNivelNuevaRegla = _this.actualizarNivelNuevaRegla.bind(_assertThisInitialized(_this));
    _this.actualizarNombreVariable = _this.actualizarNombreVariable.bind(_assertThisInitialized(_this));
    _this.actualizarDescripcionVariable = _this.actualizarDescripcionVariable.bind(_assertThisInitialized(_this));
    _this.actualizarNombreCampoNuevoAtributosVario = _this.actualizarNombreCampoNuevoAtributosVario.bind(_assertThisInitialized(_this));
    _this.retornarCodigoOperacion = _this.retornarCodigoOperacion.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CrearFuenteDatosHome, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
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

      console.log('posicionSel');
      console.log(posicionSel);
      console.log('formulas[posicionSel]');
      console.log(formulas[posicionSel]);
      console.log('reglas[posicionSel]');
      console.log(reglas[posicionSel]);
      console.log('formulas');
      console.log(formulas);
      console.log('reglas');
      console.log(reglas);
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
    value: function goToCreateFormula(indice) {
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

      indiceSeleccionadoFormula = indice;
      this.setState({
        componenteActual: "variableFormula",
        navbar: navbar
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
        request.query("insert into Variables (nombre, descripcion, esObjeto, objetoPadreID, guardar) values ('" + variable.nombre + "', '" + variable.descripcion + "', '" + variable.esObjeto + "', " + variable.objetoPadreID + ", '" + variable.guardar + "')", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              contadorObjetosGuardados++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              alert("variable creada.");
              contadorObjetosGuardados++;

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
        request.query("select * from Variables where nombre = '" + variable.nombre + "'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                for (var i = 0; i < campos.length; i++) {
                  contadorObjetosAGuardar++;

                  _this3.createVariableField(result.recordset[0], campos[i], i);
                }

                ;
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "createVariableField",
    value: function createVariableField(variable, variableCampo, posicionAtributo) {
      var _this4 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into VariablesCampos (variableID, nombre, tipo, nivel, esInstruccionSQL) values (" + variable.ID + ", '" + variableCampo.nombre + "', '" + variableCampo.tipo + "', " + variableCampo.nivel + ", 'false')", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              contadorObjetosGuardados++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              //this.props.terminoCrearCampo(variable, variableCampo);
              contadorObjetosGuardados++;

              _this4.getVariableFieldID(variable, variableCampo, posicionAtributo);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getVariableFieldID",
    value: function getVariableFieldID(variable, variableCampo, posicionAtributo) {
      var _this5 = this;

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
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var posicionSel = posicionAtributoSeleccionado; //si fue llamado de crear atributo

              if (posicionAtributoSeleccionado == -1) {
                posicionSel = _this5.state.atributos.length;
              }

              var esObjeto;
              if ($("#esObjetoFuenteDato").is(':checked')) esObjeto = true;else esObjeto = false;
              var formulas, segmentoRegla;

              if (esObjeto) {
                formulas = formulasVariosAtributos;
                segmentoRegla = segmentoReglasVariosAtributos;
              } else {
                formulas = formulasUnAtributo;
                segmentoRegla = segmentoReglasUnAtributo;
              }

              for (var j = 0; j < formulas[posicionAtributo].length; j++) {
                formulas[posicionAtributo][j].posicionFormulaEnCampo = j;
                contadorObjetosAGuardar++;

                _this5.createVariableFieldFormula(variable, result.recordset[0], formulas[posicionAtributo][j], posicionAtributo, j);
              }

              ;

              if (formulas[posicionAtributo].length == 0) {
                for (var j = 0; j < segmentoRegla[posicionAtributo].length; j++) {
                  segmentoRegla[posicionAtributo][j].posicionSegmentoEnCampo = j;
                  contadorObjetosAGuardar++;

                  _this5.createVariableFieldRuleSegments(variable, result.recordset[0], segmentoRegla[posicionAtributo][j], posicionAtributo, j);
                }

                ;
              }

              if (formulas[posicionAtributo].length == 0 && segmentoRegla[posicionAtributo].length == 0) {
                _this5.limpiarArreglos();
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "createVariableFieldRuleSegments",
    value: function createVariableFieldRuleSegments(variable, variableCampo, segmento, posicionAtributo, posicionSegmento, formula) {
      var _this6 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into SegmentoReglas (conexionTablaID, variableID, variableCampoID, esConexionTabla, posicionSegmentoEnCampo, nivelMax) values (" + segmento.conexionTablaID + ", " + variable.ID + ", " + variableCampo.ID + ", '" + segmento.esConexionTabla + "', " + posicionSegmento + ", " + segmento.nivelMax + ")", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              contadorObjetosGuardados++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              contadorObjetosGuardados++;

              _this6.getVariableFieldRuleSegments(variable, variableCampo, segmento, posicionAtributo, posicionSegmento, formula);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getVariableFieldRuleSegments",
    value: function getVariableFieldRuleSegments(variable, variableCampo, segmento, posicionAtributo, posicionSegmento, formula) {
      var _this7 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from SegmentoReglas where conexionTablaID = " + segmento.conexionTablaID + " and variableID = " + variable.ID + " and variableCampoID = " + variableCampo.ID + " and esConexionTabla = '" + segmento.esConexionTabla + "' and posicionSegmentoEnCampo = " + posicionSegmento + " and nivelMax = " + segmento.nivelMax, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log('resultado FormulasVariablesCampos');
              console.log(result.recordset);

              if (result.recordset.length > 0) {
                var reglas;

                if (banderaEsObjeto) {
                  reglas = reglasVariosAtributos;
                } else {
                  reglas = reglasUnAtributo;
                }

                for (var k = 0; k < reglas[posicionAtributo][posicionSegmento].length; k++) {
                  reglas[posicionAtributo][posicionSegmento][k].segmentoReglaID = result.recordset[0].ID; //crear reglas que sean de comparacion (esCondicion = verdadero)

                  if (reglas[posicionAtributo][posicionSegmento][k].esCondicion) {
                    contadorObjetosAGuardar++;

                    _this7.createVariableFieldRules(variable, variableCampo, result.recordset[0], reglas[posicionAtributo][posicionSegmento][k]);
                  } else if (!reglas[posicionAtributo][posicionSegmento][k].esCondicion) {
                    contadorObjetosAGuardar++; //crear reglas que sean de asignacion (esCondicion = falso) con el id de formula correcto

                    reglas[posicionAtributo][posicionSegmento][k].formulaID = formula.ID;

                    _this7.createVariableFieldRules(variable, variableCampo, result.recordset[0], reglas[posicionAtributo][posicionSegmento][k]);
                  }
                }

                ;

                if (reglas[posicionAtributo][posicionSegmento].length == 0) {
                  _this7.limpiarArreglos();
                }
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "createVariableFieldRules",
    value: function createVariableFieldRules(variable, variableCampo, segmento, regla) {
      var _this8 = this;

      if (regla != undefined) {
        var transaction = new _mssql["default"].Transaction(this.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("insert into Reglas (segmentoReglaID, variableID, variableCampoID, formulaID, reglaPadreID, conexionTablaID, nombreColumnaEnTabla, esCondicion, operacion, operacionTexto, valor, texto, nivel) values (" + segmento.ID + ", " + variable.ID + ", " + variableCampo.ID + ", " + regla.formulaID + ", " + regla.reglaPadreID + ", " + regla.conexionTablaID + ", '" + regla.nombreColumnaEnTabla + "', '" + regla.esCondicion + "', '" + regla.operacion + "', '" + regla.operacionTexto + "', '" + regla.valor + "', '" + regla.texto + "', " + regla.nivel + ")", function (err, result) {
            if (err) {
              if (!rolledBack) {
                console.log(err);
                contadorObjetosGuardados++;

                _this8.limpiarArreglos();

                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                contadorObjetosGuardados++;

                _this8.limpiarArreglos();
              });
            }
          });
        }); // fin transaction
      } else {
        this.limpiarArreglos();
      }
    }
  }, {
    key: "createVariableFieldFormula",
    value: function createVariableFieldFormula(variable, variableCampo, formula, posicionAtributo, posicionFormula) {
      var _this9 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into FormulasVariablesCampos (variableID, variableCampoID, posicionFormulaEnCampo, formula, operacion) values (" + variable.ID + ", " + variableCampo.ID + ", " + posicionFormula + ", '" + formula.formula + "', '" + formula.operacion + "')", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              contadorObjetosGuardados++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              contadorObjetosGuardados++;

              _this9.getVariableFieldFormulaID(variable, variableCampo, formula, posicionAtributo, posicionFormula);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getVariableFieldFormulaID",
    value: function getVariableFieldFormulaID(variable, variableCampo, formula, posicionAtributo, posicionFormula) {
      var _this10 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from FormulasVariablesCampos where variableID = " + variable.ID + " and variableCampoID = " + variableCampo.ID + " and posicionFormulaEnCampo = " + posicionFormula, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                var elementosFormulas, segmentoRegla;

                if (banderaEsObjeto) {
                  elementosFormulas = elementosFormulasVariosAtributos;
                  segmentoRegla = segmentoReglasVariosAtributos;
                } else {
                  elementosFormulas = elementosFormulasUnAtributos;
                  segmentoRegla = segmentoReglasUnAtributo;
                }

                for (var i = 0; i < elementosFormulas[posicionAtributo][posicionFormula].length; i++) {
                  contadorObjetosAGuardar++;

                  _this10.createVariableFieldFormulaElement(variable, variableCampo, result.recordset[0], elementosFormulas[posicionAtributo][posicionFormula][i]);
                }

                ; //validar que solo sea llamado la primera vez por cada atributo

                if (posicionFormula == 0) {
                  for (var j = 0; j < segmentoRegla[posicionAtributo].length; j++) {
                    contadorObjetosAGuardar++;
                    segmentoRegla[posicionAtributo][j].posicionSegmentoEnCampo = j;

                    _this10.createVariableFieldRuleSegments(variable, variableCampo, segmentoRegla[posicionAtributo][j], posicionAtributo, j, result.recordset[0]);
                  }

                  ;
                }

                if (elementosFormulas[posicionAtributo][posicionFormula].length == 0 || posicionFormula == 0 && segmentoRegla[posicionAtributo].length) {
                  _this10.limpiarArreglos();
                }
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "createVariableFieldFormulaElement",
    value: function createVariableFieldFormulaElement(variable, variableCampo, formula, elemento) {
      var _this11 = this;

      if (elemento != undefined) {
        var transaction = new _mssql["default"].Transaction(this.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("insert into ElementoFormulasVariablesCampos (variableID, variableCampoID, formulaID, conexionTablaID, esFuenteDeDato, elementoVariableID, elementoVariableCampoID, nombreColumnaEnTabla, tipoColumnaEnTabla, nombreVariable, descripcion, operacion) values (" + variable.ID + ", " + variableCampo.ID + ", " + formula.ID + ", " + elemento.idConexionTabla + ", '" + elemento.esFuenteDeDato + "', " + elemento.elementoVariableID + ", " + elemento.elementoVariableCampoID + ", '" + elemento.nombreColumnaEnTabla + "', '" + elemento.tipoColumnaEnTabla + "', '" + elemento.nombreVariable + "', '" + elemento.descripcion + "', '" + elemento.operacion + "')", function (err, result) {
            if (err) {
              if (!rolledBack) {
                console.log(err);
                contadorObjetosGuardados++;

                _this11.limpiarArreglos();

                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                contadorObjetosGuardados++;

                _this11.limpiarArreglos();
              });
            }
          });
        }); // fin transaction
      } else {
        this.limpiarArreglos();
      }
    }
  }, {
    key: "limpiarArreglos",
    value: function limpiarArreglos() {
      if (contadorObjetosGuardados == contadorObjetosAGuardar) {
        nivelNuevoAtributoVarios = 0;
        nivelNuevoAtributoUnico = 0;
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
      }
    }
  }, {
    key: "retornarCampo",
    value: function retornarCampo(campoNuevo) {
      campoSeleccionado = campoNuevo;
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

      if (!banderaEsObjeto) {
        this.guardarVariableUnAtributo();
      } else {
        this.guardarVariableVariosAtributo();
      }
    }
  }, {
    key: "guardarVariableUnAtributo",
    value: function guardarVariableUnAtributo() {
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

      if (nombreVariable.length < 101 && nombreVariable.length > 0) {
        if (descripcionVariable.length < 701) {
          //if(operacionSeleccionada.valor != undefined) {
          if (esObjeto != undefined) {
            if (guardarResultadosEnBaseDatos != undefined) {
              if (!isNaN(objetoPadreID)) {
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
                      objetoPadreID: objetoPadreID,
                      guardar: guardarResultadosEnBaseDatos
                    };
                    this.createVariable(nuevaVariable, [nuevoAtributo]);
                    contadorObjetosAGuardar++;
                  } else {
                    alert("Seleccione un nivel para el campo.");
                  }
                } else {
                  alert("Seleccione un tipo de asignación.");
                }
              } else {
                alert("Tiene que ingresar un valor para objeto padre.");
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

      if (nombreVariable.length < 101 && nombreVariable.length > 0) {
        if (descripcionVariable.length < 701) {
          //if(operacionSeleccionada.valor != undefined) {
          if (esObjeto != undefined) {
            if (guardarResultadosEnBaseDatos != undefined) {
              if (!isNaN(objetoPadreID)) {
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
                      objetoPadreID: objetoPadreID,
                      guardar: guardarResultadosEnBaseDatos
                    };
                    this.createVariable(nuevaVariable, atributosVario);
                    contadorObjetosAGuardar++;
                  } else {
                    alert("Seleccione un nivel para el campo.");
                  }
                } else {
                  alert("Seleccione un tipo de asignación.");
                }
              } else {
                alert("Tiene que ingresar un valor para objeto padre.");
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
        alert("Tiene que ingresar un nombre de la variable.");
      }
    }
  }, {
    key: "crearAtributoVariable",
    value: function crearAtributoVariable() {
      //agrega valor a arreglo, pero no guarda en base de datos
      var nombreAtributo = $("#nombreAtributoNuevoCampo").val();

      if (nombreAtributo.length > 0) {
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
            atributos: arreglo
          });

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
        alert("Ingrese un valor para el nombre del atributo.");
      }
    }
  }, {
    key: "anadirRegla",
    value: function anadirRegla(esFormula, formulaSeleccionada) {
      //si se agrega una formula/asignacion, todas las otras formulas tienen que ser del mismo tipo para esa variable
      //si el indiceSeleccionado es igual a -1, se llamo desde nuevo atributo
      //sino, modificar elemento seleccionado
      //primer if: ver el estado de donde fue llamado el metodo
      //campoSeleccionado, operacionSeleccionada, objetoConexionSeleccionada
      //indiceSeleccionadoReglas
      //tipoElementoSeleccionadoRegla
      console.log('indiceSeleccionadoReglas');
      console.log(indiceSeleccionadoReglas);
      console.log('tipoElementoSeleccionadoRegla');
      console.log(tipoElementoSeleccionadoRegla);
      var reglas;

      if (banderaEsObjeto) {
        reglas = reglasVariosAtributos;
      } else {
        reglas = reglasUnAtributo;
      }

      console.log('reglas');
      console.log(reglas);
      var posicionAtributo = posicionAtributoSeleccionado; //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
      //cuando se presiona NavBar indice es igual indice anterior
      //cuando se selecciona un campo existente indice = posicion campo

      if (posicionAtributo == -1) {
        posicionAtributo = this.state.atributos.length;
      }

      if (indiceSeleccionadoReglas != -1 || indiceSeleccionadoReglas == -1 && (reglas.length == 0 || reglas[posicionAtributo] != undefined && reglas[posicionAtributo].length == 0)) {
        var entrarACrearRegla = false;

        if (indiceSeleccionadoReglas != -1 && tipoElementoSeleccionadoRegla.length > 0) {
          //validando nueva regla tenga la misma variable del mismo segmento
          var posicionSelTemp = posicionAtributoSeleccionado;

          if (posicionAtributoSeleccionado == -1) {
            posicionSelTemp = this.state.atributos.length;
          }

          if (campoSeleccionado.tablaID != undefined) {
            if (segmentoRegla[posicionSel][reglas[posicionSel][indiceSeleccionadoReglas].segmentoReglaID].conexionTablaID == campoSeleccionado.tablaID) {
              entrarACrearRegla = true;
            }
          } else {
            if (segmentoRegla[posicionSel][reglas[posicionSel][indiceSeleccionadoReglas].segmentoReglaID].variableID == campoSeleccionado.variableID) {
              entrarACrearRegla = true;
            }
          }
        } else if (indiceSeleccionadoReglas == -1 && (reglas.length == 0 || reglas[posicionAtributo] != undefined && reglas[posicionAtributo].length == 0)) {
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

            if (reglas[posicionSel] == undefined) {
              [];
            }

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
                nivelMax = 1,
                nombreColumnaEnTabla = '';

            if (campoSeleccionado.tablaID != undefined) {
              conexionTablaID = campoSeleccionado.tablaID;
              esConexionTabla = true;
              nombreColumnaEnTabla = campoSeleccionado.valor;
            } else {
              variableID = campoSeleccionado.variableID;
            }

            var posicionInsertarReglaAtributo = 0,
                posicionInsertarReglaSegmento = 0;

            if (tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0 || indiceSeleccionadoReglas == -1 && tipoElementoSeleccionadoRegla.length == 0) {
              var segmentoReglaIndex = 0;

              if (segmentoRegla[posicionSel].length > 0) {
                segmentoReglaIndex = segmentoRegla[posicionSel].length;
              }

              segmentoRegla[posicionSel].push({
                conexionTablaID: conexionTablaID,
                variableID: variableID,
                esConexionTabla: esConexionTabla,
                nivelMax: nivelMax,
                segmentoReglaIndex: segmentoReglaIndex
              });
              posicionInsertarReglaAtributo = posicionSel;
              posicionInsertarReglaSegmento = segmentoRegla[posicionSel].length - 1;
            } else {
              segmentoRegla[posicionSel][reglas[posicionSel][indiceSeleccionadoReglas].segmentoReglaID].nivelMax++;
              posicionInsertarReglaAtributo = posicionSel;
              posicionInsertarReglaSegmento = reglas[posicionSel][indiceSeleccionadoReglas].segmentoReglaID;
            }

            if (reglas[posicionInsertarReglaAtributo] == undefined) {
              reglas[posicionInsertarReglaAtributo] = [];
            }

            if (reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] == undefined) {
              reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] = [];
            }

            var esCondicion = !esFormula;
            var segmentoReglaIndex = 0;
            if (indiceSeleccionadoReglas != -1 && reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].segmentoReglaIndex != undefined) segmentoReglaIndex = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].segmentoReglaIndex;
            /*if(indiceSeleccionadoReglas != -1 && tipoElementoSeleccionadoRegla.localeCompare("abajo") != 0) {
                //regla debe ser ingresada como hija de otra regla
                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento][indiceSeleccionadoReglas]
            }*/

            var nuevaRegla = {
              segmentoReglaID: segmentoReglaIndex,
              conexionTablaID: conexionTablaID,
              nombreColumnaEnTabla: nombreColumnaEnTabla,
              formulaID: -1,
              variableID: -1,
              variableCampoID: -1,
              reglaPadreID: indiceSeleccionadoReglas,
              esCondicion: esCondicion,
              esConexionTabla: esConexionTabla,
              operacion: operacionSeleccionada.operacion,
              operacionTexto: operacionSeleccionada.operacionTexto,
              valor: valor,
              texto: campoSeleccionado.valor + " " + operacionSeleccionada.operacionTexto + " " + valor,
              nivel: nuevoNivel,
              posicionSegmentoEnCampo: segmentoReglaIndex
            }; //if(indiceSeleccionadoReglas == -1 && tipoElementoSeleccionadoRegla.length == 0) {

            if (reglas.length == 0 || reglas[posicionInsertarReglaAtributo].length == 0 || reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length == 0) {
              console.log('1'); //cuando no existe regla creada para el campo

              reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
            } else {
              console.log('2'); //el campo ya tiene una regla o mas creada

              if (tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#siRADIO").is(':checked')) {
                console.log('2.1'); //se seleciona el indice de la posicion de la regla dentro del arreglo, para que despues se pueda sacar el ID a base de la posicion
                //se pone de regla padre a la regla seleccionada

                nuevaRegla.reglaPadreID = indiceSeleccionadoReglas;
                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas + 1, 0, nuevaRegla);
              } else if (tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#sinoRADIO").is(':checked')) {
                console.log('2.2'); //se seleciona el indice de la posicion de la regla dentro del arreglo, para que despues se pueda sacar el ID a base de la posicion
                //se pone de regla padre a la regla padre de la regla seleccionada

                nuevaRegla.reglaPadreID = reglas[indiceSeleccionadoReglas].reglaPadreID;
                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas + 1, 0, nuevaRegla);
              } else if (tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                console.log('2.2');
                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas + 1, 0, nuevaRegla);
              } //la condicion es anidada, o sea dentro de la condicion padre

            }

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
          } else {
            var posicionSel = posicionAtributoSeleccionado; //posicionAtributoSeleccionado = -1 cuando se va a condiciones de un campo nuevo
            //cuando se presiona NavBar indice es igual indice anterior
            //cuando se selecciona un campo existente indice = posicion campo

            if (posicionAtributoSeleccionado == -1) {
              posicionSel = this.state.atributos.length;
            }

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

            if (campoSeleccionado.idConexionTabla != undefined) {
              conexionTablaID = campoSeleccionado.idConexionTabla;
              esConexionTabla = true;
            } else {
              variableID = campoSeleccionado.variableID;
            }

            if (tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0 || indiceSeleccionadoReglas == -1 && tipoElementoSeleccionadoRegla.length == 0) {
              var segmentoReglaIndex = 0;

              if (segmentoRegla[posicionSel].length > 0) {
                segmentoReglaIndex = segmentoRegla[posicionSel].length;
              }

              segmentoRegla[posicionSel].push({
                conexionTablaID: conexionTablaID,
                variableID: variableID,
                esConexionTabla: esConexionTabla,
                nivelMax: nivelMax,
                segmentoReglaIndex: segmentoReglaIndex
              });
              posicionInsertarReglaAtributo = posicionSel;
              posicionInsertarReglaSegmento = segmentoRegla[posicionSel].length - 1;
            } else {
              segmentoRegla[posicionSel][reglas[posicionSel][indiceSeleccionadoReglas].segmentoReglaID].nivelMax++;
              posicionInsertarReglaAtributo = posicionSel;
              posicionInsertarReglaSegmento = reglas[posicionSel][indiceSeleccionadoReglas].segmentoReglaID;
            }

            if (reglas[posicionInsertarReglaAtributo] == undefined) {
              reglas[posicionInsertarReglaAtributo] = [];
            }

            if (reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] == undefined) {
              reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento] = [];
            }

            var esCondicion = !esFormula;
            var segmentoReglaIndex = 0;
            if (indiceSeleccionadoReglas != -1 && reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].segmentoReglaIndex != undefined) segmentoReglaIndex = reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].segmentoReglaIndex;
            var nuevaRegla = {
              segmentoReglaID: segmentoReglaIndex,
              conexionTablaID: conexionTablaID,
              nombreColumnaEnTabla: '',
              formulaID: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length,
              variableID: -1,
              variableCampoID: -1,
              reglaPadreID: indiceSeleccionadoReglas,
              esCondicion: esCondicion,
              esConexionTabla: esConexionTabla,
              operacion: formulaSeleccionada.operacion,
              operacionTexto: this.retornarCodigoOperacion(formulaSeleccionada.operacion),
              valor: formulaSeleccionada.operacion,
              texto: formulaSeleccionada.formula,
              nivel: nuevoNivel,
              posicionSegmentoEnCampo: segmentoReglaIndex
            };
            console.log('this.state.reglas');
            console.log(this.state.reglas);
            console.log(this.state.reglas.length);
            console.log('reglas');
            console.log(reglas);
            console.log('posicionInsertarReglaAtributo');
            console.log(posicionInsertarReglaAtributo);
            console.log('posicionInsertarReglaSegmento');
            console.log(posicionInsertarReglaSegmento);
            console.log('campoSeleccionado');
            console.log(campoSeleccionado);
            console.log('formulaSeleccionada');
            console.log(formulaSeleccionada);

            if (reglas.length == 0 || reglas[posicionInsertarReglaAtributo].length == 0 || reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].length == 0) {
              //cuando no existe regla creada para el campo
              console.log('1');
              reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].push(nuevaRegla);
            } else {
              console.log('2'); //el campo ya tiene una regla o mas creada

              if (tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#siRADIO").is(':checked')) {
                //se seleciona el indice de la posicion de la regla dentro del arreglo, para que despues se pueda sacar el ID a base de la posicion
                //se pone de regla padre a la regla seleccionada
                nuevaRegla.reglaPadreID = indiceSeleccionadoReglas;
                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas + 1, 0, nuevaRegla);
                console.log('2.1');
              } else if (tipoElementoSeleccionadoRegla.localeCompare("esOtraRegla") == 0 && $("#sinoRADIO").is(':checked')) {
                //se seleciona el indice de la posicion de la regla dentro del arreglo, para que despues se pueda sacar el ID a base de la posicion
                //se pone de regla padre a la regla padre de la regla seleccionada
                nuevaRegla.reglaPadreID = reglas[indiceSeleccionadoReglas].reglaPadreID;
                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas + 1, 0, nuevaRegla);
                console.log('2.2');
              } else if (tipoElementoSeleccionadoRegla.localeCompare("abajo") == 0) {
                reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento].splice(indiceSeleccionadoReglas + 1, 0, nuevaRegla);
                console.log('2.3');
              } //la condicion es anidada, o sea dentro de la condicion padre

            }

            console.log('ANTES');
            console.log('reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]');
            console.log(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]);

            var tempNewCopy = _toConsumableArray(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]);

            this.setState({
              reglas: reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]
            }, console.log(this.state.reglas));
            console.log('reglas');
            console.log(reglas);
            console.log('reglasVariosAtributos');
            console.log(reglasVariosAtributos);
            console.log('segmentoReglasVariosAtributos');
            console.log(segmentoReglasVariosAtributos);
            console.log('reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]');
            console.log(reglas[posicionInsertarReglaAtributo][posicionInsertarReglaSegmento]);
            var self = this;
            setTimeout(function () {
              console.log(self.state.reglas);
            }, 2000);

            if (banderaEsObjeto) {
              reglasVariosAtributos = reglas;
              segmentoReglasVariosAtributos = segmentoRegla;
            } else {
              reglasUnAtributo = reglas;
              segmentoReglasUnAtributo = segmentoRegla;
            }
          }
        } else {
          var texto = 'formula';
          if (!esFormula) texto = 'comparación';
          alert("La " + texto + " ingresada no pertenece a la misma variable.");
        }
      } else {
        alert("Seleccione una posición en la 'Lógica para el cálculo'");
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

      for (var i = 0; i < formulaArreglo.length; i++) {
        //if(formulaArreglo[i].tipo.localeCompare("variable") == 0 && formulaArreglo[i].esFuenteDato) {
        var idConexionTabla = -1;
        if (formulaArreglo[i].esFuenteDato != undefined && formulaArreglo[i].esFuenteDato) idConexionTabla = formulaArreglo[i].idConexionTabla;
        var esFuenteDeDato = false;
        if (formulaArreglo[i].esFuenteDato != undefined && formulaArreglo[i].esFuenteDato) esFuenteDeDato = true;
        var elementoVariableID = -1;
        if (formulaArreglo[i].elementoVariableID != undefined) elementoVariableID = formulaArreglo[i].elementoVariableID;
        var elementoVariableCampoID = -1;
        if (formulaArreglo[i].elementoVariableCampoID != undefined) elementoVariableCampoID = formulaArreglo[i].elementoVariableCampoID;
        elementosFormulas[posicionSel][posicionFormulaEnCampo].push({
          variableID: -1,
          variableCampoID: -1,
          formulaID: -1,
          idConexionTabla: idConexionTabla,
          esFuenteDeDato: esFuenteDeDato,
          elementoVariableID: elementoVariableID,
          elementoVariableCampoID: elementoVariableCampoID,
          nombreColumnaEnTabla: formulaArreglo[i].valor,
          tipoColumnaEnTabla: tipoDeAsignacionSeleccionado,
          nombreVariable: formulaArreglo[i].valor,
          descripcion: '',
          operacion: formulaArreglo[i].operacion
        }); //}
      }

      ;

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
    key: "retornoCampo",
    value: function retornoCampo(campo, tipoVariable, objetoConexion) {
      campoSeleccionado = campo; //tipoDeAsignacionSeleccionado = tipoVariable;

      objetoConexionSeleccionada = objetoConexion;
    }
  }, {
    key: "retornoOperacion",
    value: function retornoOperacion(operacion) {
      operacionSeleccionada = operacion;
    }
  }, {
    key: "retornoTipoDeAsignacion",
    value: function retornoTipoDeAsignacion(tipoDeAsignacion) {
      tipoDeAsignacionSeleccionado = tipoDeAsignacion;
    }
  }, {
    key: "actualizarIndiceSeleccionadoReglas",
    value: function actualizarIndiceSeleccionadoReglas(indice, tipoElemento) {
      //indice = indice de regla dentro de arreglo de reglas
      //tipoElemento = si la seleccion en el contenedor de reglas es cursor arriba, cursor abajo, y otra regla o otra formula
      indiceSeleccionadoReglas = indice;
      tipoElementoSeleccionadoRegla = tipoElemento;
    }
  }, {
    key: "actualizarEstadoSiEsObjeto",
    value: function actualizarEstadoSiEsObjeto(esObjeto) {
      banderaEsObjeto = esObjeto;
    }
  }, {
    key: "actualizarNivelNuevaRegla",
    value: function actualizarNivelNuevaRegla(nivel) {
      if (banderaEsObjeto) {
        nivelNuevoAtributoVarios = nivel;
      } else {
        nivelNuevoAtributoUnico = nivel;
      }
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
    key: "render",
    value: function render() {
      var _this12 = this;

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
          actualizarNombreVariable: this.actualizarNombreVariable,
          descripcionVariable: descripcionVariable,
          actualizarDescripcionVariable: this.actualizarDescripcionVariable,
          nombreCampoNuevoAtributosVario: nombreCampoNuevoAtributosVario,
          actualizarNombreCampoNuevoAtributosVario: this.actualizarNombreCampoNuevoAtributosVario,
          actualizarEstadoSiEsObjeto: this.actualizarEstadoSiEsObjeto,
          configuracionHome: this.props.configuracionHome,
          goOptions: this.props.goOptions,
          retornoSeleccionVariables: this.props.retornoSeleccionVariables,
          retornoTipoDeAsignacion: this.retornoTipoDeAsignacion,
          goToCreateConditions: this.goToCreateConditions,
          goCreateVariableFieldSQL: this.goCreateVariableFieldSQL,
          guardarVariable: this.guardarVariable,
          crearAtributoVariable: this.crearAtributoVariable
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
          retornarIndiceSeleccionado: this.actualizarIndiceSeleccionadoReglas,
          retornarEstadoVistaEsCondicion: function retornarEstadoVistaEsCondicion() {
            _this12.actualizarCondicion;
          },
          retornoCampo: this.retornoCampo,
          retornoOperacion: this.retornoOperacion,
          reglas: this.state.reglas,
          navbar: this.state.navbar,
          goToCreateFormula: this.goToCreateFormula,
          configuracionHome: this.props.configuracionHome,
          goOptions: this.props.goOptions,
          actualizarNivelNuevaRegla: this.actualizarNivelNuevaRegla,
          retornoSeleccionVariables: this.props.retornoSeleccionVariables
        }));
      } else if (this.state.componenteActual.localeCompare("variableFormula") == 0) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }, _react["default"].createElement(_Formula["default"], {
          pool: this.props.pool,
          anadirFormula: this.anadirFormula,
          retornoCampo: this.retornoCampo,
          retornoOperacion: this.retornoOperacion,
          retornoTipoDeAsignacion: this.retornoTipoDeAsignacion,
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
          navbar: this.state.navbar
        }));
      }
    }
  }]);

  return CrearFuenteDatosHome;
}(_react["default"].Component);

exports["default"] = CrearFuenteDatosHome;
//# sourceMappingURL=CrearVariablesHome.js.map
