import React from 'react';

export default class FuenteDatoForma extends React.Component {
    render() {
        return (
            <div>
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                        <label htmlFor="ubicacionArchivo" className="col-form-label">TIPO DE VARIABLE:</label>
                    </div>
                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <input id="ubicacionArchivo" type="text" className="form-control form-control-sm"/>
                    </div>
                </div>
            </div>
        );
    }
}
