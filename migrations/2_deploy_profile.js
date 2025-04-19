const Profile = artifacts.require("Profile");

module.exports = function(deployer) {
    deployer.deploy(Profile);
};