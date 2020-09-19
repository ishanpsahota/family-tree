import axios from 'axios'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'http://localhost:8080';

var url = `http://localhost:8081`
// var url = 'https://family-tree-i.herokuapp.com'

var urls = { 

    'register': url + '/register',
    'owner': url + '/owner',
    'newTree': url + '/new',
    'getTrees': url + '/trees/',
    'viewTrees': url + '/viewtree/',
    'getAllMembers': url + '/members/',
    'url': url,
    'correctHierarchy': url + '/hierarchy/'
}


export default {

    getUrl() {

        return urls
    
    },

    addMember(data) {

        return new Promise((resolve, reject) => {

            axios.post( this.getUrl().register, data)
            .then(res => {

                if(res.status === 200)
                {
                    resolve(res)
                }

            }).catch(err => {

                reject(err)

            })

        })

    },

    register(data) {

        return new Promise((resolve, reject) => {

            axios.post( this.getUrl().owner, data)
            .then(res => {

                // console.log(res)

                if(res.status === 200)
                {
                    resolve(res)
                }

            }).catch(err => {

                // console.log(err)
                reject(err)

            })

        })

    },
    
    newTree(data) {

        return new Promise((resolve, reject) => {

            axios.post( this.getUrl().newTree, data )
            .then(res => {

                if(res.status === 200) resolve(res)

            }).catch(err => {

                reject(err)

            })

        })

    },

    getTrees(id) {

        if(!id) return

        return new Promise((resolve, reject) => {

            axios.get( this.getUrl().getTrees + id )
            .then(res => {

                resolve(res)

            }).catch(err => {
                
                reject(err)

            })

        })
    },

    viewTree(id) {

        if(!id) return

        return new Promise((resolve, reject) => {

            axios.get( this.getUrl().viewTrees + id )
            .then(res => {

                resolve(res)

            }).catch(err => {
                
                reject(err)

            })

        })

    },

    getAllMembers(id, treeid) {

        if(!id || !treeid) return

        return new Promise((resolve, reject) => {

            axios.get(this.getUrl().getAllMembers + id + '/' + treeid)
            .then(res => {
                // console.log(res.data.)
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })

        })
    },

    correctHierarchy(id, treeid) {

        if(!id || !treeid) return
        else
            return new Promise((resolve, reject) => {

                axios.get(this.getUrl().correctHierarchy + id + '/' + treeid)
                .then(res => {

                    resolve(res)

                }).catch(err => {

                    reject(err)

                })

            })

    }
    

}