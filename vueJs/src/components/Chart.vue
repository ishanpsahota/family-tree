 <template>
	<div id="chart">
		members: {{members}}		
		tree: {{tree}}
		<div id="tree" ref="tree">
		</div>
	</div>
</template>

<script>

import OrgChart from '@balkangraph/orgchart.js'

export default {

	name: 'tree',
	data() {
		return {
			nodesx: [
				{ id: 1, name: "Denny Curtis", title: "CEO", img: "https://cdn.balkan.app/shared/2.jpg" },
				{ id: 2, pid: 1, name: "Ashley Barnett", title: "Sales Manager", img: "https://cdn.balkan.app/shared/3.jpg" },
				{ id: 3, pid: 1, name: "Caden Ellison", title: "Dev Manager", img: "https://cdn.balkan.app/shared/4.jpg" },
				{ id: 4, pid: 2, name: "Elliot Patel", title: "Sales", img: "https://cdn.balkan.app/shared/5.jpg" },
				{ id: 5, pid: 2, name: "Lynn Hussain", title: "Sales", img: "https://cdn.balkan.app/shared/6.jpg" },
				{ id: 6, pid: 3, name: "Tanner May", title: "Developer", img: "https://cdn.balkan.app/shared/7.jpg" },
				{ id: 7, pid: 3, name: "Fran Parsons", title: "Developer", img: "https://cdn.balkan.app/shared/8.jpg" }
			],

			nodes: []
		}
	},

	props: {
		members: Array,
		tree: Object
	},

	methods: {
		oc: function(domEl, x) {
			this.chart = new OrgChart(domEl, {
				nodes: x,
				nodeBinding: {
					field_0: "name",
					field_1: "title",
					img_0: "img"
				}
			});
		},

		matchMembers(id, members) {

			var name = ""
		
			members.forEach((member) => {
			
				if(member._id == id) 
				{
					name = member.name
				}

			})

			return name

		},

		getParent(tree, parentId) {

			if(parentId == null ) return null   

			tree.members.forEach((member, index) => {

				if(member.memberId == parentId) return index
				else return null

			})

		},

		async getHierarchy() {

			this.tree.members.forEach((member, index) => {

				if(member.relWithOwner == 'self' && member.memberId == localStorage.getItem('id'))
				{
					var owner = {
						id:1,
						name: this.matchMembers(member.memberId, this.members),
						title: 'Owner',
						pid: this.getParent(this.tree, member.parentId)
					}

					this.nodes.push(owner)
				}
				else
				{
					var mem = {
						id: index+1, 
						name: this.matchMembers(member.memberId, this.members),
						title: member.relWithOwner,
						pid: this.getParent(this.tree, member.parentId)
					}

					this.nodes.push(mem)
				}

			})

		},
	},

	mounted() {
		
		this.oc(this.$refs.tree, this.nodes)		
		this.getHierarchy()

	}
}
</script>

<style scoped>
</style>
