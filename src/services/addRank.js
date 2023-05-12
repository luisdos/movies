import axios from 'axios';
import getToken from '../resolvers/getToken';
import constants from '../const';

export default (data) => {
    let { id, rank } = data
    let newRank = `{ rank: ${rank} }`
    
    return axios({
        url: constants.url + 'graphql',
        method: 'post',
        data: {
            query: `
                mutation{
                    addRank(id:"${id}", data:${newRank}) {
                        _id,
                        name,
                        rank
                    }
                }
            `
        }, headers: { 'Authorization': `JWT ${getToken()}` }
    })
}