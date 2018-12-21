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
        const {isLoading} = this.props;
        return (
            <div className='row'>
                <div className='col-xs-4'>
                    <button className="btn btn-default" type="button" onClick={this.handleClick}>
                        Open Modal
                    </button>
                    <Modal isLoading={isLoading} className="modal modal-default" show={this.state.show} onCloseClick={this.handleCloseClick} fixedScroll>
                        <Modal.Header>
                            Default Modal
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                Show prop is used for setting the state of the modal. Show prop is a boolean with values of either true or false.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-default pull-left" onClick={this.handleCloseClick}>
                                Close
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}