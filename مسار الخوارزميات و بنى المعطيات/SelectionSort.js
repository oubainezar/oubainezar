function SelectionSort(arr){
    for(let i = 0; i<arr.length; i++){
        for(let j = i + 1; j<arr.length; j++){
            if(arr[i]>arr[j]){
                //swap
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
    }
    return arr;
}

let numbers = [9,8,7,6,5,4,3,2,1];
console.log(SelectionSort(numbers));
