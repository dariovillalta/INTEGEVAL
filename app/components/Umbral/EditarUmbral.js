"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _reactInputSlider = _interopRequireDefault(require("react-input-slider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var colores = ["primary", "brand", "secondary", "success", "danger", "warning", "info", "dark"];

var CrearUmbral =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CrearUmbral, _React$Component);

  function CrearUmbral(props) {
    var _this;

    _classCallCheck(this, CrearUmbral);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CrearUmbral).call(this, props));
    _this.state = {
      titulo: 'Cargado Datos',
      umbralSeleccionadoID: -1,
      umbralNombreSeleccionado: '',
      seccionesUmbral: [],
      seccionUmbralSeleccionadoID: -1,
      tituloSeccionUmbralNombreSeleccionado: '',
      seccionUmbralNombreSeleccionado: '',
      colorSeccionUmbralSeleccionado: '',
      rangosSeccionUmbral: [],
      valorRangoMaximoMinimoNuevo: 0,
      valorRangoMaximoMaximoNuevo: 1,
      valorRangoMaximo: 0,
      valoresMinMaxSeccionesUmbral: [],
      rangosCreados: [],
      bandera: ""
    };
    _this.traerUmbral = _this.traerUmbral.bind(_assertThisInitialized(_this));
    _this.crearUmbral = _this.crearUmbral.bind(_assertThisInitialized(_this));
    _this.traerSeccionesUmbral = _this.traerSeccionesUmbral.bind(_assertThisInitialized(_this));
    _this.agregarSeccionUmbral = _this.agregarSeccionUmbral.bind(_assertThisInitialized(_this));
    _this.modificarSeccionUmbral = _this.modificarSeccionUmbral.bind(_assertThisInitialized(_this));
    _this.seleccionSeccionUmbral = _this.seleccionSeccionUmbral.bind(_assertThisInitialized(_this));
    _this.retornoSeccionSeleccionUmbral = _this.retornoSeccionSeleccionUmbral.bind(_assertThisInitialized(_this));
    _this.traerRangosSeccionUmbral = _this.traerRangosSeccionUmbral.bind(_assertThisInitialized(_this));
    _this.agregarRangoSeccionUmbral = _this.agregarRangoSeccionUmbral.bind(_assertThisInitialized(_this));
    _this.updateValorRangoMinimoNuevo = _this.updateValorRangoMinimoNuevo.bind(_assertThisInitialized(_this));
    _this.updateValorRangoMaximoNuevo = _this.updateValorRangoMaximoNuevo.bind(_assertThisInitialized(_this));
    _this.updateValorRangoMinimoCreado = _this.updateValorRangoMinimoCreado.bind(_assertThisInitialized(_this));
    _this.updateValorRangoMaximoCreado = _this.updateValorRangoMaximoCreado.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CrearUmbral, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.traerUmbral();
    }
  }, {
    key: "traerUmbral",
    value: function traerUmbral() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Umbral where variableID = " + _this2.props.idVariable + " and tablaVariable = '" + _this2.props.tablaVariable + "'", function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                console.log('result.recordset');
                console.log(result.recordset);

                _this2.setState({
                  umbralSeleccionadoID: result.recordset[0].ID,
                  umbralNombreSeleccionado: 'Umbral ' + _this2.props.tituloUmbral,
                  titulo: _this2.props.tituloUmbral
                });

                _this2.traerSeccionesUmbral();
              } else {
                _this2.crearUmbral();
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "crearUmbral",
    value: function crearUmbral() {
      var _this3 = this;

      var nombre = $("#nombreUmbral").val();

      if (!isNaN(this.props.idVariable)) {
        if (this.props.tablaVariable != undefined && this.props.tablaVariable.length > 0) {
          var transaction = new _mssql["default"].Transaction(this.props.pool);
          transaction.begin(function (err) {
            var rolledBack = false;
            transaction.on('rollback', function (aborted) {
              rolledBack = true;
            });
            var request = new _mssql["default"].Request(transaction);
            request.query("insert into Umbral (variableID, tablaVariable) values (" + _this3.props.idVariable + ", '" + _this3.props.tablaVariable + "')", function (err, result) {
              if (err) {
                console.log(err);

                if (!rolledBack) {
                  transaction.rollback(function (err) {});
                }
              } else {
                transaction.commit(function (err) {
                  console.log("Umbral creado.");

                  _this3.traerUmbral(); //alert("Umbral Creado");

                });
              }
            });
          }); // fin transaction
        } else {
          alert("Ingrese un valor para el nombre de tabla de la variable.");
        }
      } else {
        alert("Ingrese un valor númerico para el ID de variable.");
      }
    }
  }, {
    key: "traerSeccionesUmbral",
    value: function traerSeccionesUmbral() {
      var _this4 = this;

      $('.demo').each(function () {
        //
        // Dear reader, it's actually very easy to initialize MiniColors. For example:
        //
        //  $(selector).minicolors();
        //
        // The way I've done it below is just for the demo, so don't get confused
        // by it. Also, data- attributes aren't supported at this time...they're
        // only used for this demo.
        //
        $(this).minicolors({
          control: $(this).attr('data-control') || 'hue',
          defaultValue: $(this).attr('data-defaultValue') || '',
          format: $(this).attr('data-format') || 'hex',
          keywords: $(this).attr('data-keywords') || '',
          inline: $(this).attr('data-inline') === 'true',
          letterCase: $(this).attr('data-letterCase') || 'lowercase',
          opacity: $(this).attr('data-opacity'),
          position: $(this).attr('data-position') || 'bottom left',
          swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
          change: function change(value, opacity) {
            if (!value) return;
            if (opacity) value += ', ' + opacity;

            if ((typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object') {//console.log(value);
            }
          },
          theme: 'bootstrap'
        });
      });
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from SeccionUmbral where umbralID = " + _this4.state.umbralSeleccionadoID, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this4.setState({
                seccionesUmbral: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "agregarSeccionUmbral",
    value: function agregarSeccionUmbral() {
      var _this5 = this;

      var nombre = $("#nuevaSeccionUmbral").val();
      var color = $("#colorSeccionNuevo").val();
      var existeNombre = false;

      for (var i = 0; i < this.state.seccionesUmbral.length; i++) {
        if (this.state.seccionesUmbral[i].nombre.toLowerCase().localeCompare(nombre) == 0) {
          existeNombre = true;
          break;
        }
      }

      ;

      if (!existeNombre) {
        if (nombre.length > 0 && nombre.length < 101) {
          if (color != undefined && color.length > 0 && color.length < 26) {
            var transaction = new _mssql["default"].Transaction(this.props.pool);
            transaction.begin(function (err) {
              var rolledBack = false;
              transaction.on('rollback', function (aborted) {
                rolledBack = true;
              });
              var request = new _mssql["default"].Request(transaction);
              request.query("insert into SeccionUmbral (umbralID, nombre, color) values (" + _this5.state.umbralSeleccionadoID + ", '" + nombre + "', '" + color + "')", function (err, result) {
                if (err) {
                  console.log(err);

                  if (!rolledBack) {
                    transaction.rollback(function (err) {});
                  }
                } else {
                  transaction.commit(function (err) {
                    $("#nuevaSeccionUmbral").val("");
                    $('#colorSeccionNuevo').minicolors('value', '#db913d');

                    _this5.traerSeccionesUmbral();
                  });
                }
              });
            }); // fin transaction
          } else {
            alert("Ingrese un valor para el color de la sección de umbral.");
          }
        } else {
          alert("Ingrese un valor para el nombre de la sección de umbral.");
        }
      } else {
        alert("El nombre de la sección debe ser único.");
      }
    }
  }, {
    key: "modificarSeccionUmbral",
    value: function modificarSeccionUmbral() {
      var _this6 = this;

      var nombre = $("#seccionUmbralSeleccionado").val();
      var color = $("#colorSeccionUmbralSeleccionado").val();
      var existeNombre = false;

      for (var i = 0; i < this.state.seccionesUmbral.length; i++) {
        if (this.state.seccionesUmbral[i].nombre.toLowerCase().localeCompare(nombre) == 0 && this.state.seccionUmbralSeleccionadoID != this.state.seccionesUmbral[i].ID) {
          existeNombre = true;
          break;
        }
      }

      ;

      if (!existeNombre) {
        if (nombre.length > 0 && nombre.length < 101) {
          if (color != undefined && color.length > 0 && color.length < 26) {
            var transaction = new _mssql["default"].Transaction(this.props.pool);
            transaction.begin(function (err) {
              var rolledBack = false;
              transaction.on('rollback', function (aborted) {
                rolledBack = true;
              });
              var request = new _mssql["default"].Request(transaction);
              request.query("insert into SeccionUmbral (umbralID, nombre, color) values (" + _this6.state.umbralSeleccionadoID + ", '" + nombre + "', '" + color + "')", function (err, result) {
                if (err) {
                  console.log(err);

                  if (!rolledBack) {
                    transaction.rollback(function (err) {});
                  }
                } else {
                  transaction.commit(function (err) {
                    alert("Sección modificada.");
                  });
                }
              });
            }); // fin transaction
          } else {
            alert("Ingrese un valor para el color de la sección de umbral.");
          }
        } else {
          alert("Ingrese un valor para el nombre de la sección de umbral.");
        }
      } else {
        alert("El nombre de la sección debe ser único.");
      }
    }
  }, {
    key: "seleccionSeccionUmbral",
    value: function seleccionSeccionUmbral(index) {
      this.setState({
        seccionUmbralSeleccionadoID: this.state.seccionesUmbral[index].ID,
        tituloSeccionUmbralNombreSeleccionado: 'Sección Umbral: ' + this.state.seccionesUmbral[index].nombre,
        seccionUmbralNombreSeleccionado: this.state.seccionesUmbral[index].nombre,
        colorSeccionUmbralSeleccionado: this.state.seccionesUmbral[index].color
      }, this.traerRangosSeccionUmbral);
      $("#seccionUmbralSeleccionado").val(this.state.seccionesUmbral[index].nombre);
    }
  }, {
    key: "retornoSeccionSeleccionUmbral",
    value: function retornoSeccionSeleccionUmbral() {
      this.setState({
        seccionUmbralSeleccionadoID: -1,
        tituloSeccionUmbralNombreSeleccionado: "",
        seccionUmbralNombreSeleccionado: "",
        colorSeccionUmbralSeleccionado: ""
      });
    }
  }, {
    key: "traerRangosSeccionUmbral",
    value: function traerRangosSeccionUmbral() {
      var _this7 = this;

      /*CARGANDO COLOR DE RANGO*/
      $('.demo').each(function () {
        $(this).minicolors({
          control: $(this).attr('data-control') || 'hue',
          defaultValue: $(this).attr('data-defaultValue') || '',
          format: $(this).attr('data-format') || 'hex',
          keywords: $(this).attr('data-keywords') || '',
          inline: $(this).attr('data-inline') === 'true',
          letterCase: $(this).attr('data-letterCase') || 'lowercase',
          opacity: $(this).attr('data-opacity'),
          position: $(this).attr('data-position') || 'bottom left',
          swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
          change: function change(value, opacity) {
            if (!value) return;
            if (opacity) value += ', ' + opacity;

            if ((typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object') {//console.log(value);
            }
          },
          theme: 'bootstrap'
        });
      });
      $('#colorSeccionUmbralSeleccionado').minicolors('value', this.state.colorSeccionUmbralSeleccionado);
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from RangoSeccionUmbral where seccionUmbralID = " + _this7.state.seccionUmbralSeleccionadoID, function (err, result) {
          if (err) {
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              result.recordset.sort(function (a, b) {
                return a.valorMinimo - b.valorMinimo;
              });
              /*preparando valores minimo y maximo de nuevo rango*/

              var valorMinimo = 0,
                  valorMaximo = 0,
                  valorMaximoEsValorMedio = false;

              for (var i = 0; i < result.recordset.length; i++) {
                if (valorMinimo == result.recordset[i].valorMinimo) {
                  valorMinimo = result.recordset[i].valorMaximo + 1;

                  if (i + 1 < result.recordset.length && valorMinimo != result.recordset[i + 1].valorMinimo) {
                    valorMaximo = result.recordset[i + 1].valorMinimo - 1;
                    valorMaximoEsValorMedio = true;
                  } else {
                    valorMaximoEsValorMedio = false;
                  }
                }
              }

              ;
              if (!valorMaximoEsValorMedio) valorMaximo = valorMinimo + 100;
              var rangosCreados = [];

              for (var i = 0; i < result.recordset.length; i++) {
                rangosCreados.push({
                  valorRangoMaximoMinimoNuevo: result.recordset[i].valorMinimo,
                  valorRangoMaximoMaximoNuevo: result.recordset[i].valorMaximo + 100,
                  valorRangoMaximo: result.recordset[i].valorMaximo,
                  color: result.recordset[i].color
                });
              }

              ;
              console.log('rangosCreados');
              console.log(rangosCreados);

              _this7.setState({
                rangosSeccionUmbral: result.recordset,
                valorRangoMaximoMinimoNuevo: valorMinimo,
                valorRangoMaximoMaximoNuevo: valorMaximo,
                rangosCreados: rangosCreados
              }, _this7.inicializarColores);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "inicializarColores",
    value: function inicializarColores() {
      for (var i = 0; i < this.state.rangosCreados.length; i++) {
        $('#colorSeccionUmbralSeleccionado' + i).minicolors('value', this.state.rangosCreados[i].color);
      }

      ;
    }
  }, {
    key: "agregarRangoSeccionUmbral",
    value: function agregarRangoSeccionUmbral() {
      var _this8 = this;

      var valMinimo = parseInt($("#nuevoRangoValorMinimo").val());
      var valMaximo = this.state.valorRangoMaximo;
      var valoresFueraDeOtrosRangos = true;

      for (var i = 0; i < this.state.rangosSeccionUmbral.length; i++) {
        if (valMinimo >= this.state.rangosSeccionUmbral[i].valorMinimo && valMinimo <= this.state.rangosSeccionUmbral[i].valorMaximo) {
          valoresFueraDeOtrosRangos = false;
        }

        if (valMaximo >= this.state.rangosSeccionUmbral[i].valorMinimo && valMinimo <= this.state.rangosSeccionUmbral[i].valorMaximo) {
          valoresFueraDeOtrosRangos = false;
        }
      }

      ;

      if (valoresFueraDeOtrosRangos) {
        if (!isNaN(valMinimo)) {
          if (!isNaN(valMaximo)) {
            var transaction = new _mssql["default"].Transaction(this.props.pool);
            transaction.begin(function (err) {
              var rolledBack = false;
              transaction.on('rollback', function (aborted) {
                rolledBack = true;
              });
              var request = new _mssql["default"].Request(transaction);
              request.query("insert into RangoSeccionUmbral (umbralID, seccionUmbralID, valorMinimo, valorMaximo) values (" + _this8.state.umbralSeleccionadoID + ", " + _this8.state.seccionUmbralSeleccionadoID + ", " + valMinimo + ", " + valMaximo + ")", function (err, result) {
                if (err) {
                  console.log(err);

                  if (!rolledBack) {
                    transaction.rollback(function (err) {});
                  }
                } else {
                  transaction.commit(function (err) {
                    _this8.traerRangosSeccionUmbral();
                  });
                }
              });
            }); // fin transaction
          } else {
            alert("Ingrese un número válido para el valor máximo.");
          }
        } else {
          alert("Ingrese un número válido para el valor mínimo.");
        }
      } else {
        alert("Los valores ingresados traspasan otros rangos.");
      }
    }
  }, {
    key: "updateValorRangoMinimoNuevo",
    value: function updateValorRangoMinimoNuevo() {
      var valorMinimoNuevo = parseInt($("#nuevoRangoValorMinimo").val());
      this.setState({
        valorRangoMaximoMinimoNuevo: valorMinimoNuevo + 1,
        valorRangoMaximo: valorMinimoNuevo + 1
      });
    }
  }, {
    key: "updateValorRangoMaximoNuevo",
    value: function updateValorRangoMaximoNuevo() {
      var valorMaximoNuevo;

      if (this.state.valorRangoMaximo == 0) {
        valorMaximoNuevo = 100;
      } else if (this.state.valorRangoMaximo >= this.state.valorRangoMaximoMaximoNuevo - this.state.valorRangoMaximoMaximoNuevo * 0.1) {
        valorMaximoNuevo = this.state.valorRangoMaximoMaximoNuevo * 0.5 + this.state.valorRangoMaximoMaximoNuevo;
        this.setState({
          valorRangoMaximoMaximoNuevo: valorMaximoNuevo
        });
      }
    }
  }, {
    key: "updateValorRangoMinimoCreado",
    value: function updateValorRangoMinimoCreado(index) {
      var valorMinimoNuevo = parseInt($("#nuevoRangoValorMinimo" + index).val());
      /*this.setState({
          valorRangoMaximoMinimoNuevo: valorMinimoNuevo+1,
          valorRangoMaximo: valorMinimoNuevo+1
      });*/
    }
  }, {
    key: "updateValorRangoMaximoCreado",
    value: function updateValorRangoMaximoCreado(index, x) {
      var copy = _toConsumableArray(this.state.rangosCreados);

      copy[index].valorRangoMaximo = x;
      var valorMaximoNuevo;

      if (this.state.valorRangoMaximo == 0) {
        valorMaximoNuevo = 100;
      } else if (this.state.valorRangoMaximo >= copy[index].valorRangoMaximoMaximoNuevo - copy[index].valorRangoMaximoMaximoNuevo * 0.1) {
        valorMaximoNuevo = copy[index].valorRangoMaximoMaximoNuevo * 0.5 + copy[index].valorRangoMaximoMaximoNuevo;
        copy[index].valorRangoMaximoMaximoNuevo = valorMaximoNuevo;
        this.setState({
          rangosCreados: copy
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      if (this.state.umbralSeleccionadoID == -1) {
        return _react["default"].createElement("div", null, _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "card influencer-profile-data"
        }, _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "row",
          style: {
            height: "2em",
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 font-18",
          style: {
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #e6e6f2"
          }
        }, this.state.titulo)), _react["default"].createElement("br", null))))));
      } else if (this.state.umbralSeleccionadoID != -1 && this.state.seccionUmbralSeleccionadoID == -1) {
        return _react["default"].createElement("div", null, _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "card influencer-profile-data"
        }, _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "row",
          style: {
            height: "2em",
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 font-18",
          style: {
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #e6e6f2"
          }
        }, this.state.titulo)), _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 form-group"
        }), _react["default"].createElement("div", {
          className: "col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 form-group"
        }, _react["default"].createElement("h2", null, this.state.umbralNombreSeleccionado))), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "nuevaSeccionUmbral",
          className: "col-form-label"
        }, "Nombre Nueva Secci\xF3n de Umbral:")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("input", {
          id: "nuevaSeccionUmbral",
          type: "text",
          className: "form-control form-control-sm"
        }))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "colorSeccionNuevo",
          className: "col-form-label"
        }, "Color de la Secci\xF3n de Umbral:")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("div", {
          className: "form-group"
        }, _react["default"].createElement("input", {
          type: "hidden",
          id: "colorSeccionNuevo",
          className: "demo",
          value: "#db913d"
        })))), _react["default"].createElement("div", {
          className: "text-center"
        }, _react["default"].createElement("a", {
          onClick: this.agregarSeccionUmbral,
          className: "btn btn-primary col-xs-6 col-6",
          style: {
            color: "white",
            fontSize: "1.2em",
            fontWeight: "bold"
          }
        }, "Agregar Secci\xF3n de Umbral")), _react["default"].createElement("br", null), this.state.seccionesUmbral.map(function (seccionUmbral, i) {
          return _react["default"].createElement("div", {
            key: seccionUmbral.ID,
            className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
          }, _react["default"].createElement("a", {
            href: "#",
            onClick: function onClick() {
              return _this9.seleccionSeccionUmbral(i);
            },
            className: "btn btn-outline-" + (colores[i] != undefined ? colores[i] : colores[i % colores.length]),
            style: {
              width: "100%"
            }
          }, seccionUmbral.nombre));
        })))))))));
      } else if (this.state.umbralSeleccionadoID != -1 && this.state.seccionUmbralSeleccionadoID != -1) {
        return _react["default"].createElement("div", null, _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "card influencer-profile-data"
        }, _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "row",
          style: {
            height: "2em",
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 font-18",
          style: {
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #e6e6f2"
          }
        }, this.state.titulo)), _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          onClick: function onClick() {
            return _this9.retornoSeccionSeleccionUmbral();
          },
          className: "col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 form-group addPointer border"
        }, _react["default"].createElement("label", {
          className: "font-24 addPointer"
        }, " ", "<", " ")), _react["default"].createElement("div", {
          className: "col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 form-group"
        }, _react["default"].createElement("h2", null, this.state.tituloSeccionUmbralNombreSeleccionado))), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "seccionUmbralSeleccionado",
          className: "col-form-label"
        }, "Nombre Secci\xF3n de Umbral:")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("input", {
          id: "seccionUmbralSeleccionado",
          defaultValue: this.state.seccionUmbralNombreSeleccionado,
          type: "text",
          className: "form-control form-control-sm"
        }))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("label", {
          htmlFor: "colorSeccionUmbralSeleccionado",
          className: "col-form-label"
        }, "Color de la Secci\xF3n de Umbral:")), _react["default"].createElement("div", {
          className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
        }, _react["default"].createElement("div", {
          className: "form-group"
        }, _react["default"].createElement("input", {
          type: "hidden",
          id: "colorSeccionUmbralSeleccionado",
          className: "demo",
          value: "#db913d"
        })))), _react["default"].createElement("div", {
          className: "text-center"
        }, _react["default"].createElement("a", {
          onClick: this.modificarSeccionUmbral,
          className: "btn btn-primary col-xs-6 col-6",
          style: {
            color: "white",
            fontSize: "1.2em",
            fontWeight: "bold"
          }
        }, "Modificar Secci\xF3n de Umbral")), _react["default"].createElement("hr", null), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 form-group text-center"
        }, _react["default"].createElement("label", {
          htmlFor: "nuevoRangoValorMinimo",
          className: "col-form-label"
        }, "Valor m\xEDnimo:")), _react["default"].createElement("div", {
          className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 form-group text-center"
        }, _react["default"].createElement("label", {
          htmlFor: "nuevoRangoValorMaximo",
          className: "col-form-label"
        }, "Valor m\xE1ximo:"))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("input", {
          id: "nuevoRangoValorMinimo",
          name: "dias",
          step: "1",
          min: "0",
          type: "number",
          defaultValue: "0",
          onChange: this.updateValorRangoMinimoNuevo
        })), _react["default"].createElement("div", {
          className: "col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 form-group"
        }, _react["default"].createElement(_reactInputSlider["default"], {
          axis: "x",
          xstep: 1,
          xmin: this.state.valorRangoMaximoMinimoNuevo,
          xmax: this.state.valorRangoMaximoMaximoNuevo,
          x: this.state.valorRangoMaximo,
          onChange: function onChange(_ref) {
            var x = _ref.x;
            return _this9.setState({
              valorRangoMaximo: x
            }, _this9.updateValorRangoMaximoNuevo);
          },
          style: {
            width: "100%",
            marginTop: "10px"
          }
        })), _react["default"].createElement("div", {
          className: "col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 form-group"
        }, _react["default"].createElement("label", {
          id: "nuevoRangoValorMaximo",
          className: "col-form-label"
        }, this.state.valorRangoMaximo))), _react["default"].createElement("div", {
          className: "text-center"
        }, _react["default"].createElement("a", {
          onClick: this.agregarRangoSeccionUmbral,
          className: "btn btn-brand col-xs-6 col-6",
          style: {
            color: "white",
            fontSize: "1.2em",
            fontWeight: "bold"
          }
        }, "Agregar Rango de Secci\xF3n de Umbral")), this.state.rangosSeccionUmbral.map(function (rangoSeccionUmbral, i) {
          return _react["default"].createElement("div", {
            key: rangoSeccionUmbral.ID
          }, _react["default"].createElement("hr", null), _react["default"].createElement("div", {
            className: "row"
          }, _react["default"].createElement("div", {
            className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 form-group text-center"
          }, _react["default"].createElement("label", {
            htmlFor: "rangoValorMinimo" + i,
            className: "col-form-label"
          }, "Valor M\xEDnimo Nuevo:")), _react["default"].createElement("div", {
            className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 form-group text-center"
          }, _react["default"].createElement("label", {
            htmlFor: "rangoValorMaximo" + i,
            className: "col-form-label"
          }, "Valor M\xE1ximo Nuevo:"))), _react["default"].createElement("div", {
            className: "row"
          }, _react["default"].createElement("div", {
            className: "col-xl-3 col-lg-3 col-md-3 col-sm-4 col-3 form-group"
          }, _react["default"].createElement("input", {
            id: "rangoValorMinimo" + i,
            type: "text",
            className: "form-control form-control-sm",
            defaultValue: rangoSeccionUmbral.valorMinimo
          })), _react["default"].createElement("div", {
            className: "col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 form-group"
          }, _react["default"].createElement(_reactInputSlider["default"], {
            axis: "x",
            xstep: 1,
            xmin: _this9.state.rangosCreados[i].valorRangoMaximoMinimoNuevo,
            xmax: _this9.state.rangosCreados[i].valorRangoMaximoMaximoNuevo,
            x: _this9.state.rangosCreados[i].valorRangoMaximo,
            onChange: function onChange(_ref2) {
              var x = _ref2.x;
              return _this9.setState({
                bandera: ""
              }, _this9.updateValorRangoMaximoCreado(i, x));
            },
            style: {
              width: "100%",
              marginTop: "10px"
            }
          })), _react["default"].createElement("div", {
            className: "col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 form-group"
          }, _react["default"].createElement("label", {
            id: "rangoValorMaximo" + i,
            className: "col-form-label"
          }, _this9.state.rangosCreados[i].valorRangoMaximo))), _react["default"].createElement("div", {
            className: "row"
          }, _react["default"].createElement("div", {
            className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
          }, _react["default"].createElement("label", {
            htmlFor: "colorSeccionUmbralSeleccionado" + i,
            className: "col-form-label"
          }, "Color de la Secci\xF3n de Umbral:")), _react["default"].createElement("div", {
            className: "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"
          }, _react["default"].createElement("div", {
            className: "form-group"
          }, _react["default"].createElement("input", {
            type: "hidden",
            id: "colorSeccionUmbralSeleccionado" + i,
            className: "demo",
            value: "#db913d"
          })))), _react["default"].createElement("div", {
            className: "text-center"
          }, _react["default"].createElement("a", {
            onClick: _this9.modificarSeccionUmbral,
            className: "btn btn-success col-xs-6 col-6",
            style: {
              color: "white",
              fontSize: "1.2em",
              fontWeight: "bold"
            }
          }, "Modificar Rango de Secci\xF3n de Umbral")));
        })))))))));
      }
    }
  }]);

  return CrearUmbral;
}(_react["default"].Component);

exports["default"] = CrearUmbral;
//# sourceMappingURL=EditarUmbral.js.map
