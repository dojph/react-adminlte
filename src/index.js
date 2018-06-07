import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Docs from './docs/Docs';
import ExampleLoginScreen from "./docs/layoutExamples/ExampleLoginScreen";

ReactDOM.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route exact path="/components/:component" component={Docs}/>
            <Route exact path="/examples/example-login-screen" component={ExampleLoginScreen}/>
            <Redirect to="/components/alert"/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
