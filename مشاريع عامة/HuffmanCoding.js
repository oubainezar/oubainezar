class Node {
    constructor(value, char = null) {
        this.left = null;
        this.right = null;
        this.value = value;
        this.char = char;
    }
}

class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(node) {
        let index = this.items.findIndex(item => item.value > node.value);
        if (index === -1) {
            this.items.push(node);
        } else {
            this.items.splice(index, 0, node);
        }
    }

    dequeue() {
        return this.items.shift();
    }

    size() {
        return this.items.length;
    }
}

function buildHuffmanTree(text) {
    let priorityQueue = new PriorityQueue();
    let counter = {};

    // Count frequency of each character in the text
    for (let char of text) {
        counter[char] = (counter[char] | 0) + 1;
    }

    // Create a leaf node for each character and add it to the priority queue
    for (let char in counter) {
        let node = new Node(counter[char], char);
        priorityQueue.enqueue(node);
    }

    // Construct the Huffman Tree
    while (priorityQueue.size() >= 2) {
        let left = priorityQueue.dequeue();
        let right = priorityQueue.dequeue();
        let combinedValue = left.value + right.value;
        let node = new Node(combinedValue);
        node.left = left;
        node.right = right;
        priorityQueue.enqueue(node);
    }

    // The remaining node is the root of the Huffman Tree
    return priorityQueue.dequeue();
}

function generateHuffmanCodes(node, currentCode, huffmanCodes) {
    if (!node) {
        return;
    }
    if (node.char !== null) {
        huffmanCodes[node.char] = currentCode;
    }
    generateHuffmanCodes(node.left, currentCode + '0', huffmanCodes);
    generateHuffmanCodes(node.right, currentCode + '1', huffmanCodes);
}

function HuffmanCoding(text) {
    if (!text || text.length < 2) {
        return '';
    }

    let tree = buildHuffmanTree(text);
    let huffmanCodes = {};
    generateHuffmanCodes(tree, '', huffmanCodes);

    let code = '';
    for (let char of text) {
        code += huffmanCodes[char];
    }

    return code;
}

// Example usage:
let text = "this is an example for huffman encoding";
let huffmanCodes = HuffmanCoding(text);
console.log(huffmanCodes);
