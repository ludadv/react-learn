import React, {Component} from 'react';
import axios from "axios";
import List from '@mui/material/List';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


class AxiosTest extends Component {
    state = {
        blogList: [],
        pagination: {
            page: 1,
            perPage: 10,
            pagesCount: 0,
        },
        sort: {
            field: 'id',
            orderDesc: 'asc',
        },
        search: '',
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <List>
                <Box sx={{ display: 'flex', justifyContent: "space-between", width: '100%'}}>
                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel id="select-page">Page</InputLabel>
                        <Select
                            value={this.state.pagination.page}
                            labelId="select-page"
                            label="Page"
                            onChange={event => this.changePage(event)}
                        >
                            { this.generatePageNumbers().map(pageNo =>
                                <MenuItem value={pageNo}>{pageNo}</MenuItem>) }
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel id="select-per-page">PerPage</InputLabel>
                        <Select
                            labelId="select-per-page"
                            value={this.state.pagination.perPage}
                            label="PerPage"
                            onChange={event => this.changePerPage(event)}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 300 }}>
                    <InputLabel id="select-sort">Sort</InputLabel>
                    <Select
                        labelId="select-sort"
                        label="Sort"
                        value={this.state.sort.field}
                        onChange={event => this.sortItems(event)}
                    >
                        <MenuItem value='id'>Id</MenuItem>
                        <MenuItem value='created_at'>Date</MenuItem>
                        <MenuItem value='title'>Title</MenuItem>
                        <MenuItem value='user_id'>User</MenuItem>
                    </Select>
                </FormControl>
                    <FormControl>
                        <Checkbox
                            checked={this.state.sort.orderDesc === 'desc'}
                            onChange={event => this.changeOrderDescCheckbox(event)}
                            icon={<ArrowUpwardIcon />}
                            checkedIcon={<ArrowDownwardIcon />}
                        />
                    </FormControl>
                </Box>
                <FormControl sx={{width: "100%"}}>
                    <Box component="form" sx={{display: "flex", py: 2, justifyContent: "center"}}>
                        <TextField label="Search" variant="outlined" onChange={event => this.handleChange(event)}/>
                        <Button variant="outlined" onClick={() => this.handleSubmit()}>Отправить</Button>
                    </Box>
                </FormControl>

                <div>page: { this.state.pagination.page }</div>
                <div>perPage: { this.state.pagination.perPage }</div>
                <div>pagesCount: { this.state.pagination.pagesCount }</div>
                <hr />
                { this.state.blogList.map(blogItem =>
                    <div>{blogItem.id} - {blogItem.title}</div>
                )}
            </List>
        )
    }

    getList() {
        const params = new URLSearchParams();
        params.append('page', this.state.pagination.page);
        params.append('per_page', this.state.pagination.perPage);
        params.append('orderBy', this.state.sort.field);
        params.append('sortedBy', this.state.sort.orderDesc);
        if (this.state.search) {
            params.append('search', this.state.search);
        }
        // params.append('with', 'user');
        axios.get('http://laravel-blog-test/api/blog', {params})
            .then(response => {
                this.setState({
                    blogList: response.data.data,
                    pagination: {
                        page: response.data.meta.pagination.current_page,
                        perPage: response.data.meta.pagination.per_page,
                        pagesCount: response.data.meta.pagination.total_pages,
                    },
                });
            });
    }

    generatePageNumbers() {
        const items = [];
        for (let i = 1; i <= this.state.pagination.pagesCount; i++) {
            items.push(i);
        }

        return items;
    }

    changePage(event) {
        let pageNo = +(event.target.value);
        this.state.pagination.page = pageNo;

        this.getList();
    }

    changePerPage(event) {
        let numPositions = +(event.target.value);
        this.state.pagination.perPage = numPositions;
        this.state.pagination.page = 1;

        this.getList();
    }

    sortItems(event) {
        let item = event.target.value;
        this.state.sort.field = item;

        this.getList();
    }

    changeOrderDescCheckbox(event) {
        let orderDesc = event.target.checked ? 'desc' : 'asc';
        this.state.sort.orderDesc = orderDesc;

        this.getList();
    }

    handleChange(event) {
        let itemChange = event.target.value;
        this.state.search = itemChange;
    }

    handleSubmit() {
        this.getList();
    }


}

export default AxiosTest;
