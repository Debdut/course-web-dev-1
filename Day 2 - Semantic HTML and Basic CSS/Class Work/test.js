// // Higher Order Functions

// function add(a, b) {
//     return a + b
// }

// function multiply(a, b) {
//     return a * b
// }

// function subtract(a, b) {
//     return a - b
// }

// function mod(a, b) {
//     return a % b
// }


// function showExample(f, a, b) {
//     return `${f.name}(${a}, ${b}) = ${f(a, b)}`
// }

// // console.log(showExample(add, 2, 3))
// // add(2, 3) = 5

// const nums = [2, 3, 7, 11, 3]
// const fs = [add, multiply, subtract, mod]

// // for (let i = 1; i < nums.length; i++) {
// //     let a = nums[i-1]
// //     let b = nums[i]

// //     // console.log(showExample(add, a, b))
// //     // console.log(showExample(multiply, a, b))
// //     // console.log(showExample(subtract, a, b))

// //     for (let j = 0; j < fs.length; j++) {
// //         const f = fs[j]
// //         console.log(showExample(f, a, b))
// //     }
// //     console.log()
// // }

// function addThenMultiply(a, b, c) {
//     return multiply(add(a, b), c)
// }

// function twice(x) {
//     return 2 * x
// }

// function minusOne(x) {
//     return x - 1
// }

// // function twoXMinus1(x) {
// //     return minusOne(twice(x))
// // }


// // function composed(f, g, x) {
// //     return g(f(x))
// // }

// // console.log(then(twice, minusOne, 10))

// function f1() {
//     return function one() {
//         return 1
//     }
// }

// console.log(f1()())

// addC(2)(3)

// function addC(x) {
//     return function (y) {
//         return x + y
//     }
// }

// function compose(f, g) {
//     return function (x) {
//         return g(f(x))
//     }
// }

// const twoXMinus1 = thenC(twice, minusOne)
// console.log(twoXMinus1(10))

// function composed(f, g, h, x) {
//     return h(g(f(x)))
// }

// function composed(fs, x) {
//     let result = x
//     for (var i = 0; i < fs.length; i++) {
//         const f = fs[i]
//         result = f(result)
//     }
//     return result
// }

// function compose(...fs) {
//     function (x) {
//         let result = x
//         for (var i = 0; i < fs.length; i++) {
//             const f = fs[i]
//             result = f(result)
//         }
//         return result
//     }
// }

async function sleep(ms) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms))
}

async function setIntervalN(...params) {

    let maxIntervals = null
    let count = 0
    if (params.length % 2 === 1) {
        maxIntervals = params[params.length - 1]
    }

    function condition() {
        if (maxIntervals === null) {
            return true
        }
        return count < maxIntervals
    }

    async function setIntervalWithCondition(f, ms) {
        while(condition()) {
            f()
            count++
            await sleep(ms)
        }
    }

    for (let i = 0; i < params.length - 1; i += 2) {
        const f = params[i]
        const ms = params[i+1]

        setIntervalWithCondition(f, ms)
    }
}

setIntervalN(
    () => console.log(3), 3000,
    () => console.log(1), 1000,
    10

)



