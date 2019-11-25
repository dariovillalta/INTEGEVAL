import React from 'react';

import VistaUmbral from './VistaUmbral.js';
import UmbralOpciones from './UmbralOpciones.js';

const secciones = [{nombre: "MONO 1", color: "#00c853", width: "25%"}, {nombre: "MONO 2", color: "#ffab40", width: "50%"}, {nombre: "MONO 1", color: "#00c853", width: "25%"}];

export default class Umbral extends React.Component {
    constructor(props) {
        super(props);
        /*this.state = {
            showLoadingScreen: false,
            mensajeLoadingScreen: ''
        }
        this.showLoadingScreen = this.showLoadingScreen.bind(this);*/
        console.log(this.props.navbar)
    }

    render() {
        return (
            <div>
                {this.props.navbar}
                <VistaUmbral umbrales={secciones}> </VistaUmbral>
                <UmbralOpciones> </UmbralOpciones>
            </div>
        );
    }
}
