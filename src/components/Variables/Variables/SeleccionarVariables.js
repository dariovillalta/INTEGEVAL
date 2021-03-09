import React from 'react';
import sql from 'mssql';

import Accordion from '../../Accordion/Accordion.js';

const colores = ["secondary", "success", "primary", "brand"];

var banderaConseguirCategoriasVariablesINICIO = 0, banderaConseguirCategoriasVariablesFIN = 2;
var variables = [], excel = [], formas = [];

export default class SeleccionarVariable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accordions: []
        }
        this.getVariables = this.getVariables.bind(this);
        this.getExcel = this.getExcel.bind(this);
        this.getExcelVariables = this.getExcelVariables.bind(this);
        this.getFormas = this.getFormas.bind(this);
        this.checkEndImportingVariables = this.checkEndImportingVariables.bind(this);
        this.createAccordionArray = this.createAccordionArray.bind(this);
    }

    componentWillUnmount() {
        variables = [];
        excel = [];
        formas = [];
    }

    componentDidMount() {
        banderaConseguirCategoriasVariablesINICIO = 0;
        banderaConseguirCategoriasVariablesFIN = 2;
        this.getVariables();
        this.getExcel();
        this.getFormas();
    }

    getVariables() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Variables", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var arreglo = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            var copyVar = jQuery.extend(true, {}, result.recordset[i]);
                            copyVar.tipo = 'variable';
                            arreglo.push(copyVar);
                        };
                        banderaConseguirCategoriasVariablesINICIO++;
                        variables = arreglo;
                        /*this.setState({
                            variables: arreglo
                        });*/
                        this.checkEndImportingVariables();
                    });
                }
            });
        }); // fin transaction
    }

    getExcel() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ExcelArchivos", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var arreglo = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            var copyVar = jQuery.extend(true, {}, result.recordset[i]);
                            copyVar.tipo = 'excel';
                            copyVar.variablesExcel = [];
                            arreglo.push(copyVar);
                        };
                        excel = arreglo;
                        for (var i = 0; i < excel.length; i++) {
                            banderaConseguirCategoriasVariablesFIN++;
                            this.getExcelVariables( excel[i].ID, i );
                        };
                        /*this.setState({
                            excel: arreglo
                        });*/
                    });
                }
            });
        }); // fin transaction
    }

    getExcelVariables(archivoID, posArchivo) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ExcelVariables where excelArchivoID = "+archivoID, (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var arreglo = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            var copyVar = jQuery.extend(true, {}, result.recordset[i]);
                            copyVar.tipo = 'excel';
                            arreglo.push(copyVar);
                        };
                        banderaConseguirCategoriasVariablesINICIO++;
                        excel[posArchivo].variablesExcel = arreglo;
                        /*this.setState({
                            excel: arreglo
                        });*/
                        this.checkEndImportingVariables();
                    });
                }
            });
        }); // fin transaction
    }

    getFormas() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from FormasVariables", (err, result) => {
                if (err) {
                    console.log(err);
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var arreglo = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            var copyVar = jQuery.extend(true, {}, result.recordset[i]);
                            copyVar.tipo = 'forma';
                            arreglo.push(copyVar);
                        };
                        banderaConseguirCategoriasVariablesINICIO++;
                        formas = arreglo;
                        /*this.setState({
                            formas: arreglo
                        });*/
                        this.checkEndImportingVariables();
                    });
                }
            });
        }); // fin transaction
    }

    checkEndImportingVariables () {
        if(banderaConseguirCategoriasVariablesINICIO ===  banderaConseguirCategoriasVariablesFIN) {
            this.createAccordionArray();
        }
    }

    createAccordionArray () {
        var arregloAccordion = [], arregloAccordionSinCategoria = {titulo: "Sin Categoria", variables: []};
        var insertoVar = false, insertoExc = false, insertoFor = false;
        for (var i = 0; i < variables.length; i++) {
            var insertoVar = false;
            for (var m = 0; m < arregloAccordion.length; m++) {
                if (arregloAccordion[m].titulo.toLowerCase().localeCompare(variables[i].categoriaVariable.toLowerCase()) === 0) {
                    var copyVar = jQuery.extend(true, {}, variables[i]);
                    arregloAccordion[m].variables.push(copyVar);
                    insertoVar = true;
                    break;
                }
            };
            if(!insertoVar && variables[i].categoriaVariable.length == 0) {
                arregloAccordionSinCategoria.variables.push(variables[i]);
            } else if(!insertoVar) {
                arregloAccordion.push({titulo: variables[i].categoriaVariable, variables: variables[i]})
            }
        };
        for (var i = 0; i < excel.length; i++) {
            for (var j = 0; j < excel[i].variablesExcel.length; j++) {
                var insertoExc = false;
                for (var m = 0; m < arregloAccordion.length; m++) {
                    if (arregloAccordion[m].titulo.toLowerCase().localeCompare(excel[i].variablesExcel[j].categoriaVariable.toLowerCase()) === 0) {
                        var copyVar = jQuery.extend(true, {}, excel[i].variablesExcel[j]);
                        copyVar.ID = excel[i].ID;
                        arregloAccordion[m].variables.push(copyVar);
                        insertoExc = true;
                        break;
                    }
                };
                if(!insertoExc && excel[i].variablesExcel[j].categoriaVariable.length == 0) {
                    var copyVar = jQuery.extend(true, {}, excel[i].variablesExcel[j]);
                    copyVar.ID = excel[i].ID;
                    arregloAccordionSinCategoria.variables.push(copyVar);
                } else if(!insertoExc) {
                    var copyVar = jQuery.extend(true, {}, excel[i].variablesExcel[j]);
                    copyVar.ID = excel[i].ID;
                    arregloAccordion.push({titulo: excel[i].categoriaVariable, variables: copyVar})
                }
            };
        };
        for (var i = 0; i < formas.length; i++) {
            var insertoFor = false;
            for (var m = 0; m < arregloAccordion.length; m++) {
                if (arregloAccordion[m].titulo.toLowerCase().localeCompare(formas[i].categoriaVariable.toLowerCase()) === 0) {
                    var copyVar = jQuery.extend(true, {}, formas[i]);
                    arregloAccordion[m].formas.push(copyVar);
                    insertoFor = true;
                    break;
                }
            };
            if(!insertoFor && variables[i].categoriaVariable.length == 0) {
                arregloAccordionSinCategoria.variables.push(formas[i]);
            } else if(!insertoFor) {
                arregloAccordion.push({titulo: formas[i].categoriaVariable, variables: formas[i]})
            }
        };
        if(arregloAccordionSinCategoria.variables.length > 0)
            arregloAccordion.push(arregloAccordionSinCategoria);
        this.setState({
            accordions: arregloAccordion
        });
    }

    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Seleccionar Variable</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.configuracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.props.goOptions}><a href="#" className={"breadcrumb-link"}>Tipo de Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item active font-16"} aria-current="page">Variables</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.crearVariables}>Crear Variable</a>
                </div>
                <br/>

                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        {this.state.accordions.map((accordion, i) => (
                            <div key={accordion.titulo}>
                                <Accordion showTrash={false} showEdit={false} allowMultipleOpen color={"#ffffff"}>
                                    <div label={accordion.titulo}>
                                        <div>
                                            {accordion.variables.map((variable, j) =>
                                                <a onClick={() => this.props.editarVariable(variable.ID, variable.esObjeto, variable.esInstruccionSQL, variable.tipo)} style={{color: "#fafafa"}} className={"btn btn-" + (j <= colores.length-1 ? colores[j] : colores[j%colores.length]) + ' btn-block btnWhiteColorHover font-bold font-20'} key={i+j}>{variable.nombre}</a>
                                            )}
                                        </div>
                                    </div>
                                </Accordion>
                                <br/>
                            </div>
                        ))}
                        {
                            this.state.accordions.length == 0
                            ? <div className="p-3 mb-2 bg-dark text-white font-bold font-20 text-center" style={{width: "100%"}}>No existen variables creadas</div>
                            : null
                        }
                    </div>
                </div>

            </div>
        );
    }
}
