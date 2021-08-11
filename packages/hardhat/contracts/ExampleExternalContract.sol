// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

contract ExampleExternalContract {

  bool public completed;

  function complete() public payable {
    completed = true;
  }

}
