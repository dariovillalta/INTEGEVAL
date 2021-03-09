"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Celda;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Celda(props) {
  return _react["default"].createElement("table", {
    className: "table table-striped table-bordered"
  }, _react["default"].createElement("thead", {
    onClick: function onClick() {
      return props.seleccionVariable(props.variable, props.posArregloPadre, props.posicionvariable);
    }
  }, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
    scope: "col"
  }, props.variable.nombre))));
}
//# sourceMappingURL=Celda.js.map
