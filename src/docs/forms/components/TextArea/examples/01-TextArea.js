import React from 'react';
import {TextArea} from "doj-react-adminlte/Form";

export default class TextArea01 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        };
    }
    handleChange = (name, value) => {
        this.setState({[name]: value});
    };

    render () {
        return (
            <div className="row">
                <div className="col-xs-6">
                    <TextArea name="keyword"
                              label="Basic Text Area"
                              value={this.state.keyword}
                              showCounter
                              onChange={this.handleChange}/>
                </div>
                <div className="col-xs-6">
                    <TextArea label="Disabled TextArea with placeholder"
                              onChange={this.handleChange}
                              disabled
                              gridClass="roundTextArea"
                              maxLength={255}
                              showCounter
                              placeholder="TextArea with placeholder"/>
                </div>
            </div>
        )
    }
}