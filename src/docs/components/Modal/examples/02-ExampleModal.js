import React from 'react';
import Modal from "doj-react-adminlte/Modal";

class SimpleModal extends React.Component {
    render() {
        const {show, title, message, size, onCloseClick} = this.props;

        return (
            <Modal show={show} onCloseClick={onCloseClick} size={size}>
                <Modal.Header>{title}</Modal.Header>
                <Modal.Body>
                    {message}
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-default pull-left" onClick={onCloseClick}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default class ExampleModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showSmall: false,
            showRegular: false,
            showLarge: false
        };
    }

    handleSmallClick = () => {
        this.setState({showSmall: true});
    };

    handleSmallClose = () => {
        this.setState({showSmall: false});
    };

    handleRegularClick = () => {
        this.setState({showRegular: true});
    };

    handleRegularClose = () => {
        this.setState({showRegular: false});
    };

    handleLargeClick = () => {
        this.setState({showLarge: true});
    };

    handleLargeClose = () => {
        this.setState({showLarge: false});
    };

    render () {
        const {showSmall, showRegular, showLarge} = this.state;

        return (
            <React.Fragment>
                <SimpleModal show={showSmall} title="Small Modal" size="small"
                             message="Small Modal" onCloseClick={this.handleSmallClose}/>
                <SimpleModal show={showRegular} title="Regular Modal"
                             message="Regular Modal" onCloseClick={this.handleRegularClose}/>
                <SimpleModal show={showLarge} title="Large Modal" size="large"
                             message="Large Modal" onCloseClick={this.handleLargeClose}/>
                <div className="btn-group">
                    <button className="btn btn-default" onClick={this.handleSmallClick}>Small Modal</button>
                    <button className="btn btn-default" onClick={this.handleRegularClick}>Regular Modal</button>
                    <button className="btn btn-default" onClick={this.handleLargeClick}>Large Modal</button>
                </div>
            </React.Fragment>
        );
    }
}