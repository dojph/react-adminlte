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
        const children = React.Children.toArray(this.props.children);

        //find header
        const header = children.find(item => item.type === Header);

        //find body
        const body = children.find(item => item.type === Body);

        //find footer
        const footer = children.find(item => item.type === Footer);

        return (
            <div>
                <div className={"box " + this.props.theme }>
                    {
                        header &&
                        <div className="box-header with-border">
                            { header }
                            {this.props.collapsible &&
                            <div className="box-tools pull-right">
                                <button onClick={this.toggleCollapse} className="btn btn-box-tool" type="button"><i
                                    className={"fa " + (expanded ? "fa-minus" : "fa-plus")} /></button>
                            </div>
                            }
                        </div>
                    }
                    <SmoothCollapse expanded={expanded}>
                        { body }
                        { footer }
                    </SmoothCollapse>
                </div>
                {
                    this.props.isLoading &&
                    <div className="overlay">
                        <i className="fa fa-spinner fa-spin"/>
                    </div>
                }
            </div>
        );
    }
}

Box.propTypes = {
    isLoading: PropTypes.bool,

    /** Box theme. See AdminLTE guide for a list of themes. */
    theme: PropTypes.string,

    /** Set to true if box should be collapsible. */
    collapsible: PropTypes.bool
};

Box.defaultProps = {
    isLoading: false,
    theme: "box-default",
    collapsible: false
};

Box.Header = Header;
Box.Body = Body;
Box.Footer = Footer;

export default Box;