let graph = [
    {"source": "A", "destination": "B", "weight": 20},
    {"source": "A", "destination": "C", "weight": 9},
    {"source": "A", "destination": "D", "weight": 10},
    {"source": "B", "destination": "C", "weight": 13},
    {"source": "C", "destination": "D", "weight": 11},
    {"source": "C", "destination": "F", "weight": 8},
    {"source": "D", "destination": "E", "weight": 15},
    {"source": "E", "destination": "F", "weight": 12},
    {"source": "F", "destination": "B", "weight": 7},
]
class UnionFind{
    constructor(elements){
        this.parent = {};

        elements.forEach((element) => this.parent[element] = element);
    }
    find(vertex){
        while(this.parent[vertex] !== vertex){
            vertex = this.parent[vertex];
        }
        return vertex;
    }
    union(src, des){
        this.parent[this.find(src)] = this.find(des);
    }
    connected(src, des){
        return this.find(src) === this.find(des);
    }
}
function Kruskal(graph){
    graph.sort((a, b) => a.weight - b.weight);
    let vertices = new Set(graph.map(e => [e.source, e.weight]).flat());
    let union_find = new UnionFind(vertices);
    let MST = [];
    for(let edge of graph){
        if(!union_find.connected(edge.source, edge.destination)){
            union_find.union(edge.source, edge.destination);
            MST.push(`${edge.source} ---> ${edge.destination} = ${edge.weight}`);
        }
    }
    return MST;
}

console.log(Kruskal(graph));

