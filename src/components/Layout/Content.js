import React from 'react';
import PropTypes from 'prop-types';

class Content extends React.Component {
    render() {
        return (
            <React.Fragment>
                <section className="content-header">
                    {
                        this.props.header &&
                        <h1>
                            {this.props.header}
                            {
                                this.props.subheader &&
                                <small className="margin-r-5">{this.props.subheader}</small>
                            }
                        </h1>
                    }
                </section>
                <section className="content">
                    {this.props.children}
                </section>
            </React.Fragment>
        );
    }
}

Content.propTypes = {
    header: PropTypes.string,
    subheader: PropTypes.string,
};

export default Content;