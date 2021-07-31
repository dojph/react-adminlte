import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Manager, Reference, Popper} from 'react-popper';

import MenuItem from './MenuItem';
import Divider from './Divider';

class DropdownButton extends React.Component {
    constructor(props) {
        super(props);

        this.buttonRef = null;
        this.menuRef = null;
        this.state = {
            show: false
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setButtonRef = element => {
        this.buttonRef = element;
    };

    setMenuRef = element => {
        this.menuRef = element;
    };

    closeMenu = () => {
        this.setState({show: false});
    };

    handleClickOutside = event => {
        if (this.state.show && !this.buttonRef.contains(event.target) && !this.menuRef.contains(event.target)) {
            this.closeMenu();
        }
    };

    handleButtonClick = () => {
        this.setState({show: !this.state.show});
    };

    renderButtonLabel = () => {
        const {renderButtonLabel} = this.props;

        if (renderButtonLabel) {
            return renderButtonLabel(this.props.label);
        }

        return (
            <span>
                {this.props.label} <i className="caret"/>
            </span>
        );
    };

    render() {
        // Find menu items
        const children = React.Children.toArray(this.props.children);
        let menuItemCount = 0;
        const menuItems = children.filter(child => child.type === MenuItem || child.type === Divider)
            .map(item => {
                if (item.type === MenuItem) {
                    menuItemCount++;
                    return React.cloneElement(item, {
                        closeMenuCallback: this.closeMenu
                    })
                } else return item
            });
        const {disabledIfEmpty} = this.props;

        return (
            <Manager>
                <Reference>
                    {
                        ({ref}) => {
                            return (
                                <div ref={this.setButtonRef}>
                                    <button ref={ref} type="button" className={this.props.className}
                                            onClick={this.handleButtonClick}
                                            disabled={disabledIfEmpty && menuItemCount === 0}>
                                        {this.renderButtonLabel()}
                                    </button>
                                </div>
                            )
                        }
                    }
                </Reference>
                {
                    this.state.show && menuItemCount > 0 &&
                    ReactDOM.createPortal(
                        <Popper placement={this.props.menuAlignment === 'left' ? 'bottom-start' : 'bottom-end'}
                                modifiers={[
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [0, 2]
                                        }
                                    }
                                ]}>
                            {
                                ({ref, style, placement}) =>
                                    <div ref={this.setMenuRef}>
                                        <ul className="dropdown-menu"
                                            ref={ref} style={{
                                                ...style,
                                                display: 'block',
                                                margin: 0
                                            }} data-placement={placement}>
                                            {
                                                menuItems
                                            }
                                        </ul>
                                    </div>
                            }
                        </Popper>,
                        document.body
                    )
                }
            </Manager>
        );
    }
}

DropdownButton.defaultProps = {
    disabledIfEmpty: true,
    menuAlignment: 'left',
};

DropdownButton.propTypes = {
    /** className gets and sets the value of the class attribute of the specified element. You can also add a CSS class in this prop to style a particular element.*/
    className: PropTypes.string,

    /** Set to true to disable the button if empty.*/
    disabledIfEmpty: PropTypes.bool,

    /** Label of the button.*/
    label: PropTypes.string,

    /** You can set the alignment of the DropdownButton in this prop.*/
    menuAlignment: PropTypes.oneOf([
        'left', 'right'
    ]),

    /** You can bind a complex function that will manipulate the label of the button.*/
    renderButtonLabel: PropTypes.func
};

DropdownButton.MenuItem = MenuItem;
DropdownButton.Divider = Divider;

export default DropdownButton;