"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _OpcionesCrearRegla = _interopRequireDefault(require("./OpcionesCrearRegla.js"));

var _ContenedorReglas = _interopRequireDefault(require("./ContenedorReglas.js"));

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

var indiceSeleccionadoReglas = -1;
var tipoElementoSeleccionadoRegla = '';
var campo;
var conexionesOriginales = [],
    camposConexionesOriginales = [],
    variablesOriginales = [],
    camposVariablesOriginales = [];

var InstruccionVariable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InstruccionVariable, _React$Component);

  function InstruccionVariable(props) {
    var _this;

    _classCallCheck(this, InstruccionVariable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InstruccionVariable).call(this, props));
    _this.state = {
      reglas: _this.props.reglas,
      mostrarOpcionSino: false,
      conexiones: [],
      camposConexiones: [],
      variables: [],
      camposVariables: []
    };
    _this.actualizarEstadoSeleccionSinoNuevaRegla = _this.actualizarEstadoSeleccionSinoNuevaRegla.bind(_assertThisInitialized(_this));
    _this.getConections = _this.getConections.bind(_assertThisInitialized(_this));
    _this.getFieldsConections = _this.getFieldsConections.bind(_assertThisInitialized(_this));
    _this.getFieldConections = _this.getFieldConections.bind(_assertThisInitialized(_this));
    _this.getVariables = _this.getVariables.bind(_assertThisInitialized(_this));
    _this.getFieldsVariables = _this.getFieldsVariables.bind(_assertThisInitialized(_this));
    _this.getFieldVariables = _this.getFieldVariables.bind(_assertThisInitialized(_this));
    _this.retornarIndiceSeleccionadoParaMostrarCampoObjetivo = _this.retornarIndiceSeleccionadoParaMostrarCampoObjetivo.bind(_assertThisInitialized(_this));
    _this.retornoCampo = _this.retornoCampo.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(InstruccionVariable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getConections();
      this.getVariables();
    }
  }, {
    key: "actualizarEstadoSeleccionSinoNuevaRegla",
    value: function actualizarEstadoSeleccionSinoNuevaRegla(mostrar) {
      console.log('mostrar');
      console.log(mostrar);
      this.setState({
        mostrarOpcionSino: mostrar
      });
    }
  }, {
    key: "getConections",
    value: function getConections() {
      var _this2 = this;

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
              return [];
            }
          } else {
            transaction.commit(function (err) {
              var temp = [];

              for (var i = 0; i < result.recordset.length; i++) {
                temp.push({
                  valor: result.recordset[i].tabla,
                  ID: result.recordset[i].ID
                });
              }

              ;
              /*this.setState({
                  conexiones: temp
              }, this.getFieldsConections );*/

              _this2.setState({
                conexiones: temp
              });

              conexionesOriginales = temp;

              _this2.getFieldsConections();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getFieldsConections",
    value: function getFieldsConections() {
      var arregloTemp = [];

      for (var i = 0; i < conexionesOriginales.length; i++) {
        this.getFieldConections(conexionesOriginales[i].valor, i, arregloTemp, conexionesOriginales[i].ID);
      }

      ;
    }
  }, {
    key: "getFieldConections",
    value: function getFieldConections(nombreTabla, index, array, tablaID) {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '" + nombreTabla + "'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var nombreColumnas = [];

              for (var i = 0; i < result.recordset.length; i++) {
                nombreColumnas.push({
                  valor: result.recordset[i].COLUMN_NAME,
                  tipo: result.recordset[i].DATA_TYPE,
                  tablaID: tablaID
                });
              }

              ;

              if (array[index] == undefined) {
                array[index] = [];
              }

              array[index] = $.merge(array[index], nombreColumnas);

              _this3.setState({
                camposConexiones: array
              });

              camposConexionesOriginales = array;
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getVariables",
    value: function getVariables() {
      var _this4 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Variables", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
              return [];
            }
          } else {
            transaction.commit(function (err) {
              var temp = [];

              for (var i = 0; i < result.recordset.length; i++) {
                temp.push({
                  valor: result.recordset[i].nombre,
                  ID: result.recordset[i].ID
                });
              }

              ;
              /*this.setState({
                  variables: temp
              }, this.getFieldsVariables );*/

              _this4.setState({
                variables: temp
              });

              variablesOriginales = temp;

              _this4.getFieldsVariables();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getFieldsVariables",
    value: function getFieldsVariables() {
      var arregloTemp = [];

      for (var i = 0; i < variablesOriginales.length; i++) {
        this.getFieldVariables(variablesOriginales[i].ID, i, arregloTemp);
      }

      ;
    }
  }, {
    key: "getFieldVariables",
    value: function getFieldVariables(variableID, index, array) {
      var _this5 = this;

      if (variableID != undefined) {
        var transaction = new _mssql["default"].Transaction(this.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("select * from VariablesCampos where variableID = " + variableID, function (err, result) {
            if (err) {
              if (!rolledBack) {
                console.log(err);
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                var nombreColumnas = [];

                for (var i = 0; i < result.recordset.length; i++) {
                  nombreColumnas.push({
                    valor: result.recordset[i].nombre,
                    tipo: result.recordset[i].tipo,
                    ID: result.recordset[i].ID,
                    variableID: variableID
                  });
                }

                ;

                if (array[index] == undefined) {
                  array[index] = [];
                }

                array[index] = $.merge(array[index], nombreColumnas);

                _this5.setState({
                  camposVariables: array
                });

                camposVariablesOriginales = array;
                console.log('camposVariablesOriginales');
                console.log(camposVariablesOriginales);
              });
            }
          });
        }); // fin transaction
      }
    }
  }, {
    key: "retornarIndiceSeleccionadoParaMostrarCampoObjetivo",
    value: function retornarIndiceSeleccionadoParaMostrarCampoObjetivo(reglaSeleccionada, tipoIndiceSeleccionado, indiceI, indiceJ) {
      console.log('reglaSeleccionada');
      console.log(reglaSeleccionada);
      console.log('tipoIndiceSeleccionado');
      console.log(tipoIndiceSeleccionado);
      console.log('this.props.reglas');
      console.log(this.props.reglas);
      console.log('this.props.reglas.length');
      console.log(this.props.reglas.length);
      /*console.log('this.props.reglas[indiceI-1].length');
      console.log(this.props.reglas[indiceI-1].length);*/

      if (this.props.reglas.length - 1 == indiceI
      /*&& this.props.reglas[indiceI-1].length == indiceJ*/
      && tipoIndiceSeleccionado.localeCompare("abajo") == 0) {
        //EL CASO CUANDO EL INDICE SELECCIONADO DE REGLAS ES EL ULTIMO Y SELECCIONO tipoIndiceSeleccionado = ABAJO
        //reset
        console.log('1');
        this.setState({
          conexiones: conexionesOriginales,
          camposConexiones: camposConexionesOriginales,
          variables: variablesOriginales,
          camposVariables: camposVariablesOriginales
        });
      } else {
        console.log('2'); //puede ser otra regla, una formula o el cursor de arriba
        //mostrar campos

        var tempCopyVariables = [];
        var tempCopyCampos = [];

        if (reglaSeleccionada[0].esConexionTabla) {
          console.log('2.1');

          for (var i = 0; i < conexionesOriginales.length; i++) {
            if (reglaSeleccionada[0].conexionTablaID == conexionesOriginales[i].ID) {
              tempCopyVariables = conexionesOriginales[i];
              tempCopyCampos = camposConexionesOriginales[i];
              break;
            }
          }

          ;
          this.setState({
            conexiones: [tempCopyVariables],
            camposConexiones: [tempCopyCampos],
            variables: [],
            camposVariables: []
          });
        } else {
          console.log('2.2');

          for (var i = 0; i < variablesOriginales.length; i++) {
            if (reglaSeleccionada[0].variableID == variablesOriginales[i].ID) {
              tempCopyVariables = jQuery.extend(true, {}, variablesOriginales[i]);
              tempCopyCampos = jQuery.extend(true, {}, camposVariablesOriginales[i]);
              break;
            }
          }

          ;
          this.setState({
            conexiones: [],
            camposConexiones: [],
            variables: [tempCopyVariables],
            camposVariables: [[tempCopyCampos]]
          });
        }
      }
      /*if(tipoIndiceSeleccionado.localeCompare("abajo") == 0) {
          console.log('1');
          //reset
          this.setState({
              conexiones: conexionesOriginales,
              camposConexiones: camposConexionesOriginales,
              variables: variablesOriginales,
              camposVariables: camposVariablesOriginales
          });
      }  else {
          console.log('2');
          //puede ser otra regla, una formula o el cursor de arriba
          //mostrar campos
          var tempCopyVariables = [];
          var tempCopyCampos = [];
          if(reglaSeleccionada.esConexionTabla) {
              for (var i = 0; i < conexionesOriginales.length; i++) {
                  if(reglaSeleccionada.conexionTablaID == conexionesOriginales[i].ID) {
                      tempCopyVariables = conexionesOriginales[i];
                      tempCopyCampos = camposConexionesOriginales[i];
                      break;
                  }
              };
              console.log('[tempCopyVariables]')
              console.log([tempCopyVariables])
              console.log('[tempCopyCampos]')
              console.log([tempCopyCampos])
              console.log('conexionesOriginales')
              console.log(conexionesOriginales)
              console.log('camposConexionesOriginales')
              console.log(camposConexionesOriginales)
              this.setState({
                  conexiones: [tempCopyVariables],
                  camposConexiones: [tempCopyCampos],
                  variables: [],
                  camposVariables: []
              });
          } else {
              for (var i = 0; i < variablesOriginales.length; i++) {
                  if(reglaSeleccionada.variableID == variablesOriginales[i].ID) {
                      tempCopyVariables = jQuery.extend(true, {}, variablesOriginales[i]);
                      tempCopyCampos = jQuery.extend(true, {}, camposVariablesOriginales[i]);
                      break;
                  }
              };
              this.setState({
                  conexiones: [],
                  camposConexiones: [],
                  variables: [tempCopyVariables],
                  camposVariables: [[tempCopyCampos]]
              });
          }
      }*/

    }
  }, {
    key: "retornoCampo",
    value: function retornoCampo(campo) {
      campo = campo;
      this.props.retornoCampo(campo);
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, this.props.navbar, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "card",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement(_OpcionesCrearRegla["default"], {
        pool: this.props.pool,
        campos: this.props.campos,
        asignaciones: this.props.asignaciones,
        retornoCampo: this.retornoCampo,
        retornoOperacion: this.props.retornoOperacion,
        camposDropdown: this.props.camposDropdown,
        valoresDropdown: this.props.valoresDropdown,
        mostrarOpcionSino: this.state.mostrarOpcionSino,
        callbackCrearRegla: this.props.callbackCrearRegla,
        goToCreateFormula: this.props.goToCreateFormula,
        conexiones: this.state.conexiones,
        camposConexiones: this.state.camposConexiones,
        variables: this.state.variables,
        camposVariables: this.state.camposVariables,
        actualizarNivelNuevaRegla: this.props.actualizarNivelNuevaRegla,
        retornarEstadoVistaEsCondicion: this.props.retornarEstadoVistaEsCondicion
      }))), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "text-center"
      }, _react["default"].createElement("h2", null, "L\xF3gica para el c\xE1lculo")), _react["default"].createElement(_ContenedorReglas["default"], {
        reglas: this.state.reglas,
        actualizarEstadoSeleccionSinoNuevaRegla: this.actualizarEstadoSeleccionSinoNuevaRegla,
        retornarIndiceSeleccionadoParaMostrarCampoObjetivo: this.retornarIndiceSeleccionadoParaMostrarCampoObjetivo,
        retornarIndiceSeleccionado: this.props.retornarIndiceSeleccionado
      }))));
    }
  }]);

  return InstruccionVariable;
}(_react["default"].Component);

exports["default"] = InstruccionVariable;
//# sourceMappingURL=InstruccionVariable.js.map
