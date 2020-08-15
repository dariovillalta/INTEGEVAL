"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _MessageModal = _interopRequireDefault(require("../MessageModal.js"));

var _Modal = _interopRequireDefault(require("../Modal/Modal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MantenimientoUsuarios =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MantenimientoUsuarios, _React$Component);

  function MantenimientoUsuarios(props) {
    var _this;

    _classCallCheck(this, MantenimientoUsuarios);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MantenimientoUsuarios).call(this, props));
    _this.state = {
      usuarios: [],
      mensajeModal: {
        mostrarMensaje: false,
        mensajeConfirmado: false,
        esError: false,
        esConfirmar: false,
        titulo: "",
        mensaje: "",
        banderaMetodoInit: "",
        idElementoSelec: -1,
        indiceX: -1
      },
      mostrarModal: false,
      tituloModal: "",
      nombreUsuarioSeleccionado: "",
      usuarioUsuarioSeleccionado: "",
      contrasenaUsuarioSeleccionado: "",
      posUsuarioSeleccionado: -1,
      permisosUsuarios: [],
      permisoSeleccionado: null
    };
    _this.loadUsuarios = _this.loadUsuarios.bind(_assertThisInitialized(_this));
    _this.loadPermisos = _this.loadPermisos.bind(_assertThisInitialized(_this));
    _this.insertarUsuario = _this.insertarUsuario.bind(_assertThisInitialized(_this));
    _this.getUsuarioID = _this.getUsuarioID.bind(_assertThisInitialized(_this));
    _this.insertarPermisos = _this.insertarPermisos.bind(_assertThisInitialized(_this));
    _this.dismissMessageModal = _this.dismissMessageModal.bind(_assertThisInitialized(_this));
    _this.showSuccesMessage = _this.showSuccesMessage.bind(_assertThisInitialized(_this));
    _this.openModal = _this.openModal.bind(_assertThisInitialized(_this));
    _this.closeModal = _this.closeModal.bind(_assertThisInitialized(_this));
    _this.editUser = _this.editUser.bind(_assertThisInitialized(_this));
    _this.deleteUser = _this.deleteUser.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MantenimientoUsuarios, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadUsuarios();
    }
  }, {
    key: "loadUsuarios",
    value: function loadUsuarios() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Usuarios", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                usuarios: result.recordset
              });

              var arreglo = [];

              for (var i = 0; i < result.recordset.length; i++) {
                _this2.loadPermisos(result.recordset[i].ID, i, arreglo);
              }

              ;
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "loadPermisos",
    value: function loadPermisos(idUsuario, posicionUsuario, arreglo) {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from PermisosUsuarios where usuarioID = " + idUsuario, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                arreglo[posicionUsuario] = result.recordset[0];

                _this3.setState({
                  permisosUsuarios: arreglo
                });
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "insertarUsuario",
    value: function insertarUsuario() {
      var _this4 = this;

      var nombreCompleto = $("#nombreCompleto").val();
      var usuario = $("#usuario").val();
      var contrasena = $("#contrasena").val();

      if (nombreCompleto.length > 0 && nombreCompleto.length < 101) {
        if (usuario.length > 0 && usuario.length < 26) {
          if (contrasena.length > 0 && contrasena.length < 51) {
            var transaction = new _mssql["default"].Transaction(this.props.pool);
            transaction.begin(function (err) {
              var rolledBack = false;
              transaction.on('rollback', function (aborted) {
                rolledBack = true;
              });
              var request = new _mssql["default"].Request(transaction);
              request.query("insert into Usuarios (nombreCompleto, usuario, contrasena) values ('" + nombreCompleto + "','" + usuario + "','" + contrasena + "')", function (err, result) {
                if (err) {
                  if (!rolledBack) {
                    console.log(err);
                    transaction.rollback(function (err) {});
                  }
                } else {
                  transaction.commit(function (err) {
                    var permisosVariable = '',
                        permisosIndicador = '',
                        permisosRiesgo = '',
                        permisosRiesgoIntegral = '',
                        permisosUsuario = '',
                        permisosLista = '',
                        permisosAlarma = '';

                    if ($("#variableCalculo").is(':checked')) {
                      permisosVariable += 'C';
                    }

                    if ($("#indicadorCalculo").is(':checked')) {
                      permisosIndicador += 'C';
                    }

                    if ($("#riesgoCalculo").is(':checked')) {
                      permisosRiesgo += 'C';
                    }

                    if ($("#riesgoIntegralCalculo").is(':checked')) {
                      permisosRiesgoIntegral += 'C';
                    }

                    if ($("#usuarioCalculo").is(':checked')) {
                      permisosUsuario += 'C';
                    }

                    if ($("#listaCalculo").is(':checked')) {
                      permisosLista += 'C';
                    }

                    if ($("#alarmaCalculo").is(':checked')) {
                      permisosAlarma += 'C';
                    }

                    if ($("#variableVer").is(':checked')) {
                      if (permisosVariable.length > 0) permisosVariable += '/';
                      permisosVariable += 'V';
                    }

                    if ($("#indicadorVer").is(':checked')) {
                      if (permisosIndicador.length > 0) permisosIndicador += '/';
                      permisosIndicador += 'V';
                    }

                    if ($("#riesgoVer").is(':checked')) {
                      if (permisosRiesgo.length > 0) permisosRiesgo += '/';
                      permisosRiesgo += 'V';
                    }

                    if ($("#riesgoIntegralVer").is(':checked')) {
                      if (permisosRiesgoIntegral.length > 0) permisosRiesgoIntegral += '/';
                      permisosRiesgoIntegral += 'V';
                    }

                    if ($("#usuarioVer").is(':checked')) {
                      if (permisosUsuario.length > 0) permisosUsuario += '/';
                      permisosUsuario += 'V';
                    }

                    if ($("#listaVer").is(':checked')) {
                      if (permisosLista.length > 0) permisosLista += '/';
                      permisosLista += 'V';
                    }

                    if ($("#alarmaVer").is(':checked')) {
                      if (permisosAlarma.length > 0) permisosAlarma += '/';
                      permisosAlarma += 'V';
                    }

                    if ($("#variableEditar").is(':checked')) {
                      if (permisosVariable.length > 0) permisosVariable += '/';
                      permisosVariable += 'E';
                    }

                    if ($("#indicadorEditar").is(':checked')) {
                      if (permisosIndicador.length > 0) permisosIndicador += '/';
                      permisosIndicador += 'E';
                    }

                    if ($("#riesgoEditar").is(':checked')) {
                      if (permisosRiesgo.length > 0) permisosRiesgo += '/';
                      permisosRiesgo += 'E';
                    }

                    if ($("#riesgoIntegralEditar").is(':checked')) {
                      if (permisosRiesgoIntegral.length > 0) permisosRiesgoIntegral += '/';
                      permisosRiesgoIntegral += 'E';
                    }

                    if ($("#usuarioEditar").is(':checked')) {
                      if (permisosUsuario.length > 0) permisosUsuario += '/';
                      permisosUsuario += 'E';
                    }

                    if ($("#listaEditar").is(':checked')) {
                      if (permisosLista.length > 0) permisosLista += '/';
                      permisosLista += 'E';
                    }

                    if ($("#alarmaEditar").is(':checked')) {
                      if (permisosAlarma.length > 0) permisosAlarma += '/';
                      permisosAlarma += 'E';
                    }

                    var permisoUsuarios = {
                      variable: permisosVariable,
                      indicador: permisosIndicador,
                      riesgo: permisosRiesgo,
                      riesgoIntegral: permisosRiesgoIntegral,
                      usuario: permisosUsuario,
                      lista: permisosLista,
                      alarma: permisosAlarma
                    };

                    var copyPermisos = _toConsumableArray(_this4.state.permisosUsuarios);

                    copyPermisos.push(permisoUsuarios);

                    _this4.setState({
                      mensajeModal: {
                        mostrarMensaje: false,
                        mensajeConfirmado: true,
                        esError: false,
                        esConfirmar: false,
                        titulo: "",
                        mensaje: "",
                        banderaMetodoInit: "",
                        idElementoSelec: _this4.state.mensajeModal.idElementoSelec,
                        indiceX: _this4.state.mensajeModal.indiceX
                      },
                      permisosUsuarios: copyPermisos
                    }, _this4.getUsuarioID);

                    _this4.showSuccesMessage("Exito", "Usuario creado con éxito.");

                    _this4.loadUsuarios();
                  });
                }
              });
            }); // fin transaction
          } else {
            if (contrasena.length == 0) {
              alert('Ingrese un valor para el campo de contraseña.');
            } else {
              alert('El valor para el campo de contraseña debe ser menor a 51 caracteres.');
            }
          }
        } else {
          if (usuario.length == 0) {
            alert('Ingrese un valor para el campo de usuario.');
          } else {
            alert('El valor para el campo de usuario debe ser menor a 26 caracteres.');
          }
        }
      } else {
        if (nombreCompleto.length == 0) {
          alert('Ingrese un valor para el campo de nombre completo.');
        } else {
          alert('El valor para el campo de nombre completo debe ser menor a 101 caracteres.');
        }
      }
    }
  }, {
    key: "getUsuarioID",
    value: function getUsuarioID() {
      var _this5 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select top 1 * from Usuarios order by ID desc", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset != undefined) {
                if (result.recordset.length) {
                  _this5.insertarPermisos(result.recordset[0].ID, _this5.state.permisosUsuarios.length - 1);
                }
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "insertarPermisos",
    value: function insertarPermisos(idUsuario, posicionUsuario) {
      var _this6 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into PermisosUsuarios (usuarioID, variable, indicador, riesgo, riesgoIntegral, usuario, lista, alarma ) values (" + idUsuario + ",'" + _this6.state.permisosUsuarios[posicionUsuario].variable + "','" + _this6.state.permisosUsuarios[posicionUsuario].indicador + "','" + _this6.state.permisosUsuarios[posicionUsuario].riesgo + "','" + _this6.state.permisosUsuarios[posicionUsuario].riesgoIntegral + "','" + _this6.state.permisosUsuarios[posicionUsuario].usuario + "','" + _this6.state.permisosUsuarios[posicionUsuario].lista + "','" + _this6.state.permisosUsuarios[posicionUsuario].alarma + "')", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {});
          }
        });
      }); // fin transaction
    }
  }, {
    key: "openModal",
    value: function openModal(index) {
      this.setState({
        mostrarModal: true,
        tituloModal: "Modificar: " + this.state.usuarios[index].nombreCompleto,
        nombreUsuarioSeleccionado: this.state.usuarios[index].nombreCompleto,
        usuarioUsuarioSeleccionado: this.state.usuarios[index].usuario,
        contrasenaUsuarioSeleccionado: this.state.usuarios[index].contrasena,
        posUsuarioSeleccionado: index,
        permisoSeleccionado: this.state.permisosUsuarios[index]
      });
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.setState({
        mostrarModal: false,
        tituloModal: "",
        nombreUsuarioSeleccionado: "",
        usuarioUsuarioSeleccionado: "",
        contrasenaUsuarioSeleccionado: "",
        posUsuarioSeleccionado: -1,
        permisoSeleccionado: null
      });
    }
  }, {
    key: "editUser",
    value: function editUser() {
      var _this7 = this;

      var nombreCompleto = $("#nombreCompletoEdit").val();
      var usuario = $("#usuarioEdit").val();
      var contrasena = $("#contrasenaEdit").val();

      if (nombreCompleto.length > 0 && nombreCompleto.length < 101) {
        if (usuario.length > 0 && usuario.length < 26) {
          if (contrasena.length > 0 && contrasena.length < 51) {
            var transaction = new _mssql["default"].Transaction(this.props.pool);
            transaction.begin(function (err) {
              var rolledBack = false;
              transaction.on('rollback', function (aborted) {
                rolledBack = true;
              });
              var request = new _mssql["default"].Request(transaction);
              request.query("update Usuarios set nombreCompleto = '" + nombreCompleto + "', usuario = '" + usuario + "', contrasena = '" + contrasena + "' where ID = " + _this7.state.usuarios[_this7.state.posUsuarioSeleccionado].ID, function (err, result) {
                if (err) {
                  if (!rolledBack) {
                    console.log(err);
                    transaction.rollback(function (err) {});
                  }
                } else {
                  transaction.commit(function (err) {
                    var permisosVariable = '',
                        permisosIndicador = '',
                        permisosRiesgo = '',
                        permisosRiesgoIntegral = '',
                        permisosUsuario = '',
                        permisosLista = '',
                        permisosAlarma = '';

                    if ($("#variableCalculoEdit").is(':checked')) {
                      permisosVariable += 'C';
                    }

                    if ($("#indicadorCalculoEdit").is(':checked')) {
                      permisosIndicador += 'C';
                    }

                    if ($("#riesgoCalculoEdit").is(':checked')) {
                      permisosRiesgo += 'C';
                    }

                    if ($("#riesgoIntegralCalculoEdit").is(':checked')) {
                      permisosRiesgoIntegral += 'C';
                    }

                    if ($("#usuarioCalculoEdit").is(':checked')) {
                      permisosUsuario += 'C';
                    }

                    if ($("#listaCalculoEdit").is(':checked')) {
                      permisosLista += 'C';
                    }

                    if ($("#alarmaCalculoEdit").is(':checked')) {
                      permisosAlarma += 'C';
                    }

                    if ($("#variableVerEdit").is(':checked')) {
                      if (permisosVariable.length > 0) permisosVariable += '/';
                      permisosVariable += 'V';
                    }

                    if ($("#indicadorVerEdit").is(':checked')) {
                      if (permisosIndicador.length > 0) permisosIndicador += '/';
                      permisosIndicador += 'V';
                    }

                    if ($("#riesgoVerEdit").is(':checked')) {
                      if (permisosRiesgo.length > 0) permisosRiesgo += '/';
                      permisosRiesgo += 'V';
                    }

                    if ($("#riesgoIntegralVerEdit").is(':checked')) {
                      if (permisosRiesgoIntegral.length > 0) permisosRiesgoIntegral += '/';
                      permisosRiesgoIntegral += 'V';
                    }

                    if ($("#usuarioVerEdit").is(':checked')) {
                      if (permisosUsuario.length > 0) permisosUsuario += '/';
                      permisosUsuario += 'V';
                    }

                    if ($("#listaVerEdit").is(':checked')) {
                      if (permisosLista.length > 0) permisosLista += '/';
                      permisosLista += 'V';
                    }

                    if ($("#alarmaVerEdit").is(':checked')) {
                      if (permisosAlarma.length > 0) permisosAlarma += '/';
                      permisosAlarma += 'V';
                    }

                    if ($("#variableEditarEdit").is(':checked')) {
                      if (permisosVariable.length > 0) permisosVariable += '/';
                      permisosVariable += 'E';
                    }

                    if ($("#indicadorEditarEdit").is(':checked')) {
                      if (permisosIndicador.length > 0) permisosIndicador += '/';
                      permisosIndicador += 'E';
                    }

                    if ($("#riesgoEditarEdit").is(':checked')) {
                      if (permisosRiesgo.length > 0) permisosRiesgo += '/';
                      permisosRiesgo += 'E';
                    }

                    if ($("#riesgoIntegralEditarEdit").is(':checked')) {
                      if (permisosRiesgoIntegral.length > 0) permisosRiesgoIntegral += '/';
                      permisosRiesgoIntegral += 'E';
                    }

                    if ($("#usuarioEditarEdit").is(':checked')) {
                      if (permisosUsuario.length > 0) permisosUsuario += '/';
                      permisosUsuario += 'E';
                    }

                    if ($("#listaEditarEdit").is(':checked')) {
                      if (permisosLista.length > 0) permisosLista += '/';
                      permisosLista += 'E';
                    }

                    if ($("#alarmaEditarEdit").is(':checked')) {
                      if (permisosAlarma.length > 0) permisosAlarma += '/';
                      permisosAlarma += 'E';
                    }

                    var permisoUsuarios = {
                      variable: permisosVariable,
                      indicador: permisosIndicador,
                      riesgo: permisosRiesgo,
                      riesgoIntegral: permisosRiesgoIntegral,
                      usuario: permisosUsuario,
                      lista: permisosLista,
                      alarma: permisosAlarma
                    };

                    var copyPermisos = _toConsumableArray(_this7.state.permisosUsuarios);

                    var idPermiso = copyPermisos[_this7.state.posUsuarioSeleccionado].ID;
                    copyPermisos[_this7.state.posUsuarioSeleccionado] = permisoUsuarios;

                    _this7.setState({
                      mensajeModal: {
                        mostrarMensaje: false,
                        mensajeConfirmado: true,
                        esError: false,
                        esConfirmar: false,
                        titulo: "",
                        mensaje: "",
                        banderaMetodoInit: "",
                        idElementoSelec: _this7.state.mensajeModal.idElementoSelec,
                        indiceX: _this7.state.mensajeModal.indiceX
                      },
                      permisosUsuarios: copyPermisos
                    });

                    _this7.showSuccesMessage("Exito", "Usuario modificado con éxito.");

                    _this7.loadUsuarios();

                    var transaction = new _mssql["default"].Transaction(_this7.props.pool);
                    transaction.begin(function (err) {
                      var rolledBack = false;
                      transaction.on('rollback', function (aborted) {
                        rolledBack = true;
                      });
                      var request = new _mssql["default"].Request(transaction);
                      request.query("update PermisosUsuarios set variable = '" + permisosVariable + "', indicador = '" + permisosIndicador + "', riesgo = '" + permisosRiesgo + "', riesgoIntegral = '" + permisosRiesgoIntegral + "', usuario = '" + permisosUsuario + "', lista = '" + permisosLista + "', alarma = '" + permisosAlarma + "' where ID = " + idPermiso, function (err, result) {
                        if (err) {
                          if (!rolledBack) {
                            console.log(err);
                            transaction.rollback(function (err) {});
                          }
                        } else {
                          transaction.commit(function (err) {});
                        }
                      });
                    }); // fin transaction
                  });
                }
              });
            }); // fin transaction
          } else {
            if (contrasena.length == 0) {
              alert('Ingrese un valor para el campo de contraseña.');
            } else {
              alert('El valor para el campo de contraseña debe ser menor a 51 caracteres.');
            }
          }
        } else {
          if (usuario.length == 0) {
            alert('Ingrese un valor para el campo de usuario.');
          } else {
            alert('El valor para el campo de usuario debe ser menor a 26 caracteres.');
          }
        }
      } else {
        if (nombreCompleto.length == 0) {
          alert('Ingrese un valor para el campo de nombre completo.');
        } else {
          alert('El valor para el campo de nombre completo debe ser menor a 101 caracteres.');
        }
      }
    }
  }, {
    key: "deleteUser",
    value: function deleteUser(idUsuario, posicionUsuario) {
      var _this8 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("delete from Usuarios where ID = " + idUsuario, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this8.setState({
                mensajeModal: {
                  mostrarMensaje: false,
                  mensajeConfirmado: true,
                  esError: false,
                  esConfirmar: false,
                  titulo: "",
                  mensaje: "",
                  banderaMetodoInit: "",
                  idElementoSelec: _this8.state.mensajeModal.idElementoSelec,
                  indiceX: _this8.state.mensajeModal.indiceX
                }
              });

              _this8.showSuccesMessage("Exito", "Usuario eliminado con éxito.");

              _this8.loadUsuarios();

              var transaction = new _mssql["default"].Transaction(_this8.props.pool);
              transaction.begin(function (err) {
                var rolledBack = false;
                transaction.on('rollback', function (aborted) {
                  rolledBack = true;
                });
                var request = new _mssql["default"].Request(transaction);
                request.query("delete from PermisosUsuarios where ID = " + _this8.state.permisosUsuarios[posicionUsuario].ID, function (err, result) {
                  if (err) {
                    if (!rolledBack) {
                      console.log(err);
                      transaction.rollback(function (err) {});
                    }
                  } else {
                    transaction.commit(function (err) {});
                  }
                });
              }); // fin transaction
            });
          }
        });
      }); // fin transaction
    }
    /*======_______====== ======_______======   MENSAJES MODAL    ======_______====== ======_______======*/

    /*======_______======                                                             ======_______======*/

    /*======_______======                                                             ======_______======*/

    /*======_______====== ======_______====== ==_____==  ==___==  ======_______====== ======_______======*/

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
          mensaje: "",
          banderaMetodoInit: "",
          idElementoSelec: -1,
          indiceX: -1
        }
      });
    }
  }, {
    key: "showSuccesMessage",
    value: function showSuccesMessage(titulo, mensaje) {
      this.setState({
        mensajeModal: {
          mostrarMensaje: true,
          mensajeConfirmado: false,
          esError: false,
          esConfirmar: false,
          titulo: titulo,
          mensaje: mensaje,
          banderaMetodoInit: "",
          idElementoSelec: this.state.mensajeModal.idElementoSelec,
          indiceX: this.state.mensajeModal.indiceX
        }
      });
      var self = this;
      setTimeout(function () {
        self.setState({
          mensajeModal: {
            mostrarMensaje: false,
            mensajeConfirmado: false,
            esError: false,
            esConfirmar: false,
            titulo: "",
            mensaje: "",
            banderaMetodoInit: "",
            idElementoSelec: self.state.mensajeModal.idElementoSelec,
            indiceX: self.state.mensajeModal.indiceX
          }
        });
      }, 850);
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

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
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.configuracionHome
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Configuraci\xF3n")), _react["default"].createElement("li", {
        className: "breadcrumb-item font-16 active",
        "aria-current": "page"
      }, "Mantenimiento de Usuarios"))))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card influencer-profile-data"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("h3", null, "Crear Nuevo Usuario"), _react["default"].createElement("div", {
        className: "row border-top"
      }, _react["default"].createElement("div", {
        className: "form-group col-xl-12 col-12"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Nombre Completo"), _react["default"].createElement("input", {
        id: "nombreCompleto",
        type: "text",
        className: "form-control"
      }))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "form-group col-xl-12 col-12"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Nombre de Usuario"), _react["default"].createElement("input", {
        id: "usuario",
        type: "text",
        className: "form-control"
      }))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "form-group col-xl-12 col-12"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Contrase\xF1a"), _react["default"].createElement("input", {
        id: "contrasena",
        type: "password",
        className: "form-control"
      }))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("table", {
        className: "table table-striped"
      }, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        scope: "col"
      }), _react["default"].createElement("th", {
        scope: "col"
      }, "Varibales"), _react["default"].createElement("th", {
        scope: "col"
      }, "Indicadores"), _react["default"].createElement("th", {
        scope: "col"
      }, "Riesgos"), _react["default"].createElement("th", {
        scope: "col"
      }, "Integral"), _react["default"].createElement("th", {
        scope: "col"
      }, "Usuarios"), _react["default"].createElement("th", {
        scope: "col"
      }, "Listas"), _react["default"].createElement("th", {
        scope: "col"
      }, "Alarmas"))), _react["default"].createElement("tbody", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        scope: "row"
      }, "C\xE1lculo"), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("input", {
        id: "variableCalculo",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "indicadorCalculo",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "riesgoCalculo",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "riesgoIntegralCalculo",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "usuarioCalculo",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "listaCalculo",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "alarmaCalculo",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      })))), _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        scope: "row"
      }, "Ver"), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "variableVer",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "indicadorVer",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "riesgoVer",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "riesgoIntegralVer",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "usuarioVer",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "listaVer",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "alarmaVer",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      })))), _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        scope: "row"
      }, "Ver"), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "variableEditar",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "indicadorEditar",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "riesgoEditar",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "riesgoIntegralEditar",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "usuarioEditar",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "listaEditar",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "alarmaEditar",
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("button", {
        onClick: this.insertarUsuario,
        className: "btn btn-success btn-block col-xl-10 col-10",
        style: {
          margin: "0 auto",
          display: "block"
        }
      }, "Crear")))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card influencer-profile-data"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("table", {
        className: "table table-striped"
      }, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        scope: "col"
      }, "#"), _react["default"].createElement("th", {
        scope: "col"
      }, "Nombre Completo"), _react["default"].createElement("th", {
        scope: "col"
      }, "Usuario"), _react["default"].createElement("th", {
        scope: "col"
      }, "Editar"), _react["default"].createElement("th", {
        scope: "col"
      }, "Eliminar"))), _react["default"].createElement("tbody", null, this.state.usuarios.map(function (usuario, i) {
        return _react["default"].createElement("tr", {
          key: usuario.ID
        }, _react["default"].createElement("th", {
          scope: "row"
        }, i + 1), _react["default"].createElement("td", null, usuario.nombreCompleto), _react["default"].createElement("td", null, usuario.usuario), _react["default"].createElement("td", null, _react["default"].createElement("img", {
          onClick: function onClick() {
            return _this9.openModal(i);
          },
          src: "../assets/edit.png",
          style: {
            height: "20px",
            width: "20px",
            cursor: 'pointer'
          }
        })), _react["default"].createElement("td", null, _react["default"].createElement("img", {
          onClick: function onClick() {
            return _this9.deleteUser(usuario.ID, i);
          },
          src: "../assets/trash.png",
          style: {
            height: "20px",
            width: "20px",
            cursor: 'pointer'
          }
        })));
      }))))))), this.state.mensajeModal.mostrarMensaje ? _react["default"].createElement(_MessageModal["default"], {
        esError: this.state.mensajeModal.esError,
        esConfirmar: this.state.mensajeModal.esConfirmar,
        dismissMessage: this.dismissMessageModal,
        confirmFunction: this.confirmMessageModal,
        titulo: this.state.mensajeModal.titulo,
        mensaje: this.state.mensajeModal.mensaje
      }, " ") : _react["default"].createElement("span", null), _react["default"].createElement(_Modal["default"], {
        show: this.state.mostrarModal,
        titulo: this.state.tituloModal,
        onClose: this.closeModal
      }, _react["default"].createElement("h3", null, "Crear Nuevo Usuario"), _react["default"].createElement("div", {
        className: "row border-top"
      }, _react["default"].createElement("div", {
        className: "form-group col-xl-12 col-12"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Nombre Completo"), _react["default"].createElement("input", {
        id: "nombreCompletoEdit",
        type: "text",
        defaultValue: this.state.nombreUsuarioSeleccionado,
        className: "form-control"
      }))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "form-group col-xl-12 col-12"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Nombre de Usuario"), _react["default"].createElement("input", {
        id: "usuarioEdit",
        type: "text",
        defaultValue: this.state.usuarioUsuarioSeleccionado,
        className: "form-control"
      }))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "form-group col-xl-12 col-12"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Contrase\xF1a"), _react["default"].createElement("input", {
        id: "contrasenaEdit",
        type: "password",
        defaultValue: this.state.contrasenaUsuarioSeleccionado,
        className: "form-control"
      }))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("table", {
        className: "table table-striped"
      }, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        scope: "col"
      }), _react["default"].createElement("th", {
        scope: "col"
      }, "Varibales"), _react["default"].createElement("th", {
        scope: "col"
      }, "Indicadores"), _react["default"].createElement("th", {
        scope: "col"
      }, "Riesgos"), _react["default"].createElement("th", {
        scope: "col"
      }, "Integral"), _react["default"].createElement("th", {
        scope: "col"
      }, "Usuarios"), _react["default"].createElement("th", {
        scope: "col"
      }, "Listas"), _react["default"].createElement("th", {
        scope: "col"
      }, "Alarmas"))), _react["default"].createElement("tbody", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        scope: "row"
      }, "C\xE1lculo"), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "variableCalculoEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.variable.indexOf("C") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "indicadorCalculoEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.indicador.indexOf("C") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "riesgoCalculoEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.riesgo.indexOf("C") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "riesgoIntegralCalculoEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.riesgoIntegral.indexOf("C") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "usuarioCalculoEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.usuario.indexOf("C") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "listaCalculoEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.lista.indexOf("C") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "alarmaCalculoEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.alarma.indexOf("C") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      })))), _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        scope: "row"
      }, "Ver"), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "variableVerEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.variable.indexOf("V") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "indicadorVerEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.indicador.indexOf("V") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "riesgoVerEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.riesgo.indexOf("V") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "riesgoIntegralVerEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.riesgoIntegral.indexOf("V") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "usuarioVerEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.usuario.indexOf("V") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "listaVerEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.lista.indexOf("V") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "alarmaVerEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.alarma.indexOf("V") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      })))), _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        scope: "row"
      }, "Ver"), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "variableEditarEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.variable.indexOf("E") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "indicadorEditarEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.indicador.indexOf("E") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "riesgoEditarEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.riesgo.indexOf("E") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "riesgoIntegralEditarEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.riesgoIntegral.indexOf("E") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "usuarioEditarEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.usuario.indexOf("E") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "listaEditarEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.lista.indexOf("E") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("td", {
        scope: "row"
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox"
      }, _react["default"].createElement("input", {
        id: "alarmaEditarEdit",
        type: "checkbox",
        defaultChecked: this.state.permisoSeleccionado != null ? this.state.permisoSeleccionado.alarma.indexOf("E") >= 0 ? true : false : false,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("button", {
        onClick: this.editUser,
        className: "btn btn-success btn-block col-xl-10 col-10",
        style: {
          margin: "0 auto",
          display: "block"
        }
      }, "Modificar"))));
    }
  }]);

  return MantenimientoUsuarios;
}(_react["default"].Component);

exports["default"] = MantenimientoUsuarios;
//# sourceMappingURL=MantenimientoUsuarios.js.map
