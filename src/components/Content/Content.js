import React from 'react';

import Header from './Header';
import Breadcrumb from './Breadcrumb';

const Body = ({children}) => children || null;

class Content extends React.Component {
    render() {
        const children = React.Children.toArray(this.props.children);

        const header = children.find(item => item.type === Header);
        const breadcrumb = children.find(item => item.type === Breadcrumb);
        const body = children.find(item => item.type === Body);

        return (
            <React.Fragment>
                <section className="content-header">
                    {header}
                    {breadcrumb}
                </section>
                <section className="content">
                    {body}
                </section>
            </React.Fragment>
        );
    }
}

Content.Header = Header;
Content.Breadcrumb = Breadcrumb;
Content.Body = Body;

export default Content;