<template>
  <div id="chart">
    <div class="row p-5"> 
      <div v-if="spinner">
        <div class="spinner-border text-dark"></div>
      </div>
      <div v-for="member in members" :key="member.id" class="card col-12 col-md-2 bg-white rounded shadow-sm m-1 p-0">
        <div class="card-body">
          <h3> {{member.name}} </h3>
        </div>
        <div class="card-footer">
          <small> {{member.title}} </small>
        </div>
      </div>
    </div>
    <div id="tree" ref="tree">
    </div>  
  </div>
</template>

<script>

import OrgChart from '@balkangraph/orgchart.js';
// import inView from 'in-view'

export default {
    name: 'tree',
      data() {
        return {
            nodesss: [
                { id: 1, name: "Denny Curtis", title: "CEO", img: "https://cdn.balkan.app/shared/2.jpg" },
                { id: 2, pid: 1, name: "Ashley Barnett", title: "Sales Manager", img: "https://cdn.balkan.app/shared/3.jpg" },
                { id: 3, pid: 1, name: "Caden Ellison", title: "Dev Manager", img: "https://cdn.balkan.app/shared/4.jpg" },
                { id: 4, pid: 2, name: "Elliot Patel", title: "Sales", img: "https://cdn.balkan.app/shared/5.jpg" },
                { id: 5, pid: 2, name: "Lynn Hussain", title: "Sales", img: "https://cdn.balkan.app/shared/6.jpg" },
                { id: 6, pid: 3, name: "Tanner May", title: "Developer", img: "https://cdn.balkan.app/shared/7.jpg" },
                { id: 7, pid: 3, name: "Fran Parsons", title: "Developer", img: "https://cdn.balkan.app/shared/8.jpg" }
            ],

            // nodes: this.members,
            spinner: true
        }
      },
      props: {
        members: Array
      },

      methods: {
          oc: function(domEl, x) {            

            console.log("hx")
            this.chart = new OrgChart(domEl, {
              mouseScrool: OrgChart.action.none,
              menu: {
                pdf: { text: "Export PDF" },
                png: { text: "Export PNG" }
              },  
              nodeMenu: {
                  pdf: { text: "Export PDF" },
                  png: { text: "Export PNG" },
                  svg: { text: "Export SVG" }
              },
              nodes: x,
              nodeBinding: {
                  field_0: "name",
                  field_1: "title",
                  img_0: "img"
              }
            });

            console.log("h2x")

            this.spinner = false

          },
      },

      created() {
        // this.oc(this.$refs.tree, this.nodes)
      },

      beforeMount() {

        // this.oc(this.$refs.tree, this.nodes)

      },

      mounted(){

        this.oc(this.$refs.tree, this.nodes)
        
        // setTimeout(() =>{
        //   this.spinner = false
        // }, 4000)
        // console.log(this.nodes) 

      }
}
</script>

<style>

</style>