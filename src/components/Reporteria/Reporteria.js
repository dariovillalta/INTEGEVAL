import React from 'react';
import sql from 'mssql';
import XLSX from 'xlsx-style';

export default class Reporteria extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //componenteActual: "importarResultados"
        }
        this.styleDate = this.styleDate.bind(this);
        this.creatingExcel = this.creatingExcel.bind(this);
        this.toColumnName = this.toColumnName.bind(this);
        this.espanol = this.espanol.bind(this);
    }

    styleDate (date) {
        return date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
    }

    creatingExcel (variable, tipoVariable) {
        var longitudCeldas = variable.atributos.length;
        var altura = variable.resultados.length+4;
        var workbook = {
            SheetNames : ["Libro1"],
            Sheets: {
                "Libro1": {
                    "!merges":[],
                    "!ref":"A1:"+this.toColumnName(longitudCeldas)+(altura)
                }
            }
        };
        var nombre;
        if(tipoVariable.localeCompare("Variable") == 0) {
            nombre = variable.nombreVariable;
        } else if(tipoVariable.localeCompare("Indicador") == 0) {
            nombre = variable.nombreIndicador;
        } else if(tipoVariable.localeCompare("Riesgo") == 0) {
            nombre = variable.nombreRiesgo;
        }
        workbook.Sheets.Libro1["A1"] = {
            v: "Reporte "+tipoVariable+": "+nombre,
            s: {
                font: {
                  color: {
                    rgb: 'ffffff'
                  },
                  bold: true,
                  sz : 20
                },
                fill: {
                  patternType: "solid",
                  bgColor: {
                    rgb: "689f38"
                  },
                  fgColor: {
                    rgb: "689f38"
                  }
                },
                alignment: {
                    horizontal: "center"
                }
            }
        };
        workbook.Sheets.Libro1["!merges"].push({s:{r:0,c:0},e:{r:0,c:longitudCeldas-1}});

        //HORA DE CREACION
        var fechaDeCreacion = new Date();
        var txtFechaCreacion = "Hora y fecha de creacion: "+fechaDeCreacion.getHours()+":"+fechaDeCreacion.getMinutes()+" - "+fechaDeCreacion.getDate()+" de "+this.espanol(fechaDeCreacion.getMonth())+" "+fechaDeCreacion.getFullYear();
        workbook.Sheets.Libro1["A2"] = {
            v: txtFechaCreacion,
            s: {
                font: {
                  color: {
                    rgb: '000000'
                  },
                  sz : 14
                },
                alignment: {
                    horizontal: "center"
                }
            }
        };
        workbook.Sheets.Libro1["!merges"].push({s:{r:1,c:0},e:{r:1,c:longitudCeldas-1}});

        for (var j = 0; j < variable.atributos.length; j++) {
            workbook.Sheets.Libro1[this.toColumnName(j+1)+"4"] = {
                v: variable.atributos[j].nombre,
                s: {
                    font: {
                      color: {
                        rgb: 'ffffff'
                      },
                      bold: true,
                      sz : 15
                    },
                    fill: {
                        patternType: "solid",
                        bgColor: {
                            rgb: "01579b"
                        },
                        fgColor: {
                            rgb: "01579b"
                        }
                    },
                    alignment: {
                        horizontal: "center"
                    }
                }
            };
        };
      
        for (var i = 0; i < variable.resultados.length; i++) {
            for (var j = 0; j < variable.atributos.length; j++) {
                if(variable.atributos[j].tipo.localeCompare("int") == 0 || variable.atributos[j].tipo.localeCompare("decimal") == 0) {
                    workbook.Sheets.Libro1[this.toColumnName(j+1)+(i+5)] = {
                        v: variable.resultados[i][variable.atributos[j].nombre],
                        t:'n',
                        s: {
                            font: {
                              color: {
                                rgb: '000'
                              },
                              bold: false,
                              sz : 13
                            },
                            alignment: {
                                horizontal: "center"
                            }
                        }
                    };
                } else if(variable.atributos[j].tipo.localeCompare("date") == 0) {
                    workbook.Sheets.Libro1[this.toColumnName(j+1)+(i+5)] = {
                        v: variable.resultados[i][variable.atributos[j].nombre],
                        t:'d',
                        s: {
                            font: {
                              color: {
                                rgb: '000'
                              },
                              bold: false,
                              sz : 13
                            },
                            alignment: {
                                horizontal: "center"
                            }/*,
                            numFmt: "m/dd/yy"*/
                        },
                        z: 'd/m/yyyy'
                    };
                } else if(variable.atributos[j].tipo.localeCompare("bit") == 0) {
                    workbook.Sheets.Libro1[this.toColumnName(j+1)+(i+5)] = {
                        v: variable.resultados[i][variable.atributos[j].nombre],
                        t:'b',
                        s: {
                            font: {
                              color: {
                                rgb: '000'
                              },
                              bold: false,
                              sz : 13
                            },
                            alignment: {
                                horizontal: "center"
                            }
                        }
                    };
                } else if(variable.atributos[j].tipo.localeCompare("varchar") == 0) {
                    workbook.Sheets.Libro1[this.toColumnName(j+1)+(i+5)] = {
                        v: variable.resultados[i][variable.atributos[j].nombre],
                        t:'s',
                        s: {
                            font: {
                              color: {
                                rgb: '000'
                              },
                              bold: false,
                              sz : 13
                            },
                            alignment: {
                                horizontal: "center"
                            }
                        }
                    };
                }
            };
        };

        //DESCARGAR
        var wbout = XLSX.write(workbook, {bookType:'xlsx', bookSST:false, type: 'binary'});
        XLSX.writeFile(workbook, "./Reporte.xlsx");
        console.log('workbook');
        console.log(workbook);
    }

    toColumnName(num) {
        for (var ret = '', a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
            ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
        }
        return ret;
    }

    espanol(mes) {
        var mesEspanol = '';
        switch(mes){
            case 0: mesEspanol = 'Enero';
                break;
            case 1: mesEspanol = 'Febrero';
                break;
            case 2: mesEspanol = 'Marzo';
                break;
            case 3: mesEspanol = 'Abril';
                break;
            case 4: mesEspanol = 'Mayo';
                break;
            case 5: mesEspanol = 'Junio';
                break;
            case 6: mesEspanol = 'Julio';
                break;
            case 7: mesEspanol = 'Agosto';
                break;
            case 8: mesEspanol = 'Septiembre';
                break;
            case 9: mesEspanol = 'Octubre';
                break;
            case 10: mesEspanol = 'Noviembre';
                break;
            case 11: mesEspanol = 'Diciembre';
                break;
        }
        return mesEspanol;
    }

    render() {
        return (
            <div className="row">
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Visualizar Variables</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.returnChooseDates}><a href="#" className={"breadcrumb-link"}>Seleccionar Fechas</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.returnChooseFilter}><a href="#" className={"breadcrumb-link"}>Crear Filtro</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Visualizar Variables</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.props.variables.length > 0 
                    ?   <div style={{width: "100%", backgroundColor: "#a5d6a7", padding: "2% 0% 0% 0%", margin: "3% 0%"}}>
                            <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <p className="lead display-6" style={{color: "white"}}>
                                    Variables
                                </p>
                            </div>
                            {this.props.variables.map((variable, i) => (
                                <div key={variable.ID} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{overflowX: "auto"}}>
                                    <div className="card" style={{display: "inline-block", minWidth: "100%"}}>
                                        <h5 style={{display: "inline", marginTop: "20px", marginLeft: "10px"}}>{variable.nombreVariable}</h5>
                                        <div style={{float: "right"}}>
                                            <a href="#" className="btn btn-outline-light" onClick={() => this.creatingExcel(variable, "Variable")} style={{width: "80px", float: "right", display: "inline"}}>Excel</a>
                                            <a href="#" className="btn btn-outline-light" style={{width: "80px", float: "right", display: "inline"}}>PDF</a>
                                        </div>
                                        <table className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    {variable.atributos.map((campo, j) => (
                                                        <th scope="col" key={campo.nombre+""+variable.ID}>
                                                            {
                                                                campo.nombre.localeCompare("f3ch4Gu4rd4do") == 0
                                                                ? "Fecha Creación"
                                                                : campo.nombre
                                                            }
                                                        </th>
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
                        </div>
                    : null
                }

                {
                    this.props.indicadores.length > 0 
                    ?   <div style={{width: "100%", backgroundColor: "#ffb74d", padding: "2% 0% 0% 0%", margin: "3% 0%"}}>
                            <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <p className="lead display-6" style={{color: "white"}}>
                                    Indicadores
                                </p>
                            </div>
                            {this.props.indicadores.map((indicador, i) => (
                                <div key={indicador.ID} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{overflowX: "auto"}}>
                                    <div className="card" style={{display: "inline-block", minWidth: "100%"}}>
                                        <h5 style={{display: "inline", marginTop: "20px", marginLeft: "10px"}}>{indicador.nombreIndicador}</h5>
                                        <div style={{float: "right"}}>
                                            <a href="#" className="btn btn-outline-light" onClick={() => this.creatingExcel(indicador, "Indicador")} style={{width: "80px", float: "right", display: "inline"}}>Excel</a>
                                            <a href="#" className="btn btn-outline-light" style={{width: "80px", float: "right", display: "inline"}}>PDF</a>
                                        </div>
                                        <table className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    {indicador.atributos.map((campo, j) => (
                                                        <th scope="col" key={campo.nombre+""+indicador.ID}>
                                                            {
                                                                campo.nombre.localeCompare("f3ch4Gu4rd4do") == 0
                                                                ? "Fecha Creación"
                                                                : campo.nombre
                                                            }
                                                        </th>
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
                        </div>
                    : null
                }

                {
                    this.props.riesgos.length > 0 
                    ?   <div style={{width: "100%", backgroundColor: "#d7ccc8", padding: "2% 0% 0% 0%", margin: "3% 0%"}}>
                            <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <p className="lead display-6" style={{color: "white"}}>
                                    Riesgos
                                </p>
                            </div>
                            {this.props.riesgos.map((riesgo, i) => (
                                <div key={riesgo.ID} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{overflowX: "auto"}}>
                                    <div className="card" style={{display: "inline-block", minWidth: "100%"}}>
                                        <h5 style={{display: "inline", marginTop: "20px", marginLeft: "10px"}}>{riesgo.nombreRiesgo}</h5>
                                        <div style={{float: "right"}}>
                                            <a href="#" className="btn btn-outline-light" onClick={() => this.creatingExcel(riesgo, "Riesgo")} style={{width: "80px", float: "right", display: "inline"}}>Excel</a>
                                            <a href="#" className="btn btn-outline-light" style={{width: "80px", float: "right", display: "inline"}}>PDF</a>
                                        </div>
                                        <table className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    {riesgo.atributos.map((campo, j) => (
                                                        <th scope="col" key={campo.nombre+""+riesgo.ID}>
                                                            {
                                                                campo.nombre.localeCompare("f3ch4Gu4rd4do") == 0
                                                                ? "Fecha Creación"
                                                                : campo.nombre
                                                            }
                                                        </th>
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
                    : null
                }
            </div>
        );
    }
}

