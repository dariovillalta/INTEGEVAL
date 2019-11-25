import React from 'react';

import CeldaEquacion from './CeldaEquacion.js';

export default class Equacion extends React.Component {
    render() {
        return (
            <div style={{height: this.props.height, width: this.props.width, cursor: "pointer", backgroundColor: "#292826"}}>
                {this.props.formula.map((variable, i) => (
                    <CeldaEquacion clickEnFormula={this.props.clickEnFormula} variable={variable} key={variable.nombre} height={variable.height} width={variable.width} formula={this.props.formula} index={i} isFirstRow={this.props.isFirstRow}></CeldaEquacion>
                ))}
            </div>
        );
    }
}
