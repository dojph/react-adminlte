import React from 'react';

import Alert from 'doj-react-adminlte/Alert'
export default class ExampleAlert extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: true
        }
    }

    handleDismiss = () => {
        this.setState({ show: false });
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    render() {
        const {show}= this.state;
        if (show) {
            return (
                <div>
                    <Alert iconClass='fa fa-info' type='alert-danger' onClose={this.handleDismiss}>
                        <h1>Warning!!</h1>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <p>
                            <button className='btn btn-success' onClick={this.handleDismiss}>Hide Alert</button>
                        </p>
                    </Alert>
                </div>
            );
        }

        return <button className='btn btn-danger' onClick={this.handleShow}>Show Alert</button>;
    }
}