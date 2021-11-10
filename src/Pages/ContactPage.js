import React from 'react';
import {Typography} from "@mui/material";

class ContactPage extends React.Component {
    render() {
        return (
            <div className="contacts-page">
                <Typography
                    variant="h3"
                    component="div"
                    align="center"
                    gutterBottom sx={{my: 3}}
                >
                    Contacts
                </Typography>
            </div>
        )
    }
}

export default ContactPage;
