import React from 'react';
import sql from 'mssql';
import fs from 'fs';

import Layout from './components/Layout.js';
import LoginPage from './components/LoginPage.js';
import MessageModal from './components/MessageModal.js';
//import odbc from 'odbc';

/*const config = {
    user: 'SA',
    password: 'password111!',
    server: 'localhost',
    database: 'TOLOC_INTEG',
    stream: true,
    pool: {
        max: 40,
        min: 0,
        idleTimeoutMillis: 60000
    },
    options: {
        useUTC: false
    }
}*/

/*const pool = new sql.ConnectionPool(config, err => {
    if(err) {
        console.log(err);
        console.log("Error en conección con la base de datos");
        $("body").overhang({
            type: "error",
            primary: "#f84a1d",
            accent: "#d94e2a",
            message: "Error en conección con la base de datos.",
            overlay: true,
            closeConfirm: true
        });
    } else {
        console.log('pool loaded');
    }
});*/

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            userID: -1,
            userName: null,
            permision: "",
            config: {},
            pool: null,
            conexionAbierta: false,
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: ""}
        }
        // connection2 is now an open Connection
        this.login = this.login.bind(this);
        this.logOff = this.logOff.bind(this);
        this.readConfigFile = this.readConfigFile.bind(this);
        this.connectToDB = this.connectToDB.bind(this);
        this.dismissMessageModal = this.dismissMessageModal.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
        this.readConfigFile();
    }

    login(id, userName, permision) {
        this.setState({
            isLoggedIn: true,
            userID: id,
            userName: userName,
            permision: permision
        });
    }

    logOff () {
        this.setState({
            isLoggedIn: false,
            userID: -1,
            userName: null,
            permision: "",
        });
    }

    readConfigFile () {
        fs.readFile('./conf.dar', 'utf-8', (err, data) => {
            if(err) {
                this.setState({
                    mensajeModal: {mostrarMensaje: true, mensajeConfirmado: false, esError: true, esConfirmar: false, titulo: "Error", mensaje: "Error al leer el archivo de configuracion de tabla."}
                });
            } else {
                var lineas = data.split("\n");
                var user, password, server, database;
                for (var i = 0; i < lineas.length; i++) {
                    if(i == 0) {
                        //var bytes = CryptoJS.AES.decrypt(lineas[i].replace(/\r?\n|\r/g), 'AncientAliens');
                        //var despues = bytes.toString(CryptoJS.enc.Utf8);
                        user = lineas[i].toString();
                    } else if(i == 1) {
                        /*var bytes = CryptoJS.AES.decrypt(lineas[i].replace(/\r?\n|\r/g), 'AncientAliens');
                        var despues = bytes.toString(CryptoJS.enc.Utf8);*/
                        password = lineas[i].toString();
                    } else if(i == 2) {
                        /*var bytes = CryptoJS.AES.decrypt(lineas[i].replace(/\r?\n|\r/g), 'AncientAliens');
                        var despues = bytes.toString(CryptoJS.enc.Utf8);*/
                        server = lineas[i].toString();
                    } else if(i == 3) {
                        /*var bytes = CryptoJS.AES.decrypt(lineas[i].replace(/\r?\n|\r/g), 'AncientAliens');
                        var despues = bytes.toString(CryptoJS.enc.Utf8);*/
                        database = lineas[i].toString();
                    }
                };
                if(user != undefined && password != undefined && server != undefined && database != undefined ) {
                    var configTemp  = {
                        user: user,
                        password: password,
                        server: server,
                        database: database,
                        stream: true,
                        pool: {
                            max: 40,
                            min: 0,
                            idleTimeoutMillis: 60000
                        },
                        options: {
                            useUTC: false
                        }
                    }
                    this.setState({
                        config: configTemp
                    }, this.connectToDB );
                }
            }
        });
    }

    connectToDB () {
        var poolTemp = new sql.ConnectionPool(this.state.config, err => {
            if(err) {
                console.log(err);
                console.log("Error en conección con la base de datos");
                this.setState({
                    mensajeModal: {mostrarMensaje: true, mensajeConfirmado: false, esError: true, esConfirmar: false, titulo: "Error", mensaje: "Error en conección con la base de datos. Ver Consola."}
                });
            } else {
                console.log('pool loaded');
                this.setState({
                    conexionAbierta: true
                });
            }
        });
        this.setState({
            pool: poolTemp
        });
    }

    dismissMessageModal() {
        this.setState({
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: ""}
        });
    }

    showMessage(titulo, mensaje, esError, esConfirmar) {
        this.setState({
            mensajeModal: {mostrarMensaje: true, esError: esError, esConfirmar: esConfirmar, titulo: titulo, mensaje: mensaje}
        });
    }

    render() {
        return (
            <div>
                { this.state.isLoggedIn ? (
                    <Layout userID={this.state.userID} userName={this.state.userName} permision={this.state.permision} logOff={this.logOff} pool={this.state.pool}> </Layout>
                ) : (
                    <LoginPage login={this.login} pool={this.state.pool} readConfigFile={this.readConfigFile} conexionAbierta={this.state.conexionAbierta} showMessage={this.showMessage}> </LoginPage>
                )}

                { this.state.mensajeModal.mostrarMensaje ? (
                    <MessageModal esError={this.state.mensajeModal.esError} esConfirmar={this.state.mensajeModal.esConfirmar} dismissMessage={this.dismissMessageModal}  titulo={this.state.mensajeModal.titulo} mensaje={this.state.mensajeModal.mensaje}> </MessageModal>
                ) : (
                    <span></span>
                )}
            </div>
        );
    }
}
