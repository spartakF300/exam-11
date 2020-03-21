import React from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => {
    return (
        <Nav>
            <NavItem>
                <span className="nav-link">Hello, {user.username}</span>
            </NavItem>
            <NavItem>
                <NavLink tag={RouterNavLink} to="/additem">Add new item</NavLink>
            </NavItem>
            <NavItem>
                <span className="nav-link" onClick={logout}>Logout</span>
            </NavItem>
        </Nav>
    );
};

export default UserMenu;
