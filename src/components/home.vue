<template>
  <div class="home">
    <aha-footer></aha-footer>
  </div>
</template>

<!-- todo: 赢得游戏的时候播放“aha”的音效 -->
<script lang="coffee">
  export default m =
    name: 'home'
    data: ->
      msg: 'Enjoy Games'

    activated: ->
      # console.log 'activated'
      document.title = 'Aha!'
      document.body.style.background = 'no-repeat center center fixed'
      document.body.style.backgroundImage = 'url(/static/img/asuka.jpg)'
      document.body.style.backgroundSize = 'cover'

    deactivated: ->
      document.body.style.background = ''


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h1,
h2 {
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
