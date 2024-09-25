const person1 = {
    name: "John",
    age: 30,
    gender: "male"
}

class Person {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    greet (x) {
        console.log(`Hello, my name is ${this.name} and I am ${this.age+x} years old.`);
    }
}

const person2 = new Person("John", 30, "male");

// console.log(person1);
// console.log(person2);

person2.greet(2);
// person1.greet(2); // error 

class Animal {
    constructor(name, legs) {
        this.name = name;
        this.legs = legs;
    }

    walk () {
        console.log(`I'm walking on my ${this.legs} legs.`);
    }
}

const animal1 = new Animal("Ponchu", 10);

class Dog extends Animal {
    constructor(name, breed) {
        super(name, 4);
        this.breed = breed;
    }

    bark () {
        console.log(`Woof! My name is ${this.name} and I am a ${this.breed}.`);
    }

    walk () {
        super.walk();
        console.log("Lets pee!");
    }
}

const dog1 = new Dog("Fido", "Golden Retriever");

dog1.walk();
dog1.bark();

animal1.walk();
animal1.bark(); // error