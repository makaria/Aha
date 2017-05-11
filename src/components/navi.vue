<template>
  <div class="navi">
    <ul>
      <li>
        <router-link to="/" :class="active[0]">Home</router-link>
      </li>
      <li>
        <router-link to="/Brownian-Motion" :class="active[1]">Brownian Motion</router-link>
      </li>
      <li>
        <router-link to="/Chat-Noir" :class="active[2]">Chat Noir</router-link>
      </li>
      <li>
        <router-link to="/Mine-Sweeper" :class="active[3]">Mine Sweeper</router-link>
      </li>
      <li>
        <router-link to="/Minimum-Spanning-Tree" :class="active[4]">Minmum Spanning Tree</router-link>
      </li>
      <li>
        <router-link to="/Pinball" :class="active[5]">Pinball</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="coffee">
export default m =
  name: 'navi'
  computed:
    active: ->
      array = ['', '', '', '', '', '']
      switch @$route.path
        when "/"
          array[0] = 'highlighted'
        when "/Brownian-Motion"
          array[1] = 'highlighted'
        when "/Chat-Noir"
          array[2] = 'highlighted'
        when "/Mine-Sweeper"
          array[3] = 'highlighted'
        when "/Minimum-Spanning-Tree"
          array[4] = 'highlighted'
        when "/Pinball"
          array[5] = 'highlighted'
      array
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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

a.highlighted {
  color: darkorange;
}
</style>
