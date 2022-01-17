import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

//-- Custom Components
import Body from 'Body';

ReactDOM.render(
        <BrowserRouter>
          <Body/>
        </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// https://usersnap.com/blog/atom-tips-shortcuts/    use this for atom hotkeys
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
