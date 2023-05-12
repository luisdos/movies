import axios from 'axios'
import constantes from '../const'
import getToken from '../resolvers/getToken'

export default (id, data) => {
    let { name, lastName, email } = data;
    let DataQuery = `{ name: "${name}", email: "${email}", lastName: "${lastName}" }`

    return axios({
        url: constantes.url + 'graphql',
        method: 'post',
        data: {
            query: `
                mutation {
                    updateUser(id: "${id}", data: ${DataQuery}) {
                        _id,
                        name,
                        email
                    }
                }
            `
        }, headers: { 'Authorization': `JWT ${getToken()}` }
    })
}