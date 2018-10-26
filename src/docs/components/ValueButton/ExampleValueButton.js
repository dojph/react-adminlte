import React from 'react';
import ValueButton from "doj-react-adminlte/ValueButton";

export default class ExampleValueButton extends React.Component {
    constructor() {
        super();
        this.state = {
            myValue: 0
        };
    }

    handleIncrementClick = value => {
        this.setState({ myValue: this.state.myValue + value })
    };

    render() {
        const incrementValue = 2;

        return (
            <div>
                <div>
                    <span className="text-bold">myValue: </span>
                    <span>{this.state.myValue}</span>
                </div>
                <ValueButton className="btn btn-default" value={incrementValue} onClick={this.handleIncrementClick}>
                    Increment myValue
                </ValueButton>
            </div>
        );
    }
}