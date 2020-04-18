"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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

var FuenteDatoVariable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FuenteDatoVariable, _React$Component);

  function FuenteDatoVariable(props) {
    var _this;

    _classCallCheck(this, FuenteDatoVariable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FuenteDatoVariable).call(this, props));
    _this.state = {
      //atributos: this.props.atributos,
      mostrarEsObjeto: mostrarEsObjetoGlobal,
      titulo: tituloGlobal,
      mostrarInstruccionSQL: mostrarInstruccionSQLGlobal
      /*tipoVariable: '',
      operaciones: operacionesCadena,
      reglas: []*/

      /*this.crearAtributoFuenteDatos = this.crearAtributoFuenteDatos.bind(this);
      this.crearFuenteDato = this.crearFuenteDato.bind(this);
      this.existeReglaAsignacion = this.existeReglaAsignacion.bind(this);
      this.retornarCodigoOperacion = this.retornarCodigoOperacion.bind(this);
      this.retornoSeleccionCampo = this.retornoSeleccionCampo.bind(this);
      this.retornoSeleccionOperacion = this.retornoSeleccionOperacion.bind(this);*/

    };
    _this.cambioInstruccionSQL = _this.cambioInstruccionSQL.bind(_assertThisInitialized(_this));
    _this.cambioAObjeto = _this.cambioAObjeto.bind(_assertThisInitialized(_this));
    _this.cambiarTitulo = _this.cambiarTitulo.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FuenteDatoVariable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        mostrarEsObjeto: this.props.esObjetoVariable,
        mostrarInstruccionSQL: this.props.esInstruccionSQLVariable
      });
    }
    /*crearAtributoFuenteDatos () {
        var nombre = $("#nombreFuenteDato").val();
        var esObjeto;
        if ($("#esObjetoFuenteDato").is(':checked'))
            esObjeto = true;
        else
            esObjeto = false;
        var nombreAtributo = nombre;
        if(esObjeto) {
            nombreAtributo = $("#nombreAtributo").val();
        }
        var formula = this.retornarCodigoOperacion(operacionSeleccionada.valor) + "(" + columnaSeleccionada.valor + ")";
        if(nombreAtributo.length > 0) {
            if(formula.length > 0) {
            } else {
                alert("Ingrese un valor para el nombre del atributo.");
            }
        } else {
            alert("Ingrese un valor para el nombre del atributo.");
        }
        var fuenteDatoAtributo = {nombre: nombreAtributo, tipo: this.state.tipoVariable, formula: formula};
        var copiaAntigua = [...this.state.atributos];
        copiaAntigua.push(fuenteDatoAtributo);
        this.setState({
            atributos: copiaAntigua
        }, console.log(this.state.atributos));
    }
     crearFuenteDato () {
        if(columnaSeleccionada.valor != undefined) {            //if(columnaSeleccionada.valor != undefined) {
            if(operacionSeleccionada.valor != undefined) {      //if(operacionSeleccionada.valor != undefined) {
                if(operacionSeleccionada.valor.localeCompare("Asignar Valor Único Si") != 0 && operacionSeleccionada.valor.localeCompare("Asignar Valor Multiples Si") != 0 && operacionSeleccionada.valor.localeCompare("Contar Si") != 0) {
                    if(this.state.reglas.length > 0) {  //no existe ninguna regla
                        if(this.existeReglaAsignacion()) {       //no existe ni regla de asignacion
                            var nombre = $("#nombreFuenteDato").val();
                            var descripcion = $("#descripcionFuenteDato").val();
                            var esObjeto;
                            if ($("#esObjetoFuenteDato").is(':checked'))
                                esObjeto = true;
                            else
                                esObjeto = false;
                            var objetoPadreID = -1;
                            if(!this.state.mostrarEsObjeto)
                                objetoPadreID = $("#objetoPadreID").val();
                            var guardar;
                            if ($("#guardarFuenteDato").is(':checked'))
                                guardar = true;
                            else
                                guardar = false;
                            //var formula = this.retornarCodigoOperacion(operacionSeleccionada.valor) + "(" + columnaSeleccionada.valor + ")";
                            var fuenteDato = {nombre: nombre, descripcion: descripcion, esObjeto: esObjeto, objetoPadreID: objetoPadreID, guardar: guardar};
                            var regla = {reglaPadreID: -1, variablePadreID: -1, esFuenteDato: true, operacion: operacionSeleccionada.valor, valor: '', nivel: 0, orden: 0};
                        } else {
                            alert("Tiene que crear por lo menos una regla de asignacion.");
                        }
                    } else {
                        alert("Tiene que crear por lo menos una regla.");
                    }
                } else if(operacionSeleccionada.valor.localeCompare("Asignar Si Único Si") == 0) {
                    //
                }
            } else {
                alert("Seleccione una operación de la tabla.");
            }
        } else {
            alert("Seleccione una columna de la tabla.");
        }
    }
     existeReglaAsignacion () {
        for (var i = 0; i < this.state.reglas.length; i++) {
            if(this.state.reglas[i].operacion.localeCompare("Asignar Valor Único") == 0 || 
                this.state.reglas[i].operacion.localeCompare("Asignar Valor Único Si") == 0 || 
                this.state.reglas[i].operacion.localeCompare("Asignar Valor Multiples") == 0 || 
                this.state.reglas[i].operacion.localeCompare("Asignar Valor Multiples Si") == 0 || 
                this.state.reglas[i].operacion.localeCompare("Contar") == 0 || 
                this.state.reglas[i].operacion.localeCompare("Contar Si") == 0 || 
                this.state.reglas[i].operacion.localeCompare("Calcular Promedio") == 0 || 
                this.state.reglas[i].operacion.localeCompare("Máximo") == 0 || 
                this.state.reglas[i].operacion.localeCompare("Mínimo") == 0 || 
                this.state.reglas[i].operacion.localeCompare("Sumar") == 0) {
                return true;
            }
        };
        return false;
    }
     retornarCodigoOperacion (codigo) {
        if(codigo.localeCompare("Asignar Valor Único") == 0) {
            return "ASIGUNI";
        }
        if(codigo.localeCompare("Asignar Valor Único Si") == 0) {
            return "ASIGUNI";
        }
        if(codigo.localeCompare("Asignar Valor Multiples") == 0) {
            return "ASIGMUL";
        }
        if(codigo.localeCompare("Asignar Valor Multiples Si") == 0) {
            return "ASIGMUL";
        }
        if(codigo.localeCompare("Contar") == 0) {
            return "COUNT";
        }
        if(codigo.localeCompare("Contar Si") == 0) {
            return "COUNT";
        }
        if(codigo.localeCompare("Calcular Promedio") == 0) {
            return "PROM";
        }
        if(codigo.localeCompare("Máximo") == 0) {
            return "MAX";
        }
        if(codigo.localeCompare("Mínimo") == 0) {
            return "MIN";
        }
        if(codigo.localeCompare("Sumar") == 0) {
            return "SUM";
        }
    }
     retornoSeleccionCampo (variable) {
        columnaSeleccionada = {};
        //fuenteDatoAtributo.columnaSeleccionada = {};
        if(variable[0].valor.length > 0) {
            columnaSeleccionada = variable[0];
            //fuenteDatoAtributo.columnaSeleccionada = variable[0];
            var tipoVariable = '';
            if(columnaSeleccionada.tipo.localeCompare("int") == 0 || columnaSeleccionada.tipo.localeCompare("decimal") == 0) {
                tipoVariable = 'Número';
                this.setState({
                    operaciones: operacionesNumero,
                    tipoVariable: tipoVariable
                });
            } else if(columnaSeleccionada.tipo.localeCompare("varchar") == 0) {
                tipoVariable = 'Cadena';
                this.setState({
                    operaciones: operacionesCadena,
                    tipoVariable: tipoVariable
                });
            } else if(columnaSeleccionada.tipo.localeCompare("date") == 0) {
                tipoVariable = 'Fecha';
                this.setState({
                    operaciones: operacionesFecha,
                    tipoVariable: tipoVariable
                });
            } else if(columnaSeleccionada.tipo.localeCompare("bit") == 0) {
                tipoVariable = 'Booleano';
                this.setState({
                    operaciones: operacionesBoolean,
                    tipoVariable: tipoVariable
                });
            }
            //this.setState({
            //    tipoVariable: tipoVariable
            //});
        }
    }
     retornoSeleccionOperacion (operacion) {
        operacionSeleccionada = {};
        //fuenteDatoAtributo.operacionSeleccionada = {};
        if(operacion[0].valor.length > 0) {
            operacionSeleccionada = operacion[0];
            //fuenteDatoAtributo.operacionSeleccionada = operacion[0];
        }
    }*/

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
        className: "btn btn-brand btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: this.props.guardarVariable
      }, "Crear Variable")), _react["default"].createElement("br", null));
    }
  }]);

  return FuenteDatoVariable;
}(_react["default"].Component);

exports["default"] = FuenteDatoVariable;
//# sourceMappingURL=FuenteDatoVariable.js.map
