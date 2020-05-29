import React from 'react';
import './App.css';
import {useDispatch} from 'react-redux';

import {restoreSession} from './redux/actions/session';
import Routes from './routes';

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);
  return <Routes />;
}

export default App;
