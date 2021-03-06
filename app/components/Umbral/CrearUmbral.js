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
var rangosSeccionUmbralTodos = [];

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
      valorRangoMaximoMaximoNuevo: _this.props.maximoUmbral,
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
    _this.traerTodosRangosSeccionUmbral = _this.traerTodosRangosSeccionUmbral.bind(_assertThisInitialized(_this));
    _this.traerRangosSeccionUmbral = _this.traerRangosSeccionUmbral.bind(_assertThisInitialized(_this));
    _this.agregarRangoSeccionUmbral = _this.agregarRangoSeccionUmbral.bind(_assertThisInitialized(_this));
    _this.updateValorRangoMinimoCreado = _this.updateValorRangoMinimoCreado.bind(_assertThisInitialized(_this));
    _this.updateValorRangoMaximoCreado = _this.updateValorRangoMaximoCreado.bind(_assertThisInitialized(_this));
    _this.modificarRangoSeccionUmbral = _this.modificarRangoSeccionUmbral.bind(_assertThisInitialized(_this));
    _this.verifyInputValues = _this.verifyInputValues.bind(_assertThisInitialized(_this));
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

            _this2.props.showMessage("Error", "No se pudo traer valores de la tabla de umbrales.", true, false, {});

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
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

                _this3.props.showMessage("Error", "No se pudo crear el umbral.", true, false, {});

                if (!rolledBack) {
                  transaction.rollback(function (err) {});
                }
              } else {
                transaction.commit(function (err) {
                  _this3.traerUmbral(); //this.props.showSuccesMessage("Éxito", "Umbral Creado.");

                });
              }
            });
          }); // fin transaction
        } else {
          this.props.showMessage("Error", "Ingrese un valor para el nombre de tabla de la variable.", true, false, {});
        }
      } else {
        this.props.showMessage("Error", "Ingrese un valor númerico para el ID de variable.", true, false, {});
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
      setTimeout(function () {
        $('#colorSeccionNuevo').minicolors('value', "#ec407a");
      }, 100);
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

            _this4.props.showMessage("Error", "No se pudo traer valores de la tabla de secciones de umbral.", true, false, {});

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

                  _this5.props.showMessage("Error", "No se pudo crear la sección del umbral.", true, false, {});

                  if (!rolledBack) {
                    transaction.rollback(function (err) {});
                  }
                } else {
                  transaction.commit(function (err) {
                    $("#nuevaSeccionUmbral").val("");
                    $('#colorSeccionNuevo').minicolors('value', '#db913d');

                    _this5.traerSeccionesUmbral();

                    _this5.props.showSuccesMessage("Éxito", "Sección de Umbral Creado.");
                  });
                }
              });
            }); // fin transaction
          } else {
            this.props.showMessage("Error", "Ingrese un valor para el color de la sección del umbral.", true, false, {});
          }
        } else {
          this.props.showMessage("Error", "Ingrese un valor para el nombre de la sección del umbral.", true, false, {});
        }
      } else {
        this.props.showMessage("Error", "El nombre de la sección debe ser único.", true, false, {});
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
              request.query("update SeccionUmbral set nombre = '" + nombre + "', color = '" + color + "' where ID = " + _this6.state.seccionUmbralSeleccionadoID, function (err, result) {
                if (err) {
                  console.log(err);

                  _this6.props.showMessage("Error", "No se pudo modificar la sección del umbral.", true, false, {});

                  if (!rolledBack) {
                    transaction.rollback(function (err) {});
                  }
                } else {
                  transaction.commit(function (err) {
                    _this6.props.showSuccesMessage("Éxito", "Sección del Umbral modificada.");
                  });
                }
              });
            }); // fin transaction
          } else {
            this.props.showMessage("Error", "Ingrese un valor para el color de la sección del umbral.", true, false, {});
          }
        } else {
          this.props.showMessage("Error", "Ingrese un valor para el nombre de la sección del umbral.", true, false, {});
        }
      } else {
        this.props.showMessage("Error", "El nombre de la sección debe ser único.", true, false, {});
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
      var self = this;
      setTimeout(function () {
        $("#seccionUmbralSeleccionado").val(self.state.seccionesUmbral[index].nombre);
      }, 400);
    }
  }, {
    key: "retornoSeccionSeleccionUmbral",
    value: function retornoSeccionSeleccionUmbral() {
      this.traerSeccionesUmbral();
      this.setState({
        seccionUmbralSeleccionadoID: -1,
        tituloSeccionUmbralNombreSeleccionado: "",
        seccionUmbralNombreSeleccionado: "",
        colorSeccionUmbralSeleccionado: ""
      });
    }
  }, {
    key: "traerTodosRangosSeccionUmbral",
    value: function traerTodosRangosSeccionUmbral() {
      var _this7 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from RangoSeccionUmbral where umbralID = " + _this7.state.umbralSeleccionadoID, function (err, result) {
          if (err) {
            console.log(err);

            _this7.props.showMessage("Error", "No se pudo traer el rango de la sección del umbral.", true, false, {});

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              rangosSeccionUmbralTodos = result.recordset;
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "traerRangosSeccionUmbral",
    value: function traerRangosSeccionUmbral() {
      var _this8 = this;

      this.traerTodosRangosSeccionUmbral();
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
        request.query("select * from RangoSeccionUmbral where seccionUmbralID = " + _this8.state.seccionUmbralSeleccionadoID, function (err, result) {
          if (err) {
            console.log(err);

            _this8.props.showMessage("Error", "No se pudo traer el rango de la sección del umbral.", true, false, {});

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
                  valorRangoMaximoMaximoNuevo: _this8.props.maximoUmbral,
                  valorRangoMaximo: result.recordset[i].valorMaximo
                });
              }

              ;

              _this8.setState({
                rangosSeccionUmbral: result.recordset,
                valorRangoMaximoMinimoNuevo: valorMinimo,
                valorRangoMaximoMaximoNuevo: _this8.props.maximoUmbral,
                rangosCreados: rangosCreados
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "agregarRangoSeccionUmbral",
    value: function agregarRangoSeccionUmbral() {
      var _this9 = this;

      var valMinimo = parseInt($("#nuevoRangoValorMinimo").val());
      var valMaximo = this.state.valorRangoMaximo;
      var valoresFueraDeOtrosRangos = true;

      for (var i = 0; i < rangosSeccionUmbralTodos.length; i++) {
        if (valMinimo >= rangosSeccionUmbralTodos[i].valorMinimo && valMinimo <= rangosSeccionUmbralTodos[i].valorMaximo) {
          valoresFueraDeOtrosRangos = false;
        }

        if (valMaximo >= rangosSeccionUmbralTodos[i].valorMinimo && valMinimo <= rangosSeccionUmbralTodos[i].valorMaximo) {
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
              request.query("insert into RangoSeccionUmbral (umbralID, seccionUmbralID, valorMinimo, valorMaximo) values (" + _this9.state.umbralSeleccionadoID + ", " + _this9.state.seccionUmbralSeleccionadoID + ", " + valMinimo + ", " + valMaximo + ")", function (err, result) {
                if (err) {
                  console.log(err);

                  _this9.props.showMessage("Error", "No se pudo crear el rango de la sección del umbral.", true, false, {});

                  if (!rolledBack) {
                    transaction.rollback(function (err) {});
                  }
                } else {
                  transaction.commit(function (err) {
                    _this9.traerRangosSeccionUmbral();

                    _this9.props.traerUmbralesPADRE();

                    _this9.props.showSuccesMessage("Éxito", "Rango de la Sección del Umbral creada.");
                  });
                }
              });
            }); // fin transaction
          } else {
            this.props.showMessage("Error", "Ingrese un número válido para el valor máximo.", true, false, {});
          }
        } else {
          this.props.showMessage("Error", "Ingrese un número válido para el valor mínimo.", true, false, {});
        }
      } else {
        this.props.showMessage("Error", "Los valores ingresados traspasan otros rangos.", true, false, {});
      }
    }
  }, {
    key: "updateValorRangoMinimoCreado",
    value: function updateValorRangoMinimoCreado(index) {
      var copy = _toConsumableArray(this.state.rangosCreados);

      var valorMinimoNuevo = parseInt($("#rangoValorMinimo" + index).val());

      if (valorMinimoNuevo < 0 || valorMinimoNuevo > this.props.maximoUmbral - 1) {
        $("#rangoValorMinimo" + index).val(0);
        copy[index].valorRangoMaximoMinimoNuevo = 0;
        copy[index].valorRangoMaximo = 0;
        this.setState({
          rangosCreados: copy
        });
      } else {
        copy[index].valorRangoMaximoMinimoNuevo = valorMinimoNuevo;
        copy[index].valorRangoMaximo = valorMinimoNuevo;
        this.setState({
          rangosCreados: copy
        });
      }
    }
  }, {
    key: "updateValorRangoMaximoCreado",
    value: function updateValorRangoMaximoCreado(index, x) {
      var copy = _toConsumableArray(this.state.rangosCreados);

      copy[index].valorRangoMaximo = x;
      this.setState({
        rangosCreados: copy
      });
    }
  }, {
    key: "modificarRangoSeccionUmbral",
    value: function modificarRangoSeccionUmbral(index) {
      var _this10 = this;

      var valMinimo = parseInt($("#rangoValorMinimo" + index).val());
      var valMaximo = this.state.rangosCreados[index].valorRangoMaximo;
      var valoresFueraDeOtrosRangos = true;

      for (var i = 0; i < rangosSeccionUmbralTodos.length; i++) {
        if (valMinimo >= rangosSeccionUmbralTodos[i].valorMinimo && valMinimo <= rangosSeccionUmbralTodos[i].valorMaximo && this.state.rangosSeccionUmbral[index].ID != rangosSeccionUmbralTodos[i].ID) {
          valoresFueraDeOtrosRangos = false;
        }

        if (valMaximo >= rangosSeccionUmbralTodos[i].valorMinimo && valMinimo <= rangosSeccionUmbralTodos[i].valorMaximo && this.state.rangosSeccionUmbral[index].ID != rangosSeccionUmbralTodos[i].ID) {
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
              request.query("update RangoSeccionUmbral set valorMinimo = " + valMinimo + ", valorMaximo = " + valMaximo + " where ID = " + _this10.state.rangosSeccionUmbral[index].ID, function (err, result) {
                if (err) {
                  console.log(err);

                  _this10.props.showMessage("Error", "No se pudo modificadr el rango de la sección del umbral.", true, false, {});

                  if (!rolledBack) {
                    transaction.rollback(function (err) {});
                  }
                } else {
                  transaction.commit(function (err) {
                    _this10.traerRangosSeccionUmbral();

                    _this10.props.traerUmbralesPADRE();

                    _this10.props.showSuccesMessage("Éxito", "Rango de la Sección del Umbral modificada.");
                  });
                }
              });
            }); // fin transaction
          } else {
            this.props.showMessage("Error", "Ingrese un número válido para el valor máximo.", true, false, {});
          }
        } else {
          this.props.showMessage("Error", "Ingrese un número válido para el valor mínimo.", true, false, {});
        }
      } else {
        this.props.showMessage("Error", "Los valores ingresados traspasan otros rangos.", true, false, {});
      }
    }
  }, {
    key: "verifyInputValues",
    value: function verifyInputValues(id) {
      if ($("#" + id).val() < 0) {
        $("#" + id).val(0);
        this.setState({
          valorRangoMaximoMinimoNuevo: 0,
          valorRangoMaximo: 0
        });
      } else if ($("#" + id).val() > this.props.maximoUmbral) {
        $("#" + id).val(0);
        this.setState({
          valorRangoMaximoMinimoNuevo: 0,
          valorRangoMaximo: 0
        });
      } else {
        this.setState({
          valorRangoMaximoMinimoNuevo: parseInt($("#" + id).val()),
          valorRangoMaximo: parseInt($("#" + id).val())
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this11 = this;

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
          value: "#ec407a",
          "data-swatches": "#ec407a|#ab47bc|#3f51b5|#26a69a|#8bc34a|#000000|#eeeeee|#f44336|#2196f3|#4caf50|#ffeb3b|#ff9800|#795548|#9e9e9e"
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
              return _this11.seleccionSeccionUmbral(i);
            },
            className: "btn",
            style: {
              width: "100%",
              color: seccionUmbral.color,
              backgroundColor: "transparent",
              borderColor: seccionUmbral.color,
              margin: "1% 0%"
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
            return _this11.retornoSeccionSeleccionUmbral();
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
          value: this.state.colorSeccionUmbralSeleccionado,
          "data-swatches": "#ec407a|#ab47bc|#3f51b5|#26a69a|#8bc34a|#000000|#eeeeee|#f44336|#2196f3|#4caf50|#ffeb3b|#ff9800|#795548|#9e9e9e"
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
          className: "col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 form-group text-center"
        }, _react["default"].createElement("label", {
          htmlFor: "nuevoRangoValorMinimo",
          className: "col-form-label"
        }, "Valor m\xEDnimo:")), _react["default"].createElement("div", {
          className: "col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 form-group text-center"
        }, _react["default"].createElement("label", {
          htmlFor: "nuevoRangoValorMaximo",
          className: "col-form-label"
        }, "Valor m\xE1ximo:"))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"
        }, _react["default"].createElement("input", {
          id: "nuevoRangoValorMinimo",
          name: "nuevoRangoValorMinimo",
          step: "1",
          min: "0",
          onKeyUp: function onKeyUp() {
            return _this11.verifyInputValues("nuevoRangoValorMinimo");
          },
          type: "number",
          defaultValue: "0"
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
            return _this11.setState({
              valorRangoMaximo: x
            });
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
            className: "col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 form-group text-center"
          }, _react["default"].createElement("label", {
            htmlFor: "rangoValorMinimo" + i,
            className: "col-form-label"
          }, "Valor M\xEDnimo Nuevo:")), _react["default"].createElement("div", {
            className: "col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 form-group text-center"
          }, _react["default"].createElement("label", {
            htmlFor: "rangoValorMaximo" + i,
            className: "col-form-label"
          }, "Valor M\xE1ximo Nuevo:"))), _react["default"].createElement("div", {
            className: "row"
          }, _react["default"].createElement("div", {
            className: "col-xl-3 col-lg-3 col-md-3 col-sm-4 col-3 form-group"
          }, _react["default"].createElement("input", {
            id: "rangoValorMinimo" + i,
            name: "rangoValorMinimo" + i,
            step: "1",
            min: "0",
            max: "99",
            type: "number",
            defaultValue: rangoSeccionUmbral.valorMinimo,
            onChange: function onChange() {
              return _this11.updateValorRangoMinimoCreado(i);
            }
          })), _react["default"].createElement("div", {
            className: "col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 form-group"
          }, _react["default"].createElement(_reactInputSlider["default"], {
            axis: "x",
            xstep: 1,
            xmin: _this11.state.rangosCreados[i].valorRangoMaximoMinimoNuevo,
            xmax: _this11.props.maximoUmbral,
            x: _this11.state.rangosCreados[i].valorRangoMaximo,
            onChange: function onChange(_ref2) {
              var x = _ref2.x;
              return _this11.setState({
                bandera: ""
              }, _this11.updateValorRangoMaximoCreado(i, x));
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
          }, _this11.state.rangosCreados[i].valorRangoMaximo))), _react["default"].createElement("div", {
            className: "text-center"
          }, _react["default"].createElement("a", {
            onClick: function onClick() {
              return _this11.modificarRangoSeccionUmbral(i);
            },
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
//# sourceMappingURL=CrearUmbral.js.map
