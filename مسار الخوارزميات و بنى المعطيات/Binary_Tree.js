class Node {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
        this.parent = null;
    }
}

class Queue {
    constructor() {
        this.items = [];
        this.front = -1;
        this.rear = 0;
    }

    isEmpty() {
        return this.front === -1;
    }

    enqueue(value) {
        if (this.isEmpty()) {
            this.front++;
        }
        this.items[this.rear] = value;
        this.rear++;
    }

    dequeue() {
        if (this.isEmpty()) {
            return console.log("The Queue is Empty.");
        }
        const front = this.items[this.front];
        this.front++;
        return front;

    }
}

class BinaryTree {
    constructor(length) {
        this.root = null;
        this.length = length;
    }

    BreadthFirstTraversal(root) {
        if(root == null) return;
        let queue = new Queue();
        queue.enqueue(root);
        while (!queue.isEmpty()){
            const front = queue.dequeue();
            if(front == null) return;
            console.log(front.value);
            if (front.left != null) queue.enqueue(front.left);
            if (front.right != null) queue.enqueue(front.right);
        }
    }
    DepthFirstTraversal(root){
        if(root == null){
            return;
        }
        console.log(root.value);
        this.DepthFirstTraversal(root.left);
        this.DepthFirstTraversal(root.right);
    }
}


// Example usage:
const tree = new BinaryTree(7);
let node1 = new Node(10);
let node2 = new Node(9);
let node3 = new Node(8);
let node4 = new Node(2);
let node5 = new Node(4);
let node6 = new Node(6);
let node7 = new Node(5);

tree.root = node1;
tree.root.left = node2;
tree.root.right = node3;

node2.left = node4;
node2.right = node5;

node3.left = node6;
node3.right = node7;
