import axios from 'axios';
import getToken from '../resolvers/getToken';
import constant from '../const';
export default (id) => {
    return axios({
        url: constant.url + 'graphql',
        method: 'post',
        data: {
            query: `
                query{
                    singleUsers(id:"${id}") {
                        _id,
                        name,
                        lastName,
                        email
                    }
                }
            `
        }, headers: { 'Authorization': `JWT ${getToken()}` }
    })
}