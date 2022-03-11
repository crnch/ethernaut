//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import './CoinFlip.sol';

contract CoinFlipOracle {
    using SafeMath for uint256;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    CoinFlip CoinFlipInstance;

    constructor (address _deployedCoinFlipAddress) {
        CoinFlipInstance = CoinFlip(_deployedCoinFlipAddress);
    }

    function predict() public returns (bool) {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        uint256 coinFlip = blockValue.div(FACTOR);
        bool side = coinFlip == 1 ? true : false;

        return CoinFlipInstance.flip(side);
    }
}

