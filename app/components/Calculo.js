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

var nivelMaximoVariables = 0;
var arregloDeFuentesDeDatos = []; //Arreglo con las fuentes de datos
//objeto: {tablaID, nombre, descripcion, esObjeto, objetoPadreID, guardar, nivel, [arreglo de atributos]}
//objeto arreglo de atributos: {nombre, tipo, formula}

var arregloDeVariables = []; //Arreglo con las variables
//objeto: {nombre, descripcion, esObjeto, objetoPadreID, guardar, nivel, [arreglo de atributos]}
//objeto arreglo de atributos: {nombre, tipo, formula}

var arregloDeResultadosDeFuenteDeDatos = []; //Arreglo con los valores de las tablas de fuentes de datos

var arregloConecionesATablas = []; //Arreglo con los valores para poder conetarse a las tablas

var banderaImportacionCamposFuenteDatosINICIO = 0; //Bandera para saber si termino de importar los campos de las fuentes de datos

var banderaImportacionCamposFuenteDatosFIN = 0; //Bandera para saber si termino de importar los campos de las fuentes de datos

var banderaImportacionCamposVariablesINICIO = 0; //Bandera para saber si termino de importar los campos de las variables

var banderaImportacionCamposVariablesFIN = 0; //Bandera para saber si termino de importar los campos de las variables

var banderaImportacionConecionesATablasINICIO = 0; //Bandera para saber si termino de importar los valores para poder conetarse a las tablas

var banderaImportacionConecionesATablasFIN = 0; //Bandera para saber si termino de importar los valores para poder conetarse a las tablas

var banderaImportacionValoresDeTablasDeFuenteDeDatosINICIO = 0; //Bandera para saber si termino de importar los valores de las tablas de fuentes de datos

var banderaImportacionValoresDeTablasDeFuenteDeDatosFIN = 0; //Bandera para saber si termino de importar los valores de las tablas de fuentes de datos

var myWorker = new Worker("./components/CalculoVariablesWorker.js");

var Calculo =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Calculo, _React$Component);

  function Calculo(props) {
    var _this;

    _classCallCheck(this, Calculo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Calculo).call(this, props));
    /*this.state = {
        showLoadingScreen: false,
        mensajeLoadingScreen: ''
    }*/

    _this.iniciarCalculo = _this.iniciarCalculo.bind(_assertThisInitialized(_this));
    _this.getNivelMaximoCampos = _this.getNivelMaximoCampos.bind(_assertThisInitialized(_this));
    _this.getNivelMaximoVariables = _this.getNivelMaximoVariables.bind(_assertThisInitialized(_this));
    _this.traerFuenteDatos = _this.traerFuenteDatos.bind(_assertThisInitialized(_this));
    _this.traerAtributosFuenteDatos = _this.traerAtributosFuenteDatos.bind(_assertThisInitialized(_this));
    _this.revisarFinImportacionCamposFuenteDatos = _this.revisarFinImportacionCamposFuenteDatos.bind(_assertThisInitialized(_this));
    _this.traerVariables = _this.traerVariables.bind(_assertThisInitialized(_this));
    _this.traerAtributosVariables = _this.traerAtributosVariables.bind(_assertThisInitialized(_this));
    _this.revisarFinImportacionCamposVariables = _this.revisarFinImportacionCamposVariables.bind(_assertThisInitialized(_this));
    _this.inicioTraerConeccionesATablas = _this.inicioTraerConeccionesATablas.bind(_assertThisInitialized(_this));
    _this.noHaSidoImportadaConeccion = _this.noHaSidoImportadaConeccion.bind(_assertThisInitialized(_this));
    _this.traerConeccionesATablas = _this.traerConeccionesATablas.bind(_assertThisInitialized(_this));
    _this.finTraerConeccionesATablas = _this.finTraerConeccionesATablas.bind(_assertThisInitialized(_this));
    _this.inicioTraerResultadosDeFuenteDeDatos = _this.inicioTraerResultadosDeFuenteDeDatos.bind(_assertThisInitialized(_this));
    _this.traerResultadosDeFuenteDeDatos = _this.traerResultadosDeFuenteDeDatos.bind(_assertThisInitialized(_this));
    _this.finTraerResultadosDeFuenteDeDatos = _this.finTraerResultadosDeFuenteDeDatos.bind(_assertThisInitialized(_this));
    _this.iniciarHilo = _this.iniciarHilo.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Calculo, [{
    key: "iniciarCalculo",
    value: function iniciarCalculo() {
      this.getNivelMaximoCampos();
    }
  }, {
    key: "getNivelMaximoCampos",
    value: function getNivelMaximoCampos() {
      var _this2 = this;

      nivelMaximoVariables = 0;
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select MAX(nivel) AS nivel from Campos", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                nivelMaximoVariables = result.recordset[0].nivel;
              }

              _this2.getNivelMaximoVariables();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getNivelMaximoVariables",
    value: function getNivelMaximoVariables() {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select MAX(nivel) AS nivel from Variables", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0 && nivelMaximoVariables < result.recordset[0].nivel) {
                nivelMaximoVariables = result.recordset[0].nivel;
              }

              arregloDeFuentesDeDatos = [];

              _this3.traerFuenteDatos();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "traerFuenteDatos",
    value: function traerFuenteDatos() {
      var _this4 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from FuenteDatos", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              arregloDeFuentesDeDatos = result.recordset;
              banderaImportacionCamposFuenteDatosINICIO = 0;
              banderaImportacionCamposFuenteDatosFIN = arregloDeFuentesDeDatos.length;

              for (var i = 0; i < arregloDeFuentesDeDatos.length; i++) {
                _this4.traerAtributosFuenteDatos(arregloDeFuentesDeDatos[i].ID, i);
              }

              ;
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "traerAtributosFuenteDatos",
    value: function traerAtributosFuenteDatos(fuenteDatoID, index) {
      var _this5 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from FuenteDatosCampos where fuenteDatoID = " + fuenteDatoID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              banderaImportacionCamposFuenteDatosINICIO++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              banderaImportacionCamposFuenteDatosINICIO++;
              arregloDeFuentesDeDatos[index].atributos = result.recordset;

              _this5.revisarFinImportacionCamposFuenteDatos();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "revisarFinImportacionCamposFuenteDatos",
    value: function revisarFinImportacionCamposFuenteDatos() {
      if (banderaImportacionCamposFuenteDatosINICIO == banderaImportacionCamposFuenteDatosFIN) {
        arregloDeVariables = [];
        this.traerVariables();
      }
    }
  }, {
    key: "traerVariables",
    value: function traerVariables() {
      var _this6 = this;

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
            }
          } else {
            transaction.commit(function (err) {
              arregloDeVariables = result.recordset;
              banderaImportacionCamposVariablesINICIO = 0;
              banderaImportacionCamposVariablesFIN = arregloDeVariables.length;

              for (var i = 0; i < arregloDeVariables.length; i++) {
                _this6.traerAtributosVariables(arregloDeVariables[i].ID, i);
              }

              ;
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "traerAtributosVariables",
    value: function traerAtributosVariables(variableID, index) {
      var _this7 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from FuenteDatosCampos where variableID = " + variableID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              banderaImportacionCamposVariablesINICIO++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              banderaImportacionCamposVariablesINICIO++;
              arregloDeVariables[index].atributos = result.recordset;

              _this7.revisarFinImportacionCamposVariables();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "revisarFinImportacionCamposVariables",
    value: function revisarFinImportacionCamposVariables() {
      if (banderaImportacionCamposVariablesINICIO == banderaImportacionCamposVariablesFIN) {
        this.inicioTraerConeccionesATablas();
      }
    }
  }, {
    key: "inicioTraerConeccionesATablas",
    value: function inicioTraerConeccionesATablas() {
      banderaImportacionConecionesATablasINICIO = 0;
      banderaImportacionConecionesATablasFIN = 0;
      arregloConecionesATablas = [];

      for (var i = 0; i < arregloDeFuentesDeDatos.length; i++) {
        if (this.noHaSidoImportadaConeccion(arregloDeFuentesDeDatos[i])) {
          banderaImportacionConecionesATablasFIN++; //para asegurar que ID no sea asyncrono

          arregloConecionesATablas[i].push({
            ID: arregloDeFuentesDeDatos[i].tablaID
          });
          this.traerConeccionesATablas(arregloDeFuentesDeDatos[i].tablaID, i);
        }
      }

      ;
    }
  }, {
    key: "noHaSidoImportadaConeccion",
    value: function noHaSidoImportadaConeccion(fuenteDeDato) {
      for (var i = 0; i < arregloConecionesATablas.length; i++) {
        if (arregloConecionesATablas[i].ID == fuenteDeDato.tablaID) {
          return false;
        }
      }

      ;
      return true;
    }
  }, {
    key: "traerConeccionesATablas",
    value: function traerConeccionesATablas(tablaID, indexARemplazar) {
      var _this8 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Tablas where ID = " + tablaID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              banderaImportacionConecionesATablasINICIO++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              banderaImportacionConecionesATablasINICIO++;
              if (result.recordset.length > 0) arregloConecionesATablas[indexARemplazar] = arregloConecionesATablas.concat(result.recordset);

              _this8.finTraerConeccionesATablas();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "finTraerConeccionesATablas",
    value: function finTraerConeccionesATablas() {
      if (banderaImportacionConecionesATablasINICIO == banderaImportacionConecionesATablasFIN) {
        this.inicioTraerResultadosDeFuenteDeDatos();
      }
    }
  }, {
    key: "inicioTraerResultadosDeFuenteDeDatos",
    value: function inicioTraerResultadosDeFuenteDeDatos() {
      banderaImportacionValoresDeTablasDeFuenteDeDatosINICIO = 0;
      banderaImportacionValoresDeTablasDeFuenteDeDatosFIN = 0;
      arregloDeResultadosDeFuenteDeDatos = [];

      for (var i = 0; i < arregloConecionesATablas.length; i++) {
        banderaImportacionValoresDeTablasDeFuenteDeDatosFIN++;
        this.traerResultadosDeFuenteDeDatos(arregloConecionesATablas[i]);
      }

      ;
    }
  }, {
    key: "traerResultadosDeFuenteDeDatos",
    value: function traerResultadosDeFuenteDeDatos(tabla, index) {
      var _this9 = this;

      var pool = new _mssql["default"].ConnectionPool({
        user: tabla.usuario,
        password: tabla.contrasena,
        server: tabla.servidor,
        database: tabla.baseDatos,
        stream: true,
        connectionTimeout: 900000,
        requestTimeout: 900000,
        pool: {
          max: 40,
          min: 0,
          idleTimeoutMillis: 30000
        },
        options: {
          useUTC: false
        }
      });
      pool.connect(function (err) {
        pool.request().query("select * from " + tabla.tabla, function (err, result) {
          banderaImportacionValoresDeTablasDeFuenteDeDatosINICIO++;
          if (result.recordset != undefined && result.recordset.length > 0) arregloDeResultadosDeFuenteDeDatos.splice(index, 0, result.recordset);

          _this9.finTraerResultadosDeFuenteDeDatos();
        });
      }); // fin pool connect
    }
  }, {
    key: "finTraerResultadosDeFuenteDeDatos",
    value: function finTraerResultadosDeFuenteDeDatos() {
      if (banderaImportacionValoresDeTablasDeFuenteDeDatosINICIO == banderaImportacionValoresDeTablasDeFuenteDeDatosFIN) {
        this.iniciarHilo();
      }
    }
  }, {
    key: "iniciarHilo",
    value: function iniciarHilo() {
      console.log('nivelMaximoVariables');
      console.log(nivelMaximoVariables);
      console.log('arregloDeFuentesDeDatos');
      console.log(arregloDeFuentesDeDatos);
      console.log('arregloDeVariables');
      console.log(arregloDeVariables);
      console.log('arregloDeResultadosDeFuenteDeDatos');
      console.log(arregloDeResultadosDeFuenteDeDatos);
      console.log('arregloConecionesATablas');
      console.log(arregloConecionesATablas);
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement("br", null), _react["default"].createElement("a", {
        className: "btn btn-brand btn-block btnWhiteColorHover font-bold font-20",
        style: {
          color: "#fafafa"
        },
        onClick: this.iniciarCalculo
      }, "Iniciar"), _react["default"].createElement("br", null));
    }
  }]);

  return Calculo;
}(_react["default"].Component);

exports["default"] = Calculo;
//# sourceMappingURL=Calculo.js.map
