import React from 'react';

export default class IndicadorCeldaEquacion extends React.Component {
    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <div style={{height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", float: "left"}} onClick={(e) => {e.persist(); this.props.clickEnFormula(e, this.props.variable.posicion, this.props.variable.valor, this.props.index)}}>
                    <div id={ (this.props.variable.posicion.localeCompare("izquierda") == 0 ? "indicadorIzquierda" : "indicadorDerecha") +this.props.variable.valor} className={"highlightFormulaBackground"} style={{height: "80%", width: "100%", }} onClick={(e) => {e.persist(); this.props.clickEnFormula(e, this.props.variable.posicion, this.props.variable.valor, this.props.index)}}>
                    </div>
                </div>
            </div>
        );
    }
}
