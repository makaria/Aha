<template>
  <div>
    <h2>Minimum Spanning Tree</h2>
    <div class="action">
      <button @click="toggleSpanning" v-text="spanningText" :class="buttonClass"></button>
      <button @click="toggleUpdating" v-text="updateText" :class="buttonClass"></button>
      <button @click="clear" :class="buttonClass">Clear</button>
    </div>
    <div class="board">
      <svg id="board" ref="board" :width="width" :height="height"
           @mousemove="drag"
           @click="drop"
           @dblclick="toggleUpdating">

        <rect :width="width" :height="height" rx="5" ry="5"></rect>

        <g v-if="points.length > 0" class="points">
          <g v-for="(point, index) in points"
             v-if="point"
             :index="index"
             @click.stop="move(index)"
             class="points">
            <circle class="ring"
                    :cx="point.x"
                    :cy="point.y"
                    :r="radius">
            </circle>
            <circle class="point"
                    :cx="point.x"
                    :cy="point.y"
                    :r="5">
            </circle>
            <text class="text"
                  :x="point.x"
                  :y="point.y"
                  v-text="point.index">
            </text>
          </g>
        </g>

        <g v-if="(updating || moving) && current" class="current">
          <g>
            <circle class="ring"
                    :cx="current.x"
                    :cy="current.y"
                    :r="radius">
            </circle>
            <circle class="point"
                    :cx="current.x"
                    :cy="current.y"
                    :r="5">
            </circle>
            <text class="text"
                  :x="current.x"
                  :y="current.y"
                  v-text="index">
            </text>
          </g>
        </g>

        <g v-if="points.length > 0" class="trees">
          <g v-if="tree.length > 0" class="line">
            <line v-for="p in tree"
                  class="tree"
                  :x1="p[0].x"
                  :y1="p[0].y"
                  :x2="p[1].x"
                  :y2="p[1].y">
            </line>
          </g>
          <g v-if="ptree.length > 0" class="line">
            <line v-for="p in ptree"
                  class="ptree"
                  :x1="p[0].x"
                  :y1="p[0].y"
                  :x2="p[1].x"
                  :y2="p[1].y">
            </line>
          </g>
          <g v-if="ktree.length > 0" class="line">
            <line v-for="p in ktree"
                  class="ktree"
                  :x1="p[0].x"
                  :y1="p[0].y"
                  :x2="p[1].x"
                  :y2="p[1].y">
            </line>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script lang="coffee">
import _ from 'lodash'
import Utils from '../modules/utils.coffee'

export default m =
  name: 'minimum-spanning-tree'
  data: ->
    #basic
    width: 600
    height: 300
    radius: 20
    scale: 0.7
    points: []
    updating: false
    spanning: false
    moving: false
    current: null
    index: 0
    #keep svg shape when resize
    px: 0
    py: 0

    tree: []
    border: []
    vertex: []
    dynamic_border: []
    dynamic_vertex: []
    ptree: []
    ktree: []

  computed:
    updateText: ->
      if @updating
        'Drawing'
      else if @moving
        'Moving'
      else
        'Add Point'

    spanningText: ->
      if @spanning
        'Spanning'
      else
        'Auto Span'

    buttonClass: ->
      if @moving
        'disabled'
      else
        ''

  created: ->
    window.onresize = @resize
    #@init()

  mounted: ->
    @resize()

  #一张水平薄膜上分散着若干个钢珠（假设不会滚动），这个薄膜的形状是怎样的？
  #连接各点需要的最小线段长，可以加新的点（形成新的最小生成树？还比之前小）
  #Steiner Tree，只有近似算法。好难。
  methods:
    init: ->

    toggleUpdating: ->
      @updating = !@updating
      if @moving #删除了，还是单独提供删除按钮比较好。
        @points.splice @index, 1
        @vertex.splice @index, 1
      @index = @points.length
      @dynamic_border = []
      @dynamic_vertex = []

    toggleSpanning: ->
      @spanning = !@spanning
      @span()
      #是清空还是只删了多余的线(正在moving或updating去点按钮会产生到边界的临时线段)？
      #这个按钮可以删了。
      @tree = []
      @ktree = []
      @ptree = []

    resize: _.throttle ((e) ->
      console.log 'resize'
      @width = Math.max window.innerWidth * @scale, @px
      @height = Math.max window.innerHeight * @scale, @py
    ), 500

    clear: ->
      if @moving then return
      @index = 0
      @points = []
      @tree = []
      @border = []
      @vertex = []
      @dynamic_border = []
      @dynamic_vertex = []
      @ptree = []
      @ktree = []

    point: (x, y) ->
      ctm = @$refs.board.getScreenCTM()
      point = @$refs.board.createSVGPoint()
      point.x = x
      point.y = y
      point = point.matrixTransform ctm.inverse()
      x: point.x
      y: point.y
      index: @index

    drag: (e) ->
      if !@updating && !@moving then return
      #每次都重新计算ctm，否则需要监听scroll, resize等可能改变ctm的事件
      @current = @point e.clientX, e.clientY
      @span()

    drop: (e) ->
      if !@updating && !@moving then return
      @merge()
      if @updating
        @points.push @current
      else if @moving
        @moving = false
        @points.splice @index, 1, @current
      @index = @points.length
      @limit()

    move: (index) ->
      if @updating
        return
      else if @moving
        return
      else
        @moving = true
        @index = index
        point = @points.splice(index, 1, null)[0]
        @current =
          x: point.x
          y: point.y
          index: index
        @unmerge index
        @span()

    limit: ->
      if @current?.x > @px
        @px = @current.x + @radius * 2
      if @current?.y > @py
        @py = @current.y + @radius * 2

    distance: (a, b) ->
      Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)

    #只在新增点时增量计算vertex和border，但是似乎不比在span时全部计算快，反而复杂了
    link: ->
      border = []
      vertex = []
      vertex[@index] = []
      for point, index in @points
        if point
          vertex[index] = []
          distance = @distance point, @current
          border.push
            0: point
            1: @current
            distance: distance
          vertex[index].push
            couple: @current
            distance: distance
          vertex[@index].push
            couple: point
            distance: distance
      border = border.sort (a, b) -> a.distance - b.distance
      @dynamic_border = border
      @dynamic_vertex = vertex

    merge_border: (border, dynamic) ->
      border = border.concat dynamic
      border.sort (a, b) -> a.distance - b.distance

    merge_vertex: (vertex, dynamic) ->
      for v, i in dynamic
        if vertex[i]
          vertex[i] = vertex[i].concat v
        else
          vertex[i] = v
      vertex.map (v) -> v.sort (a, b) -> a.distance - b.distance

    merge: ->
      @link()
      @border = @merge_border @border, @dynamic_border
      @vertex = @merge_vertex @vertex, @dynamic_vertex
      #@dynamic_border = []
      #@dynamic_vertex = []

    unmerge: (index) ->
      @border = @border.filter (b) -> b[0].index != index && b[1].index != index
      @vertex = @vertex.map (v) -> v.filter (a) -> a.couple.index != index
      @vertex.splice index, 1, null

    span: ->
      if !@spanning || @points.length <= 1 then return
      @link()
      points = JSON.parse JSON.stringify @points
      vertex = JSON.parse JSON.stringify @vertex
      border = JSON.parse JSON.stringify @border
      if @updating || @moving
        points.splice @index, 1,
          x: @current.x
          y: @current.y
          index: @index
        border = @merge_border border, @dynamic_border
        vertex = @merge_vertex vertex, @dynamic_vertex
      #@prim vertex, points
      @kruskal border, points

    next: (start, vertex) ->
      distances = []
      for i in start
        if vertex[i]?[0]?
          distances.push
            couple: vertex[i][0].couple
            distance: vertex[i][0].distance
            previous: i
      distances.sort (a, b) -> a.distance- b.distance
      distances[0]

    trim: (vertex, start) ->
      for i in start
        if vertex[i].length > 0
          vertex[i] = vertex[i].filter (v) ->
            start.indexOf(v.couple.index) == -1
      vertex

    #100左右就很慢了, trim和next的问题？
    prim: (vertex, points) ->
      tree = []
      start = [0]
      length = 0
      k = 0
      #vertex = JSON.parse JSON.stringify @vertex
      while k < points.length - 1
        next = @next start, vertex
        if next
          start.push next.couple.index
          vertex = @trim vertex, start
          length += next.distance
          tree.push
            0: points[next.previous]
            1: points[start[k+1]]
            distance: next.distance
        k++
      #@tree = tree
      @ptree = tree
      #  tree: tree
      #  start: start
      #  vertex: vertex
      #  length: length

    border2set: (border, vertex_set, border_set, index, length)->
      index_a = border[0].index
      index_b = border[1].index
      merge = []
      abondon = false
      another = true
      merged = false
      result =
        vertex_set: vertex_set
        border_set: border_set
        index: index
        length: length

      for set, i in vertex_set
        #两边都在已有集合里，形成环，舍弃
        set_index_a = !!set[index_a]
        set_index_b = !!set[index_b]
        if set_index_a && set_index_b
          abondon = true
          another = false
        #两边都不在这个集合里，标记为可能的新集合
        else if !set_index_a && !set_index_b
          another = true && another
        #有一个顶点在已有集合里， 添加到这个集合里。其他的集合可能也符合
        else
          another = false
          #已经有一个集合合并了此边，这个集合需要和刚才的集合合并（因为共用了一个顶点）
          if merged
            merge.push i
          #把这个边合并到这个集合里
          else
            merged = true
            merge.push i
            border_set.push border
            index++
            length += border.distance
            if set_index_a
              set[index_b] =
                index: index_b
                border: border
            else
              set[index_a] =
                index: index_a
                border: border
      if abondon
        result
      else if another
        vertex_set.push
          "#{index_a}":
            index: index_a
            border: border
          "#{index_b}":
            index: index_b
            border: border
        border_set.push border
        index++
        length += border.distance
        result.index = index
        result.length = length
        result
      else if merged && merge.length == 2
        vertex_set[merge[0]] = Object.assign {}, vertex_set[merge[0]], vertex_set[merge[1]]
        vertex_set.splice merge[1], 1
        result.index = index
        result.length = length
        result
      else
        result

    #更慢。用二叉树或斐波那契堆(目前还不会，哪天看看吧)？
    kruskal: (border, points) ->
      vertex_set = []
      border_set = []
      length = 0
      k = 0
      i = 0
      #border = JSON.parse JSON.stringify @border
      while border.length > 0  && i < points.length - 1
        b = border.shift()
        result = @border2set b, vertex_set, border_set, i, length
        #useless
        vertex_set = result.vertex_set
        border_set = result.border_set
        i = result.index
        length = result.length
      #@tree = border_set
      @ktree = border_set



</script>

<style scoped>
div.action {
  display: flex;
  flex: auto;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
}

button {
  min-width: 7rem;
  height: 2.5rem;
  border: none;
  cursor: pointer;
  background: #c6ff00;
  margin: 0 1rem;
}

rect {
  stroke: black;
  stroke-width: 7;
  fill: transparent;
}

.prompt {
  stroke: red;
  fill: transparent;
}

.ring {
  fill: transparent;
  stroke: black;
  stroke-opacity: 0.3;
  stroke-width: 3;
}

.point {
  stroke: black;
  fill: black;
}

.tree {
  stroke: red;
  stroke-width: 3;
}

.ptree {
  stroke: purple;
  stroke-width: 3;
}

.ktree {
  stroke: khaki;
  stroke-width: 3;
}

.text {
  font-size: 1.5rem;
}

.points {
  cursor: pointer;
}

.disabled {
  cursor: not-allowed;
}

</style>
