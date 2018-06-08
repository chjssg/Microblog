<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <div class="btn-group" role="group" aria-label="...">  
      <button type="button" class="btn btn-default" @click="showP">Left</button>  
      <button type="button" class="btn btn-default">Middle</button>  
      <button type="button" class="btn btn-default">Right</button>  
      <img :src="picUrl" alt="" srcset="" class="img-rounded">
      <img :src="img" alt="" srcset="" class="img-rounded">
    </div> 
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      img:'../../static/logo.png',
    }
  },
  computed:mapGetters({
				picUrl:'picUrl',
				user:'user',
  }),
  mounted(){
    // console.log(picUrl)
  },
  methods:{
    showP(){
      console.log(this.picUrl)
      console.log(this.img)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
