import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from "../../auth"

import {
    NavItem,
    NavLink
} from './../../components';


export function NavbarUser() {
    const { setAuthTokens } = useAuth();

    function logOut() {
        setAuthTokens();
        localStorage.removeItem("tokens");
    }

    return (
        <NavItem>
            <NavLink tag={ Link } to="/pages/login" onClick={logOut}>
                <i className="fa fa-power-off"></i>
            </NavLink>
        </NavItem>
    );
}
