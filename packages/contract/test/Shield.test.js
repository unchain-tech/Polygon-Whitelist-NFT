const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Shield', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployWhitelistFixture() {
    const dummyBaseURI = 'ipfs://dummyBaseURI';

    // Contracts are deployed using the first signer/account by default
    const [owner, alice, bob] = await ethers.getSigners();

    const whitelistFactory = await ethers.getContractFactory('Whitelist');
    const whitelist = await whitelistFactory.deploy([
      owner.address,
      alice.address,
    ]);
    const shieldFactory = await ethers.getContractFactory('Shield');
    const shield = await shieldFactory.deploy(dummyBaseURI, whitelist.address);

    // Get public variables from Shield contract
    const price = await shield.price();
    const maxTokenIds = await shield.maxTokenIds();

    return { shield, price, maxTokenIds, owner, alice, bob };
  }

  describe('setPaused', function () {
    context('when user is not owner', function () {
      it('reverts', async function () {
        const { shield, alice } = await loadFixture(deployWhitelistFixture);

        await expect(shield.connect(alice).setPaused(true)).to.be.revertedWith(
          'Ownable: caller is not the owner',
        );
      });
    });
    context('when set to true', function () {
      it('paused variable is true', async function () {
        const { shield } = await loadFixture(deployWhitelistFixture);

        await shield.setPaused(true);

        expect(await shield.paused()).to.equal(true);
      });
    });
    context('when set to false', function () {
      it('paused variable is false', async function () {
        const { shield } = await loadFixture(deployWhitelistFixture);

        // The initial value of boolean is `false`,
        // so it is set to `true` once and then to false.
        await shield.setPaused(true);
        await shield.setPaused(false);

        expect(await shield.paused()).to.equal(false);
      });
    });
  });

  describe('mint', function () {
    context('when paused is true', function () {
      it('reverts', async function () {
        const { shield, alice, price } = await loadFixture(
          deployWhitelistFixture,
        );
        await shield.setPaused(true);

        await expect(
          shield.connect(alice).mint({ value: price }),
        ).to.be.revertedWith('Contract currently paused');
      });
    });
    context('when user is not in whitelist', function () {
      it('reverts', async function () {
        const { shield, bob, price } = await loadFixture(
          deployWhitelistFixture,
        );

        await expect(
          shield.connect(bob).mint({ value: price }),
        ).to.be.revertedWith('You are not whitelisted');
      });
    });
    context(
      'when the number of maxTokenIds has already been minted',
      function () {
        it('reverts', async function () {
          const { shield, price, maxTokenIds } = await loadFixture(
            deployWhitelistFixture,
          );
          // Mint for maxTokenIds times.
          for (let id = 0; id < maxTokenIds; id++) {
            await shield.mint({ value: price });
          }

          await expect(shield.mint({ value: price })).to.be.revertedWith(
            'Exceeded maximum Shields supply',
          );
        });
      },
    );
    context('when msg.value is less than price', function () {
      it('reverts', async function () {
        const { shield, alice } = await loadFixture(deployWhitelistFixture);

        await expect(
          shield.connect(alice).mint({ value: 0 }),
        ).to.be.revertedWith('Ether sent is not correct');
      });
    });
    context('when mint is successful', function () {
      it('Shield balance increases', async function () {
        const { shield, price } = await loadFixture(deployWhitelistFixture);
        // Get the current Shield balance
        const shieldBalance = ethers.utils.formatEther(
          await ethers.provider.getBalance(shield.address),
        );
        // Calculate the expected Shield balance after mint
        const expectedShieldBalance =
          parseFloat(shieldBalance) +
          parseFloat(ethers.utils.formatEther(price));

        await shield.mint({ value: price });

        // Get the Shield balance after mint
        const shieldBalanceAfterMint = ethers.utils.formatEther(
          await ethers.provider.getBalance(shield.address),
        );

        expect(parseFloat(shieldBalanceAfterMint)).to.equal(
          expectedShieldBalance,
        );
      });
    });
  });

  describe('withdraw', function () {
    context('when user is not owner', function () {
      it('reverts', async function () {
        const { shield, alice } = await loadFixture(deployWhitelistFixture);

        await expect(shield.connect(alice).withdraw()).to.be.revertedWith(
          'Ownable: caller is not the owner',
        );
      });
    });
    context('when owner executes', function () {
      it("owner's balance increases", async function () {
        const { shield, price, owner, alice } = await loadFixture(
          deployWhitelistFixture,
        );

        await shield.connect(alice).mint({ value: price });

        // Get the current owner balance
        const ownerBalance = ethers.utils.formatEther(await owner.getBalance());

        const tx = await shield.withdraw();

        // Calculates the expected owner balance after withdraw.
        const receipt = await tx.wait();
        const txCost = receipt.gasUsed.mul(tx.gasPrice);
        const formattedTxCost = ethers.utils.formatEther(txCost);
        const formattedPrice = ethers.utils.formatEther(price);
        const expectedOwnerBalance =
          parseFloat(ownerBalance) +
          parseFloat(formattedPrice) -
          parseFloat(formattedTxCost);

        // Get the owner balance after withdraw.
        const ownerBalanceAfterWithdraw = ethers.utils.formatEther(
          await owner.getBalance(),
        );
        const actualOwnerBalance = parseFloat(ownerBalanceAfterWithdraw);

        expect(actualOwnerBalance).to.equal(expectedOwnerBalance);
      });
    });
  });
});
