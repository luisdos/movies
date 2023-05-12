import React, { Component } from 'react'
import allMovies from '../../services/allMovies'
import addRank from '../../services/addRank'

import './Movies.css'
import CardMovie from '../CardMovie/CardMovie';

class Movies extends Component {
    state = {
        movies: ''
    }

    componentDidMount() {
        allMovies().then(resp => {
            console.log(resp)
            this.setState({ movies: resp.data.data.allMovies })
            console.log(this.state.movies)

        }).catch(err => {
            console.log(err)
        })
    }

    redirect = (id) => {
        this.props.history.push(`/movie/${id}`)
    }

    getRankValue = (id, rank) => {
        addRank({ id, rank }).then(resp => {
            alert("wujuu|")
            console.log(resp)
        }).catch(err => {
            console.log(err)
        })
    }

    renderMovies = () => {
        if (this.state.movies !== '') {
            let movies = this.state.movies.map((movie, index) => {
                return (
                    <CardMovie key={index}
                        movie={movie}
                        redirect={this.redirect}
                        getRank={this.getRankValue} />
                )
            })

            return movies
        } else {
            return <div><h1>Loading</h1></div>
        }
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-sm-12 text-center">
                    <h3>
                        All movies
                    </h3>
                </div>
                <div className="col-sm-12 text-center">
                    {this.renderMovies()}
                </div>
            </div>
        )
    }
}

export default Movies