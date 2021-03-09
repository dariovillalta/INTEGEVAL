"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _Accordion = _interopRequireDefault(require("../../Accordion/Accordion.js"));

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

var colores = ["secondary", "success", "primary", "brand"];
var banderaConseguirCategoriasVariablesINICIO = 0,
    banderaConseguirCategoriasVariablesFIN = 2;
var variables = [],
    excel = [],
    formas = [];

var SeleccionarVariable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SeleccionarVariable, _React$Component);

  function SeleccionarVariable(props) {
    var _this;

    _classCallCheck(this, SeleccionarVariable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SeleccionarVariable).call(this, props));
    _this.state = {
      accordions: []
    };
    _this.getVariables = _this.getVariables.bind(_assertThisInitialized(_this));
    _this.getExcel = _this.getExcel.bind(_assertThisInitialized(_this));
    _this.getExcelVariables = _this.getExcelVariables.bind(_assertThisInitialized(_this));
    _this.getFormas = _this.getFormas.bind(_assertThisInitialized(_this));
    _this.checkEndImportingVariables = _this.checkEndImportingVariables.bind(_assertThisInitialized(_this));
    _this.createAccordionArray = _this.createAccordionArray.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SeleccionarVariable, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      variables = [];
      excel = [];
      formas = [];
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      banderaConseguirCategoriasVariablesINICIO = 0;
      banderaConseguirCategoriasVariablesFIN = 2;
      this.getVariables();
      this.getExcel();
      this.getFormas();
    }
  }, {
    key: "getVariables",
    value: function getVariables() {
      var _this2 = this;

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
              var arreglo = [];

              for (var i = 0; i < result.recordset.length; i++) {
                var copyVar = jQuery.extend(true, {}, result.recordset[i]);
                copyVar.tipo = 'variable';
                arreglo.push(copyVar);
              }

              ;
              banderaConseguirCategoriasVariablesINICIO++;
              variables = arreglo;
              /*this.setState({
                  variables: arreglo
              });*/

              _this2.checkEndImportingVariables();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getExcel",
    value: function getExcel() {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ExcelArchivos", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var arreglo = [];

              for (var i = 0; i < result.recordset.length; i++) {
                var copyVar = jQuery.extend(true, {}, result.recordset[i]);
                copyVar.tipo = 'excel';
                copyVar.variablesExcel = [];
                arreglo.push(copyVar);
              }

              ;
              excel = arreglo;

              for (var i = 0; i < excel.length; i++) {
                banderaConseguirCategoriasVariablesFIN++;

                _this3.getExcelVariables(excel[i].ID, i);
              }

              ;
              /*this.setState({
                  excel: arreglo
              });*/
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getExcelVariables",
    value: function getExcelVariables(archivoID, posArchivo) {
      var _this4 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ExcelVariables where excelArchivoID = " + archivoID, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var arreglo = [];

              for (var i = 0; i < result.recordset.length; i++) {
                var copyVar = jQuery.extend(true, {}, result.recordset[i]);
                copyVar.tipo = 'excel';
                arreglo.push(copyVar);
              }

              ;
              banderaConseguirCategoriasVariablesINICIO++;
              excel[posArchivo].variablesExcel = arreglo;
              /*this.setState({
                  excel: arreglo
              });*/

              _this4.checkEndImportingVariables();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getFormas",
    value: function getFormas() {
      var _this5 = this;

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
              var arreglo = [];

              for (var i = 0; i < result.recordset.length; i++) {
                var copyVar = jQuery.extend(true, {}, result.recordset[i]);
                copyVar.tipo = 'forma';
                arreglo.push(copyVar);
              }

              ;
              banderaConseguirCategoriasVariablesINICIO++;
              formas = arreglo;
              /*this.setState({
                  formas: arreglo
              });*/

              _this5.checkEndImportingVariables();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "checkEndImportingVariables",
    value: function checkEndImportingVariables() {
      if (banderaConseguirCategoriasVariablesINICIO === banderaConseguirCategoriasVariablesFIN) {
        this.createAccordionArray();
      }
    }
  }, {
    key: "createAccordionArray",
    value: function createAccordionArray() {
      var arregloAccordion = [],
          arregloAccordionSinCategoria = {
        titulo: "Sin Categoria",
        variables: []
      };
      var insertoVar = false,
          insertoExc = false,
          insertoFor = false;

      for (var i = 0; i < variables.length; i++) {
        var insertoVar = false;

        for (var m = 0; m < arregloAccordion.length; m++) {
          if (arregloAccordion[m].titulo.toLowerCase().localeCompare(variables[i].categoriaVariable.toLowerCase()) === 0) {
            var copyVar = jQuery.extend(true, {}, variables[i]);
            arregloAccordion[m].variables.push(copyVar);
            insertoVar = true;
            break;
          }
        }

        ;

        if (!insertoVar && variables[i].categoriaVariable.length == 0) {
          arregloAccordionSinCategoria.variables.push(variables[i]);
        } else if (!insertoVar) {
          arregloAccordion.push({
            titulo: variables[i].categoriaVariable,
            variables: variables[i]
          });
        }
      }

      ;

      for (var i = 0; i < excel.length; i++) {
        for (var j = 0; j < excel[i].variablesExcel.length; j++) {
          var insertoExc = false;

          for (var m = 0; m < arregloAccordion.length; m++) {
            if (arregloAccordion[m].titulo.toLowerCase().localeCompare(excel[i].variablesExcel[j].categoriaVariable.toLowerCase()) === 0) {
              var copyVar = jQuery.extend(true, {}, excel[i].variablesExcel[j]);
              copyVar.ID = excel[i].ID;
              arregloAccordion[m].variables.push(copyVar);
              insertoExc = true;
              break;
            }
          }

          ;

          if (!insertoExc && excel[i].variablesExcel[j].categoriaVariable.length == 0) {
            var copyVar = jQuery.extend(true, {}, excel[i].variablesExcel[j]);
            copyVar.ID = excel[i].ID;
            arregloAccordionSinCategoria.variables.push(copyVar);
          } else if (!insertoExc) {
            var copyVar = jQuery.extend(true, {}, excel[i].variablesExcel[j]);
            copyVar.ID = excel[i].ID;
            arregloAccordion.push({
              titulo: excel[i].categoriaVariable,
              variables: copyVar
            });
          }
        }

        ;
      }

      ;

      for (var i = 0; i < formas.length; i++) {
        var insertoFor = false;

        for (var m = 0; m < arregloAccordion.length; m++) {
          if (arregloAccordion[m].titulo.toLowerCase().localeCompare(formas[i].categoriaVariable.toLowerCase()) === 0) {
            var copyVar = jQuery.extend(true, {}, formas[i]);
            arregloAccordion[m].formas.push(copyVar);
            insertoFor = true;
            break;
          }
        }

        ;

        if (!insertoFor && variables[i].categoriaVariable.length == 0) {
          arregloAccordionSinCategoria.variables.push(formas[i]);
        } else if (!insertoFor) {
          arregloAccordion.push({
            titulo: formas[i].categoriaVariable,
            variables: formas[i]
          });
        }
      }

      ;
      if (arregloAccordionSinCategoria.variables.length > 0) arregloAccordion.push(arregloAccordionSinCategoria);
      this.setState({
        accordions: arregloAccordion
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Seleccionar Variable"), _react["default"].createElement("div", {
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
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Variables"))))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("a", {
        className: "btn btn-success btn-block btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: this.props.crearVariables
      }, "Crear Variable")), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, this.state.accordions.map(function (accordion, i) {
        return _react["default"].createElement("div", {
          key: accordion.titulo
        }, _react["default"].createElement(_Accordion["default"], {
          showTrash: false,
          showEdit: false,
          allowMultipleOpen: true,
          color: "#ffffff"
        }, _react["default"].createElement("div", {
          label: accordion.titulo
        }, _react["default"].createElement("div", null, accordion.variables.map(function (variable, j) {
          return _react["default"].createElement("a", {
            onClick: function onClick() {
              return _this6.props.editarVariable(variable.ID, variable.esObjeto, variable.esInstruccionSQL, variable.tipo);
            },
            style: {
              color: "#fafafa"
            },
            className: "btn btn-" + (j <= colores.length - 1 ? colores[j] : colores[j % colores.length]) + ' btn-block btnWhiteColorHover font-bold font-20',
            key: i + j
          }, variable.nombre);
        })))), _react["default"].createElement("br", null));
      }), this.state.accordions.length == 0 ? _react["default"].createElement("div", {
        className: "p-3 mb-2 bg-dark text-white font-bold font-20 text-center",
        style: {
          width: "100%"
        }
      }, "No existen variables creadas") : null)));
    }
  }]);

  return SeleccionarVariable;
}(_react["default"].Component);

exports["default"] = SeleccionarVariable;
//# sourceMappingURL=SeleccionarVariables.js.map
