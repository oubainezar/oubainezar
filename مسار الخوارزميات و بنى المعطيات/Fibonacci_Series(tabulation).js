// Function to calculate the Fibonacci series using tabulation
function fibonacciSeries(n) {
    // Initialize an array to store Fibonacci numbers
    let arr = [];

    // Base cases: set the first two elements of the array to 1 (Fibonacci series starts with 1, 1, ...)
    arr[0] = 1;
    arr[1] = 1;

    // Loop through the array starting from index 2 up to (n-1)
    for (let i = 2; i < n; i++) {
        // Calculate the Fibonacci number at index 'i' as the sum of the previous two numbers
        arr[i] = arr[i - 1] + arr[i - 2];
    }

    // Return the last element of the array, which represents the nth Fibonacci number
    return arr[n - 1];
}

// Main function to demonstrate the usage of the Fibonacci series calculation
function main() {
    // Display the 9th Fibonacci number
    console.log(fibonacciSeries(9));
}

// Call the main function
main();
