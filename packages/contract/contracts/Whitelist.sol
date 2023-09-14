//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Whitelist {
    // The address that can operate addAddressToWhitelist function
    address public owner;

    mapping(address => bool) private _isWhitelisted;

    event AddToWhitelist(address indexed account);
    event RemoveFromWhitelist(address indexed account);

    constructor(address[] memory initialAddresses) {
        owner = msg.sender;
        for (uint256 i = 0; i < initialAddresses.length; i++) {
            addToWhitelist(initialAddresses[i]);
        }
    }

    function addToWhitelist(address _address) public {
        //check if the user is the owner
        require(owner == msg.sender, "Caller is not the owner");
        require(!_isWhitelisted[_address], "Address already whitelisted");

        _isWhitelisted[_address] = true;
        emit AddToWhitelist(_address);
    }

    function removeFromWhitelist(address _address) public {
        //check if the user is the owner
        require(owner == msg.sender, "Caller is not the owner");
        require(_isWhitelisted[_address], "Address not in whitelist");

        _isWhitelisted[_address] = false;
        emit RemoveFromWhitelist(_address);
    }

    function whitelistedAddresses(address _address) public view returns (bool) {
        return _isWhitelisted[_address];
    }
}
