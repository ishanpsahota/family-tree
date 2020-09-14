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
                        <form @submit.prevent="register()" class="text-light">
                            <div class="form-group">
                            <label for="email">E-Mail</label>
                            <input type="email" name="email" id="email" class="form-control " placeholder="Enter E-Mail" required aria-describedby="emailSmall">
                            <small id="emailSmall" class="text-light">Enter E-Mail here</small>
                            </div>
                            <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" name="username" id="username" class="form-control " placeholder="Enter Username" required aria-describedby="emailSmall">
                            <small id="emailSmall" class="text-light">Enter Username here</small>
                            </div>
                            <div class="form-group">
                            <label for="password"> Password </label>
                            <input type="password" class="form-control " name="password" id="password" minlength="6" required placeholder="******">
                            <small id="emailSmall" class="text-light">Enter Password here</small>
                            </div>
                            <button type="submit" class="btn btn-success btn-block">Register</button>
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

export default {
    name: 'Login',
    components: {
        Nav,
        Footer
    },
    data() {
        return {
            title: 'Login'
        }
    }
}
</script>

<style>

</style>