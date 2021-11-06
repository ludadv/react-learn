import React from 'react';

class Card extends React.Component {
    render() {
        return (
            <div className="card">
                { this.props.title && <div class="card-title">{this.props.title}</div> }
                { this.props.src && <img src={this.props.src} alt=""/> }
            </div>
        )
    }
}

export default Card;
