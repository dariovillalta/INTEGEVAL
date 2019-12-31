import React from 'react';

import CrearFuenteDatos from './CrearFuenteDatos.js';
import CondicionVariable from '../../../CondicionVariable.js';

var campo;

export default class CrearFuenteDatosHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componenteActual: 'crearFuente',
            reglas: [],
            navbar: ""
        }
        this.returnToCreateDataSource = this.returnToCreateDataSource.bind(this);
        this.goToCreateConditions = this.goToCreateConditions.bind(this);
        this.createDataSource = this.createDataSource.bind(this);
        this.getDataSourceID = this.getDataSourceID.bind(this);
        this.goToCreateConditions = this.goToCreateConditions.bind(this);
    }

    componentDidMount () {
    }

    returnToCreateDataSource () {
        this.setState({
            componenteActual: "crearFuente"
        });
    }

    goToCreateConditions () {
        var navbar = <div className={"row"}>
            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                <div className={"page-header"}>
                    <h2 className={"pageheader-title"}>Condiciones</h2>
                    <div className={"page-breadcrumb"}>
                        <nav aria-label="breadcrumb">
                            <ol className={"breadcrumb"}>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goOptions}><a href="#" className={"breadcrumb-link"}>Tipo de Variable</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionTabla}><a href="#" className={"breadcrumb-link"}>Tablas</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.retornoSeleccionFuenteDatos}><a href="#" className={"breadcrumb-link"}>Fuentes de Datos</a></li>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.returnToCreateDataSource}><a href="#" className={"breadcrumb-link"}>Crear Fuente de Datos</a></li>
                                <li className={"breadcrumb-item active font-16"} aria-current="page">Condiciones</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>;
        this.setState({
            componenteActual: "fuenteCondiciones",
            navbar: navbar
        });
    }

    createDataSource (fuenteDato, atributoFuenteDato) {
        //validaciones existe por lo menos regla asignar
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into FuenteDatos (tablaID, nombre, descripcion, esObjeto, guardar, nivel) values ("+this.props.idTablaSeleccionada+", '"+fuenteDato.nombre+"', '"+fuenteDato.descripcion+"', '"+fuenteDato.esObjeto+"', "+fuenteDato.objetoPadreID+", '"+fuenteDato.guardar+"', 0)", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.props.getDataSourceID(atributoFuenteDato);
                    });
                }
            });
        }); // fin transaction
    }

    getDataSourceID (fuenteDato, atributoFuenteDato) {
        //validaciones existe por lo menos regla asignar
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into Campos (tablaID, nombre, tipo, guardar, formula, nivel) values ("+this.props.idTablaSeleccionada+", '"+nombre+"', '"+tipo+"', '"+guardar+"', '"+formula+"', "+nivel+")", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.props.terminoCrearCampo(nombre);
                    });
                }
            });
        }); // fin transaction
    }

    retornarCampo (campoNuevo) {
        campo = campoNuevo;
    }

    anadirRegla () {
        var operacion = $("input[name='operacionRadio']:checked").val();
        var valor = $("#valor").val();
        console.log('operacion');
        console.log(operacion);
        console.log('valor');
        console.log(valor);
        console.log('campo');
        console.log(campo);
        var copiaAntiguaReglas = [...this.state.reglas];
        var nuevaRegla = {campo: campo.valor, operacion: operacion, valor: valor};
        copiaAntiguaReglas.push();
    }
    
    render() {
        if(this.state.componenteActual.localeCompare("crearFuente") == 0) {
            return (
                <div style={{width: "100%", height: "100%"}}>
                    <CrearFuenteDatos pool={this.props.pool} showCondicionVar={this.props.showCondicionVar}
                                                terminoCrearCampo={this.props.terminoCrearCampo}
                                                idTablaSeleccionada={this.props.idTablaSeleccionada}
                                                columnas={this.props.columnas}
                                                configuracionHome={this.props.configuracionHome}
                                                goOptions={this.props.goOptions}
                                                retornoSeleccionTabla={this.props.retornoSeleccionTabla}
                                                retornoSeleccionFuenteDatos={this.props.retornoSeleccionFuenteDatos}
                                                goToCreateConditions={this.goToCreateConditions}>
                    </CrearFuenteDatos>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("fuenteCondiciones") == 0) {
            return (
                <div style={{width: "100%", height: "100%"}}>
                    <CondicionVariable pool={this.props.pool} retornarCampo={this.retornarCampo}
                                                campos={this.props.columnas}
                                                camposDropdown={[{valor: this.props.nombreTablaSeleccionada}]}
                                                valoresDropdown={this.props.columnas}
                                                callbackCrearRegla={this.anadirRegla}
                                                navbar={this.state.navbar}
                                                configuracionHome={this.props.configuracionHome}
                                                goOptions={this.props.goOptions}
                                                retornoSeleccionTabla={this.props.retornoSeleccionTabla}
                                                retornoSeleccionFuenteDatos={this.props.retornoSeleccionFuenteDatos}>
                    </CondicionVariable>
                </div>
            );
        }
    }
}
