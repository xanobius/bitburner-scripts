/*
Proper 2-Coloring of a Graph
You are attempting to solve a Coding Contract.
You have 5 tries remaining, after which the contract will self-destruct.


You are given the following data, representing a graph:
[6,[[1,4],[0,3],[1,2],[2,5],[1,2]]]
Note that "graph", as used here, refers to the field of graph theory,
and has no relation to statistics or plotting.

The first element of the data represents the number of vertices in the graph.

Each vertex is a unique number between 0 and 5.

The next element of the data represents the edges of the graph.
Two vertices u,v in a graph are said to be adjacent if there exists an edge [u,v].
Note that an edge [u,v] is the same as an edge [v,u], as order does not matter.
You must construct a 2-coloring of the graph, meaning that you have to assign
each vertex in the graph a "color", either 0 or 1, such that no two adjacent vertices
have the same color. Submit your answer in the form of an array,
where element i represents the color of vertex i.

If it is impossible to construct a 2-coloring of the given graph, instead submit an empty array.

Examples:

Input: [4, [[0, 2], [0, 3], [1, 2], [1, 3]]]
Output: [0, 0, 1, 1]

Input: [3, [[0, 1], [0, 2], [1, 2]]]
Output: []
*/

export function twoColorGraph(input){
  const vertices = []
  // create vertices
  for(let i = 0; i < input[0]; i++){
    vertices.push({
      v: i,
      adjacents : [],
      color: -1
    })
  }

  // build graph edges
  input[1].forEach(edge => {
    let v1 = vertices.find(v => v.v === edge[0])
    let v2 = vertices.find(v => v.v === edge[1])

    if( ! v1.adjacents.find(a => a.v === edge[1])){
      v1.adjacents.push(v2)
      v2.adjacents.push(v1)
    }
  })

  let error = false;
  while(vertices.find(v => v.color === -1)){
    let uncolored = vertices.find(v => v.color === -1);
    uncolored.color = 0;

    if(uncolored.adjacents.filter(adj => adj.color === 0).length > 0){
      error = true;
      break;
    }

    uncolored.adjacents
      .filter(adj => adj.color === -1)
      .forEach(adj => {
          wanderThePath(adj, uncolored.v, false)
        }
      )
  }

  // console.log(error ? 'ERROR' : 'ALLES OKAY')
  // console.log(vertices)

  // back-check result
  error = vertices
    .filter(v => {
      return v.adjacents.filter(ad => ad.color === v.color).length !== 0
    }).length === 0 ? error : true

  // console.log('After failcheck: ' + (error ? 'ERROR' : 'Still shiny'))

  if(! error){
    // success!
    return vertices.map(v => v.color)
  }else{
    return []
  }
}

function wanderThePath(vertex, prior, black, safety = 0){
  if(safety >= 20) {
    console.log('safety kicked!')
    return
  }
  vertex.color = black ? 0 : 1
  vertex
    .adjacents
    .filter(adj => adj.v !== prior)
    .filter(adj => adj.color === -1)
    .forEach(adj => wanderThePath(adj, vertex.v, !black, ++safety))
}


export function runTwoColoringTestCases(ns){
  const case1 = [4, [[0, 2], [0, 3], [1, 2], [1, 3]]]
  const result1 = [0, 0, 1, 1]

  const case2 = [3, [[0, 1], [0, 2], [1, 2]]]
  const result2 = []

  const case3 = [14, [[2,6],[0,12],[5,11],[0,10],[0,11],[7,12],[2,12],
    [7,11],[6,13],[3,6],[2,11],[2,10],[4,5],[5,10],[7,10],[2,4],
    [11,12],[4,13],[3,8],[0,6],[3,4],[1,4],[3,11],[1,8],[4,7]
  ]
  ]
  const result3 = []

  ns.tprint('Test Case 1:')
  test(ns, case1, result1)

  ns.tprint('Test Case 2:')
  test(ns, case2, result2)

  ns.tprint('Test Case 3:')
  test(ns, case3, result3)
}

function test(ns, input, correctResult){
  const result = twoColorGraph(input);
  if(JSON.stringify(result) != JSON.stringify(correctResult)){
    ns.tprint('wrong result')
    ns.tprint(`expected: ${JSON.stringify(correctResult)}`)
    ns.tprint(`received: ${JSON.stringify(result)}`)
  }else{
    ns.tprint('correct result')
  }
}
