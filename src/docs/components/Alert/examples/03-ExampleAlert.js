import React from 'react';
import Alert from 'doj-react-adminlte/Alert';

export default class ExampleAlert extends React.Component {
    constructor (props) {
        super(props);
        this.state ={
            show: true
        }
    }

    handleDismiss = () => {
        this.setState({show: false});
    };

    render() {
        const {show} = this.state;
        return (
            <Alert type='alert-warning' title="Warning!" iconClass='fa fa-warning' onClose={this.handleDismiss} show={show}>
                <p>This is a <b>Warning Alert</b> example.</p>
            </Alert>
        );
    }
}