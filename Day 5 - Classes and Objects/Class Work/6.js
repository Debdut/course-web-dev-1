class Num {
    constructor(value) {
        this.value = value;
    }

    square() {
        return this.value * this.value;
    }

    get cube() {
        return this.value * this.value * this.value;
    }

    set cube(input) {
        this.value = Math.pow(input, 1/3);
    }
}

let n = new Num(5);
console.log(n.square());
console.log(n.cube);

n.cube = 27;

console.log(n);
