import {Box, Typography, makeStyles} from '@material-ui/core';
import * as React from 'react';

import apartmentImage from '../../../images/image_12.jpg';
const useStyles = makeStyles(theme => ({
  apartmentImage: {
    backgroundImage: `url(${apartmentImage})`,
  },
  apartmentDescription: {
    paddingLeft: theme.spacing(4),
  },
}));

export const Apartments = props => {
  const classes = useStyles(props);
  return (
    <Box display="flex" flexDirection="row" flex="1">
      <Box flex="1" className={classes.apartmentImage} />
      <Box flex="0 0 550px" className={classes.apartmentDescription}>
        <Typography
          variant="h4"
          style={{paddingBottom: 12, fontWeight: 'thin'}}
        >
          Paterson
        </Typography>
        <Typography
          variant="h2"
          style={{paddingBottom: 24, fontFamily: 'Rubik', fontWeight: 'bold'}}
        >
          Apartment - 718
        </Typography>
        <Box>
          <Box display="flex" style={{paddingTop: 16}} flexDirection="row">
            <Box flex="0 0 33%">
              <Typography color="textSecondary" variant="body2" component="h4">
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
              <Typography color="textSecondary" variant="body2" component="h4">
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
              <Typography color="textSecondary" variant="body2" component="h4">
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
          <Box display="flex" style={{paddingTop: 16}} flexDirection="row">
            <Box flex="0 0 33%">
              <Typography color="textSecondary" variant="body2" component="h4">
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
              <Typography color="textSecondary" variant="body2" component="h4">
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
              <Typography color="textSecondary" variant="body2" component="h4">
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
          <Box display="flex" style={{paddingTop: 32}} flexDirection="row">
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
