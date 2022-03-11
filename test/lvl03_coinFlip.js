const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CoinFlip", function () {
  it("Should guess 10 consecutive coinflips correct", async () => {
    const CoinFlip = await ethers.getContractFactory("CoinFlip");
    const CoinFlipOracle = await ethers.getContractFactory("CoinFlipOracle");
    const coinflip = await CoinFlip.deploy();
    await coinflip.deployed();

    expect(await coinflip.consecutiveWins()).to.equal(0);

    const coinfliporacle = await CoinFlipOracle.deploy(coinflip.address);
    await coinfliporacle.deployed();
    
    let predictions = []
    let prediction;
    for (let i = 0; i<10; i++) {
        prediction = await coinfliporacle.predict();
        predictions.push(prediction);
    }

    expect(await coinflip.consecutiveWins()).to.equal(10);
  });
});
