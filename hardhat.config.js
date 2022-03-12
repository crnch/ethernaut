require('@nomiclabs/hardhat-waffle')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/8b8a866f29ec401c88c170b894a833e0',
      accounts: ["36241a92394220a91cfeff112644e444c15f5b8902edf47c66dab6be832dd1f3"],
    },
  },
  solidity: {
    compilers: [
      {version: '0.8.4',}
    ]
  }
}
