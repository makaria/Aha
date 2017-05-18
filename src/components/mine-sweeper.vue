<template>
  <div>
    <h2>Mine Sweeper</h2>
    <div class="board">
      <table summary="Mine Sweeper" class="table">
        <thead>
          <th :colspan="colspan">
            <div v-text="remained" class="counter"></div>
          </th>
          <th :colspan="interval"></th>
          <th colspan="2">
            <img @click="init" :src="'./static/img/' + img">
          </th>
          <th :colspan="interval"></th>
          <th :colspan="colspan">
            <div v-text="counter" class="counter"></div>
          </th>
        </thead>
        <tbody>
          <tr v-for="j in row">
            <template v-for=" i in col">
              <td v-text="cellStatus(i, j)" :class="cellClass(i, j)" @contextmenu.prevent @mousedown.prevent="mouse($event, i, j)">
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
    colspan: 4
    finished: false
    exploded: false
    exposed: 0
    flaged: 0
    cells: {}
    exposes: {}
    flags: {}
    neighbor: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]

  computed:
    img: ->
      if @exploded
        'sad.gif'
      else if @exposed == (@row * @col) - @mines
        'happy.gif'
      else
        'peace.gif'

    mines: ->
      if @risk
        @risk
      else
        if @col == 30 && @row == 16
          99
        else if @col == 8 && @row == 8 || @col == 16 && @row == 16
          10
        else
          10 * Math.round @col * @row * @density * 0.1

    remained: ->
      @mines - @flaged

    interval: ->
      (@col - @colspan * 2 - 2) * 0.5

  created: ->
    @init()

  activated: ->
    console.log 'activated'
    document.body.style.backgroundColor="#666666"

  deactivated: ->
    console.log 'deactivated'
    document.body.style.backgroundColor="#ffffff"

  methods:
    init: ->
      console.log 'init'
      @exploded = false
      @exposed = 0
      @counting = false
      @counter = '∞'
      @cells = {}
      @createCells()
      @createMines()
      @updateNeighbor()

    count: ->
      if @exploded then return
      @counting = true
      @counter += 1
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
        else
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
            neighbor: []
            #危险的数目
            mines: 0
      @cells = cells

    createMines: (shuffle)->
      duplicate = 0
      mined = 0
      if !shuffle
        shuffle = Utils.shuffle Object.keys(@cells), @mines
      for key in shuffle
        if !@cells[key].mined
          @cells[key].mined = true
          mined += 1
        else
          duplicate += 1
      if mined != @mines
        console.error shuffle, mined

    clearMines: ->
      for key, cell of @cells
        cell.mined = false
        cell.mines = 0
        cell.neighbor = []

    updateNeighbor: ->
      cells = JSON.parse JSON.stringify @cells
      for key, cell of cells
        neighbors = @getNeighbor cell
        cell.neighbor = neighbors.neighbor
        cell.mines = neighbors.mines
      @cells = cells

    getNeighbor: (cell) ->
      neighbors = []
      mines = 0
      @neighbor.forEach (v) =>
        x = v[0] + cell.x
        y = v[1] + cell.y
        key = @key x, y
        neighbor = @cells[key]
        if neighbor
          neighbors.push neighbor
          if neighbor.mined
            mines += 1
      neighbor: neighbors
      mines: mines

    moveMines: (cell) ->
      console.log 'move mines'
      array = []
      array.push cell
      array = array.concat cell.neighbor
      keys = Object.keys @cells
      keys = keys.filter (key) ->
        a = key.split('-')
        index = array.findIndex (b) -> b.x == ~~a[0] && b.y == ~~a[1]
        index == -1
      shuffle = Utils.shuffle keys, @mines
      @clearMines()
      @createMines shuffle
      @updateNeighbor()

    mouse: (e, i, j) ->
      console.log i, j
      if @exposed == 0 && !@counting
        @counter = 0
        @count()
      key = @key i, j
      cell = @cells[key]
      if cell.exposed then return
      if e.button == 0
        @sweep cell
      else if e.button == 2
        @flag cell


    sweep: (cell) ->
      console.log 'sweep'
      if cell.flaged == 'flaged' then return
      if @exposed == 0 && (cell.mined || cell.mines > 0)
          @moveMines cell
          key = @key cell.x, cell.y
          @expose @cells[key]
      else if cell.mined
          @explode cell
      else
        @expose cell

    flag: (cell) ->
      console.log 'flag'
      flags = ['flaged', 'unsettled', false]
      index = flags.indexOf cell.flaged
      if index == flags.length - 1
        cell.flaged = flags[0]
        @flaged += 1
      else
        cell.flaged = flags[index+1]
        if index == 0
          @flaged -= 1

    expose: (cell) ->
      if cell.exposed == true then return
      cell.exposed = true
      @exposed += 1
      if cell.mines == 0
        for neighbor in cell.neighbor
          key = @key neighbor.x, neighbor.y
          nb = @cells[key]
          @expose nb

    explode: (cell) ->
      console.log 'explode'
      cell.exploded = true
      @exploded = true




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
  margin: 0.5em;
  border: 1px inset #eeeeee;
  padding-right: 3px;
  width: 2.75em;
  background-color: #000000;
  color: #ff6666;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
  text-align: right;
}
</style>
