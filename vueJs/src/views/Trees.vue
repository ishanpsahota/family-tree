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
                    <div v-if="addNewDiv" class="card-body text-center" >
                        <button type="button" @click="toggleDiv()" class="btn btn-white">
                            <h1 class="card-title display-1"> + </h1>
                            <p class="card-text"> New Tree </p>
                        </button>
                    </div>
                    <div v-if="showNewDiv" class="card-body">
                        <form @submit.prevent="newTree()">
                            <div class="form-group">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="treeTitle">Tree title </span>
                                    </div>
                                    <input type="text" class="form-control" name="treeTitle" v-model="treeTitle" placeholder="Enter name here" aria-label="treeTitle" aria-describedby="treeTitle">                               
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="treeTitle">Owner </span>
                                    </div>
                                    <input type="text" disabled :value=this.getOwner().name class="form-control" name="name" placeholder="Enter name here" aria-label="name" aria-describedby="name">                               
                                </div>
                            </div>
                            <button type="submit" v-if="treeAdd" class="btn btn-primary m-1">Submit</button>
                            <button type="button" v-if="treeAdding" class="btn btn-primary m-1"> <div class="spinner-border text-light"></div> </button>
                            <button type="button" v-if="treeAdded" class="btn btn-success m-1">Created!</button>
                            <button type="button" v-if="treeAddErr" class="btn btn-danger m-1">Error!</button>
                            <button type="reset" @click="toggleDiv()" class="btn btn-danger m-1">Cancel</button>
                            <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    <span class="sr-only">Close</span>
                                </button>
                                <strong>Error!</strong> {{error}}
                            </div>
                        </form>
                    </div>
                </div>
                <span v-if="gettingTrees">
                    <div class="spinner-border text-dark"></div>
                </span>
                <span v-if="getTreesErr">
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <strong>Error!</strong> Error Getting Trees
                    </div>
                </span>
                <div v-for="(tree, i) in trees" :key="i" class="card">
                    <div class="card-body">
                         <button type="button" @click="viewTree(tree.randomId)" class="btn bg-transparent"><h2 class=""> {{tree.name}} </h2></button> 
                    </div>
                </div>
            </div>                        
        </div>
    </div>
    <Footer />
  </div>
</template>

<script>

import Nav from '../components/Nav'
import services from '../api/services'
import CryptoJS from 'crypto-js'
import Footer from '../components/Footer'

export default {
    name: 'Trees',
    components: {
        Nav,
        Footer
    },
    data() {
        return {
            title: 'Trees',
            showNewDiv: false,
            addNewDiv: true,
            treeTitle: '',
            treeAdd: true,
            treeAdding: false,
            treeAddErr: false,
            treeAdded: false,
            error: '',
            trees: '',
            gettingTrees: false,
            getTreesErr: false
        }
    },

    methods: {

        toggleDiv() {
            this.addNewDiv = !this.addNewDiv
            this.showNewDiv = !this.showNewDiv
        },

        getOwner()
        {
            return { 
                'name': localStorage.getItem('name'),
                'id': localStorage.getItem('id')
            }
        },

        newTree() {

            this.treeAdd = false
            this.treeAdding = true

            var rid = CryptoJS.AES.encrypt(this.getOwner().id, 'ishanpsahota@m3ral@wda').toString();
            // rid = rid.replace(/\\|\//g,'')
            rid = rid.replace(/[^a-zA-Z0-9]/g,'')
            console.log(rid)

            var treeData = {
                name: this.treeTitle,
                randomId: rid,
                ownerId: localStorage.getItem('id'),
                members: [{
                    memberId: localStorage.getItem('id'),
                    relWithOwner: 'self',
                    parentId: null
                }]
            }

            services.newTree(treeData)
            .then(res => {

                if(res.status === 200)
                {
                    this.treeAdding = false
                    this.treeAdded = true

                    setTimeout(() => {
                        this.treeAdded = false
                        this.treeAdd = true
                        this.toggleDiv()
                        this.getTrees()
                    }, 3500)
                }
            }).catch(err => {

                if(err)
                {
                    this.treeAdding = false
                    this.treeAddErr = true

                    this.error = err;

                    setTimeout(() => {
                        this.treeAddErr = false
                        this.treeAdd = true
                    }, 3500)
                }

            })

        },

        getTrees() {

            this.gettingTrees = true;

            services.getTrees(this.getOwner().id)
            .then(res => {
                
                if(res.status === 200)
                {
                    this.gettingTrees = false
                    this.trees = res.data.trees
                }

            }).catch(err => {

                if(err)
                {
                    this.gettingTrees = false;
                    this.getTreesErr = true
                }

            })

        },

        viewTree(tree) {

            this.$router.push('/tree/' + tree)

        }

    },

    created() {
        this.getTrees();
    }
}
</script>

<style scoped>
    .card:hover {
        border: 0.25rem solid teal;
        transition: 0.25s linear;
    }
</style>