const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('King', () => {
  let owner
  let addr1
  let King
  let EternalHeir
  const prize = 42

  before(async () => {
    ;[owner, addr1] = await ethers.getSigners()
    const KingFactory = await ethers.getContractFactory('King')
    const EternalHeirFactory = await ethers.getContractFactory('EternalHeir')
    King = await KingFactory.deploy({ value: prize })
    await King.deployed()
    EternalHeir = await EternalHeirFactory.deploy(King.address)
    await EternalHeir.deployed()
  })

  it('initial owner should be standard (1st) user', async () => {
    expect(await King.owner()).to.equal(owner.address)
  })

  it('initial prize for becoming king should be 42', async () => {
    expect(await King.prize()).to.equal(prize)
  })

  it('calling EternalHeir with smaller than prize should revert', async () => {
    const overrides = {
      value: prize - 1,
    }
    expect(EternalHeir.claim(overrides)).to.be.reverted;
    expect(await King._king()).to.equal(owner.address);
  })

  it('paying King should change king', async () => {
    const balanceOldKingBefore = await owner.getBalance()
    await addr1.sendTransaction({ to: King.address, value: prize })
    const balanceOldKingAfter = await owner.getBalance()
    expect(await King._king()).to.equal(addr1.address)
    expect(balanceOldKingAfter.sub(balanceOldKingBefore)).to.equal(prize)
  })

  it('after claim EternalHeir should be the king', async () => {
    const overrides = {
      value: prize,
    }
    expect(await EternalHeir.claim(overrides)).to.emit(
      EternalHeir,
      'LongLiveTheKing',
      { withArgs: EternalHeir.address },
    )
    expect(await King._king()).to.equal(EternalHeir.address)
  })

  it('should revert if trying to take await the throne from the EternalHeir', async () => {
    expect(addr1.sendTransaction({ to: King.address, value: 2*prize})).to.be.reverted;
    expect(await King._king()).to.equal(EternalHeir.address);
  })
})
