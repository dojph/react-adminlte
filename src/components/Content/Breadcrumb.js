import React from 'react';
import PropTypes from 'prop-types';

import BreadcrumbItem from './BreadcrumbItem';

class Breadcrumb extends React.Component {
    render() {
        const children = React.Children.toArray(this.props.children);
        const items = children.filter(item => item.type === BreadcrumbItem)
            .map(item => React.cloneElement(item, {
                ...this.props.onItemClick && {onClick: this.props.onItemClick}
            }));
        return (
            <ol className="breadcrumb">
                {items}
            </ol>
        );
    }
}

Breadcrumb.propTypes = {
    onItemClick: PropTypes.func
};

export default Breadcrumb;