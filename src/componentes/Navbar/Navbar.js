import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavbarLink from './NavbarLink';
import getToken from '../../resolvers/getToken';
import payload from '../../resolvers/payload';

class Navbar extends Component {
    
    chargeProfile = () => {
        const token = getToken()
        if(token !== null) {
            let payLoad = payload(token)
            return (
                <ul className="navbar-nav mr-auto">
                    <li>
                        <Link className="nav-link" to={`/profile/${payLoad.id}`}> Welcome { payLoad.email }</Link>
                    </li>
                    <NavbarLink to='/home' title='Home' />
                    <NavbarLink to='/logout' title='Logout' />
                    <NavbarLink to='/movies' title='Movies' />
                    <NavbarLink to='/addmovie' title='Add movie' />
                </ul>
            )
        } else {
            return (
                <ul className="navbar-nav mr-auto">
                    <NavbarLink to='/signup' title='Signup' />
                    <NavbarLink to='/login' title='Login' />
                </ul>
            )
        }
    }
    
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
    
                    { this.chargeProfile() }
                    
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        )
    }
}

export default Navbar;