<template>
  <div class="navi">
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <router-link :to="link.link"
                     :key="index"
                     v-text="link.name"
                     active-class="highlighted"
                     exact></router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="coffee">
export default m =
  name: 'navi'
  data: ->
    links: [
      link: '/'
      name: 'Home'
    ,
    #   link: '/Brownian-Motion'
    #   name: 'Brownian Motion'
    # ,
      link: '/Chat-Noir'
      name: 'Chat Noir'
    ,
      link: '/Mine-Sweeper'
      name: 'Mine Sweeper'
    ,
      link: '/Minimum-Spanning-Tree'
      name: 'Minimum Spanning Tree'
    # ,
    #   link: '/Pinball'
    #   name: 'Pinball'
    ]
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

.highlighted {
  color: darkorange;
}
</style>
