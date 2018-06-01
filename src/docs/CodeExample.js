import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import {prism} from 'react-syntax-highlighter/styles/prism';

class CodeExample extends React.Component {
    render() {
        return (
            <SyntaxHighlighter language='jsx' style={prism}>
                {this.props.children}
            </SyntaxHighlighter>
        );
    }
}

CodeExample.propTypes = {
    children: PropTypes.string.isRequired
};

export default CodeExample;