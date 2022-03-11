// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Telephone.sol';

contract Relay {
  function changeOwner(address telephone) public returns (bool) {
    Telephone(telephone).changeOwner(msg.sender);
    return true;
  }
}
