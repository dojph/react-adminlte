import React from 'react';
import Modal from "doj-react-adminlte/Modal";
import {
    CheckBox, TextArea,
} from "doj-react-adminlte/Form";

export default class ExampleModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    handleClick = () => {
        this.setState({show: true});
    };

    handleCloseClick = () => {
        this.setState({show: false});
    };

    render() {
        return (
            <div>
                <button className="btn btn-info" type="button" onClick={this.handleClick}>
                    Open Default Modal
                </button>
                <Modal show={this.state.show} onCloseClick={this.handleCloseClick} size="large" fixedScroll>
                    <Modal.Header>
                        Default Modal
                    </Modal.Header>
                    <Modal.Body>
                        <p>One fine body&hellip;</p>
                        <div className="row">
                            <div className="col-xs-12">
                                <TextArea name="comments" value={this.state.comments} label="Comments" showCounter/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6">
                                <span className="text-bold">Multiple Choice</span>
                                <CheckBox label="Choice 1" name="choice1"/>
                                <CheckBox label="Choice 2" name="choice2"/>
                                <CheckBox label="Choice 3" name="choice3"/>
                                <CheckBox label="Choice 4" name="choice4"/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-default pull-left" onClick={this.handleCloseClick}>
                            Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={this.handleCloseClick}>
                            Save changes
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}