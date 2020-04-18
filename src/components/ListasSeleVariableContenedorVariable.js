import React from 'react';

import ListasSeleVariable from './ListasSeleVariable.js';

export default class ListasSeleVariableContenedorVariable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disableManualValue: true,
            indicesVarSeleccionadosConexiones: [],
            indicesVarSeleccionadosVariablesEscalares: [],
            indicesVarSeleccionadosVariables: [],
            indicesVarSeleccionadosExcel: [],
            indicesVarSeleccionadosFormas: [],
            indicesVarSeleccionadosVariablesSQL: []
        }
        this.disableManualValue = this.disableManualValue.bind(this);
        this.retornoSeleccionVariableConexiones = this.retornoSeleccionVariableConexiones.bind(this);
        this.retornoSeleccionVariableVariablesEscalar = this.retornoSeleccionVariableVariablesEscalar.bind(this);
        this.retornoSeleccionVariableVariables = this.retornoSeleccionVariableVariables.bind(this);
        this.retornoSeleccionVariableExcel = this.retornoSeleccionVariableExcel.bind(this);
        this.retornoSeleccionVariableForma = this.retornoSeleccionVariableForma.bind(this);
        this.retornoSeleccionVariableVariablesSQL = this.retornoSeleccionVariableVariablesSQL.bind(this);
    }

    componentDidMount() {
        this.disableManualValue();
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
        if(prevProps.tablas.length != this.props.tablas.length) {
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

    retornoSeleccionVariableConexiones(variable, posicion, arreglo) {
        var indicesVarSeleccionadosConexiones = [...this.state.indicesVarSeleccionadosConexiones];
        //indicesVarSeleccionadosConexiones[posicion] = arreglo;
        for (var i = 0; i < this.props.tablas.length; i++) {
            for (var j = 0; j < this.props.camposTablas[i].length; j++) {
                i/*f(this.props.camposTablas[i][j] != undefined && this.props.camposTablas[i][j].valor.localeCompare(variable[0].valor) != 0) {
                    indicesVarSeleccionadosConexiones[i][j] = false;
                } else if(this.props.camposTablas[i][j] != undefined && this.props.camposTablas[i][j].valor.localeCompare(variable[0].valor) == 0 && i != posicion) {
                    indicesVarSeleccionadosConexiones[i][j] = false;
                } else if(this.props.camposTablas[i][j].valor.localeCompare(variable[0].valor) == 0 && i == posicion) {
                    indicesVarSeleccionadosConexiones[i][j] = true;
                }*/
                if(j != posicion) {
                    indicesVarSeleccionadosConexiones[j] = [];
                } else {
                    indicesVarSeleccionadosConexiones[j] = arreglo;
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
            disableManualValue: false,
            indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
            indicesVarSeleccionadosVariablesEscalares: [],
            indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
            indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
            indicesVarSeleccionadosFormas: [],
            indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
        });
        $('#radioManual').prop('checked', false);
        $( "#valorManual" ).prop( "disabled", true );
        this.props.returnStateManualValue(false);
        this.props.retornoSeleccionVariable(this.props.esOperacion, variable, posicion);
    }

    retornoSeleccionVariableVariablesEscalar(variable, posicion, arreglo) {
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
            disableManualValue: false,
            indicesVarSeleccionadosVariablesEscalares: arreglo,
            indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
            indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
            indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
            indicesVarSeleccionadosFormas: [],
            indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
        });
        $('#radioManual').prop('checked', false);
        $( "#valorManual" ).prop( "disabled", true );
        this.props.returnStateManualValue(false);
        this.props.retornoSeleccionVariable(this.props.esOperacion, variable, posicion);
    }

    retornoSeleccionVariableVariables(variable, posicion, arreglo) {
        var indicesVarSeleccionadosConexiones = [];
        for (var i = 0; i < this.props.tablas.length; i++) {
            if (this.props.tablas[i] != undefined) {
                indicesVarSeleccionadosConexiones[i] = [];
            }
        };
        var indicesVarSeleccionadosVariables = [...this.state.indicesVarSeleccionadosVariables];
        //indicesVarSeleccionadosVariables[posicion] = arreglo;
        for (var i = 0; i < this.props.objetos.length; i++) {
            for (var j = 0; j < this.props.camposDeObjetos[i].length; j++) {
                /*if(this.props.camposDeObjetos[i][j] != undefined && this.props.camposDeObjetos[i][j].valor.localeCompare(variable[0].valor) != 0) {
                    indicesVarSeleccionadosVariables[i][j] = false;
                } else if(this.props.camposDeObjetos[i][j] != undefined && this.props.camposDeObjetos[i][j].valor.localeCompare(variable[0].valor) == 0 && i != posicion) {
                    indicesVarSeleccionadosVariables[i][j] = false;
                } else if(this.props.camposDeObjetos[i][j].valor.localeCompare(variable[0].valor) == 0 && i == posicion) {
                    indicesVarSeleccionadosVariables[i][j] = true;
                }*/
                if(j != posicion) {
                    indicesVarSeleccionadosVariables[j] = [];
                } else {
                    indicesVarSeleccionadosVariables[j] = arreglo;
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
            disableManualValue: false,
            indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
            indicesVarSeleccionadosVariablesEscalares: [],
            indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
            indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
            indicesVarSeleccionadosFormas: [],
            indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
        });
        $('#radioManual').prop('checked', false);
        $( "#valorManual" ).prop( "disabled", true );
        this.props.returnStateManualValue(false);
        this.props.retornoSeleccionVariable(this.props.esOperacion, variable, posicion);
    }

    retornoSeleccionVariableExcel(variable, posicion, arreglo) {
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
        //indicesVarSeleccionadosExcel[posicion] = arreglo;
        for (var i = 0; i < this.props.excel.length; i++) {
            for (var j = 0; j < this.props.camposDeExcel[i].length; j++) {
                /*if(this.props.camposDeExcel[i][j] != undefined && this.props.camposDeExcel[i][j].valor.localeCompare(variable[0].valor) != 0) {
                    indicesVarSeleccionadosExcel[i][j] = false;
                } else if(this.props.camposDeExcel[i][j] != undefined && this.props.camposDeExcel[i][j].valor.localeCompare(variable[0].valor) == 0 && i != posicion) {
                    indicesVarSeleccionadosExcel[i][j] = false;
                } else if(this.props.camposDeExcel[i][j].valor.localeCompare(variable[0].valor) == 0 && i == posicion) {
                    indicesVarSeleccionadosExcel[i][j] = true;
                }*/
                if(j != posicion) {
                    indicesVarSeleccionadosExcel[j] = [];
                } else {
                    indicesVarSeleccionadosExcel[j] = arreglo;
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
            disableManualValue: false,
            indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
            indicesVarSeleccionadosVariablesEscalares: [],
            indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
            indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
            indicesVarSeleccionadosFormas: [],
            indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
        });
        $('#radioManual').prop('checked', false);
        $( "#valorManual" ).prop( "disabled", true );
        this.props.returnStateManualValue(false);
        this.props.retornoSeleccionVariable(this.props.esOperacion, variable, posicion);
    }

    retornoSeleccionVariableForma(variable, posicion, arreglo) {
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
            disableManualValue: false,
            indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
            indicesVarSeleccionadosVariablesEscalares: [],
            indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
            indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
            indicesVarSeleccionadosFormas: arreglo,
            indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
        });
        $('#radioManual').prop('checked', false);
        $( "#valorManual" ).prop( "disabled", true );
        this.props.returnStateManualValue(false);
        this.props.retornoSeleccionVariable(this.props.esOperacion, variable, posicion);
    }

    retornoSeleccionVariableVariablesSQL(variable, posicion, arreglo) {
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
        //indicesVarSeleccionadosVariablesSQL[posicion] = arreglo;
        for (var i = 0; i < this.props.variablesSQL.length; i++) {
            for (var j = 0; j < this.props.camposVariablesSQL[i].length; j++) {
                /*if(this.props.camposVariablesSQL[i][j] != undefined && this.props.camposVariablesSQL[i][j].valor.localeCompare(variable[0].valor) != 0) {
                    indicesVarSeleccionadosVariablesSQL[i][j] = false;
                } else if(this.props.camposVariablesSQL[i][j] != undefined && this.props.camposVariablesSQL[i][j].valor.localeCompare(variable[0].valor) == 0 && i != posicion) {
                    indicesVarSeleccionadosVariablesSQL[i][j] = false;
                } else if(this.props.camposVariablesSQL[i][j].valor.localeCompare(variable[0].valor) == 0 && i == posicion) {
                    indicesVarSeleccionadosConexiones[i][j] = true;
                }*/
                if(j != posicion) {
                    indicesVarSeleccionadosVariablesSQL[j] = [];
                } else {
                    indicesVarSeleccionadosVariablesSQL[j] = arreglo;
                }
            };
        };
        this.setState({
            disableManualValue: false,
            indicesVarSeleccionadosConexiones: indicesVarSeleccionadosConexiones,
            indicesVarSeleccionadosVariablesEscalares: [],
            indicesVarSeleccionadosVariables: indicesVarSeleccionadosVariables,
            indicesVarSeleccionadosExcel: indicesVarSeleccionadosExcel,
            indicesVarSeleccionadosFormas: [],
            indicesVarSeleccionadosVariablesSQL: indicesVarSeleccionadosVariablesSQL
        });
        $('#radioManual').prop('checked', false);
        $( "#valorManual" ).prop( "disabled", true );
        this.props.returnStateManualValue(false);
        this.props.retornoSeleccionVariable(this.props.esOperacion, variable, posicion);
    }

    disableManualValue () {
        if(this.state.disableManualValue) {
            $( "#valorManual" ).prop( "disabled", true );
            this.setState({
                disableManualValue: false
            });
            this.props.returnStateManualValue(false);
        } else {
            $( "#valorManual" ).prop( "disabled", false );
            this.setState({
                disableManualValue: true
            });
            this.props.returnStateManualValue(true);
        }
    }
    //EN VEZ DE TABLAS, FUENTE DE DATOS
    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <div className={"row"} style={{border: "1px solid #e6e6f2", width: "100%", height: "100%"}}>
                    {this.props.tablas.map((tabla, i) => (
                        <div style={{width: "100%", height: "80%"}} key={tabla.ID}>
                            {
                                this.props.camposTablas[i] != undefined
                                ? <ListasSeleVariable mostrarRosa={this.props.mostrarRosa} variables={this.props.camposTablas[i]} seleccionarMultiple={this.props.seleccionarMultiple} retornoSeleccion={this.retornoSeleccionVariableConexiones} titulo={tabla.nombre} indiceTabla={i} indicesVarSeleccionados={this.state.indicesVarSeleccionadosConexiones[i]}></ListasSeleVariable>
                                : null
                            }
                        </div>
                    ))}
                    {
                        this.props.variables.length > 0
                        ?    <div style={{width: "100%", height: "80%"}}>
                                <ListasSeleVariable mostrarRosa={this.props.mostrarRosa} variables={this.props.variables} seleccionarMultiple={this.props.seleccionarMultiple} retornoSeleccion={this.retornoSeleccionVariableVariablesEscalar} titulo={"Variable Escalares"} indiceTabla={false} indicesVarSeleccionados={this.state.indicesVarSeleccionadosVariablesEscalares}></ListasSeleVariable>
                            </div>
                        : null
                    }
                    {this.props.objetos.map((objeto, i) => (
                        <div style={{width: "100%", height: "80%"}} key={objeto.ID}>
                            {
                                this.props.camposDeObjetos[i] != undefined
                                ? <ListasSeleVariable mostrarRosa={this.props.mostrarRosa} variables={this.props.camposDeObjetos[i]} seleccionarMultiple={this.props.seleccionarMultiple} retornoSeleccion={this.retornoSeleccionVariableVariables} titulo={objeto.nombre} key={i} indiceTabla={i} indicesVarSeleccionados={this.state.indicesVarSeleccionadosVariables[i]}></ListasSeleVariable>
                                : null
                            }
                        </div>
                    ))}
                    {this.props.excel.map((excel, i) => (
                        <div style={{width: "100%", height: "80%"}} key={excel.ID}>
                            {
                                this.props.camposDeExcel[i] != undefined
                                ? <ListasSeleVariable mostrarRosa={this.props.mostrarRosa} variables={this.props.camposDeExcel[i]} seleccionarMultiple={this.props.seleccionarMultiple} retornoSeleccion={this.retornoSeleccionVariableExcel} titulo={excel.nombre} key={i} indiceTabla={i} indicesVarSeleccionados={this.state.indicesVarSeleccionadosExcel[i]}></ListasSeleVariable>
                                : null
                            }
                        </div>
                    ))}
                    {
                        this.props.formas.length > 0
                        ?    <div style={{width: "100%", height: "80%"}}>
                                <ListasSeleVariable mostrarRosa={this.props.mostrarRosa} variables={this.props.formas} seleccionarMultiple={this.props.seleccionarMultiple} retornoSeleccion={this.retornoSeleccionVariableForma} titulo={"Variables de Formas"} indiceTabla={false} indicesVarSeleccionados={this.state.indicesVarSeleccionadosFormas}></ListasSeleVariable>
                            </div>
                        : null
                    }
                    {this.props.variablesSQL.map((variableSQL, i) => (
                        <div style={{width: "100%", height: "80%"}} key={variableSQL.ID}>
                            {
                                this.props.camposVariablesSQL[i] != undefined
                                ? <ListasSeleVariable mostrarRosa={this.props.mostrarRosa} variables={this.props.camposVariablesSQL[i]} seleccionarMultiple={this.props.seleccionarMultiple} retornoSeleccion={this.retornoSeleccionVariableVariablesSQL} titulo={variableSQL.nombre} key={i} indiceTabla={i} indicesVarSeleccionados={this.state.indicesVarSeleccionadosVariablesSQL[i]}></ListasSeleVariable>
                                : null
                            }
                        </div>
                    ))}
                    <div style={{width: "100%", height: "80%"}}>
                        <div className={"row text-center"} style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%", border: "2px solid #607d8b", height: "20%"}}>
                            <div>
                                <label>"MANUAL"</label>
                            </div>
                            <input id="radioManual" type="checkbox" onClick={this.disableManualValue} style={{marginLeft: "10px"}}/>
                        </div>
                        <div className={"row"} style={{width: "100%", height: "15%", overflowX: "auto", display: "flex", flexWrap: "nowrap"}}>
                            <input id="valorManual" type="text" className="form-control form-control-sm"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
