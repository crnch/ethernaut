const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", () => {

  let owner;
  let addr1;
  let Token;
  let Vampire;

  before(async () => {
    [owner, addr1] = await ethers.getSigners();
    const TokenFactory = await ethers.getContractFactory("Token");
    const VampireFactory = await ethers.getContractFactory("Vampire");
    Token = await TokenFactory.deploy(21000000);
    await Token.deployed();
    Vampire = await VampireFactory.deploy();
    await Vampire.deployed();
  })

  it("inital balance should be zero", async () => {
    expect(await Token.balanceOf(addr1.address)).to.equal(0);
  });

  it("after transfer balance should be 20", async () => {
    await Token.transfer(addr1.address, 20);
    expect(await Token.balanceOf(addr1.address)).to.equal(20);
  });

  it("transferring more than the current balance should result in a very high amount", async () => {
    const currentBalance = await Token.balanceOf(addr1.address);
    await Token.connect(addr1).transfer(ethers.constants.AddressZero, currentBalance + 1);
    const afterBalance = await Token.balanceOf(addr1.address);
    expect(afterBalance.gt(currentBalance)).to.be.true;
  });
});
