"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

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

var Valor =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Valor, _React$Component);

  function Valor(props) {
    var _this;

    _classCallCheck(this, Valor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Valor).call(this, props));
    _this.state = {
      listas: [],
      variablesDeLista: [],
      radioManual: true,
      radioListas: false,
      radioFecha: false,
      radioTiempo: false
    };
    _this.updateVariableList = _this.updateVariableList.bind(_assertThisInitialized(_this));
    _this.getLists = _this.getLists.bind(_assertThisInitialized(_this));
    _this.mostrarManual = _this.mostrarManual.bind(_assertThisInitialized(_this));
    _this.mostrarListas = _this.mostrarListas.bind(_assertThisInitialized(_this));
    _this.mostrarFecha = _this.mostrarFecha.bind(_assertThisInitialized(_this));
    _this.initFecha = _this.initFecha.bind(_assertThisInitialized(_this));
    _this.isValidDate = _this.isValidDate.bind(_assertThisInitialized(_this));
    _this.mostrarTiempo = _this.mostrarTiempo.bind(_assertThisInitialized(_this));
    _this.changeTime = _this.changeTime.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Valor, [{
    key: "componentDidMount",
    value: function componentDidMount() {//this.getLists();
    }
  }, {
    key: "getLists",
    value: function getLists() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Listas", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                listas: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "updateVariableList",
    value: function updateVariableList() {
      var _this3 = this;

      var listaID = $("#selectLista").val();

      if (listaID.length > 0) {
        if (listaID.localeCompare("table") != 0) {
          console.log(listaID);
          var transaction = new _mssql["default"].Transaction(this.props.pool);
          transaction.begin(function (err) {
            var rolledBack = false;
            transaction.on('rollback', function (aborted) {
              rolledBack = true;
            });
            var request = new _mssql["default"].Request(transaction);
            request.query("select * from VariablesdeLista where listaID = " + listaID, function (err, result) {
              if (err) {
                if (!rolledBack) {
                  console.log(err);
                  transaction.rollback(function (err) {});
                }
              } else {
                transaction.commit(function (err) {
                  var arrTemp = [];

                  for (var i = 0; i < result.recordset.length; i++) {
                    arrTemp.push({
                      ID: result.recordset[i].ID,
                      nombre: result.recordset[i].nombre,
                      tipo: result.recordset[i].tipo
                    });
                  }

                  ;

                  _this3.setState({
                    variablesDeLista: arrTemp
                  });

                  console.log(arrTemp);
                });
              }
            });
          }); // fin transaction
        } else {
          var arrTemp = [];

          for (var i = 0; i < this.props.campos.length; i++) {
            arrTemp.push({
              ID: this.props.campos[i].ID,
              nombre: this.props.campos[i].nombre,
              tipo: this.props.campos[i].tipo
            });
          }

          ;
          this.setState({
            variablesDeLista: arrTemp
          });
        }
      } else {
        this.setState({
          variablesDeLista: []
        });
      }
    }
  }, {
    key: "mostrarManual",
    value: function mostrarManual() {
      this.setState({
        radioManual: true,
        radioListas: false,
        radioFecha: false,
        radioTiempo: false
      });
    }
  }, {
    key: "mostrarListas",
    value: function mostrarListas() {
      this.setState({
        radioManual: false,
        radioListas: true,
        radioFecha: false,
        radioTiempo: false
      });
    }
  }, {
    key: "mostrarFecha",
    value: function mostrarFecha() {
      this.setState({
        radioManual: false,
        radioListas: false,
        radioFecha: true,
        radioTiempo: false
      }, this.initFecha);
    }
  }, {
    key: "initFecha",
    value: function initFecha() {
      $('#fecha').datepicker({
        format: "dd-mm-yyyy",
        todayHighlight: true,
        viewMode: "days",
        minViewMode: "days",
        language: 'es'
      });
      var self = this;
      $('#fecha').datepicker().on('changeDate', function () {
        var fecha = $("#fecha").datepicker('getDate');

        if (self.isValidDate(fecha)) {
          var valorARetornar = "FECHA=(" + fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + ")";
          self.props.retornarValorFecha(valorARetornar, fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate());
        }
      });
    }
  }, {
    key: "isValidDate",
    value: function isValidDate(fecha) {
      if (Object.prototype.toString.call(fecha) === "[object Date]") {
        if (isNaN(fecha.getTime())) {
          alert("Ingrese una fecha valida.");
          return false;
        } else {
          return true;
        }
      } else {
        alert("Ingrese una fecha valida.");
        return false;
      }
    }
  }, {
    key: "mostrarTiempo",
    value: function mostrarTiempo() {
      this.setState({
        radioManual: false,
        radioListas: false,
        radioFecha: false,
        radioTiempo: true
      });
    }
  }, {
    key: "changeTime",
    value: function changeTime() {
      var valorARetornar = "TIEMPO=[DIAS=" + $("#dias").val() + ",MES=" + $("#mes").val() + ",AÑOS=" + $("#anio").val() + "]";
      this.props.retornarValorTime(valorARetornar, "DIAS=" + $("#dias").val() + ",MES=" + $("#mes").val() + ",AÑOS=" + $("#anio").val());
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      /*if(this.props.esNumero) {
          return (
              <div className={"row"}>
           	<div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"} style={{width: "100%", height: "100%", border: "1px solid black", borderRadius: "5px"}}>
                      <div className={"font-18"} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          Seleccionar Valor a Aplicar
                      </div>
                      <div className={"form-group"}>
                          <select id="selectLista" className={"form-control form-control-lg"} onChange={this.updateVariableList}>
                              <option value="">Seleccione una lista...</option>
                              {this.props.camposDropdown.map((lista, i) =>
                                  <option value={lista.ID} key={lista.ID}>{lista.valor}</option>
                              )}
                          </select>
                      </div>
                       <div className={"form-group"}>
                          <select id="camposDeLista" className={"form-control form-control-lg"} multiple>
                              {this.props.valoresDropdown.map((variable, i) => {
                                      if (variable.tipo.indexOf("int") == 0 || variable.tipo.indexOf("decimal") == 0) {
                                          return <option value={variable.ID} key={variable.ID}>{variable.valor}</option>
                                      } else {
                                          return null;
                                      }
                                  }
                              )}
                          </select>
                      </div>
               </div>
           </div>
          );
      } else if(this.props.esBoolean) {
          return (
              <div className={"row"}>
                  <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                      <div className={"text-center"} style={{width: "100%", height: "100%", border: "1px solid black", borderRadius: "15px", borderRadius: "5px"}}>
                          <div className={"font-18"} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                              Seleccionar Valor a Aplicar
                          </div>
                          <label className={"custom-control custom-radio custom-control-inline"}>
                              <input type="radio" name="radio-inline" className={"custom-control-input"}/>
                              <span className={"custom-control-label"}>
                                  <img src="./assets/varCreation/Verdadero.png" alt="" style={{height: "30px", width: "auto"}}/>
                              </span>
                          </label>
                          <label className={"custom-control custom-radio custom-control-inline"}>
                              <input type="radio" name="radio-inline" className={"custom-control-input"}/>
                              <span className={"custom-control-label"}>
                                  <img src="./assets/varCreation/Falso.png" alt="" style={{height: "30px", width: "auto"}}/>
                              </span>
                          </label>
                      </div>
                  </div>
              </div>
          );
      } else if(this.props.esFecha) {
          return (
              <div>
              </div>
          );
      } else if(this.props.esTexto) {
          return (
              <div className={"row"}>
                  <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"} style={{width: "100%", height: "100%", border: "1px solid black", borderRadius: "5px"}}>
                      <div className={"font-18"} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          Seleccionar Valor a Aplicar
                      </div>
                      <div className={"form-group"}>
                          <select id="selectLista" className={"form-control form-control-lg"} onChange={this.updateVariableList}>
                              <option value="">Seleccione una lista...</option>
                              {this.props.camposDropdown.map((lista, i) =>
                                  <option value={lista.ID} key={lista.ID}>{lista.valor}</option>
                              )}
                          </select>
                      </div>
                       <div className={"form-group"}>
                          <select id="camposDeLista" className={"form-control form-control-lg"} multiple>
                              {this.props.valoresDropdown.map((variable, i) => {
                                      if (variable.tipo.indexOf("varchar") == 0) {
                                          return <option value={variable.ID} key={variable.ID}>{variable.valor}</option>
                                      } else {
                                          return null;
                                      }
                                  }
                              )}
                          </select>
                      </div>
                  </div>
              </div>
          );
      } else {
          return (
              <div>
              </div>
          );
      }*/
      return _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("label", {
        className: "custom-control custom-radio custom-control-inline"
      }, _react["default"].createElement("input", {
        type: "radio",
        name: "radio-inline",
        defaultChecked: true,
        className: "custom-control-input",
        onClick: function onClick() {
          return _this4.mostrarManual();
        }
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }, "Manual")), _react["default"].createElement("label", {
        className: "custom-control custom-radio custom-control-inline"
      }, _react["default"].createElement("input", {
        type: "radio",
        name: "radio-inline",
        className: "custom-control-input",
        onClick: function onClick() {
          return _this4.mostrarListas();
        }
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }, "Listas")), _react["default"].createElement("label", {
        className: "custom-control custom-radio custom-control-inline",
        style: {
          display: this.props.esFecha ? "" : "none"
        }
      }, _react["default"].createElement("input", {
        type: "radio",
        name: "radio-inline",
        className: "custom-control-input",
        style: {
          display: this.props.esFecha ? "" : "none"
        },
        onClick: function onClick() {
          return _this4.mostrarFecha();
        }
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }, "Fecha")), _react["default"].createElement("label", {
        className: "custom-control custom-radio custom-control-inline",
        style: {
          display: this.props.esFecha ? "" : "none"
        }
      }, _react["default"].createElement("input", {
        type: "radio",
        name: "radio-inline",
        className: "custom-control-input",
        style: {
          display: this.props.esFecha ? "" : "none"
        },
        onClick: function onClick() {
          return _this4.mostrarTiempo();
        }
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }, "Tiempo"))), this.state.radioManual ? _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "valor",
        className: "col-form-label"
      }, "Valor:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("input", {
        onKeyUp: this.props.actualizarValor,
        id: "valor",
        type: "text",
        className: "form-control form-control-sm"
      }))) : null, this.state.radioListas ? _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "valor",
        className: "col-form-label"
      }, "Lista:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }), _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "valor",
        className: "col-form-label"
      }, "Valores Seleccionados:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      })) : null, this.state.radioFecha && this.props.esFecha ? _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "valor",
        className: "col-form-label"
      }, "Fecha:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("div", {
        id: "fecha",
        className: "center-block"
      }))) : null, this.state.radioTiempo && this.props.esFecha ? _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "dias",
        className: "col-form-label"
      }, "D\xEDas:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("input", {
        type: "number",
        defaultValue: "0",
        onChange: this.changeTime,
        id: "dias",
        name: "dias",
        step: "1",
        min: "0"
      })), _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "mes",
        className: "col-form-label"
      }, "Meses:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("input", {
        type: "number",
        defaultValue: "0",
        id: "mes",
        name: "mes",
        step: "1",
        min: "0"
      })), _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "anio",
        className: "col-form-label"
      }, "A\xF1os:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("input", {
        type: "number",
        defaultValue: "0",
        id: "anio",
        name: "anio",
        step: "1",
        min: "0"
      }))) : null);
    }
  }]);

  return Valor;
}(_react["default"].Component);

exports["default"] = Valor;
//# sourceMappingURL=Valor.js.map
