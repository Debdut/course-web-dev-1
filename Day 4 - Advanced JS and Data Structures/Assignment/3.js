function Eval(fn) {
    
    return {
        then: function () {
            console.log("we got inside then");
            return Eval();
        }
    }
}

const a = Eval()
    .then()
    .then()
    .then()