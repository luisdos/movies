import axios from 'axios';
import getToken from '../resolvers/getToken';
import constantes from '../const';

export default (id) => {
    return axios({
        url: constantes.url + 'graphql',
        method: 'post',
        data: {
            query: `
                query{
                    singleMovie(id:"${id}") {
                        _id,
                        name,
                        image,
                        plot,
                        director,
                        duration,
                        genre {
                            name
                        },
                        rating {
                            name
                        },
                        year,
                        rank
                    }
                }
            `
        }, headers: { 'Authorization': `JWT ${getToken()}` }
    })
}