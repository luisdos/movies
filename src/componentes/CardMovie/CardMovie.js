import React, { Component } from 'react'
import calculateRank from './calculateRank';
import Rate from 'rc-rate';

class CardMovie extends Component {
    state = {
        movie: this.props.movie,
        rank: calculateRank(this.props.movie.rank)
    }

    render() {
        return (
            <div>
                <div className="card">
                    <h5 className="card-title">
                        {this.state.movie.name}
                    </h5>
                    <img src={this.state.movie.image}
                        className="card-img-top"
                        alt=""
                        onClick={() => this.props.redirect(this.state.movie._id)}
                    />
                    <div className="card-body">
                        <Rate
                            defaultValue={parseFloat(this.state.rank)}
                            allowHalf
                            onChange={(rank) => this.props.getRank(this.state.movie._id, rank)}
                        />
                        <p>{this.state.rank}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default CardMovie;