class HashTable {
    constructor(length) {
        this.items = new Array(length);
        this.length = length;
    }
    
    Hashing(value) {
        return value % this.length;
    }

    addElement(value) {
        let index = this.Hashing(value);
        let counter = 0;
        while (this.items[index] !== undefined) {
            counter++;
            index = this.Hashing(index + counter ** 2);
        }
        this.items[index] = value;
    }

    removeElement(value) {
        let index = this.Hashing(value);
        let counter = 0;
        while (this.items[index] !== value) {
            counter++;
            index = this.Hashing(index + counter ** 2);
        }
        this.items.splice(index, 1);
    }

    printElements() {
        for (let i = 0; i < this.length; i++) {
            if (this.items[i] !== undefined) console.log(this.items[i]);
        }
    }
}

let hash_table = new HashTable(10);
hash_table.addElement(4515122362);
hash_table.addElement(4);
hash_table.addElement(1);
hash_table.printElements();
hash_table.removeElement(4);
console.log("After removal:");
hash_table.printElements();
