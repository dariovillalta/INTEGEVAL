import React from 'react';

/*var colores = [
                ["d50000", "d32f2f", "ff1744", "ef5350", "e57373", "ef9a9a", "ffcdd2"],
                ["ffd600", "fbc02d", "ffff00", "fdd835", "fff176", "fff59d", "fff9c4"],
                ["e65100", "ff6d00", "ef6c00", "ffa726", "ffb74d", "ffcc80", "ffe0b2"],
                ["880e4f", "c51162", "f50057", "ff4081", "ec407a", "f06292", "f48fb1"],
                ["1b5e20", "2e7d32", "388e3c", "4caf50", "81c784", "a5d6a7", "c8e6c9"],
                ["0d47a1", "1565c0", "1e88e5", "2196f3", "42a5f5", "64b5f6", "90caf9"],
                ["37474f", "546e7a", "607d8b", "78909c", "90a4ae", "b0bec5", "cfd8dc"],
                ["006064", "00838f", "0097a7", "00acc1", "4dd0e1", "80deea", "b2ebf2"],
                ["33691e", "558b2f", "689f38", "7cb342", "8bc34a", "aed581", "c5e1a5"],
            ];*/
var colores = ["ff1744", "1e88e5", "fdd835", "ff6d00", "ff4081", "4caf50", "607d8b", "4dd0e1", "558b2f" ];
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
        $("#unicaRegla").removeClass("blink");
        for (var i = 0; i < this.props.reglas.length; i++) {
            if(this.props.reglas.length == 1 && this.props.reglas[0] != undefined && this.props.reglas[0].length == 1) {
                console.log('YEAH1')
                $("#reglaInit"+i).removeClass("colorPunteroFormula");
                $("#reglaInit"+i).removeClass("blink");
                $("#reglaFin"+i).removeClass("colorPunteroFormula");
                $("#reglaFin"+i).removeClass("blink");
            } else {
                console.log('YEAH2')
                for (var j = 0; j < this.props.reglas[i].length; j++) {
                    console.log('j = '+j)
                    $("#regla"+i+j).css("border", "initial");
                    $("#regla"+i+j).removeClass("blink");
                    $("#reglaInit"+i+j).removeClass("colorPunteroFormula");
                    $("#reglaInit"+i+j).removeClass("blink");
                    $("#reglaFin"+i+j).removeClass("colorPunteroFormula");
                    $("#reglaFin"+i+j).removeClass("blink");
                }
            }
        };
        var indexSeleccionadoSegmento, indexSeleccionadoRegla, tipoIndiceSeleccionado;
        this.props.actualizarEstadoSeleccionSinoNuevaRegla(false);
        if(this.props.reglas.length > 0) {
            if(this.props.reglas.length == 1 && this.props.reglas[0] != undefined && this.props.reglas[0].length == 1) {
                indexSeleccionadoSegmento = 0;
                indexSeleccionadoRegla = 0;
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
                    $("#unicaRegla").addClass("blink");
                    if(this.props.reglas[0][0].esCondicion && this.props.reglas[0][0].operacion.localeCompare("ELSE") != 0) {
                        tipoIndiceSeleccionado = 'esOtraRegla';
                        this.props.actualizarEstadoSeleccionSinoNuevaRegla(true);
                    } else {
                        tipoIndiceSeleccionado = 'esOtraFormula';
                    }
                }
            } else {
                indexSeleccionadoSegmento = indiceI;
                indexSeleccionadoRegla = indiceJ;
                if(objeto.localeCompare("arriba") == 0) {
                    $("#reglaInit"+indiceI+indiceJ).addClass("colorPunteroFormula");
                    $("#reglaInit"+indiceI+indiceJ).addClass("blink");
                    tipoIndiceSeleccionado = 'arriba';
                } else if(objeto.localeCompare("abajo") == 0) {
                    $("#reglaFin"+indiceI+indiceJ).addClass("colorPunteroFormula");
                    $("#reglaFin"+indiceI+indiceJ).addClass("blink");
                    tipoIndiceSeleccionado = 'abajo';
                } else {
                    $("#regla"+indiceI+indiceJ).css("border", "2px solid #F9D342");
                    $("#regla"+indiceI+indiceJ).addClass("blink");
                    if(this.props.reglas[indiceI][indiceJ].esCondicion && this.props.reglas[indiceI][indiceJ].operacion.localeCompare("ELSE") != 0) {
                        tipoIndiceSeleccionado = 'esOtraRegla';
                        this.props.actualizarEstadoSeleccionSinoNuevaRegla(true);
                    } else {
                        tipoIndiceSeleccionado = 'esOtraFormula';
                    }
                }
            }
            this.props.retornarIndiceSeleccionado(indexSeleccionadoSegmento, indexSeleccionadoRegla, tipoIndiceSeleccionado);
            this.props.retornarIndiceSeleccionadoParaMostrarCampoObjetivo(this.props.reglas[indiceI], tipoIndiceSeleccionado, indiceI, indiceJ);
        }
    }

    getColor (posicionSegmentoEnCampo, nivel) {
        /*console.log('posicionSegmentoEnCampo');
        console.log(posicionSegmentoEnCampo);
        console.log('nivel');
        console.log(nivel);
        if(colores[posicionSegmentoEnCampo]!=undefined) {
            if(colores[posicionSegmentoEnCampo][nivel]!=undefined) {
                return colores[posicionSegmentoEnCampo][nivel];
                console.log('color');
                console.log(colores[posicionSegmentoEnCampo][nivel]);
                console.log(colores[posicionSegmentoEnCampo]);
                console.log(colores);
            } else {
                return colores[posicionSegmentoEnCampo][nivel%colores.length];
                console.log('color');
                console.log(colores[posicionSegmentoEnCampo][nivel%colores.length]);
            }
        } else {
            if(colores[posicionSegmentoEnCampo][nivel]!=undefined) {
                return colores[posicionSegmentoEnCampo%colores.length][nivel];
                console.log('color');
                console.log(colores[posicionSegmentoEnCampo%colores.length][nivel]);
            } else {
                return colores[posicionSegmentoEnCampo%colores.length][nivel%colores.length];
                console.log('color');
                console.log(colores[posicionSegmentoEnCampo%colores.length][nivel%colores.length]);
            }
        }*/
        if(colores[posicionSegmentoEnCampo]!=undefined) {
            return colores[posicionSegmentoEnCampo];
        } else {
            return colores[posicionSegmentoEnCampo%colores.length];
        }
    }

    render() {
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
                            <div onClick={() => this.seleccionRegla(0, "reglaUnica", 0)} className="row" style={{width: "100%", margin: "1% 0% 1% 0%"}}>
                                <div id="unicaRegla" className="addPointer font-20 textoRegla" style={{backgroundColor: "#"+this.getColor(this.props.reglas[0][0].posicionSegmentoEnCampo, this.props.reglas[0][0].nivel), borderRadius: "15px", padding: "0% 2%", width: "100%", marginLeft: "auto", marginRight: "0", fontFamily: "Arial Black, Gadget, sans-serif"}}>
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
                    (this.props.reglas.length >= 1 && this.props.reglas[0].length > 1) || this.props.reglas.length > 1
                    ?
                        <div style={{width: "100%", height: "100%", overflowX: "scroll"}}>
                            {this.props.reglas.map((reglaSegmento, i) => (
                                <div key={i} style={{width: "100%", height: "100%"}}>
                                    {reglaSegmento.map((regla, j) => (
                                        <div key={i+""+j} style={{width: "100%", height: "100%"}}>
                                            <div style={{width: "100%", height: "100%"}}>
                                                <div onClick={() => this.seleccionRegla(i, "condicion", j)} className="row" style={{width: "100%", margin: "1% 0% 1% 0%"}}>
                                                    <div id={"regla"+i+""+j} className="addPointer font-20 textoRegla" style={{backgroundColor: "#"+this.getColor(i, regla.nivel), borderRadius: "15px", padding: "0% 2%", width: 100-(this.props.reglas[i][j].nivel*10)+"%", marginLeft: "auto", marginRight: "0", fontFamily: "Arial Black, Gadget, sans-serif"}}>
                                                        {
                                                            regla.esCondicion
                                                            ? "SI "
                                                            : ""
                                                        }
                                                        {this.props.reglas[i][j].texto}
                                                    </div>
                                                </div>
                                                {
                                                    i == this.props.reglas.length-1 && j == reglaSegmento.length-1
                                                    ?
                                                        <div id={"reglaFin"+i+""+j} onClick={() => this.seleccionRegla(i, "abajo", j)} className={"highlightFormulaBackground addPointer"} style={{width: "100%", height: "10px"}}>
                                                        </div>
                                                    : null
                                                }
                                            </div>
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
/*{
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
                <div id="unicaRegla" className="addPointer font-20 textoRegla" style={{backgroundColor: "#"+this.getColor(this.props.reglas[0][0].posicionSegmentoEnCampo, this.props.reglas[0][0].nivel), borderRadius: "15px", padding: "0% 2%", width: "100%", marginLeft: "auto", marginRight: "0", fontFamily: "Arial Black, Gadget, sans-serif"}}>
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
    (this.props.reglas.length >= 1 && this.props.reglas[0].length > 1) || this.props.reglas.length > 1
    ?
        <div style={{width: "100%", height: "100%", overflowX: "scroll"}}>
            {this.props.reglas.map((reglaSegmento, i) => (
                <div key={i} style={{width: "100%", height: "100%"}}>
                    {reglaSegmento.map((regla, j) => (
                        <div key={i+""+j} style={{width: "100%", height: "100%"}}>
                            <div style={{width: "100%", height: "100%"}}>
                                {
                                    !regla.esCondicion && j == 0
                                    ?
                                        <div id={"reglaInit"+i+""+j} onClick={() => this.seleccionRegla(i, "arriba", j)} className={"highlightFormulaBackground addPointer"} style={{width: "100%", height: "10px"}}>
                                        </div>
                                    : null
                                }
                                <div onClick={() => this.seleccionRegla(i, "condicion", j)} className="row" style={{width: "100%", margin: "1% 0% 1% 0%"}}>
                                    <div id={"regla"+i+""+j} className="addPointer font-20 textoRegla" style={{backgroundColor: "#"+this.getColor(i, regla.nivel), borderRadius: "15px", padding: "0% 2%", width: 100-(this.props.reglas[i][j].nivel*10)+"%", marginLeft: "auto", marginRight: "0", fontFamily: "Arial Black, Gadget, sans-serif"}}>
                                        {
                                            regla.esCondicion
                                            ? "SI "
                                            : ""
                                        }
                                        {this.props.reglas[i][j].texto}
                                    </div>
                                </div>
                                {
                                    i == this.props.reglas.length-1 && j == reglaSegmento.length-1
                                    ?
                                        <div id={"reglaFin"+i+""+j} onClick={() => this.seleccionRegla(i, "abajo", j)} className={"highlightFormulaBackground addPointer"} style={{width: "100%", height: "10px"}}>
                                        </div>
                                    : null
                                }
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <br/>
        </div>
    : null
}*/