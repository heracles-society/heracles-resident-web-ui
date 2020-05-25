import {
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

const ManagementNavigation = props => {
  const history = useHistory();
  const {url} = useRouteMatch();
  const goToLink = subPath => () => history.push(`${url}/${subPath}`);
  return (
    <>
      <List>
        <ListItem button onClick={goToLink('apartments')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Apartments" />
        </ListItem>
        <ListItem button onClick={goToLink('reservations')}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Reservations" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={goToLink('complaints')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Complaints" />
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
        <ListItem button onClick={goToLink('profile')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
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

export default ManagementNavigation;
