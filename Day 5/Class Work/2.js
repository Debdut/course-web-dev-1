function Eval(fn) {
    let state = "pending";
    let fs = [];
    let value;
    function resolve(val) {
        value = val;
        if (state === "pending") {
            state = "resolved";
            for (let i = 0; i < fs.length; i++) {
                const f = fs[i];
                value = f(value);
            }
        }
    }
    function reject(value) {
        if (state === "pending") {
            state = "rejected";
        }
        console.log("rejected", value);
    }
    return {
        state: () => state,
        then: function (fi) {
            fs.push(fi);
            return Eval();
        }
    };
}

// Eval()
//     .then();

a = Eval(f1) 
a.then(f2)
    .then(f3)
    .then(f4);

// f4(f3(f2(f1())));

function square(x) {
    return x * x;
}

const squareArrow = x => x * x;
fn = (resolve, reject) => {
    let a = square(5);
    if (a === 25) {
        resolve(a);
    } else {
        reject(a);
    }
}

let clicked = false;

document.onclick = function (event) {
    clicked = true;
}

function sleepUntilClick() {
    return Promise((resolve, reject) => 
        { 
            setInterval(() => {
                if (clicked) {
                    resolve(clicked);
                }
            }, 10);
        }
    );
}

sleepUntilClick()
    .then(clicked => {
        console.log("clicked", clicked);
    });