import React from 'react';
import Modal from "doj-react-adminlte/Modal";

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
                <button className="btn btn-default" type="button" onClick={this.handleClick}>
                    Open Default Modal
                </button>
                <Modal show={this.state.show} onCloseClick={this.handleCloseClick}>
                    <Modal.Header>
                        Default Modal
                    </Modal.Header>
                    <Modal.Body>
                        <p>One fine body&hellip;</p>
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