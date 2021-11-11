import React, {Component} from 'react';
import axios from "axios";
import List from '@mui/material/List';

class Blog extends Component {
    state = {
        blogList: [],
        pagination: {
            page: 0,
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
                <div>page: { this.state.pagination.page}</div>
                <div>perPage: { this.state.pagination.perPage}</div>
                <div>pagesCount: { this.state.pagination.pagesCount}</div>
                <hr />
                { this.state.blogList.map(blogItem =>
                    <div>{blogItem.id} - {blogItem.title}</div>
                )}
            </List>
        )
    }

    getList() {
        axios.get('http://laravel-blog-test/api/blog?page=1')
            .then(response => {
                console.log(response.data.meta.pagination);
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
}

export default Blog;
