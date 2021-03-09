"use strict";

var document = self.document = {
  parentNode: null,
  nodeType: 9,
  toString: function toString() {
    return "FakeDocument";
  }
};
var window = self.window = self;
var fakeElement = Object.create(document);
fakeElement.nodeType = 1;

fakeElement.toString = function () {
  return "FakeElement";
};

fakeElement.parentNode = fakeElement.firstChild = fakeElement.lastChild = fakeElement;
fakeElement.ownerDocument = document;
document.head = document.body = fakeElement;
document.ownerDocument = document.documentElement = document;

document.getElementById = document.createElement = function () {
  return fakeElement;
};

document.createDocumentFragment = function () {
  return this;
};

document.getElementsByTagName = document.getElementsByClassName = function () {
  return [fakeElement];
};

document.getAttribute = document.setAttribute = document.removeChild = document.addEventListener = document.removeEventListener = function () {
  return null;
};

document.cloneNode = document.appendChild = function () {
  return this;
};

document.appendChild = function (child) {
  return child;
};

onmessage = function onmessage(e) {
  //e.data[1] = nivelMaximoVariables
  //e.data[2] = arregloDeFuentesDeDatos
  //e.data[3] = arregloDeVariables
  //e.data[4] = arregloDeResultadosDeFuenteDeDatos
  //e.data[5] = arregloConecionesATablas
  //e.data[6] = arregloReglasPorVariable

  /*if(e.data[0].localeCompare("iniciarArregloClientes") == 0) {
  	crearArregloClientes(e.data[1], e.data[2], e.data[3], e.data[4], e.data[5]);
  }*/
  for (var i = 0; i < e.data[1]; i++) {
    var variables = getVariablesNivelCorrespondiente(e.data[3], i);
    var callback = '';

    if (i == nivelMaximoVariables - 1) {
      callback = 'ultima llamada';
    } else {
      callback = 'nivel';
    }

    createNivel(i, callback, e.data[6]);
  }

  ;
};

function createNivel(nivel, callback, arregloDeReglas) {
  var codigoFuenteDeDatos = createFuenteDeDatos(nivel, callback);
  var codigoVariables = createVariables(nivel, callback);
}

function createFuenteDeDatos(nivel, callback, arregloDeReglas, fuenteDeDatosOriginal) {
  var content = '';
  var fuenteDeDatos = getVariablesNivelCorrespondiente(fuenteDeDatosOriginal, nivel);

  for (var i = 0; i < fuenteDeDatos.length; i++) {
    var reglasFuenteDeDatos = getReglasCorrespondiente(arregloDeReglas, fuenteDeDatos[i].ID);

    for (var j = 0; j < reglasFuenteDeDatos.length; j++) {
      var arregloCodigo = crearCodigoReglas(reglasFuenteDeDatos[j]);

      for (var k = 0; k < arregloCodigo.length; k++) {
        content += arregloCodigo[k];
      }

      ;
    }
  }

  ;

  if (callback.localeCompare("ultima llamada") != 0) {
    content += "\t" + callback + "\n";
  }

  console.log('createFuenteDeDatos content');
  console.log(content);
  return content;
}

function createVariables(nivel, callback, arregloDeReglas, variablesOriginal) {
  var content = '';
  var variables = getVariablesNivelCorrespondiente(variablesOriginal, nivel);

  for (var i = 0; i < variables.length; i++) {
    var reglasVariables = getReglasCorrespondiente(arregloDeReglas, variables[i].ID);

    for (var j = 0; j < reglasVariables.length; j++) {
      var arregloCodigo = crearCodigoReglas(reglasVariables[j]);

      for (var k = 0; k < arregloCodigo.length; k++) {
        content += arregloCodigo[k];
      }

      ;
    }
  }

  ;

  if (callback.localeCompare("ultima llamada") == 0) {
    content += "}\n";
  } else if (callback.localeCompare("ultima llamada") != 0) {
    content += "\t" + callback + "\n";
    content += "}\n";
  }

  console.log('createVariables content');
  console.log(content);
  return content;
}

function getVariablesNivelCorrespondiente(arreglo, nivel) {
  var arregloResultado = arreglo.filter(function (object) {
    return object.nivel == nivel;
  });
  return arregloResultado;
}

function getReglasCorrespondiente(arreglo, variableID) {
  var arregloResultado = arreglo.filter(function (object) {
    return object.ID == variableID;
  });
  return arregloResultado;
}

function crearCodigoReglas(regla, arreglo, tabs, variable, proyeccion, posProyeccion, posVariable, posSubVariable) {
  var esCondicion = false,
      noAgregarFactor = false,
      noAgregarFecha = false;
  if (regla.operacion == "-" || regla.operacion == "+" || regla.operacion == "*" || regla.operacion == "/" || regla.operacion == "=") esCondicion = false;else esCondicion = true;
  var hasVariables = false;
  var textVariables = [];
  if (regla.variables.length > 0) hasVariables = true;
  var tabsText = '';

  for (var i = 0; i < tabs; i++) {
    tabsText += '\t';
  }

  ;
  var posicionesIF = [];
  var idFiltro = '';
  if (regla.filtro != -1) idFiltro = regla.filtro;

  if (regla.campoObjetivo.indexOf('COLUMNA') == 0) {
    if (esCondicion) {
      if (!regla.campoObjetivo.includes('plazoResidual')) {
        var campo = regla.campoObjetivo.split("=")[1]; // Agregando campo Operacion

        if (regla.operacion == "en" || regla.operacion == "no") arreglo.push({
          codigo: tabsText + "if ( arregloDepositos" + idFiltro + "[i]." + campo + ".localeCompare('",
          filtro: regla.filtro
        });else arreglo.push({
          codigo: tabsText + "if ( arregloDepositos" + idFiltro + "[i]." + campo + " " + regla.operacion,
          filtro: regla.filtro
        }); //posicionesIF.push(arreglo.length-1);

        posicionesIF.push(arreglo.length);
      } else {
        noAgregarFecha = true;
        var campo = regla.campoObjetivo.split("=")[1];
        arreglo.push({
          codigo: tabsText + "var nuevaFecha" + regla.ID + " = new Date();\n",
          filtro: regla.filtro
        });
        arreglo.push({
          codigo: tabsText + "nuevaFecha" + regla.ID + " = addDays(nuevaFecha" + regla.ID + "," + proyeccion + ");\n",
          filtro: regla.filtro
        });
        var query, agregarComparator, agregarIsSame;

        if (regla.operacion.includes("<")) {
          query = 'isBefore';
        } else {
          query = 'isAfter';
        }

        if (!regla.operacion.includes("!") && !regla.operacion.includes("==")) {
          agregarComparator = "moment(arregloDepositos" + idFiltro + "[i].fechaFinal)." + query + "(moment(nuevaFecha" + regla.ID + "), 'day')";
        } else if (regla.operacion.includes("==")) {
          agregarComparator = "moment(arregloDepositos" + idFiltro + "[i].fechaFinal).isSame(moment(nuevaFecha" + regla.ID + "), 'day')";
        } else {
          agregarComparator = "!moment(arregloDepositos" + idFiltro + "[i].fechaFinal).isSame(moment(nuevaFecha" + regla.ID + "), 'day')";
        }

        if (regla.operacion.includes("=") && (regla.operacion.includes("<") || regla.operacion.includes(">"))) {
          agregarIsSame = " || moment(arregloDepositos" + idFiltro + "[i].fechaFinal).isSame(moment(nuevaFecha" + regla.ID + "), 'day')";
        } else {
          agregarIsSame = "";
        } // Agregando campo Operacion


        arreglo.push({
          codigo: tabsText + "if ( (arregloDepositos" + idFiltro + "[i].fechaFinal == undefined || arregloDepositos" + idFiltro + "[i].fechaFinal.toString().length == 0) || moment(arregloDepositos" + idFiltro + "[i].fechaFinal).isSame(moment('2001-01-01'), 'day') || " + agregarComparator + " " + agregarIsSame + " ) {",
          filtro: regla.filtro
        }); //posicionesIF.push(arreglo.length-1);

        posicionesIF.push(arreglo.length);
      }
    } else {
      var campo = regla.campoObjetivo.split("=")[1]; // Agregando campo Operacion

      arreglo.push({
        codigo: tabsText + "var totalDeposito = arregloDepositos" + idFiltro + "[i].saldo;",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n" + tabsText + "sumarSaldoOriginal(arregloDepositos" + idFiltro + "[i].saldo, " + posProyeccion + ", " + posVariable + ", " + posSubVariable + ", -1, arregloDepositos" + idFiltro + "[i].moneda.toLowerCase(), '');",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n" + tabsText + variable + proyeccion + " += totalDeposito " + regla.operacion,
        filtro: regla.filtro
      });
    }
  } else if (regla.campoObjetivo.indexOf('hastaFOSEDE') == 0) {
    noAgregarFactor = true;
    arreglo.push({
      codigo: tabsText + "var totalDeposito;",
      filtro: regla.filtro
    });
    arreglo.push({
      codigo: "\n" + tabsText + "var montoFosede = getMontoFOSEDE(arregloDepositos" + idFiltro + "[i].moneda);",
      filtro: regla.filtro
    });
    arreglo.push({
      codigo: "\n" + tabsText + "if ( arregloDepositos" + idFiltro + "[i].saldo > montoFosede )",
      filtro: regla.filtro
    });
    arreglo.push({
      codigo: "\n\t" + tabsText + "totalDeposito = montoFosede;",
      filtro: regla.filtro
    });
    arreglo.push({
      codigo: "\n" + tabsText + "else",
      filtro: regla.filtro
    });
    arreglo.push({
      codigo: "\n\t" + tabsText + "totalDeposito = arregloDepositos" + idFiltro + "[i].saldo;",
      filtro: regla.filtro
    });
    var factorValor = getFactor(regla.variablePadre);
    arreglo.push({
      codigo: "\n" + tabsText + variable + proyeccion + " += totalDeposito * " + factorValor + ";",
      filtro: regla.filtro
    });
    arreglo.push({
      codigo: "\n" + tabsText + "var temp = totalDeposito * " + factorValor + ";",
      filtro: regla.filtro
    });

    if (calcularDepoPresta) {
      arreglo.push({
        codigo: "\n\t" + tabsText + "insertAccount(arregloDepositos" + idFiltro + "[i], false, " + proyeccion + ", 2, temp, '" + (variable + proyeccion) + "', " + posProyeccion + ");",
        filtro: regla.filtro
      });
    }

    if (calcularContables) {
      arreglo.push({
        codigo: "\n\t" + tabsText + "insertVarContable(arregloDepositos" + idFiltro + "[i].moneda, 2, arregloDepositos" + idFiltro + "[i], " + proyeccion + ", temp, " + posProyeccion + ");",
        filtro: regla.filtro
      });
    }

    if (calcularClientes) {
      arreglo.push({
        codigo: "\n\t" + tabsText + "insertCliente(arregloDepositos" + idFiltro + "[i].moneda, arregloDepositos" + idFiltro + "[i], false, " + proyeccion + ", 2, '" + (variable + proyeccion) + "', temp, " + posProyeccion + ");",
        filtro: regla.filtro
      });
    }

    arreglo.push({
      codigo: "\n" + tabsText + "sumarSaldoOriginal(arregloDepositos" + idFiltro + "[i].saldo, " + posProyeccion + ", " + posVariable + ", " + posSubVariable + ", -1, arregloDepositos" + idFiltro + "[i].moneda.toLowerCase(), '');",
      filtro: regla.filtro
    });
  } else if (regla.campoObjetivo.indexOf('mayorFOSEDE') == 0) {
    noAgregarFactor = true;
    arreglo.push({
      codigo: tabsText + "var montoFosede = getMontoFOSEDE(arregloDepositos" + idFiltro + "[i].moneda);",
      filtro: regla.filtro
    });
    arreglo.push({
      codigo: "\n" + tabsText + "if ( arregloDepositos" + idFiltro + "[i].saldo > montoFosede ) {",
      filtro: regla.filtro
    });
    arreglo.push({
      codigo: "\n" + tabsText + "\tvar totalDeposito = arregloDepositos" + idFiltro + "[i].saldo - montoFosede;",
      filtro: regla.filtro
    });
    var factorValor = getFactor(regla.variablePadre);
    arreglo.push({
      codigo: "\n\t" + tabsText + (variable + proyeccion) + " += totalDeposito * " + factorValor + ";",
      filtro: regla.filtro
    });
    arreglo.push({
      codigo: "\n\t" + tabsText + "var temp = totalDeposito * " + factorValor + ";",
      filtro: regla.filtro
    });

    if (calcularDepoPresta) {
      arreglo.push({
        codigo: "\n\t" + tabsText + "insertAccount(arregloDepositos" + idFiltro + "[i], false, " + proyeccion + ", 2, temp, '" + (variable + proyeccion) + "', " + posProyeccion + ");",
        filtro: regla.filtro
      });
    }

    if (calcularContables) {
      arreglo.push({
        codigo: "\n\t" + tabsText + "insertVarContable(arregloDepositos" + idFiltro + "[i].moneda, 2, arregloDepositos" + idFiltro + "[i], " + proyeccion + ", temp, " + posProyeccion + ");",
        filtro: regla.filtro
      });
    }

    if (calcularClientes) {
      arreglo.push({
        codigo: "\n\t" + tabsText + "insertCliente(arregloDepositos" + idFiltro + "[i].moneda, arregloDepositos" + idFiltro + "[i], false, " + proyeccion + ", 2, '" + (variable + proyeccion) + "', temp, " + posProyeccion + ");",
        filtro: regla.filtro
      });
    }

    arreglo.push({
      codigo: "\n\t" + tabsText + "sumarSaldoOriginal(arregloDepositos" + idFiltro + "[i].saldo, " + posProyeccion + ", " + posVariable + ", " + posSubVariable + ", -1, arregloDepositos" + idFiltro + "[i].moneda.toLowerCase(), '');",
      filtro: regla.filtro
    });
    arreglo.push({
      codigo: "\n" + tabsText + "}",
      filtro: regla.filtro
    });
  } else if (regla.campoObjetivo.indexOf('CONCUENTAS') == 0) {
    noAgregarFactor = true;

    if (regla.campoObjetivo.split("=")[1].localeCompare('hastaFOSEDE') == 0) {
      arreglo.push({
        codigo: tabsText + "var totalDeposito = conCuentasHastaFOSEDE(arregloDepositos" + idFiltro + "[i].idCliente);\n",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n" + tabsText + "var montoFosede = getMontoFOSEDE(arregloDepositos" + idFiltro + "[i].moneda);",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: tabsText + "if ( arregloDepositos" + idFiltro + "[i].saldo > montoFosede && totalDeposito != -1 ) {\n",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: tabsText + "\tif ( totalDeposito > montoFosede)",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n\t\t" + tabsText + "totalDeposito = montoFosede;",
        filtro: regla.filtro
      });
      var factorValor = getFactor(regla.variablePadre);
      arreglo.push({
        codigo: "\n\t" + tabsText + (variable + proyeccion) + " += totalDeposito * " + factorValor + ";",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n\t" + tabsText + "var temp = totalDeposito * " + factorValor + ";",
        filtro: regla.filtro
      });

      if (calcularDepoPresta) {
        arreglo.push({
          codigo: "\n\t" + tabsText + "insertAccount(arregloDepositos" + idFiltro + "[i], false, " + proyeccion + ", 2, temp, '" + (variable + proyeccion) + "', " + posProyeccion + ");",
          filtro: regla.filtro
        });
      }

      if (calcularContables) {
        arreglo.push({
          codigo: "\n\t" + tabsText + "insertVarContable(arregloDepositos" + idFiltro + "[i].moneda, 2, arregloDepositos" + idFiltro + "[i], " + proyeccion + ", temp, " + posProyeccion + ");",
          filtro: regla.filtro
        });
      }

      if (calcularClientes) {
        arreglo.push({
          codigo: "\n\t" + tabsText + "insertCliente(arregloDepositos" + idFiltro + "[i].moneda, arregloDepositos" + idFiltro + "[i], false, " + proyeccion + ", 2, '" + (variable + proyeccion) + "', temp, " + posProyeccion + ");",
          filtro: regla.filtro
        });
      }

      arreglo.push({
        codigo: "\n\t" + tabsText + "sumarSaldoOriginal(arregloDepositos" + idFiltro + "[i].saldo, " + posProyeccion + ", " + posVariable + ", " + posSubVariable + ", -1, arregloDepositos" + idFiltro + "[i].moneda.toLowerCase(), '');",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n" + tabsText + "}",
        filtro: regla.filtro
      });
    } else if (regla.campoObjetivo.split("=")[1].localeCompare('mayorFOSEDE') == 0) {
      arreglo.push({
        codigo: tabsText + "var totalDeposito = conCuentasMayorFOSEDE(arregloDepositos" + idFiltro + "[i].idCliente);\n",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n" + tabsText + "var montoFosede = getMontoFOSEDE(arregloDepositos" + idFiltro + "[i].moneda);",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: tabsText + "if ( arregloDepositos" + idFiltro + "[i].saldo > montoFosede && totalDeposito != -1 ) {\n",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: tabsText + "\tif ( totalDeposito > montoFosede) {",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n\t\t" + tabsText + "totalDeposito = totalDeposito - montoFosede;",
        filtro: regla.filtro
      });
      var factorValor = getFactor(regla.variablePadre);
      arreglo.push({
        codigo: "\n\t\t" + tabsText + (variable + proyeccion) + " += totalDeposito * " + factorValor + ";",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n\t" + tabsText + "var temp = totalDeposito * " + factorValor + ";",
        filtro: regla.filtro
      });

      if (calcularDepoPresta) {
        arreglo.push({
          codigo: "\n\t" + tabsText + "insertAccount(arregloDepositos" + idFiltro + "[i], false, " + proyeccion + ", 2, temp, '" + (variable + proyeccion) + "', " + posProyeccion + ");",
          filtro: regla.filtro
        });
      }

      if (calcularContables) {
        arreglo.push({
          codigo: "\n\t" + tabsText + "insertVarContable(arregloDepositos" + idFiltro + "[i].moneda, 2, arregloDepositos" + idFiltro + "[i], " + proyeccion + ", temp, " + posProyeccion + ");",
          filtro: regla.filtro
        });
      }

      if (calcularClientes) {
        arreglo.push({
          codigo: "\n\t" + tabsText + "insertCliente(arregloDepositos" + idFiltro + "[i].moneda, arregloDepositos" + idFiltro + "[i], false, " + proyeccion + ", 2, '" + (variable + proyeccion) + "', temp, " + posProyeccion + ");",
          filtro: regla.filtro
        });
      }

      arreglo.push({
        codigo: "\n\t" + tabsText + "sumarSaldoOriginal(arregloDepositos" + idFiltro + "[i].saldo, " + posProyeccion + ", " + posVariable + ", " + posSubVariable + ", -1, arregloDepositos" + idFiltro + "[i].moneda.toLowerCase(), '');",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n\t" + tabsText + "}",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n" + tabsText + "}",
        filtro: regla.filtro
      });
    }
  } else if (regla.campoObjetivo.indexOf('SINCUENTAS') == 0) {
    noAgregarFactor = true;

    if (regla.campoObjetivo.split("=")[1].localeCompare('hastaFOSEDE') == 0) {
      arreglo.push({
        codigo: tabsText + "var totalDeposito = sinCuentasHastaFOSEDE(arregloDepositos" + idFiltro + "[i].idCliente);\n",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n" + tabsText + "var montoFosede = getMontoFOSEDE(arregloDepositos" + idFiltro + "[i].moneda);",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: tabsText + "if ( arregloDepositos" + idFiltro + "[i].saldo > montoFosede && totalDeposito != -1 ) {\n",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: tabsText + "\tif ( totalDeposito > montoFosede)",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n\t\t" + tabsText + "totalDeposito = montoFosede;",
        filtro: regla.filtro
      });
      var factorValor = getFactor(regla.variablePadre);
      arreglo.push({
        codigo: "\n\t" + tabsText + (variable + proyeccion) + " += totalDeposito * " + factorValor + ";",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n\t" + tabsText + "var temp = totalDeposito * " + factorValor + ";",
        filtro: regla.filtro
      });

      if (calcularDepoPresta) {
        arreglo.push({
          codigo: "\n\t" + tabsText + "insertAccount(arregloDepositos" + idFiltro + "[i], false, " + proyeccion + ", 2, temp, '" + (variable + proyeccion) + "', " + posProyeccion + ");",
          filtro: regla.filtro
        });
      }

      if (calcularContables) {
        arreglo.push({
          codigo: "\n\t" + tabsText + "insertVarContable(arregloDepositos" + idFiltro + "[i].moneda, 2, arregloDepositos" + idFiltro + "[i], " + proyeccion + ", temp, " + posProyeccion + ");",
          filtro: regla.filtro
        });
      }

      if (calcularClientes) {
        arreglo.push({
          codigo: "\n\t" + tabsText + "insertCliente(arregloDepositos" + idFiltro + "[i].moneda, arregloDepositos" + idFiltro + "[i], false, " + proyeccion + ", 2, '" + (variable + proyeccion) + "', temp, " + posProyeccion + ");",
          filtro: regla.filtro
        });
      }

      arreglo.push({
        codigo: "\n\t" + tabsText + "sumarSaldoOriginal(arregloDepositos" + idFiltro + "[i].saldo, " + posProyeccion + ", " + posVariable + ", " + posSubVariable + ", -1, arregloDepositos" + idFiltro + "[i].moneda.toLowerCase(), '');",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n" + tabsText + "}",
        filtro: regla.filtro
      });
    } else if (regla.campoObjetivo.split("=")[1].localeCompare('mayorFOSEDE') == 0) {
      arreglo.push({
        codigo: tabsText + "var totalDeposito = sinCuentasMayorFOSEDE(arregloDepositos" + idFiltro + "[i].idCliente);\n",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n" + tabsText + "var montoFosede = getMontoFOSEDE(arregloDepositos" + idFiltro + "[i].moneda);",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: tabsText + "if ( arregloDepositos" + idFiltro + "[i].saldo > montoFosede && totalDeposito != -1 ) {\n",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: tabsText + "\tif ( totalDeposito > montoFosede) {",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n\t\t" + tabsText + "totalDeposito = totalDeposito - montoFosede;",
        filtro: regla.filtro
      });
      var factorValor = getFactor(regla.variablePadre);
      arreglo.push({
        codigo: "\n\t\t" + tabsText + (variable + proyeccion) + " += totalDeposito * " + factorValor + ";",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n\t\t" + tabsText + "var temp = totalDeposito * " + factorValor + ";",
        filtro: regla.filtro
      });

      if (calcularDepoPresta) {
        arreglo.push({
          codigo: "\n\t\t" + tabsText + "insertAccount(arregloDepositos" + idFiltro + "[i], false, " + proyeccion + ", 2, temp, '" + (variable + proyeccion) + "', " + posProyeccion + ");",
          filtro: regla.filtro
        });
      }

      if (calcularContables) {
        arreglo.push({
          codigo: "\n\t\t" + tabsText + "insertVarContable(arregloDepositos" + idFiltro + "[i].moneda, 2, arregloDepositos" + idFiltro + "[i], " + proyeccion + ", temp, " + posProyeccion + ");",
          filtro: regla.filtro
        });
      }

      if (calcularClientes) {
        arreglo.push({
          codigo: "\n\t\t" + tabsText + "insertCliente(arregloDepositos" + idFiltro + "[i].moneda, arregloDepositos" + idFiltro + "[i], false, " + proyeccion + ", 2, '" + (variable + proyeccion) + "', temp, " + posProyeccion + ");",
          filtro: regla.filtro
        });
      }

      arreglo.push({
        codigo: "\n\t\t" + tabsText + "sumarSaldoOriginal(arregloDepositos" + idFiltro + "[i].saldo, " + posProyeccion + ", " + posVariable + ", " + posSubVariable + ", -1, arregloDepositos" + idFiltro + "[i].moneda.toLowerCase(), '');",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n\t" + tabsText + "}",
        filtro: regla.filtro
      });
      arreglo.push({
        codigo: "\n" + tabsText + "}",
        filtro: regla.filtro
      });
    }
  }

  if (regla.valor.indexOf('LISTA') == 0) {
    if (esCondicion) {
      var arregloLista = regla.valor.split("=")[1].split(",");
      var copiaRegla = $.extend(true, {}, arreglo);
      var tamArreglo = arreglo.length;

      if (regla.operacion == "no") {
        for (var j = 0; j < tamArreglo; j++) {
          for (var i = 0; i < arregloLista.length; i++) {
            if (i == 0) {
              var textoFinal = ' != 0 ';
              if (i + 1 == arregloLista.length) textoFinal += " ) {";
              var campo = regla.campoObjetivo.split("=")[1];
              var valor = getListValue(arregloLista[i], campo);
              arreglo[j].codigo += valor + "')" + textoFinal;
            } else {
              var textoFinal = ' != 0 ';
              if (i + 1 == arregloLista.length) textoFinal += " ) {";
              var campo = regla.campoObjetivo.split("=")[1];
              var valor = getListValue(arregloLista[i], campo);
              arreglo[j].codigo += " && " + copiaRegla[j].codigo.split(" ( ")[1] + valor + "')" + textoFinal;
            }
          }
        }

        ;
      } else {
        for (var j = 0; j < tamArreglo; j++) {
          for (var i = 0; i < arregloLista.length; i++) {
            if (i == 0) {
              var textoFinal = ' == 0 ';
              if (i + 1 == arregloLista.length) textoFinal += " ) {";
              var campo = regla.campoObjetivo.split("=")[1];
              var valor = getListValue(arregloLista[i], campo);
              arreglo[j].codigo += valor + "')" + textoFinal;
            } else {
              var textoFinal = ' == 0 ';
              if (i + 1 == arregloLista.length) textoFinal += " ) {";
              var campo = regla.campoObjetivo.split("=")[1];
              var valor = getListValue(arregloLista[i], campo);
              arreglo[j].codigo += " || " + copiaRegla[j].codigo.split(" ( ")[1] + valor + "')" + textoFinal;
            }
          }
        }

        ;
      }
    }
  } else if (regla.valor.indexOf('FACTOR') == 0 && !noAgregarFactor) {
    if (esCondicion) {
      //var factorValor = parseInt(regla.valor.split("=")[1]);
      var factorValor = getFactor(regla.variablePadre);

      for (var i = 1; i < arreglo.length; i++) {
        arreglo[i].codigo += " " + factorValor + " ) {";
      }

      ;
    } else {
      //var factorValor = regla.valor.split("=")[1];
      var factorValor = getFactor(regla.variablePadre);

      for (var i = 1; i < arreglo.length; i++) {
        arreglo[i].codigo += " " + factorValor + ";";
      }

      ;
      arreglo.push({
        codigo: "\n\t" + tabsText + "var  temp = arregloDepositos" + idFiltro + "[i].saldo * " + factorValor + ";",
        filtro: regla.filtro
      });

      if (calcularDepoPresta) {
        arreglo.push({
          codigo: "\n" + tabsText + "insertAccount(arregloDepositos" + idFiltro + "[i], false, " + proyeccion + ", " + 2 + ", temp, '" + (variable + proyeccion) + "', " + posProyeccion + ");",
          filtro: regla.filtro
        });
      }

      if (calcularContables) {
        arreglo.push({
          codigo: "\n" + tabsText + "insertVarContable(arregloDepositos" + idFiltro + "[i].moneda, 2, arregloDepositos" + idFiltro + "[i], " + proyeccion + ", temp, " + posProyeccion + ");",
          filtro: regla.filtro
        });
      }

      if (calcularClientes) {
        arreglo.push({
          codigo: "\n" + tabsText + "insertCliente(arregloDepositos" + idFiltro + "[i].moneda, arregloDepositos" + idFiltro + "[i], false, " + proyeccion + ", 2, '" + (variable + proyeccion) + "', temp, " + posProyeccion + ");",
          filtro: regla.filtro
        });
      }
    }
  } else if (regla.valor.indexOf('COLUMNA') == 0) {
    if (esCondicion) {
      var columnaValor = regla.valor.split("=")[1];

      for (var i = 0; i < arreglo.length; i++) {
        arreglo[i].codigo += " " + columnaValor + " ) {";
      }

      ;
    } else {
      var columnaValor = regla.valor.split("=")[1];
      arreglo[arreglo.length - 1].codigo += " " + columnaValor + ";";
      /*for (var i = 0; i < arreglo.length; i++) {
          arreglo[i] += " "+columnaValor + ";";
      };*/
    }
  } else if (regla.valor.indexOf('FECHA') == 0 && !noAgregarFecha) {
    if (esCondicion) {
      for (var i = 0; i < arreglo.length; i++) {
        arreglo[i].codigo += " " + proyeccion + " ) {";
      }

      ;
    } else {
      var columnaValor = regla.valor.split("=")[1];

      for (var i = 0; i < arreglo.length; i++) {
        arreglo[i].codigo += " " + proyeccion + ";";
      }

      ;
    }
  }

  var cuerpo = arregloReglas.filter(function (object) {
    return object.reglaPadre == regla.ID;
  });

  if (cuerpo.length > 0) {
    var arregloCuerpo = [];

    for (var i = 0; i < cuerpo.length; i++) {
      var cuantasTabs = tabs;
      if (esCondicion) cuantasTabs++;
      var retorno = campoObjetivoDepositos(cuerpo[i], [], cuantasTabs, variable, proyeccion, posProyeccion, posVariable, posSubVariable);
      retorno[0].codigo = "\n" + retorno[0].codigo;
      $.merge(arregloCuerpo, retorno);
    }

    ;

    for (var i = 0; i < posicionesIF.length; i++) {
      arreglo.splice.apply(arreglo, [posicionesIF[i], 0].concat(arregloCuerpo));
      if (esCondicion) arreglo.splice(posicionesIF[i] + arregloCuerpo.length, 0, {
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
    if (esCondicion) {
      for (var i = 0; i < posicionesIF.length; i++) {
        arreglo.splice(posicionesIF[i], 0, {
          codigo: "\n" + tabsText + "}",
          filtro: regla.filtro
        });
      }

      ;
    }

    return arreglo;
  }
}
//# sourceMappingURL=CalculoVariablesWorker.js.map
