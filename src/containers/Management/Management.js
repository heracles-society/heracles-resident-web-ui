import {
  Paper,
  Box,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import * as React from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';

import ManagementContent from './ManagementContent';

import {Page} from '../../components/Layout';
import siteBackgroundImageDark from '../../images/image_2.jpg';
import siteBackgroundImage from '../../images/image_4.jpg';
import {SearchSociety} from '../OnboardSociety';

const ManagementNavigation = props => {
  const history = useHistory();
  const {url} = useRouteMatch();
  const goToLink = subPath => () => history.push(`${url}/${subPath}`);
  return (
    <>
      <List>
        <ListItem button onClick={goToLink('complaints')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Complaints" />
        </ListItem>
        <ListItem button onClick={goToLink('reservations')}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Reservations" />
        </ListItem>
        <ListItem button onClick={goToLink('bills-and-payments')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Bills & Payments" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={goToLink('notifications')}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem button onClick={goToLink('onboardings')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Onboardings" />
        </ListItem>
        <ListItem button onClick={goToLink('profile')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={goToLink('settings')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerPaperAnchorLeft: {
    position: 'absolute',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(9) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 3,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  societyImageWrapper: {
    position: 'relative',
    height: '100%',
    flex: 1,
    backgroundImage: `url(${
      theme.palette.type === 'dark'
        ? siteBackgroundImageDark
        : siteBackgroundImage
    })`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right top',
  },
  societySelectPaper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 24,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export const Management = props => {
  const classes = useStyles(props);
  return (
    <Page
      navigationContent={<ManagementNavigation />}
      mainContent={<ManagementContent />}
      rightContent={
        <Paper elevation={4} square className={classes.societyImageWrapper}>
          <Box className={classes.societySelectPaper}>
            <Paper component="form">
              <SearchSociety styles={{width: '100%'}} />
            </Paper>
          </Box>
        </Paper>
      }
    />
  );
};
