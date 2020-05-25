import {
  Box,
  Slide,
  Dialog,
  Tooltip,
  IconButton,
  Paper,
  Container,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {formatDistanceToNow, isValid} from 'date-fns';
import * as React from 'react';

import Map from '../../../components/Map';
import RemoteTable, {RemoteTableToolbar} from '../../../components/RemoteTable';
import {SearchSociety} from '../../OnboardSociety';
const columns = [
  {
    title: 'From',
    id: 'fromDate',
    render: function (value) {
      const fromDate = new Date(value);
      return isValid(fromDate)
        ? `${formatDistanceToNow(fromDate, {addSuffix: true})} ago`
        : '--N/A--';
    },
  },
  {
    title: 'Till',
    id: 'toDate',
    render: function (value) {
      const toDate = new Date(value);
      return isValid(toDate)
        ? `${formatDistanceToNow(toDate, {addSuffix: true})} ago`
        : '--N/A--';
    },
  },
  {
    title: 'Item',
    id: 'inventory',
  },
  {
    title: 'Status',
    id: 'status',
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Reservations = props => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex" flexDirection="row" flex="1">
      <Box flex="1">
        <Box display="flex" flexDirection="row" justifyContent="flex-end">
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <Container
              maxWidth="lg"
              style={{minHeight: '100%', position: 'relative'}}
              disableGutters
            >
              <Box display="flex" flexDirection="row">
                <Box
                  display="flex"
                  flex="1"
                  flexDirection="column"
                  style={{padding: 24, overflow: 'auto'}}
                >
                  <AppBar position="static">
                    <Toolbar>
                      <IconButton
                        style={{marginLeft: '-18px'}}
                        onClick={handleClose}
                      >
                        <ArrowBackIcon />
                      </IconButton>
                    </Toolbar>
                  </AppBar>
                  <Box
                    display="flex"
                    flexDirection="row"
                    flex="1"
                    style={{paddingTop: 24}}
                  >
                    <Box display="flex" flex="1" />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexGrow="0"
                  flexShrink="0"
                  flexBasis="25%"
                  alignItems="stretch"
                  style={{
                    minHeight: '100vh',
                  }}
                >
                  <Paper
                    // variant="outlined"
                    elevation={4}
                    square
                    style={{
                      position: 'relative',
                      height: '100%',
                      flex: 1,
                    }}
                  >
                    <Box
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1,
                        padding: 24,
                      }}
                    >
                      <Paper component="form">
                        <SearchSociety styles={{width: '100%'}} />
                      </Paper>
                    </Box>
                    <Map longitude="77.642412" latitude="12.911103" />
                  </Paper>
                </Box>
              </Box>
            </Container>
          </Dialog>
        </Box>
        <Box>
          <RemoteTable
            toolbar={
              <RemoteTableToolbar
                title="Reservations"
                actions={({selected}) => (
                  <>
                    {selected.length > 0 ? (
                      <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <>
                        <Tooltip title="Filter list">
                          <IconButton aria-label="filter list">
                            <FilterListIcon />
                          </IconButton>
                        </Tooltip>
                        <IconButton
                          aria-label="add new"
                          onClick={handleClickOpen}
                        >
                          <AddIcon />
                        </IconButton>
                      </>
                    )}
                  </>
                )}
              />
            }
            columns={columns}
            columnKey="id"
            title="Reservations"
            remoteURL="/reservations"
            rowKey="_id"
          />
        </Box>
      </Box>
    </Box>
  );
};
