import React from 'react';
import {Typography} from "@mui/material";

class HomePage extends React.Component {
    render() {
        return (
            <div className="home-page">
                <Typography
                    variant="h3"
                    component="div"
                    align="center"
                    gutterBottom sx={{my: 3}}
                >
                    Home page
                </Typography>
            </div>
        )
    }
}

export default HomePage;
