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
} from '@material-ui/core';
import React from 'react';

import PricingTrends from './PricingTrends';
import {SearchSociety} from './SearchSociety';

import Map from '../../components/Map';
import Image1 from '../../images/image_3.jpg';

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
}));

export const OnboardSociety = props => {
  const classes = useStyles(props);
  return (
    <>
      <Container
        maxWidth="lg"
        style={{minHeight: '100%', position: 'relative', padding: 0}}
      >
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
                      <Button variant="contained" color="primary">
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
                        Society 1,
                        <span className={classes.secondaryAddressText}>
                          {' '}
                          KA
                        </span>
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        color="textSecondary"
                        gutterBottom
                      >
                        HSR Layout, Sector 3. Bangalore
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
                          8000 sqft.
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
                          4/5
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
                          8/10
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
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
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
                  <SearchSociety styles={{width: '100%'}} />
                </Paper>
              </Box>
              <Map />
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
};
