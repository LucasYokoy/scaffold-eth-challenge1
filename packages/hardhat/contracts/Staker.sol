// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

import "hardhat/console.sol";
import "./ExampleExternalContract.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract Staker {
  
  // Edition for checkpoint 0

  mapping ( address => uint256 ) public balances;
  uint256 public constant threshold = 1 ether;
  uint256 public deadline;

  address payable exampleExternalContractAddress;
  ExampleExternalContract public exampleExternalContract;

  constructor(address payable _exampleExternalContractAddress) {
    exampleExternalContract = ExampleExternalContract(exampleExternalContractAddress);
    exampleExternalContractAddress = _exampleExternalContractAddress;
    deadline = block.timestamp + 30 seconds;
  }

  // Modifier that makes sure the function is only executed before or after the deadline
  modifier afterDeadline(bool isAfter){
    if(isAfter){
      require(block.timestamp >= deadline, "Can't do that before the deadline");
    } else{
      require(block.timestamp < deadline, "Can't do that after deadline.");
    }
    _;
  }

  // Modifier that makes sure the external contract hasn't been completed yet. Used to protect execute and witdraw functions
  modifier notCompleted{
    require(!exampleExternalContract.completed());
    _;
  }

  // Collect funds in a payable `stake()` function and track individual `balances` with a mapping:
  //  ( make sure to add a `Stake(address,uint256)` event and emit it for the frontend <List/> display )
  event Stake(address, uint256);

  function stake() external payable afterDeadline(false){
    // check if the deadline hasn't passed (modifier)
    // Update balance
    balances[msg.sender] = msg.value;

    // Emit Stake event
    emit Stake(msg.sender, msg.value);
  }

  // After some `deadline` allow anyone to call an `execute()` function
  //  It should either call `exampleExternalContract.complete{value: address(this).balance}()` to send all the value
  function execute() external afterDeadline(true) notCompleted payable{
    // make sure the deadline has passed (modifier)
    // make sure the threshold was reached
    require(address(this).balance >= threshold, "Failed to reach the threshold");
    // Call the complete() function from the external contract
    // Transfer funds to external contract
    exampleExternalContract.complete{value: address(this).balance}();
    // exampleExternalContractAddress.transfer(address(this).balance);
  }


  // if the `threshold` was not met, allow everyone to call a `withdraw()` function
  function withdraw(address payable user) external afterDeadline(true) notCompleted payable{
    // make sure the deadline has passed (modifier)
    // make sure the threshold wasn't reached
    require(address(this).balance < threshold, "Can't withdraw if the threshold was reached");
    // transfer the sender's balance back to the sender
    user.transfer(balances[user]);
  }


  // Add a `timeLeft()` view function that returns the time left before the deadline for the frontend
  function timeLeft() public view returns(uint256){
    uint256 time = deadline - block.timestamp;
    if(time >= 0){
      return time;
    } else{
      return 0;
    }
  }

}
