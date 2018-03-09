<template>
  <div id="chatnoir">
    <h2 v-text="status"></h2>
    <!-- control -->
    <!--<div class="action">
                  <button @click="init">Play</button>
                  <button @click="toggle_path" v-text="pathText">Show Path</button>
                  <button @click="toggle_coord" v-text="coordText">Show Coord</button>
                  <button @click="toggle_insight" v-text="insightText">Show Insight</button>
                </div>-->
    <!-- board -->
    <div class="board">
      <svg :width="width"
           :height="height"
           @contextmenu.prevent>
        <g :transform="transform">
          <aha-hexagon v-for="(cell, key) in pixels"
                       :key="key"
                       :cell="cell"
                       :showCoord="showCoord"
                       :radius="radius"
                       :interval="interval">
          </aha-hexagon>
        </g>
      </svg>
    </div>
  </div>
</template>

<script lang="coffee">
export default m =
  name: 'chatnoir'
  data: ->
    #config
    radius: 24 #cell半径
    col: 11 #cell列数
    row: 11 #cell行数
    interval: 1.5 #cell间距, CSS即可，没什么更改的意义
    block_num: 10 #起始block数目
    showPath: false
    showCoord: false
    showInsight: false
    lazyPath: true #是否寻找新的path，如果新pick的点不在原本的path上。没什么用

    step: 0 #pick的次数，走的步数
    revert: 0
    finish: null
    cells: {} #所有的cell集合
    selected: {} #selected的cell集合
    cat: {} #cat所在cell
    path: [] #cat的行动路线

    #用来计算cell的neighbor
    even: [
      [1, -1], [1, 0], [1, 1], [0, 1], [-1, 0], [0, -1]
    ]
    odd: [
      [0, -1], [1, 0], [0, 1], [-1, 1], [-1, 0], [-1, -1]
    ]

    #dev only
    bfs: {}
    dev: false

  computed:
    width: ->
      (@radius + @interval) * (@col + 1) * 2

    height: ->
      (@radius + @interval) * @row * 2 * 0.9

    transform: -> "translate(#{@radius}, #{@radius})"

    pixels: ->
      pixels = {}
      for key, cell of @cells
        pixels[key] = {}
        pixels[key].x = cell.x
        pixels[key].y = cell.y
        if cell.selected
          pixels[key].selected = true
        else
          pixels[key].selected = false
        if key == @hex2key(@cat)
          pixels[key].caught = true
        else
          pixels[key].caught = false
        if @showPath && cell.path
          pixels[key].path = true
        else
          pixels[key].path = false
        if @showInsight && cell.insight
          pixels[key].insight = true
        else
          pixels[key].insight = false
      pixels

    status: ->
      switch @finish
        when 'win'
          'POOR CAT' + ' ' + @step
        when 'lose'
          'NEKO RUN'
        else
          'Chat Noir' + ' ' + @step

    pathText: ->
      if @showPath
        'Hide Path'
      else
        'Show Path'

    coordText: ->
      if @showCoord
        'Hide Coord'
      else
        'Show Coord'

    insightText: ->
      if @showInsight
        'Hide Insight'
      else
        'Show Insight'

  created: ->
    @init()

  activated: ->
    # console.log 'activated'
    document.title = 'Chat Noir'

  methods:
    init: ->
      @cat = @point 5, 5
      @selected = {}
      @finish = null
      @step = 0
      @create_cell()
      @create_block()
      @update_path()
      @is_finish()
      @draw_path()

    create_cell: ->
      cells = {}
      for x in [0...@col]
        for y in [0...@row]
          key = @hex_key x, y
          cells[key] = @point x, y
          cells[key].selected = false
          cells[key].caught = false
          cells[key].path = false
          cells[key].insight = false
      @cells = cells

    create_block: ->
      if @dev then return
      blocked = {}
      i = 0
      cat_key = @hex2key @cat
      while i < @block_num
        x = Math.trunc Math.random()*@col
        y = Math.trunc Math.random()*@row
        key = @hex_key x, y
        if key != cat_key && !@cells[key].selected
          blocked[key] = @point x, y
          @cells[key].selected = true
          i++
      @selected = blocked

    toggle_path: ->
      @showPath = !@showPath

    toggle_coord: ->
      @showCoord = !@showCoord

    toggle_insight: ->
      @showInsight = !@showInsight

    hex_key: (x, y) ->
      x + '-' + y

    hex2key: (a) ->
      @hex_key a.x, a.y

    hex_neighbor: (x, y) ->
      array = []
      if (y&1)
        @even.forEach (a) =>
          array.push @point a[0]+x, a[1]+y
      else
        @odd.forEach (a) =>
          array.push @point a[0]+x, a[1]+y
      array

    point: (x, y) ->
      x: x, y: y

    hex: (x, y, z) ->
      x: x, y: y, z: z

    point2hex: (x, y) ->
      @hex x, y, 1-x-y

    hex_border: (cell) ->
      cell.x == 0 || cell.y == 0 || cell.x == @col-1 || cell.y == @row-1

    out_of_hex: (cell) ->
      cell.x < 0 || cell.y < 0 || cell.x > @col-1 || cell.y > @row-1

    pick: (x, y) ->
      if @finish then return
      # console.log x, y
      key = @hex_key x, y
      cell = @point x, y
      @selected[key] = cell
      @cells[key].selected = true
      if !@dev
        @step += 1
        @lazy_next cell
      else
        num = Object.keys(@selected).length
        random = Math.random()
        if random < Math.pow 2, num - @block_num
          @step += 1
          @lazy_next cell

    unpick: (x, y) ->
      if @finish
        @finish = null
      # console.log x, y
      key = @hex_key x, y
      cell = @point x, y
      @selected[key] = null
      @cells[key].selected = false
      @revert += 1
      @update_path()
      # @is_finish()
      # @next()


    next_path: (x, y, pathy) ->
      if @finish || !@showInsight then return
      if @lazyPath && !pathy
        #只需在mouseout时运行一次
        return
        #@draw_path @path, 'insight'
      else
        key = @hex_key x, y
        cell = @point x, y
        blocked = JSON.parse JSON.stringify @selected
        if !blocked[key]
          blocked[key] = cell
        bfs = @get_bfs null, blocked
        path = @get_path bfs
        @draw_path path, 'insight'

    reset_path: (pathy) ->
      if @lazyPath && pathy
        @draw_path @path, 'insight'

    get_goals: (cost_so_far) ->
      array = []
      #先找出边界cell, 需要更简单的code
      distance = null
      for key, value of cost_so_far
        do (key) =>
          x = ~~key.split('-')[0]
          y = ~~key.split('-')[1]
          cell = @point x, y
          if @hex_border cell
            cell.distance = value
            array.push cell
            if !distance? || distance > cell.distance
              distance = cell.distance
      #根据cell的距离排序，然后选取距离最短的cells
      array.sort (a, b) -> a.distance - b.distance
      #distance = array[0].distance
      array.filter (a) -> a.distance == distance

    get_bfs: (maxMovement, blocked) ->
      if !maxMovement
        maxMovement = (@col + 1) * (@row + 1)
      if !blocked
        blocked = @selected
      @breadth_first_search @cat, maxMovement, blocked

    get_path: (bfs) ->
      path = []
      goals = @get_goals bfs.cost_so_far
      #选取goals中的一个作为路径的终点，这儿选的是第一个
      random = Math.round Math.random() * (goals.length - 1)
      goal = goals[random]
      #从终点到起点cat的路径
      p = goal
      while p && @hex2key(p) != @hex2key(@cat)
        path.push p
        p = bfs.came_from[@hex2key(p)]
      #反转path，这样path的第一个就是cat的下一步
      path.reverse()

    update_path: ->
      bfs = @get_bfs null, @selected
      path = @get_path bfs
      @bfs = bfs
      @path = path

    #移动cat到下一个cell
    next: ->
      if !@finish
        cat = @path.shift()
        @cells[@hex2key(@cat)].caught = false
        @cells[@hex2key(cat)].caught = true
        @cat = cat
        @is_finish()
      @draw_path()

    lazy_next: (cell) ->
      if @lazyPath && cell
        #pick不会导致路径变短。新pick的点如果不在之前计算的path上，此path依然是最短的，不用重新计算。
        index = @path.findIndex (p) -> p.x == cell.x && p.y == cell.y
        if index != -1
          @update_path()
          @is_finish()
      @next()

    is_finish: ->
      #必须先判断输，再判断赢
      if @hex_border @cat
        @finish = 'lose'
      else if @path.length == 0
        @finish = 'win'
      if @finish
        setTimeout =>
          @init()
        , 2000

    draw_path: (path, type)->
      if !path
        path = @path
      if !type
        type = 'path'
      for key, cell of @cells
        index = path.findIndex (p) -> p.x == cell.x && p.y == cell.y
        if index != -1
          cell[type] = true
        else
          cell[type] = false

    breadth_first_search: (start, maxMovement, blocked) ->
      start_key = @hex2key start
      cost_so_far =
        "#{start_key}": 0
      came_from =
        "#{start_key}": null
      fringes = [ [ start ] ]
      k = 0
      while k < maxMovement && fringes[k].length > 0
        fringes[k + 1] = []
        for cell in fringes[k]
          neighbors = @hex_neighbor cell.x, cell.y
          for neighbor in neighbors
            key = @hex2key neighbor
            if !cost_so_far[key] && !blocked[key] && !@out_of_hex neighbor
              cost_so_far[key] = k + 1
              came_from[key] = cell
              fringes[k + 1].push neighbor
        k++
      cost_so_far: cost_so_far
      came_from: came_from

</script>

<style scoped>
div.action {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 0 2.5rem 1rem 0;
}

div.board {
  display: flex;
  flex: auto;
  justify-content: center;
  margin: 0 0 0 2rem;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  -webkit-user-select: none;
}

/*
div.action > div {
  margin: 0 3rem 0 0;
}
*/

button {
  height: 2rem;
  min-width: 6rem;
  border: none;
  cursor: pointer;
  background: #c6ff00;
  margin: 0 1rem;
}
</style>
