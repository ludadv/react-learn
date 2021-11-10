import React from 'react';
import {Grid} from "@mui/material";

class Cards extends React.Component {
    render() {
        return (
            <Grid  item xs={12} sm={6}>
                <div className="card-btn" onClick={event => this.props.onClose(event)}>&#10006;</div>
                { this.props.title && <div className="card-title">{this.props.title}</div> }
                { this.props.src && <img src={this.props.src} alt="" loading="lazy"/> }
            </Grid>
        )
    }
}

export default Cards;
