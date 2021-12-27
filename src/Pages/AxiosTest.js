import React from 'react';
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
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import {DataGrid} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

import LogInForm from '../Components/LogInForm'

class AxiosTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            openModal: false,

            style : {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 800,
                bgcolor: 'white',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                buttonClose: {
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                }
            },
            open: false,
            text: '',
            user: {
                user_id: null,
                title: '',
                text: ''
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            {
                field: 'user',
                headerName: 'UserName',
                valueFormatter: (data) => data.value.name,
                width: 200,
            },
            { field: 'title', headerName: 'Title', width: 130 },
            { field: 'text', headerName: 'Text', width: 130 },
        ];

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
                        <TextField
                            value={this.state.search}
                            label="Search"
                            variant="outlined"
                            onChange={event =>this.setState({search : event.target.value})}
                        />
                        <Button
                            sx={{mx: 2}}
                            variant="outlined"
                            onClick={() => this.handleSubmit()}
                        >
                            Отправить
                        </Button>
                        <Button
                            sx={{mx: 2}}
                            variant="outlined"
                            onClick={event => this.clearSearch(event)}
                        >
                            Очистить
                        </Button>
                    </Box>
                </FormControl>

                <div>page: { this.state.pagination.page }</div>
                <div>perPage: { this.state.pagination.perPage }</div>
                <div>pagesCount: { this.state.pagination.pagesCount }</div>
                <hr />

                {/*{ this.state.blogList.map(blogItem =>*/}
                {/*    <div>{blogItem.id} - {blogItem.title} - {blogItem.user.name}*/}
                {/*        <IconButton color="primary" onClick={() =>this.openModal(blogItem)} component="span">*/}
                {/*            <RemoveRedEyeIcon />*/}
                {/*        </IconButton>*/}
                {/*    </div>*/}
                {/*)}*/}
                <LogInForm open={this.state.openModal}
                           funcClose={() => this.setState({
                                openModal: false,
                            })}
                           handleSubmit={this.handleSubmit}
                />

                <Box sx={{width: '100%', height: '500px'}}>
                    <DataGrid
                        rows={this.state.blogList}
                        columns={columns}
                        rowsPerPageOptions={[this.state.pagination.perPage]}
                    />
                    <Modal
                        open={this.state.open}
                        onClose={() => this.closeModal()}
                        aria-labelledby="modal-modal-title"
                    >
                        <Box sx={this.state.style}>
                            <Typography>{this.state.text}</Typography>
                            <IconButton sx={this.state.style.buttonClose} onClick={() =>this.closeModal()} component="span">
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Modal>
                </Box>
                <IconButton onClick={() =>this.setState({
                    openModal: true,
                })} component="span">
                    <AddIcon />
                </IconButton>
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
            params.append('searchFields', 'title:like;text:like');
        }
        params.append('with', 'user');
        axios.get('http://laravel-blog-test/api/blog', {params})
            .then(response => {
                console.log(response)
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

    handleSubmit = (submitForm) => {
        this.setState({
            user: {
                user_id: submitForm.id,
                title: submitForm.title,
                text: submitForm.text,
            },
        })
        this.addToList(this.state.user);
    };

    addToList(newItem) {
        axios.post('http://laravel-blog-test/api/blog', newItem)
            .then(() => {
                this.getList();
            })
    }

    generatePageNumbers() {
        const items = [];
        for (let i = 1; i <= this.state.pagination.pagesCount; i++) {
            items.push(i);
        }

        return items;
    }

    async changePage(event) {
        let pageNo = +(event.target.value);

        await this.setState({
            pagination: {
                page: pageNo,
            },
        });

        this.getList();
    }

    async changePerPage(event) {
        let numPositions = +(event.target.value);

        await this.setState({
            pagination: {
                perPage: numPositions,
                page: 1,
            },
        });

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

    handleSubmit() {
        this.getList();
    }

    async clearSearch(event) {
        event.preventDefault();
        await this.setState({
            search : "",
            page: 1,
        });
        this.getList();
    }

    openModal(item) {
        this.setState({
            open: true,
            text: item.text,
        });
    }

    closeModal() {
        this.setState({
            open: false,
        });
    }


}

export default AxiosTest;
