// simple hardhat simulation script to transfer dai, usdt, usdc and uAD-3CRV LP to specific adddress for testing

const fs = require("fs");
const path = require("path");
const hre = require("hardhat");
const dotenv = require("dotenv");
const { BigNumber } = require("ethers");
const ethers = require("ethers");
const abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (boolean)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];
async function main() {
  const envPath = path.join(__dirname, "../.env");
  if (!fs.existsSync(envPath)) {
    throw new Error("Env file not found");
  }
  dotenv.config({ envPath });
  const tokens = {
    dai: {
      token: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      holder: "0xA00E2A7652248AbEb209398227DAE413E9479e52",
      decimals: 18,
      amount: 1000,
    },
    usdt: {
      token: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      holder: "0xA00E2A7652248AbEb209398227DAE413E9479e52",
      decimals: 6,
      amount: 1000,
    },
    usdc: {
      token: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      holder: "0xA00E2A7652248AbEb209398227DAE413E9479e52",
      decimals: 6,
      amount: 1000,
    },
    lp: {
      token: "0x20955CB69Ae1515962177D164dfC9522feef567E",
      holder: "0xefC0e701A824943b469a694aC564Aa1efF7Ab7dd",
      decimals: 18,
      amount: 3,
    },
    uAD: {
      token: "0x0F644658510c95CB46955e55D7BA9DDa9E9fBEc6",
      holder: "0x4007CE2083c7F3E18097aeB3A39bb8eC149a341d",
      decimals: 18,
      amount: 1000,
    },
  };
  const receivingAddress = process.env.recievingAddress || "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const keys = Object.keys(tokens);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    await sendTokens(tokens[key]["token"], tokens[key]["holder"], receivingAddress, tokens[key]["decimals"], tokens[key]["amount"]);
  }
}

async function sendTokens(tokenAddress, tokenHolder, tokenReceiver, decimals, amount) {
  console.log(`sending :${tokenAddress} from: ${tokenHolder} to :${tokenReceiver} amount : ${amount}`);
  const provider = new ethers.providers.JsonRpcProvider();

  await provider.send("hardhat_impersonateAccount", [tokenHolder]);

  const signer = await provider.getSigner(tokenHolder);

  const daiToken = new ethers.Contract(tokenAddress, abi, signer);

  let daiUnit = BigNumber.from(10).pow(BigNumber.from(decimals)).mul(BigNumber.from(amount));

  const tx = await daiToken.transfer(tokenReceiver, daiUnit);

  console.log(tx);
  console.log((await daiToken.balanceOf(tokenReceiver)).toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
