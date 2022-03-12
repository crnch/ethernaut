const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Force", () => {

  let Force;
  let Push;
  const provider = ethers.provider;
  let owner;
  let heritage;
  let balance;

  before(async () => { 
    [owner] = await ethers.getSigners();
    const ForceFactory = await ethers.getContractFactory("Force");
    const PushFactory = await ethers.getContractFactory("Push");
    Force = await ForceFactory.deploy();
    Push = await PushFactory.deploy();
    await Force.deployed();
    await Push.deployed();
  })
  it("owner address should contain funds", async () => {
    expect(await provider.getBalance(owner.address)).to.be.gt(0);
  })
   

  /* TODO: make these tests pass
  // when deploying the contracts on rinkeby, it works
  // find out why this does not work on hardhat testnet
  it("should transfer balance to formerly empty Push contract", async () => {
    balance = await provider.getBalance(owner.address);
    heritage = balance.div(2);
    expect(balance.gt(heritage)).to.be.true;
    const balancePush = await provider.getBalance(Push.address);
    tx = await Push.connect(owner).fund({value: heritage});
    await tx.wait();
    const newBalance = await provider.getBalance(Push.address);
    expect(newBalance.sub(balancePush)).to.equal(heritage);
  });

  it("should emit an event when destroying Push and push the heritage to Force", async () => {
    const oldBalance = await provider.getBalance(Force.address);
    const tx = Push.destroy(Force.address);
    expect(await tx).to.emit(Push, 'Death', {withArgs: [Force.address, heritage]});
    await tx.wait();
    const newBalance = await provider.getBalance(Force.address);
    expect(newBalance.sub(oldBalance)).to.equal(heritage);
  });
  */

});
