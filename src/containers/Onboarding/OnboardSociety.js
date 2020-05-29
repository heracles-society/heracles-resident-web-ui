import {
  Grid,
  Box,
  Paper,
  Button,
  Container,
  Typography,
  makeStyles,
  Divider,
  Toolbar,
  AppBar,
  Backdrop,
  CircularProgress,
  fade,
} from '@material-ui/core';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';

import PricingTrends from './PricingTrends';
import {SearchSociety} from './SearchSociety';

import Map from '../../components/Map';
import Image1 from '../../images/image_3.jpg';
import {
  fetchUserOnboardingState,
  setSocietyData,
  requestOnboarding,
} from '../../redux/actions/views/onboarding';
import {ONBOARDING_STATUS} from '../../redux/reducers/views/onboarding';

const imageStyles = {
  display: 'block',
  objectFit: 'cover',
  height: '120px',
  width: '100%',
  boxSizing: 'content-box',
  borderRadius: '4px',
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  addressText: {
    fontFamily: theme.typography.fontFamilyTitle,
  },
  primaryAddressText: {
    fontFamily: theme.typography.fontFamilyTitle,
    fontWeight: theme.typography.fontWeightBold,
  },
  secondaryAddressText: {
    fontFamily: theme.typography.fontFamilyTitle,
    color: theme.palette.text.secondary,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: fade(theme.palette.background.default, 0.9),
  },
}));

export const OnboardSociety = props => {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const onboardingState = useSelector(state => state.onboarding);
  const onboardingData = onboardingState.data;
  const societyData = onboardingData.societies;
  const selectedSociety = societyData.selectedSociety;

  React.useEffect(() => {
    dispatch(fetchUserOnboardingState());
  }, [dispatch]);

  if (onboardingState.data.onboarded === true) {
    return <Redirect to="/manage" />;
  }

  return (
    <>
      <Container
        maxWidth="lg"
        style={{minHeight: '100%', position: 'relative', padding: 0}}
      >
        {onboardingState.status === ONBOARDING_STATUS.LOADING && (
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="primary" />
          </Backdrop>
        )}
        <Box display="flex" flexDirection="row">
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            style={{padding: 24}}
          >
            <AppBar position="static">
              <Toolbar />
            </AppBar>
            <Box display="flex" style={{paddingTop: 24}}>
              <Box flex="8" style={{paddingRight: 24}}>
                <Box
                  display="flex"
                  flexDirection="row"
                  style={{height: '100%'}}
                >
                  <Box flex="3" style={{paddingRight: 8}}>
                    <img
                      alt="test"
                      title="test"
                      style={imageStyles}
                      src={Image1}
                    />
                    <img
                      alt="test"
                      title="test"
                      src={Image1}
                      style={{...imageStyles, marginTop: 8}}
                    />
                    <img
                      alt="test"
                      title="test"
                      src={Image1}
                      style={{...imageStyles, marginTop: 8}}
                    />
                  </Box>
                  <Box flex="9">
                    <img
                      alt="test"
                      title="test"
                      src={Image1}
                      style={{...imageStyles, height: 376}}
                    />
                  </Box>
                </Box>
              </Box>
              <Box flex="4">
                <Paper style={{height: '100%'}}>
                  <Grid
                    style={{height: '100%'}}
                    item
                    container
                    direction="column"
                    alignItems="stretch"
                    sm
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="space-around"
                      flexGrow={1}
                      textAlign="center"
                      style={{padding: 24}}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        style={{
                          height: 92,
                          width: 92,
                          borderRadius: '50%',
                          border: '2px solid #333745',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          alt="test"
                          title="test"
                          src={Image1}
                          style={{
                            ...imageStyles,
                            height: 80,
                            width: 80,
                            borderRadius: '50%',
                          }}
                        />
                      </Box>
                      <Box style={{paddingTop: 24}}>
                        <Typography
                          variant="h6"
                          style={{fontFamily: 'Rubik', fontWeight: 700}}
                        >
                          Hemanth Rastogi
                        </Typography>
                        <Box style={{paddingTop: 8}}>
                          <Typography
                            variant="body2"
                            style={{fontStyle: 'italic'}}
                          >
                            -- One of our best people
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      style={{padding: 24, backgroundColor: '#e3e3e3'}}
                      display="flex"
                      flexDirection="column"
                      alignItems="stretch"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          dispatch(requestOnboarding(selectedSociety._id));
                        }}
                      >
                        Request onboarding
                      </Button>
                    </Box>
                  </Grid>
                </Paper>
              </Box>
            </Box>
            <Box display="flex" flex="1" style={{paddingTop: 24}}>
              <Box flex="8" style={{paddingRight: 24}}>
                <Box
                  display="flex"
                  flexDirection="row"
                  style={{height: '100%'}}
                >
                  <Box flex="1" style={{padding: 16}}>
                    <Box
                      className={classes.addressText}
                      style={{paddingBottom: 24}}
                    >
                      <Typography
                        className={classes.primaryAddressText}
                        variant="h4"
                      >
                        {selectedSociety?.name ?? 'Society 1'},{' '}
                        <span className={classes.secondaryAddressText}>
                          {selectedSociety?.state ?? 'KA'}
                        </span>
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        color="textSecondary"
                        gutterBottom
                      >
                        {selectedSociety?.address ??
                          'HSR Layout, Sector 3. Bangalore'}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box
                      display="flex"
                      style={{paddingTop: 16}}
                      flexDirection="row"
                    >
                      <Box flex="0 0 33%">
                        <Typography
                          color="textSecondary"
                          variant="body2"
                          component="h4"
                        >
                          Built
                        </Typography>
                        <Typography
                          variant="h6"
                          component="h3"
                          style={{fontWeight: 700, fontFamily: 'Rubik'}}
                        >
                          2017
                        </Typography>
                      </Box>
                      <Box flex="0 0 33%">
                        <Typography
                          color="textSecondary"
                          variant="body2"
                          component="h4"
                        >
                          Area
                        </Typography>
                        <Typography
                          variant="h6"
                          component="h3"
                          style={{fontWeight: 700, fontFamily: 'Rubik'}}
                        >
                          {selectedSociety?.area ?? '8000'}{' '}
                          {selectedSociety?.areaUnit ?? 'sqft.'}
                        </Typography>
                      </Box>
                      <Box flex="0 0 33%">
                        <Typography
                          color="textSecondary"
                          variant="body2"
                          component="h4"
                        >
                          Capacity
                        </Typography>
                        <Typography
                          variant="h6"
                          component="h3"
                          style={{fontWeight: 700, fontFamily: 'Rubik'}}
                        >
                          1200
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      style={{paddingTop: 16}}
                      flexDirection="row"
                    >
                      <Box flex="0 0 33%">
                        <Typography
                          color="textSecondary"
                          variant="body2"
                          component="h4"
                        >
                          Owned by
                        </Typography>
                        <Typography
                          variant="h6"
                          component="h3"
                          style={{fontWeight: 700, fontFamily: 'Rubik'}}
                        >
                          Organization 1
                        </Typography>
                      </Box>
                      <Box flex="0 0 33%">
                        <Typography
                          color="textSecondary"
                          variant="body2"
                          component="h4"
                        >
                          Happiness Index
                        </Typography>
                        <Typography
                          variant="h6"
                          component="h3"
                          style={{fontWeight: 700, fontFamily: 'Rubik'}}
                        >
                          {selectedSociety?.happinessIndex ?? 4}/10
                        </Typography>
                      </Box>
                      <Box flex="0 0 33%">
                        <Typography
                          color="textSecondary"
                          variant="body2"
                          component="h4"
                        >
                          Safety Index
                        </Typography>
                        <Typography
                          variant="h6"
                          component="h3"
                          style={{fontWeight: 700, fontFamily: 'Rubik'}}
                        >
                          {selectedSociety?.safetyIndex ?? 8}/10
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      style={{paddingTop: 32}}
                      flexDirection="row"
                    >
                      <Box flex="0 0 33%">
                        <Typography
                          variant="h6"
                          component="h3"
                          style={{fontWeight: 700, fontFamily: 'Rubik'}}
                        >
                          Highlights
                        </Typography>
                      </Box>
                      <Box flex="0 0 66%">
                        <Typography color="textSecondary" variant="subtitle2">
                          {selectedSociety?.highlights}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box flex="4">
                <Box style={{padding: 16}}>
                  <Box
                    style={{
                      height: 64,
                      paddingBottom: 8,
                      boxSizing: 'content-box',
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{fontFamily: 'Rubik', fontWeight: 700}}
                    >
                      Analytics
                    </Typography>
                  </Box>
                  <Box>
                    <Typography style={{paddingBottom: 16}} variant="body2">
                      Price History
                    </Typography>
                    <PricingTrends />
                  </Box>
                </Box>
              </Box>
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
                  <SearchSociety
                    loading={societyData.status === ONBOARDING_STATUS.LOADING}
                    societies={societyData.data}
                    selectedSociety={societyData.selectedSociety}
                    onChange={newSelectedSociety => {
                      dispatch(
                        setSocietyData({
                          data: societyData.data,
                          status: societyData.status,
                          selectedSociety: newSelectedSociety,
                        }),
                      );
                    }}
                    onInputChange={inputValue => {}}
                    styles={{width: '100%'}}
                  />
                </Paper>
              </Box>
              {societyData.selectedSociety && (
                <Map
                  interactive
                  longitude={societyData.selectedSociety.longitude}
                  latitude={societyData.selectedSociety.latitude}
                />
              )}
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
};
