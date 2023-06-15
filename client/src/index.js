import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { AuthContexProvider } from "./context/authContext";
/*
    Youtube Video by Dev Lama: https://www.youtube.com/watch?v=0aPLk2e2Z3g
 */

ReactDOM.render(
    <AuthContexProvider>
        <App />
    </AuthContexProvider>,
    document.getElementById('root'));
