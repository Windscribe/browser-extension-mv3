import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { increment } from '../../state/slices/test';
import logo from '../../assets/img/logo.svg';
import log from '../../utils/log';
import './Popup.css';

const Popup = (props) => {
  log('popup props ', props);
  // const dispatch = useDispatch();

  // useSelector doesn't work
  // const smth = useSelector(state => {
  //   log('popup selector state ', state);
  // });

  const handleClick = async () => {
    log('popup clicked ');
    await props.store.dispatch(increment());
    const newState = props.store.getState();
    log('popup newState ', newState);
  };

  useEffect(() => {
    const resp = props.store.getState();
    log('popup useEffect ', resp);
  }, []);

  const getCounter = () => {
    return props.store.getState().counter;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Counter value is <code>{getCounter()}</code>
        </p>
        <button className='button' onClick={handleClick} >Test Redux</button>
      </header>
    </div>
  );
};

export default Popup;
