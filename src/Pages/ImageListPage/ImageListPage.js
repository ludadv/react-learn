import React from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "../HomePage";
import ContactPage from "../ContactPage";
import Card from "../../Components/Card";

import {makeStyles} from '@mui/styles';
import {Button, ButtonGroup} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const useStyles = makeStyles(({
    button: {
        color: "white",
        background: "black",
    }
}))

class ImageListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    title: "Title1",
                    url: "https://images.unsplash.com/photo-1635959565667-aeb00a4297ba?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                },
                {
                    title: "Title2",
                    url: "https://images.unsplash.com/photo-1635752019785-6637044adea9?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                },
                {
                    title: "Title3",
                    url: "https://images.unsplash.com/photo-1635924010446-c2a9851859af?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDExfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                },
                {
                    title: "",
                    url: "https://images.unsplash.com/photo-1635746863748-ae514d7f8e87?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                },
                {
                    title: "Title5",
                    url: "",
                },
            ]
        };
    }

    render() {
        return (
            <div className="image-list-page">
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/image-list' element={<ImageListPage/>}/>
                    <Route path='/contacts' element={<ContactPage/>}/>
                </Routes>
                <ButtonGroup>
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
                <div className="cards">
                    {this.state.list.map(
                        (item, index) =>
                            <Card
                                title={item.title}
                                src={item.url}
                                key={index}
                                onClose={() => this.removeImage(index)}
                            />
                    )
                    }
                </div>
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

