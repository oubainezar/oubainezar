// Function to calculate the Fibonacci series using memoization
function fibonacciSeries(n) {
    // Array to store previously calculated Fibonacci values
    let arr = [];

    // Base cases: if n is 0, 1, or 2, return 1 (Fibonacci series starts with 1, 1, ...)
    if (n == 0 || n == 1 || n == 2) {
        return 1;
    }

    // If the value for the current index 'n' is not already calculated, calculate it
    if (arr[n] == null) {
        // Recursively calculate Fibonacci values for (n-1) and (n-2) and store the sum
        arr[n] = fibonacciSeries(n - 1) + fibonacciSeries(n - 2);
    }

    // Return the calculated Fibonacci value for the current index 'n'
    return arr[n];
}

// Main function to demonstrate the usage of the Fibonacci series calculation
function main() {
    // Display the 9th Fibonacci number
    console.log(fibonacciSeries(9));
}

// Call the main function
main();
