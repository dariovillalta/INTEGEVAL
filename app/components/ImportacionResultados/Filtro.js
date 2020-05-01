"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _Operacion = _interopRequireDefault(require("../Regla/Operacion.js"));

var _Valor = _interopRequireDefault(require("../Regla/Valor.js"));

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

var Filtro =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Filtro, _React$Component);

  function Filtro(props) {
    var _this;

    _classCallCheck(this, Filtro);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Filtro).call(this, props));
    _this.state = {
      variables: [],
      indicadores: [],
      riesgos: [],
      variableSeleccionada: null,
      campoSeleccionado: null,
      tipoCampo: {
        esNumero: true,
        esBoolean: false,
        esFecha: false,
        esTexto: false
      }
    };
    _this.agregarFiltro = _this.agregarFiltro.bind(_assertThisInitialized(_this));
    _this.getResultsVariables = _this.getResultsVariables.bind(_assertThisInitialized(_this));
    _this.getResultsVariablesFieldsInit = _this.getResultsVariablesFieldsInit.bind(_assertThisInitialized(_this));
    _this.getFieldAttributes = _this.getFieldAttributes.bind(_assertThisInitialized(_this));
    _this.getFieldResults = _this.getFieldResults.bind(_assertThisInitialized(_this));
    _this.getResultsIndicators = _this.getResultsIndicators.bind(_assertThisInitialized(_this));
    _this.getResultsIndicatorsFieldsInit = _this.getResultsIndicatorsFieldsInit.bind(_assertThisInitialized(_this));
    _this.getFieldAttributesIndicators = _this.getFieldAttributesIndicators.bind(_assertThisInitialized(_this));
    _this.getFieldResultsIndicators = _this.getFieldResultsIndicators.bind(_assertThisInitialized(_this));
    _this.getResultsRisks = _this.getResultsRisks.bind(_assertThisInitialized(_this));
    _this.getResultsRisksFieldsInit = _this.getResultsRisksFieldsInit.bind(_assertThisInitialized(_this));
    _this.getFieldAttributesRisks = _this.getFieldAttributesRisks.bind(_assertThisInitialized(_this));
    _this.getFieldResultsRisks = _this.getFieldResultsRisks.bind(_assertThisInitialized(_this));
    _this.selVar = _this.selVar.bind(_assertThisInitialized(_this));
    _this.selCampo = _this.selCampo.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionOperacion = _this.retornoSeleccionOperacion.bind(_assertThisInitialized(_this));
    _this.actualizarValor = _this.actualizarValor.bind(_assertThisInitialized(_this));
    _this.retornarValorFecha = _this.retornarValorFecha.bind(_assertThisInitialized(_this));
    _this.retornarValorTime = _this.retornarValorTime.bind(_assertThisInitialized(_this));
    _this.isValidDate = _this.isValidDate.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Filtro, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getResultsVariables();
      this.getResultsIndicators();
      this.getResultsRisks();
    }
  }, {
    key: "agregarFiltro",
    value: function agregarFiltro() {//
    }
  }, {
    key: "getResultsVariables",
    value: function getResultsVariables() {
      var _this2 = this;

      //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosNombreVariables", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
              return [];
            }
          } else {
            transaction.commit(function (err) {
              _this2.getResultsVariablesFieldsInit(result.recordset);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsVariablesFieldsInit",
    value: function getResultsVariablesFieldsInit(resultados) {
      var arregloTemp = [];

      for (var i = 0; i < resultados.length; i++) {
        arregloTemp.push(resultados[i]);
        this.getFieldAttributes(resultados[i], i, arregloTemp);
        this.getFieldResults(resultados[i], i, arregloTemp);
      }

      ;
    }
  }, {
    key: "getFieldAttributes",
    value: function getFieldAttributes(resultado, index, array) {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '" + resultado.nombreVariable + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds() + "'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var arrTemp = [];

              for (var i = 0; i < result.recordset.length; i++) {
                arrTemp.push({
                  nombre: result.recordset[i].COLUMN_NAME,
                  tipo: result.recordset[i].DATA_TYPE
                });
              }

              ;
              array[index].atributos = arrTemp;

              _this3.setState({
                variables: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getFieldResults",
    value: function getFieldResults(resultado, index, array) {
      var _this4 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from " + resultado.nombreVariable + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds(), function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              array[index].resultados = result.recordset;

              _this4.setState({
                variables: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsIndicators",
    value: function getResultsIndicators() {
      var _this5 = this;

      //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosNombreIndicadores", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
              return [];
            }
          } else {
            transaction.commit(function (err) {
              _this5.getResultsIndicatorsFieldsInit(result.recordset);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsIndicatorsFieldsInit",
    value: function getResultsIndicatorsFieldsInit(resultados) {
      var arregloTemp = [];

      for (var i = 0; i < resultados.length; i++) {
        arregloTemp.push(resultados[i]);
        this.getFieldAttributesIndicators(resultados[i], i, arregloTemp);
        this.getFieldResultsIndicators(resultados[i], i, arregloTemp);
      }

      ;
    }
  }, {
    key: "getFieldAttributesIndicators",
    value: function getFieldAttributesIndicators(resultado, index, array) {
      var _this6 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '" + resultado.nombreIndicador + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds() + "'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var arrTemp = [];

              for (var i = 0; i < result.recordset.length; i++) {
                arrTemp.push({
                  nombre: result.recordset[i].COLUMN_NAME,
                  tipo: result.recordset[i].DATA_TYPE
                });
              }

              ;
              array[index].atributos = arrTemp;

              _this6.setState({
                indicadores: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getFieldResultsIndicators",
    value: function getFieldResultsIndicators(resultado, index, array) {
      var _this7 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from " + resultado.nombreIndicador + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds(), function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              array[index].resultados = result.recordset;

              _this7.setState({
                indicadores: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsRisks",
    value: function getResultsRisks() {
      var _this8 = this;

      //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosNombreRiesgos", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
              return [];
            }
          } else {
            transaction.commit(function (err) {
              _this8.getResultsRisksFieldsInit(result.recordset);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsRisksFieldsInit",
    value: function getResultsRisksFieldsInit(resultados) {
      var arregloTemp = [];

      for (var i = 0; i < resultados.length; i++) {
        arregloTemp.push(resultados[i]);
        this.getFieldAttributesRisks(resultados[i], i, arregloTemp);
        this.getFieldResultsRisks(resultados[i], i, arregloTemp);
      }

      ;
    }
  }, {
    key: "getFieldAttributesRisks",
    value: function getFieldAttributesRisks(resultado, index, array) {
      var _this9 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '" + resultado.nombreRiesgo + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds() + "'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var arrTemp = [];

              for (var i = 0; i < result.recordset.length; i++) {
                arrTemp.push({
                  nombre: result.recordset[i].COLUMN_NAME,
                  tipo: result.recordset[i].DATA_TYPE
                });
              }

              ;
              array[index].atributos = arrTemp;

              _this9.setState({
                riesgos: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getFieldResultsRisks",
    value: function getFieldResultsRisks(resultado, index, array) {
      var _this10 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from " + resultado.nombreRiesgo + '_' + resultado.inicioVigencia.getFullYear() + '_' + (resultado.inicioVigencia.getMonth() + 1) + '_' + resultado.inicioVigencia.getDate() + '_' + resultado.inicioVigencia.getHours() + '_' + resultado.inicioVigencia.getMinutes() + '_' + resultado.inicioVigencia.getSeconds(), function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              array[index].resultados = result.recordset;

              _this10.setState({
                riesgos: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "selVar",
    value: function selVar(index, arreglo) {
      var ref;

      if (arreglo.localeCompare("variable") == 0) {
        ref = this.state.variables[index];
      } else if (arreglo.localeCompare("indicador") == 0) {
        ref = this.state.indicadores[index];
      } else if (arreglo.localeCompare("riesgo") == 0) {
        ref = this.state.riesgos[index];
      }

      this.setState({
        variableSeleccionada: ref,
        campoSeleccionado: null
      });
    }
  }, {
    key: "selCampo",
    value: function selCampo(index) {
      var copy = jQuery.extend(true, {}, this.state.variableSeleccionada);

      for (var i = 0; i < copy.atributos.length; i++) {
        if (i == index) copy.atributos[i].activa = true;else copy.atributos[i].activa = false;
      }

      ;
      var tipoCampo;

      if (copy.atributos[index].tipo.localeCompare("int") == 0 || copy.atributos[index].tipo.localeCompare("decimal") == 0) {
        tipoCampo = {
          esNumero: true,
          esBoolean: false,
          esFecha: false,
          esTexto: false
        };
      } else if (copy.atributos[index].tipo.localeCompare("bool") == 0) {
        tipoCampo = {
          esNumero: false,
          esBoolean: true,
          esFecha: false,
          esTexto: false
        };
      } else if (copy.atributos[index].tipo.localeCompare("date") == 0) {
        tipoCampo = {
          esNumero: false,
          esBoolean: false,
          esFecha: true,
          esTexto: false
        };
      } else if (copy.atributos[index].tipo.localeCompare("varchar") == 0) {
        tipoCampo = {
          esNumero: false,
          esBoolean: false,
          esFecha: false,
          esTexto: true
        };
      }

      console.log('copy.atributos[index]');
      console.log(copy.atributos[index]);
      this.setState({
        campoSeleccionado: copy,
        tipoCampo: tipoCampo
      }, console.log(this.state.tipoCampo));
    }
  }, {
    key: "retornoSeleccionOperacion",
    value: function retornoSeleccionOperacion() {//
    }
  }, {
    key: "actualizarValor",
    value: function actualizarValor(e) {
      var valor = $("#valor").val();
      this.setState({
        textoValor: valor
      });

      if (this.state.tipoCampo.esNumero) {
        var numero = parseFloat(valor);

        if (!isNaN(numero)) {
          var valorARetornar = "MANUAL=NUMERO[" + numero + "]";
          this.props.retornarValor(valorARetornar, valor);
        } else if (this.state.campoSeleccionadoNombre.localeCompare("{campo}") != 0) {
          alert('Valor Ingresado no es un número válido');
        }
      } else if (this.state.tipoCampo.esBoolean) {
        if (numero.localeCompare("true") == 0 || numero.localeCompare("false") == 0) {
          var valorARetornar = "MANUAL=BOOL[" + valor + "]";
          this.props.retornarValor(valorARetornar, valor);
        } else if (this.state.campoSeleccionadoNombre.localeCompare("{campo}") != 0) {
          alert('Valor Ingresado no es un valor booleano válido');
        }
      } else if (this.state.tipoCampo.esFecha) {
        var fecha = null;

        if (valor.indexOf("-") != -1 && valor.split("-").length > 2) {
          fecha = new Date(valor.split("-")[0], valor.split("-")[1], valor.split("-")[2]);
        } else if (valor.indexOf("/") != -1 && valor.split("/").length > 2) {
          fecha = new Date(valor.split("/")[0], valor.split("/")[1], valor.split("/")[2]);
        }

        if (fecha != null && this.isValidDate(fecha)) {
          var valorARetornar = "MANUAL=FECHA[";

          if (valor.indexOf("-") != -1 && valor.split("-").length > 2) {
            valorARetornar += valor.split("-")[0] + "," + valor.split("-")[1] + "," + valor.split("-")[2] + "]";
          } else if (valor.indexOf("/") != -1 && valor.split("/").length > 2) {
            valorARetornar += valor.split("/")[0] + "," + valor.split("/")[1] + "," + valor.split("/")[2] + "]";
          }

          this.props.retornarValor(valorARetornar, valor);
        } else if (this.state.campoSeleccionadoNombre.localeCompare("{campo}") != 0) {
          alert('Valor Ingresado no es una fecha válida');
        }
      } else if (this.state.tipoCampo.esTexto) {
        if (valor.length > 0 || valor.length < 984) {
          var valorARetornar = "MANUAL=VARCHAR[" + valor + "]";
          this.props.retornarValor(valorARetornar, valor);
        } else if (this.state.campoSeleccionadoNombre.localeCompare("{campo}") != 0) {
          if (valor.length > 0) alert('Valor Ingresado debe tener una longitud mayor a 0');else alert('Valor Ingresado debe tener una longitud menor a 984');
        }
      }
    }
  }, {
    key: "retornarValorFecha",
    value: function retornarValorFecha(valorRegla, valorTexto) {
      this.setState({
        textoValor: valorTexto
      });
    }
  }, {
    key: "retornarValorTime",
    value: function retornarValorTime(valorRegla, valorTexto) {
      this.setState({
        textoValor: valorTexto
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
    key: "render",
    value: function render() {
      var _this11 = this;

      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Crear Filtros"), _react["default"].createElement("div", {
        className: "page-breadcrumb"
      }, _react["default"].createElement("nav", {
        "aria-label": "breadcrumb"
      }, _react["default"].createElement("ol", {
        className: "breadcrumb"
      }, _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.returnChooseDates
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Seleccionar Fechas")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Crear Filtros"))))))), _react["default"].createElement("div", {
        className: "row",
        style: {
          maxHeight: "60vh"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12",
        style: {
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "card",
        style: {
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          borderBottom: "5px solid #d2d2e4",
          height: "90%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3",
        style: {
          borderRight: "5px solid #d2d2e4",
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "8%",
          width: "100%",
          paddingTop: "5px"
        }
      }, _react["default"].createElement("h2", null, "Variables")), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
        style: {
          paddingLeft: "5px"
        }
      }, this.state.variables.map(function (variable, i) {
        return _react["default"].createElement("label", {
          key: variable.ID,
          className: "custom-control custom-radio"
        }, _react["default"].createElement("input", {
          id: "varRad" + variable.ID,
          onClick: function onClick() {
            return _this11.selVar(i, "variable");
          },
          type: "radio",
          name: "sinoRadio",
          className: "custom-control-input"
        }), _react["default"].createElement("span", {
          className: "custom-control-label"
        }, variable.nombreVariable));
      }))), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9",
        style: {
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          display: this.state.variableSeleccionada != null ? "" : "none",
          borderBottom: "3px solid #d2d2e4",
          height: "30%",
          width: "100%"
        }
      }, this.state.variableSeleccionada != null ? _react["default"].createElement("div", {
        className: "text-center",
        style: {
          height: "100%",
          width: "100%",
          overflowX: "scroll"
        }
      }, this.state.variableSeleccionada.atributos.map(function (atributo, i) {
        return _react["default"].createElement("a", {
          key: _this11.state.variableSeleccionada.nombre + atributo.nombre + atributo.ID,
          href: "#",
          onClick: function onClick() {
            return _this11.selCampo(i);
          },
          className: "btn " + (atributo.activa ? "" : "btn-outline-secondary"),
          style: {
            margin: "1% 3%"
          }
        }, atributo.nombre);
      })) : null), _react["default"].createElement("div", {
        className: "row",
        style: {
          display: this.state.campoSeleccionado != null ? "" : "none",
          borderBottom: "3px solid #d2d2e4",
          height: "40%"
        }
      }, _react["default"].createElement(_Operacion["default"], {
        esNumero: this.state.tipoCampo.esNumero,
        esBoolean: this.state.tipoCampo.esBoolean,
        esFecha: this.state.tipoCampo.esFecha,
        esTexto: this.state.tipoCampo.esTexto,
        retornoSeleccionOperacion: this.retornoSeleccionOperacion
      })), _react["default"].createElement("div", {
        className: "row",
        style: {
          display: this.state.campoSeleccionado != null ? "" : "none",
          height: "30%"
        }
      }, _react["default"].createElement(_Valor["default"], {
        esNumero: this.state.tipoCampo.esNumero,
        esBoolean: this.state.tipoCampo.esBoolean,
        esFecha: this.state.tipoCampo.esFecha,
        esTexto: this.state.tipoCampo.esTexto,
        retornarValorFecha: this.retornarValorFecha,
        retornarValorTime: this.retornarValorTime,
        actualizarValor: this.actualizarValor,
        pool: this.props.pool
      })))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "text-center",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-primary active",
        onClick: this.agregarFiltro
      }, "Agregar Filtro")), _react["default"].createElement("br", null)))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("a", {
        className: "btn btn-success btn-block btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: function onClick() {
          return _this11.props.retornoVariables(_this11.state.variables, _this11.state.indicadores, _this11.state.riesgos);
        }
      }, "Visualizar Variables")), _react["default"].createElement("br", null));
    }
  }]);

  return Filtro;
}(_react["default"].Component);

exports["default"] = Filtro;
//# sourceMappingURL=Filtro.js.map
