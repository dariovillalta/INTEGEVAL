import React from 'react';

import CrearUmbral from './CrearUmbral.js';
import EditarUmbral from './EditarUmbral.js';

export default class UmbralOpciones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarCrearUmbral: true,
            crearUmbralSelected: false,
            editarUmbralSelected: false
        }
        this.handleMouseHoverCrear = this.handleMouseHoverCrear.bind(this);
        this.handleMouseHoverEditar = this.handleMouseHoverEditar.bind(this);
        this.handleMouseHoverExit = this.handleMouseHoverExit.bind(this);
        this.goCrearUmbral = this.goCrearUmbral.bind(this);
        this.goEditarUmbral = this.goEditarUmbral.bind(this);
        this.verificarBotonSel = this.verificarBotonSel.bind(this);
    }

    handleMouseHoverCrear() {
        $("#crearButton").addClass("onHoverOpcionUmbral");
        $("#editarButton").removeClass("onHoverOpcionUmbral");
    }

    handleMouseHoverEditar() {
        $("#editarButton").addClass("onHoverOpcionUmbral");
        $("#crearButton").removeClass("onHoverOpcionUmbral");
    }

    handleMouseHoverExit() {
        $("#crearButton").removeClass("onHoverOpcionUmbral");
        $("#editarButton").removeClass("onHoverOpcionUmbral");
        this.verificarBotonSel();
    }

    verificarBotonSel () {
        if(this.state.crearUmbralSelected) {
            $("#crearButton").addClass("onHoverOpcionUmbral");
            $("#editarButton").removeClass("onHoverOpcionUmbral");
        } else if(this.state.editarUmbralSelected) {
            $("#editarButton").addClass("onHoverOpcionUmbral");
            $("#crearButton").removeClass("onHoverOpcionUmbral");
        }
    }

    goCrearUmbral() {
        this.setState({
            mostrarCrearUmbral: true,
            crearUmbralSelected: true,
            editarUmbralSelected: false
        });
    }

    goEditarUmbral() {
        this.setState({
            mostrarCrearUmbral: false,
            crearUmbralSelected: false,
            editarUmbralSelected: true
        });
    }
    
    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>
                                <div className={"row"} style={{height: "2em",width: "100%"}}>
                                    <div onMouseEnter={this.handleMouseHoverCrear} onMouseLeave={this.handleMouseHoverExit} onClick={this.goCrearUmbral} id="crearButton" className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"} style={{height: "100%",width: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid #e6e6f2", borderBottom: "1px solid #e6e6f2"}}>
                                        CREAR
                                    </div>
                                    <div onMouseEnter={this.handleMouseHoverEditar} onMouseLeave={this.handleMouseHoverExit} onClick={this.goEditarUmbral} id="editarButton" className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"}style={{height: "100%",width: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #e6e6f2"}}>
                                        EDITAR
                                    </div>
                                </div>
                                <br/>
                                { this.state.mostrarCrearUmbral ? (
                                    <div className={"row"}>
                                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                            <CrearUmbral></CrearUmbral>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={"row"}>
                                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                            <EditarUmbral></EditarUmbral>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
