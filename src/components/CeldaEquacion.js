import React from 'react';

import Equacion from './Equacion.js';
import VariableCeldaEquacion from './VariableCeldaEquacion.js';
import SignoCeldaEquacion from './SignoCeldaEquacion.js';
import DivisionCeldaEquacion from './DivisionCeldaEquacion.js';
import IndicadorCeldaEquacion from './IndicadorCeldaEquacion.js';

export default class CeldaEquacion extends React.Component {
    render() {
        console.log('this.props.formula.length')
        console.log(this.props.formula.length)
        console.log(this.props.formula)
        return (
            <div style={{width: this.props.width, height: this.props.height, float: (this.props.index != this.props.formula.length-1) ? "left": "right"}}>
                { Array.isArray(this.props.variable.valor) ? (
                    <Equacion formula={this.props.variable.valor} clickEnFormula={this.props.clickEnFormula} isFirstRow={false} height={"100%"} width={"100%"}></Equacion>
                ) : (
                    <div id={"fondo"+this.props.variable.valor} style={{height: "100%", width: "100%"}} onClick={(e) => {e.persist(); this.props.clickEnFormula(e, null, this.props.variable.valor, this.props.index)}}>
                        {
                            this.props.variable.tipo.localeCompare("variable") == 0
                            ? <VariableCeldaEquacion variable={this.props.variable} clickEnFormula={this.props.clickEnFormula} index={this.props.index}></VariableCeldaEquacion>
                            : null
                        }
                        {
                            this.props.variable.tipo.localeCompare("signo") == 0
                            ? <SignoCeldaEquacion variable={this.props.variable} clickEnFormula={this.props.clickEnFormula} index={this.props.index}></SignoCeldaEquacion>
                            : null
                        }
                        {
                            this.props.variable.tipo.localeCompare("division\\") == 0
                            ? <DivisionCeldaEquacion variable={this.props.variable} clickEnFormula={this.props.clickEnFormula} index={this.props.index}></DivisionCeldaEquacion>
                            : null
                        }
                        {
                            this.props.variable.tipo.localeCompare("indicador") == 0
                            ? <IndicadorCeldaEquacion variable={this.props.variable} clickEnFormula={this.props.clickEnFormula} index={this.props.index}></IndicadorCeldaEquacion>
                            : null
                        }
                    </div>
                )}
            </div>
        );
    }
}
