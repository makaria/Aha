<template>
  <div>
    <h2>Mine Sweeper</h2>
    <div class="board">
      <table summary="Mine Sweeper"
             class="table">
        <thead>
          <th :colspan="colspan">
            <div v-text="remained"
                 class="counter"></div>
          </th>
          <th v-if="interval >= 1"
              :colspan="interval"></th>
          <th :colspan="img_colspan">
            <img @click="init"
                 :src="'./static/img/' + img">
          </th>
          <th v-if="interval >= 1"
              :colspan="interval"></th>
          <th :colspan="colspan">
            <div v-text="counter"
                 class="counter"></div>
          </th>
        </thead>
        <tbody>
          <tr v-for="j in row" :key="j">
            <template v-for=" i in col">
              <td v-text="cellStatus(i, j)"
                  :key="i"
                  :class="cellClass(i, j)"
                  @contextmenu.prevent
                  @mousedown.prevent="mouse($event, i, j)">
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="coffee">
import Utils from '../modules/utils.coffee'


export default m =
  name: 'minesweeper'
  data: ->
    risk: null
    #mines: 99
    density: 0.15625
    counter: '∞' # ∞, ☀, ×
    counting: false
    col: 30
    row: 16
    # colspan: 4
    # finished: false
    exploded: false
    exposed: 0
    flaged: 0
    cells: {}
    # exposes: {}
    # flags: {}
    neighbor: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]

    playing: false
    last_time: 0
    duplicate_counter: 0
    luckiness: 0

  computed:
    colspan: ->
      if @col >= 10
        4
      else
        (@col - 2) * 0.5

    img_colspan: ->
      if @col % 2 == 0
        2
      else
        3

    img: ->
      if @exploded
        'sad.gif'
      else if @exposed == @empty
        'happy.gif'
      else
        'peace.gif'

    mines: ->
      if @risk
        @risk
      else
        if @col == 30 && @row == 16
          99
        else if @col == 16 && @row == 16
          40
        else if @col == 9 && @row == 9 || @col == 16 && @row == 16
          10
        else
          10 * Math.round @col * @row * @density * 0.1

    empty: ->
      @row * @col - @mines

    remained: ->
      @mines - @flaged

    interval: ->
      (@col - @colspan * 2 - 2) * 0.5

  created: ->
    @init()

  mounted: ->
    document.addEventListener 'visibilitychange', @handleVisibility, false

  activated: ->
    # console.log 'activated'
    document.title = 'Mine Sweeper'
    document.body.style.backgroundColor = '#666666'
    @togglePause()

  deactivated: ->
    # console.log 'deactivated'
    @togglePause()
    document.body.style.backgroundColor = '#ffffff'

  methods:
    init: ->
      # console.log 'init'
      @exploded = false
      @flaged = 0
      @exposed = 0
      @counting = false
      @counter = '∞'
      @duplicate_counter = 0
      @cells = {}
      @createCells()
      @createMines()
      # @updateNeighbor()

    handleVisibility: ->
      # console.log document.hidden, document.visibilityState
      @togglePause()

    togglePause: ->
      @playing = !@playing
      if @counting
        # todo: 快速切换会导致多个count运行
        @count()
        if @playing
          console.info 'continue'
        else
          console.info 'pause'

    count: ->
      if !@counting || !@playing then return
      if Date.now() - @last_time >= 1000
        @counter += 1
        @last_time = Date.now()
      else
        @duplicate_counter += 1
      setTimeout =>
        @count()
      , 1000

    key: (i, j) ->
      i + '-' + j

    isExposed: (i, j) ->
      key = @key i, j
      cell = @cells[key]
      if cell && cell.exposed
        true
      else
        false

    cellStatus: (i, j) ->
      key = @key i, j
      cell = @cells[key]
      if @exploded
        if cell.flaged == 'flaged'
          if cell.mined
            '!'
          else
            '×'
        else if cell.mined
          '☀'
        else if cell.mines > 0
          cell.mines
        else
          ''
      else if cell.exposed
        if cell.mines > 0
          cell.mines
        else
          ''
      else if cell.flaged == 'flaged'
        '!'
      else if cell.flaged == 'unsettled'
        '?'
      else
        ''

    cellClass: (i, j) ->
      key = @key i, j
      cell = @cells[key]
      array = []
      if @exploded
        if cell.flaged == 'flaged'
          if !cell.mined
            array.push 'incorrect'
            array.push 'exposed'
        # 不把所有的cell都改为'exposed'， 因为那样一旦explode，变化会让人(胆小鬼)吓一跳
        else if cell.exposed || cell.mined
          array.push 'exposed'
        if cell.exploded
          array.push 'exploded'
        else if !cell.mined && cell.mines > 0 && !cell.flaged
          array.push 'm' + cell.mines
      else if cell.exposed
        array.push 'exposed'
        if cell.mines > 0
          array.push 'm' + cell.mines
      array

    createCells: ->
      cells = {}
      for i in [1..@col]
        for j in [1..@row]
          key = @key i, j
          cells[key] =
            x: i
            y: j
            #是mine吗？
            mined: false
            #被flag了吗？
            flaged: false
            #Not a Mine
            exposed: false
            #"可爱的邻居"
            neighbor: @createNeighbor i, j
            #危险的数目
            mines: 0
      @cells = cells

    createNeighbor: (i, j) ->
      neighbor = @neighbor.map (n) -> x: n[0] + i, y: n[1] + j
      neighbor = neighbor.filter (n) => 1 <= n.x <= @col && 1 <= n.y <= @row
      neighbor

    createMines: (shuffle)->
      duplicate = 0
      mined = 0
      if !shuffle
        shuffle = Utils.shuffle Object.keys(@cells), @mines
      for key in shuffle
        if !@cells[key].mined
          @cells[key].mined = true
          mined += 1
          @cells[key].neighbor.forEach (n) =>
            @cells[@key(n.x, n.y)].mines += 1
        else
          duplicate += 1
      if mined != @mines
        console.error shuffle, mined

    clearMines: ->
      for key, cell of @cells
        cell.mined = false
        cell.mines = 0

    moveMines: (cell) ->
      # console.log 'move mines'
      array = []
      array.push cell
      array = array.concat cell.neighbor
      keys = Object.keys @cells
      fkeys = keys.filter (key) ->
        a = key.split('-')
        index = array.findIndex (b) -> b.x == ~~a[0] && b.y == ~~a[1]
        index == -1
      shuffle = Utils.shuffle fkeys, @mines
      @clearMines()
      @createMines shuffle
      # @updateNeighbor()

    mouse: (e, i, j) ->
      if @exploded || @exposed == @empty then return
      key = @key i, j
      cell = @cells[key]
      if e.button == 0
        @sweep cell
      else if e.button == 2
        @flag cell


    sweep: (cell) ->
      # console.log 'sweep'
      if cell.flaged == 'flaged' then return
      if @exposed == 0
        if cell.mined || cell.mines > 0
          @moveMines cell
        @counting = true
        @counter = 0
        @count()
        # 参数cell需要更新为新的cell
        key = @key cell.x, cell.y
        @expose @cells[key]
      else if cell.mined
        @explode cell
        # @lucky cell
      else
        if cell.exposed
          @expose_neighbor cell
        else
          @expose cell

    flag: (cell) ->
      # console.log 'flag'
      if @exposed == 0 then return
      if cell.exposed
        @flag_neighbor cell
      else
        switch cell.flaged
          when 'flaged'
            cell.flaged = 'unsettled'
            @flaged -= 1
          when 'unsettled'
            cell.flaged = false
          else
            cell.flaged = 'flaged'
            @flaged += 1

    flag_neighbor: (cell) ->
      cells = cell.neighbor.map (c) => @cells[@key c.x, c.y]
      mines = cells.map (c) -> Number !c.exposed
      .reduce (a, b) -> a + b
      if mines >= cell.mines
        cells.filter (c) -> !c.exposed && !c.flaged
        .forEach (c) =>
          @flag c
          return

    expose: (cell) ->
      if cell.exposed then return
      cell.exposed = true
      @exposed += 1
      if cell.mines == 0
        cell.neighbor.map (c) => @cells[@key c.x, c.y]
        .forEach (n) =>
          @expose n
          return
      @win()

    expose_neighbor: (cell) ->
      # mines = 0
      cells = cell.neighbor.map (c) => @cells[@key c.x, c.y]
      mines = cells.map (c) -> Number c.flaged == 'flaged'
      .reduce (a, b) -> a + b
      if mines >= cell.mines
        cells.filter (n) ->
          n.flaged != 'flaged'
        .forEach (n) =>
          if n.mined
            @explode n
            return
          else
            @expose n
            return
        return

    win: ->
      if @exposed == @empty
        @counting = false
        console.info 'WIN'

    explode: (cell) ->
      # console.log 'explode'
      cell.exploded = true
      @exploded = true
      @counting = false
      console.info 'LOSE'


    # todo: 解决有时候无法判断是雷是哪个的局面, 自动flag或expose
    # 完全无运气成分的布雷方式是怎样的呢？
    # 几率也是乐趣之一
    # 本cell需要满足的条件:
    # 1. 周边exposed的cell的mines数大于它的周边的正确flaged数
    # 2. 周边未exposed的cell都是无法判别的/已经正确flaged的或周边都是未exposed的
    # 在此只验证条件1， 假设正确flaged、周围都是无法判别的预先成立。
    lucky: (cell) ->
      # 所有neighbor
      cells = cell.neighbor.map (c) => @cells[@key c.x, c.y]
      # 非mined&&非flaged的
      innocent_cells = cells.filter (c) => !c.exposed && c.flaged != 'flaged' && !c.mined
      # exposed的
      exposed_cells = cells.filter (c) -> c.exposed
      # 没有替罪羊，只能explode
      if innocent_cells.length == 0
        @explode cell
        return
      else if exposed_cells.length == 0
        @flag cell
        @luckiness += 1
        return
      # 检查本cell的周边已exposed的推断情况，如果数字大于flag数，则可能有雷
      doubt = (exposed) =>
        exposed_neighbor = exposed.neighbor.map (n) => @cells[@key n.x, n.y]
        exposed_unexposed = exposed_neighbor.filter (n) -> !n.exposed
        # 假设周边的flag都是正确的flaged
        exposed_flags = exposed_neighbor.map (n) -> Number n.flaged == 'flaged'
        .reduce (a, b) -> a + b
        # 周边有隐藏的mine
        if exposed_unexposed.length > exposed.mines - exposed_flags > 0
          true
          # exposed_doubt = exposed_unexposed.map (n) =>
          #   exposed_index = innocent_cells.findIndex (i) -> i.x == n.x && i.y == n.y
          #   Number exposed_index != -1
          # .reduce (a, b) -> a + b
          # console.log exposed_doubt
          # if exposed_doubt > 0
          #   true
          # else
          #   false
        # 周边无隐藏的mine
        else
          false
      doubtful = exposed_cells.map (e) -> doubt e
      .reduce (a, b) -> a && b
      if doubtful
        @flag cell
        @luckiness += 1
      else
        @explode cell



</script>


<style scoped>
/*
css copied from: https://birrell.org/andrew/minesweeper/
*/

h2 {
  color: white;
}

.board {
  display: inline-block;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  text-align: left;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  -webkit-user-select: none;
}

.table {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-spacing: 0px;
  background-color: #666666;
  color: #000000;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  -webkit-user-select: none;
}

td,
th {
  margin: 0px;
  border: 2px solid;
  border-color: #eeeeee #999999 #999999 #eeeeee;
  background-color: #cccccc;
  padding: 0px;
  vertical-align: middle;
  text-align: center;
}

td {
  box-sizing: border-box;
  /* avoids jumpiness when zoomed */
  width: 1.5rem;
  max-width: 1.5rem;
  /* avoids being resized if text is too long (iOS) */
  min-width: 1.5rem;
  height: 1.5rem;
  min-height: 1.5rem;
  max-height: 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.1rem;
  cursor: pointer;
}

img {
  width: 1.5rem;
  height: 1.5rem;
  margin: 2px;
  border: 3px groove #eeeeee;
  padding: 0.3rem;
  vertical-align: middle;
  cursor: pointer;
}

.exposed {
  background-color: #bbbbbb;
  border-width: 1px;
  border-color: #999999;
  padding: 1px;
  cursor: default;
}

.exploded,
.incorrect {
  color: #ff0000;
}

.m1 {
  color: #3333cc;
}

.m2 {
  color: #006600;
}

.m3 {
  color: #cc0000;
}

.m4 {
  color: #660066;
}

.m5 {
  color: #006666;
}

.counter {
  margin: 0.25em;
  border: 1px inset #eeeeee;
  padding-right: 3px;
  /*width: 2.75em;*/
  background-color: #000000;
  color: #ff6666;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
  text-align: right;
}
</style>
