function BubbleSort(arr){
    let swap = false;
    for(let i = 0; i<arr.length; i++){
        for(let j = i + 1; j<arr.length;j++){
            if(arr[i]>arr[j]){
                swap = true;
                if(swap){
                    let temp = arr[j];
                    arr[j] = arr[i];
                    arr[i] = temp;
                    swap = false;
                }
            }
        }
    }
    return arr;
}

let numbers = [9,8,7,6,5,4,3,2,1];
console.log(BubbleSort(numbers));
