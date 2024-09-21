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

let playerName;
let health = 100;
const inventory = [];

function displayStats() {
    return `Name: ${playerName} | Health: ${health} | Inventory: ${inventory.join(', ')}`;
}

const locations = [
    "Whispering Willows", "Mystic Meadow", "Riddle River",
    "Enchanted Clearing", "Dragon's Lair"
];

async function chooseLocation(visitedLocations) {
    const availableLocations = locations.filter(loc => !visitedLocations.includes(loc));
    console.log("Choose your next location:");
    availableLocations.forEach((loc, index) => console.log(`${index + 1}. ${loc}`));
    const choice = await getUserInput("Enter the number of your chosen location: ", availableLocations.map((_, i) => (i + 1).toString()));
    return availableLocations[parseInt(choice) - 1];
}

function addToInventory(item) {
    inventory.push(item);
    console.log(`You obtained: ${item}`);
}

function hasItem(item) {
    return inventory.includes(item);
}

async function solveRiddle(riddle, options, correctAnswer) {
    console.log(`Riddle: ${riddle}`);
    console.log("Options: " + options.join(", "));
    const answer = await getUserInput("Your answer: ", options);
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
        console.log("Correct! You've earned a Health Potion.");
        return true;
    } else {
        console.log("Sorry, that's incorrect.");
        return false;
    }
}

async function combat(enemyName, enemyHealth) {
    console.log(`A wild ${enemyName} appears!`);
    while (health > 0 && enemyHealth > 0) {
        console.log(`Your Health: ${health} | ${enemyName}'s Health: ${enemyHealth}`);
        const action = await getUserInput("Do you want to attack or defend? ", ["attack", "defend"]);
        const playerDamage = Math.floor(Math.random() * 20) + 10;
        const enemyDamage = Math.floor(Math.random() * 15) + 5;

        if (action === "attack") {
            enemyHealth -= playerDamage;
            health -= enemyDamage;
            console.log(`You deal ${playerDamage} damage to the ${enemyName}.`);
            console.log(`The ${enemyName} deals ${enemyDamage} damage to you.`);
        } else {
            health -= Math.floor(enemyDamage / 2);
            console.log(`You defend, reducing incoming damage by half.`);
            console.log(`The ${enemyName} deals ${Math.floor(enemyDamage / 2)} damage to you.`);
        }
    }
    if (health > 0) {
        console.log(`You have defeated the ${enemyName}!`);
        return true;
    } else {
        console.log("You have been defeated!");
        return false;
    }
}

function useHealthPotion() {
    if (hasItem("Health Potion")) {
        health += 30;
        if (health > 100) health = 100;
        inventory.splice(inventory.indexOf("Health Potion"), 1);
        console.log("You used a Health Potion. +30 Health!");
    } else {
        console.log("You don't have any Health Potions!");
    }
}

async function playGame() {
    console.log("Welcome to The Enchanted Code Forest!");
    playerName = await getUserInput("Enter your name, brave adventurer: ", ["any"]);
    console.log(`Welcome, ${playerName}! Your adventure begins...`);

    const visitedLocations = [];
    
    while (health > 0 && visitedLocations.length < locations.length - 1) {
        console.log(displayStats());
        const chosenLocation = await chooseLocation(visitedLocations);
        visitedLocations.push(chosenLocation);
        console.log(`You find yourself in ${chosenLocation}.`);
        
        const eventType = Math.floor(Math.random() * 3) + 1;
        
        switch (eventType) {
            case 1: // Combat
                const enemies = ["Goblin", "Wolf", "Troll", "Dark Elf"];
                const enemy = enemies[Math.floor(Math.random() * enemies.length)];
                const enemyHealth = Math.floor(Math.random() * 21) + 30;
                if (await combat(enemy, enemyHealth)) {
                    const healAmount = Math.floor(Math.random() * 11) + 10;
                    health = Math.min(100, health + healAmount);
                    console.log(`You've been healed! Current health: ${health}`);
                }
                break;
            case 2: // Riddle
                const riddle = "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?";
                const options = ["Echo", "Ghost", "Wind"];
                if (await solveRiddle(riddle, options, "Echo")) {
                    addToInventory("Health Potion");
                }
                break;
            case 3: // Find Item
                const items = ["Magic Scroll", "Enchanted Sword", "Mystic Amulet", "Health Potion"];
                const foundItem = items[Math.floor(Math.random() * items.length)];
                addToInventory(foundItem);
                break;
        }
        
        if (hasItem("Health Potion")) {
            const usePotion = await getUserInput("Do you want to use a Health Potion? (yes/no) ", ["yes", "no"]);
            if (usePotion === "yes") {
                useHealthPotion();
            }
        }

        // Add these lines to use the extra credit functions
        sortInventory();
        removeDuplicates();
        combineItems();
        console.log("\nYour updated inventory:");
        displayFormattedInventory();
    }

    if (health > 0) {
        console.log("You've explored most of the forest. It's time to face the dragon!");
        if (await combat("Dragon", 100)) {
            console.log("Congratulations! You've defeated the dragon and saved the Enchanted Code Forest!");
        }
    }
    console.log("Game Over!");
}

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
    
    function displayHowToPlay() {
        console.log("\nHow to Play:");
        console.log("1. Choose locations to explore in the forest.");
        console.log("2. Face enemies in combat - choose to attack or defend.");
        console.log("3. Solve riddles to earn rewards.");
        console.log("4. Collect items to help you on your journey.");
        console.log("5. Use Health Potions when your health is low.");
        console.log("6. Defeat the dragon to win the game!");
        getUserInput("Press Enter to return to the main menu.", ["any"]);
    }
    
    // Extra credit functions
    
    function sortInventory() {
        inventory.sort();
    }
    
    function removeDuplicates() {
        const uniqueInventory = [...new Set(inventory)];
        inventory.length = 0;
        inventory.push(...uniqueInventory);
    }
    
    function combineItems() {
        const itemCounts = {};
        for (const item of inventory) {
            itemCounts[item] = (itemCounts[item] || 0) + 1;
        }
        inventory.length = 0;
        for (const [item, count] of Object.entries(itemCounts)) {
            inventory.push(count > 1 ? `${item} (x${count})` : item);
        }
    }
    
    function displayFormattedInventory() {
        console.log("Inventory:");
        for (const item of inventory) {
            console.log(`- ${item}`);
        }
    }
    
    // Start the game
    startGame();
    
