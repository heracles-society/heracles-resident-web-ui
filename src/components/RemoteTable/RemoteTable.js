import {Box, LinearProgress} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import {lighten, makeStyles, useTheme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import RefreshIcon from '@material-ui/icons/Refresh';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';

import {getAPI} from '../../utils/api';

function RemoteTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    columnKey,
    columns,
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{'aria-label': 'select all desserts'}}
          />
        </TableCell>
        {columns.map(headCell => (
          <TableCell
            key={headCell[columnKey]}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell[columnKey] ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell[columnKey]}
              direction={orderBy === headCell[columnKey] ? order : 'asc'}
              onClick={createSortHandler(headCell[columnKey])}
            >
              {headCell.title}
              {orderBy === headCell[columnKey] ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

RemoteTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  columnKey: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const RemoteTableToolbar = props => {
  const classes = useToolbarStyles();
  const {numSelected, title} = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

RemoteTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tablePaginationRoot: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const RemoteTableBody = props => {
  const {
    data: rows,
    dense,
    selected,
    rowsPerPage,
    rowKey,
    columnKey,
    handleClick,
    columns,
  } = props;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length);

  const isSelected = name => selected.indexOf(name) !== -1;

  return (
    <TableBody>
      {emptyRows === rowsPerPage ? (
        <TableRow>
          <TableCell
            colSpan={columns.length + 1}
            style={{height: (dense ? 25 : 43) * emptyRows}}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{height: '100%'}}
            >
              <Typography>Nothing data found...</Typography>
            </Box>
          </TableCell>
        </TableRow>
      ) : (
        <>
          {rows.map((row, index) => {
            const isItemSelected = isSelected(row[rowKey]);
            const labelId = `enhanced-table-checkbox-${index}`;
            return (
              <TableRow
                hover
                onClick={event => handleClick(event, row)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row[rowKey]}
                selected={isItemSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    inputProps={{'aria-labelledby': labelId}}
                  />
                </TableCell>
                {columns.map(column => {
                  const rowValue = row[column[columnKey]];
                  return (
                    <TableCell
                      key={`${column[columnKey]}-${row[rowKey]}`}
                      component="th"
                      id={labelId}
                      scope="row"
                      padding={column.disablePadding ? 'none' : null}
                    >
                      {typeof column.render === 'function'
                        ? column.render(rowValue, row)
                        : rowValue}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
          {emptyRows > 0 && (
            <TableRow style={{height: (dense ? 25 : 43) * emptyRows}}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </>
      )}
    </TableBody>
  );
};

function TablePaginationActions(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  const {count, page, rowsPerPage, onChangePage} = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  debugger;

  return (
    <div className={classes.tablePaginationRoot}>
      <IconButton
        onClick={ev => {
          onChangePage(ev, page);
        }}
        aria-label="Refresh"
      >
        <RefreshIcon />
      </IconButton>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRightIcon />
        ) : (
          <KeyboardArrowLeftIcon />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeftIcon />
        ) : (
          <KeyboardArrowRightIcon />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export const RemoteTable = props => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [lastFetch, setLastFetch] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState([]);
  const [status, setStatus] = React.useState('');
  const {columns, columnKey, rowKey, remoteURL, title, dense} = props;
  const rows = data.slice(0, rowsPerPage);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = data.map(n => n[rowKey]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    const rowId = row[rowKey];
    const selectedIndex = selected.indexOf(rowId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rowId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setLastFetch(new Date().toISOString());
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setLastFetch(new Date().toISOString());
    setPage(0);
  };

  React.useEffect(() => {
    let isActive = true;
    const params = {
      sort: `${order === 'desc' ? '-' : ''}${orderBy}`,
      skip: page * rowsPerPage,
      limit: rowsPerPage,
    };
    setStatus('LOADING');
    getAPI(remoteURL, {
      params,
    })
      .then(response => {
        const {data: societies, headers} = response;
        if (isActive) {
          setStatus('SUCCESSFULLY_LOADED');
          setData(societies);
          setTotal(parseInt(headers['heracles-api-total-count'], 10));
        }
      })
      .catch(() => {
        if (isActive) {
          setStatus('FAILED');
        }
      });
    return () => (isActive = false);
  }, [order, orderBy, page, remoteURL, rowsPerPage, lastFetch]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <RemoteTableToolbar numSelected={selected.length} title={title} />
        {status === 'LOADING' && <LinearProgress variant="indeterminate" />}
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <RemoteTableHead
              columns={columns}
              classes={classes}
              numSelected={selected.length}
              rowKey={rowKey}
              columnKey={columnKey}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <RemoteTableBody
              data={rows}
              columns={columns}
              dense={dense}
              selected={selected}
              rowsPerPage={rowsPerPage}
              rowKey={rowKey}
              columnKey={columnKey}
              page={page}
              handleClick={handleClick}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
    </div>
  );
};

RemoteTable.defaultProps = {
  rowKey: 'id',
  columnKey: 'id',
  enableSelection: false,
};

RemoteTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      numeric: PropTypes.bool,
      disablePadding: PropTypes.bool,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  enableSelection: PropTypes.bool,
  rowKey: PropTypes.string.isRequired,
  columnKey: PropTypes.string.isRequired,
  remoteURL: PropTypes.string.isRequired,
};
