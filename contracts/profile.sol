// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Profile {
    struct ProfileData {
        string username;
        string firstName;
        string lastName;
        string email;
    }

    constructor() {
        // Пустой конструктор
    }
    
    mapping (address => ProfileData) profiles;

    function setProfile(string memory username, string memory firstName, string memory lastName, string memory email) public {
        profiles[msg.sender] = ProfileData(username, firstName, lastName, email);
    }
    
    function getProfile() public view returns (string memory, string memory, string memory, string memory) {
        return (
            profiles[msg.sender].username, 
            profiles[msg.sender].firstName, 
            profiles[msg.sender].lastName, 
            profiles[msg.sender].email
        );
    }

    function removeProfile() public {
        delete profiles[msg.sender];
    }
}