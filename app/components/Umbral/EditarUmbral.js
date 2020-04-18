"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _reactInputSlider = _interopRequireDefault(require("react-input-slider"));

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

var colores = ["primary", "brand", "secondary", "success", "danger", "warning", "info", "dark"];

var EditarUmbral =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EditarUmbral, _React$Component);

  function EditarUmbral(props) {
    var _this;

    _classCallCheck(this, EditarUmbral);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditarUmbral).call(this, props));
    _this.state = {
      umbrales: [],
      umbralSeleccionadoID: -1,
      umbralNombreSeleccionado: '',
      seccionesUmbral: [],
      seccionUmbralSeleccionadoID: -1,
      seccionUmbralNombreSeleccionado: '',
      rangosSeccionUmbral: []
    };
    _this.traerUmbrales = _this.traerUmbrales.bind(_assertThisInitialized(_this));
    _this.seleccionUmbral = _this.seleccionUmbral.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionUmbral = _this.retornoSeleccionUmbral.bind(_assertThisInitialized(_this));
    _this.traerSeccionesUmbral = _this.traerSeccionesUmbral.bind(_assertThisInitialized(_this));
    _this.agregarSeccionUmbral = _this.agregarSeccionUmbral.bind(_assertThisInitialized(_this));
    _this.seleccionSeccionUmbral = _this.seleccionSeccionUmbral.bind(_assertThisInitialized(_this));
    _this.retornoSeccionSeleccionUmbral = _this.retornoSeccionSeleccionUmbral.bind(_assertThisInitialized(_this));
    _this.traerRangosSeccionUmbral = _this.traerRangosSeccionUmbral.bind(_assertThisInitialized(_this));
    _this.agregarRangoSeccionUmbral = _this.agregarRangoSeccionUmbral.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(EditarUmbral, [{
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
        request.query("select * from Umbral where variableID=" + _this2.props.idVariable, function (err, result) {
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
    key: "seleccionUmbral",
    value: function seleccionUmbral(index) {
      this.setState({
        umbralSeleccionadoID: this.state.umbrales[index].ID,
        umbralNombreSeleccionado: this.state.umbrales[index].nombre
      }, this.traerSeccionesUmbral);
    }
  }, {
    key: "retornoSeleccionUmbral",
    value: function retornoSeleccionUmbral() {
      this.setState({
        umbralSeleccionadoID: -1,
        umbralNombreSeleccionado: ""
      });
    }
  }, {
    key: "traerSeccionesUmbral",
    value: function traerSeccionesUmbral() {
      var _this3 = this;

      console.log(this.state.umbralSeleccionadoID);
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from SeccionUmbral where umbralID = " + _this3.state.umbralSeleccionadoID, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this3.setState({
                seccionesUmbral: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "agregarSeccionUmbral",
    value: function agregarSeccionUmbral() {
      var _this4 = this;

      var nombre = $("#nuevaSeccionUmbral").val();

      if (nombre.length > 0 && nombre.length < 101) {
        var transaction = new _mssql["default"].Transaction(this.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("insert into SeccionUmbral (umbralID, nombre) values (" + _this4.state.umbralSeleccionadoID + ", '" + nombre + "')", function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                _this4.traerSeccionesUmbral();
              });
            }
          });
        }); // fin transaction
      } else {
        alert("Ingrese un valor para el nombre d ela sección de umbral.");
      }
    }
  }, {
    key: "seleccionSeccionUmbral",
    value: function seleccionSeccionUmbral(index) {
      this.setState({
        seccionUmbralSeleccionadoID: this.state.seccionesUmbral[index].ID,
        seccionUmbralNombreSeleccionado: this.state.seccionesUmbral[index].nombre
      }, this.traerSeccionesUmbral);
    }
  }, {
    key: "retornoSeccionSeleccionUmbral",
    value: function retornoSeccionSeleccionUmbral() {
      this.setState({
        seccionUmbralSeleccionadoID: -1,
        seccionUmbralNombreSeleccionado: ""
      });
    }
  }, {
    key: "traerRangosSeccionUmbral",
    value: function traerRangosSeccionUmbral() {
      var _this5 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from RangoSeccionUmbral where seccionUmbralID = " + _this5.state.seccionUmbralSeleccionadoID, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this5.setState({
                rangosSeccionUmbral: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "agregarRangoSeccionUmbral",
    value: function agregarRangoSeccionUmbral() {
      var _this6 = this;

      var valMinimo = $("#nuevaSeccionUmbral").val();
      var valMaximo = $("#nuevaSeccionUmbral").val();

      if (nombre.length > 0 && nombre.length < 101) {
        var transaction = new _mssql["default"].Transaction(this.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("insert into SeccionUmbral (umbralID, nombre) values (" + _this6.state.umbralSeleccionadoID + ", '" + nombre + "')", function (err, result) {
            if (err) {
              console.log(err);

              if (!rolledBack) {
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                _this6.traerSeccionesUmbral();
              });
            }
          });
        }); // fin transaction
      } else {
        alert("Ingrese un valor para el nombre d ela sección de umbral.");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      if (this.state.umbralSeleccionadoID == -1) {
        console.log("YEEE1");
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "row"
        }, this.state.umbrales.map(function (umbral, i) {
          return _react["default"].createElement("div", {
            key: umbral.ID,
            className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
          }, _react["default"].createElement("a", {
            href: "#",
            onClick: function onClick() {
              return _this7.seleccionUmbral(i);
            },
            className: "btn btn-outline-" + (colores[i] != undefined ? colores[i] : colores[i % colores.length]),
            style: {
              width: "100%"
            }
          }, umbral.nombre));
        })));
      } else if (this.state.umbralSeleccionadoID != -1 && this.state.seccionUmbralSeleccionadoID == -1) {
        console.log("YEEE2");
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          onClick: function onClick() {
            return _this7.retornoSeleccionUmbral();
          },
          className: "col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 form-group addPointer border"
        }, _react["default"].createElement("label", {
          className: "font-24 addPointer"
        }, " ", "<", " ")), _react["default"].createElement("div", {
          className: "col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 form-group"
        }, _react["default"].createElement("h2", null, this.state.umbralNombreSeleccionado))), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "nuevaSeccionUmbral",
          className: "col-form-label"
        }, "Nombre Nueva Secci\xF3n de Umbral:")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("input", {
          id: "nuevaSeccionUmbral",
          type: "text",
          className: "form-control form-control-sm"
        }))), _react["default"].createElement("div", {
          className: "text-center"
        }, _react["default"].createElement("a", {
          onClick: this.agregarSeccionUmbral,
          className: "btn btn-primary col-xs-6 col-6",
          style: {
            color: "white",
            fontSize: "1.2em",
            fontWeight: "bold"
          }
        }, "Agregar Secci\xF3n de Umbral")), _react["default"].createElement("br", null), this.state.seccionesUmbral.map(function (seccionUmbral, i) {
          return _react["default"].createElement("div", {
            key: seccionUmbral.ID,
            className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
          }, _react["default"].createElement("a", {
            href: "#",
            onClick: function onClick() {
              return _this7.seleccionSeccionUmbral(i);
            },
            className: "btn btn-outline-" + (colores[i] != undefined ? colores[i] : colores[i % colores.length]),
            style: {
              width: "100%"
            }
          }, seccionUmbral.nombre));
        }));
      } else if (this.state.umbralSeleccionadoID != -1 && this.state.seccionUmbralSeleccionadoID != -1) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          onClick: function onClick() {
            return _this7.retornoSeccionSeleccionUmbral();
          },
          className: "col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 form-group addPointer border"
        }, _react["default"].createElement("label", {
          className: "font-24 addPointer"
        }, " ", "<", " ")), _react["default"].createElement("div", {
          className: "col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 form-group"
        }, _react["default"].createElement("h2", null, this.state.seccionUmbralNombreSeleccionado))), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "inputSmall",
          className: "col-form-label"
        }, "Nombre Secci\xF3n de Umbral:")), _react["default"].createElement("div", {
          className: "col-xl-11 col-lg-11 col-md-11 col-sm-11 col-11 form-group"
        }, _react["default"].createElement("h2", null, this.state.seccionUmbralNombreSeleccionado))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 form-group text-center"
        }, _react["default"].createElement("label", {
          htmlFor: "inputSmall",
          className: "col-form-label"
        }, "Valor m\xEDnimo:")), _react["default"].createElement("div", {
          className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 form-group text-center"
        }, _react["default"].createElement("label", {
          htmlFor: "inputSmall",
          className: "col-form-label"
        }, "Valor m\xE1ximo:"))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 form-group"
        }, _react["default"].createElement("input", {
          id: "inputSmall",
          type: "text",
          className: "form-control form-control-sm"
        })), _react["default"].createElement("div", {
          className: "col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 form-group"
        }, _react["default"].createElement(_reactInputSlider["default"], {
          axis: "x",
          xstep: 1,
          xmin: 0,
          xmax: 100,
          x: 0,
          style: {
            width: "100%",
            marginTop: "10px"
          }
        }))), this.state.rangosSeccionUmbral.map(function (rangoSeccionUmbral, j) {
          return _react["default"].createElement("div", null, _react["default"].createElement("hr", null), _react["default"].createElement("div", {
            className: "row"
          }, _react["default"].createElement("div", {
            className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
          }, _react["default"].createElement("label", {
            htmlFor: "inputSmall",
            className: "col-form-label"
          }, "Nombre Secci\xF3n de Umbral:")), _react["default"].createElement("div", {
            className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
          }, _react["default"].createElement("input", {
            id: "inputSmall",
            type: "text",
            defaultValue: seccionUmbral.nombre,
            className: "form-control form-control-sm"
          }))), _react["default"].createElement("div", {
            className: "row"
          }, _react["default"].createElement("div", {
            className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 form-group text-center"
          }, _react["default"].createElement("label", {
            htmlFor: "inputSmall",
            className: "col-form-label"
          }, "Valor M\xEDnimo Nuevo:")), _react["default"].createElement("div", {
            className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 form-group text-center"
          }, _react["default"].createElement("label", {
            htmlFor: "inputSmall",
            className: "col-form-label"
          }, "Valor M\xE1ximo Nuevo:"))), _react["default"].createElement("div", {
            className: "row"
          }, _react["default"].createElement("div", {
            className: "col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 form-group"
          }, _react["default"].createElement("input", {
            id: "inputSmall",
            type: "text",
            className: "form-control form-control-sm"
          })), _react["default"].createElement("div", {
            className: "col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 form-group"
          }, _react["default"].createElement(_reactInputSlider["default"], {
            axis: "x",
            xstep: 1,
            xmin: 0,
            xmax: 100,
            x: 0,
            style: {
              width: "100%",
              marginTop: "10px"
            }
          }))));
        }));
      }
    }
  }]);

  return EditarUmbral;
}(_react["default"].Component);

exports["default"] = EditarUmbral;
//# sourceMappingURL=EditarUmbral.js.map
