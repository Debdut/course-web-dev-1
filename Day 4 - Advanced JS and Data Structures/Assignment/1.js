// Note in the following problems, uncomment the example code and check your work, then comment it out.

// Create a function map(array, fn) that takes an array and a function as arguments and returns a new array with the results of applying the function to each element of the array. The function fn takes a value, transforms it, and returns the transformed value, example: fn = square (x) => x * x.

// Example:
// const numbers = [1, 2, 3, 4, 5];
// const squaredNumbers = map(numbers, x => x * x);
// console.log(squaredNumbers); // [1, 4, 9, 16, 25]

function map(array, fn) {
    // TODO (5 Points): Implement the map function
}

// Create a function filter(array, fn) that takes an array and a function as arguments and returns a new array with the elements of the original array that satisfy the condition specified by the function. The function fn takes a value, and returns a boolean, example fn = isEven (x) => x % 2 === 0.

// Example:
// const numbers = [1, 2, 3, 4, 5];
// const evenNumbers = filter(numbers, isEven);
// console.log(evenNumbers); // [2, 4]

function filter(array, fn) {
    // TODO (5 Points): Implement the filter function
}

// Create a function reduce(array, fn, initialValue) that takes an array, a function, and an initial value as arguments and returns a single value that is the result of applying the function to the elements of the array in order. The function fn takes two values, does an operation on them, and returns the result, example fn = sum (x, y) => x + y.

// Example:
// const numbers = [1, 2, 3, 4, 5];
// const sum = reduce(numbers, sum, 0);
// console.log(sum); // 15

function reduce(array, fn, initialValue) {
    // TODO (5 Points): Implement the reduce function
}

// Create a function sort(array, fn) that takes an array and a function as arguments and returns a new array with the elements of the original array sorted in ascending order based on the result of applying the function to each element. The function is a comparator, example fn = compareByAge (x, y) => x.age > y.age.

// Example:
// const people = [
//     {name: "John", age: 25},
//     {name: "Mary", age: 30},
//     {name: "David", age: 35},
//     {name: "Sarah", age: 40},
//     {name: "Michael", age: 45}
// ];
// const sortedPeople = sort(people, compareByAge);
// console.log(sortedPeople); // [{name: "David", age: 35}, {name: "John", age: 25}, {name: "Mary", age: 30}, {name: "Michael", age: 45}, {name: "Sarah", age: 40}]


// https://www.w3schools.com/dsa/dsa_algo_quicksort.php
// Check the above link to understand the quicksort algorithm
// thw quicksort implemented there sorts only numbers arrays, but you can use it to sort any array of anything given a comparator function

function sort(array, fn) {
    // TODO (5 Points): Implement the sort function
}

// Map, Filter, and Reduce are powerful functions that can be used to manipulate arrays. Lets practice with some examples.

// Write a function that takes an array of numbers and returns a new array with only the even numbers squared plus 1.

function squaredEvenNumbers(numbers) {
    // TODO (5 Points): Implement the function
}

// Write a function that takes an array of numbers and returns the sum of the squares of the prime numbers in the array.

function sumOfSquaresOfPrimes(numbers) {
    // TODO (5 Points): Implement the function
}

// Write a function that takes an array of objects representing books with properties title, author, and rating, and returns the average rating of all the books written by a given author.

// Example: 
// const books = [
//     {title: "The Great Gatsby", author: "F. Scott Fitzgerald", rating: 4},
//     {title: "To Kill a Mockingbird", author: "Harper Lee", rating: 3},
//     {title: "1984", author: "George Orwell", rating: 5},
//     {title: "The Catcher In The Rye", author: "F. Scott Fitzgerald", rating: 2},
//     {title: "Hell Bitch", author: "F. Scott Fitzgerald", rating: 3},
// ]
// const author = "F. Scott Fitzgerald"
// const averageRating = averageRatingByAuthor(books, author)
// console.log(averageRating) // 3.333

function averageRatingByAuthor(books, author) {
    // TODO (5 Points): Implement the function
}

// Next few functions will delve deeper into number theory using map, filter, and reduce.

// Proper Divisors: A proper divisor of a number is a divisor that is not equal to the number itself. Proper divisors of 10 are 1, 2, 5, and 10. So, sum of proper divisors of 10 is 1+2+5+10 = 22.

// Perfect Numbers: A perfect number is a number that is equal to the sum of its proper divisors. The first few perfect numbers are 6 (1+2+3), 28 (1+2+4+7+14), and 42 (1+2+3+6+8+15+21). So, sum of proper divisors of 42 is 1+2+3+6+8+15+21 = 42.

function isPerfectNumber(number) {
    // TODO (5 Points): Implement the function only using map, filter, and reduce
    
}

// Next we do some real life computing.
// We have a list of family members, each item is an object {name, age, gender}.

// const family = [
//     {name: "John", age: 12, gender: "male"},
//     {name: "Michael", age: 45, gender: "male"},
//     {name: "Sarah", age: 40, gender: "female"},
//     {name: "David", age: 33, gender: "male"},
//     {name: "Mary", age: 10, gender: "female"},
// ];
// const summary = familySummary(family);
// console.log(summary);
// // There are 5 people in the family, with an average age of 28.
// // The family is composed of 3 males and 2 females.
// // Male average age is 30, female average age is 25.
// // The family has 2 children under 18.
// // Here are the family members ordered by age:
// // Michael, Sarah, David, John, Mary

// You can use multiple helper functions to implement this function. But just use the map, filter, and reduce, sort functions.

function familySummary(family) {
    // TODO (5 Points): Implement the function
}

// Now that you're familiar with map, filter, and reduce. Let me tell you that you just implemented the official library functions map, filter and reduce, which are used the following way:

// array.map(fn)
// array.filter(fn)
// array.reduce(fn, initialValue)

// You see the syntax is little bit different than the functions you implemented.
// Instead of map(array, fn), you use array.map(fn)
// Instead of filter(array, fn), you use array.filter(fn)
// Instead of reduce(array, fn, initialValue), you use array.reduce(fn, initialValue)

// To reach this final syntax, you'll need to use array prototypes.

// Let's see how to use array prototypes.

// Array.prototype.map = map
// Array.prototype.filter = filter
// Array.prototype.reduce = reduce

// Now you can use map, filter, and reduce in the following way:

// const numbers = [1, 2, 3, 4, 5];
// const squaredNumbers = numbers.map(x => x * x);
// console.log(squaredNumbers); // [1, 4, 9, 16, 25]

// const numbers = [1, 2, 3, 4, 5];
// const evenNumbers = numbers.filter(isEven);
// console.log(evenNumbers); // [2, 4]

// const numbers = [1, 2, 3, 4, 5];
// const sum = numbers.reduce(sum, 0);
// console.log(sum); // 15

// Uncomment the above code portions to see if it's really working.

// Map, filter, reduce can be used in as replacements of array for loops.

// const numbers = [1, 2, 3, 4, 5];
// const squares = [];
// for (let number of numbers) {
//     squares.push(number * number);
// }

// TODO (2 Points): Implement this using map
function squares(numbers) {
    
}


// const numbers = [1, 2, 3, 4, 5];
// const evenNumbers = [];
// for (let number of numbers) {
//     if (isEven(number)) {
//         evenNumbers.push(number);
//     }
// }

// TODO (1 Points): Implement this using filter
function evenNumbers(numbers) {
    
}


// const numbers = [1, 2, 3, 4, 5];
// const sum = 0;
// for (let number of numbers) {
//     sum += number;
// }

// TODO (2 Points): Implement this using reduce
function sum(numbers) {
    
}

// Let understand the spread operator.
// The spread operator allows you to expand an array into individual elements.
// [...array] is the spread operator.
// It's is used to take an arbitrary number of arguments and turn them into an array.
// https://www.programiz.com/javascript/spread-operator

// This is the then function written using the spread operator.
function then(...fs) {
    return function (x) {
        let value = x;
        for (let i = 0; i < fs.length; i++) {
            const f = fs[i];
            value = f(value);
        }
        return value;
    }
}

// It can be called like:
// then(f1, f2, f3)(x)
// instead of 
// then([f1, f2, f3])(x)
// You can just write them freely instead of array notation.


// TODO (5 Points): Write some code to show that 
// then(f1, then(f2, f3), f4)(x)
// is valid code and equivalent to
// then([f1, f2, f3, f4])(x)