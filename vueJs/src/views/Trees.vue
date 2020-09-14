<template>
  <div id="trees" class="container-fluid p-0 m-0"> 
      <vue-headful :title="title"/>
    <div class="row crow t-r1 p-0 m-0 w-100 d-flex flex-row">
        <div class="col-12 my-0  mx-auto">
                <Nav />
            </div>
        <div class="col-12 p-5 mx-auto mt-0 text-center  text-light">
            <h1 class="display-1"> Trees </h1>
        </div>
    </div>
    <div class="crow row p-5 m-0 bg-light">
        <h1 class="display-4"> Your <i class="fa fa-tree" aria-hidden="true"></i> </h1>
        <div class="col-12">
            
            <div class="card-columns">
                <div class="card text-dark bg-white shadow">
                    <!-- <img class="card-img-top" src="holder.js/100px180/" alt=""> -->
                    <div class="card-body text-center" >
                        <button type="button" @click="newTree()" class="btn btn-white">
                            <h1 class="card-title display-1"> + </h1>
                            <p class="card-text"> New Tree </p>
                        </button>
                    </div>
                </div>
            </div>                        
        </div>
    </div>
  </div>
</template>

<script>

import Nav from '../components/Nav'

export default {
    name: 'Trees',
    components: {
        Nav
    },
    data() {
        return {
            title: 'Trees'
        }
    }
}
</script>

<style>
    .card:hover {
        border: 0.35rem solid teal;
        transition: 0.75s ease;
    }
</style>