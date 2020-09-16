<template>
  <div id="viewTre" class="container-fluid p-0 m-0">
        <vue-headful :title="tree.name" />
        <div class="row crow nt-r1 d-flex flex-row p-0 m-0 w-100">
            <div class="col-12 mt-0 mx-auto">
                <Nav />
            </div>
            <div class="col-12 mt-0 mx-auto text-center text-light">
                <h1 class="display-1"> {{tree.name}} </h1>   
            </div>
        </div>
        <div class="row bg-light nt-r2 p-5 m-0 w-100">
            <h1 class="display-4"> Edit Tree </h1>
            <div class="col-12 ">
                <div class="card p-2 w-50 shadow">
                    <div class="card-body">
                        <strong> Add Member </strong>
                        <form @submit.prevent="addMember()">
                            <div class="form-group my-2">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="name">Member Name </span>
                                    </div>
                                    <input type="text" class="form-control" name="name" v-model="name" required placeholder="Enter name here" aria-label="name" aria-describedby="name">
                                </div>
                            </div>
                            <div class="form-group ">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="dOb">Member Date of Birth </span>
                                    </div>
                                    <input type="date" class="form-control" name="dOb" v-model="dOb" aria-label="dOb" required aria-describedby="dOb">
                                </div>
                            </div>
                            <div class="form-group m-0">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="email">@ </span>
                                    </div>
                                    <input type="email" class="form-control" required name="email" v-model="email" placeholder="Enter E-Mail for the member" aria-label="email" aria-describedby="email">
                                </div>
                            </div>
                            <!-- <div class="form-group m-0">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="gender">Alive </span>
                                    </div>
                                    <div class="form-check form-check-inline p-3">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" name="alive" id="alive" value="true" v-model="alive" required checked> 
                                        </label>
                                    </div>                                                    
                                </div>
                            </div> -->
                            <div class="form-group m-0">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="gender">Gender </span>
                                    </div>
                                    <select class="form-control" required v-model="gender" name="gender">
                                        <option class="form-control" value="disabled" disabled selected> Choose One </option>
                                        <option class="form-control" value="male"> Male </option>
                                        <option class="form-control" value="female"> Female </option>
                                        <option class="form-control" value="other"> Other </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group m-0">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="relationship">Relationship </span>
                                    </div>
                                    <select class="form-control" required v-model="relationship" name="relationship">
                                        <option value="none" disabled selected> Choose one </option>
                                        <option value="father" :disabled=this.getFather() > Father </option>
                                        <option value="mother" > Mother </option>
                                        <option value="sister" > Sister </option>
                                        <option value="brother" > Brother </option>
                                        <option value="spouse" > Spouse </option>
                                        <option value="son"> Son </option>
                                        <option value="daughter"> Daughter </option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" v-if="addMemberBtn" class="btn btn-primary">Add Member </button>
                            <button type="button" v-if="addingMember" class="btn btn-primary"> <div class="spinner-border text-light"></div> </button>
                            <button type="button" v-if="addedMember" class="btn btn-success">Added Member! </button>
                            <button type="button" v-if="addMemberErr" class="btn btn-danger">Error! </button>
                            <div v-if="addMemberErr" class="alert alert-danger alert-dismissible fade show" role="alert">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    <span class="sr-only">Close</span>
                                </button>
                                <strong>Error!</strong> {{error}}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="chart-row row p-2 bg-light m-0 w-100">
            <div v-if="tree" class="w-100 col-11 m-auto bg-white rounded shadow">   
                {{allMembers}}       
                <Chart />
            </div>
            <div v-if="treeGetErr || memberErr" class="col-12">
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <strong>Error Getting Tree/Members!</strong> {{error}}
                </div>
            </div>            
        </div>
        <Footer />
  </div>
</template>

<script>

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Chart from '../components/Chart';
// import CryptoJS from 'crypto-js'
import services from '../api/services'

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
            name: '',
            email: '',
            relationship: '',
            dOb: '',            
            tree: '',
            gender: '',
            treeGetErr: false,
            error: '',
            members: [],
            owner: {
                id: '',
                title: '',
                name: ''
            },
            memberErr: '',
            allMembers: '',
            addMemberBtn: true,
            addingMember: false,
            addMemberErr: false,
            addedMember: false,
        }
    },
    methods: {

        getFather() {

        },

        addMember() {

            this.addMemberBtn = false
            this.addingMember = true

            if(!this.name || !this.email || !this.gender || !this.dOb || !this.relationship) return

            var getName = this.name.toLowerCase().trim().split(" ")
            var pass = getName[0];
            pass = pass + this.dOb.split("-")[0]            

            var newMember = {
                name: this.name,                
                gender: this.gender,
                email: this.email,
                password: pass,
                relationships: {
                    name: this.getRelationship(this.relationship),
                    with: localStorage.getItem('id'),
                    treeId: this.tree._id
                },
                dateOfBirth: this.dOb,
                trees: {
                    name: this.tree.name,
                    treeId: this.tree._id,
                    owner: false
                }
            }

            // console.log(newMember)

            services.addMember(newMember)
            .then(res => {

                console.log(res)

                if(res.status === 200)
                {
                    this.addingMember = false
                    this.addedMember = true

                    setTimeout(() => {
                        this.addedMember = false
                        this.addMemberBtn = true
                        this.name = this.gender = this.relationship = this.dOb = this.email = ''
                    }, 3500)
                }

            }).catch(err => {

                if(err)
                {
                    this.addingMember = false
                    this.addMemberErr = true

                     setTimeout(() => {
                        this.addMemberErr = false
                        this.addMemberBtn = true
                        this.error = err
                        this.name = this.gender = this.relationship = this.dOb = this.email = ''
                    }, 3500)

                }
                
            })

        },

        getTree() {

            const rid = this.$route.params.id
            // console.log(rid)

            services.viewTree(rid)
            .then(res => {

                if(res.status === 200)
                {
                    this.tree = res.data.tree   
                    // this.getMembers()                 
                    this.getAllMembers()
                }

            }).catch(err => {

                if(err)
                {
                    this.treeGetErr = true;
                    this.error = err;
                    return null
                }

            })
        },


        getAllMembers() {

            var tree = this.tree._id
            // console.log(tree)

            var creds = {
                id: localStorage.getItem('id'),
                treeid: tree
            }
            
            services.getAllMembers(creds.id, creds.treeid)
            .then(res => {

                // console.log(res)

                if(res.status === 200)
                {
                    this.allMembers = res.members
                    // console.log(this.allMembers)
                }

            }).catch(err => {

                if(err)
                {
                    this.memberErr = true
                    this.error = err;
                }

            })

        },

        getRelationship(currentRel) {

            var nmg = ""

            this.allMembers.forEach(member => {                                

               if(member._id == localStorage.getItem('id'))
                {                                        
                    if(currentRel == "father" || currentRel == "mother")
                    {
                        if(member.gender == "male") 
                            nmg = "son"
                        if(member.gender == "female") 
                            nmg =  "daughter"
                    }
                 
                    if(currentRel == "brother" || currentRel == "sister")
                    {                        
                        if(member.gender == "male") {                             
                            nmg = "brother"                                                        
                        }
                        
                        if(member.gender == "female") {                             
                            nmg =  "sister"
                        }
                    }
                                            
                    if(currentRel == "daughter" || currentRel == "son")
                    {
                        if(member.gender == "male") 
                            nmg = "father"
                        if(member.gender == "female") 
                            nmg = "mother"
                    }

                }                            
               
            });

            return nmg
            
        },

        getHierarchy(members) {

            members.forEach((member, index) => {

                if(member.trees.treeid == this.tree._id)
                {
                    if(member.trees.owner == true)
                    {
                        var owner = {
                            id: 1,
                            name: member.name,
                            title: 'Owner'
                        }

                        this.members.push(owner)
                    }                        
                
                    else
                    {
                        var mem = {
                            id: index,
                            name: member.name,
                            title: member.relationships
                        }

                        this.members.push(mem)
                    }
                }

            });

        }

    },
    
    beforeMount() {

        this.getTree();

    },

    created() {
    
        this.getAllMembers();
    }

}
</script>

<style>

</style>