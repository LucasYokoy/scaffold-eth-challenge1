const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

const { assert } = require("chai");
const { Contract } = require("ethers");

use(solidity);


describe("My Dapp", function () {
  let myContract;
  let extContract;
  
  beforeEach(async function(){
    const stakerContract = await ethers.getContractFactory("Staker");
    const externalContract = await ethers.getContractFactory("ExampleExternalContract");
  
    extContract = await externalContract.deploy();
    myContract = await stakerContract.deploy(extContract.address);
    [owner, addr1, addr2, _] = await ethers.getSigners();
  
    await addr1.transfer(myContract.address, 0.5)
    addr1Balance = await myContract.balances[addr1];
    console.log(addr1Balance);
  
    // addr1Balance = await ethers.balanceOf(addr1);
    // console.log(addr1Balance);
  });

  function deployAndStake(stakeAmount){
    // send eth from addr1
    // send eth from addr2
    // their respective balances should be updated
    // Stake events should have been emitted
  }

  describe("Threshold has been reached", function () {
    it("Should have properly deployed the contracts", async function () {
      // If the contracts were properly deployed, the external contract should be accessible and completed should be false
      let isCompleted = await extContract.completed();
      expect(isCompleted).to.be.false;
      // also, the timeLeft() should be accessible
      expect(await myContract.timeLeft()).equal(30);
    });

    it("Should accept stakes until threshold is reached", async function(){
      // Use the deployAndStake function with 0.5 eth as argument
    });

    it("Treshold reached: before deadline", async function(){
      // execute shouldn't work
      // withdraw shouldn't work
      // timeLeft must be greater than 0
    });

    it("Treshold reached: after deadline", async function(){
      // wait 30 seconds just for sure
      // withdraw shouldn't work
      // execute should work
      // stake shouldn't work
      // withdraw shouldn't work (should send nothing to the caller)
    });
  });

  describe("Threshold has NOT been reached", async function() {
    it("Redeploy contract, and take stakes without reaching the threshold", async function(){
      // Use the deployAndStake function with 0.25 eth as argument
    });

    it("Treshold not reached: before deadline", async function(){
      // execute should work
      // withdraw shouldn't work
      // timeLeft must be greater than 0
    });

    it("Treshold not reached: after deadline", async function(){
      // wait 30 seconds just for sure
      // execute shouldn't work
      // stake shouldn't work
      // withdraw should work for both users
      // their balances should be updated
      // they must have the withdrawn eth on their accounts
    });
  });
});