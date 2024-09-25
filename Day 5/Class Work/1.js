Array.prototype.every = function (array, fn) {
    for (let i = 0; i < array.length; i++) {
        if (!fn(array[i])) {
            return false;
        }
    }
    return true;
}

Array.prototype.every = function (array, fn) {
    return array
        .reduce((acc, val) => acc && fn(val), true);
}

zip(["Amrit", "Soumya", "Rahul"], ["Red", "Blue", "Green"])
// [["Amrit", "Red"], ["Soumya", "Blue"], ["Rahul", "Green"]]

zipObject(["Amrit", "Soumya", "Rahul"], ["Red", "Blue", "Green"])
// {Amrit: "Red", Soumya: "Blue", Rahul: "Green"}