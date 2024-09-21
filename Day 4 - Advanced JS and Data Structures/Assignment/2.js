// Complete the following program using State Machines.
// You can copy paste code from last week's assignment.
// (35 points)

const WELCOME_HEADING = "Welcome to The Enchanted Code Forest!";
const WELCOME_DESCRIPTION = "In this mystical adventure, you'll explore magical locations, face fearsome creatures, solve riddles, and collect items. Your ultimate goal is to defeat the dragon and save the forest!"

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function getUserInput(prompt, options) {
    return new Promise((resolve) => {
        function askQuestion() {
            readline.question(prompt, (input) => {
                const normalizedInput = input.trim().toLowerCase();
                if (options.length === 1 && options[0] === "any") {
                    resolve(normalizedInput);
                } else if (options.map(o => o.toLowerCase()).includes(normalizedInput)) {
                    resolve(normalizedInput);
                } else {
                    console.log("Invalid input. Please try again.");
                    askQuestion();
                }
            });
        }
        askQuestion();
    });
}

// This function prints the welcome message
function Welcome() {
    
    console.log(`
${WELCOME_HEADING}
======================================
${WELCOME_DESCRIPTION}
======================================
    `);
}

function Menu(title, items, prompt, options) {
    return async function () {
        console.log(`${title}:`);
        const indexes = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const index = i + 1;
            indexes.push(String(index));
            console.log(`${index}. ${item}`);
        }
        let choice;
        if (options) {
            choice = await getUserInput(prompt, options);
        } else {
            choice = await getUserInput(prompt, indexes);
        }

        return choice;
    }
}

const STATES = [
    "Start",
    "MainMenu",
    "StartNewGame",
    "HowToPlay",
    "Exit"
];

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

const StateFunctions = {
    Start: Welcome,
    MainMenu: Menu("Main Menu",
        [
            "Start New Game",
            "How to Play",
            "Exit"
        ],
        "Enter your choice: ",
    ),
    HowToPlay: Menu("How to Play",
        [
            "Choose locations to explore in the forest.",
            "Face enemies in combat - choose to attack or defend.",
            "Solve riddles to earn rewards.",
            "Collect items to help you on your journey.",
            "Use Health Potions when your health is low.",
            "Defeat the dragon to win the game!"
        ],
        "Press Enter to return to the main menu.",
        [""]
    ),
    StartNewGame: function () {
        console.log("Starting New Game");
    },
    Exit: function () {
        console.log("Exiting");
        process.exit();
    }
};

function GetNextState(state, move) {
    if (!STATES.includes(state)) {
        throw new Error("Invalid state:",  state);
    }
    const validMoves = Object.keys(StateMachine[state]);
    if (!validMoves.includes(move) && !validMoves.includes("any")) {
        throw new Error("Invalid move:", move);
    }
    if (!validMoves.includes(move)) {
        move = "any";
    }
    const nextState = StateMachine[state][move];

    return nextState;
}


async function StartGame() {
    let state = "Start";
    let move;
    while(true) {
        move = await StateFunctions[state]();
        state = GetNextState(state, move);
    }
}

StartGame();