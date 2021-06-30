// eslint-disable-next-line no-undef
const RecetaMedica = artifacts.require("RecetaMedica");

module.exports = function (deployer) {
  deployer.deploy(RecetaMedica);
};
