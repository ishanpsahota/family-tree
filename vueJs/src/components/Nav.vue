<template>
  <div id="nav" class="nav-row fixed-top row w-100 m-0">
      <nav class="nav nBar navbar-expand-md bg-transparent p-3 h-25 w-100 ">
        <a :class="' nav-link navbar-brand ' + this.getActive('')" href="/"> Welcome </a>
        <a :class="'nav-link  ' + this.getActive('login') " href="/login"> Login </a>
        <a :class="'nav-link  ' + this.getActive('register') " href="/register"> Register </a>
        <a :class="'nav-link  ' + this.getActive('trees') " href="/trees"> Trees <i class="fa fa-tree" aria-hidden="true"></i> </a>
      </nav>
  </div>
</template>

<script>
export default {
    name: 'Nav',

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
        }
    }
}
</script>

<style>
    .nBar
    {
        background-color: #4169E1;
    }
</style>