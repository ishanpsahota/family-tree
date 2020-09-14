<template>
    <div id="home" class="container-fluid p-0">
        <vue-headful :title="title"/>
        <div class="crow row h-r1 w-100 p-0 m-0 d-flex flex-row">
            <div class="col-12 my-0  mx-auto">
                <Nav />
            </div>
            <div class="col-12 m-auto text-center text-light">
                <h1 class="display-1 "> Family Tree </h1>
                <h2> <small> <a class="text-warning" href="/login"> Login </a> or <a class="text-warning" href="/register"> Register</a> </small> </h2>
            </div>
        </div>
        <div class="crow row h-r2 w-100 p-0 m-0 d-flex flex-row">
            <div class="col-12 m-auto text-center text-light">
                <h2>By <a class="text-light display-4" href="https://instagram.com/ishanpsahota"> Ishan Prasad </a></h2>
            </div>
        </div>
        <div class="crow row h-r3 w-100 p-0 m-0">
            <div class="col-12 m-auto text-center text-light">
                <h2> Check out my <a class="text-warning" href="https://github.com/ishanpsahota"> github</a>.  <small> It's empty though. </small> </h2>
            </div>
        </div>
    </div>
</template>

<script>

import Nav from '../components/Nav'

export default {
    name:'Home',
    components: {
        Nav
    },
    data() {
        return {
            title: 'Home'
        }
    }
}
</script>

<style>

</style>