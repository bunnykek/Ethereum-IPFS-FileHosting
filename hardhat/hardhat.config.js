require("@nomicfoundation/hardhat-toolbox");


module.exports = {
  solidity: "0.8.25",
  networks: {
    hardhat: {
      accounts: {
          mnemonic: "XXXX XXX XXXX XXXXX XXX XXXXX XXXX XXX XXX",
      },
      chainId: 1337
    }
  }
};
