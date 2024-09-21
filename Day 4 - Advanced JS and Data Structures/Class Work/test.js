// Higher Order Functions

function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function subtract(a, b) {
    return a - b;
}

function showExample(f, a, b) {
    const fName = f.name;
    const value = f(a, b);
    console.log(`${fName}(${a}, ${b}) = ${value}`);
}

// console.log(add.name);

// showExample(add, 5, 3);
// showExample(multiply, 5, 3);
// showExample(subtract, 5, 3);


function twice(x) {
    return x * 2;
}

function thrice(x) {
    return x * 3;
}

function minusOne(x) {
    return x - 1;
}

function plusOne(x) {
    return x + 1;
}

function then(f, g, x) {
    // let value = f(x);
    // value = g(value);
    // return value;

    return g(f(x));
}

function SixXPlusThree(x) {
    // let value = twice(x);
    // value = plusOne(value);
    // value = thrice(value);
    // return value;

    // let value = then(twice, plusOne, x);
    // value = thrice(value);
    // return value;

    const functions = [twice, plusOne, thrice];
    let value = x;
    for (let i = 0; i < functions.length; i++) {
        const f = functions[i];
        value = f(value);
    }
}

function nx(n) {
    return function (x) {
        return x * n;
    }
}

const FourX = nx(4);
const FiveX = nx(5);
const SixX = nx(6);

// console.log(FourX(2));

function then(f, g) {
    return function (x) {
        let value = f(x);
        value = g(value);
        return value;
    }
}

// let TwoXPlusOne = then(twice, plusOne);
// console.log(TwoXPlusOne, TwoXPlusOne(5));


function then(fs) {
    return function (x) {
        let value = x;
        for (let i = 0; i < fs.length; i++) {
            const f = fs[i];
            value = f(value);
        }
        return value;
    }
}

// then([twice, plusOne, thrice])(5);


function adder(x) {
    return function (y) {
        return function (z) {
            return x + y + z;
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function SetInterval(f, ms) {
    while (true) {
        f();
        await sleep(ms);
    }
}

function Greet() {
    console.log("Hello World");
}

// SetInterval(Greet, 1000);

let obj = { a: 1, b: 2 };

obj.a = 2;
obj.c = 3;

 obj.d = { e: 4 };

console.log(obj["d"]["e"]);

const FavoriteColors = {
    "Amrit Chatterjee": "Red",
    Soumya: "Blue",
    Rahul: "Green"
}

console.log(FavoriteColors["Amrit Chatterje"]);

const StateMachine = {
    Start: { 
        "any": "MainMenu"
    },
    MainMenu: {
        "1": "StartNewGame",
        "2": "HowToPlay",
        "3": "Exit"
    },
    HowToPlay: {
        "": "MainMenu"
    },
}

// obj[key] = value;

console.log(Object.keys(StateMachine["MainMenu"]));