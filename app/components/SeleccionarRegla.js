"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _VariableCreation = _interopRequireDefault(require("./VariableCreation.js"));

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

var SeleccionarRegla =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SeleccionarRegla, _React$Component);

  function SeleccionarRegla(props) {
    var _this;

    _classCallCheck(this, SeleccionarRegla);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SeleccionarRegla).call(this, props));
    _this.state = {
      reglas: [],
      mostrarCreacionRegla: false
    };
    _this.loadRules = _this.loadRules.bind(_assertThisInitialized(_this));
    _this.goCreateRule = _this.goCreateRule.bind(_assertThisInitialized(_this));
    _this.returnChooseRule = _this.returnChooseRule.bind(_assertThisInitialized(_this));
    _this.formatRuleField = _this.formatRuleField.bind(_assertThisInitialized(_this));
    _this.formatRuleValue = _this.formatRuleValue.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SeleccionarRegla, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadRules();
    }
  }, {
    key: "loadRules",
    value: function loadRules() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Reglas where campoTablaID = " + _this2.props.tablaID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                reglas: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "goCreateRule",
    value: function goCreateRule() {
      this.setState({
        mostrarCreacionRegla: true
      });
    }
  }, {
    key: "returnChooseRule",
    value: function returnChooseRule() {
      this.setState({
        mostrarCreacionRegla: false
      });
      this.loadRules();
    }
  }, {
    key: "formatRuleField",
    value: function formatRuleField(id) {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select nombre from Campos where ID = " + id, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
              return '';
            }
          } else {
            transaction.commit(function (err) {
              return result.recordset[0];
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "formatRuleValue",
    value: function formatRuleValue(regla) {
      if (regla.esListaValor) {
        var transaction = new _mssql["default"].Transaction(this.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("select nombre from VariablesdeLista where ID = " + regla.valorCampoID, function (err, result) {
            if (err) {
              if (!rolledBack) {
                console.log(err);
                transaction.rollback(function (err) {});
                return '';
              }
            } else {
              transaction.commit(function (err) {
                return result.recordset[0];
              });
            }
          });
        }); // fin transaction
      } else {
        var _transaction = new _mssql["default"].Transaction(this.props.pool);

        _transaction.begin(function (err) {
          var rolledBack = false;

          _transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });

          var request = new _mssql["default"].Request(_transaction);
          request.query("select nombre from Campos where ID = " + regla.valorCampoID, function (err, result) {
            if (err) {
              if (!rolledBack) {
                console.log(err);

                _transaction.rollback(function (err) {});

                return '';
              }
            } else {
              _transaction.commit(function (err) {
                return result.recordset[0];
              });
            }
          });
        }); // fin transaction

      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.state.mostrarCreacionRegla) {
        return _react["default"].createElement("div", null, _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "page-header"
        }, _react["default"].createElement("h2", {
          className: "pageheader-title"
        }, "Configuraci\xF3n"), _react["default"].createElement("div", {
          className: "page-breadcrumb"
        }, _react["default"].createElement("nav", {
          "aria-label": "breadcrumb"
        }, _react["default"].createElement("ol", {
          className: "breadcrumb"
        }, _react["default"].createElement("li", {
          className: "breadcrumb-item",
          "aria-current": "page",
          onClick: this.props.showConfigurationComponent
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Configuraci\xF3n")), _react["default"].createElement("li", {
          className: "breadcrumb-item",
          "aria-current": "page",
          onClick: this.props.retornoTablas
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Seleccionar Tabla")), _react["default"].createElement("li", {
          className: "breadcrumb-item",
          "aria-current": "page",
          onClick: this.props.returnSelCredit
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Seleccionar Tipo de Cr\xE9dito")), _react["default"].createElement("li", {
          className: "breadcrumb-item",
          "aria-current": "page",
          onClick: this.returnChooseRule
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Seleccionar Variables")), _react["default"].createElement("li", {
          className: "breadcrumb-item active",
          "aria-current": "page"
        }, "Creaci\xF3n de Variables"))))))), _react["default"].createElement(_VariableCreation["default"], {
          pool: this.props.pool,
          tablaID: this.props.tablaID
        }, " "));
      } else {
        return _react["default"].createElement("div", null, _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "page-header"
        }, _react["default"].createElement("h2", {
          className: "pageheader-title"
        }, "Configuraci\xF3n"), _react["default"].createElement("div", {
          className: "page-breadcrumb"
        }, _react["default"].createElement("nav", {
          "aria-label": "breadcrumb"
        }, _react["default"].createElement("ol", {
          className: "breadcrumb"
        }, _react["default"].createElement("li", {
          className: "breadcrumb-item",
          "aria-current": "page",
          onClick: this.props.showConfigurationComponent
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Configuraci\xF3n")), _react["default"].createElement("li", {
          className: "breadcrumb-item",
          "aria-current": "page",
          onClick: this.props.retornoTablas
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Seleccionar Tabla")), _react["default"].createElement("li", {
          className: "breadcrumb-item",
          "aria-current": "page",
          onClick: this.props.returnSelCredit
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Seleccionar Tipo de Cr\xE9dito")), _react["default"].createElement("li", {
          className: "breadcrumb-item active",
          "aria-current": "page"
        }, "Seleccionar Variables"))))))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("button", {
          onClick: this.goCreateRule,
          className: "btn btn-success btn-block col-xl-10 col-10",
          style: {
            color: "white",
            fontSize: "1.2em",
            fontWeight: "bold",
            margin: "0 auto",
            display: "block"
          }
        }, "Crear")), _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "card influencer-profile-data"
        }, _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "row border-top border-bottom addPaddingToConfig"
        }, this.state.reglas.map(function (regla, i) {
          return _react["default"].createElement("a", {
            className: "btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM",
            onClick: function onClick() {
              return _this3.props.seleccionarCredito(regla.ID);
            },
            key: regla.ID
          }, _this3.formatRuleField(regla.campoCampoID) + " " + regla.operacion + " " + _this3.formatRuleValue(regla.valorCampoID));
        }), this.state.reglas.length == 0 ? _react["default"].createElement("a", {
          className: "btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"
        }, "No existen variables creadas") : _react["default"].createElement("span", null)))))));
      }
    }
  }]);

  return SeleccionarRegla;
}(_react["default"].Component);

exports["default"] = SeleccionarRegla;
//# sourceMappingURL=SeleccionarRegla.js.map
