import {
  makeStyles,
  useTheme,
  TextField,
  Divider,
  Select,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Box,
  Tab,
  AppBar,
  Tabs,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
  requestHeader: {
    width: '100%',
    height: '5rem',
    display: 'flex',
    justifyContent: 'space-around',
    cursor: 'pointer',
    position: 'relative',
  },
  icon: {
    width: '20%',
  },
  content: {
    position: 'relative',
    top: '-3.5rem',
    left: '2.2rem',
    width: '75%',
  },
  form: {
    position: 'relative',
    background: 'white',
    padding: '15px',
    top: '1rem',
    borderRadius: '10px',
  },
  detail: {
    display: 'flex',
    justifyContent: 'space-around',
    position: 'relative',
    top: '2rem',
    flexWrap: 'wrap',
    marginBottom: '2rem',
  },
  instruction: {
    width: '70%',
    height: '4rem',
    display: 'inline-block',
    marginTop: '2rem',
  },
  heading: {
    fontSize: '1.2rem',
    backgroundColor: '#E0607E',
    paddingLeft: '1rem',
  },
  button: {
    position: 'absolute',
    marginTop: '2rem',
    marginBottom: '3rem',
    marginLeft: '3rem',
    display: 'inline-block',
  },
  block: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  grid: {
    width: '14rem',
    height: '7rem',
    padding: '2rem',
    backgroundColor: '#E0607E',
    color: 'white',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '1.2rem',
  },
}));

const kinds = [
  'Gym Access',
  'Pool Access',
  'Library Access',
  'Club House Booking',
  'Gaming Zone Access',
  'Parking Access',
  'IGL Connection',
  'Electricity Issue',
  'Carpenter Issue',
  'Plumber Issue',
  'House keeping Issue',
  'Paint Issue',
  'Water Issue',
  'Drainage Issue',
  'Others',
];

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const RequestView = props => {
  const classes = useStyles(props);
  const [personName, setPersonName] = React.useState();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  const handleDropDownChange = event => {
    setPersonName(event.target.value);
  };

  return (
    <div className={classes.form}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            label="Create Request"
            {...a11yProps(0)}
            style={{fontSize: '1.1rem', fontWeight: 'bold'}}
          />
          <Tab
            label="My Wall"
            {...a11yProps(1)}
            style={{fontSize: '1.1rem', fontWeight: 'bold'}}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div>
            <h1 style={{marginLeft: '4rem'}}>Access Request</h1>
            <Divider />
            <form className={classes.detail} noValidate>
              <FormControl
                className={classes.formControl}
                style={{width: '40%', marginBottom: '2rem'}}
              >
                <InputLabel id="demo-mutiple-name-label">
                  Request Type
                </InputLabel>
                <Select
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  value={personName}
                  onChange={handleDropDownChange}
                >
                  {kinds.map(kind => (
                    <MenuItem key={kind} value={kind}>
                      {kind}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                id="outlined-primary"
                label="Location"
                variant="outlined"
                color="primary"
                style={{width: '40%', marginBottom: '2rem'}}
              />

              <TextField
                id="outlined-primary"
                label="Description"
                variant="outlined"
                color="primary"
                style={{width: '40%', marginBottom: '2rem'}}
              />

              <TextField
                id="outlined-primary"
                type="file"
                variant="outlined"
                color="primary"
                style={{width: '40%', marginBottom: '2rem'}}
              />
            </form>
            <Divider />
            <div className={classes.instruction}>
              <div className={classes.heading}>Instructions:</div>
              <div style={{marginTop: '1rem'}}>
                - Select Request type for which you want to lock the request. If
                you are not sure, leave it at the default value.
              </div>
              <div style={{marginTop: '1rem'}}>
                - If you donot see an option matching your request, please
                select others in the request type.
              </div>
            </div>
            <div className={classes.button}>
              <Button variant="contained" color="primary">
                Submit Request
              </Button>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className={classes.form}>
            <h1>My Wall</h1>
            <div className={classes.block}>
              <div className={classes.grid}>
                <div>13</div>
                <div>All Request</div>
              </div>
              <div className={classes.grid}>
                <div>1</div>
                <div>Active Request</div>
              </div>
              <div className={classes.grid}>
                <div>12</div>
                <div>Closed Request</div>
              </div>
            </div>
          </div>
        </TabPanel>
      </SwipeableViews>
      <Divider />
    </div>
  );
};

export default RequestView;
