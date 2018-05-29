import React from 'react';
import Modal from "doj-react-adminlte/Modal";

export default class ExampleModal extends React.Component {
    render() {
        return (
            <Modal>
                <Modal.Header>
                    Default Modal
                </Modal.Header>
                <Modal.Body>
                    <p>One fine body&hellip;</p>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-default pull-left">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </Modal.Footer>
            </Modal>
        );
    }
}