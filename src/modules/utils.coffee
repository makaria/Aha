export default m =
  permutations: (arr, num) ->
    r = []
    pmt = (t, a, n) ->
      if n == 0
        return r.push(t)
      i = 0
      l = a.length
      while i < l
        pmt t.concat(a[i]), a.slice(0, i).concat(a.slice(i + 1)), n - 1
        i++
      return
    pmt [], arr, num
    r

  combinations: (arr, num) ->
    r = []
    com = (t, a, n) ->
      if n == 0
        return r.push(t)
      i = 0
      l = a.length
      while i <= l - n
        com t.concat(a[i]), a.slice(i + 1), n - 1
        i++
      return
    com [], arr, num
    r

  shuffle: (array, count) ->
    length = array.length
    result = []
    if !count?
      count = length
    while length and result.length < count
      i = Math.floor Math.random() * length--
      t = array[length]
      array[length] = array[i]
      array[i] = t
      result.push array[length]
    result

  fermat: (a, b, c) ->
    mirror = (a, b, c) ->
      a.y = a.y * -1
      b.y = b.y * -1
      c.y = c.y * -1

    vector = (pa, pb) ->
      [pb.x - pa.x, pb.y - pa.y]

    sub_vector = (va, vb) ->
      [va[0] - vb[0], va[1] - vb[1]]

    normal = (v, dir) ->
      na = [v[1], v[0] * -1]
      nb = [v[1] * -1, v[0]]
      dot_a = na[0] * dir[0] + na[1] * dir[1]
      if dot_a < 0
        na
      else
        nb

    triangle = (v, n) ->
      [(v[0] + Math.sqrt(3) * n[0]) * 0.5, (v[1] + Math.sqrt(3) * n[1]) * 0.5]

    line = (v, p) ->
      a: v[1]
      b: v[0] * -1
      c: v[0] * p.y - v[1] * p.x

    intersection = (l1, l2) ->
      x: (l1.b * l2.c - l2.b * l1.c) / (l1.a * l2.b - l2.a * l1.b)
      y: (l2.a * l1.c - l1.a * l2.c) / (l1.a * l2.b - l2.a * l1.b)

    vector_ab = vector a, b
    vector_ac = vector a, c
    normal_b = normal vector_ac, vector_ab
    normal_c = normal vector_ab, vector_ac
    vector_ae = triangle vector_ac, normal_b
    vector_af = triangle vector_ab, normal_c
    vector_be = sub_vector vector_ae, vector_ab
    vector_cf = sub_vector vector_af, vector_ac
    line_cf = line vector_cf, c
    line_be = line vector_be, b
    fermat = intersection line_be, line_cf
    fermat
