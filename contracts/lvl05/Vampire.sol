// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Token.sol';

contract Vampire {
  
  Token token;

  function drain(address tokenAddress) public returns (uint balance) {
    token = Token(tokenAddress);
    balance = token.balanceOf(address(this));
    token.transfer(msg.sender, balance);
  }
}
