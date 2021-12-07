import React from 'react';
import {NavLink} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import IconButton from '@mui/material/IconButton';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Tooltip from '@mui/material/Tooltip';
import LogInForm from "../LogInForm";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }
    render() {
        return (
            <AppBar position="static">
                <Box className="header">
                    <Container>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <MenuList className="header__list">
                                <MenuItem className="header__item">
                                    <NavLink to="/" >Home</NavLink>
                                </MenuItem>
                                <MenuItem className="header__item">
                                    <NavLink to="/image-list"
                                             className="header-menu-item">Image list
                                    </NavLink>
                                </MenuItem>
                                <MenuItem className="header__item">
                                    <NavLink to="/contact"
                                             className="header-menu-item">Contact form
                                    </NavLink>
                                </MenuItem>
                                <MenuItem className="header__item">
                                    <NavLink to="/axios-test"
                                             className="header-menu-item">Axios-test
                                    </NavLink>
                                </MenuItem>
                                <MenuItem className="header__item">
                                    <NavLink to="/page-test"
                                             className="header-menu-item">Page-test
                                    </NavLink>
                                </MenuItem>
                            </MenuList>
                            <Box sx={{ justifyContent: 'flex-end' }}>
                                <Tooltip title="Регистрация">
                                    <IconButton aria-label="register"
                                                color='default'
                                                onClick={() => this.setState({
                                                    open: true,
                                                })}>
                                        <AppRegistrationIcon />
                                    </IconButton>
                                </Tooltip>
                                <LogInForm open={this.state.open} funcClose={() => this.setState({
                                    open: false,
                                })}/>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </AppBar>
        )
    }
}

export default Header;
