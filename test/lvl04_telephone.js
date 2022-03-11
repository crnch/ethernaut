const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Telephone", () => {

  let owner;
  let addr1;
  let Telephone;
  let Relay;

  before(async () => {
    [owner, addr1] = await ethers.getSigners();
    const TelephoneFactory = await ethers.getContractFactory("Telephone");
    const RelayFactory = await ethers.getContractFactory("Relay");
    Telephone = await TelephoneFactory.deploy();
    await Telephone.deployed();
    Relay = await RelayFactory.deploy();
    await Relay.deployed();
  })

  it("Deployer should be owner", async () => {
    expect(await Telephone.owner()).to.equal(owner.address);
  });

  it("should not be possible to change owner by calling Telephone contract directly", async () => {
    Telephone.connect(addr1).changeOwner(addr1.address);
    expect(await Telephone.owner()).to.equal(owner.address);
  });

  it("should be possible to change contract owner using the relay", async () => {
    await Relay.connect(addr1).changeOwner(Telephone.address);
    expect(await Telephone.owner()).to.equal(addr1.address);
  });
});
