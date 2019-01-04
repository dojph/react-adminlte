import React from 'react';
import Modal from 'doj-react-adminlte/Modal';

class ThemeableModal extends React.Component {
    render() {
        const {className, title, show, onCloseClick} = this.props;

        return (
            <Modal className={className} show={show} onCloseClick={onCloseClick}>
                <Modal.Header>
                    {title}
                </Modal.Header>
                <Modal.Body>
                    One fine body!
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-default pull-right" onClick={onCloseClick}>Close</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default class ExampleModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultShow: false,
            infoShow: false,
            dangerShow: false,
            warningShow: false,
            successShow: false
        };
    }

    onDefaultClick = () => {
        this.setState({defaultShow: true});
    };

    onDefaultClose = () => {
        this.setState({defaultShow: false});
    };

    onInfoClick = () => {
        this.setState({infoShow: true});
    };

    onInfoClose = () => {
        this.setState({infoShow: false});
    };

    onDangerClick = () => {
        this.setState({dangerShow: true});
    };

    onDangerClose = () => {
        this.setState({dangerShow: false});
    };

    onWarningClick = () => {
        this.setState({warningShow: true});
    };

    onWarningClose = () => {
        this.setState({warningShow: false});
    };

    onSuccessClick = () => {
        this.setState({successShow: true});
    };

    onSuccessClose = () => {
        this.setState({successShow: false});
    };

    render () {
        const {defaultShow, infoShow, dangerShow, warningShow, successShow} = this.state;

        return (
            <React.Fragment>
                <ThemeableModal show={defaultShow} onCloseClick={this.onDefaultClose}
                                title="Default Modal"/>
                <ThemeableModal show={infoShow} className="modal-info"
                                title="Info Modal" onCloseClick={this.onInfoClose}/>
                <ThemeableModal show={dangerShow} className="modal-danger"
                                title="Danger Modal" onCloseClick={this.onDangerClose}/>
                <ThemeableModal show={warningShow} className="modal-warning"
                                title="Warning Modal" onCloseClick={this.onWarningClose}/>
                <ThemeableModal show={successShow} className="modal-success"
                                title="Success Modal" onCloseClick={this.onSuccessClose}/>
                <div className="btn-group">
                    <button onClick={this.onDefaultClick}
                            className="btn btn-default">Default</button>
                    <button onClick={this.onInfoClick}
                            className="btn btn-default">Info</button>
                    <button onClick={this.onDangerClick}
                            className="btn btn-default">Danger</button>
                    <button onClick={this.onWarningClick}
                            className="btn btn-default">Warning</button>
                    <button onClick={this.onSuccessClick}
                            className="btn btn-default">Success</button>
                </div>
            </React.Fragment>
        );
    }
}