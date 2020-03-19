import React from 'react';
import sql from 'mssql';

import SeleccionarRiesgo from './SeleccionarRiesgo.js';
import CrearRiesgo from './CrearRiesgo.js';
import EditarRiesgo from './EditarRiesgo.js';

var isMounted = false;

export default class RiesgoHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            riesgos: [],
            pesoDisponible: 0,
            idRiesgoSeleccionado: -1,
            componenteActual: "selRiesgo"
        }
        this.getRiesgos = this.getRiesgos.bind(this);
        this.acutalizarPesoMaximoDisponible = this.acutalizarPesoMaximoDisponible.bind(this);
        this.crearRiesgo = this.crearRiesgo.bind(this);
        this.retornoSeleccionRiesgoSameComponent = this.retornoSeleccionRiesgoSameComponent.bind(this);
        this.retornoSeleccionRiesgoDiffComponent = this.retornoSeleccionRiesgoDiffComponent.bind(this);
        this.editarRiesgo = this.editarRiesgo.bind(this);
        this.retornoEditarRiesgo = this.retornoEditarRiesgo.bind(this);
        this.terminoCrearRiesgoPasarAEdit = this.terminoCrearRiesgoPasarAEdit.bind(this);
    }

    componentDidMount() {
        isMounted = true;
        this.getRiesgos();
    }

    getRiesgos () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Riesgos", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            riesgos: result.recordset
                        }, this.acutalizarPesoMaximoDisponible );
                    });
                }
            });
        }); // fin transaction
    }

    acutalizarPesoMaximoDisponible () {
        var pesoInstitucional = 100;
        var pesoExistente = 0;
        for (var i = 0; i < this.state.riesgos.length; i++) {
            pesoExistente += this.state.riesgos[i].peso;
        };
        console.log('pesoInstitucional');
        console.log(pesoInstitucional);
        console.log('pesoExistente');
        console.log(pesoExistente);
        this.setState({
            pesoDisponible: pesoInstitucional-pesoExistente
        });
    }

    componentWillUnmount() {
        isMounted = false;
    }

    crearRiesgo () {
        this.setState({
            componenteActual: "crearRiesgo"
        });
    }

    retornoSeleccionRiesgoSameComponent () {
        this.setState({
            idRiesgoSeleccionado: -1,
            componenteActual: "selRiesgo"
        });
    }

    retornoSeleccionRiesgoDiffComponent () {
        this.props.showRiesgos();
        var self = this;
        setTimeout(function(){
            self.setState({
                idRiesgoSeleccionado: -1,
                componenteActual: "selRiesgo"
            });
        }, 500);
    }

    editarRiesgo (id, nombreRiesgo, pesoRiesgo, toleranciaRiesgo, valorIdealRiesgo, padreRiesgo) {
        this.setState({
            idRiesgoSeleccionado: id,
            componenteActual: "editarRiesgo",
            nombreRiesgo: nombreRiesgo,
            pesoRiesgo: pesoRiesgo,
            toleranciaRiesgo: toleranciaRiesgo,
            valorIdealRiesgo: valorIdealRiesgo,
            padreRiesgo: padreRiesgo
        });
    }

    retornoEditarRiesgo () {
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
                componenteActual: "editarRiesgo"
            });
        }, 3500);
    }

    terminoCrearRiesgoPasarAEdit () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select top 1 * from Riesgos order by ID desc", (err, result) => {
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
                                this.editarRiesgo(result.recordset[0].ID, result.recordset[0].nombre, result.recordset[0].peso, result.recordset[0].tolerancia, result.recordset[0].valorIdeal, result.recordset[0].idRiesgoPadre);
                            }
                        }
                    });
                }
            });
        }); // fin transaction
    }

    render() {
        if(this.state.componenteActual.localeCompare("selRiesgo") == 0) {
            return (
                <div>
                    <SeleccionarRiesgo pool={this.props.pool} configuracionHome={this.props.configuracionHome} crearRiesgo={this.crearRiesgo} editarRiesgo={this.editarRiesgo} riesgos={this.state.riesgos}> </SeleccionarRiesgo>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("crearRiesgo") == 0) {
            return (
                <div>
                    <CrearRiesgo pool={this.props.pool} showFormula={this.props.showFormula} showCondicionVar={this.props.showCondicionVar} showRiesgos={this.props.showRiesgos} retornoSeleccionRiesgo={this.retornoSeleccionRiesgoSameComponent} retornoSeleccionRiesgoUmbral={this.retornoSeleccionRiesgoDiffComponent} configuracionHome={this.props.configuracionHome} updateNavBar={this.props.updateNavBar} showUmbralHome={this.props.showUmbralHome} riesgos={this.state.riesgos} terminoCrearRiesgo={this.terminoCrearRiesgoPasarAEdit} actualizarRiesgos={this.getRiesgos} pesoMaximo={this.state.pesoDisponible}> </CrearRiesgo>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("editarRiesgo") == 0) {
            return (
                <div>
                    <EditarRiesgo pool={this.props.pool} showFormula={this.props.showFormula} showCondicionVar={this.props.showCondicionVar} showRiesgos={this.props.showRiesgos} retornoSeleccionRiesgo={this.retornoSeleccionRiesgoSameComponent} retornoSeleccionRiesgoUmbral={this.retornoSeleccionRiesgoDiffComponent} configuracionHome={this.props.configuracionHome} updateNavBar={this.props.updateNavBar} showUmbralHome={this.props.showUmbralHome} riesgos={this.state.riesgos} nombreRiesgo={this.state.nombreRiesgo} pesoRiesgo={this.state.pesoRiesgo} toleranciaRiesgo={this.state.toleranciaRiesgo} valorIdealRiesgo={this.state.valorIdealRiesgo} padreRiesgo={this.state.padreRiesgo} updateFormula={this.props.updateFormula} idRiesgoSeleccionado={this.state.idRiesgoSeleccionado}> </EditarRiesgo>
                </div>
            );
        }
    }
}
