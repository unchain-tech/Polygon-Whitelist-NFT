const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Whitelist', function () {
  // 各テストの前に呼び出す関数です。テストで使用する変数やコントラクトのデプロイを行います。
  async function deployWhitelistFixture() {
    // テストアカウントを取得します。
    const [owner, alice, bob] = await ethers.getSigners();

    // コントラクトのインスタンスを生成し、デプロイを行います。
    const whitelistFactory = await ethers.getContractFactory('Whitelist');
    const whitelist = await whitelistFactory.deploy([owner.address, alice.address]);

    return { whitelist, owner, alice, bob };
  }

  describe('addToWhitelist', function () {
    context('when user is not owner', function () {
      it('reverts', async function () {
        // テストの準備をします。
        const { whitelist, alice, bob } = await loadFixture(
            deployWhitelistFixture,
        );
        // 実行＆確認をします。
        await expect(whitelist.connect(alice).addToWhitelist(bob.address)).to.be.revertedWith(
          'Caller is not the owner',
        );
      });
    });
    context('when user is already added', function () {
      it('reverts', async function () {
        const { whitelist, alice } = await loadFixture(
          deployWhitelistFixture,
        );
        await expect(whitelist.addToWhitelist(alice.address)).to.be.revertedWith(
          'Address already whitelisted',
        );
      });
    });
    context('when adding a new user address', function () {
      it('emit a AddToWhitelist event', async function () {
        const { whitelist, bob } = await loadFixture(
          deployWhitelistFixture,
        );
        await expect(whitelist.addToWhitelist(bob.address))
          .to.emit(whitelist, 'AddToWhitelist')
          .withArgs(bob.address);
      });
    });
  });

  describe('removeFromWhitelist', function () {
      // TODO: add test
  });

  describe('whitelistedAddresses', function () {
      // TODO: add test
  });
});
