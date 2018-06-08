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
        return <tr><td colSpan={this.props.columnDefs.length}>{this.props.emptyMessage}</td></tr>;
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
    tableClassName: ""
};

DataTable.propTypes = {
    bodyRenderer: PropTypes.func,
    className: PropTypes.string,
    columnDefs: PropTypes.arrayOf(PropTypes.shape({
        header: PropTypes.string,
        renderValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ])
    })),
    data: PropTypes.arrayOf(PropTypes.object),
    emptyMessage: PropTypes.string,
    extra: PropTypes.object,
    footRenderer: PropTypes.func,
    identifierKey: PropTypes.string,
    onRowClick: PropTypes.func,
    tableClassName: PropTypes.string
};

export default DataTable;