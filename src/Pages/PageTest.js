import React, {Component} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import {withStyles} from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import styles from "../style";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from "@mui/material/MenuItem";
import 'date-fns'
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import Grid from "@mui/material/Grid";


class PageTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            name: '',
            gender: '',
            married: false,
            selectedDataBirth: new Date('2021-11-29'),
            selectedDataWedding: new Date('2021-11-29'),
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <Container>
                <div className={classes.container}>
                    <Typography>
                        Имя:{this.state.name}
                    </Typography>
                    <Typography>
                        Пол:{this.state.gender}
                    </Typography>
                    <Typography>
                        Семейное положение: {this.getMarriedText()}
                    </Typography>
                    <Typography>
                        Дата рождения: {this.state.selectedDataBirth.toLocaleDateString()}
                    </Typography>
                    <Typography>
                        Дата свадьбы: {this.state.selectedDataWedding.toLocaleDateString()}
                    </Typography>
                    <FormControlLabel
                        sx={{display: 'block'}}
                        control={<Checkbox checked={this.state.checked}
                        onChange={() => this.changeValue()}/>}
                        label="Редактировать" />
                    {this.state.checked &&
                    <Box>
                        <TextField
                           label="Имя"
                           autoFocus
                           sx={{m: 1, minWidth: 120 }}
                           variant="outlined"
                           value={this.state.name}
                           onChange={event => this.setState({name: event.target.value})}
                        />
                        <FormControl>
                            <InputLabel id="select-label">Select</InputLabel>
                            <Select
                                sx={{ m: 1, minWidth: 120 }}
                                value={this.state.gender}
                                labelId="select-label"
                                label='Select'
                                variant="outlined"
                                onChange={event => this.setState({gender: event.target.value})}
                            >
                                <MenuItem value='Мужской'>Мужской</MenuItem>
                                <MenuItem value='Женский'>Женский</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            sx={{display: 'block'}}
                            control={<Checkbox checked={this.state.married}
                            onChange={() =>this.changeCheck()}/>}
                            label='Женат/Замужем'
                        />
                        {this.state.married &&
                        <Box className={classes.calendarBox}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <Grid container sx={{justifyContent: 'space-around'}}>
                                <DatePicker
                                    sx={{marginRight: 2}}
                                    label="date of birth"
                                    value={this.state.selectedDataBirth}
                                    onChange={dataB => this.setState({
                                        selectedDataBirth: new Date(dataB),
                                    })}
                                />
                                <DatePicker
                                    label="wedding date"
                                    value={this.state.selectedDataWedding}
                                    minDate={this.state.selectedDataBirth}
                                    onChange={dataW => this.setState({
                                        selectedDataWedding: new Date(dataW),
                                    })}
                                />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Box>
                        }
                    </Box>
                    }
                </div>
            </Container>
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
        if (this.state.married) {
            if (this.state.gender === '') {
                return 'Женат/Замужем';
            } else if (this.state.gender === 'Мужской') {
                return  'Женат';
            } else {
                return  'Замужем';
            }
        }

        if (this.state.gender === '') {
            return 'Холост/Не замужем';
        } else if (this.state.gender === 'Мужской') {
            return  'Холост';
        } else {
            return  'Не замужем';
        }
    }
}
export default withStyles(styles)(PageTest);
