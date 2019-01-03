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

const buttonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px"
};

class CodeExample extends React.Component {
    // Taken from: https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
    copyToClipboard = () => {
        const str = this.props.children;

        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        const selected =
            document.getSelection().rangeCount > 0
                ? document.getSelection().getRangeAt(0)
                : false;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (selected) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }
    };

    render() {
        return (
            <div style={{position: "relative"}}>
                <button className="btn btn-default btn-sm" style={buttonStyle} onClick={this.copyToClipboard}>
                    Copy
                </button>
                <SyntaxHighlighter language='jsx' style={prism} customStyle={customStyle}>
                    {this.props.children}
                </SyntaxHighlighter>
            </div>
        );
    }
}

CodeExample.propTypes = {
    children: PropTypes.string.isRequired
};

export default CodeExample;