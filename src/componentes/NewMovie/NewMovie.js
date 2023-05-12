import React, { Component } from 'react'
import allGenres from '../../services/allGenres'
import allRaitings from '../../services/allRaitings'
import addMovie from '../../services/addMovie'
import Firebase from '../../firebase'
import FileUploader from 'react-firebase-file-uploader'

class NewMovie extends Component {
    state = {
        name: '',
        plot: '',
        director: '',
        year: 0,
        url: '',
        image: '',
        genre: '',
        rating: '',
        duration: 0,
        language: '',
        allGenres: '',
        allRaitings: ''
    }

    componentDidMount() {
        allGenres().then(resp => {
            this.setState({
                allGenres: resp.data.data.allGenres
            })
        })

        allRaitings().then(resp => {
            this.setState({
                allRaitings: resp.data.data.allRatings
            })
        }).catch(err => {
            console.log(err)
        })
    }

    onChangeInput = (e) => {
        let name = e.target.name
        let value = e.target.value

        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => { 
        e.preventDefault()
        addMovie(this.state).then(resp => {
            console.log(resp.data.data);
            this.props.history.push('/movies')
            
        })
    }

    handleUploadSuccess = (filename) => {
        Firebase.storage().ref('images').child(filename)
        .getDownloadURL().then(url => {
            this.setState({image:url})
            console.log(url);
            
        })
    }

    createSelector = (data, name) => {
        let options = data.map(option => {
            return (
                <option key={option._id} value={option._id}>{option.name}</option>
            )
        })

        return(
            <select 
                name={name} 
                id={name} 
                value={this.state[name]}
                onChange={this.onChangeInput}
                className="form-control"
            >
                <option value="" selected> -------------- </option>
                {options}
            </select>
        )
    }

    loadForm = () => {
        if(this.state.allGenres !== '' && this.state.allRaitings !== '') {
            return (
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>

                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            value={this.state.name}
                            className='form-control'
                            name='name'
                            onChange={this.onChangeInput}
                        />

                    </div>

                    <div className='form-group'>

                        <label htmlFor="plot">Plot:</label>
                        <textarea
                            type="text"
                            value={this.state.plot}
                            className='form-control'
                            name='plot'
                            onChange={this.onChangeInput}
                            cols='30' row='10'
                        ></textarea>

                    </div>

                    <div className='form-group'>

                        <label htmlFor="url">URL:</label>
                        <input
                            type="text"
                            value={this.state.url}
                            className='form-control'
                            name='url'
                            onChange={this.onChangeInput}
                        />

                    </div>

                    <div className='form-group'>

                        <label htmlFor="director">Director:</label>
                        <input
                            type="text"
                            value={this.state.director}
                            className='form-control'
                            name='director'
                            onChange={this.onChangeInput}
                        />

                    </div>

                    <div className='form-group'>

                        <label htmlFor="year">Year:</label>
                        <input
                            type="number"
                            value={this.state.year}
                            className='form-control'
                            name='year'
                            onChange={this.onChangeInput}
                        />

                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Add poster</label>
                        <FileUploader
                            accept="image/*"
                            randomizeFilename
                            storageRef={Firebase.storage().ref('images')}
                            onUploadError={error => console.log(error)}
                            onUploadSuccess={this.handleUploadSuccess}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="genre">Genre: </label>
                        {this.createSelector(this.state.allGenres, "genre")}
                    </div>

                    <div className="form-group">
                        <label htmlFor="genre">Rating: </label>
                        {this.createSelector(this.state.allRaitings, "raiting")}
                    </div>

                    <button type="submit">Save</button>
                </form>
            )
        }
    }

    render() {
        return (
            <div>
                {this.loadForm()}
            </div>
        )
    }


}

export default NewMovie;