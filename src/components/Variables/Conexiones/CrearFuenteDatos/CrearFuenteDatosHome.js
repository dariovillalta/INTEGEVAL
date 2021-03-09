import React from 'react';

import CrearFuenteDatos from './CrearFuenteDatos.js';
import InstruccionVariable from '../../../InstruccionVariable.js';

var campo;

/*              ARREGLO DE ATRIBUTOS               */
/* CADA POSICION REPRESENTA UN CAMPO / ATRIBUTO / COLUMNA */
/*
    [ {nombre: "Carlos", apellido: "Carlos"}, {nombre: "Perez", apellido: "Perez"} ]
*/

/*              ARREGLO DE REGLAS               */
/* CADA POSICION REPRESENTA UNA REGLA PERTENECIENTE A AL ATRIBUTO CORRESPONDIENTE A LA POSICION DEL ATRIBUTO */
/*
    [ [{nombre: "Carlos", apellido: "Carlos"}, {nombre: "Perez", apellido: "Perez"}], [{nombre: "Carlos1", apellido: "Carlos1"}, {nombre: "Perez2", apellido: "Perez2"}] ]
*/

/*              ARREGLO DE FORMULAS               */
/* CADA POSICION REPRESENTA UNA FORMULA PERTENECIENTE A AL ATRIBUTO CORRESPONDIENTE A LA POSICION DEL ATRIBUTO */
/*
    [ [{nombre: "Carlos", apellido: "Carlos"}, {nombre: "Perez", apellido: "Perez"}], [{nombre: "Carlos1", apellido: "Carlos1"}, {nombre: "Perez2", apellido: "Perez2"}] ]
*/

export default class CrearFuenteDatosHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componenteActual: 'crearFuente',
            atributos: [],
            reglas: [ [{texto: "Regla 1", nivel: 1, esCondicion: false}, {texto: "Regla 2", nivel: 2, esCondicion: true}, {texto: "Regla 3", nivel: 3, esCondicion: false}, {texto: "Regla 4", nivel: 1, esCondicion: false}, {texto: "Regla 5", nivel: 2, esCondicion: false}] ],
            formulas: [],
            indiceSeleccionado: -1,
            tipoIndiceSeleccionado: '',                   //esOtraRegla, arriba, abajo
            posicionNuevoAtributo: 0,                     //posicion del arreglo donde se debe insertar el siguiente atributo / campo /  columna (para controlar cuando se agrega condiciones / instrucciones a un nuevo atributo)
            esCondicion: true,                             //bandera para estado de nueva regla / instruccion, saber si es nueva comparacion o asignacion
            navbar: ""
        }
        this.loadRules = this.loadRules.bind(this);
        this.sortRules = this.sortRules.bind(this);
        this.returnToCreateDataSource = this.returnToCreateDataSource.bind(this);
        this.goToCreateConditions = this.goToCreateConditions.bind(this);
        this.createDataSource = this.createDataSource.bind(this);
        this.getDataSourceID = this.getDataSourceID.bind(this);
        this.retornarCampo = this.retornarCampo.bind(this);
        this.actualizarIndiceSeleccionado = this.actualizarIndiceSeleccionado.bind(this);
        this.actualizarIndiceSeleccionadoIrCondicionesNuevoAtributo = this.actualizarIndiceSeleccionadoIrCondicionesNuevoAtributo.bind(this);
        this.actualizarCondicion = this.actualizarCondicion(this);
        this.anadirAtributo = this.anadirAtributo.bind(this);
        this.anadirRegla = this.anadirRegla.bind(this);
    }

    componentDidMount () {
    }

    loadRules() {
        //FINISH
        this.sortRules();
    }

    sortRules() {
        var tempCopy = [...this.state.reglas];
        for (var i = 0; i < tempCopy.length; i++) {
            tempCopy[i]
        };
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

    actualizarIndiceSeleccionado (indice, tipoIndice) {
        this.setState({
            indiceSeleccionado: indice,
            tipoIndiceSeleccionado: tipoIndice
        });
    }

    actualizarIndiceSeleccionadoIrCondicionesNuevoAtributo () {
        this.setState({
            indiceSeleccionado: -1,
            tipoIndiceSeleccionado: ''
        }, this.props.showCondicionVar );
    }

    actualizarCondicion (esCondicion) {
        this.setState({
            esCondicion: esCondicion
        });
    }

    anadirAtributo () {
        var nombreAtributo = $("#nombreAtributo").val();
        //si no existen condiciones creadas, que se cree un arreglo vacio
        if(this.state.reglas[this.state.posicionNuevoAtributo] == undefined) {
            var tempCopyRules = [...this.state.reglas];
            tempCopyRules.push([]);
            this.setState({
                reglas: tempCopyRules
            });
        }
        //si no existen formulas creadas, que se cree un arreglo vacio
        if(this.state.formula[this.state.posicionNuevoAtributo] == undefined) {
            var tempCopyFormulas = [...this.state.formula];
            tempCopyFormulas.push([]);
            this.setState({
                formula: tempCopyFormulas
            });
        }
        var nuevoAtributo;
        //si la formula ya fue asignada, no agregar tipo
        if(this.state.atributos[this.state.posicionNuevoAtributo] == undefined) {
            nuevoAtributo = {nombre: nombreAtributo, tipo: ''};
        } else {
            nuevoAtributo = this.state.atributos[this.state.posicionNuevoAtributo];
            nuevoAtributo.nombre = nombreAtributo;
        }
        var tempCopy = [...this.state.atributos];
        tempCopy.push(nuevoAtributo);
        this.setState({
            atributos: tempCopy
        });
    }

    anadirRegla () {
        //si se agrega una formula/asignacion, todas las otras formulas tienen que ser del mismo tipo para esa variable
        //si el indiceSeleccionado es igual a -1, se llamo desde nuevo atributo
        //sino, modificar elemento seleccionado
        //primer if: ver el estado de donde fue llamado el metodo
        if(this.state.esCondicion) {
            //
        } else {
            //
        }
        if( this.state.indiceSeleccionado != -1 || (this.state.indiceSeleccionado == -1 && this.state.reglas.length == 0) ) {
            var operacion = $("input[name='operacionRadio']:checked").val();
            var valor = $("#valor").val();
            console.log('operacion');
            console.log(operacion);
            console.log('valor');
            console.log(valor);
            console.log('campo');
            console.log(campo);
            var posicionAInsertar = -1;
            if(this.state.indiceSeleccionado != -1) {
                posicionAInsertar = this.state.indiceSeleccionado;
            }
            var copiaAntiguaReglas = [...this.state.reglas];
            var nuevaRegla = {campo: campo.valor, operacion: operacion, valor: valor, texto: "TEXTO", reglaPadreID: -1, nivel: 1};
            if(posicionAInsertar != -1) {
                copiaAntiguaReglas.push(nuevaRegla);
            } else {
                if(this.state.tipoIndiceSeleccionado.localeCompare("esOtraRegla") == 0) {
                    var variablePadre = this.state.reglas[posicionAInsertar]
                    nuevaRegla.reglaPadreID = variablePadre.ID;
                    nuevaRegla.nivel = variablePadre.nivel + 1;
                    var tempCopy
                    this.actualizarNivelReglas(nuevaRegla, posicionInsertarNuevo, )
                } if(this.state.tipoIndiceSeleccionado.localeCompare("arriba") == 0) {
                }
            }
        } else {
            alert("Seleccione una posición para agregar una nueva instrucción");
        }
    }
    
    render() {
        if(this.state.componenteActual.localeCompare("crearFuente") == 0) {
            return (
                <div style={{width: "100%", height: "100%"}}>
                    <CrearFuenteDatos pool={this.props.pool} showCondicionVar={this.actualizarIndiceSeleccionadoIrCondicionesNuevoAtributo}
                                                terminoCrearCampo={this.props.terminoCrearCampo}
                                                idTablaSeleccionada={this.props.idTablaSeleccionada}
                                                columnas={this.props.columnas}
                                                atributos={this.state.atributos}
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
                    <InstruccionVariable pool={this.props.pool} retornarCampo={this.retornarCampo}
                                                campos={this.props.columnas}
                                                camposDropdown={[{valor: this.props.nombreTablaSeleccionada}]}
                                                valoresDropdown={this.props.columnas}
                                                callbackCrearRegla={this.anadirRegla}
                                                retornarIndiceSeleccionado={this.actualizarIndiceSeleccionado}
                                                retornarEstadoVistaEsCondicion={this.actualizarCondicion}
                                                reglas={this.state.reglas[this.state.indiceSeleccionado] != undefined ? this.state.reglas[this.state.indiceSeleccionado] : []}
                                                navbar={this.state.navbar}
                                                configuracionHome={this.props.configuracionHome}
                                                goOptions={this.props.goOptions}
                                                retornoSeleccionTabla={this.props.retornoSeleccionTabla}
                                                retornoSeleccionFuenteDatos={this.props.retornoSeleccionFuenteDatos}>
                    </InstruccionVariable>
                </div>
            );
        }
    }
}
