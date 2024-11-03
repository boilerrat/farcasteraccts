// Load environment variables
require('dotenv').config();

// Import required packages
const { NeynarAPIClient } = require('@neynar/nodejs-sdk');
const prompt = require('prompt-sync')({ sigint: true });

// Initialize Neynar client
const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY);

// Function to fetch user information by username
async function fetchUserByUsername(username) {
    try {
        const response = await client.lookupUserByUsername(username);
        if (response.result && response.result.user) {
            const { fid, username, verifications } = response.result.user;
            const ethAddresses = verifications.filter(verification => verification.startsWith('0x'));
            return { fid, username, ethAddresses };
        } else {
            console.error(`No user found for username: ${username}`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching user ${username}:`, error.message);
        return null;
    }
}

// Main function to process a list of usernames
async function processUsernames(usernames) {
    const results = [];
    for (const username of usernames) {
        const userInfo = await fetchUserByUsername(username);
        if (userInfo) {
            results.push(userInfo);
        }
    }
    return results;
}

// Prompt user for input
const input = prompt('Enter usernames separated by commas: ');
const usernames = input.split(',').map(name => name.trim());

processUsernames(usernames).then((users) => {
    console.log('Fetched User Information:');
    users.forEach((user) => {
        console.log(`Username: ${user.username}, FID: ${user.fid}`);
        if (user.ethAddresses.length > 0) {
            console.log('Associated Ethereum Addresses:');
            user.ethAddresses.forEach((address) => {
                console.log(`- ${address}`);
            });
        } else {
            console.log('No associated Ethereum addresses found.');
        }
        console.log('---');
    });
});
