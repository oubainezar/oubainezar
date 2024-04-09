function BinarySearch(arr, value){
    let start = 0;
    let end = arr.length - 1;
    while(start <= end){
        let mid = Math.floor((start+end)/2);
        if(arr[mid] == value){
            return `found`;
        }
        else if(arr[mid] < value){
            start = mid+1;
            continue;
        }
        else if(arr[mid]>value){
            end = mid;
        }
    }
    return `not found`;
}
const numbers = [4, 6, 9, 10, 15, 29, 30];
console.log(BinarySearch(numbers, 30))
