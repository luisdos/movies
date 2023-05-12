import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import singleUser from '../../services/singleUser';

class Profile extends Component {
    state = {
        userData: ''
    }

    componentDidMount() {
        singleUser(this.props.match.params.id).then(resp => {
            console.log(resp.data.data.singleUsers)
            this.setState({userData: resp.data.data.singleUsers})
        }).catch(err => {
            console.log(err)
        })
    }

    loadUserData() {
        let { name, lastName, email } = this.state.userData;
        
        if(this.state.userData === '') {
            return (
                <div>Loading your info...</div>
            )
        } else {
            return (
                <div>
                    <h1>This is your profile</h1>
                    <h2>Name: <strong>{name}</strong></h2>
                    <h2>Last Name: <strong>{lastName}</strong></h2>
                    <h2>Email: <strong>{email}</strong></h2>
                    <Link to={`/profile/edit/${this.props.match.params.id}`}>Edit Profile</Link>
                </div>
            )
        }
    }

    render() {
        return (
            this.loadUserData()
        )
    }
}

export default Profile;