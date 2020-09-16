<template>
  <div id="newTree" class="container-fluid p-0 m-0">
        <vue-headful :title="title" />
        <div class="row crow nt-r1 d-flex flex-row p-0 m-0 w-100">
            <div class="col-12 mt-0 mx-auto">
                <Nav />
            </div>
            <div class="col-12 mt-0 mx-auto text-center text-light">
                <h1 class="display-1"> New Tree </h1>   
            </div>
        </div>
        <div class="row chart-row bg-light sticky-top nt-r2 p-5 m-0 w-100">
            <h1 class="display-4"> New Tree </h1>
            <div class="col-12 h-100">
                <div class="form-group w-50">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="treeTitle">Tree title </span>
                        </div>
                        <input type="text" class="form-control" name="treeTitle" v-model="treeTitle" placeholder="Enter name here" aria-label="treeTitle" aria-describedby="treeTitle">
                        <div class="input-group-append">
                            <button class="btn btn-primary" type="button"> Save! </button>
                        </div>
                    </div>
                </div>
                <form @submit.prevent="addMember()">
                    <div class="card p-2 w-50 shadow">
                        <div class="card-body">
                            <strong> Add Member </strong>
                            <div class="form-group my-2">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="name">Member Name </span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Enter name here" aria-label="name" aria-describedby="name">
                                </div>
                            </div>
                            <div class="form-group ">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="dOb">Member Date of Birth </span>
                                    </div>
                                    <input type="date" class="form-control"  aria-label="dOb" aria-describedby="dOb">
                                </div>
                            </div>
                            <div class="form-group m-0">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="email">@ </span>
                                    </div>
                                    <input type="email" class="form-control" placeholder="Enter E-Mail for the member" aria-label="email" aria-describedby="email">
                                </div>
                            </div>
                            <div class="form-group m-0">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="email">Relationship </span>
                                    </div>
                                    <select class="form-control" name="relationship">
                                        <option value="none" disabled selected> Choose one </option>
                                        <option value="father" :disabled=this.getFather() > Father </option>
                                        <option value="mother" > Mother </option>
                                        <option value="sister" > Sister </option>
                                        <option value="brother" > Brother </option>
                                        <option value="spouse" > Spouse </option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">Add Member </button>
                        </div>
                    </div>
                </form>
                <Chart />
            </div>
        </div>
        <Footer />
  </div>
</template>

<script>

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Chart from '../components/Chart';

export default {

    name: 'NewTree',
    components: {
        Nav, 
        Footer,
        Chart
    },
    data() {
        return {
            title: "New Tree",
            treeTitle: '',
            name: '',
            email: '',
            relationship: '',
            dOb: ''
        }
    },
    methods: {

        getFather() {

        },

        addMember() {

        }

    }

}
</script>

<style>

</style>