const { providers, Contract } = require("ethers");

// abi
const contractABI = require("./abi.json")

// contract address
const contractAddress = "0xba72b008D53D3E65f6641e1D63376Be2F9C1aD05"

// web-socket API key (for listening the live blockchain data)
const socketProvider = new providers.WebSocketProvider("wss://mainnet.infura.io/ws/v3/ba292433385a46808635f242c994220d");
const objContract = new Contract(contractAddress, contractABI, socketProvider);

// https API key
const provider = new providers.JsonRpcProvider("https://mainnet.infura.io/v3/ba292433385a46808635f242c994220d");
const objHttpContract = new Contract(contractAddress, contractABI, provider);

// get the live events data
console.log("listening for transfer events");
objContract.on("Transfer", async (from, to, value, event) => {
    console.log(from, to, value);
});


// get the events between specific block range 
(async () => {
    try {
        let block = await provider.getBlockNumber()
        console.log(block);
        let events = await objHttpContract.queryFilter("Transfer", block - 1000000, block)
        console.log(events);
    } catch (error) {
        console.log(error);
    }
})()