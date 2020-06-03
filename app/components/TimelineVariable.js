"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _reactInputSlider = _interopRequireDefault(require("react-input-slider"));

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

var tipoCampos = [{
  nombre: "texto"
}, {
  nombre: "booleano"
}, {
  nombre: "fecha"
}, {
  nombre: "número"
}, {
  nombre: "arreglo"
}];
var variablesSeccionesDashboard = [];
var banderaImportacionInicio = 0,
    banderaImportacionFin = 0;

var TimelineVariable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TimelineVariable, _React$Component);

  function TimelineVariable(props) {
    var _this;

    _classCallCheck(this, TimelineVariable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TimelineVariable).call(this, props));
    _this.state = {
      html: [],
      resultados: []
    };
    _this.getResultsVariables = _this.getResultsVariables.bind(_assertThisInitialized(_this));
    _this.getResultsVariablesFieldsInit = _this.getResultsVariablesFieldsInit.bind(_assertThisInitialized(_this));
    _this.getFieldAttributes = _this.getFieldAttributes.bind(_assertThisInitialized(_this));
    _this.getFieldResults = _this.getFieldResults.bind(_assertThisInitialized(_this));
    _this.finImportacion = _this.finImportacion.bind(_assertThisInitialized(_this));
    _this.insertarValorEnColeccion = _this.insertarValorEnColeccion.bind(_assertThisInitialized(_this));
    _this.crearHTML = _this.crearHTML.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TimelineVariable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getResultsVariables();
    }
  }, {
    key: "getResultsVariables",
    value: function getResultsVariables() {
      var _this2 = this;

      console.log('this.props.tablaInstruccion');
      console.log(this.props.tablaInstruccion); //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from " + _this2.props.tablaInstruccion + " and finVigencia = '1964-05-28'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
              return [];
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) _this2.getResultsVariablesFieldsInit(result.recordset);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsVariablesFieldsInit",
    value: function getResultsVariablesFieldsInit(resultados) {
      var arregloTemp = [];
      banderaImportacionInicio = 0;
      banderaImportacionFin = 0;

      for (var i = 0; i < resultados.length; i++) {
        banderaImportacionFin++;
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
                resultados: array
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
              banderaImportacionInicio++;

              _this4.finImportacion();

              _this4.setState({
                resultados: array
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "finImportacion",
    value: function finImportacion() {
      if (banderaImportacionInicio == banderaImportacionFin) {
        var copyResultados = _toConsumableArray(this.state.resultados);

        copyResultados.sort(function (a, b) {
          return a.f3ch4Gu4rd4do - b.f3ch4Gu4rd4do;
        });

        if (this.props.esVariable) {
          if (this.props.variable.esColeccion) {
            var newCopy = [];

            for (var i = 0; i < copyResultados.length; i++) {
              this.insertarValorEnColeccion(copyResultados[i], newCopy);
            }

            ;
            copyResultados = newCopy;
          }
        }

        this.setState({
          resultados: copyResultados
        }, this.crearHTML);
      }
    }
  }, {
    key: "insertarValorEnColeccion",
    value: function insertarValorEnColeccion(valorAInsertar, arregloAInsertar) {
      var inserto = false;

      for (var i = 0; i < arregloAInsertar.length; i++) {
        for (var j = 0; j < arregloAInsertar[i].length; j++) {
          if (arregloAInsertar[i][j].f3ch4Gu4rd4do.getTime() == valorAInsertar.f3ch4Gu4rd4do.getTime()) {
            inserto = true;
            arregloAInsertar[i].push(valorAInsertar);
            return;
          }
        }

        ;
      }

      ;

      if (!inserto) {
        arregloAInsertar.push([valorAInsertar]);
        return;
      }
    }
  }, {
    key: "crearHTML",
    value: function crearHTML() {
      /*var html = <section className="cd-timeline js-cd-timeline">;
              html += <div className="cd-timeline__container">;
              for (var i = 0; i < this.state.resultados[0].resultados.length; i++) {
                  html += <div className="cd-timeline__block js-cd-block">;
                      html += <div className="cd-timeline__img cd-timeline__img--picture js-cd-img">;
                          html += <img src="../assets/edit.png" alt="Picture">;
                      html += </div>;
                      html += <div className="cd-timeline__content js-cd-content">;
                          html += <h3>{this.state.resultados[i].nombre}</h3>;
                      if(this.props.esVariable && this.props.variable.esColeccion) {
                          html += <a className="btn btn-primary btn-lg" >Ver Resultados</a>;
                      } else if(this.props.esVariable && !this.props.variable.esColeccion) {
                          for (var k = 0; k < this.state.resultados[0].atributos.length; k++) {
                              if(this.state.resultados[0].atributos[k].nombre.localeCompare("f3ch4Gu4rd4do") != 0) {
                                  html += <span style="font-weight: bold;">{this.state.resultados[0].atributos[k].nombre}</span>;
                                  html += <span>{this.state.resultados[0].resultados[i][this.state.resultados[0].atributos[k].nombre]}</span>;
                              }
                          };
                      }
                          html += '<span class="cd-timeline__date">'+this.state.resultados[0].resultados[i].f3ch4Gu4rd4do+'</span>'
                      html += '</div>';
                  html += '</div>';
              };
              html += '</div>';
          html += '</section>';*/
      var htmlContent = [];
      console.log('this.state.resultados');
      console.log(this.state.resultados);

      for (var i = 0; i < this.state.resultados[0].resultados.length; i++) {
        if (this.props.esVariable && this.props.variable.esColeccion) {
          var htmlRow = _react["default"].createElement("div", {
            key: i,
            className: "cd-timeline__block js-cd-block"
          }, _react["default"].createElement("div", {
            className: "cd-timeline__img cd-timeline__img--picture js-cd-img"
          }, _react["default"].createElement("img", {
            src: "../assets/edit.png",
            alt: "Picture"
          })), _react["default"].createElement("div", {
            className: "cd-timeline__content js-cd-content"
          }, _react["default"].createElement("a", {
            className: "btn btn-primary btn-lg"
          }, "Ver Resultados"), _react["default"].createElement("span", {
            className: "cd-timeline__date"
          }, this.state.resultados[0].resultados[i].f3ch4Gu4rd4do.getFullYear() + "-" + this.state.resultados[0].resultados[i].f3ch4Gu4rd4do.getMonth() + "-" + this.state.resultados[0].resultados[i].f3ch4Gu4rd4do.getDate())));

          htmlContent.push(htmlRow);
        } else
          /*if(this.props.esVariable && !this.props.variable.esColeccion)*/
          {
            var htmlObjectDesc = [];

            for (var k = 0; k < this.state.resultados[0].atributos.length; k++) {
              if (this.state.resultados[0].atributos[k].nombre.localeCompare("f3ch4Gu4rd4do") != 0) {
                htmlObjectDesc.push(_react["default"].createElement("span", {
                  key: i + "" + k + "a",
                  style: {
                    fontWeight: "bold"
                  }
                }, this.state.resultados[0].atributos[k].nombre));
                htmlObjectDesc.push(_react["default"].createElement("span", {
                  key: i + "" + k + "b"
                }, this.state.resultados[0].resultados[i][this.state.resultados[0].atributos[k].nombre]));
              }
            }

            ;

            var htmlRow = _react["default"].createElement("div", {
              key: i,
              className: "cd-timeline__block js-cd-block"
            }, _react["default"].createElement("div", {
              className: "cd-timeline__img cd-timeline__img--picture js-cd-img"
            }, _react["default"].createElement("img", {
              src: "../assets/edit.png",
              alt: "Picture"
            })), _react["default"].createElement("div", {
              className: "cd-timeline__content js-cd-content"
            }, htmlObjectDesc, _react["default"].createElement("span", {
              className: "cd-timeline__date"
            }, this.state.resultados[0].resultados[i].f3ch4Gu4rd4do.getFullYear() + "-" + this.state.resultados[0].resultados[i].f3ch4Gu4rd4do.getMonth() + "-" + this.state.resultados[0].resultados[i].f3ch4Gu4rd4do.getDate())));

            htmlContent.push(htmlRow);
          }
      }

      ;

      var html = _react["default"].createElement("section", {
        key: "hh",
        className: "cd-timeline js-cd-timeline"
      }, _react["default"].createElement("div", {
        className: "cd-timeline__container"
      }, htmlContent));

      this.setState({
        html: html
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, this.props.navbar, _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("a", {
        className: "btn btn-brand btnWhiteColorHover font-bold font-20",
        onClick: this.crearRiesgo
      }, "Realizar C\xE1lculo")), _react["default"].createElement("br", null), this.state.html);
    }
  }]);

  return TimelineVariable;
}(_react["default"].Component);

exports["default"] = TimelineVariable;
//# sourceMappingURL=TimelineVariable.js.map
