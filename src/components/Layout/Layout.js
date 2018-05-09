import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({children}) => children || null;
const Header = ({children}) => children || null;
const Content = ({children}) => children || null;
const Footer = ({children}) => children || null;

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarCollapsed: false,
            sidebarHeight: 0,
            innerHeight: 0
        };
    }

    updateContentHeight = () => {
        this.setState({innerHeight: window.innerHeight});
    };

    handleCollapseClick = event => {
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
        const {sidebarHeight, innerHeight} = this.state;
        const contentHeight = (sidebarHeight - 50 > innerHeight - 101) ? sidebarHeight - 50 : innerHeight - 101;
        const contentStyle = {
            minHeight: contentHeight,
            overflow: 'auto'
        };

        const children = React.Children.toArray(this.props.children);

        const sidebar = children.find(item => item.type === Sidebar);
        const head = children.find(item => item.type === Header);
        const content = children.find(item => item.type === Content);
        const foot = children.find(item => item.type === Footer);

        return (
            <div style={{minHeight: '100%'}}
                 className={this.props.skin + (this.state.sidebarCollapsed ? " sidebar-mini sidebar-collapse" : "")}>
                <header className="main-header">
                    <a href="" className="logo">
                        <span className="logo-mini"><b>AL</b>T</span>
                        <span className="logo-lg"><b>Admin</b>LTE</span>
                    </a>
                    <nav className="navbar navbar-static-top">
                        <a href="" className="sidebar-toggle" onClick={this.handleCollapseClick} role="button">
                            <span className="sr-only">Toggle Navigation</span>
                        </a>
                        {head}
                    </nav>
                </header>
                <aside className="main-sidebar">
                    <section className="sidebar">
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
        );
    }
}

Layout.propTypes = {
    /** AdminLTE skin to apply */
    skin: PropTypes.string
};

Layout.defaultProps = {
    skin: "skin-blue"
};

Layout.Sidebar = Sidebar;
Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;

export default Layout;