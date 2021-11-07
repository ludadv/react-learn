import React from 'react';

class Card extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card-btn" onClick={event => this.props.onClose(event)}>&#10006;</div>
                { this.props.title && <div className="card-title">{this.props.title}</div> }
                { this.props.src && <img src={this.props.src} alt=""/> }
            </div>
        )
    }
}

export default Card;


// const onClose = function (event) {
//     console.log('REMOVE');
// }

// const onClose = (event) => console.log('REMOVE');


// onClose();
