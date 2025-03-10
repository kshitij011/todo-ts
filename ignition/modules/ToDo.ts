// @ts-nocheck

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ToDoModule", (m) => {
    const toDo = m.contract("ToDo");

    return { toDo };
});

// deploying locally: npx hardhat ignition deploy ./ignition/modules/ToDo.js

// deploying on sepolia: npx hardhat ignition deploy ./ignition/modules/ToDo.js --network sepolia
// sepolia address: 0x1c4654d9bdcfffE0b44688c9753c7bb915fC01Cc
