function merge(arr, start = 0, mid, end = arr.length) {
    let arr1 = arr.slice(start, mid);
    let arr2 = arr.slice(mid, end);
    let i = 0;
    let j = 0;
    let k = start;
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            arr[k] = arr1[i]
            i++;
            k++;
        } else {
            arr[k] = arr2[j];
            j++;
            k++;
        }
    }
    while (i < arr1.length) {
        arr[k] = arr1[i]
        i++;
        k++;
    }
    while (j < arr2.length) {
        arr[k] = arr2[j]
        j++;
        k++;
    }
    return arr;
}

function mergeSort(arr, start = 0, end = arr.length) {
    if (end - start > 1) {
        let mid = Math.floor((start + end) / 2);
        mergeSort(arr, start, mid);
        mergeSort(arr, mid, end);
        merge(arr, start, mid, end);
    }
}

const numbers = [1, 3, 5, 7, 2, 4, 6, 8, 9];
mergeSort(numbers);
console.log(numbers);
