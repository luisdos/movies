import axios from 'axios';
import getToken from '../resolvers/getToken';
import constants from '../const';

export default () => {
    return axios({
        url: constants.url + 'graphql',
        method: 'post',
        data: {
            query: `
                query {
                    allMovies {
                        _id,
                        name,
                        year,
                        director,
                        rank,
                        plot, 
                        image
                    }
                }
            `
        }, headers: { 'Authorization': `JWT ${getToken()}` }
    })
}