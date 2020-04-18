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

var CrearUmbral =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CrearUmbral, _React$Component);

  function CrearUmbral(props) {
    var _this;

    _classCallCheck(this, CrearUmbral);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CrearUmbral).call(this, props));
    _this.state = {
      umbrales: []
    };
    _this.traerUmbrales = _this.traerUmbrales.bind(_assertThisInitialized(_this));
    _this.crearUmbral = _this.crearUmbral.bind(_assertThisInitialized(_this));
    _this.noExisteUmbral = _this.noExisteUmbral.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CrearUmbral, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.traerUmbrales();
    }
  }, {
    key: "traerUmbrales",
    value: function traerUmbrales() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Umbral where variableID = " + _this2.props.idVariable, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                umbrales: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearUmbral",
    value: function crearUmbral() {
      var _this3 = this;

      var nombre = $("#nombreUmbral").val();

      if (nombre.length > 0 && nombre.length < 101) {
        if (this.noExisteUmbral(nombre)) {
          var transaction = new _mssql["default"].Transaction(this.props.pool);
          transaction.begin(function (err) {
            var rolledBack = false;
            transaction.on('rollback', function (aborted) {
              rolledBack = true;
            });
            var request = new _mssql["default"].Request(transaction);
            request.query("insert into Umbral (variableID, nombre) values (" + _this3.props.idVariable + ", '" + nombre + "')", function (err, result) {
              if (err) {
                console.log(err);

                if (!rolledBack) {
                  transaction.rollback(function (err) {});
                }
              } else {
                transaction.commit(function (err) {
                  alert("Umbral Creado");
                });
              }
            });
          }); // fin transaction
        } else {
          alert("El nombre del umbral ya existe para esta variable");
        }
      } else {
        alert("Ingrese un valor para el nombre del umbral que debe ser mayor a 0 caracteres y menor a 101");
      }
    }
  }, {
    key: "noExisteUmbral",
    value: function noExisteUmbral(nombre) {
      var noExiste = true;

      for (var i = 0; i < this.state.umbrales.length; i++) {
        if (this.state.umbrales[i].nombre.toLowerCase().localeCompare(nombre.toLowerCase()) == 0) {
          noExiste = false;
          break;
        }
      }

      ;
      return noExiste;
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "nombreUmbral",
        className: "col-form-label"
      }, "Nombre Umbral:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("input", {
        id: "nombreUmbral",
        type: "text",
        className: "form-control form-control-sm"
      }))), _react["default"].createElement("div", {
        className: "text-center"
      }, _react["default"].createElement("a", {
        onClick: this.crearUmbral,
        className: "btn btn-primary col-xs-6 col-6",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold"
        }
      }, "Crear Umbral")));
    }
  }]);

  return CrearUmbral;
}(_react["default"].Component);

exports["default"] = CrearUmbral;
//# sourceMappingURL=CrearUmbral.js.map
