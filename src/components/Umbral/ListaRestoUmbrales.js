import React from 'react';

export default function ListaRestoUmbrales(props) {
    return (
        <div className="row">
            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                <div className={"card"}>
                    <div className={"card-body"}>
                        {props.lista.map((variable, i) =>
                            <div key={variable.ID}>
                                <div className={"row border-top border-bottom addPaddingToConfig"}>
                                    <div style={{height: "20px", width: "100%"}}> </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 font-bold font-24"}>
                                            {variable.nombre}
                                        </div>
                                    </div>
                                    <div style={{height: "10px", width: "100%"}}> </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"} style={{padding: "0px", border: "1px solid #d2d2e4"}}>
                                            <div style={{height: "30px", width: variable.peso+"%", background: "#81d4fa"}}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center"}>
                                            <label className="col-form-label">Peso: {variable.peso}</label>
                                        </div>
                                    </div>
                                    <div style={{height: "20px", width: "100%"}}> </div>
                                </div>
                                <br/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}