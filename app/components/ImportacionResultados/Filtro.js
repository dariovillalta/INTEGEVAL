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

var textoOperacion = '',
    operacion = '',
    valor = '',
    valorTexto = '';

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
      },
      filtros: [],
      textoValor: ""
    };
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
    _this.agregarFiltro = _this.agregarFiltro.bind(_assertThisInitialized(_this));
    _this.eliminarFiltro = _this.eliminarFiltro.bind(_assertThisInitialized(_this));
    textoOperacion = '';
    operacion = '';
    valor = '';
    valorTexto = '';
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
      console.log('copy.atributos');
      console.log(copy.atributos);
      this.setState({
        variableSeleccionada: copy,
        campoSeleccionado: copy.atributos[index],
        tipoCampo: tipoCampo
      }, console.log(this.state.tipoCampo));
    }
  }, {
    key: "retornoSeleccionOperacion",
    value: function retornoSeleccionOperacion(textoOperacionNuevo, operacion) {
      textoOperacion = textoOperacionNuevo;
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
    value: function retornarValorFecha(valorN, valorTextoN) {
      valor = valorN;
      valorTexto = valorTextoN;
    }
  }, {
    key: "retornarValorTime",
    value: function retornarValorTime(valorN, valorTexto) {
      valor = valorN;
      valorTexto = valorTextoN;
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
    key: "agregarFiltro",
    value: function agregarFiltro() {
      var variableID = this.state.variableSeleccionada.ID;
      var nombreCampo = this.state.campoSeleccionado.nombre;
      var tipoCampo = this.state.variableSeleccionada.tipo;
      var nuevoFiltro = {
        variableID: variableID,
        nombreCampo: nombreCampo,
        tipoCampoObjetivo: tipoCampo,
        operacion: operacion,
        operacionTexto: textoOperacion,
        valor: valor,
        texto: nombreCampo + " " + textoOperacion + " " + valorTexto
      };

      var copyFiltros = _toConsumableArray(this.state.filtros);

      copyFiltros.push(nuevoFiltro);
      this.setState({
        filtros: copyFiltros
      });
    }
  }, {
    key: "eliminarFiltro",
    value: function eliminarFiltro(index) {
      var copyFiltros = _toConsumableArray(this.state.filtros);

      copyFiltros.splice(index, 1);
      this.setState({
        filtros: copyFiltros
      });
    }
  }, {
    key: "crearCodigoFiltros",
    value: function crearCodigoFiltros() {
      //agregar filtros por variable
      var filtrosAgrupadosPorVariables = [];

      for (var i = 0; i < this.state.filtros.length; i++) {
        if (this.state.filtros[i].esVariable) {
          var agregoFiltro = false;

          for (var i = 0; i < filtrosAgrupadosPorVariables.length; i++) {
            for (var j = 0; j < filtrosAgrupadosPorVariables[i].length; j++) {
              if (filtrosAgrupadosPorVariables[i][j].variableID == this.state.filtros[i].variableID) {
                filtrosAgrupadosPorVariables[i].push(this.state.filtros[i]);
                filtrosAgrupadosPorVariables[i][filtrosAgrupadosPorVariables[i].length - 1].filtroPadre = filtrosAgrupadosPorVariables[i].length - 2;
              }
            }

            ;
          }

          ;

          if (filtrosAgrupadosPorVariables.length == 0) {
            filtrosAgrupadosPorVariables.push(this.state.filtros[i]);
          }
        }
      }

      ;
      var filtrosAgrupadosPorIndicadores = [];

      for (var i = 0; i < this.state.filtros.length; i++) {
        if (this.state.filtros[i].esIndicador) {
          var agregoFiltro = false;

          for (var i = 0; i < filtrosAgrupadosPorIndicadores.length; i++) {
            for (var j = 0; j < filtrosAgrupadosPorIndicadores[i].length; j++) {
              if (filtrosAgrupadosPorIndicadores[i][j].variableID == this.state.filtros[i].variableID) {
                filtrosAgrupadosPorIndicadores[i].push(this.state.filtros[i]);
                filtrosAgrupadosPorIndicadores[i][filtrosAgrupadosPorIndicadores[i].length - 1].filtroPadre = filtrosAgrupadosPorIndicadores[i].length - 2;
              }
            }

            ;
          }

          ;

          if (filtrosAgrupadosPorIndicadores.length == 0) {
            filtrosAgrupadosPorIndicadores.push(this.state.filtros[i]);
          }
        }
      }

      ;
      var filtrosAgrupadosPorRiesgos = [];

      for (var i = 0; i < this.state.filtros.length; i++) {
        if (this.state.filtros[i].esRiesgo) {
          var agregoFiltro = false;

          for (var i = 0; i < filtrosAgrupadosPorRiesgos.length; i++) {
            for (var j = 0; j < filtrosAgrupadosPorRiesgos[i].length; j++) {
              if (filtrosAgrupadosPorRiesgos[i][j].variableID == this.state.filtros[i].variableID) {
                filtrosAgrupadosPorRiesgos[i].push(this.state.filtros[i]);
                filtrosAgrupadosPorRiesgos[i][filtrosAgrupadosPorRiesgos[i].length - 1].filtroPadre = filtrosAgrupadosPorRiesgos[i].length - 2;
              }
            }

            ;
          }

          ;

          if (filtrosAgrupadosPorRiesgos.length == 0) {
            filtrosAgrupadosPorRiesgos.push(this.state.filtros[i]);
          }
        }
      }

      ; //crearCodigo

      var codigoVariables = '';

      for (var i = 0; i < filtrosAgrupadosPorVariables.length; i++) {
        for (var j = 0; j < filtrosAgrupadosPorVariables[i].length; j++) {
          codigoVariables += this.crearCodigoFiltro(filtrosAgrupadosPorVariables[i]);
        }

        ;
      }

      ;
      console.log('codigoVariables');
      console.log(codigoVariables);
      this.props.retornoVariables(this.state.variables, this.state.indicadores, this.state.riesgos);
    }
  }, {
    key: "crearCodigoFiltro",
    value: function crearCodigoFiltro(filtros, tabs, nombreReferenciaArregloEnCodigo) {
      var codigo = '';
      var resultado = this.arregloCodigoFiltro(filtros[0], tabs, [], filtros, nombreReferenciaArregloEnCodigo);
      if (resultado.length > 0) resultado[0].codigo = "\n" + resultado[0].codigo; //$.merge( prestamosCuerpo, resultado );

      for (var i = 0; i < resultado.length; i++) {
        codigo += resultado[i].codigo;
      }

      ;
      return codigo;
    }
  }, {
    key: "arregloCodigoFiltro",
    value: function arregloCodigoFiltro(filtro, tabs, arreglo, arregloDeFiltros, nombreReferenciaArregloEnCodigo) {
      var tabsText = '';

      for (var i = 0; i < tabs; i++) {
        tabsText += '\t';
      }

      ;
      var posicionesIF = [];
      var newTabsTextFormula = ''; //condiciones if

      var arregloValoresAComparar = [];

      if (filtro.valor.indexOf("LISTAID") == 0) {//
      } else if (filtro.valor.indexOf("FECHA") == 0) {
        var fecha = filtro.valor.substring(filtro.valor.indexOf("[") + 1, filtro.valor.lastIndexOf("]"));
        arregloValoresAComparar = ["new Date(" + fecha + ").getTime()"];
      } else if (filtro.valor.indexOf("TIEMPO") == 0) {
        var stringValores = filtro.valor.substring(filtro.valor.indexOf("[") + 1, filtro.valor.lastIndexOf("]"));
        var diasAgregarCadena = stringValores.split(",")[0],
            mesesAgregarCadena = stringValores.split(",")[1],
            aniosAgregarCadena = stringValores.split(",")[2],
            futuro = stringValores.split(",")[3];
        var diasAgregar = parseInt(diasAgregarCadena.indexOf("=") + 1),
            mesesAgregar = parseInt(mesesAgregarCadena.indexOf("=") + 1),
            aniosAgregar = parseInt(aniosAgregarCadena.indexOf("=") + 1);
        var esFuturo = true;
        if (futuro.localeCompare("FUTURO") == 0) esFuturo = true;else esFuturo = false;
        var hoy = new Date();

        if (esFuturo) {
          hoy = this.addYears(hoy, aniosAgregar);
          hoy = this.addMonths(hoy, mesesAgregar);
          hoy = this.addDays(hoy, diasAgregar);
        } else {
          hoy = this.minusDays(hoy, aniosAgregar);
          hoy = this.minusMonths(hoy, aniosAgregar);
          hoy = this.minusYears(hoy, aniosAgregar);
        }

        arregloValoresAComparar = ["new Date(" + hoy.getFullYear() + ", " + hoy.getMonth() + ", " + hoy.getDate() + ").getTime()"];
      } else if (filtro.valor.indexOf("MANUAL") == 0) {
        arregloValoresAComparar = [filtro.valor.substring(filtro.valor.indexOf("[") + 1, filtro.valor.lastIndexOf("]"))];
      }

      var tamArreglo = arreglo.length; //for (var j = 0; j < tamArreglo; j++) {

      for (var i = 0; i < arregloValoresAComparar.length; i++) {
        var comparacion = "";
        var inicioComparacion = "";
        var operacion = "";

        if (filtro.operacion.localeCompare("ES_MENOR") == 0) {
          operacion = "<";
        } else if (filtro.operacion.localeCompare("ES_MENOR_O_IGUAL") == 0) {
          operacion = "<=";
        } else if (filtro.operacion.localeCompare("ES_MAYOR_O_IGUAL") == 0) {
          operacion = ">=";
        } else if (filtro.operacion.localeCompare("ES_MAYOR") == 0) {
          operacion = ">";
        } else if (filtro.operacion.localeCompare("ES_IGUAL") == 0) {
          operacion = "==";
        } else if (filtro.operacion.localeCompare("NO_ES_IGUAL") == 0) {
          operacion = "!=";
        }

        if (filtro.tipoCampoObjetivo.localeCompare("date") == 0) {
          if (filtro.operacion.localeCompare("encuentra") == 0) {//
          } else if (filtro.operacion.localeCompare("no_encuentra") == 0) {//
          } else {
            inicioComparacion = nombreReferenciaArregloEnCodigo + "[x]." + filtro.nombreCampo + " != undefined && isValidDate(" + nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + ")";
            comparacion = nombreReferenciaArregloEnCodigo + "[x]." + filtro.nombreCampo + ".getTime() " + operacion + " " + arregloValoresAComparar[i];
          }
        } else if (filtro.tipoCampoObjetivo.localeCompare("varchar") == 0) {
          if (filtro.operacion.localeCompare("encuentra") == 0) {//
          } else if (filtro.operacion.localeCompare("no_encuentra") == 0) {//
          } else {
            inicioComparacion = nombreReferenciaArregloEnCodigo + "[x]." + filtro.nombreCampo + " != undefined";
            comparacion = nombreReferenciaArregloEnCodigo + "[x]." + filtro.nombreCampo + ".localeCompare('" + arregloValoresAComparar[i] + "') " + operacion + " 0";
          }
        } else if (filtro.tipoCampoObjetivo.localeCompare("int") == 0 || filtro.filtro.nombreCampo.localeCompare("decimal") == 0) {
          if (filtro.operacion.localeCompare("encuentra") == 0) {//
          } else if (filtro.operacion.localeCompare("no_encuentra") == 0) {//
          } else {
            inicioComparacion = nombreReferenciaArregloEnCodigo + "[x]." + filtro.nombreCampo + " != undefined && !isNaN(" + nombreReferenciaArregloEnCodigo + "[x]." + nombreCampoDeArregloEnCodigo + ")";
            comparacion = nombreReferenciaArregloEnCodigo + "[x]." + filtro.nombreCampo + " " + operacion + " " + arregloValoresAComparar[i];
          }
        } else if (filtro.tipoCampoObjetivo.localeCompare("bit") == 0) {
          inicioComparacion = nombreReferenciaArregloEnCodigo + "[x]." + filtro.nombreCampo + " != undefined";
          comparacion = nombreReferenciaArregloEnCodigo + "[x]." + filtro.nombreCampo + " " + operacion + " " + arregloValoresAComparar[i];
        }

        if (i + 1 == arregloValoresAComparar.length) {
          comparacion += " ) {";
        }

        if (i == 0) {
          arreglo.push({
            codigo: '\n' + tabsText + "if ( " + inicioComparacion + " && " + comparacion,
            tipo: "COMPARACION"
          });
        } else {
          arreglo[arreglo.length - 1].codigo += " && " + comparacion;
        }
      }

      ;
      /*console.log("ENTROOO j");
      };*/

      posicionesIF.push(arreglo.length);
      var cuerpo = arregloDeFiltros.filter(function (object, index) {
        return object.filtroPadre == index;
      });

      if (cuerpo.length > 0) {
        var arregloCuerpo = [];

        for (var i = 0; i < cuerpo.length; i++) {
          var retorno = this.arregloCodigoFiltro(cuerpo[i], tabs + 1, [], arregloDeFiltros, nombreReferenciaArregloEnCodigo);
          retorno[0].codigo = "\n" + retorno[0].codigo;
          $.merge(arregloCuerpo, retorno);
        }

        ;

        for (var i = 0; i < posicionesIF.length; i++) {
          arreglo.splice.apply(arreglo, [posicionesIF[i], 0].concat(arregloCuerpo));
          if (filtro.esCondicion) arreglo.splice(posicionesIF[i] + arregloCuerpo.length, 0, {
            codigo: "\n" + tabsText + "}",
            filtro: regla.filtro
          });

          for (var j = i; j < posicionesIF.length; j++) {
            posicionesIF[j] += arregloCuerpo.length;
          }

          ;
        }

        ;
        if (posicionesIF.length == 0) $.merge(arreglo, arregloCuerpo);
        return arreglo;
      } else {
        if (filtro.esCondicion || posicionesIF.length > 0) {
          for (var i = 0; i < posicionesIF.length; i++) {
            if (newTabsTextFormula.length > 0) newTabsTextFormula = newTabsTextFormula.substring(0, newTabsTextFormula.length - 1);
            arreglo.splice(posicionesIF[i], 0, {
              codigo: "\n" + tabsText + newTabsTextFormula + "}",
              filtro: regla.filtro
            });
          }

          ;
        }

        return arreglo;
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
          height: "70vh"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12",
        style: {
          height: "100%",
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "card",
        style: {
          height: "100%",
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          borderBottom: "3px solid #d2d2e4",
          height: "90%",
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3",
        style: {
          borderRight: "3px solid #d2d2e4",
          height: "100%",
          overflowY: "scroll"
        }
      }, _react["default"].createElement("div", {
        style: _defineProperty({
          display: "flex",
          alignItems: "center",
          paddingTop: "1%",
          justifyContent: "center",
          height: "8%",
          width: "100%"
        }, "paddingTop", "5px")
      }, _react["default"].createElement("h2", null, "Variables")), _react["default"].createElement("div", {
        style: {
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }
      }, _react["default"].createElement("div", {
        style: {
          width: "100%",
          border: "1px solid #999297",
          borderRadius: "50px"
        }
      })), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        style: {
          paddingLeft: "5px",
          overflowX: "scroll"
        }
      }, this.state.variables.map(function (variable, i) {
        return _react["default"].createElement("div", {
          key: variable.ID
        }, _react["default"].createElement("label", {
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
        }, variable.nombreVariable)), i != _this11.state.variables.length - 1 ? _react["default"].createElement("div", {
          style: {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }
        }, _react["default"].createElement("div", {
          style: {
            width: "80%",
            border: "1px solid #d2d2e4",
            borderRadius: "50px"
          }
        })) : null);
      }))), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9",
        style: {
          height: "100%",
          width: "100%",
          padding: "0px"
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
          overflowX: "scroll",
          whiteSpace: "nowrap"
        }
      }, this.state.variableSeleccionada.atributos.map(function (atributo, i) {
        return _react["default"].createElement("div", {
          key: _this11.state.variableSeleccionada.nombre + atributo.nombre + atributo.ID,
          style: {
            height: "100%",
            width: "33%",
            display: "inline-block",
            lineHeight: "100%",
            borderRight: "1px solid #d2d2e4",
            backgroundColor: atributo.activa ? "rgba(210, 210, 228, 0.4)" : ""
          },
          onClick: function onClick() {
            return _this11.selCampo(i);
          },
          className: "addPointer"
        }, _react["default"].createElement("div", {
          style: {
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("p", {
          className: "lead"
        }, atributo.nombre)));
      })) : null), _react["default"].createElement("div", {
        className: "row",
        style: {
          display: this.state.campoSeleccionado != null ? "" : "none",
          borderBottom: "3px solid #d2d2e4",
          height: "30%"
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
          height: "40%",
          overflowY: "scroll"
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
      }, "Visualizar Variables")), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("table", {
        className: "table table-striped table-bordered"
      }, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        scope: "col"
      }, "#"), _react["default"].createElement("th", {
        scope: "col"
      }, "Instrucci\xF3n"), _react["default"].createElement("th", {
        scope: "col"
      }, "Borrar"))), _react["default"].createElement("tbody", null, this.state.filtros.map(function (filtro, i) {
        return _react["default"].createElement("tr", {
          key: filtro.instruccion + "" + j
        }, _react["default"].createElement("td", {
          scope: "row"
        }, i + 1), _react["default"].createElement("td", {
          scope: "row"
        }, filtro.texto), _react["default"].createElement("td", {
          scope: "row"
        }, _react["default"].createElement("img", {
          className: "addPointer",
          onClick: function onClick() {
            return _this11.eliminarFiltro(i);
          },
          src: "../assets/trash.png",
          style: {
            height: "20px",
            width: "20px",
            display: "block"
          }
        })));
      })))))));
    }
  }]);

  return Filtro;
}(_react["default"].Component);

exports["default"] = Filtro;
//# sourceMappingURL=Filtro.js.map
