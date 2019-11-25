import React from 'react';

import VistaUmbralSlider from './VistaUmbralSlider.js';
import VistaUmbralTexto from './VistaUmbralTexto.js';

export default class VistaUmbral extends React.Component {
    constructor(props) {
        super(props);
        /*this.state = {
            showLoadingScreen: false,
            mensajeLoadingScreen: ''
        }
        this.showLoadingScreen = this.showLoadingScreen.bind(this);
        this.hideLoadingScreen = this.hideLoadingScreen.bind(this);*/
    }
    
    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>
                                <div className={"row border-top border-bottom addPaddingToConfig"}>
                                    <div style={{width: "100%"}}>
                                        <VistaUmbralSlider umbrales={this.props.umbrales}></VistaUmbralSlider>
                                    </div>
                                    <div style={{width: "100%"}}>
                                        <VistaUmbralTexto umbrales={this.props.umbrales}></VistaUmbralTexto>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
