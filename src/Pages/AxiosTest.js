import React, {Component} from 'react';
import axios from "axios";
import List from '@mui/material/List';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

class AxiosTest extends Component {
    state = {
        blogList: [],
        pagination: {
            page: 1,
            perPage: 0,
            pagesCount: 0,
        },
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <List>
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="demo-simple-select-label">Page</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Page"
                    >
                        { this.generatePageNumbers().map(pageNo =>
                            <MenuItem value={pageNo} onClick={event => this.changePage(event)}>{pageNo}</MenuItem>) }
                    </Select>
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
        axios.get('http://laravel-blog-test/api/blog?page=' + this.state.pagination.page)
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
        let pageNo = +(event.target.dataset.value);
        this.state.pagination.page = pageNo;

        this.getList()
    }

}

export default AxiosTest;
