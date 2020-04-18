/*var arregloVariables = [];	

	getResultadosVariables () {
		//OBTENER LA LISTA DE POSIBLES VARIABLES A VISUALIZAR
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ResultadosNombreVariables", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                        return [];
                    }
                } else {
                    transaction.commit(err => {
                        var temp = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            temp.push({valor: result.recordset[i].tabla, ID: result.recordset[i].ID});
                        };
                        this.setState({
                            conexiones: temp
                        });
                        conexionesOriginales = temp;
                        this.getFieldsConections();
                    });
                }
            });
        }); // fin transaction
    }

    getFieldsConections () {
        var arregloTemp = [];
        for (var i = 0; i < conexionesOriginales.length; i++) {
            this.getFieldConections(conexionesOriginales[i].valor, i, arregloTemp, conexionesOriginales[i].ID);
        };
    }

    getFieldConections(nombreTabla, index, array, tablaID) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '"+nombreTabla+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var nombreColumnas = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            nombreColumnas.push({valor: result.recordset[i].COLUMN_NAME, tipo: result.recordset[i].DATA_TYPE, tablaID: tablaID});
                        };
                        if(array[index] == undefined) {
                            array[index] = [];
                        }
                        array[index] = $.merge(array[index], nombreColumnas);
                        this.setState({
                            camposConexiones: array
                        });
                        camposConexionesOriginales = array;
                    });
                }
            });
        }); // fin transaction
    }

//PROCESO ES:
	1) SE SELECCIONA UNA VARIABLE
	2) SE APLICAN FILTROS
	3) REPETIR HASTA PRESIONAR VISUALIZAR

getVariableDatos() {
	//OBTENER LOS VALORES DE LAS VARIABLES CALCULADOS
	//EN EL RETORNO DEL RECORDSET CREAR METODO QUE ACEPTE EL ARREGLO, PARA LUEGO APLICAR LOS FILTROS
	//CREAR VARIABLE GLOBAL
}

getDashboard () {
	//ESTE PARTE PUEDE OMMITIRSE CUANDO LA VISUALIZACION SE ESTA CREANDO, ES CUSTOMIZADA
}

getSeccionDashboard () {
	//TRAER CONFIGURACION NECESARIA PARA VISUALIZAR LA INFORMACION
		//TIPO DE GRAFICO
		//ARREGLO A VISUALIZAR
		//TAMAÑO
		//CREAR HTML
		//CREAR JS
}

//CADA DASHBOARD ES UN SEGMENTO DE LA PAGINA, ESTA DIVIDIDO POR SECCIONES QUE REPRESENTAN EL ESPACIO PARA LA GRAFICA

*/
"use strict";
//# sourceMappingURL=Filtro.js.map
