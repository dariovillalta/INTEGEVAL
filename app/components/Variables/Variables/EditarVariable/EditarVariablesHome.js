"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _EditarVariable = _interopRequireDefault(require("./EditarVariable.js"));

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

var indiceSeleccionadoSegmentoReglas = -1; //indice seleccionado del segmento al que pertenece la regla

var indiceSeleccionadoReglas = -1; //indice seleccionado de la regla dentro del segmento

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
var variablesSQL = [];
var instruccionSQL = '';
var banderaEsObjeto = true; //bandera para saber si la variable actual es objeto o no a traves de las diferentes vistas / componentes

var banderaEsInstruccionSQL = true; //bandera para saber si la variable actual es instruccion SQL o no a traves de las diferentes vistas / componentes

var contadorObjetosAGuardar = 0; //bandera que lleva el total de objetos a guardar para limpiar los arreglos despues

var contadorObjetosGuardados = 0; //bandera que lleva el total de objetos a guardar para limpiar los arreglos despues

var EditarVariablesHome =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EditarVariablesHome, _React$Component);

  function EditarVariablesHome(props) {
    var _this;

    _classCallCheck(this, EditarVariablesHome);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditarVariablesHome).call(this, props));
    console.log(_this.props.idVariable);
    console.log(_this.props.esObjetoVariable);
    console.log(_this.props.esInstruccionSQLVariable);
    _this.state = {
      componenteActual: 'editarVariable',
      atributos: [],
      reglas: [],
      formulas: [],
      esCondicion: true,
      //bandera para estado de nueva regla / instruccion, saber si es nueva comparacion o regla / instruccion = verdadero; si es falso = es nueva formula / asignacion
      navbar: "",
      tipoNuevaVariable: "",
      camposInstruccionSQL: [],
      comandoSQL: "",
      variables: [],
      excel: [],
      formas: [],
      tipoVariableOriginal: _this.props.tipoVariable,
      nombreVariable: "",
      descripcionVariable: "",
      objetoPadreIDVariable: -1,
      guardarVariable: ""
    };
    _this.traerInstruccionSQL = _this.traerInstruccionSQL.bind(_assertThisInitialized(_this));
    _this.traerVariable = _this.traerVariable.bind(_assertThisInitialized(_this));
    _this.traerSegmentosDeCampo = _this.traerSegmentosDeCampo.bind(_assertThisInitialized(_this));
    _this.traerReglasDeCampo = _this.traerReglasDeCampo.bind(_assertThisInitialized(_this));
    _this.traerFormulasDeCampo = _this.traerFormulasDeCampo.bind(_assertThisInitialized(_this));
    _this.traerElementosDeCampo = _this.traerElementosDeCampo.bind(_assertThisInitialized(_this));
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
    _this.crearVariableSQL = _this.crearVariableSQL.bind(_assertThisInitialized(_this));
    _this.crearInstruccionSQL = _this.crearInstruccionSQL.bind(_assertThisInitialized(_this));
    _this.anadirRegla = _this.anadirRegla.bind(_assertThisInitialized(_this));
    _this.anadirFormula = _this.anadirFormula.bind(_assertThisInitialized(_this));
    _this.modificarRegla = _this.modificarRegla.bind(_assertThisInitialized(_this));
    _this.eliminarRegla = _this.eliminarRegla.bind(_assertThisInitialized(_this));
    _this.retornoCampoFormula = _this.retornoCampoFormula.bind(_assertThisInitialized(_this));
    _this.retornoCampoCondicion = _this.retornoCampoCondicion.bind(_assertThisInitialized(_this));
    _this.retornoOperacion = _this.retornoOperacion.bind(_assertThisInitialized(_this));
    _this.actualizarIndiceSeleccionadoReglas = _this.actualizarIndiceSeleccionadoReglas.bind(_assertThisInitialized(_this));
    _this.actualizarEstadoSiEsObjeto = _this.actualizarEstadoSiEsObjeto.bind(_assertThisInitialized(_this));
    _this.actualizarEstadoSiEsInstruccionSQL = _this.actualizarEstadoSiEsInstruccionSQL.bind(_assertThisInitialized(_this));
    _this.actualizarNivelNuevaRegla = _this.actualizarNivelNuevaRegla.bind(_assertThisInitialized(_this));
    _this.actualizarNombreVariable = _this.actualizarNombreVariable.bind(_assertThisInitialized(_this));
    _this.actualizarDescripcionVariable = _this.actualizarDescripcionVariable.bind(_assertThisInitialized(_this));
    _this.actualizarNombreCampoNuevoAtributosVario = _this.actualizarNombreCampoNuevoAtributosVario.bind(_assertThisInitialized(_this));
    _this.retornarCodigoOperacion = _this.retornarCodigoOperacion.bind(_assertThisInitialized(_this));
    _this.getVariables = _this.getVariables.bind(_assertThisInitialized(_this));
    _this.getExcel = _this.getExcel.bind(_assertThisInitialized(_this));
    _this.getFormas = _this.getFormas.bind(_assertThisInitialized(_this));
    _this.verificarNoExisteNombreVar = _this.verificarNoExisteNombreVar.bind(_assertThisInitialized(_this));
    _this.verificarNoExisteNombreCampo = _this.verificarNoExisteNombreCampo.bind(_assertThisInitialized(_this));
    _this.actualizarCampoSQL = _this.actualizarCampoSQL.bind(_assertThisInitialized(_this));
    _this.eliminarCampoSQL = _this.eliminarCampoSQL.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(EditarVariablesHome, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getVariables();
      this.getExcel();
      this.getFormas();

      if (this.props.tipoVariable.localeCompare("variable") == 0) {
        if (this.props.esInstruccionSQLVariable) {
          this.traerInstruccionSQL();
        } else if (this.props.esObjetoVariable) {
          this.traerVariable(true);
          banderaEsObjeto = true;
        } else {
          this.traerVariable(false);
          banderaEsObjeto = false;
        }
      }
    }
  }, {
    key: "traerInstruccionSQL",
    value: function traerInstruccionSQL() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from InstruccionSQLCampos where variableID = " + _this2.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              contadorObjetosGuardados++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                variablesSQL = result.recordset;

                _this2.setState({
                  camposInstruccionSQL: result.recordset
                });
              }
            });
          }
        });
      }); // fin transaction

      var transaction1 = new _mssql["default"].Transaction(this.props.pool);
      transaction1.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction1);
        request.query("select * from InstruccionSQL where variableID = " + _this2.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              contadorObjetosGuardados++;
              transaction1.rollback(function (err) {});
            }
          } else {
            transaction1.commit(function (err) {
              if (result.recordset.length > 0) {
                instruccionSQL = result.recordset[0].instruccionSQL;

                _this2.setState({
                  comandoSQL: result.recordset[0].instruccionSQL
                });
              }
            });
          }
        });
      }); // fin transaction1
    }
  }, {
    key: "traerVariable",
    value: function traerVariable(esObjeto) {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Variables where ID = " + _this3.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              contadorObjetosGuardados++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                _this3.setState({
                  nombreVariable: result.recordset[0].nombre,
                  descripcionVariable: result.recordset[0].descripcion,
                  objetoPadreIDVariable: result.recordset[0].objetoPadreID,
                  guardarVariable: result.recordset[0].guardar
                });
              }
            });
          }
        });
      }); // fin transaction

      var transaction1 = new _mssql["default"].Transaction(this.props.pool);
      transaction1.begin(function (err) {
        var rolledBack = false;
        transaction1.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction1);
        request.query("select * from VariablesCampos where variableID = " + _this3.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              contadorObjetosGuardados++;
              transaction1.rollback(function (err) {});
            }
          } else {
            transaction1.commit(function (err) {
              if (result.recordset.length > 0) {
                if (esObjeto) {
                  atributosVario = result.recordset;
                } else {
                  atributosUnico = result.recordset;
                }

                _this3.setState({
                  atributos: result.recordset
                });

                for (var i = 0; i < result.recordset.length; i++) {
                  _this3.traerSegmentosDeCampo(result.recordset[i], i, esObjeto);

                  _this3.traerFormulasDeCampo(result.recordset[i], i, esObjeto);
                }

                ;
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "traerSegmentosDeCampo",
    value: function traerSegmentosDeCampo(campo, posicionAtributo, esObjeto) {
      var _this4 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from SegmentoReglasVariables where variableID = " + _this4.props.idVariable + " and variableCampoID = " + campo.ID, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              contadorObjetosGuardados++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log('1');

              if (result.recordset.length > 0) {
                if (esObjeto) {
                  if (segmentoReglasVariosAtributos[posicionAtributo] == null) segmentoReglasVariosAtributos[posicionAtributo] = [];
                  segmentoReglasVariosAtributos[posicionAtributo] = result.recordset;

                  for (var i = 0; i < segmentoReglasVariosAtributos[posicionAtributo].length; i++) {
                    _this4.traerReglasDeCampo(campo, segmentoReglasVariosAtributos[posicionAtributo][i], posicionAtributo, i, esObjeto);
                  }

                  ;
                } else {
                  if (segmentoReglasUnAtributo[posicionAtributo] == null) segmentoReglasUnAtributo[posicionAtributo] = [];
                  segmentoReglasUnAtributo[posicionAtributo] = result.recordset;

                  for (var i = 0; i < segmentoReglasUnAtributo[posicionAtributo].length; i++) {
                    _this4.traerReglasDeCampo(campo, segmentoReglasUnAtributo[posicionAtributo][i], posicionAtributo, i, esObjeto);
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
    key: "traerReglasDeCampo",
    value: function traerReglasDeCampo(campo, segmento, posicionAtributo, posicionSegmento, esObjeto) {
      var _this5 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ReglasVariables where variableID = " + _this5.props.idVariable + " and variableCampoID = " + campo.ID + " and segmentoReglaID = " + segmento.ID, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              contadorObjetosGuardados++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log('2');

              if (result.recordset.length > 0) {
                var tempCopy = result.recordset;
                tempCopy.sort(function (a, b) {
                  return a.reglaPadreID - b.reglaPadreID;
                });
                console.log('tempCopy');
                console.log(tempCopy);

                if (esObjeto) {
                  if (reglasVariosAtributos[posicionAtributo] == null) reglasVariosAtributos[posicionAtributo] = [];
                  if (reglasVariosAtributos[posicionAtributo][posicionSegmento] == null) reglasVariosAtributos[posicionAtributo][posicionSegmento] = [];
                  reglasVariosAtributos[posicionAtributo][posicionSegmento] = tempCopy;
                } else {
                  if (reglasUnAtributo[posicionAtributo] == null) reglasUnAtributo[posicionAtributo] = [];
                  if (reglasUnAtributo[posicionAtributo][posicionSegmento] == null) reglasUnAtributo[posicionAtributo][posicionSegmento] = [];
                  reglasUnAtributo[posicionAtributo][posicionSegmento] = tempCopy;
                }
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "traerFormulasDeCampo",
    value: function traerFormulasDeCampo(campo, posicionAtributo, esObjeto) {
      var _this6 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from FormulasVariablesCampos where variableID = " + _this6.props.idVariable + " and variableCampoID = " + campo.ID, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              contadorObjetosGuardados++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log('11');

              if (result.recordset.length > 0) {
                if (esObjeto) {
                  if (formulasVariosAtributos[posicionAtributo] == null) formulasVariosAtributos[posicionAtributo] = [];
                  formulasVariosAtributos[posicionAtributo] = result.recordset;

                  for (var i = 0; i < formulasVariosAtributos[posicionAtributo].length; i++) {
                    _this6.traerElementosDeCampo(campo, formulasVariosAtributos[posicionAtributo][i], posicionAtributo, i, esObjeto);
                  }

                  ;
                } else {
                  if (formulasUnAtributo[posicionAtributo] == null) formulasUnAtributo[posicionAtributo] = [];
                  formulasUnAtributo[posicionAtributo] = result.recordset;

                  for (var i = 0; i < formulasUnAtributo[posicionAtributo].length; i++) {
                    _this6.traerElementosDeCampo(campo, formulasUnAtributo[posicionAtributo][i], posicionAtributo, i, esObjeto);
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
    key: "traerElementosDeCampo",
    value: function traerElementosDeCampo(campo, formula, posicionAtributo, posicionFormula, esObjeto) {
      var _this7 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ElementoFormulasVariablesCampos where variableID = " + _this7.props.idVariable + " and variableCampoID = " + campo.ID + " and formulaID = " + formula.ID, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              contadorObjetosGuardados++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log('22');
              console.log('result.recordset');
              console.log(result.recordset);

              if (result.recordset.length > 0) {
                if (esObjeto) {
                  if (elementosFormulasVariosAtributos[posicionAtributo] == null) elementosFormulasVariosAtributos[posicionAtributo] = [];
                  if (elementosFormulasVariosAtributos[posicionAtributo][posicionFormula] == null) elementosFormulasVariosAtributos[posicionAtributo][posicionFormula] = [];
                  elementosFormulasVariosAtributos[posicionAtributo][posicionFormula] = result.recordset;
                } else {
                  if (elementosFormulasUnAtributos[posicionAtributo] == null) elementosFormulasUnAtributos[posicionAtributo] = [];
                  if (elementosFormulasUnAtributos[posicionAtributo][posicionFormula] == null) elementosFormulasUnAtributos[posicionAtributo][posicionFormula] = [];
                  elementosFormulasUnAtributos[posicionAtributo][posicionFormula] = result.recordset;
                }
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "loadRules",
    value: function loadRules() {
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
        componenteActual: "editarVariable"
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
      }, "Crear F\xF3rmula"))))))); //deseleccionado regla seleccionada


      indiceSeleccionadoReglas = -1;
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
      var _this8 = this;

      //validaciones existe por lo menos regla asignar
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("update Variables set nombre = '" + variable.nombre + "', descripcion = '" + variable.descripcion + "', esObjeto = '" + variable.esObjeto + "', objetoPadreID = " + variable.objetoPadreID + ", esInstruccionSQL = '" + variable.esInstruccionSQL + "', guardar = '" + variable.guardar + "' where ID = " + _this8.props.idVariable, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              contadorObjetosGuardados++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              alert("variable modificada.");
              nombreVariable = '';
              descripcionVariable = '';
              $("#nombreFuenteDato").val("");
              $("#descripcionFuenteDato").val("");
              contadorObjetosGuardados++;

              _this8.getVariableID(variable, campos);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getVariableID",
    value: function getVariableID(variable, campos) {
      var _this9 = this;

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
                  _this9.createVariableSQL(result.recordset[0]);
                } else {
                  for (var i = 0; i < campos.length; i++) {
                    contadorObjetosAGuardar++;

                    _this9.createVariableField(result.recordset[0], campos[i], i);
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
    value: function createVariableSQL() {
      var _this10 = this;

      var transaction1 = new _mssql["default"].Transaction(this.props.pool);
      transaction1.begin(function (err) {
        var rolledBack = false;
        transaction1.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request1 = new _mssql["default"].Request(transaction1);
        request1.query("delete from InstruccionSQLCampos where variableID = " + _this10.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              contadorObjetosGuardados++;
              transaction1.rollback(function (err) {});
            }
          } else {
            transaction1.commit(function (err) {//this.props.terminoCrearCampo(variable, variableCampo);
            });
          }
        });
      }); // fin transaction1

      var _loop = function _loop() {
        var transaction = new _mssql["default"].Transaction(_this10.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("insert into InstruccionSQLCampos (variableID, nombre, tipo) values (" + _this10.props.idVariable + ", '" + variablesSQL[i].nombre + "', '" + variable.tipo + "')", function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                if (i == variablesSQL.length - 1) _this10.createInstructionSQL();
              });
            }
          });
        }); // fin transaction
      };

      for (var i = 0; i < variablesSQL.length; i++) {
        _loop();
      }

      ;
    }
  }, {
    key: "createInstructionSQL",
    value: function createInstructionSQL() {
      var _this11 = this;

      var transaction1 = new _mssql["default"].Transaction(this.props.pool);
      transaction1.begin(function (err) {
        var rolledBack = false;
        transaction1.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction1);
        request.query("delete from InstruccionSQL variableID = " + _this11.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction1.rollback(function (err) {});
            }
          } else {
            transaction1.commit(function (err) {
              _this11.limpiarArreglos();
            });
          }
        });
      }); // fin transaction1

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into InstruccionSQL (variableID, instruccionSQL) values (" + _this11.props.idVariable + ", '" + instruccionSQL + "')", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this11.limpiarArreglos();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "createVariableField",
    value: function createVariableField(variableCampo, posicionAtributo) {
      var _this12 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into VariablesCampos (variableID, nombre, tipo, nivel) values (" + _this12.props.idVariable + ", '" + variableCampo.nombre + "', '" + variableCampo.tipo + "', " + variableCampo.nivel + ")", function (err, result) {
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

              _this12.getVariableFieldID(variableCampo, posicionAtributo);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getVariableFieldID",
    value: function getVariableFieldID(variableCampo, posicionAtributo) {
      var _this13 = this;

      //validaciones existe por lo menos regla asignar
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from VariablesCampos where nombre = '" + variableCampo.nombre + "' and variableID = " + _this13.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var posicionSel = posicionAtributoSeleccionado; //si fue llamado de crear atributo

              if (posicionAtributoSeleccionado == -1) {
                posicionSel = _this13.state.atributos.length;
              }

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

                _this13.createVariableFieldFormula(result.recordset[0], formulas[posicionAtributo][j], posicionAtributo, j, arregloDeFormulasALlamar, arregloElementosDeFormulasALlamar);
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

                  _this13.createVariableFieldRuleSegments(result.recordset[0], segmentoRegla[posicionAtributo][j], posicionAtributo, j, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar);
                }

                ;
              }

              if (formulas[posicionAtributo].length == 0 && segmentoRegla[posicionAtributo].length == 0) {
                console.log('HOLA 1');

                _this13.limpiarArreglos();
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "createVariableFieldRuleSegments",
    value: function createVariableFieldRuleSegments(variableCampo, segmento, posicionAtributo, posicionSegmento, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar) {
      var _this14 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into SegmentoReglasVariables (conexionTablaID, variableID, variableCampoID, variableIDCreacionCodigo, excelArchivoID, excelVariableID, formaVariableID, esConexionTabla, posicionSegmentoEnCampo, nivelMax) values (" + segmento.conexionTablaID + ", " + variable.ID + ", " + variableCampo.ID + ", " + segmento.variableID + ", " + segmento.excelArchivoID + ", " + segmento.excelVariableID + ", " + segmento.formaVariableID + ", '" + segmento.esConexionTabla + "', " + posicionSegmento + ", " + segmento.nivelMax + ")", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              contadorObjetosGuardados++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              contadorObjetosGuardados++;

              _this14.getVariableFieldRuleSegments(variableCampo, segmento, posicionAtributo, posicionSegmento, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getVariableFieldRuleSegments",
    value: function getVariableFieldRuleSegments(variableCampo, segmento, posicionAtributo, posicionSegmento, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar) {
      var _this15 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from SegmentoReglas where conexionTablaID = " + segmento.conexionTablaID + " and variableID = " + _this15.props.idVariable + " and variableCampoID = " + variableCampo.ID + " and esConexionTabla = '" + segmento.esConexionTabla + "' and posicionSegmentoEnCampo = " + posicionSegmento + " and nivelMax = " + segmento.nivelMax, function (err, result) {
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

                ;
                /*console.log('arregloReglasDeSegmentosALlamar 1111111');
                console.log(arregloReglasDeSegmentosALlamar);
                for (var i = 0; i < arregloReglasDeSegmentosALlamar.length; i++) {
                    console.log('arregloReglasDeSegmentosALlamar[i]');
                    console.log(arregloReglasDeSegmentosALlamar[i]);
                    for (var j = 0; j < arregloReglasDeSegmentosALlamar[i].length; j++) {
                        console.log('arregloReglasDeSegmentosALlamar[i][j]');
                        console.log(arregloReglasDeSegmentosALlamar[i][j]);
                        for (var k = 0; k < arregloReglasDeSegmentosALlamar[i][j].length; k++) {
                            console.log('arregloReglasDeSegmentosALlamar[i][j][k]');
                            console.log(arregloReglasDeSegmentosALlamar[i][j][k]);
                        };
                    };
                };*/
                //lamar solo la primer regla o sea regla padre

                reglas[posicionAtributo][posicionSegmento][0].segmentoReglaID = result.recordset[0].ID; //crear reglas que sean de comparacion (esCondicion = verdadero)

                if (reglas[posicionAtributo][posicionSegmento][0].esCondicion) {
                  contadorObjetosAGuardar++;

                  _this15.createVariableFieldRules(variableCampo, result.recordset[0], reglas[posicionAtributo][posicionSegmento][0], posicionAtributo, posicionSegmento, 0, arregloReglasDeSegmentosALlamar, -1);
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

                  _this15.createVariableFieldRules(variableCampo, result.recordset[0], reglas[posicionAtributo][posicionSegmento][0], posicionAtributo, posicionSegmento, 0, arregloReglasDeSegmentosALlamar, -1);
                }

                if (arregloDeSegmentosALlamar.length == 0 && arregloReglasDeSegmentosALlamar.length == 0) {
                  console.log('HOLA 2');

                  _this15.limpiarArreglos();
                }
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "createVariableFieldRules",
    value: function createVariableFieldRules(variableCampo, segmento, regla, posicionAtributo, posicionSegmento, posicionRegla, arregloReglasDeSegmentosALlamar, reglaPadreID) {
      var _this16 = this;

      if (regla != undefined) {
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
          request.query("insert into Reglas (segmentoReglaID, variableID, variableCampoID, formulaID, reglaPadreID, conexionTablaID, nombreColumnaEnTabla, tipoCampoObjetivo, esCondicion, esConexionTabla, posicionSegmento, operacion, operacionTexto, valor, texto, nivel) values (" + segmento.ID + ", " + _this16.props.idVariable + ", " + variableCampo.ID + ", " + regla.formulaID + ", " + reglaPadreID + ", " + regla.conexionTablaID + ", '" + regla.nombreColumnaEnTabla + "', '" + regla.tipoCampoObjetivo + "', '" + regla.esCondicion + "', '" + regla.esConexionTabla + "', " + posicionSegmento + ", '" + regla.operacion + "', '" + regla.operacionTexto + "', '" + regla.valor + "', '" + regla.texto + "', " + regla.nivel + ")", function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                contadorObjetosGuardados++;

                _this16.limpiarArreglos();

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
                /*console.log('arregloReglasDeSegmentosALlamar 222');
                console.log(arregloReglasDeSegmentosALlamar);
                for (var i = 0; i < arregloReglasDeSegmentosALlamar.length; i++) {
                    console.log('arregloReglasDeSegmentosALlamar[i]');
                    console.log(arregloReglasDeSegmentosALlamar[i]);
                    for (var j = 0; j < arregloReglasDeSegmentosALlamar[i].length; j++) {
                        console.log('arregloReglasDeSegmentosALlamar[i][j]');
                        console.log(arregloReglasDeSegmentosALlamar[i][j]);
                        for (var k = 0; k < arregloReglasDeSegmentosALlamar[i][j].length; k++) {
                            console.log('arregloReglasDeSegmentosALlamar[i][j][k]');
                            console.log(arregloReglasDeSegmentosALlamar[i][j][k]);
                        };
                    };
                };*/


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

                  _this16.limpiarArreglos();
                } else {
                  _this16.traerRegla(variableCampo, segmento, regla, posicionAtributo, posicionSegmento, posicionRegla, arregloReglasDeSegmentosALlamar, reglaPadreID);
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
    value: function traerRegla(variableCampo, segmento, regla, posicionAtributo, posicionSegmento, posicionRegla, arregloReglasDeSegmentosALlamar, reglaPadreID) {
      var _this17 = this;

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
        request.query("select * from Reglas where segmentoReglaID = " + segmento.ID + " and variableID = " + _this17.props.idVariable + " and variableCampoID = " + variableCampo.ID + " and formulaID = " + regla.formulaID + " and reglaPadreID =  " + reglaPadreID + " and conexionTablaID = " + regla.conexionTablaID + " and nombreColumnaEnTabla = '" + regla.nombreColumnaEnTabla + "' and tipoCampoObjetivo = '" + regla.tipoCampoObjetivo + "' and esCondicion = '" + regla.esCondicion + "' and esConexionTabla = '" + regla.esConexionTabla + "' and posicionSegmentoEnCampo = " + posicionSegmento + " and operacion = '" + regla.operacion + "' and operacionTexto = '" + regla.operacionTexto + "' and valor = '" + regla.valor + "' and texto = '" + regla.texto + "' and nivel = " + regla.nivel, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              contadorObjetosGuardados++;

              _this17.limpiarArreglos();

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

                    _this17.createVariableFieldRules(variableCampo, segmento, reglas[posicionAtributo][posicionSegmento][posicionRegla + 1], posicionAtributo, posicionSegmento, posicionRegla + 1, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                  } else if (!reglas[posicionAtributo][posicionSegmento][posicionRegla + 1].esCondicion) {
                    contadorObjetosAGuardar++; //crear reglas que sean de asignacion (esCondicion = falso) con el id de formula correcto

                    for (var i = 0; i < formulas[posicionAtributo].length; i++) {
                      if (i == reglas[posicionAtributo][posicionSegmento][posicionRegla + 1].formulaID) {
                        reglas[posicionAtributo][posicionSegmento][posicionRegla + 1].formulaID = formulas[posicionAtributo][i].ID;
                        break;
                      }
                    }

                    ;

                    _this17.createVariableFieldRules(variableCampo, segmento, reglas[posicionAtributo][posicionSegmento][posicionRegla + 1], posicionAtributo, posicionSegmento, posicionRegla + 1, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                  }
                }
                /*else if(reglas[posicionAtributo] != undefined && reglas[posicionAtributo][posicionSegmento+1] != undefined) {
                  if(reglas[posicionAtributo][posicionSegmento+1][posicionRegla].esCondicion) {
                      contadorObjetosAGuardar++;
                      this.createVariableFieldRules(variableCampo, segmento, reglas[posicionAtributo][posicionSegmento+1][posicionRegla], posicionAtributo, posicionSegmento+1, 0, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                  } else if(!reglas[posicionAtributo][posicionSegmento+1][posicionRegla].esCondicion) {
                      contadorObjetosAGuardar++;
                      //crear reglas que sean de asignacion (esCondicion = falso) con el id de formula correcto
                      for (var i = 0; i < formulas[posicionAtributo].length; i++) {
                          if(i == reglas[posicionAtributo][posicionSegmento+1][posicionRegla].formulaID) {
                              reglas[posicionAtributo][posicionSegmento+1][posicionRegla].formulaID = formulas[posicionAtributo][i].ID;
                              break;
                          }
                      };
                      this.createVariableFieldRules(variableCampo, segmento, reglas[posicionAtributo][posicionSegmento+1][posicionRegla], posicionAtributo, posicionSegmento+1, 0, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                  }
                } else if(reglas[posicionAtributo+1] != undefined) {
                  if(reglas[posicionAtributo+1][0][0].esCondicion) {
                      contadorObjetosAGuardar++;
                      this.createVariableFieldRules(variableCampo, segmento, reglas[posicionAtributo+1][0][0], posicionAtributo+1, 0, 0, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                  } else if(!reglas[posicionAtributo+1].esCondicion) {
                      contadorObjetosAGuardar++;
                      //crear reglas que sean de asignacion (esCondicion = falso) con el id de formula correcto
                      for (var i = 0; i < formulas[posicionAtributo+1].length; i++) {
                          if(i == reglas[posicionAtributo+1][0][0].formulaID) {
                              reglas[posicionAtributo+1][0][0].formulaID = formulas[posicionAtributo+1][i].ID;
                              break;
                          }
                      };
                      this.createVariableFieldRules(variableCampo, segmento, reglas[posicionAtributo+1][0][0], posicionAtributo+1, 0, 0, arregloReglasDeSegmentosALlamar, result.recordset[0].ID);
                  }
                }*/
                else {
                    console.log('HOLA 5');

                    _this17.limpiarArreglos();
                  }
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "createVariableFieldFormula",
    value: function createVariableFieldFormula(variableCampo, formula, posicionAtributo, posicionFormula, arregloDeFormulasALlamar, arregloElementosDeFormulasALlamar) {
      var _this18 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into FormulasVariablesCampos (variableID, variableCampoID, posicionFormulaEnCampo, formula, operacion) values (" + _this18.props.idVariable + ", " + variableCampo.ID + ", " + posicionFormula + ", '" + formula.formula + "', '" + formula.operacion + "')", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              contadorObjetosGuardados++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              contadorObjetosGuardados++;

              _this18.getVariableFieldFormulaID(variableCampo, formula, posicionAtributo, posicionFormula, arregloDeFormulasALlamar, arregloElementosDeFormulasALlamar);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getVariableFieldFormulaID",
    value: function getVariableFieldFormulaID(variableCampo, formula, posicionAtributo, posicionFormula, arregloDeFormulasALlamar, arregloElementosDeFormulasALlamar) {
      var _this19 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from FormulasVariablesCampos where variableID = " + _this19.props.idVariable + " and variableCampoID = " + variableCampo.ID + " and posicionFormulaEnCampo = " + posicionFormula, function (err, result) {
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

                  _this19.createVariableFieldFormulaElement(variableCampo, result.recordset[0], elementosFormulas[posicionAtributo][posicionFormula][i], posicionAtributo, posicionFormula, i, arregloElementosDeFormulasALlamar, existenSegmentos);
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

                  for (var j = 0; j < segmentoRegla[posicionAtributo].length; j++) {
                    if (arregloDeSegmentosALlamar[posicionAtributo] == undefined) arregloDeSegmentosALlamar[posicionAtributo] = [];
                    arregloDeSegmentosALlamar[posicionAtributo].push(j);
                    if (arregloReglasDeSegmentosALlamar[posicionAtributo] == undefined) arregloReglasDeSegmentosALlamar[posicionAtributo] = [];
                    contadorObjetosAGuardar++;
                    segmentoRegla[posicionAtributo][j].posicionSegmentoEnCampo = j;

                    _this19.createVariableFieldRuleSegments(variableCampo, segmentoRegla[posicionAtributo][j], posicionAtributo, j, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar);
                  }

                  ;
                  /*for (var i = 0; i < segmentoRegla.length; i++) {
                      for (var j = 0; j < segmentoRegla[i].length; j++) {
                          if(arregloDeSegmentosALlamar[i] == undefined)
                              arregloDeSegmentosALlamar[i] = [];
                          arregloDeSegmentosALlamar[i].push(j);
                          if(arregloReglasDeSegmentosALlamar[i] == undefined)
                              arregloReglasDeSegmentosALlamar[i] = [];
                          contadorObjetosAGuardar++;
                          segmentoRegla[i][j].posicionSegmentoEnCampo = j;
                          this.createVariableFieldRuleSegments(variableCampo, segmentoRegla[i][j], i, j, arregloDeSegmentosALlamar, arregloReglasDeSegmentosALlamar);
                      };
                  };*/
                }

                if (arregloDeFormulasALlamar.length == 0 && !existenSegmentos) {
                  console.log('HOLA 6');

                  _this19.limpiarArreglos();
                }
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "createVariableFieldFormulaElement",
    value: function createVariableFieldFormulaElement(variableCampo, formula, elemento, posicionAtributo, posicionFormula, posicionElemento, arregloElementosDeFormulasALlamar, existenSegmentos) {
      var _this20 = this;

      //if(elemento != undefined) {
      console.log('variableCampo');
      console.log(variableCampo);
      console.log('formula');
      console.log(formula);
      console.log('elemento');
      console.log(elemento);
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into ElementoFormulasVariablesCampos (variableID, variableCampoID, formulaID, conexionTablaID, esFuenteDeDato, excelArchivoID , excelVariableID , formaVariableID , elementoVariableID, elementoVariableCampoID, nombreColumnaEnTabla, tipoColumnaEnTabla, nombreVariable, descripcion, operacion) values (" + _this20.props.idVariable + ", " + variableCampo.ID + ", " + formula.ID + ", " + elemento.conexionTablaID + ", '" + elemento.esFuenteDeDato + "', " + elemento.excelArchivoID + ", " + elemento.excelVariableID + ", " + elemento.formaVariableID + ", " + elemento.elementoVariableID + ", " + elemento.elementoVariableCampoID + ", '" + elemento.nombreColumnaEnTabla + "', '" + elemento.tipoColumnaEnTabla + "', '" + elemento.nombreVariable + "', '" + elemento.descripcion + "', '" + elemento.operacion + "')", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              contadorObjetosGuardados++;

              _this20.limpiarArreglos();

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

                _this20.limpiarArreglos();
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
        this.getVariables();
        this.getExcel();
        this.getFormas();
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

      if (nombreVariable.length < 101 && nombreVariable.length > 0) {
        if (descripcionVariable.length < 701) {
          //if(operacionSeleccionada.valor != undefined) {
          if (esObjeto != undefined) {
            if (guardarResultadosEnBaseDatos != undefined) {
              if (esInstruccionSQL != undefined) {
                if (!isNaN(objetoPadreID)) {
                  if (!isNaN(nuevoNivel)) {
                    if (variablesSQL.length > 0) {
                      if (instruccionSQL.length > 0) {
                        var nuevaVariable = {
                          nombre: nombreVariable,
                          descripcion: descripcionVariable,
                          esObjeto: esObjeto,
                          objetoPadreID: objetoPadreID,
                          esInstruccionSQL: esInstruccionSQL,
                          guardar: guardarResultadosEnBaseDatos
                        };
                        this.createVariable(nuevaVariable, [nuevoAtributo]);
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

      if (nombreVariable.length < 101 && nombreVariable.length > 0) {
        if (this.verificarNoExisteNombreVar(nombreVariable)) {
          if (descripcionVariable.length < 701) {
            //if(operacionSeleccionada.valor != undefined) {
            if (esObjeto != undefined) {
              if (guardarResultadosEnBaseDatos != undefined) {
                if (esInstruccionSQL != undefined) {
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
                          esInstruccionSQL: esInstruccionSQL,
                          guardar: guardarResultadosEnBaseDatos
                        };
                        nivelNuevoAtributoUnico = 0;
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

      var esInstruccionSQL;
      if ($("#esInstruccionSQL").is(':checked')) esInstruccionSQL = true;else esInstruccionSQL = false;

      if (nombreVariable.length < 101 && nombreVariable.length > 0) {
        if (this.verificarNoExisteNombreVar(nombreVariable)) {
          if (descripcionVariable.length < 701) {
            //if(operacionSeleccionada.valor != undefined) {
            if (esObjeto != undefined) {
              if (guardarResultadosEnBaseDatos != undefined) {
                if (esInstruccionSQL != undefined) {
                  if (!isNaN(objetoPadreID)) {
                    //if(tipoDeAsignacionSeleccionado != undefined && tipoDeAsignacionSeleccionado.length > 0) {
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
                        objetoPadreID: objetoPadreID,
                        esInstruccionSQL: esInstruccionSQL,
                        guardar: guardarResultadosEnBaseDatos
                      };
                      this.createVariable(nuevaVariable, atributosVario);
                      nivelNuevoAtributoVarios = 0;
                      contadorObjetosAGuardar++;
                    } else {
                      alert("Seleccione un nivel para el campo.");
                    }
                    /*} else {
                        alert("Seleccione un tipo de asignación.");
                    }*/

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
    key: "crearVariableSQL",
    value: function crearVariableSQL() {
      var nombreCampo = $("#nuevoCampo").val();
      var tipo = $("#tipo").val();

      if (nombreCampo.length < 101) {
        if (this.verificarNoExisteNombreCampo(nombreCampo)) {
          if (tipo.length < 101) {
            var nuevaVar = {
              nombre: nombreCampo,
              tipo: tipo
            };
            variablesSQL.push(nuevaVar);
            this.setState({
              camposInstruccionSQL: variablesSQL
            });
          } else {
            alert("El tipo del campo debe tener una longitud menor a 31 caracteres.");
          }
        } else {
          alert("El nombre del campo debe ser unico.");
        }
      } else {
        alert("El nombre del campo debe tener una longitud menor a 101 caracteres.");
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
      } //si es formula, viendo que no haya regla debajo, formulas solo se pueden agregar al final


      if (banderaSinoReglaValido) {
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
                }

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

              if (formulaSeleccionada.tablaID != undefined) {
                console.log('2.1');

                if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].conexionTablaID == formulaSeleccionada.tablaID) {
                  console.log('2.1.1');
                  entrarACrearRegla = true;
                }
              } else if (formulaSeleccionada.variableID != undefined) {
                console.log('2.2');

                if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].variableID == formulaSeleccionada.variableID) {
                  console.log('2.2.2');
                  entrarACrearRegla = true;
                }

                var variableSel = this.state.variables.filter(function (object) {
                  return object.ID == formulaSeleccionada.variableID;
                });

                if (variableSel.length > 0) {
                  if (!variableSel[0].esObjeto) entrarACrearRegla = true;
                }
              } else if (formulaSeleccionada.excelArchivoID != undefined) {
                entrarACrearRegla = true;
              } else if (formulaSeleccionada.formaVariableID != undefined) {
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

              if (campoSeleccionado.tablaID != -1) {
                conexionTablaID = campoSeleccionado.tablaID;
                esConexionTabla = true;
                nombreColumnaEnTabla = campoSeleccionado.valor;
              } else if (campoSeleccionado.variableID != -1) {
                variableID = campoSeleccionado.variableID;
              } else if (campoSeleccionado.excelArchivoID != -1) {
                excelArchivoID = campoSeleccionado.excelArchivoID;
                excelVariableID = campoSeleccionado.excelVariableID;
              } else if (campoSeleccionado.formaVariableID != -1) {
                formaVariableID = campoSeleccionado.formaVariableID;
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
                  formaVariableID: formaVariableID
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
                valor: valor,
                texto: campoSeleccionado.valor + " " + operacionSeleccionada.operacionTexto + " " + valor,
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

                if (formulaSeleccionada.tablaID != -1) {
                  conexionTablaID = formulaSeleccionada.tablaID;
                  esConexionTabla = true;
                } else if (formulaSeleccionada.variableID != -1) {
                  variableID = formulaSeleccionada.variableID;
                } else if (formulaSeleccionada.excelArchivoID != -1) {
                  excelArchivoID = formulaSeleccionada.excelArchivoID;
                  excelVariableID = formulaSeleccionada.excelVariableID;
                } else if (formulaSeleccionada.formaVariableID != -1) {
                  formaVariableID = formulaSeleccionada.formaVariableID;
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
                    formaVariableID: formaVariableID
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
        alert("La comparación ya tiene una clausula 'SINO'");
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
        if (formulaArreglo[i].tipo.localeCompare("variable") == 0) {
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
          if (formulaArreglo[i].elementoVariableID != undefined) elementoVariableID = formulaArreglo[i].elementoVariableID;
          var elementoVariableCampoID = -1;
          if (formulaArreglo[i].elementoVariableCampoID != undefined) elementoVariableCampoID = formulaArreglo[i].elementoVariableCampoID;
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
        }
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
        } //si es formula, viendo que no haya regla debajo, formulas solo se pueden agregar al final


        if (banderaSinoReglaValido) {
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
                  }

                  if (indiceSeleccionadoSegmentoReglas == 0) entrarACrearRegla = true;
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

                if (formulaSeleccionada.tablaID != undefined) {
                  console.log('2.1');

                  if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].conexionTablaID == formulaSeleccionada.tablaID) {
                    console.log('2.1.1');
                    entrarACrearRegla = true;
                  }
                } else if (formulaSeleccionada.variableID != undefined) {
                  console.log('2.2');

                  if (segmentoRegla[posicionAtributo][indiceSeleccionadoSegmentoReglas].variableID == formulaSeleccionada.variableID) {
                    console.log('2.2.2');
                    entrarACrearRegla = true;
                  }

                  if (indiceSeleccionadoSegmentoReglas == 0) entrarACrearRegla = true;
                  var variableSel = this.state.variables.filter(function (object) {
                    return object.ID == formulaSeleccionada.variableID;
                  });

                  if (variableSel.length > 0) {
                    if (!variableSel[0].esObjeto) entrarACrearRegla = true;
                  }
                } else if (formulaSeleccionada.excelArchivoID != undefined) {
                  entrarACrearRegla = true;
                } else if (formulaSeleccionada.formaVariableID != undefined) {
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
          alert("La comparación ya tiene una clausula 'SINO'");
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
    key: "retornoCampoFormula",
    value: function retornoCampoFormula(tipoVariableOriginal) {
      tipoDeAsignacionSeleccionado = tipoVariableOriginal;
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
    key: "getVariables",
    value: function getVariables() {
      var _this21 = this;

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
              _this21.setState({
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
      var _this22 = this;

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
              _this22.setState({
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
      var _this23 = this;

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
              _this23.setState({
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
      variablesSQL[index].nombre = nombreN;
      variablesSQL[index].tipo = tipoN;
    }
  }, {
    key: "eliminarCampoSQL",
    value: function eliminarCampoSQL(index) {
      variablesSQL.splice(index, 1);
    }
  }, {
    key: "actualizarCampoSQL",
    value: function actualizarCampoSQL(index, nombreN, tipoN) {
      variablesSQL[index].nombre = nombreN;
      variablesSQL[index].tipo = tipoN;
    }
  }, {
    key: "eliminarCampoSQL",
    value: function eliminarCampoSQL(index) {
      variablesSQL.splice(index, 1);
    }
  }, {
    key: "render",
    value: function render() {
      var _this24 = this;

      if (this.state.componenteActual.localeCompare("editarVariable") == 0) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }, _react["default"].createElement(_EditarVariable["default"], {
          pool: this.props.pool,
          tipoVariableOriginal: this.state.tipoVariableOriginal,
          idVariable: this.props.idVariable,
          esObjetoVariable: this.props.esObjetoVariable,
          esInstruccionSQLVariable: this.props.esInstruccionSQLVariable,
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
          callbackModificarRegla: this.modificarRegla,
          callbackEliminarRegla: this.eliminarRegla,
          retornarIndiceSeleccionado: this.actualizarIndiceSeleccionadoReglas,
          retornarEstadoVistaEsCondicion: function retornarEstadoVistaEsCondicion() {
            _this24.actualizarCondicion;
          },
          retornoCampo: this.retornoCampoCondicion,
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

  return EditarVariablesHome;
}(_react["default"].Component);

exports["default"] = EditarVariablesHome;
//# sourceMappingURL=EditarVariablesHome.js.map
