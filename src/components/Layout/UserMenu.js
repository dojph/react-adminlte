import React from 'react';
import PropTypes from 'prop-types';
import Avatar from "doj-react-adminlte/Avatar";

const Body = ({children}) => children || null;
const Footer = ({children}) => children || null;

class UserMenu extends React.Component {
    constructor(props) {
        super(props);

        this.rootNode = null;
        this.state = {
            open: false
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    setRootNodeRef = element => {
        this.rootNode = element;
    };

    handleClickOutside = event => {
        if(this.state.open && this.rootNode && !this.rootNode.contains(event.target)) {
            this.closeUserMenu();
        }
    };

    toggleUserMenu = event => {
        event.preventDefault();
        this.setState({open: !this.state.open});
    };

    closeUserMenu = () => {
        this.setState({open: false});
    };

    render() {
        const children = React.Children.toArray(this.props.children);

        const userBody = children.find(item => item.type === Body);
        const userFooter = children.find(item => item.type === Footer);
        const smallAvatarStyle = {
            float: 'left',
            marginTop: '-2px'
        };
        const avatarContainerStyle = {
            display: 'inline-block',
            width: '96px',
            height: '96px',
            border: '3px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
        };

        return (
            <li ref={this.setRootNodeRef}
                className={"dropdown user user-menu" + (this.state.open ? " open" : "")}>
                <a onClick={this.toggleUserMenu} href="" className="dropdown-toggle" style={{ minHeight: '50px'}}>
                    <span style={smallAvatarStyle}>
                        <Avatar imgSrc={this.props.avatarSrc}
                                firstName={this.props.firstName} lastName={this.props.lastName} size={25} round/>
                        </span>
                    <span className="hidden-xs" style={{marginLeft: '10px'}}>
                        {this.props.firstName + (this.props.lastName ? ` ${this.props.lastName}` : "")}
                    </span>
                </a>
                <ul className="dropdown-menu">
                    <li className="user-header">
                        <span style={avatarContainerStyle}>
                            <Avatar imgSrc={this.props.avatarSrc}
                                    firstName={this.props.firstName} lastName={this.props.lastName} size={90} round/>
                        </span>
                        <p>
                            {this.props.title}
                            {this.props.subTitle && <small>{this.props.subTitle}</small>}
                        </p>
                    </li>
                    {
                        userBody &&
                        <li className="user-body">
                            {userBody}
                        </li>
                    }
                    {
                        userFooter &&
                        <li className="user-footer">
                            {userFooter}
                        </li>
                    }
                </ul>
            </li>
        );
    }
}

UserMenu.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    avatarSrc: PropTypes.string
};

UserMenu.Body = Body;
UserMenu.Footer = Footer;

export default UserMenu;