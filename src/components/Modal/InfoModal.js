import React from 'react';
import Modal from 'doj-react-adminlte/Modal';

export default class InfoModal extends React.Component{
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
                    <button className="btn btn-info" type="button" onClick={this.handleClick}>
                        Info Modal
                    </button>
                    <Modal className="modal modal-info" show={this.state.show} onCloseClick={this.handleCloseClick} fixedScroll>
                        <Modal.Header>
                            Info Modal
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