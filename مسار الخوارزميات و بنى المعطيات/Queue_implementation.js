class Queue{
    constructor(length){
        this.items = Array(length);
        this.length = length;
        this.front = -1;
        this.rear = 0;
    }
    isComplete(){
        return this.rear == this.length - 1;
    }
    isEmpty(){
        return this.front == -1;
    }
    enqueue(value){
        if(this.isComplete()){
            return console.log("The Queue is complete.");
        }
        if(this.isEmpty()){
            this.front++;
        }
        this.items[this.rear] = value;
        this.rear++;

    }
    dequeue(){
        if(this.isEmpty()){
            return console.log("The Queue is Empty.");
        }
        this.front++;
    }
    PrintElements(){
        for(let i = this.front; i < this.rear; i++){
            console.log(this.items[i]);
        }
    }

}
let queue = new Queue(10)
queue.enqueue(10);
queue.enqueue(5);
queue.enqueue(4);
queue.enqueue(1);
queue.enqueue(9);
queue.enqueue(7);
queue.enqueue(8);

queue.dequeue();

queue.PrintElements();
