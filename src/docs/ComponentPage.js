import React from 'react';
import PropTypes from 'prop-types';
import Example from './Example';
import Props from './Props';

const articleStyle = {
    padding: "0 40px 50px 40px"
};

const titleStyle = {
    padding: "20px 20px 20px 0",
    borderBottom: "1px solid #d2d6de"
};

class ComponentPage extends React.Component {
    render() {
        const {componentPath, component, title} = this.props;
        const {name, props, examples} = component;
        let Description;
        try {
            Description = require(`${componentPath}`).default;
        } catch {
            Description = null;
        }

        return (
            <React.Fragment>
                <article style={articleStyle}>
                    <section className="content-header" style={{paddingTop: 0}}>
                        <div className="row">
                            <div className="col-lg-8">
                                <h1 style={titleStyle}>{title || name}</h1>
                            </div>
                        </div>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="col-lg-8">
                            { Description && <Description/> }
                            {
                                examples.length > 0 ?
                                    examples.map( example => <Example key={example.code} example={example}
                                                                      componentName={name} componentPath={componentPath} /> ) :
                                    "No examples exist."
                            }
                            <h4 style={{marginTop: "20px"}}>Props</h4>
                            {
                                props ?
                                    <Props props={props} /> :
                                    "This component accepts no props."
                            }
                            </div>
                        </div>
                    </section>
                </article>
            </React.Fragment>
        );
    }
}

ComponentPage.propTypes = {
    component: PropTypes.object.isRequired
};

export default ComponentPage;