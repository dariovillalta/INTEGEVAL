"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Modal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal() {
    _classCallCheck(this, Modal);

    return _possibleConstructorReturn(this, _getPrototypeOf(Modal).apply(this, arguments));
  }

  _createClass(Modal, [{
    key: "render",
    value: function render() {
      // Render nothing if the "show" prop is false
      if (!this.props.show) {
        return null;
      }

      return _react["default"].createElement("div", {
        className: "backdrop",
        style: {
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: "99",
          backgroundColor: 'rgba(0,0,0,0.3)',
          padding: "130px 50px 50px 50px"
        },
        onClick: this.props.onClose
      }, _react["default"].createElement("div", {
        style: {
          backgroundColor: '#fff',
          borderRadius: "5px",
          maxWidth: "800px",
          minHeight: "300px",
          maxHeight: "80vh",
          margin: '0 auto',
          padding: "5px 30px 30px 30px",
          zIndex: "100",
          overflowY: "auto"
        },
        onClick: function onClick(e) {
          e.stopPropagation();
        }
      }, _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "10px"
        }
      }, _react["default"].createElement("span", {
        className: "addPointer",
        style: {
          "float": "right"
        },
        onClick: this.props.onClose
      }, "X")), _react["default"].createElement("div", {
        className: "font-18",
        style: {
          width: "100%",
          height: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "3px solid #d2d2e4"
        }
      }, _react["default"].createElement("h4", null, this.props.titulo)), _react["default"].createElement("br", null), this.props.children));
    }
  }]);

  return Modal;
}(_react["default"].Component);

Modal.propTypes = {
  onClose: _propTypes["default"].func.isRequired,
  show: _propTypes["default"].bool,
  children: _propTypes["default"].node
};
var _default = Modal;
exports["default"] = _default;
//# sourceMappingURL=Modal.js.map
