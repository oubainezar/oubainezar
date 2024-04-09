class Stack{
    constructor(length){
        this.length = length;
        this.items = [];
        this.top = -1;
    }
    isEmpty(){
        return this.top == -1;
    }
    isComplete(){
        return this.top == this.length-1;
    }
    push(value){
        if(this.isComplete()){
            return console.log("The stack is complete.");
        }
        this.top++;
        this.items[this.top] = value;
    }
    pop(){
        if(this.isEmpty()){
            return console.log("The stack is empty.");
        }
        this.top--;
    }
    topElement(){
        return this.items[this.top];
    }
}

let stack = new Stack(6);
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);
stack.push(6);
console.log(stack.topElement());
stack.pop()
console.log(stack.topElement());
