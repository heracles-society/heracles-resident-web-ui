import {makeStyles, Grid, Typography} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import HomeWorkTwoToneIcon from '@material-ui/icons/HomeWorkTwoTone';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  inputRoot: {
    height: 64,
  },
}));

export const SearchSociety = props => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const classes = useStyles();

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([{title: 'Soceity 1'}, {title: 'Soceity 2'}]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="search-society"
      style={props.styles}
      classes={{inputRoot: classes.inputRoot}}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.title === value.title}
      getOptionLabel={option => option.title}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          placeholder="Society"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={option => {
        return (
          <Grid container alignItems="center">
            <Grid item>
              <HomeWorkTwoToneIcon fontSize="small" className={classes.icon} />
            </Grid>
            <Grid item xs>
              Society 1
              <Typography variant="body2" color="textSecondary">
                HSR Layout, Sector 3
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
};
