require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_URL = "https://eth-sepolia.g.alchemy.com/v2/m7aOWt4Jxhz3rh2DFYr1yArSqMzjtjxJ";
const PRIVATE_KEY = "863bfc535acb009fee73e227322fc036cd94c1f42b7bfeb18da27707da9c5da4";
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};