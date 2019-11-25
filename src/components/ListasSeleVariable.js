import React from 'react';

var arregloCeldasSeleccionadas = [];

export default class ListasSeleVariable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarCrearUmbral: true,
            indicesVarSeleccionados: []
        }
        this.clickEnListaCelda = this.clickEnListaCelda.bind(this);
        this.seleccionarIndice = this.seleccionarIndice.bind(this);
        this.deseleccionarIndice = this.deseleccionarIndice.bind(this);
    }

    clickEnListaCelda (variable, indice) {
        if(!this.props.seleccionarMultiple) {
            arregloCeldasSeleccionadas = [];
            for (var i = 0; i < this.state.indicesVarSeleccionados.length; i++) {
                this.state.indicesVarSeleccionados[i] = false;
            };
        }
        if(this.state.indicesVarSeleccionados[indice]) {
            this.deseleccionarIndice(variable, indice);
        } else {
            this.seleccionarIndice(variable, indice);
        }
    }

    seleccionarIndice (variable, indice) {
        console.log("antes seleccionarIndice");
        console.log('arregloCeldasSeleccionadas');
        console.log(arregloCeldasSeleccionadas);
        console.log('this.state.indicesVarSeleccionados');
        console.log(this.state.indicesVarSeleccionados);
        var entro = false;
        for (var i = 0; i < arregloCeldasSeleccionadas.length; i++) {
            if(arregloCeldasSeleccionadas[i].nombre.localeCompare(variable.nombre) == 0) {
                entro = true;
                break;
            }
        };
        if(!entro) {
            arregloCeldasSeleccionadas.push(variable);
        }
        //this.props.retornoSeleccion(arregloVariableSeleccionada);
        var nuevoArr = [...this.state.indicesVarSeleccionados];
        nuevoArr[indice] = true;
        this.setState({
            indicesVarSeleccionados: nuevoArr
        });
        console.log("despues seleccionarIndice");
        console.log('arregloCeldasSeleccionadas');
        console.log(arregloCeldasSeleccionadas);
        console.log('this.state.indicesVarSeleccionados');
        console.log(this.state.indicesVarSeleccionados);
        console.log('nuevoArr');
        console.log(nuevoArr);
        this.props.retornoSeleccion(arregloCeldasSeleccionadas);
    }

    deseleccionarIndice (variable, indice) {
        console.log("antes deseleccionarIndice");
        console.log('arregloCeldasSeleccionadas');
        console.log(arregloCeldasSeleccionadas);
        console.log('this.state.indicesVarSeleccionados');
        console.log(this.state.indicesVarSeleccionados);
        for (var i = 0; i < arregloCeldasSeleccionadas.length; i++) {
            if(arregloCeldasSeleccionadas[i].nombre.localeCompare(variable.nombre) == 0) {
                arregloCeldasSeleccionadas.splice(i, 1);
            }
        };
        //this.props.retornoSeleccion(arregloVariableSeleccionada);
        var nuevoArr = [...this.state.indicesVarSeleccionados];
        nuevoArr[indice] = false;
        this.setState({
            indicesVarSeleccionados: nuevoArr
        });
        console.log("despues deseleccionarIndice");
        console.log('arregloCeldasSeleccionadas');
        console.log(arregloCeldasSeleccionadas);
        console.log('this.state.indicesVarSeleccionados');
        console.log(this.state.indicesVarSeleccionados);
        this.props.retornoSeleccion(arregloCeldasSeleccionadas);
    }
    
    render() {
        var clase = "btn btn-outline-secondary btnWhiteColorHover";
        if(!this.props.mostrarRosa) {
            clase = "btn btn-outline-primary btnWhiteColorHover";
        }
        return (
            <div style={{width: "100%", height: "100%"}}>
                <div className={"row text-center"} style={{width: "100%", height: "100%", border: "1px solid #e6e6f2"}}>
                    <div className={"row text-center"} style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%", border: "2px solid #607d8b", height: "20%"}}>
                        <label>{this.props.titulo}</label>
                    </div>
                    <div className={"row"} style={{width: "100%", height: "80%", overflowX: "auto", display: "flex", flexWrap: "nowrap"}}>
                        {this.props.variables.map((variable, i) =>
                            <div onClick={() => this.clickEnListaCelda(variable, i)} style={{flex: "0 0 auto", width: "33%",height: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflowWrap: "break-word", wordWrap: "break-word", whiteSpace: "-moz-pre-wrap", whiteSpace: "pre-wrap"}} className={clase + (this.state.indicesVarSeleccionados[i] ? (this.props.mostrarRosa ? ' outline-secondary-selected' : ' outline-primary-selected') : '')} key={i}>{variable.nombre}</div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
