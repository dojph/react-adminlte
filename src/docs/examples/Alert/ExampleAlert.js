import React from 'react';
import Alert from 'doj-react-adminlte/Alert';

export default class ExampleAlert extends React.Component {
    render() {
        return (
            <Alert type='alert-info' title="My Alert!"
                   iconClass='fa fa-info'
                   onClose={() => console.log("Alert closed.")}>
                <p>This is an example alert.</p>
            </Alert>
        );
    }
}