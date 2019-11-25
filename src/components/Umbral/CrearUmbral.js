import React from 'react';

export default class CrearUmbral extends React.Component {
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
            <div style={{width: "100%", height: "100%"}}>
                <div className={"row"}>
                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                        <label htmlFor="inputSmall" className="col-form-label">Crear</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                        <input id="inputSmall" type="text" className="form-control form-control-sm"/>
                    </div>
                </div>
            </div>
        );
    }
}
