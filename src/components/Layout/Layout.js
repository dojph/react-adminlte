import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import NavMenu from './NavMenu';

//const Sidebar = ({children}) => children || null;
const Header = ({children}) => children || null;
const Body = ({children}) => children || null;
const Footer = ({children}) => children || null;

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarCollapsed: false,
            innerHeight: 0
        };
    }

    updateContentHeight = () => {
        this.setState({innerHeight: window.innerHeight});
    };

    toggleCollapse = event => {
        event.preventDefault();
        this.setState({sidebarCollapsed: !this.state.sidebarCollapsed});
    };

    componentDidMount() {
        if(window) {
            window.addEventListener('resize', this.updateContentHeight);
            this.updateContentHeight();
        }
    }

    componentWillUnmount() {
        if(window) {
            window.removeEventListener('resize', this.updateContentHeight);
        }
    }

    render() {
        const {innerHeight} = this.state;
        const contentHeight = innerHeight - 101;
        const contentStyle = {
            minHeight: contentHeight,
            overflow: 'auto'
        };

        const children = React.Children.toArray(this.props.children);

        let sidebar = children.find(item => item.type === Sidebar);
        if(sidebar) {
            sidebar = React.cloneElement(sidebar,
                {sidebarCollapsed: this.state.sidebarCollapsed && window.innerWidth > 768})
        }

        const head = children.find(item => item.type === Header);
        const navMenu = children.find(item => item.type === NavMenu);
        const content = children.find(item => item.type === Body);
        const foot = children.find(item => item.type === Footer);

        // Check if mobile
        const collapsedClass = window.innerWidth > 768 ? " sidebar-collapse" : " sidebar-open";

        const appName = this.props.appName || <span><b>Admin</b>LTE</span>;
        const appNameShort = this.props.appNameShort || <span><b>AL</b>T</span>;

        return (
            <div style={{height: 'auto', minHeight: '100%'}}
                 className={this.props.skin + " sidebar-mini" +
                 (this.state.sidebarCollapsed ? collapsedClass : "")}>
                <div style={{height: 'auto', minHeight: '100%'}} className="wrapper" >
                    <header className="main-header">
                        <a href="" className="logo">
                            <span className="logo-mini">{appNameShort}</span>
                            <span className="logo-lg">{appName}</span>
                        </a>
                        <nav className="navbar navbar-static-top">
                            <a href="" className="sidebar-toggle" onClick={this.toggleCollapse} role="button">
                                <span className="sr-only">Toggle Navigation</span>
                            </a>
                            {head}
                            {navMenu}
                        </nav>
                    </header>
                    <aside className="main-sidebar">
                        <section className="sidebar" style={{height: "auto"}}>
                            <ul className="sidebar-menu tree">
                                {sidebar}
                            </ul>
                        </section>
                    </aside>
                    <div style={contentStyle} className="content-wrapper">
                        {content}
                    </div>
                    <footer className="main-footer">
                        {foot}
                    </footer>
                </div>
            </div>
        );
    }
}

Layout.propTypes = {
    /** AdminLTE skin to apply */
    skin: PropTypes.string,

    /** Application name to display in the header */
    appName: PropTypes.node,

    /** Text to display when sidebar is collapsed */
    appNameShort: PropTypes.node
};

Layout.defaultProps = {
    skin: "skin-blue",
};

Layout.Sidebar = Sidebar;
Layout.Header = Header;
Layout.NavMenu = NavMenu;
Layout.Body = Body;
Layout.Footer = Footer;

export default Layout;