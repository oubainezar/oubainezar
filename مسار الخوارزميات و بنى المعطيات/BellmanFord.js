class Graph {
    constructor(numVertices){
        this.graph = new Map();
        this.numVertices = numVertices;
    }
    addVertex(vertex){
        this.graph.set(vertex, []);
    }
    addEdge(src, des, weight){
        this.graph.get(src).push({vertex: des, weight});
    }
    Bellman_Ford(startVtx){
        let distances = new Table();
        let path = [];
        for(let vertex of this.graph.keys()){
            distances.addDistance(vertex, vertex === startVtx ? 0 : Infinity, null);
        }
        for(let i = 0; i < this.numVertices - 1; i++){
            for(let currentNode of this.graph.keys()){
                const neighbors = this.graph.get(currentNode);
                for(let neighbor of neighbors){
                    let currentDistance = distances.getDistance(currentNode);
                    if (currentDistance === Infinity) continue; // Skip unreachable vertices
                    let newDistance = currentDistance + neighbor.weight;
                    if(distances.getDistance(neighbor.vertex) > newDistance){
                        distances.addDistance(neighbor.vertex, newDistance, currentNode);
                    }
                }
            }
        }
        for(let edge of distances.table.keys()){
            if(distances.getPrevious(edge) !== null){
                let previous = distances.getPrevious(edge);
                path.push(`${previous} --> ${edge} = ${distances.getDistance(edge)}`);
            }
        }
        return path;
    }
}
class Table{
    constructor(){
        this.table = new Map();
    }
    addDistance(vertex, distance, previous){
        this.table.set(vertex, {distance, previous});
    }
    getDistance(vertex){
        return this.table.get(vertex).distance;
    }
    getPrevious(vertex){
        return this.table.get(vertex).previous;
    }
}

const graph = new Graph(5);

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("D", "E", 3);

const shortestPath = graph.Bellman_Ford("A");
console.log(shortestPath);

