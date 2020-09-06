import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppNavBar from '../NavBars/AppNavBar/AppNavBar.js';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import RegisterWithJamId from '../Auth/RegisterWithJamId';
import Dashboard from '../Dashboard';
import Footer from '../Footer';

import './index.scss';


function App() {
    return (

        <BrowserRouter>
            <div className="App">
                <div className="navBar"><AppNavBar /></div>
                <div className="app-body">
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route path="/register/:jamID/:invID" exact render={(props) => <RegisterWithJamId propsFn={props.history} jamId={props.match.params.jamID} invId={props.match.params.invID} />} />
                    </Switch>
                </div>
                <div className="footer"><Footer /></div>
            </div>
        </BrowserRouter>
    );
}


export default App;
