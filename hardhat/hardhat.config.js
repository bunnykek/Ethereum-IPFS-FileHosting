require("@nomicfoundation/hardhat-toolbox");


module.exports = {
  solidity: "0.8.25",
  networks: {
    hardhat: {
      accounts: {
          mnemonic: "cave march choose what spy bid liquid trap want pioneer faculty ability",
      },
      chainId: 1337
    }
  }
};
