"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

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

var Reporteria =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Reporteria, _React$Component);

  function Reporteria(props) {
    var _this;

    _classCallCheck(this, Reporteria);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Reporteria).call(this, props));
    _this.state = {} //componenteActual: "importarResultados"
    //this.goCreateFilters = this.goCreateFilters.bind(this);
    ;
    _this.styleDate = _this.styleDate.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Reporteria, [{
    key: "styleDate",
    value: function styleDate(date) {
      return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      console.log('this.props.variables');
      console.log(this.props.variables);
      return _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Visualizar Variables"), _react["default"].createElement("div", {
        className: "page-breadcrumb"
      }, _react["default"].createElement("nav", {
        "aria-label": "breadcrumb"
      }, _react["default"].createElement("ol", {
        className: "breadcrumb"
      }, _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.returnChooseDates
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Seleccionar Fechas")), _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.returnChooseFilter
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Crear Filtro")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Visualizar Variables"))))))), this.props.variables.map(function (variable, i) {
        return _react["default"].createElement("div", {
          key: variable.ID,
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12",
          style: {
            overflowX: "auto"
          }
        }, _react["default"].createElement("div", {
          className: "card",
          style: {
            display: "inline-block",
            minWidth: "100%"
          }
        }, _react["default"].createElement("h5", {
          style: {
            display: "inline",
            marginTop: "20px",
            marginLeft: "10px"
          }
        }, variable.nombreVariable), _react["default"].createElement("div", {
          style: {
            "float": "right"
          }
        }, _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-outline-light",
          style: {
            width: "80px",
            "float": "right",
            display: "inline"
          }
        }, "Excel"), _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-outline-light",
          style: {
            width: "80px",
            "float": "right",
            display: "inline"
          }
        }, "PDF")), _react["default"].createElement("table", {
          className: "table table-striped table-bordered"
        }, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
          scope: "col"
        }, "#"), variable.atributos.map(function (campo, j) {
          return _react["default"].createElement("th", {
            scope: "col",
            key: campo.nombre + "" + variable.ID
          }, campo.nombre.localeCompare("f3ch4Gu4rd4do") == 0 ? "Fecha Creación" : campo.nombre);
        }))), _react["default"].createElement("tbody", null, variable.resultados.map(function (resultado, j) {
          return _react["default"].createElement("tr", {
            key: variable.ID + "" + variable.ID + "" + resultado.ID
          }, _react["default"].createElement("th", {
            scope: "row"
          }, j + 1), variable.atributos.map(function (campo, k) {
            return _react["default"].createElement("td", {
              key: variable.ID + "" + resultado.ID + "" + campo.nombre
            }, campo.tipo.localeCompare("date") == 0 ? _react["default"].createElement("span", null, _this2.styleDate(resultado[campo.nombre])) : _react["default"].createElement("span", null, resultado[campo.nombre]));
          }));
        })))));
      }), this.props.indicadores.map(function (indicador, i) {
        return _react["default"].createElement("div", {
          key: indicador.ID,
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12",
          style: {
            overflowX: "auto"
          }
        }, _react["default"].createElement("div", {
          className: "card",
          style: {
            display: "inline-block",
            minWidth: "100%"
          }
        }, _react["default"].createElement("h5", {
          style: {
            display: "inline",
            marginTop: "20px",
            marginLeft: "10px"
          }
        }, indicador.nombreIndicador), _react["default"].createElement("div", {
          style: {
            "float": "right"
          }
        }, _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-outline-light",
          style: {
            width: "80px",
            "float": "right",
            display: "inline"
          }
        }, "Excel"), _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-outline-light",
          style: {
            width: "80px",
            "float": "right",
            display: "inline"
          }
        }, "PDF")), _react["default"].createElement("table", {
          className: "table table-striped table-bordered"
        }, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
          scope: "col"
        }, "#"), indicador.atributos.map(function (campo, j) {
          return _react["default"].createElement("th", {
            scope: "col",
            key: campo.nombre + "" + indicador.ID
          }, campo.nombre.localeCompare("f3ch4Gu4rd4do") == 0 ? "Fecha Creación" : campo.nombre);
        }))), _react["default"].createElement("tbody", null, indicador.resultados.map(function (resultado, j) {
          return _react["default"].createElement("tr", {
            key: indicador.ID + "" + indicador.ID + "" + resultado.ID
          }, _react["default"].createElement("th", {
            scope: "row"
          }, j + 1), indicador.atributos.map(function (campo, k) {
            return _react["default"].createElement("td", {
              key: indicador.ID + "" + resultado.ID + "" + campo.nombre
            }, campo.tipo.localeCompare("date") == 0 ? _react["default"].createElement("span", null, _this2.styleDate(resultado[campo.nombre])) : _react["default"].createElement("span", null, resultado[campo.nombre]));
          }));
        })))));
      }), this.props.riesgos.map(function (riesgo, i) {
        return _react["default"].createElement("div", {
          key: riesgo.ID,
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12",
          style: {
            overflowX: "auto"
          }
        }, _react["default"].createElement("div", {
          className: "card",
          style: {
            display: "inline-block",
            minWidth: "100%"
          }
        }, _react["default"].createElement("h5", {
          style: {
            display: "inline",
            marginTop: "20px",
            marginLeft: "10px"
          }
        }, riesgo.nombreRiesgo), _react["default"].createElement("div", {
          style: {
            "float": "right"
          }
        }, _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-outline-light",
          style: {
            width: "80px",
            "float": "right",
            display: "inline"
          }
        }, "Excel"), _react["default"].createElement("a", {
          href: "#",
          className: "btn btn-outline-light",
          style: {
            width: "80px",
            "float": "right",
            display: "inline"
          }
        }, "PDF")), _react["default"].createElement("table", {
          className: "table table-striped table-bordered"
        }, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
          scope: "col"
        }, "#"), riesgo.atributos.map(function (campo, j) {
          return _react["default"].createElement("th", {
            scope: "col",
            key: campo.nombre + "" + riesgo.ID
          }, campo.nombre.localeCompare("f3ch4Gu4rd4do") == 0 ? "Fecha Creación" : campo.nombre);
        }))), _react["default"].createElement("tbody", null, riesgo.resultados.map(function (resultado, j) {
          return _react["default"].createElement("tr", {
            key: riesgo.ID + "" + riesgo.ID + "" + resultado.ID
          }, _react["default"].createElement("th", {
            scope: "row"
          }, j + 1), riesgo.atributos.map(function (campo, k) {
            return _react["default"].createElement("td", {
              key: riesgo.ID + "" + resultado.ID + "" + campo.nombre
            }, campo.tipo.localeCompare("date") == 0 ? _react["default"].createElement("span", null, _this2.styleDate(resultado[campo.nombre])) : _react["default"].createElement("span", null, resultado[campo.nombre]));
          }));
        })))));
      }));
    }
  }]);

  return Reporteria;
}(_react["default"].Component);

exports["default"] = Reporteria;
//# sourceMappingURL=Reporteria.js.map
