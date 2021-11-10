import React from "react";
import Cards from "../../Components/Cards";


import {Button, ButtonGroup, Grid, Typography} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


class ImageListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    title: "Title1",
                    url: "https://images.unsplash.com/photo-1636309311589-68e0d689fc07?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                },
                {
                    title: "Title2",
                    url: "https://images.unsplash.com/photo-1636192677130-83a4cbd0f7d3?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                },
                {
                    title: "Title3",
                    url: "https://images.unsplash.com/photo-1636280794391-c024c9688e10?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                },
                {
                    title: "Title4",
                    url: "https://images.unsplash.com/photo-1636048710788-af2d99a8f05c?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI5fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                },
            ]
        };
    }

    render() {
        return (
            <div className="image-list-page">
                <Typography
                    variant="h3"
                    component="div"
                    align="center"
                    gutterBottom sx={{my: 3}}
                >
                    Images list
                </Typography>
                <ButtonGroup align="center">
                    <Button onClick={event => this.addImage(event)}
                        size="large"
                        startIcon={<AddCircleIcon/>}
                        className="add-item-button"
                    >
                        Add image
                    </Button>
                    <Button onClick={event => this.clearImages(event)}
                        color=""
                        size="large"
                        startIcon={<RemoveCircleIcon/>}
                        className="clear-items-button"
                    >
                        Clear images
                    </Button>
                </ButtonGroup>
                <Grid container spacing={2} sx={{mt: 2}}>
                    {this.state.list.map(
                        (item, index) =>
                            <Cards
                                title={item.title}
                                 src={item.url}
                                key={index}
                                onClose={() => this.removeImage(index)}
                            />
                    )
                    }
                </Grid>
            </div>
        );
    }

    addImage(event) {
        event.preventDefault();

        const newItem = {
            title: 'New item #' + this.state.list.length,
            url: 'https://pbs.twimg.com/profile_images/954421639873167360/jGyozaLe_400x400.jpg',
        };
        this.setState({
            list: this.state.list.concat(newItem),
        });
    }

    clearImages(event) {
        event.preventDefault();

        this.setState( {
            list: [],
        })
    }

    removeImage(index) {
        this.setState({
            list : this.state.list.filter(
                (item, idx) => index !== idx
            )
        })
    }
}

export default ImageListPage

