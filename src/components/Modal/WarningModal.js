import React from 'react';
import Modal from 'doj-react-adminlte/Modal';

export default class WarningModal extends React.Component{
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

    render () {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <button className="btn btn-warning" type="button" onClick={this.handleClick}>
                        Warning Modal
                    </button>
                    <Modal className="modal modal-warning" show={this.state.show} onCloseClick={this.handleCloseClick} fixedScroll>
                        <Modal.Header>
                            Warning Modal
                        </Modal.Header>
                        <Modal.Body>
                            <p>One fine body&hellip;</p>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        );
    }
}