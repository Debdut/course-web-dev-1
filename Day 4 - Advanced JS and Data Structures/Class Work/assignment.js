// Welcome to The Enchanted Code Forest!
// Your mission is to complete this text-based adventure game.
// Fill in the missing code blocks to progress through the story.
// Good luck, brave coder!

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function getUserInput(prompt, options) {
    return new Promise((resolve) => {
        function askQuestion() {
            readline.question(prompt, (input) => {
                const normalizedInput = input.trim().toLowerCase();
                if (options.map(o => o.toLowerCase()).includes(normalizedInput)) {
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

// How to use the getUserInput function:
// *   const color = await getUserInput("Choose a color: ", ["red", "blue", "green"]);
// *   console.log(`You chose ${color}`);
// *
// *   // To accept any input:
// *   const name = await getUserInput("Enter your name: ", ["any"]);
// *   console.log(`Hello, ${name}!`);

// TODO: Declare the following variables (2 points)
// - playerName (let)
// - health (let, starting at 100)
// - inventory (const array, starting empty)

// TODO: Implement the displayStats function (3 points)
function displayStats() {
    // TODO: Return a string in this format:
    // return `Name: ${playerName} | Health: ${health} | Inventory: ${inventory.join(', ')}`;
}

const locations = [
    "Whispering Willows", "Mystic Meadow", "Riddle River",
    "Enchanted Clearing", "Dragon's Lair"
];

// TODO: Implement the chooseLocation function (4 points)
async function chooseLocation(visitedLocations) {
    // TODO: Display: "Choose your next location:"
    // TODO: Display available locations (not in visitedLocations)
    // TODO: Use getUserInput to let the player choose a location
    // TODO: Return the chosen location
}

// TODO: Implement the addToInventory function (2 points)
function addToInventory(item) {
    // TODO: Add the item to the inventory array
    // TODO: Console.log: `You obtained: ${item}`
}

// TODO: Implement the hasItem function (3 points)
function hasItem(item) {
    // TODO: Return true if the item is in the inventory, false otherwise
}

// TODO: Implement the solveRiddle function (5 points)
async function solveRiddle(riddle, options, correctAnswer) {
    // TODO: Console.log: `Riddle: ${riddle}`
    // TODO: Console.log: "Options: " followed by the options
    // TODO: Use getUserInput to get the player's answer
    // TODO: If correct, console.log: "Correct! You've earned a Health Potion."
    // TODO: If incorrect, console.log: "Sorry, that's incorrect."
    // TODO: Return true if correct, false if incorrect
}

// TODO: Implement the combat function (8 points)
async function combat(enemyName, enemyHealth) {
    // TODO: Console.log: "You've encountered a wild ${enemyName}!"
    while (health > 0 && enemyHealth > 0) {
        // TODO: Console.log: `Your Health: ${health} | ${enemyName}'s Health: ${enemyHealth}`
        // TODO: Use getUserInput to let the player choose: "attack" or "defend"
        // TODO: Generate random damage values
        // TODO: If player attacks:
        //       Console.log: `You deal ${playerDamage} damage to the ${enemyName}.`
        //       Console.log: `The ${enemyName} deals ${enemyDamage} damage to you.`
        // TODO: If player defends:
        //       Console.log: `You defend, reducing incoming damage by half.`
        //       Console.log: `The ${enemyName} deals ${enemyDamage / 2} damage to you.`
        // TODO: Update health values
    }
    // TODO: If player wins,
    // TODO: If player wins, console.log: `You have defeated the ${enemyName}!`
    // TODO: If player loses, console.log: "You have been defeated!"
    return health > 0;
}

// TODO: Implement the useHealthPotion function (4 points)
function useHealthPotion() {
    // TODO: If player has a Health Potion:
    //       - Increase health by 30 (max 100)
    //       - Remove the potion from inventory
    //       - Console.log: "You used a Health Potion. +30 Health!"
    // TODO: If player doesn't have a Health Potion:
    //       - Console.log: "You don't have any Health Potions!"
}

// TODO: Implement the playGame function (15 points)
async function playGame() {
    // TODO: Console.log: "Welcome to The Enchanted Code Forest!"
    // TODO: Use getUserInput to get the player's name
    // TODO: Console.log: `Welcome, ${playerName}! Your adventure begins...`
    // TODO: Create an empty array to keep track of visited locations
    // TODO: Main game loop (continue while health > 0 and not all locations visited):
    //    a. Console.log the result of displayStats()
    //    b. Use chooseLocation function to get the next location
    //    c. Add chosen location to visited locations
    //    d. Console.log: `You find yourself in ${chosenLocation}.`
    //    e. Generate a random event (1: Combat, 2: Riddle, 3: Find Item)
    //    f. Handle the event:
    //       - Combat: 
    //         * Create an enemy from this list: ["Goblin", "Wolf", "Troll", "Dark Elf"]
    //         * Set enemy health randomly between 30-50
    //         * Call combat function with enemy name and health
    //         * If player wins, award 10-20 health points (max 100)
    //           Console.log: `You've been healed! Current health: ${health}`
    //       - Riddle: 
    //         * Use this riddle: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?"
    //         * Provide these options: ["Echo", "Ghost", "Wind"]
    //         * Call solveRiddle function with the riddle, options, and correct answer
    //         * If solved, add a "Health Potion" to inventory
    //       - Find Item: 
    //         * Add one of these to inventory: ["Magic Scroll", "Enchanted Sword", "Mystic Amulet", "Health Potion"]
    //    g. After each event, if player has a Health Potion:
    //       Console.log: "Do you want to use a Health Potion? (yes/no)"
    //       Use getUserInput to get player's choice
    //       If yes, call useHealthPotion()
    //    h.(Extra Credit) Call the following functions in this order:
    //       - sortInventory()
    //       - removeDuplicates()
    //       - combineItems()
    //       - Console.log: "\nYour updated inventory:"
    //       - displayFormattedInventory()
    // TODO: After the loop, if player is alive, initiate final boss battle:
    //    - Console.log: "You've explored most of the forest. It's time to face the dragon!"
    //    - Create a "Dragon" enemy with 100 health
    //    - Call combat function with "Dragon" and its health
    //    - If player wins, console.log: "Congratulations! You've defeated the dragon and saved the Enchanted Code Forest!"
    // TODO: Console.log: "Game Over!"
}

// TODO: Implement the startGame function (5 points)
async function startGame() {
    console.log("Welcome to The Enchanted Code Forest!");
    console.log("======================================");
    console.log("In this mystical adventure, you'll explore magical locations,");
    console.log("face fearsome creatures, solve riddles, and collect items.");
    console.log("Your ultimate goal is to defeat the dragon and save the forest!");
    console.log("======================================");

    while (true) {
        console.log("\nMain Menu:");
        console.log("1. Start New Game");
        console.log("2. How to Play");
        console.log("3. Exit");

        const choice = await getUserInput("Enter your choice: ", ["1", "2", "3"]);

        switch (choice) {
            case "1":
                await playGame();
                break;
            case "2":
                displayHowToPlay();
                break;
            case "3":
                console.log("Thank you for playing The Enchanted Code Forest. Goodbye!");
                readline.close();
                return;
        }
    }
}
    
    // TODO: Implement the displayHowToPlay function (3 points)
    function displayHowToPlay() {
        console.log("\nHow to Play:");
        console.log("1. Choose locations to explore in the forest.");
        console.log("2. Face enemies in combat - choose to attack or defend.");
        console.log("3. Solve riddles to earn rewards.");
        console.log("4. Collect items to help you on your journey.");
        console.log("5. Use Health Potions when your health is low.");
        console.log("6. Defeat the dragon to win the game!");
        // TODO: Use getUserInput to wait for the player to press Enter
        // Prompt: "Press Enter to return to the main menu."
    }
    
    // Start the game!
    startGame();
    
    // EXTRA CREDIT: Implement the following inventory management functions (10 points total)
    // Call these functions after each event in the main game loop
    
    // TODO: Implement the sortInventory function (2 points)
    function sortInventory() {
        // TODO: Sort the inventory array alphabetically
    }
    
    // TODO: Implement the removeDuplicates function (3 points)
    function removeDuplicates() {
        // TODO: Remove any duplicate items from the inventory
    }
    
    // TODO: Implement the combineItems function (3 points)
    function combineItems() {
        // TODO: Combine similar items in the inventory (e.g., 3 "Health Potion" becomes "Health Potion (x3)")
    }
    
    // TODO: Implement the displayFormattedInventory function (2 points)
    function displayFormattedInventory() {
        console.log("Inventory:");
        // TODO: For each item in the inventory, console.log: `- ${item}`
    }
    