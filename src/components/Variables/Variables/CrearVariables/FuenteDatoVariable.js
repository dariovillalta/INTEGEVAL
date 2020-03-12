import React from 'react';

import FuenteDatoVariableAtributos from './FuenteDatoVariableAtributos.js';

/*COMPONENTE CONTENEDOR PADRE / ORIGINAL DE PROCESO CREAR VARIABLE ESTILO VARIABLE*/

//var fuenteDatoAtributo = {};
/*var columnaSeleccionada = {}, operacionSeleccionada = {};
const operaciones = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}];
const operacionesNumero = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}, {valor: "Calcular Promedio"}, {valor: "Máximo"}, {valor: "Mínimo"}, {valor: "Sumar"}];
const operacionesFecha = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}];
const operacionesBoolean = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}];
const operacionesCadena = [{valor: "Asignar Valor Único"}, {valor: "Asignar Valor Único Si"}, {valor: "Asignar Valor Multiples"}, {valor: "Asignar Valor Multiples Si"}, {valor: "Contar"}, {valor: "Contar Si"}, {valor: "Sumar"}];*/

export default class FuenteDatoVariable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //atributos: this.props.atributos,
            mostrarEsObjeto: true,
            titulo: "Valores Multiples",
            /*tipoVariable: '',
            operaciones: operacionesCadena,
            reglas: []*/
        }
        /*this.crearAtributoFuenteDatos = this.crearAtributoFuenteDatos.bind(this);
        this.crearFuenteDato = this.crearFuenteDato.bind(this);
        this.existeReglaAsignacion = this.existeReglaAsignacion.bind(this);
        this.retornarCodigoOperacion = this.retornarCodigoOperacion.bind(this);
        this.retornoSeleccionCampo = this.retornoSeleccionCampo.bind(this);
        this.retornoSeleccionOperacion = this.retornoSeleccionOperacion.bind(this);*/
        this.cambioAObjeto = this.cambioAObjeto.bind(this);
        this.cambiarTitulo = this.cambiarTitulo.bind(this);
    }

    /*crearAtributoFuenteDatos () {
        var nombre = $("#nombreFuenteDato").val();
        var esObjeto;
        if ($("#esObjetoFuenteDato").is(':checked'))
            esObjeto = true;
        else
            esObjeto = false;
        var nombreAtributo = nombre;
        if(esObjeto) {
            nombreAtributo = $("#nombreAtributo").val();
        }
        var formula = this.retornarCodigoOperacion(operacionSeleccionada.valor) + "(" + columnaSeleccionada.valor + ")";
        if(nombreAtributo.length > 0) {
            if(formula.length > 0) {
            } else {
                alert("Ingrese un valor para el nombre del atributo.");
            }
        } else {
            alert("Ingrese un valor para el nombre del atributo.");
        }
        var fuenteDatoAtributo = {nombre: nombreAtributo, tipo: this.state.tipoVariable, formula: formula};
        var copiaAntigua = [...this.state.atributos];
        copiaAntigua.push(fuenteDatoAtributo);
        this.setState({
            atributos: copiaAntigua
        }, console.log(this.state.atributos));
    }

    crearFuenteDato () {
        if(columnaSeleccionada.valor != undefined) {            //if(columnaSeleccionada.valor != undefined) {
            if(operacionSeleccionada.valor != undefined) {      //if(operacionSeleccionada.valor != undefined) {
                if(operacionSeleccionada.valor.localeCompare("Asignar Valor Único Si") != 0 && operacionSeleccionada.valor.localeCompare("Asignar Valor Multiples Si") != 0 && operacionSeleccionada.valor.localeCompare("Contar Si") != 0) {
                    if(this.state.reglas.length > 0) {  //no existe ninguna regla
                        if(this.existeReglaAsignacion()) {       //no existe ni regla de asignacion
                            var nombre = $("#nombreFuenteDato").val();
                            var descripcion = $("#descripcionFuenteDato").val();
                            var esObjeto;
                            if ($("#esObjetoFuenteDato").is(':checked'))
                                esObjeto = true;
                            else
                                esObjeto = false;
                            var objetoPadreID = -1;
                            if(!this.state.mostrarEsObjeto)
                                objetoPadreID = $("#objetoPadreID").val();
                            var guardar;
                            if ($("#guardarFuenteDato").is(':checked'))
                                guardar = true;
                            else
                                guardar = false;
                            //var formula = this.retornarCodigoOperacion(operacionSeleccionada.valor) + "(" + columnaSeleccionada.valor + ")";
                            var fuenteDato = {nombre: nombre, descripcion: descripcion, esObjeto: esObjeto, objetoPadreID: objetoPadreID, guardar: guardar};
                            var regla = {reglaPadreID: -1, variablePadreID: -1, esFuenteDato: true, operacion: operacionSeleccionada.valor, valor: '', nivel: 0, orden: 0};
                        } else {
                            alert("Tiene que crear por lo menos una regla de asignacion.");
                        }
                    } else {
                        alert("Tiene que crear por lo menos una regla.");
                    }
                } else if(operacionSeleccionada.valor.localeCompare("Asignar Si Único Si") == 0) {
                    //
                }
            } else {
                alert("Seleccione una operación de la tabla.");
            }
        } else {
            alert("Seleccione una columna de la tabla.");
        }
    }

    existeReglaAsignacion () {
        for (var i = 0; i < this.state.reglas.length; i++) {
            if(this.state.reglas[i].operacion.localeCompare("Asignar Valor Único") == 0 || 
                this.state.reglas[i].operacion.localeCompare("Asignar Valor Único Si") == 0 || 
                this.state.reglas[i].operacion.localeCompare("Asignar Valor Multiples") == 0 || 
                this.state.reglas[i].operacion.localeCompare("Asignar Valor Multiples Si") == 0 || 
                this.state.reglas[i].operacion.localeCompare("Contar") == 0 || 
                this.state.reglas[i].operacion.localeCompare("Contar Si") == 0 || 
                this.state.reglas[i].operacion.localeCompare("Calcular Promedio") == 0 || 
                this.state.reglas[i].operacion.localeCompare("Máximo") == 0 || 
                this.state.reglas[i].operacion.localeCompare("Mínimo") == 0 || 
                this.state.reglas[i].operacion.localeCompare("Sumar") == 0) {
                return true;
            }
        };
        return false;
    }

    retornarCodigoOperacion (codigo) {
        if(codigo.localeCompare("Asignar Valor Único") == 0) {
            return "ASIGUNI";
        }
        if(codigo.localeCompare("Asignar Valor Único Si") == 0) {
            return "ASIGUNI";
        }
        if(codigo.localeCompare("Asignar Valor Multiples") == 0) {
            return "ASIGMUL";
        }
        if(codigo.localeCompare("Asignar Valor Multiples Si") == 0) {
            return "ASIGMUL";
        }
        if(codigo.localeCompare("Contar") == 0) {
            return "COUNT";
        }
        if(codigo.localeCompare("Contar Si") == 0) {
            return "COUNT";
        }
        if(codigo.localeCompare("Calcular Promedio") == 0) {
            return "PROM";
        }
        if(codigo.localeCompare("Máximo") == 0) {
            return "MAX";
        }
        if(codigo.localeCompare("Mínimo") == 0) {
            return "MIN";
        }
        if(codigo.localeCompare("Sumar") == 0) {
            return "SUM";
        }
    }

    retornoSeleccionCampo (variable) {
        columnaSeleccionada = {};
        //fuenteDatoAtributo.columnaSeleccionada = {};
        if(variable[0].valor.length > 0) {
            columnaSeleccionada = variable[0];
            //fuenteDatoAtributo.columnaSeleccionada = variable[0];
            var tipoVariable = '';
            if(columnaSeleccionada.tipo.localeCompare("int") == 0 || columnaSeleccionada.tipo.localeCompare("decimal") == 0) {
                tipoVariable = 'Número';
                this.setState({
                    operaciones: operacionesNumero,
                    tipoVariable: tipoVariable
                });
            } else if(columnaSeleccionada.tipo.localeCompare("varchar") == 0) {
                tipoVariable = 'Cadena';
                this.setState({
                    operaciones: operacionesCadena,
                    tipoVariable: tipoVariable
                });
            } else if(columnaSeleccionada.tipo.localeCompare("date") == 0) {
                tipoVariable = 'Fecha';
                this.setState({
                    operaciones: operacionesFecha,
                    tipoVariable: tipoVariable
                });
            } else if(columnaSeleccionada.tipo.localeCompare("bit") == 0) {
                tipoVariable = 'Booleano';
                this.setState({
                    operaciones: operacionesBoolean,
                    tipoVariable: tipoVariable
                });
            }
            //this.setState({
            //    tipoVariable: tipoVariable
            //});
        }
    }

    retornoSeleccionOperacion (operacion) {
        operacionSeleccionada = {};
        //fuenteDatoAtributo.operacionSeleccionada = {};
        if(operacion[0].valor.length > 0) {
            operacionSeleccionada = operacion[0];
            //fuenteDatoAtributo.operacionSeleccionada = operacion[0];
        }
    }*/

    cambioAObjeto () {
        this.setState({
            mostrarEsObjeto: !this.state.mostrarEsObjeto,
            tipoVariable: ''
        }, this.cambiarTitulo );
    }

    cambiarTitulo () {
        this.props.cambioDeArreglosDeAtributos();
        if(this.state.mostrarEsObjeto) {
            this.setState({
                titulo: "Valores Multiples"
            });
        } else  {
            this.setState({
                titulo: "Valor Único"
            });
        }
        //this.props.actualizarEstadoSiEsObjeto(this.state.mostrarEsObjeto);
    }

    render() {
        return (
            <div>
                <br/>
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                        <label htmlFor="nombreFuenteDato" className="col-form-label">Nombre de Variable</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <input id="nombreFuenteDato" defaultValue={this.props.nombreVariable} onKeyUp={this.props.actualizarNombreVariable} type="text" className="form-control form-control-sm"/>
                    </div>
                </div>
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                        <label htmlFor="descripcionFuenteDato" className="col-form-label">Descripción de Variable:</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"}>
                        <textarea defaultValue={this.props.descripcionVariable} onKeyUp={this.props.actualizarDescripcionVariable} className="form-control" id="descripcionFuenteDato" rows="3"></textarea>
                    </div>
                </div>
                <br/>
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                        <label htmlFor="esObjetoFuenteDato" className="col-form-label">Tiene más de un atributo / propiedad / campo:</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                        <br/>
                        <div className={"switch-button-variable switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                            <input type="checkbox" defaultChecked name={"esObjetoFuenteDato"} id={"esObjetoFuenteDato"} onClick={this.cambioAObjeto}/><span>
                            <label htmlFor={"esObjetoFuenteDato"}></label></span>
                        </div>
                    </div>
                </div>
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                        <label htmlFor="guardarFuenteDato" className="col-form-label">Guardar Valores Obtenidos en Base de Datos</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                        <br/>
                        <div className={"switch-button switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                            <input type="checkbox" defaultChecked name={"guardarFuenteDato"} id={"guardarFuenteDato"}/><span>
                            <label htmlFor={"guardarFuenteDato"}></label></span>
                        </div>
                    </div>
                </div>
                <div className={"row"} style={{width: "100%", display: this.state.mostrarEsObjeto ? "" : "none"}}>
                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"}>
                        <label htmlFor="objetoPadreID" className="col-form-label">Variable Padre:</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"}>
                        <select className="form-control" id="objetoPadreID">
                            <option value="-1">Ninguno</option>
                        </select>
                    </div>
                </div>
                <br/>
                <div className={"row"} style={{width: "100%", border: "1px solid #e6e6f2"}}>
                    <FuenteDatoVariableAtributos atributos={this.props.atributos}
                                                        titulo={this.state.titulo}
                                                        nombreCampoNuevoAtributosVario={this.props.nombreCampoNuevoAtributosVario}
                                                        actualizarNombreCampoNuevoAtributosVario={this.props.actualizarNombreCampoNuevoAtributosVario}
                                                        crearAtributoVariable={this.props.crearAtributoVariable}
                                                        mostrarEsObjeto={this.state.mostrarEsObjeto}
                                                        retornoTipoDeAsignacion={this.props.retornoTipoDeAsignacion}
                                                        goToCreateConditions={this.props.goToCreateConditions}
                                                        goCreateVariableFieldSQL={this.props.goCreateVariableFieldSQL}>
                    </FuenteDatoVariableAtributos>
                </div>
                <br/>
                <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <a className={"btn btn-brand btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.guardarVariable}>Crear Variable</a>
                </div>
                <br/>
            </div>
        );
    }
}
