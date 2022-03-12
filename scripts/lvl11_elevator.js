const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  console.log('Account balance:', (await deployer.getBalance()).toString())

  const ElevatorFactory = await ethers.getContractFactory("Elevator");
  const BuildingFactory = await ethers.getContractFactory("OnlyUp");
  Elevator = ElevatorFactory.attach("0x2b4eDD29905c8c045952614Ead88eD19c2d503eD");
  Building = await BuildingFactory.deploy();
  await Building.deployed();
  await Building.elevate(Elevator.address); 
  const top = await Elevator.top();
  if (top) {
    console.log("You've reached the top. Enjoy the view and the fresh air!")
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
