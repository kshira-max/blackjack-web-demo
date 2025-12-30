class CLI {
    constructor() {
        this.prompt = require('prompt-sync')();
    }

    displayWelcomeMessage() {
        console.log("Welcome to Blackjack!");
        console.log("Try to get as close to 21 as possible without going over.");
    }

    getUserInput(promptMessage) {
        return this.prompt(promptMessage);
    }

    displayGameState(state) {
        console.log("Current Game State:");
        console.log(state);
    }

    displayResult(result) {
        console.log(result);
    }
}

module.exports = CLI;