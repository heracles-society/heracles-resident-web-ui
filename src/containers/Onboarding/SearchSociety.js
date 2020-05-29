import {makeStyles, Grid, Typography} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import HomeWorkTwoToneIcon from '@material-ui/icons/HomeWorkTwoTone';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';

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
  const [inputValue, setInputValue] = React.useState('');
  const {loading, onInputChange, onChange, societies, selectedSociety} = props;
  const classes = useStyles();

  React.useEffect(() => {
    onInputChange(inputValue);
  }, [inputValue, onInputChange]);

  let options = [];
  if (selectedSociety) {
    const selectedSocietyInOptions = societies.find(
      society => selectedSociety._id === society._id,
    );
    if (!selectedSocietyInOptions) {
      options = [selectedSociety];
    }
  }
  options = [...options, ...societies];

  return (
    <Autocomplete
      id="search-society"
      style={props.styles}
      classes={{inputRoot: classes.inputRoot}}
      autoComplete
      filterOptions={x => x}
      getOptionSelected={option => option._id === selectedSociety._id}
      getOptionLabel={option => option.name}
      options={options}
      loading={loading}
      value={selectedSociety}
      disableClearable
      onChange={(_, newValue) => {
        onChange(newValue);
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
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
              {option.name}
              <Typography variant="body2" color="textSecondary">
                {option.address}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
};
