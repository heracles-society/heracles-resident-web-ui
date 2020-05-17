import {
  Button,
  Box,
  makeStyles,
  Paper,
  SvgIcon,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import GoogleLogin from 'react-google-login';
import {FcGoogle} from 'react-icons/fc';
import {Redirect} from 'react-router-dom';

import {ReactComponent as AvatarImage} from '../../images/avatar.svg';

export const SESSION__LOGIN_STATE = {
  LOGGED_IN: 'LOGGED_IN',
  LOGGED_OUT: 'LOGGED_OUT',
  IN_PROGRESS: 'IN_PROGRESS',
  LOGIN_SUCCESSFUL: 'LOGIN_SUCCESSFUL',
  LOGIN_FAILED: 'LOGIN_FAILED',
};

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    background:
      theme.palette.type === 'dark'
        ? 'linear-gradient(45deg, rgb(0, 0, 0) 0%, rgb(67, 64, 97) 100%);'
        : 'linear-gradient(45deg, rgb(210, 85, 127) 0%, rgb(231, 68, 87) 53%, rgb(235, 138, 61) 100%)',
  },
}));

export const LoginView = props => {
  const classes = useStyles(props);
  const [loginState, setLoginState] = React.useState(
    SESSION__LOGIN_STATE.LOGGED_OUT,
  );
  const [token, setToken] = React.useState(null);
  const [googleAccessToken, setGoogleAccessToken] = React.useState(null);

  React.useEffect(() => {
    try {
      const token = localStorage.getItem('key');
      setToken(token);
    } catch (error) {
      setToken(null);
    }
  }, []);

  React.useEffect(() => {
    debugger;
    let active = true;
    if (googleAccessToken) {
      setLoginState(SESSION__LOGIN_STATE.IN_PROGRESS);
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${googleAccessToken}`);
      fetch('http://localhost:3200/auth/google/token', {
        method: 'POST',
        headers: headers,
      })
        .then(e => e.json())
        .then(data => {
          const accessToken = data.accessToken;
          localStorage.setItem('key', accessToken);
          if (active) {
            setToken(accessToken);
            setLoginState(SESSION__LOGIN_STATE.LOGGED_IN);
          }
        })
        .catch(() => {
          if (active) {
            setToken(null);
            setLoginState(SESSION__LOGIN_STATE.LOGGED_OUT);
          }
        });
    } else {
      if (active) {
        setLoginState(SESSION__LOGIN_STATE.LOGGED_OUT);
      }
    }
    return () => {
      active = false;
    };
  }, [googleAccessToken]);

  if (token) {
    return <Redirect to="/manage" />;
  }

  return (
    <Box display="flex" flexDirection="root" className={classes.root}>
      <Box flex="1" classes={classes.leftSide} />
      <Box
        flex="0 0 40%"
        display="flex"
        flexDirection="column"
        justifyContent="stretch"
        alignItems="stretch"
        style={{
          display: 'flex',
          maxWidth: '500px',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'stretch',
          textAlign: 'center',
        }}
      >
        <Paper
          style={{
            padding: 24,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <AvatarImage
            style={{width: '120', height: '120', margin: '24px 0'}}
          />
          <Typography
            variant="h3"
            style={{fontFamily: 'Rubik', fontWeight: 700, margin: '24px 0'}}
          >
            Welcome back
          </Typography>
          <GoogleLogin
            style={{flex: 1}}
            clientId="365089448329-of4jql1l1e01hmijdfr14p5qqqjglk8b.apps.googleusercontent.com"
            render={renderProps => (
              <Button
                variant="outlined"
                onClick={renderProps.onClick}
                disabled={
                  renderProps.disabled ||
                  loginState === SESSION__LOGIN_STATE.IN_PROGRESS
                }
              >
                <SvgIcon fontSize="default">
                  <FcGoogle />
                </SvgIcon>
                <span style={{paddingLeft: 8}}>Login with Google</span>
              </Button>
            )}
            buttonText="Sign in with Google"
            onSuccess={tokenData => {
              setGoogleAccessToken(tokenData.accessToken);
            }}
            onFailure={(...args) => {
              console.log(args);
            }}
            cookiePolicy={'single_host_origin'}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginView;
