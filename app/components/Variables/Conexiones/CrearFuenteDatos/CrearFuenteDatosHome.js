"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _CrearFuenteDatos = _interopRequireDefault(require("./CrearFuenteDatos.js"));

var _InstruccionVariable = _interopRequireDefault(require("../../../InstruccionVariable.js"));

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

var campo;
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

var CrearFuenteDatosHome =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CrearFuenteDatosHome, _React$Component);

  function CrearFuenteDatosHome(props) {
    var _this;

    _classCallCheck(this, CrearFuenteDatosHome);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CrearFuenteDatosHome).call(this, props));
    _this.state = {
      componenteActual: 'crearFuente',
      atributos: [],
      reglas: [[{
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
      }]],
      formulas: [],
      indiceSeleccionado: -1,
      tipoIndiceSeleccionado: '',
      //esOtraRegla, arriba, abajo
      posicionNuevoAtributo: 0,
      //posicion del arreglo donde se debe insertar el siguiente atributo / campo /  columna (para controlar cuando se agrega condiciones / instrucciones a un nuevo atributo)
      esCondicion: true,
      //bandera para estado de nueva regla / instruccion, saber si es nueva comparacion o asignacion
      navbar: ""
    };
    _this.loadRules = _this.loadRules.bind(_assertThisInitialized(_this));
    _this.sortRules = _this.sortRules.bind(_assertThisInitialized(_this));
    _this.returnToCreateDataSource = _this.returnToCreateDataSource.bind(_assertThisInitialized(_this));
    _this.goToCreateConditions = _this.goToCreateConditions.bind(_assertThisInitialized(_this));
    _this.createDataSource = _this.createDataSource.bind(_assertThisInitialized(_this));
    _this.getDataSourceID = _this.getDataSourceID.bind(_assertThisInitialized(_this));
    _this.retornarCampo = _this.retornarCampo.bind(_assertThisInitialized(_this));
    _this.actualizarIndiceSeleccionado = _this.actualizarIndiceSeleccionado.bind(_assertThisInitialized(_this));
    _this.actualizarIndiceSeleccionadoIrCondicionesNuevoAtributo = _this.actualizarIndiceSeleccionadoIrCondicionesNuevoAtributo.bind(_assertThisInitialized(_this));
    _this.actualizarCondicion = _this.actualizarCondicion(_assertThisInitialized(_this));
    _this.anadirAtributo = _this.anadirAtributo.bind(_assertThisInitialized(_this));
    _this.anadirRegla = _this.anadirRegla.bind(_assertThisInitialized(_this));
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
    key: "returnToCreateDataSource",
    value: function returnToCreateDataSource() {
      this.setState({
        componenteActual: "crearFuente"
      });
    }
  }, {
    key: "goToCreateConditions",
    value: function goToCreateConditions() {
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
      }, "Tipo de Variable")), _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.retornoSeleccionTabla
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Tablas")), _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.retornoSeleccionFuenteDatos
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Fuentes de Datos")), _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.returnToCreateDataSource
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Crear Fuente de Datos")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Condiciones")))))));

      this.setState({
        componenteActual: "fuenteCondiciones",
        navbar: navbar
      });
    }
  }, {
    key: "createDataSource",
    value: function createDataSource(fuenteDato, atributoFuenteDato) {
      var _this2 = this;

      //validaciones existe por lo menos regla asignar
      var transaction = new sql.Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new sql.Request(transaction);
        request.query("insert into FuenteDatos (tablaID, nombre, descripcion, esObjeto, guardar, nivel) values (" + _this2.props.idTablaSeleccionada + ", '" + fuenteDato.nombre + "', '" + fuenteDato.descripcion + "', '" + fuenteDato.esObjeto + "', " + fuenteDato.objetoPadreID + ", '" + fuenteDato.guardar + "', 0)", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.props.getDataSourceID(atributoFuenteDato);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getDataSourceID",
    value: function getDataSourceID(fuenteDato, atributoFuenteDato) {
      var _this3 = this;

      //validaciones existe por lo menos regla asignar
      var transaction = new sql.Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new sql.Request(transaction);
        request.query("insert into Campos (tablaID, nombre, tipo, guardar, formula, nivel) values (" + _this3.props.idTablaSeleccionada + ", '" + nombre + "', '" + tipo + "', '" + guardar + "', '" + formula + "', " + nivel + ")", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this3.props.terminoCrearCampo(nombre);
            });
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
    key: "actualizarIndiceSeleccionado",
    value: function actualizarIndiceSeleccionado(indice, tipoIndice) {
      this.setState({
        indiceSeleccionado: indice,
        tipoIndiceSeleccionado: tipoIndice
      });
    }
  }, {
    key: "actualizarIndiceSeleccionadoIrCondicionesNuevoAtributo",
    value: function actualizarIndiceSeleccionadoIrCondicionesNuevoAtributo() {
      this.setState({
        indiceSeleccionado: -1,
        tipoIndiceSeleccionado: ''
      }, this.props.showCondicionVar);
    }
  }, {
    key: "actualizarCondicion",
    value: function actualizarCondicion(esCondicion) {
      this.setState({
        esCondicion: esCondicion
      });
    }
  }, {
    key: "anadirAtributo",
    value: function anadirAtributo() {
      var nombreAtributo = $("#nombreAtributo").val(); //si no existen condiciones creadas, que se cree un arreglo vacio

      if (this.state.reglas[this.state.posicionNuevoAtributo] == undefined) {
        var tempCopyRules = _toConsumableArray(this.state.reglas);

        tempCopyRules.push([]);
        this.setState({
          reglas: tempCopyRules
        });
      } //si no existen formulas creadas, que se cree un arreglo vacio


      if (this.state.formula[this.state.posicionNuevoAtributo] == undefined) {
        var tempCopyFormulas = _toConsumableArray(this.state.formula);

        tempCopyFormulas.push([]);
        this.setState({
          formula: tempCopyFormulas
        });
      }

      var nuevoAtributo; //si la formula ya fue asignada, no agregar tipo

      if (this.state.atributos[this.state.posicionNuevoAtributo] == undefined) {
        nuevoAtributo = {
          nombre: nombreAtributo,
          tipo: ''
        };
      } else {
        nuevoAtributo = this.state.atributos[this.state.posicionNuevoAtributo];
        nuevoAtributo.nombre = nombreAtributo;
      }

      var tempCopy = _toConsumableArray(this.state.atributos);

      tempCopy.push(nuevoAtributo);
      this.setState({
        atributos: tempCopy
      });
    }
  }, {
    key: "anadirRegla",
    value: function anadirRegla() {
      //si se agrega una formula/asignacion, todas las otras formulas tienen que ser del mismo tipo para esa variable
      //si el indiceSeleccionado es igual a -1, se llamo desde nuevo atributo
      //sino, modificar elemento seleccionado
      //primer if: ver el estado de donde fue llamado el metodo
      if (this.state.esCondicion) {//
      } else {//
        }

      if (this.state.indiceSeleccionado != -1 || this.state.indiceSeleccionado == -1 && this.state.reglas.length == 0) {
        var operacion = $("input[name='operacionRadio']:checked").val();
        var valor = $("#valor").val();
        console.log('operacion');
        console.log(operacion);
        console.log('valor');
        console.log(valor);
        console.log('campo');
        console.log(campo);
        var posicionAInsertar = -1;

        if (this.state.indiceSeleccionado != -1) {
          posicionAInsertar = this.state.indiceSeleccionado;
        }

        var copiaAntiguaReglas = _toConsumableArray(this.state.reglas);

        var nuevaRegla = {
          campo: campo.valor,
          operacion: operacion,
          valor: valor,
          texto: "TEXTO",
          reglaPadreID: -1,
          nivel: 1
        };

        if (posicionAInsertar != -1) {
          copiaAntiguaReglas.push(nuevaRegla);
        } else {
          if (this.state.tipoIndiceSeleccionado.localeCompare("esOtraRegla") == 0) {
            var variablePadre = this.state.reglas[posicionAInsertar];
            nuevaRegla.reglaPadreID = variablePadre.ID;
            nuevaRegla.nivel = variablePadre.nivel + 1;
            var tempCopy;
            this.actualizarNivelReglas(nuevaRegla, posicionInsertarNuevo);
          }

          if (this.state.tipoIndiceSeleccionado.localeCompare("arriba") == 0) {}
        }
      } else {
        alert("Seleccione una posición para agregar una nueva instrucción");
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.componenteActual.localeCompare("crearFuente") == 0) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }, _react["default"].createElement(_CrearFuenteDatos["default"], {
          pool: this.props.pool,
          showCondicionVar: this.actualizarIndiceSeleccionadoIrCondicionesNuevoAtributo,
          terminoCrearCampo: this.props.terminoCrearCampo,
          idTablaSeleccionada: this.props.idTablaSeleccionada,
          columnas: this.props.columnas,
          atributos: this.state.atributos,
          configuracionHome: this.props.configuracionHome,
          goOptions: this.props.goOptions,
          retornoSeleccionTabla: this.props.retornoSeleccionTabla,
          retornoSeleccionFuenteDatos: this.props.retornoSeleccionFuenteDatos,
          goToCreateConditions: this.goToCreateConditions
        }));
      } else if (this.state.componenteActual.localeCompare("fuenteCondiciones") == 0) {
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
          callbackCrearRegla: this.anadirRegla,
          retornarIndiceSeleccionado: this.actualizarIndiceSeleccionado,
          retornarEstadoVistaEsCondicion: this.actualizarCondicion,
          reglas: this.state.reglas[this.state.indiceSeleccionado] != undefined ? this.state.reglas[this.state.indiceSeleccionado] : [],
          navbar: this.state.navbar,
          configuracionHome: this.props.configuracionHome,
          goOptions: this.props.goOptions,
          retornoSeleccionTabla: this.props.retornoSeleccionTabla,
          retornoSeleccionFuenteDatos: this.props.retornoSeleccionFuenteDatos
        }));
      }
    }
  }]);

  return CrearFuenteDatosHome;
}(_react["default"].Component);

exports["default"] = CrearFuenteDatosHome;
//# sourceMappingURL=CrearFuenteDatosHome.js.map
