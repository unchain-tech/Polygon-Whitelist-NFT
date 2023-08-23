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
    context('when address is already added', function () {
      it('reverts', async function () {
        const { whitelist, alice } = await loadFixture(
          deployWhitelistFixture,
        );
        await expect(whitelist.addToWhitelist(alice.address)).to.be.revertedWith(
          'Address already whitelisted',
        );
      });
    });
    context('when adding a new address', function () {
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
    context('when user is not owner', function () {
      it('reverts', async function () {
        const { whitelist, alice, bob } = await loadFixture(
          deployWhitelistFixture,
        );
        await expect(whitelist.connect(alice).removeFromWhitelist(bob.address)).to.be.revertedWith(
          'Caller is not the owner',
        );
      });
    });
    context('when an address is not in whitelist', function () {
      it('reverts', async function () {
        const { whitelist, bob } = await loadFixture(
          deployWhitelistFixture,
        );
        await expect(whitelist.removeFromWhitelist(bob.address)).to.be.revertedWith(
          'Address not in whitelist',
        );
      });
    });
    context('when removing an address', function () {
      it('emit a RemoveFromWhitelist event', async function () {
        const { whitelist, alice } = await loadFixture(
          deployWhitelistFixture,
        );
        await expect(whitelist.removeFromWhitelist(alice.address))
          .to.emit(whitelist, 'RemoveFromWhitelist')
          .withArgs(alice.address);
      });
    });
  });

  describe('whitelistedAddresses', function () {
    context('when an address is not in whitelist', function () {
      it('returns false', async function () {
        const { whitelist, bob } = await loadFixture(
          deployWhitelistFixture,
        );
        expect(await whitelist.whitelistedAddresses(bob.address)).to.be.false;
      });
    });
    context('when an address is in whitelist', function () {
      it('returns true', async function () {
        const { whitelist, alice } = await loadFixture(
          deployWhitelistFixture,
        );
        expect(await whitelist.whitelistedAddresses(alice.address)).to.be.true;
      });
    });
  });
});
