class Node {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insertNode(node, root) {
        if (root == null) {
            this.root = node;
            return
        }

        if (node.value < root.value) {
            if (root.left === null) {
                root.left = node;
            } else {
                this.insertNode(node, root.left);
            }
        } else {
            if (root.right === null) {
                root.right = node;
            } else {
                this.insertNode(node, root.right);
            }
        }
    }

    insertValue(value) {
        let newNode = new Node(value);
        this.insertNode(newNode, this.root);
    }

    remove(value, root) {
        if (root == null) {
            return null;
        }
        else if(value < root.value) {
            root.left = this.remove(value, root.left);
        } else if (value > root.value) {
            root.right = this.remove(value, root.right);
        } else {
            if (root.left == null && root.right == null) {
                return null; 
            } else if (root.left == null) {
                return root.right; 
            } else if (root.right == null) {
                return root.left; 
            } else {
                
                let minValueNode = this.findMinValue(root.right);
                root.value = minValueNode.value;
                root.right = this.remove(minValueNode.value, root.right);
            }
        }
        return root;
    }
    
    
    

    removeValue(value) {
        this.root = this.remove(value, this.root);
    }

    findMinValue(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    display(node = this.root) {
        if (node !== null) {
            this.display(node.left);
            console.log(node.value);
            this.display(node.right);
        }
    }
}

let binarySearchTree = new BinarySearchTree();
binarySearchTree.insertValue(5);
binarySearchTree.insertValue(3);
binarySearchTree.insertValue(7);
binarySearchTree.insertValue(2);
binarySearchTree.insertValue(4);
binarySearchTree.insertValue(6);
binarySearchTree.insertValue(8);

binarySearchTree.removeValue(8)
binarySearchTree.display(); 

