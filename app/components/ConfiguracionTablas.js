"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _Accordion = _interopRequireDefault(require("./Accordion/Accordion.js"));

var _InlineEdit = _interopRequireDefault(require("./InlineEdit.js"));

var _ErrorMessage = _interopRequireDefault(require("./ErrorMessage.js"));

var _MessageModal = _interopRequireDefault(require("./MessageModal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var campos = [{
  nombre: "varchar"
}, {
  nombre: "bit"
}, {
  nombre: "date"
}, {
  nombre: "int"
}];
var funciones = [{
  funcion: "idCliente",
  texto: "ID de Cliente"
}, {
  funcion: "fecha",
  texto: "fecha"
}, {
  nombre: "date"
}, {
  nombre: "int"
}];

var ConfiguracionTablas =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ConfiguracionTablas, _React$Component);

  function ConfiguracionTablas(props) {
    var _this;

    _classCallCheck(this, ConfiguracionTablas);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConfiguracionTablas).call(this, props));
    _this.state = {
      tablas: [],
      errorCreacionTabla: {
        campo: "",
        descripcion: "",
        mostrar: false
      },
      errorCreacionCampo: {
        campo: "",
        descripcion: "",
        mostrar: false
      },
      errorModificarCampo: {
        campo: "",
        descripcion: "",
        mostrar: false
      },
      camposTablas: [],
      mensajeModal: {
        mostrarMensaje: false,
        mensajeConfirmado: false,
        esError: false,
        esConfirmar: false,
        titulo: "",
        mensaje: "",
        banderaMetodoInit: "",
        idElementoSelec: -1,
        indiceX: -1,
        indiceY: -1
      }
    };
    _this.loadTables = _this.loadTables.bind(_assertThisInitialized(_this));
    _this.loadFields = _this.loadFields.bind(_assertThisInitialized(_this));
    _this.insertTable = _this.insertTable.bind(_assertThisInitialized(_this));
    _this.deleteTableConfirmation = _this.deleteTableConfirmation.bind(_assertThisInitialized(_this));
    _this.deleteTable = _this.deleteTable.bind(_assertThisInitialized(_this));
    _this.insertField = _this.insertField.bind(_assertThisInitialized(_this));
    _this.updateFieldsConfirmation = _this.updateFieldsConfirmation.bind(_assertThisInitialized(_this));
    _this.updateField = _this.updateField.bind(_assertThisInitialized(_this));
    _this.deleteFieldsConfirmation = _this.deleteFieldsConfirmation.bind(_assertThisInitialized(_this));
    _this.deleteField = _this.deleteField.bind(_assertThisInitialized(_this));
    _this.dismissTableNewError = _this.dismissTableNewError.bind(_assertThisInitialized(_this));
    _this.dismissFieldNewError = _this.dismissFieldNewError.bind(_assertThisInitialized(_this));
    _this.dismissFieldEditError = _this.dismissFieldEditError.bind(_assertThisInitialized(_this));
    _this.dismissMessageModal = _this.dismissMessageModal.bind(_assertThisInitialized(_this));
    _this.confirmMessageModal = _this.confirmMessageModal.bind(_assertThisInitialized(_this));
    _this.showSuccesMessage = _this.showSuccesMessage.bind(_assertThisInitialized(_this));
    return _this;
  }
  /* mensajeModal <- de state
      //mostrarMensaje:bandera para mostrar modal mensaje en pantalla
      //mensajeConfirmado:retorno del modal mensaje si fue conf
      //esError:bandera para ver que tipo de modal mensaje mostrar
      //esConfirmar:bandera para ver que tipo de modal mensaje mostrar
      //titulo:titulo del modal
      //mensaje:mensaje del modal
      //banderaMetodoInit:variable para ver a que metodo ir cuando regresa de confirmar el modal
      //idElementoSelec:id del elemento que mostro el modal mensaje
      //indiceX:posicion de la tabla en el arreglo que mostro el modal mensaje
      //indiceY:posicion del campo en el arreglo de tablas que mostro el modal mensaje
  */


  _createClass(ConfiguracionTablas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadTables();
    }
  }, {
    key: "loadTables",
    value: function loadTables() {
      var _this2 = this;

      this.setState({
        tablas: [],
        camposTablas: []
      });
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Tablas", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                tablas: result.recordset
              });

              for (var i = 0; i < result.recordset.length; i++) {
                if (_this2.state.camposTablas[i] == undefined || _this2.state.camposTablas[i] == null) {
                  _this2.setState({
                    camposTablas: [].concat(_toConsumableArray(_this2.state.camposTablas), [[]])
                  });
                } //arrTemporalCampos[i].concat(this.loadFields(result.recordset[i].ID));


                _this2.loadFields(result.recordset[i].ID, i);
              }

              ;
              /*this.setState({
                  campos: arrTemporalCampos
              });*/
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "loadFields",
    value: function loadFields(id, index) {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Campos where tablaID = " + id, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
              return [];
            }
          } else {
            transaction.commit(function (err) {
              var campos = _toConsumableArray(_this3.state.camposTablas); // 2. Make a shallow copy of the item you want to mutate


              var campo = _objectSpread({}, campos[index]); // 3. Replace the property you're intested in


              if (isNaN(campo.length)) campo = result.recordset;else {
                campo.concat(result.recordset); //campo: [...this.state.campos, []]
              } // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first

              campos[index] = campo; // 5. Set the state to our new copy

              _this3.setState({
                camposTablas: campos
              });

              return result.recordset;
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "insertTable",
    value: function insertTable() {
      var _this4 = this;

      var nombreTabla = $("#nombreTablaNuevo").val();
      var usuarioTabla = $("#usuarioTablaNuevo").val();
      var contrasenaTabla = $("#contrasenaTablaNuevo").val();
      var servidorTabla = $("#servidorTablaNuevo").val();
      var basedatosTabla = $("#basedatosTablaNuevo").val();
      var tablaTabla = $("#tablaTablaNuevo").val();

      if (nombreTabla.length > 0 && nombreTabla.length < 71) {
        if (usuarioTabla.length > 0 && usuarioTabla.length < 51) {
          if (contrasenaTabla.length > 0 && contrasenaTabla.length < 201) {
            if (servidorTabla.length > 0 && servidorTabla.length < 51) {
              if (basedatosTabla.length > 0 && basedatosTabla.length < 51) {
                if (tablaTabla.length > 0 && tablaTabla.length < 71) {
                  this.setState({
                    errorCreacionTabla: {
                      campo: "",
                      descripcion: "",
                      mostrar: false
                    }
                  });
                  var transaction = new _mssql["default"].Transaction(this.props.pool);
                  transaction.begin(function (err) {
                    var rolledBack = false;
                    transaction.on('rollback', function (aborted) {
                      rolledBack = true;
                    });
                    var request = new _mssql["default"].Request(transaction);
                    request.query("insert into Tablas (Nombre, Usuario, Contrasena, Servidor, BaseDatos, Tabla) values ('" + nombreTabla + "','" + usuarioTabla + "','" + contrasenaTabla + "','" + servidorTabla + "','" + basedatosTabla + "','" + tablaTabla + "')", function (err, result) {
                      if (err) {
                        if (!rolledBack) {
                          console.log(err);
                          transaction.rollback(function (err) {});
                        }
                      } else {
                        transaction.commit(function (err) {
                          /*this.setState({
                              tablas: this.state.tablas.concat({nombre: nombreTabla,usuario: usuarioTabla,contrasena: contrasenaTabla,servidor: servidorTabla,basedatos: basedatosTabla,tabla: tablaTabla})
                          });*/
                          _this4.showSuccesMessage("Exito", "Tabla creada con éxito.");

                          _this4.loadTables();
                        });
                      }
                    });
                  }); // fin transaction
                } else {
                  var campo = "Nombre de la Tabla";
                  var descripcion;
                  if (tablaTabla.length == 0) descripcion = "El campo debe tener una longitud mayor a 0.";else descripcion = "El campo debe tener una longitud menor a 71.";
                  this.setState({
                    errorCreacionTabla: {
                      campo: campo,
                      descripcion: descripcion,
                      mostrar: true
                    }
                  });
                }
              } else {
                var _campo = "Base de Datos de la Tabla";

                var _descripcion;

                if (basedatosTabla.length == 0) _descripcion = "El campo debe tener una longitud mayor a 0.";else _descripcion = "El campo debe tener una longitud menor a 51.";
                this.setState({
                  errorCreacionTabla: {
                    campo: _campo,
                    descripcion: _descripcion,
                    mostrar: true
                  }
                });
              }
            } else {
              var _campo2 = "Servidor de la Tabla";

              var _descripcion2;

              if (servidorTabla.length == 0) _descripcion2 = "El campo debe tener una longitud mayor a 0.";else _descripcion2 = "El campo debe tener una longitud menor a 51.";
              this.setState({
                errorCreacionTabla: {
                  campo: _campo2,
                  descripcion: _descripcion2,
                  mostrar: true
                }
              });
            }
          } else {
            var _campo3 = "Contraseña de la Tabla";

            var _descripcion3;

            if (contrasenaTabla.length == 0) _descripcion3 = "El campo debe tener una longitud mayor a 0.";else _descripcion3 = "El campo debe tener una longitud menor a 201.";
            this.setState({
              errorCreacionTabla: {
                campo: _campo3,
                descripcion: _descripcion3,
                mostrar: true
              }
            });
          }
        } else {
          var _campo4 = "Usuario de la Tabla";

          var _descripcion4;

          if (usuarioTabla.length == 0) _descripcion4 = "El campo debe tener una longitud mayor a 0.";else _descripcion4 = "El campo debe tener una longitud menor a 51.";
          this.setState({
            errorCreacionTabla: {
              campo: _campo4,
              descripcion: _descripcion4,
              mostrar: true
            }
          });
        }
      } else {
        var _campo5 = "Nombre de la Conección";

        var _descripcion5;

        if (nombreTabla.length == 0) _descripcion5 = "El campo debe tener una longitud mayor a 0.";else _descripcion5 = "El campo debe tener una longitud menor a 71.";
        this.setState({
          errorCreacionTabla: {
            campo: _campo5,
            descripcion: _descripcion5,
            mostrar: true
          }
        });
      }
    }
  }, {
    key: "deleteTableConfirmation",
    value: function deleteTableConfirmation(id, x) {
      this.setState({
        mensajeModal: {
          mostrarMensaje: true,
          mensajeConfirmado: false,
          esError: false,
          esConfirmar: true,
          titulo: "Confirmación",
          mensaje: "Esta seguro que desea eliminar la tabla?",
          banderaMetodoInit: "goDelTable",
          idElementoSelec: id,
          indiceX: x,
          indiceY: -1
        }
      });
    }
  }, {
    key: "deleteTable",
    value: function deleteTable(id) {
      var _this5 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("delete from Tablas where ID = " + id, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              // 1. Make a shallow copy of the items
              var tablas = _toConsumableArray(_this5.state.tablas); // 3. Replace the property you're intested in


              tablas.splice(_this5.state.mensajeModal.indiceX, 1); // 5. Set the state to our new copy
              //this.loadTables();

              _this5.setState({
                tablas: tablas,
                mensajeModal: {
                  mostrarMensaje: false,
                  mensajeConfirmado: true,
                  esError: false,
                  esConfirmar: false,
                  titulo: "",
                  mensaje: "",
                  banderaMetodoInit: "",
                  idElementoSelec: _this5.state.mensajeModal.idElementoSelec,
                  indiceX: _this5.state.mensajeModal.indiceX,
                  indiceY: _this5.state.mensajeModal.indiceY
                }
              });

              _this5.showSuccesMessage("Exito", "Tabla eliminada con éxito.");
              /*this.setState({
                  tablas: quitando tabla,
                  mensajeModal: limpiando variables del modal
              });*/

            });
          }
        });
      }); // fin transaction

      var transaction2 = new _mssql["default"].Transaction(this.props.pool);
      transaction2.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request2 = new _mssql["default"].Request(transaction2);
        request2.query("delete from Campos where tablaID = " + id, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction2.rollback(function (err) {});
            }
          } else {
            transaction2.commit(function (err) {
              console.log(result.rowsAffected);

              if (result.rowsAffected[0] > 0) {
                var tablas = _toConsumableArray(_this5.state.camposTablas);

                tablas.splice(_this5.state.mensajeModal.indiceX, 1);
                /*let campos = [...tablas[this.state.mensajeModal.indiceX]];
                campos.splice(this.state.mensajeModal.indiceY, 1);
                tablas[this.state.mensajeModal.indiceX] = campos;*/
                //this.loadTables();

                _this5.setState({
                  camposTablas: tablas,
                  mensajeModal: {
                    mostrarMensaje: false,
                    mensajeConfirmado: true,
                    esError: false,
                    esConfirmar: false,
                    titulo: "",
                    mensaje: "",
                    banderaMetodoInit: "",
                    idElementoSelec: _this5.state.mensajeModal.idElementoSelec,
                    indiceX: _this5.state.mensajeModal.indiceX,
                    indiceY: _this5.state.mensajeModal.indiceY
                  }
                });
                /*this.setState({
                    camposTablas: quitando tabla,
                    mensajeModal: limpiando variables del modal
                });*/

              }
            });
          }
        });
      }); // fin transaction2
    }
  }, {
    key: "insertField",
    value: function insertField(indexTabla) {
      var _this6 = this;

      var idTabla = this.state.tablas[indexTabla].ID;
      var campoNombre = $("#campoNombre" + indexTabla).val();
      var tipoCampo = $("#campoTipo" + indexTabla).val();
      var funcionCampo = $("#campoTipo" + indexTabla).val();
      var guardarCampo;
      if ($("#campoGuardar" + indexTabla).is(':checked')) guardarCampo = true;else guardarCampo = false;

      if (!isNaN(idTabla) && idTabla.toString().length > 0) {
        if (campoNombre.length > 0 && campoNombre.length < 41) {
          if (tipoCampo.length > 0 && tipoCampo.length < 26) {
            if (guardarCampo != undefined) {
              this.setState({
                errorCreacionCampo: {
                  campo: "",
                  descripcion: "",
                  mostrar: false
                }
              });
              var transaction = new _mssql["default"].Transaction(this.props.pool);
              transaction.begin(function (err) {
                var rolledBack = false;
                transaction.on('rollback', function (aborted) {
                  rolledBack = true;
                });
                var request = new _mssql["default"].Request(transaction);
                request.query("insert into Campos (tablaID, nombre, tipo, guardar) values (" + idTabla + ",'" + campoNombre + "','" + tipoCampo + "','" + guardarCampo + "')", function (err, result) {
                  if (err) {
                    if (!rolledBack) {
                      console.log(err);
                      transaction.rollback(function (err) {});
                    }
                  } else {
                    transaction.commit(function (err) {
                      _this6.loadTables();

                      _this6.setState({
                        mensajeModal: {
                          mostrarMensaje: true,
                          mensajeConfirmado: _this6.state.mensajeModal.mostrarMensaje,
                          esError: false,
                          esConfirmar: false,
                          titulo: "Exito",
                          mensaje: "Campo creado con éxito.",
                          banderaMetodoInit: "",
                          idElementoSelec: -1,
                          indiceX: -1,
                          indiceY: -1
                        }
                      });

                      _this6.showSuccesMessage("Exito", "Campo creado con éxito.");
                      /* mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: -1, indiceX: -1, indiceY: -1} */

                    });
                  }
                });
              }); // fin transaction
            } else {
              var campo = "Guardar Campo";
              var descripcion;
              if (guardarCampo.length == 0) descripcion = "El campo debe ser ingresado.";
              this.setState({
                errorCreacionCampo: {
                  campo: campo,
                  descripcion: descripcion,
                  mostrar: true
                }
              });
            }
          } else {
            var _campo6 = "Tipo de Campo";

            var _descripcion6;

            if (tipoCampo.length == 0) _descripcion6 = "El campo debe tener una longitud mayor a 0.";else _descripcion6 = "El campo debe tener una longitud menor a 26.";
            this.setState({
              errorCreacionCampo: {
                campo: _campo6,
                descripcion: _descripcion6,
                mostrar: true
              }
            });
          }
        } else {
          var _campo7 = "Nombre de Campo";

          var _descripcion7;

          if (campoNombre.length == 0) _descripcion7 = "El campo debe tener una longitud mayor a 0.";else _descripcion7 = "El campo debe tener una longitud menor a 41.";
          this.setState({
            errorCreacionCampo: {
              campo: _campo7,
              descripcion: _descripcion7,
              mostrar: true
            }
          });
        }
      } else {
        var _campo8 = "ID de tabla/conección";
        var _descripcion8 = "Ingrese un número válido.";
        this.setState({
          errorCreacionCampo: {
            campo: _campo8,
            descripcion: _descripcion8,
            mostrar: true
          }
        });
      }
    }
  }, {
    key: "updateFieldsConfirmation",
    value: function updateFieldsConfirmation(id, x, y) {
      this.setState({
        mensajeModal: {
          mostrarMensaje: true,
          mensajeConfirmado: false,
          esError: false,
          esConfirmar: true,
          titulo: "Confirmación",
          mensaje: "Esta seguro que desea modificar el campo?",
          banderaMetodoInit: "goUpdField",
          idElementoSelec: id,
          indiceX: x,
          indiceY: y
        }
      });
    }
  }, {
    key: "updateField",
    value: function updateField(id, indexTabla, indexCampo) {
      var _this7 = this;

      var idTabla = $("#campoTablaID" + indexTabla + indexCampo).val();
      var campoNombre;

      if ($("#campoNombre" + indexTabla + indexCampo).length > 0) {
        campoNombre = $("#campoNombre" + indexTabla + indexCampo).val();
      } else {
        campoNombre = this.state.camposTablas[indexTabla][indexCampo].nombre;
      }

      var tipoCampo = $("#campoTipo" + indexTabla + indexCampo).val();
      var guardarCampo;
      if ($("#campoGuardar" + indexTabla + indexCampo).is(':checked')) guardarCampo = true;else guardarCampo = false;

      if (!isNaN(idTabla) && idTabla.toString().length > 0) {
        if (campoNombre.length > 0 && campoNombre.length < 41) {
          if (tipoCampo.length > 0 && tipoCampo.length < 26) {
            if (guardarCampo != undefined) {
              this.setState({
                errorModificarCampo: {
                  campo: "",
                  descripcion: "",
                  mostrar: false
                }
              });
              var transaction = new _mssql["default"].Transaction(this.props.pool);
              transaction.begin(function (err) {
                var rolledBack = false;
                transaction.on('rollback', function (aborted) {
                  rolledBack = true;
                });
                var request = new _mssql["default"].Request(transaction);
                request.query("update Campos set tablaID = " + idTabla + ", nombre = '" + campoNombre + "', tipo = '" + tipoCampo + "', guardar = '" + guardarCampo + "' where ID = " + id, function (err, result) {
                  if (err) {
                    if (!rolledBack) {
                      console.log(err);

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
                          indiceX: _this7.state.mensajeModal.indiceX,
                          indiceY: _this7.state.mensajeModal.indiceY
                        }
                      });

                      transaction.rollback(function (err) {});
                    }
                  } else {
                    transaction.commit(function (err) {
                      // 1. Make a shallow copy of the items
                      var campos = _toConsumableArray(_this7.state.camposTablas); // 2. Make a shallow copy of the item you want to mutate


                      var campo = _toConsumableArray(campos[indexTabla]); // 3. Replace the property you're intested in


                      campo[indexCampo] = {
                        ID: campo[indexCampo].ID,
                        idTabla: idTabla,
                        campoNombre: campoNombre,
                        tipoCampo: tipoCampo,
                        guardar: guardarCampo
                      }; // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first

                      campos[indexTabla] = campo; // 5. Set the state to our new copy
                      //this.loadTables();

                      _this7.setState({
                        camposTablas: campos,
                        mensajeModal: {
                          mostrarMensaje: false,
                          mensajeConfirmado: true,
                          esError: false,
                          esConfirmar: false,
                          titulo: "",
                          mensaje: "",
                          banderaMetodoInit: "",
                          idElementoSelec: _this7.state.mensajeModal.idElementoSelec,
                          indiceX: _this7.state.mensajeModal.indiceX,
                          indiceY: _this7.state.mensajeModal.indiceY
                        }
                      });

                      _this7.showSuccesMessage("Exito", "Campo modificado con éxito.");
                    });
                  }
                });
              }); // fin transaction
            } else {
              var campo = "Guardar Campo";
              var descripcion;
              if (guardarCampo.length == 0) descripcion = "El campo debe ser ingresado.";
              this.setState({
                errorModificarCampo: {
                  campo: campo,
                  descripcion: descripcion,
                  mostrar: true
                },
                mensajeModal: {
                  mostrarMensaje: false,
                  mensajeConfirmado: true,
                  esError: false,
                  esConfirmar: false,
                  titulo: "",
                  mensaje: "",
                  banderaMetodoInit: "",
                  idElementoSelec: this.state.mensajeModal.idElementoSelec,
                  indiceX: this.state.mensajeModal.indiceX,
                  indiceY: this.state.mensajeModal.indiceY
                }
              });
              /*this.setState({
                  mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
              });*/
            }
          } else {
            var _campo9 = "Tipo de Campo";

            var _descripcion9;

            if (tipoCampo.length == 0) _descripcion9 = "El campo debe tener una longitud mayor a 0.";else _descripcion9 = "El campo debe tener una longitud menor a 26.";
            this.setState({
              errorModificarCampo: {
                campo: _campo9,
                descripcion: _descripcion9,
                mostrar: true
              },
              mensajeModal: {
                mostrarMensaje: false,
                mensajeConfirmado: true,
                esError: false,
                esConfirmar: false,
                titulo: "",
                mensaje: "",
                banderaMetodoInit: "",
                idElementoSelec: this.state.mensajeModal.idElementoSelec,
                indiceX: this.state.mensajeModal.indiceX,
                indiceY: this.state.mensajeModal.indiceY
              }
            });
            /*this.setState({
                mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
            });*/
          }
        } else {
          var _campo10 = "Nombre de Campo";

          var _descripcion10;

          if (campoNombre.length == 0) _descripcion10 = "El campo debe tener una longitud mayor a 0.";else _descripcion10 = "El campo debe tener una longitud menor a 41.";
          this.setState({
            errorModificarCampo: {
              campo: _campo10,
              descripcion: _descripcion10,
              mostrar: true
            },
            mensajeModal: {
              mostrarMensaje: false,
              mensajeConfirmado: true,
              esError: false,
              esConfirmar: false,
              titulo: "",
              mensaje: "",
              banderaMetodoInit: "",
              idElementoSelec: this.state.mensajeModal.idElementoSelec,
              indiceX: this.state.mensajeModal.indiceX,
              indiceY: this.state.mensajeModal.indiceY
            }
          });
          /*this.setState({
              mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
          });*/
        }
      } else {
        var _campo11 = "ID de nombre de tabla/conección";
        var _descripcion11 = "Ingrese un número válido.";
        this.setState({
          errorModificarCampo: {
            campo: _campo11,
            descripcion: _descripcion11,
            mostrar: true
          },
          mensajeModal: {
            mostrarMensaje: false,
            mensajeConfirmado: true,
            esError: false,
            esConfirmar: false,
            titulo: "",
            mensaje: "",
            banderaMetodoInit: "",
            idElementoSelec: this.state.mensajeModal.idElementoSelec,
            indiceX: this.state.mensajeModal.indiceX,
            indiceY: this.state.mensajeModal.indiceY
          }
        });
        /*this.setState({
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
        });*/
      }
    }
  }, {
    key: "deleteFieldsConfirmation",
    value: function deleteFieldsConfirmation(id, x, y) {
      this.setState({
        mensajeModal: {
          mostrarMensaje: true,
          mensajeConfirmado: false,
          esError: false,
          esConfirmar: true,
          titulo: "Confirmación",
          mensaje: "Esta seguro que desea eliminar el campo?",
          banderaMetodoInit: "goDelField",
          idElementoSelec: id,
          indiceX: x,
          indiceY: y
        }
      });
    }
  }, {
    key: "deleteField",
    value: function deleteField(id) {
      var _this8 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("delete from Campos where ID = " + id, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);

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
                  indiceX: _this8.state.mensajeModal.indiceX,
                  indiceY: _this8.state.mensajeModal.indiceY
                }
              });

              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var tablas = _toConsumableArray(_this8.state.camposTablas);

              var campos = _toConsumableArray(tablas[_this8.state.mensajeModal.indiceX]);

              campos.splice(_this8.state.mensajeModal.indiceY, 1);
              tablas[_this8.state.mensajeModal.indiceX] = campos; //this.loadTables();

              _this8.setState({
                camposTablas: tablas,
                mensajeModal: {
                  mostrarMensaje: false,
                  mensajeConfirmado: true,
                  esError: false,
                  esConfirmar: false,
                  titulo: "",
                  mensaje: "",
                  banderaMetodoInit: "",
                  idElementoSelec: _this8.state.mensajeModal.idElementoSelec,
                  indiceX: _this8.state.mensajeModal.indiceX,
                  indiceY: _this8.state.mensajeModal.indiceY
                }
              });

              _this8.showSuccesMessage("Exito", "Campo eliminado con éxito.");
              /*this.setState({
                  camposTablas: quitando tabla,
                  mensajeModal: limpiando variables del modal
              });*/

            });
          }
        });
      }); // fin transaction
    }
    /*======_______====== ======_______======   MENSAJES ERROR DE CAMPOS    ======_______====== ======_______======*/

    /*======_______======                                                                       ======_______======*/

    /*======_______======                                                                       ======_______======*/

    /*======_______====== ======_______====== ====_____====  ====_____====  ======_______====== ======_______======*/

  }, {
    key: "dismissTableNewError",
    value: function dismissTableNewError() {
      this.setState({
        errorCreacionTabla: {
          campo: "",
          descripcion: "",
          mostrar: false
        }
      });
    }
  }, {
    key: "dismissFieldNewError",
    value: function dismissFieldNewError() {
      this.setState({
        errorCreacionCampo: {
          campo: "",
          descripcion: "",
          mostrar: false
        }
      });
    }
  }, {
    key: "dismissFieldEditError",
    value: function dismissFieldEditError() {
      this.setState({
        errorModificarCampo: {
          campo: "",
          descripcion: "",
          mostrar: false
        }
      });
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
          indiceX: -1,
          indiceY: -1
        }
      });
    }
  }, {
    key: "confirmMessageModal",
    value: function confirmMessageModal() {
      if (this.state.mensajeModal.banderaMetodoInit.localeCompare("goDelTable") == 0) {
        var copiaID = this.state.mensajeModal.idElementoSelec;
        this.deleteTable(copiaID);
      } else if (this.state.mensajeModal.banderaMetodoInit.localeCompare("goDelField") == 0) {
        var _copiaID = this.state.mensajeModal.idElementoSelec;
        this.deleteField(_copiaID);
      } else if (this.state.mensajeModal.banderaMetodoInit.localeCompare("goUpdField") == 0) {
        var _copiaID2 = this.state.mensajeModal.idElementoSelec;
        this.updateField(_copiaID2, this.state.mensajeModal.indiceX, this.state.mensajeModal.indiceY);
      }
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
          indiceX: this.state.mensajeModal.indiceX,
          indiceY: this.state.mensajeModal.indiceY
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
            indiceX: self.state.mensajeModal.indiceX,
            indiceY: self.state.mensajeModal.indiceY
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
        className: "breadcrumb-item",
        "aria-current": "page",
        onClick: this.props.showConfigurationComponent
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Configuraci\xF3n")), _react["default"].createElement("li", {
        className: "breadcrumb-item active",
        "aria-current": "page"
      }, "Tablas"))))))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12",
        style: {
          width: "100%"
        }
      }, this.state.tablas.map(function (tabla, i) {
        return _react["default"].createElement(_Accordion["default"], {
          key: tabla.ID,
          showTrash: true,
          deleteVariable: function deleteVariable() {
            return _this9.deleteTableConfirmation(tabla.ID, i);
          },
          allowMultipleOpen: true
        }, _react["default"].createElement("div", {
          label: tabla.nombre,
          className: "border-top"
        }, _this9.state.camposTablas[i] != undefined ? _react["default"].createElement("div", null, _this9.state.camposTablas[i].map(function (campo, j) {
          var _ref;

          return _react["default"].createElement("div", {
            key: campo.ID,
            className: "border-top alert alert-primary",
            style: {
              padding: "1% 3%"
            }
          }, _react["default"].createElement("div", {
            className: "row"
          }, _react["default"].createElement("div", {
            className: "form-group col-xl-6 col-6"
          }, _react["default"].createElement("h4", {
            className: "col-form-label text-center"
          }, "Tabla"), _react["default"].createElement("select", {
            id: "campoTablaID" + i + j,
            className: "form-control",
            defaultValue: campo.tablaID
          }, _react["default"].createElement("option", {
            value: "",
            key: "0"
          }, "Seleccione una tabla..."), _this9.state.tablas.map(function (tabla, k) {
            return _react["default"].createElement("option", {
              value: tabla.ID,
              key: tabla.ID
            }, tabla.nombre);
          }))), _react["default"].createElement("div", {
            className: "form-group col-xl-6 col-6"
          }, _react["default"].createElement("h4", {
            className: "col-form-label text-center"
          }, "Nombre de Campo"), _react["default"].createElement(_InlineEdit["default"], {
            id: "campoNombre" + i + j,
            texto: campo.nombre
          }, " "))), _react["default"].createElement("div", {
            className: "row"
          }, _react["default"].createElement("div", {
            className: "form-group col-xl-6 col-6"
          }, _react["default"].createElement("h4", {
            className: "col-form-label text-center"
          }, "Tipo"), _react["default"].createElement("select", {
            id: "campoTipo" + i + j,
            className: "form-control",
            defaultValue: campo.tipo
          }, _react["default"].createElement("option", {
            value: "",
            key: "0"
          }, "Seleccione un tipo de variable..."), campos.map(function (campoSelect, k) {
            return _react["default"].createElement("option", {
              value: campoSelect.nombre,
              key: k
            }, campoSelect.nombre);
          }))), _react["default"].createElement("div", {
            className: "form-group col-xl-6 col-6"
          }, _react["default"].createElement("h4", {
            className: "col-form-label text-center"
          }, "Guardar Campo en Resultados"), _react["default"].createElement("div", {
            className: "switch-button switch-button-yesno",
            style: {
              margin: "0 auto",
              display: "block"
            }
          }, campo.guardar ? _react["default"].createElement("input", {
            type: "checkbox",
            defaultChecked: true,
            name: "campoGuardar" + i + j,
            id: "campoGuardar" + i + j
          }) : _react["default"].createElement("input", {
            type: "checkbox",
            name: "campoGuardar" + i + j,
            id: "campoGuardar" + i + j
          }), _react["default"].createElement("span", null, _react["default"].createElement("label", {
            htmlFor: "campoGuardar" + i + j
          }))))), _this9.state.errorModificarCampo.mostrar ? _react["default"].createElement(_ErrorMessage["default"], {
            campo: _this9.state.errorModificarCampo.campo,
            descripcion: _this9.state.errorModificarCampo.descripcion,
            dismissTableError: _this9.dismissFieldEditError
          }, " ") : _react["default"].createElement("span", null), _react["default"].createElement("div", {
            className: "row"
          }, _react["default"].createElement("button", {
            onClick: function onClick() {
              return _this9.updateFieldsConfirmation(campo.ID, i, j);
            },
            className: "btn btn-light btn-block col-xl-5 col-5",
            style: {
              margin: "0 auto",
              display: "block"
            }
          }, "Guardar"), _react["default"].createElement("button", {
            onClick: function onClick() {
              return _this9.deleteFieldsConfirmation(campo.ID, i, j);
            },
            className: "btn btn-light btn-block col-xl-1 col-1",
            style: (_ref = {
              margin: "0 auto",
              display: "block"
            }, _defineProperty(_ref, "display", "flex"), _defineProperty(_ref, "alignItems", "center"), _defineProperty(_ref, "justifyContent", "center"), _ref)
          }, _react["default"].createElement("img", {
            onClick: _this9.props.deleteVariable,
            src: "../assets/trash.png",
            style: {
              height: "20px",
              width: "20px"
            }
          }))));
        })) : _react["default"].createElement("span", null), _react["default"].createElement("div", {
          className: "border-top alert alert-primary",
          style: {
            margin: "3% 0%"
          }
        }, _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "form-group col-xl-6 col-6"
        }, _react["default"].createElement("h4", {
          className: "col-form-label text-center"
        }, "Tabla"), _react["default"].createElement("h4", {
          style: {
            fontFamily: 'Circular Std Medium',
            color: "#71748d"
          },
          className: "alert-heading"
        }, tabla.nombre)), _react["default"].createElement("div", {
          className: "form-group col-xl-6 col-6"
        }, _react["default"].createElement("h4", {
          className: "col-form-label text-center"
        }, "Nombre de Campo"), _react["default"].createElement("input", {
          id: "campoNombre" + i,
          type: "text",
          className: "form-control"
        }))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "form-group col-xl-6 col-6"
        }, _react["default"].createElement("h4", {
          className: "col-form-label text-center"
        }, "Tipo"), _react["default"].createElement("select", {
          id: "campoTipo" + i,
          className: "form-control"
          /*onChange={this.checkFieldType.bind(this)}*/

        }, _react["default"].createElement("option", {
          value: "",
          key: "0"
        }, "Seleccione un tipo de variable..."), campos.map(function (campo, k) {
          return _react["default"].createElement("option", {
            value: campo.nombre,
            key: k
          }, campo.nombre);
        }))), _react["default"].createElement("div", {
          className: "form-group col-xl-6 col-6"
        }, _react["default"].createElement("h4", {
          className: "col-form-label text-center"
        }, "Guardar Campo en Resultados"), _react["default"].createElement("div", {
          className: "switch-button switch-button-yesno",
          style: {
            margin: "0 auto",
            display: "block"
          }
        }, _react["default"].createElement("input", {
          type: "checkbox",
          defaultChecked: true,
          name: "campoGuardar" + i,
          id: "campoGuardar" + i
        }), _react["default"].createElement("span", null, _react["default"].createElement("label", {
          htmlFor: "campoGuardar" + i
        }))))), _this9.state.errorCreacionCampo.mostrar ? _react["default"].createElement(_ErrorMessage["default"], {
          campo: _this9.state.errorCreacionCampo.campo,
          descripcion: _this9.state.errorCreacionCampo.descripcion,
          dismissTableError: _this9.dismissFieldNewError
        }, " ") : _react["default"].createElement("span", null), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("button", {
          onClick: function onClick() {
            return _this9.insertField(i);
          },
          className: "btn btn-light btn-block col-xl-10 col-10",
          style: {
            margin: "0 auto",
            display: "block"
          }
        }, "Crear")))));
      }))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card influencer-profile-data"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("h3", null, "Crear Nueva Tabla"), _react["default"].createElement("div", {
        className: "row border-top"
      }, _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Nombre de la Conecci\xF3n"), _react["default"].createElement("input", {
        id: "nombreTablaNuevo",
        type: "text",
        className: "form-control"
      })), _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Usuario de la Tabla"), _react["default"].createElement("input", {
        id: "usuarioTablaNuevo",
        type: "text",
        className: "form-control"
      }))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Contrase\xF1a de la Tabla"), _react["default"].createElement("input", {
        id: "contrasenaTablaNuevo",
        type: "text",
        className: "form-control"
      })), _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Servidor de la Tabla"), _react["default"].createElement("input", {
        id: "servidorTablaNuevo",
        type: "text",
        className: "form-control"
      }))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Base de Datos de la Tabla"), _react["default"].createElement("input", {
        id: "basedatosTablaNuevo",
        type: "text",
        className: "form-control"
      })), _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Nombre de la Tabla"), _react["default"].createElement("input", {
        id: "tablaTablaNuevo",
        type: "text",
        className: "form-control"
      }))), this.state.errorCreacionTabla.mostrar ? _react["default"].createElement(_ErrorMessage["default"], {
        campo: this.state.errorCreacionTabla.campo,
        descripcion: this.state.errorCreacionTabla.descripcion,
        dismissTableError: this.dismissTableNewError
      }, " ") : _react["default"].createElement("span", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("button", {
        onClick: this.insertTable,
        className: "btn btn-success btn-block col-xl-10 col-10",
        style: {
          margin: "0 auto",
          display: "block"
        }
      }, "Crear")))))), this.state.mensajeModal.mostrarMensaje ? _react["default"].createElement(_MessageModal["default"], {
        esError: this.state.mensajeModal.esError,
        esConfirmar: this.state.mensajeModal.esConfirmar,
        dismissMessage: this.dismissMessageModal,
        confirmFunction: this.confirmMessageModal,
        titulo: this.state.mensajeModal.titulo,
        mensaje: this.state.mensajeModal.mensaje
      }, " ") : _react["default"].createElement("span", null));
    }
  }]);

  return ConfiguracionTablas;
}(_react["default"].Component);

exports["default"] = ConfiguracionTablas;
//# sourceMappingURL=ConfiguracionTablas.js.map
