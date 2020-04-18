import React from 'react';

export default class VariableCeldaEquacion extends React.Component {
    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <div style={{height: "100%", width: "5%", display: "flex", alignItems: "center", justifyContent: "center", float: "left"}}>
                    <div id={"indicadorIzquierda"+this.props.variable.valor+this.props.index} className={"highlightFormulaBackground"} style={{height: "80%", width: "100%", }} onClick={(e) => {e.persist(); this.props.clickEnFormula(e, "izquierda", this.props.variable.valor, this.props.index)}}>
                    </div>
                </div>
                <div style={{height: "100%", width: "90%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "100%", float: "left", color: "white", padding: "5px"}}>
                    <div className={"highlightFormulaBackground" + (this.props.variable.activa ? ' formulaActive': '')} style={{height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "100%", borderRadius: "25px"}} onClick={(e) => {e.persist(); this.props.clickEnFormula(e, null, this.props.variable.valor, this.props.index)}}>
                        <p className={"highlightFormulaText"}>{this.props.variable.valor}</p>
                    </div>
                </div>
                <div style={{height: "100%", width: "5%", display: "flex", alignItems: "center", justifyContent: "center", float: "left"}}>
                    <div id={"indicadorDerecha"+this.props.variable.valor+this.props.index} className={"highlightFormulaBackground"} style={{height: "80%", width: "100%"}} onClick={(e) => {e.persist(); this.props.clickEnFormula(e, "derecha", this.props.variable.valor, this.props.index)}}>
                    </div>
                </div>
            </div>
        );
    }
}
