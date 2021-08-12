const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("My Dapp", function () {
  let myContract;
  let extContract;

  describe("YourContract", function () {
    it("Should deploy YourContract", async function () {
      const stakerContract = await ethers.getContractFactory("Staker");
      const externalContract = await ethers.getContractFactory("ExampleExternalContract");

      extContract = await externalContract.deploy();
      myContract = await stakerContract.deploy(extContract.address);
      [owner, addr1, addr2, _] = await ethers.getSigners();

      // If the contracts were properly deployed, the external contract should be accessible and completed should be false
      let isCompleted = await extContract.completed();
      expect(!isCompleted).to.be.true;
    });

    it("Should accept stakes", async function(){
      
    });
  });
});
