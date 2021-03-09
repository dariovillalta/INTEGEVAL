import React from 'react';
import sql from 'mssql';
import Slider from 'react-input-slider';

var colores = ["primary", "brand", "secondary", "success", "danger", "warning", "info", "dark"];

var rangosSeccionUmbralTodos = [];

export default class CrearUmbral extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: 'Cargado Datos',
            umbralSeleccionadoID: -1,
            umbralNombreSeleccionado: '',
            seccionesUmbral: [],
            seccionUmbralSeleccionadoID: -1,
            tituloSeccionUmbralNombreSeleccionado: '',
            seccionUmbralNombreSeleccionado: '',
            colorSeccionUmbralSeleccionado: '',
            rangosSeccionUmbral: [],
            valorRangoMaximoMinimoNuevo: 0,
            valorRangoMaximoMaximoNuevo: this.props.maximoUmbral,
            valorRangoMaximo: 0,
            valoresMinMaxSeccionesUmbral: [],
            rangosCreados: [],
            bandera: ""
        }
        this.traerUmbral = this.traerUmbral.bind(this);
        this.crearUmbral = this.crearUmbral.bind(this);
        this.traerSeccionesUmbral = this.traerSeccionesUmbral.bind(this);
        this.agregarSeccionUmbral = this.agregarSeccionUmbral.bind(this);
        this.modificarSeccionUmbral = this.modificarSeccionUmbral.bind(this);
        this.seleccionSeccionUmbral = this.seleccionSeccionUmbral.bind(this);
        this.retornoSeccionSeleccionUmbral = this.retornoSeccionSeleccionUmbral.bind(this);
        this.traerTodosRangosSeccionUmbral = this.traerTodosRangosSeccionUmbral.bind(this);
        this.traerRangosSeccionUmbral = this.traerRangosSeccionUmbral.bind(this);
        this.agregarRangoSeccionUmbral = this.agregarRangoSeccionUmbral.bind(this);
        this.updateValorRangoMinimoCreado = this.updateValorRangoMinimoCreado.bind(this);
        this.updateValorRangoMaximoCreado = this.updateValorRangoMaximoCreado.bind(this);
        this.modificarRangoSeccionUmbral = this.modificarRangoSeccionUmbral.bind(this);
        this.verifyInputValues = this.verifyInputValues.bind(this);
    }

    componentDidMount() {
        this.traerUmbral();
    }

    traerUmbral () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Umbral where variableID = "+this.props.idVariable+" and tablaVariable = '"+this.props.tablaVariable+"'", (err, result) => {
                if (err) {
                    console.log(err);
                    this.props.showMessage("Error", "No se pudo traer valores de la tabla de umbrales.", true, false, {});
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            this.setState({
                                umbralSeleccionadoID: result.recordset[0].ID,
                                umbralNombreSeleccionado: 'Umbral '+this.props.tituloUmbral,
                                titulo: this.props.tituloUmbral
                            });
                            this.traerSeccionesUmbral();
                        } else {
                            this.crearUmbral();
                        }
                    });
                }
            });
        }); // fin transaction
    }

    crearUmbral () {
        var nombre = $("#nombreUmbral").val();
        if(!isNaN(this.props.idVariable)) {
            if(this.props.tablaVariable != undefined && this.props.tablaVariable.length > 0) {
                const transaction = new sql.Transaction( this.props.pool );
                transaction.begin(err => {
                    var rolledBack = false;
                    transaction.on('rollback', aborted => {
                        rolledBack = true;
                    });
                    const request = new sql.Request(transaction);
                    request.query("insert into Umbral (variableID, tablaVariable) values ("+this.props.idVariable+", '"+this.props.tablaVariable+"')", (err, result) => {
                        if (err) {
                            console.log(err);
                            this.props.showMessage("Error", "No se pudo crear el umbral.", true, false, {});
                            if (!rolledBack) {
                                transaction.rollback(err => {
                                });
                            }
                        } else {
                            transaction.commit(err => {
                                this.traerUmbral();
                                //this.props.showSuccesMessage("Éxito", "Umbral Creado.");
                            });
                        }
                    });
                }); // fin transaction
            } else {
                this.props.showMessage("Error", "Ingrese un valor para el nombre de tabla de la variable.", true, false, {});
            }
        } else {
            this.props.showMessage("Error", "Ingrese un valor númerico para el ID de variable.", true, false, {});
        }
    }

    traerSeccionesUmbral () {
        $('.demo').each(function() {
            //
            // Dear reader, it's actually very easy to initialize MiniColors. For example:
            //
            //  $(selector).minicolors();
            //
            // The way I've done it below is just for the demo, so don't get confused
            // by it. Also, data- attributes aren't supported at this time...they're
            // only used for this demo.
            //
            $(this).minicolors({
                control: $(this).attr('data-control') || 'hue',
                defaultValue: $(this).attr('data-defaultValue') || '',
                format: $(this).attr('data-format') || 'hex',
                keywords: $(this).attr('data-keywords') || '',
                inline: $(this).attr('data-inline') === 'true',
                letterCase: $(this).attr('data-letterCase') || 'lowercase',
                opacity: $(this).attr('data-opacity'),
                position: $(this).attr('data-position') || 'bottom left',
                swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
                change: function(value, opacity) {
                    if (!value) return;
                    if (opacity) value += ', ' + opacity;
                    if (typeof console === 'object') {
                        //console.log(value);
                    }
                },
                theme: 'bootstrap'
            });

        });
        setTimeout(
            function () {
                $('#colorSeccionNuevo').minicolors('value',"#ec407a");
        }, 100);

        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from SeccionUmbral where umbralID = "+this.state.umbralSeleccionadoID, (err, result) => {
                if (err) {
                    console.log(err);
                    this.props.showMessage("Error", "No se pudo traer valores de la tabla de secciones de umbral.", true, false, {});
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            seccionesUmbral: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    agregarSeccionUmbral() {
        var nombre = $("#nuevaSeccionUmbral").val();
        var color = $("#colorSeccionNuevo").val();
        var existeNombre = false;
        for (var i = 0; i < this.state.seccionesUmbral.length; i++) {
            if(this.state.seccionesUmbral[i].nombre.toLowerCase().localeCompare(nombre) == 0) {
                existeNombre = true;
                break;
            }
        };
        if(!existeNombre) {
            if(nombre.length > 0 && nombre.length < 101) {
                if(color != undefined && color.length > 0 && color.length < 26) {
                    const transaction = new sql.Transaction( this.props.pool );
                    transaction.begin(err => {
                        var rolledBack = false;
                        transaction.on('rollback', aborted => {
                            rolledBack = true;
                        });
                        const request = new sql.Request(transaction);
                        request.query("insert into SeccionUmbral (umbralID, nombre, color) values ("+this.state.umbralSeleccionadoID+", '"+nombre+"', '"+color+"')", (err, result) => {
                            if (err) {
                                console.log(err);
                                this.props.showMessage("Error", "No se pudo crear la sección del umbral.", true, false, {});
                                if (!rolledBack) {
                                    transaction.rollback(err => {
                                    });
                                }
                            } else {
                                transaction.commit(err => {
                                    $("#nuevaSeccionUmbral").val("");
                                    $('#colorSeccionNuevo').minicolors('value','#db913d');
                                    this.traerSeccionesUmbral();
                                    this.props.showSuccesMessage("Éxito", "Sección de Umbral Creado.");
                                });
                            }
                        });
                    }); // fin transaction
                } else {
                    this.props.showMessage("Error", "Ingrese un valor para el color de la sección del umbral.", true, false, {});
                }
            } else {
                this.props.showMessage("Error", "Ingrese un valor para el nombre de la sección del umbral.", true, false, {});
            }
        } else {
            this.props.showMessage("Error", "El nombre de la sección debe ser único.", true, false, {});
        }
    }

    modificarSeccionUmbral() {
        var nombre = $("#seccionUmbralSeleccionado").val();
        var color = $("#colorSeccionUmbralSeleccionado").val();
        var existeNombre = false;
        for (var i = 0; i < this.state.seccionesUmbral.length; i++) {
            if(this.state.seccionesUmbral[i].nombre.toLowerCase().localeCompare(nombre) == 0 && this.state.seccionUmbralSeleccionadoID != this.state.seccionesUmbral[i].ID) {
                existeNombre = true;
                break;
            }
        };
        if(!existeNombre) {
            if(nombre.length > 0 && nombre.length < 101) {
                if(color != undefined && color.length > 0 && color.length < 26) {
                    const transaction = new sql.Transaction( this.props.pool );
                    transaction.begin(err => {
                        var rolledBack = false;
                        transaction.on('rollback', aborted => {
                            rolledBack = true;
                        });
                        const request = new sql.Request(transaction);
                        request.query("update SeccionUmbral set nombre = '"+nombre+"', color = '"+color+"' where ID = "+this.state.seccionUmbralSeleccionadoID, (err, result) => {
                            if (err) {
                                console.log(err);
                                this.props.showMessage("Error", "No se pudo modificar la sección del umbral.", true, false, {});
                                if (!rolledBack) {
                                    transaction.rollback(err => {
                                    });
                                }
                            } else {
                                transaction.commit(err => {
                                    this.props.showSuccesMessage("Éxito", "Sección del Umbral modificada.");
                                });
                            }
                        });
                    }); // fin transaction
                } else {
                    this.props.showMessage("Error", "Ingrese un valor para el color de la sección del umbral.", true, false, {});
                }
            } else {
                this.props.showMessage("Error", "Ingrese un valor para el nombre de la sección del umbral.", true, false, {});
            }
        } else {
            this.props.showMessage("Error", "El nombre de la sección debe ser único.", true, false, {});
        }
    }

    seleccionSeccionUmbral (index) {
        this.setState({
            seccionUmbralSeleccionadoID: this.state.seccionesUmbral[index].ID,
            tituloSeccionUmbralNombreSeleccionado: 'Sección Umbral: '+this.state.seccionesUmbral[index].nombre,
            seccionUmbralNombreSeleccionado: this.state.seccionesUmbral[index].nombre,
            colorSeccionUmbralSeleccionado: this.state.seccionesUmbral[index].color
        }, this.traerRangosSeccionUmbral );
        var self = this;
        setTimeout(function() {
            $("#seccionUmbralSeleccionado").val(self.state.seccionesUmbral[index].nombre);
        }, 400);
    }

    retornoSeccionSeleccionUmbral () {
        this.traerSeccionesUmbral();
        this.setState({
            seccionUmbralSeleccionadoID: -1,
            tituloSeccionUmbralNombreSeleccionado: "",
            seccionUmbralNombreSeleccionado: "",
            colorSeccionUmbralSeleccionado: ""
        });
    }

    traerTodosRangosSeccionUmbral () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from RangoSeccionUmbral where umbralID = "+this.state.umbralSeleccionadoID, (err, result) => {
                if (err) {
                    console.log(err);
                    this.props.showMessage("Error", "No se pudo traer el rango de la sección del umbral.", true, false, {});
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        rangosSeccionUmbralTodos = result.recordset;
                    });
                }
            });
        }); // fin transaction
    }

    traerRangosSeccionUmbral () {
        this.traerTodosRangosSeccionUmbral();
        /*CARGANDO COLOR DE RANGO*/
        $('.demo').each(function() {
            $(this).minicolors({
                control: $(this).attr('data-control') || 'hue',
                defaultValue: $(this).attr('data-defaultValue') || '',
                format: $(this).attr('data-format') || 'hex',
                keywords: $(this).attr('data-keywords') || '',
                inline: $(this).attr('data-inline') === 'true',
                letterCase: $(this).attr('data-letterCase') || 'lowercase',
                opacity: $(this).attr('data-opacity'),
                position: $(this).attr('data-position') || 'bottom left',
                swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
                change: function(value, opacity) {
                    if (!value) return;
                    if (opacity) value += ', ' + opacity;
                    if (typeof console === 'object') {
                        //console.log(value);
                    }
                },
                theme: 'bootstrap'
            });

        });
        $('#colorSeccionUmbralSeleccionado').minicolors('value',this.state.colorSeccionUmbralSeleccionado);

        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from RangoSeccionUmbral where seccionUmbralID = "+this.state.seccionUmbralSeleccionadoID, (err, result) => {
                if (err) {
                    console.log(err);
                    this.props.showMessage("Error", "No se pudo traer el rango de la sección del umbral.", true, false, {});
                    if (!rolledBack) {
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        result.recordset.sort(function(a, b){
                            return a.valorMinimo-b.valorMinimo
                        });
                        /*preparando valores minimo y maximo de nuevo rango*/
                        var valorMinimo = 0, valorMaximo = 0, valorMaximoEsValorMedio = false;
                        for (var i = 0; i < result.recordset.length; i++) {
                            if(valorMinimo == result.recordset[i].valorMinimo) {
                                valorMinimo = result.recordset[i].valorMaximo+1;
                                if(i+1 < result.recordset.length && valorMinimo != result.recordset[i+1].valorMinimo) {
                                    valorMaximo = result.recordset[i+1].valorMinimo-1;
                                    valorMaximoEsValorMedio = true;
                                } else {
                                    valorMaximoEsValorMedio = false;
                                }
                            }
                        };
                        if(!valorMaximoEsValorMedio)
                            valorMaximo = valorMinimo + 100;
                        var rangosCreados = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            rangosCreados.push({
                                valorRangoMaximoMinimoNuevo: result.recordset[i].valorMinimo,
                                valorRangoMaximoMaximoNuevo: this.props.maximoUmbral,
                                valorRangoMaximo: result.recordset[i].valorMaximo
                            });
                        };
                        this.setState({
                            rangosSeccionUmbral: result.recordset,
                            valorRangoMaximoMinimoNuevo: valorMinimo,
                            valorRangoMaximoMaximoNuevo: this.props.maximoUmbral,
                            rangosCreados: rangosCreados
                        });
                    });
                }
            });
        }); // fin transaction
    }

    agregarRangoSeccionUmbral() {
        var valMinimo = parseInt($("#nuevoRangoValorMinimo").val());
        var valMaximo = this.state.valorRangoMaximo;
        var valoresFueraDeOtrosRangos = true;
        for (var i = 0; i < rangosSeccionUmbralTodos.length; i++) {
            if(valMinimo >= rangosSeccionUmbralTodos[i].valorMinimo && valMinimo <= rangosSeccionUmbralTodos[i].valorMaximo) {
                valoresFueraDeOtrosRangos = false;
            }
            if(valMaximo >= rangosSeccionUmbralTodos[i].valorMinimo && valMinimo <= rangosSeccionUmbralTodos[i].valorMaximo) {
                valoresFueraDeOtrosRangos = false;
            }
        };
        if(valoresFueraDeOtrosRangos) {
            if(!isNaN(valMinimo)) {
                if(!isNaN(valMaximo)) {
                    const transaction = new sql.Transaction( this.props.pool );
                    transaction.begin(err => {
                        var rolledBack = false;
                        transaction.on('rollback', aborted => {
                            rolledBack = true;
                        });
                        const request = new sql.Request(transaction);
                        request.query("insert into RangoSeccionUmbral (umbralID, seccionUmbralID, valorMinimo, valorMaximo) values ("+this.state.umbralSeleccionadoID+", "+this.state.seccionUmbralSeleccionadoID+", "+valMinimo+", "+valMaximo+")", (err, result) => {
                            if (err) {
                                console.log(err);
                                this.props.showMessage("Error", "No se pudo crear el rango de la sección del umbral.", true, false, {});
                                if (!rolledBack) {
                                    transaction.rollback(err => {
                                    });
                                }
                            } else {
                                transaction.commit(err => {
                                    this.traerRangosSeccionUmbral();
                                    this.props.traerUmbralesPADRE();
                                    this.props.showSuccesMessage("Éxito", "Rango de la Sección del Umbral creada.");
                                });
                            }
                        });
                    }); // fin transaction
                } else {
                    this.props.showMessage("Error", "Ingrese un número válido para el valor máximo.", true, false, {});
                }
            } else {
                this.props.showMessage("Error", "Ingrese un número válido para el valor mínimo.", true, false, {});
            }
        } else {
            this.props.showMessage("Error", "Los valores ingresados traspasan otros rangos.", true, false, {});
        }
    }

    updateValorRangoMinimoCreado (index) {
        var copy = [...this.state.rangosCreados];
        var valorMinimoNuevo = parseInt($("#rangoValorMinimo"+index).val());
        if( valorMinimoNuevo < 0 || valorMinimoNuevo > this.props.maximoUmbral-1) {
            $("#rangoValorMinimo"+index).val(0);
            copy[index].valorRangoMaximoMinimoNuevo = 0;
            copy[index].valorRangoMaximo = 0;
            this.setState({
                rangosCreados: copy
            });
        } else {
            copy[index].valorRangoMaximoMinimoNuevo = valorMinimoNuevo;
            copy[index].valorRangoMaximo = valorMinimoNuevo;
            this.setState({
                rangosCreados: copy
            });
        }
    }

    updateValorRangoMaximoCreado (index, x) {
        var copy = [...this.state.rangosCreados];
        copy[index].valorRangoMaximo = x;
        this.setState({
            rangosCreados: copy
        });
    }

    modificarRangoSeccionUmbral(index) {
        var valMinimo = parseInt($("#rangoValorMinimo"+index).val());
        var valMaximo = this.state.rangosCreados[index].valorRangoMaximo;
        var valoresFueraDeOtrosRangos = true;
        for (var i = 0; i < rangosSeccionUmbralTodos.length; i++) {
            if(valMinimo >= rangosSeccionUmbralTodos[i].valorMinimo && valMinimo <= rangosSeccionUmbralTodos[i].valorMaximo && this.state.rangosSeccionUmbral[index].ID != rangosSeccionUmbralTodos[i].ID) {
                valoresFueraDeOtrosRangos = false;
            }
            if(valMaximo >= rangosSeccionUmbralTodos[i].valorMinimo && valMinimo <= rangosSeccionUmbralTodos[i].valorMaximo && this.state.rangosSeccionUmbral[index].ID != rangosSeccionUmbralTodos[i].ID) {
                valoresFueraDeOtrosRangos = false;
            }
        };
        if(valoresFueraDeOtrosRangos) {
            if(!isNaN(valMinimo)) {
                if(!isNaN(valMaximo)) {
                    const transaction = new sql.Transaction( this.props.pool );
                    transaction.begin(err => {
                        var rolledBack = false;
                        transaction.on('rollback', aborted => {
                            rolledBack = true;
                        });
                        const request = new sql.Request(transaction);
                        request.query("update RangoSeccionUmbral set valorMinimo = "+valMinimo+", valorMaximo = "+valMaximo+" where ID = "+this.state.rangosSeccionUmbral[index].ID, (err, result) => {
                            if (err) {
                                console.log(err);
                                this.props.showMessage("Error", "No se pudo modificadr el rango de la sección del umbral.", true, false, {});
                                if (!rolledBack) {
                                    transaction.rollback(err => {
                                    });
                                }
                            } else {
                                transaction.commit(err => {
                                    this.traerRangosSeccionUmbral();
                                    this.props.traerUmbralesPADRE();
                                    this.props.showSuccesMessage("Éxito", "Rango de la Sección del Umbral modificada.");
                                });
                            }
                        });
                    }); // fin transaction
                } else {
                    this.props.showMessage("Error", "Ingrese un número válido para el valor máximo.", true, false, {});
                }
            } else {
                this.props.showMessage("Error", "Ingrese un número válido para el valor mínimo.", true, false, {});
            }
        } else {
            this.props.showMessage("Error", "Los valores ingresados traspasan otros rangos.", true, false, {});
        }
    }

    verifyInputValues (id) {
        if( $("#"+id).val() < 0 ) {
            $("#"+id).val(0);
            this.setState({
                valorRangoMaximoMinimoNuevo: 0,
                valorRangoMaximo: 0
            });
        } else if( $("#"+id).val() > this.props.maximoUmbral ) {
            $("#"+id).val(0);
            this.setState({
                valorRangoMaximoMinimoNuevo: 0,
                valorRangoMaximo: 0
            });
        } else {
            this.setState({
                valorRangoMaximoMinimoNuevo: parseInt($("#"+id).val()),
                valorRangoMaximo: parseInt($("#"+id).val())
            });
        }
    }
    
    render() {
        if(this.state.umbralSeleccionadoID == -1) {
            return (
                <div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"card influencer-profile-data"}>
                                <div className={"card-body"}>
                                    <div className={"row"} style={{height: "2em",width: "100%"}}>
                                        <div className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 font-18"} style={{height: "100%",width: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #e6e6f2"}}>
                                            {this.state.titulo}
                                        </div>
                                    </div>
                                    <br/>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if(this.state.umbralSeleccionadoID != -1 && this.state.seccionUmbralSeleccionadoID == -1) {
            return (
                <div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"card influencer-profile-data"}>
                                <div className={"card-body"}>
                                    <div className={"row"} style={{height: "2em",width: "100%"}}>
                                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 font-18"} style={{height: "100%",width: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #e6e6f2"}}>
                                            {this.state.titulo}
                                        </div>
                                    </div>
                                    <br/>
                                    <div className={"row"}>
                                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                            <div style={{width: "100%", height: "100%"}}>
                                                <div className={"row"}>
                                                    <div className={"col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 form-group"}>
                                                    </div>
                                                    <div className={"col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 form-group"}>
                                                        <h2>{this.state.umbralNombreSeleccionado}</h2>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className={"row"}>
                                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                        <label htmlFor="nuevaSeccionUmbral" className="col-form-label">Nombre Nueva Sección de Umbral:</label>
                                                    </div>
                                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                        <input id="nuevaSeccionUmbral" type="text" className="form-control form-control-sm"/>
                                                    </div>
                                                </div>
                                                <div className={"row"}>
                                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                        <label htmlFor="colorSeccionNuevo" className="col-form-label">Color de la Sección de Umbral:</label>
                                                    </div>
                                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                        <div className="form-group">
                                                            <input type="hidden" id="colorSeccionNuevo" className="demo" value="#ec407a" data-swatches="#ec407a|#ab47bc|#3f51b5|#26a69a|#8bc34a|#000000|#eeeeee|#f44336|#2196f3|#4caf50|#ffeb3b|#ff9800|#795548|#9e9e9e"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"text-center"}>
                                                    <a onClick={this.agregarSeccionUmbral} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Agregar Sección de Umbral</a>
                                                </div>
                                                <br/>
                                                {this.state.seccionesUmbral.map((seccionUmbral, i) => (
                                                    <div key={seccionUmbral.ID} className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                                        <a href="#" onClick={() => this.seleccionSeccionUmbral(i)} className="btn" style={{width: "100%", color: seccionUmbral.color, backgroundColor: "transparent", borderColor: seccionUmbral.color, margin: "1% 0%"}}>{seccionUmbral.nombre}</a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if(this.state.umbralSeleccionadoID != -1 && this.state.seccionUmbralSeleccionadoID != -1) {
            return (
                <div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"card influencer-profile-data"}>
                                <div className={"card-body"}>
                                    <div className={"row"} style={{height: "2em",width: "100%"}}>
                                        <div className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 font-18"} style={{height: "100%",width: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #e6e6f2"}}>
                                            {this.state.titulo}
                                        </div>
                                    </div>
                                    <br/>
                                    <div className={"row"}>
                                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                                            <div style={{width: "100%", height: "100%"}}>
                                                <div className={"row"}>
                                                    <div onClick={() => this.retornoSeccionSeleccionUmbral()} className={"col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 form-group addPointer border"}>
                                                        <label className="font-24 addPointer"> {"<"} </label>
                                                    </div>
                                                    <div className={"col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 form-group"}>
                                                        <h2>{this.state.tituloSeccionUmbralNombreSeleccionado}</h2>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className={"row"}>
                                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                        <label htmlFor="seccionUmbralSeleccionado" className="col-form-label">Nombre Sección de Umbral:</label>
                                                    </div>
                                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                        <input id="seccionUmbralSeleccionado" defaultValue={this.state.seccionUmbralNombreSeleccionado} type="text" className="form-control form-control-sm"/>
                                                    </div>
                                                </div>
                                                <div className={"row"}>
                                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                        <label htmlFor="colorSeccionUmbralSeleccionado" className="col-form-label">Color de la Sección de Umbral:</label>
                                                    </div>
                                                    <div className={"col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 form-group"}>
                                                        <div className="form-group">
                                                            <input type="hidden" id="colorSeccionUmbralSeleccionado" className="demo" value={this.state.colorSeccionUmbralSeleccionado} data-swatches="#ec407a|#ab47bc|#3f51b5|#26a69a|#8bc34a|#000000|#eeeeee|#f44336|#2196f3|#4caf50|#ffeb3b|#ff9800|#795548|#9e9e9e"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"text-center"}>
                                                    <a onClick={this.modificarSeccionUmbral} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Modificar Sección de Umbral</a>
                                                </div>
                                                <hr/>
                                                <div className={"row"}>
                                                    <div className={"col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 form-group text-center"}>
                                                        <label htmlFor="nuevoRangoValorMinimo" className="col-form-label">Valor mínimo:</label>
                                                    </div>
                                                    <div className={"col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 form-group text-center"}>
                                                        <label htmlFor="nuevoRangoValorMaximo" className="col-form-label">Valor máximo:</label>
                                                    </div>
                                                </div>
                                                <div className={"row"}>
                                                    <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-group"}>
                                                        <input id="nuevoRangoValorMinimo" name="nuevoRangoValorMinimo" step="1" min="0" onKeyUp={() => this.verifyInputValues("nuevoRangoValorMinimo")} type="number" defaultValue="0"/>
                                                    </div>
                                                    <div className={"col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 form-group"}>
                                                        <Slider
                                                            axis="x"
                                                            xstep={1}
                                                            xmin={this.state.valorRangoMaximoMinimoNuevo}
                                                            xmax={this.state.valorRangoMaximoMaximoNuevo}
                                                            x={this.state.valorRangoMaximo}
                                                            onChange={ ({ x }) => this.setState({valorRangoMaximo: x}) }
                                                            style={{width: "100%", marginTop: "10px"}}/>
                                                    </div>
                                                    <div className={"col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 form-group"}>
                                                        <label id="nuevoRangoValorMaximo" className="col-form-label">{this.state.valorRangoMaximo}</label>
                                                    </div>
                                                </div>
                                                <div className={"text-center"}>
                                                    <a onClick={this.agregarRangoSeccionUmbral} className={"btn btn-brand col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Agregar Rango de Sección de Umbral</a>
                                                </div>
                                                {this.state.rangosSeccionUmbral.map((rangoSeccionUmbral, i) => (
                                                    <div key={rangoSeccionUmbral.ID}>
                                                        <hr/>
                                                        <div className={"row"}>
                                                            <div className={"col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 form-group text-center"}>
                                                                <label htmlFor={"rangoValorMinimo"+i} className="col-form-label">Valor Mínimo Nuevo:</label>
                                                            </div>
                                                            <div className={"col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 form-group text-center"}>
                                                                <label htmlFor={"rangoValorMaximo"+i} className="col-form-label">Valor Máximo Nuevo:</label>
                                                            </div>
                                                        </div>
                                                        <div className={"row"}>
                                                            <div className={"col-xl-3 col-lg-3 col-md-3 col-sm-4 col-3 form-group"}>
                                                                <input id={"rangoValorMinimo"+i} name={"rangoValorMinimo"+i} step="1" min="0" max="99" type="number" defaultValue={rangoSeccionUmbral.valorMinimo} onChange={() => this.updateValorRangoMinimoCreado(i)}/>
                                                            </div>
                                                            <div className={"col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 form-group"}>
                                                                <Slider
                                                                    axis="x"
                                                                    xstep={1}
                                                                    xmin={this.state.rangosCreados[i].valorRangoMaximoMinimoNuevo}
                                                                    xmax={this.props.maximoUmbral}
                                                                    x={this.state.rangosCreados[i].valorRangoMaximo}
                                                                    onChange={ ({ x }) => this.setState({bandera: ""}, this.updateValorRangoMaximoCreado(i, x)) }
                                                                    style={{width: "100%", marginTop: "10px"}}/>
                                                            </div>
                                                            <div className={"col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 form-group"}>
                                                                <label id={"rangoValorMaximo"+i} className="col-form-label">{this.state.rangosCreados[i].valorRangoMaximo}</label>
                                                            </div>
                                                        </div>
                                                        <div className={"text-center"}>
                                                            <a onClick={() => this.modificarRangoSeccionUmbral(i)} className={"btn btn-success col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Modificar Rango de Sección de Umbral</a>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
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
}
