import React from 'react';
import sql from 'mssql';

import FuenteDatoVariable from './FuenteDatoVariable.js';
import FuenteDatoForma from './FuenteDatoForma.js';
import FuenteDatoExcel from './FuenteDatoExcel.js';

var mostrarFuenteDatoVariableGlobal = false;
var mostrarFuenteDatoFormaGlobal = false;
var mostrarFuenteDatoExcelGlobal = false;

/*COMPONENTE QUE CONTROLA TIPOS DE VARIABLES (EXCEL, FORMA, VARIABLE)*/

export default class CrearVariable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarFuenteDatoVariable: mostrarFuenteDatoVariableGlobal,
            mostrarFuenteDatoForma: mostrarFuenteDatoFormaGlobal,
            mostrarFuenteDatoExcel: mostrarFuenteDatoExcelGlobal
        }
        this.mostrarFuenteDatoVariable = this.mostrarFuenteDatoVariable.bind(this);
        this.mostrarFuenteDatoForma = this.mostrarFuenteDatoForma.bind(this);
        this.mostrarFuenteDatoExcel = this.mostrarFuenteDatoExcel.bind(this);
    }

    mostrarFuenteDatoVariable () {
        mostrarFuenteDatoVariableGlobal = true;
        mostrarFuenteDatoFormaGlobal = false;
        mostrarFuenteDatoExcelGlobal = false;
        this.setState({
            mostrarFuenteDatoVariable: true,
            mostrarFuenteDatoForma: false,
            mostrarFuenteDatoExcel: false
        });
    }

    mostrarFuenteDatoForma () {
        mostrarFuenteDatoVariableGlobal = false;
        mostrarFuenteDatoFormaGlobal = true;
        mostrarFuenteDatoExcelGlobal = false;
        this.setState({
            mostrarFuenteDatoVariable: false,
            mostrarFuenteDatoForma: true,
            mostrarFuenteDatoExcel: false
        });
    }

    mostrarFuenteDatoExcel () {
        mostrarFuenteDatoVariableGlobal = false;
        mostrarFuenteDatoFormaGlobal = false;
        mostrarFuenteDatoExcelGlobal = true;
        this.setState({
            mostrarFuenteDatoVariable: false,
            mostrarFuenteDatoForma: false,
            mostrarFuenteDatoExcel: true
        });
    }

    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Crear Variable</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goOptions}><a href="#" className={"breadcrumb-link"}>Tipo de Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionVariables}><a href="#" className={"breadcrumb-link"}>Variables</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Crear Variable</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card"}>
                                <div className={"border-top"} style={{width: "100%"}}>
                                    {
                                        this.state.mostrarFuenteDatoVariable
                                        ?
                                            <FuenteDatoVariable pool={this.props.pool} campos={this.props.columnas}
                                                                goToCreateConditions={this.props.goToCreateConditions}
                                                                goCreateVariableFieldSQL={this.props.goCreateVariableFieldSQL}
                                                                guardarVariable={this.props.guardarVariable}
                                                                crearAtributoVariable={this.props.crearAtributoVariable}
                                                                eliminarAtributoVariable={this.props.eliminarAtributoVariable}
                                                                modificarNombreVariable={this.props.modificarNombreVariable}
                                                                cambioDeArreglosDeAtributos={this.props.cambioDeArreglosDeAtributos}
                                                                idFormula={this.props.idFormula}
                                                                nombreVariable={this.props.nombreVariable}
                                                                actualizarIdFormula={this.props.actualizarIdFormula}
                                                                actualizarNombreVariable={this.props.actualizarNombreVariable}
                                                                actualizarEstadoSiEsObjeto={this.props.actualizarEstadoSiEsObjeto}
                                                                actualizarEstadoSiEsInstruccionSQL={this.props.actualizarEstadoSiEsInstruccionSQL}
                                                                descripcionVariable={this.props.descripcionVariable}
                                                                actualizarDescripcionVariable={this.props.actualizarDescripcionVariable}
                                                                nombreCampoNuevoAtributosVario={this.props.nombreCampoNuevoAtributosVario}
                                                                tipoNuevaVariable={this.props.tipoNuevaVariable}
                                                                actualizarNombreCampoNuevoAtributosVario={this.props.actualizarNombreCampoNuevoAtributosVario}
                                                                atributos={this.props.atributos}
                                                                actualizarFechaInicio={this.props.actualizarFechaInicio}
                                                                actualizarPeriodicidad={this.props.actualizarPeriodicidad}
                                                                actualizarNombreEncargado={this.props.actualizarNombreEncargado}
                                                                actualizarCategoriaVariable={this.props.actualizarCategoriaVariable}
                                                                fechaInicioVariable={this.props.fechaInicioVariable}
                                                                periodicidadVariable={this.props.periodicidadVariable}
                                                                responsableVariable={this.props.responsableVariable}
                                                                categoriaVariable={this.props.categoriaVariable}>
                                            </FuenteDatoVariable>
                                        : null
                                    }
                                    {
                                        this.state.mostrarFuenteDatoForma
                                        ?
                                            <FuenteDatoForma pool={this.props.pool}
                                                                getFormas={this.props.getFormas}
                                                                showSuccesMessage={this.props.showSuccesMessage}
                                                                showMessage={this.props.showMessage}>
                                            </FuenteDatoForma>
                                        : null
                                    }
                                    {
                                        this.state.mostrarFuenteDatoExcel
                                        ?
                                            <FuenteDatoExcel pool={this.props.pool}
                                                                getExcel={this.props.getExcel}
                                                                showSuccesMessage={this.props.showSuccesMessage}
                                                                showMessage={this.props.showMessage}>
                                            </FuenteDatoExcel>
                                        : null
                                    }
                                </div>
                                <div className={"border-bottom"} style={{width: "100%", height: "30px", overflowX: "scroll"}}>
                                    <div onClick={this.mostrarFuenteDatoExcel} className={"border-right addPointer"} style={{width: "33%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", float: "left", backgroundColor: !this.state.mostrarFuenteDatoExcel ? "#f5f5f5" : "" }}>
                                        Excel
                                    </div>
                                    <div onClick={this.mostrarFuenteDatoForma} className={"border-right addPointer"} style={{width: "33%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", float: "left", backgroundColor: !this.state.mostrarFuenteDatoForma ? "#f5f5f5" : "" }}>
                                        Forma
                                    </div>
                                    <div onClick={this.mostrarFuenteDatoVariable} className={"addPointer"} style={{width: "34%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", float: "left", backgroundColor: !this.state.mostrarFuenteDatoVariable ? "#f5f5f5" : "" }}>
                                        Variable
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
