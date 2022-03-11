// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Push {
    
    event Death(address heir, uint balance);
    event Rain(address cloud, uint balance);

    function destroy(address payable sendTo) public {
        emit Death(sendTo, address(this).balance);
        selfdestruct(sendTo);
    }

    function fund() public payable {
        emit Rain(msg.sender, msg.value);
    }
}
