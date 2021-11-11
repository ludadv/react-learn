import React from 'react';
import {NavLink} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

class Header extends React.Component {
    render() {
        return (
            <AppBar position="static">
                <Box className="header">
                    <Container>
                        <MenuList className="header__list">
                            <MenuItem className="header__item">
                                <NavLink to="/" >Home</NavLink>
                            </MenuItem>
                            <MenuItem className="header__item">
                                <NavLink to="/image-list" className="header-menu-item">Image list</NavLink>
                            </MenuItem>
                            <MenuItem className="header__item">
                                <NavLink to="/contact" className="header-menu-item">Contact form</NavLink>
                            </MenuItem>
                            <MenuItem className="header__item">
                                <NavLink to="/blog" className="header-menu-item">Blog</NavLink>
                            </MenuItem>
                        </MenuList>
                    </Container>
                </Box>
            </AppBar>
        )
    }
}

export default Header;
