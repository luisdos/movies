import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import watchMovie from '../../services/watchMovie';
import YouTube from 'react-youtube';

export default class WatchMovie extends Component {
    state = {
        movieData: ''
    }

    componentDidMount() {
        watchMovie(this.props.match.params.id).then(resp => {
            console.log(resp);
            this.setState({
                movieData: resp.data.data.singleMovie
            })

        }).catch(err => {
            console.log(err);

        })

    }

    YouTubeParser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    loadMovie() {
        if (!this.state.movieData) {
            return (
                <div>Loading...</div>
            )
        } else {
            const playerOptions = {
                height: '390',
                width: '640',
                playerVars: { // https://developers.google.com/youtube/player_parameters
                    autoplay: 1
                }
            };

            let url = this.YouTubeParser(this.state.movieData.url)
            return (
                <div>
                    <div>
                        You are watching <strong>{this.state.movieData.name}</strong>
                    </div>

                    <YouTube videoId={url} opts={playerOptions} />
                    
                    <Link className="btn btn-info" to={`/movie/${this.state.movieData._id}`}>
                        Go back
                </Link>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                { this.loadMovie() }
            </div>
        )
    }
}












