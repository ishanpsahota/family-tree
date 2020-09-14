
import axios from 'axios'

let url = `http://localhost:${process.env.PORT}`;

function getUrl()
{
    return urls = {
        'login': url + '/login'
    }
}


export default {
    login(loginData) {

        if(!loginData.email || !loginData.password) return
        else
        {
            return new Promise((resolve, reject) =>
            {
                axios.post(this.urls().login, loginData)
                .then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })  
            })
        }
    }   
}