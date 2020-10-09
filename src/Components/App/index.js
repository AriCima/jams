import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppNavBar from '../NavBars/AppNavBar/AppNavBar.js';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import RegisterWithInvitation from '../Auth/RegisterWithInvitation';
import JamRegistrationForm from '../Forms/JamRegistrationForm';
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
                        <Route path="/register/:jamId/:jamName/:adminName/:firstName/:lastName/:invId" exact render={(props) => 
                            <RegisterWithInvitation 
                                propsFn={props.history}
                                jamId={props.match.params.jamId}
                                jamName={props.match.params.jamName}
                                adminName={props.match.params.adminName}
                                firstName={props.match.params.firstName}
                                lastName={props.match.params.lastName}
                                invId={props.match.params.invId}
                            />
                        } 
                        />
                        <Route path="/jam-register/:jamId:/:jamName/:invId" exact render={(props) => 
                            <JamRegistrationForm
                                propsFn={props.history}
                                jamId={props.match.params.jamId}
                                jamName={props.match.params.jamName}
                                invId={props.match.params.invId} />} 
                            />
                    </Switch>
                </div>
                <div className="footer"><Footer /></div>
            </div>
        </BrowserRouter>
    );
}


export default App;
