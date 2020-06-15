import {makeStyles} from '@material-ui/core';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import React from 'react';
import {connect} from 'react-redux';

import {setSound} from '../../redux/actions/emergency';

const useStyles = makeStyles(theme => ({
  container: {
    height: '20%',
    background: '#0081A7',
    color: 'white',
    textAlign: 'center',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
  headerBlock: {
    position: 'relative',
    top: '1rem',
    left: '2rem',
    width: '75%',
  },
  title: {
    fontSize: '1.3rem',
  },
  subtitle: {
    fontSize: '1rem',
  },
  sound: {
    position: 'absolute',
    right: '-3rem',
    bottom: '-1rem',
    cursor: 'pointer',
  },
}));

const ChatBotHeader = props => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.headerBlock}>
        <div className={classes.title}>Heracles Emergency Support Team</div>

        <div className={classes.subtitle}>Ready to help you!</div>
        <span
          onClick={() => {
            props.setSound(!props.isSoundEnabled);
            speechSynthesis.cancel();
          }}
          role="button"
          tabIndex="0"
          onKeyPress={() => {}}
          className={classes.sound}
        >
          {props.isSoundEnabled ? <VolumeDownIcon /> : <VolumeOffIcon />}
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isSoundEnabled: state.emergency.isSoundEnabled,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSound: status => dispatch(setSound(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBotHeader);
