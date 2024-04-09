function InsertionSort(arr){
    for(let i = 1; i<arr.length; i++){
        let j = i;
        while(j>0 && arr[j]<arr[j-1]){
            [arr[j], arr[j-1]] = [arr[j-1], arr[j]]
            j--;
        }
    }
    return arr;
}

let numbers = [9,8,7,6,5,4,3,2,1];
console.log(InsertionSort(numbers));
