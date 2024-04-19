# Ethereum-IPFS-FileHosting
File hosting service powered by etherium smart contracts and decentralized IPFS storage.         


### Features
- Blockchained and decentralized.
- Automated via smart contracts.
- File sharing with friends.
- Files are AES-256 encrypted in client-side and then uploaded to the IPFS.

## Instructions
- `git clone https://github.com/bunnykek/Ethereum-IPFS-FileHosting`
- Install Node.js and git.


#### Hardhat-Metamask setup
- Install Metamask browser [extension](https://metamask.io/download/). Note the wallet `mnemonic` key when you setup.
```
cd Ethereum-IPFS-FileHosting/hardhat
npm i
```
- [Connecting metamask and hardhat](https://docs.metamask.io/wallet/how-to/run-devnet/)


#### IPFS-Pinata setup
- Register to [Pinata](https://www.pinata.cloud/) and grab the API tokens.
- Rename `.ENVR` to `.env` and fill the respective Pinata tokens.

#### Front-end setup
```
cd Ethereum-IPFS-FileHosting
npm i
```

#### Starting a local etherium node
```
cd Ethereum-IPFS-FileHosting/hardhat
npx hardhat node
// let this terminal running in background.
```

#### Deploying the smart contract.
```
cd Ethereum-IPFS-FileHosting/hardhat
npx hardhat run scripts/deploy.js --network localhost
```
Note the deployed contract address and set it inside `.env` file.

#### Starting the frontend
```
cd Ethereum-IPFS-FileHosting
npm run dev
```

#### Flow-chart
![BlockChainFlow-Page-1 (1) (1)](https://github.com/bunnykek/Ethereum-IPFS-FileHosting/assets/67633271/fb30a15b-4d20-4e3c-a24b-36209cb9e423)

#### Screenshots
![collage (4)](https://github.com/bunnykek/Ethereum-IPFS-FileHosting/assets/67633271/47d48100-c126-4344-974f-dc19bf426061)

#### Don't forget to drop a star if this project is useful to you.
