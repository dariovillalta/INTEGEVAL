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
var seccionesDashboard = [];
var tipoObjetoUpdate = [],
    tipoGraficoUpdate = [],
    displayGraphicsUpdate = [],
    indiceGraphSelectUpdate = [],
    objetoEjeXUpdate = [];
var variablesSeleccionadasSeccionesDashboardUpdate = [],
    variablesSeleccionadasSeccionesDashboardTablaUpdate = [];
var contadorGetObjectsNameINICIO = 0,
    contadorGetObjectsNameFIN = 0;

var VerDashboard =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VerDashboard, _React$Component);

  function VerDashboard(props) {
    var _this;

    _classCallCheck(this, VerDashboard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VerDashboard).call(this, props));
    _this.state = {
      html: ''
    };
    _this.crearRiesgo = _this.crearRiesgo.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(VerDashboard, [{
    key: "crearDashboard",
    value: function crearDashboard() {
      var nombre = $("#nombreDashboard").val();
      var descripcion = $("#descripcionDashboard").val();
      ;
    }
  }, {
    key: "crearHTML",
    value: function crearHTML() {
      var htmlSecciones = [];
      var contadorCol6PorRow = 0;

      for (var i = 0; i < seccionesDashboard.length; i++) {
        if (seccionesDashboard[i].tipoObjeto.localeCompare("grafica") == 0) {
          if (seccionesDashboard[i].tamano.localeCompare("col-6") == 0) {
            contadorCol6PorRow++;

            if (contadorCol6PorRow == 2) {
              contadorCol6PorRow = 0;
            }

            var htmlSeccion = _react["default"].createElement("div", {
              className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6",
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }
            }, _react["default"].createElement("div", {
              id: "grafica" + i
            }));

            htmlSecciones.push(htmlSeccion);
            /*html += '<div className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>';
            html += this.getObjetoCodigo(seccionesDashboard[i].tipoObjeto, seccionesDashboard[i].instrucciones, i);*/
          }
        } else if (seccionesDashboard[i].tipoObjeto.localeCompare("tabla") == 0) {
          if (seccionesDashboard[i].tamano.localeCompare("col-6") == 0) {
            contadorCol6PorRow++;

            if (contadorCol6PorRow == 2) {
              contadorCol6PorRow = 0;
            }

            html += '<div className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>';
            html += this.getObjetoCodigo(seccionesDashboard[i].tipoObjeto, seccionesDashboard[i].instrucciones, i);
          }
        }
      }

      ;
    }
  }, {
    key: "getObjetoCodigo",
    value: function getObjetoCodigo(tipoObjeto, instrucciones, index) {
      var html = '';

      if (tipoObjeto.localeCompare("grafica") == 0) {
        html += '\t<div id="grafica' + index + '"></div>';
      } else if (tipoObjeto.localeCompare("tabla") == 0) {//html += ;
      }
    }
  }, {
    key: "crearArreglosDeInstrucciones",
    value: function crearArreglosDeInstrucciones() {
      contadorGetObjectsNameINICIO = 0;
      contadorGetObjectsNameFIN = 0;
      tipoObjetoUpdate = [];
      tipoGraficoUpdate = [];
      displayGraphicsUpdate = [];
      indiceGraphSelectUpdate = [];
      objetoEjeXUpdate = [];
      variablesSeleccionadasSeccionesDashboardUpdate = [];
      variablesSeleccionadasSeccionesDashboardTablaUpdate = [];

      for (var i = 0; i < seccionesDashboard.length; i++) {
        if (seccionesDashboard[i].instruccion.indexOf("GRAFICA") == 0) {
          var cadenaValores = seccionesDashboard[i].instruccion.split("=>")[1];
          tipoObjetoUpdate[i] = 'grafica';
          displayGraphicsUpdate[i] = false;

          if (cadenaValores.indexOf("LINEA") == 0 || cadenaValores.indexOf("AREA") == 0 || cadenaValores.indexOf("BARRA") == 0 || cadenaValores.indexOf("DISPERSION") == 0) {
            if (cadenaValores.indexOf("LINEA") == 0) {
              tipoGraficoUpdate[i] = 'LINEA';
              indiceGraphSelectUpdate[i] = 0;
            } else if (cadenaValores.indexOf("AREA") == 0) {
              tipoGraficoUpdate[i] = 'AREA';
              indiceGraphSelectUpdate[i] = 1;
            } else if (cadenaValores.indexOf("BARRA") == 0) {
              tipoGraficoUpdate[i] = 'BARRA';
              indiceGraphSelectUpdate[i] = 2;
            } else if (cadenaValores.indexOf("DISPERSION") == 0) {
              tipoGraficoUpdate[i] = 'DISPERSION';
              indiceGraphSelectUpdate[i] = 3;
            }

            if (objetoEjeXUpdate[i] == undefined) objetoEjeXUpdate[i] = [];
            var arregloObjetoX = cadenaValores.split("\\/")[0];
            var objetoXCadena = arregloObjetoX.substring(arregloObjetoX.indexOf("{") + 1, arregloObjetoX.indexOf("}"));
            eval("objetoEjeXUpdate[i] = {" + objetoXCadena + "}");
            objetoEjeXUpdate[i].nombre = '';
            contadorGetObjectsNameFIN++;
            this.getObject(objetoEjeXUpdate, i, objetoEjeXUpdate[i], "objetoEjeXUpdate");
            var arregloObjetosY = cadenaValores.split("\\/")[1];
            var arregloValores = arregloObjetosY.split("<>");
            if (variablesSeleccionadasSeccionesDashboardUpdate[i] == undefined) variablesSeleccionadasSeccionesDashboardUpdate[i] = [];

            for (var j = 0; j < arregloValores.length; j++) {
              var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{") + 1, arregloValores[j].lastIndexOf("}"));
              eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({" + objeto + "})");
              variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = '';
              contadorGetObjectsNameFIN++;
              this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
            }

            ;
          } else if (cadenaValores.indexOf("PIE") == 0) {
            tipoGraficoUpdate[i] = 'PIE';
            indiceGraphSelectUpdate[i] = 4;
            if (objetoEjeXUpdate[i] == undefined) objetoEjeXUpdate[i] = [];
            var arregloObjetoX = cadenaValores.split("\\/")[0];
            var objetoXCadena = arregloObjetoX.substring(arregloObjetoX.indexOf("{") + 1, arregloObjetoX.lastIndexOf("}"));
            eval("objetoEjeXUpdate[i] = {" + objetoXCadena + "}");
            objetoEjeXUpdate[i].nombre = '';
            contadorGetObjectsNameFIN++;
            this.getObject(objetoEjeXUpdate, indice, objetoEjeXUpdate[i], "objetoEjeXUpdate");
            var arregloObjetosY = cadenaValores.split("\\/")[1];
            var arregloValores = arregloObjetosY.split("<>");

            for (var j = 0; j < arregloValores.length; j++) {
              var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{") + 1, arregloValores[j].lastIndexOf("}"));
              eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({" + objeto + "})");
              variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = '';
              contadorGetObjectsNameFIN++;
              this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
            }

            ;
          }
        } else if (seccionesDashboard[i].instruccion.indexOf("TABLA") == 0) {
          var cadenaValores = seccionesDashboard[i].instruccion.split("=>")[1];
          var arregloValores = cadenaValores.split("<>");
          tipoObjetoUpdate[i] = 'tabla';
          if (variablesSeleccionadasSeccionesDashboardTablaUpdate[i] == undefined) variablesSeleccionadasSeccionesDashboardTablaUpdate[i] = [];

          for (var j = 0; j < arregloValores.length; j++) {
            var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{") + 1, arregloValores[j].lastIndexOf("}"));
            eval("variablesSeleccionadasSeccionesDashboardTablaUpdate[i].push({" + objeto + "})");
            variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j].nombre = '';
            contadorGetObjectsNameFIN++;
            this.getObject(variablesSeleccionadasSeccionesDashboardTablaUpdate, i, variablesSeleccionadasSeccionesDashboardTablaUpdate[i][j], "variablesSeleccionadasSeccionesDashboardTablaUpdate", j);
          }

          ;
        }
      }

      ;
      console.log('tipoObjetoUpdate');
      console.log(tipoObjetoUpdate);
      console.log('tipoGraficoUpdate');
      console.log(tipoGraficoUpdate);
      console.log('displayGraphicsUpdate');
      console.log(displayGraphicsUpdate);
      console.log('indiceGraphSelectUpdate');
      console.log(indiceGraphSelectUpdate);
      console.log('objetoEjeXUpdate');
      console.log(objetoEjeXUpdate);
      console.log('variablesSeleccionadasSeccionesDashboardUpdate');
      console.log(variablesSeleccionadasSeccionesDashboardUpdate);
      console.log('variablesSeleccionadasSeccionesDashboardTablaUpdate');
      console.log(variablesSeleccionadasSeccionesDashboardTablaUpdate);
    }
  }, {
    key: "getObject",
    value: function getObject(arreglo, indiceSec, objeto, arregloNombre, indice) {
      var _this2 = this;

      var instruccion = '';

      if (objeto.esVariable) {
        instruccion = 'SELECT * FROM Variables WHERE ID = ' + objeto.variableID;
      } else if (objeto.esSQL) {
        instruccion = 'SELECT * FROM Variables WHERE ID = ' + objeto.variableID;
      } else if (objeto.esTabla) {
        instruccion = 'SELECT * FROM Tablas WHERE ID = ' + objeto.tablaID;
      } else if (objeto.esExcel) {
        instruccion = 'SELECT * FROM ExcelVariables WHERE ID = ' + objeto.excelVariableID + ' AND excelArchivoID = ' + excelArchivoID;
      } else if (objeto.esForma) {
        instruccion = 'SELECT * FROM FormasVariables WHERE ID = ' + objeto.formaVariableID;
      }

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query(instruccion, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                var nombre = result.recordset[0].nombre;

                if (objeto.esTabla) {
                  nombre = objeto.nombreCampoTabla;
                }

                if (arregloNombre.localeCompare("objetoEjeXUpdate") == 0) arreglo[indiceSec].nombre = nombre;else arreglo[indiceSec][indice].nombre = nombre;
                contadorGetObjectsNameINICIO++;

                _this2.traerDatos();
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "traerDatos",
    value: function traerDatos() {
      if (contadorGetObjectsNameINICIO == contadorGetObjectsNameFIN) {
        for (var i = 0; i < seccionesDashboard.length; i++) {
          if (seccionesDashboard[i].tipoObjeto.localeCompare("grafica") == 0) {
            if (tipoGraficoUpdate[i].indexOf("LINEA") == 0 || tipoGraficoUpdate[i].indexOf("AREA") == 0 || tipoGraficoUpdate[i].indexOf("BARRA") == 0 || tipoGraficoUpdate[i].indexOf("DISPERSION") == 0) {//objetoEjeXUpdate
              //variablesSeleccionadasSeccionesDashboardUpdate
            } else if (tipoGraficoUpdate[i].indexOf("PIE") == 0) {//
            }
          } else {//variablesSeleccionadasSeccionesDashboardTablaUpdate
            }
        }

        ;
      }
    }
  }, {
    key: "getResultsVariables",
    value: function getResultsVariables(variable, arreglo) {
      var _this3 = this;

      //OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosNombreVariables where nombre = '" + variable.nombre + "'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
              return [];
            }
          } else {
            transaction.commit(function (err) {
              _this3.getResultsVariablesFieldsInit(result.recordset, arreglo);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getResultsVariablesFieldsInit",
    value: function getResultsVariablesFieldsInit(resultados, arreglo) {
      for (var i = 0; i < resultados.length; i++) {
        this.getFieldAttributes(resultados[i], i, arreglo);
        this.getFieldResults(resultados[i], i, arreglo);
      }

      ;
    }
  }, {
    key: "getFieldAttributes",
    value: function getFieldAttributes(resultado, index, array) {
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
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getFieldResults",
    value: function getFieldResults(resultado, index, array) {
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
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Crear Dashboard"), _react["default"].createElement("div", {
        className: "page-breadcrumb"
      }, _react["default"].createElement("nav", {
        "aria-label": "breadcrumb"
      }, _react["default"].createElement("ol", {
        className: "breadcrumb"
      }, _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.retornarSeleccionDashboards
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Dashboards")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Dashboard: ", this.props.tituloDashboard))))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card influencer-profile-data"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        className: "border-top border-bottom addPaddingToConfig",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"
      }, _react["default"].createElement("label", {
        htmlFor: "nombreDashboard",
        className: "col-form-label"
      }, "Nombre Dashboard")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("input", {
        id: "nombreDashboard",
        type: "text",
        className: "form-control form-control-sm"
      }))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"
      }, _react["default"].createElement("label", {
        htmlFor: "descripcionDashboard",
        className: "col-form-label"
      }, "Descripci\xF3n de Dashboard:")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"
      }, _react["default"].createElement("textarea", {
        className: "form-control",
        id: "descripcionDashboard",
        rows: "3"
      }))), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%",
          textAlign: "center"
        }
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Secciones de Dashboard")), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "tamano",
        className: "col-form-label"
      }, "Tipo de Indicador")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("select", {
        id: "tamano",
        className: "form-control"
      }, _react["default"].createElement("option", {
        value: "col-6"
      }, "Mitad de P\xE1gina"), _react["default"].createElement("option", {
        value: "col-12"
      }, "Riesgo Inherente")))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        htmlFor: "tipoObjeto",
        className: "col-form-label"
      }, "Tipo de Objeto")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("select", {
        id: "tipoObjeto",
        className: "form-control"
      }, _react["default"].createElement("option", {
        value: "grafica"
      }, "Gr\xE1fica"), _react["default"].createElement("option", {
        value: "tabla"
      }, "Tabla")))), _react["default"].createElement("div", {
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Variables Seleccionadas")), _react["default"].createElement("div", {
        className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
      }, _react["default"].createElement("div", {
        style: {
          width: "50%",
          textAlign: "center"
        }
      }, _react["default"].createElement("h4", {
        className: "pageheader-title"
      }, "Variables Seleccionadas"), _react["default"].createElement("div", {
        style: {
          height: "25vh",
          width: "100%",
          overflowY: "scroll"
        }
      }, this.state.variablesSeleccionadasSeccionesDashboard[i].map(function (variableSeleccionada, i) {
        return _react["default"].createElement("div", {
          style: {
            height: "33%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, variableSeleccionada.nombre);
      }))), _react["default"].createElement("div", {
        style: {
          width: "50%",
          textAlign: "center"
        }
      }, _react["default"].createElement("h4", {
        className: "pageheader-title"
      }, "Variables Disponibles"), _react["default"].createElement("div", {
        style: {
          height: "25vh",
          width: "100%",
          overflowY: "scroll"
        }
      }, this.state.variablesDisponiblesSeccionesDashboard[i].map(function (variableSeleccionada, i) {
        return _react["default"].createElement("div", {
          style: {
            height: "33%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, variableSeleccionada.nombre);
      }))))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("a", {
        className: "btn btn-success btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: this.crearRiesgo
      }, "Crear")), _react["default"].createElement("br", null)))))));
    }
  }]);

  return VerDashboard;
}(_react["default"].Component);

exports["default"] = VerDashboard;
//# sourceMappingURL=VerDashboard.js.map
