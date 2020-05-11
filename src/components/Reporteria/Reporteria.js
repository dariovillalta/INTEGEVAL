import React from 'react';
import sql from 'mssql';

export default class Reporteria extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //componenteActual: "importarResultados"
        }
        //this.goCreateFilters = this.goCreateFilters.bind(this);
        this.styleDate = this.styleDate.bind(this);
    }

    styleDate (date) {
        return date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
    }

    render() {
        console.log('this.props.variables')
        console.log(this.props.variables)
        return (
            <div className="row">
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Visualizar Variables</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.returnImportResults}><a href="#" className={"breadcrumb-link"}>Crear Filtro</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Visualizar Variables</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.variables.map((variable, i) => (
                    <div key={variable.ID} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{overflowX: "auto"}}>
                        <div className="card" style={{display: "inline-block", minWidth: "100%"}}>
                            <h5 style={{display: "inline", marginTop: "20px", marginLeft: "10px"}}>{variable.nombreVariable}</h5>
                            <div style={{float: "right"}}>
                                <a href="#" className="btn btn-outline-light" style={{width: "80px", float: "right", display: "inline"}}>Excel</a>
                                <a href="#" className="btn btn-outline-light" style={{width: "80px", float: "right", display: "inline"}}>PDF</a>
                            </div>
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        {variable.atributos.map((campo, j) => (
                                            <th scope="col" key={campo.nombre+""+variable.ID}>{campo.nombre}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {variable.resultados.map((resultado, j) => (
                                        <tr key={variable.ID+""+variable.ID+""+resultado.ID}>
                                            <th scope="row">{j+1}</th>
                                            {variable.atributos.map((campo, k) => (
                                                <td key={variable.ID+""+resultado.ID+""+campo.nombre}>
                                                {
                                                    campo.tipo.localeCompare("date") == 0
                                                    ? <span>{this.styleDate(resultado[campo.nombre])}</span>
                                                    : <span>{resultado[campo.nombre]}</span>
                                                }
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}

                {this.props.indicadores.map((indicador, i) => (
                    <div key={indicador.ID} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{overflowX: "auto"}}>
                        <div className="card" style={{display: "inline-block", minWidth: "100%"}}>
                            <h5 style={{display: "inline", marginTop: "20px", marginLeft: "10px"}}>{indicador.nombreIndicador}</h5>
                            <div style={{float: "right"}}>
                                <a href="#" className="btn btn-outline-light" style={{width: "80px", float: "right", display: "inline"}}>Excel</a>
                                <a href="#" className="btn btn-outline-light" style={{width: "80px", float: "right", display: "inline"}}>PDF</a>
                            </div>
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        {indicador.atributos.map((campo, j) => (
                                            <th scope="col" key={campo.nombre+""+indicador.ID}>{campo.nombre}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {indicador.resultados.map((resultado, j) => (
                                        <tr key={indicador.ID+""+indicador.ID+""+resultado.ID}>
                                            <th scope="row">{j+1}</th>
                                            {indicador.atributos.map((campo, k) => (
                                                <td key={indicador.ID+""+resultado.ID+""+campo.nombre}>
                                                {
                                                    campo.tipo.localeCompare("date") == 0
                                                    ? <span>{this.styleDate(resultado[campo.nombre])}</span>
                                                    : <span>{resultado[campo.nombre]}</span>
                                                }
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}

                {this.props.riesgos.map((riesgo, i) => (
                    <div key={riesgo.ID} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{overflowX: "auto"}}>
                        <div className="card" style={{display: "inline-block", minWidth: "100%"}}>
                            <h5 style={{display: "inline", marginTop: "20px", marginLeft: "10px"}}>{riesgo.nombreRiesgo}</h5>
                            <div style={{float: "right"}}>
                                <a href="#" className="btn btn-outline-light" style={{width: "80px", float: "right", display: "inline"}}>Excel</a>
                                <a href="#" className="btn btn-outline-light" style={{width: "80px", float: "right", display: "inline"}}>PDF</a>
                            </div>
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        {riesgo.atributos.map((campo, j) => (
                                            <th scope="col" key={campo.nombre+""+riesgo.ID}>{campo.nombre}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {riesgo.resultados.map((resultado, j) => (
                                        <tr key={riesgo.ID+""+riesgo.ID+""+resultado.ID}>
                                            <th scope="row">{j+1}</th>
                                            {riesgo.atributos.map((campo, k) => (
                                                <td key={riesgo.ID+""+resultado.ID+""+campo.nombre}>
                                                {
                                                    campo.tipo.localeCompare("date") == 0
                                                    ? <span>{this.styleDate(resultado[campo.nombre])}</span>
                                                    : <span>{resultado[campo.nombre]}</span>
                                                }
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
