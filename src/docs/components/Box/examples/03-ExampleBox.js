import React from 'react';

import Danger from "doj-react-adminlte/Box/Danger";
import Default from "doj-react-adminlte/Box/Default";
import Info from "doj-react-adminlte/Box/Info";
import Primary from "doj-react-adminlte/Box/Primary";
import Success from "doj-react-adminlte/Box/Success";
import Warning from "doj-react-adminlte/Box/Warning";


export default class ExampleBox extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className='row'>
                    <div className='col-xs-4'>
                        <Default/>
                    </div>
                    <div className='col-xs-4'>
                        <Primary/>
                    </div>
                    <div className='col-xs-4'>
                        <Info/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xs-4'>
                        <Warning/>
                    </div>
                    <div className='col-xs-4'>
                        <Success/>
                    </div>
                    <div className='col-xs-4'>
                        <Danger/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}