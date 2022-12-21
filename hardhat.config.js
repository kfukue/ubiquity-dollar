/** @type import('hardhat/config').HardhatUserConfig
 * @type import "hardhat-preprocessor";
 * @type import fs from "fs";
 */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/07hitiDvudEtOG7y6O4IAWE3XnmqgLje",
      },
    },
  },
  getRemappings: function getRemappings() {
    return fs
      .readFileSync("remappings.txt", "utf8")
      .split("\n")
      .filter(Boolean) // remove empty lines
      .map((line) => line.trim().split("="));
  },
};
