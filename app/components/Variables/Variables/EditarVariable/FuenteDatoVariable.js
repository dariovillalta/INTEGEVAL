"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _FuenteDatoVariableAtributos = _interopRequireDefault(require("./FuenteDatoVariableAtributos.js"));

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

/*COMPONENTE CONTENEDOR PADRE / ORIGINAL DE PROCESO CREAR VARIABLE ESTILO VARIABLE*/
//var fuenteDatoAtributo = {};

/*var columnaSeleccionada = {}, operacionSeleccionada = {};
const operaciones = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}];
const operacionesNumero = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}, {valor: "Calcular Promedio"}, {valor: "Máximo"}, {valor: "Mínimo"}, {valor: "Sumar"}];
const operacionesFecha = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}];
const operacionesBoolean = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}];
const operacionesCadena = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}, {valor: "Sumar"}];*/
var mostrarEsObjetoGlobal = true;
var mostrarInstruccionSQLGlobal = true;
var tituloGlobal = "Instrucción SQL";
var periodicidad = [{
  nombre: "diario"
}, {
  nombre: "semanal"
}, {
  nombre: "mensual"
}, {
  nombre: "trimestral"
}, {
  nombre: "bi-anual"
}, {
  nombre: "anual"
}];

var FuenteDatoVariable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FuenteDatoVariable, _React$Component);

  function FuenteDatoVariable(props) {
    var _this;

    _classCallCheck(this, FuenteDatoVariable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FuenteDatoVariable).call(this, props));
    _this.state = {
      mostrarEsObjeto: mostrarEsObjetoGlobal,
      titulo: tituloGlobal,
      mostrarInstruccionSQL: mostrarInstruccionSQLGlobal,
      valorPeriodicidad: "-1"
    };
    _this.cambioInstruccionSQL = _this.cambioInstruccionSQL.bind(_assertThisInitialized(_this));
    _this.cambioAObjeto = _this.cambioAObjeto.bind(_assertThisInitialized(_this));
    _this.cambiarTitulo = _this.cambiarTitulo.bind(_assertThisInitialized(_this));
    _this.actualizarPeriodicidad = _this.actualizarPeriodicidad.bind(_assertThisInitialized(_this));
    _this.cargarDatePicker = _this.cargarDatePicker.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FuenteDatoVariable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      $('#fecha').datepicker({
        format: "dd-mm-yyyy",
        todayHighlight: true,
        viewMode: "days",
        minViewMode: "days",
        language: 'es'
      });
      $("#fecha").datepicker("setDate", this.props.fechaInicioVariable);
      var self = this;
      $('#fecha').datepicker().on('changeDate', function () {
        var fecha = $("#fecha").datepicker('getDate');
        self.props.actualizarFechaInicio(fecha);
      });

      if (this.props.tipoVariableOriginal.localeCompare("variable") == 0) {
        var transaction = new _mssql["default"].Transaction(this.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("select * from Variables where ID = " + _this2.props.idVariable, function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                if (result.recordset.length > 0) {
                  var titulo = "Instrucción SQL";

                  if (!result.recordset[0].esInstruccionSQL) {
                    if (result.recordset[0].esObjeto) titulo = "Valores Multiples";else titulo = "Valor Único";
                  }

                  _this2.setState({
                    titulo: titulo,
                    mostrarEsObjeto: result.recordset[0].esObjeto,
                    mostrarInstruccionSQL: result.recordset[0].esInstruccionSQL,
                    valorPeriodicidad: result.recordset[0].periodicidad
                  });
                }
              });
            }
          });
        }); // fin transaction
      }
    }
  }, {
    key: "cambioInstruccionSQL",
    value: function cambioInstruccionSQL() {
      mostrarInstruccionSQLGlobal = !this.state.mostrarInstruccionSQL;
      mostrarEsObjetoGlobal = true;
      this.setState({
        mostrarInstruccionSQL: !this.state.mostrarInstruccionSQL,
        mostrarEsObjeto: true
      }, this.cambiarTitulo);
    }
  }, {
    key: "cambioAObjeto",
    value: function cambioAObjeto() {
      mostrarEsObjetoGlobal = !this.state.mostrarEsObjeto;
      this.setState({
        mostrarEsObjeto: !this.state.mostrarEsObjeto,
        tipoVariable: ''
      }, this.cambiarTitulo);
    }
  }, {
    key: "cambiarTitulo",
    value: function cambiarTitulo() {
      this.props.cambioDeArreglosDeAtributos();

      if (this.state.mostrarInstruccionSQL) {
        tituloGlobal = "Instrucción SQL";
        this.setState({
          titulo: "Instrucción SQL"
        });
      } else if (this.state.mostrarEsObjeto) {
        tituloGlobal = "Valores Multiples";
        this.setState({
          titulo: "Valores Multiples"
        });
      } else {
        tituloGlobal = "Valor Único";
        this.setState({
          titulo: "Valor Único"
        });
      }

      this.props.actualizarEstadoSiEsObjeto(this.state.mostrarEsObjeto);
      this.props.actualizarEstadoSiEsInstruccionSQL(this.state.mostrarInstruccionSQL);
    }
  }, {
    key: "actualizarPeriodicidad",
    value: function actualizarPeriodicidad() {
      var periodicidad = $("#periodicidad").val();
      this.setState({
        valorPeriodicidad: periodicidad
      }, this.cargarDatePicker);
      this.props.actualizarPeriodicidad();
    }
  }, {
    key: "cargarDatePicker",
    value: function cargarDatePicker() {
      $('#fecha').datepicker({
        format: "dd-mm-yyyy",
        todayHighlight: true,
        viewMode: "days",
        minViewMode: "days",
        language: 'es'
      });
      $("#fecha").datepicker("setDate", this.props.fechaInicioVariable);
      var self = this;
      $('#fecha').datepicker().on('changeDate', function () {
        var fecha = $("#fecha").datepicker('getDate');
        self.props.actualizarFechaInicio(fecha);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "nombreFuenteDato",
        className: "col-form-label"
      }, "Nombre de Variable")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("input", {
        id: "nombreFuenteDato",
        defaultValue: this.props.nombreVariable,
        onKeyUp: this.props.actualizarNombreVariable,
        type: "text",
        className: "form-control form-control-sm"
      }))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"
      }, _react["default"].createElement("label", {
        htmlFor: "descripcionFuenteDato",
        className: "col-form-label"
      }, "Descripci\xF3n de Variable:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"
      }, _react["default"].createElement("textarea", {
        defaultValue: this.props.descripcionVariable,
        onKeyUp: this.props.actualizarDescripcionVariable,
        className: "form-control",
        id: "descripcionFuenteDato",
        rows: "3"
      }))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "esInstruccionSQL",
        className: "col-form-label"
      }, "Tipo de C\xE1lculo:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "switch-button-sql switch-button-yesno",
        style: {
          margin: "0 auto",
          display: "block"
        }
      }, _react["default"].createElement("input", {
        type: "checkbox",
        defaultChecked: this.state.mostrarInstruccionSQL,
        name: "esInstruccionSQL",
        id: "esInstruccionSQL",
        onClick: this.cambioInstruccionSQL
      }), _react["default"].createElement("span", null, _react["default"].createElement("label", {
        htmlFor: "esInstruccionSQL"
      }))))), !this.state.mostrarInstruccionSQL ? _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "esObjetoFuenteDato",
        className: "col-form-label"
      }, "Tiene m\xE1s de un campo:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "switch-button-variable switch-button-yesno",
        style: {
          margin: "0 auto",
          display: "block"
        }
      }, _react["default"].createElement("input", {
        type: "checkbox",
        defaultChecked: this.state.mostrarEsObjeto,
        name: "esObjetoFuenteDato",
        id: "esObjetoFuenteDato",
        onClick: this.cambioAObjeto
      }), _react["default"].createElement("span", null, _react["default"].createElement("label", {
        htmlFor: "esObjetoFuenteDato"
      }))))) : null, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "periodicidad",
        className: "col-form-label"
      }, "Periodicidad")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("select", {
        id: "periodicidad",
        defaultValue: this.props.periodicidadVariable,
        onChange: this.actualizarPeriodicidad,
        className: "form-control"
      }, _react["default"].createElement("option", {
        value: "-1"
      }, "Ninguno"), periodicidad.map(function (periodicidad, i) {
        return _react["default"].createElement("option", {
          value: periodicidad.nombre,
          key: periodicidad.nombre
        }, periodicidad.nombre);
      })))), this.state.valorPeriodicidad.localeCompare("-1") != 0 ? _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "esObjetoFuenteDato",
        className: "col-form-label"
      }, "Fecha de Inicio de C\xE1lculo:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("input", {
        type: "text",
        className: "form-control",
        id: "fecha"
      }))) : null, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "analista",
        className: "col-form-label"
      }, "Nombre Encargado")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("input", {
        id: "analista",
        defaultValue: this.props.analistaVariable,
        onKeyUp: this.props.actualizarNombreEncargado,
        type: "text",
        className: "form-control form-control-sm"
      }))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "guardarFuenteDato",
        className: "col-form-label"
      }, "Guardar Valores Obtenidos en Base de Datos:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "switch-button switch-button-yesno",
        style: {
          margin: "0 auto",
          display: "block"
        }
      }, _react["default"].createElement("input", {
        type: "checkbox",
        defaultChecked: true,
        name: "guardarFuenteDato",
        id: "guardarFuenteDato"
      }), _react["default"].createElement("span", null, _react["default"].createElement("label", {
        htmlFor: "guardarFuenteDato"
      }))))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%",
          display: this.state.mostrarEsObjeto ? "" : "none"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"
      }, _react["default"].createElement("label", {
        htmlFor: "objetoPadreID",
        className: "col-form-label"
      }, "Variable Padre:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"
      }, _react["default"].createElement("select", {
        className: "form-control",
        id: "objetoPadreID"
      }, _react["default"].createElement("option", {
        value: "-1"
      }, "Ninguno")))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%",
          border: "1px solid #e6e6f2"
        }
      }, _react["default"].createElement(_FuenteDatoVariableAtributos["default"], {
        atributos: this.props.atributos,
        titulo: this.state.titulo,
        mostrarInstruccionSQL: this.state.mostrarInstruccionSQL,
        nombreCampoNuevoAtributosVario: this.props.nombreCampoNuevoAtributosVario,
        tipoNuevaVariable: this.props.tipoNuevaVariable,
        actualizarNombreCampoNuevoAtributosVario: this.props.actualizarNombreCampoNuevoAtributosVario,
        crearAtributoVariable: this.props.crearAtributoVariable,
        mostrarEsObjeto: this.state.mostrarEsObjeto,
        goToCreateConditions: this.props.goToCreateConditions,
        goCreateVariableFieldSQL: this.props.goCreateVariableFieldSQL
      })), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-brand active",
        onClick: this.props.guardarVariable
      }, "Modificar Variable"), this.props.tipoVariableOriginal.localeCompare("variable") == 0 ? _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-secondary active",
        style: {
          marginLeft: "10px"
        },
        onClick: this.props.eliminarVariable
      }, "Eliminar Variable") : null, this.props.tipoVariableOriginal.localeCompare("variable") == 0 ? _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-primary active",
        style: {
          marginLeft: "10px"
        },
        onClick: this.calculoVariable
      }, "Realizar C\xE1lculo") : null), _react["default"].createElement("br", null));
    }
  }]);

  return FuenteDatoVariable;
}(_react["default"].Component);

exports["default"] = FuenteDatoVariable;
//# sourceMappingURL=FuenteDatoVariable.js.map
