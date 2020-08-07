<template>
<div>
  <counter :num="num" @incre="increment"></counter>
  <p>parent:{{num}}</p>
</div>
</template>

<script>
import Counter from './Counter'
export default {
  name: 'HelloWorld',
  components: {
    Counter
  },
  data () {
    return {
      num: 0,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    increment (num) {
      this.num++;
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
