import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Footer from './Footer';
import setAuthToken from './utils/setAuth';
import {BrowserRouter as Router , Link ,Route} from 'react-router-dom';
import { ProtectedRoute } from './protectedRoute';
export default class Index extends Component {
    render() {
        return (
            <div className="container">
            <div className="col-md-4"></div>
            <Header  className="col-md-4"/>
            <div className="col-md-4"></div>
            </div>
        );
    }
}

setAuthToken(localStorage.passportToken);

if (document.getElementById('app')) {
    ReactDOM.render(<Router><Index /></Router>, document.getElementById('app'));
}
