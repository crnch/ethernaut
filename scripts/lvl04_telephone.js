const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  console.log('Account balance:', (await deployer.getBalance()).toString())

  const telephone_address = '0xD39e8D4d0c0A642c3D697FBf40cdcb1fe7a46CD7'
  const RelayFactory = await ethers.getContractFactory('Relay')
  const Relay = await RelayFactory.deploy();
  await Relay.deployed();

  await Relay.changeOwner(telephone_address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
