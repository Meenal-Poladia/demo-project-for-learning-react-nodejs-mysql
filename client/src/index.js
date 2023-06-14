import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { AuthContexProvider } from "./context/authContext";

ReactDOM.render(
    <AuthContexProvider>
        <App />
    </AuthContexProvider>,
    document.getElementById('root'));
