import React from 'react';
import sql from 'mssql';

import SeleccionarFuenteDatos from './SeleccionarFuenteDatos.js';
import CrearFuenteDatosHome from './CrearFuenteDatos/CrearFuenteDatosHome.js';
import EditarFuenteDatos from './EditarFuenteDatos/EditarFuenteDatos.js';

var isMounted = false;

export default class FuenteDatosHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componenteActual: "selFuenteDatos",
            idFuenteDatos: -1,
            nombreFuenteDatos: "",
            descripcionFuenteDatos: "",
            esObjetoFuenteDatos: "",
            objetoPadreIDFuenteDatos: -1,
            guardarFuenteDatos: "",
            columnas: []
        }
        this.crearFuenteDatos = this.crearFuenteDatos.bind(this);
        this.retornoSeleccionFuenteDatos = this.retornoSeleccionFuenteDatos.bind(this);
        this.editarFuenteDatos = this.editarFuenteDatos.bind(this);
        this.retornoEditarFuenteDatos = this.retornoEditarFuenteDatos.bind(this);
        this.terminoCrearFuenteDatosPasarAEdit = this.terminoCrearFuenteDatosPasarAEdit.bind(this);
    }

    componentDidMount () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '"+this.props.nombreTablaSeleccionada+"'", (err, result) => {
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
                            nombreColumnas.push({valor: result.recordset[i].COLUMN_NAME, tipo: result.recordset[i].DATA_TYPE});
                        };
                        this.setState({
                            columnas: nombreColumnas
                        });
                    });
                }
            });
        }); // fin transaction
    }

    crearFuenteDatos () {
        this.setState({
            componenteActual: "crearFuenteDatos"
        });
    }

    retornoSeleccionFuenteDatos () {
        this.setState({
            componenteActual: "selFuenteDatos",
            idFuenteDatos: -1,
            nombreFuenteDatos: "",
            descripcionFuenteDatos: "",
            esObjetoFuenteDatos: "",
            objetoPadreIDFuenteDatos: -1,
            guardarFuenteDatos: ""
        });
    }

    editarFuenteDatos (idFuenteDatos, nombreFuenteDatos, descripcionFuenteDatos, esObjetoFuenteDatos, objetoPadreIDFuenteDatos, guardarFuenteDatos) {
        this.setState({
            idFuenteDatos: idFuenteDatos,
            componenteActual: "editarFuenteDatos",
            nombreFuenteDatos: nombreFuenteDatos,
            descripcionFuenteDatos: descripcionFuenteDatos,
            esObjetoFuenteDatos: esObjetoFuenteDatos,
            objetoPadreIDFuenteDatos: objetoPadreIDFuenteDatos,
            guardarFuenteDatos: guardarFuenteDatos
        });
    }

    retornoEditarFuenteDatos () {
        this.props.showRiesgos();
        var self = this;
        if(isMounted) {
            console.log("SI")
        } else {
            console.log("NO")
        }
        setTimeout(function(){
            if(isMounted) {
                console.log("SI")
            } else {
                console.log("NO")
            }
            console.log(self)
            self.setState({
                componenteActual: "editarFuenteDatos"
            });
        }, 3500);
    }

    terminoCrearFuenteDatosPasarAEdit (nombreFuenteDatos) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Campos where nombre = '"+nombreFuenteDatos+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset != undefined) {
                            if(result.recordset.length) {
                                this.editarFuenteDatos(result.recordset[0].ID, result.recordset[0].nombre, result.recordset[0].descripcion, result.recordset[0].esObjeto, result.recordset[0].objetoPadreID, result.recordset[0].guardar);
                            }
                        }
                    });
                }
            });
        }); // fin transaction
    }

    render() {
        if(this.state.componenteActual.localeCompare("selFuenteDatos") == 0) {
            return (
                <div>
                    <SeleccionarFuenteDatos pool={this.props.pool}
                                            configuracionHome={this.props.configuracionHome}
                                            crearFuenteDatos={this.crearFuenteDatos}
                                            goOptions={this.props.goOptions}
                                            retornoSeleccionTabla={this.props.retornoSeleccionTabla}
                                            editarFuenteDatos={this.editarFuenteDatos}>
                    </SeleccionarFuenteDatos>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("crearFuenteDatos") == 0) {
            return (
                <div>
                    <CrearFuenteDatosHome pool={this.props.pool}
                                            showCondicionVar={this.props.showCondicionVar}
                                            terminoCrearCampo={this.terminoCrearFuenteDatosPasarAEdit}
                                            idTablaSeleccionada={this.props.idTablaSeleccionada}
                                            columnas={this.state.columnas}
                                            nombreTablaSeleccionada={this.props.nombreTablaSeleccionada}
                                            goOptions={this.props.goOptions}
                                            retornoSeleccionTabla={this.props.retornoSeleccionTabla}
                                            retornoSeleccionFuenteDatos={this.retornoSeleccionFuenteDatos}
                                            configuracionHome={this.props.configuracionHome}>
                    </CrearFuenteDatosHome>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("editarFuenteDatos") == 0) {
            return (
                <div>
                    <EditarFuenteDatos pool={this.props.pool}
                                    showFormula={this.props.showFormula}
                                    showCondicionVar={this.props.showCondicionVar}
                                    showRiesgos={this.props.showRiesgos}
                                    goOptions={this.props.goOptions}
                                    retornoSeleccionTabla={this.props.retornoSeleccionTabla}
                                    retornoSeleccionFuenteDatos={this.retornoSeleccionFuenteDatos}
                                    retornoSeleccionRiesgo={this.retornoSeleccionRiesgoSameComponent}
                                    retornoSeleccionRiesgoUmbral={this.retornoSeleccionRiesgoDiffComponent}
                                    configuracionHome={this.props.configuracionHome}
                                    updateNavBar={this.props.updateNavBar}
                                    showUmbralHome={this.props.showUmbralHome}
                                    idFuenteDatos={this.state.idFuenteDatos}
                                    nombreFuenteDatos={this.state.nombreFuenteDatos}
                                    descripcionFuenteDatos={this.state.descripcionFuenteDatos}
                                    esObjetoFuenteDatos={this.state.esObjetoFuenteDatos}
                                    objetoPadreIDFuenteDatos={this.state.objetoPadreIDFuenteDatos}
                                    guardarFuenteDatos={this.state.guardarFuenteDatos}
                                    updateFormula={this.props.updateFormula}>
                    </EditarFuenteDatos>
                </div>
            );
        }
    }
}
