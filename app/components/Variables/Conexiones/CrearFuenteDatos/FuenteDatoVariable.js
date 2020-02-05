"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _CrearFuenteDatosAtributos = _interopRequireDefault(require("./CrearFuenteDatosAtributos.js"));

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

//var fuenteDatoAtributo = {};
var columnaSeleccionada = {},
    operacionSeleccionada = {};
var operaciones = [{
  valor: "Asignar Valor Único"
}, {
  valor: "Asignar Valor Único Si"
}, {
  valor: "Asignar Valor Multiples"
}, {
  valor: "Asignar Valor Multiples Si"
}, {
  valor: "Contar"
}, {
  valor: "Contar Si"
}];
var operacionesNumero = [{
  valor: "Asignar Valor Único"
}, {
  valor: "Asignar Valor Único Si"
}, {
  valor: "Asignar Valor Multiples"
}, {
  valor: "Asignar Valor Multiples Si"
}, {
  valor: "Contar"
}, {
  valor: "Contar Si"
}, {
  valor: "Calcular Promedio"
}, {
  valor: "Máximo"
}, {
  valor: "Mínimo"
}, {
  valor: "Sumar"
}];
var operacionesFecha = [{
  valor: "Asignar Valor Único"
}, {
  valor: "Asignar Valor Único Si"
}, {
  valor: "Asignar Valor Multiples"
}, {
  valor: "Asignar Valor Multiples Si"
}, {
  valor: "Contar"
}, {
  valor: "Contar Si"
}];
var operacionesBoolean = [{
  valor: "Asignar Valor Único"
}, {
  valor: "Asignar Valor Único Si"
}, {
  valor: "Asignar Valor Multiples"
}, {
  valor: "Asignar Valor Multiples Si"
}, {
  valor: "Contar"
}, {
  valor: "Contar Si"
}];
var operacionesCadena = [{
  valor: "Asignar Valor Único"
}, {
  valor: "Asignar Valor Único Si"
}, {
  valor: "Asignar Valor Multiples"
}, {
  valor: "Asignar Valor Multiples Si"
}, {
  valor: "Contar"
}, {
  valor: "Contar Si"
}, {
  valor: "Sumar"
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
      atributos: _this.props.atributos,
      mostrarEsObjeto: true,
      titulo: "Valores Multiples",
      tipoVariable: '',
      operaciones: operacionesCadena,
      reglas: []
    };
    _this.crearAtributoFuenteDatos = _this.crearAtributoFuenteDatos.bind(_assertThisInitialized(_this));
    _this.crearFuenteDato = _this.crearFuenteDato.bind(_assertThisInitialized(_this));
    _this.existeReglaAsignacion = _this.existeReglaAsignacion.bind(_assertThisInitialized(_this));
    _this.retornarCodigoOperacion = _this.retornarCodigoOperacion.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionCampo = _this.retornoSeleccionCampo.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionOperacion = _this.retornoSeleccionOperacion.bind(_assertThisInitialized(_this));
    _this.cambioAObjeto = _this.cambioAObjeto.bind(_assertThisInitialized(_this));
    _this.cambiarTitulo = _this.cambiarTitulo.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FuenteDatoVariable, [{
    key: "crearAtributoFuenteDatos",
    value: function crearAtributoFuenteDatos() {
      var nombre = $("#nombreFuenteDato").val();
      var esObjeto;
      if ($("#esObjetoFuenteDato").is(':checked')) esObjeto = true;else esObjeto = false;
      var nombreAtributo = nombre;

      if (esObjeto) {
        nombreAtributo = $("#nombreAtributo").val();
      }

      var formula = this.retornarCodigoOperacion(operacionSeleccionada.valor) + "(" + columnaSeleccionada.valor + ")";

      if (nombreAtributo.length > 0) {
        if (formula.length > 0) {} else {
          alert("Ingrese un valor para el nombre del atributo.");
        }
      } else {
        alert("Ingrese un valor para el nombre del atributo.");
      }

      var fuenteDatoAtributo = {
        nombre: nombreAtributo,
        tipo: this.state.tipoVariable,
        formula: formula
      };

      var copiaAntigua = _toConsumableArray(this.state.atributos);

      copiaAntigua.push(fuenteDatoAtributo);
      this.setState({
        atributos: copiaAntigua
      }, console.log(this.state.atributos));
    }
  }, {
    key: "crearFuenteDato",
    value: function crearFuenteDato() {
      if (columnaSeleccionada.valor != undefined) {
        //if(columnaSeleccionada.valor != undefined) {
        if (operacionSeleccionada.valor != undefined) {
          //if(operacionSeleccionada.valor != undefined) {
          if (operacionSeleccionada.valor.localeCompare("Asignar Valor Único Si") != 0 && operacionSeleccionada.valor.localeCompare("Asignar Valor Multiples Si") != 0 && operacionSeleccionada.valor.localeCompare("Contar Si") != 0) {
            if (this.state.reglas.length > 0) {
              //no existe ninguna regla
              if (this.existeReglaAsignacion()) {
                //no existe ni regla de asignacion
                var nombre = $("#nombreFuenteDato").val();
                var descripcion = $("#descripcionFuenteDato").val();
                var esObjeto;
                if ($("#esObjetoFuenteDato").is(':checked')) esObjeto = true;else esObjeto = false;
                var objetoPadreID = -1;
                if (!this.state.mostrarEsObjeto) objetoPadreID = $("#objetoPadreID").val();
                var guardar;
                if ($("#guardarFuenteDato").is(':checked')) guardar = true;else guardar = false; //var formula = this.retornarCodigoOperacion(operacionSeleccionada.valor) + "(" + columnaSeleccionada.valor + ")";

                var fuenteDato = {
                  nombre: nombre,
                  descripcion: descripcion,
                  esObjeto: esObjeto,
                  objetoPadreID: objetoPadreID,
                  guardar: guardar
                };
                var regla = {
                  reglaPadreID: -1,
                  variablePadreID: -1,
                  esFuenteDato: true,
                  operacion: operacionSeleccionada.valor,
                  valor: '',
                  nivel: 0,
                  orden: 0
                };
                /*console.log('this.props.idTablaSeleccionada');
                console.log(this.props.idTablaSeleccionada);
                console.log('nombre');
                console.log(nombre);
                console.log('tipo');
                console.log(tipo);
                console.log('guardar');
                console.log(guardar);
                console.log('formula');
                console.log(formula);*/
              } else {
                alert("Tiene que crear por lo menos una regla de asignacion.");
              }
            } else {
              alert("Tiene que crear por lo menos una regla.");
            }
          } else if (operacionSeleccionada.valor.localeCompare("Asignar Si Único Si") == 0) {//
          }
        } else {
          alert("Seleccione una operación de la tabla.");
        }
      } else {
        alert("Seleccione una columna de la tabla.");
      }
    }
  }, {
    key: "existeReglaAsignacion",
    value: function existeReglaAsignacion() {
      for (var i = 0; i < this.state.reglas.length; i++) {
        if (this.state.reglas[i].operacion.localeCompare("Asignar Valor Único") == 0 || this.state.reglas[i].operacion.localeCompare("Asignar Valor Único Si") == 0 || this.state.reglas[i].operacion.localeCompare("Asignar Valor Multiples") == 0 || this.state.reglas[i].operacion.localeCompare("Asignar Valor Multiples Si") == 0 || this.state.reglas[i].operacion.localeCompare("Contar") == 0 || this.state.reglas[i].operacion.localeCompare("Contar Si") == 0 || this.state.reglas[i].operacion.localeCompare("Calcular Promedio") == 0 || this.state.reglas[i].operacion.localeCompare("Máximo") == 0 || this.state.reglas[i].operacion.localeCompare("Mínimo") == 0 || this.state.reglas[i].operacion.localeCompare("Sumar") == 0) {
          return true;
        }
      }

      ;
      return false;
    }
  }, {
    key: "retornarCodigoOperacion",
    value: function retornarCodigoOperacion(codigo) {
      if (codigo.localeCompare("Asignar Valor Único") == 0) {
        return "ASIGUNI";
      }

      if (codigo.localeCompare("Asignar Valor Único Si") == 0) {
        return "ASIGUNI";
      }

      if (codigo.localeCompare("Asignar Valor Multiples") == 0) {
        return "ASIGMUL";
      }

      if (codigo.localeCompare("Asignar Valor Multiples Si") == 0) {
        return "ASIGMUL";
      }

      if (codigo.localeCompare("Contar") == 0) {
        return "COUNT";
      }

      if (codigo.localeCompare("Contar Si") == 0) {
        return "COUNT";
      }

      if (codigo.localeCompare("Calcular Promedio") == 0) {
        return "PROM";
      }

      if (codigo.localeCompare("Máximo") == 0) {
        return "MAX";
      }

      if (codigo.localeCompare("Mínimo") == 0) {
        return "MIN";
      }

      if (codigo.localeCompare("Sumar") == 0) {
        return "SUM";
      }
    }
  }, {
    key: "retornoSeleccionCampo",
    value: function retornoSeleccionCampo(variable) {
      columnaSeleccionada = {}; //fuenteDatoAtributo.columnaSeleccionada = {};

      if (variable[0].valor.length > 0) {
        columnaSeleccionada = variable[0]; //fuenteDatoAtributo.columnaSeleccionada = variable[0];

        var tipoVariable = '';

        if (columnaSeleccionada.tipo.localeCompare("int") == 0 || columnaSeleccionada.tipo.localeCompare("decimal") == 0) {
          tipoVariable = 'Número';
          this.setState({
            operaciones: operacionesNumero,
            tipoVariable: tipoVariable
          });
        } else if (columnaSeleccionada.tipo.localeCompare("varchar") == 0) {
          tipoVariable = 'Cadena';
          this.setState({
            operaciones: operacionesCadena,
            tipoVariable: tipoVariable
          });
        } else if (columnaSeleccionada.tipo.localeCompare("date") == 0) {
          tipoVariable = 'Fecha';
          this.setState({
            operaciones: operacionesFecha,
            tipoVariable: tipoVariable
          });
        } else if (columnaSeleccionada.tipo.localeCompare("bit") == 0) {
          tipoVariable = 'Booleano';
          this.setState({
            operaciones: operacionesBoolean,
            tipoVariable: tipoVariable
          });
        }
        /*this.setState({
            tipoVariable: tipoVariable
        });*/

      }
    }
  }, {
    key: "retornoSeleccionOperacion",
    value: function retornoSeleccionOperacion(operacion) {
      operacionSeleccionada = {}; //fuenteDatoAtributo.operacionSeleccionada = {};

      if (operacion[0].valor.length > 0) {
        operacionSeleccionada = operacion[0]; //fuenteDatoAtributo.operacionSeleccionada = operacion[0];
      }
    }
  }, {
    key: "cambioAObjeto",
    value: function cambioAObjeto() {
      this.setState({
        mostrarEsObjeto: !this.state.mostrarEsObjeto,
        tipoVariable: ''
      }, this.cambiarTitulo);
    }
  }, {
    key: "cambiarTitulo",
    value: function cambiarTitulo() {
      if (this.state.mostrarEsObjeto) {
        this.setState({
          titulo: "Valores Multiples"
        });
      } else {
        this.setState({
          titulo: "Valor Único"
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "nombreFuenteDato",
        className: "col-form-label"
      }, "Nombre Fuente de Dato (Variable Origen)")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("input", {
        id: "nombreFuenteDato",
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
        htmlFor: "esObjetoFuenteDato",
        className: "col-form-label"
      }, "Tiene m\xE1s de un atributo / propiedad:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "switch-button-variable switch-button-yesno",
        style: {
          margin: "0 auto",
          display: "block"
        }
      }, _react["default"].createElement("input", {
        type: "checkbox",
        defaultChecked: true,
        name: "esObjetoFuenteDato",
        id: "esObjetoFuenteDato",
        onClick: this.cambioAObjeto
      }), _react["default"].createElement("span", null, _react["default"].createElement("label", {
        htmlFor: "esObjetoFuenteDato"
      }))))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "guardarFuenteDato",
        className: "col-form-label"
      }, "Guardar Valores Obtenidos en Base de Datos")), _react["default"].createElement("div", {
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
          display: this.state.mostrarEsObjeto ? "none" : ""
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
      }, _react["default"].createElement(_CrearFuenteDatosAtributos["default"], {
        atributos: this.state.atributos,
        campos: this.props.campos,
        titulo: this.state.titulo,
        mostrarEsObjeto: this.state.mostrarEsObjeto,
        clickEnVariable: this.retornoSeleccionCampo,
        clickEnOperacion: this.retornoSeleccionOperacion,
        tipoVariable: this.state.tipoVariable,
        operaciones: this.state.operaciones,
        crearAtributoFuenteDatos: this.crearAtributoFuenteDatos,
        goToCreateConditions: this.props.goToCreateConditions
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
        onClick: this.crearFuenteDato
      }, "Crear Fuente de Dato")), _react["default"].createElement("br", null));
    }
  }]);

  return FuenteDatoVariable;
}(_react["default"].Component);

exports["default"] = FuenteDatoVariable;
//# sourceMappingURL=FuenteDatoVariable.js.map
