import React from 'react';

import CeldaEquacion from './CeldaEquacion.js';

export default class Equacion extends React.Component {
    render() {
        return (
            <div style={{height: this.props.height, width: this.props.width, cursor: "pointer", backgroundColor: "#292826"}}>
                {this.props.formula.map((variable, i) => (
                    <CeldaEquacion clickEnFormula={this.props.clickEnFormula} variable={variable} key={variable.valor+""+i} height={variable.height} width={variable.width} formula={this.props.formula} index={i} isFirstRow={this.props.isFirstRow}></CeldaEquacion>
                ))}
                {
                    this.props.formula.length == 0
                    ? 
                        <div style={{height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}} onClick={(e) => {e.persist(); this.props.clickEnFormula(e, "empty", {}, 0)}}>
                            <div style={{height: "100%", width: "5%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <div id={"indicadorFormulaVacia"} className={"highlightFormulaBackground"} style={{height: "80%", width: "100%", }}>
                                </div>
                            </div>
                        </div>
                    : null
                }
            </div>
        );
    }
}
