import React, {Component} from 'react';
import axios from "axios";
import List from '@mui/material/List';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

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
            orderDesc: false,
        },
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
                        value={this.state.sort.field}
                        label="Sort"
                        // onChange={}
                    >
                        <MenuItem value={1}>Id</MenuItem>
                        <MenuItem value={2}>Date</MenuItem>
                        <MenuItem value={3}>Title</MenuItem>
                        <MenuItem value={4}>User</MenuItem>
                    </Select>
                </FormControl>
                </Box>
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
        params.append('orderBy', 'id');
        params.append('sortedBy', 'desc'); // asc/desc
        params.append('with', 'user');
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

    generateNumberPositions() {

    }

    changePage(event) {
        let pageNo = +(event.target.value);
        this.state.pagination.page = pageNo;

        this.getList()
    }

    changePerPage(event) {
        let numPositions = +(event.target.value);
        this.state.pagination.perPage = numPositions;
        this.state.pagination.page = 1;
        this.getList()
    }
}

export default AxiosTest;
