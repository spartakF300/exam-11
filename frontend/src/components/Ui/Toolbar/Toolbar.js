import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {Nav, Navbar, NavbarBrand} from "reactstrap";

import UserMenu from "./Menus/UserMenu";
import AnonymousMenu from "./Menus/AnonymousMenu";
import {useDispatch, useSelector} from "react-redux";
import {logoutUserGet} from "../../../store/actions/usersActions";

const Toolbar = () => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();
    return (
        <Navbar color="info" dark expand="md">
            <NavbarBrand tag={RouterNavLink} to="/">Shop</NavbarBrand>
            <Nav className="ml-auto" navbar>
                {user ? <UserMenu user={user} logout={() => dispatch(logoutUserGet())}/> : <AnonymousMenu/>}
            </Nav>
        </Navbar>
    );
};

export default Toolbar;
