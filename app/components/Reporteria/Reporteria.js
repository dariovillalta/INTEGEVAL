"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _xlsxStyle = _interopRequireDefault(require("xlsx-style"));

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
    _this.state = {//componenteActual: "importarResultados"
    };
    _this.styleDate = _this.styleDate.bind(_assertThisInitialized(_this));
    _this.creatingExcel = _this.creatingExcel.bind(_assertThisInitialized(_this));
    _this.toColumnName = _this.toColumnName.bind(_assertThisInitialized(_this));
    _this.espanol = _this.espanol.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Reporteria, [{
    key: "styleDate",
    value: function styleDate(date) {
      return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    }
  }, {
    key: "creatingExcel",
    value: function creatingExcel(variable, tipoVariable) {
      var longitudCeldas = variable.atributos.length;
      var altura = variable.resultados.length + 4;
      var workbook = {
        SheetNames: ["Libro1"],
        Sheets: {
          "Libro1": {
            "!merges": [],
            "!ref": "A1:" + this.toColumnName(longitudCeldas) + altura
          }
        }
      };
      var nombre;

      if (tipoVariable.localeCompare("Variable") == 0) {
        nombre = variable.nombreVariable;
      } else if (tipoVariable.localeCompare("Indicador") == 0) {
        nombre = variable.nombreIndicador;
      } else if (tipoVariable.localeCompare("Riesgo") == 0) {
        nombre = variable.nombreRiesgo;
      }

      workbook.Sheets.Libro1["A1"] = {
        v: "Reporte " + tipoVariable + ": " + nombre,
        s: {
          font: {
            color: {
              rgb: 'ffffff'
            },
            bold: true,
            sz: 20
          },
          fill: {
            patternType: "solid",
            bgColor: {
              rgb: "689f38"
            },
            fgColor: {
              rgb: "689f38"
            }
          },
          alignment: {
            horizontal: "center"
          }
        }
      };
      workbook.Sheets.Libro1["!merges"].push({
        s: {
          r: 0,
          c: 0
        },
        e: {
          r: 0,
          c: longitudCeldas - 1
        }
      }); //HORA DE CREACION

      var fechaDeCreacion = new Date();
      var txtFechaCreacion = "Hora y fecha de creacion: " + fechaDeCreacion.getHours() + ":" + fechaDeCreacion.getMinutes() + " - " + fechaDeCreacion.getDate() + " de " + this.espanol(fechaDeCreacion.getMonth()) + " " + fechaDeCreacion.getFullYear();
      workbook.Sheets.Libro1["A2"] = {
        v: txtFechaCreacion,
        s: {
          font: {
            color: {
              rgb: '000000'
            },
            sz: 14
          },
          alignment: {
            horizontal: "center"
          }
        }
      };
      workbook.Sheets.Libro1["!merges"].push({
        s: {
          r: 1,
          c: 0
        },
        e: {
          r: 1,
          c: longitudCeldas - 1
        }
      });

      for (var j = 0; j < variable.atributos.length; j++) {
        workbook.Sheets.Libro1[this.toColumnName(j + 1) + "4"] = {
          v: variable.atributos[j].nombre,
          s: {
            font: {
              color: {
                rgb: 'ffffff'
              },
              bold: true,
              sz: 15
            },
            fill: {
              patternType: "solid",
              bgColor: {
                rgb: "01579b"
              },
              fgColor: {
                rgb: "01579b"
              }
            },
            alignment: {
              horizontal: "center"
            }
          }
        };
      }

      ;

      for (var i = 0; i < variable.resultados.length; i++) {
        for (var j = 0; j < variable.atributos.length; j++) {
          if (variable.atributos[j].tipo.localeCompare("int") == 0 || variable.atributos[j].tipo.localeCompare("decimal") == 0) {
            workbook.Sheets.Libro1[this.toColumnName(j + 1) + (i + 5)] = {
              v: variable.resultados[i][variable.atributos[j].nombre],
              t: 'n',
              s: {
                font: {
                  color: {
                    rgb: '000'
                  },
                  bold: false,
                  sz: 13
                },
                alignment: {
                  horizontal: "center"
                }
              }
            };
          } else if (variable.atributos[j].tipo.localeCompare("date") == 0) {
            workbook.Sheets.Libro1[this.toColumnName(j + 1) + (i + 5)] = {
              v: variable.resultados[i][variable.atributos[j].nombre],
              t: 'd',
              s: {
                font: {
                  color: {
                    rgb: '000'
                  },
                  bold: false,
                  sz: 13
                },
                alignment: {
                  horizontal: "center"
                  /*,
                  numFmt: "m/dd/yy"*/

                }
              },
              z: 'd/m/yyyy'
            };
          } else if (variable.atributos[j].tipo.localeCompare("bit") == 0) {
            workbook.Sheets.Libro1[this.toColumnName(j + 1) + (i + 5)] = {
              v: variable.resultados[i][variable.atributos[j].nombre],
              t: 'b',
              s: {
                font: {
                  color: {
                    rgb: '000'
                  },
                  bold: false,
                  sz: 13
                },
                alignment: {
                  horizontal: "center"
                }
              }
            };
          } else if (variable.atributos[j].tipo.localeCompare("varchar") == 0) {
            workbook.Sheets.Libro1[this.toColumnName(j + 1) + (i + 5)] = {
              v: variable.resultados[i][variable.atributos[j].nombre],
              t: 's',
              s: {
                font: {
                  color: {
                    rgb: '000'
                  },
                  bold: false,
                  sz: 13
                },
                alignment: {
                  horizontal: "center"
                }
              }
            };
          }
        }

        ;
      }

      ; //DESCARGAR

      var wbout = _xlsxStyle["default"].write(workbook, {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
      });

      _xlsxStyle["default"].writeFile(workbook, "./Reporte.xlsx");

      console.log('workbook');
      console.log(workbook);
    }
  }, {
    key: "toColumnName",
    value: function toColumnName(num) {
      for (var ret = '', a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
        ret = String.fromCharCode(parseInt(num % b / a) + 65) + ret;
      }

      return ret;
    }
  }, {
    key: "espanol",
    value: function espanol(mes) {
      var mesEspanol = '';

      switch (mes) {
        case 0:
          mesEspanol = 'Enero';
          break;

        case 1:
          mesEspanol = 'Febrero';
          break;

        case 2:
          mesEspanol = 'Marzo';
          break;

        case 3:
          mesEspanol = 'Abril';
          break;

        case 4:
          mesEspanol = 'Mayo';
          break;

        case 5:
          mesEspanol = 'Junio';
          break;

        case 6:
          mesEspanol = 'Julio';
          break;

        case 7:
          mesEspanol = 'Agosto';
          break;

        case 8:
          mesEspanol = 'Septiembre';
          break;

        case 9:
          mesEspanol = 'Octubre';
          break;

        case 10:
          mesEspanol = 'Noviembre';
          break;

        case 11:
          mesEspanol = 'Diciembre';
          break;
      }

      return mesEspanol;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

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
      }, "Visualizar Variables"))))))), this.props.variables.length > 0 ? _react["default"].createElement("div", {
        style: {
          width: "100%",
          backgroundColor: "#a5d6a7",
          padding: "2% 0% 0% 0%",
          margin: "3% 0%"
        }
      }, _react["default"].createElement("div", {
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("p", {
        className: "lead display-6",
        style: {
          color: "white"
        }
      }, "Variables")), this.props.variables.map(function (variable, i) {
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
          onClick: function onClick() {
            return _this2.creatingExcel(variable, "Variable");
          },
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
      })) : null, this.props.indicadores.length > 0 ? _react["default"].createElement("div", {
        style: {
          width: "100%",
          backgroundColor: "#ffb74d",
          padding: "2% 0% 0% 0%",
          margin: "3% 0%"
        }
      }, _react["default"].createElement("div", {
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("p", {
        className: "lead display-6",
        style: {
          color: "white"
        }
      }, "Indicadores")), this.props.indicadores.map(function (indicador, i) {
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
          onClick: function onClick() {
            return _this2.creatingExcel(indicador, "Indicador");
          },
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
      })) : null, this.props.riesgos.length > 0 ? _react["default"].createElement("div", {
        style: {
          width: "100%",
          backgroundColor: "#d7ccc8",
          padding: "2% 0% 0% 0%",
          margin: "3% 0%"
        }
      }, _react["default"].createElement("div", {
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("p", {
        className: "lead display-6",
        style: {
          color: "white"
        }
      }, "Riesgos")), this.props.riesgos.map(function (riesgo, i) {
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
          onClick: function onClick() {
            return _this2.creatingExcel(riesgo, "Riesgo");
          },
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
      })) : null);
    }
  }]);

  return Reporteria;
}(_react["default"].Component);

exports["default"] = Reporteria;
//# sourceMappingURL=Reporteria.js.map
