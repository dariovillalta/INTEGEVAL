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

var colores = ["secondary", "success", "primary", "brand"];

var SeleccionarVariable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SeleccionarVariable, _React$Component);

  function SeleccionarVariable(props) {
    var _this;

    _classCallCheck(this, SeleccionarVariable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SeleccionarVariable).call(this, props));
    _this.state = {
      variables: [],
      excel: [],
      formas: []
    };
    _this.getVariables = _this.getVariables.bind(_assertThisInitialized(_this));
    _this.getExcel = _this.getExcel.bind(_assertThisInitialized(_this));
    _this.getFormas = _this.getFormas.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SeleccionarVariable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
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

              _this2.setState({
                variables: arreglo
              });
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
                arreglo.push(copyVar);
              }

              ;

              _this3.setState({
                excel: arreglo
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getFormas",
    value: function getFormas() {
      var _this4 = this;

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

              _this4.setState({
                formas: arreglo
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

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
      }, _react["default"].createElement("div", {
        className: "card influencer-profile-data"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        className: "row border-top border-bottom addPaddingToConfig"
      }, this.state.variables.map(function (variable, i) {
        return _react["default"].createElement("a", {
          onClick: function onClick() {
            return _this5.props.editarVariable(variable.ID, variable.esObjeto, variable.esInstruccionSQL, variable.tipo);
          },
          style: {
            color: "#fafafa"
          },
          className: "btn btn-" + (i <= colores.length - 1 ? colores[i] : colores[i % colores.length]) + ' btn-block btnWhiteColorHover font-bold font-20',
          key: variable.ID
        }, variable.nombre);
      }), this.state.excel.map(function (variable, i) {
        return _react["default"].createElement("a", {
          onClick: function onClick() {
            return _this5.props.editarVariable(variable.ID, variable.esObjeto, variable.esInstruccionSQL, variable.tipo);
          },
          style: {
            color: "#fafafa"
          },
          className: "btn btn-" + (i <= colores.length - 1 ? colores[i] : colores[i % colores.length]) + ' btn-block btnWhiteColorHover font-bold font-20',
          key: variable.ID
        }, variable.nombre);
      }), this.state.formas.map(function (variable, i) {
        return _react["default"].createElement("a", {
          onClick: function onClick() {
            return _this5.props.editarVariable(variable.ID, variable.esObjeto, variable.esInstruccionSQL, variable.tipo);
          },
          style: {
            color: "#fafafa"
          },
          className: "btn btn-" + (i <= colores.length - 1 ? colores[i] : colores[i % colores.length]) + ' btn-block btnWhiteColorHover font-bold font-20',
          key: variable.ID
        }, variable.nombre);
      }), this.state.variables.length == 0 && this.state.excel.length == 0 && this.state.formas.length == 0 ? _react["default"].createElement("div", {
        className: "p-3 mb-2 bg-dark text-white font-bold font-20 text-center",
        style: {
          width: "100%"
        }
      }, "No existen variables creadas") : null))))));
    }
  }]);

  return SeleccionarVariable;
}(_react["default"].Component);

exports["default"] = SeleccionarVariable;
//# sourceMappingURL=SeleccionarVariables.js.map
