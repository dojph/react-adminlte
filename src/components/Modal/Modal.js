import React from 'react';
import PropTypes from 'prop-types';
import {CSSTransition} from 'react-transition-group';

import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';

const ModalBody = ({children}) => children || null;

class Modal extends React.Component {
    constructor() {
        super();
        this.state = {
            mounted: false,
            exited: true,
            fixedWidth: 0,
            fixedHeight: 0,
            fixedMaxWidth: 0,
            bodyHeight: 0
        };

        this.bodyRef = null;
        this.contentRef = null;
        this.isMouseDownOnContent = false;
        this.setBodyRef = element => {
            this.bodyRef = element;
        };
        this.setContentRef = element => {
            this.contentRef = element;
        };
    }

    static getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    componentDidMount() {
        this.setState({mounted: true});
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
        if(!this.state.exited) {
            // Force handleExited
            this.handleExited();
        }
    }

    updateDimensions = () => {
        if(this.props.fixedScroll) {
            let maxWidth = 600;
            if(this.props.size === 'large') {
                maxWidth = 1100;
            } else if(this.props.size === 'small') {
                maxWidth = 300;
            }

            const isSmall = window.innerWidth < 768;

            this.setState({
                fixedBodyHeight: window.innerHeight - (isSmall ? 141 : 182),
                fixedWidth: window.innerWidth - 21,
                fixedMaxWidth: maxWidth
            });
        }

        if(this.bodyRef) {
            this.setState({bodyHeight: this.bodyRef.clientHeight});
        }
    };

    handleBackdropMouseUp = event => {
        const {closeOnBackdropClick, onCloseClick} = this.props;
        if(closeOnBackdropClick && !this.isMouseDownOnContent) {
            onCloseClick();
        }
        this.isMouseDownOnContent = false;
    };

    handleBackdropMouseDown = event => {
        this.isMouseDownOnContent = false;
    };

    handleContentMouseDown = event => {
        const clickedElement = event.target;
        if(this.contentRef && this.contentRef.contains(clickedElement)) {
            this.isMouseDownOnContent = true;
        }
    };

    handleEscapeKeypress = event => {
        event = event || window.event;
        let isEscape = false;
        if("key" in event) {
            isEscape = (event.key === "Escape" || event.key === "Esc");
        } else {
            isEscape = (event.keyCode === 27);
        }

        if(isEscape) {
            this.props.onCloseClick();
        }
    };

    handleEnter = () => {
        const scrollbarWidth = Modal.getScrollbarWidth();
        document.body.classList.add('modal-open');

        document.addEventListener('mousedown', this.handleContentMouseDown);
        if(scrollbarWidth) {
            document.body.style.paddingRight = scrollbarWidth + 'px';
        }
        this.setState({exited: false});

        // Add escape key event listener
        const {closeOnEscapeKey} = this.props;
        if(closeOnEscapeKey) {
            window.addEventListener('keyup', this.handleEscapeKeypress);
        }

        this.props.onEnter();
    };

    handleExited = () => {
        document.removeEventListener('mousedown', this.handleContentMouseDown);
        document.body.classList.remove('modal-open');
        document.body.style.paddingRight = null;
        this.setState({exited: true});

        // Remove escape key event listener
        window.removeEventListener('keyup', this.handleEscapeKeypress);

        this.props.onExit();
    };

    render() {
        const children = React.Children.toArray(this.props.children);

        let header = children.find(child => child.type === ModalHeader);
        if(header) {
            header = React.cloneElement(header, {onCloseClick: this.props.onCloseClick});
        }

        const body = children.find(child => child.type === ModalBody);
        const footer = children.find(child => child.type === ModalFooter);

        let dialogClass = "default", dialogStyle = null, bodyStyle = null;

        if(this.props.size === 'large') {
            dialogClass = 'modal-lg';
        } else if(this.props.size === 'small') {
            dialogClass = 'modal-sm';
        }

        if(this.props.fixedScroll) {
            dialogStyle = {
                width: this.state.fixedWidth,
                maxWidth: this.state.fixedMaxWidth
            };

            bodyStyle = {
                width: '100%',
                maxHeight: this.state.fixedBodyHeight,
                overflow: 'auto'
            };
        }

        const {isLoading} = this.props;

        return (
            <CSSTransition
                in={this.state.mounted && this.props.show}
                timeout={150}
                classNames="modal"
                onEnter={this.handleEnter}
                onEntering={this.updateDimensions}
                onExited={this.handleExited}
                unmountOnExit

            >
                {
                    state => (
                        <div className={"modal " + (this.props.className || '')} onMouseUp={this.handleBackdropMouseUp}
                             onMouseDown={this.handleBackdropMouseDown}>
                            <CSSTransition
                                in={(state === 'entering' || state === 'entered')}
                                timeout={300}
                                classNames={'modal-dialog'}
                                unmountOnExit
                            >
                                <div className={`modal-dialog ${dialogClass} ` + (this.props.dialogClassName || '')}
                                     style={dialogStyle} ref={this.setContentRef}>
                                    <div className="modal-content">
                                        {header}
                                        {
                                            isLoading &&
                                            <div className="modal-overlay" style={{height: this.state.bodyHeight}}>
                                                <i className="fa fa-spinner fa-spin"/>
                                            </div>
                                        }
                                        {
                                            body &&
                                            <div className="modal-body" style={bodyStyle} ref={this.setBodyRef}>
                                                {body}
                                            </div>
                                        }
                                        {footer}
                                    </div>
                                </div>
                            </CSSTransition>
                        </div>
                    )
                }
            </CSSTransition>
        );
    }
}

Modal.defaultProps = {
    closeOnBackdropClick: true,
    closeOnEscapeKey: true,
    fixedScroll: false,
    isLoading: false,
    onCloseClick: () => {},
    onEnter: () => {},
    onExit: () => {},
    show: false,
    size: 'default'
};

Modal.propTypes = {
    /** className gets and sets the value of the class attribute of the specified element. You can also add a CSS class in this prop to style a particular element.*/
    className: PropTypes.string,

    /** Set to true to close the modal by just pressing the backdrop.*/
    closeOnBackdropClick: PropTypes.bool,

    /** Set to true to close the modal by pressing Escape key.*/
    closeOnEscapeKey: PropTypes.bool,

    /** dialogClassName is a css class to apply to the Modal Dialog.*/
    dialogClassName: PropTypes.string,

    /** Set to true to show a scrollbar.*/
    fixedScroll: PropTypes.bool,

    /** Returns a boolean value for a postback or loading a content.*/
    isLoading: PropTypes.bool,

    /** The onCloseClick prop allows passing a function that will be invoked when the close button is clicked.*/
    onCloseClick: PropTypes.func,

    /** The onEnter prop allows binding a function that will be invoked when the Enter button is clicked.*/
    onEnter: PropTypes.func,

    /** The function that is binded in this event will be invoked when the user exits the Modal.*/
    onExit: PropTypes.func,

    /** Set to true to automatically show the modal.*/
    show: PropTypes.bool,

    /** You can set the size of the Modal in this prop.*/
    size: PropTypes.oneOf(['default', 'large', 'small'])
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;