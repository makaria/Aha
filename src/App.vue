<template>
  <div id="app">
    <aha-navi></aha-navi>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script lang="coffee">
export default m =
  name: 'app'
  created: ->
    console.log 'App Start'


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1rem;
}
</style>
