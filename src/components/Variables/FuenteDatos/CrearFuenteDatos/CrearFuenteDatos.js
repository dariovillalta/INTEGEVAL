import React from 'react';
import sql from 'mssql';

import FuenteDatoVariable from './FuenteDatoVariable.js';
import FuenteDatoForma from './FuenteDatoForma.js';
import FuenteDatoExcel from './FuenteDatoExcel.js';

export default class CrearFuenteDatos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarFuenteDatoVariable: false,
            mostrarFuenteDatoForma: false,
            mostrarFuenteDatoExcel: true
        }
        this.mostrarFuenteDatoVariable = this.mostrarFuenteDatoVariable.bind(this);
        this.mostrarFuenteDatoForma = this.mostrarFuenteDatoForma.bind(this);
        this.mostrarFuenteDatoExcel = this.mostrarFuenteDatoExcel.bind(this);
    }

    mostrarFuenteDatoVariable () {
        this.setState({
            mostrarFuenteDatoVariable: true,
            mostrarFuenteDatoForma: false,
            mostrarFuenteDatoExcel: false
        });
    }

    mostrarFuenteDatoForma () {
        this.setState({
            mostrarFuenteDatoVariable: false,
            mostrarFuenteDatoForma: true,
            mostrarFuenteDatoExcel: false
        });
    }

    mostrarFuenteDatoExcel () {
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
                            <h2 className={"pageheader-title"}>Crear Fuente de Datos</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goOptions}><a href="#" className={"breadcrumb-link"}>Tipo de Variable</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionTabla}><a href="#" className={"breadcrumb-link"}>Tablas</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionFuenteDatos}><a href="#" className={"breadcrumb-link"}>Fuentes de Datos</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Crear Fuente de Datos</li>
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
                                            <FuenteDatoVariable campos={this.props.columnas} goToCreateConditions={this.props.goToCreateConditions}>
                                            </FuenteDatoVariable>
                                        : null
                                    }
                                    {
                                        this.state.mostrarFuenteDatoForma
                                        ?
                                            <FuenteDatoForma>
                                            </FuenteDatoForma>
                                        : null
                                    }
                                    {
                                        this.state.mostrarFuenteDatoExcel
                                        ?
                                            <FuenteDatoExcel>
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
