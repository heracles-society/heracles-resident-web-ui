import {
  Button,
  Box,
  makeStyles,
  Paper,
  SvgIcon,
  Typography,
  Backdrop,
  CircularProgress,
  fade,
} from '@material-ui/core';
import * as React from 'react';
import GoogleLogin from 'react-google-login';
import {FcGoogle} from 'react-icons/fc';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect, Route, useHistory} from 'react-router-dom';

import {ReactComponent as AvatarImage} from '../../images/avatar.svg';
import {startGoogleTokenExchange} from '../../redux/actions/session';
import {SESSION_STATUS} from '../../redux/reducers/session';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    background:
      theme.palette.type === 'dark'
        ? 'linear-gradient(45deg, rgb(0, 0, 0) 0%, rgb(67, 64, 97) 100%);'
        : 'linear-gradient(45deg, rgb(210, 85, 127) 0%, rgb(231, 68, 87) 53%, rgb(235, 138, 61) 100%)',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: fade(theme.palette.background.default, 0.9),
  },
}));

export const AuthenticatedRoute = props => {
  const path = props.location?.pathname;
  const {session, loginPath = '/login', ...restProps} = props;
  const loginState = useSelector(state => state.session?.status);
  if (loginState === SESSION_STATUS.LOGGED_IN) {
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
  const loginState = useSelector(state => state.session?.status);
  const dispatch = useDispatch();
  const [googleAccessToken, setGoogleAccessToken] = React.useState(null);

  const history = useHistory();

  React.useEffect(() => {
    if (googleAccessToken) {
      dispatch(startGoogleTokenExchange(googleAccessToken));
    }
  }, [dispatch, googleAccessToken]);

  if (loginState === SESSION_STATUS.LOGGED_IN) {
    let goTo = '/onboarding';
    if (history.location.state?.referrer) {
      goTo = decodeURI(history.location.state.referrer);
    }
    return <Redirect to={goTo} />;
  }

  return (
    <Box display="flex" flexDirection="root" className={classes.root}>
      {loginState === SESSION_STATUS.LOGIN_IN_PROGRESS && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}

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
                disabled={renderProps.disabled}
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
              console.error(args);
            }}
            cookiePolicy={'single_host_origin'}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginView;
