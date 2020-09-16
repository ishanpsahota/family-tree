<template>
  <div id="nav" class="nav-row fixed-top row w-100 m-0">
      <nav class="nav nBar navbar-expand-md p-3 h-25 w-100 ">
        <a :class="' nav-link navbar-brand ' + this.getActive('')" href="/"> Welcome </a>
        <a v-if="loggedIn" :class="'nav-link  ' + this.getActive('trees') " href="/trees"> Trees <i class="fa fa-tree" aria-hidden="true"></i> </a>
        <a v-else :class="'nav-link  ' + this.getActive('register') " href="/register"> Register </a>
        <button class="btn" @click="logout()" v-if="loggedIn" :class="'nav-link  ' + this.getActive('logout') " > Logout <i class="fas fa-sign-out-alt    "></i> </button>
        <a v-else :class="'nav-link  ' + this.getActive('login') " href="/login"> Login </a>
        <a v-if="name" class="ml-auto text-light nav-link"> Hi, {{name}}!  </a>
      </nav>
  </div>
</template>

<script>
export default {
    name: 'Nav',

    data() {
      return {
          loggedIn: '',
          name: localStorage.getItem('name')
      }
    },

    methods: {
      
        getActive(param) 
        {
          let urlA = this.$route.path
          let url = urlA.split('/');

          if(url[2] == null)
          {
            if(url[1] == param)
            {
              return " bg-light rounded shadow-sm text-dark "
            } else return "  text-light "
          }
          else
          {
              if(url[1] == param)
              {
                return " bg-light rounded shadow-sm text-dark "
              } else return "  text-light "
          }
        },

        checkStatus() {
        
          this.loggedIn = !!this.$store.getters.isLoggedIn

        },

        logout() {

          this.$store.dispatch('logout');
          this.$router.push('/login');

        }
    },

    created() {
      this.checkStatus();
    }
}
</script>

<style>
    .nBar
    {
        background-color: #4169E1;
    }
</style>