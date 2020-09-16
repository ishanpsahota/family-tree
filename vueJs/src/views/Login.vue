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
                      <input type="password" v-model="password" class="form-control bg-transparent text-light border-light" name="password" id="password" minlength="6" required placeholder="******">
                      <small id="emailSmall" class="text-light">Enter Password here</small>
                    </div>
                    <button type="submit" class="btn btn-light btn-lg btn-block">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import Nav from '../components/Nav'

export default {
    name: 'Login',
    components: {
        Nav
    },
    data() {
        return {
            title: 'Login',
            email: '',
            password: 's'
        }
    },

    methods: {

        login: function () {
            this.loading = true;
            let email = this.email
            let password = this.password
            this.$store.dispatch('login', { email, password })
            .then(() => {
                this.loading = false; 
                this.$router.push('/trees')
            })
            .catch(err => {
                this.loading = false;    
                this.msg = err;
                
            })
        }

    }
}
</script>

<style>

</style>