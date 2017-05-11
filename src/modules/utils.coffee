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
