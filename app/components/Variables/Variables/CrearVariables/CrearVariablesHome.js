"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _CrearVariable = _interopRequireDefault(require("./CrearVariable.js"));

var _InstruccionVariable = _interopRequireDefault(require("../../../InstruccionVariable.js"));

var _Formula = _interopRequireDefault(require("../../../Formula.js"));

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
    [ {nombre: "Carlos", apellido: "Carlos"}, {nombre: "Perez", apellido: "Perez"} ]
*/

/*              ARREGLO DE REGLAS               */

/* CADA POSICION REPRESENTA UNA REGLA PERTENECIENTE A AL ATRIBUTO CORRESPONDIENTE A LA POSICION DEL ATRIBUTO */

/*
    [ [{nombre: "Carlos", apellido: "Carlos"}, {nombre: "Perez", apellido: "Perez"}], [{nombre: "Carlos1", apellido: "Carlos1"}, {nombre: "Perez2", apellido: "Perez2"}] ]
*/

/*              ARREGLO DE FORMULAS               */

/* CADA POSICION REPRESENTA UNA FORMULA PERTENECIENTE A AL ATRIBUTO CORRESPONDIENTE A LA POSICION DEL ATRIBUTO */

/*
    [ [{nombre: "Carlos", apellido: "Carlos"}, {nombre: "Perez", apellido: "Perez"}], [{nombre: "Carlos1", apellido: "Carlos1"}, {nombre: "Perez2", apellido: "Perez2"}] ]
*/

/*              ARREGLO DE ELEMENTOS DE FORMULAS               */

/* CADA POSICION REPRESENTA UNA VARIABLE DENTRO DE LA FORMULA FORMULA PERTENECIENTE A AL ATRIBUTO CORRESPONDIENTE A LA POSICION DEL ATRIBUTO */

/*
    [ [[{nombre: "Carlos", apellido: "Carlos"}, {nombre: "Perez", apellido: "Perez"}], []], [[{nombre: "Carlos1", apellido: "Carlos1"}, {nombre: "Perez2", apellido: "Perez2"}], []] ]
*/

var nivelNuevoAtributoVarios = 0; //nivel del nuevo atributo a agregar | cambia con al seleccionar regla, o agregar variable a una formula

var nivelNuevoAtributoUnico = 0; //nivel del nuevo atributo a agregar | cambia con al seleccionar regla, o agregar variable a una formula

var indiceSeleccionadoReglas = -1; //indice seleccionado regla

var tipoElementoSeleccionadoRegla = ''; //tipo de seleccion de cursor de regla: esOtraRegla, arriba, abajo

var posicionAtributoSeleccionado = -1; //posicion del arreglo donde se debe insertar el siguiente atributo / campo /  columna (para controlar cuando se agrega condiciones / instrucciones a un nuevo atributo)

var indiceSeleccionadoFormula = -1; //indice seleccionado formula

var atributosVario = [];
var reglasVariosAtributos = [];
var formulasVariosAtributos = [];
var elementosFormulasVariosAtributos = [];
var atributosUnico = [];
var reglasUnAtributo = [];
var formulasUnAtributo = [];
var elementosFormulasUnAtributos = [];

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
      reglas: [{
        texto: "Regla 1",
        nivel: 1,
        esCondicion: false
      }, {
        texto: "Regla 2",
        nivel: 2,
        esCondicion: true
      }, {
        texto: "Regla 3",
        nivel: 3,
        esCondicion: false
      }, {
        texto: "Regla 4",
        nivel: 1,
        esCondicion: false
      }, {
        texto: "Regla 5",
        nivel: 2,
        esCondicion: false
      }],
      formulas: [],
      esCondicion: true,
      //bandera para estado de nueva regla / instruccion, saber si es nueva comparacion o regla / instruccion = verdadero; si es falso = es nueva formula / asignacion
      navbar: ""
    };
    _this.loadRules = _this.loadRules.bind(_assertThisInitialized(_this));
    _this.sortRules = _this.sortRules.bind(_assertThisInitialized(_this));
    _this.returnToCreateVariable = _this.returnToCreateVariable.bind(_assertThisInitialized(_this));
    _this.goToCreateConditions = _this.goToCreateConditions.bind(_assertThisInitialized(_this));
    _this.goToCreateFormula = _this.goToCreateFormula.bind(_assertThisInitialized(_this));
    _this.createVariable = _this.createVariable.bind(_assertThisInitialized(_this));
    _this.getVariableID = _this.getVariableID.bind(_assertThisInitialized(_this));
    _this.createVariableField = _this.createVariableField.bind(_assertThisInitialized(_this));
    _this.getVariableFieldID = _this.getVariableFieldID.bind(_assertThisInitialized(_this));
    _this.createVariableFieldRules = _this.createVariableFieldRules.bind(_assertThisInitialized(_this));
    _this.createVariableFieldFormula = _this.createVariableFieldFormula.bind(_assertThisInitialized(_this));
    _this.getVariableFieldFormulaID = _this.getVariableFieldFormulaID.bind(_assertThisInitialized(_this));
    _this.createVariableFieldFormulaElement = _this.createVariableFieldFormulaElement.bind(_assertThisInitialized(_this));
    _this.retornarCampo = _this.retornarCampo.bind(_assertThisInitialized(_this));
    _this.actualizarCondicion = _this.actualizarCondicion(_assertThisInitialized(_this));
    _this.cambioDeArreglosDeAtributos = _this.cambioDeArreglosDeAtributos(_assertThisInitialized(_this));
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

      var esObjeto, formulas, reglas;
      var posicionSel = posicionAtributoSeleccionado;

      if (posicionAtributoSeleccionado == -1) {
        posicionSel = this.state.atributos.length;
      }

      if ($("#esObjetoFuenteDato").is(':checked')) esObjeto = true;else esObjeto = false;

      if (esObjeto) {
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
        onClick: this.goToCreateConditions
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
    key: "createVariable",
    value: function createVariable(variable, campos) {
      var _this2 = this;

      //validaciones existe por lo menos regla asignar
      var transaction = new sql.Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new sql.Request(transaction);
        request.query("insert into Variables (nombre, descripcion, esObjeto, objetoPadreID, guardar) values ('" + variable.nombre + "', '" + variable.descripcion + "', '" + variable.esObjeto + "', " + variable.objetoPadreID + ", '" + variable.guardar + "')", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              alert("variable creada.");

              _this2.props.getVariableID(atributoFuenteDato, campos);
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
      var transaction = new sql.Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new sql.Request(transaction);
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
                  _this3.createVariableField(result.recordset[0], campos[i]);
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
    value: function createVariableField(variable, variableCampo) {
      var _this4 = this;

      var transaction = new sql.Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new sql.Request(transaction);
        request.query("insert into VariablesCampos (variableID, nombre, tipo, campoEsArreglo, nivel) values (" + variable.ID + ", '" + variableCampo.nombre + "', '" + variableCampo.tipo + "', '" + variableCampo.campoEsArreglo + "', " + variableCampo.nivel + ")", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              //this.props.terminoCrearCampo(variable, variableCampo);
              _this4.props.getVariableFieldID(variable, variableCampo);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getVariableFieldID",
    value: function getVariableFieldID(variable, variableCampo) {
      var _this5 = this;

      //validaciones existe por lo menos regla asignar
      var transaction = new sql.Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new sql.Request(transaction);
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
              var reglas, formulas;

              if (esObjeto) {
                reglas = reglasVariosAtributos;
                formulas = formulasVariosAtributos;
              } else {
                reglas = reglasUnAtributo;
                formulas = formulasUnAtributo;
              }

              if (reglas[posicionSel] != undefined) {
                for (var i = 0; i < reglas[posicionSel].length; i++) {
                  _this5.createVariableFieldRules(variable, variableCampo, reglas[i]);
                }

                ;
              } else if (formulas[posicionSel] != undefined) {
                for (var i = 0; i < formulas[posicionSel].length; i++) {
                  _this5.createVariableFieldFormula(variable, variableCampo, formulas[i], i);
                }

                ;
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "createVariableFieldRules",
    value: function createVariableFieldRules(variable, variableCampo, regla) {
      var transaction = new sql.Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new sql.Request(transaction);
        request.query("insert into Reglas (variableID, variableCampoID, reglaPadreID, esCondicion, operacion, valor, texto, nivel) values (" + variable.ID + ", " + variableCampo.ID + ", " + regla.reglaPadreID + ", '" + regla.esCondicion + "', '" + regla.operacion + "', '" + regla.valor + "', '" + regla.texto + "', " + regla.nivel + ")", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {});
          }
        });
      }); // fin transaction
    }
  }, {
    key: "createVariableFieldFormula",
    value: function createVariableFieldFormula(variable, variableCampo, formula, indiceFormula) {
      var _this6 = this;

      var transaction = new sql.Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new sql.Request(transaction);
        request.query("insert into FormulasVariablesCampos (variableID, variableCampoID, formula, numeroDeFormulaDeVariable) values (" + variable.ID + ", " + variableCampo.ID + ", '" + formula.formula + "', " + formula.numeroDeFormulaDeVariable + ")", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this6.props.getVariableFieldFormulaID(variable, variableCampo, formula, indiceFormula);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getVariableFieldFormulaID",
    value: function getVariableFieldFormulaID(variable, variableCampo, formula, indiceFormula) {
      var _this7 = this;

      var transaction = new sql.Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new sql.Request(transaction);
        request.query("select * from FormulasVariablesCampos where variableID = " + variable.variableID + " and variableCampoID = " + variableCampo.ID + " and numeroDeFormulaDeVariable = '" + formula.numeroDeFormulaDeVariable + "'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                var posicionSel = posicionAtributoSeleccionado; //si fue llamado de crear atributo

                if (posicionAtributoSeleccionado == -1) {
                  posicionSel = _this7.state.atributos.length;
                }

                var elementosFormulas;

                if (esObjeto) {
                  elementosFormulas = elementosFormulasVariosAtributos;
                } else {
                  elementosFormulas = elementosFormulasUnAtributos;
                }

                for (var i = 0; i < elementosFormulas[posicionSel][indiceFormula].length; i++) {
                  _this7.props.createVariableFieldFormulaElement(variable, variableCampo, formula, elementosFormulas[posicionSel][indiceFormula][i]);
                }

                ;
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "createVariableFieldFormulaElement",
    value: function createVariableFieldFormulaElement(variable, variableCampo, formula, elemento) {
      var transaction = new sql.Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new sql.Request(transaction);
        request.query("insert into ElementoFormulasVariablesCampos (variableID, variableCampoID, idFormula, idConexionTabla, nombreColumnaEnTabla, nombreVariable, operacion) values (" + variable.ID + ", " + variableCampo.ID + ", " + formula.ID + ", " + elemento.idConexionTabla + ", '" + elemento.nombreColumnaEnTabla + "', '" + elemento.nombreColumnaEnTabla + "', '" + elemento.nombreVariable + "', '" + elemento.operacion + "')", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {});
          }
        });
      }); // fin transaction
    }
  }, {
    key: "retornarCampo",
    value: function retornarCampo(campoNuevo) {
      campo = campoNuevo;
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
      var esObjeto;
      if ($("#esObjetoFuenteDato").is(':checked')) esObjeto = true;else esObjeto = false;

      if (esObjeto) {
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

      if (nombreVariable.length < 101 && nombreVariable.length > 0) {
        if (descripcionVariable.length < 701) {
          //if(operacionSeleccionada.valor != undefined) {
          if (esObjeto != undefined) {
            if (guardarResultadosEnBaseDatos != undefined) {
              if (!isNaN(objetoPadreID)) {
                //si no existen condiciones creadas, que se cree un arreglo vacio

                /*if(this.state.reglas[this.state.posicionNuevoAtributo] == undefined) {
                    var tempCopyRules = [...this.state.reglas];
                    tempCopyRules.push([]);
                    this.setState({
                        reglas: tempCopyRules
                    });
                }
                //si no existen formulas creadas, que se cree un arreglo vacio
                if(this.state.formula[this.state.posicionNuevoAtributo].ID == undefined) {
                    var tempCopyFormulas = [...this.state.formula];
                    tempCopyFormulas.push([]);
                    this.setState({
                        formula: tempCopyFormulas
                    });
                }*/
                var campoEsArreglo = true;
                if (tipoDeAsignacionSeleccionado.localeCompare("Asignar Valor Único") == 0) campoEsArreglo = false;
                var nuevoAtributo; //si la formula ya fue asignada, no agregar tipo

                if (atributosUnico[0].tipo == undefined) {
                  nuevoAtributo = {
                    nombre: nombreVariable,
                    tipo: '',
                    campoEsArreglo: campoEsArreglo,
                    nivel: nivelNuevoAtributoUnico
                  };
                } else {
                  nuevoAtributo = atributosUnico[0];
                  nuevoAtributo.nombre = nombreVariable;
                  nuevoAtributo.campoEsArreglo = campoEsArreglo;
                  nuevoAtributo.nivel = nivelNuevoAtributoUnico;
                }

                var nuevaVariable = {
                  nombre: nombreVariable,
                  descripcion: descripcionVariable,
                  esObjeto: esObjeto,
                  objetoPadreID: objetoPadreID,
                  guardar: guardarResultadosEnBaseDatos
                };
                this.createVariable(nuevaVariable, [nuevoAtributo]);
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
          alert("Tiene que ingresar una descripción de la variable.");
        }
      } else {
        alert("Tiene que ingresar un nombre de la variable.");
      }
    }
  }, {
    key: "guardarVariableVariosAtributo",
    value: function guardarVariableVariosAtributo() {//
    }
  }, {
    key: "crearAtributoVariable",
    value: function crearAtributoVariable() {
      //agrega valor a arreglo, pero no guarda en base de datos
      var nombreAtributo = $("#nombreAtributo").val();

      if (nombreAtributo.length > 0) {
        if (tipoDeAsignacionSeleccionado.length > 0) {
          //si no existen condiciones creadas, que se cree un arreglo vacio

          /*if(this.state.reglas[this.state.posicionNuevoAtributo] == undefined) {
              var tempCopyRules = [...this.state.reglas];
              tempCopyRules.push([]);
              this.setState({
                  reglas: tempCopyRules
              });
          }
          //si no existen formulas creadas, que se cree un arreglo vacio
          if(this.state.formula[this.state.posicionNuevoAtributo].ID == undefined) {
              var tempCopyFormulas = [...this.state.formula];
              tempCopyFormulas.push([]);
              this.setState({
                  formula: tempCopyFormulas
              });
          }*/
          var campoEsArreglo = true;
          if (tipoDeAsignacionSeleccionado.localeCompare("Asignar Valor Único") == 0) campoEsArreglo = false;
          var nuevoAtributo; //si la formula ya fue asignada, no agregar tipo

          if (this.state.atributos[this.state.posicionNuevoAtributo].nombre == undefined) {
            nuevoAtributo = {
              nombre: nombreAtributo,
              tipo: '',
              campoEsArreglo: campoEsArreglo
            };
          } else {
            nuevoAtributo = this.state.atributos[this.state.posicionNuevoAtributo];
            nuevoAtributo.nombre = nombreAtributo;
            nuevoAtributo.campoEsArreglo = campoEsArreglo;
          }

          atributosVario.push(nuevoAtributo);
          this.setState({
            atributos: atributosVario
          });
        } else {
          alert("Seleccione un tipo de asignación.");
        }
      } else {
        alert("Ingrese un valor para el nombre del atributo.");
      }
    }
  }, {
    key: "anadirRegla",
    value: function anadirRegla() {
      //si se agrega una formula/asignacion, todas las otras formulas tienen que ser del mismo tipo para esa variable
      //si el indiceSeleccionado es igual a -1, se llamo desde nuevo atributo
      //sino, modificar elemento seleccionado
      //primer if: ver el estado de donde fue llamado el metodo
      //campoSeleccionado, operacionSeleccionada, objetoConexionSeleccionada
      //
      var valor = $("#valor").val();
      var nuevaRegla = {
        campo: campoSeleccionado.valor,
        operacion: operacionSeleccionada.valor,
        valor: valor,
        texto: campoSeleccionado.valor + " " + operacionSeleccionada.valor + " " + valor,
        reglaPadreID: -1,
        nivel: 1
      };
      var posicionSel = posicionAtributoSeleccionado;

      if (posicionAtributoSeleccionado == -1) {
        posicionSel = this.state.atributos.length;
      }

      var esObjeto, reglas;
      if ($("#esObjetoFuenteDato").is(':checked')) esObjeto = true;else esObjeto = false;

      if (esObjeto) {
        reglas = reglasVariosAtributos;
      } else {
        reglas = reglasUnAtributo;
      }

      reglas[posicionSel].push(nuevaRegla);
      console.log('reglas');
      console.log(reglas);
      /*if( this.state.indiceSeleccionado != -1 || (this.state.indiceSeleccionado == -1 && this.state.reglas.length == 0) ) {
          var operacion = $("input[name='operacionRadio']:checked").val();
          var valor = $("#valor").val();
          console.log('operacionSeleccionada');
          console.log(operacionSeleccionada);
          console.log('valor');
          console.log(valor);
          console.log('campoSeleccionado');
          console.log(campoSeleccionado);
          var posicionAInsertar = -1;
          if(this.state.indiceSeleccionado != -1) {
              posicionAInsertar = this.state.indiceSeleccionado;
          }
          var copiaAntiguaReglas = [...this.state.reglas];
          var nuevaRegla = {campo: campo.valor, operacion: operacion, valor: valor, texto: "TEXTO", reglaPadreID: -1, nivel: 1};
          if(posicionAInsertar != -1) {
              copiaAntiguaReglas.push(nuevaRegla);
          } else {
              if(this.state.tipoIndiceSeleccionado.localeCompare("esOtraRegla") == 0) {
                  var variablePadre = this.state.reglas[posicionAInsertar];
                  nuevaRegla.reglaPadreID = variablePadre.ID;
                  nuevaRegla.nivel = variablePadre.nivel + 1;
                  var tempCopy
                  this.actualizarNivelReglas(nuevaRegla, posicionInsertarNuevo, )
              } if(this.state.tipoIndiceSeleccionado.localeCompare("arriba") == 0) {
              }
          }
      } else {
          alert("Seleccione una posición para agregar una nueva instrucción");
      }*/
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
      var posicionSel = posicionAtributoSeleccionado;

      if (posicionAtributoSeleccionado == -1) {
        posicionSel = this.state.atributos.length;
      }

      console.log('formula');
      console.log(formula);
      console.log('formulaArreglo');
      console.log(formulaArreglo);
      console.log('posicionSel');
      console.log(posicionSel); //copia antigua formulas

      var elementosFormulas;
      var esObjeto;
      if ($("#esObjetoFuenteDato").is(':checked')) esObjeto = true;else esObjeto = false;

      if (esObjeto) {
        elementosFormulas = elementosFormulasVariosAtributos;
      } else {
        elementosFormulas = elementosFormulasUnAtributos;
      }

      if (elementosFormulas[posicionSel] == undefined) elementosFormulas[posicionSel] = [];
      if (elementosFormulas[posicionSel][indiceSeleccionadoFormula] == undefined) elementosFormulas[posicionSel][indiceSeleccionadoFormula] = [];

      for (var i = 0; i < formulaArreglo.length; i++) {
        if (formulaArreglo[i].tipo.localeCompare("variable") == 0 && formulaArreglo[i].esFuenteDato) {
          /*if(esObjeto) {
              elementosFormulasVariosAtributos.push({
                  idConexionTabla: formulaArreglo[i].idConexionTabla,
                  nombreColumnaEnTabla: formulaArreglo[i].valor,
                  nombreVariable: formulaArreglo[i].valor,
                  operacion: formulaArreglo[i].operacion
              });
          } else {
              elementosFormulasUnAtributos.push({
                  idConexionTabla: formulaArreglo[i].idConexionTabla,
                  nombreColumnaEnTabla: formulaArreglo[i].valor,
                  nombreVariable: formulaArreglo[i].valor,
                  operacion: formulaArreglo[i].operacion
              });
          }*/
          elementosFormulas[posicionSel][indiceSeleccionadoFormula].push({
            idConexionTabla: formulaArreglo[i].idConexionTabla,
            nombreColumnaEnTabla: formulaArreglo[i].valor,
            nombreVariable: formulaArreglo[i].valor,
            operacion: formulaArreglo[i].operacion
          });
        }
      }

      ;
      var copiaAntiguaFormulas;

      if (esObjeto) {
        copiaAntiguaFormulas = formulasVariosAtributos;
      } else {
        copiaAntiguaFormulas = formulasUnAtributo;
      }

      if (copiaAntiguaFormulas[posicionSel] == undefined) copiaAntiguaFormulas[posicionSel] = [];
      copiaAntiguaFormulas[posicionSel].push({
        formula: formula
      });
      this.setState({
        formulas: copiaAntiguaFormulas[posicionSel]
      });
      console.log('elementosFormulas');
      console.log(elementosFormulas);
      console.log('copiaAntiguaFormulas[posicionSel]');
      console.log(copiaAntiguaFormulas[posicionSel]);
      console.log('copiaAntiguaFormulas');
      console.log(copiaAntiguaFormulas);
      var self = this;
      setTimeout(function () {
        console.log(self.state.formulas);
      }, 2000);
    }
  }, {
    key: "retornoCampo",
    value: function retornoCampo(campo, tipoVariable, objetoConexion) {
      campoSeleccionado = campo;
      tipoElementoSeleccionado = tipoVariable;
      objetoConexionSeleccionada = objetoConexion;
      console.log('campoSeleccionado');
      console.log(campoSeleccionado);
      console.log('tipoElementoSeleccionado');
      console.log(tipoElementoSeleccionado);
    }
  }, {
    key: "retornoOperacion",
    value: function retornoOperacion(operacion) {
      operacionSeleccionada = operacion;
      console.log('operacionSeleccionada');
      console.log(operacionSeleccionada);
    }
  }, {
    key: "retornoTipoDeAsignacion",
    value: function retornoTipoDeAsignacion(tipoDeAsignacion) {
      tipoDeAsignacionSeleccionado = tipoDeAsignacion;
    }
  }, {
    key: "actualizarIndiceSeleccionadoReglas",
    value: function actualizarIndiceSeleccionadoReglas(indice, tipoElemento) {
      indiceSeleccionadoReglas = indice;
      tipoElementoSeleccionadoRegla = tipoElemento;
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;

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
          configuracionHome: this.props.configuracionHome,
          goOptions: this.props.goOptions,
          retornoSeleccionVariables: this.props.retornoSeleccionVariables,
          retornoTipoDeAsignacion: this.retornoTipoDeAsignacion,
          goToCreateConditions: this.goToCreateConditions,
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
            _this8.actualizarCondicion;
          },
          reglas: [{
            texto: "Regla 1",
            nivel: 1,
            esCondicion: false
          }, {
            texto: "Regla 2",
            nivel: 2,
            esCondicion: true
          }, {
            texto: "Regla 3",
            nivel: 3,
            esCondicion: false
          }, {
            texto: "Regla 4",
            nivel: 1,
            esCondicion: false
          }, {
            texto: "Regla 5",
            nivel: 2,
            esCondicion: false
          }],
          navbar: this.state.navbar,
          goToCreateFormula: this.goToCreateFormula,
          configuracionHome: this.props.configuracionHome,
          goOptions: this.props.goOptions,
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
          retornoCampo: this.retornoCampo,
          retornoOperacion: this.retornoOperacion,
          navbar: this.state.navbar,
          anadirFormula: this.anadirFormula
        }));
      }
    }
  }]);

  return CrearFuenteDatosHome;
}(_react["default"].Component);

exports["default"] = CrearFuenteDatosHome;
//# sourceMappingURL=CrearVariablesHome.js.map
