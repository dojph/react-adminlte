import React from 'react';
import PropTypes from 'prop-types';

class DataTableRow extends React.Component {
    handleClick = () => {
        this.props.onClick(this.props.object);
    };

    render() {
        return (
            <tr onClick={this.handleClick} className={this.props.className}>
                {this.props.children}
            </tr>
        );
    }
}

DataTableRow.defaultProps = {
    className: null,
    object: null,
    onClick: object => {}
};

DataTableRow.propTypes = {
    className: PropTypes.string,
    object: PropTypes.any,
    onClick: PropTypes.func
};

export default DataTableRow;