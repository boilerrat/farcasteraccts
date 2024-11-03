// Load environment variables
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Import Neynar SDK and prompt-sync for user input
const { NeynarAPIClient, FeedType, FilterType } = require('@neynar/nodejs-sdk');
const prompt = require('prompt-sync')({ sigint: true });

// Initialize Neynar client
const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY);

// Function to fetch all users from a channel across multiple pages
async function fetchAllChannelUsers(channelId) {
    const users = {};
    let cursor = null;

    try {
        do {
            const feed = await client.fetchFeed(FeedType.Filter, {
                filterType: FilterType.ChannelId,
                channelId,
                cursor,
            });

            // Process each cast in the current page of the feed
            for (const cast of feed.casts) {
                const author = cast.author;

                // Check if the user is already processed
                if (!users[author.username]) {
                    const userInfo = await client.lookupUserByUsername(author.username);
                    const { fid, verifications } = userInfo.result.user;
                    const ethAddresses = verifications.filter(verification => verification.startsWith('0x'));

                    // Store user details
                    users[author.username] = {
                        fid,
                        username: author.username,
                        ethAddresses
                    };
                }
            }

            // Update cursor for the next page, if available
            cursor = feed.next ? feed.next.cursor : null;
        } while (cursor);

        return Object.values(users); // Return as an array
    } catch (error) {
        console.error('Error fetching channel users:', error.message);
        return [];
    }
}

// Function to save results to JSON file
function saveToFile(channelId, data) {
    const outputDir = path.join(__dirname, 'output');

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // Create a file path based on the channel name
    const filePath = path.join(outputDir, `${channelId}.json`);

    // Write data to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Results saved to ${filePath}`);
}

// Main function to prompt for a channel name and display/save user details
async function main() {
    const channelId = prompt('Enter the Farcaster channel name (e.g., memes): ').trim();

    const users = await fetchAllChannelUsers(channelId);
    console.log(`Fetched Users in the "${channelId}" Channel:`);

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

    // Save the results to a JSON file
    saveToFile(channelId, users);
}

main();
