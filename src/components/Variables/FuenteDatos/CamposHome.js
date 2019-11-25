import React from 'react';
import sql from 'mssql';

import SeleccionarFuenteDatos from './SeleccionarFuenteDatos.js';
import CrearFuenteDatos from './CrearFuenteDatos.js';
import EditarFuenteDatos from './EditarFuenteDatos.js';

var isMounted = false;

export default class FuenteDatosHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componenteActual: "selFuenteDatos",
            idFuenteDatos: -1,
            nombreFuenteDatos: "",
            descripcionFuenteDatos: "",
            formulaFuenteDatos: "",
            esObjetoFuenteDatos: "",
            objetoPadreIDFuenteDatos: -1,
            nivelFuenteDatos: -1
        }
        this.crearFuenteDatos = this.crearFuenteDatos.bind(this);
        this.retornoSeleccionFuenteDatosSameComponent = this.retornoSeleccionFuenteDatosSameComponent.bind(this);
        this.retornoSeleccionFuenteDatosDiffComponent = this.retornoSeleccionFuenteDatosDiffComponent.bind(this);
        this.editarFuenteDatos = this.editarFuenteDatos.bind(this);
        this.retornoEditarFuenteDatos = this.retornoEditarFuenteDatos.bind(this);
        this.terminoCrearFuenteDatosPasarAEdit = this.terminoCrearFuenteDatosPasarAEdit.bind(this);
    }

    componentDidMount() {
        isMounted = true;
    }
    componentWillUnmount() {
        isMounted = false;
    }

    crearFuenteDatos () {
        this.setState({
            componenteActual: "crearFuenteDatos"
        });
    }

    retornoSeleccionFuenteDatosSameComponent () {
        this.setState({
            componenteActual: "selFuenteDatos",
            idFuenteDatos: -1,
            nombreFuenteDatos: "",
            descripcionFuenteDatos: "",
            formulaFuenteDatos: "",
            esObjetoFuenteDatos: "",
            objetoPadreIDFuenteDatos: -1,
            nivelFuenteDatos: -1
        });
    }

    retornoSeleccionFuenteDatosDiffComponent () {
        this.props.showRiesgos();
        var self = this;
        setTimeout(function(){
            self.setState({
                idRiesgoSeleccionado: -1,
                componenteActual: "selFuenteDatos"
            });
        }, 500);
    }

    editarFuenteDatos (idFuenteDatos, nombreFuenteDatos, descripcionFuenteDatos, formulaFuenteDatos, esObjetoFuenteDatos, objetoPadreIDFuenteDatos, nivelFuenteDatos) {
        this.setState({
            idRiesgoSeleccionado: id,
            componenteActual: "editarFuenteDatos",
            nombreRiesgo: nombreRiesgo,
            pesoRiesgo: pesoRiesgo,
            toleranciaRiesgo: toleranciaRiesgo,
            valorIdealRiesgo: valorIdealRiesgo,
            padreRiesgo: padreRiesgo
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
            request.query("select * from Variables where nombre = '"+nombreFuenteDatos+"'", (err, result) => {
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
                                this.editarFuenteDatos(result.recordset[0].ID, result.recordset[0].nombre, result.recordset[0].peso, result.recordset[0].tolerancia, result.recordset[0].valorIdeal, result.recordset[0].idRiesgoPadre);
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
                    <SeleccionarFuenteDatos configuracionHome={this.props.configuracionHome} crearFuenteDatos={this.crearFuenteDatos} editarFuenteDatos={this.editarFuenteDatos}> </SeleccionarFuenteDatos>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("crearFuenteDatos") == 0) {
            return (
                <div>
                    <CrearFuenteDatos pool={this.props.pool} showCondicionVar={this.props.showCondicionVar} terminoCrearCampo={this.terminoCrearFuenteDatosPasarAEdit} idTablaSeleccionada={this.props.idTablaSeleccionada} nombreTablaSeleccionada={this.props.nombreTablaSeleccionada} configuracionHome={this.props.configuracionHome}> </CrearFuenteDatos>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("editarFuenteDatos") == 0) {
            return (
                <div>
                    <EditarFuenteDatos pool={this.props.pool} showFormula={this.props.showFormula} showCondicionVar={this.props.showCondicionVar} showRiesgos={this.props.showRiesgos} retornoSeleccionRiesgo={this.retornoSeleccionRiesgoSameComponent} retornoSeleccionRiesgoUmbral={this.retornoSeleccionRiesgoDiffComponent} configuracionHome={this.props.configuracionHome} updateNavBar={this.props.updateNavBar} showUmbralHome={this.props.showUmbralHome} riesgos={[]} nombreRiesgo={this.state.nombreRiesgo} pesoRiesgo={this.state.pesoRiesgo} toleranciaRiesgo={this.state.toleranciaRiesgo} valorIdealRiesgo={this.state.valorIdealRiesgo} padreRiesgo={this.state.padreRiesgo} updateFormula={this.props.updateFormula}> </EditarFuenteDatos>
                </div>
            );
        }
    }
}
