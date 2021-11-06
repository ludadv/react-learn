import React from 'react';
import Card from "./Card";

class Body extends React.Component {
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
            <div className='body'>
                <div class="cards">
                    <button onClick={ event => this.addImage(event) }>Add image</button>
                    <button>Clear images</button>
                </div>
                <div class="cards">
                    { this.state.list.map(
                        (item, index) =>
                            <Card
                                title={item.title}
                                src={item.url}
                                key={index}
                            />
                        )
                    }
                </div>
            </div>
        );
    }

    addImage(event) {
        event.preventDefault();

        console.log(this.state.list);
        const newItem = {
            title: 'New item #' + this.state.list.length,
            url: 'https://pbs.twimg.com/profile_images/954421639873167360/jGyozaLe_400x400.jpg',
        };
        this.setState({
            list: this.state.list.concat(newItem),
        });
    }
}

export default Body;
