import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';
import ToDosProvider from './utils/context';
import 'react-datepicker/dist/react-datepicker.css';
ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ToDosProvider>
      <App />
    </ToDosProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
