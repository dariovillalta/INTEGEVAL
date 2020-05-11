import React from 'react';
import sql from 'mssql';

import Modal from '../../../Modal/Modal.js';

const tipoCampos = [ {nombre: "varchar"}, {nombre: "bit"}, {nombre: "date"}, {nombre: "int"}, {nombre: "decimal"}];

export default class InstruccionSQL extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarModal: false,
            tituloModal: "",
            indexVarSeleccionado: -1
        }
        this.openModal = this.openModal.bind(this);
        this.mostrarCampos = this.mostrarCampos.bind(this);
        this.actualizarCampo = this.actualizarCampo.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.agregarInstruccionSQL = this.agregarInstruccionSQL.bind(this);
    }

    componentDidMount() {
        //this.getCampos();
    }

    openModal (index) {
        var nombre = this.props.camposInstruccionSQL[index].nombre;
        this.setState({
            mostrarModal: true,
            tituloModal: "Modificar: "+nombre,
            indexVarSeleccionado: index
        }, this.mostrarCampos(index) );
    }

    mostrarCampos (index) {
        var nombre = this.props.camposInstruccionSQL[index].nombre;
        var tipo = this.props.camposInstruccionSQL[index].tipo;
        setTimeout(function(){
            $("#nombreVariable").val(nombre);
            $("#tipoEdit").val(tipo);
        }, 500);
    }

    actualizarCampo () {
        var nombre = $("#nombreVariable").val();
        var tipo = $("#tipoEdit").val();
        if(nombre.length > 0 && nombre.length < 101) {
            if(tipo.length > 0 && tipo.length < 31) {
                this.props.actualizarCampo(this.state.indexVarSeleccionado, nombre, tipo);
            } else {
                alert("El tipo de la variable debe ser mayor a 0 caracteres y menor a 31.");
            }
        } else {
            alert("El nombre de la variable debe ser mayor a 0 caracteres y menor a 101.");
        }
    }

    closeModal () {
        this.setState({
            mostrarModal: false
        });
    }

    agregarInstruccionSQL () {
        var camposError = [];
        var instruccionSQL = $("#comandoSQL").val();
        if(instruccionSQL.length > 0) {
            if(this.props.camposInstruccionSQL.length > 0) {
                const transaction = new sql.Transaction( this.props.pool );
                transaction.begin(err => {
                    var rolledBack = false;
                    transaction.on('rollback', aborted => {
                        rolledBack = true;
                    });
                    const request = new sql.Request(transaction);
                    request.query(instruccionSQL, (err, result) => {
                        if (err) {
                            console.log(err);
                            alert("Error al ejecutar la instruccionSQL.");
                            if (!rolledBack) {
                                transaction.rollback(err => {
                                });
                            }
                        } else {
                            transaction.commit(err => {
                                if(result.recordset.length > 0) {
                                    for (var i = 0; i < this.props.camposInstruccionSQL.length; i++) {
                                        if(result.recordset[0][this.props.camposInstruccionSQL[i].nombre] == undefined) {
                                            camposError.push(this.props.camposInstruccionSQL[i].nombre);
                                        }
                                    };
                                    if(camposError.length > 0){
                                        var textoCamposErrores = '';
                                        for (var i = 0; i < camposError.length; i++) {
                                            textoCamposErrores += camposError[i];
                                        };
                                        alert("Se encontraron errores al intentar acceder a los campos: "+textoCamposErrores+". No se guardo la instruccionSQL.");
                                    } else {
                                        this.props.agregarInstruccionSQL();
                                    }
                                } else {
                                    alert("La instruccionSQL no retorno ningun valor.");
                                }
                            });
                        }
                    });
                }); // fin transaction
            } else {
                alert("Ingrese campos para tomar de la InstruccionSQL.")
            }
        } else {
            alert("Ingrese un valor para la InstruccionSQL.")
        }
    }
    
    render() {
        return (
            <div>
                {this.props.navbar}
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"card"} style={{width: "100%"}}>
                        <br/>
                        <div style={{width: "100%", paddingLeft: "15px"}}>
                            <h4>Crear Campos: {this.props.nombreVariable}</h4>
                        </div>
                        <br/>
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-group text-center"}>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Tipo</th>
                                            <th scope="col">Modificar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.camposInstruccionSQL.map((campo, i) => (
                                            <tr key={campo.nombre}>
                                                <th scope="row">{i}</th>
                                                <td>{campo.nombre}</td>
                                                <td>{campo.tipo}</td>
                                                <td style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                    <img onClick={() => this.openModal(i)} src={"../assets/edit.png"} style={{height: "20px", width: "20px", display: "block", marginRight: "10px"}} className="addPointer"></img>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <th scope="row">#</th>
                                            <td><input id="nuevoCampo" type="text" className="form-control"/></td>
                                            <td>
                                                <select id="tipo" className="form-control">
                                                    {tipoCampos.map((tipo, i) =>
                                                        <option value={tipo.nombre} key={tipo.nombre}>{tipo.nombre}</option>
                                                    )}
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <br/>
                        <div className={"text-center"} style={{width: "100%"}}>
                            <a href="#" className="btn btn-primary active" onClick={this.props.agregarCampo}>Agregar Campo</a>
                        </div>
                        <br/>
                        <hr/>
                        <br/>
                        <div className={"row"} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <textarea className="form-control" id="comandoSQL" defaultValue={this.props.comandoSQL} rows="7" style={{width: "90%"}}></textarea>
                        </div>
                        <hr/>
                        <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <a className={"btn btn-primary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.agregarInstruccionSQL}>Guardar Comando SQL</a>
                        </div>
                        <br/>
                    </div>
                </div>
                <Modal show={this.state.mostrarModal}
                    titulo={this.state.tituloModal}
                    onClose={this.closeModal}>
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor={"nombreVariable"} className="col-form-label">Nombre de Variable:</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <input id={"nombreVariable"} type="text" className="form-control form-control-sm"/>
                            </div>
                        </div>
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                <label htmlFor={"tipoEdit"} className="col-form-label">Tipo de Variable:</label>
                            </div>
                            <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <select id="tipoEdit" className="form-control">
                                    {tipoCampos.map((tipo, i) =>
                                        <option value={tipo.nombre} key={tipo.nombre}>{tipo.nombre}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className={"text-center"}>
                            <a onClick={this.actualizarCampo} className={"btn btn-primary col-xs-5 col-5"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Actualizar Variable</a>
                            <span className={"col-xs-1 col-1"}></span>
                            <a onClick={() => this.props.eliminarCampo(this.state.indexVarSeleccionado)} className={"btn btn-primary col-xs-5 col-5"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Eliminar Variable</a>
                        </div>
                </Modal>
            </div>
        );
    }
}
