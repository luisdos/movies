import React, { Component } from 'react'
import deleteMovie from '../../services/deleteMovie'
import watchMovie from '../../services/watchMovie'

class DeleteMovie extends Component {
    state = {
        movieData: ''
    }

    componentDidMount() {
        watchMovie(this.props.match.params.id).then(resp => {
            this.setState({
                movieData: resp.data.data.singleMovies
            })
        })
    }

    deleteMovie = () => {
        deleteMovie(this.props.match.params.id).then(resp => {
            this.props.history.push('/movies')
        }).catch(err => console.log(err))
    }

    goBack = () => this.props.history.push('/movie/' + this.props.match.params.id)

    renderOptions() {
        const { name, image } = this.state.movieData

        if(!this.state.movieData) {
            return (
                <div>
                    Loading
                </div>
            )
        } else {
            return (
                <div className="jumbotron">
                    Are you sure you want to delete the movie <strong>{name}</strong>
                    <button className="btn btn-danger" onClick={this.deleteMovie}>
                        YES
                    </button>
                    <button className="btn btn-danger" onClick={this.goBack}>
                        NO
                    </button>
                    <img src={image} alt="poster" />
                </div>
            )
        }
    }

    render() {
        return(
            <div>
                { this.renderOptions() }
            </div>
        )
    }
}