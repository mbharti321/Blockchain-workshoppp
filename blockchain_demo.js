// ##################### Step 1: Import the 'crypto' and 'readline' libraries
const crypto = require("crypto");
const readline = require("readline");

// ##################### Step 2: Define a Block class
class Block {
    constructor(index, timestamp, data, previousHash = "") {
        this.index = index; // Block number in the blockchain
        this.timestamp = timestamp; // When the block was created
        this.data = data; // The block's content (transactions, etc.)
        this.previousHash = previousHash; // Hash of the previous block in the chain
        this.hash = this.calculateHash(); // Unique identifier for this block
    }

    // ##################### Step 3: Method to calculate the hash of the block
    calculateHash() {
        return crypto
            .createHash("sha256") // Use SHA-256 algorithm
            .update(
                this.index +
                this.timestamp +
                this.previousHash +
                JSON.stringify(this.data)
            ) // Block properties as input
            .digest("hex"); // Return the hash in hexadecimal format
    }
}

// ##################### Step 4: Define a Blockchain class
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]; // Initialize the chain with the Genesis Block
    }

    // ##################### Step 5: Create the first block (Genesis Block)
    createGenesisBlock() {
        return new Block(0, new Date().toLocaleString(), "Genesis Block", "0"); // Genesis block has no previousHash
    }

    // ##################### Step 6: Fetch the latest block in the chain
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // ##################### Step 7: Add a new block to the blockchain
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash; // Set the previous block's hash
        newBlock.hash = newBlock.calculateHash(); // Calculate the hash for the new block
        this.chain.push(newBlock); // Add the block to the chain
    }

    // ##################### Step 8: Validate the blockchain's integrity
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false; // Block has been modified if hash doesn't match
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false; // Chain is broken if hashes don't align
            }
        }
        return true; // Blockchain is valid if all checks pass
    }
}

// ##################### Step 9: Create an instance of the blockchain
let myBlockchain = new Blockchain();


// ##################### Step 10: Display current state of blockchain
displayBlockchain = () => {
    console.log("\n~~~~~~~~~~~~~######## Current state of Blockchain #########~~~~~~~~~~");
    console.log(JSON.stringify(myBlockchain, null, 4));
    console.log("~~~~~~~~~~~~~######## Current state of Blockchain End #########~~~~~~~~~~\n");
}

// ##################### Step 11: Set up readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// ##################### Step 12: Recursive function to continuously prompt the user to add blocks
function addBlockFromUser() {
    rl.question("Enter transaction data (e.g., amount/text): ", (inputData) => {
        const newIndex = myBlockchain.chain.length;
        const newTimestamp = new Date().toLocaleString();
        const newData = { transaction: inputData };

        // Add a new block with the user-provided data
        myBlockchain.addBlock(new Block(newIndex, newTimestamp, newData));

        console.log("\nNew block added!\n");
        displayBlockchain() // Display the blockchain

        rl.question("\nDo you want to add another block? (yes/no): ", (answer) => {
            if (answer.toLowerCase() === "yes") {
                addBlockFromUser(); // If yes, prompt again
            } else {
                console.log("\n~~~~~~~~~~~~ Blockchain finalized.~~~~~~~~~~~~ \n");
                console.log("\nIs blockchain valid? " + myBlockchain.isChainValid()); // Check if the chain is valid
                rl.close(); // End the input session
            }
        });
    });
}

// ##################### Step 13: Start the process by prompting the user for the first block's data
console.log("Blockchain initialized with Genesis Block.");
displayBlockchain();
addBlockFromUser();
