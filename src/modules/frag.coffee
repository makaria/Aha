border = []
vertex = []
#所有的边
points = JSON.parse JSON.stringify @points
if @moving
  points.splice @index, 0,
    x: @current.x
    y: @current.y
    index: @index
edges = Utils.combinations points, 2
edges.forEach (edge) =>
  border.push
    0: edge[0]
    1: edge[1]
    distance: @distance edge[0], edge[1]
#每个顶点对应的边
border.sort (a, b) -> a.distance - b.distance
for p, i in points
  vertex[i] = []
  for b in border
    if @same p, b[0]
      vertex[i].push
        couple: b[1]
        distance: b.distance
    else if @same p, b[1]
      vertex[i].push
        couple: b[0]
        distance: b.distance
  vertex[i].sort (a, b) -> a.distance - b.distance
@border = border
@vertex = vertex



 # result =
      #   fermat: #false
      #     point:
      #       x: x
      #       y: y
      #       index: index
      #   couple: [
      #     point:
      #       x: x
      #       y: y
      #       index: index
      #     distance: distance
      #   ,
      #     point:
      #       x: x
      #       y: y
      #       index: index
      #     distance: distance
      #   ]
angel_a = @abs_angel couple[0], couple[1]
angel_b = @abs_angel couple[1], couple[2]
angel_c = @abs_angel couple[0], couple[2]
if @equal_angel angel_a && @equal_angel angel_b
  fermat_vertex[index] = @point2fv fermat, couple
else
  min = Math.min angel_a, angel_b, angel_c
  if min == angel_a
    fermat = @fermat point, couple[0], couple[1]
  else if min == angel_b
    fermat = @fermat point, couple[1], couple[2]
  else
    fermat = @fermat point, couple[0], couple[2]
  #add to fermat_vertex
  @fermat2vertex fermat, vertex
  @update_vertex vertex
