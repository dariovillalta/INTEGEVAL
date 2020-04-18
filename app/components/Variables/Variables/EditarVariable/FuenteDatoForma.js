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

var FuenteDatoForma =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FuenteDatoForma, _React$Component);

  function FuenteDatoForma(props) {
    var _this;

    _classCallCheck(this, FuenteDatoForma);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FuenteDatoForma).call(this, props));
    _this.state = {
      nombre: "",
      tipo: "",
      guardar: ""
    };
    _this.crearVariable = _this.crearVariable.bind(_assertThisInitialized(_this));
    _this.traerForma = _this.traerForma.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FuenteDatoForma, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.tipoVariableOriginal.localeCompare("forma") == 0) {
        this.traerForma();
      }
    }
  }, {
    key: "traerForma",
    value: function traerForma() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from FormasVariables where ID = " + _this2.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                _this2.setState({
                  nombre: result.recordset[0].nombre,
                  tipo: result.recordset[0].tipo,
                  guardar: result.recordset[0].guardar
                });

                $("#nombreVariable").val(result.recordset[0].nombre);
                $("#tipo").val(result.recordset[0].tipo);
                if (result.recordset[0].guardar) $("#guardarVariable").prop('checked', true);else $("#guardarVariable").prop('checked', false);
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearVariable",
    value: function crearVariable() {
      var _this3 = this;

      var nombreVariable = $("#nombreVariable").val();
      var tipo = $("#tipo").val();
      var guardarVariable;
      if ($("#guardarVariable").is(':checked')) guardarVariable = true;else guardarVariable = false;

      if (nombreVariable.length > 0 && nombreVariable.length < 1001) {
        if (tipo.length > 0 && tipo.length < 1001) {
          var transaction = new _mssql["default"].Transaction(this.props.pool);
          transaction.begin(function (err) {
            var rolledBack = false;
            transaction.on('rollback', function (aborted) {
              rolledBack = true;
            });
            var request = new _mssql["default"].Request(transaction);
            request.query("update FormasVariables set nombre = '" + nombreVariable + "', tipo = '" + tipo + "', guardar = '" + guardarVariable + "' where ID = " + _this3.props.idVariable, function (err, result) {
              if (err) {
                console.log(err);

                if (!rolledBack) {
                  transaction.rollback(function (err) {});
                }
              } else {
                transaction.commit(function (err) {
                  alert("Variable Modificada");
                });
              }
            });
          }); // fin transaction
        } else {
          alert('Ingrese un valor para el tipo de la variable que debe ser menor a 31 caracteres');
        }
      } else {
        alert('Ingrese un valor para el nombre de la variable que debe ser menor a 101 caracteres');
      }
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
        htmlFor: "nombreVariable",
        className: "col-form-label"
      }, "Nombre de Variable:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("input", {
        id: "nombreVariable",
        defaultValue: this.state.nombre,
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
        htmlFor: "tipo",
        className: "col-form-label"
      }, "Tipo de Variable:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("select", {
        id: "tipo",
        defaultValue: this.state.tipo,
        className: "form-control"
      }, _react["default"].createElement("option", {
        value: "numero"
      }, "N\xFAmero"), _react["default"].createElement("option", {
        value: "varchar"
      }, "Cadena"), _react["default"].createElement("option", {
        value: "date"
      }, "Fecha"), _react["default"].createElement("option", {
        value: "bit"
      }, "Booleano")))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "guardarVariable",
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
        defaultChecked: this.state.guardar,
        name: "guardarVariable",
        id: "guardarVariable"
      }), _react["default"].createElement("span", null, _react["default"].createElement("label", {
        htmlFor: "guardarVariable"
      }))))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "text-center",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-brand active",
        onClick: this.crearVariable
      }, "Modificar Variable")), _react["default"].createElement("br", null));
    }
  }]);

  return FuenteDatoForma;
}(_react["default"].Component);

exports["default"] = FuenteDatoForma;
//# sourceMappingURL=FuenteDatoForma.js.map
