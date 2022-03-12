const {expect, use} = require('chai');
const { ethers } = require('hardhat');
const { solidity } = require("ethereum-waffle"); 

use(solidity);

describe('Elevator', () => {
  let Elevator;
  let Building;

  before(async () => {
    const ElevatorFactory = await ethers.getContractFactory("Elevator");
    const BuildingFactory = await ethers.getContractFactory("OnlyUp");
    Elevator = await ElevatorFactory.deploy();
    await Elevator.deployed();
    Building = await BuildingFactory.deploy();
    await Building.deployed();
  });

  it("reaches the top", async () => {
    await Building.elevate(Elevator.address);
    expect(await Elevator.top()).to.be.true;
  });
})
