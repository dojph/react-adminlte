import React from 'react';
import Alert from 'doj-react-adminlte/Alert';

export default class ExampleAlert extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Alert type='alert-info' title="Info Alert!"
                       iconClass='fa fa-info'>
                    <p>This alert box indicates a neutral informative change or action.</p>
                </Alert>
                <Alert type='alert-danger' title="Danger Alert!"
                       iconClass='fa fa-ban'>
                    <p>This alert box indicates a dangerous action.</p>
                </Alert>
                <Alert type='alert-warning' title="Warning Alert!"
                       iconClass='fa fa-warning'>
                    <p>This alert box indicates a warning that needs attention.</p>
                </Alert>
                <Alert type='alert-success' title="Success Alert!"
                       iconClass='fa fa-check'>
                    <p>This alert box indicates a successful action.</p>
                </Alert>
            </React.Fragment>
        );
    }
}