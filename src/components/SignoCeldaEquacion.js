import React from 'react';

export default class SignoCeldaEquacion extends React.Component {
    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <div className={this.props.variable.nombre} style={{height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", padding: "5%"}}>
                    <div style={{height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "100%", borderRadius: "25px"}}>
                        <p>{this.props.variable.valor}</p>
                    </div>
                </div>
            </div>
        );
    }
}
