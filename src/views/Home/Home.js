import {
  makeStyles,
  Grid,
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Link,
} from '@material-ui/core';
import * as React from 'react';

import siteBackgroundImage from '../../images/test-1.jpg';

const useStyles = makeStyles(theme => {
  const styles = {
    root: {
      flexGrow: 1,
      boxShadow: 'none',
    },
    paper: {
      width: '100px',
      height: '100px',
    },
    appBarRoot: {
      backgroundColor: theme.palette.background.default,
    },
    mainContent: {
      paddingTop: theme.spacing(8),
    },
    siteImage: {
      backgroundImage: `url(${siteBackgroundImage})`,
      backgroundSize: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right top',
    },
    welcomeText: {
      fontFamily: 'Rubik',
    },
    connectToText: {
      fontFamily: 'Rubik',
      color: theme.palette.primary.main,
    },
    detailText: {
      fontFamily: 'Rubik',
      height: '240px',
    },
  };
  return styles;
});

const ConnectToText = props => {
  const classes = useStyles(props);
  const [connectToText, setConnectToText] = React.useState('');
  React.useEffect(() => {
    const options = ['Home.', 'Neighbourhood.', 'Society.', 'Community.'].map(
      e => e + '    ',
    );
    let optionIndex = 0;
    let textIndex = 0;
    const interval = setInterval(() => {
      if (textIndex === options[optionIndex].length) {
        textIndex = 0;
        optionIndex++;
        if (optionIndex === options.length) {
          optionIndex = 0;
        }
      }
      const selectedOption = options[optionIndex];
      textIndex++;
      setConnectToText(selectedOption.slice(0, textIndex));
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return <span className={classes.connectToText}>{connectToText}</span>;
};

export const Home = props => {
  const classes = useStyles(props);
  return (
    <Box display="flex" style={{height: '100%'}}>
      <AppBar classes={{root: classes.root}}>
        <Toolbar classes={{root: classes.appBarRoot}} />
      </AppBar>
      <Grid
        spacing={6}
        container
        direction="row"
        justify="flex-start"
        // alignItems="stretch"
        flex="1"
        className={classes.mainContent}
      >
        <Grid item lg={7} md={7} sm={7}>
          <Box p={3}>
            <Typography classes={{root: classes.welcomeText}} variant="h2">
              Let&apos;s connect you with your <ConnectToText />
            </Typography>
          </Box>
          <Box p={3}>
            <Button variant="contained" color="primary" disableElevation>
              Start for free
            </Button>
            <Link>Watch the video</Link>
          </Box>
          <Box p={3} flexGrow={0} flexBasis={2}>
            <Typography variant="h6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut
            </Typography>
            <Typography variant="h6">
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={5} md={5} sm={5} className={classes.siteImage} />
      </Grid>
    </Box>
  );
};