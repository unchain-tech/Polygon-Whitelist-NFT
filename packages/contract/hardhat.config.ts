import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  solidity: '0.8.20',
  paths: {
    artifacts: '../client/artifacts',
  },
  typechain: {
    outDir: '../client/types/typechain',
    target: 'ethers-v5',
  },
};

export default config;
