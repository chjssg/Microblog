<template>
  <div id="app">
    <transition >
        <router-view ></router-view>
      </transition>
    <!-- <router-view/> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      transitionName: 'slide-left'
    }
  },
  beforeCreate(){
    var that = this;
    this.$http.get("api/userInfo").then(function(res) {
      that.$store.state.user = res.data.user;
    //   console.log(res.data.user);
    });
  }
}
</script>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
