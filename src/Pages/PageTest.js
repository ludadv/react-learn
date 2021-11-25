import React, {Component} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {withStyles} from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import styles from "../style";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


class PageTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            name: '',
            gender: '',
            married: false,
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <Box className={classes.container}>
                <Typography>Имя:{this.state.name}</Typography>
                <Typography>Пол:{this.state.gender}</Typography>
                <Typography>
                    Семейное положение: {this.getMarriedText()}
                </Typography>
                <FormControlLabel
                    control={<Checkbox checked={this.state.checked}
                    onChange={() => this.changeValue()}/>} label="Редактировать" />
                {this.state.checked &&
                <Box sx={{margin: '0 auto',  border: '1px solid #000'}}>
                    <FormControl component="fieldset" variant="standard">
                        <FormGroup sx={{display: 'flex'}}>
                            <TextField label="Имя"
                                       variant="outlined"
                                       value={this.state.name}
                                       onChange={event => this.setState({name: event.target.value})}
                                       sx={{ m: 1, minWidth: 120 }}/>
                            <Select
                                value={this.state.gender}
                                label='Select'
                                variant="outlined"
                                onChange={event => this.setState({gender: event.target.value})}
                            >
                                <MenuItem value='Мужской'>Мужской</MenuItem>
                                <MenuItem value='Женский'>Женский</MenuItem>
                            </Select>
                            <FormControlLabel
                                control={<Checkbox checked={this.state.married} onChange={() =>this.changeCheck()}/>}
                                label='Женат/Замужем' />


                        </FormGroup>
                    </FormControl>
                </Box>}

            </Box>
        );
    }
    changeValue() {
        this.setState({
            checked: !this.state.checked,
        })
    }

    changeCheck() {
        this.setState({
            married: !this.state.married,
        })
    }

    getMarriedText() {
        let item = 'Женат/Замужем';
        if (this.state.married && this.state.gender !== '') {
            if (this.state.gender === 'Мужской') {
                item = 'Женат';
            } else {
                item = 'Замужем';
            }
            return item;
        }
        return item;
    }

}

export default withStyles(styles)(PageTest);
