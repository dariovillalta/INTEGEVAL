import React from 'react';

export default class IndicadorCeldaEquacion extends React.Component {
    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <div style={{height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", float: "left"}}>
                    <div id={ (this.props.variable.posicion.localeCompare("izquierda") == 0 ? "indicadorIzquierdaDiv" : "indicadorDerechaDiv") +this.props.variable.identificadorIndicador} className={"highlightFormulaBackground"} style={{height: "80%", width: "100%", }} onClick={(e) => {e.persist(); this.props.clickEnFormula(e, (this.props.variable.posicion.localeCompare("izquierda") == 0 ? "indicadorIzq" : "indicadorDer"), this.props.variable.identificadorIndicador, this.props.index)}}>
                    </div>
                </div>
            </div>
        );
    }
}
