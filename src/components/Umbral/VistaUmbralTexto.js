import React from 'react';

export default class VistaUmbralTexto extends React.Component {
    constructor(props) {
        super(props);
        /*this.state = {
            showLoadingScreen: false,
            mensajeLoadingScreen: ''
        }
        this.showLoadingScreen = this.showLoadingScreen.bind(this);*/
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseExit = this.mouseExit.bind(this);
    }

    mouseOver(nombre) {
        console.log("EMTRE")
        console.log(nombre)
        $("."+nombre.replace(/ /g,'')+"Slider").addClass("highlightSeccionUmbralSlider");
        $("."+nombre.replace(/ /g,'')+"Texto").addClass("highlightSeccionUmbralTexto");
    }

    mouseExit(nombre) {
        console.log("ADIOS")
        console.log(nombre)
        $("."+nombre.replace(/ /g,'')+"Slider").removeClass("highlightSeccionUmbralSlider");
        $("."+nombre.replace(/ /g,'')+"Texto").removeClass("highlightSeccionUmbralTexto");
    }
    
    render() {
        return (
            <div style={{width: "100%"}}>
                <br/><br/>
                {this.props.umbrales.map((umbral, i) =>
                    <div onMouseEnter={() => this.mouseOver(umbral.nombre)} onMouseLeave={() => this.mouseExit(umbral.nombre)} className={"row "+umbral.nombre.replace(/ /g,'')+"Texto"} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}} key={i}>
                        <div style={{height: "1em", width: "1em", backgroundColor: umbral.color, marginRight: "3%"}}></div>
                        <div> {umbral.nombre} </div>
                    </div>
                )}
                { this.props.umbrales.length == 0 ? (
                    <div className="row" style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <div style={{height: "1em", width: "1em", backgroundColor: "#9e9e9e", marginRight: "3%"}}></div>
                        <div> No existe sección para este umbral. </div>
                    </div>
                ) : (
                    <span></span>
                )}
            </div>
        );
    }
}
