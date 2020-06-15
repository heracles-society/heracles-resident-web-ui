import {makeStyles, Divider, Button} from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import SecurityIcon from '@material-ui/icons/Security';
import SettingsIcon from '@material-ui/icons/Settings';
import WarningIcon from '@material-ui/icons/Warning';
import {SpeedDial, SpeedDialIcon, SpeedDialAction} from '@material-ui/lab';
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Rodal from 'rodal';

import ChatBot from '../../containers/Chatbot/ChatBot';
import {updateVisibleStatus} from '../../redux/actions/emergency';

// include styles
import 'rodal/lib/rodal.css';

const useStyles = makeStyles(theme => ({
  exampleWrapper: {
    position: 'relative',
    bottom: '10px',
    right: '2rem',
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
  emergencyService: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  proceed: {
    width: '50%',
  },
  information: {
    width: '50%',
    height: '490px',
    background: '#656262',
    position: 'relative',
    top: '-15px',
    right: '-15px',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    color: 'white',
  },
  warning: {
    position: 'absolute',
    color: '#e0e007',
    top: '-2.8rem',
    left: '7rem',
  },
  warningContent: {
    color: 'black',
    position: 'relative',
    left: '-1.5rem',
  },
  terms: {
    position: 'absolute',
    width: '250px',
    left: '-2rem',
  },
  button: {
    position: 'relative',
    top: '1rem',
  },
  informationContent: {
    position: 'absolute',
    top: '2rem',
    left: '2rem',
  },
  list: {
    position: 'absolute',
    top: '4rem',
    width: '90%',
  },
  icon: {
    position: 'relative',
    marginRight: '.5rem',
    top: '.4rem',
  },
}));

export const FloatingButton = props => {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const chatVisible = useSelector(state => state.emergency.isChatBoxVisible);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleEmergencyModal = () => {
    setVisible(true);
    setOpen(false);
  };

  const handleProfile = () => {};

  const handleSetting = () => {};

  const actions = [
    {
      icon: <SecurityIcon />,
      name: 'Emergency/SOS',
      callbackfn: 'handleEmergencyModal',
    },
    {icon: <AccountBoxIcon />, name: 'Profile', callbackfn: 'handleProfile'},
    {icon: <SettingsIcon />, name: 'Setting', callbackfn: 'handleSetting'},
  ];

  const getAction = name => {
    switch (name) {
      case 'handleEmergencyModal':
        return handleEmergencyModal;
      case 'handleProfile':
        return handleProfile;
      case 'handleSetting':
        return handleSetting;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="SpeedDial emergency"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={getAction(action.callbackfn)}
            />
          ))}
        </SpeedDial>
      </div>
      <Rodal
        visible={visible}
        onClose={() => setVisible(false)}
        animation="slideUp"
        width={600}
        height={490}
        customStyles={{borderRadius: '10px'}}
      >
        <div className={classes.emergencyService}>
          <div className={classes.proceed}>
            <div className={classes.warning}>
              <WarningIcon style={{fontSize: '5rem'}} />
              <div className={classes.warningContent}>
                <div
                  style={{
                    fontWeight: 'normal',
                    letterSpacing: '1.3px',
                    fontSize: '2rem',
                  }}
                >
                  Attention!
                </div>
                <p style={{position: 'relative', top: '-1rem', left: '-1rem'}}>
                  This is for emergency services.
                </p>
                <Divider />
                <div className={classes.terms}>
                  <p>
                    Please note this service is applicable for emergency cases
                    only.
                  </p>
                  <p>
                    Once proceed,{' '}
                    <strong>Heracles Emergency Support Team</strong>,
                  </p>
                  <p>
                    will get information from you and contact with your nearest
                    government Administartive office, along with your Society
                    head person/manager, to resolve your issue asap.
                  </p>
                  <Divider />
                  <div className={classes.button}>
                    <Button
                      variant="contained"
                      onClick={() => setVisible(false)}
                    >
                      CANCEL
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{marginLeft: '3rem'}}
                      onClick={() => {
                        // setChatEnabled(true);
                        dispatch(updateVisibleStatus(true));
                        setVisible(false);
                      }}
                    >
                      PROCEED
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.information}>
            <div className={classes.informationContent}>
              <div style={{fontSize: '1rem'}}>
                When to avail <strong>SOS/EMERGENCY</strong> Service?
              </div>
              <Divider />
              <div className={classes.list}>
                <p>
                  <span className={classes.icon}>
                    <CheckIcon />
                  </span>
                  In case of theft, murder etc. <strong>HERACLES TEAM </strong>
                  will connect with your nearest Police Station/Society Head.
                </p>

                <p>
                  <span className={classes.icon}>
                    <CheckIcon />
                  </span>
                  In case of Medical Emergency, <strong>HERACLES TEAM </strong>{' '}
                  will connect with your nearest Hospital/Society Head.
                </p>

                <p>
                  <span className={classes.icon}>
                    <CheckIcon />
                  </span>
                  In case of Fire, <strong>HERACLES TEAM </strong>will connect
                  with your nearest Fire Station/Society Head.
                </p>
                <Divider />
                <p>
                  <span className={classes.icon}>
                    <ClearIcon />
                  </span>
                  <strong>
                    {' '}
                    NOTE: Do not logged faked emergency services, this will
                    blocked your account and will take appropriate action.
                  </strong>
                </p>
              </div>

              <div />
            </div>
          </div>
        </div>
      </Rodal>
      {chatVisible && <ChatBot />}
    </>
  );
};
