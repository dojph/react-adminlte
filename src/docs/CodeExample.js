import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import {prism} from 'react-syntax-highlighter/styles/prism';

const customStyle = {
    border: "none",
    borderTop: "1px solid #d2d6de",
    backgroundColor: "#faf8f5",
    borderRadius: 0,
    margin: 0
};

class CodeExample extends React.Component {
    render() {
        return (
            <SyntaxHighlighter language='jsx' style={prism} customStyle={customStyle}>
                {this.props.children}
            </SyntaxHighlighter>
        );
    }
}

CodeExample.propTypes = {
    children: PropTypes.string.isRequired
};

export default CodeExample;