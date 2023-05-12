import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from '../componentes/Home/Home';
import Navbar from '../componentes/Navbar/Navbar';
import Login from '../componentes/Login/Login';
import Privado from '../componentes/Private/Privado';
import checkToken from '../resolvers/checkToken';
import Logout from '../componentes/Logout/Logout';
import Profile from '../componentes/Profile/Profile';
import EditProfile from '../componentes/Profile/EditProfile';
import Signup from '../componentes/Signup/Signup';
import Movies from '../componentes/Movies/Movies';
import Movie from '../componentes/Movie/Movie';
import watchMovie from '../componentes/WatchMovie/WatchMovie';
import NewMovie from '../componentes/NewMovie/NewMovie';


class Routes extends Component {
    render() {
        const PrivateRoute = ({component: Component, ...rest}) => (
            <Route {...rest} render={(props) => (
                checkToken() === true ?  <Component {...props} /> :
                <Redirect to='/home' />
            )} />
        )
        return (
            <Router>
                <main>
                    <Navbar />
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/logout' component={Logout} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <PrivateRoute exact path='/profile/:id' component={Profile} />
                    <PrivateRoute exact path='/profile/edit/:id' component={EditProfile} />
                    <PrivateRoute exact path='/movies' component={Movies} />
                    <PrivateRoute exact path='/movie/:id' component={Movie} />
                    <PrivateRoute exact path='/watch/:id' component={watchMovie} />
                    <PrivateRoute exact path='/addmovie' component={NewMovie} />
                </main>
            </Router>
        )
    }
}

export default Routes;