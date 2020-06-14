import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EventSeatRoundedIcon from '@material-ui/icons/EventSeatRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import HistoryIcon from '@material-ui/icons/History';
import HouseRoundedIcon from '@material-ui/icons/HouseRounded';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import NoEncryptionRoundedIcon from '@material-ui/icons/NoEncryptionRounded';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PaymentIcon from '@material-ui/icons/Payment';
import SettingsIcon from '@material-ui/icons/Settings';
import * as React from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';

const ManagementNavigation = props => {
  const history = useHistory();
  const {url} = useRouteMatch();
  const goToLink = subPath => () => history.push(`${url}/${subPath}`);
  return (
    <>
      <List>
        <ListItem button onClick={goToLink('apartments')}>
          <ListItemIcon>
            <HouseRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Apartments" />
        </ListItem>
        <ListItem button onClick={goToLink('reservations')}>
          <ListItemIcon>
            <EventSeatRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Reservations" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={goToLink('complaints')}>
          <ListItemIcon>
            <LockOpenRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Complaints" />
        </ListItem>
        <ListItem button onClick={goToLink('bills-and-payments')}>
          <ListItemIcon>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText primary="Bills & Payments" />
        </ListItem>

        <ListItem button onClick={goToLink('apartments')}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Transaction History" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={goToLink('notifications')}>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem button onClick={goToLink('request')}>
          <ListItemIcon>
            <NoEncryptionRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Request" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={goToLink('profile')}>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={goToLink('settings')}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button onClick={goToLink('settings')}>
          <ListItemIcon>
            <ExitToAppRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </>
  );
};

export default ManagementNavigation;
