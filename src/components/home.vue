<template>
  <div class="home">
    <h1 v-text="msg"></h1>
    <h2>Game Links</h2>
    <ul>
      <li>
        <router-link to="/Mine-Sweeper">Mine Sweeper</router-link>
      </li>
      <li>
        <router-link to="/Minimum-Spanning-Tree">Minmum Spanning Tree</router-link>
      </li>
      <li>
        <router-link to="/Pinball">Pinball</router-link>
      </li>
      <li>
        <router-link to="/Brownian-Motion">Brownian Motion</router-link>
      </li>
    </ul>
    <h2>Source Code</h2>
    <ul>
      <li><a href="https://github.com/makaria/aha" target="_blank">Github</a></li>
    </ul>
  </div>
</template>

<!-- todo: 赢得游戏的时候播放“aha”的音效 -->
<script lang="coffee">
export default m =
  name: 'hello'
  data: ->
    msg: 'Enjoy Games'

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
