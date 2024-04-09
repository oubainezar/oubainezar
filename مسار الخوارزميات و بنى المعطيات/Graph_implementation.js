class Graph{
  constructor(numVertices){
    this.adjacencyMatrix = Array.from({length: numVertices}, () => Array(numVertices).fill(0));
    this.vertecesIndex = {};
    this.vertecesValues = [];
    this.numVertices = numVertices;
  }
  addVertex(id, vtx){
    if(vtx <= this.numVertices && vtx >= 0){
      this.vertecesIndex[id] = vtx;
      this.vertecesValues[vtx] = id;
    }
    else{
      return console.log("sorry the graph is full or, the vtx is less than 0.");
    }
  }
  addEdge(frm, to, cost = 1){
    frm = this.vertecesIndex[frm];
    to = this.vertecesIndex[to];
    this.adjacencyMatrix[frm][to] = cost;
  }
  getVerteces(){
    if(this.vertecesValues.length >= 1) return this.vertecesValues;
    return console.log("the graph is empty.");
  }
  getMatrix(){
    return this.adjacencyMatrix;
  }
}
let graph = new Graph(3);
graph.addVertex("A", 0);
graph.addVertex("B", 1);
graph.addVertex("C", 2);

graph.addEdge("A", "C", 20);
graph.addEdge("C", "B", 30);
graph.addEdge("B", "A", 10);


