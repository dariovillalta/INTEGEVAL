import React from 'react';

export default class VistaUmbralSlider extends React.Component {
    constructor(props) {
        super(props);
        /*this.state = {
            showLoadingScreen: false,
            mensajeLoadingScreen: ''
        }*/
        //this.showLoadingScreen = this.showLoadingScreen.bind(this);
    }

    mouseOver() {
        console.log("Mouse over!!!");
    }
    
    render() {
        return (
            <div style={{width: "100%"}}>
                <div className="row" style={{width: "100%"}}>
                    <div className="slider" style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "5%"}}>
                        {this.props.umbrales.map((umbral, i) => {
                            if(i == 0) {
                                return <div className={"sliderInicio "+umbral.nombre.replace(/ /g,'')+"Slider"} style={{width: umbral.width+"%", background: umbral.color}} key={i}></div>;
                            } else if (i != this.props.umbrales.length-1) {
                                return <div className={"sliderItemEnmedio "+umbral.nombre.replace(/ /g,'')+"Slider"} style={{width: umbral.width+"%", background: umbral.color}} key={i}></div>;
                            } else {
                                return <div className={"sliderFin "+umbral.nombre.replace(/ /g,'')+"Slider"} style={{width: umbral.width+"%", background: umbral.color}} key={i}></div>;
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
