import React from 'react';

import ListasSeleVariable from '../ListasSeleVariable.js';
import Accordion from '../Accordion/Accordion.js';

export default class CampoDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            indicesVarSeleccionadosVariables: [],
            indicesVarSeleccionadosIndicadores: [],
            indicesVarSeleccionadosRiesgos: []
        }
        this.checkFieldType = this.checkFieldType.bind(this);
        this.retornoSeleccionVariableVariables = this.retornoSeleccionVariableVariables.bind(this);
        this.retornoSeleccionVariableIndicadores = this.retornoSeleccionVariableIndicadores.bind(this);
        this.retornoSeleccionVariableRiesgos = this.retornoSeleccionVariableRiesgos.bind(this);
    }

    checkFieldType(campo) {
        if(campo[0].tipo.indexOf("int") == 0 || campo[0].tipo.indexOf("decimal") == 0 || campo[0].tipo.indexOf("numero") == 0) {
            this.props.esNumero();
        } else if(campo[0].tipo.indexOf("bit") == 0) {
            this.props.esBoolean();
        } else if(campo[0].tipo.indexOf("date") == 0) {
            this.props.esFecha();
        } else if(campo[0].tipo.indexOf("varchar") == 0) {
            this.props.esTexto();
        }
    }

    componentDidMount () {
        if(this.props.variables.length > 0) {
            var indicesVarSeleccionadosVariables = [];
            for (var i = 0; i < this.props.variables.length; i++) {
                if (this.props.variables[i] != undefined) {
                    indicesVarSeleccionadosVariables[i] = [];
                }
            };
            this.setState({
                indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables
            });
        }
        if(this.props.indicadores.length > 0) {
            var indicesVarSeleccionadosIndicadores = [];
            for (var i = 0; i < this.props.indicadores.length; i++) {
                if (this.props.indicadores[i] != undefined) {
                    indicesVarSeleccionadosIndicadores[i] = [];
                }
            };
            this.setState({
                indicesVarSeleccionadosIndicadores: indicesVarSeleccionadosIndicadores
            });
        }
        if(this.props.riesgos.length > 0) {
            var indicesVarSeleccionadosRiesgos = [];
            for (var i = 0; i < this.props.riesgos.length; i++) {
                if (this.props.riesgos[i] != undefined) {
                    indicesVarSeleccionadosRiesgos[i] = [];
                }
            };
            this.setState({
                indicesVarSeleccionadosRiesgos: indicesVarSeleccionadosRiesgos
            });
        }
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        if(prevProps.variables.length != this.props.variables.length) {
            var indicesVarSeleccionadosVariables = [];
            for (var i = 0; i < this.props.variables.length; i++) {
                if (this.props.variables[i] != undefined) {
                    indicesVarSeleccionadosVariables[i] = [];
                }
            };
            this.setState({
                indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables
            });
        }
        if(prevProps.indicadores.length != this.props.indicadores.length) {
            var indicesVarSeleccionadosIndicadores = [];
            for (var i = 0; i < this.props.indicadores.length; i++) {
                if (this.props.indicadores[i] != undefined) {
                    indicesVarSeleccionadosIndicadores[i] = [];
                }
            };
            this.setState({
                indicesVarSeleccionadosIndicadores: indicesVarSeleccionadosIndicadores
            });
        }
        if(prevProps.riesgos.length != this.props.riesgos.length) {
            var indicesVarSeleccionadosRiesgos = [];
            for (var i = 0; i < this.props.riesgos.length; i++) {
                if (this.props.riesgos[i] != undefined) {
                    indicesVarSeleccionadosRiesgos[i] = [];
                }
            };
            this.setState({
                indicesVarSeleccionadosRiesgos: indicesVarSeleccionadosRiesgos
            });
        }
    }

    retornoSeleccionVariableVariables(variable, posicion) {
        var indicesVarSeleccionadosVariables = [...this.state.indicesVarSeleccionadosVariables];
        for (var i = 0; i < this.props.variables.length; i++) {
            for (var j = 0; j < this.props.camposDeVariables[i].length; j++) {
                if(this.props.camposDeVariables[i][j] != undefined && this.props.camposDeVariables[i][j].nombre.localeCompare(variable[0].nombre) != 0) {
                    indicesVarSeleccionadosVariables[i][j] = false;
                } else if(this.props.camposDeVariables[i][j] != undefined && this.props.camposDeVariables[i][j].nombre.localeCompare(variable[0].nombre) == 0 && i != posicion) {
                    indicesVarSeleccionadosVariables[i][j] = false;
                } else if(this.props.camposDeVariables[i][j].nombre.localeCompare(variable[0].nombre) == 0 && i == posicion) {
                    indicesVarSeleccionadosVariables[i][j] = true;
                }
            };
        };
        var indicesVarSeleccionadosIndicadores = [];
        for (var i = 0; i < this.props.indicadores.length; i++) {
            if (this.props.indicadores[i] != undefined) {
                indicesVarSeleccionadosIndicadores[i] = [];
            }
        };
        var indicesVarSeleccionadosRiesgos = [];
        for (var i = 0; i < this.props.riesgos.length; i++) {
            if (this.props.riesgos[i] != undefined) {
                indicesVarSeleccionadosRiesgos[i] = [];
            }
        };
        this.setState({
            indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
            indicesVarSeleccionadosIndicadores: indicesVarSeleccionadosIndicadores,
            indicesVarSeleccionadosRiesgos: indicesVarSeleccionadosRiesgos
        });
        this.checkFieldType(variable);
        this.props.retornoSeleccionVariable(variable);
    }

    retornoSeleccionVariableIndicadores(variable, posicion) {
        var indicesVarSeleccionadosVariables = [];
        for (var i = 0; i < this.props.variables.length; i++) {
            if (this.props.variables[i] != undefined) {
                indicesVarSeleccionadosVariables[i] = [];
            }
        };
        var indicesVarSeleccionadosIndicadores = [...this.state.indicesVarSeleccionadosIndicadores];
        for (var i = 0; i < this.props.indicadores.length; i++) {
            for (var j = 0; j < this.props.camposDeIndicadores[i].length; j++) {
                if(this.props.camposDeIndicadores[i][j] != undefined && this.props.camposDeIndicadores[i][j].nombre.localeCompare(variable[0].nombre) != 0) {
                    indicesVarSeleccionadosIndicadores[i][j] = false;
                } else if(this.props.camposDeIndicadores[i][j] != undefined && this.props.camposDeIndicadores[i][j].nombre.localeCompare(variable[0].nombre) == 0 && i != posicion) {
                    indicesVarSeleccionadosIndicadores[i][j] = false;
                } else if(this.props.camposDeIndicadores[i][j].nombre.localeCompare(variable[0].nombre) == 0 && i == posicion) {
                    indicesVarSeleccionadosIndicadores[i][j] = true;
                }
            };
        };
        var indicesVarSeleccionadosRiesgos = [];
        for (var i = 0; i < this.props.riesgos.length; i++) {
            if (this.props.riesgos[i] != undefined) {
                indicesVarSeleccionadosRiesgos[i] = [];
            }
        };
        this.setState({
            indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
            indicesVarSeleccionadosIndicadores: indicesVarSeleccionadosIndicadores,
            indicesVarSeleccionadosRiesgos: indicesVarSeleccionadosRiesgos
        });
        this.checkFieldType(variable);
        this.props.retornoSeleccionVariable(variable);
    }

    retornoSeleccionVariableRiesgos(variable, posicion) {
        var indicesVarSeleccionadosVariables = [];
        for (var i = 0; i < this.props.variables.length; i++) {
            if (this.props.variables[i] != undefined) {
                indicesVarSeleccionadosVariables[i] = [];
            }
        };
        var indicesVarSeleccionadosIndicadores = [];
        for (var i = 0; i < this.props.indicadores.length; i++) {
            if (this.props.indicadores[i] != undefined) {
                indicesVarSeleccionadosIndicadores[i] = [];
            }
        };
        var indicesVarSeleccionadosRiesgos = [...this.state.indicesVarSeleccionadosRiesgos];
        for (var i = 0; i < this.props.riesgos.length; i++) {
            for (var j = 0; j < this.props.camposDeRiesgos[i].length; j++) {
                if(this.props.camposDeRiesgos[i][j] != undefined && this.props.camposDeRiesgos[i][j].nombre.localeCompare(variable[0].nombre) != 0) {
                    indicesVarSeleccionadosRiesgos[i][j] = false;
                } else if(this.props.camposDeRiesgos[i][j] != undefined && this.props.camposDeRiesgos[i][j].nombre.localeCompare(variable[0].nombre) == 0 && i != posicion) {
                    indicesVarSeleccionadosRiesgos[i][j] = false;
                } else if(this.props.camposDeRiesgos[i][j].nombre.localeCompare(variable[0].nombre) == 0 && i == posicion) {
                    indicesVarSeleccionadosRiesgos[i][j] = true;
                }
            };
        };
        this.setState({
            indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
            indicesVarSeleccionadosIndicadores: indicesVarSeleccionadosIndicadores,
            indicesVarSeleccionadosRiesgos: indicesVarSeleccionadosRiesgos
        });
        this.checkFieldType(variable);
        this.props.retornoSeleccionVariable(variable);
    }
    
    render() {
        return (
            <div className={"row"}  style={{width: "100%", maxHeight: "60vh", overflowY: "scroll"}}>
                <Accordion showTrash={false} showEdit={false} color={"#ffffff"}>
                    <div label={"Variables"}>
                        {this.props.variables.map((variable, i) => (
                            <div className={"row"} key={variable.nombreVariable+i} style={{height: "80%", width: "100%"}}>
                                {   
                                    this.props.camposDeVariables[i] != undefined
                                    ? <ListasSeleVariable mostrarRosa={true} variables={this.props.camposDeVariables[i]} seleccionarMultiple={false} retornoSeleccion={this.retornoSeleccionVariableVariables} titulo={variable.nombreVariable} indiceTabla={i} indicesVarSeleccionados={this.state.indicesVarSeleccionadosVariables[i]}></ListasSeleVariable>
                                    : null
                                }
                            </div>
                        ))}
                    </div>
                    <div label={"Indicadores"}>
                        {this.props.indicadores.map((indicador, i) => (
                            <div className={"row"} key={indicador.nombreIndicador+i} style={{height: "80%", width: "100%"}}>
                                {   
                                    this.props.camposDeIndicadores[i] != undefined
                                    ? <ListasSeleVariable mostrarRosa={true} variables={this.props.camposDeIndicadores[i]} seleccionarMultiple={false} retornoSeleccion={this.retornoSeleccionVariableIndicadores} titulo={indicador.nombreIndicador} indiceTabla={i} indicesVarSeleccionados={this.state.indicesVarSeleccionadosIndicadores[i]}></ListasSeleVariable>
                                    : null
                                }
                            </div>
                        ))}
                    </div>
                    <div label={"Riesgos"}>
                        {this.props.riesgos.map((riesgo, i) => (
                            <div className={"row"} key={riesgo.nombreRiesgo+i} style={{height: "80%", width: "100%"}}>
                                {   
                                    this.props.camposDeRiesgos[i] != undefined
                                    ? <ListasSeleVariable mostrarRosa={true} variables={this.props.camposDeRiesgos[i]} seleccionarMultiple={false} retornoSeleccion={this.retornoSeleccionVariableRiesgos} titulo={riesgo.nombreRiesgo} indiceTabla={i} indicesVarSeleccionados={this.state.indicesVarSeleccionadosRiesgos[i]}></ListasSeleVariable>
                                    : null
                                }
                            </div>
                        ))}
                    </div>
                </Accordion>
            </div>
        );
    }
}