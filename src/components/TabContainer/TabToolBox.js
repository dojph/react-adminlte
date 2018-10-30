import React from 'react';

class TabToolBox extends React.Component {
    render() {
        return (
            <div style={{float: 'right', marginTop: '5px', marginRight: '4px'}}>
                {this.props.children}
            </div>
        );
    }
}

export default TabToolBox;