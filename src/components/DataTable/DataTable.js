import React from 'react';
import PropTypes from 'prop-types';

import DataTableRow from "./DataTableRow";
import './styles.css';

class DataTable extends React.Component {
    renderCell = (object, renderValue, index) => {
        let cell = null;
        if(typeof renderValue === 'string') {
            cell = object[renderValue];
        } else if(typeof renderValue === 'function') {
            cell = renderValue(object, this.props.data, this.props.extra);
        }

        return <td key={index}>{cell}</td>;
    };

    renderRow = (object, key) => {
        return (
            <DataTableRow key={object[this.props.identifierKey] || key} object={object} onClick={this.props.onRowClick}>
                {this.props.columnDefs.map((column, index) => this.renderCell(object, column.renderValue, index))}
            </DataTableRow>
        );
    };

    renderHeaders = () => {
        return this.props.columnDefs.map((column, index) => <th key={index}>{column.header}</th>);
    };

    renderEmptyMessage = () => {
        const {showEmptyMessageRow} = this.props;
        return showEmptyMessageRow ?
            <tr><td colSpan={this.props.columnDefs.length}>{this.props.emptyMessage}</td></tr> :
            null;
    };

    renderTableBody = () => {
        const {data} = this.props;

        if(this.props.bodyRenderer) {
            const body = this.props.bodyRenderer(data, this.renderRow);
            if(body && (body.constructor !== Array || body.length)) {
                return body;
            }

            return this.renderEmptyMessage();
        }

        if(!data.length) {
            return this.renderEmptyMessage();
        }

        return data.map((object, index) => this.renderRow(object, index));
    };

    renderTableFoot() {
        if(this.props.footRenderer) {
            return this.props.footRenderer();
        }
    }

    render() {
        return (
            <div className="row">
                <div className={"col-xs-12 table-responsive " + this.props.className}>
                    <table className={"table table-hover " + this.props.tableClassName}>
                        <thead>
                            <tr>{this.renderHeaders()}</tr>
                        </thead>
                        <tbody>
                            {this.renderTableBody()}
                        </tbody>
                        <tfoot>
                            {this.renderTableFoot()}
                        </tfoot>
                    </table>
                </div>
            </div>
        );
    }
}

DataTable.defaultProps = {
    className: "",
    columnDefs: [],
    data: [],
    emptyMessage: "No records found.",
    extra: {},
    identifierKey: 'id',
    onRowClick: object => {},
    showEmptyMessageRow: true,
    tableClassName: ""
};

DataTable.propTypes = {
    /** It sets the data inside the Table Body.*/
    bodyRenderer: PropTypes.func,

    /** className gets and sets the value of the class attribute of the specified element. You can also add a CSS class in this prop to style a particular element.*/
    className: PropTypes.string,

    /** It sets a column definition properties.*/
    columnDefs: PropTypes.arrayOf(PropTypes.shape({
        header: PropTypes.string,
        renderValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ])
    })),
    /** You can set the data of the table by passing an array or object in this prop.*/
    data: PropTypes.arrayOf(PropTypes.object),

    /** The message that will be shown when there's no data in the table.*/
    emptyMessage: PropTypes.string,

    /** You can add an extra user-defined props by binding it in this prop.*/
    extra: PropTypes.object,

    /** It sets the data inside the Footer Body.*/
    footRenderer: PropTypes.func,

    /** It sets the identifier key of the Table.*/
    identifierKey: PropTypes.string,

    /** Function to invoke when a row is clicked.*/
    onRowClick: PropTypes.func,

    /** Set to true so that the empty message will be shown.*/
    showEmptyMessageRow: PropTypes.bool,

    /** The className of the table.*/
    tableClassName: PropTypes.string
};

export default DataTable;