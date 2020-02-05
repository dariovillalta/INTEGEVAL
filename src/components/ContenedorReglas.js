import React from 'react';

export default class ContenedorReglas extends React.Component {
    constructor(props) {
        super(props);
        this.seleccionRegla = this.seleccionRegla.bind(this);
    }

    seleccionRegla(index, objeto) {
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
                    if(this.props.reglas[index].esCondicion)
                        tipoIndiceSeleccionado = 'esOtraRegla';
                    else
                        tipoIndiceSeleccionado = 'esOtraFormula';
                }
            } else {
                indexSeleccionado = index;
                if(objeto.localeCompare("arriba") == 0) {
                    $("#reglaInit"+index).addClass("colorPunteroFormula");
                    $("#reglaInit"+index).addClass("blink");
                    tipoIndiceSeleccionado = 'arriba';
                } else if(objeto.localeCompare("abajo") == 0) {
                    $("#reglaFin"+index).addClass("colorPunteroFormula");
                    $("#reglaFin"+index).addClass("blink");
                    tipoIndiceSeleccionado = 'abajo';
                } else {
                    $("#regla"+index).css("border", "2px solid #F9D342");
                    if(this.props.reglas[index].esCondicion)
                        tipoIndiceSeleccionado = 'esOtraRegla';
                    else
                        tipoIndiceSeleccionado = 'esOtraFormula';
                }
            }
            this.props.retornarIndiceSeleccionado(indexSeleccionado, tipoIndiceSeleccionado);
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
                    this.props.reglas.length == 1
                    ?
                        <div style={{width: "100%", height: "100%"}}>
                            <div id={"reglaInit"} onClick={() => this.seleccionRegla("arriba")} className={"highlightFormulaBackground addPointer"} style={{width: "100%", height: "10px"}}>
                            </div>
                            <div onClick={() => this.seleccionRegla("reglaUnica")} className="row" style={{width: "100%", margin: "1% 0% 1% 0%"}}>
                                <div id="unicaRegla" className="addPointer" style={{backgroundColor: "white", borderRadius: "15px", padding: "0% 2%", width: "100%", marginLeft: "auto", marginRight: "0"}}>
                                    {this.props.reglas[0].texto}
                                </div>
                            </div>
                            <div id={"reglaFin"} onClick={() => this.seleccionRegla("abajo")} className={"highlightFormulaBackground addPointer"} style={{width: "100%", height: "10px"}}>
                            </div>
                            <br/>
                        </div>
                    : null
                }
                {
                    this.props.reglas.length > 1
                    ?
                        <div style={{width: "100%", height: "100%", overflowX: "scroll"}}>
                            {this.props.reglas.map((regla, i) => (
                                <div style={{width: "100%", height: "100%"}}>
                                    {
                                        i == 0
                                        ?
                                            <div style={{width: "100%", height: "100%"}}>
                                                <div id={"reglaInit"+i} onClick={() => this.seleccionRegla(i, "arriba")} className={"highlightFormulaBackground addPointer"} style={{width: "100%", height: "10px"}}>
                                                </div>
                                                <div onClick={() => this.seleccionRegla(i, "condicion")} className="row" style={{width: "100%", margin: "1% 0% 1% 0%"}}>
                                                    <div id={"regla"+i} className="addPointer" style={{backgroundColor: "white", borderRadius: "15px", padding: "0% 2%", width: "100%", marginLeft: "auto", marginRight: "0"}}>
                                                        {this.props.reglas[i].texto}
                                                    </div>
                                                </div>
                                                <div id={"reglaFin"+i} onClick={() => this.seleccionRegla(i, "abajo")} className={"highlightFormulaBackground addPointer"} style={{width: "100%", height: "10px"}}>
                                                </div>
                                            </div>
                                        :
                                            <div style={{width: "100%", height: "100%"}}>
                                                <div onClick={() => this.seleccionRegla(i, "condicion")} className="row" style={{width: "100%", margin: "1% 0% 1% 0%"}}>
                                                    <div id={"regla"+i} className="addPointer" style={{backgroundColor: "white", borderRadius: "15px", padding: "0% 2%", width: 100-(this.props.reglas[i].nivel*10)+"%", marginLeft: "auto", marginRight: "0"}}>
                                                        {this.props.reglas[i].texto}
                                                    </div>
                                                </div>
                                                <div id={"reglaFin"+i} onClick={() => this.seleccionRegla(i, "abajo")} className={"highlightFormulaBackground addPointer"} style={{width: "100%", height: "10px"}}>
                                                </div>
                                            </div>
                                    }
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
