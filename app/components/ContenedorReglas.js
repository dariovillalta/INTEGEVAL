"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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

var indexSeleccionado;

var ContenedorReglas =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ContenedorReglas, _React$Component);

  function ContenedorReglas(props) {
    var _this;

    _classCallCheck(this, ContenedorReglas);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ContenedorReglas).call(this, props));
    _this.seleccionRegla = _this.seleccionRegla.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ContenedorReglas, [{
    key: "seleccionRegla",
    value: function seleccionRegla(index, objeto) {
      $("#reglaInit").removeClass("colorPunteroFormula");
      $("#reglaInit").removeClass("blink");
      $("#reglaFin").removeClass("colorPunteroFormula");
      $("#reglaFin").removeClass("blink");
      $("#unicaRegla").css("border", "initial");

      for (var i = 0; i < this.props.reglas.length; i++) {
        $("#regla" + i).css("border", "initial");

        if (i == 0) {
          $("#reglaInit" + i).removeClass("colorPunteroFormula");
          $("#reglaInit" + i).removeClass("blink");
          $("#reglaFin" + i).removeClass("colorPunteroFormula");
          $("#reglaFin" + i).removeClass("blink");
        } else {
          $("#reglaFin" + i).removeClass("colorPunteroFormula");
          $("#reglaFin" + i).removeClass("blink");
        }
      }

      ;

      if (this.props.reglas.length > 0) {
        if (this.props.reglas.length == 1) {
          indexSeleccionado = 0;

          if (index.localeCompare("arriba") == 0) {
            $("#reglaInit").addClass("colorPunteroFormula");
            $("#reglaInit").addClass("blink");
          } else if (index.localeCompare("abajo") == 0) {
            $("#reglaFin").addClass("colorPunteroFormula");
            $("#reglaFin").addClass("blink");
          } else {
            $("#unicaRegla").css("border", "2px solid #F9D342");
          }
        } else {
          indexSeleccionado = index;

          if (objeto.localeCompare("arriba") == 0) {
            $("#reglaInit" + index).addClass("colorPunteroFormula");
            $("#reglaInit" + index).addClass("blink");
          } else if (objeto.localeCompare("abajo") == 0) {
            $("#reglaFin" + index).addClass("colorPunteroFormula");
            $("#reglaFin" + index).addClass("blink");
          } else {
            $("#regla" + index).css("border", "2px solid #F9D342");
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement("div", null, this.props.reglas.length == 0 ? _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "font-20",
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, "No existen reglas creadas"), _react["default"].createElement("br", null)) : null, this.props.reglas.length == 1 ? _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        id: "reglaInit",
        onClick: function onClick() {
          return _this2.seleccionRegla("arriba");
        },
        className: "highlightFormulaBackground addPointer",
        style: {
          width: "100%",
          height: "10px"
        }
      }), _react["default"].createElement("div", {
        onClick: function onClick() {
          return _this2.seleccionRegla("reglaUnica");
        },
        className: "row",
        style: {
          width: "100%",
          margin: "1% 0% 1% 0%"
        }
      }, _react["default"].createElement("div", {
        id: "unicaRegla",
        className: "addPointer",
        style: {
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "0% 2%",
          width: "100%",
          marginLeft: "auto",
          marginRight: "0"
        }
      }, this.props.reglas[0].texto)), _react["default"].createElement("div", {
        id: "reglaFin",
        onClick: function onClick() {
          return _this2.seleccionRegla("abajo");
        },
        className: "highlightFormulaBackground addPointer",
        style: {
          width: "100%",
          height: "10px"
        }
      }), _react["default"].createElement("br", null)) : null, this.props.reglas.length > 1 ? _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "100%"
        }
      }, this.props.reglas.map(function (regla, i) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }, i == 0 ? _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }, _react["default"].createElement("div", {
          id: "reglaInit" + i,
          onClick: function onClick() {
            return _this2.seleccionRegla(i, "arriba");
          },
          className: "highlightFormulaBackground addPointer",
          style: {
            width: "100%",
            height: "10px"
          }
        }), _react["default"].createElement("div", {
          onClick: function onClick() {
            return _this2.seleccionRegla(i, "condicion");
          },
          className: "row",
          style: {
            width: "100%",
            margin: "1% 0% 1% 0%"
          }
        }, _react["default"].createElement("div", {
          id: "regla" + i,
          className: "addPointer",
          style: {
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "0% 2%",
            width: "100%",
            marginLeft: "auto",
            marginRight: "0"
          }
        }, _this2.props.reglas[i].texto)), _react["default"].createElement("div", {
          id: "reglaFin" + i,
          onClick: function onClick() {
            return _this2.seleccionRegla(i, "abajo");
          },
          className: "highlightFormulaBackground addPointer",
          style: {
            width: "100%",
            height: "10px"
          }
        })) : _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }, _react["default"].createElement("div", {
          onClick: function onClick() {
            return _this2.seleccionRegla(i, "condicion");
          },
          className: "row",
          style: {
            width: "100%",
            margin: "1% 0% 1% 0%"
          }
        }, _react["default"].createElement("div", {
          id: "regla" + i,
          className: "addPointer",
          style: {
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "0% 2%",
            width: "80%",
            marginLeft: "auto",
            marginRight: "0"
          }
        }, _this2.props.reglas[i].texto)), _react["default"].createElement("div", {
          id: "reglaFin" + i,
          onClick: function onClick() {
            return _this2.seleccionRegla(i, "abajo");
          },
          className: "highlightFormulaBackground addPointer",
          style: {
            width: "100%",
            height: "10px"
          }
        })));
      }), _react["default"].createElement("br", null)) : null);
    }
  }]);

  return ContenedorReglas;
}(_react["default"].Component);

exports["default"] = ContenedorReglas;
//# sourceMappingURL=ContenedorReglas.js.map
