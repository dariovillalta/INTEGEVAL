import React from 'react';

export default class Operacion extends React.Component {
    render() {
        /*if(this.props.esNumero) {
            return (
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card"}>
                            <h3 className={"card-header"}>Seleccionar Operacion</h3>
                            <div className={"card-body"}>
                                <div className={"row"}>
                                    <div className={"col-xl-3 offset-xl-1 col-3 offset-1"}>
                                        <label className={"custom-control custom-radio custom-control-inline"}>
                                            <input type="radio" value="<" name="operacionRadio" className={"custom-control-input"}/>
                                            <span className={"custom-control-label"}>
                                                <img src="./assets/equal-icons/lessThan.png" alt="" style={{height: "30px", width: "30px"}}/>
                                            </span>
                                        </label>
                                    </div>
                                    <div className={"col-xl-3 col-3"}>
                                        <label className={"custom-control custom-radio custom-control-inline"}>
                                            <input type="radio" value="<=" name="operacionRadio" className={"custom-control-input"}/>
                                            <span className={"custom-control-label"}>
                                                <img src="./assets/equal-icons/lessThanEqual.png" alt="" style={{height: "30px", width: "30px"}}/>
                                            </span>
                                        </label>
                                    </div>
                                    <div className={"col-xl-3 col-3"}>
                                        <label className={"custom-control custom-radio custom-control-inline"}>
                                            <input type="radio" value=">" name="operacionRadio" className={"custom-control-input"}/>
                                            <span className={"custom-control-label"}>
                                                <img src="./assets/equal-icons/greaterThanEqual.png" alt="" style={{height: "30px", width: "30px"}}/>
                                            </span>
                                        </label>
                                    </div>
                                    <div className={"col-xl-2 col-2"}>
                                        <label className={"custom-control custom-radio custom-control-inline"}>
                                            <input type="radio" value=">=" name="operacionRadio" className={"custom-control-input"}/>
                                            <span className={"custom-control-label"}>
                                                <img src="./assets/equal-icons/greater.png" alt="" style={{height: "30px", width: "30px"}}/>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <br/>
                                <div className={"row"}>
                                    <div className={"col-xl-3 offset-xl-4 col-3 offset-4"}>
                                        <label className={"custom-control custom-radio custom-control-inline"}>
                                            <input type="radio" value="==" name="operacionRadio" className={"custom-control-input"}/>
                                            <span className={"custom-control-label"}>
                                                <img src="./assets/equal-icons/equal.png" alt="" style={{height: "30px", width: "30px"}}/>
                                            </span>
                                        </label>
                                    </div>
                                    <div className={"col-xl-3 col-3"}>
                                        <label className={"custom-control custom-radio custom-control-inline"}>
                                            <input type="radio" value="!=" name="operacionRadio" className={"custom-control-input"}/>
                                            <span className={"custom-control-label"}>
                                                <img src="./assets/equal-icons/not equal.png" alt="" style={{height: "30px", width: "30px"}}/>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <h5 className={"card-header"} style={{margin: "0px", height: "0px"}}></h5>
                            <div className={"card-body"}>
                                <div className={"row"}>
                                    <div className={"col-xl-3 offset-xl-1 col-3 offset-1"}>
                                        <label className={"custom-control custom-radio custom-control-inline"}>
                                            <input type="radio" value="+" name="operacionRadio" className={"custom-control-input"}/>
                                            <span className={"custom-control-label"}>
                                                <img src="./assets/equal-icons/plus.png" alt="" style={{height: "30px", width: "30px"}}/>
                                            </span>
                                        </label>
                                    </div>
                                    <div className={"col-xl-3 col-3"}>
                                        <label className={"custom-control custom-radio custom-control-inline"}>
                                            <input type="radio" value="-" name="operacionRadio" className={"custom-control-input"}/>
                                            <span className={"custom-control-label"}>
                                                <img src="./assets/equal-icons/minus.png" alt="" style={{height: "30px", width: "30px"}}/>
                                            </span>
                                        </label>
                                    </div>
                                    <div className={"col-xl-3 col-3"}>
                                        <label className={"custom-control custom-radio custom-control-inline"}>
                                            <input type="radio" value="*" name="operacionRadio" className={"custom-control-input"}/>
                                            <span className={"custom-control-label"}>
                                                <img src="./assets/equal-icons/asterisk.png" alt="" style={{height: "30px", width: "30px"}}/>
                                            </span>
                                        </label>
                                    </div>
                                    <div className={"col-xl-2 col-2"}>
                                        <label className={"custom-control custom-radio custom-control-inline"}>
                                            <input type="radio" value="/" name="operacionRadio" className={"custom-control-input"}/>
                                            <span className={"custom-control-label"}>
                                                <img src="./assets/equal-icons/division.png" alt="" style={{height: "30px", width: "30px"}}/>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            );
        } else*/ if(this.props.esBoolean) {
            return (
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"border-bottom"} style={{width: "100%"}}>
                        <div className={"text-center"} style={{width: "100%", height: "100%"}}>
                            <div className={"font-18"} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                Seleccionar Operación
                            </div>
                            <label className={"custom-control custom-radio custom-control-inline"}>
                                <input type="radio" value="==" name="operacionRadio" className={"custom-control-input"} onClick={() => this.props.retornoSeleccionOperacion("ES IGUAL A")}/>
                                <span className={"custom-control-label"}>
                                    <img src="./assets/equal-icons/equal.png" alt="" style={{height: "30px", width: "30px"}}/>
                                </span>
                            </label>
                        </div>
                    </div>
                    <br/>
                </div>
            );
        } else if(this.props.esNumero || this.props.esFecha || this.props.esTexto) {
            return (
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"border-bottom"} style={{width: "100%", height: "100%"}}>
                        <div className={"font-18"} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            Seleccionar Operación
                        </div>
                        <div className={"row"}>
                            <div className={"col-xl-3 offset-xl-1 col-3 offset-1"}>
                                <label className={"custom-control custom-radio custom-control-inline"}>
                                    <input type="radio" value="<" name="operacionRadio" className={"custom-control-input"} onClick={() => this.props.retornoSeleccionOperacion("ES MENOR A")}/>
                                    <span className={"custom-control-label"}>
                                        <img src="./assets/equal-icons/lessThan.png" alt="" style={{height: "30px", width: "30px"}}/>
                                    </span>
                                </label>
                            </div>
                            <div className={"col-xl-3 col-3"}>
                                <label className={"custom-control custom-radio custom-control-inline"}>
                                    <input type="radio" value="<=" name="operacionRadio" className={"custom-control-input"} onClick={() => this.props.retornoSeleccionOperacion("ES MENOR O IGUAL A")}/>
                                    <span className={"custom-control-label"}>
                                        <img src="./assets/equal-icons/lessThanEqual.png" alt="" style={{height: "30px", width: "30px"}}/>
                                    </span>
                                </label>
                            </div>
                            <div className={"col-xl-3 col-3"}>
                                <label className={"custom-control custom-radio custom-control-inline"}>
                                    <input type="radio" value=">" name="operacionRadio" className={"custom-control-input"} onClick={() => this.props.retornoSeleccionOperacion("ES MAYOR O IGUAL A")}/>
                                    <span className={"custom-control-label"}>
                                        <img src="./assets/equal-icons/greaterThanEqual.png" alt="" style={{height: "30px", width: "30px"}}/>
                                    </span>
                                </label>
                            </div>
                            <div className={"col-xl-2 col-2"}>
                                <label className={"custom-control custom-radio custom-control-inline"}>
                                    <input type="radio" value=">=" name="operacionRadio" className={"custom-control-input"} onClick={() => this.props.retornoSeleccionOperacion("ES MAYOR A")}/>
                                    <span className={"custom-control-label"}>
                                        <img src="./assets/equal-icons/greater.png" alt="" style={{height: "30px", width: "30px"}}/>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <br/>
                        <div className={"row"}>
                            <div className={"col-xl-3 offset-xl-4 col-3 offset-4"}>
                                <label className={"custom-control custom-radio custom-control-inline"}>
                                    <input type="radio" value="==" name="operacionRadio" className={"custom-control-input"} onClick={() => this.props.retornoSeleccionOperacion("ES IGUAL A")}/>
                                    <span className={"custom-control-label"}>
                                        <img src="./assets/equal-icons/equal.png" alt="" style={{height: "30px", width: "30px"}}/>
                                    </span>
                                </label>
                            </div>
                            <div className={"col-xl-3 col-3"}>
                                <label className={"custom-control custom-radio custom-control-inline"}>
                                    <input type="radio" value="!=" name="operacionRadio" className={"custom-control-input"} onClick={() => this.props.retornoSeleccionOperacion("NO ES IGUAL A")}/>
                                    <span className={"custom-control-label"}>
                                        <img src="./assets/equal-icons/not equal.png" alt="" style={{height: "30px", width: "30px"}}/>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>
            );
        } /*else if(this.props.esTexto) {
            return (
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card"}>
                            <h3 className={"card-header"}>Seleccionar Operacion</h3>
                            <div className={"card-body"}>
                                <div className={"text-center"}>
                                    <label className={"custom-control custom-radio custom-control-inline"}>
                                        <input type="radio" value="sumIf" name="operacionRadio" className={"custom-control-input"}/>
                                        <span className={"custom-control-label"}>
                                            <img src="./assets/varCreation/SumarSi.png" alt="" style={{height: "25px", width: "auto"}}/>
                                        </span>
                                    </label>
                                    <label className={"custom-control custom-radio custom-control-inline"}>
                                        <input type="radio" value="sumIfNot" name="operacionRadio" className={"custom-control-input"}/>
                                        <span className={"custom-control-label"}>
                                            <img src="./assets/varCreation/SumarSiNo.png" alt="" style={{height: "25px", width: "auto"}}/>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }*/ else {
            return (
                <div>
                </div>
            );
        }
    }
}
