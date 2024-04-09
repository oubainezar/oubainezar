function partition(arr, start, end){
    let j = start - 1;
    let pivot =  end - 1;
    for(let i = start; i<end; i++){
        if(arr[i]<arr[pivot]){
            j++;
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
    }
    j++;
    [arr[j], arr[pivot]] = [arr[pivot], arr[j]];
    return j++;
}
function QuickSort(arr, start, end){
    if(end - start > 1){
        let pivot = partition(arr, start, end);
        QuickSort(arr, start, pivot-1);
        QuickSort(arr, pivot+1, end);
    }
}
const numbers = [9, 7, 55, 3, 8, 14, 5];
QuickSort(numbers, 0, 7);
console.log(numbers);
