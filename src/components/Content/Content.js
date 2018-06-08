import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

const Body = ({children}) => children || null;

class Content extends React.Component {
    render() {
        const children = React.Children.toArray(this.props.children);

        const header = children.find(item => item.type === Header);
        const body = children.find(item => item.type === Body);

        return (
            <React.Fragment>
                <section className="content-header">
                    {header}
                </section>
                <section className="content">
                    {body}
                </section>
            </React.Fragment>
        );
    }
}

Content.Header = Header;
Content.Body = Body;

export default Content;