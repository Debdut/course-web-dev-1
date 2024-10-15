let clicked = false;

document.onclick = function (event) {
    clicked = true;
}

/**
 * 
 * @returns {Promise<boolean>}
 */
function sleepUntilClick() {
    return new Promise((resolve, reject) => 
        { 
            setInterval(() => {
                if (clicked) {
                    resolve(clicked);
                }
            }, 1);
        }
    );
}

function sleep(ms) {
    return new Promise(
        (resolve, reject) => setTimeout(resolve, ms)
    );
}

sleepUntilClick()
    .then(isClicked => {
        console.log("clicked", isClicked);
        clicked = false;
        sleepUntilClick()
        .then(isClicked => {
            console.log("clicked again", isClicked);
        })
    });

async function Wrapper() {
    let isClicked = await sleepUntilClick();
    console.log("clicked", isClicked);
    isClicked = await sleepUntilClick();
    console.log("clicked again", isClicked);
}

Wrapper();

/**
 * @type (x: number, y: number) => void
 */
const f = (x, y) => x + y;
