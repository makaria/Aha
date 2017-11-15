<template>
  <div class="footer">
    <li>
      Source Code:
      <a href="https://github.com/makaria/aha"
         target="_blank">Github</a>
    </li>
  </div>
</template>

<script lang="coffee">
export default m =
  name: 'footer'

</script>

<style scoped>
.footer {
  position: absolute;
  text-align: center;
  margin: 0 0 1rem 0;
  bottom: 0;
  left: 0;
  right: 0;
  /*margin: 0;*/
  /*left: 0;
  right: 0;*/
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
