import {makeStyles, lighten, Toolbar, Typography} from '@material-ui/core';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import * as React from 'react';
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

export const RemoteTableToolbar = props => {
  const classes = useToolbarStyles();
  const {actions, title, ...restProps} = props;
  const numSelected = props.selected.length;

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

      {typeof actions === 'function' ? actions({...restProps}) : actions}
    </Toolbar>
  );
};

RemoteTableToolbar.defaultProps = {
  selected: [],
};

RemoteTableToolbar.propTypes = {
  title: PropTypes.string,
  selected: PropTypes.array.isRequired,
  actions: PropTypes.node,
};
