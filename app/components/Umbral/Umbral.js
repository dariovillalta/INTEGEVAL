"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _VistaUmbral = _interopRequireDefault(require("./VistaUmbral.js"));

var _EditarUmbral = _interopRequireDefault(require("./EditarUmbral.js"));

var _ListaRestoUmbrales = _interopRequireDefault(require("./ListaRestoUmbrales.js"));

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

var secciones = [{
  nombre: "MONO 1",
  color: "#00c853",
  width: "25"
}, {
  nombre: "MONO 2",
  color: "#ffab40",
  width: "50"
}, {
  nombre: "MONO 1",
  color: "#00c853",
  width: "25"
}];
var seccionesConRango = [];
var posicionesInsertadasRango = 0,
    posicionesAInsertarRango = 0;

var Umbral =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Umbral, _React$Component);

  function Umbral(props) {
    var _this;

    _classCallCheck(this, Umbral);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Umbral).call(this, props));
    _this.state = {
      umbrales: [],
      secciones: []
    };
    _this.traerUmbrales = _this.traerUmbrales.bind(_assertThisInitialized(_this));
    _this.inicioTraerSecciones = _this.inicioTraerSecciones.bind(_assertThisInitialized(_this));
    _this.traerSeccion = _this.traerSeccion.bind(_assertThisInitialized(_this));
    _this.inicioTraerSeccionRango = _this.inicioTraerSeccionRango.bind(_assertThisInitialized(_this));
    _this.traerSeccionRango = _this.traerSeccionRango.bind(_assertThisInitialized(_this));
    _this.inicioCrearArregloSeccionRango = _this.inicioCrearArregloSeccionRango.bind(_assertThisInitialized(_this));
    _this.ingresarSeccion = _this.ingresarSeccion.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Umbral, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.traerUmbrales();
    }
  }, {
    key: "traerUmbrales",
    value: function traerUmbrales() {
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
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                umbrales: result.recordset
              }, _this2.inicioTraerSecciones);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "inicioTraerSecciones",
    value: function inicioTraerSecciones() {
      var posicionesInsertadas = [];
      seccionesConRango = [];

      for (var i = 0; i < this.state.umbrales.length; i++) {
        this.traerSeccion(this.state.umbrales[i], i, this.state.umbrales.length, posicionesInsertadas);
      }

      ;
    }
  }, {
    key: "traerSeccion",
    value: function traerSeccion(umbral, index, ultimoIndex, posicionesInsertadas) {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from SeccionUmbral where umbralID = " + umbral.ID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (seccionesConRango[index] == undefined) seccionesConRango[index] = [];
              seccionesConRango[index] = result.recordset;
              posicionesInsertadas.push(index);
              if (posicionesInsertadas.length == ultimoIndex) _this3.inicioTraerSeccionRango();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "inicioTraerSeccionRango",
    value: function inicioTraerSeccionRango() {
      posicionesInsertadasRango = 0, posicionesAInsertarRango = 0;

      for (var i = 0; i < seccionesConRango.length; i++) {
        for (var j = 0; j < seccionesConRango[i].length; j++) {
          posicionesAInsertarRango++;
          this.traerSeccionRango(seccionesConRango[i][j], i, j);
        }

        ;
      }

      ;
    }
  }, {
    key: "traerSeccionRango",
    value: function traerSeccionRango(seccionRango, indexUmbral, indexRango) {
      var _this4 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from RangoSeccionUmbral where umbralID = " + seccionRango.umbralID + " and seccionUmbralID = " + seccionRango.ID, function (err, result) {
          if (err) {
            posicionesInsertadasRango++;
            console.log(err);

            if (!rolledBack) {
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              posicionesInsertadasRango++;
              if (seccionesConRango[indexUmbral] == undefined) seccionesConRango[indexUmbral] = [];
              if (seccionesConRango[indexUmbral][indexRango] == undefined) seccionesConRango[indexUmbral][indexRango] = [];
              seccionesConRango[indexUmbral][indexRango].rangos = result.recordset;
              if (posicionesInsertadasRango == posicionesAInsertarRango) _this4.inicioCrearArregloSeccionRango();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "inicioCrearArregloSeccionRango",
    value: function inicioCrearArregloSeccionRango() {
      var arrOrdenado = [];

      for (var i = 0; i < seccionesConRango.length; i++) {
        for (var j = 0; j < seccionesConRango[i].length; j++) {
          for (var k = 0; k < seccionesConRango[i][j].rangos.length; k++) {
            this.ingresarSeccion(seccionesConRango[i][j].rangos[k], arrOrdenado, seccionesConRango[i][j].nombre, seccionesConRango[i][j].color);
          }

          ;
        }

        ;
      }

      ; //calculando porcentaje dentro del total
      //suma del total

      var sumTot = 0;

      for (var i = 0; i < arrOrdenado.length; i++) {
        var totSec = arrOrdenado[i].valorMaximo - arrOrdenado[i].valorMinimo;
        sumTot += totSec;
      }

      ;

      for (var i = 0; i < arrOrdenado.length; i++) {
        var totSec = arrOrdenado[i].valorMaximo - arrOrdenado[i].valorMinimo;
        arrOrdenado[i].width = totSec / sumTot * 100;
      }

      ;
      this.setState({
        secciones: arrOrdenado
      });
    }
  }, {
    key: "ingresarSeccion",
    value: function ingresarSeccion(seccionNueva, arrSecciones, nombre, color) {
      if (arrSecciones.length == 0) {
        arrSecciones.push(seccionNueva);
        arrSecciones[arrSecciones.length - 1].nombre = nombre;
        arrSecciones[arrSecciones.length - 1].color = color;
        return;
      }

      var encontroPos = false;

      for (var i = 0; i < arrSecciones.length; i++) {
        if (seccionNueva.valorMaximo < arrSecciones[i].valorMinimo) {
          encontroPos = true;
          break;
        }
      }

      ;
      arrSecciones.splice(i, 0, seccionNueva);
      arrSecciones[i].nombre = nombre;
      arrSecciones[i].color = color;
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, this.props.navbar, _react["default"].createElement(_ListaRestoUmbrales["default"], {
        lista: this.props.lista
      }, " "), _react["default"].createElement(_VistaUmbral["default"], {
        umbrales: this.state.secciones
      }, " "), _react["default"].createElement(_EditarUmbral["default"], {
        idVariable: this.props.idVariable,
        pool: this.props.pool,
        tablaVariable: this.props.tablaVariable,
        tituloUmbral: this.props.tituloUmbral,
        traerUmbralesPADRE: this.traerUmbrales
      }, " "));
    }
  }]);

  return Umbral;
}(_react["default"].Component);

exports["default"] = Umbral;
//# sourceMappingURL=Umbral.js.map
