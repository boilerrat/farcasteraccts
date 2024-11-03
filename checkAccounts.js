// Import the Neynar SDK and dotenv to access your API key
const { NeynarAPIClient } = require('@neynar/nodejs-sdk');
require('dotenv').config();

// Initialize the Neynar client with your API key
const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY);

// Function to look up Farcaster user based on an Ethereum address
async function checkFarcasterUser(address) {
    try {
        const user = await client.lookupUserByVerification(address);
        console.log("Farcaster User Details:", user);
    } catch (error) {
        console.error("Error fetching Farcaster user:", error);
    }
}

// Example Ethereum address to check (replace with your address)
const myAddress = "0xc77AAB10c71982F363dB8EF5be775BE143C4Dd63";
checkFarcasterUser(myAddress);
