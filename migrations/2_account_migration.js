var Account = artifacts.require("Account");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(Account);
};