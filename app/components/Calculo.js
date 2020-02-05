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

var arregloDeReglas = []; //Arreglo con las reglas / instrucciones correspondientes a la posicion del atributo

var arregloDeFormulas = []; //Arreglo con las formulas / asignaciones correspondientes a la posicion del atributo

var arregloDeElementosDeFormulas = []; //Arreglo con las fuentes de datos correspondientes a la posicion de la formula

var arregloConexionesATablas = []; //Arreglo con los valores para poder conectarse a las tablas

var arregloResultadosDeTablas = []; //Arreglo con los valores obtenidos despues de conectarse a las tablas

var banderaImportacionCamposVariablesINICIO = 0; //Bandera para saber si termino de importar los campos de las variables

var banderaImportacionCamposVariablesFIN = 0; //Bandera para saber si termino de importar los campos de las variables

var banderaImportacionReglasCamposVariablesINICIO = 0; //Bandera para saber si termino de importar las reglas de los campos de las variables

var banderaImportacionReglasCamposVariablesFIN = 0; //Bandera para saber si termino de importar las reglas de los campos de las variables

var banderaImportacionFormulasCamposVariablesINICIO = 0; //Bandera para saber si termino de importar las formulas de los campos de las variables

var banderaImportacionFormulasCamposVariablesFIN = 0; //Bandera para saber si termino de importar las formulas de los campos de las variables

var banderaImportacionElementosFormulasCamposVariablesINICIO = 0; //Bandera para saber si termino de importar los elementos de las formulas de los campos de las variables

var banderaImportacionElementosFormulasCamposVariablesFIN = 0; //Bandera para saber si termino de importar los elementos de las formulas de los campos de las variables

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
    _this.getNivelMaximoVariables = _this.getNivelMaximoVariables.bind(_assertThisInitialized(_this));
    _this.traerVariables = _this.traerVariables.bind(_assertThisInitialized(_this));
    _this.traerAtributosVariables = _this.traerAtributosVariables.bind(_assertThisInitialized(_this));
    _this.revisarFinImportacionCamposVariables = _this.revisarFinImportacionCamposVariables.bind(_assertThisInitialized(_this));
    _this.inicioTraerReglasDeCampos = _this.inicioTraerReglasDeCampos.bind(_assertThisInitialized(_this));
    _this.traerReglasDeCampos = _this.traerReglasDeCampos.bind(_assertThisInitialized(_this));
    _this.revisarFinImportacionReglasCampos = _this.revisarFinImportacionReglasCampos.bind(_assertThisInitialized(_this));
    _this.inicioTraerFormulasDeCampos = _this.inicioTraerFormulasDeCampos.bind(_assertThisInitialized(_this));
    _this.traerFormulasDeCampos = _this.traerFormulasDeCampos.bind(_assertThisInitialized(_this));
    _this.revisarFinImportacionFormulasCampos = _this.revisarFinImportacionFormulasCampos.bind(_assertThisInitialized(_this));
    _this.inicioTraerElementosFormulasDeCampos = _this.inicioTraerElementosFormulasDeCampos.bind(_assertThisInitialized(_this));
    _this.traerElementosFormulasDeCampos = _this.traerElementosFormulasDeCampos.bind(_assertThisInitialized(_this));
    _this.revisarFinImportacionElementosFormulasCampos = _this.revisarFinImportacionElementosFormulasCampos.bind(_assertThisInitialized(_this));
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
      this.getNivelMaximoVariables();
    }
  }, {
    key: "getNivelMaximoVariables",
    value: function getNivelMaximoVariables() {
      var _this2 = this;

      nivelMaximoVariables = 0;
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select MAX(nivel) AS nivel from VariablesCampos", function (err, result) {
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

              arregloDeVariables = [];

              _this2.traerVariables();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "traerVariables",
    value: function traerVariables() {
      var _this3 = this;

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
                _this3.traerAtributosVariables(arregloDeVariables[i].ID, i);
              }

              ;

              if (arregloDeVariables.length == 0) {
                alert("No existen variables");
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "traerAtributosVariables",
    value: function traerAtributosVariables(variableID, index) {
      var _this4 = this;

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
              banderaImportacionCamposVariablesINICIO++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              banderaImportacionCamposVariablesINICIO++;
              arregloDeVariables[index].atributos = result.recordset;

              _this4.revisarFinImportacionCamposVariables();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "revisarFinImportacionCamposVariables",
    value: function revisarFinImportacionCamposVariables() {
      if (banderaImportacionCamposVariablesINICIO == banderaImportacionCamposVariablesFIN) {
        this.inicioTraerReglasDeCampos();
      }
    }
  }, {
    key: "inicioTraerReglasDeCampos",
    value: function inicioTraerReglasDeCampos() {
      banderaImportacionReglasCamposVariablesINICIO = 0;
      banderaImportacionReglasCamposVariablesFIN = 0;

      for (var i = 0; i < arregloDeVariables.length; i++) {
        for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
          banderaImportacionReglasCamposVariablesFIN++;
          this.traerReglasDeCampos(arregloDeVariables[i].atributos[j].ID, i, j);
        }

        ;
      }

      ;
    }
  }, {
    key: "traerReglasDeCampos",
    value: function traerReglasDeCampos(variableCampoID, i, j) {
      var _this5 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Reglas where campoVariablePadreID = " + variableCampoID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              banderaImportacionReglasCamposVariablesINICIO++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              banderaImportacionReglasCamposVariablesINICIO++;
              arregloDeVariables[i].atributos[j].formulas = result.recordset;

              _this5.revisarFinImportacionReglasCampos();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "revisarFinImportacionReglasCampos",
    value: function revisarFinImportacionReglasCampos() {
      if (banderaImportacionReglasCamposVariablesINICIO == banderaImportacionReglasCamposVariablesFIN) {
        this.inicioTraerFormulasDeCampos();
      }
    }
  }, {
    key: "inicioTraerFormulasDeCampos",
    value: function inicioTraerFormulasDeCampos() {
      banderaImportacionFormulasCamposVariablesINICIO = 0;
      banderaImportacionFormulasCamposVariablesFIN = 0;

      for (var i = 0; i < arregloDeVariables.length; i++) {
        for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
          banderaImportacionFormulasCamposVariablesFIN++;
          this.traerFormulasDeCampos(arregloDeVariables[i].atributos[j].ID, i, j);
        }

        ;
      }

      ;
    }
  }, {
    key: "traerFormulasDeCampos",
    value: function traerFormulasDeCampos(variableCampoID, i, j) {
      var _this6 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from FormulasVariablesCampos where variableCampoID = " + variableCampoID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              banderaImportacionFormulasCamposVariablesINICIO++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              banderaImportacionFormulasCamposVariablesINICIO++;
              arregloDeVariables[i].atributos[j].formulas = result.recordset;

              _this6.revisarFinImportacionFormulasCampos();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "revisarFinImportacionFormulasCampos",
    value: function revisarFinImportacionFormulasCampos() {
      if (banderaImportacionFormulasCamposVariablesINICIO == banderaImportacionFormulasCamposVariablesFIN) {
        this.inicioTraerElementosFormulasDeCampos();
      }
    }
  }, {
    key: "inicioTraerElementosFormulasDeCampos",
    value: function inicioTraerElementosFormulasDeCampos() {
      banderaImportacionElementosFormulasCamposVariablesINICIO = 0;
      banderaImportacionElementosFormulasCamposVariablesFIN = 0;

      for (var i = 0; i < arregloDeVariables.length; i++) {
        for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
          for (var k = 0; k < arregloDeVariables[i].atributos[j].formulas.length; k++) {
            banderaImportacionElementosFormulasCamposVariablesFIN++;
            this.traerElementosFormulasDeCampos(arregloDeVariables[i].atributos[j].formulas[k].ID, i, j, k);
          }

          ;
        }

        ;
      }

      ;
    }
  }, {
    key: "traerElementosFormulasDeCampos",
    value: function traerElementosFormulasDeCampos(idFormula, i, j, k) {
      var _this7 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ElementoFormulasVariablesCampos where idFormula = " + idFormula, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              banderaImportacionElementosFormulasCamposVariablesINICIO++;
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              banderaImportacionElementosFormulasCamposVariablesINICIO++;
              arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos = result.recordset;

              _this7.revisarFinImportacionElementosFormulasCampos();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "revisarFinImportacionElementosFormulasCampos",
    value: function revisarFinImportacionElementosFormulasCampos() {
      if (banderaImportacionElementosFormulasCamposVariablesINICIO == banderaImportacionElementosFormulasCamposVariablesFIN) {
        this.inicioTraerConeccionesATablas();
      }
    }
  }, {
    key: "inicioTraerConeccionesATablas",
    value: function inicioTraerConeccionesATablas() {
      banderaImportacionConecionesATablasINICIO = 0;
      banderaImportacionConecionesATablasFIN = 0;
      arregloConexionesATablas = [];

      for (var i = 0; i < arregloDeVariables.length; i++) {
        for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
          for (var k = 0; k < arregloDeVariables[i].atributos[j].formulas.length; k++) {
            for (var l = 0; l < arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos.length; l++) {
              if (this.noHaSidoImportadaConeccion(arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos[l])) {
                banderaImportacionConecionesATablasFIN++; //para asegurar que ID no sea asyncrono

                arregloConexionesATablas.push({
                  ID: arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos[l].idConexionTabla
                });
                arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos[l];
                this.traerConeccionesATablas(arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos[l].idConexionTabla, arregloConexionesATablas.length - 1);
              }
            }

            ;
          }

          ;
        }

        ;
      }

      ;
    }
  }, {
    key: "noHaSidoImportadaConeccion",
    value: function noHaSidoImportadaConeccion(fuenteDeDato) {
      for (var i = 0; i < arregloConexionesATablas.length; i++) {
        if (arregloConexionesATablas[i].ID == fuenteDeDato.idConexionTabla) {
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
              if (result.recordset.length > 0) arregloConexionesATablas[indexARemplazar] = result.recordset[0];

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
      arregloResultadosDeTablas = [];

      for (var i = 0; i < arregloConexionesATablas.length; i++) {
        banderaImportacionValoresDeTablasDeFuenteDeDatosFIN++;
        this.traerResultadosDeFuenteDeDatos(arregloConexionesATablas[i]);
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
          if (result.recordset != undefined && result.recordset.length > 0) arregloResultadosDeTablas.splice(index, 0, result.recordset);

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
      console.log('arregloResultadosDeTablas');
      console.log(arregloResultadosDeTablas);
      console.log('arregloConexionesATablas');
      console.log(arregloConexionesATablas); //DESCRIPCION DEL PROCEDIMIENTO
      //1) PRIMERO CREAR CODIGO PARA CREAR VARIABLES DE ELEMENTOS DE FORMULAS, AGRUPADAS POR TABLAS CORRESPONDIENTES  -- SERA PRIMER METODO A LLAMAR
      //2) CREAR METODO NIVEL XX, CONTENDRA LLAMADO A METODO 'CALCULO VARIABLES NIVEL XX', Y JUSTO DESPUES LLAMARÁ AL SIGUIENTE NIVEL QUE SIGUE, O AL METODO DE MENSAJE FINAL
      //3) CREAR CODIGO 'CALCULO VARIABLES NIVEL XX'
      //AGRUPANDO ELEMENTOS DE FORMULA POR CONEXION A TABLA

      var arregloAgrupacionElementosFormulaPorConexionATabla = []; //arreglo que contiene los elementos de formulas agrupados por tablas

      for (var i = 0; i < arregloDeVariables.length; i++) {
        for (var j = 0; j < arregloDeVariables[i].atributos.length; j++) {
          for (var k = 0; k < arregloDeVariables[i].atributos[j].formulas.length; k++) {
            for (var l = 0; l < arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos.length; l++) {
              for (var m = 0; m < arregloConexionesATablas.length; m++) {
                if (arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos[l].idConexionTabla == arregloConexionesATablas[m].ID) {
                  if (arregloAgrupacionElementosFormulaPorConexionATabla[m] == undefined) arregloAgrupacionElementosFormulaPorConexionATabla[m] = 0;
                  arregloAgrupacionElementosFormulaPorConexionATabla[m].push(arregloDeVariables[i].atributos[j].formulas[k].fuenteDeDatos[l]);
                }
              }

              ;
            }

            ;
          }

          ;
        }

        ;
      }

      ; //CREAR CODIGO DE LLENAR / CALCULAR ELEMENTOS DE FORMULAS

      var codigoElementosFormula = '';

      for (var i = 0; i < arregloConexionesATablas.length; i++) {
        if (i != 0) codigoElementosFormula += '\n\n';
        codigoElementosFormula += 'for (int i = 0; i < arregloConexionesATablas[' + i + '].length; i++) {';

        for (var j = 0; j < arregloAgrupacionElementosFormulaPorConexionATabla[i].length; j++) {
          var codigoCalculoVariable = codigoRegla(arregloAgrupacionElementosFormulaPorConexionATabla[i][j]);

          for (var k = 0; k < codigoCalculoVariable.length; k++) {
            codigoElementosFormula += '\n\t' + codigoCalculoVariable[k];
          }

          ;
        }

        ;
        codigoElementosFormula += '\n}';
      }

      ;
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
