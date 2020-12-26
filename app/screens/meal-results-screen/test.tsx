import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { DataTable, ProgressBar, Colors, Text } from 'react-native-paper';

function Datatable({
  columns,
  data = [],
  noTableHead = false,
  striped = false,
  stripedColors = ['#2196f3','#8bc34a'],
  viewLoader = false,
  defaultSortField,
  defaultSortAsc,
  page: _page = 1,
  perPage: _perPage = 5,
  pagination = false,
  paginationComponentOptions,
  noDataComponent = <Text>There are no records to display.</Text>,
  style,
  paginationServer = false,
  paginationTotalRows = 0,
  onChangePage,
  onSort
}) {
  const [state, setState] = useState({
    datatable: data,
    page: _page - 1,
    perPage: _perPage,
    numberOfPages: Math.ceil( (paginationServer ? paginationTotalRows : data.length) / _perPage),
    sortField: defaultSortField,
    sortAsc: defaultSortAsc,
    progressBar: false,
    loading: false,
  });

  const {
    datatable,
    page,
    perPage,
    numberOfPages,
    sortField,
    sortAsc,
    progressBar,
    loading,
  } = state;

  /*useEffect(() => {
    setState((prev) => ({
      ...prev,
      datatable: data,
      numberOfPages: Math.ceil( (paginationServer ? paginationTotalRows : data.length) / _perPage)
    }));
  }, [data]);*/

  const dataPagination = !paginationServer && pagination
    ? datatable.slice(perPage * page, perPage * (page + 1))
    : datatable;

  const getValue = (object, { selector, cell }) => {
    if (cell) return cell(object);
    return selector
      .replace(/\[/g, '.')
      .replace(/\]/g, '')
      .split('.')
      .reduce((o, k) => (o || {})[k], object);
  };

  useEffect(() => {
    console.log('a')
    setState((prev) => ({
      ...prev,
      progressBar: true,
    }));
    sort(sortField, sortAsc);
  }, [data]);

  const child = (obj, str) => {
    const props = str.split('.');
    let child = obj;
    props.forEach((prop) => (child = child[prop]));
    return child;
  };

  const sort = async (sortField, sortAsc) => {
    var copyData = Object.assign([], data);
    var result = paginationServer ? copyData : copyData.sort((a, b) => {
      let [x, z] = sortAsc ? [a, b] : [b, a];
      return child(x, sortField) > child(z, sortField) ? 1 : -1;
    });

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        datatable: result,
        numberOfPages: Math.ceil( (paginationServer ? paginationTotalRows : result.length) / _perPage),
        progressBar: false,
        loading: true,
      }));
    }, 2000);
  };

  return (
    <DataTable style={style}>
      {!noTableHead && (
        <DataTable.Header>
          {columns.map((item, i) => {
            const sortDirection =
              datatable.length > 0 &&
              !progressBar &&
              sortField === item.selector
                ? !sortAsc
                  ? 'ascending'
                  : 'descending'
                : null;

            return (
              !item.omit && (
                <DataTable.Title
                  key={i}
                  onPress={() => {
                    if (item.sortable) {
                      const sortAscC =
                        sortField === item.selector ? !sortAsc : true;
                      setState((prev) => ({
                        ...prev,
                        sortField: item.selector,
                        sortAsc: sortAscC,
                        progressBar: true,
                      }));
                      if(paginationServer) onSort(item.selector, sortAscC ? 'asc' : 'desc')
                      else sort(item.selector, sortAscC);
                    }
                  }}
                  sortDirection={sortDirection}
                  numeric={item.right}
                  style={item.styleHeader}>
                  {item.name} {false && sortDirection}
                </DataTable.Title>
              )
            );
          })}
        </DataTable.Header>
      )}

      {viewLoader && progressBar && (
        <ProgressBar indeterminate color={Colors.blue900} />
      )}

      {!progressBar && datatable.length === 0 && (
        <View
          style={{
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {noDataComponent}
        </View>
      )}

      {loading &&
        dataPagination.map((item, i) => {
          return (
            <DataTable.Row
              key={i}
              style={{
                opacity: progressBar ? 0.2 : 1,
                backgroundColor: striped
                  ? i % 2
                    ? stripedColors[0]
                    : stripedColors[1]
                  : null,
              }}>
              {columns.map((headerItem, j) => {
                return (
                  !headerItem.omit && (
                    <DataTable.Cell
                      key={j}
                      numeric={headerItem.right}
                      style={headerItem.styleRow}>
                      {getValue(item, headerItem)}
                    </DataTable.Cell>
                  )
                );
              })}
            </DataTable.Row>
          );
        })}

      {(pagination || paginationServer) && (
        <DataTable.Pagination
          page={page}
          numberOfPages={numberOfPages}
          onPageChange={(page) => {
            onChangePage && onChangePage(page+1)
            if(true){
              setState((prev) => ({
                ...prev,
                progressBar: true,
              }));
              setTimeout(() => {
                setState((prev) => ({
                  ...prev,
                  page: page,
                  progressBar: false,
                }));
              }, 2000);
            }
          }}
          label={paginationComponentOptions ? paginationComponentOptions(page + 1, numberOfPages) : `${page + 1}-${numberOfPages} of ${datatable.length}`}
        />
      )}
    </DataTable>
  );
}

export default Datatable;