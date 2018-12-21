import React from 'react';
import Modal from 'doj-react-adminlte/Modal';

export default class SmallModal extends React.Component {
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
                <div className='col-xs-12'>
                    <button className="btn btn-default" type="button" onClick={this.handleClick}>
                        Small Modal
                    </button>
                    <Modal show={this.state.show} onCloseClick={this.handleCloseClick} size="small" fixedScroll>
                        <Modal.Header>
                            Small Modal
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