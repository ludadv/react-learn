import React, {Component} from 'react';

import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


class PageTestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: '',
            name: '',
        }
    }
    render() {
        return (
            <Box sx={{margin: '0 auto',  border: '1px solid #000'}}>
                <FormControl component="fieldset" variant="standard">
                    <FormGroup sx={{display: 'flex'}}>
                        <TextField label="Имя"
                                   variant="outlined"
                                   value={this.state.name}
                                   ree={this.state.name}
                                   onChange={event => this.setState({name: event.target.value})}
                                   sx={{ m: 1, minWidth: 120 }}/>
                        <Select
                            value={this.state.gender}
                            label='Select'
                            variant="outlined"
                            onChange={event => this.сhangeValue(event)}
                        >
                            <MenuItem value='Мужской'>Мужской</MenuItem>
                            <MenuItem value='Женский'>Женский</MenuItem>
                        </Select>
                        <FormControlLabel control={<Checkbox />} label="Женат/Замужем" />
                    </FormGroup>
                </FormControl>
            </Box>
        );
    }
    сhangeValue(event) {
        this.setState({
            gender: event.target.value,
        })
    }
}

export default PageTestForm;
