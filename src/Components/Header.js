import React from 'react';
import {NavLink} from "react-router-dom";

class Header extends React.Component {
    render() {
        return <div className="header">
            <nav className="nav">
                <NavLink to="/" className="header-menu-item">Home</NavLink>
                <NavLink to="/image-list" className="header-menu-item">Image list</NavLink>
                <NavLink to="/contact-form" className="header-menu-item">Contact form</NavLink>
            </nav>
        </div>;
    }
}

export default Header;
