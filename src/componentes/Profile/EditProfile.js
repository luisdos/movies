import React, { Component } from 'react'
import singleUser from '../../services/singleUser';
import updateUser from '../../services/updateUser';

class EditProfile extends Component {
    state = {
        userData: '',
        name: '',
        lastName: '',
        email: ''
    }

    componentDidMount() {
        singleUser(this.props.match.params.id).then(resp => {
            console.log(resp.data.data.singleUsers)
            this.setState({userData: resp.data.data.singleUsers})
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

    hanldeSubmit = (e) => {
        e.preventDefault()
        updateUser(this.props.match.params.id, this.state).then(resp => {
            console.log(resp.data.data)
            this.props.history.push(`/profile/${this.props.match.params.id}`)
        })
    }

    chargeData() {
        if(this.state.userDara === '') {
            return (
                <div>Loading</div>
            )
        } else {
            return (
                <div>
                    <form onSubmit={this.hanldeSubmit}>
                        <input type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChangeInput}
                            placeholder={this.state.userData.name}
                        />
                        <input type="text"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.onChangeInput}
                            placeholder={this.state.userData.lastName}
                        />
                        <input type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChangeInput}
                            placeholder={this.state.userData.email}
                        />
                        <button type="submit" className="btn btn-info">Update</button>
                    </form>
                </div>
            )
        }
    }

    render() {
        return(
            <div>
                Edit Profile
                { this.chargeData() }
            </div>
        )
    }
}

export default EditProfile;