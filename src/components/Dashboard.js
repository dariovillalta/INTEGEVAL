import React from 'react';
import sql from 'mssql';

/*import EditarVariable from './EditarVariable.js';*/

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componenteActual: "selVariables"
        }
        /*this.goCreateFilters = this.goCreateFilters.bind(this);
        this.returnChooseDates = this.returnChooseDates.bind(this);*/
    }

    /*componentDidMount () {
        //
    }*/

    //PROCESO ES:
        /*1) SE SELECCIONA UNA VARIABLE
        2) SE APLICAN FILTROS
        3) REPETIR HASTA PRESIONAR VISUALIZAR*/

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

    render() {
        return (
            <div>
            </div>
        );
    }
}
