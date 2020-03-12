"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _Campo = _interopRequireDefault(require("./Campo.js"));

var _Operacion = _interopRequireDefault(require("./Operacion.js"));

var _Valor = _interopRequireDefault(require("./Valor.js"));

var _ErrorMessage = _interopRequireDefault(require("../ErrorMessage.js"));

var _MessageModal = _interopRequireDefault(require("../MessageModal.js"));

var _Modal = _interopRequireDefault(require("../Modal/Modal.js"));

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

var campo;

var VariableCreation =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VariableCreation, _React$Component);

  function VariableCreation(props) {
    var _this;

    _classCallCheck(this, VariableCreation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VariableCreation).call(this, props));
    _this.state = {
      tipoCampo: {
        esNumero: true,
        esBoolean: false,
        esFecha: false,
        esTexto: false
      },
      errorCreacionRegla: {
        campo: "",
        descripcion: "",
        mostrar: false
      },
      mensajeModal: {
        mostrarMensaje: false,
        mensajeConfirmado: false,
        esError: false,
        esConfirmar: false,
        titulo: "",
        mensaje: ""
      },
      campoSeleccionadoNombre: '{campo}',
      textoOperacion: '{operación}',
      textoValor: '{valor}',
      showModalCampo: false,
      showModalOperacion: false,
      showModalValor: false
    };
    _this.retornoSeleccionVariable = _this.retornoSeleccionVariable.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionOperacion = _this.retornoSeleccionOperacion.bind(_assertThisInitialized(_this));
    _this.esNumero = _this.esNumero.bind(_assertThisInitialized(_this));
    _this.esBoolean = _this.esBoolean.bind(_assertThisInitialized(_this));
    _this.esFecha = _this.esFecha.bind(_assertThisInitialized(_this));
    _this.esTexto = _this.esTexto.bind(_assertThisInitialized(_this));
    _this.saveRule = _this.saveRule.bind(_assertThisInitialized(_this));
    _this.actualizarValor = _this.actualizarValor.bind(_assertThisInitialized(_this));
    _this.showCampoModal = _this.showCampoModal.bind(_assertThisInitialized(_this));
    _this.showOperacionModal = _this.showOperacionModal.bind(_assertThisInitialized(_this));
    _this.showValorModal = _this.showValorModal.bind(_assertThisInitialized(_this));
    _this.closeCampoModal = _this.closeCampoModal.bind(_assertThisInitialized(_this));
    _this.closeOperacionModal = _this.closeOperacionModal.bind(_assertThisInitialized(_this));
    _this.closeValorModal = _this.closeValorModal.bind(_assertThisInitialized(_this));
    _this.dismissReglaNewError = _this.dismissReglaNewError.bind(_assertThisInitialized(_this));
    _this.showSuccesMessage = _this.showSuccesMessage.bind(_assertThisInitialized(_this));
    _this.dismissMessageModal = _this.dismissMessageModal.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(VariableCreation, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "retornoSeleccionVariable",
    value: function retornoSeleccionVariable(campoSeleccionadoInput) {
      campo = campoSeleccionadoInput[0];
      this.setState({
        campoSeleccionadoNombre: campo.valor
      });
      var nivelRegla = 0;
      if (campo.nivel != undefined) nivelRegla = campo.nivel;
      this.props.actualizarNivelNuevaRegla(nivelRegla);
      this.props.retornoCampo(campo);
    }
  }, {
    key: "retornoSeleccionOperacion",
    value: function retornoSeleccionOperacion(textoOperacionNuevo, operacion) {
      this.setState({
        textoOperacion: textoOperacionNuevo
      });
      this.props.retornoOperacion({
        operacion: operacion,
        operacionTexto: textoOperacionNuevo
      });
    }
  }, {
    key: "esNumero",
    value: function esNumero() {
      this.setState({
        tipoCampo: {
          esNumero: true,
          esBoolean: false,
          esFecha: false,
          esTexto: false
        }
      });
    }
  }, {
    key: "esBoolean",
    value: function esBoolean() {
      this.setState({
        tipoCampo: {
          esNumero: false,
          esBoolean: true,
          esFecha: false,
          esTexto: false
        }
      });
    }
  }, {
    key: "esFecha",
    value: function esFecha() {
      this.setState({
        tipoCampo: {
          esNumero: false,
          esBoolean: false,
          esFecha: true,
          esTexto: false
        }
      });
    }
  }, {
    key: "esTexto",
    value: function esTexto() {
      this.setState({
        tipoCampo: {
          esNumero: false,
          esBoolean: false,
          esFecha: false,
          esTexto: true
        }
      });
    }
  }, {
    key: "saveRule",
    value: function saveRule() {
      var _this2 = this;

      var seleccionCampoIDSelect = $("#campo").val();

      if (seleccionCampoIDSelect.length > 0) {
        var campoTablaID;
        var campoID;
        var campoTipo;
        var operacion;
        var operacionTipo;
        var valorLista; //ID Tabla

        var valorCampos;
        var esListaValor, esCampoValor;
        var texto;

        if (seleccionCampoIDSelect.localeCompare("M0ra") != 0 && seleccionCampoIDSelect.localeCompare("Gr4nDeud0r") != 0 && seleccionCampoIDSelect.localeCompare("P3quDeud0r") != 0) {
          campoTablaID = this.state.campos[seleccionCampoIDSelect].tablaID;
          campoID = this.state.campos[seleccionCampoIDSelect].ID;
          campoTipo = this.state.campos[seleccionCampoIDSelect].tipo;
          operacion = $("input[name='operacionRadio']:checked").val();
          operacionTipo;
          if (operacion != undefined && (operacion.localeCompare("<") == 0 || operacion.localeCompare("<=") == 0 || operacion.localeCompare(">") == 0 || operacion.localeCompare(">=") == 0 || operacion.localeCompare("==") == 0 || operacion.localeCompare("!=") == 0)) operacionTipo = "relacional";else if (operacion != undefined && (operacion.localeCompare("+") == 0 || operacion.localeCompare("-") == 0 || operacion.localeCompare("*") == 0 || operacion.localeCompare("/") == 0)) operacionTipo = "algebraica";else if (operacion != undefined && (operacion.localeCompare("sumIf") == 0 || operacion.localeCompare("sumIfNot") == 0)) operacionTipo = "excel";
          valorLista = $("#selectLista").val(); //ID Tabla

          valorCampos = $("#camposDeLista").val();
          esListaValor, esCampoValor;

          if (valorLista != undefined && valorLista.localeCompare("table") == 0) {
            esListaValor = false;
            esCampoValor = true;
            valorLista = this.props.tablaID;
          } else if (valorLista != undefined && valorLista.length > 0) {
            esListaValor = true;
            esCampoValor = false;
          }

          var operacionTexto;

          if (operacion.localeCompare("==") == 0) {
            operacionTexto = "es igual";
          } else if (operacion.localeCompare("<") == 0) {
            operacionTexto = "es menor";
          } else if (operacion.localeCompare("<=") == 0) {
            operacionTexto = "es menor o igual";
          } else if (operacion.localeCompare(">=") == 0) {
            operacionTexto = "es mayor o igual";
          } else if (operacion.localeCompare(">") == 0) {
            operacionTexto = "es mayor";
          } else if (operacion.localeCompare("!=") == 0) {
            operacionTexto = "no es igual";
          }

          texto = this.state.campos[seleccionCampoIDSelect].nombre + " " + operacionTexto + " ";
        }

        console.log("//////////////////////");
        console.log("//////////////////////");
        console.log("campoTablaID = " + campoTablaID);
        console.log("campoID = " + campoID);
        console.log("campoTipo = " + campoTipo);
        console.log("operacion = " + operacion);
        console.log("operacionTipo = " + operacionTipo);
        console.log("valorLista = " + valorLista);
        console.log("valorCampos = " + valorCampos);
        console.log("esListaValor = " + esListaValor);
        console.log("esCampoValor = " + esCampoValor);
        console.log("+++++++++++++++++++++++");
        console.log("+++++++++++++++++++++++");

        if (!isNaN(campoTablaID) && campoTablaID.toString().length > 0) {
          if (!isNaN(campoID) && campoID.toString().length > 0) {
            if (isNaN(campoTipo) && campoTipo.length > 0) {
              if (operacion != undefined && isNaN(operacion) && operacion.length > 0) {
                if (isNaN(operacionTipo) && operacionTipo.length > 0) {
                  if (valorLista != undefined &&
                  /*!isNaN(valorLista) ||*/
                  valorLista.toString().length > 0) {
                    if (valorCampos.length > 0 && valorCampos.length < 1001) {
                      if (esListaValor != undefined) {
                        if (esCampoValor != undefined) {
                          this.setState({
                            errorCreacionRegla: {
                              campo: '',
                              descripcion: '',
                              mostrar: false
                            }
                          });
                          var tablaNombreValor = 'VariablesdeLista';
                          if (esCampoValor) tablaNombreValor = 'Campos';
                          var textoABuscar = '';

                          for (var i = 0; i < valorCampos.length; i++) {
                            if (textoABuscar.length == 0) {
                              textoABuscar += ' where ID = ' + valorCampos[i];
                            } else {
                              textoABuscar += ' or ID = ' + valorCampos[i];
                            }
                          }

                          ;
                          var transaction = new _mssql["default"].Transaction(this.props.pool);
                          transaction.begin(function (err) {
                            var rolledBack = false;
                            transaction.on('rollback', function (aborted) {
                              rolledBack = true;
                            });
                            var request = new _mssql["default"].Request(transaction);
                            request.query("select * from " + tablaNombreValor + textoABuscar, function (err, result) {
                              if (err) {
                                if (!rolledBack) {
                                  console.log(err);
                                  transaction.rollback(function (err) {});
                                }
                              } else {
                                transaction.commit(function (err) {
                                  for (var i = 0; i < result.recordset.length; i++) {
                                    if (esCampoValor) {
                                      if (i == 0) texto += result.recordset[i].nombre;else texto += ", " + result.recordset[i].nombre;
                                    } else {
                                      if (i == 0) texto += result.recordset[i].valor;else texto += ", " + result.recordset[i].valor;
                                    }
                                  }

                                  ;
                                  var transaction1 = new _mssql["default"].Transaction(_this2.props.pool);
                                  transaction1.begin(function (err) {
                                    var rolledBack = false;
                                    transaction1.on('rollback', function (aborted) {
                                      rolledBack = true;
                                    });
                                    var request1 = new _mssql["default"].Request(transaction1);
                                    request1.query("insert into Reglas (campoTablaID, campoCampoID, campoTipo, operacion, tipoOperacion, valor, valorTipo, esListaValor, esCampoValor, valorTablaID, texto, nombreTablaRes, idTipoTabla) values (" + campoTablaID + ", " + campoID + ", '" + campoTipo + "', '" + operacion + "', '" + operacionTipo + "','" + valorCampos + "', '', '" + esListaValor + "', '" + esCampoValor + "', " + valorLista + ", '" + texto + "', '" + _this2.props.tipoTablaRes + "', " + _this2.props.idTipoTabla + ")", function (err, result) {
                                      if (err) {
                                        if (!rolledBack) {
                                          console.log(err);
                                          transaction1.rollback(function (err) {});
                                        }
                                      } else {
                                        transaction1.commit(function (err) {
                                          _this2.showSuccesMessage("Exito", "Regla creada con éxito.");
                                        });
                                      }
                                    });
                                  }); // fin transaction1
                                });
                              }
                            });
                          }); // fin transaction
                        } else {
                          var _campo = "Es Campo en Valor";
                          var descripcionN;
                          if (esCampoValor != undefined) descripcionN = "El valor debe existir.";
                          this.setState({
                            errorCreacionRegla: {
                              campo: _campo,
                              descripcion: descripcionN,
                              mostrar: true
                            }
                          });
                        }
                      } else {
                        var _campo2 = "Es Lista en Valor";

                        var _descripcionN;

                        if (esListaValor != undefined) _descripcionN = "El valor debe existir.";
                        this.setState({
                          errorCreacionRegla: {
                            campo: _campo2,
                            descripcion: _descripcionN,
                            mostrar: true
                          }
                        });
                      }
                    } else {
                      var _campo3 = "Valor";

                      var _descripcionN2;

                      if (valorCampos.length == 0) _descripcionN2 = "El valor debe tener una longitud mayor a 0.";else if (valorCampos.length < 1001) _descripcionN2 = "El valor debe tener una longitud menor a 1001.";
                      this.setState({
                        errorCreacionRegla: {
                          campo: _campo3,
                          descripcion: _descripcionN2,
                          mostrar: true
                        }
                      });
                    }
                  } else {
                    var _campo4 = "ID de Tabla de Valor";

                    var _descripcionN3;

                    if (valorLista == undefined) _descripcionN3 = "Seleccione un valor para el ID de la tabla del campo de valor.";else if (valorLista.toString().length == 0) _descripcionN3 = "El valor debe tener una longitud mayor a 0.";
                    this.setState({
                      errorCreacionRegla: {
                        campo: _campo4,
                        descripcion: _descripcionN3,
                        mostrar: true
                      }
                    });
                  }
                } else {
                  var _campo5 = "Tipo de Operación";

                  var _descripcionN4;

                  if (isNaN(operacionTipo)) _descripcionN4 = "El tipo de operación no puede ser un número.";else _descripcionN4 = "El tipo de operación debe tener una longitud mayor a 0.";
                  this.setState({
                    errorCreacionRegla: {
                      campo: _campo5,
                      descripcion: _descripcionN4,
                      mostrar: true
                    }
                  });
                }
              } else {
                var _campo6 = "Operación";

                var _descripcionN5;

                if (operacion == undefined) _descripcionN5 = "Seleccione un valor de operación.";else if (isNaN(operacion)) _descripcionN5 = "La operación no puede ser un número.";else _descripcionN5 = "La operación debe tener una longitud mayor a 0.";
                this.setState({
                  errorCreacionRegla: {
                    campo: _campo6,
                    descripcion: _descripcionN5,
                    mostrar: true
                  }
                });
              }
            } else {
              var _campo7 = "Tipo de Campo";
              var _descripcionN6 = "El ID del campo debe ser un valor numérico.";
              this.setState({
                errorCreacionRegla: {
                  campo: _campo7,
                  descripcion: _descripcionN6,
                  mostrar: true
                }
              });
            }
          } else {
            var _campo8 = "ID de Campo de Campo";

            var _descripcionN7;

            if (campoID.toString().length == 0) _descripcionN7 = "El ID de campo debe tener una longitud mayor a 0.";else if (isNaN(campoID)) _descripcionN7 = "El ID de campo debe ser un valor numérico.";
            this.setState({
              errorCreacionRegla: {
                campo: _campo8,
                descripcion: _descripcionN7,
                mostrar: true
              }
            });
          }
        } else {
          var _campo9 = "ID de Tabla de Campo";

          var _descripcionN8;

          if (campoTablaID.toString().length == 0) _descripcionN8 = "El ID de tabla de campo debe tener una longitud mayor a 0.";else if (isNaN(campoTablaID)) _descripcionN8 = "El ID de tabla de campo debe ser un valor numérico.";
          this.setState({
            errorCreacionRegla: {
              campo: _campo9,
              descripcion: _descripcionN8,
              mostrar: true
            }
          });
        }
      } else {
        var _campo10 = "ID de Tabla de Campo";
        var _descripcionN9 = "Seleccione un valor para el ID de la tabla del campo.";
        this.setState({
          errorCreacionRegla: {
            campo: _campo10,
            descripcion: _descripcionN9,
            mostrar: true
          }
        });
      }
    }
  }, {
    key: "actualizarValor",
    value: function actualizarValor(e) {
      var valor = $("#valor").val();
      this.setState({
        textoValor: valor
      });
    }
  }, {
    key: "showCampoModal",
    value: function showCampoModal() {
      this.setState({
        showModalCampo: true
      });
    }
  }, {
    key: "showOperacionModal",
    value: function showOperacionModal() {
      this.setState({
        showModalOperacion: true
      });
    }
  }, {
    key: "showValorModal",
    value: function showValorModal() {
      this.setState({
        showModalValor: true
      });
    }
  }, {
    key: "closeCampoModal",
    value: function closeCampoModal() {
      this.setState({
        showModalCampo: false
      });
    }
  }, {
    key: "closeOperacionModal",
    value: function closeOperacionModal() {
      this.setState({
        showModalOperacion: false
      });
    }
  }, {
    key: "closeValorModal",
    value: function closeValorModal() {
      this.setState({
        showModalValor: false
      });
    }
  }, {
    key: "dismissReglaNewError",
    value: function dismissReglaNewError() {
      this.setState({
        errorCreacionRegla: {
          campo: "",
          descripcion: "",
          mostrar: false
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
          mensaje: mensaje
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
            mensaje: ""
          }
        });
      }, 850);
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
    key: "render",
    value: function render() {
      var _this3 = this;

      console.log("this.props.mostrarOpcionSino");
      console.log(this.props.mostrarOpcionSino);
      return _react["default"].createElement("div", {
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("h3", {
        className: "card-header"
      }, "Crear Condici\xF3n (Instrucci\xF3n)"), _react["default"].createElement("div", {
        className: "font-24",
        style: {
          height: "50px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "3px solid #d2d2e4"
        }
      }, "SI ", this.state.campoSeleccionadoNombre, " ", this.state.textoOperacion, " ", this.state.textoValor), _react["default"].createElement("div", {
        className: "font-18 addPointer abrirModalCrearCondicionOnHover",
        onClick: this.showCampoModal,
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "3px solid #d2d2e4"
        }
      }, _react["default"].createElement("h4", null, "Seleccionar Campo a Comparar")), _react["default"].createElement(_Modal["default"], {
        show: this.state.showModalCampo,
        titulo: "Seleccionar Campo a Comparar",
        onClose: this.closeCampoModal
      }, _react["default"].createElement(_Campo["default"], {
        esNumero: this.esNumero,
        esBoolean: this.esBoolean,
        esFecha: this.esFecha,
        esTexto: this.esTexto,
        conexiones: this.props.conexiones,
        camposConexiones: this.props.camposConexiones,
        variables: this.props.variables,
        camposVariables: this.props.camposVariables,
        retornoSeleccionVariable: this.retornoSeleccionVariable
      })), _react["default"].createElement("div", {
        className: "font-18 addPointer abrirModalCrearCondicionOnHover",
        onClick: this.showOperacionModal,
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "3px solid #d2d2e4"
        }
      }, _react["default"].createElement("h4", null, "Seleccionar Operaci\xF3n a Aplicar")), _react["default"].createElement(_Modal["default"], {
        show: this.state.showModalOperacion,
        titulo: "Seleccionar Operación a Aplicar",
        onClose: this.closeOperacionModal
      }, _react["default"].createElement(_Operacion["default"], {
        esNumero: this.state.tipoCampo.esNumero,
        esBoolean: this.state.tipoCampo.esBoolean,
        esFecha: this.state.tipoCampo.esFecha,
        esTexto: this.state.tipoCampo.esTexto,
        retornoSeleccionOperacion: this.retornoSeleccionOperacion
      })), _react["default"].createElement(_Valor["default"], {
        esNumero: this.state.tipoCampo.esNumero,
        esBoolean: this.state.tipoCampo.esBoolean,
        esFecha: this.state.tipoCampo.esFecha,
        esTexto: this.state.tipoCampo.esTexto,
        camposDropdown: this.props.camposDropdown,
        valoresDropdown: this.props.valoresDropdown,
        actualizarValor: this.actualizarValor,
        pool: this.props.pool
      }, " "), _react["default"].createElement("br", null), _react["default"].createElement(_Modal["default"], {
        show: this.state.showModalValor,
        titulo: "Seleccionar Valores a Comparar con el Campo",
        onClose: this.closeValorModal
      }, _react["default"].createElement(_Valor["default"], {
        esNumero: this.state.tipoCampo.esNumero,
        esBoolean: this.state.tipoCampo.esBoolean,
        esFecha: this.state.tipoCampo.esFecha,
        esTexto: this.state.tipoCampo.esTexto,
        camposDropdown: this.props.camposDropdown,
        valoresDropdown: this.props.valoresDropdown,
        actualizarValor: this.actualizarValor,
        pool: this.props.pool
      })), _react["default"].createElement("div", {
        className: "text-center",
        style: {
          display: this.props.mostrarOpcionSino ? "" : "none"
        }
      }, _react["default"].createElement("div", {
        className: "font-18",
        style: {
          width: "100%",
          height: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("h4", null, "Seleccionar Estilo Condici\xF3n")), _react["default"].createElement("label", {
        className: "custom-control custom-radio custom-control-inline"
      }, _react["default"].createElement("input", {
        id: "siRADIO",
        type: "radio",
        name: "sinoRadio",
        defaultChecked: true,
        className: "custom-control-input",
        onClick: function onClick() {
          return _this3.props.actualizarEstadoSeleccionSinoNuevaRegla(false);
        }
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }, "SI")), _react["default"].createElement("label", {
        className: "custom-control custom-radio custom-control-inline"
      }, _react["default"].createElement("input", {
        id: "sinoRADIO",
        type: "radio",
        name: "sinoRadio",
        className: "custom-control-input",
        onClick: function onClick() {
          return _this3.props.actualizarEstadoSeleccionSinoNuevaRegla(true);
        }
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }, "SINO"))), _react["default"].createElement("br", null), this.state.errorCreacionRegla.mostrar ? _react["default"].createElement(_ErrorMessage["default"], {
        campo: this.state.errorCreacionRegla.campo,
        descripcion: this.state.errorCreacionRegla.descripcion,
        dismissTableError: this.dismissReglaNewError
      }, " ") : _react["default"].createElement("span", null), this.state.mensajeModal.mostrarMensaje ? _react["default"].createElement(_MessageModal["default"], {
        esError: this.state.mensajeModal.esError,
        esConfirmar: this.state.mensajeModal.esConfirmar,
        dismissMessage: this.dismissMessageModal,
        confirmFunction: this.confirmMessageModal,
        titulo: this.state.mensajeModal.titulo,
        mensaje: this.state.mensajeModal.mensaje
      }, " ") : _react["default"].createElement("span", null), _react["default"].createElement("div", {
        className: "text-center"
      }, _react["default"].createElement("a", {
        onClick: function onClick() {
          return _this3.props.callbackCrearRegla(false);
        },
        className: "btn btn-primary col-xs-6 col-6",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold"
        }
      }, "Crear Condici\xF3n / Instrucci\xF3n")), _react["default"].createElement("br", null));
    }
  }]);

  return VariableCreation;
}(_react["default"].Component);

exports["default"] = VariableCreation;
//# sourceMappingURL=VariableCreation.js.map
