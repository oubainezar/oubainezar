class Graph{
    constructor(){
        this.graph = new Map();
        
    }
    addVertex(vertex){
        this.graph.set(vertex, []);
    }
    addEdge(src, des, weight){
        this.graph.get(src).push({vertex: des, weight});
        this.graph.get(des).push({vertex: src, weight});
    }
    Dijkstra(startVtx, endVtx){
        let distances = new Map();
        let previose = new Map();
        let priority_queue = new PriorityQueue();

        for(let vtx of this.graph.keys()){
            distances.set(vtx, vtx === startVtx? 0: Infinity);
            priority_queue.enqueue(vtx, distances.get(vtx));
            previose.set(vtx, null);
        }
        while(!priority_queue.isEmpty()){
            let currentVtx = priority_queue.dequeue();
            if(currentVtx == endVtx){
                let path = [];//to store the path.
                let current = endVtx;
                while(current != null){
                    path.unshift(current);
                    current = previose.get(current);
                } 
                return path;
            }
            let neighbors = this.graph.get(currentVtx);
            
            for(let neighbor of neighbors){
                let newDistance = distances.get(currentVtx) + neighbor.weight;
                if(newDistance<distances.get(neighbor.vertex)){
                    distances.set(neighbor.vertex, newDistance);
                    previose.set(neighbor.vertex, currentVtx);
                    priority_queue.enqueue(neighbor.vertex, newDistance);
                }
            }
        }
        return null;
    }
}
class PriorityQueue{
    constructor(){
        this.items = [];
    }
    enqueue(item, priority){
        this.items.push({item, priority});
        this.items.sort((a, b) => a.priority - b.priority);
    }
    dequeue(){
        return this.items.shift().item;
    }
    isEmpty(){
        return this.items.length === 0;
    }
}

// Example usage:
const graph = new Graph();

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

const shortestPath = graph.Dijkstra("A", "E");
console.log("Shortest Path:", shortestPath);
