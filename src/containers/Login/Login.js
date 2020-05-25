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
import {Redirect, Route, useHistory} from 'react-router-dom';

import {ReactComponent as AvatarImage} from '../../images/avatar.svg';
import {postAPI} from '../../utils/api';
import {AUTH_KEY} from '../../utils/constants';

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

export const AuthenticatedRoute = props => {
  debugger;
  const path = props.location?.pathname;
  const {session, loginPath = '/login', ...restProps} = props;
  const accessToken = localStorage.getItem(AUTH_KEY);
  if (accessToken) {
    return <Route {...restProps} />;
  } else {
    return (
      <Redirect
        to={{
          pathname: loginPath,
          state: {referrer: path},
        }}
      />
    );
  }
};

export const LoginView = props => {
  const classes = useStyles(props);
  const [loginState, setLoginState] = React.useState(
    SESSION__LOGIN_STATE.LOGGED_OUT,
  );
  const [token, setToken] = React.useState(null);
  const [googleAccessToken, setGoogleAccessToken] = React.useState(null);

  const history = useHistory();

  React.useEffect(() => {
    debugger;
    try {
      const token = localStorage.getItem(AUTH_KEY);
      setToken(token);
    } catch (error) {
      setToken(null);
    }
  }, []);

  React.useEffect(() => {
    let active = true;
    if (googleAccessToken) {
      setLoginState(SESSION__LOGIN_STATE.IN_PROGRESS);
      postAPI(
        '/auth/google/token',
        {},
        {
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
          },
        },
      )
        .then(({data}) => {
          const accessToken = data.accessToken;
          localStorage.setItem(AUTH_KEY, accessToken);
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
    debugger;
    let goTo = '/manage';
    if (history.location.state?.referrer) {
      goTo = decodeURI(history.location.state.referrer);
    }
    return <Redirect to={goTo} />;
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
