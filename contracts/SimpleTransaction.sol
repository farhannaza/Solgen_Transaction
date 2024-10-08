// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract SimpleTransaction {
    address public owner;

    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor() {
        owner = msg.sender;
    }

    function transfer(address payable _to) public payable {
        require(msg.value > 0, "Transfer amount must be greater than zero");
        _to.transfer(msg.value);
        emit Transfer(msg.sender, _to, msg.value);
    }

    // Fallback function to accept Ether
    receive() external payable {}
}
