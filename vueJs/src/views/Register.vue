<template>
    <div id="register" class="container-fluid p-0">
        <vue-headful :title="title"/>
        <div class="row p-0 m-0 ">
            <div class="row r-r1 crow p-5 d-flex sticky-top flex-row m-0 w-100 text-light">
                <div class="col-12 my-0  mx-auto">
                    <Nav />
                </div>
                <div class="col-12 mx-auto mt-0 text-center">                
                    <h1 class="display-1"> Register </h1>
                </div>
            </div>
            <div class="row crow r-r2 m-0 sticky-top w-100 d-flex flex-row"> 
                <div class="p-5 col-12">
                    <div class="col-8 m-auto border rounded p-5 shadow-lg">
                        <form @submit.prevent="owner()" class="text-light">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" name="name" id="name" class="form-control " v-model="name" placeholder="Enter Name" required aria-describedby="nameSmall">
                                <small id="emailSmall" class="text-light">Enter Name here</small>
                            </div>
                            <div class="form-group">
                                <label for="email">E-Mail</label>
                                <input type="email" name="email" id="email" class="form-control " v-model="email" placeholder="Enter E-Mail" required aria-describedby="emailSmall">
                                <small id="emailSmall" class="text-light">Enter E-Mail here</small>
                            </div>
                            <div class="form-group">
                                <label for="username">Gender</label>
                                <select name="gender" class="form-control" v-model="gender">
                                    <option class="form-control" value="disabled" disabled selected> Choose One </option>
                                    <option class="form-control" value="male"> Male </option>
                                    <option class="form-control" value="female"> Female </option>
                                    <option class="form-control" value="other"> Other </option>
                                </select>
                            </div>
                            <div class="form-group">
                              <label for="dOb">Date of Birth</label>
                              <input type="date" name="dOb" id="dOb" class="form-control" v-model="dOb" placeholder="Choose Date of Birth" aria-describedby="helpId">
                              <!-- <small id="helpId" class="text-muted">Help text</small> -->
                            </div>
                            <div class="form-group">
                                <label for="password"> Password </label>
                                <input type="password" class="form-control " name="password" v-model="password" id="password" minlength="6" required placeholder="******">
                                <small id="emailSmall" class="text-light">Enter Password here</small>
                            </div>
                            <button v-if="loader" type="submit" class="btn btn-primary btn-block">Register</button>
                            <button v-if="loading" type="button" disabled class="btn btn-primary btn-block"> <div class="spinner-border text-light"></div> </button>
                            <button v-if="loadErr" type="button" disabled class="btn btn-danger btn-block">Error</button>
                            <button v-if="loadingDone" type="button" class="btn btn-success btn-block">Registered!</button>
                            <button type="reset" class="btn btn-dark btn-block">Reset</button>
                            <span v-if="error"> 
                                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        <span class="sr-only">Close</span>
                                    </button>
                                    <strong>Error!</strong> {{error}}
                                </div>
                            </span>
                        </form>
                    </div>
                </div>
                <div class="col-12 p-0 m-0">
                    <Footer />
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import services from '../api/services'

export default {
    name: 'Login',
    components: {
        Nav,
        Footer
    },
    data() {
        return {
            title: 'Register',
            name: '',
            dOb: '',
            email: '',
            password: '',
            gender: '',
            error: null,
            loading: false,
            loadErr: false,
            loadingDone: false,
            loader: true
        }
    },

    methods: {

        owner() {

            this.loader = false;
            this.loading = true;

            let ownerData = {
                'name': this.name,
                'dOb': this.dOb,
                'email': this.email,
                'password': this.password,
                'gender': this.gender
            }

            services.register(ownerData)
            .then(res => {

                // console.log("here")
                // console.log(res)

                if(res.data.status === 200)
                {
                    this.loading = false
                    this.loadingDone = true

                    setTimeout(() => {
                        return this.$router.push('/login')
                    }, 2500)
                }
                else if(res.data.status == 302)
                {

                    this.loading = false
                    this.loadErr = true
                    this.error = " Member Already Exists! "

                }
                else if(res.data.status == 406)
                {
                    this.loading = false
                    this.loadErr = true
                    this.error = " Details Missing! "
                }
                else if(res.data.status == 400)
                {
                    this.loading = false
                    this.loadErr = true
                    this.error = " Error in DB! "
                }

                setTimeout(() => {
                    this.loadErr = false
                    this.loader = true
                    this.error = null
                }, 2500)

            }).catch(err => {

                console.log(err)
                console.log("not here")

                if(err)
                {
                    this.loading = false;
                    this.loadErr = true
                    this.error = err;
                    
                    setTimeout(() => {

                        this.error = null
                        this.loadErr = false
                        this.loader = true

                    }, 2500)
                }

            })

        }

    }
}
</script>

<style>

</style>