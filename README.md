# Steps to deploy on Sepolia

1. Add Sepolia Netrowk in hardhat config:

Obtain alchemy url from alchemy dsashboard and private key of your account address.
Paste the values in .env file.

```shell
    networks: {
        sepolia: {
            chainId: 11155111,
            url: process.env.ALCHEMY_URL,
            accounts: [process.env.PRIVATE_KEY],
        },
    },
```

2. Deploy contract on Sepolia Network

```bash
    npx hardhat ignition deploy ./ignition/modules/ToDo.js --network sepolia
```

3. Verifying contract on Sepolia Etherscan for interacting with contract

```bash
    npx hardhat verify --network sepolia 0x1c4654d9bdcfffE0b44688c9753c7bb915fC01Cc
```

# Conrtact address deployed on Sepolia:

0x1c4654d9bdcfffE0b44688c9753c7bb915fC01Cc

# Interacting with contract:

> Verified Source code on sepolia etherscan:

    https://sepolia.etherscan.io/address/0x1c4654d9bdcfffE0b44688c9753c7bb915fC01Cc#code

> Read Contract:

    https://sepolia.etherscan.io/address/0x1c4654d9bdcfffE0b44688c9753c7bb915fC01Cc#readContract

> Interact with the contract using the following Link:

    https://sepolia.etherscan.io/address/0x1c4654d9bdcfffE0b44688c9753c7bb915fC01Cc#writeContract

Note: Please prefix title with task id in incremental order to track it.
