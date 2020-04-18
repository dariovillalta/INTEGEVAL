import React from 'react';

import ListasSeleVariable from '../ListasSeleVariable.js';
import Accordion from '../Accordion/Accordion.js';

export default class Campo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            indicesVarSeleccionadosConexiones: [],
            indicesVarSeleccionadosVariablesEscalares: [],
            indicesVarSeleccionadosVariables: [],
            indicesVarSeleccionadosExcel: [],
            indicesVarSeleccionadosFormas: [],
            indicesVarSeleccionadosVariablesSQL: []
        }
        this.checkFieldType = this.checkFieldType.bind(this);
        this.retornoSeleccionVariableConexiones = this.retornoSeleccionVariableConexiones.bind(this);
        this.retornoSeleccionVariableVariablesEscalar = this.retornoSeleccionVariableVariablesEscalar.bind(this);
        this.retornoSeleccionVariableVariables = this.retornoSeleccionVariableVariables.bind(this);
        this.retornoSeleccionVariableExcel = this.retornoSeleccionVariableExcel.bind(this);
        this.retornoSeleccionVariableForma = this.retornoSeleccionVariableForma.bind(this);
        this.retornoSeleccionVariableVariablesSQL = this.retornoSeleccionVariableVariablesSQL.bind(this);
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
        if(this.props.tablas.length > 0) {
            var indicesVarSeleccionadosConexiones = [];
            for (var i = 0; i < this.props.tablas.length; i++) {
                if (this.props.tablas[i] != undefined) {
                    indicesVarSeleccionadosConexiones[i] = [];
                }
            };
            this.setState({
                indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones
            });
        }
        if(this.props.objetos.length > 0) {
            var indicesVarSeleccionadosVariables = [];
            for (var i = 0; i < this.props.objetos.length; i++) {
                if (this.props.objetos[i] != undefined) {
                    indicesVarSeleccionadosVariables[i] = [];
                }
            };
            this.setState({
                indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables
            });
        }
        if(this.props.excel.length > 0) {
            var indicesVarSeleccionadosExcel = [];
            for (var i = 0; i < this.props.excel.length; i++) {
                if (this.props.excel[i] != undefined) {
                    indicesVarSeleccionadosExcel[i] = [];
                }
            };
            this.setState({
                indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel
            });
        }
        if(this.props.variablesSQL.length > 0) {
            var indicesVarSeleccionadosVariablesSQL = [];
            for (var i = 0; i < this.props.variablesSQL.length; i++) {
                if (this.props.variablesSQL[i] != undefined) {
                    indicesVarSeleccionadosVariablesSQL[i] = [];
                }
            };
            this.setState({
                indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
            });
        }
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        console.log('this.props.tablas');
        console.log(this.props.tablas);
        if(prevProps.tablas.length != this.props.tablas.length) {
            console.log('1');
            var indicesVarSeleccionadosConexiones = [];
            for (var i = 0; i < this.props.tablas.length; i++) {
                if (this.props.tablas[i] != undefined) {
                    indicesVarSeleccionadosConexiones[i] = [];
                }
            };
            this.setState({
                indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones
            });
        }
        if(prevProps.objetos.length != this.props.objetos.length) {
            var indicesVarSeleccionadosVariables = [];
            for (var i = 0; i < this.props.objetos.length; i++) {
                if (this.props.objetos[i] != undefined) {
                    indicesVarSeleccionadosVariables[i] = [];
                }
            };
            this.setState({
                indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables
            });
        }
        if(prevProps.excel.length != this.props.excel.length) {
            var indicesVarSeleccionadosExcel = [];
            for (var i = 0; i < this.props.excel.length; i++) {
                if (this.props.excel[i] != undefined) {
                    indicesVarSeleccionadosExcel[i] = [];
                }
            };
            this.setState({
                indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel
            });
        }
        if(prevProps.variablesSQL.length != this.props.variablesSQL.length) {
            var indicesVarSeleccionadosVariablesSQL = [];
            for (var i = 0; i < this.props.variablesSQL.length; i++) {
                if (this.props.variablesSQL[i] != undefined) {
                    indicesVarSeleccionadosVariablesSQL[i] = [];
                }
            };
            this.setState({
                indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
            });
        }
    }

    retornoSeleccionVariableConexiones(variable, posicion) {
        var indicesVarSeleccionadosConexiones = [...this.state.indicesVarSeleccionadosConexiones];
        for (var i = 0; i < this.props.tablas.length; i++) {
            for (var j = 0; j < this.props.camposTablas[i].length; j++) {
                if(this.props.camposTablas[i][j] != undefined && this.props.camposTablas[i][j].valor.localeCompare(variable[0].valor) != 0) {
                    indicesVarSeleccionadosConexiones[i][j] = false;
                } else if(this.props.camposTablas[i][j] != undefined && this.props.camposTablas[i][j].valor.localeCompare(variable[0].valor) == 0 && i != posicion) {
                    indicesVarSeleccionadosConexiones[i][j] = false;
                } else if(this.props.camposTablas[i][j].valor.localeCompare(variable[0].valor) == 0 && i == posicion) {
                    indicesVarSeleccionadosConexiones[i][j] = true;
                }
            };
        };
        var indicesVarSeleccionadosVariables = [];
        for (var i = 0; i < this.props.objetos.length; i++) {
            if (this.props.objetos[i] != undefined) {
                indicesVarSeleccionadosVariables[i] = [];
            }
        };
        var indicesVarSeleccionadosExcel = [];
        for (var i = 0; i < this.props.excel.length; i++) {
            if (this.props.excel[i] != undefined) {
                indicesVarSeleccionadosExcel[i] = [];
            }
        };
        var indicesVarSeleccionadosVariablesSQL = [];
        for (var i = 0; i < this.props.variablesSQL.length; i++) {
            if (this.props.variablesSQL[i] != undefined) {
                indicesVarSeleccionadosVariablesSQL[i] = [];
            }
        };
        this.setState({
            indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
            indicesVarSeleccionadosVariablesEscalares: [],
            indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
            indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
            indicesVarSeleccionadosFormas: [],
            indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
        });
        this.checkFieldType(variable);
        this.props.retornoSeleccionVariable(variable);
    }

    retornoSeleccionVariableVariablesEscalar(variable, posicion) {
        var indicesVarSeleccionadosConexiones = [];
        for (var i = 0; i < this.props.tablas.length; i++) {
            if (this.props.tablas[i] != undefined) {
                indicesVarSeleccionadosConexiones[i] = [];
            }
        };
        var indicesVarSeleccionadosVariables = [];
        for (var i = 0; i < this.props.objetos.length; i++) {
            if (this.props.objetos[i] != undefined) {
                indicesVarSeleccionadosVariables[i] = [];
            }
        };
        var indicesVarSeleccionadosExcel = [];
        for (var i = 0; i < this.props.excel.length; i++) {
            if (this.props.excel[i] != undefined) {
                indicesVarSeleccionadosExcel[i] = [];
            }
        };
        var indicesVarSeleccionadosVariablesSQL = [];
        for (var i = 0; i < this.props.variablesSQL.length; i++) {
            if (this.props.variablesSQL[i] != undefined) {
                indicesVarSeleccionadosVariablesSQL[i] = [];
            }
        };
        this.setState({
            indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
            indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
            indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
            indicesVarSeleccionadosFormas: [],
            indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
        });
        this.checkFieldType(variable);
        this.props.retornoSeleccionVariable(variable);
    }

    retornoSeleccionVariableVariables(variable, posicion) {
        var indicesVarSeleccionadosConexiones = [];
        for (var i = 0; i < this.props.tablas.length; i++) {
            if (this.props.tablas[i] != undefined) {
                indicesVarSeleccionadosConexiones[i] = [];
            }
        };
        var indicesVarSeleccionadosVariables = [...this.state.indicesVarSeleccionadosVariables];
        for (var i = 0; i < this.props.objetos.length; i++) {
            for (var j = 0; j < this.props.camposDeObjetos[i].length; j++) {
                if(this.props.camposDeObjetos[i][j] != undefined && this.props.camposDeObjetos[i][j].valor.localeCompare(variable[0].valor) != 0) {
                    indicesVarSeleccionadosVariables[i][j] = false;
                } else if(this.props.camposDeObjetos[i][j] != undefined && this.props.camposDeObjetos[i][j].valor.localeCompare(variable[0].valor) == 0 && i != posicion) {
                    indicesVarSeleccionadosVariables[i][j] = false;
                } else if(this.props.camposDeObjetos[i][j].valor.localeCompare(variable[0].valor) == 0 && i == posicion) {
                    indicesVarSeleccionadosVariables[i][j] = true;
                }
            };
        };
        var indicesVarSeleccionadosExcel = [];
        for (var i = 0; i < this.props.excel.length; i++) {
            if (this.props.excel[i] != undefined) {
                indicesVarSeleccionadosExcel[i] = [];
            }
        };
        var indicesVarSeleccionadosVariablesSQL = [];
        for (var i = 0; i < this.props.variablesSQL.length; i++) {
            if (this.props.variablesSQL[i] != undefined) {
                indicesVarSeleccionadosVariablesSQL[i] = [];
            }
        };
        this.setState({
            indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
            indicesVarSeleccionadosVariablesEscalares: [],
            indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
            indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
            indicesVarSeleccionadosFormas: [],
            indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
        });
        this.checkFieldType(variable);
        this.props.retornoSeleccionVariable(variable);
    }

    retornoSeleccionVariableExcel(variable, posicion) {
        var indicesVarSeleccionadosConexiones = [];
        for (var i = 0; i < this.props.tablas.length; i++) {
            if (this.props.tablas[i] != undefined) {
                indicesVarSeleccionadosConexiones[i] = [];
            }
        };
        var indicesVarSeleccionadosVariables = [];
        for (var i = 0; i < this.props.objetos.length; i++) {
            if (this.props.objetos[i] != undefined) {
                indicesVarSeleccionadosVariables[i] = [];
            }
        };
        var indicesVarSeleccionadosExcel = [...this.state.indicesVarSeleccionadosExcel];
        for (var i = 0; i < this.props.excel.length; i++) {
            for (var j = 0; j < this.props.camposDeExcel[i].length; j++) {
                if(this.props.camposDeExcel[i][j] != undefined && this.props.camposDeExcel[i][j].valor.localeCompare(variable[0].valor) != 0) {
                    indicesVarSeleccionadosExcel[i][j] = false;
                } else if(this.props.camposDeExcel[i][j] != undefined && this.props.camposDeExcel[i][j].valor.localeCompare(variable[0].valor) == 0 && i != posicion) {
                    indicesVarSeleccionadosExcel[i][j] = false;
                } else if(this.props.camposDeExcel[i][j].valor.localeCompare(variable[0].valor) == 0 && i == posicion) {
                    indicesVarSeleccionadosExcel[i][j] = true;
                }
            };
        };
        var indicesVarSeleccionadosVariablesSQL = [];
        for (var i = 0; i < this.props.variablesSQL.length; i++) {
            if (this.props.variablesSQL[i] != undefined) {
                indicesVarSeleccionadosVariablesSQL[i] = [];
            }
        };
        this.setState({
            indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
            indicesVarSeleccionadosVariablesEscalares: [],
            indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
            indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
            indicesVarSeleccionadosFormas: [],
            indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
        });
        this.checkFieldType(variable);
        this.props.retornoSeleccionVariable(variable);
    }

    retornoSeleccionVariableForma(variable, posicion) {
        var indicesVarSeleccionadosConexiones = [];
        for (var i = 0; i < this.props.tablas.length; i++) {
            if (this.props.tablas[i] != undefined) {
                indicesVarSeleccionadosConexiones[i] = [];
            }
        };
        var indicesVarSeleccionadosVariables = [];
        for (var i = 0; i < this.props.objetos.length; i++) {
            if (this.props.objetos[i] != undefined) {
                indicesVarSeleccionadosVariables[i] = [];
            }
        };
        var indicesVarSeleccionadosExcel = [];
        for (var i = 0; i < this.props.excel.length; i++) {
            if (this.props.excel[i] != undefined) {
                indicesVarSeleccionadosExcel[i] = [];
            }
        };
        var indicesVarSeleccionadosVariablesSQL = [];
        for (var i = 0; i < this.props.variablesSQL.length; i++) {
            if (this.props.variablesSQL[i] != undefined) {
                indicesVarSeleccionadosVariablesSQL[i] = [];
            }
        };
        this.setState({
            indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
            indicesVarSeleccionadosVariablesEscalares: [],
            indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
            indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
            indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
        });
        this.checkFieldType(variable);
        this.props.retornoSeleccionVariable(variable);
    }

    retornoSeleccionVariableVariablesSQL(variable, posicion) {
        var indicesVarSeleccionadosConexiones = [];
        for (var i = 0; i < this.props.tablas.length; i++) {
            if (this.props.tablas[i] != undefined) {
                indicesVarSeleccionadosConexiones[i] = [];
            }
        };
        var indicesVarSeleccionadosVariables = [];
        for (var i = 0; i < this.props.objetos.length; i++) {
            if (this.props.objetos[i] != undefined) {
                indicesVarSeleccionadosVariables[i] = [];
            }
        };
        var indicesVarSeleccionadosExcel = [];
        for (var i = 0; i < this.props.excel.length; i++) {
            if (this.props.excel[i] != undefined) {
                indicesVarSeleccionadosExcel[i] = [];
            }
        };
        var indicesVarSeleccionadosVariablesSQL = [...this.state.indicesVarSeleccionadosVariablesSQL];
        for (var i = 0; i < this.props.variablesSQL.length; i++) {
            for (var j = 0; j < this.props.camposVariablesSQL[i].length; j++) {
                if(this.props.camposVariablesSQL[i][j] != undefined && this.props.camposVariablesSQL[i][j].valor.localeCompare(variable[0].valor) != 0) {
                    indicesVarSeleccionadosVariablesSQL[i][j] = false;
                } else if(this.props.camposVariablesSQL[i][j] != undefined && this.props.camposVariablesSQL[i][j].valor.localeCompare(variable[0].valor) == 0 && i != posicion) {
                    indicesVarSeleccionadosVariablesSQL[i][j] = false;
                } else if(this.props.camposVariablesSQL[i][j].valor.localeCompare(variable[0].valor) == 0 && i == posicion) {
                    indicesVarSeleccionadosConexiones[i][j] = true;
                }
            };
        };
        this.setState({
            indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
            indicesVarSeleccionadosVariablesEscalares: [],
            indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
            indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
            indicesVarSeleccionadosFormas: [],
            indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
        });
        this.checkFieldType(variable);
        this.props.retornoSeleccionVariable(variable);
    }
    
    render() {
        return (
            <div className={"row"}  style={{width: "100%"}}>
                <Accordion showTrash={false} showEdit={false} color={"#ffffff"}>
                    <div label={"Conexiones"}>
                        {this.props.tablas.map((conexion, i) => (
                            <div className={"row"} key={conexion.valor+i} style={{height: "80%", width: "100%"}}>
                                {   
                                    this.props.camposTablas[i] != undefined
                                    ? <ListasSeleVariable mostrarRosa={false} variables={this.props.camposTablas[i]} seleccionarMultiple={false} retornoSeleccion={this.retornoSeleccionVariableConexiones} titulo={conexion.valor} indiceTabla={i} indicesVarSeleccionados={this.state.indicesVarSeleccionadosConexiones[i]}></ListasSeleVariable>
                                    : null
                                }
                            </div>
                        ))}
                    </div>
                    <div label={"Variables"}>
                        {this.props.objetos.map((variable, i) => (
                            <div className={"row"} key={variable.valor+i} style={{height: "80%", width: "100%"}}>
                                {   
                                    this.props.camposDeObjetos[i] != undefined
                                    ? <ListasSeleVariable mostrarRosa={true} variables={this.props.camposDeObjetos[i]} seleccionarMultiple={false} retornoSeleccion={this.retornoSeleccionVariableVariables} titulo={variable.valor} indiceTabla={i} indicesVarSeleccionados={this.state.indicesVarSeleccionadosVariables[i]}></ListasSeleVariable>
                                    : null
                                }
                            </div>
                        ))}
                    </div>
                    <div label={"Variables Escalares"}>
                        <div className={"row"} style={{height: "80%", width: "100%"}}>
                            <ListasSeleVariable mostrarRosa={true} variables={this.props.variablesEscalares} seleccionarMultiple={false} retornoSeleccion={this.retornoSeleccionVariableVariablesEscalar} titulo={"Variables Escalares"} indiceTabla={false} indicesVarSeleccionados={this.state.indicesVarSeleccionadosVariablesEscalares}></ListasSeleVariable>
                        </div>
                    </div>
                    <div label={"Excel"}>
                        {this.props.excel.map((excel, i) => (
                            <div className={"row"} key={excel.ID} style={{height: "80%", width: "100%"}}>
                                {   
                                    this.props.camposDeExcel[i] != undefined
                                    ? <ListasSeleVariable mostrarRosa={true} variables={this.props.camposDeExcel[i]} seleccionarMultiple={false} retornoSeleccion={this.retornoSeleccionVariableExcel} titulo={excel.nombre} key={i} indiceTabla={i} indicesVarSeleccionados={this.state.indicesVarSeleccionadosExcel[i]}></ListasSeleVariable>
                                    : null
                                }
                            </div>
                        ))}
                    </div>
                    <div label={"Formas"}>
                        <div className={"row"} style={{height: "80%", width: "100%"}}>
                            <ListasSeleVariable mostrarRosa={true} variables={this.props.formas} seleccionarMultiple={false} retornoSeleccion={this.retornoSeleccionVariableForma} titulo={"Formas"} indiceTabla={false} indicesVarSeleccionados={this.state.indicesVarSeleccionadosFormas}></ListasSeleVariable>
                        </div>
                    </div>
                    <div label={"Variables SQL"}>
                        {this.props.variablesSQL.map((excel, i) => (
                            <div className={"row"} key={excel.ID} style={{height: "80%", width: "100%"}}>
                                {   
                                    this.props.camposVariablesSQL[i] != undefined
                                    ? <ListasSeleVariable mostrarRosa={true} variables={this.props.camposVariablesSQL[i]} seleccionarMultiple={false} retornoSeleccion={this.retornoSeleccionVariableVariablesSQL} titulo={excel.nombre} key={i} indiceTabla={i} indicesVarSeleccionados={this.state.indicesVarSeleccionadosVariablesSQL[i]}></ListasSeleVariable>
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