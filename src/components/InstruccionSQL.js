import React from 'react';
import sql from 'mssql';

export default class InstruccionSQL extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        //this.actualizarEstadoSeleccionSinoNuevaRegla = this.actualizarEstadoSeleccionSinoNuevaRegla.bind(this);
    }

    componentDidMount() {
    }
    
    render() {
        return (
            <div>
                {this.props.navbar}
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"card"} style={{width: "100%"}}>
                        <br/>
                        <br/>
                        <div className={"row"} style={{width: "100%"}}>
                            <div className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 form-group border-right text-center"}>
                                <h4>SELECT</h4>
                            </div>
                            <div className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 form-group text-center"}>
                                <h4>"NOMBRE.CAMPO"</h4>
                            </div>
                        </div>
                        <hr/>
                        <br/>
                        <div className={"row"} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <textarea className="form-control" id="comandoSQL" rows="7" style={{width: "90%"}}></textarea>
                        </div>
                        <hr/>
                        <div className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <a className={"btn btn-primary btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.crearAtributoVariable}>Guardar Comando SQL</a>
                        </div>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}
