import {makeStyles, Grid, Box, Typography, Button} from '@material-ui/core';
import * as React from 'react';
import {useHistory} from 'react-router-dom';

import siteBackgroundImage from '../../images/image_1.jpg';
import siteBackgroundImageDark from '../../images/image_7.jpg';

const useStyles = makeStyles(theme => {
  console.log(theme);
  const styles = {
    root: {
      flexGrow: 1,
      height: '100%',
      boxShadow: 'none',
      padding: '24px',
    },
    paper: {
      width: '100px',
      height: '100px',
    },
    appBarRoot: {
      backgroundColor: theme.palette.background.default,
    },
    siteImage: {
      backgroundImage: `url(${
        theme.palette.type === 'dark'
          ? siteBackgroundImageDark
          : siteBackgroundImage
      })`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right top',
    },
    welcomeText: {
      fontFamily: 'Rubik',
      paddingTop: theme.spacing(10),
    },
    connectToText: {
      fontFamily: 'Rubik',
      color: theme.palette.primary.main,
    },
    detailText: {
      fontFamily: 'Rubik',
      height: '240px',
    },
    leftSection: {},
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
    }, 150);
    return () => clearInterval(interval);
  }, []);
  return <span className={classes.connectToText}>{connectToText}</span>;
};

export const Home = props => {
  const classes = useStyles(props);
  const history = useHistory();
  return (
    <Box display="flex" className={classes.root}>
      <Grid
        spacing={6}
        container
        direction="row"
        justify="flex-start"
        flex="1"
        className={classes.mainContent}
      >
        <Grid item lg={7} md={7} sm={7}>
          <Box p={3} className={classes.leftSection}>
            <Typography classes={{root: classes.welcomeText}} variant="h2">
              Let&apos;s connect you with
            </Typography>
            <Typography
              classes={{root: classes.welcomeText}}
              style={{paddingTop: 0}}
              variant="h2"
            >
              your <ConnectToText />
            </Typography>
          </Box>
          <Box p={3}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => {
                history.push('/login');
              }}
            >
              Start for free
            </Button>
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
