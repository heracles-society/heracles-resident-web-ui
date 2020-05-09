import {Grid, Box, Paper, Button} from '@material-ui/core';
import React from 'react';

import Map from '../../components/Map';
import Image1 from '../../images/image_3.jpg';

const imageStyles = {
  objectFit: 'cover',
  width: '100%',
  height: '120px',
  borderRadius: '4px',
};

export const SelectSociety = props => {
  return (
    <Grid
      container
      alignItems="stretch"
      direction="row"
      style={{height: '100%'}}
    >
      <Grid item style={{padding: '32px'}} sm={9}>
        <Grid container direction="row" alignItems="stretch" spacing={2}>
          <Grid item container direction="column" alignItems="stretch" sm={8}>
            <Grid item container sm spacing={2}>
              <Grid item sm={3}>
                <img
                  style={{...imageStyles, marginTop: 0}}
                  src={Image1}
                  alt="test"
                  title="test 1"
                />
                <img
                  style={{...imageStyles, marginTop: 12}}
                  src={Image1}
                  alt="test"
                  title="test 1"
                />
                <img
                  style={{...imageStyles, marginTop: 12}}
                  src={Image1}
                  alt="test"
                  title="test 1"
                />
              </Grid>
              <Grid item sm={9}>
                <img
                  style={{...imageStyles, height: 394}}
                  src={Image1}
                  alt="test"
                  title="test 1"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="stretch"
            sm={4}
            style={{padding: '8px'}}
          >
            <Paper style={{height: '100%'}}>
              <Grid
                style={{height: '100%'}}
                item
                container
                direction="column"
                alignItems="stretch"
                sm
              >
                <Box flexGrow={1} style={{padding: 24}} />
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
          </Grid>
        </Grid>
      </Grid>
      <Grid item container direction="column" alignItems="stretch" sm={3}>
        <Box
          display="flex"
          style={{height: '100%', boxShadow: '3px 0px 8px 0px #020202'}}
        >
          <Map />
        </Box>
      </Grid>
    </Grid>
  );
};
