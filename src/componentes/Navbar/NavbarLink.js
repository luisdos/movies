import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLink = (props) => (
    <li className="navbar-item">
        <Link to={props.to} className="nav-link">{props.title}</Link>
    </li>
)

export default NavbarLink;