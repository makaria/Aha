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
