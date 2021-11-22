import React, {Component} from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {withStyles} from '@mui/styles';

import styles from "../style";


class PageTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            setValue: '',
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <Box
                sx={{
                    '& > legend': { mt: 2 },
                }}
            >
                <Typography component="legend">Controlled</Typography>
                <Rating
                    name="simple-controlled"
                    value={this.state.value}
                    onChange={(event) => this.setState({value: event.target.value})
                    }
                />
                <Typography component="legend">Read only</Typography>
                <Rating name="read-only" value={this.state.value} readOnly />
                <Typography component="legend">Disabled</Typography>
                <Rating name="disabled" value={this.state.value} disabled />
                <Typography component="legend">No rating given</Typography>
                <Rating name="no-value" value={null} />
                <Button className={classes.button}>ClassComponent</Button>;
            </Box>

        );
    }
}

export default withStyles(styles)(PageTest);
