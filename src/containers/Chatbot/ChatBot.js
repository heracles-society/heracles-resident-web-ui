import {Button, withStyles} from '@material-ui/core';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import * as React from 'react';
import {connect} from 'react-redux';
import Rodal from 'rodal';

import ChatBotHeader from './BotHeader';
import {callQuestionList, CALL, CHAT, timer} from './constant';

import send from '../../assets/send_button.svg';
import {
  setConversation,
  updateTextEnabled,
  updateVisibleStatus,
  setDefaultMessage,
  removeSelection,
} from '../../redux/actions/emergency';
import {getCurrentTimeStamp, validatePhoneNumber} from '../../utils/utility';
import 'react-chat-widget/lib/styles.css';
import './ChatBot.css';

class ChatBot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      QIndex: 0,
      visible: true,
      userText: '',
    };
    this.mesRef = React.createRef();
  }

  setVoiceCommand = (text, name = '') => {
    if (this.props.isSoundEnabled) {
      const voiceMsg = new SpeechSynthesisUtterance();
      if (name.length > 0) {
        voiceMsg.text = `Hi ${name}, ${text}`;
      } else {
        voiceMsg.text = text;
      }
      speechSynthesis.speak(voiceMsg);
    }
  };

  componentDidMount() {
    this.setVoiceCommand(
      this.props.messages[0].title,
      this.props.userData.givenName,
    );
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.mesRef.current.scrollIntoView({behavior: 'smooth'});
  };

  setAutomaticMessage = (index, timer) => {
    if (index < 4) {
      const newMessage = {
        sender: false,
        title: callQuestionList[this.state.QIndex + index].title || '',
        selection: [],
      };
      setTimeout(() => {
        this.props.setConversation(newMessage);
        this.props.updateTextEnabled(true);
        this.setVoiceCommand(newMessage.title);
        this.setAutomaticMessage(index + 1, timer);
      }, timer);
    }
  };

  handleNewUserMessage = msg => {
    if (msg === CALL || msg === CHAT || this.state.QIndex === 1) {
      this.props.updateTextEnabled(false);
    }
    if (this.state.QIndex === 1) {
      const isValidNumber = validatePhoneNumber(msg);
      if (isValidNumber) {
        this.setAutomaticMessage(1, 2000);
      } else {
        const upcomingMessage = {
          sender: false,
          title: callQuestionList[this.state.QIndex].title,
          selection: [],
        };
        setTimeout(() => {
          this.props.setConversation(upcomingMessage);
          this.setVoiceCommand(upcomingMessage.title);
        }, 2000);
      }
    }

    const senderMsg = {
      sender: true,
      title: msg,
      selection: [],
    };
    this.props.setConversation(senderMsg);
    this.props.removeSelection();
    this.setState({userText: ''});

    if (this.state.QIndex === 0) {
      const upcomingMessage = {
        sender: false,
        title: callQuestionList[this.state.QIndex].title,
        selection: [],
      };
      setTimeout(() => {
        this.props.setConversation(upcomingMessage);
        this.setState({
          QIndex: this.state.QIndex + 1,
        });
        this.setVoiceCommand(upcomingMessage.title);
      }, timer);
    }
  };
  render() {
    const {classes} = this.props;
    const showMessage = this.props.messages.map((msg, i) => {
      return (
        <div key={i}>
          <div>
            <div
              className={
                msg.sender
                  ? classes.senderMsgContainer
                  : classes.botMessageContainer
              }
            >
              {msg.title}
            </div>
            <span
              className={
                msg.sender ? classes.senderTimeStyle : classes.botTimeStyle
              }
            >
              {getCurrentTimeStamp()}
              {msg.sender ? (
                <span className={classes.tickStyle}>
                  <DoneAllIcon />
                </span>
              ) : null}
            </span>
            <div className={classes.selectionContainer}>
              {msg.selection.map((selection, index) => {
                return (
                  <Button
                    variant="contained"
                    color={selection.color}
                    onClick={() => this.handleNewUserMessage(selection.title)}
                    style={{marginLeft: '2rem'}}
                    key={index}
                  >
                    {selection.title}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <Rodal
          visible={this.props.isChatBoxVisible}
          onClose={() => {
            this.props.updateVisibleStatus(false);
            this.props.setDefaultMessage();
            speechSynthesis.cancel();
          }}
          animation="slideUp"
          closeMaskOnClick={false}
          showCloseButton={true}
          width={370}
          height={597}
          customStyles={{
            borderRadius: '10px',
            position: 'absolute',
            top: '9rem',
            left: '50rem',
            padding: '0',
          }}
        >
          <ChatBotHeader />
          <div className={classes.container}>
            {showMessage}
            <div ref={this.mesRef} />
          </div>
          <form
            className="rcw-sender"
            onSubmit={event => {
              event.stopPropagation();
              event.preventDefault();
              this.handleNewUserMessage(this.state.userText);
            }}
          >
            <input
              type="text"
              className="rcw-new-message"
              name="message"
              placeholder="Type a message"
              value={this.state.userText}
              disabled={this.props.isTextBoxEnabled}
              autoComplete="off"
              onChange={event => {
                this.setState({userText: event.target.value});
              }}
            />
            <button type="submit" className="rcw-send">
              <img src={send} className="rcw-send-icon" alt="send" />
            </button>
          </form>
        </Rodal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setConversation: message => dispatch(setConversation(message)),
    updateTextEnabled: status => dispatch(updateTextEnabled(status)),
    updateVisibleStatus: status => dispatch(updateVisibleStatus(status)),
    setDefaultMessage: () => dispatch(setDefaultMessage()),
    removeSelection: () => dispatch(removeSelection()),
  };
};
const mapStateToProps = state => {
  return {
    userData: state.session.data.user,
    messages: state.emergency.messages,
    isTextBoxEnabled: state.emergency.isTextBoxEnabled,
    isSoundEnabled: state.emergency.isSoundEnabled,
    isChatBoxVisible: state.emergency.isChatBoxVisible,
  };
};

const styles = theme => ({
  senderTimeStyle: {
    position: 'relative',
    left: '17rem',
    fontSize: '.7rem',
    top: '-1rem',
  },
  botTimeStyle: {
    position: 'relative',
    left: '1rem',
    fontSize: '.7rem',
  },
  tickStyle: {
    position: 'relative',
    top: '.4rem',
    left: '.3rem',
    color: '#05bef7',
  },
  rodalStyle: {
    borderRadius: '10px',
    position: 'absolute',
    top: '9rem',
    left: '50rem',
    padding: '0',
  },
  senderMsgContainer: {
    background: '#72d2ef',
    margin: '10px',
    padding: '10px',
    borderRadius: '10px',
    width: '40%',

    position: 'relative',
    left: '12rem',
    top: '1rem',
    marginBottom: '2rem',
  },
  botMessageContainer: {
    background: 'white',
    margin: '10px',
    padding: '10px',
    borderRadius: '10px',
    width: '50%',
    position: 'relative',
  },
  selectionContainer: {
    position: 'relative',
    top: '1rem',
  },
  container: {
    height: '75%',
    background: '#e4e4e4',
    overflowY: 'scroll',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ChatBot));