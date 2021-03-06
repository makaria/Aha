<template>
  <div>
    <h2>Minimum Spanning Tree</h2>
    <div class="action">
      <button @click="toggleUpdating"
              v-text="updateText"
              :class="buttonClass">
      </button>
      <button @click="toggleSpanning"
              v-text="spanningText"
              :class="spanClass">
      </button>
      <button @click="toggleSteiner"
              v-text="steinerText"
              :class="spanClass">
      </button>
      <button @click="steiner"
              v-text="'Steiner X' + steinered"
              :class="steinerClass">
      </button>
      <button @click="clear"
              :class="buttonClass">
              Clear
      </button>
    </div>
    <div class="board">
      <svg id="board"
           ref="board"
           :width="width"
           :height="height"
           @contextmenu.prevent="stop"
           @mousemove="drag"
           @click="drop"
           @dblclick="toggleUpdating">

        <rect :width="width"
              :height="height"
              rx="5"
              ry="5">
        </rect>
        <g>
          <text v-if="kmst"
                class="ktext"
                x="5"
                y="20"
                v-text="'Kruskal Tree: ' + kmst.length">
          </text>
          <text v-if="pmst"
                class="ptext"
                x="5"
                y="40"
                v-text="'Prime Tree: ' + pmst.length">
          </text>
          <text v-if="flength"
                class="ftext"
                x="5"
                :y="steinerY"
                v-text="'Steiner Tree: ' + flength">
          </text>
          <text v-if="(kmst || pmst) && flength"
                class="ftext"
                x="5"
                :y="steinerY + 20"
                v-text="'Rate: ' + flength / (pmst.length || kmst.length)">
          </text>
        </g>
        <!-- lines -->
        <g v-if="points.length > 0"
           class="trees">
          <g v-if="tree.length > 0"
             class="line">
            <line v-for="(p, index) in tree"
                  :key="index"
                  class="tree"
                  :x1="p[0].x"
                  :y1="p[0].y"
                  :x2="p[1].x"
                  :y2="p[1].y">
            </line>
          </g>
          <g v-if="ptree.length > 0 && spanning"
             class="line">
            <line v-for="(p, index) in ptree"
                  :key="index"
                  class="ptree"
                  :x1="p[0].x"
                  :y1="p[0].y"
                  :x2="p[1].x"
                  :y2="p[1].y">
            </line>
          </g>
          <g v-if="ktree.length > 0 && spanning"
             class="line">
            <line v-for="(p, index) in ktree"
                  :key="index"
                  class="ktree"
                  :x1="p[0].x"
                  :y1="p[0].y"
                  :x2="p[1].x"
                  :y2="p[1].y">
            </line>
          </g>
          <g v-if="ftree.length > 0 && steinering"
             class="line">
            <line v-for="(p, index) in ftree"
                  :key="index"
                  class="ftree"
                  :x1="p[0].x"
                  :y1="p[0].y"
                  :x2="p[1].x"
                  :y2="p[1].y">
            </line>
          </g>
        </g>
        <!-- points -->
        <!--fermat points-->
        <g v-if="fpoints.length > 0 && steinering"
           class="points">
          <g v-for="(point, index) in fpoints"
             :key="index"
             v-if="point && point.index >= points.length"
             :index="index"
             class="points">
            <!--<circle class="ring" :cx="point.x" :cy="point.y" :r="radius*0.3"></circle>-->
            <circle class="point"
                    :cx="point.x"
                    :cy="point.y"
                    :r="3">
            </circle>
            <text class="fermat"
                  :x="point.x + 3"
                  :y="point.y + 3"
                  v-text="point.index">
            </text>
          </g>
        </g>
        <!--random points-->
        <g v-if="random_points.length > 0"
           class="points">
          <g v-for="(point, index) in random_points"
             :key="index"
             :index="index"
             class="points">
            <circle class="point"
                    :cx="point.x"
                    :cy="point.y"
                    :r="0.5">
            </circle>
            <text class="random"
                  :x="randomX(point.x)"
                  :y="point.y + 8"
                  v-text="point.index">
            </text>
          </g>
        </g>
        <!--movable point-->
        <g v-if="points.length > 0"
           class="points">
          <g v-for="(point, index) in points"
             :key="index"
             v-if="point"
             :index="index"
             :class="pointClass"
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
                  :x="point.x + 5"
                  :y="point.y + 5"
                  v-text="point.index">
            </text>
          </g>
        </g>
        <!-- the moving point -->
        <g v-if="(updating || moving) && current"
           class="current"
           :class="moving? 'moving': ''">
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
                  :x="current.x + 5"
                  :y="current.y + 5"
                  v-text="index">
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
    data: -> #basic
      width: 600
      height: 300
      radius: 20
      scale: 0.7
      points: []
      updating: true
      spanning: true
      moving: false
      current: null
      index: 0# keep svg shape when resize
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

      steinering: true
      fermat_angle: Math.PI * 2 / 3
      deviation: 0.01
      fermat_vertex: []
      fpoints: []
      ftree: []
      flength: 0

      steinered: 0
      need_updated: true

      # dev only
      random_points: []

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

      steinerClass: ->
        if @moving || @updating || !@steinering
          'disabled'
        else
          ''

      pointClass: ->
        if @updating || @moving
          ''
        else
          'movable'

      steinerY: ->
        n = 1
        if @pmst
          n += 1
        if @kmst
          n += 1
        n * 20

    created: ->
      window.onresize = @resize
      # @init()

    activated: ->
      document.title = 'Minimum Spanning Tree'

    mounted: ->
      @resize()

    methods:
      init: ->
        result = @test_fermat()
        console.log result
        # @test_random()

      stop: ->
        if @updating then @toggleUpdating()

      toggleUpdating: ->
        if @moving then return
        @updating = !@updating
        @index = @points.length
        @dynamic_border = []
        @dynamic_vertex = []
        @need_updated = true
        @span()
        @steiner()
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
        @steiner()

      resize: _.throttle ((e) ->
        console.log 'resize'
        @width = Math.max window.innerWidth * @scale, @px
        @height = Math.max window.innerHeight * @scale, @py
        # @test_random()
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
        @ftree = []
        @kmst = null
        @pmst = null
        @fermat_vertex = []
        @fpoints = []
        @flength = 0
        @steinered = 0
        @need_updated = true

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
        # 每次都重新计算ctm， 否则需要监听scroll, resize等可能改变ctm的事件
        @current = @point e.clientX, e.clientY
        @need_updated = true
        @span()
        if !@spanning
          @steiner()

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
        if @updating || @moving then return
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

      abs_angle: (a, b) ->
        dz = @distance a, b
        dx = b.x - a.x
        if b.y < a.y
          Math.acos dx / dz
        else
          Math.PI * 2 - Math.acos dx / dz

      rel_angle: (zero, b, c) ->
        # pb = b.distance
        # pc = c.distance
        bc = @distance b.point, c.point
        ab = @distance zero, b.point
        ac = @distance zero, c.point
        # 不能三点共线(因为误差的原因结果可能为负)
        if ab > 0 && ac > 0 && bc > 0 && ab + ac > bc && ab + bc > ac && ac + bc > ab
          Math.acos((ab * ab + ac * ac - bc * bc) / (2 * ab * ac))
        else
          0

      # 只在新增点时增量计算vertex和border， 但是似乎不比在span时全部计算快， 反而复杂了
      link: (points, current, index) ->
        border = []
        vertex = []
        vertex[index] = []
        # 此时points[index] 不存在或者为null
        for point, i in points
          if point
            vertex[i] = []
            distance = @distance point, current
            border.push
              0: point
              1: current
              distance: distance
            vertex[i].push
              couple: current
              distance: distance
            # current点
            vertex[index].push
              couple: point
              distance: distance
        border = border.sort (a, b) -> a.distance - b.distance
        border: border
        vertex: vertex

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
        d_result = @link @points, @current, @index
        @dynamic_border = d_result.border
        @dynamic_vertex = d_result.vertex
        @border = @merge_border @border, @dynamic_border
        @vertex = @merge_vertex @vertex, @dynamic_vertex

      unmerge: (index) ->
        @border = @border.filter (b) -> b[0].index != index && b[1].index != index
        @vertex = @vertex.map (v) -> v.filter (a) -> a.couple.index != index
        @vertex.splice index, 1, null

      bpv: (dynamic_border, dynamic_vertex) ->
        points = JSON.parse JSON.stringify @points
        vertex = JSON.parse JSON.stringify @vertex
        border = JSON.parse JSON.stringify @border
        if @updating || @moving
          points.splice @index, 1,
            x: @current.x
            y: @current.y
            index: @index
          border = @merge_border border, dynamic_border
          vertex = @merge_vertex vertex, dynamic_vertex
        border: border
        points: points
        vertex: vertex

      span: ->
        if !@spanning || @points.length <= 1 then return
        # 生成dynamic点、 边
        d_result = @link @points, @current, @index
        @dynamic_border = d_result.border
        @dynamic_vertex = d_result.vertex
        # 获取全部的点、 边
        bpv = @bpv @dynamic_border, @dynamic_vertex
        # prim和kruskal的结果可能不同？
        presult = @prim bpv.vertex, bpv.points
        @pmst = presult
        @ptree = presult.tree
        kresult = @kruskal bpv.border, bpv.points
        @kmst = kresult
        @ktree = kresult.tree
        # generate fermat_vertex
        if !@steinering then return
        vertex = @border2vertex kresult.tree, bpv.points
        @fermat_vertex = vertex
        @need_updated = false
        @steinered = 0
        @steiner()


      ## prime start
      next: (start, vertex) ->
        distances = []
        for i in start
          if vertex[i]?[0]?
            distances.push
              couple: vertex[i][0].couple
              distance: vertex[i][0].distance
              previous: i
        distances.sort (a, b) -> a.distance - b.distance
        distances[0]

      # indexOf不行
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
        while k < points.length - 1
          next = @next start, vertex
          if next
            start.push next.couple.index
            vertex = @trim vertex, start
            length += next.distance
            tree.push
              0: points[next.previous]
              1: points[next.couple.index]
              distance: next.distance
          k++
        tree: tree
        start: start
        vertex: vertex
        length: length

      # kruskal start
      border2set: (border, vertex_set, border_set, index) ->
        index_a = border[0].index
        index_b = border[1].index
        merge = []
        abondon = false
        another = true
        merged = false
        length = 0
        result =
          vertex_set: vertex_set
          border_set: border_set
          index: index
          length: length

        for set, i in vertex_set
          # 两边都在已有集合里， 形成环， 舍弃
          set_index_a = !!set[index_a]
          set_index_b = !!set[index_b]
          if set_index_a && set_index_b
            abondon = true
            another = false
          # 两边都不在这个集合里， 标记为可能的新集合
          else if !set_index_a && !set_index_b
            another = true && another
          # 有一个顶点在已有集合里， 添加到这个集合里。 其他的集合可能也符合
          else
            another = false
            # 已经有一个集合合并了此边， 这个集合需要和刚才的集合合并(因为共用了一个顶点)
            if merged
              merge.push i
            # 把这个边合并到这个集合里
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
          result.index = index
          result.length = length
          result

      # 更慢。 用二叉树或斐波那契堆(目前还不会， 哪天看看吧)？
      kruskal: (border, points) ->
        vertex_set = []
        border_set = []
        length = 0
        k = 0
        i = 0
        while border.length > 0 && i < points.length
          b = border.shift()
          result = @border2set b, vertex_set, border_set, i
          vertex_set = result.vertex_set
          border_set = result.border_set
          i = result.index
          length += result.length
        tree: border_set
        vertex: vertex_set
        length: length

      # Steiner Tree start
      border2vertex: (tree, points) ->
        vertex = []
        for border in tree
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
        vertex

      vertex2border: (vertexs) ->
        border = []
        for vertex in vertexs
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
        for vertex in vertexs
          points.push vertex.point
        points

      steiner: ->
        if !@steinering || @points.length <= 1 then return
        if @need_updated
          d_result = @link @points, @current, @index
          bpv = @bpv d_result.border, d_result.vertex
          kresult = @kruskal bpv.border, bpv.points
          @fermat_vertex = @border2vertex kresult.tree, bpv.points
          @steinered = 0
          @need_updated = false
          @steiner()
        else
          @steinered += 1
          fermat_vertex = @fermat @fermat_vertex
          @fermat_vertex = fermat_vertex
          @fpoints = @vertex2point fermat_vertex
          @ftree = @vertex2border fermat_vertex
          @flength = @total_length @ftree
          @need_updated = false

      total_length: (tree) ->
        tree.map (t) -> t.distance
            .reduce (a, b) -> a + b

      # 需要先生成最小生成树。
      # 迭代执行， 以逼近steiner tree
      fermat: (fermat_vertex) ->
        #Steiner Tree集合
        result = []
        vertexs = JSON.parse JSON.stringify fermat_vertex
        length = vertexs.length
        # console.log length
        k = 0
        while k < 999 and vertexs.length > 0
          vertex = vertexs.shift()
          # console.log 'k', k, 'vertex index', vertex.point.index
          fermat = @find_fermat vertex, length
          # 有fermat点
          if fermat.fermat
            # console.log fermat.fermat.index
            # 将新生成的fermat点加入集合， 并更新集合中和此fermat相关的点
            @update_fv fermat, vertex, result
            # 修改vertexs， 更改vertexs中个fermat点相关的点
            # 这儿不将新生成的fermat点加入vertexs集合。 结果的近似性不由k的大小决定而是由迭代此函数的次数决定。
            @update_vertexs fermat, vertex, vertexs
            if fermat.fermat.index != vertex.point.index
              length++
          #没有新的fermat点， 将当前顶点当作fermat点加入集合
          else
            # console.log vertex.point.index
            result[vertex.point.index] =
              point: vertex.point
              couple: vertex.couple
          k++
        #console.log result
        result

      update_fv: (result, vertex, fermat_vertex) ->
        point = result.fermat
        index = point.index
        couple = result.couple
        # console.log 'fermat index', index
        # fermat_vertex数组可能为空， 当赋值index时， 其他为空的地址自动被赋值为undefined
        # 循环时需要注意undefined的元素
        # 干脆还是用Object好了， 最后再转为Array
        fermat_vertex[index] =
          point: point
          couple: couple
        # 将fv集合中涉及当前vertex的点更新成fermat点
        couple.forEach (c) ->
          #index_c = c.point.index
          distance = c.distance
          # 当前fv集合有需要更新的点
          # 其实index_c == c.point.index, 不用findIndex.
          index_c = fermat_vertex.findIndex (fv) -> fv && fv.point.index == c.point.index
          # console.log fermat_vertex, index_c
          if index_c != -1
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
        # 将vertexs里各个vertex的couple里对应的原vertex点替换为fermat点， 原vertex点已从vertexs删除。
        couple.forEach (c) ->
          index_c = vertexs.findIndex (v) -> v.point.index == c.point.index
          # vertexs集合里有这个未处理的点。 此点一定不在fermat_vertex里
          if index_c != -1
            # vertexs[index_c].point = point
            # 将此vertex点的couple里是原vertex点的替换为fermat点
            vertexs[index_c].couple = vertexs[index_c].couple.map (vsc) ->
              if vsc.point.index == vertex.point.index
                vsc.point = point
                vsc.distance = c.distance
                vsc
              else
                vsc
          # couple有一个是原vertex点
          if c.point.index == vertex.point.index
            # 将原vertex中部分couple(现在属于fermat的couple) 删除， 因为这些couple现在连接的是fermat点
            vertex.couple = vertex.couple.filter (vc) ->
              c_index = couple.findIndex (cc) -> cc.point.index == vc.point.index
              c_index == -1
            # 将fermat点加入vertex的couple， 并将此点重新加入vertexs集合
            vertex.couple.push
              point: point
              distance: c.distance
            # console.log 'new vertex', vertex
            if vertex.point.index != index
              vertexs.push vertex
            else
              vertex.point = point

      find_fermat: (vertex, length) ->
        point = vertex.point
        # couple = vertex.couple
        result = {}
        min_angle = @min_angle vertex
        angle = min_angle.angle
        couple = min_angle.couple
        # angle 不可能为0
        if angle && angle < @fermat_angle
          fermat = Utils.fermat point, couple[0].point, couple[1].point
          # console.log 'fermat point', fermat
          if isNaN fermat.x || isNaN fermat.x
            console.error fermat, point, couple
            result = @fermat2point false, couple, length
          else
            if point.fermat
              index = point.index
              third = @the_other couple, vertex
            else
              index = length
              third = point
            result = @fermat2point fermat, [third, couple[0].point, couple[1].point], index
        else
          result = @fermat2point false, couple, length
        result

      # vertex此时应该有三个顶点， 找出不是couple的那个
      the_other: (couple, vertex) ->
        result = null
        for v in vertex.couple
          index = couple.findIndex (c) -> c.point.index == v.point.index
          if index == -1
            result = v.point
        result

      # 选择最小的角，仅限此顶点，而不是所有顶点中最小的。局部也不是最优的
      # todo: distance和angle应该保存以便后来的计算而不是每次重算
      min_angle: (vertex) ->
        point = vertex.point
        couple = vertex.couple
        min_angle = false
        border = []
        if couple.length == 1
          border = couple
        else if couple.length == 2
          min_angle = @rel_angle point, couple[0], couple[1]
          border = couple
        else
          angles = couple.map (c) =>
            angle: @abs_angle point, c.point
            point: c.point
          angles = angles.sort (a, b) -> a.angle > b.angle
          # console.log angles
          angles_length = angles.length
          angles = angles.map (a, i) ->
            if i < angles_length - 1
              angle = Math.abs a.angle - angles[i + 1].angle
              angle: Math.min angle, Math.PI * 2 - angle
              couple: [a.point, angles[i + 1].point]
            else
              angle = Math.abs a.angle - angles[0].angle
              angle: Math.min angle, Math.PI * 2 - angle
              couple: [a.point, angles[0].point]
          angles.sort (a, b) -> a.angle > b.angle
          min_angle = angles[0].angle
          border = [
            point: angles[0].couple[0]
          ,
            point: angles[0].couple[1]
          ]
        angle: min_angle
        couple: border

      # 选择tree中生成fermat点后缩短的距离最大的双边，应该是局部最优了
      smt: (vtree) ->
        vertexs = JSON.parse JSON.stringify vtree
        # points, 提出points似乎不方便
        points = vertexs.map (v) -> v.point
        # distances
        distances = vertexs.map (v) =>
          # 用数组的话到时候需要检索。
          distance = {}
          v.couple.forEach (c) =>
            ds[c.point.index] = @distance v.point, c.point
          index: v.point.index
          distance: distance
        # angles
        angles = vertexs.map (v) =>
          abs_angles = {}
          rel_angles = []
          v.couple.forEach (c) =>
            abs_angle = @abs_angle v.point, c.point
            abs_angles[c.point.index] = abs_angle
            rel_angles.push
              angle: abs_angle
              index: c.point.index
          rel_angles = rel_angles.sort (a, b) -> a.angle > b.angle
          rel_angles_length = rel_angles.length
          rel_angles = rel_angles.map (a, i) ->
            if i < rel_angles_length - 1
              angle = Math.abs a.angle - rel_angles[i + 1].angle
              angle: Math.min angle, Math.PI * 2 - angle
              couple: [a.index, rel_angles[i + 1].index]
            else
              angle = Math.abs a.angle - rel_angles[0].angle
              angle: Math.min angle, Math.PI * 2 - angle
              couple: [a.index, rel_angles[0].index]
          rel_angles.sort (a, b) -> a.angle > b.angle
          index: v.point.index
          abs_angles: abs_angles
          rel_angles: rel_angles
        # delta
        delta = angles.map (a) =>
          d = a.rel_angles.map (r) =>
            if r.angle >= @fermat_angle
              index: a.index
              delta: 0
              couple: r.couple
              fermat: false
            else
              p0 = points[a.point.index]
              p1 = points[r.couple[0]]
              p2 = points[r.couple[1]]
              distance = distances[p0.index].distance[p1.index] + distances[p0.index].distance[p2.index]
              fermat = Utils.fermat p0, p1, p2
              fermat_distance = @distance(p0, fermat) + @distance(p1, fermat) + @distance(p2, fermat)
              index: a.index
              delta: distance - fermat_distance
              couple: r.couple
              fermat: fermat
          d.sort (a, b) -> a.delta < b.delta
          index: a.index
          delta: d
        # tree
        # tree = vertexs.map (v) ->
        #
        delta.sort (a, b) -> a.delta[0].delta < b.delta[0].delta
        # update delta for next loop
        update_delta = () =>
          branch = delta[0].delta[0]
          if branch.index < @points.length
            old_index = branch.index
            new_index = delta.length
            new_point = branch.fermat
            couple = branch.couple

            delta[new_index] =
              index: new_index
          else
            null
        # main loop
        i = 0
        total_delta = 0
        while i < 99 || delta[0].delta[0]?.delta < 0.0000000001
          # pick a branch
          branch = delta[0].delta[0]
          total_delta += branch.delta
          update_delta()
          i++

      fermat2point: (fermat, couple, length) ->
        if fermat
          fermat:
            x: fermat.x
            y: fermat.y
            index: length
            fermat: true
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

      test_fermat: ->
        point = (x, y) -> x: x, y: y
        p0 = point 0, 0
        p1 = point 0, 100
        p2 = point 100, 0
        p3 = point -300, 0
        f1 = Utils.fermat p0, p1, p2
        f2 = Utils.fermat p0, p1, p3
        d1 = @distance(p0, p1) + @distance(p0, p2)
        d2 = @distance(p0, p1) + @distance(p0, p3)
        fd1 = @distance(f1, p0) + @distance(f1, p1) + @distance(f1, p2)
        fd2 = @distance(f2, p0) + @distance(f2, p1) + @distance(f2, p3)
        [
          fermat: f1
          distance: d1
          fermat_distance: fd1
          rate: fd1 / d1
        ,
          fermat: f2
          distance: d2
          fermat_distance: fd2
          rate: fd2 / d2
        ]

      test_random: ->
        random_points = []
        i = 0
        k = 5
        num = @width / 2
        while i < num
          x = Math.random()
          x = (x - 0.5) / Math.abs(x - 0.5) * Math.random() * k
          y = Math.pow(Math.sqrt(Math.PI * 2), -1) * Math.pow(Math.E, Math.pow(x, 2) * 0.5 * -1)
          x = (x / k + 1) * @width / 2
          y = y * @height * 2 + 10
          random_points.push
            x: x
            y: y
            index: i
          i++
        @random_points = random_points

      randomX: (x) ->
          x + 3 * ((x - @width / 2) / Math.abs(x - @width / 2))

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
  stroke: transparent;
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
  stroke-width: 2;
  stroke-opacity: 0.5;
}

.fermat {
  stroke: firebrick;
  stroke-opacity: 0.5;
  fill: firebrick;
  font-size: 1rem;
}

.random {
  font-size: 0.5rem;
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
