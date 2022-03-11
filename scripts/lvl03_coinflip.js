const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  console.log('Account balance:', (await deployer.getBalance()).toString())

  const coinflip_address = '0x5612c730fB1A8B28318c8c081dB466c6D8371155'
  const CoinFlipOracle = await ethers.getContractFactory('CoinFlipOracle')
  const CoinFlip = await ethers.getContractFactory("CoinFlip");
  //const coinfliporacle = await CoinFlipOracle.deploy(coinflip_address)

  coinfliporacle_address = "0x6Cae45Ab94280cF48FfAACf4030517C75d3d8Ec2";
  const coinfliporacle = CoinFlipOracle.attach(coinfliporacle_address);
  console.log('CoinFlipOracle address:', coinfliporacle.address);

  const coinflip = CoinFlip.attach(coinflip_address);
  console.log('CoinFlip address:', coinflip.address);

  let consecutiveWins = await coinflip.consecutiveWins();
  let wins_todo = 10 - consecutiveWins.toNumber();

  while (wins_todo > 0) {
    try {
      result = await coinfliporacle.predict();
      await result.wait(1);
      consecutiveWins = await coinflip.consecutiveWins();
      console.log("Consecutive wins:", consecutiveWins.toNumber())
      wins_todo = 10 - consecutiveWins.toNumber();
    } catch (e) {
      console.log("Error predicting: ", e.reason)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
