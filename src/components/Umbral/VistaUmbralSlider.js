import React from 'react';

export default class VistaUmbralSlider extends React.Component {
    constructor(props) {
        super(props);
        /*this.state = {
            showLoadingScreen: false,
            mensajeLoadingScreen: ''
        }*/
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseExit = this.mouseExit.bind(this);
    }

    mouseOver(nombre) {
        $("."+nombre.replace(/ /g,'')+"Slider").addClass("highlightSeccionUmbralSlider");
        $("."+nombre.replace(/ /g,'')+"Texto").addClass("highlightSeccionUmbralTexto");
    }

    mouseExit(nombre) {
        $("."+nombre.replace(/ /g,'')+"Slider").removeClass("highlightSeccionUmbralSlider");
        $("."+nombre.replace(/ /g,'')+"Texto").removeClass("highlightSeccionUmbralTexto");
    }
    
    render() {
        return (
            <div style={{width: "100%"}}>
                <div className="row" style={{width: "100%"}}>
                    <div className="slider" style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "5%"}}>
                        {this.props.umbrales.map((umbral, i) => {
                            if(i == 0) {
                                return  <div onMouseEnter={() => this.mouseOver(umbral.nombre)} onMouseLeave={() => this.mouseExit(umbral.nombre)} className={"sliderInicio "+umbral.nombre.replace(/ /g,'')+"Slider"} style={{width: umbral.width+"%", background: umbral.color}} key={i}>
                                            <span style={{float: "left", marginLeft: "2%", color: "#000", textShadow: "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"}}>
                                                {umbral.valorMinimo}
                                            </span>
                                            <span style={{float: "right", marginRight: "2%", color: "#000", textShadow: "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"}}>
                                                {umbral.valorMaximo}
                                            </span>
                                        </div>;
                            } else if (i != this.props.umbrales.length-1) {
                                return  <div onMouseEnter={() => this.mouseOver(umbral.nombre)} onMouseLeave={() => this.mouseExit(umbral.nombre)} className={"sliderItemEnmedio "+umbral.nombre.replace(/ /g,'')+"Slider"} style={{width: umbral.width+"%", background: umbral.color}} key={i}>
                                            <span style={{float: "left", marginLeft: "2%", color: "#000", textShadow: "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"}}>
                                                {umbral.valorMinimo}
                                            </span>
                                            <span style={{float: "right", marginRight: "2%", color: "#000", textShadow: "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"}}>
                                                {umbral.valorMaximo}
                                            </span>
                                        </div>;
                            } else {
                                return  <div onMouseEnter={() => this.mouseOver(umbral.nombre)} onMouseLeave={() => this.mouseExit(umbral.nombre)} className={"sliderFin "+umbral.nombre.replace(/ /g,'')+"Slider"} style={{width: umbral.width+"%", background: umbral.color}} key={i}>
                                            <span style={{float: "left", marginLeft: "2%", color: "#000", textShadow: "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"}}>
                                                {umbral.valorMinimo}
                                            </span>
                                            <span style={{float: "right", marginRight: "2%", color: "#000", textShadow: "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"}}>
                                                {umbral.valorMaximo}
                                            </span>
                                        </div>;
                            }

                        })}
                        { this.props.umbrales.length == 0 ? (
                            <div className="sliderVacio" style={{width: "100%"}}></div>
                        ) : (
                            <span></span>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
