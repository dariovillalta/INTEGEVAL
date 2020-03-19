import React from 'react';

var colores = [
                ["d50000", "d32f2f", "ff1744", "ef5350", "e57373", "ef9a9a", "ffcdd2"],
                ["ffd600", "fbc02d", "ffff00", "fdd835", "fff176", "fff59d", "fff9c4"],
                ["e65100", "ff6d00", "ef6c00", "ffa726", "ffb74d", "ffcc80", "ffe0b2"],
                ["880e4f", "c51162", "f50057", "ff4081", "ec407a", "f06292", "f48fb1"],
                ["1b5e20", "2e7d32", "388e3c", "4caf50", "81c784", "a5d6a7", "c8e6c9"],
                ["0d47a1", "1565c0", "1e88e5", "2196f3", "42a5f5", "64b5f6", "90caf9"],
                ["37474f", "546e7a", "607d8b", "78909c", "90a4ae", "b0bec5", "cfd8dc"],
                ["006064", "00838f", "0097a7", "00acc1", "4dd0e1", "80deea", "b2ebf2"],
                ["33691e", "558b2f", "689f38", "7cb342", "8bc34a", "aed581", "c5e1a5"],
            ];
//  [rojo, amarillo, naranja, rosa, verde oscuro, azul, gris, cyan, verde claro]

export default class ContenedorReglas extends React.Component {
    constructor(props) {
        super(props);
        this.seleccionRegla = this.seleccionRegla.bind(this);
        this.getColor = this.getColor.bind(this);
    }

    seleccionRegla(indiceI, objeto, indiceJ) {
        $("#reglaInit").removeClass("colorPunteroFormula");
        $("#reglaInit").removeClass("blink");
        $("#reglaFin").removeClass("colorPunteroFormula");
        $("#reglaFin").removeClass("blink");
        $("#unicaRegla").css("border", "initial");
        for (var i = 0; i < this.props.reglas.length; i++) {
            $("#regla"+i).css("border", "initial");
            if(i == 0) {
                $("#reglaInit"+i).removeClass("colorPunteroFormula");
                $("#reglaInit"+i).removeClass("blink");
                $("#reglaFin"+i).removeClass("colorPunteroFormula");
                $("#reglaFin"+i).removeClass("blink");
            } else {
                $("#reglaFin"+i).removeClass("colorPunteroFormula");
                $("#reglaFin"+i).removeClass("blink");
            }
        };
        var indexSeleccionado, tipoIndiceSeleccionado;
        this.props.actualizarEstadoSeleccionSinoNuevaRegla(false);
        if(this.props.reglas.length > 0) {
            if(this.props.reglas.length == 1) {
                indexSeleccionado = 0;
                if(objeto.localeCompare("arriba") == 0) {
                    $("#reglaInit").addClass("colorPunteroFormula");
                    $("#reglaInit").addClass("blink");
                    tipoIndiceSeleccionado = 'arriba';
                } else if(objeto.localeCompare("abajo") == 0) {
                    $("#reglaFin").addClass("colorPunteroFormula");
                    $("#reglaFin").addClass("blink");
                    tipoIndiceSeleccionado = 'abajo';
                } else {
                    $("#unicaRegla").css("border", "2px solid #F9D342");
                    if(this.props.reglas[0].esCondicion) {
                        tipoIndiceSeleccionado = 'esOtraRegla';
                        this.props.actualizarEstadoSeleccionSinoNuevaRegla(true);
                    } else {
                        tipoIndiceSeleccionado = 'esOtraFormula';
                    }
                }
            } else {
                indexSeleccionado = indiceI;
                if(objeto.localeCompare("arriba") == 0) {
                    $("#reglaInit"+indiceI).addClass("colorPunteroFormula");
                    $("#reglaInit"+indiceI).addClass("blink");
                    tipoIndiceSeleccionado = 'arriba';
                } else if(objeto.localeCompare("abajo") == 0) {
                    $("#reglaFin"+indiceI).addClass("colorPunteroFormula");
                    $("#reglaFin"+indiceI).addClass("blink");
                    tipoIndiceSeleccionado = 'abajo';
                } else {
                    $("#regla"+indiceI).css("border", "2px solid #F9D342");
                    if(this.props.reglas[indiceI].esCondicion) {
                        tipoIndiceSeleccionado = 'esOtraRegla';
                        this.props.actualizarEstadoSeleccionSinoNuevaRegla(true);
                    } else {
                        tipoIndiceSeleccionado = 'esOtraFormula';
                    }
                }
            }
            this.props.retornarIndiceSeleccionado(indexSeleccionado, tipoIndiceSeleccionado);
            this.props.retornarIndiceSeleccionadoParaMostrarCampoObjetivo(this.props.reglas[indiceI], tipoIndiceSeleccionado, indiceI, indiceJ);
        }
    }

    getColor (posicionSegmentoEnCampo, nivel) {
        if(colores[posicionSegmentoEnCampo]!=undefined) {
            if(colores[posicionSegmentoEnCampo][nivel]!=undefined) {
                colores = colores[posicionSegmentoEnCampo][nivel];
            } else {
                colores = colores[posicionSegmentoEnCampo][nivel%colores.length];
            }
        } else {
            if(colores[posicionSegmentoEnCampo][nivel]!=undefined) {
                colores = colores[posicionSegmentoEnCampo%colores.length][nivel];
            } else {
                colores = colores[posicionSegmentoEnCampo%colores.length][nivel%colores.length];
            }
        }
    }

    render() {
        /*console.log('this.props.reglas');
        console.log(this.props.reglas);*/
        return (
            <div>
                {
                    this.props.reglas.length == 0
                    ?
                        <div style={{width: "100%", height: "100%"}}>
                            <div className={"font-20"} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                No existen reglas creadas
                            </div>
                            <br/>
                        </div>
                    : null
                }
                {
                    this.props.reglas.length == 1 && this.props.reglas[0].length == 1
                    ?
                        <div style={{width: "100%", height: "100%"}}>
                            {
                                !this.props.reglas[0][0].esCondicion
                                ?
                                    <div id={"reglaInit"} onClick={() => this.seleccionRegla(0, "arriba", 0)} className={"highlightFormulaBackground addPointer"} style={{width: "100%", height: "10px"}}>
                                    </div>
                                    : null
                            }
                            <div onClick={() => this.seleccionRegla(0, "reglaUnica", 0)} className="row" style={{width: "100%", margin: "1% 0% 1% 0%"}}>
                                <div id="unicaRegla" className="addPointer font-20 textoRegla" style={{backgroundColor: "#"+this.getColor(regla.posicionSegmentoEnCampo, regla.nivel), borderRadius: "15px", padding: "0% 2%", width: "100%", marginLeft: "auto", marginRight: "0"}}>
                                    {
                                        this.props.reglas[0][0].esCondicion
                                        ? "SI "
                                        : ""
                                    }
                                    {this.props.reglas[0][0].texto}
                                </div>
                            </div>
                            <div id={"reglaFin"} onClick={() => this.seleccionRegla(0, "abajo", 0)} className={"highlightFormulaBackground addPointer"} style={{width: "100%", height: "10px"}}>
                            </div>
                            <br/>
                        </div>
                    : null
                }
                {
                    this.props.reglas.length > 1
                    ?
                        <div style={{width: "100%", height: "100%", overflowX: "scroll"}}>
                            {this.props.reglas.map((reglaSegmento, i) => (
                                <div style={{width: "100%", height: "100%"}}>
                                    {reglaSegmento.map((regla, j) => (
                                        <div style={{width: "100%", height: "100%"}}>
                                            {
                                                j == 0
                                                ?
                                                    <div style={{width: "100%", height: "100%"}}>
                                                        {
                                                            !regla.esCondicion
                                                            ?
                                                                <div id={"reglaInit"+i+""+j} onClick={() => this.seleccionRegla(i, "arriba", j)} className={"highlightFormulaBackground addPointer"} style={{width: "100%", height: "10px"}}>
                                                                </div>
                                                            : null
                                                        }
                                                        <div onClick={() => this.seleccionRegla(i, "condicion", j)} className="row" style={{width: "100%", margin: "1% 0% 1% 0%"}}>
                                                            <div id={"regla"+i+""+j} className="addPointer font-20 textoRegla" style={{backgroundColor: "#"+this.getColor(regla.posicionSegmentoEnCampo, regla.nivel), borderRadius: "15px", padding: "0% 2%", width: 100-(this.props.reglas[i].nivel*10)+"%", marginLeft: "auto", marginRight: "0"}}>
                                                                {
                                                                    regla.esCondicion
                                                                    ? "SI "
                                                                    : ""
                                                                }
                                                                {this.props.reglas[i].texto}
                                                            </div>
                                                        </div>
                                                        {
                                                            regla.ultimoSiAnidado
                                                            ?
                                                                <div id={"reglaFin"+i+""+j} onClick={() => this.seleccionRegla(i, "abajo", j)} className={"highlightFormulaBackground addPointer"} style={{width: "100%", height: "10px"}}>
                                                                </div>
                                                            : null
                                                        }
                                                    </div>
                                                :
                                                    <div style={{width: "100%", height: "100%"}}>
                                                        {
                                                            !regla.esCondicion
                                                            ?
                                                                <div id={"reglaInit"+i+""+j} onClick={() => this.seleccionRegla(i, "arriba", j)} className={"highlightFormulaBackground addPointer"} style={{width: "100%", height: "10px"}}>
                                                                </div>
                                                            : null
                                                        }
                                                        <div onClick={() => this.seleccionRegla(i, "condicion")} className="row" style={{width: "100%", margin: "1% 0% 1% 0%"}}>
                                                            <div id={"regla"+i+""+j} className="addPointer font-20 textoRegla" style={{backgroundColor: "#"+this.getColor(regla.posicionSegmentoEnCampo, regla.nivel), borderRadius: "15px", padding: "0% 2%", width: 100-(this.props.reglas[i].nivel*10)+"%", marginLeft: "auto", marginRight: "0"}}>
                                                                {
                                                                    regla.esCondicion
                                                                    ? "SI "
                                                                    : ""
                                                                }
                                                                {this.props.reglas[i].texto}
                                                            </div>
                                                        </div>
                                                        {
                                                            regla.ultimoSiAnidado
                                                            ?
                                                                <div id={"reglaFin"+i+""+j} onClick={() => this.seleccionRegla(i, "abajo", j)} className={"highlightFormulaBackground addPointer"} style={{width: "100%", height: "10px"}}>
                                                                </div>
                                                            : null
                                                        }
                                                    </div>
                                            }
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <br/>
                        </div>
                    : null
                }
            </div>
        );
    }
}
