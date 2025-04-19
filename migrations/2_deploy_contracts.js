const Profile = artifacts.require("Profile"); 
const Voting = artifacts.require("Voting"); 

module.exports = function(deployer) { deployer.deploy(Profile); deployer.deploy(Voting); };