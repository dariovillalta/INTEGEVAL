import React from 'react';
import sql from 'mssql';

import Layout from './components/Layout.js';
import LoginPage from './components/LoginPage.js';
//import odbc from 'odbc';

const config = {
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
}

const pool = new sql.ConnectionPool(config, err => {
    if(err) {
        console.log(err);
        console.log("Error en conección con la base de datos");
        /*$("body").overhang({
            type: "error",
            primary: "#f84a1d",
            accent: "#d94e2a",
            message: "Error en conección con la base de datos.",
            overlay: true,
            closeConfirm: true
        });*/
    } else {
        console.log('pool loaded');
    }
});

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            userName: null,
            permision: ""
        }
        // connection2 is now an open Connection
        this.login = this.login.bind(this);
        this.logOff = this.logOff.bind(this);
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

    render() {
        return (
            <div>
                { this.state.isLoggedIn ? (
                    <Layout userName={this.state.userName} permision={this.state.permision} logOff={this.logOff} pool={pool}> </Layout>
                ) : (
                    <LoginPage login={this.login} pool={pool}> </LoginPage>
                )}
            </div>
        );
    }
}
