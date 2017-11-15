<template>
  <div class="body">
    <canvas :width="width"
            :height="height"></canvas>
  </div>
</template>

<script lang="coffee">
import _ from 'lodash'
#import Utils from '../modules/utils.coffee'

export default m =
  name: 'brownian-motion'
  data: ->
    width: '300'
    height: '150'

  mounted: ->
    window.onresize = @resize

  activated: ->
    # console.log 'activated'
    document.title = 'Brownian Motion'

  methods:
    init: ->

    resize: _.throttle ((e) ->
      console.log 'resize'
      @width = Math.max window.innerWidth * @scale, @px
      @height = Math.max window.innerHeight * @scale, @py
    ), 500



</script>

<style scoped>

</style>
