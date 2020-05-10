import {
  Grid,
  Box,
  Paper,
  Button,
  Container,
  Typography,
} from '@material-ui/core';
import React from 'react';

import PricingTrends from './PricingTrends';

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

export const SelectSociety = props => {
  return (
    <Container maxWidth="lg" style={{minHeight: '100%', position: 'relative'}}>
      <Box display="flex" flexDirection="row">
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          style={{padding: 24}}
        >
          <Box display="flex">
            <Box flex="8" style={{paddingRight: 24}}>
              <Box display="flex" flexDirection="row" style={{height: '100%'}}>
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
                          {/* <FormatQuoteIcon style={{fontSize: 16}} /> */}
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
                      Contact Manager
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
              />
            </Box>
            <Box flex="4">
              <Box style={{paddingLeft: 24}}>
                <Typography
                  variant="h6"
                  style={{fontFamily: 'Rubik', fontWeight: 700}}
                >
                  Analytics
                </Typography>
                <Box style={{paddingTop: 24}}>
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
            <Map />
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};
