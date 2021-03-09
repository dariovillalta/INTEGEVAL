import React from 'react';

var arregloCeldasSeleccionadas = [];

export default class ListasSeleVariable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarCrearUmbral: true/*,
            indicesVarSeleccionados: this.props.indicesVarSeleccionados*/
        }
        this.clickEnListaCelda = this.clickEnListaCelda.bind(this);
        this.seleccionarIndice = this.seleccionarIndice.bind(this);
        this.deseleccionarIndice = this.deseleccionarIndice.bind(this);
    }

    /*componentDidUpdate (prevProps, prevState, snapshot) {
        var cambio = false;
        for (var i = 0; i < this.props.indicesVarSeleccionados.length; i++) {
            if(this.props.indicesVarSeleccionados[i] != this.state.indicesVarSeleccionados[i]) {
                cambio = true;
                break;
            }
        };
        if(cambio) {
            this.setState({
                indicesVarSeleccionados: this.props.indicesVarSeleccionados
            });
        }
    }*/

    clickEnListaCelda (variable, indice) {
        if(!this.props.seleccionarMultiple) {
            arregloCeldasSeleccionadas = [];
            /*var nuevoArr = [...this.props.indicesVarSeleccionados];
            for (var i = 0; i < nuevoArr.length; i++) {
                if(i != indice)
                    nuevoArr[i] = false;
            };*/
        }
        if(this.props.indicesVarSeleccionados[indice]) {
            this.deseleccionarIndice(variable, indice);
        } else {
            this.seleccionarIndice(variable, indice);
        }
    }

    seleccionarIndice (variable, indice) {
        var entro = false;
        for (var i = 0; i < arregloCeldasSeleccionadas.length; i++) {
            if(arregloCeldasSeleccionadas[i].valor.localeCompare(variable.valor) == 0) {
                entro = true;
                break;
            }
        };
        if(!entro) {
            arregloCeldasSeleccionadas.push(variable);
        }
        //this.props.retornoSeleccion(arregloVariableSeleccionada);
        var nuevoArr = [...this.props.indicesVarSeleccionados];
        for (var i = 0; i < nuevoArr.length; i++) {
            if(i != indice)
                nuevoArr[i] = false;
        };
        nuevoArr[indice] = true;
        /*this.setState({
            indicesVarSeleccionados: nuevoArr
        });*/
        console.log(nuevoArr)
        this.props.retornoSeleccion(arregloCeldasSeleccionadas, this.props.indiceTabla, nuevoArr);
    }

    deseleccionarIndice (variable, indice) {
        for (var i = 0; i < arregloCeldasSeleccionadas.length; i++) {
            if(arregloCeldasSeleccionadas[i].valor.localeCompare(variable.valor) == 0) {
                arregloCeldasSeleccionadas.splice(i, 1);
            }
        };
        //this.props.retornoSeleccion(arregloVariableSeleccionada);
        var nuevoArr = [...this.props.indicesVarSeleccionados];
        for (var i = 0; i < nuevoArr.length; i++) {
            if(i != indice)
                nuevoArr[i] = false;
        };
        nuevoArr[indice] = false;
        /*this.setState({
            indicesVarSeleccionados: nuevoArr
        });*/
        if(arregloCeldasSeleccionadas.length > 0)
            this.props.retornoSeleccion(arregloCeldasSeleccionadas, this.props.indiceTabla, nuevoArr);
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
                            <div onClick={() => this.clickEnListaCelda(variable, i)} style={{flex: "0 0 auto", width: "33%",height: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflowWrap: "break-word", wordWrap: "break-word", whiteSpace: "-moz-pre-wrap", whiteSpace: "pre-wrap", wordBreak: "break-all"}} className={clase + (this.props.indicesVarSeleccionados != undefined ? (this.props.indicesVarSeleccionados[i] ? (this.props.mostrarRosa ? ' outline-secondary-selected' : ' outline-primary-selected') : '') : '')} key={i}>{variable.valor}</div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
