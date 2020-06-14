import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import React from 'react';
import {connect} from 'react-redux';

import {setSound} from '../../redux/actions/emergency';

const ChatBotHeader = props => {
  return (
    <div
      style={{
        height: '20%',
        background: '#0081A7',
        color: 'white',
        textAlign: 'center',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
      }}
    >
      <div
        style={{
          position: 'relative',
          top: '1rem',
          left: '2rem',
          width: '75%',
        }}
      >
        <div style={{fontSize: '1.3rem'}}>Heracles Emergency Support Team</div>

        <div style={{fontSize: '1rem'}}>Ready to help you!</div>
        <span
          onClick={() => {
            props.setSound(!props.isSoundEnabled);
            speechSynthesis.cancel();
          }}
          role="button"
          tabIndex="0"
          onKeyPress={() => {}}
          style={{
            position: 'absolute',
            right: '-3rem',
            bottom: '-1rem',
            cursor: 'pointer',
          }}
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
