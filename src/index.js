import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import Home from './components/home';
//import Register from './components/register';

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
