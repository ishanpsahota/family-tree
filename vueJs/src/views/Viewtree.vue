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
                                        <option value="father"  > Father </option>
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
                <small> <code> The tree may take some time to load! </code> </small>   
                <!-- Members -->                      
                    <!-- <div v-if="nodes" class="row p-3" >
                        <div v-for="(node, i) in nodes" :key="i" class="card shadow-sm col-md-2 col-10 m-1">                                
                            <div class="card-body">
                                <h4 class="card-title">{{node.name}}</h4>
                                <p class="card-text">{{node.title}}</p>
                            </div>
                        </div>
                    </div>                     -->
                <!-- Members end -->
                <!-- Chart -->               
                    <div class="col-12">
                        <div id="tree" ref="tree"> </div>
                    </div>
                <!-- Chart end -->
                <div class="col-12">
                    <p> Incorrect Hierarchy? Click 
                        <button type="button" v-if="correctH" @click="correctHierarchy()" class="btn btn-dark btn-sm"> here </button> 
                        <button type="button" v-if="correcting" disabled class="btn btn-dark btn-sm"> <div class="spinner-border text-light"></div> </button> 
                        <button type="button" v-if="correctDone" disabled  class="btn btn-success btn-sm"> Done </button> 
                        <button type="button" v-if="correctErr" disabled class="btn btn-danger btn-sm"> Error! </button> 
                        to correct it. </p>
                </div>
            </div>
            <div v-if="treeGetErr || memberErr || correctErr" class="col-12">
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
import services from '../api/services'
import OrgChart from '@balkangraph/orgchart.js'

export default {

    name: 'NewTree',
    components: {
        Nav, 
        Footer,
    },
    data() {
        return {
            title: "New Tree",
            name: '',
            email: '',
            relationship: '',
            dOb: '',                        
            gender: '',
            error: null,
            tree: null,
            treeGetErr: false,
            memberErr: false,            
            addMemberBtn: true,
            addingMember: false,
            addMemberErr: false,
            addedMember: false,            
            nodes: [],
            treeMembers: '',
            allMembers: '',
            correctH: true,
            correcting: false,
            correctDone: false,
            correctErr: false
        }
    },
    methods: {

        oc: function(domEl, x) {

			this.chart = new OrgChart(domEl, {
                menu: {
                    pdf: {text: "Export PDF"}
                },
                mouseScrool: OrgChart.action.none,
				nodes: x,
				nodeBinding: {
					field_0: "name",
					field_1: "title",
					img_0: "img"
				}
			});
        },

        getAllMembers(id, treeId) {

            services.getAllMembers(id, treeId)
            .then(res => {
                
                this.members = res.members

            }).catch(err => {

                this.treeGetErr = true
                this.error = err;
            })

        },

        getMembers() {
            var tree = this.tree._id                        
            var creds = {
                id: localStorage.getItem('id'),
                treeid: tree
            }
            // var members = ""
            
            services.getAllMembers(creds.id, creds.treeid)
            .then(res => {
                
                if(res.status === 200)
                {
                    // members = res.members
                    // console.log(members) 
                    // return members   
                    this.allMembers = res.members
                    this.getHierarchy(this.allMembers)                
                }
            }).catch(err => {
                if(err)
                {
                    this.memberErr = true
                    this.error = err;                    
                    return null
                }
            }) 
        },

        getRel(memberGender, rel)
        {
            var usergender = localStorage.getItem('gender')
            var newRel = ""

            if(usergender == "male")
            {
                if(memberGender == "male")
                {
                    if(rel == "son" || rel == "daughter")
                        newRel = "father"
                    if(rel == "father" || rel == "mother")
                        newRel = "son"
                    if(rel == "brother" || rel == "sister")
                        newRel = "brother"
                    if(rel == "spouse")
                        newRel = "spouse"
                }

                if(memberGender == "female")
                {
                    if(rel == "sister")
                        newRel = "brother"
                    if(rel == "mother")
                        newRel = "son"
                    if(rel == "daughter")
                        newRel = "father"
                    if(rel == "spouse")
                        newRel = "spouse"
                }
            }

            if(usergender == "female")
            {

                if(memberGender == "male")
                {
                    if(rel == "father")
                        newRel = "daughter"
                    if(rel == "brother")
                        newRel = "brother"
                    if(newRel == "son")
                        newRel = "mother"
                    if(rel == "spouse")
                        newRel = "spouse"
                }

                if(memberGender == "female")
                {
                    if(rel == "daughter")
                        newRel = "mother"
                    if(rel == "mother")
                        newRel = 'daughter'
                    if(rel == "sister")
                        newRel = "sister"
                    if(rel == "spouse")
                        newRel = "spouse"
                }
            }       

            return newRel

        },
        
        addMember() {

            var pass = this.name.toLowerCase().trim().split(" ")[0] + this.dOb.split("-")[0]

            if(!this.name || !this.gender || this.relationship || !this.dOb || !this.email)
            {
                this.memberErr = true
                this.error = 'Empty fields!'
            }

            var member = {
                name: this.name,
                gender: this.gender,
                relationships: {
                    name: this.getRel(this.gender, this.relationship),
                    with: localStorage.getItem('id'),
                    treeId: this.tree._id
                },
                trees: {                    
                    treeId: this.tree._id,
                    owner: false
                },
                dateOfBirth: this.dOb,
                email: this.email,
                password: pass
            }

            this.addNow(member)
        },

        addNow(memberData) {

            this.addMemberBtn = false
            this.addingMember = true;

            if(!memberData ||  memberData == null)
            {
                this.addingMember = false;
                this.addMemberBtn = true
                this.error = " Some fields might be empty! "
                return
            }
            else
            {
                services.addMember(memberData)
                .then(res => {
                    if(res.status === 200 || res.data.status === 200)
                        this.addingMember = false
                        this.addedMember = true                        

                        setTimeout(() => {
                            this.addedMember = false
                            this.addMemberBtn = true
                        }, 2500)

                        this.getTree()                        

                }).catch(err => {
                    this.addingMember = false
                    this.addMemberErr = true
                    this.error = err
                    setTimeout(() => {
                        this.error = null
                        this.addMemberBtn = true    
                    }, 2500);
                    

                })

            }

        },

        async getTree()
        {
            const id = this.$route.params.id
    
            if(!id) return
            else
            {
                await services.viewTree(id)
                .then(res => {

                    if(res.status === 200)
                    {
                        if(res.data.status === 200)
                        {                                       
                            this.tree = res.data.tree                            
                            this.getMembers();                            
                        }
                    }

                }).catch(err => {

                    this.treeGetErr = true
                    this.error = err

                })
            }

        },

        getNode(memberId, allMembers) 
        {              
            var name = ""
            
            allMembers.forEach((member) => {
            
                if(member._id == memberId) 
                {
                    name = member.name
                }
            })
            return name
        },

        getParentIndex(members, pid)
        {
            var index = ""

            if(pid == null) 
                index = null
            else
            {
                members.forEach((member, i) => {
                    if(member.memberId == pid)
                    {                    
                        index = i+1
                    }                                    
                })    
            }

            return index
        },

        getHierarchy(allMembers) {

            var ownerDone = false            
            this.nodes = []

            this.tree.members.forEach((member, index) => {
                
                if(member.relWithOwner == 'self')
                {
                    ownerDone = true
                    var owner = {
                        id: 1,
                        name: this.getNode(member.memberId, allMembers),
                        title: 'Owner',
                        pid: this.getParentIndex(this.tree.members, member.parentId)                
                    }                    
                    
                    this.nodes.push(owner)                         
                }

                if(ownerDone == true && index > 0)
                {
                    var push = {
                        id: index+1, 
                        name: this.getNode(member.memberId, allMembers),
                        title: member.relWithOwner,
                        pid: this.getParentIndex(this.tree.members, member.parentId)
                    }

                    this.nodes.push(push)
                }
                else if(ownerDone == false)
                {
                    var pushMember = {
                        id: index+1, 
                        name: this.getNode(member.memberId, allMembers),
                        title: member.relWithOwner,
                        pid: this.getParentIndex(this.tree.members, member.parentId)
                    }

                    this.nodes.push(pushMember)
                }


            })  
            
            this.triggerChart()

        },
        
        triggerChart() {  
            
            // console.log(this.nodes)

            this.oc(this.$refs.tree, this.nodes)	
        },

        correctHierarchy() {

            this.correctH = false
            this.correcting = true

            services.correctHierarchy(localStorage.getItem('id'), this.tree._id)
            .then(res => {

                if(res.status === 200)
                {
                    this.getTree()
                    this.correcting = false
                    this.correctDone = true

                    setTimeout(() => {
                        this.correctDone = false
                        this.correctH = true
                    }, 2500);
                }

            }).catch(err => {

                this.correcting = false
                this.correctErr = true
                this.error = err

                setTimeout(() => {
                    this.correctErr = false
                    this.correctH = true
                    this.error = null
                }, 2500);

            })

            setTimeout(() => {
                    this.correcting = false
                    this.correctDone = false
                    this.correctErr = false
                    this.error = null
                    this.correctH = true
                }, 2500);

        }

    },
    
    beforeMount() {

        this.getTree()

    },

    beforeCreate() {


    },

    created() {
    

    },

    mounted() {
                    
        // this.getAllMembers()
        // this.getHierarchy()

    }

}
</script>

<style>

</style>