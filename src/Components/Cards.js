import React from 'react';
import {Grid} from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

class Cards extends React.Component {
    render() {
        return (
            <Grid item xs={12} sm={6}>
                <Card>
                    { this.props.title && <CardHeader
                        title={this.props.title}
                        action={
                            <IconButton aria-label="settings">
                                <CloseIcon onClick={event => this.props.onClose(event)}/>
                            </IconButton>
                        }
                    />}

                    { this.props.src && <CardMedia
                        component="img"
                        height="194"
                        image={this.props.src}
                        loading="lazy"
                    /> }

                </Card>
            </Grid>
        )
    }
}

export default Cards;
