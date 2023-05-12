import axios from 'axios';
import getToken from '../resolvers/getToken';
import constants from '../const';

export default(data) => {
    let newMovie = `{
        name: "${data.name}",
        director: "${data.director}",
        year: ${data.year},
        duration: "2h",
        language: "English",
        rating: "${data.rating}",
        genre: "${data.genre}",
        plot: "${data.plot}",
        url: "${data.url}",
        image: "${data.image}",
    }`

    return axios({
        url: constants.url + "graphql",
        method: "post",
        data: {
            query: `
                mutation {
                    addMovie(data:${newMovie}) {
                        _id,
                        name
                    }
                }
            `
        }, headers: { 'Authorization': `JWT ${getToken()}` }
    })
}