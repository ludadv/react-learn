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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


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
                itemsCount: 0,
            },
            sort: {
                field: 'id',
                orderDesc: 'asc',
            },
            search: '',
            openModal: false,
            modalData: {},
            pages: 0,

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
            status: false,
        }
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
                        {/*<Select*/}
                        {/*    value={this.state.pagination.page}*/}
                        {/*    labelId="select-page"*/}
                        {/*    label="Page"*/}
                        {/*    onChange={event => this.changePage(event)}*/}
                        {/*>*/}
                        {/*    { this.generatePageNumbers().map(pageNo =>*/}
                        {/*        <MenuItem value={pageNo}>{pageNo}</MenuItem>) }*/}
                        {/*</Select>*/}
                    </FormControl>
                    {/*<FormControl sx={{ minWidth: 150 }}>*/}
                    {/*    <InputLabel id="select-per-page">PerPage</InputLabel>*/}
                    {/*    <Select*/}
                    {/*        labelId="select-per-page"*/}
                    {/*        value={this.state.pagination.perPage}*/}
                    {/*        label="PerPage"*/}
                    {/*        onChange={event => this.changePerPage(event)}*/}
                    {/*    >*/}
                    {/*        <MenuItem value={10}>10</MenuItem>*/}
                    {/*        <MenuItem value={25}>25</MenuItem>*/}
                    {/*        <MenuItem value={50}>50</MenuItem>*/}
                    {/*    </Select>*/}
                    {/*</FormControl>*/}
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
                            onClick={() => this.handleSearchSubmit()}
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

                {/*<div>page: { this.state.pagination.page }</div>*/}
                {/*<div>perPage: { this.state.pagination.perPage }</div>*/}
                {/*<div>pagesCount: { this.state.pagination.pagesCount }</div>*/}
                {/*<hr />*/}

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
                           btn = 'Add'
                />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Title</TableCell>
                                <TableCell align="right">Text</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() =>this.setState({
                                        openModal: true,
                                        status: true,
                                    })} component="span">
                                        <AddIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.blogList.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="right">{row.title}</TableCell>
                                    <TableCell align="right">{row.text}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            onClick={() => this.setState({
                                                openModal: true,
                                                // status: false,
                                                modalData: {
                                                    user_id: row.id,
                                                    title: row.title,
                                                    text: row.text
                                                },
                                            })}
                                            color="primary"
                                            aria-label="upload picture"
                                            component="span">
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            onClick={() => this.confirmItemDelete(row.id)}
                                            color="primary"
                                            aria-label="upload picture"
                                            component="span">
                                            <CloseIcon />
                                        </IconButton>
                                    </TableCell>
                                    <LogInForm
                                        open={this.state.openModal}
                                        data={this.state.modalData}
                                        funcClose={() => this.setState({
                                           openModal: false,
                                        })}
                                        handleSubmit={this.handleSubmit}
                                        title={this.state.status?'Добавить':'Редактировать'}
                                        btn={this.state.status?'Add':'Edit'}
                                    />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={this.state.pagination.itemsCount}
                    rowsPerPage={this.state.pagination.perPage}
                    page={this.state.pages}
                    onRowsPerPageChange={event => this.changePerPage(event)}
                />
                <Stack spacing={2}>
                    <Pagination count={this.state.pagination.pagesCount}
                                color="primary"
                                page={this.state.pagination.page}
                                defaultPage={3}
                                onChange={(event, value) => this.changePage(event, value)}
                    />
                </Stack>
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
                        itemsCount: response.data.meta.pagination.total,
                    },
                });
            });
    }

    handleSubmit = (submitForm) => {
        this.setState({
            user: {
                user_id: submitForm.user_id,
                title: submitForm.title,
                text: submitForm.text,
            },
        })
        // console.log(this.state.user.user_id)
        // if (this.state.user.user_id) {
        //     this.editItems(this.state.user)
        // }
        this.addToList(this.state.user);
    };

    // editItems(editableItem) {
    //     axios.patch('http://laravel-blog-test/api/blog', editableItem)
    //         .then(() => {
    //             this.getList();
    //         })
    // }

    addToList(newItem) {
        axios.post('http://laravel-blog-test/api/blog', newItem)
            .then(() => {
                this.getList();
            })
    }

    confirmItemDelete(item) {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                MySwal.fire(
                    this.removeItemFromList(item)
                )
            }
        })
    }
    removeItemFromList(item) {
        let removedItem = item;
        axios.delete(`http://laravel-blog-test/api/blog/${removedItem}`)
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

    async changePage(event, value) {
        await this.setState({
            pagination: {
                page: value,
                perPage: 10,
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

    handleSearchSubmit() {
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
            data: true,
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
