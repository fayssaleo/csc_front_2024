import React, { Fragment } from 'react';
import { useTable, useSortBy, useFilters, useExpanded, usePagination } from 'react-table';
import { Filter, DefaultColumnFilter } from './filters';
import { Table, Button, Input } from "reactstrap"
import './TableContainer.css'

const TableContainer = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // rows, -> we change 'rows' to 'page'
        page,
        prepareRow,
        // below new props related to 'usePagination' hook
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data,
            defaultColumn: { Filter: DefaultColumnFilter },
            initialState: { pageIndex: 0, pageSize: 10 }
        },
        useFilters,
        useSortBy,
        useExpanded,
        usePagination
    );

    const generateSortingIndicator = (column) => {
        return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
    };

    const onChangeInSelect = event => {
        setPageSize(Number(event.target.value))
    }

    const onChangeInInput = event => {
        const page = event.target.value ? Number(event.target.value) - 1 : 0
        gotoPage(page)
    }

    return (
        <>
            <Table bordered hover responsive {...getTableProps()} >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    <div {...column.getSortByToggleProps()}>
                                        {column.render('Header')}
                                        {generateSortingIndicator(column)}
                                    </div>
                                    <div className="filter">
                                        <Filter column={column} />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <Fragment key={row.getRowProps().key}>
                                <tr>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        );
                                    })}
                                </tr>

                            </Fragment>
                        );
                    })}
                </tbody>
            </Table>

            <div className="inline">
                <div className="inline">
                    <Button className='pagination_button' color="primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</Button>
                    <Button className='pagination_button' color="primary" onClick={previousPage} disabled={!canPreviousPage} >{"<"}</Button>
                    <Input id="page_number_input" type="number" min={1} style={{ width: 70 }} max={pageOptions.length} defaultValue={pageIndex + 1} onChange={onChangeInInput} />
                    <Button className='pagination_button' color="primary" onClick={nextPage} disabled={!canNextPage}>{">"}</Button>
                    <Button className='pagination_button' color="primary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} > {">>"} </Button>
                    <Input id="page_number_select" type="select" value={pageSize} onChange={onChangeInSelect}>
                        {[10, 25, 50, 100, 200, 300, 500].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </Input>
                </div>
            </div>
            <div className="inline">
                <span className="inline_label">Page{" "}<strong>{pageIndex + 1} of {pageOptions.length}</strong></span>
            </div>
        </>

    );
};

export default TableContainer;