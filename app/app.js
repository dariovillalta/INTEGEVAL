"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _fs = _interopRequireDefault(require("fs"));

var _Layout = _interopRequireDefault(require("./components/Layout.js"));

var _LoginPage = _interopRequireDefault(require("./components/LoginPage.js"));

var _MessageModal = _interopRequireDefault(require("./components/MessageModal.js"));

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

//import odbc from 'odbc';

/*const config = {
    user: 'SA',
    password: 'password111!',
    server: 'localhost',
    database: 'TOLOC_INTEG',
    stream: true,
    pool: {
        max: 40,
        min: 0,
        idleTimeoutMillis: 60000
    },
    options: {
        useUTC: false
    }
}*/

/*const pool = new sql.ConnectionPool(config, err => {
    if(err) {
        console.log(err);
        console.log("Error en conección con la base de datos");
        $("body").overhang({
            type: "error",
            primary: "#f84a1d",
            accent: "#d94e2a",
            message: "Error en conección con la base de datos.",
            overlay: true,
            closeConfirm: true
        });
    } else {
        console.log('pool loaded');
    }
});*/
var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this));
    _this.state = {
      isLoggedIn: false,
      userID: -1,
      userName: null,
      permision: "",
      config: {},
      pool: null,
      conexionAbierta: false,
      mensajeModal: {
        mostrarMensaje: false,
        mensajeConfirmado: false,
        esError: false,
        esConfirmar: false,
        titulo: "",
        mensaje: ""
      } // connection2 is now an open Connection

    };
    _this.login = _this.login.bind(_assertThisInitialized(_this));
    _this.logOff = _this.logOff.bind(_assertThisInitialized(_this));
    _this.readConfigFile = _this.readConfigFile.bind(_assertThisInitialized(_this));
    _this.connectToDB = _this.connectToDB.bind(_assertThisInitialized(_this));
    _this.dismissMessageModal = _this.dismissMessageModal.bind(_assertThisInitialized(_this));
    _this.showMessage = _this.showMessage.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.readConfigFile();
    }
  }, {
    key: "login",
    value: function login(id, userName, permision) {
      this.setState({
        isLoggedIn: true,
        userID: id,
        userName: userName,
        permision: permision
      });
    }
  }, {
    key: "logOff",
    value: function logOff() {
      this.setState({
        isLoggedIn: false,
        userID: -1,
        userName: null,
        permision: ""
      });
    }
  }, {
    key: "readConfigFile",
    value: function readConfigFile() {
      var _this2 = this;

      _fs["default"].readFile('./conf.dar', 'utf-8', function (err, data) {
        if (err) {
          _this2.setState({
            mensajeModal: {
              mostrarMensaje: true,
              mensajeConfirmado: false,
              esError: true,
              esConfirmar: false,
              titulo: "Error",
              mensaje: "Error al leer el archivo de configuracion de tabla."
            }
          });
        } else {
          var lineas = data.split("\n");
          var user, password, server, database;

          for (var i = 0; i < lineas.length; i++) {
            if (i == 0) {
              //var bytes = CryptoJS.AES.decrypt(lineas[i].replace(/\r?\n|\r/g), 'AncientAliens');
              //var despues = bytes.toString(CryptoJS.enc.Utf8);
              user = lineas[i].toString();
            } else if (i == 1) {
              /*var bytes = CryptoJS.AES.decrypt(lineas[i].replace(/\r?\n|\r/g), 'AncientAliens');
              var despues = bytes.toString(CryptoJS.enc.Utf8);*/
              password = lineas[i].toString();
            } else if (i == 2) {
              /*var bytes = CryptoJS.AES.decrypt(lineas[i].replace(/\r?\n|\r/g), 'AncientAliens');
              var despues = bytes.toString(CryptoJS.enc.Utf8);*/
              server = lineas[i].toString();
            } else if (i == 3) {
              /*var bytes = CryptoJS.AES.decrypt(lineas[i].replace(/\r?\n|\r/g), 'AncientAliens');
              var despues = bytes.toString(CryptoJS.enc.Utf8);*/
              database = lineas[i].toString();
            }
          }

          ;

          if (user != undefined && password != undefined && server != undefined && database != undefined) {
            var configTemp = {
              user: user,
              password: password,
              server: server,
              database: database,
              stream: true,
              pool: {
                max: 40,
                min: 0,
                idleTimeoutMillis: 60000
              },
              options: {
                useUTC: false
              }
            };

            _this2.setState({
              config: configTemp
            }, _this2.connectToDB);
          }
        }
      });
    }
  }, {
    key: "connectToDB",
    value: function connectToDB() {
      var _this3 = this;

      var poolTemp = new _mssql["default"].ConnectionPool(this.state.config, function (err) {
        if (err) {
          console.log(err);
          console.log("Error en conección con la base de datos");

          _this3.setState({
            mensajeModal: {
              mostrarMensaje: true,
              mensajeConfirmado: false,
              esError: true,
              esConfirmar: false,
              titulo: "Error",
              mensaje: "Error en conección con la base de datos. Ver Consola."
            }
          });
        } else {
          console.log('pool loaded');

          _this3.setState({
            conexionAbierta: true
          });
        }
      });
      this.setState({
        pool: poolTemp
      });
    }
  }, {
    key: "dismissMessageModal",
    value: function dismissMessageModal() {
      this.setState({
        mensajeModal: {
          mostrarMensaje: false,
          mensajeConfirmado: false,
          esError: false,
          esConfirmar: false,
          titulo: "",
          mensaje: ""
        }
      });
    }
  }, {
    key: "showMessage",
    value: function showMessage(titulo, mensaje, esError, esConfirmar) {
      this.setState({
        mensajeModal: {
          mostrarMensaje: true,
          esError: esError,
          esConfirmar: esConfirmar,
          titulo: titulo,
          mensaje: mensaje
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, this.state.isLoggedIn ? _react["default"].createElement(_Layout["default"], {
        userID: this.state.userID,
        userName: this.state.userName,
        permision: this.state.permision,
        logOff: this.logOff,
        pool: this.state.pool
      }, " ") : _react["default"].createElement(_LoginPage["default"], {
        login: this.login,
        pool: this.state.pool,
        readConfigFile: this.readConfigFile,
        conexionAbierta: this.state.conexionAbierta,
        showMessage: this.showMessage
      }, " "), this.state.mensajeModal.mostrarMensaje ? _react["default"].createElement(_MessageModal["default"], {
        esError: this.state.mensajeModal.esError,
        esConfirmar: this.state.mensajeModal.esConfirmar,
        dismissMessage: this.dismissMessageModal,
        titulo: this.state.mensajeModal.titulo,
        mensaje: this.state.mensajeModal.mensaje
      }, " ") : _react["default"].createElement("span", null));
    }
  }]);

  return App;
}(_react["default"].Component);

exports["default"] = App;
//# sourceMappingURL=app.js.map
