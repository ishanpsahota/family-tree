<template>
    <div id="login" class="container-fluid p-0">
        <vue-headful :title="title"/>
        <div class="row l-r1 crow p-5 d-flex flex-row m-0 w-100 text-light">
            <div class="col-12 my-0  mx-auto">
                <Nav />
            </div>
            <div class="col-12 mx-auto mt-0 text-center">                
                <h1 class="display-1"> Login </h1>
            </div>
        </div>
        <div class="row crow l-r2 p-0 m-0 d-flex flex-row"> 
            <div class="col-6 m-auto border rounded p-5 shadow-lg">
                <form @submit.prevent="login()" class="text-light">
                    <div class="form-group">
                      <label for="email">E-Mail</label>
                      <input type="email" name="email" id="email" v-model="email" class="form-control bg-transparent text-light border-light" placeholder="Enter E-Mail" required aria-describedby="emailSmall">
                      <small id="emailSmall" class="text-light">Enter E-Mail here</small>
                    </div>
                    <div class="form-group">
                      <label for="password"> Password </label>
                      <input type="password" v-model="password" class="form-control bg-transparent text-light border-light" name="password" id="password" minlength="6" required >
                      <small id="emailSmall" class="text-light">Enter Password here</small>
                    </div>
                    
                    <!-- Modal -->
                    <div class="modal fade text-dark" id="loginCred" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title"> Login Credentials </h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                </div>
                                <div class="modal-body">
                                    <ul class="list-group">
                                        <li class="list-group-item active"> Let's say </li>
                                        <li class="list-group-item">Your name: <code> <kbd> Jim Halpert </kbd> </code> </li>
                                        <li class="list-group-item ">Your E-Mail: <code> <kbd> jimhalpert@dundermifflin.com </kbd>  </code> </li>
                                        <li class="list-group-item ">Your Date of Birth: <code> <kbd> March 11, 1985 (11-03-1985) </kbd>  </code> </li>
                                        <li class="list-group-item "> <strong> So, your login credentials would be: </strong>
                                            <ul class="list-group">
                                                <li class="list-group-item"> Your email, e.g. <code> <kbd> jimhalpert@dundermifflin.com </kbd>  </code> </li>
                                                <li class="list-group-item"> Your password: <em> Your first name + Your birth year </em>, e.g. <code> <kbd> jim1985 </kbd>  </code> </li>
                                            </ul> 
                                        </li>
                                    </ul>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <!-- <button type="button" class="btn btn-primary">Save</button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button v-if="loading" type="button" disabled class="btn btn-primary btn-block"> <div class="spinner-border text-light"></div> </button>
                    <button v-if="loginError" type="button" disabled class="btn btn-danger btn-block">Error</button>
                    <button v-if="loggedIn" type="button" class="btn btn-success btn-block">Login Successful!</button>
                    <button v-if="loginNow" type="submit" class="btn my-3 btn-light btn-lg btn-block">Login</button>
                    <!-- Button trigger modal -->
                    <span class="mt-5"> Already registered as a family member? Click  <a href="#loginCred" class="text-light h5" data-toggle="modal" > here </a> to know the credentials </span>
                    <div v-if="loginError" class="alert alert-primary alert-dismissible fade show" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <strong>Error!</strong> {{msg}}
                    </div>
                </form>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>

import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default {
    name: 'Login',
    components: {
        Nav,
        Footer
    },
    data() {
        return {
            title: 'Login',
            email: '',
            password: '',
            loading: false,
            loginNow: true,
            loggedIn: false,
            loginError: false,
            msg: ''
        }
    },

    methods: {

        login: function () {
            
            this.loginNow = false
            this.loading = true;
            let email = this.email
            let password = this.password
            this.$store.dispatch('login', { email, password })
            .then(() => {
                this.loading = false; 
                this.loggedIn = true
                setTimeout(() => {
                    this.$router.push('/trees')
                }, 1500)
            })
            .catch(err => {
                this.loading = false;    
                this.loginError = true                

                if(err.data.status == 400) this.msg = "Not Found or Invalid details"
                if(err.data.status == 500) this.msg = "Internal Server Error"

                // this.msg = err.data;
                
            })
        }

    }
}
</script>

<style>

</style>