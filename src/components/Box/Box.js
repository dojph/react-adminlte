import React from "react";
import SmoothCollapse from 'react-smooth-collapse';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import PropTypes from 'prop-types';

/** AdminLTE Box component. */
class Box extends React.Component {
    constructor() {
        super();
        this.state = {
            expanded: true
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse() {
        this.setState({expanded: !this.state.expanded});
    }

    render() {
        const {expanded} = this.state;
        let header = null,
            body = null,
            footer = null;

        const {children} = this.props;

        if (children && children.constructor === Array) {
            //find header
            header = children.find(item => item.type === Header);

            //find body
            body = children.find(item => item.type === Body);

            //find footer
            footer = children.find(item => item.type === Footer);
        }

        return (
            <div>
                <div className={"box " + this.props.theme }>
                    <div className="box-header with-border">
                        { header }
                        {this.props.collapsible &&
                        <div className="box-tools pull-right">
                            <button onClick={this.toggleCollapse} className="btn btn-box-tool" type="button"><i
                                className={"fa " + (expanded ? "fa-minus" : "fa-plus")} /></button>
                        </div>
                        }
                    </div>
                    <SmoothCollapse expanded={expanded}>
                        { body }
                        { footer }
                    </SmoothCollapse>
                </div>
            </div>
        );
    }
}

Box.propTypes = {
    /** Box theme. See AdminLTE guide for a list of themes. */
    theme: PropTypes.string,

    /** Set to true if box should be collapsible. */
    collapsible: PropTypes.bool
};

Box.defaultProps = {
    theme: "box-default",
    collapsible: false
};

Box.Header = Header;
Box.Body = Body;
Box.Footer = Footer;

export default Box;