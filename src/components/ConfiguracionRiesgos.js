import React from 'react';
import sql from 'mssql';

import Umbral from './Umbral/Umbral.js';

var nodemailer = require('nodemailer');
var c3 = require("c3");
var d3 = require("d3");
import domtoimage from 'dom-to-image';

var transporter = nodemailer.createTransport({
  service: 'gmail',
    auth: {
        user: 'riesgointegrallugon@gmail.com',
        pass: 'r13sgo1nT3Gr4l'
    }
});

var mailOptions = {
    from: 'riesgointegral@protonmail.com',
    to: 'dario_villalta@hotmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

//faltan warning
//light

export default class ConfiguracionRiesgos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componenteActual: "ConfiguracionRiesgos",
            navbar: "",
            riesgos: []
        }
        this.getRiesgos = this.getRiesgos.bind(this);
        this.showUmbralIntegral = this.showUmbralIntegral.bind(this);
        this.retornarConfiguracionHome = this.retornarConfiguracionHome.bind(this);
    }

    componentDidMount() {
        this.getRiesgos();
        /*transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });*/
        /*if ($('#c3chart_area').length) {
            var chart = c3.generate({
                bindto: "#c3chart_area",
                data: {
                    columns: [
                        ['data1', 300, 350, 300, 0, 0, 0],
                        ['data2', 130, 100, 140, 200, 150, 50]
                    ],
                    types: {
                        data1: 'area',
                        data2: 'area-spline'
                    },
                    colors: {
                        data1: '#5969ff',
                        data2: '#ff407b',

                    }

                },
                axis: {

                    y: {
                        show: true




                    },
                    x: {
                        show: true
                    }
                }

            });
        }
        var svg = document.getElementById("c3chart_area");
        //var img = document.getElementById("fromcanvas");

        toDataURL("image/png", {
            callback: function(data) {
                var img = new Image();
                img.setAttribute("src", data)
                document.getElementById("cardID").appendChild(img);
            }
        })*/
        /*var SVGtopngDataURL = document.getElementById("c3chart_area").toDataURL("image/png");
        var img = new Image();
        img.src = SVGtopngDataURL;
        document.getElementById("cardID").appendChild(img);*/
        /*//function exportChartToPng(chartID){
            //fix weird back fill
            d3.select('#c3chart_area').selectAll("path").attr("fill", "none");
            //fix no axes
            d3.select('#c3chart_area').selectAll("path.domain").attr("stroke", "black");
            //fix no tick
            d3.select('#c3chart_area').selectAll(".tick line").attr("stroke", "black");
            var svgElement = $('#c3chart_area').find('svg')[0];
            console.log('svgElement')
            console.log(svgElement)
            //document.getElementById("cardID").appendChild(svgElement);
            //saveSvgAsPng(svgElement, chartID+'.png');
        //}
        // get svg data
        var xml = new XMLSerializer().serializeToString(svgElement);
        console.log('xml')
        console.log(xml)

        // make it base64
        var svg64 = btoa(xml);
        console.log('svg64')
        console.log(svg64)
        var b64Start = 'data:image/svg+xml;base64,';*/
        /*console.log('b64Start')
        console.log(b64Start)

        // prepend a "header"
        var image64 = b64Start + svg64;
        var img = new Image();
        img.src = image64;
        document.getElementById("cardID").appendChild(img);*/
        /*var node = document.getElementById('c3chart_area');
 
        domtoimage.toPng(node)
          .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            document.body.appendChild(img);
            console.log('img')
            console.log(img)
            document.getElementById("cardID").appendChild(img);
          })
          .catch(function (error) {
            console.error('oops, something went wrong!', error);
          });*/
          /*setTimeout( function () {
                htmlToImage.toPng(node)
                  .then(function (dataUrl) {
                    var img = new Image();
                    img.src = dataUrl;
                    document.body.appendChild(img);
                    console.log('img')
                    console.log(img)
                  })
                  .catch(function (error) {
                    console.error('oops, something went wrong!', error);
                  });
          } , 3000);*/
    }

    getRiesgos () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Riesgos", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            riesgos: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    showUmbralIntegral () {
        var navbar = <div className={"row"}>
            <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                <div className={"page-header"}>
                    <h2 className={"pageheader-title"}>Configuraci&oacute;n</h2>
                    <div className={"page-breadcrumb"}>
                        <nav aria-label="breadcrumb">
                            <ol className={"breadcrumb"}>
                                <li className={"breadcrumb-item font-16"} aria-current="page" onClick={this.retornarConfiguracionHome}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                <li className={"breadcrumb-item active font-16"} aria-current="page">Umbral Institucional</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>;
        this.setState({
            navbar: navbar,
            componenteActual: "RiesgoIntegral"
        });
    }

    retornarConfiguracionHome () {
        this.setState({
            componenteActual: "ConfiguracionRiesgos"
        });
    }

    /*render() {
        if(this.state.componenteActual.localeCompare("ConfiguracionRiesgos") == 0) {
            return (
                <div>
                    <div className={"row"}>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="card">
                                <h5 className="card-header">Area Chart</h5>
                                <div className="card-body">
                                    <div id="c3chart_area"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div id="cardID" className="card">
                                <canvas id="myCanvas" width="200" height="100"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }*/

    render() {
        if(this.state.componenteActual.localeCompare("ConfiguracionRiesgos") == 0) {
            return (
                <div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"page-header"}>
                                <h2 className={"pageheader-title"}>Identificar Riesgos</h2>
                                <div className={"page-breadcrumb"}>
                                    <nav aria-label="breadcrumb">
                                        <ol className={"breadcrumb"}>
                                            <li className={"breadcrumb-item active font-16"} aria-current="page">Configuraci&oacute;n</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"card influencer-profile-data"}>
                                <div className={"card-body"}>
                                    <div className={"row border-top border-bottom addPaddingToConfig"}>
                                        <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.showVariables}>Variables</a>
                                        <a className={"btn btn-primary btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.showIndicador}>Indicadores</a>
                                        <a className={"btn btn-brand btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.showRiesgos}>Tipos de Riesgos</a>
                                        <a className={"btn btn-info btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.showUmbralIntegral}>Umbral del Riesgo Integral</a>
                                        <a className={"btn btn-dark btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.showListas}>Administrar Listas</a>
                                        <a className={"btn btn-danger btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.showUsuarios}>Administrar Usuarios</a>
                                        <a className={"btn btn-success btn-block btnWhiteColorHover font-bold font-20"} style={{color: "#fafafa"}} onClick={this.props.showBitacora}>Ver Bitacora</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if(this.state.componenteActual.localeCompare("RiesgoIntegral") == 0) {
            return (
                <div>
                    <Umbral navbar={this.state.navbar}
                                    lista={this.state.riesgos}
                                    idVariable={-99}
                                    pool={this.props.pool}
                                    tablaVariable={"Institucional"}
                                    tituloUmbral={"Institucional"}>
                    </Umbral>
                </div>
            );
        }
    }
}
