import React, {Component} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {withStyles} from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import styles from "../style";
import PageTestForm from '../Components/PageTestForm';


class PageTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <Box className={classes.container}>
                <Typography>Имя:{this.props.ree}</Typography>
                <Typography>Пол:м/ж</Typography>
                <Typography>Семейное положение: женат/ не женат</Typography>
                <FormControlLabel
                    control={<Checkbox checked={this.state.checked}
                    onChange={() => this.changeValue()}/>} label="Редактировать" />
                {this.state.checked && <PageTestForm />}

            </Box>
        );
    }
    changeValue() {
            this.setState({
                checked: !this.state.checked,
        })
    }
}

export default withStyles(styles)(PageTest);
