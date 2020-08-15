"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _Umbral = _interopRequireDefault(require("./Umbral/Umbral.js"));

var _domToImage = _interopRequireDefault(require("dom-to-image"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var nodemailer = require('nodemailer');

var c3 = require("c3");

var d3 = require("d3");

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
}; //faltan warning
//light

var ConfiguracionRiesgos =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ConfiguracionRiesgos, _React$Component);

  function ConfiguracionRiesgos(props) {
    var _this;

    _classCallCheck(this, ConfiguracionRiesgos);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConfiguracionRiesgos).call(this, props));
    _this.state = {
      componenteActual: "ConfiguracionRiesgos",
      navbar: "",
      riesgos: []
    };
    _this.getRiesgos = _this.getRiesgos.bind(_assertThisInitialized(_this));
    _this.showUmbralIntegral = _this.showUmbralIntegral.bind(_assertThisInitialized(_this));
    _this.retornarConfiguracionHome = _this.retornarConfiguracionHome.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ConfiguracionRiesgos, [{
    key: "componentDidMount",
    value: function componentDidMount() {
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
  }, {
    key: "getRiesgos",
    value: function getRiesgos() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Riesgos", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                riesgos: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "showUmbralIntegral",
    value: function showUmbralIntegral() {
      var navbar = _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Configuraci\xF3n"), _react["default"].createElement("div", {
        className: "page-breadcrumb"
      }, _react["default"].createElement("nav", {
        "aria-label": "breadcrumb"
      }, _react["default"].createElement("ol", {
        className: "breadcrumb"
      }, _react["default"].createElement("li", {
        className: "breadcrumb-item font-16",
        "aria-current": "page",
        onClick: this.retornarConfiguracionHome
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Configuraci\xF3n")), _react["default"].createElement("li", {
        className: "breadcrumb-item active font-16",
        "aria-current": "page"
      }, "Umbral Institucional")))))));

      this.setState({
        navbar: navbar,
        componenteActual: "RiesgoIntegral"
      });
    }
  }, {
    key: "retornarConfiguracionHome",
    value: function retornarConfiguracionHome() {
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

  }, {
    key: "render",
    value: function render() {
      if (this.state.componenteActual.localeCompare("ConfiguracionRiesgos") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "page-header"
        }, _react["default"].createElement("h2", {
          className: "pageheader-title"
        }, "Identificar Riesgos"), _react["default"].createElement("div", {
          className: "page-breadcrumb"
        }, _react["default"].createElement("nav", {
          "aria-label": "breadcrumb"
        }, _react["default"].createElement("ol", {
          className: "breadcrumb"
        }, _react["default"].createElement("li", {
          className: "breadcrumb-item active font-16",
          "aria-current": "page"
        }, "Configuraci\xF3n"))))))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "card influencer-profile-data"
        }, _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "row border-top border-bottom addPaddingToConfig"
        }, _react["default"].createElement("a", {
          className: "btn btn-success btn-block btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: this.props.showVariables
        }, "Variables"), _react["default"].createElement("a", {
          className: "btn btn-primary btn-block btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: this.props.showIndicador
        }, "Indicadores"), _react["default"].createElement("a", {
          className: "btn btn-brand btn-block btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: this.props.showRiesgos
        }, "Tipos de Riesgos"), _react["default"].createElement("a", {
          className: "btn btn-info btn-block btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: this.showUmbralIntegral
        }, "Umbral del Riesgo Integral"), _react["default"].createElement("a", {
          className: "btn btn-dark btn-block btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: this.props.showListas
        }, "Administrar Listas"), _react["default"].createElement("a", {
          className: "btn btn-danger btn-block btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: this.props.showUsuarios
        }, "Administrar Usuarios"), _react["default"].createElement("a", {
          className: "btn btn-success btn-block btnWhiteColorHover font-bold font-20",
          style: {
            color: "#fafafa"
          },
          onClick: this.props.showBitacora
        }, "Ver Bitacora")))))));
      } else if (this.state.componenteActual.localeCompare("RiesgoIntegral") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_Umbral["default"], {
          navbar: this.state.navbar,
          lista: this.state.riesgos,
          idVariable: -99,
          pool: this.props.pool,
          tablaVariable: "Institucional",
          tituloUmbral: "Institucional"
        }));
      }
    }
  }]);

  return ConfiguracionRiesgos;
}(_react["default"].Component);

exports["default"] = ConfiguracionRiesgos;
//# sourceMappingURL=ConfiguracionRiesgos.js.map
