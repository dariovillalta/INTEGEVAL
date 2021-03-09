"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ListasSeleVariable = _interopRequireDefault(require("../../../ListasSeleVariable.js"));

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

var variables = [{
  nombre: "sucursalesTotales"
}, {
  nombre: "numSocios"
}, {
  nombre: "utilidad"
}, {
  nombre: "patrimonio"
}];
var operaciones = [{
  valor: "Asignar"
}, {
  valor: "Asignar Si"
}, {
  valor: "Contar"
}, {
  valor: "Contar Si"
}];
var columnaSeleccionada = [],
    operacionSeleccionada = [];

var EditarFuenteDatosAtributos =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EditarFuenteDatosAtributos, _React$Component);

  function EditarFuenteDatosAtributos(props) {
    var _this;

    _classCallCheck(this, EditarFuenteDatosAtributos);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditarFuenteDatosAtributos).call(this, props));
    _this.crearAtributoDeObjeto = _this.crearAtributoDeObjeto.bind(_assertThisInitialized(_this));
    _this.actualizarSeleccionColumna = _this.actualizarSeleccionColumna.bind(_assertThisInitialized(_this));
    _this.actualizarSeleccionOperacion = _this.actualizarSeleccionOperacion.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(EditarFuenteDatosAtributos, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "crearAtributoDeObjeto",
    value: function crearAtributoDeObjeto() {//
    }
  }, {
    key: "actualizarSeleccionColumna",
    value: function actualizarSeleccionColumna(columna) {
      columnaSeleccionada = columna;
      console.log('columnaSeleccionada');
      console.log(columnaSeleccionada);
      console.log('operacionSeleccionada');
      console.log(operacionSeleccionada);
    }
  }, {
    key: "actualizarSeleccionOperacion",
    value: function actualizarSeleccionOperacion(operacion) {
      operacionSeleccionada = operacion;
      console.log('columnaSeleccionada');
      console.log(columnaSeleccionada);
      console.log('operacionSeleccionada');
      console.log(operacionSeleccionada);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement("div", {
        style: {
          width: "100%",
          padding: "2%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "2em",
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 " + (this.props.mostrarEsObjeto ? "onHoverOpcionUmbralSinCursor" : "onHoverOpcionUmbralSinCursorGris"),
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRight: "1px solid #e6e6f2",
          borderBottom: "1px solid #e6e6f2"
        }
      }, this.props.titulo)), _react["default"].createElement("br", null), !this.props.mostrarEsObjeto ? _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%",
          height: "150px"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "listas",
        className: "col-form-label"
      }, "Columna de tabla")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement(_ListasSeleVariable["default"], {
        mostrarRosa: true,
        variables: this.props.campos,
        seleccionarMultiple: false,
        retornoSeleccion: this.actualizarSeleccionColumna,
        titulo: "Columnas"
      }))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%",
          height: "150px"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "listas",
        className: "col-form-label"
      }, "Operaci\xF3n")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement(_ListasSeleVariable["default"], {
        mostrarRosa: false,
        variables: operaciones,
        seleccionarMultiple: false,
        retornoSeleccion: this.actualizarSeleccionOperacion,
        titulo: "Operaciones"
      }))), _react["default"].createElement("a", {
        className: "btn btn-success btn-block btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: this.props.showCondicionVar
      }, "Condiciones para el C\xE1lculo"))) : _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"
      }, _react["default"].createElement("label", {
        htmlFor: "nombreAtributo",
        className: "col-form-label"
      }, "Nombre de Atributo:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"
      }, _react["default"].createElement("input", {
        id: "nombreAtributo",
        type: "text",
        className: "form-control form-control-sm"
      }))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%",
          height: "150px"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "listas",
        className: "col-form-label"
      }, "Columna de tabla")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement(_ListasSeleVariable["default"], {
        mostrarRosa: true,
        variables: this.props.campos,
        seleccionarMultiple: false,
        retornoSeleccion: this.actualizarSeleccionColumna,
        titulo: "Columnas"
      }))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%",
          height: "150px"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "listas",
        className: "col-form-label"
      }, "Operaci\xF3n")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement(_ListasSeleVariable["default"], {
        mostrarRosa: false,
        variables: operaciones,
        seleccionarMultiple: false,
        retornoSeleccion: this.actualizarSeleccionOperacion,
        titulo: "Operaciones"
      })))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("a", {
        className: "btn btn-primary btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: this.crearAtributoDeObjeto
      }, "Crear")), _react["default"].createElement("hr", null), this.props.atributos.map(function (campo, i) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%"
          },
          key: campo.ID
        }, _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"
        }, _react["default"].createElement("label", {
          htmlFor: "inputSmall",
          className: "col-form-label",
          defaultValue: campo.nombre
        }, "Nombre de Atributo:")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"
        }, _react["default"].createElement("input", {
          id: "inputSmall",
          type: "text",
          className: "form-control form-control-sm"
        }))), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%",
            height: "150px"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "listas",
          className: "col-form-label"
        }, "Columna de tabla")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement(_ListasSeleVariable["default"], {
          mostrarRosa: true,
          variables: _this2.props.campos,
          seleccionarMultiple: false,
          retornoSeleccion: _this2.actualizarSeleccionColumna,
          titulo: "Columnas"
        }))), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%",
            height: "150px"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "listas",
          className: "col-form-label"
        }, "Operaci\xF3n")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement(_ListasSeleVariable["default"], {
          mostrarRosa: false,
          variables: operaciones,
          seleccionarMultiple: false,
          retornoSeleccion: _this2.actualizarSeleccionOperacion,
          titulo: "Operaciones"
        }))), _react["default"].createElement("a", {
          className: "btn btn-success btn-block btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: _this2.props.showCondicionVar
        }, "Condiciones para el C\xE1lculo"), _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "row",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("a", {
          className: "btn btn-primary btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: _this2.crearAtributoDeObjeto
        }, "Guardar")), _react["default"].createElement("hr", null));
      }))));
    }
  }]);

  return EditarFuenteDatosAtributos;
}(_react["default"].Component);

exports["default"] = EditarFuenteDatosAtributos;
//# sourceMappingURL=EditarFuenteDatosAtributos.js.map
