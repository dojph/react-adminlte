import React from 'react';
import Alert from 'doj-react-adminlte/Alert';

export default class ExampleAlert extends React.Component{
    render () {
        return (
            <Alert type='alert-info' title="Info!"
                   iconClass='fa fa-info'>
                <p>This alert box indicates a neutral informative action.</p>
            </Alert>
        );
    }
}