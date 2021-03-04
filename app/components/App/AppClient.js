import React, { useState } from 'react';
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom';

import AppLayout from './../../layout/default';
import { RoutedContent } from './../../routes';
import {AuthContext} from "../../auth"

const basePath = process.env.BASE_PATH || '/';

const AppClient = () => {

    const existingTokens = JSON.parse(localStorage.getItem("tokens"));
    const [authTokens, setAuthTokens] = useState(existingTokens);
    
    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    }

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <Router basename={ basePath }>
                <AppLayout>
                    <RoutedContent />
                </AppLayout>
            </Router>
        </AuthContext.Provider>
    );
}

export default hot(module)(AppClient);