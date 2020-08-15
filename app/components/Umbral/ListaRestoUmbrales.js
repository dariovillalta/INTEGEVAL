"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ListaRestoUmbrales;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ListaRestoUmbrales(props) {
  return _react["default"].createElement("div", {
    className: "row"
  }, _react["default"].createElement("div", {
    className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
  }, props.lista.map(function (variable, i) {
    return _react["default"].createElement("div", {
      key: variable.ID
    }, _react["default"].createElement("div", {
      className: "card"
    }, _react["default"].createElement("div", {
      className: "card-body"
    }, _react["default"].createElement("div", {
      className: "row border-top border-bottom addPaddingToConfig"
    }, _react["default"].createElement("div", {
      style: {
        height: "20px",
        width: "100%"
      }
    }, " "), _react["default"].createElement("div", {
      className: "row",
      style: {
        width: "100%"
      }
    }, _react["default"].createElement("div", {
      className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 font-bold font-24"
    }, variable.nombre)), _react["default"].createElement("div", {
      style: {
        height: "10px",
        width: "100%"
      }
    }, " "), _react["default"].createElement("div", {
      className: "row",
      style: {
        width: "100%"
      }
    }, _react["default"].createElement("div", {
      className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12",
      style: {
        padding: "0px",
        border: "1px solid #d2d2e4"
      }
    }, _react["default"].createElement("div", {
      style: {
        height: "30px",
        width: variable.peso + "%",
        background: "#81d4fa"
      }
    }))), _react["default"].createElement("div", {
      className: "row",
      style: {
        width: "100%"
      }
    }, _react["default"].createElement("div", {
      className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center"
    }, _react["default"].createElement("label", {
      className: "col-form-label"
    }, "Peso: ", variable.peso))), _react["default"].createElement("div", {
      style: {
        height: "20px",
        width: "100%"
      }
    }, " ")))), _react["default"].createElement("br", null));
  })));
}
//# sourceMappingURL=ListaRestoUmbrales.js.map
