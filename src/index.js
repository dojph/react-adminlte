import React from 'react';
import ReactDOM from 'react-dom';
import Docs from './docs/Docs';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/components/:component" component={Docs}/>
            <Redirect to="/components/alert"/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
