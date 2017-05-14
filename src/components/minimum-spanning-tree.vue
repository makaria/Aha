<template>
  <div>
    <h2>Minimum Spanning Tree</h2>
    <div class="action">
      <button @click="toggleSteiner" v-text="steinerText" :class="spanClass">Steiner Tree</button>
      <button @click="toggleSpanning" v-text="spanningText" :class="spanClass"></button>
      <button @click="toggleUpdating" v-text="updateText" :class="buttonClass"></button>
      <button @click="clear" :class="buttonClass">Clear</button>
    </div>
    <div class="board">
      <svg id="board" ref="board" :width="width" :height="height" @contextmenu.prevent @mousemove="drag" @click="drop" @dblclick="toggleUpdating">

        <rect :width="width" :height="height" rx="5" ry="5"></rect>
        <!-- lines -->
        <g v-if="points.length > 0" class="trees">
          <g v-if="tree.length > 0" class="line">
            <line v-for="p in tree" class="tree" :x1="p[0].x" :y1="p[0].y" :x2="p[1].x" :y2="p[1].y">
            </line>
          </g>
          <g v-if="ptree.length > 0" class="line">
            <line v-for="p in ptree" class="ptree" :x1="p[0].x" :y1="p[0].y" :x2="p[1].x" :y2="p[1].y">
            </line>
          </g>
          <g v-if="ktree.length > 0" class="line">
            <line v-for="p in ktree" class="ktree" :x1="p[0].x" :y1="p[0].y" :x2="p[1].x" :y2="p[1].y">
            </line>
          </g>
          <g v-if="ftree.length > 0 && steinering" class="line">
            <line v-for="p in ftree" class="ftree" :x1="p[0].x" :y1="p[0].y" :x2="p[1].x" :y2="p[1].y">
            </line>
          </g>
        </g>
        <!-- points -->
        <!--fermat points-->
        <g v-if="fpoints.length > 0 && steinering" class="points">
          <g v-for="(point, index) in fpoints" v-if="point && point.index >= points.length" :index="index" class="points">
            <!--<circle class="ring" :cx="point.x" :cy="point.y" :r="radius*0.3">
                                              </circle>-->
            <circle class="point" :cx="point.x" :cy="point.y" :r="3">
            </circle>
            <text class="fermat" :x="point.x" :y="point.y" v-text="point.index">
            </text>
          </g>
        </g>
        <!--movable point-->
        <g v-if="points.length > 0" class="points">
          <g v-for="(point, index) in points" v-if="point" :index="index" :class="pointClass" @click.stop="move(index)" class="points">
            <circle class="ring" :cx="point.x" :cy="point.y" :r="radius">
            </circle>
            <circle class="point" :cx="point.x" :cy="point.y" :r="5">
            </circle>
            <text class="text" :x="point.x" :y="point.y" v-text="point.index">
            </text>
          </g>
        </g>
        <!-- the moving point -->
        <g v-if="(updating || moving) && current" class="current" :class="moving? 'moving': ''">
          <g>
            <circle class="ring" :cx="current.x" :cy="current.y" :r="radius">
            </circle>
            <circle class="point" :cx="current.x" :cy="current.y" :r="5">
            </circle>
            <text class="text" :x="current.x" :y="current.y" v-text="index">
            </text>
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
    pmst: null
    kmst: null

    steinering: false
    fermat_angel: Math.PI * 2 / 3
    deviation: 0.01
    fermat_vertex: []
    fpoints: []
    ftree: []

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

    steinerText: ->
      if @steinering
        'Steinering'
      else
        'Auto Steiner'

    buttonClass: ->
      if @moving
        'disabled'
      else
        ''

    spanClass: ->
      if @moving || @updating
        'disabled'
      else
        ''

    pointClass: ->
      if @updating || @moving
        ''
      else
        'movable'

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
      if @moving then return
      @updating = !@updating
      #if @moving #删除了，还是单独提供删除按钮比较好。
      #  @points.splice @index, 1
      #  @vertex.splice @index, 1
      @index = @points.length
      @dynamic_border = []
      @dynamic_vertex = []
      #重新生成，删除因为到边界外点击按钮生成的临时线段。
      @span()
      if !@current?
        @current =
          x: @width * 0.5
          y: @height * 0.5
          index: 0

    toggleSpanning: ->
      if @updating || @moving then return
      @spanning = !@spanning
      @span()

    toggleSteiner: ->
      if @updating || @moving then return
      @steinering = !@steinering
      @span()

    resize: _.throttle ((e) ->
      console.log 'resize'
      @width = Math.max window.innerWidth * @scale, @px
      @height = Math.max window.innerHeight * @scale, @py
    ), 500

    clear: ->
      if @moving then return
      @current = null
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
      Math.sqrt Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)

    abs_angel: (a, b) ->
      dz = @distance a, b
      dx = b.x - a.x
      if b.y < a.y
        Math.acos dx / dz
      else
        Math.PI * 2 - Math.acos dx / dz

    rel_angel: (zero, b, c) ->
      # pb = b.distance
      # pc = c.distance
      bc = @distance b.point, c.point
      ab = @distance zero, b.point
      ac = @distance zero, c.point
      if ab > 0 && ac > 0 && bc > 0 && ab + ac > bc
        Math.acos((ab * ab + ac * ac - bc * bc) / (2 * ab * ac))
      else
        false


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
      #prim和kruskal的结果可能不同？
      #@prim vertex, points
      @kruskal border, points
      #generate fermat_vertex
      @border2vertex @ktree, points
      @mst()

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

    #indexOf不行
    trim: (vertex, start) ->
      for i in start
        if vertex[i].length > 0
          vertex[i] = vertex[i].filter (v) ->
            start.indexOf(v.couple.index) == -1
      vertex

    border2vertex: (tree, points) ->
      vertex = []
      for border in @ktree #or @ptree, @tree
        index_a = border[0].index
        index_b = border[1].index
        vertex[index_a] = vertex[index_a] ||
          couple: []
          point: points[index_a]
        vertex[index_b] = vertex[index_b] ||
          couple: []
          point: points[index_b]
        vertex[index_a].couple.push
          point: points[index_b]
          distance: border.distance
        vertex[index_b].couple.push
          point: points[index_a]
          distance: border.distance
      @fermat_vertex = vertex

    vertex2border: (vertexs) ->
      border = []
      for key, vertex of vertexs
        vertex.couple.forEach (c) ->
          if border.length > 0
            index = border.findIndex (b) ->
              b.distance == c.distance && (c.point.index == b[0].index && vertex.point.index == b[1].index) || (c.point.index == b[1].index && vertex.point.index == b[0].index)
            if index == -1
              border.push
                0: vertex.point
                1: c.point
                distance: c.distance
          else
            border.push
              0: vertex.point
              1: c.point
              distance: c.distance
      border

    vertex2point: (vertexs) ->
      points = []
      for key, vertex of vertexs
        points.push vertex.point
      points

    #100左右就很慢了, trim和next的问题？
    prim: (vertex, points) ->
      tree = []
      start = [0]
      length = 0
      k = 0
      #fermat, init
      #fermat_vertex = @fermat_vertex points
      #vertex = JSON.parse JSON.stringify @vertex
      while k < points.length - 1
        next = @next start, vertex
        start.push next.couple.index
        vertex = @trim vertex, start
        length += next.distance
        tree.push
          0: points[next.previous]
          1: points[next.couple.index]
          distance: next.distance
        k++
        #fermat, push
        #fermat_vertex[next.previous].couple.push points[next.couple.index]
        #fermat_vertex[next.couple.index].couple.push points[next.previous]
      #@tree = tree
      @ptree = tree
      @pmst =
        tree: tree
        start: start
        vertex: vertex
        length: length
      #fermat
      #@fermat_vertex = fermat_vertex

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
      @kmst = result

    # equal_angel: (angel) ->
    #   Math.abs(angel - @fermat_angel) < @deviation

    #不确定是否是steiner树
    mst: ->
      #Steiner Tree集合
      if !@steinering then return
      fermat_vertex = {}
      vertexs = JSON.parse JSON.stringify @fermat_vertex
      length = vertexs.length
      k = 0
      while k < length * 2 and vertexs.length > 0
        vertex = vertexs.shift()
        result = @find_fermat vertex, length
        #有fermat点
        if result.fermat
          #将新生成的fermat点加入集合，并更新集合中和此fermat相关的点
          @update_fv result, vertex, fermat_vertex
          #修改vertexs，更改vertexs中个fermat点相关的点
          @update_vertexs result, vertex, vertexs
          length += 1
        #没有新的fermat点，将当前顶点当作fermat点加入集合
        else
          point = vertex.point
          index = point.index
          couple = vertex.couple
          fermat_vertex[index] = @point2fv point, couple
        k++
      @fermat_vertex = fermat_vertex
      @fpoints = @vertex2point @fermat_vertex
      @ftree = @vertex2border @fermat_vertex

    update_fv: (result, vertex, fermat_vertex) ->
      point = result.fermat
      index = point.index
      couple = result.couple
      # console.log 'fermat index', index
      fermat_vertex[index] = @point2fv point, couple
      # if index != vertex.point.index
      #   if !fermat_vertex[vertex.point.index]
      #     fermat_vertex[vertex.point.index] = @point2fv vertex.point, vertex.couple
      #将fv集合中涉及当前vertex的点更新成fermat点
      couple.forEach (c) ->
        index_c = c.point.index
        distance = c.distance
        #当前fv集合有需要更新的点
        if fermat_vertex[index_c]
          couple_c = fermat_vertex[index_c].couple
          couple_c = couple_c.map (cc) ->
            if cc.point.index == vertex.point.index
              cc.point = point
              cc.distance = distance
              cc
            else
              cc
          # console.log 'new couple', couple_c
          fermat_vertex[index_c].couple = couple_c
        else
          null

    update_vertexs: (result, vertex, vertexs) ->
      point = result.fermat
      index = point.index
      couple = result.couple
      #将vertexs里各个vertex的couple里对应的原vertex点替换为fermat点，原vertex点已从vertexs删除。
      couple.forEach (c) ->
        index_c = vertexs.findIndex (v) -> v.point.index == c.point.index
        #vertexs集合里有这个未处理的点。此点一定不在fermat_vertex里
        if index_c != -1
          # vertexs[index_c].point = point
          #将此vertex点的couple里是原vertex点的替换为fermat点
          vertexs[index_c].couple = vertexs[index_c].couple.map (vsc) ->
            if vsc.point.index == vertex.point.index
              vsc.point = point
              vsc.distance = c.distance
              vsc
            else
              vsc
        #生成了新的fermat点, index应该不等于原vertex
        if index != vertex.point.index
          #couple有一个是原vertex点
          if c.point.index == vertex.point.index
            #将原vertex中部分couple(现在属于fermat的couple)删除，因为这些couple现在连接的是fermat点
            vertex.couple = vertex.couple.filter (vc) ->
              index = couple.findIndex (cc) -> cc.point.index == vc.point.index
              index == -1
            #将fermat点加入vertex的couple，并将此点重新加入vertexs集合
            vertex.couple.push
              point: point
              distance: c.distance
            # console.log 'new vertex', vertex
            vertexs.push vertex

    find_fermat: (vertex, length) ->
      point = vertex.point
      index = point.index
      couple = vertex.couple
      result = {}
      #couple至少有一个元素, mst的叶子
      if couple.length == 1
        result = @fermat2point false, couple, length
      else if couple.length == 2
        angel = @rel_angel point, couple[0], couple[1]
        # console.log 'vertex angel', vertex.point.index, angel, @fermat_angel, angel >= @fermat_angel
        if angel < @fermat_angel
          fermat = Utils.fermat point, couple[0].point, couple[1].point
          # console.log 'fermat point', fermat
          if isNaN fermat.x || isNaN fermat.x
            console.error fermat, point, couple
            result = @fermat2point false, couple, length
          else
            result = @fermat2point fermat, [point, couple[0].point, couple[1].point], length
        else
          result = @fermat2point false, couple, length
      else# if couple.length >= 3
        angels = couple.map (c) =>
          angel: @abs_angel point, c.point
          point: c.point
        angels = angels.sort (a, b) -> a.angel > b.angel
        # console.log angels
        angels_length = angels.length
        angels = angels.map (a, i) ->
          if i < angels_length - 1
            angel = Math.abs a.angel - angels[i + 1].angel
            angel: Math.min angel, Math.PI * 2 - angel
            couple: [a.point, angels[i + 1].point]
          else
            angel = Math.abs a.angel - angels[0].angel
            angel: Math.min angel, Math.PI * 2 - angel
            couple: [a.point, angels[0].point]
        angels.sort (a, b) -> a.angel > b.angel
        # console.log 'vertex minimum angel', vertex.point.index, angels[0], angels
        if angels[0].angel < @fermat_angel
          fermat = Utils.fermat point, angels[0].couple[0], angels[0].couple[1]
          # console.log 'fermat point', fermat
          if isNaN fermat.x || isNaN fermat.x
            console.error fermat, point, angels
            result = @fermat2point false, couple, length
          else
            result = @fermat2point fermat, [point, angels[0].couple[0], angels[0].couple[1]], length
        else
          result = @fermat2point false, couple, length
      result

    fermat2point: (fermat, couple, length) ->
      if fermat
        fermat:
          x: fermat.x
          y: fermat.y
          index: length
        couple: [
          point: couple[0]
          distance: @distance couple[0], fermat
        ,
          point: couple[1]
          distance: @distance couple[1], fermat
        ,
          point: couple[2]
          distance: @distance couple[2], fermat
        ]
      else
        fermat: false
        couple: couple

    point2fv: (point, couple) ->
      point: point
      couple: couple


</script>

<style scoped>
div.action {
  display: flex;
  flex: auto;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
}

div.board {
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  -webkit-user-select: none;
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
  stroke: palevioletred;
  stroke-width: 3;
}

.ktree {
  stroke: khaki;
  stroke-width: 3;
}

.ftree {
  stroke: firebrick;
  stroke-width: 3;
}

.fermat {
  color: firebrick;
  font-size: 1rem;
}

.text {
  font-size: 1.5rem;
}

.points {
  cursor: pointer;
}

.disabled {
  cursor: not-allowed;
  background: lightgrey;
}

.moving {
  cursor: grabbing;
}

.movable {
  cursor: grab;
}
</style>
