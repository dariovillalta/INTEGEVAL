import React from 'react';
import sql from 'mssql';
import fs from 'fs';

import Layout from './components/Layout.js';
import LoginPage from './components/LoginPage.js';
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
            userName: null,
            permision: "",
            config: {},
            pool: null
        }
        // connection2 is now an open Connection
        this.login = this.login.bind(this);
        this.logOff = this.logOff.bind(this);
        this.readConfigFile = this.readConfigFile.bind(this);
        this.connectToDB = this.connectToDB.bind(this);
    }

    componentDidMount() {
        this.readConfigFile();
    }

    login(userName, permision) {
        this.setState({
            isLoggedIn: true,
            userName: null,
            permision: permision
        });
    }

    logOff () {
        this.setState({
            isLoggedIn: false
        });
    }

    readConfigFile () {
        fs.readFile('./conf.dar', 'utf-8', (err, data) => {
            if(err) {
                alert("Error al leer el archivo de configuracion de tabla.")
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
                alert("Error en conección con la base de datos");
            } else {
                console.log('pool loaded');
            }
        });
        this.setState({
            pool: poolTemp
        });
    }

    render() {
        return (
            <div>
                { this.state.isLoggedIn ? (
                    <Layout userName={this.state.userName} permision={this.state.permision} logOff={this.logOff} pool={this.state.pool}> </Layout>
                ) : (
                    <LoginPage login={this.login} pool={this.state.pool} readConfigFile={this.readConfigFile}> </LoginPage>
                )}
            </div>
        );
    }
}
