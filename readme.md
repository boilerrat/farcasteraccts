Certainly! Below is a comprehensive README to guide users through setting up and running the script to fetch Farcaster user information, including associated Ethereum addresses.

---

# Farcaster User Information Fetcher

This script allows you to retrieve Farcaster user details, including their Farcaster ID (FID), username, and associated Ethereum addresses, by providing a list of usernames.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/farcaster-user-fetcher.git
   ```

   Replace `yourusername` with your actual GitHub username.

2. **Navigate to the Project Directory**

   ```bash
   cd farcaster-user-fetcher
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

   This command installs the necessary packages listed in `package.json`.

4. **Obtain a Neynar API Key**

   - Sign up for an account at [Neynar](https://neynar.com/) if you haven't already.
   - After logging in, navigate to the developer section to obtain your API key.

5. **Configure Environment Variables**

   - Create a `.env` file in the project root directory.
   - Add your Neynar API key to the `.env` file:

     ```
     NEYNAR_API_KEY=your_api_key_here
     ```

     Replace `your_api_key_here` with the API key you obtained from Neynar.

## Usage

1. **Run the Script**

   ```bash
   node fetchFIDs.js
   ```

2. **Input Usernames**

   When prompted, enter the Farcaster usernames separated by commas. For example:

   ```
   Enter usernames separated by commas: username1, username2, username3
   ```

3. **View Results**

   The script will display the FID, username, and associated Ethereum addresses for each provided username.

## Example Output

```
Fetched User Information:
Username: username1, FID: 1234
Associated Ethereum Addresses:
- 0xabc123...
- 0xdef456...
---
Username: username2, FID: 5678
No associated Ethereum addresses found.
---
```

## Troubleshooting

- **Error: `client.lookupUserByUsername is not a function`**

  Ensure that you have installed the correct version of the Neynar SDK and that your code is up to date.

- **No User Found for Username**

  Verify that the usernames entered are correct and exist on Farcaster.

## License

This project is licensed under the Unlisense. See the [LICENSE](https://github.com/boilerrat/farcasteraccts/blob/main/LICENSE) file for details.

---
