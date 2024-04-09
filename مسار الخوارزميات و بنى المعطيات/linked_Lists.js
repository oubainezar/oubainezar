class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}
class LinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
    }
    insertValue(value){
        let newNode = new Node(value);
        this.insertNode(newNode);
    }
    insertNode(node){
        if(this.head == null && this.tail == null){
            this.head = node;
            this.tail = node;
            return;
        }
        let current = this.head;
        while(current.next !== null){
            current = current.next;
        }
        current.next = node;
        this.tail = node;
    }
    removeValue(value){
        if(this.head == null){
            return console.log("the linked list is empty.");
        }
        else if(value == this.head.value && this.head == this.tail){
            this.head = null;
            this.tail = null;
            return;
        }
        let current = this.head.next;
        while(current.value !== value && current.next !== null){
            current = current.next;
        }
        if(current.value == value){
            current = null;
            return;
        }
        return console.log("not found");
    }
    PrintElements(){
        if(this.head == null){
            return console.log("the linked list is empty.");
        }
        let current = this.head;
        while(current != null){
            console.log(current.value);
            current = current.next;
        }
    }
}
let linked_list = new LinkedList();
linked_list.insertValue(1);
linked_list.insertValue(2);
linked_list.insertValue(3);
linked_list.insertValue(4);


linked_list.PrintElements()
