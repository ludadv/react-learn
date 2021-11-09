import React from 'react';
import {NavLink} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

class Header extends React.Component {

    render() {
        return (

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Container>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                <AddIcon />
                            </IconButton>
                            <NavLink to="/" className="header-menu-item">Home</NavLink>
                            <NavLink to="/image-list" className="header-menu-item">Image list</NavLink>
                            <NavLink to="/contact-form" className="header-menu-item">Contact form</NavLink>

                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        )
    }
}

export default Header;
