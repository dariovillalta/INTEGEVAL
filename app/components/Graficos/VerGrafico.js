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

var c3 = require("c3");

var seccionesGraficos = [];
var tipoObjetoUpdate = [],
    tipoGraficoUpdate = [],
    displayGraphicsUpdate = [],
    indiceGraphSelectUpdate = [],
    objetoEjeXUpdate = [];
var variablesSeleccionadasSeccionesDashboardUpdate = [],
    variablesSeleccionadasSeccionesDashboardTablaUpdate = [];
var contadorGetObjectsNameINICIO = 0,
    contadorGetObjectsNameFIN = 0;

var VerGrafico =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VerGrafico, _React$Component);

  function VerGrafico(props) {
    var _this;

    _classCallCheck(this, VerGrafico);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VerGrafico).call(this, props));
    _this.state = {
      html: ''
    };
    _this.crearHTML = _this.crearHTML.bind(_assertThisInitialized(_this));
    _this.crearArreglosDeInstrucciones = _this.crearArreglosDeInstrucciones.bind(_assertThisInitialized(_this));
    _this.crearArreglosDeInstrucciones = _this.crearArreglosDeInstrucciones.bind(_assertThisInitialized(_this));
    _this.cargarDatos = _this.cargarDatos.bind(_assertThisInitialized(_this));
    _this.retornarVariable = _this.retornarVariable.bind(_assertThisInitialized(_this));
    _this.styleDate = _this.styleDate.bind(_assertThisInitialized(_this));
    seccionesGraficos = _this.props.seccionesGraficos;
    return _this;
  }

  _createClass(VerGrafico, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.crearHTML();
    }
  }, {
    key: "crearHTML",
    value: function crearHTML() {
      var htmlSecciones = []; //el arreglo final a poner por html

      var htmlRows = []; //arreglo de col segun cada row (maximo 2 por row)

      var contadorRows = 0,
          contadorCol6PorRow = 0; //contadorRows: para saber a que row de htmlRows estamos agregando
      //contadorCol6PorRow: para saber cuando agregar a contadorRows dependiendo si es col6 o col12

      for (var i = 0; i < seccionesGraficos.length; i++) {
        var htmlSeccion = {
          clase: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12",
          grafica: _react["default"].createElement("div", {
            id: "grafica" + i
          })
        };

        if (htmlRows[contadorRows] == undefined) {
          htmlRows[contadorRows] = [];
        }

        htmlRows[contadorRows].push(htmlSeccion);
        contadorCol6PorRow = 0;
        contadorRows++;
      }

      ;
      this.setState({
        html: htmlRows
      }, this.crearArreglosDeInstrucciones); //this.crearArreglosDeInstrucciones();
    }
  }, {
    key: "crearArreglosDeInstrucciones",
    value: function crearArreglosDeInstrucciones() {
      console.log('seccionesGraficos');
      console.log(seccionesGraficos); //limpiando valores nuevos

      tipoObjetoUpdate = [];
      tipoGraficoUpdate = [];
      displayGraphicsUpdate = [];
      indiceGraphSelectUpdate = [];
      objetoEjeXUpdate = [];
      variablesSeleccionadasSeccionesDashboardUpdate = [];
      variablesSeleccionadasSeccionesDashboardTablaUpdate = [];

      for (var i = 0; i < seccionesGraficos.length; i++) {
        if (seccionesGraficos[i].instruccion.indexOf("GRAFICA") == 0) {
          var cadenaValores = seccionesGraficos[i].instruccion.split("=>")[1];
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
            objetoEjeXUpdate[i].nombre = ''; //this.getObject(objetoEjeXUpdate, i, objetoEjeXUpdate[i], "objetoEjeXUpdate");

            var arregloObjetosY = cadenaValores.split("\\/")[1];
            var arregloValores = arregloObjetosY.split("<>");
            if (variablesSeleccionadasSeccionesDashboardUpdate[i] == undefined) variablesSeleccionadasSeccionesDashboardUpdate[i] = [];

            for (var j = 0; j < arregloValores.length; j++) {
              var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{") + 1, arregloValores[j].lastIndexOf("}"));
              eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({" + objeto + "})");
              variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = ''; //this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
            }

            ;
          } else if (cadenaValores.indexOf("PIE") == 0) {
            tipoGraficoUpdate[i] = 'PIE';
            indiceGraphSelectUpdate[i] = 4;
            if (objetoEjeXUpdate[i] == undefined) objetoEjeXUpdate[i] = [];
            var arregloObjetosY = cadenaValores;
            var arregloValores = arregloObjetosY.split("<>");
            if (variablesSeleccionadasSeccionesDashboardUpdate[i] == undefined) variablesSeleccionadasSeccionesDashboardUpdate[i] = [];

            for (var j = 0; j < arregloValores.length; j++) {
              var objeto = arregloValores[j].substring(arregloValores[j].indexOf("{") + 1, arregloValores[j].lastIndexOf("}"));
              eval("variablesSeleccionadasSeccionesDashboardUpdate[i].push({" + objeto + "})");
              variablesSeleccionadasSeccionesDashboardUpdate[i][j].nombre = ''; //this.getObject(variablesSeleccionadasSeccionesDashboardUpdate, i, variablesSeleccionadasSeccionesDashboardUpdate[i][j], "variablesSeleccionadasSeccionesDashboardUpdate", j);
            }

            ;
          }
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
      this.cargarDatos();
    }
  }, {
    key: "cargarDatos",
    value: function cargarDatos() {
      if (contadorGetObjectsNameINICIO == contadorGetObjectsNameFIN) {
        for (var k = 0; k < seccionesGraficos.length; k++) {
          if (seccionesGraficos[k].instruccion.indexOf("GRAFICA") == 0) {
            if (tipoGraficoUpdate[k].indexOf("LINEA") == 0) {
              //objetoEjeXUpdate
              console.log('k = ' + k);
              console.log('1');
              console.log('objetoEjeXUpdate');
              console.log(objetoEjeXUpdate);
              var objetoEje = this.retornarVariable(objetoEjeXUpdate[k]); //variablesSeleccionadasSeccionesDashboardUpdate

              var variablesSeleccionadasSeccionesDashboard = [];
              console.log('2');

              for (var i = 0; i < variablesSeleccionadasSeccionesDashboardUpdate[k].length; i++) {
                variablesSeleccionadasSeccionesDashboard.push(this.retornarVariable(variablesSeleccionadasSeccionesDashboardUpdate[k][i]));
              }

              ;
              var ejeX = [objetoEjeXUpdate[k].nombreCampo];

              for (var i = 0; i < objetoEje.resultados.length; i++) {
                ejeX.push(objetoEje.resultados[i][objetoEjeXUpdate[k].nombreCampo]);
              }

              ;
              var ejesY = [];

              for (var i = 0; i < variablesSeleccionadasSeccionesDashboard.length; i++) {
                for (var j = 0; j < variablesSeleccionadasSeccionesDashboard[i].resultados.length; j++) {
                  if (j == 0) {
                    console.log('ENTRE');
                    ejesY[i] = [];

                    if (variablesSeleccionadasSeccionesDashboardUpdate[k][i].esVariable) {
                      ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreVariable);
                    } else if (variablesSeleccionadasSeccionesDashboardUpdate[k][i].esIndicador) {
                      ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreIndicador);
                    } else if (variablesSeleccionadasSeccionesDashboardUpdate[k][i].esRiesgo) {
                      ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreRiesgo);
                    }
                  }

                  ejesY[i].push(variablesSeleccionadasSeccionesDashboard[i].resultados[j][variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreCampo]);
                }

                ;
              }

              ;
              var columnas = [ejeX];
              columnas = columnas.concat(ejesY);
              var xObjectAxis;

              for (var i = 0; i < objetoEje.atributos.length; i++) {
                if (objetoEje.atributos[i].nombre.localeCompare(objetoEjeXUpdate[k].nombreCampo) == 0) {
                  if (objetoEje.atributos[i].tipo.localeCompare("date") == 0) {
                    xObjectAxis = {
                      type: 'timeseries',
                      label: objetoEjeXUpdate[k].nombreCampo,
                      tick: {
                        rotate: 90,
                        multiline: false,
                        format: function format(x) {
                          return x.getFullYear() + "-" + x.getMonth() + "-" + x.getDate();
                        }
                      },
                      height: 130,
                      show: true
                    };
                  } else {
                    xObjectAxis = {
                      type: 'category',
                      label: objetoEjeXUpdate[k].nombreCampo,
                      tick: {
                        rotate: 75,
                        multiline: false
                      },
                      height: 80,
                      show: true
                    };
                  }

                  break;
                }
              }

              ;
              var chart = c3.generate({
                bindto: "#grafica" + k,
                data: {
                  x: objetoEjeXUpdate[k].nombreCampo,
                  columns: columnas
                },
                axis: {
                  y: {
                    show: true
                  },
                  x: xObjectAxis
                }
              });
            } else if (tipoGraficoUpdate[k].indexOf("AREA") == 0) {
              //objetoEjeXUpdate
              var objetoEje = this.retornarVariable(objetoEjeXUpdate[k]); //variablesSeleccionadasSeccionesDashboardUpdate

              var variablesSeleccionadasSeccionesDashboard = [];

              for (var i = 0; i < variablesSeleccionadasSeccionesDashboardUpdate[k].length; i++) {
                variablesSeleccionadasSeccionesDashboard.push(this.retornarVariable(variablesSeleccionadasSeccionesDashboardUpdate[k][i]));
              }

              ;
              var ejeX = [objetoEjeXUpdate[k].nombreCampo];

              for (var i = 0; i < objetoEje.resultados.length; i++) {
                ejeX.push(objetoEje.resultados[i][objetoEjeXUpdate[k].nombreCampo]);
              }

              ;
              var ejesY = [];

              for (var i = 0; i < variablesSeleccionadasSeccionesDashboard.length; i++) {
                for (var j = 0; j < variablesSeleccionadasSeccionesDashboard[i].resultados.length; j++) {
                  if (j == 0) {
                    console.log('ENTRE');
                    ejesY[i] = [];

                    if (variablesSeleccionadasSeccionesDashboardUpdate[k][i].esVariable) {
                      ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreVariable);
                    } else if (variablesSeleccionadasSeccionesDashboardUpdate[k][i].esIndicador) {
                      ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreIndicador);
                    } else if (variablesSeleccionadasSeccionesDashboardUpdate[k][i].esRiesgo) {
                      ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreRiesgo);
                    }
                  }

                  ejesY[i].push(variablesSeleccionadasSeccionesDashboard[i].resultados[j][variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreCampo]);
                }

                ;
              }

              ;
              var columnas = [ejeX];
              columnas = columnas.concat(ejesY);
              var xObjectAxis;

              for (var i = 0; i < objetoEje.atributos.length; i++) {
                if (objetoEje.atributos[i].nombre.localeCompare(objetoEjeXUpdate[k].nombreCampo) == 0) {
                  if (objetoEje.atributos[i].tipo.localeCompare("date") == 0) {
                    xObjectAxis = {
                      type: 'timeseries',
                      label: objetoEjeXUpdate[k].nombreCampo,
                      tick: {
                        rotate: 90,
                        multiline: false,
                        format: function format(x) {
                          return x.getFullYear() + "-" + x.getMonth() + "-" + x.getDate();
                        }
                      },
                      height: 130,
                      show: true
                    };
                  } else {
                    xObjectAxis = {
                      type: 'category',
                      label: objetoEjeXUpdate[k].nombreCampo,
                      tick: {
                        rotate: 75,
                        multiline: false
                      },
                      height: 80,
                      show: true
                    };
                  }

                  break;
                }
              }

              ;
              var chart = c3.generate({
                bindto: "#grafica" + k,
                data: {
                  x: objetoEjeXUpdate[k].nombreCampo,
                  columns: columnas,
                  type: 'area'
                },
                axis: {
                  y: {
                    show: true
                  },
                  x: xObjectAxis
                }
              });
            } else if (tipoGraficoUpdate[k].indexOf("BARRA") == 0) {
              //objetoEjeXUpdate
              var objetoEje = this.retornarVariable(objetoEjeXUpdate[k]); //variablesSeleccionadasSeccionesDashboardUpdate

              var variablesSeleccionadasSeccionesDashboard = [];

              for (var i = 0; i < variablesSeleccionadasSeccionesDashboardUpdate[k].length; i++) {
                variablesSeleccionadasSeccionesDashboard.push(this.retornarVariable(variablesSeleccionadasSeccionesDashboardUpdate[k][i]));
              }

              ;
              var ejeX = [objetoEjeXUpdate[k].nombreCampo];

              for (var i = 0; i < objetoEje.resultados.length; i++) {
                ejeX.push(objetoEje.resultados[i][objetoEjeXUpdate[k].nombreCampo]);
              }

              ;
              var ejesY = [];

              for (var i = 0; i < variablesSeleccionadasSeccionesDashboard.length; i++) {
                for (var j = 0; j < variablesSeleccionadasSeccionesDashboard[i].resultados.length; j++) {
                  if (j == 0) {
                    console.log('ENTRE');
                    ejesY[i] = [];

                    if (variablesSeleccionadasSeccionesDashboardUpdate[k][i].esVariable) {
                      ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreVariable);
                    } else if (variablesSeleccionadasSeccionesDashboardUpdate[k][i].esIndicador) {
                      ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreIndicador);
                    } else if (variablesSeleccionadasSeccionesDashboardUpdate[k][i].esRiesgo) {
                      ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreRiesgo);
                    }
                  }

                  ejesY[i].push(variablesSeleccionadasSeccionesDashboard[i].resultados[j][variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreCampo]);
                }

                ;
              }

              ;
              var columnas = [ejeX];
              columnas = columnas.concat(ejesY);
              var xObjectAxis;

              for (var i = 0; i < objetoEje.atributos.length; i++) {
                if (objetoEje.atributos[i].nombre.localeCompare(objetoEjeXUpdate[k].nombreCampo) == 0) {
                  if (objetoEje.atributos[i].tipo.localeCompare("date") == 0) {
                    xObjectAxis = {
                      type: 'timeseries',
                      label: objetoEjeXUpdate[k].nombreCampo,
                      tick: {
                        rotate: 90,
                        multiline: false,
                        format: function format(x) {
                          return x.getFullYear() + "-" + x.getMonth() + "-" + x.getDate();
                        }
                      },
                      height: 130,
                      show: true
                    };
                  } else {
                    xObjectAxis = {
                      type: 'category',
                      label: objetoEjeXUpdate[k].nombreCampo,
                      tick: {
                        rotate: 75,
                        multiline: false
                      },
                      height: 80,
                      show: true
                    };
                  }

                  break;
                }
              }

              ;
              var chart = c3.generate({
                bindto: "#grafica" + k,
                data: {
                  x: objetoEjeXUpdate[k].nombreCampo,
                  columns: columnas,
                  type: 'area'
                },
                axis: {
                  y: {
                    show: true
                  },
                  x: xObjectAxis
                }
              });
            } else if (tipoGraficoUpdate[k].indexOf("DISPERSION") == 0) {
              //objetoEjeXUpdate
              var objetoEje = this.retornarVariable(objetoEjeXUpdate[k]); //variablesSeleccionadasSeccionesDashboardUpdate

              var variablesSeleccionadasSeccionesDashboard = [];

              for (var i = 0; i < variablesSeleccionadasSeccionesDashboardUpdate[k].length; i++) {
                variablesSeleccionadasSeccionesDashboard.push(this.retornarVariable(variablesSeleccionadasSeccionesDashboardUpdate[k][i]));
              }

              ;
              var ejeX = [objetoEjeXUpdate[k].nombreCampo];

              for (var i = 0; i < objetoEje.resultados.length; i++) {
                ejeX.push(objetoEje.resultados[i][objetoEjeXUpdate[k].nombreCampo]);
              }

              ;
              var ejesY = [];

              for (var i = 0; i < variablesSeleccionadasSeccionesDashboard.length; i++) {
                for (var j = 0; j < variablesSeleccionadasSeccionesDashboard[i].resultados.length; j++) {
                  if (j == 0) {
                    ejesY[i] = [];

                    if (variablesSeleccionadasSeccionesDashboardUpdate[k][i].esVariable) {
                      ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreVariable);
                    } else if (variablesSeleccionadasSeccionesDashboardUpdate[k][i].esIndicador) {
                      ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreIndicador);
                    } else if (variablesSeleccionadasSeccionesDashboardUpdate[k][i].esRiesgo) {
                      ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreRiesgo);
                    }
                  }

                  ejesY[i].push(variablesSeleccionadasSeccionesDashboard[i].resultados[j][variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreCampo]);
                }

                ;
              }

              ;
              var columnas = [ejeX];
              columnas = columnas.concat(ejesY);
              var xObjectAxis;

              for (var i = 0; i < objetoEje.atributos.length; i++) {
                if (objetoEje.atributos[i].nombre.localeCompare(objetoEjeXUpdate[k].nombreCampo) == 0) {
                  if (objetoEje.atributos[i].tipo.localeCompare("date") == 0) {
                    xObjectAxis = {
                      type: 'timeseries',
                      label: objetoEjeXUpdate[k].nombreCampo,
                      tick: {
                        rotate: 90,
                        multiline: false,
                        format: function format(x) {
                          return x.getFullYear() + "-" + x.getMonth() + "-" + x.getDate();
                        }
                      },
                      height: 130,
                      show: true
                    };
                  } else {
                    xObjectAxis = {
                      type: 'category',
                      label: objetoEjeXUpdate[k].nombreCampo,
                      tick: {
                        rotate: 75,
                        multiline: false
                      },
                      height: 80,
                      show: true
                    };
                  }

                  break;
                }
              }

              ;
              var chart = c3.generate({
                bindto: "#grafica" + k,
                data: {
                  x: objetoEjeXUpdate[k].nombreCampo,
                  columns: columnas,
                  type: 'scatter'
                },
                axis: {
                  y: {
                    show: true
                  },
                  x: xObjectAxis
                }
              });
            } else if (tipoGraficoUpdate[k].indexOf("PIE") == 0) {
              //variablesSeleccionadasSeccionesDashboardUpdate
              var variablesSeleccionadasSeccionesDashboard = [];

              for (var i = 0; i < variablesSeleccionadasSeccionesDashboardUpdate[k].length; i++) {
                variablesSeleccionadasSeccionesDashboard.push(this.retornarVariable(variablesSeleccionadasSeccionesDashboardUpdate[k][i]));
              }

              ;
              var ejesY = [];

              for (var i = 0; i < variablesSeleccionadasSeccionesDashboard.length; i++) {
                for (var j = 0; j < variablesSeleccionadasSeccionesDashboard[i].resultados.length; j++) {
                  if (j == 0) {
                    ejesY[i] = [];

                    if (variablesSeleccionadasSeccionesDashboardUpdate[k][i].esVariable) {
                      ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreVariable);
                    } else if (variablesSeleccionadasSeccionesDashboardUpdate[k][i].esIndicador) {
                      ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreIndicador);
                    } else if (variablesSeleccionadasSeccionesDashboardUpdate[k][i].esRiesgo) {
                      ejesY[i].push(variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreRiesgo);
                    }
                  }

                  ejesY[i].push(variablesSeleccionadasSeccionesDashboard[i].resultados[j][variablesSeleccionadasSeccionesDashboardUpdate[k][i].nombreCampo]);
                }

                ;
              }

              ;
              var columnas = [];
              columnas = columnas.concat(ejesY);
              var chart = c3.generate({
                bindto: "#grafica" + k,
                data: {
                  columns: columnas,
                  type: 'pie'
                },
                axis: {
                  y: {
                    show: true
                  }
                }
              });
            }
          } else if (seccionesGraficos[k].instruccion.indexOf("TABLA") == 0) {//variablesSeleccionadasSeccionesDashboardTablaUpdate
          }
        }

        ;
      }
    }
  }, {
    key: "retornarVariable",
    value: function retornarVariable(variable) {
      if (variable.esVariable) {
        for (var i = 0; i < this.props.variables.length; i++) {
          if (this.props.variables[i].nombreVariable.localeCompare(variable.nombreVariable) == 0) {
            /*for (var j = 0; j < this.props.variables[i].atributos.length; j++) {
                if(this.props.variables[i].atributos[j].nombre.localeCompare(variable.nombreCampo) == 0) {*/
            return this.props.variables[i];
            /*}
            };*/
          }
        }

        ;
      } else if (variable.esIndicador) {
        for (var i = 0; i < this.props.indicadores.length; i++) {
          if (this.props.indicadores[i].nombreIndicador.localeCompare(variable.nombreIndicador) == 0) {
            /*for (var j = 0; j < this.props.indicadores[i].atributos.length; j++) {
                if(this.props.indicadores[i].atributos[j].nombre.localeCompare(variable.nombreCampo) == 0) {*/
            return this.props.indicadores[i];
            /*}
            };*/
          }
        }

        ;
      } else if (variable.esRiesgo) {
        for (var i = 0; i < this.props.riesgos.length; i++) {
          if (this.props.riesgos[i].nombreRiesgo.localeCompare(variable.nombreRiesgo) == 0) {
            /*for (var j = 0; j < this.props.riesgos[i].atributos.length; j++) {
                if(this.props.riesgos[i].atributos[j].nombre.localeCompare(variable.nombreCampo) == 0) {*/
            return this.props.riesgos[i];
            /*}
            };*/
          }
        }

        ;
      }

      return null;
    }
  }, {
    key: "styleDate",
    value: function styleDate(date) {
      return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
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
      }, "Ver Dashboard"), _react["default"].createElement("div", {
        className: "page-breadcrumb"
      }, _react["default"].createElement("nav", {
        "aria-label": "breadcrumb"
      }, _react["default"].createElement("ol", {
        className: "breadcrumb"
      }, _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.goSeleccionReporteria
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Seleccionar Tipo de Reporter\xEDa")), _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.props.retornarCrearGrafico
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Configurar Gr\xE1fico")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Ver Gr\xE1ficas"))))))), this.state.html.length != undefined && this.state.html.length > 0 ? _react["default"].createElement("div", {
        className: "card",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("br", null), this.state.html.map(function (html_row, i) {
        return _react["default"].createElement("div", {
          className: "row",
          key: i,
          style: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, html_row.map(function (html, j) {
          return _react["default"].createElement("div", {
            className: html.clase,
            key: i + '' + j,
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }
          }, html.grafica);
        }));
      }), _react["default"].createElement("br", null)) : null, _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("a", {
        className: "btn btn-success btn-block btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: this.props.editarDashboard
      }, "Editar Dashboard")), _react["default"].createElement("br", null));
    }
  }]);

  return VerGrafico;
}(_react["default"].Component);

exports["default"] = VerGrafico;
//# sourceMappingURL=VerGrafico.js.map
