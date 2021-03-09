"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FilasCeldas;

var _react = _interopRequireDefault(require("react"));

var _Accordion = _interopRequireDefault(require("../Accordion/Accordion.js"));

var _Celda = _interopRequireDefault(require("./Celda.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function FilasCeldas(props) {
  return _react["default"].createElement("div", null, props.categoriasVariables.map(function (categoriaVariables, i) {
    return _react["default"].createElement("div", {
      key: categoriaVariables.nombre
    }, _react["default"].createElement(_Accordion["default"], {
      showTrash: false,
      showEdit: false
    }, categoriaVariables.variables.map(function (variable, j) {
      return _react["default"].createElement("div", {
        label: variable.nombre
      }, categoriaVariables.variables.map(function (variable, j) {
        return _react["default"].createElement(_Celda["default"], {
          seleccionVariable: props.seleccionVariable,
          variable: variable,
          key: i + j
        }, variable.nombre);
      }));
    })), _react["default"].createElement("br", null));
  }));
}
//# sourceMappingURL=FilasCeldas.js.map
